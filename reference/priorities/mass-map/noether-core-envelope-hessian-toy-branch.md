# Noether-Core Envelope Hessian Toy Branch

This priority packet supplies the first reduced Hessian calculation behind the Noether-Sea pressure modulus. It is report material, not reader-facing canon. Its purpose is to turn the open branch stiffness $H_{\mathrm{env}}$ into an explicit two-variable toy branch that can be checked, falsified, and later replaced by a certified Noether-core branch calculation.

## Claim Level

- **Status:** toy branch Hessian and stability classifier.
- **Main claim:** for a reduced oblate-envelope branch with active variables $(\ln R_\perp,\ln\xi)$, the scalar packing-volume stiffness is a constrained projection of a $2\times2$ envelope Hessian. It is positive only when the branch Hessian is positive on the retained non-symmetry subspace.
- **Open burden:** derive the entries of $H_{\mathrm{env}}$ from a finite Noether-core branch calculation instead of assigning them as toy stiffnesses.
- **Promotion target:** none until the Hessian entries are extracted from an accepted branch and the pressure, tensor, and null-sector residuals remain below bound.

## Source Anchors

- [Noether-Sea Pressure Modulus and Packing Headroom](noether-sea-pressure-modulus-and-packing-headroom.md) defines $K_{\mathrm{pack}}=K_{\text{sea}}/\kappa_n$ and requires $H_{\mathrm{env}}$ to compute $K_{\mathrm{env}}$.
- [Noether-Core Scaling and Packing Scaffold](../dyadic-lock/noether-core-scaling-and-packing.md) defines the oblate envelope, support-function lattice-cell bound, and same-level packing scalings.
- [Pressure-Response Coefficient Closure](pressure-response-coefficient-closure.md) records how shape response feeds $\chi_{\text{sea}}$, $\Gamma_N$, and $\mathcal{M}_{\text{sea}}^{ab}$.

## Runtime Artifact

Run the priority-side scanner with:

```text
node scripts/mass-map/noether-core-envelope-hessian-scanner.mjs --pretty
```

For branch-promotion checks, require finite-branch evidence explicitly:

```text
node scripts/mass-map/noether-core-envelope-hessian-scanner.mjs --require-branch-evidence --pretty
```

The script consumes:

```text
scripts/mass-map/noether-core-envelope-hessian-scan.mock.json
```

and emits one result row per Hessian scenario, with candidate rows for fixed-core, transverse-radius, volume-equivalent, and parallel-radius $R_{\text{core}}$ readouts. It reports $\Delta_H$, $D_H$, $k_{\mathrm{env}}^{(V)}$, $A_H$, $B_H$, the affine residual $c_RA_H+c_\xi B_H-1$, scalar feasibility residuals, $\kappa_n$, branch-evidence status, and the induced $\xi$ residual. The default run evaluates toy algebra. The `--require-branch-evidence` run fails any row whose Hessian entries are not declared as accepted finite-branch output.

## Reduced Branch Variables

Use the active log-coordinate vector

$$
\boldsymbol{\theta}
=
\begin{pmatrix}
r\\
x
\end{pmatrix}
\equiv
\begin{pmatrix}
\delta\ln R_\perp\\
\delta\ln\xi
\end{pmatrix}.
$$

For an aligned oblate cell with two transverse support directions and one parallel support direction,

$$
V_{\mathrm{cell}}^{\mathrm{sf}}
\propto
R_\perp^3\xi,
$$

so the support-function volume map is

$$
\delta\ln V_{\mathrm{cell}}^{\mathrm{sf}}
=
\mathbf{c}^T\boldsymbol{\theta},
\qquad
\mathbf{c}
=
\begin{pmatrix}
c_R\\
c_\xi
\end{pmatrix}
=
\begin{pmatrix}
3\\
1
\end{pmatrix}.
$$

For a mixed-orientation support-function cell, keep the same formula but replace $c_\xi=1$ by the branch derivative

$$
c_\xi
\equiv
\left.
\frac{\partial\ln V_{\mathrm{cell}}^{\mathrm{sf}}}
{\partial\ln\xi}
\right|_{\Lambda_{\mathrm{NC}}},
\qquad
0\le c_\xi\le1
$$

