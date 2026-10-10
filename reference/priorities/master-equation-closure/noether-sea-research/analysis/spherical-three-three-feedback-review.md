# Independent reference for the primary post-release feedback history

This is the new feedback investigation's independent reviewer reference, frozen before reading any new dynamics or symmetry findings. It preserves all overnight reports unchanged. The admitted dispatch is `0800dd26-590e-48df-8ff0-ad91b31a3037`; all six source hashes matched its baseline by `shasum -a 256`. The [feedback plan](spherical-three-three-feedback-plan.md) supplies authority and deadlines: exploration ends 2026-10-10 22:52:29 UTC, closeout 2026-10-11 00:52:29 UTC. The coordinator owns synthesis. All results below are analytical; no numerical instrument, evolution solver or heavy job was launched.

## Scalar kernel and complete root contract

Use $K=c_f=1$, $R=10$, $g=K/R=1/10$, dimensionless absolute time $t=T/R$, and phase $q(t)$. Its complete preparation is $p(t)=t(1+4t)^3/4$ for $-1/4\le t\le0$ and zero earlier. Its speed lies in $[-1/16,1/4]$ and its phase in $[-27/4096,0]\subset[-1/128,0]$. Persistent source offset $k$ means transmitter label $i+k\pmod6$ for receiver $i$; polarity product is $(-1)^k$.

For each of the five partner roots, write emission time $s_k$, delay $d_k=t-s_k$, and

$$
x_k=\frac{k\pi/3+q(s_k)-q(t)}2,\qquad d_k=2\sin x_k.
$$

Here the prehistory supplies $q=p$ at nonpositive times. The branch domain established below has $0<x_k<\pi$, so no absolute-sine ambiguity is hidden. At a root the unit chord in the receiver frame is $(\sin x_k,-\cos x_k,0)$, and

$$
D_{t,k}=1+q'(s_k)\cos x_k,\qquad
D_{r,k}=1+q'(t)\cos x_k,\qquad
\frac{ds_k}{dt}=\frac{D_{r,k}}{D_{t,k}}.
$$

Directly, the scalar residual $t-s-2\sin x$ has derivatives $-D_t$ in $s$ and $D_r$ in $t$. The canonical complete projections and equation are

$$
\mathcal N(t)=\sum_{k=1}^5\frac{(-1)^k}{4\sin x_kD_{t,k}},\qquad
\mathcal F(t)=-\sum_{k=1}^5\frac{(-1)^k\cos x_k}{4\sin^2x_kD_{t,k}},
$$

$$
q''=g\mathcal F,\quad q(0)=0,\quad q'(0)=1/4,
\qquad \ell=R\lambda=-q'^2-g\mathcal N.
$$

Only the transmitter factor enters acceleration. All denominators are positive on this admitted sub-wake domain. Discrete rotation with cyclic label shift and global polarity reversal, plus plane reflection, preserves the complete histories and equation. Uniqueness therefore preserves a regular equatorial hexagon and equal simultaneous speeds, without fixing their value.

For a full history with speed at most $V<1$, partner delay residuals increase with lower Lipschitz slope $1-V$; their endpoint signs at delay zero and $2R$ give precisely one root per partner. The self chord is at most $V$ times delay, so no positive-delay self root exists. The zero-delay self diagonal is not a partner term. In dimensionless units, simultaneous separation one also gives partner delay at least $1/(1+V)$. These are derived completeness statements, not deleted-root conventions.

## Independent controls and history seams

At zero stationary phase and zero source velocity, the five roots have distances $1,\sqrt3,2,\sqrt3,1$, $D_t=1$, tangent sum zero and radial sum $1/\sqrt3-5/4$. With constant angular-speed complete history, the root equation reduces to $x+\beta\sin x=k\pi/6$ and $D_r=D_t$; this checks the sign and placement of the velocity factor without treating uniform rotation as the released solution. In the static-transmitter limit a vanishing receiver factor does not remove the per-hit acceleration. A control using a positive-delay self root under a globally strict sub-wake history would contradict the path-length inequality and must be rejected.

