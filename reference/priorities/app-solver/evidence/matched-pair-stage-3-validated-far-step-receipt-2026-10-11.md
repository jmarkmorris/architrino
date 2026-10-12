# Prototype Validated Far-Step Carrier: Qualification Receipt — 2026-10-11

This receipt records the qualification of the prototype carrier described in [addendum 2 of the generated-history inclusion record](../analysis/matched-pair-stage-3-addendum-2.md). The prototype is scratch evidence in new files: it is outside the solver, imports no solver code, and changes no solver source, oracle or contract. Stage 3 of the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md) is not released. Every instance uses $c_f=1$.

## Instruments

| Instrument | Role | SHA-256 |
| --- | --- | --- |
| [matched_pair_stage_3_validated_far_step_carrier.py](matched_pair_stage_3_validated_far_step_carrier.py) | The subject: one validated step in exact rational arithmetic with outward rounding to thirty-six decimals. | `ac2144e5c7b57506a43bc783a07134a895a9fa765f3cd8635704be0cd654beae` |
| [matched_pair_stage_3_validated_far_step_qualification.py](matched_pair_stage_3_validated_far_step_qualification.py) | The runner and the truth references, which use no carrier arithmetic beyond its two directed-rounding helpers. | `21a9f92624e174c3d17f1b175515c1c1361daf89c5e8a91b502330823fe65f8e` |
| [matched-pair-stage-3-aliasing-control-bound.py](matched-pair-stage-3-aliasing-control-bound.py) | The frozen bracket of the true state at $t=2$, unchanged, imported by the runner. | `e822aea060538e98a6111febd672a2f1641ef71e578af493b11bec17ef61db53` |

Run with `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/app-solver/evidence/matched_pair_stage_3_validated_far_step_qualification.py --long-step-denominator 256` from the checkout root, under `/Users/markmorris/vibe/.venv/bin/python` version 3.13.2. The retained run executed under the owned-compute supervisor, finished at 2026-10-11T23:08:14Z after 39.5 seconds with exit status 0 and its process group closed. Output: [matched-pair-stage-3-validated-far-step-qualification-output.txt](matched-pair-stage-3-validated-far-step-qualification-output.txt), SHA-256 `40cad48311f9fdc8597d1671e35debcd87fc894c7fc0eaee237c92c60eb40122`; machine-readable rows: [matched-pair-stage-3-validated-far-step-qualification.json](matched-pair-stage-3-validated-far-step-qualification.json), SHA-256 `5ce1c723cd776fcc99b77a6b2feedc48917f91c629f30fb08b877739aa38d4c0`.

## Truth references

Each is a bracket of the true end state derived without the carrier.

- **Static past.** A path starting at rest at distance $R$ from a static like-charged past moves along the line away from it with acceleration magnitude $\kappa/(R+\zeta)^2$, $\zeta$ its displacement. Bounding $\zeta$ between $c_{\rm lo}s^2$ and $c_{\rm hi}s^2$ and using $1-2x\le(1+x)^{-2}\le1-2x+3x^2$ gives closed-form two-sided brackets of speed and displacement, stated in the runner. They apply to the receiver in K1 and K2 and to the source in K1, T1 and T3, which reads the receiver's static past.
- **Oscillating past, small time.** For $0<t\le1/4$ the fixed-receiver integrals are taken over emission time, as in addendum 1, with the upper limit bracketed by bisection and the integrals by left and right Riemann sums of monotone integrands, plus the receiver-motion corrections of addendum 1 with $h$ replaced by $t$. It is checked at amplitude zero against exact values before use. This bracket is new in this packet and has not been reviewed.
- **Oscillating past, $t=2$.** The frozen bracket instrument, whose exclusion result the reviewer confirmed with a separately written bracket.

## Results

The static known cases K1 to K3 run first; the runner exits with status 2 before any target if one fails. All 45 recorded rows pass: 40 assertions and 5 recorded quantities.

