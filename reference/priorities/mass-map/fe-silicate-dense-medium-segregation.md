# Fe/Silicate Dense-Medium Segregation

This priority packet is a proof and replay scaffold, not reader-facing canon. It captures the dense-medium hypothesis for Earth-core iron in a form that can be derived, simulated, or falsified without turning ordinary planetary differentiation into a hidden nuclear-production claim.

## Claim Level

- **Status:** candidate sign condition with two-phase replay scaffold.
- **Main claim:** existing iron-rich metallic assemblies may have lower relative chemical and medium-response cost than silicate assemblies as normalized Noether-core density increases, after ordinary pressure, temperature, phase, and gravity terms are separated.
- **Open burden:** the sign must be derived from assembly packing, exclusion-volume response, metallic bonding, pressure response, and Noether-Sea coupling. Until that is done, the condition is a derivation target, not a theorem.
- **Promotion targets:** [Atomic Structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md) and [Condensed Matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md) after a successful proof or replay; [Pressure-Dependent Noether-Sea Constitutive Response](pressure-dependent-noether-sea-constitutive-response.md) supplies the shared pressure-response scaffold.

## Source Signals

- [Condensed Matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md) separates Earth-core iron concentration from iron-nucleus creation and states the no-new-iron guardrail $S_{\mathrm{Fe}}^{\mathrm{nuc}}=0$ for ordinary planetary differentiation.
- [Atomic Structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md) frames dense material phases through the local response record $\Theta_E^{(\ell)}$, not through a bare element label.
- [Medium Exclusion Volume](../../../content/markdown/aaa/spacetime/medium-exclusion-volume.md) distinguishes ordinary molecular or atomic exclusion from deeper Noether-Sea implementation layers.
- [Noether-Core Scaling and Packing Scaffold](../dyadic-lock/noether-core-scaling-and-packing.md) supplies the current priority-side model for packing-limited center density and oblate-envelope support-function contact.
- [Pressure-Dependent Noether-Sea Constitutive Response](pressure-dependent-noether-sea-constitutive-response.md) supplies the shared variables $n$, $\chi_{\text{sea}}$, $\Gamma_N$, $S_{ij}$, and $\mathcal{M}_{\text{sea}}^{ab}$ for pressure-sensitive matter environments.

## Claim Map

| Bucket | Candidate claim |
| --- | --- |
| Ontology | Iron and silicate phases are matter assemblies embedded in the Noether Sea; the Euclidean void is not compressed and iron nuclei are not created by the core environment. |
| Derivation/closure target | The sign of $\partial_n\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}$ should be computed from one assembly and Noether-Sea response record. |
| Effective summary | In standard language, dense iron-rich metal segregates inward during planetary differentiation because it is denser and energetically favored in the core. |
| Speculation | Metallic iron may be especially compatible with high normalized Noether-core density because its packing, bonding, and exposed mass response lower relative medium cost compared with silicate phases. |

## No-New-Iron Guardrail

Ordinary planetary differentiation should keep the iron-nucleus source term zero:

$$
\partial_t\mathcal{N}_{\mathrm{Fe}}
+\nabla\cdot\mathbf{J}_{\mathrm{Fe}}
=
S_{\mathrm{Fe}}^{\mathrm{nuc}},
\qquad
S_{\mathrm{Fe}}^{\mathrm{nuc}}=0.
$$

Here $\mathcal{N}_{\mathrm{Fe}}$ is the number density of iron nuclei and $\mathbf{J}_{\mathrm{Fe}}$ is their segregation flux. A nonzero $S_{\mathrm{Fe}}^{\mathrm{nuc}}$ would be a nuclear-reaction claim and would have to preserve proton, neutron, charge, energy, momentum, and medium-provenance ledgers. This packet does not make that claim.

## Chemical-Potential Decomposition

For a material phase $X$, separate the ordinary material contribution, the exposed mass response in the effective potential, and the native Noether-Sea medium term:

$$
\mu_X
=
\mu_X^{\mathrm{std}}(P,T,\mathcal B_X)
+
M_{\mathrm{sh}}(A_X;\theta_{\mathrm{sea}})\Phi_{\mathrm{eff}}
+
\mu_X^{\mathrm{sea}}
\left(
n,\chi_{\text{sea}},S_{ij},\mathcal{M}_{\text{sea}}^{ab},\mathcal B_X
\right).
$$

The comparison object is

$$
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
=
\mu_{\mathrm{Fe}}^{\mathrm{metal}}
-
\mu_{\mathrm{silicate}}.
$$

The dense-medium preference condition is

$$
\boxed{
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
0.
}
$$

