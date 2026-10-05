# Independent exact-release transfer bounds

This analysis supplies an exact initial release segment and an a posteriori error estimate for ordinary causal-root sectors. It does not certify the recorded held-release history through its first birth, contact, inherited fold, or later upward birth. A polynomial record satisfies its own source equations only approximately; agreement with an independent integral of that record does not establish its distance from an exact solution of the held-history problem.

## Exact release through the first moving source

Use the selected multiplier-free linear law, $c_f=1$, $k=0.2862286103053385$, and held symmetric positions $x=1/2$ for $T\leq0$. Until the partner source leaves the held interval, its displacement is $x(T)+1/2$, its source weight is one, and there is no admitted self root. Consequently the exact initial-value solution is

$$
x(T)=\cos(\sqrt{k}T)-\frac12,\qquad v(T)=-\sqrt{k}\sin(\sqrt{k}T).
$$

The held source is $S=T-x(T)-1/2=T-\cos(\sqrt{k}T)$. It first reaches zero at the unique solution $t_h$ of

$$
t_h=\cos(\sqrt{k}t_h),\qquad 0<t_h<1.
$$

Existence follows from the opposite endpoint signs of $T-\cos(\sqrt{k}T)$ on $[0,1]$. Its derivative $1+\sqrt{k}\sin(\sqrt{k}T)$ is strictly positive there, proving uniqueness. Throughout this interval $|v|\leq\sqrt{k}<1$. Both source clocks are strictly increasing. The Lipschitz position bound excludes every positive-delay self root, and the increasing partner clock admits exactly the held root stated above. Thus this is an exact solution of the complete law on $[0,t_h]$, not merely a prescribed trajectory or a numerical test.

An enclosure instrument can verify this reference using directed interval sine/cosine evaluations and interval bisection of the strictly monotone equation. It should reproduce an enclosing initial segment before touching a recorded target. Ordinary floating evaluation or agreement with a numerical integrator is not an enclosure. Falsifiers are an additional admitted source in this strict subfield sector or a failure of the displayed root identity; both are directly checkable in the clock equations.

## A computable residual-to-error bound away from source events

Let $\widehat x$ be a specified continuously differentiable receiver/history approximation and let $\widehat v=\widehat x'$. Consider a compact time sector where the exact and approximate complete censuses have the same admitted rows and directions. Assume an independently verified source tube with absolute source-clock derivative at least $m>0$, delay at most $D$, and source acceleration magnitude at most $M_2$. Let $E_x,E_v$ bound the position and velocity differences over the complete history and receiver sector under consideration.

The inverse-clock mean-value estimate gives a source shift of at most $2E_x/m$: the receiver target differs by at most $E_x$, and the source clock differs by at most $E_x$. At the shifted source the absolute derivative differs by at most $E_v+2M_2E_x/m$. Writing each ordinary row as signed $k(T-S)/J$ therefore yields

$$
|A_j-\widehat A_j|\leq\left(\frac{2k}{m^2}+\frac{2kDM_2}{m^3}\right)E_x+\frac{kD}{m^2}E_v.
$$

Both denominators must satisfy the same certified lower bound; evaluating a denominator margin only on the approximation is insufficient. Row-specific bounds may be summed instead of replacing them with a single worst-case margin. This estimate also applies on a method-of-steps sector with frozen earlier sources, provided the earlier exact-history error enclosure is carried forward.

Put $r=\widehat v'-\widehat A$ and enclose $|r|\leq\epsilon(T)$ continuously on every polynomial cell, including both one-sided values at cell boundaries. With summed coefficients $K_0,K_1$, a cooperative majorant is

$$
\frac{d}{dT}\begin{pmatrix}e_x\\e_v\end{pmatrix}=\begin{pmatrix}0&1\\K_0&K_1\end{pmatrix}\begin{pmatrix}e_x\\e_v\end{pmatrix}+\begin{pmatrix}0\\\epsilon(T)\end{pmatrix}.
$$

Starting from certified errors, its nonnegative solution bounds the exact error while the declared tube and census remain valid. Running suprema give the analogous retained-history bound; alternatively use successive time slabs with already enclosed source history. Existence and the maintained tube require a closed bootstrap: the propagated bounds must lie strictly within the position, velocity, source-derivative, delay and root-admission margins used to derive the estimate. A residual at finitely many sample points, or an integrated cancellation residual, does not provide the required $\epsilon(T)$.

This lemma gives concrete implementable bounds. It intentionally becomes unusable when an admitted source derivative approaches zero. A certificate that substitutes a tiny positive numerical denominator for an exact zero does not transfer across the event.

## Event matching obligations that ordinary residual bounds cannot discharge

At a downward or upward speed crossing, the source-coordinate birth chart removes the zero-delay degeneracy. Its exact source curvature equals the surviving incoming acceleration, with the appropriate sign, because the incoming sector solves the same law. In the recorded Hermite history, last-cell curvature and evaluated incoming acceleration are separate approximate quantities. The generalized trace calculation with unequal values describes continuation of the supplied polynomial history; it is not an exact release certificate. An exact transfer must enclose a common physical curvature and propagate event-time, event-position, history and regular-row errors into the bounded-past birth problem. Setting the two measured values equal by assignment would erase a defect rather than bound it.

The downward birth subject initializes the logarithmic chart at a finite source cutoff with fixed-point values and uses a parabolic extension below that cutoff. The omitted history forcing and bounded-past tail therefore need a quantitative enclosure. Shrinking the cutoff and observing refinement is measured convergence evidence, not such an enclosure. The uniquely bounded downward branch offers a favorable stable integral problem, but its Green-operator residual and source perturbation bounds must still be supplied.

At contact, direction-specific partner clocks change their admitted root census. A certificate must enclose the transverse contact and both one-sided source sectors, with explicit treatment of the positive-delay condition. Numerical delay exclusions and root deduplication tolerances are not admissible exact exclusions without bounds separating the distinct roots or accounting for the truncated contributions.

At an inherited fold, ordinary $C^1$ acceleration Lipschitz bounds fail. The regularized receiver coordinate $r=\sqrt{|L-L_*|}$ must use an enclosed exact extremum level $L_*$ and enclosed two-sided source curvatures. It must verify the smooth endpoint coefficient of $rA_{\rm pair}$ and propagate the coupled receiver defect to $r=0$. A constant-coefficient normal-form control checks the integrator, but does not enclose an approximate source extremum or prove that its curvature is physical. In particular, second-derivative continuity of an ordinary Hermite interpolant must not be presumed at a physical source birth.

After the fold, the ordinary two-root transfer lemma applies again only with the enclosed fold output as its initial datum. At the next upward birth its incoming curvature again equals the exact old-row acceleration. Separate measured values must remain separate until their error intervals and matching proof supply this exact equality.

## Independent verdict

Claim grade: derived. The exact held-source release segment and the ordinary-row residual-to-error majorant provide positive certificate components. Their references are explicit elementary solutions and inverse-clock estimates derived here independently of the numerical subjects. Falsifiers are failure of the exact initial census, violation of an enclosed derivative/delay margin, an additional admitted root, or a majorant leaving its bootstrap tube.

Claim grade: unresolved. Inspection of the current prefix, birth, fold and postfold subjects shows numerical integration, finite-cutoff startup and polynomial source reconstruction; none supplies the continuous residual enclosures and matched event-error propagation described above. Their existing integral comparisons establish properties of supplied records at their stated scope. An exact held-release-to-fate theorem cannot presently be obtained by assigning those records exact-history status. No conclusion about failure of an exact solution is drawn from this missing transfer proof.

