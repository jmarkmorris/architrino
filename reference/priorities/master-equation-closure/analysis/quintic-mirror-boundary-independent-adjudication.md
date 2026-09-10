# Independent adjudication of the quintic mirror-boundary construction

## Verdict and scope

Accept the local existence theorem and the upgrade to uniqueness among the stated regular mirror continuations of the fixed quintic candidate. The contraction is not the sole uniqueness argument: positivity of the complete candidate acceleration first forces every continuation in the stated class to cross speed one, after which the exact incoming self-root equation forces its acceleration to tend to the same positive endpoint value. Each such solution therefore enters the contraction region after its interval is shortened. This proves uniqueness of the local outgoing history germ, meaning agreement on some common interval immediately after the event.

The [subject](quintic-mirror-boundary-assessment.md) requires no mathematical correction to Sections 2–6 at that scope. The conclusions remain conditional on using the unadopted [quintic lineage candidate](diagonal-birth-lineage-causal-wake-candidate.md) and the exact accepted [stationary incoming history](../evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md). Numerical samples are not substituted for that history. The [unchanged-law obstruction](../../../office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md) is preserved: the candidate changes the open-side self-row weight, which is precisely a premise of that obstruction.

| Statement | Verdict | Accepted boundary |
| --- | --- | --- |
| The retained incoming acceleration is positive and continuously differentiable near the terminal event. | Accept — derived | The terminal partner emission is after the initial activation corner, as shown below from the specified input. No right-side acceleration is used. |
| The unknown outgoing displacement determines a complete local self and partner census. | Accept — derived | On a sufficiently short increasing super-field mirror segment: one old partner root and one diagonal-born self root per receiver, with complete complements. |
| The self contribution is the displayed quintic expression, with bounded displacement derivative on the quadratic region. | Accept — derived | Every displacement in that region is covered, including the interval between two trial values; a full rectangular neighborhood is not covered. |
| The acceleration-function iteration has a unique fixed point. | Accept — derived | A sufficiently short interval with the stated partner, range, active-lineage, self-map, and contraction bounds. |
| Every regular mirror continuation described in Section 6 enters this region. | Accept — derived | Continuous endpoint velocity, local absolute continuity on the open side, the complete candidate equation almost everywhere, and no added singular update are indispensable. |
| Uniqueness extends from the iteration space to those regular mirror continuations. | Accept — derived | Uniqueness as a local history germ. A universal duration or a common numerical interval is not established. |
| Arbitrary nonsymmetric continuations, singular-update histories, all future mirror motion, or passage through release are unique. | Reject as an inference from this theorem | These are outside the proven hypotheses and are not claimed by the subject. No counterexample to their uniqueness is asserted. |
| The candidate removes the sharp self-measure divergence on this solution. | Accept — derived, conditional on the candidate | The self acceleration is quadratic in time after birth and its measure is locally integrable. |
| Regulator independence, physical adoption, conserved accounts, or general boundary closure follow. | Reject as an inference; unresolved as separate obligations | Fixed-equation uniqueness does not provide a convergent family of regulated operators or an account map. |

The mathematical acceptance below rests on independent reconstruction of the causal equations, signs, estimates, and endpoint argument. Subject test results are not mathematical evidence for this review. Only this adjudication and its assigned scratch directory are authored; the subject, candidate, incoming and accepted references, earlier population proposal, and shared trackers remain read-only.

## 1. The exact incoming data and their regularity

Set $c_f=1$ and translate the accepted receiver-speed event to $T=0$. The persistent mirror positions are $\mathbf X_-(T)=-q(T)\mathbf e$ and $\mathbf X_+(T)=q(T)\mathbf e$, with inward speed $u=-q'$. The fixed incoming functions are $q_-,u_-$ on the complete past. They obey

$$
q_-(0)=q_*>0,\qquad u_-(0)=1,\qquad
0\le u_-(s)<1\quad(s<0).
\tag{1}
$$

For the event's partner emission $p_*<0$, put $R_*=-p_*$, $d_*=1-u_-(p_*)$, and $a_*=K/(R_*^2d_*)$. The accepted incoming chart gives $R_*,d_*,a_*>0$. The equal polarity magnitudes in the specified input give the same positive reduced coefficient $K=0.2862286103053385$ for a partner magnitude and a self magnitude. The numerical terminal estimates are not needed in this proof.

