# Fe/Cr Toy Pressure Replay

This priority packet is a toy replay report, not empirical material evidence and not reader-facing canon. It checks that the two-material pressure scaffold in [Pressure-Dependent Noether-Sea Constitutive Response](pressure-dependent-noether-sea-constitutive-response.md) has enough structure to produce a shared-row residual test for a heavy metallic pressure case and a lighter neighboring-metal control.

## Claim Level

- **Status:** toy-generated replay packet.
- **Main claim:** a weak, branch-preserving Fe/Cr replay can be represented by one pressure-response row when the material-dependent saturation factor is declared before fitting.
- **Open burden:** real Fe/Cr, Ni/Co, or other metallic-lattice data must supply pressure steps, phase state, magnetic state, strain tensors, ordinary condensed-matter corrections, covariance estimates, and null-sector bounds. This packet does not satisfy that burden.
- **Promotion target:** none until a real replay produces a residual result that survives ordinary electronic, magnetic, thermal, and elastic correction.

## Toy Inputs

Use the bcc transition-metal comparison labels

$$
H=\mathrm{Fe},
\qquad
L=\mathrm{Cr},
$$

with the weak-pressure reference choices

| Material $M$ | $Z_M$ | $C_M$ | $1-\bar n_M/\bar n_{\max,M}^{\mathrm{obl}}$ | $\Delta P_{\mathrm{ext}}/K_{\text{sea}}$ steps | $\Delta\Pi^{\parallel-\perp}$ steps |
| --- | ---: | ---: | ---: | --- | --- |
| $\mathrm{Fe}$ | $26$ | $1.00$ | $0.91$ | $0,0.01,0.02$ | $0,0.0012,0.0024$ |
| $\mathrm{Cr}$ | $24$ | $0.92$ | $0.94$ | $0,0.01,0.02$ | $0,0.0010,0.0020$ |

Set

$$
Z_*=26,
\qquad
\eta_Z=1,
\qquad
\frac{K_{\text{sea},L}}{K_{\text{sea},H}}=1.
$$

For this weak replay, hold the saturation factor fixed over the two nonzero pressure increments and form the scalar pressure coordinate

$$
\Theta_{M,r}
=
C_M
\left(\frac{Z_M}{Z_*}\right)^{\eta_Z}
\left(1-\frac{\bar n_M}{\bar n_{\max,M}^{\mathrm{obl}}}\right)
\frac{\Delta P_{\mathrm{ext},M,r}}{K_{\text{sea}}}.
$$

This is the local linearization of the pressure scaffold around the declared material state. A real broad-range replay should keep $\Delta\Pi_{M,r}$, $\Delta\ln n_{\max,M,r}^{\mathrm{obl}}$, and the heavy-scaling entry separate, or add an explicitly declared interaction coordinate if the saturation factor changes appreciably across the pressure range.

## Shared Toy Row

Let the material-corrected residual vector be

$$
\mathbf{y}_{M,r}
=
\left(
\delta\ln\Gamma_N,\,
\delta\ln\chi_{\text{sea}},\,
\delta\ln(c_{\text{eff}}/c_f),\,
\delta\mathcal{M}_{0},\,
\delta\mathcal{M}_{2},\,
\delta S_{\mathrm{dev}}
\right)^T_{M,r}.
$$

Generate the toy replay by one shared row pair:

$$
\mathbf{y}_{M,r}^{\mathrm{toy}}
=
\Theta_{M,r}
\left(
0.60,\,
0.36,\,
-0.36,\,
0.72,\,
0.08,\,
0.05
\right)^T
+
\Delta\Pi_{M,r}^{\parallel-\perp}
\left(
0,\,
0.04,\,
-0.04,\,
0.02,\,
0.10,\,
0.12
\right)^T.
$$

The opposite signs in $\delta\ln\chi_{\text{sea}}$ and $\delta\ln(c_{\text{eff}}/c_f)$ enforce the local identity $c_{\text{eff}}=c_f/\chi_{\text{sea}}$ at first order. The small directional row tests whether the replay can carry anisotropic pressure without refitting a separate material law.

