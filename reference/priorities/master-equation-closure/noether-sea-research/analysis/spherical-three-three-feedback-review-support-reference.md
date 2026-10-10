# Independent primary support reference on the admitted feedback domain

## Frozen scope and result

**Derived independent reference, pending separate review.** This file was completed before reading any new dynamics support subject. It uses the already admitted primary history with $K=c_f=1$, $R=10$, $g=1/10$, initial dimensionless speed $1/4$, external polynomial preparation and normal-only constraint. No motion interval is extended. The domain ends at the already reached first feedback event plus $\delta\tau=1/10000$. The [blind feedback reference](spherical-three-three-feedback-review.md), [accepted reached-feedback comparison](spherical-three-three-feedback-review-dynamics-feedback-adjudication.md) and their frozen subjects remain unchanged.

The new analytical conclusions are:

- There is exactly one support zero before the first moving-preparation arrival $\tau_B$. Its reached phase lies in $(1/64,3/20)$; support changes from outward to inward there.
- At first generated-source feedback, $\ell_F< -7/4000$, hence physical $\lambda_F<-7/40000$.
- Throughout the existing feedback interval, $\ell<-13/20000$, hence $\lambda<-13/200000<0$.
- Extra support zeros during $(\tau_B,\tau_F)$ are not excluded. Negative support at both endpoints is not a proof that its sign stays negative between them.

Here $q=\Phi$, $u=q'$, $\ell=R\lambda=-u^2-N/10$, with primes denoting dimensionless reception time. This is a signed acceleration contribution required by the selected sphere constraint, not physical pressure or an energy law.

## A static-field derivative bound

Let $f_0(q)$ and $N_0(q)$ denote the tangent and radial fields of the original five stationary sites. On $0\le q\le3/8$, put $h=q/2$, $a=\pi/6$, $b=\pi/3$, and $J(x)=2\csc^3x-\csc x$. Direct differentiation gives

$$
8f_0'(q)=J(a-h)+J(a+h)-J(b-h)-J(b+h)+J(\pi/2-h).
$$

Since $J''=(24-20\sin^2x+\sin^4x)/\sin^5x>0$, the first pair is at least $2J(a)=28$. The last term is at least one. The middle pair increases with $h$, since its derivative is $J'(b+h)-J'(b-h)>0$. At $h=3/16$, the elementary bounds $\sqrt3/2>19/22$, $\cos h\ge1-h^2/2$ and $\sin h\ge h-h^3/6$ give

$$
\sin(b-h)>3/4,\qquad \sin(b+h)>15/16.
$$

Because $2/s^3-1/s$ decreases for $0<s\le1$,

$$
J(b-h)+J(b+h)<\frac{92}{27}+\frac{4592}{3375}<5.
$$

Thus $f_0'(q)>3$ and $f_0(q)>3q$ for $q>0$. This whole-interval inequality uses no small-phase approximation. The already independently checked upper bound $f_0(q)<(33/4)q$ remains available on $q\le1/4$.

## Actual speed is increasing through first feedback

The admitted root theorem identifies exactly one possibly nonstationary source per receiver before $\tau_F$: the leading nearest partner. All four others remain stationary. Write its positive tangent term as

$$
A(x,v)=\frac{\cos x}{4\sin^2x(1+v\cos x)},\qquad
x=\pi/6-\frac{q-p(s)}2,\quad v=p'(s).
$$

If $v\le0$, then $p\le0$ and $x\le x_0:=\pi/6-q/2$, so $A(x,v)\ge A(x_0,0)$ and $F\ge f_0(q)>0$. If $v>0$, then the preparation formula implies $s>-1/16$. The admitted partner-delay floor $2/3$ gives $\tau>29/48$. The existing lower phase comparison therefore gives

$$
q>\frac{29}{192}-\frac3{40}\left(\frac{29}{48}\right)^2
=\frac3{25}+\frac{563}{153600}>\frac3{25}.
$$

For positive $v$, $A$ decreases in both $x$ and $v$ on the relevant half-angle interval. Its logarithmic derivative in $x$ is $-2\cot x-\sin x/[\cos x(1+v\cos x)]<0$. Hence

