# CRW-005 — Retuning-Map Toy Model review — 2026-09-13

## Scope and disposition

[Retuning-Map Toy Model](../../../../content/markdown/aaa/validation/simulations/retuning-map-toy-model.md) received a full bounded review and safe repairs for RT-01–RT-09: five High and four Medium findings. High identifies a mathematical or evidentiary defect that can change an inference; Medium identifies a consequential domain, definition, or interpretation omission. These dispositions close the document review, not a physical retuning map, retained braid, action recovery, transport derivation, or EOM solver acceptance.

Only the chapter and this receipt were written. No agents, shared-record edits, generated writes, or repository-changing Git operations were used. The coordinator owns board integration; rank 1 was the assignment-time queue position, not a permanent identifier.

## Baseline and dependencies

Measured: scoped `git --no-optional-locks status --short` returned no chapter path before edits; `git rev-parse HEAD` returned `06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95`. `shasum -a 256` and a Node assertion over the `git show` baseline established the original SHA-256:

    b9230e45fdeda831bb25c2cf7fe898ab4f255722d4efa790726f01130df3de42

Final chapter SHA-256 from `shasum -a 256`, after the final wake-speed wording correction:

    43023bd002042e81cc9f05f6087308b0b7b398aa709be01fc07d3ffdbd4df41b

Different bytes invalidate this byte-specific handoff until the difference is reviewed.

Before edits, `rg -l -F 'retuning-map-toy-model.md' content scripts tests reference` found authored simulation and condensed-matter references, priority consumers, scene/textbook graph and Markdown indexes, generated reading copies, equation registry, and generated reference/source indexes. Those consumers remained read-only. The search does not establish absence of every possible binder or implementation. The chapter makes no executable implementation claim and this review does not certify an implementation.

