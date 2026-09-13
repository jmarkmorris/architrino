# CRW-005 Thermodynamic Residual Review — 2026-09-13

## Scope and disposition

Completed bounded full-document review and repair of [Thermodynamic Residual](../../../../content/markdown/aaa/validation/simulations/thermodynamic-residual.md). Only the chapter and this receipt were written. No runtime, fixture, neighbor, shared campaign record, generated artifact or Git/index write occurred. Editorial disposition is complete; runtime acceptance and physical recovery remain open.

Baseline clean by `git --no-optional-locks status --short -- <chapter>`. Baseline SHA-256: `4e58561ef2d4fb9790f3c9b5336e038f51c573e0bff152340f3cf0c938b367e6`. Final SHA-256: `c0e8f503a896204f4d76b7f58836ffb0d7a22c1ab72f3d8e3b482e2a965bdfd5`.

Inspected runtime `scripts/gravity/thermodynamic-residual.mjs` SHA-256: `07b9f90b1ddbdfc3774922d2b7af09182b9cbb903d33aac5e4eda3624d58bcfc`. Mock `scripts/gravity/thermodynamic-residual-mock.json` SHA-256: `ba662e551be4b4d272fd16e9255e2611dfa2d2ff104c69d0d9f625555cb88b8a`.

## Authorities and independent references

Applied the live review/integrator procedure under AGENTS and the startup router, with previously read theory, mathematics and editorial canon. Read the full chapter, runtime and mock. [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md), lines 544–640, supplies alternative-history counting, normalized boost current, proper acceleration and non-Killing source boundaries; lines 662–730 specify variation and block-limit restrictions. [Entropy](../../../../content/markdown/aaa/dynamics/entropy.md), lines 17–19 and 118–146, distinguishes realized records, counting references and weighted conditional entropy. [Energy](../../../../content/markdown/aaa/dynamics/energy.md), lines 499–527, requires complete boundary/work accounting and a derived energy map.

