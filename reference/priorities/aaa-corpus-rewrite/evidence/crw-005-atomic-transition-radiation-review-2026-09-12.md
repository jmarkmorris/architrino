# CRW-005 Atomic Transition Radiation Review — 2026-09-12

## Scope and provenance

Priority 50: [Atomic Transition Radiation](../../../../content/markdown/aaa/reactions/atomic-transition-radiation.md). The assignment authorizes a complete chapter review, bounded repairs to that chapter, and this evidence receipt. The reviewer also edited the chapter, so the complete final reread is editorial self-review. The mathematical arguments and arithmetic witnesses below supply separately checkable references; repeated agreement with the edited text is not independent physical validation.

The authorized write set contains exactly the chapter and this receipt. Shared status, priorities, queue, work log, conversion ledger, other chapters, generated artifacts, fixtures, code, and publication files were not edited by this assignment. No staging, commit, push, reset, stash, regeneration, or linked-worktree operation was performed.

Claim grade: measured. At the initial read and immediately before editing, `shasum -a 256 content/markdown/aaa/reactions/atomic-transition-radiation.md` returned the dispatch hash below; `git --no-optional-locks status --short --` restricted to the two authorized paths printed no entries, and `test ! -e` confirmed that the receipt was absent. These observations establish those paths' state at the check times, not exclusive ownership of the shared checkout.

- Dispatch and verified pre-edit SHA-256: `2d5d75a52f4bf3df08942031df5acef7ea29d5b82346ca11b1f3af83c62d6f0e`.
- Baseline Git revision inspected: `859f2b07cb17889ca2c239d82fd61455c2ba903c`.
- Baseline line references below are from the complete 366-line `nl -ba` read of the dispatch chapter.
- Final chapter SHA-256, measured by `shasum -a 256`: `3b8119f3a8aa5aeb6106598ee711081418155bb988e1eaa78ff3f31b5656171d`.
- Final line references below are from the complete 384-line reread after repair. A later content change invalidates this exact-byte receipt and requires rechecking the affected findings.

The [conversion ledger](conversion-ledger.md), line 95, records the earlier edition-1.0 conversion. For provenance, `git show c973402b9:content/markdown/aaa/reactions/atomic-transition-radiation.md | shasum -a 256` returned `5d69761c5b37d00c71ee5a556a9385fdf169e564fd4436d757245a81d4ecbb56`. The scoped `git diff c973402b9 859f2b07cb17889ca2c239d82fd61455c2ba903c -- content/markdown/aaa/reactions/atomic-transition-radiation.md` shows only an opening-paragraph framing change across those endpoints. This comparison does not establish when every reviewed defect originated or attribute it to a particular conversion or author.

## Owners and sources inspected

