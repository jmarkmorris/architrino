# The reflected odd remainder of the localized lattice family: its exact cubic and the signed lattice sums (2026-10-21)

## Result

**In words.** The localized disturbance of the alternating lattice is continued, with its complete nonlinear past, by a barrier argument whose estimate contains three parts. The largest is half of the summed *odd remainder*: for each receiver and each mirror pair of sources at offsets $\ell$ and $-\ell$, the difference $f_\ell(\alpha,\bar\Phi)-f_\ell(-\alpha,-\bar\Phi)$ between the row remainder of the actual receiver displacement $\alpha$ with the pair-averaged pure seed $\bar\Phi$ at the source, and the same quantity with both signs reversed. The [summed signed-remainder note](saturday-summed-signed-lattice-remainder-2026-10-18.md) bounds it source by source in absolute value, through third-derivative bounds of the row, a bound on the shift between the two sampling times and a bound on the two delay brackets. At the best accepted barrier, seed size $0.047$ with coefficient $5$ ([slow-source note](saturday-lattice-growth-2026-10-20-sharp.md)), that bound is about $57$ percent of the whole estimate. This note computes the cubic term of the odd remainder exactly, keeps its signs, and sums it over the lattice with the symmetries of the lattice.

1. **The exact cubic of the reflected odd row (derived; checked against an independent high-precision evaluation).** Along the amplitude line $\lambda\mapsto(\lambda\alpha,\lambda\bar\Phi)$ the odd remainder is $2C_\ell(\alpha;J)$ plus a remainder of fourth order, where $C_\ell$ is an explicit cubic polynomial in $\alpha$ and the source jet $J=(\bar\Phi,\bar\Phi',\bar\Phi'',\bar\Phi''')$ at the anchor time $T-r$ (Lemma O.1). The three pieces that the accepted bound estimates separately (odd core, sampling-time shift, delay brackets) are combined in $C_\ell$ before any absolute value is taken.
2. **Reduction to a pure staggered mode (derived).** The seed at a source is, up to two small and explicitly bounded deviations, a single staggered mode: the same vector $\psi_0$ at every source, damped by $e^{-\Lambda r}$ with a fixed reference rate $\Lambda=2.7952$. The deviations are the spread of growth rates within the band $[2.7872,2.8033]$ and the variation of the envelope across a mirror pair, at most $r^2/800$ of the seed bound. For the pure mode the summed signed cubic is $\sigma_iK_{21}[\alpha,\alpha,\psi_0]+K_{12}[\alpha,\psi_0,\psi_0]+\sigma_iK_{03}[\psi_0^3]$ with three lattice tensors independent of the receiver, the time and the amplitude (Lemma O.2).
3. **The tensors are fixed by cubic symmetry, and their norms are small (derived; exact shell sums with interval exponentials).** Each tensor is invariant under the $48$ signed permutations of the axes, so it has at most three independent components, and its norm as a multilinear map is at most the norm of a symmetric form, which is attained on repeated vectors, plus the asymmetric remainder. The exact shell sums give $\lVert K_{21}\rVert\le10.9259$, $\lVert K_{12}\rVert\le1.9832$, $\lVert K_{03}\rVert\le0.0962$, and the asymmetric parts vanish to the width of the enclosure (Lemma O.3, Proposition O.4).
4. **What this changes (orientation; the bound is completed in the companion note).** At the accepted endpoint $(d,y)=(0.047,0.011045)$ the signed main term contributes about $0.00115$ to the barrier quantity $C_LF$, against $0.006115$ for half of the accepted odd bound. The remainder of fourth order and the two deviations are bounded, assembled with every other term and tested at later seed sizes in the companion barrier note of this round (`saturday-lattice-odd-remainder-2026-10-21-barrier.md`, in this folder).

Claim grade: derived for Lemmas O.1–O.3 and Proposition O.4, by the hand arguments below; the numerical constants of Proposition O.4 are exact rational shell sums over the cube of half-width $5$ with interval exponentials and an analytic tail bound, computed by a session instrument that passed known cases first, including an independent 50-digit evaluation of the true odd part. Nothing is measured on solutions. Falsifiers are in Section 6.

The scenario is unchanged: the canonical Master Equation at $g=16$, unit spacing, $c_f=1$, every member dynamical, every causal root and tail retained, the original eight-source block summation for the receiver field, the contour of radius $1/10$, the accepted normalized real, even, nonnegative seed class supported within $1/20$ of the staggered wavevector, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$, $0<\varepsilon\le0.00646$, with its unique charted continuation. The actual correction enters only through its first two derivatives; the odd remainder contains no correction at a source at all.

## 1. Setting and the quantity to be bounded