## Generated Replay Table

The nonzero toy residuals are:

| Material | Step | $\Theta_{M,r}$ | $\Delta\Pi^{\parallel-\perp}_{M,r}$ | $\delta\ln\Gamma_N$ | $\delta\ln\chi_{\text{sea}}$ | $\delta\ln(c_{\text{eff}}/c_f)$ | $\delta\mathcal{M}_0$ | $\delta\mathcal{M}_2$ | $\delta S_{\mathrm{dev}}$ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $\mathrm{Fe}$ | $1$ | $0.009100$ | $0.001200$ | $0.005460$ | $0.003324$ | $-0.003324$ | $0.006576$ | $0.000848$ | $0.000599$ |
| $\mathrm{Fe}$ | $2$ | $0.018200$ | $0.002400$ | $0.010920$ | $0.006648$ | $-0.006648$ | $0.013152$ | $0.001696$ | $0.001198$ |
| $\mathrm{Cr}$ | $1$ | $0.007983$ | $0.001000$ | $0.004790$ | $0.002914$ | $-0.002914$ | $0.005768$ | $0.000739$ | $0.000519$ |
| $\mathrm{Cr}$ | $2$ | $0.015966$ | $0.002000$ | $0.009579$ | $0.005828$ | $-0.005828$ | $0.011535$ | $0.001477$ | $0.001038$ |

Because the table is generated from one declared row pair,

$$
\mathcal{R}_{\mathrm{row}}=0,
\qquad
\mathcal{R}_{\mathrm{sep}}=0,
\qquad
\mathcal{R}_{\mathrm{split}}=0,
\qquad
\mathcal{R}_{\mathrm{null}}^{P}=0
$$

by construction. This is a scaffold-shape pass only. It does not count as a pressure-response validation.

## Heavy/Control Slope Check

The weak cadence-channel heavy/control scaling gives

$$
\mathcal{A}_{\Gamma}^{\mathrm{Fe/Cr}}
\approx
\frac{
C_{\mathrm{Fe}}Z_{\mathrm{Fe}}^{\eta_Z}
\left(1-\bar n_{\mathrm{Fe}}/\bar n_{\max,\mathrm{Fe}}^{\mathrm{obl}}\right)
}{
C_{\mathrm{Cr}}Z_{\mathrm{Cr}}^{\eta_Z}
\left(1-\bar n_{\mathrm{Cr}}/\bar n_{\max,\mathrm{Cr}}^{\mathrm{obl}}\right)
}
\cdot
\frac{K_{\text{sea},\mathrm{Cr}}}{K_{\text{sea},\mathrm{Fe}}}
\approx
1.140.
$$

The same ratio appears for the isotropic contribution to $\delta\ln\chi_{\text{sea}}$, $\delta\ln(c_{\text{eff}}/c_f)$, and $\delta\mathcal{M}_0$ because the toy row shares one $\Theta_{M,r}$ coefficient. The anisotropic entries depart slightly according to the declared $\Delta\Pi^{\parallel-\perp}$ steps, not according to a material-specific row.

## Static Response Vector Handoff

The Fe/Cr toy row can now be replayed by the static response vector fixture after projecting out anisotropic pressure. For the isotropic part of the toy row,

$$
\delta\ln\Gamma_N^{\mathrm{iso}}
=
0.60\,\Theta_{M,r},
\qquad
\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}
=
0.36\,\Theta_{M,r}.
$$

If this pressure response is normalized by the cadence shift, the static-equivalent pressure vector has

$$
a_\chi^{P\to\Gamma}
=
\frac{
\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}
}{
\delta\ln\Gamma_N^{\mathrm{iso}}
}
=
0.6.
$$

A minimal chi-only cadence row then uses

$$
b_\chi^{P\to\Gamma}
=
\frac{
\delta\ln\Gamma_N^{\mathrm{iso}}
}{
\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}
}
=
\frac{5}{3},
\qquad
\omega_\chi^{P\to\Gamma}=-\frac{5}{3},
$$

so the pressure bridge closes

