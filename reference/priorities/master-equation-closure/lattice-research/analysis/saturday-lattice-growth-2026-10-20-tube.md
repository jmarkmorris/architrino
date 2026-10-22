# Tube constants: the localized-family estimate evaluated at the sizes the solution actually has, and a barrier at seed size 0.043 (2026-10-20)

## Result

**In words.** Every constant in the assembled estimate of the [summed signed-remainder note](saturday-summed-signed-lattice-remainder-2026-10-18.md), and in its band-envelope and receiver-cubic refinements ([band envelope](saturday-lattice-growth-2026-10-20.md), [receiver cubic](saturday-lattice-growth-2026-10-20-receiver-cubic.md)), was computed for the worst case the chart allows: every displacement up to the chart radius $\rho=1/16$ and every speed up to $\bar a\rho\approx0.168$. Two facts make that worst case far from what the estimate actually meets. First, by the canonical Master Equation, a row's transmitter factor reads the velocity of the transmitting source at its emission time, never the receiver's velocity. Every source is at least one lattice spacing away, so it is seen at least about $0.94$ time units in the past, where the proved bounds on its seed component and its correction component are about a fourteenth and a hundred-and-sixtieth of their current values; its speed at emission is therefore below $0.009$, not $0.168$. Second, a source's delay differs from its anchor distance by at most the receiver's displacement plus the source's displacement at emission, about $0.059$ at the endpoint below, not twice the chart radius, $0.125$. Evaluating the same lemmas at these sizes, called the *tube* sizes here, lowers every constant: the delay factor $\eta$ from $1.40062$ to $1.171983$, the reciprocal range factor $1/\kappa^5$ from $1.95$ to about $1.355$, $c_{30}$ from $44.3076$ to $34.5516$, $c_{20}$ from $8.7669$ to $7.0715$.

1. **Tube sizes (derived).** While the seed bound is at most $d_*$, the correction bound at most $y_*$ and the solution stays in the accepted chart, every receiver displacement is at most $A_*=d_*+y_*$, every source displacement at emission at most $p_*$, every delay within $\delta_*=A_*+p_*$ of its anchor distance, and every source speed at emission at most $v_*$, with explicit formulas (Lemma T.1).
2. **The estimate with tube constants (derived).** Lemmas L.2–L.3 and Theorem L.4, in their band and signed-receiver versions, hold with the row constants evaluated at speed bound $v_*$, the range factor $1-\delta_*$, the delay factor $e^{\bar a\delta_*}$ and the forward factor $e^{-(\underline\lambda-a)(1-\delta_*)}$ (Proposition T.2). The chart radius no longer enters any constant; it enters only through the accepted Lemma E.1 and the root census, which need displacements at most $1/16$ and speeds at most $3/16$.
3. **A barrier at seed size $0.043$ inside the accepted chart (derived; exact arithmetic).** With coefficient $6.5$: $C_LF_{\rm tube}(0.043,0.0120185)\le0.0117168<0.0120185$, and the accepted chart holds, $d+Kd^2=0.0550185\le1/16$, $\bar a(d+2Kd^2)=0.18069\le3/16$. The same solution exists to
   $$
   T_U(\varepsilon)=\frac1{2.8033}\ln\frac{0.043}{0.0983\,\varepsilon}\ \ge\ T_N(\varepsilon)+0.2520 ,
   $$
   the gain growing with $\ln(1/\varepsilon)$; for $\varepsilon=10^{-4}$, $T_U\ge2.9905$ against $T_N\le2.6913$. On $[0,T_U]$, $\lvert u-\varepsilon\phi\rvert<6.5\,\tilde\Delta^2$; displacements are at most $0.055019$, speeds at most $0.18069$, separations at least $0.889963$; each ordered pair has one causal root and no member has one on its own path (Theorem T.3). Smaller coefficients hold earlier: $3$, $4$ and $5$ while $\tilde\Delta\le0.030$, $0.035$ and $0.040$.
