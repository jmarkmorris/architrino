# NN Corridor Overlap First Evaluation

## Metadata

- Kind: quantitative priority row.
- Date captured: July 1, 2026.
- Status: candidate reduced evaluation with first branch-interface channel extraction; not reader-facing canon.
- Supports: [QCD Confinement And Hadronization Recovery Targets](../../mapping-standard-model/qcd-confinement-hadronization-recovery-targets.md) and [Nuclear Binding Closure](./nuclear-binding-closure.md).

## Claim Level

This file is the first numerical evaluation row for the two-nucleon color-singlet corridor residual

$$
\Delta E_{\mathrm{corr}}^{NN}(r).
$$

It is not a recovered nuclear force. The hard benchmark pattern is that the $p+n$ channel needs an intermediate attractive window while the corresponding $p+p$ channel remains unbound after orientation, branch-interface mismatch, and Coulomb rows are included. The channel weights below are now extracted from a first native branch-interface row; the corridor scale, radii, and widths remain source leads until they are derived from accepted proton and neutron envelopes and the same confinement functional.

## Reduced Evaluation Row

For channel $c\in\{pn,pp\}$, define the first reduced channel total as

$$
V_c^{(0)}(r)
=
\Delta E_{\mathrm{corr},c}^{NN}(r)
+
V_{\mathrm{Coul},c}(r),
$$

with

$$
\Delta E_{\mathrm{corr},c}^{NN}(r)
=
-A_{\mathrm{corr}}W_cO_{\mathrm{corr}}(r)
+
B_{\mathrm{int}}M_cI_{\mathrm{int}}(r).
$$

The finite-range corridor overlap and branch-interface exposure rows are

$$
O_{\mathrm{corr}}(r)
=
\exp
\left[
-\frac{(r-r_{\mathrm{corr}})^2}{2\lambda_{\mathrm{corr}}^2}
\right],
\qquad
I_{\mathrm{int}}(r)
=
\exp
\left[
-\frac{(r-r_{\mathrm{int}})^2}{2\lambda_{\mathrm{int}}^2}
\right].
$$

The Coulomb row is kept separate:

$$
V_{\mathrm{Coul},c}(r)
=
\frac{q_c\,\alpha\hbar c}{r},
\qquad
q_{pn}=0,
\qquad
q_{pp}=1.
$$

Here $W_c$ records orientation compatibility and $M_c$ records branch-interface mismatch or exposure cost as extracted from $\mathcal B_{ij}^{\mathrm{int}}$. The attractive row is a low-dimensional projection of the paired closed-corridor minimization, not a borrowed Yukawa potential. The short-core exclusion row $V_{\text{excl}}(r)$ remains outside this first evaluation, so this table should not be read as a complete $V_{NN}$ curve.

Zero-valued rows in the table are evaluated channel rows, not omitted terms. The $p+n$ Coulomb row vanishes because $q_{pn}=0$, and the selected compatible $p+n$ branch-interface penalty vanishes because the extractor below gives $M_{pn}=0.00$. A future nonzero compatible-interface sharing term must be derived from $\mathcal B_{ij}^{\mathrm{int}}$ rather than inserted here.

## First Parameter Set

| Quantity | Value | Status |
| --- | ---: | --- |
| $A_{\mathrm{corr}}$ | $2.25\,\mathrm{MeV}$ | Source lead; deuteron-scale normalization, not yet derived from $\sigma_{\mathrm{eff}}$. |
| $r_{\mathrm{corr}}$ | $1.90\,\mathrm{fm}$ | Source lead; intermediate corridor-overlap radius. |
| $\lambda_{\mathrm{corr}}$ | $0.75\,\mathrm{fm}$ | Source lead; finite-range overlap width. |
| $B_{\mathrm{int}}$ | $2.00\,\mathrm{MeV}$ | Source lead; branch-interface exposure penalty. |
| $r_{\mathrm{int}}$ | $1.40\,\mathrm{fm}$ | Source lead; interface-mismatch radius. |
| $\lambda_{\mathrm{int}}$ | $0.55\,\mathrm{fm}$ | Source lead; interface-mismatch width. |
| $\alpha\hbar c$ | $1.439964\,\mathrm{MeV\,fm}$ | Hard electromagnetic row for the $p+p$ Coulomb comparison. |

## Native Branch-Interface Channel Extraction

The first native channel row replaces inserted $W_c,M_c$ constants with an extraction from

$$
\mathcal B_{ij}^{\mathrm{int}}
=
\left(
\chi_i,\chi_j,
\sigma_{\mathrm{orient}},
\Delta\phi_{ij},
\Delta\omega_{ij},
\lambda_{\mathrm{exp}},
\Delta E_{\mathrm{out}},
\mathcal L_{E\mathbf p\mathbf J}^{ij}
\right).
$$

The orientation term is a counted branch-interface compatibility fraction:

