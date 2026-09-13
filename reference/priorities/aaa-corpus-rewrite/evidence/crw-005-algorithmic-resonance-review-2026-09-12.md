# CRW-005 Algorithmic Resonance: bounded review and repair

## Scope and provenance

Priority 57 covers [Algorithmic Resonance](../../../../content/markdown/aaa/quantum/algorithmic-resonance.md). The operator explicitly authorized repairs to that chapter and creation of this receipt on 2026-09-12. This is an editorial self-review with separately stated mathematical witnesses and external comparison sources, not independent certification of physical dynamics.

Measured before editing by scoped git status and git diff against HEAD, the chapter had no staged or unstaged changes; test -e confirmed this report was absent. The full 132-line dispatch chapter was read with nl -ba. Its SHA-256, measured by shasum -a 256, matched the supplied baseline:

```text
ce04dea2603b2371dc3e24ce9320dc83420d2b10b181b99654387e072a1f60e3
```

The baseline is retrievable at commit 2490eb54aef24bf6d9a49cbc7ba62f1e54553305. Baseline line references below refer to those exact bytes. The historical source at bfbb3ea3e7175e70e6d0707fef9b0a200f9fe845 was also inspected with git show; no causal attribution to a conversion commit is claimed. The live [document board](../corpus-review-status.md), line 13 at inspection, assigned this document priority 57. Its [conversion record](conversion-ledger.md) records edition 1.0 on 2026-09-04; this assignment is a substantive bounded repair under the current review procedure, not a claim-preserving style conversion.

Only the chapter and this receipt were written by this task. Shared board, priorities, queue, log, conversion ledger, generated outputs, fixtures, other chapters, and code remain outside its write authority. No repository-changing Git command, linked worktree operation, or regeneration was performed.

## Sources and owners inspected

