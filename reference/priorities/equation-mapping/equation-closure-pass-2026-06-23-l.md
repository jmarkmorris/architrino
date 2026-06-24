# Equation Closure Pass 2026-06-23 L

## Scope

- `EQ-14`, `EQ-25`, `EQ-30`, and `EQ-31` statistical rows.
- Shared finite-window measure and statistical pushforward component.
- External geometry/topology review follow-up for refinement stability.

## Result

This pass defines the reusable finite-window statistical carrier

$$
\mathcal C_{\mathrm{stat}}^{W,T}
\equiv
\left(
W,
T,
\Phi_T,
\mu_{*,T},
\mathcal Q,
K_{\mathrm{det}},
\mathcal B,
\mathcal C,
\mathcal S_{\mathrm{retune}}
\right),
$$

where $W$ is the retained window, $T$ is the observation window, $\Phi_T$ is the deterministic substrate transition map, $\mu_{*,T}$ is the finite-window measure, $\mathcal Q$ is the coarse-graining, $K_{\mathrm{det}}$ is the detector/readout kernel when present, $\mathcal B$ is the basin or outcome partition, $\mathcal C$ is the exit-corridor family when metastability is in scope, and $\mathcal S_{\mathrm{retune}}$ is the no-hidden-retune witness.

The tuple above is the reducer-facing coordinate chart. The mathematical carrier should be developed as a sheaf of path-history measures over refinement windows, with $\mathcal R_{\mathrm{coarse}}$ measuring failure of coarse-graining and restriction maps to commute. The first well-definedness calculation is a null-separatrix estimate, $\mu_{*,T}(N_\epsilon(\partial\mathcal B))\to0$, so basin/corridor measures are not detector-tuned.

Consumer rows should be projections

$$
O_{\alpha}^{\mathrm{stat}}
=
\Pi_{\alpha}^{\mathrm{stat}}
\mathcal C_{\mathrm{stat}}^{W,T}
+
\mathcal R_{\alpha}^{\mathrm{stat}}.
$$

This is a common equation object, not a score increase. It sharpens the burden: a probability current, entropy row, cross section, detector count, form factor, resonance width, lifetime, or branching fraction may be scored only after the same retained carrier supplies the relevant projection.

## Row Effects

- `EQ-30`: the elastic scattering residual should instantiate $\mathcal C_{\mathrm{stat}}^{W,T}$ with $\Gamma_a\subset W$, $\mu_a$ as the prepared branch measure, $\mathcal B=\{B_b\}$ as final-state classes, and no active corridor family unless the packet is coupled to a metastable row.
- `EQ-31`: the metastable branch packet should use the same carrier with $B_\star\subset W$, $\mathcal C=\{C_k\}$ as admissible exit corridors, and $\mathcal B$ as detector-visible final-state classes.
- `EQ-14` and `EQ-25`: the same carrier is the shared proof language for Born-current continuity, entropy, thermalization, and fluctuation rows.

## Score Disposition

No score changes. `EQ-30` and `EQ-31` remain `2` in `6/23 b`; the carrier has not been populated by an accepted retained branch ensemble, detector kernel, exposure distribution, or metastable escape measure.

## Review Disposition

The external geometry/topology review was integrated in [Equation Closure Pass 2026-06-23 U](equation-closure-pass-2026-06-23-u.md), and the score-neutral runner hardening was implemented in [Equation Closure Pass 2026-06-23 V](equation-closure-pass-2026-06-23-v.md). The durable result is not a score change; it is the stronger requirement that the finite-window carrier prove at least one refinement-stable object, beginning with the null-separatrix estimate, first-exit corridor additivity, and refinement-cocycle compatibility.

## Next Closure Step

Replace the toy `EQ-31` carrier with one retained source-backed carrier whose `W`, $\Phi_T$, $\mu_{*,T}$, $\mathcal Q$, detector kernel, outcome partition, corridor family, no-hidden-retune witness, first-exit corridor rows, null-separatrix estimate, and refinement-cocycle row all pass together. The lowest-risk options are an elastic scattering packet for `EQ-30` or a metastable escape-measure packet for `EQ-31`.
