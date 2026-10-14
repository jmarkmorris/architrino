# The localized lattice family beyond its guaranteed time: a larger proved interval (2026-10-12)

## Result

**In words.** The [quantification note](saturday-localized-forward-quantification-2026-10-11.md) followed the localized disturbance of the alternating lattice, with its complete nonlinear past, up to a guaranteed time $T_*(\varepsilon)$, at which every displacement is still below $7.79\times10^{-4}$ of a lattice spacing. This note proves that the same solution continues, with all its margins, for a further time of at least $0.673$ whatever the amplitude, to displacements of up to $6.07\times10^{-3}$ of a spacing. It does so without changing the family, the contour, the seed class or the law. The gain comes from three places where the earlier argument was more cautious than it needed to be, and the note states exactly where the present argument stops.

1. **The fixed-point argument needs less than was asked of it (derived).** The earlier construction of the correction required five inequalities. Three suffice for existence, uniqueness and the matching of the prescribed past: the ball of corrections is mapped into itself, the map contracts on it, and the histories stay in the chart (Lemma X1). With the *accepted* constants and no new computation, the seed-norm threshold rises from $7.4\times10^{-4}$ to $\delta_A=1.7\times10^{-3}$, and the guaranteed time by at least $0.287$ (Proposition X2).
2. **The constants are smaller in the norm and on the tube actually used (derived; numbers by outward-rounded evaluation).** The construction runs in the norm without spatial weight, but the accepted constants paid for a spatial weight and were computed on a chart of radius $1/16$, some eighty times larger than the displacements reached. Without the weight and on a chart of radius $1/100$, the product and Lipschitz constants are $C_N\le289.9$ and $C_N'\le303.9$ (in place of $849.2$ and $1023.8$), and the linear inverse has norm $C_L\le0.03927$ (Lemma X3).
3. **A larger interval for the same solution (derived).** With these, the threshold is $\delta_1=5.2\times10^{-3}$, seven times the earlier one. For every amplitude $0<\varepsilon\le6.46\times10^{-3}$ the constructed history $u^\varepsilon$ continues uniquely at least to
   $$
   T_B(\varepsilon)=\frac1{2.8953}\ln\frac{5.2\times10^{-3}}{0.1144\,\varepsilon}\ \ge\ T_*(\varepsilon)+0.673 ,
   $$
   and on $0\le T\le T_B$ it differs from the linear seed by at most $31.9\,(0.1144\,\varepsilon\,e^{2.8953\,T})^2$, a correction that is at most $16.6$ percent of the seed-norm bound at the end of the interval. Displacements stay below $1/100$ (in fact below $6.07\times10^{-3}$), speeds below $0.027$, separations above $0.98$, every ordered pair has one causal root and no member has a root on its own path (Theorem X5). For $\varepsilon=10^{-4}$: $T_B\ge2.113$ against $T_*\le1.441$.
4. **Growth over the larger interval (derived).** At $T_B$ the central member's displacement is at least $1.40\times10^{-3}$ for $\varepsilon=10^{-4}$, a growth by a factor of at least $122$ from time zero (the earlier figure was $28.9$ at $T_*$). The lower bound is positive at $T_B$ for the amplitudes $10^{-3}$ to $10^{-8}$ in the table and not at $10^{-12}$ (Proposition X6).
5. **Spatial localization is kept (derived).** The continued disturbance still decays in space faster than any power at each time up to $T_B$; this needs a weighted constant on the smaller chart, $C_N^\omega\le382.6$ (Proposition X7).
6. **Where this argument stops, and what is not obtained.** With these constants and the chart of radius $1/100$, the three conditions cannot be met for a seed norm above $5.444\times10^{-3}$, whatever radius is chosen for the correction ball; if the chart condition is set aside, the other two conditions stop at about $5.48\times10^{-3}$ (Section 7). That is the limit of one sufficient method, not an event in the solution. Displacements of order one, the manner in which regular evolution ends, arrival at wake speed and its rate remain open, and no growth is established uniformly as $\varepsilon\to0$.

| Quantity | Meaning | Quantification note | Accepted constants, re-chosen radii | Unweighted norm, chart $1/100$ |
| --- | --- | ---: | ---: | ---: |
| $C_N$, $C_N'$ | product and Lipschitz constants | $849.2$, $1023.8$ | same | $289.9$, $303.9$ |
| $C_L$ | norm of the linear inverse | $0.04099$ | same | $0.03927$ |
| $c=C_LC_N$, $c'=C_LC_N'$ | | $34.81$, $41.97$ | same | $11.39$, $11.94$ |
| seed-norm threshold | | $\delta_0=7.4\times10^{-4}$ | $\delta_A=1.7\times10^{-3}$ | $\delta_1=5.2\times10^{-3}$ |
| correction ball | | $\varrho_0=1.8\times10^{-4}$ | $\varrho_A=2.7\times10^{-4}$ | $\varrho_1=8.6\times10^{-4}$ |
| correction coefficient | $\lvert u-\varepsilon\phi\rvert\le K\,(\text{seed norm})^2$ | $69.7$ | $93.5$ | $31.9$ |
| gain in guaranteed time | | $0$ | $\ge0.287$ | $\ge0.673$ |
| largest displacement on the interval | | $7.79\times10^{-4}$ | $1.98\times10^{-3}$ | $6.07\times10^{-3}$ |

**Claim grade.** Every statement is a hand derivation of one session. The [Codex review](saturday-localized-forward-extension-codex-review-2026-10-12.md) reconstructs Lemma X1, the substitutions of Lemma X3, the matching of Theorem X5 and the absorption of Proposition X7 separately, checks the declared arithmetic with its own exact-rational audit, and requested the four corrections LEX1 to LEX4 incorporated here. The numbers rest on two session instruments that passed known cases first; they enclose lattice sums by interval arithmetic and carry everything else in exact rational arithmetic with outward rounding. The lattice-sum enclosures depend on the interval library's outward rounding, which neither the instruments nor the review certifies. Nothing is measured on solutions: no history, correction or evolution is computed. Agreement of the instruments with the derivations is not independent evidence.

