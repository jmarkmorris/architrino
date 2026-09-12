# CRW-005 item 16: Superposition and locality review

Date: 2026-09-12. Assignment: `CRW-005-16`, fresh Dynamics-phase review and bounded repair. The exclusive authored targets are the [chapter](../../../../content/markdown/aaa/validation/simulations/action-energy/superposition-and-locality.md) and this evidence report. The root reviewer implemented the repairs and performed self-review; a separate read-only mathematical reviewer supplied additional analytical counterexamples. Agreement between agents is not independent mathematical evidence. The exact derivations below are the reference evidence.

Status: ✓ Bounded chapter review and repair complete; `SL-1` through `SL-4` implemented and validated. This scope concerns chapter correctness and claim boundaries. It does not establish theory closure, global summability, an evolved assembly, solver certification, stability, conservation, or empirical or particle-identification acceptance. Shared HQ integration remains outside this assignment.

## Source state and review coverage

The initial chapter had 20 lines by `nl -ba`, and scoped `git --no-optional-locks status --short -- <chapter> <report>` returned no entries before edits. The initial chapter SHA-256 from `shasum -a 256` was `3b446c29e9ff40c5dd3034e01f648ecbcecf89e28e3bdd8acfc4d3681fd6dd64`. The checkout HEAD read with `git rev-parse HEAD` was `88568b42ff84cc04149cabab325c8056aac39939`; this identifies the checkout, not all ambient working-copy bytes.

The startup route was `AGENTS.md` → generated startup router → [Corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), through the [architrino-review owner](../../../op/skills/skill-architrino-review.md). The explicit assignment authorizes repairs beyond the review owner's default review-only scope. The live [CRW-005 work-queue entry](../work-queue.md#crw-005--independent-post-conversion-assurance-review) supplies the assurance criteria; its historical counts and next-document prose are not used as current ordering evidence. The [review board](../corpus-review-status.md) recorded item 16 active, and the explicit assignment fixes this single chapter's scope.

Review covered every original paragraph, the single equation, its viewer ID, source scope, nearby definitions, numerical implications, and editorial clarity under academic style edition 1.1. The chapter's conversion is recorded in [the conversion ledger](conversion-ledger.md). Inspection with `git show c973402b9 -- <chapter>` and `git show c973402b9^:<chapter>` shows that the conversion retained the scalar equation and the nearby-dominance claim. This establishes continuity across that inspected transition; it does not identify when either mathematical defect was first introduced.