At $s=-1/4$, $p,p',p''$ match the stationary past, but its third derivative need not match. At $s=0$, position and velocity match the actual release, while $p''(0^-)=6$ and $q''(0^+)=0$. Thus the full history is $C^1$ at release and piecewise smoother, with a finite acceleration jump. There is no velocity impulse. The canonical interaction depends on source position and velocity, so it remains continuous as a root crosses $s=0$; its reception derivative may have a finite jump. Root maps remain $C^1$ with strictly positive playback, and the released position remains $C^2$ through the feedback event. At the earlier $s=-1/4$ seam the extra source regularity gives a continuously differentiable acceleration. No smoothing or event-passage law is introduced.

## A reached first release-emission event

Construct the implicit-root ordinary equation using the known negative-time preparation until the first root reaches zero. Bootstrap, for $0\le t\le1$, the receiver domain

$$
0\le q\le\frac12,\qquad 0<q'<\frac7{10}.
$$

Before the first zero-emission event, every source phase belongs to $[-1/128,0]$ and source velocity to $[-1/16,1/4]$. The half-angle signs are fixed: $\cos x_k\ge0$ for $k=1,2,3$ and negative for $k=4,5$. The following conservative term bounds follow directly from the scalar kernel:

| Contribution to $\mathcal F$ | Upper bound on positive magnitude | Upper bound on negative magnitude |
| --- | --- | --- |
| $k=1$ | $4$ | $0$ |
| $k=2$ | $0$ | $8/15$ |
| $k=3$ | $1/10$ | $0$ |
| $k=4$ | $2/9$ | $0$ |
| $k=5$ | $0$ | $7/6$ |

Here $\sin x_1>13/50$ and $D_{t,1}\ge15/16$, giving its bound below $2000/507<4$. To check the sine floor without a sampled trigonometric evaluation, use $\pi>25/8$, $q-p<1/2+1/128$, so $x_1>205/768$ and $\sin(205/768)>205/768-(205/768)^3/6>13/50$. For $k=2$, $x_2>\pi/4$, hence $\sin^2x_2>1/2$, with $D_t\ge15/16$. For $k=3$, $\cos x_3<65/256$, $\sin x_3>24/25$ and $D_t\ge15/16$, giving the bound $1/10$. For $k=4$, $\sin x_4\ge\sqrt3/2$, $|\cos x_4|\le1/2$, $D_t\ge3/4$. For $k=5$, $\sin x_5\ge1/2$, $|\cos x_5|\le\sqrt3/2<7/8$, $D_t\ge3/4$. All signs use the persistent polarity products.

Consequently

$$
-\frac{17}{100}<q''<\frac{389}{900},\qquad
\frac14-\frac{17}{100}t<q'(t)<\frac14+\frac{389}{900}t,
$$

$$
\frac t4-\frac{17}{200}t^2<q(t)<\frac t4+\frac{389}{1800}t^2.
$$

At $t\le1$ these bounds strictly improve the bootstrap: speed is between $2/25$ and $307/450<7/10$, and phase is below $839/1800<1/2$. Smoothness of the known-history root equation, nonzero denominators and separation thus prevent a prior breakdown. The solution continues until its zero-emission boundary or time one, with the entire constructed history sub-wake. This closes the full-root interpretation rather than presuming that an arbitrary prescribed future solves it.

A root at emission zero obeys $t=d_k^0(q(t))$, where $d_k^0(q)=2\sin(k\pi/6-q/2)$. For $0<q<1/2<\pi/6$, these five distances are strictly ordered

$$
d_1^0<d_5^0<d_2^0<d_4^0<d_3^0.
$$

The earliest zero-emission event is therefore $k=1$, simultaneously for the six ordered pairs $(i,i+1\pmod6)$. Define $t_F$ by

$$
t_F=2\sin\left(\frac\pi6-\frac{q(t_F)}2\right).
$$

This is a reached, unique event. The root seam function has positive derivative $D_r$, and the continuation bounds imply

$$
\frac7{10}<t_F<\frac9{10},\qquad 7<T_F=10t_F<9.
$$

For the lower bound, $d_1^0\ge1-q$ and at $t=7/10$ the upper phase estimate gives $t+q<1$. For the upper bound, $d_1^0\le1-(6/7)q$ because its derivative magnitude is at least $\sqrt3/2>6/7$; at $t=9/10$ the lower phase estimate is $3123/20000$, so $t+(6/7)q>1$. If the event had not occurred earlier, these opposite signs and continuity force it. Every other source still has negative emission time at $t_F$.

