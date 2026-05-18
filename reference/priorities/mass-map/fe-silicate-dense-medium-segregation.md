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

A minimal medium-cost model on a matched branch interval $I$ is

$$
\mu_X^{\mathrm{sea}}
=
A_X
\Psi\!\left(
\frac{n}{n_{\max,X}^{\mathrm{obl}}(n)}
\right)
-
G_X n
+
C_X^{\chi}\ln\chi_{\text{sea}}
+
C_X^{S}S_{ij}Q_X^{ij}
+
C_X^P\Pi.
$$

Here:

| Symbol | Meaning |
| --- | --- |
| $A_X$ | strength of exclusion or compression penalty for phase $X$ |
| $\Psi$ | convex penalty as local Noether-core density approaches the phase-specific packing ceiling |
| $n_{\max,X}^{\mathrm{obl}}(n)$ | oblate-envelope packing ceiling for the local phase and orientation record, derived from support-function packing rather than ordinary density alone |
| $G_X$ | coherent medium-coupling benefit for phase $X$ |
| $C_X^{\chi}$ | delay-factor coupling coefficient |
| $C_X^S Q_X^{ij}$ | strain-coupling record for the phase branch |
| $C_X^P\Pi$ | pressure-response term after ordinary pressure, temperature, electronic, elastic, magnetic, and gravity corrections have been separated |

Assume first that $A_X$, $G_X$, $C_X^{\chi}$, $C_X^S Q_X^{ij}$, and $C_X^P$ are fixed by the declared material branch on $I$. If coefficient drift remains, bound the unmodeled derivative contribution by $|\mathcal{R}_{\mathrm{coeff}}|\le B_{\mathrm{coeff}}$. Set

$$
z_X(n)
=
\frac{n}{n_{\max,X}^{\mathrm{obl}}(n)}
$$

and define the marginal packing cost

$$
\mathcal{P}_X(n)
=
A_X
\Psi'\!\left(
z_X(n)
\right)
\frac{1}{n_{\max,X}^{\mathrm{obl}}(n)}
\left(
1
-
n\frac{\partial}{\partial n}
\ln n_{\max,X}^{\mathrm{obl}}(n)
\right)
$$

and the delay, strain, and pressure derivative term

$$
\mathcal{D}_X(n)
=
C_X^{\chi}
\frac{\partial}{\partial n}\ln\chi_{\text{sea}}
+
C_X^S Q_X^{ij}
\frac{\partial S_{ij}}{\partial n}
+
C_X^P
\frac{\partial\Pi}{\partial n}.
$$

Then the branch derivative decomposes as

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
=
\left(
\mathcal{P}_{\mathrm{Fe}}-\mathcal{P}_{\mathrm{sil}}
\right)
-
\left(
G_{\mathrm{Fe}}-G_{\mathrm{sil}}
\right)
+
\left(
\mathcal{D}_{\mathrm{Fe}}-\mathcal{D}_{\mathrm{sil}}
\right)
+
\mathcal{R}_{\mathrm{coeff}}.
$$

**Lemma: packing-coupling dense-medium preference.** If, for every $n\in I$, the metallic branch and the silicate branch use the same Noether-Sea state record and there is an $\epsilon>0$ such that

$$
G_{\mathrm{Fe}}-G_{\mathrm{sil}}
>
\left(
\mathcal{P}_{\mathrm{Fe}}-\mathcal{P}_{\mathrm{sil}}
\right)
+
\left(
\mathcal{D}_{\mathrm{Fe}}-\mathcal{D}_{\mathrm{sil}}
\right)
+
B_{\mathrm{coeff}}
+
\epsilon,
$$

then

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
-\epsilon
<
0
$$

throughout $I$. The proof is direct substitution into the derivative decomposition above. The important new term is

$$
1
-
n\frac{\partial}{\partial n}
\ln n_{\max,X}^{\mathrm{obl}}(n),
$$