No existing oracle or numerical subject was changed. This independently authored analysis was prepared before consulting another worker's new enclosure report or proposed certification implementation.

## Closed-form propagation control and structural feasibility

For constant $K_0>0$, $K_1\geq0$, constant defect $\epsilon$, and zero initial errors, put $\Delta=\sqrt{K_1^2+4K_0}$ and $r_\pm=(K_1\pm\Delta)/2$. The exact cooperative majorant is

$$
e_v(t)=\frac{\epsilon}{\Delta}\left(e^{r_+t}-e^{r_-t}\right),\qquad e_x(t)=\frac{\epsilon}{\Delta}\left[\frac{e^{r_+t}-1}{r_+}-\frac{e^{r_-t}-1}{r_-}\right].
$$

Differentiation verifies $e_x'=e_v$ and $e_v'=K_0e_x+K_1e_v+\epsilon$, including the zero initial conditions. An exact independently specified known case is $K_0=2$, $K_1=1$, $\epsilon=1$, $t=\log2$. Here $r_+=2$, $r_-=-1$, and the endpoint is exactly

$$
e_x(\log2)=\frac13,\qquad e_v(\log2)=\frac76.
$$

This checks the forced propagation, not only homogeneous evolution. A validated numerical propagator should contain these rational values when supplied an enclosing duration for $\log2$. Its floating midpoint may agree closely while its enclosure fails; containment is the relevant criterion.

The source join at $S=0$ is not a physical obstruction: held and released position and velocity agree, while acceleration has bounded one-sided values. The ordinary row bound can use an almost-everywhere source acceleration bound across that join. Subfield contact likewise changes the root direction without requiring an impulse; the linear numerator tends to zero with displacement and source derivatives remain separated from zero. Each transition still needs an explicit verified census.

The first downward birth is different: the newborn root has zero source delay, but the exact bounded downward-birth construction supplies a unique local branch in the declared finite-trace class. At the subsequent inherited partner fold, the two sides of the source maximum generally have different physical curvatures. The resolved source-coordinate subject correctly keeps those curvatures separate in the endpoint formula for $G=r(-A_{\rm pair})$; a single smooth polynomial curvature cannot be substituted for both. The coupled square-root receiver chart permits integrable passage and continuous velocity when its strict receiver margin is maintained.

Accordingly there is no identified mathematical nonexistence obstruction along this finite prefix in the declared integral class. Completing its continuous residual bounds and event matching is a rigorous verification task. Failure or absence of a validator does not establish a failure of the model. Once the later upward event's exact threshold and history hypotheses are certified, its nonunique bounded family is a genuine selection obstruction to a uniquely determined later fate. This structural assessment is conditional; it does not replace the event enclosures needed to connect the held release to that event.

## An exact enclosure beyond the source join

A strict elementary bootstrap proves actual complete-law continuation beyond the held-source join, through $T=1$. It gives a positive enclosure slice without treating a sampled polynomial history as exact.

The selected value satisfies $0.286<k<0.287$. The inequalities $\cos z\geq1-z^2/2$ and $\cos z\leq1-z^2/2+z^4/24$, valid on the positive arguments used here, give opposite signs in the source-join equation at $T=0.85$ and $T=0.9$. Thus $0.85<t_h<0.9$. At the join, $x_h=t_h-1/2\in(0.35,0.4)$ and $-0.2583<v_h<0$ by $\sin z\leq z$.

On the putative continuation interval $[t_h,1]$, use the receiver tube $1/4\leq x\leq1/2$, $-1/2\leq v\leq0$. Its positive partner target is $T-x\leq3/4$. The exact incoming source clock at $S=0.3$ satisfies

$$
P(0.3)=0.3+\cos(0.3\sqrt{k})-\frac12\geq0.8-\frac{0.287(0.3)^2}{2}=0.787085>\frac34.
$$

At the join the target is $P(0)=1/2$, and subsequently it increases because $(T-x)'=1-v>0$. Its unique inverse source therefore lies in $0\leq S<0.3<t_h$, entirely within the exact analytical source segment. Its positive Jacobian obeys

$$
J=1-\sqrt{k}\sin(\sqrt{k}S)\geq1-kS>0.9139.
$$

The delay lies between $t_h-0.3>0.55$ and one. Hence the exact ordinary acceleration satisfies $-0.315<A<0$. On the interval of length at most $0.15$, this gives $v> -0.2583-0.315(0.15)=-0.30555>-1/2$. Position decreases and obeys $x\geq0.35-(1/2)(0.15)=0.275>1/4$, while $x<0.4<1/2$. These strict inequalities close the bootstrap. The inverse source remains separated from the receiver and has a nonzero derivative, so the receiver equation is a regular locally Lipschitz ordinary differential equation with the exact source formula.

All earlier positions remain positive and all past and receiver speeds remain below $1/2$ in magnitude. There is exactly one positive-distance partner root and no negative-distance partner or positive-delay self root. Thus the enclosed ordinary continuation solves the complete selected law through $T=1$, including the source join. It has no contact, speed birth or turn after the initial release. This is a derived exact enclosure; it proves existence and root coverage on this slice, while leaving the numerical trajectory's quantitative position/velocity error and the much longer prefix to the first downward birth uncertified.

## Read-only audit of the first validated instrument

After the independent results above were recorded, the new [exact-release enclosure instrument](../../../../../scripts/collinear-research/linear-exact-release-enclosure.py) was inspected. Its accepted run is `.local-data/collinear-research/linear-exact-release-enclosure/20261003T201927.366113Z/certificate.json`. The receipt subject hash and the live source both have SHA-256 `4af16a96791791a76e29d148834248459db36b56dbe074168ad402620e0d1af4`, as measured by reading the receipt and `shasum -a 256` on the subject. This audit used source inspection and the independent analytic bootstrap, not numerical parity with another solver.

The backend performs exact rational arithmetic and projects every interval result outward onto a 96-bit dyadic grid. Multiplication enumerates all endpoint products. Reciprocal division preserves endpoint order for either strictly positive or strictly negative divisor intervals and rejects zero-containing divisors. The cosine and scaled-sine bounds use decreasing alternating rational terms with the correct even/odd endpoint order. Source inversion brackets the exact analytic clock, using a valid derivative floor; its interval queries all remain strictly below $S=0.88$, where the initial analytical release is exact. The stated floor $0.74$ is weaker than the independently derived bound $1-k(0.88)>0.747$.

The initial multiplication known-control assertion was found to have a precedence defect that made it vacuous. The author repaired it before the accepted rerun, added rejection of interval truthiness and negative containment/zero-divisor controls, and recorded successful controls before target evaluation. The accepted source and receipt correspond to that repaired run; the earlier receipt is not used as its validation evidence.

Every receiver cell encloses the right-hand side over the entire proposed tube, verifies interval Picard self inclusion, and propagates endpoint position with the second-order integral formula. This formula is valid because the enclosed acceleration applies over the complete included path; it is not a sampled truncation estimate. Positive receiver and past positions, strict subfield speed bounds, and the monotone partner clock establish the complete one-partner/no-self census. The source remains strictly earlier than the receiver. Local Lipschitz continuity of the fixed analytic-source equation and the strict tube conditions support existence and uniqueness on every certified cell.

Claim grade: derived with machine-checked rational enclosures. The accepted run reaches $T=7/5$ with

