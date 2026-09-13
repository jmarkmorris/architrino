# CRW-005 Measurement Ontology: Bounded Review and Repair

## Disposition and scope

Priority 56; review date 2026-09-12. The complete [Measurement Ontology chapter](../../../../content/markdown/aaa/quantum/measurement-ontology.md) was reviewed and locally repaired under the operator's explicit bounded repair authority. This receipt records 18 demonstrated local findings, MO-01 through MO-18: 17 major and one minor, with no critical finding assigned. Major means that an assertion, equation interpretation, or acceptance criterion needs a substantive hypothesis or correction; minor means a source or convention clarification without changing the displayed numerical benchmark. These are local editorial/mathematical severities, not empirical verdicts on the theory.

Only the assigned chapter and this new receipt were written by this task, as established by the task's apply_patch calls. No shared queue, status board, priority file, work log, conversion ledger, other chapter, generated artifact, fixture, or code was edited. No staging, commit, push, reset, stash, regeneration, or linked worktree operation was performed. Scoped Git status and cached-diff checks cover these two paths only; they do not claim that the shared checkout is otherwise clean or unchanged.

Disposition: bounded chapter repairs complete, subject to the validation limits below. Shared-record integration remains with the coordinating reviewer. The current [review board](../corpus-review-status.md) was inspected at priority 56 and was not updated by this task.

## Dispatch baseline and historical provenance

Before the first edit, shasum -a 256 matched the supplied chapter baseline, scoped git --no-optional-locks status --short showed no change to the chapter, and test ! -e confirmed the receipt was absent.

- Dispatch HEAD: 2490eb54aef24bf6d9a49cbc7ba62f1e54553305.
- Dispatch chapter: 1398 source lines; SHA-256 75dbaa6f7873efe5d38e5fe319aedbc4ac3dfd6ab7120d044940cb4472ca0454.
- Final chapter: 1402 source lines; SHA-256 0a96748f04ce938fa13feb8e4cec0bc5e0010944b63bdd05bf9fcb4233d16db9.
- The [conversion ledger](conversion-ledger.md), row at line 101 when inspected, identifies edition 1.0 dated 2026-09-04.
- Git inspection of the actual chapter diff at c973402b9, not its commit subject, identifies the retained edition-1.0 landing. Its bytes equal the dispatch baseline by Node string equality and SHA-256.
- The preceding retained snapshot c973402b9^ has 1313 lines and SHA-256 cc7f8c61ba76f5a79bf371dafd857e08fc4c1ada15ede451f29484e5bb214481. After a known parser control, comparison found all 93 display bodies and ordered viewer IDs unchanged across that landing.
- git diff --ignore-blank-lines c973402b9^ c973402b9 -- followed by the chapter path isolates one nonblank change: the durable-record introduction at pre-landing lines 553–557 / dispatch lines 588–592. The other landing changes are blank-line separation. This bounds conversion attribution: the mathematical problems below were already present in the retained pre-landing material; this receipt does not blame the conversion for introducing them or identify their original authors.

All “baseline lines” below refer to the exact dispatch hash, recoverable by git show HEAD-at-dispatch:path, not to subsequently shifting line numbers. “Repaired lines” refer to the final hash above. The complete chapter was read as numbered source before editing and reread in full after the repairs; the scoped diff was also inspected.

## Live owners and sources inspected

Startup and procedure: complete [AGENTS.md](../../../../AGENTS.md), [generated startup router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), [live review owner](../../../op/skills/skill-architrino-review.md), [corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), and [operator explanation standard](../../../op/operator-explanation-standard.md). The task-specific authorization overrides the ordinary consult-first repair boundary only for these two paths.

