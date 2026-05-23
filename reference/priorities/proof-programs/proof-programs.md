# Proof Programs

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `26.16`
- Cost: `4.7`
- ROI: `5.57`
- Status: `active`

## Task Queue

1. `breather_certificate` — Generate the finite collinear-breather certificate packet and close the conditional Schauder theorem only after the audit passes. Status: `next`. Depends on: none.
2. `planar_bridge` — Develop the first planar delayed-bridge closure as the higher-dimensional extension of the breather proof architecture. Status: `queued`; do not promote ahead of the collinear certificate unless that certificate fails with an explicit obstruction that the planar bridge is meant to resolve. Depends on: `breather_certificate`.
3. `proof_program_handoff` — Keep theorem-program chapters, certificate artifacts, and downstream priority links aligned as proof targets are promoted or retired. Status: `active`. Depends on: `breather_certificate`, `planar_bridge`.

## Scope

This directory consolidates active proof-program priorities whose main deliverable is mathematical closure rather than general dynamics exposition. The shared pattern is: state a theorem target, isolate the finite or geometric certificate needed for that target, and keep promotion from conjectural architecture to proved result explicit.

This file is the parent control surface for proof programs. The nested structure is intentional here because proof programs can have local theorem targets, certificate artifacts, and promotion gates that are too specific for the parent queue.

## Nested Workstreams

- [breather-proof](./breather-proof/breather-proof.md): active finite-certificate program for the 1D collinear breather. The candidate packet, refined pre-ledger diagnostic, diagonal-exclusion subledger, kinematic fold-layer atlas, [fold impulse ceiling handoff](./breather-proof/certificate/fold_impulse_ceiling_handoff.md), conditional fold-bound derivation, diagnostic fold constants, row-consumption map, accepted-constants contract, parent-complement packet, rejected interval attempt, candidate mollifier kernel, rejected row-tube coverage attempt, accepted fixed-parameter full-interval constants certificate, parent-after-full status packet, parent-complement partition and endpoint/membership rejection attempts, parent-contract decision packet, endpoint-exclusion contract extension, endpoint `w` and `u` closure attempts, positive-overlap subdivision attempts, regular-boundary coverage rejection, cosine-packet parent-gate rejection, fixed-cosine refinement no-go, strict-collar persistence lemma, sub-field-speed action test case, null-coordinate separation-direction lemma, gap-opening feasibility scanner diagnostic, live fold-shear gap-opening witness, finite fold-shear deformed candidate seed, phase-shifted same-packet fold-shear seed contract, first fresh fold-shear sidecar packet under `fresh-same-packet-fold-shear-seed-v0`, fail-closed fresh binary64 range-empty preledger attempt, proof-interval-v1 exact-rational coarse range-empty sidecar, proof-interval-v2 exact-rational row-specific trig range sidecar, proof-interval-v3 exact-rational trig-plus-monotone-diagonal sidecar, proof-interval-v4 exact-rational simple-root-subwindow sidecar, proof-interval-v5 exact-rational parent-complement-probe sidecar, proof-interval-v6 complement ownership/coverage probe sidecar, proof-interval-v7 same-packet ownership-data constructor sidecar, proof-interval-v8 regular-boundary finite-family sidecar, fresh blocker-anatomy and fold-layer burden sidecars, next-candidate solver target, fresh-collocation solver-surface audit, AAA corpus recommendation handoff, regular-boundary user-facing recommendation, and [pass/fail ledger](./breather-proof/certificate/pass_fail_ledger.md) now exist; the current executable target is proof-grade same-packet ownership or coverage data for the v8 candidate regular-boundary family table, parent-complement collars, endpoint/seam handling, fold-aware diagonal, and fold-layer certification because the fresh sidecar has no branch-chart authorization: proof-interval-v8 inherits 124 empty rows and 6 simple-root subrows, imports 10 v7 candidate cores, constructs 4 finite regular-boundary candidate families and 20 candidate membership edges, certifies 0 single separator assignments, 0 same-packet inclusion proofs, 0 fresh domination inequalities, 0 topology/no-double-counting certificates, 0 non-core complement closures, accepts 0 parent-complement strips, and leaves 38 parent rows unresolved.
- [planar-bridge-closure](./planar-bridge-closure/planar-bridge-closure.md): queued higher-dimensional bridge from the collinear program to the first planar delayed return map. The preparatory [planar seed packet](./planar-bridge-closure/planar_seed_packet.md) defines the reduced history space, gauge, section margins, branch margins, and sector data for the first planar row without promoting the planar bridge ahead of the collinear certificate.

