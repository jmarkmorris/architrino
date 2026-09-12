# CRW-005 Nuclear Binding: bounded review and repair

## Disposition and scope

**Disposition: 14 demonstrated exposition/accounting issues repaired; 9 high and 5 medium severity.** Finding IDs are NB-01 through NB-14, inclusive. This is bounded chapter assurance against the dispatched baseline and the inspected current owners, not theory closure, physical branch existence, EOM solver acceptance, or downstream corpus closure. The review skill selected the corpus-review procedure; the operator's explicit two-path repair authority permitted direct chapter repairs. A complete same-agent reread followed the edits; it is self-review, not independent scientific corroboration. Proposed nuclear mechanisms remain hypotheses at guessed or explicitly inferred grade until derived from histories; the arithmetic below does not promote their physical status.

The only authorized output paths are [Nuclear Binding](../../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) and this report. Shared coordination status, priorities, queues, work logs, fixtures, generated artifacts, and other chapters remain outside this assignment. No Git publication, regeneration, or linked-worktree operation was performed.

## Baseline, ownership, and hashes

- Dispatch date: 2026-09-12; priority 43; campaign CRW-005.
- Baseline chapter SHA-256, measured with `shasum -a 256 content/markdown/aaa/nuclear-atomic/nuclear-binding.md`: `428e2c7533f612c8d4134d3dcf89170d1456f68beeb7bcb721bdc7583e97cdad`.
- Final chapter SHA-256, measured with that same command: `0ea9a4a3d237e770d3fff6e62b3dc16049abb6de2eee6baf737b2014d054ac7d`.
- The initial two-path `git --no-optional-locks status --short -- <chapter> <report>` returned no entries, and `test ! -e <report>` succeeded before dispatch work. Those instruments establish initial cleanliness only for these two paths.
- `git show 66e0e47de3797be86855acf6318aaab6c503031c:content/markdown/aaa/nuclear-atomic/nuclear-binding.md | shasum -a 256` reproduced the dispatch digest. That pinned commit supplies the exact 384-line baseline, not a moving HEAD or an inferred earlier rewrite state.
- The chapter digest was checked before every chapter patch against the expected predecessor; the first check matched the supplied baseline and subsequent checks matched this task's own immediately preceding revision. The measured revision chain was `428e2c…cdad → f4bcf7d9cb9c568a4dd7ea512e4370689399b6d726a85c26d27773279561f629 → 374ba2a0ffcbddfa0eab63d14230482044db13b360420acf7d574fcf5df062eb → 1433a1e0c584d1fb98aa157ced111922e81fde3b6d53e9ff74b0459a639d5d90 → 0ea9a4…ac7d`. Requiring the original bytes after a successful own edit would be impossible; any unrecognized intervening digest would instead have stopped the next edit.
- Baseline and final line references below are one-based source lines from `git show <pinned-commit>:<chapter> | nl -ba` and `nl -ba <chapter>`. The final chapter has 396 lines by that numbered reread. These references apply only to the stated hashes.

The evidence is independently checkable: a digest mismatch, a different cited passage at the pinned baseline, or a changed final passage overturns the corresponding byte/location claim and requires re-review. Last-editor identity was not used to attribute the defects.

## Sources and live owners inspected