$$
0.230552695322\leq x(7/5)\leq0.230761845709,
$$

$$
-0.373791621175\leq v(7/5)\leq-0.372918084647.
$$

The displayed decimal endpoints are outward projections of the retained rational endpoints. These enclosures are consistent with the independently proved broader tube through $T=1$. The certificate uses the exact displayed decimal $k=2862286103053385/10^{16}$ and separately records its difference from the binary64 value. It therefore does not silently certify the upstream IEEE trajectory or its much later events. Falsifiers are a non-outward arithmetic operation, incorrect alternating-series ordering, an analytic source query beyond its proved availability, a failed Picard inclusion or an unaccounted admitted root; their relevant operations and per-cell records are explicit in the subject and receipt.

## Retained-history and contact audit

The later extension adds completed-cell integral enclosures and allows a source to lie inside the currently enclosed receiver cell. Each completed-cell evaluation uses its initial position and velocity intervals together with its entire-cell acceleration interval. Its position enclosure is $X_0+uV_0+u^2A/2$ and its velocity enclosure is $V_0+uA$. Unions over intersected cells enclose source velocity. These operations propagate verified history; they do not assume an interpolating polynomial is exact.

For inverse clocks, a point can be discarded below the source only when its entire clock interval lies below the target interval, and discarded above only when its entire clock interval lies above. The retained inverse routine returns its last safely discarded lower and upper bounds. Exact clock monotonicity makes these pruning statements valid even if the interval envelope endpoints are not themselves monotone. Current-cell sources are enclosed by the active position and velocity tubes. For fixed receiver position sign, strict subfield clock monotonicity guarantees the unique admitted partner root is earlier than the receiver; clamping a negative interval delay lower endpoint to zero therefore preserves a valid enclosure.

Contact requires no impulse or deleted earlier row. Put $m=1-\sup|v|>0$ over the entire past and current candidate sector. For an admitted partner row, its causal identity and the Lipschitz position bound give

$$
\Delta=T-S\leq2|x(T)|+(1-m)\Delta,\qquad\Delta\leq\frac{2|x(T)|}{m}.
$$

Its derivative weight is at least $m$, so $|A|\leq2k|x|/m^2$. For positive $x$ the contribution is negative, and for negative $x$ it is positive. At exact contact $x=0$, strict monotonicity leaves only the excluded zero-delay partner diagonal; no admitted positive-delay partner or self root remains. The complete acceleration is zero, and the displayed bound proves continuity of admission through contact. This independently justifies the implementation's asymmetric interval acceleration bound on a contact-straddling position tube.

The hereditary contraction must be formulated on the correct function space. Fix an exact completed past consistent with its retained enclosure, and fix its exact initial position and velocity. Use continuously differentiable candidate positions $x$ with $v=x'$, with $v$ Lipschitz of constant at most $M$, inside the position/velocity tubes. The integral map is the second-order Volterra map

$$
\mathcal Vx(t)=x_0+(t-t_0)v_0+\int_{t_0}^{t}(t-s)A[x](s)\,ds.
$$

Its derivative is $v_0+\int A[x]$. Thus this map preserves the kinematic relation and the Lipschitz bound when the enclosed acceleration has magnitude at most $M$. An ordinary first-order Picard map on unconstrained pairs $(x,v)$ would not preserve $x'=v$; that map cannot silently borrow the derivative-dependent inverse-clock estimate.

In the $C^1$ maximum norm, the same-sign row Lipschitz bound is $K_0+K_1$ from the earlier majorant lemma. For opposite position signs, admission continuity gives the sharper estimate $|A[x_1]-A[x_2]|\leq2k|x_1(T)-x_2(T)|/m^2$, since $|x_1|+|x_2|=|x_1-x_2|$. The implementation's factor-two allowance therefore safely covers both comparisons. The Volterra map contraction is at most $h$ times this acceleration Lipschitz bound for $h\leq2$; its recorded quantity

$$
h\left[1+2k\left(\frac2{m^2}+\frac\Delta{m^2}+\frac{2\Delta M}{m^3}\right)\right]<\frac12
$$

is sufficient. Here $m$ bounds every retained and current source derivative, $M$ bounds every retained and current acceleration, and $\Delta$ bounds the actual admitted delay. On contact-straddling tubes the preceding $2|x|/m$ bound supplies $\Delta$.

Consequently strict self inclusion, complete-history subfield margins and the recorded contraction condition suffice for retained-cell existence and uniqueness, including contact cells. The completed history remains globally Lipschitz in velocity because all cell accelerations are bounded by the retained maximum and position/velocity are continuously matched. Failure of interval self inclusion or excessive wrapping withdraws the next enclosure cell; it does not show a physical obstruction or a failure of the exact equation. Acceptance of a completed longer run must additionally inspect its frozen subject identity, controls-first receipt and all per-cell contraction and tube records. No uncompleted run is accepted here.

## Conditioned numerical integral audit: separate scope

The new conditioned reception-time auditor was also inspected read-only. It reconstructs the recent clock by integrating separately interpolated raw $w=1+v$ profiles in centered time. The source clock is $P-P_u=L(\tau)$ and the complementary clock is $Q-P_u=Q(T_u)-P_u+2\tau-L(\tau)$. The last incoming polynomial germ is evaluated in $q=T_u-S$ with the original frozen position spline's curvature and third derivative. This avoids adding the large absolute event time before inverting a tiny source clock. Acceleration is independently evaluated from sources rather than read from the numerical subject.

The four channel signs follow directly from their clock identities and positive delays. Recent $P$ roots are isolated between all zeros of the separately interpolated $w$; recent $Q$ is increasing because PCHIP preserves the recorded knot bounds $w<2$. The direct recent inverse uses the complete recent source history, so its completeness does not depend on the separately computed recent range-reduction blocks. Segment splits preserve distinct acceleration traces at received folds. These are sound supplied-history conditioning measures, not exact-release enclosures.

Three margins remain necessary when accepting an actual run. First, the $2\times10^{-9}$ delay guard excludes a positive interval of delays, not just the exact self diagonal. Each accepted window must establish that every off-diagonal root has delay strictly larger than this guard; a receiver cutoff alone is sufficient only when all relevant sources precede the corresponding segment-start event. Second, the old/germ handoff excludes old source times beginning $10^{-13}$ before the exact last-cell boundary, while the germ itself ends at that boundary. A source-level gap must exclude that narrow handoff strip on every accepted window, or the partition must be made exact. Third, separate interpolation and cumulative clock offsets do not themselves establish velocity continuity at actual segment joins; the raw one-sided endpoint differences must be recorded. The near-event absolute-grid provenance filter in old range reduction likewise needs a target level gap excluding any earliest recent block that passes its endpoint tolerance.

These are concrete acceptance conditions on the measured audit. They do not alter its source equations, prove a numerical failure, or establish an exact-history connection. Controls on parabolic inverses and source rows justify the new arithmetic path; numerical cutoff windows keep their declared finite scope, and singular endpoint matching remains outside their authority.

The conditioned auditor was subsequently repaired to use an exact half-open old/germ partition, provenance-based old-source blocks, recorded shared-endpoint velocity jumps, geometric self-diagonal identification on monotone clock sectors, and fail-closed rejection of every positive off-diagonal delay at or below its guard. These changes resolve the static omission conditions above. The recorded delay minimum is explicitly over census probes and quadrature nodes; it is measured numerical coverage, not a continuous interval margin. A completed repaired receipt and its frozen subject hash are required before accepting the corresponding target audit. Event-germ coefficients and discarded localization slope should remain visible alongside that receipt, because centering is a supplied-history operation and cannot silently become exact release matching.