$$
\sigma_{\mathrm{orient},c}
=
\frac{N_{\mathrm{share},c}}{N_{\mathrm{ret},c}},
$$

where $N_{\mathrm{ret},c}$ is the retained local orientation-row count in the channel interface and $N_{\mathrm{share},c}$ is the subset that admits shared closed-corridor relaxation without opening an asymptotic color field. The first branch-interface rows are

$$
\mathcal B_{pn}^{\mathrm{int},0}
=
\left(
\chi_p,\chi_n,
\frac{4}{4},
0,0,0,0,
\mathcal L_{E\mathbf p\mathbf J}^{pn,\mathrm{bal}}
\right),
$$

and

$$
\mathcal B_{pp}^{\mathrm{int},0}
=
\left(
\chi_p,\chi_p,
\frac{1}{4},
0,0,0,0,
\mathcal L_{E\mathbf p\mathbf J}^{pp,\mathrm{same}}
\right).
$$

The phase, cadence, and exposure penalty from the same branch-interface record is

$$
P_c
=
\exp
\left[
-\frac{1}{2}
\left(
\widehat{\Delta\phi}_{ij}^{\,2}
+
\widehat{\Delta\omega}_{ij}^{\,2}
+
\widehat{\lambda}_{\mathrm{exp}}^{\,2}
\right)
\right],
$$

where hats denote dimensionless comparison to the local branch-interface tolerances. The extracted channel weights are

$$
W_c
=
\sigma_{\mathrm{orient},c}P_c,
\qquad
M_c
=
1-W_c.
$$

This gives the channel values used in the numerical table:

| Channel | $N_{\mathrm{share},c}/N_{\mathrm{ret},c}$ | $P_c$ | Extracted $W_c$ | Extracted $M_c$ | Status |
| --- | ---: | ---: | ---: | ---: | --- |
| $p+n$ | $4/4$ | $1.00$ | $1.00$ | $0.00$ | Native first row; compatible branch-interface orientation. |
| $p+p$ | $1/4$ | $1.00$ | $0.25$ | $0.75$ | Native first row; same-proton orientation suppression produces the mismatch penalty. |

## Numerical Evaluation

All entries are in MeV except $r$.

| $r\,(\mathrm{fm})$ | Channel | Corridor attraction | Branch-interface row | Coulomb row | $V_c^{(0)}(r)$ |
| ---: | --- | ---: | ---: | ---: | ---: |
| $1.0$ | $p+n$ | $-1.095$ | $0.000$ | $0.000$ | $-1.095$ |
| $1.0$ | $p+p$ | $-0.274$ | $1.151$ | $1.440$ | $2.318$ |
| $1.5$ | $p+n$ | $-1.952$ | $0.000$ | $0.000$ | $-1.952$ |
| $1.5$ | $p+p$ | $-0.488$ | $1.475$ | $0.960$ | $1.947$ |
| $1.9$ | $p+n$ | $-2.250$ | $0.000$ | $0.000$ | $-2.250$ |
| $1.9$ | $p+p$ | $-0.563$ | $0.992$ | $0.758$ | $1.188$ |
| $2.5$ | $p+n$ | $-1.634$ | $0.000$ | $0.000$ | $-1.634$ |
| $2.5$ | $p+p$ | $-0.408$ | $0.203$ | $0.576$ | $0.371$ |
| $3.0$ | $p+n$ | $-0.767$ | $0.000$ | $0.000$ | $-0.767$ |
| $3.0$ | $p+p$ | $-0.192$ | $0.022$ | $0.480$ | $0.310$ |
| $4.0$ | $p+n$ | $-0.045$ | $0.000$ | $0.000$ | $-0.045$ |
| $4.0$ | $p+p$ | $-0.011$ | $0.000$ | $0.360$ | $0.349$ |

## Benchmark Readout

| Readout | Result | Status |
| --- | --- | --- |
| $p+n$ intermediate window | Negative from $1.0$ to $4.0\,\mathrm{fm}$ in this corridor-only row, with a deuteron-scale trough near $1.9\,\mathrm{fm}$. | Hard benchmark pattern matched; full core behavior still needs $V_{\text{excl}}(r)$. |
| $p+p$ nonbinding check | Positive at every sampled radius after orientation suppression, branch-interface mismatch, and Coulomb are included. | Hard benchmark pattern matched for this reduced row. |
| Finite range | Corridor attraction falls to $-0.045\,\mathrm{MeV}$ by $4.0\,\mathrm{fm}$ for $p+n$ and does not leave a color far field. | Hard no-open-color target is respected at sample level; proof still needed. |
| Channel provenance | $W_c$ and $M_c$ are extracted from $\mathcal B_{ij}^{\mathrm{int},0}$ through $\sigma_{\mathrm{orient},c}$ and $P_c$. | Native first row; branch-side ledgers and same-record conservation are source-acquired, but no-open-color and top-level branch-interface rows still block accepted orientation rows. |
| Scale provenance | $A_{\mathrm{corr}}$, radii, and widths remain reduced-row parameters. | Source lead only until extracted from the same $\sigma_{\mathrm{eff}}$ functional. |

