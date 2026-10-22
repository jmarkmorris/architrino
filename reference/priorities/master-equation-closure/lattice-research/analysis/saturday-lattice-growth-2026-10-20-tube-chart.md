# Route (a) for the tube estimate: Lemma E.1 on a larger chart and a barrier at seed size 0.0465 (2026-10-20)

## Result

**In words.** In the [tube-constant note](saturday-lattice-growth-2026-10-20-tube.md) the constants of the estimate for the localized disturbance of the alternating lattice are evaluated at the actual receiver and source sizes; the chart enters them only through the a priori delay window used to bound the source displacement, and otherwise through the caps under which the accepted Lemma E.1 and the root census were stated, displacements at most $1/16$ and speeds at most $3/16$. Those caps are what stop the tube barrier at about $0.044$. On a larger chart the a priori window becomes $A_*+\rho_c$, which feeds the source-displacement bound $p_*$ and the refined tube parameters, so the constants keep a mild dependence on the displacement cap $\rho_c$. This note does the qualitative part of route (a): it checks that Lemma E.1, the root census and the continuation alternative hold, with the same proofs, for any chart whose displacement cap is below one half and whose speed cap is below one. On the chart with caps $1/12$ and $0.3$ the tube barrier then passes at seed size $0.0465$.

1. **Lemma E.1 on any subwake chart (derived).** The proof of Lemma E.1 uses its caps $1/16$ and $3/16$ only through the root census, the forward note's Lemma 1 and the reduction of the equation to its linear part plus remainder; all three are established for every chart with displacement cap $\rho_c<1/2$ and speed cap $\varpi_c<1$ (Lemma G.1).
2. **Tube sizes on such a chart (derived).** Lemma T.1 holds with its a priori delay bound $1/8$ replaced by $A_*+\rho_c$ (Lemma G.2).
3. **A barrier at seed size $0.0465$ (derived; exact arithmetic).** On the chart with caps $(1/12,\,0.3)$, with coefficient $9.5$: $C_LF_{\rm tube}(0.0465,0.020541375)\le0.0204290<0.020541375$, displacement at most $0.067041375\le1/12$, speed at most $0.2360618\le0.3$. The same solution exists to
   $$
   T_V(\varepsilon)=\frac1{2.8033}\ln\frac{0.0465}{0.0983\,\varepsilon}\ \ge\ T_U(\varepsilon)+0.0279\ \ge\ T_N(\varepsilon)+0.2799 ,
   $$
   with $\lvert u-\varepsilon\phi\rvert<9.5\,\tilde\Delta^2$, displacements at most $0.067042$, speeds at most $0.23607$, separations at least $0.865917$, one causal root per ordered pair and no root on a member's own path (Theorem G.3). For $\varepsilon=10^{-4}$, $T_V\ge3.0185$ and the central displacement there is at least $0.013839$.
4. **No chart reaches seed size $0.0526$ (derived; exact certificate).** For every chart with $\rho_c<1/2$ and $\varpi_c<1$ the tube estimate admits no barrier at any seed size $d\ge0.0526$ (Proposition G.4). The certificate uses a coarse lower envelope, so the gap to the reached $0.0465$ is not closed.
5. **What is not obtained.** Growth uniform as $\varepsilon\to0$, order-one displacement, the ending of regular evolution and wake-speed arrival. The half odd sum is about $60$ percent of the bound at the endpoint; it is the remaining lever.

Claim grade: derived for Lemma G.1, Lemma G.2, Theorem G.3 and Proposition G.4 by the hand arguments below, relying on the accepted notes and on the band-envelope (accepted), receiver-cubic and tube-constant notes (under independent review); numbers by exact rational arithmetic with outward-rounded interval exponentials, from a session instrument that passed known cases first. Declared lattice sums, contour constants and the linear-inverse norm keep their interval-library conditionality. Falsifiers are in Section 5.

The scenario is unchanged: the Master Equation at $g=16$, unit spacing, $c_f=1$, every member dynamical, every causal root and tail retained, the original eight-source block summation, the contour of radius $1/10$, the accepted seed class, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$, $0<\varepsilon\le0.00646$.

## 1. Lemma E.1 on a larger chart

