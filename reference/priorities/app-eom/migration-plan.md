# EOM Migration Plan

## Status

- Stage: `borg-shadow-executable-promotion-blocked`
- Migration authority: `none-until-eom-validation`
- Endorsed solver: `EOM`
- Existing central solver: `temporary-compatibility-only`
- EOM implementation: native correctness nucleus, coupled certified traversal, checkpoint layer, persistent Borg worker, and controlled Borg shadow adapter executable

## Migration Principle

EOM is the endorsed solver and sole forward production target. Keep the current solver running only for dependencies that have not yet migrated. Do not add new consumers, physical capabilities, evidence claims, or forward solver work to the old implementation. Migration remains an explicit consumer-by-consumer decision made only after EOM demonstrates the required self-consistent Master Equation evolution for that consumer.

The knowledge-tree audit must distinguish two fundamentally different outputs:

- predictions obtained by evaluating forces, roots, or stability around a prescribed path;
- paths produced by evolving retained history under the Master EOM.

The first category can remain useful at a limited claim level, but it is not evidence that the prescribed path occurs dynamically.

The current native `architrino_solver_integrate_master_equation_motion_f64` routine is now a verified non-EOM compatibility calculation. Its successful summary reports `canonical_eom_evidence = 1` even though it consumes no retained history, computes no causal roots or receiver-normal rows, excludes self-pairs, and emits zero wake rows. The implementation remains in place for dependencies, but that field is non-authoritative. See [current-solver-failure-audit.md](current-solver-failure-audit.md).

The Borg fixture and compatibility runner now record
`canonicalEomEvidence=false` and `eomEvidenceStatus=non_eom_compatibility_output`.
An opt-in Borg EOM shadow route imports continuous cubic history through an
absolute cut time, rejects state-only input, invokes the native C++ coupled
engine, and derives display frames only from atomically published extensions.
The first 16-path shadow step completed, but only at coarse tolerances and with
`executable_architecture_evidence`; it is not eligible for promotion.
The Borg shadow surface now supports a selected continuous-history subset of
1–16 architrinos, requested duration, automatic fixed-size chunks, progress,
native cancellation, and clean restart. A strict one-path timestep ladder at
root tolerance `1e-8` passed through four requests on one persistent worker,
with maximum endpoint delta about `2.84e-14` and byte-identical one-thread and
four-thread output. This is a control success, not the Borg migration gate. A
subsequent 16-history ladder failed closed at every tested step: all 240
off-diagonal ordered pairs reported `numeric_precision_limit_exhausted`, while
the 16 self-pairs did not appear in the root-failure set. Imported-history
provenance and the bounded-population precision and convergence gates also
remain unresolved. The long-term million-path, GPU, multi-GPU, and distributed-
history gates do not block Borg's 16-path migration.

## Initial Consumer Disposition

| Consumer | Initial disposition | Migration condition |
| --- | --- | --- |
| Existing central solver | Preserve only as temporary compatibility for current dependencies. Freeze its consumer and capability surface: no new work may adopt or extend it, and its current `canonical_eom_evidence` flag is not dynamical evidence. | Retire after every dependency has an explicit EOM replacement, retained non-evolution role, quarantine decision, or retirement decision. |
| Borg | Preserve the current page and fixture for compatibility, but treat the existing motion result as non-EOM output pending provenance correction. Borg is the first intended EOM migration target. | EOM passes its independent gate, then an identical-input shadow run is reviewed and the fixture is regenerated from EOM. |
| Causal Delay Feedback | Quarantine prescribed-path replay from physical prediction. Do not carry path guidance or snapping into EOM. | Rebuild the display from EOM-produced paths or retain it only as a clearly separate path-analysis/visualization tool. |
| Animator | Quarantine solver-derived-motion claims based on authored, linear, constant-acceleration, or constrained future paths. Preserve existing files to avoid dependency breakage. | Animator becomes a viewer of EOM-produced datasets; it must not author the future path consumed as physical evolution. |
| Photon | Keep photon path analysis outside EOM until retained input history and the Master EOM naturally reproduce a photon path. A prescribed photon path remains an analysis input, not an evolved photon. | Migrate only after an EOM run produces and validates the relevant photon retained history without future path prescription. |
| Ideal Braid app | Quarantine dynamical and long-term claims while tracing its solver and path dependencies. | Re-enable EOM authority only after each path source is classified and the app consumes validated EOM histories. |
| braid-ideal research instruments | Preserve artifacts, but distinguish prescribed-path force/root screens from modeled trajectories and prevent the former from promoting dynamical claims. | Re-run selected high-value instruments on EOM histories after the knowledge-tree audit identifies their exact dependency chain. |
| T3 | Keep as a separate model-specific simulator with no Master EOM authority. | No automatic migration. Audit only if a future EOM consumer needs its topology or visualization. |
| Other solver consumers | Default to quarantine from EOM authority until classified. | Explicit audit and migration decision. |