The primary comparison source is [Jacobson, Thermodynamics of Spacetime (1995)](https://arxiv.org/html/gr-qc/9504004v2), browsed directly: lines 44–53 require consistent accelerated-observer/boost normalization; equations (1)–(2), lines 54–59, integrate over a null history; lines 68–79 require local equilibrium, null focusing, all-null-direction balance, stress conservation and Bianchi identity. These are effective recovery hypotheses, not substrate premises. The free-energy restriction follows independently from the first-law inequality and the product differential of E minus T times S, rather than from a numerical toy fit.

## Findings and repairs

| ID | Severity | Evidence and disposition |
| --- | --- | --- |
| TH-01 | High | Individual wake-event counts were labeled microcanonical entropy. Replaced the set definition with distinguishable alternative retained histories, declared uniform-measure requirement, and separated the realized crossing set for flux. Independent counterexample: N binary alternatives have 2^N configurations and log-count N log 2; N events in one history give log N, a different quantity and scaling. |
| TH-02 | Medium | Finite-block area estimates lacked their limit and dimensions. Added fixed intensive state/readout, scale separation, positive alignment area, nonzero area increment and entropy-per-area floor. A finite sample is not a recovered area law. |
| TH-03 | High | Spatial acceleration norm in an arbitrary chart omitted the time component. Repaired to the effective four-acceleration norm and specified proper time, signature, positive temperature and approximately stationary boost regime. In the instantaneous rest frame alone the time component vanishes. |
| TH-04 | High | Flux formula risked integrating time twice and left boost normalization implicit. Repaired to a single null-history three-surface integral and specified orientation, generator/temperature scaling, energy units and discrete projection weights. Primary reference: Jacobson equations (1)–(2). |
| TH-05 | High | Two-term energy residual could assert conservation for an arbitrary energy or non-Killing generator. Retained the valid conditional display and added the exact product-rule source: divergence of T times xi equals T contracted with the symmetric generator gradient when stress is symmetric and conserved. Other boundary fluxes/work and this source must vanish within budget or be included. |
| TH-06 | Medium | A shared epsilon and dimensionless O(tolerance) were used across dimensional quantities. Declared independent denominator-unit floors and replaced the Clausius remainder phrase by a dimensionally valid energy-denominator bound. Runtime’s one epsilon remains only a nondimensional scaffold. |
| TH-07 | High | No external work was treated as sufficient for free-energy decrease. Restricted the inequality to a closed fixed-temperature reservoir comparison with a defined work-on-system sign. The product differential includes minus S dT when temperature changes. Explicitly identified the displayed temperature with the fixed reservoir/reference temperature and required independent thermal admissibility and temperature consistency across observable pairs. Specified response-spectrum conventions and marked free-energy/fluctuation-dissipation checks unimplemented by runtime. |
| TH-08 | High | A few scalar/weak-field passes were promoted toward Einstein recovery. Preserved the finite diagnostic role and added the independent all-null-direction, equilibrium, area-universality, focusing and conservation proof requirements from Jacobson. |
| TH-09 | High | Claimed same-record/weak-field/control acceptance exceeded executable enforcement. Documented entropy mismatch aggregation omission, empty weak-field/control passes, unauthenticated record names, real-valued counts, override bypasses, unexecuted controls and exit-zero rejected packets. Concrete probe below demonstrates the aggregation gap. |
| TH-10 | Medium | Arbitrary label deletion was expected to force failure. Replaced with predeclared perturbations independently known to cross a threshold. Multiplying all counts by one common positive factor shifts entropy by a constant and leaves every entropy difference/slope unchanged. Negative controls must test a demonstrated violation. |

Seven High and three Medium findings; all ten editorial dispositions supported. No proof of a thermodynamic substrate or physical state measure is claimed.

## Known-case-first mathematical and runtime checks

The logarithm instrument first returned one for log(e), then confirmed log(8) = 3 log(2) and equality of log(61)-log(50) with log(122)-log(100). The underlying exact identity log(qN2)-log(qN1) = log(N2)-log(N1) proves invariance of entropy differences under common count scaling. This separate analytic reference explains the failure-control limitation rather than treating mock self-agreement as proof.

Default runtime replay through `--input /dev/stdin` returned null failure code with maximum area residual 0.012559688273849401, thermodynamic residual 5.583194518888943e-16 and conservation residual zero. Direct arithmetic gives temperature one from acceleration 2 pi, entropy change log(122/100), area slope log(128/100), and flux 0.19885085874516517. These inputs were constructed to agree and establish no independent physical mechanism.

After that known passing baseline, an in-memory probe changed `record_channels.entropy_labels` to `other`, emptied `weak_field_gates`, and removed negative controls. The runtime still returned null failure code while reporting an entropy-label record split with `thermo-label-coverage-open` inside observation diagnostics. This is a real acceptance gap, not a missing printed warning. Source inspection independently shows the entropy-label split is never included in the final gate conjunction; empty gate/control collections pass vacuously. No files were generated by the probes.

The parent independently replayed the baseline and separate boundary probes, including halving all initial/final and area counts to 50, 61 and 64. That packet still passed with the same residuals to floating-point accuracy; the exact scaling identity above is the independent mathematical explanation. Parent-provided results are identified separately from this worker’s combined mismatch/empty-collection probe.

## Validation and preservation

A known-case-first extractor returned two math spans despite fenced false positives, verified one Markdown link, and rejected an invalid KaTeX command before target evaluation. The chapter renders 100 TeX spans under strict KaTeX. All 14 equation-viewer identities remain; ten display bodies are unchanged, and four repairs are confined to set definition `636ca4071c2285ff`, proper-acceleration norm `8c4e5cebf5971cba`, null-history integral `0b06633a3e01e30c`, and discrete event-set sum `4010deace7face00`. All original links are preserved, with one primary-source link added, giving 17 link occurrences. All local targets exist. Browser and remote-fragment rendering were not tested.

- `git diff --check HEAD -- <chapter>` passed.
- `node scripts/validate-content.mjs --check --strict` passed with 0 errors and warnings: 199 corpus Markdown and 1747 repository Markdown at that run, before this receipt.
- `node scripts/check-braid-taxonomy-terminology.mjs` passed across 359 files.
- `node scripts/build-equation-mapping-corpus.mjs --check` exited one, reporting stale `content/generated/equation-mapping/corpus-equations.json`, with 199 Markdown, 4685 displays, 23 promoted equations and 30477 symbol definitions. Deferred regeneration command: `node scripts/build-equation-mapping-corpus.mjs --write`, only under explicit regeneration/publication authority. No unique attribution of shared-tree drift is made.

## Remaining obligations

- TH-O1 — Runtime owner: enforce entropy-record identity in acceptance; require declared weak-field checks and independently executed negative controls; authenticate provenance and overrides; distinguish integer cardinalities from normalized count proxies; use per-quantity scales and implement any claimed optional residuals. Current source and mock remain unchanged.
- TH-O2 — Entropy/observer owner: derive the alternative-history space, measure, finite-precision map, block-limit and physical thermodynamic interpretation; derive boost flux and proper-acceleration temperature from one record with independent uncertainty and normalization checks.
- TH-O3 — Metric/energy owner: include non-Killing, work and omitted-boundary accounts and prove the local-equilibrium/all-null-direction hypotheses needed for Einstein recovery. Finite residuals and weak-field gates alone are insufficient.

No blocker remains to bounded editorial integration. The coordinator owns shared-record routing; this worker stops after the chapter and receipt.
