# Zero-terminal-speed escape in the original unit-memory held-tail family

## Result and frozen preparation

**Grade: derived candidate, pending independent assessment.** The [separately frozen preparation](alternatives-screen-2026-10-05-memory-critical-preparation.md), with fixed held radius $a=100$ and outward release velocity $b\in[0,3/4]$, contains at least one parameter $b_*\in(0,3/4)$ whose original unit-uniform-memory future is global, separated and uniformly subfield, with

$$
x(T)\longrightarrow\infty,\qquad v(T)\longrightarrow0.
$$

Its motion is eventually outward and decreasing in speed. The exact leading laws are

$$
x(T)\sim\left(\frac34\right)^{1/3}T^{2/3},
\qquad
v(T)\sim\frac23\left(\frac34\right)^{1/3}T^{-1/3},
\qquad
v'(T)\sim-\frac1{6x(T)^2}.
\tag{1}
$$

There is an open parameter neighborhood of $b=0$ reaching a finite first inward unit-speed endpoint at positive separation, and an open neighborhood of $b=3/4$ escaping with positive terminal speed. No ordering of shots, unique critical parameter, monotone velocity on the full future, or unit-event transversality is assumed. No continuation beyond an inward unit endpoint is selected.

The preparation was frozen before this future proof with SHA-256 c07d2410a9eb7a72edbc691d2f274b4931cd4f0056e5217f5df2febca94c3e21. It retains $K=c_f=\lambda=\tau=1$, the complete canonical self/partner equation and exact unit velocity memory. The right label is held at $a$ for $S\le-1$; on $[-1,0]$, with $q=S+1$,

$$
v(S)=b(3q^2-2q^3)+Aq^2(1-q),\qquad
x(S)=a+\int_{-1}^{S}v(r)\,dr,
$$

$$
\frac{13}{12}A=\frac b2+
(2a+b/2+A/12)^{-2},\qquad 0<A<2/5.
\tag{2}
$$

The opposite label is the exact reflection. The unique coefficient $A(b)$ is smooth. The complete past is separated, locally $C^{2,1}$ and satisfies $0\le v<5/6$. Release has $x_0=a+b/2+A/12$, $v_0=b$ and $v'(0-)=-A$. Its partner root lies in the held tail, and (2) is exact acceleration compatibility, including the full unit memory average. The supplied past is a preparation, not an asserted negative-time solution.

The [radial critical assessment](alternatives-screen-2026-10-05-radial-critical-escape-adjudication.md) was read for method comparison. Its monotone-velocity conclusion does not transfer to this equation. The replacement finite witness here is negativity of the exact history variable $M$, not a first turn of $v$.

## Complete ordinary chart and the exact monotone variable

On a separated strict-subfield mirror future, $x>0$ and $|v|<1$. The complete partner residual

$$
g_T(r)=r-x(T)-x(T-r)
$$

is strictly increasing in $r$, negative at zero, and tends to positive infinity in the held tail. Its derivative is $1+v(T-r)>0$. Thus there is exactly one partner root over the entire past. Strict subfield chords exclude every positive-delay self root. With $S=T-R$,

$$
R=x(T)+x(S),\qquad
Q(T)=\frac1{R^2[1+v(S)]}>0,\qquad
S'=\frac{1-v(T)}{1+v(S)}>0.
\tag{3}
$$

The actual scalar equation is

$$
v'=-Q-v+\overline v,\qquad
\overline v(T)=\int_0^1v(T-\theta)\,d\theta.
\tag{4}
$$

Define

$$
M=v+kv,\qquad
(kf)(T)=\int_0^1(1-\theta)f(T-\theta)\,d\theta.
$$

Integration by parts gives $(kv)'=v-\overline v$, hence exactly

$$
M'=-Q<0,\qquad \|k\|_1=1/2,\qquad
M(0)=\frac{27}{20}b+\frac A{20}.
\tag{5}
$$

This mathematical history variable is not a conserved physical quantity. It uses the complete last-unit velocity and obeys (5) only on the actual released future.

Set $\bar b=5/6$. Throughout the strict chart,

$$
v(T)<\bar b.
\tag{6}
$$

