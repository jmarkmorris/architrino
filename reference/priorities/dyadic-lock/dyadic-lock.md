# Dyadic Resonance Lock

## Workstream Metadata

- Kind: `priority`
- Rank: `12`
- Value: `10.56`
- Cost: `4.2`
- ROI: `2.51`
- Status: `queued`

## Task Queue

1. `reduced_phase_amplitude_map` — Build the regularized two-layer phase-amplitude return map at fixed eta. Status: `next`. Depends on: none.
2. `stable_12_fixed_point` — Prove or numerically demonstrate a stable 1:2 fixed point. Status: `pending`. Depends on: `reduced_phase_amplitude_map`.
3. `chain_to_124` — Test whether chaining the second layer yields a stable 1:2:4 state. Status: `pending`. Depends on: `stable_12_fixed_point`.

## Scope

Treat [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live note for a candidate dyadic lock, not as proof that the full dynamics uniquely select `1:2:4`.

This workstream owns the reduced-map proof path for dyadic resonance selection. It should keep archive heuristics subordinate to finite-$\eta$ phase-amplitude stability tests and to the breather-certificate discipline described below.

When the reduced map is used as a probability or stability laboratory, this workstream consumes the shared [transfer-operator and basin-measure theorem](../quantum-closure/transfer-operator-basin-measure.md). Dyadic lock owns the finite-$\eta$ phase-amplitude map and fixed-point diagnostics; the shared quantum packet owns the invariant or metastable measure grammar that decides whether dyadic basins can support downstream probability claims.

## OpenAlex Baseline

[openalex-baseline.md](openalex-baseline.md) records the May 18, 2026 OpenAlex review set for nonlinear oscillations, synchronization, phase locking, recurrence, and reduced-map stability diagnostics.

## Detailed Priority Files

| File | Role | Target AAA notes |
| --- | --- | --- |
| [phenomenological-heuristics.md](phenomenological-heuristics.md) | Preserved archive for conjectural geometry, scaling, and cosmology intuitions that should not drive the active derivation unless rederived from the reduced dynamics. | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [mode-taxonomy](../../../content/markdown/aaa/interactions/mode-taxonomy.md) |
| [noether-core-scaling-and-packing.md](noether-core-scaling-and-packing.md) | Priority scaffold for ideal Noether-core same-energy scaling, outer-binary radius/speed equations, and exclusion-envelope packing center density. | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [noether-core](../../../content/markdown/aaa/spacetime/noether-core.md), [noether-core-geometry](../../../content/markdown/aaa/spacetime/noether-core-geometry.md), [noether-sea](../../../content/markdown/aaa/spacetime/noether-sea.md) |

## What Is Solid

- Exact periodic closure gives a rational resonance lattice.
- Near-horizon self-similar closure gives the broader family $1:s:s^2$.
- `1:2:4` is the minimal integer member of that family, not yet a theorem of the full master equation.
- The theorem-level statements currently in hand are conditional kinematic radius identities under the dyadic assumptions plus the $\mathbb{Z}_3$ dipole-cancellation identity.
- The exact global invariants worth anchoring the reduction are total energy and total angular momentum, not branchwise action slices.

## What Remains Open

- Whether the dynamics select `s=2`.
- Whether common-speed and self-similar assumptions hold outside the near-horizon regime.
- Whether a reduced phase-amplitude or causal-work functional contracts toward the dyadic fixed point.
- Whether the $\mathbb{Z}_3$ organization is only radiative-stealth bookkeeping or a genuine adiabatic stabilizer.
- Whether any old `1:1:2` branch ledger emerges only on an attractor rather than belonging in the foundation.

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `reduced_phase_amplitude_map` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) | A finite-$\eta$ two-layer return map with phase and amplitude/speed variables, active branch counts, and a stated regularization. |
| `stable_12_fixed_point` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) | A stable `1:2` fixed point proved or numerically demonstrated with Jacobian/eigenvalue diagnostics. |
| `chain_to_124` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) and [mode-taxonomy](../../../content/markdown/aaa/interactions/mode-taxonomy.md) | Chaining the second layer yields a stable `1:2:4` state, or the failure mode is recorded without promoting the old heuristic branch ledger. |

## Breather Certificate Discipline

The dyadic program should copy the breather distinction between integer closure and stable return-map closure. A candidate `1:2` or `1:2:4` ledger is only a branch label until the regularized phase-amplitude return map reports finite active branches, positive Jacobian floors, a closed returned section, and a non-symmetry stability gap. If the collinear breather fails at branch-chart or monodromy rows, the dyadic map must treat the same failure class as blocking rather than as evidence for or against dyadic selection itself.

## Immediate Next Move

1. Use [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live dynamics note and keep [phenomenological-heuristics](phenomenological-heuristics.md) as the scratch/archive notebook.
2. Build the regularized two-layer phase-amplitude return map at fixed finite $\eta > 0$, not a pure phase-only reduction.
3. Prove or numerically demonstrate a stable `1:2` fixed point in that reduction, then test whether chaining the second layer yields a stable `1:2:4` state.
4. Study the Jacobian and eigenvalues near the suspected dyadic fixed point as $\beta \to 1$.
5. Only after that revisit $\eta \to 0^+$ and promote archive material that can be rederived from the reduced dynamics.

## Related Priorities

- [phenomenological-heuristics](phenomenological-heuristics.md)
- [simulations](../simulations/simulations.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)

## Related AAA Notes

- [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md)
- [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md)
- [mode-taxonomy](../../../content/markdown/aaa/interactions/mode-taxonomy.md)
