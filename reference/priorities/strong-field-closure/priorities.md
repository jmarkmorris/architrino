# Strong-Field Quantitative Closure

## Workstream Metadata

- Kind: `priority`
- Rank: `18`
- Value: `9.55`
- Cost: `6.2`
- ROI: `1.54`
- Status: `queued`

## Task Queue

1. `embedded_boundary_conditions` — Formulate horizon-interface solutions as Noether sea boundary-condition problems with $\rho_{\text{NS}}$, $\Sigma_{\text{medium}}$, $\mathbf{u}_{\text{medium}}$, admissible $\Lambda_{\text{NS}}$ data, and surrounding $\partial\Omega$. Status: `next`. Depends on: none.
2. `observer_predictions` — Derive a stronger observer-level strong-field prediction set from the embedded boundary-condition formulation. Status: `pending`. Depends on: `embedded_boundary_conditions`.
3. `horizon_entropy_packet` — Define the horizon-interface label ensemble and its local block entropy density from admissible $\Lambda_{\text{NS}}$ states, then use them to state entropy-area and Page-curve recovery targets, including tests of proposed horizon identifications. Status: `kernel-handoff-ready`; terminal enumerator consumption and coefficient derivation pending. Depends on: `observer_predictions`.
4. `release_channel_selection` — Decide the release-channel selection between jets, diffuse outflow, dark-sector escape, and candidate dark-sector photon-like modes. Status: `pending`. Depends on: `observer_predictions`, `horizon_entropy_packet`.
5. `discriminating_observable` — Extract at least one discriminating observable against GR-like strong-field behavior. Status: `pending`. Depends on: `release_channel_selection`.
6. `hypothesis_bank_review` — Preserve strong-field and three-binary hypotheses as a watchlist, and promote only hypotheses that gain a boundary condition, equation, simulation target, or observable. Status: `ongoing`. Depends on: none.
7. `high_energy_source_sink_taxonomy` — Classify horizon release, jets, mergers, diffuse release, catastrophic candidates, reabsorption, and return channels before using strong-field events as cosmology source terms. Status: `pending`. Depends on: `release_channel_selection`.
8. `packed_core_temperature_endpoint_residual` — Keep observer-accessible temperature, stored configuration energy, and packed-core coarse-graining separate before making any low-temperature or low-entropy interior claim. Status: `priority-only`. Depends on: [temperature](../cross-theory-mapping/temperature.md), `embedded_boundary_conditions`.
9. `hard_em_constitutive_ceiling` — Test whether finite radius, Noether sea effective permittivity/permeability, and maximum-curvature regularity combine into a bounded electromagnetic constitutive response. Status: `priority-only`. Depends on: `embedded_boundary_conditions`.
10. `ingress_conserved_ledger_deposition` — Route infalling conserved ledgers into horizon-interface, packed-core, Noether sea, defect, or release rows before making any assimilation or information claim. Status: `priority-only`. Depends on: `horizon_entropy_packet`, `release_channel_selection`.
11. `quasar_wind_mechanical_benchmark` — Use high-power quasar winds as a mechanical outflow benchmark for release-channel selection and galaxy-scale feedback. Status: `priority-only`. Depends on: `release_channel_selection`, `high_energy_source_sink_taxonomy`.
12. `terminal_barrel_horizon_release_decision` — Decide the separate dispositions of the all-rail terminal barrel, horizon-interface alignment, 4:2:1 hypothesis, and dark-sector photon-like release without identifying the horizon with the light ring by assumption. The discussion must assign each claim a theorem target, watchlist status, or rejection and name the required boundary equations or retained records. Status: `discussion-scoped`. Depends on: none for the decision; implementation routes through `embedded_boundary_conditions`, `release_channel_selection`, and `hypothesis_bank_review`.

## Scope

The main black-hole and strong-field chapter architecture is already in place. The remaining work is narrow and quantitative rather than exploratory.

This file remains the control surface for strong-field quantitative closure. The sibling [brainstorming.md](brainstorming.md) preserves exploratory strong-field and three-binary ideas without keeping a separate ranked top-level workstream. If the quantitative work expands, the natural future split is an embedded-boundary packet and a horizon-interface label-ensemble packet.

Release-channel accounting consumes the shared [residual-routing event-ledger theorem](../braid-nested-shell-causal-closure/residual-routing-event-ledger.md). This workstream owns the strong-field boundary conditions, label ensemble, channel candidates, and observables; the shared packet owns the general rule that any release route must close $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ without untracked loss or missing remnant state.

## Detailed Priority Files