Indeed, at a first prospective rise to the fixed level $\bar b$, all previously supplied and generated velocities in the memory average are at most $\bar b$. Equation (4) gives $v'\le-Q<0$, contradicting that first upward crossing. This is a no-new-maximum bound, not a claim that $v$ decreases pointwise. The remaining incoming boundary is $v=-1$.

Local existence, uniqueness and finite-prefix parameter dependence follow on compact ordinary charts. A positive gap and strict speed margin give positive partner delay and transmitter margins. Steps shorter than the partner delay sample already known source positions and velocities; the exact memory is also $-v+x-x(T-1)$. The implicit root displacement is controlled by the source transmitter margin, and source-velocity displacement is controlled by bounded source acceleration on the compact sampled interval. The position/velocity integral map is locally Lipschitz and contractive on sufficiently short steps. The complete old held tail excludes additional roots outside that interval. The common old tail and smooth fixed-unit patch make this dependence continuous in $b$, including acceleration on any finite regular prefix.

## Every finite ordinary endpoint is inward unit speed, not contact

Consider a finite maximal endpoint $T_*$ of the separated strict-subfield chart. Bounded velocity gives a finite position limit. The bounded monotone $M$ also has a limit. Although acceleration might initially be unbounded near a proposed endpoint, $kv$ is Lipschitz there: $(kv)'=v-\overline v$ is bounded because $-1<v<\bar b$. Hence $v=M-kv$ has a finite limit in $[-1,\bar b]$.

The increasing source clock has a finite limit. It cannot escape to the remote past: if $S<-1$, its equation is exactly $S=T-x(T)-a$; otherwise $S\ge-1$.

Suppose $x(T)\to0$. If $S$ tended to an earlier time $S_*<T_*$, the limiting root equation would require

$$
x(S_*)=T_*-S_*.
$$

But $x(T_*)=0$ and $v>-1$ at every intervening interior time imply $x(S_*)=-\int_{S_*}^{T_*}v(r)\,dr<T_*-S_*$. The strict integral inequality holds even if the endpoint velocity tends to $-1$. Therefore $S\to T_*$ and $R\to0$. The exact source-clock change of variable gives

$$
Q(T)\,dT
=\frac{dS}{R^2[1-v(T)]}
\ge\frac{dS}{2(T_*-S)^2},
\tag{7}
$$

because $R=T-S\le T_*-S$ and $1-v(T)\le2$. The last integral diverges as $S\uparrow T_*$. This contradicts $\int Q\,dT=M(0)-M(T)$ and bounded $M$. Contact, including simultaneous contact and unit speed, is excluded.

If $x(T)\to x_*>0$, then $R\ge x(T)$ leaves a positive delay floor. All sampled source times lie in a compact interval strictly before $T_*$, where their velocities remain strictly above $-1$ and their regularity is already known. The received canonical input and memory then have bounded continuous limits. If the limiting current velocity exceeded $-1$, another ordinary step would continue the strict chart. The only finite endpoint is consequently

$$
x_*>0,\qquad v(T)\to-1.
\tag{8}
$$

At such an endpoint, (6) gives

$$
M(T_*-)=-1+(kv)(T_*-)
\le-1+\bar b/2=-7/12<0.
\tag{9}
$$

No sign strictly below zero for the endpoint acceleration is needed. The proof does not assume that (8) is transverse, or import a post-event obstruction whose additional preparation hypotheses have not been proved here.

## A finite negative-history witness exactly identifies the inward-event set

Let $\mathcal I$ be the set of parameters for which $M(T)<0$ at some finite reception strictly before an ordinary endpoint. Finite-prefix continuity makes $\mathcal I$ relatively open in $[0,3/4]$. Equation (9) proves that every finite inward unit endpoint has such a prior witness.

Conversely, a finite negative witness forces a finite inward unit endpoint. If the strict chart persisted globally, $M$ would be bounded and decreasing, with a limit $m<0$. The exact equation $v+kv=M$ implies

$$
v(T)\longrightarrow\frac23m.
\tag{10}
$$

For completeness, iterate that algebraic identity a fixed number $N$ of times at late $T$: the finite terms tend to $\sum_{j=0}^{N-1}(-1)^j2^{-j}m$, while the last velocity term is bounded by $2^{-N}\sup|v|$. Let first $T$ and then $N$ tend to infinity. This retains the complete supplied velocity and establishes (10) without assuming a local memory response. A negative limiting velocity would make positive $x$ reach zero in finite additional time, contradicting global strict separation. Thus the maximal chart is finite, and its endpoint is (8).