when the branch remains oblate and orientation averaging weakens shape sensitivity. The density strain is the opposite of the support-volume strain at fixed packing fraction:

$$
\epsilon_n
\equiv
\delta\ln n
=
-\mathbf{c}^T\boldsymbol{\theta}.
$$

## Toy Envelope Hessian

Let the branch energy near the reference state be

$$
\delta E_{\mathrm{env}}
=
\frac{1}{2}
\boldsymbol{\theta}^T
H_{\mathrm{env}}
\boldsymbol{\theta}
+O(\|\boldsymbol{\theta}\|^3),
$$

with

$$
H_{\mathrm{env}}
=
\begin{pmatrix}
k_R & k_{R\xi}\\
k_{R\xi} & k_\xi
\end{pmatrix}.
$$

The branch is stable on this reduced subspace only if

$$
\boxed{
k_R>0,
\qquad
k_\xi>0,
\qquad
\Delta_H\equiv k_Rk_\xi-k_{R\xi}^2>0.
}
$$

If $\Delta_H=0$, the toy branch has a floppy envelope mode and reports zero projected stiffness in at least one direction. If $\Delta_H<0$, the reference state is branch-unstable and cannot supply $K_{\mathrm{pack}}$.

## Projected Packing-Volume Stiffness

The least-energy deformation at fixed density strain solves

$$
\min_{\boldsymbol{\theta}}
\frac{1}{2}\boldsymbol{\theta}^TH_{\mathrm{env}}\boldsymbol{\theta}
\quad
\text{subject to}
\quad
\mathbf{c}^T\boldsymbol{\theta}=-\epsilon_n.
$$

The solution is

$$
\boxed{
\boldsymbol{\theta}_{\min}
=
-
\frac{
H_{\mathrm{env}}^{-1}\mathbf{c}
}{
\mathbf{c}^TH_{\mathrm{env}}^{-1}\mathbf{c}
}
\epsilon_n.
}
$$

The scalar stiffness conjugate to $\epsilon_n$ is

$$
\boxed{
k_{\mathrm{env}}^{(V)}
=
\left(
\mathbf{c}^TH_{\mathrm{env}}^{-1}\mathbf{c}
\right)^{-1}.
}
$$

For the $2\times2$ Hessian, this becomes

$$
\boxed{
k_{\mathrm{env}}^{(V)}
=
\frac{
\Delta_H
}{
D_H(\mathbf{c})
},
\qquad
D_H(\mathbf{c})
=
k_\xi c_R^2
-2k_{R\xi}c_Rc_\xi
+k_Rc_\xi^2.
}
$$

On a positive branch, $D_H(\mathbf{c})>0$ for any nonzero $\mathbf{c}$. The aligned-cell result is therefore

$$
\boxed{
k_{\mathrm{env,axis}}^{(V)}
=
\frac{
k_Rk_\xi-k_{R\xi}^2
}{
9k_\xi-6k_{R\xi}+k_R
}.
}
$$

If the Hessian is diagonal, the branch reduces to

$$
\boxed{
k_{\mathrm{env,diag}}^{(V)}
=
\frac{k_Rk_\xi}{9k_\xi+k_R}.
}
$$

The limiting checks are useful:

$$
\lim_{k_\xi\to\infty}k_{\mathrm{env,diag}}^{(V)}
=
\frac{k_R}{9},
\qquad
\lim_{k_R\to\infty}k_{\mathrm{env,diag}}^{(V)}
=
k_\xi.
$$

The first limit recovers the spherical log-radius result; the second says compression can be carried almost entirely by the shape ratio when transverse-radius motion is locked.

## Induced Shape Response

Write

$$
D_H
\equiv
D_H(\mathbf{c}).
$$

The density-constrained deformation components are

$$
\boxed{
\delta\ln R_\perp
=
-
\frac{
k_\xi c_R-k_{R\xi}c_\xi
}{
D_H
}
\epsilon_n,
}
$$

and

$$
\boxed{
\delta\ln\xi
=
-
\frac{
k_Rc_\xi-k_{R\xi}c_R
}{
D_H
}
\epsilon_n.
}
$$

Thus an isotropic density compression can still create a shape-ratio shift unless

$$
\boxed{
k_Rc_\xi=k_{R\xi}c_R.
}
$$