| File | Role | Target $\mathbb{A}\mathbb{A}\mathbb{A}$ notes |
| --- | --- | --- |
| [brainstorming.md](brainstorming.md) | Watchlist for strong-field and three-binary hypotheses that should not outrank the derivation spine. | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics), [noether-sea-pro-anti-coupling](../../../content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md) |
| [terminal-alignment-enumerator.md](terminal-alignment-enumerator.md) | Executable reduced terminal-alignment action diagnostic and proof packet for `horizon_entropy_packet`. | [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics), [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md) |
| [holographic-entropy-boundary-data-benchmark.md](holographic-entropy-boundary-data-benchmark.md) | Source-mined RT/Maldacena benchmark packet for horizon-wrapping entropy, finite boundary data, and scale-coordinate discipline. | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [entropy](../cross-theory-mapping/entropy.md), [spacetime-models-and-noether-sea](../../../content/markdown/aaa/philosophy-history/theory-bridges/spacetime-models-and-noether-sea.md) |
| [EQ-07C black-hole horizon-interface map](../equation-mapping/eq-07c-black-hole-horizon-interface-noether-braid-map.md) | Working black-hole-proper carrier contract that keeps terminal alignment, light-ring/null-orbit recovery, and planar-photon recovery separate until one source-backed carrier derives coincidence. | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), [general-relativity](../../../content/markdown/aaa/spacetime/general-relativity.md) |
| [dark-sector-photon-like-mode.md](../dark-sector/dark-sector-photon-like-mode.md) | Detailed watchlist packet for candidate dark-sector photon-like release, redshift, reaction, and visible-channel re-entry. | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md) |

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `embedded_boundary_conditions` | This file | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md) and [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md) | Horizon-interface solutions are formulated as Noether sea boundary-condition problems with named $\rho_{\text{NS}}$, $\Sigma_{\text{medium}}$, $\mathbf{u}_{\text{medium}}$, $\Lambda_{\text{NS}}$, and $\partial\Omega$ data. |
| `observer_predictions` | This file | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md), and [gravitational-waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md) | The embedded boundary formulation produces observer-level predictions rather than only interpretive prose. |
| `horizon_entropy_packet` | This file, [terminal-alignment-enumerator.md](terminal-alignment-enumerator.md), and [holographic-entropy-boundary-data-benchmark.md](holographic-entropy-boundary-data-benchmark.md) | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md) and [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md) | The horizon-interface label ensemble and local block entropy density are defined from admissible $\Lambda_{\text{NS}}$ states and used to state entropy-area and Page-curve recovery targets, including tests of proposed horizon identifications, without importing them as ontology. |
| `release_channel_selection` | This file and [residual-routing-event-ledger](../braid-nested-shell-causal-closure/residual-routing-event-ledger.md) | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md) | Jets, diffuse outflow, dark-sector escape, and candidate dark-sector photon-like modes are separated as release channels with event-ledger and information-accounting consequences. |
| `discriminating_observable` | This file | [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md), [gravitational-waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md), and [ppn-parameters](../../../content/markdown/aaa/spacetime/ppn-parameters.md) | At least one strong-field observable is stated in a way that can differ from GR-like behavior. |
| `hypothesis_bank_review` | [brainstorming.md](brainstorming.md) | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), and [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics) | Preserved hypotheses remain explicitly non-foundational until they acquire a boundary condition, equation, simulation target, or observable. |

## Scope Boundary

Black-hole entropy and Page-curve recovery are high-value downstream consistency targets, not imported ontology. Holographic, island, replica-wormhole, and proposed horizon-identification results should be used as comparison mathematics after the native strong-field mechanism is specified. Compact or topologically identified comparison settings are boundary-condition stress tests, not extra-dimensional ontology. This workstream now starts by posing the horizon as an embedded Noether sea boundary-condition problem; it then tracks a native horizon-interface label ensemble as the bridge between observer-level predictions and release-channel selection. The entropy target is a block entropy density over alignment-compatible label families induced by admissible $\Lambda_{\text{NS}}$ states, Page-curve recovery is a release-channel information-accounting target, and any comparison identification must preserve exterior records, release-ledger balance, finite boundary data, and the standard thermal benchmark before it can count as more than a speculative comparison.

## Current Architecture

- The core chapter architecture is already in place across:
  - [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md);
  - [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md);
  - the aligned cosmology chapters;
  - and the equivalence-principle rewrite in `nested-shell-braid-dynamics.md`.
- The actual priority here is now narrow and quantitative rather than architectural.

## Quantitative Targets

- Formulate the embedded horizon-interface condition $F_H[\rho_{\text{NS}},\Sigma_{\text{medium}},\mathbf{u}_{\text{medium}},\{\Lambda_{\text{NS}}\};\partial\Omega]=0$ and identify which boundary data are required before observer-level strong-field predictions can be trusted.
- If a black-hole interior branch is modeled as a self-hit regime, certify it with the same self-hit wall used elsewhere: same-source root existence, transversality, nonzero Jacobian floor, same-record receiver-normal branch strength, regularization convention, and a bounded energy-like branch functional under the strong-field boundary data. Otherwise retain the self-hit interior reading as a candidate regime map rather than a promoted strong-field mechanism.
- Write the compact-object scale-compression bridge map before treating matter retuning and exterior metric response as one mechanism. The source variables are Noether braid scale, internal cadence, axial inventory, pressure and density branch, Noether sea compliance, boundary data, and source/release ledger. The target variables are equation-of-state behavior, mass-radius relation, exterior clock and ruler response, redshift, light-path bending, and compactness thresholds. The validity regime is the compact-star predecessor sequence before a declared horizon-interface exit. Failure is explicit: if dense-matter support and exterior strong-field readouts require separately tuned response laws, or if no common boundary data carry both projections, the Chandrasekhar/Oppenheimer scale clue remains a comparison hint rather than a closed bridge.
- Derive a finite maximum-curvature packed-state barrier for inward assembly, photon-channel, or fragment traversal. Blueshift divergence, negative-energy-looking comparison rows, and time-reversal-like coordinate behavior should be treated as effective-chart failure signals, not as literal negative substrate energy or reversal of absolute time. For a compact interior region $\Omega$, the target is a barrier residual
  $$
  \mathcal{R}_{\mathrm{pack,max}}(\theta_\Omega)
  \le
  \epsilon_{\mathrm{pack,max}},
  \qquad
  \theta_\Omega
  =
  \left(
  \left.\mathcal{N}_{\mathrm{sea}}\right|_\Omega,
  \mathcal{B}_{\mathrm{pack}}^{(\Omega)},
  \mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(\Omega)},
  \partial\Omega
  \right),
  $$
  where the native variables remain finite, inward compression routes into branch reconfiguration, shielding/exposure change, medium/release routing, or a finite packed ensemble, and no singular zero-volume endpoint is admitted without an explicit failure code. If the packed branch is close to a single retained interior state, state that only relative to a declared coarse-graining $\mathcal{Q}$:
  $$
  S_{\mathcal{Q}}(\Omega)
  =
  k_B\log\left|\mathcal{M}_{\mathcal{Q}}(\Omega)\right|.
  $$
  A small $S_{\mathcal{Q}}(\Omega)$ for the interior packing record must not be confused with horizon-interface entropy, exterior observer entropy, release-channel information, or global information loss.
