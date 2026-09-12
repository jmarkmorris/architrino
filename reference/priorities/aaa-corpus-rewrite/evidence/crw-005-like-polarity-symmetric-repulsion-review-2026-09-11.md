# CRW-005 Like-Polarity Symmetric Repulsion Review — 2026-09-11

## Scope and source identity

This is the explicitly authorized review-plus-repair record for CRW-005 item 13, [Like-Polarity Symmetric Repulsion](../../../../content/markdown/aaa/validation/simulations/action-energy/repulsion.md). The implementation owner may edit that chapter and this report. HQ owns shared status integration. Bounded completion means the complete chapter was reviewed, every demonstrated local defect was repaired and validated, and remaining scientific obligations were dispositioned; it does not mean theory closure, solver certification, stability, or empirical acceptance.

**Measured source identity:** `git rev-parse HEAD` returned `4a8e760bae44dbc868714e579ba60779ae0be9d2`; `nl -ba` read all 49 chapter lines; `shasum -a 256` returned `15ed59ffca292b707cac74c0d77bb055e789054f1673e08de1f9c3cbb650ff22`. The scoped `git diff --` and `git --no-optional-locks status --short --` returned no entries for the two authorized paths before editing, and `test ! -e` confirmed this report destination absent. A repeated chapter hash immediately before implementation matched. These observations concern only this snapshot and these paths.