CRW-005 routing: [priorities](../priorities.md), the active CRW-005 portion of [work queue](../work-queue.md#crw-005-independent-post-conversion-assurance-review), the live document board, and this chapter's conversion-ledger entry. Historical queue counts were not used as current corpus coverage.

Authoring and reasoning references: [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematics terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), [source and attribution policy](../../../../content/markdown/aaa/archie/about-architrino.md), and [geometry/dynamics reasoning role](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md). Canon was read, not changed.

Task-relevant theory passages: [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md). These were orientation/source passages, not independent complete reviews of those chapters.

Load-bearing technical sources: [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), lines 11–165 when inspected, for acceleration-first delayed evolution and retained history; [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response), especially lines 3480–3545 and 4080–4198, for the conditional separator/phase construction and its outstanding substrate obligations; [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold), lines 238–270, for covariance scope; and relevant declarations in the [Massive-Superposition Gravity Validation Packet](../../../../content/markdown/aaa/validation/massive-superposition-gravity.md). Other linked chapters were checked as link targets, not certified as correct.

Binding/validation sources: the unchanged [display-equation parser and generator](../../../../scripts/build-equation-mapping-corpus.mjs), [equation-link checker](../../../../scripts/validate-equation-mapping-links.mjs), [content validator](../../../../scripts/validate-content.mjs), generated equation registry, and the Markdown heading-slug convention in [source-index builder](../../../../scripts/archie-service/build-source-index.mjs). Existing equation semantic IDs, local references, conversion provenance, and generated source-context bindings were preserved or explicitly reported stale.

### External primary-source verification

- [Kalb et al., 2016, publisher PDF](https://www.nature.com/articles/ncomms13111.pdf): abstract and experimental discussion support diamond-platform Zeno subspaces and projection-number scaling. This is measured observer-level evidence from the authors' apparatus, not a substrate derivation.
- [Kwiat et al., 1995, university-hosted paper](https://s3.wp.wsu.edu/uploads/sites/1777/2023/01/Kwiat-PRL-interaction-free-measurement.pdf): the ideal balanced single-pass probabilities and the chained-interferometer construction use different apparatus conventions. The paper's ideal chained survival expression supports the retained formula, not a claim of lossless practical efficiency.
- [Howl, Penrose, and Fuentes](https://arxiv.org/abs/1812.04630), full-text model examples around equation 61 / PDF pages 23–24: atom counts depend on condensate size, species, displacement, and model normalization. Proposed configurations must not be represented as achieved coherent superpositions.
- [Tilloy and Stace](https://arxiv.org/abs/1901.05477), abstract: neutron-star heating constrains specified collapse models. This bounded source check supplies attribution for that comparison only; no numerical astrophysical bound was independently recomputed.

The first two publisher DOI opens failed in the browsing tool; the publisher/university PDFs above supplied the relevant texts. No external source is imported as an architrino-level premise.

## Findings, repairs, grades, and falsifiers

Each finding's local textual premise is measured by the dispatch source and scoped diff. Mathematical consequences below are derived within the stated comparison model; assessments of missing physical support are inferences from the inspected source passages, not proofs that no evidence exists anywhere.

| ID / severity | Baseline lines → repaired lines | Demonstrated issue and smallest repair | Grade and operator-checkable falsifier / reopening condition |
| --- | --- | --- | --- |
| MO-01 / major | 5–44, 94 → 5–48, 96 | A universal metastable-target/attractor claim and a “large, slow, cold” laboratory limit exceeded the supplied dynamics. Distinguished readable records from this guessed dissipative model; allowed detector metastability; defined assembly/wake terms; distinguished driven response thresholds from invariant full-flow basin boundaries. | Inferred scope defect; invariant-boundary non-crossing is derived for a unique autonomous flow. Reopen on a concrete acceleration-first apparatus derivation establishing attraction and the asserted measurement domain; a reproducible record outside its predicted domain challenges that model. |
| MO-02 / major | 50–90, 240–291 → 52–92, 242–293 | Conditional and prepared-trial probabilities were conflated; unit efficiency was falsely necessary for equality; a no-signaling test appeared trajectory-local. Added equal-efficiency criterion, positive normalization, disjoint events, rejected-trial accounting, channel-level no-signaling, and common-measure requirements for chained certainty bounds. | Derived: equal 50% eligibility preserves equal outcome weights; unequal eligibility changes them. The single-handoff conflict inequality remains correct. Falsifier: an explicit normalized event model violating the repaired conditional identity or union bound under their hypotheses. |
| MO-03 / major | 102–212 → 104–214 | A finite retained state and an occupation measure did not establish closed delayed evolution or a Markov kernel; laboratory clock equality and Lindblad sufficiency were underqualified. Required history sufficiency, a calibrated positive clock map, lifting measures, and controlled comparison assumptions. | Derived sufficient-state obstruction: two full histories with the same coarse state but different coarse futures preclude a deterministic reduced map. Reopen with a same-fiber future proof/error bound and independently justified memory/clock hypotheses. |
| MO-04 / major | 293–410 → 295–418 | First contact was called crossing; a projected boundary-distance test was treated as sufficient ambiguity; record time lacked a full in-window persistence interval and could have an unattained infimum. Added oriented transverse crossing, degenerate-crossing limits, complete observer state, candidate-time tests, explicit window bounds, strict-order caveat, and history-dependent time pushforward. | Derived: a squared displacement touches without changing sign; an infimum of times strictly above one can equal one. Reopen if the actual apparatus supplies attained crossing/completion times and persistence bounds; record-assignment look-ahead is not automatically an adapted stopping time. |
| MO-05 / major | 415–535 → 422–539 | Basin conditioning was identified with one pure coordinate slice; arbitrary projective effects were treated as repeatable/Lüders updates; one Kraus operator per outcome was presented generally. Restricted pure/efficient cases, added mixed-state and multi-Kraus alternatives, matched input times, and excluded zero-probability conditional states. | Derived: an equal mixture of orthogonal basin states has purity one-half; a destructive instrument can have projective effects without preserving its input eigenstate. Reopen with a factorized basin and a calibrated repeatable/Lüders instrument on the same outcome/preparation domain. |
| MO-06 / major | 552–593 → 559–597 | Positive entropy production was treated as record certification and reset entropy was assigned to the combined memory plus reservoir. Scoped locking to the dissipative model; moved erasure export to the non-memory reservoir and named equiprobability/correlation assumptions. | Derived observer-level counterexample: reversible bit erasure has memory change minus log two and reservoir change plus log two, so the combined change is zero. Reopen with an independently derived entropy accounting or a controlled relation between entropy and actual readout persistence. |
| MO-07 / major | 595–650 → 599–654 | An identical “diagnostic” flow could pass trivially; intervention sensitivity and reduced restartability were equated with record existence. Required a specified nonzero-response control, ordered time pairs, and lifting measures; separated these tests from the persistence of a stored bit and from full multitime Markovianity. | Derived vacuity when both compared flows are identical; inferred overreach beyond the residual's scope. Falsifier/reopening test: a controlled intervention that changes unresolved influence without directly destroying the record, together with an independent multitime-memory test. |
| MO-08 / major | 652–672 → 656–677 | The concrete indicator omitted conditions needed to realize the abstract eligibility event and used basin-level timing for individual states; a joint energy/momentum/angular-momentum norm lacked scale conventions. Added explicit domain gates, trajectory times, record-window coverage, and separately scaled ledger components. | Derived domain and dimensional correction. Falsifier: a candidate satisfying the complete indicator while lacking the declared record amplitude/coupling, or a dependence of the normalized verdict on a mere change of units. |
| MO-09 / major | 674–745 → 679–750 | The law for accepted records used the unconditioned product measure; a variance effective sample size was treated as a concentration theorem; residual failure was blamed on hidden ensemble retuning. Used conditioned trial laws, retained rejection statistics, and preserved the independent-trial Hoeffding calibration with its actual hypotheses. | Derived conditional-product and tail-bound scope; the numeric witness gives accepted weights four-fifths/one-fifth from equal raw weights. Reopen with the measured joint/reset law and a proved concentration bound; a failed residual alone does not identify its cause. |
| MO-10 / major | 747–808 → 752–813 | Sampling was described as removing all between-probe escape; a boundary-flux expansion covered arbitrary resets; an ideal zero-spacing limit ignored duration/resources. Restricted fixed-flow monotonicity to nested sampled events and flux to smooth near-identity steps, with relative boundary velocity and uniform errors. | Derived set inclusion and conditional smooth expansion. Falsifier: a fixed-flow nested-grid construction with larger accepted intersection measure, or failure of the stated uniform expansion in a claimed smooth regime. Physical Zeno realization remains open. |
| MO-11 / major | 810–942 → 815–948 | Weak measurement was equated with no record at all; an order bound implied a detectable signal; late-state conditioning was used for earlier observables without a history map or centered limit. Restricted the target-record claim and added nonzero response, pointer readout, positive selection probability, pullback/history observables, and baseline subtraction. | Derived: an O(epsilon) signal can vanish; an unremoved constant offset divided by epsilon diverges. Falsifier: a declared calibrated limit that fails despite its nonzero-response, history, and selection assumptions. No backward causation follows from conditioning. |
| MO-12 / major | 1007–1049 → 1013–1053 | Stern-Gerlach source claims overstated the derivation of the apparatus impulse, spinor chart, separator, and record measure. Restored the source's conditional grade, acceleration-first origin, accepted-phase measure, and independent heralding/half-angle comparisons; distinguished H(0) from zero boundary mass. | Measured source boundary plus inferred claim overreach; normalized continuous-measure mapping is conditional mathematics. Reopen only with independent construction of the missing physical inputs, not agreement of kernels assembled from those same assumptions. Bell/photon closure is not supplied. |
| MO-13 / major | 1104–1172 → 1110–1178 | Finite-window prediction was made to require global invariant-measure uniqueness; a trapped-state return map could be mistaken for trial sampling; an exact indicator identity was qualified as approximate; eligible interval weights were compared directly with conditional probabilities. Separated preparation selection, reset dynamics, indicator-limit hypotheses, and normalization. | Derived: eligible mass one-quarter divided by total eligibility one-half gives probability one-half; a trapped basin trajectory has frequency one. Reopen with a preparation-selected cycle measure and validated shrinking event-boundary intervals matching an independent Born target. |
| MO-14 / major | 1213–1241 → 1219–1245 | Recoil and medium excitation were subtracted after already entering the combined control-volume energy change; emitted-assembly and boundary signs were unspecified. Defined disjoint signed external work/boundary transfers and retained internal components solely inside the total. | Derived bookkeeping counterexample: work three partitioned internally into one plus two has zero residual, whereas the old extra subtraction gives minus three. Reopen if a distinct, nonoverlapping volume/ledger convention is explicitly supplied. Effective energy balance remains a recovery target. |
| MO-15 / major | 1255–1277, 1341–1353 → 1260–1281, 1345–1357 | Covariance invertibility was assumed and stationarity was equated with white noise. Specified a positive-definite finite-bandwidth readout domain, operator inverse, null-signal treatment, and a separate white-noise assumption. | Derived: stationary two-sample covariance with correlation one-half gives quadratic value four-thirds instead of the white value two. Falsifier: failure of invertibility/whiteness on the declared calibrated domain; no pseudoinverse may silently discard a noiseless signal. |
| MO-16 / major | 1273–1277, 1279–1355 → 1279–1281, 1283–1359 | Record formation could “pass” an interference-preservation condition, and a signal-to-noise quadratic was treated as a universal visibility law. The tidal toy also lacked regulator/distance/chart limits. Required same-ensemble/time visibility calibration and a normalized finite profile, small displacement, and flat comparison chart. | Derived scope limits and independently checked tidal sign; inferred absence of a supplied visibility law. Reopen with calibrated likelihood/visibility and constitutive response. A later record or differently postselected pattern cannot rescue a conflicting same-window prediction. |
| MO-17 / minor | 1051–1074, 1197–1211 → 1057–1080, 1204–1217 | IFM probabilities lacked their denominator/apparatus convention; atom-count and heating statements lacked local primary-source scope. Preserved numerical formulas, distinguished incident success from conclusive efficiency, and attributed model-dependent proposals/heating bounds. | Measured primary-source support plus derived one-third conclusive efficiency in the balanced case. Falsifier: a cited source with a different apparatus convention or claimed achieved superposition; no new experimental success is asserted. |
| MO-18 / major | 1357–1386 → 1361–1390 | Positive trigger duration was called equivalent to measurement/record existence; closure prose overstated an interface's status; experimental bounds could compare different events. Kept the positive-time target while requiring independent operational records and same-event, same-clock bounds; stated the unclosed physical obligations. | Derived: positive duration alone supplies no persistent readout; distance one and speed at most two yield a conditional lower bound one-half. Reopen with a concrete apparatus-derived bound and an independently calibrated upper bound on that same event. |

## Independent reasoning and preservation

The in-memory Node witness block below was run only after its known normalization, identity-covariance, and entropy-cancellation controls passed. It reproduces elementary counterexamples and the independently differentiated tidal sign. It is not a simulation of an architrino assembly, EOM solver execution, or physical validation. Every numerical example uses the normalized convention c_f = 1; the chapter introduces no numerical wake-speed instantiation.

The repaired chapter preserves all 93 ordered equation-viewer identities and every original Markdown link target by the known-case-first parser/marked comparison. Ten display bodies changed intentionally:

| Viewer ID suffix | Repaired opening line | Authorized mathematical change |
| --- | ---: | --- |
| fd08080dd71de5df | 318 | Oriented transverse trigger crossing. |
| 8e1b1ea72f3c9f5f | 336 | Observer projection receives the complete retained state. |
| 5bcb19d59f2bae24 | 366 | Candidate record time tests a full in-window persistence interval. |
| 9ebe7131e95dd9b6 | 560 | Entropy interval begins at the candidate record instant. |
| 22365349396b7d5e | 580 | Reset export is assigned to the non-memory reservoir. |
| 640855e605b01fdf | 615 | Autonomy window begins at record completion. |
| 920b7fc4aac588a5 | 643 | Ordered restart times within the completed-record window. |
| 150d653a571ab984 | 657 | Individual timing and complete in-window record eligibility. |
| 9b1b6ae5a482bbe4 | 827 | Weak-probe trigger uses the same orientation rule. |
| 3bf8b7dd9ded3c6b | 1222 | Remove duplicate subtraction of internal energy transfers. |

The full IDs retain their corpus-equation- prefix. The other 83 display bodies remain byte-identical by the parser comparison. This is intentional bounded repair, not a claim that the chapter's mathematical bytes were preserved unchanged.

## Validation results and limits

Commands were run from the repository root. This receipt's code blocks are retained executable evidence; no separate checker file was created.

- Complete numbered chapter reread and scoped diff inspection: completed. The edits retain the chapter structure, target-versus-substrate distinctions, existing external benchmarks, open derivations, and testable falsification intent.
- Known-case-first scoped checker below: PASS for the chapter, with 93 display equations, 305 inline expressions, 118 local links/anchors, all original viewer IDs and link targets retained, and no trailing whitespace. KaTeX uses throwOnError and strict error mode. Heading checks use the inspected source-index slug convention; they are static checks, not browser navigation tests.
- The same checker after creating this receipt: PASS for the receipt's 34 local links/anchors and whitespace; no authored mathematical expressions occur outside its fenced reproduction blocks. The receipt was reread completely as numbered source.
- Known-case-first arithmetic witnesses below: PASS. Independent reference for the preserved negative tidal sign is differentiation of the effective comparison acceleration, checked separately by a centered difference.
- git --no-optional-locks diff --check on the two authorized paths: PASS. Because the receipt is untracked, the scoped checker separately checks its full text for whitespace and links.
- git --no-optional-locks diff --cached --numstat on the two authorized paths: empty output at validation; this task did not stage either path.
- node scripts/validate-equation-mapping-links.mjs: PASS, 23 registered promoted links. This narrow checker does not establish freshness of all generated corpus equations.
- node scripts/build-equation-mapping-corpus.mjs --check: exit 1; 199 Markdown files, 4685 displays, 23 promoted equations, 30444 symbol definitions at this run; the only reported error is stale content/generated/equation-mapping/corpus-equations.json. This is expected to include this chapter's changed formulas/context; concurrent sources can also contribute, and no exclusive attribution is claimed.
- Final read-only node scripts/build-equation-mapping-corpus.mjs --check rerun: PASS, exit 0, zero errors, with the same 199 files, 4685 displays, 23 promoted equations, and 30444 symbol definitions. The shared checkout's generated state now satisfies the checker. This task did not regenerate it and does not attribute that transition to a particular concurrent worker.
- Initial node scripts/validate-content.mjs --check --strict: exit 1; 391 scene configs, 199 corpus Markdown files, 1699 repository Markdown files audited, six errors and zero warnings. The errors referenced example-link syntax in the other quantum-summary and reality-quantum-causality receipts at their then-current lines 223 and 200. These were outside this task's write scope. Their locations are evidence of the run, not attribution to an author or a claim that those live lines remain unchanged. A final rerun is recorded below.
- Successive final node scripts/validate-content.mjs --check --strict runs after receipt creation: PASS, exit 0; 391 scene configs and 199 corpus Markdown files in both runs; repository Markdown audit coverage was 1700 and then 1701 as concurrent files appeared. Both runs reported zero errors, zero warnings, and 30 notes. The earlier six errors were absent; this worker did not edit their source files. This gate does not check equation-registry freshness.

Blocking status: no unresolved blocker to this two-path bounded repair at the final checks. Scientific and shared-record closure remain outside the completion claim.

Generated-artifact status: no generator write mode was run and no generated file was edited by this task. The initial drift was deferred with the exact command node scripts/build-equation-mapping-corpus.mjs --write, followed by node scripts/build-equation-mapping-corpus.mjs --check, for an authorized regeneration/publication runner only. The final check passes, so that command is no longer required by the measured state; retain it as the historical deferral, not a request to regenerate again. The write mode can also insert missing source links elsewhere, so this worker must not run it under two-path authority. No content-index regeneration command is requested unless its own check reports actual index drift.

## Remaining obligations and closure limits

The bounded editorial corrections do not supply a well-posed physical apparatus solution, an accepted basin family, physical branch existence, assembly formation or stability, an independently derived record measure, recovered Born statistics, energy conservation, EOM solver acceptance, or theory closure. They also do not close the Stern-Gerlach, Bell-pair, photon, gravity, or massive-superposition downstream programs. Definitions, exact conditional identities, a green renderer, and equality to an assumed comparison formula cannot substitute for those evidence classes.

The next scientific step is one explicit acceleration-first apparatus-target history model with preparation/control data, record amplitude, a trigger surface and clock map, a complete persistence interval, independently specified ensemble weights, and independently checkable response/ledger bounds. No such run was started by this task.

The next integration step is for the coordinating reviewer to verify the chapter hash and this receipt, record MO-01 through MO-18 on the shared CRW-005 owners, and rerun the combined checks after concurrent edits settle. Any reappearing repository-wide failures belong with their actual owners. This task neither changes that shared disposition nor authorizes regeneration or publication.

## Reproduction: scoped known-case-first checker

Run the following JavaScript with node --input-type=module from the repository root. It reads only the authorized paths, fixed Git baselines, link targets, and existing parser/registry/runtime dependencies.

```js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import katex from 'katex';
import {marked} from 'marked';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const tick=String.fromCharCode(96);
function clean(source) {
  let fence=null;
  return source.split('\n').map(line=>{
    const m=line.match(/^\s*(\x60{3,}|~{3,})/);
    if(m){if(!fence)fence=m[1][0];else if(fence===m[1][0])fence=null;return '';}
    if(fence)return '';
    return line.replace(/(\x60+)[\s\S]*?\1/g,'');
  }).join('\n');
}
function math(source) {
  const s=clean(source), found=[];
  const escaped=i=>{let n=0;while(i>0&&s[--i]==='\\')n++;return n%2===1;};
  for(let i=0;i<s.length;i++){
    let open,close;
    if(s[i]==='$'&&!escaped(i)){open=s[i+1]==='$'?'$$':'$';close=open;}
    else if(s[i]==='\\'&&!escaped(i)&&(s[i+1]==='('||s[i+1]==='[')){
      open=s.slice(i,i+2);close=s[i+1]==='('?'\\)':'\\]';
    } else continue;
    let j=i+open.length;
    while((j=s.indexOf(close,j))>=0&&escaped(j))j+=close.length;
    assert(j>=0,'Unclosed math at line '+(s.slice(0,i).split('\n').length));
    found.push({tex:s.slice(i+open.length,j),display:open==='$$'||open==='\\['});
    i=j+close.length-1;
  }
  return found;
}
function links(s){const out=[];marked.walkTokens(marked.lexer(s),t=>{if(t.type==='link'||t.type==='image')out.push(t.href);});return out;}
function slug(s){return s.replace(/\x60([^\x60]+)\x60/g,'$1').replace(/\$([^$]+)\$/g,'$1').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-');}
function anchors(s){return new Set([...clean(s).matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>slug(m[1])));}
function localProblems(file,s,registry) {
  const issues=[];let local=0;
  for(const href of links(s)){
    if(/^[a-z][a-z0-9+.-]*:/i.test(href))continue;
    local++;
    assert(!href.startsWith('/'),'Absolute authored link '+href);
    const [name,fragment]=href.split('#');
    const target=path.resolve(path.dirname(file),decodeURIComponent(name.split('?')[0]||path.basename(file)));
    if(!fs.existsSync(target)){issues.push('missing '+href);continue;}
    if(fragment&&target.endsWith('.md')&&!anchors(fs.readFileSync(target,'utf8')).has(decodeURIComponent(fragment)))issues.push('heading '+href);
    if(fragment&&path.basename(target)==='equation-mapping.html'&&!registry.has(fragment))issues.push('equation '+fragment);
  }return {local,issues};
}
const sample='$x+1$\n$$\\frac{1}{2}$$\n'+tick+'$ignored$'+tick+'\n'+tick.repeat(3)+'\n$$bad$$\n[x](missing)\n'+tick.repeat(3);
assert.equal(math(sample).length,2);
assert.throws(()=>math('$unclosed'));
katex.renderToString('\\frac{1}{2}',{throwOnError:true});
assert.throws(()=>katex.renderToString('\\notARealCommand',{throwOnError:true}));
assert.deepEqual(links('[ok](AGENTS.md)\n'+tick+'[bad](missing)'+tick+'\n'+tick.repeat(3)+'\n[bad](missing)\n'+tick.repeat(3)),['AGENTS.md']);
assert.equal(localProblems('control.md','[ok](AGENTS.md)\n[bad](__crw_known_missing__.md)',new Set()).issues.length,1);
assert(anchors('# Foo & Bar').has('foo-and-bar'));
const parserSample=tick.repeat(3)+'\n$$bad$$\n'+tick.repeat(3)+'\n$$\nx+1\n$$\n\n[View →](../../../../equation-mapping.html#corpus-equation-control)\n';
const control=parseCorpusDisplayEquations('control.md',parserSample);
assert.equal(control.length,1);assert.equal(control[0].tex,'x+1');assert.equal(control[0].existingLink.semanticId,'corpus-equation-control');
console.log('KNOWN CASES PASS: fenced/inline-code exclusion; unclosed math and invalid KaTeX rejected; real/missing links distinguished; heading slug; equation viewer parser.');
const file='content/markdown/aaa/quantum/measurement-ontology.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-measurement-ontology-review-2026-09-12.md';
const baseline=execFileSync('git',['show','2490eb54aef24bf6d9a49cbc7ba62f1e54553305:'+file],{encoding:'utf8',maxBuffer:1024*1024});
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
assert.equal(sha(baseline),'75dbaa6f7873efe5d38e5fe319aedbc4ac3dfd6ab7120d044940cb4472ca0454');
const current=fs.readFileSync(file,'utf8');
const before=parseCorpusDisplayEquations(file,baseline),after=parseCorpusDisplayEquations(file,current);
assert.deepEqual(after.map(x=>x.existingLink?.semanticId),before.map(x=>x.existingLink?.semanticId));
assert.equal(links(baseline).filter(x=>!links(current).includes(x)).length,0);
const changed=after.filter((x,i)=>x.tex!==before[i].tex).map(x=>({id:x.existingLink.semanticId,line:x.startLine}));
console.log('PRESERVATION PASS: '+after.length+' ordered display/viewer identities; all baseline link targets retained; changed displays '+changed.length);
console.log(JSON.stringify(changed));
const registry=new Set(JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8')).records.map(x=>x.semanticId));
for(const f of [file,report]){
  if(!fs.existsSync(f)){console.log(f+': absent at chapter-only pass');continue;}
  const s=fs.readFileSync(f,'utf8'),eq=math(s);
  for(const x of eq)katex.renderToString(x.tex,{displayMode:x.display,throwOnError:true,strict:'error'});
  const result=localProblems(f,s,registry);
  assert.deepEqual(result.issues,[],f);
  assert(!/[ \t]+$/m.test(s),'trailing whitespace '+f);
  assert(!/A\^3|A³/.test(clean(s)),'forbidden theory abbreviation');
  console.log(f+': PASS '+eq.filter(x=>x.display).length+' display + '+eq.filter(x=>!x.display).length+' inline math; '+result.local+' local links/anchors; no trailing whitespace; SHA256 '+sha(s));
}
assert(!/\]\([^)]*reference\/priorities/.test(current));
assert(!/c_f\s*=\s*\d/.test(current));
console.log('No reader-facing priority links introduced; no numerical c_f instantiation in chapter.');

```

## Reproduction: independent arithmetic witnesses

```js
import assert from 'node:assert/strict';
const c_f=1;
const close=(a,b)=>assert(Math.abs(a-b)<1e-10,String(a)+' != '+String(b));
const normalize=a=>{const n=a.reduce((x,y)=>x+y,0);assert(n>0);return a.map(x=>x/n);};
const quadratic=(x,y,a,b,d)=>(d*x*x-2*b*x*y+a*y*y)/(a*d-b*b);
assert.deepEqual(normalize([1,1]),[0.5,0.5]);
close(quadratic(1,1,1,0,1),2);
close((Math.log(2)-Math.log(2)),0);
console.log('KNOWN CASES PASS: equal-mass normalization, identity-covariance quadratic, reversible entropy cancellation; c_f='+c_f);
assert.deepEqual(normalize([0.5*0.5,0.5*0.5]),[0.5,0.5]);
assert.deepEqual(normalize([0.5*1,0.5*0.25]),[0.8,0.2]);
console.log('MO-02/09: equal 50% eligibility preserves 1/2 weights; unequal eligibility gives 4/5,1/5.');
assert.equal((1-1)**2,0);assert((0.9-1)**2>0&&(1.1-1)**2>0);
for(const n of [1,10,100])assert(1+1/n>1);
console.log('MO-04: (t-1)^2 touches without crossing; admissible times 1+1/n approach excluded infimum 1.');
const mixture=[[0.5,0],[0,0.5]];
close(mixture[0][0]**2+mixture[1][1]**2,0.5);
console.log('MO-05: equally weighted orthogonal basin states have purity 1/2, unlike any normalized pure slice.');
const memory=-Math.log(2),reservoir=Math.log(2);
close(memory+reservoir,0);assert(memory+reservoir<Math.log(2));
console.log('MO-06: reversible bit erasure gives total entropy 0 and reservoir entropy log(2).');
const coarse=new Set([0,1,2]),fine=new Set([0,2]);
assert([...fine].every(x=>coarse.has(x)));assert(fine.size<=coarse.size);
console.log('MO-10: additional survival observations shrink the fixed-flow history set.');
close(0.25/0.5,0.5);
console.log('MO-13: eligible weight 1/4 and total eligibility 1/2 yield conditional probability 1/2.');
const totalIncrease=3,externalWork=3,internalRecoil=1,internalMedium=2;
close(totalIncrease-externalWork,0);
close(totalIncrease-externalWork-internalRecoil-internalMedium,-3);
console.log('MO-14: internally partitioning work 3 into recoil 1 and medium 2 gives residual 0; subtracting internal terms again gives -3.');
close(quadratic(1,1,1,0.5,1),4/3);
console.log('MO-15: stationary two-sample covariance with lag correlation 1/2 gives 4/3, not white-noise value 2.');
const acceleration=x=>-1/(3-x)**2;
const derivative=(acceleration(1e-5)-acceleration(-1e-5))/(2e-5);
close(derivative,-2/27);
console.log('MO-16 preservation: independent finite difference retains the negative tidal sign, derivative '+derivative+' versus analytic -2/27.');
close(0.25/(0.25+0.5),1/3);
close(Math.cos(Math.PI/2)**2,0);
console.log('MO-17: balanced IFM success 1/4 gives conclusive efficiency 1/3; chained N=1 gives 0.');
close(1/2,0.5);
console.log('MO-18: threshold distance 1 with approach speed at most 2 implies trigger duration at least 1/2.');
console.log('All witnesses PASS. These are elementary comparison/counterexample checks, not an EOM solver run or physical apparatus evidence.');

```
