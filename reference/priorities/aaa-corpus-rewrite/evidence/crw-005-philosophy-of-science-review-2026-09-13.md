# CRW-005 Philosophy of Science Review — 2026-09-13

## Scope and disposition

Full 902-line baseline review of [Philosophy of Science](../../../../content/markdown/aaa/philosophy-history/philosophy-of-science.md), followed by chapter-local repairs and full diff inspection. The philosophical thesis, historical organization, school assessments and distinctions between ontology, effective description and epistemic access remain. The chapter now explicitly labels its school summaries as selective interpretations and its assessments as project commitments rather than consensus judgments or established substrate physics.

Scoped `git --no-optional-locks status` showed no pre-existing chapter change. Baseline SHA-256: `288aedf667acfdbb9465f706e2d53867de576e48921563bddb6a9f5ee8b2add9`. Final SHA-256: `6c1bc3e972f05802a190762ee6f209a71913d810b76f98266ad452a8e77ea5f1`.

## Findings and repairs

| ID | Severity | Disposition |
| :--- | :--- | :--- |
| PS-01 | Medium | Labeled philosophical assessments and the proposed error-correction-time hierarchy as interpretations/hypotheses. No historical duration ranking has been measured here. Both occurrences of the narrative-durability comparison now carry that qualification. |
| PS-02 | Medium | Corrected verificationism’s conflation with direct observation. Carnap explicitly replaces definitive verification with confirmation, distinguishes confirmability from available testing and acknowledges internal differences. The chapter’s realist critique remains, with its target narrowed accordingly. |
| PS-03 | Medium | Qualified the parameter-status compression claim: relabeling adjustable freedom as a branch output does not reduce independent assumptions. Also removed novelty alone as an absolute ranking of evidential strength. |
| PS-04 | Medium | Qualified the historical rollback charge row as the proposed observer calibration conditional on the charge-reconstruction map, rather than an established physical charge derivation. |
| PS-05 | High | Corrected identical-measure requirement. Distinct projections/conditioning can induce distinct consistent measures from one preparation record. The defect is incompatible or unexplained retuning, not every difference in measure. |
| PS-06 | High | Defined residual-based maturity as operational status relative to a finite nonempty declared test family, with positive unit-compatible tolerances. Missing required residuals remain unevaluated. A finite test pass does not establish general maturity or test completeness. |
| PS-07 | High | Bounded the ontology-leverage derivative guard to regular differentiable first-order charts. Discrete and stationary nonlinear cases require finite contrasts. Nonzero sensitivity does not prove identifiability, and necessity within one representation is not necessity across all equivalent representations. |
| PS-08 | High | Corrected automatic constrained-flow inference. Set restriction is a conditional specification requiring invariant compatible histories, the history-shift/endpoint generator, and local existence/continuation assumptions. It does not construct a global flow. |
| PS-09 | High | Qualified basin weights: independently justified normalized measure, measurable finite/countable basins, disjointness and coverage for an exhaustive outcome distribution. Unresolved histories retain probability; zero-measure conditioning needs an induced measure. |
| PS-10 | Medium | Added Bayes-odds denominator/marginal-likelihood domains and distinguished Bayes’ identity from independent held-out confirmation. A packet is rejected only under its declared uncertainty, numerical-validity and acceptance checks, not by any nonzero discrepancy. |
| PS-11 | Medium | Classified the max-normalized observational residual as a rectangular tolerance criterion rather than automatically a joint confidence/significance statement. Prediction error, correlations and selection still need a statistical model. |
| PS-12 | Medium | Qualified far-future lifetimes as conditional extrapolations with primary support. A lifetime/age ratio alone supplies no observer distribution and no independent test of age-clock inference. The sampling critique remains conditional on an actual typicality claim. |

Disposition: twelve findings repaired at chapter scope, five High and seven Medium. All sixteen display equations were preserved exactly; added domain statements bound their legitimate interpretation rather than silently changing their identities.

## Independent references and reasoning

### Historical and observer-level sources

