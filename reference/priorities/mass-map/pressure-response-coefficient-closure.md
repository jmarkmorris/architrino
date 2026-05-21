# Pressure-Response Coefficient Closure Packet

This priority packet closes the coefficient side of the pressure-dependent Noether-Sea response. It is report material, not reader-facing canon. Its purpose is to turn the pressure ansatz into branch-conditional coefficient identities that can be tested by the Fe/Cr or Ni/Co replay without introducing a separate fit row for every observable.

## Claim Level

- **Status:** branch-conditional coefficient closure; no empirical pass claimed.
- **Main claim:** in a branch-preserving pressure perturbation, the cadence, delay, effective-speed, strain, and medium-response tensor channels reduce to a small set of shared isotropic and anisotropic pressure coefficients. Individual values of $a_i$, $b_i$, $\kappa_i$, $m_S$, and $K_{\text{sea}}$ are not observable-local fit freedoms.
- **Open burden:** derive $\kappa_n$, $\kappa_\lambda$, $\kappa_\xi$, $a_i$, $b_i$, $m_S$, $K_{\text{sea}}$, and the packing response from an accepted Noether-core branch or a certified pressure simulation. The density-side modulus and headroom target is now staged in [Noether-Sea Pressure Modulus and Packing Headroom](noether-sea-pressure-modulus-and-packing-headroom.md).
- **Promotion target:** none until the pressure response survives a shared-row replay and the Lorentz, clock/signal, dispersion, birefringence, and transport null sectors remain below bound.

## Source Anchors

- [Pressure-Dependent Noether-Sea Constitutive Response](pressure-dependent-noether-sea-constitutive-response.md) defines $\Pi_\ell$, $\Pi_\ell^{\parallel-\perp}$, $\chi_{\text{sea}}$, $\Gamma_N$, and $\mathcal{M}_{\text{sea}}^{ab}$ for atomic and metallic-lattice pressure cells.
- [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) fixes $b_\xi=1$ on the homogeneous moving-core Lorentz branch and fixes only one static weak-field isotropic combination, $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$.
- [Noether-Core Scaling and Packing Scaffold](../dyadic-lock/noether-core-scaling-and-packing.md) supplies the current priority-side packing ceiling and exclusion-volume scaffold for $n_{\max}^{\mathrm{obl}}$.
- [$A_0$ Medium-Response Tensor Probe](a0-medium-response-tensor-probe.md) fixes the homogeneous tensor target $\mathcal{M}_{\text{sea}}^{ab}\to h^{ab}/c_{\text{eff}}^2$.
- [Metallic-Lattice Pressure Replay Data Schema](pressure-replay-metallic-lattice-data-schema.md) supplies the replay record, channel mask, covariance, shared-row fit, and null-sector bounds that consume these identities.

## First-Order Pressure Variables

Work around one branch-preserving material state. Write

$$
\Pi\equiv\Pi_\ell,
\qquad
A\equiv\Pi_\ell^{\parallel-\perp},
\qquad
s_n\equiv1-\frac{\bar n}{\bar n_{\max}^{\mathrm{obl}}},
$$

where $A$ is the anisotropic pressure-loading entry and $s_n$ is the local packing headroom. Define the pressure derivatives

$$
r_P
\equiv
\partial_{\Pi}\ln\frac{R_{\text{core}}}{R_{\text{core},0}},
\qquad
r_A
\equiv
\partial_A\ln\frac{R_{\text{core}}}{R_{\text{core},0}},
$$

and the retained strain projections

$$
\hat{k}^iS_{ij}^{\mathrm{dev}}\hat{k}^j
=s_{\hat k}A,
\qquad
S_2=s_{\mathcal M}A,
\qquad
\delta S_{\mathrm{dev}}=s_SA.
$$

Here $S_2$ is the quadrupolar or directional strain projection used by the $\delta\mathcal{M}_2$ replay channel, and $s_S$ is the retained strain-channel projection for the replay row.

The tensor replay must use the same projection convention as the $A_0$ medium-response tensor probe. For a dimensionless perturbation $\Delta_{\mathcal M}^{ab}$, define

$$
\delta\mathcal{M}_{0}
\equiv
\frac{1}{3}h_{ab}\Delta_{\mathcal M}^{ab},
\qquad
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\equiv
\left(
\delta^a{}_c\delta^b{}_d
-
\frac{1}{3}h^{ab}h_{cd}
\right)
\Delta_{\mathcal M}^{cd},
$$

