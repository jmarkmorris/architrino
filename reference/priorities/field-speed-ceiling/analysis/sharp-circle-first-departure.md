# First departures from nearby circular histories

**Date:** 2026-09-16. **Grade:** measured floating-point integration of the sharp equation, with known-case validation and step refinement; not a certified nonlinear trajectory theorem. **Instrument:** [sharp-circle-departure.mjs](../../../../scripts/field-speed-ceiling/sharp-circle-departure.mjs). **Receipt:** [parameters, source hash, reproduction commands and results](../evidence/sharp-circle-departure-receipt.json).

## Input and scope

Use length unit $R_\ast$, time unit $R_\ast/c_f$, $c_f=1$, and dimensionless coupling $k=K/R_\ast=4D(1+\sin D)$, $D=\cos D$. For all negative dimensionless times $\tau$, supply

$$
X_A(\tau)=r(\cos(\tau/r),\sin(\tau/r)),\qquad X_B=-X_A,
$$

with exact unit tangent velocity. Use $r=1.001$ and $r=0.999$, and release the future to the sharp capped equation at zero. These are kinematically consistent input histories, not certified all-past solutions or exact members of the nonlinear unstable manifold. They have the known acceleration mismatch at release. The calculation tests their generated future; it does not establish how nature prepares these histories or the fate of every unstable history.

The source histories remain intact. For each receiver event, bisection solves $|X_A(\tau)+X_A(s)|=\tau-s$ using a lower bracket beyond the sum of current and maximum past radii, with an additional unit of margin. Negative-time source evaluations use the analytical history without a memory cutoff. Positive-time evaluations use the entire stored numerical history. The exact capped geometry makes the source gap monotone; the measured transmitter factor stays positive. The numerical root checks are not directed-rounding completeness certificates.

The raw acceleration is exactly $-kn/(r_{\mathrm{hit}}^2J_t)$ with $J_t=1+n\cdot V_A(s)$ and no self channel. On the active boundary the integrator evolves inertial position and velocity heading, removing only the positive forward component. Cubic Hermite interpolation supplies past positions and their derivatives; RK4 supplies time updates. The maximum step is also limited by turning rate and positive delay so that all stage sources precede the accepted history endpoint. No wake width, softened core, frozen-root suppression, or new reception rule is used. Numerical interpolation and discretization errors remain and are assessed by refinement.

## Known case before target runs

The instrument was first run on the exact $r=1$ circle. At $\tau=3$, radius, delay, transmitter factor and raw forward component agreed with the closed forms within $10^{-8}$. The recorded radius was $0.9999999999985308$ and the delay $1.4781702664293457$. Assertions passed before the target histories were evolved. A CLI flag parsing issue and a terminal-time roundoff stop were repaired during known-case verification, before target runs. Later changes exposed the angular-step and radius-guard parameters; the known case passed again before the refined target runs. The receipt records a further unchanged-instrument verification.

## Expanding input: loss of the active ceiling branch

The $r=1.001$ history evolves outward and reaches a sign change of the raw forward acceleration near

$$
\tau\simeq19.910,\qquad |X_A|\simeq2.8723.
$$

At maximum step 0.001, the last positive-forward accepted time and the first nonpositive trial stage bracket the event by $[19.909,19.910]$. At step 0.0005 the numerical bracket is $[19.9095,19.9100]$. The first nonpositive stage radii agree within $1.1\times10^{-9}$ between these two runs; this is same-instrument refinement evidence, not a rigorous event-location error bound. The last accepted finer state has radius approximately 2.87208, outward radial speed 0.484815, causal delay 3.42171, and transmitter factor 1.93981. The partner root remains regular as the forward component approaches zero.

This is the first identified response-regime change. At a negative forward component the ceiling must retain braking, so a solver that keeps unit speed would no longer solve the authorized capped equation. The run therefore stops at the numerical crossing bracket. It does not continue the heading-only equation beyond its domain. The result indicates a transition requiring the full capped velocity evolution; it does not establish escape or a completed outer turning point.

## Contracting input: small radius before any observed branch change

The $r=0.999$ history contracts to the declared radius-resolution guard $|X_A|=0.01$, reached numerically near $\tau=16.4406$. The last states at the two refined resolutions are:

| Maximum step / turning control | Stop time | Radius | Raw forward component | Transmitter factor |
|---|---:|---:|---:|---:|
| 0.001 / 0.005 | 16.4405968 | 0.00997875 | 8500.39 | 0.899861 |
| 0.0005 / 0.0025 | 16.4405562 | 0.00999846 | 8466.99 | 0.899894 |

The difference in forward amplitudes is primarily sampled at different radii on this rapidly varying segment, so it is not a fixed-state error estimate. The finer last state has delay 0.0254820 and inward radial speed approximately $-0.485562$. Its forward component remains positive and its partner root remains ordinary. The guard is a numerical stopping criterion, not a hard core, a physical radius, or a collision rule; no acceleration kernel was modified at it.

No new dynamical event was established on this branch before the guard. These runs do not prove finite-time collision, a limiting spiral, rebound, or survival at zero separation. Smaller radii would require further resolved integration or an analytical asymptotic argument.

## Limits and disposition

The observed cubic-history source-speed error in the finer contracting run is at most approximately $2.47\times10^{-10}$ over evaluations made by the instrument; this measures interpolation consistency, not an interval speed certificate. The finest root residuals at the last states are below $10^{-12}$. Runs finished within four seconds each on this session's host, as recorded by the instrument. No broad test suite or smoothed dynamics was run.

The expanding branch supplies a concrete next dynamical boundary: leave the active ceiling when forward raw acceleration changes sign. The contracting branch supplies a concrete resolution boundary: very small radius with no observed loss of the active branch. Their different outcomes are measured for the two declared supplied histories and cannot be generalized to all small disturbances. The next useful continuation is a full speed-variable sharp solver across the expanding branch's sign change; the heading-only equation must not be extended there.

**Falsifiers:** a refined complete-root integration that removes the forward sign change or changes the pre-guard contraction qualitatively would overturn the corresponding diagnostic. An additional causal root, source interpolation failure, or violation of the method-of-steps source bound would invalidate the affected run. The retained theorem about existence of unstable admissible histories does not rely on these numerical experiments.
