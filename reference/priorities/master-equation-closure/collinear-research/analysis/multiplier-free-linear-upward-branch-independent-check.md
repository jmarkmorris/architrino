# Upward self-birth families and the first outgoing event

**Derived conditional result.** A first outgoing turn is not common to the entire smaller-trace family. With smooth incoming source history, regular older roots, a strict two-trace threshold and the complete multiplier-free linear law, that family contains solutions whose next event is another crossing of $v=-1$, arbitrarily close to the upward self-birth. Their velocity never reaches zero on that outgoing interval. This is a local counterexample to a universal first-turn assertion, not a statement that these branches can never turn after further events. The fate of other family members, including the larger-trace branch, requires their own continuation and event analysis.

The result is conditional on an exact specified incoming history. The numerical held-release upward crossing described in [the postfold independent check](multiplier-free-linear-postfold-independent-check.md) supplies an application estimate, not an enclosure proving these hypotheses for the exact selected release. No new numerical subject output or source was consulted for this derivation.

## Law, history and continuation class

Use $c_f=1$, $k=0.2862286103053385$, the symmetric labels $x$ and $-x$, and held history $x=1/2$ for $T\leq0$. The exploratory linear-numerator acceleration is the sum of all earlier admissible partner contributions $-kd/|1+\operatorname{sgn}(d)v(S)|$ and self contributions $ke/|1-\operatorname{sgn}(e)v(S)|$, where $T-S=|d|$, $d=x(T)+x(S)$, or $T-S=|e|$, $e=x(T)-x(S)$. There is no receiver multiplier, cap, softened core, impulse, omitted root or reversal rule.

Write $P(T)=T+x(T)$ and $Q(T)=T-x(T)$. Let $T_u$ be an upward crossing of $v=-1$ at negative position, with $P_u=P(T_u)$ a strict local minimum. The incoming history has one earlier maximum $P_m>P_u$, at the first downward crossing. On the relevant earlier sectors $P$ increases to $P_m$ then decreases to $P_u$; $Q$ is strictly increasing. Assume $Q(T_u)>P_m$, and that all older roots used below have positive delay and nonzero clock derivative. Smoothness assumptions concern the incoming minimum and these regular source sectors: $p(q)=-(1+v(T_u-q))=Bq+O(q^2)$ with $B>0$, differentiable with the corresponding derivative expansion, and the surviving older-root acceleration is continuously differentiable near the event with value $H$. An exact incoming solution has $H=B$; for supplied interpolation these quantities must be kept distinct.

