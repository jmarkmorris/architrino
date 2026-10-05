# Small-speed existence of the rotating alternating ladder: a proof

## Result

The [rotating alternating ladder](rotating-alternating-ladder.md) is an exact solution of the unchanged Master Equation at every sufficiently small speed. The subject document measured this balance numerically and graded its existence as inferred, because the estimate that controls the delayed tail of the sum over rungs had not been written out. This document writes it out. The existence statement at small speed is now derived.

Notation for the statement. Units are $c_f=1$ and $K=1$. A ladder is fixed by its pair radius $R$, its rung spacing $d$ and its angular rate $\omega$; write $\delta=d/R$ for the spacing ratio and $\varepsilon=\omega R$ for the member speed. Let $y_*$ be the unique positive root of $y\sinh y=6$ and $\delta_*=2\pi/y_*$. Let $B(\delta)$ be the first-order bracket of the subject document in units $R=1$, and $S(\delta,\varepsilon)$ the dimensionless inward radial sum; both are defined in Section 2. The slope of the bracket at its zero is

$$
\beta_*=B'(\delta_*)=\frac{y_*^3}{48\pi}+\frac{y_*^5\cosh y_*}{288\pi}>0 .
$$

**Theorem.** Let $I=[\delta_a,\delta_b]$ be any compact interval with $0<\delta_a<\delta_*<\delta_b$. There are a speed $\varepsilon_0\in(0,\tfrac12)$, a constant $C$ depending only on $I$, and a function $\delta:[0,\varepsilon_0)\to I$ with $\delta(0)=\delta_*$, such that the following hold.

1. **Existence.** For every $0<\varepsilon<\varepsilon_0$ the number $S(\delta(\varepsilon),\varepsilon)$ is positive, and the ladder with radius $R(\varepsilon)=S(\delta(\varepsilon),\varepsilon)/\varepsilon^2$, spacing $d=\delta(\varepsilon)R(\varepsilon)$ and angular rate $\omega=\varepsilon/R(\varepsilon)$, rotating rigidly for all time, satisfies the delayed law exactly. At every member and every time the sum over all sources converges absolutely, its component along the motion is zero, its axial component is zero, and its radial component is $-\omega^2R$.
2. **Uniqueness in the spacing window.** For $0<\varepsilon<\varepsilon_0$, a ladder with speed $\varepsilon$ and $d/R\in I$ satisfies the law only if $d/R=\delta(\varepsilon)$ and $R=R(\varepsilon)$.
3. **Regularity and small-speed law.** The function $\delta$ is continuously differentiable on $[0,\varepsilon_0)$, with $\delta'(0)=0$, $\lvert\delta'(\varepsilon)\rvert\le C\varepsilon$, and $\bigl\lvert\delta(\varepsilon)-\delta_*+\varepsilon^2/(6\beta_*)\bigr\rvert\le C\varepsilon^3$.
4. **Radius.** $R(\varepsilon)$ is continuous on $(0,\varepsilon_0)$ and $\varepsilon^2R(\varepsilon)\to S(\delta_*,0)>0$ as $\varepsilon\to0$. Consequently every sufficiently large radius is the radius of at least one balanced ladder.

**Claim grade:** derived, by the proof in Sections 1 to 9, self-reviewed and independently adjudicated on 2026-10-03, with the verdict accept with corrections ([adjudication](rotating-ladder-small-speed-existence-independent-adjudication-2026-10-03.md)); the corrections are applied here. The decimal values $y_*=1.8782239487$, $\delta_*=3.3452801575$, $\beta_*=0.1304155737$, $1/(6\beta_*)=1.277966$ and $S(\delta_*,0)=0.1915345910$ are measured, by evaluating the closed forms at 40 digits (root) and in float arithmetic (sums). Section 10 reports float measurements that agree with every quantitative statement of the theorem; they support the proof and are not part of it.

**Which implicit-function argument is used.** Parts 1, 2 and 4 need only that the tangential function $G$ and its $\delta$-derivative are continuous up to and including zero speed; the root is obtained from strict monotonicity in $\delta$ and the intermediate-value theorem. Section 9 takes its thresholds from the rates of Proposition 6 for convenience; the bound $\lvert G-B\rvert\le C\varepsilon$ of the Remark, which uses no alternation, serves equally with $\sqrt{m_0/(2C_1)}$ replaced by $m_0/(2C)$. Part 3 uses the classical implicit-function theorem at positive speed together with a bound $\lvert\partial_\varepsilon G\rvert\le C\varepsilon$ that holds down to zero speed.

**Where the difficulty was, and where it was not.** The sum for $G$ and the sum of its $\delta$-derivatives are dominated, uniformly in the speed down to zero, by a constant times $k^{-2}$. They need no cancellation. The sum of $\varepsilon$-derivatives is different. It converges absolutely at each positive speed, but the bound on its $k$-th term is $C\varepsilon\,(1+\varepsilon\lvert k\rvert\delta)^{-2}$, whose supremum over speeds is of order $1/\lvert k\rvert$ and is not summable, and the resulting bound on the sum of absolute values is of order one, not small. That the sum nevertheless tends to zero with the speed is produced by the alternation $(-1)^k$ of the polarities along each rail. Lemma 3 removes the static part of every term exactly, and Lemma 5 converts the alternation into integrals of derivatives; together they close the estimate.

## Assumptions

- **The law.** A receiver at $\mathbf x$ at time $T$ receives from a source with path $\mathbf X(t)$ and speed below $1$ at the earlier time $T-\tau$ fixed by $\tau=\lvert\mathbf x-\mathbf X(T-\tau)\rvert$, $\tau>0$. That source contributes the acceleration $\sigma\,(\mathbf x-\mathbf X)/(\tau^3\lvert1-\mathbf n\cdot\mathbf V\rvert)$, with $\mathbf X$ and the source velocity $\mathbf V$ evaluated at $T-\tau$, $\mathbf n=(\mathbf x-\mathbf X)/\tau$, and $\sigma$ the product of the two polarities. Contributions add. No response factor, event rule or root exclusion is added.
- **Infinitely many sources.** The total is the series over all sources. The proof shows that this series converges absolutely, so its value does not depend on the order of summation.
- **Complete history.** Every member has moved on its circle for all earlier time. Rung $k$ is received with a delay of about $\lvert k\rvert d$, so the balance uses arbitrarily early history.
- **Configuration.** For every integer $k$ the positive member of rung $k$ is at $\bigl((-1)^kR\cos\omega T,(-1)^kR\sin\omega T,kd\bigr)$ and the negative member at the opposite point of the same circle, with $0<\varepsilon=\omega R<1$.

**Scaling.** Measure lengths and times in units of $R$. The ladder then has pair radius $1$, spacing $\delta$ and angular rate $\varepsilon$. If $\mathbf A(\delta,\varepsilon)$ is the acceleration that the law assigns to a member of this unit ladder, the acceleration in the original ladder is $\mathbf A/R^2$, because every delay scales by $R$ and velocities are unchanged. The acceleration required by the prescribed circular motion is $\omega^2R=\varepsilon^2/R$, directed inward. The law therefore holds at a member exactly when $A_t=0$, $A_z=0$ and $A_r=-\varepsilon^2R$, where the subscripts denote the components along the motion, along the axis and radially outward (derived).