which is the packing-headroom correction. If a branch raises its oblate-envelope packing ceiling as ambient normalized Noether-core density increases, its marginal exclusion penalty is reduced. If the ceiling rises too slowly, the convex packing penalty grows. The metallic Fe preference is therefore sharpened to a strict margin claim: Fe wins only when the branch-derived metallic coordination and Noether-Sea coupling benefit exceed the Fe-minus-silicate marginal packing, delay, strain, pressure, and coefficient-drift costs.

This is the first proof target. The left side must come from assembly coupling and metallic coordination; the right side must come from support-function packing, exclusion-volume response, delay, strain, pressure response, and coefficient-drift bounds. If either side is inserted as a free phase label, the argument has not been derived.

## Support-Function Packing Reduction

The packing side should now be treated as a support-function lattice-cell calculation, not as two scalar declarations. For phase $X$, start with an oblate Noether-core envelope

$$
R_{\parallel,X}=\xi_XR_{\perp,X},
\qquad
V_{\mathrm{env},X}
=
\frac{4\pi}{3}\xi_XR_{\perp,X}^3.
$$

The orientation record is

$$
\mathcal{O}_X
=
\{(\hat{\mathbf{u}}_{X,j},w_{X,j})\}_{j=1}^{J_X},
\qquad
\sum_jw_{X,j}=1,
$$

and the orientation-averaged support radius is

$$
\bar{s}_X(\hat{\mathbf{n}})
=
\sum_jw_{X,j}
\sqrt{
R_{\perp,X}^2
+
\left(R_{\parallel,X}^2-R_{\perp,X}^2\right)
(\hat{\mathbf{n}}\cdot\hat{\mathbf{u}}_{X,j})^2
}.
$$

For lattice basis directions $\hat{\mathbf{b}}_{X,i}$ and primitive-cell factor $c_{\mathrm{cell},X}$, define

$$
D_{X,i}
=
2\bar{s}_X(\hat{\mathbf{b}}_{X,i})
+
\delta_{\mathrm{wake},X}
+
\delta_{\mathrm{lat},X,i},
$$

and

$$
V_{\mathrm{cell},X}^{\mathrm{sf}}
=
c_{\mathrm{cell},X}
\left|
\det(
\hat{\mathbf{b}}_{X,1},
\hat{\mathbf{b}}_{X,2},
\hat{\mathbf{b}}_{X,3}
)
\right|
\prod_{i=1}^3D_{X,i}.
$$

The oblate packing ceiling is then bounded by

$$
\boxed{
n_{\max,X}^{\mathrm{obl}}
\le
\frac{\nu_{\mathrm{pack},0}}
{V_{\mathrm{cell},X}^{\mathrm{sf}}}.
}
$$

Equality is a replay assumption for a declared cell; the inequality is the support-function exclusion bound. A Fe metal branch can exceed a silicate branch in $n_{\max,X}^{\mathrm{obl}}$ only when its envelope, orientation, contact network, and primitive cell jointly reduce $V_{\mathrm{cell},X}^{\mathrm{sf}}$. Ordinary mass density alone is not sufficient.

In branch-normalized units the reference constants are fixed by the same-level packing scaffold:

$$
\widetilde V_{\mathrm{cell},X}^{\mathrm{sf}}
=
\rho_{\text{core},0}V_{\mathrm{cell},X}^{\mathrm{sf}},
\qquad
\nu_{\mathrm{pack},0}=1,
\qquad
V_*=1.
$$

The contact and packing benchmarks are

$$
z_*=12,
\qquad
\phi_*=\frac{\pi}{3\sqrt{2}}.
$$

Here $z_*=12$ is the three-dimensional equal-center contact bound and $\phi_*$ is the FCC/HCP equal-sphere reference fraction used as a headroom scale. These constants are no longer material-specific fixture fields.

