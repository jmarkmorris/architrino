# Numbers for the localized lattice family at $g=16$: thresholds, a guaranteed interval and a growth bound (2026-10-11)

## Result

**In words.** The [preparation note](saturday-localized-nonlinear-preparation-2026-10-10.md) and the [forward-evolution note](saturday-localized-forward-evolution-2026-10-11.md) proved that a localized disturbance of the alternating lattice exists on its whole past and continues uniquely for a time of order $\ln(1/\varepsilon)$, but every threshold in them was a constant that "exists". This note replaces those constants by numbers for one explicitly specified contour and one explicitly specified class of seeds, and proves each number is a valid bound.

1. **The nonlinear constants are evaluated (derived; numbers by outward-rounded evaluation).** The second derivatives of a row are bounded explicitly (Lemma Q1), the field of the resting lattice at a displaced member is bounded to third order (Lemma Q2), and from these the product constant and the Lipschitz constant of the nonlinear remainder are $C_N\le1193.6$ and $C_N'\le1466.2$ for every contour the preparation note allows, and $C_N\le849.2$, $C_N'\le1023.8$ for the contour chosen here (Propositions Q3, Q4).
2. **The radii are numbers (derived).** With those constants the forward note's Lemma 2 holds with seed threshold $\delta_0=7.4\times10^{-4}$ and uniqueness radius $\varrho_0=1.8\times10^{-4}$ for the chosen contour ($4.7\times10^{-4}$ and $1.1\times10^{-4}$ for every allowed contour), and the second-order correction is at most $69.7$ times the square of the seed's norm. These are sufficient choices: the five inequalities the proof needs were verified for them in exact arithmetic (Corollary Q5). They are not shown to be the largest possible.
3. **A contour, a neighbourhood and a seed class with proved margins (derived).** For the circle of radius $1/10$ about the staggered rate, the mode matrix is invertible on the whole circle for every wavevector within $3/20$ of the staggered wavevector, with smallest singular value at least $1.0892-31.854\,\lvert k-Q\rvert^2$. This is an analytic bound on the whole circle and the whole ball; no wavevector or contour point is sampled. For every real, even, nonnegative bump of unit normalised mass supported within $1/20$ of the staggered wavevector, the seed's norm is at most $\bar\Lambda_0=0.1144$ (Proposition Q6).
4. **A guaranteed interval (derived).** For that seed class and every amplitude $\varepsilon\le6.46\times10^{-3}$ the constructed history exists, and it continues, with all margins of the preparation theorem and equal to the linear seed plus a bounded second-order correction, at least to the time $T_*(\varepsilon)=\ln(7.4\times10^{-4}/(0.1144\,\varepsilon))/2.8953$. For $\varepsilon=10^{-4}$ this is $T_*\ge1.440$; for $\varepsilon=10^{-6}$ it is $T_*\ge3.030$ (Theorem Q7). This is a guaranteed interval, not a survival time.
5. **A lower and an upper bound on growth over that interval, for a stated range of amplitudes (derived).** The three growth rates inside the contour are real for every wavevector in the ball, with positive semidefinite residues. The central member of the linear seed therefore grows at least like $p_0e^{aT}$ with $p_0\ge0.0763$, a positive contribution for every amplitude. The bound on the full solution subtracts the fixed correction allowance $E=69.7\,\delta_0^2\le3.82\times10^{-5}$: the central displacement at $T_*$ is at least $\varepsilon\,p_0\,(\delta_0/(\varepsilon\bar\Lambda_0))^{0.9308}-E$. This is positive for $10^{-17}\le\varepsilon\le6.46\times10^{-3}$ and is not positive for much smaller amplitudes, where it says nothing. For $\varepsilon=10^{-4}$ the central displacement at $T_*$ is at least $3.31\times10^{-4}$, while no displacement anywhere exceeded $1.145\times10^{-5}$ at time zero: a guaranteed growth by a factor of at least $28.9$. At $T_*$ no displacement exceeds $7.79\times10^{-4}$ (Proposition Q8).
6. **What is not obtained.** The interval ends while the disturbance is still below a thousandth of a lattice spacing. Nothing here follows the family to displacements of order one, decides how regular evolution ends, or shows that a member reaches wake speed. The full lower bound of item 5 tends to $-E$ as $\varepsilon\to0$, so no growth is established for arbitrarily small amplitudes and no amplitude independent of $\varepsilon$ is reached. The constants are not sharp.

| Quantity | Meaning | Every allowed contour, $a\in[2.65,3]$ | Contour of radius $1/10$ |
| --- | --- | ---: | ---: |
| $c_{20},c_{11},c_{02}$ | second derivatives of a row, in units of $\lvert R\rvert^{-4},\lvert R\rvert^{-3},\lvert R\rvert^{-2}$ | $9.0336,\ 4.5991,\ 3.7288$ | same |
| $C_N$ | product bound of the remainder | $\le1193.6$ | $\le849.2$ |
| $C_N'$ | Lipschitz bound of the remainder | $\le1466.2$ | $\le1023.8$ |
| $C_L$ | norm of the linear inverse | $\le0.04452$ | $\le0.04099$ |
| $2C_LC_N$ | coefficient of the second-order correction | $\le106.3$ | $\le69.7$ |
| $\varrho_0$ | uniqueness radius (declared) | $1.1\times10^{-4}$ | $1.8\times10^{-4}$ |
| $\delta_0$ | seed-norm threshold (declared) | $4.7\times10^{-4}$ | $7.4\times10^{-4}$ |
| $m_F$ | smallest singular value of $F$ on the contour, seed support | | $\ge1.0095$ |
| $\bar\Lambda_0$ | seed norm, unit-mass bump | | $\le0.1144$ |
| $\varepsilon_0$ | largest amplitude covered, at most $\delta_0/\bar\Lambda_0$ | | $6.46\times10^{-3}$ |
| $p_0$ | lower bound of the residue form on the seed support | | $\ge0.0763$ |

