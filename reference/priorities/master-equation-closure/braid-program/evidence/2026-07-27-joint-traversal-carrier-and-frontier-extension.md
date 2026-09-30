# Joint Traversal Carrier Repair and Stationary Frontier Extension

Status: CURRENT-SOURCE VALIDATION-ONLY CERTIFICATION THROUGH `1.3799999999999963`; NEXT STEP FAILS CLOSED; CAMPAIGN 1 NOT RUN (2026-07-27).

## Capability result

The certified-traversal exact-fallback wrapper selected the correct exact pair but did not forward coupled path identities, admitted joint root point states, or joint retained histories into `ExactPairRequest`. The ordinary exhaustive snapshot route already forwarded those carriers. The missing carrier produced the prior `interior_root_not_surrounded/joint_root_history_missing` diagnostic at the unchanged 512-bit ceiling even though the atomic-step request held both joint histories.

Implementation commit `a7f4b092504251931c2358e857026fc8d9dd44e5` forwards the coupled identities and optional joint carriers through the traversal exact-fallback interface. Traversal remains a pair-selection layer. The existing exact-pair consumer still recomputes ordinary geometry, fallback radii, causal factors, and the root-time budget before it can use a joint carrier. No precision setting, root tolerance, acceptance threshold, or publication rule changed.

Claim grade: derived code-path diagnosis plus measured implementation validation. Falsifier: an exact fallback selected by certified traversal loses either path identity, consumes a mismatched carrier, or differs from the direct exact-pair route for the same complete request.

Plainly: the difficult root already had the required joint uncertainty record, but one wrapper dropped it. The repair carries that record to the unchanged root checker; it does not make the checker more permissive.

## Interface controls

The compiled native fixture now exercises one difficult retained-history row through both interfaces:

- the direct exact-pair route and the certified-traversal exact-fallback route both return `certified_complete`;
- both return the exact same root, factor, segment, precision-route, and precision-bit tokens;
- both use `joint_affine_outward_with_mpfr_factor` at 128 bits;
- the negative control removes the joint carrier and remains `uncertified` with `numeric_precision_limit_exhausted`, zero roots, and no root-free complement at 512 bits.

This is exact implementation parity across two assembly routes plus a fail-closed negative control. Both routes ultimately invoke the same exact-pair implementation, so their agreement does not independently prove the mathematical rule or the stationary numerical row.

Claim grade: measured interface and fail-closed behavior. Falsifier: the positive routes differ by any exact root token, or the missing-carrier control publishes a root or root-free complement.

Plainly: the control proves that the wrapper now carries the same inputs as the direct path, while a deliberately incomplete request still stops.

## Extended stationary frontier

The v3 stationary joint-frontier fixture retains the fixed `0.005` step, the `1e-5` root-time tolerance, the 128-to-512-bit precision ladder, and the exact stationary seed. It now certifies 28 consecutive atomic steps from `1.2399999999999993` through `1.3799999999999963`, three accepted steps beyond the former blocked target `1.3649999999999967`.

At the new endpoint, both symmetry-related cross rows are `certified_complete`, each with one root and a certified root-free complement:

| Quantity | Exact interval |
| --- | --- |
| Root | `[0.780706204140293679999999999999999999997527, 0.78071599513507706000000000000000000000065]` |
| Transmitter factor | `[0.762096724995851548488570657515804839896782, 0.762176625693159053925731025289426875535212]` |
| Receiver factor | `[1.55766146488868106039797819422968586508953, 1.55776649473630256229586468411114370919647]` |

The rows use `joint_affine_outward_with_mpfr_factor` at 128 bits. A separately executed exhaustive exact-pair snapshot produced exact-token parity with the certified-traversal snapshot for both cross rows.

Claim grade: measured current-source EOM-solver validation for this exact in-process stationary joint-history carrier. The exhaustive comparison is a route-parity control, not an independent numerical oracle. Falsifier: a fresh build fails any accepted step, loses atomic publication, loses either root-free complement, or changes an exact endpoint token.

