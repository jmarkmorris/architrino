# CRW-005 — No-Go Theorems bounded review — 2026-09-13

## Scope and disposition

Priority 5 on the unified CRW-005 board: [No-Go Theorems](../../../../content/markdown/aaa/validation/no-go-theorems.md). The complete chapter received a bounded review and safe repairs for NGT-01–NGT-09. These are two High and seven Medium finding groups. High denotes a defect that can change a mathematical or evidentiary inference; Medium denotes a consequential definition, scope, attribution, or exposition defect. Completion is document-level disposition, not physical acceptance, EOM solver acceptance, theory closure, or publication.

Only the assigned chapter and this receipt were written by this worker, `crw-005 no-go-theorems worker`. Shared CRW-005 status, priorities, work log, and queue remain the coordinator's responsibility. No supporting agent was launched; this is editor self-review. Agent agreement is not independent mathematical evidence; the separate enumeration, state-vector, matrix-product, set-inclusion, and dimensional-exponent references named below supply the bounded mathematical checks, and the external sources named below supply the theorem hypotheses.

Claim grade: measured. Before editing, `git --no-optional-locks status --short -- <chapter>` on the chapter was empty, `git rev-parse HEAD` returned `06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95`, and the chapter's SHA-256 from `sha256sum` matched both the coordinator-measured value and the bytes returned by `git show 06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95:content/markdown/aaa/validation/no-go-theorems.md` (182 lines):

    a949646703056c6cd6ce7b08f963679e6df7cc39daf1d214681c3fc8c51f9bbd

Final chapter SHA-256 from `sha256sum` (189 lines):

    151936037ffbb99cfcd636a037f3cb35daf8a0906aab135e7ecd243561118529

Falsifier: different chapter bytes invalidate this byte-specific handoff until the difference is reviewed. No staging, commit, push, publication, reset, stash, restore, checkout, or worktree operation was performed by this worker, and no generator `--write` was run.

One index observation belongs with the handoff. At the final scoped status the chapter showed `MM`: the Git index holds a snapshot of this worker's edits taken partway through the editing pass (index blob SHA-256 `51cde4e5916d80eea8f144a2b9a0b4b39a8cbbcab33ec1b112a01ee4f7ddec08`, containing the repairs up to the CPT row but not the Weinberg-Witten row or later paragraphs), while the working tree holds the complete repaired chapter at the final hash above. This worker ran no `git add`; a concurrent actor staged the file. The working-tree bytes are the reviewed handoff, and any staging or publication runner must restage from them. Attribution of the staging action is unresolved by this receipt.

## Authority and source support

The live AGENTS.md, generated startup router, Corpus Reviewer procedure, Integrator Reviewer discipline, theory orientation, operator explanation standard, and the academic, mathematical, terminology, and comparative-glossary authorities governed the review. The explicit assignment supplied repair authority and restricted writes to two paths. The live CRW-005 board listed No-Go Theorems as unread priority 5; this worker does not update or infer new shared board counts.

