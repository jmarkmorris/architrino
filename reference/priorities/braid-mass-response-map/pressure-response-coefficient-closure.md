# Pressure-Response Coefficient Closure Packet

This priority packet closes the coefficient side of the pressure-dependent Noether sea response. It is report material, not reader-facing canon. Its purpose is to turn the pressure ansatz into branch-conditional coefficient identities that can be tested by the Fe/Cr or Ni/Co replay without introducing a separate fit row for every observable.

## Claim Level

- **Status:** branch-conditional coefficient closure; no empirical pass claimed.
- **Main claim:** in a branch-preserving pressure perturbation, the cadence, delay, effective-speed, strain, and medium-response tensor channels reduce to a small set of shared isotropic and anisotropic pressure coefficients. Individual values of $a_i$, $b_i$, $\kappa_i$, $m_S$, and $K_{\text{sea}}$ are not observable-local fit freedoms.
- **Open burden:** derive $\kappa_n$, $\kappa_\lambda$, $\kappa_\xi$, $a_i$, $b_i$, $m_S$, $K_{\text{sea}}$, and the packing response from an accepted Noether braid branch or a certified pressure simulation. Any mass-facing pressure row must also pass the retained pressure-row receiver-normal simulation target below, with same-record $D_s$, $D_t$, $W^{\mathrm{rec}}$, exposure, energy, Noether sea response, and pressure rows on one retained branch identity. The density-side modulus and headroom target is now staged in [Noether sea Pressure Modulus and Packing Headroom](noether-sea-pressure-modulus-and-packing-headroom.md).
- **Promotion target:** none until the pressure response survives a shared-row replay and the Lorentz, clock/signal, dispersion, birefringence, and transport null sectors remain below bound.

## Source Anchors

- [Pressure-Dependent Noether sea Constitutive Response](pressure-dependent-noether-sea-constitutive-response.md) defines $\Pi_\ell$, $\Pi_\ell^{\parallel-\perp}$, $\chi_{\text{sea}}$, $\Gamma_N$, and $\mathcal{M}_{\text{sea}}^{ab}$ for atomic and metallic-lattice pressure cells.
- [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) fixes $b_\xi=1$ on the homogeneous moving-core Lorentz branch and fixes only one static weak-field isotropic combination, $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$.
- [Noether Braid Scaling and Packing Scaffold](../braid-doubling-frequency-lock/noether-braid-scaling-and-packing.md) supplies the current priority-side packing ceiling and exclusion-volume scaffold for $n_{\max}^{\mathrm{obl}}$.
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

### Branch-Conditional Coefficient Artifact

The coefficient artifact consumed by a future accepted branch is the record

$$
\mathcal{C}_{P,A}
=
\left(
\mathcal{I}_{P,A},
C_{\mathrm{tr}}^{\mathrm{iso}},
C_{\mathrm{tr}}^{\mathrm{tf}},
\mathcal{R}_{\mathrm{nohandle}}^{P},
\mathcal{S}_{P,A}
\right),
$$

where $\mathcal{I}_{P,A}$ is the branch intake, $C_{\mathrm{tr}}^{\mathrm{iso}}$ is the scalar trace/isotropic pressure coefficient, $C_{\mathrm{tr}}^{\mathrm{tf}}$ is the retained trace-free pressure functional, $\mathcal{R}_{\mathrm{nohandle}}^{P}$ is the no-hidden-mass-handle residual, and $\mathcal{S}_{P,A}$ is the pass/fail status vector. This is a closure object for coefficient accounting only; it is not an empirical pressure pass, a particle-mass prediction, or a PDG score movement.

The branch intake must be emitted before any replay residual is inspected:

| Intake field | Required branch source |
| --- | --- |
| `accepted_branch_id` | accepted Noether braid branch or branch-preserving material segment |
| `receiver_normal_weight_record` | same-row $D_s$, $D_t$, and $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ rows for the retained roots consumed by exposure, pressure, and response tensors |
| `source_record` | $E_{\text{internal}}(A)$, $\zeta(A)$, $M_0^{\mathrm{src}}(A)$, and $\mathcal{N}_{\mathrm{tf},ab}(A)$ from the exposure quotient |
| `pressure_record` | declared $\Pi$, $A$, $s_n$, $Q_{\chi}^{ab}$, $S_{\mathrm{dev}}^{ab}$, and the retained replay direction |
| `coefficient_record` | branch-emitted $C_{\chi}^{\mathrm{iso}}$, $C_{\chi}^{\mathrm{aniso}}$, $m_S$, and any masked packing or heavy-scaling columns |
| `reversible_domain` | $\mathcal{R}_{\mathrm{tr}}<\mathcal{R}_{\text{tr},*}$ with no unlogged excitation, heating, radiation-like shedding, or branch transition |
| `null_sector_record` | clock/signal, birefringence, photon-dispersion, preferred-frame, directional-tensor, and transport bounds |

The scalar trace/isotropic coefficient is

$$
\boxed{
C_{\mathrm{tr}}^{\mathrm{iso}}(A)
\equiv
\partial_{\Pi}\delta_PM_{0}^{\mathrm{src}}(A)
+
2M_{0}^{\mathrm{src}}(A)C_{\chi}^{\mathrm{iso}}.
}
$$