| Case | Result |
| --- | --- |
| K1 static, on axis, $h=1/128$ | Certified within budgets $10^{-8}$, $10^{-8}$. Receiver and source velocity and position tubes contain the closed-form brackets. Radius growth: position $1.57\times10^{-20}$, velocity $4.02\times10^{-18}$. |
| K2 static, source at $(3,4,0)$ | Certified. Four component tubes contain their brackets; the $z$ components contain zero. |
| K3 small-time bracket at amplitude zero | Velocity bracket contains $-\kappa t/R^2$; position bracket contains $-\kappa t^2/(2R^2)$. |
| T1 control past, first step $1/128$ | Certified. Radius growth: position $5.54\times10^{-12}$, velocity $1.42\times10^{-9}$. Velocity tube $[-7.817938,\,-7.534048]\times10^{-8}$ contains true $[-7.672586649,\,-7.672586239]\times10^{-8}$. Position tube $[-3.0539,\,-2.9430]\times10^{-10}$ contains true $[-3.01641,\,-3.01341]\times10^{-10}$. Source tubes contain their bracket. |
| T2 second step | Certified. Inherited radii $5.54\times10^{-12}$ and $1.42\times10^{-9}$; second-step radii $2.19\times10^{-11}$ and $2.76\times10^{-9}$. Start tube contains the previous end tube. Velocity tube $[-1.5371,\,-1.4820]\times10^{-7}$ contains true $[-1.508898941,\,-1.508898618]\times10^{-7}$; position likewise. |
| T3 control past, $512$ steps of $1/256$ | $512$ of $512$ certified within budgets; largest single-step velocity growth $1.71\times10^{-9}$. End velocity tube $[-1.982442495,\,-1.940813417]\times10^{-5}$, half-width $2.081\times10^{-7}$; true bracket $[-1.963423564,\,-1.958320815]\times10^{-5}$, contained. End position tube $[-1.783842033,\,-1.750436890]\times10^{-5}$, half-width $1.670\times10^{-7}$; true bracket $[-1.768122117,\,-1.765219809]\times10^{-5}$, contained. The solver's aliased interval $[-2.000092009,\,-2.000046003]\times10^{-5}$ is disjoint from the velocity tube by $1.760\times10^{-7}$. Source velocity tube $[1.999997316,\,1.999997342]\times10^{-5}$ contains its bracket. |
| T4 one step of $2$ | No budget: certified, velocity tube $[-5.000003,\,-1.177884]\times10^{-5}$ contains the true bracket, position likewise. Declared budgets: declined, `VFS-BUDGET-01`, nothing published. |
| N1 step-doubling provenance | Declined, `VFS-H0-01`. |
| N2 prescribed segment with a radius | Declined, `VFS-H0-01`. |
| N3 prescribed join with a velocity corner | Declined, `VFS-H0-01`. |
| N4 amplitude $0.34$, past speed up to $1.02$ | Declined, `VFS-H1-01`. |
| N5 step $12$ at separation $10$ | Declined, `VFS-H2-01`. |
| N6 retained window starting at $-10$, a root at its boundary | Declined, `VFS-H3-01`. |
| N7 coupling $200$, step $2$ | Declined, `VFS-H1-01`, on the step velocity box. |
| N8 one enclosure pass allowed | Declined, `VFS-H5-01`. |
| N9 step $1/4$ on the control under budgets | Declined, `VFS-BUDGET-01`. |
| P1 retained window starting at $-5$ | Certified with exactly zero acceleration; both pairs absent. Conditional on the retained window being the complete emission domain. |

Every decline returns no published segments, and appending a continuation from a declined certificate raises an error; both are asserted for N1 to N9.

## Retained failures

Three earlier runs failed and are kept under `.local-data/eom-matched-pair/2026-10-11/validated-far-step/`.

1. `first-run-known-case-threshold-failure.txt`. K3 failed and the runner stopped before any target, as designed. The position bracket contained the exact value, but the runner demanded a width below $10^{-15}$, which a Riemann bracket of a non-constant integrand cannot meet. The criterion was corrected to containment plus the bracket's actual relative width. This was an error in the truth instrument's own acceptance test.
2. `second-run-bernstein-speed-hull-too-coarse.txt`, with the carrier of that run kept as `carrier-before-exact-quadratic-range.py`. The control's past declined with `VFS-H1-01`: Bernstein control values bounded the half-period velocity arch by $1.2$ where its true maximum is $0.6$. The decline was safe and uninformative. The carrier now takes the exact range of the velocity quadratic from its endpoint and vertex values.
3. `third-run-256-source-bracket-wider-than-tube.txt`. One assertion failed at $t=2$: the source's validated velocity tube, about $1.3\times10^{-13}$ wide, was narrower than the first, cruder static bracket, so "tube contains bracket" could not hold although both contained the true value. The static bracket was replaced by the second-order one described above; the assertion then passes.

Two exploratory long runs were started directly instead of under the supervisor; the second, at $2048$ steps, was stopped by signal before finishing and left no output. The retained run is the supervised one.

## What this establishes and what it does not

**Claim grade: measured**, by the instruments above on the cases listed. The prototype certifies only where its hypotheses and budgets hold, its tubes contain the bracketed true states in every certified case that has a bracket, it carries inherited position and velocity radii across a join, and it declines without a continuation in ten cases covering every hypothesis code except `VFS-H4-01`, which no case exercised. On the adversarial control it reaches $t=2$ with a proved tube that contains the true state and excludes the interval the step-doubling carrier published.

It does not establish a solver capability, a population-scale result or a cost. The prototype trusts provenance labels, was exercised on two-path far configurations only, and is first order: $512$ steps gave a velocity half-width of $2.08\times10^{-7}$. The carrier, the runner and two of the three truth references have one author; containment checks against same-author brackets are consistency evidence, and the independent element is the reviewer's bracket at $t=2$ and the reviewer's reading of this packet. Falsifiers: a correct bracket of a true state outside a certified tube; a declined certificate carrying segments; or a hypothesis reported as holding that fails on exact evaluation.
