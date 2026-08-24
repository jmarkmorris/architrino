# Certified Error-Budget Ledger

## Status

- Ledger id: `eom_certified_error_budget_ledger/v1`
- Date: 2026-07-18
- Stage: `ratified-binding-input`
- Owning queue item: `precision_convergence_and_failure_policy`
- Mathematical authority: [Master EOM Binding v1](./master-eom-binding-v1.md)
- Evolution authority: [Evolution Contract v1](./evolution-contract-v1.md)
- Operator ratification: `accepted-2026-07-18`
- Claim grade: `derived-ratified`

This packet defines and ratifies one dimensional ledger for ordinary certified evolution and finite-width events. Ratification authorizes the two named preset records and their implementation. It does not weaken a numerical gate or permit publication after a failed certificate row.

## Finding In Plain Language

The current Borg request exposes five unrelated numerical controls, while the EOM solver fixes two additional event tolerances and several regulator controls inside the native request path. Those numbers do not form one error contract. In particular, root time, acceleration, position, velocity, impulse, and position moment have different units and cannot be added directly.

The coherent contract has two published per-step error increments:

$$
B_x\quad [\mathrm L],
\qquad
B_v\quad [\mathrm L\,\mathrm T^{-1}].
$$

Every other allowance must be mapped into one or both of these two quantities. An accepted run still carries the inherited retained-history enclosure, so these are increments, not claims that the total trajectory error resets at every step.

Claim grade: `derived`. Falsifier: a required numerical remainder cannot be mapped into position or velocity with the dimensions below, or a published state contains an uncharged error source.

## Ordinary Accepted-Step Ledger

For one accepted step of width $h$, let:

- $E_{x,n}$ and $E_{v,n}$ be the inherited componentwise position and velocity radii;
- $\tau_t$ be the causal-root time-enclosure ceiling $[\mathrm T]$;
- $\tau_a$ be the complete receiver acceleration-enclosure width $[\mathrm L\,\mathrm T^{-2}]$;
- $\tau_c$ be the coupled-correction acceleration residual $[\mathrm L\,\mathrm T^{-2}]$;
- $\tau_x^{\mathrm{step}}$ and $\tau_v^{\mathrm{step}}$ be the full-step versus two-half-step local-error allowances;
- $R_x^{\mathrm{other}}$ and $R_v^{\mathrm{other}}$ contain outward rounding, retained-history transformation, state interpolation, dense-output, and publication remainders not already present in $E_{x,n}$ and $E_{v,n}$.

The root-time ceiling is not added to a state allowance. Its induced geometry and acceleration variation must be enclosed by $\tau_a$. A loose root bracket therefore remains admissible only when the resulting complete acceleration row still certifies.

The ordinary one-step increment must satisfy

$$
\Delta E_v^{\mathrm{ordinary}}
\le
\tau_v^{\mathrm{step}}
+h(\tau_a+\tau_c)
+R_v^{\mathrm{other}}
\le B_v,
$$

$$
\Delta E_x^{\mathrm{ordinary}}
\le
\tau_x^{\mathrm{step}}
+\frac{h^2}{2}(\tau_a+\tau_c)
+R_x^{\mathrm{other}}
\le B_x.
$$

The factors $h$ and $h^2/2$ are the componentwise bounds obtained by integrating an acceleration enclosure once and twice. The EOM solver may use tighter cubic-corrector weights when it emits and independently checks them, but it may not omit the acceleration and correction contributions from the published state interval.

The complete receiver acceleration budget is partitioned as

$$
\tau_a
=
\tau_a^{\mathrm{sharp}}
+\tau_a^{\mathrm{far}}
+\tau_a^{\mathrm{hist+interp}}
+\tau_a^{\mathrm{round+sum}},
$$

with

$$
\tau_a^{\mathrm{far}}
\le f_{\mathrm{far}}\tau_a.
$$

The ratified presets use $f_{\mathrm{far}}=0.25$. Root isolation, root-free complement certification, branch geometry, sharp-kernel evaluation, history interpolation, deterministic accumulation, and rounding must all fit the remaining declared slices. A per-pair pass does not replace the receiver-total test.