$$
b_\chi^{P\to\Gamma}a_\chi^{P\to\Gamma}=1,
\qquad
\omega_\chi^{P\to\Gamma}a_\chi^{P\to\Gamma}=-1.
$$

This is a pressure-normalized arithmetic bridge, not a PPN interpretation. If one formally compares $a_\chi^{P\to\Gamma}=0.6$ against $a_\chi^{\mathrm{sig}}=1+\gamma_{\text{eff}}$, the matching algebraic value would be $\gamma_{\text{eff}}=-0.4$, which is not the GR-matching Shapiro branch. The point of the handoff is therefore narrower: pressure data can now feed the same $\Gamma_N$ row checker, while anisotropic pressure remains a separate residual and gravitational shared-delay closure remains separately tested.

The executable mock row is `pressure_bridge_fe_cr_toy_isotropic_projection` in `scripts/spacetime/static-response-vector-mock.json`, replayed by `scripts/spacetime/static-response-vector-toy-model.mjs`.

## Shared Constitutive Row Compatibility Lemma

The toy handoff now gives one concrete falsification condition for a single isotropic Noether-Sea cadence row. Let the weak gravitational endpoint record after shared-delay closure be

$$
\mathbf{a}^{G}
=
\left(
a_n^{G},\,
1+\gamma_{\text{eff}},\,
a_\lambda^{G},\,
a_R^{G}
\right)^T,
$$

and let the pressure-normalized isotropic record be

$$
\mathbf{a}^{P\to\Gamma}
=
\frac{
\delta\mathbf{g}^{P,\mathrm{iso}}
}{
\delta\ln\Gamma_N^{P,\mathrm{iso}}
}
=
\left(
a_n^{P\to\Gamma},\,
a_\chi^{P\to\Gamma},\,
a_\lambda^{P\to\Gamma},\,
a_R^{P\to\Gamma}
\right)^T.
$$

A shared isotropic row

$$
\mathbf{b}
=
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)^T
$$

is admissible only if the same coefficients satisfy

$$
\begin{pmatrix}
\left(\mathbf{a}^{G}\right)^T\\
\left(\mathbf{a}^{P\to\Gamma}\right)^T
\end{pmatrix}
\mathbf{b}
=
\begin{pmatrix}
1\\
1
\end{pmatrix},
\qquad
\omega_i=-b_i
\quad
\text{for}\quad
i\in\{n,\chi,\lambda,R\}.
$$

In the chi-only subclass this reduces to

$$
b_\chi(1+\gamma_{\text{eff}})=1,
\qquad
b_\chi a_\chi^{P\to\Gamma}=1,
$$

so consistency requires

$$
a_\chi^{P\to\Gamma}=1+\gamma_{\text{eff}}.
$$

The current toy pressure projection has $a_\chi^{P\to\Gamma}=0.6$, while the GR-matching Shapiro branch has $1+\gamma_{\text{eff}}=2$. Therefore the chi-only shared row is falsified by the toy packet:

$$
\Delta_{\chi\text{-only}}^{\mathrm{shared}}
=
a_\chi^{P\to\Gamma}
-
(1+\gamma_{\text{eff}})
=
-1.4
\ne 0.
$$

This does not falsify a broader shared row. It creates a proof obligation for non-$\chi_{\text{sea}}$ isotropic response. If the gravitational branch keeps the clean GR value $b_\chi=1/(1+\gamma_{\text{eff}})=1/2$, then the pressure record must supply

$$
b_n a_n^{P\to\Gamma}
+b_\lambda a_\lambda^{P\to\Gamma}
+b_R a_R^{P\to\Gamma}
=
1-\frac{a_\chi^{P\to\Gamma}}{1+\gamma_{\text{eff}}}
=
0.7
$$

for the toy pressure number. The corresponding gravitational non-$\chi_{\text{sea}}$ projection must still satisfy

$$
b_n a_n^{G}
+b_\lambda a_\lambda^{G}
+b_R a_R^{G}
=
0
$$

in the same clean weak-field branch. Any future claim of one shared row must therefore either derive this compensating density, scale, or core-radius contribution from Noether-Sea constitutive response, or accept the chi-only falsification above.

