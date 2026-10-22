# The localized lattice family measured by its actual growth band: a barrier from the origin, a later endpoint and a central growth bound (2026-10-20)

## Result

**In words.** The [summed signed-remainder note](saturday-summed-signed-lattice-remainder-2026-10-18.md) continued the localized disturbance of the alternating lattice, with its complete nonlinear past, to the time $T_N(\varepsilon)$ at which its seed-size bound $\Delta(t)=0.1144\,\varepsilon\,e^{2.8953t}$ reaches $0.0277$. Its lower bound on the growth of the central member was empty there for every admitted amplitude. Both limits trace back to one cautious step taken in every earlier note: the linear seed was bounded through its contour integral, which allows growth rates anywhere on the circle of radius $1/10$ about the staggered rate $\lambda_g\approx2.7952$. The seed itself contains only the rates of its real growing modes, and on the seed's support in wavevector space those rates lie within $0.008$ of $\lambda_g$. This note proves that statement and uses it.

1. **The seed's band envelope (derived).** For every seed of the accepted class, every growth rate present in the seed lies in the band $[2.7872,\,2.8033]$, and because the mode residues are positive semidefinite, the seed and its first three time derivatives are bounded by the largest exponential of the band times the total residue (Lemmas B.1 and B.2). The seed-norm bound becomes $\tilde\Delta(t)=0.0983\,\varepsilon\,e^{2.8033t}$, smaller than $\Delta(t)$ at every $t\ge0$ and growing more slowly. The central member grows at least like $0.0763\,\varepsilon\,e^{2.7872t}$ (Proposition B.4), so the upper and lower rates now differ by $0.0161$ in place of $0.2$.
2. **The forward source factor from the origin (derived).** Measured against $\tilde\Delta(t)$, the seed at every delayed source is smaller by the factor $\tilde\mu=e^{-(2.7872-a)(1-2\rho)}\le0.92274$ on the chart of radius $1/16$, at every time $t\ge0$ (Corollary B.3). The accepted factor $\mu\le0.83946$ needed $t\ge1-2\rho$; the new factor needs no waiting time, so the accepted summed signed estimate $F_{\rm sgn}$ applies from the origin with $\tilde\mu$ in place of $\mu$.
3. **A barrier started at the origin, with a smaller coefficient (derived; numbers by exact arithmetic).** On the chart of radius $1/16$, with $\tilde d=0.0305$ and coefficient $\tilde K=15.5$ in place of $22.5$, the barrier inequality holds exactly: $C_LF_{\rm sgn}^{\tilde\mu}(\tilde d,\tilde K\tilde d^2)\le0.0143655<0.014418875=\tilde K\tilde d^2$. The start at time zero follows from the accepted correction bound $31.9\lVert\varepsilon\phi\rVert_a^2$. The same solution therefore exists to
   $$
   \tilde T(\varepsilon)=\frac1{2.8033}\ln\frac{0.0305}{0.0983\,\varepsilon}\ \ge\ T_N(\varepsilon)+0.1295 ,
   $$
   and the gain grows with $\ln(1/\varepsilon)$, at the rate $0.011335$ per unit; for $\varepsilon=10^{-4}$, $\tilde T\ge2.868$ against $T_N\le2.6913$. On $[0,\tilde T]$ the correction satisfies $\lvert u-\varepsilon\phi\rvert<15.5\,\tilde\Delta^2$; every displacement is at most $0.044919$, every speed at most $0.15994$, every separation at least $0.910162$; each ordered pair has one causal root and no member has one on its own path (Theorem B.5). Smaller coefficients hold earlier: $6$ while $\tilde\Delta\le0.020$ and $8.5$ while $\tilde\Delta\le0.025$ (Corollary B.6).
4. **Central growth (derived).** At $\tilde T(\varepsilon)$ the central member's displacement is at least $0.007596$ for $\varepsilon=10^{-6}$ and at least $0.008186$ for $\varepsilon=10^{-4}$, while no displacement anywhere exceeded $9.087\times10^{-6}$ at time zero for $\varepsilon=10^{-4}$: a growth factor of at least $900$. The lower bound is positive for every amplitude $10^{-37}\le\varepsilon\le0.00646$. At the accepted endpoint $T_N$, where the earlier lower bound was empty for every amplitude, the central displacement is now at least $0.01008$ for every tabulated amplitude from $10^{-6}$ to $0.00646$ (Proposition B.7).
5. **Where this estimate stops (derived; exact certificates).** On the chart of radius $1/16$ the assembled estimate admits no barrier, for any coefficient, at any seed size $d\ge0.0317$. The same holds on every larger chart on which the same formulas are derived, and on every smaller chart for $d\ge0.0425$ (Proposition B.8). The chart is therefore no longer the binding condition: enlarging it (route (a) of the handover) cannot carry this estimate past $0.0317$. Removing the receiver cubic entirely would move that point only to $0.0383$; removing half the odd sum would move it to $0.0478$ (hypothetical orientation values).
6. **What is not obtained.** Growth uniform as $\varepsilon\to0$: relative to the seed-size bound, the central lower bound carries a factor proportional to $\varepsilon^{0.00574}$ from the band's width, which tends to zero with $\varepsilon$, so the bound is not shown positive below $10^{-37}$. No order-one displacement, ending of regular evolution, wake-speed arrival or arrival rate is established. Proof thresholds are bounds of a sufficient method, not measured displacements.

Claim grade: derived for Lemmas B.1 and B.2, Corollary B.3, Proposition B.4, Theorem B.5, Corollary B.6, Proposition B.7 and Proposition B.8, by the hand arguments below from the accepted notes' lemmas and declared constants. Their numbers come from one session instrument in exact rational arithmetic with outward-rounded interval exponentials and logarithms, which passed known cases first. The lattice sums, contour constants, linear-inverse norm and seed-class constants are the declared values of the accepted notes and keep their interval-library conditionality. Nothing is measured on solutions. Falsifiers are listed in Section 7.

Everything is for the unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, the full alternating population with every member dynamical, every causal root and tail retained, the original eight-source block summation, the contour of radius $1/10$, the accepted normalized real, even, nonnegative seed class supported within $1/20$ of the staggered wavevector, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$, $0<\varepsilon\le0.00646$, with its unique charted continuation. A run started at a finite time from the linear seed, a fixed exterior, a finite population or a copied coherent trajectory is a different preparation.