Everything is for the unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, the full alternating population with every member dynamical, every causal root retained, the original eight-source block summation, the contour of radius $1/10$, the seed class of the quantification note, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$. A run started at a finite time from the linear seed, a fixed exterior, a finite population or a copied coherent trajectory is a different preparation.

## 1. Setting, sources and reading limits

This is task 1 of the [continuation round](../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md). **Coverage of the reading, stated exactly.** Read in full on 2026-10-12: the accepted quantification note. Read in part: the accepted [forward-evolution note](saturday-localized-forward-evolution-2026-10-11.md), its Sections 1 to 4 through Theorem 2 and the paragraph on the structure behind it (not its Result, nor Sections 5 to 11); the accepted [preparation note](saturday-localized-nonlinear-preparation-2026-10-10.md), from its Setting through Lemma 2, and the statement and proof of its theorem with the paragraphs on the map and on time translation that follow (not its Result, seed section, verdicts, instruments or limits). Of the three Codex reviews: the [quantification review](saturday-localized-forward-quantification-codex-review-2026-10-11.md), its sections on the nonlinear product, the fixed-radius construction and its final disposition; the [forward-evolution review](saturday-localized-forward-evolution-codex-review-2026-10-11.md), its section on matching the prescribed past; of the [preparation review](saturday-localized-nonlinear-preparation-codex-review-2026-10-10.md), only the list of headings. All six were read in full on 2026-10-11 for the earlier task. The lane README was read in full and the queued item "Continue the localized nonlinear family beyond its guaranteed interval" in full; the rest of the queue, the manuscript and the Master Equation source were not reread, and the row and the two resting-lattice cancellations are taken from the accepted notes as stated there. Partial rereads are partial; nothing here depends on a passage that was not read on one of the two days.

**Additional reading after the review (2026-10-12, 18:31Z to 18:33Z; finding LEX3).** The paragraph above records the coverage when the note was first returned, and is left as it was. The launch asked for more, and it was completed afterwards: the remaining parts of the forward-evolution note (its Result and Sections 5 to 11), of the preparation note (its Result, the seed section, the two controls, the verdict table, other couplings and seeds, instruments, limits, falsifiers and proposed tracker text), of the quantification review (its disposition, the row-derivative and contour reconstructions, QF1 to QF6 and the correction verification) and of the forward-evolution review (its disposition, the step and weighted-evolution reconstructions, V1 to V5 and the corrected-byte disposition), and the whole of the preparation review. With the first reading, all six accepted files have now been read in full on 2026-10-12. Also read: the current collaboration protocol in full (SHA-256 `9f9856bb…7a2a`; it had changed since the full reading of 2026-10-11, in its section on how Codex addresses a named chat, which does not alter this session's conduct); of the Master Equation source (SHA-256 `a3fa7047…5267`, unchanged since 2026-10-11), the per-hit acceleration with its separation, direction and polarity definitions, the note on interaction structure, the total-acceleration section with the boxed equation and the partner and self-hit split, the Heaviside convention excluding the emission at zero delay, and the scaling and normalization passage, in addition to the transmitter-side factor, weight and direction-and-sign passages read on 2026-10-11 from the same bytes; the lattice manuscript's Sections 1.1 and 1.30 in full; and the lattice queue, of which lines longer than 1,300 characters were seen only to that length. The queue's bytes changed during this session (another item was added by another writer); it was not edited here. *Consequence:* none for the mathematics. The row used is the canonical one with $c_f=1$ and $\kappa\lvert q_iq_j\rvert=g$; below wake speed the self-hit set is empty apart from the excluded zero-delay emission, as item 3 of Theorem X5 states; the resting cancellation is the manuscript's Section 1.1; the forward note's own record that enlarging the contraction fails at the Lipschitz constant (its Section 8) agrees with Section 7 here; and the preparation note's remark that the chart bounds may be replaced by any radius with $a\rho<\tfrac14$ covers the chart $1/100$. The manuscript's Section 1.30 still quotes the earlier interval, which is correct as far as it goes; it was not edited.

**Notation** is that of the three notes. $\rho_0=1/16$; $a\in(2.6952,2.6953)$ is the left edge of the contour of radius $1/10$ and $\lambda_+<2.8953$ its right edge; $\lVert\cdot\rVert_a$ is the history norm on $T\le0$ *without* spatial weight unless a weight is named; $S_p(x)=\sum_{d\ne0}e^{-xr}/r^p$; $\mathcal N$, $\mathcal K$, $\mathcal J$, $\Psi$, $E$ as defined there; $\bar\Lambda_0=0.1144$, $p_0=0.0763$, $\theta=0.9308$, $\delta_0=7.4\times10^{-4}$, $\varrho_0=1.8\times10^{-4}$, $\varepsilon_0=6.46\times10^{-3}$ are the declared values of the quantification note. For $v$ in the space at rate $2a$, $\lVert v\rVert_a\le4\lVert v\rVert_{2a}$ (preparation note). As in the quantification note, every displayed decimal is a declared bound rounded in the safe direction.

## 2. The fixed point with three conditions

**Lemma X1 (derived).** Let $0<\rho\le\rho_0$ be a chart radius, and let $c\ge C_LC_N$ and $c'\ge C_LC_N'$, where $C_L$ bounds the linear inverse at rate $2a$ and $C_N$, $C_N'$ are product and Lipschitz constants of the remainder valid for all histories of unweighted norm at most $\rho$. Let $\delta>0$ and $\varrho>0$ satisfy

$$
\text{(I)}\quad c\,(\delta+4\varrho)^2\le\varrho,\qquad
\text{(II)}\quad 8\,c'\,(\delta+4\varrho)<1,\qquad
\text{(III)}\quad\delta+4\varrho\le\rho .
$$

Then for every real $\psi$ with $\psi''=g\mathcal K\psi$ on $T\le0$ and $\lVert\psi\rVert_a\le\delta$ there is exactly one $v$ with $\lVert v\rVert_{2a}\le\varrho$ such that $\psi+v$ solves the Master Equation on $T\le0$. Moreover, with $K=\varrho/\delta^2$,

$$
\lVert v\rVert_{2a}\le K\,\lVert\psi\rVert_a^2 .
$$

*Proof.* As in the forward note's Lemma 2, $\Phi_\psi(v)=(I-\mathcal Jg\mathcal K)^{-1}\mathcal J\mathcal N[\psi+v]$ is defined on the ball $\lVert v\rVert_{2a}\le\varrho$, because there $\lVert\psi+v\rVert_a\le\delta+4\varrho\le\rho$ by (III), and its fixed points in that ball are exactly the corrections for which $\psi+v$ solves the equation (preparation theorem's proof). By the product bound, $\lVert\Phi_\psi(v)\rVert_{2a}\le c\,(\lVert\psi\rVert_a+4\lVert v\rVert_{2a})^2\le c\,(\delta+4\varrho)^2\le\varrho$ by (I): the ball is mapped into itself. By the Lipschitz bound, $\lVert\Phi_\psi(v_1)-\Phi_\psi(v_2)\rVert_{2a}\le c'\cdot2(\delta+4\varrho)\cdot4\lVert v_1-v_2\rVert_{2a}$, a contraction by (II). The ball is complete, so there is exactly one fixed point in it. For the last statement put $\delta'=\lVert\psi\rVert_a\le\delta$ and $x=\varrho\,(\delta'/\delta)^2\le\varrho$. Then $c\,(\delta'+4x)^2=c\,\delta'^2(1+4\varrho\,\delta'/\delta^2)^2\le c\,\delta'^2(1+4\varrho/\delta)^2=(\delta'/\delta)^2c\,(\delta+4\varrho)^2\le x$, so the smaller ball of radius $x$ is also mapped into itself; it is closed and the map contracts on it, so it contains a fixed point, which is the unique one. $\qquad\blacksquare$