The same argument locates the first seam $s=-1/4$, whose equation is $t+1/4=d_1^0(q(t))$. It is reached uniquely with $1/2<t_B<7/10$, or $5<T_B<7$ in physical time, and has the same six forward-neighbor ties. The distance ordering also orders the other fixed-seam crossings whenever they occur within this phase domain; it does not assert that every later seam crossing has already been reached.

## A nonzero actual-feedback interval

At $t_F<9/10$, the preceding bounds give

$$
\frac{97}{1000}<q'(t_F)<\frac{639}{1000},\qquad q(t_F)<\frac{8001}{20000}.
$$

Continue for $0\le h=t-t_F\le1/100$ using the already generated history. Bootstrap the same phase ceiling $1/2$ and speed ceiling $7/10$. All source velocities now lie in $[-1/16,7/10]$, and their phases are no greater than the current phase because the released motion stays increasing. Thus the same half-angle bounds apply; the two negative-cosine denominators may now be as small as $3/10$. Replacing their table bounds gives

$$
-\frac{69}{200}<q''<\frac{419}{900}.
$$

Integration improves the new bootstrap to $9/100<q'<13/20$ and $q<8131/20000<1/2$ on the full additional interval. The complete history speed is therefore below $7/10$, all $D_t,D_r$ exceed $3/10$, and every partner delay exceeds $10/17$. Since $1/100<10/17$, every source emission on this continuation is earlier than $t_F$ and belongs to the retained constructed history. This is an ordinary method-of-steps problem with no unknown future source and no competing numerical evolution solver. Local implicit-root/ODE existence and these strict bounds close the whole interval through $t_F+1/100$.

The forward-neighbor roots cross from $s=0$ to $s>0$ because their playback derivative stays positive. In particular the interval contains actual interactions emitted by the generated release. Their emission times remain below $t_F$, as just proved. This satisfies post-release feedback rather than merely arrival of the negative-time preparation. The complete ledger remains thirty directed partner roots, no positive-delay self roots and exact regular-hexagon separation at least one dimensionlessly, or ten physically. The extension length is $1/10$ in physical time.

## Signed radial support and current limit

The exact support throughout is

$$
\lambda(T)=\frac1{10}\left[-q'(T/10)^2-\frac1{10}\mathcal N(T/10)\right].
$$

Initially $\ell(0)=(1/10)(5/4-1/\sqrt3)-1/16>0$, so support is outward on a nonzero release neighborhood by continuity. The previous static-source identity $N'=-f/2$ and its scalar first integral cease to govern after the first moving-preparation arrival and are not used here.

On the whole domain through $t_F+1/100$, direct signed term bounds give $-3<\mathcal N<7/5$. For the negative radial terms, the magnitudes are bounded by $40/39$, $5/18$ and $5/3$, whose sum is below three. For the positive radial terms they are bounded by $8/21$ and $35/36$, whose sum is below $7/5$. Hence

$$
-\frac{63}{100}<\ell<\frac3{10},\qquad
-\frac{63}{1000}<\lambda<\frac3{100}.
$$

These are signed finite enclosures, not a constant-sign theorem. They leave the support sign away from its initial neighborhood undecided and do not locate any zero. A sharper independently reviewed sign/zero result from the forthcoming subject would require its own inequalities. The reachability and feedback proof above does not depend on that unresolved sign classification, because the selected normal support allows either sign.

## Scope, falsifiers and handoff

Derived here: complete delayed scalar kernel, root completeness and ordinary derivative margins, seam regularity, reached first preparation and release-emission events, a nonzero actual post-release feedback interval, exact signed support formula and conservative finite bounds. Not derived here: a complete support-sign itinerary, long-time motion, recurrence, surface occupation, free confinement, energy mapping or stability. A wrong source velocity factor, failed term bound, incorrect seam order, failure of a strict continuation bound or missing root would falsify the corresponding result.

This analytical reference is frozen before any new feedback subject is inspected. Controls are direct substitutions and inequalities, not an unrun numerical claim. Current source identities were verified; no source mismatch occurred. Only this new feedback-review document was written. All original overnight evidence remains unchanged. There is no reviewer scientific command session or lease running. The next dependency is the coordinator's exact frozen primary subject for adversarial comparison. The receiving account remains the coordinator-owned feedback synthesis.