## 1. Setting, notation and accepted inputs

The notation is that of the [preparation](saturday-localized-nonlinear-preparation-2026-10-10.md), [forward-evolution](saturday-localized-forward-evolution-2026-10-11.md), [quantification](saturday-localized-forward-quantification-2026-10-11.md), [extension](saturday-localized-forward-extension-2026-10-12.md), [evolved-history](saturday-localized-evolved-history-continuation-2026-10-12.md), [forward-profile](saturday-localized-beyond-evolved-endpoint-2026-10-14.md) and summed signed-remainder notes. The member at lattice site $j\in\mathbb Z^3$ has polarity sign $\sigma_j=(-1)^{j_1+j_2+j_3}$ and position $j+u_j(T)$. The row is $g\sigma_\ell\Psi(R,v)$ with $\Psi(R,v)=R/(\lvert R\rvert^2(\lvert R\rvert-R\cdot v))$, where $R$ points from the emission point to the receiver and $v$ is the source velocity at emission; with $c_f=1$ and unit reduced coupling this is the canonical per-hit acceleration, and $1-\hat R\cdot v$ is its transmitter factor. No member has a root on its own path because every speed is below one, and the emission at zero delay is excluded by the canonical convention.

**The seed.** For a wavevector $k$ in the torus and complex $\lambda$, $F(k,\lambda)=\lambda^2I-gM(k,\lambda)$ is the mode matrix and $Q=(\pi,\pi,\pi)$ the staggered wavevector. The contour $\Gamma$ is the circle of radius $1/10$ about the staggered rate $\lambda_g$, with $2.7952<\lambda_g<2.7953$; its left edge is $a\in(2.6952,2.6953)$, $\bar a=2.6953$, and its right edge $\lambda_+<2.8953$. A seed of the class is
$$
\phi_j(T)=\frac1{(2\pi)^3}\int e^{ik\cdot j}\,\hat\phi(k,T)\,dk,\qquad\hat\phi(k,T)=\frac1{2\pi i}\oint_\Gamma e^{\lambda T}F(k,\lambda)^{-1}V(k)\,d\lambda ,
$$
with $V(k)=b(k)\mathbf e$, $\mathbf e$ a fixed real unit vector and $b\ge0$ a smooth even bump of unit normalized mass supported in $\lvert k-Q\rvert\le1/20$. The residue matrix is $P(k)=\frac1{2\pi i}\oint_\Gamma F(k,\lambda)^{-1}d\lambda$.