The later retained enclosure optimization was separately reviewed in frozen source `20261003T204525.534568Z/subject.py`. Its dyadic cell range aggregator covers every requested half-open cell-index range and has exhaustive known controls for all nonempty ranges of a nineteen-element input. Source-index endpoints conservatively include shared-boundary cells. The sharper historical speed bound from $V_0+[0,h]A$ is valid for all completed-cell velocities. For a source wholly before the current cell, the exact past is fixed: root sensitivity is $|\delta S|\leq|\delta x|/m$, and source derivative sensitivity is $|\delta D|\leq M|\delta x|/m$. Thus the reduced receiver Lipschitz bound $k(m^{-2}+\Delta M m^{-3})$ is justified using the local source derivative interval and all intersected source acceleration cells. The global subfield history check remains necessary for complete census and is performed before this reduced contraction branch. This is a static implementation audit; a longer certified endpoint still needs its completed receipt or deliberate checkpoint.

The repaired baseline conditioned run is accepted at its sampled numerical scope. Reading its `sample64001-dense64001` / `profile16001` conditioned receipt and hashing the frozen auditor with `shasum -a 256` both give `c74eafdbac5e91ba219175da2a735bec393b2cf471316b397889fe59018ccc67`. Diff inspection against the subsequently updated live auditor shows only added event-germ receipt metadata; the numerical algorithm is unchanged. All recorded shared endpoints have zero time gap and zero velocity jump. Two declared sample bridges have gaps approximately $3.015\times10^{-10}$ and $10^{-12}$, with velocity changes approximately $2.270\times10^{-9}$ and $-1.470\times10^{-9}$; these remain supplied interpolated portions rather than independently certified event solutions.

Across the receipt's ten cutoff windows, every census probe and quadrature call rejected positive off-diagonal delays at or below $2\times10^{-9}$. The minimum recorded admitted delay is $6.000006106537947\times10^{-9}$, strictly above that guard. Geometric monotone-sector exclusion records 6746 diagonal identifications in each window. The first finest integral residual is $-3.46688975270959\times10^{-12}$; the largest absolute finest residual among the remaining windows is $7.039540174738623\times10^{-12}$. Incoming/recent clock consistency has maximum discrepancy $3.695124880717655\times10^{-19}$, and the later witness discrepancy is $6.57756652309304\times10^{-19}$, by the receipt's independently integrated clock comparison. These measured facts support the supplied-history integral audit at those probes, quadrature refinements and positive cutoffs. They do not enclose the continuous minimum delay, certify singular endpoints, or connect the record to the exact held release.

The tighter-flow conditioned audit is also accepted at the same sampled scope. Its receipt and frozen auditor both hash to `42f4411d07eacb6b877d872d551826a2e5ffd8a7f393cc72d2ce3e6af16329b2`. It records $B=7.602902579068553$, $C=0.9983084878382132$, source-cell length $0.000999959007241813$, and discarded event slope $1.3322676295501878\times10^{-15}$. Its minimum sampled admitted delay is $6.000001976595032\times10^{-9}$; all shared time gaps vanish, while one shared velocity difference is $-1.6940658945086007\times10^{-21}$, within the explicit $10^{-14}$ matching tolerance. The first finest integral residual is $1.2118262773461175\times10^{-11}$ and the largest absolute later residual is $4.40607587307712\times10^{-12}$. The first residual does not improve monotonically with tighter flow tolerances; the observed supplied-history verification accuracy remains approximately $10^{-11}$.

## Completed retained prefix and auxiliary acceptance

The completed retained receipt `20261003T204525.534568Z/certificate.json` and its frozen subject have SHA-256 `d7c39588af7c57f5cec1805d488c5b60cf8f7528892d5c68282c88b3b39623b5`, verified by receipt inspection and `shasum -a 256`. An independently written exact-Fraction receipt checker first passed a known constant-velocity cell and rejected a known contraction violation, then checked the target's 21,801 cells. It checked time chaining, matching endpoint/next-initial intervals, all contraction products below $1/2$, complete subfield velocity tubes, positive source derivatives, whole-cell Picard inclusions, and exact rational integral endpoint containment. All checks passed before the failed next cell. The certified full-law endpoint is

$$
T=\frac{771154223}{65536000},\qquad x\in[0.679425564539,2.025202618723],\qquad v\in[-0.999999972380,-0.333306168559].
$$

The next attempted tube extends below $v=-1$ and fails its full-history subfield hypothesis. This is an enclosure failure at a broad uncertainty tube, not a certified first speed birth or a physical obstruction.

The auxiliary receipt `20261003T210245.901805Z/certificate.json` and frozen subject hash to `639333eb4b0e654f2c52874301a2d42be57117d0b9de4c226356563ed065b021`; its input subject identity matches the retained receipt above. Its 538 accepted cells were checked by a separate exact-Fraction receipt instrument, after that instrument passed a known positive source-gap case and rejected a zero-gap case. All accepted auxiliary cells have positive receiver tubes, velocity magnitude below two, negative acceleration, source times wholly before the retained endpoint, positive delays/derivatives, strict newly emitted clock separation, and contractions below $1/2$.

The auxiliary evaluates a partner-only fixed-past ordinary equation. Original $Q$ sources lie below $Q(T_c)<T_c<P(T)$; new positive-position sources have $Q(S)<S\leq T<P(T)$, excluding the opposite partner direction. The per-cell retained lower bound on newly emitted $P$ exceeds the receiver $Q$ target, excluding new sources in the retained partner direction. This supplies the complete partner census. Before a first receiver speed birth the self census is empty, so the auxiliary agrees with the full law up to that birth. After a birth it intentionally omits new self rows and cannot serve as full-law evolution.

The auxiliary ends at $806412591/65536000$ with `crossed=False`, and its next receiver position tube includes zero. It supplies no first-birth bracket. Its endpoint velocity interval includes values on both sides of $-1$, so its accepted partner-only prefix must not be relabeled as an exact full-law prefix beyond the certified subfield endpoint. Both completed runs preserve their explicit failure records and frozen source identities.

## Polynomial-defect audit findings pending repair

The new rational quintic defect subject was inspected independently. Its source inverse derivatives and displayed acceleration first/second derivative formulas are algebraically correct. Nonzero source-cell joins are $C^2$ by construction, so the resulting acceleration derivative remains continuous and piecewise second derivative bounds can be integrated. Two event-domain issues must nevertheless be repaired before accepting a target defect certificate.

At source time zero, the held reference acceleration is zero while the released reference has a nonzero right acceleration. When a source interval crosses zero, the arriving acceleration derivative therefore jumps. A second-order Taylor defect bound using only bounded source jerk omits that jump. Such cells need a first-order residual bound using a whole-cell acceleration-derivative bound, or a rigorously isolated split at the source join.

In addition, a reference position interval of one sign can have an exact bootstrap tube that crosses contact. The ordinary same-sign inverse-clock error bound then does not cover a possible opposite-sign actual partner root. The contact bootstrap must be selected from the expanded reference-plus-error position tube, or the ordinary coefficient must explicitly dominate the opposite-sign bound $2k|\delta x|/m^2$ with the corresponding coverage argument. The unmodified ordinary coefficient approaches $k/m^2$ near contact and need not dominate that bound. These are proof defects in the certificate, not established defects in the underlying exact trajectory.

