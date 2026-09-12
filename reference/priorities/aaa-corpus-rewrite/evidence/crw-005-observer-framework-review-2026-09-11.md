# CRW-005 — Independent Observer Framework review

Date: 2026-09-11. Mode: independent, whole-chapter, report only. Reviewed in the existing shared checkout; no linked worktree, other reviewer consultation, corpus edit, tracker update, generator write, or Git publication.

## Outcome

The chapter's central separation of complete substrate state from assembly-built observer records is consistent with the inspected canon. Its clock, metric, quantum, and Lorentz comparisons are generally kept at the appropriate effective or recovery-target level. The formal middle sections need correction before their quotient, covariance, boundary, or reconstruction expressions can support scientific conclusions.

This report records twelve findings: five demonstrated mathematical/specification/terminology defects (D1–D5), five open definition or proof obligations (O1–O5), and two source-support/editorial findings (E1–E2). These categories distinguish an actual counterexample to a stated construction from a theorem that has not been supplied. They do not assert that the underlying theory is false or that an implementation produced incorrect physical results. High severity means a downstream inference or counting operation is not justified as written; moderate means a definition, diagnostic, or explanation needs a bounded repair; low means a localized terminology defect.

The most consequential repairs are a genuine equivalence relation for the boundary-history quotient, cross-covariance handling, and the current canon's explicit well-posedness qualification. The review does not authorize implementing them.

## Sources, provenance, and independence

All chapter line references below refer to the following measured snapshot, not to generated HTML or the historical source. `shasum -a 256` and `wc -l` on the two live files returned:

| Source | SHA-256 | Lines |
| --- | --- | ---: |
| [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md) | `1fc9ee9ebf4ec9bb4344e1141f5a32fd578347b31eef39b99030b4e5991b5c21` | 475 |
| [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md) | `ce5cbbcd3860dd8092d101a4354b27c71ceeb38f7187a9fe44c3e6712950d2d9` | 1271 |
| Observer Framework at `897fe1aa7`, obtained with `git show` | `0f83bb98095251f655f3f04f3a6552124704cf0d55054267607a0de537ed85eb` | 456 |

Both live chapters and the complete historical Observer Framework were read. The Noether Sea digest matches the operator-supplied digest exactly. `git diff 897fe1aa7 -- content/markdown/aaa/spacetime/observer-framework.md` showed nineteen added blank lines; `git diff --ignore-blank-lines --exit-code 897fe1aa7 -- content/markdown/aaa/spacetime/observer-framework.md` returned no diff and exit 0. Consequently, these findings also apply to the pre-campaign chapter's unchanged substantive text. This comparison does not assign authorship or a causal history to any defect. Initial `git rev-parse HEAD` returned `8f07f380f832dc9d1bb332382097fbc40731b8c6`; the content digests, rather than a possibly advancing shared-checkout HEAD, identify the reviewed evidence.

The startup and review authorities were read: local `AGENTS.md`, generated startup router, architrino-review skill and live owner, current corpus-reviewer procedure, theory orientation, repository skills policy, execution and operator-explanation procedures, academic and mathematical style guides, mathematical terminology, terminology usage, comparative glossary, source/attribution policy, and the geometry/dynamics review lens. Only the report-only workflow was exercised. Independent derivations below are the evidence; reviewer identity or count is not evidence of mathematical independence.

Nearby canon checked in addition to the complete Noether Sea chapter: the relevant substrate, state-projection, and clock passages in Foundations' Ontology, Architrino, Euclidean Void, Absolute Time, Absolute Timespace, Detecting the Absolute Frame, and Constructing the Absolute Frame; the Master Equation's primitive law, root Jacobian, and well-posedness/continuation boundaries; Emergent Metric's observer map; Proper Time and Time Dilation's opening clock-map definitions; Lorentz Kinematics' coordinate-layer and recovery-target definitions; PPN Parameters' preferred-frame map; Failure Criteria's common admissible-state set; and the opening ontology/record sections of Wavefunction Ontology and Measurement Ontology. These were targeted canon checks, not whole-file reviews of every linked chapter. No other review report or reviewer conclusion was used.

## Findings at a glance

