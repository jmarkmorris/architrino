# CRW-005 Synchrotron — bounded review and repair receipt

Date: 2026-09-12. Priority: 52. Disposition: bounded chapter review and repairs completed; final validation results are recorded below. This is the editor's complete chapter review and self-review. Source comparisons and explicit mathematical witnesses provide bounded independent references; they do not constitute an independent review by a second editor or an accepted EOM solver run.

## Scope and provenance

The assignment authorizes edits only to [Synchrotron](../../../../content/markdown/aaa/reactions/synchrotron.md) and creation of this receipt. Shared status, priorities, work queue, work log, conversion ledger, generated artifacts, fixtures, other chapters, code, and publication files are outside the write scope. This task ran no staging, commit, push, reset, stash, regeneration, or linked-worktree operation.

Measured at entry by the two-path git status command below, neither authorized path had a status entry; the chapter was clean. The shell absence check confirmed this receipt did not exist. The chapter's SHA-256 from shasum matched the supplied dispatch value exactly:

- Baseline chapter SHA-256: d3f784aee6e56a179a562e52e6fade118e427cfc1d8885bde0eb0cf295ab2188.
- The immutable commit 859f2b07cb17889ca2c239d82fd61455c2ba903c contains the same chapter bytes, checked by git show piped into shasum. It supplies the reproducible baseline, regardless of later ambient HEAD changes.
- Baseline line references in this receipt refer to the 599-line chapter displayed with nl -ba before editing. Final references refer to the 611-line chapter reread with nl -ba.
- Final chapter SHA-256: 635754650cd1bc9d00d3d2b05273b856fea7cba691f2fd03af02d5e2454bc20e.
- The bounded preservation comparison is against the dispatch chapter, not a claim of complete reconstruction of the September 4 conversion history.

The live [review status](../corpus-review-status.md) identifies Synchrotron as priority 52. The CRW-005 request and acceptance row in [work queue](../work-queue.md) supplies the assurance contract; [priorities](../priorities.md) supplies the current phase-first ordering, and [conversion ledger](conversion-ledger.md), line 97, records the earlier Synchrotron style pass. Historical aggregate counts in these owners are not recomputed or changed here. The operator's explicit two-file repair assignment controls over the default review-only cadence.

The repository's generated equation registry and textbook/scene graphs refer to this chapter. A scoped basename/hash search in scripts, tests, content/graph, and scripts/config found the graph references, and the generator implementation identifies content/generated/equation-mapping/corpus-equations.json as a consumer of equation context and symbols. That search is not a claim of no consumers elsewhere. Stable equation links and all original displayed TeX were retained.

## Sources and live owners inspected

