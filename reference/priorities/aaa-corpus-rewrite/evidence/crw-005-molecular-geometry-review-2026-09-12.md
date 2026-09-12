# CRW-005 Molecular Geometry — Bounded Assurance Review

Date: 2026-09-12. Assignment: priority 46. Target: [Molecular Geometry](../../../../content/markdown/aaa/nuclear-atomic/molecular-geometry.md). This is the authorized review and direct repair of that chapter, with editorial self-review by its repairer. The elementary derivations below provide mathematical references independent of any solver implementation; no independent human or second-agent review is claimed.

## Scope and byte identity

Only the chapter and this report were edited. The explicit two-path assignment supersedes ordinary queue-update and consultation defaults. Shared status, priorities, work queue, work log, fixtures, generated artifacts, and other chapters remain outside this worker's edit authority. No staging, commit, push, publication, regeneration, or linked-worktree operation was performed.

Measured by `shasum -a 256 content/markdown/aaa/nuclear-atomic/molecular-geometry.md`:

| Checkpoint | SHA-256 |
| --- | --- |
| Supplied and verified baseline | `d90079bceb2d02cf74dd0f83e110022ddacc6763d68e19c7355d83df6a891598` |
| First repair, verified before the second chapter edit | `e0916d115331a3bfe73b83dc8137bf68eaaf5e4f66a53400841b5d5a683f4add` |
| Final chapter | `be17d3173cfcd55e8775b7f864aca1a3f7bc33da670b6a6fb304bdc540f8e4fb` |

The supplied baseline was remeasured immediately before the first chapter patch. The second chapter patch changed only the scalar counterexample's local coordinate to $z$ and described minimum versus maximum directly; its expected predecessor hash was checked immediately before applying it. The final chapter hash was rechecked before report creation and will be checked before every report update. Subsequent report edits compare against this final chapter hash, not against the already superseded baseline.

The assignment states that the report was absent before dispatch; `test ! -e` independently confirmed its absence at this task's startup and before creation. Scoped `git --no-optional-locks status --short --` on the two authorized paths produced no entries at baseline. `git show 66e0e47de3797be86855acf6318aaab6c503031c:content/markdown/aaa/nuclear-atomic/molecular-geometry.md | shasum -a 256` reproduced the supplied baseline hash. That immutable blob, not a moving HEAD, owns the baseline line references below. Final references use `nl -ba` on the final chapter. The hash comparison is a byte-integrity measurement, not evidence of scientific correctness; any differing digest invalidates reuse of these line references without a fresh comparison.

## Sources inspected

Repository instructions and live owners were read before chapter editing. Sources listed with a range were inspected for the stated purpose; dependency reading does not count as assurance coverage of those documents.

