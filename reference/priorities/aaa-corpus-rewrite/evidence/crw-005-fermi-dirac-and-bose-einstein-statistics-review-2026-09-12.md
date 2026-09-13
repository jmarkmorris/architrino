# CRW-005 — Fermi-Dirac and Bose-Einstein Statistics bounded review

## Scope and provenance

Priority 58 concerns [Fermi-Dirac and Bose-Einstein Statistics](../../../../content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md). The operator authorized review and the smallest local repairs in that chapter, plus this evidence receipt. This is the editor's complete-document self-review, with explicit mathematical witnesses and checked external comparison sources. It is not an independent scientific certification.

All numerical examples and witnesses use normalized wake-speed units, $c_f=1$. The effective quantum and geometric examples below establish their stated mathematical distinctions only.

Measured by scoped `git --no-optional-locks status --short -- <chapter> <receipt>` before editing, neither authorized path had a change entry. The receipt was absent by `test ! -e`. The complete baseline chapter was read with `nl -ba` through line 331. `shasum -a 256` matched the dispatch baseline:

```text
ed39ca4982dd4b1b872f427481471489bdf6716b7affea2ed4aa85005b4d4965
```

The baseline bytes are available at commit `72847589ba73d0bf81d07ca5b27d98072659cee9`, verified by the reproduction script below using `git show` and SHA-256. Baseline references below mean lines in that exact 331-line version; repaired references mean the reviewed 345-line chapter. A different live hash invalidates the applicability of these line references and requires a fresh comparison.

Only the chapter and this receipt were written by this task, using `apply_patch`. Shared trackers, other chapters, code, fixtures, generated artifacts, and publication files are outside the assignment. No Git mutation, generator write, solver run, or linked worktree was used. Ambient staged and unstaged changes were preserved.

## Authorities and sources inspected

The startup reads covered [AGENTS.md](../../../../AGENTS.md), the [generated router](../../../op/agent-startup-orientation.generated.md), the [review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live owner](../../../op/skills/skill-architrino-review.md), the [complete corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), and the [operator explanation standard](../../../op/operator-explanation-standard.md). The explicit repair assignment supersedes the review procedure's review-only default within these two paths.