| ID | Severity | Chapter lines | Classification | Smallest repair |
| --- | --- | --- | --- | --- |
| D1 | High | 222–235 | Demonstrated quotient defect under the stated tolerance reading | Define a record partition and quotient a space of alternative histories, or use a covering/packing construction without quotient notation. |
| D2 | High | 292–305; 326 | Demonstrated missing hypothesis/cross terms | Include cross-covariances or state and justify pairwise uncorrelated residuals under one law. |
| D3 | Moderate | 131–147; 166 | Demonstrated boundary-set misclassification | Add the incoming orientation condition and a separate tangency convention. |
| D4 | Moderate | 241–248 | Demonstrated undefined subtraction | Define a linear representation of boundary histories before subtracting them. |
| D5 | Low | 399 | Demonstrated canon terminology mismatch | Replace “PPN group velocity coefficients” with “PPN preferred-frame parameters.” |
| O1 | High | 16–25; 119; 182 | Open existence/uniqueness obligation, overstated in prose | Qualify deterministic continuation by admissibility and well-posedness. |
| O2 | Moderate | 251–275; 328–339 | Open measure/factorization specification | Specify the sample space, positive probability law, conditioning, observable map, and second moments. |
| O3 | Moderate | 378–401 | Open scale-recovery and diagnostic specification | Limit scale claims to measured coverage; declare ruler terms, norms, weights, and independent metric comparison. |
| O4 | Moderate | 401–411 | Open reconstruction-domain specification | Require a nonempty candidate family and define the geometry distance and uniqueness scope. |
| O5 | Moderate | 413–427 | Open conditional-distribution comparison | Fix setting aggregation and benchmark hypotheses before using a scalar process mismatch. |
| E1 | Moderate | 53–57; 378; 401; 413 | Missing support for named external comparison frameworks | Identify only the load-bearing primary results and their hypotheses. |
| E2 | Moderate | 3–16; 53–57; 131–339; 399; 455–471 | Reader flow and unexplained notation | Put the basic observer example before advanced diagnostics; define imported terms and remove internal ownership prose. |

### D1 — Tolerance agreement is not an equivalence relation

At lines 223–231 a quotient is formed, and line 235 defines its relation by matching clock, ruler, and detector records within a tolerance. Pairwise closeness does not generally define equivalence classes. For one real readout, tolerance 1, and three possible histories with readouts 0, 0.75, and 1.5, the first two agree within tolerance, as do the last two, but the first and last do not. Thus transitivity fails. This is a derived counterexample to the literal pairwise-tolerance interpretation, not a claim that no sensible operational equivalence can be defined.

There is a second typing point: the numerator shown is a retained boundary ledger for one candidate, whereas the prose requires a space of alternative admissible histories. Quotienting entries in one ledger and quotienting alternative histories that produce the same record are different constructions. The chapter needs to name the latter domain explicitly.

Smallest repair: declare a record map $R$ and a deterministic precision/quantization map $q$, and define $b_1\sim b_2$ exactly when $q(R(b_1))=q(R(b_2))$. Alternatively retain a tolerance neighborhood or specify covering/packing numbers without calling them a quotient. Taking a transitive closure of pairwise closeness is not automatically a satisfactory repair: arbitrarily long chains can merge widely separated records. If later entropy counting needs finitely many labels, specify a finite retained record alphabet and record length; a finite time window alone does not prove finiteness.

Grade: derived mathematical defect; measured location by the displayed quotient and its definition at lines 223–235. Falsifier: an explicit partition/record map already governing this relation, with the three-history example assigned consistently and the domain of alternative histories specified. Merely renaming closeness as equivalence does not falsify the finding. The tolerance neighborhood at lines 191–203 is not defective for this reason: it is a set centered on a record and need not be an equivalence class.

### D2 — Separate calibration does not remove cross-covariances

Lines 293–301 add boundary-wake, detector, and environment covariance matrices. Line 292 offers separately calibrated residuals, but does not require them to be uncorrelated. Let the centered channel residual be $y_A=b_A+d_A+e_A$, and define $C^{bd}_{AB}(t,t')=\mathbb E[b_A(t)d_B(t')]$, with analogous terms. Direct expansion gives

