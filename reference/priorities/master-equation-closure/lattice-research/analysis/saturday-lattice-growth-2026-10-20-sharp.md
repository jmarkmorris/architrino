# Row constants for slow sources: sharper derivative bounds of the canonical row and barriers at seed sizes 0.047 and 0.052 (2026-10-20)

## Result

**In words.** The [tube-constant note](saturday-lattice-growth-2026-10-20-tube.md) showed that every source entering the assembled estimate for the localized disturbance of the alternating lattice is slow at its emission time: its speed is below about $0.012$. The row's derivative bounds used there are those of Lemma Q1 of the quantification note and Lemma L.1 of the summed signed-remainder note, which were written for speeds up to $3/16$ and add the absolute values of every term of a product rule. Even at zero source speed they give $34.15$ where the exact norm of the third range derivative is $24$, and $20$ where a direct argument gives $6$ for the mixed derivative that carries the largest part of the odd remainder. This note proves bounds of the form "exact value at rest plus an explicit multiple of the source speed" for all seven second- and third-derivative constants (Lemma H.1) and uses them with the tube sizes.

1. **Row constants for slow sources (derived).** For source speeds at most $v<1$, with $D=1-v$, the canonical row $\Psi(R,v)=R/(\lvert R\rvert^2(\lvert R\rvert-R\cdot v))$ satisfies the second-derivative bounds $c_{20}=6/D+5.1548v/D^2+2v^2/D^3$, $c_{11}=2/D^2+2v/D^3$, $c_{02}=2/D^3$ and the third-derivative bounds $c_{30}=24/D+27.9288v/D^2+18.9288v^2/D^3+6v^3/D^4$, $c_{21}=6/D^2+10.3096v/D^3+6v^2/D^4$, $c_{12}=6/D^3+6v/D^4$, $c_{03}=6/D^4$, each times the appropriate inverse power of the range (Lemma H.1). At rest they are $6,2,2,24,6,6,6$; at the tube source speeds below $0.012$ they are within $5$ percent of these.
2. **A barrier at seed size $0.047$ inside the accepted chart (derived; exact arithmetic).** With the tube sizes and these constants, coefficient $5$: $C_LF\le0.0107939<0.011045$; displacement at most $0.058045\le1/16$ and speed at most $0.186218277\le3/16$. The same solution exists to $T_H(\varepsilon)=\ln(0.047/(0.0983\varepsilon))/2.8033\ge T_N(\varepsilon)+0.2837$ (Theorem H.2).
3. **A barrier at seed size $0.052$ on the chart with caps $(1/12,\,0.3)$ (derived; exact arithmetic).** Coefficient $8$: $C_LF\le0.0213582<0.021632$, displacement at most $0.073632$, speed at most $0.25677$; the same solution exists to $T_{H'}(\varepsilon)=\ln(0.052/(0.0983\varepsilon))/2.8033\ge T_N(\varepsilon)+0.3198$ (Theorem H.3).
4. **Central growth (derived).** For $\varepsilon=10^{-4}$ the central displacement is at least $0.023703$ at $T_H$ (growth factor at least $2608$) and at least $0.016790$ at $T_{H'}$; both lower bounds are positive for every $10^{-37}\le\varepsilon\le0.00646$.
5. **Where this estimate stops (derived; exact certificates).** No barrier at seed size $d\ge0.0482$ inside the accepted chart, and none at $d\ge0.0592$ on any chart with displacement cap below one half and speed cap below one (Proposition H.4).
6. **What is not obtained.** Growth uniform as $\varepsilon\to0$, order-one displacement, the ending of regular evolution and wake-speed arrival. Half the odd sum is still the largest part of the bound, about $57$ percent at the accepted-chart endpoint.

Claim grade: derived for Lemma H.1, Theorems H.2–H.3, Proposition H.4 and the growth bounds, by the hand arguments below, relying on the accepted notes and on the band-envelope (accepted), receiver-cubic (accepted), tube-constant and larger-chart notes (under independent review); numbers by exact rational arithmetic with outward-rounded interval exponentials from a session instrument that passed known cases first, including a sampled finite-difference check of Lemma H.1. Declared lattice sums, contour constants and the linear-inverse norm keep their interval-library conditionality. Falsifiers are in Section 5.

The scenario is unchanged: the Master Equation at $g=16$, unit spacing, $c_f=1$, every member dynamical, every causal root and tail retained, the original eight-source block summation, the contour of radius $1/10$, the accepted seed class, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$, $0<\varepsilon\le0.00646$.

## 1. Derivative bounds for slow sources

Write $\rho=\lvert R\rvert$, $n=R/\rho$, $w=n\cdot v$ and $f(w)=1/(1-w)$. The canonical row factors as
$$
\Psi(R,v)=G(R)\,f(w),\qquad G(R)=\frac{R}{\rho^3}=-\nabla\frac1\rho,
$$
and its velocity derivatives are $\partial_v\Psi[k]=P_k(R)\,f'(w)$ and $\partial_v^2\Psi[k,l]=P_k(R)(n\cdot l)\,f''(w)$, with $P_k(R)=n(n\cdot k)/\rho^2$. The point of the factorization is that every dependence on the source velocity sits in the scalar $f(w)$, whose derivatives in $R$ are proportional to $\lvert v\rvert$, while $G$ and $P_k$ are velocity-free tensors whose derivative norms are known exactly or nearly so.

**Lemma H.1 (derived).** For $R\ne0$, $\lvert v\rvert\le v<1$ and $D=1-v$, as multilinear maps with Euclidean norms, $\lvert\partial_R^2\Psi\rvert\le c_{20}/\rho^4$, $\lvert\partial_R\partial_v\Psi\rvert\le c_{11}/\rho^3$, $\lvert\partial_v^2\Psi\rvert\le c_{02}/\rho^2$, $\lvert\partial_R^3\Psi\rvert\le c_{30}/\rho^5$, $\lvert\partial_R^2\partial_v\Psi\rvert\le c_{21}/\rho^4$, $\lvert\partial_R\partial_v^2\Psi\rvert\le c_{12}/\rho^3$ and $\lvert\partial_v^3\Psi\rvert\le c_{03}/\rho^2$, with
$$
\begin{aligned}
c_{20}&=\frac6D+\frac{(4+s_3)v}{D^2}+\frac{2v^2}{D^3}, & c_{11}&=\frac2{D^2}+\frac{2v}{D^3}, & c_{02}&=\frac2{D^3},\\
c_{30}&=\frac{24}D+\frac{(21+6s_3)v}{D^2}+\frac{(12+6s_3)v^2}{D^3}+\frac{6v^3}{D^4}, & c_{21}&=\frac6{D^2}+\frac{(8+2s_3)v}{D^3}+\frac{6v^2}{D^4}, & c_{12}&=\frac6{D^3}+\frac{6v}{D^4},\\
c_{03}&=\frac6{D^4},
\end{aligned}
$$
where $s_3=1.1548\ge2/\sqrt3$.

*Proof.* *The velocity-free factors.* The $j$-th derivative of $G=-\nabla(1/\rho)$ is the symmetric $(j+1)$-form $-\partial^{j+1}(1/\rho)$, whose value on a repeated unit vector $h$ is $(-1)^j(j+1)!\,P_{j+1}(n\cdot h)/\rho^{j+2}$ with $P_{j+1}$ a Legendre polynomial, $\lvert P_{j+1}\rvert\le1$; the norm of a symmetric form on a Euclidean space is attained on a repeated vector. So $\lvert G\rvert=1/\rho^2$, $\lvert\partial G\rvert=2/\rho^3$, $\lvert\partial^2G\rvert=6/\rho^4$ and $\lvert\partial^3G\rvert=24/\rho^5$. For $P_k$, use the identity $n_in_j/\rho^2=\tfrac12(\delta_{ij}\rho^{-2}-\partial_i\partial_j\log\rho)$. Along a line, $\log\lvert x+th\rvert$ is the real part of $\log(t+c+is)$ with $c^2+s^2=\rho^2$, so its $m$-th derivative has modulus at most $(m-1)!/\rho^m$: the symmetric forms $\partial^2\log\rho$, $\partial^3\log\rho$, $\partial^4\log\rho$ have norms $1/\rho^2$, $2/\rho^3$, $6/\rho^4$. Directly, $\lvert\partial(\rho^{-2})\rvert=2/\rho^3$ and $\partial^2(\rho^{-2})[h,h]=(8(n\cdot h)^2-2)/\rho^4$, of norm $6/\rho^4$. Contracting with unit vectors gives
$$
\lvert P_k\rvert\le\frac1{\rho^2},\qquad\lvert\partial P_k\rvert\le\tfrac12\Bigl(\frac2{\rho^3}+\frac2{\rho^3}\Bigr)=\frac2{\rho^3},\qquad\lvert\partial^2P_k\rvert\le\tfrac12\Bigl(\frac6{\rho^4}+\frac6{\rho^4}\Bigr)=\frac6{\rho^4}.
$$
*The scalar $w=n\cdot v$.* Since $n=\nabla\rho$, $\partial^jn=\partial^{j+1}\rho$. On a line through a point at distance one, $\rho(t)=\sqrt{(t+c)^2+s^2}$ with $c^2+s^2=1$; its second, third and fourth derivatives at $t=0$ are $s^2$, $-3s^2c$ and $-3s^2(s^2-4c^2)$. Their largest moduli are $1$, $2/\sqrt3$ and $3$ (the last at $s^2=1$, since $3u(5u-4)$ lies in $[-2.4,3]$ for $u=s^2\in[0,1]$). So $\lvert\partial w\rvert\le v/\rho$, $\lvert\partial^2w\rvert\le s_3v/\rho^2$ and $\lvert\partial^3w\rvert\le3v/\rho^3$. Also $f^{(j)}(w)=j!/(1-w)^{j+1}\le j!/D^{j+1}$, because $w\le\lvert v\rvert\le v$.

*Derivatives of $f(w)$.* By the chain rule and Faà di Bruno's formula, $\lvert\partial f\rvert\le v/(\rho D^2)$, $\lvert\partial^2f\rvert\le(2v^2/D^3+s_3v/D^2)/\rho^2$ and $\lvert\partial^3f\rvert\le(6v^3/D^4+6s_3v^2/D^3+3v/D^2)/\rho^3$; likewise $\lvert\partial f'\rvert\le2v/(\rho D^3)$ and $\lvert\partial^2f'\rvert\le(6v^2/D^4+2s_3v/D^3)/\rho^2$, and $\lvert\partial f''\rvert\le6v/(\rho D^4)$.

*Assembly by Leibniz' rule.* $\partial^2(Gf)=\partial^2G\,f+2\,\partial G\,\partial f+G\,\partial^2f$ gives $c_{20}$. $\partial(P_kf')=\partial P_k\,f'+P_k\,\partial f'$ gives $c_{11}$. $\partial^3(Gf)=\partial^3G\,f+3\,\partial^2G\,\partial f+3\,\partial G\,\partial^2f+G\,\partial^3f$ gives $c_{30}$: the terms in $v/D^2$ are $18+6s_3+3$, those in $v^2/D^3$ are $12+6s_3$. $\partial^2(P_kf')=\partial^2P_k\,f'+2\,\partial P_k\,\partial f'+P_k\,\partial^2f'$ gives $c_{21}$. For $c_{12}$, $\partial_v^2\Psi[k,l]=Q\,f''(w)$ with $Q=P_k(n\cdot l)$, $\lvert Q\rvert\le1/\rho^2$ and $\lvert\partial Q\rvert\le\lvert\partial P_k\rvert+\lvert P_k\rvert\lvert\partial n\rvert\le3/\rho^3$, so $\lvert\partial(Qf'')\rvert\le(3\cdot2/D^3+6v/D^4)/\rho^3$. Finally $\lvert\partial_v^2\Psi\rvert\le\lvert Q\rvert f''\le2/(\rho^2D^3)$ and $\lvert\partial_v^3\Psi\rvert=\lvert Q(n\cdot m)\rvert f'''\le6/(\rho^2D^4)$. In each product the norm of a mixed-direction term is at most the product of the factors' norms. $\blacksquare$

At $v=0$ the constants $24$ and $6$ for $c_{30}$ and $c_{20}$ are the exact norms; the others are bounds. They do not exceed the accepted Q1 and L.1 constants at any speed checked ($0.01$, $0.1$ and the chart-$1/16$ speed $0.168$), and at the tube source speeds they replace, for example, $c_{21}\approx20.4$ by $6.22$ and $c_{30}\approx34.6$ by $24.5$. Lemma H.1 enters the tube estimate wherever Lemma Q1 and Lemma L.1 did: in Lemmas L.2 and L.3, through Proposition Q4's partial-derivative bounds, with the velocity bound $v_*$ of the tube sizes (Lemma T.1, Lemma G.2). Every coefficient is nondecreasing in $v$, so the scaling and first-crossing arguments are unchanged.

## 2. Barriers

**Theorem H.2 (derived, relying on the accepted notes and the band-envelope, receiver-cubic and tube-constant notes).** Inside the accepted chart, let $F_{\rm H}$ be the tube polynomial of Proposition T.2 with the row constants of Lemma H.1 at $v=v_*$. For $(d_*,K)=(0.047,5)$, $y_*=0.011045$, the declared tube sizes are $p_*\le0.0042011$, $\delta_*\le0.0622461$, $\eta_*\le1.182667$, $s_{1,*}\le0.079865$, $\mu_*\le0.91743$, $v_*\le0.0096617$, receiver coefficient $14.577$, and the row constants are $c_{20}\le6.1096$, $c_{11}\le2.0592$, $c_{02}\le2.0592$, $c_{30}\le24.5111$, $c_{21}\le6.2208$, $c_{12}\le6.2376$, $c_{03}\le6.2376$. In exact arithmetic:

- (a) $d_*+y_*=0.058045\le1/16$, $\bar a(d_*+2y_*)=0.186218277\le3/16$, $\delta_*<1$;
- (b) $C_LF_{\rm H}(d_*,y_*)\le0.0107939<y_*$;
- (c) $C_LF_{\rm H}(d_0,31.9d_0^2)<31.9d_0^2$ with $d_0=0.0006351$, $d_0\le d_*$, $31.9d_0^2\le y_*$.

Consequently, for every $0<\varepsilon\le0.00646$, with $T_H(\varepsilon)=\ln(0.047/(0.0983\varepsilon))/2.8033$, the same complete-past solution exists on $(-\infty,T_H]$, with $\lvert u-\varepsilon\phi\rvert\le y<5\,\tilde\Delta^2$ on $[0,T_H]$; displacements at most $0.058045$, speeds at most $0.18622$, accelerations at most $0.66240$, transmitter factors at least $0.81378$, separations at least $0.88391$, each delay within $0.11609$ of the anchor distance; one causal root per ordered pair and no root on a member's own path; finite spatially weighted size (qualitative). $T_H-T_U=\ln(0.047/0.043)/2.8033\ge0.0317$ and $T_H\ge T_N+0.2837$ at $\varepsilon=0.00646$, the latter difference increasing in $\ln(1/\varepsilon)$. The pair $(0.044,4.5)$ also passes, with $C_LF_{\rm H}\le0.0081452<0.008712$.

**Theorem H.3 (derived, relying in addition on the larger-chart note, including its extension of the receiver lemma to receiver displacements below one half).** On the chart with caps $(1/12,\,0.3)$, with the tube sizes of Lemma G.2 and the constants of Lemma H.1, the pair $(0.052,8)$, $y_*=0.021632$, has declared sizes $\delta_0\le0.156966$, $p_*\le0.0051912$, $\delta_*\le0.0788232$, $\eta_*\le1.236707$, $s_{1,*}\le0.083514$, $\mu_*\le0.91883$, $v_*\le0.0115682$, receiver coefficient $14.762$, and constants $c_{20}\le6.1316$, $c_{11}\le2.0711$, $c_{30}\le24.6143$, $c_{21}\le6.2657$, $c_{12}\le6.2859$, $c_{03}\le6.2859$; and (a) $d_*+y_*=0.073632\le1/12$, $\bar a(d_*+2y_*)=0.2567650592\le0.3$, $\delta_0,\delta_*<1$; (b) $C_LF_{\rm H}\le0.0213582<y_*$; (c) the start as above. Consequently the same solution exists to $T_{H'}(\varepsilon)=\ln(0.052/(0.0983\varepsilon))/2.8033\ge T_N(\varepsilon)+0.3198$, with $\lvert u-\varepsilon\phi\rvert<8\,\tilde\Delta^2$, displacements at most $0.073632$, speeds at most $0.25677$, accelerations at most $1.00636$, transmitter factors at least $0.74323$, separations at least $0.852736$, delays within $0.147264$ of the anchor distance, one causal root per ordered pair and no own-path root. The pair $(0.050,6.5)$ also passes, with $C_LF_{\rm H}\le0.0157858<0.01625$.

*Proofs.* Those of Theorems T.3 and G.3 with Lemma H.1's constants in place of Lemma Q1's and Lemma L.1's; every coefficient stays nonnegative (checked) and the tube sizes, start and first-crossing argument are unchanged. The bounds of items follow from $d_*+y_*$, $\bar a(d_*+2y_*)$ and $\bar a^2(d_*+4y_*)$. $\blacksquare$

**Central growth.** By Proposition B.7 with these coefficients, at the endpoints, with lower bounds rounded down and upper bounds up (time-zero bound $\varepsilon\bar P+4.5(0.0983\varepsilon)^2$ from the start of the pair $(0.044,4.5)$):

| $\varepsilon$ | $T_H\ge$ | $\lvert u_0(T_H)\rvert\ge$ | factor $\ge$ | $T_{H'}\ge$ | $\lvert u_0(T_{H'})\rvert\ge$ | factor $\ge$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $0.00646$ | $1.5354$ | $0.024545$ | $41.6$ | $1.5714$ | $0.017721$ | $30.1$ |
| $10^{-3}$ | $2.2009$ | $0.024166$ | $265$ | $2.2369$ | $0.017302$ | $190$ |
| $10^{-4}$ | $3.0223$ | $0.023703$ | $2608$ | $3.0583$ | $0.016790$ | $1848$ |
| $10^{-6}$ | $4.6650$ | $0.022796$ | $2.50\times10^5$ | $4.7011$ | $0.015787$ | $1.73\times10^5$ |
| $10^{-8}$ | $6.3078$ | $0.021913$ | $2.41\times10^7$ | $6.3439$ | $0.014811$ | $1.63\times10^7$ |
| $10^{-12}$ | $9.5933$ | $0.020215$ | $2.22\times10^{11}$ | $9.6294$ | $0.012933$ | $1.42\times10^{11}$ |

Both lower bounds increase with $\varepsilon$ and are positive at $10^{-37}$ (at least $0.011415$ and $0.003202$), hence on $[10^{-37},0.00646]$. Relative to the seed-size bound they still carry a factor proportional to $\varepsilon^{0.00574}$.

## 3. Where this estimate stops

**Proposition H.4 (derived; exact certificates).** With the constants of Lemma H.1, (i) inside the accepted chart there is no barrier at any seed size $d\ge0.0482$, for any coefficient; (ii) on every chart with displacement cap below one half and speed cap below one there is none at any $d\ge0.0592$.

*Proof.* As Propositions T.5 and G.4, with lower envelopes built from the exact Lemma H.1 formulas at the lower source speed $\bar a\mu ds_1$ (nondecreasing in $v$), lower interval endpoints and receiver coefficient $c_3$: for (i) the delay is at least $d+\tilde\mu_0ds_{1,0}$ and $y\le\min\{1/16-d,(3/(16\bar a)-d)/2\}$, with certificate upper bound below $-8.34\times10^{-6}$ at $d=0.0482$; for (ii) the delay is at least $d$ and $y<(1/\bar a-d)/2$, with upper bound below $-1.23\times10^{-4}$ at $d=0.0592$. Monotonicity in $d$ extends both. $\blacksquare$

At the accepted-chart endpoint the three parts of $C_LF_{\rm H}$ are about $0.006115$ for half the odd sum, $0.002888$ for the brackets and $0.001791$ for the receiver cubic.

## 4. Instrument, evidence and the reference boundary

[`sharp_barrier.py`](../evidence/saturday-lattice-growth-2026-10-20/sharp_barrier.py), described in the [evidence README](../evidence/saturday-lattice-growth-2026-10-20/README.md), imports the larger-chart instrument unchanged and through it the tube-constant, band-envelope and frozen accepted instruments; it changes only the seven row constants of the parameter dictionary. Known cases, run before the instrument's targets (a separate exploratory script with its own implementation of the same formulas had evaluated candidate pairs before the instrument was written): the rest values $(6,2,2,24,6,6,6)$; the new constants below the Q1 and L.1 constants at three speeds; a sampled finite-difference check at $400$ random arguments with source speeds up to $0.03$, in which the ratios of the sampled derivatives to the Lemma H.1 bounds stay below one (largest $0.975$ for $c_{20}$ and $0.961$ for $c_{30}$, whose rest values are exact, so values near one are expected); and the tube-constant endpoint value reproduced through the same builder with the old constants. The finite-difference check is a sample, not a proof. The flag aggregates the ladder conditions and the growth positivity, not the certificates.

## 5. Falsifiers and limits

- Lemma H.1: an argument $(R,v)$ with $\lvert v\rvert<1$ and unit directions at which a derivative of $\Psi$ exceeds its stated bound; an error in the Legendre, logarithm or $\partial^j\rho$ norms used.
- Theorems H.2–H.3: an exact evaluation in which (a), (b) or (c) fails with the declared constants; a complete-past solution of the family that violates one of their bounds before the stated time. A finite-onset run from the seed alone does not test this.
- Proposition H.4: a seed size above the stated value and $y$ within the stated range with $y\ge C_LF_{\rm H}(d,y)$ for admissible tube constants.

Limits: every limit of the earlier notes of this round is inherited, including the dependence of Theorem H.3 on the larger-chart lemma; the declared pairs are passing choices; the certificates bound this estimate, not the solution; the central lower bound is not uniform as $\varepsilon\to0$; and order-one displacement, the ending of regular evolution and wake-speed arrival are not addressed.
