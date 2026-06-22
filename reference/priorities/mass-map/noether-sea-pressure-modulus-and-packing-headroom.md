# Noether Sea Pressure Modulus and Packing Headroom

This priority packet derives a branch-conditional pressure modulus and packing-headroom law for the pressure-dependent Noether sea response. It is report material, not reader-facing canon. Its role is to replace the purely named scale $K_{\text{sea}}$ with a computable branch target tied to the Noether braid exclusion envelope, support-function packing cell, and envelope stiffness.

## Claim Level

- **Status:** candidate modulus derivation and scaling law.
- **Main claim:** the pressure-density response does not determine $K_{\text{sea}}$ alone. It determines the density modulus $K_{\mathrm{pack}}=K_{\text{sea}}/\kappa_n$, while the support-function packing record determines the headroom factor $s_n=1-n/n_{\max}^{\mathrm{obl}}$.
- **Open burden:** compute the envelope stiffness Hessian, contact-network stiffness, and branch deformation vector from an accepted Noether braid branch or a certified dense-medium simulation.
- **Promotion target:** none until $K_{\mathrm{pack}}$, $s_n$, and the branch residuals are extracted from a declared Noether braid branch and survive replay null bounds.

## Source Anchors

- [Pressure-Dependent Noether sea Constitutive Response](pressure-dependent-noether-sea-constitutive-response.md) defines $\Pi_\ell=P_\ell/K_{\text{sea}}$ and the packing-limited density law.
- [Pressure-Response Coefficient Closure](pressure-response-coefficient-closure.md) shows that pressure tests constrain coefficient combinations, not observable-local rows.
- [Noether Braid Scaling and Packing Scaffold](../dyadic-lock/noether-swarm-scaling-and-packing.md) supplies $R_{\mathrm{excl}}$, $V_{\mathrm{cell}}^{\mathrm{sf}}$, $n_{\max}^{\mathrm{obl}}$, the support-function contact condition, and the packing-compliance diagnostic.
- [$A_0$ Medium-Response Tensor Probe](a0-medium-response-tensor-probe.md) supplies the homogeneous tensor target that the modulus must not contradict.

## Modulus Gauge

The pressure response packet writes

$$
\frac{\partial\ln n}{\partial\Pi_\ell}
=
\kappa_n
\left(
1-\frac{n}{n_{\max}^{\mathrm{obl}}}
\right),
\qquad
\Pi_\ell=\frac{P_\ell}{K_{\text{sea}}}.
$$

For an actual density modulus, the directly measurable inverse slope is

$$
\frac{\partial\ln n}{\partial P_\ell}
=
\frac{s_n}{K_{\mathrm{pack}}},
\qquad
s_n\equiv1-\frac{n}{n_{\max}^{\mathrm{obl}}}.
$$

Therefore

$$
\boxed{
K_{\mathrm{pack}}
\equiv
\frac{K_{\text{sea}}}{\kappa_n}.
}
$$

If a branch convention sets $\kappa_n=1$, then $K_{\text{sea}}=K_{\mathrm{pack}}$. Until that convention or branch calculation is supplied, Fe/Cr or Ni/Co pressure slopes can determine only $K_{\text{sea}}/\kappa_n$.

## Support-Function Headroom

For a material or branch cell $X$, the packing scaffold supplies the support-function lattice-cell volume

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
\prod_{i=1}^3D_{X,i},
$$

with

$$
D_{X,i}
=
2\bar{s}_X(\hat{\mathbf{b}}_{X,i})
+\delta_{\mathrm{wake},X}
+\delta_{\mathrm{lat},X,i}.
$$

The support-function packing ceiling is

$$
n_{\max,X}^{\mathrm{sf}}
=
\frac{\nu_{\mathrm{pack},0}}
{\rho_{\text{NS},0}V_{\mathrm{cell},X}^{\mathrm{sf}}}
$$

when the replay treats the support-function lattice cell as the working equality model. If the support-function result is used only as an upper bound, then the same equation gives an upper-bound ceiling and the corresponding $s_n$ is an upper-bound headroom.

The branch headroom is therefore

$$
\boxed{
s_{n,X}^{\mathrm{sf}}
=
1-\frac{n_X}{n_{\max,X}^{\mathrm{sf}}}
=
1-\frac{\rho_{\text{NS},X}V_{\mathrm{cell},X}^{\mathrm{sf}}}
{\nu_{\mathrm{pack},0}}.
}
$$

The admissibility condition is

$$
\boxed{
0\le s_{n,X}^{\mathrm{sf}}\le1.
}
$$