**Declared values.** Every decimal displayed in this note is a *declared* bound: a short decimal rounded in the safe direction, upward for upper bounds and downward for lower bounds. Each displayed step, a product, sum or quotient of declared values, holds literally with the displayed inputs; this was checked in exact rational arithmetic by a separate witness instrument, described in [Section 11](#11-instruments-evidence-and-the-reference-boundary). Where a displayed line writes "$=$" between a formula and a decimal, the next line states the declared bound that is used.

**Claim grade.** Every statement is a hand derivation written in one session; the [Codex review](saturday-localized-forward-quantification-codex-review-2026-10-11.md) reconstructs the mechanisms separately and requested six corrections (QF1 to QF6), incorporated here. The decimal values rest on two session instruments with no independent review: one evaluates the transcendental functions and lattice sums by interval arithmetic, with every infinite tail bounded analytically; the other rounds its endpoints outward and carries the rest of the arithmetic exactly. Both rely on the interval arithmetic of the library named in Section 11. Nothing is measured on solutions: no history, correction or evolution is computed.

Everything is for the unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, the full alternating population with every member dynamical, every causal root retained, the original eight-source block summation, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$. A run started at a finite time from the linear seed, a fixed exterior, a finite population or a copied coherent trajectory is a different preparation and is not what is quantified.

## 1. Setting, sources and reading limits

This is task 1 of the [quantitative round](../../../../op/agent-chats/2026-10-11-saturday-quantitative-followups/chat.md). Read in full on 2026-10-11 for this task: the accepted preparation note and its [Codex review](saturday-localized-nonlinear-preparation-codex-review-2026-10-10.md); the accepted forward-evolution note and its [Codex review](saturday-localized-forward-evolution-codex-review-2026-10-11.md). Their corrected-byte dispositions are taken as governing. Of the [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), the per-hit acceleration, total acceleration and conventions-and-exclusions passages of the canonical-form section were reread on 2026-10-11 at about 22:26Z, before the corrected version of this note was returned (the direction-and-sign and normalisation passages were read at 19:56Z the same day and not again); the per-hit law there is $\kappa\,\sigma_{ij}\lvert q_iq_j\rvert\,r_{ij}^{-2}\,(c_f/\lvert D_t\rvert)\,\hat{\mathbf r}_{ij}$ with $\hat{\mathbf r}_{ij}$ from the emission point to the receiver and $D_t=c_f-\mathbf V_j\cdot\hat{\mathbf r}_{ij}$, which with $c_f=1$, $\kappa\lvert q_iq_j\rvert=g$ and $D_t>0$ is the row used here, $g\,\sigma_d\,\Psi(R,v)$, $\Psi(R,v)=R/(\lvert R\rvert^2(\lvert R\rvert-R\cdot v))$, as in both notes. Taken from the lane without rederivation: the vanishing of the resting block sum at an anchor (manuscript Section 1.1, as cited by the preparation note) and the vanishing of the block sum of the receiver-linear rows (preparation note). Not read: the general-wavevector note, the rest of the manuscript, the lattice queue, the coherent-branch certificate. The shared queue was not edited.

**Notation.** That of the two notes: $\rho_0=1/16$; $a$ the left edge of the contour, $2.65\le a<3$; $\lVert\cdot\rVert_a$, $\lVert\cdot\rVert_a^{(0)}$ the history norms with and without spatial weight; $\omega_d\le e^{r/4}$; $S_p(x)=\sum_{d\ne0}e^{-xr}/r^p$ for any real $p$; $Z_p=\sum_{d\ne0}r^{-p}$; $\mathcal N$, $\mathcal R_d$, $E$, $f_d$, $T_d$, $B_d$, $\mathcal K$, $\mathcal J$, $F$, $M$, $h$, $\lambda_g$, $\Gamma$, $\lambda_+$, $Q$ as defined there. Throughout, $\kappa=7/8$ and $\eta=e^{a/8}$.

**Two sets of numbers.** Formulas are stated for a general rate $a$. They are evaluated twice: uniformly for $a\in[2.65,3]$, which covers every contour the preparation note admits, with the lattice sums bounded by that note's hand majorant; and for the one contour of Section 7, for which $a\in[2.6952,2.6953]$, with the lattice sums enclosed directly. Only the second set is used in Sections 8 and 9.

## 2. Second derivatives of a row

**Lemma Q1 (derived).** For $R\ne0$ and $\lvert v\rvert\le\varpi<1$ write $\rho=\lvert R\rvert$, $n=R/\rho$, $D=1-n\cdot v$. As bilinear maps with the Euclidean norm,

$$
\lvert\partial_R^2\Psi\rvert\le\frac{1}{\rho^4}\Bigl[\frac{2+2\mathsf m+2\mathsf m^2}{D}+\frac1{D^2}\Bigr],\qquad
\lvert\partial_R\partial_v\Psi\rvert\le\frac{1+2\mathsf m}{\rho^3D^2},\qquad
\lvert\partial_v^2\Psi\rvert=\frac{2}{\rho^2D^3},
$$

with $\mathsf m=\lvert n-v\rvert/D\le1/\sqrt{1-\varpi^2}$ and $D\ge1-\varpi$. For $\varpi=3/16$ this gives $\lvert\partial_R^2\Psi\rvert\le c_{20}/\rho^4$, $\lvert\partial_R\partial_v\Psi\rvert\le c_{11}/\rho^3$, $\lvert\partial_v^2\Psi\rvert\le c_{02}/\rho^2$ with

$$
c_{20}:=9.0336,\qquad c_{11}:=4.5991,\qquad c_{02}:=3.7288 .
$$

These are declared values: with $D\ge13/16$ and $\mathsf m\le16/\sqrt{247}\le1.01806$, the three right sides are at most $(2+2\mathsf m+2\mathsf m^2)\tfrac{16}{13}+(\tfrac{16}{13})^2$, $(1+2\mathsf m)(\tfrac{16}{13})^2$ and $2(\tfrac{16}{13})^3$, which with $\mathsf m=1.01806$ are $9.03357\ldots$, $4.59909\ldots$ and $3.72872\ldots$.

*Proof.* Write $\Psi=G_2(R)\,B$ with $G_2(R)=R/\rho^2$ and $B=(\rho-R\cdot v)^{-1}=1/(\rho D)$. For unit vectors $h,k$ write $h_n=n\cdot h$, and $P=I-nn^{\mathsf T}$.

*The factor $G_2$.* $\lvert G_2\rvert=1/\rho$. $\partial G_2[h]=(h-2n\,h_n)/\rho^2$, a reflection of $h$ divided by $\rho^2$, so $\lvert\partial G_2\rvert=1/\rho^2$. Differentiating again, $\partial^2G_2[h,k]=-(2/\rho^3)\,\mathsf T$ with $\mathsf T=h\,k_n+k\,h_n+n\,(h\cdot k)-4n\,h_nk_n$. Splitting $h=h_nn+h_\perp$, $k=k_nn+k_\perp$ gives $\mathsf T=n\,(h_\perp\cdot k_\perp-h_nk_n)+h_\perp k_n+k_\perp h_n$, and $\lvert\mathsf T\rvert^2=(h_\perp\cdot k_\perp)^2+h_n^2k_n^2+\lvert h_\perp\rvert^2k_n^2+\lvert k_\perp\rvert^2h_n^2\le(\lvert h_\perp\rvert^2+h_n^2)(\lvert k_\perp\rvert^2+k_n^2)=1$, the cross terms cancelling. So $\lvert\partial^2G_2\rvert\le2/\rho^3$.

*The factor $B$.* $\partial_RB[h]=-h\cdot(n-v)\,B^2$, so $\lvert\partial_RB\rvert\le\lvert n-v\rvert/(\rho^2D^2)$. $\partial_R^2B[h,k]=-(h\cdot Pk/\rho)\,B^2+2\,(h\cdot(n-v))(k\cdot(n-v))\,B^3$, so $\lvert\partial_R^2B\rvert\le1/(\rho^3D^2)+2\lvert n-v\rvert^2/(\rho^3D^3)$.

*Assembly.* $\partial_R^2\Psi[h,k]=\partial^2G_2[h,k]\,B+\partial G_2[h]\,\partial_RB[k]+\partial G_2[k]\,\partial_RB[h]+G_2\,\partial_R^2B[h,k]$, and the four bounds give $\rho^4\lvert\partial_R^2\Psi\rvert\le2/D+2\lvert n-v\rvert/D^2+1/D^2+2\lvert n-v\rvert^2/D^3$, which is the first display. For the mixed derivative, $\partial_v\Psi[k]=G_2\,(R\cdot k)\,B^2$, and $\partial_R$ of it along $h$ is $[\partial G_2[h]\,(R\cdot k)+G_2\,(h\cdot k)]\,B^2+2\,G_2\,(R\cdot k)\,B\,\partial_RB[h]$. The bracket equals $[n\,(h_\perp\cdot k_\perp)+h_\perp k_n]/\rho$, of length at most $1/\rho$; the last term is at most $2\lvert n-v\rvert/(\rho^3D^3)$. For the last derivative, $\partial_v^2\Psi[h,k]=2\,G_2\,(R\cdot h)(R\cdot k)\,B^3$, of norm exactly $2/(\rho^2D^3)$.

*The ratio $\mathsf m$.* $\lvert n-v\rvert^2=2D-1+\lvert v\rvert^2$, so $\mathsf m^2=(2D-1+\lvert v\rvert^2)/D^2$, which as a function of $D$ is largest at $D=1-\lvert v\rvert^2$, where it equals $1/(1-\lvert v\rvert^2)$. $\qquad\blacksquare$

At rest ($v=0$) the first bound is $7/\rho^4$ against the exact value $6/\rho^4$. The first-derivative bounds of the forward note are not changed; in the same notation they are $\lvert\partial_v\Psi\rvert=1/(\rho^2D^2)$ and $\lvert\partial_R\Psi\rvert\le(2D+\lvert v\rvert)/(\rho^3D^2)$.

## 3. The resting field at a displaced member, to third order

**Lemma Q2 (derived).** For $\lvert\alpha\rvert\le\rho_0=1/16$,

$$
\lvert E(\alpha)\rvert\le4\,\bigl(\tfrac{16}{15}\bigr)^5Z_5\,\lvert\alpha\rvert^3,\qquad
\lvert\nabla E(\alpha)\rvert\le12\,\bigl(\tfrac{16}{15}\bigr)^5Z_5\,\lvert\alpha\rvert^2,\qquad Z_5\le10.3824 .
$$

Consequently $\lvert E(\alpha)\rvert\le c_E\lvert\alpha\rvert^2$ with $c_E=4(16/15)^5Z_5\rho_0\le3.5842$, and $\lvert E(\alpha_1)-E(\alpha_2)\rvert\le c_E'(\lvert\alpha_1\rvert+\lvert\alpha_2\rvert)\lvert\alpha_1-\alpha_2\rvert$ with $c_E'=6(16/15)^5Z_5\rho_0\le5.3762$.

*Proof.* $E(\alpha)=\sum_{d\ne0}\sigma_df_d(\alpha)$ with $f_d(\alpha)=G(d+\alpha)-G(d)-\nabla G(d)\alpha$, $G(x)=x/\lvert x\rvert^3=-\nabla(1/\lvert x\rvert)$, the sum converging absolutely. The second-order terms $\tfrac12\sigma_d\,\partial^2G(d)[\alpha,\alpha]$ are of size $3\lvert\alpha\rvert^2/r^4$ and sum absolutely; $\partial^2G$ is odd in $d$ and $\sigma_{-d}=\sigma_d$, so their sum is zero. Hence $E(\alpha)=\sum_d\sigma_d\,[f_d(\alpha)-\tfrac12\partial^2G(d)[\alpha,\alpha]]$, and by Taylor's formula each bracket is at most $\tfrac16\sup\lvert\partial^3G\rvert\,\lvert\alpha\rvert^3$ over the segment from $d$ to $d+\alpha$. $\partial^3G$ is minus the fourth derivative of $1/\lvert x\rvert$, a symmetric form whose norm is $4!/\lvert x\rvert^5$ (its value on a repeated unit vector is $24$ times a Legendre polynomial of the cosine, divided by $\lvert x\rvert^5$, and the norm of a symmetric form on a Euclidean space is attained on repeated vectors). On the segment $\lvert x\rvert\ge r-\tfrac1{16}\ge\tfrac{15}{16}r$. This gives the first bound. The same argument for the derivative, $\nabla f_d(\alpha)-\partial^2G(d)[\alpha,\cdot]$, with remainder $\tfrac12\sup\lvert\partial^3G\rvert\lvert\alpha\rvert^2$, gives the second. For the difference, integrate $\nabla E$ along the segment from $\alpha_2$ to $\alpha_1$ and use $\int_0^1\lvert\alpha_\theta\rvert^2d\theta\le\tfrac13(\lvert\alpha_1\rvert^2+\lvert\alpha_1\rvert\lvert\alpha_2\rvert+\lvert\alpha_2\rvert^2)\le\tfrac12\rho_0(\lvert\alpha_1\rvert+\lvert\alpha_2\rvert)$. The bound for $Z_5$: the sum over the cube of half-width $40$ is enclosed by interval arithmetic, and the sites of largest coordinate $m>40$ number $24m^2+2$ at distance at least $m$, so they add at most $\int_{40}^\infty(24m^{-3}+2m^{-5})\,dm=12/40^2+1/(2\cdot40^4)=0.0075001953125\le0.00751$; the cube sum's upper endpoint plus this tail is at most $10.3824$. $\qquad\blacksquare$

The preparation note bounded $E$ to second order only, with a constant proportional to $Z_4$. With the proved $Z_4\le52$ that constant would be $3Z_4(8/7)^4\approx266$; the third-order bound replaces it by $3.58$. The preparation note observed that $E$ is of third order by inversion symmetry and measured its size on three directions; Lemma Q2 gives a proved constant, which is larger than the measured ratios (at most $14.4$) because it sums absolute values.

## 4. The product bound

**Proposition Q3 (the constant of the preparation note's Lemma 2(a); derived).** Let $2.65\le a\le3$ and let the weight be at least $1$ with $w_i\le w_{i-d}\omega_d$, $\omega_d\le e^{r/4}$. For every history with $\lVert u\rVert_a^{(0)}\le\rho_0$ and $\lVert u\rVert_a<\infty$,

$$
\lVert\mathcal N[u]\rVert_{0,2a}\le C_N\,\lVert u\rVert_a^{(0)}\lVert u\rVert_a,\qquad C_N=g\,(c_E+C_{\rm src}),
$$

$$
C_{\rm src}=\eta\Bigl\{\frac{c_{20}}{\kappa^4}S_4(x_1)+\Bigl(\frac{a\,c_{11}}{\kappa^3}+2a\Bigr)S_3(x_1)+a^2S_2(x_1)
+\eta\Bigl[\frac{c_{20}}{2\kappa^4}S_4(x_2)+\Bigl(\frac{a\,c_{11}}{\kappa^3}+2a\Bigr)S_3(x_2)+\Bigl(\frac{a^2c_{02}}{2\kappa^2}+a^2\Bigr)S_2(x_2)\Bigr]\Bigr\},
$$

with $x_1=a-\tfrac14$, $x_2=2a-\tfrac14$. The weighted norm on the right need not be small.

*Proof.* The decomposition is the preparation note's: with $\alpha=u_i(T)$, $y=u_{i-d}$, $s=T-\tau$, $p=y(s)$, $v=y'(s)$,

$$
\mathcal R_d=\bigl[H(\alpha,p,v)-T_dp-B_dv\bigr]+T_d\bigl[y(s)-y(T-r)\bigr]+B_d\bigl[y'(s)-y'(T-r)\bigr],\qquad H(\alpha,p,v)=\Psi(d+\alpha-p,v)-\Psi(d+\alpha,0).
$$

*First bracket.* $H(\alpha,p,v)=\int_0^1[\partial_pH(\alpha,\theta p,\theta v)\,p+\partial_vH(\alpha,\theta p,\theta v)\,v]\,d\theta$, with $\partial_pH=-\partial_R\Psi(d+\alpha-\theta p,\theta v)$, $\partial_vH=\partial_v\Psi(d+\alpha-\theta p,\theta v)$, and $T_d=-\partial_R\Psi(d,0)$, $B_d=\partial_v\Psi(d,0)$. On the straight segment from $(d,0)$ to $(d+\alpha-\theta p,\theta v)$ every range is at least $r-\lvert\alpha\rvert-\lvert p\rvert\ge\kappa r$ and every velocity argument is at most $3/16$, so by Lemma Q1 and the mean value theorem $\lvert\partial_R\Psi(d+\alpha-\theta p,\theta v)-\partial_R\Psi(d,0)\rvert\le c_{20}(\lvert\alpha\rvert+\theta\lvert p\rvert)/(\kappa r)^4+c_{11}\theta\lvert v\rvert/(\kappa r)^3$ and $\lvert\partial_v\Psi(d+\alpha-\theta p,\theta v)-\partial_v\Psi(d,0)\rvert\le c_{11}(\lvert\alpha\rvert+\theta\lvert p\rvert)/(\kappa r)^3+c_{02}\theta\lvert v\rvert/(\kappa r)^2$. Integrating over $\theta$,

$$
\bigl\lvert H-T_dp-B_dv\bigr\rvert\le\frac{c_{20}}{(\kappa r)^4}\bigl(\lvert\alpha\rvert+\tfrac12\lvert p\rvert\bigr)\lvert p\rvert+\frac{c_{11}}{(\kappa r)^3}\bigl(\lvert\alpha\rvert+\lvert p\rvert\bigr)\lvert v\rvert+\frac{c_{02}}{2(\kappa r)^2}\lvert v\rvert^2 .
$$

*Delay brackets.* $\lvert\tau-r\rvert\le\lvert\alpha\rvert+\lvert p\rvert$, $\lvert T_d\rvert=2/r^3$, $\lvert B_d\rvert=1/r^2$, so the two brackets are at most $(2/r^3)\sup\lvert y'\rvert(\lvert\alpha\rvert+\lvert p\rvert)$ and $(1/r^2)\sup\lvert y''\rvert(\lvert\alpha\rvert+\lvert p\rvert)$, the suprema over times between $s$ and $T-r$, which lie within $1/8$ of $T-r$.

*History bounds.* Put $A_0=\lVert u\rVert_a^{(0)}$, $A_w=\lVert u\rVert_a$, $X=e^{aT}\le1$ and $\mathsf s=\eta e^{-ar}$. The receiver obeys $\lvert\alpha\rvert\le A_0X$ and $\lvert\alpha\rvert\le A_wX/w_i$. At every time within $1/8$ of $T-r$ the source obeys $\lvert y\rvert\le A_0X\mathsf s$ and $\lvert y\rvert\le A_wX\mathsf s\,\omega_d/w_i$, with factors $a$, $a^2$ for $y'$, $y''$. In each product bound one factor with its weight and the other without, the weighted one being a source factor. The nine products give, after division by $A_0A_wX^2/w_i$:

$$
\frac{w_i\lvert\mathcal R_d\rvert}{A_0A_wX^2}\le\omega_d\,\mathsf s\Bigl\{\frac{c_{20}}{(\kappa r)^4}+\frac{a\,c_{11}}{(\kappa r)^3}+\frac{2a}{r^3}+\frac{a^2}{r^2}+\mathsf s\Bigl[\frac{c_{20}}{2(\kappa r)^4}+\frac{a\,c_{11}}{(\kappa r)^3}+\frac{a^2c_{02}}{2(\kappa r)^2}+\frac{2a}{r^3}+\frac{a^2}{r^2}\Bigr]\Bigr\}.
$$

The four terms outside the bracket are $\lvert\alpha\rvert\lvert p\rvert$, $\lvert\alpha\rvert\lvert v\rvert$ and the two delay terms with $\lvert\alpha\rvert$; the five inside it are $\tfrac12\lvert p\rvert^2$, $\lvert p\rvert\lvert v\rvert$, $\tfrac12\lvert v\rvert^2$ and the two delay terms with $\lvert p\rvert$. Each of the nine has a source factor, which carries the weight. Summing over $d$ with $\omega_de^{-ar}\le e^{-x_1r}$ and $\omega_de^{-2ar}\le e^{-x_2r}$ gives $C_{\rm src}$. The receiver term is $w_ie^{-2aT}\lvert E(u_i)\rvert\le c_E\,w_ie^{-2aT}\lvert u_i\rvert^2\le c_EA_0A_w$ by Lemma Q2. $\qquad\blacksquare$

**Evaluation.** Uniformly for $a\in[2.65,3]$, each factor is replaced by its largest value on the interval: $a\le3$, $\eta\le e^{3/8}\le1.4550$, $x_1\ge2.4$, $x_2\ge5.05$, with the hand majorant $S_2(2.4)\le1.1018$, $S_3(2.4)\le0.8680$, $S_4(2.4)\le0.7376$, $S_2(5.05)\le0.04938$, $S_3(5.05)\le0.04494$, $S_4(5.05)\le0.04241$. With these declared inputs, $c_{20},c_{11},c_{02}$ as above and $c_E\le3.5842$, exact evaluation of the formula gives $C_{\rm src}\le71.01$ and $C_N=16\,(c_E+C_{\rm src})\le1193.6$. For the contour of Section 7, $a\in[2.6952,2.6953]$: $a\le2.6953$, $\eta\le1.4007$, $x_1\ge2.4452$, $x_2\ge5.1404$, and the sums are enclosed directly, $S_2(2.4452)\le0.79585$, $S_3(2.4452)\le0.69702$, $S_4(2.4452)\le0.63681$, $S_2(5.1404)\le0.03979$, $S_3(5.1404)\le0.03835$, $S_4(5.1404)\le0.03737$, giving $C_{\rm src}\le49.49$ and $C_N\le849.2$. The uniform value is larger mainly because the hand majorant exceeds the sums it bounds by about $30$ percent at $x=2.4$ (it gives $1.1018$ where the interval instrument's value of $S_2(2.4)$ is about $0.841$).

## 5. The Lipschitz bound

**Proposition Q4 (the constant of the preparation note's Lemma 2(b); derived).** Under the hypotheses of Proposition Q3 on $a$ and the weight, for histories with $\lVert u_k\rVert_a\le\rho_0$, $k=1,2$,

$$
\lVert\mathcal N[u_1]-\mathcal N[u_2]\rVert_{0,2a}\le C_N'\,(\lVert u_1\rVert_a+\lVert u_2\rVert_a)\,\lVert u_1-u_2\rVert_a,\qquad C_N'=g\,(c_E'+C_{\rm src}'),
$$

$$
C_{\rm src}'=\eta\Bigl\{\tfrac12\Bigl[\frac{c_{20}}{\kappa^4}\bigl(1+\vartheta(1+\mathsf s_1)\bigr)S_4(x_1)+\frac{a\,c_{11}}{\kappa^3}\bigl(1+\vartheta(1+2\mathsf s_1)\bigr)S_3(x_1)+\frac{a^2c_{02}}{\kappa^2}\,\vartheta\,\mathsf s_1\,S_2(x_1)\Bigr]+\tfrac{16}{13}(1+\mathsf s_1)\bigl[2a\,S_3(x_1)+a^2S_2(x_1)\bigr]\Bigr\},
$$

with $\mathsf s_1=e^{-7a/8}$ and $\vartheta=1+\tfrac{16}{13}\,a\,\rho_0\,(1+\mathsf s_1)$. No third derivative of a history is used.

*Proof.* Index by $k$ the quantities of the two histories at the same receiver, source and reception time, write $\Delta$ for differences, $N_k=\lVert u_k\rVert_a$, $N=N_1+N_2$, $\delta=\lVert u_1-u_2\rVert_a$, and keep $X$ and $\mathsf s=\eta e^{-ar}\le\mathsf s_1$ (the last because $r\ge1$).

*Delays.* From $\tau_k=\lvert d+\alpha_k-y_k(T-\tau_k)\rvert$ and the speed bound $3/16$, $\lvert\Delta\tau\rvert\,(1-\tfrac3{16})\le\lvert\Delta\alpha\rvert+\lvert(y_1-y_2)(s_1)\rvert$, so $\lvert\Delta\tau\rvert\le\tfrac{16}{13}\,\delta X(1+\mathsf s)$.

*Sampled source values.* $\Delta p=(y_1-y_2)(s_1)+[y_2(s_1)-y_2(s_2)]$ and $\Delta v=(y_1'-y_2')(s_1)+[y_2'(s_1)-y_2'(s_2)]$; the shifts are at most $\sup\lvert y_2'\rvert\lvert\Delta\tau\rvert$ and $\sup\lvert y_2''\rvert\lvert\Delta\tau\rvert$. With the weight on the source factor, $\lvert\Delta p\rvert\le\delta X\mathsf s\,\vartheta_r\,\omega_d/w_i$ and $\lvert\Delta v\rvert\le a\,\delta X\mathsf s\,\vartheta_r\,\omega_d/w_i$, where $\vartheta_r=1+\tfrac{16}{13}aN_2X(1+\mathsf s)\le\vartheta$.

*First bracket.* Let $\mathcal F(\alpha,p,v)=H(\alpha,p,v)-T_dp-B_dv$ and $z=(\alpha,p,v)$. On the convex set $\lvert\alpha\rvert,\lvert p\rvert\le\rho_0$, $\lvert v\rvert\le3/16$, Lemma Q1 and the mean value theorem give $\lvert\partial_\alpha\mathcal F\rvert\le c_{20}\lvert p\rvert/(\kappa r)^4+c_{11}\lvert v\rvert/(\kappa r)^3$, $\lvert\partial_p\mathcal F\rvert\le c_{20}(\lvert\alpha\rvert+\lvert p\rvert)/(\kappa r)^4+c_{11}\lvert v\rvert/(\kappa r)^3$ and $\lvert\partial_v\mathcal F\rvert\le c_{11}(\lvert\alpha\rvert+\lvert p\rvert)/(\kappa r)^3+c_{02}\lvert v\rvert/(\kappa r)^2$, because $\partial_\alpha\mathcal F=\partial_R\Psi(d+\alpha-p,v)-\partial_R\Psi(d+\alpha,0)$, $\partial_p\mathcal F=-\partial_R\Psi(d+\alpha-p,v)+\partial_R\Psi(d,0)$ and $\partial_v\mathcal F=\partial_v\Psi(d+\alpha-p,v)-\partial_v\Psi(d,0)$. Integrating along the segment from $z_2$ to $z_1$, on which the mean of $\lvert p_\theta\rvert$ is at most $\tfrac12(\lvert p_1\rvert+\lvert p_2\rvert)$ and likewise for $\alpha$ and $v$,

$$
\frac{w_i\lvert\mathcal F(z_1)-\mathcal F(z_2)\rvert}{N\delta X^2}\le\frac{\omega_d\mathsf s}{2}\Bigl\{\frac{c_{20}}{(\kappa r)^4}+\frac{a\,c_{11}}{(\kappa r)^3}+\vartheta\Bigl[\frac{c_{20}(1+\mathsf s)}{(\kappa r)^4}+\frac{a\,c_{11}(1+2\mathsf s)}{(\kappa r)^3}+\frac{a^2c_{02}\,\mathsf s}{(\kappa r)^2}\Bigr]\Bigr\}.
$$

The first two terms come from $\lvert\partial_\alpha\mathcal F\rvert\lvert\Delta\alpha\rvert$, with the weight on the source factor $p$ or $v$; the bracket from $\lvert\partial_p\mathcal F\rvert\lvert\Delta p\rvert$ and $\lvert\partial_v\mathcal F\rvert\lvert\Delta v\rvert$, with the weight on $\Delta p$, $\Delta v$.

*Delay brackets.* They are $-T_d\int_r^{\tau}y'(T-t)\,dt$ and $-B_d\int_r^\tau y''(T-t)\,dt$. Their differences are $-T_d[\int_r^{\tau_1}(y_1'-y_2')(T-t)\,dt+\int_{\tau_2}^{\tau_1}y_2'(T-t)\,dt]$ and the same with one more derivative: a common-domain term using the difference of the histories, including its second derivative, and an endpoint term using $y_2'$ or $y_2''$ times $\Delta\tau$. With $\lvert\tau_1-r\rvert\le\lvert\alpha_1\rvert+\lvert p_1\rvert$ and the weight on the source factor, their sum is at most $N\delta X^2(\omega_d/w_i)\,\mathsf s\,\tfrac{16}{13}(1+\mathsf s)\,[2a/r^3+a^2/r^2]$.

Summing over $d$ with $\mathsf s\le\mathsf s_1$ inside the braces and $\omega_de^{-ar}\le e^{-x_1r}$ gives $C_{\rm src}'$. The receiver term is Lemma Q2: $w_ie^{-2aT}\lvert E(\alpha_1)-E(\alpha_2)\rvert\le c_E'N\delta$. $\qquad\blacksquare$

**Evaluation.** With the declared inputs of Section 4 and $c_E'\le5.3762$: uniformly for $a\in[2.65,3]$, $\mathsf s_1\le e^{-7\times2.65/8}\le0.09840$, $\vartheta\le1.2535$, $C_{\rm src}'\le86.26$, $C_N'=16\,(c_E'+C_{\rm src}')\le1466.2$. For the contour of Section 7: $\mathsf s_1\le0.09459$, $\vartheta\le1.2270$, $C_{\rm src}'\le58.61$, $C_N'\le1023.8$.

## 6. The radii

The linear inverse has $C_L=1/(\nu^2(1-q^\omega(\nu)))$ at $\nu=2a$ (preparation note, Lemma 1), and for $\nu$ in an interval its bound is taken with the lattice sums at the smallest argument, the factor $\nu$ of the numerator at its largest value and $\nu^2$ at its smallest. Uniformly, with the declared majorant values at $5.05$ above, $q^\omega\le16\,[2\times0.04494+5.3\times0.04938]/5.3^2\le0.20027$ and $C_L\le1/(5.3^2\times0.79973)\le0.04452$ for every $\nu\ge5.3$. (The sharper values $0.20025$ and $0.044514$ of the preparation note and its review are reproduced by the interval instrument as a known case; the declared cascade does not use them.) For the contour of Section 7, $\nu\in[5.3904,5.3906]$, with the enclosed sums $S_2(5.1404)\le0.03979$, $S_3(5.1404)\le0.03835$: $q^\omega\le0.16035$ and $C_L\le0.04099$.

**Corollary Q5 (the forward note's Lemma 2 with numbers; derived).** The forward note's Lemma 2 defines $\varrho_0$ and $\delta_0$ as minima of four expressions in $C_LC_N$ and $C_LC_N'$, and its proof uses exactly five inequalities: (i) $\delta_0+4\varrho_0\le\rho_0$; (ii) $8C_LC_N'(\delta_0+4\varrho_0)\le\tfrac12$; (iii) $8C_LC_N\delta_0\le\sqrt2-1$; (iv) $2C_LC_N\delta_0^2\le\varrho_0$; (v) $4\sqrt2\,C_LC_N\delta_0\le\tfrac12$. Any pair of positive numbers satisfying the five may be used in that lemma in place of the minima. The following declared pairs satisfy them. The products are the declared values multiplied exactly and rounded up, $C_LC_N\le0.04452\times1193.6\le53.14$ and so on; the left sides are evaluated exactly from the declared numbers, with $1.4142<\sqrt2<1.4143$.

| | $C_LC_N\le$ | $C_LC_N'\le$ | $2C_LC_N\le$ | $\varrho_0$ | $\delta_0$ | (ii) $\le\tfrac12$ | (iii) $\le0.4142$ | (iv) $\le\varrho_0$ | (v) $\le\tfrac12$ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| every allowed contour | $53.14$ | $65.28$ | $106.3$ | $1.1\times10^{-4}$ | $4.7\times10^{-4}$ | $0.47524$ | $0.19981$ | $2.3478\times10^{-5}$ | $0.1413$ |
| contour of radius $1/10$ | $34.81$ | $41.97$ | $69.7$ | $1.8\times10^{-4}$ | $7.4\times10^{-4}$ | $0.49021$ | $0.20608$ | $3.8124\times10^{-5}$ | $0.14573$ |

So for every real $\psi$ with $\psi''=g\mathcal K\psi$ on $T\le0$ and $\lVert\psi\rVert_a\le\delta_0$ there is exactly one correction $v$ with $\lVert v\rVert_{2a}\le\varrho_0$ for which $\psi+v$ solves the Master Equation on $T\le0$, and $\lVert v\rVert_{2a}\le2C_LC_N\lVert\psi\rVert_a^2$, with $2C_LC_N\le106.3$ and $\le69.7$ in the two cases. The weighted statement of that lemma holds with the same constants, because Propositions Q3 and Q4 and the bound on $C_L$ were proved for every admissible weight.

*Proof.* The five inequalities are the ones invoked in the forward note's proof: (i) for the domain of the map, (ii) for the contraction factor, (iii) and (iv) for invariance of the small ball inside the ball of radius $\varrho_0$, (v) for the truncated-weight absorption. The tabulated left sides are exact evaluations, rounded up. $\qquad\blacksquare$

**What the declared radii are and are not.** They are sufficient choices. The left side of (ii) is $0.49021$ for the contour, close to but below one half, and it contains the correction-ball term: $8C_LC_N'\times4\varrho_0\le0.2418$ and $8C_LC_N'\delta_0\le0.2485$. So $\delta_0$ could be raised somewhat by lowering $\varrho_0$, subject to (iv), and either could be raised by sharper constants. No claim is made that $7.4\times10^{-4}$ is the largest amplitude this method covers, and none that the method fails above it.

This also makes the preparation theorem's threshold explicit: for a seed with $\varepsilon\,\lVert\phi\rVert_a\le\delta_0$ its three smallness conditions follow from (i) to (iv) (with $\varrho=2C_LC_N\varepsilon^2\lVert\phi\rVert_a^2\le\varrho_0$ by (iv), the domain condition is (i), the invariance condition is (iii) and the contraction condition is (ii)), so the family is defined for every $\varepsilon\le\delta_0/\lVert\phi\rVert_a$ and coincides there with the solution of the forward note's Lemma 2.

## 7. One contour, one neighbourhood, one class of seeds

**The staggered rate.** $h(\lambda)=\lambda-\tfrac g3S_2(\lambda)$ is increasing on the positive axis. Enclosing $S_2$ at two points gives $h(2.7952)\le-1.3\times10^{-4}<0$ and $h(2.7953)\ge2.9\times10^{-4}>0$, so

$$
2.7952<\lambda_g<2.7953,\qquad 4.2797\le h'(\lambda_g)=1+\tfrac g3S_1(\lambda_g)\le4.2803 ,
$$

the second because $S_1$ is decreasing, with $S_1(2.7953)$ bounded below and $S_1(2.7952)$ above. These contain the float values $2.7952306901$ and $4.280$ of the preparation note.

**The contour.** Take $\varrho_\Gamma=1/10$: $\Gamma$ is the circle of radius $1/10$ about $\lambda_g$. Then $a=\lambda_g-\tfrac1{10}\in(2.6952,2.6953)$, which is at least $2.65$, and $\lambda_+=\lambda_g+\tfrac1{10}<2.8953<3$. Enclosed sums at the left edge, used below: $S_0(a)\le0.89283$, $S_1(a)\le0.69831$, $S_{-1}(a)\le1.2690$, and $S_1(\lambda_+)\ge S_1(2.8953)\ge0.54253$.

**Proposition Q6 (margins; derived).**

1. *On the contour at the staggered wavevector.* For $\lvert\lambda-\lambda_g\rvert\le\tfrac1{10}$, $\lvert h(\lambda)\rvert\ge\lvert\lambda-\lambda_g\rvert\,[h'(\lambda_g)-\tfrac g6S_0(a)\lvert\lambda-\lambda_g\rvert]$. Hence $\lambda_g$ is the only zero of $\lambda h(\lambda)$ in the closed disc, and on $\Gamma$, $\lvert h\rvert\ge0.40416$ and $\sigma_{\min}(F(Q,\lambda))=\lvert\lambda h(\lambda)\rvert\ge\sigma_Q:=1.0892$.
2. *Away from the staggered wavevector.* For every $\lambda$ with $\operatorname{Re}\lambda\ge a$, $\lvert\lambda\rvert\le\lambda_+$, and every $k$, $\lVert M(k,\lambda)-M(Q,\lambda)\rVert\le\tfrac12\lvert k-Q\rvert^2[2S_1(a)+\lambda_+S_0(a)]$. Hence for every $\lambda$ on $\Gamma$ and every $k$,
$$
\sigma_{\min}(F(k,\lambda))\ge1.0892-31.854\,\lvert k-Q\rvert^2 ,
$$
which is positive for $\lvert k-Q\rvert\le0.184$, at least $0.3724$ on the closed ball of radius $3/20$, and at least $m_F:=1.0095$ on the closed ball of radius $1/20$.
3. *The seed class.* Let $\mathcal U$ be the open ball $\lvert k-Q\rvert<3/20$, let $b$ be a smooth real function on the torus with $b\ge0$, $b(Q+\xi)=b(Q-\xi)$, $b(Q)>0$, support in $\lvert k-Q\rvert\le1/20$ and $(2\pi)^{-3}\int b\,dk=1$, and let $V(k)=b(k)\,\mathbf e$ for a fixed real unit vector $\mathbf e$. Then $V$ is an admissible seed function of the preparation note, and its seed $\phi$, with the convention $\phi_j=(2\pi)^{-3}\int e^{ik\cdot j}\hat\phi\,dk$, satisfies for all $T\le0\le t$, all $j$ and $n=0,1,2$,
$$
\frac{\lvert\phi_j^{(n)}(T+t)\rvert}{a^n}\le\bar\Lambda_0\,e^{aT}e^{\lambda_+t},\qquad\bar\Lambda_0:=0.1144\ \ge\ \frac{\varrho_\Gamma}{m_F}\Bigl(\frac{\lambda_+}{a}\Bigr)^2 .
$$
So $\lVert\phi^t\rVert_a^{(0)}\le\bar\Lambda_0e^{\lambda_+t}$ for $t\ge0$. One member of the class is the normalised standard bump, $b=b_0/((2\pi)^{-3}\int b_0)$ with $b_0(k)=\exp[-1/(1-400\lvert k-Q\rvert^2)]$ inside the ball and zero outside.

*Proof.* (1) For $\operatorname{Re}\lambda\ge a$, $\lvert h''(\lambda)\rvert=\tfrac g3\lvert\sum e^{-\lambda r}\rvert\le\tfrac g3S_0(a)$. The disc is convex and lies in that half-plane, so $\lvert h(\lambda)-h'(\lambda_g)(\lambda-\lambda_g)\rvert\le\tfrac12\cdot\tfrac g3S_0(a)\lvert\lambda-\lambda_g\rvert^2$. The bracket is at least $4.2797-\tfrac{16}{6}\times0.1\times0.89283\ge4.0416>0$ throughout the disc, and on the circle $\lvert h\rvert\ge0.1\times4.2797-\tfrac{16}{6}\times0.01\times0.89283\ge0.40416$. The smallest $\lvert\lambda\rvert$ on $\Gamma$ is $a\ge2.6952$, and $2.6952\times0.40416=1.089292\ldots\ge1.0892$.

(2) Since $2Q\cdot d$ is a multiple of $2\pi$, $M(k,\lambda)=\sum_de^{-\lambda r}e^{-i\theta_d}[T_d+\lambda B_d]$ with $\theta_d=(k-Q)\cdot d$. The summand's other factors are even in $d$, so pairing $d$ with $-d$ replaces $e^{-i\theta_d}$ by $\cos\theta_d$, and $M(k,\lambda)-M(Q,\lambda)=\sum_de^{-\lambda r}(\cos\theta_d-1)[T_d+\lambda B_d]$. With $\lvert\cos\theta-1\rvert\le\theta^2/2\le\lvert k-Q\rvert^2r^2/2$, $\lvert T_d\rvert=2/r^3$, $\lvert B_d\rvert=1/r^2$, the norm is at most $\tfrac12\lvert k-Q\rvert^2\sum e^{-ar}(2/r+\lvert\lambda\rvert)$. Then $F(k,\lambda)=F(Q,\lambda)-g[M(k,\lambda)-M(Q,\lambda)]$ and $\sigma_{\min}(F(k,\lambda))\ge\lvert\lambda h(\lambda)\rvert-g\lVert M(k,\lambda)-M(Q,\lambda)\rVert$; the coefficient is $\tfrac{16}2[2\times0.69831+2.8953\times0.89283]=31.853045\ldots\le31.854$. Then $31.854\times0.184^2=1.0784\ldots<1.0892$; $1.0892-31.854\times(3/20)^2=0.372485\ge0.3724$; and $1.0892-31.854/400=1.009565\ge1.0095$.

(3) The support of $V$ is compact in $\mathcal U$, on whose closure $F$ is invertible on $\Gamma$ by (2); the ball is symmetric under $k\mapsto-k$ because $-Q$ and $Q$ are the same point of the torus; $V(-k)=V(k)=\overline{V(k)}$ and $V(Q)\ne0$. For the bound, $\lvert\partial_T^n\hat\phi(k,T+t)\rvert\le\frac1{2\pi}\oint_\Gamma\lvert\lambda\rvert^n\,\lvert e^{\lambda(T+t)}\rvert\,\lVert F(k,\lambda)^{-1}\rVert\,b(k)\,\lvert d\lambda\rvert\le\varrho_\Gamma\,\lambda_+^n\,e^{aT}e^{\lambda_+t}\,b(k)/m_F$, using $\lvert\lambda\rvert\le\lambda_+$ on $\Gamma$ and $\lvert e^{\lambda(T+t)}\rvert\le e^{aT}e^{\lambda_+t}$ for $T\le0\le t$, as in the forward note. Integrate over $k$ with the unit normalised mass, and use $\lambda_+/a>1$. Finally $0.1\times(2.8953/2.6952)^2/1.0095=0.11431\ldots\le0.1144$. $\qquad\blacksquare$

*Scope.* This quantifies one contour and one class of seeds. It bounds every member of that class by the same number; it is not a bound for an arbitrary bump, an arbitrary direction-dependent $V$, a different support, or a different contour, and $\varepsilon$ is not rescaled. The bound $\bar\Lambda_0$ is an upper bound; the seed's actual size at the centre at time zero is about $1/(\lambda_gh'(\lambda_g))\approx0.084$ times $\varepsilon$ to leading order in the support radius (inferred from $P(Q)$; the proved lower bound is $p_0$ of Section 9).

## 8. The guaranteed interval

**Theorem Q7 (derived, relying on the accepted preparation and forward-evolution proofs).** Let the contour be that of Section 7 and let $\phi$ be the seed of any $V$ in the class of Proposition Q6(3). Put $\delta_0=7.4\times10^{-4}$, $\varrho_0=1.8\times10^{-4}$, $\bar\Lambda_0=0.1144$, $\varepsilon_0=6.46\times10^{-3}$ (which is at most $\delta_0/\bar\Lambda_0=6.4685\ldots\times10^{-3}$), and for $0<\varepsilon\le\varepsilon_0$

$$
T_*(\varepsilon)=\frac{1}{2.8953}\ln\frac{\delta_0}{\varepsilon\,\bar\Lambda_0}\ \ge0 .
$$

Then the constructed history $u^\varepsilon=\varepsilon\phi+v^\varepsilon$ exists on $T\le0$, with $v^\varepsilon$ the unique correction of norm at most $\varrho_0$, and its unique charted continuation exists on $(-\infty,T_*(\varepsilon)]$ and satisfies there every conclusion of the forward note's Theorem 2: one root per distinct source and none on a member's own path; displacements at most $1/16$, speeds at most $3/16$, separations at least $7/8$; and for $0\le T\le T_*(\varepsilon)$ and every $j$,

$$
\lvert u_j(T)-\varepsilon\phi_j(T)\rvert\le69.7\,\bigl(\varepsilon\,\bar\Lambda_0\,e^{2.8953\,T}\bigr)^2\le E:=69.7\,\delta_0^2\le3.817\times10^{-5},\qquad\lvert u_j(T)\rvert\le\delta_0+E\le7.79\times10^{-4}.
$$

Lower bounds of $T_*$ with these declared constants: $0.644$ for $\varepsilon=10^{-3}$; $1.440$ for $10^{-4}$; $2.235$ for $10^{-5}$; $3.030$ for $10^{-6}$; $4.621$ for $10^{-8}$.

*Proof.* By Corollary Q5 and Proposition Q6, the hypotheses of the forward note's Lemma 2 and Theorem 2 hold with these numbers. That theorem's time is $\lambda_+^{-1}\ln(\delta_0/(\varepsilon\Lambda))$ for any valid bound $\Lambda$ of the seed norm; with $\Lambda=\bar\Lambda_0$ it is at least $T_*(\varepsilon)$ because $\lambda_+<2.8953$ and the logarithm is nonnegative. For $T\le T_*$ the seed norm of the translated seed is at most $\varepsilon\bar\Lambda_0e^{\lambda_+T}\le\varepsilon\bar\Lambda_0e^{2.8953T}\le\delta_0$, and the displayed bounds are items 2 and 3 of that theorem with $2C_LC_N\le69.7$. $\qquad\blacksquare$

The displacements actually reached are below $8\times10^{-4}$, far inside the chart $1/16$ on which the constants were computed. The interval is a guaranteed interval of small amplitude, and it is positive for every listed $\varepsilon$; it is not an estimate of how long the disturbance stays small, and the threshold $\delta_0$ is where this sufficient argument stops, not where anything happens.

## 9. Real rates, positive residues, and growth of the central member

**Proposition Q8 (derived).** Let the contour and the seed class be those of Section 7.

1. For every $k$ with $\lvert k-Q\rvert\le3/20$: $F(k,\lambda)$ is real symmetric for real $\lambda$; $\partial_\lambda F(k,\lambda)\ge8.877\,I$ for every real $\lambda\in[a,\lambda_+]$; $F(k,a)\le-0.3724\,I$ and $F(k,\lambda_+)\ge0.3724\,I$. Consequently $\det F(k,\cdot)$ has exactly three zeros inside $\Gamma$ counted with multiplicity, all real, and at each the residue of $F^{-1}$ is positive semidefinite.
2. With $P(k)=\frac1{2\pi i}\oint_\Gamma F(k,\lambda)^{-1}d\lambda$: for $\lvert k-Q\rvert\le1/20$, $P(k)\ge p_0I$ with $p_0:=0.0763$.
3. For every $T\ge0$, the central member of the linear seed satisfies $\mathbf e\cdot\phi_0(T)\ge p_0\,e^{aT}$. This holds for every amplitude, because it concerns the seed alone.
4. For $0<\varepsilon\le\varepsilon_0$, the continued history of Theorem Q7 satisfies at $T_*=T_*(\varepsilon)$
$$
\lvert u_0(T_*)\rvert\ \ge\ \mathcal L(\varepsilon)-E,\qquad\mathcal L(\varepsilon)=\varepsilon\,p_0\Bigl(\frac{\delta_0}{\varepsilon\bar\Lambda_0}\Bigr)^{\theta},\quad\theta:=0.9308\le\frac{2.6952}{2.8953},\quad E=69.7\,\delta_0^2,
$$
while at time zero $\sup_j\lvert u_j(0)\rvert\le\varepsilon\bar\Lambda_0+69.7\,(\varepsilon\bar\Lambda_0)^2$. The linear contribution $\mathcal L(\varepsilon)$ is positive for every $\varepsilon$ and equals $A\,\varepsilon^{1-\theta}$ with $A=p_0(\delta_0/\bar\Lambda_0)^\theta$; the subtraction $E$ does not depend on $\varepsilon$. The right side $\mathcal L(\varepsilon)-E$ is therefore increasing in $\varepsilon$, positive for $10^{-17}\le\varepsilon\le\varepsilon_0$, negative at $\varepsilon=10^{-20}$, and tends to $-E$ as $\varepsilon\to0$. Where it is not positive the statement is true and empty.

The table is evaluated with the declared constants $\delta_0=7.4\times10^{-4}$, $\bar\Lambda_0=0.1144$, $p_0=0.0763$, $\theta=0.9308$, $2C_LC_N\le69.7$, at the declared time $T_*(\varepsilon)$ of Theorem Q7. Lower bounds are rounded down and upper bounds up.

| $\varepsilon$ | $T_*\ge$ | $\sup_j\lvert u_j(0)\rvert\le$ | linear contribution $\mathcal L\ge$ | $\lvert u_0(T_*)\rvert\ge\mathcal L-E$ | $\sup_j\lvert u_j(T_*)\rvert\le$ | growth factor $\ge$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $10^{-3}$ | $0.644$ | $1.154\times10^{-4}$ | $4.33\times10^{-4}$ | $3.95\times10^{-4}$ | $7.79\times10^{-4}$ | $3.43$ |
| $10^{-4}$ | $1.440$ | $1.145\times10^{-5}$ | $3.69\times10^{-4}$ | $3.31\times10^{-4}$ | $7.79\times10^{-4}$ | $28.9$ |
| $10^{-5}$ | $2.235$ | $1.145\times10^{-6}$ | $3.15\times10^{-4}$ | $2.77\times10^{-4}$ | $7.79\times10^{-4}$ | $242$ |
| $10^{-6}$ | $3.030$ | $1.145\times10^{-7}$ | $2.68\times10^{-4}$ | $2.30\times10^{-4}$ | $7.79\times10^{-4}$ | $2010$ |
| $10^{-8}$ | $4.621$ | $1.145\times10^{-9}$ | $1.95\times10^{-4}$ | $1.57\times10^{-4}$ | $7.79\times10^{-4}$ | $1.37\times10^{5}$ |
| $10^{-12}$ | $7.802$ | $1.145\times10^{-13}$ | $1.03\times10^{-4}$ | $6.52\times10^{-5}$ | $7.79\times10^{-4}$ | $5.70\times10^{8}$ |
| $10^{-17}$ | $11.778$ | $1.145\times10^{-18}$ | $4.66\times10^{-5}$ | $8.43\times10^{-6}$ | $7.79\times10^{-4}$ | $7.37\times10^{12}$ |
| $10^{-20}$ | $14.164$ | $1.145\times10^{-21}$ | $2.88\times10^{-5}$ | not positive | $7.79\times10^{-4}$ | none |

*Proof.* (1) Symmetry is from the preparation note. At $Q$, $\partial_\lambda F=(\lambda h)'I=(h+\lambda h')I$. On $[a,\lambda_+]$, $h'=1+\tfrac g3S_1$ lies between $1+\tfrac g3S_1(\lambda_+)$ and $1+\tfrac g3S_1(a)$, and $h(\lambda)\ge h(a)\ge-\varrho_\Gamma(1+\tfrac g3S_1(a))$, so $(\lambda h)'\ge-0.1\,(1+\tfrac{16}3\times0.69831)+2.6952\,(1+\tfrac{16}3\times0.54253)=10.0213\ldots\ge10.021$. For other $k$, as in Proposition Q6(2), $\partial_\lambda M(k,\lambda)-\partial_\lambda M(Q,\lambda)=\sum e^{-\lambda r}(\cos\theta_d-1)[-r(T_d+\lambda B_d)+B_d]$, of norm at most $\tfrac12\lvert k-Q\rvert^2[3S_0(a)+\lambda_+S_{-1}(a)]$; for $\lvert k-Q\rvert\le3/20$, $g$ times this is at most $16\times\tfrac12\times0.0225\times[3\times0.89283+2.8953\times1.2690]=1.14347\ldots\le1.1435$, so $\partial_\lambda F\ge(10.021-1.1435)I\ge8.877\,I$. At the ends, $F(Q,a)=a\,h(a)\,I\le-\sigma_QI$ and $F(Q,\lambda_+)\ge\sigma_QI$ by Proposition Q6(1), since $h$ is negative at $a$ and positive at $\lambda_+$, and the perturbation is at most $31.854\times(3/20)^2$, leaving $0.3724$. Each of the three eigenvalues of the real symmetric $F(k,\lambda)$ is then a strictly increasing continuous function of $\lambda$ on $[a,\lambda_+]$, negative at $a$ and positive at $\lambda_+$, so it vanishes once: three real zeros with multiplicity. By Proposition Q6(2), $tF(k,\lambda)+(1-t)F(Q,\lambda)$ is invertible on $\Gamma$ for $0\le t\le1$, so the number of zeros of the determinant inside $\Gamma$ is the same as at $Q$, namely three; all zeros inside $\Gamma$ are therefore the real ones. At a real zero with $\partial_\lambda F$ positive definite the pole is simple with positive semidefinite residue (preparation note, verdict table).

(2) $P(Q)=I/(\lambda_gh'(\lambda_g))$, and $1/(2.7953\times4.2803)=0.083579\ldots\ge0.08357$. On $\Gamma$, $F(k)^{-1}-F(Q)^{-1}=F(k)^{-1}[F(Q)-F(k)]F(Q)^{-1}$, of norm at most $(1/m_F)\times31.854\,\lvert k-Q\rvert^2\times(1/\sigma_Q)$, so on the seed support $\lVert P(k)-P(Q)\rVert\le\varrho_\Gamma\times(31.854/400)/(1.0095\times1.0892)=0.0072425\ldots\le0.00725$, and $0.08357-0.00725=0.07632\ge0.0763$.

(3) By (1), $\hat\phi(k,T)=\sum_{\lambda_0}e^{\lambda_0T}P_{\lambda_0}(k)V(k)$ with $\lambda_0\ge a$ real and $P_{\lambda_0}\ge0$, so for $T\ge0$, $\mathbf e\cdot\hat\phi(k,T)\ge b(k)\,e^{aT}\,\mathbf e^{\mathsf T}P(k)\mathbf e\ge p_0\,b(k)\,e^{aT}$. At $j=0$ the Fourier factor is $1$, so $\mathbf e\cdot\phi_0(T)=(2\pi)^{-3}\int\mathbf e\cdot\hat\phi\,dk\ge p_0e^{aT}$, using $b\ge0$ and the unit mass.

(4) $T_*$ is at most the time of the forward note's Theorem 2, so Theorem Q7's correction bound holds at $T_*$: $\lvert u_0(T_*)\rvert\ge\varepsilon p_0e^{aT_*}-E$. Since $a\ge2.6952$, $aT_*\ge(2.6952/2.8953)\ln(\delta_0/(\varepsilon\bar\Lambda_0))\ge\theta\ln(\delta_0/(\varepsilon\bar\Lambda_0))$, the logarithm being nonnegative, so $\varepsilon p_0e^{aT_*}\ge\mathcal L(\varepsilon)$. The bound at time zero is the norm of the seed plus the correction bound at $t=0$. Monotonicity is evident from the form $A\varepsilon^{1-\theta}-E$; positivity at $10^{-17}$ and negativity at $10^{-20}$ are the table's entries. $\qquad\blacksquare$

**What kind of bound this is.** Statement 3 improves the forward note's Proposition 3 for this seed class: evaluating at the central member, where a nonnegative bump adds without cancellation, gives the growth rate $a$ in place of $2a-\lambda_+$ and needs no ratio of sums. Statement 4 is a lower bound on growth and Theorem Q7 an upper bound; for amplitudes in the stated range they place the largest displacement at $T_*$ between the fifth and sixth columns of the table. They are three different results: a guaranteed small-amplitude interval, a lower growth bound on it that is positive only for $10^{-17}\le\varepsilon\le\varepsilon_0$, and an upper bound on it. The linear contribution falls like $\varepsilon^{1-\theta}$ with $1-\theta\le0.0692$, because the proof bounds growth from below by the slowest rate $a$ on the contour and the duration from below with the fastest, $\lambda_+$; once it falls to the fixed allowance $E$ the full bound is no longer positive. So growth is established for a finite range of amplitudes and not for arbitrarily small ones, no amplitude independent of $\varepsilon$ is reached, and reaching $3\times10^{-4}$ of a spacing is not reaching order-one amplitude.

## 10. What is not obtained, and the exact missing estimates

1. **Beyond $\delta_0$.** The representation as seed plus correction is established for seed norms up to the declared $\delta_0=7.4\times10^{-4}$, a sufficient choice (Section 6). The constraint that limits enlargement within this argument is the contraction condition (ii), whose left side is at most $8C_LC_N'(\delta_0+4\varrho_0)$ with $8C_LC_N'\le335.8$; it grows in proportion to the amplitudes. Smaller constants are available within the present method, since the chart $1/16$ is some eighty times larger than the amplitudes reached, the weight allowance $e^{r/4}$ is charged even in the unweighted norm, and the delay terms are bounded with absolute values; none of this was done. Whether sharper constants, or a different argument, can cover amplitudes of order one is not decided here: one sufficient estimate being proportional to the amplitude does not show that no other estimate works. Reaching order one is unproved.
2. **After $T_*$.** The forward note's Theorem 1 continues the history by steps, and its Proposition 4 bounds growth from above with a rate far above the true rates. No lower bound on growth, and no control of the correction, is available after $T_*$. The exact missing estimate is unchanged from the forward note: a bound keeping every displacement below one half up to the time some speed reaches one, or a mechanism forcing a speed to one in finite time.
3. **Which ending, and a positive arrival rate.** Not addressed. No chart boundary is promoted to an event and no arrival rate is inferred from the linear growth.
4. **Other seeds and contours.** The numbers of Sections 7 to 9 are for the contour of radius $1/10$ and unit-mass nonnegative even bumps supported within $1/20$ of $Q$. Sections 2 to 6 are for every contour the preparation note admits. Weighted seed norms $\bar\Lambda_m$ for $m\ge1$ were not evaluated; the weighted conclusions of the two notes hold with the constants of Corollary Q5 but their size is not given as a number.
5. **Growth for very small amplitudes.** For $\varepsilon<10^{-17}$ the lower bound of Proposition Q8(4) is not shown positive. A lower bound that stays positive as $\varepsilon\to0$ would need the correction controlled relative to the seed at the centre, not by the fixed allowance $E$; that was not attempted.
6. **Proposition 4's rate.** Not re-evaluated here. As one of its known cases the interval instrument encloses $Z_4$ in $[16.274,16.875]$ with cube half-width $40$, which contains the literature value $16.5323$; the forward note's table was not recomputed with it, and nothing here relies on that table.

## 11. Instruments, evidence and the reference boundary

Three session instruments are in the [evidence directory](../evidence/saturday-forward-quantification-2026-10-11/README.md), with identities and outputs listed there. None integrates the equation or evaluates a history.

- **`forward_quantification_constants.py`** (frozen as first submitted) evaluates the formulas of Sections 2 to 9 with `mpmath.iv` interval arithmetic at 40 digits (mpmath 1.3.0) and finite sums over the cube of half-width $40$. Its exponentials, square roots, logarithms and lattice sums are interval operations. Not every operation in it is: the endpoints of the rate interval, the arguments $a-\tfrac14$, $2a-\tfrac14$ and $2a$, and a few comparisons are formed in 60-digit binary floating point from decimal strings before conversion to intervals, which is rounding to nearest with relative error near $10^{-60}$, and its printed values are rounded to nearest at ten or twelve figures. Its printed numbers are therefore close approximations of its interval endpoints and not certified endpoints. This note no longer quotes them as bounds. They are consistent with the declared values, which are all on the safe side of them by margins far larger than those rounding errors, but that comparison is a consistency observation and not the justification of the declared values. *Truncation:* tails bounded analytically and added to upper endpoints, $26\,e^{-(x-1/2)\cdot41}/(1-e^{-(x-1/2)})$ for exponential sums and $12/40^2+1/(2\cdot40^4)=0.0075001953125$ for $Z_5$. *Known cases, asserted before any target:* interval identities with exact answers; the lattice census against the classical counts of representations by three squares, the shell counts $24m^2+2$, and an exact rational separable sum; the hand majorant against the four values recorded independently in the Codex preparation review; the enclosure of $Z_4$ against the literature value; the bracket of $\lambda_g$ and $h'(\lambda_g)$ against the float values of the preparation note. Its first attempt stopped at a known case whose reference value had been rounded to the working precision; the check was corrected and the attempt is retained.
- **`declared_cascade_witness.py`** (added after the review) is what supports the displayed numbers. Its inputs are exact rationals. (A) Each declared value that comes from a transcendental function or a lattice sum is taken from an interval endpoint, computed with `mpmath.iv` at 50 digits from exact rational arguments, and rounded outward to a short decimal by exact integer arithmetic: upward for upper bounds, downward for lower bounds. (B) Every further step, the constants $C_{\rm src}$, $C_N$, their products with $C_L$, the five inequalities, and the whole contour cascade down to $m_F$, $\bar\Lambda_0$, $\varepsilon_0$ and $p_0$, is computed in exact rational arithmetic from the declared values alone, and each result is again rounded outward. (C) The table of Section 9 is evaluated at the declared constants and the declared time, with interval logarithm and exponential and outward rounding. *Controls, asserted before any target:* the directed-rounding functions on known rationals, including negative numbers and negative decimal places; exact conversion between interval endpoints and rationals; six exact values stated in the Codex review of this note ($0.0075001953125$; $1.089292032$; $31.853045592$; the two time-zero bounds $1.14300909288504\times10^{-7}$ and $1.1430000909288504\times10^{-9}$ for the first submission's constants; and $1/(2.7953\times4.2803)<0.083581$); and the lattice census. *Remaining boundary:* the outward rounding of `mpmath.iv` itself, which neither instrument certifies; the tails, bounded as above. Its first attempt failed in a rounding helper for results of four or more integer digits, after the cascade had been computed and three table rows had printed; the helper was corrected, a control added, and the attempt retained.
- **`row_derivative_sample_check.py`** compares the three bounds of Lemma Q1 with central differences of $\Psi$ in double precision at 4000 sampled arguments and twelve direction pairs each, and accepts a sampled value up to $10^{-3}$ above a bound. Its finite-difference truncation and roundoff errors are not enclosed. Its exit therefore establishes only that no sampled difference exceeded a bound by more than $10^{-3}$. Largest sampled values: $7.385$ against $9.0336$; $3.030$ against $4.5991$; $3.72874$ against the third bound, whose exact value at that argument is $8192/2197=3.728721\ldots$, so this sample lies about $2\times10^{-5}$ above the bound and inside the acceptance slack. That excess is consistent with finite-difference error, since the bound is attained there exactly, but the instrument does not prove that attribution. The proof of Lemma Q1 is the authority; the sample neither proves nor refutes it.

**Reference boundary.** The formulas are derived here by hand and the numbers come from instruments written in the same session; agreement between them is not independent evidence. The independent inputs are the known-case values named above, and the mechanisms have a separate reconstruction in the Codex review. The accepted notes, their reviews, their instruments and outputs were not modified, and the first instrument and its outputs were not changed after the review.

## 12. Falsifiers

- Lemma Q1: an argument $(R,v)$ with $\lvert v\rvert\le3/16$ and unit vectors at which a second derivative of $\Psi$ exceeds its stated bound.
- Lemma Q2: a displacement $\lvert\alpha\rvert\le1/16$ at which $\lvert E(\alpha)\rvert>57.35\,\lvert\alpha\rvert^3$ or $\lvert\nabla E(\alpha)\rvert>172.1\,\lvert\alpha\rvert^2$ (the stated bounds with $Z_5\le10.3824$), or a correct enclosure showing $Z_5>10.3824$.
- Propositions Q3 and Q4: a history with unweighted norm at most $1/16$ at a rate in $[2.65,3]$ for which $\lVert\mathcal N[u]\rVert_{0,2a}>1193.6\,\lVert u\rVert_a^{(0)}\lVert u\rVert_a$, or a pair in the weighted ball violating the Lipschitz bound with $1466.2$; an arithmetic or bookkeeping error in the nine products or in the difference estimates.
- Corollary Q5: a declared pair $(\varrho_0,\delta_0)$ failing one of the five inequalities with correct upper bounds of $C_LC_N$, $C_LC_N'$; a real linear solution of norm at most $\delta_0$ with two corrections of norm at most $\varrho_0$.
- Proposition Q6: a correct enclosure placing $\lambda_g$ outside $(2.7952,2.7953)$; a point of $\Gamma$ and a wavevector with $\lvert k-Q\rvert\le3/20$ at which the smallest singular value of $F$ is below $1.0892-31.854\lvert k-Q\rvert^2$; a seed of the stated class with $\lVert\phi\rVert_a^{(0)}>0.1144$.
- Theorem Q7: a seed of the class and an $\varepsilon\le6.46\times10^{-3}$ whose constructed history, with its complete past and its unique charted continuation, violates a stated bound at some $T\le T_*(\varepsilon)$. A run started at a finite time from the seed alone is a different history and does not test this.
- Proposition Q8: a wavevector in the ball with a non-real zero of $\det F(k,\cdot)$ inside $\Gamma$, or with $P(k)$ having an eigenvalue below $0.0763$ on the seed support; a seed of the class with $\mathbf e\cdot\phi_0(T)<0.0763\,e^{aT}$ at some $T\ge0$; for the range claim, an $\varepsilon$ in $[10^{-17},6.46\times10^{-3}]$ at which $\mathcal L(\varepsilon)\le E$ with the declared constants.
- For the numbers: a displayed step that fails in exact arithmetic with its displayed inputs; a declared value on the wrong side of a correct enclosure of the quantity it bounds; or a demonstrated defect in the interval library. Any of these withdraws the affected numbers without affecting the formulas.

## 13. Proposed propagation (not applied)

No shared tracker, manuscript or queue was edited. Suggested text for the coordinator, for the lattice queue's localized-preparation task: "Quantification (Saturday quantitative round, 2026-10-11, derived, independently reviewed): for the contour of radius $1/10$ about the staggered rate and unit-mass nonnegative even bump seeds supported within $1/20$ of the staggered wavevector, the $g=16$ complete-past family exists for every $\varepsilon\le6.46\times10^{-3}$ and continues, as seed plus a correction of at most $69.7$ times the squared seed norm, at least to $T_*=\ln(7.4\times10^{-4}/(0.1144\varepsilon))/2.8953$. For $10^{-17}\le\varepsilon\le6.46\times10^{-3}$ the central displacement at $T_*$ has a positive proved lower bound (for example at least $3.31\times10^{-4}$ for $\varepsilon=10^{-4}$, a growth factor of at least $28.9$), while every displacement stays below $7.79\times10^{-4}$; for smaller amplitudes no growth bound is established. Constants: $C_N\le849.2$, $C_N'\le1023.8$ for that contour and $1193.6$, $1466.2$ for every admitted contour; the thresholds are sufficient choices, not maxima. Open: any amplitude beyond $\delta_0$, order-one evolution, which ending occurs, positive arrival rate."
