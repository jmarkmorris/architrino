# Stationary-Rest Joint Retained-History Frontier Extension

Status: CURRENT-SOURCE VALIDATION-ONLY CERTIFICATION THROUGH `1.3649999999999967`; NEXT STEP FAILS CLOSED; CAMPAIGN 1 NOT RUN (2026-07-27).

## Result

The committed v2 stationary joint-frontier fixture extends the exact stationary-rest R0 certification from the prior endpoint `1.2449999999999992` through `1.3649999999999967`. Starting from the accepted in-process joint retained histories at `1.2399999999999993`, it advances 25 consecutive atomic steps of width `0.005`. This supplies 24 newly certified steps beyond the prior endpoint without changing the root-time tolerance, precision ladder, controller tolerances, or stationary input.

At the new endpoint, both cross-pair rows are `certified_complete`, each with one root, a certified root-free complement, and one 128-bit directed-MPFR attempt.

Claim grade: measured current-source EOM-solver validation. This extends the root-complete interval for this exact in-process stationary joint-history carrier. It is not independent numerical acceptance of the exact row and does not enable the carrier in a checkpoint or campaign.

Plainly: the existing joint-history representation carries the stationary case 0.12 time units farther than the previous certificate, one accepted step at a time.

## New certified endpoint

Both symmetry-related cross rows returned the same exact tokens:

| Quantity | Exact interval |
| --- | --- |
| Root | `[0.75040621947996012552154758958940881020745, 0.750416203905164537416427858045951560990884]` |
| Transmitter factor | `[0.772523959085527425297506345657020747874006, 0.772537131077021150720651858920096122517525]` |
| Receiver factor | `[1.54250197734454043945146484121218491839711, 1.54254758847801859818992128603194561250022]` |

The rows were:

- `positive` $\leftarrow$ `negative`;
- `negative` $\leftarrow$ `positive`.

Each row used `mpfr_directed_interval`, 128 precision bits, one MPFR attempt, one isolated root, and `root_free_complement: true`.

Claim grade: measured fixture output. Falsifier: a fresh build changes either row from `certified_complete`, loses its single isolated root or root-free complement, changes an exact token, or reaches the row without carrying every accepted prior joint history.

Plainly: both directions certify the same delayed event at the new endpoint, and the rest of each searched interval is proven root-free by the fixture's declared instrument.

## Pinned next-step blocker

The same fixture immediately probes the unchanged next step from `1.3649999999999967` to `1.3699999999999966`. That probe is rejected with:

- atomic publication preserved: `true`;
- step failure: `root_completeness_not_certified`;
- both cross-row failures: `numeric_precision_limit_exhausted`;
- both diagnostics: `interior_root_not_surrounded/joint_root_history_missing`;
- achieved precision: 512 bits;
- MPFR attempts: 3;
- isolated roots: 0;
- root-free complement: `false`.

The fixture requires this exact fail-closed disposition before it passes. A rejected probe publishes none of its candidate histories.

Claim grade: measured blocker. This is an unresolved instrument/capability row, not a candidate failure and not evidence that no causal root exists. Falsifier: the unchanged next step becomes `certified_complete`, or a rejected step mutates the accepted published histories.

Plainly: the extension found a later numerical wall. The correct conclusion is unknown beyond the new frontier, so the solver stops and keeps the last accepted state.

## Native and independent-oracle contracts

The fresh committed-state release build ran the v2 fixture separately and passed it. The other five compiled EOM fixtures also passed. The separately authored Python root-certification suite passed all 23 tests, including close root separation, root-free complements, tangent-root failure, cell-budget failure, history-boundary failure, and reconstruction-uncertainty failure.

The Python suite independently exercises the root-isolation and fail-closed rules. It does not represent joint affine dependencies and does not recompute the exact stationary endpoint above. Therefore, agreement at the exact row is not claimed as an independent numerical result.

Claim grade: measured native fixture plus measured independent contract tests. Falsifier: either compiled fixture family fails, the Python suite no longer enforces the declared rule, or the exact row is described as independently recomputed without a separately authored joint-affine oracle.

Plainly: the independent suite still checks how a root certificate must behave, but the exact new numbers remain output from the EOM solver's own joint-history instrument.

## Provenance

- Fixture implementation commit: `966247f48e640dbee1a97c9bc81dadb5e668433e`.
- EOM source-tree aggregate SHA-256: `2dc514ff41270c8047d056943b843abac7723b2c409b7526fe254ca5166e4065`.
- Fixture source SHA-256: `fee740ef24f349234583ff9ae0618064926f1b68cdf6199255f63970d43b3ceb`.
- Fresh release EOM library SHA-256: `a6797d5497b34f1cffcc67e19a2098ca2baf1b31c089568abdfb50bbcc904c86`.
- Fresh release fixture binary SHA-256: `2bcce3ca32f9fec6405cc618bd9fdf3fa2fc1479f7356b0399aa610b8d898e2b`.
- Exact v2 frontier fixture: 1/1 passed.
- Remaining compiled EOM fixtures: 5/5 passed.
- Independent Python root-contract tests: 23/23 passed.

## Gate disposition

The root-completeness gate does not pass for Campaign 1. The certification now ends at `1.3649999999999967`, and the next required stationary close-approach step remains unresolved. The checkpoint schema also still does not serialize the joint affine histories used by this validation-only fixture.

Under the campaign's fail-closed order, no two-architrino Campaign 1 workload was started, no evolution evidence bundle was created, and no fate classification was attempted.

No crossing, rebound, outer turn, recapture, breathing cycle, persistence, binding, stability, energy closure, particle identity, physical realization, or canonical EOM authority follows.

Plainly: solver instrumentation is ready and the certified frontier is farther forward, but the scientific campaign remains closed at the newly measured next-step blocker.