The notation is that of the [band-envelope note](saturday-lattice-growth-2026-10-20.md) and its companions. The member at site $j\in\mathbb Z^3$ has polarity sign $\sigma_j=(-1)^{j_1+j_2+j_3}$ and position $j+u_j(T)$. For a receiver $i$ and a source $i-\ell$, $r=\lvert\ell\rvert$, $n=\ell/r$ and $\sigma_\ell=\sigma_i\sigma_{i-\ell}$. The canonical per-hit acceleration with $c_f=1$ and unit reduced coupling gives the row $g\sigma_\ell\Psi(R,v)$,
$$
\Psi(R,v)=\frac{R}{\lvert R\rvert^2\,(\lvert R\rvert-R\cdot v)},
$$
where $R$ points from the emission point to the receiver and $v$ is the source velocity at emission; $1-\hat R\cdot v$ is the transmitter factor. The receiver's own velocity does not enter. With $T_\ell=(3nn^{\mathsf T}-I)/r^3$ and $B_\ell=nn^{\mathsf T}/r^2$, the row remainder of a receiver displacement $\beta$ and a source history $Y$ is
$$
f_\ell(\beta,Y)=\Psi\bigl(\ell+\beta-Y(T-\tau),\,Y'(T-\tau)\bigr)-\Psi(\ell+\beta,0)-T_\ell\,Y(T-r)-B_\ell\,Y'(T-r),\qquad\tau=\lvert\ell+\beta-Y(T-\tau)\rvert,
$$
the causal delay $\tau$ being the unique root on the chart (forward-profile note, Lemma S.3).

**Translated frame and sizes.** At a time $t\ge0$ of the barrier argument put $d=\tilde\Delta(t)=0.0983\,\varepsilon\,e^{2.8033t}$, the band seed-size bound, $y=y(t)$, the rate-$2a$ norm of the actual correction over the whole past, $A=d+y$, and $X=e^{aT}\le1$ for a reception time $T\le0$ of the translated frame, with $a\in(2.6952,2.6953)$. The receiver displacement satisfies $\lvert\alpha\rvert\le XA$.

**The seed envelope and the pair average.** By the forward-profile note, Lemma S.3(ii), $\varepsilon\phi_j(\tau)=\sigma_j\psi(j,\tau)$ with
$$
\psi(x,\tau)=\frac1{(2\pi)^3}\int_{\lvert q\rvert\le1/20}e^{iq\cdot x}\,\varepsilon\,b(Q+q)\sum_m e^{\lambda_m\tau}R_m(Q+q)\,\mathbf e\,dq ,
$$
where, by Lemma B.2 of the band-envelope note, the $\lambda_m(k)$ are the distinct real zeros of the mode determinant inside the contour, all in the band $[\underline\lambda,\overline\lambda]=[2.7872,2.8033]$, and the residues $R_m(k)$ are positive semidefinite with sum $P(k)$, $\lVert P(k)\rVert\le\bar P=0.09085$. The pair average of Proposition S.4 is $\bar\Phi=\sigma_i\sigma_\ell\,\bar\psi_\ell$, $\bar\psi_\ell=\tfrac12[\psi(i-\ell,\cdot)+\psi(i+\ell,\cdot)]$, in the translated frame $\bar\Phi(T')=\sigma_i\sigma_\ell\bar\psi_\ell(t+T')$. Its *jet* at the anchor time is $J=(P_0,P_1,P_2,P_3)$, $P_k=\bar\Phi^{(k)}(T-r)$.

**The odd remainder.** By Proposition S.4 each mirror pair contributes to $\mathcal N_i/g$ two source-difference brackets and $\sigma_\ell\,\mathcal O_\ell$, with
$$
\mathcal O_\ell=f_\ell(\alpha,\bar\Phi)-f_\ell(-\alpha,-\bar\Phi).
$$
Since $\mathcal O_{-\ell}=\mathcal O_\ell$, the sum over pairs is $\tfrac12\sum_{\ell\ne0}\sigma_\ell\mathcal O_\ell$, an absolutely convergent series. The accepted estimate (Lemma L.2 with the tube sizes and the constants of Lemma H.1) bounds $\lvert\mathcal O_\ell\rvert$ for each $\ell$ and adds the bounds.

## 2. The exact cubic along the amplitude line

Picture the receiver displacement and the source history scaled together by a factor $\lambda$. At $\lambda=0$ the lattice is at rest. The row remainder vanishes there, its first derivative in $\lambda$ is removed exactly by the linear subtraction, and its second derivative is even in $\lambda$. So the reflected difference $\mathcal O_\ell$, which compares $\lambda=1$ with $\lambda=-1$, begins with the cubic term. The forward-profile note states this locally; the lemma below computes the cubic term.

Write $G(h,k)=\Psi(\ell+h,k)$ for small $(h,k)$ and expand it in homogeneous orders. With $G_0=n/r^2$, $w_0=n\cdot k$, $h_\perp=h-n(n\cdot h)$, $w_1=(h_\perp\cdot k)/r$, $w_2=-[(n\cdot h)(h_\perp\cdot k)+\tfrac12(n\cdot k)\lvert h_\perp\rvert^2]/r^2$ and
$$
\begin{aligned}
\partial G_0[h]&=\frac{h-3n(n\cdot h)}{r^3},\qquad
\partial^2G_0[h,h]=\frac{-6(n\cdot h)h-3\lvert h\rvert^2n+15(n\cdot h)^2n}{r^4},\\
\partial^3G_0[h,h,h]&=\frac{-9\lvert h\rvert^2h+45(n\cdot h)^2h+45\lvert h\rvert^2(n\cdot h)n-105(n\cdot h)^3n}{r^5},
\end{aligned}
$$
the derivatives of $R/\lvert R\rvert^3$ at $\ell$, the second- and third-order parts of $G$ are
$$
\begin{aligned}
O_2(h,k)&=\tfrac12\partial^2G_0[h,h]+w_0\,\partial G_0[h]+(w_1+w_0^2)\,G_0,\\
O_3(h,k)&=\tfrac16\partial^3G_0[h,h,h]+\tfrac12w_0\,\partial^2G_0[h,h]+(w_1+w_0^2)\,\partial G_0[h]+(w_2+2w_0w_1+w_0^3)\,G_0 .
\end{aligned}
$$
They follow from $\Psi(R,v)=G_0(R)/(1-n(R)\cdot v)$, the expansion $1/(1-w)=1+w+w^2+w^3+\dots$ and $n(\ell+h)\cdot k=w_0+w_1+w_2+O(4)$, with $\partial n[h]=h_\perp/r$ and $\tfrac12\partial^2n[h,h]=-[2(n\cdot h)h_\perp+\lvert h_\perp\rvert^2n]/(2r^2)$. Write $G_2[z,z']$ for the symmetric bilinear form with $G_2[z,z]=2O_2(z)$.

**Lemma O.1 (the cubic of the reflected odd row; derived).** Let $\alpha$ and the pure-seed pair average $\bar\Phi$ satisfy the tube hypotheses of Lemma T.1 (or Lemma G.2 on a larger chart), so that every configuration $(\lambda\alpha,\lambda\bar\Phi)$ with $\lvert\lambda\rvert\le1$ has exactly one causal root, a source speed at most $v_*<1$ and range at least $(1-\delta_*)r$. Then $g(\lambda)=f_\ell(\lambda\alpha,\lambda\bar\Phi)$ is infinitely differentiable on $[-1,1]$, $g(0)=g'(0)=0$, and $g'''(0)/6=C_\ell(\alpha;J)$, where, with $x=\alpha-P_0$, $\delta_1=n\cdot x$, $x_\perp=x-n\delta_1$,
$$
\delta_2=(n\cdot P_1)\,\delta_1+\frac{\lvert x_\perp\rvert^2}{2r},\qquad z_1=(x,P_1),\qquad z_2=\delta_1\,(P_1,-P_2),\qquad b_1=(\alpha,0),
$$
$$
C_\ell(\alpha;J)=G_2[z_1,z_2]+O_3(z_1)-O_3(b_1)+T_\ell\Bigl(\tfrac12P_2\delta_1^2-P_1\delta_2\Bigr)+B_\ell\Bigl(\tfrac12P_3\delta_1^2-P_2\delta_2\Bigr).
$$
Consequently
$$
\mathcal O_\ell=2C_\ell(\alpha;J)+\mathcal R_\ell,\qquad \mathcal R_\ell=\int_0^1\frac{(1-s)^3}{6}\bigl[g''''(s)-g''''(-s)\bigr]\,ds .
$$

*Proof.* *Smoothness.* The root solves $F(\tau,\lambda)=\tau-\lvert\ell+\lambda\alpha-\lambda\bar\Phi(T-\tau)\rvert=0$ with $\partial_\tau F=1-\lambda\,\hat R\cdot\bar\Phi'(T-\tau)\ge1-v_*>0$; $\bar\Phi$ is a superposition of exponentials integrated against a bounded weight, hence infinitely differentiable, and $\Psi$ is smooth where $R\ne0$ and $\hat R\cdot v<1$. The implicit function theorem gives a smooth root, and $g$ is smooth. *The delay.* Put $\delta=\tau-r$. With $\bar\Phi(T-r-\delta)=P_0-P_1\delta+\tfrac12P_2\delta^2-\dots$, the vector $R-\ell=\lambda x+\lambda P_1\delta+O(\lambda\delta^2)$, and $\lvert\ell+h\rvert=r+n\cdot h+\lvert h_\perp\rvert^2/(2r)+O(\lvert h\rvert^3)$. Solving order by order, $\delta=\lambda\delta_1+\lambda^2\delta_2+O(\lambda^3)$. *The sampled source.* Hence the argument of $G$ is $z(\lambda)=(R-\ell,\lambda\bar\Phi'(T-r-\delta))=\lambda z_1+\lambda^2z_2+O(\lambda^3)$. *The row.* The linear part of $G$ at $(\ell,0)$ is $(h,k)\mapsto-T_\ell h+B_\ell k$, because $\partial_R\Psi(\ell,0)=-T_\ell$ and $\partial_v\Psi(\ell,0)=B_\ell$. Evaluated at $z(\lambda)$, whose spatial part is $\lambda\alpha-\lambda\bar\Phi(T-r-\delta)$, it gives $-T_\ell\lambda\alpha+\lambda T_\ell\bar\Phi(T-r-\delta)+\lambda B_\ell\bar\Phi'(T-r-\delta)$. The subtraction $-\Psi(\ell+\lambda\alpha,0)$ has linear part $+T_\ell\lambda\alpha$, and the remaining subtractions are $-T_\ell\lambda P_0-B_\ell\lambda P_1$. Together the linear parts leave exactly the delay brackets $\lambda T_\ell[\bar\Phi(T-r-\delta)-P_0]+\lambda B_\ell[\bar\Phi'(T-r-\delta)-P_1]$. So $g(\lambda)=O_2(z)+O_3(z)-O_2(\lambda b_1)-O_3(\lambda b_1)+(\text{delay brackets})+O(\lambda^4)$. The $\lambda$-coefficients are: order one, zero; order two, $O_2(z_1)-O_2(b_1)-T_\ell P_1\delta_1-B_\ell P_2\delta_1$, which is the same for $-\lambda$; order three, $G_2[z_1,z_2]+O_3(z_1)-O_3(b_1)$ from the row and $T_\ell(\tfrac12P_2\delta_1^2-P_1\delta_2)+B_\ell(\tfrac12P_3\delta_1^2-P_2\delta_2)$ from the delay brackets. This is $C_\ell$. *The remainder.* Taylor's formula with integral remainder for $g(1)$ and $g(-1)$ gives $g(1)-g(-1)=2g'(0)+\tfrac13g'''(0)+\int_0^1\frac{(1-s)^3}6[g''''(s)-g''''(-s)]ds$, and $g'(0)=0$. $\blacksquare$

*Check (measured).* The instrument evaluates $C_\ell$ in exact arithmetic and compares it with $[\mathcal O_\ell(s\alpha,s\bar\Phi)]/(2s^3)$ computed directly from the root-solved row at $50$ digits, for a pure exponential source $\bar\Phi(T')=q\,\mathbf w\,e^{\Lambda T'}$, $s=10^{-5}$, five offsets and random rational $\alpha,\mathbf w$. The relative differences are at most $5.0\times10^{-10}$, consistent with the $O(s^2)$ error of the difference quotient. This tests the formula on samples; the proof is the lemma.

The mechanism, in words: the accepted bound treats the odd core, the shift between the two sampling times and the two delay brackets as independent and adds their absolute values. In $C_\ell$ they are parts of one polynomial, and for the actual geometry, where the receiver is displaced and the source is seen about one time unit earlier, smaller by roughly $e^{-2.8}$ and moving at the growth rate, they partly cancel within each offset.

## 3. Reduction to a pure staggered mode

**Lemma O.2 (pure-mode reduction; derived).** Fix the reference rate $\Lambda=2.7952\in[\underline\lambda,\overline\lambda]$, put $\rho_P=\bar P/\tilde\Lambda=0.09085/0.0983\le0.924212$ and $\psi_0=\psi(i,t+T)$, the envelope at the receiver site at the reception time. For every offset and $k=0,1,2,3$:

1. $\lvert\psi_0\rvert\le\rho_P\,d\,X$;
2. $\bigl\lvert\bar\psi_\ell^{(k)}(t+T-r)-\Lambda^ke^{-\Lambda r}\psi_0\bigr\rvert\le\epsilon_k(r)\,\rho_P\,d\,X$, with
$$
\epsilon_k(r)=\Bigl[\tilde\omega_k(r)+\frac{r^2}{800}\,\overline\lambda^{\,k}\Bigr]e^{-\underline\lambda r},\qquad\tilde\omega_0(r)=0.0161\,r,\qquad\tilde\omega_k(r)=0.0161\,\overline\lambda^{\,k-1}(k+\overline\lambda r)\ (k\ge1);
$$
3. with $J^{\rm ref}_k=\sigma_i\sigma_\ell\Lambda^ke^{-\Lambda r}\psi_0$, the summed signed cubic splits as
$$
\sum_{\ell\ne0}\sigma_\ell C_\ell(\alpha;J)=\sigma_iK_{21}[\alpha,\alpha,\psi_0]+K_{12}[\alpha,\psi_0,\psi_0]+\sigma_iK_{03}[\psi_0,\psi_0,\psi_0]+\mathrm{Dev},
$$
$$
\lvert\mathrm{Dev}\rvert\le\sum_{\ell\ne0}\bigl[M_\ell(\lvert\alpha\rvert;p+\Delta p)-M_\ell(\lvert\alpha\rvert;p)\bigr],\qquad p_k=\overline\lambda^{\,k}e^{-\underline\lambda r}\rho_PdX,\quad\Delta p_k=\epsilon_k(r)\rho_PdX,
$$
where $K_{21}$, $K_{12}$, $K_{03}$ are the parts of degree one, two and three in the jets of $\sum_\ell C_\ell$, $\sum_\ell\sigma_\ell C_\ell$ and $\sum_\ell C_\ell$ evaluated at the jets $(\Lambda^ke^{-\Lambda r}w)_k$, and $M_\ell$ is the majorant polynomial of Section 3.1.

*Proof.* (1) $\lvert\psi_0\rvert\le M_0(t+T)$, and Lemma B.2 bounds $M_0(\tau)$ by $\varepsilon\bar Pe^{\overline\lambda\tau}$ for $\tau\ge0$ and $\varepsilon\bar Pe^{\underline\lambda\tau}$ for $\tau\le0$; in both cases this is at most $\varepsilon\bar Pe^{\overline\lambda t}e^{aT}=\rho_PdX$, because $T\le0$ and $a<\underline\lambda<\overline\lambda$.

(2) Split the difference at $\psi^{(k)}(i,t+T-r)$. *Pair variation.* $\tfrac12(e^{iq\cdot(i+\ell)}+e^{iq\cdot(i-\ell)})-e^{iq\cdot i}=e^{iq\cdot i}(\cos q\cdot\ell-1)$ and $\lvert\cos q\cdot\ell-1\rvert\le(q\cdot\ell)^2/2\le r^2/800$ for $\lvert q\rvert\le1/20$; so the first part is at most $(r^2/800)M_k(t+T-r)$, and Lemma B.2 with the same two cases gives $M_k(t+T-r)\le\overline\lambda^{\,k}e^{-\underline\lambda r}\rho_PdX$. *Spread of rates.* In the mode form, $\psi^{(k)}(i,\tau-r)-\Lambda^ke^{-\Lambda r}\psi(i,\tau)$ equals the integral of $e^{iq\cdot i}\varepsilon b\sum_mh_m\,e^{\lambda_m\tau}R_m\mathbf e$ with $h_m=\lambda_m^ke^{-\lambda_mr}-\Lambda^ke^{-\Lambda r}$. Since $\Lambda$ lies in the band, $\max_mh_m^++\max_mh_m^-$ is at most the oscillation $\omega_{k,r}$ of $\lambda\mapsto\lambda^ke^{-\lambda r}$ over the band. Split $h_m=h_m^+-h_m^-$; each part has nonnegative weights $h_m^\pm e^{\lambda_m\tau}$ on positive semidefinite residues, so, exactly as in Lemma B.2, its image of $\mathbf e$ has length at most $\max_m(h_m^\pm e^{\lambda_m\tau})\lVert P(k)\rVert$. Integrating, the second part is at most $\omega_{k,r}\,\varepsilon\bar P\max(e^{\overline\lambda\tau},e^{\underline\lambda\tau})$ with $\tau=t+T$, hence at most $\omega_{k,r}\rho_PdX$. Finally $\omega_{k,r}\le(\overline\lambda-\underline\lambda)\sup_{\rm band}\lvert\tfrac{d}{d\lambda}\lambda^ke^{-\lambda r}\rvert$, $\overline\lambda-\underline\lambda=0.0161$, $\lvert\tfrac d{d\lambda}e^{-\lambda r}\rvert=re^{-\lambda r}$ and, for $k\ge1$, $\lvert\lambda^{k-1}(k-\lambda r)e^{-\lambda r}\rvert\le\overline\lambda^{\,k-1}(k+\overline\lambda r)e^{-\underline\lambda r}$.

(3) $J_k=\sigma_i\sigma_\ell\bar\psi_\ell^{(k)}(t+T-r)$, so by (2) $\lvert J_k-J^{\rm ref}_k\rvert\le\Delta p_k$, and $\lvert J^{\rm ref}_k\rvert\le p_k$ by (1) and $\Lambda\ge\underline\lambda$. The majorant $M_\ell$ bounds the sum of the absolute values of all multilinear monomials of $C_\ell$; the monomials of $C_\ell(\alpha;J)-C_\ell(\alpha;J^{\rm ref})$ are those containing at least one factor $J-J^{\rm ref}$, so their absolute sum is at most $M_\ell(\lvert\alpha\rvert;p+\Delta p)-M_\ell(\lvert\alpha\rvert;p)$, which is nondecreasing in $p$ because $M_\ell$ has nonnegative coefficients. For the reference jets, split $C_\ell$ into its parts $C^{21}_\ell$, $C^{12}_\ell$, $C^{03}_\ell$ of degree one, two and three in the jets: since $J^{\rm ref}$ carries the sign $\sigma_i\sigma_\ell$, $\sigma_\ell C^{21}_\ell$ and $\sigma_\ell C^{03}_\ell$ carry $\sigma_i$ and $\sigma_\ell C^{12}_\ell$ carries $\sigma_\ell$. Every series is absolutely convergent, because $\lvert C_\ell(\alpha;J^{\rm ref})\rvert\le M_\ell$ decays like $e^{-\Lambda r}$; summing gives the display. $\blacksquare$

### 3.1 The per-site majorant

With the norms of the derivatives of the row at rest, $\lvert\partial_R^2\Psi\rvert=6/r^4$, $\lvert\partial_R\partial_v\Psi\rvert\le2/r^3$, $\lvert\partial_v^2\Psi\rvert=2/r^2$ and $\lvert\partial_R^3\Psi\rvert=24/r^5$, $\lvert\partial_R^2\partial_v\Psi\rvert,\lvert\partial_R\partial_v^2\Psi\rvert,\lvert\partial_v^3\Psi\rvert\le6/r^4,6/r^3,6/r^2$ (Lemma H.1 at zero source speed), $\lvert T_\ell\rvert=2/r^3$, $\lvert B_\ell\rvert=1/r^2$ and $\lvert\delta_2\rvert\le p_1\bar x+\bar x^2/(2r)$, $\bar x=a+p_0$, each term of $C_\ell$ is bounded by
$$
\begin{aligned}
M_\ell(a;p)={}&\bar x\Bigl[\frac{6\bar xp_1}{r^4}+\frac{2\bar xp_2}{r^3}+\frac{2p_1^2}{r^3}+\frac{2p_1p_2}{r^2}\Bigr]
+\frac{12a^2p_0+12ap_0^2+4p_0^3}{r^5}+\frac{3a^2p_1+6ap_0p_1+3p_0^2p_1}{r^4}+\frac{3ap_1^2+3p_0p_1^2}{r^3}+\frac{p_1^3}{r^2}\\
&+\frac2{r^3}\Bigl[\tfrac12p_2\bar x^2+p_1\Bigl(p_1\bar x+\frac{\bar x^2}{2r}\Bigr)\Bigr]+\frac1{r^2}\Bigl[\tfrac12p_3\bar x^2+p_2\Bigl(p_1\bar x+\frac{\bar x^2}{2r}\Bigr)\Bigr],
\end{aligned}
$$
for $\lvert\alpha\rvert\le a$ and $\lvert P_k\rvert\le p_k$. The first bracket bounds $G_2[z_1,z_2]=\delta_1(\partial_R^2\Psi[x,P_1]-\partial_R\partial_v\Psi[x,P_2]+\partial_R\partial_v\Psi[P_1,P_1]-\partial_v^2\Psi[P_1,P_2])$; the next three fractions bound $O_3(z_1)-O_3(b_1)=\tfrac12G_3[b_1,b_1,e]+\tfrac12G_3[b_1,e,e]+\tfrac16G_3[e,e,e]$ with $e=(-P_0,P_1)$; the last line bounds the delay terms. Every monomial contains a source factor. On $299$ random rational configurations the ratio $\lvert C_\ell\rvert/M_\ell$ stays below $0.377$ (instrument, float sample).

## 4. Cubic symmetry and the norms of the lattice tensors

**Lemma O.3 (invariance and norm; derived).** (i) Each of $K_{21}$, $K_{12}$, $K_{03}$ satisfies $K[ga,gb,gc]=gK[a,b,c]$ for every signed permutation matrix $g$. (ii) Hence, with $K_{21}[a,a,w]_i=\kappa_1a_i^2w_i+2\kappa_2a_i\sum_{j\ne i}a_jw_j+\kappa_4w_i\sum_{j\ne i}a_j^2$, $K_{12}[a,w,w]_i=\kappa_1'a_iw_i^2+\kappa_A'a_i\sum_{j\ne i}w_j^2+2\kappa_B'w_i\sum_{j\ne i}a_jw_j$ and $K_{03}[w^3]_i=\kappa_1''w_i^3+\kappa''w_i\sum_{j\ne i}w_j^2$,
$$
\lVert K_{21}\rVert\le\nu(\kappa_1,\kappa_2)+\lvert\kappa_4-\kappa_2\rvert,\qquad\lVert K_{12}\rVert\le\nu(\kappa_1',\kappa_B')+\lvert\kappa_A'-\kappa_B'\rvert,\qquad\lVert K_{03}\rVert\le\nu(\kappa_1'',\kappa''/3),
$$
where $\nu(k_1,k_2)=\max\{\lvert k_1\rvert,\lvert k_1+6k_2\rvert/3\}$ and the norms are those of the maps $(a,w)\mapsto K[a,a,w]$, $(a,w)\mapsto K[a,w,w]$, $w\mapsto K[w^3]$ on unit vectors.

*Proof.* (i) Every ingredient of $C_\ell$ is built from the vector $\ell$, its length, inner products and the vectors $\alpha$, $P_k$, and $\Psi(gR,gv)=g\Psi(R,v)$; so $C_{g\ell}(ga;gJ)=gC_\ell(a;J)$. The reference jets depend on $\ell$ only through $r$, and $\sigma_{g\ell}=\sigma_\ell$ because a signed permutation changes the coordinate sum by an even number. Reindexing the absolutely convergent sums by $\ell\mapsto g\ell$ gives the invariance. (ii) A reflection of one axis shows that every component with an index occurring an odd number of times vanishes, and permutation invariance leaves, for a tensor $K_{ijkl}$ (output $i$), the four patterns $iiii$, $iijj$, $ijij$, $ijji$. For $K_{21}$ the two $\alpha$ slots are symmetric, which identifies $iijj$ with $ijij$ ($\kappa_2$); for $K_{12}$ the two $w$ slots are symmetric, which identifies $ijij$ with $ijji$ ($\kappa_B'$); $K_{03}$ is symmetric in its three slots and has two components. Let $S$ be the symmetric four-form with $S_{iiii}=k_1$ and $S_{iijj}=k_2$ ($i\ne j$, all orderings). Direct expansion gives $S[a,a,w,u]=\sum_iu_i[k_1a_i^2w_i+2k_2a_i\sum_{j\ne i}a_jw_j+k_2w_i(\lvert a\rvert^2-a_i^2)]$, so
$$
K_{21}[a,a,w]\cdot u=S[a,a,w,u]+(\kappa_4-\kappa_2)\sum_iu_iw_i(\lvert a\rvert^2-a_i^2)\qquad(k_1=\kappa_1,\ k_2=\kappa_2),
$$
and likewise $K_{12}[a,w,w]\cdot u=S[a,w,w,u]+(\kappa_A'-\kappa_B')\sum_iu_ia_i(\lvert w\rvert^2-w_i^2)$ with $(k_1,k_2)=(\kappa_1',\kappa_B')$, and $K_{03}[w^3]\cdot u=S[w,w,w,u]$ with $(k_1,k_2)=(\kappa_1'',\kappa''/3)$. The extra sums are at most $\lvert a\rvert^2\lvert w\rvert\lvert u\rvert$ and $\lvert a\rvert\lvert w\rvert^2\lvert u\rvert$, because $\lvert a\rvert^2-a_i^2\in[0,\lvert a\rvert^2]$. The norm of a symmetric form on a Euclidean space is attained on a repeated unit vector, where $S[x,x,x,x]=k_1s+3k_2(1-s)$ with $s=\sum_ix_i^4\in[1/3,1]$; this is linear in $s$, so its largest modulus is $\max\{\lvert k_1\rvert,\lvert k_1+6k_2\rvert/3\}$, at an axis or at a body diagonal. $\blacksquare$

**Proposition O.4 (the constants; derived, numbers by exact shell sums with interval exponentials).** The components are enclosed as

| tensor | component | enclosure |
| --- | --- | --- |
| $K_{21}$ | $\kappa_1$ | $[10.925662,\ 10.925786]$ |
| | $\kappa_2$ | $[-3.694672,\ -3.694610]$ |
| | $\kappa_4$ | $[-3.694703,\ -3.694579]$ |
| $K_{12}$ | $\kappa_1'$ | $[1.982954,\ 1.983078]$ |
| | $\kappa_A'$ | $[-0.566395,\ -0.566271]$ |
| | $\kappa_B'$ | $[-0.566364,\ -0.566302]$ |
| $K_{03}$ | $\kappa_1''$ | $[0.096011,\ 0.096134]$ |
| | $\kappa''$ | $[-0.056470,\ -0.056224]$ |

and, by Lemma O.3, $\lVert K_{21}\rVert\le N_{21}:=10.9259$, $\lVert K_{12}\rVert\le N_{12}:=1.9832$ and $\lVert K_{03}\rVert\le N_{03}:=0.0962$.

*Proof.* At a site with $N=r^2$, every quantity in $C_\ell$ is a rational function of the integer coordinates and of $u=1/\sqrt N$, and reduces to the form $p+q\,u$ with rational $p,q$; the instrument evaluates $C_\ell$ for the jets $(t\Lambda^kw)_k$, $t\in\{1,-1,2\}$, separates the parts of degree one, two and three in $t$ exactly, and adds them over each shell, with the sign $\sigma_\ell$ for the degree-two part. The components follow from six evaluations: $\kappa_1$ from $(a,w)=(e_1,e_1)$; $\kappa_4$ and $\kappa_A'$ from $(e_1,e_2)$; $\kappa_2$ from the polarization $\tfrac14(K_{21}[e_1+e_2,e_1+e_2,e_2]-K_{21}[e_1-e_2,e_1-e_2,e_2])_1$; $\kappa_B'$ from $\tfrac14(K_{12}[e_1,e_1+e_2,e_1+e_2]-K_{12}[e_1,e_1-e_2,e_1-e_2])_2$; $\kappa''$ from $K_{03}[(e_1+e_2)^3]_1-\kappa_1''$. Each shell sum is then multiplied by $e^{-j\Lambda\sqrt N}$ ($j$ the degree) and evaluated with `mpmath.iv` at $50$ digits over the cube $\max_i\lvert\ell_i\rvert\le5$. The sites outside the cube with largest coordinate $m\ge6$ number $24m^2+2$, have $r\ge m$, and each contributes at most the majorant $M_\ell(\sqrt2;(\Lambda^ke^{-\Lambda m}\sqrt2)_k)$, which decreases in $r$; summed over $6\le m\le400$ with interval arithmetic, this bounds the tail of every raw evaluation by $T_{\rm tail}=6.13\times10^{-5}$. Beyond $m=400$: expanding the majorant, each exterior shell term is a positive combination of $(24m^2+2)m^{-p}e^{-j\Lambda m}$ with $p\ge2$, $j\ge1$, so each term is at most $e^{-\Lambda}$ times its predecessor and the remainder of the series is below $10^{-480}$. The components are extracted from raw evaluations with allowances $T_{\rm tail}/2$ for $\kappa_2$ and $\kappa_B'$ (polarizations, a difference of two evaluations divided by four), $2T_{\rm tail}$ for $\kappa''$ (a difference of two evaluations) and $T_{\rm tail}$ for the others, all included in the enclosures. The norm bounds are the formulas of Lemma O.3 maximized over the enclosure boxes and rounded up. $\blacksquare$

The exact shell sums confirm two consequences of invariance that the instrument checks as a known case: the components $K_{21}[e_1,e_1,e_1]_{2,3}$ and $K_{21}[e_1,e_1,e_2]_{1,3}$ vanish shell by shell, exactly. The enclosures of $\kappa_4-\kappa_2$ and $\kappa_A'-\kappa_B'$ contain zero, so any asymmetric part is unresolved at the width of the enclosures; it is not proved to vanish, and Lemma O.3's bounds include it through the terms $\lvert\kappa_4-\kappa_2\rvert$ and $\lvert\kappa_A'-\kappa_B'\rvert$. For the pure mode with the receiver displaced along the source vector, $K_{21}[w,w,w]$ has length $\kappa_1\approx10.93$ on an axis and $\lvert\kappa_1+4\kappa_2+2\kappa_4\rvert/3\approx3.747$ on a body diagonal, and nearly vanishes on a face diagonal.

**The summed signed cubic.** Combining Lemma O.2 with Proposition O.4 and Lemma O.2(1),
$$
\Bigl\lvert\sum_{\ell\ne0}\sigma_\ell C_\ell(\alpha;J)\Bigr\rvert\le X^3\bigl[N_{21}\rho_PA^2d+N_{12}\rho_P^2Ad^2+N_{03}\rho_P^3d^3\bigr]+\lvert\mathrm{Dev}\rvert .
$$
The deviation sum and the fourth-order remainders $\tfrac12\sum_\ell\sigma_\ell\mathcal R_\ell$ are bounded in the companion note.

## 5. What the signed cubic changes

In the accepted bound the cubic part of a single offset's odd remainder is controlled by the triangle inequality over about a dozen groups of terms, each with an absolute third- or second-derivative constant, and these bounds are then added over all offsets. Here the cubic is one polynomial per offset, and the offsets are added with their signs. Two effects can contribute: cancellation within one offset, between the static third derivative, the velocity terms and the delay terms of $C_\ell$, for a source seen at the earlier time $T-r$ and moving at the growth rate; and cancellation between offsets. A floating exploration before the instrument (not evidence) found, for the pure mode with the receiver displaced along an axis parallel to the source vector, $\sum_\ell\lvert C_\ell\rvert\approx14.1$ per unit receiver and source amplitude against $\lvert\sum_\ell\sigma_\ell C_\ell\rvert\approx13.0$, so in that configuration most of the gain is the first effect.

For orientation, at the accepted endpoint $(d,y)=(0.047,0.011045)$, $A=0.058045$, the main term gives $C_Lg\rho_P[N_{21}A^2d+N_{12}\rho_PAd^2+N_{03}\rho_P^2d^3]\approx0.0011461$, against $0.006115$ for half the accepted odd bound at the same point. This compares a main term with a complete bound and is not yet a bound on the odd sum; the companion note adds the deviations and the remainders and shows that they are small at this order.

## 6. Instrument, evidence and falsifiers

[`odd_cubic.py`](../evidence/saturday-lattice-odd-remainder-2026-10-21/odd_cubic.py), described in the [evidence README](../evidence/saturday-lattice-odd-remainder-2026-10-21/README.md), computes $C_\ell$ exactly in $\mathbb Q(1/\sqrt N)$, the shell sums, the interval exponentials and the tail bound. It imports the accepted `band_barrier.py` unchanged, only for its interval helpers. Known cases KC1–KC4 run before the shell sums: (KC1) the exact cubic against the 50-digit direct evaluation of the odd part of the true row for prescribed exponential source histories, an independent reference that solves the causal root numerically and does not use the formula; (KC2) the lattice census against $r_3(n)$; (KC3) the majorant against the exact cubic on 299 random rational configurations; (KC4) the symmetric-form norm against a sampled supremum for a hand tensor. KC5, the exact vanishing of the odd-index components shell by shell, checks the accumulated shell sums before their interval evaluation. After the targets it compares the reduced form of Lemma O.3 with a direct floating sum at one rational direction (relative difference $7.3\times10^{-7}$, the size of the truncation of that sum). What the instrument establishes: exact evaluation of the stated sums and enclosures. It does not establish Lemmas O.1–O.3, which are hand derivations; KC1, KC3 and KC4 are samples.

Falsifiers:

- Lemma O.1: a configuration in the tube at which $\lim_{s\to0}\mathcal O_\ell(s\alpha,s\bar\Phi)/(2s^3)$ differs from $C_\ell(\alpha;J)$.
- Lemma O.2: a seed of the class and a time at which the jet deviation exceeds $\epsilon_k(r)\rho_PdX$, or $\lvert\psi_0\rvert>\rho_PdX$; a non-positive-semidefinite residue on the support.
- Lemma O.3: a signed permutation under which a lattice tensor is not covariant; a unit vector at which a symmetric form exceeds $\nu(k_1,k_2)$.
- Proposition O.4: a correct enclosure of a component outside the stated interval, or a tail larger than $6.13\times10^{-5}$.
- The majorant of Section 3.1: an offset, $\alpha$ and $J$ with $\lvert C_\ell(\alpha;J)\rvert>M_\ell(\lvert\alpha\rvert;(\lvert P_k\rvert)_k)$.

Limits: the lemmas concern the cubic term and the pure-mode reduction; by themselves they bound no barrier quantity. The reference rate $\Lambda=2.7952$ is one choice inside the band, and the stated deviation bounds hold for any choice there. Every limit of the accepted notes is inherited, including the interval-library conditionality of the declared constants.
