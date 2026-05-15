# Blackbody Radiation

## Standard-Theory Concept

Blackbody radiation is the equilibrium spectrum of electromagnetic radiation in a cavity. The failure of classical equipartition at high frequency is the ultraviolet catastrophe; Planck's law resolves it:

$$
u(\nu,T)
=
\frac{8\pi h\nu^3}{c^3}
\frac{1}{e^{h\nu/kT}-1}.
$$

The case is observationally anchored in thermal spectra and cosmologically sharpened by the CMB blackbody.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

This is the cleaner replacement for listing "UV divergence" as an observational case. $\mathbb{A}\mathbb{A}\mathbb{A}$ should use blackbody radiation to test photon Gate C, basin measures, thermalization depth, and CMB handoff. The target is not to import quantization as a postulate, but to recover a stable occupancy law for coaxial contra-rotating pro/anti planar pair modes interacting with matter and the Noether Sea.

## Task Queue

1. `mode_count_gate` — Define the allowed photon-channel mode density from Gate A/B geometry. Status: `draft`.
2. `occupation_measure_gate` — Derive or approximate Planck occupation from basin/thermal measures rather than assigned probabilities. Status: `draft`.
3. `cmb_blackbody_handoff` — Tie local blackbody recovery to CMB photon-loading and thermalization records. Status: `draft`.

## Closure Objects

- Mode density: $g(\nu)$ in the effective photon channel.
- Occupation measure: $\mu_*(B_\nu)$ or equivalent thermal basin measure.
- Event ledger for absorption, emission, recoil, heat, and medium update.
- CMB thermalization depth and zero effective photon chemical potential.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [tri-binary-causal-closure/radiation-gate-c-benchmarks](../tri-binary-causal-closure/radiation-gate-c-benchmarks.md) | Make blackbody recovery a Gate C benchmark. |
| This file | [quantum-closure/transfer-operator-basin-measure](../quantum-closure/transfer-operator-basin-measure.md) | Use thermal occupation as a basin-measure proof target. |
| This file | [cosmology-closure](../cosmology-closure/cosmology-closure.md) | Require CMB blackbody claims to share local radiation ledger variables. |

## Failure Modes

- `blackbody.uv_failure`: the high-frequency spectrum diverges or requires an unmotivated cutoff.
- `blackbody.mode_import`: Planck mode occupation is imported as a rule rather than recovered.
- `blackbody.cmb_split`: CMB blackbody recovery uses different photon-loading variables from local thermal radiation.
- `blackbody.no_event_balance`: emission and absorption lack energy, momentum, recoil, and material ledger rows.