Let $t_a<0$ denote the original activation time after translating the event. Before $t_a$, the input is stationary with half-separation $1/2$ and speed zero. While a partner emission still belongs to this stationary segment, the exact incoming equations are

$$
u'=\frac{K}{(q+1/2)^2},\qquad q'=-u,
\qquad
u^2=2K\left(\frac{1}{q+1/2}-1\right).
\tag{2}
$$

The identity follows by integrating $u\,du/dq=-K/(q+1/2)^2$ from $q=1/2,u=0$. At positive $q$ it gives $u^2<2K<1$. Therefore the partner emission at the positive-separation event $u=1$ cannot still be in the stationary segment or at its endpoint: $p_*>t_a$. This separation uses the specified exact input and the inequality $K<1/2$, rather than the oracle's rounded emission time.

On the evolved incoming interval after activation, the right-hand side $K/[R^2(1-u(p))]$ is continuous as long as its positive range and transmitter margins hold. Thus $u_-'$ is continuous there. The initial activation may have an acceleration jump, but $p_*$ is separated from it. Near the terminal reception, differentiation of the simple partner equation samples $u_-'$ only near $p_*$, where it is continuous. Consequently $a_-(s)=u_-'(s)$ is continuously differentiable near $s=0$ on the incoming side. This also explains why merely saying the terminal row is finite would not have sufficed to bound its derivative.

Choose a fixed incoming interval $[-\eta,0]$ and constants

$$
0<a_0\le a_-(s)\le a_1,\qquad |a_-'(s)|\le L.
\tag{3}
$$

They exist by positivity and one-sided continuous differentiability of the specified history. No numerical enclosure for their values or the final lifespan is asserted. Define, for $0\le y\le\eta$,

$$
\alpha(y)=a_-(-y),\qquad
w(y)=1-u_-(-y)=\int_0^y\alpha(v)\,dv,\qquad
\phi(y)=\int_0^y w(v)\,dv.
\tag{4}
$$

Integration of (3) gives

$$
a_0y\le w(y)\le a_1y,\qquad
\frac{a_0y^2}{2}\le\phi(y)\le\frac{a_1y^2}{2},\qquad
\phi'(y)=w(y)>0\quad(y>0).
\tag{5}
$$

These are bounds on the incoming history alone. The inverse $y=\phi^{-1}(z)$ exists for small $z\ge0$, but $dy/dz=1/w(y)$ is singular at zero. Any existence argument must control that singular inverse rather than applying a smooth-ODE theorem at the event without a domain estimate.

Claim grade: derived on the fixed accepted incoming chart. Falsifiers: an error in (2), a terminal partner emission at or before activation compatible with $q_*>0$ and $u=1$, or loss of the positive regular margins used to differentiate the incoming row. The numerical incoming record by itself does not certify a continuum regularity bound.

## 2. Complete roots, signs, and local lineage

Represent the unknown outgoing history by

$$
q(T)=q_*-T-z(T),\qquad u(T)=1+z'(T),\qquad z(0)=z'(0)=0.
\tag{6}
$$

For the left label write $x=-q$, its scalar inward coordinate, and $H(v)=x(v)-v$. At an incoming time $s=-y$, equation (4) gives

$$
H(-y)-H(0)=\phi(y),
\qquad H(T)-H(0)=z(T).
\tag{7}
$$

The entire incoming $H$ decreases strictly with time, since $H'=u_--1<0$. In the stationary remote past it tends to positive infinity. Therefore if $0<z(T)<\phi(\eta)$, the incoming self condition $H(s)=H(T)$ has exactly one root, at $s=-\phi^{-1}(z(T))\in(-\eta,0)$. Every incoming time $s\le-\eta$ has $H(s)-H(0)\ge\phi(\eta)$ and belongs to a root-free complement.

If $z$ increases strictly on the outgoing segment, $H$ increases there, so no self emission in $[0,T)$ can match $H(T)$. The structural point $s=T$ is excluded. All these chords point inward because the full scalar path $x$ is nondecreasing. Thus for the single actual self root,

$$
y=\phi^{-1}(z),\quad \delta=T+y,\quad
D_{t,\mathrm s}=w(y)>0,\quad
D_{r,\mathrm s}=-z'(T)<0.
\tag{8}
$$

