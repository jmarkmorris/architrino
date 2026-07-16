# Assembly-Level Reduction Status

Extracted from `braid-mass-response-map/priorities.md` during the braid priority sort (Phase 3, OP-3, 2026-07-08). Priority-only theorem-target rows for the assembly-level mass reduction (scalar/tensor reduction, Receiver-Normal Constitutive Exposure Row, Retained Pressure-Row Receiver-Normal Simulation Target). Claim levels unchanged from the source.

The current mass-side corpus should be read as reducing observer-facing mass to a mathematical expression over an $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly $A$, not to a primitive property of an individual architrino. The compact scalar reduction is

$$
m_{\text{inertial}}(A)
\approx
\alpha_{\mathrm{m}}\,\frac{E_{\text{probe}}(A)}{c_{\text{eff}}^2}
=
\alpha_{\mathrm{m}}\,\frac{\zeta_{\text{probe}}(A)E_{\text{internal}}(A)}{c_{\text{eff}}^2},
$$

with $\alpha_{\mathrm{m}}$ fixed once by a reference assembly rather than re-fit particle by particle. In this expression, $E_{\text{internal}}(A)$ is the closed assembly energy ledger, raw $\zeta(A)$ is the far-field shielding or exposure coefficient before partition, $\zeta_{\text{probe}}(A)$ is the probe-channel share, and $c_{\text{eff}}$ is the local observer-facing light-speed scale set by the Noether sea state. Here $\alpha_{\mathrm{m}}$ is the mass-map normalization; bare $\alpha$ remains reserved for measured fine-structure or locally declared angle and phase uses.

For directional or environment-dependent response, the scalar denominator should be treated as the homogeneous isotropic limit of a medium-response tensor:

$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\,\zeta_{\text{probe}}(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b},
\qquad
\mathcal{M}_{\text{sea}}^{ab}
\to
\frac{h^{ab}}{c_{\text{eff}}^2}.
$$