The exclusion/compression coefficient is likewise reduced to a support-function compliance diagnostic. For retained contact network $\mathcal{K}_X=\{(\hat{\mathbf{k}}_{X,a},\omega_{X,a})\}$, set

$$
z_X^{\mathrm{eff}}=\sum_a\omega_{X,a},
$$

$$
D_X(\hat{\mathbf{k}})
=
2\bar{s}_X(\hat{\mathbf{k}})
+
\delta_{\mathrm{wake},X}
+
\delta_{\mathrm{lat},X},
$$

$$
\sigma_{\ln D,X}^2
=
\left\langle
\left(
\ln D_X-\langle\ln D_X\rangle_{\mathcal{K}_X}
\right)^2
\right\rangle_{\mathcal{K}_X},
$$

and

$$
\phi_X^{\mathrm{sf}}
=
\frac{V_{\mathrm{env},X}}
{V_{\mathrm{cell},X}^{\mathrm{sf}}},
\qquad
u_X
=
\left[
1-\frac{z_X^{\mathrm{eff}}}{z_*}
\right]_+,
\qquad
h_X
=
\left[
\frac{\phi_*-\phi_X^{\mathrm{sf}}}{\phi_*}
\right]_+.
$$

The replay input for the packing penalty becomes

$$
\boxed{
e_X^{\mathrm{sf}}
=
\left(
\frac{V_{\mathrm{cell},X}^{\mathrm{sf}}}{V_*}
\right)^{1/3}
\left(
1+w_uu_X+w_{\phi}h_X+w_{\sigma}\sigma_{\ln D,X}^2
\right).
}
$$

This formula is a constrained bound, not a final theorem: the shared weights $w_u$, $w_{\phi}$, and $w_{\sigma}$ still require a branch derivation. It is nevertheless stronger than declaring $e_X$ directly, because Fe versus silicate must now differ through support-function spacing, orientation coherence, effective coordination, and lattice-cell volume.

The pressure-modulus packet gives a sharper route to the shared weights. Let the branch-family packing stiffness decompose into the reversible channels

$$
K_{\mathrm{pack}}^{(\mathcal B)}
=
K_u^{(\mathcal B)}
+
K_{\phi}^{(\mathcal B)}
+
K_{\sigma}^{(\mathcal B)}
+
K_{\mathrm{wake}}^{\mathrm{rev},(\mathcal B)}
+
K_{\mathrm{res}}^{(\mathcal B)},
$$

where $K_u^{(\mathcal B)}$ is the contact-network coordination stiffness, $K_{\phi}^{(\mathcal B)}$ is the volume/packing-fraction stiffness, $K_{\sigma}^{(\mathcal B)}$ is the contact-spacing anisotropy stiffness, $K_{\mathrm{wake}}^{\mathrm{rev},(\mathcal B)}$ is reversible wake-return stiffness, and $K_{\mathrm{res}}^{(\mathcal B)}$ is any retained positive stiffness not represented by $u_X$, $h_X$, or $\sigma_{\ln D,X}^2$. The shared compliance weights are then the stiffness shares

$$
\boxed{
w_u
=
\frac{K_u^{(\mathcal B)}}{K_{\mathrm{pack}}^{(\mathcal B)}},
\qquad
w_{\phi}
=
\frac{K_{\phi}^{(\mathcal B)}}{K_{\mathrm{pack}}^{(\mathcal B)}},
\qquad
w_{\sigma}
=
\frac{K_{\sigma}^{(\mathcal B)}}{K_{\mathrm{pack}}^{(\mathcal B)}}.
}
$$

This immediately implies

$$
0\le w_u,w_{\phi},w_{\sigma}\le1,
\qquad
w_u+w_{\phi}+w_{\sigma}\le1.
$$

The inequality is strict when reversible wake stiffness or residual positive stiffness carries part of the packing response. A sign reversal, weight larger than one, or material-specific weight row would therefore be a coefficient-split failure unless a branch transition is logged. Until the branch Hessian and contact-network stiffnesses are available, the executable replay may keep the conservative unit-bounded values, but those values are now placeholders for stiffness shares rather than free fit knobs.

