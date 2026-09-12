# CRW-005 Quarks Review — 2026-09-12

Status: ✓ Done — the assigned chapter review, demonstrated repairs, final read-through, and check-only validation runs are complete. The final recorded global strict audit reports one error in the separately owned electron report; it reports no errors in either assigned file. The generated equation registry remains stale and was left read-only as required. Done describes this bounded assignment, not a globally passing validation or scientific closure.

The assignment owns only [Quarks](../../../../content/markdown/aaa/assemblies/fermions/quarks.md) and this report. No shared review tracker, queue, log, other chapter, generated artifact, source index, or fixture was edited by this task. No staging, commit, push, PR mutation, branch operation, linked worktree, or generator write was performed.

## Baseline, final state, and scope

| Record | Measured value |
| --- | --- |
| Baseline chapter SHA-256, by shasum before editing | 1839cef1ce185b99ae2b65fff0ba27cef07ee3f1c249cc2c6161b3896d201ecb |
| Final chapter SHA-256, by shasum after repair | e4ea5dfe452b20e54055d2694fbfb770a3cdf02fc261c02fb4bea8be217ab028 |
| Baseline scoped status | No entries from the scoped git status command below; the report was absent by test -e inversion. |
| Chapter diff at closeout | 57 additions and 46 deletions by scoped git diff --numstat. |
| Exact files changed by this task | content/markdown/aaa/assemblies/fermions/quarks.md; reference/priorities/aaa-corpus-rewrite/evidence/crw-005-quarks-review-2026-09-12.md |

The complete target was read before repair and after repair. SHA-256 guards checked the expected chapter bytes at the scripted edit boundaries; the final small patch followed a fresh read of its exact passage. No unexpected target change was observed by those guards. They establish local byte continuity, not absence of all concurrent repository activity.

The baseline status instrument was:

```bash
git --no-optional-locks status --short -- content/markdown/aaa/assemblies/fermions/quarks.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-quarks-review-2026-09-12.md
shasum -a 256 content/markdown/aaa/assemblies/fermions/quarks.md
```

At final inspection, the same scoped git status command returned M for the chapter and AM for this report. The report had been staged since the baseline, with additional working-tree changes; this task performed no staging and did not alter that index state. The eventual publication runner must check the final working-file bytes rather than assume the staged report is the final report.

Line references below refer to the chapter at the corresponding baseline or final hash. The report is the only task-owned evidence record; shared-status integration remains with the assigning coordinator.

## Authorities and evidence inspected

Startup followed the complete live AGENTS.md, generated startup router, corpus-review owner, review and coordination skill owners, PI and assignment owners, parallel-work procedure, theory orientation, operator explanation standard, and goal-seeking procedure. The academic style guide and relevant mathematics, terminology, comparative-glossary, and source-policy passages controlled the repairs. Their summaries were not substituted for the chapter's actual claims.

The foundation anchors inspected were [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md). The review used their layer, primitive-inventory, polarity-normalization, absolute-coordinate, and observer-reconstruction boundaries; it did not conduct new reviews of those chapters.

The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) anchors were its canonical per-hit and all-root acceleration law, branch-chart/history compatibility, and relative-periodic moving-assembly conditions (live lines 549–639, 1363–1534, and 2214–2305). These require the same history to satisfy the acceleration law before stability or observer export is claimed. The review ran no EOM evolution and makes no solver-acceptance claim.

Nearby canon was inspected in [Color Charge and SU(3)](../../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md), especially dyad counting, family selection, the complex representation construction, baryon singlets, and confinement; [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md), especially dimensionful charge and local gauge covariance; [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md), especially the energy/response map, stability premise, and scheme-dependent quark comparison; [Quantum Number Mapping](../../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md); and the carrier proposal in [Gluons](../../../../content/markdown/aaa/assemblies/bosons/gluons.md). Stronger unproved phrasing in the carrier proposal was not treated as evidence overriding the more explicit color and gauge boundaries.

External sources were inspected only for claims that depended on them:

- [STAR Collaboration, Nature 650, 65–71 (2026), DOI 10.1038/s41586-025-09920-0](https://doi.org/10.1038/s41586-025-09920-0): equation (1), Figures 2–4, and the discussion distinguishing the BESIII comparison. This verifies attribution and the stated extraction, not Architrino physics.
- [Barnett, Lellouch and Manohar, PDG Quark Masses, 2025 edition, §§60.1–60.2](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-quark-masses.pdf): running versus constituent mass and scheme/scale definitions. The text records its August 2023 revision; no new mass values were extracted.
- [G. S. Bali, QCD forces and heavy quark bound states, hep-ph/0001312, §4.9](https://arxiv.org/abs/hep-ph/0001312): the pure-gauge/full-QCD distinction and string-breaking comparison. Its historical simulation status was not represented as current evidence.

The read-only subtask crw_005_quarks_algebra used the Terence Tao analytical lens and returned separate algebraic counterexamples. The root adjudicated these against current canon, performed source verification, and made the edits. Agreement between agents is not independent physics evidence. The independently checkable evidence is the algebra below and the external primary/reference sources; final editorial verification is bounded self-review plus a separate reader's original-scope recheck. The separate reader verified the final chapter hash with shasum and closed QA-1–QA-4 and the family-population finding after targeted reads; it identified no residual demonstrated defect within that original algebra scope.

## Findings and dispositions

Each finding below is ✓ Done for its specified textual repair. Major means that the passage represented a missing derivation as physical recovery or materially misidentified evidence; moderate means a local contradiction, dimension mismatch, or unsupported inference with a small repair. None is a measured failure of an evolved quark branch.

### QK-01 — Candidate structure was presented as recovered particle behavior

**Severity:** Major. **Baseline:** 5–11, 47–51, 67–69, 354–382, 565–585. **Final:** 5–13, 32–53, 69–71, 363–391, 572–596.

The overview claimed that the proposed construction reproduces the effective quark triplet; subsequent passages treated coherent constituent counts and retained axial records as supplied physical objects. Yet the chapter supplied no complete worldlines, initial history, all-root residual, return/stability record, or observer map. Its own opening and final open-obligation list set a weaker scope. This is a demonstrated claim-boundary inconsistency, not evidence that no such assembly can exist.

The repair supplies the substrate definitions and Master Equation link, explicitly grades the construction guessed, and states the retained-history and response conditions. Counts are conditional coherent inventories, not destruction of primitive architrinos. The color span is declared a complex orthonormal representation ansatz. The conclusion retains the dictionary while withholding branch and physical-response closure.

**Claim grade:** derived for the inference gap from the displayed premises; guessed for the proposed physical map. **Falsifier/reopening:** a complete, independently checked branch and observable response realizing these claims would justify stronger wording. A prescribed drawing or inventory table would not.

### QK-02 — Electric charge changes units without a map

**Severity:** Moderate. **Baseline:** 84, 112, 152, 158–162, 216–224, 239–259, 284, 315. **Final:** 32, 86, 114, 153, 159–162, 217, 224, 240–260, 285, 318.

The baseline defines dimensional electric charge as a multiple of e, then writes Y=2Q and Q=T3+Y/2 with dimensionless weak labels and table entries. Those are incompatible uses of one symbol. The repair declares e positive and Q dimensional, changes the weak equations and antiquark charge displays to Q/e, and labels table charge columns accordingly. The actual fractional-charge arithmetic and conjugation signs were preserved.

**Claim grade:** derived by dimensional analysis and direct substitution. **Falsifier:** a table row or equation still equating dimensional Q to dimensionless weak labels at the final hash. The physical six-unit charge realization remains guessed; fixing units does not derive it.

### QK-03 — Six occupied sites were confused with identical polarity inventory

**Severity:** Moderate. **Baseline:** 135–164 and 172–177. **Final:** 137–165 and 173–178.

The left-handed prose denied a different axial inventory while listing five-positive/one-negative and two-positive/four-negative inventories. Both use six sites, but their sign counts differ. Separately, hiding a proposed triad was described as implying the right-handed singlet assignment. An electric count or a single zero generator eigenvalue does not establish a weak representation.

The repair states the common site count and different polarity inventories. It takes the Standard Model singlet assignment as comparison input, then derives its hypercharge arithmetic; hidden-triad geometry remains a candidate implementation. Chiral weak labels are distinguished from spatial pro/anti orientation and from massive-state helicity.

**Claim grade:** derived for the count contradiction and missing implication; guessed for the weak-geometry implementation. **Falsifier/reopening:** a specified retained geometry whose complete weak response derives the representation would supply the missing implication. Merely matching electric charge would not.

### QK-04 — Generation labels implied radius ordering and a lifetime verdict

**Severity:** Moderate. **Baseline:** 26–28, 315–322, 336, 344, 398. **Final:** 28–32, 316–325, 339, 347, 405–410.

The charm description called support index 3 an outer tier, despite the explicit rule that support indices are not radius ranks. The top description inferred least stability from greatest exposure; the table assigns the same coherent count to bottom, so that count alone cannot rank their lifetime. The implementation list retained three neutral source binaries without restricting its scope to Generation I, contradicting the depleted-support rows when read as a universal prescription.

The repair uses support index 3, removes the lifetime deduction, scopes the intact-source implementation to Generation I, and explains the table's pro-oriented representatives. A lifetime needs actual branch and reaction dynamics with an observer clock map. Depleted-support candidates are not silently relabeled as complete six-architrino Noether braids.

**Claim grade:** derived for the local contradictions and missing implication. **Falsifier/reopening:** a declared branch-specific radius ordering and a validated lifetime calculation could support those particular claims; neither follows from index or constituent count.

### QK-05 — Three labels and norm preservation do not derive local SU(3)

**Severity:** Major. **Baseline:** 354–382 and 495–508. **Final:** 363–391 and 504–517.

A three-element label set has no complex amplitudes or Hermitian norm until those structures are specified. Once supplied, norm preservation allows U(3); removing an overall phase gives the projective group, not an unambiguous determinant-one amplitude representation. Preservation conditions also do not show that dynamics accesses the full group: the identity subgroup already satisfies them.

The repair declares the effective complex state space and chosen volume-form condition, distinguishes the projective quotient from SU(3), and states the remaining history-to-amplitude and local-connection obligations. It retains the eight-dimensional matrix count while withholding the inference to eight physical gluon channels. The removed singlet is identified as the trace component of the quark–antiquark operator space; its removal proves no confinement law.

**Claim grade:** derived for the representation identities and counterexample; guessed for physical realization. **Falsifier/reopening:** an independently derived local transport/response map realizing the full action with correct observables could establish physical recovery. An eight-matrix list or arbitrary axis permutations cannot.

### QK-06 — One-of-each color assignment is not the baryon singlet

**Severity:** Major. **Baseline:** 444–449. **Final:** 453–458.

A closed nine-axis network and one occurrence of each label describe proposed geometry. They do not produce the antisymmetric amplitudes needed for a color singlet. The explicit generator counterexample below changes the single basis assignment. The repair gives the normalized antisymmetric baryon state and meson singlet, preserves the network as a candidate realization, and separates singlet invariance from spatial screening and retention.

**Claim grade:** derived for conditional SU(3) tensor algebra. **Falsifier:** a failed invariance identity for the stated normalized singlet or vanishing of the nonzero single-assignment counterexample. Physical network identification remains guessed.

### QK-07 — Confinement was asserted outside its stated regime

**Severity:** Major. **Baseline:** 473–491 and 521. **Final:** 482–500 and 530.

The baseline treated an approximately linear open-sector energy as universal, concluded isolated-color exclusion from that sentence, and limited closure to mesonic or baryonic singlets. The neighboring confinement owner distinguishes an unscreened static-source comparison from dynamical-quark string breaking and from observer free-color bounds. Tensor products also permit larger singlets; the two simplest singlet examples are not an exhaustive classification.

The repair states the unscreened regime, identifies energy, observer length, and energy-per-length tension, and retains screening, energy-map, and detector bounds as separate obligations. The pure reconfiguration rules are scoped to an existing quark vertex so they do not silently prohibit strong pair-production channels. No confinement energy or string tension was computed.

**Claim grade:** derived for the overreach relative to the declared comparison; guessed for the proposed corridor realization. **Falsifier/reopening:** a retained response and properly matched energy/production prediction could establish confinement in its declared regime. The tensor-product identity alone cannot establish or refute binding of a larger singlet.

### QK-08 — Empirical benchmark attribution and response definitions were wrong or incomplete

**Severity:** Major for attribution; moderate for undefined map inputs. **Baseline:** 525–559, especially 540. **Final:** 534–568.

Source inspection verifies STAR as the experiment supplying the stated benchmark; BESIII is a separate comparison in that source. The repair corrects attribution, preserves the source-matched angular equation, names the extraction variables, and defines all arguments of the proposed hadronization response. It distinguishes observer separation from Euclidean distance and measurement from microscopic interpretation. The response is still an unevaluated target, not a measured Architrino prediction.

**Claim grade:** measured for source attribution by inspecting the cited paper; derived for the equation's normalization conditional on its defined parameters. **Falsifier:** source equation (1) or Figures 2–4 failing to support the repaired attribution/extraction; for a future response map, a fixed prediction outside matched experimental uncertainties after declared corrections. The review performed no detector-data reanalysis.

### QK-09 — Stability was equated with an additional observable species

**Severity:** Moderate. **Baseline:** 133 and 440. **Final:** 135, 449, 588.

Two stable mathematical families do not by themselves imply two observed species. The extra branch must be populated and distinguishable by the admitted observer record. The current color owner makes those conditions explicit. A mathematical family with zero preparation weight or identical accessible response is a counterexample to the bare inference.

The repair retains single-family selection as the catalog hypothesis and requires population and distinguishability before extra-species claims. It does not supply a population model or assert that the two families are physically equivalent.

**Claim grade:** derived for the inference gap. **Falsifier/reopening:** a specific preparation and response derivation establishing distinct populated families would support comparison of their additional signatures with data.

## Algebra controls and preserved mathematics

The dyad count can be checked independently of the chapter's tables. Let n+, n-, and nm count positive, negative, and mixed dyads. They obey 2n+ + nm = N+, 2n- + nm = N-, and n+ + n- + nm = 3. For the up inventory (5,1), the only solution is (2,0,1); for down (2,4), the solutions are (1,2,0) and (0,1,2). Including pole order gives six up configurations and fifteen down configurations: three Family-I configurations plus three exceptional-axis choices times four mixed-pole orderings in Family II. Grouping those microscopic orderings into one color record remains a response-map assumption.

**Claim grade: derived.** A further nonnegative integer solution or a missing assignment among the six-site sign placements would falsify completeness. The hand derivation is the independent mathematical reference for the in-session enumeration; matching a table alone is not the reference.

All eight matter/antimatter electroweak rows satisfy the repaired relation Q/e=T3+Y/2 by fraction arithmetic. Charge conjugation reverses the signed inventories and weak labels as displayed. This conditional bookkeeping does not derive the physical chirality or polarity-conjugate branch.

For the SU(3) phase issue, write det U=exp(i theta). The three representatives exp[-i(theta+2 pi k)/3]U, k=0,1,2, all have determinant one and differ by central scalar cube roots. They are identical on rays. A Hermitian 3-by-3 matrix has three real diagonal and six real off-diagonal parameters; removing its trace leaves eight. These are exact algebraic identities, not a mode measurement.

For the singlet counterexample, let H=(E12+E21)/2, with Eab the matrix unit. The sum of H acting on each factor sends the single assignment |123> to (|223>+|113>)/2, which is nonzero. The antisymmetrized sum transforms by det U and is invariant for SU(3). A tensor product of two meson singlets is also a singlet in the four-factor space; this alone proves no localized tetraquark branch but refutes a meson/baryon-only algebraic restriction.

For the measured angular form, put x=cos(theta*) and a=alpha1 alpha2 P. Its integral from x=-1 to 1 is [x/2+a x^2/4] evaluated at the endpoints, which is one. Nonnegativity of this linear density requires |a|<=1; physical spin-state constraints require the corresponding state/response model and are not derived merely by this normalization check.

## Known-case-first instruments

No new checker files were created. The following snippets reproduce the in-session checks. Their control passes were recorded in this report before their first target runs; the record was then expanded into this final account. At final QA, both snippets were extracted from this report and executed successfully under Node. The extractor first passed a synthetic one-block input with known output, before reading the report; each reproduced checker then passed its own controls before its target assertions or read.

### Dyad enumerator

The all-positive and all-negative known cases passed first with exactly one expected tuple each. The target run then returned up [[2,0,1]] and down [[0,1,2],[1,2,0]], exit 0.

```javascript
const assert = require('node:assert/strict');
function dyads(np,nm) {
  const out=[];
  for(let p=0;p<=3;p++) for(let n=0;n<=3;n++) for(let m=0;m<=3;m++)
    if(p+n+m===3 && 2*p+m===np && 2*n+m===nm) out.push([p,n,m]);
  return out;
}
// Known controls were run and recorded before the target assertions.
assert.deepEqual(dyads(6,0),[[3,0,0]]);
assert.deepEqual(dyads(0,6),[[0,3,0]]);
assert.deepEqual(dyads(5,1),[[2,0,1]]);
assert.deepEqual(dyads(2,4),[[0,1,2],[1,2,0]]);
```

### TeX and link scanner

The control fixture contained one inline formula x^2, one display fraction, one visible link, an inline-code link, and a fenced formula/link. Exact extraction and code exclusion passed; KaTeX accepted both valid expressions and rejected malformed fraction syntax before target access. The target result was 222 TeX expressions including 28 displays, 42 local links, two external links, and no errors. Existing file links were tested by fs.existsSync after removing their fragments; this does not validate fragment routing. The external evidence URLs were inspected through the web tool separately.

```javascript
const fs=require('node:fs'), path=require('node:path');
const assert=require('node:assert/strict'), katex=require('katex');
function scan(src) {
  let fenced=false;
  const body=src.split('\n').map(line=>{
    if(/^\s*(?:\x60{3}|~~~)/.test(line)){fenced=!fenced;return '';}
    return fenced?'':line.replace(/\x60[^\x60]*\x60/g,'').replace(/\\\$/g,'');
  }).join('\n');
  return {
    math:[...body.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g)]
      .map(m=>({tex:m[1]??m[2],display:m[1]!==undefined})),
    links:[...body.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)].map(m=>m[1])
  };
}
const fixture='$x^2$\n\n$$\n\\frac{1}{2}\n$$\n[valid](ok.md)\n\x60[inline](skip.md)\x60\n\x60\x60\x60md\n$ignored$ [fenced](skip.md)\n\x60\x60\x60\n';
const control=scan(fixture);
assert.deepEqual(control.math,[{tex:'x^2',display:false},{tex:'\n\\frac{1}{2}\n',display:true}]);
assert.deepEqual(control.links,['ok.md']);
for(const m of control.math) katex.renderToString(m.tex,{displayMode:m.display,throwOnError:true});
assert.throws(()=>katex.renderToString('\\frac{',{throwOnError:true}));
console.log('Known controls passed before target read.');
const p='content/markdown/aaa/assemblies/fermions/quarks.md';
const got=scan(fs.readFileSync(p,'utf8'));
for(const m of got.math) katex.renderToString(m.tex,{displayMode:m.display,throwOnError:true});
const local=got.links.filter(x=>!/^https?:/.test(x));
for(const link of local) assert(fs.existsSync(path.resolve(path.dirname(p),link.split('#')[0])),link);
console.log({math:got.math.length,display:got.math.filter(x=>x.display).length,
  localLinks:local.length,externalLinks:got.links.length-local.length});
```

This small scanner supports the syntax used in this chapter. It is not a general Markdown parser, link-fragment validator, browser-layout test, or mathematical proof checker. It does not certify all possible delimiter escapes or nested Markdown. No EOM, physical stability, cost, mass, or detector result was inferred from either scanner.

## Check-only validation and generated drift

| Command or instrument | Result and limit |
| --- | --- |
| node scripts/validate-content.mjs --check --strict | Earlier run: exit 0, 0 errors, 0 warnings, 30 notes, 1667 repository Markdown files. Final recorded run after chapter and reproduction-snippet completion: exit 1, 1 error, 0 warnings, 30 notes, 1668 repository Markdown files; the only diagnostic is in the separately owned electron report, detailed below. Both runs discovered 391 scene configurations and 199 corpus Markdown files. This is structural content validation, not scientific validation. |
| git --no-optional-locks diff --check -- content/markdown/aaa/assemblies/fermions/quarks.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-quarks-review-2026-09-12.md | Exit 0, no whitespace diagnostics. The normal diff covers index-to-working-tree changes; the complete-report comparison below checks its full new-file content regardless of staging state. |
| git --no-optional-locks diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-quarks-review-2026-09-12.md | Exit 1 with no whitespace diagnostics; this compares the complete new report against an empty file and returns the no-index difference status. |
| In-session dyad check | Exit 0 after known controls; target counts match the independent hand derivation. |
| In-session KaTeX/local-link check | Exit 0 after known controls; 222 expressions, 28 displays, 42 local links, 2 external links, no errors. |
| node scripts/build-equation-mapping-corpus.mjs --check | Exit 1: generated registry is stale at content/generated/equation-mapping/corpus-equations.json. The run reported 199 Markdown files, 4685 display equations, 23 promoted equations, and 30427 symbol definitions. This global drift result is not attributed solely to this chapter. |
| shasum -a 256 content/markdown/aaa/assemblies/fermions/quarks.md | Final hash recorded above. |

The final strict diagnostic is at reference/priorities/aaa-corpus-rewrite/evidence/crw-005-electron-review-2026-09-12.md:25: the checker reads a mathematical function-argument example as a Markdown link to the nonexistent relative target y. A scoped source read confirmed the example; the link extractor at scripts/validate-content.mjs:750–767 does not exclude inline code. This is an out-of-scope validation diagnostic, not a demonstrated defect in the electron mathematics. Its owner can adjust the example presentation or route the parser obligation, then rerun the global check. This task did not edit that report or the validator.

An intermediate strict run also diagnosed this report's synthetic links because the link extractor recognizes backtick fences but not tilde fences. Changing only this report's code-fence delimiters to backticks removed all three task-owned diagnostics in the final recorded run. The synthetic control contents and checker behavior were preserved. This finding does not establish that other documents have the same problem.

Required regeneration command, recorded but not executed: node scripts/build-equation-mapping-corpus.mjs --write. The existing equation links and identifiers were preserved, including the charge displays whose units were repaired. Equation registry freshness is deferred under the assignment's explicit generated-write prohibition. No blanket generated-freshness or repository-health claim is made; other generator checks were not run.

## Optional additions, unresolved obligations, and reopening

The mass comparison boundary at final lines 353–357 makes the requested review lens explicit and links the existing Particle Masses owner and PDG definition. It adds no numerical mass prediction and is not counted as a discovered wrong mass value. Illustrative diagrams, broader prose compression, and fully quantitative mass or reaction modeling were outside this bounded repair.

| Status | Remaining scientific obligation | Reopening condition or falsifier |
| --- | --- | --- |
| ○ Open | Retained quark candidates with bound axial sites | Complete worldlines and delayed-history boundaries must satisfy the Master Equation; a nonzero controlled residual refutes the proposed solution. Root/history incompleteness means uncertified, not a zero contribution. |
| ○ Open | Stability, higher-generation color retention, and lifetimes | First establish the actual solution or invariant family, then analyze perturbations and reactions on that history. Loss of the axial record or an incompatible lifetime falsifies that candidate. |
| ○ Open | Family selection, population, and pole-order equivalence | Specify preparation/environment and the observer map. Distinct predicted populated signatures excluded by data fail the map; comparable mathematical stability alone does not. |
| ○ Open | Complex amplitudes, local color connection, and gluon response | Derive the same record's transport, coupling, and passive-basis invariance. Observable dependence on supposed gauge relabeling or an inaccessible required generator fails the proposed recovery. |
| ○ Open | Mass and hadron response | Derive energy/exposure/medium response and match one scheme, scale, and observable. Do not compare constituent-model numbers, running masses, and hadron masses as one quantity. |
| ○ Open | Confinement and larger singlet behavior | Supply an energy/response law in a declared source sector, controlled screening/string-breaking regime, and detector production map. A fixed incompatible energy or free-color prediction fails that map. |
| ○ Open | Hadronization correlation and weak response | Use retained events, a preparation ensemble, reaction accounts, and calibrated detector response. Agreement by defining outputs from measured values is not evidence. |
| ○ Deferred | CKM derivation, diagrams, downstream propagation, shared tracker integration | Belong to their existing owners or the assigning coordinator. No new assignments or acceptance scores were created here. |

This disposition is bounded: it completes review and repair of the assigned chapter and its report. It does not establish theory closure, downstream corpus closure, retained quark existence, solver certification, Standard Model recovery, or empirical acceptance of the assembly hypothesis.
