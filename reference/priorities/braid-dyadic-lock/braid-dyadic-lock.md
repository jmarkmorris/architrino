# Braid Dyadic Lock

## Workstream Metadata

- Kind: `priority`
- Rank: `14`
- Value: `8.64`
- Cost: `4.2`
- ROI: `2.06`
- Status: `queued`

## Task Queue

1. `phase_bundle_return_map` — Upgrade the finite-$\eta$ reduced return map so it retains binary signed-root complex rows $(N_s,M_p,D_{ij})$, signed-sheet labels, integer return-map degree/holonomy $(m,n)$, relative phase offsets, orbital-plane normals, $D_{\mathrm{plane}}$, branch-Jacobian floors, middle-caustic impulse rows, causal-root gluing-overlap rows, finite continuation cardinality, and any starvation-scale row for translating forward partners. The promoted branch label should report the assembly topological charge $[\mathfrak B]_{\mathrm{top}}=(N_s,M_p,c_1)$ as defined in [Assembly Topological Charge](../../../content/markdown/aaa/dynamics/assembly-topological-charge.md), with $c_1=(m,n)$ for tri-binary locks and with $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$ before comparing phase entries. Status: `next`. Depends on: none.
2. `caustic_weighted_selection_score` — Compute the caustic-weighted cancellation and residual-curvature score on the same branch chart, with the middle harmonic amplitudes derived from the regularized $1/(|J_M|+\eta_J)$ ledger rather than fitted freely. The score must separate the topological overlap requirement from the dynamical polygon-closure requirement, report the generic $A_2$ fold exponent $p_{\mathrm{fold}}=3/2$ when applicable, and choose $L_{\mathrm{eff}}$ so the tail bound $\varepsilon_L=O(L_{\mathrm{eff}}^{-2})$ is below $\frac12\Delta C_L$. Status: `pending`. Depends on: `phase_bundle_return_map`.
3. `flat_moduli_floquet_test` — Test candidate locks, including outer-normalized `1:2:4`, by contraction off the full-chart neutral directions, holonomy-defect recurrence, preservation of the memory-corrected symplectic form $\omega_0+\omega_{\mathrm{mem}}$, and nonzero $D_{\mathrm{plane}}$ rather than by scalar frequency closure alone. A direction may be quotiented only if it is neutral for the enclosing tri-binary chart, not merely for an isolated binary subsystem; a flat-modulus direction with positive $\Theta$ exponent is lock-breaking, not symmetry. Status: `pending`. Depends on: `caustic_weighted_selection_score`.
4. `inter_layer_phase_cadence_lock_residual` — Use layer phase offsets, integer cadence combinations, angular-momentum exchange, plane compatibility, and local event-ledger balance as the lock test before treating a nested shell braid as synchronized. Status: `priority-only`. Depends on: `phase_bundle_return_map`.

## Scope

