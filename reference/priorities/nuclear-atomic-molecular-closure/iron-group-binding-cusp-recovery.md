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
| `branch_interface` | Pair corridor rewards, pair mismatch costs, bounded degree, local corridor saturation, and $p+n$ / $p+p$ channel selection. | Blocked; [nucleon-branch-interface-source-target.v1.json](../../../scripts/nuclear-atomic/nucleon-branch-interface-source-target.v1.json) is durable and parseable, but its rows remain target/candidate rows rather than accepted source evidence. | `missing_accepted_nucleon_branch_interface_ledgers` |
| `confinement_functional` | Corridor scale, surface loss, large-$A$ packing, shell/readout envelope, and finite saturation. | Blocked; [confinement-functional-source-target.v1.json](../../../scripts/nuclear-atomic/confinement-functional-source-target.v1.json) is durable and parseable, but its rows remain target rows rather than accepted source evidence. | `missing_accepted_sigma_eff_extraction` |
| `weak_channel` | Beta-stable band, asymmetry pressure, weak reaction provenance, and weak/noether coupling consistency. | Blocked; retained muon ledger and weak projection are present, but downstream weak rows remain attempt-level. | `missing_accepted_weak_quotient` |
| `noether_sea_response` | Local $\theta_{\mathrm{sea}}$, $\rho_{\text{NS}}$, density-compression response, and bounded sea-polarization row. | Accepted by the retained-window density-compression provider; [noether-sea-response-source-target-check.mjs](../../../scripts/nuclear-atomic/noether-sea-response-source-target-check.mjs) verifies durable source evidence, retained-window agreement, and Fe/Ni toy row consumption. | none |

The compact command for the promotion gate is:

```bash
node scripts/nuclear-atomic/iron-group-binding-cusp-toy-sweep.mjs --summary --require-promotion-ready
```

The branch-interface source target has its own algebraic success-marker check:

```bash
node scripts/nuclear-atomic/nucleon-branch-interface-source-target-check.mjs --summary --pretty
```

That check currently reports `algebraicPass: true` for the $p+n$/$p+p$ orientation extraction but keeps `--require-accepted` blocked until `nucleon_branch_interface_ledgers`, `pn_orientation_count`, `pp_orientation_count`, and `same_record_energy_momentum_angular_momentum_ledger` become accepted source rows.

The confinement-functional source target also has a structural success-marker check:

```bash
node scripts/nuclear-atomic/confinement-functional-source-target-check.mjs --summary --pretty
```

That check currently reports `structuralPass: true` for the $\sigma_{\mathrm{eff}}$, color-singlet envelope, $\Delta E_{\mathrm{corr}}^{NN}$, no-open-color, and toy-binding dependency chain but keeps `--require-accepted` blocked until `sigma_eff_extraction`, `color_singlet_nucleon_envelope`, `delta_E_corr_NN`, and `no_open_color_far_field` become accepted source rows.

The weak-channel source target has the corresponding same-domain success-marker check:

```bash
node scripts/nuclear-atomic/weak-channel-source-target-check.mjs --summary --pretty
```

That check currently reports accepted `weak_visible_branch_ledger` and `weak_projection` rows, same-domain and stable-branch weak structure, and zero weak residuals, but keeps `--require-accepted` blocked until `weak_quotient`, `weak_exposure_record`, `reaction_event_ledger`, `noether_sea_response`, and the remaining downstream weak rows become accepted source rows.

The Noether sea response source target has an accepted retained-window success-marker check:

```bash
node scripts/nuclear-atomic/noether-sea-response-source-target-check.mjs --summary --pretty
```

That check currently reports `accepted_noether_sea_response_rows`: the provider path is durable source evidence, the required $\rho_{\text{NS}}$, $\theta_{\mathrm{sea}}$, stress-strain, speed, causality, and correlation rows are accepted, acoustic-elastic agreement stays within the refinement tolerance, and the Fe/Ni `alphaSea`, `seaImbalancePenalty`, and `noether_sea_polarization_reward` rows consume accepted Noether sea response rows.

The report emits row-level traceability in `sourceBinding.coefficientBindings` and `sourceBinding.graphRuleRowBindings`. A toy coefficient or graph rule is promotion-ready only when every required source row listed under its bound source families is accepted; family-level acceptance is not enough.

This command is expected to fail until all required source families are accepted from durable non-priority source evidence. The toy-control pass therefore remains separate from promotion readiness: `--require-pass` may pass while `--require-promotion-ready` fails.

The toy should be treated as a row-shape diagnostic. It demonstrates that the reduced row bundle has the right qualitative degrees of freedom in one controlled toy envelope; it cannot promote nuclear-binding recovery until its coefficients and graph rules are tied back to accepted branch-interface, confinement, weak-channel, and Noether sea response records.