Claim grade: `derived`. Falsifier: direct integration of an admitted acceleration or correction enclosure produces a larger state contribution, or the accepted segment radius omits one of the displayed terms.

## Finite-Width Event Ledger

For one receiver and one finite-width event window $C=[T_0,T_1]$ of width $h_C$, define the event rows already bound by the EOM:

$$
\mathbf I_{ij}
=\int_C\mathbf A_{ij}(T)\,dT
\quad [\mathrm L\,\mathrm T^{-1}],
$$

$$
\mathbf M_{ij}
=\int_C(T_1-T)\mathbf A_{ij}(T)\,dT
\quad [\mathrm L].
$$

Impulse contributes directly to endpoint velocity. Position moment contributes directly to endpoint position. If $\mathcal E_i$ is the set of routed event pairs for receiver $i$, the receiver-total event allowances are $B_{I,i}$ and $B_{M,i}$, with row allocations $b_{I,ij}$ and $b_{M,ij}$ that must obey

$$
\sum_{j\in\mathcal E_i}b_{I,ij}\le B_{I,i},
\qquad
\sum_{j\in\mathcal E_i}b_{M,ij}\le B_{M,i}.
$$

The default allocation is equal division over the routed pairs known for that candidate window. A versioned custom policy may use other nonnegative weights, but it must record every weight and preserve the two sums. A scalar per-pair tolerance that can be spent independently by every routed pair is not a complete receiver budget.

The event-aware state increment must satisfy

$$
\Delta E_v^{\mathrm{event}}
\le
\tau_v^{\mathrm{step}}
+h_C(\tau_a^{\mathrm{background}}+\tau_c)
+B_{I,i}
+R_v^{\mathrm{other}}
\le B_v,
$$

$$
\Delta E_x^{\mathrm{event}}
\le
\tau_x^{\mathrm{step}}
+\frac{h_C^2}{2}(\tau_a^{\mathrm{background}}+\tau_c)
+B_{M,i}
+R_x^{\mathrm{other}}
\le B_x.
$$

Each impulse and position-moment row is subdivided into the same five declared fractions:

| Allocation | Fraction | Includes |
| --- | ---: | --- |
| finite-width quadrature enclosure | `0.35` | outward cell integration and finite cell tails |
| causal-width regulator convergence | `0.15` | the complete $\eta$ ladder |
| core regulator convergence | `0.15` | the complete $\epsilon_c$ ladder when core-active |
| `FWC-STATE-01` numerical remainder | `0.15` | retained-history `0.04`, interpolation `0.04`, rounding `0.02`, and endpoint-linear shortcut `0.05` |
| Amendment 1 regulator-matching remainder | `0.20` | core difference, nonzero Gaussian moments, tube tails, and complement leakage |

The fractions sum to one. An unused slice remains margin; it is not silently borrowed. Borrowing requires recomputing and recording the complete row sum under the same preset schema.

### Common-domain overlap

Common-domain overlap has no independent numerical allowance. On a certified common domain it passes only when

$$
\operatorname{dist}(I_k^{\sharp},I_k^{(\eta,\epsilon_c)})
\le R_{I,k}^{\mathrm{num}}+R_{I,k}^{\mathrm{reg}}
\le b_{I,ij},
$$

and

$$
\operatorname{dist}(M_k^{\sharp},M_k^{(\eta,\epsilon_c)})
\le R_{M,k}^{\mathrm{num}}+R_{M,k}^{\mathrm{reg}}
\le b_{M,ij}.
$$

The numerical and regulator rows are already charged to the event row above. Adding a separate overlap tolerance would double-spend the same error. The fold/core portion remains outside the common sharp chart and is certified only by the finite-width rows.

Claim grade: `derived`. Falsifier: a valid matching proof requires a remainder not chargeable to impulse or position moment, or a passing row spends more than its recorded $b_I$ or $b_M$ allocation.

## Ratified Complete Preset Records