| Source | Inspected scope and role |
| --- | --- |
| [AGENTS.md](../../../../AGENTS.md) and [generated startup router](../../../op/agent-startup-orientation.generated.md) | Complete startup reads; authority for primitive/effective layers, evidence independence, exact scope, normalized wake speed, and generated-write restrictions. |
| [Corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md) and [integrator reviewer](../../../office-of-research/cto/prompts/integrator-reviewer.md) | Complete live review owners; bounded issue identification, smallest repairs, complete final reread, and closure limits. |
| [Multiprompt coordination](../../../op/codex-multiprompt.md), [rewrite work queue](../work-queue.md), and [review status](../corpus-review-status.md) | Coordination owner and task-relevant queue/status passages, including CRW-005 dispatch instructions and priority 43; read-only routing, not scientific evidence. |
| [Operator explanation standard](../../../op/operator-explanation-standard.md), [goal-seeking procedure](../../../op/codex-goal-seeking-prompt-template.md), [theory orientation](../../../op/theory-orientation.md), and [skills policy](../../../op/skills/README.md) | Complete applicable procedure reads; report register, execution limits, and live-owner routing. |
| [Review skill](../../../../.agents/skills/architrino-review/SKILL.md) and [live skill owner](../../../op/skills/skill-architrino-review.md) | Complete reads; routed this work to assurance review with the operator's explicit direct-repair exception. |
| [Academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematics terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), and [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md) | Academic/mathematical guidance and relevant terminology passages: observer mass, acceleration-first primitives, wake speed, color, medium response, and claim levels. No canon edits. |
| [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md) | Complete read, including source selection and AI-assisted review disclosure expectations. |
| [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), and [Energy](../../../../content/markdown/aaa/dynamics/energy.md) | Relevant ontology, causal-root/self-hit, delayed acceleration, and effective-energy passages. They do not supply a retained nuclear solution. |
| [Nucleon Structure](../../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md) | Claim boundary at lines 3-30; envelope interface at 70-85; mass interface at 216-244; residual coupling at 504-512. These are interfaces/recovery obligations, not established nuclear binding. |
| [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md) | Especially lines 57-115 and relevant nonadditivity passages; zero-group-velocity transport mass does not by declaration become measured rest mass or an independently recovered energy map. |
| [Mesons](../../../../content/markdown/aaa/assemblies/mesons/mesons.md) | Introductory claim boundary and binding/stability obligations; proposed exchange interface, no physical retained-branch warrant. |
| [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), [Lorentz Kinematics](../../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), and [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md) | Relevant sea ontology, branch-speed conventions, and effective permittivity distinctions. |
| [Fermi-Dirac and Bose-Einstein Statistics](../../../../content/markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md) and [Angular Momentum and Spin](../../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) | Statistics interface, and same-record spinor-label pullback beginning at line 2035; dependencies remain inherited, not solved by a radial nuclear potential. |
| [ENSDF adopted polonium-212 levels](https://www.nndc.bnl.gov/ensnds/212/Po/adopted.pdf) | Page 1 text, evaluation August 2020, K. Auranen and E. A. McCutchan, Nuclear Data Sheets 168, 117. Evaluated lifetime and release energy only; not a barrier calculation or a precision alpha-spectrum reproduction. |
| [Filin et al., arXiv:2009.08911](https://arxiv.org/abs/2009.08911) | Title and abstract; explicitly uses nuclear potentials and one-/two-nucleon charge operators. Supports the state-versus-readout distinction, not a reproduction of its full calculation. |
| Validator and parser implementations | `scripts/validate-content.mjs` check/write branching and link handling; `scripts/validate-equation-mapping-links.mjs`; relevant parser/build/check code in `scripts/build-equation-mapping-corpus.mjs`; vendored bundle loader; `protectMath` in the math-preview renderer; relevant existing parser tests. The library functions were used read-only; no preview/export was generated. |

Scope qualifier: only the dispatched target was reviewed as a complete chapter. Nearby theory owners were inspected for the named interfaces, not exhaustively certified. Coordination or review-role documents are procedure/perspective, not independent mathematical evidence.

## Findings and smallest repairs

Severity measures risk of a reader drawing an incorrect accounting or physical inference: high changes the stated condition or strength of a scientific claim; medium corrects a consequential ambiguity, benchmark attribution, or readout distinction. No finding asserts that an actual EOM solver result failed.

### NB-01 — High: proposal and observer mass presented above their supported grade

- **Baseline:** lines 5, 27, 85-87, 115, 371. The organizing mechanism and meson role read as established; the nucleon mass entry identifies the proposed transport-mass interface without the independent observer-mass recovery required by its owner.
- **Demonstration and grade:** inferred discrepancy against the inspected Nucleon Structure, Mesons, and Particle Masses claim boundaries. Matching names does not derive a mass/energy map or a physical nuclear branch. A common factored speed additionally assumes matched observer calibration.
- **Smallest repair:** final lines 5, 27, 85-87, 115, 377 identify proposed mechanisms, primitive delayed acceleration, observer-comparison masses, and the separate calibration/retention obligations. No display equation changed.
- **Falsifier:** an operator can overturn the unsupported-grade finding by locating an accepted derivation in those live owners that independently recovers the stated mass/energy identification and retained nuclear branch. A candidate envelope, fit, or shared naming convention is insufficient.

### NB-02 — Medium: binding-curve reference and energy ordering conflated with absolute minima or routes

- **Baseline:** lines 9-19.
- **Demonstration and grade:** derived from the definition: energy per nucleon equals the composition-specific separated-nucleon reference minus $B/A$. Across different proton/neutron fractions, that reference changes. Consequently, maximizing $B/A$ is not identically minimizing absolute rest energy per nucleon. Lower endpoint energy also supplies neither an accessible route nor its rate.
- **Smallest repair:** final lines 9, 11, 19 retain the fusion/fission intuition but name the reference, actual product inventory, and separation between energetic permission and dynamics. Fission is not required to end at iron-group nuclei.
- **Falsifier:** compare actual nuclear masses and their separated-nucleon references across different compositions. A varying reference falsifies interpreting absolute rest energy per nucleon as an exact sign reversal of binding per nucleon plus one constant; an accidental coincidence of extrema would not establish that identity. A lower-energy endpoint without a reachable history falsifies any route inference from the curve alone.

### NB-03 — High: prompt reaction balances lacked sufficient initial-state and endpoint conventions

- **Baseline:** lines 29-50 and 64-81.
- **Demonstration and grade:** derived effective accounting issue, conditional on a conserved, complete observer energy account. For example, outgoing reaction energy includes incoming kinetic energy; masses of ground-state daughters omit excitation retained at a prompt cutoff. A medium entry and separately listed sea/recoil entries require disjoint assignments. This is a missing-convention finding, not a measured energy-conservation failure.
- **Smallest repair:** final lines 29, 50, 64, 81 state parent-at-rest/no-unlisted-input conditions, declared excited-state masses, a consistent nuclear-mass convention, the negligible-incoming-energy approximation for the displayed fusion balance, and the extension when it fails. External-receiver recoil is kinetic energy and cannot duplicate product motion. Residual interaction/history energy is assigned once.
- **Falsifier:** select a reaction with nonzero incoming kinetic energy or an excited daughter at the prompt cutoff and sum the specified accounts. Any unassigned or doubly assigned energy reopens this finding; a complete baseline convention covering that case would overturn the missing-convention diagnosis.

### NB-04 — High: the effective energy decomposition was not demonstrably complete or disjoint

- **Baseline:** lines 97-136 and 194.
- **Demonstration and grade:** inferred from the baseline definitions: residual exchange and sea-polarization/corridor formation can describe the same mediated contribution; relative motion and irreducible many-nucleon energy have no explicit assignment. No actual numerical double count was measured. Negative sea response is conditional on the comparison state, not automatic.
- **Smallest repair:** final lines 97, 115-122, 138, 196 identify a decomposition target, require a disjoint allocation and complete functional, preserve the asymmetry recovery target, and restrict the sign statements to the proposed attractive contributions. The proton-pair Coulomb term is zero when no proton pair exists.
- **Falsifier:** an explicit functional assigning every contribution exactly once, including relative motion, many-nucleon terms, and sea changes, would discharge the incompleteness obligation. Demonstrating that two listed terms integrate the same medium response would confirm an actual double count, which this review does not claim to have calculated.

### NB-05 — High: the prose binding criterion omitted the sign-indefinite shell contribution

- **Baseline:** lines 119 and 138-148.
- **Demonstration and grade:** derived algebra. Subtracting the displayed decomposition from the displayed separated-nucleon reference gives $B=-(E_{\mathrm{res}}+E_{\mathrm{Coul}}+E_{\mathrm{excl}}+E_{\mathrm{shell}}+E_{\mathrm{sea}})$. A rule comparing only attraction/sea with Coulomb/exclusion is not necessary or sufficient when the shell term is unrestricted.
- **Smallest repair:** final line 150 states the exact five-term subtraction and limits $B>0$ to the complete-separation threshold, not every fragmentation or weak-stability condition. Both original displays remain byte-identical.
- **Independent arithmetic witnesses:** use $c_f=1$ and arbitrary effective energy units, in the displayed five-term order. $(-4,1,1,5,-1)$ satisfies the old attraction-versus-cost comparison but gives $B=-2$; $(-1,1,1,-2,-1)$ does not satisfy its strict comparison but gives $B=2$. These are algebraic counterexamples, not nuclear parameters or a physical simulation.
- **Falsifier:** substitute these tuples into the two baseline displays. A different sum overturns the arithmetic; an additional restriction forcing the shell term to vanish would alter the old criterion's domain but is absent from the baseline.

### NB-06 — High: schematic hard-core behavior asserted a specific self-hit transition

- **Baseline:** lines 170-179.
- **Demonstration and grade:** inferred overclaim against the Master Equation's path-history causal-root obligation. A divergent radial idealization neither derives a finite compression threshold nor locates a constituent self-hit from envelope separation alone.
- **Smallest repair:** final lines 172-181 retain the exact hard-core display but identify it as an idealization. Finite compression and self-hit transition mechanisms remain proposals; self-hit is defined through reception of one's own earlier wake.
- **Falsifier:** supply constituent histories satisfying the Master Equation, their first self-hit root, and the independently recovered compression response. Such a calculation could establish the hypothesized transition and location; the schematic radial divergence cannot.

### NB-07 — High: sign-only radial structure was treated as sufficient nuclear binding

- **Baseline:** lines 156-166, 183-225, 236.
- **Demonstration and grade:** inferred logical insufficiency: attractive/repulsive signs do not fix their magnitudes, widths, relative-motion contributions, spin sector, many-body behavior, or a delayed solution. A Coulomb tail is not a short-range hadronic tail. Pion mass ordering is an effective range-comparison target, not a delayed-geometry derivation.
- **Smallest repair:** final lines 158-168, 192, 200-227, 238 define the effective radial/channel domain, restrict the monopole approximation, distinguish the long electric tail, and make the bound-energy inequality necessary for an already retained deuteron candidate. The radial potential is a central projection, not the full spin/history response.
- **Derived sign witness:** with $c_f=1$, an illustrative scalar contribution $-10+0.25Z(Z-1)/2$ is positive at $Z=10$ and $Z=11$ despite a negative attractive entry: $1.25$ and $3.75$ in arbitrary energy units. This is only an accounting counterexample to a sign-only inference; it is neither a nuclear model nor a stability spectrum.
- **Falsifier:** a complete declared response with actual magnitudes, spin channels, and retained histories can establish binding. Failure to bind with the stated sign pattern falsifies its sufficiency; a minimum of an assumed potential alone does not supply the missing delayed solution.

### NB-08 — Medium: the quadrupole benchmark overidentified a potential mechanism

- **Baseline:** line 253.
- **Demonstration and grade:** derived within the point-nucleon charge model, rotationally isotropic s-wave charge density has zero rank-two quadrupole. Inference from the measured composite-system moment to a unique noncentral potential term is stronger: the state and the electromagnetic response operator both matter. [Filin et al.'s abstract](https://arxiv.org/abs/2009.08911) explicitly includes potentials and one-/two-nucleon charge operators.
- **Smallest repair:** final lines 255 and 389 retain nonzero quadrupole response as a required benchmark, name tensor/orbital mixing as the familiar effective route, and reject models whose complete electromagnetic response is zero without treating the moment as a potential-only diagnosis.
- **Falsifier:** evaluate the complete charge-response expectation for the same proposed bound state. A nonzero moment from allowed composite/exchange operators with a specified central state would overturn a potential-only inference; zero complete response still fails the empirical benchmark. No such calculation was performed here.

### NB-09 — High: finite corridor count was promoted to saturation without uniform bounds

- **Baseline:** lines 259-274.
- **Demonstration and grade:** derived conditionally. If each of $A$ nucleons has at most $z_{\max}$ favorable neighbors and each attractive pair has magnitude at most $J_{\max}$, the pair attraction is bounded below by $-Az_{\max}J_{\max}/2$. A neighbor-count bound alone gives no uniform energy bound if pair magnitude or many-body/sea terms grow with $A$. A bounded energy per nucleon also does not itself prove a finite-density minimum.
- **Smallest repair:** final lines 263-278 state both uniform bounds, require control of other contributions, separate the density-minimum obligation, and distinguish strong-sector nuclear matter from unscreened charged bulk.
- **Falsifier:** exhibit unbounded attractive magnitude at bounded coordination, a superextensive omitted term, or an energy-per-nucleon curve without a finite-density minimum. Any of these defeats the proposed saturation implication; deriving all bounds and the minimum would discharge it.

### NB-10 — Medium: alpha charge balance and a local minimum were conflated

- **Baseline:** lines 278-285.
- **Demonstration and grade:** derived charge arithmetic gives two proton charges plus two neutral neutron monopoles, hence $+2e$, not electric neutrality. Equal counts and attractive channels do not derive a four-body minimum; the pro/anti and color analogy is a proposal, not independent stability evidence.
- **Smallest repair:** final lines 282-289 replace ambiguous charge balance with equal proton/neutron counts and explicit charge, and label the alpha-like configuration a candidate requiring its full response and fragment comparisons.
- **Falsifier:** the elementary sum $2(1)+2(0)=2$ checks the charge statement. A complete four-nucleon solution and perturbation/fragment analysis could establish the proposed minimum; a bookkeeping analogy cannot.

### NB-11 — High: arbitrary finite-window escape probability used in an attempt-rate formula

- **Baseline:** lines 289-301.
- **Demonstration and grade:** derived stochastic accounting, conditional on a declared sampling model, not primitive probabilistic physics. For equal conditional escape probability $p$ per opportunity, survival after $n$ opportunities is $(1-p)^n$; the corresponding effective rate is $-\nu\ln(1-p)$ and approximates $\nu p$ for rare escape. An arbitrary observation-window probability is a different quantity. An alpha partial rate does not give the total parent half-life when other removal channels exist.
- **Smallest repair:** final lines 295-307 preserve the exact display and specify per-opportunity probability, stationarity/correlation control, formation factor, rare-escape approximation, and partial/total distinction. Deterministic histories still need an ensemble measure and survival-law recovery.
- **Independent arithmetic witness:** at $c_f=1$, with effective rate $2$ per chosen time unit and window $0.5$, the finite-window probability is $1-\exp(-1)$. The hazard recovered as $-\ln(1-P)/0.5$ is $2$, whereas multiplying that window probability by a putative frequency $2$ gives approximately $1.26424$. These are controlled effective probability examples, not nuclear lifetime predictions.
- **Falsifier:** change the observation window while holding the physical population fixed. A rate inferred by the invalid direct product changes spuriously; the constant-hazard conversion does not. Nonstationary/correlated histories can invalidate the constant-rate approximation and must be tested separately.

### NB-12 — Medium: polonium benchmark lacked attribution and asserted unshown segmented-barrier accuracy

- **Baseline:** line 303.
- **Demonstration and grade:** measured source comparison, limited to [ENSDF page 1](https://www.nndc.bnl.gov/ensnds/212/Po/adopted.pdf): the evaluated half-life is $294.3(8)\,\mathrm{ns}$ and total alpha release energy is $8954.20(11)\,\mathrm{keV}$. Inferred arithmetic, using a nonrelativistic two-body mass-number approximation, partitions $Q=8.9542\,\mathrm{MeV}$ as $Q(208/212)=8.785252830188679\,\mathrm{MeV}$ for the alpha and $Q(4/212)=0.16894716981132077\,\mathrm{MeV}$ for daughter recoil. All new numerical examples use $c_f=1$. This supports a rounded energy scale, not a precision alpha-line extraction or an Architrino result.
- **Smallest repair:** final lines 309 and 387 cite the evaluated data, distinguish total release from alpha kinetic energy, and replace the asserted success of segmentation with a requirement for a controlled convergence calculation at fixed physics.
- **Falsifier:** inspect ENSDF page 1 for the quoted entries. A reproducible fixed-parameter barrier calculation with a declared formation factor, sampling rate, and mesh refinement could support a numerical accuracy claim; changing those inputs while segmenting would not isolate discretization accuracy. No barrier calculation was supplied or run.

### NB-13 — Medium: route record mixed inverse-time rate with half-life and route existence with population rate

- **Baseline:** lines 309-333.
- **Demonstration and grade:** derived dimensional distinction: rate has inverse-time units and half-life has time units. An energetically admissible route does not prove nonzero prepared-population weight. Several tuple entries were not defined locally, and sea-state change is not automatically sea energy.
- **Smallest repair:** final lines 317 and 339 define every tuple entry, retain $\lambda_{\mathrm{route}}$ as a rate, give its conditional half-life conversion, distinguish sea state from energy, and require both dynamical accessibility and a population measure.
- **Falsifier:** check dimensions and compute survival from an explicitly prepared ensemble. A reachable history of zero ensemble weight does not establish a measured rate; unexplained energy or duplicate heat/recoil entries reopen the event-account obligation.

### NB-14 — High: nuclear-only energy lowering was an incomplete beta-stability test

- **Baseline:** lines 337-344.
- **Demonstration and grade:** derived effective threshold accounting: a lower daughter nuclear energy need not cover emitted-lepton costs; electron capture has an incoming electron with an environment-dependent state. Constituent reaction shorthand is not a claim that each corresponding isolated free reaction is allowed. Energetic permission does not establish a nonzero weak-transition rate.
- **Smallest repair:** final lines 343-350 require complete initial/final energy comparisons, consistent electronic/atomic states, recoil and medium entries, and explicitly distinguish channel-specific energetic stability from all weak stability. The displayed beta inventory equation is unchanged.
- **Falsifier:** evaluate a specified parent/daughter channel with a nuclear energy reduction smaller than its required lepton cost, or with no available capture electron. A nuclear-only permission verdict then fails. A complete energy account plus a derived transition mechanism is needed to establish an actual rate.

## Mathematical preservation and validation record

The complete baseline chapter and final chapter were read as source, and the intervening repairs were inspected; the final full reread used `nl -ba` over lines 1-202 and 203-396. It checked every paragraph, all 17 display blocks, the seven retained falsification gates, and the added source notes. These are same-agent review observations, not an independent acceptance vote.

Before any target use of the session checker, a separate controls-only invocation passed. Its known case contained exactly four math expressions (two display), two links, protected inline/fenced-code decoys, a valid local path and a deliberately invalid child path, known trailing-whitespace lines, and one display with a known viewer ID and exact raw delimiter bytes. It also rejected an unknown KaTeX command and an unclosed delimiter. Known arithmetic checked $\log_2 8=3$ and a three-term sum of $6$. The pass was recorded in tool output and operator commentary before the target invocation. Controls were rerun after checker refinement; the final invocation also runs them before target reads.

| Instrument / command | Observed result and scope |
| --- | --- |
| `shasum -a 256 <chapter>` and the pinned-baseline hash command above | Baseline digest matched dispatch and pinned commit. Every chapter edit was predecessor-hash guarded; final digest is recorded above. |
| Controlled checker, baseline-only session run | Passed 69 math expressions, 17 displays, 28 local link occurrences, 18 checked fragments, and no trailing whitespace. This baseline run used the same controlled rendering/link logic before the repair series. |
| Controlled checker, repaired chapter | Passed 106 math expressions, including 17 displays; 33 local link occurrences, 2 external links, 18 checked fragments, and no trailing whitespace. All 17 raw display blocks and their exact viewer-link text match the pinned baseline; every baseline link is retained. Link preservation compares destinations, while display/viewer preservation compares exact extracted source bytes. |
| Controlled checker, final report | Passed 45 math expressions, no display equations, 31 local link occurrences, 4 external link occurrences, no local fragments, and no trailing whitespace. External URLs are counted by this checker, not fetched; the two distinct scientific source URLs were opened separately. |
| `node scripts/validate-equation-mapping-links.mjs` | Passed 23 promoted/curated equation links. This script's coverage is not all chapter equations; the controlled checker separately checked the chapter's 17 IDs and source paths against the retained registry. |
| `git diff --check -- content/markdown/aaa/nuclear-atomic/nuclear-binding.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-nuclear-binding-review-2026-09-12.md` | Exit 0, no whitespace diagnostics on the final scoped diff. Because the new report is untracked, it also received the separate report whitespace check below. |
| `git diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-nuclear-binding-review-2026-09-12.md` and controlled report whitespace check | The no-index comparison returned exit 1 with no output: the new report differs from the empty file, with no whitespace diagnostics. The independent controlled whitespace scan passed. This exit 1 is not presented as exit 0 or as a content failure; neither command stages the report. |
| `node scripts/build-equation-mapping-corpus.mjs --check` before edits | Passed: 199 corpus files, 4,685 display equations, 23 promoted equations, 30,436 symbol definitions, no diagnostics. This is a generated-registry baseline, not validation of the physics. |
| Same equation-registry command after chapter edits | Exit 1; sole reported diagnostic: `generated registry is stale: content/generated/equation-mapping/corpus-equations.json`. Counts were unchanged. Exact deferred command: `node scripts/build-equation-mapping-corpus.mjs --write`, then rerun `--check` in an authorized regeneration/publication workflow. The write command was not run. |
| `node scripts/validate-content.mjs --check --strict` after chapter edits | Latest observation: exit 0, 391 scene configs, 199 content Markdown files, 1,690 repository Markdown files; 0 errors, 0 warnings, 30 notes. Earlier passing runs audited 1,688 files before this report and 1,689 after its creation. One intervening run failed on two out-of-scope links, detailed below; its failure is not erased by the later pass. |
| Saved checker appendix, extracted and executed with Node | Exit 0. Before reading the report, the extractor passed an exact literal-dollar preservation case and rejected a missing fence. The saved appendix then passed its own controls, both-file math/link/whitespace checks, display preservation, and all arithmetic assertions. |
| Independent recoil-arithmetic check | Known control `8*3/4 === 6` passed before applying the mass-number partition to the source value. The values in NB-12 and $294.3\,\mathrm{ns}=0.2943\,\mu\mathrm{s}$ were reproduced. This is arithmetic at observer-comparison grade, not a measured spectrum or primitive derivation. |

The strict validator's broader notes include one ignored periodic-table JSON file, 16 approved single-panel comics, stable ID/label locks for 17 scene files, and 115 scenes with no incoming links (the displayed list is truncated by the validator itself). These diagnostics concern the live wider checkout, not this chapter's scientific validity. No unrelated scene or JSON file was changed or assigned causal responsibility. The strict validator's two index-path headings are output context, not errors. A green strict check does not override the separate stale-equation-registry result.

Concurrent-diagnostic chronology: an intervening strict run audited 1,690 Markdown files and exited 1 with two errors at `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-condensed-matter-review-2026-09-12.md:32`: the targets `../../../../content/markdown/aaa/foundations/time.md` and `../../../../content/markdown/aaa/foundations/void.md` resolved to missing paths. These errors were outside both authorized paths. A later read with `nl -ba` of that report's lines 29-34 showed those links changed to `absolute-time.md` and `euclidean-void.md`; this task did not edit that file. The next strict run returned the passing 1,690-file observation recorded above. The attribution is limited to observed file/diagnostic changes, not an author's identity or a wider-corpus correctness claim.

Generated-registry boundary: the pre-edit check passed and the post-edit check reports staleness while the chapter's display equations/IDs remain unchanged. The generator includes surrounding source context, so this chapter's prose repairs are sufficient to require a refresh. That does not attribute every byte of wider concurrent drift to this task. No generated bytes were manually edited or regenerated; the later authorized runner must rebuild from the then-current combined tree.

KaTeX validation used the existing vendored renderer with `throwOnError:true`, `strict:'error'`, and `trust:false`. It proves that extracted expressions parse under that renderer, not that the mathematics or scientific model is true. Local-link checks prove path existence and the explicitly handled equation/spin anchors at inspection time, not reader navigation in a browser. No solver tests, equilibrium analysis, spectra, population experiment, or physical branch search was run.

## Reproducible focused checker

Run from the repository root. The script has no filesystem writes. For an isolated known-case run, change its argument `final` to `controls`; it exits before reading the chapter or report. Keep the pinned baseline commit unchanged. The code fence itself is intentionally excluded by the Markdown/math parser. The report reread caught a string-substitution quoting defect in the first saved appendix; the in-session checker was unaffected. The appendix was corrected, and a separately controlled fence extractor is used to execute the saved copy, so the reproducibility claim is not based only on the working in-session string.

```bash
node --input-type=module - final <<'NODE'
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { protectMath } from './.agents/skills/architrino-math-preview/scripts/render-preview.mjs';
import { parseCorpusDisplayEquations } from './scripts/build-equation-mapping-corpus.mjs';
import { loadVendoredCommonJsBundle } from './scripts/load-vendored-commonjs-bundle.mjs';
const chapter = 'content/markdown/aaa/nuclear-atomic/nuclear-binding.md';
const report = 'reference/priorities/aaa-corpus-rewrite/evidence/crw-005-nuclear-binding-review-2026-09-12.md';
const baseRef = '66e0e47de3797be86855acf6318aaab6c503031c';
const assets = 'apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/';
const katex = loadVendoredCommonJsBundle(assets + 'katex/katex.min.js');
const md = loadVendoredCommonJsBundle(assets + 'markdown-it.min.js')({html:false});
function links(source) {
  const out = [];
  function walk(tokens) { for (const t of tokens) {
    if (t.type === 'link_open') out.push(t.attrGet('href'));
    if (t.type === 'image') out.push(t.attrGet('src'));
    if (t.children) walk(t.children);
  }}
  walk(md.parse(protectMath(source).markdown, {}));
  return out;
}
function whitespace(source) {
  return source.split('\n').flatMap((s,i) => /[ \t]+$/.test(s) ? [i+1] : []);
}
function render(source) {
  const segments = protectMath(source).segments;
  for (const s of segments) katex.renderToString(s.tex, {
    displayMode:s.display, throwOnError:true, strict:'error', trust:false
  });
  return {expressions:segments.length, displays:segments.filter(s=>s.display).length};
}
const tick=String.fromCharCode(96);
const known = '# Known\n\n$x+1$ and \\(y\\).\n\n$$\na=b\n$$\n\n\\[\nc=d\n\\]\n\n' +
  tick+'$ignored$'+tick+' and '+tick+'[ignored](missing)'+tick+'\n\n~~~tex\n$$ignored$$\n[ignored](missing)\n~~~\n\n' +
  '[yes](AGENTS.md) and [remote](https://example.org/)\n';
assert.deepEqual(render(known), {expressions:4, displays:2});
assert.throws(()=>render('$\\unknownNuclearReviewCommand$'));
assert.throws(()=>protectMath('$$unclosed'));
assert.deepEqual(links(known), ['AGENTS.md','https://example.org/']);
assert.equal(fs.existsSync('AGENTS.md'),true);
assert.equal(fs.existsSync('AGENTS.md/known-missing-child'),false);
assert.deepEqual(whitespace('clean\nbad \nlast\t\n'),[2,3]);
const displaysControl = '$$\na=b\n$$\n\n[View →](equation-mapping.html#control)\n\n' +
  tick+'$$ignored$$'+tick+'\n~~~tex\n$$ignored$$\n~~~\n';
const controlBlocks = parseCorpusDisplayEquations('known.md',displaysControl);
assert.equal(controlBlocks.length,1);
assert.equal(controlBlocks[0].tex,'a=b');
assert.equal(controlBlocks[0].existingLink.semanticId,'control');
assert.equal(displaysControl.slice(controlBlocks[0].openStart,controlBlocks[0].closeEnd),'$$\na=b\n$$');
assert.equal(Math.log2(8),3);
assert.equal([1,2,3].reduce((a,b)=>a+b,0),6);
console.log('CONTROLS PASS: four math expressions/two displays; invalid and unclosed math rejected; code excluded; two links; present/missing paths; whitespace; display/link/raw-byte parser; arithmetic.');
if (process.argv[2] === 'controls') process.exit(0);
const baseline = execFileSync('git',['show',baseRef+':'+chapter],{encoding:'utf8'});
const current = fs.readFileSync(chapter,'utf8');
const b = parseCorpusDisplayEquations(chapter,baseline);
const f = parseCorpusDisplayEquations(chapter,current);
assert.deepEqual(f.map(x=>current.slice(x.openStart,x.closeEnd)),b.map(x=>baseline.slice(x.openStart,x.closeEnd)));
assert.deepEqual(f.map(x=>x.existingLink?.text),b.map(x=>x.existingLink?.text));
assert.ok(f.every(x=>x.existingLink));
assert.equal(new Set(f.map(x=>x.existingLink.semanticId)).size,f.length);
for(const href of links(baseline)) assert.ok(links(current).includes(href),'lost original link: '+href);
console.log('PRESERVATION PASS:', f.length,'raw display blocks and linked IDs; every baseline link retained.');
const registry = JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8'));
for (const [p,s] of [[chapter,current],...(process.argv[2] === 'final' ? [[report,fs.readFileSync(report,'utf8')]] : [])]) {
  const hrefs = links(s);
  let local=0,external=0,fragments=0;
  for (const href of hrefs) {
    if (/^https?:/.test(href)) { external++; continue; }
    assert.ok(!href.startsWith('/'),'absolute local link: '+href);
    const [target,frag] = href.split('#');
    const resolved = path.resolve(path.dirname(p),decodeURIComponent(target.split('?')[0]));
    assert.ok(fs.existsSync(resolved),'missing local target: '+href);
    local++;
    if (frag) {
      fragments++;
      if (target.endsWith('equation-mapping.html')) {
        assert.ok(registry.records.some(x=>x.semanticId===frag&&x.source.sourcePath===chapter),'missing equation ID '+frag);
      } else {
        assert.equal(frag,'same-record-spinor-label-pullback','unhandled fragment requires manual check');
        assert.ok(fs.readFileSync(resolved,'utf8').includes('### Same-Record Spinor-Label Pullback'));
      }
    }
  }
  assert.deepEqual(whitespace(s),[],'trailing whitespace: '+p);
  console.log(JSON.stringify({path:p,...render(s),localLinks:local,externalLinks:external,checkedFragments:fragments,whitespace:'pass'}));
}
const cf=1;
const shellCases = [[-4,1,1,5,-1],[-1,1,1,-2,-1]];
console.log('ALGEBRA WITNESSES (c_f='+cf+'): B=-sum(terms):',shellCases.map(t=>-t.reduce((a,b)=>a+b,0)));
assert.equal(-shellCases[0].reduce((a,b)=>a+b,0),-2);
assert.equal(-shellCases[1].reduce((a,b)=>a+b,0),2);
assert.equal(2*1+2*0,2);
assert.equal(-10 + 0.25*10*9/2,1.25);
assert.equal(-10 + 0.25*11*10/2,3.75);
const lambda=2,window=0.5;
const finiteP=-Math.expm1(-lambda*window);
assert.ok(Math.abs(-Math.log1p(-finiteP)/window-lambda)<1e-14);
assert.ok(Math.abs(2*finiteP-lambda)>0.7);
console.log('ARITHMETIC PASS: shell witnesses -2,+2; alpha charge 2; pair counterexample 1.25,3.75; finite-window hazard 2 versus invalid frequency product',2*finiteP);
NODE
```

## Closure limits and remaining obligations

1. **Bounded assurance only:** the 14 findings are repaired in this one chapter. This does not certify an older pre-rewrite document, uninspected neighboring passages, all claims in current canon, or other campaign assignments.
2. **Physical construction remains open:** recover retained nucleon/meson/nuclear histories, their calibrated mass/energy map, a complete non-duplicating nuclear functional, and independently checkable deuteron/alpha solutions. Do not linearize about a configuration without first establishing its actual dynamical balance.
3. **Observer comparisons remain targets:** triplet/singlet separation, quadrupole response with a declared charge operator, saturation bounds and density minimum, mirror splittings, beta-family thresholds/rates, and alpha-emission ensembles/Geiger-Nuttall behavior require calculations. Neither fitted potentials nor a scalar sign example demonstrate these results.
4. **Probability and rates remain separate from routes:** a deterministic escape history is not a prepared-population measure, an exponential law, a nonzero branch rate, or a half-life.
5. **Generated refresh is deferred:** the exact check/write commands above belong to a subsequently authorized workflow. The registry diagnostic prevents an all-checks-green claim here; it does not authorize editing generated outputs.
6. **Coordinator handoff remains external to this scope:** this report supplies finding-level evidence. Only the designated coordinator may update shared status, priority 43, queues, or work logs. No downstream or campaign completion is asserted.

The next useful research step is a separately scoped, same-history deuteron benchmark with a declared complete energy account, spin sector, and electromagnetic readout. That recommendation is not an instruction to launch a new task, expand this review, or publish these edits.
