# Pulse — Living Map

Internship submission for **Subverse Media Tech Pvt. Ltd.**  
**Challenge 01 — The Living Map**

**Candidate:** Arsh Ansari · [arsh.ansari2880@gmail.com](mailto:arsh.ansari2880@gmail.com)  
**GitHub:** [github.com/arshansari2880-alt](https://github.com/arshansari2880-alt)

Pulse is a map of what is alive in Pune right now. Pins pulse by liveliness. Crowds collapse into blooms. Quiet hours are a designed state.

**Repo:** [github.com/arshansari2880-alt/pulse](https://github.com/arshansari2880-alt/pulse)  
**Live:** [https://pulse-hm6h.onrender.com](https://pulse-hm6h.onrender.com)  
**Figma:** [figma.com/design/rq1z3iJ6tLHcUDSR0KbgvM](https://www.figma.com/design/rq1z3iJ6tLHcUDSR0KbgvM)  
**Case study:** `/thinking`  
**Submission PDF:** `Arsh_Ansari_Pulse_Submission.pdf`

---

## How to review

1. Open the live site (Render free tier may cold-start for a few seconds).
2. You land in Koregaon Park at 8:41 PM. Pulse rings = aliveness.
3. Switch **Saturday** — camera moves to FC Road, pins collapse into numbered blooms.
4. Tap a bloom to split it, tap a pin for the sheet.
5. Switch **Late** — quiet is designed. Widen if you want the faint remainder.
6. Filter **Table** — other types ghost, they don’t vanish.
7. Read `/thinking`.

Drag to pan. Scroll to zoom. `Esc` closes a selection.

---

## Concept

Pulse treats the city as a heartbeat, not a directory.

| Type | What it is |
|------|------------|
| **Now** | Live events, gigs, pop-ups |
| **Table** | Food, queues, kitchens |
| **Ground** | Venues and stretches |
| **Move** | Things you can join |

Content is grounded in real Pune neighborhoods (Koregaon Park, FC Road, Baner, Camp, Deccan, Kalyani Nagar).

---

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion  
Deployed on [Render](https://render.com) (`render.yaml`)

No Mapbox / Google Maps — the map is a designed SVG so information design stays in control.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

---

## Design tokens

| Token | Value | Use |
|------|------|-----|
| Background | `#0A0C08` | Page |
| Accent | `#BAFF26` | Pulse, selection, CTAs |
| Display | Syne | Wordmark, titles |
| Body | IBM Plex Sans | UI copy |
| Mono | IBM Plex Mono | Distance, time, counts |

---

## License

Prototype for a design challenge / internship application. Venue facts are for demonstration.