The held-oscillator known control should also compare against adjacent alternating partial sums enclosing the analytic solution, rather than one finite partial sum presented as the truth. The independent forced-majorant reference above remains available for propagation validation. No target from the unrepaired defect implementation is accepted here.

## Repaired polynomial-defect candidate and supplemental acceptance

The repaired defect subject selects contact error propagation using the expanded reference-plus-error tube, uses a first-order defect bound across source time zero, and checks adjacent alternating truth intervals in its oscillator control. Those repairs resolve the event-domain findings above. Its interval formulas for source inverse derivatives and arriving acceleration derivatives were independently checked algebraically. At nonzero source knots its $C^2$ center matching permits integration of piecewise second derivative bounds; at the held/released source join it now retains the required first-order treatment.

The completed candidate is `.local-data/collinear-research/linear-exact-release-defect/20261003T210816.461108Z/certificate.json`, with frozen subject hash `3d8467be8daf47fce99b538cbdaf797f1b25c186dc499bc111732ccd44d69f97`, measured against its retained `subject.py`. Its ordinary existence-contraction coefficient originally reused the reference source acceleration bound. That coefficient is valid for the actual-versus-reference error estimate but, by itself, does not bound the derivative of a fixed exact-past source in the existence contraction. Exact past acceleration must be bounded separately.

For this frozen candidate the gap was discharged by an independent exact-Fraction receipt calculation, rather than by changing either reference history or recorded target. The calculation first passed a known stronger-contraction formula and rejected a known long-cell contraction failure. It then checked all 3498 target cells for time chaining, nondecreasing position/velocity error radii, strict centered map inclusion, positive clock floors, radii below the bootstrap tube, nondecreasing domain acceleration bounds, actual map acceleration below its domain bound, and the recorded contraction products. The 3489 separated-source cells additionally passed the stronger bound

$$
h\left[1+k\left(\frac1{mD_*}+\frac{\Delta_*M_*}{mD_*^2}\right)\right]<\frac12,
$$

where $D_*$ is the recorded source-local floor, $M_*$ is the recorded nondecreasing domain acceleration bound, and $\Delta_*=\max(0,u-S_{\rm lo}+2\,\mathrm{tube}/m)$. Previously verified map acceleration bounds establish $M_*$ for the fixed exact history. The conservative root enlargement covers every source used in this estimate. The largest recomputed contraction product is approximately $0.01597979770418831$, well below $1/2$. Contact/current-source cells already use the exact domain acceleration bound in their hereditary contraction.

Accordingly this candidate is accepted with the supplemental independent contraction check. It encloses the exact-decimal release relative to its rational quintic center through $T=1747/256$, with endpoint position error at most $0.0005837699565727$ and velocity error at most $0.0009973257297752$ by reading its retained rational radii and outwardly rounding when displayed. The next cell fails the $10^{-3}$ bootstrap tube, so no later defect prefix is accepted. The engineering defect in the subject's ordinary existence guard still requires repair for subsequent candidates; the supplemental check certifies this particular frozen candidate and does not automatically certify later runs.

## Conditional first-birth germ helper

The proposed first-birth helper has a valid weighted dissipation argument. In logarithmic source coordinate, write $r=\tau/q$, $z=y/q^2$, and let $d>0$ solve $d^2=BG_0+k+kB/d$. The fixed point is $r_*=B/d$, $z_*=d^2$. With $a_*=B/(2d^3)$ and $c=2k$, its Jacobian is $[[-1,-a_*],[c,-2]]$. In coordinates $(\sqrt c\,\delta r,\sqrt{a_*}\,\delta z)$ the off-diagonal part is skew and the symmetric part is $\operatorname{diag}(-1,-2)$, so its forward semigroup norm is at most $e^{-t}$.

Use the weighted norm $\sup_{0<q\leq q_0}\| (\sqrt c\,\delta r,\sqrt{a_*}\,\delta z)\|/(q/q_0)$. The stable past Green operator has norm $1/2$ in this space. Therefore the helper's conservative nonlinear derivative bound $\ell$ and forcing coefficient $F_1$ yield contraction product $\ell/2$ and endpoint error $F_1q_0/(2-\ell)$ when the proposed ball closes. Its interval square-root bounds, unique positive equilibrium bracket, source slope/clock Taylor remainders and old-row gradient bounds were checked algebraically. This proves a conditional local existence enclosure in the specified weighted class.

A caller still must certify the actual incoming $q_0$ source sector, its jerk bound, the complete regular old-partner chart over the receiver tube, and the exact incoming curvature/old-row equality. A known parabolic source case is an independent control, not a substitute for those premises on the held release. The helper has not been applied here to an accepted incoming target.

## One-sided boundary charts and improved defect prefix

The held-source inverse is exactly $S=L-\sigma/2$ for $L\leq\sigma/2$, with $S=0$ at equality; the emitted-side inverse can therefore retain the exact lower bound zero. A source derivative jump requires a first-order residual estimate only when the source interval strictly straddles zero. Touching zero at an evaluation endpoint admits the appropriate one-sided second-order estimate. Similarly, a reference position that touches contact at an endpoint permits the continuous extension $A=0$ of its interior acceleration row and one-sided derivative bounds. This extension adds no physical diagonal row. Strict reference sign straddles retain cancellation, and the actual expanded error tube still determines contact error propagation. A reference polynomial position range can use its exact endpoint values when its full-cell velocity bound has one sign.

The coupled hereditary majorant correctly inverts the positive two-component integral inclusion. Its matrix entries are $a_x=h^2L/2$, $b_x=h^2K_v/2$, $a_v=hL$, and $b_v=hK_v$. Positive diagonal minors and determinant make the inverse nonnegative. Passing $2L$ covers receiver and current-source position errors, while $K_v$ covers current-source velocity errors. Its source-delay bound additionally requires $2E_x^{\rm new}\leq\mathrm{tube}+E_x^{\rm past}$; the condition $E_x^{\rm new}<\mathrm{tube}$ alone does not imply this inequality.

The completed receipt `.local-data/collinear-research/linear-exact-release-defect/20261003T212059.227457Z/certificate.json` matches its frozen subject hash `8382bbc85ca89169c343106c0a3a8e4c296ad749d55a0e78bf9807722d56dd39`. An independent exact-Fraction calculation first reproduced the known coupled inclusion radii $1/179$ and $20/179$, and checked both an accepted and rejected source-delay guard. It then checked all 6069 target cells for time chaining, nondecreasing error radii and domain acceleration bounds, positive clock floors, errors below the bootstrap tube, acceleration invariance, contraction products below $1/2$, and explicitly recomputed strict cooperative/contact map inclusions. All nine noncontact hereditary cells satisfy the additional source-delay inequality, with the past radius reconstructed from the recorded reference-source upper endpoint and previous error sequence. The frozen subject's boundary charts were separately inspected against the one-sided argument above.

This receipt is accepted with that supplemental guard through $T=3033/256=11.84765625$. Its retained rational endpoint error radii give position error approximately $0.000870863704729$ and velocity error approximately $0.000998283622075$; these displayed decimal approximations are not the certificate bounds. The next cell fails the $10^{-3}$ bootstrap tube. This proves an ordinary exact-decimal release prefix and supplies no speed-birth or eventual-fate certificate. Future targets must enforce or independently discharge the source-delay guard.