$$
A(x,v)\ge A(x_0,1/4),\qquad
F\ge f_0(q)-\mathcal R(q),\qquad
\mathcal R(q):=A(x_0,0)-A(x_0,1/4)<\frac15A(x_0,0).
$$

For $q\le1/5$, $\sin x_0>2/5$, yielding $\mathcal R<5/16$. For $q\le3/8$, the previously independently checked positive rational inequality $U<9L^2$ in the reached-feedback proof gives $A(x_0,0)<9/4$ and $\mathcal R<9/20$. Consequently the actual tangent field obeys the following lower bounds throughout the admitted pre-feedback motion:

$$
F>
\begin{cases}
3q,&0<q\le3/25,\\
3q-5/16,&3/25\le q\le1/5,\\
3q-9/20,&1/5\le q\le3/8.
\end{cases}
$$

Each right side is positive on its indicated nonzero interval. Thus $u>1/4$ and $q>\tau/4$ for every positive reception time through $\tau_F$. This strengthens an admitted trajectory by differential inequalities; it does not replace variable speed with constant speed.

Since $u>0$, integrating $d(u^2)/dq=F/5$ gives

$$
u^2>\frac1{16}+\frac3{10}q^2
\quad(0<q\le3/25),
$$

$$
u^2>\frac1{16}+\frac3{10}q^2-\frac1{16}(q-3/25)
\quad(3/25\le q\le1/5),
$$

$$
u^2>\frac1{16}+\frac3{10}q^2-\frac1{200}-\frac9{100}(q-1/5)
\quad(1/5\le q\le3/8).
$$

These are inequalities for a time-dependent actual-history equation, not a conserved first integral after preparation arrival. Their right sides are increasing on each stated piece and agree at the piece boundaries.

## A reached initial support zero before moving preparation

Only on the stationary-source interval, direct differentiation gives $N_0'(q)=-f_0(q)/2$. Combining it with the actual scalar equation yields

$$
\ell(q)=\ell(0)-\frac3{20}\int_0^q f_0(z)\,dz,
\qquad \ell(0)=\frac1{16}-\frac1{10\sqrt3}.
$$

Thus support decreases strictly with positive phase while those sources stay stationary. At phase $1/64$, the upper field bound gives $\ell>7/1520-99/655360>0$, using $\sqrt3>19/11$. At phase $3/20$, the lower field bound gives

$$
\ell<\frac{919}{16000}-\frac1{10\sqrt3}
<\frac{919}{16000}-\frac3{52}
=-\frac{53}{208000}<0,
$$

where $\sqrt3<26/15$ was used in the helpful direction.

Both phase events are actually reached before the first preparation arrival. At that reached arrival, $\tau_B=d_1^0(q_B)-1/4\ge3/4-q_B$, since $d_1^0(q)\ge1-q$. The increasing-speed result gives $q_B>\tau_B/4$. Combining them gives $q_B>3/20$. The monotone admitted phase must therefore pass the two test phases while all source emissions are still stationary. Continuity and strict decrease establish exactly one support zero on $[0,\tau_B]$, at phase in $(1/64,3/20)$, with a transverse change to inward support: $d\ell/d\tau=-(3/20)u f_0<0$ at the zero.

This orders the initial zero before any moving-preparation arrival, rather than merely before generated-source feedback. It does not propagate the stationary identity after $\tau_B$.

## Inward support at first feedback

At the reached event, the leading source has phase zero and speed $1/4$, and the other four sources remain stationary. Therefore its exact radial sum depends only on $q_F$:

$$
N_F(q)=
-\frac1{4\sin(a-q/2)[1+\cos(a-q/2)/4]}
+\frac1{4\sin(b-q/2)}
-\frac1{4\cos(q/2)}
+\frac1{4\sin(b+q/2)}
-\frac1{4\sin(a+q/2)}.
$$

The admitted time bracket and increasing speed give $q_F>3/16$; the admitted upper comparison gives $q_F<29/80$. Separate term monotonicities yield certified lower radial bounds

$$
N_F>-13/20\quad(3/16\le q\le1/4),
\qquad N_F>-7/10\quad(1/4\le q\le29/80).
$$

