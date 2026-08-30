# Assembly Viewer — Requirements

Status: operator-ratified requirements owned by the Borg app lane. The Braid Program instrument gate has adopted the record schema below and remains its source of truth. The record-only core is implemented; full packet closure is blocked on the schema carriers listed below and remains open in [priorities.md](priorities.md).

## Purpose

A 3D Borg capability for looking at the assemblies the Braid Program models and the emergent assemblies its evolutions produce inside Borg's spherical simulation envelope. Two first-class uses: (1) **chart pose** — render a proposed configuration from the configuration chart, with its ansatz orbital curves and overlays, clearly labeled hypothesis; (2) **evolved record** — render the output of an EOM campaign run, clearly labeled evolved, including side-by-side or overlaid seed comparisons for the collapse protocol.

## The Viewer-Not-Instrument Rule (non-negotiable)

The viewer computes no physics: no accelerations, no causal roots, no evolution, no residuals. It draws recorded data only. Every scene shows a provenance banner — engine, run id, claim grade (`chart-hypothesis` or `evolved-record`), and instrument references. Rationale: the legacy failure mode was app-facing paths quietly computing non-canonical physics under production labels; a pure viewer cannot launder a claim. Any derived display quantity (speed color, trail depth) is evaluated only from the record's declared interpolation and metadata by declared display arithmetic, never by re-running dynamics.

## Assembly View Record (schema v0 — finalized in [instrument-gate.md](../braid-program/campaigns/instrument-gate.md) §4, which is the source of truth; the summary below is the ratified requirements baseline)

- `schema`: `assembly-view-record.v0`.
- `provenance`: engine id and version; run id; claim grade (`chart-hypothesis` | `evolved-record`); generating spec/campaign reference; date. `prescribed-geometry` is limited to `chart-hypothesis` / `display-only` records and must declare that no physics was invoked.
- `window`: start time, end time, delay horizon $h$, sample interval.
- `worldlines[]`: id; polarity ($\epsilon_+$/$\epsilon_-$); coverage; declared interpolation; authoritative retained `segments[]` for animation and booking; optional display-only samples of $(t, \mathbf x)$ and $\mathbf v$. In an `evolved-record`, the segments are the EOM solver's exact retained-history tokens; a segments-free worldline does not advance.
- `binaries[]` (optional metadata): member worldline ids; frequency; plane orientation; planar offset / separation; phase.
- `ansatz[]` (optional, chart poses): proposed orbital path curves as sampled polylines with labels.
- `events[]` (optional): field-speed crossings, root-count transitions, or other engine-declared events with timestamps and worldline ids.
- Sidecar-friendly: records are plain files the engine emits; the viewer never talks to a live engine in v0.

The instrument gate has adopted this schema (2026-07-16): every booked campaign run and collapse-protocol seed emits a record, the shared display adapter (`src/apps/shared/EomHistoryDataset.mjs`) ingests it, and Borg replays record files directly at `borg.html?eomRecord=<url>`.

## Borg Run And Replay Boundary

Borg presents one persistent workbench with adjacent states that retain different authority boundaries:

1. **Random simulation:** the Borg run surface may construct declared initial conditions and invoke the EOM solver after explicit Start. The EOM solver owns all evolution, causal roots, path history, wake history, and solver diagnostics. The app does not acquire evidence authority by showing those values.
2. **Prescribed replay:** this requirements packet governs record-only playback. It loads a sealed `assembly-view-record.v0`, never invokes the EOM solver, and never extends, repairs, or reinterprets the record.
3. **Prescribed Display branch:** an explicit branch action may pass an exact source-segment prefix ending at the selected common segment boundary to the EOM solver. It creates a new Display-grade, promotion-ineligible run; the immutable prescribed record remains unchanged.

The active state and grade boundary must be visible in the panel. The unified `Starting geometry` selector owns random initial conditions and catalog-backed prescribed records without treating either as the other. Selecting prescribed geometry does not run the EOM solver. `Continue with Display simulation` is a separate action: it uses the exact source history through the selected, fixed-precision cut time and starts a non-promotable EOM solver continuation at Display grade. The fixed `borg-prescribed-display-v1` profile carries field speed $1$, coupling $0.0005$, sample interval $0.01$, chunk duration $0.3$, the research-certified numerical budget, and the record-carried spherical-envelope radius. Replay controls do not mutate the saved random-workspace initial conditions or solver envelope. A prescribed Display branch is not cached as the source record itself; returning to that catalog entry reloads the sealed geometry.

## Current Borg Integration Architecture

Assembly-view replay extends the canonical Borg path rather than creating a second viewer runtime:

- `src/apps/borg/BorgBootstrap.js` owns initial source selection. `borg.html?eomRecord=<url>` selects a direct sealed record on the same workbench while retaining a lazily constructed random-simulation configuration. The live EOM client is not constructed during record-only replay.
- `src/apps/borg/BorgBraidRecordCatalog.js` owns the immutable built-in braid navigation list. An entry contains only stable id, operator label, and sealed-record URL. It contains no geometry, physics, claim, or provenance fields; the runtime fetches and validates that URL in place when the entry is selected.
- `src/apps/shared/EomHistoryDataset.mjs` owns record ingestion requiring verification before advancement and evaluation of each record's declared interpolation. It remains the shared data adapter rather than moving schema logic into Borg.
- `src/apps/borg/BorgEomRecordReplayRunner.js` adapts the sealed record to Borg's chunked rendering interface. It clamps playback to recorded coverage, carries source provenance, and never evolves or extends the record.
- `src/apps/borg/BorgPrescribedDisplayBranch.js` owns the fixed Display profile and converts exact source segment prefixes into retained-history input. It maps source ids explicitly, requires a common exact segment-boundary cut, and does not derive EOM history from screen samples.
- `src/apps/borg/BorgAppRuntime.js` owns the common scene, playback controls, layers, diagnostics, and display policy. Replay-specific UI must integrate through focused modules and thin composition-root wiring rather than duplicating the Borg runtime.
- `src/apps/borg/BorgAppManifest.js` owns the simulation-envelope and app-surface policy. Assembly-view replay may present record-carried values, but it does not mutate that policy or use it to upgrade record authority.

The simulation workspace may request EOM solver execution through the existing Borg EOM client only after explicit Start. The browser does not implement a second evolution law. Assembly-view replay does not construct or call that client at all.

## Implemented Record-Only Core And Contract Blockers

