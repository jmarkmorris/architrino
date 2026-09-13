# CRW-005 Hydrogen Spectral Row Toy Scan Review — 2026-09-13

## Scope and disposition

Completed one bounded full-document review and repair of [Hydrogen Spectral Coefficient Row Toy Scan](../../../../content/markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md). Only this chapter and receipt were written. No runtime, fixture, neighboring corpus, generated artifact, Git/index or shared campaign record was changed. Editorial closure is supported; physical coefficient identification and full certificate acceptance remain open.

Baseline was clean by `git --no-optional-locks status --short -- <chapter>`, and `git show HEAD:<chapter>` at `06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95` matched baseline SHA-256 `bfc0f54559c93c9213b8007c383725614615506c27b681764679196e4daa11a5`.

Final chapter SHA-256: `b601ad8b571f164ae45f6fcce3082b61694e41d7369f10dceb2eb7f5121a0bd3`.

Inspected source hashes:

- `scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs`: `dd64ce6f362a15390641e025cba6aa3c8afbdb801c45275ed9093d02665e981c`.
- `scripts/spacetime/hydrogen-gamma-n-spectral-row-mock.json`: `8ae06e689b88f1efb7247fc14911e0c7d6aebec30f23cd9271db7ec0912ba1c1`.

## Owners and coverage

Applied the live review skill/integrator and corpus-review owner under AGENTS, startup router and previously read theory/style/math/terminology canon. Read the entire chapter, named executable and mock. Compared [Proper Time](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) lines 858–950 (normalized feature record, conditional shape coefficient, reciprocal conversion and event-frequency residual); [Atomic Spectra](../../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md) lines 135–180, 208–238 and 307 (single clock conversion, units, independent corrections and conditional coefficient constraints); and the newly repaired [Static Response chapter](../../../../content/markdown/aaa/validation/simulations/static-response-vector-toy-model.md) (common-row rank, normalization and mock-evidence boundary).

`rg -n 'hydrogen-gamma-n-spectral-row' scripts tests content/markdown/aaa --glob '!*.json'` found the executable, simulation index and two linked theory owners in that scope. This is not an exhaustive binder inventory. Full-document self-review covered every display and the runtime, scaffold, correction, coefficient, pass/certificate, failure-test and diagnostic sections. Existing links, headings, labels and valid display mathematics were retained.

## Findings and dispositions

| ID | Severity | Evidence, repair and remaining boundary |
| --- | --- | --- |
| HY-01 | High | Same-source scaffold was described as stronger evidence. Since gap/frequency is exp(0.001) times the line factor divided by that same factor, every line returns the declared stretch by construction. Explicitly classified it as arithmetic and explained cancellation. Runtime copies values from JSON; it does not authenticate the static neighbor. |
| HY-02 | Medium | Frequency normalization and label meanings were implicit. Declared one frequency unit, cycles/time versus angular rate, positive downward principal labels distinct from density, resolution label distinct from orbital label, and observer-level Rydberg role. No primitive energy law is imported. |
| HY-03 | High | Unnormalized delay logarithm disagreed with the current Proper Time owner. Repaired display `715f91247a96ce2a` to use the positive delay/reference ratio and stated the nonunit reference. The runtime key remains a literal compatibility field; physical calibration is not checked by the parser. |
| HY-04 | High | Zero event residual and absent row remainder could be mistaken for general inference. Defined positive corrected-frequency denominator, fixed energy calibration, single reciprocal conversion and the zero-residual toy specialization. Source functions only compute log(gap/frequency); they do not subtract event or convergence budgets. |
| HY-05 | Medium | Shape coefficient was unconditional and inverse-row coverage incomplete. Restricted inherited shape coefficient to the homogeneous Lorentz remainder assumptions and supplied the shape inverse coefficient for the full five-feature domain. Runtime does not evaluate an inverse row. |
| HY-06 | High | One accepted finite candidate was not coefficient identification. Endpoint plus A/B feature rows have rank three for four unknowns, with exact nonzero null direction (16,-9,-45,190). Explained continuous consistency/rank, finite candidate limits, independent data, conditioning and why changing grid diameter is not extraction. |
| HY-07 | Medium | Control difference sign was conflated with the runtime refinement residual. Record B predicts 0.0009, hence prediction minus declared stretch is -0.0001; runtime A-minus-B is +0.0001. Both are now identified explicitly. |
| HY-08 | High | Displayed all-pairs refinement norm exceeds the runtime obligation. Preserved valid all-pairs displays and documented that the script checks only input-order pairs i<j with the left denominator, producing an order-dependent weaker statistic. One record supplies no refinement evidence; the runtime permits disabling refinement. Concrete reversal probe below confirms discrepancy. |
| HY-09 | High | Proposed certificate and correction-budget gates were presented as executable acceptance. Marked them proposed; described missing provenance, correction, error-budget and distinct-line/refinement enforcement. Independent correction separation is needed to make the remainder test substantive. Clarified spin-excluded orbital degeneracy and nuclear-moment scope without adding a physical derivation. |
| HY-10 | Medium | Failure diagnostics overstated their logical content. Per-line-spoof true can coexist with a shared passing row; mismatch tests only explicit numerical overrides; expected status failure does not identify cause. Documented zero-default features/coefficients, tolerance/floor limits and actual process exit behavior. |