## Phases

### Phase 0 — Freeze And Inventory

- leave all current runtime dependencies operational;
- reject new production imports, consumers, and physical capabilities under `src/solver`;
- inventory every direct and transitive consumer of current motion, prescribed histories, root evaluators, fixtures, and solver-labeled evidence;
- record whether each output is path evaluation, constrained replay, model-specific stepping, display interpolation, or actual Master EOM evolution;
- correct false EOM or canonical-evidence labels before using those outputs in new claims;
- treat the current native routine's `canonical_eom_evidence = 1` as invalid provenance even while the compatibility ABI remains operational;
- do not delete artifacts needed to reconstruct how existing conclusions were obtained.

### Phase 1 — Standalone EOM Build

- implement all new solver capabilities in EOM without changing unmigrated consumer defaults;
- use new EOM-owned contracts and files rather than silently reusing a current solver method whose semantics differ;
- keep input/output adapters at the boundary so existing path-history records can be imported only after validation;
- produce EOM-native checkpoints, histories, root ledgers, and provenance.

### Phase 2 — Independent Validation

- run the independent dynamical oracle;
- demonstrate timestep, interpolation, precision, regularization, and thread-count convergence;
- demonstrate that future path constraints cannot affect the answer because no such input exists;
- demonstrate checkpoint/restart and single-thread/multithread agreement;
- classify unsupported envelopes and unresolved chart events fail-closed.

This phase applies the base-contract validations to the consumer's declared
population and duration. The optional million-path amendment is not a
prerequisite for bounded-population migration.

### Phase 3 — Borg Shadow Migration

- freeze one Borg input history and model contract;
- run the current compatibility path and EOM without changing the displayed app;
- compare trajectories, roots, accelerations, history coverage, performance, and first-failure behavior;
- treat disagreement as expected evidence of different models, not as a parity failure to be tuned away;
- replace the Borg fixture only after EOM output provenance and app interpretation are correct.

### Phase 4 — Knowledge-Tree Recovery

- trace current solver outputs into scripts, fixtures, priority packets, prose, score arguments, and app descriptions;
- retain prescribed-path calculations only as conditional force/root/stability evaluations;
- withdraw or restate temporal, release, dispersal, stability, photon, braid, and long-term claims that require an evolved path but lack one;
- select the smallest high-value rerun set rather than mechanically rerunning every historical diagnostic;
- keep accepted evidence, candidate diagnostics, and invalidated dynamical claims in separate records.

### Phase 5 — Consumer-By-Consumer Migration

For each consumer, decide one of:

1. migrate to EOM evolution;
2. remain a prescribed-history analysis tool with explicit non-evolution provenance;
3. remain a visualization-only consumer of EOM outputs;
4. remain a separate model-specific simulator;
5. quarantine pending a theory or dependency audit;
6. retire after its last dependency is removed.

No bulk redirect is allowed.

## Migration Gate

A consumer may claim EOM-produced motion only when:

- its initial retained history and model contract are preserved in the run record;
- no future path, constraint, or display curve enters the EOM input;
- its output path ids resolve to accepted EOM step and history rows;
- the relevant convergence and first-failure evidence passes;
- every ordered pair in the consumer's declared population is explicitly or
  certifiably accounted for, with difficult rows resolved or failed closed;
- the consumer displays the EOM version and run identity;
- the run derives `evidence_status=canonical` from the exercised contract gates rather than accepting an evidence label from the caller or backend;
- previous prescribed-path results remain distinguishable from the new EOM result.

GPU, multi-GPU, distributed-history, and million-path conformance are required
only when the consumer's declared execution envelope uses or claims them.

## Retirement Boundary For The Existing Solver

The existing solver is not retired merely because EOM works. Until retirement it remains temporary compatibility, not an alternate development target. Retirement requires a complete dependency inventory, replacement or retained non-evolution decision for every current consumer, preserved access to historical fixtures, and a verified absence of production imports that still require the existing runtime. The migration is complete only when that inventory reaches zero production dependencies and the old solver can be removed without breaking an authorized compatibility use.
