# CRW-005 bounded review: Weak Mixing Angle

Date: 2026-09-12

Target: `content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md`

Scope: bounded assurance review and claim-preserving repair for priority 37, with edits restricted to the target and this evidence report. No shared status, priority, queue, work-log, generated, fixture, or other path was edited. No staging, commit, push, publication, regeneration, or linked worktree operation was performed.

## Baseline and final identity

- The supplied pre-edit target SHA-256 was `cd15c11e95afacd82b630b4b382a4f985d3ab3be002fbc0120f227f3e38e5fb6`.
- `shasum -a 256 content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md` measured that exact supplied hash before the first target edit.
- `git show HEAD:content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md | shasum -a 256` independently measured the same baseline hash.
- The evidence report was absent before dispatch, verified with `test ! -e reference/priorities/aaa-corpus-rewrite/evidence/crw-005-weak-mixing-angle-review-2026-09-12.md`.
- The target hash was reverified before each of the four target-edit batches: `cd15c11e...e38e5fb6`, then `005b57d6...2e165b6`, then `7c519056...497590`, then `73ff4684...c8fc65`.
- Final target SHA-256: `319583d395c6ef0a217b7c640c9bba8936adc962a4e728100a9cafa0f36120eb`.
- Final target length: 480 lines.

The baseline file was 477 lines. Baseline line references below are from the committed baseline retrieved with `git show HEAD:<path>`; final references are from the final working-tree file after repair.

## Sources inspected

Repository instructions and workflow owners inspected before editing:

- `AGENTS.md`
- `reference/op/agent-startup-orientation.generated.md`
- `reference/op/skills/README.md`
- `reference/op/skills/skill-architrino-review.md`
- `reference/office-of-research/cto/prompts/integrator-reviewer.md`
- `reference/office-of-research/cto/prompts/corpus-reviewer.md`
- `reference/office-of-research/cto/prompts/review-closure-verifier.md`
- `reference/op/theory-orientation.md`
- `reference/op/operator-explanation-standard.md`
- `reference/priorities/aaa-corpus-rewrite/priorities.md`
- `reference/priorities/aaa-corpus-rewrite/corpus-review-status.md`
- `reference/priorities/aaa-corpus-rewrite/work-queue.md`
- `reference/priorities/aaa-corpus-rewrite/work-log.md`

Task-relevant canon and nearby owners inspected:

- `content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md`
- `content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md`
- `content/markdown/aaa/assemblies/fermions/quarks.md`
- `content/markdown/aaa/assemblies/fermions/electron.md`
- `content/markdown/aaa/assemblies/fermions/neutrinos.md`
- `content/markdown/aaa/assemblies/gauge-structure-emergence.md`
- `content/markdown/aaa/assemblies/gauge-symmetries.md`
- `content/markdown/aaa/assemblies/bosons/electroweak-bosons.md`
- `content/markdown/aaa/assemblies/fermions/color-charge-su3.md`
- `content/markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md`
- `content/markdown/aaa/archie/academic-style-guide.md`
- `content/markdown/aaa/archie/mathematics-style-guide.md`
- `content/markdown/aaa/archie/mathematics-terminology.md`
- `content/markdown/aaa/archie/comparative-glossary.md`
- `content/markdown/aaa/archie/about-architrino.md`

The PDG electroweak-review URL already present in the current quantum-number canon was inspected as the source of the observer-level comparison label; no new web retrieval was performed. No new numerical instantiation of $c_f$ was introduced; the target contains no numerical $c_f$ instantiation.

## Findings and repairs

Finding count: 6 demonstrated issues, WM-01 through WM-06. All six received the smallest local repair judged sufficient to restore the claim boundary. No finding asserts theory closure, EOM solver acceptance, physical branch existence, or downstream corpus closure.

### WM-01 — non-unique inverse-trigonometric representative and undefined comparison label

