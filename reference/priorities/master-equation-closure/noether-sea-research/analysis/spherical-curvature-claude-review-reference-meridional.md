# Review reference: the moving-source term for a source on its own meridian (six poles, prepared by the law)

Role: review (`ramon-e-moore` lens). Owner: the review role only. Written 2026-10-11 05:09:21 UTC. **Exposure disclosure:** this reference was authored after reading coverage wave 16 (report and script), which states the same objects; it is the review's own derivation, checked numerically against direct vector computation by [spherical-curvature-claude-review-wave16cov-check.py](../evidence/spherical-curvature-claude-review-wave16cov-check.py), but it is not a blind reference. No pole great-circle reference preceded it (adjudication-4 prep note; never authored for lack of time). Units $R=c_f=K=1$; acceleration language; grades per claim.

## 1. Geometry (derived)

Positrinos released from rest at $+\mathbf e_1,+\mathbf e_2,+\mathbf e_3$, electrinos at $-\mathbf e_i$. The release field on $P_1$ is $-(\mathbf e_2+\mathbf e_3)/\sqrt2$ (frozen reference §4.1: tangent magnitude $K/R^2$ away from the positrino cap), so $P_1$ moves on $\mathbf X_1(q)=\cos q\,\mathbf e_1-\sin q\,(\mathbf e_2+\mathbf e_3)/\sqrt2$ with unit tangent $\mathbf T_1=\dot{\mathbf X}_1=-\sin q\,\mathbf e_1-\cos q\,(\mathbf e_2+\mathbf e_3)/\sqrt2$. The cyclic permutation $C_3$ of the axes gives $\mathbf X_2(q)=\cos q\,\mathbf e_2-\sin q\,(\mathbf e_3+\mathbf e_1)/\sqrt2$, $\mathbf X_3$ likewise; inversion with polarity swap puts the electrinos at $-\mathbf X_i(q)$. The group (order 12) commutes with the law, so while the ordinary-chart continuation is unique all six share one $q(t)$ (symmetry waves 9–13, adjudications 11–13). On the window every root reads a site; the chords from $P_1$ are $\sqrt{2+\sqrt2\sin q}$ (like, $+\mathbf e_2,+\mathbf e_3$, increasing), $\sqrt{2-\sqrt2\sin q}$ (unlike, $-\mathbf e_2,-\mathbf e_3$, decreasing) and $2\cos(q/2)$ (antipode $-\mathbf e_1$). The window ends when $t=\sqrt{2-\sqrt2\sin q(t)}$ (adjudication-19), and the first post-release emissions read are those of $E_2$ and $E_3$, at equal delay because the mirror $\mathbf e_2\leftrightarrow\mathbf e_3$ fixes $P_1$'s path and swaps the two sources.

## 2. Root equation and transmitter factor (derived)

Let $q'=q(t-\tau)$ be the source's coordinate at emission. $E_2$ is at $-\mathbf X_2(q')$, so the emitter-to-receiver vector is $\mathbf r=\mathbf X_1(q)+\mathbf X_2(q')$ and, with $\mathbf X_1(q)\cdot\mathbf X_2(q')=-\sin(q+q')/\sqrt2+\sin q\sin q'/2$ (componentwise: $\cos q(-\sin q'/\sqrt2)+(-\sin q/\sqrt2)\cos q'+(\sin q\sin q')/2$),
$$r^2=2-\sqrt2\sin(q+q')+\sin q\sin q',\qquad\tau=r\big(q(t),q(t-\tau)\big).$$
The source velocity is $\dot{\mathbf Y}=-\dot q(t-\tau)\,\mathbf T_2(q')$, and with $\mathbf T_2\cdot\mathbf X_2=0$ and $\mathbf T_2(q')\cdot\mathbf X_1(q)=-\cos(q+q')/\sqrt2+\sin q\cos q'/2$,
$$\dot{\mathbf Y}\cdot\hat{\mathbf r}=\frac{v'M}{r},\quad M=\frac{\cos(q+q')}{\sqrt2}-\frac{\sin q\cos q'}{2},\qquad D_t=1-\dot{\mathbf Y}\cdot\hat{\mathbf r}=1-\frac{v'M}{r},\ v'=\dot q(t-\tau).$$
$M=1/\sqrt2$ at release and stays positive on the range here, so the source approaches along the line of sight and $D_t<1$ (weight above one), consistent with the in-plane rule of adjudication-15 §3. Root uniqueness: $h(\tau)=\tau-r$ has $dh/d\tau=1-\partial_{q'}r\cdot(-v')=1-v'M/r=D_t>0$ since $\partial_{q'}r=-M/r$ (checked: $-0.48058807$ by both routes).

