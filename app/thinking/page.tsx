import Link from "next/link";

export default function ThinkingPage() {
  return (
    <main className="min-h-screen bg-bg px-6 py-16 text-ink md:px-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-meta text-accent">
          Challenge 01 · The Living Map
        </p>
        <h1 className="mt-3 font-display text-6xl font-extrabold tracking-[-0.05em]">
          pulse
        </h1>
        <p className="mt-4 max-w-[40ch] text-lg leading-7 text-ink/80">
          A map of what is alive in Pune right now — not a directory of what exists.
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-meta text-mute">
          Arsh Ansari · arsh.ansari2880@gmail.com
          <br />
          <a
            href="https://github.com/arshansari2880-alt/pulse"
            className="text-accent"
          >
            github.com/arshansari2880-alt/pulse
          </a>
          <br />
          <a
            href="https://www.figma.com/design/rq1z3iJ6tLHcUDSR0KbgvM"
            className="text-accent"
          >
            Figma · Living Map
          </a>
        </p>
        <p className="mt-6">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-meta text-accent">
            ← Open the map
          </Link>
        </p>

        <hr className="my-12 border-white/[0.08]" />

        <section className="space-y-10 text-[16px] leading-7 text-ink/85">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Problem</h2>
            <p className="mt-3">
              The brief is not “put pins on a map.” Maps already do that, and they fail as soon as a
              street gets busy. The real problem is density: how do you show many live things at once
              without turning the city into noise — and how do you keep the same system honest when
              almost nothing is awake?
            </p>
            <p className="mt-3">
              I read the map as a living instrument. Location is the stage. Aliveness is the data.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Approach</h2>
            <p className="mt-3">
              I built a coded prototype instead of a static frame because the brief is about
              behavior: clustering, selected state, quiet vs crowded, motion as meaning. The map is
              stylized Pune — neighborhoods, the river, real venues — so reviewers can judge
              communication, not GIS accuracy.
            </p>
            <p className="mt-3">
              Time is a first-class control. Evening in Koregaon Park, Saturday on FC Road, and 1:14 AM
              are the same product in three climates. If a living map does not change with the hour,
              it is a directory.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Key decisions</h2>
            <ul className="mt-3 list-disc space-y-3 pl-5">
              <li>
                <span className="text-ink">Pulse equals aliveness.</span> Ring speed is the encoding.
                Fast is live now. Slow is a place that exists. No ring means the place is effectively
                asleep. Lime is reserved for this signal — never decoration.
              </li>
              <li>
                <span className="text-ink">Blooms, not stacked pins.</span> Three or more points in a
                tight patch collapse into a numbered bloom. Zoom splits them. Overlap is a designed
                state, not an accident.
              </li>
              <li>
                <span className="text-ink">Sheet, not modal.</span> Selecting a place dims the rest and
                keeps the map as context. A modal would steal the spatial question the product exists
                to answer.
              </li>
              <li>
                <span className="text-ink">Filter ghosts, it does not hide.</span> Spatial memory
                matters. If Table is on, a gig is still a faint mark on FC Road so the street does not
                teleport.
              </li>
              <li>
                <span className="text-ink">Quiet is a designed screen.</span> “2 places still awake ·
                nearest 1.4 km” plus widen-to-3 km. Empty is information, not an illustration.
              </li>
              <li>
                <span className="text-ink">Type is glyph + behavior, not a second color.</span> The
                brief gives one accent. Five hues would be a legend tax. Now, Table, Ground, and Move
                share a family and differ by mark and pulse.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Trade-offs</h2>
            <p className="mt-3">
              No search bar. Search turns the product into a query tool. The brief asks you to
              understand what is around you, not to retrieve a name you already know.
            </p>
            <p className="mt-3">
              No heatmap as the primary layer. Heat shows density and erases identity. Blooms carry
              count and type; heat is only a Saturday wash under FC Road.
            </p>
            <p className="mt-3">
              Stylized map instead of live tiles. Geographic inaccuracy in exchange for visual
              control, no API keys, and a map that can go quiet. For a prototype about communication,
              control wins.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">How it works</h2>
            <ol className="mt-3 list-decimal space-y-3 pl-5">
              <li>
                <span className="text-ink">Discover.</span> You open on Koregaon Park at 8:41 PM. Mixed
                pins, a few small blooms, the river as orientation. No tutorial.
              </li>
              <li>
                <span className="text-ink">Crowded.</span> Saturday flies the camera to FC Road. Pins
                collapse into blooms. A lime wash sits under the street. Loud, still readable.
              </li>
              <li>
                <span className="text-ink">Selected.</span> A pin goes solid lime. Others dim. A path
                whispers from you to it. The sheet carries name, why it matters, 2h liveliness, and
                one action.
              </li>
              <li>
                <span className="text-ink">Category.</span> Table keeps kitchens full-strength. Other
                types ghost. The map’s shape does not change.
              </li>
              <li>
                <span className="text-ink">Quiet.</span> 1:14 AM. Rings die. Copy tells you what is
                left. Widen if you want the faint remainder.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">What I would test</h2>
            <p className="mt-3">
              Five people, standing in Koregaon Park, phone in hand. Tasks: find something happening
              in the next 15 minutes; make sense of FC Road on a Saturday without tapping; decide
              whether to go out at 1 AM. I would watch whether pulse is read as aliveness or as
              decoration, and whether blooms feel like a lock or a promise.
            </p>
          </div>
        </section>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-meta text-mute">
          Drag to pan · scroll to zoom · Saturday for crowding · Late for quiet
        </p>
      </div>
    </main>
  );
}