Promotion note, 2026-05-20, revised 2026-07-06 for the exposed-energy partition: [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md#reference-normalized-mass-ratio) carries the reference-normalized mass-ratio invariant and its directional tensor extension, but its compact scalar wording still needs a scoped follow-up sweep from raw $\zeta(A)E_{\text{internal}}(A)$ to $E_{\text{probe}}(A)=\zeta_{\text{probe}}(A)E_{\text{internal}}(A)$ where the mass map is the consumer. In a shared homogeneous isotropic response record, $\alpha_{\mathrm{m}}$ cancels from scalar mass ratios, so the hierarchy burden moves to the probe-channel exposed source and its scalar exposure quotient rather than to another adjustable normalization. In anisotropic or pressure-dependent cells, the corresponding ratio uses $\hat v_a\mathsf{I}_{A}^{ab}\hat v_b$ and therefore keeps trace-free exposure and trace-free medium response visible.

Here $h^{ab}$ is the inverse Euclidean spatial metric on the local substrate slice. This tensor form is the stronger derivation target. It keeps the mass map from being read as shielding alone; the finished formula must also encode the probe/sea partition, medium-dressed inertial response, Noether sea gradient response, and any residual anisotropy or leakage. Until $E_{\text{internal}}(A)$, raw $\zeta(A)$, $\zeta_{\text{probe}}(A)$, and $\mathcal{M}_{\text{sea}}^{ab}$ are derived from a stable closed Noether braid root ledger, the scalar expression remains a controlled roadmap formula rather than a theorem.

### Receiver-Normal Constitutive Exposure Row

Claim level: priority-only theorem target. This row records the first mass-response closure object that consumes receiver-normal branch strength and the Noether sea constitutive response together. It does not promote a mass prediction, particle hierarchy claim, or pressure replay pass.

Receiver-normal dependency audit disposition:

| Packet or dependency | Disposition | Reason |
| --- | --- | --- |
| Mass-response constitutive exposure row | `priority-only` | The closure equations below define the target but no accepted branch currently binds exposure, Noether sea response, pressure state, and receiver-normal rows on one retained record. |
| Pressure / Noether sea constitutive packets | `defer with blocker` | They may feed mass response only after a retained pressure row carries $D_s$, $D_T$, $W^{\mathrm{rec}}$, energy/exposure, reversible-domain, and null-sector rows together. |
| Breather certificate inheritance | `defer with blocker` | Breather topology and finite-certificate discipline remain useful, but recapture, self-drive, force-margin, action, and certificate rows must restart from receiver-normal branch strength before mass-side reuse. |
| H39/theta3minus quotient diagnostics | `priority-only diagnostic` | They may name provider-boundary or root-geometry candidates, but they do not supply same-record retained causal-root receiver-normal weight or derivative rows. |
| Old shell-braid force residues | `blocked` | Any $1/\lvert J\rvert$ shell-force residue is source-normal diagnostic material only and cannot be active mass-response evidence. |

For an accepted branch family $A$, let $\mathfrak{R}_{A}^{\mathrm{ret}}$ be the retained causal-root row set on the declared cycle window. Each retained row $\rho$ must carry same-record

$$
D_{s,\rho},
\qquad
D_{T,\rho},
\qquad
W_{\rho}^{\mathrm{rec}}
=
\left|
\frac{D_{T,\rho}}{D_{s,\rho}}
\right|.
$$

The receiver-normal mass-facing exposure ledger is the benchmark-blind cycle average

$$
\mathcal{L}_{A}^{\mathrm{rec}}(\hat{\mathbf R};\theta_{\text{sea}})
=
\left\langle
\sum_{\rho\in\mathfrak{R}_{A}^{\mathrm{ret}}}
q_{\rho}W_{\rho}^{\mathrm{rec}}\,
\mathcal{W}_{\rho}(\hat{\mathbf R};\theta_{\text{sea}})
\right\rangle_{\mathrm{cycle}},
$$

where $\mathcal{W}_{\rho}$ is the declared normalized wake contribution for the retained row, including the extraction convention for geometric falloff and far-field sampling. The scalar shielding coefficient and trace-free exposure numerator for this row are

$$
\zeta_{0}^{\mathrm{rec}}(A;\theta_{\text{sea}})
=
\frac{\|\Pi_0\mathcal{L}_{A}^{\mathrm{rec}}\|}
{\|\mathcal{L}_{\mathrm{naive}}^{\mathrm{rec}}\|},
\qquad
M_{0,\mathrm{rec}}^{\mathrm{src}}(A;\theta_{\text{sea}})
=
\zeta_{0}^{\mathrm{rec}}(A;\theta_{\text{sea}})E_{\text{internal}}(A),
$$

and

$$
\mathcal{Z}_{A,\mathrm{rec}}^{ab}
=
\zeta_{0}^{\mathrm{rec}}h^{ab}
+
\mathcal{Z}_{\mathrm{tf,rec}}^{ab}.
$$

The constitutive mass-response target is the retained symmetric contraction

$$
\boxed{
\mathsf{I}_{A,\mathrm{rec}}^{ab}
=
\frac{\alpha_{\mathrm{m}}E_{\text{internal}}(A)}{2}
\left(
\mathcal{Z}_{A,\mathrm{rec}}^{a}{}_{c}\mathcal{M}_{+}^{cb}(\theta_{\text{sea}})
+
\mathcal{Z}_{A,\mathrm{rec}}^{b}{}_{c}\mathcal{M}_{+}^{ca}(\theta_{\text{sea}})
\right),
}
$$

with scalar trace

$$
\boxed{
m_{\mathrm{tr}}^{\mathrm{rec}}(A;\theta_{\text{sea}})
=
\alpha_{\mathrm{m}}
\frac{E_{\text{internal}}(A)}{c_{\text{eff},0}^{2}}
\left[
\zeta_{0}^{\mathrm{rec}}(1+\delta\mathcal{M}_{0})
+
\frac{1}{3}
\mathcal{Z}_{\mathrm{tf,rec},ab}
\delta\mathcal{M}_{\mathrm{tf}}^{ab}
\right]
+
\mathcal{R}_{\mathrm{rec}}.
}
$$

This is the receiver-normal version of the exposed inertial-response trace invariant. The scalar source is not $\zeta_{0}^{\mathrm{rec}}$ alone; it is the quotient-visible product $M_{0,\mathrm{rec}}^{\mathrm{src}}=\zeta_{0}^{\mathrm{rec}}E_{\text{internal}}$. The Noether sea response is not an additive mass term; it enters only through the reversible symmetric response tensor $\mathcal{M}_{+}^{ab}(\theta_{\text{sea}})$ and its trace / trace-free projections.

For a branch-preserving pressure perturbation below $\mathcal{R}_{\text{tr},*}$, the first-order receiver-normal pressure trace target is

$$
\boxed{
\delta_P m_{\mathrm{tr}}^{\mathrm{rec}}(A)
=
\alpha_{\mathrm{m}}
\frac{1}{c_{\text{eff},0}^{2}}
\left[
\delta_P M_{0,\mathrm{rec}}^{\mathrm{src}}(A)
+
2M_{0,\mathrm{rec}}^{\mathrm{src}}(A)C_{\chi}^{\mathrm{iso}}\Pi
+
\frac{1}{3}
E_{\text{internal}}(A)
\mathcal{Z}_{\mathrm{tf,rec},ab}(A)
\left(
2C_{\chi}^{\mathrm{aniso}}Q_{\chi}^{ab}
+
m_SS_{\mathrm{dev}}^{ab}
\right)A
\right]
+
\mathcal{R}_{\mathrm{rec}P}.
}
$$

The first falsifiable coefficient is the receiver-normal exposed-source pressure slope

$$
C_{\mathrm{src},W}^{\Pi}(A)
\equiv
\partial_{\Pi}
\ln M_{0,\mathrm{rec}}^{\mathrm{src}}(A;\theta_{\text{sea}}),
\qquad
\delta_P M_{0,\mathrm{rec}}^{\mathrm{src}}
=
M_{0,\mathrm{rec}}^{\mathrm{src}}C_{\mathrm{src},W}^{\Pi}\Pi
+
\mathcal{R}_{\mathrm{src},W}.
$$

A simulation target for this coefficient is narrow: perturb one accepted retained branch by a declared small pressure row, recompute $D_s$, $D_T$, $W^{\mathrm{rec}}$, $\mathcal{L}_{A}^{\mathrm{rec}}$, $\zeta_{0}^{\mathrm{rec}}$, and $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}$ on the same branch identity, and test whether the finite-difference trace matches the boxed $\delta_Pm_{\mathrm{tr}}^{\mathrm{rec}}$ equation within $\mathcal{R}_{\mathrm{rec}P}$. If the result needs a new observable-local $\delta\mathcal{M}_0$ row, a hidden branch representative, or an unlogged loss channel, the row fails rather than becoming a fitted mass map.

