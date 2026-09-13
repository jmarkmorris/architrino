# CRW-005 — Bell-Family Record-Measure Harness bounded review — 2026-09-13

## Scope and disposition

Priority 8 on the unified CRW-005 board: [Bell-Family Record-Measure Harness](../../../../content/markdown/aaa/validation/simulations/bell-family-record-measure.md). The complete chapter received a bounded review and safe repairs for BFR-01–BFR-08. These are one High and seven Medium finding groups. High denotes a defect that can change a mathematical or evidentiary inference; Medium denotes a consequential definition, scope, attribution, or exposition defect. Completion is document-level disposition, not physical acceptance, EOM solver acceptance, theory closure, or publication.

Only the assigned chapter and this receipt were written by this worker, `crw-005 bell-family-record-measure worker`. Shared CRW-005 status, priorities, work log, and queue remain the coordinator's responsibility. No supporting agent was launched; this is editor self-review. Agent agreement is not independent mathematical evidence; the separate enumeration, state-vector, grid-counting, and triangle-inequality references named below supply the bounded mathematical checks, the harness script's own runs supply the instrument-description checks, and the external source named below supplies the obstruction the chapter now records.

Claim grade: measured. Before editing, `git --no-optional-locks status --short -- <chapter>` on the chapter was empty, `git log -1` returned HEAD `06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95`, and the chapter's SHA-256 from `sha256sum` matched both the coordinator-measured value and the bytes returned by `git show 06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95:content/markdown/aaa/validation/simulations/bell-family-record-measure.md` (305 lines):

    23665a17753a3eea5c6e1b45c4af64978fdba39f96442af4c578a31be72a7a42

Final chapter SHA-256 from `sha256sum` (324 lines):

    6c604496d89b4eb145b9add6a38806a7d72e46f4de35cc35d96f2f2e730c9532

Falsifier: different chapter bytes invalidate this byte-specific handoff until the difference is reviewed. No staging, commit, push, publication, reset, stash, restore, checkout, or worktree operation was performed by this worker, and no generator `--write` was run. At the final scoped status the chapter showed ` M` (modified, unstaged) and scoped `git --no-optional-locks diff --cached --name-only` on it returned no path; the receipt is untracked. The working-tree bytes are the handoff.

## Authority and source support

The live AGENTS.md, generated startup router, Corpus Reviewer procedure, Integrator Reviewer discipline, theory orientation, operator explanation standard, and the academic, mathematical, terminology, and comparative-glossary authorities governed the review. The explicit assignment supplied repair authority and restricted writes to two paths. The live CRW-005 board listed this chapter as rank 8; this worker does not update or infer new shared board counts.

