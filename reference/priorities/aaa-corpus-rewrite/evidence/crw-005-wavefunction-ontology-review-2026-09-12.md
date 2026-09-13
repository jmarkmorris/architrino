# CRW-005 Wavefunction Ontology: Bounded Review and Repair

## Scope and provenance

This is the priority-55 worker receipt for [Wavefunction Ontology](../../../../content/markdown/aaa/quantum/wavefunction-ontology.md), dated 2026-09-12. The assignment authorized a complete chapter review, claim-preserving local repairs, and this receipt only. The [review skill](../../../../.agents/skills/architrino-review/SKILL.md) and its [live owner](../../../op/skills/skill-architrino-review.md) routed the task to the [corpus-review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md). The assignment's two-path restriction overrides ordinary shared-tracker maintenance.

The initial scoped command below returned no status entries, the chapter's SHA-256 matched dispatch, and the report-absence test succeeded. These measurements establish the initial state of the two authorized paths, not cleanliness of the shared checkout.

```bash
git --no-optional-locks status --short -- content/markdown/aaa/quantum/wavefunction-ontology.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-wavefunction-ontology-review-2026-09-12.md
shasum -a 256 content/markdown/aaa/quantum/wavefunction-ontology.md
test ! -e reference/priorities/aaa-corpus-rewrite/evidence/crw-005-wavefunction-ontology-review-2026-09-12.md
```

The baseline was 783 lines by complete numbered reading, at commit `2490eb54aef24bf6d9a49cbc7ba62f1e54553305`, with SHA-256 `859b668d40a51ae786d21817b69710e391abd2812caec667854c3aa3cff76f91`. Baseline line references below refer to those exact bytes, obtainable with the following command, rather than a moving HEAD.

```bash
git show 2490eb54aef24bf6d9a49cbc7ba62f1e54553305:content/markdown/aaa/quantum/wavefunction-ontology.md | nl -ba
```

The final chapter has 789 lines and SHA-256 `3b9563ad43f0f393d6afaf652978ae52f0087064c61e7d27b2060b751697e6c2` by `wc -l` and `shasum -a 256` on the chapter. Final line references refer to that hash. Any later byte change invalidates this exact-state receipt. No shared integration, board advancement, publication, EOM solver acceptance, physical branch existence, or theory closure is certified.

## Sources and live owners inspected

The complete baseline and repaired chapter were read, including all equations, tables, targets, and navigation. Supporting owners were inspected at the scopes below; a section inspection does not claim a complete review of that owner's other material.