A *chart with caps* $(\rho_c,\varpi_c)$, $0<\rho_c<1/2$, $0<\varpi_c<1$, is the set of histories with every displacement at most $\rho_c$, every speed at most $\varpi_c$ and bounded accelerations; this is the forward note's chart $(\rho,\varpi)$.

**Lemma G.1 (derived).** Let $0\le t<T_{\max}$ and suppose that on $(-\infty,t]$ the solution lies in a chart with caps $(\rho_c,\varpi_c)$. Then the conclusions of Lemma E.1 hold: $y(t)$ is finite, $y$ is continuous on every interval on which the hypothesis holds, $\tilde v^t=(I-\mathcal Jg\mathcal K)^{-1}\mathcal J\mathcal N[\tilde u^t]$, and $y(t)\le C_L\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}$. Each ordered pair of distinct members has one causal root, no member has a root on its own path, and the forward note's Theorem 1 and maximal-continuation remark apply.

*Proof.* The proof of Lemma E.1 has three steps, and each rests on facts proved for general charts. (i) Finiteness: on $[0,t]$ the accelerations are bounded uniformly in the member by the forward note's Lemma 1, which is stated for every chart $(\rho,\varpi)$ with $\rho\le\rho'<1/2$ and $\varpi<1$; before time zero the accepted correction is in the rate-$2a$ space. (ii) Continuity: the acceleration $\mathcal G_j(T,u_j(T))$ is jointly Lipschitz in time and position uniformly in $j$, again by the forward note's Lemma 1 for the chart, and the seed's third derivative is bounded by its contour formula. (iii) The identity: the forward note's Lemma 1 shows, for every such chart and every receiver displacement below one half, that each source has exactly one emission time and that the block-prescribed sum of all rows equals $g\{E(\alpha)+\sum_d\sigma_d[\Psi(d+\alpha-u_{i-d}(s),u_{i-d}'(s))-\Psi(d+\alpha,0)]\}$ with both sums absolutely convergent; subtracting the absolutely summable linear source terms $T_d u_{i-d}(T-r)+B_du'_{i-d}(T-r)$, whose sum converges with the factor $e^{-ar}$ from past decay, gives $\tilde u''=g\mathcal K\tilde u+\mathcal N[\tilde u]$ on $T\le0$. The forcing $\mathcal N[\tilde u^t]$ has finite rate-$2a$ norm, by the row-remainder bounds of the quantification note in the substitution form of the extension note's Lemma X3, whose steps use the chart only through the chart facts below. The series inverse of the preparation note's Lemma 1 is independent of the chart. The root census, $D\ge1-\varpi_c$, the delay within $2\rho_c$ of the anchor distance and separations at least $1-2\rho_c$ are the forward note's chart facts, proved there for general $(\rho,\varpi)$, and the speed cap below one excludes own-path roots; the emission at zero delay is excluded by the canonical convention. The forward note's Theorem 1 is stated for general charts. $\blacksquare$

The accepted Lemma E.1 states its caps as $1/16$ and $3/16$ because it cites the preparation note's reduction, which was written for histories of unweighted norm at most $1/16$ with $a\le3$. The proof above does not use that citation: the forward note's Lemma 1 supplies the reduction directly for every subwake chart.

## 2. Tube sizes on a chart with caps $(\rho_c,\varpi_c)$

**The receiver lemma for larger displacements.** Lemma R.1 of the receiver-cubic note is stated for $\lvert\alpha\rvert\le\rho\le1/16$, and the tube receiver coefficient uses it with $\rho=A_*$, which exceeds $1/16$ on the chart below. Its proof extends without change to every $0<\rho<1/2$: on the Taylor segment $\lvert d+\theta\alpha\rvert\ge r-\rho\ge(1-\rho)r>0$ for $r\ge1$, so the fifth-order remainder is at most $6\lvert\alpha\rvert^5/((1-\rho)r)^7$ and sums to $6Z_7(1-\rho)^{-7}\lvert\alpha\rvert^5$; the series of the second- and fourth-order terms converge absolutely, so the parity cancellation holds; and the cubic tensor $H$ does not depend on $\alpha$ or $\rho$, so its symmetry reduction and the norm bound $\lvert3\lvert\alpha\rvert^2\alpha-5\alpha^{\circ3}\rvert\le2\lvert\alpha\rvert^3$ are unchanged. Hence $\lvert E(\alpha)\rvert\le c_3\lvert\alpha\rvert^3+6Z_7(1-\rho)^{-7}\lvert\alpha\rvert^5$ for $\lvert\alpha\rvert\le\rho<1/2$, and the receiver coefficient $c_3+6Z_7(1-A_*)^{-7}A_*^2$ of Proposition T.2 is valid for every $A_*<1/2$.