For the aligned branch this cancellation condition is

$$
\boxed{
k_R=3k_{R\xi}.
}
$$

If the pressure replay or null-sector bounds require no first-order shape response, the Hessian must satisfy this cancellation, lock $\xi$ through a large shape stiffness, or route the mismatch into an explicit anisotropic residual. It cannot simply set $\kappa_\xi=0$ independently of the branch Hessian.

## Normalized Hessian Response Ratios

The pressure replay uses the density-normalized deformation ratios

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
}.
$$

They are not independent. Direct substitution gives

$$
\boxed{
c_RA_H+c_\xi B_H=1.
}
$$

Thus a positive reduced Hessian can move the scalar compression between transverse scale and shape ratio, but the support-function volume derivative fixes their affine combination. Positivity of the Hessian is also not, by itself, a falsification of any particular pair $(A_H,B_H)$ on this affine line. For any candidate pair satisfying $c_RA_H+c_\xi B_H=1$, one can choose a positive matrix $H_{\mathrm{env}}^{-1}$ with

$$
H_{\mathrm{env}}^{-1}\mathbf c
\propto
\begin{pmatrix}
A_H\\
B_H
\end{pmatrix},
$$

and hence recover that pair through the normalized projection. The real branch burden is stronger: the finite Noether-core branch must supply the Hessian entries, and the resulting $B_H$ must pass the retained null-sector bounds.

For a pressure coordinate $\Theta$ with

$$
\delta\ln n=\kappa_n\Theta,
$$

the induced shape-ratio response is

$$
\boxed{
\delta\ln\xi=-\kappa_nB_H\Theta.
}
$$

If the scalar pressure row excludes first-order $-\ln\xi$, the branch must either impose $B_H=0$ or declare a residual tolerance such as

$$
\boxed{
\max_r
\left|
\kappa_nB_H\Theta_r
\right|
\le
\epsilon_{\xi}^{P}.
}
$$

This is not a new validation gate. It is the local null-sector bookkeeping already required when an isotropic pressure row induces a shape-ratio response.

## Modulus Handoff

The envelope contribution to the pressure modulus is

$$
\boxed{
K_{\mathrm{env}}
=
\rho_{\text{core},0}n\,k_{\mathrm{env}}^{(V)}.
}
$$

The full support-function modulus remains

$$
\boxed{
K_{\mathrm{pack}}^{\mathrm{sf}}
=
K_{\mathrm{env}}
+K_{\mathrm{contact}}
+K_{\mathrm{wake}}^{\mathrm{rev}}.
}
$$

The density branch therefore uses

$$
\boxed{
\delta\ln n
\approx
s_n
\frac{\delta P}
{K_{\mathrm{pack}}^{\mathrm{sf}}},
\qquad
K_{\text{sea}}
=
\kappa_nK_{\mathrm{pack}}^{\mathrm{sf}}.
}
$$

The induced envelope response can be fed into the pressure coefficient closure through $\delta\ln\lambda$ and $\delta\ln\xi$ only after the branch declares whether $\lambda$ is identified with $R_\perp/R_{\perp,0}$, with another envelope scale, or with a support-cell average.

## Classification Table

| Condition | Reading | Pressure-modulus consequence |
| --- | --- | --- |
| $k_R>0$, $k_\xi>0$, $\Delta_H>0$ | positive reduced branch | $K_{\mathrm{env}}>0$ and the density modulus is admissible |
| $\Delta_H=0$ after symmetry modes are removed | floppy envelope mode | $K_{\mathrm{env}}$ is not accepted; density response is underdetermined |
| $\Delta_H<0$ | branch instability | no modulus; branch must split or fail |
| $k_Rc_\xi=k_{R\xi}c_R$ | first-order shape-ratio cancellation | isotropic density compression does not force $\delta\ln\xi$ |
| $k_Rc_\xi\ne k_{R\xi}c_R$ | density-shape coupling | pressure response must carry $\xi$ shift or anisotropic residual |

## Falsification Conditions

