# Composer / Reaction Workstream

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Directory Guide

- [app-architecture](app-architecture.md) — overall architecture for how dedicated apps fit into the Architrino web app.
- [flow](./flow.md) — strict five-lane reaction-flow contract and the migration status for adjacent-only routing.
- [reaction](./old-reaction.md) — `reaction` app design and `reaction`-owned priorities.
- [solver](./old-solver.md) — `reaction`-side solver design, limits, and solver-owned priorities.
- [combo](./combo.md) — Combo app design as the request-intake, solve-review, and Xyzzy-publication surface.
- [pdgfeed](./pdgfeed.md) — PDG-facing ingest, normalization, and proposal-review work.
- [composer](./composer.md) — `composer` design and `composer`-owned priorities.

## Current Cross-Doc Queue

1. [flow](./flow.md) and [solver](./old-solver.md): finish native solver emission of the strict five-lane adjacent-only graph so request-backed library solves and accepted exports stay identical without compatibility rewrites.
2. [reaction](./old-reaction.md): finish the manual provenance workflow and keep `reaction` as the primary conservative authoring surface.
3. [reaction](./old-reaction.md) and [composer](./composer.md): keep the `reaction-flow/v1` boundary honest now that accepted handoff documents carry the full explicit five-lane path.
4. [composer](./composer.md): finish authored observer framing and autoscale UI on top of the now-working `reaction` handoff intake.
5. [pdgfeed](./pdgfeed.md): build `pdgfeed.py`, fixtures, and the first normalized candidate export path into `solver-request/v1`.

## Subapp Workflow Overview

The overall pipeline is:

`pdgfeed -> solver -> reaction -> composer`

This is a data pipeline, not a shared-runtime pipeline. Each stage should accept a versioned input, do its own job, and emit a versioned output for the next stage.

### Subapp Roles, Inputs, And Outputs

#### `pdgfeed`

Purpose:

- reads PDG-backed decay or channel data;
- normalizes that data into Architrino-owned candidate records;
- and emits solver requests.

Input:

- PDG fixture data stored in the repo;
- or live PDG data through the local Python `pdg` package and local SQLite access.

Current run method:

- command line through `pdgfeed.py`.

Current CLI examples:

- `python3 pdgfeed.py list-fixtures`
- `python3 pdgfeed.py emit-fixture <fixture-id>`
- `python3 pdgfeed.py list-live-cases`
- `python3 pdgfeed.py emit-live-case <case-id>`

Output:

- proposal-review JSON artifacts for inspection;
- and `solver-request/v1` JSON for the solver.

Visual output:

- none.

#### `solver`

Purpose:

- takes a solver request;
- computes conservative mappings, operator placements, and candidate closures;
- and returns structured solve results for `reaction`.

Input:

- command-line input that points to or contains a `solver-request/v1` JSON payload for a direct solve run;
- or a `solver-request/v1` JSON file, including one produced by `pdgfeed`.

Output:

- structured JSON for `reaction` review and correction.

Visual output:

- none.

#### `reaction`

Purpose:

- is the conservative authoring and review surface;
- lets the author inspect, correct, or manually build the reaction;
- and accepts the reaction for downstream handoff.

Input:

- solver output JSON;
- or manually authored reaction structure in the `reaction` UI rather than from JSON input;
- or a library entry that resolves to a canonical `solver-request/v1` fixture and is solved on selection;
- or a reaction JSON file loaded by the developer.

Output:

- accepted `reaction`-owned handoff JSON for `composer`;
- visual reaction diagrams inside the `reaction` app;
- and exported reaction images where needed.

Visual output:

- yes: the reaction diagram and related exported images.

#### `composer`

Purpose:

- stages the final observer-facing scene;
- turns accepted reaction flow into live visualization, timing, framing, and media;
- and exports scene output and recorded presentation material.

Input:

- accepted `reaction` handoff JSON, currently the `reaction-flow/v1` style boundary;
- or a built-in reaction-derived scene spec JSON document;
- or a previously saved `composer` JSON file.

Output:

- live visualization in the `composer` runtime;
- composed scene JSON;
- and recorded animations or other presentation exports.

Visual output:

- yes: live scene preview and final animation-oriented output.

## Start Points

These are the practical entry workflows, with the intended audience called out for each one.

### A. Start With `pdgfeed`

Audience:

- developer
- advanced user

Use this when the source of truth is PDG data and you want to begin upstream.

This path should support two modes:

- built-in PDG fixture or live-case selection for the guided path;
- user-specified PDG reaction or channel selection for the advanced path.

Boundary rule:

- every PDG-selected case, whether built in or user specified, should be normalized into `solver-request/v1` JSON before entering the solver.

Workflow:

1. Run `pdgfeed.py` from the command line.
2. Choose a built-in fixture, a built-in live PDG case, or a user-specified PDG reaction or channel.
3. Inspect the generated proposal JSON artifacts.
4. Emit a `solver-request/v1` JSON candidate.
5. Pass that JSON into the solver.
6. Pass solver output JSON into `reaction` for review and acceptance.
7. Export accepted `reaction` output JSON into `composer`.
8. Stage and record the final visualization in `composer` if needed.

Short form:

- choose PDG channel -> emit solver request -> solve -> review in `reaction` -> hand off to `composer`.

