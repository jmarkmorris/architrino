# Binary Pulsar Orbital Decay

## Standard-Theory Concept

Binary pulsars test relativistic orbital dynamics through pulse timing. The classic orbital-period derivative is modeled as energy and angular-momentum loss to gravitational radiation. At leading quadrupole order, the loss scales with the changing mass quadrupole and produces a precise $\dot P_b$ prediction after kinematic corrections.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

This is an event-ledger and radiation-reaction gate. $\mathbb{A}\mathbb{A}\mathbb{A}$ cannot treat orbital energy loss as an unexplained sink. The loss must route through a shared $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, a propagating disturbance or medium update, recoil accounting, and an effective metric waveform or timing residual.

## Task Queue

1. `quadrupole_limit` — Recover the leading quadrupole power law as an effective limit. Status: `draft`.
2. `timing_ledger` — Record orbital energy, angular momentum, spin, recoil, pulse propagation, and medium update rows. Status: `draft`.
3. `shared_wave_handoff` — Connect binary-pulsar loss to the gravitational-wave propagation lane. Status: `draft`.
4. `direct_wave_low_velocity_limit` — Require the same effective radiation map that fits GWOSC/LVK compact-binary strain to reduce to the binary-pulsar orbital-decay law in the slow-motion, weak-radiation limit. Status: `draft`.

## Closure Objects

- Orbital ledger: $(E_{\mathrm{orb}},\mathbf{J}_{\mathrm{orb}},P_b,\dot P_b,e)$.
- Radiation event ledger: $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ for emitted effective gravitational radiation or Noether sea disturbance.
- Effective benchmark map: $\mathcal{B}_{\mathrm{pulsar}}(\Theta_{\mathrm{map}})=(\dot P_b,\dot\omega,\gamma_{\mathrm{timing}},r,s)$.
- Kinematic correction record for proper motion and Galactic acceleration.
- Shared radiation-limit residual:
  $$
  R_{\mathrm{pulsar}\to\mathrm{GW}}
  =
  \frac{
  \left|\dot E_{\mathrm{orb}}^{\mathbb{A}\mathbb{A}\mathbb{A}}-
  \dot E_{\mathrm{GWOSC}}^{\mathrm{weak}}\right|
  }{
  |\dot E_{\mathrm{orb}}^{\mathrm{GR,quad}}|+\varepsilon_0
  },
  $$
  where $\dot E_{\mathrm{GWOSC}}^{\mathrm{weak}}$ is the low-velocity expansion of the same event-ledger radiation map used for public compact-binary waveform benchmarks.

The GWOSC/LVK direct-detection lane sharpens this file's role: binary-pulsar orbital decay is not an isolated historical check. It is the adiabatic, low-frequency end of the same conservation problem tested by public inspiral, merger, and ringdown strain. A candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ map passes the shared handoff only if one parameter record supplies both
$$
\dot P_b^{\mathbb{A}\mathbb{A}\mathbb{A}}(P_b,e,m_1,m_2,\Theta_{\mathrm{map}})
$$
and the compact-binary waveform residuals $R_h$, $R_\phi$, and $R_E$ without a sector-specific radiation coefficient.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [strong-field-closure](../strong-field-closure/strong-field-closure.md) | Use compact-binary timing as a bridge between weak-field PPN and strong-field dynamics. |
| This file | [nested-shell-swarm-causal-closure/residual-routing-event-ledger](../nested-shell-swarm-causal-closure/residual-routing-event-ledger.md) | Treat orbital decay as a routed conservation-ledger problem. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add binary-pulsar timing to gravity and radiation acceptance sets. |

## Failure Modes

- `pulsar.energy_sink`: orbital energy disappears without an emitted or medium-update ledger.
- `pulsar.quadrupole_miss`: the leading quadrupole timing law cannot be recovered.
- `pulsar.wave_split`: pulsar orbital decay and directly detected gravitational waves require incompatible propagation objects.
- `pulsar.kinematic_blur`: observed timing corrections are mixed with theory residuals without explicit nuisance records.
- `pulsar.direct_wave_split`: the binary-pulsar timing law and GWOSC compact-binary strain require different radiation maps, source ledgers, or gravity-channel propagation speeds.
