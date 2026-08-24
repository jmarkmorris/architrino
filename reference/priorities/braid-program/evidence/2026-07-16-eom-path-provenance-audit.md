# EOM Path-Provenance Audit — 2026-07-16

## Verdict

**FAIL (derived — static path-source trace, with focused suites measured below).**

The EOM solver itself appends accepted future segments only through coupled master-equation evolution. The campaign booking pipeline does not preserve that property: `convert-borg-trajectory-to-assembly-view-record.mjs` constructs new cubic segments from sampled endpoint rows and labels them as an `evolved-record`, while `assembly-view-record.v0` defines those segments as authoritative retained history. Those cubics are display interpolation, not EOM-published evolution.

Part 2 is closed. No Campaign 1 specification or run was started.

Claim scope: this audit certifies the current source tree only. It does not grant canonical authority to the EOM solver or ratify the draft braid-program charter and instrument gate.

## Audit Question and Acceptance Rule

The audited question was whether any path in the named stack is computed, substituted, or assumed by a route other than coupled master-equation evolution of declared retained histories. Every path source had to fit exactly one of:

1. **master-equation evolution**;
2. **declared initial condition / prehistory**;
3. **certified numeric specialization** of the unchanged master-equation integral;
4. **display-only** interpolation that is never state; or
5. **non-evidence analysis** on assumed paths.

Any source crossing those roles fails the audit.

## Verification Required for Advancement Finding

### F1 — sampled replay interpolation is promoted to authoritative evolved history

- **Grade:** derived.
- **File and lines:**
  - `scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs:30-84` assigns `claimGrade: "evolved-record"` after grouping sampled frame rows.
  - `scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs:87-143` constructs one cubic-Hermite segment between each sampled endpoint pair.
  - `reference/priorities/braid-program/campaigns/instrument-gate.md:49-59` defines `segments[]` as authoritative retained history, bars sampled-only state, and names this converter as the interim Campaign 1 emission path.
  - `src/apps/shared/EomHistoryDataset.mjs:195-243` accepts those constructed segments as the record's segment state; its rendering is display-only, but it cannot recover the missing EOM segment provenance.
- **Mechanism:** the harness samples EOM histories at accepted endpoints and writes position/velocity rows. The converter then fits a new cubic between consecutive samples. Endpoint agreement does not establish the path between endpoints, and the converter supplies no enclosure of the EOM-published cubic or of the unmodified master-equation evolution segment.
- **Why it fits no bin:** the operation is valid as bin (d) display interpolation, but its output is placed in a schema field declared to be retained state and receives the `evolved-record` claim grade. It therefore crosses from bin (d) into an evolution claim without an EOM path source.
- **Blast radius:** every `assembly-view-record.v0` produced through this converter is barred from Campaign 1 booking as evolved state. The current instrument-gate bridge cannot satisfy the per-run assembly-view record duty, so Campaign 1 and the sub-field part of the collinear campaign remain closed. Existing sampled replay rows remain usable for display-only charts when they are not represented as authoritative retained history.
- **Fix:** emit the actual EOM-published segment tokens directly from the checkpoint-chunked harness into each run's `assembly-view-record.v0`. Stream accepted extensions before discarding each chunk, preserve input prehistory versus evolved-extension provenance, and leave the record not advanced if any segment lacks its EOM publication source. Remove the sampled-row reconstruction route from evolved-record booking.
- **Bar alternative:** restrict converter output to display-only/non-evidence use under a schema or claim grade that does not call reconstructed segments authoritative retained history. It must not satisfy a campaign booking duty.
- **Named falsifier of this finding:** an audited record whose authoritative segment tokens are byte-for-byte the EOM-published input and extension tokens, with no sampled-to-segment reconstruction in the booking path, overturns the blocker. Inspect the record's segment provenance against native publication at `eom_borg_shadow_cli.cpp:650-673` or direct harness publication.

## Classified Path-Source Inventory

### (a) Master-equation evolution

