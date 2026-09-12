# CRW-005 Numerical Recipe and Stability — Review and Repair

## Scope and source identity

This is the authorized implementation-owner assurance review for CRW-005 item 10, [Numerical Recipe and Stability](../../../../content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md). The complete 36-line chapter was read before editing. `shasum -a 256` measured its initial SHA-256 as `49d270ceb819c2c8865c27f4bc3b315c5acf698e69ae681f4c344a97d2e621d6`; `git rev-parse HEAD` returned `4a8e760bae44dbc868714e579ba60779ae0be9d2`. Scoped `git diff` and `git --no-optional-locks status --short` returned no changes for the chapter or this report destination before work began. These identify the reviewed working-tree bytes; HEAD alone does not identify concurrent owner documents.

Write authority covers only the chapter and this dedicated evidence report. HQ owns shared inventory, priority, queue, and work-log integration. This is editor self-review with a separate read-only contract audit, not independent scientific certification. The mathematical references below are explicit identities and counterexamples; numerical instruments are named with their limited reach. Every new numerical instantiation uses $c_f=1$.

The review follows the maintained [corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), with the operator's explicit repair authority overriding its report-only default. Current authorities inspected include [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target), the [EOM evolution contract](../../app-solver/contracts/evolution-contract-v1.md), [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md), [Units and Constants](../../../../content/markdown/aaa/validation/simulations/action-energy/units-and-constants.md), and the relevant academic, mathematical, terminology, source, and validation guidance. The nearby [Well-posedness and Regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) was inspected for its event and regulator claims. Its automatic sharp-hit jump language conflicts with the narrower continuous-emission account in Master Equation; this task follows the latter and records the neighboring conflict without editing that chapter.

## Findings and dispositions

Original line numbers below refer to the identified 36-line source. Seven substantive numerical or claim-boundary defects and one exposition defect are accepted for bounded repair. Four scientific or numerical obligations remain open separately; none is silently converted into a solved theorem.

### NR-1 — Continuous emission was replaced by velocity jumps

**High; derived mathematical defect.** Original lines 3 and 22 prescribe jumps at hit times. Master Equation, “Path-History Sum and Integral Representation” (lines 83–164) instead integrates over continuous emission time and collapses that integral at each reception time. On a simple branch this gives an acceleration function, not an atom in reception time. For a stationary transmitter at the origin and a prescribed receiver at distance two, $F(T_t;T_r)=2-T_r+T_t$, so $T_t=T_r-2$ and $W^{\mathrm{acc}}=1$ at every reception time with adequate history. The contribution is continuous. The prescribed receiver is a geometry diagnostic, not an equilibrium of the coupled EOM.

A generic fold is also insufficient to justify an instantaneous jump. Master Equation, “Caustic Transit and Finite Impulse” (lines 332–411) bounds acceleration by a constant times $|T_r-T_*|^{-1/2}$, whose integral over a shrinking window tends to zero. Finite integrated acceleration over a finite window does not create a nonzero atomic jump at its endpoint.

**Repair:** distinguish sharp simple-root evolution, resolved fold transitions, and explicitly declared discrete-emission quadrature. No velocity jump is assigned merely because a root is found. **Reopening condition:** a separately specified atomic emission measure or proved atomic singular limit, with its normalization and event law, would justify an impulsive variant at that stated scope.

### NR-2 — Root search and stopping tolerances did not establish completeness

**High; measured contract omission with derived error bound.** Original lines 8–9 and 26 say to solve and track roots but do not state retained-history coverage, continuous interpolation, complete inactive-interval exclusion, or error bounds. The EOM contract requires continuous retained histories with certified interpolation error and root completeness. Binary Dynamics line 1799 requires a covering of the entire complementary delay domain, not a sampled gap test. A sign-change scan misses an even-multiplicity zero, such as $F(S)=(S+1)^2$ on $[-2,0]$; this scalar counterexample tests the algorithmic assertion, not an EOM trajectory.

On an interval containing one root with $|\partial_{T_t}F|\ge\nu_t>0$, the mean-value theorem gives root-time error at most $\varepsilon_F/\nu_t$ when the true residual is bounded by $\varepsilon_F$. If interpolation or evaluation adds at most $\varepsilon_g$, the bound becomes $(\varepsilon_F+\varepsilon_g)/\nu_t$. A small sampled residual without a certified interval and floor is insufficient.