- Source-mining intake 2026-06-28 from the December 2020 strong-field posts adds a hard electromagnetic constitutive ceiling to the same maximum-curvature problem. The priority-only target is
  $$
  \mathcal{C}_{\mathrm{EM,max}}
  =
  \left(
  R_{\min},
  \epsilon_{\mathrm{eff}}(\mathcal I),
  \mu_{\mathrm{eff}}(\mathcal I),
  F_{\max},
  \mathcal{R}_{\mathrm{ceil}}
  \right),
  $$
  where $\mathcal I$ is the declared local invariant or intensity record. The ceiling is accepted only if the same Noether sea constitutive response that bounds field/self-energy also remains compatible with the packed-geometry barrier and observer-level electromagnetic recovery. A fixed lower radius, a fitted field cap, or a verbal Planck-scale appeal is not sufficient.
- Keep isolated-binary Planck-scale rows separate from many-body packed-core rows. A free binary record such as
  $$
  \Theta_{\mathrm{free\text{-}bin}}
  =
  \left(
  R,\omega,s,J,\mathcal A_{\mathrm{root}},E_{\mathrm{branch}}
  \right)
  $$
  does not by itself imply a packed-core record
  $$
  \Theta_{\mathrm{pack}}
  =
  \left(
  N,\rho_{\mathrm{pack}},
  \mathcal B_{\mathrm{pack}}^{(\Omega)},
  \mathcal L_{E\mathbf p\mathbf J}^{(\Omega)},
  \partial\Omega
  \right).
  $$
  The former may seed scale estimates for a two-body branch; the latter requires density, defect, surface, shielding, release, and many-body ledger rows.
- Treat packed-core temperature as an accessible-ensemble row, not as stored-energy shorthand. The priority-only endpoint residual is
  $$
  T_{\mathrm{obs}}^{(\Omega)}
  =
  T\!\left[
  E_{\mathrm{kin,acc}}^{(\Omega)},
  \mu_{\mathcal Q,W},
  \Omega_{\mathrm{acc}}^{(\Omega)}
  \right],
  \qquad
  E_{\mathrm{store}}^{(\Omega)}
  \ \text{reported separately}.
  $$
  A compact interior may have high stored configuration energy and few accessible rearrangements, but low $T_{\mathrm{obs}}^{(\Omega)}$ is only a claim about the declared accessible ensemble.
- Add a packed-geometry residual before treating the maximum-curvature barrier as quantitative. If $\mathcal{B}_{\mathrm{pack}}^{(\Omega)}$ is represented by candidate local packing cells, defects, or surface layers, require
  $$
  \mathcal{R}_{\mathrm{pack,geom}}
  =
  d_{\rho}\!\left(\rho_{\mathrm{pack}},\rho_{\mathrm{max}}\right)
  +d_{\partial}\!\left(A_{\mathrm{surf}},A_{\mathrm{exposed}}\right)
  +d_{\mathrm{def}}\!\left(\mathcal{D}_{\mathrm{defect}},\mathcal{D}_{\mathrm{allowed}}\right)
  +d_{\mathrm{shield}}\!\left(\Pi_{\mathrm{surf}},\Pi_{\mathrm{ext}}\right).
  $$
  FCC, HCP, or other familiar dense-pack labels may seed trial cell families, but no lattice label is accepted as ontology until the delayed branch dynamics supply the retained packing, defect, and exposure rows.
- Source-mining intake 2026-06-28 from the remaining 2019-2020 strong-field posts adds an alternating-polarity packed-core trial family under the existing packed-geometry residual. This is a simulation family, not packed-core ontology:
  $$
  \mathcal{T}_{\mathrm{pack\text{-}pol}}
  =
  \left(
  \Pi_{\pm},
  \mathcal{L}_{\mathrm{cell}},
  \mathcal{S}_{\mathrm{layer}},
  \mathcal{D}_{\mathrm{defect}},
  \mathcal{A}_{\mathrm{axis}},
  \mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)}
  \right).
  $$
  Here $\Pi_{\pm}$ is the local electrino/positrino polarity pattern, $\mathcal{L}_{\mathrm{cell}}$ is the declared cell or support basis, $\mathcal{S}_{\mathrm{layer}}$ records whether the trial family uses planar, shell, or mixed layering, $\mathcal{D}_{\mathrm{defect}}$ records defects and faults, $\mathcal{A}_{\mathrm{axis}}$ records any axis-alignment or magnetic-like exterior readout, and $\mathcal{L}_{E\mathbf p\mathbf J}^{(\Omega)}$ is the conserved compact-region ledger. A trial family is useful only if it is evaluated by the existing $\mathcal{R}_{\mathrm{pack,geom}}$, exposure, angular-momentum, and release-selector rows; it must not promote alternating charge layers, FCC/HCP labels, or a single microstate claim before the retained branch dynamics emit them.