*Relation to the accepted conditions.* The forward note's Lemma 2 and Corollary Q5 asked for (III), for (II) with $\tfrac12$ on the right, and for two conditions, $8c\delta\le\sqrt2-1$ and $2c\delta^2\le\varrho$, that together imply (I) for the ball of radius $2c\delta^2$. The value $\tfrac12$ was a convenience: uniqueness needs a contraction, and any factor below one gives it. Condition (I) is the invariance itself, in place of a sufficient pair for it. The fifth accepted condition served only the weighted statement, which is treated separately in Section 6. The accepted pair $(\delta_0,\varrho_0)$ satisfies (I) to (III), so nothing accepted is contradicted.

**Proposition X2 (the accepted constants alone; derived).** With the accepted $c\le34.81$, $c'\le41.97$ and chart $\rho_0=1/16$, the pair $\delta_A=1.7\times10^{-3}$, $\varrho_A=2.7\times10^{-4}$ satisfies (I) to (III): $\delta_A+4\varrho_A=2.78\times10^{-3}$, $34.81\times(2.78\times10^{-3})^2=2.690256\ldots\times10^{-4}\le2.7\times10^{-4}$, and $8\times41.97\times2.78\times10^{-3}=0.9334128<1$. Here $K_A=\varrho_A/\delta_A^2\le93.5$.

*Proof.* Exact arithmetic on the displayed decimals. $\qquad\blacksquare$

This already extends the interval (Theorem X5 holds with $\delta_A$, $\varrho_A$, $K_A$ and the chart $1/16$ in place of the values of Section 4), by at least $\ln(1.7\times10^{-3}/7.4\times10^{-4})/2.8953\ge0.287$. It uses no number that the quantification note did not prove.

## 3. The constants without spatial weight, on a smaller chart

The proofs of the quantification note's Lemma Q1, Lemma Q2, Proposition Q3 and Proposition Q4 contain the chart radius $1/16$, the speed bound $3/16$, the weight allowance $e^{r/4}$ and the rate bound $a\le3$ only through explicit substitutions. Reading them with a general chart radius and with the trivial weight gives the following.

**Lemma X3 (derived by the accepted proofs with general parameters).** Let $0<\rho\le\rho_0$, let $a\le\bar a$ be the rate, and put

$$
\varpi=\bar a\rho,\qquad\kappa=1-2\rho,\qquad\eta=e^{2\bar a\rho},\qquad\mathsf s_1=\eta\,e^{-a},\qquad\vartheta=1+\frac{\bar a\,\rho\,(1+\mathsf s_1)}{1-\varpi},
$$

with $c_{20},c_{11},c_{02}$ the bounds of Lemma Q1 for $\lvert v\rvert\le\varpi$, and $c_E=4Z_5\rho/(1-\rho)^5$, $c_E'=6Z_5\rho/(1-\rho)^5$. For histories of unweighted norm at most $\rho$ at rate $a$, in the norms without weight,

$$
\lVert\mathcal N[u]\rVert_{0,2a}\le C_N\lVert u\rVert_a^2,\qquad\lVert\mathcal N[u_1]-\mathcal N[u_2]\rVert_{0,2a}\le C_N'\,(\lVert u_1\rVert_a+\lVert u_2\rVert_a)\,\lVert u_1-u_2\rVert_a,
$$

with $C_N=g\,(c_E+C_{\rm src})$, $C_N'=g\,(c_E'+C_{\rm src}')$, where $C_{\rm src}$ and $C_{\rm src}'$ are the expressions of Propositions Q3 and Q4 with these $\kappa$, $\eta$, $\mathsf s_1$, $\vartheta$, $c_{20},c_{11},c_{02}$, with $1/(1-\varpi)$ in place of $16/13$, and with the sums taken at $x_1=a$ and $x_2=2a$:

$$
C_{\rm src}=\eta\Bigl\{\frac{c_{20}}{\kappa^4}S_4(a)+\Bigl(\frac{\bar a\,c_{11}}{\kappa^3}+2\bar a\Bigr)S_3(a)+\bar a^2S_2(a)
+\eta\Bigl[\frac{c_{20}}{2\kappa^4}S_4(2a)+\Bigl(\frac{\bar a\,c_{11}}{\kappa^3}+2\bar a\Bigr)S_3(2a)+\Bigl(\frac{\bar a^2c_{02}}{2\kappa^2}+\bar a^2\Bigr)S_2(2a)\Bigr]\Bigr\},
$$

