# CRW-005 Return-Cycle Lorentz Quantization Review — 2026-09-13

Scope: full 482-line baseline review and bounded repair of [Return-Cycle Lorentz Quantization](../../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md). Only this chapter and receipt were edited. Shared integration is owned by the coordinator.

The chapter was clean by scoped `git --no-optional-locks status --short -- <chapter>` before editing. SHA-256 by `shasum -a 256`: baseline `21c56a89c1e425ad7d0548ac21c04f168a6f20c6f42ba410426b2fd5ccffa6cb`; final chapter `3e987e12a57faddd0b70af36a08c6cf1ac0d37f725cc37b65e0cc3e6c6c448ee`. Prior-editor attribution was not investigated.

## Findings

All fourteen findings were accepted and repaired: eight high and six medium.

| ID | Severity | Finding and repair |
| --- | --- | --- |
| RC-01 | High | Discrete root/branch labels were asserted to prohibit continuous material states. Distinguished branch indexing from isolated states or quantized velocities, which need a separate dynamical/spectral argument. |
| RC-02 | High | One-way leg formulas omitted their constant-speed, isotropic-chart, fixed co-moving endpoint assumptions. Declared the positive-length, sub-channel-speed domain and chart-time meaning. |
| RC-03 | High | Equal longitudinal and transverse periods were treated as a derived substrate property. Identified orientation-independent return as the imposed comparison target; the axis-ratio algebra remains conditional on it. |
| RC-04 | Medium | Two semiaxes were treated as proving a spheroidal boundary. Declared the axisymmetric ellipsoidal approximation and the need to check directional boundary residuals. |
| RC-05 | High | Free transverse scale was omitted from the clock factor. Derived the period ratio as scale times Lorentz factor and scoped the standard clock formula to unit scale or independent compensation. |
| RC-06 | Medium | The shape-to-speed inversion omitted its magnitude and oblate-domain restrictions. Declared nonnegative speed and positive shape ratio no greater than one. |
| RC-07 | Medium | Catch-up divergence was stated independently of the transverse-scale behavior. Restricted divergence to fixed positive transverse size and noted shrinking-scale counterexamples. |
| RC-08 | High | A moving-clock synchronization offset was mislabeled an absolute-time separation. Separated raw half-leg duration, moving-clock offset magnitude, equal-absolute-time signed clock difference, and moving-simultaneity absolute-time difference. |
| RC-09 | High | Leg algebra alone was called a full Lorentz boost derivation. Required the same branch to supply the scale, clock response, and operational synchronization map. |
| RC-10 | High | Integer phase return implied action increments of integer Planck constant and a one-quantum transaction. Separated phase closure, canonical action mapping, and the proposed quantum transaction; defined the action units and sign. |
| RC-11 | High | The action-angle energy integral omitted external-parameter and remaining-coordinate work. Declared its effective Hamiltonian domain and the missing differential terms when those variables change. |
| RC-12 | Medium | Smooth/even residuals were demanded without parameter regularity or velocity-reversal symmetry, and even angular harmonics were universal. Added the necessary symmetry and readout assumptions. |
| RC-13 | Medium | Unexplained residuals were assigned to fitting error or incompleteness without evidence. Distinguished possible physical, preparation, measurement, and numerical causes. |
| RC-14 | Medium | Large-speed medium stabilization and small-speed isolated sufficiency were asserted without evolved dynamics. Kept orientation retention at every speed as a dynamical obligation, and distinguished the raw leg prefactor from the synchronization observable. |

## Independent derivations and counterexamples

Claim grade: derived. The following calculations are independent of the edited prose and use explicitly labeled comparison geometry or effective canonical mechanics. They do not import Lorentz or Hamiltonian laws as substrate premises. Their falsifiers are an algebraic error or a counterexample satisfying the declared assumptions.

