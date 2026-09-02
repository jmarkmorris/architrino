# SF-002 — Observer-Level Strong-Field Projection Contract

## Status And Claim Boundary

- Queue item: `SF-002` / `observer_predictions`.
- Result grade: derived priority-contract formulation.
- Current state: the projection contract is complete, but no source-bound embedded horizon-interface carrier has populated it.
- Scientific status: no numerical strong-field prediction, horizon identification, retained compact branch, entropy result, release selector, or departure from GR-like behavior is established.
- Native input contract: [SF-001 Embedded Horizon-Interface Boundary Conditions](embedded-horizon-interface-boundary-conditions.md).
- Equation-mapping owner: [EQ-07C Black-Hole Horizon-Interface Noether Braid Map](../mapping-equations/eq-07c-black-hole-horizon-interface-noether-braid-map.md).

This packet derives the observer projection that a future accepted SF-001 output must populate. It converts the phrase “observer-level prediction set” into named horizon, scale, exterior-response, image, waveform, and identity rows with separate residuals and falsifiers. Standard black-hole equations appear only as effective recovery targets; they do not enter the native horizon-interface solve.

Plainly: The prediction socket is now precise. It says what a real strong-field result must predict and how the predictions must remain tied to one physical history, but the socket is still empty.

## Admission Predicate

Let the SF-001 output be

$$
\mathcal O_H
=
\left(
\operatorname{id}(\Theta_{\partial\Omega,W}),
H_W,
\Theta_H,
\mathcal B_H,
\mathcal L_{\partial\Omega,W},
\Pi_{\mathrm{ext}},
\mathcal F_H,
\mathcal P_H
\right).
$$

For component tolerances $\boldsymbol\epsilon_H=(\epsilon_{\mathrm{trace}},\epsilon_{\mathrm{delay}},\epsilon_{\mathrm{align}},\epsilon_{\mathrm{finite}},\epsilon_{\mathrm{ledger}},\epsilon_{\mathrm{embed}},\epsilon_{\mathrm{label}})$ fixed before evaluating the record, define

$$
\mathcal A_H(\mathcal O_H)
=
\mathbf 1\!\left[
\bigwedge_{j\in\{\mathrm{trace,delay,align,finite,ledger,embed,label}\}}
\mathcal F_{H,j}\le\epsilon_j
\right]
\mathbf 1[\mathcal P_H\ \text{is complete and source-bound}].
$$

Every observer projection returns `Not advanced` when $\mathcal A_H=0$. An omitted component cannot be replaced by a favorable total score, and a projection may not fit or modify the native state.

Plainly: All seven SF-001 checks and the provenance record must pass before any output is called a prediction. One failed or missing check stops the entire handoff.

## Observer Record

For each observing channel $k$, declare

$$
\mathcal I_k
=
\left(
\operatorname{instrumentId}_k,
\operatorname{calibrationId}_k,
W_k^{\mathrm{obs}},
\mathcal A_k^{\mathrm{access}},
\eta_k,
C_k,
\mathcal S_k
\right),
$$

where $W_k^{\mathrm{obs}}$ is the observer window, $\mathcal A_k^{\mathrm{access}}$ is the finite access region, $\eta_k$ is the declared nuisance record, $C_k$ is the uncertainty or covariance model, and $\mathcal S_k$ identifies the retained source artifacts. The observer record may calibrate the comparison map but may not alter $\Theta_{\partial\Omega,W}$, $\mathcal B_H$, or the compact-region ledger.

Plainly: Each telescope, clock, or detector must identify its data, calibration, uncertainty, and accessible region. Those choices can affect how a prediction is observed, but they cannot retune the source that made it.

## Prediction Vector

For an admitted output and a declared family of observer records $\mathbb I_{\mathrm{obs}}$, define

$$
\mathcal P_{\mathrm{SF2}}[\mathcal O_H;\mathbb I_{\mathrm{obs}}]
=
\left(
\mathcal P_{\mathrm{hor}},
\mathcal P_{\mathrm{scale}},
\mathcal P_{\mathrm{ext}},
\mathcal P_{\mathrm{img}},
\mathcal P_{\mathrm{GW}},
\mathcal P_{\mathrm{id}}
\right).
$$

Each component below is evaluated separately. A prediction vector is not accepted by averaging a failed row into a successful one.