- [AGENTS.md](../../../../AGENTS.md), the [startup router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), and [corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md): bounded review, explicit repair override, source verification, and evidence independence.
- [Theory orientation](../../../op/theory-orientation.md), [operator explanation standard](../../../op/operator-explanation-standard.md), and the [geometry/dynamics review lens](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md). The [overall priorities](../../aaa-work-threads/priorities.md) and [closure join matrix](../../aaa-work-threads/analysis/closure-join-matrix.md) were inspected for cross-workstream boundaries.
- CRW-005's [priorities](../priorities.md), [work queue](../work-queue.md), [document board](../corpus-review-status.md), and [conversion ledger](conversion-ledger.md). Historical queue counts are not substituted for the current document assignment.
- [Academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematical style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [source policy](../../../../content/markdown/aaa/archie/about-architrino.md). In particular, the mathematical terminology's speed and delay-factor entries control the meaning of the sea response variable.
- Relevant foundation and coordinate anchors in [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md). These were targeted anchor reads, not complete reviews of those chapters.
- [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), especially the per-hit acceleration and scalar-potential distinction; [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), especially its number-density and medium/void distinction.
- [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md), the effective transition-law residual and basin-measure discussion; [Measurement Ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md#what-makes-an-interaction-a-record), the autonomy, ordered-time restartability, and full record predicate; [Quantum Operator Mapping](../../../../content/markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md), the explicitly candidate operator map. These neighboring chapters were concurrent assignments; their current bytes are context, not a closure receipt.
- The canonical [equation parser and registry builder](../../../../scripts/build-equation-mapping-corpus.mjs), including its check-only behavior, and the relative-link audit in [validate-content](../../../../scripts/validate-content.mjs). Consumer search by basename under scripts, tests, content/graph, content/markdown, content/generated, and this priority directory found navigation, reading-copy, and neighboring quantum references; this is not an exhaustive repository consumer audit.

External source checks were performed on 2026-09-12:

1. Peter W. Shor, *Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer*, [arXiv:quant-ph/9508027v2](https://arxiv.org/html/quant-ph/9508027v2), Sections 3–5 and equations 5.1–5.2: inspected for reversible arithmetic and order finding. It is an effective comparison, not a premise for architrino motion.
2. Google Quantum AI and Collaborators, *Quantum error correction below the surface code threshold*, *Nature* 638, 920–926 (2025), [doi:10.1038/s41586-024-08449-y](https://www.nature.com/articles/s41586-024-08449-y), abstract, equation 1, Figure 1, and the memory-results text: verified the 2.14 ± 0.02 fit and its decoder and distance scope. The source distinguishes that finite-distance fit from the long-cycle real-time configuration. This review did not reanalyze experimental data.
3. The [2026 author correction](https://www.nature.com/articles/s41586-026-10559-8) changes Figure 3a repetition-code labels. The inspected corrected article retains the Figure 1 suppression benchmark. DOI redirection initially failed; direct publisher text and the indexed correction were accessible.

## Findings and implemented repairs

There are 13 repaired finding groups, AR-01–AR-13: eight High and five Medium. High denotes an invalid scientific implication or criterion affecting the central argument. Medium denotes an underspecified implementation, domain, terminology, or empirical scope. The severity counts describe this bounded review, not a theory score.

| ID | Severity | Baseline lines | Repaired lines | Demonstrated defect and smallest substantive repair |
| --- | --- | --- | --- | --- |
| AR-01 | Medium | 3, 9–13 | 3, 11–13 | Two distinguishable records do not define a qubit, and phase locking or memory dependence does not establish quantum coherence. Added the coherent two-dimensional sector and local definitions; retained the carrier proposal at recovery grade. |
| AR-02 | High | 17–24 | 17–24 | Signed scalar wakes, opposite polarities, Fourier amplitudes, basin probabilities, and stable attractors were treated as interchangeable. Restored the vector acceleration sum, normalized squared-amplitude target, distinct index periodicity, and separate branch/root/stability requirements. |
| AR-03 | High | 26 | 26 | One matching output distribution cannot establish a coherent controlled-phase channel; failure of one implementation does not exclude every architecture. Required phase-sensitive preparations and readouts sufficient to distinguish the channel, with calibration errors included. |
| AR-04 | Medium | 30–42 | 30–42 | The function value was named without its reversible embedding, integer domain, coprimality branch, or workspace constraints; an intermediate diagnostic record could reveal the computational alternative. Added an input-preserving exclusive-or embedding and distinguished calibration from disruptive logical readout. Hamiltonian language remains an effective mapping target. |
| AR-05 | Medium | 46–51 | 46–51 | The pipeline suggested direct isolation of the period. Defined the order and restored probabilistic Fourier sampling, classical inference and verification, and successful factor-extraction conditions. |
| AR-06 | Medium | 57–64 | 57–64 | The timing sum lacked serial-dependency and clock/path conditions; the canonical sea delay factor was called susceptibility. Kept the formula with a required causal path and post-arrival settling, common clock calibration, and the correct delay-factor meaning. |
| AR-07 | High | 55, 115 | 55, 123 | Finite propagation and delayed coupling were asserted to imply deterministic decoherence and a strict scaling ceiling; an ordinary noisy-gate failure was promoted into a discriminating departure. Restricted predictions and rejections to a specified model and a quantitative comparison with calibrated noise. |
| AR-08 | High | 66, 115 | 66, 123 | Requiring every correction cycle to remain below record-formation thresholds excludes the syndrome records correction intentionally creates. Distinguished syndrome information from protected logical information and included reset/control/environment accounts. |
| AR-09 | High | 77–95 | 77–101 | Restartability plus one environment-record residual was defined as a coherence time without a visibility or error-channel map and without the full record predicate. Retained the expression as a separate proposed environment-record diagnostic; coherence lifetime and harmful-event waiting time remain distinct. |
| AR-10 | High | 79–97 | 79–101 | The supremum admitted reversed/equal intermediate times outside the residual's declared domain; failure of a conjunction was used to infer an order-one divisibility residual. Ordered the times, declared effective clock variables and finite observation horizon, and explained empty-set, zero-infimum, non-attainment, and conjunction limits. |
| AR-11 | High | 97–106, 115 | 103–112, 123 | A cycle probability was compared with an unspecified threshold parameter, with no distinction between per-location and whole-register events or equality and below-threshold behavior. Restricted the scalar test to the same noise family and required a strict margin plus logical-error scaling evidence. |
| AR-12 | High | 106–115 | 114–123 | Memorylessness alone does not identify the first-passage time with an inverse harmful-event rate or justify adding overlapping durations. Derived the ratio only for a stated rare-event model, using its mean waiting time and nonoverlapping exposure. |
| AR-13 | Medium | 117 | 125, 135–138 | The correct reported suppression number lacked its decoder/distance configuration, and a bound on a separate deterministic sea channel was inferred without a response model. Preserved the measured number, separated configurations, supplied bibliographic support, and stated the missing quantitative map. |

The displayed modular function, serial timing inequality, timescale list, and threshold inequality retain their original TeX. The environment-record diagnostic and rare-event ratio are intentional mathematical repairs. Their existing viewer identities are preserved. Every original heading and Markdown target is retained; a source-note heading and supporting links are added.

## Checkable reasoning, grades, and falsifiers

### AR-01–AR-03: phases, contributions, and channels

Claim grade: derived for the following algebraic counterexamples; inferred for their application to the unsupported wording. A bit with two outcomes is already a two-record channel. A qubit comparison additionally distinguishes states by relative phase. For the effective states $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ and $|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$, the computational-basis probabilities are identical, while an appropriate complementary-basis measurement distinguishes them. The needed substrate-to-effective state map is still guessed.

In normalized wake-speed units, $c_f=1$, opposite signed acceleration contributions of magnitudes 1 and 1/4 along one line sum to 3/4, not zero. This is an algebraic witness about weighted contributions, not an evolved architrino solution. Conversely, amplitudes $1/\sqrt2$ and $-1/\sqrt2$ sum to zero but their individual squared magnitudes sum to one. Neither a polarity count nor a signed amplitude sum supplies a basin probability law.

For two effective qubits, identity and the controlled-sign operation applied to $|++\rangle$ give coefficient vectors $(1,1,1,1)/2$ and $(1,1,1,-1)/2$. Their four computational-basis probabilities are all 1/4, yet their probabilities of the complementary-basis outcome $++$ are 1 and 1/4. A single computational-basis comparison therefore misses a concrete wrong gate.

Falsifier: a valid discrimination of these two channels using only the identical output distribution would overturn the witness; inspect the four amplitudes and the stated measurement basis. A derivation of a particular weighted wake cancellation or stable branch can establish that particular case, but does not repair a universal implication from polarity or phase names.

### AR-04–AR-05: reversible arithmetic and sampling

Claim grade: derived for the reversible embedding and finite Fourier witness; measured for agreement with the inspected algorithm source. For $a=2$ and $N=15$, $f(0)=f(4)=1$, so replacing the input solely by $f(x)$ loses information. Retaining $x$ and applying $y\mapsto y\oplus f(x)$ twice restores every output bit. This proves the chosen comparison embedding is invertible, not that a carrier implementation exists.

For a normalized length-eight input supported equally on the even indices, the discrete Fourier transform has probability 1/2 at each of indices 0 and 4 and zero elsewhere. The period is two, but sample zero alone does not determine it. Repeated sampling and verification therefore carry real information, not merely implementation overhead.

Falsifier: a distinct input collision in the input-retaining exclusive-or map, or a different exact Fourier distribution for this eight-component vector. Physical recovery requires the full carrier and record maps and is not established by this finite arithmetic.

### AR-06–AR-08: timing, causal explanations, and syndrome records

Claim grade: derived for the timing logic and parity witness; inferred for the repaired scope. Tasks of durations 2 and 3 that overlap can finish in 3, whereas serial tasks take 5. The displayed sum is a lower bound only when its settling duration remains required after signal arrival. It uses the declared information channel and clock, not an undeclared conversion from absolute time. The canonical $\chi_{\mathrm{sea}}=c_f/c_{\mathrm{eff}}$ is dimensionless delay, not an arbitrary response susceptibility.

In the bit-flip repetition-code comparison, both logical basis strings 000 and 111 have zero parity on each adjacent pair. Recording those two parities does not distinguish their coherent logical coefficients. This is a syndrome-information witness, not a claim that the repetition code corrects every quantum error. It suffices to refute the blanket exclusion of record formation during correction.

Finite delays constrain causal arrival but do not alone calculate a decoherence rate. A noiseless effective comparison channel, or an ordinary calibrated noisy channel, remains a logically possible comparison until a specified substrate reduction excludes it. An observed departure from an ideal channel is not a mechanism-specific discriminator without competing predictions.

Falsifier: a protocol meeting the stated serial-dependency, path, clock, and speed assumptions that finishes sooner than the repaired timing bound, or different ideal parity records for 000 and 111. A quantitative architecture-specific decoherence theorem would replace the open prediction burden, without licensing a universal assertion outside its assumptions.

### AR-09–AR-10: diagnostic crossing is not a lifetime theorem

Claim grade: derived. On an effective density-state chart, the identity channel composes and preserves off-diagonal coherence. A dephasing semigroup also composes: an off-diagonal entry multiplied by $e^{-u}$ and then $e^{-v}$ equals one multiplied by $e^{-(u+v)}$. For an initial off-diagonal entry 1/2, elapsed time one at unit dephasing rate gives $e^{-1}/2$, approximately 0.18394. Exact composition is compatible with both preserved and reduced coherence. These are comparison channels; the classical retained-state residual in the corpus requires its own extraction map and cannot be equated with their quantum-channel residual by notation.

Let A mean that the divisibility test passes and B mean that the record test passes. A true and B false gives a failed conjunction while divisibility still passes. Failure before a diagnostic crossing consequently does not imply a large divisibility residual. Also, a norm below a fixed tolerance is a different mathematical statement from a big-O estimate with no stated asymptotic parameter.

The revised infimum includes only forward ordered pairs and complete persistence windows within the declared observation horizon. An empty eligible set is represented by positive infinity for that finite test; it does not prove coherence lasts forever. Even positive eligible elapsed times can have infimum zero. An infimum need not be a first attained event.

Falsifier: failure of the exponential composition identity, a valid truth-table proof that failure of A and B implies failure of A, or a reversed pair lying within the stipulated strictly ordered domain. The proposed identification of the diagnostic with a physical coherence or error lifetime remains guessed until tested on the same channel. Full physical record acceptance additionally consumes the measurement owner's outcome and exchange conditions.

### AR-11–AR-12: threshold parameters and rare-event limits

Claim grade: derived for the algebra; inferred for the model restrictions. For 100 independent locations with event probability 0.001 each, the whole-register probability of at least one event is $1-0.999^{100}$, approximately 0.09521. A per-location threshold of 0.01 cannot be compared with that aggregate number as though the two probabilities were the same parameter. Equality to a threshold likewise supplies no suppression margin: in a scaling expression proportional to a power of the error-to-threshold ratio, ratio one remains one at every distance.

For constant-rate independent events, zero-event survival solves the elementary rate equation, giving $p(\Delta)=1-e^{-\lambda_{\mathrm{err}}\Delta}$. Its small-exposure expansion is $\lambda_{\mathrm{err}}\Delta+O((\lambda_{\mathrm{err}}\Delta)^2)$. This justifies the repaired denominator $\tau_{\mathrm{err}}=1/\lambda_{\mathrm{err}}$ only for the specified event definition and schedule.

A concrete lifetime mismatch already occurs in a standard comparison with Poisson phase flips at rate $\lambda_{\mathrm{err}}$. Let $N_{\mathrm{flip}}(\Delta)$ count these events in elapsed time $\Delta$; the sign expectation is $\mathbb E[(-1)^{N_{\mathrm{flip}}(\Delta)}]=e^{-2\lambda_{\mathrm{err}}\Delta}$. Thus the visibility's e-folding time is $1/(2\lambda_{\mathrm{err}})$, while the first-event mean is $1/\lambda_{\mathrm{err}}$. The net phase-flip probability is $(1-e^{-2\lambda_{\mathrm{err}}\Delta})/2$. Identifying these different lifetimes makes a factor-of-two error even before considering memory, correlated faults, or an environment-record crossing.

Falsifier: failure of the independent-event complement probability, exponential waiting law, or Poisson sign expectation under their stated hypotheses. Actual noise that violates independence or constant rate invalidates the approximation's use for that apparatus; it does not refute the conditional arithmetic.

### AR-13: measured benchmark boundary

Claim grade: measured for source verification, not a new experiment. The inspected publisher article supports the numerical benchmark within its specific decoder, code distances, and memory protocol. Inferring a bound on an additional sea mechanism requires its coupling-to-logical-error map. No such map was produced here.

Falsifier: a conflicting Figure 1 result or configuration description in the corrected source, or an independently validated mechanism map that supplies the missing inference.

## Validation record

The following tests were performed before the target validation:

- The bounded math/link instrument passed positive and negative controls for inline and display extraction, malformed math, fenced and inline code exclusion, the canonical display parser, valid and invalid KaTeX, and existing/missing local targets. It printed CONTROL PASS before it was run on either authorized target.
- The arithmetic instrument passed known dot-product, probability, and two-point Fourier cases before running the nine witness groups above. Its target run reported nine passing groups with $c_f=1$.
- Before chapter edits, the strict content validator reported 0 errors, 0 warnings, and 30 notes. The baseline equation-registry check reported 0 errors.

Final chapter SHA-256, measured by shasum -a 256:

```text
8c91b3ff9a979ca816d08277bd390df655f2daf98888ab3aad95bbe360d48dc0
```

The first post-edit strict run reported nine link errors: six from this receipt's executable examples and three in the concurrent Quantum Summary receipt. The repository link audit skips backtick fences but not tilde fences; this receipt's code blocks were changed to backtick fences without altering the test cases. The initial failure is retained here as validation history.

After that repair, the complete chapter and receipt were reread. The embedded target checker passed for both authorized paths, including KaTeX rendering, balanced math, local paths/Markdown anchors, whitespace, exact display-block comparison, original link preservation, and heading preservation. It measured 73 chapter math expressions and 16 local links; the receipt's expression count changes when validation prose is updated, so rerun output is the authority for that count. All six viewer identities passed preservation, with four display blocks byte-identical and exactly two intentional repairs. The nine arithmetic witness groups passed. The canonical equation-link validator reported 23 registered links resolving; its scope is the promoted registry, not all six chapter identities, which were checked separately.

The first strict rerun reported three errors, zero warnings, and 30 notes, all three errors at line 223 of the concurrent crw-005-quantum-summary-review-2026-09-12.md receipt: its executable examples contained one AGENTS.md target and two bad.md targets interpreted as relative links by the repository audit. The final invocation of node scripts/validate-content.mjs --check --strict audited 1,699 repository Markdown files and instead reported three errors at line 200 of the concurrent crw-005-reality-quantum-causality-review-2026-09-12.md receipt: one AGENTS.md target and two missing targets. It returned exit 1 with zero warnings and 30 notes. Both observed error sets are outside the two authorized paths; this task did not edit either concurrent receipt. No overall strict-validation pass is claimed. Scoped git diff --check and the explicit two-file trailing-whitespace check passed. Later check output, if the shared tree changes again, supersedes these transient repository-wide results without changing the chapter's measured hash.

### Reproduction commands

Run from the repository root. These commands read the two authorized files and repository comparison inputs; they do not create or regenerate files.

```sh
shasum -a 256 content/markdown/aaa/quantum/algorithmic-resonance.md
git --no-optional-locks diff --check HEAD -- content/markdown/aaa/quantum/algorithmic-resonance.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-algorithmic-resonance-review-2026-09-12.md
rg -n '[[:blank:]]+$' content/markdown/aaa/quantum/algorithmic-resonance.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-algorithmic-resonance-review-2026-09-12.md
node scripts/validate-content.mjs --check --strict
node scripts/build-equation-mapping-corpus.mjs --check
sed -n '/^```javascript$/,/^```$/p' reference/priorities/aaa-corpus-rewrite/evidence/crw-005-algorithmic-resonance-review-2026-09-12.md | sed '1d;$d' | AR_TARGETS=1 node --input-type=module
sed -n '/^```js$/,/^```$/p' reference/priorities/aaa-corpus-rewrite/evidence/crw-005-algorithmic-resonance-review-2026-09-12.md | sed '1d;$d' | AR_WITNESSES=1 node --input-type=module
```

No-match exit 1 from the whitespace search is the passing result. The local link checker covers the actual inline-link syntax used here and Markdown heading targets; it is not a universal Markdown or deployment-router verifier. Viewer-identity preservation is checked separately against baseline; generator freshness is a separate check.

### Bounded math, link, and preservation instrument

```javascript
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {execFileSync} from "node:child_process";
import {createRequire} from "node:module";
import {pathToFileURL} from "node:url";
const root=process.cwd(), require=createRequire(path.join(root,"package.json"));
const katex=require("katex");
const {parseCorpusDisplayEquations}=await import(pathToFileURL(path.join(root,"scripts/build-equation-mapping-corpus.mjs")));
const hash=s=>createHash("sha256").update(s).digest("hex");
function stripCode(s) {
 let fence=null;
 return s.split("\n").map(line=>{
  const m=line.match(/^\s*(\x60{3,}|~{3,})/);
  if(m){if(!fence)fence=m[1][0];else if(fence===m[1][0])fence=null;return "";}
  return fence?"":line.replace(/(\x60+)[\s\S]*?\1/g,"");
 }).join("\n");
}
function math(s) {
 const input=stripCode(s),out=[];
 for(let i=0;i<input.length;){
  if(input[i]==="\\"){i+=2;continue;}
  if(input[i]!=="$"){i++;continue;}
  const width=input[i+1]==="$"?2:1,start=i;i+=width;const body=i;
  for(;i<input.length;i++){
   if(input[i]==="\\"){i++;continue;}
   if(input.slice(i,i+width)==="$".repeat(width))break;
  }
  assert(i<input.length,"unclosed math at "+start);
  out.push({tex:input.slice(body,i),displayMode:width===2});i+=width;
 }
 return out;
}
const links=s=>[...stripCode(s).matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)].map(m=>m[1]);
function localLinks(file,s) {
 let count=0;
 for(const href of links(s)){
  if(/^[a-z][a-z0-9+.-]*:/i.test(href))continue;
  assert(!href.startsWith("/"),"absolute link "+href);
  const [bare,anchor]=href.split("#"),target=decodeURIComponent(bare.split("?")[0]);
  const dest=target?path.resolve(root,path.dirname(file),target):path.resolve(root,file);
  assert(dest.startsWith(root+path.sep),"outside repo "+href);
  assert(fs.statSync(dest).isFile(),"missing local target "+href);count++;
  if(anchor&&dest.endsWith(".md")){
   const heads=[...fs.readFileSync(dest,"utf8").matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>m[1].toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,"").trim().replace(/\s/g,"-"));
   assert(heads.includes(decodeURIComponent(anchor)),"missing heading "+href);
  }
 }
 return count;
}
const control="# Example\n\n$1+1$\n\n$$\nx=2\n$$\n\n[View →](equation-mapping.html#corpus-equation-control)\n\n~~~\n$bad\n[ignore](missing)\n~~~\n\x60$ignore$\x60\n";
assert.deepEqual(math(control).map(m=>m.tex),["1+1","\nx=2\n"]);
assert.equal(links(control).length,1);
assert.throws(()=>math("$unclosed"));
assert.equal(parseCorpusDisplayEquations("example.md",control).length,1);
assert.equal(parseCorpusDisplayEquations("example.md",control)[0].tex,"x=2");
assert(katex.renderToString("\\frac{1}{2}",{throwOnError:true}).includes("katex"));
assert.throws(()=>katex.renderToString("\\definitelyUnknownCommand",{throwOnError:true}));
assert.equal(localLinks("AGENTS.md","[guide](AGENTS.md)"),1);
assert.throws(()=>localLinks("AGENTS.md","[bad](a-nonexistent-ar-control-file.md)"));
assert.equal(localLinks("AGENTS.md","[guide](AGENTS.md#project-notes-for-agents)"),1);
assert.throws(()=>localLinks("AGENTS.md","[bad](AGENTS.md#a-nonexistent-ar-control-heading)"));
console.log("CONTROL PASS: math extraction, malformed math, fenced/inline code exclusion, display parser, KaTeX valid/invalid, local target valid/invalid.");
if(process.env.AR_TARGETS==="1"){
 const chapter="content/markdown/aaa/quantum/algorithmic-resonance.md";
 const receipt="reference/priorities/aaa-corpus-rewrite/evidence/crw-005-algorithmic-resonance-review-2026-09-12.md";
 for(const file of [chapter,receipt]){
  const s=fs.readFileSync(file,"utf8"),expressions=math(s);
  for(const m of expressions)katex.renderToString(m.tex,{throwOnError:true,displayMode:m.displayMode,strict:"error"});
  assert(!/[ \t]+$/m.test(s),"trailing whitespace "+file);
  console.log(JSON.stringify({file,expressions:expressions.length,localLinks:localLinks(file,s),sha256:hash(s)}));
 }
 const baseline=execFileSync("git",["show","2490eb54aef24bf6d9a49cbc7ba62f1e54553305:"+chapter],{encoding:"utf8"});
 assert.equal(hash(baseline),"ce04dea2603b2371dc3e24ce9320dc83420d2b10b181b99654387e072a1f60e3");
 const final=fs.readFileSync(chapter,"utf8"),before=parseCorpusDisplayEquations(chapter,baseline),after=parseCorpusDisplayEquations(chapter,final);
 assert.equal(before.length,6);assert.equal(after.length,6);
 const ids=s=>[...s.matchAll(/corpus-equation-[a-f0-9]+/g)].map(m=>m[0]);
 assert.deepEqual(ids(baseline),ids(final));
 const changed=before.flatMap((b,i)=>baseline.slice(b.openStart,b.closeEnd)===final.slice(after[i].openStart,after[i].closeEnd)?[]:[i+1]);
 assert.deepEqual(changed,[4,6]);
 for(const href of links(baseline))assert(links(final).includes(href),"removed link "+href);
 for(const h of baseline.match(/^#{1,6} .+$/gm))assert(final.includes(h),"removed heading "+h);
 console.log("PRESERVATION PASS: 6 viewer identities, 4 unchanged displays, 2 declared repairs (4,6), baseline links and headings retained.");
}
```

### Arithmetic witness instrument

```js
import assert from "node:assert/strict";
const near=(a,b)=>assert(Math.abs(a-b)<1e-12);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const probs=a=>a.map(x=>x*x);
function fourierProb(a){
 const n=a.length;
 return Array.from({length:n},(_,k)=>{
  let re=0,im=0;
  for(let j=0;j<n;j++){re+=a[j]*Math.cos(2*Math.PI*j*k/n);im+=a[j]*Math.sin(2*Math.PI*j*k/n);}
  return (re*re+im*im)/n;
 });
}
near(dot([1,0],[1,0]),1);near(dot([1,0],[0,1]),0);
assert.deepEqual(probs([1,0]),[1,0]);
fourierProb([1,0]).forEach(p=>near(p,0.5));
console.log("CONTROL PASS: dot product, probabilities, two-point Fourier basis case.");
if(process.env.AR_WITNESSES==="1"){
 const cf=1;assert.equal(cf,1);let groups=0;
 near(1-1/4,0.75);near(probs([Math.SQRT1_2,-Math.SQRT1_2]).reduce((a,b)=>a+b),1);groups++;
 const plus=[0.5,0.5,0.5,0.5],cz=[0.5,0.5,0.5,-0.5];
 assert.deepEqual(probs(plus),probs(cz));near(dot(plus,cz)**2,0.25);near(dot(plus,plus)**2,1);groups++;
 const f=x=>2**x%15;assert.equal(f(0),f(4));
 for(let x=0;x<8;x++)for(let y=0;y<16;y++)assert.equal((y^f(x))^f(x),y);groups++;
 const fp=fourierProb([0.5,0,0.5,0,0.5,0,0.5,0]);
 fp.forEach((p,k)=>near(p,k===0||k===4?0.5:0));groups++;
 assert.equal(Math.max(2,3),3);assert.equal(2+3,5);groups++;
 const parity=(s,a,b)=>Number(s[a])^Number(s[b]);
 for(const s of ["000","111"]){assert.equal(parity(s,0,1),0);assert.equal(parity(s,1,2),0);}
 groups++;
 near(Math.exp(-0.3)*Math.exp(-0.7),Math.exp(-1));near(0.5*Math.exp(-1),0.18393972058572117);
 const passDiv=true,passRec=false;assert.equal(passDiv&&passRec,false);assert(passDiv);groups++;
 const p=0.001;assert(p<0.01);assert(1-(1-p)**100>0.01);near((0.01/0.01)**2,1);groups++;
 const q=0.001,eventProb=-Math.expm1(-q),phaseProb=-Math.expm1(-2*q)/2;
 assert(eventProb<q);assert(q-eventProb<q*q/2);near(phaseProb,0.0009990006663334666);groups++;
 console.log(JSON.stringify({groups,cf,cancellation:0.75,phaseSensitiveProbability:0.25,FourierProbabilities:fp,registerAnyError:1-(1-p)**100,PoissonEvent:eventProb,phaseFlipNet:phaseProb}));
}
```

## Generated artifacts and deferred work

The six equation viewer identities remain assigned to the same six source equations; expressions 4 and 6 carry the explicit repairs described above. The canonical registry check and source-context bindings are handled separately from the preservation test. The post-edit check reported stale data at content/generated/equation-mapping/corpus-equations.json (exit 1); the baseline check passed. This task changed fingerprinted chapter content, while other corpus assignments were active, so the shared registry's total drift is not attributed exclusively to this chapter. No generated bytes were written.

The exact deferred regeneration command for the reported registry drift is:

```sh
node scripts/build-equation-mapping-corpus.mjs --write
```

The consumer search also found generated textbook reading copies. Those were not regenerated or certified fresh in this assignment; their generator's explicit regeneration command is:

```sh
node scripts/build-textbook-md-pdf.mjs --write
```

Both commands remain for the authorized regeneration/publication owner. This receipt does not authorize their execution.

## Remaining obligations and closure limits

- ○ AR-O1: derive a physical carrier branch and its phase-sensitive gate map from complete constituent histories, including all causal roots, finite event behavior, formation, persistence, and stability. Recommendation: retain this as the prerequisite for a register claim.
- ○ AR-O2: derive one preparation-and-apparatus measure that maps retained histories to the required interference probabilities. Recommendation: require independent phase-sensitive comparisons, not a fitted probability distribution.
- ○ AR-O3: establish the relation among operational coherence, environment-record acceptance, and physical errors on the same declared clock and observation window. Recommendation: test this before using a lifetime in a threshold estimate.
- ○ AR-O4: derive or independently calibrate the code/decoder error model, its threshold domain, correlations, leakage, and logical-error scaling. Recommendation: preserve the observed finite-distance benchmark as an empirical constraint.
- ○ AR-O5: reconcile neighboring quantum chapter summaries and generated consumers under their own assignments. A basename search found quantum-summary.md and measurement-ontology.md consumers; this worker neither adjudicates their concurrent edits nor closes downstream consistency.
- ○ Coordinator handoff: verify this chapter hash and receipt, review the two-file diff, and integrate priority 57 into the shared CRW-005 records when authorized. Shared integration is outside this assignment.

Bounded completion means these demonstrated local defects have documented repairs and the stated validation has completed. It does not establish a physical braid/register branch, EOM solver acceptance, arbitrary circuit-depth performance, Born-rule recovery, Noether sea constitutive closure, theory closure, or downstream closure. No numerical evolution or laboratory experiment was run. The exact finite algebra and source checks constrain claims; they do not certify the substrate recovery proposal.