1. **Negative Hessian branch:** a replay needs $K_{\mathrm{pack}}>0$ while the retained Hessian has $\Delta_H\le0$ after symmetry modes are removed.
2. **Hidden shape response:** isotropic pressure data require $\delta\ln\xi=0$ but the declared Hessian has $k_Rc_\xi\ne k_{R\xi}c_R$ and no large shape-locking stiffness.
3. **Modulus mismatch:** $K_{\mathrm{pack}}$ inferred from residual channels disagrees with $\rho_{\text{core},0}n\,k_{\mathrm{env}}^{(V)}+K_{\mathrm{contact}}+K_{\mathrm{wake}}^{\mathrm{rev}}$ for the same branch state.
4. **Null-sector violation:** the Hessian-induced $\delta\ln\xi$ drives birefringence, dispersion, preferred-frame, clock/signal, or tensor anisotropy above the retained bounds.
5. **Coefficient split:** the replay fits $\lambda$ and $\xi$ responses with coefficients inconsistent with the Hessian deformation vector $\boldsymbol{\theta}_{\min}$.

## Scanner Handoff

The first scanner now samples $(k_R,k_\xi,k_{R\xi},c_\xi)$, reports $k_{\mathrm{env}}^{(V)}$, $A_H$, $B_H$, $\delta\ln R_\perp/\epsilon_n$, $\delta\ln\xi/\epsilon_n$, and flags positive, scalar-feasible, density-sign-passing, and null-sector-safe branches. For pressure-row rescue work, it accepts a declared $(q_R,q_\xi)$ readout and reports $Q_H=q_RA_H+q_\xi B_H$.

The default mock packet has two scenarios:

| Scenario | Scanner result | Reading |
| --- | --- | --- |
| `chi_only_falsification_control` | all four readouts fail | the scalar equation is formally underdetermined, but the density denominator is zero, so $\kappa_n$ cannot be positive while $G_\chi\ne0$ |
| `fixed_core_density_rescue_toy` | fixed-core readout passes; transverse-radius, volume-equivalent, and parallel-radius readouts fail scalar feasibility | a positive aligned-cancellation Hessian can rescue the toy row only for the declared fixed-core readout and density-side pressure response |

This is still a toy branch certificate. It should remain priority-side material until a finite Noether-core branch supplies actual Hessian entries and the induced $\xi$ residual is checked against the retained null-sector bounds.

## Finite-Branch Intake Verdict

The current compact $A_0$ branch material cannot replace the mock Hessian entries. The fold-layer-locked one-period attempt in [A0 Reduced Branch Certificate Packet](a0-reduced-branch-certificate.md) is a direct negative result for the naive root-weighted map: it reports `failed_direct_one_period_residuals`, leaves the quotient monodromy and $\eta$ ladder uncomputed, and gives a relation-weight-only no-go with relative residual about `0.755`. It therefore does not define an accepted history segment and does not emit a finite envelope Hessian.

The finite replacement condition is exact. For an accepted branch $\Lambda$, the scanner row must replace the toy stiffnesses by

$$
k_R
=
\frac{\partial^2 E_{\mathrm{env}}^\Lambda}{\partial(\ln R_\perp)^2},
\qquad
k_\xi
=
\frac{\partial^2 E_{\mathrm{env}}^\Lambda}{\partial(\ln\xi)^2},
\qquad
k_{R\xi}
=
\frac{\partial^2 E_{\mathrm{env}}^\Lambda}{\partial(\ln R_\perp)\partial(\ln\xi)}
$$

on the quotient-normal branch chart after symmetry modes are removed, together with

$$
c_R
=
\frac{\partial\ln V_{\mathrm{cell}}^{\mathrm{sf}}}{\partial\ln R_\perp},
\qquad
c_\xi
=
\frac{\partial\ln V_{\mathrm{cell}}^{\mathrm{sf}}}{\partial\ln\xi}.
$$

Until those quantities are produced by the same finite branch that passes residual closure, positive $\Delta_{\mathbf{k}}$, and $\eta$-ladder persistence, the compensated-row scanner has only two durable conclusions:

1. the $\chi_{\text{sea}}$-only row is falsified by the pressure denominator and density-sign test;
2. the fixed-core density rescue is a toy witness, not branch evidence.

Running the scanner with finite-branch evidence required currently returns zero passing scenarios and zero passing candidates, because both default scenarios are marked as toy algebra rather than accepted branch output.