- Keep angular momentum as a separate compact-core ledger. Dense packing does not remove $\mathbf{J}$; it relocates the bookkeeping into bulk rotation, surface shear, defect circulation, surrounding Noether sea response, or outbound release. A candidate core should report
  $$
  \mathbf{J}_{\Omega}
  =
  \mathbf{J}_{\mathrm{bulk}}
  +\mathbf{J}_{\mathrm{surf}}
  +\mathbf{J}_{\mathrm{defect}}
  +\mathbf{J}_{\mathrm{sea}}
  +\mathbf{J}_{\mathrm{out}},
  $$
  and the release selector must state which terms drain into jets, winds, diffuse release, or reabsorption.
- If the packed region is modeled as layered rather than homogeneous, the angular-momentum row must remain layer resolved:
  $$
  \mathbf{J}_{\Omega}
  =
  \sum_{\ell}
  \left(
  \mathbf{J}_{\ell,\mathrm{bulk}}
  +\mathbf{J}_{\ell,\mathrm{shear}}
  +\mathbf{J}_{\ell,\mathrm{defect}}
  \right)
  +\mathbf{J}_{\mathrm{sea}}
  +\mathbf{J}_{\mathrm{out}}.
  $$
  A jet, diffuse release, or dark-sector escape branch that drains angular momentum from only one layer must identify that layer and its transition state rather than using a single compact-object spin label.
- Add a many-body delayed-dynamics simulation target for packed interiors. The first useful target is not another isolated binary; it is an ensemble over $N\gg1$ architrinos or reduced Noether braid cells with delayed causal wakes, finite $c_f$, density control, defect creation, surface/interface rows, and a closed $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger. The minimal parameter record is
  $$
  \Theta_{\mathrm{pack\text{-}sim}}
  =
  \left(
  N,\rho_{\mathrm{pack}},P_v(v),\mathcal{C}_{ij}(t),
  \mathcal{D}_{\mathrm{defect}},\partial\Omega,
  \mathcal{L}_{E\mathbf{p}\mathbf{J}}
  \right).
  $$
  Success would be a finite packed branch, surface exposure law, or failure mode, not a visual dense-cloud analogy.
- Use the neutron-star branch as the predecessor radial test for the embedded boundary formulation: for retained radii $0\le r\le R_*$, state when $\Theta_{\mathrm{NS}}(r)=(\rho_{\text{NS}},n,\chi_{\text{sea}},\Gamma_N,S_{ij},\mathcal{M}_{\text{sea}}^{ab},\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(\Omega_r)})$ remains a compact non-horizon branch through $0<1-v_O(r)/c_f$, finite $\mathcal{R}_H(\Omega_r)$, closed event ledgers, and candidate packing headroom $0\le s_n(r)\le1$ when a pressure-packing model is used.
- Derive a stronger observer-level strong-field prediction set.
- Add the Event Horizon Telescope horizon-scale imaging packet as a direct observer benchmark. The native branch record $\theta$ must project to image-domain and visibility-domain observables
  $$
  \mathcal{T}_{\mathrm{EHT}}[\theta]
  =
  \left(
  D_{\mathrm{ring}},
  f_w,
  C_{\mathrm{dep}},
  \mathcal{V}_{ij}(u,v,t),
  \Phi^{\mathrm{cl}}_{ijk}(t),
  A^{\mathrm{cl}}_{ijkl}(t),
  \Pi_{\mathrm{lin}}(\varphi,t),
  \Pi_{\mathrm{circ}}(\varphi,t),
  J_{\mathrm{base}}(R,t)
  \right),
  $$
  where $D_{\mathrm{ring}}$ is the bright-ring diameter, $f_w$ is the fractional width, $C_{\mathrm{dep}}$ is the interior brightness-depression contrast, $\mathcal{V}_{ij}$ are baseline visibilities, $\Phi^{\mathrm{cl}}$ and $A^{\mathrm{cl}}$ are closure phases and closure amplitudes, $\Pi_{\mathrm{lin}}$ and $\Pi_{\mathrm{circ}}$ are resolved polarization records, and $J_{\mathrm{base}}$ records near-ring jet-base emission when constrained. This packet is an observer-level image and interferometry test, not horizon ontology.
- Define the horizon-interface label ensemble $\mathcal{B}_H(M,\mathbf{J},Q)$ together with a local block label family $\mathcal{L}_U^H(\theta)$, then test whether $\lim_{|U|\to\infty}|U|^{-1}\log|\mathcal{L}_U^H(\theta)|\to 1/4$ supplies the area-scaling coefficient.
- Test any proposed horizon identification by checking that the induced identified ensemble preserves exterior readout distributions, $\mathcal{R}_{H,\mathrm{bal}}$, Page-compatible release, finite boundary data, and the standard Hawking-temperature normalization within declared tolerances.
- Decide the release-channel selection between jets, diffuse outflow, dark-sector escape, and candidate dark-sector photon-like modes.
- Make the release selector condition-facing. At minimum it should record spin, net polarity/charge balance, inflow rate, ingestion spikes, merger history, existing packed-core size, core growth or shrinkage, interface defect population, surrounding Noether sea loading, jetting rate, and layer-transition state. A branch that changes the selected channel without changing one of these source conditions has introduced an untracked switch.
- Make the selector time dependent across launch, sustain, propagation, and shutoff. A minimal selector packet is
  $$
  \Theta_{\mathrm{rel}}(t)
  =
  \left(
  M,\mathbf{J},Q_{\mathrm{eff}},
  \dot M_{\mathrm{in}},
  \delta I_{\mathrm{spike}},
  H_{\mathrm{merge}},
  \mathcal{D}_{\mathrm{defect}},
  \mathcal{A}_{\mathrm{NS}},
  \mathcal{L}_{\mathrm{layer}},
  \Xi_{\mathrm{env}}
  \right),
  $$
  with $\Pi_{\mathrm{rel}}[\Theta_{\mathrm{rel}}(t)]$ returning the active channel, outflow rates, and shutoff condition. A branch that explains launch but not maintenance or termination has not closed the release selector.