The implemented Borg path provides the visible mode boundary, catalog-backed prescribed-geometry selector, persistent provenance, strict record validation, retained-segment animation through exactly the declared delay horizon $h$ for evolved records, source-defined whole-period trail depth for prescribed charts, coverage-clamped playback and scrubbing, chart pose, source-carried light-purple ansatz curves, source-carried per-binary axis guides, co-rotating camera, display-only swept envelope, static image export, a disabled animation-export placeholder, raw source-order navigation, source-only filters, and optional source-carried $S_3$ grouping. The light-purple and whole-period prescribed-path treatments are now recorded implementation drift under the canonical polarity-color and half-turn-fade requirement in [requirements-and-design.md](requirements-and-design.md#polarity-matched-path-color-and-half-turn-fade). Pressing Play from chart pose enters recorded-path playback before starting the timeline. The built-in animated catalog contains the illustrative tilted iso-frequency spindle member, its $70^\circ$/$80^\circ$/$85^\circ$ extreme cap-tilt parameter variant, and its planar tri-binary boundary member, in that order. The extreme variant retains the common coaxial frame and is an inspection chart, not a claim about independent orbit-plane orientation or physical selection. The generated full-cap axial-pair record remains directly loadable by its stable URL as a deprecated axial-limit null control outside the active catalog because its transverse radius and carrier speed vanish. Each record carries source-defined family, taxonomy-class, and variant labels; recorded-path playback animates only the prescribed analytical geometry and does not represent simulated evolution. `BorgAssemblyViewSession.js`, `BorgAssemblyViewControls.js`, and `BorgAssemblyViewScene.js` keep those policies focused while `BorgAppRuntime.js` remains the common scene and playback owner.

The following requirements remain not advanced because `assembly-view-record.v0` does not ratify the required carrier:

- Synchronized compatible-record comparison needs declared time-transform and unit-transform fields. Borg accepts no guessed identity transform and performs no silent rescaling.
- External multi-record collection intake needs a ratified packet or manifest carrier. Repeated direct `eomRecord` URLs exercise the in-memory collection model without defining a new packet schema; local-file and packet intake remain part of the deferred general import workflow.
- Speed relative to $c_f$ needs a required source-carried field-speed value. Source-declared crossing events may be shown, but Borg does not derive a speed regime without that carrier.
- Spin and polarity-dipole glyphs need ratified vector fields. Borg shows them as unavailable rather than assigning meaning to unrelated metadata.

These missing-contract states are viewer limitations, not record failures. The instrument gate remains the only authority that can add the carriers.

## Spherical Envelope Visual Contract

The current Borg viewport renders exactly one bright light-gray dotted outer boundary shell. It does not render cubic walls, face boundaries, great-circle guides, a second central-ball sphere, continuous `LineLoop` guides, panels, or filled boundary-shell patches. Assembly-view work must preserve that geometry unless the operator explicitly changes the Borg surface design.

The existing layer id `simulation-window` is a compatibility identifier. End-user labels and new prose call the geometry the **spherical simulation envelope** or **outer boundary shell**. `centralBall` and `centralBallRadius` remain dataset and diagnostic concepts, but the current viewport does not render a central-ball guide.

## Dataset Intake And Collection Navigation

Collection navigation preserves configuration-space identity without importing app-side analysis into replay authority:

- Keep prescribed geometry distinct from random live initial conditions inside the unified `Starting geometry` selector. Catalog entries load sealed records; `Random architrinos` restores the saved simulation workspace. The catalog never supplies record contents or live-run initial conditions.
- Treat every parameter variation as a separate source specification and sealed raw record. Radius or other member variations may be added to the catalog only after their labels, layer mapping, and complete source parameters are explicit; Borg does not generate a new geometry from browser-side controls.
- List each source as an individually identified record without requiring a family or parent. Describe boundary conditions, frequency relations, and parameter variations explicitly as source-owned properties. The [flat catalog decision](../../architectural-decisions/flat-assembly-catalog.md) separates shared mathematical constraints from navigation and forbids deriving a hierarchy or classification from a name prefix.
- Load one record directly, then add local-file and manifest/packet intake for collections of records when Borg's deferred import workflow opens.
- Preserve source ids, source order, and raw record access. The viewer must not silently sort or relabel worldlines, binaries, branches, or layers.
- For tri-binary configuration-search collections, preserve `unquotiented-labeled` rows. An optional $S_3$-equivalence grouping may reduce navigation clutter only when the source carries a permutation-canonical key; grouping hides no underlying record and never changes the selected raw record.
- Provide collection filters for source-carried claim grade, evidence status, campaign/run id, speed regime, braid-certification status, axis-alignment status, assembly topological charge, and accessory-architrino capture status when those fields exist. Missing fields remain visibly unavailable rather than being inferred.
- A stable-sector atlas may plot source-carried coordinates such as energy differentials, speed regime, $D_{\mathrm{plane}}$, and assembly topological charge. The viewer does not calculate those diagnostics. Their producer and provenance must be named, and selecting a point must open the underlying raw record.
- Comparison mode synchronizes only records with compatible declared time and unit transforms. Otherwise it does not advance and explains the mismatch.

The taxonomy-facing collection entry surface must use the [Taxonomy Selection Canvas](requirements-and-design.md#taxonomy-selection-canvas). Its preview spheres are no-zoom, independently rotatable inspection frames containing only source-carried architrinos and polarity-matched paths; they do not inherit Borg's dotted spherical-envelope overlay.

## Display Modes

1. **Recorded-path playback**: playback with scrub and slow-motion. An `evolved-record` draws retained EOM history through source-declared depth $h$; a prescribed `chart-hypothesis` draws only its declared display path through its source-defined positive whole number of periods. A prescribed trail is not simulation evidence.
2. **Chart pose**: static hypothesis rendering with ansatz curves and overlays.
3. **Co-rotating / screw-frame camera**: a fixed-coordinate prescribed chart is a still image in its declared frame, while an evolved relative-periodic branch may retain internal motion there. The camera exposes departures from the declared frame without treating visible motion as failure.
4. **Envelope**: display-only time-averaged swept envelope (fusiform, oblate, or emergent shape) evaluated from the record's declared interpolation.
5. **Comparison**: two or more records side-by-side or overlaid with synchronized time — the collapse-protocol view.
6. **Export**: static images for corpus figures; animation export remains visibly unavailable until its encoding and file contract are implemented.

## Overlays

Polarity coloring; speed color-mapped against $c_f$ with explicit field-speed-crossing markers; per-binary frequency labels; planar-offset separation; spin and polarity-dipole glyphs with the $\chi=\operatorname{sign}(\mathbf p\cdot\mathbf S)$ sign where the record's metadata supports them; event markers from the record's event list; and source-carried branch, braid-certification, axis-alignment, topological-charge, or capture status. Overlays render only record-carried or declared-arithmetic display quantities. Base paths always retain the exact color of their owning architrino and, for rotating geometry with the required carrier, fade to transparent over the trailing half-turn $\pi$; a diagnostic overlay may not replace that base identity.

## Borg Integration Rule

Keep Borg's canonical spherical-envelope scene, playback surface, and display policy, while giving assembly-view replay the record schema above as its only data spine. The existing direct-record route is the first replay entry point, not completion of this packet. Assembly-view replay must never consume the live EOM bridge directly; it consumes only `assembly-view-record.v0` files through the shared adapter and record replay runner.

## Non-Goals (v0)

No physics inside assembly-view replay; no live engine coupling from replay; no editing of records; no viewer-authored branch diagnostics; and no authority upgrade. A source record may carry booked evidence, but rendering it creates no new evidence and cannot strengthen its claim grade. The provenance banner says so. Borg's separate simulation workspace may request an EOM solver run, but that capability does not weaken these replay-mode non-goals.