The startup router and [review skill owner](../../../op/skills/skill-architrino-review.md) route the assurance review through the [Corpus Reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), with the [Integrator Reviewer](../../../office-of-research/cto/prompts/integrator-reviewer.md) supplying the repair and full-document self-review procedure. The assignment expressly overrides the review-only default and reserves shared-record changes to HQ. The [maintained CRW-005 owner](../work-queue.md#crw-005--independent-post-conversion-assurance-review) and the item-13 row of the [status board](../corpus-review-status.md) were read for routing, not treated as mathematical authority. Current exposition follows academic style edition 1.1; edition 1.0 remains the historical conversion standard.

**Measured conversion comparison:** `git show c973402b96d50e45b9bdac0da2bd680e6c26116f -- content/markdown/aaa/validation/simulations/action-energy/repulsion.md` and the same path at that commit's parent show that the conversion added the introduction, promoted section labels to headings, adjusted spacing, and removed the closing plain-language repetition. Both acceleration formulas, their Equation Mapping IDs, the unspecified initial history, and the unconditional symmetry wording were already present before that transition. This comparison establishes those specific contents and their preservation; it does not attribute the original defects to the conversion or to the last editor.

## Authorities and claim boundary

| Live source inspected | Role in this review |
| --- | --- |
| [Architrino — Polarity and Electric Bookkeeping](../../../../content/markdown/aaa/foundations/architrino.md#polarity-and-electric-bookkeeping) | Fixed polarity labels and positive like-polarity sign; neither primitive mass nor effective charge dynamics enters the derivation. |
| [Master Equation — Canonical Form](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) | Receiver-minus-emission direction, transmitter-side weight, complete partner and self-hit sum, strict-past endpoint exclusion, and superposition. |
| [Master Equation — Single-Hit Regime](../../../../content/markdown/aaa/dynamics/master-equation.md#single-hit-regime) and [Self-Hit Regime](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-regime) | Root existence versus uniqueness, history coverage, and the interval-speed argument excluding self-hits. |
| [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md) | Complete-history partner-only boundary, conditional candidate status, and the distinction between a prescribed symmetric path and an evolved solution. |
| [Attraction](../../../../content/markdown/aaa/validation/simulations/action-energy/attraction.md) | Nearby opposite-polarity comparison and preparation-history convention; sibling prose is context, not an independent proof. |
| [Numerical Recipe and Stability](../../../../content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md) | Full root inventory, floors, singular events, acceleration balance before stability, and retained-history perturbations. |
| [Well-posedness and Regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | Conditional finite-window continuation and regulator limits. The canonical Master Equation controls sharp-root semantics where a sibling formulation differs. |
| [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md) | History-dependent energy construction, boundary terms, and the distinction between a work identity and independent conservation evidence. |
| [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution), [Academic Style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [Mathematical Style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [Mathematics Terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [Terminology Usage](../../../../content/markdown/aaa/archie/terminology-usage.md), and [Comparative Glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md) | Local definitions, acceleration-first language, absolute-time notation, source support, evidence grading, and substrate versus effective descriptions. |

No external physical law is used as an architrino-level premise. The independent references below are direct causal-geometry substitutions and elementary calculus. Agent self-review or agreement is not a separate scientific reference. No external literature search is needed to support these local derivations; the unsupported literature-wide solvability wording is narrowed to what the chapter supplies.

## Findings and dispositions

The inventory contains **six demonstrated local defects, one editorial finding, and four open scientific obligations**. Original line numbers below refer to the 49-line source identified above. Every repair is authorized by the item-13 assignment.

| ID | Severity and original location | Finding and evidence | Smallest accepted repair | Falsifier or reopening condition |
| --- | --- | --- | --- | --- |
| R-1 | High; lines 3, 6 | Endpoint positions and zero velocities do not specify the delayed acceleration: the law samples earlier positions and emission velocities. The stationary-release root is at emission time $-r_0$, outside the endpoint data. **Derived** from the causal equation. | Prescribe the stationary past, identify it as preparation rather than an equilibrium, and require complete history coverage. | A claimed endpoint-only evolution would need a proof that every admissible past with those endpoints gives the same root sum; a pair of distinct sums refutes it. |
| R-2 | High; lines 16–41 | Root sets lack a declared domain and strict-past inequality, while the acceleration weight and its derivative are named but undefined. Consequently the purported exact DDE is not locally evaluable. **Measured** by the complete source read; the required formula follows from the Master Equation. | Define receiver-specific causal sets, their shorthand, $D_t=1-\operatorname{sgn}(s)V_j(T_t)$, and $W^{\mathrm{acc}}=1/\lvert D_t\rvert$. State finite complete simple-root and positive-separation conditions. | A missing or duplicated causal root, use of the receiver velocity in the weight, or a nonpositive delay invalidates an evaluation. |
| R-3 | High; lines 18–37, 48 | Both displayed accelerations contain only the other transmitter. The canonical total also includes admitted same-transmitter roots, which straight-line geometry alone does not prohibit. **Derived** by comparing the sums with the canonical total. | Retain the two equations on an explicit empty-self-root history domain; state the missing self contribution outside that domain and prove a sufficient sub-wake-speed history condition for emptiness. | One positive-delay simple self-root in the claimed domain refutes the partner-only total. |
| R-4 | High; lines 3, 42 | Opposite line-of-action signs do not establish equal magnitudes, and equal-time symmetry alone does not pair delayed histories. The assertion for all time also omits uniqueness and continuation hypotheses. **Derived** from the receiver/emission geometry. | Prove reflection pairing of roots, distances, and weights; condition preservation on full symmetric histories, symmetric root rules, and unique continuation. Derive the outward sign only when the sampled histories remain on opposite sides. | Unequal paired weights, asymmetric retained histories, nonunique continuation, or a sampled signed separation of the opposite sign defeats the stated inference. |
| R-5 | Medium; line 41 | “Stable row” confuses a simple root with dynamical stability; failure of a chosen positive derivative floor does not itself prove an exact caustic. Distance and continuation boundaries are also unspecified. **Measured** wording defect with **derived** distinction: a small nonzero derivative is still simple. | Use regular-root language, separate a failed floor from $D_t=0$, and stop the sharp formula at an unresolved singular or history boundary. Do not clip, discard, or silently regularize contributions. | A stability claim requires an actual solution and retained-history perturbation control; a floor failure alone supplies neither. |
| R-6 | Medium; lines 3, 45 | “No exact closed-form solution is presently known” asserts a literature-wide absence without supporting evidence. The chapter supplies no solution or nonexistence theorem. **Measured** by its complete source and reference inventory. | State that this chapter supplies no closed-form solution of the fully coupled delayed evolution and that implicit equations do not prove existence or uniqueness. | A supplied solution verified against the complete history and root law reopens the local solvability statement. |
| E-1 | Low; lines 5–10, 47–49 | The objective/deliverable outline omits definitions of $X_i,V_i,A_i,\kappa,\epsilon$ and does not explain the mechanism connecting delayed sign to separation. **Measured** omission, with **inferred** exposition judgment against edition 1.1. | Replace the outline with locally defined setup, equations, conditional symmetric reduction, and a stationary-release check; preserve both original acceleration formulas and links. | An undefined symbol, missing original mathematical term, or broken retained link requires correction. |

## Mathematical references

### Reflection and outward acceleration

Let $X_1(T)=a(T)$ and $X_2(T)=-a(T)$ on the full relevant histories, with $a>0$ there. Put $K=\kappa\epsilon^2>0$. For either ordered partner hit at emission time $u<T$, the distance is $a(T)+a(u)$, the causal equation is $a(T)+a(u)=T-u$, and both transmitter derivatives are $1+\dot a(u)$. For receiver 1 the signed separation is positive and the transmitter velocity is $-\dot a(u)$; for receiver 2 both signs reverse. Thus the root sets and positive weights coincide, and the acceleration contributions are opposite.

On a complete finite regular partner chart with no self-hits, the resulting equation is

$$
\ddot a(T)=K\sum_{u\in\mathcal C(T)}
\frac{1}{|1+\dot a(u)|[a(T)+a(u)]^2}.
$$

Here $\mathcal C(T)$ is the common partner-root set. A nonempty set gives strictly positive $\ddot a$; an empty set gives zero. Reflection followed by exchange of the equal-polarity labels maps the complete delayed problem to itself. A unique continuation of symmetric preparation data therefore remains symmetric for as long as that continuation exists on the stated domain. The reasoning is a **conditional derivation**, not an existence theorem or a stability test. Superposition adds contributions at a fixed history; it does not make the history-dependent evolution linear.

At release from the prescribed stationary past, $a=r_0/2$, both emission roots are $u=-r_0$, and both weights are one. Hence $A_1(0^+)=K/r_0^2$, $A_2(0^+)=-K/r_0^2$, and the separation has second derivative $2K/r_0^2>0$. The pre-release stationary path is therefore not a free equilibrium. With $c_f=1$, $r_0=2$, and $K=1$, the known values are $u=-2$, $A_1=1/4$, $A_2=-1/4$, and separation acceleration $1/2$.

### Same-transmitter exclusion

For an absolutely continuous history satisfying $|V_i(v)|\le v_*<1$ throughout the interval from emission $u$ to reception $T$,

$$
|X_i(T)-X_i(u)|
\le\int_u^T|V_i(v)|\,dv
\le v_*(T-u)<T-u.
$$

The strict-past self-root equality is therefore impossible. This **derived** sufficient condition concerns the entire relevant interval. Current rest, present sub-wake speed, straight-line motion, or the exclusion of the zero-delay endpoint alone is insufficient. Crossing the speed threshold does not by itself prove that a self-root exists.

## Open scientific obligations

These are dispositioned as open and conditional; they are not counted as unimplemented demonstrated local defects.

| ID | Obligation and existing owner | What would resolve or falsify the stronger claim |
| --- | --- | --- |
| O-1 | Evolved existence, uniqueness, complete root coverage, and continuation beyond a regular partner-only interval; [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#state-dependent-delay-compatibility) and [Well-posedness and Regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md). | An admissible-history theorem or independently validated evolved solution must cover the claimed interval, self-root inventory, and event transitions. A missing older root, loss of separation/derivative control, or ambiguous continuation defeats that claim. |
| O-2 | Dynamical stability and any global collision-avoidance or persistent-repulsion claim; [Numerical Recipe and Stability](../../../../content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md). | First establish an actual solution, then control perturbations of its retained history. The stationary release is already ruled out as an equilibrium by its nonzero acceleration. Root regularity alone establishes no stability or global avoidance theorem. |
| O-3 | Energy/work balance and conserved quantities; [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md). | Supply an independently derived history-aware energy and its boundary terms on the same evolving branch. A nonzero balance residual or dependence on omitted history defeats the proposed conservation claim; a work integral defined from the same acceleration is only an identity. |
| O-4 | Physical preparation and realization of the isolated pair; [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md). | A preparation mechanism and a controlled mapping from evolved substrate motion to an observed response are needed. A prescribed past or a numerical trace alone does not establish empirical acceptance. |

### Identical endpoints with different delayed accelerations

The read-only geometry audit supplied the following separately checkable counterexample for R-1. In normalized units $c_f=1$, at reception $T=0$ prescribe reflected paths $X_1(u)=a(u)$ and $X_2(u)=-a(u)$ with $a(0)=1$ and $\dot a(0)=0$. The stationary past $a(u)=1$ has the unique partner root $u=-2$ and right-member acceleration $K/4$. A different past is

$$
a(u)=\begin{cases}
7/16-3u/8,&u\le-3,\\
1+u^2/16,&-3\le u\le0.
\end{cases}
$$

This past is continuously differentiable at $u=-3$, positive everywhere, and has speed at most $3/8$, so there are no self-hits. Its partner gap at $T=0$ is $f(u)=1+a(u)+u$. For $u\le-3$, $f(u)=23/16+5u/8<0$. On $[-3,0]$, $f(u)=2+u+u^2/16$ has derivative $1+u/8\ge5/8>0$, so exactly one root occurs: $u=-8+4\sqrt2$. At this root $D_t=1/\sqrt2$ and

$$
A_1(0^+)=\frac{K(4+3\sqrt2)}{32}\ne\frac K4.
$$

The endpoint positions, endpoint velocities, reflection, and absence of self-hits are the same, but the acceleration is different. This is a **derived** distinction between prescribed-history evaluations. Neither past is asserted to be a freely evolved solution. The [compatible-history condition](../../../../content/markdown/aaa/dynamics/master-equation.md#conditional-well-posedness-for-the-auxiliary-finite-width-model) requires a separately declared join convention; here release uses a one-sided acceleration and does not assert a globally joined classical velocity derivative.

### A simple self-hit despite current rest and reflection

For R-3 and R-4, prescribe the reflected positive half-separation history

$$
a(u)=\begin{cases}
-2u,&u\le-1,\\
1+u^2,&-1\le u\le0.
\end{cases}
$$

The two pieces agree in value and first derivative at $u=-1$, and again $a(0)=1$, $\dot a(0)=0$. The partner gap is $1-u>0$ for $u\le-1$ and $2+u+u^2>0$ for $-1\le u\le0$, so there are no partner roots. The right-member self gap is $|1-a(u)|+u$, equal to $-u-1$ for $u\le-1$ and $u^2+u$ for $-1\le u\le0$. Its only strict-past zero is $u=-1$; $u=0$ is excluded. At that self-hit, the emission site is $X_1(-1)=2$, the receiver is at $X_1(0)=1$, the direction is negative, the transmitter velocity is $-2$, and $D_t=-1$. The canonical acceleration contribution is consequently $A_1(0^+)=-K$, directed inward relative to the present midpoint while directed away from its own emission point.

This **derived prescribed-history witness** does not assert evolved realization. It disproves the sufficiency of present rest, reflection, and collinearity for a partner-only or outward-total claim. It also illustrates why the magnitude $|D_t|$, rather than a positivity filter on $D_t$, belongs in the weight.

## Validation and owner-authorized closeout

The authorized repairs and focused validation are complete. The closeout below records the exact scientific and repository-validation limits; the required repository-wide check is not green.

### Known-case validation before target execution

The in-session read-only Node probe below passed its known-case mode before it was run on either target: it extracted exactly two expected math expressions, ignored fenced and inline code, found one valid local link, rejected a missing file, a missing heading and invalid TeX, and returned the analytically known stationary root and acceleration. Two earlier attempts failed during JavaScript parsing before any target evaluation; those runs are not validation evidence. The successful known-case output was `KNOWN CASE PASS: 2 math expressions; code/fence ignored; 1 valid link; bad heading/path and bad TeX rejected; stationary root -2 and acceleration 1/4.`

The parser uses the repository's existing display-equation extractor and bundled Markdown parser. KaTeX comes from the existing reader asset, loaded read-only; this is syntax rendering, not a browser layout check or an iOS package build. The link probe checks Markdown link destinations, ordinary heading anchors used by these documents, and retained Equation Mapping IDs. It is scoped to these files and their linked destinations, not a universal Markdown/HTML validator. The arithmetic is double-precision evaluation against the analytic references above, not an EOM evolution or a proof of complete roots by numerical scanning.

For reproduction, run the following block from the repository root with `CRW_MODE=known` first; after that pass, rerun it with `CRW_MODE=target`. It writes no files.

```bash
CRW_MODE=known node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { parseCorpusDisplayEquations } from './scripts/build-equation-mapping-corpus.mjs';
const chapter='content/markdown/aaa/validation/simulations/action-energy/repulsion.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-like-polarity-symmetric-repulsion-review-2026-09-11.md';
const ks={},ms={};
vm.runInNewContext(fs.readFileSync('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js','utf8'),ks);
vm.runInNewContext(fs.readFileSync('vendor/markdown-it/markdown-it.min.js','utf8'),ms);
const md=ms.markdownit();
function math(source){
  let fence=null;
  const cleaned=source.split('\n').map(line=>{
    const m=line.match(/^\s*(\x60{3,}|~{3,})/);
    if(m){if(!fence)fence=m[1][0];else if(fence===m[1][0])fence=null;return '';}
    return fence?'':line.replace(/(\x60+).*?\1/g,'');
  }).join('\n');
  const blocks=parseCorpusDisplayEquations('case.md',cleaned);
  let rest=cleaned;
  for(const b of blocks.toReversed()) rest=rest.slice(0,b.openStart)+' '.repeat(b.closeEnd-b.openStart)+rest.slice(b.closeEnd);
  const matches=[...rest.matchAll(/(?<!\\)\$(?!\$)([^$\n]+?)(?<!\\)\$/g)];
  const unmatched=rest.replace(/(?<!\\)\$(?!\$)([^$\n]+?)(?<!\\)\$/g,'').match(/(?<!\\)\$/g);
  assert.equal(unmatched,null,'unmatched math delimiter');
  return [...blocks.map(b=>({tex:b.tex,display:true})),...matches.map(m=>({tex:m[1],display:false}))];
}
function hrefs(source){
  const out=[];
  function walk(tokens){for(const t of tokens){if(t.type==='link_open')out.push(t.attrGet('href'));if(t.children)walk(t.children);}}
  walk(md.parse(source,{}));return out;
}
function headings(source){
  const tokens=md.parse(source,{}),out=new Set();
  for(let i=0;i<tokens.length;i++)if(tokens[i].type==='heading_open')out.add(tokens[i+1].content.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-'));
  return out;
}
function links(file,source){
  const result={links:0,markdownAnchors:0,mappingIds:0};
  const registryText=JSON.stringify(JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8')));
  for(const href of hrefs(source)){
    if(/^[a-z][a-z0-9+.-]*:/i.test(href))continue;
    result.links++;
    const [rel,hash]=href.split('#'),target=path.resolve(path.dirname(file),decodeURIComponent(rel||path.basename(file)));
    assert(fs.existsSync(target),'missing '+target);
    if(hash&&target.endsWith('.md')){
      assert(headings(fs.readFileSync(target,'utf8')).has(decodeURIComponent(hash)),'missing heading '+href);result.markdownAnchors++;
    }else if(hash&&target.endsWith('equation-mapping.html')){
      assert(registryText.includes('"semanticId":"'+decodeURIComponent(hash)+'"'),'missing equation ID '+hash);result.mappingIds++;
    }
  }
  return result;
}
function hit(x,v,u,receiver=1){
  const s=receiver+x(u),d=Math.abs(s),D=1+Math.sign(s)*v(u);
  return {gap:d+u,D,A:Math.sign(s)/(Math.abs(D)*d*d)};
}
function near(actual,expected){assert(Math.abs(actual-expected)<1e-12,actual+' != '+expected);}
if(process.env.CRW_MODE==='known'){
  const sample='# Known Case\n\nInline $x+1$.\n\n$$\nx^2\n$$\n\n[ok](AGENTS.md)\n\n'+String.fromCharCode(96).repeat(3)+'\n$ignored$ [bad](missing.md)\n'+String.fromCharCode(96).repeat(3)+'\n'+String.fromCharCode(96)+'$code$'+String.fromCharCode(96);
  assert.deepEqual(math(sample).map(x=>x.tex),['x^2','x+1']);
  assert.deepEqual(hrefs(sample),['AGENTS.md']);
  assert(headings(sample).has('known-case'));
  for(const m of math(sample))ks.katex.renderToString(m.tex,{displayMode:m.display,throwOnError:true,strict:'error'});
  assert.throws(()=>ks.katex.renderToString('\\notARealCommand',{throwOnError:true}));
  assert.equal(links('case.md',sample).links,1);
  assert.throws(()=>links('case.md','[bad](AGENTS.md#known-case)'));
  assert.throws(()=>links('case.md','[bad](known-case-missing-file.md)'));
  near(hit(()=>1,()=>0,-2).A,0.25);near(hit(()=>1,()=>0,-2).gap,0);
  console.log('KNOWN CASE PASS: 2 math expressions; code/fence ignored; 1 valid link; bad heading/path and bad TeX rejected; stationary root -2 and acceleration 1/4.');
}else{
  for(const file of [chapter,report]){
    const source=fs.readFileSync(file,'utf8'),items=math(source);
    for(const m of items)ks.katex.renderToString(m.tex,{displayMode:m.display,throwOnError:true,strict:'error'});
    console.log(JSON.stringify({file,sha256:crypto.createHash('sha256').update(source).digest('hex'),katexVersion:ks.katex.version,expressions:items.length,displays:items.filter(m=>m.display).length,...links(file,source)}));
  }
  const old=execFileSync('git',['show','4a8e760bae44dbc868714e579ba60779ae0be9d2:'+chapter],{encoding:'utf8'});
  const original=parseCorpusDisplayEquations(chapter,old),current=parseCorpusDisplayEquations(chapter,fs.readFileSync(chapter,'utf8'));
  assert.equal(original.length,2);assert.equal(current.length,3);
  for(let i=0;i<2;i++){assert.equal(current[i].tex,original[i].tex);assert.equal(current[i].existingLink.text,original[i].existingLink.text);}
  const u=-8+4*Math.sqrt(2),x=t=>t<=-3?7/16-3*t/8:1+t*t/16,v=t=>t<=-3?-3/8:t/8;
  const a=hit(x,v,u);near(a.gap,0);near(a.D,1/Math.sqrt(2));near(a.A,(4+3*Math.sqrt(2))/32);
  assert(Math.abs(a.A-0.25)>0.007);
  const selfS=1-2,selfD=1-Math.sign(selfS)*(-2),selfA=Math.sign(selfS)/(Math.abs(selfD)*selfS*selfS);
  near(Math.abs(selfS)-1,0);near(selfD,-1);near(selfA,-1);
  console.log(JSON.stringify({formulaAndLinkPreservation:'2/2',endpointHistoryWitness:{root:u,D:a.D,A:a.A,stationaryA:0.25},selfHitWitness:{root:-1,D:selfD,A:selfA},claim:'prescribed-history arithmetic only; no evolved solution or solver certificate'}));
}

NODE
```

### Owner-authorized closeout

**Disposition: complete at the bounded review, repair, and finding-disposition level for CRW-005 item 13.** All six demonstrated defects R-1–R-6 are accepted and repaired; E-1 is accepted and implemented. O-1–O-4 remain explicit open scientific obligations. There are no deferred demonstrated local repairs. HQ can integrate this bounded disposition while retaining the repository-wide validation failures below as unresolved external failures.

| Changed file | Implemented result and final chapter locations |
| --- | --- |
| [Canonical chapter](../../../../content/markdown/aaa/validation/simulations/action-energy/repulsion.md) | R-1 and E-1: setup and prescribed preparation, lines 3–9. R-2: root domain and exact weights, lines 13–15. R-3: partner-total scope and self-hit account, lines 17–40. R-4: reflection proof and half-separation reduction, lines 44–62. R-5: regularity and singular-event boundary, line 42. R-6 and energy/stability limits: lines 64–68. |
| This evidence report | Source identity, conversion preservation, exact dispositions, independent analytic witnesses, runnable read-only probe, open obligations, and closeout receipt. |

**Measured final chapter identity:** `shasum -a 256` and the Node probe returned `694a2222ddb2241035689f1825be9f71c9e2ae597181c3e6c3db386c2221a400`. The read-only **Repulsion Geometry Audit** (`/root/repulsion_geometry_audit`) reread the complete repaired chapter at hash `70c64ef834723308d77c87e8287e09744a26b72718c520e2c45e0c8f66627fee` and found no blocking mathematical defect by direct substitution into the canonical law. During validation the shared chapter acquired a third Equation Mapping link, `corpus-equation-e4b7c56ef1b8a7f7`, which this implementation owner did not add. A Node SHA-256 comparison, first tested against the standard `abc` known digest, confirmed that deleting only that added link and its blank line reconstructs the audited hash exactly. The link was preserved and validated. Its writer was not identified, and no regeneration is attributed to this owner.

| Validation instrument | Measured result | Boundary |
| --- | --- | --- |
| `git diff --check` | Pass, exit 0. | Whitespace validation of the current shared tracked diff; no scientific acceptance implication. |
| Read-only probe above, Node `v26.3.0`, `CRW_MODE=known` before `CRW_MODE=target` | Pass. The chapter has 56 KaTeX expressions including three displays, seven local links and three resolved Equation Mapping IDs. The completed report has 87 math expressions including five displays, 28 local links and eight ordinary Markdown anchors; all pass. | KaTeX `0.16.11` with `throwOnError: true` and `strict: 'error'`; syntax and scoped destinations, not visual-layout certification. The completed report was checked after closeout text was added. |
| Display-equation parser comparison against the startup HEAD source | Pass: both original display formulas and their existing links match exactly, 2/2. | The new third display supplies the conditional reduction. The comparison does not prove the original equations; canon and derivation supply that reference. |
| Direct arithmetic against the stationary and piecewise-history closed forms | Pass at absolute tolerance $10^{-12}$ in units $c_f=1$, $K=1$. The alternative endpoint-history root is approximately $-2.3431457505076194$, its transmitter derivative is $0.7071067811865476$, and acceleration is $0.25758252147247773$, differing from the stationary value $0.25$. The self-hit witness gives root $-1$, derivative $-1$, and acceleration $-1$. | These are prescribed-history evaluations. Completeness of these particular root sets follows from the explicit piecewise sign and monotonicity arguments above, not from a floating-point scan. |
| `node scripts/validate-content.mjs --check --strict` | Fail. First invocation: nine errors, zero warnings. Later invocation after report/probe completion: eight errors, zero warnings. Every emitted error is a missing link target outside the two authorized paths. | Concurrent repository changes altered the error inventory between runs. Neither invocation is a pass; causal attribution and historical pre-existence of those errors were not established. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Fail, exit 1: `generated registry is stale: content/generated/equation-mapping/corpus-equations.json`. It reported 199 Markdown files, 4684 displays, 23 promoted equations, and 30364 symbol definitions, with no missing-source-link error at that snapshot. | Record-only generated drift. The exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by the same `--check`, for the authorized regeneration/publication owner. No `--write` was run here. |

The later strict-validator errors identify these exact source locations and missing destinations. Paths are literal evidence rather than links to unavailable artifacts:

| Error source | Missing destination |
| --- | --- |
| `reference/priorities/braid-program/analysis/manuscript-source-coverage.md:367` | `reference/priorities/braid-program/evidence/2026-08-28-f5-unattended-certification-session.md` |
| `reference/priorities/braid-program/evidence/2026-08-28-f5-observation-blocker-successor-prompt.md:17` | `reference/priorities/braid-program/evidence/2026-08-28-f5-unattended-certification-session.md` |
| `reference/priorities/development-process-review/analysis/f5-current-handoff.md:3` | `reference/priorities/development-process-review/evidence/f5-current-handoff/admission.json` |
| `reference/priorities/development-process-review/analysis/f5-remaining-callers.md:46` | `reference/priorities/development-process-review/evidence/f5-remaining-callers/current-api-independent-review.md` |
| `reference/priorities/development-process-review/analysis/f5-remaining-callers.md:56` | `reference/priorities/development-process-review/evidence/f5-remaining-callers/current-build-admission.json` |
| `reference/priorities/development-process-review/analysis/full-root-cover-current-migration.md:7` | `reference/priorities/development-process-review/evidence/full-root-cover-migration/run-f6c-cached-root-cover-full.mjs.20c8d44ee55f.source` |
| `reference/priorities/development-process-review/analysis/root-cover-current-migration.md:11` | `reference/priorities/development-process-review/evidence/root-cover-migration/prepare-current-plans.mjs` |
| `reference/priorities/development-process-review/work-log.md:115` | `reference/priorities/development-process-review/evidence/variable-cell-migration/validation-runs.json` |

The implementation owner changed only the canonical chapter and this report. No shared board, priority list, queue, work log, other chapter, generated registry, or software file was edited by this owner; no staging, commit, push, reset, stash, regeneration, or worktree operation was performed. The scoped `git --no-optional-locks status --short --` records the modified chapter and new untracked evidence report. Source reads and final self-review cover the entire chapter. The external validation failures are recorded rather than repaired because those files are outside the explicit write authority.

Reopen a repaired finding if the chapter changes, a retained root violates its stated direction or domain, a complete self-root inventory contradicts the partner-only assumption, the analytic witness fails, or a scoped link or KaTeX check fails. Stronger claims reopen O-1–O-4: an evolved solution and its history-space stability, singular continuation, energy boundary account, and physical preparation are separate requirements. The current result establishes the stationary-release repulsive response and the conditional symmetric reduction, without claiming theory closure, solver certification, or empirical acceptance.
