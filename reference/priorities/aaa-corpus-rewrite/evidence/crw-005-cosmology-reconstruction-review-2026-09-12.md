# CRW-005 Cosmology Reconstruction — bounded review and repair

## Scope and provenance

Priority 60; review date 2026-09-12. The assignment authorizes only [Cosmology Reconstruction](../../../../content/markdown/aaa/cosmology/cosmology-reconstruction.md) and this evidence receipt. The full chapter was reviewed, repaired, and reread. This is an editor's self-review with separately stated algebraic witnesses and external comparison references; it is not independent physical validation.

Claim grade: measured. Before editing, scoped Git status returned no changes to either authorized path, the report-absence test passed, and SHA-256 matched the supplied dispatch baseline. The baseline was checked again immediately before patching. The inspected HEAD was 72847589ba73d0bf81d07ca5b27d98072659cee9; the immutable chapter blob is 71a61f363036be57e025795b0d856bea53a3e8a3. Falsifier: different bytes from that blob, or a different dispatch hash, invalidate the baseline comparison.

Baseline chapter SHA-256: f49a5c8eb86bd1824c6e7918c2a0a99d6f1e667d8be5d6b2b39cfe55cc87dc74.

Final chapter SHA-256: 4cdc71fa008ae2d3b295cc6aa177a502abc54f59b99f6cba33fed439b71f30a0.

Exact baseline line numbers below refer to the 427-line dispatch source recovered from that blob. Revised line numbers refer to the 437-line chapter at the final hash. Subsequent shared-checkout changes require rechecking the hash before using the line references.

The [conversion ledger](conversion-ledger.md), line 106, records this chapter's edition-1.0 conversion. Inspection of the actual c973402b9-parent-to-c973402b9 diff found two paragraph substitutions at baseline lines 88 and 154 and no displayed-equation change. That verifies the narrow historical edit; the present findings concern the dispatch text and are not attributed to the conversion merely because it is the latest touching commit.

