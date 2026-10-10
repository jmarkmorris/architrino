# Can the canonical all-future slow-pair dispersal proof be extended to the delayed Weber law? A feasibility assessment

**Status: written 2026-10-09 at the operator's direction as the second follow-up to the Codex review of the Weber investigations; an assessment by one session; Codex reviewed it on 2026-10-09, independently transcribed the implicit mirror law and its second-order correction, and accepted the feasibility verdict at inferred grade with three qualifications, which are incorporated below. That review covers the formal algebra only, not the estimates.** This document carries out inquiry P-W-2 of the [follow-up inquiries](../../brainstorming.md#weber-follow-ups-from-the-2026-10-09-review--selected-by-the-operator-carried-out-one-at-a-time). It asks whether the accepted canonical theorem that a slow mirror pair disperses for all future time can be carried over to the frozen [Section 9a law](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation). It proves no such theorem. It reads the canonical proof step by step against the Section 9a law, derives the two structural facts on which an extension would rest, and lists what would still have to be proved. No equation is changed, no history is evolved, and nothing is adopted into canon. The [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) remains the baseline.

## 1. Result in brief

The structural route of the canonical proof appears reusable for the Section 9a law if the new hypotheses and estimates listed in Section 5 are established. Two structural facts make that plausible: the Section 9a acceleration is exactly a scalar multiple of the canonical one, and along solutions that scalar differs from one at second order by a radial term that vanishes at $\mathbf e=\mathbf 0$, the leading central circular comparison state. A proof does not follow from smallness of the difference alone, and the canonical preparation class cannot be carried over verbatim. Eight specific burdens remain, of which two are substantive: local well-posedness of the Section 9a law, which needs a stronger hypothesis on the recent past and an explicit treatment of acceleration jumps, and a recomputation of the constants that decide whether the eccentricity seed survives, which may lower the admitted speed ceiling. The assessment is therefore "feasible, with a stated remaining proof burden", at inferred grade. The scalar alignment is derived exactly; the second-order form of the scalar is a formal expansion.

## 2. The two laws in the canonical proof's variables

The canonical theorem is the [wider all-future slow-binary dispersal regime](slow-binary-wider-regime.md), accepted at derived grade by its [independent adjudication](slow-binary-wider-regime-independent-adjudication.md) for the complete supplied mirror histories and $0<\epsilon\le1/2000$. It builds on the [signed polar subject](slow-binary-polar-remainder-and-fate.md) and its [adjudication](slow-binary-polar-independent-adjudication.md). All four are inputs here and are unchanged.

Its variables are these. $K>0$ is the coupling, $R_0>0$ a reference radius, $v_0^2=K/(4R_0)$ and $\epsilon=v_0/c_f$. The scaled member position is $\mathbf Y=\mathbf X_+/R_0$ and the scaled time is $s=v_0T/R_0$; the partner is at $-\mathbf Y$. With $r=|\mathbf Y|$, $\mathbf n=\mathbf Y/r$, $\mathbf t=\hat{\mathbf z}\times\mathbf n$, the radial and transverse scaled speeds are $p=\mathbf Y'\cdot\mathbf n$ and $q=\mathbf Y'\cdot\mathbf t$, the angular quantity is $h=rq$, and $\mathbf e=\mathbf Y'\times(h\hat{\mathbf z})-\mathbf n$ is the eccentricity coordinate. The partner hit received at $s$ was emitted at $\sigma<s$; $\mathbf S=\mathbf Y(s)+\mathbf Y(\sigma)$, $R_d=|\mathbf S|$, $\mathbf N=\mathbf S/R_d$, $D=1+\epsilon\,\mathbf N\cdot\mathbf Y'(\sigma)$, and the delay is $u=s-\sigma=\epsilon R_d$. The canonical row is

$$
\mathbf Y''=-\frac{4\,\mathbf N}{R_d^2D}.
$$

In the same variables the Section 9a law of the [pair investigation](weber-delayed-pair-investigation.md), Section 2, reads

