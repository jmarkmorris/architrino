# Dyadic Resonance Lock

## Workstream Metadata

- Kind: `priority`
- Rank: `13`
- Value: `9.06`
- Cost: `4.2`
- ROI: `2.16`
- Status: `queued`

## Task Queue

1. `phase_bundle_return_map` — Upgrade the finite-$\eta$ reduced return map so it retains binary signed-root complex rows $(N_s,M_p,D_{ij})$, signed-sheet labels, integer holonomy $(m,n)$, relative phase offsets, orbital-plane normals, $D_{\mathrm{plane}}$, branch-Jacobian floors, and middle-caustic impulse rows. Status: `next`. Depends on: none.
2. `caustic_weighted_selection_score` — Compute the caustic-weighted cancellation and residual-curvature score on the same branch chart, with the middle harmonic amplitudes derived from the regularized $1/(|J_M|+\eta_J)$ ledger rather than fitted freely. Status: `pending`. Depends on: `phase_bundle_return_map`.
3. `flat_moduli_floquet_test` — Test candidate locks, including outer-normalized `1:2:4`, by contraction off the flat-connection moduli, holonomy-defect recurrence, and nonzero $D_{\mathrm{plane}}$ rather than by scalar frequency closure alone. Status: `pending`. Depends on: `caustic_weighted_selection_score`.

## Scope

Treat [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live note for a candidate dyadic lock, not as proof that the full dynamics uniquely select `1:2:4`.

This workstream owns the reduced-map proof path for dyadic resonance selection. It should keep archive heuristics subordinate to finite-$\eta$ phase-amplitude stability tests and to the breather-certificate discipline described below.

When the reduced map is used as a probability or stability laboratory, this workstream consumes the shared [transfer-operator and basin-measure theorem](../quantum-closure/transfer-operator-basin-measure.md). Dyadic lock owns the finite-$\eta$ phase-amplitude map and fixed-point diagnostics; the shared quantum packet owns the invariant or metastable measure grammar that decides whether dyadic basins can support downstream probability claims.

## Detailed Priority Files

| File | Role | Target AAA notes |
| --- | --- | --- |
| [phenomenological-heuristics.md](phenomenological-heuristics.md) | Preserved archive for conjectural geometry, scaling, and cosmology intuitions that should not drive the active derivation unless rederived from the reduced dynamics. | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [mode-taxonomy](../../../content/markdown/aaa/reactions/mode-taxonomy.md) |
| [noether-swarm-scaling-and-packing.md](noether-swarm-scaling-and-packing.md) | Priority scaffold for ideal Noether swarm same-energy scaling, outer-binary radius/speed equations, and exclusion-envelope packing center density. | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [noether-swarm](../../../content/markdown/aaa/noether-swarm/noether-swarm.md), [nested-shell-swarm-geometry](../../../content/markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md), [noether-sea](../../../content/markdown/aaa/spacetime/noether-sea.md) |

## What Is Solid

- Exact periodic closure gives a rational resonance lattice.
- Near-horizon self-similar closure gives the broader family $1:s:s^2$.
- `1:2:4` is the minimal self-similar integer double-cover candidate in that family, not yet a theorem of the full master equation.
- The theorem-level statements currently in hand are conditional kinematic radius identities, the binary signed-root-complex reading of $(N_s,M_p,D_{ij})$, the phase-bundle holonomy reading of $(m,n)$, the orbital-plane determinant $D_{\mathrm{plane}}$, and the caustic-weighted selection theorem target. The $\mathbb{Z}_3$ dipole-cancellation identity is now assigned to the coplanar cyclic sector, not the near-orthogonal dyadic tri-binary sector.
- The exact global invariants worth anchoring the reduction are total energy and total angular momentum, not branchwise action slices.

## What Remains Open

- Whether the dynamics select `s=2`.
- Whether common-speed and self-similar assumptions hold outside the near-horizon regime.
- Whether a retained phase-bundle return map admits a flat connection with holonomy $(m,n)=(2,4)$ and $D_{\mathrm{plane}}$ bounded away from zero outside horizon alignment.
- Whether the binary signed-root complex supplies the negative-sheet and escapement rows needed by the tri-binary lock, rather than only unsigned root counts.
- Whether the middle-caustic impulse deposits the spectral weight needed at the first all-layer resonance block.
- Whether the caustic-weighted cancellation score, holonomy-defect recurrence, and Floquet gap all select the same branch.
- Whether the $\mathbb{Z}_3$ organization belongs only to a planar cyclic sector or also reappears as a lower-dimensional degeneration of the tri-binary bundle.
- Whether any old `1:1:2` branch ledger emerges only on an attractor rather than belonging in the foundation.

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `phase_bundle_return_map` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) | A finite-$\eta$ return map with phase, amplitude/speed, signed binary root-complex rows $(N_s,M_p,D_{ij})$, $(m,n)$ holonomy, $D_{\mathrm{plane}}$, Jacobian floors, and caustic impulse rows. |
| `caustic_weighted_selection_score` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) | The exposed-leakage score and residual-curvature score use branch-derived caustic-weighted amplitudes and report a truncation/winner gap. |
| `flat_moduli_floquet_test` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) and [mode-taxonomy](../../../content/markdown/aaa/reactions/mode-taxonomy.md) | The candidate lock has holonomy-defect recurrence, flat-moduli neutrality, contraction off $G$, and nonzero $D_{\mathrm{plane}}$; otherwise the failure mode is recorded without promoting the heuristic branch ledger. |

## Breather Certificate Discipline

The dyadic program should copy the breather distinction between integer closure and stable return-map closure. A candidate `1:2` or `1:2:4` ledger is only a branch label until the regularized phase-bundle return map reports finite active branches, the signed binary root-complex rows $(N_s,M_p,D_{ij})$, positive Jacobian floors, retained caustic impulse rows, holonomy-defect recurrence, nonzero $D_{\mathrm{plane}}$, and a non-symmetry stability gap off the flat moduli. If the collinear breather fails at branch-chart or monodromy rows, the dyadic map must treat the same failure class as blocking rather than as evidence for or against dyadic selection itself.

## Immediate Next Move

1. Use [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live dynamics note and keep [phenomenological-heuristics](phenomenological-heuristics.md) as the scratch/archive notebook.
2. Build the regularized phase-bundle return map at fixed finite $\eta > 0$, not a pure phase-only or amplitude-only reduction.
3. Add signed root-complex rows $(N_s,M_p,D_{ij})$, $D_{\mathrm{plane}}$, holonomy-defect $\Theta$, flat-moduli directions, negative-sheet eligibility, and middle-caustic impulse rows to the branch state.
4. Compute the caustic-weighted selection score and compare dyadic `1:2:4` against adjacent and self-similar integer covers.
5. Study the Floquet gap off the neutral moduli and the caustic spectrum as $\eta \to 0^+$ before promoting archive material that can be rederived from the reduced dynamics.

## Related Priorities

- [phenomenological-heuristics](phenomenological-heuristics.md)
- [simulations](../simulations/simulations.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)

## Related AAA Notes

- [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md)
- [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md)
- [mode-taxonomy](../../../content/markdown/aaa/reactions/mode-taxonomy.md)