This coefficient is branch-conditional because both terms must descend from the same retained branch record. If $\partial_{\Pi}\delta_PM_{0}^{\mathrm{src}}$ is not quotient-visible, the scalar pressure coefficient is `pending_source_descent` rather than zero.

The retained trace-free coefficient is the linear functional

$$
\boxed{
C_{\mathrm{tr}}^{\mathrm{tf}}(A)[B]
\equiv
\frac{1}{3}
\mathcal{N}_{\mathrm{tf},ab}(A)B^{ab},
\qquad
B^{ab}\in\mathcal{V}_{P,A}.
}
$$

For the first-order pressure row, the branch supplies the argument

$$
B_P^{ab}
=
2C_{\chi}^{\mathrm{aniso}}Q_{\chi}^{ab}
+
m_SS_{\mathrm{dev}}^{ab},
$$

so the pressure-visible trace-free contribution is $C_{\mathrm{tr}}^{\mathrm{tf}}(A)[B_P]A$. If the retained replay direction masks anisotropy, then $\mathcal{V}_{P,A}=\{0\}$ for this row and the artifact reports `tf_bound_only`; it must not fit a replacement tensor coefficient.

The no-hidden-mass-handle residual checks that no discarded representative label $d$ changes the scalar or retained trace-free pressure coefficient:

$$
\mathcal{R}_{\mathrm{nohandle}}^{P}
=
\max_d
\left[
\frac{
\left|
\Delta_d C_{\mathrm{tr}}^{\mathrm{iso}}
\right|
}{
\left|
C_{\mathrm{tr}}^{\mathrm{iso}}
\right|
+
\epsilon_{\mathrm{tr,iso}}
},
\,
\sup_{\substack{B\in\mathcal{V}_{P,A}\\ \|B\|_h\le1}}
\frac{
\left|
C_{\mathrm{tr}}^{\mathrm{tf}}[B;d]
-
C_{\mathrm{tr}}^{\mathrm{tf}}[B]
\right|
}{
\left|
C_{\mathrm{tr}}^{\mathrm{tf}}[B]
\right|
+
\epsilon_{\mathrm{tr,tf}}
}
\right].
$$

Here the restored-label comparison is a validation diagnostic, not a construction input. A nonzero residual above tolerance means the discarded label is pressure-mass-visible; the branch must retain the label, split the branch state, or demote the scalar pressure row.

The status vector is deliberately fail-closed:

| Status key | Pass condition | Fail or bound-only reading |
| --- | --- | --- |
| `source_descent` | $M_0^{\mathrm{src}}$ and $\partial_P M_0^{\mathrm{src}}$ descend through the mass-facing exposure quotient. | `pending_source_descent` or `source_nondescent` |
| `branch_intake` | The pressure coefficient row is bound to an accepted finite-branch source record with accepted history, same-row receiver-normal branch-strength data, quotient chart identity, stability or branch-gap status, eta-ladder status when required, and branch-emitted pressure/Hessian or response entries. | `finite_branch_evidence_missing` |
| `receiver_normal_same_record` | Same-row $D_s$, $D_t$, and $W^{\mathrm{rec}}$ are present for the retained roots consumed by exposure, pressure, and response tensors. | `receiver_normal_same_record_missing` |
| `isotropic_trace` | $C_{\mathrm{tr}}^{\mathrm{iso}}$ is computed from branch-emitted $\partial_{\Pi}\delta_PM_0^{\mathrm{src}}$ and $C_{\chi}^{\mathrm{iso}}$. | `coefficient_fit_contamination` if either term is replay-fitted after benchmark comparison |
| `trace_free_span` | $\mathcal{V}_{P,A}$ is declared before the replay and $B_P^{ab}\in\mathcal{V}_{P,A}$. | `tf_bound_only` when anisotropy is masked; `projection_mismatch` when directions drift |
| `no_hidden_mass_handle` | $\mathcal{R}_{\mathrm{nohandle}}^{P}\le\epsilon_{\mathrm{nohandle}}^{P}$. | `hidden_pressure_mass_handle` |
| `reversible_domain` | $\mathcal{R}_{\mathrm{tr}}<\mathcal{R}_{\text{tr},*}$ and loss channels are closed. | `threshold_event` or `loss_below_threshold` |
| `null_sector` | all null-sector bounds remain below their declared budgets. | `metric_null_violation` |

### Finite-Branch Intake Boundary

The pressure coefficient artifact inherits the finite-branch source-status rule
from the envelope-Hessian pressure work. A row cannot upgrade from algebraic
coefficient accounting to branch-derived pressure response unless it carries

$$
\mathcal{I}_{P,A}^{\mathrm{branch}}
=
\left(
\mathsf{branch\_id},
\mathsf{accepted\_history\_segment\_id},
\mathsf{receiver\_normal\_weight\_record},
\mathsf{source\_path},
\mathsf{quotient\_chart\_id},
\mathsf{residual\_status},
\mathsf{gap\_or\_stability\_status},
\mathsf{eta\_ladder\_status},
\mathsf{pressure\_record},
\mathsf{exposure\_source\_record},
\mathsf{pressure\_response\_record},
\mathsf{reversible\_domain},
\mathsf{null\_sector\_record}
\right).
$$