**Repair:** require evaluable histories, separate root brackets, complete complementary-domain exclusion, error-aware stopping, and an explicit tail or finite-memory-model account. Missing coverage is unresolved, not zero acceleration. **Reopening condition:** any unaccounted root, invalid interval floor, history-edge contribution, or interpolation error exceeding the declared bound invalidates the affected receipt.

### NR-3 — Sharp-root evaluation and finite-width regularization were conflated

**High; measured domain omission.** Original line 12 divides by $|D_t|$ without first requiring a simple root; line 23 replaces an unspecified delta but gives neither its integration measure nor a coincidence prescription. The root formula is valid on positive-separation simple roots. At finite surface width, the calculation is an emission-time integral over neighborhoods of roots; inserting the collapsed weight again double-counts its Jacobian. Surface smoothing alone does not bound the inverse-square kernel near self coincidence. Excluding the exact endpoint by $H(0)=0$ does not exclude a singular neighborhood.

**Repair:** declare the simple-root/separation domain; specify a unit-integral distance-gap mollifier inside the transmitter-time integral; use the chosen separation exclusion or the master-equation auxiliary core prescription; retain causal endpoints and regulator metadata. No clipping of $D_t$, deletion of a difficult root, or undeclared softening is authorized. **Reopening condition:** a zero separation, vanishing simple-root floor, unpartitioned mollifier support, or mismatched regulator normalization requires a new domain/event treatment before acceptance.

### NR-4 — Counting wake overlaps is not a resolution condition

**High; derived numerical defect.** Original line 27 limits the number of overlapping wake surfaces per step. A single narrow crossing can still fall between evaluation times. At fixed emission time, $\partial_{T_r}F=-D_r$; at fixed reception time, $\partial_{T_t}F=D_t$. Thus a distance-gap width $\eta$ has local reception and emission widths $\eta/|D_r|$ and $\eta/|D_t|$ when those derivatives are nonzero. These are local linear estimates; zero derivatives require higher-order event treatment. Master Equation lines 2939–2949 states the same reception-time distinction.

**Repair:** resolve both axes, the history interpolant, and transition neighborhoods; treat the scales as resolution guidance, not an integrator-stability theorem. **Reopening condition:** missed crossing area, a failed quadrature ladder, or higher-order geometry invalidating the linear estimate overturns an asserted resolution pass.

### NR-5 — Refinement and tolerance requirements were insufficiently separated

**Medium; measured algorithmic omission.** Original lines 23–28 suggest small width and steps but do not separate discretization error, history truncation, root error, and model regularization. Changing $\eta$ while underresolving its support can conceal error rather than demonstrate a sharp limit. A plateau under step refinement can also retain a missing-root or memory bias.

**Repair:** first refine time stepping, history interpolation, root tolerances, and quadrature at fixed regulators on the same observation window; then assess retained-memory truncation and separately declared regulator limits. Record absolute/relative tolerances and observable norms. Restrict measured convergence to the instrument and tested finite family. **Reopening condition:** a changed branch ledger, unresolved error plateau, failed next refinement level, or independent known-case disagreement reopens the numerical claim.

### NR-6 — An unspecified potential balance was used as invariant validation

**High; measured claim overreach with derived counterexample.** Original line 28 proposes “invariants” and work–energy balance with undefined $\Phi_\eta$. Master Equation's regularized energy and no-runaway sections state that a matching independent action/boundary charge is required for conservation evidence. Defining $U(T)-U(T_a)=-\int_{T_a}^{T}\mu_{\mathrm{arch}}\mathbf A\cdot\mathbf V\,dT'$ forces $K_\mu+U$ to be constant along the same integrated acceleration, whether or not that acceleration is the correct EOM. The coefficient $\mu_{\mathrm{arch}}$ is a bookkeeping weight, not primitive mass.

**Repair:** route energy diagnostics to Delay Dynamics Energy, matching history, regulator, boundary, and kinetic conventions; identify work reconstruction as an arithmetic check. **Reopening condition:** a separately derived conservation charge with a closed boundary account can support a stronger conservation claim for that model and domain; a flat reconstructed trace cannot.

### NR-7 — Binary acceptance and stability were weaker than the current owner