### B. Start With `solver`

Audience:

- developer
- advanced user

Use this when you already know the reaction you want to solve and do not need PDG ingest first.

This path should support two modes:

- built-in `solver-request/v1` JSON fixtures for the guided path;
- loaded `solver-request/v1` JSON files for the advanced path, including files emitted by `pdgfeed`.

Boundary rule:

- `solver` should consume explicit request JSON rather than hidden app state or ad hoc text commands.

Workflow:

1. Start the solver directly.
2. Choose a built-in solver request, or load a `solver-request/v1` JSON file.
3. Run the solve.
4. Inspect the solver JSON result.
5. Open that result in `reaction`.
6. Accept or manually correct the reaction in `reaction`.
7. Export the accepted handoff JSON to `composer`.
8. Build the final observer-facing scene in `composer`.

Short form:

- choose solver request -> solve -> review in `reaction` -> hand off to `composer`.

Note:

- if built-in solver requests exist, they should be treated as developer fixtures or canned examples, not as a replacement for the explicit request format.
- advanced users may also enter here by loading a `solver-request/v1` JSON file directly, including one generated from a user-specified PDG channel upstream.

### C. Start With `reaction` Using A Built-In Or Loaded Spec

Audience:

- developer
- user

Use this when you want to work at the reaction-authoring level without running PDG ingest or the solver first.

Workflow:

1. Open `reaction`.
2. Choose a reaction-library entry, or load a reaction JSON file directly.
3. Review and edit participants, mappings, and operators in `reaction`.
4. Run the solver from inside `reaction` if helpful, or stay manual.
5. Accept the reaction once the provenance story is correct.
6. Export the accepted handoff JSON from `reaction`.
7. Open that handoff in `composer`.
8. Stage and refine the final visualization.

Short form:

- open reaction library entry or reaction JSON -> edit and accept in `reaction` -> hand off to `composer`.

### D. Start With `reaction` And Build A Manual Solution

Audience:

- developer
- user

Use this when the main task is conservative manual authorship rather than upstream ingest or automatic solving.

Workflow:

1. Open `reaction` with a blank or minimal setup.
2. Add reactants, products, center assemblies, and operators manually.
3. Author mappings and disassembly or reassembly structure manually.
4. Use the solver only as an optional assistant, not as the source of truth.
5. Validate the final reaction by visual inspection and conservation checks.
6. Accept the reaction.
7. Export the accepted handoff JSON.
8. Open it in `composer` for final staging and animation.

Short form:

- author manually in `reaction` -> accept -> hand off to `composer`.

### E. Start With `composer`

Audience:

- developer
- user

Use this when the immediate task is scene staging, observer framing, playback, or presentation work.

Workflow:

1. Open `composer`.
2. Choose a built-in `reaction`-derived scene spec JSON document, or load a `composer` JSON file or `reaction` handoff JSON file.
3. Inspect the imported assemblies, paths, and timing.
4. Adjust observer framing, overlays, media, pacing, and scene structure.
5. Preview the live visualization.
6. Export composed scene JSON or record animation output.

Short form:

- load reaction-derived scene data -> stage in `composer` -> preview -> export or record.

### F. Developer Closure Sweep Across Many PDG Reactions

Audience:

- developer

Use this when the goal is not to author one reaction, but to measure solver coverage across many PDG reactions and see which cases reach conservative closure.

Core tools:

- `pdgfeed.py`
- `solver.py`

Optional inspection tools:

- `reaction` for inspecting selected failures, borderline cases, or unexpectedly strong closures;
- `composer` is not part of the closure-sweep loop.

Workflow:

1. Run `pdgfeed.py` in a batch mode over many built-in or user-selected PDG reactions or channels.
2. Emit one `solver-request/v1` JSON file per candidate case.
3. Run `solver.py` over that batch of `solver-request/v1` JSON files.
4. Record one solver result JSON file per case.
5. Compute a summary report that says how many cases were attempted, how many reached closure, how many failed, and why they failed.
6. Group failures by reason, such as unsupported particle mapping, missing operator family, conservation mismatch, or incomplete projection rule.
7. Open selected result JSON files in `reaction` only when a human needs to inspect the provenance story or decide whether a failure is expected.

Short form:

- batch PDG cases -> emit `solver-request/v1` JSON -> batch solve -> summarize closure coverage.

Design rule:

- this workstream should stay easy to run from the command line and should not require opening `reaction` or `composer` for routine coverage measurement.

Desired output:

- a machine-readable summary JSON report;
- and a human-readable coverage summary showing total cases, closure count, non-closure count, and the main failure buckets.

Important boundary:

- `composer` should start from accepted reaction data whenever the task depends on reaction correctness.
- `composer` may visualize and refine presentation, but it should not become the place where reaction solving or provenance correction happens.

## Workflow Rule

If a reaction begins from PDG data, whether that PDG case is built in or user specified, the workflow should be:

- choose PDG reaction or channel;
- normalize it in `pdgfeed`;
- emit `solver-request/v1` JSON;
- solve from that JSON in `solver`;
- review and accept the solver result JSON in `reaction`;
- and only then hand accepted reaction JSON into `composer`.

That keeps user flexibility high without collapsing the app boundaries.
