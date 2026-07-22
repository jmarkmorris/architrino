# Lorentz Test Residual Handoff

## Packet Status

- Kind: `priority-detail`
- Workstream item: `lorentz_test_residual_handoff`
- Current status: `schema_complete_population_blocked`
- Upstream dependency: `lorentz_gr_bridge`
- Promotion target: none until `lorentz_gr_bridge` closes

This packet defines the residual-export contract that the Lorentz/GR bridge must populate. It is not an empirical fit and not a declaration that the bridge has passed. Every row below is a schema row until the same closed Lorentz/GR bridge supplies the branch, clock, ruler, signal, and medium-response inputs.

The handoff is accepted as a contract only if it prevents three common failures:

1. a Lorentz or PPN result reported as a narrative null without a residual row;
2. clock, ruler, signal, and metric coefficients fitted independently;
3. SME-style coefficients omitted because the expected answer is zero.

## Source Signals Consumed

| Source | Signal retained for this packet |
| --- | --- |
| [master-equation-closure](priorities.md) | The Lorentz/GR bridge is two-stage: first moving-assembly contraction and clock retuning, then coarse-grained medium response and weak-field PPN closure. The existing control row already names RMS, PPN, and SME-style exports. |
| [lorentz-invariance-test-suite](../cross-theory-mapping/lorentz-invariance-test-suite.md) | RMS rows separate Michelson-Morley, Kennedy-Thorndike, and Ives-Stilwell residuals, so two-way isotropy cannot hide clock/ruler coefficient splits. |
| [closure-intersection-ledger](../validation-gates/closure-intersection-ledger.md) | Gravity closure requires one Noether sea response map for clock, ruler, effective signal-speed, weak-field metric, PPN, and preferred-frame rows. |
| [gravitational-redshift-clock-tests](../cross-theory-mapping/gravitational-redshift-clock-tests.md) | Precision clock comparisons use the dressed observer speed $c_0=c_{\text{eff}}(\infty)$ unless a primitive branch calculation proves a special identification with $c_f$. |
| [shapiro-time-delay](../cross-theory-mapping/shapiro-time-delay.md), [gravitational-lensing](../cross-theory-mapping/gravitational-lensing.md), and [perihelion-precession](../cross-theory-mapping/perihelion-precession.md) | PPN rows must bind redshift, Shapiro delay, lensing, and orbital phase to one effective metric response. |
| [absolute-time-defense](../../../content/markdown/aaa/foundations/absolute-time-defense.md) dynamics-stack pass | Clock validity is tied to the certified-braid return record, memory-boundary recurrence, clock/ruler rank floor, connected dressed moduli, and matter/sea framing-quadrupole projections. This sharpens the Lorentz export schema without reopening the upstream binary-frequency-search proof kernels. |

## Export Object

For a retained branch class $q$, the residual handoff object is
$$
\mathfrak{R}_{\mathrm{LT}}^{(q)}
=
\left(
\mathbf{R}_{\mathrm{RMS}}^{(q)},
\mathbf{P}_{\mathrm{PPN}}^{(q)},
\mathbf{R}_{\mathrm{SME}}^{(q)},
\mathcal{N}_{0}^{(q)},
\mathcal{D}_{\mathrm{dep}}^{(q)},
\mathcal{F}_{\mathrm{fail}}^{(q)}
\right),
$$
where $\mathcal{N}_{0}^{(q)}$ is the explicit null-row ledger, $\mathcal{D}_{\mathrm{dep}}^{(q)}$ records dependency gates and source artifacts, and $\mathcal{F}_{\mathrm{fail}}^{(q)}$ records failure codes.

The handoff may be emitted in `blocked_upstream` state before `lorentz_gr_bridge` closes. It may not be emitted in `computed`, `pass`, or `zero_with_bound` state until the upstream bridge has a closed artifact that fixes the same branch record for clock, ruler, signal, and medium response.

## Required Inputs