| Component | Required predicted output | Same-record condition | Falsifier |
| --- | --- | --- | --- |
| $\mathcal P_{\mathrm{hor}}$ | Trapped-surface, apparent-horizon, and event-horizon comparison rows, each labeled by its local, slice-dependent, or global support. | Same $\operatorname{id}(\Theta_{\partial\Omega,W})$, boundary, label family, and exterior access record. An event-horizon row additionally requires adequate global history support beyond a finite local window. | `event_horizon_support_incomplete` or `slice_global_record_split` |
| $\mathcal P_{\mathrm{scale}}$ | $r_H$, $A_H$, $r_{\mathrm{LR}}$, and $r_{\mathrm{ISCO}}$, with mass/spin/charge-like labels and the branch condition governing each scale. | Same source state and exterior projection; $r_H$ and $r_{\mathrm{LR}}$ remain distinct unless the carrier derives coincidence. | `horizon_light_ring_collapsed` or `scale_source_split` |
| $\mathcal P_{\mathrm{ext}}$ | Clock, ruler, redshift, lensing, orbital, and frame-dragging comparison outputs available from $\Pi_{\mathrm{ext}}$. | Same constitutive and source record across every exterior channel; no channel-specific source retuning. | `exterior_channel_retuned` or `exterior_projection_missing` |
| $\mathcal P_{\mathrm{img}}$ | Bright-ring diameter and width, central-depression contrast, complex visibilities, closure phases and amplitudes, resolved polarization, and any constrained jet-base row. | Same compact source, mass-distance calibration, time window, scattering treatment, and plasma/emissivity nuisance record. | `image_nuisance_split` or `visibility_image_record_split` |
| $\mathcal P_{\mathrm{GW}}$ | Projected strain modes plus remnant mass/spin, ringdown frequency and damping time when $W$ contains collapse or merger history. | Same source-event ledger, effective-metric channel, radiated energy/angular momentum, remnant identity, and horizon-interface record. | `ringdown_without_remnant_label` or `waveform_source_split` |
| $\mathcal P_{\mathrm{id}}$ | Carrier, source-window, support, event-ledger, horizon-interface, observer-record, and no-hidden-retune identifiers for every row. | Identifier equality across all populated components, with explicit `not_applicable` rather than an omitted row. | `prediction_identity_mismatch` or `prediction_row_unowned` |

Plainly: The output is a bundle, not one headline number. It must predict where the horizon and light ring appear, how exterior instruments respond, what an image or merger detector would see when applicable, and prove that all those answers came from the same source record.

## Horizon And Scale Rows

The apparent-horizon projection is slice dependent. The event-horizon projection is global and cannot be inferred from $F_H=0$ on a finite window alone. If $H_{\mathrm{app}}$ and $H_{\mathrm{evt}}$ are both available, their declared comparison residual is

$$
\mathcal R_{\mathrm{hor}}
=
d_H\!\left(H_{\mathrm{app}},H_{\mathrm{evt}};\mathcal A_{\mathrm{obs}}\right),
$$

where $d_H$ and its tolerance must be declared before the comparison. This residual tests the effective projection; it does not identify either surface with the native interface by definition.

For a nonrotating exterior recovery benchmark, the same carrier must approach

$$
\frac{r_{\mathrm{LR}}}{r_H}=\frac{3}{2},
\qquad
\frac{r_{\mathrm{ISCO}}}{r_H}=3.
$$

For rotating records, $r_H(M,\mathbf J)$, $r_{\mathrm{LR}}(M,\mathbf J)$, and $r_{\mathrm{ISCO}}(M,\mathbf J)$ remain separate spin- and branch-dependent outputs. The nonrotating ratios and their rotating counterparts are observer-level GR/Kerr recovery targets, not architrino-level premises.

Plainly: A local horizon candidate does not automatically prove a global event horizon. The familiar $1.5$ and $3$ scale ratios are comparison targets for the nonrotating limit, not assumptions used to build the native solution.

## Exterior Measurement Residuals

For every populated observer channel, let $\mathbf y_k^{\mathrm{pred}}$ be the projection from $\mathcal O_H$ through $\mathcal I_k$ and let $\mathbf y_k^{\mathrm{obs}}$ be the retained measurement packet. The comparison residual is

$$
\mathcal R_k^2
=
\left(\mathbf y_k^{\mathrm{pred}}-\mathbf y_k^{\mathrm{obs}}\right)^{\mathsf T}
C_k^{-1}
\left(\mathbf y_k^{\mathrm{pred}}-\mathbf y_k^{\mathrm{obs}}\right).
$$

The instrument owner must state how singular covariance directions, systematic uncertainties, and nuisance marginalization are handled. This generic residual does not supply a measurement, a tolerance, or an independent oracle. Those belong to the source-bound prediction instance.

Plainly: Once a real prediction and data packet exist, they are compared using the instrument's declared uncertainties. This equation defines the comparison; it does not pretend that data or an error budget have already been supplied.

## Imaging Projection

The horizon-scale imaging row is

$$
\mathcal P_{\mathrm{img}}
=
\left(
D_{\mathrm{ring}},
f_w,
C_{\mathrm{dep}},
\mathcal V_{ij}(u,v,t),
\Phi^{\mathrm{cl}}_{ijk}(t),
A^{\mathrm{cl}}_{ijkl}(t),
\Pi_{\mathrm{lin}}(\varphi,t),
\Pi_{\mathrm{circ}}(\varphi,t),
J_{\mathrm{base}}(R,t)
\right).
$$

When a matched GR/Kerr comparison is declared, the dimensionless ring-diameter residual is

$$
\delta_{\mathrm{ring}}
=
\frac{D_{\mathrm{ring}}^{\mathrm{SF2}}-D_{\mathrm{ring}}^{\mathrm{GR/Kerr}}}
{D_{\mathrm{ring}}^{\mathrm{GR/Kerr}}}.
$$

