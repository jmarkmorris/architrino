# Binary Pulsar Orbital Decay

## Standard-Theory Concept

Binary pulsars test relativistic orbital dynamics through pulse timing. The classic orbital-period derivative is modeled as energy and angular-momentum loss to gravitational radiation. At leading quadrupole order, the loss scales with the changing mass quadrupole and produces a precise $\dot P_b$ prediction after kinematic corrections.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

This is an event-ledger and radiation-reaction gate. $\mathbb{A}\mathbb{A}\mathbb{A}$ cannot treat orbital energy loss as an unexplained sink. The loss must route through a shared $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, a propagating disturbance or medium update, recoil accounting, and an effective metric waveform or timing residual.

## Task Queue

1. `quadrupole_limit` — Recover the leading quadrupole power law as an effective limit. Status: `draft`.
2. `timing_ledger` — Record orbital energy, angular momentum, spin, recoil, pulse propagation, and medium update rows. Status: `draft`.
3. `shared_wave_handoff` — Connect binary-pulsar loss to the gravitational-wave propagation lane. Status: `draft`.

## Closure Objects

- Orbital ledger: $(E_{\mathrm{orb}},\mathbf{J}_{\mathrm{orb}},P_b,\dot P_b,e)$.
- Radiation event ledger: $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ for emitted effective gravitational radiation or Noether-Sea disturbance.
- Effective benchmark map: $\mathcal{B}_{\mathrm{pulsar}}(\Theta_{\mathrm{map}})=(\dot P_b,\dot\omega,\gamma_{\mathrm{timing}},r,s)$.
- Kinematic correction record for proper motion and Galactic acceleration.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [strong-field-closure](../strong-field-closure/strong-field-closure.md) | Use compact-binary timing as a bridge between weak-field PPN and strong-field dynamics. |
| This file | [tri-binary-causal-closure/residual-routing-event-ledger](../tri-binary-causal-closure/residual-routing-event-ledger.md) | Treat orbital decay as a routed conservation-ledger problem. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add binary-pulsar timing to gravity and radiation acceptance sets. |

## Failure Modes

- `pulsar.energy_sink`: orbital energy disappears without an emitted or medium-update ledger.
- `pulsar.quadrupole_miss`: the leading quadrupole timing law cannot be recovered.
- `pulsar.wave_split`: pulsar orbital decay and directly detected gravitational waves require incompatible propagation objects.
- `pulsar.kinematic_blur`: observed timing corrections are mixed with theory residuals without explicit nuisance records.