$$
C_{\rm src}'=\eta\Bigl\{\tfrac12\Bigl[\frac{c_{20}}{\kappa^4}\bigl(1+\vartheta(1+\mathsf s_1)\bigr)S_4(a)+\frac{\bar a\,c_{11}}{\kappa^3}\bigl(1+\vartheta(1+2\mathsf s_1)\bigr)S_3(a)+\frac{\bar a^2c_{02}}{\kappa^2}\,\vartheta\,\mathsf s_1\,S_2(a)\Bigr]+\frac{1+\mathsf s_1}{1-\varpi}\bigl[2\bar a\,S_3(a)+\bar a^2S_2(a)\bigr]\Bigr\}.
$$

The linear inverse at rate $\nu=2a$ without weight has $C_L=1/(\nu^2(1-q(\nu)))$ with $q(\nu)=g\,[2S_3(\nu)+\nu S_2(\nu)]/\nu^2$.

*Proof.* Each step of the accepted proofs is repeated with the following substitutions, and each is checked here against the place it is used.

- *Chart facts.* A history of unweighted norm at most $\rho$ has displacements at most $\rho$ and speeds at most $a\rho\le\varpi$. Distinct members are at least $\kappa$ apart, each ordered pair has one root, $D\ge1-\varpi$, the delay is within $2\rho$ of $r$, and every range is at least $r-2\rho\ge\kappa r$ (forward note, Section 1, charts). These replace $7/8$, $13/16$ and $1/8$.
- *Source bounds.* A source sampled within $2\rho$ of $T-r$ obeys $\lvert y\rvert\le Ae^{a(T-r+2\rho)}\le A\,e^{aT}\,\eta\,e^{-ar}$, with factors $a$, $a^2$ for $y'$, $y''$; this is where $\eta=e^{2\bar a\rho}$ replaces $e^{a/8}$. With the trivial weight, $w\equiv1$ and $\omega_d=1$, so the two history norms of Proposition Q3 coincide and the sums are taken at $a$ and $2a$, not at $a-\tfrac14$ and $2a-\tfrac14$.
- *Row derivatives.* Lemma Q1 is stated for a general speed bound; on every Taylor segment the velocity argument is at most $\varpi$ and the range at least $\kappa r$.
- *Product bound.* The nine products of Proposition Q3 are unchanged in form: with $X=e^{aT}$ and $\mathsf s=\eta e^{-ar}$, $\lvert\mathcal R_d\rvert\le A^2X^2\,\mathsf s\,\{c_{20}/(\kappa r)^4+a\,c_{11}/(\kappa r)^3+2a/r^3+a^2/r^2+\mathsf s\,[c_{20}/(2(\kappa r)^4)+a\,c_{11}/(\kappa r)^3+a^2c_{02}/(2(\kappa r)^2)+2a/r^3+a^2/r^2]\}$, and $\sum_d\mathsf s/r^p=\eta S_p(a)$, $\sum_d\mathsf s^2/r^p=\eta^2S_p(2a)$.
- *Receiver term.* In Lemma Q2 the segment from $d$ to $d+\alpha$ has $\lvert x\rvert\ge r-\rho\ge(1-\rho)r$, which replaces $15/16$; the bound is then $\lvert E(\alpha)\rvert\le4Z_5\lvert\alpha\rvert^3/(1-\rho)^5\le c_E\lvert\alpha\rvert^2$ for $\lvert\alpha\rvert\le\rho$, and likewise for the difference with $c_E'$.
- *Lipschitz bound.* In Proposition Q4: $\lvert\Delta\tau\rvert\,(1-\varpi)\le\lvert\Delta\alpha\rvert+\lvert(y_1-y_2)(s_1)\rvert$; the sampled differences carry $\vartheta_r=1+aN_2X(1+\mathsf s)/(1-\varpi)\le\vartheta$ because $N_2\le\rho$; the three partial derivatives of the first bracket are bounded on the convex set $\lvert\alpha\rvert,\lvert p\rvert\le\rho$, $\lvert v\rvert\le\varpi$ exactly as there; and the delay brackets give $N\delta X^2\,\mathsf s\,(1+\mathsf s)\,[2a/r^3+a^2/r^2]/(1-\varpi)$. With $\mathsf s\le\mathsf s_1$ inside the braces (since $r\ge1$) the sum over $d$ is $C_{\rm src}'$.
- *Linear inverse.* The preparation note's Lemma 1 with the trivial weight has $S^\omega_p=S_p$.

In each expression $a$ is replaced by its upper bound $\bar a$ where it multiplies and by its lower bound where it is the argument of a decreasing sum. $\qquad\blacksquare$

**Evaluation for the contour of radius $1/10$ and $\rho=1/100$.** $\bar a=2.6953$, $a\ge2.6952$, $\nu\in[5.3904,5.3906]$. Then $\varpi=0.026953$, $\kappa=0.98$, $1-\varpi=0.973047$; $\mathsf m\le1.000364$ and $c_{20}\le7.2247$, $c_{11}\le3.1693$, $c_{02}\le2.1709$; $\eta\le1.05539$; $\mathsf s_1\le0.07127$; $\vartheta\le1.02968$; with the accepted $Z_5\le10.3824$, $c_E\le0.4367$ and $c_E'\le0.6551$. The sums, enclosed directly and rounded up:

$$
S_2(2.6952)\le0.5897,\quad S_3(2.6952)\le0.52522,\quad S_4(2.6952)\le0.4851;\qquad
S_2(5.3904)\le0.030598,\quad S_3(5.3904)\le0.029603,\quad S_4(5.3904)\le0.028921 .
$$

With these declared inputs, exact evaluation gives $C_{\rm src}\le17.681$, $C_{\rm src}'\le18.334$, hence

$$
C_N\le289.9,\qquad C_N'\le303.9,\qquad q\le0.12343,\qquad C_L\le0.03927,\qquad c=C_LC_N\le11.39,\qquad c'=C_LC_N'\le11.94 .
$$

The reduction from $849.2$ has three sources of comparable size: the sums at $a$ are about three quarters of those at $a-\tfrac14$; $\eta$ falls from $1.40$ to $1.06$, and enters squared in part; and the row constants divided by powers of $\kappa$ fall from $15.4$, $6.9$ to $7.8$, $3.4$, while the receiver constant falls from $3.58$ to $0.44$.

