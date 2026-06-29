# Superposition and locality

Potential wake contributions from all sources superpose linearly. The net potential at any point is the sum of the individual contributions:
$$
\Phi_{\text{net}}=\sum_i\Phi_i
$$
The total acceleration on a particle at any instant is the vector sum of the contributions from every intersecting causal wake surface. Operationally, every architrino is continuously immersed in the superposed wakes of all others and, when the same-source root condition permits, its own. Calculating the path-history integral is tractable by isolating each causal emission event, evaluating the receiver-normal $W^{\mathrm{rec}}/r^2$ kernel at that emission, and then summing under a declared finite active horizon, screening rule, cancellation argument, or summation prescription.

## Why Nearby Wakes Dominate

  - Linear addition at the causal-surface level:
    - Because each source contributes a distribution supported on its causal wake surfaces, the total wake measure is a sum of these measures; the acceleration law is linear in the summed contributions.

  - Locality from $1/r^2$ plus convergence control:
    - The surface density on each causal wake surface scales as $1/r^2$, so nearby coherent hits contribute disproportionately compared to distant ones. In an infinite three-dimensional source population this does not by itself guarantee convergence, because the number of sources in a radial layer grows like $r^2\,dr$. Random phases, angular cancellation, screening, finite active horizons, or explicit mean-field/principal-value subtraction must be part of the branch prescription.

- Practical consequence:
  - Simulations can prioritize nearby sources and recent roots only after declaring the far-field treatment: cutoff error, multipole cancellation, screened background, sampled mean field, or principal-value subtraction.

Plain language: Add the pushes from all causal wake surfaces, but do not assume one over distance squared makes an infinite universe automatically finite; the simulation must say how distant wakes cancel, screen, or get summarized.