| Input id | Required object | Normalization role | Failure if missing |
| --- | --- | --- | --- |
| `branch_id` | Branch class $q$, drift band $\mathcal{D}_\beta$, active-root ledger, inactive gaps, Jacobian floor, memory depth, and regulator state. | Identifies the retained row. | `residual.branch_unidentified` |
| `moving_shape` | $a_{\parallel,q}(v)$, $a_{\perp,q}(v)$, drift direction $\hat{\mathbf e}_{\parallel}$, and extraction map from the same branch cycle. | Feeds ruler and anisotropy rows. | `residual.ruler_missing` |
| `clock_channel` | Clock phase $\theta_{\mathrm{clk},q}$, $T_q(v)$ or $\omega_{\mathrm{clk},q}(v)$, and rest reference $T_0$ or $\omega_0$. | Feeds RMS Ives-Stilwell and weak-field redshift rows. | `residual.clock_missing` |
| `clock_branch_certificate` | Certified-braid return residual $\mathcal R_{\mathrm{cert}}$, non-symmetry Floquet margin, memory-boundary recurrence row, and moduli-component / assembly topological charge identifiers for the clock branch. | Establishes that the phase record is a valid proper-time standard rather than a drifting oscillator. | `clock.certified_braid_missing`, `clock.floquet_margin_failed`, or `clock.memory_boundary_leak` |
| `signal_channel` | Round-trip signal time $T_{\circlearrowleft}(\beta,\hat{\mathbf n})$, synchronization convention, channel speed $c_\star$, and photon specialization $c_\gamma$ when used. | Feeds two-way and Michelson-Morley rows. | `residual.signal_missing` |
| `speed_convention` | Declaration of $c_f$, $c_\star$, $c_\gamma$, and $c_0=c_{\text{eff}}(\infty)$ where applicable. | Prevents primitive/dressed speed conflation. | `residual.speed_conflation` |
| `medium_response` | One Noether sea response record $\mathcal{M}_{\mathrm{sea}}^{ab}$ or bridge equivalent fixing $n$, $\chi_{\text{sea}}$, $\Phi_{\mathrm{eff}}$, stress, lapse, shift, spatial compliance, $G_{\mathrm{eff}}$, $c_{\text{eff}}$, and $c_\gamma$ projections, together with the same retained-history source record $\Theta_{\mathrm{sea}}(\mathfrak B)$ used by the active-root, event-ledger, and regulator rows. | Feeds clock/ruler, PPN, SME gravity-sector, matter-speed, and photon rows from one sea-constitutive object on one retained branch chart. | `residual.medium_response_missing`, `residual.retained_history_mismatch`, or `gravity.hidden_tuning` |
| `framing_quadrupoles` | Matter framing quadrupole $Q_A^{ij}$, sea-response trace-free quadrupole or $\zeta_{ij}^{\mathrm{TF}}$, and $D_{\mathrm{plane}}$ or equivalent frame-conditioning row when a Noether braid branch supplies the clock or matter assembly. | Feeds orientation leakage, two-way photon anisotropy, Hughes-Drever matter anisotropy, and scalar-mass anisotropy as one $\ell=2$ obstruction family. | `lorentz.framing_quadrupole_missing` or `lorentz.frame_isotropy_failed` |
| `event_ledger` | $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}$ row states, selected route identifiers, and legal null rows for any recoil, medium update, remnant deformation, radiation output, or product inventory associated with the same branch. | Ties the Lorentz packet to `G0_branch_admissibility` provenance and lets `G7_null_row_audit` verify that no residual was hidden in an omitted event row. | `event.ledger_residual` or `residual.provenance_gap` |
| `frame_projection` | Laboratory frame, preferred-frame drift vector, epoch convention, and Sun-centered comparison-frame transform for SME-style coefficients. | Gives coefficient signs, axes, and time harmonics. | `residual.frame_projection_missing` |
| `bounds` | Declared bound vector or covariance for RMS, PPN, and SME-style rows. | Converts raw residuals into dimensionless normalized residuals. | `residual.bound_missing` |
| `artifact_refs` | Closed upstream proof, simulation, or interval artifact identifiers. | Makes the export replayable. | `residual.provenance_gap` |

All rows must use one branch and one observable-extraction rule. A row that changes $\kappa$, $\eta$, clock geometry, branch identity, medium coefficients, or frame projection between residual families is a failed export, not a multi-row fit.

## RMS Residual Rows