The accepted-history source must include the path to the priority packet or
generated report that emits it. The receiver-normal weight record must report
same-row $D_s$, $D_t$, and $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ for the
retained roots consumed by the pressure response. Scanner, correction-packet,
waveform-replay, toy-Hessian, empirical pressure, H39/theta3minus quotient
diagnostics, or source-mining rows may be cited as diagnostics, but they must
produce `finite_branch_evidence_missing` unless the same record also supplies
the accepted history segment, receiver-normal weight record, quotient chart
identity, source path, positive branch-gap or stability status, required
eta-ladder persistence, pressure record, branch-emitted exposure and
pressure-response records, reversible-domain row, and null-sector record.

Current status for $\mathcal{C}_{P,A}$ is
`finite_branch_evidence_missing`: no accepted branch currently emits
$E_{\text{internal}}(A)$, $\zeta(A)$, $M_0^{\mathrm{src}}(A)$,
$\mathcal{N}_{\mathrm{tf},ab}(A)$,
$\partial_PM_0^{\mathrm{src}}(A)$, $C_{\chi}^{\mathrm{iso}}$,
$C_{\chi}^{\mathrm{aniso}}$, and $m_S$ on one retained pressure row.
Therefore every Fe/Cr, Ni/Co, or toy replay remains algebraic or empirical
screening only until the branch intake is present.

The smallest accepted branch-intake object is one retained pressure row, not a
cross-row bundle. Its required fields are:

| Field | Required same-row content | Current reading |
| --- | --- | --- |
| `branch_id` | Accepted finite branch identity for the row. | absent |
| `accepted_history_segment_id` | History segment emitted by the accepted branch packet or generated report. | absent |
| `receiver_normal_weight_record` | Same-row $D_s$, $D_t$, and $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ rows for the retained roots used by the pressure response. | absent |
| `source_path` | Path to the accepted branch packet or generated report that emits the history segment. | absent |
| `quotient_chart_id` | Exposure quotient chart used by the mass-facing source row. | absent |
| `residual_status` | Pass/fail residual status for the same pressure row. | absent |
| `gap_or_stability_status` | Positive branch-gap or stability status for the same row. | absent |
| `eta_ladder_status` | Eta-ladder persistence status when the row requires it. | absent |
| `pressure_record` | Branch-emitted $\Pi$, $A$, $s_n$, $Q_{\chi}^{ab}$, $S_{\mathrm{dev}}^{ab}$, and retained replay direction. | absent |
| `exposure_source_record` | Branch-emitted $E_{\text{internal}}(A)$, $\zeta(A)$, $M_0^{\mathrm{src}}(A)$, and $\mathcal{N}_{\mathrm{tf},ab}(A)$. | absent |
| `pressure_response_record` | Branch-emitted $\partial_PM_0^{\mathrm{src}}(A)$, $C_{\chi}^{\mathrm{iso}}$, $C_{\chi}^{\mathrm{aniso}}$, and $m_S$. | absent |
| `reversible_domain` | Same-row $\mathcal{R}_{\mathrm{tr}}$, threshold $\mathcal{R}_{\mathrm{tr},*}$, and closed loss-channel status. | absent |
| `null_sector_record` | Same-row clock/signal, birefringence, photon-dispersion, preferred-frame, directional-tensor, and transport records. | absent |

Any replay missing one row in this table remains
`finite_branch_evidence_missing`, even if its algebraic pressure residual is
small or its empirical trend is suggestive.

### Current Fail-Closed Branch-Intake Record

The current branch-intake record is diagnostic-only. It preserves the fields
that a future retained pressure row must populate without allowing current A0,
Hessian, Fe/Cr, or Ni/Co material to stand in for accepted branch evidence.

| Field | Current source reading | Verdict |
| --- | --- | --- |
| `branch_id` | A0 rest diagnostic and toy rows only | absent for retained pressure row |
| `accepted_history_segment_id` | no accepted finite pressure-row history segment | `finite_branch_evidence_missing` |
| `receiver_normal_weight_record` | no same-row $D_s$, $D_t$, and $W^{\mathrm{rec}}$ record for the pressure response | absent |
| `source_path` | no accepted branch report path emitting a pressure-row history segment | absent |
| `quotient_chart_id` | no branch-local exposure quotient chart for the same row | absent |
| `residual_status` | algebraic or toy residuals only | diagnostic-only |
| `gap_or_stability_status` | no same-row positive branch-gap or stability status | absent |
| `eta_ladder_status` | no same-row eta-ladder persistence record | absent |
| `pressure_record` | $\Pi$, $A$, $s_n$, $Q_{\chi}^{ab}$, $S_{\mathrm{dev}}^{ab}$, and retained direction are toy, target-only, or absent rather than branch-emitted | absent |
| `exposure_source_record` | $E_{\text{internal}}(A)$, $\zeta(A)$, $M_0^{\mathrm{src}}(A)$, and $\mathcal{N}_{\mathrm{tf},ab}(A)$ not branch-emitted on one row | absent |
| `pressure_response_record` | $\partial_PM_0^{\mathrm{src}}(A)$, $C_{\chi}^{\mathrm{iso}}$, $C_{\chi}^{\mathrm{aniso}}$, and $m_S$ not branch-emitted on one row | absent |
| `reversible_domain` | no same-row reversible trace residual, threshold, and closed loss-channel record from an accepted branch | absent |
| `null_sector_record` | no same-row null-sector record from an accepted branch | absent |

This record advances the branch-intake surface only by making the same-row
missing fields explicit. It does not authorize an empirical mass response,
pressure coefficient, or retained branch claim.