## Branch-Interface Source-Acquisition Bundle

The accepted branch-interface bundle for this reduced row is

$$
\mathcal S_{\mathrm{BI}}^{NN}
=
\left(
\mathcal L_{\mathrm{BI}}^{p},
\mathcal L_{\mathrm{BI}}^{n},
\mathcal L_{E\mathbf p\mathbf J}^{pn,pp},
\mathcal C_{\mathrm{no\ open\ color}}
\right).
$$

Here $\mathcal L_{\mathrm{BI}}^{p}$ is the accepted proton branch-interface ledger, $\mathcal L_{\mathrm{BI}}^{n}$ is the accepted neutron branch-interface ledger, $\mathcal L_{E\mathbf p\mathbf J}^{pn,pp}$ is the same-record conservation ledger carrying both $p+n$ and $p+p$ rows, and $\mathcal C_{\mathrm{no\ open\ color}}$ is the no-open-color far-field closure shared with the confinement-functional target.

The required source-acquisition target shape is:

| Source-acquisition target | Required ledger components |
| --- | --- |
| `accepted_proton_branch_interface_ledger` | `retained_orientation_rows`, `closed_corridor_sharing_count`, `branch_exposure_row`, `same_record_energy_momentum_angular_momentum_ledger`, `no_open_color_far_field` |
| `accepted_neutron_branch_interface_ledger` | `retained_orientation_rows`, `closed_corridor_sharing_count`, `branch_exposure_row`, `same_record_energy_momentum_angular_momentum_ledger`, `no_open_color_far_field` |
| `same_record_energy_momentum_angular_momentum_ledger` | `pn_orientation_count`, `pp_orientation_count`, `energy_conservation_row`, `momentum_conservation_row`, `angular_momentum_conservation_row`, `coulomb_separation_row` |
| `no_open_color_far_field` | `finite_range_residual`, `color_singlet_closure`, `same_record_no_open_color_audit` |

The executable branch target now materializes these as `sourceAcquisitionTargets` in [nucleon-branch-interface-source-target.v1.json](../../../../scripts/nuclear-atomic/nucleon-branch-interface-source-target.v1.json). The current source-acquisition check deliberately fails:

$$
\mathrm{sourceAcquisitionPass}=\mathrm{false},
\qquad
\mathrm{firstMissing}
=
\texttt{missing\_no\_open\_color\_far\_field}.
$$

This is the correct status after the branch-side ledgers landed as [proton-branch-interface-ledger-retained-evidence.v1.json](../../../../scripts/nuclear-atomic/proton-branch-interface-ledger-retained-evidence.v1.json) and [neutron-branch-interface-ledger-retained-evidence.v1.json](../../../../scripts/nuclear-atomic/neutron-branch-interface-ledger-retained-evidence.v1.json), and the same-record conservation ledger landed as [same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json](../../../../scripts/nuclear-atomic/same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json). The $p+n$ and $p+p$ orientation rows cannot become accepted merely by listing upstream row names. Each row must list the relevant accepted source rows under `acceptedSourceRows`, and each named source-acquisition target must itself carry accepted durable non-fixture evidence. Until then, the branch-interface target remains a success marker for the reduced orientation algebra and source acquisition only.

The checker also treats the component shape above as part of source acquisition. A source-acquisition target that is marked accepted but lacks one required component fails as `source_acquisition_target_shape_mismatch`; a target with the right component shape but without accepted durable non-fixture evidence still fails as `source_acquisition_target_not_accepted`.

## Remaining Native Replacement

The channel weights have a first native branch-interface extraction. The next accepted artifact must replace the remaining reduced scale and range parameters with values from the same confinement functional:

$$
\left(
A_{\mathrm{corr}},\,
r_{\mathrm{corr}},\,
\lambda_{\mathrm{corr}},\,
B_{\mathrm{int}},\,
r_{\mathrm{int}},\,
\lambda_{\mathrm{int}}
\right)
\leftarrow
\left(
\sigma_{\mathrm{eff}},
\mathcal E_{\mathrm{conf}},
\Gamma_{N_1},
\Gamma_{N_2},
\rho_{\text{NS}},
\chi_{\text{sea}}
\right).
$$

The row advances only if the same branch-interface record and confinement functional explain why the $p+n$ orientation opens the attractive window while the $p+p$ row pays a larger mismatch and Coulomb cost. It fails if the $p+p$ row becomes bound under the same parameter family, if the $p+n$ attraction requires an independent potential, or if $V_{\text{excl}}(r)$ cannot supply the missing short-core behavior without breaking the deuteron-scale window.