1. **Fixed-endpoint roots.** For a receiver translating directly away from an emission point with initial longitudinal separation equal to the positive comparison length, isotropic signal distance equals that separation plus receiver translation. Solving gives separation divided by channel speed minus group speed. The return leg gives the sum denominator. Transverse interception follows by Pythagoras with constant transverse separation. A rotating endpoint, changing length, anisotropic transport, or acceleration requires a different root equation.
2. **Shape versus scale.** Summing longitudinal legs gives twice parallel length times Lorentz factor squared divided by channel speed. The transverse return gives twice transverse length times Lorentz factor divided by channel speed. Equating them fixes the axis ratio but leaves the overall transverse scale free. Dividing the common period by the rest period gives the transverse scale ratio times the Lorentz factor. Thus matching shape does not establish clock dilation when that scale is free.
3. **Three time comparisons.** Use the effective comparison map with moving time equal to Lorentz factor times absolute time minus velocity times absolute position divided by squared channel speed. At equal absolute time, the separation of sites with rest distance equal to one rest-length variable has moving-time difference minus velocity times rest distance divided by squared channel speed. Conversely the inverse transformation gives absolute-time difference equal to Lorentz factor times velocity times rest distance divided by squared channel speed for simultaneous moving-chart events. The half-leg difference is an absolute-chart duration; dividing it by the dilated-clock factor gives the positive synchronization-offset magnitude. These are different event comparisons and cannot share one unqualified label.
4. **Normalized illustration.** A tiny arithmetic instrument first passed the known rest case with wake speed and comparison channel speed both one, unit separation, unit Lorentz factor, equal unit flight durations, round-trip period two, and zero offsets. It was then evaluated at group speed 0.6 and unit scale: Lorentz factor 1.25, parallel length 0.8, forward duration 2, rear duration 0.5, period 2.5, raw half-difference 0.75, moving-clock offset magnitude 0.6, and moving-simultaneity absolute-time difference 0.75. At scale two, only the size/flight/period comparison is used: the forward and rear durations are 4 and 1 and the period is 5, although the ruler aspect ratio remains 1.25. The unit-scale clock-offset conversion is not applied to that rescaled clock example.
5. **Endpoint limit.** Set the transverse scale proportional to the square root of one minus speed fraction. The forward duration then tends to a finite constant proportional to the square root of two, rather than infinity. This exact substitution refutes a scale-independent divergence claim while retaining the axis-ratio formula at every sub-channel speed.
6. **Discrete label counterexample.** One regular simple causal-root branch can vary continuously with a parameter while retaining the same root count and label. More simply, a classical harmonic oscillator has one cycle per period for continuously variable amplitude. A discrete winding or root count alone does not quantize its amplitude or action.
7. **Phase and action.** A periodic phase changes by an integer multiple of a full turn. This fixes a winding number, not the conjugate action. Converting an action variable to cycle action introduces a factor of two pi only after an applicable canonical action-angle chart is specified. Effective quantum action rules may require turning-point or geometric-phase corrections; the retained unshifted action display is a restricted target.
8. **Energy differential.** For an effective Hamiltonian depending on action and an external parameter, its differential includes both frequency times action differential and parameter derivative times parameter differential. In the elementary example where the Hamiltonian is a varying frequency parameter times an action, keeping action fixed while changing frequency changes energy; the action integral alone is zero. The missing work term is therefore necessary.
9. **Residual symmetry.** A smooth response proportional to signed velocity is compatible with regularity and violates evenness. It is excluded only if reversal symmetry of the complete preparation and response is imposed. An oriented readout similarly permits odd angular harmonics. Fitting only even terms cannot establish that these physical symmetries hold.

## Authority and coordination

Read the live [Lorentz Kinematics closed-return section](../../../../content/markdown/aaa/spacetime/lorentz-kinematics.md#closed-return-derivation-of-the-lorentz-axis-ratio), including its declared fixed-endpoint chart and its explicit lack of a stability theorem, and [Braid Envelope Geometry canonical variables](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md#canonical-geometry-variables). The live Special Relativity bridge defines the branch tuple variables as radii, angular frequencies, characteristic speeds, and binary axes; this existing dictionary was propagated without changing canon. Its concurrent reviewer confirmed consistent scale and synchronization distinctions. That coordination is consistency evidence, not an independent mathematical reference.

No new external empirical claim, app behavior claim, or numerical observational bound was added. The app remains a link to the existing geometry surface; runtime code and generated assets were not edited or used as evidence for evolved dynamics.

## Validation and preservation

Known-case-first `.tmp/crw-005-return-cycle/check.cjs` passed its one-inline/one-display synthetic sample excluding a fenced example and a strict KaTeX simple-variable render before processing the chapter. It reports 112 strict KaTeX expressions: 35 displays and 77 inline expressions. All 35 displays are byte-identical to the clean captured baseline, and all original viewer identifiers are preserved.

The link extractor first passed its two-target synthetic example. All 40 final links were preserved from baseline and their local paths exist by filesystem resolution. This checks path existence, not every fragment or app behavior.

`git diff --check HEAD -- content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md` passed. `node scripts/validate-content.mjs --check --strict` passed with 1764 repository Markdown files, 199 corpus files, 391 scene files, zero errors, zero warnings, and 30 notes before this receipt and the final two clarifying prose edits. Final focused checks passed after those edits. The coordinator owns joined validation and shared-record integration. No Git or generated write was performed.

## Open obligations

- **RC-O1 — Dynamical Lorentz realization.** Evolve an admitted translating branch with complete causal-root history, establish retention/stability, and extract the geometry, scale, clock, synchronization, and two-way leakage from that same branch.
- **RC-O2 — Quantization and action.** Derive isolated admissible states, the effective canonical action map, and any one-quantum branch transaction with all parameter-work and wake terms. Discrete root labels and phase return alone do not settle these targets.
- **RC-O3 — Residual and medium response.** Derive the orientation, symmetry, regularity, and medium-retention conditions that justify a predicted residual across a declared speed domain; fit shape and prescribed trajectories alone are insufficient.