- Severity: Moderate.
- Claim grade: derived for the trigonometric ambiguity and notation boundary; guessed for the physical six-pole branch hypothesis.
- Baseline references: lines 18-27 used `sin^2 theta_inc=1/4` to state `theta_inc=pi/6` without an angle representative convention; line 170 used `theta_W^bare` without defining it locally.
- Demonstrated issue: the sine-squared equation admits multiple angular representatives, and the bare-angle symbol was not locally defined as a comparison label.
- Smallest repair: final lines 20-29 declare the smallest positive representative in `0 < theta_inc <= pi/2`; final line 172 defines `sin^2 theta_W^bare` as the comparison-only branch-increment label and explicitly denies a derived identity.
- Falsifier: a canonically admitted alternative representative under the same stated interval, or a derived quotient that selects a different representative, would overturn the repaired angle assignment.

### WM-02 — six-site/equilibrium/color claims exceeded nearby owner scope

- Severity: Moderate.
- Claim grade: inferred from the nearby generation, electron, and color owners; not a derived branch result.
- Baseline references: line 42 generalized the six-architrino scaffold; lines 84-105 presented the electron equilibrium and absence of color asymmetry too strongly.
- Demonstrated issue: the nearby quark owner allows depleted higher-generation shielding support, while the electron and color owners preserve candidate/recovery boundaries rather than proving a universal six-site equilibrium or color response.
- Smallest repair: final line 44 scopes the six-site scaffold to the Generation-I candidate and allows depleted higher-generation support; final lines 90, 93-107 recast color-singlet response and `R_rel=I` as candidate/recovery conventions and retain possible dynamical anisotropic residue.
- Falsifier: a complete retained-history branch record demonstrating universal six-site support, equilibrium, and the claimed color response across the asserted domain would remove this scope objection.

### WM-03 — moment diagnostic was conditional but stated as an equivalence

- Severity: Moderate.
- Claim grade: derived by the displayed moment algebra and counterexamples.
- Baseline references: lines 121-137 used same/mixed dyad identities without declaring exact antipodality; lines 141-148 treated `R_off>0` as equivalent to a unique rotated joint principal frame.
- Demonstrated issue: the dyad identities require exactly antipodal directions; an isotropic `M` with directional `d` gives `R_off=0` despite directional information, and degenerate eigenvalues make a principal frame nonunique.
- Smallest repair: final lines 123-150 declare exact antipodality for the dyad identities, make `R_off>0` only a sufficient tensor indicator, state the counterexamples, and require nondegeneracy or a tie-break for any joint-frame criterion.
- Falsifier: a defined nondegenerate joint-frame rule proving the former equivalence over the declared domain would overturn the limitation, but it would not remove the exact-antipodality condition.

### WM-04 — discrete color record was conflated with a spatial rotation

- Severity: Major.
- Claim grade: derived from the type distinction and the nearby color canon.
- Baseline references: lines 241-264 defined `R_rel(alpha,c)=R_axis(c) R_tilt(alpha)` and described `R_axis` as choosing the color sector, without a spatial tilt axis or a typed color/spatial separation.
- Demonstrated issue: the nearby color owner treats the exceptional-axis label as an effective color-basis record, not automatically as an `SO(3)` spatial rotation; a scalar tilt angle also needs a declared spatial axis.
- Smallest repair: final lines 243-267 introduce `hat u in S^2`, define `R_rel(alpha,hat u)` in `SO(3)`, and package the independent record `P(c,alpha,hat u)`, explicitly prohibiting multiplication of `c` as an `SO(3)` or `SU(3)` transformation.
- Falsifier: a derived representation within this same declared model that maps the color label to a physical spatial rotation would overturn the type objection; that map would still need to be stated and derived.

### WM-05 — observer-level numerical shift was mislabeled as wake-only

