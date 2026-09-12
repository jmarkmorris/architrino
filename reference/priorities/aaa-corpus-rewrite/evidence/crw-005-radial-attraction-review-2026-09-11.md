# CRW-005 Radial Attraction Review and Repair — 2026-09-11

## Scope and source identity

This report records the complete bounded assurance review and authorized repair of [Radial Attraction](../../../../content/markdown/aaa/validation/simulations/action-energy/radial-attraction.md), CRW-005 item 11. The operator authorized immediate safe repairs in that chapter and this report. Shared status boards, priority and queue records, other chapters, generated files, and Git publication remain outside this implementation's write authority. HQ owns shared-record integration.

The initial chapter had 42 lines by `wc -l` and SHA-256 `a71e3c9d01d4d25f04f70b1b6091a41e60554ea459428d00488bb7ab38cc1f60` by `shasum -a 256`; repository HEAD was `4a8e760bae44dbc868714e579ba60779ae0be9d2` by `git rev-parse HEAD`. Before editing, scoped `git --no-optional-locks status --short -- <chapter> <report>` and `git diff -- <chapter> <report>` returned no entries or changes; `test ! -e <report>` confirmed that this report destination was absent. Finding locations below refer to that 42-line source, not the revised line numbers.

The conversion comparison used `git show --format= c973402b96d50e45b9bdac0da2bd680e6c26116f -- <chapter>` and the complete preceding chapter at `c973402b^:<chapter>`, whose SHA-256 was `d73137cce210acc54788f389ed56a06ff3ccfd865d0c58d2438e825a78a83b78` by `git show ... | shasum -a 256`. The inspected diff changes headings, moves the opening explanation, and preserves the two displayed equations and their mapping IDs. The pre-conversion source already contains the mathematical scope omissions below; this is diff-based attribution for this chapter only. The assurance comparison preserves the edition-1.0 mathematical and claim-boundary obligations while applying the live edition-1.1 exposition standard.

## Live authorities and coverage

The review followed `AGENTS.md`, the generated startup router's Corpus Review card, the [maintained review skill](../../../op/skills/skill-architrino-review.md), the [corpus-reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), and the maintained [CRW-005 owner](../work-queue.md#crw-005--independent-post-conversion-assurance-review). The explicit operator implementation instruction supersedes the procedure's default report-only boundary for these two files. The review used the [academic](../../../../content/markdown/aaa/archie/academic-style-guide.md) and [mathematical](../../../../content/markdown/aaa/archie/mathematics-style-guide.md) style authorities and task-relevant terminology. Original calculations require their stated derivation rather than ornamental external citations under [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution); no external scientific law, measurement, or historical attribution is used as a premise.

