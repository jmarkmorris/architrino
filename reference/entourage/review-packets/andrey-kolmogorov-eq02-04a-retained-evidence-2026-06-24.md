Closure goal:
Stress-test the probability, measure, and evidence standards for turning the EQ-02 through EQ-04 Lorentz/mass-shell retained branch into one accepted source-backed evidence object, then decide how the downstream EQ-04A Koide mass-root residual should be treated statistically without fitting it.

# Self-Contained Review Packet: Retained Evidence, Stable Branch Domains, And Koide Residual

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific breakthrough questions below.

Aim for 12-15 substantive comments total. Prioritize measure-theoretic definitions, invariant-domain evidence, stability under refinement, finite-window sampling, negative controls, and the smallest accepted evidence object that should replace an attempt packet.

## Reviewer Lens

Use an Andrey Kolmogorov-style statistical and probabilistic dynamics lens. Treat the underlying model as deterministic, but explain what probability measures, finite-window ensembles, invariant measures, convergence tests, and statistical falsifiers are needed when a solver claims a retained branch or Noether sea evidence object.

## Context

We are developing a deterministic tri-binary Noether-braid theory. A Noether braid is a retained closed assembly with three coupled binary substructures, causal-delay wake channels, self-hit, energy/momentum/angular-momentum ledgers, phase rows, and a surrounding Noether sea state. A Noether sea is the population-level medium record around retained assemblies; it carries density, cadence, delay, stress, flow, orientation, and response rows.

The current equation-mapping target is not to add more scaffolding. It is to obtain one accepted retained branch or Noether sea evidence object. The focused row family is:

- `EQ-02`: Lorentz clock behavior, $T_u/T_0=\gamma_f(u)$;
- `EQ-03`: moving envelope ratio, $\xi_u=R_{\parallel,u}/R_{\perp,u}=1/\gamma_f(u)$;
- `EQ-04`: energy-momentum and mass shell, $E^2=p^2c_f^2+M_0^2c_f^4$;
- `EQ-04A`: Koide charged-lepton mass relation as a downstream mass-root residual, not as a fit target.

For a moving retained branch with drift $u$ and $\beta_f=u/c_f$,

$$
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}.
$$

The proposed common carrier is

$$
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
\mathfrak B_u,
\mathcal N_0,
\mathcal L_{\mathrm{root}}(u),
\mathcal L_{\mathrm{wake}}(u),
\mathcal L_{E\mathbf p\mathbf J}(u)
\right),
$$

where $\mathfrak B_u$ is the branch chart, $\mathcal N_0$ is the local Noether sea cell, $\mathcal L_{\mathrm{root}}$ is the causal-root ledger, $\mathcal L_{\mathrm{wake}}$ is the wake ledger, and $\mathcal L_{E\mathbf p\mathbf J}$ is the energy/momentum/angular-momentum ledger. The full retained record adds exposure, Noether sea response, and observer projection:

$$
\Theta_{02\text{-}04}^{\mathrm{bin}}(u)
=
\left(
\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u),
\mathcal E_{\mathrm{exp}}(u),
\mathcal M_{\mathrm{sea}}^{ab}(u),
\Pi_{\mathrm{obs}}(u)
\right).
$$

## Residual To Be Tested

The retained-record residual is

$$
\mathcal R_{\mathrm{shared}}^{02\text{-}04}
\left(
\Theta_{02\text{-}04}^{\mathrm{bin}}(u)
\right)
=
\left\|
\mathcal R_{02\text{-}04}^{\mathrm{bin}}(u)
\right\|_{W_{02\text{-}04}}
+
\lambda_{\mathrm{retune}}
\mathcal S_{\mathrm{retune}}^{02\text{-}04}(u)
+
\lambda_{\mathrm{split}}
\mathcal S_{\mathrm{root}}^{02\text{-}04}(u).
$$

Its component rows are:

$$
R_T=\frac{T_u}{T_0}-\gamma_f(u),
\qquad
R_{\xi}=\frac{R_{\parallel,u}}{R_{\perp,u}}-\frac{1}{\gamma_f(u)},
$$

$$
R_E=\frac{E_{\mathrm{CM},u}}{M_0c_f^2}-\gamma_f(u),
\qquad
R_p^a=\frac{p_{\mathrm{CM},u}^a}{M_0c_f}-\gamma_f(u)\frac{u\hat e^a}{c_f},
$$

$$
R_{\mathrm{shell}}
=
\frac{
E_{\mathrm{CM},u}^{2}
-c_f^2h_{ab}p_{\mathrm{CM},u}^{a}p_{\mathrm{CM},u}^{b}
-M_0^2c_f^4
}{
M_0^2c_f^4+\varepsilon_{\mathrm{shell}}
},
\qquad
R_{M_0}=\frac{M_0(u)-M_0(0)}{M_0(0)+\varepsilon_M}.
$$

