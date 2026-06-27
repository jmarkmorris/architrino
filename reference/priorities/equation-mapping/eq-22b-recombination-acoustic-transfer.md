# EQ-22B Recombination And Acoustic Transfer

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source audit: [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md)
- Parent packet: [EQ-21 Through EQ-23 And EQ-32 Shared Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md)
- Assigned ID: `EQ-22B`
- Related corpus material: [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), [Structure Formation](../../../content/markdown/aaa/cosmology/structure-formation.md)
- Claim level: observer-level recombination, visibility, sound-horizon, damping, and acoustic-transfer benchmark; native carrier dictionary; fail-closed residual target
- Promotion status: priority-only
- Current score: `2`

## Purpose

`EQ-22B` splits recombination and acoustic transfer out of the broad `EQ-22` CMB transfer row. The row asks whether one shared thermal/provenance/readout carrier can recover:

- Saha equilibrium as a detailed-balance benchmark;
- Peebles-style non-equilibrium recombination as a rate-competition benchmark;
- Thomson scattering rate, optical depth, and visibility;
- sound horizon and baryon loading;
- Silk diffusion damping;
- and a tight-coupled photon-baryon acoustic oscillator row.

The row is not a new origin story and not a claim that recombination or acoustic transfer has been derived in $\mathbb{A}\mathbb{A}\mathbb{A}$. It is a bounded equation-mapping packet for the first reusable recombination/acoustic variable dictionary, residual, and first blocker.

## Standard Benchmark

The equilibrium recombination comparison is the Saha row

$$
\frac{x_e^2}{1-x_e}
=
\frac{1}{n_H}
\left(
\frac{m_ek_BT}{2\pi\hbar^2}
\right)^{3/2}
\exp\left(-\frac{\chi_H}{k_BT}\right).
$$

A Peebles-style rate row can be written schematically as

$$
\dot x_e
=
-C_{\mathrm{rec}}\alpha_Bn_Hx_e^2
+C_{\mathrm{rec}}\beta_B(1-x_e).
$$

The Thomson scattering rate and first decoupling gate are

$$
\Gamma_T
=
n_e\sigma_Tc_\gamma,
\qquad
\Gamma_T\approx H_{\mathrm{eff}},
$$

with optical depth and visibility row

$$
\tau_T
=
\int n_e\sigma_Tc_\gamma\,dt,
\qquad
g
=
\Gamma_Te^{-\tau_T}.
$$

The tight-coupled acoustic comparison uses

$$
c_s
=
\frac{c_\gamma}{\sqrt{3(1+R_b)}},
\qquad
r_s
=
\int\frac{c_s}{a_{\mathrm{eff}}}\,dt,
$$

with a Silk-damping comparison

$$
k_D^{-2}
\sim
\int
\frac{c_\gamma^2}{6a_{\mathrm{eff}}^2\Gamma_T}
\frac{R_b^2+\frac{16}{15}(1+R_b)}{(1+R_b)^2}
\,dt,
$$

and a compact acoustic oscillator row

$$
\ddot\Theta_{\gamma b}
+c_s^2k^2\Theta_{\gamma b}
=
S_{\gamma b}.
$$

These formulae are grounded because they are detailed-balance, rate-competition, scattering-rate, radiative-transfer, diffusion, and oscillator constraints. In this packet they remain observer-level benchmark constraints that a native shared carrier must reproduce or fail.

## Native Carrier Dictionary

Define the first `EQ-22B` carrier as

$$
\Theta_{\mathrm{rec/ac}}
=
\left(
x_e^\theta,
n_e^\theta,
\Gamma_T^\theta,
\tau_T^\theta,
g^\theta,
r_s^\theta,
k_D^\theta,
R_b^\theta,
\theta_{\gamma b}^\theta,
\Theta_{\mathrm{therm/prov}},
\Theta_{\mathrm{read}},
\mathcal L_{E\mathbf p\mathbf J}
\right).
$$

The carrier requires:

