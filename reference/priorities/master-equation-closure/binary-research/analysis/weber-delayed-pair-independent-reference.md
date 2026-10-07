# Delayed Weber pair: separately authored independent reference (lane C)

**Status: working record of lane C of the [preregistered investigation](weber-delayed-pair-preregistration.md). Derivations were written before any code was written or run; the UTC time of each stage is stated in place.** The author read the preregistration, the [launch brief](weber-delayed-pair-launch-brief.md), Sections 1 and 9a of the [equation-variants manuscript](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation), the [frozen pair controls](weber-delayed-pair-controls.md) and, for method precedent only, the [ring independent reference](../../braid-program/analysis/weber-delayed-ring-independent-reference.md). No lane B file, no lane A investigation file and no `weber-frequency-*` or `weber-binding-sphere-*` file was opened. The validated Section 9 pair instrument is imported only to generate the Section 9 backward pasts and to supply the Section 9 side of known case 5.

Throughout, $K=c_f=1$ in every numerical instantiation, $c_f$ is kept symbolic where its dependence matters, $\sigma_{12}=\sigma_{21}=-1$, $\sigma_{11}=\sigma_{22}=+1$, and dots are total derivatives in absolute reception time $T$. Architrinos have no mass; every statement is about acceleration. The law is Section 9a exactly as frozen; no remedy of any kind is applied when it fails or leaves its domain.

## 1. Independent derivations

**Written 2026-10-06T03:14Z, before any code.**

### 1a. Range derivatives and the present-acceleration block

Fix a receiver $i$, a transmitter $j$ (possibly $j=i$) and a locally smooth ordinary root $S=S(T)$ of the arrival identity

$$
\mathscr R(T)=\|\mathbf X_i(T)-\mathbf X_j(S)\|=c_f\,(T-S),\qquad S<T .
$$