Nearby corpus owners read as evidence and not edited: [Ontology](../../../../content/markdown/aaa/foundations/ontology.md#bell-nonlocality-placement) for the selected Bell route and its speed-hierarchy obligation; [Bell's Theorem](../../../../content/markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md) and [Entanglement and Nonlocality](../../../../content/markdown/aaa/philosophy-history/theory-bridges/entanglement-nonlocality.md) for the $c_f$ coordination channel and the no-signaling boundary; [Failure Criteria](../../../../content/markdown/aaa/validation/failure-criteria.md) for the shared closure record $\theta$, the null-result residual, and the no-go pass predicate $\mathcal{G}_S$; [Measurement Ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md) and [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md) for retained history, basins, transition operator, and preparation-selected measure; [Quantum Operator Mapping](../../../../content/markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md) for the context-indexed record expression; the [Bell-family record-measure harness](../../../../content/markdown/aaa/validation/simulations/bell-family-record-measure.md) for $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$; [Gravitational Waves](../../../../content/markdown/aaa/spacetime/gravitational-waves.md) for the dimensionless dispersion and polarization diagnostics; [Lorentz Kinematics](../../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), [PPN Parameters](../../../../content/markdown/aaa/spacetime/ppn-parameters.md), [Dark Energy](../../../../content/markdown/aaa/cosmology/dark-energy.md), [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), [Noether Braid](../../../../content/markdown/aaa/noether-braid/noether-braid.md), [Black Holes](../../../../content/markdown/aaa/spacetime/black-holes.md), and [Terminology Usage](../../../../content/markdown/aaa/archie/terminology-usage.md) as link targets for the added clues. The web runtime [MarkdownRuntime.js](../../../../src/runtime/MarkdownRuntime.js) was inspected to confirm that display blocks are stashed before Markdown lexing, which settles a rendering hazard noted under the validation record.

External sources were inspected as observer-level constraints, never as substrate premises. Bibliographic identity was verified through the Crossref API for each DOI; the arXiv abstracts of the two Nature Physics papers were read in session:

- A. Gleason, *Measures on the Closed Subspaces of a Hilbert Space*, Indiana Univ. Math. J. 6, 885–893 (1957), DOI 10.1512/iumj.1957.6.56050. Crossref confirms the existing chapter link.
- S. Kochen and E. Specker, *The Problem of Hidden Variables in Quantum Mechanics*, Indiana Univ. Math. J. 17, 59–87 (1967), DOI 10.1512/iumj.1968.17.17004. Crossref confirms the existing chapter link; the DOI year token differs from the print year, which is normal for this journal.
- M. F. Pusey, J. Barrett, and T. Rudolph, *On the reality of the quantum state*, Nature Physics 8, 475–478 (2012), DOI 10.1038/nphys2309. The arXiv 1111.3328 abstract states the two hypotheses the chapter names: the quantum state represents mere information about an underlying physical state, and independently prepared systems have independent physical states.
- J. S. Bell, *On the Einstein Podolsky Rosen paradox*, Physics Physique Fizika 1, 195–200 (1964), DOI 10.1103/PhysicsPhysiqueFizika.1.195. Crossref confirms the record; the chapter's Sources section notes that the stochastic factorizability form belongs to the later CHSH-era statement.
- J.-D. Bancal et al., *Quantum non-locality based on finite-speed causal influences leads to superluminal signalling*, Nature Physics 8, 867–870 (2012), DOI 10.1038/nphys2460. The arXiv 1110.3795 abstract states the result the chapter now records: for any finite influence speed above the light speed, such models predict correlations exploitable for faster-than-light communication, so assuming no superluminal signaling excludes every finite-speed influence model of the target correlations. Ontology already cites this obstruction; the chapter's Bell row now carries it.
- S. Weinberg and E. Witten, *Limits on massless particles*, Physics Letters B 96, 59–62 (1980), DOI 10.1016/0370-2693(80)90212-9. Crossref confirms the bibliographic record. The two-theorem statement written into the chapter (a Lorentz-covariant conserved current forbids charged massless particles of spin above one half; a Lorentz-covariant conserved stress tensor forbids massless particles of spin above one) is the paper's stated result as commonly cited; the publisher page timed out in session, so that statement is graded inferred rather than measured against the paper's own text. Falsifier: the paper's abstract stating different hypotheses.

Pre-edit `rg -l -F` for the exact chapter path under content/, scripts/, tests/, and reference/ found these consumer classes: the equation registry (`content/generated/equation-mapping/corpus-equations.json`), the generated reference surface and source-index snapshot, the scene graph and textbook TOC (`content/graph/`), the Markdown index, the scene configuration `content/scenes/validation/no_go_theorems.json`, four Research Office role files, the CRW-005 board, two sibling receipts, three dormant priority packets, and the source-mining history. A basename search additionally found generated reading copies, the iOS textbook package, the source-index test fixture, and eleven authored cross-links from other chapters; two of those cross-links use the fragment `#applicability-map`, whose heading is retained. This bounds the search; it does not establish absence of every byte-sensitive consumer. All consumers remained read-only.

## Findings and repairs

Baseline lines refer to the hash-verified original chapter, not current line positions. Each disposition below is implemented; an open scientific obligation is not counted as a demonstrated physical failure.

| ID | Severity | Baseline lines | Evidence, repair, grade, and falsifier |
| --- | --- | --- | --- |
| NGT-01 | High | 49 | The Bell row attributed the escape to retained path history and detector response without naming the hypothesis that fails. Bell's derivation admits any hidden state, including the complete retained history, so retaining $\mathcal{H}$ does not evade the theorem, and the foundation owner says the same of a finite propagation speed. Repair: the row now names Bell factorizability as the rejected hypothesis with status `replaced`, carried by the live $c_f$-mediated coordination channel outside the effective photon cone, which requires $c_f > c_0$; measurement independence and observer no-signaling stay accepted; the Bancal finite-speed signaling obstruction is added as a failure condition and source; the row links the Bell bridge and the ontology placement. Claim grade: derived for the hypothesis structure and measured by comparison with the ontology owner and the two abstracts. Falsifier: a Bell-local, measurement-independent model that reproduces the CHSH violation from retained history alone, which the theorem excludes, or a canon decision selecting a different route. |
| NGT-02 | High | 145–176 | The dispersion term of the finite-range residual integrated $\lvert\partial^2\omega_\theta/\partial k^2\rvert^2$, which carries length-to-the-fourth over time-squared in any unit system, inside a sum whose other terms are pure numbers; the weighted sum was therefore not comparable across terms. Repair: the display now integrates the live gravitational-wave owner's dimensionless diagnostic $\lvert(\omega_\theta/c_0^2)\,\partial^2\omega_\theta/\partial k^2\rvert^2$; the prose names the weights, tolerances, band, frequency, wave number, and $c_0$, and states that a dispersionless record makes the term vanish. Viewer identity `corpus-equation-3d02cb85278d2376` changed body; no display was added or removed. Claim grade: derived by dimensional exponent bookkeeping. Falsifier: a declared unit convention under which the original integrand is dimensionless. |
| NGT-03 | Medium | 13–43 | The five stance values were never defined, and the class definitions lacked quantifiers, so a theorem with one accepted and one rejected assumption satisfied both the `direct` and the `replacement constraint` clause. Repair: each status is defined once; `direct` requires every assumption accepted or effective; the other classes require at least one rejected, replaced, or absent assumption; the mismatch/replacement distinction is stated as the presence of a protected tested behavior. Both displays are byte-identical. Claim grade: derived as a definition repair. Falsifier: a row of the map whose class the repaired definitions no longer reproduce. |
| NGT-04 | Medium | 56 | The Lorentz row said failure occurs when absolute motion is detectable, which contradicts the substrate ontology in which the absolute frame is real; the symbols $\epsilon_{\mathrm{LV}}$, $\Delta_{\mathrm{tw}}$, and $\beta_f$ were unnamed. Repair: the failure condition is a candidate record predicting observer-level leakage above accepted thresholds; the symbols are named and linked to Lorentz Kinematics and PPN Parameters. Claim grade: measured against the comparative glossary's absolute-frame entry. Falsifier: a canon statement that observer-level detection of the absolute frame is itself the tested prediction. |
| NGT-05 | Medium | 61 | The Weinberg-Witten row cited only the stress-tensor hypothesis and wrote a failure condition that combined claiming a covariant composite with denying the theorem's assumptions, which is not a coherent hypothesis test. Repair: the row states both theorems with their separate hypotheses, notes that a composite photon is touched only if it carries the conserved charge of a covariant current while a composite graviton is touched whenever a covariant conserved stress tensor exists, and makes the failure condition the record satisfying those hypotheses. Claim grade: inferred from the theorem statement as cited, with bibliographic identity measured. Falsifier: the paper's text assigning different hypotheses to the two parts. |
| NGT-06 | Medium | 71–102 | The GHZ, Hardy, and Mermin-Peres passages stated benchmark facts without the reason: the GHZ product argument, the local-realist inclusion behind the Hardy margin, and the parity argument's structure were absent, the contexts $X$ and $Y$ were unnamed, and the context signs were written as a set with repeated elements. Repair: each argument is stated in one or two sentences; the sign multiset is stated in words; the residuals' zero conditions are stated. All three displays are byte-identical. Claim grade: derived; each argument is reproduced by the enumeration and state-vector witnesses below. Falsifier: a local assignment with GHZ product $-1$, a local assignment with positive Hardy margin, or a noncontextual magic-square assignment with total product $-1$. |
| NGT-07 | Medium | 104–116 | The total variation distance was unnamed, the substrate states $\lambda_A,\lambda_B$ were unintroduced, and the closure target exercised only the preparation-independence hypothesis although the theorem has two. Repair: $D_{\mathrm{TV}}$ is named; the target reports both overlap status and factorization status; the reading in which the effective wavefunction is a function of retained history, so distinct effective states have disjoint supports, is stated as failing the overlap hypothesis without any preparation correlation. The display is byte-identical. Claim grade: derived from the theorem's hypothesis list. Falsifier: a statement of the theorem that does not assume overlap. |
| NGT-08 | Medium | 118–143 | Probe times used bare $t_i$, an undeclared coordinate layer; $\mathcal{K}_i$, the conditional laws, $C_{ij}$, and $\Delta_{\mathrm{NIM}}$ were not named in words; the bound $K_{\mathrm{LG}}\le1$ was asserted without its reason. Repair: ordered absolute times $T_1 < T_2 < T_3$, the apparatus kernels, and both laws are named; the bound is explained by the sign enumeration. Both displays are byte-identical. Claim grade: derived (enumeration witness W1) and measured against the mathematical style guide's layer rule. Falsifier: an assignment of three signs giving a combination above one. |
| NGT-09 | Medium | 3, 28, 49–65, 67, 182 | Imported objects and terms were used without a clue or link at first use: the theory name, architrino, candidate record $\theta$, retained history $\mathcal{H}$, basins, $\mu_*$, $\mathcal{T}_{\Delta t}$, apparatus kernels, Physical Observer, Noether sea, Noether braid, $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}$, $\mathcal{R}_{\mathrm{null}}$, the components of $\mathcal{R}_{\mathrm{CPT}}$, the record expression of the Kochen-Specker row, $\mathcal{R}_{\mathrm{GR}}$, $\mathcal{R}_{\mathrm{shared}}$, and the black-hole chapter; $\mathcal{G}_S$ was called the sector predicate although Failure Criteria names it the no-go pass predicate. Repair: an orientation paragraph defines the shared objects with links to their owners; in-place names and links were added where a row uses the object; the predicate is named as its owner names it. No claim, grade, or falsifier changed. Claim grade: inferred exposition repair against edition 1.1 of the academic style guide and the owners' definitions. Falsifier: an added clue that conflicts with its owning chapter's definition. |