| Variable or row | Role in `EQ-22B` | Required native attachment |
| --- | --- | --- |
| $x_e^\theta$ and $n_e^\theta$ | Ionization fraction and electron density. | Shared source/thermal/provenance row, not a private CMB fit parameter. |
| $\Gamma_T^\theta$ | Thomson scattering rate. | Photon channel, electron population, and local effective clock. |
| $\tau_T^\theta$ and $g^\theta$ | Optical depth and visibility. | Same scattering-rate row and path/readout record. |
| $r_s^\theta$ and $R_b^\theta$ | Sound horizon and baryon loading. | Shared photon/baryon loading record used by BBN and CMB transfer. |
| $k_D^\theta$ | Diffusion damping scale. | Same scattering, baryon loading, and finite-window thermal record. |
| $\theta_{\gamma b}^\theta$ | Acoustic oscillator state. | Shared Noether sea path and photon-baryon transfer readout. |
| $\Theta_{\mathrm{therm/prov}}$ and $\Theta_{\mathrm{read}}$ | Thermal/provenance and observer readout records. | Same records used by `EQ-21`, `EQ-22`, `EQ-23`, and `EQ-32`. |
| $\mathcal L_{E\mathbf p\mathbf J}$ | Event ledger. | Energy, momentum, angular momentum, photon, neutrino, and medium updates across the finite window. |

## Equation Attack Card

| Field | Current result |
| --- | --- |
| Current score | `2` |
| Closure driver | Recover recombination kinetics, Thomson visibility, sound horizon, Silk damping, acoustic transfer, shared thermal/provenance, and observation readout from one recombination/acoustic carrier. |
| Primary carrier | $\Theta_{\mathrm{rec/ac}}$ with shared observation source window, thermal/provenance record, and readout record. |
| Smallest score-moving evidence object | Accepted source-backed `recombination_acoustic_carrier` plus accepted bindings for all `EQ-22B` required rows in one shared observation record. |
| Exact first blocker | `missing_accepted_recombination_acoustic_carrier` |
| Probe-exposed next blocker | `missing_accepted_theta_src` after the carrier-shell probe marks only the top carrier accepted-looking. |
| Existing scripts/fixtures/packets | [eq22b-recombination-acoustic-residual.mjs](../../../scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs), [eq22b-recombination-acoustic-attempt.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-attempt.v1.json), [eq22b-recombination-acoustic-source-attempt.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-source-attempt.v1.json), [eq22b-recombination-acoustic-carrier-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-carrier-source-evidence-probe.v1.json) |
| Fail-closed controls | Generic/source and `theta_src` coordination-source controls reject priority packets, authored prose, fixture files, private source windows, split readout clocks, and child-row source substitutions. |
| Safe implementation target | Priority-packet refinement only: make the Direct Geometry Layer explicit before attempting a source-backed shared observation row. |

## Direct Geometry Layer