Both sides must use the same mass-distance calibration, time window, scattering model, and plasma/emissivity nuisance family. A ring-diameter match alone cannot establish a horizon, because the visibility, closure, polarization, variability, and central-depression rows remain independent checks.

Plainly: Matching the apparent size of a ring is only one test. The full image data and the same environmental assumptions must agree before the model can claim an imaging success.

## Merger And Ringdown Projection

When the admitted source window contains a collapse or merger, define

$$
\mathcal P_{\mathrm{GW}}
=
\left(
h_{\ell m}^{\mathrm{SF2}}(t_{\mathrm{eff}}),
M_f,
\mathbf J_f,
f_{\mathrm{ring}},
\tau_{\mathrm{ring}},
E_{\mathrm{rad}},
\mathbf J_{\mathrm{rad}},
\operatorname{id}(\mathcal L_{E\mathbf p\mathbf J})
\right).
$$

The remnant ledger must close before $f_{\mathrm{ring}}$ or $\tau_{\mathrm{ring}}$ is treated as a prediction. Detector comparison remains owned by the versioned public gravitational-wave packet; this row only fixes the handoff from the strong-field carrier to that packet.

Plainly: A ringdown fit counts only if the same merger record also explains the final object's mass and spin and accounts for the energy and angular momentum carried away.

## No-Hidden-Retune Intersection

Let $K(\mathcal O_H)$ be the set of applicable observer channels for the source. The same-record acceptance set is

$$
\mathfrak C_{\mathrm{SF2}}
=
\left\{
\mathcal O_H:
\mathcal A_H(\mathcal O_H)=1,
\ \bigwedge_{k\in K(\mathcal O_H)}\mathcal R_k\le\epsilon_k,
\ \mathcal S_{\mathrm{retune}}=0
\right\}.
$$

The tolerances $\epsilon_k$, nuisance families, and applicability decisions must be frozen before the result is inspected. A successful row may not compensate for a failed row, and an inapplicable row must state why the source or instrument cannot produce it.

Plainly: The model passes only where all applicable predictions succeed together with one unchanged source state. It cannot tune one black hole for imaging and a different version of the same black hole for timing or ringdown.

## Prediction States And Current Verdict

| State | Minimum evidence | Allowed claim |
| --- | --- | --- |
| `Not advanced` | Missing or failed SF-001 admission, source support, observer record, or applicable projection row. | No observer prediction. |
| `structural_only` | This contract plus a derived identity, separation, or consistency consequence, but no populated source-bound carrier. | Conditional same-record constraint only. |
| `numerical_candidate` | Populated source-bound carrier and frozen observer packet produce numerical outputs. | Candidate numerical prediction; no correctness claim. |
| `independently_checked` | Numerical candidate passes declared residuals against independent retained measurements or an analytically known case. | Measured agreement within the named instrument and regime. |

The current SF-002 verdict is `structural_only`. The derived consequences are: observer rows must share one admitted SF-001 record; event-horizon claims require global support beyond a local finite-window solve; horizon and light-ring scales remain distinct absent a same-carrier coincidence derivation; and nonrotating GR recovery requires the $3/2$ and $3$ scale ratios. The first numerical blocker is `missing_accepted_black_hole_horizon_interface_carrier`.

Plainly: We have four exact consistency predictions but no calculated black-hole numbers. The next scientific advance must be a real accepted carrier, not another normalized fixture or prose-only equation map.

## Consumer Handoff

- SF-003 may consume only $\mathcal B_H$, $A_H$, and label-density rows from the same admitted carrier. This projection contract does not supply an entropy coefficient.
- SF-004 may consume only release rows already owned by the compact-region ledger. This projection contract does not select jets, diffuse outflow, or dark-sector channels.
- SF-005 may compare a numerical candidate against GR-like behavior only after at least one $\mathcal R_k$ is populated with a source-bound prediction, frozen nuisance record, and independent measurement packet.
- SF-007 owns the public detector packet and may consume $\mathcal P_{\mathrm{GW}}$ only when a collapse or merger record provides all source, remnant, and ledger identifiers.

## Acceptance And Falsifiers

The SF-002 projection contract is complete at priority-contract grade because it:

- defines one observer record and one six-component prediction vector;
- preserves the distinction among native horizon interface, apparent horizon, event horizon, and light ring;
- states concrete nonrotating scale-ratio recovery targets without importing them into the substrate calculation;
- binds exterior, image, and conditional waveform rows to one source identity and no-hidden-retune witness;
- provides component residuals, prediction states, and fail-closed codes;
- and gives SF-003 through SF-007 exact consumer boundaries.

The scientific queue item is not complete until one admitted source-bound $\mathcal O_H$ produces at least one `numerical_candidate` observer row. The contract is falsified if it permits a projection from $\mathcal A_H=0$, infers an event horizon from inadequate temporal support, identifies horizon and light ring without a branch derivation, changes the native carrier while fitting an observer channel, omits an applicable residual, or calls agreement measured without an independent instrument or analytic reference.

Plainly: The paperwork portion is finished and testable. The prediction itself remains open until a real strong-field record fills the contract and survives an independent comparison.