Use Robertson-Mansouri-Sexl barred offsets from the special-relativistic expansion:
$$
a(\beta)
=
1+\left(-\frac12+\bar{\alpha}\right)\beta^2+O(\beta^4),
$$
$$
b(\beta)
=
1+\left(\frac12+\bar{\beta}\right)\beta^2+O(\beta^4),
\qquad
d(\beta)
=
1+\bar{\delta}\beta^2+O(\beta^4).
$$

The branch export is
$$
\mathbf{R}_{\mathrm{RMS}}^{(q)}
=
\begin{pmatrix}
R_{\mathrm{MM}}^{(q)}\\
R_{\mathrm{KT}}^{(q)}\\
R_{\mathrm{IS}}^{(q)}
\end{pmatrix}
=
\begin{pmatrix}
\bar{\delta}^{(q)}-\bar{\beta}^{(q)}\\
\bar{\beta}^{(q)}-\bar{\alpha}^{(q)}\\
\bar{\alpha}^{(q)}
\end{pmatrix}.
$$

The adapter from branch observables to the coefficient row must also report the direct diagnostics
$$
\Delta_{\mathrm{tw}}^{(q)}(\beta,\hat{\mathbf n})
=
\frac{
T_{\circlearrowleft}^{(q)}(\beta,\hat{\mathbf n})
-\langle T_{\circlearrowleft}^{(q)}(\beta,\hat{\mathbf n})\rangle_{\hat{\mathbf n}}
}{
\langle T_{\circlearrowleft}^{(q)}(\beta,\hat{\mathbf n})\rangle_{\hat{\mathbf n}}
},
$$
$$
\Delta_{\mathrm{KT}}^{(q)}(\beta_1,\beta_2)
=
\frac{T_{\circlearrowleft}^{(q)}(\beta_1)}{T_{\circlearrowleft}^{(q)}(\beta_2)}
-1
-
\left[
\frac{T_{\circlearrowleft}^{\mathrm{SR}}(\beta_1)}{T_{\circlearrowleft}^{\mathrm{SR}}(\beta_2)}
-1
\right],
$$
and
$$
\Delta_{\mathrm{IS}}^{(q)}(\beta)
=
\frac{\omega_{\mathrm{clk},q}(\beta)}{\omega_0}
-
\left(
1-\frac12\beta^2-\frac18\beta^4
\right).
$$

The normalized RMS residual is
$$
\widehat{\mathbf{R}}_{\mathrm{RMS}}^{(q)}
=
B_{\mathrm{RMS}}^{-1}\mathbf{R}_{\mathrm{RMS}}^{(q)},
\qquad
\left\|\widehat{\mathbf{R}}_{\mathrm{RMS}}^{(q)}\right\|_\infty\le1,
$$
where $B_{\mathrm{RMS}}$ is the declared diagonal bound vector or a covariance-root map supplied by the Lorentz-test adapter. The two-way photon projection must separately report
$$
\sup_{\beta,\hat{\mathbf n}}
\left|\Delta_{\mathrm{tw}}^{(q)}(\beta,\hat{\mathbf n})\right|
\le
\epsilon_{\mathrm{MM}},
$$
with $\epsilon_{\mathrm{MM}}$ declared by the direct photon-sector comparison row.

| Row id | Raw residual | Required inputs | Null row allowed? | Failure conditions |
| --- | --- | --- | --- | --- |
| `rms.mm` | $R_{\mathrm{MM}}=\bar{\delta}-\bar{\beta}$ and $\Delta_{\mathrm{tw}}$ | `moving_shape`, `signal_channel`, `clock_channel`, `speed_convention` | Only `zero_with_bound` after a closed two-way cancellation proof. | `lorentz.two_way_residual`, `lorentz.coefficient_split` |
| `rms.kt` | $R_{\mathrm{KT}}=\bar{\beta}-\bar{\alpha}$ and $\Delta_{\mathrm{KT}}$ | Same branch at two or more drift speeds. | No, unless the drift band is explicitly zero-width and row state is `not_applicable`. | `lorentz.boost_residual`, `lorentz.coefficient_split` |
| `rms.is` | $R_{\mathrm{IS}}=\bar{\alpha}$ and $\Delta_{\mathrm{IS}}$ | Clock channel and rest reference from the retained branch. | Only `zero_with_bound` after clock retuning closes. | `lorentz.clock_residual`, `clock.hidden_tuning` |

