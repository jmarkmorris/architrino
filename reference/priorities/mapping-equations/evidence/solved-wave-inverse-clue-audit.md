# EQM-010 Solved-Wave Inverse-Clue Audit

## Disposition

Status: `complete` on 2026-09-02. This bounded audit retains six solved-wave clues that already map to an existing Equation Mapping row and an operator-checkable falsifier. It adds no equation row, requirement, checker, score change, accepted carrier, or reader-facing claim.

The audited comparison material was already available in the repository: the scalar-wave and Green-function construction in [Action Model Comparison](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md), the Klein-Gordon mode and dispersion construction in [Relativistic Scalar Fields and the Klein-Gordon Equation](../../../../content/markdown/aaa/philosophy-history/theory-bridges/klein-gordon-scalar-fields.md), the solved-family routing in [Equation Mapping Detail](../analysis/equation.md#solved-wave-solutions-as-inverse-clue-benchmarks), and the existing `EQ-12` through `EQ-15` source-field maps. No external source was newly acquired or inspected, so Source Mining history is unchanged.

Plainly: this audit organizes already available mathematics into tests for existing work. It does not treat a solved field equation as the physical substrate and does not claim that any open native carrier has been found.

## Retention Rule

A clue is retained only when all four conditions hold:

1. the solved family supplies a definite relation or support property rather than a broad analogy;
2. the relation constrains a named existing equation row or carrier field;
3. the same existing owner names a failure control or a directly measurable residual that can overturn the comparison;
4. the comparison remains downstream of the native carrier and cannot satisfy that carrier by itself.

Plainly: a familiar solution is useful here only when it tells an existing row exactly what to measure and exactly how the comparison can fail.

## Retained Clues

| Solved family and comparison property | Concrete inverse clue | Existing row and carrier | Existing falsifier or operator-checkable failure | Claim grade |
| --- | --- | --- | --- | --- |
| Three-dimensional causal Green function, with support on $T-T_t=r/c_f$ and amplitude proportional to $1/(4\pi r)$ | A coarse-grained wake response must preserve source-event identity, enumerate every simple causal root, remain zero before the arrival surface, and reproduce the geometric amplitude convention only after the source normalization is fixed. For a moving source, evaluation of the delta support must also expose the root Jacobian rather than silently absorb it into a fitted amplitude. | `EQ-13` source/current and causal-support rows, with the `EQ-12` `path_history_transfer_row` as the packet-path consumer. | `solved_wave_import_without_native_packet` must stop the comparison at `missing_accepted_theta_gamma_packet`. Independently, any nonzero pre-arrival response, missing simple root, or amplitude obtained only by changing source normalization falsifies this clue on the declared window. | Standard mathematical result used as an effective comparison; native implication inferred. |
| Plane-wave or eikonal family, with massless comparison relation $\omega^2=c_{\mathrm{eff}}^2\lVert\mathbf k\rVert^2$ | Phase, group, and path speeds must be read from the same packet path and Noether sea state; dispersion may not be fitted on a separate record from frequency transfer. | `EQ-12` `null_eikonal_row`, `path_history_transfer_row`, and `noether_sea_path_row`; downstream `EQ-13` Maxwell/wave residual. | `solved_wave_import_without_native_packet` blocks the field-only import. On an accepted carrier, the clue fails if phase or group speed departs from the declared $c_\gamma$ tolerance, or if either speed uses a different packet/path/window id. | Effective recovery target; no native derivation claimed. |
| Cavity or boundary normal modes, with discrete $\mathbf k_n$ fixed by the declared boundary and only transverse photon modes admitted | The accepted packet branch must supply its boundary readout and Gate B transverse mode count from one carrier; mode counting cannot be inserted after the spectrum is known. | `EQ-12` packet branch and Gate B transverse-count/helicity rows; `EQ-22A` may consume the count only after the `EQ-12` carrier exists. | `longitudinal_leakage` must fail the helicity or Gate B leakage condition. A mode set that changes when a hidden boundary fit is removed, or a transverse count sourced from a different carrier, also falsifies the clue. | Effective boundary/mode-counting target. |
| Scattering solution with conserved incoming/outgoing flux and a phase shift on one declared channel | The phase comparison must share the source event, packet identity, receiver coupling, recoil/remnant accounting, and event balance. A matched phase without the same-record flux ledger is discarded. | `EQ-12` receiver coupling and event-balance rows, with the `EQ-13` continuity, energy, momentum, angular-momentum, and gauge residuals as downstream comparisons. | `split_packet_carrier` must fail at `carrier_split_or_missing_common_carrier`; `same_packet_absorption_reemission_collapse` must fail Gate C/event balance. Any flux deficit outside the declared recoil/remnant/medium rows falsifies the clue. | Effective scattering comparison; native implication inferred. |
| Free Klein-Gordon modes, with $\omega^2=c_{\mathrm{eff}}^2\lVert\mathbf k\rVert^2+\omega_0^2$ | A nonzero gap must come from one stable assembly or Noether sea mode and use the same action-period and mass/exposure conventions as the ordered-frame branch. The comparison provides no permission to assign a primitive mass or scalar field. | `EQ-15` Dirac/Klein-Gordon dispersion benchmark after `ordered_frame_loop`, `angular_momentum_ledger`, downstream mass/exposure rows, and the relevant action-period row are source-backed. | `equation_map.imported_formula` blocks evaluation before those rows exist. After they exist, a gap that varies with $\mathbf k$ beyond the declared residual or requires mode-by-mode action/mass retuning falsifies the clue. | Standard dispersion relation used as a downstream recovery target. |
| Free Schrödinger Gaussian packet and its density/current continuity | The density profile, spreading, and probability-current comparison must be projections of one retained finite-window measure and transition map. Density and current cannot be supplied by separate fitted objects. | `EQ-14` parent `W`, `Theta_rhoJ`, `record_current_samples`, continuity, density-reference, and current-reference rows. | `eq14.measure_flow_split`, `blocked_eq14_continuity_residual`, `blocked_eq14_density_reference_residual`, and `blocked_eq14_current_reference_residual` already define the failures; `toy_structure_only` prevents a solved Gaussian alone from becoming retained evidence. | Effective quantum comparison; finite-window native implication inferred. |

Plainly: the six clues test arrival support, propagation, boundary mode count, scattering balance, mode gaps, and finite-window density/current flow. Every one points to an existing row and an existing way to reject a false match.

## Worked Inverse Example: Moving-Source Green Function

For the locally available scalar comparison, let

$$
g(T_t)=T-T_t-\frac{\lVert\mathbf X-\mathbf X_t(T_t)\rVert}{c_f}.
$$

At simple roots $T_{t,i}$, the delta-function identity gives

$$
\phi(\mathbf X,T)
=
\sum_i
\frac{q(T_{t,i})}
{4\pi r_i\left|1-\mathbf n_i\cdot\mathbf V_t(T_{t,i})/c_f\right|}.
$$

The reverse structural constraint is therefore not merely finite propagation speed. A candidate native-to-effective map must export (i) the complete simple-root set, (ii) the source identity and emission weight attached to each root, (iii) the root-transversality factor, and (iv) the pre-arrival zero-support condition before its field comparison is evaluated. The exact missing step is the source-backed coarse-graining from those native rows to an accepted `EQ-13` field/current record; the existing comparison formula does not supply that map.

Plainly: the solved Green function tells us which bookkeeping must survive coarse-graining. It cannot manufacture the native bookkeeping, but it exposes a false mapping if roots disappear, early response appears, or source strength is quietly refitted.

## Rejected Or Deferred Families

| Candidate family | Disposition | Reason |
| --- | --- | --- |
| Arbitrary bound-state spectra | Rejected from this audit | No single existing Equation Mapping carrier and falsifier accepts a generic spectrum without first declaring the assembly, boundary, exposure, and measurement rows. Retaining it would create a vague new obligation. |
| Generic nonlinear solitons | Rejected from this audit | The present owner has no row-specific soliton carrier or falsifier. Similarity to a localized assembly is analogy only. |
| A solved wavefunction treated as a physical carrier | Rejected | This is exactly the imported-formula and level-collapse failure. |
| Scattering phase shifts without same-record flux and event accounting | Rejected | A phase fit by itself cannot pass the existing `EQ-12`, `EQ-13`, or `EQ-30` carrier boundaries. |

Plainly: the audit stops where a solved family would force a new generic requirement or substitute observer-level mathematics for a native record.

## Closure Boundary

`EQM-010` is complete as an inverse-clue audit because every retained clue has an existing equation row and falsifier, and every ungrounded family has an explicit negative disposition. The audit does not advance `EQ-12`, `EQ-13`, `EQ-14`, `EQ-15`, or `EQ-22A`; does not change their scores; and does not weaken their source-backed carrier requirements.