These records are binding implementation inputs. `Research certified budget` preserves the complete pre-ratification Borg allocation. `Interactive certified budget` changes only the receiver acceleration ceiling from `1e-1` to `3e-1` and uses looser event totals. The acceleration change is the only ordinary-field change with a measured smooth-path cost effect. The values are ratified implementation inputs; runtime acceptance remains conditional on the Amendment 2 acceptance gate.

All values use the current Borg nondimensional scale map with $c_f=1$. Their dimensions remain the ones declared above.

The live request identity is `eom_borg_shadow_request/v1` under `eom_evolution_contract/v1`, with no scale amendment and with `master_eom_binding/v1`. The canonical ordinary allocation key is `transmitterFactorFloor`; changing a serialized key changes the allocation hash even when its numerical value is unchanged.

| Field | Interactive certified budget | Research certified budget |
| --- | ---: | ---: |
| preset id | `interactive-certified-v1` | `research-certified-v1` |
| allocation SHA-256 | `bb4b8b72e01b2d038e2b760a3677a67e92e35d12c5d587f0a98d2079bce8d319` | `74919ee63dc27d0aa7c43453e1762f380da886a63377912905f8f8070d3b9b3d` |
| $B_x$ per accepted step | `2e-2` | `2e-2` |
| $B_v$ per accepted step | `4e-2` | `3e-2` |
| root-time ceiling $\tau_t$ | `1e-3` | `1e-3` |
| receiver acceleration $\tau_a$ | `3e-1` | `1e-1` |
| far-field fraction $f_{\mathrm{far}}$ | `0.25` | `0.25` |
| correction acceleration residual $\tau_c$ | `1e-1` | `1e-1` |
| step position $\tau_x^{\mathrm{step}}$ | `1e-2` | `1e-2` |
| step velocity $\tau_v^{\mathrm{step}}$ | `1e-2` | `1e-2` |
| receiver event impulse total $B_I$ | `1e-6` | `1e-7` |
| receiver event position-moment total $B_M$ | `1e-6` | `1e-7` |
| independent overlap allowance | `0` | `0` |
| causal width $\eta_0$ | `0.2` | `0.2` |
| core scale $\epsilon_{c,0}$ | `0.2` | `0.2` |
| regulator ratio $\rho$ | `0.5` | `0.5` |
| regulator levels | `3` | `3` |
| transmitter-side-factor floor | `1e-30` | `1e-30` |
| bulk precision floor | certified outward binary64 | certified outward binary64 |
| difficult-row initial precision | `128` bits | `128` bits |
| difficult-row maximum precision | `512` bits | `512` bits |
| rounding mode | outward | outward |
| deterministic reduction | fixed pairwise | fixed pairwise |

At $h_{\max}=0.05$, before any unspent $R^{\mathrm{other}}$ is used, the ratified Interactive record gives

$$
\Delta E_v\le 10^{-2}+0.05(3\times10^{-1}+10^{-1})+10^{-6}
=0.030001<0.04,
$$

$$
\Delta E_x\le 10^{-2}+\frac{0.05^2}{2}(3\times10^{-1}+10^{-1})+10^{-6}
=0.010501<0.02.
$$

The Research record gives

$$
\Delta E_v\le10^{-2}+0.05(10^{-1}+10^{-1})+10^{-7}
=0.0200001<0.03,
$$

$$
\Delta E_x\le10^{-2}+\frac{0.05^2}{2}(10^{-1}+10^{-1})+10^{-7}
=0.0102501<0.02.
$$

The remaining margins are reserved for the explicitly emitted history, interpolation, rounding, accumulation, and publication rows. A preset fails if those measured rows exhaust the margin; the inequalities do not authorize an unmeasured remainder.

Claim grade: `derived-ratified`. Falsifier: recomputing either displayed sum exceeds its top-level budget, the current live Borg allocation differs from the Research row, either canonical serialization produces a different displayed hash, or an implementation omits a listed allocation or regulator.