### Fe/Silicate Executable Packing Records

The current Fe/silicate replay uses a bounded packing record

$$
\mathfrak{P}_X
=
\left(
F_X,\mathcal{O}_X,\mathcal{L}_X,\mathcal{K}_X,
\phi_X^{\mathrm{target}}
\right)
$$

instead of declaring $e_X$ or $n_{\max,X}^{\mathrm{obl}}$ directly. The oblate-envelope part is reduced through singular values of the branch deformation record:

$$
\lambda_{\perp,X}
=
\sqrt{\lambda_{\perp,1,X}\lambda_{\perp,2,X}},
\qquad
\xi_X
=
\frac{\lambda_{\parallel,X}}{\lambda_{\perp,X}},
\qquad
0<\xi_X\le1.
$$

The executable packet now uses the finite-$\eta$ closed-return branch constraint

$$
\lambda_{\parallel,X}
=
\lambda_{\perp,X}\sqrt{1-\beta_X^2},
\qquad
\xi_X
=
\sqrt{1-\beta_X^2},
$$

with any finite-regularization or preferred-frame leakage retained as an explicit residual bound. The dyadic-lock identities constrain layer frequencies and radii, but they do not select $\beta_X$ by themselves; the replay must therefore declare the branch-speed assumption until a finite-$\eta$ return map supplies it.

For the Fe metal branch assumption, the executable packet sets

$$
\beta_{\mathrm{Fe}}
=
\frac{2}{3},
\qquad
\lambda_{\perp,1,\mathrm{Fe}}
=
\lambda_{\perp,2,\mathrm{Fe}}
=1,
\qquad
\lambda_{\parallel,\mathrm{Fe}}
=
\frac{\sqrt{5}}{3},
\qquad
\xi_{\mathrm{Fe}}
=
\frac{\sqrt{5}}{3}
\approx0.745,
$$

with coherent single-axis orientation record

$$
\mathcal{O}_{\mathrm{Fe}}
=
\{(\hat{\mathbf{e}}_3,1)\},
$$

principal-axis lattice basis, twelve-contact FCC/HCP cuboctahedral contact family, and $\phi_{\mathrm{Fe}}^{\mathrm{target}}\approx0.716$.

For the silicate comparison branch assumption, the executable packet sets

$$
\beta_{\mathrm{sil}}
=
\frac{1}{2},
\qquad
\lambda_{\perp,1,\mathrm{sil}}
=
\lambda_{\perp,2,\mathrm{sil}}
=1,
\qquad
\lambda_{\parallel,\mathrm{sil}}
=
\frac{\sqrt{3}}{2},
\qquad
\xi_{\mathrm{sil}}
=
\frac{\sqrt{3}}{2}
\approx0.866,
$$

with orthogonal isotropic orientation record,

$$
\mathcal{O}_{\mathrm{sil}}
=
\left\{
(\hat{\mathbf{e}}_1,1/3),
(\hat{\mathbf{e}}_2,1/3),
(\hat{\mathbf{e}}_3,1/3)
\right\},
$$

principal-axis lattice basis, four-contact tetrahedral contact family, and $\phi_{\mathrm{sil}}^{\mathrm{target}}\approx0.599$.

With $R_{\perp,X}=0.5$ and $\nu_{\mathrm{pack},0}=1$, the baseline ceiling calculation is

$$
n_{\max,X,0}^{\mathrm{obl}}
\le
\frac{\phi_X^{\mathrm{target}}}
{(4\pi/3)\xi_XR_{\perp,X}^3}.
$$

The executable packet uses equality as its declared lattice-cell replay assumption, yielding