## Local source sensitivity and completed ordinary prefix

Suppose the global positive clock floor has already isolated both actual and reference roots in one enlarged source interval. If the reference clock derivative minus the bootstrap velocity radius has positive lower bound $m_\ell$ on that same interval, the actual clock also has derivative at least $m_\ell$. The mean-value theorem at the reference root then gives $|\delta S|\leq(E_x^{\rm receiver}+E_x^{\rm source})/m_\ell$. Comparing source velocities at the actual and reference roots with reference acceleration bound $M_{\rm ref}$ gives

$$
|\delta A|\leq\left(\frac{k}{m_\ell^2}+\frac{k\Delta M_{\rm ref}}{m_\ell^3}\right)(E_x^{\rm receiver}+E_x^{\rm source})+\frac{k\Delta}{m_\ell^2}E_v^{\rm source}.
$$

The global floor remains necessary for the initial isolation and complete root census. It is not replaced by a source-local floor outside its certified interval. Fixed exact-past existence contraction uses the exact domain acceleration bound instead of $M_{\rm ref}$. For current-cell roots the revised instrument uses the unconditional shift allowance $2\,\mathrm{tube}/m_\ell$, removing the earlier supplemental current-radius guard.

The completed receipt `.local-data/collinear-research/linear-exact-release-defect/20261003T212800.961633Z/certificate.json` is accepted through $T=62/5$. Its frozen subject hash is `9b5e613ac0fd0544204f1aa7307cfc3249f23c590532cf55d989c5d8a7c0c54c`; both subject and retained reference bytes match their receipt hashes. The subject's recorded pretarget known controls include endpoint join/contact, local root interval, piecewise $C^2$ jerk jump, and the coupled matrix. The independent checking calculation first passed its exact coupled inclusion and local mean-value sensitivity controls before inspecting the target.

An exact-Fraction receipt calculation checked all 6352 cells: 6336 ordinary cooperative, nine hereditary cooperative, and seven expanded contact scalar. It verified chaining, nondecreasing radii and domain bounds, global/local clock positivity, bootstrap bounds, acceleration invariance, every strict map-inclusion margin, and every rational endpoint enclosure. It reconstructed the enlarged source intervals, past-error indices, local shifts, and velocity coefficients; ordinary history terms and exact-past existence contraction products agree exactly with their formulas. The maximum recorded contraction product is approximately $0.0874683523<1/2$, and the minimum global clock floor is approximately $0.00611008549>0$.

The endpoint position error radius is approximately $3.6680458914\times10^{-5}$ and velocity error radius approximately $2.03022137316\times10^{-5}$. Its rational endpoint enclosure displays approximately $x\in[0.8735983390440064,0.8736716999618346]$ and $v\in[-0.992910216725416,-0.9928696122979528]$. These decimal displays summarize the retained rational intervals. The instrument reaches the requested endpoint without a failure and proves a subcritical ordinary exact-decimal release prefix; it does not establish first birth or the eventual fate. The `source_delay_upper` field is overwritten by the existence-contraction delay in hereditary cells, so the check reconstructed the acceleration-error delay from source coordinates and the recorded velocity coefficient rather than treating that field as its provenance.

## Certified first speed event from the accepted prefix

The sharp partner-only auxiliary receipt `.local-data/collinear-research/linear-exact-release-enclosure/20261003T214224.058259Z/certificate.json` is accepted for its first-event purpose. Its geometry subject hash is `0fc753f2f2e3402c00b51b778b4671e63997addd8f2743ce1972debb1ae009fc`. The retained adapter hash is `37b05f9fb5647d5663f42227ea015bb729d026e07de5e4e3f316e3028597dcf5`, and accepted polynomial profile hash is `479dadde092276b05e2ef78b60b8e022d0ebce49917e973598e7dbab3534529d`. Independent byte checks verify that chain back to the accepted defect receipt and its frozen generation. The serialized 6352 error cells and endpoint intervals equal that accepted receipt. Static inspection verifies that the exact center reconstruction executes the unchanged generating center construction and serializes its rational coefficients, rather than refitting its past.

The adapter root inversion safely prunes uncertainty intervals using monotonicity of the actual certified clocks. It does not require the interval-envelope endpoints to be monotone. The geometry recorded independent affine, held-source and source-range interface controls before loading its target profile. After independent known interval-product, projection and lifted-scalar roundoff controls, an exact-Fraction calculation checked all 120 target auxiliary cells for positive receiver position, newly emitted partner exclusion, fixed source strictly before $T_0=62/5$, positive source denominator and delay, negative acceleration, contraction, and whole-cell Picard inclusion. Independent outward 96-bit arithmetic exactly reproduced its endpoint position and velocity intervals.

The incoming velocity at $T_0$ is strictly above $-1$, and the auxiliary endpoint velocity at $T=12.412$ is strictly below $-1$. The acceleration comparison bracket intersected with the last strictly subcritical marker and final time gives

$$
T_e\in[12.411829310011507,\;12.411934787687622]
$$

as an approximate display of the retained rational event interval. The auxiliary agrees with the full law until its first speed event: strict subcritical clocks exclude self roots; fixed-old-source and retained-new-source gaps exclude additional partner rows. Consequently this certifies existence and location of the exact first speed event. The partner-only auxiliary beyond that event is not accepted as a full-law continuation. The receipt also encloses the incoming acceleration magnitude in approximately $[0.597445709858,0.599340389904]$. An accepted birth germ still requires the actual incoming source sector, derivative bounds, and complete regular older-partner chart; the event bracket alone does not discharge those premises or establish eventual fate.

## Accepted first-birth input enclosure

The input receipt `.local-data/collinear-research/linear-exact-release-enclosure/20261003T214849.964424Z/certificate.json`, frozen subject hash `eeca25eb4e8b91841f6569758b5db9b11da1edd8a628ea45255b63b459510971`, is accepted at input-only scope. Independent byte checks bind it to the accepted first-speed receipt. The exact event position is enclosed by reconstructing the auxiliary integral position intervals and restricting them to the accepted event bracket. Any included auxiliary values beyond the actual event are enclosure padding, not an asserted full-law history.

For the fixed old-partner field $G=k(T-S)/(1+v(S))$, independent differentiation gives the valid bound $|G_T|+|G_X|\leq k(1/m+2/m^2+2\Delta M_s/m^3)$. Along the actual incoming receiver, $|v|<1$ gives $|S'|\leq2/m$ and hence the recorded incoming jerk bound. This latter premise applies only at or before the actual event; the receipt's larger auxiliary rectangle does not change that scope. The exact incoming curvature equals the event field value, $B=G_0$, since its sole incoming acceleration row is $-G$. Reusing the same interval for both parameters safely encloses that physical identity.

An independent exact-Fraction checking calculation first passed a stationary-source field-derivative control, then checked all field derivative bounds and 121 incoming blocks. Those blocks chain from $T_c^- -3$ through $T_c^+$, have positive receiver position and positive old-partner field, and their extrema equal the recorded $b_{\min},b_{\max}$. Integration from the actual event yields $b_{\min}q\leq p(q)\leq b_{\max}q$ for every required incoming source coordinate $q\leq3$. The contact-coverage requirement is strictly below three. The proposed future germ position rectangle stays positive, and its fixed-past inverse and source denominator bounds cover the old-partner chart for the proposed ball. The common $B,G_0$ interval is approximately $[0.5991509368156923,0.5992814784164139]$, with incoming jerk bound approximately $0.8949252849743882$ and old-field gradient bound approximately $0.9093135803765989$. The actual germ contraction and later contact/fold transfer remain separate targets.