Direct scientific owners were the [Master Equation's branch sum and playback definitions](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation), its retained-root existence example and [self-hit regime](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-regime), its [self-hit geometry](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-condition) and [energy-account limits](../../../../content/markdown/aaa/dynamics/master-equation.md#energy-symmetry-and-conservation), the polarity ontology in [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), the neighboring [Attraction](../../../../content/markdown/aaa/validation/simulations/action-energy/attraction.md) comparison, and [Numerical recipe and stability](../../../../content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md). A neighboring recipe does not override the master law's complete-root, positive-separation, or stability obligations.

Every section of the original chapter was read. The assessment checked fixed radial geometry, both coordinate signs, unlike-polarity attraction, transmitter and receiver derivatives, history coverage, self-hit omissions, the center endpoint, reflection symmetry, conserved-scalar versus physical-energy claims, stability, source support, equation preservation, and executable comparison values. This is author self-review with a read-only mathematical audit by `/root/radial_math_audit`; agent agreement is not mathematical independence. The explicit counterexample and independently differentiated trajectory below supply separately checkable references. No EOM solver evolution or empirical test was run.

## Findings and exact dispositions

Six findings are dispositioned: three demonstrated domain omissions, one energy-language clarification, and two explanatory/validation improvements. All six are accepted and implemented under the operator's repair authorization; none is rejected, deferred, or left unapplied. Scientific obligations are listed separately and are not counted as repaired theory.

| ID | Severity and kind | Initial location | Demonstration and implemented disposition | Grade and reopening condition |
| --- | --- | --- | --- | --- |
| RA-1 | High; demonstrated contribution/total-domain omission | Lines 3, 6, 18–30, 35 | A stationary transmitter contributes the displayed inverse-square term, but the master law sums all transmitters and admitted self-hits. The prose also lacked an explicit prescribed-source boundary. The chapter now identifies the single-source comparison, distinguishes it from an isolated mutual pair, and requires absence of additional admitted contributions before equating it with total acceleration. | Derived from the canonical sum and the self-hit witness below. Reopen if a claimed full-law trajectory includes an omitted admitted contribution, or if an explicit complete balance is supplied that removes the restriction. |
| RA-2 | Medium; demonstrated retained-root domain omission | Lines 8, 15 | The stationary root is uniquely $T_t=T-r$, but uniqueness does not establish that the retained history contains it. The chapter now defines the root function and requires $T-r\in I_c$, where $I_c$ is the supplied transmitter history. Missing coverage is not interpreted as zero full-history acceleration. | Derived by solving the affine root function. Reopen on an uncovered required emission or a second root for an actually stationary complete source history. |
| RA-3 | Medium; demonstrated radial/endpoint domain omission | Lines 15, 23–35 | Differentiating an absolute distance gives the radial ODE on a fixed-sign interval with $r>0$, not through the origin. A transverse initial velocity requires changing-direction kinematics. The chapter now declares the line, coordinate, inward sign, initial data, positive-separation domain, and excluded coincident endpoint; it states that endpoint exclusion supplies no finite continuation. | Derived by differentiation and the singular limit. Reopen if the reduction is applied through $X=X_c$, to transverse motion, or beyond an earlier additional-hit event without a new argument. |
| RA-4 | Medium; energy-language clarification | Lines 12, 36, 39 | “Instantaneous power” did not identify an energy normalization. The existing denial of conserved Master-Equation energy was correct and is preserved. The chapter now names $d(V_r^2/2)/dT$ as a kinetic-scalar rate and distinguishes it from physical power or a full energy account. | Derived chain-rule identity; no physical energy identification is inferred. Reopen if an unproved physical-energy interpretation is attached to the scalar. |
| RA-5 | Medium; explanatory completion | Lines 10–12, 34–36 | The objectives promised energy balance and integral expressions, but neither was supplied. The chapter now derives the reduced first integral, inward velocity, quadrature, rest-release closed form, and one normalized exact value. The first integral is derived from acceleration, without importing a force law or standard potential. | Derived by chain rule, separation of variables, and independent parametric differentiation below. Reopen if the quadrature, initial value, derivative, or stated domain fails. |
| RA-6 | Low; validation and claim-boundary improvement | Lines 38–42 and whole chapter | The validation instruction had no numerical expected values or falsifier. The chapter now supplies stationary-source root, acceleration, playback, and reflection expectations, and an explicit claim-grade/falsifier block. It also derives absence of finite-radius static equilibrium and explicitly excludes stability, collision-avoidance, solver-certification, and empirical conclusions. | Derived event-level expectations; tests are bounded by named inputs. Reopen if the prescribed-event values fail or a comparison result is promoted beyond its declared authority. |

The original inward sign, $W^{\mathrm{acc}}=1$, and $D_r=1-V_r$ were correct; they were not sign errors and were not replaced. No external-source defect was demonstrated. The two existing display equations and mapping identifiers are preserved.

## Mathematical witnesses

### A fixed-source term need not be the total acceleration

Set $c_f=\kappa=|q|=|q'|=1$, $q=-q'$, $X_c=0$, and reception time $T=0$. Prescribe the receiver history $X(s)=2-2s-s^2$ on $[-3/2,0]$, with $s$ an absolute emission-time variable. At $s=-1$, the receiver's past position is $3$, its present position is $2$, and its past velocity is zero. The same-transmitter delayed separation has direction $-1$, distance $1$, and delay $1$. Its transmitter derivative is $D_t=1$; with the same polarity at both ends, its acceleration contribution is $-1$. The fixed source contributes $-1/4$. Thus the total of these admitted contributions is $-5/4$, contradicting an unconditional identification with the fixed-source term alone.

On this supplied receiver interval, the signed displacement from the present point to the past point is $2s+s^2<0$ for $s<0$. The self-root function is therefore $g(s)=-s-s^2$, whose only roots on the interval are the strict-past root $-1$ and the excluded endpoint $0$; $g'(-1)=1$. This is an exact prescribed-history witness, not a trajectory generated by the full law. Its role is to test the omitted-history assumption, not to establish physical realization.

### Root coverage and reflection

At $T=0$, $X_c=0$, $X=2$, and $c_f=1$, the source-root function is $g(s)=2+s$. Its full-history root is $s=-2$, so a retained interval $[-1,-1/10]$ contains no root despite the unique full-history hit. At $K=1$, the source contribution is $-1/4$, independently of receiver velocity. Reflection $X\mapsto-X$ reverses coordinate acceleration and coordinate velocity, while $r$, $V_r$, and radial acceleration are unchanged. This is a symmetry of the fixed-source comparison; it establishes neither equal-time action/reaction for a delayed pair nor momentum conservation.

### Independently differentiated rest-release trajectory

Define $C=\sqrt{r_0^3/(2K)}$, with $r_0>0$ and $K>0$, and use a dimensionless parameter $0\le\theta<\pi/2$:

$$
r=r_0\cos^2\theta,\qquad T-T_0=C(\theta+\sin\theta\cos\theta).
$$

Differentiating gives $dT/d\theta=2C\cos^2\theta>0$, so the parameter defines a unique increasing time. Dividing $dr/d\theta$ by this derivative gives $V_r=-\sqrt{2K/r_0}\tan\theta$. Differentiating once more gives $\ddot r=-K/(r_0^2\cos^4\theta)=-K/r^2$. The initial velocity is zero and $V_r^2/2-K/r=-K/r_0$. This checks the trajectory directly against the acceleration equation independently of deriving it by its first integral.

At $c_f=K=1$, $r_0=2$, and $\theta=\pi/4$, the exact values are $r=1$, $V_r=-1$, $\ddot r=-1$, and $T-T_0=\pi/2+1$. The endpoint $\theta\uparrow\pi/2$ gives $T-T_0=\pi$, $r\downarrow0$, and unbounded speed. That finite singular endpoint is a property of the fixed-source ODE. It is not a full-law collision prediction: an earlier additional/self-hit event invalidates the reduction, and the endpoint has no supplied continuation.

## Open scientific obligations

| Obligation | Current boundary and existing owner | Evidence required to change the disposition |
| --- | --- | --- |
| Full-history equality with the reduced ODE | Conditional on history coverage and no additional admitted contributions; Master Equation root/self-hit owners above | A complete root inventory on the claimed interval. An omitted hit or uncovered emission falsifies equality with the reduced total acceleration. |
| Realization of the stationary source or a mutually evolving pair | The source is prescribed boundary data; Attraction owns the mutual comparison | A complete acceleration balance that generates the proposed source/pair history. A nonzero residual at either participant rejects that candidate history. |
| Collision avoidance and singular continuation | The sharp reduced equation ends at positive-separation failure; Master Equation singular-event rules control any extension | A separately specified, finite, consistent event law and its root/account treatment. Deleting the coincident root alone does not supply this evidence. |
| Physical energy and conservation | The reduced scalar is a mathematical first integral; Master Equation energy and action owners remain separate | An independently derived full energy account including the source, other/self histories, and boundary exchanges. Constancy of a scalar built from the same ODE does not establish that account. |
| Stability, binding, and physical realization | No finite-radius static equilibrium exists in this radial reduction; a complete moving candidate requires its own balance and stability analysis | A balanced trajectory with a full history followed by the appropriate perturbation/return analysis. A nonzero acceleration residual or loss of the declared domain prevents a stability verdict. |

These obligations remain open. Item completion records review, safe repair, and explicit disposition; it does not claim theory closure, solver certification, or empirical acceptance.

## Validation working record

Before target execution, the in-session Node check passed its known cases: the existing `renderMarkdownWithMath` runtime and vendored KaTeX recognized exactly two math spans while excluding code spans/fences; a deliberately invalid KaTeX command was rejected; the Markdown parser returned exactly one real link and the expected `known-heading` anchor. The in-session Simpson quadrature returned $1/3$ for $\int_0^1 x^2\,dx$ and $2$ for $\int_0^2 1\,dx$ within absolute tolerance $10^{-11}$. Command: `node --input-type=module` with the check supplied on standard input; exit 0. These known-case passes were recorded before running the check on either authorized file or the radial quadrature.

## Owner-authorized closeout

**Disposition: complete at the bounded review, repair, and disposition level for CRW-005 item 11.** RA-1 through RA-6 are implemented: three demonstrated domain omissions, one energy-language clarification, and two explanatory/validation improvements. The five scientific obligations above remain conditional or open. This is not theory closure, solver certification, or empirical acceptance.

Files changed by this implementation:

- `content/markdown/aaa/validation/simulations/action-energy/radial-attraction.md`
- `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-radial-attraction-review-2026-09-11.md`

The final chapter contains 77 lines by `wc -l` and SHA-256 `4aacdf57f4ffe994706ff4bf1ee6a76f5be06a3ce84586b603cfc561b08976ac` by `shasum -a 256`. The read-only mathematical audit reread this complete revised chapter at that same hash and reported no introduced mathematical or claim-boundary defect by direct comparison with the independent derivations. This review remains bounded to the declared chapter and its equations.

| Validation | Result and scope |
| --- | --- |
| `git diff --check` | Passed with no whitespace diagnostics in tracked working changes. A separate `git diff --no-index --check /dev/null <report>` returned difference status 1 with no whitespace diagnostics for the new report. No Git write command was run. |
| Known-case-tested Node check reproduced below | Passed: 80 KaTeX expressions, including five displays, in the chapter; 68 expressions, including one display, in the final evidence report. The chapter's six links and report's 14 links resolved, including Markdown heading anchors and the two existing Equation Mapping registry IDs. The reproduction block is fenced code and is excluded from math/link parsing. |
| Analytic comparison and arithmetic | Passed within absolute tolerance 1e-11: direct parametric acceleration, reduced first integral, rest-release values, Simpson integration on the nonsingular angle domain, finite singular time, reflected signs, root playback from explicit selected emission times, and the prescribed self-hit witness. This validates these bounded mathematical comparisons, not an EOM solver. |
| Preservation against HEAD | Passed: the original two display TeX bodies and both existing equation-mapping links are unchanged. |
| `node scripts/validate-content.mjs --check --strict` | **Failed**, exit 1: 32 errors, zero warnings, 30 notes. All reported errors are missing local-link paths outside the two authorized files, in the development-process-review, aaa-operations, and braid-program records. This is an unresolved repository-wide validation failure; no historical cause or ownership is assigned. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Reported generated drift, exit 1: 12 missing canonical equation links across the current corpus and stale `content/generated/equation-mapping/corpus-equations.json`. The three new displays in this chapter begin at lines 40, 49, and 58 and await generated links/registry entries. Exact reconciliation command: `node scripts/build-equation-mapping-corpus.mjs --write`, reserved for the authorized final publication/regeneration owner; it was not run. |

The strict validator's missing destinations, all relative to `reference/priorities/development-process-review/`, are:

- `evidence/refined-current-migration/recoverability-review.md`
- `contracts/historical-evidence-and-external-closure-v1.md`
- `evidence/contract-implementation/check-historical-evidence.py`
- `evidence/contract-implementation/historical-evidence-verification.json`
- `evidence/streamed-leaf-migration/retained-transport-result.json`
- `evidence/variable-cell-migration/check-retained-adapter.py`
- `evidence/variable-cell-migration/retained-adapter-construction.json`
- `evidence/variable-cell-migration/historical-evidence-selection.v1.json`

These results justify local review/disposition completion while preventing a green repository-wide receipt. HQ can integrate item 11's shared records with that explicit validation limitation. No shared status file was edited, no other chapter was repaired, and no generated artifact was written. Reopen the local disposition if the recorded chapter changes materially, a retained equation fails its stated analytic reference, a local link or render check fails, or any stronger total-dynamics, energy, stability, or collision claim is introduced without the evidence named above.

After the check was embedded below, its plain marker-string guard matched its own fenced source text. That was a checker false positive, not a chapter rendering failure. Before rerunning the target, the replacement render-count check passed the known two-expression case. The final check requires one rendered KaTeX element per extracted expression; it does not scan displayed code for a marker string.

## Reproduction of the focused checks

From the repository root, run the following shell block. It uses Node and the existing Markdown/KaTeX runtime; it creates no files. The known cases execute before the target checks. The link check covers the literal relative links used in these two files, their plain-text Markdown heading anchors, and Equation Mapping registry IDs; it is not a general link-checker certification. The absolute numerical tolerance is 1e-11, and the comparison uses normalized wake speed.

```bash
node --input-type=module <<'NODE'

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
import {renderMarkdownWithMath} from './src/apps/reference/ReferenceSurfaceRuntime.js';
const mdFactory=loadVendoredCommonJsBundle(path.resolve('vendor/markdown-it/markdown-it.min.js'));
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
const md=mdFactory({html:true});
function inspect(source) {
  const expressions=[], errors=[];
  const html=renderMarkdownWithMath(source,md,{renderToString(tex,opts){
    expressions.push({tex,display:opts.displayMode});
    try{return katex.renderToString(tex,{...opts,throwOnError:true,strict:'error'});}
    catch(e){errors.push(e.message); return '';}
  }});
  const links=[];
  function walk(tokens) { for(const t of tokens){if(t.type==='link_open')links.push(t.attrGet('href'));if(t.children)walk(t.children);} }
  walk(md.parse(source,{}));
  const headings=new Set();
  const tokens=md.parse(source,{});
  for(let i=0;i<tokens.length-1;i++) if(tokens[i].type==='heading_open'){
    headings.add(tokens[i+1].content.toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').replace(/\s/g,'-'));
  }
  return {expressions,errors,html,links,headings};
}
function simpson(f,a,b,n=1000) {
 assert.equal(n%2,0);const h=(b-a)/n;let s=f(a)+f(b);
 for(let i=1;i<n;i++)s+=(i%2?4:2)*f(a+i*h);
 return s*h/3;
}
const near=(x,y,tol=1e-11)=>assert.ok(Math.abs(x-y)<=tol, x+' differs from '+y);
const sample="# Known Heading\n\nInline $x$.\n\n$$\nx^2\n$$\n\n[yes](test.md#known-heading)\n\n`$hidden$ [no](bad.md)`\n\n~~~\n$hidden$ [no](bad.md)\n~~~\n";

const got=inspect(sample);
assert.equal(got.expressions.length,2);assert.equal(got.errors.length,0);
assert.deepEqual(got.links,['test.md#known-heading']);assert.ok(got.headings.has('known-heading'));
assert.equal(inspect('$\\definitelyInvalidCommand$').errors.length,1);
near(simpson(x=>x*x,0,1),1/3);
near(simpson(()=>1,0,2),2);
console.log('KNOWN CASES PASS: 2 math spans; code spans/fences excluded; 1 link; expected heading; malformed KaTeX rejected; Simpson x²=1/3 and constant=2.');

assert.equal((got.html.match(/class="katex"/gu)||[]).length,2);
console.log("KNOWN RENDER COUNT PASS: two math spans produce two KaTeX elements.");

const files=[
'content/markdown/aaa/validation/simulations/action-energy/radial-attraction.md',
'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-radial-attraction-review-2026-09-11.md'];
const registry=JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8'));
for(const file of files){
 const result=inspect(fs.readFileSync(file,'utf8'));
 assert.deepEqual(result.errors,[]);
 assert.equal((result.html.match(/class="katex"/gu)||[]).length,result.expressions.length);
 for(const link of result.links){
  if(/^[a-z]+:/i.test(link)) continue;
  const [p,fragment]=link.split('#');
  const resolved=path.resolve(path.dirname(file),decodeURIComponent(p||path.basename(file)));
  assert.ok(fs.existsSync(resolved),'missing '+resolved);
  if(fragment && resolved.endsWith('.md')){
   const tokens=md.parse(fs.readFileSync(resolved,'utf8'),{});
   const slugs=[];
   for(let i=0;i<tokens.length-1;i++)if(tokens[i].type==='heading_open')slugs.push(tokens[i+1].content.toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').replace(/\s/g,'-'));
   assert.ok(slugs.includes(fragment),'missing anchor '+link);
  } else if(fragment && resolved.endsWith('equation-mapping.html')){
   assert.ok(registry.records.some(r=>r.id===fragment),'missing equation '+fragment);
  }
 }
 console.log(file+': '+result.expressions.length+' KaTeX expressions ('+result.expressions.filter(x=>x.display).length+' display); '+result.links.length+' local links/anchors PASS');
}
const r0=2,K=1,theta=Math.PI/4,C=Math.sqrt(r0**3/(2*K));
const r=r0*Math.cos(theta)**2;
const V=-Math.sqrt(2*K/r0)*Math.tan(theta);
const T=C*(theta+Math.sin(theta)*Math.cos(theta));
near(r,1);near(V,-1);near(T,Math.PI/2+1);
near(-Math.sqrt(2*K/r0)/(2*C*Math.cos(theta)**4),-K/r**2);
near(V*V/2-K/r,-K/r0);
near(simpson(t=>2*C*Math.cos(t)**2,0,theta),T);
near(simpson(t=>2*C*Math.cos(t)**2,0,Math.PI/2),Math.PI);
for(const X of [2,-2])for(const [Vr,playback] of [[-1,2],[0,1],[1,0],[2,-1]]){
 const a=-Math.sign(X)/Math.abs(X)**2;
 near(a,X>0?-.25:.25);near(Math.sign(X)*a,-.25);
 const dt=.125, coordinateV=Math.sign(X)*Vr;
 const tPlus=dt-Math.abs(X+coordinateV*dt), tMinus=-dt-Math.abs(X-coordinateV*dt);
 near((tPlus-tMinus)/(2*dt),playback);
}
const s=-1, Xs=2-2*s-s*s;
near(Math.abs(2-Xs),-s);near(-1-2*s,1);
near(-1/Math.abs(2-Xs)**2-.25,-1.25);
console.log('ANALYTIC CHECKS PASS: rest-release values, direct acceleration derivative, first integral, Simpson quadratures, reflection/event arithmetic, self-root witness; absolute tolerance 1e-11. No EOM solver tested.');

const {execFileSync}=await import('node:child_process');
const before=inspect(execFileSync('git',['show','HEAD:'+files[0]],{encoding:'utf8'}));
const after=inspect(fs.readFileSync(files[0],'utf8'));
assert.deepEqual(after.expressions.filter(x=>x.display).slice(0,2).map(x=>x.tex),before.expressions.filter(x=>x.display).map(x=>x.tex));
assert.deepEqual(after.links.filter(x=>x.includes('#corpus-equation-')),before.links.filter(x=>x.includes('#corpus-equation-')));
console.log('PRESERVATION PASS: original 2 display TeX bodies and 2 equation mapping links unchanged against HEAD.');

NODE
```