Accordingly, $\mathcal I$ is exactly the inward-unit fate set. Its openness follows from a finite $M$ witness even if the terminal unit event lacks proven transversality.

For a parameter outside $\mathcal I$, $M(T)\ge0$ throughout the chart. Since $kv\le\bar b/2$,

$$
-\bar b/2\le v(T)<\bar b.
\tag{11}
$$

This is the missing future margin: it follows from the exact history variable, not from an assumption that memory cannot cause velocity reversals. It excludes the only finite endpoint (8), so the solution is global, separated and uniformly subfield on the complete supplied and generated history.

The root range and denominator estimates now give, with $d=2x$,

$$
\frac{2x}{1+\bar b}\le R\le\frac{2x}{1-\bar b},
\qquad
1-\bar b\le1+v(S)\le1+\bar b.
$$

Hence fixed positive constants $c,C$ satisfy

$$
c\,x(T)^{-2}\le Q(T)\le C\,x(T)^{-2}.
\tag{12}
$$

Monotonic bounded $M$ makes $\int_0^\infty Q$ finite, so $\int_0^\infty x^{-2}$ is finite. Since $x$ is Lipschitz, this forces $x(T)\to\infty$: infinitely many visits below a fixed radius would supply disjoint intervals of fixed duration with bounded radius and a positive lower contribution to that integral. The bounded-history argument for (10) gives

$$
v(T)\longrightarrow V=\frac23m\ge0,\qquad
m=\lim M(T)\ge0.
\tag{13}
$$

Thus the remaining alternatives are positive-speed escape and zero-speed escape. No global strict solution with an unrecognized asymptotic loss of speed margin remains outside this classification.

## Explicit opposite sides of the frozen parameter interval

At $b=0$, compatibility gives $A<(2a)^{-2}$ and $M(0)=A/20$. Set $T_0=1/8$. On a provisional interval $0\le T\le T_0$ with $v>-1/4$, (6) and the supplied bounds give $|v|\le\bar b$. Positions stay in $a-1/32<x<a+1$. The candidate partner source is held because $R=x+a>199$ and $S=T-R<-1$. It is the unique full root. Therefore

$$
(2a+1)^{-2}<Q<(2a-1/32)^{-2}<10^{-4}.
$$

Equation (4) gives $|v'|\le Q+2\bar b<2$, hence $v(T)>-2T\ge-1/4$. This improves the provisional lower boundary strictly through $T_0$, and all ordinary margins permit continuation there. Consequently

$$
M(T_0)
<\frac1{20(2a)^2}-\frac1{8(2a+1)^2}<0
\qquad(a=100).
\tag{14}
$$

Thus $0\in\mathcal I$, and openness supplies a relative parameter interval of finite inward unit events.

At $b=3/4$, use a first prospective fall to $v=1/4$. Before that event, all source velocities are nonnegative and all source positions are at least $a$, while $x\ge x_0+T/4$. Hence

$$
Q\le(x+a)^{-2},\qquad
\int_0^TQ\,dT\le\frac4{x_0+a}<\frac1{50}.
$$

Since $M(0)\ge3/4$ and $kv\le5/12$,

$$
v=M-kv
>\frac34-\frac1{50}-\frac5{12}
>\frac14.
\tag{15}
$$

The lower barrier cannot be reached. Together with (6), it gives global ordinary continuation, $x\to\infty$ and $V\ge1/4$. This independently verifies the upper endpoint's future for the frozen family, without selecting a numerical trajectory or importing the memory-free outward criterion.

## Openness of positive escape and the critical parameter

Let $\mathcal P$ be the set of parameters outside $\mathcal I$ with $V>0$. Each such member enters the admitted complete-history memory outgoing criterion at finite time. Here is the needed verification.

Its separation $d=2x$ tends to infinity linearly, and its relative outward velocity tends to $2V>0$. The uniform speed margin (11) persists. The positive continuous radius has a global positive minimum because it tends to infinity, so (12) bounds $Q$ globally and gives $Q\to0$. The exact acceleration identity

$$
v'+k v'=-Q
$$