All ten findings were repaired within the chapter; external-scope runtime and scientific requirements remain explicitly routed below. Six High and four Medium dispositions.

## Independent references and checks

Independent mathematical references are elementary exact algebra, not mock output: cancellation of common line factors, positivity of logarithm arguments, reciprocal rate conversion, and the linear-system kernel criterion. The dot instrument first returned 11 on (1,2) dot (3,4). A row-reduction instrument first passed identity and dependent-row known cases. The target then returned rank three and products 1, 0.001, 0.001 for the declared four-entry coefficient row.

A separate exact integer check used rows (5,40,-2,1), (5,20,2,1), (14,36,2,1), obtained by multiplying the endpoint, A and B rows by 20, 10000 and 20000. All dot products with (16,-9,-45,190) are exactly zero. The determinant instrument first returned one on the identity matrix, then 380 on the minor with rows (5,40,-2), (5,20,2), (7,18,1), where B is instead scaled by 10000. Thus the rank is at least three and the nonzero kernel proves it is below four. The parent independently confirmed the same exact minor and null products. No instrument or fixture was modified to manufacture this reference.

`node scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs` returned six scenarios: two pass, four intentional fail, all six expectations pass, process exit zero. The scaffold accepts only `density_scale_compensated_spectral_row` among its three candidates. The control A/B refinement difference is +0.00010000000000000005. This is replay evidence, not independent spectroscopy.

An in-memory packet supplied through `--input /dev/stdin` used a fixed endpoint-valid delay row, records predicting 0.001 and 0.002, matching constructed line ratios, and row tolerance 0.75. Order A/B failed, while reversing identical records passed. Analytically the compared normalized differences are approximately one and one-half; the displayed all-pairs criterion would reject both orderings. The first run failed packet expectations and exited one, matching the script contract. No input/output files were generated.

## Validation and preservation

A known-case-first Markdown instrument extracted exactly two TeX spans and one link from a fixture containing fenced false positives, rendered valid math, and rejected malformed delimiter and invalid KaTeX controls before reading the target. Target validation renders all 127 TeX spans with strict KaTeX. There are 33 displays: 32 unchanged display bodies and one normalized-delay repair. All 35 links, all heading strings and all viewer identities match baseline, and all local file targets exist. No separate browser/fragment semantic validation was performed.

- `git diff --check HEAD -- <chapter>` passed.
- `node scripts/validate-content.mjs --check --strict` passed with 0 errors and warnings; 199 corpus Markdown, 1746 repository Markdown files at the run before this receipt.
- `node scripts/check-braid-taxonomy-terminology.mjs` passed across 359 migrated-scope files.
- `node scripts/build-equation-mapping-corpus.mjs --check` exited one with stale `content/generated/equation-mapping/corpus-equations.json`: 199 Markdown, 4685 displays, 23 promoted equations, 30480 symbol definitions. No generated write occurred. Deferred command: `node scripts/build-equation-mapping-corpus.mjs --write`, only under regeneration/publication authority. Shared-tree drift is not attributed solely to this chapter.

Final short validation after the identifiability/exit clarifications rechecked two-file Markdown, strict chapter math, links, display preservation, whitespace and final hash. Scoped passes do not establish whole-repository health or physical closure.

## Remaining obligations

- HY-O1 — Runtime owner: reconcile ordered-pair refinement with the displayed all-pairs acceptance norm; enforce declared input floors/tolerances and meaningful line/refinement completeness; implement or explicitly separate provenance, inverse-row, event and spectral-correction budget checks. Add independent negative controls for the claimed missing gates. Propagate these limits to the neighboring Proper Time final packet summary, which still describes unimplemented residual-budget and general collapsed-variable rejection as packet failures. This assignment changes no runtime, fixture or neighbor.
- HY-O2 — Hydrogen/Proper Time owner: independently derive envelope gaps and the normalized common-cell response, resolve the rank deficiency with independent well-conditioned records, and assess held-out lines/refinements under fixed uncertainty and constitutive domains. Repeating manufactured line ratios supplies no new information.
- HY-O3 — Spectral comparison owner: supply independently bounded event-frequency, envelope convergence, recoil and correction records, with correlations and calibration kept outside fitted cadence. Only then assess the proposed certificate.

No blocker remains to bounded editorial integration. The coordinator owns shared-record disposition and follow-up routing.
