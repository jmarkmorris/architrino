# Strong-Field Quantitative Closure

## Workstream Metadata

- Kind: `priority`
- Rank: `15`
- Value: `9.98`
- Cost: `6.2`
- ROI: `1.61`
- Status: `queued`

## Task Queue

1. `embedded_boundary_conditions` — Formulate horizon-interface solutions as Noether sea boundary-condition problems with $\rho_{\text{NS}}$, $\Sigma_{\text{medium}}$, $\mathbf{u}_{\text{medium}}$, admissible $\Lambda_{\text{NS}}$ data, and surrounding $\partial\Omega$. Status: `next`. Depends on: none.
2. `observer_predictions` — Derive a stronger observer-level strong-field prediction set from the embedded boundary-condition formulation. Status: `pending`. Depends on: `embedded_boundary_conditions`.
3. `horizon_entropy_packet` — Define the horizon-interface label ensemble and its local block entropy density from admissible $\Lambda_{\text{NS}}$ states, then use them to state entropy-area and Page-curve recovery targets, including tests of proposed horizon identifications. Status: `kernel-handoff-ready`; terminal enumerator consumption and coefficient derivation pending. Depends on: `observer_predictions`.
4. `release_channel_selection` — Decide the release-channel selection between jets, diffuse outflow, dark-sector escape, and candidate dark-sector photon-like modes. Status: `pending`. Depends on: `observer_predictions`, `horizon_entropy_packet`.
5. `discriminating_observable` — Extract at least one discriminating observable against GR-like strong-field behavior. Status: `pending`. Depends on: `release_channel_selection`.
6. `hypothesis_bank_review` — Preserve strong-field and tri-binary hypotheses as a watchlist, and promote only hypotheses that gain a boundary condition, equation, simulation target, or observable. Status: `ongoing`. Depends on: none.

## Scope

The main black-hole and strong-field chapter architecture is already in place. The remaining work is narrow and quantitative rather than exploratory.

This file remains the control surface for strong-field quantitative closure. The sibling [hypothesis-bank.md](hypothesis-bank.md) preserves exploratory strong-field and tri-binary ideas without keeping a separate ranked top-level workstream. If the quantitative work expands, the natural future split is an embedded-boundary packet and a horizon-interface label-ensemble packet.

Release-channel accounting consumes the shared [residual-routing event-ledger theorem](../nested-shell-swarm-causal-closure/residual-routing-event-ledger.md). This workstream owns the strong-field boundary conditions, label ensemble, channel candidates, and observables; the shared packet owns the general rule that any release route must close $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ without untracked loss or missing remnant state.

## Detailed Priority Files