**Receiver.** By Lemma 2 it is enough to treat the positive member of rung $0$ at time $0$. In the unit ladder it is at $\mathbf x=(1,0,0)$ with velocity $(0,\varepsilon,0)$. The sources are indexed by a rail sign $\nu\in\{+1,-1\}$ and a rung $k$. The source $(\nu,k)$ has path $(\nu\cos\varepsilon t,\nu\sin\varepsilon t,k\delta)$. Sources with $\nu=+1$ lie on the receiver's own rail and have $\sigma=(-1)^k$; $k=0$ is the receiver itself. Sources with $\nu=-1$ lie on the other rail and have $\sigma=-(-1)^k$; $k=0$ is the rung partner.

**Elementary functions.** Throughout, $\operatorname{sinc}\theta=\sin\theta/\theta$ with $\operatorname{sinc}0=1$, and

$$
p(\theta)=\operatorname{sinc}\theta,\qquad q(\theta)=\operatorname{sinc}^2(\theta/2),\qquad \varphi(\theta)=\frac{p(\theta)-1}{\theta^2},\qquad \chi(\theta)=\frac{1-q(\theta)}{\theta^2}.
$$

All four are even entire functions, with $\varphi(0)=-\tfrac16$ and $\chi(0)=\tfrac1{12}$. A constant written $C$ is positive, depends only on the interval $I$ (or on nothing, where stated), and may change from line to line.

## 1. Causal roots

**Lemma 1 (derived).** Let $0\le\varepsilon<1$, $\nu=\pm1$ and $z\in\mathbb R$, and consider the source path $(\nu\cos\varepsilon t,\nu\sin\varepsilon t,z)$ and the receiver $(1,0,0)$ at time $0$.

(a) The equation $\tau=\lvert\mathbf x-\mathbf X(-\tau)\rvert$ has exactly one solution $\tau\ge0$. It is zero exactly when $(\nu,z)=(+1,0)$, that is, when the source is the receiver. Hence the receiver gets nothing from its own past, and every other source has exactly one causal root $\tau_\nu(z,\varepsilon)>0$.

(b) $\tau_\nu$ is the unique positive zero of $\Phi_\nu(\tau)=\tau^2-z^2-2+2\nu\cos(\varepsilon\tau)$. It is a real-analytic function of $(z,\varepsilon)$ for $\lvert\varepsilon\rvert<1$ and all $z$ (for $\nu=+1$, all $z\ne0$), and it is even in $z$ and in $\varepsilon$.

(c) With the delay angle $\theta=\varepsilon\tau_\nu$, the root satisfies $\tau_\nu^2\,(1-\nu\varepsilon^2q(\theta))=z^2+2(1-\nu)$. Hence $\lvert z\rvert\le\tau_+\le\lvert z\rvert/\sqrt{1-\varepsilon^2}$ and $\max\{\lvert z\rvert,\sqrt{(z^2+4)/(1+\varepsilon^2)}\}\le\tau_-\le\sqrt{z^2+4}$. At $\varepsilon=0$, $\tau_+=\lvert z\rvert$ and $\tau_-=\sqrt{z^2+4}$. For $\varepsilon\le\tfrac12$, $\tau_-\ge\tau_-(0,\varepsilon)\ge2\cos\tfrac12>\tfrac74$.

(d) Put $D_\nu=1-\nu\varepsilon^2p(\theta)$, so that $1-\varepsilon^2\le D_\nu\le1+\varepsilon^2$. Then

$$
\partial_z\tau_\nu=\frac{z}{\tau_\nu D_\nu},\qquad
\partial_\varepsilon(\varepsilon\tau_\nu)=\frac{\tau_\nu}{D_\nu},\qquad
\partial_z^2\tau_\nu=\frac{\varepsilon^2\tau_\nu^2N_\nu+2(1-\nu)(1-\nu\varepsilon^2\cos\theta)}{(\tau_\nu D_\nu)^3},
$$

$$
N_\nu=-\nu\,\bigl(2p-q-\cos\theta\bigr)+\varepsilon^2\bigl(p^2-q\cos\theta\bigr),\qquad \lvert N_\nu\rvert\le C\min(\theta^2,1),
$$

with $p$, $q$ evaluated at $\theta$ and $C$ absolute.

(e) For $\nu=+1$ the function $z\mapsto\tau_+(z,\varepsilon)$ on $z>0$ extends to an odd, real-analytic, increasing bijection of $\mathbb R$.

*Proof.* The squared distance is $\lvert\mathbf x-\mathbf X(-\tau)\rvert^2=z^2+2-2\nu\cos(\varepsilon\tau)$, so the root equation with $\tau\ge0$ is $\Phi_\nu(\tau)=0$. Now $\Phi_\nu(0)=-z^2-2(1-\nu)\le0$, with equality only for $(\nu,z)=(+1,0)$; $\Phi_\nu'(\tau)=2\tau-2\nu\varepsilon\sin(\varepsilon\tau)=2\tau D_\nu\ge2\tau(1-\varepsilon^2)>0$ for $\tau>0$, because $\lvert\sin(\varepsilon\tau)\rvert\le\varepsilon\tau$; and $\Phi_\nu\to\infty$. This gives (a). The function $\Phi_\nu$ is analytic in $(\tau,z,\varepsilon)$ with $\partial_\tau\Phi_\nu\ne0$ at the root, so the analytic implicit-function theorem gives (b); evenness holds because $\Phi_\nu$ depends on $z^2$ and on $\cos(\varepsilon\tau)$. For (c), $2-2\nu\cos\theta=2(1-\nu)+\nu\theta^2q(\theta)$ and $\theta^2=\varepsilon^2\tau^2$; the bounds follow from $0\le q\le1$ and, for $\tau_-$, from $\tau_-^2=z^2+4\cos^2(\theta/2)$. Since $\partial_z\tau_-\ge0$ for $z\ge0$ by (d), $\tau_-\ge\tau_-(0,\varepsilon)=2\cos(\varepsilon\tau_-(0,\varepsilon)/2)\ge2\cos\varepsilon$, using $\tau_-(0,\varepsilon)\le2$. For (d), differentiate $\Phi_\nu=0$: $2\tau D_\nu\,\partial_z\tau=2z$ and $2\tau D_\nu\,\partial_\varepsilon\tau=2\nu\tau\sin\theta$, so $\partial_\varepsilon\tau=\nu\sin\theta/D_\nu$ and $\tau+\varepsilon\,\partial_\varepsilon\tau=(\tau D_\nu+\nu\varepsilon\sin\theta)/D_\nu=\tau/D_\nu$. Next, $\tau D_\nu=\tau-\nu\varepsilon\sin(\varepsilon\tau)$ has $z$-derivative $(1-\nu\varepsilon^2\cos\theta)\,\partial_z\tau$, so $\partial_z^2\tau=[\tau^2D_\nu^2-z^2(1-\nu\varepsilon^2\cos\theta)]/(\tau D_\nu)^3$; inserting $z^2=\tau^2(1-\nu\varepsilon^2q)-2(1-\nu)$ from (c) and expanding gives the stated numerator. The two brackets in $N_\nu$ are even entire functions that vanish at $\theta=0$ and are bounded together with their second derivatives, which gives the bound on $N_\nu$. For (e), $Z(\tau)=\tau\sqrt{1-\varepsilon^2q(\varepsilon\tau)}$ is odd and analytic on $\mathbb R$, has $Z'(0)=\sqrt{1-\varepsilon^2}>0$ and $Z(\tau)Z'(\tau)=\tau D_+>0$ for $\tau\ne0$, and tends to infinity; by (c) its inverse is $\tau_+$ on $z>0$. $\qquad\blacksquare$

