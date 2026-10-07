# Reconstruction of constant-speed and finite-window rigidity

**Derived skeptical reconstruction, with the advertised conclusions known.** This note is frozen before rereading the prior speed-limit, shape and finite-window reference assessments. It independently checks their load-bearing implication using the already accepted compact infinite regime. It is not blind to the theorem statements, a new physical target, or a new existence assertion for an infinite member.

The equation is the original coefficient-one logarithmic mirror-planar response with $K=R_*=c_f=1$. The complete held/patched/analytic preparation and its admitted compatible perturbation family remain unchanged. The certified spiral parameters denote their exact balance zero, not the center of a numerical rectangle.

## Complete normalized limits, including unit points

Fix one actual infinite strict-subfield member and write $w=t-s_0$. The accepted [compact regime](authorized-cases-ten-hour-c-spiral-compact-infinite-regime.md), separately reconstructed in the [earlier compactness audit](authorized-cases-ten-hour-c-compactness-audit-reconstruction.md), supplies branch-dependent constants and complete positive-time limits of

$$
P_w(u)=\frac{x(s_0+wu)}w,\qquad u>0.
$$

For each limit $Q$, on every compact positive interval,

$$
c_r u\le |Q(u)|\le\frac{19}{20}u,\qquad
|Q'|\le1,\qquad Q\times Q'>0,
\qquad
\frac{u}{39}\le s(u)<u,\qquad D\ge d>0.
\tag{1}
$$

The positive angular momentum has a uniform positive normalized tangential margin inherited from the fixed branch. Position and acceleration converge in $C^2$ on these intervals. Sources and their sources lie in successively larger compact positive windows, so passing the delayed velocity and differentiating the response do not sample the collapsed origin.

In particular, if $L=u-s(u)$, the derivative estimates use source acceleration through

$$
D'=n'\cdot Q'(s)+n\cdot Q''(s)s'.
$$

For bounds $|n'|\le N_1$, $|L'|\le L_1$, $|D'|\le D_1$, $L\ge B>0$, $D\ge d>0$, differentiation gives the sum

