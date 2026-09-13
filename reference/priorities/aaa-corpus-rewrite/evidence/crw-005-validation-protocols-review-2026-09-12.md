# CRW-005 Validation Protocols — bounded review — 2026-09-12

## Scope and disposition

Priority 69 is complete as a bounded chapter repair and editorial self-review: **VP-01–VP-11**, with **7 High and 4 Medium** findings, are repaired. This receipt and [Validation Protocols](../../../../content/markdown/aaa/validation/validation-protocols.md) are the only authored files changed by this worker. Shared CRW-005 status, priorities, work-log, and work-queue records are coordinator-owned and were not edited. No Git writes, generated-artifact regeneration, EOM solver run, branch certification, empirical acceptance, or theory-closure claim is part of this review.

The principal repair is logical: absence of a required calculation is incomplete verification, while a resolved contradiction rejects its specified claim and domain. Neither a missing calculation nor rejection of one candidate proves that all admissible branches fail. Preferred-frame tests now identify their measured comparison, frame, calibration, sensitivity, and speed channel. The CMB-to-sea-frame relation remains a hypothesis.

Claim grade: measured. Before editing, scoped git status and diff inspection returned no changes for the assigned chapter and no existing receipt at the assigned path. The exact commands were git --no-optional-locks status --short -- followed by the two assigned paths, and git --no-optional-locks diff HEAD -- followed by the chapter path. The command git rev-parse HEAD returned c7a00b8116b24f6d70d081c24a503e0aba3366f4; shasum -a 256 returned chapter baseline 02464167b8839ec514e2cc684e5a32b90d3d76a52a0ae8904feb045444200c83. These observations establish the local review baseline, not ownership of any other file. Falsifier: a different chapter hash or a diff against the named commit invalidates that byte comparison.

## Authorities and dependency inventory

The live review routing was AGENTS.md → generated startup router → architrino-review maintained owner → corpus reviewer. The explicit worker assignment authorizes bounded repairs beyond the review owner's default read-only mode. The academic and mathematical style guides, mathematical terminology, terminology usage, comparative glossary, and About Architrino source policy supplied the editorial and evidence rules. Relevant foundation and Master Equation passages supplied the substrate/observer boundary; no standard-physics law was adopted as a substrate premise.

The decisive local authorities were:

- [Verification and Advancement Usage](../../../../content/markdown/aaa/archie/terminology-usage.md#verification-and-advancement-usage): passed, failed, incomplete, and inapplicable verification are distinct from advancement.
- [Failure Criteria](../../../../content/markdown/aaa/validation/failure-criteria.md#incompatibility-witnesses): rejection of a specified shared-record family requires an incompatibility witness. Its separate broad preferred-frame slogans do not supply a universal numerical bound for this chapter.
- [Closure Scorecard](../../../../content/markdown/aaa/validation/closure-scorecard.md#scoring-lens): enforceable diagnostics can support readiness categories without establishing coefficient, parameter, or empirical closure.
- [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md#tagged-recovery-and-observer-hiding-theorem-target): matched preparations, fixed readout map, channel-specific tolerance, and separate statistical comparison.
- [Lorentz Kinematics](../../../../content/markdown/aaa/spacetime/lorentz-kinematics.md#abstract): channel-qualified speed, ruler/clock targets, and unresolved common-channel recovery.
- [CMB frame consistency](../../../../content/markdown/aaa/cosmology/CMB.md#cmb-dipole-and-matter-dipole-gate): source, selection, transport, and medium response must be distinguished; assigning an unexplained residual to the sea is not measurement of that mechanism.
- [Constraint Ledger](../../../../content/markdown/aaa/validation/constraint-ledger.md#lorentz-invariance--preferred-frame-effects-tier-1): a generic clock/sidereal comparison is not a source-verified hydrogen transition limit.
- [Parameter Ledger](../../../../content/markdown/aaa/validation/parameter-ledger.md#parameter-versus-field): state-dependent quantities are not independent global fitting constants.
- [Simulation Scope Envelope](../../../../content/markdown/aaa/validation/simulations/README.md#simulation-scope-envelope): bounded domain, history depth, and observation scope.

Before editing, fixed-string rg under scripts/, tests/, content/, and reference/ found chapter-path consumers in its scene source, scene graph, textbook TOC, generated reading copies, navigation tests, source-index fixture context, and authored cross-links. The scene's source path is unchanged. The TOC excerpt at lines 8632–8760 names the chapter and its four second-level headings. The existing equation parser and generator source were inspected: display identities use existingLink.semanticId. The known-case-first inventory found **8 headings, 13 links, and 0 display equations** in the baseline. Thus no equation/viewer identity exists in this chapter to rename or remove. Generated reading copies and source indexes remain outside this worker's write scope; this inventory does not certify their current freshness or exhaust every indirect byte binder.

## Findings and repairs

Locations below refer to the baseline commit above and to final chapter lines. High means a defect can change the inferred validation outcome or physical claim; Medium means a scope, terminology, or cross-document rule defect that materially weakens interpretation. The findings are about the text and its logic, not newly measured physical results.

| ID | Severity | Baseline → final chapter lines | Defect, reasoning, and implemented repair | Claim grade and checkable falsifier |
| --- | --- | --- | --- | --- |
| VP-01 | High | 3, 33, 52 → 5, 37–41, 60 | Missing entries and unstable calculations were routed through a generic failure code, while rejection scope was underspecified. Distinguish incomplete verification, resolved failure, advancement, and branch-family exclusion; distinguish an unresolved refinement sequence from a proven divergent limit. | Derived logical distinction; measured canon comparison. Falsifier: a proof that the stated evidence excludes every member of the declared admissible family, rather than only the tested candidate. |
| VP-02 | High | 25–33 → 27–37 | A universal promotion list required native histories and observer maps even for analytical lemmas and instrument checks. Scope the physical-recovery list to applicable evidence and permit a matched family for multi-experiment claims; retain mathematical and instrument claims at their own reach. | Derived counterexample to the universal requirement. An elementary identity can be proved without an apparatus. Falsifier: a stated physical claim whose required observer or history condition the revised applicability rule actually waives. |
| VP-03 | Medium | 27–30 → 31–39 | The physical protocol omitted explicit numerical units, comparison window, history/domain coverage, and error budget relative to its tolerance. Add these declarations, including normalized wake speed, and distinguish finite simulation data from the full universe state. | Measured omission by full chapter read; derived scope consequence. Falsifier: a retained declaration supplying the missing fields for a result alleged to satisfy the old standalone list. |
| VP-04 | Medium | 19 → 21 | The blanket statement that diagnostics and fixtures cannot raise the score conflicts with the scorecard's readiness categories. Restore category-specific evidence rules and preserve the prohibition on automatic score increases or physical-closure credit. No score was changed. | Measured comparison with the scorecard's Scoring Lens. Falsifier: an authoritative rubric that bars the readiness credit explicitly allowed by the live owner. |
| VP-05 | High | 44–45 → 52–53 | Calling the CMB frame an empirical proxy for Noether sea rest promoted an unestablished physical correspondence. Keep the radiation-frame comparison and make the sea interpretation depend on a specified source/transport/observer map and uncertainty. | Measured source comparison; guessed physical correspondence remains guessed. Falsifier: independent evidence establishing that mapping over the stated spatial scale and conditions. |
| VP-06 | High | 51 → 59 | Bare Lorentz factor, unspecified speed denominator, clock coordinate, and rest normalization permit different targets. Define the dressed clock/ruler channel factor, speed range, frame and reference, distinguish physical clock time from observer coordinate time, and retain photon-speed matching as a separate recovery condition. | Derived channel-dependence witness; comparison target only. Falsifier: a derivation showing the channel identification and reference map in the stated regime, or a corrected formula inconsistent with that declared target. |
| VP-07 | High | 49–52 → 57–60 | A rotating apparatus and a generic invariant “frequency record” do not specify a controlled comparison; arbitrary axes provide no physical direction, and rotation alone does not test boost dependence. Specify matched preparations, physical directions, center/frame, phase difference or frequency ratio, nuisance model, and channel-specific bound. | Derived measurement-design distinction, consistent with the tagged-recovery owner. Falsifier: a protocol demonstrating the allegedly omitted comparison from the same declared records, including its boost range. |
| VP-08 | High | 32, 50, 62 → 36, 70 | A negative control alone does not exclude an always-failing instrument, and a reported zero does not demonstrate sensitivity. Add a known valid case and a nonzero-signal control, resolve uncertainty against the bound, and distinguish means, individual outcomes, and distributions. | Derived exact counterexamples below. Falsifier: a proof that the available control, uncertainty, or statistic already determines the stronger claimed result. |
| VP-09 | High | 56–57 → 64–65 | “Derived hydrogen” presupposed the missing output; a generic sidereal-clock ceiling was assigned without the hydrogen/reference-channel source and response. Treat the transition as a recovery target, specify a frequency reference, and require a matching experimental comparison before any pass. | Derived ratio dependence and measured source-scope mismatch. Falsifier: a source-verified hydrogen/reference protocol and same-history prediction establishing the claimed limit. |
| VP-10 | Medium | 58 → 66 | The per-run retuning ban did not distinguish hidden fitted coefficients from state changes generated by one law or independently measured environmental inputs. Preserve the hidden-tuning rejection while stating the legitimate predeclared variations and calibration/validation split. | Derived fixed-law witness and measured parameter-ledger comparison. Falsifier: evidence that a permitted variation changes a shared law or calibration after inspection of the validation residual. |
| VP-11 | Medium | 3, 21, 39, 43 → 3, 23, 31, 47, 51 | The hub used native history, causal root, branch, physical observer, residual, and wake concentricity without enough local explanation. Define the load-bearing terms and connect them to existing owners; preserve heading identities and the chapter-map sequence. | Measured editorial comparison with the academic guide. Falsifier: an introduced definition that conflicts with its live owning chapter or changes the mathematical claim. |

All eleven findings have bounded repairs in the chapter. No optional stylistic preference has been counted as a mathematical error. The unusual capitalization in the existing “Null Tests for Absolute-Frame Group velocity” heading is preserved to avoid unnecessary identity churn.

## Independent reasoning and concrete witnesses

The following are exact logical or arithmetic checks of the repaired argument. They do not simulate architrinos, establish a retained assembly, or independently validate the complete chapter's physics.

**Finite rejection versus exclusion.** In a declared two-candidate domain, let only candidate 1 satisfy a predicate. Testing candidate 0 and rejecting it leaves candidate 1 admissible. Thus a failed sampled candidate does not imply an empty admissible set. An unavailable predicate value likewise supplies neither truth nor falsehood. This is the logical basis for VP-01 and VP-02; broader rejection requires a proof covering the broader family.

**Controls and statistical nulls.** An instrument that always rejects will reject a negative case and still fail a known valid case. An instrument that always outputs zero will return a null on both a zero and a nonzero injected signal. Each passes an insufficient control while failing the control required for its actual claim. Two equal-weight distributions on outcomes (-1, 1) and (-2, 2) both have mean zero, but their variances are 1 and 4, respectively. Equality of means therefore cannot establish equality of distributions. For a dimensionless residual 0.005, uncertainty radius 0.1, and bound 0.01, the central value lies below the bound while the interval extends outside it. These are counterexamples, not observational data or chosen empirical thresholds.

**Reference-channel cancellation.** A measured frequency ratio is $r=\nu_{\mathrm{line}}/\nu_{\mathrm{ref}}$, where the numerator is the line frequency and the denominator the reference-channel frequency in the same comparison. Multiplying both frequencies by the same positive factor leaves the ratio unchanged by cancellation. Changing only the numerator does not. A line's raw frequency response therefore cannot determine its observed modulation without the reference response. The witness uses line 5, reference 2, and common scale 3 in arbitrary matched units; the ratio remains 2.5. These values describe arithmetic only.

**Channel-qualified Lorentz target.** Work in normalized wake-speed units with $c_f=1$. Take a comparison cell with $c_{\mathrm{eff}}=0.8$ and assembly group speed $v=0.48$. The ratio to the dressed channel is 0.6, giving inverse Lorentz factor 0.8 and factor 1.25. Substituting the primitive wake speed as denominator gives the different ratio 0.48 and a different inverse factor. The discrepancy proves that an unspecified denominator is substantive, even when each expression is dimensionally valid. It does not establish that such a medium or assembly exists. The special-relativistic formula is used solely as the labeled recovery target prescribed by Lorentz Kinematics.

**State variation versus parameter fitting.** In the illustrative response law $y=p x$, where $p$ is a fixed coefficient and $x$ a supplied environmental state, setting $p=2$ gives outputs 2 and 4 for states 1 and 2. Different responses follow from the same law. Changing $p$ to 3 for the second result changes the law's shared coefficient. The example explains why different state values do not alone demonstrate hidden tuning. It supplies no constitutive law for the Noether sea.

Claim grade: derived. The proofs are the logical and algebraic arguments above; the Node assertions below are arithmetic witnesses. Falsifier: a counterexample to the stated cancellations, predicate distinction, or finite sums under their declared assumptions. Agreement among rewritten prose, examples, and assertions is not independent evidence for any physical recovery.

## Validation record

The in-session structural instrument was first tested on a known Markdown string containing one true heading, two true links, inline and display mathematics, a known display identity, and fake content inside fenced and inline code. Its first run failed because the checker expected the parser property equationId; inspection of the existing parser showed the actual property is semanticId. The checker was corrected, and the known case passed before any target inspection. It also rendered valid KaTeX, rejected an invalid command, and distinguished existing and missing paths. The successful known-case output was recorded in the tool transcript before the baseline and edited chapter were checked.

The arithmetic helpers were separately tested against exact mean 2, variance 1, and zero-speed Lorentz rate 1, with deliberate unequal values rejected. Only after that pass were the counterexample witnesses above run. All eight witness groups passed.

The structural comparison against the baseline commit preserved **all 8 original headings, all 13 original links, and all 0 display-equation identities**. The chapter has **22 links and 18 TeX expressions**, all parsed expressions rendered successfully by KaTeX with throwOnError enabled and strict errors enabled. The original bare Lorentz-factor expression was intentionally replaced by a defined channel-qualified target; no display equation was added.

The first receipt-inclusive strict run reported three apparent missing links inside the illustrative code block because the repository link scanner recognizes backtick fences but not tilde fences. Changing only the receipt's code fences to the supported form resolved those reports; no illustrated link target was treated as a real broken chapter link. A subsequent self-review also corrected a copied double-dollar delimiter in the reproduction fixture before executing the saved reproduction block.

The final strict content command, node scripts/validate-content.mjs --check --strict, passed with 0 errors, 0 warnings, and 30 notes across 391 scene configs, 199 corpus Markdown files, and 1722 repository Markdown files in the measured snapshot. The two-file structural/KaTeX check passed with 18 chapter expressions and 9 receipt expressions; all 22 chapter and 10 receipt link destinations resolved locally. Scoped git --no-optional-locks diff --check HEAD -- and direct trailing-whitespace inspection passed for the chapter and receipt. These checks establish text integrity, path existence, algebraic examples, and baseline preservation within their declared scope. Local path checks do not test remote sources or prove every external claim, and this review did not acquire external experimental data.

The equation-registry command node scripts/build-equation-mapping-corpus.mjs --check passed before editing and later reported stale content/generated/equation-mapping/corpus-equations.json in the shared checkout. The latter snapshot contained 4685 display equations and 30481 symbol definitions. This chapter still contains no display equations; the timing does not attribute shared-tree drift to this worker. No regeneration was performed. The exact deferred command is:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
```

The regeneration owner must subsequently rerun its --check. Final chapter SHA-256, measured by shasum -a 256:

```text
bf012ffc4a8791e2e3ed960ec3006b6f1b4e908a638dde3bd8ddda35464fa0f8
```

The last scoped git status observed the chapter already staged and this receipt untracked. This worker issued no Git mutations; those index observations do not establish which concurrent actor staged the chapter. The handoff hash identifies the reviewed working-file bytes.

### Reproduction: structural and rendering check

Run the following from the repository root with VP_TARGET=1 node --input-type=module and feed the block on standard input. Without VP_TARGET=1 it runs only its known controls. Its fenced-code filter covers the syntax used by these two files; it is not a general Markdown conformance test.

```javascript
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import katex from "katex";
import {marked} from "marked";
import {parseCorpusDisplayEquations} from "./scripts/build-equation-mapping-corpus.mjs";
function inspect(s) {
 const headings=[], links=[];
 marked.walkTokens(marked.lexer(s),t=>{
  if(t.type==="heading") headings.push(t.text);
  if(t.type==="link") links.push(t.href);
 });
 let fence=null;
 const prose=s.split("\n").map(line=>{
  const m=line.match(/^\s*(\x60{3,}|~{3,})/);
  if(m){if(!fence) fence=m[1][0]; else if(fence===m[1][0]) fence=null; return "";}
  return fence ? "" : line.replace(/\x60[^\x60]*\x60/g,"");
 }).join("\n");
 const math=[...prose.matchAll(/\$\$([\s\S]*?)\$\$|(?<![\\$])\$(?!\$)([^\n$]+?)(?<!\\)\$/g)].map(m=>({tex:m[1]??m[2],display:!!m[1]}));
 const equations=parseCorpusDisplayEquations("fixture.md",s);
 return {headings,links,math,equations};
}
const fixture="# Known\n\n[exists](AGENTS.md) $x^2$\n\n$$\nx=1\n$$\n\n[View →](equation-mapping.html#known)\n\n~~~\n# Fake\n[bad](absent.md) $\\badcommand$\n~~~\n\n"+'\u0060$ignored$\u0060';
const known=inspect(fixture);
assert.deepEqual(known.headings,["Known"]);
assert.deepEqual(known.links,["AGENTS.md","equation-mapping.html#known"]);
assert.deepEqual(known.math.map(x=>x.tex.trim()),["x^2","x=1"]);
assert.equal(known.equations.length,1);
assert.equal(known.equations[0].existingLink.semanticId,"known");
for(const m of known.math) katex.renderToString(m.tex,{throwOnError:true,displayMode:m.display});
assert.throws(()=>katex.renderToString("\\notacommand",{throwOnError:true}));
assert.ok(fs.existsSync(path.resolve("AGENTS.md")));
assert.ok(!fs.existsSync(path.resolve("__crw005_vp_known_absent__.md")));
console.log("KNOWN PASS: heading/link/math extraction ignores fenced and inline code; display identity, valid/invalid KaTeX and existing/missing path controls.");
if(process.env.VP_TARGET==="1"){
 const chapter="content/markdown/aaa/validation/validation-protocols.md";
 const receipt="reference/priorities/aaa-corpus-rewrite/evidence/crw-005-validation-protocols-review-2026-09-12.md";
 const base=execFileSync("git",["show","c7a00b8116b24f6d70d081c24a503e0aba3366f4:"+chapter],{encoding:"utf8"});
 const before=inspect(base),after=inspect(fs.readFileSync(chapter,"utf8"));
 assert.deepEqual(after.headings,before.headings);
 for(const l of before.links) assert.ok(after.links.includes(l),"missing original link "+l);
 assert.deepEqual(after.equations.map(e=>e.existingLink?.semanticId),before.equations.map(e=>e.existingLink?.semanticId));
 console.log(JSON.stringify({preservedHeadings:before.headings.length,originalLinks:before.links.length,displayIdentities:before.equations.length}));
 for(const file of [chapter,receipt].filter(f=>fs.existsSync(f))){
  const s=fs.readFileSync(file,"utf8"),inv=inspect(s);
  for(const m of inv.math) katex.renderToString(m.tex,{throwOnError:true,displayMode:m.display,strict:"error"});
  for(const l of inv.links){
   if(/^[a-z]+:/i.test(l))continue;
   const dest=decodeURIComponent(l.split(/[?#]/)[0]);
   if(dest)assert.ok(fs.existsSync(path.resolve(path.dirname(file),dest)),file+": missing "+l);
  }
  assert.ok(!/[ \t]+$/m.test(s),file+": trailing whitespace");
  console.log(JSON.stringify({file,headings:inv.headings.length,links:inv.links.length,math:inv.math.length,displays:inv.equations.length}));
 }
}
```

### Reproduction: logical and arithmetic witnesses

Run this block with node --input-type=module from the repository root. The known controls precede the witnesses.

```javascript
import assert from "node:assert/strict";
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12, a+" != "+b);
const mean=a=>a.reduce((s,x)=>s+x,0)/a.length;
const variance=a=>mean(a.map(x=>(x-mean(a))**2));
const lorentzRate=beta=>Math.sqrt(1-beta**2);
near(mean([1,3]),2); near(variance([1,3]),1); near(lorentzRate(0),1);
assert.throws(()=>near(1,2));
console.log("KNOWN PASS: exact mean 2, variance 1, zero-speed rate 1; unequal values rejected.");
const cf=1;
const candidates=[0,1],passes=x=>x===1;
assert.equal([0].some(passes),false); assert.equal(candidates.some(passes),true);
assert.notEqual(null,false);
const positive=x=>x>0;
assert.equal(positive(1),true); assert.equal(positive(-1),false);
assert.equal((()=>false)(1),false);
const f=x=>0; assert.equal(f(1),0); assert.notEqual(f(1),1);
near(mean([-1,1]),mean([-2,2])); near(variance([-1,1]),1); near(variance([-2,2]),4);
const uncertainty=.1,bound=.01,residual=.005;
assert.ok(Math.abs(residual)<bound); assert.ok(Math.abs(residual)+uncertainty>bound);
const nu=5,ref=2,scale=3; near(scale*nu/(scale*ref),nu/ref);
const ceff=.8,v=.48,beta=v/ceff;
near(beta,.6); near(lorentzRate(beta),.8); near(1/lorentzRate(beta),1.25);
assert.ok(Math.abs(lorentzRate(v/cf)-lorentzRate(beta))>.07);
const response=(p,state)=>p*state;
near(response(2,1),2); near(response(2,2),4); assert.notEqual(response(2,2),response(3,2));
console.log("WITNESS PASS: finite rejection, missing/false distinction, positive and nonzero controls, unequal-variance null means, unresolved uncertainty, reference-ratio cancellation, channel-qualified Lorentz rate, fixed-law state variation.");
```

## Remaining obligations

| ID | Status | Required evidence and falsifier |
| --- | --- | --- |
| VP-O1 | Open | Physical assembly existence, persistence, and the applicable EOM solver acceptance are upstream obligations. Supply the independently accepted delayed-history evolution and branch-specific evidence before interpreting an apparatus simulation as a physical realization. A failed balance, continuation, history, or stability condition refutes its corresponding claim. |
| VP-O2 | Open | One constitutive and observer map must jointly recover clock, ruler, photon, and apparatus responses over the declared matched preparations. A resolved excess residual or a required independent parameter split refutes that proposed recovery. |
| VP-O3 | Open | The CMB radiation frame needs an independently specified source/transport/observer relation to Noether sea flow, including scale and uncertainty, before it serves as a measured sea-rest proxy. Incompatible mapped dipoles or a required per-observable sea state refute that relation. |
| VP-O4 | Open | A hydrogen/reference-channel measurement source, nuisance model, sensitivity, and prediction must be supplied before evaluating the proposed atomic test. Generic bounds in neighboring constraint/failure chapters require their own source-specific assessment; this review neither certifies nor edits those chapters. |
| VP-O5 | Open | Statistical and numerical controls must demonstrate detection power and tolerance resolution in each eventual protocol. A zero-producing or always-rejecting instrument, unresolved error interval, or estimator that omits the predicted difference cannot establish the claimed null bound. |

The coordinator can integrate this bounded receipt after verifying the final chapter hash and the other workers' results. These open scientific obligations do not prevent completion of the authorized textual repairs.