**Corollary X4 (derived).** With these constants and the chart $\rho=1/100$, the pair $\delta_1=5.2\times10^{-3}$, $\varrho_1=8.6\times10^{-4}$ satisfies (I) to (III): $\delta_1+4\varrho_1=8.64\times10^{-3}\le10^{-2}$; $11.39\times(8.64\times10^{-3})^2=8.50258944\times10^{-4}\le8.6\times10^{-4}$; $8\times11.94\times8.64\times10^{-3}=0.8252928<1$. Here $K_1=\varrho_1/\delta_1^2\le31.9$.

*Proof.* Exact arithmetic on the displayed decimals. $\qquad\blacksquare$

## 4. The same solution on a longer interval

**Theorem X5 (derived, relying on the accepted preparation, forward-evolution and quantification proofs).** Let the contour and the seed class be those of the quantification note's Section 7, let $0<\varepsilon\le\varepsilon_0=6.46\times10^{-3}$, and let $u^\varepsilon=\varepsilon\phi+v^\varepsilon$ be the constructed history of Theorem Q7. Put

$$
T_B(\varepsilon)=\frac1{2.8953}\ln\frac{\delta_1}{\varepsilon\,\bar\Lambda_0},\qquad\delta_1=5.2\times10^{-3},\quad\bar\Lambda_0=0.1144 .
$$

Then $T_B(\varepsilon)\ge T_*(\varepsilon)+0.673$, and $u^\varepsilon$ has a continuation $u$ to $(-\infty,T_B(\varepsilon)]$ with these properties.

1. It solves the unchanged Master Equation with the block prescription at every time. It is the unique continuation of $u^\varepsilon$ in the class of the forward note's Theorem 1, and so it coincides on $(-\infty,T_*(\varepsilon)]$ with the continuation of Theorem Q7.
2. For $0\le T\le T_B(\varepsilon)$ and every $j$, with $\Delta(T)=\varepsilon\,\bar\Lambda_0\,e^{2.8953\,T}\le\delta_1$,
   $$
   \lvert u_j(T)-\varepsilon\phi_j(T)\rvert\le31.9\,\Delta(T)^2,\qquad\lvert u_j(T)\rvert\le\Delta(T)+31.9\,\Delta(T)^2\le6.07\times10^{-3},
   $$
   and the first two derivatives of the difference obey the same bound after division by $2a$ and $(2a)^2$. The correction is at most the fraction $31.9\,\Delta(T)\le0.166$ of the seed-norm bound $\Delta(T)$.
3. On the whole of $(-\infty,T_B(\varepsilon)]$: displacements are at most $1/100$, speeds at most $0.026953$, accelerations at most $0.07265$, transmitter factors at least $0.973$, separations at least $0.98$, and each delay is within $0.02$ of the anchor distance. Each ordered pair of distinct members has exactly one causal root at every reception time, and no member has a root on its own path.

*Proof.* The argument is that of the forward note's Theorem 2 with Lemma X1 and Corollary X4 in place of its Lemma 2. Fix $t\in[0,T_B(\varepsilon)]$. The translated seed $\psi=\varepsilon\phi^t$, $\phi^t(T)=\phi(T+t)$, is real, solves the linear equation on $T\le0$, and has $\lVert\psi\rVert_a\le\varepsilon\bar\Lambda_0e^{\lambda_+t}\le\Delta(t)\le\delta_1$ (Proposition Q6(3), with $\lambda_+<2.8953$). Lemma X1 gives $\tilde v^t$ with $\lVert\tilde v^t\rVert_{2a}\le K_1\Delta(t)^2\le\varrho_1$ such that $\tilde u^t=\varepsilon\phi^t+\tilde v^t$ solves the Master Equation on $T\le0$. The equation and the block prescription do not depend on the time origin, so $U(T)=\tilde u^t(T-t)$ solves it on $T\le t$, and $U=\varepsilon\phi+c$ with $c(T)=\tilde v^t(T-t)$.