The target-only provider fixture
[pressure-row-branch-intake-provider-target.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-provider-target.json)
names the provider side of the same blocker without populating it from Fe/silicate
toy rows, empirical replay, or the $A_0$ frontier partial. It is
`target_only_not_accepted_source` with target status
`same_row_branch_intake_provider_missing`, so it must continue to return
`finite_branch_evidence_missing` until one accepted non-fixture retained
pressure row supplies accepted branch identity, accepted history segment,
same-row receiver-normal weight record, source path, quotient chart, exposure
source record, pressure response record, reversible-domain row, and null-sector
record together.

The target-only provider/intake artifact
[pressure-row-branch-intake-provider-intake-artifact.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-provider-intake-artifact.json)
is the stricter same-row negative control. It populates accepted branch
identity, accepted history segment, source path, quotient chart, pressure
record, exposure source, pressure response, reversible-domain, and null-sector
fields under one row id so `same_row_binding_evidence.pass=true`, but it is
still `target_only_provider_intake_artifact_fail_closed`. The checker therefore
returns `finite_branch_evidence_missing` with first failure
`accepted_non_fixture_source_missing` and keeps branch-derived pressure
response, empirical mass response, retained-branch claim, observer export, and
export readiness false. A complete-looking fixture or target row is not an
accepted pressure-row intake.

The nested-source-status probe
[pressure-row-branch-intake-nested-source-status-probe.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json)
sharpens the same boundary without relying on a top-level target status or a
fixture path. It supplies every required field on one retained-pressure-row id,
but each required field still carries `source_status:
target_required_not_accepted_source`. The checker therefore leaves
`same_row_binding_evidence.pass=true`, records no failed contract fields, and
still returns `accepted_non_fixture_source_missing`. This is the narrow
negative control for the current rank-4 blocker: same-row completeness is
necessary, but accepted non-fixture provenance must descend through the row
fields themselves before pressure coefficients can be branch-derived.

The accepted-source scout manifest
[pressure-row-branch-intake-source-scout-manifest.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-source-scout-manifest.json)
and report runner
[pressure-row-branch-intake-source-scout.mjs](../../../scripts/mass-map/pressure-row-branch-intake-source-scout.mjs)
now enumerate the current repo candidates that look closest to an accepted
non-fixture retained pressure-row source: the complete target fixture, the
nested target-provenance probe, the provider target, Fe/silicate toy replay, the
$A_0$ branch-source frontier partial, the cross-row negative control, the
current-status fixture, the finite-branch Hessian target packet, the branch-chart
revision contract, the Fe/Cr toy and empirical replay packets, and the exposure
and Noether sea response theorem targets. The scout also auto-discovers the
shared [branch-provider evidence report](../app-solver/branch-provider-evidence-report.md)
as a branch-provider boundary candidate, so the emitted source scope now covers
13 manifest candidates plus one provider-boundary report. The scout reports
zero accepted non-fixture candidates and stable rejection codes for target-only,
toy, fixture, diagnostic, partial, negative-control, empirical, nested-target,
missing same-row, missing required-field, missing accepted-history,
priority-packet, contract-target, and provider-boundary sources. Its first
failure is therefore still
`accepted_non_fixture_source_missing`, and it does not authorize branch-derived
pressure response, retained-branch claims, observer export, export readiness, or
empirical mass response.

The source scout also records `candidate_source_class_inspections` so the
negative result is auditable by source class rather than only by candidate
count. The inspected classes are `complete_same_row_target_fixture`,
`nested_target_provenance_probe`, `provider_target_fixture`,
`toy_pressure_replay_partial`, `a0_branch_source_frontier_partial`,
`cross_row_bundle_negative_control`, `current_status_fixture`,
`finite_branch_hessian_target_packet`, `a0_branch_chart_revision_contract`,
`toy_pressure_replay_packet`, `empirical_pressure_replay_skeleton`,
`exposure_source_theorem_target`, `noether_sea_response_probe_target`, and
`branch_provider_boundary_report`. Each class keeps
`accepted_non_fixture_candidate_count=0`. Fixture classes fail because their
paths are scaffolds or negative controls; toy and empirical classes fail because
they do not emit branch history; priority packets fail because they state
contracts or theorem targets rather than source rows; and the provider-boundary
class fails because it does not yet emit retained pressure-row fields.

The source scout now emits a compact `failure_family_delta`. The nearest current
contract-field candidate is
[pressure-row-branch-intake-nested-source-status-probe.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-nested-source-status-probe.json):
all retained pressure-row contract fields bind to one row and no contract field
is missing, but every required field still carries target-required provenance
rather than accepted non-fixture source evidence. The minimal positive source
object is therefore still one accepted retained pressure row carrying
`branch_id`, `accepted_history_segment_id`, `source_path`, `quotient_chart_id`,
the pressure-record entries, the exposure-source entries, the pressure-response
entries, the receiver-normal weight entries, the Noether sea response entries,
the reversible-domain row, and the null-sector row as accepted source evidence
on that same row. The provider-boundary candidate reads the shared
branch-provider report as `provider_verdict=same_domain_branch_provider_missing`,
`first_failure=accepted_non_fixture_source_missing`, and
`provider_ready_consumer_count=0`; it is not a retained pressure-row source.

