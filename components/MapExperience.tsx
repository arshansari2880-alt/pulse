"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate } from "framer-motion";
import { BottomSheet } from "@/components/BottomSheet";
import {
  FilterRail,
  Legend,
  QuietBanner,
  SceneRail,
  TopBar,
} from "@/components/Chrome";
import { MapSvg } from "@/components/MapSvg";
import { BloomNode, PinNode, UserPuck } from "@/components/Pins";
import { Toast } from "@/components/Toast";
import { clusterPlaces } from "@/lib/cluster";
import {
  MAP,
  SCENE_CAMERA,
  SCENE_META,
  USER,
  curvePath,
  isAwake,
  mapsUrl,
} from "@/lib/geo";
import { PLACES } from "@/lib/places";
import type { Camera, Filter, Place, PlaceType, Scene } from "@/lib/types";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function MapExperience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapSvgWrapRef = useRef<HTMLDivElement>(null);
  const pinsSvgRef = useRef<SVGSVGElement>(null);
  const cameraRef = useRef<Camera>(SCENE_CAMERA.evening);
  const sizeRef = useRef({ w: 390, h: 844 });
  const [size, setSize] = useState({ w: 390, h: 844 });
  const [camera, setCamera] = useState<Camera>(SCENE_CAMERA.evening);
  cameraRef.current = camera;
  sizeRef.current = size;
  const [scene, setScene] = useState<Scene>("evening");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);
  const [widen, setWiden] = useState(false);
  const [saved, setSaved] = useState(false);
  const [joined, setJoined] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);
  const [reduced, setReduced] = useState(false);
  const drag = useRef<{
    x: number;
    y: number;
    camX: number;
    camY: number;
    moved: boolean;
    lastX: number;
    lastY: number;
    lastT: number;
    vx: number;
    vy: number;
  } | null>(null);
  const toastTimer = useRef<number | null>(null);
  const zoomSync = useRef<number | null>(null);

  const applyCamera = useCallback((cam: Camera) => {
    const { w, h } = sizeRef.current;
    const viewW = MAP.width / cam.z;
    const viewH = viewW * (h / Math.max(w, 1));
    const vb = `${cam.x - viewW / 2} ${cam.y - viewH / 2} ${viewW} ${viewH}`;
    const mapSvg = mapSvgWrapRef.current?.querySelector("svg");
    mapSvg?.setAttribute("viewBox", vb);
    pinsSvgRef.current?.setAttribute("viewBox", vb);
    const pinScale = ((28 / Math.max(w, 1)) * viewW) / 20;
    pinsSvgRef.current?.querySelectorAll<SVGGElement>("[data-x]").forEach((g) => {
      const x = Number(g.dataset.x);
      const y = Number(g.dataset.y);
      const mul = Number(g.dataset.pinScale || "1");
      g.setAttribute("transform", `translate(${x} ${y}) scale(${pinScale * mul})`);
    });
  }, []);

  const commitCamera = useCallback(() => {
    setCamera({ ...cameraRef.current });
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r) {
        const next = { w: r.width, h: r.height };
        sizeRef.current = next;
        setSize(next);
        applyCamera(cameraRef.current);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyCamera]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const sceneQ = q.get("scene");
    const filterQ = q.get("filter");
    const placeQ = q.get("place");
    const print = q.get("print") === "1";
    const nextScene: Scene =
      sceneQ === "saturday" || sceneQ === "late" || sceneQ === "evening"
        ? sceneQ
        : "evening";
    const nextFilter: Filter =
      filterQ === "now" ||
      filterQ === "table" ||
      filterQ === "ground" ||
      filterQ === "move" ||
      filterQ === "all"
        ? filterQ
        : "all";

    setScene(nextScene);
    setFilter(nextFilter);
    setCamera(SCENE_CAMERA[nextScene]);
    cameraRef.current = SCENE_CAMERA[nextScene];
    applyCamera(SCENE_CAMERA[nextScene]);
    if (placeQ && PLACES.some((p) => p.id === placeQ)) setSelectedId(placeQ);
    if (q.get("widen") === "1") setWiden(true);
    if (print || sceneQ || placeQ) {
      setBooting(false);
      return;
    }
    const t = window.setTimeout(() => setBooting(false), reduced ? 0 : 900);
    return () => window.clearTimeout(t);
  }, [reduced, applyCamera]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedId(null);
        setSaved(false);
        setJoined(false);
        setLegendOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const cam = cameraRef.current;
      const viewW = MAP.width / cam.z;
      const viewH = viewW * (sizeRef.current.h / Math.max(sizeRef.current.w, 1));
      const factor = e.ctrlKey
        ? Math.exp(-e.deltaY * 0.012)
        : Math.exp(-e.deltaY * 0.0018);
      const z = clamp(cam.z * factor, 1.05, 3.6);
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      const ptX = cam.x - viewW / 2 + nx * viewW;
      const ptY = cam.y - viewH / 2 + ny * viewH;
      const nextW = MAP.width / z;
      const nextH = nextW * (sizeRef.current.h / sizeRef.current.w);
      const next = {
        x: ptX - nx * nextW + nextW / 2,
        y: ptY - ny * nextH + nextH / 2,
        z,
      };
      cameraRef.current = next;
      applyCamera(next);
      if (zoomSync.current) window.clearTimeout(zoomSync.current);
      zoomSync.current = window.setTimeout(commitCamera, 80);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [applyCamera, commitCamera]);

  const viewW = MAP.width / camera.z;
  const viewH = viewW * (size.h / Math.max(size.w, 1));
  const viewBox = `${camera.x - viewW / 2} ${camera.y - viewH / 2} ${viewW} ${viewH}`;
  const pinScale = ((28 / Math.max(size.w, 1)) * viewW) / 20;

  const awake = useMemo(
    () => PLACES.filter((p) => isAwake(p, scene, widen)),
    [scene, widen],
  );

  const filtered = useMemo(() => {
    return awake.map((p) => ({
      place: p,
      out: filter !== "all" && p.type !== filter,
    }));
  }, [awake, filter]);

  const clusterSource = useMemo(
    () => filtered.filter((f) => !f.out).map((f) => f.place),
    [filtered],
  );

  const clustered = useMemo(
    () => clusterPlaces(clusterSource, camera.z),
    [clusterSource, camera.z],
  );

  const ghostPins = useMemo(
    () => filtered.filter((f) => f.out).map((f) => f.place),
    [filtered],
  );

  const selected = PLACES.find((p) => p.id === selectedId) ?? null;

  const counts = useMemo(() => {
    const base: Record<PlaceType | "all", number> = {
      all: awake.length,
      now: 0,
      table: 0,
      ground: 0,
      move: 0,
    };
    for (const p of awake) base[p.type] += 1;
    return base;
  }, [awake]);

  const quiet = scene === "late" && !selected && awake.length <= 4;

  const nearest =
    awake.slice().sort((a, b) => a.distanceKm - b.distanceKm)[0]?.distanceKm ?? 0;

  function flyTo(next: Camera, ms = 900) {
    const from = { ...cameraRef.current };
    animate(0, 1, {
      duration: ms / 1000,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (t) => {
        const cam = {
          x: from.x + (next.x - from.x) * t,
          y: from.y + (next.y - from.y) * t,
          z: from.z + (next.z - from.z) * t,
        };
        cameraRef.current = cam;
        applyCamera(cam);
      },
      onComplete: () => {
        cameraRef.current = next;
        applyCamera(next);
        setCamera(next);
      },
    });
  }

  function changeScene(next: Scene) {
    setScene(next);
    setWiden(false);
    setSelectedId(null);
    setSaved(false);
    setJoined(false);
    flyTo(SCENE_CAMERA[next]);
  }

  function onPointerDown(e: React.PointerEvent) {
    if ((e.target as Element).closest("[data-pin]")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const cam = cameraRef.current;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      camX: cam.x,
      camY: cam.y,
      moved: false,
      lastX: e.clientX,
      lastY: e.clientY,
      lastT: performance.now(),
      vx: 0,
      vy: 0,
    };
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const dt = Math.max(8, now - d.lastT);
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.hypot(dx, dy) > 3) d.moved = true;
    const { w, h } = sizeRef.current;
    const viewWNow = MAP.width / cameraRef.current.z;
    const viewHNow = viewWNow * (h / Math.max(w, 1));
    const next = {
      x: d.camX - (dx / w) * viewWNow,
      y: d.camY - (dy / h) * viewHNow,
      z: cameraRef.current.z,
    };
    d.vx = ((e.clientX - d.lastX) / dt) * -viewWNow / w;
    d.vy = ((e.clientY - d.lastY) / dt) * -viewHNow / h;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    d.lastT = now;
    cameraRef.current = next;
    applyCamera(next);
  }

  function onPointerUp() {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      setSelectedId(null);
      setSaved(false);
      setJoined(false);
      return;
    }
    const speed = Math.hypot(d.vx, d.vy);
    if (speed > 0.04 && !reduced) {
      const from = { ...cameraRef.current };
      const dist = Math.min(18, speed * 180);
      const nx = from.x + (d.vx / speed) * dist;
      const ny = from.y + (d.vy / speed) * dist;
      flyTo({ ...from, x: nx, y: ny }, 420);
      return;
    }
    commitCamera();
  }

  function openBloom(x: number, y: number) {
    flyTo({ x, y, z: clamp(cameraRef.current.z + 0.85, 1.2, 3.6) }, 700);
  }

  function handlePrimary(place: Place) {
    if (place.cta === "Join") {
      setJoined(true);
      showToast("You're on the list");
      return;
    }
    if (place.cta === "Save") {
      setSaved(true);
      showToast("Saved to Pulse");
      return;
    }
    window.open(mapsUrl(place.name, place.address), "_blank", "noopener,noreferrer");
    showToast("Opening maps");
  }

  return (
    <main className="relative h-[100dvh] overflow-hidden overscroll-none bg-bg" data-scene={scene} data-booting={booting ? "1" : "0"}>
      <div
        ref={wrapRef}
        className="absolute inset-0 cursor-grab touch-none overscroll-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={mapSvgWrapRef} className="absolute inset-0">
          <MapSvg viewBox={viewBox} saturdayHeat={scene === "saturday"} />
        </div>
        <svg
          ref={pinsSvgRef}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          {selected && (
            <path
              d={curvePath(USER.x, USER.y, selected.x, selected.y)}
              fill="none"
              stroke="#BAFF26"
              strokeOpacity="0.45"
              strokeWidth={0.35}
              strokeDasharray="1.2 0.9"
            />
          )}
          <UserPuck scale={pinScale * 0.92} />
          {ghostPins.map((place) => (
            <PinNode
              key={`g-${place.id}`}
              place={place}
              scene={scene}
              scale={pinScale}
              selected={false}
              dimmed
              reduced
              filteredOut
              onSelect={setSelectedId}
            />
          ))}
          {clustered.map((item) =>
            item.kind === "bloom" ? (
              <BloomNode
                key={item.bloom.id}
                x={item.bloom.x}
                y={item.bloom.y}
                count={item.bloom.count}
                dominant={item.bloom.dominant}
                scale={pinScale}
                dimmed={Boolean(selected)}
                onOpen={() => openBloom(item.bloom.x, item.bloom.y)}
              />
            ) : (
              <PinNode
                key={item.place.id}
                place={item.place}
                scene={scene}
                scale={pinScale}
                selected={selectedId === item.place.id}
                dimmed={Boolean(selectedId) && selectedId !== item.place.id}
                reduced={reduced}
                filteredOut={false}
                onSelect={(id) => {
                  setSelectedId(id);
                  setSaved(false);
                  setJoined(false);
                }}
              />
            ),
          )}
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 pulse-vignette" />
      <div className="pointer-events-none absolute inset-0 pulse-grain" />

      <TopBar
        clock={SCENE_META[scene].clock}
        line={SCENE_META[scene].line}
        awake={awake.length}
        legendOpen={legendOpen}
        onToggleLegend={() => setLegendOpen((v) => !v)}
      />
      <Legend open={legendOpen} />
      <Toast message={toast} />

      {quiet && (
        <div className="absolute inset-x-0 top-[6.5rem] z-30">
          <QuietBanner
            count={awake.length}
            nearest={nearest}
            widen={widen}
            onWiden={() => {
              setWiden(true);
              flyTo(
                { ...cameraRef.current, z: clamp(cameraRef.current.z * 0.78, 1.05, 3) },
                600,
              );
            }}
          />
        </div>
      )}

      <BottomSheet
        place={selected}
        scene={scene}
        saved={saved}
        joined={joined}
        onSave={() => {
          setSaved(true);
          showToast("Saved to Pulse");
        }}
        onPrimary={() => selected && handlePrimary(selected)}
        onClose={() => {
          setSelectedId(null);
          setSaved(false);
          setJoined(false);
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 space-y-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <SceneRail scene={scene} onScene={changeScene} />
        <FilterRail filter={filter} onFilter={setFilter} counts={counts} />
      </div>

      {booting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-bg transition-opacity">
          <p className="font-display text-5xl font-extrabold tracking-[-0.05em]">
            pulse
          </p>
        </div>
      )}
    </main>
  );
}