## PPN Residual Rows

The PPN export vector is
$$
\mathbf{P}_{\mathrm{PPN}}^{(q)}
=
\begin{pmatrix}
\gamma_{\mathrm{PPN}}^{(q)}-1\\
\beta_{\mathrm{PPN}}^{(q)}-1\\
\alpha_1^{(q)}\\
\alpha_2^{(q)}\\
\alpha_3^{(q)}
\end{pmatrix}.
$$

It is normalized by the current source-mined Will benchmark vector
$$
\mathbf{b}_{\mathrm{Will}}
=
\begin{pmatrix}
2.3\times10^{-5}\\
8\times10^{-5}\\
4\times10^{-5}\\
2\times10^{-9}\\
4\times10^{-20}
\end{pmatrix},
\qquad
\widehat{\mathbf{P}}_{\mathrm{PPN}}^{(q)}
=
\operatorname{diag}(\mathbf{b}_{\mathrm{Will}})^{-1}
\mathbf{P}_{\mathrm{PPN}}^{(q)}.
$$

The row passes only if
$$
\left\|\widehat{\mathbf{P}}_{\mathrm{PPN}}^{(q)}\right\|_\infty\le1
$$
and the same medium-response coefficients supply clock redshift, Shapiro delay, lensing, weak-field acceleration, orbital precession, and preferred-frame residuals.

| Row id | Raw residual | Required inputs | Null row allowed? | Failure conditions |
| --- | --- | --- | --- | --- |
| `ppn.gamma` | $\gamma_{\mathrm{PPN}}-1$ | Spatial compliance and null-path delay from the same $\mathcal{M}_{\mathrm{sea}}^{ab}$ record. | No. | `ppn.gamma_split`, `shapiro.gamma_split`, `lensing.gamma_split` |
| `ppn.beta` | $\beta_{\mathrm{PPN}}-1$ | Lapse row through second weak-field order, clock redshift, and orbital phase extraction. | No. | `ppn.beta_missing`, `precession.ppn_split` |
| `ppn.alpha1` | $\alpha_1$ | Shift row and medium drift $w^i$ projection. | Only `zero_with_bound` after shift-row cancellation is proved. | `ppn.preferred_frame_alpha1` |
| `ppn.alpha2` | $\alpha_2$ | Shift/spatial-compliance cross terms and frame projection. | Only `zero_with_bound` after shift-row cancellation is proved. | `ppn.preferred_frame_alpha2` |
| `ppn.alpha3` | $\alpha_3$ | Momentum-conservation and preferred-frame acceleration row. | Only `zero_with_bound` after the same conservation ledger proves cancellation. | `ppn.preferred_frame_alpha3` |

A PPN export fails if it copies a GR weak-field metric as a fit template without deriving the lapse, shift, and spatial-compliance rows from the Noether sea response record.

## SME-Style Residual Rows

The SME-style export is a comparison projection, not a substrate-law extension:
$$
\mathbf{R}_{\mathrm{SME}}^{(q)}
=
\left(
\tilde{\kappa}_{e-}^{(q)},
\tilde{\kappa}_{o+}^{(q)},
\tilde{\kappa}_{\mathrm{tr}}^{(q)},
\bar{s}^{\mu\nu(q)},
\mathbf{c}_{\mathrm{matter}}^{(q)}
\right).
$$

Each coefficient block must be reported in the declared Sun-centered comparison frame or marked `blocked_frame_projection`. The normalized block is
$$
\widehat{\mathbf{R}}_{\mathrm{SME},A}^{(q)}
=
L_A^{-1}\mathbf{R}_{\mathrm{SME},A}^{(q)},
$$
where $A$ is the photon, gravity, or matter block and $L_A$ is either the diagonal bound vector or the covariance-root map for that block. The acceptable condition is coefficientwise replayability plus
$$
\left\|\widehat{\mathbf{R}}_{\mathrm{SME},A}^{(q)}\right\|_\infty\le1
$$
for every populated block. A global scalar is optional and may not replace the coefficient table.