The minimal compensation problem can be stated without adding a new fixture. Define the non-$\chi_{\text{sea}}$ vectors

$$
\mathbf{u}^{G}
=
\left(
a_n^{G},\,
a_\lambda^{G},\,
a_R^{G}
\right)^T,
\qquad
\mathbf{u}^{P}
=
\left(
a_n^{P\to\Gamma},\,
a_\lambda^{P\to\Gamma},\,
a_R^{P\to\Gamma}
\right)^T,
$$

and the non-$\chi_{\text{sea}}$ coefficient row

$$
\mathbf{c}
=
\left(
b_n,\,
b_\lambda,\,
b_R
\right)^T.
$$

In the clean-delay anchored subclass, where $b_\chi=1/(1+\gamma_{\text{eff}})$, the compensation target is

$$
\mathbf{c}\cdot\mathbf{u}^{G}=0,
\qquad
\mathbf{c}\cdot\mathbf{u}^{P}
=
\eta_P,
\qquad
\eta_P
\equiv
1-\frac{a_\chi^{P\to\Gamma}}{1+\gamma_{\text{eff}}}.
$$

For the toy pressure number, $\eta_P=0.7$. The minimal Euclidean-norm compensation row exists only if the pressure non-$\chi_{\text{sea}}$ vector has a component outside the gravitational non-$\chi_{\text{sea}}$ projection. Let

$$
\mathbf{u}^{P}_{\perp G}
=
\begin{cases}
\mathbf{u}^{P}
-
\dfrac{\mathbf{u}^{P}\cdot\mathbf{u}^{G}}
{\left\|\mathbf{u}^{G}\right\|^2}
\mathbf{u}^{G},
&
\left\|\mathbf{u}^{G}\right\|>0,
\\[8pt]
\mathbf{u}^{P},
&
\left\|\mathbf{u}^{G}\right\|=0.
\end{cases}
$$

Then the minimal candidate is

$$
\mathbf{c}_{\min}
=
\frac{\eta_P}{\left\|\mathbf{u}^{P}_{\perp G}\right\|^2}
\mathbf{u}^{P}_{\perp G},
\qquad
\left\|\mathbf{u}^{P}_{\perp G}\right\|>0.
$$

If $\left\|\mathbf{u}^{P}_{\perp G}\right\|=0$ while $\eta_P\ne0$, the clean-delay anchored shared row is falsified at the isotropic scalar level. This is the current status of the executable toy fixture: its declared isotropic pressure deltas include only $\delta\ln\chi_{\text{sea}}$, so $\mathbf{u}^{P}=\mathbf{0}$ and no non-$\chi_{\text{sea}}$ compensation row can be derived from that packet. A future broader-row attempt must therefore supply at least one nonzero isotropic pressure delta in $n$, $\lambda$, or $R_{\text{core}}$, and it must remain separated from the anisotropic pressure residuals.

The one-coordinate candidates are immediate corollaries. A density-only repair requires

$$
a_n^{G}=0,
\qquad
a_n^{P\to\Gamma}\ne0,
\qquad
b_n=\frac{\eta_P}{a_n^{P\to\Gamma}},
$$

with analogous formulas for $\lambda$ and $R_{\text{core}}$. If the selected coordinate has nonzero gravitational projection, it cannot both preserve the clean gravitational row and repair the pressure row by itself.

The pressure-dependent constitutive scaffold supplies the first candidate source for $\mathbf{u}^{P}$. In a weak isotropic pressure segment, write the pressure-coordinate slopes as

$$
\delta\ln n
=
\kappa_n^{P}\Theta,
\qquad
\delta\ln\lambda
=
-\kappa_\lambda^{P}\Theta,
\qquad
\delta\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
=
\kappa_R^{P}\Theta,
$$

where $\Theta$ is the material-corrected scalar pressure coordinate already used by the toy packet. The toy cadence and delay slopes are

$$
G_\Gamma
\equiv
\frac{\delta\ln\Gamma_N^{\mathrm{iso}}}{\Theta}
=
0.60,
\qquad
G_\chi
\equiv
\frac{\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}}{\Theta}
=
0.36.
$$