| Source | Inspected scope and role |
| --- | --- |
| [AGENTS.md](../../../../AGENTS.md) | Full local file: startup, primitive/effective separation, normalized numerical units, evidence independence, two-path preservation, and generated-artifact rules. |
| [Generated startup router](../../../op/agent-startup-orientation.generated.md) | Corpus-review routing; the live owners below control the task. |
| [Review skill](../../../../.agents/skills/architrino-review/SKILL.md), [maintained skill owner](../../../op/skills/skill-architrino-review.md), [skills policy](../../../op/skills/README.md) | Outcome selection, owner precedence, and bounded review. |
| [Corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md), [integrator reviewer](../../../office-of-research/cto/prompts/integrator-reviewer.md) | Full-document coverage, exact findings, smallest repairs, and final self-review. Direct repair authority comes from this assignment. |
| [Theory orientation](../../../op/theory-orientation.md), [operator explanation standard](../../../op/operator-explanation-standard.md), [execution procedure](../../../op/codex-goal-seeking-prompt-template.md), [procedure index](../../../op/brainstorming.md) | Task routing, evidence explanation, and bounded durable capture. |
| [Geometry/dynamics review lens](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) | Primitive law, energy versus dynamics, equilibrium before linearization, and independence limits. |
| [Coordination queue](../work-queue.md), [priorities](../priorities.md), [document board](../corpus-review-status.md) | CRW-005 request and completion contract; 2026-09-09 coordination handoff; ownership boundaries and status-board meaning; live priority-46 Molecular Geometry row. Historical denominators and earlier next-document statements were not adopted over the live document board or this assignment. |
| [Academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematical style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematical terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md) | Reader definitions, local symbol meanings, exact TeX preservation, layer-qualified variables, equation links, and claim grades. |
| [Terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md) | Canon precedence; formal theory-name styling; wake, assembly, Noether sea, mass, inertia, and coordinate-layer entries. |
| [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md) | Selective source inclusion and actual inspection as the condition for source support. |
| [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md) | Opening ontology, primitive identity and no mass, physical clocks versus absolute time, fixed container versus medium, and product background. |
| [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md) | Opening distinction between complete-state geometry, coordinates, and observer readout. |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) | Lines 1–75: delayed acceleration-first dynamics and downstream effective reconstruction. |
| [Energy](../../../../content/markdown/aaa/dynamics/energy.md), [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md) | Energy lines 1–25 and 214–224; action opening through its regular retained-history domain: conditional scalar reconstruction does not provide a molecular variational principle. |
| [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), [Atomic Spectra](../../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md), [Nucleon Structure](../../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md), [Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md) | Opening claim boundaries and atomic response records; spectral mass/clock-map passages located by scoped `rg`; proposed constituent interfaces are not accepted molecular branches. |
| [Condensed Matter](../../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md) | Opening transport/mass-response scope and lines 329–382 on the effective harmonic dynamical matrix. |
| [Molecular Exclusion and Noether Sea Response](../../../../content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md) | Complete 134-line chapter: exploratory mapping, molecular occupancy versus channel-specific response. Its deferred findings were not repaired here. |
| [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Fermi-Dirac and Bose-Einstein Statistics](../../../../content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md) | Opening proof boundaries and effective same-state exclusion versus geometric overlap. |
| [Content validator](../../../../scripts/validate-content.mjs), [equation-registry generator](../../../../scripts/build-equation-mapping-corpus.mjs), [existing equation tests](../../../../tests/equation-mapping-corpus.test.js), [vendored-bundle loader](../../../../scripts/load-vendored-commonjs-bundle.mjs), [package configuration](../../../../package.json) | Check-only switches and write guards, fence-aware display parser, source/context/line consumers, KaTeX loading, and avoiding the regeneration-bearing npm pretest. |

External sources were opened on 2026-09-12 for bounded verification, not a literature campaign:

- NIST, *Computational Chemistry Comparison and Benchmark Database*, SRD 101, Release 22 (2022): [methane](https://cccbdb.nist.gov/exp2x.asp?casno=74828&charge=0), Geometric Data; [ammonia](https://cccbdb.nist.gov/exp2x.asp?casno=7664417&charge=0), Geometric Data; [water](https://cccbdb.nist.gov/exp2x.asp?casno=7732185&charge=0), Geometric Data. Measured source transcription: the angle entries are 109.471 degrees, 106.67 degrees, and 104.4776 degrees, respectively. Water explicitly labels its angle equilibrium; ammonia's inspected entry does not specify that convention. These values support the rounded ordering, not a common precision equilibrium dataset.
- M. D. Harmony et al., *Molecular structures of gas-phase polyatomic molecules determined by spectroscopic methods*, *J. Phys. Chem. Ref. Data* 8, 619–722 (1979), DOI [10.1063/1.555605](https://doi.org/10.1063/1.555605). The [University of Michigan author-repository copy](https://deepblue.lib.umich.edu/bitstream/2027.42/87746/2/619_1.pdf), Section 2 and Table 1, printed pages 620–623, distinguishes equilibrium, average and effective structural parameters; the effective structure fits ground-state rotational constants. PDF text was inspected; the screenshot request returned a cache-miss error, so no visual PDF verification is claimed.
- NIST, [*Essential Statistical Thermodynamics*](https://cccbdb.nist.gov/thermox.asp), internal rotation and ethane example: harmonic oscillator, free rotor and hindered rotor have distinct domains; estimating a barrier from a frequency uses additional rotor-model assumptions. Only this effective comparison is imported.

Earlier attempts to open the NIST-hosted structural PDF, a PubMed page, and a NASA PDF returned an internal error, a browser challenge, and HTTP 403, respectively. They are not evidence sources for this report. The accessible author-repository paper above supplies the structural definitions.

## Findings and repairs

Exactly eight demonstrated findings are recorded: **MG-01, MG-02, MG-03, MG-04, MG-05, MG-06, MG-07, MG-08**. All eight have direct bounded repairs. Severity is reviewer judgment: P1 marks an inference that could wrongly authorize physical or mathematical stability; P2 marks a material specification, interpretation, or exposition defect. Locations and quoted baseline meanings are measured by full source rereads; mathematical arguments below are derived under their stated premises. Proposed physical mechanisms remain guessed.

| ID / severity | Baseline lines | Final lines | Demonstrated issue and smallest repair |
| --- | --- | --- | --- |
| MG-01 / P2 | 3–11, 25 | 3–11, 25 | The opening calls assembly and medium variables primitives, leaves decisive concepts undefined, uses unstyled theory abbreviations, and treats failure to derive an unspecified common functional as a falsifier. Define the primitive-to-effective ladder and molecular vocabulary, retain the mapping as guessed, and scope rejection to a declared candidate, domain, and tolerance. Neighboring exploratory chapters do not establish branch existence. |
| MG-02 / P1 | 36–66 | 36–68 | The energy depends on electron, bond and medium records, but the nuclear derivative does not state whether they are frozen or relaxed; no conservative molecular reduction is supplied. Name every argument and effective coordinate, declare the branch and response prescription, and make the derivative conditional on a reduced energy whose restoring response matches the delayed dynamics. Preserve the display formulas. |
| MG-03 / P1 | 53–66 | 55–68 | Stationarity and a nonnegative Hessian are presented as equilibrium, with a declared soft mode enough to admit the semidefinite case. These conditions do not establish a minimum. State necessity versus sufficiency, supply the fourth-order counterexample, and require nonlinear analysis for zero modes. |
| MG-04 / P2 | 66 | 70 | Five/six rigid zero modes are subtracted without declaring symmetries of the molecular energy in its medium. Restrict that count to an isolated, homogeneous isotropic effective environment and explain why a linear nuclear geometry has only two rotational displacement directions. |
| MG-05 / P1 | 66, 70–84 | 72, 76–94 | The Hessian's eigenvectors are identified with vibrations, and a symmetric mass-weighted problem is asserted without symmetry, positivity, time, memory, or dissipation conditions on the mass response. State the harmonic reduction, positive definite symmetric mass matrix, observer time, eigenvector transformation and consistent mode projection. Keep nuclear/fragment inertia at effective grade. |
| MG-06 / P2 | 68 | 74, 94, 130 | The text calls the effective $r_0$ structure vibrationally averaged and assigns it to the harmonic calculation. Structural inference is not a general mean-distance calculation, and the Hessian supplies no state or anharmonic/readout map. Separate equilibrium lengths/angles, effective rotationally inferred structure, and vibration-dependent observations. |
| MG-07 / P2 | 88–108 | 98–118, 128 | Rounded angles are called a sharp success criterion without source, structural convention, uncertainty or a specified benchmark state. Retain all displayed numbers as a qualitative target, cite checked NIST entries, and require matched quantitative conventions. No numerical angle correction is warranted by those entries. |
| MG-08 / P2 | 108 | 120, 128 | The Hessian and branch-functional wording does not distinguish local torsional curvature from a finite rotation barrier. Separate the Hessian/mass local frequency from the full relaxed energy path and its barrier; retain ethane as an effective target. |

## Reasoning, claim grades, and falsifiers

### MG-01: proposed mechanism versus tested candidate

Claim grade: measured for the baseline wording and live-owner comparison; inferred for the risk of mistaking an unconstructed functional for a testable universal claim; guessed for the molecular corridor mechanism. The repairs supply no new molecular dynamics. A candidate test needs fixed inputs, a domain and an observable error bound before a mismatch has a defined meaning. Lack of a derivation records incompleteness, while a demonstrated mismatch rejects only the specified candidate.

Falsifier: inspect final lines 3–11 and 25 for any remaining assertion that the molecular interfaces are substrate primitives or established branches. A specified functional and controlled benchmark comparison could advance that candidate, but cannot retrospectively turn an absent calculation into a negative result.

### MG-02: frozen and relaxed curvature differ

Claim grade: derived for the following calculus, conditional on a smooth scalar energy. Let $x$ denote nuclear coordinates and $y$ the internal variables being relaxed. Along a smooth internal stationary branch $y_*(x)$ with invertible internal curvature, $E_y(x,y_*(x))=0$ implies $dy_*/dx=-E_{yy}^{-1}E_{yx}$. Thus the second derivative of $E(x,y_*(x))$ is $H_{\mathrm{rel}}=E_{xx}-E_{xy}E_{yy}^{-1}E_{yx}$, whereas the frozen derivative is $E_{xx}$. Here the subscripts denote blocks of partial derivatives; the formula requires its declared branch, not an arbitrary minimization across branch changes.

In normalized wake-speed units with $c_f=1$, take a dimensionless scalar comparison $E(x,y)=x^2+xy+y^2/2$. Relaxation gives $y_*=-x$ and $E(x,y_*(x))=x^2/2$. Frozen curvature is 2; relaxed curvature is 1. This is derived arithmetic in an independently specified toy scalar, not an Architrino energy law. It proves why omitting the differentiation prescription changes the tested quantity.

Falsifier: recompute those derivatives, or inspect final lines 51–53 for an unresolved frozen/relaxed ambiguity. Physically, a retained-history derivation whose declared energy gradient fails to reproduce the same branch's coarse-grained restoring response rejects that proposed conservative reduction.

### MG-03: semidefinite does not settle a minimum

Claim grade: derived. For a real scalar displacement $z$, $E_+(z)=z^4$ and $E_-(z)=-z^4$ both have zero first and second derivatives at zero. The first is strictly greater than its origin value for every nonzero displacement, while the second is strictly less. Their equal Hessians cannot distinguish minimum from maximum. For a stationary point of a twice continuously differentiable reduced energy, strict positive definiteness supplies the usual positive quadratic lower bound locally; semidefiniteness lacks that bound.

Falsifier: differentiate these two polynomials and evaluate their sign on either side of zero. Any final use of a declared soft mode as sufficient evidence of a minimum would reopen MG-03. A local minimum of the proposed energy still does not establish a retained molecular solution or stability in the delayed history space.

### MG-04: zero modes belong to actual symmetries

Claim grade: derived for the symmetry count under the declared point-nucleus and effective Euclidean-symmetry assumptions. Infinitesimal rotations displace each nucleus by the rotation generator acting on its position relative to a chosen origin. For a linear arrangement, rotation about the line acts trivially on every nuclear position, leaving two independent rotational displacement directions. A nonlinear arrangement has three. Add three independent translations. With $c_f=1$, the arithmetic checks give 1 internal mode for diatomic hydrogen, 4 for linear carbon dioxide, 3 for nonlinear water and 9 for methane. Degenerate vibrational frequencies do not reduce those counts.

A medium fixed in laboratory coordinates need not preserve these operations on the molecule alone. For example, the dimensionless orienting comparison energy $U(\vartheta)=\sin^2\vartheta$ has positive second derivative at zero and a nonzero orientational restoring term. The Euclidean symmetry of the substrate does not erase an imposed anisotropic environment.

Falsifier: test invariance of the proposed reduced energy under each motion being removed. A nonzero restoring coefficient in such a direction disallows its treatment as a zero mode. No invariance was measured for a physical molecular branch here.

### MG-05: mass weighting is conditional linear algebra

Claim grade: derived for the matrix identities; guessed for the proposed physical response reduction. For real symmetric positive definite $M$, write $S=M^{1/2}$. Then $S(M^{-1}\mathcal H)S^{-1}=M^{-1/2}\mathcal H M^{-1/2}$, which is symmetric when the Hessian is symmetric. The similarity preserves eigenvalues, and maps a displacement eigenvector $u_s$ to $Su_s$. The Hessian alone has energy-per-length-squared units; after multiplication by inverse mass response, the eigenvalue has inverse-observer-time-squared units. This is effective harmonic bookkeeping, not primitive mass.

With $c_f=1$ and dimensionless comparison matrices, take $M=\operatorname{diag}(4,1)$ and $\mathcal H=\left(\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right)$. The unweighted dynamic operator is $\left(\begin{smallmatrix}1/2&1/4\\1&2\end{smallmatrix}\right)$; the symmetric one is $\left(\begin{smallmatrix}1/2&1/2\\1/2&2\end{smallmatrix}\right)$. Direct multiplication checks the similarity. The vector $(1,1)$ is a Hessian eigenvector but is not an eigenvector of the unweighted dynamic operator, demonstrating the baseline's mode-identification defect.

Falsifier: verify the displayed matrix products, or exhibit a singular, nonsymmetric or indefinite proposed $M$ while applying the chapter's symmetric-positive reduction. A measured dependence on frequency, material memory or damping above the declared error invalidates that simplified physical model and requires those terms in the response equation. No such response experiment was run here.

### MG-06: structural readouts need more than a Hessian

Claim grade: measured for the source definitions in Harmony et al., Section 2 and Table 1; derived for the insufficiency of a local quadratic form. Equilibrium structure refers to a potential minimum. Effective $r_0$ parameters fit ground-state rotational constants. Neither fitting rotational data nor averaging nuclear positions is, in general, the same operation as averaging an internuclear distance. A harmonic Hessian provides local curvature but supplies no vibrational population or observable-inference prescription. Two potentials with the same Hessian can differ in higher derivatives and therefore in finite-amplitude motion.

Falsifier: inspect the paper's Table 1 against final line 74. A full state-dependent readout and anharmonic calculation from the same branch could close the physical mapping; a harmonic eigenvalue list alone cannot.

### MG-07: retain the rounded angle target at its supported precision

Claim grade: measured for the NIST entries and absence of source/convention specification in the baseline; derived for rounding and tetrahedral arithmetic. The ideal tetrahedral angle follows from unit directions proportional to $(1,1,1)$ and $(1,-1,-1)$, whose dot product is $-1/3$; hence the angle is $\arccos(-1/3)$, about 109.47122063449069 degrees. This geometry does not explain why methane realizes that arrangement. The checked NIST entries support the preserved ordering and rounding, but do not collectively establish the chapter's missing common benchmark convention.

Falsifier: inspect the linked entries and their comments, or supply a convention-matched dataset whose uncertainty-qualified ordering differs. Any precision acceptance claim using the rounded display without the state, convention and tolerance specifications would reopen the finding. Source transcription and geometric arithmetic are not molecular predictions.

### MG-08: a local frequency cannot identify a global barrier

Claim grade: derived within an explicit dimensionless scalar comparison. Set $c_f=1$ and let the torsion angle be $\varphi$. The family $U_a(\varphi)=1-\cos(3\varphi)+a[1-\cos(3\varphi)]^2$, with $a\ge0$, has the same second derivative 9 at $\varphi=0$ for every $a$. The added squared term starts at fourth order in the angle. At the intervening maximum $\varphi=\pi/3$, the height is $2+4a$. Thus $a=0$ and $a=1$ give equal local curvature but barriers 2 and 6. A declared rotor model can relate frequency and barrier by its extra shape assumptions, as in the NIST comparison; an unrestricted Hessian cannot.

Falsifier: differentiate the family and evaluate the two heights. An additional derived global form for the molecular torsional potential could permit inference of the barrier from local curvature; absent that form, final line 120 correctly requires the full path. This is not an ethane simulation.

## Validation record

The scoped source instrument's known controls ran before its target use. The first attempt to construct the command string failed in the tool orchestration layer with a JavaScript syntax error; it never executed a checker or touched a file. After correcting command quoting, the controls-only invocation passed. Its result was recorded in the task transcript before the baseline target invocation.

| Instrument / command | Result and boundary |
| --- | --- |
| `CRW_MODE=controls node --input-type=module` with the instrument below on stdin | PASS before the first target run: one inline and one display expression; unclosed delimiter rejected; backtick and tilde fences and inline code excluded; known local link and missing link distinguished; correct and missing equation IDs distinguished; clean and trailing-space cases distinguished; known corpus display parsed; valid KaTeX accepted and malformed fraction rejected. |
| Same instrument on the baseline | PASS: 20 math expressions including 4 displays; 15 local link occurrences; no external links; no trailing whitespace. |
| Same instrument after the main repair | PASS: 50 math expressions including 4 displays; 18 local link occurrences and 5 external links; all original display bodies and links retained. Final check after the last chapter/report edits is recorded below. |
| Independent analytic arguments MG-02 through MG-05, MG-07 and MG-08 | Derived conditional results and counterexamples, with no physical or solver acceptance. A Node arithmetic corroboration first passed identity and diagonal matrix-multiplication controls, then verified the mass-weighted similarity, frozen/relaxed curvatures 2/1, torsional barriers 2/6, tetrahedral angle, and internal-mode arithmetic. All numerical comparisons used $c_f=1$. |
| `git diff --check -- content/markdown/aaa/nuclear-atomic/molecular-geometry.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-molecular-geometry-review-2026-09-12.md` | PASS on the edited chapter before report creation; repeated for the final scoped state below. An untracked report needs its separate whole-file whitespace check. |
| `node scripts/validate-content.mjs --check --strict` | First post-repair observation exited 0: 0 errors, 0 warnings, 30 informational notes. It audited 391 scene configurations, 199 content Markdown files and 1684 repository Markdown files at that instant. This is a check-only repository snapshot, not a concurrency freeze or full test-suite verdict. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Baseline exited 0: 199 files, 4685 display equations, 23 promoted equations, 30436 symbol definitions. Post-repair exited 1 solely for stale `content/generated/equation-mapping/corpus-equations.json`, with the same four counts. |

The content-validator informational diagnostics are outside this chapter's repair scope: one ignored chemistry JSON, 16 approved comic images, stable-label coverage of 17 scene files, and 115 scenes with no incoming link, printed as a capped list beginning with `content/scenes/archie/braid_search.json` and element scenes. They are not chapter findings, failures, or attributed regressions. The two index path banners in the validator output are not themselves drift diagnostics. Any later concurrent diagnostics must be recorded separately rather than repaired by this worker.

The equation-registry generator was inspected at its record-construction and check-only branches. It records surrounding prose and source line numbers as well as equation TeX. The chapter's changed context and display-line offsets therefore require new generated records even though every display body and stable equation ID is preserved. The baseline check passed and the first post-edit check reported registry staleness; this establishes the observed transition, while concurrent source changes can also contribute to the registry-wide difference. It does not attribute all registry differences to this chapter.

Deferred exact command: `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check`, only in a separately authorized regeneration/publication workflow. Neither command's write form nor any other generator was run here. The full registry check is not green and is not hidden by the scoped KaTeX/link passes.

### Final verification

The final chapter was reread completely with `nl -ba` (lines 1–130); this report was reread completely with contiguous `sed -n` ranges. This is editorial self-review, not an independent scientific acceptance. Exactly eight findings remain recorded, three P1 and five P2, with the five open obligations below.

| Final instrument / command | Measured result and boundary |
| --- | --- |
| Scoped source instrument above, with controls before targets | PASS: chapter 51 math expressions, 4 displays, 18 local links and 5 external links; report 47 math expressions, no displays, 45 local links and 6 external links. Every extracted expression passes strict KaTeX rendering; every local link and equation ID resolves. External links are counted here, not network-tested by this instrument. |
| Same instrument, immutable-baseline comparison | PASS: all 4 display bodies and all 15 baseline link occurrences preserved. This does not assert that all newly authored inline mathematics is unchanged. |
| `git diff --check -- content/markdown/aaa/nuclear-atomic/molecular-geometry.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-molecular-geometry-review-2026-09-12.md` | PASS, exit 0 with no diagnostics. This scoped tracked diff is supplemented by the whole-report check below. |
| `git diff --no-index --check -- /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-molecular-geometry-review-2026-09-12.md` | PASS for report whitespace: no diagnostics; exit 1 denotes the expected new-file difference. A known clean stdin control establishes this exit convention, and trailing-space and extra-EOF-blank controls produce their expected diagnostics and exit 3. |
| `node scripts/validate-content.mjs --check --strict` | Final check-only observation exited 0: 0 errors, 0 warnings, 30 informational notes; 391 scene configurations, 199 content Markdown files, 1687 repository Markdown files. The repository-wide file count changed during the task; this observation neither freezes concurrent work nor attributes its changes. The out-of-scope notes remain separated above. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Final observation exited 1 solely with the stale registry diagnostic named above; 199 files, 4685 displays, 23 promoted equations and 30436 symbol definitions. The deferred write command remains unexecuted. |
| `shasum -a 256 content/markdown/aaa/nuclear-atomic/molecular-geometry.md` | Final digest remains `be17d3173cfcd55e8775b7f864aca1a3f7bc33da670b6a6fb304bdc540f8e4fb`, including before every report patch. A changed digest would invalidate this receipt. |

The first whole-report whitespace observation found an extra blank line at EOF (then line 264); it was removed without changing the chapter. A subsequent control attempt using `/dev/stdin` did not distinguish the trailing-space case and was rejected. Using Git's actual stdin operand `-`, the command `git diff --no-index --check -- /dev/null -` correctly distinguished inputs `clean\n` (exit 1, silent), `bad \n` (exit 3, trailing-whitespace diagnostic), and `clean\n\n` (exit 3, new-blank-line-at-EOF diagnostic). These are literal input byte descriptions. The successful controls were recorded before repeating the real report check; the earlier uncalibrated no-index runs do not own the final whitespace receipt. Scoped source checks and whitespace checks were repeated after the receipt text was finalized.

## Explicit closure limits and remaining obligations

The eight bounded textual and mathematical-assumption repairs are complete at document level; the following five physical obligations remain open. The statuses below describe this review's disposition, not changes to any shared queue.

| ID / status | Remaining obligation | Reopening evidence |
| --- | --- | --- |
| MG-O1 / ○ Open | Produce admissible retained atomic and molecular histories under the Master Equation and establish their persistence. | A declared branch, complete history/root domain, independent dynamical evidence and perturbation scope; prescribed geometry is insufficient. |
| MG-O2 / ○ Open | Derive one conservative molecular energy reduction or retain the nonconservative/delayed response where such a reduction fails. | Same-branch response agreement, an explicit relaxation prescription, and controlled errors. |
| MG-O3 / ○ Open | Derive the mass response, observer clock/ruler map and harmonic approximation; test nonlinear and zero-mode behavior where needed. | Declared frequency band, dissipation/memory limits, equilibrium first, and response/refinement evidence. |
| MG-O4 / ○ Open | Build convention-matched molecular geometry, vibrational and torsional benchmarks for the proposed set and ethane extension. | Isotopic/state/environment specifications, source uncertainty, model tolerance, and no independent observable-by-observable retuning. |
| MG-O5 / ○ Open | Recover spin, Pauli/exchange statistics and spin-sensitive bonding behavior from their owning programs. | A compatible effective state/exchange and measurement map; spatial exclusion or molecular shape alone does not supply it. |

This report does not claim theory closure, EOM solver acceptance, physical branch existence, downstream corpus closure, or scientific acceptance of the proposed corridor functional. The surrounding theory owners and their unresolved findings retain their own authority. No optional prose improvement is counted as an additional demonstrated finding.

## Reproducible scoped source instrument

From the repository root, run `CRW_MODE=controls node --input-type=module` with the following code on stdin to execute controls alone. Then run `node --input-type=module` with the same code on stdin for the two authorized files. It writes no files. This is a bounded source checker for dollar-delimited math, ordinary inline Markdown links, local file targets and the chapter's equation-registry IDs. It deliberately reports unverified non-equation fragments; it does not test network reachability, arbitrary Markdown syntax, browser appearance, visual PDF layout, registry freshness, or mathematical/physical truth.

```js
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {parseCorpusDisplayEquations} from "./scripts/build-equation-mapping-corpus.mjs";
import {loadVendoredCommonJsBundle} from "./scripts/load-vendored-commonjs-bundle.mjs";
const chapter="content/markdown/aaa/nuclear-atomic/molecular-geometry.md";
const report="reference/priorities/aaa-corpus-rewrite/evidence/crw-005-molecular-geometry-review-2026-09-12.md";
const baselineRef="66e0e47de3797be86855acf6318aaab6c503031c";
const katex=loadVendoredCommonJsBundle("apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js");
function prose(source) {
  let fence=null;
  return source.split("\n").map(line=>{
    const m=line.match(/^\s*([\x60]{3,}|~{3,})/);
    if(m) {
      if(!fence) fence=m[1];
      else if(m[1][0]===fence[0] && m[1].length>=fence.length) fence=null;
      return line.replace(/./g," ");
    }
    return fence?line.replace(/./g," "):line.replace(/([\x60]+)(.*?)\1/g,m=>m.replace(/./g," "));
  }).join("\n");
}
function math(source) {
  const p=prose(source),out=[];
  for(let i=0;i<p.length;i++) {
    if(p[i]!=="$" || p[i-1]==="\\") continue;
    const delim=p[i+1]==="$"?"$$":"$",start=i+delim.length;
    let end=start;
    while((end=p.indexOf(delim,end))>=0 && p[end-1]==="\\") end+=delim.length;
    assert.ok(end>=0,"unclosed math delimiter");
    const tex=p.slice(start,end);
    assert.ok(tex.trim(),"empty math");
    if(delim==="$") assert.ok(!tex.includes("\n"),"multiline inline math");
    out.push({tex,display:delim==="$$",line:p.slice(0,i).split("\n").length});
    i=end+delim.length-1;
  }
  return out;
}
function links(source) {
  return [...prose(source).matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/g)].map(m=>m[1]);
}
function linkErrors(source,file,exists,records) {
  return links(source).flatMap(link=>{
    if(/^https?:/.test(link)) return [];
    const [target,fragment]=link.split("#");
    const resolved=path.resolve(path.dirname(file),target || path.basename(file));
    if(!exists(resolved)) return ["missing file: "+link];
    if(fragment) {
      if(fragment.startsWith("corpus-equation-")) {
        if(!records.some(r=>r.semanticId===fragment && r.source.sourcePath===file))
          return ["missing/wrong equation record: "+fragment];
      } else return ["unverified fragment: "+link];
    }
    return [];
  });
}
function whitespace(source) {
  return source.split("\n").flatMap((line,i)=>/[ \t]+$/.test(line)?[i+1]:[]);
}
function controls() {
  const sample=["# Control","$x+1$","$$","y=2","$$","\x60$ignored$ [bad](missing)\x60","\x60\x60\x60tex","$$bad$$","[bad](missing)","\x60\x60\x60","~~~","$bad$","~~~","[ok](ok.md)"].join("\n");
  assert.deepEqual(math(sample).map(x=>[x.tex.trim(),x.display]),[["x+1",false],["y=2",true]]);
  assert.throws(()=>math("$unclosed"));
  assert.deepEqual(links(sample),["ok.md"]);
  assert.deepEqual(linkErrors(sample,"known.md",p=>p.endsWith("/ok.md"),[]),[]);
  assert.equal(linkErrors("[bad](absent.md)","known.md",()=>false,[]).length,1);
  assert.equal(linkErrors("[View](equation-mapping.html#corpus-equation-known)","known.md",()=>true,[{semanticId:"corpus-equation-known",source:{sourcePath:"known.md"}}]).length,0);
  assert.equal(linkErrors("[View](equation-mapping.html#corpus-equation-missing)","known.md",()=>true,[]).length,1);
  assert.deepEqual(whitespace("good\n"),[]);
  assert.deepEqual(whitespace("bad \n"),[1]);
  assert.equal(parseCorpusDisplayEquations("known.md",sample).length,1);
  assert.doesNotThrow(()=>katex.renderToString("\\frac{1}{2}",{throwOnError:true,strict:"error"}));
  assert.throws(()=>katex.renderToString("\\frac{1}{",{throwOnError:true,strict:"error"}));
  console.log("CONTROLS PASS: math extraction, unclosed delimiter rejection, fenced/inline code exclusion, local link positive/negative, equation ID positive/negative, whitespace positive/negative, corpus display parser, KaTeX positive/negative.");
}
controls();
if(process.env.CRW_MODE!=="controls") {
  const records=JSON.parse(fs.readFileSync("content/generated/equation-mapping/corpus-equations.json","utf8")).records;
  for(const file of [chapter,...(fs.existsSync(report)?[report]:[])]) {
    const source=fs.readFileSync(file,"utf8"),expressions=math(source);
    for(const m of expressions) katex.renderToString(m.tex,{displayMode:m.display,throwOnError:true,strict:"error"});
    assert.deepEqual(linkErrors(source,file,p=>fs.existsSync(p)&&fs.statSync(p).isFile(),records),[]);
    assert.deepEqual(whitespace(source),[]);
    console.log(JSON.stringify({file,math:expressions.length,displays:expressions.filter(x=>x.display).length,localLinks:links(source).filter(x=>!/^https?:/.test(x)).length,externalLinks:links(source).filter(x=>/^https?:/.test(x)).length,whitespace:"PASS",katex:"PASS",links:"PASS"}));
  }
  const source=fs.readFileSync(chapter,"utf8");
  const baseline=execFileSync("git",["show",baselineRef+":"+chapter],{encoding:"utf8"});
  const a=math(baseline).filter(x=>x.display).map(x=>x.tex);
  const b=math(source).filter(x=>x.display).map(x=>x.tex);
  assert.deepEqual(b,a);
  const prior=links(baseline);
  assert.ok(prior.every(x=>links(source).includes(x)),"lost baseline link");
  console.log("PRESERVATION PASS: all "+a.length+" display bodies and "+prior.length+" baseline link occurrences retained.");
}
```
