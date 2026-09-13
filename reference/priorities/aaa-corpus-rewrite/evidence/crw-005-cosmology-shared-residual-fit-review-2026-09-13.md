# CRW-005 Cosmology Shared Residual Fit Review — 2026-09-13

## Scope and disposition

Completed bounded full-document repair of [Cosmology Shared Residual Fit Protocol](../../../../content/markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md). Only this chapter and receipt were written. No runtime, mock, neighboring owner, shared record, generated artifact or Git/index write occurred. Editorial closure is supported; statistical and runtime acceptance obligations remain open.

Baseline was clean by `git --no-optional-locks status --short -- <chapter>`. Baseline SHA-256: `bac2280cf80da8a5c52e1708b2eaac8c357782b78844f8fa1f81a4160b88615b`. Final chapter SHA-256: `88ef78498ce0053704df6d535a0e3f3337d106803a82b121976bbc1f2d527c6c`.

Inspected runtime `scripts/cosmology/shared-residual-fit.mjs` SHA-256: `eddc1fa712c6f8902054f84831600aadb045f61e991b9ddfd911f943f49072a2`; mock `scripts/cosmology/shared-residual-mock.json`: `125e5d70c16b5639f6817185d6f13110586e143a113fce757cb2c05217e89629`.

## Authority and independent reference

Applied the live review/integrator owner under AGENTS and startup router, with previously read authoring/math/theory canon. Read the full chapter, executable and mock; [Dark Energy](../../../../content/markdown/aaa/cosmology/dark-energy.md), lines 185–315, owns the full joint covariance and mapped common-coordinate comparison. Existing cluster/PPN scope from the reviewed PPN and Static Response owners remains effective and conditional. No new speculative target family or empirical result was added.