- Severity: Moderate.
- Claim grade: derived for the conditional arithmetic; guessed/ unresolved for any physical decomposition into dressing components.
- Baseline references: lines 170-182 called the difference `Delta_wake` and described it as a correction before specifying a common matching scheme.
- Demonstrated issue: the nearby quantum-number canon distinguishes the representative effective leptonic angle from other angle conventions and records the subtraction as conditional arithmetic, not as a wake-only result.
- Smallest repair: final lines 172-184 define `Delta_match`, retain the arithmetic and percentage, and state that common-scheme radiative matching is required before attributing any part to Noether-sea response.
- Falsifier: an explicit common-scheme derivation that decomposes the total shift and identifies a wake component would support a narrower wake attribution.

### WM-06 — toy effective functional did not guarantee the claimed discrete minima

- Severity: Moderate.
- Claim grade: derived by the functional counterexample and stability conditions; guessed for the proposed effective reduction.
- Baseline references: lines 296-345 presented an effective energy without a layer boundary or fixed-domain conditions, required only a stationary derivative at the branch angles, and called an arbitrary `B f_type` term the shape needed for discrete minima.
- Demonstrated issue: an arbitrary nonzero perturbation can shift or remove stationary points and minima; a reduced effective functional is not automatically an energy derived from the delayed acceleration law; neutral directions and master-equation satisfaction were not stated as prerequisites.
- Smallest repair: final lines 301-348 label the functional an observer-level comparison object, condition it on fixed records/domain data, require the derivative at `alpha=n theta_inc`, require strict quotient minima after neutral directions are removed, require complete histories to satisfy the master equation first, and state that arbitrary `B f_type` can shift/remove minima.
- Falsifier: an explicit dimensioned functional with derivative/curvature constraints plus a complete retained-history reduction establishing the minima would discharge this finding.

## Validation record

Known controls were run before the target checks. The one-off syntax/link census used the installed KaTeX package and filesystem resolution; it was not treated as a semantic or generated-registry proof.

- Known KaTeX control: `node --input-type=module` rendering of `\\frac{1}{2}+\\sin^2\\theta` with `throwOnError` and `strict: 'error'`: PASS.
- Target KaTeX check, after that control: PASS, 22 display expressions and 91 inline expressions rendered.
- Known local-link control: the electron-to-foundations relative link resolved: PASS.
- Target local-link check, after that control: PASS, 28 local path links and 0 missing targets.
- `node scripts/validate-equation-mapping-links.mjs`: PASS; 23 registered equation links resolve from canonical corpus sources.
- `node scripts/build-equation-mapping-corpus.mjs --check`: check-only observation; Markdown files 199, display equations 4685, promoted equations 23, symbol definitions 30434; generated registry stale at `content/generated/equation-mapping/corpus-equations.json`.
- Deferred exact regeneration command: `node scripts/build-equation-mapping-corpus.mjs --write`. It was not run because regeneration was outside this bounded review authorization.
- `node scripts/validate-content.mjs --check --strict`: check-only observation; 0 errors, 0 warnings, 30 notes. This is a whole-repository diagnostic and its unrelated scene/link notes are out-of-scope concurrent diagnostics, not evidence about this chapter or a claim of overall repository health.
- Report whitespace check: `awk 'length($0) && $0 ~ /[[:blank:]]$/ {print NR ":" $0}' reference/priorities/aaa-corpus-rewrite/evidence/crw-005-weak-mixing-angle-review-2026-09-12.md` returned no lines.
- Final scoped whitespace check: `git diff --check -- content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md`: PASS. The untracked report is covered separately by the report whitespace check above.
- Complete final reread: all 480 final target lines were read after the last target repair; no additional edit followed that reread.

## Closure limits and remaining obligations

This report closes only the bounded editorial assurance pass and records six repaired claim-boundary defects. It does not establish a physical branch, stable equilibrium, population, weak-angle derivation, EOM solver acceptance, effective electroweak matching, CKM/PMNS closure, theory closure, or downstream corpus closure. The generated equation registry remains stale pending the exact deferred command above. The remaining physical obligations are the complete retained-history/master-equation construction, quotient and nondegeneracy rules, branch stability and population evidence, a typed spatial/color mapping if one is desired, and common-scheme observer-level matching before any wake attribution.