## 2. The three components and the two conditions

For $\varepsilon\ge0$ define, with $\tau=\tau_\nu(z,\varepsilon)$, $\theta=\varepsilon\tau$ and $D_\nu=1-\nu\varepsilon^2p(\theta)$,

$$
g_\nu(z,\varepsilon)=\frac{p(\theta)}{\tau^2D_\nu},\qquad h_\nu(z,\varepsilon)=\frac{1-\nu\cos\theta}{\tau^3D_\nu},
$$

$$
G(\delta,\varepsilon)=\sum_{k\ne0}(-1)^kg_+(k\delta,\varepsilon)+\sum_{k\in\mathbb Z}(-1)^kg_-(k\delta,\varepsilon),\qquad
S(\delta,\varepsilon)=\sum_{k\in\mathbb Z}(-1)^kh_-(k\delta,\varepsilon)-\sum_{k\ne0}(-1)^kh_+(k\delta,\varepsilon).
$$

At zero speed $g_+=z^{-2}$, $g_-=(z^2+4)^{-1}$, $h_+=0$ and $h_-=2(z^2+4)^{-3/2}$. Using the classical sums $\sum_{k\ne0}(-1)^kk^{-2}=-\pi^2/6$ and $\sum_{k\in\mathbb Z}(-1)^k(k^2+c^2)^{-1}=\pi/(c\sinh\pi c)$ for $c>0$,

$$
G(\delta,0)=B(\delta)=\frac{\pi}{2\delta\sinh(2\pi/\delta)}-\frac{\pi^2}{6\delta^2},\qquad
S(\delta,0)=S_0(\delta)=\sum_{k\in\mathbb Z}\frac{2\,(-1)^k}{(4+k^2\delta^2)^{3/2}} .
$$

$B$ is the bracket of the subject document with $R=1$, and $S_0$ is its static inward sum.

**Lemma 2 (derived).** Let $0<\varepsilon<1$ and $\delta>0$, except in (b), where zero speed is included.

(a) The source $(\nu,k)$ contributes to the receiver the tangential acceleration $\varepsilon(-1)^kg_\nu(k\delta,\varepsilon)$, the radial acceleration $\nu(-1)^kh_\nu(k\delta,\varepsilon)$ and the axial acceleration $-\nu(-1)^kk\delta/(\tau^3D_\nu)$. The factor $1-\mathbf n\cdot\mathbf V$ equals $D_\nu>0$.

(b) For $\delta\ge\delta_a>0$, $0\le\varepsilon\le\tfrac12$ and $k\ne0$: $\lvert g_\nu(k\delta,\varepsilon)\rvert\le\tfrac43(k\delta_a)^{-2}$, $\lvert h_\nu(k\delta,\varepsilon)\rvert\le\tfrac83\lvert k\delta_a\rvert^{-3}$, and the axial term is at most $\tfrac43(k\delta_a)^{-2}$ in size. All three component series converge absolutely and uniformly on this set, and $G$ and $S$ are continuous on it, including at $\varepsilon=0$.

(c) $A_t=\varepsilon\,G(\delta,\varepsilon)$, $A_r=-S(\delta,\varepsilon)$ and $A_z=0$.

(d) The ladder $(R,d,\omega)$ satisfies the law at every member and every time if and only if $G(\delta,\varepsilon)=0$ and $S(\delta,\varepsilon)=\varepsilon^2R$.

*Proof.* (a) For $\nu=+1$ the source at the root is at angle $-\theta$, so $\mathbf x-\mathbf X=(1-\cos\theta,\sin\theta,-k\delta)$ and $\mathbf V=\varepsilon(\sin\theta,\cos\theta,0)$, whence $(\mathbf x-\mathbf X)\cdot\mathbf V=\varepsilon\sin\theta$ and $1-\mathbf n\cdot\mathbf V=1-\varepsilon\sin\theta/\tau=D_+$. For $\nu=-1$ the source is at angle $\pi-\theta$, so $\mathbf x-\mathbf X=(1+\cos\theta,-\sin\theta,-k\delta)$, $\mathbf V=-\varepsilon(\sin\theta,\cos\theta,0)$ and $1-\mathbf n\cdot\mathbf V=1+\varepsilon\sin\theta/\tau=D_-$. Multiplying by $\sigma=\nu(-1)^k$ and by $1/(\tau^3D_\nu)$ and using $\sin\theta=\varepsilon\tau p(\theta)$ gives the three components. (b) By Lemma 1, $\tau\ge\lvert k\rvert\delta$ and $D_\nu\ge\tfrac34$, and $\lvert p\rvert\le1$, $\lvert1-\nu\cos\theta\rvert\le2$. Each term is continuous in $(\delta,\varepsilon)$ by Lemma 1(b), so the Weierstrass test gives uniform convergence and continuity. (c) The first two are (a) summed. The axial terms of $k$ and $-k$ cancel because $\tau_\nu$ and $D_\nu$ are even in $z$, and the series converges absolutely. (d) The law is unchanged by a rigid motion of space, by a shift of time, and by reversing every polarity, since only products of polarities enter. The ladder's history is mapped to itself by a time shift combined with the matching rotation about the axis; by the shift by $d$ combined with half a turn, which takes each rung to the next; and by half a turn combined with reversal of every polarity, which exchanges the two members of each rung. These operations carry the receiver at time $0$ to any member at any time, and they carry the required centripetal acceleration along with them. So the law holds everywhere exactly when it holds at the receiver at time $0$, which by the scaling paragraph and (c) is the pair of conditions stated. $\qquad\blacksquare$

The radius does not enter the tangential condition. The problem is therefore: solve $G(\delta,\varepsilon)=0$ for $\delta$, then read off $R=S/\varepsilon^2$, which requires $S>0$.

## 3. Exact removal of the static part

**Lemma 3 (derived).** For $0\le\varepsilon<1$ and every admissible $(\nu,z)$,

$$
g_\nu(z,\varepsilon)=g_\nu(z,0)+\varepsilon^2\,\Psi_\nu\bigl(\varepsilon\tau_\nu(z,\varepsilon),\varepsilon\bigr),\qquad
\Psi_\nu(\theta,\varepsilon)=\frac{\varphi(\theta)+\nu\varepsilon^2p(\theta)\chi(\theta)}{\bigl(1-\nu\varepsilon^2p(\theta)\bigr)\bigl(1-\nu\varepsilon^2q(\theta)\bigr)} .
$$

Consequently, for $0<\varepsilon<1$,

$$
G(\delta,\varepsilon)=B(\delta)+\varepsilon^2E(\delta,\varepsilon),\qquad
E(\delta,\varepsilon)=\sum_{k\ne0}(-1)^k\Psi_+\bigl(\theta_+(k),\varepsilon\bigr)+\sum_{k\in\mathbb Z}(-1)^k\Psi_-\bigl(\theta_-(k),\varepsilon\bigr),
$$

where $\theta_\nu(t)=\varepsilon\tau_\nu(t\delta,\varepsilon)$ for real $t$.

*Proof.* By Lemma 1(c), $g_\nu(z,0)^{-1}=z^2+2(1-\nu)=\tau^2(1-\nu\varepsilon^2q)$ with $\tau=\tau_\nu(z,\varepsilon)$. Hence

