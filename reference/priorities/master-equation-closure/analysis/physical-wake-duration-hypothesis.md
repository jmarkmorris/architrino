# Physical Wake Duration: Unadopted Hypothesis

## Scope and disposition

A wake with an intrinsic nonzero duration would be an additional physical hypothesis. The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) selects reception from a continuously emitted family of sharp causal wake surfaces; it does not assign a physical thickness to an individual surface. Mathematical mollification remains a permitted analytical or numerical technique. Its positive width is an auxiliary parameter, and any conclusion about the Master Equation requires a justified approximation or recovery limit.

The physical-duration suggestion previously appeared among the numerical cautions in [Action Model Comparison](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md#recommendation). This note preserves that suggestion for research without adopting it, prescribing a solver change, or claiming that a physical width follows from the existing equation.

## Preserved proposal

The proposed idea was: if wake surfaces have duration, replace the arrival selector $\delta(T-T_t-r/c_f)$, or equivalently the distance selector $\delta(r-c_f(T-T_t))$ with its stated Jacobian, by a normalized smooth profile. A profile applied only to $\delta(T-T_t)$ smooths emission timing, not propagation arrival.

Here $T_t$ is emission time, $T$ is reception time, $r$ is the distance from the emission site to the receiver, and $c_f$ is the wake speed. Every numerical instantiation uses $c_f=1$. The time-gap and distance-gap descriptions have widths related by multiplication by $c_f$; their normalized profiles also carry the corresponding change-of-variable factor.

## Why a physical width is a different hypothesis

A sharp selector admits emissions satisfying the causal equality exactly. A profile at fixed nonzero width generally weights a band of emissions, including emissions whose gap is nonzero. Normalization preserves the integral of the selector over its gap coordinate, but does not preserve its integral against every varying acceleration amplitude or history. A test function supported away from zero has zero pairing with the sharp selector and can have a nonzero pairing with a positive-width profile. This is a derived distributional distinction, not evidence that a physical width exists.

If the width is removed and the relevant acceleration integral and evolved histories converge on a specified domain, the construction can supply a mathematical route back to the Master Equation. Keeping the width physically nonzero would instead require an independently justified reception law, its scale and profile, its causal support, and a demonstration of which established results survive. No such derivation or evidence is supplied here. Normalization alone does not settle inverse-distance singularities, coincidence continuation, conservation, or solution uniqueness.

Claim grade: the distinction between a sharp distribution and a finite-width profile is derived from their action on test functions. Physical wake duration remains an unadopted hypothesis. A proof that a particular proposed reception construction yields the same acceleration functional for every admitted history would overturn the classification of that construction as changed dynamics; convergence only as its width vanishes would establish an approximation or recovery route instead.
