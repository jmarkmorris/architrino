# CRW-005 — Hyde Periodic Table bounded assurance review

Date: 2026-09-12. Assignment: priority 45, [Hyde Periodic Table](../../../../content/markdown/aaa/nuclear-atomic/hyde-periodic-table.md). Disposition: ten demonstrated local findings repaired, HY-01–HY-10; seven high and three medium severity. This is one editor's assurance review and repair, followed by self-review. Independent references are identified below; agreement with this editor or a renderer is not independent physical evidence.

## Scope and exact versions

The operator authorized exactly the chapter and this evidence report. The live review skill routes through the corpus reviewer, whose default review-only boundary is superseded here by explicit direct-repair authority. The coordination owner leaves shared integration to the coordinating task. No shared status, priority, queue, work-log, generated, fixture, code, or other path was edited. No staging, commit, push, publication, regeneration, or linked worktree command was used.

The chapter's baseline SHA-256 was measured by `shasum -a 256 content/markdown/aaa/nuclear-atomic/hyde-periodic-table.md` as:

`10d876025773e712de977231d9a38c3a1282be2791355b6a6467a1778c691358`

The same command matched the supplied hash at startup and immediately before the sole chapter patch. `git show 66e0e47de3797be86855acf6318aaab6c503031c:content/markdown/aaa/nuclear-atomic/hyde-periodic-table.md | shasum -a 256` matched it too, providing an immutable baseline for line references and preservation checks. Baseline coverage is all 215 lines, read with `nl -ba`; it is the dispatch baseline, not an independently reconstructed pre-conversion campaign source. `test ! -e` confirmed that this report was absent before creation. Scoped `git --no-optional-locks status --short -- <chapter> <report>` returned no entries before editing.

The final chapter SHA-256, measured by the same `shasum -a 256` command after the patch and checked again before report creation, is:

`214b830c94f3ea9df46c2cfc4030cca2c0a40963033124c5cd172f4ab051b7df`

Final coverage is all 219 chapter lines, reread with `nl -ba` after the patch. All locations below refer to these two versions. Subsequent report-only edits require this final chapter hash to remain unchanged. A later chapter hash or a baseline mismatch invalidates the corresponding line and preservation receipt.

## Sources and owner coverage

Startup and procedure reads included the complete [AGENTS.md](../../../../AGENTS.md), [generated router](../../../op/agent-startup-orientation.generated.md), [review skill entry](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), [corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), [theory orientation](../../../op/theory-orientation.md), [operator explanation standard](../../../op/operator-explanation-standard.md), goal-seeking execution template, repository skills policy, and geometry/dynamics review lens. Coordination reads covered [the parallel-task owner](../../../op/codex-multiprompt.md), the live CRW-005 queue and coordination-handoff passages, the priorities ownership and phasing sections, and the [status inventory](../corpus-review-status.md), where an `rg` inspection located Hyde at active priority 45. These reads did not authorize edits to shared owners.

Task-relevant canon reads covered the academic style guide, mathematics style guide, mathematical terminology, terminology usage, comparative glossary, and About Architrino's attribution and source-checking policy. The target received a complete read; dependency coverage was selective and does not count as review completion of any neighboring chapter:

- Foundations: Ontology and Architrino openings for primitive inventory and effective-property boundaries; Absolute Time, Euclidean Void, Absolute Timespace, Detecting the Absolute Frame, and Constructing the Absolute Frame openings for time, geometry, and observer distinctions.
- [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md): causal-root weight and transversality discussion, lines 139–163, and separator taxonomy, lines 1157–1174, distinguish speed, transmitter singularity, receiver playback, and memory exit.
- [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md): opening and interface discussion, especially lines 123–172; element-dependent response, lines 631–723; orbital handoff, lines 795–831. These separate response boundaries, isotope and atomic-state inputs, density and delay, and observer orbital labels.
- [Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md): candidate inventory and Assembly and Detection Map distinguish a neutral scaffold from the charged axial inventory and distinguish constituent history, spatial mode, and effective spin.
- [Braid Taxonomy](../../../../content/markdown/aaa/noether-braid/braid-taxonomy.md): opening and exact-configuration identity establish that classification does not certify dynamics. [Braid Envelope Geometry](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md), Assembly-Noether Sea Interface Diagnostic, supplies the channel-specific boundary.
- [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md): population versus mass-density discussion, composition target, and continuum/constitutive closure; line 434 explicitly requires independently extracted references and a bound on omitted history.
- [Fermi-Dirac and Bose-Einstein Statistics](../../../../content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md): opening through the fermionic proof target, especially lines 21–58, allows shared spatial modes with different spin states and requires exchange-sign recovery. [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), retained spinor-support condition at lines 1889–1901, remains an open proof obligation. That additional dependency excerpt was checked during verification.
- [Zero-Axial-Offset Three-Binary Dynamics and Interpretation](../../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md): claim-ownership, retention, and field-speed-hinge passages preserve candidate status and persistent indices.
- The Hyde scene JSON, image-manifest Hyde entries, and [license/attribution owner](../../../../content/markdown/aaa/archie/licenses-attributions.md) were inspected for chapter and asset routing. The original SVG path and attribution were preserved; this review did not perform a complete pixel/label audit or numerical-property recertification of the artwork.

