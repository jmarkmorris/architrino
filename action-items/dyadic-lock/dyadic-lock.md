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

Treat [dyadic-resonance-lock.md](../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live note for a candidate dyadic lock, not as proof that the full dynamics uniquely select `1:2:4`.

## What Is Solid

- Exact periodic closure gives a rational resonance lattice.
- Near-horizon self-similar closure gives the broader family `1:s:s^2`.
- `1:2:4` is the minimal integer member of that family, not yet a theorem of the full master equation.

## What Remains Open

- Whether the dynamics select `s=2`.
- Whether common-speed and self-similar assumptions hold outside the near-horizon regime.
- Whether a reduced phase-amplitude or causal-work functional contracts toward the dyadic fixed point.
