# A tangent-projection obstruction at a curved wake-speed arrival

## Question, fixed laws and status

**Status: candidate derivation awaiting independent assessment.** Package C of the [launched investigation](../../analysis/authorized-cases-ten-hour-codex-investigation.md) asks which part of the known collinear continuation obstruction depends on the line. This note tests that dependence analytically. It assigns no new endpoint to the existing perturbed logarithmic spiral and introduces no new preparation, acceleration response or numerical target.

The two laws considered separately are the [registered logarithmic response](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) and the [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form). With $c_f=1$, a self hit has acceleration

$$
A_s=\frac{K_s n}{\rho^p|D_s|},\qquad
\rho=t-s=|X(t)-X(s)|,\qquad
D_s=1-n\cdot V(s),\qquad
n=\frac{X(t)-X(s)}\rho,
$$

where $K_s>0$ is the unchanged self coupling. Here $p=1$ denotes only the registered inverse-distance response and $p=2$ only its canonical inverse-square control. No other exponent is selected or investigated. The exact diagonal $s=t$ is excluded; every admitted positive-delay ordinary self and partner root is retained with its absolute transmitter denominator. No receiver multiplier, projected response, impulse or contact rule is added.

## Endpoint hypotheses

Translate the incoming endpoint to time zero and let label $i$ have velocity $V_i(0)=e$, where $|e|=1$. Assume the following for the existing complete incoming pair under the selected law:

1. The complete paths are continuously differentiable through their incoming endpoint; every earlier individual speed is strictly below one. For each fixed $\delta>0$ there is a complete remote-past speed bound $|V_j(s)|\le\beta_\delta<1$ on $s\le-\delta$, for both labels. A stationary or uniformly subfield affine remote tail suffices.
2. The two endpoint positions are distinct. Each receiver has its complete unique ordinary partner root in the incoming past, with positive range and positive transmitter denominator. Its partner acceleration extends continuously to the endpoint.
3. For the chosen label, the partner acceleration has a strictly positive projection along its unit endpoint velocity:

$$
e\cdot A_{p,i}(0)=a_*>0.
$$

The third condition means the regular partner row is increasing the speed at arrival. It is a geometric sign condition, not a claim that every rotating approach satisfies it. The incoming collinear histories meet it because attraction and incoming velocity point in the same direction. Whether a perturbed spiral reaches any such endpoint remains unknown.

The proposed continuation class has finite continuous velocity matching both incoming traces and velocity locally absolutely continuous on every closed interval strictly after zero. It obeys the complete ordinary-root equation almost everywhere. Absolute continuity here says that velocity changes equal the integral of acceleration away from the endpoint; integrability across zero is not assumed. The continuations may bend in three dimensions, break mirror symmetry, and acquire unequal speeds.

## Candidate theorem

Under the endpoint hypotheses, neither of the two stated laws has a continuation in that class on a right neighborhood of zero. The contradiction already occurs in the selected label's velocity projected onto the fixed direction $e$.

### 1. The partner contribution persists and all possible self contributions have positive projection

For any receiver event and an incoming source time $s<0$, define

$$
g_j(t,s)=|X_i(t)-X_j(s)|-(t-s).
$$

Its source derivative is $1-n\cdot V_j(s)>0$. The remote-past speed bound makes $g_j(t,s)\to-\infty$ as $s\to-\infty$, locally uniformly in nearby receiver events. Positive endpoint separation makes $g_j(t,0)>0$ for the opposite label and all sufficiently small $t>0$. There is exactly one incoming partner root; its inherited positive range and denominator give a continuous partner row. Positive separation excludes partner roots with $0\le s<t$ when $t$ is sufficiently small. Thus, after decreasing the proposed continuation interval,

$$
e\cdot A_{p,i}(t)\ge m:=a_*/2>0.
$$

At zero there is no positive-delay self root: for each $s<0$, the integral of the strictly subfield incoming speed gives $|X_i(0)-X_i(s)|<-s$. Fix a small $\delta>0$. Source monotonicity on the incoming past gives $g_i(0,s)\le g_i(0,-\delta)<0$ for all $s\le-\delta$. Continuity of the receiver event preserves this negative bound for small $t>0$, uniformly over that entire older source domain. Consequently every possible self root then has $-\delta<s<t$.

Continuity of velocity at zero lets us choose $\delta$ and the future interval so that $|V_i(u)-e|\le\varepsilon<1/4$ throughout $[-\delta,t]$. Every chord within that interval is an integral of velocities in this fixed cone. Its unit direction therefore satisfies

$$
n\cdot e\ge c:=\frac{1-\varepsilon}{1+\varepsilon}>0.
$$

Hence every admitted self row has positive $e$ projection, independent of the sign of its transmitter derivative. An undefined full row sum on a set of positive measure already fails the proposed equation class. Where the sum is defined, its projection cannot cancel the positive partner row or any one selected self contribution.

### 2. The equation forces an incoming-source self root

Write $w(t)=e\cdot V_i(t)$. The projected equation gives $w'(t)\ge m$ almost everywhere after zero. Integrating from $\eta>0$ to $t$, then letting $\eta\downarrow0$ using the finite trace $w(0)=1$, yields