If $s_{n,X}^{\mathrm{sf}}<0$, the declared envelope, orientation record, contact network, or density record is overpacked and must split branch, change lattice state, or fail the replay. If $s_{n,X}^{\mathrm{sf}}\to0$, density response stiffens and pressure should route into shape, strain, contact, or transport channels rather than continuing as an unconstrained scalar increase in $n$.

## Packing-Limited Pressure Law

At fixed $n_{\max}^{\mathrm{obl}}$ over a small pressure interval, the density law integrates to

$$
\boxed{
P_{\mathrm{pack}}(n;n_0,n_{\max})
=
K_{\mathrm{pack}}
\ln
\left[
\frac{n}{n_0}
\frac{s_{n,0}}{s_n}
\right],
\qquad
s_n=1-\frac{n}{n_{\max}}.
}
$$

Differentiating gives

$$
\boxed{
\frac{\partial P_{\mathrm{pack}}}{\partial\ln n}
=
\frac{K_{\mathrm{pack}}}{s_n},
\qquad
\frac{\partial\ln n}{\partial P_{\mathrm{pack}}}
=
\frac{s_n}{K_{\mathrm{pack}}}.
}
$$

Thus the pressure law has a built-in hardening mechanism. The weak-density branch recovers

$$
\delta\ln n
\approx
\frac{s_{n,0}}{K_{\mathrm{pack}}}\delta P,
$$

while the near-packed branch makes the density slope vanish:

$$
\lim_{s_n\to0^+}
\frac{\partial\ln n}{\partial P}
=0.
$$

Composed with the exposed inertial-response trace, this gives a density-channel vanishing invariant. In the branch-preserving reversible domain, hold the quotient-visible source $M_0^{\mathrm{src}}(A)=\zeta(A)E_{\text{internal}}(A)$ fixed to isolate the density-only channel. Since the pressure closure gives $\delta\mathcal{M}_0=2\,\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}$ and the density contribution to $\delta\ln\chi_{\text{sea}}$ is $a_n\delta\ln n$, the scalar trace derivative satisfies

$$
\left.
\frac{\partial m_{\mathrm{tr}}}{\partial P}
\right|_{n\text{-only}}
=
2\alpha_{\mathrm{m}}
\frac{M_0^{\mathrm{src}}(A)}{c_{\text{eff},0}^{2}}\,
a_n
\frac{s_n}{K_{\mathrm{pack}}}.
$$

Therefore

$$
\boxed{
\lim_{s_n\to0^+}
\left.
\frac{\partial m_{\mathrm{tr}}}{\partial P}
\right|_{n\text{-only}}
=0.
}
$$

This is not a claim that dense matter becomes pressure-inert. It says only that the scalar density channel cannot keep carrying pressure response after packing headroom closes. Any remaining mass-trace, signal-delay, strain, or transport response must route through exposed-source drift, $\lambda$, $\xi$, trace-free strain, $\mathcal{M}_{\text{sea}}^{ab}$, reversible wake/contact stiffness, or an explicit threshold or branch event.

This is the first falsifiable scaling law for dense metallic lattices: high pressure should not indefinitely increase $n$ through the scalar density channel. Once $s_n$ is small, residual response must show up through $\lambda$, $\xi$, $S_{ij}^{\mathrm{dev}}$, $\mathcal{M}_{\text{sea}}^{ab}$, transport thresholding, or an explicit branch transition.

## Defect and Criticality Guardrail

The Tier 2 defect and vortex sources sharpen the meaning of "explicit branch transition." In ordered media, a defect claim is not justified by disturbed geometry alone. It requires an effective order-parameter map and an invariant, such as a winding number or homotopy class, that is stable while the branch gap remains open.

For the pressure-modulus packet, the branch-preserving regime therefore has the constraint

$$
\Delta\mathcal{I}_{\mathrm{def}}=0,
\qquad
s_n>0,
\qquad
\Delta_{\mathbf{k}}>0,
$$

where $\mathcal{I}_{\mathrm{def}}$ is any declared effective defect or topological label extracted from the branch record. If a replay requires

$$
\Delta\mathcal{I}_{\mathrm{def}}\ne0
$$

while still claiming the same smooth branch, the modulus fit has absorbed a structural transition. The admissible routing is

$$
\Delta\mathcal{I}_{\mathrm{def}}\ne0
\quad\Longrightarrow\quad
s_n\to0
\quad\text{or}\quad
\Delta_{\mathbf{k}}\to0
\quad\text{or}\quad
\mathcal{R}_{\text{tr}}\ge\mathcal{R}_{\text{tr},*}.
$$

