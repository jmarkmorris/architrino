# EOM Migration Plan

## Status

- Stage: `borg-eom-default-developer-test`
- Migration authority: `operator-directed-default-with-fail-closed-evidence-boundary`
- Endorsed solver: `EOM`
- Existing zombie-solver: `temporary-compatibility-only`
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
Borg now defaults to the EOM shadow route. It constructs a certified exact
inertial $C^1$ seed over the declared memory interval, invokes the native C++
coupled engine, and withholds trajectory publication through one complete EOM
burn-in horizon. At the horizon boundary the runner discards the seed and
retains only the most recent EOM-produced history window. Subsequent display
frames come only from atomically published EOM extensions. The seed certificate
accepts the polynomial only as mathematical initial datum and records
`eomOutput=false` and `canonicalEomEvidence=false`. The zombie-solver
compatibility path remains available only as the explicit
`?eom=compatibility` diagnostic route.
The Master EOM is a delayed path-history equation, so its initial condition is
a continuous past interval rather than one instantaneous position and
velocity. The forward EOM cannot uniquely reconstruct that past from the cut
state: different past paths can end at the same state while producing different
delayed interactions. Borg must therefore receive an explicit retained-history
input before the EOM can extend it forward.
Applying a new Borg population constructs one exact inertial polynomial per
selected path over the declared retained-history interval. This is an accepted
initial datum under the frozen EOM contract, not an evolved past and not
canonical EOM evidence. The ordinary developer shadow still uses its short
interactive burn-in, but the active promotion target is the deterministic
eight-path prefix `1001`–`1008` with a 90-unit history interval. Its maximum
initial causal delay is about `79.36964`, so the promotion harness evolves from
$T=0$ through $T=90$ without publishing burn-in frames. Only at $T=90$ can it
remove the seed interval $[-90,0]$ and retain an EOM-only moving window.
The eight-path seed-cut control has executable architecture evidence only; it
is not eligible for promotion because it still consumes the accepted seed.
The Borg shadow surface now supports a selected continuous-history subset of
1–16 architrinos, requested duration, automatic fixed-size chunks, progress,
native cancellation, and clean restart. A strict eight-path seed-cut timestep
ladder at root and state tolerances `1e-8` completed at steps `0.01`, `0.005`,
and `0.0025`. Its maximum state difference was about `6.30e-14`; the
one-thread and four-thread `0.0025` histories were byte-identical; and no
causal-root failure was reported. This measured control does not reproduce the
former off-diagonal-pair `numeric_precision_limit_exhausted` failure, but
it is not the post-burn-in migration gate because the input still contains the
accepted seed. The strict burn-in has accepted through $T=34.4940625$. A
strict-tolerance adaptive continuation from that checkpoint consumed the
600-second process budget without publishing another accepted boundary. It
therefore did not create the EOM-only $T=90$ checkpoint from which the strict
post-burn-in ladder must run. The post-burn-in precision verdict remains
unreached, and bounded-run completion within the declared resource envelope is
the first current blocker. The long-term million-path, GPU, multi-GPU, and
distributed-history gates do not block Borg's eight-path migration.

The shared checkout currently contains a concurrent, uncommitted removal of
the Borg compatibility runner and query branch. That work did not follow from
this promotion verdict and is not accepted promotion evidence. It must not be
integrated as a promotion result unless a later run produces the seed-free
$T=90$ checkpoint and passes the post-burn-in ladder.

The former 16-path `[0.06,0.07]` diagnostic was not regulator divergence. Its
base finite-width event certificate failed on a causal root entering through
the oldest retained-history boundary, but the regulator wrapper masked
`insufficient_history_depth` as `regulator_convergence_failed`. The engine now
preserves the upstream failure code and an interval regression verifies atomic
rejection. That retired 16-path event is not part of the active eight-path
promotion envelope.

## Initial Consumer Disposition

| Consumer | Initial disposition | Migration condition |
| --- | --- | --- |
| Existing zombie-solver | Preserve only as temporary compatibility for current dependencies. Freeze its consumer and capability surface: no new work may adopt or extend it, and its current `canonical_eom_evidence` flag is not dynamical evidence. | Retire after every dependency has an explicit EOM replacement, retained non-evolution role, quarantine decision, or retirement decision. |
| Borg | Default the developer-test page to the fail-closed EOM shadow runner. Use the accepted initial-datum-only seed followed by a complete EOM burn-in horizon, and retain the zombie-solver only behind `?eom=compatibility`. | EOM passes the independent bounded-population precision and convergence gates; any regenerated fixture must come from accepted EOM output. |
| Causal Delay Feedback | Quarantine prescribed-path replay from physical prediction. Do not carry path guidance or snapping into EOM. | Rebuild the display from EOM-produced paths or retain it only as a clearly separate path-analysis/visualization tool. |
| Animator | Quarantine solver-derived-motion claims based on authored, linear, constant-acceleration, or constrained future paths. Preserve existing files to avoid dependency breakage. | Animator becomes a viewer of EOM-produced datasets; it must not author the future path consumed as physical evolution. |
| Photon | Keep photon path analysis outside EOM until retained input history and the Master EOM naturally reproduce a photon path. A prescribed photon path remains an analysis input, not an evolved photon. | Migrate only after an EOM run produces and validates the relevant photon retained history without future path prescription. |
| Ideal Braid app | Quarantine dynamical and long-term claims while tracing its solver and path dependencies. | Re-enable EOM authority only after each path source is classified and the app consumes validated EOM histories. |
| legacy braid workstream research instruments | Preserve artifacts, but distinguish prescribed-path force/root screens from modeled trajectories and prevent the former from promoting dynamical claims. | Re-run selected high-value instruments on EOM histories after the knowledge-tree audit identifies their exact dependency chain. |
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