- `src/eom/src/CoupledEvolution.cpp:477-536` constructs each candidate future cubic from the retained endpoint state and certified start/end acceleration snapshots.
- `src/eom/src/CoupledEvolution.cpp:841-1079` iterates the coupled corrector; rejected candidates are diagnostic only and are never published.
- `src/eom/src/CoupledEvolution.cpp:2862-3036` applies full-step/two-half-step refinement, recertifies the accepted endpoint, and atomically publishes only accepted histories.
- `src/eom/src/CoupledEvolution.cpp:3195-3379` advances the retained histories only by accepted atomic steps. A rejected attempt leaves the input histories unchanged (`CoupledEvolution.cpp:1253-1292`).
- `src/eom/native/eom_borg_shadow_cli.cpp:650-673` publishes only the segment suffix added beyond the declared input segment count.
- `scripts/eom/BorgNativeEomProcessClient.mjs:230-258` merges only those native extensions back onto the declared histories; it does not synthesize a path.
- `scripts/eom/attractor-ensemble-harness.cpp:836-843` and checkpoint resume call the same EOM evolution entrypoint. Sampling at `attractor-ensemble-harness.cpp:855-891` is downstream display/reduction, not evolution.
- `scripts/eom/oracle/certified_evolution.py:624-940,1019-1309` independently implements the coupled master-equation reference evolution. Its output is reference evidence only and is not a production path source.

### (b) Declared initial condition / prehistory

- `src/eom/src/History.cpp:304-334,516-539` accepts declared cubic retained segments and validates their numeric domain and joins.
- `src/eom/src/History.cpp:541-760` builds a certified uniform-circular retained prefix. It is an authored prehistory, never future evolution.
- `src/eom/native/eom_borg_shadow_cli.cpp:111-246` parses caller-supplied retained histories as inputs before invoking EOM.
- `scripts/eom/attractor-ensemble-harness.cpp:157-212` declares endpoint-matched circular and straight prehistories; its seed-family coordinates are inputs.
- `scripts/eom/attractor-phase0-release-profile.cpp` and `scripts/eom/antipodal-binary-spiral-law.cpp` author circular, straight, spiral, and perturbed prefixes only on the pre-evolution interval.
- `scripts/eom/run-borg-eom-refinement-ladder.mjs:27-48` imports an app-authored inertial retained prefix and explicitly reports that limitation.
- Native fixture CLIs under `src/eom/native/eom_native_*fixture_cli.cpp` and the recursive-block benchmark construct test inputs only; they are not campaign publication routes.
- `scripts/eom/oracle/reference_kernel.py:66-79` supplies an inertial reference history, and `scripts/eom/oracle/certified_history.py:49-388` accepts declared piecewise-polynomial oracle histories.

### (c) Certified numeric specialization

- `src/eom/src/CertifiedAcceleration.cpp:306-318,429-489` gates the pinned-fold analytic residual to a provenance-certified uniform-circular self pair at exactly field speed and intersects it with the direct interval enclosure.
- `src/eom/src/CertifiedAcceleration.cpp:715-741` encloses the unchanged finite-width master-equation cell integral with a midpoint value plus an explicit derivative remainder.
- `src/eom/src/CoupledEvolution.cpp:781-838` gates the measure-zero pinned-fold onset rule by history fingerprint, exact speed equality, complete root-free complement, clear memory boundary, and coincident-endpoint exclusion.
- `src/eom/src/CoupledEvolution.cpp:655-745` may publish a synchronized coarse cubic only when its dense full-versus-two-half discrepancy stays inside the declared synchronization budget. Otherwise the fine segments remain.

Campaign 1 is strictly sub-field, so the pinned-fold specializations would not be eligible in that campaign.

### (d) Display-only

- `scripts/eom/attractor-ensemble-harness.cpp:235-252,357-372,855-891` samples retained histories for frames and census reductions; those rows are not state.
- `scripts/eom/run-borg-eom-refinement-ladder.mjs:159-184` evaluates recorded cubics for endpoint comparison only.
- `src/apps/shared/EomHistoryDataset.mjs:58-111,285-322` evaluates already recorded cubics and creates frames/trails within declared coverage. It does not append or extrapolate state.
- `scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs` would belong here if its Hermite output remained explicitly display-only. Finding F1 is precisely the unauthorized promotion out of this bin.

