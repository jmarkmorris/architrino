# Superposition and locality

Potential wake contributions from all sources superpose linearly. The net potential at any point is the sum of the individual contributions:
$$
\Phi_{\text{net}}=\sum_i\Phi_i
$$
The total acceleration on an architrino at any instant is the vector sum of the contributions from every intersecting causal wake surface. Operationally, every architrino is continuously immersed in the superposed wakes of all others and, when the same-transmitter root condition permits, its own. Calculating the path-history integral requires isolating each causal emission event, evaluating the transmitter-side $W^{\mathrm{acc}}/r^2$ acceleration kernel at that emission, and then summing under a declared finite active horizon, screening rule, cancellation argument, or summation prescription.

The simple rule is: add every causal wake contribution that actually reaches the receiver, but do not pretend that distance alone solves the infinite-background problem. A local simulation must say how far-field wakes are cut off, screened, canceled, summarized, or subtracted.

## Why Nearby Wakes Dominate

Linear addition happens at the causal-surface level. Each source contributes a distribution supported on its causal wake surfaces, the total wake measure is a sum of those measures, and the acceleration law is linear in the summed contributions.

Locality comes from $1/r^2$ only after convergence control is declared. The surface density on each causal wake surface scales as $1/r^2$, so nearby coherent hits contribute disproportionately compared to distant ones. In an infinite three-dimensional source population this does not by itself guarantee convergence, because the number of sources in a radial layer grows like $r^2\,dr$. Random phases, angular cancellation, screening, finite active horizons, or explicit mean-field/principal-value subtraction must be part of the branch prescription.

The practical consequence is narrow: simulations can prioritize nearby sources and recent roots only after declaring the far-field treatment. The declaration may be cutoff error, multipole cancellation, screened background, sampled mean field, principal-value subtraction, or another explicit summation prescription.

Plain language: Add the pushes from all causal wake surfaces, but do not assume one over distance squared makes an infinite universe automatically finite; the simulation must say how distant wakes cancel, screen, or get summarized.
