# Dyadic Resonance Lock

## Workstream Metadata

- Kind: `priority`
- Rank: `5`
- Value: `7`
- Cost: `4`
- ROI: `1.75`
- Status: `queued`

## Task Queue

1. `reduced_phase_amplitude_map` — Build the regularized two-layer phase-amplitude return map at fixed eta. Status: `next`. Depends on: none.
2. `stable_12_fixed_point` — Prove or numerically demonstrate a stable 1:2 fixed point. Status: `pending`. Depends on: `reduced_phase_amplitude_map`.
3. `chain_to_124` — Test whether chaining the second layer yields a stable 1:2:4 state. Status: `pending`. Depends on: `stable_12_fixed_point`.

## Scope

Treat [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live note for a candidate dyadic lock, not as proof that the full dynamics uniquely select `1:2:4`.

## What Is Solid

- Exact periodic closure gives a rational resonance lattice.
- Near-horizon self-similar closure gives the broader family `1:s:s^2`.
- `1:2:4` is the minimal integer member of that family, not yet a theorem of the full master equation.
- The theorem-level statements currently in hand are conditional kinematic radius identities under the dyadic assumptions plus the `\mathbb{Z}_3` dipole-cancellation identity.
- The exact global invariants worth anchoring the reduction are total energy and total angular momentum, not branchwise action slices.

## What Remains Open

- Whether the dynamics select `s=2`.
- Whether common-speed and self-similar assumptions hold outside the near-horizon regime.
- Whether a reduced phase-amplitude or causal-work functional contracts toward the dyadic fixed point.
- Whether the `\mathbb{Z}_3` organization is only radiative-stealth bookkeeping or a genuine adiabatic stabilizer.
- Whether any old `1:1:2` branch ledger emerges only on an attractor rather than belonging in the foundation.

## Immediate Next Move

1. Use [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live dynamics note and keep [phenomenological-heuristics](phenomenological-heuristics.md) as the scratch/archive notebook.
2. Build the regularized two-layer phase-amplitude return map at fixed finite `\eta > 0`, not a pure phase-only reduction.
3. Prove or numerically demonstrate a stable `1:2` fixed point in that reduction, then test whether chaining the second layer yields a stable `1:2:4` state.
4. Study the Jacobian and eigenvalues near the suspected dyadic fixed point as `\beta \to 1`.
5. Only after that revisit `\eta \to 0^+` and promote archive material that can be rederived from the reduced dynamics.

## Related Priorities

- [phenomenological-heuristics](phenomenological-heuristics.md)
- [simulations](../deferred/simulations.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)

## Related AAA Notes

- [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md)
- [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md)
- [mode-taxonomy](../../../content/markdown/aaa/dynamics/mode-taxonomy.md)