### (e) Non-evidence analysis

- All public results from `src/prescribed-path-analysis/` are labeled `display-only-visualization`; the package evaluates caller-prescribed paths and has no import into `src/eom` or `scripts/eom/oracle`.
- Its downstream imports are confined to the photon and ideal-braid app analysis surfaces and tests. No EOM evolution or campaign harness imports it.
- `scripts/eom/antipodal-binary-spiral-law.cpp` contains analytic prescribed-path snapshot formulas in addition to its separate EOM evolution mode; those formulas are Stage S diagnostics only.
- `scripts/eom/analyze-antipodal-binary-phase-collapse.mjs` interpolates already emitted observable tables for reduction; it does not produce path state.
- `scripts/eom/antipodal-binary-hinge-oracle.py` is an independent analytic prescribed-circle check, not a trajectory engine.
- `scripts/eom/evolved-history-root-parity.py` deliberately consumes EOM-published segments to recheck causal roots. It is independent root parity, not an independent trajectory evolution window, and cannot by itself satisfy G5 for an evolved path.

## Files With No Path-Construction Authority

The remaining `src/eom` interval, block-exclusion, traversal, exact-pair, multiprecision, and acceleration modules consume retained histories to certify roots or acceleration; they do not create trajectory segments. Performance scripts under `scripts/eom/performance/` profile or model cost and do not publish campaign paths. `profile-borg-incremental-chunks.mjs` orchestrates native runs and does not synthesize histories.

## Firewall and Flag Checks

- **Prescribed-path firewall — PASS (derived):** no import from `src/prescribed-path-analysis` enters `src/eom`, the EOM harnesses, or `scripts/eom/oracle`. App consumers remain labeled analysis/display surfaces.
- **Oracle independence — PASS within its declared scope (derived):** the Python oracle imports its own decimal-interval/history/acceleration modules and no production EOM or app code. It accepts declared histories and computes its own coupled evolution. Engine-authored evolved segments appear only in the explicitly narrower root-parity script, which is not counted as trajectory parity.
- **Producer-asserted evidence flags — PASS (derived):** production sources do not consume `canonicalEomEvidence`. The harness emits it only as `false`; tests assert the false value. EOM authority remains external-gate based.
- **Checkpoint boundary — PASS with scope (derived):** checkpoint creation copies atomically published EOM histories; serialization preserves exact segment tokens, the model fingerprint, and content fingerprints. Restore does not synthesize a segment. A restored prefix remains input provenance and cannot be counted as a new segment of the resumed evolution.

## Focused Validation

- **Measured PASS:** `node --test tests/assembly-view-record.test.js tests/prescribed-orbit-causal-roots.test.js tests/borg-eom-runtime-contract.test.js` — 21 tests passed. These tests establish schema/replay behavior, not the missing EOM path provenance in F1.
- **Measured PASS:** `PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_oracle_phase4_acceptance.py -v` — 12 tests passed, including rejection of false canonical evidence and the curved-prehistory/future-evolution separation.
- **Measured PASS:** `PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_oracle_reference_kernel.py -v` — 6 tests passed.
- **Measured PASS:** `git diff --check` before booking.
- **Command correction:** an initial `python -m unittest tests.<module>` invocation failed because `tests/` is not a Python package. The files were rerun directly; the import error is not an engine or oracle failure.

## Campaign Gate Consequence

Campaign 1 remains queue-active but blocked before specification and execution. No build identity, run inventory, fate table, collapse outcome, residual window, parity window, or rung-2 entry condition can be booked until F1 is fixed or the converter is barred from booking with operator sign-off and an exact native segment emission path exists.

## Durable Capture Decision

**Priority-only.** This is an instrument-provenance result, not a reader-facing theory advance. Nothing is promoted into `content/markdown/aaa`.