The live review and integrator procedures and applicable canon were used. Nearby mathematical owners inspected were the [cadence-scale retuning hypothesis](../../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#cadence-scale-retuning-hypothesis) and the repaired [Action-Increment Protocol](../../../../content/markdown/aaa/validation/simulations/coincident-midpoint-orthogonal-axis-action-increment-protocol.md). The latter requires retained endpoint dynamics before stability interpretation and forbids seeding the action-recovery calculation with the Planck benchmark. This toy model now distinguishes its stipulated action input from that recovery program.

## Findings

Baseline references use the original hash. All findings below are resolved within the chapter. No neighboring scientific obligation is promoted by the repairs.

| ID | Severity | Baseline lines | Repair, grade, and falsifier |
| --- | --- | --- | --- |
| RT-01 | Medium | 3–11 | Distinguished a stipulated total cycle-plus-wake transaction from a derived cycle action or recovered Planck unit; added braid, cadence, and chart definitions and the retained-reference condition. Inferred scope correction against the action protocol. Falsifier: treating a result seeded with the benchmark as independent action recovery. |
| RT-02 | Medium | 15–27, 115 | Defined every logarithm as a positive dimensionless ratio to a fixed reference; separated cadence magnitudes from orientation and positive envelope scale from a zero-valued flattening coordinate. Added missing layer cadences to the input record. Derived domain correction. Falsifier: a logarithm evaluated at a dimensional, zero, or negative argument under the stated chart. |
| RT-03 | High | 29–56, 119 | Defined the combined scaled constraint matrix, target vector, action units, independent wake row, rank/feasibility test, and infeasible outcome. Derived linear algebra. Falsifier: an inconsistent augmented rank being reported as an exact solution. |
| RT-04 | High | 29–56 | Positive semidefiniteness alone did not define one increment. Added the restricted-kernel uniqueness condition, optimality equations, nonunique family handling, and distinction between primal and multiplier uniqueness. Derived quadratic minimization. Falsifier: a nonzero null-cost feasible direction with an allegedly unique unconventioned minimum. |
| RT-05 | High | 42–56, 128–134 | Distinguished finite log reconstruction from linearized action/branch constraints; added Taylor remainder control, a local step domain, nonlinear reevaluation, and pathwise causal-root continuation. Derived Taylor theorem and scope correction. Falsifier: a linear pass whose admitted finite step violates the declared nonlinear error bound. |
| RT-06 | Medium | 56–78 | Stated the circular characteristic-speed ansatz and exact exponential reconstruction, baseline speed-domain requirement, fixed tolerance, and non-taxonomic index roles. Derived logarithmic product identity conditional on that ansatz. Falsifier: applying it to arbitrary noncircular instantaneous speeds without the missing geometry factor. |
| RT-07 | Medium | 80–94, 116, 130 | Defined a fixed-weight geometric-mean cadence extraction and exact finite cadence increment; explained changing weights and the drift from symmetric finite log steps. Derived exponential algebra. Falsifier: identifying a log increment with a dimensional cadence change or assuming opposite log steps have opposite finite increments. |
| RT-08 | High | 96–107, 120–122, 128 | Replaced the rate-free remainder by the second jump-moment current, defined distribution/rate/moment roles, derived the signs from the weak jump equation, and stated smoothness, boundary, and effective-statistical assumptions. Derived transport expansion conditional on a jump model. Falsifier: failure on the independently evaluated polynomial jump generator or a missing derivative of cadence-dependent rates/jumps. |
| RT-09 | High | 124, 134 | A return map alone was claimed to determine a full positive cost matrix. Required an additional response or variational construction on the retained dynamics; a matrix selected for numerical convenience is not physical energy or response evidence. Inferred nonuniqueness of the proposed inference. Falsifier: a specified unique construction with its metric, normalization, and dynamical justification. |

## Independent mathematical references

The editor's full-document review is self-review. The references below are separate analytic arguments; no agreement between agents is used as evidence.

### Equality-constrained semidefinite quadratic

For a feasible point x0, write every feasible point as x0 plus Nz, where the columns of N span the constraint kernel. The quadratic on this space has Hessian H equal to transpose(N) K N. Positive semidefiniteness implies any vector in the kernel of H also satisfies K N z equal to zero; the linear term is therefore orthogonal to that kernel. A minimum exists. It is unique exactly when no nonzero feasible direction lies in the kernel of K. This proves the chapter's condition. Alternatively, the problem is least squares for the square root of K on an affine finite-dimensional image, which is closed.

Counterexamples distinguish the cases. With zero K and the single constraint x1 equal to one, all values of x2 minimize. With positive identity K and conflicting constraints x1 equal to zero and x1 equal to one, the problem is infeasible. With K equal to diag(1,2) and x1 plus x2 equal to one, differentiating the reduced scalar quadratic gives the unique point (2/3,1/3), cost 1/3. Duplicating a consistent constraint preserves that primal point but makes its two multipliers nonunique. These two-coordinate examples embed into the eight-coordinate model by fixing the remaining coordinates.

### Finite reconstruction and linearization

The definition of a log difference gives new z divided by old z equal to the exponential of that difference; this is exact with fixed reference units. Taylor's theorem supplies the second-order Hessian bound for the action, which need not vanish when its linearized row is satisfied. For example, an action proportional to y1 plus y1 squared at zero has linear increment y1 but nonzero quadratic error at every nonzero step. Thus a stipulated one-unit action input does not imply a small local displacement.

For positive reference cadence, opposite log steps d and minus d have summed finite cadence change equal to twice the reference cadence times cosh(d) minus one. This is positive for nonzero d. The first moment cannot be inferred from action signs alone.

### Jump-current derivation and dimensions

The independent reference is the weak jump generator stated in the chapter: evaluate the change of an arbitrary smooth test function after each allowed cadence jump and multiply by that jump's departure rate. Taylor expansion gives first, second, and third jump moments. Integrating by parts once, twice, and three times gives the alternating derivative signs in the density equation. Moving one derivative into the current gives drift minus one-half the derivative of density times second moment, plus one-sixth the second derivative of density times third moment.

The original remainder omitted the inverse-time dimension carried by transaction rates. Even allowing an implicit rate scale would not account for derivatives of variable rates or jumps. For constant density with symmetric fixed cadence jumps and a cadence-dependent common rate, the derivative of the second moment can be nonzero while the derivative of density is zero. The repaired expression retains that term.

The polynomial test function equal to cadence squared has an exact finite-jump change equal to twice cadence times the first moment plus the second moment; no higher Taylor terms exist. This is an independent sign/factor check on the proposed second-order expansion. It establishes the effective jump arithmetic only, not Markov closure of delayed substrate histories.

## Validation receipts

All numerical controls use normalized wake speed equal to one. They are analytic test examples, not a numerical evaluation of a physical retuning scenario.

- Known-case-first Node text audit: two expected TeX blocks and one real link extracted; fenced invalid TeX and a fenced missing link excluded; malformed TeX and unpaired dollar delimiter rejected; a changed display detected. These controls passed before reading the chapter target. KaTeX used `throwOnError: true` and `strict: 'error'`; Marked supplied link tokens.
- Target audit: exit 0; 74 TeX expressions, seven display equations, nine link occurrences, all local destination paths resolved, strict KaTeX passed, and trailing-whitespace/single-final-newline checks passed. All original headings, links, and equation identities remain. Six display bodies are byte-identical. The only changed display is `corpus-equation-f914069606810168`, the cadence current; the drift term is retained and the deficient remainder replaced by the derived moment expression.
- Separate arithmetic comparison instrument: first confirmed equality and rejection of a known unequal pair, then checked the closed-form quadratic minimum above, the exact quadratic jump-generator identity, and positive summed finite increment for opposite log steps. Exit 0. For reference cadence two, rates three and five, and jumps plus/minus 0.1, the exact generator returned approximately -0.72, matching twice cadence times first moment plus second moment. This does not test a production optimizer or EOM solver.
- `git --no-optional-locks diff --check -- content/markdown/aaa/validation/simulations/retuning-map-toy-model.md`: exit 0.
- `node scripts/check-braid-taxonomy-terminology.mjs`: exit 0; 359 migrated-scope files, no terminology stragglers.
- Pre-receipt `node scripts/validate-content.mjs --check --strict`: exit 0; 391 scenes, 199 content Markdown files, 1744 repository Markdown files; zero errors, zero warnings, 30 notes.
- Post-receipt and final chapter wording `node scripts/validate-content.mjs --check --strict`: exit 0; 391 scenes, 199 content Markdown files, 1745 repository Markdown files; zero errors, zero warnings, 30 notes. Final scoped diff check passed; scoped status reported the chapter modified and the receipt untracked. No index mutation was performed by this worker.
- Final two-file Node audit: exit 0 after known extractor controls; 74 chapter TeX expressions passed strict KaTeX, nine chapter and three receipt local links resolved, and both files passed direct whitespace/newline checks. The receipt has no TeX. This explicitly covers the untracked receipt, which ordinary tracked diff checks omit.
- `node scripts/build-equation-mapping-corpus.mjs --check`: exit 1; 199 Markdown files, 4685 displays, 23 promoted equations, 30478 symbol definitions; stale `content/generated/equation-mapping/corpus-equations.json` reported. This is shared-tree generated drift; no exclusive causal attribution is asserted and no generated file was edited.

The exact deferred regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`, only under separate regeneration or publication authority. Syntax/path checks do not verify browser layout or generated viewer freshness. No external source attribution or observed numerical claim was added; the repaired results follow from the local definitions and separate analytic references above.

## Open obligations

- RT-O1: Establish a retained reference history, action functional and independent action scale, admissible finite continuation, root-topology preservation, and nonlinear error bounds. Owners: the linked branch chapter and Action-Increment Protocol.
- RT-O2: Derive a physical response/cost construction and cadence weights from the same retained object; report constraint rank and nonuniqueness rather than choosing an unexplained optimizer convention. Owner: the retuning-map program.
- RT-O3: Derive transaction rates and the statistical reduction from delayed histories, then control jump expansion, cadence boundaries, source/sink terms, and inter-branch exchange. The drift formula alone is not a cosmological transport prediction.

The coordinator may integrate RT-01–RT-09 as bounded review dispositions while retaining RT-O1–RT-O3. This worker stops after this chapter and receipt.
