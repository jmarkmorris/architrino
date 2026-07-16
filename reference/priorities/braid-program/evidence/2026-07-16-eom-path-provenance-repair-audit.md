# EOM Path-Provenance Repair Audit — 2026-07-16

## Verdict

**PASS for path provenance; HOLD for Campaign 1 execution (derived static trace,
with measured serialization and contract checks below).**

The only failed source in the earlier
[audit](2026-07-16-eom-path-provenance-audit.md), F1, is closed in both permitted
ways with operator sign-off:

1. the checkpoint-chunked harness now serializes the EOM solver's retained
   histories directly into `assembly-view-record.v0`; and
2. sampled replay conversion is permanently barred from evolved-record booking.

Every path source in the audited stack now fits exactly one declared bin. No
hard-coded future motion, analytic orbit substituted for evolution, fabricated
fallback segment, toy interaction law, or producer evidence flag supplies an
evolved segment.

Campaign 1 execution remains on hold for one change-control boundary, not for a
path-provenance defect. The instrument gate forbids upgrading an instrument in
the same change that first exercises it. This repair change may author the
campaign specification, but it may not book a campaign result.

## F1 Closure

### Exact native record path

- **Grade:** derived from the source trace; serialization parity measured below.
- `scripts/eom/attractor-ensemble-harness.cpp:386-408` writes each segment's
  existing start/end, coefficient, position-error, and velocity-error tokens;
  it fits no new curve.
- `scripts/eom/attractor-ensemble-harness.cpp:412-507` writes the complete
  retained history, its history fingerprint, and the boundary between declared
  prehistory segments and evolved segments.
- `scripts/eom/attractor-ensemble-harness.cpp:1001-1008` obtains future histories
  only from coupled EOM evolution or checkpoint resume.
- `scripts/eom/attractor-ensemble-harness.cpp:1064-1076` creates the checkpoint
  from the accepted chunk and writes the view record from that checkpoint's
  histories. Sampled frame rows at lines 1010-1047 are a separate display and
  census path.
- `scripts/eom/attractor-ensemble-harness.cpp:1098-1110` republishes the same
  checkpoint histories at run close with the final run status.
- `scripts/eom/dump-eom-checkpoint-segments.cpp` is a serialization-only audit
  tool. It computes no path; it exposes checkpoint tokens for exact comparison.

**Measured falsifier check:** a two-path, opposite-polarity, one-step smoke run
produced one declared straight prehistory segment and two accepted half-step
segments per path. The audit dumper and the record compared equal for every path
id, history fingerprint, segment time token, coefficient token, and error token.
The comparison returned `true`. A single unequal token would have failed the
check.

### Sampled converter bar

- `scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs:32-87`
  hard-codes converted output to `claimGrade: "chart-hypothesis"` and
  `evidenceStatus: "display-only"`.
- Its source evidence label is retained only as
  `conversion.sourceEvidenceStatus`; the ratified instrument gate says that
  field is never consumed for booking.
- `tests/assembly-view-record.test.js:159-191` locks the bar and confirms the
  converted display record remains viewable without becoming state evidence.
- `reference/priorities/braid-program/campaigns/instrument-gate.md:21-29` bars
  sampled-replay reconstruction from evolved-record evidence, and lines 44-60
  separate authoritative native segments from display interpolation.

Operator sign-off: reply `a` on 2026-07-16 selected exact native emission plus
the converter bar.

## Five-Bin Re-Audit

### (a) Master-equation evolution

The earlier audit's EOM evolution classification remains valid. Accepted future
segments originate in `src/eom/src/CoupledEvolution.cpp`: candidate cubics are
constructed from retained endpoint state and certified master-equation
acceleration snapshots, rejected candidates are not published, and atomic
accepted histories are the only histories advanced. Checkpoint resume restores
those histories and re-enters the same coupled evolution path. The current
`use_certificate_cost_feedback` option in
`src/eom/native/eom_borg_shadow_cli.cpp:334-337` may reduce a trial step after an
expensive certificate; it changes the numeric controller, not the equation or a
path segment source.

The harness record writer is publication, not evolution: it copies accepted
checkpoint tokens without arithmetic. The Python oracle independently evolves
its own retained histories with its own decimal-interval implementation and is
reference evidence only.

### (b) Declared initial condition / prehistory

Caller-supplied cubic histories, the provenance-bound uniform-circular factory,
harness circular/straight seed histories, fixture histories, and oracle input
histories remain declared inputs. The native record's
`declaredPrehistorySegmentCount` makes their boundary explicit; no input segment
is counted as evolved output.

### (c) Certified numeric specialization

