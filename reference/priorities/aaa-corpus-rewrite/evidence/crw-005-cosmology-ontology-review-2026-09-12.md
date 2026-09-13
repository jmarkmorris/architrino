# CRW-005 Cosmology Ontology Review — 2026-09-12

## Scope, provenance, and disposition

Priority 59, CRW-005: complete bounded review and repair of [Cosmology Ontology](../../../../content/markdown/aaa/cosmology/cosmology-ontology.md). This receipt and that chapter are the only authorized write targets. The operator explicitly authorized local implementation, superseding the corpus review procedure's review-only default for this assignment. Shared priorities, queue, work log, status, conversion ledger, other chapters, guides, generators, generated output, fixtures, code, and publication files remain outside this worker's write scope.

Disposition: 17 demonstrated local finding groups, CO-01–CO-17, repaired within the chapter; 0 Critical, 11 High, 6 Medium, 0 Low. High denotes an incorrect equation, invalid sufficiency inference, or missing condition capable of changing a diagnostic verdict; Medium denotes a consequential definition, interpretation, or source-support defect. These are document-review severities, not declarations that a physical cosmology has been falsified. Optional stylistic preferences are not counted. The review and subsequent reread are author self-review, not a second independent reviewer.

The initial two-path inspection by git --no-optional-locks status --short returned no entries, and test ! -e on this receipt passed. The chapter's actual dispatch SHA-256, measured by shasum -a 256, was:

    05d9c20b3bffb3031a6880bd1850a13fa03bbf2188288567afa2c70f26abb76d

The operator-supplied string was:

    05d9c20b3bffb3031a6880bd1850a13fa03bbf2188288567afa2c70f26abb76

The supplied value has 63 characters and omits the final d. The live 64-character hash also matched the chapter extracted by git show from commit 72847589ba73d0bf81d07ca5b27d98072659cee9. This agreement, combined with the scoped clean status, supports the inference of a truncated dispatch string; it does not establish what produced that truncation. A fresh hash and scoped status immediately before the first edit again matched the same baseline.

All baseline line references below refer to that immutable 665-line Git version. Final references refer to the fully reread 682-line chapter at this SHA-256:

    0dc4d1ad5ab8657e954feb90513183cf8683c416f4cfa3403c53c2e4f4b41d2b

A different live hash invalidates the final line mapping and requires rereview of the intervening diff. No commit, staging, push, reset, stash, regeneration, or linked worktree was used by this worker. The patch operations targeted only the chapter and this new receipt; this is a statement about this worker's operations, not an attribution of other concurrent repository changes.

## Authorities and sources inspected

The startup, procedure, and style reads used shell sed/nl against the live files. The [repository instructions](../../../../AGENTS.md), [generated startup router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), [corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), [operator explanation standard](../../../op/operator-explanation-standard.md), and [execution procedure](../../../op/codex-goal-seeking-prompt-template.md) supplied the review and claim boundaries. The skill selected one complete target, required exact evidence and self-review disclosure, and kept local repair distinct from independent validation.

CRW context was inspected in [work queue](../work-queue.md), opening CRW-005 entry and prior bounded-review dispositions; [priorities](../priorities.md), current ownership/phasing; and [corpus-review status](../corpus-review-status.md), current coverage listing. These were context reads, not shared integration or approval. Only the coordinator may update them under separate authority.

The review used the [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), [source and disclosure policy](../../../../content/markdown/aaa/archie/about-architrino.md), and [geometry/dynamics review lens](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md). No guide or canon was edited.

The task-relevant foundation and dynamics sections were inspected in [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md), [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), and [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md). These dependency reads are not completed reviews of those chapters. [Entropy](../../../../content/markdown/aaa/dynamics/entropy.md), lines 432–468 and 684–717, supplies the state-function and same-record qualifications. Targeted rg inspection of [Expansion Mechanism](../../../../content/markdown/aaa/cosmology/expansion-mechanism.md) checked source, clock, speed, and continuity boundaries; it was not a complete chapter review.

External support was verified at the exact scope below. It is effective comparison, observer-level measurement/inference, or historical context, never a premise of primitive architrino dynamics.

