# Braid Program — Instrument Gate

Status: PARTIALLY RATIFIED; G3/G4 RESET PENDING FRESH VALIDATION (2026-07-24).
First campaign-independent spec in this directory, per
[../method.md](../method.md) Instrument Requirements. Forward-only: rewritten
when acceptance status changes; history lives in the work log.

This gate answers three questions for every campaign: which instruments may be relied on, what a campaign must show before its results are booked, and what record every run must emit so its output is viewable evidence from day one.

## 1. Capability Status

Each entry names the instrument, its acceptance or pending basis, and the
evidence pointer. Accepted means *usable by a campaign under the stated
conditions*; pending capabilities are barred until their stated fresh
validation closes. Neither status confers canonical authority, which only the
EOM acceptance/migration gates can grant.

**G1. EOM coupled delayed-history evolution (`src/eom`, Stage E engine).** Accepted for campaign use at evidence grade `executable_architecture_evidence` (noncanonical). Basis: engine acceptance suites green (measured — [EOM attractor-search instrument work log](../../app-solver/attractor-search-work-log.md), 2026-07-15); the independent oracle `eom_independent_oracle/v0` is complete through Phase 4 with frozen mathematical binding and certified piecewise-cubic history representation (measured — [app-solver oracle record](../../app-solver/independent-dynamical-acceptance-oracle.md)), providing the independent side for the per-campaign parity duty in G5. Condition: every campaign names the engine build it ran (build time vs. last `src/eom` source change — a stale binary is a wrong answer that looks slow).

**G2. Master-equation residual evaluation along evolved trajectories.** Accepted as the Stage S instrument applied to Stage E output. Condition: the residual reduction is authored fresh from the owning spec's definitions with predeclared tolerances (method.md rule), never imported from legacy instruments.

**G3. Checkpoint-chunked ensemble harness
(`scripts/eom/attractor-ensemble-harness.cpp`).** Not currently accepted for
campaign execution. The operator removed the historical checkpoint/resume and
replay artifacts after the 2026-07-24 EOM solver review. The
[2026-07-16 serialization ratification](../evidence/2026-07-16-checkpoint-record-emitter-ratification-and-campaign-1-workload-validation.md)
is retained as historical instrument design evidence, but it does not accept
the corrected solver. Reacceptance requires a fresh build, byte-identical
checkpoint resume, exact checkpoint-to-record token parity, sanitizer coverage,
and declared cross-chunk comparison.

**G4. Release root-ledger clearance.** Interface available but acceptance
pending fresh validation. A new harness run must show that the run manifest
records certified release clearance under the corrected solver. A campaign's
claim window remains closed until that fresh check passes, per method.md delay
discipline rule 3.

**G5. Independent-oracle parity duty.** Every campaign cross-checks at least one declared window of at least one production run against `eom_independent_oracle/v0` certified intervals, with the window, tolerances, and result booked in evidence. Agreement between engine runs, or between a run and its own replay, is determinism evidence only — the oracle is the independent side.

## 2. Barred

- **Any non-EOM engine or retired-evaluator capability**, for computation or evidence, under any labeling. Self-reported evidence fields from any engine other than EOM (for example a `canonicalEomEvidence` flag asserted by the producer itself) are never consumed. Non-EOM output is barred outright.
- **Campaign windows crossing field-speed folds** until the root-completeness certificate extension lands (live-state Waiting On item). The sub-field rung-1 campaign is unaffected.
- **Any ensemble campaign using G3/G4 before their fresh validation packet is
  accepted.**
- **Prescribed-orbit evaluation presented as evolution.** Stage S instruments nominate; only Stage E books persistence.
- **Toy interaction laws** (any parameterized stand-in for the master equation) in any campaign path, including display pipelines.
- **Sampled-only trajectories as state evidence.** In a delay system the state is the history; sampled rows are display convenience (see §4).
- **Sampled-replay conversion presented as evolved-record evidence.** `scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs` reconstructs display cubics between sampled endpoint rows. Its output is permanently `claimGrade: chart-hypothesis` with `evidenceStatus: display-only`; `conversion.sourceEvidenceStatus` is provenance metadata only and is never consumed for booking.
- **Canonical-authority claims** for any output until `eom_acceptance_gate/v0` passes; until then all engine output books at `executable_architecture_evidence` or lower.

## 3. What Every Campaign Must Show Before Booking

Restating method.md's acceptance gates as the operational checklist, plus the emission duty this gate adds:

1. Declared prehistories for every run (an input, not a default).
2. Collapse protocol on object-level temporal claims: three or more materially different prehistories, endpoint-matched, evolved past the delay horizon, compared on symmetry-reduced observables.
3. Refinement envelope declared and the result inside it (step, history segmentation, root-search depth, chunking per G3).
4. Master-equation residuals within the declared gate along the trajectory (G2).
5. Root-ledger clearance certified before the claim window (G4).
6. Independent-oracle parity window booked (G5).
7. A named falsifier with where to look.
8. **An `assembly-view-record.v0` file emitted for every booked run and every collapse-protocol seed** (§4), landed beside the run's evidence file. A booked result without its viewable record is an incomplete booking.