This layer binds the recombination and acoustic equations to one shared observation record. It does not let recombination, visibility, damping, acoustic phase, BBN handoff, and readout clock become separate fitted successes.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Saha row for $x_e$ | Ionization-fraction readout from one thermal/provenance and baryon/electron population record. | `recombination_acoustic_carrier`, `theta_therm_prov`, `recombination_kinetics_row` | $x_e^\theta$, $n_e^\theta$, $T^\theta$, and hydrogen abundance stay on the same source window and thermal/provenance id. | Generic/source controls reject fitted ionization rows sourced to priority packets or authored prose. | Accepted carrier plus same-record thermal/provenance and recombination-kinetics rows. |
| Peebles-style $\dot x_e$ | Rate-competition readout for recombination and ionization over the same finite window. | `recombination_kinetics_row`, `event_ledger`, `source_provenance` | Recombination coefficients, ionization terms, finite-window event ledger, and source provenance share one carrier id. | Private recombination-rate controls reject a kinetics row not bound to the shared observation record. | Accepted recombination-kinetics row with finite-window event ledger and durable source support. |
| $\Gamma_T=n_e\sigma_Tc_\gamma$, $\tau_T$, and $g=\Gamma_Te^{-\tau_T}$ | Thomson scattering, optical-depth, and visibility readout from the same photon/electron path record. | `photon_channel`, `thomson_visibility_row`, `theta_read` | Electron density, photon channel, optical depth, visibility, and readout clock use the same source window and readout id. | Visibility-without-optical-depth and decoupling-without-Thomson controls reject partial rows. | Accepted photon-channel, visibility, and readout rows on one carrier. |
| $r_s=\int c_s/a_{\mathrm{eff}}\,dt$ and $R_b$ | Sound-horizon and baryon-loading readout from the shared BBN-to-CMB handoff. | `theta_src`, `theta_read`, `theta_bb`, `sound_horizon_row` | Baryon loading, photon loading, readout clock, and blackbody packet reference remain bound to one shared source window. | `theta_src` coordination-source control rejects a priority source-field map as the accepted source window. | Accepted `theta_src` source-window row plus sound-horizon row and readout handoff. |
| Silk damping $k_D$ | Diffusion-damping readout from the same scattering, baryon-loading, and thermal rows. | `silk_damping_row`, `thomson_visibility_row`, `theta_therm_prov` | Damping consumes the same $\Gamma_T^\theta$, $R_b^\theta$, finite-window thermal record, and readout clock as visibility and sound horizon. | Omitted-damping and private-baryon-loading controls reject damping rows calculated from separate loading. | Accepted Silk-damping row bound to accepted visibility and thermal/provenance rows. |
| $\ddot\Theta_{\gamma b}+c_s^2k^2\Theta_{\gamma b}=S_{\gamma b}$ | Tight-coupled photon-baryon acoustic-transfer readout from the same source/readout carrier. | `acoustic_transfer_row`, `theta_src`, `theta_read`, `noether_sea_state` | Acoustic phase, source term, Noether sea state, readout clock, and event ledger share one carrier and source window. | Split acoustic/readout controls reject oscillator rows whose phase or source term uses a private clock. | Accepted acoustic-transfer row with accepted Noether sea and readout rows. |
| Neutrino, BBN handoff, and event ledger | Shared observation-source handoff across photon, baryon, neutrino, thermal, and medium rows. | `neutrino_channel`, `event_ledger`, `source_provenance`, `no_hidden_retune_witness` | $N_{\mathrm{eff}}$, neutrino energy, BBN handoff, photon loading, source provenance, and retune witness use one record. | Generic/source controls reject child-row source substitutions and split finite-window ledgers. | Accepted event ledger, neutrino channel, source-provenance row, and no-hidden-retune witness. |

## Recombination/Acoustic Residual

The first residual decomposes the comparison:

$$
\mathcal R_{\mathrm{rec/ac}}^\theta
=
\mathcal R_{x_e}^\theta
+\lambda_P\mathcal R_{\mathrm{Peebles}}^\theta
+\lambda_\tau\mathcal R_{\tau_T}^\theta
+\lambda_g\mathcal R_{\mathrm{vis}}^\theta
+\lambda_s\mathcal R_{r_s}^\theta
+\lambda_D\mathcal R_{\mathrm{Silk}}^\theta
+\lambda_{\mathrm{ac}}\mathcal R_{\mathrm{acoustic}}^\theta
+\lambda_{\mathrm{shared}}\mathcal S_{\mathrm{retune}}.
$$

| Residual term | Meaning |
| --- | --- |
| $\mathcal R_{x_e}^\theta$ | Checks Saha equilibrium for the declared temperature, density, and ionization fraction. |
| $\mathcal R_{\mathrm{Peebles}}^\theta$ | Checks the non-equilibrium rate row against declared recombination and ionization coefficients. |
| $\mathcal R_{\tau_T}^\theta$ | Checks Thomson rate, optical depth, and the decoupling gate $\Gamma_T^\theta\approx H_{\mathrm{eff}}^\theta$. |
| $\mathcal R_{\mathrm{vis}}^\theta$ | Checks the visibility row from the same optical-depth record. |
| $\mathcal R_{r_s}^\theta$ | Checks sound horizon from the same $R_b^\theta$, $c_\gamma^\theta$, and readout clock. |
| $\mathcal R_{\mathrm{Silk}}^\theta$ | Checks damping from the same scattering and baryon-loading row. |
| $\mathcal R_{\mathrm{acoustic}}^\theta$ | Checks a tight-coupled acoustic oscillator row. |
| $\mathcal S_{\mathrm{retune}}$ | Penalizes separate records for recombination, visibility, sound horizon, damping, acoustic phase, BBN handoff, and readout clock. |

`EQ-22B` is distinct from `EQ-22A`: `EQ-22A` owns photon occupancy and Planck-law mode counting, while `EQ-22B` owns recombination/visibility/acoustic transfer. Both remain downstream of the shared observation record.

## Score Decision

Current `6/23 b` score: `2`.

The score is conservative:

- the standard formula families and corpus anchors are clear;
- the native carriers are plausible and named;
- the packet supplies a variable dictionary, residual decomposition, and score-neutral solver-style attempt checker;
- but no accepted recombination/acoustic carrier, shared thermal/provenance record, photon channel, neutrino channel, Noether sea state, or event ledger has been populated.

No existing row score changes follow from this packet.

## First Blocker

First blocker: `missing_accepted_recombination_acoustic_carrier`.

The minimum evidence object is a source-backed $\Theta_{\mathrm{rec/ac}}$ carrier with:

- declared $x_e^\theta$, $n_e^\theta$, $\Gamma_T^\theta$, $\tau_T^\theta$, $g^\theta$, $r_s^\theta$, $k_D^\theta$, $R_b^\theta$, and $\theta_{\gamma b}^\theta$ rows;
- one $\Theta_{\mathrm{therm/prov}}$ and $\Theta_{\mathrm{read}}$ shared with the broader observation packet;
- photon-channel, neutrino-channel, BBN handoff, and finite-window thermal rows on the same record;
- negative controls for fitted ionization fraction, decoupling without Thomson rate, visibility without optical depth, private baryon loading, omitted Silk damping, and split thermal/readout records.

## Executable Attempt

The first concrete artifact for this lane is the score-neutral attempt fixture at [eq22b-recombination-acoustic-attempt.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-attempt.v1.json), evaluated by [eq22b-recombination-acoustic-residual.mjs](../../../scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs):

```bash
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --summary --pretty
```

The expected attempt run returns `schemaOk: true`, `status: blocked_missing_accepted_recombination_acoustic_carrier`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_recombination_acoustic_carrier`. The normalized sample's Saha, Peebles, Thomson/visibility, sound-horizon, Silk-damping, acoustic-transfer, source-provenance, hidden-retune, and negative-control diagnostics should pass. They do not count as accepted retained evidence because the recombination/acoustic carrier and every row binding remain `status: attempt`.

The runner also reports a compact `sourceAudit` for the required rows. The default attempt keeps every row source path resolving, but this is only provenance hygiene: row status remains `attempt`. Priority packets, authored AAA prose, generated files, attempt fixtures, mocks, probes, and negative controls are not accepted retained evidence sources. Accepted-looking rows with those source paths fail before score movement with `accepted_without_evidence_source`.

## Source-Attempt Fixture

The score-neutral source-attempt fixture is [eq22b-recombination-acoustic-source-attempt.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-source-attempt.v1.json):

```bash
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-source-attempt.v1.json --summary --pretty
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-source-attempt.v1.json --summary --pretty --require-populated
```

This fixture makes the carrier contract executable without claiming retained evidence. It fixes one `commonCarrierId`, source-window id, thermal/provenance id, readout-clock id, photon-packet id, neutrino-handoff id, BBN-handoff id, event-ledger id, and no-hidden-retune witness id across the recombination/acoustic row map. Every row remains `attempt`, so the expected result remains `status: blocked_missing_accepted_recombination_acoustic_carrier`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_recombination_acoustic_carrier`. The `--require-populated` form must exit nonzero until a durable source-backed $\Theta_{\mathrm{rec/ac}}$ carrier exists.

The carrier-shell source-evidence probe is [eq22b-recombination-acoustic-carrier-source-evidence-probe.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-carrier-source-evidence-probe.v1.json):

```bash
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-carrier-source-evidence-probe.v1.json --summary --pretty
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-carrier-source-evidence-probe.v1.json --summary --pretty --require-populated
```

This fixture marks only the top $\Theta_{\mathrm{rec/ac}}$ carrier and the `recombination_acoustic_carrier` row as accepted-looking against a durable source path while leaving `theta_src`, thermal/provenance, readout, photon, neutrino, Noether sea, recombination, visibility, acoustic-transfer, provenance, and no-retune rows at `attempt`. The expected result is `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_theta_src`; the `--require-populated` form must exit nonzero. This proves the first carrier-shell step is mechanically smaller than full recombination/acoustic closure and exposes the shared observation-source window as the next accepted-evidence object.

The fail-closed generic/source control is [eq22b-recombination-acoustic-generic-source-negative-control.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-generic-source-negative-control.v1.json):

```bash
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-generic-source-negative-control.v1.json --summary --pretty
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-generic-source-negative-control.v1.json --summary --pretty --require-populated
```

