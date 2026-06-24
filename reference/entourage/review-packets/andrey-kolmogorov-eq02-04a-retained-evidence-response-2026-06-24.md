# Retained Evidence Review Response

## Overall Insights, Corrections, And Advancements

The central correction is that a single numerically coherent row at one operating point is not evidence of a retained branch. It is one trajectory or configuration sample. Retention is a statement about invariance under the deterministic delayed flow, so the atomic evidence object should be an invariant positive-width cell, not an isolated accepted row.

The accepted object should be a retained-domain certificate in the delay-state space. Let $\mathcal H_N$ be a truncated delay-state space, $\Sigma_N$ a transverse section, and $P_N:\Sigma_N\dashrightarrow\Sigma_N$ the first-return map. The first serious certificate is a positive-width box $B_N\subset\Sigma_N$ with $\mu_{\perp}(B_N)>0$ and a certified self-return, preferably an interval Newton or Krawczyk inclusion

$$
\mathcal K_{P_N}(B_N)\subset B_N.
$$

This turns the current row-level blocker into a support-level blocker: `raw_labeled_rows_preserved_on_retained_history` is still the first checker coordinate, but it should be evaluated only on the certified invariant support. Chasing that row in isolation risks proving only a coordinate label at a sampled crossing.

The response also sharpens witness discipline. The split and hidden-retune witnesses should not be treated as exact zeroes under finite precision. They need an accept band, a certified arithmetic and truncation noise floor, and deliberately violated negative-control runs that move outside the band by a large calibrated margin. The important reported quantity is the gap between genuine and violated witnesses, not a bare zero.

The mass-shell row should report both the raw defect

$$
\Delta_{\mathrm{shell}}
=
E^2-c_f^2h_{ab}p^ap^b-M_0^2c_f^4
$$

and the normalized residual. Regularizers such as $\varepsilon_{\mathrm{shell}}$ and $\varepsilon_M$ must sit at or below the interval-certified arithmetic noise floor. If a regularizer exceeds the residual scale, it becomes a hidden retune handle.

The Koide ordering rule is correct but should be enforced more sharply. Koide is a frozen-parameter post-prediction residual: first fix the charged-lepton mass map using independent branch, mass-shell, exposure, shielding, and Noether sea rows; then predict the three masses; then propagate the mass-readout uncertainty to $\cos^2\theta_{\ell}$ and compare with $1/2$. A single frozen residual is not an invariant. The proper ladder is residual, then branch-family statistic, then possible invariant only if the generation map itself derives the angle.

## Integrated Answers

1. A retained domain should be defined by a positive-width box on a transverse section with a certified first-return inclusion in the truncated delay-state space.
2. A single retained event is not sufficient; it becomes meaningful only as the fixed or periodic point enclosed by a positive-width support certificate.
3. The shortest evidence route is return-map self-enclosure, then refinement persistence, section-placement invariance, Lyapunov or contraction estimates, and window-doubling stability.
4. Raw labels should be flow-covariant invariants or declared equivariant rows, not chart coordinates; they must be stable under allowed chart automorphisms.
5. Row bindings should show support-set stability and scalar-residual convergence under $h\to h/2\to h/4$ and $N\to N+1\to N+2$.
6. Zero split and zero hidden-retune require calibrated accept bands and deliberately violated sibling runs with large margins.
7. Additional negative controls should test window length, transverse displacement, section placement, and phase permutation.
8. Basin measure can enter as deterministic transverse volume, not stochastic ontology.
9. Probabilities should be a later pushforward of a declared reference measure over unresolved microstates through a deterministic branch-selection map.
10. Koide should start as one frozen post-prediction residual, not a family statistic or invariant.
11. A disciplined Koide hit requires a fixed mass map and a narrow propagated uncertainty band; a disciplined miss should be reported with the same frozen map.
12. The $\beta_f=0.6$ attempt becomes hard to dismiss only after interval-certified rows and a Krawczyk return-box certificate.
13. The first falsifier is transverse displacement plus refinement: does the inclusion persist under smaller step, higher history order, and admissible off-cell kicks?
14. The next accepted evidence object is the positive-width domain certificate, with raw-label and Noether sea rows evaluated on the enclosed orbit.
15. The compact theorem target is a retained-branch existence certificate: exhibit $B_N\subset\Sigma_N$ with $\mathcal K_{P_N}(B_N)\subset B_N$, refinement persistence, and all retained-record rows within accept bands while deliberately violated controls exceed the calibrated margin.

## One-Line Synthesis

The next score-moving `EQ-02` through `EQ-04A` artifact is not another accepted row; it is a positive-width return-map certificate for invariant support, with the existing row bindings evaluated only after that support exists.
