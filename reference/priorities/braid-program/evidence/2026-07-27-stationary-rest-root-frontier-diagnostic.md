# Stationary-Rest Root-Certification Frontier Diagnostic

Status: CURRENT-SOURCE DIAGNOSTIC; ORDINARY CROSS-ROOT CORRELATION INPUT MISSING; NO CAMPAIGN FATE OR BREATHER RESULT BOOKED (2026-07-27).

## Current blocker

The unchanged R0 stationary-rest seed from [the predeclared diagnostic](../campaigns/stationary-binary-breather-diagnostic.md) again certifies release clearance and evolves atomically through $T=1.2399999999999993$. The attempted step to $T=1.2449999999999992$ fails closed for both cross pairs with:

```text
status=uncertified
failure=numeric_precision_limit_exhausted
diagnostic=interior_root_not_surrounded/joint_root_history_missing
precision_bits=512
mpfr_attempts=3
```

Claim grade: measured current-source EOM-solver diagnostic. The run is not an independent correctness check and does not advance G3/G4 acceptance.

Plainly: the solver still reaches the same close-approach frontier. More arithmetic precision does not close the next causal-root bracket because this harness run supplies no certified correlated retained-history state for the joint-root theorem to consume.

The difficult source cell is $[0.5291610487003345,0.5291846272349358]$, with width approximately $2.35785\times10^{-5}$. At the diagnostic point, the residual enclosure is $[-3.66243\times10^{-6},4.86289\times10^{-6}]$. The transmitter-side-factor enclosure is strictly positive, $[0.8442914442,0.8443089455]$, and the receiver-side-factor enclosure is strictly positive, $[1.4466184673,1.4466517286]$. The difficult cell has opposite endpoint signs.

Claim grade: measured difficult-cell certificate emitted by the EOM solver. The rounded values above summarize the exact directed MPFR tokens retained in the local diagnostic log.

Plainly: this is an ordinary simple-root-width problem, not a field-speed fold, zero-normal event, missing root sign change, or ambiguous root count. The root exists inside the cell, but the independent history boxes are too wide to surround it within the declared root-time tolerance without the missing correlation certificate.

## Code path

The campaign harness constructs a sharp-chart `NativeCoupledEvolutionRequest` in [`attractor-ensemble-harness.cpp`](../../../../scripts/eom/attractor-ensemble-harness.cpp) without populating `joint_histories`. The exact-pair MPFR route can consume joint receiver/transmitter histories and apply the certified joint-root bracket, but it records `joint_root_history_missing` when those histories are absent. The current App Solver packet already identifies the upstream obligation as a certified retained joint state produced by the endpoint corrector, not an observer-side correlation guess; see [the root-time budget theorem](../../app-solver/evidence/borg-current-root-time-budget-theorem-2026-07-20.md).

Claim grade: derived from the live request-construction and exact-pair classification paths. Falsifier: the live harness request supplies certified joint histories for this run, or the same difficult root certifies without them under the unchanged tolerance and solver contract.

Plainly: the missing object is now narrower than “extend root completeness.” The production request needs an accepted correlated retained-history carrier at this step. Raising the MPFR ceiling or enabling the finite-width fold route would not address the failure that was measured here.

## Small scoped advance

The harness halt diagnostic now emits the root certificate's diagnostic classification, achieved precision, MPFR-attempt count, difficult source segment and cell, difficult-point residual, both factor enclosures, and endpoint signs. This is instrumentation only: it changes no EOM-solver equation, tolerance, root decision, retained history, checkpoint, or publication behavior.

Claim grade: implemented diagnostic instrumentation, validated by rebuilding the harness and reproducing the unchanged R0 halt. Falsifier: the rebuilt harness omits any named field above or changes the accepted endpoint or halt classification.

Plainly: the failure is now operator-inspectable from one run rather than collapsed into the generic `numeric_precision_limit_exhausted` label.

## Build and focused reproduction

- Repository commit at run start: `19dbd156856ca21780ddc86883235a57595b1544`.
- `src/eom` aggregate SHA-256: `432f2802bb215c32d90bbfe2691ea8daae1789dc2db550bd02fda258bcf66f6b`.
- EOM static-library SHA-256: `cd0e1fcaaadc1917f90d4d42a27c480cd5e3e1c7d04db66e51d29a3761dd0c98`.
- Harness source SHA-256: `f5a035e48fd01cac3ef2cb13bc6ac683c8df2fabe46f0765dd86fe2d89d6e283`.
- Harness binary SHA-256: `e4fa19e95300c97e983f5a4fed7f455513a1f6a714a4c970060999072ef71ecb`.
- Release root clearance: `certified_complete`.
- Terminal manifest: `halted_root_completeness_not_certified`, 13 chunks, 316 frame rows, accepted end $T=1.2399999999999993$.
- Native CTest fixtures: 5/5 passed.
- Independent root-certification tests: 23/23 passed.
- Scoped `git diff --check`: passed.

The focused command was:

```text
.tmp/eom-native-dev/attractor-ensemble-harness \
  --seed-family=stationary-rest-binary-v1 \
  --refinement=R0 \
  --history-depth=20 \
  --end-time=1.30 \
  --threads=4 \
  --out-dir=/private/tmp/architrino-stationary-root-frontier-final-019fa33d
```

Raw checkpoints, frames, records, manifests, and logs remain untracked under `/private/tmp`; no prior campaign artifact was changed.

Plainly: this run rechecked only the lowest-cost certified frontier needed to identify the blocker. It did not search for a fate, crossing, rebound, outer turn, recapture, or repeated breathing.

## Next operator-testable step

Add a validation-only stationary-binary fixture that carries the certified joint retained-history state produced by the accepted endpoint-corrector path, then replay the unchanged R0 difficult step $1.2399999999999993\rightarrow1.2449999999999992$. Advancement requires both cross-pair roots to become `certified_complete` under the unchanged $10^{-5}$ root-time tolerance, or to fail closed on a new named certificate row with the input history unchanged. Do not enable that carrier for Campaign 1 in the same change that first exercises the fixture.

This test would falsify the present blocker diagnosis if the joint state is present but the same roots still end as `interior_root_not_surrounded/joint_root_history_missing`.

Plainly: first prove the missing correlated state can close this exact root without changing the rules. Only a later, separately reviewed change may consider it for campaign execution or G3/G4 reacceptance.