This condition says that the iron-rich metallic branch becomes relatively cheaper as normalized Noether-core density $n=\rho_{\text{core}}/\rho_{\text{core},0}$ rises. It does not say that $n$ creates iron.

## Sufficient Sign Condition

A minimal medium-cost model is

$$
\mu_X^{\mathrm{sea}}
=
A_X
\Psi\!\left(
\frac{n}{n_{\max,X}^{\mathrm{obl}}}
\right)
-
G_X n
+
C_X^{\chi}\ln\chi_{\text{sea}}
+
C_X^{S}S_{ij}Q_X^{ij}.
$$

Here:

| Symbol | Meaning |
| --- | --- |
| $A_X$ | strength of exclusion or compression penalty for phase $X$ |
| $\Psi$ | convex penalty as local Noether-core density approaches the phase-specific packing ceiling |
| $n_{\max,X}^{\mathrm{obl}}$ | oblate-envelope packing ceiling for the local phase and orientation record |
| $G_X$ | coherent medium-coupling benefit for phase $X$ |
| $C_X^{\chi}$ | delay-factor coupling coefficient |
| $C_X^S Q_X^{ij}$ | strain-coupling record for the phase branch |

Then

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
=
\frac{A_{\mathrm{Fe}}}{n_{\max,\mathrm{Fe}}^{\mathrm{obl}}}
\Psi'\!\left(
\frac{n}{n_{\max,\mathrm{Fe}}^{\mathrm{obl}}}
\right)
-
\frac{A_{\mathrm{sil}}}{n_{\max,\mathrm{sil}}^{\mathrm{obl}}}
\Psi'\!\left(
\frac{n}{n_{\max,\mathrm{sil}}^{\mathrm{obl}}}
\right)
-
\left(
G_{\mathrm{Fe}}-G_{\mathrm{sil}}
\right)
+\mathcal{R}_{\chi S}.
$$

The sign is negative if iron's metallic branch has a larger effective packing ceiling, smaller marginal exclusion/compression penalty, stronger coherent Noether-Sea coupling benefit, or a favorable delay/strain residual compared with the silicate branch. A sufficient inequality is

$$
G_{\mathrm{Fe}}-G_{\mathrm{sil}}
>
\frac{A_{\mathrm{Fe}}}{n_{\max,\mathrm{Fe}}^{\mathrm{obl}}}
\Psi'\!\left(
\frac{n}{n_{\max,\mathrm{Fe}}^{\mathrm{obl}}}
\right)
-
\frac{A_{\mathrm{sil}}}{n_{\max,\mathrm{sil}}^{\mathrm{obl}}}
\Psi'\!\left(
\frac{n}{n_{\max,\mathrm{sil}}^{\mathrm{obl}}}
\right)
+\mathcal{R}_{\chi S}.
$$

This is the first proof target. The left side must come from assembly coupling and metallic coordination; the right side must come from packing, exclusion-volume, delay, and strain costs. If either side is inserted as a free phase label, the argument has not been derived.

## Two-Phase Replay Scaffold

The first replay should compare an iron-rich metallic phase against a declared silicate phase under matched planetary-interior state records. Let

$$
M\in\{\mathrm{Fe},\mathrm{sil}\},
\qquad
r=0,\ldots,R
$$

label material phase and pressure/density step. For each step, declare

$$
\mathbf{q}_{M,r}
=
\left(
\Delta n_{M,r},\,
\Delta\ln n_{\max,M,r}^{\mathrm{obl}},\,
\Delta\ln\chi_{\text{sea},M,r},\,
\Delta S_{\mathrm{dev},M,r},\,
\Delta P_{M,r}/K_{\text{sea}},\,
C_M Z_M^{\eta_Z}
\right)^T.
$$

The material-corrected response is

$$
y_{M,r}
=
\Delta\mu_{M,r}^{\mathrm{raw}}
-
\Delta\mu_{M,r}^{\mathrm{std}},
$$

where $\Delta\mu^{\mathrm{std}}$ contains ordinary phase, pressure, temperature, electronic, elastic, magnetic, and gravity-side corrections. The replay asks whether one shared row predicts the residual medium term:

$$
\widehat{y}_{M,r}=B_{\mathrm{seg}}\mathbf{q}_{M,r}.
$$

The dense-medium preference check is not simply a good fit. It requires the finite-difference slope

