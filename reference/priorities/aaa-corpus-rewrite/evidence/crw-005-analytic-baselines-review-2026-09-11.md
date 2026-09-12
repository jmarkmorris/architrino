# crw-005 analytic baselines review — independent HQ evidence, 2026-09-11

This report reviews only [Analytic Baselines](../../../../content/markdown/aaa/validation/simulations/action-energy/analytic-baselines.md). It proposes five demonstrated defects, three open obligations, and two editorial/source dispositions. The most consequential defects are the reversed history-transport sign, the single-root/partner-only equation presented without its restrictions, and the assumption that surface smoothing alone controls the inverse-square singularity. These findings do not establish a binary solution, physical energy conservation, stability, or theory closure.

Claim grade: derived for the explicit mathematical witnesses below; measured for source comparisons and syntax checks; inferred for editorial judgments. The mathematical references are the causal-root equation, the canonical acceleration sum, and independently worked chain-rule and delta-substitution calculations. This is an independent review of the chapter, with reviewer-authored derivations; it is not a second solver implementation or an independent validation of the full theory.

## crw-005 analytic baselines review — scope, authority, and frozen source

The reviewer read the live repository startup instructions and generated router, selected the Corpus Review workflow, and followed the [review skill owner](../../../op/skills/skill-architrino-review.md), [Corpus Reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), and [CRW-005 live review owner](../work-queue.md#crw-005--independent-post-conversion-assurance-review). The explicit assignment supplies the single chapter and sole write destination. Its restrictions supersede default tracker maintenance and next-chapter cadence. All findings remain proposed for HQ adjudication; this report records no accepted correction.

The style standard used is edition 1.1 of the [Academic Style Guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), including its application to evidence reports. Mathematical and vocabulary checks use the live mathematical style/terminology guides, terminology usage, and comparative glossary. The source-support boundary follows [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution). Foundation dependency reads establish absolute time, Euclidean spatial geometry, primitive polarity, and the distinction between coordinate reconstruction and observer measurement. They are context reads, not additional chapter reviews.

| Reviewed object | Version evidence |
| --- | --- |
| Assigned chapter, all lines 1–241 | SHA-256 by native shasum: 0edbaff421edb98b85d2fb54b960ff3da6e80bbc26232e8832ae2202fd00a75c; 241 newline-terminated source lines by native wc |
| Immediate pre-conversion chapter | Git revision 38ffb12969d6b64d959610b3be1c59925ab8dec9, the parent of c973402b9; SHA-256 by Node crypto: 8bc6122a2fe90995962d877fcf48d99eb9e44d597c61dee03984358144f47d07; 231 newline-terminated lines |
| Conversion comparison | The actual file diff from c973402b9's parent to c973402b9 changes the introductory explanation, headings, equation-link paragraph spacing, and closing restatement. The parsed comparison preserves all 14 display-equation bodies and their 14 viewer targets, and retains all 17 prior link occurrences; the current chapter has 18 link occurrences. |

The historical comparison establishes preservation across that conversion, not correctness of the preserved equations. It does not attribute these mathematical defects to the prose converter. The chapter's initial scoped Git status returned no changes for the chapter or the assigned report path; the report path was also checked absent before creation. Source identity was rechecked during validation. A different source hash invalidates these exact line references until its delta is reviewed.

All new numerical witnesses use normalized wake-speed units with $c_f=1$. The constant $\kappa\epsilon^2$ is an acceleration coupling. The coefficient $\mu_{\mathrm{arch}}$ is optional bookkeeping, never primitive mass. No standard-physics force, mass, relativistic speed cap, or conservation law is used as a substrate premise.

## crw-005 analytic baselines review — demonstrated defects

### crw-005 analytic baselines review — D1: history transport has the wrong sign

Reference: “Why Closed-Form Solutions Are Unlikely,” toolbox entry “PDE embeddings,” line 226. Severity: high for anyone implementing the stated history equation.

The entry uses a negative history coordinate, $\theta\in[-\Delta_{\max},0]$, with boundary $Y(T,0)=X(T)$, but specifies $\partial_TY+\partial_\theta Y=0$. In that coordinate, retained history is $Y(T,\theta)=X(T+\theta)$, exactly the convention in [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#functional-phase-space), lines 1932–1950, and Delay Dynamics Energy, lines 16–28. Differentiation gives

$$
\partial_TY(T,\theta)=X'(T+\theta)=\partial_\theta Y(T,\theta)
$$

Thus the history equation is $\partial_TY-\partial_\theta Y=0$. With the printed plus sign, the characteristic extension from the boundary is $X(T-\theta)$, which requests future data when $\theta<0$.

A normalized check is $X(T)=T/2$. The correct history gives $\partial_TY+\partial_\theta Y=1$, contradicting the printed equation, while the corrected difference is zero. This is a coordinate identity for a prescribed smooth history, not a proposed EOM trajectory.

Claim grade: derived by the chain rule. Smallest repair: change the sign and define $Y(T,\theta)=X(T+\theta)$ in the same sentence. Alternatively, a positive age coordinate would require changing the domain, evaluation rule, and transport direction together. A fixed history horizon already accommodates state-dependent evaluation points; a moving boundary is an optional representation, not a necessity.

Falsifier: substitute the declared retained-history definition into line 226 and obtain zero for its printed plus-sign operator for every differentiable $X$. The linear history above gives an immediately checkable failure.

### crw-005 analytic baselines review — D2: the “exact” line equation omits additional partner roots and self contributions

Reference: “Methodological Priority,” “Symmetric two-body on a line,” lines 177–200, especially display 450e0dfa223303b2 at lines 193–196; “Integral Form Selecting the Causal Root,” lines 202–213, display aed5720ddeb2bf44. Severity: high.

The factor 8 is correct for one partner root: the delayed distance is $d=[r(T)+r(T_t)]/2$, the receiver acceleration is $-\kappa\epsilon^2W/d^2$, and reflection symmetry gives $\ddot r=2A_1$. The defect is the unqualified reduction to one $\Delta(T)$ and to the partner contribution alone. The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation), lines 83–163, requires all admitted roots. Its abstract form, lines 59–81, separately includes self contributions.

Here is an explicit reflection-symmetric history allowed by the stated geometry. At reception $T=0$, take

$$
r(T)=2+\frac{T^2}{10},\qquad
X_1(T)=\frac{r(T)}2,\qquad
X_2(T)=-\frac{r(T)}2,\qquad T\le0
$$

The separation is positive throughout this history. Writing delay as $d>0$, the partner-root gap is

$$
g_p(d)=\frac{r(0)+r(-d)}2-d
=2+\frac{d^2}{20}-d
$$

It has two positive simple roots $d_\pm=10\pm\sqrt{60}$. Their transmitter factors are $D_t=1-d_\pm/10=\mp\sqrt{3/5}$, so both have nonzero weight $W^{\mathrm{acc}}=\sqrt{5/3}$. The delta integral therefore includes both, whereas a single-delay evaluation includes only one.

The same history also has a nontrivial self root:

$$
|X_1(0)-X_1(-d)|=\frac{d^2}{20}=d
\quad\Longrightarrow\quad d_s=20
$$

At that root, the direction toward receiver 1 is negative, the transmitter velocity is $-2$, and $D_t=-1$. Its acceleration contribution is $-\kappa\epsilon^2/400$, absent from the displayed partner integral. Both partner terms and this self term are nonzero and point negatively for receiver 1. Reflection gives the corresponding opposite accelerations for receiver 2. For this complete polynomial history the relative acceleration evaluated by the canonical sharp law is

$$
\ddot r_{\mathrm{EOM}}(0)
=-2\kappa\epsilon^2
\left[
\sqrt{\frac53}\left(\frac1{d_-^2}+\frac1{d_+^2}\right)
+\frac1{400}
\right]
$$

This is an acceleration-evaluator counterexample on prescribed initial history, not a claim that the polynomial solves the EOM. That distinction is sufficient: an equation advertised as the exact history-dependent update must evaluate admitted initial histories correctly.

Claim grade: derived from the chapter's own root condition and the canonical per-hit law. Smallest repair: label lines 177–213 as the single-simple-partner-root, self-free reduction; require a certified complete-history root inventory. State that the delta integral sums every simple partner root. For unrestricted histories, use a root-indexed partner sum plus the admitted self sum. At degenerate roots, the simple delta-substitution formula is not valid.

Falsifier: substitute $d_\pm$ and $20$ into the displayed root conditions and show that a cited restriction in the chapter excludes the history, that a claimed root fails the condition, or that its stated Jacobian vanishes. The directly evaluated residuals and nonzero factors are recorded below.

### crw-005 analytic baselines review — D3: present sub-field-speed windows do not exclude older self-hits

Reference: “Methodological Priority,” “Velocity-regime scope,” line 168. Severity: high for the virial ledger's completeness.

The sentence uses strict sub-field-speed motion in the branch window to exclude self-hits without requiring that the speed bound cover the full interval from each possible emission to reception. The actual triangle-inequality statement is

$$
\|\mathbf X(T_r)-\mathbf X(T_t)\|
\le \int_{T_t}^{T_r}\|\mathbf V(u)\|\,du
<c_f(T_r-T_t)
$$

only when the strict speed bound controls that intervening interval. The [Master Equation self-hit discussion](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-regime), lines 1230–1270, explicitly retains older self emissions after a slowdown; Binary Dynamics, lines 244–263, makes the same distinction.

D2 supplies a concrete witness: on $[-1/2,0]$, each member has speed $|T|/10\le1/20<1$, yet at $T=0$ the earlier self emission at $T_t=-20$ arrives with $D_t=-1$. Current-window speed cannot justify dropping that contribution from the virial sum.

Claim grade: derived for the counterexample; measured for the mismatch with the cited live owners by reading those passages. Smallest repair: require strict sub-field-speed motion over the full relevant emission-to-reception history, or independently certify the absence of older active self roots. Preserve line 170's insistence on retained self and multi-root records.

Falsifier: demonstrate that every potential emission for the line-168 claim is confined to its strictly sub-field-speed interval, with older support excluded by a certified gap or tail argument. A finite window declaration alone does not supply that evidence.

### crw-005 analytic baselines review — D4: circular power loses the member sum

Reference: “Methodological Priority,” line 33, following work-reconstruction display bf602e9a8aeaade5 at lines 18–29. Severity: high for normalization of the binary work account.

The work integral sums all members, then line 33 replaces its average integrand by $\mu_{\mathrm{arch}}s_b\langle A_{\eta,b}^{\mathrm{tan}}\rangle_{P_b}$. The owning [Binary Dynamics closure packet](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target), lines 1815–1834, defines the acceleration components per member. Its explicit power formula at lines 938–947 retains the sum and states the factor of two for equal symmetric components.

For common circular speed $s_b$ and per-member tangential projections $A_{i,b}^{\mathrm{tan}}$, direct projection yields

$$
\left\langle\sum_{i=1}^{2}
\mu_{\mathrm{arch}}\mathbf A_{i,b}\cdot\mathbf V_i
\right\rangle_{P_b}
=\mu_{\mathrm{arch}}s_b
\sum_{i=1}^{2}\langle A_{i,b}^{\mathrm{tan}}\rangle_{P_b}
$$

For a prescribed circular benchmark with equal nonzero tangential contributions $a$, the result is $2\mu_{\mathrm{arch}}s_ba$, twice the printed expression. Opposite Cartesian tangents do not cancel power: the member velocity and acceleration rotate together, leaving the two scalar dot products equal. A physically realized constant-speed circle would require zero total tangential acceleration on each member; that special zero does not validate a normalization used to assess nonzero residuals.

Claim grade: derived, conditional on the canonical per-member definition. Smallest repair: retain the explicit member sum, or add the factor of two after explicitly restricting to verified symmetry. Delay Dynamics Energy, lines 146–160, repeats the ambiguous unsummed notation, but it cannot override the explicit member definition in the owning Binary Dynamics packet. That dependency conflict is recorded here only; no second chapter is reviewed or edited.

Falsifier: exhibit a chapter-local definition of $A_{\eta,b}^{\mathrm{tan}}$ as the sum of both members, consistent with the referenced packet. Such a definition would turn this into a naming/crosswalk repair; none is supplied in the assigned source.

### crw-005 analytic baselines review — D5: a Gaussian surface mollifier alone does not guarantee smooth trajectories

Reference: “Why Closed-Form Solutions Are Unlikely,” toolbox entry “Measure-driven/event-driven solvers with mollification,” line 228. Severity: high for an executable regularization prescription.

The instruction replaces surface deltas with Gaussians “to obtain” smooth trajectories while leaving the inverse-square spatial amplitude uncontrolled. Consider one straight, uniformly moving prescribed self history $X(T)=T/2$, with $c_f=1$ and any fixed $\eta>0$. At reception $T=0$, separation from the emission at $-d$ is $d/2$. The smoothed self integrand's scalar magnitude is proportional to

$$
\frac{\delta_\eta(-d/2)}{(d/2)^2}
=\frac{4\delta_\eta(-d/2)}{d^2}
$$

As $d\downarrow0$, the Gaussian tends to the strictly positive value $\delta_\eta(0)$. Its integral therefore diverges like $\int_0^a d^{-2}\,dd$. Excluding the single endpoint with $H(0)=0$ does not remove a divergent positive-delay neighborhood. The sharp sub-field-speed history has no nontrivial self root; the divergence is introduced by broadening support while retaining the singular amplitude.

The current [Binary Dynamics regularized functional](../../../../content/markdown/aaa/dynamics/binary-dynamics.md#the-regularized-interaction-functional), lines 2000–2024, explicitly states this issue and gives a restricted support-mask theorem. The Master Equation's auxiliary dual-mollified regulator, lines 654–715, separately controls the spatial denominator.

Claim grade: derived by a positive integrand comparison near zero delay. Smallest repair: qualify the toolbox entry with a declared separation floor/support exclusion or the existing approved auxiliary core prescription; identify finite-width smoothness as conditional on that domain. Do not present regulator removal as proved by smoothing.

Falsifier: supply an integrable upper bound for the printed Gaussian-only self integral on the stated linear history, or identify a declared support exclusion/core denominator that eliminates the neighborhood. A small Gaussian tail or omission of one endpoint cannot do so.

## crw-005 analytic baselines review — open obligations, not demonstrated failures of the theory

### crw-005 analytic baselines review — O1: the adiabatic comparison needs a common energy meaning, normalization, and independent construction

Reference: “Methodological Priority,” lines 34–55, residual e723374df0c8beb5. Importance: high before using this residual as physical closure evidence.

The left side is a change in a reconstructed interaction contribution, $U_{b,\mathrm{work}}^{(\eta)}$. The right side is a difference of “candidate branch energy” $E_b^{(\eta)}$, without specifying whether that means interaction energy or total energy. These quantities need not coincide. In the closed, realized quadratic bookkeeping case, the definition gives $\Delta U_{\mathrm{work}}=-\Delta K_\mu$, while total reconstructed energy $E=K_\mu+U_{\mathrm{work}}$ has $\Delta E=0$. Comparing $\Delta U_{\mathrm{work}}$ directly with $\Delta E$ would reject any such interval with nonzero kinetic change.

Even if $E_b$ denotes interaction energy, constructing each frozen branch separately leaves an additive constant $C(\lambda)$ undetermined. Replacing $E_b(\lambda)$ with $E_b(\lambda)+C(\lambda)$ preserves each frozen-branch acceleration while changing the residual by the endpoint difference of $C$. If both sides are obtained from the same work integral with constants chosen to agree, the result is consistency by construction, not independent evidence. A quasi-static path of parameter labels also needs a compatible evolving history and time parameterization before its delivered work can be evaluated.

Claim grade: derived for these conditional bookkeeping and additive-constant observations; inferred that the current diagnostic is underspecified, rather than demonstrably false under every possible intended interpretation. The live [Energy conservation discussion](../../../../content/markdown/aaa/dynamics/energy.md#conservation-status), lines 422–450, and Master Equation, lines 5601–5614, keep the independence limitation explicit.

Smallest repair or disposition: keep an open diagnostic target. Specify interaction versus total energy, one common reference normalization, the evolving history and boundary/external-work convention, and the independent construction being compared. Name $\varepsilon$ as a positive normalization scale with the units of energy. No new energy law or infrastructure is required.

Falsifier: provide the actual branch-family construction with those definitions and show that its comparison remains meaningful under permissible common reference changes, while it detects an independently introduced energy inconsistency. Merely setting both sides equal by definition does not meet that test.

### crw-005 analytic baselines review — O2: virial closure needs dynamical and endpoint evidence

Reference: “Methodological Priority,” lines 56–166, especially identity 8c35f444d2dc9497 and residual 71d5f0000e02ad98. Importance: medium; retain the useful identity and strengthen its domain explanation.

The displayed finite-window identity is correct on a solved smooth trajectory with $\dot{\mathbf V}_i=\mathbf A_{i,b}^{(\eta)}$. For an approximate or prescribed branch, define the acceleration defect $\mathbf R_i=\ddot{\mathbf X}_i-\mathbf A_{i,b}^{(\eta)}$. Direct differentiation then gives

$$
\frac{\mathcal G(T_b)-\mathcal G(T_a)}{T_b-T_a}
=
\left\langle
2T_\mu+\sum_i\mu_{\mathrm{arch}}\mathbf X_i\cdot\mathbf A_{i,b}^{(\eta)}
\right\rangle_W
+
\left\langle
\sum_i\mu_{\mathrm{arch}}\mathbf X_i\cdot\mathbf R_i
\right\rangle_W
$$

Differentiability and retention of the same root inventory do not alone eliminate the last term. Conversely, a small scalar virial residual does not prove every vector acceleration defect small.

Boundedness also needs the stated averaging limit. A bounded diagnostic $|\mathcal G|\le M$ gives an endpoint bound $2M/(T_b-T_a)$, not exact finite-window cancellation. Periodicity cancels the endpoints for a complete return interval, not every cut. A kinematic example is $X(T)=\sin T$, with unit bookkeeping coefficient: $\mathcal G=\sin T\cos T$, whose change over $[0,\pi/4]$ is $1/2$. This bounded periodic history has nonzero endpoint drift on that window; it is not asserted to solve the Master Equation.

Claim grade: derived. This is an open application requirement, not a claim that the chapter already asserts arbitrary bounded windows have zero drift: line 138 explicitly restricts attention to the special case where the endpoint term is small. Likewise, lines 157–166 already correctly withhold the classical potential theorem.

Smallest repair or disposition: explicitly say “on a solved branch,” retain or bound the acceleration-defect term for numerical candidates, and state the endpoint/long-window condition. If a homogeneous potential is eventually supplied, show $\mu_{\mathrm{arch}}\mathbf A_i=-\nabla_iU$ and Euler's identity before using $\langle2T_\mu-pU\rangle=0$. In delayed history space, specify what is scaled and how that operation treats delay, regulator, and history; a position-only scaling assertion does not settle those choices.

Falsifier: supply a solved branch with controlled vector defects and endpoint drift, plus the same-domain generating potential and scale derivative for the stronger claim. Those records would discharge this obligation on their declared domain, without establishing a global virial theorem.

### crw-005 analytic baselines review — O3: the numerical toolbox does not yet certify roots, existence, stability, or regulator limits

Reference: “Why Closed-Form Solutions Are Unlikely,” toolbox lines 221–231; “Deliverables,” lines 236–241. Importance: medium.

Newton correction of one algebraic delay can make that root accurate without discovering another root. D2 supplies two separated simple roots for the same reception event, so small error at one is compatible with an incomplete acceleration. Similarly, a contraction proof requires a specified history norm, an invariant neighborhood, and a local Lipschitz bound: for a Picard map over duration $h_{\mathrm{step}}$, the standard estimate has the form $\|\mathcal Pz-\mathcal Pw\|\le Lh_{\mathrm{step}}\|z-w\|$, and contraction requires $Lh_{\mathrm{step}}<1$. Declaring a continuous history space or a Gaussian width does not supply $L$.

The current Binary Dynamics framework distinguishes continuous first-order histories $(\mathbf X,\mathbf V)$ for a restricted finite-width integral from compatible smooth histories for sharp-root differentiation, at lines 1932–1972 and 1976–2076. The generic toolbox's bare position-history notation does not make this distinction. A stability calculation additionally needs an actual solution: a small numerical spectrum at an unsolved candidate is not a stability certificate. A zero-width limit requires convergence and event conventions beyond a successful work reconstruction.

Claim grade: derived for the root-completeness and contraction-estimate limitations; inferred for the adequacy of the toolbox as an introduction. No solver run or failed existence theorem is alleged.

Smallest repair or disposition: retain these as candidate methods and link the existing history-space, root-completeness, finite-width existence, and solution-before-stability conditions. Replace “ensures consistency” with a bounded local-root statement subject to convergence and completeness checks. Keep weak-limit recovery and physical stability explicitly open.

Falsifier: exhibit the actual specified method and admissible history class, with root exclusion outside tracked tubes, local estimates, a solved reference trajectory before stability analysis, and the relevant regulator-limit theorem. A converged Newton solve or successful step-halving comparison alone does not discharge all of these obligations.

## crw-005 analytic baselines review — editorial and source issues

### crw-005 analytic baselines review — E1: “generically non-integrable” exceeds the support provided

Reference: “Why Closed-Form Solutions Are Unlikely,” lines 215–217, compared with the narrower status sentence at line 10. Severity: medium.

State dependence makes an equation functional rather than an ordinary finite-dimensional initial-value equation, but it does not by itself prove generic non-integrability. Such a claim needs a specified family of equations, a meaning of integrability, and a meaning of “generic” on that family. None is defined in these lines. The lack of a known general closed form at line 10 is a different, narrower claim than a non-integrability theorem.

Claim grade: measured for the absence of those definitions/support in lines 215–217 by direct source reading; inferred for the proposed editorial disposition. This review did not conduct a literature survey and does not certify that no exact solution is known anywhere.

Smallest repair or disposition: keep the precise statement that no general exact solution is supplied or currently established by this treatment, and describe the state-dependent delay as the technical obstacle. Retain a stronger genericity claim only with its mathematical domain and inspected supporting result. The selective-reference policy does not require citations for the elementary chain-rule or root calculations in this report.

Falsifier: identify the chapter's explicit definition of generic non-integrability and an applicable theorem or inspected source that proves it for the stated equation class. A citation about DDE difficulty in general would not establish that claim.

### crw-005 analytic baselines review — E2: model restrictions and load-bearing terms need local explanation

Reference: opening and “Models,” lines 3–10; “Methodological Priority,” lines 16–34 and 55–56; unheaded “Symmetric two-body” at line 177; toolbox at lines 219–231; “Deliverables,” lines 233–241. Severity: medium for reader comprehension, low for isolated naming changes.

The chapter does not locally explain the causal-root Jacobian, the regularization width, the meaning of a branch chart, or the bookkeeping coefficient before using them. “Primitive kinetic scalar” at line 33 also needs its candidate status and its work factor $\mu_K(s)=K'(s)/s$ for $s>0$, as defined by Energy, lines 17–31 and 128–140. Otherwise the quadratic proxy can look like imported primitive mass mechanics. “Opposite or equal charges” at lines 8 and 200 and “particle 1” at line 203 use observer-level nouns where the [terminology owner](../../../../content/markdown/aaa/archie/terminology-usage.md#charge-polarity-and-architrino-usage) specifies polarity and architrino.

The fixed-center statement at line 7 also needs its radial-motion restriction in place. A central acceleration with $\mathbf A=-K\hat{\mathbf r}/r^2$ gives the purely geometric identity $\ddot r=-K/r^2+\|\mathbf V_\perp\|^2/r$, where $\mathbf V_\perp$ is velocity perpendicular to the instantaneous radius. Thus the displayed scalar equation is the zero-transverse-motion reduction, even though the arriving vector acceleration is independent of receiver velocity. The linked Radial Attraction chapter explicitly sets radial motion at line 6; this is a local scope clarification, not rejection of that valid reduction. The fixed source must also be prescribed, and any excluded receiver self contributions must be declared, as in D2.

Claim grade: measured for the local terminology and definition gaps by reading the listed source passages; derived for the radial-coordinate identity; inferred for teaching structure. The chapter's ordinary-physics comparison targets are legitimate when explicitly marked and are not treated here as barred substrate premises.

Smallest repair or disposition: add short first-use definitions and links, state the radial/prescribed-source restrictions, use polarity/architrino for primitive entities, and make the line-model and toolbox labels navigable headings. Explain the main branch diagnostics in connected prose; retain the benchmark ladder and useful equations. Do not promote open derivations by changing their wording.

Falsifier: show that an arriving reader can resolve each cited load-bearing symbol and restriction within the assigned chapter before relying on it, or point to a local definition already supplying it. The mathematical part is falsified by a correct derivation eliminating the transverse term for arbitrary nonradial motion; a zero-transverse restriction instead resolves the scope issue.

## crw-005 analytic baselines review — retained results and review boundaries

The stationary-transmitter weight $W^{\mathrm{acc}}=1$ follows directly from $D_t=c_f$ and is retained. The single-simple-partner-root factor 8 is correct under D2's restrictions. Delta substitution supplies $c_f/|D_t|$ exactly once; the no-double-counting sentence at line 213 is correct within the simple-root domain. The root-resolved virial and power sums preserve useful provenance. The virial reduction to a homogeneous-potential identity is correctly kept conditional, and the branch-existence and stability claims are not promoted merely by computing a residual.

Claim grade: derived for those restricted identities. Falsifier: an admitted stationary-transmitter root with $D_t\ne c_f$, an algebraic error in the factor-8 reduction, or a same-domain delta substitution producing a different Jacobian. These checks establish local mathematics only.

The numerical root witness uses analytic roots, not a custom root finder, a fitted model, or a self-validating simulation. It cannot establish reachability of that history from an earlier solved branch. The reviewer did not launch EOM evolution, a stability calculation, a literature campaign, regeneration, publication, or review of another chapter.

## crw-005 analytic baselines review — validation receipt

The validation helper ran in memory through Node stdin and created no helper file. Its initial KaTeX loader did not execute in the repository's ES-module context; no target result was taken from that failed attempt. Loading the existing vendored KaTeX bundle in a Node VM resolved the loader issue. Before target use, the helper passed known fixtures: one unfenced display at lines 3–5, one inline expression, one real link, exclusion of fake math/links in fenced and inline code, rejection of a deliberately invalid TeX command, and the standard SHA-256 digest of the literal string abc. This known-case pass was recorded in tool output before the separate target invocation.

| Instrument and scope | Observed result and boundary |
| --- | --- |
| Native shasum and wc on the assigned chapter, at initial inspection and validation | The same SHA-256 and 241 lines recorded above. These check byte identity, not physics. |
| Read-only Node helper using the repository's parseCorpusDisplayEquations and vendored KaTeX | Chapter: 14 display expressions and 55 inline expressions accepted with throwOnError and strict errors; all 18 local link targets exist. This checks syntax and file existence, not browser layout or every fragment anchor. |
| Parsed Git parent/current comparison | All 14 display bodies and viewer targets match; every prior link target is retained. The chapter's conversion diff was also read directly. This is preservation evidence, not an independent mathematical oracle. |
| Direct substitution at the independently derived roots | Partner delays approximately 2.254033307585166 and 17.745966692414832 give floating-point root residual 0 and factors approximately +0.7745966692414834 and -0.7745966692414832. Self delay 20 gives residual 0 and factor -1. The symbolic calculations in D2 carry the proof; these numbers check arithmetic only. |
| node scripts/validate-equation-mapping-links.mjs | Exit 0: 23 registered equation links checked. This existing instrument's registry scope is not an exhaustive check of the chapter's corpus-equation fragments. |

The complete report was reread after drafting. The post-write Node check accepted all 9 display equations and 86 inline expressions with strict KaTeX parsing, found all 13 local file-link targets, verified the required prefix on all 18 headings, and confirmed unique finding identifiers and the reference, claim-grade, repair/disposition, and falsifier fields for D1–D5, O1–O3, and E1–E2. The report-only command git diff --no-index --check -- /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-analytic-baselines-review-2026-09-11.md emitted no whitespace diagnostics. Native source hashing and line counting again returned the frozen hash and 241 lines; scoped Git status showed only the new report and no chapter change.

Claim grade: measured by the named commands on these exact files. Falsifier: a failing repeat syntax, field, link-existence, or whitespace check, or a changed chapter hash. These checks validate the report's structure and source identity, not the truth of every finding. No repository-wide content-validation or rendered-page result is claimed. The reviewer wrote only this report; corpus sources, trackers, and generated artifacts were outside the write scope.

## crw-005 analytic baselines review — disposition for HQ

The five demonstrated defects are proposed for bounded correction after HQ adjudication. The three open obligations remain proof or diagnostic-definition work, and the two editorial/source issues should be resolved without strengthening the chapter's claims. This assignment is report-only; correction completion and CRW-005 tracker advancement are not implied.

Recommended next action: HQ should first adjudicate D1–D5 against the frozen chapter and the supplied counterexamples, because these affect executable equations and quantitative bookkeeping. O1–O3 require explicit constructions or qualifications, not an assertion that the theory has failed.

## crw-005 analytic baselines review — bounded repair pass

The operator authorized the smallest safe repairs for D1–D5 and E1–E2 in the canonical chapter. D1 now defines the negative-coordinate history as $Y(T,\theta)=X(T+\theta)$ and uses $\partial_TY-\partial_\theta Y=0$. D2 now labels the symmetric line equation and integral as a single-simple-partner-root benchmark, states the no-self-hit restriction, and requires complete partner/self root accounting for unrestricted evaluation. D3 now requires the strict speed bound to cover the full relevant emission-to-reception interval before older self-hits may be excluded. D4 now retains the member sum in circular power and states the equal-member factor of two. D5 now makes finite-width trajectory regularity conditional on separation/support or core control and keeps the sharp-limit and work checks open. E1 now removes the unsupported generic non-integrability claim. E2 now adds local radial/prescribed-source restrictions, uses polarity and architrino terminology, and identifies the bookkeeping status of the kinetic coefficient and member sum.

O1–O3 remain open: the repairs do not establish a common energy construction, solved-branch virial closure, root completeness/existence, stability, or regulator-limit convergence. The repair pass changed only the canonical chapter and this evidence record; shared CRW trackers and generated artifacts were not edited.