The scout also emits
`pressure_row_nearest_candidate_provenance_depth_readout/v0` for the nearest
nested-source-status probe. The readout checks 33 retained pressure-row source
fields and keeps `accepted_non_fixture_source_provenance_pass=false`. The first
unaccepted required field, and the first target/probe-only required field, is
`branch_id`: `branch_id.source_status` is still
`target_required_not_accepted_source`. The first non-target but still
unaccepted field is `reversible_domain.loss_channels_closed`, which is present
as a literal boolean but carries no accepted non-fixture source provenance. This
narrower readout does not authorize branch-derived pressure response; it only
shows that the current nearest row must first replace target-required branch
identity with accepted source provenance, then replace the literal
loss-channel flag with an accepted reversible-domain source row.

The provenance distribution is exact for this nearest row: 32 required fields
are `target_or_probe_only_not_accepted_source`, no required fields are missing,
including `receiver_normal_weight_record.D_s`,
`receiver_normal_weight_record.D_t`, `receiver_normal_weight_record.W_rec`,
`receiver_normal_weight_record.retained_root_row_ids`,
`noether_sea_response_record.theta_sea`, and
`noether_sea_response_record.M_plus_ab`; only
`reversible_domain.loss_channels_closed` is
`literal_or_row_value_without_source_provenance`.

The scout now also emits
`pressure_row_branch_id_source_availability_audit/v0`. It checks all 14 current
source-scout candidates for `branch_id` provenance. Three candidates carry a
`branch_id` value, but all three are fixtures or target/probe-only rows, and
`accepted_branch_id_candidate_count=0`; the audit therefore keeps
`accepted_branch_id_source_found=false`,
`first_failure=branch_id.accepted_non_fixture_source_missing`, and
`preserved_failure_boundary=accepted_non_fixture_source_missing`. The attached
provider-readiness readout follows the rank-4 H39 provider candidate in
[branch-provider-current-candidates.json](../../../scripts/solver-audits/fixtures/branch-provider-current-candidates.json)
and keeps `provider_source_status=target_only_not_accepted_source`,
`source_map_provider_branch_intervals_available=false`, and
`accepted_provider_object_branch_interval_count=0`. Its named next evidence
object is still "same-domain source-map provider-object branch intervals on
every terminal row"; until that source family emits an accepted same-domain
branch-provider object, the pressure-row `branch_id` must remain fail-closed.
The smallest pressure-row-side evidence object remains one accepted non-fixture
retained pressure row whose `branch_id` field carries accepted non-fixture
source provenance from the same-domain branch-provider object and binds to the
same retained pressure row as the remaining pressure-row fields.

The scout also emits
`pressure_row_branch_certificate_ref_source_availability_audit/v0`. It reads the
current rank-4 entries in
[branch-provider-current-candidates.json](../../../scripts/solver-audits/fixtures/branch-provider-current-candidates.json):
`pressure-row-current-status`, `pressure-row-fe-silicate-toy-partial`,
`pressure-row-a0-branch-source-frontier-partial`, and
`h39-aggregate-p-provider-preaggregation-construction-attempt`. All four have
`branch_certificate_ref=null`, so the audit reports
`accepted_branch_certificate_ref_found=false`,
`branch_certificate_ref_present_candidate_count=0`, and
`first_failure=branch_certificate_ref.accepted_non_fixture_source_missing`.
This is not a new authorization gate; it is the provider side of the same rank-4
blocker. The next provider object must have
`provider_source_status=accepted_non_fixture_source`, `same_domain_record_ref`,
`branch_certificate_ref`, `active_root_or_live_ledger_identity`, and
`branch_local_projection_or_normalization_identity`; only then can a retained
pressure row bind `branch_id` to that certificate and to the accepted history,
quotient chart, pressure, exposure, pressure-response, reversible-domain, and
null-sector records on one row.

Coordinator note, 2026-06-28. Name the next priority-only provider target
`rank4_retained_pressure_row_branch_source_field/v1`. It must bind one
retained pressure row to an accepted non-fixture same-domain branch-provider
object with `branch_certificate_ref`, accepted history segment, source path,
same-domain record, active-root or live-ledger identity, and branch-local
projection or normalization identity. Fixture, toy, aggregate, cross-row, and
target-only rows remain blocked at `accepted_non_fixture_source_missing`.

The branch-certificate audit now carries
`pressure_row_same_domain_provider_object_construction_attempt/v0`, a
pressure-specific construction attempt over those same four rank-4 candidates.
It finds no accepted provider object:
`accepted_same_domain_provider_object_found=false`,
`provider_object_ready_candidate_count=0`, and
`first_failure=same_domain_provider_object.accepted_non_fixture_source_missing`.
The nearest pressure-specific partial is
`pressure-row-a0-branch-source-frontier-partial`, which supplies
`same_domain_record_ref`, `active_root_or_live_ledger_identity`, and
`branch_local_projection_or_normalization_identity`, but still lacks
`provider_source_status=accepted_non_fixture_source`, a non-fixture `source_ref`,
and `branch_certificate_ref`.
The target fixture
[pressure-row-branch-intake-provider-target.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-provider-target.json)
therefore records `pressure_row_same_domain_provider_object_target/v0` as a
priority-only fail-closed target. It forbids combining fixture, toy,
diagnostic, target-only, or cross-candidate fields into accepted pressure
evidence.