**High; measured cross-owner mismatch.** Original lines 34–36 require a computed projected spectrum and unchanged ledger without distinguishing approximate-state diagnostics from a stability certificate. Binary Dynamics lines 1845 and 1912–1914 requires an actual periodic solution or an a posteriori existence proof, nonlinear error bounds, and control of the full history-space return operator. Its line 1799 states that loss of a floor invalidates the smooth fixed-ledger certificate, not every possible continuation.

**Repair:** require EOM balance before stability analysis, distinguish stationary equilibrium from periodic-history return, retain the canonical tuple rather than duplicate it, and reserve finite projected spectra for diagnostics with approximation bounds. State that a changing ledger calls for an event chart. **Reopening condition:** a certified nearby periodic history and full transverse operator bound would close stability at that scope; nonzero converged balance residual, omitted physical modes, or unresolved history truncation defeats that claim.

### NR-8 — Load-bearing symbols and units were introduced too late or not defined

**Medium; measured exposition defect.** Original lines 8–12 use normalized formulas before line 30 announces $c_f=1$, and leave $o'$, $\mathbf X$, $\mathbf V$, $\kappa$, polarity sign, $\eta$, and root-playback meaning implicit. The per-hit acceleration formula itself agrees with the current master equation once its domain and normalization are stated.

**Repair:** define the source/receiver labels, histories, polarity and coupling, normalization, and regulator before use; retain the exact existing acceleration equation and Equation Mapping link. **Reopening condition:** a remaining undefined symbol or contradictory unit convention in the final chapter requires a local clarification, not a new physical law.

## Open obligations

| ID | Status and owner | Remaining evidence and falsifier |
| --- | --- | --- |
| ONR-1 | ○ Open — EOM evolution and root/event contracts | Accepted evolved segments must close the history → roots → acceleration → accepted-history loop with complete root exclusion and an independently validated event route. A missed root, unresolved history tail, or prescribed future path used as evolution invalidates the claimed segment. This chapter supplies no solver conformance certificate. |
| ONR-2 | ○ Open — Master Equation regulator/continuation targets | Sharp-limit and memory-limit conclusions need bounds on the declared family, including singular events and core removal where claimed. A finite-width agreement or a finite refinement ladder alone does not prove those limits. Nonconvergent integrated events or loss of separation/floors falsifies the claimed regime. |
| ONR-3 | ○ Open — Binary Dynamics closure target | Periodic existence, full-history stability, basin claims, and physical recovery remain separate. A certified candidate plus the owner's existence and operator bounds would discharge a bounded stability claim; an unresolved mode or balance defect defeats it. |
| ONR-4 | ○ Open — Delay Dynamics Energy and action owners | Independent conservation, a lower bound, and no-runaway claims require a compatible charge and complete boundary account. A same-acceleration work reconstruction cannot discharge them. An independently derived nonzero balance residual falsifies the proposed conservation account. |

The neighboring regularization chapter's jump claim is an out-of-scope propagation issue for HQ. It is not repaired or silently accepted by this receipt. No empirical acceptance, theory closure, or production certification follows from the numerical recipe.

## Validation working record

Before inspecting the real files with the in-session parser harness, its synthetic known case passed: the existing `renderMarkdownWithMath` runtime plus vendored Markdown-it and KaTeX rendered exactly two valid expressions, found exactly one actual Markdown link, ignored the deliberately invalid math and false link inside a fenced code block, and detected a separate invalid TeX command. The harness forces KaTeX `throwOnError: true`, records caught errors, and inspects Markdown-it link tokens. This preflight is recorded before the target run; it establishes parser reach for the constructs used here, not mathematical correctness.

The read-only contract auditor ran `node --test tests/causal-wake-update-law.test.js tests/prescribed-orbit-causal-roots.test.js`: exit 0, 10 tests passed, none failed, reported duration 115.253833 ms. The first test file's affine source case has $c_f=1$, source velocity $0.3$, receiver position $0.8$, and reception time $1$. Directly solving $0.8-0.3T_t=1-T_t$ gives $T_t=2/7$, $D_t=0.7$, and $W^{\mathrm{acc}}=10/7$. The root solver is checked against those independent algebraic values. Gaussian source-time quadrature at width $0.004$ with 120,000 midpoint panels agrees within $2\times10^{-10}$. Other tests cover normal direction, stationary and prescribed circular roots, and positive acceleration weight during negative playback. They establish bounded prescribed-geometry and regular-root behavior, not evolved-EOM correctness, regulator convergence, or stability.


## Owner-authorized closeout — 2026-09-11

