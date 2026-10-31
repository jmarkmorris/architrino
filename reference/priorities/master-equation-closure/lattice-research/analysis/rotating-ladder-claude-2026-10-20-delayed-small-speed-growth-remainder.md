# Rotating ladder, delayed small-speed growth: the remainder with explicit constants, and a root-by-root census check

## Result

This note completes Section 5 of [the growth note](rotating-ladder-claude-2026-10-20-delayed-small-speed-growth.md), which is frozen for review and is cited here as the parent. Notation is the parent's throughout.

1. **Termwise remainder with an explicit constant.** For every source $j$, every $q$, both sectors, every spacing $\delta\in J=[3,3.7]$, every $\lvert\hat\lambda\rvert\le2$ with $\operatorname{Re}\hat\lambda\ge0$, and every real speed $0<\epsilon\le\tfrac14$, the Taylor remainder of the source's contribution satisfies $\lVert F_j\rVert\le C_F\min(\epsilon^2/\tau^0_j,\ \epsilon/\tau^{0\,2}_j)$ with $C_F=2139.3$ (Proposition 3). This replaces the parent's Lemma 5.1, whose proof only sketched the derivative bookkeeping. The proof uses Cauchy estimates on an explicit complex polydisc instead of real derivatives.
2. **The summed remainder.** At fixed spacing,

   $$
   \lVert\Delta-\Delta_0-\epsilon\Delta_1\rVert\le\frac{C_F\,\epsilon^2\Lambda(\epsilon,\delta)+\lvert S-S_0\rvert\,(\lVert M_0\rVert+\epsilon\lVert\Delta_1\rVert)}{S},
   $$

   with $\Lambda=\tfrac12+(4/\delta)(2+\log\lceil1/(\epsilon\delta)\rceil)$ and $\lvert S-S_0\rvert\le\epsilon^2[2.03+(9.36/\delta)(1.5+\log\lceil1/(\epsilon\delta)\rceil)]$ (Proposition 4).
3. **The in-step sector without the logarithm.** In the in-plane block of the in-step sector ($p=+1$, $q=0$) the logarithm is removed. The derivative bound is $\lVert\partial_tH_\nu(t)\rVert\le C_D\epsilon^2/(t^2\delta)$ with $C_D=2.153\times10^4$. The remainder is at most $\epsilon^2[C_F/2+4(C_D+12C_F)/\delta+48C_F\epsilon]/S$ plus the term from $S-S_0$, which is now also free of the logarithm (Proposition 5). This makes the parent's Proposition 5.4 derived.
4. **First-order coefficient at any spacing.** For the in-step pair the in-plane determinant has the exact first-order coefficient $f_1(\hat\lambda)=-m_r\hat\lambda(\hat\lambda^2+2)-m_t\hat\lambda(\hat\lambda^2+1+k_r)$; the aberration coefficient cancels identically. At any spacing $\delta$ the shift is $\hat\lambda_1(\delta)=m_r(\Omega_0^2-2)/(2\Omega_0^2)+m_t/\Omega_0^2$, with $m_t=B(\delta)/S_0(\delta)$ (Lemma 6). With these, Rouché's theorem holds on an explicit disc (Theorem 7). For $0<\epsilon\le\epsilon_2=5.75\times10^{-7}$ the delayed in-step determinant has exactly one zero within $c_1\epsilon/2$ of $i\Omega_0+\epsilon c_1$, so $\operatorname{Re}\lambda/\omega\ge c_1\epsilon/2$. The smallest admissible radius is $5.9\times10^{-10}$ at $\epsilon=10^{-8}$ and $6.6\times10^{-12}$ at $\epsilon=10^{-9}$, and falls as $\epsilon^2\log(1/\epsilon)$.
5. **Root-by-root census check (measured).** At the adjudication's speed $0.0138408$ ($R=1000$), the 71 growing roots predicted at the nine census wavenumbers were each re-solved on the exact delayed determinant: 21 continue zero-delay growing roots and 50 continue neutral roots with $c_1>0$. Every one coincides with a root recorded in the adjudication's `fine-sweep.json`, to at most $1.6\times10^{-11}\,\omega$, one to one. No recorded root at those wavenumbers is left unmatched.

The explicit constants are crude: they are built from triangle inequalities on a complexified row. The threshold $\epsilon_2$ is therefore far below the speeds at which the measurements show the expansion to be accurate: one percent up to $\epsilon=0.002$, according to the parent's table. The constants make the theorem checkable; they are not estimates of the actual remainder. The parent's finite-speed fits are consistent with an $O(\epsilon^3)$ remainder in $\operatorname{Re}\lambda$ with coefficient near $-2.56\times10^3$; finite fits do not prove an asymptotic order or the absence of logarithms.

**Claim grade.** Derived: Lemmas 1 and 2, Propositions 3 to 5, Lemma 6 and Theorem 7. The numerical constants in them are hand-evaluable arithmetic of the stated inequalities, transcribed in `remainder_constants.py`.

Measured:
- the lattice-sum inputs of Theorem 7 at $\delta_*$ (float sums, truncation $2\times10^5$; $\Omega_0$, $m_r$ also interval-enclosed in the parent);
- the sampled supremum of two closed-form $2\times2$ matrix norms on a circle;
- the slope $dc_1/d\delta$;
- the termwise check;
- the census match.

The step from $\delta_*$ to the physical spacing $\delta(\epsilon)$ uses the existence theorem's bound $\lvert\delta(\epsilon)-\delta_*\rvert\le C_E\epsilon^2$. That proof did not evaluate $C_E$; the leading coefficient is $1/(6\beta_*)=1.278$, and it is the one constant in the chain not made explicit here. Linear (formal) modes only. $c_f=1$, $K=1$.

## 1. Standing choices