Assumptions for this row:

- the retained branch identity, cycle window, pressure record, quotient chart, and Noether sea response record are the same record;
- $E_{\text{internal}}(A)$, $\zeta_{0}^{\mathrm{rec}}$, $M_{0,\mathrm{rec}}^{\mathrm{src}}$, and $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}$ descend through the mass-facing exposure quotient;
- pressure perturbations are branch-preserving and remain below $\mathcal{R}_{\text{tr},*}$;
- $\mathcal{M}_{+}^{ab}$ is the reversible symmetric Noether sea response, while antisymmetric, Hall-like, orientation, loss, heating, radiation-like shedding, and branch-transition residues stay outside scalar rest mass;
- observed particle masses, charged-lepton ratios, electron radius, measured $\alpha$, or benchmark residuals do not enter $\mathcal{L}_{A}^{\mathrm{rec}}$, $\Pi_0$, $Q_0$, $\zeta_{0}^{\mathrm{rec}}$, or $C_{\mathrm{src},W}^{\Pi}$.

Required branch inputs:

- accepted branch identity, accepted history segment, active causal-root ledger, and same-row $D_s$, $D_T$, and $W^{\mathrm{rec}}$ values;
- energy ledger $E_{\text{internal}}(A)$ and benchmark-blind shielding extraction schedule;
- scalar projection $\Pi_0$, quotient $Q_0$, naive exposure ledger $\mathcal{L}_{\mathrm{naive}}^{\mathrm{rec}}$, and no-hidden-mass-handle residual;
- trace-free exposure moment $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}$ with retained direction labels;
- pressure and Noether sea response record $\theta_{\text{sea}}=(n,\chi_{\text{sea}},\Gamma_N,\lambda,\xi,S_{ij},\mathcal{M}_{\text{sea}}^{ab})$, reversible-domain row, and null-sector bounds.

