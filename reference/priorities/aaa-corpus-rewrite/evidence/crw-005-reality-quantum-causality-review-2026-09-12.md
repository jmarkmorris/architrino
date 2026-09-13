# CRW-005 Reality Quantum Causality — bounded review and repair

## Disposition and scope

✓ Done: complete chapter review and bounded local repair for priority 54, dated 2026-09-12. The finding inventory below contains RQC-01–RQC-18: 18 finding groups, comprising 10 High and 8 Medium. High denotes an unsupported mathematical or physical implication affecting the causal, statistical, measurement, or cost account; Medium denotes a necessary scope, definition, or representation correction.

The only authorized writes are the [chapter](../../../../content/markdown/aaa/quantum/reality-quantum-causality.md) and this receipt. Shared status, priorities, work queue, work log, conversion ledger, other chapters, generated artifacts, fixtures, code, and publication state are outside this assignment. The coordinator retains shared-record integration authority. This is editor self-review with explicit mathematical counterexamples and separately authored comparison references; it is not an independent second-agent review or an EOM solver acceptance run.

Measured before editing by scoped git status, the target chapter had no staged or unstaged changes, and a filesystem absence test confirmed that this receipt did not exist. The measured dispatch SHA-256 from shasum -a 256 was:

```text
e171e34c24879d5743b70d5514af3e7b750d762b8119bd0ba410845b5f15d4f3
```

The identical chapter bytes are retained at Git revision 2490eb54aef24bf6d9a49cbc7ba62f1e54553305, verified by hashing that revision's file before using it for preservation checks. This establishes a reproducible baseline without assuming the current branch or index remains fixed. Baseline line references below refer to the complete 530-line dispatch source read with nl -ba; repaired references refer to the complete 535-line chapter after this assignment.

## Sources, owners, and bindings inspected

The preparation read the complete [AGENTS.md](../../../../AGENTS.md), [generated startup router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), the [corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), and [operator explanation standard](../../../op/operator-explanation-standard.md). The operator's explicit two-file repair authority supplies the implementation scope; the procedure's ordinary review-only boundary does not remove that authority.