| Block id | Coefficients | Required inputs | Null row allowed? | Failure conditions |
| --- | --- | --- | --- | --- |
| `sme.photon` | $\tilde{\kappa}_{e-}$, $\tilde{\kappa}_{o+}$, $\tilde{\kappa}_{\mathrm{tr}}$ | Photon or signal-channel projection, birefringence/dispersion guard, two-way timing, frame transform. | Only `zero_with_bound` after photon-channel closure and frame projection. | `sme.photon_projection_missing`, `photon.dispersion_leakage`, `lorentz.two_way_residual` |
| `sme.gravity` | $\bar{s}^{\mu\nu}$ | Effective metric perturbation, medium drift, PPN preferred-frame rows, weak-field frame transform. | Only `zero_with_bound` after metric and shift rows close. | `sme.gravity_projection_missing`, `ppn.preferred_frame_residual` |
| `sme.matter` | $\mathbf{c}_{\mathrm{matter}}$ by matter clock or spin-precession channel | Matter branch, clock species, spin or transition row, lab-to-Sun-frame transform. | `not_applicable` only when the exported branch has no matter-clock comparison claim. | `sme.matter_projection_missing`, `clock.species_split` |

An SME-style row with all expected coefficients equal to zero is still a populated row. The row must state `row_state: zero_with_bound`, list the coefficients, give the bound or covariance source, and cite the upstream cancellation artifact.

## Null-Row Discipline

No residual family may be omitted. Each row has exactly one of these states:

| State | Meaning | Counts as pass? |
| --- | --- | --- |
| `blocked_upstream` | Required upstream Lorentz/GR bridge artifact is not closed. | No. |
| `blocked_frame_projection` | Branch data exist, but no accepted projection into the comparison frame exists. | No. |
| `not_applicable` | The branch makes no claim in the row's physical sector, and the omission is justified by the scope of the branch. | No global pass unless the validation gate also excludes that sector. |
| `computed` | Raw and normalized residuals are populated from replayable inputs. | Only if within bounds. |
| `zero_with_bound` | A cancellation proof or interval certificate gives a zero row with declared tolerance. | Yes, if dependencies and bounds are present. |
| `failed` | Raw or normalized residual exceeds bound, or schema rules are violated. | No. |

Null rows are not empty rows. A null row must include `row_id`, `row_state`, `branch_id`, `dependency_gate`, `reason`, `bound`, `normalization`, and `artifact_refs`.

## Acceptable Export Format

The residual export may be represented as a table, JSON, YAML, or a script-generated report, but every row must contain these fields:

| Field | Required content |
| --- | --- |
| `row_id` | Stable id such as `rms.mm`, `ppn.gamma`, or `sme.photon.kappa_e_minus`. |
| `family` | `RMS`, `PPN`, or `SME`. |
| `branch_id` | The retained branch class $q$ and artifact version. |
| `row_state` | One of the null-row states above. |
| `raw_residual` | Number, interval, vector, or coefficient map before normalization. |
| `normalization` | Bound vector, covariance-root map, units, and sign convention. |
| `normalized_residual` | Dimensionless number, interval, vector, or coefficient map. |
| `acceptance_rule` | Usually $\|\cdot\|_\infty\le1$ or coefficientwise inclusion in the declared bound interval. |
| `dependency_gate` | Upstream gate id from the table below. |
| `source_inputs` | Branch, clock, ruler, signal, speed, medium-response, and frame-projection artifacts consumed. |
| `artifact_refs` | Replayable proof, simulation, interval, or data-adapter artifacts. |
| `failure_code` | Empty only when `row_state` is `computed` within bound or `zero_with_bound`. |

Minimal row example:

```yaml
row_id: ppn.alpha2
family: PPN
branch_id: q_bridge_vN
row_state: blocked_upstream
raw_residual: null
normalization:
  bound: 2.0e-9
  units: dimensionless
  convention: Will preferred-frame alpha_2 row
normalized_residual: null
acceptance_rule: abs(normalized_residual) <= 1
dependency_gate: G4_effective_metric_and_shift
source_inputs:
  branch: null
  clock_channel: null
  signal_channel: null
  medium_response: null
  frame_projection: null
artifact_refs: []
failure_code: residual.bridge_not_closed
```