The pressure-normalized non-$\chi_{\text{sea}}$ vector would then be

$$
\mathbf{u}^{P}
=
\frac{1}{G_\Gamma}
\left(
\kappa_n^{P},\,
-\kappa_\lambda^{P},\,
\kappa_R^{P}
\right)^T.
$$

Thus the current toy fixture corresponds to the special undeclared case

$$
\kappa_n^{P}
=
\kappa_\lambda^{P}
=
\kappa_R^{P}
=
0,
$$

which is why the clean-delay anchored shared row remains falsified inside that executable packet.

The broader candidate is not free to choose these slopes independently of the delay channel. If the isotropic delay law is written locally as

$$
\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}
=
d_n\,\delta\ln n
+d_\lambda(-\delta\ln\lambda)
+d_R\,\delta\ln\frac{R_{\text{core}}}{R_{\text{core},0}},
$$

with $d_R=0$ in branches where $R_{\text{core}}$ does not enter the delay law, the toy slope requires

$$
d_n\kappa_n^{P}
+d_\lambda\kappa_\lambda^{P}
+d_R\kappa_R^{P}
=
0.36.
$$

The clean-delay anchored cadence equation requires

$$
b_n\kappa_n^{P}
-b_\lambda\kappa_\lambda^{P}
+b_R\kappa_R^{P}
=
G_\Gamma
-
\frac{G_\chi}{1+\gamma_{\text{eff}}}
=
0.42
$$

in the GR-matching branch $\gamma_{\text{eff}}=1$. Dividing by $G_\Gamma=0.60$ recovers the normalized compensation condition $\mathbf{c}\cdot\mathbf{u}^{P}=0.7$.

Validation status for this candidate source is therefore conditional. The pressure-dependent scaffold can rescue the broader shared row only if a future replay derives or measures at least one nonzero isotropic slope among $\kappa_n^{P}$, $\kappa_\lambda^{P}$, and $\kappa_R^{P}$, satisfies the delay-slope equation above, and keeps the resulting $\mathbf{u}^{P}_{\perp G}$ nonzero. Until those entries are declared, the toy fixture remains a falsification witness for the clean-delay anchored shared row, not a validation of a compensated row.

### Pressure-Slope Reduction From Modulus And Hessian

The pressure modulus packet fixes the density-side entry of this slope row. For the toy pressure coordinate, write the material-corrected scalar loading as

$$
\Theta
=
s_n\Pi,
\qquad
s_n
\equiv
1-\frac{n}{n_{\max}^{\mathrm{obl}}},
$$

after the declared material amplitude $C_M(Z_M/Z_*)^{\eta_Z}$ has been folded into $\Pi$. The packing law gives

$$
\delta\ln n
=
\kappa_n s_n\Pi
=
\kappa_n\Theta,
$$

so the first derived slope is

$$
\boxed{
\kappa_n^{P}=\kappa_n.
}
$$

Equivalently, using $K_{\mathrm{pack}}=K_{\text{sea}}/\kappa_n$,

$$
\delta\ln n
=
s_n\frac{\delta P}{K_{\mathrm{pack}}},
$$

with the same material amplitude convention as the toy pressure coordinate.

The envelope-Hessian packet then supplies the scale slope when $\lambda$ is identified with $R_\perp/R_{\perp,0}$ on the retained branch. With reduced variables

$$
\boldsymbol{\theta}
=
\left(
\delta\ln R_\perp,\,
\delta\ln\xi
\right)^T,
\qquad
\mathbf{c}
=
\left(
c_R,\,
c_\xi
\right)^T,
$$

define

$$
D_H
=
k_\xi c_R^2
-2k_{R\xi}c_Rc_\xi
+k_Rc_\xi^2.
$$

The density-constrained Hessian deformation gives

$$
\delta\ln R_\perp
=
-
\frac{
k_\xi c_R-k_{R\xi}c_\xi
}{
D_H
}
\delta\ln n.
$$

Therefore the branch-predicted scale slope is

