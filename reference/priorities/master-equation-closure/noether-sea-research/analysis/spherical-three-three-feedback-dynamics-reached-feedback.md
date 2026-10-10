# Reached post-release feedback for the primary prepared hexagon

## Result and dependence

**Derived, pending independent review.** For the selected $K=1$, $R=10$, $c_f=1$, $g=1/10$, $\beta=1/4$ prepared alternating hexagon, the actual normally constrained solution reaches its first reception of a release-time emission at dimensionless time

$$
\frac34<\tau_F<1,
$$

and continues for a nonzero dimensionless interval $1/10000$ afterward. On that interval the leading nearest partner root has $s>0$ and samples the already generated release. The other four partner roots per receiver still sample stationary source history. There are exactly thirty directed partner roots and no positive-delay self roots throughout. Physical time is $T=10\tau$, so $15/2<T_F<10$ and the proved feedback interval has physical length $1/1000$.

This companion uses the exact prepared history, all-root scalar system and first preparation-arrival proof in the separately frozen [domain checkpoint](spherical-three-three-feedback-dynamics-domain.md), hash `c23d19794b20191232109856a7b1d5396554ccff7c272a9b83b39d3adf0284ee`. It supplies a new continuation proof beyond that checkpoint, not a prescribed future or a numerical evolution. Its mathematical independence from the reviewer is retained: no new feedback findings from other workers were read.

Signed normal support is retained exactly and bounded below. Its sign after the initial locally admitted interval is not decided by these enclosures. This limitation does not weaken the reached feedback/root claim, and it must remain visible in any synthesis. No physical energy, unconstrained confinement, support provider, recurrence or all-time conclusion follows.

## A uniform bound while all emissions are nonpositive

Use the exact functions $F,N$ and root definitions from the domain checkpoint, with $\Phi''=gF$ and $u=\Phi'$. Up to the first $s=0$ event, all transmitter values come from the supplied preparation. The polynomial preparation has

$$
-\frac{27}{4096}\le p(s)\le0,\qquad
-\frac1{16}\le p'(s)\le\frac14\quad(s\le0).
$$

The first bound follows by minimizing $\beta s(1+4s)^3$ at $s=-1/16$; the second follows by minimizing $\beta y^2(4y-3)$ at $y=1/2$, with $y=1+4s$. Both include the stationary earlier past.

Bootstrap $0\le\Phi\le3/8$, $0<u<1/2$ and $\tau\le1$ until the first release-emission arrival. Each partner half-angle is $x_k=k\pi/6-h_k$, with

$$
0\le h_k=\frac{\Phi-p(s_k)}2\le\frac{1563}{8192}<H:=\frac{49}{256}.
$$

The five $h_k$ need not agree. We keep these independent source histories and weights. The signs of the tangent contributions are positive for $k=1,3,4$ and negative for $k=2,5$.

Here are rational certificates for a uniform kernel bound. Put

$$
c_-=1-H^2/2,\quad c_+=1-H^2/2+H^4/24,
$$

$$
L=\frac12c_- -\frac{13}{15}H,\quad
U=\frac{13}{15}c_+ +\frac H2,\quad
C=\frac67c_- -\frac H2,\quad
V=\frac12c_+ +\frac{13}{15}H.
$$

Use $6/7<\sqrt3/2<13/15$, $\sin H\le H$ and $c_-\le\cos H\le c_+$. Each required half-angle extremum occurs at $h=0$ or $h=H$ by monotonicity on the stated interval; the bound $c_+$ is used at $H$, not as an upper bound on $\cos h$ for every $h$. All four constants are positive. The following rational inequalities hold by direct multiplication:

$$
U<9L^2,\qquad 10C>17V^2,\qquad 4V<5C^2,
\qquad 19H<4c_-^2(1-H/16).
$$

They are explicit exact checks, not sampled estimates or a newly run arithmetic instrument. The corresponding five-term bounds are:

- For $k=1$, $\sin x_1\ge L$, $\cos x_1\le U$, and $D_t\ge15/16$. Its positive tangent term is less than $4U/(15L^2)<12/5$.
- For $k=5$, $|\cos x_5|\ge C$, $\sin x_5\le V$, and $D_t\le17/16$. Its negative tangent term is less than $-4C/(17V^2)<-2/5$.
- For $k=4$, $|\cos x_4|\le1/2$, $\sin x_4\ge\sqrt3/2$, and $D_t\ge7/8$. Its positive term is at most $4/21$.
- For $k=3$, the positive term is bounded above by $H/[4c_-^2(1-H/16)]<1/19$.
- For $k=2$, its negative term has magnitude less than $4V/(15C^2)<1/3$.

