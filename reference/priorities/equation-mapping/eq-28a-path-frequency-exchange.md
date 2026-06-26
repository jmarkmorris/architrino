# EQ-28A Path-Frequency Exchange

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source audit: [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md)
- Parent packet: [EQ-26 Through EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
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
