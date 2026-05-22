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

### Hessian Feasibility Condition For Shared-Row Rescue

The previous equations can be reduced to one algebraic feasibility condition. Define the Hessian response ratios

$$
A_H
\equiv
\frac{
k_\xi c_R-k_{R\xi}c_\xi
}{
D_H
},
\qquad
B_H
\equiv
\frac{
k_Rc_\xi-k_{R\xi}c_R
}{
D_H
},
$$

and the $R_{\text{core}}$ readout combination

$$
Q_H
\equiv
q_RA_H+q_\xi B_H.
$$

Then the derived pressure slopes are

$$
\kappa_n^{P}=\kappa_n,
\qquad
\kappa_\lambda^{P}=\kappa_nA_H,
\qquad
\kappa_R^{P}=-\kappa_nQ_H.
$$

Substitution into the delay and cadence equations gives

$$
\kappa_n
\left(
d_n+d_\lambda A_H-d_RQ_H
\right)
=
G_\chi,
$$

and

$$
\kappa_n
\left(
b_n-b_\lambda A_H-b_RQ_H
\right)
=
G_\Gamma
-
\frac{G_\chi}{1+\gamma_{\text{eff}}}.
$$

Eliminating $\kappa_n$ gives the scalar shared-row feasibility equation

$$
\boxed{
G_\chi
\left(
b_n-b_\lambda A_H-b_RQ_H
\right)
=
\left(
G_\Gamma
-
\frac{G_\chi}{1+\gamma_{\text{eff}}}
\right)
\left(
d_n+d_\lambda A_H-d_RQ_H
\right).
}
$$

For the toy GR-matching branch, $G_\Gamma=0.60$, $G_\chi=0.36$, and $\gamma_{\text{eff}}=1$, so this reduces to

$$
\boxed{
6
\left(
b_n-b_\lambda A_H-b_RQ_H
\right)
=
7
\left(
d_n+d_\lambda A_H-d_RQ_H
\right).
}
$$

The same branch must also make the density slope positive:

$$
\boxed{
\kappa_n
=
\frac{
G_\chi
}{
d_n+d_\lambda A_H-d_RQ_H
}
>0.
}
$$

If the denominator vanishes while $G_\chi\ne0$, or if the resulting $\kappa_n$ is nonpositive on a branch that requires positive density response, the compensated row is falsified for that Hessian/readout choice.

This feasibility condition is only scalar. It does not license using a first-order shape-ratio response as a hidden isotropic repair. If the scalar pressure row is to exclude the $-\ln\xi$ channel, the branch must either carry the induced $\delta\ln\xi$ as an explicit residual subject to null-sector bounds or impose the Hessian cancellation

$$
\boxed{
B_H=0
\quad\Longleftrightarrow\quad
k_Rc_\xi=k_{R\xi}c_R.
}
$$

In the cancellation subcase,

$$
A_H=\frac{1}{c_R},
\qquad
Q_H=\frac{q_R}{c_R},
$$

so the toy GR-matching feasibility condition becomes

$$
\boxed{
6
\left(
b_n-\frac{b_\lambda+b_Rq_R}{c_R}
\right)
=
7
\left(
d_n+\frac{d_\lambda-d_Rq_R}{c_R}
\right).
}
$$

For the aligned support-function branch $c_R=3$, this specializes to

$$
\boxed{
6
\left(
b_n-\frac{b_\lambda+b_Rq_R}{3}
\right)
=
7
\left(
d_n+\frac{d_\lambda-d_Rq_R}{3}
\right).
}
$$

Equivalently, when the coefficient multiplying $q_R$ is nonzero, the aligned cancellation branch requires

$$
\boxed{
q_R
=
\frac{
21d_n+7d_\lambda-18b_n+6b_\lambda
}{
-6b_R+7d_R
}.
}
$$

If $-6b_R+7d_R=0$, the aligned cancellation branch is admissible only if

$$
\boxed{
21d_n+7d_\lambda-18b_n+6b_\lambda=0.
}
$$

Otherwise the aligned cancellation branch is falsified for the declared delay and cadence coefficients.

This gives a direct test for simple $R_{\text{core}}$ readouts. Define

$$
N_q
\equiv
21d_n+7d_\lambda-18b_n+6b_\lambda,
\qquad
D_q
\equiv
-6b_R+7d_R.
$$

