# EQ-07C Black-Hole Horizon-Interface Noether Braid Map

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Parent packet: [EQ-07 Through EQ-10 And EQ-17 Through EQ-19 Effective Metric / Cosmology Packet](eq-07-10-17-19-effective-metric-cosmology-packet.md)
- Related high-energy routing: [High-Energy Astrophysics](../high-energy-astrophysics/priorities.md#equation-examination-capture)
- Assigned ID: `EQ-07C`
- Related corpus material: [Black Holes](../../../content/markdown/aaa/spacetime/black-holes.md), [Singularity Resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md), [Gravitational Waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md)
- Claim level: observer-level black-hole horizon/interior benchmark, native carrier dictionary, and fail-closed residual target
- Promotion status: priority-only
- Current score: unscored; not yet integrated into the main score table

## Purpose

`EQ-07C` splits black-hole-proper horizon and interior equations away from accretion-disk, wind, jet, and feedback physics. The row asks whether one strong-field horizon-interface carrier can bind:

- exterior mass, radius, surface-area, and spin readouts;
- Schwarzschild/Kerr horizon radius, area, and spin readouts;
- terminal-alignment rows for the braid symmetry-breaking point;
- light-ring / null-orbit comparison rows kept distinct from the horizon radius unless a same-carrier derivation proves coincidence;
- planar-photon recovery rows for the coaxial contra-rotating pro/anti planar pair when photon-path or light-ring evidence is consumed;
- trapped-surface, apparent-horizon, and event-horizon comparison rows;
- finite maximum-curvature interior continuation;
- horizon-interface label and entropy rows;
- ringdown-facing remnant labels when the source history is a merger or collapse;
- and the no-hidden-retune witness tying those rows to one strong-field source state.

The packet is not a claim that black-hole horizons, entropy, or interiors have already been derived in $\mathbb{A}\mathbb{A}\mathbb{A}$. It is a bounded equation-mapping target for black holes proper. Accretion, jets, winds, and feedback remain downstream or adjacent release-channel constraints owned by [EQ-07B](eq-07b-black-hole-accretion-jet-release-horizon-thermodynamics.md).

## Boundary From EQ-07B

`EQ-07B` can constrain release-channel selection, but it cannot satisfy `EQ-07C` by itself. A jet-power fit, disk transport fit, or accretion luminosity fit may sharpen boundary data, but the black-hole-proper row requires the horizon/interior carrier:

$$
\Theta_{\mathrm{BH}}^{07C}(\Omega,W)
\ne
\Theta_{\mathrm{AGN}}(W,T).
$$

The two carriers may share source support, event-ledger ids, or horizon-interface rows after both are declared. They must not collapse into one object before the horizon/interior equations have a same-record carrier of their own.

## Standard Horizon Benchmarks

For a nonrotating exterior comparison, the benchmark radius, photon orbit, and ISCO scales are:

$$
r_s=\frac{2GM}{c_0^2},
\qquad
r_{\mathrm{ph}}=\frac{3GM}{c_0^2},
\qquad
r_{\mathrm{ISCO}}=\frac{6GM}{c_0^2}.
$$

Here $r_s$ is the nonrotating horizon scale, $r_{\mathrm{ph}}$ is the circular null-orbit / photon-sphere comparison scale, and $r_{\mathrm{ISCO}}$ is the innermost stable circular orbit comparison scale. `EQ-07C` must not collapse these into one row. The horizon-interface row owns the boundary condition; the light-ring/null-orbit row owns the photon-path comparison.

For a neutral rotating comparison, define the observer-level dimensionless spin and Kerr length:

$$
\chi_J
=
\frac{c_0|\mathbf J|}{GM^2},
\qquad
a
=
\frac{|\mathbf J|}{M c_0}
=
\chi_J\frac{GM}{c_0^2}.
$$

The spin-dependent light-ring row is tracked as $r_{\mathrm{LR}}(M,\mathbf J)$ rather than as another name for $r_+$. A later retained branch may prove that a prograde light-ring row becomes horizon-coincident under an extremal or near-extremal spin condition, but the default packet must keep the two rows separate until the same carrier proves that coincidence.

The outer horizon radius and surface area comparison are:

$$
r_+
=
\frac{GM}{c_0^2}
+
\left[
\left(\frac{GM}{c_0^2}\right)^2-a^2
\right]^{1/2}
=
\frac{GM}{c_0^2}\left(1+\sqrt{1-\chi_J^2}\right),
$$

$$
A_H
=
4\pi\left(r_+^2+a^2\right)
=
\frac{8\pi G^2M^2}{c_0^4}
\left(1+\sqrt{1-\chi_J^2}\right).
$$

The surface-gravity and temperature comparisons are:

$$
\kappa_H
=
\frac{c_0^4}{2GM}
\frac{\sqrt{1-\chi_J^2}}{1+\sqrt{1-\chi_J^2}},
\qquad
T_H
=
\frac{\hbar\kappa_H}{2\pi k_B c_0}.
$$

The entropy-area benchmark is:

$$
S_{\mathrm{BH}}^{\mathrm{std}}
=
\frac{k_B c_0^3 A_H}{4G\hbar}.
$$

These equations remain observer-level recovery targets. They do not make the Euclidean void a curved substrate and do not define the native horizon. The native burden is to recover these readouts from the same Noether sea / Noether braid record that also supplies the horizon-interface condition and finite interior continuation.

## Native Carrier Dictionary

For a compact strong-field region $\Omega$ over an absolute-time window $W$, define the first `EQ-07C` carrier as:

$$
\Theta_{\mathrm{BH}}^{07C}(\Omega,W)
=
\left(
\theta_W,
\Omega,
W,
M,\mathbf J,Q_{\mathrm{eff}},
r_H,A_H,\kappa_H,
F_H,\mathcal{R}_{\mathrm{align,H}},
r_{\mathrm{LR}},\Pi_{\gamma\mathrm{pl}},
\mathcal{R}_H,
\mathcal{B}_H,
\Lambda_{\mathrm{NS}}^H,
\mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)},
\Pi_{\mathrm{ext}},
\Pi_{\mathrm{int}},
\Pi_{\mathrm{entropy}},
\mathcal{S}_{\mathrm{retune}}
\right).
$$