$$
g_\nu(z,\varepsilon)-g_\nu(z,0)=\frac1{\tau^2}\Bigl[\frac{p}{1-\nu\varepsilon^2p}-\frac{1}{1-\nu\varepsilon^2q}\Bigr]
=\frac{(p-1)+\nu\varepsilon^2p\,(1-q)}{\tau^2(1-\nu\varepsilon^2p)(1-\nu\varepsilon^2q)},
$$

and $p-1=\theta^2\varphi$, $1-q=\theta^2\chi$, $\theta^2/\tau^2=\varepsilon^2$. The series for $E$ converges absolutely at each $\varepsilon>0$ by the bound (4.1) below and $\theta_\nu(k)\ge\varepsilon\lvert k\rvert\delta$. $\qquad\blacksquare$

The identity is exact at every speed below $1$. The whole dependence of the tangential acceleration on the delay is carried by one function $\Psi_\nu$ of the delay angle, sampled at the angles $\theta_\nu(k)$, which advance by about $\varepsilon\delta$ from one rung to the next.

## 4. Bounds on the kernel

**Lemma 4 (derived).** There is an absolute constant $C$ such that for all $\theta\ge0$, $0\le\varepsilon\le\tfrac12$ and $\nu=\pm1$:

$$
\lvert\Psi_\nu\rvert\le\frac{C}{(1+\theta)^2},\qquad
\lvert\partial_\theta\Psi_\nu\rvert\le C\min(\theta,\theta^{-3}),\qquad
\lvert\partial_\theta^2\Psi_\nu\rvert\le\frac{C}{(1+\theta)^3},\tag{4.1}
$$

$$
\lvert\partial_\varepsilon\Psi_\nu\rvert+\lvert\partial_\theta\partial_\varepsilon\Psi_\nu\rvert\le\frac{C\varepsilon}{(1+\theta)^2},\tag{4.2}
$$

and, for $\Lambda_\nu(\theta,\varepsilon)=\theta\,\partial_\theta\Psi_\nu/(1-\nu\varepsilon^2p(\theta))$,

$$
\Lambda_\nu(0,\varepsilon)=0,\qquad\lvert\Lambda_\nu\rvert+\lvert\partial_\theta\Lambda_\nu\rvert\le\frac{C}{(1+\theta)^2}.\tag{4.3}
$$

*Proof.* From $p(\theta)=\int_0^1\cos(\theta t)\,dt$, $q(\theta)=\int_0^12(1-t)\cos(\theta t)\,dt$ and $1-\cos x=x^2\int_0^1(1-r)\cos(xr)\,dr$,

$$
\varphi(\theta)=-\int_0^1\!\!\int_0^1t^2(1-r)\cos(\theta tr)\,dr\,dt,\qquad
\chi(\theta)=\int_0^1\!\!\int_0^12(1-t)\,t^2(1-r)\cos(\theta tr)\,dr\,dt .
$$

Differentiating under the integrals shows that $p$, $q$, $\varphi$, $\chi$ and each of their derivatives are bounded on $\mathbb R$ by absolute constants. They are even, so their first derivatives vanish at $0$ and are at most $C\theta$ in size. For $\theta\ge1$ the explicit forms $p=\sin\theta/\theta$ and $q=2(1-\cos\theta)/\theta^2$ give, by the product rule, $\lvert p^{(j)}\rvert\le C/\theta$ and $\lvert q^{(j)}\rvert\le C/\theta^2$ for $j=0,1,2$, and then $\varphi=(p-1)\theta^{-2}$ and $\chi=(1-q)\theta^{-2}$ give $\lvert\varphi\rvert\le C\theta^{-2}$, $\lvert\varphi'\rvert+\lvert\varphi''\rvert\le C\theta^{-3}$, $\lvert\chi\rvert\le C\theta^{-2}$, $\lvert\chi'\rvert\le C\theta^{-3}$, $\lvert\chi''\rvert\le C\theta^{-4}$. Hence, for the product $m=p\chi$ and all $\theta\ge0$,

$$
\lvert\varphi\rvert\le\frac{C}{(1+\theta)^2},\quad\lvert\varphi'\rvert+\lvert m'\rvert\le C\min(\theta,\theta^{-3}),\quad\lvert\varphi''\rvert+\lvert m\rvert+\lvert m''\rvert\le\frac{C}{(1+\theta)^3},\quad\lvert p'\rvert+\lvert q'\rvert\le C\min(\theta,\theta^{-1}),\quad\lvert p''\rvert+\lvert q''\rvert\le\frac{C}{1+\theta}.
$$

Write $\Psi_\nu=(\varphi+\nu\varepsilon^2m)\,W$ with $W=1/[(1-\nu\varepsilon^2p)(1-\nu\varepsilon^2q)]$. For $\varepsilon\le\tfrac12$ both factors of $1/W$ lie in $[\tfrac34,\tfrac54]$, so $W\le\tfrac{16}9$, $\lvert\partial_\theta W\rvert\le C\varepsilon^2\min(\theta,\theta^{-1})$, $\lvert\partial_\theta^2W\rvert\le C\varepsilon^2/(1+\theta)$, $\lvert\partial_\varepsilon W\rvert\le C\varepsilon$ and $\lvert\partial_\theta\partial_\varepsilon W\rvert\le C\varepsilon$. The product rule now gives (4.1) and (4.2); for instance $\partial_\theta\Psi_\nu=(\varphi'+\nu\varepsilon^2m')W+(\varphi+\nu\varepsilon^2m)\,\partial_\theta W$, and $(1+\theta)^{-2}\min(\theta,\theta^{-1})\le\min(\theta,\theta^{-3})$. For (4.3), $\partial_\theta\Lambda_\nu=(\partial_\theta\Psi_\nu+\theta\,\partial_\theta^2\Psi_\nu)/(1-\nu\varepsilon^2p)+\nu\varepsilon^2\theta\,\partial_\theta\Psi_\nu\,p'/(1-\nu\varepsilon^2p)^2$, and each term is at most $C(1+\theta)^{-2}$ by (4.1). $\qquad\blacksquare$

## 5. Alternating sums of slowly varying functions

**Lemma 5 (derived).** Let $F:\mathbb R\to\mathbb R$ be even and continuously differentiable, with $F(t)\to0$ as $t\to\infty$ and $\int_0^\infty\lvert F'\rvert<\infty$. Then the symmetric sum $\sum_{k\in\mathbb Z}(-1)^kF(k)=\lim_{N\to\infty}\sum_{\lvert k\rvert\le N}(-1)^kF(k)$ exists and

$$
\Bigl\lvert\sum_{k\in\mathbb Z}(-1)^kF(k)\Bigr\rvert\le\int_0^\infty\lvert F'(t)\rvert\,dt .\tag{5.1}
$$

If in addition $F$ is twice continuously differentiable with $\int_0^\infty\lvert F''\rvert<\infty$, then

$$
\Bigl\lvert\sum_{k\in\mathbb Z}(-1)^kF(k)\Bigr\rvert\le\int_0^\infty\lvert F''(t)\rvert\,dt .\tag{5.2}
$$

