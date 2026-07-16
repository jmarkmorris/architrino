# Assembly Viewer — Requirements Sketch

Status: operator-ratified capture (2026-07-16); requirements sketch, not an implementation license. Implementation is a Codex app-lane task once the instrument gate adopts the record schema below.

## Purpose

A 3D viewer for looking at the assemblies this program models and the emergent assemblies its evolutions produce. Two first-class uses: (1) **chart pose** — render a proposed configuration from the configuration chart, with its ansatz orbital curves and overlays, clearly labeled hypothesis; (2) **evolved record** — render the output of an EOM campaign run, clearly labeled evolved, including side-by-side or overlaid seed comparisons for the collapse protocol.

## The Viewer-Not-Instrument Rule (non-negotiable)

The viewer computes no physics: no accelerations, no causal roots, no evolution, no residuals. It draws recorded data only. Every scene shows a provenance banner — engine, run id, claim grade (`chart-hypothesis` or `evolved-record`), and instrument references. Rationale: the legacy failure mode was app-facing paths quietly computing non-canonical physics under production labels; a pure viewer cannot launder a claim. Any derived display quantity (speed color, trail depth) is computed from the record's own samples by declared arithmetic, never by re-running dynamics.

## Assembly View Record (schema v0 — finalized in [instrument-gate.md](instrument-gate.md) §4, which is the source of truth; the sketch below is the ratified requirements baseline)

- `schema`: `assembly-view-record.v0`.
- `provenance`: engine id and version; run id; claim grade (`chart-hypothesis` | `evolved-record`); generating spec/campaign reference; date.
- `window`: start time, end time, delay horizon $h$, sample interval.
- `worldlines[]`: id; polarity ($\epsilon_+$/$\epsilon_-$); samples of $(t, \mathbf x)$ and optionally $\mathbf v$.
- `binaries[]` (optional metadata): member worldline ids; frequency; plane orientation; planar offset / separation; phase.
- `ansatz[]` (optional, chart poses): proposed orbital path curves as sampled polylines with labels.
- `events[]` (optional): field-speed crossings, root-count transitions, or other engine-declared events with timestamps and worldline ids.
- Sidecar-friendly: records are plain files the engine emits; the viewer never talks to a live engine in v0.

The instrument gate has adopted this schema (2026-07-16): every booked campaign run and collapse-protocol seed emits a record, the shared display adapter (`src/apps/shared/EomHistoryDataset.mjs`) ingests it, and Borg replays record files directly at `borg.html?eomRecord=<url>`.

## Display Modes

1. **Animated core** (default): playback with scrub, slow-motion, loop-one-period; each architrino drawn with a retained-history trail of depth exactly $h$ — in a delay system the state is the history, so the honest state display is position plus that trail.
2. **Chart pose**: static hypothesis rendering with ansatz curves and overlays.
3. **Co-rotating / screw-frame camera**: in the right frame a rigid candidate is a still image, so any motion in that frame is the residual made visible — "is it holding?" becomes "does the picture move?"
4. **Strobe**: sample playback at a chosen frequency; the binary matching it freezes — visual frequency measurement.
5. **Envelope**: time-averaged swept envelope (fusiform, oblate, or emergent shape).
6. **Comparison**: two or more records side-by-side or overlaid with synchronized time — the collapse-protocol view.
7. **Export**: static images for corpus figures.

## Overlays

Polarity coloring; speed color-mapped against $c_f$ with explicit field-speed-crossing markers; per-binary frequency labels; planar-offset separation; spin and polarity-dipole glyphs with the $\chi=\operatorname{sign}(\mathbf p\cdot\mathbf S)$ sign where the record's metadata supports them; event markers from the record's event list. Overlays render only record-carried or declared-arithmetic quantities.

## Borg Re-Base

Keep Borg's rendering and UI surface (simulation window, replay, display policy); replace its data spine with the record schema above. Prerequisites already satisfied (2026-07-16): the app-borg lane scope is re-pointed to the EOM engine with a reading rule over its older packets, and the fixture generator's provenance labels are repaired (`--check` green, contract test 15/15). Residual noted for implementers: the solver bridge's native master-equation path still self-reports `canonicalEomEvidence: true` (test-pinned) — the viewer must never consume the bridge directly; it consumes only assembly-view-record files.

## Non-Goals (v0)

No in-app physics; no live engine coupling; no editing of records; no authority — nothing rendered here is evidence, and the banner says so.