and

$$
\delta\mathcal{M}_{2}(\hat e)
\equiv
\hat e_a\hat e_b\delta\mathcal{M}_{\mathrm{tf}}^{ab}.
$$

The scalar $S_2=s_{\mathcal M}A$ is therefore shorthand for the retained trace-free projection of $S_{\mathrm{dev}}^{ab}$ along the declared replay direction. It must not be replaced by an independently fitted tensor row.

The branch-preserving first-order perturbation record is

$$
\delta\ln n=\kappa_n s_n\Pi,
\qquad
\delta\ln\lambda=-\kappa_\lambda\Pi,
\qquad
\delta(-\ln\xi)=\kappa_\xi A,
$$

$$
\delta\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
=
r_P\Pi+r_AA.
$$

Higher-order saturation, branch crossing, and transport-threshold terms belong in residuals, not in per-channel coefficient refits.

## Delay and Effective-Speed Coefficients

Using the pressure packet's delay law,

$$
\ln\chi_{\text{sea}}
=
a_n\ln n
+a_\lambda(-\ln\lambda)
+a_\xi(-\ln\xi)
+a_S\hat{k}^iS_{ij}^{\mathrm{dev}}\hat{k}^j
+\mathcal{R}_{\chi},
$$

the first-order delay response is

$$
\delta\ln\chi_{\text{sea}}
=
C_{\chi}^{\mathrm{iso}}\Pi
+C_{\chi}^{\mathrm{aniso}}A
+\mathcal{R}_{\chi}^{(2)},
$$

with

$$
\boxed{
C_{\chi}^{\mathrm{iso}}
=a_n\kappa_n s_n+a_\lambda\kappa_\lambda
}
$$

and

$$
\boxed{
C_{\chi}^{\mathrm{aniso}}
=a_\xi\kappa_\xi+a_Ss_{\hat k}.
}
$$

The effective-speed channel is not independent:

$$
\boxed{
\delta\ln\frac{c_{\text{eff}}}{c_f}
=
-\delta\ln\chi_{\text{sea}}.
}
$$

Any replay that lets $\delta\ln(c_{\text{eff}}/c_f)$ and $\delta\ln\chi_{\text{sea}}$ fit unrelated rows violates the pressure law before the material comparison begins.

## Cadence Coefficients

The cadence extraction record is

$$
\ln\Gamma_N
=
b_n\ln n
+b_\chi\ln\chi_{\text{sea}}
+b_\lambda\ln\lambda
-b_\xi\ln\xi
+b_R\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
+\mathcal{R}_{\Gamma}^{P}.
$$

The homogeneous moving-core branch supplies

$$
\boxed{
b_\xi=1+\mathcal{R}_{\mathrm{LV}},
\qquad
|\mathcal{R}_{\mathrm{LV}}|\le\epsilon_{\mathrm{LV}}.
}
$$

Therefore the first-order pressure cadence response is

$$
\delta\ln\Gamma_N
=
C_{\Gamma}^{\mathrm{iso}}\Pi
+C_{\Gamma}^{\mathrm{aniso}}A
+\mathcal{R}_{\Gamma}^{(2)},
$$

where

$$
\boxed{
C_{\Gamma}^{\mathrm{iso}}
=
(b_n+b_\chi a_n)\kappa_n s_n
+(b_\chi a_\lambda-b_\lambda)\kappa_\lambda
+b_Rr_P
}
$$

and

$$
\boxed{
C_{\Gamma}^{\mathrm{aniso}}
=
(1+b_\chi a_\xi)\kappa_\xi
+b_\chi a_Ss_{\hat k}
+b_Rr_A
+\mathcal{R}_{\mathrm{LV}}\kappa_\xi.
}
$$

The weak static endpoint gives a separate normalization condition, not a pressure fit rule. With

$$
\mathbf{g}_N
=
\left(
\ln n,\,
\ln\chi_{\text{sea}},\,
\ln\lambda,\,
-\ln\xi,\,
\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
\right)^T
$$

and

$$
\mathbf{u}_{\mathrm{stat}}
\equiv
\partial_{U/c_0^2}\mathbf{g}_N
=
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
0,\,
a_R
\right)^T,
$$

the static endpoint constraint is

