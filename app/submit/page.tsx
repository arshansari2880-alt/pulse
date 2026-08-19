"use client";

import Link from "next/link";

const SHOTS = [
  { src: "/submission/discover.jpg", label: "Discover · Koregaon Park, 8:41 PM" },
  { src: "/submission/crowded.jpg", label: "Crowded · FC Road, Saturday 8:00 PM" },
  { src: "/submission/selected.jpg", label: "Selected · Open mic, FC Road" },
  { src: "/submission/quiet.jpg", label: "Quiet · 1:14 AM" },
];

export default function SubmitPage() {
  return (
    <main className="bg-bg text-ink print:bg-bg">
      <style>{`
        @page { size: A4; margin: 16mm; }
        @media print {
          .no-print { display: none !important; }
          .break { break-before: page; }
          a { color: inherit; text-decoration: none; }
        }
      `}</style>

      <article className="mx-auto max-w-[720px] px-6 py-12 md:px-0">
        <p className="font-mono text-[10px] uppercase tracking-meta text-accent">
          Job application submission
        </p>
        <h1 className="mt-2 font-display text-5xl font-extrabold tracking-[-0.05em]">
          Pulse — Living Map
        </h1>
        <p className="mt-2 text-mute">
          Challenge 01 · Local discovery product · Coded Next.js prototype
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-meta">
          <div>
            <dt className="text-mute">Candidate</dt>
            <dd className="mt-1 text-ink">Arsh Ansari</dd>
          </div>
          <div>
            <dt className="text-mute">Email</dt>
            <dd className="mt-1 text-ink">arsh.ansari2880@gmail.com</dd>
          </div>
          <div>
            <dt className="text-mute">Role</dt>
            <dd className="mt-1 text-ink">UI/UX Design Intern</dd>
          </div>
          <div>
            <dt className="text-mute">Company</dt>
            <dd className="mt-1 text-ink">Subverse Media Tech Pvt. Ltd.</dd>
          </div>
        </dl>

        <section className="mt-8 rounded-sheet border border-white/[0.08] bg-bg-2 p-5">
          <p className="font-mono text-[10px] uppercase tracking-meta text-accent">
            Project links
          </p>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li>
              Live prototype: deploy from the GitHub repo (Render). After it is live, the URL
              will be listed in the README.
            </li>
            <li>
              GitHub:{" "}
              <a className="text-accent" href="https://github.com/Sukhxdx/pulse">
                https://github.com/Sukhxdx/pulse
              </a>
            </li>
            <li>
              Design thinking:{" "}
              <a className="text-accent" href="https://github.com/Sukhxdx/pulse">
                /thinking
              </a>{" "}
              on the live site
            </li>
          </ul>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-meta text-mute">
            Render free tier may cold-start for a few seconds after idle.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What this covers</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-6 text-ink/85">
            <li>01 Final design — live map, pin system, categories, selected + quiet/crowded states.</li>
            <li>02 Design thinking — problem, decisions, trade-offs below and on /thinking.</li>
            <li>03 Prototype — interactive Next.js app (pan/zoom, blooms, sheet, time scenes).</li>
            <li>04 Exploration — clustering, pulse as data, quiet as a designed state, time as a scene.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Concept</h2>
          <p className="mt-3 text-[15px] leading-7 text-ink/85">
            Pulse is a city heartbeat map for Pune. It is not a directory of places. It shows what is
            alive right now — a gig starting in 12 minutes, a queue on FC Road, a street that went
            quiet at 1:14 AM. Pins pulse. Intensity is liveliness. Crowds become numbered blooms.
            Quiet is a designed screen, not an empty illustration.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Problem</h2>
          <p className="mt-3 text-[15px] leading-7 text-ink/85">
            The brief is not “put pins on a map.” Maps already do that, and they fail as soon as a
            street gets busy. The real problem is density: how do you show many live things without
            turning the city into noise — and keep the same system honest when almost nothing is
            awake? Location is the stage. Aliveness is the data.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Key decisions</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-ink/85">
            <li>Pulse equals aliveness. Ring speed is the encoding. Lime is signal, never decoration.</li>
            <li>Three or more pins in a tight patch collapse into a bloom. Zoom splits them.</li>
            <li>A bottom sheet keeps the map as context. A modal would steal the spatial question.</li>
            <li>Filters ghost other types instead of hiding them, so the street does not teleport.</li>
            <li>Time is a scene: Evening / Saturday / Late. A living map that does not change with the hour is a directory.</li>
            <li>Type is glyph + behavior, not a second color. The brief gives one accent.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Trade-offs</h2>
          <p className="mt-3 text-[15px] leading-7 text-ink/85">
            No search bar — search is a query tool; the brief asks you to understand surroundings.
            No heatmap as the primary layer — heat shows density and erases identity. Stylized map
            instead of live tiles — geographic inaccuracy in exchange for visual control and a map
            that can go quiet.
          </p>
        </section>

        <section className="break mt-10">
          <h2 className="font-display text-2xl font-bold">Screens</h2>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-meta text-mute">
            Captured from the live prototype
          </p>
          <div className="mt-6 grid gap-8">
            {SHOTS.map((s) => (
              <figure key={s.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.label}
                  className="w-full rounded-sheet border border-white/[0.08]"
                />
                <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-meta text-mute">
                  {s.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">How to review</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-ink/85">
            <li>Open the live link. Wait through a possible Render cold start.</li>
            <li>You are in Koregaon Park at 8:41 PM. Pulse rings mean aliveness.</li>
            <li>Switch to Saturday. Camera moves to FC Road. Pins collapse into blooms. Click a bloom, then a pin.</li>
            <li>Switch to Late. The city goes quiet on purpose. Widen if you want the faint remainder.</li>
            <li>Filter to Table. Other types stay as ghosts.</li>
            <li>Read /thinking for the full case study.</li>
          </ol>
        </section>

        <p className="mt-12 font-mono text-[11px] uppercase tracking-meta text-mute">
          Thank you for reviewing this submission.
          <br />
          Arsh Ansari · arsh.ansari2880@gmail.com
        </p>

        <p className="no-print mt-8">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-meta text-accent">
            ← Back to map
          </Link>
        </p>
      </article>
    </main>
  );
}
