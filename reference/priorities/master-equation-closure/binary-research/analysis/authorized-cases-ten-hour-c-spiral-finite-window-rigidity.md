# A finite constant-speed window determines the complete limiting spiral

## Statement

Claim grade: derived candidate awaiting independent assessment. For a complete normalized viable trajectory in the accepted logarithmic compact regime, constant scalar speed on $[1,1600]$ forces the entire positive-time trajectory to be the classified expanding spiral with virtual origin zero. The scalar speed need not have been assumed constant outside that one window.

Consequently, along any actual infinite branch, a normalized history that remains a fixed distance from the spiral must exhibit a fixed nonzero scalar-speed variation within the subsequent factor-1600 elapsed-time window. The variation threshold is existential and depends on that distance and the branch's compact regime. This is a finite-window rigidity test, not a classification of the actual attained invariant set.

The law, exact certified balance root, actual family, full-root treatment and $c_f=1$ are those of the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). Use the accepted [constant-speed calculation](authorized-cases-ten-hour-c-spiral-constant-speed-obstruction.md), [global spiral classification](alternatives-screen-2026-10-05-logarithmic-spiral-classification-adjudication.md), and [compact infinite regime](authorized-cases-ten-hour-c-spiral-compact-infinite-regime.md). The exact spiral parameters remain bound to their certified rectangle, not printed decimals.

## 1. Constant speed on a finite interval

Let the complete normalized curve $Q$ have speed $\nu$ on $I=(A,B)$, where $B>39^2A$. Positive angular momentum excludes $\nu=0$. The unit case is excluded by the finite two-generation argument in the [recurrent subfield-window subject](authorized-cases-ten-hour-c-spiral-recurrent-subfield-window.md); its short algebra is also reproduced by the identities below with $\nu=1$. Thus consider $0<\nu<1$.

Constant speed, positive orientation and the unchanged response give

$$
v=\nu Jn,\qquad
n'=\frac{Jn}{\nu RD},\qquad s'=\frac1D>0.
\tag{1}
$$

Let $J_I=\{t\in I:s(t)\in I\}$. It is a connected open interval because $s$ increases on $I$, and it contains $(39A,B)$ by the accepted source ratio $s(t)\ge t/39$. On $J_I$, the current and source velocities both have speed $\nu$. Their continuously lifted heading difference $\gamma$ lies in $(0,\pi)$, using the same acute-lag and positive radial/tangential decomposition as the accepted constant-speed proof.

Comparing the two exact expressions for the chord-direction derivative gives

$$
\nu^2(1+\nu\sin\gamma+\cos\gamma)=1,
\qquad D=1+\nu\sin\gamma.
\tag{2}
$$

For fixed $\nu$, the first relation has only finitely many roots in $(0,\pi)$. Continuity on the connected interval makes $\gamma$ constant. Hence $D>1$ and $\lambda=1/D\in(0,1)$ are constant, and on $J_I$

$$
s(t)=c+\lambda(t-c),\qquad
R(t)=(1-\lambda)(t-c),\qquad
\omega=\frac{\lambda}{\nu(1-\lambda)}>0.
$$

Integrating (1) and then the velocity gives

$$
Q(t)=C+A_0(t-c)^{1+i\omega}
\quad(t\in J_I),
\qquad |A_0|=\frac\nu{\sqrt{1+\omega^2}}.
\tag{3}
$$

The complex symbol $A_0$ is an integration coefficient, distinct from the interval endpoint $A$.

## 2. One double-sampled subinterval removes the translation

There is an open subinterval on which both $t$ and $s(t)$ belong to $J_I$. Indeed, any $t>39^2A$ within $I$ has $s(t)>39A$ and $s(s(t))>A$. On that subinterval the chord equation uses (3) at both ends and gives

$$
2C(t-c)^{-1-i\omega}
+A_0(1+\lambda^{1+i\omega})
=(1-\lambda)e^{i\varphi_0}.
\tag{4}
$$

The last two terms are constant. The first is nonconstant unless $C=0$, as is seen by differentiating on this positive-length interval. Thus $C=0$. This replaces the infinite-time limit used in the earlier tail proof; a finite open double-sampled interval suffices.

The remaining chord and acceleration identities are exactly the two classified spiral balances and their source-clock relation. The actual lifted angle remains acute, and $0<\nu<1$. The accepted global parameter classification therefore fixes $|A_0|$, $\omega$ and $\lambda$ to the admitted exact triple, up to the current phase and virtual time origin. It does not classify or replace the original supplied past.

