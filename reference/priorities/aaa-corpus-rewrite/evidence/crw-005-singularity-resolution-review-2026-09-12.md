# CRW-005 — Singularity Resolution Review and Repair

Status: ✓ Done — bounded chapter review, repair, and check-only validation completed. The latest repository-wide strict check is not green: it reports an out-of-scope Black Holes link error, recorded below. Generated registry drift remains deferred.

Date: 2026-09-12. The assignment authorizes edits to [Singularity Resolution](../../../../content/markdown/aaa/spacetime/singularity-resolution.md) and this report only. Explicit repair authority supersedes the corpus-review procedure's default review-only mode. Shared queues, other chapters, generated artifacts, and publication remain outside scope.

## Disposition and identity

The proposed maximum-curvature and horizon-interface mechanism remains a hypothesis. Seven demonstrated findings were repaired: definitions and claim level, the empty-clock condition, Penrose theorem scope, critical-collapse domain/notation, regularity and regulator limits, continuation-data sufficiency and uniqueness, and two external attributions. Prescribed alignment equations and the separate Planck-scale mapping obligation remain.

| Record | Measured value and instrument |
| --- | --- |
| Baseline chapter SHA-256 | 46e9dc86a1e428bcc16aec58313e7976fffea79ed5ca271ae8043f2616444343 |
| Final chapter SHA-256 | 160c45ce4a6014ff0442fef193860ffff0882dbd6adad6cbfb524b8ce54d906d |
| Hash instrument | shasum -a 256 content/markdown/aaa/spacetime/singularity-resolution.md, before and after editing |
| Initial owned-path state | Scoped git --no-optional-locks status --short produced no entries for the chapter/report; test ! -e confirmed the report absent |
| Chapter edit scope | Scoped git --no-optional-locks diff --numstat reported 44 insertions and 31 deletions |
| Display preservation | Controlled comparison with git show HEAD:content/markdown/aaa/spacetime/singularity-resolution.md found 18 preserved equation-view links and one changed display, the coordinate renaming at final line 124 |

Baseline lines below refer to the baseline hash; final lines refer to the final hash. A changed hash requires rechecking line references and findings. This receipt is not evidence for an unseen revision.

## Sources and live authority

Startup read the live [AGENTS.md](../../../../AGENTS.md), generated router, [corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), [review skill owner](../../../op/skills/skill-architrino-review.md), [coordination owner](../../../office-of-research/cto/prompts/start-research.md), [Principal Investigator owner](../../../office-of-research/cto/prompts/start-pi.md), [theory orientation](../../../op/theory-orientation.md), [operator explanation standard](../../../op/operator-explanation-standard.md), and task-relevant academic, mathematical, terminology, and comparative authorities. [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) supplied source-selection and verification policy. The live CRW-005 queue/status were read only; their aggregate counts were not used as scientific evidence.