$$
\boxed{
\mathbf{b}_N\cdot\mathbf{u}_{\mathrm{stat}}
=
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R
=1+\mathcal{R}_{\mathrm{stat}}.
}
$$

This condition can calibrate the pressure row only after a branch calculation relates $(a_\chi,a_R)$ to the pressure-side coefficients $(a_\lambda,a_\xi,a_S,r_P,r_A)$. Until then, it is a boundary condition on admissible coefficient rows.

## Medium-Response Tensor Projection

The pressure packet uses

$$
\mathcal{M}_{\text{sea}}^{ab}
=
\frac{\chi_{\text{sea}}^2}{c_f^2}
\left(
h^{ab}
+m_SS_{\mathrm{dev}}^{ab}
\right)
+\mathcal{R}_{\mathcal M}^{ab}.
$$

Equivalently, in the projected tensor residual,

$$
\Delta_{\mathcal M}^{ab}
=
2\,\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}\,h^{ab}
+2\,\delta\ln\chi_{\text{sea}}^{\mathrm{aniso}}\,Q_{\chi}^{ab}
+m_SS_{\mathrm{dev}}^{ab}
+\mathcal{R}_{\mathcal M,\Delta}^{ab}
$$

to first order. The trace projection removes the deviatoric strain term, while the trace-free projection removes the isotropic pressure term:

$$
\frac{1}{3}h_{ab}\Delta_{\mathcal M}^{ab}
=
2\,\delta\ln\chi_{\text{sea}}^{\mathrm{iso}}
+\frac{1}{3}h_{ab}\mathcal{R}_{\mathcal M,\Delta}^{ab},
$$

$$
\left(
\delta^a{}_c\delta^b{}_d
-
\frac{1}{3}h^{ab}h_{cd}
\right)
\Delta_{\mathcal M}^{cd}
=
2\,\delta\ln\chi_{\text{sea}}^{\mathrm{aniso}}\,Q_{\chi}^{ab}
+m_SS_{\mathrm{dev}}^{ab}
+\mathcal{R}_{\mathcal M,\mathrm{tf}}^{ab}.
$$

Here $Q_{\chi}^{ab}$ is the declared trace-free delay-anisotropy projection for the replay direction, with $h_{ab}Q_{\chi}^{ab}=0$. Its retained scalar projection is already included in $C_{\chi}^{\mathrm{aniso}}A$; it is not an extra coefficient.

To first order, the isotropic tensor channel must satisfy

$$
\boxed{
\delta\mathcal{M}_{0}
=
2C_{\chi}^{\mathrm{iso}}\Pi
+\mathcal{R}_{\mathcal M0}.
}
$$

The leading directional channel must satisfy

$$
\boxed{
\delta\mathcal{M}_{2}
=
\left(
2C_{\chi}^{\mathrm{aniso}}
+m_Ss_{\mathcal M}
\right)A
+\mathcal{R}_{\mathcal M2}.
}
$$

Thus the tensor channel is not a sixth independent pressure response. It is the same delay coefficient plus the explicit strain-response coefficient.

## Exposed-Pressure Trace Consequence

The pressure tensor closure has a direct mass-map consequence once it is composed with the exposed inertial-response trace. This is a priority-side theorem target, not a completed pressure prediction.

Let

$$
M_{0}^{\mathrm{src}}(A)
\equiv
\zeta(A)E_{\text{internal}}(A)
$$

be the scalar exposed source after the mass-facing exposure quotient has descended. Around the weak homogeneous reference cell, the scalar mass trace has the first-order form

Also define the trace-free exposed numerator

$$
\mathcal{N}_{\mathrm{tf},ab}(A)
\equiv
E_{\text{internal}}(A)\mathcal{Z}_{\mathrm{tf},ab}(A).
$$