The construction attempt now nests
`pressure_row_provider_source_status_and_certificate_path_probe/v0` for that
nearest partial. The exact unaccepted provider-source path is
`scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status`,
whose observed value is `tier0_continuation_ready_not_accepted_history` rather
than `accepted_non_fixture_source`. The exact missing certificate path is
`scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].branch_certificate_ref`,
whose observed value is `null`. The same candidate's populated
`same_domain_record_ref`, `active_root_or_live_ledger_identity`, and
`branch_local_projection_or_normalization_identity` fields remain useful
same-row partials, but they are not accepted source provenance and do not close
the pressure-provider blocker.

The source scout also emits
`pressure_row_accepted_source_object_boundary/v0`, which composes the upstream
provider-source requirement with the 33-field retained pressure-row source
requirement. The boundary reports
`accepted_source_object_found=false`,
`accepted_promotion_authorized=false`, and
`first_failure=accepted_non_fixture_source_missing`. Its provider side requires
the same nearest partial to replace
`provider_source_status=tier0_continuation_ready_not_accepted_history` with
`provider_source_status=accepted_non_fixture_source` and to populate
`branch_certificate_ref` on that same non-fixture provider row. Its
fixture-backed `source_ref` is also rejected as provider provenance. Its
pressure-row side requires the nearest same-row pressure probe to replace all 33
target-required or literal fields with accepted non-fixture source provenance,
including the receiver-normal and Noether sea fields. The boundary explicitly
keeps cross-candidate joins unauthorized and rejects H39/theta3minus
diagnostics, source-normal force residues, shell-braid rows, fixtures, toy rows,
empirical rows without branch source, and cross-row bundles as pressure or mass
evidence.

The sharper provider-side falsifier is now machine-readable. The expected
provider source producer is an accepted non-fixture same-domain branch-provider
report carrying `provider_source_status`, `source_ref`,
`branch_certificate_ref`, `same_domain_record_ref`,
`active_root_or_live_ledger_identity`, and
`branch_local_projection_or_normalization_identity` on one provider row. The
expected provider file family is a non-fixture generated branch-provider report
or priority-source report outside `scripts/**/fixtures/**`. The nearest
candidate instead still points to the fixture-backed
`pressure-row-a0-branch-source-frontier-partial`; its missing or rejected
provider fields are exactly `provider_source_status` at the observed value
`tier0_continuation_ready_not_accepted_history`, `source_ref` at the observed
fixture path
`scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json`,
and `branch_certificate_ref` at the observed value `null`. The expected
pressure-row producer is then an accepted retained pressure-row report emitted
by that same provider source, carrying all 33 source fields. The blocked field
families are retained branch identity, exposure quotient, pressure record,
exposure source record, pressure-response record, receiver-normal weight record,
Noether sea response record, reversible-domain record, and null-sector record.
The first executable provider-row blocker is
`provider_source_status` at
`scripts/solver-audits/fixtures/branch-provider-current-candidates.json#/candidates[id=pressure-row-a0-branch-source-frontier-partial].provider_source_status`;
it must become `accepted_non_fixture_source` on a non-fixture provider row
before the `source_ref` and `branch_certificate_ref` blockers can close.
The same accepted-source boundary now emits three ordered provider-source
targets: the provider status target, the non-fixture `source_ref` target outside
`scripts/**/fixtures/**`, and the same-row `branch_certificate_ref` target.
All three remain fail-closed for the nearest partial, so the retained
pressure-row 33-field report family stays blocked until a single non-fixture
provider row satisfies the ordered target chain.

Executable current-status checker:
[pressure-row-branch-intake-report.mjs](../../../scripts/mass-map/pressure-row-branch-intake-report.mjs)
checks the same `branch_intake` boundary before replay consumption. It reports
`same_row_binding_evidence` separately from `accepted_source_evidence`, so a
target-only, toy, empirical, diagnostic, partial, fixture, nested-provenance, or
negative-control row can prove row coherence without authorizing pressure
response. The current
status fixture
[pressure-row-branch-intake-current-status.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-current-status.json)
returns `finite_branch_evidence_missing` because no retained pressure row
supplies accepted branch identity, source path, pressure record, exposure
source record, pressure-response record, receiver-normal weight record,
Noether sea response record, reversible-domain row, and null-sector record
together. The executable contract now names the missing receiver-normal fields
as `receiver_normal_weight_record.D_s`, `receiver_normal_weight_record.D_t`,
`receiver_normal_weight_record.W_rec`, and
`receiver_normal_weight_record.retained_root_row_ids`, and names the same-row
Noether sea fields as `noether_sea_response_record.theta_sea` and
`noether_sea_response_record.M_plus_ab`. A complete synthetic row may pass the
checker only as `accepted_retained_pressure_row`; the checker still authorizes
no empirical mass response and no retained-branch claim.

The cross-row bundle negative-control fixture
[pressure-row-branch-intake-cross-row-bundle-negative-control.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-cross-row-bundle-negative-control.json)
fills the required contract fields by combining the $A_0$ branch-source
frontier, Fe/silicate toy pressure entries, and provider-target metadata. The
checker still returns `finite_branch_evidence_missing` because the populated
subrecords carry distinct row identifiers and source references rather than one
accepted retained pressure row. It also leaves branch-derived pressure response,
observer export, export readiness, empirical mass response, and retained-branch
claim authorization false.