4. **Central growth (derived).** At $T_U$ the central displacement is at least $0.019788$ for $\varepsilon=10^{-4}$, against at most $9.086\times10^{-6}$ anywhere at time zero, a growth factor of at least $2178$; the bound is positive for every $10^{-37}\le\varepsilon\le0.00646$ (Proposition T.4).
5. **Where it stops inside the accepted chart (derived; exact certificate).** For every seed size $d\ge0.0449$ and every coefficient compatible with the accepted chart, the tube estimate admits no barrier (Proposition T.5). Beyond that, a larger chart for Lemma E.1 and the root census, route (a) in its qualitative form, is the only remaining use of the chart; a scratch search, not evidence, found passing pairs up to about $0.047$ when the chart caps are relaxed.
6. **What is not obtained.** Growth uniform as $\varepsilon\to0$, order-one displacement, the ending of regular evolution and wake-speed arrival. The half odd sum is again the largest part of the bound, about $61.5$ percent at the endpoint.

Claim grade: derived for Lemma T.1, Proposition T.2, Theorem T.3, Proposition T.4 and Proposition T.5 by the hand arguments below, relying on the accepted notes, the accepted band-envelope note and the receiver-cubic note (under independent review); the numbers are exact rational arithmetic with outward-rounded interval exponentials by a session instrument that passed known cases first. Declared lattice sums, contour constants and the linear-inverse norm keep their interval-library conditionality. Nothing is measured on solutions. Falsifiers are in Section 6.

The scenario is unchanged: the Master Equation at $g=16$, unit spacing, $c_f=1$, every member dynamical, every causal root and tail retained, the original eight-source block summation, the contour of radius $1/10$, the accepted seed class, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$, $0<\varepsilon\le0.00646$, with its unique charted continuation.

## 1. Where the chart radius entered the constants

The notation is that of the band-envelope note: $\tilde\Delta(t)=0.0983\,\varepsilon\,e^{2.8033t}$ bounds the translated seed, $y(t)$ is the rate-$2a$ norm of the actual correction over the whole past, $a\in(2.6952,2.6953)$, $\bar a=2.6953$, $\underline\lambda=2.7872$, and $X=e^{aT}$ for a reception time $T\le0$ in the translated frame. In the source-row estimates of Lemmas E.2, L.2, L.3 and Theorem L.4 the chart radius $\rho$ is used in five ways:

- the root census, one causal root per ordered pair and none on a member's own path;
- the range of every evaluated configuration and Taylor segment, bounded below by $(1-2\rho)r=\kappa r$;
- the source-time window, every emission within $2\rho$ of $T-r$, which gives the decay factor $\mathsf s=\eta e^{-ar}$ with $\eta=e^{2\bar a\rho}$ and the bound $\mathsf s\le\mathsf s_1=\eta e^{-a}$ for $r\ge1$;
- the speed bound $\varpi=\bar a\rho$ on every source velocity entering a row, which fixes the row constants of Lemmas Q1 and L.1 and the root-difference factor $\vartheta_0=1/(1-\varpi)$ of Lemma L.3;
- the forward factor $\tilde\mu=e^{-(\underline\lambda-a)(1-2\rho)}$, because every source time is at most $-(1-2\rho)$.

Separately, the receiver term uses the radius through the receiver-field constant: $c_{E3}(\rho)=4Z_5(1-\rho)^{-5}$ in Lemma E.2 and Theorem L.4, and the fifth-order remainder $6Z_7(1-\rho)^{-7}\rho^2$ of the signed receiver cubic; there the radius only bounds the receiver displacement, and Proposition T.2 replaces it by the receiver bound $A_*$. Only the first of the five source uses needs the chart as such; the others need bounds on actual sizes, which the chart supplies crudely. The receiver's own speed enters none of the row estimates: in the canonical per-hit acceleration the transmitter-side weight $c_f/\lvert c_f-\mathbf V_j\cdot\hat{\mathbf r}\rvert$ reads the transmitter velocity at emission, and the receiver velocity is absent from the instantaneous multiplier.