Treat [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live note for a candidate dyadic lock, not as proof that the full dynamics uniquely select `1:2:4`.

This workstream owns the reduced-map proof path for dyadic resonance selection. It should keep archive heuristics subordinate to finite-$\eta$ phase-amplitude stability tests and to the breather-certificate discipline described below.

When the reduced map is used as a probability or stability laboratory, this workstream consumes the shared [transfer-operator and basin-measure theorem](../quantum-closure/transfer-operator-basin-measure.md). Dyadic lock owns the finite-$\eta$ phase-amplitude map and fixed-point diagnostics; the shared quantum packet owns the invariant or metastable measure grammar that decides whether dyadic basins can support downstream probability claims.

Approved disposition 2026-06-23: [Noether Braid Scaling and Packing](noether-braid-scaling-and-packing.md) remains in this folder. It has mass-map and packing consumers, but its active proof role is dyadic return-map and resonance-selection discipline.

## Detailed Priority Files

| File | Role | Target AAA notes |
| --- | --- | --- |
| [phenomenological-heuristics.md](phenomenological-heuristics.md) | Preserved archive for conjectural geometry, scaling, and cosmology intuitions that should not drive the active derivation unless rederived from the reduced dynamics. | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [mode-taxonomy](../../../content/markdown/aaa/reactions/mode-taxonomy.md) |
| [Noether Braid Scaling and Packing](noether-braid-scaling-and-packing.md) | Priority scaffold for ideal Noether braid same-energy scaling, outer-binary radius/speed equations, and exclusion-envelope packing center density. | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [noether-braid](../../../content/markdown/aaa/noether-braid/noether-braid.md), [nested-shell-braid-geometry](../../../content/markdown/aaa/noether-braid/nested-shell-braid-geometry.md), [noether-sea](../../../content/markdown/aaa/spacetime/noether-sea.md) |

## What Is Solid

- Exact periodic closure gives a rational resonance lattice.
- Near-horizon self-similar closure gives the broader family $1:s:s^2$.
- `1:2:4` is the minimal self-similar integer double-cover candidate in that family, not yet a theorem of the full master equation.
- The theorem-level statements currently in hand are conditional kinematic radius identities, the binary signed-root-complex reading of $(N_s,M_p,D_{ij})$, the phase-return degree/holonomy reading of $(m,n)$, the canonical assembly topological charge $[\mathfrak B]_{\mathrm{top}}=(N_s,M_p,c_1)$, the orbital-plane determinant $D_{\mathrm{plane}}$, and the caustic-weighted selection theorem target. The symbol $c_1$ is the established phase-entry slot, but in this workstream it means a return-map degree pair over the outer phase circle, not a literal first Chern class over an $S^1$ base. The $\mathbb{Z}_3$ dipole-cancellation identity is now assigned to the coplanar cyclic sector, not the near-orthogonal dyadic tri-binary sector.
- The exact global invariants worth anchoring the reduction are total energy and total angular momentum, not branchwise action slices.

## What Remains Open

- Whether the dynamics select `s=2`.
- Whether common-speed and self-similar assumptions hold outside the near-horizon regime.
- Whether a retained phase-bundle return map admits a flat connection with return-map degree/holonomy $(m,n)=(2,4)$ and $D_{\mathrm{plane}}$ bounded away from zero outside horizon alignment.
- Whether the binary signed-root complex supplies the negative-sheet and escapement rows needed by the tri-binary lock, rather than only unsigned root counts.
- Whether the circular tangency sequence in [Causal Action Functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md#circular-benchmark-as-a-branch-count-theorem) derives a layerwise self-hit degree parity or lower-bound law $D_s^{(a)}\equiv f(k_a)\pmod 2$ for candidate winding/frequency rows. This helps the binary-frequency search by adding a signed-sheet and speed-threshold constraint; it does not require restarting the search, but it means frequency rows alone cannot certify the assembly topological charge.
- Whether the local binary and tri-binary branch charts glue into a finite labeled continuation family rather than only passing pointwise or section-local diagnostics.
- Whether any forward structural partner row used by a translating lock stays below the Master Equation starvation scale or is replaced by a declared Noether-sea/assembly reorganization.
- Whether the middle-caustic impulse deposits the spectral weight needed at the first all-layer resonance block.
- Whether the first all-layer overlap block satisfies the dynamical polygon condition after caustic weighting; overlap at $\nu=4$ only proves cancellation is possible, not that it is achieved.
- Whether the middle-caustic tail is the generic $A_2$ fold tail with $p_{\mathrm{fold}}=3/2$, and whether the resulting $\varepsilon_L=O(L_{\mathrm{eff}}^{-2})$ truncation budget beats the winner gap.
- Whether the caustic-weighted cancellation score, holonomy-defect recurrence, and Floquet gap all select the same branch.
- Whether the selected branch preserves the pulled-back memory-corrected symplectic form $\omega_0+\omega_{\mathrm{mem}}$ under return, rather than only passing phase-volume or scalar-frequency recurrence.
- Whether the middle-caustic carrier and any embedded binary packet live in the same $\mathcal H_*=W^{1,\infty}$ finite-impulse history class with $C^1$ smooth arcs, rather than mixing incompatible caustic regularity assumptions.
- Whether the $\mathbb{Z}_3$ organization belongs only to a planar cyclic sector or also reappears as a lower-dimensional degeneration of the tri-binary bundle, and whether the $D_{\mathrm{plane}}=0$ wall is a genuine stability barrier between the near-orthogonal dyadic sector and coplanar cyclic sector.
- Whether any old `1:1:2` branch ledger emerges only on an attractor rather than belonging in the foundation.

## Promotion Map

| Task | Detailed file | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `phase_bundle_return_map` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) and [assembly-topological-charge](../../../content/markdown/aaa/dynamics/assembly-topological-charge.md) | A finite-$\eta$ return map with phase, amplitude/speed, signed binary root-complex rows $(N_s,M_p,D_{ij})$, $(m,n)$ return-map degree/holonomy, promoted assembly topological charge fields $[\mathfrak B]_{\mathrm{top}}$, $D_{\mathrm{plane}}$, Jacobian floors, caustic impulse rows, gluing-overlap rows, continuation-family cardinality, and starvation-scale status for any forward partner row. |
| `caustic_weighted_selection_score` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) | The exposed-leakage score and residual-curvature score use branch-derived caustic-weighted amplitudes, verify the polygon condition in the first all-layer block, and report a fold-exponent-based truncation/winner gap. |
| `flat_moduli_floquet_test` | [phenomenological-heuristics.md](phenomenological-heuristics.md) as archive source only | [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) and [mode-taxonomy](../../../content/markdown/aaa/reactions/mode-taxonomy.md) | The candidate lock has holonomy-defect recurrence, zero flat-modulus exponent for quotiented directions, contraction off $G$, preservation of the pulled-back memory-corrected symplectic form, and nonzero $D_{\mathrm{plane}}$; otherwise the failure mode is recorded without promoting the heuristic branch ledger. |