- Track apparent compact-object mass as an observer-facing ledger rather than as a primitive isolated scalar. Over a resolved window,
  $$
  \Delta\!\left(M_{\mathrm{app}}c_0^2\right)
  =
  \Delta E_{\mathrm{in}}
  +\Delta E_{\mathrm{shield\to exp}}
  -\Delta E_{\mathrm{exp\to shield}}
  -\Delta E_{\mathrm{out,esc}}
  +\Delta E_{\mathrm{sea,emb}}
  -\Delta E_{\mathrm{reabs,out}}
  +R_{M,\mathrm{app}}.
  $$
  The signs are observer-facing: they ask what an exterior reconstruction counts as compact-source mass after shielding/exposure change, escaped release, reabsorbed outbound content, and embedding Noether sea loading are declared. This row is a diagnostic for shrinkage, growth, or coupling claims, not a license for arbitrary mass drift.
- For any emitted Noether sea assembly or assembly fragment, retain a release-variable packet before routing the branch into visible, dark-sector, or reabsorbed channels:
  $$
  \Theta_{\mathrm{emit}}^{(c)}
  =
  \left(
  P_v^{(c)}(v),
  \xi_c,
  \xi_{\mathrm{planar}},
  \Delta V_c,
  B_c,
  \mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(c)},
  \Delta N_{\mathrm{sea}}^{(c)}
  \right).
  $$
  Here $P_v^{(c)}$ is the emitted velocity distribution, $\xi_c$ is the branch shape ratio, $\xi_{\mathrm{planar}}$ is the planarization threshold under test, $\Delta V_c$ is the displaced or vacated Noether sea volume, $B_c$ is the branch identity, and the final two rows carry event-ledger balance and Noether sea recruitment or return. The packet is priority-only until a release route produces an observer prediction or a strong-field residual.
- For each selected release channel, report an outbound assembly-state ladder across the outward density and cadence gradient. For a channel $c$, use a declared path parameter $\lambda_c$ and a state sequence
  $$
  \mathcal{L}_{\mathrm{out}}^{(c)}
  =
  \left(
  \mathrm{packed\ maximum\ curvature},
  \mathrm{binary\ plasma},
  \mathrm{semi\ stable\ binary},
  \mathrm{doubly\ nested\ branch},
  \mathrm{nested\ shell\ braid\ candidate},
  \mathrm{planar\ photon/neutrino\ adjacent\ route},
  \mathrm{axial\ layer/fermion\ stabilization}
  \right).
  $$
  The ladder is a reporting target, not a claim that every route realizes every state. Each occupied step must carry architrino inventory, active causal-root ledgers, $E,\mathbf{p},\mathbf{J}$ balance, shielding/exposure change, Noether sea update, and the release selector that moved the record to the next step. A step may be skipped only with an explicit null route, for example direct photon-channel release, dark-sector escape, remnant capture, or reabsorption by the horizon-interface ensemble. This prevents strong-field recycling claims from jumping directly from a packed interior to a visible jet or CMB-facing output without naming the assembly reconstitution path.
- State the Page-curve-compatible information-preservation requirement for those release channels.
- Separate information claims into conserved ledgers, accessible observer records, interior coarse-graining, and release accounting before making any destruction or preservation claim:
  $$
  \mathcal{I}_{H}
  =
  \left(
  \mathcal{L}_{\mathrm{cons}},
  \mathcal{B}_{H},
  \mathcal{C}_{\mathrm{coarse}},
  \mathcal{L}_{\mathrm{out}},
  R_{\mathrm{Page}}
  \right).
  $$
  Here $\mathcal{L}_{\mathrm{cons}}$ carries conserved energy, momentum, angular momentum, polarity, and identity-routing rows; $\mathcal{B}_{H}$ carries horizon-interface labels; $\mathcal{C}_{\mathrm{coarse}}$ states the declared interior coarse-graining; $\mathcal{L}_{\mathrm{out}}$ carries release records; and $R_{\mathrm{Page}}$ is the Page-compatible recovery residual. A small interior coarse-grained state count is not by itself global information destruction.
- Before an inward assembly, photon-channel packet, or fragment is counted as assimilated into a packed region, route its conserved ledger into declared deposition channels:
  $$
  \mathcal{D}_{\mathrm{ingress}}
  =
  \left(
  \mathcal{L}_{\mathrm{in}},
  \mathcal{L}_{\partial\Omega},
  \Delta\mathcal{B}_{H},
  \Delta\mathcal{C}_{\mathrm{coarse}},
  \mathcal{L}_{\mathrm{out/sea}}
  \right).
  $$
  Here $\mathcal{L}_{\mathrm{in}}$ is the incoming conserved ledger, $\mathcal{L}_{\partial\Omega}$ is the horizon-interface crossing row, $\Delta\mathcal{B}_{H}$ is any horizon-label update, $\Delta\mathcal{C}_{\mathrm{coarse}}$ is the packed-interior coarse-graining change, and $\mathcal{L}_{\mathrm{out/sea}}$ records Noether sea, defect, recoil, or release-channel deposition. A branch that makes content disappear into the packed core without one of these rows has lost ledger provenance rather than solved the information problem.
- Extract at least one discriminating observable relative to GR-like strong-field behavior.