This rule protects $K_{\mathrm{pack}}$ from being fitted through irreversible vortex-like unbinding, dislocation motion, defect creation, heating, or action shedding. Those channels may be real material responses, but they belong in transport routing or a branch-transition replay rather than in the reversible pressure modulus.

## Envelope-Stiffness Modulus

Let the branch envelope variables be a log-coordinate vector

$$
\boldsymbol{\theta}_X
=
\left(
\ln R_{\perp,X},\,
\ln\xi_X,\,
\theta_{O,1},\ldots,\theta_{O,m}
\right)^T,
$$

where the last entries encode the retained orientation or contact-network coordinates. Let the per-core envelope energy near the branch state have Hessian

$$
\delta E_{\mathrm{env},X}
=
\frac{1}{2}
\delta\boldsymbol{\theta}_X^T
H_{\mathrm{env},X}
\delta\boldsymbol{\theta}_X
+O(\delta\boldsymbol{\theta}^3).
$$

The log packing-volume strain is

$$
\epsilon_{V,X}
\equiv
\delta\ln V_{\mathrm{cell},X}^{\mathrm{sf}}
=
\mathbf{c}_X^T\delta\boldsymbol{\theta}_X.
$$

The least-energy envelope stiffness for that scalar volume strain is the constrained Hessian projection

$$
\boxed{
k_{\mathrm{env},X}^{(V)}
=
\left(
\mathbf{c}_X^T
H_{\mathrm{env},X}^{-1}
\mathbf{c}_X
\right)^{-1}.
}
$$

This formula assumes $H_{\mathrm{env},X}$ is positive on the retained branch subspace. If it has a zero or negative mode outside symmetry directions, the material state is not a stable branch for this modulus calculation.

The corresponding energy-density contribution is

$$
\boxed{
K_{\mathrm{env},X}
=
\rho_{\text{NS},0}n_X\,k_{\mathrm{env},X}^{(V)}.
}
$$

This is the branch-native version of a bulk modulus: it is energy per core times cores per volume, projected through the actual envelope-volume mode.

### Allowed Branch-Derived Pressure Slopes

The pressure replay may fit only slopes generated by positive packing headroom and the retained Hessian deformation. On a branch state $X$ with $s_{n,X}^{\mathrm{sf}}>0$ and $K_{\mathrm{pack},X}^{\mathrm{sf}}>0$,

$$
\delta\ln n_X
\approx
s_{n,X}^{\mathrm{sf}}
\frac{\delta P_X}{K_{\mathrm{pack},X}^{\mathrm{sf}}}
$$

has positive density response. If the material-corrected pressure coordinate is written as

$$
\Theta_X
=
s_{n,X}^{\mathrm{sf}}
\frac{\delta P_X}{K_{\text{sea},X}},
\qquad
K_{\text{sea},X}
=
\kappa_{n,X}K_{\mathrm{pack},X}^{\mathrm{sf}},
$$

then the branch requires

$$
\boxed{
\kappa_{n,X}>0.
}
$$

Let the reduced envelope readouts give

$$
\delta\ln R_{\perp,X}
=
-A_{H,X}\delta\ln n_X,
\qquad
\delta\ln\xi_X
=
-B_{H,X}\delta\ln n_X,
\qquad
c_{R,X}A_{H,X}+c_{\xi,X}B_{H,X}=1.
$$

If $\lambda$ is the transverse envelope scale and the representative core readout is

$$
\delta\ln\frac{R_{\text{core},X}}{R_{\text{core},0}}
=
q_{R,X}\delta\ln R_{\perp,X}
+q_{\xi,X}\delta\ln\xi_X,
$$

then the pressure-side slope vector is not freely fitted. It must be

$$
\boxed{
\left(
\kappa_n^P,\,
\kappa_\lambda^P,\,
\kappa_R^P
\right)_X
=
\kappa_{n,X}
\left(
1,\,
A_{H,X},\,
-Q_{H,X}
\right),
\qquad
Q_{H,X}=q_{R,X}A_{H,X}+q_{\xi,X}B_{H,X}.
}
$$

The positive scalar $\kappa_{n,X}$ sets the magnitude while the branch Hessian and readout fix the direction. A replay that improves by choosing $\kappa_n^P$, $\kappa_\lambda^P$, and $\kappa_R^P$ outside this branch-derived form has introduced independent fit knobs. Such a fit is acceptable only as a failure diagnostic: the branch must split, change readout, or supply a different finite Hessian before the pressure row can be interpreted as a Noether sea response.