For a lower bound on the $k=5$ term, also use $|\cos x_5|<7/8$, $\sin x_5\ge1/2$ and $D_t>25/32$. Its magnitude is below $28/25$. Discarding other terms only in the appropriate direction yields

$$
-\frac32<-\frac13-\frac{28}{25}<F
<\frac{12}{5}-\frac25+\frac4{21}+\frac1{19}<\frac94.
$$

The upper sum is $895/399<9/4$. The lower magnitude sum is $109/75<3/2$. Transmitter velocities were not set to zero in these bounds.

## Closing the pre-feedback continuation

The bound on $F$ gives

$$
\frac14-\frac3{20}\tau<u(\tau)<\frac14+\frac9{40}\tau,
$$

$$
\frac\tau4-\frac3{40}\tau^2<\Phi(\tau)<\frac\tau4+\frac9{80}\tau^2.
$$

For $0<\tau\le1$, the speed therefore stays between $1/10$ and $19/40$, and the phase stays below $29/80<3/8$. These strict bounds close the phase/speed bootstrap through either the first $s=0$ event or time one. Complete-history speed is strictly below $1/2$, so each partner has one ordinary root, positive-delay self roots are absent, distances are at least $2/3$, and all right-hand-side denominators remain bounded away from zero. Known nonpositive-time source functions are locally Lipschitz in position and velocity. Ordinary continuation cannot fail earlier inside this compact domain.

The leading release position is uniquely closest among the five partner release positions for $0<\Phi<3/8$. At a reception of its $s=0$ emission,

$$
\tau= d_1^0(\Phi):=2\sin(\pi/6-\Phi/2).
$$

If no emission had reached zero by $\tau=1$, the actual continued solution would have $\Phi(1)>0$ and $d_1^0(\Phi(1))<1$, contradicting all emissions being negative. Thus a first event is reached before one. Its margin $d_1^0(\Phi)-\tau$ decreases strictly because $u>0$. It has a unique zero, with directed labels $(i,i+1\bmod6)$, one per receiver. All six events occur simultaneously by symmetry. No self diagonal or positive-delay self root participates.

For a lower time bracket, if $\tau\le3/4$ the phase bound gives $\Phi\le321/1280$. Since

$$
d_1^0(\Phi)=\cos(\Phi/2)-\sqrt3\sin(\Phi/2)
\ge1-\frac78\Phi-\frac18\Phi^2,
$$

substitution of $321/1280$ gives a value strictly greater than $3/4$. The event cannot occur at or before $3/4$. This proves the reached bracket, not merely a possible root equation.

## Other roots at the first feedback event

The phase lower comparison increases for $0\le\tau\le1$. Therefore

$$
\Phi_F>\frac3{16}-\frac{27}{640}=\frac{93}{640}.
$$

The trailing nearest partner is the second closest release position. Its distance difference from the leading one is $2\sqrt3\sin(\Phi_F/2)$. The inequalities $\sqrt3>19/11$ and $\sin x\ge x-x^3/6$ give the exact rational bound

$$
2\sqrt3\sin(\Phi_F/2)
>\frac{38}{11}\left[\frac{93}{1280}-\frac16\left(\frac{93}{1280}\right)^3\right]
>\frac{501}{2000}.
$$

At $\tau_F=d_1^0$, its stationary emission would therefore be less than $-501/2000=-1/4-1/2000$. This is genuinely in the stationary domain and hence is its unique actual root. The other three partner distances are larger and their emissions are earlier. All four nonleading roots consequently remain stationary through $\tau_F$, with a margin greater than $1/2000$ to the moving-preparation boundary. The root monotonicity theorem then confirms that none entered preparation earlier. The only negative-time moving source encountered before first feedback is the leading nearest partner already identified in the domain checkpoint.

## Nonzero actual generated-history feedback

At $\tau_F$ the leading root has $s=0$ and delay $\tau_F>3/4$; every other delay is larger. Continue for $0\le\tau-\tau_F\le\delta:=1/10000$ with a bootstrap speed bound $|u|<1/2$ and delays above $7/10$. All source speeds on the complete already generated history are below $1/2$. Hence