Write $\mathbf r=\mathbf X_i(T)-\mathbf X_j(S)$, $\mathbf n=\mathbf r/\mathscr R$, $D_r=c_f-\mathbf n\cdot\mathbf V_i(T)$, $D_t=c_f-\mathbf n\cdot\mathbf V_j(S)$. Differentiating $\mathbf r$ along the root gives $\dot{\mathbf r}=\mathbf V_i(T)-S'\,\mathbf V_j(S)$, so $\dot{\mathscr R}=\mathbf n\cdot\dot{\mathbf r}=\mathbf n\cdot\mathbf V_i-S'\,\mathbf n\cdot\mathbf V_j$. The right side of the identity gives $\dot{\mathscr R}=c_f(1-S')$. Equating, $S'\,(c_f-\mathbf n\cdot\mathbf V_j)=c_f-\mathbf n\cdot\mathbf V_i$, that is

$$
p:=S'=\frac{D_r}{D_t},\qquad \dot{\mathscr R}=c_f(1-p),\qquad \mathbf w:=\dot{\mathbf r}=\mathbf V_i(T)-p\,\mathbf V_j(S).
$$

For the second derivative, $\dot{\mathbf n}=(\mathbf w-(\mathbf n\cdot\mathbf w)\mathbf n)/\mathscr R=\mathbf w_\perp/\mathscr R$ and $\dot{\mathbf w}=\mathbf A_i(T)-p^2\mathbf A_j(S)-p'\,\mathbf V_j(S)$ with $p'=S''=-\ddot{\mathscr R}/c_f$. Hence

$$
\ddot{\mathscr R}=\dot{\mathbf n}\cdot\mathbf w+\mathbf n\cdot\dot{\mathbf w}
=\frac{\|\mathbf w_\perp\|^2}{\mathscr R}+\mathbf n\cdot\big(\mathbf A_i(T)-p^2\mathbf A_j(S)\big)+\frac{\ddot{\mathscr R}}{c_f}\,\mathbf n\cdot\mathbf V_j(S),
$$

and collecting $\ddot{\mathscr R}$, since $1-\mathbf n\cdot\mathbf V_j/c_f=D_t/c_f$,

$$
\boxed{\ \ddot{\mathscr R}=\frac{c_f}{D_t}\left[\mathbf n\cdot\big(\mathbf A_i(T)-p^2\mathbf A_j(S)\big)+\frac{\|\mathbf w_\perp\|^2}{\mathscr R}\right].\ }
$$

This agrees with the relations printed in Section 9a and in the ring reference; it was obtained here from the arrival identity alone. The bracket of the frozen law, $B=1-\dot{\mathscr R}^2/(2c_f^2)+\mathscr R\ddot{\mathscr R}/c_f^2$, is therefore affine in the present receiver acceleration. Its $\mathbf A_i$-dependent part is $\mathscr R\,(\mathbf n\cdot\mathbf A_i)/(c_fD_t)$, and the corresponding part of the hit $\sigma Kc_f\,B\,\mathbf n/(\mathscr R^2|D_t|)$ is $\sigma K\,\mathbf n\mathbf n^{\mathsf T}\mathbf A_i/(\mathscr R|D_t|D_t)$. Moving it to the left,

$$
M_i\,\mathbf A_i(T)=\mathbf b_i,\qquad
M_i=I-\sum_{j,S}\frac{\sigma_{ij}K}{\mathscr R|D_t|D_t}\,\mathbf n\mathbf n^{\mathsf T},\qquad
\mathbf b_i=\sum_{j,S}\frac{\sigma_{ij}Kc_f}{\mathscr R^2|D_t|}\left[1-\frac{(1-p)^2}{2}+\frac{\|\mathbf w_\perp\|^2-\mathscr R\,p^2\,\mathbf n\cdot\mathbf A_j(S)}{c_fD_t}\right]\mathbf n .
$$

For a pair with no self roots, $\mathbf b_i$ contains only history data (the partner's acceleration enters at the delayed time $S<T$), so the two members' present accelerations are found by two independent $3\times3$ solves; the present accelerations are not coupled to each other, in contrast to Section 9. Grade: derived. Falsifier: direct differentiation of the arrival identity on an ordinary $C^2$ root chart yielding a different $p$, $\dot{\mathscr R}$, $\ddot{\mathscr R}$ or block.

### 1b. The rigid mirror circle

Let $\mathbf X_1(T)=\rho(\cos\Omega T,\sin\Omega T,0)$, $\mathbf X_2=-\mathbf X_1$, $\beta=\Omega\rho/c_f$. By rotational covariance it suffices to take receiver 1 at $T=0$: $\mathbf X_1(0)=(\rho,0)$, $\mathbf V_1(0)=(0,\beta c_f)$, $\mathbf A_1(0)=-\Omega^2\rho\,(1,0)$. Put $d=\Omega(T-S)=-\Omega S>0$, so $T-S=d/\Omega=\rho d/(\beta c_f)$ and $\mathbf X_1(S)=\rho(\cos d,-\sin d)$, $\mathbf X_2(S)=\rho(-\cos d,\sin d)$, $\mathbf V_1(S)=\beta c_f(\sin d,\cos d)$, $\mathbf V_2(S)=-\mathbf V_1(S)$.

**Partner root equation.** $\mathbf r=\mathbf X_1(0)-\mathbf X_2(S)=\rho(1+\cos d,-\sin d)=2\rho\cos\tfrac d2\,(\cos\tfrac d2,-\sin\tfrac d2)$, so $\|\mathbf r\|=2\rho|\cos\tfrac d2|$ and the arrival identity reads

$$
g_{\mathrm p}(d)=d-2\beta\left|\cos\tfrac d2\right|=0,\qquad 0<d\le2\beta .
$$

On $(0,\pi)$ the equation is $d=2\beta\cos(d/2)$ with $g_{\mathrm p}'=1+\beta\sin(d/2)>0$, $g_{\mathrm p}(0^+)<0$, $g_{\mathrm p}(\pi)=\pi>0$: exactly one root for every $\beta>0$. Further partner roots need $d>\pi$, hence $2\beta>\pi$, i.e. $\beta>\pi/2$. For $\beta\le\pi/2$ the partner census is exactly one root.

**Self root equation.** $\mathbf r=\mathbf X_1(0)-\mathbf X_1(S)=\rho(1-\cos d,\sin d)=2\rho\sin\tfrac d2\,(\sin\tfrac d2,\cos\tfrac d2)$, $\|\mathbf r\|=2\rho|\sin\tfrac d2|$,

$$
g_{\mathrm s}(d)=d-2\beta\left|\sin\tfrac d2\right|=0,\qquad 0<d\le2\beta .
$$

For $0<\beta<1$: $g_{\mathrm s}'=1-\beta\cos(d/2)>0$ on $(0,\pi)$ and $g_{\mathrm s}(0)=0$, so $g_{\mathrm s}>0$ on $(0,\pi)$; beyond $\pi$ it needs $d\le2\beta<2<\pi$, impossible. No self root. At $\beta=1$: $g_{\mathrm s}(d)=d-2\sin(d/2)>0$ for $d>0$ since $\sin x<x$; no self root (the endpoint $d=0$ is the excluded same-time point). For $\beta>1$: $g_{\mathrm s}(d)\approx(1-\beta)d<0$ for small $d$ and $g_{\mathrm s}(2\pi)=2\pi>0$, so at least one self root in $(0,2\pi)$. The complete census for $\beta>1$ is obtained below by partitioning $(0,2\beta]$ at the zeros of the sine or cosine and at the zeros of $g'$ (closed form: $\sin(d/2)=\mp1/\beta$ for the partner, $\cos(d/2)=\pm1/\beta$ for the self branch); on each remaining interval $g$ is strictly monotone, so a sign change gives exactly one root and no sign change excludes one. This is a complete census, not a sampling.

**Closed form on the partner root** (take $\cos\frac d2>0$, which holds for the unique root when $\beta\le\pi/2$; the general case carries $s_{\mathrm p}=\operatorname{sign}\cos\frac d2$):

$$
\mathscr R=2\rho\cos\tfrac d2,\quad
\mathbf n=(\cos\tfrac d2,-\sin\tfrac d2),\quad
\mathbf n\cdot\mathbf V_2(S)=-\beta c_f\sin\tfrac d2,\quad
D_t=c_f\,(1+\beta\sin\tfrac d2)>0 .
$$

With $\sigma_{12}=-1$ and bracket one (proved next), the partner hit on receiver 1 is $-Kc_f\mathbf n/(\mathscr R^2D_t)$, with radial component (along $\hat{\mathbf e}_r=(1,0)$) and tangential component (along $\mathbf V_1$, $\hat{\mathbf e}_t=(0,1)$)

$$
a_r=-\frac{K}{4\rho^2\cos\frac d2\,(1+\beta\sin\frac d2)},\qquad
a_t=+\frac{K\sin\frac d2}{4\rho^2\cos^2\frac d2\,(1+\beta\sin\frac d2)} .
$$

These coincide with the values printed in known case 3 of the preregistration, derived here independently. The tangential component is strictly positive whenever $0<d<\pi$: the emission point of the partner lies on the receiver's forward side of the pair line, so the attraction has a component along the receiver's velocity.

**Closed form on a self root** ($s=\operatorname{sign}\sin\frac d2$): $\mathscr R=2\rho|\sin\frac d2|$, $\mathbf n=s(\sin\frac d2,\cos\frac d2)$, $\mathbf n\cdot\mathbf V_1(S)=s\beta c_f\cos\frac d2$, $D_t=c_f(1-s\beta\cos\frac d2)$; with $\sigma_{11}=+1$ the self hit is $+Kc_f\mathbf n/(\mathscr R^2|D_t|)$.

**Bracket exactly one on every root.** Two proofs. (i) The rigid history at time $T$ is the history at time $0$ rotated by $\Omega T$; the arrival identity is rotation invariant, so every root lag $T-S$ is independent of $T$, $\mathscr R=c_f(T-S)$ is constant along the branch, and $\dot{\mathscr R}=\ddot{\mathscr R}=0$ exactly, for partner and self roots alike. (ii) By the formulas of 1a on the partner root: $D_r=c_f-\mathbf n\cdot\mathbf V_1(0)=c_f(1+\beta\sin\frac d2)=D_t$, so $p=1$, $\dot{\mathscr R}=0$; $\mathbf w=\mathbf V_1(0)-\mathbf V_2(S)=2\beta c_f\cos\frac d2\,(\sin\frac d2,\cos\frac d2)\perp\mathbf n$, so $\|\mathbf w_\perp\|^2/\mathscr R=4\beta^2c_f^2\cos^2\frac d2/(2\rho\cos\frac d2)=\Omega^2\mathscr R$; and $\mathbf A_1(0)-\mathbf A_2(S)=-\Omega^2(\mathbf X_1(0)-\mathbf X_2(S))=-\Omega^2\mathbf r$, so $\mathbf n\cdot(\mathbf A_1-p^2\mathbf A_2(S))=-\Omega^2\mathscr R$. The two terms cancel and $\ddot{\mathscr R}=0$. Hence $B=1$ on every root of a rigid circle.

**Equivalence theorem.** On a complete rigid mirror circle, Section 9a evaluated with the rigid accelerations inserted gives, for every root, exactly the canonical hit $\sigma Kc_f\mathbf n/(\mathscr R^2|D_t|)$. Therefore the rigid circle satisfies Section 9a if and only if $-\Omega^2\rho\,\hat{\mathbf e}_r=\sum_{\text{roots}}\sigma Kc_f\mathbf n/(\mathscr R^2|D_t|)$, which is exactly the canonical balance condition on the same root census. Writing the summed canonical acceleration on receiver 1 as $(K/\rho^2)[C_r(\beta)\hat{\mathbf e}_r+C_t(\beta)\hat{\mathbf e}_t]$ with $u=\mathscr R/\rho=d/\beta$ and dimensionless $\hat D_t=D_t/c_f$,

$$
C_r=\sum_{\text{roots}}\frac{\sigma\,n_r}{u^2|\hat D_t|},\qquad C_t=\sum_{\text{roots}}\frac{\sigma\,n_t}{u^2|\hat D_t|},\qquad
\text{balance}\iff C_t(\beta)=0,\ C_r(\beta)<0,\ \rho=-\frac{K\,C_r(\beta)}{\beta^2c_f^2},\ \Omega=\frac{\beta c_f}{\rho}.
$$

**Role of $\det M_i$.** The equivalence above does not involve $M_i$: it is a statement about whether the rigid acceleration satisfies the implicit equation. $\det M_i\ne0$ is the separate condition that the implicit solve $M_i\mathbf A_i=\mathbf b_i$ has a unique solution, so that the rigid circle is the unique Section 9a continuation of its own past and the equation is inside its stated domain. If $\det M_i=0$ at a balanced circle, the rigid history still satisfies the equation but the law does not determine the present acceleration uniquely there; the circle is then a solution outside the domain of the first screen, not a counterexample to balance. On the circle, with $\rho$ fixed by the radial coefficient, $K/(\mathscr R|D_t|D_t)=-\beta^2/(u\,C_r|\hat D_t|\hat D_t)$ per root, so $\det M_1$ is a function of $\beta$ alone.

**Existence of exact circles.** For $0<\beta<1$ and at $\beta=1$ the census is one partner root with $0<d<\pi$ and no self root, so $C_t=\sin\frac d2/(u^2\hat D_t)>0$ strictly and no exact circle exists. For $\beta>1$ self roots enter (and for $\beta>\pi/2$ additional partner roots); $C_t(\beta)$ is evaluated below on a grid up to $\beta=6$ with the complete census, sign changes are bracketed and refined to $10^{-10}$, and for each balanced $\beta$ the radius $\rho=-KC_r/(\beta^2c_f^2)$ and $\det M_1$ are reported. Grade of the theorem and of the subfield nonexistence: derived. Falsifier: a rigid-circle root with nonzero $\dot{\mathscr R}$ or $\ddot{\mathscr R}$, or a root census for $\beta\le1$ containing more than one root. The numerical census for $\beta>1$ is a measured census of a closed-form equation whose completeness rests on the stated monotone partition.

### 1c. Slow-motion expansion

Let the history be smooth and separated with all speeds $\ll c_f$. Present quantities: $\mathbf r=\mathbf X_i(T)-\mathbf X_j(T)$, $r=\|\mathbf r\|$, $\mathbf e=\mathbf r/r$, $\mathbf v_i,\mathbf v_j$, $\mathbf a_j$; $\epsilon:=\mathbf e\cdot\mathbf v_j$, $\mathbf v_{j\perp}=\mathbf v_j-\epsilon\mathbf e$, $\alpha:=r\,\mathbf e\cdot\mathbf a_j$. The expansion is in $1/c_f$ at fixed $K$, with $r$, $\mathbf v$, $\mathbf a$ treated as order one, so the delay $\tau=T-S=O(1/c_f)$. Taylor expansion of the transmitter, $\mathbf X_j(S)=\mathbf X_j(T)-\tau\mathbf v_j+\tfrac12\tau^2\mathbf a_j+O(\tau^3)$, gives $\mathbf r_{ij}(T,S)=\mathbf r+\tau\mathbf v_j-\tfrac12\tau^2\mathbf a_j+O(c_f^{-3})$.

*Delay.* With $\tau=\tau_1/c_f+\tau_2/c_f^2+\tau_3/c_f^3$, the identity $\|\mathbf r_{ij}\|^2=c_f^2\tau^2$ gives order by order $\tau_1=r$, $\tau_2=r\epsilon$, $\tau_3=\tfrac r2\big[\epsilon^2+v_j^2-\alpha\big]$. Hence

$$
\mathscr R=r\Big[1+\frac{\epsilon}{c_f}+\frac{\epsilon^2+v_j^2-\alpha}{2c_f^2}\Big]+O(c_f^{-3}).
$$

*Line of action.* $\mathbf n=\mathbf r_{ij}/\mathscr R$ expands to

$$
\mathbf n=\mathbf e+\frac{\mathbf v_{j\perp}}{c_f}-\frac{1}{c_f^2}\Big[\frac r2\,\mathbf a_{j\perp}+\frac12v_{j\perp}^2\,\mathbf e\Big]+O(c_f^{-3}),
$$

which is a unit vector through this order. *Transmitter weight.* $\mathbf V_j(S)=\mathbf v_j-(r/c_f)\mathbf a_j+O(c_f^{-2})$, so $D_t=c_f-\epsilon-(v_{j\perp}^2-\alpha)/c_f+O(c_f^{-2})$ and $c_f/D_t=1+\epsilon/c_f+(v_j^2-\alpha)/c_f^2+O(c_f^{-3})$. *Delayed inverse square.* $1/\mathscr R^2=r^{-2}[1-2\epsilon/c_f+(2\epsilon^2-v_j^2+\alpha)/c_f^2]$. The product of the two scalar factors is

$$
\frac{c_f}{\mathscr R^2D_t}=\frac1{r^2}\Big[1-\frac{\epsilon}{c_f}+\frac{0}{c_f^2}\Big]+O(c_f^{-3}):
$$

the second-order terms of the delayed range and of the transmitter weight cancel identically, including their $\mathbf a_j$ dependence. Multiplying by $\mathbf n$, the canonical prefactor of Section 9a is

$$
\frac{c_f\,\mathbf n}{\mathscr R^2D_t}=\frac1{r^2}\Big\{\mathbf e+\frac{\mathbf v_j-2\epsilon\,\mathbf e}{c_f}-\frac{1}{c_f^2}\Big[\frac r2\mathbf a_{j\perp}+\frac12v_{j\perp}^2\mathbf e+\epsilon\,\mathbf v_{j\perp}\Big]\Big\}+O(c_f^{-3}).
$$

The first-order term decomposes by ingredient as $-2\epsilon\mathbf e$ (delayed range), $+\mathbf v_{j\perp}$ (delayed line of action), $+\epsilon\mathbf e$ (transmitter weight): no single ingredient produces $\mathbf v_j-2\epsilon\mathbf e$ alone, and the playback factor $p$ does not enter the prefactor at all.

*Bracket.* Through order $1/c_f^2$ only the leading terms of $\dot{\mathscr R}$ and $\ddot{\mathscr R}$ are needed. From 1a, $\dot{\mathscr R}=c_f(1-p)=(\mathbf n\cdot\mathbf v_i-\mathbf n\cdot\mathbf V_j(S))\,c_f/D_t=\mathbf e\cdot(\mathbf v_i-\mathbf v_j)+O(c_f^{-1})=\dot r+O(c_f^{-1})$, and $\ddot{\mathscr R}=\mathbf e\cdot(\mathbf a_i-\mathbf a_j)+\|(\mathbf v_i-\mathbf v_j)_\perp\|^2/r+O(c_f^{-1})=\ddot r+O(c_f^{-1})$, the same $\ddot r$ that Section 9 uses. Therefore

$$
B_{9\mathrm a}=1-\frac{\dot r^2}{2c_f^2}+\frac{r\ddot r}{c_f^2}+O(c_f^{-3})=B_9+O(c_f^{-3}):
$$

the two brackets agree through order $1/c_f^2$, and the playback factor $p$ and the delayed transmitter acceleration $\mathbf A_j(S)$ inside $\ddot{\mathscr R}$ first affect the bracket at order $1/c_f^3$. (The present transmitter acceleration does, however, appear at order $1/c_f^2$ in the line of action, through the emission position $\tfrac12\tau^2\mathbf a_j$; on a mirror pair $\mathbf a_{j\perp}$ is itself of relative order $1/c_f$, so for the pair this term is effectively third order.)

*Result.* Section 9a minus Section 9 on an identical slow history is

$$
\mathbf A^{9\mathrm a}_{i\leftarrow j}-\mathbf A^{9}_{i\leftarrow j}=\frac{\sigma K}{r^2}\Big\{\frac{\mathbf v_j-2(\mathbf e\cdot\mathbf v_j)\mathbf e}{c_f}-\frac1{c_f^2}\Big[\frac r2\mathbf a_{j\perp}+\frac12v_{j\perp}^2\mathbf e+(\mathbf e\cdot\mathbf v_j)\mathbf v_{j\perp}\Big]\Big\}+O(c_f^{-3}).
$$

The lowest-order departure is at order $1/c_f$, it is the canonical first-order term, and it destroys equal-and-opposite coupling: $\mathbf A^{9\mathrm a}_{1\leftarrow2}+\mathbf A^{9\mathrm a}_{2\leftarrow1}=-\sigma K[\dot{\mathbf r}-2\dot r\,\mathbf e]/(r^2c_f)+O(c_f^{-2})$ with $\dot{\mathbf r}=\mathbf v_1-\mathbf v_2$, nonzero in general.

*Secular rates for a slow near-circular mirror pair.* Mirror symmetry ($\mathbf X_2=-\mathbf X_1$) is preserved by the law (the law depends on polarity only through the symmetric $\sigma_{ij}$ and is covariant under point reflection), so $\mathbf r=2\mathbf X_1$, $h=\|\mathbf r\times\dot{\mathbf r}\|=4\|\mathbf X_1\times\mathbf V_1\|$ and $\dot h=4\,\mathbf X_1\times\mathbf A_1=4\rho\,a_t$ exactly, where $a_t$ is the component of $\mathbf A_1$ along $\hat{\mathbf z}\times\hat{\mathbf e}_r$. On the circle $\epsilon=0$, so the first-order term gives $a_t=K v/(4\rho^2c_f)$ with $v=\|\mathbf V_1\|$, in agreement with the small-$d$ limit of the exact circle formula of 1b ($d\to2\beta$). With $h=4\rho v$:

$$
\frac{dh}{dT}=\frac{Kh}{4\rho^2c_f}>0,\qquad
\rho_h=\frac{h^2}{4K}=\frac{4\rho^2v^2}{K},\qquad
\frac{d(\rho_h^2)}{dT}=\frac{h^3\dot h}{4K^2}=\frac{64\rho^4v^3a_t}{K^2}=\frac{16\rho^2v^4}{K\,c_f}=\frac{K}{c_f}\cdot\frac{16\rho^2v^4}{K^2}.
$$

On the zero-delay circle $4\rho v^2=K$, so $16\rho^2v^4/K^2=1$ and $d(\rho_h^2)/dT\to K/c_f$ as $\beta\to0$, positive: the pair expands at the adjudicated canonical leading rate. Using the exact rigid-circle coefficients of 1b to next order ($a_t\approx K\beta(1-\tfrac23\beta^2)/(4\rho^2)$ and radial balance $4\rho\beta^2c_f^2\approx K(1-\tfrac12\beta^2)$) gives the estimate $d(\rho_h^2)/dT\approx(K/c_f)(1-\tfrac53\beta^2)$, i.e. relative corrections of about $-0.07\%$, $-0.4\%$ and $-1.7\%$ at $\beta=0.02,0.05,0.1$; the leading rate is derived, the coefficient $-5/3$ is an estimate from rigid-circle geometry (inferred). Grade of the expansion: derived. Falsifier: a Taylor expansion of the same quantities disagreeing at any displayed order, or a measured Section 9a minus Section 9 difference on identical slow histories scaling as $\beta^2$.

### 1d. The present-acceleration determinant for $\sigma=-1$

With one partner root and no self root, $M_i=I+\dfrac{K}{\mathscr R|D_t|D_t}\,\mathbf n\mathbf n^{\mathsf T}$ (the sign $\sigma=-1$ absorbed). Its eigenvalues are $1$ (twice, transverse to $\mathbf n$) and $1+K/(\mathscr R|D_t|D_t)$ along $\mathbf n$, so

$$
\det M_i=1+\frac{K}{\mathscr R\,|D_t|\,D_t}=\begin{cases}1+K/(\mathscr RD_t^2)>1,&D_t>0,\\[2pt] 1-K/(\mathscr RD_t^2),&D_t<0.\end{cases}
$$

It can vanish only when $D_t<0$ and $\mathscr RD_t^2=K$. Since $D_t<0$ requires $\mathbf n\cdot\mathbf V_j(S)>c_f$, hence $\|\mathbf V_j(S)\|>c_f$, no obstruction is possible while the transmitter is subfield; and $\|\mathbf V_j\|<c_f$ for all past times also forbids self roots (for $S<T$, $\|\mathbf X_j(T)-\mathbf X_j(S)\|\le\int_S^T\|\mathbf V_j\|<c_f(T-S)$), so the single-root form of $M_i$ is then exact. With a self root present ($\sigma_{ii}=+1$, contribution $-K\mathbf n\mathbf n^{\mathsf T}/(\mathscr R|D_t|D_t)$), a self root with $D_t>0$ can bring $\det M_i$ to zero at $\mathscr R D_t^2=K$ along its own direction, and with several roots in distinct directions the determinant is that of $I-\sum c_k\mathbf n_k\mathbf n_k^{\mathsf T}$ and must be evaluated. Grade: derived. Falsifier: a subfield pair history on which the solved block is singular.

**End of derivations: 2026-10-06T03:20Z. No code has been written or run at this time.**

## 2. Separately authored evolution code and known-case receipt

**Code written 2026-10-06T03:20Z–03:24Z, after the derivations above; first run 03:24:48Z.** The instrument is [weber-delayed-pair-reference.mjs](../evidence/weber-delayed-pair-reference.mjs) (SHA-256 at the time of the known-case run `9bf1c9955f97ea0f1c10bd7b0f368ee05e2f2ac26c6ef7424737c2be0bb3f96d`; a later edit changed only the census endpoint handling and the census list of speeds, see below). Design, distinct from a generic adaptive ODE driver: method of steps with fixed-step classical RK4 on the present state; the complete history $(T,\mathbf X,\mathbf V,\mathbf A)$ of both members stored as nodes and read through a quintic Hermite interpolant that matches $\mathbf X$, $\mathbf V$ and $\mathbf A$ at both ends of each node interval, with a left and a right acceleration stored at declared acceleration breakpoints so that the jump of the delayed transmitter acceleration is kept sharp; the step is shortened to land exactly on each reception time of a breakpoint (first the release $T=0$, then each reception time so created), and the receiver's left and right present accelerations are both solved there, which gives the acceleration jump directly; own partner-root bracketing with safeguarded Newton on $F(S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-c_f(T-S)$ (whose derivative is $D_t>0$ for a subfield transmitter, so the root is unique by monotonicity) with bisection fallback and a residual target of $10^{-14}$; own partial-pivot $3\times3$ elimination for $M_i\mathbf A_i=\mathbf b_i$. Pasts: closed-form rigid circle, closed-form affine, or a Section 9 backward trajectory on $S\in[-40,0]$ produced by this file's own RK4 with the validated instrument's right-hand side (imported, unmodified). Self roots: their absence is proved from the maximum stored speed being below $c_f$; if a member's speed reaches $c_f$ the run records a census change and stops, because self roots with delay below the step cannot be enumerated by this method. No remedy, softening, exclusion or ceiling exists in the code.

**Known-case receipt**, written before any target: [weber-delayed-pair-reference-known.json](../evidence/weber-delayed-pair-reference-known.json), SHA-256 `2131a33f03f0df8f3a894dcf9b7dbdb6502aaa1927d04ee97fe8792dfeac6453`, all six passed at 2026-10-06T03:24:48Z.

| Case | Result (measured by the reference code) | Known answer |
| --- | --- | --- |
| 1 stationary pair, range 2 | lag $2$, $D_t=1$, $\dot{\mathscr R}=\ddot{\mathscr R}=0$, bracket $1$, magnitude $0.25$ toward the partner, residual $0$ | $1/4$ ([controls](weber-delayed-pair-controls.md#stationary-controls)). For information: the implicitly solved stationary acceleration is $1/6=\tfrac14/(1+\tfrac12)$, with $\det M=3/2$. |
| 2 affine | transverse: $S=-1$, $\dot{\mathscr R}=0$, $\ddot{\mathscr R}=0.09$, bracket $1.09$; general oblique affine source: $\dot{\mathscr R}$ and $\ddot{\mathscr R}$ agree with $-(\mathbf n\cdot\mathbf v)/D_t$ and $\|\mathbf v_\perp\|^2/(\mathscr RD_t^3)$ to $<10^{-13}$, root lag agrees with the causal quadratic to $5\times10^{-16}$ | closed forms |
| 3 zero coefficients, rigid circle | $\beta=0.05$: $d=0.09987533737220837$ (scalar solve $0.09987533737220838$), $a_r=-2.4968886\times10^{-5}$, $a_t=+1.2479255\times10^{-6}$; $\beta=0.3$: $d=0.5753441705$; maximum relative deviation from the closed form of 1b $3.3\times10^{-16}$; $\det M=1$ | closed form 1b; the PI's corrected printed value $0.0998753$ is confirmed |
| 4 rigid-circle bracket | $\beta\in\{0.05,0.1,0.5,0.9\}$: $\dot{\mathscr R}\le2.2\times10^{-16}$, $\ddot{\mathscr R}\le1.1\times10^{-19}$, bracket $1$ to machine precision, hit equal to the canonical hit; $\det M_1=1+K/(\mathscr RD_t^2)$ to $2\times10^{-16}$ | 1b |
| 5 slow approach | normalized $\|\mathbf A^{9\mathrm a}-\mathbf A^{9}\|r^2/K$: $0.049932$ at $\beta=0.05$, $0.024992$ at $0.025$ (ratio $0.5005$); $0.019996$ at $0.02$, $0.0099995$ at $0.01$ (ratio $0.50008$); first-order prediction $\beta$. Section 9 bracket on the exact Kepler circle: $1-1=0$ exactly at both speeds (derived: Section 9 gives exactly the canonical acceleration on a Kepler circle, so the printed "scales by $1/4$" is vacuous there); on a circle with radius $1.2\times$ Kepler: $1.65\times10^{-3}\to4.16\times10^{-4}$, ratio $0.2516$ | first order in $\beta$ to within ten percent; second order for the Section 9 bracket |
| 6 integrator order | closed-form delayed problem (rotated mirror delay law whose exact solution is the rigid circle, $\beta=0.3$, $\rho=1$, $T_{\mathrm{end}}=6$): errors $5.45\times10^{-9}$, $3.38\times10^{-10}$, $2.10\times10^{-11}$, $1.33\times10^{-12}$ for $h=0.1,0.05,0.025,0.0125$; observed orders $4.011,4.006,3.987$ | nominal order 4 |

Grade: measured, instrument named above; the closed forms are those of Section 1. Falsifier: rerunning `node weber-delayed-pair-reference.mjs known` and obtaining a failed case.

## 3. Rigid mirror-circle census and balance (numerical part of 1b)

Command `node weber-delayed-pair-reference.mjs census`, output `.local-data/master-equation-closure/weber-delayed-pair/reference/circle-census.json`. The census partitions $(0,2\beta]$ at the zeros of $|\cos\frac d2|$ or $|\sin\frac d2|$ and at every closed-form zero of the derivative, so each subinterval is strictly monotone; the excluded same-time endpoint $d=0$ is handled by the analytic sign of $g(0^+)$. No subinterval was left unresolved on the grid.

| $\beta$ | partner roots | self roots | $C_t$ |
| --- | --- | --- | --- |
| $0.02,0.05,0.1,0.3,0.5,0.7,0.9,0.99$ | 1 | 0 | $+0.00500,+0.01248,+0.02484,+0.07109,+0.11021,+0.14289,+0.17117,+0.18293$ |
| $1$ | 1 | 0 | $+0.18421$ |
| $1.01,1.2,1.5,2.0,2.5$ | 1 | 1 | $+208.5,+0.675,+0.265,+0.244,+0.272$ |
| $3.0,3.5,4.0$ | 3 | 1 | $-0.210,+0.109,+0.118$ |
| $5.0,6.0$ | 3 | 3 | $+0.201,+0.190$ |

Census changes on the $0.001$ grid: self root born at $\beta=1^+$ (its range $\to0$, so $C_t\to+\infty$ as $\beta\to1^+$); a fold birth of two partner roots between $\beta=2.971693870664$ and $2.971693870723$ (at the fold the new branches have $D_t\to0$, a nonordinary event, and $C_t$ jumps from $+0.3047$ to a large negative value; this is a discontinuity of the census, not a balance); a second self-root pair born between $\beta=4.60$ and $4.61$.

**Result.** For $0<\beta\le1$: one partner root, no self root, $C_t>0$ strictly; no exact mirror circle exists under Section 9a, by the equivalence theorem of 1b. Exactly one continuous sign change of $C_t$ was found on $(1,6]$, with constant census on the refining bracket:

| Quantity | Value |
| --- | --- |
| balanced speed bracket | $\beta_*\in[3.070356625378,3.070356625438]$, $C_t$ endpoints $-1.33\times10^{-11}$, $+5.53\times10^{-11}$ |
| census | 3 partner roots at $d=2.35456649,5.10405700,6.12037880$ ($D_t=+3.836,-0.707,+0.750$), 1 self root at $d=4.59314937$ ($D_t=+3.038$) |
| $C_r$, $\rho$, $\Omega$ | $C_r=-0.819607$, $\rho=-KC_r/(\beta_*^2c_f^2)=0.0869417$, $\Omega=35.3151$ |
| $\det M_1$ | $-33.9115$: invertible, indefinite |

This circle lies far above the wake speed ($\beta_*\approx3.07$), has one partner branch with negative $D_t$ (weighted by $|D_t|$ as the law prescribes) and one self root; it belongs to the unlimited-speed comparison only. Its linear persistence is not examined here. Grade: measured census of a closed-form equation (instrument named; completeness rests on the monotone partition; a pair of sign changes closer than $0.001$ in $\beta$ would be missed by the grid and is not excluded). Falsifier: a root of $g_{\mathrm p}$ or $g_{\mathrm s}$ on $(0,2\beta]$ absent from the ledger, or $C_t(\beta_*)$ of one sign at both bracket ends on recomputation.

### Integrator corrections made between the first and the recorded target runs

Recorded for provenance; no formula of the law changed. A first target batch at 03:26Z showed brackets of order $10^3$ at a few nodes and a step-halving disagreement in the SC-1 slope ($0.63$ against $0.90$). Cause, found by tracing: the step alignment to a breakpoint reception could create node intervals of length $\sim10^{-9}h$ (the landing tolerance was relative to $|T|$ and the breakpoint index was not advanced), and the quintic Hermite second derivative on such an interval is numerically meaningless (cancellation in $x_1-x_0-Hv_0-\tfrac12H^2a_0$ divided by $H^2$). Corrections: two-step lookahead that splits the approach so that no interval shorter than about $h/4$ is created; a Newton correction of the landing time using provisional RK4 steps so that the receiver's root sits on the breakpoint to $10^{-11}|T|$; explicit left and right delayed accelerations at the landing node; advancement of the breakpoint index after a landing; refinement of event times by bisection on the stored interpolant; an escape-radius option for the diagnostic (see SC-2). After the corrections the known cases were rerun (03:34:18Z, all passed; code SHA-256 `86133fadfcbd999df55768073de90713ae0429348338a6f26c4bd6a09fdb1bc8`, receipt `1b3b5b97ca71241ec7938405e40999f825c8bc2d771a1eaac6c38bc385329cd1`) and the targets were rerun from scratch; the corrected runs show no tiny interval on any mirror target, brackets within $[0.995,1.007]$ on the slow circles, and step-halving agreement of $\rho_h^2(T_{\mathrm{end}})$ to $10^{-9}$ (SC-1), $2.5\times10^{-5}$ (SC-3), $10^{-10}$ (SC-2), $4\times10^{-7}$ (WP-2). The one earlier output file kept from the first batch is the SC-3 profile sample `SC-3-spp2000.json`, superseded.

## 4. Target runs

Runs recorded at 2026-10-06T03:34Z in [weber-delayed-pair-reference-runs.json](../evidence/weber-delayed-pair-reference-runs.json) (SHA-256 `22d751398aafdf3eb431e7a329f97db4475a804997022aa8ecbbad7811f1e5a2`); sampled trajectories in `.local-data/master-equation-closure/weber-delayed-pair/reference/<label>-spp<N>.json`. Base step $h=P/4000$ with $P$ the preregistered period (zero-delay orbital period for the circles, the stated instantaneous period for WP cases); refinement at $h/2$ ("spp 8000"). Every run finished in under 9 s wall on the loaded host, so no supervised job was needed. No self root exists on any run: the maximum member speed stayed below $c_f$ except at the WP-3 stop. The root residual target $10^{-13}$ was met on every run except SC-1 ($1.1\times10^{-11}$) and SC-2 ($8.7\times10^{-11}$), where the range $\mathscr R\approx200$ and $1250$ makes $10^{-13}$ below double-precision resolution of the arrival function; the achieved residuals are the roundoff floor.

**SC-2 and the escape diagnostic.** SC-2 starts at $r=1250$, above the preregistered escape threshold $r>10^3$, so the preregistered run stops at $T=0$ with the event "escape" (recorded as such, both steps). This is a defect of the preregistration, not of the law. To deliver the preregistered rate measurement, SC-2 was also run with the escape threshold raised to $10^4$; this changes a diagnostic only, not the law, the state or the window, and is labeled as a deviation in the record.

| Target | step | termination | first event (refined time) | $r_{\min}$, $r_{\max}$ | $h(0)\to h(\mathrm{end})$ | slope of $\rho_h^2$: full, first half, second half | $\beta$ range | $\det M$ range | compatibility defect; jump at first reception of release ($T_1$) | wall |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SC-1 | $3.1416$ | window complete | turning point of $r$ at $T=16519.959$ ($r_{\max}=358.36$) | $200.0$, $358.36$ | $20\to27.189$ | $0.90156$, $1.0261$, $0.9019$ | $[0.0351,0.0518]$ | $[1.00278,1.00498]$ | $1.248\times10^{-6}$; $4.643\times10^{-10}$ at $T_1=199.7517$ | 0.67 s |
| SC-1 | $1.5708$ | same | same, $T=16519.959$ | same to $10^{-9}$ | $\to27.189$ | $0.90156$, $1.0260$, $0.9020$ | same | same | same | 1.24 s |
| SC-2 (preregistered) | $49.09$ / $24.54$ | event: escape at $T=0$ ($r=1250>10^3$) | escape, $T=0$ | — | — | — | — | — | $1.28\times10^{-8}$ | — |
| SC-2 (escape at $10^4$) | $49.09$ | window complete | none | $1250$, $1588.63$ | $50\to55.338$ | $1.00161$, $1.0640$, $0.9318$ | $[0.0174,0.0203]$ | $[1.00063,1.00080]$ | $1.28\times10^{-8}$; $3.07\times10^{-13}$ at $T_1=1249.750$ | 0.34 s |
| SC-2 (escape at $10^4$) | $24.54$ | same | none | same to $10^{-10}$ | same | $1.00164$, $1.0640$, $0.9318$ | same | same | same | 0.65 s |
| SC-3 | $0.3927$ | window complete | none ($r$ monotone) | $50.0$, $159.808$ | $10\to14.967$ | $0.76293$, $1.1270$, $0.5100$ | $[0.0469,0.1072]$ | $[1.0062,1.0197]$ | $3.98\times10^{-5}$; $1.155\times10^{-7}$ at $T_1=49.75664$ | 0.54 s |
| SC-3 | $0.1963$ | same | none | same to $2.5\times10^{-5}$ | same | $0.76285$, $1.1269$, $0.5100$ | same | same | same | 1.14 s |
| WP-2 | $0.005951$ | window complete | turning point (minimum $r=2.99823$) at $T=0.8867$ | $2.9982$, $308.84$ | $2.2045\to6.1968$ | $0.0597$, $0.1774$, $0.0082$ | $[0.3152,0.5441]$ | $[1.00245,1.2742]$ | $0.03489$; $3.979\times10^{-3}$ at $T_1=2.80467$ | 1.76 s |
| WP-2 | $0.002976$ | same | same | same to $4\times10^{-6}$ | same | $0.0597$, $0.1774$, $0.0082$ | same | same | same | 3.60 s |
| WP-3 | $0.001111$ | **census change: member speed reached $c_f$; stopped** | speed equality at $T=0.568462$ ($r=1.1246$, $h=2.1718$) | $1.0$, $1.1246$ | $1.4142\to2.1718$ | $1.877$ (over $0.57$ time units) | $[0.7071,1.0001]$ | $[1.5592,1.6194]$ | $0.5693$; no reception of the release before the stop | 1.07 s |
| WP-3 | $0.000555$ | same | $T=0.568462$ | same | same | same | same | same | same | 2.23 s |
| WP-1 | $0.008886$ | window complete | none ($r$ monotone) | $4.0$, $340.91$ | $2.8287\to6.6719$ | $0.0541$, $0.1560$, $0.0081$ | member 1 $[0.171,0.404]$, member 2 $[0.286,0.508]$ | $[1.00227,1.2181]$ | $0.02035$, $0.02182$; receiver 2: $2.118\times10^{-3}$ at $T_1=3.63337$, receiver 1: $1.304\times10^{-3}$ at $T_1=4.02602$ | 2.68 s |
| WP-1 | $0.004443$ | same | none | same to $10^{-9}$ | same | $0.0542$, $0.1567$, $0.0082$ | same | same | same | 5.04 s |

Supplementary profile values from the sampled trajectories (step $h/2$ runs), with $\varepsilon$ the Section 9 energy-like diagnostic of the preregistration (a diagnostic only, not an invariant of this law):

- SC-1: $r=200.0,\ 200.8,\ 257.2,\ 343.7,\ 354.5,\ 334.2$ at $T=0,\ 1250,\ 6270,\ 12560,\ 18852,\ 25133$; $\varepsilon$ from $-0.0050$ to $-0.0027$, negative throughout; brackets within $[0.99924,1.00089]$. The orbit becomes eccentric: $r$ peaks at $T=16520$ and is decreasing at the window end while $h$ keeps growing.
- SC-2 (escape $10^4$): $r=1250\to1588.6$, $\varepsilon$ from $-0.00080$ to $-0.00065$; brackets within $[0.99994,1.00006]$.
- SC-3: $r=50\to159.8$ monotone, $\varepsilon$ from $-0.020$ to $-0.0081$, member speed from $0.100$ to $0.047$.
- WP-2: $r$ first dips to $2.99823$ at $T=0.887$, exceeds $3.0$ at $T=1.43$, exceeds $6.0$ at $T=10.5$; $\varepsilon$ crosses zero at $T=5.12$ ($r=3.46$) and tends to $+0.19$; member speeds $0.315$ at $r=309$: the members separate on a straight-line-like path with relative speed $0.63$, the pair is dispersing, not orbiting. Mirror symmetry is preserved to $3.5\times10^{-13}$.
- WP-3: $\varepsilon=-1.00\to+0.42$ in $0.56$ time units; brackets $0.924\to1.307$; $\det M\in[1.56,1.62]$; mirror symmetry to $10^{-14}$. Both members reach $\|\mathbf V\|=c_f$ simultaneously at $T=0.568462$ with $r=1.1246$. The reference stops there by its own stated domain (self roots with delay below the step cannot be enumerated); the law itself admits self roots and continues in principle, and whether $D_t$ or $\det M$ reach zero beyond this point is not decided here.
- WP-1: $\varepsilon$ crosses zero at $T=6.93$ ($r=4.76$); $r\to340.9$; the two members end with different speeds $0.171$ and $0.286$, the drift-dependent asymmetry.

Grade: measured by the reference code at two steps with the stated agreement; windows and states exactly as preregistered except the labeled SC-2 escape threshold. Falsifier: lane B's separately authored integrator disagreeing with $r(T)$, $h(T)$ or an event time beyond the preregistered $10^{-6}$ relative tolerance.

## 5. Adversarial check of the Principal Investigator's predictions (preregistration Section 6)

1. **Rigid rotation.** Confirmed by derivation (1b) and measurement (known case 4, census Section 3): $\dot{\mathscr R}=\ddot{\mathscr R}=0$ on every root of a rigid circle, bracket exactly one, equivalence with canonical balance; for $0<\beta\le1$ one partner root, no self root, $C_t>0$ strictly, no exact circle. One correction of emphasis: $\det M_i\ne0$ is not needed for the equivalence, only for uniqueness of the continuation (1b). Above the wake speed the census decides, as predicted; the census found exactly one balanced circle on $(1,6]$, at $\beta_*\approx3.0703566254$ with $\rho=0.0869$ and $\det M_1=-33.9$.
2. **First departure from Section 9.** Confirmed by derivation (1c): departure at order $1/c_f$, equal to $\sigma K[\mathbf v_j-2(\mathbf e\cdot\mathbf v_j)\mathbf e]/(r^2c_f)$, produced jointly by delayed range ($-2\epsilon\mathbf e$), delayed line of action ($+\mathbf v_{j\perp}$) and transmitter weight ($+\epsilon\mathbf e$), no ingredient alone; the brackets agree through $1/c_f^2$; $p$ and $\mathbf A_j(S)$ inside $\ddot{\mathscr R}$ first enter the bracket at $1/c_f^3$. Confirmed by measurement (known case 5: ratios $0.5005$, $0.50008$). One qualification: the present transmitter acceleration enters the line of action at order $1/c_f^2$ through the emission position ($-\tfrac r2\mathbf a_{j\perp}/c_f^2$), so "the delayed transmitter acceleration first appears at order $1/c_f^3$" is exact for the bracket but not for the whole law; on a mirror pair this term is of effective third order because $\mathbf a_{j\perp}$ is itself first order.
3. **Invertibility.** Confirmed by derivation (1d): $\det M_i=1+K/(\mathscr RD_t^2)>1$ for $D_t>0$, and $D_t<0$ requires a superfield transmitter. Confirmed by measurement: $\det M\in[1.0006,1.62]$ on every run, minimum $D_t=0.9993$ (SC-1, where $\mathbf n\cdot\mathbf V_j(S)$ becomes slightly positive on the eccentric phase). Below the wake speed no obstruction occurred.
4. **Slow nearly circular pair.** Confirmed in sign and leading rate, with a qualification about constancy. $h$ increases and the pair expands on SC-1, SC-2, SC-3; the derived leading rate (1c) is $d(\rho_h^2)/dT\to K/c_f$ with the estimate $(K/c_f)(1-\tfrac53\beta^2)$ for the quasi-circular correction. Measured full-window slopes: SC-2 $1.0016$ (within five percent: confirmed), SC-1 $0.9016$ (within fifteen percent: confirmed), SC-3 $0.7629$ (within forty percent: confirmed). The margins are met, but the half-window slopes show that the rate is not constant over these windows: SC-2 $1.064\to0.932$, SC-1 $1.026\to0.902$, SC-3 $1.127\to0.510$. The quasi-circular estimate predicts corrections below two percent; the measured departures are larger because the windows are not adiabatic: the relative growth of $\rho^2$ per orbit is $8\pi\beta$ ($0.5$, $1.3$, $2.5$ for SC-2, SC-1, SC-3), so the orbit becomes eccentric (SC-1 reaches a maximum of $r$ at $T=16520$), and $\rho_h$ then no longer measures a radius. The instantaneous Weber circle is not approached (confirmed): $r$ grows on every slow circle. The initial rates above $K/c_f$ (first halves $1.03$–$1.13$) are not explained by the $-\tfrac53\beta^2$ estimate; this is open.
5. **Eccentric preparations.** WP-2: confirmed as stated, and stronger than stated. It leaves $[2.0420,3.0000]$ upward at $T=1.43$ (first radial period $23.8$), $h$ increases from $2.20$ to $6.20$, no contact, obstruction or speed-equality event; but the pair is not merely drifting: the Section 9 energy-like diagnostic becomes positive at $T=5.1$ and the members separate to $r=309$ with relative speed $0.63$ by the window end, so WP-2 disperses within a fraction of its first radial period. WP-3: **refuted** on the speed clause. The prediction said its member speeds stay below $c_f$; measured, both members reach $\|\mathbf V\|=c_f$ at $T=0.568462$, an eighth of the instantaneous orbital period, after $h$ has grown from $1.414$ to $2.172$ ($+54\%$, so "h grows by more than ten percent" holds). The mechanism is the first-order tangential acceleration of item 2, which at $\beta=0.707$ on the released circle is about $0.58K/\rho^2$-scale (rigid-circle formula $a_t=K\sin\frac d2/(4\rho^2\cos^2\frac d2(1+\beta\sin\frac d2))\approx0.58$ at $\rho=0.5$), enough to raise the speed from $0.707$ to $1$ in about half a time unit; the measured compatibility defect at release, $0.569$, is this acceleration. WP-1: confirmed in outline (expansion, drift-dependent asymmetry with final member speeds $0.171$ and $0.286$); like WP-2 it disperses, $\varepsilon>0$ from $T=6.9$.
6. **History domain.** Confirmed by measurement, with the factor made precise. The acceleration jump at the first reception of the release is $4.64\times10^{-10}$ (SC-1), $3.07\times10^{-13}$ (SC-2), $1.155\times10^{-7}$ (SC-3), $3.98\times10^{-3}$ (WP-2), $2.1\times10^{-3}$ and $1.3\times10^{-3}$ (WP-1), against compatibility defects $1.25\times10^{-6}$, $1.28\times10^{-8}$, $3.98\times10^{-5}$, $3.49\times10^{-2}$, $2.0\times10^{-2}$: ratios $3.7\times10^{-4}$, $2.4\times10^{-5}$, $2.9\times10^{-3}$, $0.114$, $0.10$. From 1a the exact first-generation factor is $\|M_i^{-1}\mathbf n\|\,Kp^2|\mathbf n\cdot\Delta\mathbf A_j|/(\mathscr RD_t^2)$, i.e. $K/(\mathscr RD_t^2)$ times $p^2/(1+K/(\mathscr RD_t^2))$ times the projection factor; on the slow circles $K/(\mathscr RD_t^2)\approx2\beta^2$ and the projection of the (tangential) defect on the (nearly radial) $\mathbf n$ contributes a further factor of order $\beta$, which accounts for the measured ratios. Successive generations decay geometrically as predicted: SC-3 $1.15\times10^{-7}\to2.17\times10^{-9}\to4.0\times10^{-11}\to7.3\times10^{-13}$ (ratio $0.019\approx K/(\mathscr RD_t^2)=1/50$), SC-1 ratio $0.005$, WP-2 $3.98\times10^{-3}\to3.0\times10^{-4}\to6.1\times10^{-6}$. For WP-3 the factor is of order one as predicted, but no reception of the release occurs before the stop at $T=0.568<\mathscr R\approx1$, so that clause is not tested.
7. **Verdict.** The reference supports "binding is lost", but not the stated mechanism for every preparation. On the slow circles binding is lost secularly at the canonical leading rate $K/c_f$ (confirmed, with the nonconstancy of item 4). On the fast and eccentric preparations WP-2 and WP-1 binding is lost within a fraction of one period by direct dispersal ($\varepsilon>0$ within $5$–$7$ time units), not secularly; on WP-3 the regular case ends at the speed-equality census change at $T=0.568$ before any secular statement can be made. "No bound class persists" is confirmed on the declared preparations and windows; no run stayed inside its instantaneous turning interval.

## 6. Summary of grades, unresolved questions and files

Derived: 1a, 1b (theorem and subfield nonexistence), 1c (expansion and leading rate), 1d. Measured: known cases 1–6, the census for $\beta\in(1,6]$, every target quantity in Section 4. Inferred: the $-\tfrac53\beta^2$ correction estimate; the attribution of the WP-3 speed growth to the first-order tangential term. Open: the initial slopes above $K/c_f$ on the slow circles; the fate of WP-3 past the speed-equality census change (requires a self-root enumerator with delays below the step); whether balanced circles exist for $\beta>6$ or in pairs closer than $0.001$ in $\beta$; lane agreement (lane B's numbers were not read).

Files written by this lane: this document; `../evidence/weber-delayed-pair-reference.mjs`; `../evidence/weber-delayed-pair-reference-known.json`; `../evidence/weber-delayed-pair-reference-runs.json`; `.local-data/master-equation-closure/weber-delayed-pair/reference/{circle-census.json, <label>-spp<N>.json}`; scratch under `.tmp/weber-delayed-pair/reference/`. No existing file was edited. No Git state was changed. Wall time of the lane: 03:06Z to the time of this entry.

**Record closed 2026-10-06T03:38Z.**