The complete assigned chapter was read before findings and after repair. Required foundation anchors inspected were [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md#determinism-and-multistability), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md#causality-and-finite-propagation-speed), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md#self-hit-and-delay-root-geometry), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md#complete-state-and-physical-observer-access).

The decisive [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) anchors were lines 83–163, causal roots and transmitter weights; 332–409, finite-impulse caustic transit; and 654–850, auxiliary regulators and conditional continuation. Nearby canon included [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md), [Black Holes](../../../../content/markdown/aaa/spacetime/black-holes.md#finite-boundary-endpoint-closure), and [Horizon Chirality](../../../../content/markdown/aaa/spacetime/horizon-chirality.md#source-record-horizon-condition). The indexed-braid circulation relation near line 100 was checked for the local speed convention.

## Findings and smallest repairs

High severity means that the original statement could support a proof or physical-resolution claim beyond its premises. Medium means that a local definition, domain, or attribution materially misleads. Scientific obligations are separated below from the repaired prose findings.

| ID and disposition | Baseline → final lines | Demonstrated issue and repair | Claim grade and falsifier |
| --- | --- | --- | --- |
| SR-01 — ✓ Done, high | 3–20, 36, 248–261 → 3–36, 252–267 | The opening described entry into a finite regime that the ending correctly called unproved. Singularity and maximum curvature lacked distinct coordinate, effective-geometry, and delayed-dynamics meanings. The repair states the hypothesis, defines the local variables and indexed speeds, and makes event-horizon recovery a separate map. The candidate mechanism and speed equations remain. | Inferred inconsistency, measured by full reading against the chapter's own caveats and Foundations. Reopen for an applicable retained-history derivation establishing the stronger physical claim. |
| SR-02 — ✓ Done, medium | 40–47 → 40–47 | Possible clock-channel failure became an unqualified empty-clock equation. The equation now applies only after all channels fail in the stated interior region/window; exterior inaccessibility is distinguished from local absence. | Derived logical correction. A recovered interior clock in that same regime falsifies the empty-channel assignment. |
| SR-03 — ✓ Done, high | 51–113 → 51–113 | The Penrose comparison omitted load-bearing surface/global hypotheses and blurred null incompleteness with a physical endpoint. Existing displays remain, with precise hypotheses, a bounded conclusion, and an explicit effective/substrate distinction. | Derived comparison-scope correction from the original theorem, pp. 58–59. Reopen if a different theorem with explicit alternative hypotheses is selected. |
| SR-04 — ✓ Done, medium | 115–129 → 115–129 | Scaling lacked its supercritical domain and leading-trend qualification; exact echoing was not restricted to limiting rescaled fields. Logarithmic time used the clock-reserved glyph. Prose supplies the domain and approximate finite echoing window; the display renames the coordinates without changing periodicity. | Measured source agreement and derived notation mapping. Reopen for evidence supporting the broader exact claim on arbitrary near-critical data. |
| SR-05 — ✓ Done, high | 131–152, 240 → 131–156, 244 | Three coarse amplitude bounds were called a regularity criterion without microscopic/root/regulator controls. The repair states their actual reach and adds the existing Master Equation's separate root, separation, tail, regulator, and event requirements. Finite integrated caustic response remains allowed. | Derived sufficiency objection, demonstrated below. A proved coercive estimate controlling those missing quantities from the same diagnostic on the declared solution class would overturn it. |
| SR-06 — ✓ Done, high | 88, 154–226, 240 → 88, 158–230, 244 | Map inputs and solution domains were undefined; finite alternatives were conflated with non-arbitrariness, while an infinite family was called arbitrary. The family now ranges over full-window solutions with compatible inputs. Complete-history uniqueness, coarse alternatives, finite-window existence, and finite-memory reduction are distinct. Exposure variables are named and independent balance evidence is required. | Derived domain/cardinality correction. Reopen for a demonstrated sufficient input record, deterministic selector, reduction theorem, and independent balance law supporting the stronger claim. |
| SR-07 — ✓ Done, medium | 129, 242 → 129, 246, 269–274 | The two source-class labels did not identify the works behind the local record. The chapter names Ecker/Ecker/Grumiller and Cadoni/coauthors, supplies checked source notes, and states their comparison limits. | Measured bibliographic/scope correction by primary-source inspection. Reopen if another specific source was intended and supports the exact attribution. |

The source subreview's GR-01 maps to SR-03, GR-02 to SR-04, and GR-03/GR-04 to SR-07. These are finding IDs, not additional chapter dispositions.

## Checkable mathematical reasoning

### Finite smoothing does not establish a uniform limit

The actual auxiliary spatial kernel has radial magnitude

$$
K_{\epsilon_c}(r)=\frac{r}{(r^2+\epsilon_c^2)^{3/2}},
\qquad r\ge0,\quad\epsilon_c>0.
$$

Differentiation gives $K_{\epsilon_c}'(r)=(\epsilon_c^2-2r^2)/(r^2+\epsilon_c^2)^{5/2}$. Its maximum is attained at $r=\epsilon_c/\sqrt2$ and equals $2/(3\sqrt3\,\epsilon_c^2)$. Every fixed-core kernel is bounded, while its bound diverges as the core is removed. The value zero at coincidence likewise does not select a sharp post-coincidence solution.

Claim grade: derived. Falsifier: a corrected differentiation or maximum calculation giving a uniform bound on this same domain as $\epsilon_c\to0^+$. A positive separation floor changes the domain. This witness checks the implication using the auxiliary kernel; it is not an evolved collapse solution.

Amplitude bounds also do not imply derivative bounds: $f_n(x)=\sin(nx)$ has $|f_n|\le1$ while $\sup|f_n'|=n$ on a fixed interval containing zero. This elementary analysis witness is not a Noether sea solution or an imported constitutive law.

### A root singularity can permit finite velocity change

For the dimensionless fold form $g(u,s)=u^2-s$ on $s>0$, the roots $u_\pm=\pm\sqrt{s}$ have emission-variable derivative magnitudes $2\sqrt{s}$. Their inverse-Jacobian weights sum to $s^{-1/2}$, whose integral from zero to $\delta>0$ is $2\sqrt{\delta}$. A bounded numerator and positive separation therefore permit finite integrated response despite pointwise divergence.

Claim grade: derived. This separately checkable calculus supports the scope distinction in the Master Equation's fold argument. It proves neither physical retention, coincidence continuation, uniqueness, nor all higher singular transitions. Falsifier: failure of the root derivative or integral for this normal form. No physical numerical instantiation or simulation was introduced; future numerical use must set $c_f=1$.

### Finite labels do not select a unique history

Two differently labeled endpoints form a finite nonempty set and still leave two alternatives. One label can also classify continuously many states. A finite label count therefore does not prove that identical complete histories determine one future. Equal endpoints at $T_f$ do not imply equal trajectories throughout $W$.

Claim grade: derived logical distinction. A demonstrated injective label map together with a unique solution or selector on exactly the declared input domain would resolve the missing implication. The chapter retains its finite-family target and requires the separate selection result.

## Sources and review independence

A read-only relativity-comparison subreview inspected the original papers. Root inspection confirmed the Penrose, Ecker/coauthor, Cadoni/coauthor texts and Hod–Piran abstract; the subreview additionally inspected Choptuik's original paper, p. 10, equations (9)–(11). Source-mining history lines 42 and 59 located the two 2026 papers; those notes were locators, not substitute evidence.

| Source | Inspected contribution |
| --- | --- |
| [Penrose, 1965](https://journals.aps.org/prl/pdf/10.1103/PhysRevLett.14.57) | Original pp. 58–59: hypotheses and null-incompleteness conclusion |
| [Choptuik, 1993](https://blackholes.tecnico.ulisboa.pt/gritting/pdf/black_holes/Choptuik_Universality-and-scaling-in-gravitational-collapse-of-a-massless-scalar-field.pdf) | Original numerical comparison and its local near-critical scope |
| [Hod and Piran, 1997](https://arxiv.org/abs/gr-qc/9606087) | Primary abstract/publisher record for mass-scaling fine structure |
| [Ecker, Ecker, and Grumiller, 2026](https://arxiv.org/html/2601.14358v1) | §§ I, IV–V: author identity and large-dimensional comparison limits |
| [Cadoni and colleagues, 2026](https://arxiv.org/html/2601.03296v2) | § II: embedding assumptions and horizon/central-singularity distinction |

All standard physics remains effective comparison or recovery target. No Einstein equation, energy condition, scalar-field mechanism, Planck constant, or metric was inserted as a substrate premise.

A second read-only agent applied the analysis/well-posedness lens to the complete repaired chapter and the decisive Master Equation/Foundation anchors. It reported no material remaining defect in the scoped continuation/regularity argument and verified the final hash. This is adversarial logical review, not independent physical validation. Source inspection does not reproduce a paper's numerical results; editor rereading remains self-review; agreement among agents does not establish a theorem.

## Known-case-first controls and validation

No custom scientific checker or simulation was constructed. The analytic witnesses above are shown derivations. Ordinary rg, nl, shasum, and Git inspection were used directly.

A disposable Node command combined the existing display parser, vendored Markdown-it, and bundled KaTeX 0.16.11. No script or generated asset was written. The initial control missed a known display fraction because parsed text fragments split the expression; its assertion failed before any target run. The corrected version used the existing display parser and raw inline text with display/code masking. It returned exactly two known expressions, one display, and one link, excluding fenced fake math/link examples. Valid expressions rendered and an undefined command threw. The tool printed CONTROL PASS before reading the target. A known existing/absent path controlled the filesystem predicate before target link checks.

| Instrument/command | Measured result and scope |
| --- | --- |
| node scripts/validate-content.mjs --check --strict, baseline | Exit 0; 0 errors, 0 warnings, 30 notes; 391 scenes, 199 corpus Markdown files, 1649 repository Markdown files |
| Same command after chapter repair | Exit 0; 0 errors, 0 warnings, 30 notes; 1651 repository Markdown files at that snapshot. The count change is not attributed to this worker. |
| Controlled Node command below | Exit 0; 107 expressions, 18 displays, 28 local links; no rendering errors/missing target paths; 18 equation-view links preserved |
| Report Markdown/KaTeX inspection | Exit 0; 18 expressions and 22 local links, with no rendering failures or missing local targets; this excludes fenced reproduction code |
| Embedded reproduction command | Extracted only after a known-command extraction control; executed from the report bytes with exit 0 and the same chapter counts |
| Final report-inclusive strict command | Exit 1; 1 error, 0 warnings: content/markdown/aaa/spacetime/black-holes.md:535 links to missing ../assemblies/photons.md. This path is outside the assigned write boundary; no causal attribution or repair is claimed. |
| Scoped git --no-optional-locks diff --check | Exit 0, no output for the chapter |
| node scripts/build-equation-mapping-corpus.mjs --check | Exit 1: generated registry is stale at content/generated/equation-mapping/corpus-equations.json; 199 Markdown files, 4685 displays, 30406 symbol definitions reported |

The exact deferred command is **node scripts/build-equation-mapping-corpus.mjs --write**, followed by its corresponding --check. It was not run. The chapter changed equation spelling/context, so registry freshness cannot be claimed; the shared-checkout result does not isolate every contributor to drift. Other generators and full publication gates were not run. This is not an overall green repository claim.

Limits of the Node check: syntax, local path existence, and preservation only. It does not verify mathematics, every external URL, every existing local fragment, browser layout, registry freshness, or physics. Scoped rg confirmed the two new Master Equation heading targets. Same-parser comparison is preservation evidence only. The exact command is retained below so this check is reproducible.

The earlier report-inclusive strict checks returned two and then one example-link errors because the repository validator scanned the fenced code. The sample now constructs its fake link punctuation from character codes, preserving the exact runtime input without literal link syntax in the report. A report reread also caught dollar-sign replacement processing in the embedded command; the command was re-embedded by direct concatenation. Its known-case controls and chapter checks passed again. These were receipt-production issues, not chapter defects.

For the untracked report, git --no-optional-locks diff --no-index --check -- /dev/null REPORT returned exit 1 with no diagnostics. Two process-substitution controls established this Git convention: plain text returned 1 with no diagnostics, and text with known trailing whitespace returned 3 and identified that whitespace. The report's result is therefore a no-whitespace-diagnostics result; it is not presented as exit 0.

## Open obligations and reopening

These are scientific obligations, not unimplemented demonstrated prose repairs.

| Status | Obligation and reopening condition |
| --- | --- |
| ○ Open | Derive a compatible history reaching indexed alignment and retaining the finite interior; reopen physical status with complete acceleration/root/transition and stability evidence. |
| ○ Open | Specify F_H, its history domain, input sufficiency, and coupled medium response; prove existence, uniqueness, continuous dependence, and continuation in the declared solution class. |
| ○ Open | Control removal of both regulators, roots, history tails, and singular events, or derive a physical scale. Regulator-dependent endpoints or observables reopen resolution claims. |
| ○ Open | Derive clock/ruler/signal exports and local/global horizon correspondence. A surviving interior clock refutes only the same-regime empty-clock assignment. |
| ○ Open | Derive the exposure map and independent energy, momentum, angular-momentum, charge/polarity, and provenance accounting. Residual cancellation by definition is not conservation evidence. |
| ○ Open | Establish effective critical-collapse/exterior recovery on a declared comparison domain; cited GR models do not prove substrate realizability. |

Optional/out-of-scope work remains deferred: a complete constitutive model, numerical continuation campaign, and downstream propagation. Black Holes retains adjacent inherited comparison and finite-family wording in the inspected sections; it was not fully reviewed or edited here. Differently scoped finite-family language in other owners was not changed. The prescribed alignment and Planck-scale separation were retained because current canon already bounds them as targets.

## Exact files changed

- content/markdown/aaa/spacetime/singularity-resolution.md
- reference/priorities/aaa-corpus-rewrite/evidence/crw-005-singularity-resolution-review-2026-09-12.md

Each chapter edit reread exact bytes and checked the expected SHA-256 before replacing text. An unexpected hash would abort before writing. The report was created only after its absence was confirmed. No other path was written by this worker. No shared queue/status/priority/log, generated artifact, source-index, or fixture was edited. No staging, commit, push, PR mutation, merge, linked worktree, or generator write occurred.

This disposition is bounded review-and-repair completion. It establishes neither theory closure nor downstream corpus closure, physical singularity resolution, retained-branch acceptance, or global existence of the sharp dynamics.

## Reproduction command

Run from the repository root:

~~~bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
function loadUMD(file){const context={module:{exports:{}},exports:{}};context.exports=context.module.exports;vm.runInNewContext(fs.readFileSync(file,'utf8'),context);return context.module.exports;}
const katex=loadUMD('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js');
const MarkdownIt=loadUMD('vendor/markdown-it/markdown-it.min.js');
const md=new MarkdownIt();
function inspect(source){
 const blocks=parseCorpusDisplayEquations('check.md',source), math=blocks.map(b=>b.tex),links=[];
 let masked=source;for(const b of [...blocks].reverse()) masked=masked.slice(0,b.openStart)+' '.repeat(b.closeEnd-b.openStart)+masked.slice(b.closeEnd);
 const tokens=md.parse(masked,{});
 for(const token of tokens){
  if(token.type==='inline'){
   const raw=token.content.replace(/(`+)[\s\S]*?\1/g,'');
   for(const match of raw.matchAll(/(?<!\\)\$([^$\n]+)(?<!\\)\$/g)) math.push(match[1].trim());
   const children=token.children||[];
   for(const child of children){
    if(child.type==='link_open') links.push(child.attrGet('href'));
   }
  }
 }
 return {math,links};
}
const makeLink=(label,dest)=>String.fromCharCode(91)+label+String.fromCharCode(93,40)+dest+String.fromCharCode(41);
const known=['# Known','','$x^2$ and '+makeLink('ok','target.md')+'.','',
'$$','\\frac{1}{2}','$$','',String.fromCharCode(96).repeat(3)+'text',
'$\\badcommand$ '+makeLink('ignore','missing.md'),String.fromCharCode(96).repeat(3),''].join('\n');
const a=inspect(known);assert.deepEqual(a.math,['\\frac{1}{2}','x^2']);assert.deepEqual(a.links,['target.md']);
assert.equal(parseCorpusDisplayEquations('known.md',known).length,1);
for(const tex of a.math) katex.renderToString(tex,{throwOnError:true});
assert.throws(()=>katex.renderToString('\\definitelyInvalidCommand',{throwOnError:true}));
console.log('CONTROL PASS: two exact math expressions, one display, one link; fenced fake math/link excluded; valid TeX renders and invalid TeX throws. KaTeX '+katex.version);

import path from 'node:path';
import {execFileSync} from 'node:child_process';
const file='content/markdown/aaa/spacetime/singularity-resolution.md';
assert.equal(fs.existsSync('AGENTS.md'),true);assert.equal(fs.existsSync('.known-nonexistent-crw-005-control.md'),false);
console.log('CONTROL PASS: existing/missing local-path predicate');
const source=fs.readFileSync(file,'utf8'),parsed=inspect(source),blocks=parseCorpusDisplayEquations(file,source);
const errs=[];for(const tex of parsed.math){try{katex.renderToString(tex,{throwOnError:true,displayMode:blocks.some(b=>b.tex===tex)});}catch(e){errs.push({tex,error:e.message});}}
const local=parsed.links.filter(l=>! /^[a-z]+:/i.test(l)&&!l.startsWith('#'));
const missing=local.filter(l=>!fs.existsSync(path.resolve(path.dirname(file),decodeURIComponent(l.split('#')[0]))));
const baseline=execFileSync('git',['show','HEAD:'+file],{encoding:'utf8'});
const before=parseCorpusDisplayEquations(file,baseline);
const ids=arr=>arr.map(b=>b.existingLink?.id??b.existingLink?.text);
assert.deepEqual(ids(blocks),ids(before));
const changed=blocks.flatMap((b,i)=>b.tex!==before[i]?.tex?[{line:b.startLine,before:before[i]?.tex,after:b.tex}]:[]);
console.log(JSON.stringify({mathExpressions:parsed.math.length,displayEquations:blocks.length,mathErrors:errs,localLinks:local.length,missingPaths:missing,preservedEquationLinks:blocks.length,changedDisplays:changed},null,2));
if(errs.length||missing.length)process.exitCode=1;

NODE
~~~
