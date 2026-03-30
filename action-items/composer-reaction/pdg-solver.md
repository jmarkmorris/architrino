# PDG Solver

## Purpose

The PDG solver is the planned ingest-and-seeding app for the reaction pipeline.

Its job is to:

1. read PDG reaction/channel data and related metadata;
2. normalize that data into a stable app-side schema;
3. submit the normalized channel into the reaction app;
4. let the reaction app resolve a conservative provenance-preserving flow;
5. return the resulting reaction flow JSON to the composer for animation.

This is the bridge between published reaction data and the internal reaction-authoring model.

## Current State

- There is no dedicated PDG solver runtime in `src/runtime/` yet.
- There is no dedicated PDG solver scene under `content/scenes/archie/` yet.
- The current repo state is planning and reference material:
  - this note;
  - the earlier architecture brainstorm;
  - and `content/markdown/aaa/reactions/pdg-api.md`, which records the intended official PDG data path.
- The current intended data source is the PDG Python package `pdg` with its local SQLite workflow, not an ad hoc scrape.
- No fetch pipeline, normalization layer, reaction-app bridge, or composer handoff is implemented yet.

So the PDG solver is currently a planned app boundary, not a running app.

## Current Priorities

1. Create the dedicated PDG solver app surface and runtime boundary.
2. Implement PDG ingest using the official `pdg` package and a pinned PDG database edition.
3. Normalize channel data into a stable schema that includes reactants, products, energy, branching or weight metadata, and source references.
4. Feed that normalized schema into the reaction app so it can generate conservative reaction flow JSON rather than leaving the composer to interpret raw PDG channels.
5. Return solved reaction flow data plus first-pass observer hints to the composer.

## Follow-On After The Manual Baseline Is Solid

Once the manual reaction workflow is genuinely stable, the PDG solver can expand into:

- ranked candidate proposals;
- pin, forbid, and rerun-on-remainder controls;
- provenance summaries and diagram exports;
- external API use where it sharpens solving rather than distracting from the manual baseline;
- possible MadGraph-assisted channel work;
- and scene-builder or API-mode handoff once the stored reaction payload is stable.

## APE Architectural Stance

The older brainstorming name for this layer was the **Architrino Provenance Engine (APE)**.

Its motivating premise remains useful:

- current PDG tables act like chemical equations, but they treat particles as irreducible distinct entities;
- the missing layer is sub-component provenance;
- if the solver tracks where every architrino comes from and goes to, high-energy physics becomes a kind of geometric chemistry;
- and the Noether Sea stops being treated as "nothing" and starts being treated as a real medium or reactant reservoir.

## Core Channels And Closure Checks

This design should follow a dominant-channel inclusion rule:

- include channels with at least about 1% contribution in the target regime;
- where PDG branching ratios are available, use `BR > 1%`;
- where they are not, use contribution to modeled event yield.

Initial high-priority solver channels:

- dominant electroweak reactions and scatterings;
- dominant electromagnetic radiation channels in plasma or beam contexts;
- and dominant hadronic channels used to close event-level conservation and provenance in reconstruction workflows.

Observer-level closure checks should remain explicit:

- threshold/rate closure should recover standard PDG/QFT thresholds and leading rates for implemented dominant channels;
- conservation closure should enforce charge, momentum, and energy closure at each event, with explicit provenance accounting;
- and any substrate-level parameterization must reduce to standard observer-level predictions in validated regimes.

## AAA Assembly Interpretation By Channel

- channel events are interpreted as substrate reconfiguration with provenance-preserving relocking of existing architrinos, not ex nihilo creation;
- the intermediate soup state is an operational bookkeeping layer for temporary component pools under conservation constraints;
- and solver output must provide component-level provenance from input state plus local substrate recruitment where required by channel energetics.

## Core Data Structure: The Stack

In the Standard Model, a particle is a set of quantum numbers. In this solver architecture, a particle is a hierarchical graph.

Particle object:

- core tri-binary:
  - inner binary;
  - middle binary;
  - outer binary.
- axial layer:
  - the specific architrinos attached to the poles.
- state:
  - velocity;
  - orientation;
  - phase.

Hidden reactant: spacetime medium

- the solver should assume the reaction happens in a bath of spacetime assemblies;
- it should be able to pull spacetime assemblies into the reaction to provide mass or structure;
- and it should also be able to dump broken binaries back into that bath.

## Solver Logic Flow