**✓ Done at the bounded review/disposition level.** NR-1 through NR-8 are implemented: seven substantive repairs and one exposition repair, with six high-severity and two medium-severity findings. No demonstrated in-scope repair is deferred. ONR-1 through ONR-4 remain explicitly open scientific/numerical obligations; they are not a claim that this recipe has supplied their evidence.

Changed files:

- `content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md`
- `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-numerical-recipe-and-stability-review-2026-09-11.md`

`shasum -a 256` measures the final chapter as `9190379b6114a067e549fe43a3bed3040d2a5a03494c5f15de82f3c044e22d37`; `wc -l` measures 44 lines. The complete revised chapter and scoped diff were reread by the implementation owner and the read-only contract auditor. The auditor found no remaining demonstrated defect in the repaired domains and requested one wording clarification: refinement holds the initial-history function and memory window fixed while evolved histories remain outputs. That clarification is implemented. The original acceleration display and its stable `corpus-equation-af40ad24c32aee01` link remain unchanged by scoped `git diff` inspection. The six-part recipe structure and canonical Binary Dynamics tuple ownership are retained.

| Check | Measured result and limit |
| --- | --- |
| `git diff --check` | Exit 0 on the shared tracked diff. The separate `git diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-numerical-recipe-and-stability-review-2026-09-11.md` returned exit 1 with no whitespace diagnostics, reflecting the new-file difference. Control commands using clean and trailing-space stdin returned exit 1 with no diagnostics and exit 3 with a trailing-whitespace diagnostic, respectively. |
| `node scripts/validate-content.mjs --check --strict` | The first post-repair run passed with exit 0, 0 errors, 0 warnings, and 30 notes. Two later runs returned exit 1 with 32 broken-link errors, 0 warnings, and 30 notes; every reported source is outside the two authorized files. The exact final errors are retained below. This checks repository content structure and links, not numerical correctness. |
| `node --test tests/causal-wake-update-law.test.js tests/prescribed-orbit-causal-roots.test.js` | Exit 0; 10/10 passed, as recorded above. Independent affine-root algebra and fixed-reception quadrature are regular-domain evidence only. |
| Focused Markdown/KaTeX harness below | Known-case preflight passed first. Target parsing found 47 chapter expressions and 41 report expressions, with zero KaTeX errors; all local file targets resolved. Anchor claims are limited to the chapter's three named master-equation/binary headings, also confirmed by `rg -n` against those owners; the harness checks file existence, not arbitrary fragment validity. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1: 12 missing canonical source links and stale `content/generated/equation-mapping/corpus-equations.json`. This is an unresolved generated-artifact check, so the receipt does not claim all repository checks are green. |

The equation-mapping check reported the following missing-link IDs:

```text
corpus-equation-64ee29567fb2e6aa
corpus-equation-6e68e862aa5efb32
corpus-equation-9c165fd0ccf57a2d
corpus-equation-ca9a7334a66b7f31
corpus-equation-817cee980597181e
corpus-equation-d2cf70d4831f7c61
corpus-equation-3e12b755b7ba158c
corpus-equation-2368c567c43735b7
corpus-equation-d74d654addbba1e3
corpus-equation-7b0cc8102b11d9b4
corpus-equation-6241fca47885588c
corpus-equation-1471e36e1026f626
```

The required authorized regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check`. It was not run. The chapter's changed explanatory context contributes to registry freshness requirements; this review does not assign the other missing-link IDs to an author, commit, or failure transition. HQ owns regeneration and shared-record integration. This task did not edit a shared board, another chapter, solver code, test code, or a generated artifact, and performed no Git publication or worktree operation.

The bounded disposition reopens if a referenced owner changes incompatibly, an independent root/weight case fails, a missed root or unbounded history contribution is found, or any claimed event, convergence, energy, or stability result lacks the conditions listed under its finding. The neighboring regularization chapter's automatic-jump wording remains a specifically identified propagation issue for its separate owner. Item 10 can be marked complete for this review and repair scope while those broader obligations remain open. Repository-wide validation remains blocked by the recorded out-of-scope link failures and generated drift; this receipt is not a publication-readiness approval.

### Final repository validation failure

The final `node scripts/validate-content.mjs --check --strict` run returned the output below. Earlier and later runs differ; the relevant file-state transition and causal attribution were not investigated under this two-file assignment. HQ should route the missing evidence/contract targets to their existing owners and rerun the repository check. The chapter and report retain their passing focused parser checks.

```text
validate-content mode: check (strict)
- Scene config files discovered: 391
- Markdown files discovered: 199
- Repo markdown files audited: 1639
- Non-scene JSON ignored: 1