$$
n_{\max,\mathrm{Fe},0}^{\mathrm{obl}}\approx1.835,
\qquad
n_{\max,\mathrm{sil},0}^{\mathrm{obl}}\approx1.321.
$$

The same support-function records give

$$
e_{\mathrm{Fe}}^{\mathrm{sf}}\approx0.833,
\qquad
e_{\mathrm{sil}}^{\mathrm{sf}}\approx1.181.
$$

These numbers remain finite-$\eta$ branch assumptions, not empirical geophysics and not certified Noether-core branch constants. The advancement is that changing $F_X$, $\mathcal{O}_X$, $\mathcal{L}_X$, $\mathcal{K}_X$, or $\phi_X^{\mathrm{target}}$ now changes both the packing ceiling and the exclusion/compression coefficient through the same support-function formulas. The remaining deformation proof obligation is to replace $\beta_{\mathrm{Fe}}=2/3$ and $\beta_{\mathrm{sil}}=1/2$ with branch-certified speeds or intervals and to carry the residual bound

$$
\left|
\xi_X-\sqrt{1-\beta_X^2}
\right|
\le
\epsilon_{\eta,X}
+
\epsilon_{\mathrm{LV},X}
$$

through the support-function replay.

If the finite-$\eta$ branch calculation supplies only intervals for $\beta_{\mathrm{Fe}}$ and $\beta_{\mathrm{sil}}$, the replay should be demoted to a bound-only result unless $\mathcal{S}_{\mathrm{Fe/sil}}<0$ holds over the full induced interval for $F_X$, $e_X^{\mathrm{sf}}$, and $n_{\max,X}^{\mathrm{obl}}$. Exact promotion requires the return map to certify the two branch speeds, the regularized residual $\epsilon_{\eta,X}$, the preferred-frame leakage residual $\epsilon_{\mathrm{LV},X}$, and the orientation/contact records used by the support-function calculation.

## Coefficient-Derivation Replay

The toy replay should no longer treat $B_{\mathrm{seg}}$ as a free row when the target is proof-route advancement. A coefficient-derived replay first declares branch ingredients for each material phase $X$ and computes the cost coefficients from them:

$$
A_X
=
a_0 e_X^{\mathrm{sf}},
$$

$$
G_X
=
g_0
\left(
w_Z H_X
+
w_B B_X
+
w_U U_X
\right),
$$

$$
C_X^{\chi}=d_X,
\qquad
C_X^S Q_X^{\mathrm{dev}}=s_X,
\qquad
C_X^P=p_0 p_X.
$$

The heavy/coordinated loading term is

$$
H_X
=
\left\langle
C_A
\left(
\frac{Z_A}{Z_*}
\right)^{\eta_Z}
\right\rangle_{A\in\mathcal{C}_X},
$$

where $\mathcal{C}_X$ is the declared material cell. For a pure metallic Fe toy cell this can reduce to the Fe entry; for a silicate cell it must remain a phase average over the stated constituent mix.

Here $e_X^{\mathrm{sf}}$ is the support-function packing-compliance input derived or bounded above, $H_X$ is the heavy/coordinated assembly loading term, $B_X$ is the bonding-corridor coherence term, $U_X$ is the local alignment term, $d_X$ is the delay coupling, $s_X$ is the branch-projected strain coupling, and $p_X$ is the pressure-response factor. For a silicate branch, $H_X$ must be a material-cell average over the declared phase, not an element-name shortcut.

For pressure/density step $r$,

$$
n_{\max,X,r}^{\mathrm{obl}}
=
\frac{\nu_{\mathrm{pack},0}}
{V_{\mathrm{cell},X,r}^{\mathrm{sf}}},
\qquad
\Delta\ln n_{\max,X,r}^{\mathrm{obl}}
=
\ln
\frac{
V_{\mathrm{cell},X,0}^{\mathrm{sf}}
}{
V_{\mathrm{cell},X,r}^{\mathrm{sf}}
}.
$$

The branch-derived medium residual is then