The carrier requires:

| Variable or row | Role in `EQ-07C` | Required native attachment |
| --- | --- | --- |
| $\theta_W$ | Strong-field/effective-metric source state. | Same-record parent support, not a private isolated metric ansatz. |
| $\Omega,W$ | Compact region and absolute-time window. | Shared by exterior, horizon, interior, entropy, and event-ledger rows. |
| $M,\mathbf J,Q_{\mathrm{eff}}$ | Exterior no-hair comparison labels. | Observer-level mass, spin/angular momentum, and charge-like readouts projected from one compact-source record. |
| $r_H,A_H,\kappa_H$ | Horizon radius, surface area, and surface-gravity comparison rows. | Derived from the same exterior labels and horizon-interface state. |
| $F_H$ | Native horizon-interface condition. | The Noether sea boundary condition with terminal-alignment rows; it is not imported Schwarzschild/Kerr ontology. |
| $\mathcal{R}_{\mathrm{align,H}}$ | Terminal-alignment residual for the braid symmetry-breaking point at the horizon interface. | Same carrier binds $F_H=0$, $v_{\text{trans}}\to c_{\text{eff}}$, $c_{\text{eff}}\to c_f$, $s_M=c_f$, $s_O\to c_f$, and $d_{\mathrm{align}}\to0$. |
| $r_{\mathrm{LR}}$ | Spin-dependent light-ring / null-orbit comparison row. | Kept distinct from $r_H$ unless the same carrier derives a horizon/light-ring coincidence condition. |
| $\Pi_{\gamma\mathrm{pl}}$ | Planar-photon recovery projection. | Tests whether photon-path or light-ring readouts use the coaxial contra-rotating pro/anti planar pair and planar tri-binary reduced chart without substituting that row for the horizon carrier. |
| $\mathcal{R}_H$ | Finite maximum-curvature and regularity residual. | Activated for the interior continuation; must remain finite across the selected window. |
| $\mathcal{B}_H$ | Horizon-interface label ensemble. | Same strong-field record as $M,\mathbf J,Q_{\mathrm{eff}}$, $A_H$, and entropy comparisons. |
| $\Lambda_{\mathrm{NS}}^H$ | Admissible Noether sea / Noether braid terminal-alignment labels. | Native label family feeding $F_H$, $\mathcal{B}_H$, and local block entropy density. |
| $\mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)}$ | Compact-region ledger. | Energy, momentum, angular momentum, recoil, remnant, boundary, and medium-update closure for the black-hole-proper region. |
| $\Pi_{\mathrm{ext}}$ | Exterior effective-metric projection. | Lensing, clock, ruler, EHT-scale, and no-hair readouts from the same carrier; photon-path rows are handled by $r_{\mathrm{LR}}$ and $\Pi_{\gamma\mathrm{pl}}$. |
| $\Pi_{\mathrm{int}}$ | Interior continuation projection. | Finite packed-state or maximum-curvature continuation, not a zero-volume singularity. |
| $\Pi_{\mathrm{entropy}}$ | Entropy-area / Page-compatible comparison projection. | Uses $\mathcal{B}_H$ and local label families from the same carrier. |
| $\mathcal{S}_{\mathrm{retune}}$ | No-hidden-retune witness. | Fails if exterior radius, spin, entropy, interior, or ringdown rows require separate source states. |