**Lemma G.2 (derived).** Let $d_*>0$ and $y_*\ge0$ be declared sizes with $d_*+y_*\le\rho_c$, $\bar a(d_*+2y_*)\le\varpi_c$, $\delta_0<1$ and $\delta_*<1$ for the quantities below. Then Lemma T.1 of the tube-constant note, including its items on the signed pure-seed comparison histories, holds for a solution in a chart with caps $(\rho_c,\varpi_c)$, with the conditions $d_*+y_*\le1/16$, $\bar a(d_*+2y_*)\le3/16$ replaced by these and its a priori quantities replaced by
$$
\delta_0=A_*+\rho_c,\quad\eta_0=e^{\bar a\delta_0},\quad s_{1,0}=\eta_0e^{-a},\quad\mu_0=e^{-(\underline\lambda-a)(1-\delta_0)},\quad p_*=\mu_0d_*s_{1,0}+y_*s_{1,0}^2;
$$
the refined quantities $\delta_*=A_*+p_*$, $\eta_*$, $s_{1,*}$, $\mu_*$, $v_*$ are defined as there, $v_*<1$ when $\varpi_ce^{0.0002}<1$, and Proposition T.2 holds with them.

*Proof.* In step (2) of Lemma T.1, the a priori delay bound now comes from $\lvert\tau-r\rvert\le\lvert\alpha\rvert+\lvert p\rvert\le A_*+\rho_c$, using step (1) for the receiver and the displacement cap for the source; the root census is that of the chart (Lemma G.1). Every source time then lies below $-(1-\delta_0)$, Corollary B.3's proof with $L=1-\delta_0$ gives the factor $\mu_0$, and $e^{aT'}\le Xs_{1,0}$ gives the bound $p_*$. For a comparison history $\pm\bar\Phi$ the displacement is at most $d_*\le\rho_c$ and the speed at most $\bar ad_*\le\varpi_c$, so the configuration with receiver $\pm\alpha$ lies in the chart, and the same two-step window argument applies. Step (6) of Lemma T.1 holds whenever $\varpi_ce^{0.0002}<1$, because $\delta_*<1$ gives $s_{1,*}<e^{0.0001}$ and then $v_*\le\bar a(d_*+2y_*)\max\{s_{1,*},s_{1,*}^2\}<\varpi_ce^{0.0002}$; for the chart used below, $v_*\le0.0102$. The remaining steps of Lemma T.1 do not refer to the caps, and the proof of Proposition T.2 refers to them only through the receiver lemma, whose extension to $A_*<1/2$ is given above. $\blacksquare$

With $\rho_c=1/16$ the new a priori delay $A_*+1/16$ is at most the old $1/8$ whenever $A_*\le1/16$, so Lemma G.2 reproduces or improves the tube-constant note's sizes on the accepted chart.

## 3. A barrier at seed size $0.0465$

**Theorem G.3 (derived, relying on the accepted notes and the band-envelope, receiver-cubic and tube-constant notes).** Take the chart with caps $(\rho_c,\varpi_c)=(1/12,\,0.3)$. Let $d_*=0.0465$, $K=9.5$, $y_*=Kd_*^2=0.020541375$, $d_0=0.0006351$, and let $F_{\rm tube}$ be the polynomial of Proposition T.2 with the sizes of Lemma G.2. The declared sizes are $\delta_0\le0.150375$, $p_*\le0.0045664$, $\delta_*\le0.0716078$, $\eta_*\le1.212889$, $s_{1,*}\le0.081906$, $\mu_*\le0.91822$, $v_*\le0.0101688$ and receiver coefficient $14.675$, with row constants $c_{20}\le7.0827$, $c_{11}\le3.0621$, $c_{02}\le2.0623$, $c_{30}\le34.6137$, $c_{21}\le20.4353$, $c_{12}\le12.3741$, $c_{03}\le6.2504$. In exact arithmetic on these values:

- (a) $d_*+y_*=0.067041375\le1/12$, $\bar a(d_*+2y_*)=0.236061786075\le0.3$, $\delta_0\le0.150375<1$ and $\delta_*\le0.0716078<1$, so the sizes satisfy the hypotheses of Lemma G.2;
- (b) $C_LF_{\rm tube}(d_*,y_*)\le0.0204290<y_*$;
- (c) $C_LF_{\rm tube}(d_0,31.9d_0^2)<31.9d_0^2$, with $d_0\le d_*$ and $31.9d_0^2\le y_*$.

Consequently, for every $0<\varepsilon\le0.00646$, with $T_V(\varepsilon)=\ln(d_*/(0.0983\varepsilon))/2.8033$:

1. the unique charted continuation of $u^\varepsilon$ exists on $(-\infty,T_V]$; it is the same solution, with the same complete past;
2. for $0\le T\le T_V$, $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert\le y(T)<9.5\,\tilde\Delta(T)^2$, with the first two derivatives of the difference below $2a$ and $(2a)^2$ times that;
3. on $(-\infty,T_V]$: displacements are at most $0.067042$, speeds at most $0.23607$, accelerations at most $0.93471$, transmitter factors at least $0.76393$, separations at least $0.865917$, and each delay is within $0.134083$ of the anchor distance; one causal root per ordered pair and no root on a member's own path;
4. finite spatially weighted size for every weight exponent up to $T_V$ (qualitative);
5. $T_V-T_U=\ln(0.0465/0.043)/2.8033\ge0.0279$, and $T_V\ge T_N+0.2799$ at $\varepsilon=0.00646$, the difference from $T_N$ increasing with $\ln(1/\varepsilon)$.

The pairs $(0.040,5)$ and $(0.043,6.5)$ satisfy (a)–(c) on the same chart, with $C_LF_{\rm tube}$ at most $0.0079700$ and $0.0117269$ against $0.008$ and $0.0120185$.

*Proof.* The proof of Theorem T.3 applies with Lemma G.1 in place of Lemma E.1 and Lemma G.2 in place of Lemma T.1: along the first-crossing argument and at the start the sizes are at most $(d_*,y_*)$, so the solution stays within the caps $(1/12,\,0.3)$, the tube constants apply, and $y(t)\le C_LF_{\rm tube}(\tilde\Delta(t),y(t))$. The items follow from $d_*+y_*$, $\bar a(d_*+2y_*)$, $\bar a^2(d_*+4y_*)=0.934708\ldots$ and the chart facts. $\blacksquare$

| $\varepsilon$ | $T_V\ge$ | gain over $T_N\ge$ | $\lvert u_0(T_V)\rvert\ge$ | $\sup_j\lvert u_j(0)\rvert\le$ | growth factor $\ge$ |
| ---: | ---: | ---: | ---: | ---: | ---: |
| $0.00646$ | $1.5316$ | $0.2799$ | $0.014672$ | $5.882\times10^{-4}$ | $24.9$ |
| $10^{-3}$ | $2.1971$ | $0.3011$ | $0.014297$ | $9.088\times10^{-5}$ | $157$ |
| $10^{-4}$ | $3.0185$ | $0.3272$ | $0.013839$ | $9.086\times10^{-6}$ | $1523$ |
| $10^{-6}$ | $4.6612$ | $0.3794$ | $0.012942$ | $9.086\times10^{-8}$ | $1.42\times10^5$ |
| $10^{-8}$ | $6.3040$ | $0.4316$ | $0.012068$ | $9.086\times10^{-10}$ | $1.32\times10^7$ |
| $10^{-12}$ | $9.5895$ | $0.5360$ | $0.010388$ | $9.086\times10^{-14}$ | $1.14\times10^{11}$ |

