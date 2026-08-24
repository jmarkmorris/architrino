# A1.1 History-Policy Extension Independent Acceptance Review

Date: `2026-07-28`

Status: `independent-acceptance-unresolved`, `null-score`, `prescribed-path-only`, `diagnostic-only`, and `priority-only`.

Claim grade: measured review of retained evidence and derived closed-form history controls; no independent continuous-family acceptance claim.

## Review scope

This review inspected the completed [history-policy extension receipt](2026-07-28-a1-1-outer-radius-history-policy-extension.md), its [protocol](../../../../src/prescribed-path-analysis/protocols/a1-1-outer-radius-history-policy-extension-protocol.v1.json), [durable summary](a1-1-outer-radius-history-policy-extension-summary.v1.json), runner, owning interval and projection certifiers, direct-coordinate recomputation instrument, scoped tests, and owner ledger. It did not change the calculation, radius interval, retained-history reach, tolerance, precision, geometry, or resource rules.

The reviewed protocol remains confined to

$$
\frac{9}{8\sin(9/8)}<\alpha_3\le\frac54,
\qquad
\frac78\le\alpha_1\le\frac{15}{16},
\qquad
\alpha_2=1,
$$

with relative phases $(0,2\pi/3,4\pi/3)$ and retained reach $\chi=145/64$. The left endpoint remains owned by the earlier $\chi=9/4$ boundary record.

Plainly: the review found no scope expansion or change to the frozen calculation. It reviewed only the newly authorized outer slice.

## Gates that reproduced

The runner reproduced the prior boundary protocol, result, and summary hashes exactly:

- protocol: `79c93f59eb113fbeb7ad05aa9f6067b06ccc129bd4df9d2ca3a7f5e3ce9a1cfd`;
- result: `ae2596b32d046c4657de805777732e4695d455e2ad247546f7f5d1fbb9900e95`;
- summary: `284bf4e33f82a996d31ce04547f52fa49f1e4f144e10753a18602232c26be37c`.

Its `counterexample-diagnostic` classification and exact history-edge boundary at $\alpha_3=9/(8\sin(9/8))$ remain unchanged. The extension protocol, result, and summary also reproduced their frozen hashes:

- protocol: `b09b1b5a07db3904acfc387e8da90a2e282f93946b1f2c294fcbc3a4618f6f4f`;
- result: `edae3d88d1347656519f7efba4d0f9f530aec4eab7fce78bf687f4c28125145c`;
- summary: `ddf8e622f0556b64c6cf348b6d9ee9cb109f7c28fc19dac508e356c9d540f57e`.

Plainly: the old boundary was replayed exactly, and the new packet is deterministic. Replay establishes identity and reproducibility, not independent mathematical acceptance.

A separate closed-form recomputation, without importing the packet evaluator, confirmed the history-control values at $\alpha_3=5/4$:

| Control | Independently recomputed value | Disposition |
| --- | ---: | --- |
| Residual at $\chi=9/4$ | `0.0056689852477380676` | insufficient |
| Residual at $\chi=289/128$ | `0.002049973344485867` | insufficient |
| Residual at $\chi=145/64$ | `-0.001603521279709863` | sufficient |
| Outer-self root | `2.2622051713025657` | strictly interior |
| Root delay derivative | `-0.46792205389343355` | simple |
| Next history-edge radius | `1.2508853279964334` | above $5/4$ |

Plainly: the exact new history reach is supported for the outer-self history-edge calculation, and the smaller declared control remains too short.

The retained packet reports all $36$ ordered channels, zero unresolved producer rows, $12$ interbinary representatives plus $12$ exact endpoint-inversion rows, and six positive receiver-phase projection sheets. Its twelve pointwise projection witnesses, endpoint-inversion control, phase seam control, synthetic-fold control, resource-exhaustion control, and null-score disposition all pass their declared producer gates. The full scoped suite passed `33/33` tests.

Plainly: the packet is complete as a diagnostic record with explicit Verification incomplete states. The tests confirm its declared behavior and negative controls, but they do not by themselves supply an independent proof of the continuous numerical claims.

## First unresolved independent-acceptance gate

Independent acceptance stops at the preserved left boundary

$$
\alpha_3=\frac{9}{8\sin(9/8)}.
$$

The first new-slice obligation immediately above that boundary is continuous interbinary root-sheet topology. The producer certifier reports one simple root over each of $12$ representative parameter families and reuses exact endpoint inversion for the other $12$ ordered channels. No separately authored instrument independently recomputes the endpoint exclusion, fold exclusion, anchor root count, and connected-family continuation over the complete new $\alpha_3$ and phase domain.

The available direct-coordinate recomputation evaluates retained point witnesses. The owning baseline protocol explicitly limits agreement from that instrument to diagnostic parity rather than independent acceptance. The twelve finite-difference projection witnesses are also point controls; they do not independently enclose the six projection derivatives over their complete root sheets. Deterministic replay and the scoped tests exercise the same producer path and therefore do not close this independence gap.

Plainly: no numerical counterexample was found. Acceptance is withheld because the continuous-family conclusion has only producer evidence plus sampled checks, not a separate full-domain verifier.

The precise falsifier for this unresolved disposition is a separately authored verifier, kept independent of the frozen producer change, that consumes the sealed protocol and result identities and independently establishes:

1. endpoint root exclusion over the complete new slice;
2. no fold over all $12$ interbinary representative families;
3. exactly one anchor root per representative and continuation across the connected parameter domain;
4. exact endpoint-inversion coverage of the remaining $12$ ordered channels; and
5. strictly positive receiver-phase projection on all six declared root sheets.

That verifier must retain the same tolerances, precision, geometry, reach, and resource rules and must return Verification incomplete with a Not advanced disposition on any unresolved enclosure. Until then, the completed extension remains an evaluated diagnostic packet but is not independently accepted.

## Claim boundary

This review introduces no candidate, retention, stability, binding, physical realization, physical superluminal transport, energy, action, angular-momentum dynamics, radiation, pressure, general-relativity recovery, or Campaign 1 claim. It does not alter the earlier boundary record or the completed extension result. No reader-facing promotion is authorized.

Plainly: the arithmetic and deterministic diagnostic packet survive review, while independent acceptance remains unresolved at the first continuous new-slice topology gate.