Nearby corpus owners read as evidence and not edited: [Ontology](../../../../content/markdown/aaa/foundations/ontology.md#bell-nonlocality-placement) for the selected Bell route, its speed-hierarchy obligation, and the finite-speed obstruction; [No-Go Theorems](../../../../content/markdown/aaa/validation/no-go-theorems.md) as repaired today under NGT-01, whose Bell row and orientation paragraph link this chapter's `#residual-object` heading for the definitions of $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$; [Bell's Theorem](../../../../content/markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md) (unreviewed, read as evidence) for the GHZ context set and sign product, the Hardy convention, and the two-wing $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ diagnostics; [Measurement Ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md), [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md), and [Reality, Quantum, and Causality](../../../../content/markdown/aaa/quantum/reality-quantum-causality.md) for the record packet $(\mathcal{K}_A,\mathcal{Q},W,T_W,\{R_k\},\mu_{*,T_W})$, the finite-window basin measure, the record definition, and the outside-$c_{\mathrm{eff}}$ wake-channel candidate class; [Failure Criteria](../../../../content/markdown/aaa/validation/failure-criteria.md#shared-closure-record) for the candidate record $\theta$; [Quantum Operator Mapping](../../../../content/markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md) and [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) as retained link targets. The harness script [bell-family-residual-harness.mjs](../../../../scripts/quantum/bell-family-residual-harness.mjs) and the fixture [product-screened-axis-candidate.json](../../../../scripts/quantum/product-screened-axis-candidate.json) were read and executed as the instrument the chapter describes; both exist at the paths the chapter names (`ls scripts/quantum/`), and all three chapter commands ran with exit 0.

External source, inspected as an observer-level constraint and never as a substrate premise: J.-D. Bancal, S. Pironio, A. Acín, Y.-C. Liang, V. Scarani, and N. Gisin, *Quantum non-locality based on finite-speed causal influences leads to superluminal signalling*, Nature Physics 8, 867–870 (2012), DOI 10.1038/nphys2460. The Crossref record for the DOI (title, authors, journal, volume 8, pages 867–870, issue 12, published 2012) was fetched in session, and the arXiv 1110.3795 abstract was read in session; it states that for any finite influence speed $v$ with $c<v<\infty$ such models predict correlations exploitable for faster-than-light communication, so assuming no superluminal communication excludes every finite-speed influence explanation of the target correlations. The chapter's new sentence and Sources note restate exactly that, at the level the Ontology and No-Go Theorems owners already use. The paper's body was not read; the multipartite construction is graded as the abstract states it.

Pre-edit `rg -l -F` for the exact chapter path under content/, scripts/, tests/, and reference/ found these consumer classes: the foundational-impact contract `scripts/config/foundational-impact-contracts.json` (path trigger for `observer.bell-live-channel`, whose re-evaluation commands run the harness against `scripts/quantum/source-measure-joint-basin-candidate.json`), the mapping-quantum priorities index, the CRW-005 board, the No-Go Theorems receipt of today, the Markdown index, the textbook TOC and scene graph (`content/graph/`), the generated reference surface, source-index snapshot, and equation registry under `content/generated/`, and the scene configuration `content/scenes/validation/sim_bell_family_record_measure.json`. A basename search additionally found the simulations README, the No-Go Theorems chapter (fragment `#residual-object`, heading retained), the conversion ledger, two development-process logs, generated reading copies, and the iOS textbook package. Six generated source-index routes target the chapter's `#acceptance-boundary`, `#built-in-scenarios`, `#generated-pair-provenance-path`, `#proof-scaffold-boundary`, `#residual-object`, and `#runtime-artifact` fragments; all six headings are retained. This bounds the search; it does not establish absence of every byte-sensitive consumer. All consumers remained read-only.

## Findings and repairs

Baseline lines refer to the hash-verified original chapter, not current line positions. Each disposition below is implemented; an open scientific obligation is not counted as a demonstrated physical failure.

| ID | Severity | Baseline lines | Evidence, repair, grade, and falsifier |
| --- | --- | --- | --- |
| BFR-01 | High | 254–305 | The proof scaffold and acceptance boundary required a "stronger object" and a compression audit without naming the Bell hypothesis that object must fail, the route the Ontology owner selects and No-Go Theorems records, or the finite-speed obstruction that route carries; a reader could take any non-product joint measure, including one that relaxes measurement independence, as an admissible escape, and the packet list omitted the premise audit the Bell row now requires. Repair: a route paragraph after the joint-measure display states that measurement independence and observer no-signaling are retained, that Bell factorizability (the displayed product form) is the replaced hypothesis, that the selected carrier is the live $c_f$-mediated coordination channel gated by pair provenance outside the effective photon cone, requiring $c_f > c_0$, provisional until the derivation closes; it explains why $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ are gates and $\Delta_{\mathrm{screen}}=0$ a failure; it records the Bancal obstruction and states that the harness's no-signaling residual is evaluated only on the declared two- or three-wing tables. Packet item 6 (premise audit and multipartite law), acceptance item 2's reason, acceptance item 6's final failure case, and a Sources section were added. No display changed. Claim grade: derived for the hypothesis structure, measured by comparison with the Ontology and No-Go Theorems text and the source abstract. Falsifier: a canon decision selecting a different route, or a Bell-local, measurement-independent model reproducing the CHSH violation. |
| BFR-02 | Medium | 31–50 | The field table was presented as the script's row schema but omitted `description`, `metrics.complete_record_parity` and its gate, the gate inventory, and most failure codes, so a reader running the documented command met undocumented output. Repair: rows added for `description` and `metrics.complete_record_parity` (defined as the weight $\Delta_{\mathrm{par}}$ of records whose four CHSH context products multiply to $-1$, with the reason a deterministic local response always has parity $+1$); the `classification` default for candidates, the seven gate names, four witness tags, and all seven failure codes are listed. Claim grade: measured by running the three chapter commands and reading the script's `gates`, `witnessTags`, and `completeRecordParityMetrics` code. Falsifier: a run of the documented commands whose row keys, gate names, or codes differ from the table. |
| BFR-03 | Medium | 131–161 | The unindexed $\Delta_{\mathrm{NS}}$ used at baseline lines 180 and 301, and now consumed by No-Go Theorems, was never defined from the per-wing $\Delta_{\mathrm{NS}}^{i}$; $\mathbf{s}$, $\mathbf{s}_{-i}$, and $r_i$ were unnamed; the "packet baseline" $\mathbf{s}_0$ was unspecified; and the baseline-context $\Delta_{\mathrm{MI}}$ differs in form from the unconditional $\sup_{\mathbf s}D_{\mathrm{TV}}(\rho(\lambda\mid\mathbf s),\rho(\lambda))$ in Bell's Theorem without any stated relation. Repair: $\Delta_{\mathrm{NS}}=\max_i\Delta_{\mathrm{NS}}^{i}$ is stated, the sum is identified as twice total variation and as the two-wing form in Bell's Theorem, the symbols are named, $\mathbf{s}_0$ is the first provenance-carrying context, $D_{\mathrm{TV}}$ and $\Pi$ are named, and the two $\Delta_{\mathrm{MI}}$ forms are stated to share their zero set and to bound one another within a factor of two. Both displays are byte-identical. Claim grade: derived (witness W6) and measured against the script's `l1Distance`, `tvDistance`, and `measurementIndependenceMetrics`. Falsifier: label distributions for which one form vanishes and the other does not, or a ratio above two. |
| BFR-04 | Medium | 90–111 | The chapter attributed "the context signs" to Bell's Theorem, which fixes only the product $\prod_C\chi_C=-1$; the script fixes the individual signs $\chi_{XXX}=-1$, $\chi_{XYY}=\chi_{YXY}=\chi_{YYX}=+1$, which belong to the GHZ state with a relative minus sign between its product components, not to the more commonly written plus state; $\chi_C$ and $E(C)$ were unnamed, and the residual's zero condition and the local-table value were unstated. Repair: the attribution is corrected to the context set and sign product, the built-in sign assignment and its state are stated, candidate fixtures are told to declare their own signs with the same product, the symbols are named, and the zero condition and the value $2$ for a context-independent local table are explained. Both displays are byte-identical. Claim grade: derived (witness W3 computes both sign sets from explicit $8\times8$ Pauli products) and measured against the script's scenario definitions. Falsifier: Bell's Theorem fixing individual signs, or the script using a different assignment. |
| BFR-05 | Medium | 184–233 | The generated path stated the grid $\Pi_{AB}^{(N)}$ and the sign kernels without $N$, the angle grid, the setting angles, or the sign convention at a vanishing cosine, so the claims "reaches only the classical-axis correlation" and "zero by construction" could not be reproduced from the chapter. Repair: a paragraph names the indicator and sign, states $N=720$, the midpoint grid $\phi_k=(k-\tfrac12)2\pi/N$, the settings $A_0=0$, $A_1=\pi/2$, $B_0=\pi/4$, $B_1=3\pi/4$, the convention $\operatorname{sgn}0=+1$ and the fact that no setting invokes it on this grid, the counting formula $E=-1+2\lvert A_i-B_j\rvert/\pi$, and $\lvert S\rvert=2$ exactly up to floating-point summation. All four displays are byte-identical. Claim grade: measured from `uniformPlanarPairProvenance`, `deterministicAxisKernel`, and `generatedPairProvenanceContexts` in the script, and derived by witness W5. Falsifier: a grid point at which the cosine vanishes for one of the four settings, or a recount giving $\lvert S\rvert\ne2$. |
| BFR-06 | Medium | 239–252, 269 | The scenario table labeled the Hardy table a benchmark without saying that it is a hand-written no-signaling table rather than a quantum-state prediction, unlike the singlet and GHZ tables; and the scaffold sentence "cannot pass CHSH, GHZ, and Hardy as a family" understated the obstruction, since a Bell-local product form fails each benchmark separately. Repair: one sentence after the table distinguishes the state-vector tables from the hand-written Hardy table; the scaffold sentence now states the three separate failures and their common reason. Claim grade: derived (witnesses W1, W3, W4) and measured against the script's `hardy_no_signaling_margin` rows and `productSignDistribution`. Falsifier: a local product table with $\lvert S\rvert>2$, GHZ product $-1$, or a positive Hardy margin; or the script's Hardy rows matching a two-qubit state prediction. |
| BFR-07 | Medium | 271–292, 303 | The superscript in $\mu_{*,T_W}^{(n)}$ was undefined (the owner's $\mu_{*,T_W}^{(i)}$ indexes an observer, not a party count), the basin subset $B_{\mathbf r}^{\mathbf s}$ was not tied to its outcome and setting vectors, and the kernel $K_i$, outcome vector $\mathbf r$, and candidate table $P_\theta$ used at baseline line 165 were named only later or never. Repair: $(n)$ is defined as the joint retained record of the $n$ wings (two for a pair, three for a GHZ triplet); $B_{\mathbf r}^{\mathbf s}$, $\mathbf r$, $K_i$, and $P_\theta$ are named at first use. All displays are byte-identical. Claim grade: inferred exposition repair consistent with the chapter's own "pair or multiplet" wording and the Measurement Ontology packet. Falsifier: an owner defining the superscript differently. |
| BFR-08 | Medium | 3–7, 252, 269, 304 | Against edition 1.1: the opening sentence said architrinos "interact through delayed line-of-action acceleration, pair provenance, detector kernels, and finite-time basin measures", mixing the substrate law with the harness's inputs; the second and third paragraphs repeated one thesis; $\mathbb{A}\mathbb{A}\mathbb{A}$ appeared at line 269 without its name; architrino, record, pair provenance, apparatus kernel, record basin, $\mu_{*,T_W}$, $T_W$, candidate record $\theta$, Bell factorizability, measurement independence, no-signaling, Bell-local, product screening, the CHSH and Tsirelson bounds, GHZ, and Hardy were named but not explained at first use; "Master-Equation" was hyphenated; and "completed hidden-variable record" put a standard-physics label where the level should be explicit. Repair: the opening separates the substrate law (two polarities accelerating one another along the line of action through delayed causal wakes) from the harness inputs; the two paragraphs are merged; an orientation paragraph defines each imported term with a link to its owner; the spelling and the level phrasing ("completed substrate record, which plays the role of Bell's complete hidden state $\lambda$") are corrected. No claim, grade, or falsifier changed. Claim grade: inferred exposition repair against the academic style guide and the owners' definitions. Falsifier: an added clue that conflicts with its owning chapter's definition. |

Not raised as findings: the residual displays $\Delta_{\mathrm{CHSH}}$, $\Delta_{\mathrm{Ts}}$, $\Delta_{\mathrm{GHZ}}$, $\Delta_{\mathrm{Hardy}}$, $\Delta_{\mathrm{NS}}^{i}$, $\Delta_{\mathrm{MI}}$, and $\Delta_{\mathrm{screen}}$ match the script's arithmetic term for term (CHSH signs `[1,-1,1,1]`, Hardy term events, L1 marginal drift, total-variation label drift and screening distance), and $\Delta_{\mathrm{GHZ}}$ and $\Delta_{\mathrm{Hardy}}$ are the same expressions No-Go Theorems and Bell's Theorem display up to the $\theta$ subscript; the ten scenario identifiers and their expected signals in the table agree with the run (singlet $\lvert S\rvert=2\sqrt2$ with excess $0.828$, classical axis and generated grid $\lvert S\rvert=2$, $\Delta_{\mathrm{MI}}=0.4$ for the leaking case, $\Delta_{\mathrm{NS}}=0.8$ for the signaling box, GHZ residual $0$ and $2$, Hardy margin $0.09$ with $\Delta_{\mathrm{NS}}=0$ and margin $0$ with $\Delta_{\mathrm{NS}}=0.32$); the fixture supplies eight deterministic source records with weights summing to one and four CHSH contexts, as the chapter says; every residual is a dimensionless probability difference, so no dimensional check applies; no numerical wake-speed instantiation occurs in the chapter, and the added route sentence keeps $c_f$ symbolic. The candidate fixture's `product_screening_escape` gate fails with `bell.product_screening_collapse` and its parity gate passes, as the chapter requires.

## Independent mathematical checks and boundaries

For BFR-01, the reference is the logical form of Bell's hypothesis as Ontology states it: the factorization $P(a,b\mid\hat m_A,\hat m_B,\lambda)=P(a\mid\hat m_A,\lambda)P(b\mid\hat m_B,\lambda)$ is exactly the product form the chapter displays with $\Pi$ in place of $\lambda$ and $K_i$ in place of the local response probabilities, so the chapter's "obstruction" and the owners' "replaced hypothesis" are one statement. The receipt does not establish that the coordination channel exists, that $c_f > c_0$, or that the channel evades the Bancal obstruction; those remain BFR-O2, and the chapter now says the harness cannot test them.

For BFR-03, with $\bar\rho=\sum_{\mathbf s}w_{\mathbf s}\rho_{\mathbf s}$ any weighted mixture of the context distributions, convexity of total variation gives $D_{\mathrm{TV}}(\rho_{\mathbf s},\bar\rho)\le\max_{\mathbf s'}D_{\mathrm{TV}}(\rho_{\mathbf s},\rho_{\mathbf s'})\le D_{\mathrm{TV}}(\rho_{\mathbf s},\rho_{\mathbf s_0})+D_{\mathrm{TV}}(\rho_{\mathbf s_0},\rho_{\mathbf s'})\le2\Delta_{\mathrm{MI}}^{\mathrm{harness}}$, and conversely $D_{\mathrm{TV}}(\rho_{\mathbf s},\rho_{\mathbf s_0})\le D_{\mathrm{TV}}(\rho_{\mathbf s},\bar\rho)+D_{\mathrm{TV}}(\bar\rho,\rho_{\mathbf s_0})\le2\Delta_{\mathrm{MI}}^{\mathrm{Bell}}$; both vanish exactly when every $\rho_{\mathbf s}$ coincides. Witness W6 checks the factor-two relation and the shared zero set on 2000 pseudo-random label families and confirms that the $0.8$ reported for the signaling box is the L1 distance between the marginals $(0.5,0.5)$ and $(0.1,0.9)$, twice their total variation.

For BFR-04 and BFR-06, the references are exhaustive enumeration and explicit linear algebra rather than the chapter's prose. Over all sixteen deterministic local strategies $\lvert S\rvert=2$ exactly (W1). The singlet correlation $-\cos(\theta_A-\theta_B)$ was recomputed from the two-qubit state vector with rotated spin operators at four angle pairs, and the CHSH combination at the harness angles is $-2\sqrt2$ (W2). Over all 64 local $X,Y$ value assignments on three wings the product of the four GHZ context products is $+1$; explicit $8\times8$ Pauli tensor products give signs $(+1,-1,-1,-1)$ for the plus GHZ state and $(-1,+1,+1,+1)$ for the minus state, each with product $-1$, and the harness's residual on the all-plus local table is $2$ (W3). Over all sixteen local deterministic Hardy assignments the margin is at most zero and the inclusion $\{D_1=D_2=1\}\subseteq\{U_1=U_2=1\}\cup\{D_1=1,U_2=0\}\cup\{U_1=0,D_2=1\}$ holds pointwise (W4). Hardy's own construction for two qubits was maximized numerically and returned $0.0901699437$, agreeing with $(5\sqrt5-11)/2$ to $10^{-11}$; the built-in table's positive term $0.09$ lies below that value, but its other rows (perfect correlations in the mixed contexts) are not those of any Hardy state, which is why the chapter now calls it hand-written. These checks establish benchmark facts about local models and quantum contexts; they compute no $\mathbb{A}\mathbb{A}\mathbb{A}$ record law.

For BFR-05, witness W5 reproduces the script's midpoint grid, verifies that none of the four settings makes $\cos(A-\phi_k)$ or $\cos(B-\phi_k)$ vanish for $k=1,\dots,720$, and recovers $E=-\tfrac12,+\tfrac12,-\tfrac12,-\tfrac12$ and $S=-2$ by integer sign counting, matching the harness's $-1.9999999999999933$ to floating-point summation error. Deterministic local response records have context-product parity $+1$ over all sixteen assignments (W7), which is the fact the new `complete_record_parity` row states.

## Validation record

Claim grade: measured. The validation instruments and limits are recorded here; their falsifier is a rerun on these same bytes that fails the stated check.

- Known-case-first Node structural instrument (reproduction block below): before any target read it extracted two expected TeX expressions and two real links from a fixture while excluding a fenced malformed expression, a fenced missing link, a fenced fake heading, and inline-code content; rejected an unclosed dollar delimiter; rendered valid KaTeX and rejected an undefined command and an unbalanced delimiter with `throwOnError: true` and `strict: 'error'`; distinguished an existing path, a missing path, a missing heading fragment, and an existing heading fragment; accepted a correct five-level viewer paragraph, rejected the same paragraph checked at the wrong depth, and rejected two malformed shapes; detected trailing whitespace; and found no phantom setext heading inside a display body while still finding a genuine one. The known-case pass was printed before the baseline and target runs.
- Known-case-first Node arithmetic witnesses (reproduction block below): Pauli eigenstate expectations, a rotated spin operator on its own eigenstate, and a deliberate mismatch rejection passed before W1–W7 ran; all seven witnesses passed as described in the previous section, with $c_f=1$ declared.
- Hash-verified baseline inventory by the structural instrument: 7 headings, 23 link occurrences (16 viewer links, 7 local), 41 TeX expressions, 16 displays, 16 viewer identities in order, 5 Markdown heading fragments, all resolving; strict KaTeX passed on all 41.
- Repaired chapter: 8 headings (the seven originals plus Sources), 34 link occurrences, 142 TeX expressions, 16 displays; all 16 viewer identities retained in order with zero changed display bodies; every original heading and link occurrence retained; all 142 chapter TeX expressions rendered under strict KaTeX; 33 local links resolved including 13 Markdown heading fragments; 1 external link (the DOI); no trailing whitespace; single final newline; every `View →` link is the sole content of the paragraph after its display at the chapter's five-level relative depth; no link to `reference/priorities`; no numerical wake-speed instantiation; no disallowed causal-delay term; no A-cubed form. External link availability was checked only through the Crossref and arXiv fetches above. Changed viewer identities: none.
- Instrument runs of the documented commands: `node scripts/quantum/bell-family-residual-harness.mjs --pretty` exit 0 with 10 scenario rows; `--scenario ghz_local_value_table --pretty` exit 0; `--candidate scripts/quantum/product-screened-axis-candidate.json --pretty` exit 0 with `metadata.source` `candidate`, one scenario, `source_record_count` 8, `product_screening_escape` failing with `bell.product_screening_collapse`, and `complete_record_parity` passing.
- `node scripts/validate-equation-mapping-links.mjs`: exit 0; 23 registered equation links resolve.
- `node scripts/validate-content.mjs --check --strict` after the chapter edits and before the receipt: exit 0; 391 scene config files, 199 corpus Markdown files, 1739 repository Markdown files; 0 errors, 0 warnings, 30 notes. The post-receipt rerun is recorded in the final bullet.
- `node scripts/check-braid-taxonomy-terminology.mjs`: exit 0; 359 migrated-scope files scanned, no terminology stragglers.
- `node scripts/build-equation-mapping-corpus.mjs --check`: exit 1 both before and after the chapter edits; 199 Markdown files, 4685 displays, 23 promoted equations, 30481 symbol definitions before and 30478 after; the sole reported defect is stale `content/generated/equation-mapping/corpus-equations.json`. The registry was already stale before this worker's first edit, so the drift is not attributed to this chapter alone; this chapter's added source context is an expected additional cause. The exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`, only under separate regeneration or publication authority. This receipt does not authorize that write.
- Scoped `git --no-optional-locks diff --check -- content/markdown/aaa/validation/simulations/bell-family-record-measure.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-bell-family-record-measure-review-2026-09-13.md`: exit 0. The receipt is untracked, so the structural instrument separately checked its TeX, links, whitespace, and final newline.
- Post-receipt run of the structural instrument on both files, executed from the two reproduction blocks below extracted verbatim from this receipt into saved `.mjs` files: exit 0; chapter counts unchanged from the bullet above; receipt 133 TeX expressions strict-rendered, 12 local links resolved including 2 Markdown heading fragments, 0 external links, no trailing whitespace, single final newline. The arithmetic witness block, run the same way, printed its known-case line before W1–W7 and ended with `All witnesses PASS.`, exit 0. The reproduction blocks are fenced and are excluded from the instrument's own scan.
- Post-receipt `node scripts/validate-content.mjs --check --strict`: exit 0; 391 scene config files, 199 corpus Markdown files, 1743 repository Markdown files as concurrent files appeared; 0 errors, 0 warnings, 30 notes. This gate does not check equation-registry freshness.
- Final scoped status: chapter ` M` (working tree modified, nothing staged for it), receipt `??` untracked. Scoped `git --no-optional-locks diff --check` on both paths: exit 0; direct `grep` for trailing whitespace found none in either file and both end in exactly one newline. The final chapter hash matched the value in the disposition section.

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
function viewerParagraphs(s, depth) {
  const lines = s.split('\n'); const bad = [];
  const re = new RegExp('^\\[View →\\]\\((\\.\\./){' + depth + '}equation-mapping\\.html#corpus-equation-[0-9a-f]{16}\\)$');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '$$') { let j = i + 1; while (j < lines.length && lines[j].trim() !== '$$') j++; if (j >= lines.length) { bad.push('unterminated display at ' + (i + 1)); break; }
      const after = lines[j + 1], link = lines[j + 2], after2 = lines[j + 3];
      if (after !== '' || !re.test(link || '') || (after2 !== undefined && after2 !== '')) bad.push('viewer paragraph defect after display ending line ' + (j + 1));
      i = j; }
  }
  return bad;
}
const sample = '# Known\n\n[ok](AGENTS.md) $x+1$\n\n$$\n\\frac{1}{2}\n$$\n\n[View →](../../../../../equation-mapping.html#corpus-equation-0123456789abcdef)\n\n' + tick + '$ignored$ [bad](missing) ' + tick + '\n' + tick.repeat(3) + '\n$$bad$$\n[x](missing)\n# fake\n' + tick.repeat(3) + '\n';
assert.deepEqual(math(sample).map(m => m.tex.trim()), ['x+1', '\\frac{1}{2}']);
assert.throws(() => math('$unclosed'));
assert.deepEqual(links(sample), ['AGENTS.md', '../../../../../equation-mapping.html#corpus-equation-0123456789abcdef']);
assert.deepEqual(headings(sample), ['Known']);
assert.deepEqual(headings('# Real\n\nprose line\n$$\nx\n=\n1\n$$\n\n[View →](x)\n'), ['Real'], 'display body must not become a setext heading');
assert.deepEqual(headings('# Real\n\nprose line\n=\n'), ['Real', 'prose line'], 'genuine setext heading still detected');
assert(anchors('# Foo & Bar\n## Residual Object').has('foo-and-bar'));
assert(anchors('# Foo & Bar\n## Residual Object').has('residual-object'));
katex.renderToString('\\frac{1}{2}', {throwOnError: true, strict: 'error'});
assert.throws(() => katex.renderToString('\\notARealCommand', {throwOnError: true, strict: 'error'}));
assert.throws(() => katex.renderToString('\\left[ x \\right', {throwOnError: true, strict: 'error'}));
assert.equal(localProblems('control.md', '[ok](AGENTS.md)\n[bad](__bfr_known_missing__.md)\n[frag](AGENTS.md#no-such-heading-bfr)', null).issues.length, 2);
assert.equal(localProblems('control.md', '[frag](AGENTS.md#theory-layer-discipline-governs-all-physics-reasoning-in-this-repo)', null).issues.length, 0);
const ctrl = parseCorpusDisplayEquations('control.md', sample);
assert.equal(ctrl.length, 1); assert.equal(ctrl[0].tex.trim(), '\\frac{1}{2}'); assert.equal(ctrl[0].existingLink.semanticId, 'corpus-equation-0123456789abcdef');
assert.deepEqual(viewerParagraphs(sample, 5), []);
assert.equal(viewerParagraphs(sample, 4).length, 1, 'wrong depth must be rejected');
assert.equal(viewerParagraphs('$$\nx\n$$\nnot a link\n', 5).length, 1);
assert.equal(viewerParagraphs('$$\nx\n$$\n\n[View →](../../../../../equation-mapping.html#corpus-equation-0123456789abcdef)\nextra\n', 5).length, 1);
assert(/[ \t]+$/m.test('trailing  \nx'));
assert(!/[ \t]+$/m.test('clean\nx'));
console.log('KNOWN CASES PASS');
const chapter = 'content/markdown/aaa/validation/simulations/bell-family-record-measure.md';
const receipt = 'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-bell-family-record-measure-review-2026-09-13.md';
const baseCommit = '06fc05899fa972f5b43bf5e1d58e16e6b8f9ac95';
const baseline = execFileSync('git', ['show', baseCommit + ':' + chapter], {encoding: 'utf8'});
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
assert.equal(sha(baseline), '23665a17753a3eea5c6e1b45c4af64978fdba39f96442af4c578a31be72a7a42');
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
  assert(!/\bretard/i.test(clean(s)), 'disallowed causal-delay variant ' + f);
  const vp = f === chapter ? viewerParagraphs(s, 5) : [];
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
function madd(A, B, s = 1) { return A.map((r, i) => r.map((v, j) => cadd(v, [s * B[i][j][0], s * B[i][j][1]]))); }
function mscale(A, s) { return A.map(r => r.map(v => [s * v[0], s * v[1]])); }
function expect(A, psi) { let s = C(0); for (let i = 0; i < psi.length; i++) for (let j = 0; j < psi.length; j++) s = cadd(s, cmul(cconj(psi[i]), cmul(A[i][j], psi[j]))); return s; }
close(expect(Z, [C(1), C(0)])[0], 1); close(expect(Z, [C(0), C(1)])[0], -1); close(expect(X, [C(Math.SQRT1_2), C(Math.SQRT1_2)])[0], 1);
const spinOp = th => madd(mscale(Z, Math.cos(th)), mscale(X, Math.sin(th)));
close(expect(spinOp(Math.PI / 2), [C(Math.SQRT1_2), C(Math.SQRT1_2)])[0], 1);
assert.throws(() => close(1, 2));
console.log('KNOWN CASES PASS: Pauli expectations on eigenstates, rotated spin operator on its eigenstate, deliberate mismatch rejected; c_f=' + c_f);
{ const vals = new Set(); for (const a0 of [-1, 1]) for (const a1 of [-1, 1]) for (const b0 of [-1, 1]) for (const b1 of [-1, 1]) vals.add(Math.abs(a0 * b0 - a0 * b1 + a1 * b0 + a1 * b1)); assert.deepEqual([...vals], [2]); console.log('W1 PASS: |S| = 2 for every deterministic local strategy; convex mixtures cannot exceed 2.'); }
{ const s = Math.SQRT1_2; const singlet = [C(0), C(s), C(-s), C(0)];
  const E = (a, b) => expect(kron(spinOp(a), spinOp(b)), singlet)[0];
  for (const [a, b] of [[0, 0], [0.3, 1.1], [1, 2.5], [Math.PI / 2, 0]]) close(E(a, b), -Math.cos(a - b), 1e-12);
  const A0 = 0, A1 = Math.PI / 2, B0 = Math.PI / 4, B1 = 3 * Math.PI / 4;
  const S = E(A0, B0) - E(A0, B1) + E(A1, B0) + E(A1, B1);
  close(S, -2 * Math.SQRT2, 1e-12); close(Math.abs(S) - 2, 2 * Math.SQRT2 - 2, 1e-12);
  close(0.5 * 4 * (Math.SQRT1_2 / 4), 0.35355339059327373, 1e-12);
  console.log('W2 PASS: state-vector singlet gives E=-cos(a-b); S = -2*sqrt2 at the harness angles; Tsirelson excess 0; local-bound excess ' + (2 * Math.SQRT2 - 2)); }
{ const prods = new Set(); for (const x1 of [-1, 1]) for (const x2 of [-1, 1]) for (const x3 of [-1, 1]) for (const y1 of [-1, 1]) for (const y2 of [-1, 1]) for (const y3 of [-1, 1]) prods.add((x1 * x2 * x3) * (x1 * y2 * y3) * (y1 * x2 * y3) * (y1 * y2 * x3)); assert.deepEqual([...prods], [1]);
  const s = Math.SQRT1_2; const ctx = {XXX: kron(kron(X, X), X), XYY: kron(kron(X, Y), Y), YXY: kron(kron(Y, X), Y), YYX: kron(kron(Y, Y), X)};
  const signsOf = psi => Object.fromEntries(Object.entries(ctx).map(([k, A]) => { const e = expect(A, psi); close(e[1], 0); const r = Math.round(e[0]); close(e[0], r); return [k, r]; }));
  const plus = signsOf([C(s), C(0), C(0), C(0), C(0), C(0), C(0), C(s)]), minus = signsOf([C(s), C(0), C(0), C(0), C(0), C(0), C(0), C(-s)]);
  assert.deepEqual(plus, {XXX: 1, XYY: -1, YXY: -1, YYX: -1}); assert.deepEqual(minus, {XXX: -1, XYY: 1, YXY: 1, YYX: 1});
  for (const sg of [plus, minus]) assert.equal(Object.values(sg).reduce((a, b) => a * b, 1), -1);
  const chi = minus; const localE = {XXX: 1, XYY: 1, YXY: 1, YYX: 1};
  assert.equal(Math.max(...Object.keys(chi).map(k => Math.max(0, 1 - chi[k] * localE[k]))), 2);
  console.log('W3 PASS: local assignments give product +1; GHZ+ signs ' + JSON.stringify(plus) + ', GHZ- signs ' + JSON.stringify(minus) + ' (the harness built-in); local table residual 2.'); }
{ let max = -Infinity; for (const d1 of [0, 1]) for (const u1 of [0, 1]) for (const d2 of [0, 1]) for (const u2 of [0, 1]) { const margin = (d1 === 1 && d2 === 1 ? 1 : 0) - (u1 === 1 && u2 === 1 ? 1 : 0) - (d1 === 1 && u2 === 0 ? 1 : 0) - (u1 === 0 && d2 === 1 ? 1 : 0); max = Math.max(max, margin); if (d1 === 1 && d2 === 1) assert((u1 === 1 && u2 === 1) || u2 === 0 || u1 === 0); } assert.equal(max, 0); console.log('W4 PASS: Hardy margin <= 0 for all 16 local deterministic assignments; the inclusion holds pointwise.'); }
{ const N = 720; const settings = {A0: 0, A1: Math.PI / 2, B0: Math.PI / 4, B1: 3 * Math.PI / 4};
  for (let k = 1; k <= N; k++) { const phi = (k - 0.5) * 2 * Math.PI / N; for (const v of Object.values(settings)) assert(Math.abs(Math.cos(v - phi)) > 1e-9, 'tie at k=' + k); }
  const sgn = x => (x >= 0 ? 1 : -1);
  const E = (A, B) => { let s = 0; for (let k = 1; k <= N; k++) { const phi = (k - 0.5) * 2 * Math.PI / N; s += sgn(Math.cos(A - phi)) * sgn(Math.cos(B - phi - Math.PI)); } return s / N; };
  const pairs = [['A0', 'B0'], ['A0', 'B1'], ['A1', 'B0'], ['A1', 'B1']];
  const Es = pairs.map(([a, b]) => E(settings[a], settings[b]));
  const ref = pairs.map(([a, b]) => { let d = Math.abs(settings[a] - settings[b]) % (2 * Math.PI); if (d > Math.PI) d = 2 * Math.PI - d; return -(1 - 2 * d / Math.PI); });
  Es.forEach((e, i) => close(e, ref[i], 1e-12));
  const S = Es[0] - Es[1] + Es[2] + Es[3]; close(S, -2, 1e-12);
  console.log('W5 PASS: midpoint grid has no sign ties; E = ' + Es.map(e => e.toFixed(12)).join(', ') + '; S = ' + S.toFixed(12)); }
{ const tv = (p, q) => 0.5 * Object.keys({...p, ...q}).reduce((s, k) => s + Math.abs((p[k] ?? 0) - (q[k] ?? 0)), 0); const l1 = (p, q) => 2 * tv(p, q);
  close(l1({1: 0.9, '-1': 0.1}, {1: 0.5, '-1': 0.5}), 0.8);
  let rng = 12345; const rand = () => (rng = (rng * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let trial = 0; trial < 2000; trial++) { const m = 3 + Math.floor(rand() * 4), ctxs = 2 + Math.floor(rand() * 4); const dists = []; for (let c = 0; c < ctxs; c++) { const d = {}; let tot = 0; for (let i = 0; i < m; i++) { d[i] = rand(); tot += d[i]; } for (let i = 0; i < m; i++) d[i] /= tot; dists.push(d); }
    const w = dists.map(() => rand()); const wt = w.reduce((a, b) => a + b, 0); const bar = {}; for (let i = 0; i < m; i++) bar[i] = dists.reduce((s, d, c) => s + w[c] / wt * d[i], 0);
    const harness = Math.max(...dists.map(d => tv(d, dists[0]))); const bell = Math.max(...dists.map(d => tv(d, bar)));
    assert(bell <= 2 * harness + 1e-12 && harness <= 2 * bell + 1e-12, 'factor-two relation failed'); assert((harness < 1e-12) === (bell < 1e-12)); }
  console.log('W6 PASS: L1 marginal drift equals twice total variation; baseline-context Delta_MI and unconditional Delta_MI vanish together and each is at most twice the other (2000 random cases).'); }
{ const v = new Set(); for (const a0 of [-1, 1]) for (const a1 of [-1, 1]) for (const b0 of [-1, 1]) for (const b1 of [-1, 1]) v.add((a0 * b0) * (a0 * b1) * (a1 * b0) * (a1 * b1)); assert.deepEqual([...v], [1]); console.log('W7 PASS: deterministic local response records have CHSH context-product parity +1.'); }
console.log('All witnesses PASS.');
```

## Unresolved obligations and handoff

- BFR-O1: Derive the Bell-family joint record measure. No positive candidate exists; every built-in scenario and the one candidate fixture is a benchmark table or a negative control. The pair-provenance ledger, apparatus kernels, finite-window joint measure, compression audit, and same-packet residuals the chapter lists remain to be produced from substrate variables. A generated table that passes CHSH, GHZ, and Hardy together with $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}$, and a nonzero $\Delta_{\mathrm{screen}}$ would discharge it; none has been run.
- BFR-O2: Establish the route the chapter now names and answer its obstruction. The harness evaluates no-signaling only on declared two- or three-wing tables and has no multipartite scenario, so it cannot test whether the $c_f$-mediated channel permits controllable signaling in the arrangements Bancal and collaborators construct, nor whether $c_f > c_0$ is reconciled with photon dressing and Lorentz closure. A candidate packet must name the hypothesis of that theorem its channel fails and supply the multipartite law; extending the harness with such a scenario is a script change outside this review's scope and should follow, not precede, a candidate.
- BFR-O3: Replace or relabel the hand-written Hardy benchmark table if the harness is to serve as a quantum-agreement check. The present table has perfect correlations in the mixed contexts that no two-qubit Hardy state produces; a state-vector Hardy table with positive term $(5\sqrt5-11)/2$ would make the benchmark a prediction rather than a pattern. This is an optional instrument improvement in `scripts/quantum/bell-family-residual-harness.mjs`, not a chapter defect after BFR-06.

The bounded implementation stops after this chapter and receipt. No next document is started. The coordinator can verify the final chapter hash, integrate BFR-01–BFR-08 as bounded dispositions into its shared records, and retain BFR-O1–BFR-O3 with the existing subject owners. No physical acceptance, EOM solver acceptance, theory closure, or publication is claimed.