content/scenes/scenes_index.json

content/markdown/markdown_index.json

notes:
- Ignored non-scene JSON under content/scenes: content/scenes/chemistry/periodic_table.json
- Comic release image audit: 16 approved square single-panel comic(s).
- Stable ID/label lock coverage: 17 scene file(s).
- No incoming scene links (115) excluding root content/scenes/architrino_assembly_architecture.json
- no-incoming-link: content/scenes/archie/braid_search.json
- no-incoming-link: content/scenes/elements/ac.json
- no-incoming-link: content/scenes/elements/ag.json
- no-incoming-link: content/scenes/elements/al.json
- no-incoming-link: content/scenes/elements/am.json
- no-incoming-link: content/scenes/elements/ar.json
- no-incoming-link: content/scenes/elements/as.json
- no-incoming-link: content/scenes/elements/at.json
- no-incoming-link: content/scenes/elements/au.json
- no-incoming-link: content/scenes/elements/b.json
- no-incoming-link: content/scenes/elements/ba.json
- no-incoming-link: content/scenes/elements/be.json
- no-incoming-link: content/scenes/elements/bh.json
- no-incoming-link: content/scenes/elements/bi.json
- no-incoming-link: content/scenes/elements/bk.json
- no-incoming-link: content/scenes/elements/br.json
- no-incoming-link: content/scenes/elements/c.json
- no-incoming-link: content/scenes/elements/ca.json
- no-incoming-link: content/scenes/elements/cd.json
- no-incoming-link: content/scenes/elements/ce.json
- no-incoming-link: content/scenes/elements/cf.json
- no-incoming-link: content/scenes/elements/cl.json
- no-incoming-link: content/scenes/elements/cm.json
- no-incoming-link: content/scenes/elements/cn.json
- no-incoming-link: content/scenes/elements/co.json
- no-incoming-link: ... 90 more

errors:
- reference/priorities/aaa-operations/work-log.md:28: markdown link target "../development-process-review/evidence/refined-current-migration/recoverability-review.md#refined-admission-decision--september-11" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/braid-program/work-queue.md:26: markdown link target "../development-process-review/evidence/refined-current-migration/recoverability-review.md#refined-admission-decision--september-11" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/archive-contract-and-coordinator-review.md:7: markdown link target "../contracts/historical-evidence-and-external-closure-v1.md" resolves to missing path "reference/priorities/development-process-review/contracts/historical-evidence-and-external-closure-v1.md"
- reference/priorities/development-process-review/analysis/archive-contract-and-coordinator-review.md:15: markdown link target "../evidence/contract-implementation/check-historical-evidence.py" resolves to missing path "reference/priorities/development-process-review/evidence/contract-implementation/check-historical-evidence.py"
- reference/priorities/development-process-review/analysis/archive-contract-and-coordinator-review.md:15: markdown link target "../evidence/contract-implementation/historical-evidence-verification.json" resolves to missing path "reference/priorities/development-process-review/evidence/contract-implementation/historical-evidence-verification.json"
- reference/priorities/development-process-review/analysis/archive-readiness-review.md:30: markdown link target "../evidence/refined-current-migration/recoverability-review.md#wider-local-recovery-follow-through" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/emission-current-migration.md:19: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/recovery-closeout-review.md:39: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/recovery-closeout-review.md:44: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/recovery-closeout-review.md:48: markdown link target "../evidence/refined-current-migration/recoverability-review.md#wider-local-recovery-follow-through" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/recovery-closeout-review.md:85: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/recovery-closeout-review.md:86: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/recovery-closeout-review.md:87: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/recovery-closeout-review.md:88: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/recovery-closeout-review.md:135: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/remaining-caller-contracts.md:13: markdown link target "../evidence/refined-current-migration/recoverability-review.md#refined-admission-decision--september-11" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/remaining-caller-contracts.md:53: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/remaining-caller-contracts.md:61: markdown link target "../evidence/refined-current-migration/recoverability-review.md#wider-local-recovery-follow-through" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/review-and-repair-plan.md:71: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/scientific-consumption-disposition.md:12: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/shared-helper-caller-audit.md:41: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/shared-helper-caller-audit.md:42: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/shared-helper-caller-audit.md:43: markdown link target "../evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/source-recovery-and-binding-repair.md:12: markdown link target "../evidence/refined-current-migration/recoverability-review.md#wider-local-recovery-follow-through" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/analysis/streamed-leaf-launch-migration.md:45: markdown link target "../evidence/streamed-leaf-migration/retained-transport-result.json" resolves to missing path "reference/priorities/development-process-review/evidence/streamed-leaf-migration/retained-transport-result.json"
- reference/priorities/development-process-review/analysis/variable-cell-historical-migration.md:7: markdown link target "../evidence/variable-cell-migration/check-retained-adapter.py" resolves to missing path "reference/priorities/development-process-review/evidence/variable-cell-migration/check-retained-adapter.py"
- reference/priorities/development-process-review/analysis/variable-cell-historical-migration.md:7: markdown link target "../evidence/variable-cell-migration/retained-adapter-construction.json" resolves to missing path "reference/priorities/development-process-review/evidence/variable-cell-migration/retained-adapter-construction.json"
- reference/priorities/development-process-review/analysis/variable-cell-historical-migration.md:23: markdown link target "../evidence/variable-cell-migration/historical-evidence-selection.v1.json" resolves to missing path "reference/priorities/development-process-review/evidence/variable-cell-migration/historical-evidence-selection.v1.json"
- reference/priorities/development-process-review/priorities.md:21: markdown link target "evidence/refined-current-migration/recoverability-review.md#refined-admission-decision--september-11" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/work-log.md:195: markdown link target "evidence/refined-current-migration/recoverability-review.md" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/work-log.md:203: markdown link target "evidence/refined-current-migration/recoverability-review.md#wider-local-recovery-follow-through" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"
- reference/priorities/development-process-review/work-log.md:414: markdown link target "evidence/refined-current-migration/recoverability-review.md#refined-admission-decision--september-11" resolves to missing path "reference/priorities/development-process-review/evidence/refined-current-migration/recoverability-review.md"

