# Equation Closure Pass 2026-06-24 H

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: retained-evidence correction and solver-certificate target
- Promotion status: priority-only

## Scope

This pass integrates the Andrey Kolmogorov-style retained-evidence response for `EQ-02`, `EQ-03`, `EQ-04`, and downstream `EQ-04A`. It does not add a new equation row or score. It corrects the first evidence object for the Lorentz/mass-shell lane.

## Correction

The previous `EQ-02` through `EQ-04A` disposition correctly rejected score movement from the numeric attempt row, but it still described the first accepted object too much like a row extraction. The corrected atomic evidence object is an invariant positive-width cell in the delay-state flow.

Let $\mathcal H_N$ be the truncated delay-state space, $\Sigma_N\subset\mathcal H_N$ a transverse section, and

$$
P_N:\Sigma_N\dashrightarrow\Sigma_N
$$

the first-return map. The first serious retained-domain certificate is a box $B_N\subset\Sigma_N$ with

$$
\mu_{\perp}(B_N)>0
$$

and a certified self-return, preferably through a Krawczyk or interval Newton inclusion:

$$
\mathcal K_{P_N}(B_N)\subset B_N.
$$

Only after that invariant support exists should `raw_labeled_rows_preserved_on_retained_history`, path history, causal roots, wake tails, energy/action, momentum/angular momentum, phase, plane orientation, response center, group velocity, and the Noether sea row be accepted as row bindings on the same `S_eq` retained domain.

## Acceptance Discipline

The retained-record attempt remains useful, but only as arithmetic shape. The new score-moving target requires:

- positive transverse width $\mu_{\perp}(B_N)>0$;
- declared delay-state truncation order $N$ and truncation error;
- persistence under refinement $h\to h/2\to h/4$ and $N\to N+1\to N+2$;
- window-doubling stability for time-averaged rows;
- raw residuals reported alongside normalized residuals, especially for mass shell;
- a scale hierarchy

$$
\epsilon_{\mathrm{reg}}
\le
\epsilon_{\mathrm{arith}}
\le
\tau_{\mathrm{accept}}
\ll
\Delta_{\mathrm{neg}};
$$

- calibrated zero split and zero hidden-retune witnesses, where genuine rows sit inside $\tau_{\mathrm{accept}}$ and deliberately violated controls exceed $K_{\mathrm{neg}}\tau_{\mathrm{accept}}$;
- four added branch-retention controls: window-length, transverse-displacement, section-placement, and phase-permutation.

The transverse-displacement control is the first falsifier: a retained branch must remain enclosed or return under admissible off-cell perturbations, while a sampled crossing should escape.

## Koide Disposition

`EQ-04A` remains downstream. The Koide row should be treated as a frozen-parameter post-prediction residual:

1. fix the charged-lepton mass map by independent branch, mass-shell, exposure, shielding, and Noether sea response rows;
2. predict $M_{\ell,0}$, $M_{\ell,1}$, and $M_{\ell,2}$;
3. propagate the mass-readout uncertainty to $\cos^2\theta_{\ell}$;
4. compare the resulting band to $1/2$.

A hit is meaningful only if the uncertainty band is narrow enough that generic nearby mass maps would miss. A single frozen residual may later become a branch-family statistic, and only after that a possible invariant of the generation map.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

The pass raises the quality of the required evidence object, but supplies no accepted invariant cell.

## Next Action

Build the interval first-return certificate target before modifying scores: define $\mathcal H_N$, $\Sigma_N$, $P_N$, $B_N$, $\mu_{\perp}$, $\mathcal K_{P_N}$, truncation error, refinement persistence, and negative-control margins for the current $\beta_f=0.6$ retained-record attempt. Then evaluate the existing `S_eq` row bindings on that certified support.
