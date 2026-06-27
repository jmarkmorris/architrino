# EQ-28A Path-Frequency Exchange

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source audit: [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md)
- Parent packet: [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source map: [EQ-28A Theta-Nu-Ex Source-Field Map](eq-28a-theta-nu-ex-source-field-map.md)
- Assigned ID: `EQ-28A`
- Related corpus material: [Radiation](../../../content/markdown/aaa/reactions/radiation.md), [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [Reaction Cosmology Provenance Ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md)
- Claim level: observer-level path-frequency exchange benchmark, native carrier dictionary, and fail-closed residual target
- Promotion status: priority-only
- Current score: `2`

## Purpose

`EQ-28A` splits path-frequency exchange out of the local `EQ-28` Compton/recoil event row without renumbering the core inventory. The row asks whether one photon path-history carrier can reuse local Compton exchange, inverse-Compton boost, thermal Sunyaev-Zeldovich calibration, and kinematic Sunyaev-Zeldovich calibration without treating photon frequency change as unexplained energy loss, pure expansion bookkeeping, or source emission.

The row is not a claim that all cosmological redshift is Sunyaev-Zeldovich scattering. It is a bounded equation-mapping packet for signed path-frequency exchange: when an intervening medium changes photon frequency, the target, medium, recoil, remnant, and thermal rows must close the same ledger that preserves the photon Gate A/B handoff.

## Standard Benchmark

The local path-frequency row keeps the photon packet identity while recording a frequency change:

$$
Y_{\gamma,j}^{\mathrm{ex}}
=
-\ln
\frac{\nu_{\gamma,j}^{+}}{\nu_{\gamma,j}^{-}}.
$$

The exchange energy ledger is

$$
\mathcal R_{\nu\text{-}\mathrm{ex}}
=
\frac{
\left|
h(\nu_{\gamma,j}^{+}-\nu_{\gamma,j}^{-})
+\Delta E_{\mathrm{target},j}
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_{E,j}}.
$$

For an inverse-Compton Thomson-limit benchmark, the average photon-frequency boost is

$$
\frac{\nu^+}{\nu^-}
\simeq
\frac{4}{3}\gamma_e^2,
\qquad
4\gamma_e h\nu^-\ll m_ec_\gamma^2.
$$

For a thermal Sunyaev-Zeldovich column, the standard comparison rows are

$$
\tau_e
=
\sigma_T\int n_e\,d\ell,
\qquad
y
=
\int
\frac{k_BT_e}{m_ec_\gamma^2}
n_e\sigma_T\,d\ell,
$$

with the Rayleigh-Jeans temperature comparison

$$
\frac{\Delta T}{T}
\simeq
-2y.
$$

For kinematic Sunyaev-Zeldovich calibration,

$$
\frac{\Delta T}{T}
\simeq
-\tau_e\frac{v_{\parallel}}{c_\gamma}.
$$

These formulae are grounded because they come from photon-electron energy exchange, optical-depth bookkeeping, and signed line-of-sight motion. In this packet they remain observer-level constraints that a native path-history carrier must reproduce or fail.

## Native Carrier Dictionary

For a photon path segment or finite path window $W$, define the first `EQ-28A` carrier as

$$
\Theta_{\nu\text{-}\mathrm{ex}}(W)
=
\left(
\gamma_{\mathrm{in}},
\theta_{\mathrm{sea}},
e^-/\mathrm{medium},
\gamma_{\mathrm{out}},
\Delta E,
\Delta\mathbf p,
\Delta\mathbf J,
\mathcal T_W,
\mathcal R_{\mathrm{ex}}
\right).
$$

The carrier requires:

| Variable or row | Role in `EQ-28A` | Required native attachment |
| --- | --- | --- |
| $\gamma_{\mathrm{in}}$ and $\gamma_{\mathrm{out}}$ | Incoming and outgoing photon-channel packets. | Same packet identity unless the event is reclassified as absorption/re-emission, pair production, or another reaction channel. |
| $\theta_{\mathrm{sea}}$ | Noether sea path-history state. | Shared with redshift, CMB, and thermalization rows when the path is cosmological. |
| $e^-/\mathrm{medium}$ | Intervening electron population or material medium. | Source of inverse-Compton, tSZ, and kSZ exchange rows. |
| $\Delta E$, $\Delta\mathbf p$, and $\Delta\mathbf J$ | Ledger changes in energy, momentum, and angular momentum. | Same exchange event ledger as the photon-frequency row. |
| $\mathcal T_W$ | Finite-window thermal record. | Required before CMB temperature or spectral-distortion comparisons are interpreted. |
| $\mathcal R_{\mathrm{ex}}$ | Residual bundle. | Reports inverse-Compton, path-frequency, SZ, gate-handoff, provenance, and no-hidden-retune failures separately. |

## Direct Geometry Layer

This table is priority-only. It maps the comparison terms to the native geometry, carrier rows, same-record bindings, fail-closed controls, and smallest accepted evidence objects that must exist before any inverse-Compton or SZ comparison can count as equation evidence. It does not move the score, and it does not treat frequency change as pure photon energy loss, void expansion, source emission, or a private thermal calibration.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $Y_{\gamma,j}^{\mathrm{ex}}=-\ln(\nu_{\gamma,j}^{+}/\nu_{\gamma,j}^{-})$ | Signed photon path-frequency increment read from one incoming/outgoing photon packet over one path window. | `path_frequency_exchange_carrier`, `theta_gamma_packet`, `photon_gate_a_b_handoff`, and `exchange_event_ledger`. | Same `commonCarrierId`, `pathWindowId`, `photonInId`, `photonOutId`, and `exchangeEventLedgerId`; packet identity must survive unless a different reaction channel is declared. | `phenomenological_frequency_loss_without_medium_ledger` if the shift is recorded without target, medium, recoil, and remnant ledger rows. | Accepted source-backed `Theta_nu-ex(W)` carrier row with durable photon in/out, path-window, Gate A/B, and exchange-ledger evidence. |
| $h(\nu_{\gamma,j}^{+}-\nu_{\gamma,j}^{-})+\Delta E_{\mathrm{target},j}+\Delta E_{\mathrm{med},j}+\Delta E_{\mathrm{recoil},j}+\Delta E_{\mathrm{rem},j}$ | Energy-balance readout of the same exchange event ledger, including target, medium, recoil, and remnant updates. | `exchange_event_ledger`, `electron_medium_population`, `recoil_remnant_row`, and `source_provenance`. | Energy, momentum, angular momentum, recoil, remnant, and medium-update rows share one `exchangeEventLedgerId` and the carrier's path-window identity. | `split_path_medium_record_retune` if the path-frequency row and medium/SZ rows come from separate carriers. | Accepted exchange event ledger and recoil/remnant rows after the parent carrier is accepted. |
| $\nu^+/\nu^-\simeq(4/3)\gamma_e^2$ with $4\gamma_eh\nu^-\ll m_ec_\gamma^2$ | Inverse-Compton boost readout from the electron-medium population acting on the same photon packet in the declared Thomson regime. | `inverse_compton_row`, `electron_medium_population`, `theta_gamma_packet`, and `photon_gate_a_b_handoff`. | Same electron-medium id, photon in/out ids, and exchange segment id; no separate fitted boost handle. | `inverse_compton_ratio_fit_handle` if the observed frequency ratio is fitted independently of the electron-medium row. | Accepted inverse-Compton row tied to the carrier's electron-medium population and photon packet ids. |
| $\tau_e=\sigma_T\int n_e\,d\ell$ | Optical-depth readout of the same intervening electron column or material medium. | `electron_medium_population` with optical-depth id and path length/density evidence. | Same `electronMediumId` and `pathWindowId` as inverse-Compton, tSZ, and kSZ rows. | `sz_without_electron_column` if SZ rows are evaluated without the source-backed electron column. | Accepted electron-medium population row with optical-depth support on the carrier. |
| $y=\int(k_BT_e/m_ec_\gamma^2)n_e\sigma_Td\ell$ and $\Delta T/T\simeq-2y$ | Thermal SZ readout from the electron column plus finite-window thermal record, not a borrowed CMB temperature fit. | `thermal_sz_row`, `electron_medium_population`, and `finite_window_thermal_record`. | Same electron-medium id, thermal-window id, and path-window id; thermal row cannot replace the parent path-frequency carrier. | `sz_without_electron_column` and the accepted-source guards if thermal prose or source maps are treated as retained evidence. | Accepted thermal SZ row plus finite-window thermal record on the same `Theta_nu-ex(W)`. |
| $\Delta T/T\simeq-\tau_ev_{\parallel}/c_\gamma$ | Kinematic SZ signed line-of-sight motion readout from the same optical-depth and electron-medium row. | `kinematic_sz_row` plus `electron_medium_population`. | Same optical-depth id and signed line-of-sight velocity id as the carrier's electron column. | `kinetic_sz_sign_flip` if the sign convention is flipped while the electron column is unchanged. | Accepted kinematic SZ row tied to the same optical-depth and velocity evidence. |
| Photon Gate A/B handoff and packet identity | Packet-identity and polarization handoff across the exchange segment. | `theta_gamma_packet` and `photon_gate_a_b_handoff`. | Same photon in/out ids, Gate A/B handoff id, and carrier id as the path-frequency exchange row. | `gate_handoff_collapse` if Gate B or packet identity fails before path-frequency residuals are interpreted. | Accepted photon-packet support and Gate A/B handoff rows on the carrier. |
| $\mathcal S_{\mathrm{retune}}$ and source provenance | No-hidden-retune witness plus durable source provenance for path, medium, photon packet, thermal, and SZ rows. | `source_provenance` and `no_hidden_retune_witness`. | Source, path, medium, photon packet, SZ, and thermal rows share one carrier; no private per-observable carrier or formula-fit handle. | `coordination_source_false_positive`, probe-source controls, and `split_path_medium_record_retune`. | Accepted durable evidence source outside priority prose, authored AAA prose, generated output, attempt/probe/mock/toy fixtures, negative controls, and temporary files. |

## Exchange Residual

The first residual decomposes the comparison:

$$
\mathcal R_{28A}^{\nu\text{-}\mathrm{ex}}
=
\mathcal R_{\mathrm{IC}}
+\lambda_Y\mathcal R_Y
+\lambda_{\mathrm{tSZ}}\mathcal R_{\mathrm{tSZ}}
+\lambda_{\mathrm{kSZ}}\mathcal R_{\mathrm{kSZ}}
+\lambda_G\mathcal R_{\mathrm{GateAB}}
+\lambda_{\mathrm{prov}}\mathcal R_{\mathrm{prov}}
+\lambda_{\mathrm{retune}}\mathcal S_{\mathrm{retune}}.
$$

| Residual term | Meaning |
| --- | --- |
| $\mathcal R_{\mathrm{IC}}$ | Checks the inverse-Compton Thomson-limit boost and the declared Thomson-regime condition. |
| $\mathcal R_Y$ | Checks the signed path-frequency increment and the exchange energy ledger. |
| $\mathcal R_{\mathrm{tSZ}}$ | Checks $\tau_e$, $y$, and the Rayleigh-Jeans thermal SZ temperature shift from one electron column. |
| $\mathcal R_{\mathrm{kSZ}}$ | Checks the kinematic SZ signed shift from the same optical-depth row and line-of-sight velocity. |
| $\mathcal R_{\mathrm{GateAB}}$ | Checks that photon Gate A/B handoff and packet identity survive the segment. |
| $\mathcal R_{\mathrm{prov}}$ | Checks source, path, medium, and thermal provenance. |
| $\mathcal S_{\mathrm{retune}}$ | Penalizes separate records for local Compton exchange, SZ calibration, photon packet identity, and medium thermal state. |

This suffix row is deliberately narrow. Local Compton recoil, photoelectric capture, and pair-threshold topology remain in `EQ-28`. Blackbody mode counting remains in `EQ-22A`. CMB acoustic and recombination transfer belongs in `EQ-22B`. `EQ-28A` owns the path-frequency exchange ledger that can be reused by those rows.

## Score Decision

Current `6/23 b` score: `2`.

The score is conservative:

- the standard formula families and corpus anchors are clear;
- the native carriers are plausible and named;
- the packet supplies a variable dictionary, residual decomposition, and score-neutral solver-style attempt checker;
- but no accepted path-frequency exchange carrier, photon Gate A/B handoff, electron-medium population row, Noether sea path-history row, or finite-window thermal record has been populated.

No existing row score changes follow from this packet.

## First Blocker

First blocker: `missing_accepted_path_frequency_exchange_carrier`.

The minimum evidence object is a source-backed $\Theta_{\nu\text{-}\mathrm{ex}}(W)$ carrier with:

- declared incoming and outgoing photon packets and surviving Gate A/B handoff;
- declared intervening electron or medium population with optical depth, temperature, and line-of-sight motion when SZ rows are active;
- one path-history exchange ledger carrying signed frequency increment, energy, momentum, angular momentum, recoil, remnant, and medium updates;
- one finite-window thermal record when CMB temperature or spectral-distortion rows are interpreted;
- negative controls for phenomenological frequency loss without a medium ledger, fitted inverse-Compton ratios, SZ rows without an electron column, kSZ sign flips, split path/medium records, and collapsed photon Gate B handoff.

## Executable Attempt

The first concrete artifact for this lane is the score-neutral attempt fixture at [eq28a-path-frequency-exchange-attempt.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-attempt.v1.json), evaluated by [eq28a-path-frequency-exchange-residual.mjs](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs):

```bash
node scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs --summary --pretty
```

The expected attempt run returns `schemaOk: true`, `status: blocked_missing_accepted_path_frequency_exchange_carrier`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_path_frequency_exchange_carrier`. The normalized sample's inverse-Compton, path-frequency, thermal SZ, kinematic SZ, photon Gate A/B, source-provenance, hidden-retune, and negative-control diagnostics should pass. They do not count as accepted retained evidence because the path-frequency exchange carrier and every row binding remain `status: attempt`.

## Promotion Disposition

Classification: `priority-only`.

Promote now: no.

Potential later targets:

- [Radiation](../../../content/markdown/aaa/reactions/radiation.md), after the path-frequency carrier is accepted enough to state the exchange residual reader-facing.
- [CMB](../../../content/markdown/aaa/cosmology/CMB.md), only after the same carrier preserves near-blackbody, anisotropy, polarization, damping, and lensing handoff records.
- [Reaction Cosmology Provenance Ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), only after the provenance row is source-backed and reusable.

## Next Evidence Object

The next score-moving artifact is not another normalized fixture. It is a source-backed $\Theta_{\nu\text{-}\mathrm{ex}}(W)$ carrier whose row bindings are accepted and whose path ledger keeps photon packet identity, frequency exchange, electron-medium state, recoil/remnant rows, and finite-window thermal state on one record.

The source-field contract for that carrier is staged in [EQ-28A Theta-Nu-Ex Source-Field Map](eq-28a-theta-nu-ex-source-field-map.md). It keeps `Theta_nu-ex` distinct from `theta_gamma_packet`, `theta_therm`, and `Theta_rec/ac`, and preserves `missing_accepted_path_frequency_exchange_carrier` as the ordinary first blocker.
That source-field map now carries the Direct Geometry Layer for the concrete `Theta_nu-ex` source object, including source-object ids, same-record bindings, fail-closed controls, and the smallest accepted evidence object.