The central lower bound $\varepsilon p_0e^{\underline\lambda T}-9.5\tilde\Delta(T)^2$ at $T_V$ is smaller than at the tube-constant endpoint, because the larger coefficient costs more than the later time gains; it remains positive for every $10^{-37}\le\varepsilon\le0.00646$ (at least $0.001681$ at $10^{-37}$). The time-zero bound uses the smallest coefficient $3$ of the tube-constant ladder, whose start argument holds on the accepted chart and hence here.

## 4. No chart reaches seed size $0.0526$

**Proposition G.4 (derived; exact certificate).** For every chart with caps $\rho_c<1/2$ and $\varpi_c<1$, every seed size $d\ge0.0526$ and every $y\ge0$ with $\bar a(d+2y)<1$, $y-C_LF_{\rm tube}(d,y)<0$ for the tube constants of any admissible sizes $(d_*,y_*)\ge(d,y)$. So no chart and no coefficient give a tube barrier at seed size $0.0526$ or above.

*Proof.* The tube quantities, including the a priori ones, the row constants, the reciprocal range factor $1/\kappa_*$ and the receiver coefficient are nondecreasing in $(d_*,y_*)$ and in $\rho_c$, while $\kappa_*$ itself decreases and enters only through reciprocal powers; and $\delta_*\ge A_*\ge d$. Hence each coefficient is at least the one built from the exact formulas with delay $d$, source displacement $0$, correction $0$ and source speed $\bar a\mu d\,s_1$, evaluated with lower interval endpoints and no upward rounding; the receiver coefficient is at least $c_3$. A speed cap below one forces $y<(1/\bar a-d)/2$. On $[0,(1/\bar a-0.0526)/2]$ the concave-maximum certificate gives the upper bound $-2.72\times10^{-6}$ at $d=0.0526$, and it extends to larger $d$ as in Proposition T.5. $\blacksquare$

The envelope drops the source displacement and the correction from every size and allows $y$ up to about $0.16$, so it is coarse; the gap between the reached $0.0465$ and $0.0526$ is not closed. At the declared endpoint the three parts of $C_LF_{\rm tube}$ are about $0.012354$ for half the odd sum, $0.005296$ for the brackets and $0.002778$ for the receiver cubic.

## 5. Instrument, falsifiers and limits

[`tube_chart.py`](../evidence/saturday-lattice-growth-2026-10-20/tube_chart.py), described in the [evidence README](../evidence/saturday-lattice-growth-2026-10-20/README.md), imports the tube-constant instrument unchanged and builds the chart-aware sizes of Lemma G.2. Known cases, run before the instrument's formal target loop (an exploratory script that imported the instrument's functions had evaluated the same chart configurations before the formal run, without calling its main routine): the tube-constant endpoint value $C_LF_{\rm tube}(0.043,0.0120185)=0.01171679\ldots$ reproduced through the frozen code; the chart-aware a priori sizes for $\rho_c=1/16$ no larger than the accepted-chart ones; and the lower envelope of Proposition G.4 below the chart-aware constants at sizes $(0.046,0)$. Its flag aggregates the barrier conditions and the positivity of the growth bound, not the certificate, which is recorded separately. Nothing is computed on a history.

Falsifiers:

- Lemma G.1: a step of Lemma E.1's proof that uses the caps $1/16$ or $3/16$ beyond the root census, the forward note's Lemma 1 and the reduction; or a charted history with caps below one half and one for which the reduction fails.
- Lemma G.2 and Theorem G.3: an exact evaluation in which (a), (b) or (c) fails with the declared constants; a complete-past solution of the family that violates a bound of items 2 or 3 before $T_V$. A finite-onset run from the seed alone does not test this.
- Proposition G.4: a chart, a seed size $d\ge0.0526$ and $y$ with $\bar a(d+2y)<1$ and $y\ge C_LF_{\rm tube}(d,y)$ for some admissible tube constants.

Limits: every limit of the earlier notes of this round is inherited; the caps $(1/12,\,0.3)$ are one declared choice; the obstruction concerns this estimate, not the solution; the central lower bound is not uniform as $\varepsilon\to0$; and order-one displacement, the ending of regular evolution and wake-speed arrival are not addressed.