and its kernel mass $1/2$ bound acceleration globally by the finite supplied unit acceleration and twice the supremum of $Q$. Fixed finite iteration, followed by the geometric remainder estimate as in (10), gives $v'(T)\to0$. Therefore the full incoming unit quantities

$$
J_i(T)=\int_{T-1}^{T}(1+s-T)^2|A_i(s)|\,ds
$$

tend to zero for both labels.

Choose a fixed speed ceiling $\bar b<\widehat b<1$ and $0<\sigma<2V$. The exact outgoing budgets are

$$
\Lambda_i=J_i+\frac{2C_{\widehat b}}{\sigma d},
\qquad C_{\widehat b}=\frac{(1+\widehat b)^2}{1-\widehat b}.
$$

At sufficiently late finite entry, $\Lambda_i\to0$, so

$$
|V_i|+\Lambda_i<\widehat b,\qquad
\Lambda_1+\Lambda_2<2v-\sigma
$$

hold strictly. These are the admitted memory criterion's inequalities, including the entire acceleration transient. The complete uniform source history is retained. Finite-prefix parameter continuity preserves them for nearby $b$, and the criterion gives global positive relative terminal velocity there. By mirror symmetry the individual right terminal speed is positive. Thus $\mathcal P$ is relatively open.

The disjoint relatively open sets $\mathcal I$ and $\mathcal P$ contain neighborhoods of $0$ and $3/4$, respectively. Define

$$
b_*=\inf\bigl([0,3/4]\setminus\mathcal I\bigr).
$$

Then $0<b_*<3/4$. The closed complement of $\mathcal I$ contains $b_*$; openness of $\mathcal P$ and inward parameters immediately to its left exclude $b_*\in\mathcal P$. Classification (11)–(13) therefore gives its global uniformly subfield escape with $V=0$.

This argument makes no monotone parameter-ordering claim. It selects a boundary of one open inward component, not a unique critical shot. Ordinary uniqueness for each complete compatible history is distinct from uniqueness of the parameter.

## Actual zero-speed asymptotics without a monotone-velocity premise

Take any zero-speed member furnished by this classification. Then $M(T)\downarrow0$, with

$$
M(T)=\int_T^\infty Q(r)\,dr>0.
\tag{16}
$$

The radius tends to infinity and $v\to0$. By averaging $x'=v$, $x(T)=o(T)$. The source clock in (3), now with the uniform margin (11), advances to infinity. On its full late interval,

$$
|x(T)-x(S)|
\le\sup_{S\le r\le T}|v(r)|\,R=o(R).
$$

Since $R=x(T)+x(S)$, this proves

$$
R\sim2x(T),\qquad v(S)\to0,\qquad
Q(T)\sim\frac1{4x(T)^2}.
\tag{17}
$$

No monotonicity of $x$ or $v$ has entered this source-window limit.

To compare $v$ with $M$, set $E=v-\frac23M$. The exact identity $v+kv=M$ gives

$$
E+kE=\frac23\int_0^1(1-\theta)
[M(T)-M(T-\theta)]\,d\theta.
\tag{18}
$$

By (5), (12) and bounded velocity, the right side is $O(x(T)^{-2})$ on a late unit window. Since $x\to\infty$ and $|x'|\le\bar b$, the ratio $x(T)^2/x(T-\theta)^2$ is uniformly as close to one as desired for $0\le\theta\le1$. Its product with the kernel mass $1/2$ is therefore strictly below one after a fixed late time. A running-supremum estimate with weight $x(T)^2$, retaining the finite initial weighted unit window, proves

$$
v(T)=\frac23M(T)+O(x(T)^{-2}).
\tag{19}
$$

The same weighted contraction applied to $v'+kv'=-Q$ gives $v'=O(x^{-2})$. Neither estimate replaces the memory locally; both follow from its exact full convolution.

Equation (12) and $x(r)\le x(T)+\bar b(r-T)$ give the useful lower bound

$$
M(T)\ge c\int_T^\infty
\frac{dr}{[x(T)+\bar b(r-T)]^2}
=\frac{c}{\bar b\,x(T)}.
\tag{20}
$$

Thus the error in (19) is $o(M)$, proving $v\sim2M/3>0$ eventually. Radius is now a valid increasing coordinate. Using (17),