Not raised as findings: the GHZ residual's positive part never activates because $1-\chi_C E\ge0$ whenever $\lvert E\rvert\le1$ (witness W6); it is harmless and was left. The Coleman-Mandula, Frauchiger-Renner, Groenewold-van Hove, Gleason, Kochen-Specker, boundary-Hamiltonian, global-GR, and massive-gravity rows state their hypotheses at the correct level and were not edited beyond NGT-09. Bare `$t$` inside the canonical symbol $\mathcal{T}_{\Delta t}$ is the owner's spelling and was preserved.

## Independent mathematical checks and boundaries

For NGT-01, the reference is the logical form of Bell's hypothesis: the factorization $P(a,b\mid\hat m_A,\hat m_B,\lambda)=P(a\mid\hat m_A,\lambda)P(b\mid\hat m_B,\lambda)$ is quantified over every $\lambda$ drawn from a settings-independent distribution, so enlarging $\lambda$ to contain the complete retained history changes nothing in the derivation of the CHSH bound. The Ontology chapter states the same conclusion independently. The route the chapter now names, a live coordination channel at $c_f$ outside the photon cone, is the ontology owner's selected route; this receipt does not establish that the channel exists, that $c_f > c_0$, or that it evades the Bancal obstruction. Those remain NGT-O1.

For NGT-02, write dimensions as exponent pairs (length, time). Angular frequency is $(0,-1)$, wave number is $(-1,0)$, so $\partial^2\omega/\partial k^2$ is $(2,-1)$ and its square is $(4,-2)$, not dimensionless. Multiplying by $\omega/c_0^2$, with $c_0$ at $(1,-1)$, gives $(0,-1)+(2,-1)-(2,-2)=(0,0)$, so the squared corrected integrand is a pure number, and $d\log f$ is dimensionless. Setting $c_f=1$ does not rescue the original term, because the residual length exponent survives. Witness W5 encodes this bookkeeping.