### High-Energy Source/Sink Taxonomy

Before a strong-field branch can feed cosmology, it needs a source/sink ledger rather than a generic "release" label:

| Class | Role | Required row |
| --- | --- | --- |
| Horizon-interface release | Outbound assembly, photon-channel, or dark-sector candidate from the compact boundary | Release selector, event-ledger balance, and exterior handoff |
| Jet channel | Collimated visible or mixed-sector outflow | Jet-base environment, momentum/angular-momentum routing, and baryon loading |
| Merger channel | Transient strong-field rearrangement of compact records | Incoming compact-source records, wave/recoil ledger, remnant state |
| Diffuse release | Broad low-contrast medium loading or radiation bath contribution | Source density, spectrum, thermalization depth, and spatial distribution |
| Catastrophic candidate | Rare high-energy release or branch failure under maximum-curvature pressure | Trigger condition, allowed products, negative controls |
| Reabsorption | Outbound content captured back into the horizon-interface ensemble or local medium | Capture probability, returned inventory, entropy/information accounting |
| Return channel | Long-path recycling into Noether sea, neutral assemblies, or visible channels | Transport history, conversion row, and final observer-facing residual |

This taxonomy does not add a new closure gate. It keeps `release_channel_selection` from collapsing physically different source and sink routes into one adjustable cosmology term.

Odd radio circles are a candidate source-family lead for the catastrophic row, not evidence for a new class by themselves. If used, the packet should record host association, morphology, spectrum, polarization, environment, merger/AGN history, and null controls against ordinary shock, lobe, and projection explanations. A strong-field release interpretation is admissible only if the same source/sink ledger supplies the energy, angular momentum, medium loading, and exterior radiative handoff without changing the release selector per object.

Fermi-bubble and eROSITA-bubble comparisons are a cleaner galaxy-scale release lead because they already point to bounded energy, age, axis, and environment rows. If used, the packet should record total energy, radiative and dynamical age, Galactic-center or AGN history, axis symmetry, polarization or spectrum where available, surrounding gas state, and null controls against starburst winds, ordinary AGN feedback, and projection effects. The useful question is whether one release-channel selector can connect compact-source history to large-scale medium work without becoming a free feedback term.

High-power quasar winds supply a mechanical outflow benchmark for the same source/sink taxonomy. The useful data product is not the legacy claim that a Planck-plasma jet is established. It is the observer-level fact that some quasar systems drive galaxy-scale winds with large mass-loading, percent-of-$c$ velocities, and host-scale feedback. A compact benchmark packet is
$$
\mathcal{B}_{\mathrm{QSO\text{-}wind}}
=
\left(
\dot M_{\mathrm{out}},
v_{\mathrm{out}},
\dot E_{\mathrm{mech}},
t_{\mathrm{duty}},
R_{\mathrm{shock}},
\Delta\mathrm{SFR},
\mathcal{L}_{E\mathbf p\mathbf J}^{\mathrm{wind}}
\right).
$$
The release selector should pass this benchmark only when the same compact-source, disk/interface, wind-propagation, and surrounding Noether sea loading record supplies the mass outflow, mechanical power, duty cycle, shock scale, star-formation feedback, and $E,\mathbf p,\mathbf J$ ledger. A branch that explains a launch impulse but not the sustained mechanical work has not closed the quasar-wind channel.

Asymmetric jet release needs its own momentum-balance residual before it is allowed to influence host dynamics. For a compact source with two polar channels, define
$$
\mathcal{R}_{\mathrm{jet\text{-}recoil}}
=
\left\|
\Delta\mathbf{p}_{\mathrm{BH}}
+
\int
\left(
\mathbf{\Pi}_{j,+}
+
\mathbf{\Pi}_{j,-}
+
\mathbf{\Pi}_{\mathrm{rad}}
+
\mathbf{\Pi}_{\mathrm{sea}}
\right)dt
\right\|_{\Sigma_p^{-1}}
+
\lambda_J
\left\|
\Delta\mathbf{J}_{\mathrm{BH}}
+
\Delta\mathbf{J}_{j,+}
+
\Delta\mathbf{J}_{j,-}
+
\Delta\mathbf{J}_{\mathrm{sea}}
\right\|_{\Sigma_J^{-1}}.
$$
The residual is a source/sink ledger check, not a claim that one-sided jets explain galaxy dynamics. It asks whether asymmetric onset, shutoff, baryon loading, or dark-sector loading can be reconciled with compact-source recoil, host-galaxy motion, angular-momentum routing, and medium updates without changing the release selector per object.

Resolved jet knots should be recorded as release chronology rather than generic morphology. A useful source packet is
$$
\mathcal{K}_{\mathrm{jet}}
=
\left(
\mathbf{x}_K,
t_K,
\Delta t_K,
E_K,
\Pi_K,
\alpha_K,
\psi_K,
\Theta_{\mathrm{env},K},
\mathcal{H}_{\mathrm{rel},K}
\right),
$$
where $\mathbf{x}_K$ is knot position, $t_K$ and $\Delta t_K$ are age and duration estimates, $E_K$ is bounded energy, $\Pi_K$ is polarization or polarization fraction, $\alpha_K$ is spectral index, $\psi_K$ is projected angle, $\Theta_{\mathrm{env},K}$ records local environment, and $\mathcal{H}_{\mathrm{rel},K}$ records the candidate release history. The packet is useful only when knots, lobes, shocks, and inverse-Compton or synchrotron rows consume the same source, transport, and medium state.

### MIT 8.962 Compact-Source Scaffold

