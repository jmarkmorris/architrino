# Iron Group Binding Cusp Recovery

## Metadata

- Kind: reduced recovery packet.
- Status: candidate; not reader-facing canon.
- Supports: [Nuclear Atomic Molecular Closure](nuclear-atomic-molecular-closure.md), [Nuclear Binding Closure](nuclear-binding-closure.md), and [Nuclear Atomic Molecular Brainstorming](brainstorming.md#worked-recovery-target-iron-group-binding-cusp).
- Primary corpus destination: [Nuclear Binding](../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) after the recovery target has a derived or constrained model that passes the fail-closed rows below.

## Claim Level

This packet does not claim that $\mathbb{A}\mathbb{A}\mathbb{A}$ has recovered the nuclear binding curve. It turns the iron-group cusp idea into a first reduced recovery target that can guide an analytic derivation or a toy graph model.

The target is the standard qualitative pattern:

- light nuclei release energy by fusing toward higher binding per nucleon;
- heavy nuclei release energy by fissioning toward better-packed daughters;
- both trends point toward the iron-group region as a total mass-energy trough;
- the exact isotope winner depends on the convention used for binding energy per nucleon, nuclear mass, atomic mass, stability, or astrophysical endpoint.

Use an iron-group window, not a single-isotope assertion:

$$
\mathcal{W}_{\mathrm{Fe/Ni}}
=
\{(A,Z):45\le A\le70,\ 20\le Z\le30\}.
$$

The window is intentionally broad. The first success marker is not isotope precision; it is producing a finite binding-per-nucleon maximum in the Fe/Ni neighborhood without per-element retuning.

## Reduced Recovery Object

For nucleon count $A$ and proton count $Z$, write the candidate nuclear energy as

$$
E_{\mathrm{nuc}}(A,Z;\Theta)
=
\sum_{a=1}^{A}M_a c_{\text{eff}}^2
+
E_{\mathrm{corr}}
+
E_{\mathrm{Coul}}
+
E_{\mathrm{excl}}
+
E_{\mathrm{shell}}
+
E_{\mathrm{sea-pol}}.
$$

Here $\Theta$ is the shared reduced row bundle:

$$
\Theta_{\mathrm{cusp}}^{(0)}
=
\left(
\mathcal G_{A,Z},
\mathcal B_{ij}^{\mathrm{int}},
\mathcal C_{\mathrm{corr}},
\mathcal R_{\mathrm{pack}},
\mathcal S_{\mathrm{shell}},
\theta_{\mathrm{sea}},
\mathcal V_{\beta},
\mathcal L_{E\mathbf p\mathbf J}
\right).
$$

The entries mean:

| Entry | Role |
| --- | --- |
| $\mathcal G_{A,Z}$ | Candidate nuclear packing graph for $A$ nucleons and $Z$ protons. |
| $\mathcal B_{ij}^{\mathrm{int}}$ | Branch-interface exchange row for local nucleon pairs. |
| $\mathcal C_{\mathrm{corr}}$ | Corridor-capacity rule that limits how many favorable short-range residual links a nucleon can use. |
| $\mathcal R_{\mathrm{pack}}$ | Packing and over-compression residual. |
| $\mathcal S_{\mathrm{shell}}$ | Shell or closed-pattern readout; it must stay a recovery target, not source ontology. |
| $\theta_{\mathrm{sea}}$ | Local Noether sea response row used by the nuclear assembly. |
| $\mathcal V_{\beta}$ | Candidate beta-stable valley selector. |
| $\mathcal L_{E\mathbf p\mathbf J}$ | Conservation/event ledger for fusion, fission, emitted products, recoil, heat, photon rows when present, and Noether sea update. |

The comparison binding energy is

$$
B(A,Z;\Theta)
=
Z M_p c_{\text{eff}}^2
+
(A-Z)M_n c_{\text{eff}}^2
-
E_{\mathrm{nuc}}(A,Z;\Theta).
$$

For each $A$, the reduced target chooses the best beta-stable row:

$$
b_*(A;\Theta)
=
\max_{Z\in\mathcal V_{\beta}(A)}
\frac{B(A,Z;\Theta)}{A}.
$$

The first recovery condition is

$$
\operatorname*{argmax}_{A} b_*(A;\Theta)
\in
\mathcal W_{\mathrm{Fe/Ni}}.
$$

## Reduced Energy Envelope

The first analytic envelope should be constrained enough to produce a finite optimum but not so fitted that Fe/Ni is inserted by hand:

$$
\frac{B_{\mathrm{red}}(A,Z)}{A}
=
\beta_{\mathrm{corr}}\,Q_{\mathrm{corr}}(A,Z)
+
\beta_{\mathrm{sea}}\,Q_{\mathrm{sea}}(A,Z)
-
\beta_{\mathrm{surf}}A^{-1/3}
-
\beta_{\mathrm{C}}\frac{Z(Z-1)}{A^{4/3}}
-
\beta_{\mathrm{asym}}\left(\frac{A-2Z}{A}\right)^2
+
\frac{\Delta_{\mathrm{shell}}(A,Z)}{A}
-
\epsilon_{\mathrm{pack}}(A,Z).
$$

The symbols are reduced placeholders with explicit jobs:

| Term | Candidate AAA interpretation |
| --- | --- |
| $Q_{\mathrm{corr}}$ | Local residual-corridor coordination supplied by compatible branch-interface rows. |
| $Q_{\mathrm{sea}}$ | Noether sea polarization benefit from a coherent local corridor network. |
| $A^{-1/3}$ surface loss | Boundary nucleons have fewer useful corridor neighbors than interior nucleons. |
| $Z(Z-1)/A^{4/3}$ Coulomb cost | Proton-proton electrical stress over the full assembly scale. |
| $\left((A-2Z)/A\right)^2$ asymmetry cost | Proton-neutron imbalance and beta-stability pressure, pending weak-channel provenance. |
| $\Delta_{\mathrm{shell}}$ | Closed-pattern or especially stable packing/readout residual. |
| $\epsilon_{\mathrm{pack}}$ | Over-compression, deformation, poor local packing, or branch-interface mismatch. |

This envelope may use standard nuclear scaling as a comparison grammar, but a promoted $\mathbb{A}\mathbb{A}\mathbb{A}$ model must derive or constrain the terms from the shared row bundle. It fails if $\beta_{\mathrm{corr}}$, $\beta_{\mathrm{sea}}$, or $\Delta_{\mathrm{shell}}$ are independently tuned by element.

## First Analytic Test

The first calculation should show why a maximum can exist.

For small $A$, surface and coordination losses are large:

$$
Q_{\mathrm{corr}}(A,Z)+Q_{\mathrm{sea}}(A,Z)
\quad\text{is below its saturated value,}
\qquad
\beta_{\mathrm{surf}}A^{-1/3}
\quad\text{is large.}
$$

Adding nucleons can then create new favorable residual corridors and cheaper shared Noether sea response faster than Coulomb and exclusion costs grow.

For large $A$, the local residual benefit saturates:

$$
Q_{\mathrm{corr}}(A,Z)\to Q_{\mathrm{corr}}^{\infty},
\qquad
Q_{\mathrm{sea}}(A,Z)\to Q_{\mathrm{sea}}^{\infty},
$$

while proton-proton Coulomb stress and deformation pressure keep increasing unless beta stability forces enough neutron excess. The heavy-nucleus condition is therefore not "too many nucleons" by itself. It is a mismatch between short-range saturated corridor benefit and longer-range assembly-scale stress.

The rough fission stress check is:

$$
E_{\mathrm{Coul}}
\sim
a_C\frac{Z^2}{A^{1/3}}.
$$

For a symmetric split,

$$
2a_C\frac{(Z/2)^2}{(A/2)^{1/3}}
=
2^{-2/3}a_C\frac{Z^2}{A^{1/3}}.
$$

The daughter pair carries about $63\%$ of the parent's Coulomb stress before new-surface, deformation, shell, emitted-product, recoil, heat, and Noether sea update rows are counted. A first analytic pass should therefore ask whether the same reduced terms that bind deuteron-scale and alpha-scale assemblies also make sufficiently heavy nuclei fission-favorable.

## Toy Graph Model Contract

The first toy model can be graph-first and geometry-light. It should not pretend to be a nuclear simulator. Its job is to test whether the row structure can produce the right qualitative cusp.

For each $(A,Z)$:

1. Create $A$ nodes, marking $Z$ as protons and $A-Z$ as neutrons.
2. Generate candidate packing graphs $\mathcal G_{A,Z}^{(k)}$ with bounded local degree $d_i\le d_{\max}$.
3. For each near-neighbor edge $(i,j)$, compute a branch-interface weight

$$
W_{ij}
=
\sigma_{\mathrm{orient},ij}P_{ij},
\qquad
M_{ij}=1-W_{ij},
$$

using the same reduced logic as [NN Corridor Overlap First Evaluation](nn-corridor-overlap-first-evaluation.md).

4. Score residual corridors by

$$
E_{\mathrm{corr}}(\mathcal G)
=
-
\alpha_{\mathrm{corr}}
\sum_{(i,j)\in E(\mathcal G)}
W_{ij} C_{ij},
$$

where $C_{ij}$ is a finite-capacity corridor row. $C_{ij}$ must saturate per nucleon; it cannot make every nucleon attract every other nucleon at full strength.

5. Score interface and packing cost by

$$
E_{\mathrm{pack}}(\mathcal G)
=
\alpha_{\mathrm{mis}}
\sum_{(i,j)\in E(\mathcal G)}
M_{ij} H_{ij}
+
\alpha_{\mathrm{deg}}
\sum_i
\max(0,d_i-d_{\mathrm{sat}})^2.
$$

6. Score Coulomb separately:

$$
E_{\mathrm{Coul}}(\mathcal G)
=
\alpha_{\mathrm{C}}
\sum_{\substack{i<j\\i,j\in P}}
\frac{1}{r_{ij}^{\mathrm{eff}}},
$$

or use the reduced radius approximation

$$
E_{\mathrm{Coul}}(A,Z)
\approx
\alpha_{\mathrm{C}}\frac{Z(Z-1)}{A^{1/3}}
$$

when the graph has no metric embedding yet.

7. Add a Noether sea polarization reward only for compatible local corridor networks:

$$
E_{\mathrm{sea-pol}}(\mathcal G)
=
-
\alpha_{\mathrm{sea}}\,
\Phi_{\mathrm{sea}}
\left(
\{W_{ij}C_{ij}\},
\theta_{\mathrm{sea}}
\right),
$$

with $\Phi_{\mathrm{sea}}$ bounded above so it cannot erase Coulomb or over-packing failures.

8. Minimize over candidate graphs:

$$
E_{\mathrm{red}}(A,Z)
=
\min_k E_{\mathrm{red}}(\mathcal G_{A,Z}^{(k)}).
$$

9. Sweep $A$ and the candidate beta-stable $Z$ band, then report the first-failure row if the maximum is absent or outside $\mathcal W_{\mathrm{Fe/Ni}}$.

## Required Negative Controls

| Failure row | Meaning |
| --- | --- |
| `deuteron_unbound` | The same row structure cannot bind $p+n$. |
| `diproton_overbound` | The model binds $p+p$ in ordinary conditions after Coulomb and branch-interface mismatch rows are included. |
| `no_saturation` | Binding per nucleon grows without a finite maximum. |
| `wrong_cusp_region` | The maximum lands far outside $\mathcal W_{\mathrm{Fe/Ni}}$. |
| `hidden_fit` | Fe/Ni placement requires element-specific tuning rather than shared corridor, Coulomb, shell, packing, and Noether sea response terms. |
| `ledger_loss` | Fusion or fission energy is not routed into emitted products, recoil, heat, photon rows when present, medium exchange, and Noether sea update. |
| `shielded_energy_leak` | Ordinary fission or fusion is described as exposing the shielded internal branch energy of surviving protons or neutrons. |

## Minimal Success Marker

A first reduced success marker is:

$$
\mathsf{IGC}^{(0)}
=
\left(
\operatorname*{argmax}_{A}b_*(A;\Theta)\in\mathcal W_{\mathrm{Fe/Ni}},
\neg\texttt{deuteron\_unbound},
\neg\texttt{diproton\_overbound},
\neg\texttt{no\_saturation},
\neg\texttt{hidden\_fit}
\right).
$$

This marker is priority-only. The first toy script now exercises it as an executable row-shape diagnostic, but the marker is not itself a proof of nuclear binding recovery.

## First Executable Toy Sweep

The first executable toy sweep is [iron-group-binding-cusp-toy-sweep.mjs](../../../scripts/nuclear-atomic/iron-group-binding-cusp-toy-sweep.mjs). Run it with:

```bash
node scripts/nuclear-atomic/iron-group-binding-cusp-toy-sweep.mjs --pretty
```

The sweep emits one JSON report with:

- selected coefficient set and status for each coefficient;
- graph-generation rule;
- $A,Z,b_*(A)$ rows;
- Fe/Ni window pass/fail;
- the first fail-closed row;
- comparison rows for deuteron, diproton, saturation, and a representative heavy split.

The paired focused test is [iron-group-binding-cusp-toy-sweep.test.js](../../../tests/iron-group-binding-cusp-toy-sweep.test.js). The default coefficient set is a shared global toy set; the script deliberately fails closed for deuteron loss, diproton overbinding, missing saturation, wrong cusp region, hidden coefficient scope, ledger loss, shielded-energy leakage, and missing source-binding promotion readiness.

First run marker. The default summary run reports a toy peak at $(A,Z)=(62,28)$, `firstFailure: null`, a finite high-$A$ tail drop, a representative heavy-split binding gain, `sourceBindingStatus: blocked_missing_accepted_source_rows`, and `no_score_increase`.

## Source-Binding Promotion Gate

The source-binding manifest is [iron-group-binding-cusp-source-binding-candidates.v1.json](../../../scripts/nuclear-atomic/iron-group-binding-cusp-source-binding-candidates.v1.json). It ties the toy coefficients and graph rules to four required source families before any corpus promotion:

| Source family | Toy rows it controls | Current status | First blocker |
| --- | --- | --- | --- |
| `branch_interface` | Pair corridor rewards, pair mismatch costs, bounded degree, local corridor saturation, and $p+n$ / $p+p$ channel selection. | Blocked; [nucleon-branch-interface-source-target.v1.json](../../../scripts/nuclear-atomic/nucleon-branch-interface-source-target.v1.json) is durable and parseable, but its top rows remain target/candidate rows rather than accepted source evidence. The source-acquisition report now accepts the proton, neutron, and same-record conservation ledgers from [proton-branch-interface-ledger-retained-evidence.v1.json](../../../scripts/nuclear-atomic/proton-branch-interface-ledger-retained-evidence.v1.json), [neutron-branch-interface-ledger-retained-evidence.v1.json](../../../scripts/nuclear-atomic/neutron-branch-interface-ledger-retained-evidence.v1.json), and [same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json](../../../scripts/nuclear-atomic/same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json), validates the remaining target component shape, carries a priority-only accepted-source-row proof target for `nucleon_branch_interface_ledgers`, and names `no_open_color_far_field` as the first missing upstream accepted row. | `missing_accepted_nucleon_branch_interface_ledgers` |
| `confinement_functional` | Corridor scale, surface loss, large-$A$ packing, shell/readout envelope, and finite saturation. | Blocked; [confinement-functional-source-target.v1.json](../../../scripts/nuclear-atomic/confinement-functional-source-target.v1.json) is durable and parseable, accepts the retained [K-perp-transverse-stiffness-functional-retained-evidence.v1.json](../../../scripts/nuclear-atomic/K-perp-transverse-stiffness-functional-retained-evidence.v1.json), [V-exc-excitation-potential-functional-retained-evidence.v1.json](../../../scripts/nuclear-atomic/V-exc-excitation-potential-functional-retained-evidence.v1.json), [rho-NS-confinement-domain-retained-evidence.v1.json](../../../scripts/nuclear-atomic/rho-NS-confinement-domain-retained-evidence.v1.json), [chi-sea-confinement-delay-factor-retained-evidence.v1.json](../../../scripts/nuclear-atomic/chi-sea-confinement-delay-factor-retained-evidence.v1.json), [axis-exceptionality-charge-confinement-retained-evidence.v1.json](../../../scripts/nuclear-atomic/axis-exceptionality-charge-confinement-retained-evidence.v1.json), and [same-record-noether-sea-response-confinement-retained-evidence.v1.json](../../../scripts/nuclear-atomic/same-record-noether-sea-response-confinement-retained-evidence.v1.json) source-acquisition rows, but its top rows remain target rows rather than accepted source evidence. The source-acquisition report now materializes upstream target rows for $\sigma_{\mathrm{eff}}$, same-record branch interface, accepted branch-interface rows, proton/neutron color-singlet envelopes, accepted color-singlet nucleon envelope, color-singlet closure, no-free-color asymptotic state, finite-range residual, $\Delta E_{\mathrm{corr}}^{NN}$, finite residual corridor overlap, same-record no-open-color audit, and no-open-color closure, validates their component shape, and names `accepted_proton_color_singlet_envelope` as the first missing upstream accepted row; [accepted-sigma-eff-extraction-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-sigma-eff-extraction-source-acquisition-blocker.v1.json), [same-record-branch-interface-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/same-record-branch-interface-source-acquisition-blocker.v1.json), [proton-color-singlet-envelope-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/proton-color-singlet-envelope-source-acquisition-blocker.v1.json), [neutron-color-singlet-envelope-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/neutron-color-singlet-envelope-source-acquisition-blocker.v1.json), [accepted-color-singlet-nucleon-envelope-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-color-singlet-nucleon-envelope-source-acquisition-blocker.v1.json), [accepted-branch-interface-rows-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-branch-interface-rows-source-acquisition-blocker.v1.json), [color-singlet-closure-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/color-singlet-closure-source-acquisition-blocker.v1.json), [no-free-color-asymptotic-state-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/no-free-color-asymptotic-state-source-acquisition-blocker.v1.json), [accepted-delta-E-corr-NN-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-delta-E-corr-NN-source-acquisition-blocker.v1.json), [finite-range-residual-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/finite-range-residual-source-acquisition-blocker.v1.json), [same-record-no-open-color-audit-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/same-record-no-open-color-audit-source-acquisition-blocker.v1.json), [no-open-color-far-field-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/no-open-color-far-field-source-acquisition-blocker.v1.json), and [finite-residual-corridor-overlap-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/finite-residual-corridor-overlap-source-acquisition-blocker.v1.json) record the exact missing $\sigma_{\mathrm{eff}}$ extraction, same-record branch-interface bundle, top-level branch-interface row bundle, color-singlet nucleon envelope bundle, same-domain residual derivation, color-singlet closure, finite-envelope, finite-tail, same-record audit, no-open-color, and asymptotic-audit evidence. | `missing_accepted_sigma_eff_extraction` |
| `weak_channel` | Beta-stable band, asymmetry pressure, weak reaction provenance, and weak/noether coupling consistency. | Blocked; retained muon ledger, weak projection, weak quotient, and weak exposure record are present, but downstream weak rows remain attempt-level. The source-acquisition report accepts those four targets, validates downstream target component shape, names `va_chirality_gate` as the first missing upstream accepted row, and now carries fail-closed packets for the toy-bound `reaction_event_ledger` and weak-channel `noether_sea_response` update row. | `missing_accepted_va_chirality_gate` |
| `noether_sea_response` | Local $\theta_{\mathrm{sea}}$, $\rho_{\text{NS}}$, density-compression response, and bounded sea-polarization row. | Accepted by the retained-window density-compression provider; [noether-sea-response-source-target-check.mjs](../../../scripts/nuclear-atomic/noether-sea-response-source-target-check.mjs) verifies durable source evidence, retained-window agreement, and Fe/Ni toy row consumption. | none |

The compact command for the promotion gate is:

```bash
node scripts/nuclear-atomic/iron-group-binding-cusp-toy-sweep.mjs --summary --require-promotion-ready
```

The validation path recomputes the promotion summary from family acceptance, coefficient row bindings, graph-rule row bindings, row-evidence traceability, source-row requirement indexing, family-distinction locks, partial-source-marker locks, and row-binding coverage, so a mutated `allPromotionBindingsAccepted` flag or missing-family list cannot make a target-only report promotion-ready.

The branch-interface source target has its own algebraic success-marker check:

```bash
node scripts/nuclear-atomic/nucleon-branch-interface-source-target-check.mjs --summary --pretty
```

That check currently reports `algebraicPass: true` for the $p+n$/$p+p$ orientation extraction, `acceptedSourceRowProofTargetPass: true` for the branch-side proof targets, and `sourceAcquisitionPass: false` with `sourceAcquisitionFirstMissingObject: missing_no_open_color_far_field`. It keeps `--require-accepted` blocked until `nucleon_branch_interface_ledgers`, `pn_orientation_count`, and `pp_orientation_count` become accepted source rows and the upstream `sourceAcquisitionTargets` for no-open-color carry both the required ledger-component shape and accepted durable non-fixture evidence. The accepted proton, neutron, and same-record source-acquisition rows are partial upstream success markers, not promotion evidence by themselves. The `nucleon_branch_interface_ledgers` proof target now requires one same-record branch-interface bundle containing the accepted proton ledger, accepted neutron ledger, $p+n$/$p+p$ orientation rows, same-record $E$, $\mathbf p$, and $\mathbf J$ ledger, and no-open-color far-field; it also names `finite_range_residual`, `color_singlet_closure`, `same_record_no_open_color_audit`, $W_{pn}>W_{pp}$, $M_{pn}<M_{pp}$, $\lim_{R\to\infty}\mathcal N_{\mathrm{open}}(R)=0$, $\mathcal N_{\mathrm{open}}(R)\le K_{\mathrm{open}}\mathcal T_{NN}(R)^2$, and $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$ as the retained closure, inequality, and no-open limit conditions. The no-open-color blocker now also carries its own priority-only `acceptedSourceRowProofTarget`: `finite_range_residual`, `color_singlet_closure`, `same_record_no_open_color_audit`, the accepted proton and neutron branch-interface ledgers, and the same-record conservation ledger must appear in the same record, with `Delta_E_corr_NN_tail_limit`, `bounded_residual_overlap`, `large_r_zero_limit`, and finite $K_{\mathrm{open}}$ as the sufficient-condition rows. The route explicitly keeps `accepted_branch_interface_rows`, `nucleon_branch_interface_ledgers`, `pn_orientation_count`, and `pp_orientation_count` downstream of no-open-color. Its analytic route is the same bound used by the audit target, $\mathcal N_{\mathrm{open}}(R)\le K_{\mathrm{open}}\mathcal T_{NN}(R)^2$, so a finite $K_{\mathrm{open}}$ plus $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$ is the concrete route from finite residual tail to no-open-color far field. The conditional lemma `finite_tail_same_record_audit_implies_no_open_color_far_field_0001` now records the acceptance shape explicitly and still accepts no source rows.

The same-record audit target is the tuple $\mathcal A_{\mathrm{no\ open}}=(L_{E\mathbf p\mathbf J},B_{pn},B_{pp},\Gamma_{N_1},\Gamma_{N_2},\Delta E_{\mathrm{corr}}^{NN},\mathcal N_{\mathrm{open}})$. It is still priority-only, but it makes the next proof obligation explicit: the conservation ledger, $p+n$ and $p+p$ branch-interface rows, finite residual, color-singlet closure, and far-field norm must all share one event record before the branch-interface graph rules can promote. The audit packet now carries `finite_tail_color_singlet_event_ledger_implies_same_record_no_open_color_audit_0001`, which requires accepted tail-limit, finite-residual, color-singlet, same-event-ledger, branch-interface-ledger, and finite-$K_{\mathrm{open}}$ rows in one retained event record before `same_record_no_open_color_audit` can be used. The audit also carries the concrete bridge $\mathcal N_{\mathrm{open}}(R)\le K_{\mathrm{open}}\mathcal T_{NN}(R)^2$, so the finite-tail proof only promotes if $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$ and $K_{\mathrm{open}}$ is finite in the same branch-interface record.

The same-event ledger request is now captured as `branch_noether_residual_color_projection_event_lock_implies_same_event_ledger_0001`. It does not claim that the already accepted branch ledgers or accepted same-record Noether sea response are enough; it requires the same retained event id to bind those rows together with `Delta_E_corr_NN_tail_limit`, `finite_range_residual`, `color_singlet_closure`, `bounded_open_color_projection_operator_norm`, and `finite_open_color_surface_measure`. Until that event-lock evidence exists, `same_event_ledger` remains a missing audit input rather than a derived row.

The finite-$K_{\mathrm{open}}$ projection-bound sublemma is now explicit as `same_record_bounded_open_projection_implies_finite_K_open_0001`. It would define $K_{\mathrm{open}}=\Omega_{\mathrm{open}}\kappa_{\mathrm{open}}^2$ only after the same retained event record has accepted `bounded_residual_overlap`, tail-limit, finite-residual, color-singlet, same-event-ledger, and branch-interface rows, with $\Pi_{\mathrm{open}}$ bounded over that same residual corridor and no A-, Z-, isotope-, element-, or Fe/Ni-indexed projection coefficient. The derived rows `K_open_finite` and `N_open_R_le_K_open_T_NN_R_squared` therefore remain downstream support for the audit and no-open-color far-field lemmas, not promotion evidence by themselves.

The projection/surface support request is now captured separately as `bounded_open_projection_surface_measure_implies_projection_support_0001`. It asks for accepted non-fixture rows proving that $\Pi_{\mathrm{open}}$, $\kappa_{\mathrm{open}}$, $\Omega_{\mathrm{open}}$, $\mathcal N_{\mathrm{open}}(R)$, and $\mathcal T_{NN}(R)$ live on the same retained event domain as the branch-interface and residual-tail ledgers. If accepted, the request would supply only `bounded_open_color_projection_operator_norm` and `finite_open_color_surface_measure`; it would feed the same-event ledger and finite-$K_{\mathrm{open}}$ route but still leave `same_record_no_open_color_audit` and `no_open_color_far_field` unaccepted.

The accepted branch-interface row-bundle blocker now carries the corresponding branch-side scaffold: $\mathcal B_{\mathrm{br}}=(B_{pn},B_{pp},L_{E\mathbf p\mathbf J},\mathcal C_{\mathrm{no\ open}},\Gamma_p,\Gamma_n)$ with $W_c=\frac{N_{\mathrm{share},c}}{N_{\mathrm{ret},c}}P_c$, $M_c=1-W_c$, and $W_{pn}>W_{pp}$ plus $M_{pn}<M_{pp}$ under one same-record constraint. It remains priority-only, but it makes the branch-interface coefficient lock explicit for `alphaCorr`, `alphaCoul`, `alphaPair`, `alphaPack`, `dSat`, `maxDegree`, the $p+n$/$p+p$ pair rewards and mismatch costs, `ppCoulombCost`, and the bounded-degree and finite-tail graph rules.

The confinement-functional source target also has a structural success-marker check:

```bash
node scripts/nuclear-atomic/confinement-functional-source-target-check.mjs --summary --pretty
```

That check currently reports `structuralPass: true` for the $\sigma_{\mathrm{eff}}$, color-singlet envelope, $\Delta E_{\mathrm{corr}}^{NN}$, no-open-color, and toy-binding dependency chain but keeps `--require-accepted` blocked until `sigma_eff_extraction`, `color_singlet_nucleon_envelope`, `delta_E_corr_NN`, and `no_open_color_far_field` become accepted source rows. Its source-acquisition check accepts the retained $K_{\perp}$ transverse-stiffness source row, the retained $V_{\mathrm{exc}}$ excitation-potential source row, the retained $\rho_{\text{NS}}$ confinement-domain source row, the retained $\chi_{\text{sea}}$ delay-factor source row, the retained axis-exceptionality charge source row, and the retained same-record Noether sea response source row. The $\sigma_{\mathrm{eff}}$ row now has all declared source-acquisition rows accepted, but the top row itself remains target-only; broader confinement acquisition still reports `sourceAcquisitionPass: false` with `sourceAcquisitionFirstMissingObject: missing_accepted_accepted_proton_color_singlet_envelope`. The checker now emits `sourceAcquisitionBlockerMap`; its first active blocker is `accepted_proton_color_singlet_envelope`, which holds `color_singlet_nucleon_envelope` and directly blocks `alphaSurf`, `alphaPair`, `alphaShell`, `boundaryDegreeLoss`, and `bounded_degree_surface_depleted_corridor_estimator` until accepted proton color-singlet closure, finite envelope boundary, and no-free-color asymptotic-state audit exist in the same confinement-functional record. The accepted-$\sigma_{\mathrm{eff}}$, same-record branch-interface, accepted branch-interface row bundle, proton, neutron, accepted color-singlet nucleon envelope, color-singlet closure, no-free-color, accepted-$\Delta E_{\mathrm{corr}}^{NN}$, finite-range residual, same-record no-open-color audit, no-open-color, and finite-overlap blocker packets point to the exact acceptance condition for the color-singlet and $\Delta E_{\mathrm{corr}}^{NN}$ bundle: accepted $\sigma_{\mathrm{eff}}$ extraction, accepted same-record branch-interface bundle, accepted top-level branch-interface rows, accepted color-singlet nucleon envelope bundle, accepted color-singlet closure, same-domain residual derivation, finite envelope boundary, finite residual tail, same-record no-open-color audit, no-open-color far-field closure, and no-free-color asymptotic-state audit in the same retained confinement-functional domain. The finite-tail controls (`alphaPack`, `dSat`, `maxDegree`, `packSoftA`, and `finite_tail_saturation_check`) now name `finite_range_residual` as a required row before graph-rule promotion.

The first proton-envelope source request now has a precise certificate shape: `proton_projection_boundary_no_free_color_implies_envelope_support_0001`. The source object must keep the accepted proton branch-interface ledger, same $\sigma_{\mathrm{eff}}$ domain, same-record Noether sea response, same-record branch-interface, $\Pi_{\mathrm{singlet},X}$, $\Pi_{\mathrm{open},X}$, $W_{\mathrm{locked},pX}$, $\epsilon_{pX}$, $\Delta_{\mathrm{color},pX}$, $E_{\mathrm{color},pX}\le\Delta_{\mathrm{color},pX}$, finite $R_p$, refinement window, and accepted no-free-color asymptotic-state row in one retained event record. If accepted, it supplies only `proton_color_singlet_closure` and `finite_envelope_boundary`; the top `accepted_proton_color_singlet_envelope` row remains blocked until the no-free-color audit and same-domain requirements are accepted.

The no-free-color asymptotic-state blocker now captures the next source request as `asymptotic_field_audit` with conditional lemma `finite_envelope_open_projection_limits_imply_asymptotic_field_audit_0001`. A future accepted audit must keep accepted proton and neutron color-singlet envelopes, finite $R_p$ and $R_n$, `finite_range_residual`, same $\sigma_{\mathrm{eff}}$ domain, same-record Noether sea response, same-record branch-interface, and both open-color projection limits $\lim_{R\to\infty}\sup_X E_{\mathrm{color},pX}(R)=0$ and $\lim_{R\to\infty}\sup_X E_{\mathrm{color},nX}(R)=0$ in one retained record. This is priority-only and accepts no row; after acceptance it would feed `no_free_color_asymptotic_state`, proton/neutron envelope closure, color-singlet closure, and no-open-color rather than assuming those downstream rows.

The confinement target also now carries priority-only `acceptedSourceRowProofTargets` for all toy-consuming confinement rows before any corpus promotion: `sigma_eff_extraction` requires a same-domain extraction certificate; `color_singlet_nucleon_envelope` requires accepted proton and neutron color-singlet envelopes, no-free-color asymptotic state, and same-record branch interface; `delta_E_corr_NN` requires a same-domain residual derivation from accepted $\sigma_{\mathrm{eff}}$, color-singlet envelope, branch-interface rows, and finite residual corridor overlap; `finite_range_residual` requires the tail-limit statements for $\mathcal T_{NN}(R)$; and `no_open_color_far_field` requires the finite residual, color-singlet closure, same-record no-open-color audit, accepted proton and neutron branch-interface ledgers, same-record conservation, and same-record Noether sea response. The Fe/Ni report now copies those proof targets into `sourceBinding.coefficientBindings`, `sourceBinding.graphRuleRowBindings`, and `sourceBinding.sourceRowRequirementIndex`, so `alphaSea`, the $p+n$/$p+p$ pair rewards, `alphaSurf`, `alphaPair`, `alphaShell`, `alphaPack`, `boundaryDegreeLoss`, `dSat`, `maxDegree`, `packSoftA`, `bounded_degree_surface_depleted_corridor_estimator`, and `finite_tail_saturation_check` all retain their exact confinement proof obligation instead of consuming a target equation or accepted upstream inputs alone.

The accepted-$\sigma_{\mathrm{eff}}$ blocker now gives the first concrete extraction certificate target: $\sigma_{\mathrm{eff}}(Q;\rho_{\text{NS}},\chi_{\text{sea}})=\inf_{a,f}\mathcal S_{\sigma}[a,f;Q,\rho_{\text{NS}},\chi_{\text{sea}}]$, with $\mathcal S_{\sigma}$ built from accepted $K_{\perp}$ and $V_{\mathrm{exc}}$ rows and constrained to the same axis-exceptionality and Noether sea response record. Its first analytic route is now the priority-only same-domain variational certificate: a lower-bounded coercive $\mathcal S_{\sigma}$ over a compact admissible class, a minimizer $(a_*,f_*)$, stationarity residual within $\epsilon_{\mathrm{ref}}$, and $\left|\sigma_{\mathrm{eff}}^{(h)}-\sigma_{\mathrm{eff}}^{(h/2)}\right|\le\epsilon_{\mathrm{ref}}$ would provide the minimizer, refinement-stability, and source-path rows needed before `accepted_sigma_eff_extraction` can be used. It is still priority-only, but it makes `alphaSea`, `pnCorridorPairReward`, and `ppCorridorPairReward` wait for a refinement-stable extraction certificate rather than for accepted input rows alone.

The finite-range residual blocker now carries a priority-only proof scaffold for the prior tail step: $\mathcal T_{NN}(R)=\sup_{r\ge R}|\Delta E_{\mathrm{corr}}^{NN}(r;\Gamma_{N_1},\Gamma_{N_2},\sigma_{\mathrm{eff}},\rho_{\text{NS}},\chi_{\text{sea}})|$ with target $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$. The dedicated [delta-E-corr-NN-tail-limit-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/delta-E-corr-NN-tail-limit-source-acquisition-blocker.v1.json) packet now makes the immediate source request executable: `lim_R_to_infty_T_NN_R_eq_0`, `O_NN_finite`, and `exists_R0_C_lambda_exp_decay_tail` must come from durable non-fixture evidence before `Delta_E_corr_NN_tail_limit` can be accepted. The packet now carries the conditional lemma that would discharge those rows: a same-record bound $|\Delta E_{\mathrm{corr}}^{NN}(r)|\le C e^{-\lambda(r-R_0)}$ together with $w_{\mathrm{corr}}(r)\le C_w e^{\eta(r-R_0)}$ and $0\le\eta<\lambda$ gives $\mathcal T_{NN}(R)\le C e^{-\lambda(R-R_0)}$ and $\mathcal O_{NN}\le C C_w/(\lambda-\eta)$. The scaffold requires that tail-limit row, accepted $\sigma_{\mathrm{eff}}$, accepted color-singlet envelope, accepted proton and neutron branch-interface ledgers, the same-record conservation ledger, and same-record Noether sea response before use; it then feeds the full `accepted_delta_E_corr_NN`, top-level `accepted_branch_interface_rows`, same-record no-open-color, no-open-color far-field, and no-free-color audits instead of assuming those rows first.

The same packet now spells out the uniform exponential-tail certificate request. A future accepted source object must carry one retained event id, $\Delta E_{\mathrm{corr}}^{NN}$, $\mathcal T_{NN}(R)$, $R_0$, $C$, $\lambda$, corridor weight $w_{\mathrm{corr}}$, $C_w$, $\eta$, an $\eta<\lambda$ witness, branch-interface ledger refs, same-record Noether sea response, and coefficient exclusion. If accepted, that source object would supply only `lim_R_to_infty_T_NN_R_eq_0`, `O_NN_finite`, and `exists_R0_C_lambda_exp_decay_tail`; `Delta_E_corr_NN_tail_limit` still waits on accepted $\sigma_{\mathrm{eff}}$ extraction and accepted color-singlet nucleon envelope rows in the same record.

The finite-range residual blocker also now carries `tail_limit_overlap_zero_rows_imply_finite_range_support_0001`, which bridges accepted tail-limit row names into the finite-range support rows. In one retained record, accepted `lim_R_to_infty_T_NN_R_eq_0`, accepted `O_NN_finite`, and accepted `exists_R0_C_lambda_exp_decay_tail` would supply `large_r_zero_limit` and `bounded_residual_overlap`; they would not by themselves accept `finite_range_residual`, because the accepted $\sigma_{\mathrm{eff}}$, color-singlet envelope, branch-interface, same-record Noether sea response, and coefficient-exclusion requirements still have to hold together.

The weak-channel source target has the corresponding same-domain success-marker check:

```bash
node scripts/nuclear-atomic/weak-channel-source-target-check.mjs --summary --pretty
```

That check currently reports accepted `weak_visible_branch_ledger`, `weak_projection`, `weak_quotient`, and `weak_exposure_record` rows, same-domain and stable-branch weak structure, and zero weak residuals, but keeps `--require-accepted` blocked until `va_chirality_gate`, `reaction_event_ledger`, the weak-channel `noether_sea_response` update row, and the remaining downstream weak rows become accepted source rows. Its source-acquisition check reports `sourceAcquisitionPass: false` with `sourceAcquisitionFirstMissingObject: missing_accepted_va_chirality_gate`, so the first upstream weak target is the same-domain `V-A` chirality gate over the retained muon ledger, projection, quotient, and exposure rows. The checker now emits `sourceAcquisitionBlockerMap`; the current map confirms that `va_chirality_gate` is the first weak proof target, while the toy-bound blockers are `reaction_event_ledger`, directly blocking `alphaAsym`, `betaValleySlope`, and `beta_stable_band_center`, and the weak-channel `noether_sea_response` update row, directly blocking `seaImbalancePenalty`. The weak target now also carries `acceptedSourceRowProofTargets.va_chirality_gate`, `acceptedSourceRowProofTargets.reaction_event_ledger`, and `acceptedSourceRowProofTargets.noether_sea_response`: the V-A proof target must keep the retained branch, projection, quotient, exposure, chirality row, same-domain rows, charged-current left-channel selection, right-channel charged-current suppression, and Michel-parameter binding in one branch record; the reaction-event proof target must keep the retained branch, projection, quotient, exposure, accepted $V-A$ gate, conservation, emitted-product, recoil, and same-record event-balance rows in the same domain and branch record. The current priority-only balance target is $L_{\mathrm{weak}}^{\mathrm{in}}+L_{\mathrm{sea}}^{\mathrm{in}}=L_{\mathrm{emitted}}+L_{\mathrm{recoil}}+L_{\mathrm{heat/radiation}}+\Delta L_{\mathrm{sea}}^{\mathrm{weak}}$. The weak-event Noether sea proof target must then keep the reaction event ledger, same-event Noether sea update row, and retained-window-provider distinction visible. The [va-chirality-gate-source-acquisition-blocker.v1.json](../../../scripts/equation-mapping/va-chirality-gate-source-acquisition-blocker.v1.json), [weak-reaction-event-ledger-source-acquisition-blocker.v1.json](../../../scripts/equation-mapping/weak-reaction-event-ledger-source-acquisition-blocker.v1.json), and [weak-noether-sea-response-source-acquisition-blocker.v1.json](../../../scripts/equation-mapping/weak-noether-sea-response-source-acquisition-blocker.v1.json) packets keep the beta-stability and sea-imbalance toy rows blocked until V-A, event-ledger conservation, and same-event Noether sea update rows exist in that same weak domain.

The Noether sea response source target has an accepted retained-window success-marker check:

```bash
node scripts/nuclear-atomic/noether-sea-response-source-target-check.mjs --summary --pretty
```

That check currently reports `accepted_noether_sea_response_rows`: the provider path is durable source evidence, the required $\rho_{\text{NS}}$, $\theta_{\mathrm{sea}}$, stress-strain, speed, causality, and correlation rows are accepted, acoustic-elastic agreement stays within the refinement tolerance, and the Fe/Ni `alphaSea`, `seaImbalancePenalty`, and `noether_sea_polarization_reward` rows consume accepted Noether sea response rows. Its `toyBindingCheck.rowConsumption` success marker makes the accepted consumption explicit: `rho_NS` and `theta_sea` feed `alphaSea`, `seaImbalancePenalty`, and `noether_sea_polarization_reward`; `stress_strain_row` feeds `alphaSea` and `noether_sea_polarization_reward`; and `causality_row` feeds `noether_sea_polarization_reward`.

The report emits row-level traceability in `sourceBinding.coefficientBindings` and `sourceBinding.graphRuleRowBindings`, plus a `sourceBinding.rowBindingCoverage` summary. Each required row also carries `rowEvidence`, `localAcceptedRows`, and `promotionEligibleRows`, so a locally accepted row in a target-only family cannot be mistaken for promotion evidence. Accepted rows now carry `acceptedEvidenceTrace`, which preserves durable evidence status, source path or source-target path, same-domain or branch-record fields when available, and the rule that a locally accepted component row is not promotion evidence unless the owning source family is accepted. `sourceBinding.sourceRowRequirementIndex` also aggregates the same obligations by source row, with `requiredBy` entries naming the consuming coefficients and graph rules. Its current first blocked row is `branch_interface.nucleon_branch_interface_ledgers`, while the accepted retained-window Noether sea rows are the only promotion-eligible rows. It also emits `sourceBinding.familyDistinctionLocks`: the first lock keeps the accepted retained-window Noether sea response family distinct from the weak-channel `noether_sea_response` update row consumed by `seaImbalancePenalty`. `sourceBinding.partialSourceMarkerLocks` now marks every locally accepted row that a blocked family binding might otherwise overuse: branch-side same-record conservation remains only a partial marker for `alphaCoul`, `ppCoulombCost`, `pnPairMismatchCost`, and `ppPairMismatchCost`, and weak-side `weak_quotient`, `weak_projection`, and `weak_exposure_record` remain partial markers for `alphaAsym`, `betaValleySlope`, `seaImbalancePenalty`, and `beta_stable_band_center` until the same-domain reaction event ledger, weak-event Noether sea update, and `V-A` chirality gate are accepted. The release-accounting surface is now structural as well: `releaseAccounting.ordinaryFissionFusionLedgerRoutes` and the representative heavy-split row must keep daughter-binding, emitted-product, recoil, heat, photon-when-present, medium-exchange, and Noether sea update routes while excluding surviving-nucleon shielded energy. A toy coefficient or graph rule is promotion-ready only when every required source row listed under its bound source families is accepted; family-level acceptance is not enough, and `validationErrors` treats missing coefficient or graph-rule row requirements, missing row-evidence traceability, missing accepted-row evidence trace, missing source-row requirement indexing, missing coverage, a dropped or malformed family-distinction lock, a dropped or malformed partial-source-marker lock, or drift in the release-accounting invariant as invalid report structure. The executable promotion-ready gate is `sourceBinding.summary.allPromotionBindingsAccepted`, not merely `allRequiredFamiliesAccepted`.

The Fe/Ni source-binding report now uses the branch-interface, confinement-functional, weak-channel, and Noether sea response source-target checkers as the family acceptance authorities. A family is not accepted merely because row labels are present: the relevant checker must report its accepted status, preserve its algebraic or structural checks, and keep source evidence durable and non-fixture. The compact branch-interface check carries `sourceAcquisitionBlockerMap`; its current active blocker is `no_open_color_far_field`, requiring accepted finite-range residual, color-singlet closure, and same-record no-open-color audit before `nucleon_branch_interface_ledgers`, `pn_orientation_count`, `pp_orientation_count`, and their direct toy consumers can promote. The compact confinement-functional check now carries the same map surface; its current active blocker is `accepted_proton_color_singlet_envelope`, so the first confinement proof target is the accepted proton color-singlet envelope, not another Fe/Ni coefficient adjustment. The compact weak-channel check now carries the same map surface and separates the first upstream weak proof target, `va_chirality_gate`, from the toy-bound `reaction_event_ledger` and weak-event `noether_sea_response` blockers. The compact Noether sea response check now carries the accepted-row consumption success marker, so accepted retained-window Noether sea rows are visible without confusing them for the blocked weak-event Noether sea update row.

Each compact blocker also carries `sourceAcquisitionRoute`. This route is priority-only: it records required rows before use, accepted rows required before promotion use, downstream rows fed after acceptance, and rows that must not be smuggled in as prerequisites. The route is copied into the row evidence for blocked coefficient and graph-rule requirements and into the source-row requirement index, so each toy consumer points to the accepted-source route that must close before promotion. The first blocked branch row also carries `acceptedSourceRowProofTarget` through row evidence and the source-row requirement index, so `branch_interface.nucleon_branch_interface_ledgers` exposes the exact same-record rows, closure rows, retained inequalities, no-open limit statements, forbidden target-only promotion sources, and direct toy consumers it must satisfy. The Fe/Ni validator now requires each proof target to retain its row-specific specialty fields, so the branch-interface target cannot keep only the $p+n$/$p+p$ inequality conditions while dropping the no-open limit statements. The confinement-side no-open row now carries the matching proof-target trace: `confinement_functional.no_open_color_far_field` exposes the finite-range residual, color-singlet closure, same-record no-open-color audit, accepted proton and neutron branch-interface ledgers, same-record conservation, and same-record Noether sea response obligations, plus the retained limit statements $\lim_{R\to\infty}\mathcal N_{\mathrm{open}}(R)=0$, $\mathcal N_{\mathrm{open}}(R)\le K_{\mathrm{open}}\mathcal T_{NN}(R)^2$, and $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$. The weak-channel rows now carry matching proof-target traces for `weak_channel.reaction_event_ledger` and `weak_channel.noether_sea_response`, exposing the conservation rows, same-event Noether sea update rows, retained-window provider distinction, forbidden target-only promotion sources, and direct toy consumers. The finite-range residual route explicitly feeds no-open-color and no-free-color audits after the finite tail is accepted; it does not assume those audits first. The weak-channel route similarly keeps the weak-event `noether_sea_response` update behind the weak `reaction_event_ledger`, while the accepted retained-window Noether sea provider remains a separate accepted source family.

This command is expected to fail until all required source families are accepted from durable non-priority source evidence. The toy-control pass therefore remains separate from promotion readiness: `--require-pass` may pass while `--require-promotion-ready` fails.

The toy should be treated as a row-shape diagnostic. It demonstrates that the reduced row bundle has the right qualitative degrees of freedom in one controlled toy envelope; it cannot promote nuclear-binding recovery until its coefficients and graph rules are tied back to accepted branch-interface, confinement, weak-channel, and Noether sea response records.