The first mined partial candidate is the Fe/silicate toy row
[pressure-row-branch-intake-fe-silicate-toy-partial.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-fe-silicate-toy-partial.json).
It reduces the unknown set for one same-row diagnostic replay: the row carries
toy pressure loading, packing headroom, delay/strain response entries, a
reversible trace threshold pair, and clock/birefringence/dispersion/transport
null-sector bounds. The checker still returns `finite_branch_evidence_missing`
because those entries come from `fe-silicate-segregation-toy.json`, not from an
accepted branch source. The remaining source obligations are therefore precise:
A0 branch search must supply the accepted branch identity and accepted history
segment, the exposure quotient must supply the quotient chart plus
$E_{\text{internal}}(A)$, $\zeta(A)$, $M_0^{\mathrm{src}}(A)$, and
$\mathcal{N}_{\mathrm{tf},ab}(A)$ on the same row, and pressure replay must
replace the toy residual and toy coefficients with branch-emitted
$\partial_PM_0^{\mathrm{src}}(A)$, $C_{\chi}^{\mathrm{iso}}$,
$C_{\chi}^{\mathrm{aniso}}$, $m_S$, same-row $D_s$, $D_t$,
$W^{\mathrm{rec}}$, retained root-row identities, $\theta_{\mathrm{sea}}$,
$\mathcal{M}_{+}^{ab}$, loss-channel closure, preferred-frame, and
directional-tensor records.

The first branch-source frontier candidate is
[pressure-row-branch-intake-a0-branch-source-partial.json](../../../scripts/mass-map/fixtures/pressure-row-branch-intake-a0-branch-source-partial.json).
It records the current compact $A_0$ branch-source state without allowing it to
stand in for accepted pressure evidence. The available branch-side data is a
Tier 0 continuation-ready row with branch label
`k=(60,5,1)`, `q=(55,4,59)`, partner/self/inter-layer active-root counts
`96/32/384`, and root residual `2.8e-7`. That is useful source ownership, not an
accepted retained pressure row: the corrected A0 route still lacks direct
one-period residual closure, quotient-row identity carried through a corrected
branch row, a monodromy operator with positive $\Delta_{\mathbf{k}}$,
same-branch persistence across the declared $\eta$ ladder, finite
envelope-Hessian evidence, exposure-source descent, and branch-emitted pressure
response. The checker therefore still returns `finite_branch_evidence_missing`
and keeps `branch_id`, `accepted_history_segment_id`, `source_path`,
`quotient_chart_id`, `exposure_source_record`, `pressure_response_record`,
`receiver_normal_weight_record`, and `noether_sea_response_record` unpopulated
in the contract fields.

The first empirical or toy replay boundary is therefore narrow: a toy row may populate $\Pi$, $A$, $Q_{\chi}^{ab}$, $S_{\mathrm{dev}}^{ab}$, and masked $\mathcal{V}_{P,A}$ to exercise the algebra, but it must mark `pending_source_descent` until an accepted branch emits $E_{\text{internal}}(A)$, $\zeta(A)$, $M_0^{\mathrm{src}}(A)$, $\mathcal{N}_{\mathrm{tf},ab}(A)$, and the derivative $\partial_P M_0^{\mathrm{src}}(A)$. A real Fe/Cr or Ni/Co replay can at most upgrade the status from `tf_bound_only` to a retained-span test unless the same branch-side source record is present.

### Retained Pressure-Row Receiver-Normal Simulation Target

The concrete target for the current mass/pressure blocker is
`retained_pressure_row_receiver_normal_simulation/v0`. It is a priority-only
simulation or theorem target, not an empirical pressure pass and not a mass
prediction. Its current status is `finite_branch_evidence_missing` until one
accepted non-fixture retained pressure row supplies every required field on one
retained branch identity.

The target consumes a baseline retained pressure row and a small subthreshold
pressure perturbation. The baseline and perturbed records must share
`accepted_branch_id`, `accepted_history_segment_id`, `source_path`,
`quotient_chart_id`, retained root-row identity, retained response direction,
reversible-domain row, and null-sector record. On that same row, the simulation
must recompute rather than import

$$
D_s,
\qquad
D_t,
\qquad
W^{\mathrm{rec}}=\left|\frac{D_t}{D_s}\right|,
\qquad
E_{\text{internal}}(A),
\qquad
M_{0,\mathrm{rec}}^{\mathrm{src}}(A),
\qquad
\mathcal{Z}_{\mathrm{tf,rec}}^{ab}(A),
$$

and the Noether sea pressure-response record

$$
\theta_{\mathrm{sea}},
\qquad
\Pi,
\qquad
A,
\qquad
s_n,
\qquad
Q_{\chi}^{ab},
\qquad
S_{\mathrm{dev}}^{ab},
\qquad
C_{\chi}^{\mathrm{iso}},
\qquad
C_{\chi}^{\mathrm{aniso}},
\qquad
m_S.
$$

The simulation comparison is the finite-difference trace residual

$$
\mathcal{R}_{\mathrm{rec}P}^{\mathrm{sim}}
=
\frac{
\left|
\left[
m_{\mathrm{tr}}^{\mathrm{rec}}(\Delta P)
-m_{\mathrm{tr}}^{\mathrm{rec}}(0)
\right]
-\widehat{\delta_Pm}_{\mathrm{tr}}^{\mathrm{rec}}
\right|
}{
\left|\widehat{\delta_Pm}_{\mathrm{tr}}^{\mathrm{rec}}\right|
+\epsilon_{\mathrm{rec}P}
},
$$

