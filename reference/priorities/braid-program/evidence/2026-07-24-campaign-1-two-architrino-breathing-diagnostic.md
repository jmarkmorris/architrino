# Campaign 1 Two-Architrino Breathing Diagnostic

Status: WITHDRAWN HISTORICAL DIAGNOSTIC; RAW RUN REMOVED; NO CAMPAIGN FATE OR PHYSICS RESULT BOOKED (2026-07-24).

> The operator removed the underlying Campaign 1 run bundles during the post-review simulation reset. The numerical narrative below remains only as a record of why the old run was investigated. It is not current evidence and must not seed, validate, or benchmark a new run.

## Question

Does the first declared two-architrino case show repeated closing and opening under the EOM solver?

The tested coordinates use $c_f=1$, separation $d=1$, speed $s=0.25$, and the Campaign 1 opposite-polarity coupling and retained histories. The head-on coordinate used $\theta=0$; the transverse coordinate used $\theta=\pi/2$. All runs began with certified-complete release root ledgers.

Plainly: these are real EOM-evolved paths from the ratified Campaign 1 workload, not prescribed paths. They are still diagnostic slices rather than a completed campaign.

## Measured Traces

The head-on `P0-inertial` refinement ladder remained strictly inward until the EOM solver failed closed:

| Refinement | Accepted end | Final separation | Final radial speed | Reversals | Halt |
| --- | ---: | ---: | ---: | ---: | --- |
| R0 | $0.775$ | $0.4272556$ | $-1.1089208$ | 0 | `root_completeness_not_certified` |
| R1 | $0.915$ | $0.2518402$ | $-1.4401723$ | 0 | `root_completeness_not_certified` |
| R2 | $0.99375$ | $0.1235923$ | $-1.8907984$ | 0 | `root_completeness_not_certified` |

The inward certification limit moved to smaller separation under refinement. The R2 trace remained strictly sub-field through its accepted endpoint; the largest individual path speed was $0.9453993<1$.

Plainly: the head-on pair did not turn around in any certified interval. This does not show that turnaround is absent; certification stopped in the exact close-approach region where crossing or turnaround would have to occur.

The transverse R1 trace completed one inward-to-outward reversal. Its sampled radial-speed sign bracket was

$$
\dot r(1.7175)=-0.0007271745,
\qquad
\dot r(1.7200)=+0.0008247760.
$$

The sampled minimum separation was $0.77577103$. By $t=1.9$, separation had increased to $0.78681960$ with $\dot r=+0.12597253$. The largest individual path speed through that completed trace was $0.57016572<1$. The same sign change and sampled minimum were reproduced by two consecutively rebuilt EOM solver binaries while interval and certified-acceleration work was arriving in the live checkout.

Plainly: the transverse pair completed one real rebound—half of a possible breath. A breathing mode requires a later outward-to-inward reversal and then repetition; neither was reached.

## Identity and Claim Boundary

The Campaign 1 harness required one compatibility-only change after the EOM history container became iterator-based: exact record emission now walks segments in order rather than indexing them. The harness source SHA-256 was `f382aa77ae2a5eca6a345a9cde814866d597622fde4ad228be076b3e5df7ddeb`.

The final completed confirmation used:

- EOM source digest at build: `53a9b9de8bdb7267e30ae2c48bdcd2e346b0d86d22aad499b13a043a5c7d82cc`;
- EOM library SHA-256: `730dd6e1db9ebef92f2cb39a4d95373020a5efba074cf6d8cefd01a133278ac0`;
- harness binary SHA-256: `73a121ea3ff77120c5451fc39a241bf85c12f0a08236d25bf06d2855798186e6`;
- run-manifest SHA-256: `c4b7b72dfab585f16fb7b1bfa1f371cc3f8de0a01876c832217b32aec8a89b80`;
- exact EOM assembly-view record SHA-256: `6710ed1d932290e269dc198aa2b10685aa5c189ec830ccf970c415148cff2fe4`.

The raw confirmation run was intentionally removed on 2026-07-24. The live EOM source changed again during the run, after that binary was built. Therefore the hashes identify the tested executable exactly, but the result is not a current-live-source production receipt and is no longer reproducible from a retained run bundle.

Plainly: the rebound was reproduced across changing certification code, but the checkout was still moving. This is one reason the result remains diagnostic.

No Campaign 1 fate follows. The trace did not reach the $H=20$ prehistory collapse boundary or a post-clearance claim window; it has no R2 transverse confirmation, no three-prehistory collapse comparison, no independently authored master-equation residual ledger, and no per-run independent-oracle window. The harness's streamed frames are EOM output but are not an independent check of the EOM solver.

Plainly: this result nominates the transverse binary for continued work. It does not establish retained binding, periodic breathing, a persistent assembly, or any particle role.

## Falsifier and Next Burden

This diagnostic is overturned if a source-frozen R1 or R2 rerun fails to reproduce the inward-to-outward sign change with certified-complete roots, or if an independent residual/oracle check rejects the accepted segment. A breathing claim requires the first later outward-to-inward reversal, at least one repeated cycle, all three endpoint-matched prehistories, R1/R2 agreement, post-$H$ root clearance, residual ledgers, and independent-oracle parity.

Plainly: the immediate engineering blocker is certified root completeness over the longer transverse path and through the head-on close approach. Once that opens, the scientific question is whether the observed rebound repeats and forgets its seeded history.
