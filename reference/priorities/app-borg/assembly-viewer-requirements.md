# Assembly Viewer — Requirements Sketch

Status: operator-ratified capture (2026-07-16); requirements sketch owned by the Borg app lane, not an implementation license. The Braid Program instrument gate has adopted the record schema below and remains its source of truth.

## Purpose

A 3D Borg capability for looking at the assemblies the Braid Program models and the emergent assemblies its evolutions produce. Two first-class uses: (1) **chart pose** — render a proposed configuration from the configuration chart, with its ansatz orbital curves and overlays, clearly labeled hypothesis; (2) **evolved record** — render the output of an EOM campaign run, clearly labeled evolved, including side-by-side or overlaid seed comparisons for the collapse protocol.

## The Viewer-Not-Instrument Rule (non-negotiable)

The viewer computes no physics: no accelerations, no causal roots, no evolution, no residuals. It draws recorded data only. Every scene shows a provenance banner — engine, run id, claim grade (`chart-hypothesis` or `evolved-record`), and instrument references. Rationale: the legacy failure mode was app-facing paths quietly computing non-canonical physics under production labels; a pure viewer cannot launder a claim. Any derived display quantity (speed color, trail depth) is evaluated only from the record's declared interpolation and metadata by declared display arithmetic, never by re-running dynamics.

## Assembly View Record (schema v0 — finalized in [instrument-gate.md](../braid-program/campaigns/instrument-gate.md) §4, which is the source of truth; the sketch below is the ratified requirements baseline)

- `schema`: `assembly-view-record.v0`.
- `provenance`: engine id and version; run id; claim grade (`chart-hypothesis` | `evolved-record`); generating spec/campaign reference; date.
- `window`: start time, end time, delay horizon $h$, sample interval.
- `worldlines[]`: id; polarity ($\epsilon_+$/$\epsilon_-$); coverage; declared interpolation; authoritative retained `segments[]` for animation and booking; optional display-only samples of $(t, \mathbf x)$ and $\mathbf v$. In an `evolved-record`, the segments are the EOM solver's exact retained-history tokens; a segments-free worldline fails closed.
- `binaries[]` (optional metadata): member worldline ids; frequency; plane orientation; planar offset / separation; phase.
- `ansatz[]` (optional, chart poses): proposed orbital path curves as sampled polylines with labels.
- `events[]` (optional): field-speed crossings, root-count transitions, or other engine-declared events with timestamps and worldline ids.
- Sidecar-friendly: records are plain files the engine emits; the viewer never talks to a live engine in v0.

The instrument gate has adopted this schema (2026-07-16): every booked campaign run and collapse-protocol seed emits a record, the shared display adapter (`src/apps/shared/EomHistoryDataset.mjs`) ingests it, and Borg replays record files directly at `borg.html?eomRecord=<url>`.

## Borg Run And Replay Boundary

Borg has two adjacent capabilities with different authority boundaries:

1. **Simulation workspace:** the existing Borg run surface may construct declared initial conditions and invoke the EOM solver after explicit Start. The EOM solver owns all evolution, causal roots, path history, wake history, and solver diagnostics. The app does not acquire evidence authority by showing those values.
2. **Assembly-view replay:** this requirements packet governs a record-only mode. It loads a sealed `assembly-view-record.v0`, never invokes the EOM solver, and never extends, repairs, or reinterprets the record. A Borg-triggered run enters this mode only after the accepted emitter has written the record and the replay path reloads that file.

The mode switch must be visible. Run controls are disabled in assembly-view replay, and replay controls do not mutate the simulation workspace's initial conditions or solver envelope.

## Dataset Intake And Collection Navigation

Collection navigation preserves configuration-space identity without importing app-side analysis into replay authority:

- Load one record directly, then add local-file and manifest/packet intake for collections of records when Borg's deferred import workflow opens.
- Preserve source ids, source order, and raw record access. The viewer must not silently sort or relabel worldlines, binaries, branches, or layers.
- For tri-binary configuration-search collections, preserve `unquotiented-labeled` rows. An optional $S_3$-equivalence grouping may reduce navigation clutter only when the source carries a permutation-canonical key; grouping hides no underlying record and never changes the selected raw record.
- Provide collection filters for source-carried claim grade, evidence status, campaign/run id, speed regime, eigen-braid status, axis-alignment status, assembly topological charge, and accessory-architrino capture status when those fields exist. Missing fields remain visibly unavailable rather than being inferred.
- A stable-sector atlas may plot source-carried coordinates such as energy differentials, speed regime, $D_{\mathrm{plane}}$, and assembly topological charge. The viewer does not calculate those diagnostics. Their producer and provenance must be named, and selecting a point must open the underlying raw record.
- Comparison mode synchronizes only records with compatible declared time and unit transforms. Otherwise it fails closed and explains the mismatch.

## Display Modes

1. **Animated core** (default): playback with scrub, slow-motion, loop-one-period; each architrino drawn with a retained-history trail of depth exactly $h$ — in a delay system the state is the history, so the honest state display is position plus that trail.
2. **Chart pose**: static hypothesis rendering with ansatz curves and overlays.
3. **Co-rotating / screw-frame camera**: in the right frame a rigid candidate is a still image, so any motion in that frame is the residual made visible — "is it holding?" becomes "does the picture move?"
4. **Strobe**: sample playback at a chosen frequency; the binary matching it freezes — visual frequency measurement.
5. **Envelope**: display-only time-averaged swept envelope (fusiform, oblate, or emergent shape) evaluated from the record's declared interpolation.
6. **Comparison**: two or more records side-by-side or overlaid with synchronized time — the collapse-protocol view.
7. **Export**: static images for corpus figures.

## Overlays

Polarity coloring; speed color-mapped against $c_f$ with explicit field-speed-crossing markers; per-binary frequency labels; planar-offset separation; spin and polarity-dipole glyphs with the $\chi=\operatorname{sign}(\mathbf p\cdot\mathbf S)$ sign where the record's metadata supports them; event markers from the record's event list; and source-carried branch, eigen-braid, axis-alignment, topological-charge, or capture status. Overlays render only record-carried or declared-arithmetic display quantities.

## Borg Re-Base

Keep Borg's rendering and UI surface (simulation window, replay, display policy), but give assembly-view replay the record schema above as its only data spine. Prerequisites already satisfied (2026-07-16): the app-borg lane is re-pointed to the EOM engine, and the current initial-condition provenance path reports `canonicalEomEvidence: false`, pinned by Borg tests. Assembly-view replay must still never consume the live bridge directly; it consumes only `assembly-view-record.v0` files.

## Non-Goals (v0)

No physics inside assembly-view replay; no live engine coupling from replay; no editing of records; no viewer-authored branch diagnostics; no authority — nothing rendered here is evidence, and the banner says so. Borg's separate simulation workspace may invoke the EOM solver, but that capability does not weaken these replay-mode non-goals.
