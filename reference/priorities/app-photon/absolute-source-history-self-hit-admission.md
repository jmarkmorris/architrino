# PHO-004 Absolute-Source-History Self-Hit Admission

## Status And Claim Boundary

This packet closes the Photon app's rejection classification for helical same-transmitter causal-root candidates. The app preserves numerical root candidates for diagnostic inspection but separately states whether each candidate is admitted on the declared regular chart. The result is `measured` at `display-only-visualization` grade and does not establish self-interaction, retention, phase locking, photon stability, or a physical photon branch.

The implementation lives in [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js), the sweep aggregator in [PhotonSelfHitSweepRuntime.js](../../../src/apps/photon/PhotonSelfHitSweepRuntime.js), and the focused fixtures in [photon-runtime.test.js](../../../tests/photon-runtime.test.js).

Plainly: solving the distance-delay equation finds a candidate event. The app now asks a second question—whether that event has a usable, nonsingular causal-root derivative—before calling it regular.

## Admission Rule

For a same-transmitter candidate root, the transmitter-side factor is

$$
D_t=c_{\mathrm{sig}}-\hat{\mathbf n}\cdot\mathbf v_t(\tau),
$$

and the app's declared regular-chart floor is

$$
\nu_t=10^{-4}.
$$

The root record carries $|D_t|$, $\nu_t$, and the signed margin $|D_t|-\nu_t$. The admission classification is ordered and fail-closed:

| Status | Exact condition | Meaning |
| --- | --- | --- |
| `transversality_not_certified` | no finite $D_t$ or the source causal-factor status is nonzero outside the explicit singular cases | the solver row does not prove a regular crossing |
| `singular_root` | $|D_t|\le10^{-9}$ | the point lies on the numerical singular boundary |
| `jacobian_floor_failure` | $10^{-9}<|D_t|\le10^{-4}$ | the derivative is finite but below the admitted regular-chart margin |
| `admitted_regular_root` | $|D_t|>10^{-4}$ and causal-factor status is zero | the candidate is usable as a regular display-domain root |

The `rootFound` field continues to mean that the numerical delay equation produced at least one candidate. `regularRootFound`, `admittedRootCount`, `rejectedRootCount`, and `rejectedRootReasonCounts` carry the separate admission result. The aggregate record reports candidate, admitted, and rejected totals, and their identity must satisfy

$$
N_{\mathrm{candidate}}=N_{\mathrm{admitted}}+N_{\mathrm{rejected}}.
$$

Plainly: the app does not erase near-singular candidates, because they are useful diagnostics. It also does not let them count as ordinary regular roots.

## Phase-Family Boundary

Phase-family grouping may retain rejected candidates to show where a putative family approaches a singular chart. Such a family is labeled `singular_candidate` and cannot be `stable_phase_lock` or `candidate_phase_lock`. Only a separate accepted evolution and retention argument could elevate any regular candidate beyond display diagnostics.

Plainly: a repeated phase pattern near a singularity can be interesting, but it is not evidence that a photon sustains itself.

## Sweep Extension Rule

The existing [756-case sweep receipt](helical-self-hit-phase-lock-sweep.receipt.v1.json) is a provenance-bound historical diagnostic. It found no stable phase-lock family and already reported 422 singular-candidate families. This change introduces no new transmitter-history family, so the sweep was not expanded or regenerated. Future sweeps automatically aggregate admitted and rejected root counts and exact rejection reasons; a new sweep is warranted only when the app adds a new transmitter-history family or changes the declared root-admission mathematics.

Plainly: repeating the same 756 cases would only remeasure the same prescribed histories. The useful change here is better classification, not a larger pile of equivalent cases.

## Acceptance And Falsifiers

| Claim | Acceptance condition | Falsifier |
| --- | --- | --- |
| Singular roots fail closed | $|D_t|\le10^{-9}$ produces `singular_root` and is not admitted | any singular candidate is labeled regular |
| Small-Jacobian roots fail closed | $10^{-9}<|D_t|\le10^{-4}$ produces `jacobian_floor_failure` | a below-floor row is admitted or loses its signed margin |
| Missing transversality fails closed | absent/nonfinite $D_t$ or an otherwise uncertified causal-factor row produces `transversality_not_certified` | missing derivative evidence is reconstructed, defaulted to regular, or silently omitted |
| Regular roots remain available | $|D_t|>10^{-4}$ with status zero produces `admitted_regular_root` | a certified above-floor row is rejected by this classifier |
| Counts close | candidate count equals admitted plus rejected count per record and sweep summary | any root is double-counted or unclassified |
| Claim boundary is preserved | all rows remain display-only diagnostics | a root or phase family is cited as retained self-interaction, stability, or photon identity |

Focused validation on 2026-09-02 passed 61 of 61 Photon tests. A twelve-row fixture produced three admitted regular roots and three each of `singular_root`, `jacobian_floor_failure`, and `transversality_not_certified`; the sweep summary test verifies count closure.

Plainly: PHO-004 is complete because every numerical self-hit candidate now has an explicit regular-chart disposition, and none can gain physical authority from classification alone.