The finite-branch source-status boundary in [Noether Braid Envelope Hessian Toy Branch](noether-braid-envelope-hessian-toy-branch.md) also applies here: branch-derived pressure slopes remain blocked when the only upstream artifact is an $A_0$ scanner, Fourier carrier-correction packet, or waveform replay rather than accepted finite-branch Hessian output.

## Contact-Network Contribution

Dense cells also carry contact or near-contact stiffness through the support-function network. Let each retained contact direction $\hat{\mathbf{k}}_{X,a}$ have weight $\omega_{X,a}$, spacing $D_{X,a}$, and gap stiffness $k_{X,a}^{\mathrm{gap}}$ measured as energy per squared length. A minimal positive contribution is

$$
\boxed{
K_{\mathrm{contact},X}
=
\frac{1}{V_{\mathrm{cell},X}^{\mathrm{sf}}}
\sum_{a\in\mathcal{K}_X}
\omega_{X,a}
k_{X,a}^{\mathrm{gap}}
D_{X,a}^2.
}
$$

This term is zero for a loose branch with no active contact network and increases when the declared material state has many near-saturated support-function contacts. It is not ordinary dissipative drag; it is reversible stiffness until the transport residual crosses its threshold.

The candidate density modulus is therefore

$$
\boxed{
K_{\mathrm{pack},X}^{\mathrm{sf}}
=
K_{\mathrm{env},X}
+K_{\mathrm{contact},X}
+K_{\mathrm{wake},X}^{\mathrm{rev}},
}
$$

where $K_{\mathrm{wake},X}^{\mathrm{rev}}$ is a reversible wake-return stiffness. It must be separated from any dissipative transport term in $\mathcal{R}_{\text{tr}}$.

Combining this with the pressure packet gives

$$
\boxed{
K_{\text{sea},X}
=
\kappa_{n,X}K_{\mathrm{pack},X}^{\mathrm{sf}}.
}
$$

The same decomposition supplies the support-function compliance weights used by the Fe/silicate replay. For a branch family $\mathcal B$, collect the positive reversible stiffness channels as

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
K_{\mathrm{res}}^{(\mathcal B)}.
$$

Then the shared weights in

$$
e_X^{\mathrm{sf}}
=
\left(
\frac{V_{\mathrm{cell},X}^{\mathrm{sf}}}{V_*}
\right)^{1/3}
\left(
1+w_uu_X+w_{\phi}h_X+w_{\sigma}\sigma_{\ln D,X}^2
\right)
$$

are not material-local knobs. They are stiffness shares:

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

Thus

$$
0\le w_u,w_{\phi},w_{\sigma}\le1,
\qquad
w_u+w_{\phi}+w_{\sigma}\le1.
$$

The residual share belongs to reversible wake response or other retained positive stiffness channels. If a replay needs different weights for Fe and silicate while claiming one branch family, the pressure-modulus bridge has split and the dense-medium preference has not been derived.

## Spherical Branch Scaling

For an equal near-spherical same-level pool with

$$
R_{\mathrm{excl}}=\alpha_Or_O,
\qquad
V_{\mathrm{cell}}\sim R_{\mathrm{excl}}^3,
$$

the packing scaffold gives

$$
n_{\max}\propto R_{\mathrm{excl}}^{-3}.
$$

If the fixed-speed outer-action branch has $r_O\propto Nh$, then

$$
\boxed{
n_{\max}(N)\propto (Nh)^{-3}.
}
$$

Let the log-radius stiffness be

$$
k_R
\equiv
\left.
\frac{\partial^2E_{\mathrm{env}}}
{\partial(\ln R_{\mathrm{excl}})^2}
\right|_{\Lambda_{\mathrm{NS}}}.
$$

Since $\delta\ln n=-3\delta\ln R_{\mathrm{excl}}$ in the spherical fixed-packing approximation,

$$
\boxed{
K_{\mathrm{pack}}
\approx
\frac{\rho_{\text{NS},0}n}{9}k_R
+K_{\mathrm{contact}}
+K_{\mathrm{wake}}^{\mathrm{rev}}.
}
$$

If $k_R=\eta_R E_O$ with $E_O$ the outer-channel action-energy projection, then

$$
\boxed{
K_{\mathrm{pack}}
\sim
\frac{\eta_R}{9}\rho_{\text{NS},0}nE_O
}
$$

up to contact and reversible wake terms. At fixed occupancy fraction $n/n_{\max}$, this yields the branch scalings

$$
K_{\mathrm{pack}}\propto (Nh)^{-3}E_O.
$$

Thus a fixed-speed branch with approximately constant $E_O$ gives

$$
K_{\mathrm{pack}}\propto (Nh)^{-3},
$$