### Retained Pressure-Row Receiver-Normal Simulation Target

The workstream target is now one retained pressure-row receiver-normal
simulation target rather than another pressure replay row. It remains
`priority-only` and `defer with blocker` until the accepted branch source exists.
The target answers one question: if the same retained branch identity is
perturbed by a declared pressure row below $\mathcal{R}_{\text{tr},*}$, does the
receiver-normal mass trace change exactly through the same-record exposure,
energy, Noether sea response, and pressure rows?

The top-level output packet is:

| Field | Required content |
| --- | --- |
| `target_id` | `retained_pressure_row_receiver_normal_simulation/v0` |
| `status` | `priority-only`; current reading `finite_branch_evidence_missing` |
| `retained_branch_identity` | accepted branch id, accepted history segment, source path, active causal-root ledger, quotient chart, retained pressure-row id, and retained response direction |
| `receiver_normal_weight_record` | same-row $D_s$, $D_T$, $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$, and retained root-row identities before and after pressure perturbation |
| `energy_exposure_record` | $E_{\text{internal}}(A)$, $\zeta_{0}^{\mathrm{rec}}$, $M_{0,\mathrm{rec}}^{\mathrm{src}}(A)$, $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}(A)$, exposure quotient chart, and no-hidden-mass-handle residual |
| `pressure_noether_sea_record` | $\theta_{\text{sea}}$, $\Pi$, $A$, $s_n$, $Q_{\chi}^{ab}$, $S_{\mathrm{dev}}^{ab}$, $C_{\chi}^{\mathrm{iso}}$, $C_{\chi}^{\mathrm{aniso}}$, $m_S$, $\mathcal{M}_{+}^{ab}$, reversible-domain row, and null-sector bounds |
| `trace_validation` | baseline $m_{\mathrm{tr}}^{\mathrm{rec}}(0)$, perturbed $m_{\mathrm{tr}}^{\mathrm{rec}}(\Delta P)$, predicted $\widehat{\delta_Pm}_{\mathrm{tr}}^{\mathrm{rec}}$, residual $\mathcal{R}_{\mathrm{rec}P}^{\mathrm{sim}}$, and declared tolerance |
| `negative_controls` | H39/theta3minus quotient diagnostics, source-normal force residues, old shell-braid force residues, fixtures, toy rows, empirical rows without branch source, and cross-row bundles all remain non-evidence |

Pass requires all of the following fields to pass together:
`accepted_retained_branch_identity`, `receiver_normal_same_record`,
`energy_exposure_binding`, `pressure_noether_sea_binding`,
`trace_prediction`, `reversible_domain`, `null_sector`, and
`diagnostic_exclusion`. The first failed field determines the disposition:
`finite_branch_evidence_missing`, `receiver_normal_same_record_missing`,
`energy_exposure_row_split`, `pressure_response_row_split`,
`trace_prediction_fail`, `loss_channel_unlogged`, `metric_null_violation`, or
`diagnostic_evidence_import`.

Validation starts with
[pressure-row-branch-intake-report.mjs](../../../../scripts/mass-map/pressure-row-branch-intake-report.mjs).
That checker is necessary but not sufficient: it can authorize the simulation
only after it reports same-row binding and accepted non-fixture source evidence.
The finite-difference trace residual is the simulation-side validation after
the static intake precheck passes.