$$
m_{\mathrm{tr}}(A)
=
\alpha_{\mathrm{m}}
\frac{1}{c_{\text{eff},0}^{2}}
\left[
M_{0}^{\mathrm{src}}(A)(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}
E_{\text{internal}}(A)
\mathcal{Z}_{\mathrm{tf},ab}(A)
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
+
\mathcal{R}_{\mathrm{trace}}.
$$

Substituting the pressure-row tensor identities gives the first-order pressure shift

$$
\delta_P m_{\mathrm{tr}}(A)
=
\alpha_{\mathrm{m}}
\frac{1}{c_{\text{eff},0}^{2}}
\left[
\delta_P M_{0}^{\mathrm{src}}(A)
+
2M_{0}^{\mathrm{src}}(A)C_{\chi}^{\mathrm{iso}}\Pi
+
\frac{1}{3}
E_{\text{internal}}(A)
\mathcal{Z}_{\mathrm{tf},ab}(A)
\left(
2C_{\chi}^{\mathrm{aniso}}Q_{\chi}^{ab}
+
m_SS_{\mathrm{dev}}^{ab}
\right)A
\right]
+
\mathcal{R}_{\mathrm{comp}}.
$$

This equation is the subthreshold exposed-pressure trace lemma. Below $\mathcal{R}_{\text{tr},*}$, pressure changes scalar mass trace only through a quotient-visible exposed-source change $\delta_PM_{0}^{\mathrm{src}}$, the shared isotropic delay-pressure coefficient $C_{\chi}^{\mathrm{iso}}$, and the trace-free contraction of exposed anisotropy with the reversible symmetric pressure-dressed medium tensor. A pressure replay that improves the scalar mass trace by introducing an independent $\delta\mathcal{M}_0$ row, a hidden source-handle shift, or an unlogged loss term has not advanced the mass map; it has split the branch or left the reversible domain.

The pressure row also fixes the response-visible trace-free span for this specialization. At first order the pressure-visible span is contained in

$$
\mathcal{V}_{P,A}
\subseteq
\operatorname{span}
\left\{
Q_{\chi}^{ab},
S_{\mathrm{dev}}^{ab}
\right\},
$$

or in the smaller span of the declared combination when the branch replay retains only one pressure direction. Therefore the pressure trace constrains only the projection of $E_{\text{internal}}(A)\mathcal{Z}_{\mathrm{tf},ab}(A)$ onto $\mathcal{V}_{P,A}$. A trace-free exposure difference orthogonal to $Q_{\chi}^{ab}$ and $S_{\mathrm{dev}}^{ab}$ is not a pressure scalar-mass handle in this row, although it may still be visible to another retained tensor probe.

The displayed pressure equation is the weak homogeneous first-order form. In a finite background anisotropy, the product-rule form is

$$
\delta_Pm_{\mathrm{tr}}
=
\alpha_{\mathrm{m}}
\frac{1}{c_{\text{eff},0}^{2}}
\left[
(1+\delta\mathcal{M}_0)\delta_PM_0^{\mathrm{src}}
+
M_0^{\mathrm{src}}\delta_P\delta\mathcal{M}_0
+
\frac{1}{3}
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\delta_P\mathcal{N}_{\mathrm{tf},ab}
+
\frac{1}{3}
\mathcal{N}_{\mathrm{tf},ab}
\delta_P\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
+
\mathcal{R}_{P}^{\mathrm{full}}.
$$

The residual $\mathcal{R}_{\mathrm{comp}}$ or $\mathcal{R}_{P}^{\mathrm{full}}$ must retain second-order pressure terms, exposure drift not yet proven to descend through the quotient, internal-energy drift beyond $M_{0}^{\mathrm{src}}$, tensor residuals $\mathcal{R}_{\mathcal M}^{ab}$, projection-label mismatch, medium-label drift, and thresholded transport events. In particular, residual terms include

$$
M_0^{\mathrm{src}}\mathcal{R}_{\mathcal M0},
\qquad
\frac{1}{3}
\mathcal{N}_{\mathrm{tf},ab}
\mathcal{R}_{\mathcal M,\mathrm{tf}}^{ab},
\qquad
\delta\mathcal{M}_0\,\delta_PM_0^{\mathrm{src}},
\qquad
\frac{1}{3}
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\delta_P\mathcal{N}_{\mathrm{tf},ab}.
$$

If the restored representative changes the medium response itself, the common-medium assumption has failed unless

$$
\mathcal{R}_{\mathrm{med-label}}
=
M_0^{\mathrm{src}}\Delta_d\delta\mathcal{M}_0
+
\frac{1}{3}
\mathcal{N}_{\mathrm{tf},ab}
\Delta_d\delta\mathcal{M}_{\mathrm{tf}}^{ab}
$$

is below tolerance.

Two special cases are useful as branch diagnostics:

$$
\boxed{
\delta\mathcal{M}_{2}=0
\quad\Longrightarrow\quad
\left(
2C_{\chi}^{\mathrm{aniso}}
+m_Ss_{\mathcal M}
\right)A
=
-\mathcal{R}_{\mathcal M2}
}
$$

and, if the signal-delay anisotropy is also null on the same branch,

$$
\boxed{
C_{\chi}^{\mathrm{aniso}}A
=
O(\epsilon_{\mathrm{biref}}+\epsilon_{\gamma\mathrm{disp}}+\epsilon_{\mathrm{LV}}),
\qquad
m_Ss_{\mathcal M}A
=
O(\epsilon_{\mathcal M2}+\epsilon_{\mathrm{biref}}+\epsilon_{\gamma\mathrm{disp}}+\epsilon_{\mathrm{LV}}).
}
$$

Thus a nonzero strain record with null signal and null tensor response is a cancellation certificate, not a permission to fit $m_S$ independently. If the cancellation holds in one direction but fails in another retained direction, the replay must split the branch state or demote the anisotropic pressure row.

## Replay Coefficient Matrix

For the retained residual vector

$$
\mathbf{y}
=
\left(
\delta\ln\Gamma_N,\,
\delta\ln\chi_{\text{sea}},\,
\delta\ln(c_{\text{eff}}/c_f),\,
\delta\mathcal{M}_{0},\,
\delta\mathcal{M}_{2},\,
\delta S_{\mathrm{dev}}
\right)^T,
$$

the coefficient closure predicts the schematic first-order matrix

$$
B_P^{(1)}
=
\begin{pmatrix}
C_{\Gamma}^{\mathrm{iso}} & C_{\Gamma}^{\mathrm{aniso}} & 0 & C_{\Gamma}^{Z}\\
C_{\chi}^{\mathrm{iso}} & C_{\chi}^{\mathrm{aniso}} & 0 & C_{\chi}^{Z}\\
-C_{\chi}^{\mathrm{iso}} & -C_{\chi}^{\mathrm{aniso}} & 0 & -C_{\chi}^{Z}\\
2C_{\chi}^{\mathrm{iso}} & 0 & C_{\mathcal M0}^{\mathrm{pack}} & 2C_{\chi}^{Z}\\
0 & 2C_{\chi}^{\mathrm{aniso}}+m_Ss_{\mathcal M} & C_{\mathcal M2}^{\mathrm{pack}} & C_{\mathcal M2}^{Z}\\
0 & s_S & C_S^{\mathrm{pack}} & C_S^Z
\end{pmatrix}.
$$

The columns match the replay record

$$
\mathbf{q}
=
\left(
\Delta\Pi,\,
\Delta\Pi^{\parallel-\perp},\,
\Delta\ln n_{\max}^{\mathrm{obl}},\,
C_M\left(\frac{Z_M}{Z_*}\right)^{\eta_Z}\frac{\Delta P_{\mathrm{ext},M}}{K_{\text{sea}}}
\right)^T.
$$

The $Z$-weighted column is not a new observable row. It is the same pressure law written through the heavy-atom source amplitude. If the replay has already folded heavy-atom loading into $\Delta\Pi$, the $C_i^Z$ column should be masked or constrained to prevent double counting.

## Heavy-Scaling Constraint

For matched isotropic pressure steps with the anisotropic and packing columns masked, any retained channel $Y_i$ with nonzero shared coefficient predicts

$$
\frac{\partial Y_i^M}{\partial P_{\mathrm{ext},M}}
\approx
C_i^{\mathrm{iso}}
\frac{C_M}{K_{\text{sea},M}}
\left(\frac{Z_M}{Z_*}\right)^{\eta_Z}
\mathcal{S}_{M}^{\mathrm{pack}},
$$

where $\mathcal{S}_{M}^{\mathrm{pack}}$ carries the declared packing headroom and ordinary material-state factors for material $M$. Therefore

$$
\boxed{
\mathcal{A}_{Y_i}^{H/L}
\equiv
\frac{\partial Y_i^H/\partial P_{\mathrm{ext},H}}
{\partial Y_i^L/\partial P_{\mathrm{ext},L}}
\approx
\frac{C_H}{C_L}
\left(\frac{Z_H}{Z_L}\right)^{\eta_Z}
\frac{K_{\text{sea},L}}{K_{\text{sea},H}}
\frac{\mathcal{S}_{H}^{\mathrm{pack}}}{\mathcal{S}_{L}^{\mathrm{pack}}}.
}
$$

The same $\eta_Z$ must survive across $\Gamma_N$, $\chi_{\text{sea}}$, $c_{\text{eff}}$, $\mathcal{M}_0$, $\mathcal{M}_2$, and strain after masks and branch states are declared. A replay that needs one $\eta_Z$ for spectroscopy and another for signal, tensor, or strain channels is a shared-law failure unless a branch transition is explicitly logged.

## Null-Sector Coefficient Bounds

The clock/signal identity requires

$$
\boxed{
\left|
\delta\ln\frac{c_{\text{eff}}}{c_f}
+\delta\ln\chi_{\text{sea}}
\right|
\le
\epsilon_{\mathrm{clksig}}.
}
$$

The anisotropic signal-delay sector requires

$$
\boxed{
\left|C_{\chi}^{\mathrm{aniso}}A\right|
\le
\epsilon_{\mathrm{biref}}
+\epsilon_{\gamma\mathrm{disp}}
+\epsilon_{\mathrm{LV}}.
}
$$

The directional tensor sector requires

$$
\boxed{
\left|
\left(
2C_{\chi}^{\mathrm{aniso}}
+m_Ss_{\mathcal M}
\right)A
\right|
\le
\epsilon_{\mathcal M2}.
}
$$

If the anisotropic signal sector is null while the strain record is nonzero, the pressure branch must satisfy the cancellation conditions

$$
C_{\chi}^{\mathrm{aniso}}=0,
\qquad
m_Ss_{\mathcal M}=0,
$$

within tolerance, or the anisotropic pressure response must be demoted for that branch.

If the signal sector is allowed but the directional tensor sector is null, the weaker tensor-only cancellation condition is

$$
2C_{\chi}^{\mathrm{aniso}}
+m_Ss_{\mathcal M}=0
$$

within the $\epsilon_{\mathcal M2}$ budget. This condition is admissible only as a declared branch identity; it fails if separate cancellations are required for Fe/Cr versus Ni/Co, for different replay directions, or for different observable extractors in the same branch state.

## Falsification Conditions

1. **Effective-speed split:** $\delta\ln(c_{\text{eff}}/c_f)$ and $-\delta\ln\chi_{\text{sea}}$ require different pressure rows in the same branch state.
2. **Cadence-row split:** $\delta\ln\Gamma_N$ cannot be written with the shared $C_{\Gamma}^{\mathrm{iso}}$ and $C_{\Gamma}^{\mathrm{aniso}}$ combinations while preserving $b_\xi=1$ within the preferred-frame bound.
3. **Tensor-row split:** $\delta\mathcal{M}_0$ or $\delta\mathcal{M}_2$ requires a tensor coefficient independent of $C_{\chi}^{\mathrm{iso}}$, $C_{\chi}^{\mathrm{aniso}}$, and the declared strain coefficient $m_S$.
4. **Heavy-scaling split:** the Fe/Cr or Ni/Co replay needs channel-dependent $\eta_Z$ values after ordinary material corrections and branch-state splits are declared.
5. **Null-sector violation:** any pressure-row fit exceeds birefringence, photon-dispersion, preferred-frame, clock/signal, or transport-threshold bounds.
6. **Projection mismatch:** trace and trace-free tensor extractions use direction labels or normalization conventions different from the declared strain and pressure-loading record.
7. **Static-endpoint conflict:** a coefficient row that fits pressure response cannot satisfy the Lorentz branch and the weak static endpoint condition within its residual budget.

## Next Closure Target

[Noether-Sea Pressure Modulus and Packing Headroom](noether-sea-pressure-modulus-and-packing-headroom.md) converts the former open $K_{\text{sea}}$ target into the branch-density modulus relation $K_{\mathrm{pack}}=K_{\text{sea}}/\kappa_n$, the support-function headroom $s_n=1-n/n_{\max}^{\mathrm{obl}}$, and the first scaling laws for $K_{\mathrm{pack}}(N)$. [Noether-Core Envelope Hessian Toy Branch](noether-core-envelope-hessian-toy-branch.md) supplies the reduced $H_{\mathrm{env}}$ projection needed to decide whether isotropic pressure also forces $\lambda$ and $\xi$ response.
