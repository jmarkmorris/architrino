# CRW-005 Informational Ambiguity Review and Repair

## Authority and reviewed source

This report records the authorized bounded assurance review and immediate local repair of item 9, [Informational ambiguity](../../../../content/markdown/aaa/validation/simulations/action-energy/informational-ambiguity.md). Write authority covers that chapter and this report only. HQ integrates the shared disposition after the implementation owners return.

Claim grade: measured. At startup, git rev-parse HEAD returned 4a8e760bae44dbc868714e579ba60779ae0be9d2; shasum -a 256 returned chapter SHA-256 cf73dd099ec074954fe5c09d3678d6d1e7cfeab76b2fff199fde997f73a32f0d. The complete numbered source read covered original lines 1–72. Scoped git --no-optional-locks status --short and git diff produced no entries for the chapter or report, and test -e found the report destination absent. These observations identify the reviewed bytes and scoped startup state, not repository-wide cleanliness.

The live [corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [maintained review-skill owner](../../../op/skills/skill-architrino-review.md), and [CRW-005 work owner](../work-queue.md#crw-005--independent-post-conversion-assurance-review) governed the pass. The assignment's explicit review-plus-repair authority supersedes the default report-only cadence. Relevant canon was read in [Architrino](../../../../content/markdown/aaa/foundations/architrino.md#core-definition), [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), the foundation layer definitions, and the current academic, mathematical, and terminology guides. The canonical equation and fixed polarity magnitude control the surrogate calculation; a duplicated informal explanation does not override that law.

Claim grade: measured. The scoped git show of c973402b96d50e45b9bdac0da2bd680e6c26116f identifies the last chapter-changing transition in retained Git history: it expanded the opening explanation, integrated the closing plain-language paragraph, adjusted acceleration wording, and separated equation links. The stationary-continuum, reduced-datum, and universe-state wording already occur in its parent. This establishes preservation across that conversion transition, not the first historical cause of each defect. Current correctness is assessed against live canon regardless of attribution.

## Finding dispositions

Legend: ✓ Done; ○ Open. Original line references below use the reviewed 72-line source. Each demonstrated defect has an authorized local repair; final validation is recorded in the closeout.

| ID | Severity | Original lines | Demonstrated issue | Local disposition |
| --- | --- | --- | --- | --- |
| IA-1 | High | 3–8 | An undefined scalar potential is supplied as an independently received fact; resolved hits and net acceleration are conflated. | ✓ Repaired: distinguish the signed net vector, its magnitude, and a branch-resolved analytical record; a scalar diagnostic needs its own definition and readout map. |
| IA-2 | Medium | 3 | “Conveys no information” is stronger than the cancellation argument proves. | ✓ Repaired: zero acceleration cannot distinguish no hits from cancellation, but excludes histories predicting nonzero acceleration. |
| IA-3 | High | 13, 25, 36–70 | Arbitrary polarity magnitudes and a continuum of stationary single-architrino surrogates contradict fixed primitive magnitude and the inverse-square kernel. | ✓ Repaired: fixed magnitude, amplitude-constrained radius, causally fixed emission time, and two side/polarity representatives for a finite nonzero vector. |
| IA-4 | High | 27–36, 47–63 | Magnitude plus an unoriented axis discards vector sign; zero has no axis; the matching condition is omitted. | ✓ Repaired: signed datum, explicitly lossy axis projection, positive-magnitude domain, sign matching, and a separate zero case. |
| IA-5 | High | 19, 72 | The complete universe-state perspective is described as missing the history ledger its owner includes. | ✓ Repaired: assign inversion limits to restricted records in a known frame; retain the complete-state ledger. |
| IA-6 | Medium | 65–72 | Simultaneous reception is mistaken for a shared emission location; reconstruction suggestions become universal necessities. | ✓ Repaired: require stationary or matched-emission assumptions for direct line intersection and make reconstruction methods conditional. |
| IA-7 | Low | 16–72 | Undefined receiver index, reception-time notation, causal-role terminology, and hypothetical polarity changes obscure the construction. | ✓ Repaired: define receiver role and reception time, use transmitter terminology, and label polarity comparisons as alternative hypotheses. |

### IA-1 and IA-2: what the acceleration record determines

Claim grade: derived from the acceleration-first Master Equation. Summing admitted per-hit vectors determines the net vector, not its decomposition or an independently measured scalar potential. A scalar defined from its magnitude would be a derived property, not an additional datum. The smaller repair retains the vector and allows a separate potential diagnostic only after its definition and observation channel are supplied.

Two equal finite stationary transmitter contributions on opposite rays with equal polarities relative to a fixed receiver cancel. The no-hit record also sums to zero. Conversely, one finite stationary contribution is nonzero, so its hypothesis is excluded by zero acceleration. Cancellation proves nonuniqueness, not a probabilistic zero-information theorem. These are prescribed single-event records, not a claim of a stationary coupled solution.

Falsifiers: a separately specified primitive scalar readout would reopen IA-1's datum boundary; a canonical evaluation in which equal opposite-ray contributions do not cancel would refute the witness. No Shannon-information value is inferred.

### IA-3 and IA-4: the stationary surrogate is constrained

Claim grade: derived. Write the nonzero target as $\mathbf A_R=A_R\hat{\mathbf u}$ with $A_R>0$ and unit direction $\hat{\mathbf u}$. A stationary hypothetical architrino at $\mathbf X_r(T_r)-\lambda\hat{\mathbf u}$ has fixed polarity magnitude $\epsilon$, transmitter factor $D_t=c_f$, and acceleration weight one. Its contribution is

$$
\mathbf A_{\mathrm{sur}}=\frac{\kappa\epsilon^2}{\lambda^2}\sigma_{\mathrm{sur}}\operatorname{sgn}(\lambda)\hat{\mathbf u}
$$

Here $\kappa>0$ is the coupling, $\lambda\ne0$ is signed separation, and $\sigma_{\mathrm{sur}}$ is the sign of the transmitter–receiver polarity product. Equality with the target requires $|\lambda|=\sqrt{\kappa\epsilon^2/A_R}$ and $\sigma_{\mathrm{sur}}\operatorname{sgn}(\lambda)=1$. The causal root fixes $T_{t,\mathrm{sur}}=T_r-|\lambda|/c_f$. Emission time is not an independent amplitude adjustment. Exactly two position/sign pairs remain at fixed receiver polarity. A moving original hit with separation $r$ and positive weight $W^{\mathrm{acc}}$ has matching stationary distance $r/\sqrt{W^{\mathrm{acc}}}$.

The map from a nonzero signed vector to its magnitude and unoriented axis identifies opposite vectors. This further loss of received information differs from identifying two transmitter hypotheses already producing the same signed vector. Zero has no normalized direction and no single stationary finite-separation representative with nonzero primitive polarity.

The representatives match one event on prescribed causal histories. They do not establish dynamically admissible stationary solutions, the original inventory, root playback, or future response. Falsifiers: another stationary radius under the same fixed parameters and one admitted hit would refute the radius result; opposite vectors distinguished by the magnitude-axis pair would refute the quotient counterexample; one such finite stationary hit with zero amplitude would refute the zero exclusion.

### IA-5 and IA-6: complete histories and delayed reconstruction

Claim grade: measured by the live Observer Framework definition. The complete universe-state perspective includes identity, polarity, velocity, path history, and emission/root provenance. Knowing a clock and frame alone supplies coordinates. The repair names the restricted record instead of redefining the complete-state perspective.

Claim grade: derived. Simultaneous receivers generally sample different emission times of a moving transmitter. An exact prescribed-history witness uses normalized wake speed $c_f=1$ and $\mathbf X_t(T_t)=(T_t/2,0,0)$. At $T_r=0$, receivers at $(-1,2,0)$ and $(-2,0,4)$ receive roots from $T_t=-2$ and $T_t=-4$, respectively. Their separations are two and four, and both have $D_t=1$. The emission positions are $(-1,0,0)$ and $(-2,0,0)$. Their axes, respectively $x=-1,z=0$ and $x=-2,y=0$, are skew. Direct triangulation therefore needs a stationary-transmitter hypothesis or association of the same emission event, which can require different reception times. A net acceleration direction also needs component resolution before it is interpreted as a transmitter line.

Time series, arrays, active path variation, and priors remain useful conditional methods. None establishes general uniqueness or a necessity to use all of temporal, statistical, and multi-view data. Physical control of a primitive path is not assumed. Falsifiers: a complete-state owner excluding the ledger would reopen IA-5; a shared-emission or stationary-transmitter restriction in the original triangulation claim would remove IA-6's timing objection. The original text supplies neither restriction.

## Open obligations and preserved material

| ID | Status and boundary | Resolution or falsifier |
| --- | --- | --- |
| OIA-1 | ○ Open: quantitative information, entropy, and compression need a candidate-history family, readout map, precision or coding rule, and probability model where relevant. This chapter supplies qualitative nonuniqueness only. | Supply those objects and a derived or independently measured result. Records identified by the reduction but distinguished by a claimed downstream observable disprove sufficiency for that observable. |
| OIA-2 | ○ Open: unique reconstruction, dynamically admissible surrogate histories, and physical receiver control are not established. | Establish the result under specified history, root, prior, and observation constraints. Two admitted histories with the same record and different target properties refute uniqueness. |
| OIA-3 | ○ Open, outside write authority: the Master Equation's Limited Information Per Hit subsection still calls an unoriented line the datum, and its rest-frame recast does not specify the fixed-amplitude radius. | HQ can route bounded reconciliation to that owner. A live reread showing signed-vector data and the constrained radius discharges this discrepancy. The canonical acceleration law is unchanged. |

The valid side/polarity exchange, superposition, conditional self-hit ambiguity, and requirement to retain causal-root provenance are preserved. A self-hit requires the same persistent architrino at emission and reception. A super-field-speed interval is necessary for a nontrivial simple self-hit but is not sufficient; current speed alone does not classify retained self-hits. Lossy line-bin summaries remain exploratory diagnostics without claims of solver implementation, compression performance, error bounds, or closed reduced evolution.

Source review found no external attribution, quotation, measured dataset, or named external theorem in the original chapter by complete source read. Support is the native calculation and linked live owners. No outside physics premise or decorative bibliography is added. This is implementation-owner self-review supplemented by read-only agent crw_005_information_math. Agent agreement is not independent mathematical evidence; the analytical identities and counterexamples supply the reference.

## Validation sequence

The pre-edit node scripts/validate-content.mjs --check --strict run exited 0 with 0 errors and 0 warnings, auditing 199 indexed Markdown files and 1,638 repository Markdown files. It establishes the validator's content scope, not mathematical correctness. Final checks and the owner-authorized closeout follow after implementation.

Before running the session-built math/link extractor on either target, its known fixture passed: exactly two expressions (one inline, one display), one actual Markdown link, no extraction from fenced code, successful KaTeX rendering of both valid expressions, and rejection of an invalid KaTeX command. The fixture used the repository Markdown parser, display-equation parser, and bundled KaTeX. This pass was recorded before the target invocation.

The separate read-only agent first checked its per-hit evaluator against the analytical 3–4–5 stationary case at normalized $c_f=1$ and $\kappa\epsilon^2=1$: separation five, $D_t=1$, acceleration $(3/125,4/125,0)$, magnitude $1/25$. Only afterward did it check the chapter's radius-one/radius-two counterexample, side/polarity exchange, and moving-transmitter timing witness. All assertions passed. Its post-edit full reread and algebraic substitution reported no residual demonstrated mathematical defect at chapter SHA-256 c73cb8d07b5cbff946c14f41d41a855917bbacd1c94b937733864c84d4a32755. This supports the bounded formulas, not solver certification or physical realization.

## Owner-authorized closeout — 2026-09-11

**Bounded disposition: complete.** All seven demonstrated findings IA-1 through IA-7 have been implemented: six mathematical, definitional, or claim-boundary repairs and one terminology/notation repair. None is rejected or deferred. OIA-1 and OIA-2 remain research obligations; OIA-3 remains a bounded discrepancy in an owner outside this assignment. No theory closure, conservation, solver certification, or empirical acceptance follows.

The changed files are the canonical chapter and this dedicated report. The final source reread additionally restricted the side/polarity statement to equal-distance stationary hypotheses, because reflecting a moving transmitter's position without matching its velocity-dependent weight need not preserve amplitude. This clarification does not change the displayed formulas. The final chapter SHA-256 measured by shasum -a 256 is f65783ae73a470fed7f1ab00bcce30f498c3c2d6dca855d8cd270d3af18d2388.

| Validation instrument | Result and exact scope |
| --- | --- |
| git diff --check | Passed repository diff whitespace check; no output. The new report additionally passed a direct trailing-whitespace check because untracked files are not included in git diff. |
| Focused inline Node math/link check | Passed 46 chapter math expressions, including four displays, and 10 local links. The report's analytical material passed 33 expressions, including one display, and seven local links before this closeout was appended. Final rerun covers the completed report. |
| KaTeX instrument | Used scripts/load-vendored-commonjs-bundle.mjs with apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js, throwOnError enabled and strict error mode. This checks syntax, not mathematical truth or visual layout. |
| Local-link and equation-identity instrument | Used vendor/markdown-it/markdown-it.min.js and parseCorpusDisplayEquations from scripts/build-equation-mapping-corpus.mjs; verified local path existence, Markdown heading fragments, immediate equation links, and registry membership for all four retained chapter IDs. Plain and em-dash heading fixtures passed before target anchor checks. |
| node scripts/validate-equation-mapping-links.mjs | Passed all 23 promoted equation links; this command does not audit every corpus equation. The focused instrument above covers the chapter's four links. |
| node scripts/validate-content.mjs --check --strict | Final pre-closeout run exited 1 with 32 errors and no warnings across 199 indexed Markdown files and 1,639 repository Markdown files. Every reported error is a missing local-link target outside the chapter and report. The full repository gate is not green. |
| node scripts/build-equation-mapping-corpus.mjs --check | Exited 1: 12 missing canonical equation links with IDs outside this chapter's four-ID set, and stale content/generated/equation-mapping/corpus-equations.json. No generated files were written. |

The four preserved chapter equation IDs are corpus-equation-20664d22782d3770, corpus-equation-383675d093e32642, corpus-equation-6329e70c98e750c0, and corpus-equation-04196174cb6f1e33. Their preservation is routing continuity, not evidence that generated formula payloads are current.

The strict validator's 32 errors refer to these missing destinations under reference/priorities/development-process-review/:

- evidence/refined-current-migration/recoverability-review.md
- contracts/historical-evidence-and-external-closure-v1.md
- evidence/contract-implementation/check-historical-evidence.py
- evidence/contract-implementation/historical-evidence-verification.json
- evidence/streamed-leaf-migration/retained-transport-result.json
- evidence/variable-cell-migration/check-retained-adapter.py
- evidence/variable-cell-migration/retained-adapter-construction.json
- evidence/variable-cell-migration/historical-evidence-selection.v1.json

The referencing files are under that workstream and the aaa-operations work log and braid-program work queue. The pre-edit pass was green and the later pass is not; no causal attribution to a particular concurrent task or commit is asserted. These paths are recorded as literal evidence rather than broken Markdown links. Their repair is outside this assignment.

The equation-corpus check reported missing-link IDs corpus-equation-64ee29567fb2e6aa, corpus-equation-6e68e862aa5efb32, corpus-equation-9c165fd0ccf57a2d, corpus-equation-ca9a7334a66b7f31, corpus-equation-817cee980597181e, corpus-equation-d2cf70d4831f7c61, corpus-equation-3e12b755b7ba158c, corpus-equation-2368c567c43735b7, corpus-equation-d74d654addbba1e3, corpus-equation-7b0cc8102b11d9b4, corpus-equation-6241fca47885588c, and corpus-equation-1471e36e1026f626. The exact deferred regeneration command is node scripts/build-equation-mapping-corpus.mjs --write, followed by node scripts/build-equation-mapping-corpus.mjs --check during an authorized regeneration procedure. Changed chapter formulas and context necessarily leave their generated registry records pending that procedure.

Reopen this disposition if the final chapter bytes differ, an IA repair regresses, a focused check fails, or a counterexample violates the declared fixed-magnitude simple-root construction. Reopen a stronger scientific claim only after its corresponding OIA obligation has evidence. HQ should integrate item 9's bounded disposition and route OIA-3 to the Master Equation owner; repository-wide validation remains separately unresolved. Shared trackers, generated files, and all other chapters were outside the edits performed here; no staging, commit, push, reset, stash, regeneration, or worktree action was performed.

**Final verification update.** After appending the closeout, the focused checker again passed the chapter's 46 expressions, four display IDs, and 10 links, plus the completed report's 33 expressions, one display, and seven links. The direct rg trailing-whitespace scan of both files returned no matches, and git diff --check passed. The chapter hash remained f65783ae73a470fed7f1ab00bcce30f498c3c2d6dca855d8cd270d3af18d2388.

The final post-closeout strict content run exited 1 with **33 errors**, no warnings, and 1,638 repository Markdown files audited. This supersedes the earlier 32-error snapshot for current gate reporting. No error names either assigned file. The final missing destinations under reference/priorities/development-process-review/ are analysis/archive-contract-and-coordinator-review.md, evidence/refined-current-migration/recoverability-review.md, evidence/streamed-leaf-migration/retained-transport-result.json, evidence/variable-cell-migration/check-retained-adapter.py, evidence/variable-cell-migration/retained-adapter-construction.json, and evidence/variable-cell-migration/historical-evidence-selection.v1.json. References now include reference/op/git/git-backed-knowledge-architecture.md and the development-process-review workstream. The changing out-of-scope file inventory is not used to infer causal attribution. The bounded item disposition is complete; the repository-wide content gate remains failed.