The solver should not jump directly from reactants to products. It should model the transitional bookkeeping in stages.

### Phase 1: Disruption

- load the reactants;
- check interaction energy;
- low energy means mostly axial stripping or exchange;
- medium energy means outer or middle binary disruption;
- high collider-like energy means deeper core disruption.

### Phase 2: Intermediate Soup

- create a temporary list of free components;
- include recruited spacetime assemblies when needed to balance mass or energy;
- calculate the net charge and net momentum of the soup.

### Phase 3: Reassembly

- look at the target product list from PDG data;
- attempt to build the product cores using the available components;
- and preserve provenance whenever possible, for example carrying one inner binary from a proton into a resulting neutron.

### Phase 4: Waste Calculation

- if there is surplus material that cannot settle into a stable assembly slot, the solver should account for that excess rather than hiding it;
- if there is a deficit, it should recruit from spacetime and account for the remainder;
- and every channel should be allowed to report waste or dark-sector-style residue explicitly instead of pretending the reaction closed perfectly on visible products alone.

## Case Study: Neutron Reaction

The neutron channel \(n \to p + e^- + \bar{\nu}_e\) remains a useful design case.

In this solver picture:

- the neutron core is loaded as the reactant structure;
- a geometric instability or channel event opens the reaction;
- spacetime material can be recruited from the Noether Sea;
- most of the neutron core persists into the proton;
- the emitted electron and anti-neutrino are assembled from the shed pattern plus recruited substrate;
- and the resulting flow diagram should show where the proton inherited structure, where spacetime inflow occurred, and how much substrate was consumed.

That is exactly the kind of output ordinary PDG channel notation does not provide.

## Waste-Heat And Unused-Pair Logic

The older "unused pair" speculation is still worth preserving as a solver design question.

If a disrupted binary cannot find a stable assembly slot within the allowed reaction window, one candidate rule is:

1. radiative damping;
2. collapse;
3. approach to max-curvature behavior;
4. terminal compact neutral binary or hard-radiation-style residue.

Whether or not the final physics claim survives unchanged, the software design implication is useful:

- the solver should be able to report a waste-heat or leftover-residue metric rather than forcing every event to close only on named visible products.

## ARL Direction

The related ARL brainstorming is still useful as the long-range execution model.

Core purpose:

- an explicit reaction language and execution model for reactions;
- deterministic or at least provenance-explicit transactions on identified constituents;
- and a GPU-friendly scheduling model for channel execution.

Fundamental premises:

- matter is built from discrete architrinos assembled into stable structures;
- each architrino has a unique id so its history can be traced across reactions;
- and the Noether Sea is a real medium containing pre-existing ids rather than a null pool.

Useful primitive operations remain:

- `LOCK(IDs)`
- `LOOSEN(IDs)`
- `QUERY_PHASE(Assembly)`
- `DOCK(A, B)`
- `EXCHANGE(A_sub, B_sub)`
- `SPLIT(Parent -> Child1, Child2)`
- `MERGE(Parent1, Parent2 -> Child)`
- `DE_STEALTH(Region)`
- `SCAVENGE(Source, NoetherSea)`

The final implementation does not need to start as a full ARL language, but it should avoid blocking that future direction.

## Required Input And Output

The PDG solver input side should be able to represent:

- the chosen PDG channel or decay mode;
- reactants and products;
- energy or threshold context;
- branching or weighting metadata when available;
- and enough source metadata to keep the pipeline reproducible.

The PDG solver output side should not try to be the final animation format by itself.

It should produce:

- normalized reaction-app input;
- solver metadata about the source channel;
- and, after reaction resolution, a reaction flow JSON that the composer can stage and animate.

## Development Constraint

The PDG solver should stay a bridge layer.

It should not become a second reaction app and it should not become a second composer. Its value is:

- reliable PDG ingest;
- clean normalization;
- disciplined handoff into the reaction app;
- disciplined handoff from solved flow into the composer;
- and preservation of the deeper provenance-oriented architecture that motivated it in the first place.

## Related Action Items

- [composer-reaction](./composer-reaction.md)
- [reaction](./reaction.md)
- [composer](./composer.md)

## Related AAA Notes

- [pdg-api](../../content/markdown/aaa/reactions/pdg-api.md)
- [reaction-ledger](../../content/markdown/aaa/validation/reaction-ledger.md)
- [validation-protocols](../../content/markdown/aaa/validation/validation-protocols.md)