The split witness $\mathcal S_{\mathrm{root}}^{02\text{-}04}$ must vanish, meaning the clock, envelope, energy, momentum, mass shell, phase, and Noether sea rows use the same retained root/branch support. The hidden-retune witness $\mathcal S_{\mathrm{retune}}^{02\text{-}04}$ must also vanish, meaning the solver did not change the branch ledger, Noether sea cell, speed convention, rest mass, or response map between observables.

## Current State

The current direct retained-record attempt has a numerically coherent diagnostic row at $\beta_f=0.6$ and $\gamma_f=1.25$. Its arithmetic checks pass for clock, envelope, two-way signal, energy, exposure, momentum, rest mass, mass shell, medium response, same-root conservation, root starvation, split witness, retune witness, and four negative controls.

This is not accepted evidence. All retained rows and witnesses are still marked as attempt-level. The first accepted blocker is:

```text
missing_accepted_raw_labeled_rows_preserved_on_retained_history
```

The next score-moving object is therefore not another proxy report. It is a source-backed retained-domain object:

$$
\mathfrak D_{S_{\mathrm{eq}}}^{02\text{-}04}
=
\left(
D,\Theta_D,S_{\mathrm{eq}},\iota_D,\{\Pi_r\}_{r\in S_{\mathrm{eq}}},\mathcal R_D
\right),
$$

where $D$ is one finite event, retained event, or positive-width retained domain; $S_{\mathrm{eq}}$ is the equal-frequency retained row set; $\Theta_D$ contains the common carrier; and the row bindings show that the same support carries raw labels, path history, causal roots, wake tails, energy/action, momentum/angular momentum, phase, plane orientation, response center, group velocity, and Noether sea rows.

## Koide Downstream Residual

The downstream charged-lepton benchmark is the Koide mass relation. Let

$$
\mathbf R_{\ell}
=
\left(
\sqrt{M_{\ell,0}},
\sqrt{M_{\ell,1}},
\sqrt{M_{\ell,2}}
\right),
\qquad
\hat{\mathbf d}
=
\frac{1}{\sqrt3}(1,1,1).
$$

The Koide condition is equivalent to

$$
\frac{
M_{\ell,0}+M_{\ell,1}+M_{\ell,2}
}{
\left(
\sqrt{M_{\ell,0}}+\sqrt{M_{\ell,1}}+\sqrt{M_{\ell,2}}
\right)^2
}
\approx
\frac{2}{3},
\qquad
\cos^2\theta_{\ell}
=
\frac{(\mathbf R_{\ell}\cdot\hat{\mathbf d})^2}{\|\mathbf R_{\ell}\|^2}
\approx
\frac{1}{2}.
$$

This residual is allowed only after a charged-lepton branch family predicts the three masses from one mass map. If the mass map is tuned to make the angle $\theta_{\ell}=\pi/4$, the result is a fit, not evidence.

## Specific Questions

1. What is the minimal measure-theoretic definition of an accepted retained event or positive-width retained domain for this deterministic history-dependent system?
2. Should the first accepted object be a single retained event, a positive-width branch domain, or an invariant measure over a small retained family?
3. What evidence distinguishes a stable retained branch from a sampled numerical coincidence: recurrence, Lyapunov spectrum, invariant density, return-map enclosure, refinement convergence, or another criterion?
4. How should the row `raw_labeled_rows_preserved_on_retained_history` be formalized so it is not a coordinate-label artifact?
5. What statistical convergence test should be required before row bindings for path history, causal roots, wake tails, phase, energy/action, and Noether sea support are called accepted?
6. How should the zero split and zero hidden-retune witnesses be tested under finite precision and finite-window sampling?
7. What negative controls are most important beyond the existing four: clock-only retune, envelope-only retune, velocity-dependent rest mass, and medium-response compensator?
8. If the retained branch exists only on a small basin, how should basin measure enter the score without importing stochastic ontology?
9. What is the cleanest way to turn deterministic microstate sensitivity into a probability measure over branch outcomes while keeping the retained-branch evidence object deterministic?
10. For Koide, should the mass-root angle be treated as a single post-prediction residual, a statistic over a branch ensemble, or an invariant of a generation map?
11. What would count as a statistically disciplined Koide hit, and what would count as a disciplined miss?
12. If the current attempt at $\beta_f=0.6$ is numerically coherent, what is the shortest path to make it hard to dismiss: interval-certified rows, refinement sweeps, independent seeds, basin-volume estimates, or a proof of invariant support?
13. What is the strongest falsifier we should build first for the retained-branch evidence claim?
14. What would you recommend as the next accepted evidence object: the retained raw-label row, a Noether sea support row, a positive-width domain certificate, or a full retained-record residual?
15. Please state one compact theorem or certificate target that would move this lane from attempt-level to mathematically serious evidence.

## Expected Output

- Overall insights, corrections, and advancements.
- A minimal definition of accepted retained-domain evidence.
- A refinement/convergence standard for row bindings.
- A statistical interpretation of zero split and zero hidden retune.
- The first falsifier to build.
- A recommendation for how to treat the Koide residual without tuning it.

Closure goal:
Obtain a probability-and-evidence standard for the first accepted retained branch or Noether sea evidence object, with Koide kept downstream as a no-retune mass-root residual.