The MIT 8.962 sequence gives this workstream a controlled strong-field benchmark ladder without turning GR into substrate ontology. The OCW lecture summaries route compact sources through TOV stellar structure, Buchdahl compactness, black-hole horizons, black-hole orbits, light rings, post-Newtonian expansion, perturbation theory, and numerical relativity (`https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/pages/lecture-summaries/`). Hughes's typed-note index mirrors that ladder through compact sources, black holes, orbits, Kerr, post-Newtonian expansion, perturbation theory, and numerical integration (`https://web.mit.edu/sahughes/www/8.962/index.html`). The safe priority extraction is that the native horizon-interface program should pass the compact-star predecessor branch before claiming a black-hole departure.

Add the compact-source residual to `observer_predictions`:
$$
\mathcal{R}_{\mathrm{compact}}(\theta)
=
w_{\mathrm{TOV}}R_{\mathrm{TOV}}
+w_{\mathrm{ext}}R_{\mathrm{ext}}
+w_{\mathrm{Buch}}R_{\mathrm{Buch}}
+w_{\mathrm{LR}}R_{\mathrm{LR}}
+w_{\mathrm{ISCO}}R_{\mathrm{ISCO}}
+w_{\mathrm{PN}}R_{\mathrm{PN}}.
$$
The terms have narrow meanings:

| Term | Benchmark role | Native closure use |
| --- | --- | --- |
| $R_{\mathrm{TOV}}$ | Recover the pressure, density, mass-function, and hydrostatic-balance profile for an effective compact fluid branch. | Tests whether $\Theta_{\mathrm{NS}}(r)$ is a stable non-horizon predecessor rather than a hand-drawn density profile. |
| $R_{\mathrm{ext}}$ | Match the exterior Schwarzschild comparison outside a spherical source when no strong-field departure is asserted. | Separates exterior effective metric recovery from horizon-interface ontology. |
| $R_{\mathrm{Buch}}$ | Track the comparison compactness limit $2GM/(R_*c_0^2)<8/9$ for ordinary isotropic-fluid assumptions. | Flags when the branch exits compact-star assumptions and must move to a native horizon-interface or anisotropic-medium model. |
| $R_{\mathrm{LR}}$ | Recover the Schwarzschild comparison light ring $r_{\mathrm{ph}}=3GM/c_0^2$ where that exterior applies. | Connects strong-field lensing and EHT ring/shadow rows to the same branch record. |
| $R_{\mathrm{ISCO}}$ | Recover the nonrotating comparison ISCO $r_{\mathrm{ISCO}}=6GM/c_0^2$ for massive test-body orbits. | Keeps disk, inspiral, and ringdown handoffs tied to a common exterior effective metric. |
| $R_{\mathrm{PN}}$ | Match post-Newtonian exterior expansion before numerical or perturbative strong-field comparisons are invoked. | Prevents a strong-field fit from breaking the weak-field/1PN recovery already owned by GR phenomenology. |

This packet consumes the existing embedded boundary variables rather than adding a new validation gate. A branch may differ from GR-like behavior only after the residual names which assumption has failed: isotropic fluid, exterior vacuum comparison, spherical symmetry, stationary exterior, photon-path transfer, or event-ledger release accounting. Otherwise the departure is only a missing benchmark row.

The compact-source predecessor also strengthens the horizon-interface label ensemble. For a candidate horizon branch $\theta_H$, require a predecessor sequence $\{\theta_{*,n}\}$ with
$$
\theta_{*,n}
=
\left(
R_{*,n},
M_n,
P_n(r),
\rho_n(r),
\Theta_{\mathrm{NS},n}(r),
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(\Omega_r,n)}
\right)
$$
such that $\mathcal{R}_{\mathrm{compact}}(\theta_{*,n})\le\epsilon_{\mathrm{compact}}$ until a declared exit surface $g_H(\theta_{*,n})=0$ is reached. The native horizon-interface condition $F_H=0$ then inherits finite boundary wake data, Noether sea state, and event-ledger rows from the predecessor sequence rather than beginning as a disconnected black-hole hypothesis.

### Event Horizon Telescope Benchmark Packet

The EHT source family supplies a compact quantitative benchmark for the `observer_predictions` and `discriminating_observable` tasks. The safe extraction is not "a black-hole picture proves the native ontology." It is that a viable strong-field branch must reproduce a stable lensing/ring scale while separating that scale from variable plasma emission, polarization transport, visibility-domain reconstruction choices, and jet-base environment.

Source anchors:

| Source | Direct benchmark signal | Closure use |
| --- | --- | --- |
| EHT data products, `https://eventhorizontelescope.org/for-astronomers/data`, and 2017 public data release, `https://eventhorizontelescope.org/blog/public-data-release-event-horizon-telescope-2017-observations` | Public calibrated VLBI data products and release provenance for EHT observing campaigns. | Reproducibility guardrail: image claims should be replayable against public interferometry products where releases exist. |
| EHT M87$^*$ Paper I, `https://arxiv.org/abs/1906.11238` | Asymmetric bright ring with $D_{\mathrm{ring}}=42\pm3\,\mu\mathrm{as}$, central brightness depression, stability across calibration/imaging schemes and observing days. | Strong-field image scale and interior-depression benchmark. |
| EHT M87$^*$ Paper IV, `https://arxiv.org/abs/1906.11241` | Ring and asymmetry recovered by independent imaging teams, CLEAN, regularized maximum-likelihood methods, and synthetic-data validation. | Image-vs-reconstruction guardrail. |
| EHT M87$^*$ Paper VI, `https://arxiv.org/abs/1906.11243` | Visibility-domain crescent modeling preferred; $D_{\mathrm{ring}}=42\pm3\,\mu\mathrm{as}$, $f_w<0.5$, interior flux suppressed by a factor $>10$, and $\theta_g=GM/(Dc_0^2)=3.8\pm0.4\,\mu\mathrm{as}$. | Visibility-domain residual and compact-source size normalization. |
| EHT Sgr A$^*$ Papers I, II, III, IV, and VI, `https://arxiv.org/abs/2311.08680`, `https://arxiv.org/abs/2311.08679`, `https://arxiv.org/abs/2311.09479`, `https://arxiv.org/abs/2311.08697`, `https://arxiv.org/abs/2311.09484` | Intrahour variability; visibility minima consistent with a blurred $\sim50\,\mu\mathrm{as}$ ring; $D_{\mathrm{ring}}=51.8\pm2.3\,\mu\mathrm{as}$; the observed image size is within $\sim10\%$ of Kerr predictions using independent mass-to-distance priors; thermal-surface alternatives are ruled out and fully reflective surfaces are unlikely under the comparison assumptions. | Variable-source reconstruction benchmark and horizon-surface alternative stress test. |
| EHT M87$^*$ polarization Papers VII and VIII, `https://arxiv.org/abs/2105.01169`, `https://arxiv.org/abs/2105.01173` | Linear polarization peaks near $\sim15\%$, polarization angles are nearly azimuthal, internal Faraday rotation and unresolved sub-beam structure matter, and consistent models are magnetically arrested accretion disks with dynamically important near-horizon magnetic fields. | Polarization-transport and plasma-environment separation benchmark. |
| EHT multiepoch M87$^*$ variability, `https://arxiv.org/abs/2509.24593` | Persistent diameter $43.9\pm0.6\,\mu\mathrm{as}$ across 2017, 2018, and 2021, while brightness and polarization vary; first EHT constraints on jet emission outside the ring at $\lesssim1\,\mathrm{mas}$. | Epoch-stability residual: the ring scale is geometry-facing while intensity, polarization, and jet-base terms are environment-facing. |

A minimal residual for a candidate branch record is
$$
\begin{aligned}
\mathcal{R}_{\mathrm{EHT}}(\theta)
=&
w_D
\left[
\frac{D_{\mathrm{ring}}^{\theta}-D_{\mathrm{ring}}^{\mathrm{obs}}}
{\sigma_D}
\right]^2
+
w_{\mathrm{vis}}\,
\chi^2_{\mathrm{vis}}
\left(
\mathcal{V}^{\theta},\Phi_{\theta}^{\mathrm{cl}},A_{\theta}^{\mathrm{cl}};
\mathcal{D}_{\mathrm{VLBI}}
\right)
\\
&+
w_{\mathrm{dep}}\,
d_{\mathrm{dep}}\!\left(C_{\mathrm{dep}}^{\theta},C_{\mathrm{dep}}^{\mathrm{obs}}\right)
+
w_{\mathrm{var}}\,
d_{\mathrm{var}}\!\left(
\Delta_{\mathrm{epoch}}^{\theta},
\{I(\varphi,t),\Pi_{\mathrm{lin}}(\varphi,t),\Pi_{\mathrm{circ}}(\varphi,t)\}^{\mathrm{obs}}
\right)
\\
&+
w_{\mathrm{pol}}\,
d_{\mathrm{pol}}\!\left(
\Pi_{\mathrm{lin}}^{\theta},
\Pi_{\mathrm{circ}}^{\theta},
\mathrm{RM}^{\theta};
\Pi_{\mathrm{lin}}^{\mathrm{obs}},
\Pi_{\mathrm{circ}}^{\mathrm{obs}},
\mathrm{RM}^{\mathrm{obs}}
\right)
+
w_{\mathrm{jet}}\,
d_{\mathrm{jet}}\!\left(J_{\mathrm{base}}^{\theta},J_{\mathrm{base}}^{\mathrm{obs}}\right).
\end{aligned}
$$
Here $\mathcal{D}_{\mathrm{VLBI}}$ is the public calibrated interferometry record, including amplitudes and closure quantities rather than only a reconstructed image. The pass condition is $\mathcal{R}_{\mathrm{EHT}}(\theta)\le\epsilon_{\mathrm{EHT}}$ using the same $\theta$ that also supports the embedded horizon-interface condition and the release-channel ledger.

Failure modes to retain:

- `eht.image_model_split`: the image-domain reconstruction, visibility-domain fit, and compact-object branch use different records.
- `eht.ring_environment_confusion`: the stable ring scale is tuned with plasma emissivity or scattering terms that should only affect brightness, width, polarization, or variability.
- `eht.visibility_failure`: a plausible-looking image fails closure phases, closure amplitudes, or visibility minima.
- `eht.polarization_transport_gap`: the branch matches total intensity while leaving Faraday rotation, sub-beam polarization scrambling, resolved linear polarization, or circular polarization unmodeled.
- `eht.surface_alternative_leak`: a horizon-free surface comparison survives ring-size fitting but violates the broadband thermal-surface or reflective-surface bounds.
- `eht.jet_base_split`: near-ring jet-base emission is fitted without sharing the release-channel selector and Noether sea loading record.

## Related Priorities

- [master-equation-closure](../master-equation-closure/priorities.md)
- [braid](../braid-retained-branch-closure/priorities.md)
- [dark-sector](../dark-sector/priorities.md)
- [cosmology-closure](../cosmology-closure/priorities.md)
- [app-simulation](../app-simulation/priorities.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md)
- [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md)
- [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md)
- [gravitational-waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md)
- [ppn-parameters](../../../content/markdown/aaa/spacetime/ppn-parameters.md)