The [CRW-005 owner](../work-queue.md#crw-005--independent-post-conversion-assurance-review), [priorities](../priorities.md#crw-005-status-board), [document board](../corpus-review-status.md), and [conversion ledger](conversion-ledger.md) were inspected read-only. The live document board assigns this chapter priority 54, and conversion-ledger line 99 records the earlier explanation-format conversion. The present review uses the operator-specified dispatch source as its baseline; it does not certify every historical pre-conversion byte.

The [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [reference policy](../../../../content/markdown/aaa/archie/about-architrino.md) supplied exposition, notation, layer, and evidence constraints. The [geometry and dynamics role packet](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) supplied a review lens, not physical evidence.

Relevant foundation passages were inspected in [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md). Their complete-state versus observer-access distinction controls this chapter's causality account.

The substantive comparison used:

- [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), opening causal geometry and canonical acceleration law, plus lines 803–832 on admissible histories, conditional continuation, and caustic bounds.
- [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), lines 20–56, on centered shell sums, weighted-history assumptions, and the limits of mean-square convergence.
- [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), complete state, physical observers, boundary-history equivalence, and conditional measures.
- [Measurement Ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md#what-makes-an-interaction-a-record), inspected record/reset and weak-probe passages: readout persistence, nonuniform memory entropy, and ensemble responses below a target-record threshold.
- [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md#born-rule-and-chaotic-attractors), inspected uncertainty and Born passages: the Fourier chart, separate probe disturbance, and the unclosed quadratic-weight derivation.
- [Bell's Theorem](../../../../content/markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md), opening benchmark boundary: full joint response, measurement independence, and operational no-signaling.
- [Agency and Internal Causation](../../../../content/markdown/aaa/philosophy-history/agency-and-internal-causation.md), inspected Switch/Decider definitions and their capability limits.

Two external sources were checked for the narrow effective comparisons. Aram W. Harrow's [MIT 8.06 notes, chapter 3](https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2016/fc8347d83390a876ee665fbbfd9b2d7f_MIT8_06S16_chap3.pdf), dated May 18, 2016, distinguish outcome-conditioned states, mixtures, evolution, and coherence. Reeb and Wolf's [2014 Landauer paper](https://arxiv.org/html/1306.4352), §§2.1 and 3.1, states the initially thermal, uncorrelated-reservoir assumptions and the entropy-decrease/heat bound. Both are comparison references; neither supplies substrate dynamics or a physical assembly branch. The supplied-work translation in this receipt additionally uses an explicit energy account.

Before edits, a path-name search under scripts/, tests/, and the conversion ledger found the ledger's chapter entry but no literal chapter-name match in scripts/ or tests/. This is a scoped search result, not a claim that the chapter has no consumers. Inspection of the [equation corpus generator](../../../../scripts/build-equation-mapping-corpus.mjs) showed that it scans corpus sources and writes the [generated registry](../../../../content/generated/equation-mapping/corpus-equations.json); chapter context and equation links therefore bind the source even when no test names the chapter. Existing equation/viewer identities, local links, and heading anchors were inventoried for preservation. No generated or pinned artifact was edited.

## Findings and implemented repairs

### RQC-01 — Medium: primitive and assembly inventory were conflated

Baseline lines 24–35 assigned internal indexed binaries and whole-object emission to architrinos and assemblies generally; lines 60–67 described all stable objects as equilibria and a nucleus as a Noether braid assembly. The primitive architrino has no internal binary, and an inventory for a particular braid family cannot describe every assembly hierarchy.

Claim grade: derived from the stated primitive and family definitions, with the source mismatch measured by the full baseline read. Repair at chapter lines 13, 24–32, 57, and 63–65 defines the primitive, makes emission constituent-level, scopes the indexed inventory to a three-binary candidate, and distinguishes equilibrium, persistence, and attraction. Falsifier: an accepted primitive definition assigning internal binaries, or an actual proof that every addressed assembly is the stated single family, would require reassessment; neither is supplied by the inspected foundations.

### RQC-02 — High: a static comparison was allowed to carry a stronger convergence conclusion

Baseline lines 37–58 gave valid comparison variances but treated global neutrality as sufficient for mean cancellation and left the scalar potential sounding conditionally available. For independent symmetric signs and a homogeneous source process, shell variance of the scalar kernel is $4\pi n q^2\,dr$; the radial acceleration comparison gives $(4\pi n q^2/3)r^{-2}dr$ after angular averaging. Thus the first grows with outer radius and the second has a vanishing mean-square tail at a positive inner cutoff. Neither calculation controls causal-root counts or the weight $c_f/|D_t|$ in the actual delayed sum.

Claim grade: derived for the comparison integrals; inferred only under the named ensemble hypotheses for their probabilistic interpretation. Repair at lines 28, 34–55 retains both displays exactly, supplies their kernels and integration reasoning, and explicitly withholds conditional scalar convergence and full delayed-sum convergence. Falsifier: failure of either elementary integral under its stated kernels overturns the comparison; a separately established weighted-history convergence theorem could support a stronger physical statement but would not follow from neutrality alone.

### RQC-03 — Medium: present receiver data and exact arrival support were omitted

Baseline lines 88–98 said acceleration depends only on past trajectories and wakes that have arrived by the present. The root condition also uses the current receiver position and polarity, and the direct contribution is supported at the reception event. An earlier arrival influences subsequent state evolution; it is not automatically another present hit.

Claim grade: derived from the causal-root definition. Repair at lines 85–94 defines the emission-to-reception separation and restores the current receiver event. At $c_f=1$, a stationary transmitter at zero and receiver position $X_r(T)=2+T/2$ give a root for emission at zero at $T=4$, not the value $2$ obtained from an initial separation alone. Falsifier: a root law using simultaneous transmitter position or a filled past-arrival volume as direct support would be a different model.

### RQC-04 — High: constant emission amplitude was mistaken for bounded received response

Baseline lines 109–123 inferred finite reinforcement, fragility, short lifetime, and a hidden approach from near-wake-speed geometry. On an ordinary root, $W^{\mathrm{acc}}=c_f/|D_t|$. Constant source amplitude does not prevent this factor from becoming arbitrarily large as $D_t$ approaches zero. At $c_f=1$, denominators $0.01$ and $0.001$ yield weights $100$ and $1000$.

Claim grade: derived for the denominator implication; guessed for the candidate stealth mechanism. Repair at lines 103–119 distinguishes emitted amplitude from received acceleration, requires separation/root bounds or a validated finite-event route, and returns amplification, lifetime, and hidden approach to explicit response targets. Constituent speed is separated from assembly group speed. Falsifier: a valid uniform bound derived without controlling those factors would overturn the boundedness objection; stability needs an actual solution and its perturbation dynamics, not a speed label.

### RQC-05 — Medium: thresholds, bifurcations, and attraction were treated as equivalent

Baseline lines 68–78 and 135–167 joined rarity, metastability, basin crossing, bifurcation, and a homoclinic-like label without their distinct conditions. A readout can cross a fixed boundary while the evolution law remains unchanged; a parameter bifurcation can occur without the realized state crossing an outcome boundary. Root onset is a causal-geometry event, not by itself a homoclinic orbit.

Claim grade: derived as a distinction between the defined mathematical objects. Repair at lines 57, 65–75, and 133–163 scopes rarity and metastability, defines the different boundaries, and removes the unsupported topology identification. Falsifier: a same-domain derivation demonstrating the particular equivalences for this assembly model would justify a stronger local statement. The general implication remains false.

### RQC-06 — High: deterministic continuation was overclaimed and contradicted by a same-state multistability claim

Baseline lines 189–190, 238–264, and 206–216 made evolution unconditional, asserted coexisting attractors from one prior state, and described pushing an already completed trajectory segment through the flow. A deterministic flow has one output per complete input. Coexisting attractors can have different basins; they do not provide two futures for identical admissible initial histories.

Claim grade: derived from single-valued evolution; physical applicability remains conditional on the Master Equation's history/continuation hypotheses. Repair at lines 13, 185–189, 204–212, 234–260 makes those hypotheses explicit, includes pre-window incoming history, and identifies the future segment as output. Falsifier: two inequivalent continuations from identical admitted data would refute uniqueness on that domain and reopen the dynamics question, rather than establish deterministic choice between them.

### RQC-07 — Medium: finite-window preimages lacked the probability-domain qualifications

Baseline lines 168–178 and 505–510 introduced basins without separating finite-window outcomes from asymptotic attraction or specifying exhaustion. The preimage of a terminal outcome is a valid finite-window set once a measurable flow and outcome class are declared. It need not be an attraction basin. If two retained outcomes have weights $0.4$ each and the no-record class has weight $0.2$, dropping that third class leaves total weight $0.8$.

Claim grade: derived by preimage and measure definitions. Repair at lines 163–174 and 504–511 preserves both displays and requires a complete admissible history domain, measurable disjoint outcomes, and explicit treatment of no-record or conditional sampling. Falsifier: complete outcome coverage or an explicit conditioning normalization in the original argument would remove the normalization defect; a proof of attraction would add a separate property.

### RQC-08 — High: threshold sensitivity and high dimension did not prove chaos

Baseline lines 182–202 inferred classic deterministic chaos and universal unpredictability from high-dimensional history dependence and a nearby threshold. The scalar equation $dz/dT=z-z^3$ has attracting fixed points at $\pm1$ and an unstable separator at zero: its derivative is $1-3z^2$, giving slopes $-2,1,-2$ at those three points. Each nonstationary bounded trajectory approaches one fixed point monotonically, so a sign-sensitive outcome does not demonstrate recurrent chaotic motion. Stable extra coordinates and a triangular delayed response $dy/dT=-y+z(T-L)$ can retain arbitrarily many coordinates and history while converging to the same limiting sign.

Claim grade: derived for this illustrative counterexample. Repair at lines 178–198 separates sensitivity, chaos, and formal undecidability. It also states the exact condition for coarse outcome ambiguity: compatible histories must intersect different outcome classes. A finite interval entirely on the positive side predicts the positive label despite unresolved microscopic detail. Falsifier: recurrent chaos in this triangular example, or two labels under the stated positive-half-line flow, would contradict the witness. This example neither models nor rules out chaos in physical assemblies.

### RQC-09 — High: deterministic uncertainty did not select Born weights or reaction-time laws

Baseline lines 195–216 called Born probabilities and half-lives the correct statistics of chaotic trajectories without deriving the ensemble law. Fixing a deterministic binary outcome map on four histories does not fix their weights: equal input weights can yield $(0.5,0.5)$, while weights $(0.1,0.1,0.4,0.4)$ under the same map yield $(0.2,0.8)$. The map alone does not select a quantum amplitude square.

Claim grade: derived for the non-identifiability witness; quantum recovery remains an open obligation. Repair at lines 191–212 requires a preparation measure, flow, and record map producing the same outcome and thermodynamic statistics. Falsifier: a derivation selecting the Born measure from the same admissible dynamics and preparation would close that part of the obligation; a fitted weight assignment or replay of one trajectory would not.

### RQC-10 — Medium: a selected agency architecture was presented as universal necessity

Baseline lines 222–245 and 284–306 treated five features as universal minimal requirements and changing basin geometry as equivalent to moving the state. In the scalar threshold example, changing a positive initial value changes distance to the separator without changing either basin. Transient and continuous-response decision models also need not settle into two attractors.

Claim grade: derived for the distinction between state preparation and dynamics; guessed for the proposed physical architecture. Repair at lines 218–243 and 282–302 preserves the working definition while marking its attractor-based scope and open minimality. Falsifier: a theorem covering a declared wider class could support necessity there; the Master Equation and a definition alone cannot supply it.

### RQC-11 — High: state count alone did not establish the reset work floor

Baseline lines 318–332 and 503 gave an $N$-state reset cost and nonzero work/dissipation requirement without the needed distribution, energy, and reservoir assumptions. A two-state distribution $(0.99,0.01)$ has Shannon entropy $0.056001534354847345$ nats, less than $\log2$. Counting its two distinguishable states therefore overstates the entropy erased. Under the thermal comparison, supplied work additionally includes the memory internal-energy change; a heat bound is not automatically an identical work bound.

Claim grade: derived for the entropy counterexample and conditional energy accounting; the cited thermal theorem is an effective comparison. Repair at lines 314–328 and 502 retains the displayed inequality in its equipopulated, declared-error, equal-internal-energy reset regime, specifies decoupled memory-reservoir endpoints for the supplied-work translation, gives the nonuniform replacement, and preserves resource/correlation accounting. Falsifier: equal initial probabilities and the stated physical reset assumptions would remove the omitted-condition objection for that particular case; they still would not prove a positive cost for every reversible update.

### RQC-12 — Medium: robustness and update closure exceeded the stated model

Baseline lines 359–400 demanded immunity to any single peak, then supported only typical fluctuations, and used a symbolic function of recent visits as though it were an implemented update. A finite hold tolerance over a declared input range does not imply robustness to unbounded impulses. A history-dependent function does not become a closed state equation until its history or auxiliary memory variables are supplied.

Claim grade: derived as a domain and state-completeness distinction. Repair at lines 274, 355–396 specifies the input range, duration, hold tolerance, and retained history needed by the proposed update; it defines the dot as $d/dT$. Falsifier: a uniform all-input robustness theorem and a closed constituent-derived memory implementation would justify the stronger account. Neither is given here.

### RQC-13 — High: a conditioned state update was conflated with a new evolution law

Baseline lines 433–436 and 457–461 required a changed effective wave equation at threshold resolution and asserted Lyapunov timing and hysteresis. A state or readout changes under a fixed law; a threshold label does not logically alter that law. Ideal selective rank-one projection is only one measurement case, and a label alone does not establish that an action scalar locates its boundary.

Claim grade: derived for the logical distinction; the standard measurement map is an effective comparison. Repair at lines 429–432 and 453–458 separates conditioned state, reduced generator, boundary coupling, and apparatus timing. Falsifier: an explicitly derived change of effective generator in a specified channel would support that channel's change, but not the universal implication. A finite transition does not itself supply a Lyapunov exponent or hysteresis loop.

### RQC-14 — High: threshold uncertainty was conflated with quantum uncertainty and action quantization

Baseline lines 77, 141–143, 438–443, and 464–467 mixed a clean integer action step, epistemic threshold bracketing, and the position-momentum uncertainty principle. An integer label is not a derivation of discrete action spacing. The Fourier width inequality becomes a momentum inequality only with the effective momentum/wave-number identification, normalization, and finite variance conditions.

Claim grade: derived for the distinctions between the objects; physical action spacing and effective-envelope recovery remain unproved. Repair at lines 74, 137–139, 434–439, and 460–465 keeps the integer-band proposal and separates apparatus disturbance, conditional-history width, and quantum state spreads. Falsifier: a same-history action-spacing theorem and phase-amplitude/momentum map could close the respective obligations; neither a sharp boundary nor a symbolic $f\to f\pm1$ step does so.

### RQC-15 — Medium: forward projection, inverse ambiguity, and coherence were confused

Baseline lines 445–446, 460, and 469–473 mapped one trajectory to multiple coarse histories and treated a generic superposition as worlds. For a fixed function, each input has one output; many compatible inputs may instead share one observed past and have different future records. Also, a pure equal superposition and an equal incoherent mixture have identical diagonal weights in one basis but respective probabilities $1$ and $1/2$ for the positive superposition readout. Outcome weights alone cannot determine the density operator.

Claim grade: derived by function and two-state matrix algebra. Repair at lines 441–442, 457, and 467–472 corrects the map direction, scopes interpretation claims, and requires retained phase/coherence data. Falsifier: a declared stochastic output kernel would be a different object from the fixed projection; a physical derivation of the full density map would close the missing representation burden.

### RQC-16 — High: source-basin changes were made necessary for observation

Baseline lines 448–449 and 475–479 ruled out observation of every within-basin change. A readout need not be constant on a source basin. For the positive basin of the scalar example, states $z=0.25$ and $z=0.75$ have the same outcome label but different values of the readout $R(z)=z$. Conversely, a source transition that leaves no persistent detector distinction is not a completed record.

Claim grade: derived for the logical counterexample; guessed until implemented for a particular physical apparatus. Repair at lines 432, 444–445, and 474–479 places the record criterion on the coupled apparatus readout and retains weak-probe ensemble sensitivity. Falsifier: a derived constant readout on every source basin in the specified channel could make the old assertion valid there; it is not a general property of basins.

### RQC-17 — Medium: interpretive framing claimed empirical recovery and historical verdicts

Baseline lines 483–491 said the framework keeps empirical success intact and grounds it in the proposed mechanisms, while treating disparate quantum interpretations as a single historical drift. A reinterpretation cannot establish agreement with spectra, scattering, or transition frequencies without quantitative predictions, and the chapter supplies no source-based historical analysis warranting that blanket conclusion.

Claim grade: measured as a mismatch between the chapter's explicit recovery targets and its summary claim; inferred for the need to limit the verdict. Repair at lines 483–490 preserves the comparative discussion while making empirical agreement an obligation and avoiding a universal historical attribution. Falsifier: independently checked matching predictions would establish recovery over their domain; an adequately sourced historical argument could support a separate, properly bounded historical assessment.

### RQC-18 — High: a conditional knob sweep was allowed to establish a physical Switch

Baseline lines 505–528 used normalized restriction even for unspecified continuous conditioning values and treated a knob sweep as sufficient for a Switch response. Conditioning on a set of zero measure cannot be defined by division by that set's probability. More importantly, changing an observed conditional distribution is not necessarily the effect of changing a physical preparation. For a fair binary variable $X$, let $U=X$ and outcome $Y=X$. Conditional outcome laws at $U=0$ and $U=1$ have total variation one, while interventions changing $U$ and leaving $X$ unchanged have identical outcome laws and distance zero.

Claim grade: derived for the finite confounding example and conditioning-domain restriction. Repair at lines 504–527 defines total variation and a meaningful tolerance, requires measurable complete outcomes, gives positive-measure or regular-conditional/binning alternatives, and requires realizable controlled preparations under matched incoming context. Falsifier: a demonstrated intervention protocol excluding uncontrolled input selection, with independent response uncertainty and physical implementation, could establish a Switch in the declared domain. A designer's response function alone cannot.

## Validation and preservation

The review read the complete baseline and the complete repaired chapter with line numbers; the small final follow-up edits were reread in their actual passages. Findings use the baseline references above rather than attributing defects to an author or commit message. The arithmetic witnesses are separately stated mathematical examples, not EOM simulations. They check the invalid implications without pretending to prove a physical branch.

The validation scripts below are in-memory Node invocations; no checker, fixture, scratch file, or oracle was added to the repository. Their known cases run before their target assertions. These checks establish syntax, the declared local link/anchor surface, and literal preservation, not mathematical independence of an assembly theory.

| Instrument and scope | Result |
| --- | --- |
| shasum -a 256 on the assigned chapter before edits | Matched the dispatch hash |
| git status scoped to the two authorized paths and receipt absence test | Clean chapter and absent report at baseline |
| Complete nl -ba reads of baseline and repaired chapter | Entire chapter covered; final follow-up edits reread |
| In-memory KaTeX/math/link controls | Valid and invalid TeX, code exclusion, unmatched delimiters, heading duplicates, existing/missing path controls passed before target use |
| Baseline comparison against the hash-verified Git file | All 9 display blocks and 9 viewer links byte-identical; all 35 original heading anchors and 27 original links preserved |
| Target chapter syntax and links | 138 math expressions, including 9 displays, rendered with strict KaTeX; 31 local links and 8 Markdown fragments resolved |
| Arithmetic witness script | W1–W9 passed after known entropy, distance, and deliberate-failure controls |
| Scoped git diff --check for the chapter | Passed after final chapter edits |
| node scripts/validate-content.mjs --check --strict, after chapter repairs and before receipt creation | Exit 0: 0 errors, 0 warnings, 30 notes; 199 corpus Markdown files and 1696 repository Markdown files audited |
| Two-path KaTeX/math/local-link and whitespace checks | Passed after controls: chapter 138 expressions, 31 local links, 8 Markdown fragments; receipt 44 expressions, 35 local links, 4 Markdown fragments |
| Complete receipt reread and scoped git diff review | Completed; receipt read in full, chapter diff inspected, scoped git diff --check passed |
| First full-repository check with receipt present | Exit 1: 3 false link errors in deliberate test strings inside tilde-fenced code; inspection of scripts/validate-content.mjs lines 747–768 found its link scanner excludes backtick fences only. Changed this receipt to backtick fences; no checker code or example target was changed |
| Strict full-repository check after fence adjustment | Exit 0: 0 errors, 0 warnings, 30 notes; 199 corpus and 1699 repository Markdown files audited |
| Final node scripts/validate-content.mjs --check --strict after the root-bound and reset-endpoint wording refinements | Exit 0: 0 errors, 0 warnings, 30 notes; 199 corpus and 1699 repository Markdown files audited |

The final chapter SHA-256, measured with shasum -a 256 and independently recomputed by Node's SHA-256 implementation during the preservation check, is:

```text
29fa069212900967c1e378eb2adb0635f7d60f8ebddbefb5e345f129dd8611cd
```

Falsifier for this exact-state receipt: a different live chapter hash, a changed source passage, a newly failing scoped check, or a link target changed by concurrent work invalidates the affected current-state result. Repeated hashes establish byte identity, not physical correctness.

### Reproduce the scoped syntax and preservation checks

Run the following from the repository root with node --input-type=module. The embedded Git revision is used only after its chapter hash matches the dispatch baseline. The script's link checks cover local path existence and Markdown heading fragments; equation-viewer identity preservation is checked separately against the baseline. This is not a browser rendering or external-URL availability test.

```js
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const chapter='content/markdown/aaa/quantum/reality-quantum-causality.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-reality-quantum-causality-review-2026-09-12.md';
const katex=loadVendoredCommonJsBundle('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js');
function prose(s){return s.replace(/(^|\n)[ \t]*(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?\n[ \t]*\2[ \t]*(?=\n|$)/gu,'$1').replace(/(\x60+)[^\n]*?\1/gu,'');}
function maths(s){const p=prose(s), re=/\$\$([\s\S]*?)\$\$|(?<!\\)\$([^\n$]+?)(?<!\\)\$/gu; const out=[...p.matchAll(re)]; assert.equal(p.replace(re,'').replace(/\\\$/g,'').includes('$'),false,'unpaired dollar'); return out.map(m=>({tex:m[1]??m[2],display:m[1]!==undefined}));}
function links(s){return [...prose(s).matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/gu)].map(m=>m[1]);}
function slug(s){return s.toLowerCase().replace(/[*_\x60]/g,'').replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s/g,'-');}
function anchors(s){const counts=new Map(); return new Set([...prose(s).matchAll(/^(?:>\s*)?#{1,6}\s+(.+)$/gm)].map(m=>{const v=slug(m[1]),n=counts.get(v)||0;counts.set(v,n+1);return v+(n?'-'+n:'');}));}
assert.deepEqual(maths('Text $x$.\n$$\ny=z\n$$\n\x60$omit$\x60\n~~~tex\n$omit$\n~~~').map(m=>m.tex),['x','\ny=z\n']);
assert.throws(()=>maths('bad $x'));
assert.deepEqual(links('[a](AGENTS.md) \x60 [b](missing) \x60\n~~~md\n[c](missing)\n~~~'),['AGENTS.md']);
assert.deepEqual([...anchors('# Title\n## Heading (Test)\n## Heading (Test)')],['title','heading-test','heading-test-1']);
assert.equal(fs.existsSync('AGENTS.md'),true);
assert.equal(fs.existsSync('__rqc_known_missing_control__.md'),false);
assert.doesNotThrow(()=>katex.renderToString('\\frac{1}{2}',{throwOnError:true,strict:'error'}));
assert.throws(()=>katex.renderToString('\\rqcUndefinedCommand',{throwOnError:true,strict:'error'}));
const displayControl='$$\na=b\n$$\n\n[View →](../../../../equation-mapping.html#corpus-equation-0000000000000000)';
assert.equal(parseCorpusDisplayEquations(chapter,displayControl)[0].tex,'a=b');
console.log('PASS controls: math/code exclusion, unmatched delimiter, links, headings/duplicates, existing/missing path, valid/invalid KaTeX, display parser');
const baseline=execFileSync('git',['show','2490eb54aef24bf6d9a49cbc7ba62f1e54553305:'+chapter],{encoding:'utf8'});
assert.equal(crypto.createHash('sha256').update(baseline).digest('hex'),'e171e34c24879d5743b70d5514af3e7b750d762b8119bd0ba410845b5f15d4f3');
const current=fs.readFileSync(chapter,'utf8');
const oldDisplays=parseCorpusDisplayEquations(chapter,baseline),newDisplays=parseCorpusDisplayEquations(chapter,current);
assert.deepEqual(newDisplays.map(e=>e.tex),oldDisplays.map(e=>e.tex));
assert.deepEqual(newDisplays.map(e=>e.existingLink?.text),oldDisplays.map(e=>e.existingLink?.text));
assert.deepEqual([...baseline.matchAll(/\$\$[\s\S]*?\$\$/g)].map(m=>m[0]),[...current.matchAll(/\$\$[\s\S]*?\$\$/g)].map(m=>m[0]));
for(const a of anchors(baseline))assert.ok(anchors(current).has(a),'preserved heading '+a);
for(const l of links(baseline))assert.ok(links(current).includes(l),'preserved link '+l);
console.log('PASS baseline preservation:',oldDisplays.length,'byte-identical displays and viewer links;',anchors(baseline).size,'headings;',links(baseline).length,'original links');
for(const file of [chapter,report].filter(f=>fs.existsSync(f))){
 const s=fs.readFileSync(file,'utf8'),ms=maths(s),ls=links(s);let local=0,fragments=0;
 for(const m of ms)katex.renderToString(m.tex,{throwOnError:true,strict:'error',displayMode:m.display});
 for(const l of ls){if(/^[a-z]+:/i.test(l))continue;const [f,frag]=l.split('#');const resolved=f?path.resolve(path.dirname(file),decodeURIComponent(f)):path.resolve(file);assert.ok(fs.existsSync(resolved),file+' missing '+l);local++;if(frag&&resolved.endsWith('.md')){assert.ok(anchors(fs.readFileSync(resolved,'utf8')).has(decodeURIComponent(frag)),file+' missing anchor '+l);fragments++;}}
 assert.equal(/[ \t]+$/m.test(s),false,'trailing whitespace '+file);
 console.log(JSON.stringify({file,math:ms.length,displays:ms.filter(m=>m.display).length,localLinks:local,markdownFragments:fragments,sha256:crypto.createHash('sha256').update(s).digest('hex')}));
}
```

### Reproduce the arithmetic witnesses

Run this block with node --input-type=module. Every new wake-speed instantiation uses $c_f=1$. The other dimensionless examples are diagnostic counterexamples to logical implications; they carry no assembly realization claim. The phase-line and triangular-delay reasoning is given in RQC-08; W1 checks its fixed-point algebra, not a numerical stability simulation.

```js
import assert from 'node:assert/strict';
const close=(a,b,tol=1e-12)=>assert.ok(Math.abs(a-b)<=tol, a+' != '+b);
const entropy=p=>-p.reduce((s,x)=>s+(x===0?0:x*Math.log(x)),0);
const tv=(p,q)=>0.5*p.reduce((s,x,i)=>s+Math.abs(x-q[i]),0);
close(entropy([1,0]),0);close(entropy([0.5,0.5]),Math.log(2));close(tv([1,0],[0,1]),1);
assert.throws(()=>close(1,2));
console.log('PASS known controls: entropy of certain/fair bit, disjoint total variation, deliberate arithmetic mismatch');
const cf=1;
const f=z=>z-z**3, fp=z=>1-3*z*z;
for(const z of [-1,0,1])close(f(z),0);
close(fp(-1),-2);close(fp(0),1);close(fp(1),-2);
assert.ok(f(0.1)>0&&f(-0.1)<0);console.log('W1 PASS: threshold equilibria and slopes');
const mask=[0,0,1,1],push=p=>[p.filter((_,i)=>mask[i]===0).reduce((a,b)=>a+b,0),p.filter((_,i)=>mask[i]===1).reduce((a,b)=>a+b,0)];
assert.deepEqual(push([.25,.25,.25,.25]),[.5,.5]);assert.deepEqual(push([.1,.1,.4,.4]),[.2,.8]);console.log('W2 PASS: identical outcome map, different ensemble weights');
const vp=R=>4*Math.PI*(R-1),va=R=>4*Math.PI/3*(1-1/R);
close(vp(20)-vp(10),40*Math.PI);close(va(20)-va(10),Math.PI/15);
close(4*Math.PI/3-va(20),Math.PI/15);console.log('W3 PASS: scalar and acceleration comparison tails');
close(cf/.01,100);close(cf/.001,1000);console.log('W4 PASS: unbounded simple-root weight trend at cf=1');
const h=entropy([.99,.01]);close(h,0.056001534354847345);assert.ok(h<Math.log(2));console.log('W5 PASS: nonuniform two-state entropy',h);
const sourcePoints=[.25,.75],readout=z=>z;
assert.ok(sourcePoints.every(z=>z>0));assert.notEqual(readout(sourcePoints[0]),readout(sourcePoints[1]));console.log('W6 PASS: one source basin, distinguishable readouts');
const pPlusPure=(.5+.5+.5+.5)/2,pPlusMixed=(.5+0+0+.5)/2;
close(pPlusPure,1);close(pPlusMixed,.5);console.log('W7 PASS: same diagonal weights, different coherent readout');
const conditioned=[ [1,0],[0,1] ],intervened=[ [.5,.5],[.5,.5] ];
close(tv(...conditioned),1);close(tv(...intervened),0);console.log('W8 PASS: U=X,Y=X confounding, zero intervention effect');
close(.4+.4,.8);close(.4+.4+.2,1);close(2+.5*4,cf*4);console.log('W9 PASS: no-record normalization and moving-receiver causal root');
```

## Generated artifacts and deferred command

Measured by node scripts/build-equation-mapping-corpus.mjs --check after chapter repairs, the equation generator returned exit 1 with one reported error: the generated registry at content/generated/equation-mapping/corpus-equations.json is stale. It counted 199 corpus files and 4685 displays at that run and did not report a missing equation link for this chapter. The chapter's nine existing display/viewer pairs remain unchanged; its edited source context is nevertheless consumed by the registry.

The exact deferred command is:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
```

That command was not run. Regeneration remains with an authorized regeneration or publication owner, followed by its corresponding check. This receipt makes no freshness claim for other generated families.

## Remaining obligations and closure limits

○ RQC-O1 — Physical branch and continuation: derive the proposed assembly configurations from complete causal histories with admissible root inventories, finite-event continuation, and independent persistence/stability evidence. The Master Equation and branch owners retain this obligation.

○ RQC-O2 — Statistical recovery: derive the preparation measure, coherent effective state map, Born weights, reaction-time laws, and Bell-compatible joint records from the same history and apparatus account. Preserve measurement independence, no-signaling, and the common thermodynamic projection. The quantum and Bell owners retain these open targets.

○ RQC-O3 — Record and cost implementation: establish channel-specific readout persistence, weak-probe response, reset assumptions, physical heat/work accounting, and error budgets. The corrected comparison formulas do not implement a detector or memory.

○ RQC-O4 — Switch/Decider realization: provide physically realizable bias preparations, matched input ensembles, a derived update/hold protocol, and an independently resolved response above uncertainty. A parameter sweep or conditional selection by itself does not complete this target.

○ RQC-O5 — Coordinator disposition: review this two-file receipt and integrate the accepted finding disposition into the shared CRW-005 owners under coordinator authority. This assignment deliberately leaves those shared records untouched.

Local editorial and mathematical-scope repairs are complete. Physical branch existence, EOM solver acceptance, theory closure, empirical quantum recovery, and downstream closure remain unestablished. No staging, commit, push, reset, stash, linked worktree, or regeneration was performed by this assignment. Unrelated staged and unstaged work was preserved.

Next concrete step: the coordinator checks the final chapter hash and validation receipt, then records this bounded disposition in the existing shared board and queue. No new scientific promotion follows from that integration.
