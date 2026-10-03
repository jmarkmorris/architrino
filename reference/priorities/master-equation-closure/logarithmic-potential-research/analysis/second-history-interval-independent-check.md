# The second history interval: independent derivation and event order

## Scope and independence

**Claim grade: derived for the selected logarithmic equation and stationary preparation; measured for the numerical examples and threshold approximation.** This reference studies only the interval after reception of the release-time wake and before either the next history boundary is received or the receiver reaches speed one. It retains the [causal logarithmic formulation](causal-logarithmic-formulation.md) and its [incoming equation](causal-collinear-first-event.md), with no receiver-speed multiplier, softened distance response, self-root suppression, or boundary update. The first-interval history is known exactly. The argument does not evolve beyond whichever event ends the present interval, and does not examine the inclusive ceiling.

The derivation was constructed without reading the new primary second-interval treatment or its instrument. Its numerical instrument uses source speed as the independent variable, whereas the primary instrument uses source time. The independent instrument was authored before receiving the primary threshold estimate. Known analytical controls passed before its target calculations; no primary instrument was modified or imported.

## The received history and dimensionless coordinates

Set $c_f=1$, take $a,K>0$, and prescribe the complete stationary past $x=a$, $u=0$ for $T\le0$. Positions are $X_\pm=\pm x$, and $u=-x'$ is each constituent's inward speed. On the incoming branch,

$$
x'=-u,\qquad
u'=\frac{K}{R[1-u(S)]},\qquad
R=T-S=x(T)+x(S).
$$

Let $T_j$ be the first reception of the release-time emission, so $S(T_j)=0$. Denote the receiver speed there by $p=u_j$ and put

$$
q=\frac{p^2}{2K},\qquad
I(q)=\int_0^1 e^{q(1-z^2)}\,dz.
$$

The exact first-interval solution and the condition $T_j=a+x_j$ give

$$
p=2qI(q),\qquad
K=2qI(q)^2=pI(q),\qquad
T_j=2a e^{-q},\qquad x_j=T_j-a.
$$

Both $p$ and $K$ increase strictly with $q>0$. Let $q_*$ solve $2q_*I(q_*)=1$ and let $K_*=2q_*I(q_*)^2$. Since $I(1/2)>1$, one has $q_*<1/2$. The interval considered here requires $0<K<K_*$, equivalently $0<q<q_*$, so $0<p<1$ and the first history join occurs before the strict speed boundary.

For the source emissions now being received, $0\le S\le T_j$, let $w=u(S)$ be the source speed. The already determined history is

$$
y(w)=a+x(S)=2a e^{-w^2/(2K)},\qquad
S=s(w)=\frac{2a}{K}\int_0^w e^{-z^2/(2K)}\,dz,
\qquad 0\le w\le p.
$$

Normalize the emission time and causal range by the first join time:

$$
\tau=\frac{S}{T_j},\qquad r=\frac{R}{T_j}.
$$

The source-history endpoint is now the fixed value $\tau=1$. Differentiating the exact source clock gives

$$
\frac{dw}{d\tau}=K e^{-q+w^2/(2K)},\qquad
w(0)=0,\quad w(1)=p.
$$

This equation describes the previously generated source history; it is not a second response law.

## Evolution while receiving that history

Root playback gives $dT/dS=(1-w)/(1+u)$. The receiver and range therefore satisfy

$$
\boxed{
\frac{du}{d\tau}=\frac{K}{r(1+u)},\qquad
\frac{dr}{d\tau}=-\frac{u+w(\tau)}{1+u},\qquad
u(0)=p,\quad r(0)=1.
}
$$

The physical clock and positive half-separation are reconstructed by

$$
T=T_j(\tau+r),\qquad
x=T_jr-2a e^{-w^2/(2K)}+a,
\qquad
\frac{dT}{d\tau}=T_j\frac{1-w}{1+u}>0.
$$

All these equations are consequences of the unchanged logarithmic response and causal condition. No factor has been inserted into the acceleration. The length $a$ affects the clock and distances through their common scale, but does not appear in the dimensionless evolution or its event order.

While $u\le1$ and $0\le\tau\le1$, the source satisfies $0\le w\le p<1$. Hence