| File | Role | Target $\mathbb{A}\mathbb{A}\mathbb{A}$ notes |
| --- | --- | --- |
| [hypothesis-bank.md](hypothesis-bank.md) | Watchlist for strong-field and tri-binary hypotheses that should not outrank the derivation spine. | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md), [noether-sea-pro-anti-coupling](../../../content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md) |
| [terminal-alignment-enumerator.md](terminal-alignment-enumerator.md) | Executable reduced terminal-alignment action diagnostic and proof packet for `horizon_entropy_packet`. | [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md), [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md) |
| [holographic-entropy-boundary-data-benchmark.md](holographic-entropy-boundary-data-benchmark.md) | Source-mined RT/Maldacena benchmark packet for horizon-wrapping entropy, finite boundary data, and scale-coordinate discipline. | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [entropy](../cross-theory-mapping/entropy.md), [spacetime-models-and-noether-sea](../../../content/markdown/aaa/philosophy-history/theory-bridges/spacetime-models-and-noether-sea.md) |
| [dark-sector-photon-like-mode.md](../dark-sector/dark-sector-photon-like-mode.md) | Detailed watchlist packet for candidate dark-sector photon-like release, redshift, reaction, and visible-channel re-entry. | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [radiation](../../../content/markdown/aaa/reactions/radiation.md) |

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `embedded_boundary_conditions` | This file | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md) and [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md) | Horizon-interface solutions are formulated as Noether sea boundary-condition problems with named $\rho_{\text{NS}}$, $\Sigma_{\text{medium}}$, $\mathbf{u}_{\text{medium}}$, $\Lambda_{\text{NS}}$, and $\partial\Omega$ data. |
| `observer_predictions` | This file | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md), and [gravitational-waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md) | The embedded boundary formulation produces observer-level predictions rather than only interpretive prose. |
| `horizon_entropy_packet` | This file, [terminal-alignment-enumerator.md](terminal-alignment-enumerator.md), and [holographic-entropy-boundary-data-benchmark.md](holographic-entropy-boundary-data-benchmark.md) | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md) and [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md) | The horizon-interface label ensemble and local block entropy density are defined from admissible $\Lambda_{\text{NS}}$ states and used to state entropy-area and Page-curve recovery targets, including tests of proposed horizon identifications, without importing them as ontology. |
| `release_channel_selection` | This file and [residual-routing-event-ledger](../nested-shell-swarm-causal-closure/residual-routing-event-ledger.md) | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md) | Jets, diffuse outflow, dark-sector escape, and candidate dark-sector photon-like modes are separated as release channels with event-ledger and information-accounting consequences. |
| `discriminating_observable` | This file | [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md), [gravitational-waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md), and [ppn-parameters](../../../content/markdown/aaa/spacetime/ppn-parameters.md) | At least one strong-field observable is stated in a way that can differ from GR-like behavior. |
| `hypothesis_bank_review` | [hypothesis-bank.md](hypothesis-bank.md) | [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md), and [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md) | Preserved hypotheses remain explicitly non-foundational until they acquire a boundary condition, equation, simulation target, or observable. |

## Scope Boundary

Black-hole entropy and Page-curve recovery are high-value downstream consistency targets, not imported ontology. Holographic, island, replica-wormhole, and proposed horizon-identification results should be used as comparison mathematics after the native strong-field mechanism is specified. Compact or topologically identified comparison settings are boundary-condition stress tests, not extra-dimensional ontology. This workstream now starts by posing the horizon as an embedded Noether sea boundary-condition problem; it then tracks a native horizon-interface label ensemble as the bridge between observer-level predictions and release-channel selection. The entropy target is a block entropy density over alignment-compatible label families induced by admissible $\Lambda_{\text{NS}}$ states, Page-curve recovery is a release-channel information-accounting target, and any comparison identification must preserve exterior records, release-ledger balance, finite boundary data, and the standard thermal benchmark before it can count as more than a speculative comparison.

## Current Architecture

- The core chapter architecture is already in place across:
  - [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md);
  - [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md);
  - the aligned cosmology chapters;
  - and the equivalence-principle rewrite in `nested-shell-swarm-dynamics.md`.
- The actual priority here is now narrow and quantitative rather than architectural.

## Quantitative Targets

- Formulate the embedded horizon-interface condition $F_H[\rho_{\text{NS}},\Sigma_{\text{medium}},\mathbf{u}_{\text{medium}},\{\Lambda_{\text{NS}}\};\partial\Omega]=0$ and identify which boundary data are required before observer-level strong-field predictions can be trusted.
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
- State the Page-curve-compatible information-preservation requirement for those release channels.
- Extract at least one discriminating observable relative to GR-like strong-field behavior.

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

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [braid](../swarm/swarm.md)
- [dark-sector](../dark-sector/dark-sector.md)
- [cosmology-closure](../cosmology-closure/cosmology-closure.md)
- [simulations](../simulations/simulations.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [black-holes](../../../content/markdown/aaa/spacetime/black-holes.md)
- [singularity-resolution](../../../content/markdown/aaa/spacetime/singularity-resolution.md)
- [General Relativity](../../../content/markdown/aaa/spacetime/general-relativity.md)
- [gravitational-waves](../../../content/markdown/aaa/spacetime/gravitational-waves.md)
- [ppn-parameters](../../../content/markdown/aaa/spacetime/ppn-parameters.md)