$$
w(t)\ge1+mt.
$$

Consequently

$$
|X_i(t)-X_i(0)|\ge e\cdot[X_i(t)-X_i(0)]
\ge t+\frac m2t^2>t.
$$

Thus $g_i(t,0)>0$. Its negative remote-past limit and strictly positive source derivative on $s<0$ give exactly one self root $s(t)<0$. This root is ordinary, because $D_s(t)>0$ on the incoming past. It approaches zero as $t\downarrow0$: any fixed older source interval retains the strictly negative exclusion bound from the preceding step. Accordingly $\rho(t)=t-s(t)>0$ tends to zero. Additional outgoing-source roots need not be counted individually for the contradiction; each would have the same positive projection and is retained in the full equation.

### 3. A nonmonotone delay still forces infinite accumulation

The selected incoming-source root is continuously differentiable for every $t>0$ by its positive source derivative. Differentiating its causal equation gives

$$
s'(t)=\frac{1-n\cdot V_i(t)}{D_s(t)},\qquad
\rho'(t)=\frac{n\cdot[V_i(t)-V_i(s(t))]}{D_s(t)}.
$$

Both velocities are bounded by a finite $B>0$ on the small interval, including its sampled incoming sources. Therefore

$$
|\rho'(t)|\le\frac{2B}{D_s(t)},\qquad
e\cdot A_s(t)\ge\frac{K_sc}{\rho(t)^pD_s(t)}
\ge\frac{K_sc}{2B}\frac{|\rho'(t)|}{\rho(t)^p}.
$$

Unlike the line proof, this estimate does not assume that the delay increases monotonically. For $p=1$, an antiderivative of $\rho^{-p}$ is $\log\rho$; for $p=2$, it is $-1/\rho$. Call the appropriate function $F_p$. On every compact interval $[\eta,t_0]\subset(0,t_0]$ the ordinary chain rule gives

$$
\int_\eta^{t_0}\frac{|\rho'(t)|}{\rho(t)^p}\,dt
\ge\left|F_p(\rho(t_0))-F_p(\rho(\eta))\right|
\longrightarrow\infty
\quad(\eta\downarrow0).
$$

The complete projected equation meanwhile implies

$$
w(t_0)-w(\eta)\ge\int_\eta^{t_0}e\cdot A_s(t)\,dt.
$$

The left side has a finite limit; the right side diverges. This contradiction proves the candidate theorem without assuming finite acceleration at the endpoint, a monotone outgoing scalar speed, a straight outgoing path, or monotone self delay.

## Strict and inclusive domains

A strictly subfield domain excludes the equality event itself. The theorem still concerns the incoming endpoint as a limiting event and rules out the stated unchanged-law finite-velocity extension if that extension were considered separately. An inclusive-domain-only comparison allows equality as a domain label but supplies no alternative acceleration. With the same complete interior history and $a_*>0$, it has no outgoing continuation in the stated class either. In particular, staying at or below unit speed contradicts the already forced inequality $e\cdot V_i(t)>1$; allowing a crossing encounters the nonintegrable self contribution.

This disposition counts the common incoming dynamics once. It does not select a projected boundary update or claim that a domain label itself evaluates an otherwise singular acceleration. Under the present positive-separation endpoint hypotheses the surviving partner row is ordinary, and there is no positive-delay self root at the exact endpoint; the contradiction concerns every proposed right interval.

## What rotating geometry can and cannot evade

Rotation alone does not evade this candidate theorem. It would have to invalidate a named endpoint hypothesis: for example, arrive tangentially with $e\cdot A_p(0)=0$, lose separation or partner regularity first, fail the complete incoming subfield history class, or never reach unit speed. The already admitted exact logarithmic spiral remains uniformly subfield and therefore supplies no endpoint to which this theorem applies. Local nonlinear departure from that spiral supplies no later endpoint either.

The known [collinear logarithmic obstruction](logarithmic-causal-continuation-obstruction.md) obtains a sharper exact root inventory and monotone delay by line geometry. The present candidate replaces those two ingredients with a fixed positive projection and a total-variation lower bound for the selected incoming-source delay. Its intended additional content is a conditional curved-path obstruction, not a repetition of a line certificate or a classification of the spiral's disturbed future.

## Evidence boundary and falsifiers

Claim grade: derived candidate, independently unreviewed. The proof uses only the two declared acceleration rows, complete-history root monotonicity on the incoming side, finite continuous velocities, and elementary integral inequalities. No numerical instrument, external physical law or computation supplies the conclusion. Exact straight-line arrival with a positive partner projection is an analytical control for the signs and root identities; the selected self integral reduces to the known line divergence, while the absolute-delay derivative bound remains valid without its stronger monotonicity.

Falsifiers include a self root outside the uniformly excluded old source interval, a chord in the stated velocity cone with nonpositive projection, a persistent partner row failing its positive projection despite continuity, failure of the incoming-source implicit root or its derivative identity, or a finite matching velocity satisfying the complete projected equation despite the divergent lower bound. A grazing endpoint, a different response, or an unrelated history does not refute this conditional result. Independent review must inspect the remote-past exclusion, regularity used for the chain rule, and the use of a single selected self root while retaining all other contributions.
