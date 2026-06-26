# EQ-04A Koide Charged-Lepton Mass Relation

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Related corpus material: [Particle Masses](../../../content/markdown/aaa/assemblies/particle-masses.md)
- Claim level: speculative charged-lepton benchmark and residual target
- Promotion status: priority-only

## Purpose

This packet adds the Koide charged-lepton mass relation as an equation-mapping target. The intended use is narrow: Koide is a post-prediction benchmark on the charged-lepton generation-by-shielding mass map, not a derivation, not an accepted law, and not a license to fit free parameters until the relation appears.

The useful question is whether one retained charged-lepton branch family and one mass-response map can predict $(m_e,m_\mu,m_\tau)$ and then land near the Koide surface without direct Koide tuning.

## Standard Benchmark

Let

$$
\mathbf r_{\ell}
=
\left(
\sqrt{m_e},
\sqrt{m_\mu},
\sqrt{m_\tau}
\right).
$$

The empirical Koide relation can be written as

$$
\frac{
\left(r_e+r_\mu+r_\tau\right)^2
}{
r_e^2+r_\mu^2+r_\tau^2
}
\approx
\frac{3}{2},
$$

or equivalently

$$
Q_{\ell}
=
\frac{
m_e+m_\mu+m_\tau
}{
\left(\sqrt{m_e}+\sqrt{m_\mu}+\sqrt{m_\tau}\right)^2
}
\approx
\frac{2}{3}.
$$

The first comparison should use the charged-lepton rest/pole-mass triplet. A running-mass comparison is a different packet and must declare the renormalization scheme and scale before any score claim is made.

## Geometric Form

Koide has a sharper geometric reading that should drive the AAA comparison. Define the democratic mass-root axis

$$
\hat{\mathbf d}
=
\frac{1}{\sqrt{3}}
\left(1,1,1\right).
$$

Then

$$
\cos^2\theta_{\ell}
=
\frac{
\left(\mathbf r_{\ell}\cdot\hat{\mathbf d}\right)^2
}{
\lVert\mathbf r_{\ell}\rVert^2
}
=
\frac{
\left(r_e+r_\mu+r_\tau\right)^2
}{
3\left(r_e^2+r_\mu^2+r_\tau^2\right)
}.
$$

The Koide condition is therefore equivalent to

$$
\cos^2\theta_{\ell}
=
\frac{1}{2},
\qquad
\theta_{\ell}
=
\frac{\pi}{4}.
$$

This matters because $\mathbb{A}\mathbb{A}\mathbb{A}$ already treats exposed mass as a projection of branch geometry, shielding, and Noether sea response. If the charged-lepton generation ladder naturally produces a square-root mass vector at $45^\circ$ to the equal-generation axis, Koide would become an angle/sector constraint on the mass-root map rather than a standalone numerical coincidence. This is still a benchmark, not a derivation.

## Mass-Map Carrier

`EQ-04` owns the mass-shell and internal-energy response:

$$
E^2
=
p^2c_{\mathrm{eff}}^2
+
M_0^2c_{\mathrm{eff}}^4.
$$

`EQ-04A` should consume the same mass response after it specializes to the charged-lepton generation ladder. Let $A_{\ell,g}$, $g=0,1,2$, be a retained charged-lepton branch family and let

$$
M_{\ell,g}(\theta)
=
\Pi_M
\left[
\mathcal E_{\ell}(A_{\ell,g};\theta),
\mathcal C_{\mathrm{sea}}(\theta)
\right],
$$

where $\mathcal E_{\ell}$ is the exposed charged-lepton sector record and $\mathcal C_{\mathrm{sea}}$ is the Noether sea response state used by the mass-shell row. The map may include shielding, internal energy, layer exposure, and medium dressing, but those terms must be shared across the three charged leptons.

## Dependency On Retained Mass-Shell Evidence

The first score-moving dependency is not the Koide number. It is the accepted mass-shell carrier that makes the charged-lepton mass readouts lawful:

$$
\Theta_{\ell}^{04A}
=
\left(
\mathfrak D_{\ell},
\{A_{\ell,g}\}_{g=0}^{2},
\Pi_M,
\mathcal E_{\ell},
\mathcal C_{\mathrm{sea}},
\mathcal R_{\mathrm{shell}},
\mathcal S_{\mathrm{retune}}
\right).
$$

Here $\mathfrak D_{\ell}$ is the retained support or branch-family domain, $A_{\ell,g}$ are the three charged-lepton generation branches, $\Pi_M$ is the mass readout, $\mathcal E_{\ell}$ is the shared exposed charged-lepton sector record, and $\mathcal C_{\mathrm{sea}}$ is the same Noether sea response state used by the `EQ-04` mass-shell row.

The acceptable closure order is:

1. accept the same retained support and common carrier needed by `EQ-02` through `EQ-04`;
2. populate the mass-shell row without velocity-dependent rest-mass retuning;
3. specialize the shared mass response to a charged-lepton generation-by-shielding branch family;
4. predict $M_{\ell,0}$, $M_{\ell,1}$, and $M_{\ell,2}$ from that branch family before evaluating Koide;
5. compute the mass-root angle and Koide residual as diagnostics on the already-fixed mass triplet.

Thus Koide can become evidence only if the square-root mass vector

$$
\mathbf R_{\ell}
=
\left(
\sqrt{M_{\ell,0}},
\sqrt{M_{\ell,1}},
\sqrt{M_{\ell,2}}
\right)
$$

is produced by the same mass response that already passed the `EQ-04` shell and no-retune tests. A near-$45^\circ$ mass-root angle is interesting only after the mass map is fixed. If the map is adjusted to make the angle $45^\circ$, the result is a Koide fit and remains score-neutral.

## Koide Residual

The diagnostic residual is

$$
\mathcal R_{04A}^{\mathrm{Koide}}(\theta)
=
\left|
\frac{
M_{\ell,0}+M_{\ell,1}+M_{\ell,2}
}{
\left(
\sqrt{M_{\ell,0}}
+
\sqrt{M_{\ell,1}}
+
\sqrt{M_{\ell,2}}
\right)^2
}
-
\frac{2}{3}
\right|.
$$

A useful diagnostic can also report the inverse form:

$$
\mathcal R_{04A}^{\mathrm{inv}}(\theta)
=
\left|
\frac{
\left(
\sqrt{M_{\ell,0}}
+
\sqrt{M_{\ell,1}}
+
\sqrt{M_{\ell,2}}
\right)^2
}{
M_{\ell,0}+M_{\ell,1}+M_{\ell,2}
}
-
\frac{3}{2}
\right|.
$$

The angle form gives an equivalent residual:

$$
\mathcal R_{04A}^{\mathrm{angle}}(\theta)
=
\left|
\frac{
\left(\mathbf R_{\ell}(\theta)\cdot\hat{\mathbf d}\right)^2
}{
\lVert\mathbf R_{\ell}(\theta)\rVert^2
}
-
\frac{1}{2}
\right|,
\qquad
\mathbf R_{\ell}(\theta)
=
\left(
\sqrt{M_{\ell,0}},
\sqrt{M_{\ell,1}},
\sqrt{M_{\ell,2}}
\right).
$$

The residual is admissible only after the charged-lepton masses have been fixed by the shared mass map. If $\theta$ is chosen by minimizing $\mathcal R_{04A}^{\mathrm{Koide}}$ directly, the packet is a comparison fit and cannot raise the score.

## Frozen-Parameter Prediction Rule

The first serious Koide use is a frozen-parameter post-prediction residual. The mass map must be fixed by independent branch, mass-shell, exposure, shielding, and Noether sea response rows before the Koide angle is evaluated. Let $\hat\theta_M$ denote the already-fixed mass-map parameters and let $\Sigma_M$ denote the propagated uncertainty or interval enclosure of the three mass readouts. The admissible comparison is