## 3. The per-hit tangential acceleration and the post-reception law (derived)

The unlike hit attracts: $\mathbf A_E=-\hat{\mathbf r}/(r^2D_t)$, tangential part $\mathbf T_1\cdot\mathbf A_E=-(\mathbf T_1\cdot\mathbf r)/(r^3D_t)$ with $\mathbf T_1(q)\cdot\mathbf X_2(q')=-\cos(q+q')/\sqrt2+\cos q\sin q'/2$, hence
$$a_E(q,q',v')=\frac{N}{r^3D_t},\qquad N=\frac{\cos(q+q')}{\sqrt2}-\frac{\cos q\sin q'}{2},$$
which at $q'=v'=0$ is the fixed-image hit $\cos q/(\sqrt2(2-\sqrt2\sin q)^{3/2})$; at release $a_E=1/4$ per nearest electrino (the two together supply half of the release field $1$). The $E_3$ hit is the same number (mirror). With $F$ the five-fixed-image field, on $[T^*,t_{\rm like})$
$$\ddot q=g\big[F(q)-2a_E^{\rm fixed}(q)+2a_E(q,q(t-\tau),\dot q(t-\tau))\big],$$
continuous at $T^*$ (there $q'=v'=0$), with a jump in its first time derivative. Like images ($P_2$ at $+\mathbf X_2(q')$, receding, $D_t>1$) have $r^2=2+\sqrt2\sin(q+q')-\sin q\sin q'$ and are first read at $t=\sqrt{2+\sqrt2\sin q(t)}$; the antipode near $t\approx2$.

## 4. Derivatives for an affine step (derived)

$\dot\tau=(r_q\dot q+r_{q'}v')/(1+r_{q'}v')$ with $1+r_{q'}v'=D_t$; $\dfrac{da_E}{dt}=a_q\dot q+a_{q'}v'(1-\dot\tau)+a_{v'}\ddot q(t-\tau)(1-\dot\tau)$ with $\ddot q(t-\tau)=gF(q')$ on the window and $0$ before release (so a delayed-argument range reaching $s\le0$ needs the hull of $0$ and $gF$). Numerically confirmed along a sample path (formula $0.0557932$ against finite difference $0.0557939$, $1.3\times10^{-5}$ relative; $\dot\tau$ $-0.076255$ both ways).

## 5. Checks (measured)

Closed forms against direct vector computation at 200 random $(q,q',v')$: maximum difference $2.8\times10^{-16}$. Falsifier: any $(q,q',v')$ at which the closed forms differ from the vector computation, or a sign of $M$ below zero on a range where $D_t<1$ is claimed.

## 6. Addendum 2026-10-11 05:19:14 UTC: the like class (exposure disclosed: written after reading coverage wave 17)

With a class sign $\sigma$ ($+1$: unlike source $E_2$ at $-\mathbf X_2(q')$; $-1$: like source $P_2$ at $+\mathbf X_2(q')$), $\mathbf r=\mathbf X_1(q)+\sigma\mathbf X_2(q')$, $r^2=2-\sigma\sqrt2\sin(q+q')+\sigma\sin q\sin q'$ (like: $2+\sqrt2\sin(q+q')-\sin q\sin q'$, the fixed like chord at $q'=0$); the source velocity is $-\sigma v'\mathbf T_2(q')$, so $\dot{\mathbf Y}\cdot\hat{\mathbf r}=\sigma v'M/r$ and $D_t=1-\sigma v'M/r$: like sources recede ($D_t>1$, weight below one). The hit on $P_1$ is $\sigma_{\rm hit}(\mathbf T_1\cdot\mathbf r)/(r^3D_t)$ with $\sigma_{\rm hit}=+1$ (like, repelling) or $-1$ (unlike, attracting) and $\mathbf T_1\cdot\mathbf r=-\sigma N$, hence $N/(r^3D_t)$ for both classes; $\partial_{q'}r=-\sigma M/r$ gives $dh/d\tau=D_t>0$ for both. At release the like hit is $1/4$, equal to the fixed like term $\cos q/(\sqrt2(2+\sqrt2\sin q)^{3/2})$ at $q=0$. Checked against direct vector computation at 200 random points for each class: $4.4\times10^{-16}$ ([wave17cov check](../evidence/spherical-curvature-claude-review-wave17cov-check.py)). The antipode $E_1$ at $-\mathbf X_1(q')$ (approaching along the receiver's own great circle, chord $2\cos((q+q')/2)$) is the next class, read near $t\approx1.99$ at $g=1/10$.