$$
\frac{d(M^2)}{dx}
=\frac{2MM'}{v}
\sim-\frac3{4x^2}.
$$

Integrate its eventual two-sided bounds from $x$ to infinity, using $M\to0$. This yields

$$
M^2\sim\frac3{4x},\qquad
v^2\sim\frac1{3x}.
\tag{21}
$$

Integrating $d(x^{3/2})/dT=(3/2)\sqrt{x}\,v\to\sqrt3/2$ proves the radius and velocity coefficients in (1).

Finally, the acceleration coefficient follows from the exact convolution rather than differentiation of an asymptotic equivalent. Iterate $v'+kv'=-Q$ with $N=\lfloor T/2\rfloor$. Every sampled time is at least $T/2$. The already proved radius law in (1) and $v'=O(x^{-2})$ bound the scaled remainder by $C2^{-N}$ after multiplication by $x(T)^2$. Every fixed convolution term tends to $-2^{-j}/4$ by (17), and the full finite sum is dominated by $C2^{-j}$. The geometric limit gives

$$
x(T)^2v'(T)\longrightarrow
-\frac14\sum_{j=0}^\infty(-1)^j2^{-j}
=-\frac16.
$$

This proves eventual negative acceleration and completes (1). The entire earlier memory transient is retained in the finite-iteration remainder; it can alter the critical parameter and subleading behavior, but not these leading coefficients.

## Falsifiers, limitations and source identities

The existence proof fails if the complete root census or exact identity (5) fails; if a finite contact can avoid the divergent integral (7); if a finite ordinary endpoint with positive gap and subunit current speed cannot be continued; or if a negative $M$ witness permits a global separated strict-subfield future despite (10). The decisive new margin is (11): violating it while $M\ge0$ and all velocities stay below $\bar b$ would contradict the defining integral directly. Positive-set openness additionally requires the retained unit acceleration estimate and finite-prefix parameter continuity. The critical argument uses connectedness only after both finite-witness sides are proved open.

For the asymptotics, falsifiers are failure of the complete late source comparison (17), failure of the weighted exact convolution bound (19), or failure of the positive lower estimate (20). The subsequent integrations do not assume a conserved central quantity. No memory-free trajectory, genericity statement, numerical endpoint, unique shot, density of critical parameters, or universal classification outside the frozen family is asserted. The argument does not classify or continue the unit endpoint beyond the incoming ordinary solution, and does not promote an event-specific self-birth obstruction without its own hypotheses.

The direct independent validation route is to check compatibility separately, reconstruct the finite-boundary source integral, verify the open finite-$M$ witness, and only then reproduce the weighted memory and tail calculations. The family was fixed before the target proof. No numerical sweep, new executable instrument, Python job or background process was used.

Antecedent SHA-256 identities measured with shasum -a 256:

| Source | SHA-256 |
| --- | --- |
| [Frozen preparation](alternatives-screen-2026-10-05-memory-critical-preparation.md) | c07d2410a9eb7a72edbc691d2f274b4931cd4f0056e5217f5df2febca94c3e21 |
| [Initial collinear screen](alternatives-screen-2026-10-05-collinear.md) | dd1fd1b68222f2f7b1bba59c8a5229bdf60e5a0dfe05a5af7bfe0aecb9b00111 |
| [Exact monotone memory variable](alternatives-screen-2026-10-05-memory-monotone-identity.md) | bb80abd605ada44cb49dbb7adbc8db1e5c33b5066a6cecaba9ababa7f646bdbe |
| [Existing outward construction](alternatives-screen-2026-10-05-gradient-memory-outward-histories.md) | 5e622f4c3f7a4f75f97cb545b0a1f400231461668e265957c9d8407488d4d954 |
| [Radial method comparison only](alternatives-screen-2026-10-05-radial-critical-escape-adjudication.md) | fa27e9f1dd1154f39b8618a1db7f37257e0dc10ea940d704997a20a10ee817ac |
| [Admitted memory outgoing criterion](../../binary-research/analysis/alternatives-screen-2026-10-05-memory-scattering-robustness-adjudication.md) | 37093816dd0826b40e5301538c68502974496fbb8dc82f12de974494bd77691f |

Only the new preparation and this new existence source are authored. Earlier sources and shared owners are unchanged. Scoped whitespace and final hashes are checked after creation; independent mathematical admission remains a separate step.