Live mathematical authorities were the [Master Equation's canonical law](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), [local scalar construction](../../../../content/markdown/aaa/dynamics/master-equation.md#superposition-and-local-wake-geometry), [causality and locality](../../../../content/markdown/aaa/dynamics/master-equation.md#causality-and-locality), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Causal Set and Delay Geometry](../../../../content/markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md), and [Background and Simple Action](../../../../content/markdown/aaa/validation/simulations/action-energy/background-and-simple-action.md). Ontology, absolute time, Euclidean void, coordinate-layer guidance, academic and mathematical style, terminology usage, mathematical terminology, comparative glossary, source policy, and the geometry/dynamics review lens were consulted for the relevant conventions.

At the authority read, `shasum -a 256` returned `bb7357868a4f900aa566b8a43107d111dcd435cab677361f9bba3dceaadb384b` for `master-equation.md`, `a8f8afda3c4b744d8e5b894773eca75d377d8b551beead1b6cfac2685109583f` for `causal-set-and-delay-geometry.md`, and `765331fc396e7fc88ce3c4ee7763a8c0fc7de6e08435648014d88510cfdc6542` for `background-and-simple-action.md`. These hashes identify the inspected working copies; later concurrent owner edits require rereading affected passages.

The Master Equation's operational summary at original authority lines 2615–2637 still uses broad scalar-superposition wording, and the mathematical-terminology superposition row broadly attributes nearby dominance to distance and cancellation. The detailed Master Equation proof at lines 1536–1745 supplies the narrower theorem and its explicit limits. This repair follows that proof without editing either shared authority. No finding asserts that the already proved moving-simple-root scalar identity is missing.

## Findings and implemented dispositions

The original-line references below refer to the 20-line source fingerprint above. Revised-line references refer to the repaired chapter, whose final fingerprint is recorded with validation. Claim grades distinguish a derived counterexample from a measured textual omission. No unsupported numerical failure is inferred from an incomplete explanation.

| Finding | Severity and evidence | Implemented disposition | Falsifier or reopening condition |
| --- | --- | --- | --- |
| `SL-1` — Unrestricted scalar scope | High. Original lines 3–8 assert a net potential at any point from all sources. The fixed-history counterexample below has exactly cancelling acceleration pairs and a divergent raw scalar sum. The live scalar theorem covers compatible regular finite root charts. Claim grade: derived for the counterexample; measured for the textual scope by `nl -ba` of the assigned source. | ✓ Repaired, revised lines 3–12. Preserved the equation and viewer ID; defined the finite transmitter index, all-root inclusion, common receiver/chart data, and scalar-gradient premise. Preserved the canonical moving-root construction and separated density, scalar potential, energy, and nonlinear evolution. | A proved global scalar with a declared subtraction, boundary, singular-event, and summability prescription would support a wider statement. A failure of the local gradient identity on its stated regular chart would require revising the retained local claim. |
| `SL-2` — Nearby dominance ignores the transmitter weight | High. Original heading at line 14 and line 18 imply nearby coherent hits dominate because of inverse-square dilution. The exact regular-root example below gives a farther and older contribution ten times stronger, with equal polarity/coupling magnitudes. Claim grade: derived. | ✓ Repaired, revised lines 16–24. Defined delayed distance and transmitter weight, stated admitted-root conditions, renamed the heading conditionally, and included the prescribed-history counterexample and weight floor. | A uniform weight/root-population bound plus a quantitative signed near/far estimate can establish dominance on a named domain. The example is overturned only if its root equality or kernel arithmetic fails, or an additional stated hypothesis excludes its rows. |
| `SL-3` — Radial source counting lacks its population hypothesis | Medium. Original line 18 says a three-dimensional population has source count proportional to $r^2\,dr$. Dimension alone does not impose constant density, one root per transmitter, or bounded received weights. Claim grade: measured for the missing hypothesis by source inspection; derived for the conditional shell calculation. | ✓ Repaired, revised line 26. Stated a constant-density continuum counting example with stationary transmitters, one root each, and fixed coupling; computed the absolute contribution and separated it from signed cancellation and physical population claims. | A different source-history measure, multiplicity, or radial density changes the shell estimate. A derived population model could support an additional physical conclusion, but none is inferred here. |
| `SL-4` — Declaring a far-field treatment does not control its error | Medium. Original lines 12 and 20 permit prioritizing nearby sources/recent roots after a treatment is named. A finite window can omit a nonzero regular root; a cutoff definition alone gives no comparison to the full law. Claim grade: derived for the omitted-root witness and triangle bound; measured for the incomplete contract by source inspection. | ✓ Repaired, revised lines 28–34. Distinguished current distance from delayed radius and root age; required omitted-contribution bounds; supplied a conditional absolute-tail inequality; explained principal-value ordering and the separate justification for screening or mean subtraction. | A verified zero tail proves exact restriction. A verified nonzero tail bound supports an approximation at its stated tolerance and receiver/time domain. Evolution-error claims additionally require continuous-dependence and event control. |

The original statement that fixed contributions add linearly was correct. Explicitly separating that operation from coupled nonlinear history evolution is an explanatory safeguard accompanying `SL-1`, not an additional demonstrated mathematical error. Likewise, simple-root persistence and singular-root exclusions clarify the domain of the stated law; this review does not claim that the original text explicitly prescribed impulses or a singular continuation.

## Analytical evidence

### Finite scalar construction and the infinite-sum counterexample

Fix reception time and one smoothly continued simple root $s_b(\mathbf X_r)$ for root label $b$. Let $r_b=\|\mathbf X_r-\mathbf X_{t(b)}(s_b)\|$, $\mathbf n_b=(\mathbf X_r-\mathbf X_{t(b)}(s_b))/r_b$, $D_b=c_f-\mathbf n_b\cdot\mathbf V_{t(b)}(s_b)$, and $C_b=\kappa\sigma_b|q_rq_{t(b)}|$. Here $t(b)$ labels the transmitter, $\sigma_b$ is the polarity sign, and the chart has positive separation and a nonzero derivative floor. Differentiating the causal equality at fixed reception time gives

$$
\nabla_{\mathbf X_r}s_b=-\frac{\mathbf n_b}{D_b},\qquad
\nabla_{\mathbf X_r}r_b=\frac{c_f\mathbf n_b}{D_b},\qquad
-\nabla_{\mathbf X_r}\left(\frac{C_b\operatorname{sgn}(D_b)}{r_b}\right)
=\frac{C_bc_f\mathbf n_b}{r_b^2|D_b|}=\mathbf A_b.
$$

The sign of $D_b$ is constant on the connected regular chart. Therefore differentiation of the scalar reproduces the canonical acceleration contribution exactly. Finite addition of these identities proves scalar superposition on a shared chart. This is a local identity derived from the Master Equation geometry; it proves no action principle or conserved energy and does not justify interchanging an infinite sum and a derivative.

For the infinite-sum counterexample set $c_f=1$, receiver event $(T_r,\mathbf X_r)=(0,\mathbf0)$, and stationary same-polarity transmitters at $\pm n\mathbf e_x$ for integers $n\ge1$, where $\mathbf e_x$ is a fixed unit direction. Each transmitter has the unique root $T_t=-n$, range $n$, derivative $D_t=1$, and positive common coupling magnitude $C$. Pair truncation through $N$ gives

$$
\mathbf A_N(\mathbf0)=\mathbf0,\qquad
\sum_{n=1}^{N}\left(\|\mathbf A_{+n}\|+\|\mathbf A_{-n}\|\right)
=2C\sum_{n=1}^{N}\frac1{n^2},\qquad
\Phi_N(\mathbf0)=2C\sum_{n=1}^{N}\frac1n.
$$

The acceleration magnitudes are summable: grouping $n$ between successive powers of two bounds each block by a constant times $2^{-k}$. The scalar diverges: the block from $2^{k-1}+1$ through $2^k$ has $2^{k-1}$ terms each at least $2^{-k}$ and therefore contributes at least $1/2$ to the harmonic sum. Thus even an absolutely convergent acceleration sum does not imply convergence of the raw scalar sum. A scalar with specified subtractions is a different construction. Claim grade: derived for these prescribed histories; they are not asserted to be an evolved infinite system. Falsifier: failure of the root substitutions, pair cancellation, or dyadic estimates would overturn this example.

### Farther and older does not imply weaker

In normalized units $c_f=1$, take a receiver at the origin at $T_r=0$ and two one-dimensional transmitter histories for $s<0$:

$$
X_n(s)=-1,\qquad X_f(s)=-\frac1{100}+\frac{999}{1000}s.
$$

The coordinate axis is embedded in the Euclidean void; $s$ is past absolute emission time. Both coordinates are negative on this interval, so the unit direction toward the receiver is positive. The two root functions are $g_n(s)=1+s$ and $g_f(s)=1/100+s/1000$, obtained from $g=|X(s)|+s$. They are strictly increasing and have the unique roots $-1$ and $-10$. Consequently

$$
(r_n,D_n,W_n^{\mathrm{acc}})=(1,1,1),\qquad
(r_f,D_f,W_f^{\mathrm{acc}})=(10,1/1000,1000),\qquad
\frac{W_f^{\mathrm{acc}}/r_f^2}{W_n^{\mathrm{acc}}/r_n^2}=10.
$$

All ranges and transmitter derivatives are positive; small neighborhoods retain positive floors. No singular root is used. The far transmitter's present coordinate is $X_f(0)=-1/100$, so present proximity is also distinct from emission range. A history window of depth $h=2$ retains the near root and omits the stronger root. These inputs test a prescribed-history claim; no acceleration-balance, equilibrium, dynamical realization, or stability is asserted. Claim grade: derived. Falsifier: an incorrect root substitution, weight, or declared-domain exclusion would invalidate its application.

### Population and truncation bounds

Let $n$ now denote constant transmitter number density in a continuum counting model. With stationary histories, one root per transmitter, and common coupling magnitude $C$, a radial layer contains $4\pi n r^2dr$ roots and contributes $4\pi nCdr$ to the sum of acceleration magnitudes. This statement requires its population assumptions; for example, a discrete population confined to a line does not have this spherical-layer count. The integral over $r\in[R,L]$ is $4\pi nC(L-R)$, so no infinite-radius absolute bound follows. Symmetry can cancel vectors without establishing the required physical distribution or an order-independent limit.

For an omitted set $\mathcal O$ of finite or absolutely summable admitted roots, write $\delta\mathbf A=\sum_{b\in\mathcal O}\mathbf A_b$. The triangle inequality yields

$$
\|\delta\mathbf A\|
\le\sum_{b\in\mathcal O}\|\mathbf A_b\|
=\sum_{b\in\mathcal O}\frac{\kappa|q_rq_{t(b)}|c_f}{r_b^2|D_b|}.
$$

This bounds acceleration error at the stated receiver event. It proves no smallness without an upper estimate below a declared tolerance. A time-uniform acceleration bound and an appropriate history-space evolution estimate are additionally needed to control path error; singular events require their own treatment. Conditional vector sums need a declared ordering and a justified signed-tail estimate. Claim grade: derived on the stated domains. Falsifier: a violation of the triangle inequality for a finite test, a divergent claimed absolute majorant, or a measured omitted contribution exceeding the stated bound rejects the corresponding error claim.

## Open obligations and boundaries

| Obligation | Status and owner | Evidence needed and falsifier |
| --- | --- | --- |
| Global scalar extension | ○ Open; [Master Equation local/global scalar discussion](../../../../content/markdown/aaa/dynamics/master-equation.md#superposition-and-local-wake-geometry). | Prove chart compatibility, singular-boundary handling, source-sum convergence and valid differentiation. Nonmatching charts, nonzero admissible circulation, or a divergent claimed limit rejects the proposed extension. |
| Physical far-field cancellation or screening | ○ Open in this chapter; the [Master Equation's superposition boundary](../../../../content/markdown/aaa/dynamics/master-equation.md#superposition) and the relevant population/medium owner must supply it. | Derive or independently measure source-history statistics, root multiplicity and weights, and a signed tail or physical response bound. A same-domain tail exceeding the bound falsifies the proposed locality claim. |
| Completeness and evolution accuracy | ○ Open for any particular simulation; [Numerical Recipe and Stability](../../../../content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md) supplies the relevant domain and refinement requirements. | Complete retained roots, control omitted history, continue admitted events, and propagate error on the declared history space. A missed root or failed refinement/evolution estimate defeats the proposed certificate. |
| Energy and conservation recovery | ○ Separate obligation; [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md#accepted-construction-routes). | An independently constructed account must match the same roots, histories, and boundary transfers. A nonclosing account or unaccounted history-edge term refutes that account; scalar additivity cannot supply it. |

No observer-level physical law was imported as a primitive premise. The shell example uses Euclidean geometry; the bounds use elementary calculus and vector inequalities. All new numerical examples use $c_f=1$. The chapter contains no external citation or empirical result requiring source acquisition; the review used live internal sources and explicit derivations under the [source policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution).

## Validation record

Before the repair, `node scripts/validate-content.mjs --check --strict` exited 0 and reported 0 errors, 0 warnings, and 30 notes over 391 scene configurations, 199 corpus Markdown files, and 1,639 repository Markdown files. This is a measured content-integrity baseline, not mathematical validation or a whole-repository software-health result.

The focused checker below first passed synthetic positive and negative controls for math extraction, code exclusion, unmatched delimiters, KaTeX rendering, local file/heading resolution, and the existing display parser. Its second control was the analytically known normalized stationary root at emission time -2, range 2, and geometric acceleration magnitude 1/4. Both control passes were printed before the first target read or counterexample evaluation. The finite arithmetic checks then passed the two roots, weights 1 and 10, the depth-2 omission, cancellation of 1,024 stationary pairs, and ten harmonic blocks each at least 1/2. These numerical checks confirm arithmetic; the infinite-limit conclusions rest on the written derivations.

| Check | Measured result and scope |
| --- | --- |
| Focused KaTeX and local links | ✓ Passed using the app's vendored KaTeX bundle with `throwOnError: true` and strict rendering: chapter 48 expressions, including 1 display, and 7 local links; evidence report 52 expressions, including 5 displays, and 17 local links. Local Markdown fragments were matched against target headings. The checker covers these files' dollar-delimited math and ordinary Markdown links, not all Markdown dialects, external HTTP availability, or visual layout. |
| Equation preservation | ✓ Existing `parseCorpusDisplayEquations` found the chapter's single original display with unchanged TeX and viewer ID `corpus-equation-7b385746e404ec84`; its formula also matches the stored registry entry. Context freshness is a separate check. |
| Scoped whitespace | ✓ `git diff --check -- <chapter> <report>` exited 0. The additional `git diff --no-index --check /dev/null <report>` emitted no whitespace diagnostics and returned 1 for the nonempty comparison. A separate Node whitespace detector first accepted clean text and located a synthetic trailing space on line 1, then found no trailing spaces or tabs in either authored target and verified both final newlines. |
| Strict content validation after repair | ✓ `node scripts/validate-content.mjs --check --strict` exited 0: 0 errors, 0 warnings, 30 notes, 391 scenes, and 199 corpus Markdown files. The first post-repair invocation audited 1,641 repository Markdown files; the final rerun after adding the reproducible checker audited 1,642 and returned the same successful summary. The audited file count reflects concurrent work; this is a content-integrity result, not proof or whole-repository software acceptance. |
| Equation registry freshness | ○ Deferred generated drift. `node scripts/build-equation-mapping-corpus.mjs --check` exited 1, reporting the stale `content/generated/equation-mapping/corpus-equations.json` and a missing canonical source link for `corpus-equation-cd180315de09143c`; its census was 4,685 displays. A known-case-first scan using the existing display parser located one unlinked display under `content/markdown/aaa`, in `validation/simulations/action-energy/self-interaction-switch.md` at line 29. That chapter is outside this worker's scope. Attribution to a particular edit or agent was not established. Required later command: `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`. |
| Textbook navigation freshness | ○ Deferred generated drift. `node scripts/build-scene-graph.mjs --check` exited 1 and named `content/graph/textbook_toc.json` and `content/generated/markdown/textbook/toc.md`; it reported 0 structural errors and 0 warnings. The retained generated TOC still shows the chapter's old nearby-dominance heading by direct source inspection. Required later command: `node scripts/build-scene-graph.mjs --write`, followed by its `--check`. |

The final chapter SHA-256 from `shasum -a 256` is `4d0a21022ec9879a9e54c21e5ebe75867193d89d3dae48b08ec3d4ec32ef49dd`. Scoped `git diff --numstat` reports 21 inserted and 7 removed lines; scoped status identifies the chapter as modified and this report as untracked. These instruments establish the two authored outputs, not the state of unrelated paths. Generated equation context and navigation changes are expected source-derived follow-up work; no generator was run in write mode. The separate mathematical reviewer reread both outputs and confirmed the four repair dispositions without finding a remaining substantive chapter defect; that review is corroborating analysis, while the displayed derivations remain the mathematical evidence.

No software source, shared HQ record, unrelated chapter, or generated artifact was edited by this worker. No staging, commit, push, PR mutation, or worktree operation was performed. The HQ owner can integrate the four repaired dispositions while retaining the open obligations above. Bounded completion does not close `CRW-005` as a campaign.

### Focused reproduction

Run from the repository root. The known cases execute before target reads on every run. No files are written.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { loadVendoredCommonJsBundle } from './scripts/load-vendored-commonjs-bundle.mjs';
import { parseCorpusDisplayEquations } from './scripts/build-equation-mapping-corpus.mjs';
const katex = loadVendoredCommonJsBundle('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js');
const chapter = 'content/markdown/aaa/validation/simulations/action-energy/superposition-and-locality.md';
const report = 'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-superposition-and-locality-review-2026-09-12.md';
function prose(s) {
  return s.replace(/(^|\n)[ \t]*(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?\n[ \t]*\2[ \t]*(?=\n|$)/gu, '$1')
    .replace(/(\x60+)[^\n]*?\1/gu, '');
}
function math(s) {
  const p = prose(s);
  const re = /\$\$([\s\S]*?)\$\$|\$([^\n$]+)\$/gu;
  const out = [...p.matchAll(re)].map(m => ({tex: m[1] ?? m[2], display: m[1] !== undefined}));
  assert.ok(!p.replace(re, '').includes('$'), 'unmatched math delimiter');
  return out;
}
function links(s) {
  return [...prose(s).matchAll(/\[[^\]\n]+\]\(([^)\n]+)\)/gu)].map(m => m[1]);
}
function slug(s) {
  return s.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').trim().replace(/\s/gu, '-');
}
function anchors(s) {
  return [...prose(s).matchAll(/^#{1,6}\s+(.+)$/gmu)].map(m => slug(m[1]));
}
function checkLink(file, href, records) {
  if (/^[a-z]+:/iu.test(href)) return;
  const [relative, fragment] = href.split('#');
  const target = relative ? path.resolve(path.dirname(file), decodeURIComponent(relative)) : path.resolve(file);
  assert.ok(fs.existsSync(target), 'missing target: ' + href);
  if (!fragment) return;
  if (target.endsWith('equation-mapping.html')) {
    assert.ok(records.some(r => r.id === fragment), 'missing equation ID: ' + fragment);
  } else if (target.endsWith('.md')) {
    assert.ok(anchors(fs.readFileSync(target, 'utf8')).includes(decodeURIComponent(fragment)), 'missing heading: ' + href);
  } else {
    throw new Error('unsupported fragment target: ' + href);
  }
}
const control = '# Known heading\n$x+1$\n$$\ny=2\n$$\n[good](AGENTS.md)\n\x60$ignored$ [bad](missing)\x60\n~~~text\n$ignored$ [bad](missing)\n~~~';
assert.deepEqual(math(control).map(x=>x.tex.trim()), ['x+1','y=2']);
assert.deepEqual(links(control), ['AGENTS.md']);
assert.deepEqual(anchors(control), ['known-heading']);
assert.throws(()=>math('$unclosed'));
assert.ok(katex.renderToString('x^2', {throwOnError:true}).includes('katex'));
assert.throws(()=>katex.renderToString('\\notARealCommand', {throwOnError:true}));
assert.equal(parseCorpusDisplayEquations('known.md', control).length, 1);
checkLink('known.md', 'AGENTS.md#guiding-objective', []);
assert.throws(()=>checkLink('known.md', 'AGENTS.md#definitely-absent-heading', []));
assert.throws(()=>checkLink('known.md', 'definitely-absent-crw005-file.md', []));
console.log('KNOWN CASES PASS: math/code exclusion, unclosed delimiter, KaTeX positive/negative, display census, links/headings positive/negative.');
const amplitude = (r,D) => 1/(r*r*Math.abs(D));
const gap = (a,v,s) => Math.abs(a+v*s)+s;
assert.equal(amplitude(2,1), 0.25);
assert.equal(gap(-2,0,-2), 0);
console.log('KNOWN CASES PASS: stationary normalized root at -2, range 2, amplitude 1/4.');
assert.equal(gap(-1,0,-1), 0);
assert.ok(Math.abs(gap(-0.01,0.999,-10)) < 1e-12);
assert.equal(amplitude(1,1), 1);
assert.ok(Math.abs(amplitude(10,1-0.999)-10) < 1e-12);
assert.ok(-10 < -2 && -1 > -2);
let harmonic = 0, vector = 0;
for(let n=1;n<=1024;n++){ harmonic += 1/n; vector += 1/(n*n)-1/(n*n); }
assert.equal(vector,0);
for(let k=1;k<=10;k++){
  let block=0;
  for(let n=2**(k-1)+1;n<=2**k;n++) block+=1/n;
  assert.ok(block>=0.5);
}
console.log('ANALYTICAL WITNESS ARITHMETIC PASS: root formulas checked at -1/-10; geometric weights 1 and 10; horizon 2 omits stronger root; 1024 stationary pairs cancel; 10 harmonic blocks exceed 1/2. Infinite claims use the written proof.');
const records=JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8')).records;
for(const file of [chapter,report]){
  const source=fs.readFileSync(file,'utf8');
  const expressions=math(source), destinations=links(source);
  for(const e of expressions) katex.renderToString(e.tex,{displayMode:e.display,throwOnError:true,strict:'error'});
  for(const href of destinations) checkLink(file,href,records);
  console.log(JSON.stringify({file,math:expressions.length,displays:expressions.filter(e=>e.display).length,links:destinations.length,result:'PASS'}));
}
const displays=parseCorpusDisplayEquations(chapter,fs.readFileSync(chapter,'utf8'));
assert.equal(displays.length,1);
assert.equal(displays[0].tex,'\\Phi_{\\text{net}}=\\sum_i\\Phi_i');
assert.ok(fs.readFileSync(chapter,'utf8').includes('#corpus-equation-7b385746e404ec84'));
const existing=records.find(r=>r.id==='corpus-equation-7b385746e404ec84');
assert.equal(existing.formulaTeX.trim(),displays[0].tex);
console.log('PRESERVATION PASS: original display formula and existing equation ID unchanged; registry context freshness checked separately.');

NODE
```