while a core-cadence branch with $E_N\propto (Nh)^{-1}$ and $E_O=\chi_O^{(q)}E_N$ gives the steeper estimate

$$
K_{\mathrm{pack}}\propto (Nh)^{-4}
$$

when $\chi_O^{(q)}$ is fixed. These are diagnostic scalings, not canon claims. A replay that can distinguish them would constrain the branch energy reading in the packing scaffold.

## Replay Handoff

For each material-pressure row, add or derive the following branch-side quantities before interpreting residuals:

| Quantity | Formula or source | Replay meaning |
| --- | --- | --- |
| $V_{\mathrm{cell},X}^{\mathrm{sf}}$ | support-function lattice-cell record | computes the declared packing ceiling |
| $n_{\max,X}^{\mathrm{sf}}$ | $\nu_{\mathrm{pack},0}/(\rho_{\text{NS},0}V_{\mathrm{cell},X}^{\mathrm{sf}})$ | normalized maximum density under the equality model |
| $s_{n,X}^{\mathrm{sf}}$ | $1-\rho_{\text{NS},X}V_{\mathrm{cell},X}^{\mathrm{sf}}/\nu_{\mathrm{pack},0}$ | density-channel headroom |
| $K_{\mathrm{env},X}$ | $\rho_{\text{NS},0}n_X(\mathbf{c}_X^TH_{\mathrm{env},X}^{-1}\mathbf{c}_X)^{-1}$ | branch envelope stiffness |
| $K_{\mathrm{contact},X}$ | contact-network stiffness sum | reversible dense-contact stiffness |
| $K_{\mathrm{pack},X}^{\mathrm{sf}}$ | $K_{\mathrm{env},X}+K_{\mathrm{contact},X}+K_{\mathrm{wake},X}^{\mathrm{rev}}$ | density modulus entering pressure response |
| $K_{\text{sea},X}$ | $\kappa_{n,X}K_{\mathrm{pack},X}^{\mathrm{sf}}$ | pressure packet scale after $\kappa_n$ is fixed |
| $(A_{H,X},B_{H,X},Q_{H,X})$ | Hessian projection and declared $R_{\text{core}}$ readout | fixes the allowed pressure-side slope direction |
| finite branch evidence | accepted branch segment and Hessian source | distinguishes branch-derived slopes from toy algebra |

The pressure replay should use

$$
\boxed{
\Delta\ln n_X
\approx
s_{n,X}^{\mathrm{sf}}
\frac{\Delta P_X}
{K_{\mathrm{pack},X}^{\mathrm{sf}}}
}
$$

for the density channel, and should reserve $\Delta\ln n_{\max,X}^{\mathrm{obl}}$ for changes in the envelope, orientation, or contact record that shift the ceiling itself.

## Falsification Conditions

1. **Overpacking failure:** a replay row has $s_{n,X}^{\mathrm{sf}}<0$ without a branch split, lattice-state change, or corrected envelope record.
2. **Unbounded density response:** as $s_n\to0$, the data still require finite scalar $\partial\ln n/\partial P$ instead of routing response into shape, strain, contact, transport, or branch transition.
3. **Modulus-row split:** $K_{\mathrm{pack}}$ inferred from $\Gamma_N$, $\chi_{\text{sea}}$, $c_{\text{eff}}$, strain, and $\mathcal{M}_{\text{sea}}^{ab}$ cannot be reconciled with one support-function cell and one branch Hessian.
4. **Dissipation contamination:** the inferred modulus absorbs irreversible heating, radiation, or action-shedding response below the declared transport threshold.
5. **Branch-scaling conflict:** a same-level pool replay requires $n_{\max}(N)$ or $K_{\mathrm{pack}}(N)$ to follow a scaling incompatible with the selected outer-action branch after $\beta_O(N)$ and $E_O(N)$ are declared.
6. **Branch-derived slope violation:** the replay fits $\kappa_n^P$, $\kappa_\lambda^P$, or $\kappa_R^P$ outside $\kappa_n(1,A_H,-Q_H)$ while claiming the same packing headroom, Hessian, and readout.

## Next Closure Target

[Noether Braid Envelope Hessian Toy Branch](noether-braid-envelope-hessian-toy-branch.md) supplies the reduced $2\times2$ Hessian calculation for $(\ln R_\perp,\ln\xi)$, including the projected stiffness $k_{\mathrm{env}}^{(V)}$, stability classifier, induced shape response, and executable scanner handoff. The next unresolved step is finite-branch intake: replace the toy Hessian entries with accepted branch output and require the resulting pressure slopes to keep the branch-derived form above while passing density-sign, scalar-feasibility, and null-sector bounds.