## Horizon-Interface Residual

The core black-hole-proper residual is:

$$
\mathcal{R}_{07C}^{\mathrm{BH}}(\theta;\Omega,W)
=
\lambda_{\mathrm{ext}}\mathcal{R}_{\mathrm{ext}}
+\lambda_H\mathcal{R}_{F_H}
+\lambda_{\mathrm{align}}\mathcal{R}_{\mathrm{align,H}}
+\lambda_{\mathrm{LR}}\mathcal{R}_{\mathrm{LR}}
+\lambda_{\gamma\mathrm{pl}}\mathcal{R}_{\gamma\mathrm{pl}}
+\lambda_{\mathrm{int}}\mathcal{R}_{\mathrm{int}}
+\lambda_A\mathcal{R}_{A_H}
+\lambda_J\mathcal{R}_{\mathrm{spin}}
+\lambda_S\mathcal{R}_{S_H}
+\lambda_{\mathrm{ring}}\mathcal{R}_{\mathrm{ring}}
+\lambda_{\mathrm{ledger}}\mathcal{R}_{E\mathbf p\mathbf J}^{(\Omega)}
+\lambda_{\mathrm{retune}}\mathcal{S}_{\mathrm{retune}}.
$$

The terminal-alignment component is:

$$
\mathcal{R}_{\mathrm{align,H}}
=
\max\left(
\|F_H\|,
\left|\frac{v_{\text{trans}}}{c_{\text{eff}}}-1\right|,
\left|\frac{c_{\text{eff}}}{c_f}-1\right|,
\left|\frac{s_M}{c_f}-1\right|,
\left|\frac{s_O}{c_f}-1\right|,
d_{\mathrm{align}},
\mathcal{S}_{\mathrm{retune}}
\right).
$$

The terms are:

| Residual term | Meaning |
| --- | --- |
| $\mathcal{R}_{\mathrm{ext}}$ | Checks that $M$, $\mathbf J$, $Q_{\mathrm{eff}}$, $r_s$, $r_+$, $r_{\mathrm{ISCO}}$, and exterior clock/ruler readouts project from the same strong-field record. |
| $\mathcal{R}_{F_H}$ | Checks the native horizon-interface equation $F_H[\rho_{\text{NS}},\Sigma_{\text{sea}},\mathbf{u}_{\text{sea}},\{\Lambda_{\mathrm{NS}}^H\};\partial\Omega]=0$ on the same carrier. |
| $\mathcal{R}_{\mathrm{align,H}}$ | Checks terminal alignment at the horizon-interface candidate: $v_{\text{trans}}\to c_{\text{eff}}$, $c_{\text{eff}}\to c_f$, $s_M=c_f$, $s_O\to c_f$, and $d_{\mathrm{align}}\to0$ on the same carrier as $F_H$. |
| $\mathcal{R}_{\mathrm{LR}}$ | Checks the light-ring / null-orbit row, including $r_{\mathrm{ph}}$ for Schwarzschild and $r_{\mathrm{LR}}(M,\mathbf J)$ for rotating comparisons, without treating it as identical to $r_H$ unless the same carrier derives the coincidence. |
| $\mathcal{R}_{\gamma\mathrm{pl}}$ | Checks the planar-photon recovery projection through the coaxial contra-rotating pro/anti planar pair and planar tri-binary reduced chart when photon-path or light-ring evidence is used. |
| $\mathcal{R}_{\mathrm{int}}$ | Checks finite interior continuation through $\mathcal{R}_H(\Omega,W)<\infty$ and rejects zero-volume singularity substitution. |
| $\mathcal{R}_{A_H}$ | Checks that $r_H$ and $A_H$ are bound to the same mass/spin readout and horizon-interface state. |
| $\mathcal{R}_{\mathrm{spin}}$ | Checks that compact-object spin $\mathbf J$, angular-momentum ledger, frame-dragging comparison, and horizon radius/area rows share one source state. |
| $\mathcal{R}_{S_H}$ | Checks entropy-area and local label-density comparisons through $\mathcal{B}_H$ rather than a private thermodynamic row. |
| $\mathcal{R}_{\mathrm{ring}}$ | Checks remnant/ringdown labels only when a collapse or merger source history is part of the selected window. |
| $\mathcal{R}_{E\mathbf p\mathbf J}^{(\Omega)}$ | Checks compact-region energy, momentum, angular momentum, recoil, boundary, remnant, and medium-update closure. |
| $\mathcal{S}_{\mathrm{retune}}$ | Penalizes any split between exterior labels, horizon-interface rows, entropy rows, interior continuation, and ringdown/remnant rows. |

The residual may consume accretion or jet rows as boundary data only through declared imports from `EQ-07B`. Those rows cannot replace $\mathcal{R}_{F_H}$, $\mathcal{R}_{\mathrm{align,H}}$, $\mathcal{R}_{\mathrm{LR}}$, $\mathcal{R}_{\gamma\mathrm{pl}}$, $\mathcal{R}_{\mathrm{int}}$, $\mathcal{R}_{A_H}$, or $\mathcal{R}_{S_H}$.

## Direct Geometry Layer