$$
\widehat y_{X,r}
=
\mu_{X,r}^{\mathrm{sea}}
-
\mu_{X,0}^{\mathrm{sea}},
$$

with

$$
\mu_{X,r}^{\mathrm{sea}}
=
A_X
\Psi\!\left(
\frac{n_r}{n_{\max,X,r}^{\mathrm{obl}}}
\right)
-
G_X n_r
+
C_X^{\chi}\ln\chi_{\text{sea},r}
+
C_X^S Q_X^{\mathrm{dev}}S_{\mathrm{dev},r}
+
C_X^P\Pi_r.
$$

The sign test becomes a component ledger:

$$
\mathcal{S}_{\mathrm{Fe/sil}}
=
\mathcal{S}_{\mathrm{pack}}
+
\mathcal{S}_{G}
+
\mathcal{S}_{\chi}
+
\mathcal{S}_{S}
+
\mathcal{S}_{P}
<
0.
$$

The finite-difference packing term is the replay counterpart of $\mathcal{P}_X(n)$. On interval $r\to r+1$ it must compute

$$
\mathcal{S}_{\mathrm{pack},r}
=
\frac{
A_{\mathrm{Fe}}
\left[
\Psi\!\left(
\frac{n_{r+1}}{n_{\max,\mathrm{Fe},r+1}^{\mathrm{obl}}}
\right)
-
\Psi\!\left(
\frac{n_r}{n_{\max,\mathrm{Fe},r}^{\mathrm{obl}}}
\right)
\right]
-
A_{\mathrm{sil}}
\left[
\Psi\!\left(
\frac{n_{r+1}}{n_{\max,\mathrm{sil},r+1}^{\mathrm{obl}}}
\right)
-
\Psi\!\left(
\frac{n_r}{n_{\max,\mathrm{sil},r}^{\mathrm{obl}}}
\right)
\right]
}{
n_{r+1}-n_r
}.
$$

Thus $\Delta\ln n_{\max,X,r}^{\mathrm{obl}}$ is not a cosmetic fixture field. It is the falsifiable packing-headroom input: changing it changes the sign through the same derivative channel as the support-function packing proof.

The replay is a branch-derived success only if the same coefficient functional produces both material residuals and this component sum. The current finite-$\eta$ witness fixture has $\mathcal{S}_{\mathrm{Fe/sil}}\approx-0.162$ on the first interval and $\mathcal{S}_{\mathrm{Fe/sil}}\approx-0.182$ on the second. In that fixture the dominant signs come from a support-function-derived lower Fe packing penalty and higher Fe coherent-coupling benefit:

| Component | First interval $\mathcal{S}_{\mathrm{Fe/sil}}$ | Second interval $\mathcal{S}_{\mathrm{Fe/sil}}$ | Reading |
| --- | ---: | ---: | --- |
| Packing | $-0.114$ | $-0.135$ | Fe has more packing headroom and a smaller marginal exclusion cost from the support-function lattice-cell record. |
| Coherent coupling | $-0.046$ | $-0.046$ | Fe's metallic branch has stronger coordinated medium-coupling benefit. |
| Delay | $-0.0002$ | $-0.0002$ | Delay coupling mildly favors Fe in this declared branch. |
| Strain | $-0.0009$ | $-0.0009$ | Deviatoric strain response mildly favors Fe. |
| Pressure | $0$ | $0$ | Pressure is neutral in the current witness so it cannot carry the result. |

The same fixture derives $e_{\mathrm{Fe}}^{\mathrm{sf}}\approx0.833$, $e_{\mathrm{sil}}^{\mathrm{sf}}\approx1.181$, $n_{\max,\mathrm{Fe},0}^{\mathrm{obl}}\approx1.835$, and $n_{\max,\mathrm{sil},0}^{\mathrm{obl}}\approx1.321$ from its support-function packing records while taking $\nu_{\mathrm{pack},0}=1$, $V_*=1$, $z_*=12$, and $\phi_*=\pi/(3\sqrt{2})$ from the branch-normalized support-function scaffold. These values remain finite-$\eta$ branch assumptions, but they are no longer independent scalar knobs or raw singular-value mocks.