$$
\mathcal{S}_{\mathrm{Fe/sil}}
=
\frac{
\Delta\mu_{\mathrm{Fe}}^{\mathrm{sea}}(n_{r+1})
-
\Delta\mu_{\mathrm{Fe}}^{\mathrm{sea}}(n_r)
}{
n_{r+1}-n_r
}
-
\frac{
\Delta\mu_{\mathrm{sil}}^{\mathrm{sea}}(n_{r+1})
-
\Delta\mu_{\mathrm{sil}}^{\mathrm{sea}}(n_r)
}{
n_{r+1}-n_r
}
$$

to satisfy

$$
\mathcal{S}_{\mathrm{Fe/sil}}<0
$$

over the branch interval where iron-rich metallic segregation is being explained.

### Minimal Packet Fields

| Field | Meaning |
| --- | --- |
| `material_id` | `Fe_metal`, `silicate`, or a declared phase label |
| `phase_label` | crystal/melt phase, pressure range, temperature range, oxidation state, and magnetic state when relevant |
| `inventory_guardrail` | fixed $Z$, $A$, and $S_{\mathrm{Fe}}^{\mathrm{nuc}}=0$ for ordinary differentiation |
| `n_steps` | normalized Noether-core density values or increments |
| `packing_record` | $\lambda$, $\xi$, $\mathcal{O}$, $n_{\max}^{\mathrm{obl}}$, and support-function contact assumptions |
| `standard_corrections` | ordinary phase, pressure, temperature, electronic, elastic, magnetic, and gravity corrections |
| `sea_residual` | retained $\mu_X^{\mathrm{sea}}$ or residual proxy after corrections |
| `transport_record` | $\mathcal{R}_{\text{tr}}$ regime and any logged excitation, heating, or branch transition |
| `null_bounds` | bounds for hidden transmutation, drag below threshold, birefringence, dispersion, and clock/signal mismatch |

## Failure Modes

1. **Transmutation leak:** the replay requires $S_{\mathrm{Fe}}^{\mathrm{nuc}}\ne0$ without a nuclear reaction provenance ledger.
2. **Ordinary-physics absorption:** standard phase, pressure, temperature, density, and gravity terms explain the segregation with no remaining shared Noether-Sea residual. In that case the dense-medium preference becomes unnecessary.
3. **Coefficient split:** Fe and silicate require separate observable-specific rows instead of one $B_{\mathrm{seg}}$ record or a logged branch transition.
4. **Wrong sign:** $\mathcal{S}_{\mathrm{Fe/sil}}\ge0$ on the branch where the hypothesis predicts denser-medium compatibility.
5. **Transport violation:** the branch produces ordinary dissipative drag below $\mathcal{R}_{\text{tr},*}$ or sheds energy above threshold without a logged event channel.
6. **Packing shortcut:** the proof assumes $n_{\max,\mathrm{Fe}}^{\mathrm{obl}}>n_{\max,\mathrm{sil}}^{\mathrm{obl}}$ from ordinary density alone instead of deriving it from exclusion envelope, lattice, and support-function geometry.

## Executable Toy Replay Fixture

The first executable scaffold is [fe-silicate-segregation-toy.mjs](../../../scripts/mass-map/fe-silicate-segregation-toy.mjs) with mock input [fe-silicate-segregation-toy.json](../../../scripts/mass-map/fe-silicate-segregation-toy.json). Run it with:

```bash
node scripts/mass-map/fe-silicate-segregation-toy.mjs --pretty
```

The fixture computes

$$
y_{M,r}
=
\mu_{M,r}^{\mathrm{raw}}
-
\mu_{M,r}^{\mathrm{std}},
\qquad
\widehat{y}_{M,r}
=
B_{\mathrm{seg}}\mathbf q_{M,r},
$$

then tests the finite-difference sign $\mathcal{S}_{\mathrm{Fe/sil}}<0$ under one shared $B_{\mathrm{seg}}$ row. Its gates check the no-new-iron guardrail, standard-correction subtraction, matched density intervals, shared-row residual, dense-medium sign, transport threshold, null bounds, and a declared transmutation-leak failure injection.

The current mock packet is promotion-ready only as a toy scaffold. It becomes a real simulation target only after the material rows are replaced by empirical or branch-derived pressure, temperature, phase, packing, covariance, transport, and null-sector records.

## Promotion Reading

- **Promote as proof target:** if the sufficient sign inequality can be expressed entirely through branch-derived packing, coupling, delay, strain, and medium-response coefficients.
- **Promote as simulation target:** if the symbolic replay fields can be populated by a finite branch or material-state fixture with shared rows and declared null bounds.
- **Demote to standard geophysics:** if ordinary phase and density sorting explain the result with no shared Noether-Sea residual.
- **Reject:** if the explanation requires unlogged iron creation, hidden drag, or independent medium coefficients per observable.