External source inspection on 2026-09-12 used read-only web retrieval:

- [NIST, Electronic Configurations of the Elements](https://www.nist.gov/pml/atomic-reference-data-electronic-structure-calculations/atomic-reference-data-electronic-8), table and source explanation: neutral He, Ne, Ar, K, Ca, Cr, and Cu entries support the selected effective comparison configurations. It is a compilation of spectroscopic assignments, not evidence for an Architrino assembly mechanism or a universal orbital-energy ordering.
- [Rezmason's Commons file record](https://commons.wikimedia.org/wiki/File:The_chemical_elements_and_their_periodic_relationships.svg): the creator describes the reproduced design as of 1975 and identifies the reproduction and license. This is provenance evidence for that artwork, not a chemistry calibration.
- [Benfey's IDEALS bibliographic record](https://www.ideals.illinois.edu/items/134826), abstract and indexed bibliography excerpt from the associated PDF: these confirm the paper's identity, spiral lineage at abstract level, and the reference to Hyde's 1976 publication. Direct DOI retrieval failed, the old individual-article PDF returned 404, IDEALS direct retrieval returned 403, and the full-issue host returned a verification page. Full text was not obtained. Consequently the detailed Clark/Life/Benfey-Jacobs chronology, first-protrusion account, Weiner-Seaborg exchange, and biosphere/lithosphere historical attribution remain inherited claims awaiting full-text verification. No historical error was inferred from retrieval failure.

## Findings and smallest repairs

### HY-01 — Medium: entry definitions and layer presentation

Baseline lines 9 and 26; final lines 9 and 26. The entry used an unstyled theory abbreviation and supplied no local explanation of the architrino-level premise boundary; it also left “nuclear charge” ambiguous between integer proton count and charge units. The smallest repair supplies the full theory name, a brief linked primitive definition, explicit observer-level status, and the distinction between $Z$ and $Ze$. It also defines increasing atomic-number order along the table's reading path.

Claim grade: measured for the source wording by the complete baseline read; inferred for the explanatory repair against the style and terminology owners. Falsifier: show the missing definitions or compliant theory form in baseline line 9, or show that the revised $Z$ and charge meanings disagree with the declared effective convention. This is an exposition and dimensional-clarity correction, not a new charge derivation.

### HY-02 — Medium: capacity arithmetic and filling order need different domains

Baseline lines 30–60 and 175; final lines 30–62 and 177. The equations were correct, but their integer domain, spin/occupancy premises, and derivation were omitted; “shell periodicity” later conflated capacities with the sequence of period lengths. The repair preserves both display equations byte for byte, supplies the effective state-counting derivation, distinguishes a shell's maximum occupancy from an atom's actual configuration, and states Madelung's tie-break rule and limited neutral-atom role. The transition-series benchmark is now a common atomic response obligation rather than an assumed scalar energy principle.

Claim grade: derived for $2\sum_{\ell=0}^{n-1}(2\ell+1)=2n^2$ under the specified positive-integer domain; measured for the selected configurations by the NIST compilation; guessed for their proposed packing recovery. The exact identity follows because the odd-number sum starts at one and adding $2n+1$ changes $n^2$ to $(n+1)^2$. Falsifier: an arithmetic counterexample in the stated domain, a mismatching NIST entry, or a claimed recovery model that gets capacities but misses the declared neutral configurations. The third-shell capacity 18 versus third-period length eight is a direct counterexample to conflation.

### HY-03 — Medium: diagram conventions and artwork chronology are overgeneralized

Baseline lines 100, 110, 126–130, and 163; final lines 102, 112, 128–132, and 165. Detached $f$ rows are a convention of compact rectangular tables, not a requirement of rectangular geometry; a rectangular layout with those columns attached is a counterexample. Diagram continuity and radial position do not establish physical topology, shell radii, or quantization. The repair scopes those descriptions to layout, preserves the historical lineage, distinguishes the artwork's 1975 date from the cited 1976 publication, and labels the 50-element sum as arithmetic within a speculative extension.

Claim grade: derived for the sum of the five displayed capacities and for the non-implication from layout to a physical metric; measured for the date distinction by the Commons record and indexed Hyde bibliography; inferred for the diagram interpretation. Falsifier: a proof that rectangular geometry requires detachment, or source evidence contradicting the narrowly stated artwork/publication dates. The detailed historical account is explicitly outside the verified source coverage above; its retrieval limitation is not counted as a repaired finding.

### HY-04 — High: the printed axis does not derive tetrahedral atomic docking

Baseline lines 138–140, 163, 173, and 180–182; final lines 140–142, 165, 175, and 182–184. The text described the H-C-Si axis as corresponding to a physical radial tier, asserted maximal exposure, and identified a first tetrahedral tier without a map or extremum calculation. Four valence electrons do not determine four spatial directions; changing directions leaves the electron count unchanged. Hydrogen on the printed axis does not share the four-valence-electron premise.

The smallest repair retains tetrahedral docking as a guessed candidate, defines docking and the local neutral-axis interpretation, separates the neutral scaffold from the charged electron assembly, and names the missing projection and environmental domain. Claim grade: derived for underdetermination by count alone; guessed for the retained bonding proposal. Falsifier: supply a retained-history-to-bonding derivation that establishes the claimed tier and maximal exposure, with a declared criterion and competing configurations, or identify a place where the final text still presents that proposal as established.

### HY-05 — High: shape and pressure prescriptions were carrying unproved dynamics

Baseline lines 167–176; final lines 169–178. Oblate envelopes, density gradients, and a pressure-gradient decrease were made to carry the claim that discrete stable layers emerge. A pressure trend alone neither specifies the complete acceleration nor establishes a stable solution; the neighboring atomic and sea owners require channel-specific interfaces and independently supported constitutive response.

The repair retains the oblate ansatz and finite-volume hypothesis, defines their status and interface, separates density, delay, orientation, and stress, and restores the missing response-law, balance, and stability obligations. Claim grade: measured for the local owner requirements by the cited reads; inferred for the missing-premise diagnosis; guessed for the proposed realization. Falsifier: an independently supported constitutive map and complete-history dynamics deriving the asserted layers from those inputs, or a final passage that still treats the visual envelope as a universal hard wall.

### HY-06 — High: spatial non-overlap is not the full Pauli rule

Baseline lines 177–180; final lines 179–182. The “must either” response channels were exhaustive without proof, and the mechanical non-overlap wording could exclude two electrons from one spatial orbital. The neighboring statistics owner and the neutral-helium comparison require that shared spatial mode with different spin states. The original exchange-sign handoff was sound and is retained.

The smallest repair distinguishes complete spatial-and-spin states from spatial envelopes, requires a map from precession phase to effective spin, and keeps the proposed resolution channels open to excitation, reconfiguration, dissociation, and continued motion. Claim grade: derived within the declared effective antisymmetric-state comparison; guessed for an Architrino mechanism. Falsifier: apply the candidate rule to the helium $1s^2$ comparison and check whether it admits the two different spin states while excluding duplicate complete states, then test exchange sign on the same retained history. A spatial-only exclusion rule fails that test.

### HY-07 — High: nuclear mass and an unspecified residual do not predict sea response

Baseline lines 186–188, 195, and 210; final lines 188–191, 198, and 213. The chapter asserted that increasing nuclear mass steepens a density gradient and produces measurable departures, without a mass/response relation or a numerical prediction. It switched from a full correction baseline to “relativistic-correction-only” trends, allowing omitted known terms to masquerade as a geometric signal.

The repair distinguishes changing $Z$ at fixed electron count from isotope changes at fixed $Z$, requires the full nuclear and ambient state, and retains shielding modification as a guessed mechanism. All comparisons now refer to the complete declared correction and uncertainty baseline. Claim grade: inferred for the missing predictive link, using Atomic Structure's explicit input boundary; guessed for the retained mechanism. Falsifier: supply an independently supported common response map and a preregistered sign, magnitude, uncertainty, and comparison domain, then find a resolved prediction outside the data uncertainty. A residual alone does not identify its cause.

### HY-08 — High: speed equality does not establish a causal fold or stability threshold

Baseline line 187; final line 190. The internal-binary claim used the group-speed symbol $v$ and attributed causal-root/stability significance to $v=c_f$. The live master-equation separator taxonomy requires the transmitter's projected emission velocity at an admitted root and additional conditions for an ordinary fold.

The repair replaces that unsupported inline equality with constituent-speed notation and the actual transmitter condition, retains persistent identities, and narrows the linked candidate chapter's authority. Claim grade: derived for the counterexample and distinction; guessed for any claimed physical threshold. In normalized units $c_f=1$, take emission at $T_t=-1$, transmitter position $(0,0,0)$ and velocity $(1,0,0)$, with reception at $T_r=0$ and receiver position $(0,1,0)$. A straight transmitter history $\mathbf X_t(T)=(T+1,0,0)$ realizes those local data. The unit separation equals the unit delay, so this is an admitted causal hit; speed is one but the projected velocity is zero and $D_t=1$. It is not a transmitter singular root. Falsifier: demonstrate that these declared data fail the causal condition, or compute $D_t=0$ for them under the canonical dot-product definition. This is a kinematic comparison, not an evolved binary or EOM solver test.

### HY-09 — High: failure tests overreached their observation domains

Baseline lines 192–195; final lines 195–198. A finite search that finds no candidate is not a theorem of nonexistence, a smooth effective density can encode discrete states, and an $s$ orbital has no angular node. Thus the original “no discrete angular nodes” rule would reject a required comparison state. In the effective central angular basis, $\ell=0$ selects the constant angular function, whose angular derivatives vanish and which has no zero on the sphere; no substrate angular law is imported by using this counterexample.

The repair scopes negative simulations to their declared model, family, preparation and refinement domain; tests extracted state counts and angular response; requires justification for an effective energy functional; and conditions residual falsification on resolving a quantitative prediction. Claim grade: derived for the logical and constant-angular-function counterexamples; inferred for the bounded test formulation. Falsifier: a claimed negative inference remains valid when its search domain omits an admissible initial history, or the final orbital criterion rejects the constant nonzero angular comparison state merely for lacking a node. Exhaustive exclusion would require additional proof.

### HY-10 — High: the neon screen imposed the result and skipped dynamical prerequisites

Baseline lines 199–210; final lines 202–213. The benchmark fixed an inner pair and exactly eight outer assemblies, then made a cubic-like/antiprismatic stress minimum its success condition. That construction cannot establish the number eight, branch generation, or stability of the complete atom. Freezing support can suppress relevant perturbations.

The smallest repair identifies the neutral-neon comparison, labels the two-plus-eight split and candidate shapes as imposed screening choices, and distinguishes a geometric optimum from an admitted time-dependent history. It requires balance/evolution consistency before perturbation claims and accounts for all ten electrons plus nuclear/medium response. Population recovery must allow redistribution between tiers. Claim grade: derived for the circularity of inferring an imposed population; guessed for the candidate geometry and physical realization. Falsifier: show that the reported outer population was not constrained or fitted and emerged from independently supported delayed dynamics, then establish the claimed persistence and perturbation behavior of the same complete system. No such calculation was run here.

## Preservation and validation record

The complete baseline and final chapter reads cover history, element-property overview, diagrams, both equations, all hypotheses, observables, failure criteria, proposed benchmark, and references. The final editorial self-review finds the ten identified defects repaired at their stated scope. That judgment is inferred from the full reread against the sources above, and is falsified by a surviving instance at the final locations or contradictory live owner evidence.

The controlled Node harness below measured two byte-identical display blocks, both original equation links in order, and retention of every baseline link destination. Both equation IDs are still present in the existing generated registry. It accepted 71 chapter math spans, including two displays, with KaTeX `throwOnError: true` and `strict: 'error'`; all 16 local chapter links and four Markdown heading fragments resolved. These are syntax, layout-token, and path checks, not mathematical or physical acceptance.

An additional comparison using the controlled math extractor found only two baseline expression bodies absent verbatim from the final chapter: standalone `\ell`, replaced by its explicit integer-domain definition in HY-02, and `v=c_f`, corrected in HY-08. This is expression-body coverage, not a claim that inline expression order or multiplicity is unchanged. Existing displayed mathematics and both viewer anchors were preserved exactly.

Known controls ran in a separate controls-only process before the harness read the target. The process exited 0 and printed: `CONTROL PASS: SHA-256 abc; 2 math spans; invalid TeX rejected; 1 display; fenced math/link/heading excluded; existing/missing links; sum and dot.` The subsequent target process repeated those controls first and exited 0. Before report-target use, the artifact detector was narrowed to actual error markup so it would not flag its own fenced code; a separate controls-only run exited 0 after accepting a fenced literal error-class name and detecting an actual error span. An initial orchestration-string syntax error executed no shell process or checker; it was corrected before the successful control run. No target-derived output was used to set the expected controls.

The shell-capacity checks for $n=1,\ldots,5$, five-capacity sum 50, and transverse unit-speed counterexample passed. The independent references for those small calculations are the odd-number induction, ordinary finite addition, and the canonical causal-time and dot-product formulas shown above. Rendering and parser agreement do not strengthen those references or establish a physical branch.

| Command or inspection | Observed result and boundary |
| --- | --- |
| Complete `nl -ba` chapter reread | All 219 final lines reviewed after the sole chapter patch; chapter hash unchanged afterward. |
| Controlled harness below, controls-only and chapter runs | Exit 0; known cases precede target use; preservation, math, link, and bounded arithmetic results above. |
| `node --test tests/reference-surface-math-rendering.test.js` | Exit 0, one test passed; checks the existing reference renderer on a known fixture, not browser appearance or the entire app. |
| `git --no-optional-locks diff --check -- content/markdown/aaa/nuclear-atomic/hyde-periodic-table.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-hyde-periodic-table-review-2026-09-12.md` | Exit 0 after chapter repair; final report-inclusive rerun recorded below. |
| `node scripts/validate-equation-mapping-links.mjs` | Exit 0, 23 registered promoted equation links resolved repository-wide. The separate harness checks this chapter's two unpromoted links. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1: generated registry stale at `content/generated/equation-mapping/corpus-equations.json`; 199 Markdown files, 4,685 displays, 23 promoted equations, 30,436 symbol definitions observed. No other diagnostic in that run. |
| `node scripts/validate-content.mjs --check --strict` before report creation | Exit 0: 391 scene configurations, 199 corpus Markdown files, 1,684 repository Markdown files; zero errors, zero warnings, 30 notes. |

Registry context is fingerprinted from authored source, so this chapter's changed definitions/context require a registry refresh even though its two display equations did not change. The check is repository-wide and the checkout is concurrently edited; its stale result is not attributed wholly to this task, and no baseline clean-registry claim is made. The deferred exact command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check` in a separately authorized regeneration or publication workflow. Neither write command nor any other regeneration was run.

The strict validator's 30 informational notes concern repository-wide scene routing and audits, including 115 scenes without incoming links (a 25-entry listing with 90 omitted), the intentionally ignored periodic-table data JSON, comic audit, and stable-ID coverage. They are out-of-scope context, not Hyde repair failures, and were not changed. The pre-report snapshot contained no out-of-scope errors or warnings; it does not certify later concurrent bytes.

Final report-inclusive checks: the controlled harness exited 0 for the chapter and report; the report had 26 math spans, no displays, 20 local links, and no Markdown fragments. The chapter retained its 71 math spans, two displays, 16 local links, and four Markdown fragments. The scoped `git --no-optional-locks diff --check -- <chapter> <report>` exited 0 with no diagnostics. Since the new report is untracked, `git --no-optional-locks diff --no-index --check -- /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-hyde-periodic-table-review-2026-09-12.md` was also run: exit 1 for the differing files, with no whitespace diagnostics. A separate controlled stdin Node whitespace check exited 0: a known trailing-space line and tab-only line were first detected at lines 2 and 3, clean text was accepted, and only then the report was checked for trailing spaces/tabs and a terminal newline. These controls and assertions are included in the reproducible harness below.

The report-inclusive `node scripts/validate-content.mjs --check --strict` exited 0 with 391 scene configurations, 199 corpus Markdown files, and 1,687 repository Markdown files: zero errors, zero warnings, and the same 30 informational notes. The changed repository-wide file count is recorded as a concurrent-checkout observation, not attributed wholly to this two-path task. The complete final chapter and report were reread; the chapter hash remained the final hash above. The remaining stale-registry result is separate from these passing syntax, path, and whitespace checks.

## Reproducible scoped harness

From the repository root, run the following JavaScript through `node --input-type=module` on standard input. Set `CRW_PHASE=controls` for the controls-only run, then run again without that variable for the chapter and, when present, this report. The code writes no files. Its heading check covers the ordinary named headings used by these links; it is not a universal Markdown-fragment validator. The reference renderer is an existing project path, and the KaTeX bundle is read from the existing iOS asset directory without building or regenerating any iOS package.

```javascript
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { loadVendoredCommonJsBundle } from './scripts/load-vendored-commonjs-bundle.mjs';
import { renderMarkdownWithMath } from './src/apps/reference/ReferenceSurfaceRuntime.js';
import { parseCorpusDisplayEquations } from './scripts/build-equation-mapping-corpus.mjs';
const md = loadVendoredCommonJsBundle('vendor/markdown-it/markdown-it.min.js')();
const katex = loadVendoredCommonJsBundle('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js');
const chapter = 'content/markdown/aaa/nuclear-atomic/hyde-periodic-table.md';
const report = 'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-hyde-periodic-table-review-2026-09-12.md';
const baselineHash = '10d876025773e712de977231d9a38c3a1282be2791355b6a6467a1778c691358';
const finalHash = '214b830c94f3ea9df46c2cfc4030cca2c0a40963033124c5cd172f4ab051b7df';
const baselineCommit = '66e0e47de3797be86855acf6318aaab6c503031c';
const sha = s => createHash('sha256').update(s).digest('hex');
function math(source) {
  const spans = [], errors = [];
  const html = renderMarkdownWithMath(source, md, { renderToString(tex, options) {
    spans.push({tex, display:options.displayMode});
    try { return katex.renderToString(tex, {...options, throwOnError:true, strict:'error'}); }
    catch(e) { errors.push(e.message); return ''; }
  }});
  return {spans,errors,html};
}
function links(source) {
  const found=[];
  function walk(tokens) { for (const t of tokens) {
    if(t.type==='link_open') found.push(t.attrGet('href'));
    if(t.type==='image') found.push(t.attrGet('src'));
    if(t.children) walk(t.children);
  }}
  walk(md.parse(source,{})); return found;
}
const slug = s => s.toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').replace(/\s+/g,'-');
function anchors(source) {
  const tokens=md.parse(source,{}), out=[];
  for(let i=0;i<tokens.length;i++) if(tokens[i].type==='heading_open') out.push(slug(tokens[i+1].content));
  return out;
}
const exists = (base, href) => fs.existsSync(path.resolve(path.dirname(base),decodeURIComponent(href.split('#')[0])));
const dot = (a,b) => a.reduce((s,x,i)=>s+x*b[i],0);
const sum = xs => xs.reduce((a,b)=>a+b,0);
const trailingWhitespace = s => s.split('\n').flatMap((line,i)=>/[\t ]+$/.test(line)?[i+1]:[]);
assert.deepEqual(trailingWhitespace('good\nbad \n\t\n'),[2,3]);
assert.deepEqual(trailingWhitespace('good\n'),[]);
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const tick=String.fromCharCode(96), fence=tick.repeat(3);
const artifacts = /MATHSEGMENTTOKEN\d+X|<span class="katex-error"/;
assert.doesNotMatch(math(fence+'text\nkatex-error\n'+fence).html,artifacts);
assert.match('<span class="katex-error">',artifacts);
const control='Inline $x$.\n$$x^2$$\n[View →](../../../../equation-mapping.html#control)\n\n'+tick+'$ignore$'+tick+' [ok](AGENTS.md)\n'+fence+'tex\n$$ignore$$\n[bad](missing.md)\n'+fence+'\n';
assert.deepEqual(math(control).spans.map(x=>x.tex),['x^2','x']);
assert.equal(math(control).errors.length,0);
assert.equal(math('$\\notARealCommand$').errors.length,1);
assert.deepEqual(parseCorpusDisplayEquations(chapter,control).map(b=>b.tex),['x^2']);
assert.deepEqual(links(control),['../../../../equation-mapping.html#control','AGENTS.md']);
assert.deepEqual(anchors('# Known Heading\n\n'+fence+'\n# ignored\n'+fence),['known-heading']);
assert.equal(exists('control.md','AGENTS.md'),true);
assert.equal(exists('control.md','crw-005-known-missing-control-file'),false);
assert.equal(sum([1,2,3]),6); assert.equal(dot([1,0,0],[1,0,0]),1);
console.log('CONTROL PASS: SHA-256 abc; 2 math spans; invalid TeX rejected; 1 display; fenced math/link/heading excluded; existing/missing links; sum and dot.');
if(process.env.CRW_PHASE === 'controls') process.exit(0);
const baseline=execFileSync('git',['show',baselineCommit+':'+chapter],{encoding:'utf8'});
assert.equal(sha(baseline),baselineHash);
const source=fs.readFileSync(chapter,'utf8'); assert.equal(sha(source),finalHash);
const rawDisplays=s=>parseCorpusDisplayEquations(chapter,s).map(b=>s.slice(b.openStart,b.closeEnd));
assert.deepEqual(rawDisplays(source),rawDisplays(baseline));
const views=s=>links(s).filter(h=>h.includes('#corpus-equation-'));
assert.deepEqual(views(source),views(baseline));
for(const h of links(baseline)) assert.ok(links(source).includes(h),'lost link: '+h);
const registry=JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8'));
for(const h of views(source)) assert.ok(registry.records.some(r=>r.semanticId===h.split('#')[1]));
for(const file of [chapter,...(fs.existsSync(report)?[report]:[])]) {
  const s=fs.readFileSync(file,'utf8'), m=math(s); assert.deepEqual(m.errors,[]);
  assert.doesNotMatch(m.html,artifacts);
  assert.deepEqual(trailingWhitespace(s),[]); assert.ok(s.endsWith('\n'));
  let local=0, fragments=0;
  for(const h of links(s)) {
    if(/^[a-z][a-z0-9+.-]*:/i.test(h)) continue;
    const [part,fragment]=h.split('#');
    const resolved=part?path.resolve(path.dirname(file),decodeURIComponent(part)):path.resolve(file);
    assert.ok(fs.existsSync(resolved),'missing path '+file+' -> '+h); local++;
    if(fragment && resolved.endsWith('.md')) {
      assert.ok(anchors(fs.readFileSync(resolved,'utf8')).includes(decodeURIComponent(fragment)),'missing heading '+h); fragments++;
    }
  }
  console.log(JSON.stringify({file,math:m.spans.length,displays:m.spans.filter(x=>x.display).length,localLinks:local,markdownFragments:fragments}));
}
for(let n=1;n<=5;n++) assert.equal(sum(Array.from({length:n},(_,l)=>2*(2*l+1))),2*n*n);
assert.equal(sum([2,6,10,14,18]),50);
const cf=1, velocity=[1,0,0], line=[0,1,0];
assert.equal(Math.hypot(...velocity),cf); assert.equal(cf-dot(velocity,line),1);
console.log('PASS: exact 2 display blocks and 2 equation links; every baseline link retained; shell sums n=1..5 and sum=50; admitted unit-delay transverse hit has speed 1 and D_t=1.');
```

## Explicit closure limits and handoff

All ten finding IDs have a local repaired disposition. The meaning is correction of the stated text defects, not acceptance of the hypothesized physics. No theorem of assembly existence, physical branch retention, full spin/statistics recovery, medium constitutive law, chemical bonding geometry, period formation, nuclear response, neon stability, or high-$Z$ residual is claimed. No simulation was run, no EOM solver acceptance was tested or advanced, and no downstream corpus closure or theory closure is asserted.

Full Benfey historical-text verification and a complete artwork-label/property audit remain source obligations. The inherited history was preserved except for the supported date distinction and arithmetic-versus-physical-extension clarification. A separate reviewer can reopen a specific history claim on primary-text evidence. The task does not certify every atomic property or every observed element, and it does not audit the interactive Hyde app's behavior.

The coordinating task can review this receipt and incorporate HY-01–HY-10 into shared campaign records under its own authority. Recommended next scientific work is to derive and test one declared assembly/medium response before using packing outputs as atomic evidence. Broader calculations and registry regeneration remain deferred to their authorized owners.