## Conditional contact and inherited-fold transfer

The helper's contact/fold inequalities are valid given its explicit source-coverage premises. Before contact, $b_{\min}q\leq p(q)\leq b_{\max}q$ and $G>0$ give $w\geq\sqrt{k}\,q$ and $w\geq k\tau/b_{\max}$. Its upper acceleration bound gives $w\leq D_{\max}\tau$. Integrating $-x'=1+w$ yields the stated two quadratic contact-time bounds. The source clock drop is $\int_0^q p(s)\,ds=\int_0^\tau w(t)\,dt\leq x_c$, so its stated maximum incoming source coordinate follows.

After contact, while $w>0$, the receiver clock satisfies $Q'=2+w$. Its remaining inherited-fold clock gap is at most $\Delta$, so elapsed time is at most $\Delta/2$. The new opposite-direction partner source has denominator at least two and delay at most $|x|\leq Q-Q_{\rm contact}\leq\Delta$. Its positive acceleration is therefore at most $k\Delta/2$, and total velocity-deficit loss before the fold is at most $k\Delta^2/4$. The other partner direction and causal self rows are inward on this chart. A strictly positive contact deficit minus this loss closes the $w>0$ bootstrap. Complete incoming source coverage, the regular older-partner bound, the actual birth-to-contact history, and regular surviving rows at the fold remain necessary premises. Known prescribed profiles check this helper; they do not certify those premises for the held release.

## Conditional postfold clock route

The actual germ/contact/fold receipt `.local-data/collinear-research/linear-exact-release-enclosure/20261003T220451.911947Z/certificate.json`, frozen subject hash `342bc4599c9c01c7538d7574335fee33a4dfd7955dac709f640863b5ea2139f7`, is accepted and sharpens the valid earlier `215428.640613Z` receipt. The accepted actual input bounds give weighted germ error approximately $0.01405<0.1$ and contraction approximately $0.10325$. Away from its certified positive germ endpoint, the equations $\tau_q=p/\sqrt Y$, $Y_q=2pG+2k(\tau+q)$ give $Y\geq kq^2$ and bounded derivatives on the supplied compact precontact chart. Thus ordinary continuation cannot break down there and reaches a unique contact. Complete source ordering supplies precisely the old partner and incoming self before contact, and the two newborn inward partner rows, surviving inward self, and positive opposite-direction partner after contact. The strict deficit comparison prevents an intervening speed event.

At contact, $\int_0^{q_c}p=x_c-\tau_c$ gives sharper two-sided bounds on $q_c$. Direct integration of $Y_q$ gives $Y_c\leq2G_{\max}\Delta+kq_c^2+2k\tau_{\max}q_c$. The source-pair coarea bound is $k(q_c+\tau_c)(q_c+\tau_c+\Delta)/4$. Independent rational square-inequality controls preceded target calculations reconstructing the internal contact times, peak gap, source-coordinate bounds, contact energy, velocity bounds, fold deficit, surviving self denominator and acceleration bounds, source-pair impulse and projected fold endpoints. All those rational identities passed; subject and input hashes match their receipts.

The surviving self source remains within the accepted $q\leq3$ sector with a positive denominator floor, and the positive partner source stays in the actual birth-to-contact sector with denominator at least two. The disappearing pair has positive unequal one-sided quadratic curvatures, while its receiver clock derivative is $2+W>2$. Its finite coarea impulse and the regularized coupled fold chart therefore give finite position and velocity traces and entry into the regular two-row postfold chart. The accepted fold deficit interval displays approximately $[0.332443725222,3.310159685153]$. This certifies an admitted actual positive-trace birth continuation through contact and integrable fold passage. It supplies neither an upward event nor global fate by itself.

For further precontact sharpening, the exact correlation $Q=Q_c+2\tau+C$, $C\geq0$, gives $T\leq(Q+P_c)/2$, while positive position gives $T\geq\max(T_c,Q)$. Complete fixed old-source panels can therefore bound $G$ using those correlated reception times. The self term is at least $k/b_{\max}$, so a positive lower old-field bound yields $W_T\geq G_{\min}+k/b_{\max}$ and a tighter quadratic contact upper time. Iteration must cover the previous certified clock range before deriving each tightened bound; assuming the tightened range in advance would be circular.

The conditional recross fate proof extends to $\alpha,\beta\in C^{1,1}$ on its compact clock interval, with the stated uniform bounds on their values and first derivatives and bounded weak second derivatives. Taylor estimates follow from integral remainders; bounded-past contraction needs locally Lipschitz state derivatives; the incoming source estimates are $p(q)=Bq+O(q^2)$ and $p'(q)=B+O(q)$; regular endpoint persistence uses continuously differentiable dependence. These steps require no continuous pointwise second derivative. This is an explicit admissible regularity extension, not a claim that literal classical $C^2$ hypotheses hold unchanged.

The initial negative-transit receipt `220604.566741Z/certificate.json` under the exact-enclosure runtime owner, frozen subject hash `67b401d5d82f2d74c00e469cec1f954310bfb7bb08f9a4db41dcd43e745cd2e2`, is accepted. After a known exact $W'=1$ quadratic-transit control, independent rational calculations reproduce its inward acceleration floor, duration bound, self-source coarea bound, exit energy and time intervals. The complete two-row census follows from $Q(T)>P_c$, descending receiver $P$, prebirth self source, and postbirth partner source before the $P=Q(T_c)$ endpoint. It encloses that endpoint in approximately $T\in[13.061941198176212,15.906556655979285]$, $Y\in[0.4465919067913253,16.59153961570945]$.

The fixed prebirth panel receipt `.local-data/collinear-research/linear-exact-prebirth-profiles/20261003T220136.394801Z/panels.json`, frozen subject hash `08fa2290e26ecbda93e8ba73b708fad5540269277589e67c588ce73e8facca87`, is accepted at conditional two-retained-row scope. Independent affine coefficient controls precede exact checks of all 503 coefficient enclosures, weak derivative bounds, source denominator/delay floors, source coverage and frozen input hashes. Outward clock panels overlap by rounding and cover the declared interval without gaps; the sign-transition panel is retained. All selected source intervals lie at positive times, approximately between $5.85281930862175$ and $12.3999999999995$. The separately supplied negative-comparison theorem is valid, but its example receipt omits its input entry-time and entry-energy tuple; that example is not independently replayable from the receipt alone and is not an actual entry certificate.

The proposed `221029.432594Z` bridge to the fixed-panel top has a source-domain defect. Its target is $12.4-X(12.4)^+-10^{-12}$, below the guaranteed lower bound for the actual $Q(12.4)$. Its negative-partner source at the target therefore lies before $12.4$, contradicting the asserted source interval $[12.4,T_c]$. The claimed denominator floor obtained only from the velocity at $12.4$ does not cover that earlier source. The prefix adapter must enclose the near-endpoint earlier $Q$ inverse and its velocity floor, combined with the incoming auxiliary floor for later sources. The correlated precontact sharpening and initial negative transit are unaffected, but entry into the fixed-panel chart is not accepted from this bridge as written.