The [priority owner](../priorities.md), [CRW-005 work-queue entry](../work-queue.md#crw-005--independent-post-conversion-assurance-review), [live document board](../corpus-review-status.md), and [conversion ledger](conversion-ledger.md) were inspected for scope, current ordering, and preservation. The board's priority-58 row identified this chapter as unopened at intake. The ledger's edition-1.0 entry records the 2026-09-04 explanatory conversion; the present review uses current edition-1.1 exposition and the supplied dispatch baseline, not an unverified reconstruction of that earlier conversion.

Task-relevant canon reads covered:

- [Academic Style Guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), [Mathematics Style Guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [Mathematics Terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [Terminology Usage](../../../../content/markdown/aaa/archie/terminology-usage.md), and [Comparative Glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md): claim levels, local definitions, coordinate layers, candidate braid status, and preservation conventions. The [geometry/dynamics review lens](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) supplied review perspectives, not independent evidence.
- [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), and the opening coordinate-reconstruction boundaries in [Detecting](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md) and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md).
- [Absolute Time, provenance and identity](../../../../content/markdown/aaa/foundations/absolute-time.md#provenance-and-identity-through-time), especially lines 375–377, and [Master Equation, fundamental symmetries](../../../../content/markdown/aaa/dynamics/master-equation.md#fundamental-symmetry-group), lines 5510–5541: transporting descriptions is distinct from changing physical histories.
- [Noether Braid](../../../../content/markdown/aaa/noether-braid/noether-braid.md), opening through neutral inventory, and [Braid Envelope Geometry](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md), especially lines 29–155: geometric interface, derived acceleration weight, and conditional packing stress.
- [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#same-record-spinor-label-pullback), lines 2035–2166, and downstream-use lines 2780–2784: the same-record label pullback remains a theorem target.
- [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md), opening through the effective-state contract: pure-state normalization, mixed-state density operators, and the underived quantum map.

The chapter's reference policy was checked against [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution). Two external comparisons were inspected:

1. James Nakamura, Shuang Liang, Geoffrey C. Gardner, and Michael J. Manfra, “Direct observation of anyonic braiding statistics,” *Nature Physics* **16**, 931–936 (2020), [DOI](https://doi.org/10.1038/s41567-020-1019-1), and the [author manuscript](https://arxiv.org/html/2006.14115v1), sections I–III, equation (1), and figure 1's exchange/encircling explanation. The reported interferometer measures conductance; its phase extraction depends on the electromagnetic and charging model. This checks the existing citation's scope and the factor of two between exchange and encircling.
2. David Tong, [Statistical Physics, “Quantum Gases,” sections 3.5.1 and 3.6](https://www.damtp.cam.ac.uk/user/tong/statphys/statmechhtml/S3.html): the ideal grand-canonical occupation distributions, their one-state counting, and the Bose convergence restriction. The algebra below is also shown directly. These are effective comparison premises, not architrino-level laws.

No external source was used to certify the proposed physical assembly geometry.

## Findings and repairs

The following 15 finding groups comprise 11 High and 4 Medium findings. High means an incorrect implication, missing mathematical domain, or claim-authority gap can change the stated result. Medium means a material explanatory or scope defect with the central conditional construction retained. All are locally repaired; physical obligations remain open.

### FBS-01 — High: same effective state is not identical substrate history

Baseline lines 25, 33–42 required coincidence of spatial mode, ordered frame, wake history, and closure while speaking as though geometric support established exclusion. But the chapter's effective quotient explicitly allows different underlying histories to map to the same state. Pauli exclusion concerns that complete effective state, not literal equality of histories. A criterion that excludes only identical histories would miss distinct representatives of the same effective state.

The repair at lines 27 and 35–44 requires the two-assembly result across representatives, defines orthogonality by the effective inner product, and separates absence of a Pauli prohibition from physical coexistence or binding. Three indexed binaries contribute to the acceleration and retention calculation; their mere presence does not establish stabilizing density.

Claim grade: derived as a distinction between equality before and after a many-to-one map; guessed for the proposed assembly exclusion mechanism. Falsifier: an injective extraction on the entire declared physical domain would remove the distinct-representative example; an independently retained same-effective-state two-assembly branch would falsify the proposed physical exclusion on that domain.

### FBS-02 — Medium: envelope size does not determine pressure

Baseline lines 27–29 moved from a finite envelope to an effective packing pressure and stated that packing explained an overlap cost. Geometry alone does not specify a stress response or energy-volume dependence. In an effective comparison, two response laws on the same geometric domain can have different stresses; therefore size cannot select their sign or magnitude.

Lines 29–31 retain the pressure analogy while requiring the packing-channel stress and population/boundary response from the same retained histories. Claim grade: derived for this logical insufficiency; guessed for a positive physical packing response until computed. Falsifier: a declared independent theorem fixing the stress from this envelope data alone would close the missing premise. The existing envelope owner's pressure formula takes stress as input and does not supply that theorem.

### FBS-03 — High: bosonic statistics does not require coherence

Baseline lines 11–15 and 64–74 repeatedly identified shared occupation with phase-compatible coherent support and called dimensional reduction necessary. A mixture diagonal in bosonic number states remains entirely in the bosonic sector while lacking a fixed coherent amplitude. It is therefore a counterexample to coherence as a necessary condition for bosonic statistics.

Lines 13–17 and 68–78 preserve the coherent-planar route as a particular hypothesis and include thermal incoherent populations. Lines 7 and 82–106 keep composite and other massive bosonic channels distinct. Claim grade: derived within the stated effective Fock-state comparison; guessed for the planar physical mechanism. Falsifier: a derivation that every symmetric preparation has a nonzero phase-coherent amplitude would contradict the number-diagonal counterexample.

### FBS-04 — High: a shape cutoff does not classify exchange or prove a planar transition

Baseline lines 120, 132–149 described cutoffs as calibrated, called the general rest envelope oblate despite the fusiform family, and assigned neutral volumetric inventory to the Fermi-Dirac side. For a spheroid, volume is proportional to the positive shape ratio at fixed transverse radius. Small ratio also need not mean small absolute thickness: choosing transverse radius $n$ and ratio $1/n$ leaves the longitudinal semiaxis equal to one.

Lines 124 and 136–153 restrict the cutoffs to the proposed oblate-family diagnostic, require a response calibration, retain a separate fusiform calibration, and leave neutral exchange unresolved without its physical sign. Line 334 asks whether a transition exists rather than presupposing its stability threshold. Claim grade: derived for the geometric witnesses and insufficiency of charge/shape classification; guessed for the proposed physical family map. Falsifier: the stated spheroid volume or fixed-thickness witness failing would overturn the geometric objection; a complete exchange theorem could establish a restricted physical classification.

### FBS-05 — High: rotation and exchange need an identification; a discrete sign cannot vary continuously

Baseline lines 44–58 and 153–166 required the same ordered-frame row but omitted the distinction between rotating one assembly and exchanging two. The spin owner itself leaves the pullback as a theorem target. Moreover, in a continuous scalar representation of an unchanged permutation sector, an elementary exchange obeys $s(\lambda)^2=1$. Its image lies in the discrete set of signs, so connectedness makes the sign constant. A smooth shape change alone cannot join the two signs.

Lines 58–62 and 170–172 state the missing two-assembly identification and require the sign-changing route to identify a changed sector, configuration space, representation, or branch continuity. The original conditional co-variation equation remains intact. Claim grade: derived from the permutation relation and continuity; guessed for physical spin-statistics recovery. Falsifier: a continuous scalar sign on a connected interval satisfying $s^2=1$ everywhere while taking both signs would refute the lemma. Leaving that domain is a changed premise, not such a counterexample.

### FBS-06 — High: internal flatness, motion confinement, and contractibility were conflated

Baseline lines 80, 106–120 referred to contractible three-dimensional exchanges and paired bosonic behavior with a contractible shared-support path. For two identical separated pointlike objects in three dimensions, relative separation modulo sign has angular space $\mathbb{RP}^2$: a single exchange is the nontrivial loop, while its square is trivial. In the plane the angular space is a circle, retaining an integer winding. These statements concern the configuration space of positions, not the thickness of internal support.

Contractible loops can also have nonzero geometric holonomy when a connection has curvature. On the plane, the connection one-form $A=(-y\,dx+x\,dy)/2$ has integral $\pi$ around the unit circle, giving phase $-1$ despite contractibility. A flat statistical connection removes this counterexample; the original passage had not imposed that condition.

Lines 84, 110–124 state the configuration-space assumptions, distinguish exchange and shape, and separate statistical from other phases. Claim grade: derived within the specified topology and connection examples. Falsifier: a contraction of the nontrivial two-object exchange within collision-free unordered three-dimensional configuration space, or a zero integral for the stated one-form around the unit circle, would overturn the corresponding witness. Extended assembly histories require their own configuration-space analysis.

### FBS-07 — Medium: composition formulas need a statistical phase convention

Baseline lines 80–100 correctly distinguished permutation parity from the $m^2$ Abelian anyon law, but the wording “winds ... around” left elementary exchange versus full encircling ambiguous. Binding and adiabaticity alone also do not remove internal twists or non-statistical phases.

Lines 84–104 state factorization for the permutation product and the no-extra-twist positive exchange with $m^2$ crossings for identical Abelian anyons. Reversing orientation conjugates the phase; a full encircling doubles it. The original displayed formulas remain unchanged. Claim grade: derived from multiplication in the declared scalar representation. Falsifier: a braid with those crossing and framing assumptions whose phase differs from $e^{im^2\alpha}$ would refute the scalar composition claim. Non-Abelian fusion or extra twists are outside its domain.

### FBS-08 — High: exchange residuals admitted zero maps and conflated pure and mixed states

Baseline lines 170–198 and 257–273 did not require normalized extraction or establish the many-excitation tensor composition. Setting the extraction to zero makes every displayed exchange leakage term zero. Defining extraction by applying the desired projector also makes sector membership automatic. General thermal ensembles need density operators, not an arbitrary ensemble-to-amplitude identification.

Lines 176, 204, 263, and 279 specify the additional composition target, normalized pure extraction, positive unit-trace mixed states, and independently fixed extraction/observables. The density-matrix witness in line 279 is exchange-invariant yet has half its support in each sector, so permutation invariance alone is insufficient. Claim grade: derived by the zero-map and two-state matrix witnesses. Falsifier: nonzero leakage for the zero map, or sector weights other than one half for the stated mixture, would overturn those witnesses. A physically derived extraction remains a separate obligation.

### FBS-09 — High: provenance comparison and failure interpretation lacked a domain

Baseline lines 271–273 called an unspecified label swap “the same retained physical ensemble” and inferred that failure meant the rule had been imposed. The live provenance owners distinguish complete passive reindexing from changing attached histories. Neither absence of observer access nor failure of a candidate residual establishes physical equivalence or an explanation of why the candidate failed.

Line 277 requires a declared comparison, full passive transport, separate admissibility for active changes, and an observable seminorm insensitive to global phase. It restricts failure to the tested extraction and domain. Claim grade: derived for the implication limits; measured for the cited owner comparison. Falsifier: an operationally distinguishing response in a claimed equivalent pair rejects that equivalence; failure by one extraction cannot eliminate another without an exhaustive theorem.

### FBS-10 — High: Slater normalization omitted orthonormality

Baseline lines 200–210 used the factor $1/\sqrt{N!}$ for unspecified one-particle states. Expanding the determinant norm produces $N!\det G$, where $G$ is the orbital Gram matrix, so the displayed factor yields squared norm $\det G$. Two normalized orbitals of overlap $1/2$ give $1-1/4=3/4$, not one.

Lines 206–216 restrict the displayed normalized benchmark to orthonormal spin-orbitals and give the Gram normalization for general independent orbitals. Linear dependence, not only duplicate rows, makes the determinant zero. Claim grade: derived by the determinant expansion and the two-orbital witness. Falsifier: the explicit overlap-$1/2$ determinant having norm one with the original factor would overturn the counterexample.

### FBS-11 — High: exchange integrals are interaction energies on a restricted orbital domain

Baseline lines 212–255 compared unspecified predicted energies to $J_{ab}\pm K_{ab}$ and maximized over unspecified pairs. Those expressions are electron-electron interaction expectations for distinct orthonormal spatial orbitals. They omit one-body energies; nonorthogonal orbital combinations require division by $1\pm|S_{ab}|^2$, and identical orbitals have no antisymmetric spatial state.

Lines 218, 246, and 261 define the fixed-orbital Coulomb comparison, common one-body subtraction, pair domain, full spin-and-space extraction, effective coordinates, and dimensional tolerances. Expanding the normalized states $|ab\rangle\pm|ba\rangle$ gives their squared norms $2(1\pm|S_{ab}|^2)$ and interaction numerators $2(J_{ab}\pm K_{ab})$. This is algebra for a symmetric two-body comparison operator, not a primitive Coulomb law for architrinos. Claim grade: derived. Falsifier: a direct expectation for the stated normalized two-orbital states differing from that expansion would refute the repair.

### FBS-12 — High: an energy-bin count was compared to a single-state mean

Baseline lines 293–304 defined $N_E$ as a whole energy-bin count while targeting the one-mode distribution. For three degenerate modes each with mean one, the bin mean is three. The missing degeneracy cannot be removed by changing the sampling measure.

Line 303 defines the retained $N_E$ as one fully resolved mode counter, preserving the original displayed equation, and separately explains degenerate bins and finite-width density-of-states sums. Claim grade: derived by linearity of expectation. Falsifier: three counters each of mean one summing to a mean other than three would refute this counting identity.

### FBS-13 — High: thermal domains and convergence requirements were unstated

Baseline lines 277–304 did not delimit independent-mode equilibrium, the Bose chemical-potential domain, the meaning of the convergence arrow, or the conditions for zero photon chemical potential. The bosonic geometric series fails when $E-\mu_{\mathrm{chem}}\le0$ in the finite grand-canonical comparison. The formal formula at $x=-\log2$ even gives negative occupation.

Lines 299–314 derive the two single-mode sums, require equilibrium and an admissible energy chart, distinguish the condensate limit, and keep driven light separate from a thermal population. The same-measure arrow requires a declared limiting and sampling argument, not a finite matching mean. Claim grade: derived for the finite sums and convergence domain; guessed for their emergence from native histories. Falsifier: convergence of the nonnegative bosonic series at $x\le0$ would refute the restriction. A physical occupation recovery must additionally survive independently specified preparation and equilibrium tests.

### FBS-14 — Medium: local terms and residual units needed definitions

Baseline lines 5–7, 44–58, 170–180, 240–273, and 291–304 used ordered rows, parity, chart parameters, extraction, and tolerance symbols without enough local explanation. Lines 5, 35, 58, 176, 218, 261, 263, and 299–303 supply the load-bearing meanings and retain the established notation.

Claim grade: measured by complete baseline reading against the academic and math guides. Falsifier: identifying local baseline definitions sufficient to determine the omitted objects and units would narrow this finding. Definitions improve readability and type checking but supply no missing physical derivation.

### FBS-15 — Medium: the anyon citation needed a measured-object boundary

Baseline line 113 correctly cited fractional braiding evidence but placed it immediately after an elementary exchange phase without explaining the interferometer's full encircling measurement. The author manuscript's section I and figure 1 explicitly distinguish two exchanges from one encircling. Its conductance model includes other phase contributions.

Lines 117 and 345 retain the source, specify the measured comparison and factor of two, and add durable bibliographic identity. Claim grade: measured from the cited primary manuscript, with the experiment's model-dependent scope retained. Falsifier: a source showing that the reported phase corresponds to a single exchange rather than the stated encircling, or that the chapter misidentifies the device, would invalidate the correction. No architrino statistics is established by this observation.

## Preservation and validation

The complete repaired chapter was reread through line 345 before the final checks. Existing display equations were retained; all changes to their mathematical domains and meanings are stated in the surrounding prose. The new finite-dimensional witnesses test those mathematical distinctions, not physical branch generation.

The binder inventory was inspected before editing by `rg` over the chapter path in `scripts/`, `tests/`, `content/graph/`, and the CRW owners. It found navigation entries and the `noether-braid.exchange-statistics` entry in [foundational impact contracts](../../../../scripts/config/foundational-impact-contracts.json), which names content and [frequency-triplet notation checks](../../../../scripts/angular-momentum/check-frequency-triplet-notation-drift.mjs). The [equation generator](../../../../scripts/build-equation-mapping-corpus.mjs), lines 693–735, shows that check mode reads authored equations/context and reports registry drift without writing. This inventory is scoped; it is not a claim that no other consumers exist.

Before any document-target custom check, the in-memory math/link extractor was run on a synthetic document with exactly two math expressions, two links, one heading and one displayed equation identity. It skipped fenced/inline-code decoys and rejected malformed math and an unknown KaTeX command. The tool output recorded `CONTROL PASS`. The arithmetic helpers separately passed known dot/tensor/matrix/trace/phase calculations and a rejection control before document-specific witnesses were run. No target evidence was inferred from the initial JavaScript orchestration syntax error, which executed no shell command; the corrected control invocation passed before target use.

The reproducible script below runs controls before targets. It checks KaTeX syntax, balanced math, local file existence, whitespace, unchanged displayed bytes/viewer identities, preservation of original heading/link targets, and eight arithmetic witness groups. Link checks here establish file resolution, not external URL availability or arbitrary renderer fragment semantics; the new packing-pressure anchor was verified against its live heading. Source preservation against the dispatch commit is a byte check, not independent correctness evidence.

Measured validation results on 2026-09-12, after the complete chapter reread:

| Instrument and scope | Result and evidentiary limit |
| --- | --- |
| Embedded read-only script, both authorized paths | Passed known-case-first math/KaTeX, file-link resolution, preservation, whitespace, and eight arithmetic witness groups. The chapter has 165 math expressions and 34 local-path link occurrences. Receipt expression counts are emitted on each run because its validation prose is updated during closeout. |
| Baseline-versus-final comparison in the embedded script | All 16 original displayed equations and their viewer links remain byte-identical; all 13 original headings and all 33 original link-target occurrences remain represented. New prose supplies the corrected domains; preservation is not a correctness proof. |
| `node scripts/validate-content.mjs --check --strict` | Initial and completed-receipt reruns both exited 0 with 0 errors, 0 warnings, and 30 notes. The initial run audited 1703 repository Markdown files; the later shared-checkout snapshot audited 1705. Both discovered 199 corpus Markdown files. The notes concern navigation and other declared audits, not a scientific acceptance result. |
| `node scripts/angular-momentum/check-frequency-triplet-notation-drift.mjs` | Exit 0: 1299 files scanned; no matches for that checker's legacy triplet patterns. |
| Scoped `git --no-optional-locks diff --check HEAD --` over the chapter and receipt; embedded trailing-whitespace check | Passed. The embedded check includes the untracked receipt, which ordinary Git diff does not include. |
| `rg -c` over the receipt's finding headings | 11 High and 4 Medium; FBS-01–FBS-15. |
| `shasum -a 256` and the embedded Node SHA-256 computation over the chapter | Both returned the final hash below. |

Final chapter SHA-256:

```text
96594ded903814c0b282c68e034c94d3f96fb0b067ba0adc44c0b0336c920faf
```

The equation-registry command `node scripts/build-equation-mapping-corpus.mjs --check` exited 1 with the single reported issue `generated registry is stale: content/generated/equation-mapping/corpus-equations.json`. That run reported 199 corpus files, 4685 display equations, 23 promoted equations, and 30444 symbol definitions. Authored equation context changed in this task; the shared checkout can contain other concurrent source changes, so the aggregate drift is not attributed exclusively to this chapter. No registry write was performed. The deferred exact command for the authorized regeneration owner is:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
```

The regeneration owner must rerun the corresponding `--check` afterward. This expected generated-context drift does not block the bounded source review. The local finding repairs and receipt are ready for coordinator adjudication; scientific obligations and shared integration remain as listed below.

### Read-only reproduction script

Run the fenced JavaScript below with `node --input-type=module` from the repository root. It writes no files. All numerical witnesses use normalized wake-speed units, $c_f=1$; they are finite mathematical comparisons, not EOM solver results.

```javascript
import assert from 'node:assert/strict';
import katex from 'katex';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const bc=String.fromCharCode(96);
function stripCode(s){return s.replace(new RegExp('^[ \\t]*('+bc+'{3,}|~{3,})[^\\n]*\\n[\\s\\S]*?^[ \\t]*\\1[ \\t]*$','gm'),'').replace(new RegExp('('+bc+'+)[\\s\\S]*?\\1','g'),'');}
function math(s){
  s=stripCode(s); const out=[]; let p=0;
  while(p<s.length){if(s[p]!=='$'||(p>0&&s[p-1]==='\\')){p++;continue;}
    const d=s[p+1]==='$'?'$$':'$'; const a=p+d.length; let b=a;
    while(b<s.length && !(s.slice(b,b+d.length)===d&&s[b-1]!=='\\'))b++;
    assert(b<s.length,'unclosed math'); const tex=s.slice(a,b);
    assert(tex.trim(),'empty math'); if(d==='$')assert(!tex.includes('\n'),'multiline inline math');
    out.push({tex,displayMode:d==='$$'});p=b+d.length;
  }return out;
}
function links(s){return [...stripCode(s).matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)].map(m=>m[1]);}
function headings(s){return [...stripCode(s).matchAll(/^#{1,6} (.+)$/gm)].map(m=>m[1]);}
const good='# Test\n\n$x+1$\n\n$$\ny^2\n$$\n\n[View →](../../../../equation-mapping.html#corpus-equation-control)\n\n[one](AGENTS.md)\n\n'+bc+'$broken'+bc+'\n\n'+bc.repeat(3)+'md\n[bad](missing)\n$$broken\n'+bc.repeat(3)+'\n';
assert.deepEqual(math(good),[{tex:'x+1',displayMode:false},{tex:'\ny^2\n',displayMode:true}]);
assert.deepEqual(links(good),['../../../../equation-mapping.html#corpus-equation-control','AGENTS.md']);
assert.deepEqual(headings(good),['Test']);
assert.throws(()=>math('$unclosed'));assert.throws(()=>math('$a\nb$'));
assert.throws(()=>katex.renderToString('\\notARealCommand',{throwOnError:true}));
for(const x of math(good))katex.renderToString(x.tex,{throwOnError:true,strict:'error',displayMode:x.displayMode});
const blocks=parseCorpusDisplayEquations('content/markdown/aaa/control.md',good);
assert.equal(blocks.length,1);assert.equal(blocks[0].tex,'y^2');
assert(blocks[0].existingLink.text.includes('corpus-equation-control'));
console.log('CONTROL PASS: 2 math expressions, 2 links, 1 heading/display ID; fenced/inline-code decoys skipped; invalid math rejected.');

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const chapter='content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md';
const receipt='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-fermi-dirac-and-bose-einstein-statistics-review-2026-09-12.md';
function localTarget(base,target){if(/^(https?:|mailto:|tel:|data:)/.test(target))return null;const clean=decodeURIComponent(target.split('#')[0].split('?')[0]);return clean?path.resolve(path.dirname(base),clean):path.resolve(base);}
assert.equal(localTarget('/repo/a/b.md','../c.md#heading'),'/repo/c.md');
assert.equal(localTarget('/repo/a/b.md','https://example.org'),null);
assert.equal(localTarget('/repo/a/b.md','#heading'),'/repo/a/b.md');
console.log('CONTROL PASS: local-path resolver handles parent, external, and fragment targets.');
for(const f of [chapter,receipt]){
 const s=fs.readFileSync(f,'utf8');
 for(const item of math(s))katex.renderToString(item.tex,{throwOnError:true,strict:'error',displayMode:item.displayMode});
 const local=links(s).map(t=>localTarget(f,t)).filter(Boolean);
 for(const target of local)assert(fs.existsSync(target)&&fs.statSync(target).isFile(),target);
 assert(!/[\t ]+$/m.test(s),'trailing whitespace: '+f);
 console.log(JSON.stringify({file:f,mathExpressions:math(s).length,localPathLinks:local.length,headings:headings(s).length}));
}
const base=execFileSync('git',['show','72847589ba73d0bf81d07ca5b27d98072659cee9:'+chapter],{encoding:'utf8'});
assert.equal(crypto.createHash('sha256').update(base).digest('hex'),'ed39ca4982dd4b1b872f427481471489bdf6716b7affea2ed4aa85005b4d4965');
const final=fs.readFileSync(chapter,'utf8');
const before=parseCorpusDisplayEquations(chapter,base),after=parseCorpusDisplayEquations(chapter,final);
assert.equal(after.length,before.length);
for(let i=0;i<before.length;i++){
 assert.equal(final.slice(after[i].openStart,after[i].closeEnd),base.slice(before[i].openStart,before[i].closeEnd));
 assert.equal(after[i].existingLink.text,before[i].existingLink.text);
}
for(const h of headings(base))assert(headings(final).includes(h),'lost heading: '+h);
for(const l of links(base))assert(links(final).includes(l),'lost link: '+l);
console.log(JSON.stringify({preservedDisplayEquations:before.length,preservedOriginalHeadings:headings(base).length,preservedOriginalLinkOccurrences:links(base).length,finalSHA256:crypto.createHash('sha256').update(final).digest('hex')}));
const near=(a,b)=>assert(Math.abs(a-b)<1e-12,[a,b].join(' != '));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const kron=(a,b)=>a.flatMap(x=>b.map(y=>x*y));
const mv=(a,v)=>a.map(r=>dot(r,v));
const mm=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,k)=>s+x*b[k][j],0)));
const tr=a=>a.reduce((s,r,i)=>s+r[i],0);
const dagger=a=>a[0].map((_,j)=>a.map(r=>r[j]));
const outer=(a,b)=>a.map(x=>b.map(y=>x*y));
const add=(a,b)=>a.map((r,i)=>r.map((x,j)=>x+b[i][j]));
const scale=(a,c)=>a.map(r=>r.map(x=>c*x));
const matNear=(a,b)=>a.forEach((r,i)=>r.forEach((x,j)=>near(x,b[i][j])));
const phase=a=>[Math.cos(a),Math.sin(a)];
near(dot([1,2],[3,4]),11);
assert.deepEqual(kron([1,2],[3,4]),[3,4,6,8]);
assert.deepEqual(mv([[1,2],[3,4]],[1,0]),[1,3]);
assert.deepEqual(mm([[1,2],[3,4]],[[1,0],[0,1]]),[[1,2],[3,4]]);
assert.deepEqual(dagger([[1,2],[3,4]]),[[1,3],[2,4]]);
near(tr([[1,2],[3,4]]),5);
assert.deepEqual(outer([1,0],[0,1]),[[0,1],[0,0]]);
assert.deepEqual(scale(add([[1,2]],[[3,4]]),.5),[[2,3]]);
near(phase(Math.PI)[0],-1);near(phase(Math.PI)[1],0);
assert.throws(()=>near(1,2));
console.log('CONTROL PASS: dot, tensor, matrix/vector and matrix/matrix products, transpose, trace, outer product, scaling, phase and rejection controls.');

// The document-specific witnesses follow the passing helper controls.
const cf=1;near(cf,1);
const I=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>Number(i===j)));
const S=[[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]];
const pp=scale(add(I,S),.5),pm=scale(add(I,scale(S,-1)),.5);
for(const p of [pp,pm])matNear(mm(p,p),p);
matNear(mm(pp,pm),scale(I,0));matNear(add(pp,pm),I);
const rho=[[0,0,0,0],[0,.5,0,0],[0,0,.5,0],[0,0,0,0]];
near(tr(rho),1);matNear(mm(S,mm(rho,S)),rho);
near(tr(mm(pp,rho)),.5);near(tr(mm(pm,rho)),.5);
near(dot(mv(pm,[0,0,0,0]),mv(pm,[0,0,0,0])),0);
console.log('W1: projectors idempotent; label-invariant mixture has 1/2 in each sector; zero map falsely passes leakage alone.');
const a=[1,0],b=[.5,Math.sqrt(3)/2];
const ab=kron(a,b),ba=kron(b,a),w=ab.map((v,i)=>(v-ba[i])/Math.sqrt(2));
near(dot(w,w),.75);near(1-dot(a,b)**2,.75);
near(dot(w.map(v=>v/Math.sqrt(.75)),w.map(v=>v/Math.sqrt(.75))),1);
console.log('W2: nonorthogonal Slater squared norm 3/4; Gram normalization restores 1.');
const V=[3,2,2,3],q=[Math.SQRT1_2,Math.SQRT1_2],r=[Math.SQRT1_2,-Math.SQRT1_2];
function pairCheck(c,d){
 const cd=kron(c,d),dc=kron(d,c),overlap=dot(c,d);
 const J=cd.reduce((s,v,i)=>s+v*v*V[i],0),K=cd.reduce((s,v,i)=>s+v*dc[i]*V[i],0);
 for(const sign of [1,-1]){
  const u=cd.map((v,i)=>v+sign*dc[i]);const norm=dot(u,u);
  near(norm,2*(1+sign*overlap**2));
  const direct=u.reduce((s,v,i)=>s+v*v*V[i],0)/norm;
  near(direct,(J+sign*K)/(1+sign*overlap**2));
 }return {J,K};
}
const jk=pairCheck(q,r);near(jk.J,2.5);near(jk.K,.5);
pairCheck(a,b);near(1-dot(a,a)**2,0);
console.log('W3: direct tensor interaction expectations match normalized J +/- K; orthogonal J=2.5, K=.5; a=b has zero antisymmetric norm.');
const x=Math.log(2),fermion=Math.exp(-x)/(1+Math.exp(-x));
let z=0,zn=0;for(let n=0;n<=80;n++){const weight=Math.exp(-n*x);z+=weight;zn+=n*weight;}
near(fermion,1/3);near(zn/z,1);near(1/(Math.exp(x)-1),1);
near(3*fermion,1);near(3*zn/z,3);
console.log('W4: thermal one-mode means 1/3 fermionic, 1 bosonic; three-mode totals 1 and 3.');
near(1/(Math.exp(-x)-1),-2);assert(!Number.isFinite(1/(Math.exp(0)-1)));
assert(Math.exp(10*x)>1);
console.log('W5: x<=0 fails the Bose geometric-series domain; negative formula gives -2 and x=0 diverges.');
for(const n of [10,100,1000]){const xi=1/n,R=n;near(R*xi,1);assert(4*Math.PI*R**3*xi/3>0);}
console.log('W6: xi->0 with R_perp growing leaves longitudinal semiaxis 1; positive ratios retain positive volume.');
for(const m of [2,3])near(phase(m*m*Math.PI)[0],m%2===0?1:-1);
const alpha=Math.PI/3,m=2;
assert(Math.abs(phase(m*m*alpha)[1]-phase(m*alpha)[1])>1);
near(phase(2*m*m*alpha)[0],-.5);
console.log('W7: m^2 exchange agrees with fermionic parity; anyonic matched-row product differs; full encircling doubles the phase.');
// A=(-y/2,x/2), unit circle: A . dq/dt = 1/2 exactly.
near(.5*(2*Math.PI),Math.PI);near(phase(Math.PI)[0],-1);
console.log('W8: non-flat connection on a contractible unit circle has holonomy -1.');
```


Additional checks:

```bash
node scripts/validate-content.mjs --check --strict
node scripts/angular-momentum/check-frequency-triplet-notation-drift.mjs
node scripts/build-equation-mapping-corpus.mjs --check
git --no-optional-locks diff --check HEAD -- content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-fermi-dirac-and-bose-einstein-statistics-review-2026-09-12.md
shasum -a 256 content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md
```


## Remaining obligations and closure limits

- ○ FBS-O1: Produce retained single- and two-assembly histories establishing branch existence, stability, admissible overlap, and pressure response through the EOM solver's independent acceptance requirements. Geometric examples and algebraic witnesses do not satisfy this.
- ○ FBS-O2: Derive the exchange-to-rotation identification and the effective state extraction with observable predictions. The unchanged ordered-frame proof target and the sector tests remain conditional.
- ○ FBS-O3: Resolve the physical configuration space and any sector change along the proposed fermion-to-planar route. A continuous scalar permutation sign cannot provide that change.
- ○ FBS-O4: Derive composite and confined-channel exchange with binding, internal-phase, and apparatus controls; the finite scalar examples establish only representation algebra.
- ○ FBS-O5: Recover mode energies, thermal weights, counting, and a controlled equilibrium/sampling limit from the same normalized history measure. Separate condensation, interacting corrections, driven light, and material pressure laws retain their own conditions.
- ○ Coordinator integration: review this two-file result and its final hash before updating the shared CRW-005 owners. Those records are deliberately outside this assignment's write authority.

Completion of this bounded review repairs local statements and preserves their proof burdens. It does not establish physical branch existence, EOM solver acceptance, theory closure, empirical agreement of the proposed architecture, or downstream closure.