$$
\mathbf Y''=-\frac{4\,\mathbf N}{R_d^2D}\;B,\qquad
B=1-\frac{(1-p_b)^2}{2}+\epsilon^2\frac{R_d}{D}\Big[\mathbf N\cdot\big(\mathbf Y''(s)+p_b^2\,\mathbf Y''(\sigma)\big)+\frac{|\mathbf w_\perp|^2}{R_d}\Big],
$$

where $p_b=(1-\epsilon\,\mathbf N\cdot\mathbf Y'(s))/D$ is the rate at which the emission time advances, $\mathbf w=\mathbf Y'(s)+p_b\mathbf Y'(\sigma)$, and $\perp$ denotes the part perpendicular to $\mathbf N$. The bracket $B$ contains the receiver's present acceleration and the partner's acceleration at emission, which for a mirror pair is minus the receiver's own acceleration at $\sigma$. Solving for the present acceleration divides the component along $\mathbf N$ by $1+2\epsilon^2/(rLD^2)$ with $L=R_d/(2r)$, a number slightly above one.

## 3. Two structural facts

**Fact 1 (exact scalar alignment).** For every admissible state, the Section 9a acceleration equals the canonical acceleration multiplied by one real number $B$. The alignment is exact. The sign of $B$ is a separate matter: invertibility of the present-acceleration solve does not make the right-hand scalar positive, so $B>0$ has to be proved as a uniform bound on the class considered. Where such a bound holds, the exact torque of the canonical proof keeps its sign:

$$
h'=\mathbf Y\times\mathbf Y''\cdot\hat{\mathbf z}=B\;\frac{4\,r\,r_\sigma\sin(\theta-\theta_\sigma)}{R_d^3D},
$$

and the transverse component of the acceleration is $B$ times the canonical one. That it then obeys a uniform remainder bound carrying the factor $q$ that vanishes at large radius, as the canonical proof requires, needs in addition a uniform bound on $B$ and the canonical source-window hypotheses; alignment alone does not supply that estimate. Grade of the alignment: derived, from the form of the law and of its implicit solve, whose matrix is the identity plus a positive multiple of $\mathbf N\mathbf N^{\mathsf T}$ ([Lemma 2.2](weber-delayed-pair-investigation.md#2-the-law-on-one-pair)). Falsifier: a subfield mirror state on which the solved Section 9a acceleration has a component perpendicular to $\mathbf N$.

This matters because the canonical proof turns on two things that an arbitrary small perturbation would destroy: the sign of the torque, which makes $h$ increase, and the anisotropy of the remainder, whose transverse part must carry the factor $q$. The canonical subject says of its own estimate that replacing the transverse bound "by an absolute isotropic error would destroy the ensuing uniform elongated-history estimate". A multiplicative scalar that is uniformly positive and bounded preserves both; establishing those bounds is burden 3 of Section 5.

**Fact 2 (the change at second order is radial only, and vanishes at $\mathbf e=\mathbf 0$, the leading central circular comparison state).** Two statements with different domains are involved. The first is kinematic. On any regular prescribed slow mirror history, the bracket evaluated with that history's own accelerations is

$$
B=1+\epsilon^2\big(4\,r\,r''-2p^2\big)+O(\epsilon^3).
$$

This is the Section 9 bracket in scaled variables, which the Section 9a bracket matches through second order by Theorem 4.2 of the pair investigation. The second statement is dynamical. On a solution of the law in the canonical provisional class the radial acceleration is $-1/r^2$ at leading order, so $r\,r''=r\,\mathbf Y''\cdot\mathbf n+q^2=q^2-1/r$ to that order, and the scalar obtained by solving the implicit law is

$$
B=1+\epsilon^2\Big(4q^2-2p^2-\frac4r\Big)+O(\epsilon^3).
$$

The second form is a formal expansion along solutions. It is not an identity for prescribed histories. A prescribed scaled circle of radius one traversed at angular rate one half shows the difference, as Codex pointed out in review: its kinematic bracket is exactly one at every $\epsilon$, while $4q^2-2p^2-4/r=-3$ there, because that circle is not a solution. The check of Section 6 tests the kinematic form only. Along solutions the canonical signed row changes formally as follows:

$$
A_r=-\frac{1+\epsilon p+\epsilon^2\big(\tfrac72q^2-2p^2-\tfrac4r\big)}{r^2}+\ldots,\qquad
A_t=\frac{\epsilon q+\epsilon^2pq}{r^2}+\ldots
$$

against the canonical $A_r=-(1+\epsilon p-\epsilon^2q^2/2)/r^2$ and the same $A_t$. The transverse row is unchanged through second order, because the bracket's correction multiplies a transverse term that is already first order. In the canonical window variables $P=hp=-e_t$ and $Q=hq=1+e_n$, the added radial coefficient is $(4Q^2-4Q-2P^2)/h^2=(4e_n+4e_n^2-2e_t^2)/h^2$. It is zero when $\mathbf e=\mathbf 0$, which is a comparison state of the leading central dynamics and not an exact solution of the law (none exists at or below the wake speed, by the [circle exclusion](weber-scalar-multiplier-circle-exclusion.md)), and at most $22|\mathbf e|/h^2$ in size on the canonical provisional class $|\mathbf e|\le3$. Grade: the kinematic form is derived at second order and was checked numerically on prescribed histories (Section 6); the dynamical form is a formal expansion along solutions whose algebra Codex transcribed independently; no remainder bound is derived for either. Falsifier of the kinematic form: a prescribed smooth mirror history on which the exact bracket differs from $1+\epsilon^2(4rr''-2p^2)$ by more than a multiple of $\epsilon^3$. Falsifier of the dynamical form: a solution in the provisional class whose solved scalar differs from the displayed expression at second order.

This matters for the decisive step of the canonical proof. There the second-order drive of the scaled eccentricity is a polynomial $\mathcal P$ with $|\mathcal P+\mathbf t/2|\le8|\mathbf e|$: a constant part $-\mathbf t/2$, which a corrector removes, plus a part proportional to $|\mathbf e|$, which a Gronwall estimate absorbs. The Section 9a change adds $(4e_n+4e_n^2-2e_t^2)\,\mathbf t$ to $\mathcal P$. At this formal level the constant part is unchanged, so both canonical correctors are unchanged, and only the Lipschitz constant grows, from $8$ to at most $30$. That the change vanishes at that state is not an accident: the bracket equals one exactly on any prescribed rigid circle.

## 4. Step-by-step reading of the canonical proof

Each row names a hypothesis or step of the canonical proof, says what the Section 9a law does to it, and classifies it as **unchanged**, **new estimate needed**, or **hypothesis must change**. The reading found no step that must fail. That is weaker than showing that each step succeeds: the route appears reusable if the hypotheses and estimates marked below are established.

| Canonical step | Under Section 9a | Classification |
| --- | --- | --- |
| Complete uniform speed and root margins: one partner root, no own-past root, both root factors above $1-\beta$, delay bounds (subject Section 1) | These are statements about paths with a uniform speed bound and do not involve the law. The canonical hypothesis bounds the scaled past speed by two for every $s\le0$, which is a uniform margin of the kind the [2026-10-09 corrections](../../analysis/weber-review-corrections-2026-10-09.md#4-w4-hypotheses-that-the-proofs-use-accepted) require | Unchanged |
| A priori acceleration bound $\lvert\mathbf Y''\rvert\le(1+\beta)^2/((1-\beta)r^2)$ read off the explicit row | The row is implicit and samples the acceleration at emission. The bound must be closed by induction over the method of steps: the delayed acceleration enters with coefficient $2\epsilon^2p_b^2/(rLD^2+2\epsilon^2)$, at most about $8.2\epsilon^2$ on the provisional class, so the induction is a contraction. The bracket satisfies $\lvert B-1\rvert\le C\epsilon^2/h^2$ with $C$ near $100$ once the bound holds | New estimate needed; no obstruction seen |
| Local existence and uniqueness by a contraction that needs only Lipschitz source velocity; the supplied past is continuous in position and velocity, with $W^{2,\infty}$ data on $[-7\epsilon,0]$ | Section 9a samples the source acceleration. The only local theorem available, [Theorem 5.3](weber-delayed-pair-investigation.md#5-history-domain), assumes a past with Lipschitz second derivative, and its author marks the bookkeeping across breaking points as the step to check most closely. Bounded measurable acceleration is not enough for its Picard argument, because the right-hand side composes the acceleration with a root that depends on the unknown | Hypothesis must change: Lipschitz second derivative on the recent window, or a new existence proof in the weaker class. The canonical $W^{2,\infty}$ class cannot be carried over verbatim. An acceleration that is Lipschitz between jumps is not Lipschitz across them, so the continuation argument must treat explicitly the reception times at which a source time crosses a jump |
| Bounded recent history and the release seam: an acceleration jump at release is admitted and integrated; seam bound $\lvert\mathbf z(\theta_*)-\mathbf c_*\rvert\le100\epsilon^2$ | The jump is still admitted, but under a neutral law it recurs at each breaking point, reduced each time by the factor above ([Proposition 5.2](weber-delayed-pair-investigation.md#5-history-domain)). The canonical estimates are integral and supremum bounds, which tolerate jumps. In the release layer the bracket is bounded but not signed, because it samples the supplied recent acceleration (bounded by eight); it adds a term of order $\epsilon^2$ to a remainder that is already of that order, over an angle below $12\epsilon$ | New estimate needed (constants of the first-order row and of the seam) |
| Positive torque: exact identity, hence $h$ increases | Fact 1: the identity acquires the factor $B$ | Sign kept provided a uniform bound $B>0$ is proved; constant in $0<h'\le2\epsilon h/r^2$ to be rechecked with the factor $1+O(\epsilon^2)$ |
| Acceleration over the whole causal window, including the delayed acceleration: $\lvert\mathbf Y''(a)\cdot\mathbf n+1/r^2\rvert\le40\alpha/r^2$ and $\lvert\mathbf Y''(a)\cdot\mathbf t\rvert\le6\epsilon q/r^2$, obtained from the equation at the source and at the source's source, with no derivative of the acceleration | The same device works, and Section 9a needs it twice: once as in the canonical proof, and once to evaluate its own bracket, which contains $\mathbf N\cdot\mathbf Y''(\sigma)$. A bound on the delayed acceleration in the reception axes to relative accuracy $\alpha$ is what fixes the bracket to third order without any bound on the rate of change of acceleration. The equation at the source needs only a bound, not a signed value, for the acceleration one level further back, which the supplied recent past provides | New estimate needed (constants $40$ and $6$; coverage of source levels to be restated) |
| Geometry of the implicit root: $L$, $\mathbf N$, $D$ and the amplitude $H=L^{-2}D^{-1}$ to third order (subject Section 3) | Purely geometric given the integrated component bounds; the law enters only through those bounds | Unchanged in form; constants follow from the previous row |
| Signed row with anisotropic remainder, $\lvert Q_r\rvert\le1400\epsilon^3/(r^2h^3)$, $\lvert Q_t\rvert\le30\epsilon^3q/(r^2h^2)$ | Fact 2 changes the radial second-order coefficient and leaves the transverse row unchanged through second order. The transverse remainder keeps its factor $q$ by Fact 1 once $B$ is uniformly bounded, and grows by about $\lvert4Q^2-4Q-2P^2\rvert\le98$, to roughly $130$. The radial remainder needs the third-order terms of the bracket, which involve $p_b$, the delayed range and the delayed acceleration | New estimate needed (third-order bracket remainder; both constants) |
| Signed seed and correctors: constant drive removed by two correctors, Gronwall coefficient $10$, accumulated error below $800\epsilon^2$ against a seed above $0.998\epsilon$ | Fact 2: correctors unchanged; Lipschitz constant $8\to30$ at most, so the Gronwall coefficient rises to roughly $32$ and the cubic constant $1900$ rises with the new remainders. A rough count gives an accumulated error near $900\epsilon^2$ before the cubic constant is recomputed, against an available margin of about $1078\epsilon^2$ at $\epsilon=1/2000$ | New estimate needed; the ceiling $1/2000$ may have to be lowered |
| No exit from the provisional class, finite total angle, radius tending to infinity, radial velocity limit (subject Section 5) | These use $h_\theta\ge0.99\epsilon$, the seed bounds, $\lvert\mathbf Y''\rvert<1.01/r^2$, $0<(h^4)'\le128\epsilon$ and step-by-step continuation. The first four follow from earlier rows with adjusted constants; the last needs the local theorem of the third row at a closed finite endpoint | Unchanged in logic; depends on the third row |

## 5. Remaining proof burden

In the order in which a proof would need them:

1. **Local well-posedness in a stated class.** Fix the preparation class, most simply the canonical one with a Lipschitz second derivative on the recent window, and prove existence, uniqueness and continuation there for the neutral law, including the bookkeeping across breaking points. The canonical $W^{2,\infty}$ preparation class cannot be kept as it stands. Because the release jump recurs, the acceleration is only piecewise Lipschitz, and the argument must handle each reception time at which a source time crosses a jump; Theorem 5.3 of the pair investigation describes this in prose and does not settle it. This is the one burden that is not a matter of constants.
2. **A priori acceleration bound** by induction with the contraction coefficient of Section 4.
3. **Uniform bracket bounds**, including $B>0$, on the provisional class.
4. **Component bounds on the causal window** re-derived for the Section 9a acceleration, with the source levels each bound relies on stated explicitly.
5. **The bracket to third order** with an explicit remainder, using the component bounds in place of any bound on the rate of change of acceleration.
6. **The signed row** with its two remainder constants.
7. **Release layer and seam** with the bounded, unsigned bracket of the layer and the recurring acceleration jumps.
8. **Seed survival** with the new Lipschitz and cubic constants, and the resulting speed ceiling.

Items 2 to 8 are quantitative. The reading above found no place where they must fail, and Facts 1 and 2 are the reason. It did not carry any of them out, so their success is inferred, not derived.

## 6. Checks performed

The script [weber-9a-scaled-bracket-check.mjs](../evidence/weber-9a-scaled-bracket-check.mjs), written for this document, evaluates the exact Section 9a bracket on prescribed planar mirror histories in the scaled variables, with the partner root found by bisection and verified by its arrival residual, and compares it with $1+\epsilon^2(4rr''-2p^2)$. These are prescribed histories with their kinematic accelerations, not solutions.

| Case | Result |
| --- | --- |
| Known case, run first: rigid circle at $\epsilon=0.02$ and $0.005$ | Exact bracket minus one is $0$ to machine precision, as it must be; the prediction is also exactly one; root residual at most $4.4\times10^{-16}$ |
| Target: non-circular history 1 at $s=0.4$; $\epsilon=0.04,0.02,0.01,0.005$ | $\lvert\text{exact}-\text{predicted}\rvert/\epsilon^3=0.821,\ 0.797,\ 0.783,\ 0.776$; second-order part $-0.3011$ |
| Target: non-circular history 1 at $s=2.1$ | $0.324,\ 0.356,\ 0.370,\ 0.377$; second-order part $-0.7385$ |
| Target: non-circular history 2 at $s=1.3$ | $0.340,\ 0.366,\ 0.379,\ 0.385$; second-order part $-0.4318$ |

The scaled difference settles to a constant as $\epsilon$ is halved, so the prediction is correct through second order on these histories. Claim grade: measured, by the named script in double precision on three states of two prescribed histories. It checks the coefficients $4$ and $-2$ of the kinematic form and the mirror transcription of the law into the canonical variables. It does not test the dynamical substitution $rr''=q^2-1/r$. It does not test any estimate of Section 4 and establishes nothing about solutions.

No other calculation was run. In particular the constants quoted in Section 4 for the Section 9a case ("about $8.2\epsilon^2$", "near $100$", "roughly $130$", "roughly $32$", "near $900\epsilon^2$", "about $1078\epsilon^2$") are hand estimates from the canonical bounds $|P|\le3$, $0<Q\le4$, $r\ge h^2/4$, $h\ge0.99$, made to judge feasibility. They are not certified and must not be quoted as results.

## 7. Claims, grades, falsifiers and boundaries

| Claim | Grade | Falsifier |
| --- | --- | --- |
| Fact 1: Section 9a acceleration is the canonical acceleration times one real factor $B$ | Derived | A subfield mirror state whose solved acceleration has a component perpendicular to $\mathbf N$ |
| Fact 2, kinematic form: $B=1+\epsilon^2(4rr''-2p^2)+O(\epsilon^3)$ on a regular prescribed slow mirror history | Derived at second order; measured on prescribed histories; remainder not bounded | A prescribed smooth mirror history on which the scaled difference of Section 6 grows as $\epsilon$ decreases |
| Fact 2, dynamical form: $B=1+\epsilon^2(4q^2-2p^2-4/r)+O(\epsilon^3)$ along solutions in the provisional class; the added radial coefficient vanishes at $\mathbf e=\mathbf 0$ | Formal expansion along solutions; algebra independently transcribed by Codex; not an identity for prescribed histories; remainder not bounded | A solution in the provisional class whose solved scalar differs from this form at second order |
| The constant part of the second-order eccentricity drive, and hence both canonical correctors, are unchanged | Formal consequence of the dynamical form of Fact 2 and the exact eccentricity identity of the canonical subject | An explicit second-order polar expansion of Section 9a whose drive at $\mathbf e=\mathbf 0$ differs from $-\mathbf t/2$ in the canonical normalization |
| The structural route appears reusable if the hypotheses and estimates of Section 5 are established; the canonical preparation class cannot be carried over verbatim | Inferred, from a reading of the proof by one session; Codex agrees with the verdict at this grade | Any item of Section 5 shown to fail, for example a preparation in the stated class with two continuations, or a seed error exceeding the seed at every positive speed ceiling |

Boundaries. A completed extension would cover sufficiently slow mirror preparations of the canonical class with stronger recent regularity, possibly below a smaller speed ceiling. It would not cover the eccentric preparations of the instantaneous bound class examined in the pair investigation, whose release eccentricity is not of order $\epsilon$; it would not cover the first proposed adaptation, whose direction differs from $\mathbf N$ and to which Fact 1 does not apply as stated; and it would say nothing about histories that are not mirror pairs. Until it is carried out, the statement that no bound class survives under Section 9a remains an inference over the preparations examined, exactly as recorded in the 2026-10-09 corrections.

## 8. Sources read

The [wider-regime subject](slow-binary-wider-regime.md) in full; the verdicts and structure of its [adjudication](slow-binary-wider-regime-independent-adjudication.md), of the [signed polar subject](slow-binary-polar-remainder-and-fate.md) and of its [adjudication](slow-binary-polar-independent-adjudication.md); Sections 2, 4 and 5 of the [pair investigation](weber-delayed-pair-investigation.md), which contain the implicit solve, the second-order theorems and the history domain. The signed polar subject and the two adjudications were not read line by line; the wider-regime subject restates the steps it takes from them, and the reading above follows that restatement. The earlier proposal for this inquiry cited the [radial global continuation](alternatives-screen-2026-10-05-radial-global-dispersal.md) as the canonical theorem; that document concerns a different radial response, and the citation is corrected in the brainstorming record. No source was changed.