$$
\boxed{
\kappa_\lambda^{P}
=
\kappa_n
\frac{
k_\xi c_R-k_{R\xi}c_\xi
}{
D_H
}
}
$$

provided $\delta\ln\lambda=\delta\ln R_\perp$. If the branch defines $\lambda$ as another support-cell average, the same formula must be replaced by that branch's declared envelope readout.

The $R_{\text{core}}$ slope is not determined until the branch states how the representative core scale is read from $(R_\perp,\xi)$. Let

$$
\delta\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
=
q_R\,\delta\ln R_\perp
+q_\xi\,\delta\ln\xi,
$$

where $(q_R,q_\xi)$ is a declared branch readout, not an observable-local fit. Since the Hessian packet gives

$$
\delta\ln\xi
=
-
\frac{
k_Rc_\xi-k_{R\xi}c_R
}{
D_H
}
\delta\ln n,
$$

the corresponding slope is

$$
\boxed{
\kappa_R^{P}
=
-
\kappa_n
\left[
q_R
\frac{k_\xi c_R-k_{R\xi}c_\xi}{D_H}
+
q_\xi
\frac{k_Rc_\xi-k_{R\xi}c_R}{D_H}
\right].
}
$$

Thus the slope row can be derived only on a positive Hessian branch with $D_H>0$ and a declared $(q_R,q_\xi)$. The current toy fixture still sets the slope row to zero because it does not declare $s_n$, $\kappa_n$, the Hessian entries, or the $R_{\text{core}}$ readout. A compensated shared row would require a future packet to insert those branch quantities and then re-evaluate the delay and cadence equations above.

Anisotropic pressure terms remain outside this scalar endpoint equation. The replay must keep

$$
\delta\mathbf{g}^{P}
=
\delta\mathbf{g}^{P,\mathrm{iso}}
+
\delta\mathbf{g}^{P,\mathrm{dev}},
\qquad
\mathbf{b}\cdot
\delta\mathbf{g}^{P,\mathrm{iso}}
=
\delta\ln\Gamma_N^{P,\mathrm{iso}},
$$

and carry $\delta\mathbf{g}^{P,\mathrm{dev}}$ through `anisotropic_residuals` and the existing null-sector checks. Directional pressure response cannot be used to repair the scalar shared-row mismatch.

## Failure Injection

A real replay should demote or fail the constitutive law if any of the following occur after ordinary condensed-matter corrections are subtracted:

1. The cadence channel gives $\mathcal{A}_{\Gamma}^{\mathrm{Fe/Cr}}\approx1.14$ while the delay, effective-speed, tensor, or strain channels require a materially different heavy/control ratio under the same state record.
2. The shared-row residual $\mathcal{R}_{\mathrm{row}}$ is acceptable only after replacing $B_P$ with separate material rows $B_{\mathrm{Fe}}$ and $B_{\mathrm{Cr}}$ without a logged branch transition.
3. The pressure fit improves by violating null-sector bounds for birefringence, photon dispersion, preferred-frame leakage, clock/signal mismatch, or transport-threshold behavior.
4. The inferred pressure response changes sign across the pressure steps without a recorded phase, magnetic, separator, or branch-state change.

## Real Replay Requirements

To turn this toy report into a falsification attempt, the next packet must supply:

1. pressure steps for two material states with matched phase and magnetic-state records;
2. principal strain entries sufficient to compute $\Delta\Pi^{\parallel-\perp}$ and $\delta S_{\mathrm{dev}}$;
3. ordinary electronic, magnetic, thermal, and elastic correction rows used to form $\mathbf{y}^{\mathrm{std}}$;
4. covariance estimates $\Sigma_{M,r}$ for the retained residual vector;
5. null-sector bounds for birefringence, photon dispersion, preferred-frame leakage, clock/signal mismatch, and transport behavior;
6. the fit comparison $\mathcal{R}_{\mathrm{row}}$ versus $\mathcal{R}_{\mathrm{sep}}$ with declared tolerances.

The implementation schema for that falsification attempt is [Metallic-Lattice Pressure Replay Data Schema](pressure-replay-metallic-lattice-data-schema.md).