The important advancement is not the numerical values; they remain branch-assumption inputs. The advancement is the failure-sensitive form: if any future replay changes the branch ingredients and the component ledger no longer sums negative, the dense-medium preference is not derived for that branch.

## Two-Phase Replay Scaffold

The first replay should compare an iron-rich metallic phase against a declared silicate phase under matched planetary-interior state records. Let

$$
M\in\{\mathrm{Fe},\mathrm{sil}\},
\qquad
r=0,\ldots,R
$$

label material phase and pressure/density step. For a shared-row replay, declare

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

For the coefficient-derived replay, $\Delta\ln n_{\max,M,r}^{\mathrm{obl}}$ should instead be computed from `packing_record` and `packing_update` as the lattice-cell volume ratio above.

The material-corrected response is

$$
y_{M,r}
=
\Delta\mu_{M,r}^{\mathrm{raw}}
-
\Delta\mu_{M,r}^{\mathrm{std}},
$$

where $\Delta\mu^{\mathrm{std}}$ contains ordinary phase, pressure, temperature, electronic, elastic, magnetic, and gravity-side corrections. The initial fitted scaffold asks whether one shared row predicts the residual medium term:

$$
\widehat{y}_{M,r}=B_{\mathrm{seg}}\mathbf{q}_{M,r}.
$$

The stronger coefficient-derived replay replaces the free row by the coefficient functional above:

$$
\widehat{y}_{M,r}
=
\mu_{M,r}^{\mathrm{sea}}
-
\mu_{M,0}^{\mathrm{sea}}.
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
| `packing_record` | oblate-envelope `deformation_branch`, deformation singular values, or constrained $\xi$, plus $\mathcal{O}$, support-function contact network, and lattice-cell assumptions used to derive $n_{\max}^{\mathrm{obl}}$ |
| `standard_corrections` | ordinary phase, pressure, temperature, electronic, elastic, magnetic, and gravity corrections |
| `sea_residual` | retained $\mu_X^{\mathrm{sea}}$ or residual proxy after corrections |
| `coefficient_model` | declared $a_0$, $g_0$, $p_0$, $w_Z$, $w_B$, $w_U$, and $\Psi$ used to derive, not fit, the residual row |
| `coefficient_inputs` | phase-specific `packing_record`, $H_X$, $B_X$, $U_X$, $d_X$, $s_X$, and $p_X$ inputs; $e_X^{\mathrm{sf}}$ and $n_{\max,X}^{\mathrm{obl}}$ are derived from `packing_record` |
| `transport_record` | $\mathcal{R}_{\text{tr}}$ regime and any logged excitation, heating, or branch transition |
| `null_bounds` | bounds for hidden transmutation, drag below threshold, birefringence, dispersion, and clock/signal mismatch |

## Failure Modes

1. **Transmutation leak:** the replay requires $S_{\mathrm{Fe}}^{\mathrm{nuc}}\ne0$ without a nuclear reaction provenance ledger.
2. **Ordinary-physics absorption:** standard phase, pressure, temperature, density, and gravity terms explain the segregation with no remaining shared Noether-Sea residual. In that case the dense-medium preference becomes unnecessary.
3. **Coefficient split:** Fe and silicate require separate observable-specific rows instead of one $B_{\mathrm{seg}}$ record or a logged branch transition.
4. **Wrong sign:** $\mathcal{S}_{\mathrm{Fe/sil}}\ge0$ on the branch where the hypothesis predicts denser-medium compatibility.
5. **Transport violation:** the branch produces ordinary dissipative drag below $\mathcal{R}_{\text{tr},*}$ or sheds energy above threshold without a logged event channel.
6. **Packing shortcut:** the proof assumes $n_{\max,\mathrm{Fe}}^{\mathrm{obl}}>n_{\max,\mathrm{sil}}^{\mathrm{obl}}$ from ordinary density alone instead of deriving it from exclusion envelope, lattice, and support-function geometry.
7. **Coefficient insertion:** the replay chooses $A_X$, $G_X$, $C_X^{\chi}$, $C_X^S Q_X^{\mathrm{dev}}$, or $C_X^P$ directly to force the sign instead of deriving them from the declared branch ingredients.
8. **Packing-bound violation:** the replay uses $\xi_X>1$ in an oblate branch, $z_X^{\mathrm{eff}}>12$ in the same-level contact proxy, $\phi_X^{\mathrm{sf}}>1$, or compliance weights outside $[0,1]$ without a branch-response derivation.