$$
\frac12<D_t,D_r<\frac32,\qquad
\frac13<s_k'<3.
$$

Delays decrease by less than $2\delta$, staying above $3/4-1/5000>7/10$. The five-term field magnitude is bounded by $5/[(7/10)^2(1/2)]=1000/49$. Thus $|u'|<100/49$, and the speed change is below $1/4900$. Starting with $1/10<u_F<19/40$, speed remains strictly positive and below $1/2$. The phase remains below $3/8$. These estimates close the continuation bootstrap.

The earliest positive source values lie in

$$
\frac{\tau-\tau_F}{3}<s_1(\tau)<3(\tau-\tau_F)\le\frac3{10000}.
$$

That entire source interval was generated near release, long before the current receiver time $\tau_F>3/4$. The positive minimum delay makes this an ordinary method-of-steps interval using the already constructed actual solution. No future source trajectory is prescribed. The other four emissions can advance by less than $3/10000<1/2000$ and remain below $-1/4$. Thus precisely one partner root per receiver reads positive-time generated release on this whole open feedback interval; the other four remain stationary. Global history speed below $1/2$ keeps the continued roots complete and excludes every positive-delay self root.

At source release, position and velocity are continuous, but the angular acceleration changes from $p''(0^-)=24\beta=6$ to $\Phi''(0^+)=g f(0)=0$. The source velocity remains locally Lipschitz. The ordinary root and canonical acceleration therefore stay continuous at its arrival, while a derivative may change. No impulsive rule, smoothing or matching of unequal accelerations is imposed. Reflection in the equatorial plane, cyclic relabeling symmetry and common speed remain exact through this interval.

## Signed normal support and its present precision

Throughout the actual continuation use only

$$
\lambda(T)=\frac1{10}\left[-u(\tau)^2-\frac1{10}
\sum_{k=1}^5\frac{(-1)^k}{2d_kD_{t,k}}\right].
$$

The old stationary-field first integral does not govern the moving-preparation or positive-emission portions. At release the support is outward, with $\ell(0)=C_0/10-1/16>0$, and the prior accepted local six-cell result keeps it outward through reached phase $1/64$. On the larger pre-feedback domain, $d\ge2/3$, $D_t\ge3/4$ and $u<1/2$ yield

$$
-\frac34<\ell<\frac12,\qquad -\frac3{40}<\lambda<\frac1{20}.
$$

On the post-feedback interval, $d>7/10$, $D_t>1/2$ give $|N|<50/7$, hence

$$
-\frac{27}{28}<\ell<\frac57,\qquad -\frac{27}{280}<\lambda<\frac1{14}.
$$

These are rigorous signed intervals, not estimates of extrema, and they deliberately retain both signs. A support zero, its absence, and its ordering after the initial local interval remain unresolved by this proof. The exact five-term formula identifies the observable for a separate sharpening; no physical pressure or energy interpretation is attached.

## Validation boundary and next dependency

This proof is analytic and conditional only on the explicitly supplied preparation and canonical normal-only law. No numerical instrument, target run, production solver, computational lease or new event rule was used. Exact checks requiring independent reconstruction are the rational kernel inequalities, the bootstrap comparison, the release-event ordering, the nonleading stationary margin and the positive-source method-of-steps domain. A wrong transmitter sign, failed rational bound, root omitted from the complete history, or substitution of a future source would falsify the corresponding conclusion.

The result awaiting independent review is a reached $S=0$ event and a nonzero actual $S>0$ feedback interval with complete roots and bounded signed support. Sharper support signs remain a separate unresolved quantitative question. This companion is the only newly authored file in this slice; the prior domain checkpoint and all earlier reports remain frozen. The coordinator owns integration and adjudication. The next dependency is independent checking of this frozen theorem, with any support-bound sharpening kept in a new companion rather than rewriting the subject.

Preservation receipt: `shasum -a 256` on the linked domain checkpoint returned its declared `c23d19794b20191232109856a7b1d5396554ccff7c272a9b83b39d3adf0284ee` digest after this companion was written. The new companion receives a scoped `git diff --no-index --check /dev/null` whitespace check before handoff. These checks concern bytes and formatting only; they are not independent mathematical acceptance.