This layer keeps black-hole-proper equations as a same-record geometry problem. It does not treat exterior radius, area, entropy, spin, and interior regularity as separate fitted successes.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $r_s=2GM/c_0^2$ and $r_{\mathrm{ISCO}}=6GM/c_0^2$ | Exterior compact-source scale and timelike-orbit comparison readout from the effective-metric projection. | `exterior_scale_row`, `mass_readout_row`, `theta_W_parent_support` | Same `bhHorizonCarrierId`, $\theta_W$, $\Omega$, $W$, $M$, and exterior metric projection. | `bhp.metric_only_import`: Schwarzschild/Kerr scales are copied in without native carrier binding. | Accepted black-hole horizon-interface carrier with source-backed exterior scale rows. |
| $r_+(M,\mathbf J)$ and $A_H(M,\mathbf J)$ | Horizon radius and surface-area readout from the same exterior labels and terminal-alignment interface. | `horizon_radius_area_row`, `spin_readout_row`, `horizon_interface_row` | Same carrier binds $M$, $\mathbf J$, $\chi_J$, $r_H$, $A_H$, $F_H$, and $\mathcal{B}_H$. | `bhp.spin_radius_split`: mass/spin labels and horizon area use different source states. | Accepted radius/area/spin rows on the same horizon-interface carrier. |
| $F_H=0$, $v_{\text{trans}}\to c_{\text{eff}}$, $c_{\text{eff}}\to c_f$, $s_M=c_f$, $s_O\to c_f$, and $d_{\mathrm{align}}\to0$ | Terminal-alignment readout for the horizon as braid symmetry-breaking interface. | `terminal_alignment_row`, `horizon_interface_row`, `nested_shell_braid_speed_rows` | Same carrier binds $F_H$, $v_{\text{trans}}$, $c_{\text{eff}}$, $c_f$, $s_M$, $s_O$, $d_{\mathrm{align}}$, and $\Lambda_{\mathrm{NS}}^H$. | `bhp.alignment_without_carrier`: speed/alignment rows are asserted without a source-backed horizon-interface carrier. | Accepted terminal-alignment row on the same horizon-interface carrier. |
| $r_{\mathrm{ph}}=3GM/c_0^2$ and $r_{\mathrm{LR}}(M,\mathbf J)$ | Light-ring / null-orbit readout for photon-path comparison. | `light_ring_null_orbit_row`, `spin_readout_row`, `photon_path_row` | Same carrier binds $M$, $\mathbf J$, $r_H$, $r_{\mathrm{LR}}$, exterior photon-path readout, and the declared horizon/light-ring separation or coincidence condition. | `bhp.horizon_light_ring_collapse`: horizon and light-ring rows are treated as identical without a spin/branch derivation. | Accepted light-ring/null-orbit row bound to the same horizon-interface carrier but not substituted for it. |
| Coaxial contra-rotating pro/anti planar pair and planar tri-binary reduced chart | Planar-photon recovery row for photon-path or light-ring evidence. | `planar_photon_recovery_row`, `planar_tri_binary_reduced_chart_row`, `photon_event_ledger` | Same photon-path evidence binds the planar-pair readout, light-ring row, event ledger, and horizon-interface carrier without replacing the horizon row. | `bhp.planar_photon_horizon_substitution`: a planar-photon row passes and is used as the native horizon carrier. | Accepted planar-photon recovery row when photon-path or light-ring evidence is consumed. |
| $\kappa_H(M,\mathbf J)$, $T_H$, and $S_{\mathrm{BH}}^{\mathrm{std}}$ | Surface-gravity, thermal, and entropy-area comparison from the horizon-interface label ensemble. | `surface_gravity_row`, `entropy_area_row`, `horizon_label_ensemble_row` | Same $\mathcal{B}_H$, $A_H$, $M$, $\mathbf J$, and label-density record. | `bhp.private_horizon_entropy`: entropy row fits area while disconnected from $F_H$ and exterior labels. | Accepted horizon-interface label ensemble plus area/entropy projection on one carrier. |
| Trapped-surface, apparent-horizon, and event-horizon comparison rows | Effective GR horizon tests projected from the native $F_H=0$ boundary condition. | `trapped_surface_row`, `apparent_horizon_row`, `event_horizon_row`, `horizon_interface_row` | Same $\theta_W$, $\partial\Omega$, $\Lambda_{\mathrm{NS}}^H$, and exterior access record. | `bhp.slice_global_split`: apparent-horizon comparison and event-horizon comparison require different strong-field records. | Accepted horizon-interface carrier with both local and global observer-level horizon comparisons. |
| $\mathcal{R}_H(\Omega,W)<\infty$ | Finite packed-state or maximum-curvature interior continuation. | `finite_interior_continuation_row`, `compact_region_ledger`, `boundary_data_row` | Same $\Omega$, $W$, boundary data, Noether sea variables, and event ledger as the horizon-interface row. | `bhp.singularity_disguised`: exterior horizon rows pass while interior continuation is undefined or singular. | Accepted finite-boundary-data continuation row on the same carrier. |
| Ringdown labels for collapse or merger remnants | Remnant compact-source labels read from the same source event and horizon-interface carrier. | `ringdown_label_row`, `remnant_label_row`, `source_event_ledger` | Same event ledger, $M_f$, $\mathbf J_f$, exterior metric projection, and horizon-interface carrier. | `bhp.ringdown_without_remnant_label`: ringdown fits a waveform but not the retained remnant/horizon label. | Accepted remnant/ringdown row bound to the same black-hole-proper carrier when a merger or collapse window is selected. |
| Energy, momentum, angular momentum, and no-hidden-retune balance | Whole-packet conservation and carrier identity across exterior, horizon, interior, entropy, and remnant rows. | `event_ledger_row`, `source_provenance`, `no_hidden_retune_witness` | Same `bhHorizonCarrierId`, `sourceWindowId`, `supportId`, `eventLedgerId`, and `retuneWitnessId` across every row. | `bhp.accretion_release_substitution`: an AGN release carrier is used as the parent black-hole-proper carrier. | Source-backed accepted `black_hole_horizon_interface_carrier` with all required rows accepted and same-record bound. |