The `221442.464396Z` replacement repairs that denominator floor by covering the prefix source down to its enclosed $s_Q^-$, including an endpoint sliver controlled by accepted acceleration bounds. Its acceleration floor still subtracts $(T-12.4)/D_{Q,\min}$, however, rather than the necessary $(T-s_Q^-)/D_{Q,\min}$. An independent rational calculation finds an overstatement approximately $5.28716422438\times10^{-6}$; the corrected floor remains positive, approximately $0.672964896722315$, but the target bridge receipt is not accepted unchanged. The separate restricted contact/fold source selection is sound: each iteration retains every incoming block intersecting the previous certified source interval and accepts only a reduced upper source coordinate. Independent checks after a known rational-square control verify all selected block counts, acceleration minima, monotone previous bounds and final surviving self source/denominator formulas. These accepted upstream restrictions do not discharge the remaining bridge correction.

## Accepted exact-release connection to post-upward fate

The fully repaired geometry receipt `221650.985233Z/certificate.json` under the exact-enclosure runtime owner, frozen subject hash `e86325f02f1634fc46b8d6c4ee56f753dec93e44e697e988840682ed82aa1c0e`, repairs both bridge issues. It uses the combined certified prefix/incoming denominator floor and the earliest certified partner source in the positive-delay term. After an independent known quadratic-transit control, exact rational reconstruction matches its acceleration floor, width, duration, coarea, energy and time outputs. It certifies actual entry at the fixed-profile top with approximately $T\in[13.329642778119403,15.45113730346062]$, $Y\in[0.6603139260324872,8.385850934651353]$.

The 20-panel extension `.local-data/collinear-research/linear-exact-prebirth-profiles/20261003T221550.284623Z/panels.json`, frozen subject hash `8b2c7d109cc151cf3959deee163df2600cf52a8ae8d4351de30e2fdfe5884bfa`, is accepted. Independent affine controls precede checks of its positive-time source coverage, coefficient enclosures, all four weak derivative bounds, contiguous clock coverage and frozen hash. It extends the accepted fixed-source chart from $6.5$ down to $6.3$.

The final composition `.local-data/collinear-research/linear-exact-prebirth-profiles/final-transfer-221650/comparison.json` has checked hash `759252933778f451d77b163ec151640f3785d0b3f24130caade66a49ed5e0948` and frozen subject hash `ace75677ef071f991a3b3b0037c6f6525e0937d50fd54d3aef5b460ece9aed86`. Its copied geometry, original panels, extension panels and known-control hashes all match. Independent constant negative/positive acceleration and rational-square controls precede rational replay of its negative chain, every strict transition-support panel through the selected positive entry, and every direct-row positive-action and time-floor update. The transition's later failed support proposal is not used: the positive forcing starts at its preceding strictly supported state. The final proposed energy upper bound is approximately $-0.009254002325685162$. Adjustment for outward panel rounding still gives a negative proposal at the exact rational boundary $P=6.45$; the supported entry is strictly below exact $7.84$.

Consequently the actual continuation has a finite transverse first upward event with

$$
6.45<P_u<7.84,\qquad
14.470361503222314\lesssim T_u\lesssim22.119421355511644,
\qquad x_u\leq-6.630361503222313.
$$

The decimal time/position displays summarize the retained rational bounds. The event-region acceleration lower bound is approximately $1.1185621451863077$, strictly above the retained upper bound for $2\sqrt{k}$, approximately $1.070006748$. The conservative profile slope floor is approximately $0.2664810412443579>0$; the forcing panels themselves have the stronger minimum approximately $0.270542199733583$. The event time cap follows from the positive-entry time upper bound plus its deficit upper bound divided by the uniform acceleration floor. Its strict negative position and time cap were separately checked against the rational summary.

The full-law census holds throughout this composition. After the inherited fold, $Q(T)>P_c$ excludes all positive-direction partner roots. The globally increasing $Q$ gives a unique negative-direction partner. The prebirth increasing $P$ gives one earlier self source, while strict postbirth descent of $P$ excludes nontrivial later self sources at the current level; the $Q$ self equality is only the excluded receiver diagonal. The fixed source floors and positive delays remain certified. At the upward event only the two old rows survive, so exact incoming curvature is $B=H$. Positive-time source regularity supplies the $C^{1,1}$ profile extension established above. Strict event, slope, threshold and source margins, together with continuity and the event lying inside the available clock chart, give an interior compact neighborhood satisfying the global recross theorem's hypotheses.

**Derived decisive scope:** the exact held release admits smaller-family continuations after this certified upward event that never undergo a later position turn and continue for unbounded future time. It also admits the theorem's finite-event-accumulation construction with no finite acceleration trace at accumulation. Earlier ordinary turns in the release prefix are outside this post-upward no-turn statement. Neither result selects every continuation's fate, identifies the recorded numerical $c_0=-0.03$ history as one of the certified global members, nor establishes nonexistence in weaker absolutely continuous continuation classes.

On positive-time prebirth sectors, subcritical contacts and receptions of the source-release join leave acceleration continuous with bounded jumps in its derivative. Thus velocity is $C^{1,1}$ there, and regular source inverses with positive denominator floors give $C^{1,1}$ profiles: their first derivatives involve continuous source acceleration and their weak second derivatives involve its bounded almost-everywhere derivative. Their source-image jerk jumps need not be excluded from the clock neighborhood. The original emission time zero is different: acceleration jumps from zero in the held past to $-k$ after release, so profiles crossing its clock images may have first-derivative jumps and need a weaker extension. The $C^{1,1}$ argument alone does not cover $P(0)=1/2$ or $Q(0)=-1/2$. A clock interval such as $[6.5,11.55]$ avoids those two values, provided its actual selected inverse sectors remain regular and positive-time. Those source-sector premises and all threshold/census requirements still need certification for any application.

On a complete two-row postfold chart set $W=-1-v>0$, $Y=W^2$, and $L=P(T)$. Then $L'=-W$, $W'=-A$, and $dY/dL=2A$. If the partner source satisfies $s_Q>s_P$ and $D_Q\geq D_P>0$, the two delay magnitudes and reciprocal denominators give $A=k[(T-s_Q)/D_Q-(T-s_P)/D_P]<0$. A postbirth partner source with $D_Q>2$ and prebirth self source with $D_P<2$ suffices. Positive source positions and monotone source clocks give the required source ordering on the selected sectors.

An entirely negative-acceleration band preserves $W\geq W_{\rm fold,min}$, bounding its duration by clock width divided by that floor. Dropping the positive partner term bounds growth of $Y$ by $2k\int_{s_{\rm low}}^{s_{\rm high}}(T_{\rm upper}-s)\,ds$, using the self-source coarea identity $dL=D_P\,ds$. Both source limits and the reception-time upper bound must be enclosed on the actual chart.

On a later band with $\alpha\geq0$, a positive uniform bound $A\geq\alpha_{\rm lower}T_{\rm entry,lower}+\beta_{\rm lower}>0$ reduces $Y$. A cumulative lower acceleration integral $2\sum A_{\rm lower}\Delta L$ greater than the entry $Y$ upper bound forces the first upward event before chart exit. The duration is at most $\sqrt{Y_{\rm entry,upper}}/A_{\min}$. Intermediate bands must retain a strict lower bound on $Y$ to exclude an earlier upward event; this obligation cannot be replaced by the later positive-band test. Connection to the global smaller-family theorem further requires a uniform event bound $H>2\sqrt{k}$ on every possible event location, a positive $\alpha$ neighborhood, regular incoming source sectors, and the complete census. These are valid sufficient inequalities, not a certificate that the exact release reaches their required charts.