For $\nu=1$, the same identities first fix $\gamma=3\pi/4$, $D=1+1/\sqrt2$ and $\lambda=2-\sqrt2$. Integrating the normal angle on the double-sampled interval then gives $\gamma=\sqrt2\log(1+1/\sqrt2)<1$, a contradiction. Thus the unit case was excluded without requiring any full unit-speed tail.

## 3. The finite spiral arc propagates backwards and pins its origin

Choose $a,b\in J_I$ with $b>39a$; this is possible because $B>39^2A$. On $[a,b]$, the actual curve is the classified spiral (3) with $C=0$. Its range is the known affine range above, and its source at $b$ lies above $a$.

On any already known common spiral arc, the actual nonzero acceleration fixes $n$ and $RD$. Since $n\cdot v=0$ there, the actual delay solves

$$
R'=1-|Q''|R.
\tag{5}
$$

The already known range at the right endpoint pins the unique solution of this linear equation backwards. The exact chord then recovers the preceding curve by

$$
Q(s(t))=R(t)n(t)-Q(t),\qquad
s(t)=c+\lambda(t-c).
\tag{6}
$$

Because $s(b)>a$, this recovered interval joins the original arc. Repeat the reconstruction with its new left endpoint, keeping $b$ fixed. Successive left endpoints are

$$
a_k=c+\lambda^k(a-c).
\tag{7}
$$

If $c>0$, they approach a positive time $c$ while the reconstructed radius approaches zero. This contradicts the compact regime's positive normalized radius floor $|Q(t)|\ge c_r t$. If $c<0$, some last positive $a_k$ would be assigned a nonpositive source by (6), contrary to the complete limit's retained positive source bound. Therefore $c=0$.

Equation (7) now approaches zero through positive times, proving equality with the origin-zero spiral on all of $(0,b]$. Local uniqueness among the existing ordinary, at-most-unit trajectories extends equality forward. Their positive delay floor keeps the next short source interval in the already common past, and the regular partner equation is locally Lipschitz in receiver position. Hence the entire complete positive-time trajectory is the exact spiral.

This reconstruction concerns only complete normalized limits on positive scaled time. It does not extend the physical prescribed preparation through its formal singular time and does not assume backward uniqueness for arbitrary histories.

## 4. A quantitative-in-form finite-window diagnostic

For a fixed actual infinite branch, normalize its past at current time $t$ by elapsed time $w=t-s_0$ and current spatial phase. Let $\Phi_t$ denote its position/velocity history on one fixed finite positive scaled interval ending at one, in the accepted $C^1$ topology. Let $\Phi_*$ be the admitted origin-zero spiral history with current phase fixed in the same way.

For every $\epsilon>0$, there are $\delta>0$ and a late cutoff such that

$$
\|\Phi_t-\Phi_*\|_{C^1}\ge\epsilon
\quad\Longrightarrow\quad
\operatorname{osc}_{t\le u\le s_0+1600(t-s_0)}|v(u)|\ge\delta.
\tag{8}
$$

To prove this, suppose there were later times with the left side at least $\epsilon$ and the speed variation tending to zero. Compactness gives a complete normalized limit whose speed is constant on $[1,1600]$. Sections 1–3 make it the exact phase-fixed spiral. Its past history then equals $\Phi_*$, contradicting the retained distance. No explicit numerical value of $\delta$ is supplied.

In particular, scalar-speed variation on these fixed multiplicative windows tends to zero if and only if the normalized complete finite histories converge to the admitted spiral. The forward implication follows from (8); for the converse, compactness and local continuous dependence identify every future-window limit with the same exact spiral. This implication is about local variation, so it does not assume a scalar speed limit as an input. The limit, when the condition holds, is the already classified spiral speed.

If the compact limiting history set is separated from the spiral state, (8) gives persistent nonzero speed variation in every late factor-1600 window. If the set contains the spiral and other states, this separation premise fails; long near-spiral passages and later departures are not excluded. The theorem supplies a precise distinction without claiming which set the actual perturbation family attains.

## Falsifiers and ownership

Falsifiers are failure of connectedness of the single-sampled interval under $s'>0$; a continuous nonconstant solution of the finite-level relation (2); a nonzero translation satisfying (4) on an open interval; invalid use of the classified balance domain; failure of the linear backward delay reconstruction; or loss of the positive source/radius constraints used to exclude $c\ne0$. The compactness consequence (8) also requires convergence on the whole future and retained past windows, not merely at the receiving point.

All arguments are analytical. The exact admitted spiral supplies the known constant-speed control, and the earlier accepted full Cartesian balances fix its parameter identity. No spectral target, new amplitude, altered past, receiver factor or numerical instrument is introduced. Only this new subject is written; prior frozen subjects and independent references remain unchanged. The parent coordinator owns shared integration, and independent assessment is required before acceptance.