*Proof.* Put $\Delta_k=F(k)-F(k+1)$ and $P_N=\sum_{\lvert k\rvert\le N}(-1)^kF(k)=F(0)+2\sum_{k=1}^N(-1)^kF(k)$. Then $\sum_{k=0}^N(-1)^k\Delta_k=P_N+(-1)^{N+1}F(N+1)$. Since $\lvert\Delta_k\rvert\le\int_k^{k+1}\lvert F'\rvert$, the series $\sum_{k\ge0}(-1)^k\Delta_k$ converges absolutely, $P_N$ converges to it, and (5.1) follows. For (5.2) group the absolutely convergent series in pairs: $\Delta_{2j}-\Delta_{2j+1}=\int_0^1[F'(2j+1+r)-F'(2j+r)]\,dr=\int_0^1\!\int_0^1F''(2j+r+u)\,du\,dr$, which is at most $\int_{2j}^{2j+2}\lvert F''\rvert$ in size; sum over $j\ge0$. $\qquad\blacksquare$

Each use of the alternation gains one derivative. A derivative of a function of the delay angle $\theta_\nu(t)$ gains one factor of the speed, because $\theta_\nu$ advances by about $\varepsilon\delta$ per rung.

## 6. The three estimates

**Proposition 6 (derived).** Let $I=[\delta_a,\delta_b]$ with $0<\delta_a<\delta_b$. There is a constant $C$ depending only on $I$ such that the following hold for all $\delta\in I$ and $0<\varepsilon\le\tfrac12$.

(a) With $e_0(\varepsilon)=(2-\varepsilon^2)/\bigl(12(1-\varepsilon^2)^2\bigr)$,

$$
\lvert E(\delta,\varepsilon)-e_0(\varepsilon)\rvert\le C\varepsilon,\qquad\text{hence}\qquad\bigl\lvert G(\delta,\varepsilon)-B(\delta)-\tfrac16\varepsilon^2\bigr\rvert\le C\varepsilon^3\quad\text{and}\quad\lvert G-B\rvert\le C\varepsilon^2 .
$$

(b) The series of $\delta$-derivatives of the terms of $G$ is dominated by $Ck^{-2}$ uniformly on $I\times[0,\tfrac12]$. Hence $\partial_\delta G$ exists and is continuous on $I\times[0,\tfrac12]$, with $\partial_\delta G(\delta,0)=B'(\delta)$, and $\lvert\partial_\delta G(\delta,\varepsilon)-B'(\delta)\rvert\le C\varepsilon$.

(c) $G$ is continuously differentiable on $I\times(0,\tfrac12]$, and $\lvert\partial_\varepsilon G(\delta,\varepsilon)\rvert\le C\varepsilon$.

*Proof of (b).* By Lemma 3 and Lemma 1(d), the $\delta$-derivative of the term $(-1)^kg_\nu(k\delta,\varepsilon)$ is $(-1)^k\bigl[k\,\partial_zg_\nu(k\delta,0)+\varepsilon^3k\,\partial_\theta\Psi_\nu\,\partial_z\tau_\nu\bigr]$, with $\Psi_\nu$ evaluated at $\theta_\nu(k)$ and $\lvert\partial_z\tau_\nu\rvert\le1/D_\nu\le\tfrac43$. The static part is at most $2/(k^2\delta^3)$ in size on either rail. For the delayed part use $\varepsilon\lvert k\rvert\le\theta_\nu(k)/\delta$ and (4.1): its size is at most

$$
\frac{C\varepsilon^2}{\delta}\,\theta\min(\theta,\theta^{-3})\le\frac{C\varepsilon^2}{\delta}\min\bigl(1,\theta_\nu(k)^{-2}\bigr)\le\frac{C}{\delta}\min\Bigl(\varepsilon^2,\frac1{k^2\delta^2}\Bigr),
$$

using $\theta_\nu(k)\ge\varepsilon\lvert k\rvert\delta$. This is at most $C/(k^2\delta_a^3)$ for every $\varepsilon$, which is the domination; the terms are analytic in $(\delta,\varepsilon)$, so termwise differentiation and continuity follow from the Weierstrass test. Summing the middle bound over $k\ne0$ with $\sum_{k\ge1}\min(1,(ck)^{-2})\le\int_0^\infty\min(1,(ct)^{-2})\,dt=2/c$ for $c=\varepsilon\delta$ gives $\lvert\partial_\delta G-B'\rvert\le(C\varepsilon^2/\delta)\cdot(8/(\varepsilon\delta))\le C\varepsilon$. No cancellation between rungs is used.

*Proof of (a).* Fix $\delta$ and $\varepsilon$ and put $F_\nu(t)=\Psi_\nu(\theta_\nu(t),\varepsilon)$. By Lemma 1(b) and (e), $\theta_-$ is even and analytic and $\theta_+$ extends to an odd analytic function; $\Psi_\nu$ is even in $\theta$; so $F_\nu$ is even and analytic on $\mathbb R$. Also $\theta_\nu$ is nondecreasing on $t\ge0$ with $\theta_\nu(t)\ge\varepsilon\delta t$, so $F_\nu(t)\to0$ and $\int_0^\infty\lvert F_\nu'\rvert\,dt=\int\lvert\partial_\theta\Psi_\nu\rvert\,d\theta<\infty$. Since $\theta_+(0)=0$ and $\Psi_+(0,\varepsilon)=(-\tfrac16+\tfrac1{12}\varepsilon^2)/(1-\varepsilon^2)^2=-e_0(\varepsilon)$,

$$
E(\delta,\varepsilon)-e_0(\varepsilon)=\sum_{k\in\mathbb Z}(-1)^kF_+(k)+\sum_{k\in\mathbb Z}(-1)^kF_-(k),
$$