For clarity, these are interval bounds, not numerical evaluations at an inferred trajectory phase. In each bin the negative leading term is largest in magnitude at the upper endpoint because $\sin x(1+\cos x/4)$ increases with $x$ here; the negative trailing term is largest at the lower endpoint, the central negative term at the upper endpoint, the positive second-source term smallest at the lower endpoint and the positive fourth-source term smallest at the upper endpoint. The retained exact certificate evaluates those five independent extrema with alternating sine/cosine polynomial enclosures and rational bounds on $\sqrt3/2$.

The increasing lower speed-square functions give $u_F^2>881/12800$ on the first bin and $u_F^2>287/4000$ on the second. Hence

$$
\ell_F< -\frac{881}{12800}+\frac{13}{200}
=-\frac{49}{12800}
\quad\text{or}\quad
\ell_F<-\frac{287}{4000}+\frac7{100}=-\frac7{4000}.
$$

Uniformly, $\ell_F<-7/4000$ and $\lambda_F<-7/40000$.

## Inward support on the already admitted feedback interval

No new motion is constructed here. Use the admitted interval $[\tau_F,\tau_F+1/10000]$, source emission bound $0\le s_1\le3/10000$, four stationary partners, $|u|<1/2$, $d>7/10$, $D_t>1/2$ and $s'<3$. The already generated early release segment has source vector acceleration less than one: its phase is below $1/10000$, its angular acceleration is below $(33/40)/10000<1/1000$ under the admitted static-source bound, and its squared speed is below $1/4$. The stationary sources have zero acceleration. This estimate is only for the source segments actually read after the event; it does not apply to the left-hand preparation acceleration six.

For a dimensionless chord vector $z$, $|z'|<1/2+(1/2)3=2$ and $|\hat z'|<20/7$. Thus on the open feedback interval, $|D_t'|<3+(1/2)(20/7)=31/7$. Differentiating the exact radial hit $\sigma/(2dD_t)$ then gives

$$
|N'|<5\left[\frac{2}{2(7/10)^2(1/2)}+
\frac{31/7}{2(7/10)(1/2)^2}\right]=\frac{4100}{49}.
$$

The admitted angular acceleration bound is $|u'|<100/49$. Consequently

$$
|\ell'|\le2|u||u'|+|N'|/10<\frac{510}{49}<11.
$$

Support is continuous at the source-release seam, despite the change in its derivative. The right-hand bound therefore gives the whole closed interval

$$
\ell< -\frac7{4000}+\frac{11}{10000}
=-\frac{13}{20000},\qquad
\lambda<-\frac{13}{200000}<0.
$$

The leading emission is strictly positive after the left endpoint and zero at the endpoint itself. Thus this is an inward-support result on the actual generated-source feedback interval, not on a continuation that still reads only preparation.

## Independent arithmetic evidence, limits and falsifiers

The [support certificate](../evidence/spherical-three-three-feedback-review-support-rationals.mjs) was separately authored for exact rational inequalities only. Its [five known/negative controls](../evidence/spherical-three-three-feedback-review-support-rationals-controls.json) passed and were recorded before its [fifteen target checks](../evidence/spherical-three-three-feedback-review-support-rationals-target.json), all of which passed. The controls include rational arithmetic, sine/cosine at zero, a true strict comparison and rejection of a false comparison. The target uses exact BigInt arithmetic, sine degree-seven/five bounds, cosine degree-six/four bounds and $173205/200000<\sqrt3/2<173206/200000$. No approximate trajectory, quadrature, root scan, new solver, production change or compute lease is used.

The result orders one initial support zero before preparation arrival and proves inward support again at first feedback and throughout its existing extension. It leaves the sign/zero itinerary inside $(\tau_B,\tau_F)$ unresolved: the static-source identity no longer applies there, and two negative endpoints do not exclude an intervening positive excursion. The currently selected normal support permits either sign; no support-provider mechanism or physical fate is inferred.

Falsifiers are a failed derivative/monotonicity premise, a reversed canonical source factor, an invalid positive-velocity phase restriction, a failed rational interval bound, an incorrect generated-source acceleration bound, or use of a stationary first integral after its domain ends. The complete root/history and motion-existence obligations are inherited only from the already independently admitted domain; no wider motion or support interval is claimed. This reference is frozen for comparison and separate adjudication. The coordinator owns further selection and synthesis; the bounded support cutoff is 2026-10-10 15:46:11 UTC.