where $\widehat{\delta_Pm}_{\mathrm{tr}}^{\mathrm{rec}}$ is the receiver-normal
pressure trace expression built from the same branch-emitted exposure,
pressure, and Noether sea response rows. No coefficient in
$\widehat{\delta_Pm}_{\mathrm{tr}}^{\mathrm{rec}}$ may be fitted after benchmark
comparison.

The required output fields are:

| Field | Required content |
| --- | --- |
| `retained_branch_identity` | accepted branch id, accepted history segment, source path, retained pressure-row id, retained response direction, and quotient chart |
| `receiver_normal_weight_record` | same-row $D_s$, $D_t$, $W^{\mathrm{rec}}$, and retained root-row identities before and after the pressure perturbation |
| `energy_exposure_record` | same-row $E_{\text{internal}}(A)$, $\zeta_{0}^{\mathrm{rec}}$, $M_{0,\mathrm{rec}}^{\mathrm{src}}(A)$, $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}(A)$, and exposure quotient descent status |
| `pressure_noether_sea_record` | same-row $\theta_{\mathrm{sea}}$, $\Pi$, $A$, $s_n$, $Q_{\chi}^{ab}$, $S_{\mathrm{dev}}^{ab}$, $C_{\chi}^{\mathrm{iso}}$, $C_{\chi}^{\mathrm{aniso}}$, $m_S$, and $\mathcal{M}_{+}^{ab}$ |
| `finite_difference_trace` | baseline trace, perturbed trace, predicted receiver-normal pressure trace, $\mathcal{R}_{\mathrm{rec}P}^{\mathrm{sim}}$, and tolerance |
| `domain_and_null_records` | reversible-domain row, closed loss-channel status, clock/signal, birefringence, photon-dispersion, preferred-frame, directional-tensor, and transport budgets |
| `negative_controls` | explicit rejection of H39/theta3minus quotient certificates, source-normal force residues, fixture-only rows, toy rows, empirical rows without branch source, and cross-row bundles as pressure or mass evidence |

The pass/fail status vector is:

| Status key | Pass condition | Fail or bound-only reading |
| --- | --- | --- |
| `accepted_retained_branch_identity` | one accepted non-fixture retained pressure row supplies branch identity, history segment, source path, and quotient chart. | `finite_branch_evidence_missing` |
| `receiver_normal_same_record` | $D_s$, $D_t$, and $W^{\mathrm{rec}}$ are recomputed on the retained roots used by exposure, pressure, and response tensors. | `receiver_normal_same_record_missing` |
| `energy_exposure_binding` | $E_{\text{internal}}(A)$, $\zeta_{0}^{\mathrm{rec}}$, $M_{0,\mathrm{rec}}^{\mathrm{src}}$, and $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}$ descend through the same mass-facing exposure quotient. | `pending_source_descent`, `source_nondescent`, or `energy_exposure_row_split` |
| `pressure_noether_sea_binding` | pressure variables and Noether sea response coefficients are branch-emitted on the same retained pressure row. | `pressure_response_row_split` or `coefficient_fit_contamination` |
| `trace_prediction` | $\mathcal{R}_{\mathrm{rec}P}^{\mathrm{sim}}\le\epsilon_{\mathrm{rec}P}^{\mathrm{sim}}$ with no benchmark-tuned coefficient. | `trace_prediction_fail` |
| `reversible_domain` | $\mathcal{R}_{\mathrm{tr}}<\mathcal{R}_{\text{tr},*}$ and no unlogged excitation, heating, radiation-like shedding, or branch transition appears. | `threshold_event`, `loss_below_threshold`, or `loss_channel_unlogged` |
| `null_sector` | all clock/signal, birefringence, photon-dispersion, preferred-frame, directional-tensor, and transport bounds remain inside budget. | `metric_null_violation` |
| `diagnostic_exclusion` | H39/theta3minus quotient certificates, source-normal force rows, old shell-braid residues, fixtures, and cross-row bundles remain diagnostic-only. | `diagnostic_evidence_import` |

The static validation precheck remains
[pressure-row-branch-intake-report.mjs](../../../scripts/mass-map/pressure-row-branch-intake-report.mjs).
It must report every pressure, exposure, receiver-normal, Noether sea,
reversible-domain, and null-sector intake field on one row, then report both
same-row binding and accepted non-fixture source evidence before this
simulation target can claim branch-derived pressure response. A
simulation that passes the finite-difference trace but fails that precheck
remains `finite_branch_evidence_missing`.

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

[Noether sea Pressure Modulus and Packing Headroom](noether-sea-pressure-modulus-and-packing-headroom.md) converts the former open $K_{\text{sea}}$ target into the branch-density modulus relation $K_{\mathrm{pack}}=K_{\text{sea}}/\kappa_n$, the support-function headroom $s_n=1-n/n_{\max}^{\mathrm{obl}}$, and the first scaling laws for $K_{\mathrm{pack}}(N)$. [Noether Braid Envelope Hessian Toy Branch](noether-braid-envelope-hessian-toy-branch.md) supplies the reduced $H_{\mathrm{env}}$ projection needed to decide whether isotropic pressure also forces $\lambda$ and $\xi$ response.