$$
\cos^2\theta_{\ell}(\hat\theta_M)
=
\frac{
\left(\mathbf R_{\ell}(\hat\theta_M)\cdot\hat{\mathbf d}\right)^2
}{
\lVert\mathbf R_{\ell}(\hat\theta_M)\rVert^2
}
\quad
\text{with propagated band}\quad
\Delta_{\theta}[\Sigma_M].
$$

A disciplined hit requires

$$
\left|
\cos^2\theta_{\ell}(\hat\theta_M)-\frac{1}{2}
\right|
\le
\Delta_{\theta}[\Sigma_M],
$$

with $\Delta_{\theta}$ narrow enough that generic nearby mass maps would miss. A disciplined miss is the same frozen calculation landing outside the propagated band. A broad band that makes many unrelated mass triples acceptable is not evidence.

The claim ladder is:

1. **Residual:** one frozen mass triplet is checked after prediction.
2. **Family statistic:** a branch family predicts multiple fixed mass triples with no per-state Koide parameter.
3. **Invariant:** the $45^\circ$ mass-root angle is derived from the generation map itself.

This packet is currently at the residual stage. It should not call Koide an invariant until the same charged-lepton branch family proves the angle across its generation map without adding a free angle or a post hoc scale handle.

## Mass-Root Bundle And Moment-Map Diagnostic

The Cartan-style strengthening is to treat $\mathbf R_{\ell}$ as the transported object, not the mass vector. In this reading, each square-root mass is a root coframe-leg length or amplitude-like branch readout, and the mass is its quadratic norm:

$$
M_{\ell,g}
=
\lVert R_{\ell,g}\rVert^2.
$$

That makes $\sqrt M$ the natural linear coordinate in the root/coframe bundle, while $M$ remains the scalar norm read by the exposed mass map. The Koide angle should therefore be tested on the root section

$$
\mathbf R_{\ell}
=
R_d\hat{\mathbf d}
+\mathbf R_{\mathrm{tr}},
\qquad
\mathbf R_{\mathrm{tr}}
=
\mathbf R_{\ell}
-
\left(\mathbf R_{\ell}\cdot\hat{\mathbf d}\right)\hat{\mathbf d},
$$

where $\hat{\mathbf d}=(1,1,1)/\sqrt3$ is the democratic direction and $\mathbf R_{\mathrm{tr}}$ lies in the traceless two-plane. The moment-map/equipartition diagnostic is

$$
\mathcal J_K
=
\lVert \mathbf R_{\mathrm{tr}}\rVert^2
-
\left|
R_d
\right|^2.
$$

The Koide angle condition is exactly $\mathcal J_K=0$: the root vector splits its squared norm equally between the democratic trace direction and the traceless generation plane. This is a stronger geometric target than matching the scalar ratio after the fact, but it is still not an accepted derivation. It becomes evidence only if the charged-lepton generation-by-shielding map first fixes one root section and then the moment-map residual vanishes without adding a Koide angle handle.

## No-Retune Witness

The packet should report a hidden-retune witness:

$$
\mathcal S_{04A}^{\mathrm{retune}}
=
\operatorname{split}
\left(
\theta_{M_e},
\theta_{M_\mu},
\theta_{M_\tau},
\theta_{\mathrm{Koide}}
\right),
$$

with score movement allowed only when $\mathcal S_{04A}^{\mathrm{retune}}=0$ in the declared equivalence class. In plain terms: the electron, muon, tau, and Koide check must use the same retained branch family and the same exposure/shielding/sea-response map.

## Why Charged Leptons First

The charged leptons are the cleanest place to look for a bare generation-by-shielding relation because they avoid persistent color confinement energy. Quarks should not be required to obey the same Koide surface in this packet. Their measured effective masses include color-sector flux, confinement, and strong Noether sea response terms, so quark non-agreement is expected unless a separate strong-sector correction predicts otherwise.

## Current Score