*Matching of the prescribed past.* On $T\le0$, $\sup_{T\le0}e^{-2aT}\lvert c_j(T)\rvert=e^{-2at}\sup_{T'\le-t}e^{-2aT'}\lvert\tilde v^t_j(T')\rvert\le e^{-2at}\lVert\tilde v^t\rVert_{2a}\le\varrho_1$, and likewise for the two derivatives. So the restriction of $c$ to $T\le0$ is a correction of norm at most $\varrho_1$ for which $\varepsilon\phi+c$ solves the equation on $T\le0$. The accepted correction $v^\varepsilon$ is another: it has norm at most $69.7\,(\varepsilon\bar\Lambda_0)^2\le69.7\,\delta_0^2\le3.82\times10^{-5}\le\varrho_1$. The seed $\varepsilon\phi$ has norm at most $\varepsilon\bar\Lambda_0\le\delta_0\le\delta_1$, so Lemma X1 applies to it, and its uniqueness statement in the ball of the fixed radius $\varrho_1$ gives $c=v^\varepsilon$ on $T\le0$. Hence $U=u^\varepsilon$ on the whole prescribed past: $U$ continues the constructed history and is not a restart at $T_*$ or another solution with the same seed. Every emission sampled by $U$ at a time $T\le t$, whether in the old past or generated after time zero, lies on $U$ itself, because $\tilde u^t$ is a complete-past solution.

*Properties.* $\lVert\tilde u^t\rVert_a\le\delta_1+4\varrho_1\le1/100$, so $\tilde u^t$ is in the chart of radius $1/100$ with speeds at most $a/100$ and accelerations at most $a^2/100$, and the chart facts give item 3 on $T\le0$ for $\tilde u^t$, hence on $T\le t$ for $U$. Item 1's uniqueness is the forward note's Theorem 1, since $U$ and $u^\varepsilon$ are ancient and charted; continuations obtained with different $t$ therefore agree on their common domains, and for $t\le T_*(\varepsilon)$ they are the continuation of Theorem Q7. For item 2 take $t=T$: $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert=\lvert\tilde v^T_j(0)\rvert\le\lVert\tilde v^T\rVert_{2a}\le K_1\Delta(T)^2$, and $31.9\times\delta_1=0.16588$, $\delta_1+31.9\,\delta_1^2=6.062576\times10^{-3}$. The gain in time is $\ln(\delta_1/\delta_0)/2.8953=\ln(7.027\ldots)/2.8953\ge0.673$. $\qquad\blacksquare$

**What kind of interval this is.** $T_B$ is again a guaranteed interval and not a survival time. It is strictly beyond the declared $T_*(\varepsilon)$ for every $\varepsilon$, by the same amount. The solution, its past, the roots and the summation are those of the accepted family. For $T_*<T\le T_B$ the statement is new: the earlier notes had only step-by-step continuation there, with no control of the correction. The amplitudes $\varepsilon_0<\varepsilon\le\delta_1/\bar\Lambda_0$ (at least up to $4.54\times10^{-2}$) are covered by Lemma X1 as a construction with the same seed, but the accepted family was declared only up to $\varepsilon_0$; those larger amplitudes are an enlargement of the family and are not claimed as the selected target.

## 5. Growth over the longer interval

**Proposition X6 (derived).** For $0<\varepsilon\le\varepsilon_0$ and $0\le T\le T_B(\varepsilon)$, the central member satisfies $\lvert u_0(T)\rvert\ge\varepsilon\,p_0\,e^{aT}-31.9\,\Delta(T)^2$. At $T_B$,

$$
\lvert u_0(T_B)\rvert\ \ge\ \varepsilon\,p_0\Bigl(\frac{\delta_1}{\varepsilon\bar\Lambda_0}\Bigr)^{\theta}-31.9\,\delta_1^2,\qquad31.9\,\delta_1^2\le8.63\times10^{-4},
$$

and at time zero $\sup_j\lvert u_j(0)\rvert\le\varepsilon\bar\Lambda_0+31.9\,(\varepsilon\bar\Lambda_0)^2$.

*Proof.* Proposition Q8(3) gives $\mathbf e\cdot\phi_0(T)\ge p_0e^{aT}$ for every $T\ge0$; subtract item 2 of Theorem X5. At $T_B$, $aT_B\ge\theta\ln(\delta_1/(\varepsilon\bar\Lambda_0))$ as in Proposition Q8(4). $\qquad\blacksquare$

| $\varepsilon$ | $T_*$ in | $T_B\ge$ | $\sup_j\lvert u_j(0)\rvert\le$ | linear contribution at $T_B$ $\ge$ | $\lvert u_0(T_B)\rvert\ge$ | $\sup_j\lvert u_j(T_B)\rvert\le$ | growth factor $\ge$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $10^{-3}$ | $[0.644,0.645]$ | $1.318$ | $1.149\times10^{-4}$ | $2.66\times10^{-3}$ | $1.797\times10^{-3}$ | $6.07\times10^{-3}$ | $15.6$ |
| $10^{-4}$ | $[1.440,1.441]$ | $2.113$ | $1.145\times10^{-5}$ | $2.27\times10^{-3}$ | $1.407\times10^{-3}$ | $6.07\times10^{-3}$ | $122$ |
| $10^{-5}$ | $[2.235,2.236]$ | $2.908$ | $1.145\times10^{-6}$ | $1.93\times10^{-3}$ | $1.067\times10^{-3}$ | $6.07\times10^{-3}$ | $931$ |
| $10^{-6}$ | $[3.030,3.031]$ | $3.704$ | $1.145\times10^{-7}$ | $1.65\times10^{-3}$ | $7.87\times10^{-4}$ | $6.07\times10^{-3}$ | $6870$ |
| $10^{-8}$ | $[4.621,4.622]$ | $5.294$ | $1.145\times10^{-9}$ | $1.20\times10^{-3}$ | $3.37\times10^{-4}$ | $6.07\times10^{-3}$ | $2.94\times10^{5}$ |
| $10^{-12}$ | $[7.802,7.803]$ | $8.475$ | $1.145\times10^{-13}$ | $6.34\times10^{-4}$ | not positive | $6.07\times10^{-3}$ | none |

The second column brackets the declared earlier time, so each $T_B$ is strictly later than it. As before, the lower bound subtracts a fixed allowance and is therefore empty for very small amplitudes: at $\varepsilon=10^{-12}$ it is not positive at $T_B$. The bound of Proposition X6 holds at every time of the interval, and for small amplitudes it is larger at earlier times, where the allowance $31.9\,\Delta(T)^2$ is smaller. At the *old* time $T_*$ the allowance is now $31.9\,\delta_0^2\le1.75\times10^{-5}$ in place of $3.82\times10^{-5}$, and the lower bound there is positive at $\varepsilon=10^{-17}$ and $10^{-20}$ and not at $10^{-25}$ (the earlier note had positivity down to $10^{-17}$). No growth is established uniformly as $\varepsilon\to0$, and no amplitude independent of $\varepsilon$ is shown to be reached: the lower bounds in the sixth column fall with $\varepsilon$.

## 6. Spatial localization on the longer interval

The fixed point is found without weight; decay in space is recovered afterwards, as in the preparation theorem, by an absorption in a truncated weighted norm. That step needs the product constant for weighted norms, with the allowance $e^{r/4}$, but on the small chart.

**Proposition X7 (derived).** On the chart $\rho=1/100$, for every admissible weight, the product bound of Proposition Q3 holds with $C_N^\omega\le382.6$: this is the expression of Lemma X3 for $C_N$ with the sums at $a-\tfrac14$ and $2a-\tfrac14$, evaluated with the accepted enclosures $S_2,S_3,S_4(2.4452)\le0.79585,\ 0.69702,\ 0.63681$ and $S_2,S_3,S_4(5.1404)\le0.03979,\ 0.03835,\ 0.03737$, giving $C_{\rm src}^\omega\le23.475$. With the accepted weighted $C_L^\omega\le0.04099$, $c^\omega=C_L^\omega C_N^\omega\le15.69$. For the solution $\tilde u^t=\psi+\tilde v^t$ of Theorem X5's proof, $A_0=\lVert\tilde u^t\rVert_a\le\delta_1+4\varrho_1=8.64\times10^{-3}$ and $4c^\omega A_0\le0.5423<1$, so for every weight exponent $m$,

$$
\lVert\tilde v^t\rVert_{2a}^{(m)}\le\frac{c^\omega A_0}{1-4c^\omega A_0}\,\lVert\psi\rVert_a^{(m)}\le0.2962\,\varepsilon\,\bar\Lambda_m\,e^{\lambda_+t},
$$

and for $0\le T\le T_B(\varepsilon)$ and $n=0,1,2$,

$$
\sup_jw_j\frac{\lvert u_j^{(n)}(T)\rvert}{(2a)^n}\le1.2962\,\varepsilon\,\bar\Lambda_m\,e^{\lambda_+T}.
$$

Without that normalisation the three bounds are $1.2962$, $1.5924\,a$ and $2.1848\,a^2$ times $\varepsilon\,\bar\Lambda_m\,e^{\lambda_+T}$ for the displacement, the velocity and the acceleration. The continued disturbance decays in space faster than any power at each such time.

*Proof.* The weighted form of Lemma X3's product bound is Proposition Q3's proof with the chart substitutions of Lemma X3 and the weight kept: one factor of each product carries the weight, the source factor whenever the receiver appears, and $\omega_de^{-ar}\le e^{-(a-1/4)r}$. For the absorption, as in the preparation theorem, the identity $\tilde v^t=(I-\mathcal Jg\mathcal K)^{-1}\mathcal J\mathcal N[\tilde u^t]$ holds in each truncated weighted norm, in which both sides are finite, so $\lVert\tilde v^t\rVert^L_{2a}\le c^\omega A_0\,(\lVert\psi\rVert^{(m)}_a+4\lVert\tilde v^t\rVert^L_{2a})$; since $4c^\omega A_0<1$ the last term is absorbed, and the cutoff is removed. The seed's weighted norm is $\lVert\phi^t\rVert^{(m)}_a\le\bar\Lambda_me^{\lambda_+t}$ (forward note). For the derivatives: the seed's norm is at rate $a$, so $w_j\lvert\phi_j^{(n)}\rvert\le a^n\bar\Lambda_me^{\lambda_+T}$, and the correction's norm is at rate $2a$, so $w_j\lvert\tilde v^{(n)}_j\rvert\le(2a)^n\beta\,\varepsilon\bar\Lambda_me^{\lambda_+T}$ with $\beta\le0.2962$. Their sum is $a^n(1+2^n\beta)$ times the envelope, that is $1+\beta$, $a\,(1+2\beta)$ and $a^2(1+4\beta)$; divided by $(2a)^n$ it is $2^{-n}+\beta\le1+\beta$. $\qquad\blacksquare$

The weighted seed norms $\bar\Lambda_m$, $m\ge1$, are finite (preparation note, Lemma 3) but were not evaluated, here or earlier, so the weighted bound has an explicit factor and an unevaluated seed constant. With the accepted weighted constant on the chart $1/16$, $c^\omega\le34.81$, the absorption condition would read $4\times34.81\times8.64\times10^{-3}=1.203$, which is not below one; the smaller chart is what keeps the localization statement through the whole of the longer interval.

## 7. Where this argument stops

Conditions (I) and (II) can be met by some radius $\varrho$ exactly when the smaller root $x_-(\delta)$ of $c\,(\delta+4x)^2=x$ exists and satisfies (II). Since $\delta+4x_-(\delta)=[1-\sqrt{1-16c\delta}]/(8c)$, this is

$$
\delta<\delta_{\max}=\frac{2-c/c'}{16\,c'}\qquad(c\le c').
$$

This is the ceiling of conditions (I) and (II) alone, with the chart condition (III) set aside. With $c=11.39$, $c'=11.94$ it is about $5.48\times10^{-3}$ (float evaluation, a comparison and not a declared bound); with the accepted constants it is about $1.74\times10^{-3}$, against $\delta_A=1.7\times10^{-3}$.

The chart condition lowers the first of these. The constants $11.39$ and $11.94$ were proved for the chart of radius $1/100$, so (III) reads $y=\delta+4\varrho\le10^{-2}$. By (I), $\varrho\ge c\,y^2$, so $\delta=y-4\varrho\le y-4c\,y^2$, which is increasing for $y<1/(8c)$ and so on the whole range $y\le10^{-2}$. The largest seed norm that all three conditions allow on this chart is therefore exactly

$$
\delta_{\rm chart}=10^{-2}-4\times11.39\times10^{-4}=5.444\times10^{-3},
$$

attained with $\varrho=1.139\times10^{-3}$, where (II) reads $8\times11.94\times10^{-2}=0.9552<1$. The declared $\delta_1=5.2\times10^{-3}$ is within five percent of it. For the accepted constants the chart $1/16$ does not bind, because (II) already forces $y<1/(8\times41.97)<3\times10^{-3}$, and the ceiling is the value $1.74\times10^{-3}$ above. A larger chart would relax (III), but the constants as evaluated here grow with the chart radius, so $5.48\times10^{-3}$ is not shown to be available on any chart; it is quoted only to show that the chart condition costs little. Neither number is a property of the solution. A further gain needs smaller constants or a different argument. Three remarks on what that would take, none carried out here.

- The constants $c$, $c'$ still sum absolute values over all sources, bound the delay terms without their signs, and use the worst rate $a$ on the contour for decay and the worst rate $\lambda_+$ for growth. A chart smaller than $1/100$ gains little: at radius $1/128$ a scratch float evaluation, which is not an instrument output, gives $c\approx11.0$.
- The method controls the solution as *seed plus small correction* and needs a seed norm below $1/(16c)$. The constant $c$ is a ratio of lattice sums of the same kind as those of the linear operator and is of order ten at this coupling; I do not see a refinement of constants that would make the threshold of order one (inferred, not proved). Reaching displacements of order one presumably needs an argument that does not treat the nonlinearity as a perturbation of the linear seed.
- Beyond $T_B$ the forward note's Theorem 1 still continues the solution by steps, and its continuation alternative still applies. Nothing proved here limits the solution at $T_B$.

**Not obtained.** Displacements of order one; which of the endings of the forward note's Theorem 5 occurs; arrival at wake speed and its rate; growth uniform as $\varepsilon\to0$; numbers for the weighted seed norms; other seeds, contours or couplings. Failure of this sufficient estimate above $\delta_{\rm chart}$ is an obstruction to this proof route and says nothing about the solution's fate.

## 8. Instruments, evidence and the reference boundary

Two session instruments are in the [evidence directory](../evidence/saturday-forward-extension-2026-10-12/README.md), with identities, commands and outputs listed there. Neither integrates the equation or evaluates a history.

- **`forward_extension_constants.py`** encloses the lattice sums with `mpmath.iv` at 50 digits (mpmath 1.3.0) from exact rational arguments, over the cube of half-width $30$, with the tail of the sites outside it bounded by $26\,e^{-x\cdot31}/(1-e^{-x})$ (sites of largest coordinate $m$ number $24m^2+2\le26m^2$ at distance at least $m$), and rounds each upper endpoint up by exact integer arithmetic. Everything after that, the constants of Lemma X3, the products, the three conditions for both pairs and the tables, is exact rational arithmetic on the declared decimals, with interval logarithm and exponential for the tables and outward rounding throughout. *Known cases, asserted before any target; a failure stops the run:* the rounding helpers on known rationals; exact interval endpoints; the lattice census against the classical numbers of representations by three squares and the shell counts; the six weighted-argument sums of the quantification note reproduced at five decimals; the preparation note's hand-majorant values and its unweighted $q(5.3)=0.139$; the row constants at $3/16$; the whole accepted cascade ($C_{\rm src}$, $C_N$, $\vartheta$, $C_{\rm src}'$, $C_N'$, $q$, $C_L$ and the two products) reproduced through the same general-parameter code that evaluates Lemma X3; and the accepted conditions' values $0.49021$ and $3.8124\times10^{-5}$. *First attempt:* it stopped at the accepted-cascade known case, because the comparison formed $C_N$ from the unrounded $C_{\rm src}$ and obtained $849.1$ and $1023.7$ where the accepted note, which forms them from its rounded $C_{\rm src}$, has $849.2$ and $1023.8$. No target ran. The comparison was corrected to follow the accepted note's rounding order, the attempt and its output are retained, and the second run passed every known case and then the targets.
- **`weighted_absorption_constants.py`** evaluates Proposition X7's constant in exact arithmetic from the accepted weighted sums, importing the first instrument's formula unchanged, after reproducing the accepted $C_{\rm src}\le49.49$, $C_N\le849.2$, $C_L\le0.04099$ and the accepted absorption value $0.14573$ as its known case. It ran once.

**Reference boundary.** The formulas are derived here by hand from the accepted proofs, and the numbers come from instruments written in the same session. Three kinds of comparison value are used and they are not of equal standing. (a) *Independent of this author's work:* the classical lattice counts, the exact-arithmetic controls, and the analytic sandwich between the first three shells and the hand majorant. (b) *Accepted regression values:* the sums, row constants, cascade and condition values printed in the earlier notes. The same author produced them; they were reviewed, but they are not independent reference inputs. Reproducing them shows that the code evaluates the accepted formulas correctly at the accepted parameters. It does not validate the newly substituted bounds of Lemma X3, which are the hand argument of Section 3. (c) *The separate Codex reconstruction and its exact-rational audit,* which support the fixed point, the substitutions, the matching, the absorption and the declared arithmetic at the scopes that review states; the audit starts from the declared inputs and does not recompute the lattice sums. The outward rounding of `mpmath.iv` is assumed and is certified by none of these. The accepted notes, reviews, instruments and outputs were not modified.

## 9. Falsifiers

- Lemma X1: constants and a pair satisfying (I) to (III) with a real linear solution of norm at most $\delta$ that has no correction, or two, in the ball of radius $\varrho$; or a correction exceeding $K\lVert\psi\rVert_a^2$.
- Proposition X2 and Corollary X4: an exact evaluation in which a displayed condition fails with its displayed inputs.
- Lemma X3: a history of unweighted norm at most $1/100$ at a rate in $(2.6952,2.6953)$ with $\lVert\mathcal N[u]\rVert_{0,2a}>289.9\,\lVert u\rVert_a^2$, or a pair violating the Lipschitz bound with $303.9$; a step of the accepted proofs of Q1 to Q4 that does not survive the stated substitution; a correct enclosure showing one of the six sums above its declared value, or $q(\nu)>0.12343$ for some $\nu\in[5.3904,5.3906]$.
- Theorem X5: a seed of the class and an $\varepsilon\le6.46\times10^{-3}$ whose constructed history, with its complete past and its unique charted continuation, violates a stated bound at some $T\le T_B(\varepsilon)$, or has two roots for one ordered pair, or a root on a member's own path. A run started at a finite time from the seed alone does not test this.
- Proposition X6: an exact evaluation contradicting a table entry with the declared constants; a seed of the class with $\mathbf e\cdot\phi_0(T)<0.0763\,e^{aT}$.
- Proposition X7: an admissible weight and a history of unweighted norm at most $1/100$ violating the weighted product bound with $382.6$.
- Section 7: a pair satisfying (I) and (II) with $\delta>(2-c/c')/(16c')$, or a pair satisfying (I) to (III) on the chart $1/100$ with $c=11.39$ and $\delta>5.444\times10^{-3}$, refutes the stated limits of the method.

## 10. Proposed propagation (not applied)

No shared tracker, manuscript or queue was edited. Suggested text for the coordinator, for the lattice queue's item "Continue the localized nonlinear family beyond its guaranteed interval": "Extension (Saturday continuation round, 2026-10-12, derived): for the same contour, seed class and complete-past family, the constructed history continues uniquely, as seed plus a correction of at most $31.9$ times the squared seed-norm bound, at least to $T_B=\ln(5.2\times10^{-3}/(0.1144\varepsilon))/2.8953\ge T_*+0.673$, with displacements below $6.07\times10^{-3}$, speeds below $0.027$, one root per ordered pair and spatial decay retained; for $\varepsilon=10^{-4}$ the central displacement at $T_B\ge2.113$ is at least $1.40\times10^{-3}$. The gain comes from a three-condition fixed point and constants evaluated without spatial weight on a chart of radius $1/100$ ($C_N\le289.9$, $C_N'\le303.9$). With these constants on the chart of radius $1/100$ the three-condition method cannot exceed a seed norm of $5.444\times10^{-3}$ (about $5.48\times10^{-3}$ if the chart condition is set aside); neither is a physical endpoint. Open: order-one evolution, which ending occurs, arrival and its rate, growth uniform in $\varepsilon$."
