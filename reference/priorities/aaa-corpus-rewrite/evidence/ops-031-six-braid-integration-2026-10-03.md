# OPS-031 braid integration, October 3, 2026

✓ Implemented — approved groups 3 and 4 of the [six-group proposal](../analysis/ops-031-six-group-proposal-2026-10-03.md), with the [braid before/after packet](../analysis/ops-031-braid-before-after-2026-10-03.md) as the detailed input. The operator's “do 1” authorized the fixed-identity coordinate choice and propagation of accepted results. Separate closure review remains with the coordinator. This receipt records integration and editorial self-review, not a rerun of the historical scientific certificates.

## Scope and disposition

All supplied braid subitems were accepted after comparison with the live BP-011 subordinate queue and supporting packets. Only [Braid Taxonomy](../../../../content/markdown/aaa/noether-braid/braid-taxonomy.md), [Planar Braid Assemblies](../../../../content/markdown/aaa/noether-braid/2d-braid-assemblies.md), and [Spatial Braid Assemblies](../../../../content/markdown/aaa/noether-braid/3d-braid-assemblies.md) were edited.

- Exact affine dimension: require dimension two, not mere containment in a plane; rank-zero/rank-one components receive no assignment, and the case expression consistently compares numeric dimensions.
- Coordinate chart: persistent members carry arbitrary axial heights, including equal heights; a separate permutation orders heights only for spacing. Component/circulation membership does not follow sorted position. Coaxial endpoints explicitly map to their component circulation subsets. Dependent spacing and train-length equations travel with the change.
- Planar propagation: finite T200 plus uniform tail completeness, the three local phase/radius isolation boxes, T04 short-time history flow and the finite axial-speed exclusion appear at their actual accepted scope. Introduction, status table, mode discussion and conclusion agree with the mathematical passages. The spatial summaries point to the corresponding planar treatment.
- Consequential repair beyond the quoted substitutions: the planar chapter no longer claims equal axial heights exclude the general twelve-member chart. It retains the actual missing pairing/membership condition and the positive component-center separation condition for the two-planar-component specialization.

Historical binary64 tables, arbitrary-precision estimates, fixed-speed certificate values, release-prefix measurements, exact Borg identity links and source configurations were retained. No scientific instrument, oracle, source payload, generated file or shared control record was edited by this worker.

## Sources and independent grounds

The [live planar queue](../../master-equation-closure/braid-program/campaigns/planar-three-binary-work-queue.md) records the accepted boundaries. Direct reads checked the [T200 finite certificate](../../master-equation-closure/braid-program/evidence/2026-09-01-planar-three-binary-t200-finite-ladder-certificate.md), [global-tail proof](../../master-equation-closure/braid-program/evidence/2026-09-02-planar-three-binary-global-tail-calculus-reduction.md), [axial-speed certificate](../../master-equation-closure/braid-program/evidence/2026-09-01-planar-three-binary-axial-translation-speed-chart.md), [phase box](../../master-equation-closure/braid-program/evidence/2026-09-01-planar-three-binary-phase-box-certificate.md), [radius box](../../master-equation-closure/braid-program/evidence/2026-09-02-planar-three-binary-unequal-radius-box-certificate.md), [coupled box](../../master-equation-closure/braid-program/evidence/2026-09-02-planar-three-binary-coupled-box-certificate.md), and [local history-flow theorem](../../master-equation-closure/braid-program/evidence/2026-09-01-planar-three-binary-local-history-flow-well-posedness.md). The existing independently authored interval instruments, exact reductions and theorem proofs remain the evidence; editorial agreement is not an additional certificate.

The coordinate correction has elementary independent witnesses. A point or line lies in a plane while having affine dimension below two. Setting all component half-separations to zero produces six equal axial heights without making the six transverse positions coincide. Sorting arbitrary heights only permutes their presentation; the telescoping sum of consecutive sorted differences is the maximum minus minimum regardless of ties. None of those operations changes an endpoint's declared identity. Interleaved components therefore remain well-defined without deriving membership from height.

## Preservation and validation

Before edits, snapshots were copied to `.tmp/ops-031-six-repairs/braid/`; `shasum -a 256` recorded the following source versions:

| File | Before SHA-256 | After SHA-256 |
| --- | --- | --- |
| `braid-taxonomy.md` | `b8f2f307cc00d31a5dfbf5c6081fb6debf7a15605dc34af7e4c9b058e51a5c64` | `372e07493e4ee72f6143eec120de68816d72553465704d77457e8f23b8264a5e` |
| `2d-braid-assemblies.md` | `7952215c05a3c6329dd8a2a56b0dbd93aa38a9720b188c700855e42f6c75497e` | `9d9db0a59ad38697734f558d9d854dd4fb00a3c56eb21899846561d6d806550c` |
| `3d-braid-assemblies.md` | `6cf2c4e8f51c257d9eddbcbf71162b2aa2f725be41c0ab46faf7080fa1a5d202` | `5489ebce2923e4514424a0c7c1c01262090b0a509d87ce6434571529b569d459` |

Before edits, basename `rg -l` over `scripts`, `tests`, `src`, `content`, and `reference` saved the binding inventory in `.tmp/ops-031-six-repairs/braid/bindings.txt`. Consumers include taxonomy checks, Borg source/link records, scene/Markdown indexes, equation-viewer anchors, coverage inventories and historical review receipts. Historical receipt hashes are preserved as source-version evidence. Generated index/equation products remain deferred to the existing authorized regeneration process; no generation was requested here.

The full chapter editorial pass retained unrelated lattice and Borg exposition and checked the altered claims against their surrounding definitions, tables, equations and conclusions. A coordinator caught an opening display delimiter reduced to a single dollar during substitution; it was corrected before the final checks. An unescaped absolute-value bar in a new table cell was changed to `\lvert`/`\rvert` before closure.

- ✓ `node scripts/check-braid-taxonomy-terminology.mjs --scope corpus`: passed over 199 files with no terminology stragglers.
- ✓ `node scripts/check-reader-facing-publication-boundary.mjs`: passed over 199 Markdown files.
- ✓ `git diff --check -- content/markdown/aaa/noether-braid/{braid-taxonomy,2d-braid-assemblies,3d-braid-assemblies}.md`: passed after delimiter/whitespace correction.
- ✓ Focused `rg` over both chapters: no remaining strict-height-order requirement, single-dollar display line, or unqualified claim that above-20 completeness remains open.

No long-running scientific certificate was rerun. The update would need revision if any propagated proof is withdrawn, its declared chart differs from the corpus statement, an independently verified extra balance is found inside its certified domain, or the fixed-identity geometry fails the endpoint mapping. Full-cycle EOM reproduction, perturbation stability, wider phase/radius domains and translated higher-topology branches remain open at their existing owners. CRW-005 is not reopened.

## Independent-review clarification

The separate reviewer identified one missing coordinate declaration: unequal-radius boxes require a reference-radius speed rather than the earlier common-radius speed. The local-isolation paragraph now explicitly defines $\beta_f=|\Omega|R_1/c_f$ for the common angular rate, using the first binary radius, in agreement with the accepted unequal-radius and coupled certificates. The post-edit hash above includes this clarification. Scoped `git diff --check` passed after the change.

Coordinator closure: separate verification is complete at the final hashes and limitations in the [six-group closure receipt](ops-031-six-group-closure-2026-10-03.md). This addendum supersedes any pending-review wording above.