Verified the primary authored statistical review [G. Cowan, PDG Statistics (2024)](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-statistics.pdf), equations 40.20–40.22, pages 6–7, lines 409–434, and section 40.3.3.1, page 18, lines 1054–1097. These support covariance-weighted least squares, Gaussian/linear qualifications and degrees-of-freedom interpretation. The independent counterexamples below establish why covariance alone and named parameters are insufficient. The thermal-SZ redistribution boundary is additionally supported by the primary calculation [Dolgov et al., Spectral distortion of cosmic background radiation by scattering on hot electrons (2000)](https://arxiv.org/abs/astro-ph/0010412), whose abstract explicitly calculates the distorted spectrum for arbitrary optical depth and electron temperature; this supports spectral treatment rather than a universal scalar line shift. No survey data were downloaded or observational likelihoods recomputed; release tables remain conditional packet requirements.

`rg -n 'shared-residual-fit' content/markdown/aaa scripts tests --glob '!*.json'` found the simulation index, Dark Energy, Hubble/S8 and Known Tensions references plus runtime entrypoints in that scope. It is not an exhaustive repository binder search. Full-document review covered residual definitions, each empirical/template display, packet schema, pre-BBN branch, directional preprocessing, gates and acceptance language.

## Findings and repairs

| ID | Severity | Evidence and disposition |
| --- | --- | --- |
| CO-01 | High | Additive family score omitted cross-family covariance. Kept the valid display as a block-diagonal specialization and specified the full joint quadratic required by Dark Energy. For residual (1,1) and covariance with diagonal one and off-diagonal 0.5, the joint score is 4/3 while block score is 2. |
| CO-02 | High | Raw, standardized and whitened vectors could be weighted twice. Declared covariance in exactly the residual coordinates: raw covariance, standardized correlation or whitened identity; separate whitening does not remove cross-block correlations. For raw difference 2 and variance 4 the correct score is one; whitening gives one, and dividing again by 4 incorrectly gives 1/4. |
| CO-03 | High | Covariance and parameter count did not establish a chi-square law. Added Gaussian/model qualifications, identifiable joint fitted rank, nuisance/penalty limits and sampling calibration. A symmetric residual taking values plus/minus one has covariance one but a constant quadratic, not a chi-square distribution. Two redundant model parameters with the same design column consume rank one, not two degrees. |
| CO-04 | High | Equal projection names/numbers were treated as proof of a common state. Required common physical-coordinate maps, calibration and epochs, nonnegative weights and independent provenance; reported the runtime never reads theta_sea. Compatible projected numbers leave unreported directions unconstrained. |
| CO-05 | Medium | Log of dimensional fitted acoustic ruler was undefined. Repaired only display bef1a332fe8468b8 to divide by a positive fixed reference length. A common reference shift cancels from the weighted dispersion; positivity and covariance domain are now explicit. |
| CO-06 | High | Template and derived observational coordinates could be counted as independent data. Added estimator/covariance requirements, correlated parent-summary limits, optional status for unmeasured dark-sector quantities, frequency-resolved thermal SZ treatment, and non-Gaussian norm/upper-limit treatment for pre-BBN rows. |
| CO-07 | High | Cluster gamma=1 and velocity/sound-speed ratio were overgeneralized. Restricted gamma to a justified GR-matching metric/scale comparison and named lensing/hydrostatic uncertainties; speed ratio labels a template regime without determining merger dissipation. Existing display values remain conditional comparison targets. |
| CO-08 | High | CMB dipole was compared with itself as apparent validation. Classified this as conditioning with identically zero residual; other frame rows require propagated common-reference covariance or conditional likelihood. Explained zero-vector angle limitations and matching units/bases. |
| CO-09 | High | Runtime mathematical domain is unenforced. Documented full-matrix SPD/symmetry gap, negative projection weights, empty families/residuals, missing infinite thresholds, diagonal precedence, unauthenticated inputs, frame coverage and exit-zero behavior. Direct probes below confirm material gaps. |
| CO-10 | Medium | Pass/fail interpretation claimed physical coherence and state splitting from scalar scores. Replaced with exact coordinate-agreement and residual-tolerance interpretations, with provenance review and stronger empirical implementation required. Added entry definitions and retained original headings/targets. |

Eight High and two Medium findings; all ten editorial dispositions supported.

## Independent analytic and runtime checks

The covariance examples are closed-form inversions, not outputs of the runtime solver: the correlated 2-by-2 matrix sends (1,1) to 1.5 times (1,1), so its inverse sends that vector to two-thirds times itself, giving 4/3. The one-dimensional negative matrix has inverse -1, proving that an accepted negative score is invalid as a covariance norm. The equal-probability two-point distribution has mean zero, variance one and square identically one, independently checked with exact finite sums. No helper or reference implementation was edited to match the subject.

Default replay through `--input /dev/stdin` passed with observable residual 0.8701, raw projection penalty 0.0009869999999999933, shared residual 0.8740479999999999 and frame shared residual 0.006229741496598642. This established known mock behavior before boundary probes. Deleting theta_sea still passed; an empty required-family/observable packet passed with zero score; a one-family residual [1] and covariance [[-1]] passed with score -1. All packets were supplied in memory without files.

The parent independently established the default pass before its own probes: removing theta_sea preserved all totals; replacing the SN residual by [10] with full covariance [[-1]] produced total -99.3847 and shared score -99.380752 while passing; negative projection weights produced a negative raw penalty while passing; an empty packet passed. These parent observations supplement this worker’s direct probes and the exact analytic references. Negative matrices and weights violate the chapter’s declared mathematical domain; documenting current runtime acceptance is not endorsement.

## Validation and preservation

A known-case-first extractor passed two-span and fenced-false-positive math controls, a one-link control and an invalid-KaTeX rejection before reading the chapter. Strict KaTeX rendered all 142 TeX spans. All 27 display identities remain; 26 display bodies are unchanged and one fixes ruler-log normalization. All 33 link occurrences and all headings match baseline exactly; every local file target exists. Browser rendering and fragment semantics were not independently tested.

- `git diff --check HEAD -- <chapter>` passed.
- `node scripts/validate-content.mjs --check --strict` passed with 0 errors and warnings: 199 corpus Markdown and 1748 repository Markdown at the run before this receipt.
- `node scripts/check-braid-taxonomy-terminology.mjs` passed across 359 files.
- `node scripts/build-equation-mapping-corpus.mjs --check` reports stale `content/generated/equation-mapping/corpus-equations.json`: 199 Markdown, 4685 displays, 23 promoted equations, 30478 symbol definitions. No generation occurred. Deferred command: `node scripts/build-equation-mapping-corpus.mjs --write`, reserved for regeneration/publication authority. Shared drift is not attributed exclusively to this chapter.

## Remaining obligations

- CO-O1 — Runtime owner: enforce SPD covariance, nonnegative weights, nonempty required data, finite declared thresholds and meaningful frame-angle coverage; authenticate or compute projections from a supplied state; extend joint covariance support and distinguish input score checks from fits/statistical significance. Existing runtime and mock remain unchanged.
- CO-O2 — Joint-fit owner: supply release-specific raw/standardized/whitened conventions, full covariance or defensible conditional likelihood, identifiable fitted rank, nuisance treatment and empirical sampling calibration. Common CMB references and derived summaries require covariance propagation; parameter-dependent covariance requires full likelihood normalization.
- CO-O3 — Cosmology/PPN owners: derive one physical state/evolution map and common-coordinate projections, justify cluster/galaxy regime extension, and supply independently estimated data for claimed template residuals. Conditional or unavailable coordinates are not empirical closure. Propagate the runtime limitations to any neighboring summary that describes this scaffold as enforcing shared-state provenance.

No blocker remains to bounded editorial integration. Scoped checks and mock passes are not cosmological or whole-repository validation. Coordinator owns shared-record disposition.