When $D_q\ne0$, the aligned cancellation branch requires $q_R=N_q/D_q$. When $D_q=0$, the branch is admissible only if $N_q=0$, and the scalar condition no longer selects a unique $q_R$.

| Candidate $R_{\text{core}}$ readout | Branch readout | Aligned cancellation test | Current status |
| --- | --- | --- | --- |
| Fixed-core readout | $(q_R,q_\xi)=(0,0)$ | viable iff $N_q=0$ | underdetermined until $(b_i,d_i)$ are declared |
| Transverse-radius readout | $(q_R,q_\xi)=(1,0)$ | viable iff $N_q=D_q$ | underdetermined until $(b_i,d_i)$ are declared |
| Volume-equivalent readout | $(q_R,q_\xi)=(1,\frac13)$ | same scalar test as transverse when $B_H=0$ | not distinguishable from transverse without an allowed $\xi$ residual |
| Parallel-radius readout | $(q_R,q_\xi)=(1,1)$ | same scalar test as transverse when $B_H=0$ | not distinguishable from transverse without an allowed $\xi$ residual |

The collapse of the last three rows is not a proof that the readouts are physically equivalent. It is a consequence of enforcing $B_H=0$, which removes first-order $\xi$ response from the scalar pressure row. If a later branch allows $\delta\ln\xi$ as an explicit bounded residual, the general feasibility equation above must be used with $Q_H=q_RA_H+q_\xi B_H$, and the volume-equivalent and parallel-radius readouts become distinguishable.

### Positive-Hessian Feasibility Reduction

The Hessian packet adds one useful simplification. The normalized Hessian ratios obey

$$
\boxed{
c_RA_H+c_\xi B_H=1.
}
$$

For the common case $c_\xi\ne0$, write

$$
B_H
=
\frac{1-c_RA_H}{c_\xi},
\qquad
Q_H
=
q_0+q_1A_H,
$$

where

$$
q_0\equiv\frac{q_\xi}{c_\xi},
\qquad
q_1\equiv q_R-\frac{q_\xi c_R}{c_\xi}.
$$

Define the pressure mismatch ratio

$$
\alpha_P
\equiv
\frac{
G_\Gamma-\dfrac{G_\chi}{1+\gamma_{\text{eff}}}
}{
G_\chi
}.
$$

The scalar feasibility condition is then linear in $A_H$. With

$$
C_0\equiv b_n-b_Rq_0,
\qquad
C_1\equiv b_\lambda+b_Rq_1,
$$

and

$$
D_0\equiv d_n-d_Rq_0,
\qquad
D_1\equiv d_\lambda-d_Rq_1,
$$

it becomes

$$
C_0-C_1A_H
=
\alpha_P
\left(
D_0+D_1A_H
\right).
$$

Thus, when $C_1+\alpha_PD_1\ne0$, the only scalar-rescue candidate on the declared readout is

$$
\boxed{
A_H^{*}
=
\frac{
C_0-\alpha_PD_0
}{
C_1+\alpha_PD_1
},
\qquad
B_H^{*}
=
\frac{1-c_RA_H^{*}}{c_\xi},
\qquad
Q_H^{*}
=
q_0+q_1A_H^{*}.
}
$$

If $C_1+\alpha_PD_1=0$, the scalar equation is feasible only when $C_0-\alpha_PD_0=0$; then the scalar row leaves $A_H$ unresolved and the density-sign and null-sector tests must select or reject the branch.

If $c_\xi=0$, the affine identity instead fixes $A_H=1/c_R$. The same scalar feasibility equation should then be solved directly for $B_H$ through $Q_H=q_R/c_R+q_\xi B_H$, unless $q_\xi=0$, in which case the shape-ratio direction is invisible to the scalar readout and only the null-sector bound can constrain it.

The density sign condition is

$$
\boxed{
\kappa_n
=
\frac{
G_\chi
}{
D_0+D_1A_H^{*}
}
>0.
}
$$

The induced shape-ratio residual is

$$
\boxed{
\delta\ln\xi
=
-\kappa_nB_H^{*}\Theta.
}
$$

If the replay claims a strictly scalar isotropic pressure row, the branch must set $B_H^{*}=0$. If it allows a bounded shape residual, it must instead satisfy the declared null-sector tolerance