Throughout: $J=[3,3.7]\ni\delta_*$; $\Lambda_0=2$, so $\lVert\hat\lambda I+J\rVert\le3$; $\operatorname{Re}\hat\lambda\ge0$; real speed $0<\epsilon\le\tfrac14$. For each source define its rung variable $s$ and its zero-speed delay $\tau^0(s)=s\delta$ on the receiver's rail ($\nu=+1$), $\tau^0(s)=(s^2\delta^2+4)^{1/2}$ (principal branch) on the far rail ($\nu=-1$). For integer $s=k$ these are the parent's $\tau^0_j$, and $\tau^0_j\ge2$ for every source. Write $T_j(\epsilon)$ for the source's contribution $-L_{u,j}+w_je^{-\hat\lambda\theta_j}(L_{u,j}Q_j-\epsilon L_{w,j}Q_j(\hat\lambda I+J))$ to $S[\Delta-(\hat\lambda I+J)^2]$, and $F_j=T_j(\epsilon)-T_j(0)-\epsilon T_j'(0)$.

Two complex domains are used.
- **(D1)** Real integer $s=k$ and complex $\epsilon$ with $\lvert\epsilon\rvert\le r_j=1/(2\tau^0_j)$.
- **(D2)** Real $t\ge1$, complex $s$ with $\lvert s-t\rvert\le t/2$, and complex $\epsilon$ with $\lvert\epsilon\rvert\le r(s)=\min(1/(2\lvert\tau^0(s)\rvert),\tfrac14)$.

In (D2), $\lvert\arg s\rvert\le30^\circ$. Hence $\operatorname{Re}s^2\ge\lvert s\rvert^2/2$ and $\lvert s^2\delta^2+4\rvert\ge4+\lvert s\rvert^2\delta^2/2$. On the far rail this gives $\lvert\tau^0(s)\rvert\ge2$ and $\lvert s\rvert\delta\le\sqrt2\lvert\tau^0(s)\rvert$. On the receiver's rail $\lvert\tau^0(s)\rvert=\lvert s\rvert\delta\ge\delta/2\ge1.5$. In both domains $\lvert\epsilon\rvert\le\tfrac14$ and $\lvert\epsilon\rvert\lvert\tau^0\rvert\le\tfrac12$.

## 2. The complexified causal delay

**Lemma 1 (derived).** On (D1) and (D2) the equation $\tau=G(\tau):=\tau^0(1-\nu\epsilon^2q(\epsilon\tau))^{-1/2}$, with $q(w)=\int_0^12(1-u)\cos(wu)\,du$, has exactly one solution in $\{\lvert\tau-\tau^0\rvert\le0.04\lvert\tau^0\rvert\}$. The solution is analytic in $(s,\epsilon)$. For real $s$ and $\epsilon$ it is the causal delay of Lemma 1 of the [existence proof](rotating-ladder-small-speed-existence.md), whose identity (c) is this equation. The delay angle satisfies $\lvert\theta\rvert=\lvert\epsilon\tau\rvert\le0.52$.

*Proof.* On the disc, $\lvert\epsilon\tau\rvert\le1.04\cdot\tfrac12=0.52$. Since $\lvert\cos z\rvert\le\cosh\lvert z\rvert$, $\lvert q\rvert\le\cosh0.52=1.1380$. Then $\lvert\nu\epsilon^2q\rvert\le1.1380/16=0.0711$, and $\lvert(1-x)^{-1/2}-1\rvert\le(1-0.0711)^{-1/2}-1=0.0376<0.04$, so $G$ maps the disc into itself. Next, $\lvert q'(w)\rvert\le\sinh\lvert w\rvert\int_0^12u(1-u)\,du\le\sinh(0.52)/3=0.1813$. Hence $\lvert G'\rvert\le\lvert\tau^0\rvert\lvert\epsilon\rvert^3\cdot\tfrac12(0.9289)^{-3/2}\cdot0.1813\le\tfrac12\cdot\tfrac1{16}\cdot\tfrac12\cdot1.117\cdot0.1813=0.0032$. $G$ is therefore a contraction; its iterates are analytic and converge uniformly, so the fixed point is analytic. For real data the fixed point is a positive solution of the root equation, which is unique by the existence proof's Lemma 1. $\qquad\blacksquare$

## 3. Bounds on the complexified source term

**Lemma 2 (derived).** On (D1) and (D2), $\lVert T_j\rVert\le C_0/\lvert\tau^0\rvert^3$ with $C_0=267.40$, in the operator norm of complex $3\times3$ matrices.