This fixture marks the carrier and rows accepted-looking while sourcing them to priority packets, authored corpus prose, and the fixture itself. The expected result is `status: blocked_source_evidence`, `scoreDecision: no_score_increase`, `nextBlocker: accepted_without_evidence_source`, and `sourceEvidenceFailureCount: 17`; the `--require-populated` form must exit nonzero.

## $\Theta_{\mathrm{src}}$ Handoff Contract

The carrier-shell source-evidence probe advances `EQ-22B` only to `missing_accepted_theta_src`. This section records the smallest source-window handoff contract needed before any accepted-looking `theta_src` row is safe. It is score-neutral and does not populate retained evidence.

Candidate finite source window: `W_src_BBN_CMB_rec_ac_0001`, a single BBN-to-CMB/recombination handoff window with start and end boundary references still pending durable evidence.

| Contract field | Required value | Fail-closed condition |
| --- | --- | --- |
| `theta_src.id` | `Theta_src_attempt_0001` until a durable source-backed row replaces it | Accepted-looking placeholder identity is rejected. |
| `sourceFamily` | `shared observation source window` | A private recombination/acoustic source family cannot satisfy the shared observation parent. |
| `W_src` | `W_src_BBN_CMB_rec_ac_0001`, one finite source window | BBN, CMB, and recombination rows use different windows. |
| Noether sea keys | `rho_NS`, `n`, `chi_sea`, `Gamma_N`, `u_sea`, `M_sea_ab` | Noether sea loading is split or retuned between source, photon, and readout rows. |
| Loading keys | `rho_bar`, `rho_A`, `photon_loading` | Baryon, architrino, or photon loading is introduced independently in a child row. |
| BBN/CMB keys | `T_theta`, `rho_theta`, `eta`, `N_eff`, `Y_p` / `Y_BBN_theta`, `thermal_depth` | CMB imports different $\eta$, $N_{\mathrm{eff}}$, helium yield, or thermal depth. |
| Photon handoff | `theta_gamma_packet_ref`, `theta_rec_ac_ref`, unchanged `photon_loading` | Blackbody, recombination, or acoustic rows use private photon loading. |
| Neutrino handoff | `neutrino_energy`, `N_eff`, future `neutrino_channel` row reference | Neutrino energy or $N_{\mathrm{eff}}$ differs between BBN and CMB. |
| Readout keys | `H_eff`, `a_eff`, `theta_read_ref` only from accepted readout handoff | Observation readout is imported from a separate clock or ruler. |
| Event ledger | one `event_ledger_ref` | Source, photon, weak, baryon, neutrino, or medium exchange rows split ledgers. |
| No-hidden-retune witness | one `S_retune` witness | Source window, event ledger, thermal provenance, readout, photon loading, or neutrino handoff is privately retuned. |

The matching fail-closed control is [eq22b-recombination-acoustic-theta-src-coordination-source-negative-control.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-theta-src-coordination-source-negative-control.v1.json). It clones the carrier-shell probe, mutates only `packet.rows.theta_src` to `status: accepted`, gives it `sourceKind: source_window_record`, and points `theta_src.sourcePath` back to [EQ-21/EQ-22/EQ-23 $\Theta_{\mathrm{src}}$ Source-Field Map](eq-21-22-23-theta-src-source-field-map.md). The checker reports `status: blocked_missing_rows`, `scoreDecision: no_score_increase`, `nextBlocker: accepted_without_evidence_source`, and `sourceEvidenceFailureCount: 1`; the `--require-populated` form exits nonzero. This prevents a coordination packet from satisfying the shared observation source window.

## Promotion Disposition

Classification: `priority-only`.

Promote now: no.

Potential later targets:

- [CMB](../../../content/markdown/aaa/cosmology/CMB.md), after the carrier is accepted enough to state the recombination/acoustic residual reader-facing.
- [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), only after the same photon, baryon, neutrino, and thermal rows preserve BBN handoff.
- [Structure Formation](../../../content/markdown/aaa/cosmology/structure-formation.md), only after acoustic transfer and growth readouts share the same observation carrier.

## Next Evidence Object

The next score-moving artifact is not another normalized fixture. It is a source-backed $\Theta_{\mathrm{rec/ac}}$ carrier whose row bindings are accepted and whose thermal/provenance/readout record keeps recombination, visibility, sound horizon, damping, acoustic transfer, BBN handoff, and observation readout on one record.