## Tier 2 Comparison Theorem Targets

These source-mined targets do not change the queue order above. They are comparison proof obligations to attach to the relevant Standard Model, quantum-operator, or gauge-structure packets after the current finite-certificate priorities permit it.

1. **Gauge-covariance recovery lemma.** Given a coarse-graining $\theta$ that yields an effective connection $A_{\mathrm{eff},\mu}^\theta$, prove that allowed observer-level gauge chart changes preserve the recovered record algebra:
   $$
   D_\mu^{\theta'}(U\Psi)=U D_\mu^\theta\Psi,
   \qquad
   F_{\mu\nu}^{\theta'}=U F_{\mu\nu}^{\theta}U^{-1}.
   $$
   The proof input is the same branch ledger used for charge, weak exposure, color exceptionality, and Noether-Sea response. If the result requires changing the physical branch record under a pure gauge relabeling, the effective gauge map has not closed.
2. **Amplitude-factorization boundary lemma.** For a declared event-window scattering chart, show that every accepted physical pole of $\mathcal{A}_{n,\theta}$ has residue equal to a product of lower-channel amplitudes from the same provenance ledger:
   $$
   (P_I^2-m_h^2)\mathcal{A}_{n,\theta}
   \to
   i\sum_h
   \mathcal{A}_{L,\theta}^{(h)}
   \mathcal{A}_{R,\theta}^{(h)}.
   $$
   This is the operator-level version of locality emergence: factorization must come from a real branch-boundary decomposition, not from an appended Feynman-diagram rule.
3. **Color/kinematics compatibility lemma.** For each oriented Jacobi triple in a color-dressed effective amplitude, test whether the causal-root numerator ledger obeys the matched relation
   $$
   c_i+c_j+c_k=0
   \quad\Longrightarrow\quad
   n_i^\theta+n_j^\theta+n_k^\theta=0
   $$
   within the declared numerator residual. The value of the lemma is high if it connects the existing $Q_H+Q_M+Q_L=0$ color-exceptionality identity to a kinematic branch relation rather than leaving color and scattering numerators as separate fit grammars.
4. **Positive-coordinate branch-chart lemma.** If a low-point scattering chart can be parameterized by positive branch coordinates $\alpha_b>0$, prove that its comparison form has logarithmic singularities only on physical boundaries and that spurious cell boundaries cancel in the sum:
   $$
   \Omega_\theta\sim\bigwedge_{b}d\log\alpha_b.
   $$
   This would convert positive-geometry material into a branch-certificate-style success marker without treating the auxiliary geometry as substrate ontology.
5. **Topological-sector integrality lemma.** For an effective non-Abelian gauge-topology chart, prove that the pushed-forward curvature record gives integer winding data:
   $$
   \inf_{N\in\mathbb{Z}}
   \left|
   \frac{1}{8\pi^2}
   \int_{\mathcal{D}_\theta}
   \operatorname{tr}\!\left(F_{\mathrm{eff}}\wedge F_{\mathrm{eff}}\right)
   -N
   \right|
   \le
   \varepsilon_{\mathrm{top}}.
   $$
   The proof must identify the causal-wake, axial-layer, or Noether-Sea provenance that fixes the sector; otherwise the integer is only imported gauge-bundle bookkeeping.

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `breather_certificate` | [breather-proof](./breather-proof/breather-proof.md), [seed chart packet](./breather-proof/certificate/seed_chart_packet.md), [fold impulse ceiling handoff](./breather-proof/certificate/fold_impulse_ceiling_handoff.md), the fold diagnostic/contract/rejection/full-interval artifacts, the strict-collar and separation-direction lemmas, [sub-field-speed action test case](./breather-proof/certificate/sub_field_speed_action_test_case.md), the gap-opening feasibility scanner diagnostic, the live fold-shear gap-opening witness, the finite fold-shear deformed candidate seed, the first fresh fold-shear sidecar packet, the fail-closed fresh binary64 preledger attempt, the proof-interval-v1, proof-interval-v2, proof-interval-v3, proof-interval-v4, proof-interval-v5, proof-interval-v6, proof-interval-v7, and proof-interval-v8 sidecars, the blocker-anatomy and fold-layer burden sidecars, the fresh-collocation solver-surface audit, the AAA corpus recommendation handoff, the regular-boundary user-facing recommendation, and [pass/fail ledger](./breather-proof/certificate/pass_fail_ledger.md) | [closed-form-collinear-breather-ansatz](../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md), [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md), and [master-equation-breather](../../../content/markdown/aaa/proof-programs/master-equation-breather.md) | The finite certificate reports one candidate cycle and mesh on the same certified domain, accepted null-coordinate causal ledger, authorized branch chart, monodromy diagnostic, returned-sample report, and topology ledger before theorem promotion. The rejected cosine packet does not promote the theorem; the accepted fixed-parameter fold constants remain historical diagnostics. The fresh sidecar packet under `fresh-same-packet-fold-shear-seed-v0` has now fail-closed at a binary64 outward-padded range-empty preledger attempt, with 128 empty rows accepted by that pass and 34 `split_required` rows anatomized by proof burden; proof-interval-v1 adds priority-only exact-rational evidence for 70 coarse range-empty rows, proof-interval-v2 adds priority-only exact-rational row-specific trigonometric evidence for 116 range-empty rows, proof-interval-v3 adds priority-only exact-rational derivative evidence for 8 regular monotone diagonal exclusions, proof-interval-v4 records priority-only exact-rational simple-root evidence for 6 fresh subrows, proof-interval-v5 records priority-only parent-complement range evidence for 10 receiver-side strips with 0 strict-empty complement acceptances, proof-interval-v6 records priority-only ownership/coverage evidence showing 0 endpoint/topology-owned strips, 0 exact fold-family-covered strips, 0 regular-boundary-covered strips, and 0 consumed simple-root parent rows, proof-interval-v7 records priority-only same-packet ownership-data construction with 10 finite candidate regular-boundary cores, and proof-interval-v8 records priority-only regular-boundary finite-family construction with 4 finite candidate families, 20 candidate membership edges, 0 certified separator assignments, 0 inclusion proofs, 0 fresh domination inequalities, and 0 consumed parent rows. No branch chart is authorized. The high-level pre-ledger falsification-gate principle, the fresh-candidate gap-opening criterion, and the action-generated sub-field analytic baseline have been promoted; the live fold-shear witness, finite deformed seed, sidecar packet, fail-closed preledger attempts, proof-interval partial evidence, and row-anatomy sidecars remain priority-only until carried through a full fresh-candidate structural Jacobian and proof-grade interval preledger. Detailed rejected-packet inventory remains priority-only. A named regular-boundary theorem remains deferred until same-packet inclusion and domination fields exist. |
| `planar_bridge` | [planar-bridge-closure](./planar-bridge-closure/planar-bridge-closure.md) and [planar seed packet](./planar-bridge-closure/planar_seed_packet.md) | [planar-bridge-closure](../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md) | The planar bridge is promoted only after the collinear certificate passes, or after a specific collinear obstruction justifies the planar extension. |
| `proof_program_handoff` | This file | [master-equation-closure](../master-equation-closure/master-equation-closure.md), [swarm](../swarm/swarm.md), and [dyadic-lock](../dyadic-lock/dyadic-lock.md) | Downstream priority links and AAA theorem-program chapters are updated whenever a proof target is promoted, blocked, or retired. |

## Related AAA Proof-Program Notes

- [closed-form-collinear-breather-ansatz](../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md)
- [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md)
- [master-equation-breather](../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
- [planar-bridge-closure](../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md)

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [swarm](../swarm/swarm.md)
- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
