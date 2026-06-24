# Equation Closure Pass 2026-06-23 L

## Scope

- `EQ-14`, `EQ-25`, `EQ-30`, and `EQ-31` statistical rows.
- Shared finite-window measure and statistical pushforward component.
- Bill Thurston review trigger for expert geometric/topological acceleration.

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

## Bill Thurston Review Trigger

Ask for Bill Thurston input when a round exposes a compact mathematical structure whose topology, dynamics, or quotient behavior could be advanced faster by expert geometric judgment. The prompt packet should be a temporary consolidated file. It should ask first for overall insights, corrections, and advancements to the material, then list specific questions, then append the review material.

Preferred comment count per round: 10 comments. That is enough to get broad mathematical guidance without turning the response into an unfocused review dump.

Candidate questions for a Bill round once the next retained example is selected:

1. Does $\mathcal C_{\mathrm{stat}}^{W,T}$ have the right mathematical shape, or should the carrier be formulated as a groupoid/measure-on-paths object rather than a windowed pushforward?
2. For the spinor and gauge rows, is the ordered-frame pullback closer to a covering-space obstruction, a holonomy obstruction, or a quotient-bundle construction?
3. For resonance widths, can escape corridors be made topologically stable enough that $\Gamma$, $\tau$, and $B_k$ are naturally measures of one exit-corridor family rather than fitted rates?

## Next Closure Step

Pick one retained or toy-but-structure-faithful example and instantiate $\mathcal C_{\mathrm{stat}}^{W,T}$ through all fields. The lowest-risk options are an elastic scattering packet for `EQ-30` or a metastable escape-measure packet for `EQ-31`.