Plainly: the missing-carrier wall is gone, and the unchanged checker advances the stationary history another `0.015` time units before encountering a new mathematical enclosure limit.

## New fail-closed boundary

The next unchanged step from `1.3799999999999963` to `1.3849999999999962` rejects atomically. Both cross rows report:

- outer failure: `numeric_precision_limit_exhausted`;
- diagnostic: `interior_root_not_surrounded/joint_root/root_time_budget_exceeded`;
- achieved precision: 512 bits in three MPFR attempts;
- certified joint root-time width: `1.0036629916485125e-05`;
- unchanged root-time tolerance: `1e-5`;
- ordinary-box root-time width: `1.1102641437464679e-05`;
- projected remainder radius: `3.8067034505611338e-06`;
- nonlinear radius: `1.2197297085473212e-11`;
- isolated roots: zero;
- root-free complement: `false`;
- rejected candidate publication: none.

The certified joint width exceeds the declared tolerance by `3.6629916485125e-08`, a ratio of `1.0036629916485125`. Additional MPFR bits cannot remove a certified uncertainty width carried by the retained-history remainder. The next capability target is therefore a tighter independently justified joint-remainder representation or contraction, not a higher precision ceiling or a looser root tolerance.

Claim grade: measured blocker plus derived disposition from the certificate terms. This remains unresolved instrument capability, not candidate failure. Falsifier: an unchanged request certifies the step under the same tolerance and carrier, or an independently justified representation proves a smaller outward remainder while preserving ordinary-fallback dominance.

Plainly: the solver now has the missing record, but the certified uncertainty band is slightly wider than the allowed root interval. More digits do not make that band physically narrower.

## Validation and provenance

- Capability implementation commit: `a7f4b092504251931c2358e857026fc8d9dd44e5`.
- Fresh release compiled fixtures: 6/6 passed.
- Fresh ASAN/UBSAN carrier and frontier fixtures: 2/2 passed.
- Native/Python history-layer and independent root-contract suite: 35/35 passed.
- `CertifiedTraversal.hpp` SHA-256: `b5765672674be6f9de9afeb97a463a2df5fb46875a8552aecd5a2d0f7ca58cbb`.
- `CertifiedTraversal.cpp` SHA-256: `b08675123f40563b1600d11616364ec28f3b20ca0840a352265e870811d95ae0`.
- `CoupledEvolution.cpp` SHA-256: `c56e753b967210fd2151a2568f8c9572546bcbb42d9b25ab5567350740af3bb4`.
- Frontier fixture SHA-256: `c4b496d6c1aa728aa948734436968089000af1ab348a20efb37fcddc01825134`.
- Fresh release EOM library SHA-256: `1546e06e7e599db07ea6a64351eb838e37e67004596e42dae5ef77a72b28163a`.
- Fresh release frontier binary SHA-256: `9a04907d5c6c1b6e5e00cd2cead8366577483b2b4171da2d8913ea6635040662`.

The Python suite independently checks root-isolation and fail-closed contracts. It also inspects the native traversal/direct carrier control, but it does not implement joint affine history or independently recompute the exact stationary endpoint.

Plainly: the builds and contract tests are clean, but the exact stationary numbers remain measurements from the EOM solver's joint-history instrument.

## Gate disposition

The stationary root-completeness frontier is farther forward, but the full Campaign 1 root gate does not pass. The next stationary step is unresolved, the longer transverse path is not certified by this fixture, and the checkpoint schema still does not serialize the optional joint affine histories.

No Campaign 1 workload, evolution evidence bundle, or fate classification was started. No crossing, rebound, outer turn, recapture, breathing cycle, persistence, binding, stability, energy closure, particle identity, physical realization, or canonical EOM authority follows.

Plainly: this work repairs one real solver capability and records the next exact boundary. It does not authorize the scientific campaign.