| Source | Inspected support and limit |
| --- | --- |
| [PDG, Big-Bang Cosmology (2024)](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-bbang-cosmology.pdf), K. A. Olive and J. A. Peacock | Web PDF inspection of §22.1 and equations (22.1), (22.8), (22.10)–(22.15): FRW metric, continuity, and density fractions. Its unit-speed convention requires the chapter's explicit dimensional translation. No native recovery is supplied by this source. |
| [Planck 2013 results XXI](https://arxiv.org/abs/1303.5081) | Web PDF inspection of the introduction and reported Compton-parameter map: thermal Sunyaev–Zeldovich distortion is a measured map with an electron-scattering interpretation. This is not evidence for the proposed Noether sea transfer kernel. |
| [Planck 2018 results VI](https://arxiv.org/abs/1807.06209) | Web PDF Table 2 gives a base-Lambda-CDM age near 13.8 Gyr conditional on model and likelihood. No independent reanalysis of data or stellar chronometers was performed. |
| [O'Raifeartaigh et al., Einstein's steady-state theory](https://arxiv.org/abs/1402.0132) | Web PDF §§2–4 and translated manuscript: corrected equations yield zero matter density; manuscript dating is probable, not exact. This is manuscript translation and analysis, not a current cosmological test. |
| [Gamow, Rotating Universe? (1946)](https://www.nature.com/articles/158549a0) | Publisher metadata and accessible abstract identify Nature 158, 549, DOI 10.1038/158549a0. The full subscription letter was not inspected. The chapter no longer attributes its particular radial calculation to Gamow. |
| R. Penrose, The Road to Reality (Jonathan Cape, 2004), §27.13, pp. 728–730 | A university-hosted book PDF was streamed through curl and pdftotext -layout to stdout; the inspected passage supplies the black-hole entropy and phase-volume estimate. No PDF or extraction file was created. This framework-dependent estimate is not a probability measure on native histories. |

## Findings and bounded repairs

### CO-01 — Medium — Ontology, definitions, and unestablished mechanism language

Baseline lines 3–26, 42–60, 611–638; final lines 3–28, 43–67, 621–646. The opening did not define the objects needed to distinguish complete history from observer projection, while the mapping and galaxy-local sections read as if interfaces and distributed recycling already furnished physical predictions.

Repair: define the primitive/assembly/Noether sea layers, complete retained state, and observational abbreviations; state the mechanism table and galaxy-local engine as proposed recovery routes. Preserve the fixed eternal background as the project's postulate, and retain all existing cosmology branches and navigation.

Grade: measured wording defect by baseline/final nl and diff inspection; inferred risk of overreading; physical mechanism remains proposal. Falsifier: a derivation from the stated histories supplying these particular maps and populations would justify stronger, explicitly bounded wording. Naming the ontology alone does not.

### CO-02 — High — FRW dimensions and background-equation sufficiency

Baseline lines 82–117; final lines 83–122. The comparison did not distinguish mass density from energy density or define the scale/curvature and cosmological-constant units; it said passing two background equations meant an accurate FRW projection.

Repair: define length-valued positive scale factor, dimensionless radial chart, curvature sign, observer speed calibration, energy-density pressure convention, and time-inverse-squared cosmological constant. Preserve the displayed equations through this explicit convention. State the closed-inventory and constant-coupling comparison conditions; variable coefficients require compatible equations and exchange. Background consistency is necessary within the comparison, not a derivation of clocks, propagation, perturbations, or observations.

Grade: derived dimensional and logical correction under the displayed comparison equations; external comparison supported by PDG. Falsifier: exhibit a consistent alternate dimensional convention reproducing every displayed term, or a theorem deriving the missing projection from the stated assumptions. Two scalar background equations alone do neither.

### CO-03 — High — Component double counting and dependent comparisons

Baseline lines 121–169; final lines 126–174. The candidate inventory could count binding or kinetic energy again after inclusion in an assembly mass; density fractions divide by a potentially zero expansion rate. The covariance norm and independence scope were not supplied.

Repair: require an exhaustive nonoverlapping effective partition, nonzero expansion rate, one curvature convention and one cosmological-constant entry; define transfer-map units and covariance of the difference, including cross-correlations and supported-subspace treatment. A scalar sum or shared-input agreement is only consistency.

Grade: derived accounting/domain correction; no measured cosmological inventory. Falsifier: a declared partition and covariance that demonstrate all proposed entries are disjoint and the reference is independent would discharge those particular concerns.

### CO-04 — High — Duplicate dilution in cycle mass

Baseline lines 175–213, particularly display 201–209; final lines 178–216, particularly display 207–212. The baseline subtracted the dilution integral after multiplying the density by the expanding comparison volume.

Repair: define mass in a fixed unit comoving volume and remove the second subtraction. The independent mathematical reference is the product rule:

$$
\frac{d(\rho_m a^3)}{dt_{\mathrm{eff}}}
=a^3\left(\frac{d\rho_m}{dt_{\mathrm{eff}}}+3H\rho_m\right)
=a^3\mathcal S_m.
$$

Here the shortened symbols denote this section's effective dust comparison only. Constant density alone does not return the comoving mass; both density and volume must return for a cycle with zero net source integral.

Grade: derived algebraic error. The normalized illustrative witness has $c_f=1$, $a=t_{\mathrm{eff}}$, $\rho_m=1$, and $\mathcal S_m=3/t_{\mathrm{eff}}$ on $[1,2]$. Endpoint mass change and the corrected analytic integral are 7; the baseline expression gives 0. Falsifier: the baseline could denote a different quantity, but then it cannot be this mass difference and would require an explicit alternative definition.

### CO-05 — High — Missing emitted-frequency integration

Baseline lines 219–255; final lines 222–259. The brightness expression left the emitted frequency free while using a frequency-transfer kernel.

Repair: integrate over emitted frequency; define path, emissivity, kernel/Jacobians, and the extra angular/path sum or self-consistent source required for redistribution. Count reprocessing once. Preserve the finite-brightness test but distinguish it from the observed spectrum and amplitude.

Grade: derived free-variable and linear-superposition defect; kernel remains proposal. A two-bin unit-path witness contributes 1 plus 0.75 to the receiver, totaling 1.75; retaining either emitted bin alone omits a term. Falsifier: a declared delta-function frequency map with its Jacobian can reduce the integral, but that was not the general mixing formula supplied.

### CO-06 — High — Entropy stationarity, recurrence, and state-function limits

Baseline lines 217, 257–304; final lines 220, 261–310. Eternal time was made to require bounded stationary-window entropy; nonnegative production and scalar balance were insufficiently qualified; the retuning ratio was made to determine the entropy interpretation.

Repair: restrict bounded accumulation to the additionally stationary recycling claim and nonnegative production to the declared macroscopic thermodynamic regime. Define integrated fluxes and the nonadjustable coarse-record term. Explain that summing the balance yields the bounded remainder, not full-state recurrence. State-function entropy requires the reversible-cycle integrability conditions in the unchanged Entropy owner, not the retuning ratio alone.

Grade: derived distinction between necessary scalar balance and recurrence; thermodynamic sign is a recovery requirement, not a primitive law. Falsifier: demonstrate stationary full-history dynamics and the required reversible-cycle/domain conditions. A bounded scalar observable or short relaxation duration alone is not that demonstration.

### CO-07 — Medium — Observational decomposition does not imply independence

Baseline lines 306–316; final lines 312–322. Separating modules was said to remove interpretational linkage and prevent hidden dependency loops.

Repair: state shared calibration, assumptions, overlapping data, covariance, and conditional independence requirements; define TT/TE/EE. Grade: derived probabilistic distinction and measured prose overclaim. Falsifier: a documented joint model establishing the required factorization would permit multiplication of those particular likelihoods; naming modules does not.

### CO-08 — Medium — Distance and redshift chain domains

Baseline lines 320–345; final lines 326–353. The distance-modulus logarithm lacked its numerical parsec convention and calibrated luminosity-distance scope; the zero-distance slope lacked ensemble and peculiar-motion qualifications.

Repair: define same-band magnitudes, extinction/passband or bolometric treatment, dimensionless logarithm argument, matching spectral references, and corrected low-redshift ensemble interpretation. A slope does not alone establish a hot thermal history. Grade: derived unit/domain correction in the labeled observer comparison. Falsifier: explicit measurement conventions satisfying these conditions resolve the ambiguity; an individual uncorrected nearby source does not.

### CO-09 — Medium — Different chronometers do not date the same event

Baseline line 349; final line 357. The age paragraph grouped CMB-inferred age, stellar formation/evolution, cooling, radioactive processes, and grains as if they should yield a common numerical age.

Repair: retain the observer-era comparison while naming Planck's model-conditioned result and distinguishing formation, survival, and reset histories and their uncertainty. Grade: source-supported inference boundary, not a new age measurement. Falsifier: a specified population/clock model could predict relationships among those dates; a common reset assigned after fitting cannot establish them.

### CO-10 — High — Rotation-template blindness and index collision

Baseline lines 361–406; final lines 369–414. Tracer index i also appeared as a spatial component in vector operations. More importantly, the template was presented as capable of rejecting rotation and representing quadrupole/higher patterns that it cannot generally identify.

Repair: use explicit effective position vectors and a declared local Euclidean chart. Substituting the tracer position gives the independent vector identity

$$
T_i=[g(D_i)-g(0)]\hat{\mathbf n}_i\cdot
[\boldsymbol\omega\times(\mathbf x_{\mathrm{eff},o}-\mathbf x_{\mathrm{eff},c})],
$$

because a vector is orthogonal to its cross product with another vector. Constant-profile rigid rotation is exactly invisible; fixed-distance angular dependence is a dipole. Center and angular rate are not separately identifiable. Define positive weights and distinguish fit residual from significance, covariance, and template complexity. Keep this as effective kinematics, not a primitive magnetic acceleration.

Grade: derived structural blind spot. The checked nonzero rigid-rotation witness gives zero radial template, while the declared nonconstant profile gives 6 in normalized illustrative units with $c_f=1$. Falsifier: an additional observable or expanded template may identify rotation, but a null result from this radial template cannot do so.

### CO-11 — High — Pair normalization removes information needed for homogeneity

Baseline lines 408–442; final lines 416–450. Pair-shape agreement was treated as a homogeneity check without defining its information loss or degeneracies.

Repair: require at least two tracers and positive RMS separation, correct vector notation, and show unit total measure and unit second moment. Rename the interpretation to normalized pair-shape agreement; require counts per volume, absolute scale, direction, selection, and noise controls for stronger claims.

Grade: derived normalization invariance. A scaled or rotated collinear triple has identical normalized pair shape; factor-two dilation of its comparison window changes density by factor eight. Falsifier: an additional count/scale/directional statistic could separate the examples, but this normalized pair distribution alone cannot.

### CO-12 — High — Fixed-record narrowness is not model predictivity

Baseline lines 448–489; final lines 454–497. A narrow output neighborhood for one fitted parameter record can coexist with a model that permits almost any output.

Repair: retain the fixed-record inequality, define finite positive comparison measure, and assess the union over admissible records or a predeclared predictive measure before held-out observations; keep tolerance and covariance fixed. Grade: derived quantifier correction. The witness uses 51 overlapping neighborhoods, each interior width 0.02, whose union covers the whole declared unit interval. Falsifier: a justified restricted record family or predictive distribution may be narrow before fitting; post-fit selection alone cannot establish it.

### CO-13 — Medium — Basin-measure domain and conditional tautology

Baseline lines 491–534; final lines 499–542. The measure ratio lacked finite nonzero normalization and nuisance-policy conditions; a large accepted fraction was equated with robustness. Conditioning could include the desired result.

Repair: define natural logarithms, zero-basin infinite burden, finite nonzero domain measure, evolved versus fixed entries, and independent conditioning. Large measure is not perturbative stability. Grade: derived probability/domain correction. Conditioning an event on itself gives probability 1 and burden 0; zero denominator is undefined. Falsifier: a dynamically justified measure and stability theorem could support stronger claims, not the fraction alone.

### CO-14 — High — Observer-selection probability and self-fit limits

Baseline lines 536–560; final lines 544–568. A pushforward was called probability without normalization or event/bin scope; merely conditioning on the same sea record does not determine a measure. The maximum combined potentially incomparable residuals.

Repair: require normalized measure, declared selection rule, measurable finite-resolution events or a density with reference measure, and dimensionless tolerance-normalized residuals with sampling/correlation treatment. Fitting a measure to observed data is not independent evidence for the selection rule.

Grade: derived probability and dimensional consistency conditions; selection mechanism remains unresolved. Falsifier: an independently derived measure or successful held-out prediction can support the declared rule; same-data fit cannot.

### CO-15 — High — Vacuous global-claim promotion

Baseline lines 564–596; final lines 570–604. The same-data set was named like an equivalence class, and a zero disagreement indicator could promote a claim false throughout the set or tested on an empty/incomplete neighborhood.

Repair: describe a nontransitive tolerance neighborhood; require nonempty admissible observed-fit histories, truth throughout, and coverage of all observationally allowed alternatives in the declared domain. Preserve the indicator equation, but delimit its meaning. A native proof has conditional scope distinct from empirical support.

Grade: derived logical error. At tolerance 1, 0 and 0.75 are close, as are 0.75 and 1.5, but 0 and 1.5 are not. Both an empty set and an all-false set give indicator 0. Falsifier: establish nonemptiness, truth, and exhaustive coverage (or a conditional theorem with explicit premises); no finite local search alone supplies those facts.

### CO-16 — High — Acoustic-ruler agreement can share a wrong calibration

Baseline lines 644–659; final lines 650–667. The coherence residual compared predictions only with their own average and could be read as recovery of the observed ruler; its denominators and weighting domain were unspecified.

Repair: define common calibration, positive weights/tolerances and nonempty index set; keep coherence separate from absolute BAO and CMB comparison with shared distances and covariance. A maximum of normalized deviations is not by itself a calibrated confidence level.

Grade: derived diagnostic limit. Identical predicted rulers of 2 have coherence residual 0 while all differ from a comparison value of 1 in normalized illustrative units with $c_f=1$. Falsifier: an independently satisfied absolute calibration and data comparison would close that extra obligation; internal equality cannot.

### CO-17 — Medium — Traceability and historical attribution

Baseline lines 78, 173, 349, 361, 522; final lines 81, 178, 357, 369, 530, 675–682. Measurement, historical, and numerical specialness claims lacked checkable local references or exceeded the inspected historical support.

Repair: add a compact six-source comparison note, mark Einstein's date as probable, restrict Gamow to the verified historical proposal, give the precise Planck age table and Penrose section, and separate thermal SZ measurement from its scattering interpretation and the unproved sea model.

Grade: measured source-support correction by the source inspections listed above; historical dating and model reconstruction remain inference. Falsifier: a primary source contradicting the cited passage or attribution reopens the corresponding statement. Gamow's full argument was not assessed.

## Coverage and preservation

The baseline and repaired chapter were read in full with nl/sed, including unchanged document navigation, classification distinctions, comparison tables, observer interfaces, nearby-family boundaries, and operational time notions. The scoped Git diff was inspected, including the entire mathematical edit region. The conceptual review did not replace the eternal fixed-void postulate, invent a cosmological branch, or import standard force, mass, thermodynamics, or relativistic geometry as a primitive premise.

The known-case-first Node check below measured 34 preserved display-equation identifiers, 24 preserved original headings in order, and all 46 original Markdown-link occurrences. A Sources and Comparison Scope heading and 11 links were added. Of 34 displays, 27 retained their exact TeX bodies and 7 changed intentionally:

| Stable equation identifier | Baseline opening line | Final opening line | Authorized change |
| --- | --- | --- | --- |
| corpus-equation-be92b99610e5da53 | 201 | 207 | Correct comoving mass integral, CO-04 |
| corpus-equation-5df7f19eb9f4cbad | 221 | 224 | Integrate emitted frequency, CO-05 |
| corpus-equation-0f7ff88195a8e1c8 | 364 | 372 | Effective vector notation, CO-10 |
| corpus-equation-2b8645b0395fb52a | 375 | 383 | Effective vector notation, CO-10 |
| corpus-equation-d3838b965cc75861 | 388 | 396 | Effective vector notation, CO-10 |
| corpus-equation-59ccbbe9e080798e | 409 | 417 | Effective vector notation, CO-11 |
| corpus-equation-b39d66efd92a7aa7 | 420 | 428 | Effective vector notation, CO-11 |

All displayed-equation changes are enumerated here rather than described as byte-preserving; the findings above also identify the inline definitions and derivations added in prose. Equation identity preservation is a routing check, not formula freshness or physical correctness.

## Validation record

The executable blocks below are retained in this receipt, not separate code or scratch files. They run with Node from the repository root and do not write files. Tests of in-session scanners and witness helpers precede their target use. The initial equation-parser control exposed an incorrect assumed property name; it was corrected to the parser's actual semanticId field and all controls passed before target comparison. One JavaScript orchestration quoting attempt for the witness block failed before execution; the corrected block below passed. Neither failed preparation is counted as a target-validation pass.

| Instrument / command | Result and scope |
| --- | --- |
| Complete chapter baseline/final reread with nl/sed; scoped git diff | Completed author review, exact locations recorded above. Not independent review or solver evidence. |
| Known-case-first math/KaTeX/local-link and preservation block below | PASS on chapter: 216 math spans rendered with vendored KaTeX strict error mode; 57 links, including 52 local targets; preserved 34 IDs, 24 original headings, 46 original links. Receipt included in the final run. This is syntax/path validation, not mathematical proof. |
| Markdown-fragment and equation-route checks in the same block | PASS: two ASCII Markdown heading fragments and 34 equation registry IDs. No browser UI or generated-formula freshness is implied. |
| Known-case-first arithmetic block below | PASS: eight witness groups after positive/negative controls. References are the product rule, vector perpendicularity, normalization, interval union, conditional probability, and Boolean logic, not an edited comparison solver. |
| node scripts/validate-content.mjs --check --strict | PASS before receipt creation: 199 corpus Markdown files, 1705 repo Markdown files audited, 0 errors, 0 warnings, 30 informational notes. Rerun after receipt creation recorded in final verification below. |
| node scripts/build-equation-mapping-corpus.mjs --check | Exit 1: generated registry is stale at content/generated/equation-mapping/corpus-equations.json; scan reported 199 Markdown files and 4685 displays. This is a freshness failure, not a mathematical verdict. |
| Scoped whitespace, final receipt reread, final hashes | Final verification below records the post-receipt run. |

### Generated consumers and deferred regeneration

Before editing, the literal chapter-path rg search across scripts, tests, src, content/generated, content/graph, and the CRW owner directory found references in the textbook and scene graphs; source-index, equation, reference-surface, TOC and reading-copy outputs; the source-index test fixture; EquationMappingRegistry.js; and the shared CRW queue/status/conversion ledger. This is a path-reference inventory in those searched roots, not proof that no other binder exists.

The seven intentional display changes and shifted chapter contexts require equation-registry refresh. The whole-corpus stale result does not isolate this worker as the sole cause of every registry difference. Regeneration is expressly unauthorized; neither the registry nor any source-index, reading-copy, fixture, or other generated file was edited here. The exact deferred command is:

    node scripts/build-equation-mapping-corpus.mjs --write

An authorized integration/publication runner must execute it at the appropriate stage and rerun:

    node scripts/build-equation-mapping-corpus.mjs --check

Other consumers were not regenerated or given a freshness pass. The strict content check does not certify all generated assets, repository tests, or deployment.

## Remaining obligations and closure limits

1. CO-O1 — Derive and independently test the shared history-to-clock/ruler/transport/metric maps, including continuation and observable recovery. No local algebra or source citation establishes a physical cosmology branch or EOM solver acceptance.
2. CO-O2 — Supply recycling source, reaction/yield, population, finite-brightness, and entropy accounts from the same physically realized history; verify observer uncertainties and correlations. All SMBH cosmological-engine and galaxy-local realization claims remain proposals.
3. CO-O3 — Apply identifiable anisotropy, count/scale/directional homogeneity, joint acoustic calibration, and held-out predictive tests to actual data. The witnesses demonstrate diagnostic limitations, not observed anomalies.
4. CO-O4 — Derive or justify probability/selection measures, admissible-history domains, and global-claim coverage. Finite residual checks do not establish typicality, global uniqueness, origin, or topology.
5. CO-O5 — Coordinator independently inspect this two-path diff and final hash, then integrate accepted disposition into shared CRW records under its own authority. No shared review-status or priority completion is claimed by this worker.
6. CO-O6 — Authorized runner resolve equation-registry freshness using the exact deferred command, then verify affected generated consumers under their owners. No downstream closure is claimed here.

No new physical constants, observational fits, simulations, branches, or theory-closure result were produced. The source-level repairs close the 17 recorded local defects at author-review grade; they do not satisfy the physical and independent-integration obligations above.

## Reproduction: structural checks

Run the following complete block from the repository root. Its purpose is source structure, math rendering, links, and preservation, not theory verification.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import crypto from 'node:crypto';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const md=loadVendoredCommonJsBundle('vendor/markdown-it/markdown-it.min.js')();
const katex=loadVendoredCommonJsBundle('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js');
function codeFree(s){return s.replace(/(^|\n)[ \t]*(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?\n[ \t]*\2[ \t]*(?=\n|$)/g,'$1').replace(/(\x60+)[^\n]*?\1/g,'');}
function math(s){const p=codeFree(s), spans=[...p.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g)];assert(!p.replace(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g,'').includes('$'),'unpaired dollar');return spans.map(m=>({tex:m[1]??m[2],display:m[1]!==undefined}));}
function links(s){const out=[];function walk(ts){for(const t of ts){if(t.type==='link_open')out.push(t.attrGet('href'));if(t.type==='image')out.push(t.attrGet('src'));if(t.children)walk(t.children);}}walk(md.parse(codeFree(s).replace(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g,'MATH'),{}));return out;}
function local(h,p){if(/^[a-z][a-z0-9+.-]*:/i.test(h))return null;return path.resolve(path.dirname(p),decodeURIComponent(h.split('#')[0].split('?')[0]||path.basename(p)));}
function heads(s){return s.split('\n').filter(l=>/^#{1,6} /.test(l));}
function diffs(a,b){return a.map((x,i)=>x===b[i]?null:i).filter(x=>x!==null);}
const control='# Control\n\n$x$\n\n$$\ny^2=1\n$$\n\n[View →](equation-mapping.html#test)\n[Good](AGENTS.md)\n\n\x60$ignored$ [Ignored](missing)\x60\n\x60\x60\x60text\n$ignored$ [No](missing)\n\x60\x60\x60\n';
assert.deepEqual(math(control).map(x=>x.tex.trim()),['x','y^2=1']);assert.deepEqual(links(control),['equation-mapping.html#test','AGENTS.md']);assert.throws(()=>math('$broken'));
assert.equal(local('AGENTS.md','control.md'),path.resolve('AGENTS.md'));assert(fs.existsSync(local('AGENTS.md','control.md')));assert(!fs.existsSync(local('no-such-CO-control-file.md','control.md')));
assert.match(katex.renderToString('x^2=1',{throwOnError:true}),/katex/);assert.throws(()=>katex.renderToString('\\noSuchCOCommand',{throwOnError:true}));
const ce=parseCorpusDisplayEquations('control.md',control);assert.equal(ce.length,1);assert.equal(ce[0].existingLink.semanticId,'test');assert.deepEqual(diffs(['a','b'],['a','x']),[1]);
console.log('PASS controls: math/code separation, malformed dollar, links positive/negative, KaTeX positive/negative, equation ID and comparison change detection.');
const chapter='content/markdown/aaa/cosmology/cosmology-ontology.md', report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-cosmology-ontology-review-2026-09-12.md';
for(const p of [chapter,report].filter(p=>fs.existsSync(p))){const s=fs.readFileSync(p,'utf8'),ms=math(s),ls=links(s);for(const m of ms)katex.renderToString(m.tex,{displayMode:m.display,throwOnError:true,strict:'error'});for(const h of ls){const target=local(h,p);if(target)assert(fs.existsSync(target),p+' broken '+h);}assert(!/[ \t]+$/m.test(s),p+' trailing whitespace');console.log(JSON.stringify({path:p,math:ms.length,links:ls.length,localLinks:ls.filter(h=>local(h,p)).length,sha256:crypto.createHash('sha256').update(s).digest('hex')}));}
const b=execFileSync('git',['show','72847589ba73d0bf81d07ca5b27d98072659cee9:'+chapter],{encoding:'utf8'}),s=fs.readFileSync(chapter,'utf8');
assert.equal(crypto.createHash('sha256').update(b).digest('hex'),'05d9c20b3bffb3031a6880bd1850a13fa03bbf2188288567afa2c70f26abb76d');
const be=parseCorpusDisplayEquations(chapter,b),ae=parseCorpusDisplayEquations(chapter,s);assert.deepEqual(be.map(e=>e.existingLink.semanticId),ae.map(e=>e.existingLink.semanticId));assert.deepEqual(heads(s).slice(0,heads(b).length),heads(b));const al=links(s);for(const l of links(b)){const i=al.indexOf(l);assert(i>=0,'lost link '+l);al.splice(i,1);}
const changes=be.flatMap((e,i)=>e.tex===ae[i].tex?[]:[{id:e.existingLink.semanticId,baselineLine:e.startLine,finalLine:ae[i].startLine}]);assert.equal(changes.length,7);console.log(JSON.stringify({preservedIds:be.length,preservedHeadings:heads(b).length,preservedLinks:links(b).length,changedDisplays:changes}));

const simpleSlug=h=>h.toLowerCase().replace(/[^\w\s-]/g,'').trim().replace(/\s+/g,'-');
assert.equal(simpleSlug('Second Law and Same-Record Monotonicity'),'second-law-and-same-record-monotonicity');
assert.notEqual(simpleSlug('Different Heading'),'second-law-and-same-record-monotonicity');
const hasId=(rs,id)=>rs.some(r=>r.semanticId===id);
assert(hasId([{semanticId:'test'}],'test'));assert(!hasId([{semanticId:'test'}],'missing'));
console.log('PASS fragment controls: ASCII heading slug positive/negative; equation registry ID positive/negative.');
const registry=JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8')).records;
let markdownFragments=0,equationFragments=0;
for(const h of links(s).filter(x=>x.includes('#')&&!/^[a-z][a-z0-9+.-]*:/i.test(x))){const p=local(h,chapter),id=decodeURIComponent(h.split('#')[1]);if(p.endsWith('.md')){const target=fs.readFileSync(p,'utf8');assert(heads(target).map(x=>simpleSlug(x.replace(/^#+ /,''))).includes(id),'missing Markdown heading '+h);markdownFragments++;}else{assert(p.endsWith('equation-mapping.html'),'unhandled fragment '+h);assert(hasId(registry,id),'missing equation route '+h);equationFragments++;}}
console.log(JSON.stringify({markdownFragments,equationFragments,fragmentScope:'ASCII Markdown headings and equation registry IDs only; not UI rendering or generated-formula freshness'}));

NODE
```

## Reproduction: arithmetic witnesses

These are normalized mathematical counterexamples with c_f=1, not observations or EOM solver output. Short symbols in the executable code are local illustrative variables.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
const c_f=1;
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const sub=(a,b)=>a.map((x,i)=>x-b[i]);
const add=(a,b)=>a.map((x,i)=>x+b[i]);
const mul=(a,s)=>a.map(x=>x*s);
const near=(a,b)=>assert(Math.abs(a-b)<1e-12,a+' != '+b);
const sum=a=>a.reduce((a,b)=>a+b,0);
function shape(points){const ds=[];for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)ds.push(Math.hypot(...sub(points[i],points[j])));assert(ds.length>0);const L=Math.sqrt(sum(ds.map(x=>x*x))/ds.length);assert(L>0);return {L,u:ds.map(x=>x/L)};}
const ambiguity=values=>Number(values.some(a=>values.some(b=>a!==b)));
const coherent=rs=>Math.max(...rs.map(r=>Math.abs(r-sum(rs)/rs.length)));
const intervalUnion=(cs,e)=>{let end=-Infinity,n=0;for(const c of [...cs].sort((a,b)=>a-b)){const lo=c-e,hi=c+e;n+=Math.max(0,hi-Math.max(lo,end));end=Math.max(end,hi);}return n;};
const conditional=(intersection,condition)=>{assert(condition>0 && Number.isFinite(condition));return intersection/condition;};
const mix=(j,K)=>K.map(row=>dot(j,row));
assert.equal(c_f,1);assert.deepEqual(cross([1,0,0],[0,1,0]),[0,0,1]);assert.equal(dot([1,0,0],[0,1,0]),0);
assert.deepEqual(sub([2,3,4],[1,1,1]),[1,2,3]);assert.deepEqual(add([1,2,3],[1,1,1]),[2,3,4]);assert.deepEqual(mul([1,2,3],2),[2,4,6]);
assert.deepEqual(shape([[0,0,0],[2,0,0]]),{L:2,u:[1]});assert.throws(()=>shape([[0,0,0],[0,0,0]]));
assert.equal(ambiguity([true,false]),1);assert.equal(coherent([1,3]),1);assert.equal(intervalUnion([0],1),2);
assert.equal(conditional(1,2),0.5);assert.throws(()=>conditional(0,0));assert.deepEqual(mix([2,3],[[1,0],[0,1]]),[2,3]);near(Math.log10(100),2);
console.log('PASS known controls before witnesses: vector operations, two-point scale, degeneracy rejection, ambiguity, ruler spread, interval measure, conditional probability, identity transfer, logarithm.');
// CO-04: analytic primitive of 3*t^2 is t^3; no numerical quadrature.
const M=t=>t**3, sourceIntegral=2**3-1**3, doubleDilution=sourceIntegral-sourceIntegral;
assert.equal(M(2)-M(1),7);assert.equal(sourceIntegral,7);assert.equal(doubleDilution,0);
console.log('CO-04: a=t,rho=1,H=1/t,S=3/t on [1,2]; endpoint and corrected integral 7; baseline expression 0.');
// CO-05: unit path length and two unit frequency bins.
assert.deepEqual(mix([2,3],[[0.5,0.25]]),[1.75]);
console.log('CO-05: two emitted channels contribute 1 + 0.75 = 1.75; either single channel omits a nonzero term.');
// CO-10: closed-form perpendicularity is the reference, not another EOM implementation.
const n=[0,1,0],o=[2,0,0],center=[0,0,0],omega=[0,0,3],D=4,x=add(o,mul(n,D));
const template=(gD,g0)=>dot(n,sub(mul(cross(omega,sub(x,center)),gD),mul(cross(omega,sub(o,center)),g0)));
near(template(1,1),0);near(template(2,1),6);near(dot(n,cross(omega,n)),0);
console.log('CO-10: nonzero rigid rotation gives radial template 0; g(D)=2,g(0)=1 gives reduced dipole value 6.');
// CO-11: collinear windows, changed absolute scale and orientation, identical normalized shape.
const p=[[0,0,0],[1,0,0],[3,0,0]],a=shape(p),b=shape(p.map(v=>mul(v,2))),r=shape(p.map(v=>[-v[1],v[0],v[2]]));
a.u.forEach((x,i)=>{near(x,b.u[i]);near(x,r.u[i]);});near(sum(a.u.map(x=>x*x))/a.u.length,1);near(b.L/a.L,2);
console.log('CO-11: 3-point normalized shape unchanged by factor-2 dilation or 90-degree rotation; second moment 1; scaled-window density differs by factor 8.');
// CO-12: 51 freely selectable records cover the full [0,1] output domain.
const centers=Array.from({length:51},(_,i)=>i/50);
near(intervalUnion(centers,0.01),1.02);
console.log('CO-12: each interior interval width 0.02; union [-0.01,1.01] covers [0,1], showing fixed-record narrowness is insufficient.');
// CO-13/14: conditioning is not a derived measure.
assert.equal(conditional(0.1,0.1),1);near(-Math.log(conditional(0.1,0.1)),0);assert.throws(()=>conditional(0,0));
console.log('CO-13/14: conditioning on the fit itself yields probability 1 and burden 0; zero denominator rejected.');
// CO-15: distance tolerance is nontransitive; an all-false or empty family has no disagreement.
assert(Math.abs(0-0.75)<=1 && Math.abs(0.75-1.5)<=1 && Math.abs(0-1.5)>1);
assert.equal(ambiguity([false,false]),0);assert.equal(ambiguity([]),0);
console.log('CO-15: 0,0.75,1.5 with tolerance 1 is nontransitive; all-false and empty indicators both 0.');
assert.equal(coherent([2,2,2]),0);assert.equal(Math.max(...[2,2,2].map(x=>Math.abs(x-1))),1);
console.log('CO-16: all ruler values 2 give coherence residual 0 while all differ from comparison value 1.');
console.log('PASS 8 witness groups; numerical values are normalized illustrative checks with c_f=1, not cosmological measurements.');

NODE
```

## Final verification

The complete chapter and receipt were reread using nl/sed. The post-creation structural block passed on both authorized paths: chapter 216 math spans, 57 links and 52 local targets; receipt 9 math spans, 35 links and 30 local targets. KaTeX strict rendering, original link-occurrence/heading/equation-ID preservation, two Markdown heading fragments, and 34 equation routes passed. The eight arithmetic witness groups passed after their known controls. These are bounded syntax, structural, and mathematical checks, not independent physical acceptance.

The post-receipt node scripts/validate-content.mjs --check --strict run exited 0 with 199 corpus Markdown files, 1706 repository Markdown files audited, 0 errors, 0 warnings, and 30 informational notes. The two-path git --no-optional-locks diff --check HEAD exited 0 with no output. The two-path rg search for trailing blanks returned no matches (exit 1). These commands establish the reported checks at this snapshot only; they do not certify unrelated tests or generated freshness.

The final scoped git --no-optional-locks status --short inspection showed the chapter staged and this receipt untracked. This worker ran no staging command and does not attribute the index change to any particular actor. git show of the chapter's index entry piped to shasum -a 256 and shasum -a 256 of its working file both returned 0dc4d1ad5ab8657e954feb90513183cf8683c416f4cfa3403c53c2e4f4b41d2b. The staged state was preserved. The scoped HEAD diff reported 82 insertions and 65 deletions in the chapter. A reread of the receipt's CO-prefixed finding headings confirms the 11 High and 6 Medium groups above.

No source-level repair blocker remains in this assignment. Generated equation-registry freshness and independent shared-record integration remain deferred under CO-O5 and CO-O6. Next concrete step: the authorized coordinator verifies this chapter hash and two-file diff, independently accepts or reopens the findings, and records the disposition in shared CRW owners. This worker does not mark priority 59, CRW-005, downstream consumers, or theory closure complete.