$$
|Q'''|\le\frac{N_1}{Bd}
+\frac{L_1}{B^2d}
+\frac{D_1}{Bd^2}.
\tag{2}
$$

No source jerk is needed in this equation. The sum in (2) also makes explicit the intended derivative estimate in the earlier compactness reconstruction, whose displayed three terms were printed without separating plus signs. This transcription issue does not remove boundedness of the differentiated row.

The limiting partner root is unique: its full scalar residual is nonincreasing under $|Q'|\le1$, and is strictly decreasing near the selected root because $D\ge d$. A second zero anywhere would contradict this combination. At nonpositive scaled source times the collapsed position is zero; $|Q(u)|\le19u/20$ gives positive root residual, so no partner or self source is lost at the collapsed origin. A positive-delay self root at positive times would force a straight unit-speed interval by equality in the chord-length inequality. The limiting partner acceleration

$$
Q''=-\frac{n}{LD}
\tag{3}
$$

is nonzero everywhere, excluding such an interval. Thus the full relevant census survives even at an isolated unit-speed point. This is regularity of these limiting histories, not an open full-root chart across arbitrary superfield variations.

The inherited lag lies in $[0,\pi/2]$. Positive angular motion makes it strictly positive. The endpoint displacement inequality is strict even when the limiting speed attains one: equality would again require a straight unit-speed interval. Therefore $Q(u)\cdot Q(s)>0$ and the continuously lifted lag is strictly less than $\pi/2$. There is no hidden full turn because the angle lift is inherited from the complete source interval. These strict geometric facts are enough for the classification below.

## A finite constant-speed window supplies two nested source levels

Suppose $|Q'|=\nu$ on $I=(A,B)$, where $B>39^2A$. Positive angular momentum excludes $\nu=0$. Retain $0<\nu\le1$ until the unit case is separately excluded. Constant speed in (3) gives $n\cdot Q'=0$; the positive orientation and $Q\cdot n>0$ select

$$
Q'=\nu Jn,\qquad
n'=\frac{Jn}{\nu LD},\qquad s'=\frac1D>0
\quad\text{on }I.
\tag{4}
$$

Let $J_I=\{u\in I:s(u)\in I\}$. It is one connected open interval because $s$ is increasing on $I$, and it contains $(39A,B)$. On $J_I$, both the current and sampled velocities have magnitude $\nu$. The continuously lifted normal-heading difference $\gamma=\arg n(u)-\arg n(s(u))$ is positive because the whole intervening interval lies in $I$ and $n$ rotates positively there.

At any point of $I$, the velocity's angle relative to the receiving radial ray lies strictly between zero and $\pi/2$: $n$ lies between the earlier and receiving radial rays, and $Q'=\nu Jn$. Combining this statement at both ends with the acute position lag bounds $\gamma<\pi$. Thus the actual lift, not merely its trigonometric representative, belongs to $(0,\pi)$.

In current normal coordinates the source velocity is $\nu(\sin\gamma,\cos\gamma)$. Differentiating the chord and comparing its tangential component with (4) gives

$$
D=1+\nu\sin\gamma,\qquad
\nu^2(1+\nu\sin\gamma+\cos\gamma)=1.
\tag{5}
$$

For fixed positive $\nu$, the level set in (5) is finite in $(0,\pi)$. Its continuous value on connected $J_I$ is constant. Consequently $D>1$, $\lambda=1/D\in(0,1)$, and for constants $c,\phi,C,A_0$,

$$
s(u)=c+\lambda(u-c),\qquad
L(u)=(1-\lambda)(u-c),\qquad
\omega=\frac{\lambda}{\nu(1-\lambda)},
$$

$$
n(u)=e^{i[\omega\log(u-c)+\phi]},\qquad
Q(u)=C+A_0(u-c)^{1+i\omega}
\quad(u\in J_I).
\tag{6}
$$

The positive range guarantees $u-c>0$ throughout that interval.

For any $u\in(39^2A,B)$, both $u$ and $s(u)$ belong to $J_I$. This supplies an open, genuinely double-sampled interval. On it the chord identity becomes

$$
2C(u-c)^{-1-i\omega}
+A_0(1+\lambda^{1+i\omega})
=(1-\lambda)e^{i\phi}.
\tag{7}
$$

Differentiating (7) forces $C=0$. This operation occurs on a finite open interval and needs no asymptotic argument.

If $\nu=1$, equation (5) gives $\gamma=3\pi/4$, $D=1+1/\sqrt2$ and $\omega=\sqrt2$. Integrating the normal angle between the two endpoints now also gives

$$
\gamma=\sqrt2\log(1+1/\sqrt2)<1,
$$

by $\log(1+x)<x$. This contradicts $3\pi/4>1$. Thus $\nu<1$. The remaining direction, magnitude and clock identities are exactly those of the accepted acute positive-frequency spiral classification. Its reversible scalar count fixes the unique certified triple $(a,\omega,\lambda)$ and hence $\nu=\nu_*=a\sqrt{1+\omega^2}$. This invokes the classified algebraic parameter domain; it does not supply a new negative-time preparation to $Q$.

## Backward reconstruction fixes the virtual origin

Choose $a_0,b_0\in J_I$ with $b_0>39a_0$, possible because $B>39^2A$. The interval $[a_0,b_0]$ is already the classified spiral arc in (6) with $C=0$, and its source at $b_0$ satisfies $s(b_0)>a_0$. The ordinary equation on a known spiral arc fixes $n=-Q''/|Q''|$ and $LD=1/|Q''|$. Equation (4) then yields the actual scalar delay equation

$$
L'=1-|Q''|L.
\tag{8}
$$

The known right-end range fixes its unique backward solution. The exact chord recovers the earlier actual values by

$$
Q(s(u))=L(u)n(u)-Q(u),\qquad
s(u)=c+\lambda(u-c).
\tag{9}
$$

Because $s(b_0)>a_0$, the recovered interval overlaps and joins the known interval. Equality of derivatives follows on its interior and at regular endpoints by continuity. Repeating with $b_0$ fixed extends the left endpoint to $a_k=c+\lambda^k(a_0-c)$.

If $c>0$, the resulting spiral radii tend to zero at positive time $c$, contradicting $|Q(c)|\ge c_r c$. If $c<0$, at some positive left endpoint the next recovered source would be nonpositive, contradicting the retained source bound $s(u)\ge u/39>0$. Therefore $c=0$, and iteration proves the exact spiral on all $(0,b_0]$.

Forward uniqueness requires only the selected ordinary partner equation on existing at-most-unit histories. On each finite subsequent step the delay has a positive lower bound and the complete already known positive source segment is common. The implicit partner root and response are locally Lipschitz in the receiving position there. Ordinary differential uniqueness therefore extends equality step by step. The reconstructed spiral is strictly subfield, so its root margins remain strict. No backward uniqueness of arbitrary delay histories is asserted.

Thus constant scalar speed on one window with ratio exceeding $39^2$ determines the entire complete normalized trajectory, including its origin.

## Conditional whole-limit identification and phase

If the actual physical speed has a scalar limit $\nu$, then every complete normalized limit has constant speed $\nu$ on every positive compact interval. Apply the finite-window classification above to any one interval of ratio 1600. Every limit is the origin-zero spiral, with an arbitrary constant spatial phase. Hence $\nu=\nu_*$.

Rotate each actual normalized history by its current phase:

$$
\widehat P_t(u)=e^{-i\theta(t)}
\frac{x(s_0+(t-s_0)u)}{t-s_0}.
\tag{10}
$$

Alignment fixes the phase of every subsequential limit at $u=1$. Compactness then makes the whole aligned family converge in $C^2$ on each compact positive interval to $au e^{i\omega\log u}$. This identifies every element of the aligned limiting history set, not only one selected subsequence. The root and denominator converge by their ordinary implicit equation and complete-source convergence, giving the claimed radial, tangential and source-ratio limits.

This statement does not show convergence of $\theta(t)-\omega\log(t-s_0)$ to a constant. Alignment at each receiving time removes a potentially accumulating phase offset. Convergence on each fixed scale interval controls phase differences over that interval; no integrable rate for the accumulated offset has been proved.

## Factor 1600 and the history diagnostic

Since $1600>39^2$, any complete normalized limit constant in speed on $[1,1600]$ is the exact spiral just classified. Fix one actual infinite branch and a retained history interval $[e^{-H},1]$ with $H>\log39$, so it includes every immediate source at the current endpoint. Use its position/velocity $C^1$ norm after current-phase alignment; equivalently use the established logarithmic-history norm.

If histories at arbitrarily late receptions stayed a fixed distance from the spiral while the following normalized speed oscillation tended to zero, complete compactness would produce a limiting curve with constant speed on $[1,1600]$ and a nonsingular retained past. Classification makes that past exactly the spiral, a contradiction. Therefore each fixed positive history distance has a positive, generally unevaluated, eventual oscillation threshold.

In physical time the future interval is exactly

$$
[\,t,\ s_0+1600(t-s_0)\,],
\tag{11}
$$

and in logarithmic elapsed time $\tau=\log(t-s_0)$ it has length $\log1600$. It is not the interval $[t,1600t]$ unless $s_0=0$.

Conversely, convergence of the complete retained histories to the spiral makes every future-window limit the same spiral by ordinary forward uniqueness from that history. Thus its speed variation tends to zero. Here complete means a fixed history wide enough to contain the required source interval; convergence of only a receiving state or an arbitrarily short position arc is not the invoked premise. The diagnostic does not assert that the actual limiting set consists only of the spiral: a set containing both the spiral and other histories can admit long near-spiral passages and later departures.

## Freeze and boundaries

This reconstruction finds no consequential gap in the conditional rigidity implication. It uses the accepted compact-regime theorem as a premise, with full root coverage at its unit-limit points. It does not prove infinite continuation of an actual perturbed member, existence of a speed limit, attraction, a fixed limiting phase offset, a uniform total-speed deficit, or an explicit oscillation threshold.

Known analytical controls are the exact admitted spiral in (4)–(9), the elementary unit-speed logarithm contradiction, and the exact coordinate change in (11). No computational instrument or scientific process is used. Only this new support note is written. Subsequent comparison with earlier reference assessments belongs in the separate final audit.