The preparation read [AGENTS.md](../../../../AGENTS.md), the [generated startup router](../../../op/agent-startup-orientation.generated.md), the [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), the complete [corpus reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), and [operator explanation standard](../../../op/operator-explanation-standard.md). The [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [source policy](../../../../content/markdown/aaa/archie/about-architrino.md) supplied the task-relevant notation, level, preservation, and reference rules.

Theory dependency reads inspected the relevant opening definitions and causal-law passages of [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md), and [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md). The [geometry and dynamics role packet](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) was used only as an analytical lens.

Channel dependencies inspected were [Mode Taxonomy](../../../../content/markdown/aaa/reactions/mode-taxonomy.md), opening scope and referent boundary; [Radiation](../../../../content/markdown/aaa/reactions/radiation.md), the always-on wake distinction, residual weights, planar threshold, and source-depletion accounts; [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), photon referent status and Gates A/B/C; and [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md#noether-sea-braid-cadence), lines 254–300, for the separate sea cadence and matter-clock identification. These are dependency checks, not additional chapter reviews.

External references were inspected for observer-level comparisons only:

| Source | Inspected support and access boundary |
| --- | --- |
| Wayne Hu, [Synchrotron](https://background.uchicago.edu/~whu/Courses/Ast305_10/ast305_10.pdf), AST 305 Set 10, 2010 | Author-hosted derivation of single-pitch power, isotropic averaging, and broadband radiation. It supplies a comparison calculation, not substrate dynamics. |
| Sari, Piran, Narayan, [Spectra and Light Curves of Gamma-Ray Burst Afterglows](https://arxiv.org/html/astro-ph/9712005), 1998, DOI 10.1086/311269, Section 2, equations (3)–(8) | Slow/fast ordering, separate bulk and electron Lorentz factors, cooling break, and spectral segments. The local chapter uses its own declared source frame. |
| Granot, Piran, Sari, [Synchrotron Self Absorption in GRB Afterglow](https://arxiv.org/pdf/astro-ph/9808007), 1999, DOI 10.1086/308052, Section 1, PDF page 2 | Explicit low-frequency squared-frequency branch when the absorption turnover lies below the injection frequency. |
| Gould and Schréder, [Pair Production in Photon-Photon Collisions](https://doi.org/10.1103/PhysRev.155.1404), 1967 | Publisher metadata and the search-accessible text of equations (1)–(2) in the [university-hosted primary-paper copy](https://catedras.fcaglp.unlp.edu.ar/astrofisica/media/Papers/Gould_Schreder_1966.pdf) supplied the cross section and threshold. Direct full-PDF opening failed twice; no claim of full-paper verification is made. |
| Bandiera and Petruk, [Synchrotron polarization with a partially random magnetic field](https://arxiv.org/html/2405.14534v1), 2024, Section 2 | Projected polarization components, the electron-spectrum-dependent linear fraction, and averaging over field directions. |

The prior loose Rybicki–Lightman/radio-pulsar attribution did not identify a measured data set supporting the claimed universal polarization range. It was replaced with a defined comparison relation and the inspected polarization source; this does not assert that the named textbook itself is wrong.

## Findings and implemented repairs

The following 18 finding groups are the counted disposition: 11 high and 7 medium. High denotes a wrong inference, missing condition that changes the physical conclusion, or theory-level overclaim; medium denotes a material definition, applicability, or reporting defect. All 18 received bounded local repairs. They do not count every changed sentence as a separate finding.

| ID | Severity | Baseline lines | Final lines | Demonstrated local issue and smallest repair implemented |
| --- | --- | --- | --- | --- |
| SYN-01 | High | 7–80 | 7–82 | Pitch-averaged ultrarelativistic power appeared as a general per-particle law, and local quantities lacked one frame. Declared the local plasma frame, classical range, finite-speed factor and single-pitch law; distinguished the number-weighted critical-frequency mean from a spectrum peak. |
| SYN-02 | Medium | 88–124, 349–352 | 90–126, 351–354 | Injection and resident distributions were conflated; slow/fast inequalities lacked their evaluation energy and the cutoff was described as an absolute maximum. Distinguished injection, cooling, residence duration and finite spectral ranges; repaired repeated regime labels. |
| SYN-03 | High | 126–136, 343 | 128–138, 345 | The optically thick five-halves slope was universalized. Retained it only for the sampled power-law electron interval and supplied the truncated-distribution squared-frequency countercase. |
| SYN-04 | Medium | 140–146 | 142–148 | The one-percent convention could be read as a measured completeness guarantee, while triplet importance was tied to magnetic strength alone. Required energy/angle-dependent contribution and feedback assessment and identified the list as the pedagogical loop. |
| SYN-05 | Medium | 166–201 | 168–203 | The local norm omitted its positive weights, phase comparison chart, history interval, and root-Jacobian meanings. Supplied those definitions and kept the weights and constitutive response unproved. |
| SYN-06 | High | 203–239, 404 | 205–241, 406 | Passing a provisional threshold was treated as photon formation, and each emitted frequency as the critical scale. Made the screen conditional and necessary only, retained the conditional energy floor, and defined the frequency residual on a broadband distribution. |
| SYN-07 | High | 245–278 | 247–280 | The event equality lacked a sign/partition definition sufficient to prevent recoil and remnant double counting. Defined before-minus-after depletion, signed transfers, common window/frame/origin, external input, and disjoint allocation; balance remains a condition. |
| SYN-08 | High | 282, 406–413 | 284, 408–415 | Four-momentum units were unspecified and one threshold omitted the fourth power of light speed. Defined energy-valued four-vectors and one energy-squared invariant; supplied the momentum-valued translation and the separate pair-speed meaning in the retained formula. |
| SYN-09 | Medium | 300–341 | 302–343 | Angular and total power lacked an emission-time versus arrival-time convention, while normalized residuals failed at zero reference values. Declared the time Jacobian and the nonzero domain; zero-deflection cases require absolute residuals. |
| SYN-10 | High | 284–299, 345, 405 | 286–301, 347, 407 | Polarization was stated as universally 70–75 percent and transverse to emitter velocity. Defined the resident-exponent law, projected electric-vector basis, modulo-pi angle, and uncertainty-limited test. |
| SYN-11 | Medium | 363–386, 585 | 365–388, 591 | Continuum was said to prove ordered magnetism and leptonic content, and X-rays were assigned to inverse Compton without source selection. Recast these as model-conditioned inference, retained competing components, and distinguished explanatory gain from a novel observable. |
| SYN-12 | High | 22, 150, 201, 405, 419–423 | 22, 152, 203, 407, 421–425 | The curvature description placed effective magnetic forcing at substrate level and prescribed gradients without recovering uniform-field deflection. Restored constituent delayed acceleration and the uniform-state comparison; directional sea response remains provisional. |
| SYN-13 | Medium | 405, 413, 423, 564 | 407, 415, 425, 570 | Fifteen degrees, a factor of two, and ten percent were treated as physical acceptance or new-physics criteria; extreme locations were presumed unconstrained. Retained these as proposed screens where useful and required evidence for a model discrepancy or empirical bound. |
| SYN-14 | High | 437–461 | 439–463 | A large product of cooling and interaction ratios was identified with deep pair loading, while an unaveraged cross section stood in for a radiation bath. Kept the heuristic, separated both controls, defined the angular/energy average, and supplied a counterexample. |
| SYN-15 | High | 465–490 | 467–494 | A collisionless intensity invariant and scalar attenuation were extended to arbitrary scattering; proximity implied transparency. Restricted the equation to its diagonal transport limit and required redistribution and source terms for scattering. Distinguished the positive frequency ratio from its signed logarithm. |
| SYN-16 | Medium | 492–524 | 496–528 | Scalar cold-plasma dispersion was presented for unspecified magnetized material; evanescence, reflection, absorption, and longitudinal excitation were insufficiently separated. Declared the cold unmagnetized SI comparison, boundary dependence, tensor-response limit, and attenuation convention. |
| SYN-17 | High | 344, 526–564 | 346, 530–570 | Local cooling, detector arrival, sea cadence, and assembly clock were conflated; instantaneous clock rescaling implied a finite cooling duration. Restored the distinct maps, chain-rule scope, finite-interval integral, and limited interpretation of the existing numerical display. |
| SYN-18 | High | 239–240, 429–433, 599 | 241–242, 431–435, 611 | The footnote's braid-only count omitted participating photon identities or residual sea content unless an unstated partition was imposed. Reconciled the channel summary and footnote with complete initial/final identity and polarity routing. |

## Claim grades, witnesses, and falsifiers

Each baseline-text observation above is measured by the complete numbered source read and scoped baseline diff. Its falsifier is a mismatch between the cited baseline bytes/lines and the stated finding. The repairs' mathematical justification is bounded as follows.

1. **SYN-01–SYN-03 — standard comparison and conditional derivation.** Claim grade: derived for the angle moments under isotropy: the normalized measure is $\sin\alpha\,d\alpha/2$, whose first and second sine moments are $\pi/4$ and $2/3$. This converts the single-pitch coefficient 2 into the mean coefficient $4/3$; at zero pitch the magnetic radiation vanishes. For continuous injection and loss rate $d\gamma/dt_{\mathrm{eff,src}}=-a\gamma^2$ with $a>0$, the cooled distribution away from the upper cutoff is proportional to $\gamma^{-2}\int_\gamma^{\gamma_{\max}}Q_{\mathrm{inj}}(u)\,du$, which has exponent $p+1$ in the high-energy power-law interval. The self-absorption countercase is a checked external comparison, not an architrino derivation. Falsifiers: a different normalized angular measure, competing cooling, or a different cutoff ordering invalidates the corresponding simplified formula rather than validating an unrestricted use.

2. **SYN-04–SYN-06 — definitions versus candidate dynamics.** Claim grade: derived for the need for positive norm weights and a consistent phase chart. A negative weight can make a squared norm negative; replacing a phase representative by itself plus $2\pi$ can change an unwrapped difference without changing the phase. A finite list of inequalities supplies no evolution or persistence proof by itself. Claim grade: guessed for the physical residual functional, photon threshold, sea-mediated mechanism, and nonzero photon-energy floor. Falsifiers: a same-history constitutive derivation and independently checked formation/persistence result would resolve the open dynamic obligations; a screened history that fails to form a photon defeats sufficiency for that screen.

3. **SYN-07–SYN-08 and SYN-18 — ledger and dimensional algebra.** Claim grade: derived for the required disjoint accounting and effective threshold translation. Summing the components of $k_i=(E_i,c\mathbf p_i)$ using the declared comparison metric gives $s=2E_1E_2(1-\cos\theta_{12})$. No substrate metric is inferred. Counting incoming photon constituents plus participating sea constituents requires counting both final pair and residual medium; a braid-only equality needs its extra routing condition. Falsifiers: an explicitly different but dimensionally consistent convention, or a complete nonoverlapping inventory proving the narrower partition, changes which expression is applicable. These identities do not prove a conserved energy functional for the primitive law.

4. **SYN-09–SYN-11 — power and observational inference.** Claim grade: derived for the arrival-time Jacobian: differentiating source emission time plus source-to-observer distance divided by $c$ gives $dt_{\mathrm{eff,arr}}/dt_{\mathrm{eff,src}}=1-\beta\cos\theta$ for a distant stationary detector and a moving emitter. The angular integral below is checked against the independent analytic total-power expression already present in the baseline; neither formula was altered. The polarization fractions $9/13$ and $3/4$ follow by substituting resident exponents 2 and 3 in the comparison law. Claim grade: inferred for the limitation of continuum-only composition and field-order inference; summed intensity can remain positive when independently oriented polarization contributions cancel. Falsifiers: a source-resolved data set establishing the specific component or field organization can support a narrower observational inference; it cannot make the original universal inference valid.

5. **SYN-12–SYN-13 — response and acceptance scope.** Claim grade: derived for the uniform-state obstruction: all spatial derivatives of a constant directional state vanish, while the stated uniform-field comparison has nonzero transverse deflection for nonparallel velocity. This refutes a gradients-only realization, not every possible sea map. Claim grade: guessed for the numerical screens and alternative physical mechanism. No source-specific measurement in the inspected chapter establishes the numerical screens as universal error budgets. Falsifiers: a declared additional response term resolves the uniform-state obstruction; an identified experiment with quantified uncertainty can establish a tolerance for its own regime.

6. **SYN-14 — product counterexample.** Claim grade: derived under the homogeneous independent-interaction comparison. With the two positive ratios $10^6$ and $10^{-3}$, their product is $10^3$ but the single-path conversion probability is $1-e^{-10^{-3}}=0.0009995001666250085$. This defeats the inference from product alone to substantial conversion per generation. It does not rule out high photon multiplicity or a cascade in a different injection spectrum. Falsifier: a claimed theorem must add assumptions that exclude this case or establish its secondary reproduction rate. No source calculation is supplied here.

7. **SYN-15–SYN-16 — transport domain.** Claim grade: derived for the scalar-transport obstruction: an input intensity vector $(1,0)$ passed through a redistribution map with output $(1/2,1/2)$ acquires a populated second frequency bin. A diagonal attenuation of that input cannot do this. Squaring a passive mode amplitude $\exp(-k_2\ell)$ gives intensity attenuation $\exp(-2k_2\ell)$. A scalar dielectric model requires its own material assumptions; it is not obtained from the magnetic synchrotron environment alone. Falsifiers: a demonstrated diagonal scattering limit or a derived appropriate dielectric response justifies the corresponding reduced equation on that domain.

8. **SYN-17 — finite-clock counterexample.** Claim grade: derived conditional on the declared comparison law. For $d\gamma/dT=-a\gamma^2$ and $\Gamma_{\mathrm{eff}}=\gamma$, the interval is $\Delta T=(\gamma_f^{-1}-\gamma_i^{-1})/a$, while $\Delta\tau_{\mathrm{asm}}=(\gamma_f^{-2}-\gamma_i^{-2})/(2a)$. With $a=1$, $\gamma_i=100$, and $\gamma_f=50$, these are $0.01$ and $0.00015$; division of $\Delta T$ by the initial factor gives $0.0001$, a different result. The original $7.7\times10^4$-second and $7.7$-second display is retained as a rounded instantaneous comparison, not newly certified dimensional physics. Falsifier: an effectively constant clock factor permits finite multiplication; a tested sea-clock and observer-chart map is still needed before identifying the clocks.

All new numerical witnesses use normalized wake-speed units $c_f=1$ and otherwise dimensionless comparison parameters. No numerical substrate wake speed was set from SI or Gaussian light-speed constants. The arithmetic checks test algebra and stated approximation boundaries, not nature or a retained particle.

## Validation results and boundaries

The complete chapter was reread in numbered source form after repairs, and all changed paragraphs were compared with the immutable dispatch baseline. The final small changes to the pair summary, repeated regime labels, positive frequency ratio, and proposed cooling screen were reread separately. Original 32 displayed TeX expressions and their 32 viewer identities are byte-identical and in the same order by the controlled parser comparison. Changed inline mathematics are deliberate scope/definition corrections, not a claim of byte preservation for every inline expression.

The source checker first passed known controls for inline/display extraction, malformed math, valid/invalid KaTeX, code-fence exclusion, Markdown links, heading fragments, and present/absent files, then ran on the chapter. It reports 319 accepted chapter math expressions, 49 local link occurrences, one Markdown heading fragment, and 32 viewer identities. Viewer checking verifies the retained identity and existing destination file; generated registry freshness is checked separately. This is source and KaTeX parsing, not a visual browser review.

The numerical witness instrument first returned the known integrals of $x^2$ and a constant, and only then ran groups A1–A9. All nine groups passed. Their references are the explicit analytic identities and counterexamples above, plus the unchanged comparison formulas. No oracle, fixture, or solver was modified.

The two authorized files pass the controlled KaTeX, math-delimiter, local-file-link, applicable heading-fragment, and trailing-whitespace checks. The receipt contributes 38 accepted math expressions, 36 local link occurrences, and one Markdown heading fragment; its embedded instruments are excluded as fenced code. The scoped baseline `git diff --check` command exited 0 with no output; the explicit two-file whitespace search exited 1 with no output, meaning no matches. The scoped chapter diff reports 76 insertions and 64 deletions; the untracked receipt is additional. Neither check authorizes a repository-wide clean claim.

The first repository-wide `node scripts/validate-content.mjs --check --strict` run exited 1 with 4 errors, 0 warnings, and 30 notes. Its measured scope was 391 scene configs, 199 content Markdown files, and 1694 repository Markdown files. All four reported errors were outside the authorized paths and pointed to the absent literal target `tests/current-launch-bindings.test.js`:

| Reported file | Line | Invalid target in that file |
| --- | --- | --- |
| [Cached-root cover cutover](../../development-process-review/analysis/option-b-cached-root-cover-cutover.md) | 53 | `../../../../tests/current-launch-bindings.test.js` |
| [Cached-root cover full cutover](../../development-process-review/analysis/option-b-cached-root-cover-full-cutover.md) | 51 | `../../../../tests/current-launch-bindings.test.js` |
| [Current-source cutover inventory](../../development-process-review/analysis/option-b-current-source-cutover-inventory.md) | 85 | `../../../../tests/current-launch-bindings.test.js` |
| [Prescribed-response and acceleration cutover](../../development-process-review/analysis/option-b-prescribed-response-and-acceleration-cutover.md) | 5 | `../../../../tests/current-launch-bindings.test.js` |

The second run of the same strict command, after final chapter edits, exited 1 with 1 error, 0 warnings, and 30 notes at the same reported audit counts. It no longer listed those four targets. Its sole error was [the concurrent Radiation review receipt](crw-005-radiation-review-2026-09-12.md), line 50: target `y` was reported as resolving to absent `reference/priorities/aaa-corpus-rewrite/evidence/y`. A numbered source read showed that target inside an inline-code TeX example, not a prose link. A separate `marked` token check first passed controls excluding an inline-code link and retaining a prose link, then returned no link token for that exact line. This is a measured disagreement with strict validation on a code example, not a demonstrated broken prose link. No validator root cause or historical attribution is assigned here. These sequential results reflect the shared live tree and do not establish a green repository-wide state. The owning coordinator should route the validator/example discrepancy for separate-scope resolution and rerun strict validation; this worker did not edit the other receipt, validator, or the four earlier documents.

The read-only `node scripts/build-equation-mapping-corpus.mjs --check` exited 1: `content/generated/equation-mapping/corpus-equations.json` is stale. The command reported 199 Markdown files, 4685 displayed equations, 23 promoted equations, and 30439 symbol definitions. This edit changes fingerprinted chapter context, so registry drift is an expected consequence; the check does not attribute every registry difference to this chapter rather than concurrent work. No generator write was run. Deferred exact command, for an explicitly authorized regeneration or publication runner only: `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check`. The existing viewer identities remain preserved; registry freshness remains unclosed.

No repair is blocked by missing authority. Physical branch existence, constitutive recovery, independently accepted EOM evolution, photon Gates A/B/C, observational acceptance, theory closure, and downstream closure remain unestablished. The next concrete step is coordinator inspection of these exact chapter bytes and this receipt before updating shared CRW-005 records; shared-record integration is outside this worker's scope.

## Reproduction commands

Run the following from the repository root. They are read-only checks; the two JavaScript instruments embedded below require the repository's installed Node dependencies. Run each JavaScript block as standard input to `node --input-type=module` from that same root; no helper file is required.

```bash
git --no-optional-locks status --short -- content/markdown/aaa/reactions/synchrotron.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-synchrotron-review-2026-09-12.md
shasum -a 256 content/markdown/aaa/reactions/synchrotron.md
git --no-optional-locks diff --check 859f2b07cb17889ca2c239d82fd61455c2ba903c -- content/markdown/aaa/reactions/synchrotron.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-synchrotron-review-2026-09-12.md
rg -n '[[:blank:]]+$' content/markdown/aaa/reactions/synchrotron.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-synchrotron-review-2026-09-12.md
node scripts/validate-content.mjs --check --strict
node scripts/build-equation-mapping-corpus.mjs --check
```

The whitespace search returns exit 1 with no output when it finds no trailing whitespace. Git diff does not inspect an untracked report; the explicit whitespace search and source checker cover it.

### Source validation instrument

```javascript
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import katex from 'katex';
import {marked} from 'marked';
import {parseCorpusDisplayEquations as displays} from './scripts/build-equation-mapping-corpus.mjs';
const chapter='content/markdown/aaa/reactions/synchrotron.md';
const receipt='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-synchrotron-review-2026-09-12.md';
function visible(s){let fence=null;return s.split('\n').map(line=>{
 const f=line.match(/^\s*(\x60{3,}|~{3,})/);
 if(f){if(!fence)fence=f[1][0];else if(fence===f[1][0])fence=null;return '';}
 return fence?'':line.replace(/\x60+[^\x60]*\x60+/g,'');
}).join('\n');}
function maths(source){
 const s=visible(source),out=[];let i=0;
 const escaped=p=>{let n=0;while(p>0&&s[--p]==='\\')n++;return n%2===1;};
 while(i<s.length){
 if(s[i]!=='$'||escaped(i)){i++;continue;}
 const d=s[i+1]==='$'?'$$':'$';const start=i;i+=d.length;let j=i;
 while(j<s.length&&(s.slice(j,j+d.length)!==d||escaped(j)))j++;
 assert(j<s.length,'Unclosed math at '+start);
 const tex=s.slice(i,j);assert(tex.trim(),'Empty math');out.push({tex,display:d==='$$'});i=j+d.length;
 }return out;
}
function links(s){let out=[];marked.walkTokens(marked.lexer(s),t=>{if(t.type==='link'||t.type==='image')out.push(t.href);});return out;}
function anchors(s){
 const set=new Set(),counts=new Map();
 marked.walkTokens(marked.lexer(s),t=>{if(t.type==='heading'){
 const base=t.text.toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}_\-\s]/gu,'').replace(/\s/g,'-');
 const n=counts.get(base)||0;counts.set(base,n+1);set.add(base+(n?'-'+n:''));
 }});
 for(const m of s.matchAll(/\b(?:id|name)=["']([^"']+)["']/g))set.add(m[1]);return set;
}
const same=(a,b)=>assert.deepEqual(a,b);
same(maths('# Known\n$x^2$ \x60$bad$\x60\n\x60\x60\x60\n$hidden$\n\x60\x60\x60\n$$\n\\frac{1}{2}\n$$\n\\$5').map(x=>x.tex),['x^2','\n\\frac{1}{2}\n']);
assert.throws(()=>maths('$unclosed'));
katex.renderToString('\\frac{1}{2}',{throwOnError:true});assert.throws(()=>katex.renderToString('\\unknowncommand',{throwOnError:true}));
same(links('[ok](AGENTS.md)\n\x60\x60\x60\n[no](missing.md)\n\x60\x60\x60\n\x60[no](missing.md)\x60'),['AGENTS.md']);
same([...anchors('# A heading\n\n## A heading')],['a-heading','a-heading-1']);
assert(!fs.existsSync('known-case-nonexistent-synchrotron.md'));assert(fs.existsSync('AGENTS.md'));
const known='# A\n$$\nx^2\n$$\n\n[View →](equation-mapping.html#corpus-equation-known)\n\x60\x60\x60\n$$\ny\n$$\n\x60\x60\x60';
assert.equal(displays('known.md',known).length,1);assert.equal(displays('known.md',known)[0].tex,'x^2');
console.log('Known controls PASS: math, malformed math, KaTeX, code exclusion, links, anchors, file existence, display parser.');
const baseline=execFileSync('git',['show','859f2b07cb17889ca2c239d82fd61455c2ba903c:'+chapter],{encoding:'utf8'});
assert.equal(createHash('sha256').update(baseline).digest('hex'),'d3f784aee6e56a179a562e52e6fade118e427cfc1d8885bde0eb0cf295ab2188');
const current=fs.readFileSync(chapter,'utf8'),oldEq=displays(chapter,baseline),newEq=displays(chapter,current);
same(newEq.map(x=>x.tex),oldEq.map(x=>x.tex));
same(newEq.map(x=>x.existingLink?.text),oldEq.map(x=>x.existingLink?.text));
console.log('Baseline preserved:',oldEq.length,'display formulas and viewer identities, in order.');
for(const file of [chapter,...(fs.existsSync(receipt)?[receipt]:[])]){
 const source=fs.readFileSync(file,'utf8'),ms=maths(source);
 for(const m of ms)katex.renderToString(m.tex,{throwOnError:true,displayMode:m.display,strict:'error'});
 let local=0,fragments=0,viewer=0;
 for(const href of links(source)){
 if(/^(https?:|mailto:|data:)/.test(href))continue;
 const [rel,fragment]=href.split('#');
 const target=path.resolve(path.dirname(file),decodeURIComponent(rel||path.basename(file)));
 assert(fs.existsSync(target),file+': missing '+href);local++;
 if(fragment){
 if(target.endsWith('.md')){assert(anchors(fs.readFileSync(target,'utf8')).has(decodeURIComponent(fragment)),file+': unresolved fragment '+href);fragments++;}
 else if(fragment.startsWith('corpus-equation-')){assert.equal(path.basename(target),'equation-mapping.html');viewer++;}
 else assert(fs.readFileSync(target,'utf8').includes(fragment),file+': unresolved HTML anchor '+href);
 }
 }
 assert(!/[ \t]+$/m.test(source),file+': trailing whitespace');
 console.log(JSON.stringify({file,math:ms.length,localLinks:local,markdownFragments:fragments,viewerIdentities:viewer,sha256:createHash('sha256').update(source).digest('hex')}));
}
```

### Arithmetic witness instrument

```javascript
import assert from 'node:assert/strict';
const c_f=1;assert.equal(c_f,1);
const near=(x,y,tol=1e-10)=>assert(Math.abs(x-y)<=tol, x+' != '+y);
function simpson(f,a,b,n=20000){let sum=f(a)+f(b),h=(b-a)/n;for(let k=1;k<n;k++)sum+=(k%2?4:2)*f(a+k*h);return sum*h/3;}
near(simpson(x=>x*x,0,1),1/3);near(simpson(x=>1,0,2),2);
console.log('Known controls PASS: Simpson integral x^2 = 1/3 and constant integral = 2; c_f=1.');
near(simpson(x=>Math.sin(x)/2,0,Math.PI),1);
near(simpson(x=>Math.sin(x)**2/2,0,Math.PI),Math.PI/4);
near(simpson(x=>Math.sin(x)**3/2,0,Math.PI),2/3);
near((3/(4*Math.PI))*(Math.PI/4),3/16);
console.log('A1 PASS: pitch measure and both moments; mean-frequency coefficient.');
const arrivalRatio=(bulk,angle)=>{const beta=Math.sqrt(1-1/bulk**2);return bulk*(1-beta*Math.cos(angle));};
near(arrivalRatio(1,0),1);
assert(arrivalRatio(10,0)<0.051);
console.log('A2 PASS: fixed-source arrival control and distinct bulk Doppler factor.');
for(const beta of [0,0.5,0.8]){
const gam2=1/(1-beta*beta);
const integral=2*Math.PI*simpson(x=>{const f=1-beta*x;return f**-3-(1-x*x)/(2*gam2*f**5);},-1,1);
near(integral,(8*Math.PI/3)*gam2*gam2,1e-7);
}
console.log('A3 PASS: angular power integrates to 8pi gamma^4/3 for beta=0,0.5,0.8.');
const s=(E1,E2,cos)=>2*E1*E2*(1-cos);
near(s(1,1,-1),4);near(s(1,1,1),0);near(s(1,2,0),4);
const betaPair=Math.sqrt(1-4/8);near(betaPair,1/Math.sqrt(2));
const sig=(3/16)*(1-betaPair**2)*((3-betaPair**4)*Math.log((1+betaPair)/(1-betaPair))-2*betaPair*(2-betaPair**2));
assert(sig>0.255&&sig<0.256);
console.log('A4 PASS: pair threshold limits and cross-section value at s/(m_e^2 c^4)=8:',sig);
const pol=p=>(p+1)/(p+7/3);
near(pol(2),9/13);near(pol(3),3/4);
near(Math.sin(Math.PI)**2,0);
console.log('A5 PASS: polarization fractions and pi-periodic residual.');
const product=1e6*1e-3,prob=-Math.expm1(-1e-3);
near(product,1000);assert(prob>0.000999&&prob<0.001);
console.log('A6 PASS: large product with small pair conversion:',{product,prob});
const g0=100,g1=50,a=1,dt=(1/g1-1/g0)/a,dclock=(1/g1**2-1/g0**2)/(2*a);
near(dt,0.01);near(dclock,0.00015);near(dt/g0,0.0001);near(dclock/(dt/g0),1.5);
near(7.7e4/1e4,7.7);
console.log('A7 PASS: finite-clock counterexample and retained instantaneous rounded quotient.');
const incoming=[1,0],outgoing=[0.5*incoming[0],0.5*incoming[0]+incoming[1]];
assert(outgoing[1]>0);assert.equal(42*incoming[1],0);
console.log('A8 PASS: off-diagonal redistribution creates intensity absent from diagonal input.');
const nPhoton=24,nSea=24,nPair=24,nRemnant=24;
assert.equal(nPhoton+nSea,nPair+nRemnant);
assert.notEqual(nPhoton+nSea,nPair);
near(Math.exp(-0.2)**2,Math.exp(-0.4));
console.log('A9 PASS: whole-event count partition and amplitude-to-intensity attenuation.');

```