*Proof.* Put $c_h=\cosh0.52=1.1380$ and $s_h=\sinh0.52=0.5438$. Then $\lvert1-\cos\theta\rvert\le c_h-1$, $\lvert\sin\theta\rvert\le s_h$ and $\lvert\cos\theta\rvert\le c_h$, and $\lvert\tau\rvert\ge0.96\lvert\tau^0\rvert$. The quantities below are bilinear (no complex conjugation), so the algebraic identities of the real case persist; each bound uses only $\lVert\mathbf a\mathbf b^{\mathsf T}\rVert=\lVert\mathbf a\rVert\lVert\mathbf b\rVert$ and the triangle inequality.
- **Separation.** The in-plane part of $\mathbf r$ is at most $\sqrt{(c_h-1)^2+s_h^2}=0.561$ (receiver's rail) or $\sqrt{(1+c_h)^2+s_h^2}=2.206$ (far rail).
- **Direction.** Hence $\lVert\mathbf n\rVert\le N_n=\max\{(0.561/1.5+1),\ (2.206/2+\sqrt2)\}/0.96=2.6223$.
- **Velocity and acceleration.** $\lVert\mathbf V\rVert\le\tfrac14\sqrt{s_h^2+c_h^2}=0.3154$ and $\lVert\mathbf A\rVert\le\tfrac1{16}\cdot1.2610$.
- **The factor $D$.** The identity $\mathbf n\cdot\mathbf V=\nu\epsilon^2\operatorname{sinc}\theta$ holds, with $\lvert\operatorname{sinc}\theta\rvert\le c_h$; so $\lvert D-1\rvert\le0.0711$, i.e. $\lvert D\rvert\in[0.9289,1.0711]$.
- **Other scalars.** $\mathbf V\cdot\mathbf V=\epsilon^2$, so $\lvert\mathbf V\cdot\mathbf V\rvert\le\tfrac1{16}$; $\lvert\mathbf r\cdot\mathbf A\rvert\le2.206\cdot1.2610/16=0.174$; hence $\lvert1-\mathbf V\cdot\mathbf V+\mathbf r\cdot\mathbf A\rvert\le1.237$.
- **Prefactor.** $\lvert\tau\rvert^2\lvert\kappa\rvert=\lvert\tau\rvert^3\lvert D\rvert\ge0.96^3\cdot0.9289\lvert\tau^0\rvert^3$.
- **$L_u$.** From the pre-target formula, $\lVert L_u\rVert\le\bigl[1+(\lVert\mathbf V\rVert+2N_n)N_n/\lvert D\rvert+(N_n/\lvert D\rvert)(1.237N_n/\lvert D\rvert+\lVert\mathbf V\rVert)\bigr]/(0.96^3\cdot0.9289\lvert\tau^0\rvert^3)=33.39/\lvert\tau^0\rvert^3$.
- **$L_w$.** $\lVert L_w\rVert\le N_n^2/(0.96^2\cdot0.9289^2\lvert\tau^0\rvert^2)=8.648/\lvert\tau^0\rvert^2$.
- **Frame.** $\lVert Q\rVert\le\sqrt{2(c_h^2+s_h^2)}=1.784$.
- **Emission-time factor.** $\lvert e^{-\hat\lambda\theta}\rvert\le e^{2\cdot0.52}=2.829$, and $\lvert w_j\rvert=1$.
- **Total.** With $\lvert\epsilon\rvert\le1/(2\lvert\tau^0\rvert)$ in the $L_w$ term, $\lVert T_j\rVert\le[33.39+2.829(33.39\cdot1.784+\tfrac12\cdot8.648\cdot1.784\cdot3)]/\lvert\tau^0\rvert^3=267.40/\lvert\tau^0\rvert^3$.

In (D2) with $r(s)=\tfrac14$, the inequality $\lvert\epsilon\rvert\le1/(2\lvert\tau^0\rvert)$ still holds, because $\lvert\tau^0\rvert\le2$ there. $\qquad\blacksquare$

**Real bounds (derived).** For real $s=k$ and real $0<\epsilon\le\tfrac14$:
- $\mathbf n$ is a unit vector, $\lvert\mathbf V\rvert=\epsilon$, $D\in[\tfrac{15}{16},\tfrac{17}{16}]$ and $\lvert1-\lvert\mathbf V\rvert^2+\mathbf r\cdot\mathbf A\rvert\le1.125$.
- $\tau\ge\tau^0/\sqrt{1+\epsilon^2}$ (Lemma 1(c) of the existence proof).
- This gives $\lVert L_u\rVert\le5.779/\tau^{0\,3}$, $\lVert L_w\rVert\le1.209/\tau^{0\,2}$ and $\lVert T_j(\epsilon)\rVert\le11.56/\tau^{0\,3}+3.63\,\epsilon/\tau^{0\,2}$.
- From the parent's Section 2, $T_j'(0)=\delta L_{u,j}(w_jQ^0_j-I)-w_j\sigma_j(I-2\mathbf n\mathbf n^{\mathsf T})Q^0_j(\hat\lambda I+J)/\tau_j^2$. Since $\lVert\mathbf e_t\mathbf n^{\mathsf T}+\mathbf n\mathbf e_t^{\mathsf T}\rVert=1$ for unit $\mathbf n\perp\mathbf e_t$, and $I-2\mathbf n\mathbf n^{\mathsf T}$ is a reflection, $\lVert T_j'(0)\rVert\le4/\tau^{0\,3}+3/\tau^{0\,2}$.
- $\lVert T_j(0)\rVert\le4/\tau^{0\,3}$.

## 4. The termwise remainder

**Proposition 3 (derived).** For every source, $\lVert F_j\rVert\le C_F\min(\epsilon^2/\tau^0_j,\ \epsilon/\tau^{0\,2}_j)$, with $C_F=8C_0=2139.3$.

*Proof.* (A) If $\epsilon\le r_j/2=1/(4\tau^0_j)$: $T_j$ is analytic on $\lvert\epsilon\rvert\le r_j$ with norm at most $M=C_0/\tau^{0\,3}_j$. The Cauchy estimate for the Taylor remainder of a Banach-valued analytic function gives $\lVert F_j\rVert\le M(\epsilon/r_j)^2/(1-\epsilon/r_j)\le2M\epsilon^2/r_j^2=8C_0\epsilon^2/\tau^0_j$. Here $\epsilon\tau^0_j\le\tfrac14$, so the minimum equals $\epsilon^2/\tau^0_j$.

(B) If $\epsilon>1/(4\tau^0_j)$: by the real bounds and $1/\tau^0_j<4\epsilon$, $\tau^0_j\ge2$, we get $\lVert F_j\rVert\le\lVert T_j(\epsilon)\rVert+\lVert T_j(0)\rVert+\epsilon\lVert T_j'(0)\rVert\le C_B\,\epsilon/\tau^{0\,2}_j$ with $C_B=4(11.56+4)+3.63+2+3=70.86$. If $\epsilon\tau^0_j\le1$ the minimum is $\epsilon^2/\tau^0_j\ge\epsilon/(4\tau^{0\,2}_j)$; otherwise it is $\epsilon/\tau^{0\,2}_j$. Either way the bound is at most $4C_B\min(\cdot)=283.4\min(\cdot)$. $\qquad\blacksquare$

**Check (measured).** `remainder_constants.py` computes the actual $F_j$ from the exact rows ($T_j'(0)$ by central difference, step $10^{-5}$) for every source with $\lvert k\rvert\le3000$, at three $(\hat\lambda,q,p)$ including the in-step point and at $\epsilon=10^{-3},10^{-2},0.1,0.25$. The largest ratio $\lVert F_j\rVert/\min(\epsilon^2/\tau^0_j,\epsilon/\tau^{0\,2}_j)$ is $3.93$, below $C_F$ by a factor of 545. A ratio above $2139$ would refute Proposition 3.

## 5. The summed remainder

**Proposition 4 (derived).** At fixed $\delta\in J$ the bound of Result item 2 holds, with $S=S(\delta,\epsilon)$ and $S_0=S_0(\delta)$.

*Proof.* We have $\Delta-\Delta_0-\epsilon\Delta_1=S^{-1}\sum_jF_j+(S^{-1}-S_0^{-1})\sum_j(T_j(0)+\epsilon T_j'(0))$, and $\sum_jT_j(0)=S_0M_0$, $\sum_jT_j'(0)=S_0\Delta_1$.

The first sum: the partner has $\tau^0=2$, and every other source has $\tau^0\ge\lvert k\rvert\delta$, two sources per $\pm k$ on each rail. With $K=\lceil1/(\epsilon\delta)\rceil$,

$$
\sum_j\min\Bigl(\frac{\epsilon^2}{\tau^0_j},\frac{\epsilon}{\tau^{0\,2}_j}\Bigr)\le\frac{\epsilon^2}{2}+4\Bigl[\frac{\epsilon^2}{\delta}(1+\log K)+\frac{\epsilon}{\delta^2K}\Bigr]\le\epsilon^2\Lambda(\epsilon,\delta).
$$

The logarithm is the sum of $\epsilon^2/(k\delta)$ up to the rung where the delay angle reaches one.

For $S$: on the receiver's rail $\lvert h_+\rvert=\lvert1-\cos\theta\rvert/(\tau^3D)\le\tfrac{16}{15}\min(\epsilon^2/(2\tau^0),2/\tau^{0\,3})\le2.14\min(\epsilon^2/\tau^0,1/\tau^{0\,3})$. On the far rail $h_-(\epsilon)-h_-(0)=-(1-\cos\theta)/(\tau^3D)+2(\tau^{0\,3}-\tau^3D)/(\tau^3D\tau^{0\,3})$. The first part is at most $2.34\min(\epsilon^2/\tau^0,1/\tau^{0\,3})$. For the second, $\tau^3D/\tau^{0\,3}=(1+\epsilon^2q)^{-3/2}(1+\epsilon^2\operatorname{sinc}\theta)$ with $q\in[0,1]$ and $\operatorname{sinc}\ge-0.22$, so $\lvert\tau^3D/\tau^{0\,3}-1\rvert\le1.72\epsilon^2$ and the term is at most $4.0\,\epsilon^2/\tau^{0\,3}$. Summing with $\sum_{k\ge1}\min(\epsilon^2/(k\delta),(k\delta)^{-3})\le(\epsilon^2/\delta)(1.5+\log K)$ and $4\epsilon^2\sum_k\tau^{0\,-3}\le0.86\epsilon^2$ gives the stated bound on $\lvert S-S_0\rvert$. $\qquad\blacksquare$

**Lower bound on $S$ (derived).** By Lemma 8 of the existence proof, $S_0(\delta)\ge\tfrac14-4(4+\delta^2)^{-3/2}\ge0.164$ on $J$. Near $\delta_*$ the sharper bound $S\ge0.1905$ holds for $\lvert\delta-\delta_*\rvert\le10^{-3}$ and $\epsilon\le10^{-4}$. It follows from $S_0(\delta_*)\in[0.19153459096,0.19153459098]$ (parent, enclosed), from $\lvert\partial_\delta S_0\rvert\le\sum_k6k^2\delta/\tau^5\le0.12$, and from the bound on $\lvert S-S_0\rvert$. Theorem 7 uses $0.1905$.

**Proposition 5 (derived; the logarithm removed in the in-step sector).** For $p=+1$, $q=0$, the in-plane $2\times2$ block, $\delta\in J$ and $\epsilon\le\epsilon_K=1/(8(2+1.5\delta))$,

$$
\Bigl\lVert\sum_jF_j\Bigr\rVert_{\text{in-plane}}\le\epsilon^2\Bigl[\frac{C_F}2+\frac{4(C_D+12C_F)}{\delta}+48C_F\epsilon\Bigr],\qquad C_D=80.5\,C_0=2.153\times10^4,
$$

and $\lvert S-S_0\rvert\le\epsilon^2[C^S_F/2+4(C^S_D+12C^S_F)/\delta+48C^S_F\epsilon]$ with $C^S_F=69.5$ and $C^S_D=209$.

*Proof.* In this sector $w_j=1$ and $\sigma_j=\nu(-1)^k$, so $T_j=\nu(-1)^kG_\nu(k;\epsilon)$ with $G_\nu$ free of polarity signs. Its in-plane entries are even in $k$, because $\tau$, $D$ and the in-plane parts of $\mathbf r$, $\mathbf V$, $\mathbf A$ depend on $k$ only through $k^2$, and the in-plane entries of $\mathbf n\mathbf n^{\mathsf T}$ contain $n_z$ only squared. Put $H_\nu(s)=G_\nu(s;\epsilon)-G_\nu(s;0)-\epsilon\partial_\epsilon G_\nu(s;0)$, so that $\lVert H_\nu(k)\rVert=\lVert F_j\rVert$. Then $\sum_jF_j=\nu H_-(0)\rvert_{\nu=-1}+2\sum_\nu\nu\sum_{k\ge1}(-1)^kH_\nu(k)$.

*Derivative bound.* Let $t\ge1$ satisfy $\epsilon(1.5t\delta+2)\le\tfrac14$. Every $s$ with $\lvert s-t\rvert\le t/2$ has $\lvert\tau^0(s)\rvert\le1.5t\delta+2$, hence $\epsilon\le r(s)/2$ (using also $\epsilon\le\tfrac18$). By Lemma 2 and the Cauchy remainder estimate in $\epsilon$ at fixed $s$, $\lVert H_\nu(s)\rVert\le2(C_0/\lvert\tau^0\rvert^3)(\epsilon/r(s))^2$. This equals $8C_0\epsilon^2/\lvert\tau^0(s)\rvert$ when $r=1/(2\lvert\tau^0\rvert)$, and is at most $32C_0\epsilon^2/\lvert\tau^0\rvert^3\le14.22C_0\epsilon^2/\lvert\tau^0\rvert$ when $r=\tfrac14$ (where $\lvert\tau^0\rvert\ge1.5$). With $\lvert\tau^0(s)\rvert\ge t\delta/(2\sqrt2)$ on either rail, $\lVert H_\nu(s)\rVert\le40.2\,C_0\epsilon^2/(t\delta)$ on the disc. Cauchy's estimate for the derivative at its centre then gives $\lVert H_\nu'(t)\rVert\le(2/t)\cdot40.2\,C_0\epsilon^2/(t\delta)=C_D\epsilon^2/(t^2\delta)$.

*Summation by parts.* Let $K_\epsilon$ be the largest integer with $\epsilon(1.5K_\epsilon\delta+2)\le\tfrac14$; for $\epsilon\le\epsilon_K$, $K_\epsilon\ge1/(12\epsilon\delta)$. Pairing $(1,2),(3,4),\dots$ up to $K_\epsilon$ gives $\lVert\sum_{k=1}^{K_\epsilon}(-1)^kH_\nu(k)\rVert\le\int_1^{K_\epsilon}\lVert H_\nu'\rVert\,dt+\lVert H_\nu(K_\epsilon)\rVert\le C_D\epsilon^2/\delta+12C_F\epsilon^3$. The tail obeys $\sum_{k>K_\epsilon}\lVert H_\nu(k)\rVert\le C_F\epsilon/(\delta^2K_\epsilon)\le12C_F\epsilon^2/\delta$. The partner contributes $C_F\epsilon^2/2$. Adding the two rails, each with the factor $2$ from $\pm k$, gives the display.

*For $S$.* The radial row $\nu(-1)^kh_\nu$ has the same structure and is even in $\epsilon$, so its first-order term vanishes. On the polydisc $\lvert r_r\rvert/(\lvert\tau\rvert^3\lvert D\rvert)\le2.138/(0.96^3\cdot0.9289\lvert\tau^0\rvert^3)=2.60/\lvert\tau^0\rvert^3$. The real bound is $\lvert h(\epsilon)\rvert+\lvert h(0)\rvert\le4.34/\tau^{0\,3}$. The same three steps give $C^S_F=\max(8\cdot2.60,\ 4\cdot4\cdot4.34)=69.5$ and $C^S_D=80.5\cdot2.60=209$. $\qquad\blacksquare$

At $\delta_*$ the bracket of Proposition 5 is $5.75\times10^4$. The logarithmic bound of Proposition 4 is $C_F\Lambda=2139(0.5+1.196(2+\log\lceil1/(3.345\epsilon)\rceil))$. It is smaller until $\log(1/\epsilon)\approx21$, so Proposition 5 matters for the order of the remainder and not for any threshold computed below.

## 6. The in-step determinant at a general spacing

**Lemma 6 (derived).** In the sector $p=+1$, $q=0$, at any $\delta\in J$, the in-plane blocks are

$$
\Delta_0=\begin{pmatrix}\hat\lambda^2-1+k_r&-2\hat\lambda\\2\hat\lambda&\hat\lambda^2\end{pmatrix},\qquad \Delta_1=\begin{pmatrix}-m_r\hat\lambda&\alpha+m_r\\\alpha-m_t&-m_t\hat\lambda\end{pmatrix}.
$$

Here $k_t=1$ exactly (the zero-delay comparison is a relative equilibrium at every spacing), $m_t=B(\delta)/S_0(\delta)$, and $\alpha$ is the coefficient of the aberration term. With $f_\epsilon=\det$ of the block,

$$
f_0=\hat\lambda^2(\hat\lambda^2+\Omega_0^2),\qquad f_1=\operatorname{tr}(\operatorname{adj}\Delta_0\,\Delta_1)=-m_r\hat\lambda(\hat\lambda^2+2)-m_t\hat\lambda(\hat\lambda^2+1+k_r),
$$

so $\alpha$ cancels and

$$
\hat\lambda_1(\delta)=-\frac{f_1(i\Omega_0)}{f_0'(i\Omega_0)}=m_r\frac{\Omega_0^2-2}{2\Omega_0^2}+\frac{m_t}{\Omega_0^2}\in\mathbb R,\qquad \Omega_0^2=k_r+3 .
$$

*Proof.* The block forms are the parent's Section 3 reduction with $m_t$ kept. The trace is direct algebra: $\operatorname{adj}\Delta_0=\begin{pmatrix}\hat\lambda^2&2\hat\lambda\\-2\hat\lambda&\hat\lambda^2-1+k_r\end{pmatrix}$, and $f_0'(i\Omega_0)=-2i\Omega_0^3$. $\qquad\blacksquare$

**Checks (measured).**
- The closed-form blocks agree with `first_order.py` to $2.2\times10^{-16}$, and the closed form of $f_1$ to $1.5\times10^{-15}$, at two values of $\hat\lambda$.
- At $\delta_*\pm10^{-3}$ the numerical $m_t$ equals $B/S_0$ to $4\times10^{-10}$ (`c1_delta_slope.py`).
- At $\delta_*$: $\alpha=2.27780=-m_r$, $k_r=-2.65039$, $m_t=8\times10^{-11}$, and $c_1=5.3762712024$. The float scripts use $\delta=2\pi/1.8782239487=3.3452801576343$, which is $8.8\times10^{-11}$ above the properly rounded $\delta_*=3.3452801575464$ (Codex review, 4C). At that offset $B/S_0=6.0\times10^{-11}$ (`c1-delta-slope.json`), which accounts for $m_t$. The offset also shifts the float $c_1$ by $dc_1/d\delta\times8.8\times10^{-11}=-6.9\times10^{-10}$; this accounts for the difference between $5.3762712024$ and the enclosed value, whose interval computation used the 40-digit root. The Rouché inputs move by less than $10^{-10}$, far inside the margins of Theorem 7.
- The slope is $dc_1/d\delta=-7.873$, so at the physical spacing $c_1(\delta(\epsilon))=c_1(\delta_*)+10.06\,\epsilon^2+O(\epsilon^3)$, using the existence theorem's leading coefficient $-1.278$. This is a contribution $+10\epsilon^3$ to $\operatorname{Re}\lambda$, small beside the cubic coefficient near $-2564$ that the parent's finite-speed fits suggest.

## 7. Rouché with an explicit disc

**Theorem 7 (derived; numerical inputs measured).** Fix $\delta\in J$ and let $\hat\lambda_*=i\Omega_0+\epsilon\hat\lambda_1$, with $\Omega_0,\hat\lambda_1$ evaluated at $\delta$. Let $\mathcal R(\epsilon)$ be any bound on $\lVert\Delta-\Delta_0-\epsilon\Delta_1\rVert$ valid on the disc $\lvert\hat\lambda-i\Omega_0\rvert\le d_{\max}=0.1$, for instance Proposition 4. Let $N_0,N_1$ bound $\lVert\Delta_0\rVert,\lVert\Delta_1\rVert$ there, $F_2=\sup\lvert f_0''\rvert$, $F_1'=\sup\lvert f_1'\rvert$, $\phi=\lvert f_0'(i\Omega_0)\rvert=2\Omega_0^3$. Suppose $\rho>0$ satisfies $\epsilon\lvert\hat\lambda_1\rvert+\rho\le d_{\max}$, $\rho<\epsilon\operatorname{Re}\hat\lambda_1$, and

$$
\phi\,\rho>\tfrac12F_2\,(\epsilon\lvert\hat\lambda_1\rvert+\rho)^2+\epsilon F_1'(\epsilon\lvert\hat\lambda_1\rvert+\rho)+2N_0\mathcal R+(\epsilon N_1+\mathcal R)^2 .
$$

Then the in-plane delayed determinant has exactly one zero in $\lvert\hat\lambda-\hat\lambda_*\rvert<\rho$, and it has $\operatorname{Re}\hat\lambda>0$.

*Proof.* For $2\times2$ matrices, $\det(A+E)=\det A+\operatorname{tr}(\operatorname{adj}A\,E)+\det E$, $\lVert\operatorname{adj}A\rVert=\lVert A\rVert$, $\lvert\operatorname{tr}X\rvert\le2\lVert X\rVert$ and $\lvert\det E\rvert\le\lVert E\rVert^2$. Applying these with $E=\epsilon\Delta_1+R_2$ gives $\lvert f-f_0-\epsilon f_1\rvert\le2N_0\mathcal R+(\epsilon N_1+\mathcal R)^2$. With $g(\hat\lambda)=f_0'(i\Omega_0)(\hat\lambda-i\Omega_0)+\epsilon f_1(i\Omega_0)$, Taylor's theorem bounds $\lvert f-g\rvert$ on the circle $\lvert\hat\lambda-\hat\lambda_*\rvert=\rho$ by the right side, while $\lvert g\rvert=\phi\rho$ there. The block of $\Delta$ is analytic in $\operatorname{Re}\hat\lambda>0$ (parent, Section 1), and the closed disc lies there because $\rho<\epsilon\operatorname{Re}\hat\lambda_1$. $\qquad\blacksquare$

**Evaluation at $\delta_*$ (`remainder_constants.py`, 21 s).** Inputs: $\Omega_0=0.591281818$, $\phi=0.41344$, $F_2\le12(\Omega_0+0.1)^2+2\Omega_0^2=6.434$ and $F_1'\le\lvert m_r\rvert(3(\Omega_0+0.1)^2+2)=7.821$. The norms, from the closed-form blocks sampled at 3601 points on the boundary circle (norms of analytic matrix functions are subharmonic, so the supremum is on the boundary), are $N_0=4.593$ and $N_1=2.769$. Also $\lVert M_0\rVert=2.650$, $S\ge0.1905$, and $\mathcal R$ from Proposition 4. Results:
- the radius $\rho=c_1\epsilon/2$ is admissible for every $\epsilon\le\epsilon_2=5.75\times10^{-7}$, giving a unique growing root with $\operatorname{Re}\lambda/\omega\ge c_1\epsilon/2$;
- the smallest admissible radius is $7.3\times10^{-14}$, $6.6\times10^{-12}$ and $5.9\times10^{-10}$ at $\epsilon=10^{-10},10^{-9},10^{-8}$, that is $0.0007\epsilon$, $0.0066\epsilon$ and $0.059\epsilon$;
- $\mathcal R(\epsilon)=2.6\times10^{-11}$, $2.0\times10^{-7}$, $1.4\times10^{-3}$, $0.109$ at $\epsilon=10^{-8},10^{-6},10^{-4},10^{-3}$.

**From $\delta_*$ to $\delta(\epsilon)$.** Theorem 7 holds at each fixed $\delta$, and the physical spacing is $\delta(\epsilon)$. For $\epsilon\le\epsilon_2$ the existence theorem gives $\lvert\delta(\epsilon)-\delta_*\rvert\le C_E\epsilon^2$; with the measured leading coefficient this is $\approx4\times10^{-13}$. The inputs then move by $\lvert d\Omega_0/d\delta\rvert\,\lvert\delta-\delta_*\rvert\approx1.5\times10^{-13}$ and $\lvert dc_1/d\delta\rvert\,\lvert\delta-\delta_*\rvert\approx3\times10^{-12}$, and $m_t=B(\delta(\epsilon))/S_0=O(\epsilon^2)$. These are far inside the margin of the inequality. This step uses $C_E$, which the existence proof left unevaluated. Within the chain, it is the one non-explicit constant.

**Conclusion (derived, with the stated inputs).**

$$
\frac{\lambda(\epsilon)}{\omega}=i\Omega_0(\delta(\epsilon))+\epsilon\hat\lambda_1(\delta(\epsilon))+E(\epsilon),\qquad\lvert E(\epsilon)\rvert\le\rho_{\min}(\epsilon)=O\bigl(\epsilon^2\log(1/\epsilon)\bigr),
$$

with $\rho_{\min}$ computable from the inequality. With Proposition 5 in place of Proposition 4 in the in-plane block, $\rho_{\min}=O(\epsilon^2)$. Hence $\operatorname{Re}\lambda/\omega=c_1\epsilon+O(\epsilon^2)$ with $c_1=5.3762712030\pm7.6\times10^{-10}$. The constant in the $O(\epsilon^2)$ is explicit through Propositions 3 to 5, apart from $C_E$, and is about $7\times10^6$. The parent's finite-speed fits are consistent with no $\epsilon^2$ term and a cubic coefficient near $-2564$; they do not prove that order. The enclosure of $c_1$ contains Codex's independent 60-digit value $5.37627120303651884164$ (review 4C).

## 8. Root-by-root census check

**Instrument (measured).** `match_adjudication_roots.py` reads `fine-sweep.json` of the 2026-10-03 adjudication as data only; its scripts were not read or run. It takes the records at $R=1000$ (speed $0.01384081428$, the adjudication's balance) and the nine wavenumbers $q=j\pi/8$ in both sectors. It solves the balance with this note's evaluator, obtaining $\delta=3.3450352927$ against the adjudication's $3.3450352927$, with truncation $5\times10^4$. For each $(q,p)$ it forms the predicted set: every zero of $\det\Delta_0$ with positive real part, plus every simple neutral zero with $c_1>0$, excluding the exact translation roots $\pm i$ at $q=\pi$, $p=-1$. Each is seeded at $\lambda_0$ or $i\Omega_0+\epsilon\hat\lambda_1$, Newton-solved on the exact delayed determinant, and matched one-to-one to the nearest recorded root within $10^{-6}$.

**Consistency check (not independent).** At $q=0$, $p=+1$ it returns the in-step root $0.0688851814+0.6064447133\,i$. This agrees with the parent's exact root at the nearby speed $0.013841$, $0.0688859835+0.6064450672\,i$, to the difference the speed change predicts (the measured slope $\partial\operatorname{Re}\lambda/\partial\epsilon\approx4.3$ times the speed difference $1.86\times10^{-7}$ is $8.0\times10^{-7}$, the observed difference). Its components passed their known cases in the parent note.

**Outcome.**

| Sector | Wavenumbers $q/\pi$ | Predicted (zero-delay growing + neutral with $c_1>0$) | Recorded | Matched | Largest distance ($\omega$) |
| --- | --- | --- | --- | --- | --- |
| $p=+1$ | $0,\tfrac18,\dots,1$ | $16+18=34$ | $34$ | $34$ | $5.2\times10^{-14}$ |
| $p=-1$ | $0,\tfrac18,\dots,1$ | $5+32=37$ | $37$ | $37$ | $1.6\times10^{-11}$ |

All 71 predicted roots coincide with recorded ones; no recorded root at these wavenumbers is unmatched. The smallest growth rate among them is $2.2\times10^{-4}\,\omega$. Every growing root found by the adjudication's search at this speed and these wavenumbers is therefore the continuation of a zero-delay root: either one that already grows, or a neutral one whose first-order coefficient is positive. The eight neutral roots with $c_1<0$ do not appear among the growing roots. The two instruments share the adjudicated first-variation formulas, so this is agreement of separately written assemblies and root solvers. The independent elements are the first-order prediction, which is this note's derivation, and the selection rule $c_1>0$, which correctly predicts which neutral roots grow. Below the adjudication's census threshold $0.03\,\omega$ its list was not certified complete. So the match shows that its list equals the predicted set; it does not show that no other growing root exists.

## 9. Falsifiers

- A source term at any admissible $(\epsilon,\hat\lambda,q,p,\delta)$ with $\lVert F_j\rVert>2139.3\min(\epsilon^2/\tau^0,\epsilon/\tau^{0\,2})$ would refute Proposition 3. The measured maximum ratio is $3.93$ (`remainder-constants.json`).
- A value of $\operatorname{tr}(\operatorname{adj}\Delta_0\Delta_1)$ at $q=0$, $p=+1$ that differs from $-m_r\hat\lambda(\hat\lambda^2+2)-m_t\hat\lambda(\hat\lambda^2+1+k_r)$ would refute Lemma 6.
- A delayed in-step root at some $\epsilon\le5.75\times10^{-7}$ with $\operatorname{Re}\lambda/\omega<c_1\epsilon/2$, or two zeros in that disc, would refute Theorem 7 as evaluated.
- A recorded root in `fine-sweep.json` at $R=1000$ and $q=j\pi/8$ absent from `match-adjudication-roots.json`, or a predicted root with no recorded partner within $10^{-6}$, would refute the census match.

## 10. Files, runs, and one interrupted attempt

New files in [`../evidence/rotating-ladder-claude-2026-10-20/delayed-growth/`](../evidence/rotating-ladder-claude-2026-10-20/delayed-growth/). No existing file was modified, and each new script refuses to overwrite its receipt. Python: `/Users/markmorris/vibe/.venv/bin/python`.

- `match_adjudication_roots.py` writes `match-adjudication-roots.json` (208 s).
- `remainder_constants.py` writes `remainder-constants.json` (21 s).
- `c1_delta_slope.py` writes `c1-delta-slope.json` (11 s).
- **Interrupted attempt.** A first version of `remainder_constants.py` evaluated the $2\times2$ blocks through the full lattice sums at 1442 boundary points. It exceeded 280 s, was moved by the shell into the background without my request, and was stopped by me after about 5 minutes. It wrote no receipt and its log was empty. The script and log are preserved as `.tmp/rotating-ladder/delayed-growth/remainder_constants_v1_interrupted.py` and `.log`. The rerun uses the closed-form blocks of Lemma 6, checked against the lattice sums at two points. Nothing is left running.

## 11. Review corrections integrated (Codex, 2026-10-20T22:54:29Z, section 4C)

The parent note is frozen; the PI records its review section there. The corrections bear on this note as follows.

1. **Delay ratio.** The parent's Lemma 5.1 states $\tau/\tau_0\in[1,(1-\epsilon^2)^{-1/2}]$ and attributes it to Lemma 1 of the existence proof. That is wrong on the far rail, where $\tau\le\tau_0$. The valid common comparison is $\tau/\tau_0\in[(1+\epsilon^2)^{-1/2},(1-\epsilon^2)^{-1/2}]$, from Lemma 1(c) of the existence proof: $\tau^2(1-\nu\epsilon^2q)=\tau_0^2$ with $q\in[0,1]$. This note's proofs use only correct ratio statements:
   - Lemma 1 gives $\lvert\tau/\tau_0-1\rvert\le0.038$ on both rails in the complex domains;
   - the real bounds of Section 3 use $\tau\ge\tau_0/\sqrt{1+\epsilon^2}$;
   - Proposition 4 uses $\tau_+\ge\tau_0$ on the receiver's rail and $\tau_-\le\tau_0$ on the far rail.

   Proposition 3 supersedes the parent's Lemma 5.1. As Codex also found, the $O(\epsilon^2\log(1/\epsilon))$ estimate and the right-half-plane Rouché step stand.
2. **Aberration term at $q=0$.** Its quadratic form on the mode vector $(a,ib,0)$ vanishes, so it gives **zero first-order eigenvalue shift**. The matrix acting on the mode is generally nonzero. The parent's phrase that it "does not act" on $q=0$ oscillations should read so. Lemma 6 is consistent with this: $\alpha$ cancels from $f_1$, although $\Delta_1$ contains it.
3. **Order of the true remainder.** The finite-speed fits are consistent with an $O(\epsilon^3)$ remainder in $\operatorname{Re}\lambda$; they do not prove it. Every statement of order in this note is either a derived bound (Propositions 3 to 5, Theorem 7) or is labelled as consistency with the fits.
4. **Energy.** The quadratic functional $E=\tfrac12\lvert\dot{\boldsymbol\xi}\rvert^2+\tfrac12\boldsymbol\xi^{\mathsf T}(J^2+M_0)\boldsymbol\xi$ of the parent's Section 6 is a functional of the linearised zero-delay comparison system. It is conserved there because the gyroscopic term does no work, and it is derived from that system's equations. It is not an imported physical energy of individual architrinos. The mechanism statement should be read as: the delayed velocity coupling increases this comparison functional, and the growth rate is its rate of increase divided by twice its value.
5. **Spacing rounding.** The properly rounded zero-speed spacing is $3.345280157546391$. The float instruments' $\delta$ is $8.8\times10^{-11}$ high; Section 6 records the consequences, which are below every margin used.

Proposition 5 (the written-out derivative bound that replaces the parent's outlined Proposition 5.4) has not yet been reviewed.

## Independent review disposition (PI integration)

Codex reviewed this note as frozen (SHA-256 `95178c495da858f8b9f3bfe5b45dcf0b15de8c9c79213803a2be33f9699fd85e`) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T23:19:17Z. It accepts the complex-contraction strategy (Lemma 1, with relative displacement below $0.037590$ and contraction below $0.003164$), the first-order determinant algebra, Lemma 6 and the algebra of the Rouché inequality, and the remainder proof route, after the following repairs, which supersede the body:

1. **Outward constants.** $\cosh(0.52)=1.1382740988\ldots$ (not $1.1380$); the exact chain gives $C_0=267.4039658552\ldots$, so use $C_0\le267.404$; $C_F=2139.3\ge8C_0$ survives. In Proposition 5 the intermediates $14.22$ and $40.2$ are rounded down; the exact multiplier is $512\sqrt2/9<80.5$, so $C_D=21530$ survives. For the scalar radial row use $C_0^S=2.603$, $C_F^S=69.5$, $C_D^S=210$ (the chain gives about $209.458$, not at most $209$). Keep exact expressions or outward bounds throughout.
2. **Domains.** The remainder bound applies on the right-half-plane part of the disk (the lattice series is undefined for $\operatorname{Re}\hat\lambda<0$); the Rouché disk itself lies there. The D2 extension holds with the label weights fixed or for the polarity-free sum in the in-step sector; $\lvert w_j\rvert=1$ fails for a literal complex continuation $e^{iqs}$.
3. **Suprema.** Sampling 3601 points is not a supremum proof, and $N_1=2.769$ rounds below the true maximum. Analytic bounds over the whole disk give $N_0\le4.592802$ and $N_1\le2.769064$ (safe displays $4.593$, $2.7691$). With these, Codex's independent interval audit confirms the strict Rouché margin at $\varepsilon=5.75\times10^{-7}$ (left side about $6.39047\times10^{-7}$, right side about $6.37245\times10^{-7}$), and the envelope $\log(1+1/(\varepsilon\delta))$ extends it to all smaller speeds.
4. **The explicit threshold is for an auxiliary problem.** The inequality concerns the characteristic determinant at the fixed spacing $\delta_*$. At positive speed that rotating configuration is not the exact delayed balance, so the result must not be read as the spectrum of the physical ladder for $\varepsilon\le5.75\times10^{-7}$. Applying it to the actual balance requires an explicit enclosure of the balanced spacing $\delta(\varepsilon)$ over the whole speed range (the existence theorem's constant $C_E$ and threshold are not evaluated; the leading coefficient $1.278$ is not a bound on them) and uniform versions of the Rouché inputs. Until then, the derived statement for the physical ladder is the asymptotic one, $\operatorname{Re}\lambda/\omega=c_1\varepsilon+O(\varepsilon^2)$ for sufficiently small, non-explicit speed, with the repaired remainder proof.
5. **Census.** Codex's separate matching instrument verifies the one-to-one agreement of the 71 endpoints with the adjudication's recorded list (34 matches for $p=+1$, 37 for $p=-1$; maximum distances $5.2\times10^{-14}$ and $1.6\times10^{-11}$). A Newton solve from an asymptotic seed does not prove that the endpoint lies on that seed's continuation branch, so the statement is endpoint agreement, not certified continuation, and it cannot exclude roots absent from both lists.
