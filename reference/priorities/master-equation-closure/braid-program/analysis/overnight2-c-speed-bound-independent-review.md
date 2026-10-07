# Independent reconstruction of the equal-radius lower-speed restriction

## Verdict

**Derived verdict:** the [frozen speed-bound corollary](overnight2-c-equal-radius-speed-bound.md) is correct. Under the complete equal-radius three-neutral-antipodal-pair assumptions, with distinct simultaneous positions, unchanged logarithmic reception, $K_{\log}=c_f=1$, and $0<v\le1$, exact circular balance necessarily satisfies

$$
2v^2(1+v)>1.
$$

In particular $v>9/16$. No defect was found. The restriction is necessary only: it supplies no exact configuration, stability statement, or exclusion of alternating configurations above the threshold. It does not apply without further work to unequal-radius configurations or superfield histories.

## Independent reconstruction

The independently checked [polarity-order theorem](overnight2-c-polarity-order-independent-review.md) excludes every nonalternating distinct equal-radius configuration from exact balance. Thus an exact configuration must alternate. Fix any positive receiver and list the five other members in increasing clockwise separation $0<\beta_1<\cdots<\beta_5<2\pi$. Reversing a cyclic traversal preserves alternation, so the signs in this clockwise order are exactly $-,+,-,+,-$. These are all five partners, including the receiver's own negative antipode; none may be omitted or added a second time.

The independently reconstructed [complete angle chart](overnight2-c-equal-radius-chart-independent-review.md) supplies one ordinary root per directed partner, no positive self roots, and radial contribution $q_iq_jR_v(\beta)/(2a)$, where

$$
R_v(\beta)=\frac1{1-v\cos(\alpha(\beta)/2)},\qquad
R_v'(\beta)=-\frac{v\sin(\alpha/2)}{2D^3}<0.
$$

Therefore $R_1>R_2>R_3>R_4>R_5>0$, abbreviating $R_k=R_v(\beta_k)$. Grouping the complete radial sum into two adjacent differences and its last term gives

$$
2aA_r=-(R_1-R_2)-(R_3-R_4)-R_5<-R_5.
$$

Every distinct partner has $0<\alpha<2\pi$. Since $v>0$, this implies $\cos(\alpha/2)>-1$ and $0<D<1+v$, even at $v=1$. Taking positive reciprocals gives $R_5>1/(1+v)$. Consequently

$$
2aA_r<-\frac1{1+v}.
$$

The prescribed circular radial acceleration is $A_r=-v^2/a$. Substitution yields $-2v^2<-1/(1+v)$. Multiplying by minus one reverses the inequality, and then multiplying by the positive factor $1+v$ gives the asserted strict cubic condition. The common radius cancels; this is a speed restriction and does not require choosing $a=1$.

## Exact threshold and rational check

Define $p(v)=2v^2(1+v)$. Its derivative $p'(v)=4v+6v^2$ is strictly positive for $v>0$, while $p(0)=0$ and $p(1)=4$. Thus $p(v)=1$ has a unique positive root $v_*$ inside $(0,1)$, and the necessary condition is exactly $v>v_*$. Direct rational arithmetic gives

$$
p(9/16)=2\left(\frac9{16}\right)^2\frac{25}{16}
=\frac{2025}{2048}=1-\frac{23}{2048}<1.
$$

Monotonicity then excludes every $0<v\le9/16$, including equality, and places the sharper threshold strictly above $9/16$. No rounded cubic root is needed. This is a hand-derived exact arithmetic check; no new numerical instrument was run. The static case $v=0$ is already excluded by the separate neutral-circle radial sum and is not smuggled into a derivative argument requiring $v>0$.

## Verification boundary and falsifiers

The proof uses radial balance alone, but depends on the complete partner/self census and the prior independently reconstructed alternation restriction. It imposes no additional source selection, response factor, coefficient fit, or continuation rule. Distinctness provides strict ordering and interior emission angles; coincident labels are outside its scope. The closed wake-speed boundary remains within scope because those partner roots are ordinary. A uniform unequal-radius neighborhood requires separate estimates.

A counterexample to the alternating clockwise sign sequence, the strict ordering of $R_v$, the complete five-row count, or the inequality after substituting $A_r=-v^2/a$ would overturn this proof. An exact distinct equal-radius configuration with $2v^2(1+v)\le1$ would falsify the conclusion. Sampled signs or a failure to find equilibria above the threshold cannot strengthen it.

## Provenance and execution

The frozen subject SHA-256 measured by `shasum -a 256` was `90702ad7b739a6f4844ab84739456e438b6d7f9aa217641f22456b5a92cc380f`. Only this new review was written for this corollary. The subject, previous proofs and reviews, main report, shared owners, and production code were unchanged. No Python check, numerical search, background worker, Git mutation, or recursive delegation was used.

The second C allocation retains launch 2026-10-07 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC. This completes the assigned sequential review queue; the parent owns integration and selection of further authorized work.
