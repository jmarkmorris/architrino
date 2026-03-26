# Quantum Closure

## Workstream Metadata

- Kind: `deferred-priority`
- Rank: `11`
- Value: `4`
- Cost: `8`
- ROI: `0.50`
- Status: `deferred`

## Task Queue

1. `transfer_operator` — Construct the transfer-operator closure for metastable assemblies. Status: `deferred`. Depends on: none.
2. `invariant_measure` — Identify the invariant measure and recover squared-amplitude weights. Status: `deferred`. Depends on: `transfer_operator`.
3. `bell_gate` — Test Bell, CHSH, and Tsirelson closure as a hard gate. Status: `deferred`. Depends on: `invariant_measure`.

## Scope

Populate the missing quantum closure notes only after the work becomes testable. The Born-rule target should be measure-theoretic and predictive rather than interpretive.

## Hard Gates

- Construct the relevant transfer operator for metastable assemblies under causal driving.
- Identify the invariant measure on competing attractor basins.
- Show that basin weights recover `P \propto |\psi|^2`.
- Keep Bell / CHSH / Tsirelson as a hard gate.