The pre-implementation acceleration-`3x` candidate was not a coherent certified output contract. At `T=1.2`, seed 0 differed from the tighter sensitivity control by `0.00478422` in position and `0.00802716` in velocity, while its published endpoint radii were only `1.60e-14` and `2.23e-308`. V7 now carries acceleration widths into the published position and velocity radii. The unchanged Decimal oracle contains both selectable event-budget controls, and a deliberately under-budget control rejects. Research parity nevertheless fails: the corrected widths change the later certified root track, so the implementation has not passed the complete Amendment 2 acceptance gate.

Claim grade: `measured-current-binary`. Falsifier: the V7 four-seed matrix reproduces the historical Research accepted times with the corrected state widths, or the unchanged-oracle controls fail containment or under-budget rejection.

The earlier strict-state proposal (`root=1e-8`, `position=velocity=1e-8`, with `acceleration=correction=1e-1`) is retained only as a negative control. Seeds 0, 1, and 2 reached `T=1.2`; seed 3 halted at `T=0.375`, so verification failed after `78.6071` seconds, with `78.0756` seconds measured in the regulator ladder. It is not the Research preset.

Claim grade: `measured-current-binary`. Falsifier: the recorded four-seed strict-state sweep has a different seed-3 terminal outcome or phase timing.

The stricter header-default combination `root=1e-12`, `acceleration=1e-9`, and `position=velocity=correction=1e-8` is not the Research proposal. A current-tree diagnostic spent `343.813` wall seconds on one requested `0.05` interval, with `343.395` seconds in the finite-width execution union and `332.466` acceleration-precision worker-seconds, before halting at `T=0.007593126992950852` on `FWC-STATE-01`. This is a measured negative performance control, not a reason to loosen or bypass its failed row.

Claim grade: `measured-current-binary`. Falsifier: rerunning the exact command in the performance report produces a materially different terminal row or phase attribution outside ordinary host-load variation.

## Convergence And Acceptance Rules

Every preset requires all of the following:

1. every root is isolated and the complement is certified root-free;
2. the root-induced acceleration width fits $\tau_a$;
3. the complete receiver acceleration width, including far-field enclosures, fits $\tau_a$;
4. correction and full/two-half local-error rows fit their allocations;
5. every `FWC-ENTRY-*`, `FWC-REG-*`, `FWC-STATE-*`, `FWC-STEP-*`, and `FWC-EXIT-*` row passes;
6. $\eta$ and $\epsilon_c$ are refined one at a time and every required ladder level certifies;
7. the maximum componentwise distance between adjacent regulator levels fits its declared row slice;
8. the Amendment 1 numerical-plus-regulator sum fits the same impulse or position-moment row allocation;
9. the complete receiver event-row sums fit $B_I$ and $B_M$;
10. the final ordinary or event-aware state increment fits $B_x$ and $B_v$;
11. atomic publication occurs only after all rows pass.

No tighter run of this engine is an independent oracle. Research-versus- Interactive comparison is a sensitivity control. Correctness still requires the unchanged Decimal oracle, an analytic case, or a theorem.

## Resource Limits Are Not Error Budgets

The proposed resource envelope remains separate:

| Resource | Ratified value |
| --- | ---: |
| root depth | `256` |
| root cells | `500000` |
| quadrature depth | `32` |
| quadrature cells | `200000` |
| event depth | `24` |
| event cells | `200000` |
| correction iterations | `12` |
| step attempts per request | `1000` |
| rejected steps per request | `100` |
| Borg worker threads | `4` |
| Borg request memory | `67108864` bytes |

Exhausting one of these limits is a named resource halt. It does not widen a mathematical allowance, certify an incomplete row, or authorize continuation.

## Required Provenance

Every request and response must record:

- budget schema and preset id;
- $B_x$, $B_v$, every ordinary allocation, and every event allocation;
- the routed-pair allocation weights and resolved per-row budgets;
- regulator values and ladder rules;
- precision floors, limits, rounding mode, and reduction policy;
- resource limits in a separate object;
- the canonical serialization and SHA-256 allocation hash.

The hash is an identity check, not evidence that the ledger passed. Every published interval retains its explicit radius or lower/upper bounds.