## Dependency Gates

| Gate id | Requirement | Rows unlocked |
| --- | --- | --- |
| `G0_branch_admissibility` | The retained branch has active-root ledger, inactive gaps, Jacobian floor, finite memory depth, stable monodromy or trapping, and no undeclared branch transition. | None by itself; all rows depend on it. |
| `G1_moving_assembly` | The bridge closes $a_{\parallel}/a_{\perp}=1/\gamma_\star+R_{\parallel}$ on the drift band. | `rms.mm`, `rms.kt` inputs. |
| `G2_clock_retuning` | The same branch closes $T(v)/T_0=\gamma_\star+R_T$ or the equivalent clock-frequency law. | `rms.is`, clock parts of PPN and SME matter rows. |
| `G3_two_way_signal` | The same branch and channel speed close $\Delta_{\mathrm{tw}}$ within the declared direct photon-sector bound. | `rms.mm`, `sme.photon`. |
| `G4_effective_metric_and_shift` | The medium-response record derives lapse, shift, spatial compliance, and signal-speed projections from one $\mathcal{M}_{\mathrm{sea}}^{ab}$-level object on the same retained branch chart named by $\Theta_{\mathrm{sea}}(\mathfrak B)$. | All PPN rows and `sme.gravity`. |
| `G5_frame_projection` | The export supplies lab-frame, preferred-frame, epoch, and Sun-centered comparison-frame transforms. | All SME-style rows and preferred-frame PPN diagnostics. |
| `G6_bounds_and_covariance` | Bound vectors or covariance-root maps are declared before comparison. | Normalized RMS, PPN, and SME-style pass/fail verdicts. |
| `G7_null_row_audit` | Every expected row is present with a legal `row_state`. | Final handoff acceptance. |

The line item `lorentz_test_residual_handoff` remains pending while `lorentz_gr_bridge` is pending. This packet can be marked schema-complete, but the populated residual handoff cannot be marked complete before `G0` through `G7` pass on a closed Lorentz/GR bridge artifact.

## Failure Ledger

| Failure code | Trigger | Required routing |
| --- | --- | --- |
| `residual.bridge_not_closed` | Any row is requested as `computed` before `lorentz_gr_bridge` closes. | Block population; keep schema row only. |
| `residual.row_omitted` | RMS, PPN, or SME-style expected row is absent. | Fail `G7_null_row_audit`. |
| `residual.bound_missing` | A raw residual is reported without bound vector, covariance, unit, or sign convention. | Fail normalization. |
| `residual.coefficient_split` | Clock, ruler, signal, PPN, or SME rows require independently tuned coefficients. | Route to validation-gates hidden-tuning witness. |
| `residual.retained_history_mismatch` | The medium-response row uses a different branch class, retained window, regulator state, root ledger, or event ledger than the force/action rows. | Fail `G4_effective_metric_and_shift`; route back to the topological causal-root ledger compatibility boundary. |
| `residual.speed_conflation` | Primitive $c_f$ is silently substituted for $c_\star$, $c_\gamma$, or $c_0$. | Route to clock/signal speed-convention repair. |
| `residual.frame_projection_missing` | SME-style or preferred-frame row lacks comparison-frame transform. | Block SME and preferred-frame PPN rows. |
| `residual.provenance_gap` | Row cannot be replayed from named proof, simulation, interval, or adapter artifacts. | Fail export. |
| `residual.hidden_zero` | A zero residual is asserted by omission or prose rather than `zero_with_bound`. | Fail null-row audit. |
| `residual.observable_refit` | Normalization or extraction changes per observable after branch closure. | Fail shared-response contract. |

## Completion Criterion

This packet is complete as a schema when all required row families, inputs, normalizations, null-row states, acceptable formats, dependency gates, and failure conditions are defined. The residual handoff line item is complete only later, when a closed `lorentz_gr_bridge` artifact populates $\mathfrak{R}_{\mathrm{LT}}^{(q)}$ with `computed` or `zero_with_bound` rows and no failed dependency gate.
