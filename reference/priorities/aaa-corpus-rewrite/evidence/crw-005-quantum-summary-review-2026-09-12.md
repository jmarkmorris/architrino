# CRW-005 Quantum Summary Review — 2026-09-12

## Disposition and provenance

The bounded review of priority 53, [Quantum Summary](../../../../content/markdown/aaa/quantum/quantum-summary.md), identified and repaired ten finding groups: QS-01–QS-10, five High and five Medium. High marks an omitted condition capable of changing a mathematical or physical conclusion; Medium marks an ambiguous summary, undefined interface, or unsupported ranking. These are local editorial and mathematical-contract repairs. The editor's complete reread is self-review; the independently checkable references are the explicit comparison arguments below, not the identity or number of agents.

The operator authorized edits only to the chapter and creation of this receipt. This task did not edit shared status, priorities, work queue, work log, conversion ledger, generated artifacts, fixtures, other chapters, code, or publication files. It used no Git writes or linked worktrees. Coordinator adjudication and shared disposition remain outside this assignment.

Measured before editing by scoped `git --no-optional-locks status --short -- content/markdown/aaa/quantum/quantum-summary.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-quantum-summary-review-2026-09-12.md`, neither path had a status entry. The report's absence was separately checked with `test ! -e`. Two pre-edit `shasum -a 256` reads of the chapter matched the dispatch baseline:

```text
14e84fb68bc8c8fb79e14492f0db3fac0dfd14a36f1ff875c46a57f12511f3ca
```

The same baseline bytes are retained at Git object `2490eb54aef24bf6d9a49cbc7ba62f1e54553305:content/markdown/aaa/quantum/quantum-summary.md`, whose SHA-256 is asserted by the preservation check. Baseline references below refer to the complete `nl -ba` read, lines 1–48. The repaired chapter retains those five headings and source-line locations; no paragraphs were manually hard-wrapped.

Final chapter SHA-256, measured by `shasum -a 256`:

```text
38b246c282807e119d4e1a17b0a40ea9f7ca541524d578647dc9b75000009776
```

Claim grade: measured for file states, hashes, and mechanical preservation, using the named commands at their recorded scope. Falsifier: a rerun on the retained baseline object or delivered chapter produces different bytes, or the two-path diff shows an unrecorded modification. Other agents' live work is not attributed to this task.

## Sources and owners inspected

The complete chapter, [AGENTS.md](../../../../AGENTS.md), [generated startup router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), [skill owner](../../../op/skills/skill-architrino-review.md), [Corpus Reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), [Theory Orientation](../../../op/theory-orientation.md), operator explanation standard, execution template, and geometry/dynamics review lens governed this pass. The operator's explicit repair scope overrides the review-only default and the historical conversion requirement to edit a ledger.

The [CRW-005 queue](../work-queue.md), lines 1–47, distinguishes preservation-only conversion from substantive assurance; the [status board](../corpus-review-status.md), line 9 at inspection, assigns Quantum Summary priority 53. The [priorities](../priorities.md), [conversion provenance](conversion-ledger.md) at line 98, and the quantum scene/navigation references were inspected for placement and scope. Historical queue counts were not treated as fresh status measurements.

The academic style guide, mathematical style guide, mathematical terminology, terminology usage, comparative glossary, and [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md) supplied the claim, notation, reference, and audience rules. Foundation passages in Ontology, Architrino, Euclidean Void, Absolute Time, Absolute Timespace, Detecting the Absolute Frame, Constructing the Absolute Frame, and the Master Equation supplied the substrate and clock-map boundaries. The review does not claim a new audit of those chapters.

The substantive source passages were:

| Source | Inspected passage and purpose |
| --- | --- |
| [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md) | Lines 7–110, 142–248, and 399–446: phase-amplitude chart, chart measure, apparatus coefficients, Born density/current, and repeated-record obligations |
| [Measurement Ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md) | Lines 311–400, same-measure discussion beginning at 731, and finite-time falsifier at 1375–1386: distinct crossing/split/record times, persistence, and conditional lower bounds |
| [Algorithmic Resonance](../../../../content/markdown/aaa/quantum/algorithmic-resonance.md) | Lines 66–115: apparatus-clock durations, first-passage definition, threshold comparison, and weak memoryless estimate |
| [Fermi-Dirac and Bose-Einstein Statistics](../../../../content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md) | Lines 42–58, 76–120, 132–166, and 275–304: exchange phase, composites, anyonic cases, and the separate occupation-law burden |
| [Quantum Operator Mapping](../../../../content/markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md) | Lines 593–635: parity versus antiunitary time reversal and symmetry hypotheses |
| [Bell's Theorem](../../../../content/markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md) | Lines 254–285, 445–480, and 644–749: complete conditioning, reduced restartability, causal reach/ordering, product bound, and residual normalization |
| [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) | Lines 2698–2700, 2784–2802, 2865–2969, and Stern-Gerlach response passages: spin-half scaffold, downstream limits, and the conditional helicity projection lemma |
| [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md) | Lines 9–11 and 65–87: referent-pending planar pair and distinct photon Gates A/B/C |
| [No-Go Theorems](../../../../content/markdown/aaa/validation/no-go-theorems.md) | Applicability rules and Bell, contextuality, state-reality, and observed-observer entries: reject unsupported exemption claims |
| [Reaction Ledger](../../../../content/markdown/aaa/validation/reaction-ledger.md), [Reaction-Cosmology Provenance Ledger](../../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) | Reaction scope and photon gate entries: all event accounts and inherited spin authority |

Opening and relevant navigation passages of Pilot-Wave Character, Superposition Mechanism, Measurement Problem and Collapse, Entanglement and Nonlocality, and Braid Envelope Geometry were checked against the hub's descriptions. The mapping-quantum priorities and quantum entries in the closure-join matrix were read for ownership. These are local sources, not independently reproduced physical evidence. Source line references name passages as inspected in the shared checkout; concurrent downstream review does not retroactively turn them into accepted results.

No external source claim was added as evidence. Standard quantum formulas below are explicitly comparison mathematics, supported here by their stated definitions and elementary algebra; none is a premise for architrino acceleration or branch existence.

## Findings and repairs

### QS-01 — High: basin weights do not determine the effective quantum state

Baseline lines 3–5 and 23 reduced the state to basin-weight bookkeeping and left the foundational objects undefined for an arriving reader. The owner's phase-amplitude contract retains phase and apparatus response. In an effective two-dimensional comparison chart, the normalized vectors $(1,1)/\sqrt2$ and $(1,-1)/\sqrt2$ have identical component weights but are orthogonal; projecting onto the first vector gives probabilities one and zero. Thus weights in one channel cannot specify responses in another.

Repaired lines 3–5, 17, and 23 name phase, amplitude, the channel, basin, and physical measure, link the primitive ontology and acceleration law, and keep recovery open on a well-posed history. The explanation of a separatrix also prevents a boundary crossing from being read as an established persistent record.

Claim grade: derived for the two-vector counterexample; inferred for the assessment that the original compressed description concealed a necessary state variable. Falsifier: a declared state-extraction theorem showing that the retained weights uniquely fix all phase-sensitive channel probabilities on its stated domain. Merely matching one histogram does not meet that test.

### QS-02 — High: a position density is not an arbitrary measurement law

Baseline line 10 said that the record pushforward equals the envelope density without naming the common output space or reference measure. A pushforward is a measure; a density is its value per unit of a declared reference measure. On a position chart with record map $R$, physical measure $\mu$, and chart measure $\nu$, the desired statement is $(R_*\mu)(A)=\int_A|\psi|^2\,d\nu$ for every measurable region $A$, with $\int|\psi|^2d\nu=1$. It does not give a spin or other apparatus outcome law merely by changing its label.

Repaired line 10 restricts the density comparison to the declared position-record chart, states normalization, and routes other observables through their independently derived apparatus response or effective operator. The original Born-square expression is preserved.

Claim grade: derived for the measure/density distinction; inferred for the need to restore the omitted chart qualification. Falsifier: a common output-space and density definition already making the original statement valid for every channel being claimed, or a derived universal response map meeting those conditions. The two-vector witness in QS-01 shows why a position or basis histogram alone is insufficient.

### QS-03 — Medium: first-passage definitions do not prove finite or uniformly positive times

Baseline line 9 listed three undefined times and focused on a positive lower bound. The owner distinguishes elapsed split, crossing, and persistent-record times. An infimum of positive eligible times can be zero: $\inf\{1/n:n\ge1\}=0$. If no eligible time exists, the first-passage time is $+\infty$ under the extended-real convention. Neither a positive lower bound over an apparatus class nor finite formation follows from defining the infimum.

Repaired line 9 names each duration, identifies its apparatus-clock layer, separates the clock map from absolute time, and gives the lower-bound-versus-measured-upper-bound falsifier. No claimed ordering is manufactured solely from the infimum definition.

Claim grade: derived for the infimum examples; inferred for the summary repair. Falsifier: an apparatus-class proof of finite passage and a strictly positive uniform lower bound under explicit initial-history and coupling assumptions. It would discharge this obligation for that class, not every apparatus.

### QS-04 — Medium: an unsupported ranking blurred a scaffold with an established channel

Baseline line 12 called Stern-Gerlach “the most concrete” without a comparison criterion or link at that point. The source specifies an effective spin-one-half comparison and unfinished substrate, selection-efficiency, and measure requirements.

Repaired line 12 calls it a worked scaffold, links the owning section, specifies the two-record spin-half comparison, and explains kernel, spinor, heralding efficiency, and Born residual. All named open obligations remain.

Claim grade: inferred editorial finding against the local evidence and audience contract. Falsifier: a declared cross-channel ranking with comparable evidence, or an independently validated substrate response making the stronger physical reading justified. Neither is supplied by the cited scaffold.

### QS-05 — High: geometry and exchange symmetry are not the occupation distributions

Baseline line 26 described the two statistics as a geometry transition; line 46 omitted the owner's independent equilibrium-occupation step. Volumetric exclusion alone cannot select an exchange phase. Symmetric exchange also does not fix populations: the vacuum and a symmetric one-excitation state share bosonic exchange character but have different occupation means. The owner further keeps composite bosons and confined anyonic channels separate from the planar photon candidate.

Repaired lines 26 and 46 identify the geometry account as proposed, retain the ordered-frame and $2\pi/4\pi$ requirements, require binding/internal-state preservation for composite exchange, and restore state counting, energy mapping, and a common equilibrium ensemble as separate obligations.

Claim grade: derived for the logical independence of exchange character and occupation count; inferred for the local overcompression finding. Falsifier: a same-record derivation that fixes both the exchange representation and the equilibrium weights, including the declared composite/2D domain. A fitted shape ratio or parity count is insufficient.

### QS-06 — Medium: common provenance does not itself prove conservation

Baseline line 42 described probabilities, thermodynamic summaries, persistence, and closure alike as pushforwards of one record and prohibited different ensembles without naming legitimate conditioning. The mathematical operation producing probabilities acts on a measure; a record is its underlying data, and an event balance is a functional to evaluate. A common normalized measure with an event defect equal to one on every history has mean defect one, not zero.

Repaired line 42 distinguishes the common ensemble, response pushforward, and separately evaluated event balances, includes boundary exchange, and allows explicit conditional samples from the same parent measure. It preserves the prohibition on independently fitting incompatible ensembles.

Claim grade: derived for the constant-defect counterexample and measure/functional distinction. Falsifier: a physical accounting theorem that makes the event residual vanish on the admitted histories, with explicit conditioning and boundary terms. Shared provenance or cancellation of an average alone does not supply it.

### QS-07 — High: a defined passage time was promoted to a derived error rate

Baseline line 43 said the decoherence time “is derived” and used its reciprocal in the weak memoryless estimate. The source supplies an implicit first-passage definition, not a solved time or an ensemble hazard. Two equally weighted ensembles with passage times $(1,3)$ and $(2,2)$ have the same mean two but probabilities $1/2$ and zero of passage by time $3/2$. The mean alone therefore does not determine per-cycle error.

For an explicitly constant error hazard $r$ on an elapsed effective apparatus clock $t_{\mathrm{eff}}$, survival solves $dS_{\mathrm{surv}}/dt_{\mathrm{eff}}=-rS_{\mathrm{surv}}$ with $S_{\mathrm{surv}}(0)=1$, hence the chance of at least one event over a cycle of duration $d$ is $1-e^{-rd}$. Only when $rd\ll1$ and the counted event matches the error definition does this become $rd$. The original ratio further needs $r=1/\tau_{\mathrm{decoh}}$ justified for that ensemble, plus non-overlapping gate/correction intervals on one clock.

Repaired line 43 preserves both original inequalities but states those hypotheses, calls the passage time defined rather than derived, and identifies the threshold as a code/decoder/noise-model acceptance condition with separate logical-suppression evidence. It does not prescribe a physical noise mechanism.

Claim grade: derived for the two ensembles and exponential-hazard calculation; inferred for the hub's missing assumptions. Falsifier: a retained ensemble deriving the relevant hazard and clock conversion and satisfying the applicable threshold theorem. A single observed passage time or a definition by infimum is insufficient.

### QS-08 — Medium: parity was grouped with antiunitary time reversal

Baseline line 45's “parity/time-reversal antiunitary benchmarks” permits the reading that both operations are antiunitary. The owner separates them. In a one-dimensional effective position representation, parity acts by spatial inversion, $(\Pi\psi)(x_{\mathrm{eff}})=\psi(-x_{\mathrm{eff}})$, so $\Pi(i\psi)=i\Pi\psi$ and the norm is unchanged. Time reversal's antiunitary operation instead obeys $\Theta(i\psi)=-i\Theta\psi$.

Repaired line 45 states unitary parity and antiunitary time reversal separately and briefly explains the geometric-phase terms. This changes no operator equation or substrate law.

Claim grade: derived from the stated comparison transformations, corroborated by Quantum Operator Mapping lines 593–631. Falsifier: a different explicitly declared representation in which the claim concerned a combined operation rather than ordinary parity. No such combined operation was named in the hub.

### QS-09 — High: reduced non-restartability is not an alternative to Bell nonfactorizability

Baseline line 47 offered “a derived non-product joint response or non-restartable provenance compression.” Non-restartability only says that a reduced state omits relevant history. A complete hidden record can retain that history and still be Bell-local. For example, let a fair shared bit $\lambda=\pm1$ be visible initially, erased from the intermediate reduced state, and remembered by both detectors at the final record, with $A_x=B_y=\lambda$ for every setting. Conditioning on the earlier bit makes the final outcome certain, whereas restarting from the intermediate reduced state alone gives each outcome probability one half. Thus this reduced description is non-restartable across the three times; nevertheless all four correlations are one and the CHSH expression is two. The observed joint table is correlated, but conditioning on $\lambda$ makes it a product.

For complete local responses $A,A',B,B'\in[-1,1]$, the pointwise bound follows from $|A(B+B')+A'(B-B')|\le|B+B'|+|B-B'|\le2$. Integration against one setting-independent source measure preserves it. If each outcome-setting probability differs from one Bell-local comparison table by at most $\Delta_{\mathrm{prod}}$, each correlation changes by at most $4\Delta_{\mathrm{prod}}$ and the four-term CHSH expression changes by at most $16\Delta_{\mathrm{prod}}$. The retained lower bound $(\sqrt2-1)/8$ follows for exact optimal singlet recovery. Distance from one arbitrarily selected product table is not evidence of distance from every Bell-local reconstruction.

Repaired line 47 defines the complete conditioning, residual, and four-setting sum, keeps the correct bound byte-for-byte, and requires failure of every Bell-local reconstruction together with the other causal, no-signaling, independence, and ordering checks.

Claim grade: derived for the counterexample and inequality. Falsifier: a local, setting-independent complete-history model violating the pointwise inequality while retaining its stated output bounds; or a physically derived admissible nonfactorizable joint law for the candidate. Showing missing history in a reduced state is not that evidence.

### QS-10 — Medium: an angular-momentum balance bound does not establish helicity

Baseline line 48 called photon helicity an event-window projection with error controlled by an undefined vector defect. The owning lemma compares two angular-momentum projections along a fixed unit axis, both normalized by the reduced Planck constant. If their difference is $\hat{\mathbf k}\cdot\mathbf B_\gamma^0/\hbar$, Cauchy-Schwarz gives an absolute discrepancy at most $\|\mathbf B_\gamma^0\|/\hbar$. This establishes neither the eigenvalues $\pm1$ nor absence of transverse components: one can close a vector balance for an arbitrary nonquantized projection.

Repaired line 48 identifies the compared quantities and their dimensionless normalization, common axis/origin/frame/window, the complete event accounts, and the separate physical-mode obligations. The final reread restored the explicit normalization in the edited sentence so its left side and norm-bound right side have the same units. It also identifies Gate A as kinematics/optics and Gate C as vertices/transitions/ensemble occupation, preserving Gate B's broader Born-rule dependency.

Claim grade: derived for the projection bound; inferred for the missing hypothesis/interpretation repair. Falsifier: an independent same-branch mode derivation establishing quantization and transverse closure. A small balance residual alone cannot do so.

## Coverage, preservation, and validation

Every baseline paragraph and link description was read, including the unchanged photon referent boundary, no-go routing, two correlation links, and the Born/scattering recovery routes. The final chapter was reread in full against the diff. The existing bounds were checked algebraically rather than deleted merely because they are effective comparisons. No new display equation or equation-viewer identity was introduced.

The source-binding inventory was measured before editing with `rg -l -F 'quantum-summary.md' scripts tests content reference apps src`. It found the scene, graph/TOC, Markdown index, source snapshot, reference surface, on-demand iOS TOC, and priority/conversion consumers. This is a literal-path inventory over those directories, not a claim that generic generators have no dependency. The equation generator's check/write branches at lines 693–735 and equation-link checker were read; check mode does not regenerate. The chapter has no display-equation records, measured by the corpus display parser, so this pass preserves an empty viewer-identity inventory.

The custom scanner and arithmetic helpers passed their known-case-only runs before any target/witness run. Controls included fenced and inline code exclusion, valid and invalid math, existing and missing paths, heading slugs, repeated-item preservation, whitespace positives/negatives, CDF endpoints, a dot product, and a known CHSH assignment. One orchestration attempt failed JavaScript parsing before executing a shell or inspecting a target; it was corrected before the successful controls.

Six arithmetic witness groups passed: distinct interference for equal weights; equal mean passage times with different event probabilities and the weak exponential remainder; all 16 deterministic Bell vertices and coefficient-16 residual arithmetic; common-measure nonconservation; vector-projection bounds; and exchange-sign/occupation independence. These check elementary comparison claims, not a simulation or physical branch. All speed instantiation is normalized to $c_f=1$.

The complete chapter and receipt, including the reproduced programs, were reread. Validation results are measured by the following commands and bounded instruments:

| Command or instrument | Scope and result |
| --- | --- |
| `git diff -- content/markdown/aaa/quantum/quantum-summary.md` and complete `nl -ba` reads | All 48 chapter lines reviewed against baseline; ten finding groups account for the edits. The new receipt was read directly because untracked files do not appear in an ordinary Git diff. |
| `git diff --check HEAD -- content/markdown/aaa/quantum/quantum-summary.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-quantum-summary-review-2026-09-12.md` | Pass for tracked differences; the custom whitespace check separately covers the untracked receipt. |
| Reproduced two-file check, mode `final` | Pass after known controls: KaTeX 0.16.11 renders 20 chapter and 40 receipt math spans; all 44 chapter and 24 receipt local links resolve; zero trailing-whitespace, unmatched-math, or unclosed-fence findings. Both files have zero display equations. |
| Baseline comparison inside the two-file check | Pass: the exact baseline hash, all 14 original inline math strings, all 39 original link-target occurrences, five headings, and empty display-equation inventory are preserved. |
| Reproduced arithmetic witnesses, mode `witnesses` | Pass for all six comparison groups after the helper controls. These are independent elementary arguments, not acceptance tests for a physical model or the EOM solver. |
| `node scripts/validate-content.mjs --check --strict` before editing | Pass: 0 errors, 0 warnings, 30 notes across 1,696 repository Markdown files. |
| `node scripts/validate-content.mjs --check --strict` after the two-file repair | Repository-wide check is not green: 3 errors, 0 warnings, 30 notes across 1,699 repository Markdown files. All three errors point to literal example links at line 200 of the separate [Reality, Quantum, Causality review receipt](crw-005-reality-quantum-causality-review-2026-09-12.md); none names the two authorized paths. |
| `shasum -a 256 content/markdown/aaa/quantum/quantum-summary.md` and scoped `git --no-optional-locks status --short --` with the two paths | Chapter hash recorded above; chapter has an unstaged modification and receipt is untracked. No target is staged by this task. |

An earlier combined run reported three literal example-link errors in this receipt's checker controls. Inspection of `scripts/validate-content.mjs` lines 748–767 established that its link extractor skips triple-backtick fences but not tilde fences. The receipt's outer fences were changed to triple backticks, without changing the checker, its test examples, or any other file; the next strict run no longer named this receipt. The remaining errors name `AGENTS.md` and two occurrences of `missing` in the separate receipt's code example. Those errors are an out-of-scope whole-repository validation blocker, not evidence of broken links in the chapter; its owner must adjudicate them before the coordinator claims a green combined run.

The checks used are reproduced below. They are read-only, run from the repository root, and keep their controls before their target use. The scanner covers the authored inline-dollar and standalone-display syntax of these two files; it is not a general Markdown implementation or an equation-proof oracle. Local Markdown fragments are checked against headings. External URLs are not treated as verified sources by this scanner.

## Generated-artifact status

The pre-edit `node scripts/build-equation-mapping-corpus.mjs --check` passed with zero errors, and `node scripts/validate-equation-mapping-links.mjs` passed for 23 registered links. After the chapter edits, the registry check reported:

```text
generated registry is stale: content/generated/equation-mapping/corpus-equations.json
```

This is a repository-wide observation during concurrent work, not causal attribution to Quantum Summary. The check's display-equation count stayed 4,685 while its symbol-definition count changed from 30,439 to 30,444; this chapter has zero display equations. No generator or reference implementation was edited, and no regeneration was run. The exact deferred command for an authorized regeneration owner is:

```sh
node scripts/build-equation-mapping-corpus.mjs --write
```

The source-index snapshot and on-demand reading/packaging consumers were not regenerated or freshness-audited; their existence is not a freshness pass. Registry drift does not block the two-file editorial repair, but a passing scoped check must not be reported as repository-wide generated freshness.

## Remaining obligations and closure limits

| Status | Obligation | Owner and checkable completion condition |
| --- | --- | --- |
| ○ Open | Effective quantum state and Born recovery | Wavefunction Ontology and the mapping-quantum measure program must derive the phase-amplitude chart, physical preparation measure, apparatus pushforward, and repeated frequencies without fitting the target weights. |
| ○ Open | Finite records and error hazards | Measurement Ontology and Algorithmic Resonance must solve a concrete channel, establish the relevant clock map and persistence, and derive or independently calibrate the ensemble error process. |
| ○ Open | Spin, exchange, and occupations | Angular Momentum and Spin and the statistics chapter must supply the retained physical rotation/exchange record, composite controls, energy map, and equilibrium state counting. |
| ○ Open | Bell recovery | Bell's Theorem and the pair-provenance program must exhibit an admissible joint law that passes the full residual set and cannot be reconstructed as a Bell-local complete-history model. |
| ○ Open | Photon physical referent | Electroweak Bosons and its inherited Gate A/B/C owners must exhibit the branch and independently establish its dynamics, stability, modes, and event accounts. |
| ○ Blocked outside scope | Repository-wide validation | The owner of the separate Reality, Quantum, Causality receipt must resolve its three reported code-example link errors, then the coordinator must rerun the strict content check. |
| ○ Coordinator handoff | Shared CRW-005 disposition | Review this chapter/receipt diff and verify the final hash before recording the priority-53 disposition in the shared owners. This task has no write authority over those records. |

The accepted local claim is that the hub states these contracts more precisely. Its ten repairs do not prove a physical branch, certify the EOM solver, select a Born measure, solve spin-statistics, recover Bell correlations, or establish theory/downstream closure. There is no blocker to completing the authorized two-file repair. The next concrete step is coordinator review and shared disposition after hash verification.

## Reproducible two-file check

```sh
node --input-type=module - final <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const chapter='content/markdown/aaa/quantum/quantum-summary.md';
const receipt='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-quantum-summary-review-2026-09-12.md';
const baselineCommit='2490eb54aef24bf6d9a49cbc7ba62f1e54553305';
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
function scan(s){
  let fence=null,display=false; const math=[],links=[],headings=[],trailing=[],unmatched=[];
  for(const [i,raw] of s.split('\n').entries()){
    if(/[ \t]+$/.test(raw))trailing.push(i+1);
    const f=raw.match(/^\s*(\x60{3,}|~{3,})/);
    if(f){if(!fence)fence=f[1];else if(f[1][0]===fence[0]&&f[1].length>=fence.length)fence=null;continue;}
    if(fence)continue;
    const line=raw.replace(/\x60+[^\x60]*\x60+/g,'');
    if(/^#{1,6} /.test(line))headings.push(line);
    for(const m of line.matchAll(/\[([^\]]*)\]\(([^\s)]+)\)/g))links.push({line:i+1,label:m[1],href:m[2]});
    if(line.trim()==='$$'){display=!display;continue;}
    if(display)continue;
    const residue=line.replace(/(?<!\\)\$([^$\n]*)(?<!\\)\$/g,(_,tex)=>{math.push({line:i+1,tex});return '';});
    if(/(?<!\\)\$/.test(residue))unmatched.push(i+1);
  }
  return {math,links,headings,trailing,unmatched,unclosed:!!fence||display};
}
const slug=s=>s.replace(/^#{1,6}\s+/,'').toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').replace(/\s/g,'-');
function checkLink(file,href){
  if(/^(https?:|mailto:)/.test(href))return true;
  const [p,anchor]=href.split('#'),target=path.resolve(path.dirname(file),decodeURIComponent(p));
  if(path.isAbsolute(p)||!fs.existsSync(target)||!fs.statSync(target).isFile())return false;
  return !anchor||!target.endsWith('.md')||scan(fs.readFileSync(target,'utf8')).headings.some(h=>slug(h)===decodeURIComponent(anchor));
}
function preserves(old,next){const pool=[...next];for(const x of old){const i=pool.indexOf(x);if(i<0)return false;pool.splice(i,1);}return true;}
function controls(){
  const known='# Known\n[ok](AGENTS.md) $x^2$\n~~~md\n[skip](bad.md) $bad$\n~~~\n\x60[skip](bad.md)\x60\n$$\ny^2\n$$\n';
  const s=scan(known); assert.equal(s.links.length,1);assert.equal(s.math.length,1);assert.equal(s.math[0].tex,'x^2');assert.equal(s.math[0].line,2);assert.equal(s.unclosed,false);assert.deepEqual(s.unmatched,[]);
  assert.deepEqual(scan('x \ny\t\n').trailing,[1,2]);assert.deepEqual(scan('$x').unmatched,[1]);assert.equal(scan('$$\nx').unclosed,true);
  assert.deepEqual(parseCorpusDisplayEquations('known.md',known).map(x=>x.tex),['y^2']);
  assert.match(katex.renderToString('x^2',{throwOnError:true,strict:'error'}),/katex/);assert.throws(()=>katex.renderToString('\\unknownQSCommand',{throwOnError:true}));
  assert.equal(checkLink('test.md','AGENTS.md'),true);assert.equal(checkLink('test.md','__qs_missing_control__.md'),false);
  assert.equal(slug('## Photon Closure Interface'),'photon-closure-interface');
  assert.equal(preserves(['a','a'],['a','a','b']),true);assert.equal(preserves(['a','a'],['a','b']),false);
  console.log('PASS controls: fence/code-aware scanner, inline/display math, malformed math, KaTeX positive/negative, paths, slugs, multiset preservation, whitespace.');
}
controls();
if(process.argv[2]==='controls')process.exit(0);
const old=execFileSync('git',['show',baselineCommit+':'+chapter],{encoding:'utf8'});
assert.equal(sha(old),'14e84fb68bc8c8fb79e14492f0db3fac0dfd14a36f1ff875c46a57f12511f3ca');
const now=fs.readFileSync(chapter,'utf8'),a=scan(old),b=scan(now);
assert.ok(preserves(a.math.map(x=>x.tex),b.math.map(x=>x.tex)),'original inline math changed');
assert.ok(preserves(a.links.map(x=>x.href),b.links.map(x=>x.href)),'original link target changed');
assert.deepEqual(a.headings,b.headings);
assert.deepEqual(parseCorpusDisplayEquations(chapter,old).map(x=>x.tex),parseCorpusDisplayEquations(chapter,now).map(x=>x.tex));
for(const file of process.argv[2]==='chapter'?[chapter]:[chapter,receipt]){
  const source=fs.readFileSync(file,'utf8'),s=scan(source),displays=parseCorpusDisplayEquations(file,source);
  assert.equal(s.unclosed,false);assert.deepEqual(s.unmatched,[]);assert.deepEqual(s.trailing,[]);
  const broken=s.links.filter(l=>!checkLink(file,l.href));assert.deepEqual(broken,[]);
  for(const m of [...s.math,...displays])katex.renderToString(m.tex,{throwOnError:true,strict:'error',displayMode:!!m.startLine});
  console.log(JSON.stringify({file,sha256:sha(source),math:s.math.length+displays.length,displays:displays.length,links:s.links.length,broken:broken.length,whitespace:s.trailing.length}));
}
console.log(JSON.stringify({baselineMath:a.math.length,preservedInlineMath:true,baselineLinks:a.links.length,preservedLinkTargets:true,preservedHeadings:a.headings.length,baselineDisplays:parseCorpusDisplayEquations(chapter,old).length,katexVersion:katex.version}));
NODE
```

## Reproducible arithmetic witnesses

```sh
node --input-type=module - witnesses <<'NODE'
import assert from 'node:assert/strict';
const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-12);
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const cdf=(a,t)=>a.filter(x=>x<=t).length/a.length;
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const S=(a,a1,b,b1)=>a*b+a*b1+a1*b-a1*b1;
near(mean([1,3]),2);near(cdf([1,3],0),0);near(cdf([1,3],3),1);
near(dot([1,0],[0,1]),0);near(S(1,1,1,1),2);
console.log('PASS arithmetic helper controls: mean, empirical CDF endpoints, dot product, known CHSH assignment.');
if(process.argv[2]==='controls')process.exit(0);
// Comparison arithmetic only; any speed instantiation uses c_f=1.
const c_f=1;assert.equal(c_f,1);
const a=1/Math.sqrt(2);
near(a*a,.5);near((a*a+a*a)**2,1);near((a*a-a*a)**2,0);
console.log('PASS W1: identical component weights, distinct plus/minus interference probabilities 1 and 0.');
near(mean([1,3]),mean([2,2]));near(cdf([1,3],1.5),.5);near(cdf([2,2],1.5),0);
const u=.01;assert.ok(Math.abs((1-Math.exp(-u))-u)<=u*u/2);
console.log('PASS W2: same mean passage time 2, different finite-window probabilities .5 and 0; weak exponential remainder bounded.');
let maximum=0;
for(const a of [-1,1])for(const a1 of [-1,1])for(const b of [-1,1])for(const b1 of [-1,1])maximum=Math.max(maximum,Math.abs(S(a,a1,b,b1)));
near(maximum,2);const delta=(Math.sqrt(2)-1)/8;near(2+16*delta,2*Math.sqrt(2));
near(.5*.5,.25);near(S(1,1,1,1),2);
console.log('PASS W3: all 16 deterministic Bell vertices obey 2; coefficient-16 residual arithmetic; correlated common bit remains Bell-local.');
near(mean([1,1]),1);
console.log('PASS W4: a common measure does not cancel an event balance defect identically equal to 1.');
const defect=[3,4,0],axis=[0,1,0];near(Math.hypot(...defect),5);near(dot(defect,axis),4);assert.ok(Math.abs(dot(defect,axis))<=Math.hypot(...defect));
console.log('PASS W5: projection discrepancy 4 bounded by vector defect 5; bound does not fix a quantized eigenvalue.');
near((-1)*(-1),1);assert.notEqual(mean([0,0]),mean([1,1]));
console.log('PASS W6: identical symmetric exchange character is compatible with different occupation means.');
NODE
```
