# CRW-005-15 — Self-interaction switch review and bounded repair

Date: 2026-09-12. Assignment: the complete [Self-interaction switch chapter](../../../../content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md), with exclusive write authority for that chapter and this report. The review identifies three demonstrated defects, SIS-1–SIS-3, and implements their bounded repairs. Scale selection is retained as an open obligation, not misclassified as a claimed stability theorem. Final validation is recorded below.

## Scope and Source Evidence

The live startup router selected the [corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md); the explicit assignment additionally authorized implementation. The [CRW-005 procedure](../work-queue.md#crw-005--independent-post-conversion-assurance-review), current [document board](../corpus-review-status.md), and the operator's item-15 assignment set the scope. Shared HQ records remain outside this worker's write authority. The review uses academic style edition 1.1 and the live mathematics, terminology, and source policies; the historical edition-1.0 conversion is provenance, not current correctness evidence.

Measured by `nl -ba`, the input chapter has 22 lines; a full read and `git diff 897fe1aa7 -- content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md` covered the chapter and its changes from the pre-conversion baseline. The initial scoped `git --no-optional-locks status --short` produced no entries for either assigned path; the evidence report was absent. The following source identities were measured by `shasum -a 256`; the historical source used `git show 897fe1aa7:content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md | shasum -a 256`.

| Source snapshot | SHA-256 |
| --- | --- |
| Input chapter | `44613000fa9d36ff4f3ebbf5a9fd542bf6ddf80f55edd8f55f3c8138be2d9e2b` |
| Chapter at pre-conversion baseline `897fe1aa7` | `a517c7efa4d40a31b4f7df0b2893c0a9c4bf21684451bd63067286657f80d9f7` |
| Master Equation | `bb7357868a4f900aa566b8a43107d111dcd435cab677361f9bba3dceaadb384b` |
| Binary Dynamics | `0e22955268c871d1756e15a298b2c054e1f525c6a8d3f9d2764b83977d066d2d` |
| Causal Set and Delay Geometry | `a8f8afda3c4b744d8e5b894773eca75d377d8b551beead1b6cfac2685109583f` |
| Self-Energy and Regularization | `bd669ef58444026ba518fcbfd0c77513ae1624c2f9f2588c97d097380a5e6592` |

`git rev-parse HEAD` measured `88568b42ff84cc04149cabab325c8056aac39939` during review. This identifies a checkout snapshot; it does not attribute any defect to that commit. Original line references below refer to the input hash, and repaired line references refer to the output chapter identified in the final receipt. A source change or failed witness substitution reopens the affected review claim.

The relevant live authorities are:

| Authority and reviewed location | Role in the review |
| --- | --- |
| [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), lines 3–29 | Pointlike polarity carrier, continuously emitted wake, absence of primitive physical mass |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-regime), lines 1216–1254 | Root nomination, interval-speed lemma, regular branch admission |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#conventions-and-exclusions), lines 1514–1536 | Strict-delay domain, impossible positive-delay coincidence, unresolved singular transition |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-condition), lines 2667–2684 | Straight variable-speed self-root and its prescribed-path limitation |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation), lines 85–160 | Emission-centered direction, transmitter derivative, acceleration weight, receiver playback distinction |
| [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#circular-self-hit-sign-theorem-and-complete-ledger-measurement), lines 1363–1389 | Exact outward circular self projection |
| [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#emergent-properties-and-measurement-standards), lines 1077–1083, and [Mathematics Terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), line 100 | Conditional meanings of minimum radius and period |
| [Causal Set and Delay Geometry](../../../../content/markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md) and [Self-Energy and Regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/self-energy.md#strict-delay-and-the-self-endpoint) | History-window scope, speed necessity versus sufficiency, singular and regularization limits |

The pre-conversion diff preserves the same root equation, repulsive-character sentence, coincident-candidate wording, and conditional scale paragraph. It is not evidence that those inherited statements were correct. The review does not assign first introduction or author causality. No external measurement, historical attribution, or imported physical theorem is needed for the repairs: the support consists of the declared root equation, the canonical acceleration law, and the explicit algebra below.

## Findings and Dispositions

Legend: ✓ Done means the assigned document repair is implemented and checked; ○ Open identifies a remaining scientific obligation rather than an unfinished accepted repair.

| Finding | Severity and category | Input lines | Repaired lines | Disposition |
| --- | --- | --- | --- | --- |
| SIS-1 | Medium; intersection/admission conflation and missing local definitions | 3, 8–16 | 3, 9–37 | ✓ Done — distinguish kinematic roots, simple-root admission, history coverage, and singular-event status; define the actual derivative and weight |
| SIS-2 | Medium; impossible sharp-root case and endpoint scope | 16 | 39–41 | ✓ Done — derive positive separation from strict delay; preserve endpoint exclusion without claiming a finite transition |
| SIS-3 | High; directional scope overreach | 3, 19 | 43–49 | ✓ Done — define outward relative to emission position, derive the circle-specific projection, and retain scale selection as conditional |

### SIS-1 — Geometry Does Not Depend on a Transversality Floor

The input says that curvature, branch geometry, and the transversality floor determine whether the worldline actually intersects its wake. The root equality determines an intersection. A positive derivative margin instead determines whether the ordinary simple-root reduction can be used with controlled weight. A tangency can therefore be a real geometric root while failing regular-branch admission. The input also invokes a Jacobian and a retained weight without defining either or linking the applicable admission conditions.

For a direct witness, take a unit vector $\mathbf e$, normalized wake speed $c_f=1$, reception time $T_r=0$, and the prescribed smooth history $\mathbf X_a(s)=s^2(s+2)\mathbf e$ on $[-3/2,0]$. On this interval the position coefficient is nonnegative, so the root function is

$$
F(s;0)=\|\mathbf X_a(0)-\mathbf X_a(s)\|+s
=s^2(s+2)+s=s(s+1)^2
$$

At the interior emission time $s=-1$, separation and delay are both one. Yet $\partial_sF(-1;0)=0$ and $\partial_s^2F(-1;0)=-2$. Thus a positive-delay isolated tangency exists without a nonzero transmitter derivative. The weight $W^{\mathrm{acc}}=1/|D_t|$ is undefined there. Assigning an ordinary finite acceleration or silently treating that event as no self-hit would both exceed the witness.

For the corrected speed statement, assume a $C^1$ path and speed at most $c_f$ on the entire emission-to-reception interval. At a self-root,

$$
c_f\Delta
=\left\|\int_{T_t}^{T_r}\mathbf V_a(s)\,ds\right\|
\le\int_{T_t}^{T_r}\|\mathbf V_a(s)\|\,ds
\le c_f\Delta
$$

Here $\Delta=T_r-T_t>0$ and $\mathbf V_a=d\mathbf X_a/dT$. Equality forces $\mathbf V_a(s)=c_f\hat{\mathbf r}$ throughout the interval: every velocity has the chord direction and maximum permitted magnitude. Consequently every intermediate emission is also a root and $D_t=0$. A simple self-root therefore requires a strict speed excursion above $c_f$ somewhere in that interval. The constant history $\mathbf X_a(s)=-2s\mathbf e$, evaluated at $T_r=0$ with $c_f=1$, instead gives $F(s;0)=-s>0$ for every $s<0$, proving that exceeding the wake speed is insufficient. The regular witness under SIS-3 shows that spatial curvature and current super-field speed are unnecessary.

Claim grade: derived for the polynomial witnesses, interval argument, and distinction between intersection and regular admission; measured for comparison of the input wording with the cited live definitions. The smallest complete repair defines $F$, $D_t$, $W^{\mathrm{acc}}$, and the retained-history domain; it preserves the root equation and separates singular handling from an empty root set. Falsifier: a failed polynomial identity or derivative substitution, a $C^1$ simple self-root whose whole intervening speed remains at most $c_f$, or a resolving definition in the input that already distinguishes geometric existence from the numerical floor.

### SIS-2 — Positive Delay Excludes Sharp-Root Coincidence

The input discusses a coincident delayed candidate as though it could satisfy the displayed sharp root equation but lack a unit direction. Directly, $r=c_f\Delta$ with $c_f>0$ and $\Delta>0$ gives $r>0$. At $r=0$, the equation forces $\Delta=0$, outside the declared set. A history point at the same position but positive delay is not a sharp root.

The repaired paragraph retains $H(0)=0$ as the endpoint convention and states its precise limit. Excluding the instantaneous diagonal does not control a limiting sequence with $r,\Delta\to0^+$, and it supplies no finite event continuation. Finite-width evaluation may sample off-root points and requires its separate domain and regularization treatment. This preserves, rather than resolves, the singular-event obligation.

Claim grade: derived from the exact root equality; measured for agreement with Master Equation lines 1514–1536. Falsifier: a positive-delay, zero-separation solution of the stated equation with $c_f>0$, or evidence that the input sentence was explicitly restricted to off-root finite-width evaluation. The input provides no such restriction. The smallest repair removes that impossible sharp-root case and names the unresolved limit.

### SIS-3 — Repulsion Is Relative to the Emission Position

The input's general self-sign sentence says that $+\hat{\mathbf r}$ opposes collapse, while the opening correctly limits a related radial-projection statement to a uniform circle. The direction in the Master Equation is $\hat{\mathbf r}=(\mathbf X_a(T_r)-\mathbf X_a(T_t))/r$: away from the earlier emission position. An assembly-center radial projection is a different geometric quantity.

For a smooth straight-path counterexample, take $c_f=1$, $T_r=0$, unit vector $\mathbf e$, and

$$
\mathbf X_a(s)=\left(1-\frac{s}{2}+\frac{s^2}{2}\right)\mathbf e,
\qquad -\frac32\le s\le0
$$

The velocity is $(-1/2+s)\mathbf e$, which never vanishes on this interval, so the spatial curve is regular and straight. The root function is $F(s;0)=s(s+1)/2$. Its only negative-time root on the declared interval is the interior point $s=-1$; the other polynomial root, zero, is the excluded endpoint. At that root,

$$
r=\Delta=1,\qquad
\hat{\mathbf r}=-\mathbf e,\qquad
\mathbf V_a(-1)=-\frac32\mathbf e,\qquad
\mathbf V_a(0)=-\frac12\mathbf e,\qquad
D_t=-\frac12,\qquad W^{\mathrm{acc}}=2
$$

The canonical self contribution is therefore $-2\kappa q_a^2\mathbf e$. It points toward the chosen origin from the reception position $\mathbf e$ and away from the emission position $2\mathbf e$. Its dot product with the current velocity is $\kappa q_a^2>0$: the self term reinforces that prescribed inward motion rather than opposing it. This is a counterexample to inferring a center-directed sign from self polarity alone. It is not asserted to solve the full EOM; in fact its prescribed acceleration is $+\mathbf e$, so self acceleration alone does not realize the history.

For the fixed-center circle, take reception position $R\mathbf e_r$ relative to its center and an emission point at angular separation $\theta$. The chord gives $r=2R|\sin(\theta/2)|$ and radial numerator $R(1-\cos\theta)$. Hence

$$
\hat{\mathbf r}\cdot\mathbf e_r
=\frac{R(1-\cos\theta)}{2R|\sin(\theta/2)|}
=|\sin(\theta/2)|>0
$$

The strict inequality holds at noncoincident roots. This retains the original chapter's valid circle result and shows why it cannot be extended to arbitrary histories. The smallest safe repair specifies the emission-centered direction and supplies the circle projection before discussing possible scale selection.

Claim grade: derived for the counterexample and circle identity, conditional on the postulated canonical acceleration law. Falsifier: failure of the listed root, velocity, derivative, weight, or projection substitutions; alternatively, a canonical restriction explicitly excluding the counterexample geometry from the input's unqualified sign claim. A counterexample to dynamical realization would not falsify this geometric scope argument because realization is not its premise.

## Retained Claims, Clarifications, and Open Obligations

The displayed causal set and its existing viewer identifier `corpus-equation-5c21f41edba4512c` are preserved. Strict super-field-speed history necessity, insufficiency of speed alone, same-polarity repulsion, and the outward uniform-circle projection are retained. The repair does not import an energy law, primitive mass, magnetic response, or relativistic substrate into the reasoning.

The input's final scale paragraph was already conditional: “can participate” and “additionally requires” do not assert a certified stable structure. Its disposition is retained with a definition clarification, not a fourth demonstrated scientific error. The revision calls $2\pi/P_0$ an angular frequency, distinguishes cycle frequency $1/P_0$, and explains that the proposed orbital radius is measured from a declared center. A minimum or fastest-branch statement additionally needs a specified comparison family. These clarifications do not supply a new radius, period, or extremality theorem.

| Obligation | Status and resolution route | Checkable failure or reopening condition |
| --- | --- | --- |
| SIS-O1: singular self-root continuation | ○ Open — the existing Master Equation event/regularization treatment must supply accepted finite transitions and the applicable history accounts | A divergent or regulator-dependent transition, unresolved root census, or failed endpoint account rejects that proposed continuation |
| SIS-O2: complete dynamical realization | ○ Open — the EOM solver's existing acceptance procedure must establish a complete retained-history acceleration record, omitted-history control, and evolution of an actual candidate | Nonzero acceleration residual, a missed causal root, an uncontrolled history tail, or failed refinement rejects the candidate; prescribed witness geometry is insufficient |
| SIS-O3: stable scales and extrema | ○ Open — Binary Dynamics owns full balance, periodic history return, perturbation stability, and conditional radius/period outputs; extrema require a declared admissible comparison family | Failure of balance or return invalidates the candidate; a permitted smaller stable radius or faster stable period refutes the corresponding claimed extremum |

These are pre-existing scientific proof burdens made explicit in the assigned chapter. The bounded repair does not certify conservation, stability, solver acceptance, empirical recovery, or particle identification. The report does not create a new upstream program or change an HQ status row.

## Validation and Independence

The worker performed the edit and full-document self-review. A read-only subagent, assignment label `crw-005-15 geometry review` and stable task ID `/root/self_hit_geometry_audit`, separately derived the tangency witness, regular straight-path counterexample, speed argument, and circle projection. Agreement between agents is not the independent mathematical reference: the displayed algebra, Euclidean norm identities, and unchanged canonical per-hit law provide that reference. No software implementation or oracle was edited.

Before numerical substitution on the target examples, the in-session Node root evaluator passed the known stationary-source case: receiver at the origin, source at distance two, zero source velocity, delay two, and $c_f=1$ returned $r=2$, $F=0$, $D_t=1$, and $W^{\mathrm{acc}}=1$. Only then was it run on the prescribed self geometry and circle. Before use on document mathematics, vendored KaTeX 0.16.11 rendered known-valid `x^2` and rejected an undefined control sequence. The final focused checker and its known-case results are recorded below.

The pre-edit `node scripts/validate-content.mjs --check --strict` completed with exit 0, zero errors, zero warnings, and 30 informational notes; it audited 199 corpus Markdown files and 1,639 repository Markdown files. This is a measured document-integrity baseline, not theory validation. Final scoped and repository-wide results follow after the completed checks.

### Final Receipt

The bounded document repair is complete for SIS-1–SIS-3. Output chapter SHA-256 by `shasum -a 256`: `5d8784569f8ab3d46f923157d8da41e0ef20c4dd6e45e9a1c11ecaed0dea81ff`. The output is 51 lines by `nl -ba`. The original root equation and viewer identifier remain; the new per-hit acceleration display defines the previously unspecified weight.

| Check | Measured result and limit |
| --- | --- |
| Known-case-first focused Node checker below | Exit 0: chapter 50 math expressions, including two displays; eight local links and seven anchors. Report 64 math expressions, including five displays; 14 local links and eight anchors. KaTeX uses `throwOnError: true` and `strict: error`. File existence, Markdown headings, and the existing viewer ID are checked; this is not browser visual QA or generated-viewer freshness certification. |
| Geometric substitution checks below | Exit 0: the regular straight self-root gives range/delay 1, derivative −0.5, weight 2, and direction toward the chosen origin; the isolated tangency gives range/delay 1 and derivative zero; the diameter-circle case gives range/delay 2, derivative 1, weight 1, and outward projection. Sampled polynomial and trigonometric substitutions agree with the independent symbolic arguments above. |
| Scoped `git diff --check` | Exit 0 with no diagnostics for the assigned paths. The untracked report is additionally checked with `git diff --no-index --check /dev/null` against its explicit path: no whitespace diagnostics, exit 1 because the new file differs from `/dev/null`. |
| Original-equation preservation probe | Exit 0: after a known case in which a prefix moves link offsets but preserves equation/link text, the existing `parseCorpusDisplayEquations` parser confirms the original TeX, viewer-link text, target, and identifier match `HEAD`. There is exactly one additional display. |
| `node scripts/validate-content.mjs --check --strict` | Post-edit exit 0, zero errors, zero warnings, 30 informational notes. This verifies its declared content/index/link rules, not physical correctness. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1: `corpus-equation-cd180315de09143c: missing canonical source link`; `generated registry is stale: content/generated/equation-mapping/corpus-equations.json`. The chapter's added display requires its generated viewer link, and the rewritten source context requires regeneration. The existing viewer link resolves. This is recorded generated drift, not a passed gate. |

The first focused-checker attempt incorrectly collapsed adjacent spaces in a Markdown heading slug, rejecting the valid CRW-005 procedure link. The next attempt distinguished JavaScript positive and negative zero in an exact polynomial substitution. These were instrument defects, not corpus defects: the final checker adds known cases for an em-dash heading and real-zero equality before running on its targets. A supplemental preservation probe initially compared changing source offsets as well as link content; its corrected known case establishes that offsets may move while the TeX and link remain unchanged. No chapter, canonical authority, or mathematical reference was changed to make those cases pass.

The required regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`. It was not run. Other generated consumers, such as reading copies and the source index, were not exhaustively tested for freshness. The scoped binding search with `rg -l -F self-interaction-switch` under `scripts/config` and `content/graph` found the textbook TOC and scene graph; the source was also inspected directly in the existing equation registry. This is a bounded consumer inventory, not an assertion of no other binders.

Only the assigned chapter and this evidence report were authored by this worker. No HQ record, unrelated chapter, software source, generated artifact, or Git publication state was changed. HQ can integrate this receipt as a bounded disposition; SIS-O1–SIS-O3 remain open and no scientific acceptance score is increased.

### Reproducible Focused Check

Run from the repository root. This command writes no files and fixes wake speed at one in its geometric evaluator. The small Markdown extractor is limited to the dollar math, ordinary inline links, ASCII heading slugs, and fenced/inline code syntax used by these two documents; the known cases precede all target reads.

```bash
node <<'NODE'
const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm'), assert=require('node:assert/strict');
const context={}; vm.runInNewContext(fs.readFileSync('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js','utf8'),context);
const katex=context.katex;
function clean(s){ let fence=null; return s.split('\n').map(line=>{const m=line.match(/^\s*(\x60{3,}|~{3,})/);if(m){if(!fence)fence=m[1][0];else if(fence===m[1][0])fence=null;return '';}return fence?'':line.replace(/\x60+[^\x60]*\x60+/g,'');}).join('\n');}
function expressions(s){const text=clean(s), re=/\$\$([\s\S]*?)\$\$|\$([^\n$]+)\$/g, out=[...text.matchAll(re)].map(m=>({tex:m[1]??m[2],display:m[1]!==undefined}));assert(!text.replace(re,'').includes('$'),'unmatched math delimiter');return out;}
function links(s){return [...clean(s).matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(m=>m[1]);}
function slug(s){return s.toLowerCase().replace(/[^\w\s-]/g,'').replace(/\s/g,'-');}
function headings(s){return new Set([...s.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>slug(m[1])));}
const fixture='Math $x$ and $$y^2$$.\n[real](AGENTS.md)\n\x60$ignored$\x60\n\x60\x60\x60\n$ignored$ [fake](missing)\n\x60\x60\x60';
assert.equal(expressions(fixture).length,2);assert.deepEqual(links(fixture),['AGENTS.md']);assert(headings('# Header One\n').has('header-one'));
assert.equal(slug('A — B'),'a--b');assert.throws(()=>expressions('$unclosed'));assert(fs.existsSync('AGENTS.md'));assert(!fs.existsSync('crw005_15_known_missing_sentinel.md'));
katex.renderToString('x^2',{throwOnError:true});assert.throws(()=>katex.renderToString('\\unknowncommand',{throwOnError:true}));
console.log('KNOWN CASE PASS: math and link extraction excludes inline/fenced code; unmatched math rejected; known heading and present/absent files resolved; valid/invalid KaTeX handled.');
const targets=['content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md','reference/priorities/aaa-corpus-rewrite/evidence/crw-005-self-interaction-switch-review-2026-09-12.md'];
const registry=JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8'));
for(const target of targets){const s=fs.readFileSync(target,'utf8'), ex=expressions(s), ls=links(s);let anchors=0;
 for(const e of ex)katex.renderToString(e.tex,{displayMode:e.display,throwOnError:true,strict:'error'});
 for(const l of ls){if(/^[a-z]+:/i.test(l))throw Error('unexpected remote link '+l);const [relative,anchor]=l.split('#');const resolved=relative?path.resolve(path.dirname(target),relative):path.resolve(target);assert(fs.statSync(resolved).isFile(),l);
 if(anchor){anchors++;if(resolved.endsWith('.md'))assert(headings(fs.readFileSync(resolved,'utf8')).has(anchor),'missing heading '+l);else if(resolved.endsWith('equation-mapping.html'))assert(registry.records.some(r=>r.id===anchor),'missing viewer ID '+l);else throw Error('unhandled anchor '+l);}}
 console.log(JSON.stringify({target,math:ex.length,display:ex.filter(e=>e.display).length,links:ls.length,anchors,status:'PASS'}));}
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
function rootRecord(receiver,emission,velocity,delay){const d=receiver.map((x,i)=>x-emission[i]),r=Math.hypot(...d),n=d.map(x=>x/r),D=1-dot(n,velocity);return {r,F:r-delay,n,D,W:D===0?null:1/Math.abs(D)};}
assert.deepEqual(rootRecord([0,0,0],[2,0,0],[0,0,0],2),{r:2,F:0,n:[-1,0,0],D:1,W:1});
assert(0===-0);console.log('KNOWN CASE PASS: stationary transmitter, c_f=1, r=delay=2, F=0, D_t=W=1; signed zeros compare as real zeros.');
const inward=rootRecord([1,0,0],[2,0,0],[-1.5,0,0],1);assert.deepEqual(inward,{r:1,F:0,n:[-1,0,0],D:-.5,W:2});
const tangent=rootRecord([0,0,0],[1,0,0],[-1,0,0],1);assert.equal(tangent.F,0);assert.equal(tangent.D,0);assert.equal(tangent.W,null);
const circle=rootRecord([1,0,0],[-1,0,0],[0,-Math.PI/2,0],2);assert.equal(circle.F,0);assert.equal(circle.D,1);assert.equal(circle.n[0],1);
for(const s of [-1.5,-1,-.5,-.25]){const f1=(1-s/2+s*s/2)-1+s, f2=s*s*(s+2)+s;assert(f1===s*(s+1)/2);assert(f2===s*(s+1)**2);assert.equal(2*(-s)+s,-s);}
for(const theta of [.2,Math.PI/2,Math.PI,3*Math.PI/2,2*Math.PI+.2]){assert(Math.abs((1-Math.cos(theta))/(2*Math.abs(Math.sin(theta/2)))-Math.abs(Math.sin(theta/2)))<1e-12);}
console.log('TARGET PASS: regular straight self-root '+JSON.stringify(inward));
console.log('TARGET PASS: isolated tangency '+JSON.stringify(tangent));
console.log('TARGET PASS: diameter circle '+JSON.stringify(circle));
console.log('TARGET PASS: exact polynomial witnesses, no-root formula, and circular identity agree with sampled substitution; proofs in report establish the interval-wide results.');
NODE
```
