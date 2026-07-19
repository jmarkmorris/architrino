# Master EOM Binding v0 Amendment 2 — Run-Selected Certified Budgets

## Status

- Amendment id: `master_eom_binding/v0/amendment/2`
- Ratification date: 2026-07-18
- Stage: `ratified-binding-amendment`
- Claim level: `derived-ratified`
- Amended binding:
  [master-eom-binding-v0.md](master-eom-binding-v0.md)
- Mathematical ledger:
  [certified-error-budget-ledger.md](certified-error-budget-ledger.md)
- Operator decision: `ratified`
- Implementation authority: `granted-subject-to-this-amendment`

## Finding In Plain Language

The frozen binding permits declared numerical tolerances but Amendment 1 says
the regulator-matching remainder must fit inside the unchanged event impulse
and position-moment budgets. The Borg native protocol does not carry those
budgets; the CLI fixes both at `1e-7`. A run-selected event budget therefore
requires a binding amendment before the protocol or implementation may change.

This amendment allows only versioned, fully resolved certified budgets. It does
not create a second evaluation grade, weaken a certificate row, or allow a
failed candidate to continue.

Claim grade: `derived`. Falsifier: the current native protocol already carries
the complete event budget and regulator allocations, or Amendment 1 permits an
unrecorded event-budget change.

## Normative Substance

The following substance amends the frozen binding without changing either
boxed acceleration law.

> A coupled-evolution request shall select one versioned certified numerical
> budget and shall carry its fully resolved allocations. The budget shall
> declare componentwise accepted-step position and velocity increments and
> shall map every root, acceleration, correction, finite-width impulse,
> position-moment, history, interpolation, rounding, accumulation, shortcut,
> and regulator remainder into those increments with dimensionally valid
> coefficients.
>
> A causal-root time allowance is admissible only when the acceleration
> enclosure induced by its complete root interval fits the declared receiver
> acceleration budget. A finite-width impulse allowance contributes directly
> to velocity; a finite-width position-moment allowance contributes directly
> to position.
>
> Event budgets are receiver totals over all routed ordered pairs in the
> candidate event window. Per-row allocations shall be nonnegative and shall
> sum no higher than the receiver total. The request may declare a versioned
> weighting rule; every resolved weight and row allocation shall be recorded.
>
> Common-domain chart overlap has no independent error allowance. Its complete
> numerical remainder and Amendment 1 regulator-matching remainder shall be
> charged inside the same impulse or position-moment row allocation. The
> complete row shall remain inside both its row allocation and the receiver
> total.
>
> The regulator values, refinement ratio, level count, convergence slices,
> precision floors, rounding mode, deterministic reduction policy, and all
> resource ceilings shall be part of the resolved budget record. Resource
> exhaustion is not mathematical acceptance and shall remain fail-closed.
>
> Every `FWC-ENTRY-*`, `FWC-REG-*`, `FWC-STATE-*`, `FWC-STEP-*`, and
> `FWC-EXIT-*` obligation retains authority. Outward-rounded enclosures, the
> sharp-chart prohibition at a failed source-normal floor, atomic publication,
> and all non-budget failure handling are unchanged. No selected budget
> authorizes publication or continuation through an uncertified row.

## Admissibility Rule

For a step or event window of width $h$, a proposed receiver event impulse
total $B_I$ and position-moment total $B_M$ are admissible only if

$$
0<B_I
\le
B_v-\tau_v^{\mathrm{step}}
-h(\tau_a^{\mathrm{background}}+\tau_c)
-R_v^{\mathrm{other}},
$$

$$
0<B_M
\le
B_x-\tau_x^{\mathrm{step}}
-\frac{h^2}{2}(\tau_a^{\mathrm{background}}+\tau_c)
-R_x^{\mathrm{other}}.
$$

The right sides must be strictly positive outward lower bounds. The engine
must evaluate these inequalities using the resolved run ledger and the actual
attempted window. It may use tighter certified integration coefficients, but
it may not replace an emitted remainder by zero.

For routed-pair weights $w_{ij}\ge0$ with
$\sum_{j\in\mathcal E_i}w_{ij}=1$, the row allocations are

$$
b_{I,ij}=w_{ij}B_{I,i},
\qquad
b_{M,ij}=w_{ij}B_{M,i}.
$$

The default rule is equal weights over the routed pairs present in the
candidate window. The two ratified presets use receiver totals `1e-6` and
`1e-7`, respectively, only because the complete one-step inequalities in the
ledger leave that much certified state margin. “Interactive” is not itself a
derivation.

Common-domain matching remains

$$
\operatorname{dist}(I_k^{\sharp},I_k^{(\eta,\epsilon_c)})
\le R_{I,k}^{\mathrm{num}}+R_{I,k}^{\mathrm{reg}}
\le b_{I,ij},
$$

$$
\operatorname{dist}(M_k^{\sharp},M_k^{(\eta,\epsilon_c)})
\le R_{M,k}^{\mathrm{num}}+R_{M,k}^{\mathrm{reg}}
\le b_{M,ij}.
$$

There is therefore no admissible nonzero `overlapTolerance` field. A future
schema may expose the two remainder slices, but their sum is still charged to
the impulse or moment allocation.

Claim grade: `derived-ratified`. Falsifier: the endpoint reconstruction admits
an event budget that violates either inequality, or an independently checked
multi-pair event spends more than the receiver total while every row reports a
pass.

## Preserved Gates And Prohibitions

Ratification leaves all of the following unchanged:

1. every `FWC-ENTRY-*`, `FWC-REG-*`, `FWC-STATE-*`, and `FWC-EXIT-*` gate;
2. Amendment 1 positive-regulator remainder matching;
3. outward rounding of every enclosure;
4. the prohibition on the sharp quotient when its source-normal floor fails;
5. independent one-control-at-a-time $\eta$ and $\epsilon_c$ ladders;
6. immutable accepted input histories during candidate construction;
7. atomic all-path publication;
8. fail-closed resource, precision, root, event, correction, local-error, and
   publication handling;
9. the Decimal oracle as an independent instrument that is not modified with
   native budget enforcement.

## Implementation Acceptance Gate

Ratification authorizes implementation but does not certify it. Runtime
authority requires all of the following:

1. complete published-state propagation of every ordinary and event allowance;
2. one canonical preset registry with a deterministic complete-allocation hash;
3. one forward protocol version with one producer, one parser, and no
   compatibility route;
4. receiver-total event allocation and every ledger slice enforced before
   publication;
5. Research parity on the recorded single-event control;
6. unchanged-oracle or analytic containment for each selectable event budget;
7. deliberate under-budget rejection;
8. atomic fail-closed publication after every required row passes.

## Current Implementation Disposition

V7 implements the canonical registry, complete request and response provenance,
receiver-total event allocation, zero independent overlap allowance, state-width
propagation, the Borg selector, unchanged-Decimal-oracle containment for both
selectable event totals, and deliberate under-budget rejection. The Research
parity row does not pass: after acceleration widths are propagated into retained
history, three of four Research seeds halt on root completeness before the
historical `T=1.2` endpoint. The implementation is therefore staged but does not
yet have complete runtime acceptance under this amendment.
Research therefore remains the Borg default; Interactive default authority is
withheld by acceptance row 5.

Claim grade: `measured-current-binary`. Falsifier: the exact four-seed V7 matrix
reaches the historical Research endpoints while preserving the corrected state
widths and every named fail-closed row.