For NGT-06 and NGT-08, the references are exhaustive enumeration and explicit linear algebra rather than the chapter's prose. Over all eight assignments of $q_1,q_2,q_3\in\{-1,+1\}$ the combination $q_1q_2+q_2q_3-q_1q_3$ ranges over $[-3,1]$, so its average under any distribution is at most one (W1). Over all 64 local assignments of $X$ and $Y$ values on three wings the product of the four GHZ context products is $+1$, while the state $(\lvert000\rangle+\lvert111\rangle)/\sqrt2$ has expectation values $+1,-1,-1,-1$ on $XXX,XYY,YXY,YYX$ computed from explicit $8\times8$ Pauli tensor products, with product $-1$; the sign-flipped GHZ state also gives product $-1$ (W2). The nine two-qubit operators $XI,IX,XX;IY,YI,YY;XY,YX,ZZ$ commute within each row and column, the six context products are $+I$ five times and $-I$ once, and all 512 noncontextual value assignments give total product $+1$ (W3). Over all sixteen local deterministic assignments of the Hardy settings the margin $P(D_1{=}1,D_2{=}1)-P(U_1{=}1,U_2{=}1)-P(D_1{=}1,U_2{=}0)-P(U_1{=}0,D_2{=}1)$ is at most zero, and the inclusion $\{D_1=D_2=1\}\subseteq\{U_1=U_2=1\}\cup\{D_1=1,U_2=0\}\cup\{U_1=0,D_2=1\}$ holds pointwise (W4). These checks establish the benchmark facts the chapter asserts about local models and the quantum contexts; they do not compute any $\mathbb{A}\mathbb{A}\mathbb{A}$ record law and are not evidence that the substrate reproduces the quantum values.

For NGT-03, the counterexample to the original definitions is any row of the map with mixed statuses; the Bell row has accepted, replaced, and benchmark-only entries and satisfied both the `direct` and the `replacement constraint` clause as originally written.

For NGT-07, the hypothesis list is taken from the PBR abstract: the theorem needs both the epistemic-overlap assumption and preparation independence. The receipt does not assert which reading $\mathbb{A}\mathbb{A}\mathbb{A}$ ultimately takes; the chapter now requires a candidate to report both statuses.

## Validation record

Claim grade: measured. The validation instruments and limits are recorded here; their falsifier is a rerun on these same bytes that fails the stated check.

