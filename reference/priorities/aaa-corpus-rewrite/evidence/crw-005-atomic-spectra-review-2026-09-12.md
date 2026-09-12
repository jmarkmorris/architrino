# CRW-005 Atomic Spectra bounded review and repair — 2026-09-12

## Scope and provenance

Priority 44: [Atomic Spectra](../../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md). This is a complete chapter assurance review with direct claim-preserving repairs under the operator's explicit two-path assignment. The reviewer also performed the edits, so the final reread is editorial self-review. Independent support consists of the named mathematical counterexamples and external comparison sources below, not the reviewer's repeated agreement with the text.

By this worker's `apply_patch` call record, the only edited paths are the chapter and this report; no shared status, priorities, queue, work log, generated artifact, fixture, or other path was edited by this worker. No staging, commit, push, publication, regeneration, or linked-worktree operation was performed. The coordination board remains outside this worker's write authority.

Measured by `shasum -a 256 content/markdown/aaa/nuclear-atomic/atomic-spectra.md`:

| Observation | SHA-256 |
| --- | --- |
| Dispatch baseline, verified before repair | `e98c4d6bc22f9260c509f6dc64f69d822be8bc1c77dc298ef9c778ddb1ffdefe` |
| After first repair batch; verified immediately before second chapter edit | `542356bc5728ee48a1029185fe8406fbd3594c8006b2995e282617eb616c4782` |
| After second repair batch; verified immediately before final fixed-frequency clarification | `326fefb48b3e6bf86b30edcb27127184f1c1acb224c8626d9f722432dafa5c47` |
| Final chapter | `e1a94e84b6363ddd450856039d9eec714edae5e77d10263257127ace67f3d99f` |

The baseline was also recovered by `git show 66e0e47de3797be86855acf6318aaab6c503031c:content/markdown/aaa/nuclear-atomic/atomic-spectra.md | shasum -a 256`, which returned the dispatch hash. This identifies the exact baseline bytes; no authorship or causal attribution is inferred from the commit. `test ! -e reference/priorities/aaa-corpus-rewrite/evidence/crw-005-atomic-spectra-review-2026-09-12.md` succeeded before report creation. Baseline line references below use that 493-line source. Final references use the 497-line source read with `nl -ba`.

## Sources inspected and authority

Startup reads included the complete `AGENTS.md`, generated startup router, review discovery skill and live skill owner, `reference/op/skills/README.md`, the corpus-review and integrator-review procedures, theory orientation, goal-seeking procedure, operator explanation standard, and academic style guide edition 1.1. The selected workflow was corpus review with the assignment's explicit repair authority. The older consult-only and edition-1.0 language in the CRW-005 queue does not override this assignment or the live style owner.

Coordination reads covered `reference/office-of-research/cto/prompts/start-pi.md`, `start-research.md`, the geometry/dynamics system lens, and the CRW-005 sections of `reference/priorities/aaa-corpus-rewrite/work-queue.md`, `priorities.md`, `work-log.md`, and `corpus-review-status.md`. The board's priority-44 row was unread at inspection. This task used one reviewer and no delegated agents; it does not claim independent whole-chapter certification.

Task-relevant canon reads covered the mathematics style guide, canonical mathematical terminology for density, cadence and speed, terminology usage for level assignment, records, assemblies and wakes, and comparative-glossary layer distinctions. Foundation reads covered the ontology level map and opening/postulate explanations of Architrino, Absolute Time, Euclidean Void, Absolute Timespace, Detecting the Absolute Frame and Constructing the Absolute Frame. These were dependency reads, not new completed reviews of those chapters.