The continuation class has continuous position and velocity, locally absolutely continuous velocity, finite one-sided acceleration traces, and the equation on punctured event intervals and in the integral sense. It does not demand a common two-sided second derivative at a root birth. The previous [local multiplicity proof](multiplier-free-linear-postfold-independent-check.md#existence-of-both-upward-crossing-branches-and-uniqueness-obstruction) supplies the bounded source-coordinate families in this class.

## Complete roots before a turn or another crossing

Consider an outgoing interval with $-1<v\leq0$ and

$$
P_u<L=P(T)<\min(P_m,Q(T_u)).
$$

There is one negative-distance partner root $s_p$, determined by $Q(s_p)=L$, and two negative-distance self roots $s_1,s_2$, determined by $P(s_i)=L$. Here $s_1$ lies on the increasing sector before the old maximum and $s_2$ lies on its decreasing sector before $T_u$. Every source is strictly before $T_u$.

Indeed $Q(T)>Q(T_u)>P_m$, while the complete earlier $P$ history is at most $P_m$ or the current increasing value $L<Q(T)$, so positive-distance partner roots are absent. $Q$ remains strictly increasing, so positive-distance self roots are absent. The post-$T_u$ interval adds no earlier negative self root because $P$ increases there, and adds no negative partner root because its $Q$ values exceed $Q(T_u)>L$. The receiver's self diagonal is not an earlier source. Thus the census is exactly one partner and two self roots, not a frozen omission of newly created roots. The self root tending to $T_u$ is included.

Let $D_p=Q'(s_p)>0$, $D_1=P'(s_1)>0$, $D_2=|P'(s_2)|>0$. The complete acceleration becomes

$$
A(T,L)=k\left[\frac{T-s_p(L)}{D_p(L)}-\frac{T-s_1(L)}{D_1(L)}-\frac{T-s_2(L)}{D_2(L)}\right]=\alpha(L)T+\beta(L),
$$

$$
\alpha=k\left(\frac1{D_p}-\frac1{D_1}-\frac1{D_2}\right),\qquad
\beta=k\left(-\frac{s_p}{D_p}+\frac{s_1}{D_1}+\frac{s_2}{D_2}\right).
$$

For $w=1+v>0$ and $Y=w^2$, the exact receiver-clock equations are

$$
\frac{dT}{dL}=\frac1{\sqrt Y},\qquad \frac{dY}{dL}=2[\alpha(L)T+\beta(L)],\qquad x=L-T,\qquad v=-1+\sqrt Y.
$$

A turn is $Y=1$, a regular point of this chart. A recross is $Y=0$, where the $L$ chart fails. Reaching $P_m$ is an inherited self-source fold, with both self terms negative; it demands another event treatment. A root derivative or clock gap failing earlier also withdraws the chart. Contact cannot be the first event before a turn because $x<0$ and $v<0$. These alternatives, rather than an arbitrary horizon, delimit a legitimate outgoing computation.

## The parameter is not the finite acceleration trace

Shift $T_u$ to zero in the following local equations. Use $q=T_u-s_2>0$, $p(q)=Bq+O(q^2)$, $w=1+v>0$, $z=(T-T_u)/q$, $W=w/q$. The regular older-root acceleration is $A_o(T,x)$, with $A_o(T_u,x_u)=H$. Including the new self root gives exactly

$$
T_q=\frac{p(q)}w,\qquad (w^2)_q=2p(q)A_o(T,x)-2k(T-T_u+q).
$$

In logarithmic source time $\eta=\log q$, the limiting system is

$$
\dot z=\frac B W-z,\qquad \dot W=\frac{HB-k(z+1)}W-W.
$$

Its positive fixed points obey $z_*=B/W_*$ and

$$
W_*^2=HB-k(z_*+1),\qquad b=\frac{W_*^2}B=H-\frac kB-\frac{k}{\sqrt{Bb}}.
$$

If

$$
H>\frac kB+3\left(\frac{k}{2\sqrt B}\right)^{2/3},
$$

there are two positive traces. The smaller fixed point has Jacobian

$$
J=\begin{pmatrix}-1&-B/W_*^2\\-k/W_*&-2\end{pmatrix},\qquad
\lambda_\pm=\frac{-3\pm\sqrt{1+4kB/W_*^3}}2,
$$

with $\lambda_-<0<\lambda_+$. The bounded-past integral construction leaves one free positive-eigendirection parameter. Differences along it vanish like $q^{\lambda_+}$ in $(z,W)$ to leading linear order, while ordinary history forcing is $O(q)$. Thus a finite trace specifies the fixed point, not the family member. Forward integration initialized only with the trace at a small cutoff neither proves bounded-past membership nor fixes a mathematically declared parameter. A large $\lambda_+$ makes a finite cutoff particularly ill-conditioned: shrinking the cutoff or observing agreement between forward solvers does not by itself establish a family parameter or exhaustive coverage.

## A derived family counterexample: arbitrarily early recrossings

First consider the limiting autonomous system, keeping $B,H$ distinct. Set

$$
g(W)=\frac{HB-W^2}{k}-1,\qquad g_0=\frac{HB}{k}-1.
$$

Let $W_*$ be the smaller positive fixed point. In the open strip

$$
0<W<W_*,\qquad g(W)<z<\frac B W,
$$

one has $\dot W<0$ and $\dot z>0$. The strip is forward invariant until $W=0$: on $z=g(W)$, $\dot W=0$ and $\dot z=B/W-g(W)>0$; on $z=B/W$, the derivative of $z-B/W$ is $B\dot W/W^2<0$. The inequality $g(W)<B/W$ for $0<W<W_*$ follows from the cubic fixed-point equation: the smaller root is the first positive crossing of $W^3-(HB-k)W+kB$.

The negative-$W$ side of the saddle's unstable orbit enters this strip. Its tangent slope satisfies

$$
\frac{\delta z}{\delta W}=-\frac{B}{W_*^2(1+\lambda_+)}=-\frac{W_*}{k}(2+\lambda_+),
$$

which lies strictly between the slopes of the upper and lower strip boundaries. This proves entry, rather than assuming a phase portrait.

This orbit reaches $W=0$ at finite logarithmic source time and finite $z$. To see this, if $W$ tended to a positive limit, the monotone bounded $z,W$ would tend to a fixed point below $W_*$, which does not exist. Hence $W$ tends to zero unless it reaches the boundary earlier. The orbit must pass $z=g_0+\delta$ for some $\delta>0$: if $z\leq g_0$ at finite time, $\dot W\geq-W$ prevents finite-time zero, whereas if it stayed there for infinite time then $\dot z=B/W-z$ would become unbounded and contradict bounded $z$. Once $z\geq g_0+\delta$,

$$
W\dot W\leq-k\delta,
$$

so zero occurs in finite time. Also

$$
\left|\frac{dz}{dW}\right|=\frac{B-zW}{k(z-g_0)+W^2}\leq\frac B{k\delta},
$$

which gives finite limiting $z=z_e>g_0$. The receiver time is finite because $T_q=B/W$ has only an integrable square-root divergence. At the endpoint the physical acceleration is finite and strictly negative:

$$
A_e=H-\frac{k(z_e+1)}B=-\frac{k(z_e-g_0)}B<0.
$$

The limiting trajectory therefore recrosses $v=-1$ transversely.

This behavior persists for the actual smooth supplied history, and yields exact conditional counterexamples. Choose a small section on the negative side of the limiting unstable orbit, and place it at source scale $q=\varepsilon$. The bounded-past integral equations for the smaller-trace family converge to their autonomous counterparts as $\varepsilon\to0$: the forcing and its local Lipschitz perturbation are $O(\varepsilon)$ on the backwards weighted tube. Their fixed points, for the same section parameter, converge by the contraction estimate. Thus actual bounded-past family members approach the chosen autonomous orbit section.

On the ensuing finite scaled interval set $q=\varepsilon r$, $T-T_u=\varepsilon t$, $w=\varepsilon u$. The exact equations in receiver time are

$$
\frac{dr}{dt}=\frac{u}{p(\varepsilon r)/\varepsilon},\qquad
\frac{du}{dt}=A_o(T_u+\varepsilon t,x)-\frac{k(t+r)}{p(\varepsilon r)/\varepsilon}.
$$

For $r$ bounded away from zero they converge in continuously differentiable norm to $r_t=u/(Br)$ and $u_t=H-k(t+r)/(Br)$. These equations remain regular at $u=0$. Continuous dependence and the strictly negative endpoint derivative therefore preserve a first transverse zero of $u$ for all sufficiently small $\varepsilon$. Before it, $w>0$ and remains $O(\varepsilon)$, so $v=-1+w<0$ and cannot reach zero. The receiver displacement is $O(\varepsilon)$ and the clock increment $L-P_u$ is $O(\varepsilon^2)$; all strict old-root and peak gaps remain valid. The complete one-partner/two-self census therefore persists up to this recross.

**Conditional theorem.** Under the smooth-history, strict-gap and strict-threshold hypotheses stated above, for every sufficiently small positive time bound there is a member of the admitted smaller-trace family whose next event is a downward crossing of $v=-1$ inside that bound, with finite negative incoming acceleration and no preceding $v=0$ turn. The proof does not choose a new law. It uses different allowed values of the existing free mode. It stops at the next crossing and does not assume its further continuation.

The theorem refutes a common *first outgoing turn* for the entire smaller-trace family. It does not prove that all members recross, that positive-side members turn, or that branches which recross can never turn later. Those are separate event problems. In particular a numerically measured turn of one parameter value is consistent with this theorem but cannot override its family counterexamples.

## Evidence and falsifiers

The clock census, receiver-clock equations, invariant strip, transverse limiting event and smooth perturbation argument are derived conditional results. The known-case reference here is the analytically derived parabolic-source/constant-older-acceleration limiting equations, with signs and fixed-point equation derived directly from the complete local law. No numerical instrument or new target calculation was used to establish them. The parabolic limit is a local mathematical scaling reference, not a substitute prescribed trajectory offered as the full selected release.

A material falsifier would be an admitted additional root under the stated global clock inequalities, a sign error in the complete three-row acceleration, failure of the bounded-past saddle construction under the stated differentiability conditions, failure of the invariant-strip inequalities, or loss of transversality in the limiting event. For numerical application inspect the complete clock extrema, measured source gaps, independently separated left curvature and older acceleration, the outgoing parameter definition, and the declared section conditions. Failure of those hypotheses withdraws the exact theorem's application. Finite curves or refinement alone cannot establish an all-family outcome.

The numerical worker's BVP, parameter coverage and stopping conditions require a separate read-only audit. No claim about that instrument's results, exact selected-release certification, or evolution after the recross is made here.

## What follows locally at the recross, and what remains unproved

The recross counterexample has a strict local maximum of the newly evolved $P$ history. Let its time be $T_d$, and set $B_d=-A(T_d^-)>0$. The two existing self roots and the partner root remain regular there; their surviving acceleration equals $-B_d$ for an exact incoming solution. A new negative self source is born on the increasing segment immediately before $T_d$. The same downward-birth calculation as at the first speed crossing gives the inward positive trace

$$
b_d=B_d+\frac{k}{B_d}+\frac{k}{\sqrt{B_d b_d}}.
$$

The right side decreases in $b_d>0$ while the left side increases, so there is exactly one positive solution. Its regular-singular Jacobian has negative eigenvalue real parts, and the bounded-past contraction gives a unique local continuation within this finite inward-trace class, under the same smooth older-root and clock-gap conditions. This is an actual immediate continuation of the constructed recross, not a claim about all weaker regularity classes.

Immediately after that recross, the complete census is one negative partner plus **three** negative self roots: the original premaximum ascending source, the source on the original incoming descending segment before $T_u$, and the newly born source on the outgoing ascending segment between $T_u$ and $T_d$. No one of them may be suppressed to recover the earlier two-root equation.

If the receiver subsequently decreases $P$ back to $P_u$, the latter two self sources meet at the inherited minimum and disappear. The census then changes from one partner plus three self roots to one partner plus one self root. Reaching that level before a further receiver crossing or another margin failure has not been proved here. It is a precise additional event problem; the recross alone does not prove eventual turn or its absence.

There is, however, no new fixed-history integrability obstruction at that self fold when it is reached with $v<-1$ and positive source delay. If the two source curvatures at $T_u$ are $B>0$ and the selected upward branch trace $b_u>0$, then, with $r=\sqrt{P(T)-P_u}$ and $\Delta=T_f-T_u>0$ at reception,

$$
A_{\rm pair}=-\frac{k\Delta}{r}\left(\frac1{\sqrt{2B}}+\frac1{\sqrt{2b_u}}\right)+O(1).
$$

Both absolute weights have the same negative acceleration sign. Put $G=r(-A_{\rm pair})$, $R=$ the surviving-root acceleration, and $w_d=-(1+v)>0$. The coupled incoming equations are

$$
T_r=-\frac{2r}{w_d},\qquad v_r=\frac{2(G-rR)}{w_d}.
$$

Under sufficiently smooth two-sided source expansions and regular surviving roots, these are regular at $r=0$ and give continuous-velocity arrival; after disappearance the surviving-root receiver equation is regular. As in the earlier partner-fold theorem, this supplies conditional coupled transit and a finite integrated acceleration, rather than merely integrability on a prescribed path. It neither proves that the constructed recross branch reaches the fold nor restores uniqueness at a later upward birth. The next decisive obligation for an eventual-turn comparison is therefore the complete three-self-root interval and this minimum-fold approach, followed by its actual surviving-root evolution.