## First Blocker

The first blocker is:

```text
missing_accepted_black_hole_horizon_interface_carrier
```

The first accepted object must be a durable carrier row with:

- concrete `bhHorizonCarrierId`, `sourceWindowId`, `supportId`, `eventLedgerId`, `horizonInterfaceId`, `interiorContinuationId`, and `retuneWitnessId`;
- accepted parent $\theta_W$ or declared strong-field support;
- source-backed $M$, $\mathbf J$, $Q_{\mathrm{eff}}$, $r_H$, $A_H$, and $\kappa_H$ rows;
- one native horizon-interface condition row $F_H=0$ with declared $\rho_{\text{NS}}$, $\Sigma_{\text{sea}}$, $\mathbf{u}_{\text{sea}}$, $\Lambda_{\mathrm{NS}}^H$, and $\partial\Omega$ data;
- one terminal-alignment row binding $v_{\text{trans}}\to c_{\text{eff}}$, $c_{\text{eff}}\to c_f$, $s_M=c_f$, $s_O\to c_f$, and $d_{\mathrm{align}}\to0$ to the same $F_H$ carrier;
- one light-ring / null-orbit row binding $r_{\mathrm{ph}}$ or $r_{\mathrm{LR}}(M,\mathbf J)$ to the same exterior mass/spin readout while keeping it distinct from $r_H$ unless a spin/branch coincidence condition is derived;
- one planar-photon recovery row when photon-path or light-ring evidence is used, with the coaxial contra-rotating pro/anti planar pair and planar tri-binary reduced chart tied to the same event ledger;
- one finite interior continuation row with $\mathcal{R}_H(\Omega,W)<\infty$;
- one horizon-interface label ensemble $\mathcal{B}_H(M,\mathbf J,Q_{\mathrm{eff}})$ when entropy or state-counting claims are included;
- one compact-region event ledger over energy, momentum, angular momentum, recoil, remnant, boundary, and medium updates;
- one no-hidden-retune witness across exterior scale, spin, horizon area, terminal alignment, light-ring/null-orbit, planar-photon recovery, entropy, interior continuation, ringdown/remnant, and any imported release-channel rows.

The score-neutral retained-evidence-object starting contract is [eq07c-black-hole-horizon-interface-carrier-retained-evidence-object-contract.v1.json](../../../scripts/equation-mapping/eq07c-black-hole-horizon-interface-carrier-retained-evidence-object-contract.v1.json). It is not retained evidence by itself; it only fixes the row names, same-record ids, evidence exclusions, Direct Geometry Layer mapping, and smallest accepted object shape so the next worker can start from the carrier object rather than re-litigating the horizon/light-ring/planar-photon split.

No checker is added by this packet. A future checker is useful only after the accepted carrier contract is stable enough to consume rows without treating priority prose, authored corpus prose, source-contract shells, attempts, probes, mocks, toys, generated files, contract-only JSON, or negative controls as retained evidence.

## Fail-Closed Negative Controls