The partner residual on the fixed incoming history is

$$
F(T,z,p)=q_*-2T-z+q_-(p)+p.
\tag{9}
$$

Its derivative in $p$ is $1-u_-(p)>0$. The simple event root at $p_*$ persists in a fixed negative-time bracket; strict monotonicity excludes any other incoming partner root. For new emissions $0\le s<T$, choose the interval so $q(v)\ge q_*/2$ throughout and $T<q_*/2$. Then $q(T)+q(s)-(T-s)>q_*/2>0$, excluding all new partner roots. This exclusion does not require $u>1$ and will be used in the endpoint bootstrap.

The complete post-birth census is one partner and one self row for each receiver. The partner row points inward because opposite polarity reverses its outward source-to-receiver direction. The self row points inward because self polarity is positive and the old same-label position lies outward. Negative self playback reverses emission traversal, not the acceleration direction.

For increasing positive $z$, the single self graph $(T,-\phi^{-1}(z(T)))$ is connected, has only the diagonal endpoint $(0,0)$ in its birth closure, and is simple at every $T>0$. These facts establish the local diagonal incidence required by the candidate's gate. The two mirror labels have different event positions, $\pm q_*\mathbf e$, and different ordered self channels. Shared reception time therefore does not identify their event owners. This is a local mathematical incidence certificate, not a general lineage classifier or a theorem about later mergers and release.

Claim grade: derived under the stated short-interval and monotonicity conditions. Falsifiers: a second zero of (7) or (9), a zero in either displayed complement, or an opposite self acceleration sign with the same persistent polarity. Section 4 below establishes monotonicity for every continuation in the reviewed regularity class; it is not silently assumed for the uniqueness upgrade.

## 3. Independent reconstruction of the candidate operator

On the collinear self row, the candidate's transverse-velocity term in $G_t$ vanishes. The source acceleration projected along the self direction is the fixed incoming $\alpha(y)$, giving $G_t=-\alpha(y)$. Its dimensionless coordinate is $\varrho=\delta\alpha(y)$ in units $c_f=1$. On the active diagonal-born lineage before release, multiplication of the canonical row $K/(\delta^2w)$ by $\varrho^5$ gives exactly

$$
S(T,z)=K\frac{(T+y)^3\alpha(y)^5}{w(y)},\qquad
y=\phi^{-1}(z),\qquad \varrho<1.
\tag{10}
$$

All acceleration cached in this expression is sampled at $s=-y<0$. It is not the unknown outgoing acceleration. The partner gate remains ordinary, so

$$
P(T,z)=\frac{K}{R^2d},\qquad
R=T-p(T,z),\quad d=1-u_-(p(T,z)),\qquad
z''=P+S.
\tag{11}
$$

The implicit equation (9) gives $p_z=1/d$ and $p_T=2/d$. Differentiating (11) in $z$ therefore gives

$$
P_z=K\left(\frac{2}{R^3d^2}+\frac{a_-(p)}{R^2d^3}\right).
\tag{12}
$$

Positive $R,d$ on a compact local bracket and continuous incoming acceleration make this bounded. The same reasoning makes $P_T$ bounded. In particular, $P(0,0)=a_*$ and $P$ stays positive in a full small neighborhood of the event's current state.

For the self derivative, first differentiate (10) in $y$ and then divide by $\phi'(y)=w(y)$. The result is