$$
\frac{K}{2}\le\frac{du}{d\tau},\qquad
1-\frac{1+p}{2}\tau\le r\le1,
\qquad r\ge\frac{1-p}{2}>0.
$$

The lower range bound follows because $(u+w)/(1+u)$ increases with $u$ when $w<1$, and is at most $(1+p)/2$ in this domain. Also $1-w\ge1-p>0$, so the source denominator stays positive. The ordinary differential equation is locally Lipschitz on a neighborhood of each admitted state, and its denominators remain bounded away from zero up to the first terminating event. It has a unique regular solution until either $u=1$ or $\tau=1$. The reconstructed reception clock advances regularly and this endpoint is reached in finite reception time.

No turn occurs: $du/d\tau>0$ and $dT/d\tau>0$. No contact can occur before or at the endpoint. If $x(T)=0$ at a proposed first contact, the causal relation would require $x(S)=T-S$, while the actual inward travel gives $x(S)=\int_S^T u(t)\,dt<T-S$. The strict inequality still holds at a first terminal speed-one instant because every earlier speed is below one. Thus the supposed contact is impossible.

There remains exactly one simple partner root: $S+x(S)$ is strictly increasing on the complete incoming history, and its derivative on the sampled source interval is at least $1-p$. Every same-label chord is shorter than its elapsed wake-travel time, so there are no positive-delay self roots, including at a first speed-one endpoint. Their absence is derived from the geometry; no self contribution has been removed.

## Monotonicity with respect to the coupling

First compare the known source histories at equal normalized emission time $\tau$. Write their scalar right-hand side as $f(q,w)=K(q)e^{-q+w^2/[2K(q)]}$. For any fixed $w$ in the admitted source-speed range $0\le w\le p(q)$,