| Negative control | Required failure |
| --- | --- |
| `bhp.metric_only_import` | Schwarzschild/Kerr formula rows pass algebraically while no native horizon-interface carrier is present. |
| `bhp.spin_radius_split` | $M$, $\mathbf J$, $r_H$, and $A_H$ are read from different source states. |
| `bhp.alignment_without_carrier` | Terminal-alignment speed rows pass by assertion while no source-backed $F_H$ horizon-interface carrier exists. |
| `bhp.horizon_light_ring_collapse` | $r_H$ and $r_{\mathrm{LR}}$ are treated as the same row without a spin/branch derivation on the same carrier. |
| `bhp.planar_photon_horizon_substitution` | A planar-photon or light-ring row is used as the native horizon carrier instead of a same-record $F_H$ row. |
| `bhp.private_horizon_entropy` | $S_H$ or $A_H$ is fit by a horizon bookkeeping row disconnected from $F_H$, $\mathcal{B}_H$, and exterior labels. |
| `bhp.slice_global_split` | Apparent-horizon and event-horizon comparisons require different strong-field records. |
| `bhp.singularity_disguised` | Exterior horizon scales pass while the interior continuation row is undefined, divergent, or arbitrary. |
| `bhp.ringdown_without_remnant_label` | Ringdown labels fit a waveform without a retained remnant/horizon carrier. |
| `bhp.accretion_release_substitution` | An `agn_accretion_release_carrier` or jet/release row is promoted into the black-hole-proper parent carrier. |
| `bhp.release_channel_parent_leak` | Jet, wind, diffuse release, or dark-sector escape rows decide the horizon/interior state before $F_H$ and $\mathcal{R}_H$ are bound. |

## Equation Attack Card

| Field | Current result |
| --- | --- |
| Current score | Unscored; priority-only. |
| Closure driver | Recover black-hole-proper exterior mass/radius/area/spin scales, terminal-alignment horizon-interface condition, light-ring/null-orbit comparison, planar-photon recovery, finite interior continuation, entropy-area comparison, and ringdown/remnant labels from one strong-field carrier. |
| Primary carrier | $\Theta_{\mathrm{BH}}^{07C}(\Omega,W)$ with compact region $\Omega$ and absolute-time window $W$. |
| Smallest accepted evidence object | Accepted source-backed `black_hole_horizon_interface_carrier` plus accepted bindings for exterior scale, spin, horizon radius/area, $F_H$, terminal alignment, light-ring/null-orbit separation or coincidence, planar-photon recovery when used, finite interior continuation, horizon label ensemble, event ledger, source provenance, and no-hidden-retune witness. |
| Exact first blocker | `missing_accepted_black_hole_horizon_interface_carrier` |
| Existing packets consumed | `EQ-07` through `EQ-10` effective-metric discipline, `EQ-07A` compact-star predecessor support, `EQ-07B` release-channel boundary data only, `EQ-11A` merger/ringdown source rows when relevant, and strong-field-closure horizon-interface targets. |
| Direct Geometry Layer | Present in this packet; it separates and same-carrier binds exterior mass/radius/area/spin, terminal alignment, light-ring/null-orbit, planar-photon recovery, finite interior continuation, entropy-area comparison, remnant/ringdown labels, event ledger, provenance, and no-hidden-retune witness to one black-hole-proper source identity. |
| Safe implementation target | Use the score-neutral retained-evidence-object contract at [eq07c-black-hole-horizon-interface-carrier-retained-evidence-object-contract.v1.json](../../../scripts/equation-mapping/eq07c-black-hole-horizon-interface-carrier-retained-evidence-object-contract.v1.json) as the starting object, then replace it with source-backed carrier rows before adding score review or a checker. |

## Promotion Classification

- Claim bucket: derivation/closure target with observer-level effective summaries.
- Corpus promotion status: priority-only.
- Promote now: no.
- Defer with blocker: accepted black-hole horizon-interface carrier, source-backed exterior scale/spin rows, terminal-alignment row, light-ring/null-orbit row, planar-photon recovery row when used, finite interior continuation, horizon label ensemble, and no-hidden-retune witness.
- Primary promotion targets after closure: [Black Holes](../../../content/markdown/aaa/spacetime/black-holes.md), [Singularity Resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md), and [Gravitational Waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md).