**The correction and the barrier quantity.** Let $u$ be the unique charted continuation of $u^\varepsilon$ and $c=u-\varepsilon\phi$ its correction, defined as a difference on the solution that exists. For $t$ in its domain put $\tilde u^t(T)=u(T+t)$, $\tilde v^t(T)=c(T+t)$ for $T\le0$, and
$$
y(t)=\lVert\tilde v^t\rVert_{2a},\qquad\lVert f\rVert_\nu=\sup_{T\le0,\,j}e^{-\nu T}\max\Bigl\{\lvert f_j\rvert,\frac{\lvert f_j'\rvert}\nu,\frac{\lvert f_j''\rvert}{\nu^2}\Bigr\}.
$$
So $y(t)$ measures the whole actual past of the correction up to $t$, with its first two derivatives. Nothing beyond the correction's two continuous derivatives is used anywhere.

**Accepted inputs, used as stated there.**

- Quantification note, Proposition Q6: $h'(\lambda_g)\ge4.2797$; for $\operatorname{Re}\lambda\ge a$, $\lvert\lambda\rvert\le\lambda_+$ and every $k$, $g\lVert M(k,\lambda)-M(Q,\lambda)\rVert\le31.854\lvert k-Q\rvert^2$.
- Quantification note, Proposition Q8 and its proof: for $\lvert k-Q\rvert\le3/20$ every zero of $\det F(k,\cdot)$ inside $\Gamma$ is real, at each zero the pole of $F^{-1}$ is simple with positive semidefinite residue, and $(\lambda h)'\ge10.021$ on $[a,\lambda_+]$, where $F(Q,\lambda)=\lambda h(\lambda)I$; on $\lvert k-Q\rvert\le1/20$, $\lVert P(k)-P(Q)\rVert\le0.00725$, $P(Q)=I/(\lambda_gh'(\lambda_g))$ and $P(k)\ge p_0I$ with $p_0=0.0763$.
- Extension note, Lemma X1 and the matching of Theorem X5: the accepted correction is the fixed point of Lemma X1 for $\psi=\varepsilon\phi$, so $\lVert v^\varepsilon\rVert_{2a}\le31.9\,\lVert\varepsilon\phi\rVert_a^2$.
- Evolved-history note, Lemma E.1 and the first-crossing argument of Theorem E.3; forward note, Theorem 1 and its maximal-continuation remark, Proposition 4.
- Forward-profile note, Lemma S.3 and Proposition S.4; summed signed-remainder note, Lemmas L.1–L.3 and Theorem L.4, with $F_{\rm sgn}$ and its declared chart constants.

## 2. The band envelope of the seed

The contour bound of Proposition Q6(3) estimates $\lvert e^{\lambda T}\rvert$ by its largest value on the whole circle $\Gamma$. That is safe but blind to where the poles actually are. The integrand has poles only at the zeros of $\det F(k,\cdot)$, which for $k$ near $Q$ are real and cluster near $\lambda_g$; the residue theorem replaces the contour integral by a finite sum of exponentials at those zeros. The first lemma locates the zeros, the second turns the sum into a bound.

**Lemma B.1 (the growth band; derived).** For every $k$ with $\lvert k-Q\rvert\le1/20$, every zero $\lambda_0$ of $\det F(k,\cdot)$ inside $\Gamma$ satisfies
$$
\lvert\lambda_0-\lambda_g\rvert\le\delta_r:=\frac{31.854}{400\times10.021}<0.0079469,\qquad\text{hence}\qquad\underline\lambda:=2.7872\le\lambda_0\le2.8033=:\overline\lambda .
$$

*Proof.* By Proposition Q8(1) every such zero is real and lies in $[a,\lambda_+]$. For real $\lambda$ in that interval $F(k,\lambda)$ is a real symmetric matrix and $F(Q,\lambda)=\lambda h(\lambda)I$, so Weyl's inequality places every eigenvalue of $F(k,\lambda)$ within $\lVert F(k,\lambda)-F(Q,\lambda)\rVert=g\lVert M(k,\lambda)-M(Q,\lambda)\rVert\le31.854/400=0.079635$ of $\lambda h(\lambda)$. Since $\lambda h$ vanishes at $\lambda_g$ and has derivative at least $10.021$ on $[a,\lambda_+]$, $\lvert\lambda h(\lambda)\rvert\ge10.021\lvert\lambda-\lambda_g\rvert$ there. If $\lvert\lambda-\lambda_g\rvert>\delta_r$ every eigenvalue is therefore nonzero, with the sign of $\lambda h(\lambda)$, and $F(k,\lambda)$ is invertible. So $\lvert\lambda_0-\lambda_g\rvert\le\delta_r$. Finally $\delta_r=0.0079468\ldots$, $2.7952-0.0079469>2.7872$ and $2.7953+0.0079469<2.8033$. $\blacksquare$

The band has width $\overline\lambda-\underline\lambda=0.0161$, against $0.2$ for the contour's real diameter. The preparation note's float measurement, which is not used here, found two branches through the staggered root at $2.7967$ for $\lvert k-Q\rvert=0.2$ along a lattice axis, a shift of about $0.0015$ at four times the present support radius. That sampled value suggests the proved band is conservative; it does not enclose the spread over the whole support.

**Lemma B.2 (the band envelope; derived).** Put $\bar P:=0.09085$ and $\tilde\Lambda:=0.0983$. For every seed of the class, every $\varepsilon>0$, every real $\tau$ and $n=0,1,2,3$,
$$
M_n(\tau):=\frac1{(2\pi)^3}\int\bigl\lvert\partial_\tau^n\varepsilon\hat\phi(k,\tau)\bigr\rvert\,dk\ \le\
\begin{cases}\varepsilon\bar P\,\overline\lambda^{\,n}e^{\overline\lambda\tau},&\tau\ge0,\\[2pt]\varepsilon\bar P\,\overline\lambda^{\,n}e^{\underline\lambda\tau},&\tau\le0.\end{cases}
$$
Consequently $\sup_j\lvert\varepsilon\phi_j^{(n)}(\tau)\rvert\le M_n(\tau)$, and for every $t\ge0$ the translated seed $\psi=\varepsilon\phi(\cdot+t)$ satisfies $\lvert\psi_j^{(n)}(T)\rvert\le a^n\tilde\Delta(t)e^{aT}$ for $T\le0$, $n\le2$, with
$$
\tilde\Delta(t)=\tilde\Lambda\,\varepsilon\,e^{\overline\lambda t}.
$$

*Proof.* By Proposition Q8(1) the poles of $F(k,\cdot)^{-1}$ inside $\Gamma$ are the distinct real zeros $\lambda_1,\dots,\lambda_m$, $m\le3$, each simple with positive semidefinite residue $R_i(k)$. The residue theorem gives, for every real $\tau$,
$$
\hat\phi(k,\tau)=b(k)\sum_ie^{\lambda_i\tau}R_i(k)\,\mathbf e,\qquad\sum_iR_i(k)=P(k),
$$
and $\partial_\tau^n$ multiplies the $i$-th term by $\lambda_i^n$. Put $c_i=\lambda_i^ne^{\lambda_i\tau}>0$ and $c=\max_ic_i$. For positive semidefinite matrices, $0\le\sum_ic_iR_i\le c\sum_iR_i=cP(k)$ in the order of quadratic forms, and the operator norm is monotone on positive semidefinite matrices, so $\lvert\sum_ic_iR_i\mathbf e\rvert\le c\lVert P(k)\rVert$. By Lemma B.1, $c\le\overline\lambda^{\,n}e^{\overline\lambda\tau}$ for $\tau\ge0$ and $c\le\overline\lambda^{\,n}e^{\underline\lambda\tau}$ for $\tau\le0$. Next, $\lVert P(k)\rVert\le\lVert P(Q)\rVert+\lVert P(k)-P(Q)\rVert\le1/(2.7952\times4.2797)+0.00725=0.0908437\ldots\le\bar P$. Integrating over $k$ with the unit normalized mass of $b$ gives the bound on $M_n$, and $\lvert\varepsilon\phi_j^{(n)}(\tau)\rvert\le M_n(\tau)$ because $\lvert e^{ik\cdot j}\rvert=1$. For the translated seed take $T\le0\le t$. If $T+t\ge0$, $e^{-aT}e^{\overline\lambda(T+t)}=e^{\overline\lambda t}e^{(\overline\lambda-a)T}\le e^{\overline\lambda t}$; if $T+t<0$, $e^{-aT}e^{\underline\lambda(T+t)}=e^{\underline\lambda t}e^{(\underline\lambda-a)T}\le e^{\overline\lambda t}$. Hence $e^{-aT}\lvert\psi_j^{(n)}(T)\rvert/a^n\le\varepsilon\bar P(\overline\lambda/a)^ne^{\overline\lambda t}$, and $\bar P(\overline\lambda/a)^2\le0.09085\,(2.8033/2.6952)^2=0.0982838\ldots\le\tilde\Lambda$. $\blacksquare$

The mechanism, in words: the seed is a superposition of real growing modes with nonnegative weights, so it can never be larger than its fastest mode would be if all the weight sat there. The contour estimate instead allowed the fastest rate on the whole circle, $\lambda_+$, and the slowest, $a$. Both bounds are upper envelopes; the new one is an envelope of the actual rates present.

| Quantity | Accepted contour bound | Band envelope |
| --- | --- | --- |
| seed-norm constant | $\bar\Lambda_0=0.1144$ | $\tilde\Lambda=0.0983$ |
| upper growth rate used | $2.8953$ | $\overline\lambda=2.8033$ |
| lower growth rate used for the centre | $a\ge2.6952$ | $\underline\lambda=2.7872$ |
| third-derivative factor | $\lambda_+/a\le1.0743$ | $\overline\lambda/a\le1.0402$ |

**Corollary B.3 (the forward source factor from the origin; derived).** Let $0<\rho\le1/16$ and $\tilde\mu=e^{-(\underline\lambda-a)(1-2\rho)}$. For every seed of the class, every $t\ge0$, every relative time $T'\le-(1-2\rho)$ and $n\le2$,
$$
M_n(t+T')\le a^n\,\tilde\mu\,\tilde\Delta(t)\,e^{aT'},\qquad M_3(t+T')\le1.0743\,a^3\,\tilde\mu\,\tilde\Delta(t)\,e^{aT'} .
$$
On the chart $\rho=1/16$, $\tilde\mu\le0.92274$.

*Proof.* If $t+T'\ge0$, Lemma B.2 gives $M_n\le\varepsilon\bar P\overline\lambda^{\,n}e^{\overline\lambda t}e^{\overline\lambda T'}\le a^n\tilde\Delta(t)e^{aT'}e^{(\overline\lambda-a)T'}$, and $e^{(\overline\lambda-a)T'}\le e^{-(\overline\lambda-a)(1-2\rho)}\le\tilde\mu$. If $t+T'<0$, it gives $M_n\le\varepsilon\bar P\overline\lambda^{\,n}e^{\underline\lambda t}e^{\underline\lambda T'}\le a^n\tilde\Delta(t)e^{aT'}e^{(\underline\lambda-a)T'}$, using $e^{\underline\lambda t}\le e^{\overline\lambda t}$ for $t\ge0$, and $e^{(\underline\lambda-a)T'}\le\tilde\mu$. For $n=3$ the extra factor is $\overline\lambda/a\le2.8033/2.6952<1.0402\le1.0743$. With $\underline\lambda-a\ge2.7872-2.6953=0.0919$ and $\rho=1/16$, $\tilde\mu\le e^{-0.0804125}=0.9227356\ldots\le0.92274$. $\blacksquare$

By Lemma S.3(ii) and Proposition S.4, the envelope variation $D_\ell$ of a mirror pair of sources is at most $\tfrac r{20}M_n$ and the pair average $\bar\Phi$ at most $M_n$, at every time. Corollary B.3 therefore gives every forward-profile seed bound listed in Section 1 of the summed signed-remainder note, with $(d,\mu)$ replaced by $(\tilde\Delta(t),\tilde\mu)$ and for every $t\ge0$. The proofs of Lemmas L.2 and L.3 and Theorem L.4 use $\mu$ only through these seed bounds at the sources. Hence Theorem L.4 holds with $\tilde\mu$ in place of $\mu$:
$$
\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}\le F^{\tilde\mu}_{\rm sgn}(\tilde\Delta(t),y(t))=g\Bigl[c_{E3}A^3+\Sigma_{\rm br}(A,\tilde\mu\tilde\Delta,y)+\tfrac12\mathcal O(A,\tilde\mu\tilde\Delta)\Bigr],\qquad A=\tilde\Delta(t)+y(t),
$$
whenever $\tilde\Delta(t)+2y(t)\le\rho\le1/16$. The accepted factor of Lemma S.1, $\mu=e^{-0.2(1-2\rho)}$, was measured against $\Delta(t)$ and required $t\ge1-2\rho$; the band factor is larger, $0.92274$ against $0.83946$, but holds from the origin.