$$
\boxed{
\max_r
\left|
\frac{
G_\chi B_H^{*}
}{
D_0+D_1A_H^{*}
}
\Theta_r
\right|
\le
\epsilon_{\xi}^{P}.
}
$$

For the toy GR-matching numbers, $\alpha_P=7/6$. A minimal $\chi_{\text{sea}}$-only cadence row has $b_n=b_\lambda=b_R=0$, so the scalar cadence side vanishes. It can satisfy the feasibility equation only by forcing the delay denominator to vanish, which contradicts $G_\chi\ne0$ and $\kappa_n>0$. This recovers the earlier chi-only falsification from the Hessian reduction.

For a broader compensated row, the algebraic rescue is not ruled out by Hessian positivity alone. A positive reduced Hessian can realize any pair $(A_H,B_H)$ on the affine line $c_RA_H+c_\xi B_H=1$; the falsifiers are the actual branch Hessian, the density-sign condition, the declared $R_{\text{core}}$ readout, and the null-sector bound on $B_H$.

The executable scanner now evaluates this reduction directly:

```text
node scripts/mass-map/noether-swarm-envelope-hessian-scanner.mjs --pretty
```

The branch-promotion replay requires finite-branch evidence:

```text
node scripts/mass-map/noether-swarm-envelope-hessian-scanner.mjs --require-branch-evidence --pretty
```

The default mock packet reports one rescue witness and one falsification control:

| Scenario | Readout candidate | Scanner status | Reason |
| --- | --- | --- | --- |
| `chi_only_falsification_control` | all four readouts | fail | scalar feasibility is not enough because the delay denominator is zero and $\kappa_n$ is undefined |
| `fixed_core_density_rescue_toy` | fixed-core readout | pass | positive Hessian, $B_H=0$, $\kappa_n=1$, and zero scalar residual |
| `fixed_core_density_rescue_toy` | transverse-radius, volume-equivalent, parallel-radius readouts | fail | same Hessian and pressure rows give a nonzero scalar feasibility residual for those $R_{\text{core}}$ readouts |

This is a branch-certificate scaffold, not empirical evidence. Its value is that future finite-branch Hessian entries can replace the toy values without changing the rescue test.

This is the first concrete compensated-row branch target. It is not a validation result: it becomes a candidate only after a positive Hessian branch supplies $k_R$, $k_\xi$, $k_{R\xi}$, $c_R$, $c_\xi$, the readout $(q_R,q_\xi)$, and null-sector residuals that keep the induced shape response admissible.

### Replay Acceptance Proposition

The Fe/Cr toy replay now has a branch-native acceptance condition. Define

$$
\Delta_G
\equiv
G_\Gamma-\frac{G_\chi}{1+\gamma_{\text{eff}}},
\qquad
L_H
\equiv
d_n+d_\lambda A_H-d_RQ_H,
\qquad
C_H
\equiv
b_n-b_\lambda A_H-b_RQ_H.
$$

For the toy GR-matching branch, $G_\chi=0.36>0$ and $\Delta_G=0.42>0$. A compensated pressure row is admissible for a declared readout only if all of the following hold:

$$
\boxed{
\begin{gathered}
k_R>0,\qquad k_\xi>0,\qquad \Delta_H>0,\qquad D_H>0,\\
0<s_n^{\mathrm{sf}}\le1,\qquad K_{\mathrm{pack}}^{\mathrm{sf}}>0,\\
G_\chi C_H=\Delta_G L_H,\qquad
\kappa_n=\frac{G_\chi}{L_H}>0,\\
\text{branch evidence is finite-branch evidence, not toy algebra.}
\end{gathered}
}
$$

The coefficient signs are therefore fixed once $G_\chi$ is fixed. In the current toy convention $G_\chi>0$, so $L_H>0$ is required for positive density response. Because $\Delta_G>0$, scalar feasibility then forces $C_H>0$ as well. A row with $L_H=0$ while $G_\chi\ne0$ has no finite $\kappa_n$; a row with $L_H<0$ has the wrong density sign; a row with $C_H$ of the opposite sign fails the shared cadence equation.

The shape channel adds the scalar-versus-bounded distinction:

$$
\boxed{
\text{strict scalar row: }B_H=0,
\qquad
\text{bounded row: }
\max_r
\left|
\frac{G_\chi B_H}{L_H}
\Theta_r
\right|
\le\epsilon_{\xi}^{P}.
}
$$

Finally, the pressure-side slope vector must be the branch-derived one:

$$
\boxed{
\left(
\kappa_n^P,\,
\kappa_\lambda^P,\,
\kappa_R^P
\right)
=
\kappa_n
\left(
1,\,
A_H,\,
-Q_H
\right).
}
$$

A replay that instead chooses $\kappa_n^P$, $\kappa_\lambda^P$, and $\kappa_R^P$ independently has failed the pressure replay even if the scalar residual becomes small. Its diagnostic residual is

$$
\boxed{
\mathcal{R}_{\mathrm{slope}}
=
\left\|
\left(
\kappa_n^P,\,
\kappa_\lambda^P,\,
\kappa_R^P
\right)
-
\kappa_n
\left(
1,\,
A_H,\,
-Q_H
\right)
\right\|.
}
$$

For a same-branch claim, $\mathcal{R}_{\mathrm{slope}}$ must vanish within the declared tolerance. If it does not, the response belongs to a branch split, a changed readout, an ordinary material correction, or a failed Noether-Sea pressure-row interpretation.

The current finite-branch intake verdict is negative. The compact $A_0$ fold-layer-locked one-period attempt in [A0 Reduced Branch Certificate Packet](a0-reduced-branch-certificate.md) fails direct one-period residual closure and does not compute the quotient monodromy, positive $\Delta_{\mathbf{k}}$, or $\eta$-ladder persistence. Its residual-balance ledger also gives a relation-weight-only no-go with relative residual about `0.755`, so it cannot supply a finite envelope Hessian. The finite-branch intake contract is now recorded in [Noether Swarm Envelope Hessian Toy Branch](noether-swarm-envelope-hessian-toy-branch.md): accepted pressure rescue requires emitted branch Hessian entries, accepted-history source fields, a predeclared $R_{\text{core}}$ readout, finite branch-evidence status, and fail-closed scanner semantics. With `--require-branch-evidence`, both default scanner scenarios fail as toy rows rather than accepted branch rows. Therefore the broader compensated family remains optional but unpromoted; nonzero $a_n$, $a_\lambda$, or $a_R$ are not required by the endpoint constraints, and they remain disfavored as independent fit knobs until a finite branch derives the corresponding pressure-side entries.

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

## Compensated Static-Family Status

The current edit-batch result is a conditional falsification, not a validation of the broader compensated family.

- The weak static endpoint, finite-height clock redshift, and endpoint-subtracted redshift require only the scalar endpoint sum

  $$
  b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1.
  $$

  They do not require nonzero $a_n$, $a_\lambda$, or $a_R$ by themselves.

- The current Fe/Cr pressure projection falsifies the $\chi_{\text{sea}}$-only shared row because $a_\chi^{P\to\Gamma}=0.6$ cannot equal $1+\gamma_{\text{eff}}=2$ on the GR-matching branch.

- The broader compensated row survives only as a branch target. It requires a nonzero isotropic pressure-side vector

  $$
  \mathbf{u}^{P}
  =
  \frac{1}{G_\Gamma}
  \left(
  \kappa_n^{P},\,
  -\kappa_\lambda^{P},\,
  \kappa_R^{P}
  \right)^T
  $$

  with a nonzero component outside the gravitational non-$\chi_{\text{sea}}$ projection. In the clean-delay anchored subclass this is the condition $\left\|\mathbf{u}^{P}_{\perp G}\right\|>0$ with $\mathbf{c}\cdot\mathbf{u}^{P}=0.7$ for the toy pressure numbers.

Priority reading: nonzero static endpoint coefficients $a_n$, $a_\lambda$, and $a_R$ remain optional and disfavored unless a branch calculation derives them. Nonzero pressure slopes $\kappa_n^{P}$, $\kappa_\lambda^{P}$, or $\kappa_R^{P}$ are the immediate rescue obligation for the Fe/Cr toy mismatch; they must be derived from packing headroom, the envelope Hessian, and an $R_{\text{core}}$ readout rather than inserted as row-local fit freedom.

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