## 4. Assembly View Record v0 (adopted schema)

Finalizes the sketch in [assembly-viewer-requirements.md](../../app-borg/assembly-viewer-requirements.md); this section is now the schema's source of truth. Records are plain JSON files; the viewer never talks to a live engine. The viewer-not-instrument rule governs all consumers: records are drawn, never re-evolved, and a display adapter may evaluate only the record's own declared interpolation.

Top-level fields:

- `schema` — `"assembly-view-record.v0"` (required).
- `provenance` (required): `engineId`, `engineVersion`, `runId` (required), `claimGrade` ∈ {`chart-hypothesis`, `evolved-record`} (required, compatibility enum whose verification is required for advancement), `evidenceStatus` (the run's evidence grade, e.g. `executable_architecture_evidence`; conversion and display never upgrade it), `generatingSpec` (path or id of the owning campaign spec), `date`, and, for converted records, a `conversion` block naming the converter, source schema, interpolation rule, and non-authoritative `sourceEvidenceStatus`. `engineId: eom-solver` identifies EOM solver output or its declared sampled-record conversion path. `engineId: prescribed-geometry` is permitted only with `claimGrade: chart-hypothesis`, `evidenceStatus: display-only`, and a concrete `prescribedGeometry` block naming `emitterId`, `sourceSchema`, `interpolation`, `errorMethod`, `physicsInvoked: false`, the finite declared `responseCenter`, and the positive `sphericalEnvelopeRadius`. The response center supplies only the record-to-viewport origin; it does not mutate Borg's envelope. This engine id can never identify an `evolved-record`. For all records, `engineVersion`, `generatingSpec`, and `date` must be concrete; `unspecified` does not advance.
- `window` (required): `start`, `end`, `delayHorizon` ($h$), `sampleInterval`.
- `worldlines[]` (required, nonempty): `id`, `polarity` (+1 for $\epsilon_+$, −1 for $\epsilon_-$), optional `charge`/`stateFlags`/`pathKey`, `coverageStart`/`coverageEnd`, `interpolation` (declared rule, e.g. `piecewise-cubic-hermite/v0` or `exact-inertial-polynomial/v1`), and:
  - `segments[]` — contiguous `{startTime, endTime, coefficients[3][4], positionError, velocityError}` rows in the `eom_evolution_contract/v0` segment shape (per-axis cubics in local time). Required for any record that will be animated or booked. In an `evolved-record`, these are the EOM solver's authoritative retained-history tokens because the state of a delay system is its history; the worldline also declares `declaredPrehistorySegmentCount`, `evolvedSegmentCount`, and `historyFingerprint`. In a `chart-hypothesis`, the same segment carrier supplies continuous recorded-path playback only. It is not a simulated history and carries no state-evidence authority.
  - `samples[]` — optional display-only `(t, position, velocity?)` rows. Never evaluated as state; a segments-free worldline does not advance in the shared adapter.
- `binaries[]`, `ansatz[]`, `events[]` — optional metadata per the requirements sketch; passed through to overlays untouched.

Numeric values may be JSON numbers or numeric string tokens (the contract convention); consumers coerce them and do not advance on non-finite values.

**Emission paths.** The accepted harness path writes `assembly-view-record.json` atomically after each checkpoint and at run close directly from the checkpoint's retained histories. It serializes each segment's exact decimal time, coefficient, and error tokens, and records the declared-prehistory/evolved-extension boundary; sampled replay rows do not enter this path. `scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs` remains available only for display: it rebuilds cubic-Hermite display segments from sampled position+velocity rows and is barred from evolved-record booking. `scripts/eom/generate-spindle-chart-record.mjs` is the source-defined `prescribed-geometry` display emitter for the illustrative spindle chart hypothesis. It evaluates only the declared analytical chart and emits bounded Hermite display segments; `--check` fails on generated-record drift. It invokes no EOM solver path and has no evidence-booking authority.

**Consumers.** The shared display adapter `src/apps/shared/EomHistoryDataset.mjs` ingests this schema and `eom_evolution_contract/v0` behind one interface (contract tests: `tests/assembly-view-record.test.js` and `tests/spindle-chart-record.test.js`). Borg replays records directly at `borg.html?eomRecord=<url>`; replay clamps to recorded coverage and never synthesizes frames past it. Its braid selector is routing metadata only and sends the chosen sealed record through that same URL path.

## 5. Change Control

Acceptance-status changes (a capability accepted, barred, or upgraded; the schema versioned) are edits to this document with a dated work-log entry. A capability may not be upgraded in the same change that first exercises it, and no instrument named here may be modified in the same change as a result it certifies.