summary: 32 error(s), 0 warning(s), 30 note(s)
```


### Reproduce the focused parser check

Run from the repository root. This reads the two authorized documents and the existing renderer/vendor files; it produces no artifacts. The synthetic preflight executes before either target read.

```bash
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
import {renderMarkdownWithMath} from './src/apps/reference/ReferenceSurfaceRuntime.js';
const md=loadVendoredCommonJsBundle(path.resolve('vendor/markdown-it/markdown-it.min.js'))({html:false,linkify:true,breaks:false});
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
function inspect(source) {
  let math=0; const errors=[];
  const html=renderMarkdownWithMath(source,md,{renderToString(body,opts) {
    math++; try {return katex.renderToString(body,{...opts,throwOnError:true});}
    catch(error) {errors.push(error.message); throw error;}
  }});
  const links=[];
  function walk(tokens) {for(const t of tokens) {if(t.type==='link_open')links.push(t.attrGet('href')); if(t.children)walk(t.children);}}
  walk(md.parse(source,{}));
  assert.doesNotMatch(html,/MATHSEGMENTTOKEN\d+X/);
  return {math,errors,links};
}

const fence=String.fromCharCode(96).repeat(3);
const example=inspect('Inline $x$.\n\n$$y^2$$\n\n[ok](AGENTS.md)\n\n'+fence+'text\n$\\badcommand$ [bad](missing.md)\n'+fence);
assert.equal(example.math,2);assert.equal(example.errors.length,0);assert.deepEqual(example.links,['AGENTS.md']);
assert.equal(inspect('$\\badcommand$').errors.length,1);
console.log('Parser preflight PASS before target reads');

for(const file of [
'content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md',
'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-numerical-recipe-and-stability-review-2026-09-11.md'
]) {
  const result=inspect(fs.readFileSync(file,'utf8'));
  assert.equal(result.errors.length,0,JSON.stringify(result.errors));
  const local=result.links.filter(href=>!/^([a-z]+:|#)/i.test(href));
  for(const href of local)assert.ok(fs.existsSync(path.resolve(path.dirname(file),decodeURIComponent(href.split('#')[0]))),file+': '+href);
  console.log(JSON.stringify({file,math:result.math,localLinks:local.length,errors:result.errors.length}));
}

NODE
```
