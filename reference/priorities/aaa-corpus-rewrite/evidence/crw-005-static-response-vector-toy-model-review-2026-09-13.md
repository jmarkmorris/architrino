# CRW-005 Static Response Vector Toy Model Review — 2026-09-13

## Scope and disposition

Bounded full-document review and safe repair of [Static Response Vector Toy Model](../../../../content/markdown/aaa/validation/simulations/static-response-vector-toy-model.md). Only this chapter and this receipt were written. No script, mock, generated artifact, index, Git publication, or shared campaign record was changed. Editorial disposition: complete with the scientific and runtime obligations below remaining open; arithmetic replay is not constitutive or observational acceptance.

Baseline was clean by `git --no-optional-locks status --short -- content/markdown/aaa/validation/simulations/static-response-vector-toy-model.md`. `git show HEAD:<chapter>` matched the baseline SHA-256 at HEAD `06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95`.

- Baseline SHA-256: `ea30db7746a2df690d37ebc18630e653ebf53a151050a78e4ec9ddd37899934d`.
- Final SHA-256: `fff1004483fdcb93a0401f65f34dca2442cb62942222502f852196bd4545e9ec`.
- Inspected script SHA-256: `e2b56bbf52c832ce8246ecf6ab3f5e909661d54778e9aa551c04b9bc2b2884f5`.
- Inspected mock SHA-256: `68c1e326975f47aec1cb913fc63d6798d5097a588b7e23ee401e0a5d15e85fc4`.

## Authority and coverage

Applied the live AGENTS, generated startup router, architrino-review skill owner, integrator-reviewer procedure and corpus-review requirements; retained the previously read theory, authoring, mathematics and terminology canon. Read the entire chapter, executable and mock input. Compared [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), especially lines 355–400 (positive normalized features), 490–540 (weak response and its scalar constraint), and the minimal response discussion beginning at 602; compared [PPN Parameters](../../../../content/markdown/aaa/spacetime/ppn-parameters.md), lines 7–23 (chart, units, asymptotic normalization) and 90–162 (first-order signal map and independent clock residual). These are the theory owners; linear algebra and ratio identities below provide separate analytic references for the repairs. No new external empirical claim is made.

A basename search with `rg -n 'static-response-vector' scripts tests content/markdown/aaa reference/priorities/aaa-corpus-rewrite --glob '!*.json'` found the runtime entry, simulation index, campaign board, earlier index review and conversion history in that scope. It is not an exhaustive repository binder inventory. Existing links, headings and equation-viewer identities were retained.

## Findings and repairs

| ID | Severity | Finding, independent evidence and disposition |
| --- | --- | --- |
| SR-01 | High | Replay Equations omitted the nonunit reference delay. At zero potential the unnormalized logarithm is log(c_f/c_0), generally nonzero. Repaired the first display to use the positive delay ratio and declared positive, dimensionless reference features. Accepted; matches Proper Time lines 355–370 and PPN lines 13–19. |
| SR-02 | Medium | Weak response equalities appeared exact and the four-vector lacked a domain. Added omitted second-order remainders, fixed PPN chart, positive potential convention, asymptotic calibration, isotropic branch and scalar-feature meaning. The four-feature domain explicitly holds the shape contribution zero at retained order; this is a specialization, not a deduction from isotropy. Taylor expansion about the reference supplies the separate mathematical justification; no spatial-vector or acceleration interpretation is licensed. |
| SR-03 | Medium | Endpoint dot products do not imply coefficient inversion. Their sum constrains only the response direction; a nonzero row orthogonal to that direction is an immediate counterexample. Explained the stronger four-dimensional reciprocal-response test without changing valid displays. |
| SR-04 | High | Signal coefficient unequal to two was conflated with clock/signal splitting and lensing inference. A shared clock/signal coefficient of 1.6 is a counterexample to that classification. Replaced it with the conditional GR-matching target, separately defined residual and explicit absence of orbital/ray/mass inference in the executable. PPN lines 134–162 preserve this distinction. |
| SR-05 | Medium | Minimal pure-delay row divides by zero at gamma = -1. Declared nonzero A_chi; a zero response vector cannot have dot product one with any finite row. |
| SR-06 | Medium | Pressure log increments and normalized coefficients lacked approximation and conditioning boundaries. Defined positive endpoint ratios, fixed linear row, nonlinear second-order remainder, nonzero normalization and near-zero conditioning. Dividing the pressure cadence equation by its nonzero target yields the normalized endpoint equation, so their agreement is not independent evidence. |
| SR-07 | High | Script passing flags could be read as complete acceptance. Documented omitted-row and speed-record skips, zero-default coefficients, explicit-response precedence, ignored anisotropic metadata, diagnostic-only sweeps, waived shared-delay requirement and successful process exit despite failing rows. Actual source functions at lines 118–165, 188–262 and 266–378 and executable probes below establish this contract. Runtime enforcement remains open. |
| SR-08 | Medium | Effective-speed identity and finite numeric inputs were underspecified. Explained the fixed-wake-speed log-ratio identity and required finite inputs/nonnegative tolerance, while noting that physical positivity, schema identity and nonnegative tolerance are not enforced by the script. The identity follows directly from the definition of delay, not from constitutive dynamics. |
| SR-09 | High | Final inference improperly promoted general pressure component variation into necessary nonzero static components. Preserved the strongest valid restricted inference: pure-pressure chi response 0.6 fixes b_chi = 5/3, so retaining static chi response 2 requires total non-chi static contribution -7/3. Gave an independently checked counterexample to the general claim: static (0,2,0,0), pressure (0,0.6,0.7,0), common row (0,0.5,1,0), both dot products one. |
| SR-10 | Medium | Separately chosen scenario rows did not establish a universal constitutive row. Added consistency of the response-row linear system and full column rank for uniqueness. Proof: solutions differ by its kernel; four-dimensional span removes that kernel. Mock coefficients remain admissibility witnesses, not derived response values. |