| Owner or source | Inspected scope and use |
| --- | --- |
| [AGENTS.md](../../../../AGENTS.md), [startup router](../../../op/agent-startup-orientation.generated.md), [theory orientation](../../../op/theory-orientation.md) | Startup, acceleration-first layers, evidence independence, normalized wake-speed units, generated-artifact restrictions, and routing. |
| [Execution procedure](../../../op/codex-goal-seeking-prompt-template.md), [operator standard](../../../op/operator-explanation-standard.md), [geometry/dynamics specialist](../../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md) | Execution, communication, admissible-history, and mathematical review discipline. |
| [CRW priorities](../priorities.md), [work queue](../work-queue.md), [review status](../corpus-review-status.md) | CRW-005 assurance boundary and priority-55 selection. Read only; aggregate status remains coordinator-owned. |
| [Academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematics terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md) | Authoring guides and relevant terminology/level-mapping sections. Controlled references were not edited. |
| [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md) | Attribution and AI-assisted review policy. This is agent-assisted review, not independent human or experimental certification. |
| [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md) | Opening definitions and claim boundaries of the seven foundation anchors, not their complete derivations. |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) | Primitive law and scoped continuation, admissibility, history, and residual passages: live-read lines 1–83, 1363–1510, 2388–2442, and 2839–2888. No acceleration law or reference implementation changed. |
| [Measurement Ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md#what-makes-an-interaction-a-record) | Record/restartability passages, live-read lines 537–674, and weak-probe passages, lines 810–860. Crossing, persistence, autonomy, restartability, entropy, and event/energy conditions remain distinct. |
| [Quantum Operator Mapping](../../../../content/markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence) | Statistical-measure/Born interface, live-read lines 736–812. Physical measure and envelope must be independently obtained before agreement supplies evidence. |
| [No-Go Theorems](../../../../content/markdown/aaa/validation/no-go-theorems.md) | Pusey–Barrett–Rudolph and Bell assumption-status entries and explanations. |
| [Barandes, The Stochastic-Quantum Correspondence, v3](https://arxiv.org/html/2302.10778v3) | Sections 3.4–3.5: stochastic/unistochastic representation and composition; section 3.7: modeled division events and system-environment behavior. |
| [Barandes, Quantum Systems as Indivisible Stochastic Processes, v1](https://arxiv.org/html/2507.21192v1) | Sections 4.1–4.2 and enlargement discussion. This is the inspected 2025 version, not a claim about all later revisions. |
| [Pusey, Barrett, and Rudolph, On the reality of the quantum state](https://arxiv.org/abs/1111.3328) | Primary-source abstract and assumption statement: independent preparation and overlapping ontic distributions. No new proof of the theorem is supplied here. |
| [Minev et al., To catch and reverse a quantum jump mid-flight](https://arxiv.org/abs/1803.00545) | Primary-source abstract, monitored trajectory/reversal discussion, and figure descriptions. Observer-level benchmark only; the chapter's published DOI was retained. |

The inspected Barandes passages model division events and use auxiliary enlargement for general stochastic maps. They do not establish the proposed identification with autonomous Architrino records. The Minev source supports its particular monitored warning/reversal protocol, not the substrate mechanism or a universal measurement-duration claim.

## Findings and applied repairs

Nineteen grouped findings were locally repaired: twelve High and seven Medium, with document-prefixed IDs `WO-01` through `WO-19`. High denotes a missing hypothesis or conflation changing a claimed implication; Medium denotes a materially misleading domain, terminology, or comparison. Severity is the reviewer's inference about impact, not measured physical risk. “Repaired” means the text now states a supported domain or conditional target, not that the physical target was derived. No Critical finding or scientific acceptance result is asserted.

### WO-01 — Medium — Effective state and operator domains

**Baseline:** lines 21–26, 49–91. **Final:** lines 21–26, 49–91. **Disposition:** repaired.

A complex amplitude is not a probability distribution over potentials. A normalized representative permits only phase rescaling without renormalization. A mixed state is not generally one ray, and a self-adjoint operator need not have a complete discrete eigenbasis. Local phase change at fixed connection differs from simultaneous gauge transformation. The repair states these domains, including scalar/internal-component sectors and continuous/degenerate spectra. **Grade:** derived effective-mathematical correction; envelope recovery remains proposed. **Falsifier/test:** the mixed-state purity witness below obstructs a single-ray representation; any claimed extension must supply the omitted state/operator structure.

### WO-02 — High — Current, continuity, and guidance prerequisites

**Baseline:** lines 142–248. **Final:** lines 142–252. **Disposition:** repaired.

The current formula lacked its scalar Hamiltonian domain. For time-dependent volume density $w=\sqrt{\gamma_{\mathrm{sp}}}$, a compatible norm-preserving connection contributes $-i\hbar_{\mathrm{eff}}\partial_t\log w/2$; substituting a varying metric in a static equation is insufficient. Density comparison needs absolute continuity, and guidance needs positive density and weighted integrability. The repair declares real local potential, constant positive effective mass, scalar Laplace–Beltrami/no-vector-potential scope, and selection/source conditions. **Grade:** derived effective identity, not recovered substrate current. **Falsifier/test:** differentiate $\int w|\psi|^2$ under the stated boundary conditions; an uncancelled volume contribution would refute the correction.

### WO-03 — Medium — PBR overlap is not wavefunction inner product

**Baseline:** line 254. **Final:** line 260. **Disposition:** repaired.

The repaired PBR comparison distinguishes overlap of preparation distributions over ontic histories from nonzero wavefunction inner product and preserves the preparation-independence audit. **Grade:** source-supported conceptual correction from the primary PBR statement and local owner. **Falsifier/test:** a source passage identifying the theorem's epistemic-overlap hypothesis merely with Hilbert inner product would overturn this reading; neither inspected source supplies that identification. No evasion of the theorem is derived.

### WO-04 — Medium — Local ambiguity does not prove global information loss

**Baseline:** lines 261–265. **Final:** lines 263–267. **Disposition:** repaired.

One local receiver sample can underdetermine sources without proving irreversible loss under every extended or tagged observation. The repair confines ambiguity to the declared local readout. **Grade:** derived inverse-problem limitation; apparatus capability remains open. **Falsifier/test:** either construct a unique local inversion on the claimed domain or prove indistinguishability under a fully specified extended observation family. An unspecified observer limitation establishes neither result.

### WO-05 — Medium — Gaussian phase and initial contraction

**Baseline:** lines 271–312. **Final:** lines 273–314. **Disposition:** repaired.

Gaussian amplitude alone does not imply $\Delta x\Delta p=\hbar/2$, and a free packet can initially contract. Quadratic phase creates position-momentum covariance. The repair restricts preparation-time saturation to an uncorrelated pure Gaussian and states the general effective free variance law. **Grade:** derived comparison, not primitive mechanics. **Falsifier/test:** the admissible chirp below gives product $\sqrt{1.25}>0.5$ and later variance $0.3125<1$; recomputing its canonical moments directly tests both corrections.

### WO-06 — Medium — WKB branch and turning-point scope

**Baseline:** lines 314–359. **Final:** lines 316–361. **Disposition:** repaired.

The phase-gradient residual is for the positive traveling branch, not every coherent superposition. Airy matching needs a smooth simple turning point, and the opaque-barrier exponent omits prefactors and flux normalization. The repair declares these domains, the negative-branch sign, separated barrier regime, and effective-coordinate alias. **Grade:** derived asymptotic-domain correction. **Falsifier/test:** an opposite-branch superposition does not retain the displayed single-branch phase gradient; a degenerate turning point requires a different uniform approximation.

### WO-07 — High — Continuation, crossing, records, and coherence

**Baseline:** lines 9, 24, 43–45, 385–397, 429. **Final:** lines 9, 24, 43–45, 387–399, 431. **Disposition:** repaired.

Deterministic prediction requires well-posed continuation from an admissible history. Candidate resonances need existence/stability evidence; threshold crossing can reverse; a larger closed system's unitarity does not make its target pure/unitary. Ignorance or absent path records alone does not establish coherence. The repair makes these implications conditional and distinguishes full, partial, and post-selected records. **Grade:** owner-supported hypothesis correction and inferred mechanism boundary. **Falsifier/test:** reversing crossings and incoherent preparations defeat the shortcuts; an admitted continuation theorem and full apparatus record/visibility calculation would discharge the respective obligations.

### WO-08 — Medium — Irregular driving does not derive chaos or Born weights

**Baseline:** line 403. **Final:** line 405. **Disposition:** repaired.

High-dimensional irregular appearance proves neither sensitivity to initial conditions nor the quadratic Born power. The repair requires perturbation analysis on an admitted history and independent density/measure equality. **Grade:** derived non-implication; chaotic mechanism unresolved. **Falsifier/test:** a theorem connecting the admitted dynamics, selected preparation measure, and extracted amplitude to its squared modulus would discharge the obligation; a fitted histogram or irregular trace would not.

### WO-09 — High — Zero coefficient bounds weight only after recovery

**Baseline:** lines 433–444. **Final:** lines 435–446. **Disposition:** repaired.

An effective zero coefficient cannot bound an unrelated substrate basin. The repair requires the same outcome/basin mapping and an established Born error bound before inferring small record weight, and still does not infer emptiness. **Grade:** derived conditional inference. **Falsifier/test:** a positive-measure basin paired with an independently assigned zero coefficient defeats the unqualified implication. Physical nonexistence requires additional dynamical evidence.

### WO-10 — High — Geometric overlap and record existence are different tests

**Baseline:** lines 446–506. **Final:** lines 448–508. **Disposition:** repaired.

The thickened-tube ratio can exceed one and needs positive denominators and a common measured space. Geometry alone proves neither phase coherence nor its absence. The branch-set formula omits the Born/thermodynamic conditions asserted around it, while a failed quantum mapping does not imply no physical record. The repair calls overlap a calibrated proxy, clarifies “order one” relative to small tolerance, and separates record/mapping/counting tests. **Grade:** derived set/measure correction; proxy relevance proposed. **Falsifier/test:** the interval witness gives ratio 22; differing apparatus phase behavior would refute a proposed proxy calibration.

### WO-11 — High — Reduced noncomposition is not quantum interference

**Baseline:** lines 508–542. **Final:** lines 510–544. **Disposition:** repaired.

A coarse projection needs a declared hidden-history conditional lifting or a sufficiency theorem to define closed reduced transitions. Classical hidden states can cause noncomposition; a different intermediate kernel can still compose. One triple's agreement is not the full Markov property. The repair fixes common spaces, linear kernels, preparation/restart conventions, escape handling, and separate phase/visibility tests. **Grade:** derived counterexample and protocol correction. **Falsifier/test:** the two-bit witness below has reduced restart discrepancy without quantum amplitudes. Quantum recovery still needs independently extracted phase-sensitive statistics.

### WO-12 — High — Barandes comparison omitted modeled structure

**Baseline:** lines 546–554. **Final:** lines 548–556. **Disposition:** repaired.

Direct reading of the named Barandes sections shows modeled division events and auxiliary enlargement for general stochastic dynamics, contrary to the original contrast. A history-dependent equation and enlarged history state can represent the same dynamics without a literal storage object in nature. The repair removes unsupported superiority framing and narrows the comparison. **Grade:** measured source inspection plus inferred relevance, not physical equivalence. **Falsifier/test:** inspect v3 sections 3.4–3.7 and the 2025 paper's section 4.2 for the stated modeling/enlargement mechanisms; other versions require their own assessment.

### WO-13 — High — Transit time does not bound memory recovery

**Baseline:** lines 548, 556. **Final:** lines 550, 558. **Disposition:** repaired.

Omitted wakes show possible state insufficiency, not a generic order-one probability discrepancy. Transit time does not bound feedback, slow-mode relaxation, or arbitrary moving-history delays. The repair requires quantitative history-to-outcome bounds and separate boundary/relaxation controls, and acknowledges time scales in stochastic laws. **Grade:** derived non-implication; no EOM simulation. **Falsifier/test:** a uniform relaxation theorem on an admitted family could support a restricted bound. The illustrative feedback witness defeats inference from one transit alone.

### WO-14 — Medium — Departures require a matched empirical comparison

**Baseline:** lines 562–568. **Final:** lines 564–570. **Disposition:** repaired.

Effective ontology need not depart empirically from quantum theory. Finite monitored transitions and non-Markovian open-system effects are not unique discriminators; Lyapunov time is not mixing time or a demonstrated onset of Born failure. The repair requires matched preparation, probe, quantitative prediction, and uncertainty. **Grade:** source-supported comparison limit; experimental signature remains proposed. **Falsifier/test:** a derived apparatus prediction outside an independently computed quantum interval could discriminate; the Minev protocol by itself cannot.

### WO-15 — High — Determinism gives neither coarse sufficiency nor stationarity

**Baseline:** lines 574–588. **Final:** lines 576–592. **Disposition:** repaired.

Deterministic reduced flow needs sufficient retained state. Approximate invariance needs a common section or reset/return model; transient probabilities need not be stationary. The repair limits invariance to that additional model hypothesis. **Grade:** derived counterexample, not physical apparatus construction. **Falsifier/test:** a deterministic ready-to-record transition between distinct point states has initial/final total-variation distance one. A separately established stationary preparation can still satisfy the displayed bound.

### WO-16 — High — Record conditioning changes probability weights

**Baseline:** lines 583–608. **Final:** lines 585–612. **Disposition:** repaired.

Disjoint outcomes need exhaustion or a no-record event. The filtered fraction is conditional, its denominator is ensemble acceptance, one rejected trial does not make it vanish, and no-record is not automatically weak-probe. The repair labels $P_n(T_W\mid\mathrm{rec})$, requires positive acceptance, and matches conditioning in both descriptions. **Grade:** derived probability correction. **Falsifier/test:** accepted weights 0.2 and 0.3 with rejection 0.5 become 0.4 and 0.6 conditionally, not unconditionally.

### WO-17 — High — Basin images do not establish partition or density equality

**Baseline:** lines 610–636. **Final:** lines 614–640. **Disposition:** repaired.

Images of disjoint basins can overlap. Basins must be inverse images of disjoint measurable outcome regions, up to null sets. Finite region-weight agreement is weaker than density equality or total variation on all events. The repair supplies the inverse-image condition, scopes the approximation to its partition, and defines the conditioned preparation measure. **Grade:** derived measure correction. **Falsifier/test:** a constant projection merges source basins; the coarse/fine witness below has equal coarse weights but unequal fine measures. A full-density theorem remains independent work.

### WO-18 — High — Preparation selection, dependent trials, and joint acceptance

**Baseline:** lines 644–707. **Final:** lines 648–711. **Disposition:** repaired.

Physical preparation must select a measure; uniqueness among every admissible invariant measure is not necessary for transient prediction. Equal trial marginals do not prove frequency convergence. Named budgets are not derived bounds, and the combined record residual omits parts of the full predicate. The repair states the joint preparation law, finite-sample obligation, common ensemble/conditioning, positive tolerances, effective persistence-time alias, and remaining event/restart tests. **Grade:** derived probability/acceptance correction; physical selection unresolved. **Falsifier/test:** repeating one fair draw forever preserves marginals but defeats convergence to them; a joint-law theorem and same-ensemble residual bounds would discharge the corresponding obligations.

### WO-19 — High — Calibration ratios are not universal minima or integer counts

**Baseline:** lines 711–767. **Final:** lines 715–773. **Disposition:** repaired.

The preliminary family omits full record conditions and can include overlapping subsets. An infimum over calibration cells bounds that family only, and its ratio need not be integer. The repair states a nonempty calibration family, almost-everywhere outcome conditions, common normalization/window, disjoint partition, and a separate extension theorem for distinguishability. Additivity then gives an integer-part upper bound, not automatic equality. **Grade:** derived measure/counting correction; calibration/action recovery proposed. **Falsifier/test:** a smaller independently resolvable basin defeats the extension, while ratio 1.5 defeats an unqualified count interpretation.

## Mathematical witnesses and evidence independence

These references are elementary probability, linear algebra, and effective canonical quantum mechanics, stated separately from the prose being corrected. The JavaScript instrument evaluates their arithmetic after known controls. It does not simulate the EOM solver, certify admissible trajectories, or select a physical ensemble. Neither the Master Equation nor a reference implementation was changed.

1. **Classical hidden-state noncomposition:** Sample independent fair bits $U,V$ once, and observe $X_0=U$, $X_1=V$, $X_2=U$. Full sampled-state evolution is deterministic. Reduced pairwise kernels are $K_{01}=K_{12}=J$, with all entries one half, but $K_{02}=I$. Thus $J^2=J\ne I$; each point distribution has restart discrepancy one half in total variation. No complex amplitude is present. A wrong intermediate flip can fail to compose with $I$ although an alternative $I$ succeeds. This does not assert a norm value for every convention of the chapter's operator norm.

2. **Chirped pure Gaussian:** In the effective flat comparison sector with $m_{\mathrm{eff}}=\hbar_{\mathrm{eff}}=1$, take wavefunction proportional to $\exp(-x^2/4-i x^2/2)$. Then $\Delta x^2=1$, $C_{xp}=-1$, and $\Delta p^2=1.25$. The uncertainty determinant is $1(1.25)-(-1)^2=0.25$, while the product is $\sqrt{1.25}>0.5$. From $x(s)=x(0)+s p(0)$, variance at $s=0.5$ is $1-1+0.3125=0.3125$. This is observer-level comparison, not primitive mass or momentum.

3. **Overlap ratio:** On the unit interval with uniform measure, use basins $[0.40,0.41]$ and $[0.59,0.60]$ and thickening radius 0.20. The thickened intersection has length 0.22; each original basin has length 0.01. The ratio is 22, not a normalized probability.

4. **Conditional weights:** Accepted-event weights 0.2 and 0.3 give acceptance 0.5 and conditional weights 0.4 and 0.6. No-record probability is 0.5. This is not a measurement of detector efficiency.

5. **Projection strength:** Vectors $(0.5,0,0.5,0)$ and $(0.25,0.25,0.25,0.25)$ agree on the partition grouping coordinates one/two and three/four. Their full-space total-variation distance is 0.5. A constant projection also merges distinct source basins.

6. **Transient measure and trial dependence:** A deterministic transition between distinct point states has initial/final total variation one. Repeating one fair random bit on every trial preserves fair marginals but gives empirical frequencies either $(1,0)$ or $(0,1)$, each 0.5 away in total variation, regardless of sample size.

7. **Feedback versus transit:** In normalized wake-speed units $c_f=1$, an illustrative scalar recurrence with delay one and retention 0.99 per transit retains approximately 0.36603234 after 100 transits and falls below 0.01 after 459 transits. This is a counterexample to inferring relaxation from a single transit, not a derived wake law or physical cost claim.

8. **Calibration and mixed state:** Calibration cells of measure 0.1 do not rule out a candidate of measure 0.01 without an independent distinguishability theorem. Its ratio is 0.1, while measure 0.15 gives noninteger ratio 1.5. The effective two-state mixed density operator $I/2$ has purity $\operatorname{tr}((I/2)^2)=0.5$, while a normalized pure projector has purity one.

For WO-02, differentiating $w|\psi|^2$ gives a direct symbolic check: the volume derivative contributes $(\partial_t w)|\psi|^2$, and the stated time-connection contributes its negative to $w\partial_t|\psi|^2$. The remaining scalar Laplace–Beltrami terms give the current divergence under the stated real-potential and boundary assumptions. This is a conditional effective identity, not an independently validated substrate reduction.

## Preservation, bindings, and generated artifacts

Baseline/live comparison with `parseCorpusDisplayEquations` from [the corpus equation generator](../../../../scripts/build-equation-mapping-corpus.mjs) retained all 48 displayed-equation viewer IDs in order. Forty-seven displayed formulas are byte-identical. The only displayed-formula edit is `corpus-equation-b9c88661c3f64916`, baseline display start line 591/final line 595: `P_n(T_W)` became `P_n(T_W\mid\mathrm{rec})`. Its fraction and viewer ID are preserved.

Equation identities were inspected during editing. A subsequent bounded binder search below found filename references in scene graph, table of contents, equation registry, source-index fixture, and conversion ledger. This is not an exhaustive claim about digest consumers. No binding file was edited.

```bash
rg -l -F 'wavefunction-ontology.md' scripts tests src content/graph content/generated/equation-mapping reference/priorities/aaa-corpus-rewrite/evidence/conversion-ledger.md
```

The observed paths were `content/graph/scene_graph.json`, `content/graph/textbook_toc.json`, `src/apps/equation-mapping/EquationMappingRegistry.js`, `tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json`, and `reference/priorities/aaa-corpus-rewrite/evidence/conversion-ledger.md`.

The first `node scripts/build-equation-mapping-corpus.mjs --check` run returned exit 1 and reported stale `content/generated/equation-mapping/corpus-equations.json`. This task edited a fingerprinted source, so that drift was expected. A later run of the same check returned exit 0 and zero errors on the then-current shared checkout. This worker ran no regeneration, and the change in check outcome is not attributed to a particular worker or command. The exact command originally deferred, with its subsequent required check, was:

```bash
node scripts/build-equation-mapping-corpus.mjs --write
node scripts/build-equation-mapping-corpus.mjs --check
```

No regeneration remains required by the latest observed equation-generator check. If drift returns, these commands still require separate authority; their presence here is not permission to execute them. No claim is made that every generated consumer has been checked.

## Validation receipts

The inline instrument below first passed known math/link/fence examples, a known one-equation parser input, and malformed-TeX rejection. The arithmetic instrument likewise passed identity-matrix, total-variation, and unchirped-Gaussian controls before its witnesses. Target checks followed those passes. Both scripts run from the repository root with installed Node dependencies and create no files.

KaTeX checks test parsing, not visual typesetting or mathematical truth. Local-link checks test relative path existence, not HTTP availability or every dynamic fragment. Viewer identity preservation is distinct from freshness of generated equation contents. Complete manual rereads supplement the parser.

The supplemental heading check initially used an unconfigured Markdown lexer, which misread standalone TeX equality lines as Setext headings. That assertion failure was an instrument limitation, not a chapter finding. The replacement uses explicit hash-prefixed headings, first tested against a known heading plus a math block containing an equality line; no chapter edit was based on the false heading result.

The following measured results are bounded by the commands and scopes named in each row. Repository-wide checks observe a concurrent checkout, not a frozen publication candidate.

| Command or instrument | Scope and observed result |
| --- | --- |
| Complete `sed`/numbered rereads | Full 783-line baseline, 789-line final chapter, and complete receipt including embedded instruments. Scientific claims were reviewed independently of syntax validation. |
| Scoped syntax/preservation instrument below, via `node --input-type=module` | Exit 0 after known-case controls. Chapter: 249 math expressions and 86 relative local links; receipt: 38 math expressions and 31 relative local links. KaTeX strict parsing, path existence, and trailing-whitespace assertions passed on both. |
| Same preservation instrument | Exact baseline SHA-256 matched; 21 headings, 3 existing external targets, and 48 equation viewer IDs retained in order; exactly the one documented display-label edit; no links from the chapter into priorities. |
| Arithmetic witness instrument below, via `node --input-type=module` | Exit 0 after controls. Restart TV 0.5; chirped product approximately 1.11803399; contracting variance 0.3125; overlap 22; conditional weights 0.4/0.6; coarse/fine TV 0/0.5; transient TV 1; repeated-draw TV 0.5; 100-transit feedback approximately 0.36603234; measure ratios 0.1/1.5; mixed purity 0.5. These are mathematical examples, not EOM evidence. |
| Scoped `git --no-optional-locks diff --check --` on both authorized paths | Exit 0, no whitespace diagnostics. This Git mode does not include the untracked receipt. |
| `git --no-optional-locks diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-wavefunction-ontology-review-2026-09-12.md` | No whitespace diagnostics; exit 1 reflects the new-file difference in no-index mode. The separate text whitespace assertion also passed on the receipt. |
| `node scripts/validate-content.mjs --check --strict` | Latest recorded completed run: exit 0; 199 corpus Markdown files, 1701 repository Markdown files, 391 scene configurations; 0 errors, 0 warnings, 30 notes. No-incoming-scene notes are not closure evidence. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Latest recorded completed run: exit 0; 199 Markdown files, 4685 displays, 23 promoted equations, 30444 symbol definitions; 0 errors. No write mode was run by this worker. |
| Scoped `git --no-optional-locks status --short --` on both authorized paths | Chapter unstaged-modified; receipt untracked. No staged change on either assigned path by this instrument. Unrelated shared work was not edited, staged, reverted, or attributed by this task. |
| `shasum -a 256 content/markdown/aaa/quantum/wavefunction-ontology.md` | Final chapter hash matches the provenance section. |

An earlier strict run returned seven broken-link errors in sibling receipts: `crw-005-algorithmic-resonance-review-2026-09-12.md` at line 198 (two targets), 206, and 207, and `crw-005-quantum-summary-review-2026-09-12.md` at line 223 (three targets). The reported targets were `equation-mapping.html#corpus-equation-control`, `missing`, `AGENTS.md`, `a-nonexistent-ar-control-file.md`, and, in the second receipt, `AGENTS.md` and `bad.md` twice. This worker did not edit those paths. The later zero-error run supersedes that earlier blocker; the transition is not causally attributed here.

### Scoped syntax and preservation instrument

Run as `node --input-type=module` on standard input from the repository root:

```javascript
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import katex from 'katex';
import {marked} from 'marked';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
const strip=s=>s.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm,'').replace(/`+[^`]*`+/g,'');
const maths=s=>[...strip(s).matchAll(/\$\$([\s\S]*?)\$\$|(?<![\\$])\$([^$\n]+)\$/g)].map(m=>({tex:m[1]??m[2],display:!!m[1]}));
const links=s=>{const a=[];marked.walkTokens(marked.lexer(s),t=>{if(t.type==='link'||t.type==='image')a.push(t.href)});return a};
const headings=s=>[...strip(s).matchAll(/^(#{1,6})[ \t]+(.+)$/gm)].map(m=>[m[1].length,m[2]]);
const external=s=>links(s).filter(l=>/^https?:/i.test(l));
const localExists=(file,l)=>fs.existsSync(path.resolve(path.dirname(file),decodeURIComponent(l.split(/[?#]/)[0])));
const sample='# Control\n\nInline $x+1$.\n\n$$\nx^2\n$$\n\n[View →](../../../../equation-mapping.html#control)\n\n[local](AGENTS.md)\n\n~~~md\n$bad$ [ignore](missing)\n~~~\n';
assert.deepEqual(maths(sample).map(x=>x.tex.trim()),['x+1','x^2']);
assert.equal(links(sample).length,2);
assert.throws(()=>katex.renderToString('\\frac{1}{',{throwOnError:true}));
const p0=parseCorpusDisplayEquations('content/markdown/aaa/quantum/control.md',sample);
assert.equal(p0.length,1);assert.equal(p0[0].existingLink.semanticId,'control');
assert.deepEqual(headings(sample),[[1,'Control']]);
assert.deepEqual(headings('# Control\n\n'+'$'.repeat(2)+'\nx\n=\ny\n'+'$'.repeat(2)+'\n'),[[1,'Control']]);
assert.deepEqual(external('[source](https://example.com/a)'),['https://example.com/a']);
assert(localExists('content/markdown/aaa/quantum/control.md','../../../../AGENTS.md'));
assert(!localExists('content/markdown/aaa/quantum/control.md','../../../../AGENTS.md/nonexistent-child'));
console.log('KNOWN-CASE CONTROLS PASS before target read: math/fence/link/parser and bad-TeX rejection.');
const chapter='content/markdown/aaa/quantum/wavefunction-ontology.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-wavefunction-ontology-review-2026-09-12.md';
const baseline=execFileSync('git',['show','2490eb54aef24bf6d9a49cbc7ba62f1e54553305:'+chapter],{encoding:'utf8'});
assert.equal(createHash('sha256').update(baseline).digest('hex'),'859b668d40a51ae786d21817b69710e391abd2812caec667854c3aa3cff76f91');
const live=fs.readFileSync(chapter,'utf8');
assert.deepEqual(headings(live),headings(baseline));
assert.deepEqual(external(live),external(baseline));
assert(!links(live).some(l=>l.includes('reference/priorities')));
console.log(JSON.stringify({headingsPreserved:headings(live).length,externalTargetsPreserved:external(live).length,noPriorityLinks:'pass',baselineHash:'pass'}));
const a=parseCorpusDisplayEquations(chapter,baseline), b=parseCorpusDisplayEquations(chapter,live);
assert.deepEqual(a.map(x=>x.existingLink?.semanticId),b.map(x=>x.existingLink?.semanticId));
const changed=a.flatMap((x,i)=>x.tex===b[i].tex?[]:[{id:x.existingLink.semanticId,baselineLine:x.startLine,finalLine:b[i].startLine,before:x.tex,after:b[i].tex}]);
assert.equal(changed.length,1);
assert.equal(changed[0].id,'corpus-equation-b9c88661c3f64916');
assert.equal(changed[0].after,changed[0].before.replace('P_n(T_W)','P_n(T_W\\mid\\mathrm{rec})'));
console.log(JSON.stringify({equations:a.length,changed}));
for(const file of [chapter,report].filter(f=>fs.existsSync(f))){
 const s=fs.readFileSync(file,'utf8');
 const mm=maths(s);for(const x of mm)katex.renderToString(x.tex,{throwOnError:true,displayMode:x.display,strict:'error'});
 const ll=links(s).filter(l=>!/^([a-z][a-z0-9+.-]*:|#)/i.test(l));
 for(const l of ll){assert(!path.isAbsolute(l),'absolute link '+l);assert(fs.existsSync(path.resolve(path.dirname(file),decodeURIComponent(l.split(/[?#]/)[0]))),'missing link '+l)}
 assert(!/[ \t]+$/m.test(s),'trailing whitespace');
 console.log(JSON.stringify({file,mathExpressions:mm.length,localLinks:ll.length,katex:'pass',whitespace:'pass',linkPaths:'pass'}));
}
```

### Arithmetic witness instrument

Run as `node --input-type=module` on standard input from the repository root:

```javascript
import assert from 'node:assert/strict';
const near=(a,b)=>assert(Math.abs(a-b)<1e-12, a+' != '+b);
const tv=(a,b)=>a.reduce((s,x,i)=>s+Math.abs(x-b[i]),0)/2;
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,k)=>s+x*b[k][j],0)));
const I=[[1,0],[0,1]], J=[[.5,.5],[.5,.5]];
assert.deepEqual(mul(I,J),J);near(tv([1,0],[0,1]),1);near(tv([.5,.5],[.5,.5]),0);
const variance=(s,x,p,c,m)=>x+2*s*c/m+s*s*p/m/m;
near(variance(1,1,.25,0,1),1.25);
console.log('KNOWN CONTROLS PASS: identity multiplication, total variation extremes, unchirped free Gaussian.');
// Algebraic witnesses; these are comparison models, not EOM simulations.
const reduced=mul(J,J);near(tv(I[0],reduced[0]),.5);
const flip=[[0,1],[1,0]];assert.notDeepEqual(mul(flip,I),I);assert.deepEqual(mul(I,I),I);
const chirpedProduct=Math.sqrt(1*1.25);assert(chirpedProduct>.5);near(variance(.5,1,1.25,-1,1),.3125);
const overlap=Math.min(.41+.2,.6+.2)-Math.max(.4-.2,.59-.2);near(overlap/.01,22);
const accept=.2+.3;near(.2/accept,.4);near(.3/accept,.6);near(1-accept,.5);
const coarseA=[.5+0,.5+0],coarseB=[.25+.25,.25+.25];near(tv(coarseA,coarseB),0);near(tv([.5,0,.5,0],[.25,.25,.25,.25]),.5);
near(tv([1,0],[0,1]),1);
const repeatedDrawFrequencies=[1,0];near(tv(repeatedDrawFrequencies,[.5,.5]),.5);
assert(Math.pow(.99,100)>.36);assert(Math.pow(.99,459)<.01);
near(.01/.1,.1);near(.15/.1,1.5);
const root2=Math.sqrt(2), mixedPurity=.5;assert(mixedPurity<1);near(root2*root2,2);
console.log(JSON.stringify({hiddenClassicalRestartTV:.5,alternativeKernelExists:true,chirpedUncertainty:chirpedProduct,contractingVariance:.3125,thickenedOverlapRatio:22,conditionalWeights:[.4,.6],noRecord:.5,coarsePartitionTV:0,finePartitionTV:.5,transientInvarianceTV:1,correlatedTrialsTV:.5,feedbackAt100Transits:Math.pow(.99,100),calibrationRatio:.1,nonintegerRatio:1.5,mixedStatePurity:mixedPurity}));
```

## Remaining obligations and closure limits

Local repairs remove incorrect implications and state missing hypotheses. They do not prove the following obligations, which remain with their existing owners.

| Status | Obligation | Acceptance evidence still needed |
| --- | --- | --- |
| ○ Open | Envelope/current recovery | An admitted-history reduction, independent phase/amplitude extraction, and matched density/current/guidance residuals. |
| ○ Open | Record formation/restartability | Apparatus-history existence/continuation, complete record predicate, and specified restart experiment. |
| ○ Open | Physical measure/Born square | Preparation selection, identical conditioning, independent envelope, partition agreement, and any stronger density theorem. |
| ○ Open | Frequency recovery | Joint preparation law, convergence theorem, and finite-sample bounds; marginals are insufficient. |
| ○ Open | Interference/memory bounds | Phase/visibility prediction and quantitative history-to-outcome or relaxation bounds for the same apparatus. |
| ○ Open | State count/action cell | Independent calibration, distinguishability extension, disjoint cells, and derived action-cell normalization. |
| ○ Open | Coordinator integration | Review this two-path diff and receipt, reconcile sibling findings and live owners, and update shared status under coordinator authority. |
| ✓ Checked | Generated equation index | Latest check passes. If drift recurs during integration, regeneration still requires separate authority followed by its check and strict content validation. |

No source inspection or elementary witness here establishes physical branch existence, an accepted EOM solver run, downstream closure, or theory closure. The reader-facing proposals remain discoverable at their honest grade. The next concrete step is coordinator review of this chapter diff and receipt; shared-tracker edits or larger scientific development require a separate assignment.
