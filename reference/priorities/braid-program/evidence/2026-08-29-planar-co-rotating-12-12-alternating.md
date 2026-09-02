# Regular Alternating $12{:}12$ Circular Acceleration-Balance Extension

Date: 2026-08-29

Compatibility identifier: `aaa-corpus-advancement`

Machine receipt: [`2026-08-29-planar-co-rotating-12-12-alternating.receipt.v1.json`](2026-08-29-planar-co-rotating-12-12-alternating.receipt.v1.json)

Instrument: [`PlanarCoRotatingRingBalance.mjs`](../../../../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs) and [`PlanarCoRotatingRingSearch.mjs`](../../../../src/prescribed-path-analysis/PlanarCoRotatingRingSearch.mjs), driven by [`analyze-planar-co-rotating-12-12-alternating.mjs`](../../../../scripts/equation-mapping/analyze-planar-co-rotating-12-12-alternating.mjs)

## Decision

The regular alternating $12{:}12$ ring has a prescribed acceleration-balanced candidate under the default uncapped Master Equation with $c_f=1$. The bounded scan gives $\beta_f=1.290840841384326$ and compatible scale $R/R_*=13.982496760466805$. This is one exact 24-member regular polarity class, not a census of every balanced $12{:}12$ polarity word and not a nonuniform-phase search.

Plainly: the calculation found a circular acceleration balance for one precisely declared 24-architrino ring. It did not search the entire $12{:}12$ geometry space.

## Scope And Taxonomy

| $N$ | Members | Phase configuration | Polarity word | Symmetry class | Neutral antipodes | Taxonomy | Scan interval | Root-topology intervals | Verdict |
| ---: | ---: | --- | --- | --- | --- | --- | --- | ---: | --- |
| 12 | 24 | Regular 24-gon | `+-+-+-+-+-+-+-+-+-+-+-+-` | `n12-pmpmpmpmpmpmpmpmpmpmpmpm`; rotation, conjugation, and reflection-with-circulation-reversal reduced | No; every antipode has like polarity | $12{:}12$ circular-path assembly | $0.05\leq\beta_f\leq20$, base step $0.025$ plus adaptive refinement | 142 | Balanced candidate |

Plainly: planar common-center three-binary constraint contains exactly six architrinos arranged as three neutral antipodal binaries. This record has 24 architrinos, and its alternating word has like-polarity antipodes because $N$ is even. It therefore cannot be added to the planar common-center three-binary constraint inventory. It is also not C5 or C6: it has one common center, no positive component-center separation, and no decomposition into antipodal-neutral planar common-center three-binary constraint components.

The scan evaluated 804 declared speed points, explicitly included the neighborhoods below, at, and above $\beta_f=1$, included the binary seed $3.070356625390253$, bisected every sampled topology boundary, probed each topology interval near both boundaries and through its interior, and refined tangential sign changes and local residual minima. Rotational covariance makes one receiver sufficient for locating tangential zeros in this regular alternating class; the final balance decision and retained ledger evaluate every receiver and every directed receiver-transmitter pair.

Plainly: symmetry reduced the one-dimensional search cost, but it did not reduce the final all-member balance check.

## Numerical Result

| Candidate $\beta_f$ | $R/R_*$ | Directed roots | Max radial residual | Max tangential residual | Max axial residual | Max full residual | Tightened max full residual | Minimum Jacobian floor |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1.290840841384326 | 13.982496760466805 | 624 | $1.3500311979441904\times10^{-13}$ | $5.858187546170512\times10^{-10}$ | 0 | $5.858187577303801\times10^{-10}$ | $1.4986768330120922\times10^{-10}$ | 0.03504007742207915 |

Plainly: every one of the 24 receivers has one compatible physical scale, zero axial remainder, and radial and tangential residuals below the declared $2\times10^{-8}$ balance tolerance. Root-tolerance tightening preserves the 624-root topology and lowers the maximum full residual.

The complete ledger excludes 24 coincident self roots under the canonical convention and includes every valid nontrivial same-transmitter root. It records root identity, multiplicity, emission lag, separation, $D_t$, $D_r$, acceleration weight, inactive-root gaps, fold events, Jacobian floors, root-equation residuals, and direct-chord residuals. The best point has no unresolved fold event, maximum root-equation residual $1.7918999617450027\times10^{-13}$, and maximum direct-chord residual $1.389999226830696\times10^{-13}$.

Plainly: the positive verdict uses the complete causal history available to this prescribed circle, not only the most recent emission from each transmitter.

## Independent Verification And Claim Grade

The targeted test reads the machine record's best coordinate, independently recomputes its complete 624-root ledger at tightened root tolerance, and confirms the declared balance tolerance across all 24 receivers. The unchanged generic prescribed-history evaluator independently matches every cross-transmitter root count and receiver acceleration vector, while the unchanged circular-binary instrument independently matches every nontrivial same-transmitter root. Separate checks pass rotational covariance, reflection with circulation reversal, antipodal parity, and the live planar common-center three-binary constraint coordinate gate.

Plainly: this is independently checked, bounded measured evidence for prescribed acceleration balance in one regular alternating $12{:}12$ class. The configuration exclusion is derived from the live inventory contract.

Falsifier: a missing or displaced admissible causal root, a failed independent acceleration comparison, a topology change under refinement, an incompatible receiver scale, or a residual above the declared tolerance overturns the balance verdict. A future balanced point in another polarity or phase class extends this result; it does not overturn this exact candidate.

## Claim Boundary And Next Blocker

This result establishes prescribed acceleration balance only. It does not establish planar common-center three-binary constraint membership, two-component circular membership, complete $12{:}12$ polarity coverage, nonuniform-phase coverage, retention, binding, stability, release survival, physical identity, score increase, or scientific acceptance. No stability linearization was performed.

Plainly: the valid planar common-center three-binary constraint update is an inventory-boundary comparison showing why this balanced 24-member ring is not planar common-center three-binary constraint. The next $12{:}12$ landscape blocker is a separately scoped census of the remaining balanced polarity orbits and nonuniform fixed-phase geometries. The next physical blocker for this candidate is a predeclared ordinary EOM-solver evolution with complete retained prehistory and guarded root continuity.

Reproduce the ignored raw record by running `node scripts/equation-mapping/analyze-planar-co-rotating-12-12-alternating.mjs --out=.local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/2026-08-29-planar-co-rotating-12-12-alternating.v1.json`, then regenerate the tracked receipt with `node scripts/build-machine-artifact-receipts.mjs --target=ring12 --write`. Run the independent checks with `node --test tests/planar-co-rotating-ring-balance.test.js tests/circular-self-hit-binary-analysis.test.js`.