and by (5.2) it suffices to show $\int_0^\infty\lvert F_\nu''\rvert\,dt\le C\varepsilon$. Now $F_\nu''=\partial_\theta^2\Psi_\nu\,(\theta_\nu')^2+\partial_\theta\Psi_\nu\,\theta_\nu''$, with $\theta_\nu'=\varepsilon\delta\,\partial_z\tau_\nu\in[0,\tfrac43\varepsilon\delta]$ and $\theta_\nu''=\varepsilon\delta^2\,\partial_z^2\tau_\nu$. For the first term, substituting $\theta=\theta_\nu(t)$,

$$
\int_0^\infty\lvert\partial_\theta^2\Psi_\nu\rvert\,(\theta_\nu')^2\,dt\le\tfrac43\varepsilon\delta\int_0^\infty\lvert\partial_\theta^2\Psi_\nu(\theta,\varepsilon)\rvert\,d\theta\le C\varepsilon\delta
$$

by (4.1). For the second term, Lemma 1(d) with $D_\nu\ge\tfrac34$ gives $\lvert\theta_\nu''\rvert\le C\varepsilon\delta^2\bigl[\varepsilon^2\min(\theta^2,1)/\tau+(1-\nu)/\tau^3\bigr]$ with $\tau=\theta/\varepsilon$. By (4.1), $\lvert\partial_\theta\Psi_\nu\rvert\,\varepsilon^2\min(\theta^2,1)/\tau\le C\varepsilon^3\min(\theta^2,\theta^{-4})\le C\varepsilon^3\min\bigl(1,(\varepsilon\delta t)^{-4}\bigr)$, whose integral over $t\ge0$ is at most $C\varepsilon^2/\delta$. For $\nu=-1$, $\lvert\partial_\theta\Psi_-\rvert/\tau^3\le C\theta/\tau^3=C\varepsilon/\tau^2\le C\varepsilon/\max(1,t\delta)^2$ by Lemma 1(c), whose integral is at most $2C\varepsilon/\delta$. Altogether $\int_0^\infty\lvert F_\nu''\rvert\,dt\le C\varepsilon\delta\,(1+\varepsilon+\varepsilon^2)\le C\varepsilon$ on $I$. The consequences follow from $G=B+\varepsilon^2E$ and $\lvert e_0(\varepsilon)-\tfrac16\rvert\le C\varepsilon^2$.

*Proof of (c).* By Lemma 3 and Lemma 1(d), where $\partial_\varepsilon\theta_\nu(k)=\theta_\nu(k)/(\varepsilon D_\nu)$, the $\varepsilon$-derivative of the delayed part of the $k$-th term is

$$
\partial_\varepsilon\bigl[\varepsilon^2\Psi_\nu(\theta_\nu(k),\varepsilon)\bigr]=2\varepsilon\Psi_\nu+\varepsilon\Lambda_\nu+\varepsilon^2\partial_\varepsilon\Psi_\nu ,
$$

all evaluated at $(\theta_\nu(k),\varepsilon)$. By Lemma 4 it is at most $C\varepsilon(1+\theta_\nu(k))^{-2}\le C/(\varepsilon k^2\delta^2)$ in size, so the series of $\varepsilon$-derivatives converges uniformly on $I\times[\varepsilon_a,\tfrac12]$ for each $\varepsilon_a>0$; with (b) this gives continuous differentiability at positive speed and

$$
\partial_\varepsilon G=2\varepsilon E+\varepsilon\,{\sum}'(-1)^k\Lambda_\nu(\theta_\nu(k),\varepsilon)+\varepsilon^2\,{\sum}'(-1)^k\partial_\varepsilon\Psi_\nu(\theta_\nu(k),\varepsilon),
$$

where $\sum'$ runs over both rails, with $k\ne0$ on the rail $\nu=+1$. Apply (5.1) to the even functions $t\mapsto\Lambda_\nu(\theta_\nu(t),\varepsilon)$ and $t\mapsto\partial_\varepsilon\Psi_\nu(\theta_\nu(t),\varepsilon)$: since $\theta_\nu$ is monotone on $t\ge0$, $\int_0^\infty\lvert\tfrac{d}{dt}\Lambda_\nu(\theta_\nu(t),\varepsilon)\rvert\,dt\le\int_0^\infty\lvert\partial_\theta\Lambda_\nu\rvert\,d\theta\le C$ by (4.3), and likewise the second integral is at most $C\varepsilon$ by (4.2). The omitted terms $k=0$ on the rail $\nu=+1$ are $\Lambda_+(0,\varepsilon)=0$ and $\partial_\varepsilon\Psi_+(0,\varepsilon)=-e_0'(\varepsilon)$, of size at most $C\varepsilon$. With $\lvert E\rvert\le C$ from (a), $\lvert\partial_\varepsilon G\rvert\le C\varepsilon$. $\qquad\blacksquare$

**Remark on the alternation (derived).** Without the signs $(-1)^k$ the same bounds give only $\sum_k\varepsilon^2\lvert\Psi_\nu(\theta_\nu(k),\varepsilon)\rvert\le C\varepsilon$ and $\sum_k\lvert\partial_\varepsilon[\varepsilon^2\Psi_\nu]\rvert\le C$. The first is enough for continuity of $G$ at zero speed, and with (b) for Parts 1, 2 and 4 of the theorem. The second bound does not tend to zero, so it does not give a continuous $\varepsilon$-derivative at zero speed. Continuous differentiability at zero speed and the $\varepsilon^2$ law of Part 3 are where the alternating polarity of the rails is used.

## 7. The first-order bracket

**Lemma 7 (derived).** With $y=2\pi/\delta$, $B(\delta)=\dfrac{y}{24\sinh y}\,(6-y\sinh y)$. The function $y\sinh y$ increases strictly from $0$ to $\infty$ on $y>0$, so $B$ has exactly one zero $\delta_*=2\pi/y_*$ on $\delta>0$, with $B<0$ for $\delta<\delta_*$ and $B>0$ for $\delta>\delta_*$. Its slope there is

$$
\beta_*=B'(\delta_*)=\frac{y_*^3}{48\pi}+\frac{y_*^5\cosh y_*}{288\pi}>0 .
$$

*Proof.* $B=y/(4\sinh y)-y^2/24$ gives the factorization and the sign statement. Differentiating in $y$ and using $\sinh y_*=6/y_*$, $dB/dy=\tfrac14\bigl(1/\sinh y-y\cosh y/\sinh^2y\bigr)-y/12=-y_*/24-y_*^3\cosh y_*/144$ at $y_*$; multiply by $dy/d\delta=-y^2/(2\pi)$. $\qquad\blacksquare$

Measured values: $y\sinh y-6$ is $-2.3\times10^{-4}$ at $y=1.8782$ and $+7.2\times10^{-4}$ at $y=1.8783$, so $1.8782<y_*<1.8783$; a 40-digit root solve gives $y_*=1.8782239487$, $\delta_*=3.3452801575$, and the closed form gives $\beta_*=0.1304155737$, against $0.1304155737$ from a central difference of $B$. The subject document's values are $3.345280$ and $0.1304$.

## 8. The radial sum

**Lemma 8 (derived).** $S$ is continuous on $[\delta_a,\infty)\times[0,\tfrac12]$ for every $\delta_a>0$, and

$$
\frac14-\frac{4}{(4+\delta^2)^{3/2}}\le S_0(\delta)\le\frac14-\frac{4}{(4+\delta^2)^{3/2}}+\frac{4}{(4+4\delta^2)^{3/2}} .
$$

In particular $S_0(\delta)>0$ for $\delta\ge2$.

*Proof.* Continuity is Lemma 2(b). The terms $2(4+k^2\delta^2)^{-3/2}$ decrease in $\lvert k\rvert$, so the alternating series lies between its consecutive partial sums. For $\delta\ge2$, $(4+\delta^2)^{3/2}\ge8^{3/2}>16$. $\qquad\blacksquare$

At $\delta_*$ the bounds are $0.18244\le S_0(\delta_*)\le0.19419$ and the float sum is $S_0(\delta_*)=0.1915345910$ (measured), the subject document's $0.191535$.

## 9. Proof of the theorem

Fix $I$ and let $C_1,\dots,C_4$ be constants from Proposition 6 with $\lvert G-B\rvert\le C_1\varepsilon^2$, $\lvert\partial_\delta G-B'\rvert\le C_2\varepsilon$, $\lvert\partial_\varepsilon G\rvert\le C_3\varepsilon$ and $\lvert G-B-\tfrac16\varepsilon^2\rvert\le C_4\varepsilon^3$ on $I\times(0,\tfrac12]$. Since $B$ is analytic with $B'(\delta_*)=\beta_*>0$, choose $\eta>0$ with $J=[\delta_*-\eta,\delta_*+\eta]\subset I\cap[2,\infty)$ and $B'\ge\tfrac12\beta_*$ on $J$. By Lemma 7, $m_0=\min\{\lvert B(\delta)\rvert:\delta\in I,\ \lvert\delta-\delta_*\rvert\ge\eta\}$ is positive. By Lemma 8, $S$ is continuous on the compact set $J\times[0,\tfrac12]$ and positive on $J\times\{0\}$, so there is $\varepsilon_S>0$ with $S>0$ on $J\times[0,\varepsilon_S]$. Let $\varepsilon_0$ be the smallest of $\tfrac14$, $\varepsilon_S$, $\beta_*/(4C_2)$ and $\sqrt{m_0/(2C_1)}$.

*Existence and uniqueness of the spacing.* Let $0<\varepsilon<\varepsilon_0$. On $I\setminus(\delta_*-\eta,\delta_*+\eta)$, $\lvert G\rvert\ge m_0-C_1\varepsilon^2\ge\tfrac12m_0>0$, and $G$ has the sign of $B$: negative at $\delta_*-\eta$ and positive at $\delta_*+\eta$. On $J$, $\partial_\delta G\ge\tfrac12\beta_*-C_2\varepsilon\ge\tfrac14\beta_*>0$. By Lemma 2(b), $G(\cdot,\varepsilon)$ is continuous, so it has exactly one zero in $I$, lying in the interior of $J$. Call it $\delta(\varepsilon)$, and put $\delta(0)=\delta_*$.

*Parts 1 and 2.* $S(\delta(\varepsilon),\varepsilon)>0$ because $\delta(\varepsilon)\in J$ and $\varepsilon<\varepsilon_S$. By Lemma 2(d) a ladder of speed $\varepsilon$ with $d/R=\delta\in I$ satisfies the law exactly when $G(\delta,\varepsilon)=0$ and $R=S(\delta,\varepsilon)/\varepsilon^2$, that is, exactly when $\delta=\delta(\varepsilon)$ and $R=R(\varepsilon)$. Absolute convergence is Lemma 2(b).

*Part 3.* On $J$, $\lvert B(\delta)\rvert\ge\tfrac12\beta_*\lvert\delta-\delta_*\rvert$, and $\lvert B(\delta(\varepsilon))\rvert=\lvert B-G\rvert\le C_1\varepsilon^2$, so $\lvert\delta(\varepsilon)-\delta_*\rvert\le2C_1\varepsilon^2/\beta_*$. Hence $\delta$ is continuous at $0$ and differentiable there with $\delta'(0)=0$. At positive speed $G$ is continuously differentiable with $\partial_\delta G>0$ (Proposition 6), so by the classical implicit-function theorem and the uniqueness just shown, $\delta$ is continuously differentiable on $(0,\varepsilon_0)$ with $\delta'=-\partial_\varepsilon G/\partial_\delta G$ and $\lvert\delta'(\varepsilon)\rvert\le4C_3\varepsilon/\beta_*$. Thus $\delta'$ is continuous on $[0,\varepsilon_0)$. For the law, $B(\delta(\varepsilon))=-\tfrac16\varepsilon^2+r$ with $\lvert r\rvert\le C_4\varepsilon^3$, and $B(\delta)=\beta_*(\delta-\delta_*)+\rho(\delta)$ with $\lvert\rho\rvert\le M(\delta-\delta_*)^2\le M(2C_1/\beta_*)^2\varepsilon^4$ on $J$, where $M=\tfrac12\max_J\lvert B''\rvert$. Therefore $\beta_*\lvert\delta(\varepsilon)-\delta_*+\varepsilon^2/(6\beta_*)\rvert\le\lvert r\rvert+\lvert\rho\rvert\le C\varepsilon^3$.

*Part 4.* $R(\varepsilon)=S(\delta(\varepsilon),\varepsilon)/\varepsilon^2$ is a composition of continuous functions, and $\varepsilon^2R(\varepsilon)\to S(\delta_*,0)=S_0(\delta_*)>0$ by Lemma 8. So $R$ is continuous on $(0,\varepsilon_0)$ and tends to infinity as $\varepsilon\to0$, and by the intermediate-value theorem it takes every value above $R(\tfrac12\varepsilon_0)$. $\qquad\blacksquare$

The limit in Part 4 is the subject document's relation $v^2=0.191535\,K/R$ at small speed. The coefficient in Part 3 is $1/(6\beta_*)=1.277966$, so $d/R=3.3452802-1.277966\,(v/c_f)^2$ up to a term of order $(v/c_f)^3$.

## 10. Numerical support

**Instrument.** `ladder_existence_check.py`, with its receipt `ladder_existence_check_result.json`, retained in `.local-data/master-equation-closure/geometry-session-20261003/ladder-existence/` and run with the shared virtual environment. It contains a generic evaluator that finds each causal root by bracketing on three-vectors, and a reduced evaluator that uses the scalar equations of Lemmas 1 and 2 with Newton iteration and sums $\lvert k\rvert\le2\times10^5$, averaging two consecutive partial sums. All values are float measurements with $c_f=1$; they can establish agreement to the stated digits at the sampled points and nothing about other points.

**Controls, run and passed before any target evaluation.** For a stationary source the generic evaluator returned the exact delay and the static acceleration with zero float error. For a uniformly moving source it matched the closed-form delay and acceleration to $1.4\times10^{-17}$. The reduced evaluator matched the generic one on the ladder truncated at $\lvert k\rvert\le60$, at $(\delta,\varepsilon)=(3.3,0.3)$, $(2,0.7)$ and $(4,0.05)$, to $2.7\times10^{-16}$ in every component, with the axial component below $10^{-17}$. The identity of Lemma 3 was checked at 40 digits for both rails at sixteen $(z,\varepsilon)$ pairs with speeds up to $0.9$: largest relative defect $3.6\times10^{-41}$. The derivative formulas of Lemma 1(d) were checked against central differences at 40 digits: largest defect $1.0\times10^{-18}$.

**The function $E=(G-B)/\varepsilon^2$ (measured), at $\delta=\delta_*$.**

| Speed $\varepsilon$ | $E$ | $E-\tfrac16$ | $E-e_0(\varepsilon)$ |
| --- | --- | --- | --- |
| $0.01$ | $0.166691669988$ | $2.50\times10^{-5}$ | $-1.2\times10^{-11}$ |
| $0.05$ | $0.167293756529$ | $6.27\times10^{-4}$ | $-1.1\times10^{-12}$ |
| $0.1$ | $0.169200421726$ | $2.53\times10^{-3}$ | $3.3\times10^{-13}$ |
| $0.2$ | $0.177228008207$ | $1.06\times10^{-2}$ | $-1.1\times10^{-9}$ |
| $0.3$ | $0.192181259583$ | $2.55\times10^{-2}$ | $-2.6\times10^{-5}$ |
| $0.4$ | $0.215091231890$ | $4.84\times10^{-2}$ | $-2.2\times10^{-3}$ |
| $0.5$ | $0.235815370177$ | $6.91\times10^{-2}$ | $-2.3\times10^{-2}$ |

At $\delta=3$ and $\delta=4$ the difference $E-e_0$ has the same sizes: over the three spacings its magnitude is below $10^{-9}$ for $\varepsilon\le0.1$ (float noise, since $G$ carries an error near $10^{-14}$ that is divided by $\varepsilon^2$), between $2\times10^{-10}$ and $8\times10^{-8}$ at $\varepsilon=0.2$, and between $1.5\times10^{-2}$ and $3.7\times10^{-2}$ at $\varepsilon=0.5$. Over the grid $\delta\in\{3,\delta_*,4\}$ and nine speeds from $0.005$ to $0.5$, the ratio $\lvert E-\tfrac16\rvert/\varepsilon$ is at most $0.155$. Over the same spacings and eight speeds from $0.01$ to $0.5$, by central differences, the ratio $\lvert\partial_\delta G-B'\rvert/\varepsilon$ is at most $0.012$, and $\partial_\varepsilon G/\varepsilon$ lies between $0.3334$ and $0.6063$ and tends to $\tfrac13$ at small speed. These agree with Proposition 6. Halving the truncation changed $G$ by less than $2\times10^{-14}$.

**Kernel bounds (measured).** `kernel_bounds_check.py`, in the same directory, samples the left sides of (4.1) to (4.3) and of the bound on $N_\nu$, divided by their right sides without the constant, at 57 delay angles from $10^{-3}$ to $10^4$, both rails and speeds $0$, $0.1$, $0.3$, $0.5$, by 30-digit differentiation. Its control, the first two derivatives of $\operatorname{sinc}$ at $2$ against their closed forms, passed first. The sampled suprema lie between $1.0$ and $4.5$. A sampled supremum supports the bounds and cannot prove them; the proof is Lemma 4.

**The branch (measured).** The zero of $G(\cdot,\varepsilon)$ found by bracketing on $[2.6,3.6]$:

| Speed $\varepsilon$ | $\delta(\varepsilon)$ | $\delta_*-\varepsilon^2/(6\beta_*)$ | $(\delta-\delta_*)/\varepsilon^2$ | Root of $B=-\varepsilon^2e_0(\varepsilon)$ | $\varepsilon^2R$ |
| --- | --- | --- | --- | --- | --- |
| $0.001$ | $3.3452788796$ | $3.3452788796$ | $-1.277967$ | $3.3452788796$ | $0.191534766$ |
| $0.01$ | $3.3451523481$ | $3.3451523609$ | $-1.278095$ | $3.3451523481$ | $0.191552103$ |
| $0.03$ | $3.3441289445$ | $3.3441299882$ | $-1.279126$ | $3.3441289445$ | $0.191692253$ |
| $0.1$ | $3.3323707292$ | $3.3325004977$ | $-1.290943$ | $3.3323707292$ | $0.193292993$ |
| $0.2$ | $3.2920352529$ | $3.2941615183$ | $-1.331123$ | $3.2920352526$ | $0.198652679$ |
| $0.3$ | $3.2190691866$ | $3.2302632192$ | $-1.402344$ | $3.2190569067$ | $0.207832600$ |
| $0.5$ | $2.9461529900$ | $3.0257886620$ | $-1.596509$ | $2.9270129002$ | $0.237393942$ |

The slope tends to $-1.277966=-1/(6\beta_*)$, as Part 3 requires; the entry $-1.277967$ at $\varepsilon=0.001$ already includes the next term, about $-1.2875\,\varepsilon^2$. $\varepsilon^2R$ tends to $0.1915346$, as Part 4 requires.

**Agreement with the subject document's table (measured).** Solving the two conditions for given radius reproduces the subject's speed and spacing to all six printed decimals at $R=10^4$, $10^3$, $100$, $10$, $3$ and $1$; for example $R=100$ gives speed $0.043803$ and $d/R=3.342823$. The subject's table came from a different script (`ladder.py`, three-vector rows with fixed-point roots). Both scripts implement the same stated law, so this agreement tests the two implementations and the reduction of Lemma 2, not the law.

**A sharper form (inferred).** The measurements show $E-e_0(\varepsilon)$ far below the proved bound $C\varepsilon$: it is at float noise for $\varepsilon\le0.1$ and grows rapidly but smoothly beyond. This suggests that

$$
G(\delta,\varepsilon)=B(\delta)+\frac{\varepsilon^2(2-\varepsilon^2)}{12\,(1-\varepsilon^2)^2}+\text{a remainder smaller than every power of }\varepsilon ,
$$

so that the balanced spacing solves $B(\delta)=-\varepsilon^2e_0(\varepsilon)$ to all orders in the speed. The second-to-last column of the branch table shows this root agreeing with the exact one to ten digits up to speed $0.1$ and to nine digits at $0.2$. The reason would be that $\sum_{k\in\mathbb Z}(-1)^kF_\nu(k)$ is, by Poisson summation, a sum of Fourier coefficients of the analytic function $F_\nu$ at the frequencies $\pm\pi,\pm3\pi,\dots$, while $F_\nu$ varies on the scale $1/(\varepsilon\delta)$. In this reading the term $\varepsilon^2e_0(\varepsilon)$ is minus the value that the smooth same-rail kernel takes at the receiver's own position, the one place the sum omits. Only the bound $C\varepsilon$ on this remainder is proved here. The statement is graded inferred; an estimate of $\int\lvert F_\nu^{(m)}\rvert$ for each $m$, or of the width of the strip of analyticity of $F_\nu$, would make it derived.

## What is not shown

- **No size for $\varepsilon_0$.** The proof gives a positive $\varepsilon_0$ without a number, because the constants of Proposition 6 were not evaluated. The continuation of the branch to speed $0.995$ in the subject document remains measured.
- **Nothing about stability.** The subject document measures the ladder to be unstable at every speed examined. Nothing here bears on that.
- **Uniqueness is limited to a compact spacing window.** For each compact $I$ the zero is unique in $I$ once $\varepsilon<\varepsilon_0(I)$. The constants degenerate as $\delta_a\to0$ and $\delta_b\to\infty$, so balances with very small or very large $d/R$ at small speed are not excluded by this proof. Ladders whose two rails differ in radius or speed, and non-rigid motions, are outside the statement.
- **Uniqueness in the radius.** Part 4 gives at least one balanced ladder for each large radius. That $R(\varepsilon)$ is monotone, so that the radius labels the branch uniquely, is not proved; it would need the $\varepsilon$-derivative of $S$.
- **Higher regularity.** $\delta$ is shown continuously differentiable, not smooth or analytic, and the remainder in Part 3 is shown to be of order $\varepsilon^3$, not the order $\varepsilon^4$ that the evenness of $G$ in $\varepsilon$ suggests.
- **Twisted and translating structures.** The helices of the subject document have no reflection symmetry and carry a third condition; they are not treated.
- **No interval arithmetic.** The decimal values are float or 40-digit evaluations. The theorem itself does not depend on them, except through the hand-checkable sign bracket $1.8782<y_*<1.8783$.

## Falsifiers

- An error in Lemma 3 would show as a nonzero defect of the identity $g_\nu(z,\varepsilon)=g_\nu(z,0)+\varepsilon^2\Psi_\nu$ at any $(z,\varepsilon)$ with speed below $1$; the receipt records $3.6\times10^{-41}$ at 40 digits.
- A value of $\lvert(G-B)/\varepsilon^2-\tfrac16\rvert/\varepsilon$ that grows without bound as $\varepsilon\to0$ at fixed $\delta$, in an evaluation with a longer truncation or higher precision, would refute Proposition 6(a).
- A balanced spacing at small speed whose slope $(\delta-\delta_*)/\varepsilon^2$ does not tend to $-1/(6\beta_*)=-1.277966$ would refute Part 3. The subject's table gives about $-1.28$ at speeds $0.0138$ and $0.0438$, to the precision of its six printed decimals.
- A second zero of $G(\cdot,\varepsilon)$ in a fixed compact window at arbitrarily small speed would refute Part 2.
- A member speed below $1$ with two causal roots for one source, or with a root from the receiver's own past, would refute Lemma 1.
- For the inferred sharper form: a measured $E-e_0(\varepsilon)$ at $\varepsilon\le0.1$, in arithmetic of 30 digits or more, that is of the order of a fixed power of $\varepsilon$ would refute it.