All ten dispositions are supported; no finding requires altering valid mock coefficients. Coordinator-requested entry definitions for PPN, the Noether sea and reciprocal cadence were added and the strict KaTeX check rerun. Full-document self-review covered the introductory grade, runtime command, each display, pressure definitions, input/output tables, five expected scenarios and concluding compensated-family claims.

## Independent checks and executable evidence

The in-memory dot-product instrument first returned the analytically known value 11 for (1,2) dot (3,4), and printed its known-case pass before target examples. It then checked the two common-row counterexample products equal one and the compensated example equals one. These are separately calculated arithmetic references, not values taken from the script output. Algebraically the pressure ratio is 0.003276 / 0.00546 = 0.6, its cadence product with 5/3 is 0.00546, and the equal/opposite speed-log observations sum to zero.

`node scripts/spacetime/static-response-vector-toy-model.mjs` replayed the default mock successfully with five scenarios: clean and compensated pass; split clock/signal and underclosed clock fail; pressure projection passes. The JSON counts are three pass and two fail; process exit is zero. The split residual is approximately -0.4, underclosed cadence/clock residuals approximately -0.1/+0.1, and pressure shared-delay residual -1.4 with that requirement waived. This replay measures current code behavior and deterministic fixture conformance only.

Two additional packets were supplied in memory through `--input /dev/stdin`, without writing inputs or outputs. A scenario with gamma 1 and response (0,2,0,0), but no cadence or clock row, returned status pass with null endpoint, clock and inverse residuals. Changing its chi response to 99 and setting `expect_shared_delay:false` still passed, with shared-delay residual 97. These are explicit witnesses against treating status pass as complete evidence. Source inspection confirms anisotropic residuals are copied at line 262 and excluded from the status conjunction at line 311; no anisotropic projection test was claimed.

## Preservation and validation

The Markdown/math instrument was tested first on a known two-math, one-link example with fenced false positives, and rejected an unclosed dollar delimiter and invalid KaTeX command before it read the real chapter. Its target run found 89 TeX spans and 21 displays, all rendering under KaTeX `throwOnError:true, strict:'error'`. Twenty display bodies are byte-identical; the sole changed display is the normalized delay formula with preserved viewer ID `de1046c46595692a`. All 23 link occurrences and all heading strings match baseline exactly; every local file target exists. Link-fragment semantics and browser rendering were not separately tested. Direct trailing-whitespace and delimiter checks passed.

- `git diff --check HEAD -- content/markdown/aaa/validation/simulations/static-response-vector-toy-model.md`: passed.
- `node scripts/validate-content.mjs --check --strict`: passed with 0 errors and 0 warnings; 199 corpus Markdown and 1745 repository Markdown files at that run, before this receipt was added.
- `node scripts/check-braid-taxonomy-terminology.mjs`: passed across 359 migrated-scope files.
- `node scripts/build-equation-mapping-corpus.mjs --check`: reports stale `content/generated/equation-mapping/corpus-equations.json` with 199 Markdown files, 4685 displays, 23 promoted equations and 30479 symbol definitions. No generator write was run. Deferred regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, reserved for explicit regeneration or publication authority. The shared-tree drift is not attributed exclusively to this chapter.

These scoped checks establish syntax, path preservation and arithmetic behavior; they do not establish scientific closure or full repository health.

## Remaining obligations

- SR-O1 — Runtime owner: define required record completeness and explicit skipped states, enforce the declared numeric/schema/tolerance contract, decide cross-record consistency, and gate any claimed anisotropic projection. Consumers must inspect JSON row statuses rather than process exit alone. Source/script changes are outside this chapter-only assignment.
- SR-O2 — Proper Time/constitutive owner: independently derive one coefficient row and response records on a justified common domain, with uncertainty and nonlinear remainder bounds; test rank/consistency and near-zero pressure normalization. A fitted mock row is not that derivation.
- SR-O3 — PPN/observer-map owner: recover the shared chart, matter, clock and signal calibration before promoting signal coefficients or lensing/dynamics equality. Scalar endpoint agreement and a reciprocal log identity do not provide that recovery.

No blocker remains to the bounded editorial handoff. The coordinator owns integration of these obligations and shared campaign records; no adjacent chapter was edited.