## 2. Tube sizes

**Lemma T.1 (derived).** Let $d_*>0$ and $y_*\ge0$ be declared sizes with
$$
d_*+y_*\le\tfrac1{16},\qquad\bar a\,(d_*+2y_*)\le\tfrac3{16},\qquad\delta_*<1,
$$
where $\delta_*$ is defined below. Let $t\ge0$ be a time up to which the solution exists with displacements at most $1/16$ and speeds at most $3/16$ on $(-\infty,t]$, and with $\tilde\Delta(t)\le d_*$ and $y(t)\le y_*$. Put
$$
p_*=\tilde\mu_0\,d_*\,s_{1,0}+y_*\,s_{1,0}^2,\qquad A_*=d_*+y_*,\qquad\delta_*=A_*+p_*,
$$
with the accepted chart-$1/16$ values $\eta_0\le1.40062$, $s_{1,0}=\eta_0e^{-a}\le0.09459$ and $\tilde\mu_0\le0.92274$; and put $\eta_*=e^{\bar a\delta_*}$, $s_{1,*}=\eta_*e^{-a}$, $\mu_*=e^{-(\underline\lambda-a)(1-\delta_*)}$ and
$$
v_*=\bar a\bigl(\mu_*\,d_*\,s_{1,*}+2y_*\,s_{1,*}^2\bigr).
$$
Then, in the translated frame at time $t$, for every receiver, every reception time $T\le0$ and every offset $\ell$ with $r=\lvert\ell\rvert$:

1. the receiver displacement satisfies $\lvert\alpha\rvert\le XA_*$;
2. the source displacement at emission satisfies $\lvert p\rvert\le p_*X$, and the delay satisfies $\lvert\tau-r\rvert\le\delta_*$;
3. at every source time $T'$ within $\delta_*$ of $T-r$: $T'\le-(1-\delta_*)$, $e^{aT'}\le X\eta_*e^{-ar}$, the seed at the source obeys the forward-profile bounds of Corollary B.3 with factor $\mu_*$ in place of $\tilde\mu$, and the source speed is at most $v_*$;
4. the same bounds (2)–(3) hold for the signed pure-seed comparison histories $\pm\bar\Phi$ of Lemmas L.2 and L.3 paired with the receiver displacements $\pm\alpha$: each such configuration has one causal root, delay within $\delta_*$ of $r$, source displacement at most $p_*X$ and source speed at most $v_*$;
5. every configuration and Taylor segment used in Lemmas L.2 and L.3 has range at least $(1-\delta_*)r$ and velocity argument at most $v_*$;
6. $v_*<1$, so every row constant and $\vartheta_0=1/(1-v_*)$ below is finite.

*Proof.* (1) The receiver is seed plus correction at time $T$: $\lvert\alpha\rvert\le\tilde\Delta(t)X+y(t)X^2\le XA_*$. (2) The accepted chart gives the root census and $\lvert\tau-r\rvert\le2/16$, so every source time lies within $1/8$ of $T-r$ and below $-7/8$. There Corollary B.3 with $\rho=1/16$ bounds the seed by $\tilde\mu_0\tilde\Delta(t)e^{aT'}$, and the definition of $y$ bounds the correction by $y(t)e^{2aT'}$; with $e^{aT'}\le Xe^{-ar}\eta_0\le Xs_{1,0}$ this gives $\lvert p\rvert\le X(\tilde\mu_0d_*s_{1,0}+y_*s_{1,0}^2)$. The root equation $\tau=\lvert\ell+\alpha-p\rvert$ then gives $\lvert\tau-r\rvert\le\lvert\alpha\rvert+\lvert p\rvert\le\delta_*$. (3) Since $T\le0$ and $r\ge1$, $T'\le-1+\delta_*$, and $e^{aT'}\le e^{aT}e^{-ar}e^{a\delta_*}$. Corollary B.3's proof holds for every relative time $T'\le-L$ with $L=1-\delta_*$ in place of $1-2\rho$, which gives the factor $\mu_*$. The source speed is at most $a\mu_*\tilde\Delta e^{aT'}+2ay\,e^{2aT'}\le\bar a(\mu_*d_*s_{1,*}+2y_*s_{1,*}^2)X$, and $X\le1$. (4) A comparison history $\pm\bar\Phi$ is a signed average of the seed envelope at the two mirror sources; by Lemma S.3(ii) and Lemma B.2 its displacement is at most $M_0\le\tilde\Delta(t)\le d_*\le1/16$ at every time and its speed at most the seed speed bound, below $3/16$. With the receiver displacement $\pm\alpha$, $\lvert\alpha\rvert\le A_*\le1/16$, the configuration therefore lies in the accepted chart, which gives one causal root and the coarse window $\lvert\tau-r\rvert\le2/16$. In that window Corollary B.3 with $\rho=1/16$ bounds $\lvert\bar\Phi\rvert$ by $X\tilde\mu_0d_*s_{1,0}\le Xp_*$, so the refined window $\lvert\tau-r\rvert\le\lvert\alpha\rvert+\lvert\bar\Phi\rvert\le\delta_*$ follows, and step (3) applies verbatim to the pure seed. (5) In Lemma L.2 the segments are $\ell+t(\alpha-\theta p)$ with $\lvert t\rvert,\theta\le1$ and velocity arguments $t\theta v$, the sampled configurations are $\ell\pm(\alpha-\bar\Phi(s_\pm))$, and the delay segment is $\ell+s z_+$ with $\lvert z_+\rvert\le\lvert\alpha\rvert+\lvert\bar\Phi\rvert$; in Lemma L.3 the segment joins two source samples at a fixed receiver displacement. In each case the displacement from the anchor offset is at most $\lvert\alpha\rvert+\lvert p\rvert\le\delta_*$ (the pure-seed pair average is bounded like the seed part of $p$), so the range is at least $r-\delta_*\ge(1-\delta_*)r$; every velocity argument is a source velocity, at most $v_*$; the segments used inside Proposition Q4's partial-derivative bounds join such points and obey the same bounds. (6) $\delta_*<1$ gives $\eta_*<e^{\bar a}$ and $s_{1,*}<e^{\bar a-a}<e^{0.0001}$; with $\mu_*\le1$, $v_*\le\bar a(d_*+2y_*)\max\{s_{1,*},s_{1,*}^2\}<\tfrac3{16}e^{0.0002}<1$. $\blacksquare$

The mechanism behind the small source speed is the past-decay envelope, not a growth law of the nonlinear solution: the seed component at a source time $T'$ is bounded by $\mu_*\tilde\Delta(t)e^{aT'}$ (Corollary B.3) and the correction component by $y(t)e^{2aT'}$, and a source at distance at least one is seen at least $1-\delta_*\approx0.94$ time units earlier. So the bound on its seed component is at most $\mu_*s_{1,*}\approx0.073$ of the current seed bound, and the bound on its correction component at most $s_{1,*}^2\approx0.0063$ of the current correction bound.

**Proposition T.2 (derived).** Under the hypotheses of Lemma T.1, including its conditions on the declared sizes, for $d=\tilde\Delta(t)\le d_*$ and $y=y(t)\le y_*$,
$$
\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}\le F_{\rm tube}(d,y)=g\Bigl[c_{E3}^*A^3+\Sigma_{\rm br}(A,\mu_*d,y)+\tfrac12\mathcal O(A,\mu_*d)\Bigr],\qquad A=d+y,
$$
where $\Sigma_{\rm br}$ and $\mathcal O$ are the summed bounds of Lemmas L.3 and L.2 with every chart quantity replaced by its tube value: $\kappa\to\kappa_*=1-\delta_*$, $\eta\to\eta_*$, $\mathsf s_1\to s_{1,*}$, $\varpi\to v_*$ in the row constants $c_{20},c_{11},c_{02}$ of Lemma Q1 and $c_{30},c_{21},c_{12},c_{03}$ of Lemma L.1 and in $\vartheta_0=1/(1-v_*)$, and $\tilde\mu\to\mu_*$; and $c_{E3}^*=c_3+6Z_7(1-A_*)^{-7}A_*^2$ with $c_3\le14.3469$, $Z_7\le7.46706$. Every coefficient of $F_{\rm tube}$ is nonnegative and every monomial has degree at least two.

*Proof.* The proofs of Lemmas L.2 and L.3 use the chart radius only through the five items of Section 1. Lemma T.1 supplies items two to five at the tube sizes, and the accepted chart supplies the root census. The row constants are increasing in the velocity bound and the summed bounds increasing in each constant, so substituting the tube values gives valid upper bounds. The receiver term uses Lemma R.1 of the receiver-cubic note with $\lvert\alpha\rvert\le XA\le A_*\le1/16$: $\lvert E\rvert\le c_3X^3A^3+6Z_7(1-A_*)^{-7}X^5A^5\le X^2c_{E3}^*A^3$. Theorem L.4's assembly then applies unchanged. The coefficient signs are checked by the instrument. $\blacksquare$

At the endpoint of Theorem T.3, $d_*=0.043$ and $y_*=0.0120185$, the declared tube values are:

| Quantity | Chart $1/16$ | Tube |
| --- | ---: | ---: |
| delay deviation | $0.125$ | $\delta_*\le0.0588792$ |
| range factor $\kappa$ | $0.875$ | $0.9411208$ |
| delay factor $\eta$ | $1.40062$ | $1.171983$ |
| $\mathsf s_1$ | $0.09459$ | $0.079143$ |
| source speed bound | $0.16845625$ | $v_*\le0.0088184$ |
| forward factor | $0.92274$ | $0.91715$ |
| $c_{20},\ c_{11},\ c_{02}$ | $8.7669,\ 4.3806,\ 3.4784$ | $7.0715,\ 3.0537,\ 2.0539$ |
| $c_{30},\ c_{21},\ c_{12},\ c_{03}$ | $44.3076,\ 29.9313,\ 21.0215,\ 12.5491$ | $34.5516,\ 20.3764,\ 12.3234,\ 6.2164$ |
| receiver constant | $14.622$ | $14.549$ |

## 3. A barrier at seed size $0.043$

**Theorem T.3 (derived, relying on the accepted notes, the band-envelope note and the receiver-cubic note).** Let $d_*=0.043$, $K=6.5$, $y_*=Kd_*^2=0.0120185$, $d_0=0.0006351$, and let $F_{\rm tube}$ be the polynomial of Proposition T.2 for these sizes. In exact arithmetic on the declared values:

- (a) $d_*+y_*=0.0550185\le1/16$, $\bar a(d_*+2y_*)=0.1806848261\le3/16$ and $\delta_*\le0.0588792<1$, so the sizes satisfy the hypotheses of Lemma T.1;
- (b) $C_LF_{\rm tube}(d_*,y_*)\le0.0117168<y_*$;
- (c) $C_LF_{\rm tube}(d_0,31.9d_0^2)<31.9d_0^2$, with $d_0\le d_*$ and $31.9d_0^2\le y_*$.

Consequently, for every $0<\varepsilon\le0.00646$, with $T_U(\varepsilon)=\ln(d_*/(0.0983\varepsilon))/2.8033$:

1. the unique charted continuation of $u^\varepsilon$ exists on $(-\infty,T_U]$; it is the same solution, with the same complete past;
2. for $0\le T\le T_U$, $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert\le y(T)<6.5\,\tilde\Delta(T)^2$, with the first two derivatives of the difference below $2a$ and $(2a)^2$ times that;
3. on $(-\infty,T_U]$: displacements are at most $0.055019$, speeds at most $0.18069$, accelerations at most $0.66163$, transmitter factors at least $0.81931$, separations at least $0.889963$, and each delay is within $0.110037$ of the anchor distance; each ordered pair of distinct members has exactly one causal root at every reception time, and no member has a root on its own path;
4. finite spatially weighted size for every weight exponent up to $T_U$ (qualitative);
5. $T_U-\tilde T=\ln(0.043/0.0305)/2.8033\ge0.1225$ over the band-envelope endpoint, $T_U-\hat T=\ln(0.043/0.033)/2.8033\ge0.0944$ over the receiver-cubic endpoint, and $T_U\ge T_N+0.2520$ over the accepted endpoint, the last difference increasing with $\ln(1/\varepsilon)$.

The pairs $(0.030,3)$, $(0.035,4)$ and $(0.040,5)$, each with tube constants computed at its own sizes, satisfy (a)–(c) as well, with $C_LF_{\rm tube}$ at most $0.0026552$, $0.0046804$ and $0.0079671$ against $0.0027$, $0.0049$ and $0.008$. So $y(T)<K\tilde\Delta(T)^2$ with these coefficients while $\tilde\Delta(T)$ is at most the corresponding seed size.

*Proof.* The argument is that of Theorem B.5, with $F_{\rm tube}$ in place of $F^{\tilde\mu}_{\rm sgn}$ and the accepted chart caps in place of $d+2y\le\rho$. *Validity of the tube constants along the argument.* Every time used in the argument belongs to the set $\mathcal T$ of times in $[0,T_U]$ at which $y(s)<K\tilde\Delta(s)^2$ for all earlier $s\ge0$, or to its supremum, where $y\le K\tilde\Delta^2$ by continuity. There $\tilde\Delta\le d_*$ and $y\le Kd_*^2=y_*$, displacements are at most $d_*+y_*\le1/16$ and speeds at most $\bar a(d_*+2y_*)\le3/16$, so Lemma T.1 and Proposition T.2 apply with the endpoint sizes, and Lemma E.1 applies. At the start the sizes are $\tilde\Delta(0)\le d_0\le d_*$ and $y(0)\le31.9\tilde\Delta(0)^2\le31.9d_0^2\le y_*$. *The rest.* $y(t)\le C_LF_{\rm tube}(\tilde\Delta(t),y(t))$ on those times; nonnegative coefficients give the scaling from (b) and (c) to all smaller seed sizes; the start follows by concavity from $y(0)\le31.9\tilde\Delta(0)^2$; the first-crossing argument and the forward note's maximal continuation give existence and the bound. The items follow from $d_*+y_*=0.0550185$, $\bar a(d_*+2y_*)=0.1806848\ldots$, $\bar a^2(d_*+4y_*)=0.6616200\ldots$ and the chart facts. Item 5: the endpoints use the same rate $2.8033$, so differences of times are logarithms of ratios of seed sizes; the comparison with $T_N$ is that of Theorem B.5 with $0.043$ in place of $0.0305$, smallest at $\varepsilon=0.00646$, where interval logarithms give $T_U\ge1.50369$ and $T_N\le1.25164$. $\blacksquare$

| $\varepsilon$ | $T_N\le$ | $T_U\ge$ | gain $\ge$ |
| ---: | ---: | ---: | ---: |
| $0.00646$ | $1.2517$ | $1.5036$ | $0.2520$ |
| $10^{-3}$ | $1.8960$ | $2.1692$ | $0.2732$ |
| $10^{-4}$ | $2.6913$ | $2.9905$ | $0.2993$ |
| $10^{-6}$ | $4.2819$ | $4.6333$ | $0.3515$ |
| $10^{-8}$ | $5.8725$ | $6.2761$ | $0.4037$ |
| $10^{-12}$ | $9.0536$ | $9.5616$ | $0.5081$ |

## 4. Central growth and where the estimate stops

**Proposition T.4 (derived).** For $0<\varepsilon\le0.00646$ and $0\le T\le T_U$ with $\tilde\Delta(T)\le d$, where $(d,K)$ is one of the pairs of Theorem T.3, $\lvert u_0(T)\rvert\ge\varepsilon p_0e^{\underline\lambda T}-K\tilde\Delta(T)^2$ with $p_0=0.0763$. At $T_U$ the bound is increasing in $\varepsilon$ and positive for every $10^{-37}\le\varepsilon\le0.00646$ (at least $0.008540$ at $10^{-37}$). At time zero $\sup_j\lvert u_j(0)\rvert\le\varepsilon\bar P+3(0.0983\varepsilon)^2$, $\bar P=0.09085$, by the start argument of the smallest ladder coefficient.

*Proof.* As Proposition B.7 of the band-envelope note. $\blacksquare$

| $\varepsilon$ | linear term $\ge$ | $\lvert u_0(T_U)\rvert\ge$ | $\sup_j\lvert u_j(0)\rvert\le$ | growth factor $\ge$ |
| ---: | ---: | ---: | ---: | ---: |
| $0.00646$ | $0.032578$ | $0.020559$ | $5.882\times10^{-4}$ | $34.9$ |
| $10^{-3}$ | $0.032230$ | $0.020212$ | $9.088\times10^{-5}$ | $222$ |
| $10^{-4}$ | $0.031807$ | $0.019788$ | $9.086\times10^{-6}$ | $2178$ |
| $10^{-6}$ | $0.030977$ | $0.018958$ | $9.086\times10^{-8}$ | $2.08\times10^5$ |
| $10^{-8}$ | $0.030168$ | $0.018150$ | $9.086\times10^{-10}$ | $1.99\times10^7$ |
| $10^{-12}$ | $0.028614$ | $0.016595$ | $9.086\times10^{-14}$ | $1.82\times10^{11}$ |

At the ladder point $\tilde\Delta=0.040$ (coefficient $5$) the central lower bound is at least $0.021994$, $0.021600$ and $0.020827$ for $\varepsilon=10^{-3}$, $10^{-4}$ and $10^{-6}$. Relative to the seed-size bound the central lower bound still carries a factor proportional to $\varepsilon^{0.00574}$, so no growth uniform as $\varepsilon\to0$ follows.

**Proposition T.5 (derived; exact certificate).** For every seed size $d\ge0.0449$ and every $y\ge0$ with $d+y\le1/16$ and $\bar a(d+2y)\le3/16$, $y-C_LF_{\rm tube}(d,y)<0$, where $F_{\rm tube}$ is evaluated with the tube constants of any sizes $(d_*,y_*)\ge(d,y)$. So inside the accepted chart no coefficient gives a tube barrier at seed size $0.0449$ or above.

*Proof.* The tube quantities $\delta_*$, $\eta_*$, $s_{1,*}$, $\mu_*$, $v_*$, the row constants, the reciprocal range factor $1/\kappa_*=1/(1-\delta_*)$ and the receiver coefficient are nondecreasing functions of $(d_*,y_*)$, while $\kappa_*$ itself decreases and enters only through reciprocal powers. So the estimate's coefficients at any admissible sizes with seed size at least $d$ are at least those built from the exact formulas at sizes $(d,0)$; evaluate those with lower interval endpoints and without upward rounding, and lower the receiver coefficient to $c_3$. The chart caps give $y\le Y_{\max}(d)=\min\{1/16-d,\ (3/(16\bar a)-d)/2\}$. The concave-maximum certificate of Proposition B.8 on $[0,Y_{\max}(0.0449)]=[0,0.0123328]$ gives an upper bound $-1.02\times10^{-5}$ at $d=0.0449$. For larger $d$ the lower polynomial is larger at each $y$ and $Y_{\max}$ is smaller, so the conclusion extends. At $d=0.0448$ the bound is positive ($8.6\times10^{-5}$), which decides nothing. $\blacksquare$

So inside the accepted chart the tube estimate's reach lies between the declared $0.043$ and $0.0449$. At the declared endpoint the three parts of $C_LF_{\rm tube}$ are about $0.007203$ for half the odd sum, $0.002992$ for the brackets and $0.001522$ for the receiver cubic. Two routes remain for this estimate. The qualitative part of route (a), Lemma E.1 and the root census for a chart with displacements above $1/16$ and speeds above $3/16$, would lift the caps of Proposition T.5; the forward note's Lemma 1 already establishes the reduction of the equation for every chart with displacement below $1/2$ and speed below $1$, but Lemma E.1 is not re-derived here, and a scratch search (exploration, not evidence) found passing pairs only up to about $0.047$ with relaxed caps. A sharper summed odd remainder is the larger lever.

## 5. Instrument, evidence and the reference boundary

[`tube_barrier.py`](../evidence/saturday-lattice-growth-2026-10-20/tube_barrier.py), described in the [evidence README](../evidence/saturday-lattice-growth-2026-10-20/README.md), imports the band-envelope instrument unchanged and through it the frozen accepted instruments. It builds the parameter dictionary from tube sizes through the frozen per-offset and summation routines; it changes no routine. Known cases, run before any target: fed the chart-$1/16$ inputs, its builder reproduces the frozen chart-$1/16$ band parameters exactly and the accepted chunk-1 barrier value $0.0143654990\ldots$; the accepted $\eta_0$ and $s_{1,0}$ bound their formulas; tube constants and summed coefficients increase from sizes $(0.030,3\cdot0.03^2)$ to the endpoint sizes; and the lower envelope of Proposition T.5 lies below the declared tube constants at sizes $(0.044,0)$. The flag `all_targets_pass` aggregates the ladder conditions and the positivity of the growth bound, not the certificate of Proposition T.5, whose result is recorded separately in the output.

What the instrument establishes: exact evaluation of the stated closed forms from declared inputs. It does not establish Lemma T.1 or Proposition T.2, which are hand derivations, or the declared accepted inputs. Nothing is computed on a history.

## 6. Falsifiers

- Lemma T.1: a time and a configuration of the complete-past solution, inside the accepted chart with $\tilde\Delta\le d_*$ and $y\le y_*$, at which a source's speed at emission exceeds $v_*$, its displacement exceeds $p_*X$, or a delay differs from its anchor distance by more than $\delta_*$.
- Proposition T.2: a step of Lemma L.2 or L.3 that uses the chart radius other than through the five listed items, or a row constant that is not increasing in the velocity bound.
- Theorem T.3: an exact evaluation in which (a), (b) or (c) fails with the declared constants; a seed of the class and an amplitude whose complete-past solution, with its unique charted continuation, ceases to exist before $T_U$, violates a bound of items 2 or 3, or has two roots for one ordered pair or a root on its own path. A finite-onset run from the seed alone does not test this.
- Proposition T.4: an exact evaluation contradicting a table entry.
- Proposition T.5: a seed size $d\ge0.0449$ and $y$ within the accepted chart caps with $y\ge C_LF_{\rm tube}(d,y)$ for some admissible tube constants.

## 7. Limits

The statements inherit every limit of the band-envelope and receiver-cubic notes. The tube constants are fixed at the endpoint sizes and valid for all smaller sizes; they are upper bounds, not the actual sizes. The chart caps are those of the accepted Lemma E.1; a larger chart is not used. Spatial decay is qualitative, the central lower bound is not uniform as $\varepsilon\to0$, and order-one displacement, the ending of regular evolution and wake-speed arrival are not addressed.