- [Carnap, Testability and Meaning (1936)](https://www.phil.cmu.edu/projects/carnap/editorial/latex_pdf/1936-10a.pdf), §§1–3, printed pp. 420–425; retrieved PDF lines 42–54 and 71–100 directly support confirmation versus conclusive verification, confirmability versus available testability, and differences within the Circle. This primary text supports PS-02 without treating the entire tradition as one direct-observation doctrine.
- [Bacon, Novum Organum, Book I](https://www.gutenberg.org/files/45988/45988-h/45988-h.htm), aphorism XIV, retrieved line 91, supports the retained interpretation about confused primitive notions undermining later deduction. The chapter now links this passage. It is historical orientation, not a physical theorem.
- [Adams and Laughlin, A Dying Universe (1997)](https://arxiv.org/pdf/astro-ph/9701131), §I, PDF p. 4, retrieved lines 117–123, explicitly states extrapolation assumptions and possible revision. §III.C.1, PDF p. 15, lines 664–667, gives a low-mass stellar lifetime of order tens of trillions of years; the abstract and §IV cover conditional remnant and evaporation scenarios. These support the scale comparison, not a measured lifetime or an observer-selection distribution.
- The chapter’s existing [Bayesian Epistemology](https://plato.stanford.edu/entries/epistemology-bayesian/) link was opened for context. The odds identity was checked independently by dividing the two conditional-probability identities, rather than treating this secondary exposition as the mathematical oracle.

### Analytic checks independent of the chapter

1. **Constraint invariance:** for scalar `X'=1` and `K={0}`, initial `X(0)=0` gives `X(T)=T`, outside `K` for positive time. Thus merely appending membership to a dynamical equation does not create a constrained solution. For smooth instantaneous constraints, differentiating the constraint along the solution gives the necessary tangency condition; explicit context variation adds its own derivative. This counterexample is an abstract mathematical comparison, not architrino dynamics.
2. **Measures:** if `U` is uniform on `[0,1]` and `Z=U²`, then `P(Z≤z)=sqrt(z)` on that interval. Different distributions are consistent pushforwards of one preparation measure. If two listed basins both equal the full domain, both weights equal one and their sum is two; if disjoint basins omit positive measure, their sum is below one. These explain the repaired qualifications without assuming physical basin formation.
3. **Sensitivity:** `f(o)=o²` has derivative zero at zero but changes under any nonzero finite displacement. Conversely `f(o,n)=o+n` has nonzero derivative in `o` but cannot identify it separately from nuisance `n` using that output alone. Discrete ontological choices need finite comparisons, and derivative existence cannot be presumed.
4. **Finite tests:** choosing identically zero residual functions makes every candidate pass any positive tolerance, independently of truth or identifiability. Thus the retained maturity equivalence can define only declared test status. A residual within a nonzero declared tolerance is also a counterexample to rejecting every nonzero discrepancy.
5. **Bayes:** division of `P(Q|D,C)=P(D|Q,C)P(Q|C)/P(D|C)` for two hypotheses yields the retained odds display whenever the denominators are defined and nonzero. Equal positive likelihoods give factor one. Whether data were withheld is an independence condition for this review’s evidential use, not a premise of the algebraic identity.
6. **Temporal inference:** a duration ratio contains no probability measure over observation epochs. The same ratio is compatible with a uniform-time model or a distribution concentrated on an earlier habitable interval; their typicality verdicts differ. No age contradiction follows from the ratio alone.

These are direct derivations/counterexamples rather than a runtime swept over its own controls. No new physical numerical example instantiates a wake speed other than the mandated normalized convention; no wake-speed numerical calculation was needed.

## Live owner consistency

[Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), compatible-history local theorem discussion around lines 2480–2565, retains endpoint compatibility, additional extension/control assumptions and unverified local/global continuation burdens. The context passage now points there rather than implying those results from an algebraic restriction.

[Parameter Ledger](../../../../content/markdown/aaa/validation/parameter-ledger.md), lines 234 and 395–405, distinguishes the six-site charge calibration from a dynamical charge derivation. [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), lines 149–164 and 263, likewise distinguishes the convention and preserved primitive inventory from the observer charge/reaction map. [Failure Criteria](../../../../content/markdown/aaa/validation/failure-criteria.md) supplies the operational null-result and same-record rejection scope, rather than a license to equate any fitted residual pass with ontological establishment. Observer-level probability remains an inference over records, not a substrate substance.

## Validation and preservation

The custom in-memory marked link extractor first passed a known link plus fenced-code exclusion case. The math extractor first passed a two-span inline/display case excluding inline code, and KaTeX rejected a deliberately invalid command. Only then were the target checks run. The chapter contains 169 final TeX spans and passed strict KaTeX (`throwOnError: true`, `strict: 'error'`). All sixteen display bodies, all headings and every original link remain unchanged relative to `git show HEAD:<chapter>`. There are 51 final links: 47 local targets resolve by path existence and four external references were opened. Viewer equation anchors are preserved exactly; path existence does not independently validate every destination anchor.

`git diff --check HEAD -- content/markdown/aaa/philosophy-history/philosophy-of-science.md` passed. `node scripts/validate-content.mjs --check --strict` passed after final prose clarification with zero errors/warnings (199 corpus Markdown, 1752 repository Markdown before creation of this receipt). The final two small clarifications changed no TeX or links. The receipt’s link paths, whitespace and embedded chapter hash were checked separately.

No runtime test or generator write was needed. The checks establish scoped syntax, path existence, preservation and the stated mathematical boundaries; they do not establish philosophical consensus, full linked-owner correctness or theory closure.

## Remaining obligations

- PS-O1: Actual constrained delayed flows, invariant domains, basin measures and effective recovery maps remain with their technical owners. An independently proved compatible-history construction would supersede the corresponding conditional status.
- PS-O2: Any operational maturity or ontology comparison must instantiate the declared independent residuals, tolerances, uncertainty model and identifiability tests. No implementation or acceptance record was created here.
- PS-O3: Quantitative historical correction-time or crisis diagnoses require named cases, sampling windows and measurement rules. The chapter’s methodological proposal alone supplies no such measured ranking.

No neighboring chapter, runtime, fixture, generated artifact, shared record or Git index was written. Coordinator integration is separate from this completed bounded review.