$$
S_z=K\left[
\frac{3(T+y)^2\alpha^5}{w^2}
+\frac{5(T+y)^3\alpha^4\alpha'}{w^2}
-\frac{(T+y)^3\alpha^6}{w^3}\right].
\tag{13}
$$

This includes all three changes: delayed range, incoming source acceleration, and the transmitter factor, using $w'=\alpha$. The sign of $\alpha'$ is not assumed. Formula (13) agrees with the subject by direct differentiation, not by an instrument that imports the subject's implementation.

The rectangular-neighborhood limitation is real. At fixed $T>0$ and $z\downarrow0$, $y\sim\sqrt{2z/a_*}$, while (10) has leading behavior $K a_*^4T^3/y$. It diverges. Thus local smoothness on $T>0,z>0$ does not extend to an ordinary smooth initial-value problem on a full rectangle containing $(0,0)$. The constrained contraction domain and the proof that solutions enter it are both necessary parts of the theorem.

Claim grade: derived conditional on the frozen candidate gate and profile. Falsifiers: failure of the candidate substitution (10), either derivative (12)–(13), or a bounded limit at fixed positive $T$ as $z$ tends to zero. No finite diagonal value is assigned by these calculations.

## 4. Every continuation in the stated regular class enters the quadratic region

Consider any mirror continuation on $[0,h)$ that has continuous velocity at zero, locally absolutely continuous velocity on $(0,h)$, and satisfies the complete candidate equation almost everywhere with no added singular update. The position is the integral of that velocity and inherits the incoming endpoint. Complete admission and the candidate gate are part of being a solution: an undefined quarantined row cannot simply be set to zero.

Continuity gives $u>0$ and $q>0$ on a sufficiently short segment. The partner argument in Section 2 already supplies one ordinary positive row, uniformly bounded below by $p_0>0$. Every possible self chord is inward because all incoming and current short outgoing velocities are nonnegative. Every defined candidate self weight is nonnegative, irrespective of whether crossing has been proved. Hence, before making any use of the special formula (10),

$$
u'(T)\ge p_0\quad\text{almost everywhere}.
\tag{14}
$$

Local absolute continuity permits integration between any two positive times. Letting the earlier time decrease to zero and using $u(0)=1$ gives

$$
u(T)-1\ge p_0T,\qquad
z(T)=\int_0^T(u(r)-1)\,dr\ge\frac{p_0T^2}{2}.
\tag{15}
$$

No integrability of the initially unknown acceleration across zero has been assumed. The integral of $u-1$ exists because velocity is continuous. More generally (14) makes $u$ increasing between any two positive times, so $z'>0$ and $z$ increases. This now supplies the monotonicity needed for the exact one-self-root census. It also excludes a waiting segment at speed one.

Since $z(T)\to0$, its root $y=\phi^{-1}(z(T))$ tends to zero. Equations (5) and (15) give $y\ge\sqrt{p_0/a_1}\,T$, or $T\le C y$. Consequently $\varrho=(T+y)\alpha(y)\to0$, so the lineage is active and unreleased after shortening the interval. Equation (10) is now justified, not assumed in order to establish crossing. It yields

$$
0\le S(T,z(T))
\le\frac{K(1+C)^3a_1^5}{a_0}y^2
\le\frac{2K(1+C)^3a_1^5}{a_0^2}z(T)
\longrightarrow0.
\tag{16}
$$

The partner row tends to $a_*$ by continuity. Thus the actual equation has a bounded continuous right-hand side near zero, tending to $a_*$. It is continuous at positive times because the roots are simple and the incoming functions are regular. For $0<a<T$, local absolute continuity gives $u(T)-u(a)=\int_a^T(P+S)\,dr$. Boundedness allows $a\downarrow0$, giving an absolutely continuous extension across zero. Since the integrand extends continuously, the outgoing velocity is continuously differentiable and

$$
u'(0^+)=a_*,\qquad z(T)=\frac{a_*}{2}T^2+o(T^2).
\tag{17}
$$

This is the needed upgrade. The subject does not have to assume continuous outgoing acceleration or a quadratic birth class: it derives them from the complete positive ledger and the candidate. It would be invalid to remove local absolute continuity and rely only on an almost-everywhere derivative, because that would allow velocity changes not represented by the integral equation. It would likewise be invalid to add an event-supported jump and call it a solution of the same initial-value problem. Those exclusions are already explicit in the subject's reviewed class.

Claim grade: derived for precisely this regular mirror class. Falsifiers: an admitted solution with a negative self contribution, failure of the positive partner lower bound, failure of (15) under local absolute continuity and endpoint continuity, or failure of the endpoint limit (16). A history with an additional singular update or nonsymmetric geometry does not test this claim.

## 5. The fixed point and the scope of uniqueness

Let $a_{\rm lo}=a_*/2$ and $a_{\rm hi}=3a_*/2$. On $[0,\varepsilon]$ let $\mathcal B$ consist of continuous accelerations $b$ with $b(0)=a_*$ and $a_{\rm lo}\le b\le a_{\rm hi}$. This is nonempty and closed in the uniform norm. A uniform Cauchy sequence of its members has a continuous pointwise limit, with the same endpoint and inequalities, so the space is complete. Define

$$
z_b(T)=\int_0^T(T-r)b(r)\,dr.
\tag{18}
$$

Equations (5) and (18) imply

$$
\frac{a_{\rm lo}T^2}{2}\le z_b(T)\le\frac{a_{\rm hi}T^2}{2},
\qquad
\lambda T\le y_b(T)\le\Lambda T,
\quad
\lambda=\sqrt{a_{\rm lo}/a_1},\quad
\Lambda=\sqrt{a_{\rm hi}/a_0}.
\tag{19}
$$

All constants depend only on the fixed incoming functions and local bounds. Taking $\varepsilon$ small ensures $y_b<\eta$, $q_b>0$, retention of the partner bracket, and $(1+\Lambda)a_1\varepsilon<1$. Thus every trial path has the complete census and remains before release.

Substitution into (10) gives $0\le S\le C_ST^2$, where $C_S=K(1+\Lambda)^3a_1^5/(a_0\lambda)$. Substitution into (13), for $T\le\varepsilon_0$, gives

$$
|S_z|\le K\left[
\frac{3(1+\Lambda)^2a_1^5}{a_0^2\lambda^2}
+\frac{5(1+\Lambda)^3a_1^4L\varepsilon_0}{a_0^2\lambda^2}
+\frac{(1+\Lambda)^3a_1^6}{a_0^3\lambda^3}\right]=L_S.
\tag{20}
$$

The powers of $T$ cancel in the first and third terms; the middle term has one remaining factor $T$, bounded by $\varepsilon_0$. For each fixed reception, every displacement between two trial values stays in the same interval (19). The mean-value bound therefore gives a genuine Lipschitz constant, not merely a derivative sampled on one selected path. Let $L_P$ be the bound from (12).

Define $\mathcal T b=P(T,z_b)+S(T,z_b)$ for $T>0$ and $(\mathcal T b)(0)=a_*$. This endpoint value is the limit of the open-side sum, with vanishing self contribution; it does not add a diagonal row. Uniform continuity of $P$ and the quadratic self bound allow

$$
|P(T,z_b)-a_*|\le a_*/4,\qquad
C_S\varepsilon^2\le a_*/4.
\tag{21}
$$

They make $\mathcal T b$ continuous and keep it between $a_*/2$ and $3a_*/2$, so the map preserves $\mathcal B$. Double integration gives

$$
\|\mathcal T b-\mathcal T c\|_\infty
\le\frac{(L_P+L_S)\varepsilon^2}{2}\|b-c\|_\infty
=\theta\|b-c\|_\infty.
\tag{22}
$$

All required inequalities can hold simultaneously: they are finitely many strict small-interval requirements with positive fixed margins and finite constants. Choose also $\theta<1$. Iterating $\mathcal T$ then gives a uniformly Cauchy sequence because its successive differences are bounded by a geometric series. Completeness and (22) give a fixed point. Two fixed points have distance at most $\theta$ times that distance and hence are equal. This reconstructs the existence and uniqueness argument without presuming a smooth vector field at the singular corner.

The fixed point produces $z\in C^2$, $u=1+z'>1$ for $T>0$, and the full mirror candidate solution. Section 4 proves that any other solution in the stated regular mirror class has a continuous acceleration tending to $a_*$. After shortening its interval, that acceleration belongs to $\mathcal B$ and its twice-integrated position has form (18). It is therefore a fixed point of the same map and agrees with the constructed solution on a common short interval.

The distinction in the review request is resolved affirmatively but at local scope: uniqueness is not confined to the originally chosen iteration set. It extends to every continuation in the explicitly stated regular mirror class as a germ. The argument does not give a uniform lifespan over arbitrary incoming histories, a numerical value of $\varepsilon$, an asymmetric uniqueness theorem, or uniqueness after release or another singular event.

Claim grade: derived conditional on the frozen candidate and fixed incoming record. Falsifiers: violation of the full interval derivative bound (20), a trial image outside $\mathcal B$ despite (21), two fixed points satisfying (22) with $\theta<1$, or a solution meeting Section 4's conditions but not entering $\mathcal B$ on any short interval.

## 6. Birth asymptotics and the unchanged-law comparison

From incoming $C^1$ acceleration, $\alpha(y)=a_*+O(y)$, $w(y)=a_*y+O(y^2)$, and $\phi(y)=a_*y^2/2+O(y^3)$. Bounded first derivatives of $P$ and $S=O(T^2)$ give $b(T)=a_*+O(T)$, and hence $z=a_*T^2/2+O(T^3)$. Equation (19) first controls the inverse uniformly; comparing the two quadratic expansions then yields

$$
y=T+O(T^2),\quad \delta=2T+O(T^2),\quad
D_t=a_*T+O(T^2),\quad\varrho=2a_*T+O(T^2).
\tag{23}
$$

In (13), the first and third leading coefficients are respectively $12Ka_*^3$ and $-8Ka_*^3$, while the middle term is $O(T)$. Together with (10) this independently gives

$$
S=8Ka_*^4T^2+O(T^3),\qquad
S_z=4Ka_*^3+O(T).
\tag{24}
$$

The corresponding self contributions to speed and position are $8Ka_*^4T^3/3+O(T^4)$ and $2Ka_*^4T^4/3+O(T^5)$. They are terms within the solved complete equation, not an independently prescribed partner-only comparison trajectory. No braking or rebound occurs on this interval because both rows remain inward.

Differentiating $\phi(y(T))=z(T)$ gives $y'=z'/w$, so $d\delta/dT=(w+z')/w$. The exact candidate self measure is consequently

$$
S\,dT=\frac{K\delta^3\alpha(y)^5}{w(y)+z'(T)}\,d\delta
=\left[Ka_*^4\delta^2+O(\delta^3)\right]d\delta.
\tag{25}
$$

It is locally integrable. By contrast, the unchanged sharp self measure on any genuine continuous crossing is

$$
A_{\rm sharp}\,dT=\frac{K}{\delta^2(w+z')}\,d\delta.
\tag{26}
$$

As the delay decreases to zero, $w+z'$ tends to zero and is positive; in particular it is below one on a short interval. The measure then exceeds $K\delta^{-2}d\delta$, which has divergent integral at zero. The quintic candidate multiplies this open-side measure by $\delta^5\alpha^5$. Thus (25) changes the premise responsible for (26); it is not a counterexample to the unchanged-law obstruction or a choice of a value at the excluded endpoint.

Claim grade: derived for the stated asymptotics and measure comparison. Falsifiers: a different leading coefficient from substitution into the exact operator, nonintegrability of (25), or a finite integral for (26) with all unchanged rows and the same crossing retained.

## 7. What this acceptance does not supply

The local graph certificate permits the frozen candidate's birth gate to be evaluated on this particular mirror solution. It supplies no general event classifier, continuation across release, or rule for a root interval. The [accepted finite-event self-boundary review](mec-008-self-complement-independent-adjudication.md) remains at its conditional scope: its delay-floor and fold estimates do not construct the missing unchanged-law outgoing solution. This candidate theorem does not alter that verdict.

Fixed-equation uniqueness also does not establish regulator independence. If some independently defined approximation operators $\mathcal T_n$ had fixed points $b_n\in\mathcal B$, then (22) would give

$$
\|b_n-b\|_\infty
\le\frac{\sup_{c\in\mathcal B}\|\mathcal T_n c-\mathcal T c\|_\infty}{1-\theta}.
\tag{27}
$$

This follows by adding and subtracting $\mathcal T b_n$ and moving the contraction term to the left. The subject correctly identifies (27) as a sufficient defect estimate, not an established approximation theorem. No approximation family, invariance of $\mathcal B$ for that family, or vanishing operator defect has been supplied. Root lineage and the fifth power of sampled incoming acceleration make convergence of coordinates alone insufficient for that missing conclusion.

The candidate's shell-account sector remains rejected at its recorded assumptions. Nothing in the local solution constructs energy, momentum, or angular accounts. Physical adoption, general MEC-002/MEC-003 closure, solver integration, probability, and nonsymmetric continuation remain unsupported by this review.

Proposed coordinator integration: “Independent adjudication accepts the quintic assessment's local fixed-point construction and its upgrade to uniqueness among all explicitly stated regular mirror continuations of the exact candidate on the fixed stationary incoming record. Incoming regularity, complete self/partner complements, local diagonal incidence, the three-term self derivative, and the contraction bounds reconstruct correctly. Positivity of the complete row sum proves crossing and forces any competing regular mirror solution into the same quadratic region; uniqueness is therefore a local history-germ result rather than only uniqueness among selected trial paths. The candidate remains unadopted. The unchanged sharp-law obstruction, general lineage and release problems, regulator-independence obligation, failed account sector, and nonsymmetric problem remain unchanged.”

Recommendation to the coordinator: integrate this bounded mathematical acceptance while retaining the broader continuation block. A subsequent regulator claim must identify a concrete approximation family and prove the premises of (27), or an appropriate weaker compactness and limit-equation argument. The theorem itself does not justify adopting a new boundary law. No operator decision is needed to finish this authorized review.

## Evidence and validation record

The subject was copied and hashed before its mathematical read. The candidate, incoming owner and ledger, machine receipt, accepted self-boundary review, and the existing first-boundary and unchanged-law proofs were then frozen before their detailed use. `shasum -a 256` recorded the following source identities in `.tmp/quintic-mirror-boundary-review/input-digests.sha256`; copies are retained in its `frozen/` directory.

| Read-only input | SHA-256 |
| --- | --- |
| `quintic-mirror-boundary-assessment.md` | `d629d3313cbb5008d04ac659a0c92c4cab85a03d4bd362ccdd25a90f1174b0f5` |
| `diagonal-birth-lineage-causal-wake-candidate.md` | `172be639eabfa186ee30403511ba5a641f50a6968db9c5c6528e726c80b18978` |
| `mirror-close-approach-causal-root-boundary.md` | `00db04b895b4b22eec7103bbb424d22b423e56ef1701b48c5da23f20a1e90781` |
| `mec-008-self-complement-independent-adjudication.md` | `7f99ab6d7c705fea2465159b3658c4ef374ad68306d3c3b10a3e1978442fabbb` |
| `mec-007-stationary-mirror-incoming-ledger-2026-09-02.md` | `be1e5fb35ba705830df5fb4b240d6eade499da6e30816374608dd3a524d0ce34` |
| `mec-007-stationary-mirror-incoming-oracle.v1.json` | `7ee71e43d1b0e9dadd19e6241d04788b58ec33b6cacc94a2bd5bcb2a50d5c05d` |
| `master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md` | `b68a3abb1e022876399ec6a303ce6de9c28c8e5309813f31c7b04f47ab2acd35` |
| `master-equation-field-speed-first-boundary-self-root-topology-2026-07-29.md` | `5a4fcb571f4d27a775c0aa28d4f6a70a6dd5084209cf2dbbb56a095dbbf44352` |

Independent evidence consists of (2), the complete scalar root comparisons, direct differentiation (12)–(13), the endpoint argument (14)–(17), the complete-space contraction (18)–(22), and the asymptotic and measure calculations (23)–(27). No numerical outgoing path, invented geometry, new candidate, standard-physics premise, or subject test pass is used to establish these mathematical implications. The review does not reproduce the incoming oracle's numerical values or claim a numerical lifespan.

Before its first target run, `node .tmp/quintic-mirror-boundary-review/check.mjs known` passed the prescribed two-formula, one-file-link control, ignored a fenced unmatched dollar, and rejected an invalid macro and trailing whitespace. The checker is a task-local copy of an existing scratch syntax checker with only its target path changed; the original is unchanged. Final target and frozen-input checks establish their declared markup and preservation scopes only. No Python, solver run, generated write, Git index or publication action, worktree, or downstream task is part of this review.

Measured validation: `node .tmp/quintic-mirror-boundary-review/check.mjs target` passed 200 KaTeX expressions, five relative file targets, balanced dollar delimiters, and no trailing whitespace. File-target checking does not resolve anchors or inspect browser layout. `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings, and 30 notes. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/quintic-mirror-boundary-independent-adjudication.md` emitted no whitespace diagnostic and returned 1 for the new-file difference. `shasum -a 256 -c .tmp/quintic-mirror-boundary-review/input-digests.sha256` returned `OK` for all eight frozen live inputs. These checks support markup and input preservation; the independent derivations above carry the mathematical verdict.