$$
\partial_q\log f
=\frac{K'(q)}{K(q)}\left(1-\frac{w^2}{2K(q)}\right)-1,
\qquad
\frac{K'(q)}{K(q)}=\frac1q+2\frac{I'(q)}{I(q)}.
$$

Since $w^2/(2K)\le q$ and $I'(q)>0$,

$$
\partial_q\log f\ge\frac{1-q}{q}-1
=\frac1q-2>0.
$$

For $q_2>q_1$, the smaller-parameter source speed never exceeds $p(q_1)<p(q_2)$. Thus the displayed parameter inequality applies at any putative first meeting of the two source solutions. Scalar comparison, beginning with their common value zero, gives $w(\tau;q_2)>w(\tau;q_1)$ for every $\tau>0$ through their common source domain $[0,1]$.

Now put $U=u+u^2/2$ and $d=1-r$. The receiver system becomes

$$
\frac{dU}{d\tau}=\frac{K}{1-d},\qquad
\frac{dd}{d\tau}=\frac{u+w}{1+u},\qquad
U(0)=p+\frac{p^2}{2},\quad d(0)=0.
$$

For $w<1$, the second right-hand side increases with both $u$ and $w$; the first increases with $K$ and $d$. Since $u$ increases with $U$, this is a cooperative comparison on the admitted domain. Increasing $q$ increases $K$, the initial $U$, and the source history $w(\tau)$. Consequently, while both receiver solutions are within $u\le1$,

$$
U(\tau;q_2)>U(\tau;q_1),\qquad
d(\tau;q_2)\ge d(\tau;q_1).
$$

The $U$ difference remains at least its strictly positive initial value. This comparison is stopped as soon as either trajectory reaches its first terminating event. In particular, if the smaller-coupling receiver reaches speed one at some $\tau\le1$, the larger-coupling receiver must already have reached that boundary: otherwise the ordering would put it above one at that time. No above-ceiling continuation is used in this argument.

## Existence and uniqueness of the second event-order threshold

Small couplings reach the next source-history boundary first. Since $p<K$ and $r\ge(1-p)/2$ while $u\le1$,

$$
u(\tau)\le p+\frac{2K}{1-p}\tau.
$$

For example, $0<K\le1/4$ makes the right side at $\tau=1$ strictly smaller than $1/4+(1/2)/(3/4)=11/12<1$. A first speed-one endpoint in that interval would contradict the same estimate. These cases therefore reach $\tau=1$ with subunit receiver speed.

For couplings sufficiently close to $K_*$ from below, the receiver instead reaches speed one first. Indeed $p\to1$ and $du/d\tau\ge K/2$, so the speed boundary must occur within

$$
\tau\le\frac{2(1-p)}K\longrightarrow0.
$$

The range and source-factor bounds ensure continuous parameter dependence near any intermediate coupling. A speed-one hit is transverse because $du/d\tau>0$, and the competing source event is the fixed endpoint $\tau=1$. Thus the two strict event orders are open parameter sets. The monotonic comparison makes the source-first set an initial interval and the speed-first set a final interval. A separating coupling exists where the two events coincide. There can be only one: two simultaneous-event couplings would contradict the strictly positive $U$ difference maintained through $\tau=1$.

Therefore there is exactly one $K_2\in(0,K_*)$ such that

| Coupling | Event ending this interval |
| --- | --- |
| $0<K<K_2$ | The partner emission time reaches $S=T_j$ while the receiver remains below speed one |
| $K=K_2$ | $S=T_j$ and receiver speed one occur simultaneously |
| $K_2<K<K_*$ | The receiver approaches speed one while $0<S<T_j$ |

At every endpoint the pair remains separated, the partner root is ordinary, and no self root exists. In the speed-ending cases, equality is the excluded boundary of the strict domain; the result supplies no subsequent motion. In the source-ending cases, the exact supplied source segment has been exhausted; this reference stops there without developing the next interval.

## Independent numerical check

The separately authored scratch instrument is `.tmp/log-second-interval/independent-source-speed-check.py`. It changes variables again, using the known source speed $w$ as the integration coordinate and $\rho=R/(2a)$ as range:

$$
\frac{du}{dw}=\frac{e^{-w^2/(2K)}}{\rho(1+u)},\qquad
\frac{d\rho}{dw}=-\frac{e^{-w^2/(2K)}(u+w)}{K(1+u)},\qquad
u(0)=p,\quad\rho(0)=e^{-q}.
$$

Each target integration terminates at the earlier of $w=p$ and $u=1$. No post-event target trajectory is retained. Before target use, the instrument's receiver/range reduction was checked on a separate fixed-source problem with exact identities $\rho=\rho_0e^{-(u^2-p^2)/(2K)}$ and $z=\int_p^u\rho_0(1+v)e^{-(v^2-p^2)/(2K)}\,dv$. Measured range and clock discrepancies were $2.22\times10^{-16}$ and $6.94\times10^{-17}$. The closed expression for $I(q)$ also passed direct quadrature controls at two declared values before the targets.

Reproduction uses the shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/log-second-interval/independent-source-speed-check.py
```

| $K$ | Ending event | Receiver speed | $S/a$ | $T/a$ | $x/a$ |
| --- | --- | ---: | ---: | ---: | ---: |
| $0.5$ | $S=T_j$ | 0.846113615499 | 1.649425150081 | 2.460641729596 | 0.161791429434 |
| $1$ | Receiver speed-one boundary | 1 | 0.494143681799 | 1.677408380687 | 0.244624242071 |

Event-only bracketing, with every trial stopped at its first event, measured

$$
K_2\approx0.604847265110674.
$$

Repeating with tighter tolerances and a fourfold smaller maximum source-speed step changed the reported threshold from $0.6048472651106734$ to $0.6048472651106735$. At the simultaneous-event approximation, $p\approx0.519976266802$, $T_j/a\approx1.599418425574$, $T/a\approx2.303732716602$, and $x/a\approx0.104895865454$. These floating-point values are not interval-certified bounds. The existence, uniqueness and direction of the threshold follow from the analytical comparison above, independently of these decimals. The differently parameterized primary calculation supplies additional numerical agreement, not a physical-law derivation.

## Falsifiers and limits

A second partner root or a positive-delay self root on a complete strictly subunit incoming history would contradict the root argument. Contact before the selected ending event would contradict the strict chord integral. Two distinct simultaneous-event couplings would contradict the cooperative ordering. An independently computed first-event state differing beyond numerical error from the table would overturn the corresponding measured value, without by itself invalidating the analytical threshold theorem. Changed preparation, an added response, a removed root, or evolution beyond the first ending event is outside this reference.