| Live owner inspected | Relevant evidence used |
| --- | --- |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), opening and canonical-law discussion | Delayed acceleration-first substrate law; effective energies, spectra, and clocks are downstream |
| [Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md), framing, detection map, near-lossless motion | Candidate branch status, compatible history before stability, separate detection and orbital maps |
| [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), hydrogen boundary and channel-scan sections, especially lines 527–629 at inspection | Admissible resolution, common comparison projection, full-window refinement requirement |
| [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), lines 845–955 at inspection | Positive cadence stretch, inverse rate factor, residual-bearing spectral comparison, conditional shape coefficient |
| [Atomic Transition Radiation](../../../../content/markdown/aaa/reactions/atomic-transition-radiation.md), lines 1–118 | Ideal local line versus recoil, medium and remnant event terms |
| [Hydrogen spectral toy scan](../../../../content/markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md), scaffold and residual-separation sections, lines 31–218 | Shared-input replay and separate physical corrections; not independent hydrogen validation |
| [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), lines 2715–2763 | Conditional scalar angular-envelope lemma and separate spinor recovery |
| [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), opening population definition | Number-density and medium/substrate distinctions |
| [Condensed Matter](../../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md), lattice/phonon discussion, especially lines 392–405 at final inspection | Occupation changes at fixed harmonic frequencies; background/frequency changes need separate terms |
| `scripts/validate-content.mjs`, `scripts/build-equation-mapping-corpus.mjs`, vendored loader and relevant equation/reference-rendering tests | Check-only behavior, display/link extraction, generated-registry responsibility |
| `content/graph/textbook_toc.json`, `content/graph/scene_graph.json`, generated equation registry | Target navigation and generated consumers observed by scoped path search |

External sources were inspected on 2026-09-12 only to verify observer-level comparisons and the named historical attribution:

- [NIST, Atomic Spectroscopy, introduction and frequency/wavenumber section](https://physics.nist.gov/Pubs/AtSpec/node01.html), equations (1)–(3): transition-energy units and reduced-mass/infinite-mass distinction. Historical tabulated constants were not imported or recalibrated.
- [NIST, Atomic Spectroscopy, Zeeman Effect](https://www.nist.gov/pml/atomic-spectroscopy-compendium-basic-ideas-notation-data-and-formulas/atomic-spectroscopy-zeeman), equation (6): level versus magnetic-sublevel response.
- [David Tong, The Quantum Hall Effect, section 1.4](https://www.damtp.cam.ac.uk/user/tong/qhe/one.pdf), equation (1.16): uniform-field Landau spectrum and separately treated spin.
- [George E. Hale, On the Probable Existence of a Magnetic Field in Sun-Spots](https://articles.adsabs.harvard.edu/pdf/1908ApJ....28..315H), *Astrophysical Journal* 28 (1908), 315–343, especially printed pages 321, 324–326, and 342–343: polarization observations, laboratory comparison, and line-dependent exceptions.

These references supply no Architrino substrate mechanism, physical branch, or EOM solver acceptance. External checks used page text, not a new local PDF parser.

## Findings and smallest repairs

Twelve findings are repaired: AS-01 through AS-12, comprising four high and eight medium severities. Severity measures the potential to misread the chapter's local assertion, not a verdict on the underlying physical theory. “Done” means the stated local repair is present; unresolved physical obligations remain below.

| ID / disposition | Severity | Exact baseline lines | Exact final lines | Demonstrated issue and smallest repair |
| --- | --- | --- | --- | --- |
| AS-01 — ✓ Done | Medium | 3, 13–17 | 3, 13–17 | Unexplained assembly/medium vocabulary and a basin “settles” statement let proposed persistence read as established mechanism. Define the entities, preserve the exploratory model, and separate basin dynamics from clock readout. |
| AS-02 — ✓ Done | Medium | 33–87, 105 | 33–87, 105 | Angular eigenproblem omits nonzero/domain/basis conditions; principal, density and resolution notation is incompletely explained. Supply the operator domain, chosen-axis basis, effective radial chart, norm limits, and explicit symbol roles without renaming the inherited equations. |
| AS-03 — ✓ Done | High | 91–103, 135–150, 276–305 | 91–103, 135–150, 276–305 | Gap equalities omit the event-residual domain and energy/clock calibration needed by the live clock and radiation owners. Restrict them to their ideal limit; require separate nonideal residuals and one application of the cadence factor. |
| AS-04 — ✓ Done | Medium | 150–206, 261, 305 | 150–206, 261, 305 | Residual deviations, positive normalization scales, units, comparison projection and refinement quantifier are unstated. Define them and distinguish finite sampled agreement from uniform or dynamical stability. |
| AS-05 — ✓ Done | High | 210–274 | 210–274 | Isolated raw hydrogen lines are treated as a common Rydberg readout without the precision-correction domain; “calibration-free” conflates ratio agreement with an absolute prediction. State nontrivial line-set/domain conditions, correction budgets, independently fixed calibration and the bounded photon-speed limit. |
| AS-06 — ✓ Done | High | 305–311 | 305–311 | Shared-input scaffold arithmetic and a same-record closure sentence leave independence implicit; the shape coefficient lacks its owner's remainder condition. State arithmetic-only reach, conditional coefficient use and independent dynamic/observational obligations. |
| AS-07 — ✓ Done | Medium | 317–345 | 317–345 | Lamb envelope-energy differences are called the final precision target without identifying hyperfine reduction or the downstream clock comparison. Define the labels and the common conversion/correction requirements while preserving the pre-spin distinction. |
| AS-08 — ✓ Done | High | 349–380 | 349–380 | A discrete competitor set does not ensure an attained positive minimum; the text calls its energy gap a stability gap. Restrict the domain, explain negative/zero values and incomplete inventories, and retain shell identification as a proposal. |
| AS-09 — ✓ Done | Medium | 390–423 | 390–425 | Scalar Landau mass and compact Zeeman coefficient lack their domains and magnetic-sublevel meaning. State the uniform-field carrier limit and define the existing effective coefficient as the difference of level projection responses. |
| AS-10 — ✓ Done | Medium | 453 | 455 | The named historical claim lacks a checkable source and compresses line-dependent observations into the surrounding normal-pattern example. Add Hale's inspected paper and retain the narrower observational account. |
| AS-11 — ✓ Done | Medium | 455–465 | 457–467 | Free-atom recoil scale lacks initial-rest and nonrelativistic assumptions. Give the two observer comparison steps and the small-recoil domain; retain the formula exactly. |
| AS-12 — ✓ Done | Medium | 465–485 | 467–489 | Absorption/emission signs, mode definitions and fixed-frequency assumptions are absent; zero-phonon bookkeeping can be mistaken for an event-existence result. Define signed delivery and material changes, fixed harmonic modes, additional exchanges, and the unproved amplitude/fraction. |

## Evidence, claim grades, and falsifiers

**AS-01. Claim grade: measured** by baseline/final line inspection against the opening ontology and Electron owner. The baseline has an exploratory disclaimer, so the finding is local explanatory inconsistency, not an accusation that the entire chapter claims closure. The repair keeps the proposed resonance picture. **Falsifier:** a retained compatible-history and perturbation result actually cited for the basin at these lines would justify stronger local wording; its absence here must not be generalized to an unsearched corpus.

**AS-02. Claim grade: derived** for the mathematical restrictions. The zero function satisfies the displayed homogeneous eigen-equation for every eigenvalue, so a spectral implication requires a nonzero eigenfunction. A sum of two spherical harmonics with the same orbital degree but different projection labels remains an eigenfunction of the sphere Laplacian and need not have one projection eigenvalue. Also, a remainder with fixed nonzero angular norm at every radius satisfies a uniform angular bound but has divergent full radial norm because the radial measure contains $r^2\,dr$. These are mathematical witnesses, not candidate atomic histories. **Falsifier:** show that the asserted implication holds for the zero function, that the stated superposition has one projection eigenvalue, or that the constant-in-radius example has finite radial norm. The retained tuple/subscript/superscript roles already distinguish most symbol identities; a wholesale cross-corpus rename was neither necessary nor authorized.

**AS-03. Claim grade: derived** for accounting and **guessed** for physical identification of the candidate clock map. If the envelope gap is $\Delta E$ and the non-photon event terms total $Q$, the radiation owner's local comparison is $h\nu^{\mathrm{loc}}=\Delta E-Q$ in its stated idealized bookkeeping. The bare-gap equality requires $Q=0$, or a bound that makes its omission legitimate at the claimed precision. The clock owner additionally declares a frequency residual and a reference calibration. In normalized wake-speed units $c_f=1$, the dimensionless witness $\Delta E=6$, $h=1$, $\Gamma_N=2$ gives one-conversion frequency $3$, while applying the factor twice gives $1.5$. **Falsifier:** a different declared energy calibration or a derived nonideal cancellation can change this witness's applicability; inspect the same energy, photon and clock ledger before substituting it.

**AS-04. Claim grade: derived** for dimensions and quantifier limits; the norm remains a **guessed** diagnostic proposal until its reference and budget are supplied. An energy difference divided by an energy scale is dimensionless. A relative cadence difference needs a dimensionless scale. Frequency, inverse-length and energy denominator floors must match the numerator's readout units. Letting a floor grow without constraint drives its residual to zero without improving the calculation. Passing selected resolution pairs does not bound untested pairs. **Falsifier:** a fixed independently motivated reference/budget and a valid uniform remainder bound would remove these implementation ambiguities; no such new bound is supplied here.

**AS-05. Claim grade: derived** for the arithmetic limitation and **inferred** for the calibration consequence. If a measured line has leading part $c_\gamma R\Lambda_{ab}$ plus correction $\delta\nu_{ab}$, the displayed extraction returns $R+\delta\nu_{ab}/(c_\gamma\Lambda_{ab})$. Distinct normalized corrections therefore spoil an exact common readout even with a correct leading model. A singleton set makes the maximum pairwise difference zero automatically. The hand references are $\Lambda_{21}=3/4$ and $\Lambda_{32}=5/36$. **Falsifier:** demonstrate that every retained correction lies inside the declared budget, or apply independently determined corrections with their uncertainty; then the restricted readout is a legitimate comparison. An absolute prediction additionally needs a normalization not obtained from the same target lines.

**AS-06. Claim grade: derived.** Constructing $\Delta E_{ab}=\Gamma_N h\nu_{ab}$ makes $\Delta E_{ab}/(\Gamma_N h)=\nu_{ab}$ identically for any positive chosen cadence stretch. Replaying that construction tests the arithmetic, not the physical law. The explicit normalized witness in Appendix B uses $c_f=1$ and the $3\to2$ line factor. **Falsifier:** supply gaps and cadence from a branch calculation independent of the target frequencies and compare to separately measured spectra; the same-record requirement would then organize genuinely independent sides. The present pass neither runs nor certifies the toy scan.

**AS-07. Claim grade: measured** by comparison of the chapter's envelope-energy notation with the clock owner and the toy scan's separate hyperfine channel; the repair is an **inferred** scope clarification. The pre-spin difference already had the correct narrow grade and was retained. **Falsifier:** a declared convention showing that the displayed energies already include the observer clock conversion and a specified hyperfine reduction would require revisiting the added conversion instruction, to prevent applying it twice.

**AS-08. Claim grade: derived** for minimum/sign statements and **guessed** for closed-shell identification. At fixed declared energy units and $c_f=1$, a reference energy $2$ with competitor $1$ has gap $-1$; competitor $2$ gives zero. A countably discrete branch inventory indexed by positive integer $k$ can have differences $1+1/k$: each is above $1$, but none is the minimum. Discrete branch labels impose no contrary condition on this energy map. Empty inventories do not certify an infinite physical gap. Even a positive gap between distinct admitted states does not provide delayed-dynamics perturbation stability. **Falsifier:** enumerate the full comparison class with an attained positive lower gap and separately prove the required compatible-history stability. The current chapter supplies neither.

**AS-09. Claim grade: derived** at standard comparison level for subtracting magnetic-sublevel energies, and **guessed** for the Architrino recovery. A normal orbital response includes a zero central component and opposite signed side components; one universal unsigned level factor cannot describe all three. The retained compact equation becomes well-defined through its stated component coefficient. The equal-mass Larmor/cyclotron ratio is $1/2$ by direct division and is not an error to repair. **Falsifier:** an admitted weak-field component whose independently fixed level responses do not give the displayed difference rejects that comparison; leaving the weak-field, scalar-band or chosen-label domain calls for another model, not an arbitrary coefficient adjustment.

**AS-10. Claim grade: measured** by inspection of Hale's source text, not by a new observation of the Sun. Printed pages 324–325 describe limited limb/polarization tests; the addendum on 342–343 distinguishes different line patterns. This supports a more precise historical account and a source link, not rejection of the original magnetic-field inference. **Falsifier:** a contradictory passage in the cited observation sections or a misidentified article/page would reopen the attribution.

**AS-11. Claim grade: derived** within the declared observer comparisons: substituting $p_\gamma=E_\gamma/c_0$ into $p_\gamma^2/(2M)$ gives the unchanged recoil scale. The quadratic kinetic expression is a small-recoil approximation; the formula does not settle a complete absorption resonance or its amplitude. **Falsifier:** a regime with non-negligible $E_\gamma/(Mc_0^2)$ or appreciable initial motion requires a different kinematic expression. Neither case permits primitive architrino mass.

**AS-12. Claim grade: derived** for signed accounting and **guessed** for physical zero-phonon realization. In dimensionless energy units with $c_f=1$, emission with internal change $-10$ and recoil change $+1$ delivers photon energy $-9$, hence positive outgoing energy $9$. Calling the same delivered term positive would reverse the emission ledger. Equal-energy modes can exchange occupations $(-1,+1)$ with zero total vibrational energy change; that is not mode-by-mode zero occupation change. At changing harmonic frequencies, even fixed occupations change energy, so the occupation-only integral is incomplete. **Falsifier:** an omitted boundary, background, frequency-change or excitation term invalidates this restricted ledger; a nonzero transition amplitude and measured recoil-free fraction require separate material/event evidence.

## Validation record

Known-case controls were executed and their successful output recorded before target use. Appendix A accepted valid math and rejected a bad command/unpaired delimiter; excluded inline and fenced code; distinguished valid/missing local paths and heading anchors; handled duplicate headings; and distinguished clean/trailing-space text. Appendix B accepted unchanged math shifted by prose and rejected changed math before comparing the actual chapter. Its line-factor and finite-minimum controls ran before the target witnesses. An initial orchestration attempt failed JavaScript parsing before any tool ran; no target result or file change was produced by that attempt.

| Command / instrument | Observed result and scope |
| --- | --- |
| `shasum -a 256` and exact-commit baseline recovery above | Dispatch hash matched; each chapter edit was immediately preceded by verification of the expected current hash; final hash recorded above |
| Complete baseline and final `nl -ba` reads | All chapter prose, 24 displays, links and the spin-sensitive ending reviewed; final 497 lines |
| Appendix A, baseline chapter | Exit 0: 132 math expressions, 24 displays, 40 links, six non-equation fragment links, zero scoped errors |
| Appendix A, final repaired chapter | Exit 0: 190 math expressions, 24 displays, 46 links, eight non-equation fragment links, zero scoped errors |
| Appendix A, report | Exit 0: 38 math expressions, zero displays, 14 links, zero non-equation fragment links, zero trailing-whitespace or scoped errors |
| Appendix B | Exit 0: all 24 display blocks and their unique equation links byte-identical to exact baseline; bounded arithmetic witnesses passed |
| `node scripts/build-equation-mapping-corpus.mjs --check`, before chapter edits | Exit 0: 199 corpus files, 4685 display equations, 30436 symbol definitions, zero errors |
| Same registry command after repairs | Exit 1, with only `generated registry is stale: content/generated/equation-mapping/corpus-equations.json`; no generator write |
| Git whitespace known controls | `git apply --check --whitespace=error -` accepted a clean in-memory patch and rejected a trailing-space patch; no file was written |
| `git --no-optional-locks diff --check -- content/markdown/aaa/nuclear-atomic/atomic-spectra.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-atomic-spectra-review-2026-09-12.md` | Exit 0, no whitespace diagnostics; the untracked report also requires the separate check below |
| `git --no-pager diff --no-index --check -- /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-atomic-spectra-review-2026-09-12.md` | Initially exit 3 with one extra blank line at EOF; that report-only defect was removed. Rerun exit 1 with no output: ordinary new-file difference, no whitespace diagnostics |
| `node scripts/validate-content.mjs --check --strict` | Exit 0: 391 scene configurations, 199 corpus Markdown files, 1688 repository Markdown files audited; zero errors, zero warnings, 30 informational notes |

The generated equation registry stores source context as well as formulas, so unchanged display mathematics does not imply registry freshness. This task edited fingerprinted context; concurrent sources can also contribute to global drift. The observed stale registry is expected deferred regeneration work, not a new scientific finding. The exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check` in a separately authorized regeneration/publication procedure. Neither command's write mode was run here.

The required global validator is a check-only observation over a live shared checkout, not an isolated snapshot or full content-integrity suite. Its out-of-scope informational notes cover one ignored non-scene JSON file, 16 approved comics, 17 stable-ID/label locks, and 115 scenes without incoming links (25 listed plus 90 more); none is an Atomic Spectra finding. That run reported no failing concurrent diagnostics. No EOM solver, physical-branch evolution, energy-functional derivation, line-data fit, PDF export, or visual/browser layout acceptance was performed.

## Closure limits and handoff

The bounded result is twelve local assurance repairs with preserved display mathematics. It does not claim theory closure, EOM solver acceptance, existence or stability of physical branches, spinor or photon recovery, conservation-law derivation, or downstream corpus closure. The native radial/envelope functional, compatible electron/nuclear/sea histories, constitutive cadence and energy maps, independent spectral prediction, emission/absorption amplitudes, correction budgets, and complete shell competitor inventories remain physical obligations.

The same-record principle prevents inconsistent accounting; it does not supply independent evidence. The source inventory above bounds this review: dependency reads are not completed reviews of nearby chapters, and an unchanged or repaired local formula is not validation of its consumers. Shared queue/status reconciliation and any later regeneration belong to their authorized owners. No further chapter repair is proposed within this completed bounded pass unless a stated falsifier or new source conflict is produced.

## Appendix A — Reproducible focused syntax, link, and whitespace check

Run from the repository root. The checker uses the existing vendored KaTeX and Markdown parser and the existing display extractor. It checks source syntax and local Markdown fragments; it does not render a browser, validate external-site availability, or establish the physical content of an equation. The chapter uses dollar delimiters; this is not a general parser for every TeX dialect.

```bash
node --input-type=module - content/markdown/aaa/nuclear-atomic/atomic-spectra.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-atomic-spectra-review-2026-09-12.md <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { loadVendoredCommonJsBundle } from './scripts/load-vendored-commonjs-bundle.mjs';
import { parseCorpusDisplayEquations } from './scripts/build-equation-mapping-corpus.mjs';
const katex=loadVendoredCommonJsBundle('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js');
const md=loadVendoredCommonJsBundle('vendor/markdown-it/markdown-it.min.js')({html:true});
function prose(s) {
  let fence=null;
  return s.split('\n').map(line=>{
    const m=line.match(/^\s*(\x60{3,}|~{3,})/);
    if(m){if(!fence)fence=m[1][0];else if(fence===m[1][0])fence=null;return '';}
    return fence?'':line.replace(/(\x60+).*?\1/g,'');
  }).join('\n');
}
function math(s) {
  const p=prose(s), entries=[];
  const rest=p.replace(/\$\$([\s\S]*?)\$\$|(?<!\\)\$([^\n$]+?)(?<!\\)\$/g,(all,d,i,offset)=>{
    entries.push({tex:d??i,display:d!==undefined,line:p.slice(0,offset).split('\n').length}); return ' '.repeat(all.length);
  });
  assert.doesNotMatch(rest,/(?<!\\)\$/,'unpaired math delimiter');
  return entries;
}
function links(s) {
  const out=[];
  function walk(tokens){for(const t of tokens){if(t.type==='link_open')out.push(t.attrGet('href'));if(t.type==='image')out.push(t.attrGet('src'));if(t.children)walk(t.children);}}
  walk(md.parse(s,{}));return out;
}
function anchors(s) {
  const out=new Set(),counts=new Map(),t=md.parse(s,{});
  for(let i=0;i<t.length;i++)if(t[i].type==='heading_open'){
    const base=t[i+1].content.replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}_\-\s]/gu,'').toLowerCase().replace(/\s/g,'-');
    const n=counts.get(base)||0;counts.set(base,n+1);out.add(n?base+'-'+n:base);
  }
  return out;
}
function issues(file,s,exists=fs.existsSync,read=p=>fs.readFileSync(p,'utf8')) {
  const out=[];
  for(const href of links(s)){
    if(/^(https?:|mailto:|tel:|data:)/.test(href))continue;
    const [rel,frag]=href.split('#');const dest=path.resolve(path.dirname(file),decodeURIComponent(rel||path.basename(file)));
    if(!exists(dest)){out.push('missing path '+href);continue;}
    if(frag&&dest.endsWith('.md')&&!anchors(read(dest)).has(decodeURIComponent(frag)))out.push('missing anchor '+href);
  }
  return out;
}
const control='# Alpha\nText $x+1$.\n$$\nx^2\n$$\n[View →](equation-mapping.html#corpus-equation-0123456789abcdef)\n[ok](a.md#alpha)\n\x60$ignored$ [ignored](missing.md)\x60\n~~~md\n$$ignored$$\n[ignored](missing.md)\n~~~\n';
assert.deepEqual(math(control).map(x=>x.tex.trim()),['x+1','x^2']);
assert.throws(()=>math('$unclosed'));
assert.equal(parseCorpusDisplayEquations('known.md',control).length,1);
assert.ok(parseCorpusDisplayEquations('known.md',control)[0].existingLink);
assert.equal(links(control).length,2);
assert.equal(issues('known.md','[ok](a.md#alpha)',()=>true,()=> '# Alpha').length,0);
assert.equal(issues('known.md','[bad](a.md#missing)',()=>true,()=> '# Alpha').length,1);
assert.equal(issues('known.md','[bad](missing.md)',()=>false).length,1);
assert.deepEqual([...anchors('# Alpha\n# Alpha')],['alpha','alpha-1']);
assert.doesNotThrow(()=>katex.renderToString('\\frac{1}{2}',{throwOnError:true,strict:'error'}));
assert.throws(()=>katex.renderToString('\\notACommand',{throwOnError:true,strict:'error'}));
const whitespace=s=>s.split('\n').flatMap((line,i)=>/[ \t]+$/.test(line)?[i+1]:[]);
assert.deepEqual(whitespace('clean\n'),[]);
assert.deepEqual(whitespace('bad \n'),[1]);
console.log('CONTROLS PASS: math/code exclusion, unpaired delimiter, display/link parser, valid/missing paths and anchors, duplicate headings, valid/invalid KaTeX, clean/bad whitespace.');
if(process.env.CRW_MODE!=='controls'){
  for(const file of process.argv.slice(2)){
    const s=fs.readFileSync(file,'utf8'),m=math(s),d=parseCorpusDisplayEquations(file,s);
    for(const e of m)katex.renderToString(e.tex,{displayMode:e.display,throwOnError:true,strict:'error'});
    assert.deepEqual(issues(file,s),[]);assert.deepEqual(whitespace(s),[]);
    if(file.startsWith('content/'))assert.ok(d.every(x=>x.existingLink));
    console.log(JSON.stringify({file,math:m.length,displays:d.length,links:links(s).length,nonEquationFragments:links(s).filter(x=>/#/.test(x)&&!x.includes('equation-mapping.html')).length,whitespace:0,errors:0}));
  }
}

NODE
```

## Appendix B — Display preservation and bounded arithmetic

The exact algebra and counterexamples above are the references; these computations check their finite instances and document preservation. They do not simulate an atom.

```bash
node --input-type=module - <<'NODE'
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const record=s=>parseCorpusDisplayEquations('known.md',s).map(b=>({math:s.slice(b.openStart,b.closeEnd),link:b.existingLink?.text,id:b.existingLink?.semanticId}));
const known='$$\nx=1\n$$\n\n[View →](equation-mapping.html#corpus-equation-0123456789abcdef)\n';
assert.equal(record(known).length,1);
assert.deepEqual(record(known),record('Added prose.\n'+known));
assert.notDeepEqual(record(known),record(known.replace('x=1','x=2')));
const factor=(a,b)=>1/b**2-1/a**2;
assert.equal(factor(2,1),3/4);
const gap=(reference,competitors)=>Math.min(...competitors.map(x=>x-reference));
assert.equal(gap(0,[2,3]),2);
console.log('CONTROLS PASS: display-byte comparison accepts shifted prose and rejects changed math; line factor 2->1=3/4; finite minimum=2.');
const file='content/markdown/aaa/nuclear-atomic/atomic-spectra.md';
const baseline=execFileSync('git',['show','66e0e47de3797be86855acf6318aaab6c503031c:'+file],{encoding:'utf8'});
const final=fs.readFileSync(file,'utf8');
assert.deepEqual(record(baseline),record(final));
const ids=record(final).map(x=>x.id);assert.ok(ids.every(Boolean));assert.equal(new Set(ids).size,ids.length);
console.log('PRESERVATION PASS: '+ids.length+' display blocks byte-identical with unchanged unique equation links.');
// All numerical witnesses use normalized wake-speed units c_f=1.
// Other numbers below are dimensionless comparison ratios or energy units,
// not measured atomic parameters or simulated physical branches.
const c_f=1;assert.equal(c_f,1);
const f=factor(3,2);assert.ok(Math.abs(f-5/36)<1e-15);
const Gamma=2, localGap=6, h=1;
assert.equal(localGap/(Gamma*h),3);
assert.notEqual((localGap/Gamma)/Gamma,localGap/Gamma);
const replay=Gamma*h*f;
assert.equal(replay/(Gamma*h),f);
assert.equal(gap(2,[1]),-1);assert.equal(gap(2,[2]),0);
const levelShift=(g,m)=>g*m;
assert.equal(levelShift(1,0),0);
assert.equal(levelShift(1,1)-levelShift(1,0),1);
assert.equal(levelShift(1,-1)-levelShift(1,0),-1);
assert.equal(1/2,0.5); // same-mass orbital/cyclotron coefficient ratio
assert.equal(-10+1,-9); // positive outgoing photon energy 9
assert.equal(1*(-1)+1*(1),0); // equal-energy modes exchange occupation
console.log('ARITHMETIC PASS: 3->2 factor 5/36; single cadence factor 3 vs double 1.5; replay identity; negative/zero shell gaps; signed Zeeman components; Larmor ratio; emission and phonon sign controls. No physical validation.');

NODE
```