## Breather Certificate Discipline

The dyadic program should copy the breather distinction between integer closure and stable return-map closure. A candidate `1:2` or `1:2:4` ledger is only a branch label until the regularized phase-bundle return map reports finite active branches, the signed binary root-complex rows $(N_s,M_p,D_{ij})$, the promoted assembly topological charge fields $[\mathfrak B]_{\mathrm{top}}=(N_s,M_p,c_1)$, positive Jacobian floors, retained caustic impulse rows, holonomy-defect recurrence, memory-corrected symplectic recurrence, nonzero $D_{\mathrm{plane}}$, a non-symmetry stability gap off the flat moduli, and finite causal-root gluing across the local branch charts. If the collinear breather fails at branch-chart, monodromy, gluing, symplectic-recurrence, or continuation-cardinality rows, the dyadic map must treat the same failure class as blocking rather than as evidence for or against dyadic selection itself.

## Inter-Layer Phase/Cadence Lock Residual

Source-mining intake 2026-06-28 from the December 2020 geometry posts reframes old "spin-orbit locking" and gear-ratio language as a branch residual. The useful object is not a scalar frequency ratio by itself. A lock between layers $a$ and $b$ should report
$$
\mathcal{R}_{\mathrm{lock}}^{ab}
=
\left(
\Delta\phi_{ab},
n_a\omega_a-n_b\omega_b,
\Delta\mathbf J_{ab},
D_{\mathrm{plane}}^{ab},
\mathcal{L}_{E\mathbf p\mathbf J}^{ab}
\right).
$$
Here $\Delta\phi_{ab}$ is the retained phase offset, $n_a\omega_a-n_b\omega_b$ is the integer cadence mismatch under test, $\Delta\mathbf J_{ab}$ is angular-momentum exchange or leakage, $D_{\mathrm{plane}}^{ab}$ keeps plane compatibility explicit, and $\mathcal{L}_{E\mathbf p\mathbf J}^{ab}$ is the local ledger balance. A nested shell braid may carry a frequency label only after this residual is small on the same branch chart that supplies the signed roots and phase-bundle return map.

## Immediate Next Move

1. Use [dyadic-resonance-lock.md](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md) as the live dynamics note and keep [phenomenological-heuristics](phenomenological-heuristics.md) as the scratch/archive notebook.
2. Build the regularized phase-bundle return map at fixed finite $\eta > 0$, not a pure phase-only or amplitude-only reduction.
3. Add signed root-complex rows $(N_s,M_p,D_{ij})$, the promoted assembly topological charge fields $[\mathfrak B]_{\mathrm{top}}$, $D_{\mathrm{plane}}$, holonomy-defect $\Theta$, flat-moduli directions, negative-sheet eligibility, middle-caustic impulse rows, causal-root gluing-overlap rows, continuation-family cardinality, and starvation-scale status to the branch state.
4. Use the causal-action circular tangency theorem target to compute signed-sheet self-hit degree parity or lower-bound rows for each candidate winding/frequency family, including equal-frequency candidates.
5. Compute the caustic-weighted selection score and compare dyadic `1:2:4` against adjacent and self-similar integer covers, keeping topological overlap, dynamical polygon closure, and fold-tail truncation as separate rows.
6. Study the Floquet gap off the neutral moduli, the memory-corrected symplectic recurrence, and the caustic spectrum as $\eta \to 0^+$ before promoting archive material that can be rederived from the reduced dynamics.
7. Test whether paths from the near-orthogonal dyadic sector to the coplanar $\mathbb{Z}_3$ sector must lose either the plane floor, the symplectic recurrence row, or the non-symmetry Floquet gap at $D_{\mathrm{plane}}=0$.

## Related Priorities

- [phenomenological-heuristics](phenomenological-heuristics.md)
- [app-simulation](../app-simulation/app-simulation.md)
- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [quantum-closure](../quantum-closure/quantum-closure.md)

## Related AAA Notes

- [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md)
- [assembly-topological-charge](../../../content/markdown/aaa/dynamics/assembly-topological-charge.md)
- [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md)
- [mode-taxonomy](../../../content/markdown/aaa/reactions/mode-taxonomy.md)