## Executable Toy Replay Fixture

The first executable scaffold is [fe-silicate-segregation-toy.mjs](../../../scripts/mass-map/fe-silicate-segregation-toy.mjs) with finite-$\eta$ branch-assumption input [fe-silicate-segregation-toy.json](../../../scripts/mass-map/fe-silicate-segregation-toy.json). Run it with:

```bash
node scripts/mass-map/fe-silicate-segregation-toy.mjs --pretty
```

The fixture now computes

$$
y_{M,r}
=
\mu_{M,r}^{\mathrm{raw}}
-
\mu_{M,r}^{\mathrm{std}},
\qquad
\widehat{y}_{M,r}
=
\mu_{M,r}^{\mathrm{sea}}
-
\mu_{M,0}^{\mathrm{sea}},
$$

where $\mu^{\mathrm{sea}}$ is generated from the coefficient model above. The fixture now derives $e_X^{\mathrm{sf}}$, $n_{\max,X,0}^{\mathrm{obl}}$, and $\Delta\ln n_{\max,X,r}^{\mathrm{obl}}$ from each material `packing_record` and step `packing_update`, while the runner supplies the branch-normalized defaults $\nu_{\mathrm{pack},0}=1$, $V_*=1$, $z_*=12$, and $\phi_*=\pi/(3\sqrt{2})$. It then tests the finite-difference sign $\mathcal{S}_{\mathrm{Fe/sil}}<0$ and records the packing, coherent-coupling, delay, strain, and pressure contributions. Its gates check the no-new-iron guardrail, standard-correction subtraction, matched density intervals, derived-model residual, dense-medium sign, transport threshold, null bounds, and a declared transmutation-leak failure injection.

The executable packing fields now use `oblate_envelope.deformation_branch` to derive $\xi_X$ from $\sqrt{1-\beta_X^2}$, `orientation_record.kind` for `single_axis` or `orthogonal_isotropic`, `lattice_cell.basis_family` for the principal-axis lattice, `lattice_cell.packing_fraction_target` to derive `cell_volume_factor`, and `contact_network.family` for `fcc_12` or `tetrahedral_4`. Direct scalar declarations of `exclusion_penalty` and `n_max_obl_ref` are not accepted inputs in the coefficient-derived path.

The current finite-$\eta$ branch-assumption packet is promotion-ready only as a toy scaffold. It becomes a real simulation target only after the remaining coefficient inputs are replaced by empirical or branch-derived pressure, temperature, phase, packing, covariance, transport, and null-sector records.

## Promotion Reading

- **Promote as proof target:** if the sufficient sign inequality can be expressed entirely through branch-derived packing, coupling, delay, strain, and medium-response coefficients.
- **Promote as simulation target:** if the symbolic replay fields can be populated by a finite branch or material-state fixture with shared rows and declared null bounds.
- **Demote to standard geophysics:** if ordinary phase and density sorting explain the result with no shared Noether-Sea residual.
- **Reject:** if the explanation requires unlogged iron creation, hidden drag, or independent medium coefficients per observable.
