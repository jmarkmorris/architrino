# Proof Programs

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `28.87`
- Cost: `4.3`
- ROI: `6.71`
- Status: `active`

## Task Queue

1. `breather_certificate` — Generate the finite collinear-breather certificate packet and close the conditional Schauder theorem only after the audit passes. Status: `next`. Depends on: none.
2. `planar_bridge` — Develop the first planar delayed-bridge closure as the higher-dimensional extension of the breather proof architecture. Status: `queued`; do not promote ahead of the collinear certificate unless that certificate fails with an explicit obstruction that the planar bridge is meant to resolve. Depends on: `breather_certificate`.
3. `proof_program_handoff` — Keep theorem-program chapters, certificate artifacts, and downstream priority links aligned as proof targets are promoted or retired. Status: `active`. Depends on: `breather_certificate`, `planar_bridge`.

## Scope

This directory consolidates active proof-program priorities whose main deliverable is mathematical closure rather than general dynamics exposition. The shared pattern is: state a theorem target, isolate the finite or geometric certificate needed for that target, and keep promotion from conjectural architecture to proved result explicit.

This file is the parent control surface for proof programs. The nested structure is intentional here because proof programs can have local theorem targets, certificate artifacts, and promotion gates that are too specific for the parent queue.

## Nested Workstreams

- [breather-proof](./breather-proof/breather-proof.md): active finite-certificate program for the 1D collinear breather. The candidate packet, refined pre-ledger diagnostic, diagonal-exclusion subledger, kinematic fold-layer atlas, [fold impulse ceiling handoff](./breather-proof/certificate/fold_impulse_ceiling_handoff.md), and [pass/fail ledger](./breather-proof/certificate/pass_fail_ledger.md) now exist; the current executable blocker is still the finite fold impulse ceiling and six fold-adjacent parent-boundary leftovers required before any branch-chart certificate.
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
| `breather_certificate` | [breather-proof](./breather-proof/breather-proof.md), [seed chart packet](./breather-proof/certificate/seed_chart_packet.md), [fold impulse ceiling handoff](./breather-proof/certificate/fold_impulse_ceiling_handoff.md), and [pass/fail ledger](./breather-proof/certificate/pass_fail_ledger.md) | [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md) and [master-equation-breather](../../../content/markdown/aaa/proof-programs/master-equation-breather.md) | The finite certificate reports one candidate cycle and mesh on the same certified domain, null-coordinate causal ledger, authorized branch chart, monodromy diagnostic, returned-sample report, and topology ledger before theorem promotion. |
| `planar_bridge` | [planar-bridge-closure](./planar-bridge-closure/planar-bridge-closure.md) and [planar seed packet](./planar-bridge-closure/planar_seed_packet.md) | [planar-bridge-closure](../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md) | The planar bridge is promoted only after the collinear certificate passes, or after a specific collinear obstruction justifies the planar extension. |
| `proof_program_handoff` | This file | [master-equation-closure](../master-equation-closure/master-equation-closure.md), [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md), and [dyadic-lock](../dyadic-lock/dyadic-lock.md) | Downstream priority links and AAA theorem-program chapters are updated whenever a proof target is promoted, blocked, or retired. |

## Related AAA Proof-Program Notes

- [closed-form-collinear-breather-ansatz](../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md)
- [collinear-breather](../../../content/markdown/aaa/proof-programs/collinear-breather.md)
- [master-equation-breather](../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
- [planar-bridge-closure](../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md)

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md)
- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