$$
\operatorname{Cov}(y_A(t),y_B(t'))
=N^{\mathrm{bw}}_{AB}+N^{\mathrm{det}}_{AB}+N^{\mathrm{env}}_{AB}
+C^{bd}_{AB}+C^{db}_{AB}+C^{be}_{AB}+C^{eb}_{AB}+C^{de}_{AB}+C^{ed}_{AB}.
$$

Every term on the right has arguments $(t,t')$ under the same conditional law. In the scalar two-state example $Z=\pm1$ with equal epistemic weights, let $b=d=Z$ and $e=0$. Each component has measured variance 1 in this declared toy measure, while $\operatorname{Var}(b+d)=4$, not 2. With $d=-b$, the total variance is 0 while the diagonal-only sum remains 2. Neither example introduces primitive randomness: the measure can represent ignorance between two deterministic histories. Separate calibration can determine each marginal without determining these cross terms.

Smallest repair: retain the cross kernels, or make pairwise uncorrelatedness under the same conditional law an explicit, independently checked approximation with an error bound. Orthogonal residualization is another possible construction, but its component meanings and order must be declared. Avoid counting an environment degree of freedom twice as both boundary uncertainty and an independent environment residual.

Current-canon check: [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), lines 20–37, explicitly retains cross-shell covariances and names assumptions needed to bound them. This is a consistency comparison, not the independent proof; the algebra above is the proof. The “same covariance decomposition” at lines 305 and 326 should mean one joint model with appropriate channel projections, not identical numerical covariance for different instruments.

Grade: derived counterexample to an unconditional covariance identity. Falsifier: the chapter supplies either the omitted cross terms or a justified zero-cross-covariance condition for the declared decomposition. No actual apparatus covariance has been estimated in this review.

### D3 — The displayed “incoming” boundary set also admits outgoing crossings

Take a fixed unit ball $\Omega$, an emission at $(-2,0,0)$ at $T_t=0$, and normalized wake speed $c_f=1$. Along the positive first-coordinate ray, the boundary events $(-1,0,0)$ at $T_{\mathrm{cross}}=1$ and $(1,0,0)$ at $T_{\mathrm{cross}}=3$ both satisfy every condition in lines 132–147 when the observation time is at least 3. The first is incoming and the second outgoing. Their outward-normal dot products with the propagation direction are respectively $-1$ and $+1$.

For a smooth fixed boundary, an incoming condition is

$$
\hat{\mathbf r}_{\mathrm{cross}}\cdot\mathbf n_{\mathrm{out}}(\mathbf X_{\mathrm{cross}})<0.
$$

Tangencies need a separate rule; a moving boundary would require relative normal velocity and a defined spacetime boundary. Nonconvex domains can have several entries and exits, so line 166 should preserve the appropriate entry events and their branch/ray provenance rather than equate every geometric crossing with an incoming event.

Grade: derived set-membership counterexample and measured inconsistency with the incoming label. Smallest repair: add orientation and explicitly state whether $\Omega$ is a fixed spatial region across the retained interval. Falsifier: a specified convention in this definition that excludes the outgoing unit-ball event. The unspecified $F_\Omega$ could filter redundant entries; this review does not claim an implemented acceleration sum double-counts them. Completeness for material trajectories entering the region, internal emissions that leave and later re-enter, and other open-system transfers remains a separate modeling obligation, not a demonstrated defect in an implemented solver.

### D4 — A set-valued history cannot yet be subtracted from an estimate

Lines 242–248 define $\delta\mathcal B$ using subtraction. The only concrete preceding definition of $\mathcal B$ is a set of event tuples containing identities, polarities, branch records, and continuous coordinates. No vector-space representation, matching of events, or signed-measure representation is specified. Ordinary set difference would not be a centered linear residual and would not have the intended covariance meaning.

Smallest repair: introduce a declared feature map $b$ from histories to a linear space and write $\delta b=b(\mathcal B)-b(\widehat{\mathcal B})$, or define histories as suitable measures and the residual as a signed measure. If this residual is not subsequently used, omit it and define covariance directly from real readouts; the latter already supports the positive-semidefinite argument.

Grade: measured type/specification defect at lines 132–147 and 242–248, not a numerical falsification. Falsifier: an explicit common linear representation and subtraction operation in the chapter or a directly identified governing definition.

### D5 — The PPN parameters are mislabeled as group-velocity coefficients

Line 399 calls $\alpha_1,\alpha_2,\alpha_3$ “PPN group velocity coefficients.” The linked [PPN Parameters](../../../../content/markdown/aaa/spacetime/ppn-parameters.md), lines 297–318, identifies them through preferred-frame metric coefficients. A group velocity is a different effective quantity, not the name of these PPN parameters.

Grade: measured terminology mismatch between those exact passages. Smallest repair: “PPN preferred-frame parameters,” with PPN expanded as parametrized post-Newtonian at first use. Falsifier: an explicit distinct definition of the chapter's $\alpha_i$ as group-velocity coefficients, together with a justified translation to the linked PPN variables. That alternative would require more work than the localized wording repair. This finding does not validate the linked chapter's complete metric derivation or any numerical experimental bound.

### O1 — Complete data and a deterministic intention do not prove unique continuation

Lines 16–25, 119, and especially 182 present complete state/history as supplying deterministic continuation without carrying the governing well-posedness qualification. [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), line 45, explicitly conditions deterministic motion on a well-posed delayed initial-history problem. [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), line 21 and lines 797–817, 865–867, keeps existence, uniqueness, finite-width assumptions, singular-chart continuation, and zero-width/infinite-system limits distinct.

As an independent logical check, consider the mathematical initial-value problem $dx/dT=2\sqrt{|x|}$ with the same complete past $x(T)=0$ for $T\le0$. For every $a\ge0$, the function that stays zero through $a$ and equals $(T-a)^2$ afterward satisfies that equation, including at the join. Complete past data do not by themselves give uniqueness. This generic ODE is not imported as an architrino law and is not a counterexample to the Master Equation; it isolates the missing logical premise.

Smallest repair: “On an admissible history domain where the evolution problem is well posed, the complete state supplies the inputs for a unique continuation.” Preserve the intended distinction between missing observer information and substrate randomness, but do not turn it into an unqualified global theorem. Line 164 correctly rejects a finite simple-root weight at a fold; retaining multiplicity and higher derivatives is necessary information, not by itself a proof of finite or unique continuation. The revised Noether Sea's lines 20–37 give conditional mean-square convergence at a fixed receiver, not a global pathwise evolution theorem.

Grade: measured canon mismatch plus an open theory obligation; no demonstrated nonuniqueness of the actual substrate law. Falsifier: a theorem covering the precise complete-state domain and limits invoked by this chapter, or prose explicitly restricting the continuation claim to the established conditional domain.

### O2 — Specify the probability space and the information retained by the observable

Line 265 declares $\mu_{\Omega,\theta}$ on complete states, but lines 268–275 integrate over $\mathcal B$ and lines 329–335 use a boundary-history preimage. This can be repaired naturally, but the pushforward and observable factorization are not explicit. Let $S$ be the complete-state sample space, $p:S\to\mathscr B$ its boundary-history projection, and $\nu=p_*\mu$. A readout can be written as $\widetilde Y(p(s),\theta)$ only if its remaining dependence is fixed by $\theta$ or constant on the relevant fibers of $p$.

Independent counterexample to automatic factorization: take two complete states $(b,d)=(0,-1)$ and $(0,1)$ with the same retained boundary feature and unresolved detector state, and let the detector readout be $Y=d$. There is no single-valued function of $b=0$ alone that supplies both readouts. This is precisely the fiber condition explained in [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), lines 93–103. It does not establish that any particular apparatus in this chapter violates the condition; the apparatus map has not been supplied.

Smallest repair: either integrate $Y(s)$ over complete states, or explicitly define the boundary pushforward and the additional fixed apparatus/internal data that make $Y$ descend. Specify a positive normalized probability measure and real square-integrable readout channels for the stated covariance. For complex channels the Hermitian covariance requires conjugation. State what data are conditioned on: if the identical exact readout is already fixed in $\theta$, its conditional variance is zero; a forecast, finite-tolerance record, or unresolved readout needs its own declared role.

Lines 305, 326, and 339 should require consistency with one joint state-and-apparatus law where claimed, while permitting different channel pushforwards and legitimate conditional distributions. They should not forbid a physically derived change of observation kernel. Grade: open definition/closure obligation supported by a derived fiber counterexample. Falsifier: an explicit probability space, conditioning rule, factorization or full-state integral, and finite second moments for the claimed channels.

### O3 — Causal order plus finitely sampled clocks does not fix all local scale

Lines 378 and 399 say clocks supply the missing local scale. That is a sound recovery objective but requires coverage. In an effective Lorentzian comparison, let $g_2=e^{2\sigma}g_1$ for smooth real $\sigma$. For every tangent vector $v$, $g_2(v,v)=e^{2\sigma}g_1(v,v)$, so causal signs and time-oriented causal curves are unchanged. Choose $\sigma=0$ in neighborhoods of the sampled clock and ruler paths but nonzero in an unsampled open region. The sampled proper-time integrands also agree, while local metric scale elsewhere differs. This construction concerns observer-level comparison geometry only; it is not a primitive spacetime premise. It applies when the admissible family permits such an unsampled region; the chapter has not supplied a restriction excluding it.

The residual at lines 381–395 has order, clock, and preferred-frame terms. Line 401 calls its tests “clock/ruler diagnostics,” but there is no separately specified ruler term or explicit statement that a joint ruler test is contained in the clock norm. Also undefined are the record-to-domain registration, the norm on $W$, units/normalizations and signs of the weights, and the independent provenance of the target metric. Extracting both sides from the same untested effective map can test agreement of definitions rather than recovery.

Smallest repair: restrict the scale statement to the sampled/controlled domain and state the additional metric-family and interpolation assumptions. Define a nonnegative normalized residual, include or explicitly identify ruler data, and fix one observer-coordinate correspondence and independently constrained comparison target. Preferred-frame parameters constrain their declared weak-field sector, not arbitrary unsampled conformal freedom.

Grade: derived limitation of the inference plus an open diagnostic specification, not a counterexample to a completed recovery theorem. Falsifier: measurement coverage and an admissible-metric theorem that exclude the displayed conformal freedom on the domain of the asserted conclusion. No causal-reconstruction theorem was assumed in deriving this counterexample.

### O4 — Small candidate-family diameter is conditional, not an unconditional uniqueness certificate

The supremum at lines 402–407 is a useful definition once the candidate family and distance are defined. If $\mathcal G_{\ell,\varepsilon}$ is empty, there is no compatible metric, and the supremum over pairs is undefined as an ordinary real number (or convention-dependent in an extended ordered space). It cannot certify recovery. If the family is a singleton by construction, its diameter is zero regardless of whether the candidate family was rich enough to include competing explanations.

For nonempty $\mathcal G$ and a defined pseudometric $d$, $\operatorname{diam}(\mathcal G)\le\delta$ means precisely that all retained candidates are within $\delta$ of one another in that pseudometric. It does not prove uniqueness beyond that family or continuous dependence on noisy inputs. Conversely, coordinate-related descriptions can be artificially far apart if $d_{\mathrm{geom},\ell}$ compares coordinate components without a common observer registration or quotient by the relevant gauge equivalence.

Smallest repair: require nonemptiness; specify candidate membership, gauge/registration, coarse-graining operator and distance; say “within the declared candidate family and metric at this resolution.” Reserve stability for a separate perturbation bound. Grade: derived domain/interpretation limitations and open specification. Falsifier: these conditions and bounds are supplied. The ambiguity indicator at lines 208–216 also needs a nonempty admissible set before its zero value can support any positive compatibility claim, but line 220 only uses the valid one-way implication from value 1; this review does not invent an erroneous converse there.

### O5 — Fix settings and causal hypotheses before using a process-table scalar

Lines 414–423 compare conditional distributions indexed by settings $\mathbf s$, while naming the result a scalar function of $\theta$. Total variation is defined between probability measures on a common outcome space. The chapter must choose a per-setting value, a supremum over settings, or a declared setting distribution $w(\mathbf s)$ and compare the resulting joint laws. These are not interchangeable. For two settings, two tables can agree exactly at the first and have disjoint deterministic outputs at the second: the per-setting distances are 0 and 1; a weighted average depends on the declared setting frequencies.

A substantive external benchmark also has hypotheses. The primary [Oreshkov–Costa–Brukner paper, Results: Causal inequality, equations (1)–(2)](https://arxiv.org/html/1105.4464v3) imposes causal structure, free independent fair settings, and closed single-input/single-output laboratories. Its communication-game bound is $p_{\mathrm{succ}}\le3/4$: in each definite order one direction can succeed at most surely and the forbidden direction only with probability $1/2$, and mixtures preserve the bound. The paper's process example attains $(2+\sqrt2)/4$. With the same setting law, the success-event probability difference gives a total-variation lower bound $(\sqrt2-1)/4\approx0.103553$ against a model satisfying those assumptions. This is a conditional mathematical comparison, not experimental evidence against absolute time or a demand to realize every formal process matrix. Allowing boundary communication that violates laboratory closure changes the benchmark.

Smallest repair: declare the selected benchmark, outcome/setting spaces, aggregation, laboratory isolation, setting assumptions and any postselection. If no benchmark is selected, keep this explicitly as an optional schematic comparison. Grade: derived definition limitation plus externally checked conditional benchmark, not a finding that the theory fails a performed experiment. Falsifier: a fully specified comparison that yields an unambiguous scalar while preserving the selected benchmark's hypotheses.

### E1 — External comparison claims need identifiable, scoped support

The explicit mention of external causal-order reconstruction theorems at line 378 is not attached to a theorem statement, hypotheses, or primary reference. “Causal-set comparison” at line 401 does not itself identify a discrete-to-continuum result; the displayed diameter is an ordinary inverse-problem diagnostic. Process-matrix language at line 413 likewise needs the specific external benchmark selected in O5. Lines 53–57 compress black-hole entropy, de Sitter thermodynamics, boundary descriptions, and quantum-gravity state language into a comparison inventory without explaining which particular result is intended.

The corpus's [source and attribution policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) calls for selective, load-bearing sources, not a bibliography for every definition. Smallest repair: cite and state hypotheses only for the causal-reconstruction result actually used and the process comparison actually retained; either explain the concrete relevance of the quantum-gravity examples or shorten the inventory. No citation is needed to establish the chapter's own declared ontology or the elementary proofs in this report.

Source-check result: the Oreshkov–Costa–Brukner primary text was successfully inspected, including the communication-game assumptions and bound. An attempted primary DOI retrieval for Malament's 1977 theorem (`10.1063/1.523436`) failed; secondary search descriptions were not used as theorem evidence. A Will review page encountered a CAPTCHA, so no external PPN numerical bounds were adopted. The conformal calculation in O3 and local PPN owner comparison in D5 stand independently of those inaccessible pages. The historical Observer Framework has the same substantive citation situation by the blank-line-only diff.

Grade: measured source-support gap and inferred editorial repair. Falsifier: exact primary references and hypotheses supplied for the retained external claims, or removal of those external attributions where the chapter uses only an independently derived elementary statement.

### E2 — The operational explanation is interrupted by undeveloped formal machinery

The opening gives useful definitions, but the ontic/epistemic explanation at lines 110–129 comes after a dense excursion through quantum-gravity comparisons and instrument records. The basic simultaneity explanation does not appear until lines 341–374, and clock/ruler guidance until 429–437, after the long boundary, quotient and covariance development at 131–339. The formal material may be valuable, but this order makes the chapter harder to use as the introductory owner of the observer distinction.

Terms needing in-place explanation include the boundary-CFT example at line 57, conditional measure at 265, ADM/Cartan at 307, PPN at 399, and total variation at 417. Several operators and weights remain only labels, as detailed in O2–O5. The phrase “this page owns” at line 10, “promoted closure set” at line 190, consumption/benchmark-scaffold language at 186, and the Ownership Boundary at 455–471 expose internal documentation organization rather than teach the physical distinction. “Path-history ledger” also needs care: the universe's ontic history and a physical observer's finite stored record are not the same kind of ledger.

Smallest repair: put the ontic/epistemic distinction, one operational clock-and-signal example, simultaneity, and clock/ruler interpretation before the advanced formal notes. Retain useful cross-links as reader navigation without ownership claims. Define abbreviations at first use. Keep the underlying history/record distinction, rather than replacing every occurrence of “ledger” mechanically. A short delayed-signal example can make clear why finite communication and synchronization conventions do not themselves derive Lorentz kinematics.

Grade: inferred reader-flow judgment grounded in the measured section order and current authoring policy, not a mathematical falsification. Falsifier: an explicit intended prerequisite level and a revised or demonstrated reading path in which these definitions are available before their first substantive use. This repair should preserve all honest claim boundaries, not simplify them into stronger claims.

## Equation-by-equation and whole-chapter coverage

All 22 display blocks were inspected mathematically. The following table also records what the checked expressions do not establish. Line spans identify the actual display delimiters or the surrounding explanation; they do not refer to historical line numbers.

| Lines | Expression or passage | Independent check and disposition |
| --- | --- | --- |
| 1–59 | Complete universe state; physical embedded record-producing observers | Definitions are consistent with the inspected substrate and measurement canon. “Complete” includes retained history, not only instantaneous positions. It does not mean that any apparatus can access it. O1 qualifies continuation; E1–E2 address the early comparison inventory. |
| 62–73 | Apparatus record $\Theta_A^{(\mathcal O,W)}$ | A tuple is a legitimate definition, not an instrument result or sufficiency theorem. Channel kernel, modulation, calibration and covariance are identified at line 77. Their admissibility and boundary family require D1/O2. |
| 80–88 | Endpoint separation and photon path length | For an absolutely continuous path with the stated endpoints, $\|\int\dot{\mathbf X}_\gamma dT\|\le\int\|\dot{\mathbf X}_\gamma\|dT$ by the triangle inequality. A two-leg path from $(0,0,0)$ through $(1,0,0)$ to $(1,1,0)$ has endpoint separation $\sqrt2$ and length 2. The formula does not conflate those quantities. A unit-speed example uses $c_f=1$ and duration 2, but the chapter does not assert that a dressed photon group speed always equals $c_f$. |
| 93–102 | Inferred distance $D_{\mathcal O}$ | A declared inference map is not a derived distance law. Line 106 correctly distinguishes the instrument kernel from the inference kernel and requires clock/launch/calibration information. No numerical distance inference is claimed. |
| 110–129 | Ontic/epistemic table; metric/wavefunction interpretations | The two-way access distinction is compatible with the canon's finer substrate/assembly/effective/record levels; it does not collapse all those ontological levels into new primitives. The quantum ontology statements are model commitments, not Born-rule or measurement-dynamics derivations. |
| 132–147 | Accumulated boundary set | Retaining earlier crossings is appropriate for delayed dynamics; incoming orientation is missing (D3). The set and its residual representation need distinct types (D4). |
| 152–160 | $D_{t,j}$ and $W^{\mathrm{acc}}$ | At a fixed crossing event define $g(T_t)=\|\mathbf X_{\mathrm{cross}}-\mathbf X_j(T_t)\|-c_f(T_{\mathrm{cross}}-T_t)$. Differentiation gives $g'=c_f-\hat{\mathbf r}_{\mathrm{cross}}\cdot\mathbf V_j$, as printed. The simple-root delta change of variables supplies $1/|g'|$, and the canonical numerator $c_f$ makes $W^{\mathrm{acc}}$ dimensionless. This agrees with the Master Equation's transmitter-side acceleration weight, not the distinct reception-time transport ratio. Line 164 correctly rejects use of the simple-root formula at a fold; O1 limits continuation claims. |
| 169–178 | Local evolution $dX_\Omega/dT=F_\Omega(\cdots)$ | Schematic functional dependence, explicitly introduced as such. A first-order state equation is not inconsistent with acceleration-first primitives if the state includes velocities and retained history. It is not a derived closed local EOM or proof that the listed coarse inputs suffice. |
| 191–203 | Admissible tolerance neighborhood | A legitimate inverse-image neighborhood once $\Pi$, $d$, the data domain and admissible set are declared. Nonemptiness is a separate issue; proximity need not be transitive for this set definition. |
| 208–216 | Binary predicate ambiguity | Existence of two admissible records assigning different $P$ values implies that the given data do not determine $P$ within that family. The one-way interpretation at 220 is valid. It does not prove that another instrument or independent derivation cannot resolve $P$. |
| 223–231 | Boundary-history quotient | Invalid under an unqualified pairwise-tolerance relation; D1 supplies a direct witness and a minimal valid alternative. |
| 242–248 | Boundary residual | Undefined linear structure; D4. |
| 253–261 | Centered readout | Correct centering under a specified probability law with finite expectation; O2 supplies the missing sample-space/factorization conditions. |
| 268–275 | Boundary covariance | Standard real covariance if both factors are readouts on one probability space with finite second moments. This alone does not derive a quantum probability law or physical noise statistics. |
| 280–286 | Positive-semidefinite covariance inequality | Under real square-integrable channels and interchange/integrability conditions, the quadratic form is $\mathbb E[(\sum_A\int_W f_A(t)\delta Y_A(t)\,dt)^2]\ge0$. This is an independent algebraic proof. Its symmetry is $N_{AB}(t,t')=N_{BA}(t',t)$. PSD alone does not establish the correctness of a noise decomposition or identify a measure. |
| 293–301 | Additive noise decomposition | Cross terms or an uncorrelatedness hypothesis are required; D2. |
| 308–322 | Weak-field input tuple | Coherent as a list of inputs to a future map, not a proof that those data determine an effective metric. The linked Emergent Metric supplies the ADM projection context. The sea-state symbol and lapse/covariance notation must retain their types; no numerical closure has been supplied here. |
| 329–335 | Probability pushforward | A standard preimage formula after O2's measure and observable domains are fixed. It cannot replace a derivation of the physical readout map or a justified epistemic law. |
| 341–374; displays 344–348, 353–355, 360–362 | Events, $T_1=T_2$, absolute slices | Correct within the declared Euclidean-void/absolute-time ontology. The mathematical simultaneity definition is not an operational synchronization algorithm. Finite signal delay does not prove Lorentz compensation; the text treats that as an effective recovery burden. |
| 381–395 | Causal-order/clock/preferred-frame residual | A proposed diagnostic, not a derived metric-reconstruction theorem. O3 and D5 identify missing definitions and a mislabeled parameter group. |
| 402–407 | Candidate geometry diameter | Useful conditional set diameter after O4's nonempty domain and distance conventions are supplied. Small diameter is not by itself global identification or noise stability. |
| 414–423 | Process mismatch plus recovery penalty | Comparison-only use is appropriately stated, but the scalar and selected benchmark need O5. |
| 429–475 | Clock/ruler guidance, Lorentz and preferred-frame burden, navigation, commitment | Correctly keeps $\tau$ as derived clock readout and preferred-frame hiding as a required recovery, not an achieved theorem. The requirement to satisfy current bounds is not itself a numerical bounds claim. E2 recommends reader-oriented navigation in place of ownership prose. |

## Specific reconciliation with the revised Noether Sea

The supplied Noether Sea version strengthens several relevant boundaries. Its lines 20–37 explicitly distinguish conditional $L^2$ convergence from almost-sure, uniform, differentiated, or reordered convergence, and preserve cross correlations. Observer Framework should not use a complete-state description to erase those qualifications (O1), nor use separately named noise sources to discard cross terms (D2).

Noether Sea lines 57–64 and its later clock/transport discussion retain unresolved assembly-selection and shared-delay hypotheses. Its clock/sea-cadence distinction at line 302, source-clock discussion near line 698, and receiver-mismatch example at line 1070 mean a photon distance/redshift inference must keep assembly clock mismatch and photon transport distinct. Observer Framework lines 77 and 106 have places for that metadata and do not explicitly equate them; this is a clarification opportunity, not a demonstrated conflicting distance equation.

Noether Sea lines 461–489 distinguish epistemic covariance from quantum stress comparisons and restrict what two-point data establish. Observer Framework's covariance is likewise classical epistemic bookkeeping. Neither chapter's covariance definition alone establishes a quantum state, entropy law, Born probabilities, or higher-order statistics. Noether Sea's photon path-speed distinction at lines 869–881 is consistent with the separate endpoint/path/inferred distances at Observer Framework lines 79–108. Its frequency-versus-envelope distinction near lines 1163–1165 should remain intact in any eventual operational example.

## Validation record

The custom validation harness is retained as disposable local-only scratch at `.tmp/crw005-observer-review/check.mjs`, not as an independent physics implementation or a distributed artifact. It imports the existing corpus display parser without running its generator. Before its target invocation, a separate `selftest` invocation passed known fixtures: exactly one unfenced display at lines 3–5, exactly one real Markdown link despite fenced and inline-code false links, one inline math expression despite escaped/code dollars, known variances 1 and 0, and one valid KaTeX expression. The tool output recorded that pass before the target file was read by the harness. Mathematical witnesses were derived above; the numeric checks merely confirm their arithmetic.

| Command/instrument | Observed result and scope |
| --- | --- |
| `git cat-file -t 897fe1aa7` | Returned `commit`; the requested historical source was available. |
| `git show 897fe1aa7:content/markdown/aaa/spacetime/observer-framework.md` followed by `shasum -a 256` / `wc -l` | Historical digest and 456-line count recorded in provenance. The entire historical chapter was read. |
| `git diff 897fe1aa7 -- content/markdown/aaa/spacetime/observer-framework.md` | Nineteen blank lines added; no substantive text or equation changes in this comparison. |
| `git diff --ignore-blank-lines --exit-code 897fe1aa7 -- content/markdown/aaa/spacetime/observer-framework.md` | Exit 0, no diff; verifies the bounded substantive comparison rather than attributing changes from a commit subject. |
| `node .tmp/crw005-observer-review/check.mjs selftest` | Exit 0; known-case passes recorded before the target invocation. |
| `node .tmp/crw005-observer-review/check.mjs target` | Exit 0; 22 display expressions and 108 inline expressions parsed by KaTeX with `throwOnError: true` and strict errors; no parse errors. This is syntax validation, not visual layout or mathematical truth. |
| Same target harness, `marked` token traversal and filesystem existence checks | 44 link occurrences, 35 distinct destinations; zero missing local file targets in the assigned chapter. Code examples are excluded by tokenization. |
| Same target harness, generated equation registry lookup | All 22 display “View” links resolve to records with matching semantic IDs, source paths, exact TeX, and start lines. Only this chapter's records were checked; no claim of global generated freshness. |
| Same target harness, arithmetic assertions | Nontransitive tolerance witness passed; correlated variance is 4 versus diagonal-only 2; incoming/outgoing unit-ball events both satisfy the printed conditions with $c_f=1$. |
| `shasum -a 256` and `wc -l` on the live observer and Noether Sea files | Repeated after substantive review with the identical digests and counts shown above. Hash equality is a byte-stability check, not a semantic proof. |
| `node .tmp/crw005-observer-review/check.mjs report` | Exit 0; the report's 2 display and 98 inline expressions parsed without KaTeX errors; no missing local link targets. This validates the review artifact, not the findings' truth. |
| `git diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-observer-framework-review-2026-09-11.md` | Exit 0; whitespace check includes the new, untracked report rather than relying on a tracked-only diff. |
| `git --no-optional-locks status --short --untracked-files=all --` followed by the two reviewed source paths and the requested report path | Only the new report appeared; neither reviewed source appeared in this scoped status. Repeated source digests also matched after the report was written. This is not a whole-checkout cleanliness claim. |

The chapter has no broken local link or KaTeX syntax defect by these scoped instruments. All its equation-link formulas and recorded start lines match the current generated registry by the harness; no generator command, including `--write`, was run. Markdown target existence does not prove browser navigation, rendered scrolling, or external theorem validity.

## Limitations and handoff

This is a complete review of the assigned 475-line chapter, not certification of the entire corpus or of the complete Master Equation. Nearby canon was consulted to resolve the relevant obligations; most linked chapters were not reviewed in full. No solver, experimental data acquisition, full-site build, global link scan, generator freshness sweep, browser rendering, or physical covariance fit was performed. No finite precision instrument protocol, admissible metric family, full conditional measure, or process benchmark was supplied by the chapter for an empirical acceptance test. The report therefore distinguishes valid definitions and conditional proofs from unperformed recovery tests.

Only the requested evidence report and the permitted task scratch were authored. Source/tracker edits, publication, regeneration, and communication with other reviewers were outside scope. The digest/line-count pair is the boundary of this review; if either source changes afterward, its affected findings must be reconciled against the new bytes before repair or acceptance. The practical next step is owner adjudication of D1–D4 and O1, followed by explicit scope for any source repairs. O2–O5 should be completed only to the extent these diagnostics are retained as usable mathematics; otherwise they should remain clearly labeled proposals. No tracker disposition or acceptance status is implied by this report.

## Owner-authorized bounded repair — 2026-09-11

The operator authorized the smallest safe repairs for D1–D5 and E1. D1 uses the explicit record/finite-precision partition; D2 retains cross-covariance kernels unless a common-law independence condition is supplied; D3 adds incoming orientation and fixed-boundary scope; D4 declares a linear feature space for boundary residuals; D5 uses “PPN preferred-frame parameters”; and E1 identifies the optional Oreshkov–Costa–Brukner comparison with its assumptions. O1–O5 remain open. E2 is partially accepted: local wording was clarified, while full reader-flow reordering is deferred.