**Proposition B.4 (the centre grows at the band's lower rate; derived).** For every seed of the class and every $\tau\ge0$, $\mathbf e\cdot\varepsilon\phi_0(\tau)\ge\varepsilon\,p_0\,e^{\underline\lambda\tau}$.

*Proof.* With the residue sum of Lemma B.2, $\mathbf e\cdot\hat\phi(k,\tau)=b(k)\sum_ie^{\lambda_i\tau}\mathbf e^{\mathsf T}R_i(k)\mathbf e\ge b(k)e^{\underline\lambda\tau}\mathbf e^{\mathsf T}P(k)\mathbf e\ge p_0\,b(k)\,e^{\underline\lambda\tau}$, since each $\mathbf e^{\mathsf T}R_i\mathbf e\ge0$, $\lambda_i\ge\underline\lambda$ and $\tau\ge0$. At $j=0$ the Fourier factor is one; integrate with $b\ge0$ of unit mass. $\blacksquare$

## 3. A barrier started at the origin

The accepted barriers started at a time where an earlier note had already bounded the correction, and the last one had to wait until the forward factor $\mu$ became valid. With the band envelope both constraints disappear: the forward factor holds from $t=0$, and at $t=0$ the accepted fixed-point bound already controls the correction in terms of the actual seed norm. A barrier can therefore be run along the whole forward history with a coefficient chosen for the endpoint alone.

**Theorem B.5 (derived, relying on the accepted notes).** Let $\rho=1/16$ and let $F^{\tilde\mu}_{\rm sgn}$ be the polynomial of Theorem L.4 on that chart, with the accepted declared constants ($\varpi=0.16845625$, $\kappa=0.875$, $\eta\le1.40062$, $\mathsf s_1\le0.09459$, $c_{20}\le8.7669$, $c_{11}\le4.3806$, $c_{02}\le3.4784$, $c_{E3}\le57.346$ and the third-derivative constants of Lemma L.1) and with $\tilde\mu=0.92274$. Let $\tilde d=0.0305$, $\tilde K=15.5$, $\tilde y=\tilde K\tilde d^2=0.014418875$ and $d_0=0.0006351\ge\tilde\Lambda\times0.00646$. In exact arithmetic on these declared values:

- (a) $\tilde d+2\tilde y=0.05933775\le\rho$;
- (b) $C_LF^{\tilde\mu}_{\rm sgn}(\tilde d,\tilde y)\le0.0143655<\tilde y$;
- (c) $C_LF^{\tilde\mu}_{\rm sgn}(d_0,31.9d_0^2)<31.9d_0^2$ and $d_0+2\times31.9d_0^2\le\rho$.

Consequently, for every $0<\varepsilon\le0.00646$ and with $\tilde T(\varepsilon)=\ln(\tilde d/(\tilde\Lambda\varepsilon))/\overline\lambda$:

1. the unique charted continuation of $u^\varepsilon$ exists on $(-\infty,\tilde T(\varepsilon)]$; it is the same solution, with the same complete past;
2. for $0\le T\le\tilde T$ and every member, $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert\le y(T)<15.5\,\tilde\Delta(T)^2$, and the first two derivatives of the difference are below $2a$ and $(2a)^2$ times that;
3. on $(-\infty,\tilde T]$: displacements are at most $0.044919$, speeds at most $0.15994$, accelerations at most $0.64057$, transmitter factors at least $0.84006$, separations at least $0.910162$, and each delay is within $0.089838$ of the anchor distance; each ordered pair of distinct members has exactly one causal root at every reception time, and no member has a root on its own path;
4. the disturbance keeps finite spatially weighted size for every weight exponent up to $\tilde T$ (forward note, Proposition 4; qualitative);
5. $\tilde T(\varepsilon)\ge T_N(\varepsilon)+0.1295$, and $\tilde T(\varepsilon)-T_N(\varepsilon)$ increases with $\ln(1/\varepsilon)$ at the rate $1/\overline\lambda-1/2.8953\ge0.011335$.

*Proof.* *The inequality along the solution.* Let $t\ge0$ be a time up to which the solution exists with $\tilde\Delta(t)+2y(t)\le\rho$. Then $\psi=\varepsilon\phi(\cdot+t)$ obeys the seed hypothesis of Lemma E.2 with $d=\tilde\Delta(t)$ (Lemma B.2), the correction part obeys it with $y=y(t)$ by definition, and the forward-profile seed bounds hold with $\tilde\mu$ (Corollary B.3). The solution then has displacements at most $\tilde\Delta+y\le\rho$ and speeds at most $\bar a(\tilde\Delta+2y)\le\bar a\rho\le3/16$ on $(-\infty,t]$, so Lemma E.1 applies, and with Theorem L.4 for $\tilde\mu$,
$$
y(t)\le C_LF^{\tilde\mu}_{\rm sgn}\bigl(\tilde\Delta(t),y(t)\bigr).\tag{$*$}
$$
*Scaling.* Every monomial of $F^{\tilde\mu}_{\rm sgn}$ has nonnegative coefficient and total degree at least two in $(d,y)$ (verified for the declared coefficients by the instrument), so $F^{\tilde\mu}_{\rm sgn}(d,Kd^2)/d^2$ is nondecreasing in $d$ for fixed $K$. By (b), $C_LF^{\tilde\mu}_{\rm sgn}(d,\tilde Kd^2)<\tilde Kd^2$ for every $0<d\le\tilde d$, and by (c) the same holds with $31.9$ for every $0<d\le d_0$.

*Start.* At $t=0$, $y(0)=\lVert v^\varepsilon\rVert_{2a}\le31.9\lVert\varepsilon\phi\rVert_a^2\le31.9\,\tilde\Delta(0)^2$ by the extension note and Lemma B.2, and $\tilde\Delta(0)=\tilde\Lambda\varepsilon\le d_0$. So $\tilde\Delta(0)+2y(0)\le\rho$ by (c), and $(*)$ holds at $t=0$. The function $Y\mapsto Y-C_LF^{\tilde\mu}_{\rm sgn}(\tilde\Delta(0),Y)$ is concave, because $F^{\tilde\mu}_{\rm sgn}$ is a polynomial in $Y$ with nonnegative coefficients. By the scaling step it is positive at $Y=15.5\tilde\Delta(0)^2$ and at $Y=31.9\tilde\Delta(0)^2$, hence on the whole interval between them. By $(*)$ it is not positive at $Y=y(0)\le31.9\tilde\Delta(0)^2$. Therefore $y(0)<15.5\tilde\Delta(0)^2$.

*Barrier.* Let $\mathcal T$ be the set of $t\in[0,\tilde T]$ with $t<T_{\max}$ and $y(s)<\tilde K\tilde\Delta(s)^2$ for all $s\in[0,t]$; it contains $0$. On $\mathcal T$ the solution lies in the chart of radius $\tilde d+\tilde y$ with speeds at most $\bar a(\tilde d+2\tilde y)<3/16$ and accelerations at most $\bar a^2(\tilde d+4\tilde y)$, uniformly. By the forward note's remark on maximal continuation, $T_{\max}$ is not the supremum $t_0$ of $\mathcal T$, so the solution exists at $t_0$. By continuity of $y$ (Lemma E.1), $y(t_0)\le\tilde K\tilde\Delta(t_0)^2$, so $\tilde\Delta(t_0)+2y(t_0)\le\tilde d+2\tilde y\le\rho$ and $(*)$ holds at $t_0$. Equality $y(t_0)=\tilde K\tilde\Delta(t_0)^2$ would give $\tilde K\tilde\Delta^2\le C_LF^{\tilde\mu}_{\rm sgn}(\tilde\Delta,\tilde K\tilde\Delta^2)<\tilde K\tilde\Delta^2$. So the inequality is strict at $t_0$ and persists beyond it unless $t_0=\tilde T$. Hence $\mathcal T=[0,\tilde T]$ and $T_{\max}>\tilde T$. No fixed point is constructed and no part of the past is replaced: the quantity bounded is the norm of the actual correction over the actual past.

*Items.* Item 2: $\lvert c_j(T)\rvert=\lvert\tilde v^T_j(0)\rvert\le y(T)$, and likewise for the derivatives with their normalizations. Item 3 on $[0,\tilde T]$: displacement at most $\tilde d+\tilde y=0.044918875$, speed at most $\bar a(\tilde d+2\tilde y)=0.159933\ldots$, acceleration at most $\bar a^2(\tilde d+4\tilde y)=0.640563\ldots$; transmitter factor at least $1-\bar a(\tilde d+2\tilde y)$; separation at least $1-2(\tilde d+\tilde y)$; delay within $2(\tilde d+\tilde y)$ of the anchor distance; the chart facts of the forward note with radius $\tilde d+\tilde y$ give one root per ordered pair, and the speed bound below one excludes own-path roots. Before time zero the preparation's smaller bounds hold. Item 4 is the forward note's Proposition 4 in this chart. Item 5: $\tilde T-T_N=[\ln(\tilde d/\tilde\Lambda)/\overline\lambda-\ln(0.0277/0.1144)/2.8953]+\ln(1/\varepsilon)\,(1/\overline\lambda-1/2.8953)$; the coefficient of $\ln(1/\varepsilon)$ is positive, so the difference is smallest at $\varepsilon=0.00646$, where interval logarithms give $\tilde T\ge1.38116$ and $T_N\le1.25164$. $\blacksquare$

**Corollary B.6 (a ladder of smaller coefficients; derived).** The pairs $(d,K)=(0.020,6)$ and $(0.025,8.5)$ satisfy (a), (b) and (c) on the same chart: $C_LF^{\tilde\mu}_{\rm sgn}(0.020,0.0024)\le0.0023980<0.0024$ and $C_LF^{\tilde\mu}_{\rm sgn}(0.025,0.0053125)\le0.0052996<0.0053125$. Hence $y(T)<6\tilde\Delta(T)^2$ whenever $0\le T$ and $\tilde\Delta(T)\le0.020$, and $y(T)<8.5\tilde\Delta(T)^2$ whenever $\tilde\Delta(T)\le0.025$. The proof is that of Theorem B.5 with these pairs. The declared coefficients are the smallest multiples of one half found to pass for these seed sizes; none is claimed to be the smallest possible.

| $\varepsilon$ | $T_N\le$ | $\tilde T\ge$ | gain $\ge$ |
| ---: | ---: | ---: | ---: |
| $0.00646$ | $1.2517$ | $1.3811$ | $0.1295$ |
| $10^{-3}$ | $1.8960$ | $2.0466$ | $0.1506$ |
| $10^{-4}$ | $2.6913$ | $2.8680$ | $0.1767$ |
| $10^{-5}$ | $3.4866$ | $3.6894$ | $0.2028$ |
| $10^{-6}$ | $4.2819$ | $4.5108$ | $0.2289$ |
| $10^{-8}$ | $5.8725$ | $6.1535$ | $0.2811$ |
| $10^{-12}$ | $9.0536$ | $9.4391$ | $0.3855$ |

The same solution is also shown smaller than before on the accepted interval. At the accepted endpoint $T_N$, $\tilde\Delta(T_N)=\tilde\Lambda\varepsilon\,(0.0277/(0.1144\varepsilon))^{\overline\lambda/2.8953}$ is at most $0.021213$ for $\varepsilon=0.00646$ and at most $0.016052$ for $\varepsilon=10^{-6}$, so by Corollary B.6 the correction there is below $0.0038249$ and $0.0015460$ respectively, against the accepted allowance $22.5\times0.0277^2=0.017264025$.

## 4. Central growth

**Proposition B.7 (derived).** For $0<\varepsilon\le0.00646$ and every time $0\le T\le\tilde T(\varepsilon)$ with $\tilde\Delta(T)\le d$, where $(d,K)$ is one of the pairs of Theorem B.5 or Corollary B.6,
$$
\lvert u_0(T)\rvert\ \ge\ \varepsilon\,p_0\,e^{\underline\lambda T}-K\,\tilde\Delta(T)^2 .
$$
At the time where $\tilde\Delta=d$, $e^{\underline\lambda T}=(d/(\tilde\Lambda\varepsilon))^{\underline\lambda/\overline\lambda}$, so the bound equals $\varepsilon^{1-\beta}p_0(d/\tilde\Lambda)^\beta-Kd^2$ with $\beta=\underline\lambda/\overline\lambda>0.99425$. It increases with $\varepsilon$, and at the endpoint $(\tilde d,\tilde K)$ it is positive for every $10^{-37}\le\varepsilon\le0.00646$. At time zero, $\sup_j\lvert u_j(0)\rvert\le\varepsilon\bar P+15.5(\tilde\Lambda\varepsilon)^2$.

*Proof.* $\lvert u_0\rvert\ge\mathbf e\cdot u_0\ge\mathbf e\cdot\varepsilon\phi_0-\lvert c_0\rvert$; apply Proposition B.4 and Theorem B.5 or Corollary B.6. Monotonicity in $\varepsilon$ holds because $1-\beta>0$; positivity at $10^{-37}$ is an interval evaluation, and monotonicity extends it to the whole range. The time-zero bound is Lemma B.2 with $n=0$ plus item 2 of Theorem B.5 at $T=0$. $\blacksquare$

Values at the new endpoint $\tilde T(\varepsilon)$, with lower bounds rounded down and upper bounds up:

| $\varepsilon$ | linear term $\ge$ | $\lvert u_0(\tilde T)\rvert\ge$ | $\sup_j\lvert u_j(0)\rvert\le$ | growth factor $\ge$ |
| ---: | ---: | ---: | ---: | ---: |
| $0.00646$ | $0.023153$ | $0.008734$ | $5.932\times10^{-4}$ | $14.7$ |
| $10^{-3}$ | $0.022906$ | $0.008487$ | $9.100\times10^{-5}$ | $93.2$ |
| $10^{-4}$ | $0.022605$ | $0.008186$ | $9.087\times10^{-6}$ | $900$ |
| $10^{-6}$ | $0.022015$ | $0.007596$ | $9.086\times10^{-8}$ | $8.36\times10^4$ |
| $10^{-8}$ | $0.021440$ | $0.007022$ | $9.086\times10^{-10}$ | $7.72\times10^6$ |
| $10^{-12}$ | $0.020336$ | $0.005917$ | $9.086\times10^{-14}$ | $6.51\times10^{10}$ |
| $10^{-37}$ | $0.014611$ | $0.000192$ | $9.086\times10^{-39}$ | $2.11\times10^{34}$ |

At the intermediate ladder point $\tilde\Delta=0.025$ (coefficient $8.5$) the central lower bound is larger still: at least $0.013484$, $0.013237$ and $0.012753$ for $\varepsilon=10^{-3}$, $10^{-4}$ and $10^{-6}$. At the accepted endpoint $T_N$ the bound $\varepsilon p_0e^{\underline\lambda T_N}-K\tilde\Delta(T_N)^2$, with the ladder coefficient valid at $\tilde\Delta(T_N)$, is at least $0.012311$, $0.012652$, $0.011739$ and $0.010083$ for $\varepsilon=0.00646$, $10^{-3}$, $10^{-4}$ and $10^{-6}$. The accepted lower bound at $T_N$ was empty for every amplitude.

**Why the earlier bound was empty, and what remains.** The earlier bound compared a central lower bound growing at rate $a$ with a correction allowance built from an upper bound growing at rate $2.8953$; at a fixed seed-size bound $d$ the ratio of the central lower bound to $d$ is proportional to $\varepsilon^{(2.8953-a)/2.8953}\approx\varepsilon^{0.069}$, and the fixed allowance $Kd^2$ then exceeds the guaranteed central value for every admitted amplitude at $d=0.0277$. Here the two rates differ by $0.0161$, the same ratio is proportional to $\varepsilon^{0.00574}$, and the smaller coefficient $15.5$ lowers the allowance. The loss is still there: as $\varepsilon\to0$ the bound tends to $-\tilde K\tilde d^2$, so no growth uniform in $\varepsilon$ is established, and the bound is not shown positive below $10^{-37}$. A positive lower bound uniform in $\varepsilon$ would need the seed's central value and its norm bound to grow at the same rate, which the band of real rates on the seed's support does not allow for a bound of this form.

## 5. Where the assembled estimate stops

The earlier notes found the chart condition $d+2Kd^2\le1/16$ close to saturation and named a larger chart as one route. With the smaller coefficient this changes: at the declared endpoint the chart slack is $0.00316$, while the barrier inequality holds with a ratio $0.99630$. The following proposition shows that the barrier inequality itself, not the chart, now ends this estimate.

**Proposition B.8 (derived; exact certificates).** Write $\varphi_d(y)=y-C_LF(d,y)$ for a version $F$ of the assembled estimate. In each case below, $\varphi_d(y)<0$ for every $y\ge0$ in the stated range, so no coefficient $K$ gives a barrier at seed size $d$:

1. on the chart $\rho=1/16$, with $F=F^{\tilde\mu}_{\rm sgn}$, for every $d\ge0.0317$ and every $y\ge0$;
2. on every chart $\rho\ge1/16$ on which Lemmas L.1–L.3, Theorem L.4, Lemma E.1 and the chart facts are derived with the same formulas, for every $d\ge0.0317$ and $y\ge0$;
3. on every chart $\rho\le1/16$, for every $d\ge0.0425$ and every $y$ allowed by the chart condition.

*Proof.* $F$ is a polynomial in $y$ with nonnegative coefficients, so $\varphi_d$ is concave in $y$. If $\varphi_d'(0)\le0$ its maximum is $\varphi_d(0)<0$. Otherwise exact bisection gives $y_1<y_2$ with $\varphi_d'(y_1)>0\ge\varphi_d'(y_2)$; the maximizer $y_*$ lies in $[y_1,y_2]$, and concavity gives $\max\varphi_d=\varphi_d(y_*)\le\varphi_d(y_1)+\varphi_d'(y_1)(y_2-y_1)$. The instrument evaluates this upper bound exactly: $-8.28\times10^{-5}$ in case 1 at $d=0.0317$. All coefficients of $F$ are nonnegative, so $\varphi_d(y)$ is nonincreasing in $d$ and the certificate at one $d$ covers every larger $d$.

For case 2, every constant entering $F$ on a chart $\rho$ ($c_{20}$, $c_{11}$, $c_{02}$, the four constants of Lemma L.1, $1/\kappa$, $1/(1-\varpi)$, $\eta$, $\mathsf s_1$, $c_{E3}$ and $\tilde\mu$) is a nondecreasing function of $\rho$ and enters every coefficient with a nonnegative sign, while the lattice sums do not depend on $\rho$. So every coefficient on a chart $\rho\ge1/16$ is at least its value at $\rho=1/16$ computed with every constant rounded down; the instrument checks that these lower values lie below the declared ones and certifies $\max\varphi_d\le-8.25\times10^{-5}$ at $d=0.0317$ with them. For case 3, every coefficient on a chart $\rho\le1/16$ is at least its limit as $\rho\to0$ ($\varpi=0$, $\kappa=\eta=1$, $\mathsf m=D=1$, $\mathsf s_1=e^{-\bar a}$ rounded down, $c_{E3}=4Z_5$, $\tilde\mu=e^{-(\underline\lambda-\bar a)}$ rounded down), and the chart condition forces $y\le(\rho-d)/2\le(1/16-d)/2$; on that range the instrument certifies $\max\varphi_d\le-4.48\times10^{-5}$ at $d=0.0425$. $\blacksquare$

The certificate at $d=0.0316$ on the chart $1/16$ has positive upper bound $4.5\times10^{-5}$; that does not prove a barrier exists there, and the chart condition already excludes the passing coefficients at that size. The declared endpoint $0.0305$ is therefore within four percent of the largest seed size this estimate can reach on the chart of radius $1/16$, and route (a), a chart above $1/16$, cannot carry it past $0.0317$. Case 3 is coarse: it uses the radius-zero constants with the radius-$1/16$ range of $y$.

*Which part limits it (hypothetical orientation, exact).* At the declared endpoint the three parts of $C_LF^{\tilde\mu}_{\rm sgn}$ are about $0.006975$ for half the odd sum, $0.004124$ for the source-difference brackets and $0.003266$ for the receiver cubic. Repeating the certificate on the chart $1/16$ with one part deleted, which is not a valid estimate and is computed only to rank the parts, moves the first certified seed size to $0.0383$ without the receiver cubic, $0.0377$ without the brackets and $0.0478$ without half the odd sum. A signed treatment of the receiver cubic, route (d), can therefore move this estimate at most to about $0.038$; the largest available gain lies in the odd remainder of the pure-seed rows. The precise missing estimate for a barrier beyond $0.0317$ is a bound on the summed odd part, and secondarily on the brackets and receiver cubic, whose assembled polynomial satisfies $\varphi_d(y)>0$ for some $y$ with $d+2y\le\rho$ at a declared $d>0.0317$. Within the odd part the largest coefficient is the $A^2q$ term, which collects the row's third derivatives and the sample-shift products; both are bounded in absolute value source by source.

## 6. Instrument, evidence and the reference boundary

[`band_barrier.py`](../evidence/saturday-lattice-growth-2026-10-20/band_barrier.py), described in the [evidence README](../evidence/saturday-lattice-growth-2026-10-20/README.md), imports the frozen instrument of the summed signed-remainder note unchanged, for its exact polynomial $F_{\rm sgn}$, chart parameters and declared constants, and through it the frozen evolved-history and extension instruments for row constants, exact rounding and the interval exponential and logarithm. The only change to the imported parameter dictionary is the value of the source factor, replaced by $\tilde\mu$. It encloses no lattice sum.

Before any target it passes six known cases: the accepted barrier value $C_LF_{\rm sgn}(0.0277,22.5\times0.0277^2)\in(0.0130738,0.0130739]$ through the frozen code (an accepted same-author regression value, whose exact value $0.0130738465\ldots$ was reproduced by the independent review); exact equality of its univariate expansion with the frozen $F_{\rm sgn}$ at six points; independent rational Taylor bounds bracketing the interval exponential at $0.0804125$; the concave-maximum certificate on two hand polynomials, one with positive and one with negative maximum; the accepted emptiness of the old growth bound at $T_N$; and $\tilde\mu=1$ at $\rho=1/2$. Version 1 computed the band constants, barrier, ladder, chart-$1/16$ obstruction, times and growth tables. Version 2 added the radius-zero envelope and the hypothetical part removals; version 3 added the two chart ranges of Proposition B.8. No earlier function or target was changed, every version passed every known case, and versions 1 and 2 are retained in `history/`.

What the instrument establishes: exact evaluation of the stated closed forms and certificates from declared inputs. It does not establish the lemmas, which are hand derivations, or the declared lattice sums, contour constants and linear-inverse norm, which rest on the accepted interval enclosures. Its comparison values are hand values, exact arithmetic and accepted same-author regression values; none is an independent reference for the new bounds. Nothing is computed on a history.

## 7. Falsifiers

- Lemma B.1: a wavevector with $\lvert k-Q\rvert\le1/20$ and a zero of $\det F(k,\cdot)$ inside $\Gamma$ outside $[2.7872,2.8033]$; or a correct evaluation contradicting one of the accepted inputs it uses ($31.854$, $10.021$, reality of the zeros).
- Lemma B.2: a seed of the class and a time at which $M_n(\tau)$ exceeds the displayed band envelope; a wavevector on the support with $\lVert P(k)\rVert>0.09085$; a non-simple pole or a residue that is not positive semidefinite at a zero inside $\Gamma$.
- Corollary B.3: a seed of the class, $t\ge0$ and $T'\le-(1-2\rho)$ with $M_n(t+T')>a^n\tilde\mu\tilde\Delta(t)e^{aT'}$.
- Proposition B.4: a seed of the class with $\mathbf e\cdot\phi_0(\tau)<0.0763\,e^{2.7872\tau}$ at some $\tau\ge0$.
- Theorem B.5 and Corollary B.6: an exact evaluation in which (a), (b) or (c) fails with the declared constants; a step of Theorem L.4 that uses $\mu$ other than through the forward-profile seed bounds; a seed of the class and an amplitude whose complete-past solution, with its unique charted continuation, ceases to exist before $\tilde T(\varepsilon)$, violates a bound of items 2 or 3, or has two roots for one ordered pair or a root on its own path at some $T\le\tilde T$. A run started at a finite time from the seed alone does not test this.
- Proposition B.7: an exact evaluation contradicting a table entry with the declared constants.
- Proposition B.8: a $y\ge0$ with $y>C_LF^{\tilde\mu}_{\rm sgn}(0.0317,y)$ on the chart $1/16$; a constant of the estimate that decreases with the chart radius.
- A correct enclosure showing a declared lattice sum, $S_1(a)$, $C_L$ or a declared contour constant beyond its declared value withdraws the affected numbers without affecting the lemmas.

## 8. Limits

The unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, all members dynamical, the eight-source block prescription, the contour of radius $1/10$ and the accepted seed class, for $0<\varepsilon\le0.00646$. The statements concern the complete-past solution and its unique charted continuation. Theorem B.5 gives existence and upper bounds to $\tilde T$; Proposition B.7 gives a central lower bound for amplitudes from $10^{-37}$ to $0.00646$, not uniformly as $\varepsilon\to0$. Spatial decay is qualitative. Lattice sums and contour constants are conditional on the interval library. The band of Lemma B.1 is a proved enclosure of the rates; float samples at a few wavevectors and directions suggest a narrower spread there, but they do not enclose the spread over the whole seed support. The declared triple and ladder are passing choices, not optima; Proposition B.8 bounds what this estimate can reach and says nothing about the solution. Order-one displacement, the ending of regular evolution and arrival at wake speed are not addressed.

## Proposed propagation (not applied)

No shared tracker, manuscript or queue was edited. Suggested text for the lattice owner, for a new queue entry or the successor of "Continue the localized family beyond the forward-profile interval": "Band envelope and later endpoint (Saturday lattice agent, 2026-10-20, derived, under independent review): on the seed's support every growth rate lies in $[2.7872,2.8033]$, so the seed is bounded by $0.0983\varepsilon e^{2.8033t}$ and its centre grows at least like $0.0763\varepsilon e^{2.7872t}$; the forward source factor $\tilde\mu\le0.92274$ then holds from the origin. A barrier from $t=0$ with coefficient $15.5$ continues the same complete-past family to $\tilde T=\ln(0.0305/(0.0983\varepsilon))/2.8033\ge T_N+0.1295$, with displacement at most $0.044919$, speed at most $0.15994$ and separation at least $0.910162$. The central lower bound is positive at $\tilde T$ for $10^{-37}\le\varepsilon\le0.00646$ (growth factor at least 900 at $\varepsilon=10^{-4}$) and at the accepted $T_N$. The assembled estimate admits no barrier at seed size $0.0317$ or above on chart $1/16$ or any larger chart; the odd remainder is its largest part. Open: a sharper summed odd bound, growth uniform in $\varepsilon$, order-one evolution, endings and arrival."