The pinned-fold acceleration and onset specializations remain restricted by
uniform-circular provenance, exact field-speed conditions, history fingerprint,
root-free complement, and explicit interval remainder certificates. The
multirate coarse publication remains enclosed by the full-versus-two-half-step
dense discrepancy budget. These specialize the unchanged master-equation
integral or its certified temporal step; Campaign 1 bars them by staying strictly
sub-field.

### (d) Display-only

Harness frame sampling, census reduction, app frame/trail sampling, and replay
conversion are display/reduction paths only. The converted cubics now remain in
this bin because their claim grade and gate status cannot enter evolved-record
booking.

### (e) Non-evidence analysis

`src/prescribed-path-analysis`, prescribed-orbit modes in
`scripts/eom/antipodal-binary-spiral-law.cpp`, observable-table interpolation,
and analytic hinge checks remain conditional analysis on assumed paths. No
import from `src/prescribed-path-analysis` enters `src/eom`, the EOM harnesses,
or `scripts/eom/oracle`.

## Firewall and Independence Checks

- **Prescribed-path firewall — PASS (derived):** targeted import search found no
  downstream route into EOM evolution, campaign harnesses, or the Python oracle.
- **Oracle independence — PASS in declared scope (derived, suites measured):**
  the oracle imports its own history, interval, root, acceleration, and
  evolution modules. It consumes no harness record and no engine-authored
  shortcut.
- **Producer flags — PASS (derived):** `canonicalEomEvidence` remains emitted as
  false compatibility metadata only. Converted `sourceEvidenceStatus` is
  explicitly non-authoritative. Campaign booking relies on the external gate,
  residuals, root clearance, and oracle parity.
- **Checkpoint restore — PASS (derived):** restore validates the model and
  checkpoint fingerprints and reconstructs the retained prefix; resumed future
  segments still come only from coupled evolution.

## Build and Focused Validation

Build freshness used for the smoke exercise:

- live `src/eom` source digest:
  `93509f9726b5786ce881a0ebd9de85423410bcac4d0824e0c4ca2ce32d58a11c`;
- latest `src/eom` source change: `2026-07-16 13:33:56 -0400`;
- rebuilt `libeom_native.a`: `2026-07-16 13:28:18 -0400`, SHA-256
  `b2a9c52681f1f9eb7e66ba66f48906841f59579a9540c08547adbae36640f07f`;
- completed EOM build (`eom_borg_shadow_cli`):
  `2026-07-16 13:39:20 -0400`, SHA-256
  `ff9bf0909509d8e07b73719378b6e23dcefef5ed46be4039617ecbda86b7ebec`;
- audit harness: `2026-07-16 13:41:50 -0400`, SHA-256
  `e6d1724a344b6a4878378fdbf383ca5d1ca82003d99563e4fc1235caaaa168a3`.

Measured checks:

- rebuilt `/tmp/architrino-eom-build` successfully before the smoke run;
- native C++ fixture suite: 3/3 passed;
- compiled both the harness and checkpoint-token dumper with
  `-Wall -Wextra -Wpedantic` and no diagnostics;
- one-step exact-segment smoke: completed, release root clearance certified,
  exact checkpoint/record comparison `true`;
- shared adapter ingested the exact native record with polarities `[+1,-1]` and
  complete coverage `[-8,0.01]`;
- `node --test tests/assembly-view-record.test.js tests/prescribed-orbit-causal-roots.test.js tests/borg-eom-runtime-contract.test.js`: 21 passed;
- the earlier audit's oracle Phase 4 acceptance suite: 12 passed;
- the earlier audit's oracle reference-kernel suite: 6 passed.

The oracle suites were rerun after the repair and again passed 12/12 and 6/6.
A concurrent EOM CLI edit landed after the first rebuild; the freshness check
invalidated that provisional identity, so the solver was rebuilt and the smoke,
exact-token comparison, and hashes above were repeated against the later build.

The first manual `jq` smoke assertion used the wrong expected fingerprint prefix
(`fnv1a64:` instead of the actual `fnv1a64-chain-v1:`) and returned false. The
record was correct; the corrected assertion and the full token comparison both
returned true.

## Falsifier and Gate Consequence

This PASS is overturned by any evolved record token that differs from its EOM
checkpoint, any record whose evolved segment count crosses into the declared
prehistory prefix, any consumer that upgrades a converted chart hypothesis, or
any new future-segment constructor outside coupled EOM evolution. Inspect the
checkpoint/record exact comparison, the converter contract test, and the static
segment-constructor inventory.

Part 1 is closed. Part 2 specification may open. Production execution remains
held until a separate change ratifies exact native record emission, preserving
the instrument gate's independence rule.

## Durable Capture Decision

**Priority-only.** This is an executable-instrument provenance result, not a
reader-facing theory claim. Nothing is promoted into `content/markdown/aaa`.