- Known-case-first Node structural instrument (reproduction block below): before any target read it extracted two expected TeX expressions and two real links from a fixture while excluding a fenced malformed expression, a fenced missing link, a fenced fake heading, and inline-code content; rejected an unclosed dollar delimiter; rendered valid KaTeX and rejected an undefined command and an unbalanced delimiter with `throwOnError: true` and `strict: 'error'`; distinguished an existing path, a missing path, a missing heading fragment, and an existing heading fragment; accepted a correct viewer paragraph and rejected two malformed shapes; detected trailing whitespace; and, mirroring the web runtime's display-block stashing, found no phantom heading in a fixture whose display body contains a bare `=` line while still finding a genuine setext heading. The known-case pass was printed before the baseline and target runs.
- Rendering hazard noted, not a finding: several displays follow a prose line with no blank line and contain bare `=` or `-` lines, which a CommonMark lexer without math protection would read as setext headings. The web runtime stashes `$$` blocks before lexing, the pattern predates this review and occurs across the corpus, and no new display block was added, so no chapter edit was made for it.
- Hash-verified baseline inventory by that instrument: 4 headings, 14 link occurrences (8 viewer links, 3 external DOI links, 3 local), 71 TeX expressions, 8 displays, 8 viewer identities in order.
- Repaired chapter: 5 headings (the four originals plus Sources), 39 link occurrences, 150 TeX expressions, 8 displays; all 8 viewer identities retained in order; exactly one display body changed (`corpus-equation-3d02cb85278d2376`); every original heading and link occurrence retained; all 150 chapter TeX expressions rendered under strict KaTeX; 33 local links resolved including 15 Markdown heading fragments; 6 external links; no trailing whitespace; single final newline; every `View →` link is the sole content of the paragraph after its display; no link to `reference/priorities`; no numerical wake-speed instantiation; no disallowed term. External link availability was checked only through the Crossref and arXiv fetches above.
- Known-case-first Node arithmetic witnesses (reproduction block below): after Pauli-eigenstate, $X^2=Y^2=I$, and deliberate-mismatch controls passed, W1–W6 passed as described in the previous section.
- `node scripts/validate-equation-mapping-links.mjs`: exit 0; 23 registered equation links resolve.
- `node scripts/validate-content.mjs --check --strict` after the chapter edits and before the receipt: exit 0; 391 scene configs, 199 corpus Markdown files, 1731 repository Markdown files; 0 errors, 0 warnings, 30 notes. The post-receipt rerun is recorded in the final bullet.
- `node scripts/check-braid-taxonomy-terminology.mjs`: exit 0; 359 migrated-scope files scanned, no terminology stragglers.
- `node scripts/build-equation-mapping-corpus.mjs --check`: exit 1; 199 Markdown files, 4685 displays, 23 promoted equations, 30481 symbol definitions; the sole reported defect is stale `content/generated/equation-mapping/corpus-equations.json`. The changed display body and added source context of this chapter are an expected cause; concurrent edits may also contribute, and no exclusive attribution is claimed. The exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`, only under separate regeneration or publication authority. This receipt does not authorize that write.
- Scoped `git --no-optional-locks diff --check -- content/markdown/aaa/validation/no-go-theorems.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-no-go-theorems-review-2026-09-13.md`: exit 0. The receipt is untracked, so the structural instrument separately checked its TeX, links, whitespace, and final newline.
- Post-receipt run of the structural instrument on both files: exit 0; chapter counts unchanged from the bullet above; receipt 86 TeX expressions strict-rendered, 19 local links resolved including 1 Markdown heading fragment, 0 external links, no trailing whitespace, single final newline. The two reproduction blocks are fenced with backticks and are excluded from the instrument's own scan; the block contents were executed separately as saved `.mjs` files.
- Post-receipt `node scripts/validate-content.mjs --check --strict`: exit 0; 391 scene configs, 199 corpus Markdown files, 1735 repository Markdown files as concurrent files appeared; 0 errors, 0 warnings, 30 notes. This gate does not check equation-registry freshness.
- Final scoped status: chapter `MM` (index blob still the intermediate snapshot named in the disposition section, working tree at the final hash), receipt untracked and not in the index. Scoped `git --no-optional-locks diff --check` on both paths: exit 0. The final chapter hash matched the value in the disposition section.

### Reproduction: structural and rendering check

Run from the repository root with `node <file>` after saving the block as an `.mjs` file. It reads the chapter, this receipt, the fixed Git baseline, link targets, and the existing parser and KaTeX dependencies; it writes nothing.

```js
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
const require = createRequire(path.resolve('package.json'));
const katex = require('katex');
const {marked} = require('marked');
const {parseCorpusDisplayEquations} = await import(path.resolve('scripts/build-equation-mapping-corpus.mjs'));
const tick = String.fromCharCode(96);
function clean(source) {
  let fence = null;
  return source.split('\n').map(line => {
    const m = line.match(/^\s*(\x60{3,}|~{3,})/);
    if (m) { if (!fence) fence = m[1][0]; else if (fence === m[1][0]) fence = null; return ''; }
    if (fence) return '';
    return line.replace(/(\x60+)[^\n]*?\1/g, '');
  }).join('\n');
}
function noMath(s) { return clean(s).replace(/\$\$[\s\S]*?\$\$/g, '\n\nMATHBLOCKTOKEN\n\n'); }
function math(source) {
  const s = clean(source), found = [];
  const escaped = i => { let n = 0; while (i > 0 && s[--i] === '\\') n++; return n % 2 === 1; };
  for (let i = 0; i < s.length; i++) {
    let open, close;
    if (s[i] === '$' && !escaped(i)) { open = s[i + 1] === '$' ? '$$' : '$'; close = open; }
    else continue;
    let j = i + open.length;
    while ((j = s.indexOf(close, j)) >= 0 && escaped(j)) j += close.length;
    assert(j >= 0, 'Unclosed math at line ' + (s.slice(0, i).split('\n').length));
    found.push({tex: s.slice(i + open.length, j), display: open === '$$'});
    i = j + close.length - 1;
  }
  return found;
}
function links(s) { const out = []; marked.walkTokens(marked.lexer(noMath(s)), t => { if (t.type === 'link' || t.type === 'image') out.push(t.href); }); return out; }
function headings(s) { const out = []; marked.walkTokens(marked.lexer(noMath(s)), t => { if (t.type === 'heading') out.push(t.text); }); return out; }
function slug(s) { return s.replace(/\x60([^\x60]+)\x60/g, '$1').replace(/\$([^$]+)\$/g, '$1').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-'); }
function anchors(s) { return new Set(headings(s).map(slug)); }
function localProblems(file, s, registry) {
  const issues = []; let local = 0, external = 0, fragments = 0;
  for (const href of links(s)) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) { external++; continue; }
    local++;
    if (href.startsWith('/')) { issues.push('absolute ' + href); continue; }
    const [name, fragment] = href.split('#');
    const target = path.resolve(path.dirname(file), decodeURIComponent(name.split('?')[0] || path.basename(file)));
    if (!fs.existsSync(target)) { issues.push('missing ' + href); continue; }
    if (fragment && target.endsWith('.md')) { fragments++; if (!anchors(fs.readFileSync(target, 'utf8')).has(decodeURIComponent(fragment))) issues.push('heading ' + href); }
    if (fragment && path.basename(target) === 'equation-mapping.html' && registry && !registry.has(fragment)) issues.push('equation ' + fragment);
  }
  return {local, external, fragments, issues};
}
function viewerParagraphs(s) {
  const lines = s.split('\n'); const bad = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '$$') { let j = i + 1; while (j < lines.length && lines[j].trim() !== '$$') j++; if (j >= lines.length) { bad.push('unterminated display at ' + (i + 1)); break; }
      const after = lines[j + 1], link = lines[j + 2], after2 = lines[j + 3];
      if (after !== '' || !/^\[View →\]\(\.\.\/\.\.\/\.\.\/\.\.\/equation-mapping\.html#corpus-equation-[0-9a-f]{16}\)$/.test(link || '') || (after2 !== undefined && after2 !== '')) bad.push('viewer paragraph defect after display ending line ' + (j + 1));
      i = j; }
  }
  return bad;
}
const sample = '# Known\n\n[ok](AGENTS.md) $x+1$\n\n$$\n\\frac{1}{2}\n$$\n\n[View →](../../../../equation-mapping.html#corpus-equation-0123456789abcdef)\n\n' + tick + '$ignored$ [bad](missing) ' + tick + '\n' + tick.repeat(3) + '\n$$bad$$\n[x](missing)\n# fake\n' + tick.repeat(3) + '\n';
assert.deepEqual(math(sample).map(m => m.tex.trim()), ['x+1', '\\frac{1}{2}']);
assert.throws(() => math('$unclosed'));
assert.deepEqual(links(sample), ['AGENTS.md', '../../../../equation-mapping.html#corpus-equation-0123456789abcdef']);
assert.deepEqual(headings(sample), ['Known']);
assert.deepEqual(headings('# Real\n\nprose line\n$$\nx\n=\n1\n$$\n\n[View →](x)\n'), ['Real'], 'display body must not become a setext heading');
assert.deepEqual(headings('# Real\n\nprose line\n=\n'), ['Real', 'prose line'], 'genuine setext heading still detected');
assert(anchors('# Foo & Bar\n## Applicability Map').has('foo-and-bar'));
assert(anchors('# Foo & Bar\n## Applicability Map').has('applicability-map'));
katex.renderToString('\\frac{1}{2}', {throwOnError: true, strict: 'error'});
assert.throws(() => katex.renderToString('\\notARealCommand', {throwOnError: true, strict: 'error'}));
assert.throws(() => katex.renderToString('\\left[ x \\right', {throwOnError: true, strict: 'error'}));
assert.equal(localProblems('control.md', '[ok](AGENTS.md)\n[bad](__ngt_known_missing__.md)\n[frag](AGENTS.md#no-such-heading-ngt)', null).issues.length, 2);
assert.equal(localProblems('control.md', '[frag](AGENTS.md#theory-layer-discipline-governs-all-physics-reasoning-in-this-repo)', null).issues.length, 0);
const ctrl = parseCorpusDisplayEquations('control.md', sample);
assert.equal(ctrl.length, 1); assert.equal(ctrl[0].tex.trim(), '\\frac{1}{2}'); assert.equal(ctrl[0].existingLink.semanticId, 'corpus-equation-0123456789abcdef');
assert.deepEqual(viewerParagraphs(sample), []);
assert.equal(viewerParagraphs('$$\nx\n$$\nnot a link\n').length, 1);
assert.equal(viewerParagraphs('$$\nx\n$$\n\n[View →](../../../../equation-mapping.html#corpus-equation-0123456789abcdef)\nextra\n').length, 1);
assert(/[ \t]+$/m.test('trailing  \nx'));
assert(!/[ \t]+$/m.test('clean\nx'));
console.log('KNOWN CASES PASS');
const chapter = 'content/markdown/aaa/validation/no-go-theorems.md';
const receipt = 'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-no-go-theorems-review-2026-09-13.md';
const baseCommit = '06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95';
const baseline = execFileSync('git', ['show', baseCommit + ':' + chapter], {encoding: 'utf8'});
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
assert.equal(sha(baseline), 'a949646703056c6cd6ce7b08f963679e6df7cc39daf1d214681c3fc8c51f9bbd');
const current = fs.readFileSync(chapter, 'utf8');
const b = {headings: headings(baseline), links: links(baseline), math: math(baseline), eq: parseCorpusDisplayEquations(chapter, baseline)};
const c = {headings: headings(current), links: links(current), math: math(current), eq: parseCorpusDisplayEquations(chapter, current)};
console.log(JSON.stringify({baseline: {headings: b.headings, links: b.links.length, math: b.math.length, displays: b.math.filter(m => m.display).length, viewerIds: b.eq.map(e => e.existingLink?.semanticId)}}));
for (const h of b.headings) assert(c.headings.includes(h), 'missing heading ' + h);
for (const l of b.links) assert(c.links.includes(l), 'missing link ' + l);
assert.deepEqual(c.eq.map(e => e.existingLink?.semanticId), b.eq.map(e => e.existingLink?.semanticId), 'viewer identity order changed');
const changed = c.eq.filter((e, i) => e.tex !== b.eq[i].tex).map((e) => e.existingLink.semanticId);
console.log('PRESERVATION: headings ' + b.headings.length + ' retained; links ' + b.links.length + ' retained; viewer identities ' + b.eq.length + ' in order; changed display bodies: ' + JSON.stringify(changed) + '; current headings ' + c.headings.length + ', links ' + c.links.length);
let registry = null; try { registry = new Set(JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json', 'utf8')).records.map(x => x.semanticId)); } catch (e) { console.log('registry unavailable: ' + e.message); }
for (const f of [chapter, receipt]) {
  if (!fs.existsSync(f)) { console.log(f + ': absent'); continue; }
  const s = fs.readFileSync(f, 'utf8'), eq = math(s);
  let rendered = 0; for (const x of eq) { katex.renderToString(x.tex, {displayMode: x.display, throwOnError: true, strict: 'error'}); rendered++; }
  const lp = localProblems(f, s, registry);
  assert.deepEqual(lp.issues, [], f + ' link issues');
  assert(!/[ \t]+$/m.test(s), 'trailing whitespace ' + f);
  assert(s.endsWith('\n') && !s.endsWith('\n\n'), 'single final newline ' + f);
  assert(!/A\^3|A³/.test(clean(s)), 'forbidden abbreviation ' + f);
  const vp = f === chapter ? viewerParagraphs(s) : [];
  assert.deepEqual(vp, [], f + ' viewer paragraphs');
  console.log(f + ': PASS ' + rendered + ' TeX (' + eq.filter(x => x.display).length + ' display); ' + lp.local + ' local links (' + lp.fragments + ' md fragments); ' + lp.external + ' external; sha256 ' + sha(s));
}
assert(!/\]\([^)]*reference\/priorities/.test(current), 'priority link in chapter');
assert(!/c_f\s*=\s*(?!1\b)\d/.test(current), 'non-unit c_f instantiation');
console.log('chapter: no reference/priorities link; no non-unit c_f instantiation.');
```

### Reproduction: arithmetic and linear-algebra witnesses

Run from the repository root with `node <file>` after saving the block as an `.mjs` file. Every numerical convention sets $c_f=1$; the witnesses are counterexample and benchmark checks, not architrino simulations.

```js
import assert from 'node:assert/strict';
const c_f = 1;
const close = (a, b, tol = 1e-12) => assert(Math.abs(a - b) <= tol, a + ' != ' + b);
const C = (re, im = 0) => [re, im];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]], cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], cconj = a => [a[0], -a[1]];
const I2 = [[C(1), C(0)], [C(0), C(1)]], X = [[C(0), C(1)], [C(1), C(0)]], Y = [[C(0), C(0, -1)], [C(0, 1), C(0)]], Z = [[C(1), C(0)], [C(0), C(-1)]];
function kron(A, B) { const n = A.length, m = B.length, out = []; for (let i = 0; i < n * m; i++) { out.push([]); for (let j = 0; j < n * m; j++) out[i].push(cmul(A[Math.floor(i / m)][Math.floor(j / m)], B[i % m][j % m])); } return out; }
function matmul(A, B) { const n = A.length; const out = []; for (let i = 0; i < n; i++) { out.push([]); for (let j = 0; j < n; j++) { let s = C(0); for (let k = 0; k < n; k++) s = cadd(s, cmul(A[i][k], B[k][j])); out[i].push(s); } } return out; }
function expect(A, psi) { let s = C(0); for (let i = 0; i < psi.length; i++) for (let j = 0; j < psi.length; j++) s = cadd(s, cmul(cconj(psi[i]), cmul(A[i][j], psi[j]))); return s; }
function isScalarIdentity(A, lam) { for (let i = 0; i < A.length; i++) for (let j = 0; j < A.length; j++) { const want = i === j ? lam : 0; if (Math.abs(A[i][j][0] - want) > 1e-12 || Math.abs(A[i][j][1]) > 1e-12) return false; } return true; }
close(expect(Z, [C(1), C(0)])[0], 1); close(expect(Z, [C(0), C(1)])[0], -1); close(expect(X, [C(Math.SQRT1_2), C(Math.SQRT1_2)])[0], 1);
assert(isScalarIdentity(matmul(X, X), 1)); assert(isScalarIdentity(matmul(Y, Y), 1)); assert(!isScalarIdentity(matmul(X, Y), 1));
assert.throws(() => close(1, 2));
console.log('KNOWN CASES PASS: Pauli expectations on eigenstates, X^2=Y^2=I, XY not identity, deliberate mismatch rejected; c_f=' + c_f);
{ let max = -Infinity, min = Infinity; for (const q1 of [-1, 1]) for (const q2 of [-1, 1]) for (const q3 of [-1, 1]) { const K = q1 * q2 + q2 * q3 - q1 * q3; max = Math.max(max, K); min = Math.min(min, K); } assert.equal(max, 1); assert.equal(min, -3); console.log('W1 PASS: K_LG over all 8 assignments lies in [-3,1].'); }
{ const prods = new Set(); for (const x1 of [-1, 1]) for (const x2 of [-1, 1]) for (const x3 of [-1, 1]) for (const y1 of [-1, 1]) for (const y2 of [-1, 1]) for (const y3 of [-1, 1]) prods.add((x1 * x2 * x3) * (x1 * y2 * y3) * (y1 * x2 * y3) * (y1 * y2 * x3)); assert.deepEqual([...prods], [1]);
  const s = Math.SQRT1_2; const ghz = [C(s), C(0), C(0), C(0), C(0), C(0), C(0), C(s)];
  const ctx = {XXX: kron(kron(X, X), X), XYY: kron(kron(X, Y), Y), YXY: kron(kron(Y, X), Y), YYX: kron(kron(Y, Y), X)};
  const signs = {}; let prod = 1; for (const [k, A] of Object.entries(ctx)) { const e = expect(A, ghz); close(e[1], 0); signs[k] = Math.round(e[0]); close(e[0], signs[k]); prod *= signs[k]; }
  assert.deepEqual(signs, {XXX: 1, XYY: -1, YXY: -1, YYX: -1}); assert.equal(prod, -1);
  const ghzMinus = [C(s), C(0), C(0), C(0), C(0), C(0), C(0), C(-s)]; let prod2 = 1; for (const A of Object.values(ctx)) prod2 *= Math.round(expect(A, ghzMinus)[0]); assert.equal(prod2, -1);
  console.log('W2 PASS: local assignments give product +1; GHZ signs ' + JSON.stringify(signs) + ' with product -1.'); }
{ const XI = kron(X, I2), IX = kron(I2, X), XX = kron(X, X), IY = kron(I2, Y), YI = kron(Y, I2), YY = kron(Y, Y), XY = kron(X, Y), YX = kron(Y, X), ZZ = kron(Z, Z);
  const grid = [[XI, IX, XX], [IY, YI, YY], [XY, YX, ZZ]];
  const contexts = []; for (let r = 0; r < 3; r++) contexts.push(grid[r]); for (let c = 0; c < 3; c++) contexts.push([grid[0][c], grid[1][c], grid[2][c]]);
  const signs = contexts.map(ops => { const P = matmul(matmul(ops[0], ops[1]), ops[2]); if (isScalarIdentity(P, 1)) return 1; if (isScalarIdentity(P, -1)) return -1; throw new Error('context product is not +/-I'); });
  for (const ops of contexts) for (let a = 0; a < 3; a++) for (let b = a + 1; b < 3; b++) { const AB = matmul(ops[a], ops[b]), BA = matmul(ops[b], ops[a]); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { close(AB[i][j][0], BA[i][j][0]); close(AB[i][j][1], BA[i][j][1]); } }
  assert.equal(signs.filter(s => s === 1).length, 5); assert.equal(signs.filter(s => s === -1).length, 1); assert.equal(signs.reduce((a, b) => a * b, 1), -1);
  const assignProds = new Set(); for (let mask = 0; mask < 512; mask++) { const v = [...Array(9)].map((_, i) => (mask >> i) & 1 ? 1 : -1); const g = [[v[0], v[1], v[2]], [v[3], v[4], v[5]], [v[6], v[7], v[8]]]; let p = 1; for (let r = 0; r < 3; r++) p *= g[r][0] * g[r][1] * g[r][2]; for (let c = 0; c < 3; c++) p *= g[0][c] * g[1][c] * g[2][c]; assignProds.add(p); } assert.deepEqual([...assignProds], [1]);
  console.log('W3 PASS: magic-square contexts commute; signs ' + JSON.stringify(signs) + '; all 512 noncontextual assignments give total product +1.'); }
{ let max = -Infinity; for (const d1 of [0, 1]) for (const u1 of [0, 1]) for (const d2 of [0, 1]) for (const u2 of [0, 1]) { const margin = (d1 === 1 && d2 === 1 ? 1 : 0) - (u1 === 1 && u2 === 1 ? 1 : 0) - (d1 === 1 && u2 === 0 ? 1 : 0) - (u1 === 0 && d2 === 1 ? 1 : 0); max = Math.max(max, margin); if (d1 === 1 && d2 === 1) assert((u1 === 1 && u2 === 1) || u2 === 0 || u1 === 0); } assert.equal(max, 0);
  console.log('W4 PASS: Hardy margin is at most 0 over all 16 local deterministic assignments; the inclusion holds.'); }
{ const dim = {omega: [0, -1], k: [-1, 0], c0: [1, -1]}; const d2 = [dim.omega[0] - 2 * dim.k[0], dim.omega[1] - 2 * dim.k[1]]; assert.deepEqual(d2, [2, -1]);
  const old = [2 * d2[0], 2 * d2[1]]; assert.notDeepEqual(old, [0, 0]);
  const fixed = [2 * (dim.omega[0] + d2[0] - 2 * dim.c0[0]), 2 * (dim.omega[1] + d2[1] - 2 * dim.c0[1])]; assert.deepEqual(fixed, [0, 0]);
  console.log('W5 PASS: original integrand exponents (L,T)=' + JSON.stringify(old) + '; corrected integrand exponents ' + JSON.stringify(fixed) + '.'); }
{ for (const chi of [-1, 1]) for (const E of [-1, -0.5, 0, 0.5, 1]) assert(1 - chi * E >= 0); console.log('W6 PASS: 1 - chi_C E >= 0 for every |E| <= 1.'); }
console.log('All witnesses PASS.');
```

## Unresolved obligations and handoff

- NGT-O1: Establish the Bell route the chapter now names. The $c_f$-mediated coordination channel must be shown to connect the two apparatus couplings within the timing of a space-like-separated Bell test, which requires $c_f > c_0$ reconciled with photon dressing, Lorentz closure for moving assemblies, and clock universality, and the candidate must identify which hypothesis of the Bancal finite-speed theorem its channel fails while keeping every multipartite marginal no-signaling. A multipartite arrangement in which the declared channel permits controllable signaling, or a Bell violation whose timing excludes the channel, rejects the route.
- NGT-O2: Derive the Bell-family joint record measure. The transition operator, basin partition, preparation-selected measure, and detector kernels must produce the CHSH, GHZ, Hardy, and Leggett-Garg statistics with $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}$, and $\Delta_{\mathrm{NIM}}$ inside tolerance. The benchmark facts checked here constrain local models; they do not compute any substrate prediction.
- NGT-O3: Give the finite-range residual its owners. $\mathcal{R}_{\mathrm{GR}}(\theta)$ and the positivity functionals $\Pi_a(\theta)$ are defined in this chapter only in words; no corpus owner computes them, and the weights and tolerances are undeclared. The residual is a schematic until one Noether sea response map supplies every term from the same record.
- NGT-O4: Compute the CPT residual vector and the Weinberg-Witten level statement. No component of $\mathcal{R}_{\mathrm{CPT}}(\theta)$ has been computed from a retained branch, and no candidate record yet states at which level its conserved current and stress tensor exist.
- NGT-O5: Report the PBR overlap and factorization statuses and the Gleason/Kochen-Specker apparatus-conditioned event measure for a concrete candidate. The chapter now requires the reports; none exists.

The bounded implementation stops after this chapter and receipt. No next document is started. The coordinator can verify the final chapter hash, note the intermediate index snapshot described in the disposition section, integrate NGT-01–NGT-09 as bounded dispositions into its shared records, and retain NGT-O1–NGT-O5 with the existing subject owners. No physical acceptance, EOM solver acceptance, theory closure, or publication is claimed.