The [status board](../corpus-review-status.md), line 11 at inspection, lists priority 60. The [work queue](../work-queue.md#crw-005--independent-post-conversion-assurance-review) defines CRW-005 assurance and the [priorities owner](../priorities.md) distinguishes correction disposition from scientific closure. The explicit two-file assignment supplies repair authority and overrides historical consult-only/default tracking steps. Shared records remain for the coordinator.

## Authorities and sources inspected

- Complete repository startup instructions: [AGENTS.md](../../../../AGENTS.md), [generated router](../../../op/agent-startup-orientation.generated.md), [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), [corpus-reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), and [theory orientation](../../../op/theory-orientation.md).
- Exposition and notation: [operator explanation standard](../../../op/operator-explanation-standard.md), [academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematical style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md). The [geometry/dynamics packet](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) was used as a review lens, not as theory authority.
- Relevant foundation passages: [Ontology](../../../../content/markdown/aaa/foundations/ontology.md) on observer projections and conditional factorization; [Architrino](../../../../content/markdown/aaa/foundations/architrino.md) on primitive inventory; [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md) on clock extraction; [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md) on fixed geometry and cosmological recovery; [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md) on coordinate layers; [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md) on observer access; [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md#complete-state-and-physical-observer-access) on non-unique inverse maps.
- Dynamical and nearby cosmology passages: [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), the [Cosmology Ontology opening](../../../../content/markdown/aaa/cosmology/cosmology-ontology.md), and [Expansion Mechanism](../../../../content/markdown/aaa/cosmology/expansion-mechanism.md#noether-sea-braid-factorization-target), particularly the inverse cadence definition and the source/motion/path extraction rules. Nearby chapters were read as live supporting context, not counted as additional reviewed documents.
- External comparison reference: David W. Hogg, *Distance measures in cosmology* (1999; revised 2000), [arXiv:astro-ph/9905116](https://arxiv.org/abs/astro-ph/9905116). Inspected the [full HTML](https://arxiv.org/html/astro-ph/9905116v4), especially sections 3–7 and 10 and equations 8, 12, 15, 20–22, 25, and 30. Its explicit distinction between observed and cosmological redshift, bolometric and band flux, and distance and lookback time supports the comparison scope. Its standard framework is not an architrino premise.
- External parameter reference: Planck Collaboration, N. Aghanim and collaborators, *Planck 2018 results. VI. Cosmological parameters*, A&A 641 A6 (2020), [doi:10.1051/0004-6361/201833910](https://doi.org/10.1051/0004-6361/201833910), [arXiv:1807.06209](https://arxiv.org/abs/1807.06209). The abstract's base-model parameter inference was inspected for $H_0=67.4$ and $\Omega_m=0.315$. No chains, full likelihood, or cosmological dataset were analyzed.

Binding inventory before editing: basename searches under scripts, tests, and the graph owners found textbook/scene navigation and a deterministic-recall fixture referencing the chapter. The [equation generator](../../../../scripts/build-equation-mapping-corpus.mjs) records formula, heading, source location, and nearby prose in the [generated registry](../../../../content/generated/equation-mapping/corpus-equations.json); the [reference-surface generator](../../../../scripts/build-reference-surface.mjs) consumes authored text. These consumers are preserved. This inventory is scoped to those searches; it is not a claim that no other consumer exists.

## Findings and implemented repairs

Fourteen finding groups are recorded: nine High and five Medium. High denotes a missing condition or identification that changes a physical or mathematical inference; Medium denotes a comparison, source, or explanatory defect. All fourteen local repairs are implemented. None of their open physical obligations is counted as solved.

### CR-01 — Medium — inference dependence is not itself circularity

Baseline lines 7, 25–29, 154, 261, and 306 characterized the standard pipeline as treating source properties as direct data and implied circularity from repeated dependence on one record. Revised lines 7, 25, 156, 263, and 308 state the forward-model and joint-inference structure.

Claim grade: derived for the distinction. A joint probability model can include dependent source and distance parameters without counting a datum twice. A luminosity derived using a distance model cannot then independently validate that same model unless its dependence is retained. The repair identifies that actual failure condition and applies it to both frameworks. Claim grade: inferred for the editorial diagnosis of the baseline characterization. Falsifier: an explicitly named pipeline that demonstrably performs the prohibited reuse could support a narrower critique; none was supplied by this chapter.

### CR-02 — Medium — missing concepts and layer clues

Baseline lines 5–19, 33–58, and 392–403 used the theory abbreviation, Noether sea, photon channel, BAO, CMB, and later $S_8$ without sufficient in-place definitions. The ocean analogy also left its mechanical limits implicit. Revised lines 5–9, 15, 33, 401, and 405 supply short definitions, foundation links, acceleration-first substrate wording, and the analogy boundary.

Claim grade: measured for the omissions by complete baseline reread; inferred for explanatory sufficiency under edition 1.1. Falsifier: a prior local definition resolving the identified use or a revised definition that conflicts with the controlling owner. No primitive force, mass, photon speed equality, or cosmological mechanism was added.

### CR-03 — High — observed ratios need source and propagation conditions

Baseline lines 62–88 treated the frequency/wavelength equality as direct bookkeeping and passed the same redshift into the scale-factor equation. Revised lines 74–90 distinguish the adopted source-line reference, equal speed calibration, and the corrected cosmological redshift.

Claim grade: derived. From $\lambda=c_\gamma/\nu$, the wavelength ratio contains $c_{\gamma,R}/c_{\gamma,E}$ unless the endpoint phase-speed calibrations agree. The standard scale-factor law concerns the homogeneous cosmological component, not arbitrary local motion or source-line changes. Falsifier: an unconditional equality for unequal endpoint phase speeds, or an uncorrected local Doppler shift that nevertheless equals a fixed homogeneous scale-factor ratio. Original displays remain unchanged within their newly explicit domains.

### CR-04 — Medium — the standard comparison needs component definitions

Baseline lines 33 and 90–130 mixed a cosmological constant with variable dark-energy wording and left the density normalization and component-power assumptions implicit. Revised lines 33, 92, and 111 identify Lambda as the constant case, define $H_0$ and the density parameters, and delimit the pressureless/radiation approximation.

Claim grade: derived within the stated effective component model. For separately conserved dark energy the factor is $\exp[3\int(1+w)\,dz/(1+z)]$; $w=-1$ makes it one. Matter and radiation powers alone do not follow a species through a relativistic transition. Falsifier: failure of that constant-$w$ limit or a component history outside the declared approximation used as if it were covered. No precision neutrino or Planck calculation is claimed.

### CR-05 — High — channel definitions and clock-factor signs were incomplete

Baseline lines 158–203 generalized a reference frequency to an arbitrary CMB band or light-curve class and described $\Gamma_N$ only as a clock-rate comparison. Revised lines 171 and 199–207 require an identifiable positive-frequency reference and define the inverse cadence $\Gamma_N=\Omega_{N0}/\Omega_N$.

Claim grade: derived from the declared factorization. With all other factors unity, $\Gamma_{N,E}=2$ gives $z=1$; $\Gamma_{N,R}=2$ gives $z=-1/2$; equal factors cancel. $B_X>1$ or $D_v>1$ shifts the frequency upward. The source factor records a real transition change, not merely a calibration mistake. Falsifier: the repaired factor definitions producing the opposite signs in the preserved logarithmic equation. These witnesses are algebraic and do not establish physical clocks.

### CR-06 — High — an exact residual is not an independently extracted transport law

Baseline lines 179–205 presented the decomposition without its identifiability condition. Revised lines 181, 203–207, and 227 distinguish an identity defined by residual subtraction from a predicted path factor and prevent moving-clock double counting.

Claim grade: derived. For any dimensionless $u$, changing $\ln\Gamma_{N,E}$ by $u$ and $Y_X$ by $-u$ leaves $Z_X$ invariant. A single line-shift measurement therefore cannot determine the separate factors. Falsifier: independent endpoint, source, motion, and path constraints removing this degeneracy on a declared model family. The repair states that requirement; it does not supply those constraints.

### CR-07 — High — spatial transfer slope and temporal expansion differ

Baseline lines 207–237 used $R$ both for reception and an undefined derivative coordinate, then treated the resulting coefficient as Hubble-like without its spatial-to-temporal conversion. Revised lines 227–239 declare a sightline family and distance coordinate $r_{\mathrm{los}}$, and show the difference.

Claim grade: derived. In the flat standard comparison $d\chi/dz=c_0/H(z)$, so $c_0\,d\ln(1+z)/d\chi=H(z)/(1+z)$. At $z=1$, a constant $H=1$ produces a spatial coefficient $1/2$, not one. Falsifier: differentiating the stated $\chi(z)$ and obtaining a different factor. The sole displayed-equation edit replaces $R$ by $r_{\mathrm{los}}$ in the argument and derivative of the existing equation; its identity and physical definition are retained. The corrected residual remains $Y_X$, not a residual after subtracting $Y_X$ as well.

### CR-08 — High — smooth averages do not prove one scale history

Baseline lines 243–249 promoted relaxation and smooth averaging toward a single scale factor without sufficient clock and composition conditions. Revised lines 245 and 249 require a retained history, channel and sightline agreement, and additive logarithmic transfer.

Claim grade: derived for the necessary condition. If $Z_{ij}=\ln a_{\mathrm{eff}}(t_{\mathrm{eff},j})-\ln a_{\mathrm{eff}}(t_{\mathrm{eff},i})$, the intermediate term cancels and $Z_{13}=Z_{12}+Z_{23}$. Smoothly assigned values $0.1$, $0.2$, and $0.4$ for these three transfers violate that equation. Falsifier: one common scale factor realizing those incompatible transfers, or a specified physical averaging theorem supplying the missing restrictions. Common endpoint retuning can also cancel, so radius/frequency trends alone are not a redshift derivation.

### CR-09 — High — the age integral requires a differential clock map

Baseline lines 269–286 said compression into $H_{\mathrm{eff}}(z)$ computes an effective interval. Revised lines 271–284 derive the time differential and require the integration domain, initial boundary, convergence, and observer-to-absolute clock map.

Claim grade: derived. Differentiating $1+z=a(t_0)/a(t)$ gives $dz/dt=-(1+z)H$. A coefficient with inverse-time units does not automatically satisfy this equation. Even after a valid effective interval is recovered, $dt_{\mathrm{eff}}=A(T)\,dT$ is needed to infer an absolute interval; two positive constant calibrations $A=1$ and $A=2$ give absolute intervals differing by two for the same effective duration. Falsifier: an independently derived map identifying the specific spatial coefficient with the required temporal rate over the whole integration domain. The repair does not date the Euclidean void or complete Noether sea.

### CR-10 — High — luminosity distance needs two transfer factors and beam geometry

Baseline lines 132–150 and 290–332 omitted important bolometric/band, isotropy, transparency, and arrival-rate conditions. In particular, a constant frequency-transfer slope supplies a distance relation but not the prefactor in the benchmark luminosity distance. Revised lines 134–144, 294–308, and 326–336 make the assumptions explicit.

Claim grade: derived within the declared transparent isotropic beam model. For energy ratio $g_E$ and interval ratio $g_t$, photon counting gives $F=L/(4\pi r_{\mathrm{los}}^2g_Eg_t)$, hence $d_L=r_{\mathrm{los}}\sqrt{g_Eg_t}$. At redshift one, $g_E=g_t=2$ gives $d_L=2r_{\mathrm{los}}$; energy redshift alone with $g_t=1$ gives $\sqrt{2}r_{\mathrm{los}}$. Falsifier: a retained channel that derives the energy, timing, and beam maps from its own dynamics; absent that, the benchmark is conditional. No angular reciprocity or Tolman recovery follows merely from its luminosity formula.

### CR-11 — Medium — numerical comparison lacked reproducible scope and provenance

Baseline lines 312–366 gave Planck-like parameters and rounded distances without the numerical instrument, observer speed normalization, or the high-redshift interpretation. Revised lines 314 and 370 supply those details and distinguish a formal $z=1100$ distance from a CMB standard-candle observation.

Claim grade: measured by the controlled Node quadrature below. All 12 rows agree at the printed precision, and the largest 8,192-to-16,384 subdivision difference is 1.3224780559539795e-7 Mpc. Falsifier: a row differing under the stated parameters and units beyond its rounding, or an independent quadrature contradicting that evaluation. Refinement tests numerical consistency; it is not a certified quadrature bound or evidence of physical cosmology. Original table values are preserved.

### CR-12 — High — model-to-model differences are not observational rejection

Baseline lines 366–370 called intermediate-redshift mismatch decisive and inferred a necessary nonconstant Noether sea history. Revised lines 370–374 retain the numerical differences while restricting their conclusion.

Claim grade: measured for the computed distance-modulus differences, approximately -0.17103855 and -0.21306095 at redshifts 0.5 and 1. Claim grade: derived for the inference limit: two model curves alone provide no data likelihood, uncertainty, or selection model. A nonconstant slope is required to match the comparison curve only when the other benchmark assumptions remain fixed. Falsifier: a specified independent dataset and likelihood establishing rejection, or a derived response model identifying which assumption must change. Neither is provided by the chapter's table.

### CR-13 — High — dark-sector relabeling is not physical identification

Baseline lines 374–388 mapped fitted density and pressure quantities directly to Noether sea response and treated the dark sector as evidence for this reinterpretation. Revised lines 378–390 mark the physical mappings as proposals and preserve dynamical, lensing, growth, and inventory constraints.

Claim grade: inferred for the diagnosis, from the absence of the constitutive derivation in the reviewed chapter. The proposed microscopic interpretation remains guessed. Falsifier: a common derived medium/assembly model independently recovering the same pressure, density, clustering, and observational responses. Relabeling alone does not establish that neutral assemblies are cold dark matter or that relaxation supplies a cosmological constant.

### CR-14 — Medium — recovery targets and the inverse arrow need limits

Baseline lines 392–427 listed broad recovery tests and ended with an arrow into native history without explicitly limiting its inverse or distinguishing observations from fitted products. Revised lines 401–409 and 417–437 explain observable-specific tests, identify source references, and state non-uniqueness and existence limits.

Claim grade: derived for the inverse-map limit illustrated by CR-06; inferred for the recovery framing. Matching an effective curve does not construct a dynamically admissible underlying history. Falsifier: a retained microscopic model with an identified observational domain and independent evidence for its forward and inverse maps. The correction preserves the whole original equation chain and all listed observational channels.

## Validation and preservation

Claim grade: measured. After both authorized files existed and were completely reread, `node scripts/validate-content.mjs --check --strict` exited zero with 0 errors, 0 warnings, and 30 notes: 391 scene files, 199 corpus Markdown files, and 1,705 repository Markdown files at that shared-checkout snapshot. The notes concern the existing scene audit and incoming-link inventory; this pass is content validation, not a mathematical or physical acceptance result. `git diff --check -- content/markdown/aaa/cosmology/cosmology-reconstruction.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-cosmology-reconstruction-review-2026-09-12.md` passed; because the report is untracked, the explicit two-file whitespace test below also checked it. Scoped `git --no-optional-locks status --short --` showed the modified chapter and new receipt. `shasum -a 256 content/markdown/aaa/cosmology/cosmology-reconstruction.md` returned the final hash above. Falsifier: a changed hash, a failing rerun, or a target outside these checks invalidates the corresponding claim.

The controlled source checker first passed known cases: two genuine math expressions while excluding code, deliberate malformed TeX detected, fenced and inline links ignored, one display with its viewer link, and positive/negative whitespace examples. Only after that output was recorded did it read the target. It uses the existing reference renderer with KaTeX 0.16.11 in throwing/strict mode, Markdown-it link tokens, and the corpus display-equation parser. The two-file run passed: chapter 219 math expressions and 31 local links; receipt 55 math expressions and 32 local links; no math, missing-file, or whitespace errors.

The baseline comparison verified all 18 displayed-equation identities, all 25 original link targets, and all 13 original headings. Seventeen displays are byte-identical; one has exactly the CR-07 coordinate substitution. The reference-renderer check covers the dollar-delimited forms used in these two documents and standard fenced/inline code; it is not a general proof of arbitrary Markdown parsing. Local-link checking establishes file existence, with the newly added chapter anchor checked separately; it does not certify every external endpoint or generated browser route.

The source checker can be rerun from the repository root by passing the following block to `node --input-type=module` on standard input:

```javascript
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
import {renderMarkdownWithMath} from './src/apps/reference/ReferenceSurfaceRuntime.js';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const markdownIt=loadVendoredCommonJsBundle(path.resolve('vendor/markdown-it/markdown-it.min.js'));
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
const md=markdownIt({html:false});
function mathCheck(source){
  let count=0;const errors=[];
  const html=renderMarkdownWithMath(source,md,{renderToString(tex,options){
    count++;try{return katex.renderToString(tex,{...options,throwOnError:true,strict:'error'});}
    catch(e){errors.push(e.message);return '';}
  }});
  return {count,errors,unrestored:/MATHSEGMENTTOKEN\d+X/.test(html)};
}
function links(source){
  const out=[];function walk(tokens){for(const t of tokens){if(t.type==='link_open')out.push(t.attrGet('href'));if(t.children)walk(t.children);}}walk(md.parse(source,{}));return out;
}
const dollar=String.fromCharCode(36), tick=String.fromCharCode(96), fence=tick.repeat(3);
const good=[dollar+'x'+dollar,dollar.repeat(2)+'\ny=1\n'+dollar.repeat(2),tick+dollar+'literal'+dollar+tick,fence+'\n'+dollar+'ignored'+dollar+'\n'+fence].join('\n\n');
assert.deepEqual(mathCheck(good),{count:2,errors:[],unrestored:false});
assert.equal(mathCheck(dollar+'\\frac{1}{'+dollar).errors.length,1);
const fake='[example](AGENTS.md)';
assert.deepEqual(links(fake+'\n\n'+fence+'\n[ignored](missing-control)\n'+fence+'\n\n'+tick+'[ignored](missing-inline)'+tick),['AGENTS.md']);
const sample=dollar.repeat(2)+'\nx=1\n'+dollar.repeat(2)+'\n\n[View →](../../../../equation-mapping.html#control)';
const parsed=parseCorpusDisplayEquations('content/markdown/aaa/test/example.md',sample);
assert.equal(parsed.length,1);assert.equal(parsed[0].tex,'x=1');assert.ok(parsed[0].existingLink);
assert.ok(/[ \t]+$/m.test('trailing \n'));assert.ok(!/[ \t]+$/m.test('clean\n'));
console.log('KNOWN CONTROLS PASS before target: 2 real math expressions, malformed math rejected, code excluded from links/math, one display/link, whitespace positive/negative.');
const chapter='content/markdown/aaa/cosmology/cosmology-reconstruction.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-cosmology-reconstruction-review-2026-09-12.md';
const before=execFileSync('git',['show','71a61f363036be57e025795b0d856bea53a3e8a3'],{encoding:'utf8'});
const digest=s=>createHash('sha256').update(s).digest('hex');
assert.equal(digest(before),'f49a5c8eb86bd1824c6e7918c2a0a99d6f1e667d8be5d6b2b39cfe55cc87dc74');
const current=fs.readFileSync(chapter,'utf8');
const p0=parseCorpusDisplayEquations(chapter,before),p1=parseCorpusDisplayEquations(chapter,current);
assert.equal(p0.length,p1.length);const changed=[];
for(let i=0;i<p0.length;i++){assert.equal(p0[i].existingLink.text,p1[i].existingLink.text);if(p0[i].tex!==p1[i].tex)changed.push(i);}
assert.equal(changed.length,1);
const idx=changed[0];
assert.equal(p1[idx].tex,p0[idx].tex.replace('(R,','(r_{\\mathrm{los}},').replace('\\partial_R','\\partial_{r_{\\mathrm{los}}}'));
for(const href of links(before))assert.ok(links(current).includes(href),'lost link '+href);
for(const heading of before.match(/^#{1,6} .+$/gm))assert.ok(current.split('\n').includes(heading),'lost heading '+heading);
console.log(JSON.stringify({displays:p0.length,unchanged:p0.length-1,notationOnly:1,originalLinks:links(before).length,headings:before.match(/^#{1,6} .+$/gm).length,hash:digest(current)}));
for(const file of [chapter,report]){
  if(!fs.existsSync(file)){console.log('REPORT NOT YET CREATED: '+file);continue;}
  const s=fs.readFileSync(file,'utf8'),m=mathCheck(s);
  assert.deepEqual(m.errors,[]);assert.equal(m.unrestored,false);assert.ok(!/[ \t]+$/m.test(s));
  const local=links(s).filter(h=>!(/^[a-z][a-z0-9+.-]*:/i.test(h)||h.startsWith('//')));
  for(const href of local){const target=decodeURIComponent(href.split('#')[0].split('?')[0]);assert.ok(fs.existsSync(target?path.resolve(path.dirname(file),target):file),'missing local path: '+href);}
  console.log(JSON.stringify({file,math:m.count,localLinks:local.length,whitespace:'PASS',katex:katex.version}));
}
```

The arithmetic checker below is reproducible from the repository root by passing its block to `node --input-type=module` on standard input. It validates its integration and row parser on known answers before processing the chapter, then checks all 12 table rows and nine groups of algebraic witnesses. The references are the cubic and logarithm antiderivatives and the explicit algebra above; they are independent of the chapter's numerical table. The underlying physical constitutive laws are not tested.


```javascript
import assert from 'node:assert/strict';
import fs from 'node:fs';
function simpson(f,a,b,n=8192) {
  const h=(b-a)/n; let s=f(a)+f(b);
  for(let i=1;i<n;i++) s+=(i%2?4:2)*f(a+i*h);
  return s*h/3;
}
function cells(line) {
  return [...line.matchAll(/\$([^$]*)\$/g)].map(m=>
    Number(m[1].replaceAll('{','').replaceAll('}','').replaceAll(',','').replace('\\%','')));
}
assert.ok(Math.abs(simpson(x=>x*x*x,0,1)-.25)<1e-14);
assert.ok(Math.abs(simpson(x=>1/(1+x),0,1)-Math.log(2))<1e-13);
const d=String.fromCharCode(36);
assert.deepEqual(cells('| '+d+'1'+d+' | '+d+'1{,}234'+d+' | '+d+'2'+d+' | '+d+'-3.4\\%'+d+' |'),[1,1234,2,-3.4]);
console.log('KNOWN CONTROLS PASS before target: cubic and reciprocal integrals; four-cell numeric table extraction.');
const cf=1, scale=299792.458/67.4, om=.315, rad=.000092, lambda=1-om-rad;
const source=fs.readFileSync('content/markdown/aaa/cosmology/cosmology-reconstruction.md','utf8');
const rows=source.split('\n').map(cells).filter(a=>a.length===4&&a.every(Number.isFinite));
assert.equal(rows.length,12);
function standard(z,n) {
  return (1+z)*scale*simpson(x=>Math.exp(x)/Math.sqrt(om*Math.exp(3*x)+rad*Math.exp(4*x)+lambda),0,Math.log1p(z),n);
}
let maxRefinement=0;
for(const [z,expectedL,expectedB,expectedPct] of rows) {
  const L=standard(z,8192),L2=standard(z,16384),B=(1+z)*scale*Math.log1p(z);
  maxRefinement=Math.max(maxRefinement,Math.abs(L-L2));
  assert.ok(Math.abs(L-L2)<1e-6);
  assert.equal(Math.round(L),expectedL);assert.equal(Math.round(B),expectedB);
  assert.equal(Number((100*(B-L)/L).toFixed(1)),expectedPct);
}
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12);
const Z=(ge,gr,y,b,dv)=>Math.log(ge)-Math.log(gr)+y-Math.log(b)-Math.log(dv);
near(Math.expm1(Z(2,1,0,1,1)),1);
near(Math.expm1(Z(1,2,0,1,1)),-.5);
near(Z(3,3,0,1,1),0);
near(Z(1,1,.7,1,1),Z(Math.exp(.2),1,.5,1,1));
near(Z(1,1,0,2,1),-Math.log(2));
near(Z(1,1,0,1,2),-Math.log(2));
near((1/2)/(1/3),1.5); // wavelength ratio differs when endpoint phase speeds differ
near(1/(1+1),.5); // constant H=1 comparison, r=chi, at z=1
near(Math.log(4),Math.log(2)+Math.log(2)); // composition required for one scale history
assert.notEqual(.1+.2,.4); // smooth assignments alone do not impose composition
near(Math.sqrt(2*2),2);near(Math.sqrt(2*1),Math.SQRT2);
near(Math.log1p(1),simpson(z=>1/(1+z),0,1));
near(Math.exp(3*(1-1)*Math.log(2)),1); // w=-1 gives constant dark energy
console.log(JSON.stringify({cf,tableRows:rows.length,maxRefinementMpc:maxRefinement,
  witnesses:'endpoint signs/cancellation; nonidentifiability; source/motion signs; wavelength calibration; spatial H factor; scale composition; flux factors; age integral; w=-1 limit'}));
```

## Generated artifacts and deferred work

Claim grade: measured. The equation-link validator passed for its 23 promoted registry entries; this is narrower than the whole chapter, whose 18 identities were checked against the baseline separately. The equation-generator check returned one error: stale generated registry at content/generated/equation-mapping/corpus-equations.json, over a scan of 199 Markdown files and 4,685 equations. The generator includes source context, so prose and coordinate edits can cause this expected drift. Concurrent corpus edits may also contribute; this receipt does not attribute the whole registry mismatch to this chapter.

Deferred command, not executed: node scripts/build-equation-mapping-corpus.mjs --write. Rerun node scripts/build-equation-mapping-corpus.mjs --check after authorized regeneration. No generated file, fixture, navigation record, shared status, conversion ledger, code, or publication file was edited by this assignment. No staging or other repository-changing Git command was used.

## Remaining obligations and closure limits

- CR-O1 — The endpoint cadence, source transition, launch replay, and signed transport terms need a common independently validated extraction from retained dynamics. The exact residual definition is not that extraction.
- CR-O2 — One effective scale history needs cross-channel consistency, composition, averaging control, and a clock map. A spatial coefficient alone establishes no cosmological age.
- CR-O3 — The photon channel needs independent energy, arrival-time, transparency, beam-area, and spectrum recovery. The luminosity benchmark assumes these conditions.
- CR-O4 — The fixed-void model must be compared with actual calibrated observations and their covariance, source selection, and population evolution. This review performs no catalog, CMB, BAO, lensing, abundance, or growth likelihood analysis.
- CR-O5 — Dark-sector assembly and medium identities need physical constitutive derivation. No retained branch, EOM solver acceptance, theory closure, downstream closure, or cosmological fit follows from the editorial repair.

Recommended next concrete step: the coordinator verifies the final chapter hash, inspects these fourteen dispositions, and integrates priority 60 into the existing shared CRW-005 records. That integration is outside this two-file assignment. The deferred generated-artifact command is retained for the authorized regeneration owner and does not block local repair completion.