Current `6/23 b` score: `1`.

Reason: the relation is already recognized as a speculative charged-lepton benchmark in the particle-mass material, but there is no accepted charged-lepton retained branch family and no shared mass map that predicts the three charged-lepton masses before checking Koide.

## Closure Burden

To move above `1`, the packet needs:

- an accepted or attempt-level charged-lepton branch family $A_{\ell,0}$, $A_{\ell,1}$, $A_{\ell,2}$ with declared generation map;
- one mass readout $M_{\ell,g}(\theta)$ for all three charged leptons;
- a declared mass convention and scale;
- a Koide residual computed after the mass map is fixed by independent rows;
- a propagated uncertainty or interval band for $\cos^2\theta_{\ell}$ narrow enough to make the residual falsifiable;
- the angle residual $\mathcal R_{04A}^{\mathrm{angle}}$ reported as a geometric diagnostic;
- a hidden-retune witness showing no direct Koide tuning;
- compatibility with `EQ-04` mass-shell response and the broader generation-mass hierarchy.

To move toward `5`, the same branch family must derive the mass triplet and the residual must become a theorem-level consequence or a stable executable residual over accepted retained rows.

## Failure Modes

| Failure code | Meaning |
| --- | --- |
| `koide.direct_fit` | The parameters are chosen by minimizing Koide rather than predicting masses first. |
| `koide.mass_scheme_ambiguous` | The packet mixes pole, rest, or running masses without declaring the scheme and scale. |
| `koide.split_generation_map` | The three charged leptons use different exposure, shielding, or Noether sea response maps. |
| `koide.quark_overreach` | The packet demands quark agreement without strong-sector contamination terms. |
| `koide.mass_shell_disconnect` | The Koide row is detached from the `EQ-04` mass-shell and internal-energy response. |
| `koide.accepted_branch_missing` | The Koide residual is evaluated before a retained charged-lepton branch family and shared mass-shell carrier are accepted. |
| `koide.error_band_too_wide` | The propagated mass uncertainty admits broad unrelated mass triples, so an apparent hit is not falsifiable. |
| `koide.invariant_overclaim` | A single frozen residual or branch-family statistic is described as a derived invariant before the generation map proves it. |

## First Concrete Artifact

Build a small fail-closed `EQ-04A` residual packet that consumes three charged-lepton masses from the same generation-by-shielding record, computes $\mathcal R_{04A}^{\mathrm{Koide}}$ and $\mathcal R_{04A}^{\mathrm{angle}}$, propagates the mass-readout uncertainty to $\cos^2\theta_{\ell}$, and always reports `no_score_increase`. Any later score movement requires a separate score review after the masses come from a declared non-Koide mass map with an accepted `EQ-04` mass-shell carrier.

The first useful result is a disciplined miss or hit. A disciplined miss weakens the idea that generation lifting alone tightly fixes the charged-lepton triplet. A disciplined hit would make Koide a strong clue that the exposure map has hidden geometric rigidity, especially if the $45^\circ$ mass-root angle is produced by branch geometry rather than by tuning the masses.

The score-neutral checker is [eq04a-koide-residual.mjs](../../../scripts/equation-mapping/eq04a-koide-residual.mjs). Its default attempt fixture [eq04a-koide-residual-attempt.v1.json](../../../scripts/equation-mapping/eq04a-koide-residual-attempt.v1.json) computes the Koide, angle, and moment-map diagnostics while inheriting the current upstream blocker `missing_accepted_raw_labeled_rows_preserved_on_retained_history`. The direct-fit negative control [eq04a-koide-residual-direct-fit-negative-control.v1.json](../../../scripts/equation-mapping/eq04a-koide-residual-direct-fit-negative-control.v1.json) must block at `koide.direct_fit` even when all carrier-looking rows are marked accepted. These fixtures change no scores; they exist to prevent a future mass-map comparison from being counted unless it is source-backed, frozen before the Koide check, and bound to the inherited mass-shell carrier.