- [AGENTS.md](../../../../AGENTS.md), complete; [generated startup router](../../../op/agent-startup-orientation.generated.md); [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live owner](../../../op/skills/skill-architrino-review.md), and the complete [corpus reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md). The operator's explicit repair assignment supplies implementation authority.
- [Theory orientation](../../../op/theory-orientation.md), [execution procedure](../../../op/codex-goal-seeking-prompt-template.md), [operator explanation standard](../../../op/operator-explanation-standard.md), and the [geometry/dynamics review lens](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md).
- [Academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematical style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [source policy](../../../../content/markdown/aaa/archie/about-architrino.md). The mathematical and terminology owners govern over older comparison wording.
- [CRW-005 status board](../corpus-review-status.md), lines 1–22, confirms priority 50; [work queue](../work-queue.md), lines 1–49, distinguishes conversion preservation from assurance review; [priorities](../priorities.md), lines 75–105, supplies current disposition boundaries. These shared owners were read only.
- Foundation orientation passages, lines 1–22 of [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md); [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), opening and transmitter-weight passages. These are scoped consistency reads, not independent reviews of those chapters.
- [Atomic Spectra](../../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md), local-energy, clock-conversion, and hydrogen benchmark passages; [its existing review](crw-005-atomic-spectra-review-2026-09-12.md), including its reusable controlled validation procedure. Spectral labels, energy calibration, correction budgets, and physical clock recovery remain inherited obligations.
- [Radiation](../../../../content/markdown/aaa/reactions/radiation.md), opening and channel distinctions; [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface), Gate A/B/C requirements and polarization scope; [Reaction Ledger](../../../../content/markdown/aaa/validation/reaction-ledger.md), lines 1–61; [Reaction-Cosmology Provenance Ledger](../../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), lines 1–50.
- [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), opening clock-map definitions; [Expansion Mechanism](../../../../content/markdown/aaa/cosmology/expansion-mechanism.md), source-factor and observable-frequency passages; [Quantum Operator Mapping](../../../../content/markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md), indexed-transition comparison passages.
- [Equation corpus generator](../../../../scripts/build-equation-mapping-corpus.mjs), display parser export and check/write branches; [equation-link validator](../../../../scripts/validate-equation-mapping-links.mjs); [vendored bundle loader](../../../../scripts/load-vendored-commonjs-bundle.mjs). The chapter appears in [textbook navigation](../../../../content/graph/textbook_toc.json) and [scene graph](../../../../content/graph/scene_graph.json) by literal-path `rg` search. A scoped search of scripts, tests, navigation and CRW evidence found the navigation bindings and previous review/conversion references; this is not an exhaustive no-consumer claim.

External verification was bounded to existing observer-level comparisons. MIT OpenCourseWare, *8.06 Quantum Physics III*, Spring 2016, [Chapter 2: Time-Dependent Approximation Methods](https://www.ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2016/0c27511c09675d8d385577023328248b_MIT8_06S16_chap2.pdf), §§2.1–2.3, especially printed pages 10–12 and equations (15)–(16), supplies the thermal-equilibrium and spontaneous/stimulated-emission comparison. The [Einstein coefficients teaching note](https://mama-group.cz/content/mancal-teaching/quantum-optics-i/files/einsteincoeff.pdf), equations (2), (5), and (7)–(10), was also inspected for the level-degeneracy convention; it is an undated teaching note, not an independent experiment. Neither source supplies an Architrino assembly derivation. No atomic line dataset, historical attribution inventory, material measurement, or physical branch was independently reproduced here.

## Findings and bounded repairs

Claim grade: measured for the quoted source locations and repaired text, by the complete baseline/final reads and scoped diff; derived for the explicit counterexamples below; inferred for severity and the sufficiency of each editorial repair. The table records eleven finding groups: six High and five Medium. High means a mathematical or physical interpretation can change; Medium means missing definitions, evidence conditions, or accounting conventions can mislead a reader or evaluator. All eleven local repairs are complete; their physical derivations remain open.

| Finding | Severity | Baseline lines | Final lines | Demonstrated issue and implemented repair | Checkable falsifier |
| --- | --- | --- | --- | --- | --- |
| ATR-01 — ✓ Done | Medium | 3–7, 24–26, 42 | 3–7, 24–26, 44 | Plain theory shorthand, unexplained carrier/medium terms, and “excess action” introduce an energy ledger without separating units. The opening also says local sea state is preserved despite explicit medium changes. Define the entities and gates, distinguish action from energy, and require pre/post sea accounting. | A supplied action-to-energy derivation or an explicit unchanged-medium restriction covering every original event would remove the respective ambiguity; inspect the original opening and medium entries. |
| ATR-02 — ✓ Done | High | 13–42, 243–245 | 24–44, 161, 253–255 | All energy changes are declared nonnegative even for moving atoms and responsive media. The fixed-environment gap and extra remnant also lack a disjoint partition. Define signed final-minus-initial changes, the reference-environment correction, and exclusion of energy already in the final basin. | The signed-energy witness below would have to be excluded by the stated domain, or a disjoint complete accounting would have to contradict its algebra. |
| ATR-03 — ✓ Done | Medium | 62–116 | 64–122 | Residual denominators and tolerances lack units and prior calibration, while a remnant or frequency inferred from the tested equality can force a zero residual. Define positive energy floors, dimensionless tolerances, uncertainty budgets, and independent extraction. Preserve the Rydberg correction boundary. | Independently specified entries, fixed floors, and a non-tautological original instrument would answer this finding; the denominator and residual witnesses show the missing conditions matter. |
| ATR-04 — ✓ Done | High | 120–149 | 126–157 | The two-case threshold sketch claims photon output from the drive alone, omitting its own energy condition and dynamic accessibility. The raw gap is not usable photon energy after recoil. Restrict the unchanged sketch to independently accessible, compatible events, require net available energy, and retain the minimum as speculative. | A sufficient-condition theorem for the original unrestricted sketch, including recoil, inventories, and Gates A/B, would overturn the diagnosis. The raw-gap witness gives a direct energy counterexample. |
| ATR-05 — ✓ Done | Medium | 169–209 | 177–217 | Momentum and angular-momentum balances lack a complete boundary/origin and disjoint component allocation; a transverse-polarization handoff alone is not total photon angular momentum. Define the effective center-of-mass convention and require a complete componentwise angular-momentum contribution about one origin. | An original complete handoff that includes every required orbital, internal, wake, and boundary contribution without duplication would satisfy the missing contract. |
| ATR-06 — ✓ Done | High | 211–223, 247 | 219–233, 257 | The “minimum event record” omits before/after constituent polarity counts, and ordinary same-atom capture can read as exempt from identity routing. Add those required fields and route the incoming pair's constituents even when atomic identity is unchanged. | A complete original atom/photon/sea identity partition satisfying the Reaction Ledger would remove this omission; unchanged particle labels alone do not do so. |
| ATR-07 — ✓ Done | Medium | 227–247 | 237–257 | “Inverse” can imply unproved reversal of delayed histories; the absorption formula omits the remnant without a domain restriction and supplies no incoming-vector sign rule. State opposite energy-transfer direction, bound the formula to negligible remnant, and require actual absorption changes and negative incoming photon contributions. | A full reversal theorem plus a zero-remnant domain and explicit sign convention in the original text would meet the missing conditions. |
| ATR-08 — ✓ Done | High | 273–283 | 283–293 | Weak homogeneity is insufficient for detailed balance. The coefficients also do not say whether occupancy and degeneracy have already been counted. Require thermal equilibrium, resolved sublevels or declared sums/averages, and coefficients excluding the displayed occupation factors. | The excited-empty-mode witness below violates unrestricted equality; only an equilibrium restriction or a different declared equation removes it. |
| ATR-09 — ✓ Done | High | 293–307 | 303–317 | The measure is not explicitly conditioned/normalized on the source basin, and a terminal-state predicate can miss emission followed by recapture. Define a common normalized preparation, admissible delayed histories, well-posed map domain, and a durable occurrence record; distinguish repeated-event counting. | A specified conditional probability measure and durable event predicate in the original contract would satisfy this requirement; scaling or endpoint witnesses exhibit the ambiguity. |
| ATR-10 — ✓ Done | High | 293–325 | 303–321, 339–350 | Bounded probability divided by window length tends to zero, contradicting the claimed generic long-window nonzero rate recovery. Identify a finite-window diagnostic, prove the bound, give the exponential witness and survival-rate alternative, and restrict recovery to a justified scale-separated regime. | A normalized indicator probability exceeding one would contradict the bound; an unbounded event count is a different estimator and cannot validate the original indicator claim. |
| ATR-11 — ✓ Done | Medium | 285–289, 309–336 | 299, 321–350 | A rate does not fix amplitude phases, and pulling a matrix element outside a final-state sum requires controlled variation and normalization. Define the density per energy, recoil/clock conventions, factorization domain, and phase-sensitive recovery burden. | A separately derived phase map and valid state-sum factorization for the stated event family would discharge the obligation; equal individual magnitudes with different interference falsify rate-only reconstruction. |

Two supporting clarifications are not counted as demonstrated defects: final line 281 distinguishes finite-window storage or delayed escape from demonstrated material absorption, and line 352 distinguishes exact selection-rule exclusion from finite-sample non-observation. Their baseline passages already called the corresponding mechanisms provisional. They introduce no new physical result.

## Mathematical references and witnesses

Every numerical witness below uses normalized wake-speed units, $c_f=1$, with arbitrary consistent comparison-energy and duration units. None is an EOM solver run, an atomic simulation, or a physical measurement.

### Signed energy and accounting

Claim grade: derived. A change is a difference, not an absolute magnitude. In an effective comparison, if center-of-mass kinetic energy falls from $2$ to $0.5$, then $\Delta E_{\mathrm{recoil}}=-1.5$. With envelope gap $8$, medium change $-0.5$, and zero remnant, the emission balance requires $E_\gamma=8-(-1.5)-(-0.5)=10$. Replacing signed changes by positive magnitudes would give $6$ and change the event. This argument uses an assembly-level energy convention, not primitive architrino mass.

If the actual envelope drop is $G_{\mathrm{act}}$ and the reference-environment drop is $G_{\mathrm{ref}}$, then $G_{\mathrm{act}}=E_\gamma+\Delta E_{\mathrm{other}}$ is equivalent to $G_{\mathrm{ref}}=E_\gamma+\Delta E_{\mathrm{other}}+(G_{\mathrm{ref}}-G_{\mathrm{act}})$. The final chapter therefore assigns that signed correction exactly once. Similarly, an excitation already included in the final envelope energy cannot also be an additional remnant charge.

Falsifier: a complete declared energy partition that violates these identities while retaining the stated definitions. Whether any particular physical branch realizes the numerical example is outside this argument.

### Threshold and residual tests

Claim grade: derived. A raw gap of $2$ meets a proposed minimum of $1$, but recoil of $1.5$ leaves only $0.5$ for the photon. Thus raw-gap admission does not imply usable-energy admission. A scalar drive also does not supply an inventory, a trajectory, or conservation compatibility.

For fixed discrepancy $|1-2|=1$, the normalized residual $1/(1+\varepsilon)$ changes from nearly one at $\varepsilon=10^{-9}$ to below $10^{-5}$ at $\varepsilon=10^6$. The floor must be fixed independently of the result. Defining the remnant as gap minus the other entries makes the balance zero by algebra; defining $\nu_\gamma=E_\gamma/h$ makes the frequency residual zero by algebra. Those definitions do not test either physical law.

Falsifier: an independent extraction and predeclared uncertainty budget that precludes these constructions. The examples demonstrate how a diagnostic can lose evidentiary power, not that an existing physical instrument actually used them.

### Ensemble normalization and event occurrence

Claim grade: derived. For a probability measure on a larger preparation with source-basin weight $0.1$ and transition-event weight $0.01$, the conditional transition probability is $0.01/0.1=0.1$, not $0.01$. Without conditioning, the displayed rate mixes population fraction with per-prepared-atom transition weight.

A history with states $a$, then $b+\gamma$, then $a$ after recapture contains an emission event although its terminal atomic state is $a$. The endpoint test alone cannot distinguish it from a history with no emission. An augmented durable event record or a counting functional is required for that distinction.

Falsifier: an explicit source-conditioned measure and target set that already retain the occurrence history. The repair supplies that interpretation without claiming such a physical ensemble or flow has been constructed.

### Finite-window rate

Claim grade: derived. Since $0\le P_{ab}(T_W)\le1$, division by $T_W>0$ gives $0\le P_{ab}(T_W)/T_W\le1/T_W$. The squeeze bound proves convergence to zero at fixed preparation, even if the normalized measures depend on the window.

For the comparison survival function $S_a(T_W)=\exp(-\lambda T_W)$, the escape probability is $1-S_a(T_W)$ and the conditional escape rate is $-d\ln S_a/dT_W=\lambda$. With $\lambda=0.5$, division of the escape probability by duration gives about $0.21616617919084682$ at $T_W=4$ and $0.01$ at $T_W=100$. The constant rate remains $0.5$. The short-depletion approximation follows by expansion: $(1-e^{-\lambda T_W})/T_W=\lambda+O(\lambda^2T_W)$ when $\lambda T_W\ll1$. A continuum recovery also needs a window longer than relevant correlation times; whether both requirements can hold is a physical scale-separation obligation.

Falsifier: a normalized indicator violating the bound or a failure of the displayed exponential derivative. Event counts divided by total exposure can have nonzero long-time limits, but they are not bounded indicator probabilities.

### Detailed balance, phases, and finite samples

Claim grade: derived. With forward coefficient $1$, excited occupation $f_a=0.5$, and $\bar n_\gamma=0$, the displayed downward flux is $0.5$ and the upward flux is zero. Weak homogeneous conditions alone do not remove that population imbalance. The thermal-equilibrium comparison is independently supported by the sources above.

Two contributions with amplitudes $(1,1)$ or $(1,-1)$ have identical individual squared magnitudes, but the squared magnitude of their sum is respectively $4$ or $0$. Rate magnitudes therefore cannot reconstruct the missing relative phase.

For the optional finite-sample clarification, an independent Bernoulli comparison with event probability $0.01$ has no events in $100$ trials with probability $0.99^{100}\simeq0.3660323412732292$. Finite non-observation is compatible with positive measure.

Falsifiers: the explicit arithmetic could fail, or the relevant model could supply additional equilibrium, phase, or exact-exclusion hypotheses. None of these witnesses asserts that an Architrino ensemble is Bernoulli, Markovian, or quantum mechanical.

## Validation and generated-artifact status

Claim grade: measured. Appendix A's instrument first passed known valid and invalid controls without reading the target. Those results were recorded before its baseline run: valid inline/display TeX, ignored code examples, unpaired-dollar rejection, existing/missing paths and Markdown anchors, duplicate-heading anchors, valid/invalid KaTeX, changed-equation preservation detection, and clean/bad whitespace. The baseline target run then passed with 75 math expressions, 16 displays, 26 links, and zero errors.

The repaired chapter passed the same instrument with 123 math expressions, 16 displays, 29 links, and zero errors. All sixteen display-equation blocks, equation IDs, and viewer-link text are byte-identical to the pinned dispatch revision. Every baseline link target and heading was retained. This is source-syntax and preservation evidence; it is not a visual browser inspection, mathematical correctness proof, remote-link health audit, or generated-registry freshness result.

Appendix B passed its exact sum, exponential-at-zero, and ratio controls before running nine finite witness groups. The reference for each witness is the algebra above. The script is an arithmetic check, not an independently implemented model of the physical system.

Before editing, `node scripts/build-equation-mapping-corpus.mjs --check` passed with zero errors. After the chapter edits, the same check reported `generated registry is stale: content/generated/equation-mapping/corpus-equations.json`. The exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`; it was not run because regeneration is outside the assignment. The registry embeds source context and symbols, so preserved display equations do not ensure byte freshness after prose changes. Concurrent changes elsewhere may also affect this global check; this receipt does not attribute all drift to this chapter.

`node scripts/validate-equation-mapping-links.mjs` passed for 23 registered promoted-equation links. That narrower validator does not cover all sixteen displays here; Appendix A provides the chapter-specific identity/link checks.

The first `node scripts/validate-content.mjs --check --strict` run after repair passed with 0 errors, 0 warnings, and 30 informational notes. Scoped `git --no-optional-locks diff --check -- content/markdown/aaa/reactions/atomic-transition-radiation.md` also passed. A complete chapter reread covered final lines 1–384 in three contiguous reads.

After this receipt was created and its blocker references added, the two-path Appendix A check passed with chapter counts of 123 math expressions, 16 displays, and 29 links; the receipt passed with 55 math expressions and 48 links. Both paths had zero math, local-link, and trailing-whitespace errors. The complete receipt was reread, including both reproducible scripts. A report-only extra blank line at EOF found by `git --no-optional-locks diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-atomic-transition-radiation-review-2026-09-12.md` was removed; the repeat emitted no whitespace diagnostics (exit 1 denotes the new-file difference in this no-index comparison). The two-path `rg -n '[[:blank:]]+$'` check likewise returned no matches. The final chapter hash was reconfirmed with `shasum -a 256`, and scoped status showed only an unstaged chapter modification and this untracked receipt in the authorized set.

The subsequent repository-wide `node scripts/validate-content.mjs --check --strict` run failed with 4 errors, 0 warnings, and 30 informational notes across 1692 Markdown files; the final repeat after adding the blocker references returned the same four errors across 1693 Markdown files. All four errors are outside the authorized write set: these live documents link to the absent `tests/current-launch-bindings.test.js`. A scoped literal-path `rg -n` confirmed the four references, and `test -e tests/current-launch-bindings.test.js` confirmed absence at that check time.

| Out-of-scope source | Error line |
| --- | --- |
| [Cached root-cover cutover](../../development-process-review/analysis/option-b-cached-root-cover-cutover.md) | 53 |
| [Cached root-cover full cutover](../../development-process-review/analysis/option-b-cached-root-cover-full-cutover.md) | 51 |
| [Current-source cutover inventory](../../development-process-review/analysis/option-b-current-source-cutover-inventory.md) | 85 |
| [Prescribed-response and acceleration cutover](../../development-process-review/analysis/option-b-prescribed-response-and-acceleration-cutover.md) | 5 |

These errors block a repository-wide strict-validation pass, not the bounded repairs. The earlier green result does not establish the final shared checkout's health, and the later failure does not establish its causal author or transition. No out-of-scope links or target files were changed. Resolution belongs to that workstream's owner: determine whether the missing test was intentionally superseded, then repair the references or restore the intended target and rerun the strict validator.

## Remaining obligations and closure limits

The bounded editorial result repairs the eleven findings above. It does not establish a physical atomic or photon branch, acceleration balance, persistence, EOM solver acceptance, an energy/momentum/angular-momentum conservation theorem, effective Planck or clock calibration, Born-rule or phase recovery, physical transition rates, material absorption, theory closure, or downstream closure.

| Obligation | Status and next evidence |
| --- | --- |
| ATR-O1: physical histories and photon/atomic branches | ○ Open. Supply admissible constituent histories, root completeness, dynamics, persistence, and inherited Gate A/B evidence through the existing owners. |
| ATR-O2: disjoint event accounting and constituent routing | ○ Open. Compute rather than fit the atom/photon/sea identities and signed energy, momentum, and angular-momentum entries on one event boundary. |
| ATR-O3: physical ensemble and rate estimator | ○ Open. Define preparation, normalization, durable occurrence or event-count protocol, competing exits, and correlation/depletion/recurrence scales. |
| ATR-O4: phase-sensitive and observer recovery | ○ Open. Derive amplitudes, relative phases, density normalization, clock conversion, and cross-line/cross-channel predictions from that ensemble. |
| ATR-O5: precision and downstream phenomena | ○ Open. Atomic spectra correction budgets, spin-sensitive lines, two-photon channels, transport/escape, material response, and cosmological source/propagation separation retain their existing proof burdens. |

Next concrete step: the coordinator can check this receipt against the final chapter hash and integrate the bounded disposition into the shared CRW-005 board. That shared-record edit is outside this assignment. The first substantive mathematical continuation is ATR-O3's explicit normalized event-occurrence estimator on an already admitted history domain; the absence of a physical branch must remain visible while that estimator is developed.

## Appendix A — Reproducible two-path source checks

Run from the repository root. The first invocation uses `CRW_MODE=controls` and no target arguments; the second uses the two paths below. The checker executes read-only Git inspection. It ignores fenced and inline code when extracting dollar math, uses the existing Markdown parser for links, and checks simple Markdown heading fragments. HTML anchors and remote source availability are outside its fragment check.

```bash
CRW_MODE=controls node --input-type=module - <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const katex=loadVendoredCommonJsBundle('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js');
const md=loadVendoredCommonJsBundle('vendor/markdown-it/markdown-it.min.js')({html:true});
function prose(s) {
 let fence=null;
 return s.split('\n').map(line=>{
  const m=line.match(/^\s*(\x60{3,}|~{3,})/);
  if(m){if(!fence)fence=m[1][0];else if(fence===m[1][0])fence=null;return '';}
  return fence?'':line.replace(/(\x60+).*?\1/g,'');
 }).join('\n');
}
function math(s) {
 const out=[];
 const rest=prose(s).replace(/\$\$([\s\S]*?)\$\$|(?<!\\)\$([^\n$]+?)(?<!\\)\$/g,(all,d,i)=>{
  out.push({tex:d??i,display:d!==undefined});return ' '.repeat(all.length);
 });
 assert.doesNotMatch(rest,/(?<!\\)\$/,'unpaired dollar delimiter');return out;
}
function links(s) {
 const out=[];function walk(ts){for(const t of ts){if(t.type==='link_open')out.push(t.attrGet('href'));if(t.type==='image')out.push(t.attrGet('src'));if(t.children)walk(t.children);}}
 walk(md.parse(s,{}));return out;
}
function anchors(s) {
 const out=new Set(),counts=new Map(),ts=md.parse(s,{});
 for(let i=0;i<ts.length;i++)if(ts[i].type==='heading_open'){
 const base=ts[i+1].content.replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}_\-\s]/gu,'').toLowerCase().replace(/\s/g,'-');
 const n=counts.get(base)||0;counts.set(base,n+1);out.add(n?base+'-'+n:base);
 }
 return out;
}
function issues(file,s,exists=fs.existsSync,read=p=>fs.readFileSync(p,'utf8')){
 const out=[];for(const href of links(s)){
  if(/^(https?:|mailto:|tel:|data:)/.test(href))continue;
  const [rel,frag]=href.split('#');const dest=path.resolve(path.dirname(file),decodeURIComponent(rel||path.basename(file)));
  if(!exists(dest)){out.push('missing path '+href);continue;}
  if(frag&&dest.endsWith('.md')&&!anchors(read(dest)).has(decodeURIComponent(frag)))out.push('missing anchor '+href);
 }return out;
}
const white=s=>s.split('\n').flatMap((line,i)=>/[ \t]+$/.test(line)?[i+1]:[]);
const displays=s=>parseCorpusDisplayEquations('known.md',s).map(b=>({math:s.slice(b.openStart,b.closeEnd),link:b.existingLink?.text,id:b.existingLink?.semanticId}));
const control='# Alpha\nText $x+1$.\n$$\nx^2\n$$\n\n[View →](equation-mapping.html#corpus-equation-0123456789abcdef)\n[ok](a.md#alpha)\n\x60$ignored$ [ignored](missing.md)\x60\n~~~md\n$$ignored$$\n[ignored](missing.md)\n~~~\n';
assert.deepEqual(math(control).map(x=>x.tex.trim()),['x+1','x^2']);
assert.throws(()=>math('$unclosed'));
assert.equal(links(control).length,2);
assert.equal(displays(control).length,1);assert.ok(displays(control)[0].id);
assert.deepEqual(displays(control),displays('Added prose.\n'+control));
assert.notDeepEqual(displays(control),displays(control.replace('x^2','x^3')));
assert.deepEqual(issues('known.md','[ok](a.md#alpha)',()=>true,()=> '# Alpha'),[]);
assert.equal(issues('known.md','[bad](a.md#missing)',()=>true,()=> '# Alpha').length,1);
assert.equal(issues('known.md','[bad](missing.md)',()=>false).length,1);
assert.deepEqual([...anchors('# Alpha\n# Alpha')],['alpha','alpha-1']);
assert.doesNotThrow(()=>katex.renderToString('\\frac{1}{2}',{throwOnError:true,strict:'error'}));
assert.throws(()=>katex.renderToString('\\notACommand',{throwOnError:true,strict:'error'}));
assert.deepEqual(white('clean\n'),[]);assert.deepEqual(white('bad \n'),[1]);
console.log('CONTROLS PASS: math/code exclusion, delimiter error, links/anchors, duplicate headings, valid/invalid KaTeX, preservation mutation, whitespace.');
if(process.env.CRW_MODE!=='controls'){
 for(const file of process.argv.slice(2)){
 const s=fs.readFileSync(file,'utf8'),m=math(s),d=displays(s);
 for(const e of m)katex.renderToString(e.tex,{displayMode:e.display,throwOnError:true,strict:'error'});
 assert.deepEqual(issues(file,s),[]);assert.deepEqual(white(s),[]);
 if(file.startsWith('content/')){
  assert.ok(d.every(x=>x.id));
  const base=execFileSync('git',['show','859f2b07cb17889ca2c239d82fd61455c2ba903c:'+file],{encoding:'utf8'});
  assert.deepEqual(d,displays(base));assert.deepEqual([...anchors(base)],[...anchors(s)].slice(0,anchors(base).size));
  for(const href of links(base))assert.ok(links(s).includes(href),'removed baseline link '+href);
 }
 console.log(JSON.stringify({file,math:m.length,displays:d.length,links:links(s).length,errors:0,whitespace:0}));
 }
}
NODE
```

For the target invocation, use the same JavaScript body with this command line and omit the controls-only environment variable:

```bash
node --input-type=module - content/markdown/aaa/reactions/atomic-transition-radiation.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-atomic-transition-radiation-review-2026-09-12.md <<'NODE'
# Paste the exact JavaScript body above here, without this placeholder line.
NODE
```

## Appendix B — Reproducible arithmetic checks

```bash
node --input-type=module - <<'NODE'
import assert from 'node:assert/strict';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12);
near(2+3,5);near(Math.exp(0),1);near(1/2,0.5);
console.log('ARITHMETIC CONTROLS PASS: exact sum, exponential at zero, ratio.');
const c_f=1;assert.equal(c_f,1);
near(0.01/0.1,0.1);
const gap=8,recoil=0.5-2,medium=-0.5,remnant=0;
near(gap-recoil-medium-remnant,10);
assert.ok(2>=1);assert.ok(2-1.5<1);
const residual=floor=>Math.abs(1-2)/(1+floor);
assert.ok(residual(1e-9)>1e-5);assert.ok(residual(1e6)<1e-5);
near(1*0.5*(1+0),0.5);near(1*0.5*0,0);
const rate=T=>-Math.expm1(-0.5*T)/T;
near(rate(4),(1-Math.exp(-2))/4);assert.ok(rate(4)<0.5);
assert.ok(rate(100)<=0.01);assert.ok(Math.abs(rate(1e-6)-0.5)<2e-7);
near((1+1)**2,4);near((1-1)**2,0);
assert.ok(Math.pow(0.99,100)>0.36);
const trace=['a','b+photon','a'];assert.equal(trace.at(-1),'a');assert.ok(trace.includes('b+photon'));
console.log('WITNESSES PASS: 9 groups; conditional normalization, signed energy, usable gate energy, residual floor, nonequilibrium flux, finite-window rate, phase ambiguity, finite-sample zero, endpoint recapture.');
console.log(JSON.stringify({c_f,rate4:rate(4),rate100:rate(100),zeroEventsProbability:Math.pow(0.99,100)}));
NODE
```
