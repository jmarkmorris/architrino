# The delayed Weber law on one opposite-polarity pair

**Status: ✓ frozen synthesis, 2026-10-06T03:50Z.** Investigation clock started 2026-10-06T02:56:30Z with a deadline of 2026-10-06T06:56:30Z; the synthesis was frozen fifty-four minutes in, after both computational lanes reported. This is the main treatment and the frozen synthesis of the investigation approved in the [launch brief](weber-delayed-pair-launch-brief.md) and preregistered in the [preregistration](weber-delayed-pair-preregistration.md). Sections 2 to 5 are the theory and domain lane (Principal Investigator). Sections 6 to 8 report the two computational lanes once their records are fixed: the [instrument note](../evidence/weber-delayed-pair-instrument.md) and the [independent reference](weber-delayed-pair-independent-reference.md). Nothing here is adopted into canon; every result concerns the frozen Section 9a law, one pair, and the declared preparations and windows.

## 1. Question and claim boundary

The [frozen Section 9a law](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation) places the Weber bracket of [Section 9](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response) on the ordinary causal roots of the canonical Master Equation and differentiates each delayed range along reception time. Under the instantaneous Section 9 law an opposite-polarity pair has a derived, independently confirmed bound class with fixed turning radii and orbitally stable circles. Under the [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) no circle below the wake speed is a solution and a slow nearly circular pair expands at the adjudicated rate $d(R_0^2)/dT=K/c_f$ ([registry entry BIN-2](../../configurations/geometry-configuration-registry.md)). The question is what Section 9a does on one isolated pair of one electrino and one positrino: whether any bound, persistent pair motion survives causal delay as Section 9a formulates it, and if not, by what mechanism and at what order in $1/c_f$ binding is lost.

What may be concluded: properties of Section 9a on this pair, on the declared complete pasts and finite windows, graded as derived, measured, inferred or guessed. What may not be concluded: anything about the canonical law beyond its use as a comparison, anything about other delayed readings of the bracket, anything about populations larger than a pair, and anything about binding in nature. The instantaneous invariants of Section 9 are comparisons, never premises.

## 2. The law on one pair

Absolute reception time is $T$ and emission time is $S<T$. Member $i$ has position $\mathbf X_i(T)$, velocity $\mathbf V_i(T)$ and acceleration $\mathbf A_i(T)$. Member 1 is the electrino, $q_1=-1$; member 2 is the positrino, $q_2=+1$; the partner polarity sign is $\sigma_{12}=\sigma_{21}=-1$ and the self sign is $+1$. For receiver $i$ and transmitter $j$, an ordinary causal root is an isolated solution $S$ of the arrival identity

$$
\|\mathbf X_i(T)-\mathbf X_j(S)\|=c_f(T-S)>0 .
$$

Write $\mathscr R=c_f(T-S)$ for the delayed range, $\mathbf n=(\mathbf X_i(T)-\mathbf X_j(S))/\mathscr R$ for the line of action from the emission position to the receiver, $D_t=c_f-\mathbf n\cdot\mathbf V_j(S)$ for the transmitter factor and $D_r=c_f-\mathbf n\cdot\mathbf V_i(T)$ for the receiver factor. The frozen law is

$$
\mathbf A_i(T)=\sum_{j}\sum_{S}\frac{\sigma_{ij}Kc_f}{\mathscr R^2|D_t|}\left[1-\frac{\dot{\mathscr R}^2}{2c_f^2}+\frac{\mathscr R\ddot{\mathscr R}}{c_f^2}\right]\mathbf n ,
$$

with dots denoting total derivatives of $\mathscr R$ along reception time on the locally smooth root branch $S=S(T)$. Differentiating the arrival identity gives $S'=p:=D_r/D_t$, hence $\dot{\mathscr R}=c_f(1-p)$, and differentiating once more, with $\mathbf w=\mathbf V_i(T)-p\mathbf V_j(S)$ and $\mathbf w_\perp=\mathbf w-(\mathbf n\cdot\mathbf w)\mathbf n$,

$$
\ddot{\mathscr R}=\frac{c_f}{D_t}\left[\mathbf n\cdot\big(\mathbf A_i(T)-p^2\mathbf A_j(S)\big)+\frac{\|\mathbf w_\perp\|^2}{\mathscr R}\right].
$$

These two relations are stated in Section 9a and were re-derived here and, separately, by both computational lanes before use. The second derivative contains the present acceleration of the receiver, so the law is implicit: collecting the terms in $\mathbf A_i(T)$ gives the linear system $M_i\mathbf A_i(T)=\mathbf b_i$ with

$$
M_i=I-\sum_{j,S}\frac{\sigma_{ij}K\,\mathbf n\mathbf n^{\mathsf T}}{\mathscr R|D_t|D_t},\qquad
\mathbf b_i=\sum_{j,S}\frac{\sigma_{ij}K\,\mathbf n}{\mathscr R^2|D_t|}\left[1-\frac{(1-p)^2}{2}+\frac{\|\mathbf w_\perp\|^2-\mathscr R\,p^2\,\mathbf n\cdot\mathbf A_j(S)}{c_f D_t}\right]
$$

in units where the displayed $c_f$ factors are kept explicit; with $c_f=1$ the bracket reads $1-(1-p)^2/2+(\|\mathbf w_\perp\|^2-\mathscr Rp^2\mathbf n\cdot\mathbf A_j(S))/D_t$. The delayed transmitter acceleration $\mathbf A_j(S)$ is supplied by the history.

**Lemma 2.1 (root census below the wake speed).** Let both members have speed below $c_f$ on the whole history up to $T$ and positive separation. Then each receiver has exactly one partner root and no self root, the partner root has $D_t>0$, and the delay $\tau=\mathscr R/c_f$ satisfies $\tau\ge r(T)/(c_f+v_{\max})$, where $r(T)$ is the present separation and $v_{\max}$ bounds the transmitter's speed.

*Proof.* Put $f(S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-c_f(T-S)$. Where the norm is positive, $f'(S)=-\mathbf n\cdot\mathbf V_j(S)+c_f=D_t>0$ because $\|\mathbf V_j\|<c_f$. So $f$ is strictly increasing; $f(T)=r(T)>0$, and $f(S)\le\|\mathbf X_i(T)-\mathbf X_j(T)\|+v_{\max}(T-S)-c_f(T-S)\to-\infty$ as $S\to-\infty$. Hence exactly one root. For a self root, $f_{\mathrm{self}}(S)=\|\mathbf X_i(T)-\mathbf X_i(S)\|-c_f(T-S)\le(v_{\max}-c_f)(T-S)<0$ for every $S<T$, so there is none. The delay bound follows from $\mathscr R\ge r(T)-\|\mathbf X_j(T)-\mathbf X_j(S)\|\ge r(T)-v_{\max}\tau$. $\square$

Claim grade: derived. Falsifier: a subfield pair history exhibiting two partner roots at one reception time, or a self root.

**Lemma 2.2 (invertibility for the opposite-polarity pair).** On a history satisfying Lemma 2.1, $M_i=I+K\mathbf n\mathbf n^{\mathsf T}/(\mathscr R D_t^2)$ for each member, with eigenvalues $1+K/(\mathscr RD_t^2)>1$ along $\mathbf n$ and $1$ transversely; so $\det M_i=1+K/(\mathscr RD_t^2)>1$ and the implicit solve is uniquely invertible. A singular block requires a root with $D_t<0$ and $K=\mathscr RD_t^2$, which is possible only once a transmitter exceeds the wake speed.

*Proof.* With $\sigma_{ij}=-1$ and $D_t>0$, $-\sigma K/(\mathscr R|D_t|D_t)=K/(\mathscr RD_t^2)>0$; a rank-one positive update of the identity has the stated spectrum. For $D_t<0$ the sign of the update reverses. $\square$

Claim grade: derived. Falsifier: a subfield opposite-polarity pair state whose assembled block has a determinant at most one.

Lemma 2.2 settles the invertibility hypothesis of Section 9a for this pair below the wake speed: no obstruction event of the present-acceleration solve can occur there. The only census-changing event on a subfield history is a member reaching speed $c_f$, after which self roots may appear.

## 3. Rigid rotation

A rigid mirror circle is $\mathbf X_1(T)=\rho(\cos\Omega T,\sin\Omega T,0)$, $\mathbf X_2(T)=-\mathbf X_1(T)$, with $\rho>0$, $\Omega>0$ and speed ratio $\beta=\Omega\rho/c_f$. It is a complete history on $(-\infty,\infty)$, infinitely differentiable.

**Theorem 3.1 (bracket one; equivalence of circular balance).** On a rigid mirror circle every causal root has constant lag, so $\dot{\mathscr R}=\ddot{\mathscr R}=0$ on every root branch, partner or self, and the Section 9a bracket equals one exactly. Consequently the Section 9a acceleration evaluated on the complete circle equals the canonical Master Equation acceleration on the same circle with the same root census. A rigid mirror circle is a solution of Section 9a if and only if it is a solution of the canonical Master Equation. If in addition $\det M_i\ne0$, the Section 9a implicit solve on the circle has the kinematic acceleration as its unique solution; if $\det M_i=0$ and the canonical balance holds, the kinematic acceleration is a solution but not the only one, which is the bounded obstruction named in Section 9a.

*Proof.* Rigid rotation makes the configuration at time $T$ the rotation by $\Omega T$ of the configuration at time $0$, and the arrival identity is rotation invariant; so if $S_0$ is a root for $T=0$ then $S_0+T$ is a root for $T$, and the lag $T-S$ is constant along the branch. Then $\mathscr R=c_f\times$lag is constant, and its derivatives vanish. The bracket is therefore $1$ and the two laws coincide term by term on the circle. For the implicit solve, write the Section 9a right-hand side as an affine function of the unknown present acceleration, $F(\mathbf A)=\mathbf C+G(\mathbf A-\mathbf A^{\mathrm{kin}})$, where $\mathbf C$ is the canonical sum on the circle, $\mathbf A^{\mathrm{kin}}=-\Omega^2\mathbf X_i$ and $G=\sum\sigma K\mathbf n\mathbf n^{\mathsf T}/(\mathscr R|D_t|D_t)$; the identity $F(\mathbf A^{\mathrm{kin}})=\mathbf C$ is the statement that the kinematic second derivative of the range vanishes. A solution $\mathbf A^*$ of $\mathbf A=F(\mathbf A)$ satisfies $M_i(\mathbf A^*-\mathbf A^{\mathrm{kin}})=\mathbf C-\mathbf A^{\mathrm{kin}}$ with $M_i=I-G$. If $M_i$ is invertible, $\mathbf A^*=\mathbf A^{\mathrm{kin}}$ exactly when $\mathbf C=\mathbf A^{\mathrm{kin}}$, which is canonical balance. If $M_i$ is singular and $\mathbf C=\mathbf A^{\mathrm{kin}}$, every $\mathbf A^{\mathrm{kin}}+\ker M_i$ solves it. $\square$

Claim grade: derived. Falsifier: a rigid circular root branch on which the instrument's $\dot{\mathscr R}$ or $\ddot{\mathscr R}$ is not zero to round-off, or a circle balanced under one law and not the other with the same complete root census.

The same identity was established for the alternating square in the [ring reference](../../braid-program/analysis/weber-delayed-ring-independent-reference.md#full-circular-root-census-and-balance); the pair case adds the explicit root geometry below.

**Proposition 3.2 (explicit partner root and components).** Take $c_f=1$ and receiver 1 at $T=0$ at $(\rho,0)$ with velocity $(0,\beta)$. Write $d=\Omega(T-S)$ for the angular lag of a root. Partner roots solve $d=2\beta|\cos(d/2)|$ and self roots solve $d=2\beta|\sin(d/2)|$, both on $0<d\le2\beta$. For $0<\beta\le1$ there is exactly one partner root, with $d<\pi$, and no self root; on it

$$
\mathscr R=2\rho\cos\tfrac d2,\qquad \mathbf n=\big(\cos\tfrac d2,\,-\sin\tfrac d2\big),\qquad D_t=1+\beta\sin\tfrac d2,
$$

and the acceleration $-\mathbf n/(\mathscr R^2D_t)$ has radial component $-1/(4\rho^2\cos(d/2)D_t)$, inward, and tangential component $+\sin(d/2)/(4\rho^2\cos^2(d/2)D_t)$, along the velocity. For small $\beta$, $d=2\beta-\beta^3+O(\beta^5)$ and the tangential component is $\beta/(4\rho^2)+O(\beta^3/\rho^2)$.

*Proof.* The partner emission point is $\mathbf X_2(S)=-\rho(\cos d,-\sin d)$, so $\mathbf X_1(0)-\mathbf X_2(S)=\rho(1+\cos d,-\sin d)=2\rho\cos(d/2)(\cos(d/2),-\sin(d/2))$, which gives $\mathscr R$ and $\mathbf n$ once $\cos(d/2)>0$; the arrival identity $\mathscr R=\rho d/\beta$ is the partner equation. The self equation follows from $\|\mathbf X_1(0)-\mathbf X_1(S)\|=2\rho|\sin(d/2)|$. For $\beta\le1$, $2\beta\sin(d/2)<d$ for every $d>0$, so the self equation has no positive root, and $d-2\beta\cos(d/2)$ is strictly increasing from $-2\beta$ at $0$ to $\pi$ at $d=\pi$, so there is exactly one partner root, below $\pi$ and hence below $2\beta\le2<\pi$ as required. The transmitter velocity at emission is $\mathbf V_2(S)=\beta(-\sin d,-\cos d)$, and $\mathbf n\cdot\mathbf V_2(S)=-\beta\sin(d/2)$ gives $D_t$. The components follow. The expansion of $d$ comes from the fixed-point equation. $\square$

Claim grade: derived. Falsifier: direct evaluation of the arrival identity on the mirror circle disagreeing with the displayed root equation, range, direction or transmitter factor.

**Corollary 3.3 (no exact circle at or below the wake speed).** For $0<\beta\le1$ no rigid mirror circle solves Section 9a: the single root's tangential coefficient is strictly positive, so the receiver is pushed forward along its velocity and the circular balance fails. The forward push is first order in $\beta$: in units $\rho=1$ its ratio to $\beta$ tends to $1/4$ as $\beta\to0$. This is the same exclusion as the canonical [BIN-1](../../configurations/geometry-configuration-registry.md), now carried to Section 9a by Theorem 3.1.

Claim grade: derived. Falsifier: a value $0<\beta\le1$ at which $\sin(d/2)/(4\rho^2\cos^2(d/2)D_t)$ vanishes.

**Proposition 3.4 (above the wake speed).** For $\beta>1$ self roots exist, the census grows with $\beta$, and roots with $D_t<0$ appear; Section 9a admits them with the absolute transmitter weight, exactly as the canonical law does. By Theorem 3.1 the exact circles of Section 9a above the wake speed are exactly the canonical ones. A scan of the complete census and of the tangential coefficient $C_t(\beta)$ on $0<\beta\le20$ in steps of $0.005$, with every root located by bisection to $10^{-15}$ on a $2\times10^5$ grid, finds the first continuous zero of $C_t$ within a fixed census at

$$
\beta_1=3.0703566254,\quad \rho_1=0.08694167\,K/c_f^2,\quad\text{census }(3\text{ partner},1\text{ self}),\quad \det M_1=-33.91,
$$

and further zeros at $\beta_2=6.2184549634$ ($\rho_2=0.03336685$, census $(5,3)$, $\det M=-121.7$) and $\beta_3=9.3764360282$ ($\rho_3=0.02047536$, census $(7,5)$, $\det M=-287.3$). The apparent sign changes at $\beta\approx2.975$, $6.205$ and $9.375$ coincide with partner-root births at the boundary $d=2\beta$ and are discontinuities of the census, not zeros. The first value reproduces the registered canonical superfield circle [BIN-3](../../configurations/geometry-configuration-registry.md) and the [certified reference](superwake-circle-stability-2026-10-03.md) $\beta\approx3.07035662538968$, $R\approx0.0869416734741592$, to the ten digits computed here, by an independent census written for this investigation.

Claim grade: measured, by the Principal Investigator's census script [weber-delayed-pair-pi-checks.mjs](../evidence/weber-delayed-pair-pi-checks.mjs) in double precision on the stated grid; it is a scan, not an interval certificate, and does not prove that no other zero exists between grid points or above $\beta=20$. The identification with BIN-3 is derived from Theorem 3.1 once the canonical circle is accepted. Falsifier: a zero of $C_t$ within a fixed census missed by the grid, or a disagreement between this census and the certified canonical one at $\beta_1$.

What Theorem 3.1 does not transfer is stability. The first variation of Section 9a about a balanced circle contains the variation of $\mathscr R\ddot{\mathscr R}$, which is not zero even though $\ddot{\mathscr R}$ is; the canonical characteristic roots of BIN-3 therefore say nothing about the Section 9a spectrum, and the superfield circles are outside every speed ceiling. They are recorded here as exact solutions of Section 9a and not pursued further, because they are not the bound class asked about and they lie outside the slow regime.

## 4. Slow-motion expansion and the first departure from Section 9

This section expands the Section 9a acceleration of a receiver on a regular, separated, uniformly subfield history in powers of $1/c_f$ at fixed $K$, with $c_f$ kept symbolic. Present quantities are $\mathbf r=\mathbf X_i(T)-\mathbf X_j(T)$, $r=\|\mathbf r\|$, $\mathbf e=\mathbf r/r$, $\mathbf v_j=\mathbf V_j(T)$, $\mathbf a_j=\mathbf A_j(T)$, $s=\mathbf e\cdot\mathbf v_j$, $\mathbf v_{j\perp}=\mathbf v_j-s\mathbf e$ and $\mathbf a_{j\perp}=\mathbf a_j-(\mathbf e\cdot\mathbf a_j)\mathbf e$. Three laws are compared on identical histories: the canonical prefactor $\mathbf A^{\mathrm{ME}}=\sigma Kc_f\mathbf n/(\mathscr R^2|D_t|)$, the instantaneous inverse square $\mathbf A^{\mathrm{IS}}=\sigma K\mathbf e/r^2$, and the Section 9 law $\mathbf A^{\mathrm{S9}}=\mathbf A^{\mathrm{IS}}\,[1-\dot r^2/(2c_f^2)+r\ddot r/c_f^2]$ with the dots on the present separation. Evaluating a law on a prescribed history means inserting that history's kinematic accelerations into any bracket; this is the term-by-term decomposition the brief allows and is not the evolution of a variant.

**Theorem 4.1 (canonical prefactor through second order).** With $\varepsilon=1/c_f$,

$$
\frac{c_f\,\mathbf n}{\mathscr R^2D_t}=\frac1{r^2}\Big[\mathbf e+\varepsilon\big(\mathbf v_j-2s\,\mathbf e\big)-\varepsilon^2\Big(s\,\mathbf v_{j\perp}+\tfrac r2\,\mathbf a_{j\perp}+\tfrac12\|\mathbf v_{j\perp}\|^2\,\mathbf e\Big)+O(\varepsilon^3)\Big].
$$

The first-order term is the sum of three identified contributions: the delayed range contributes $-2s\mathbf e$ through $1/\mathscr R^2$, the transmitter weight contributes $+s\mathbf e$ through $c_f/D_t$, and the delayed line of action contributes $+\mathbf v_{j\perp}$ through $\mathbf n$. No single ingredient produces the first-order term alone, and only the line of action produces its transverse part. The receiver's own velocity does not enter the prefactor at any order.

*Proof.* Expand the transmitter history about the present, $\mathbf X_j(S)=\mathbf X_j(T)-\mathbf v_j\tau+\tfrac12\mathbf a_j\tau^2+O(\tau^3)$ with $\tau=T-S$, so that $\mathscr R\mathbf n=\mathbf r+\mathbf v_j\tau-\tfrac12\mathbf a_j\tau^2+O(\tau^3)$. The arrival identity $\|\mathscr R\mathbf n\|=\tau/\varepsilon$ is solved iteratively: $\tau=\varepsilon r+\varepsilon^2rs+\varepsilon^3\tfrac r2\big(s^2+\|\mathbf v_j\|^2-r\,\mathbf e\cdot\mathbf a_j\big)+O(\varepsilon^4)$, hence $\mathscr R=r\big[1+\varepsilon s+\tfrac{\varepsilon^2}2(s^2+\|\mathbf v_j\|^2-r\,\mathbf e\cdot\mathbf a_j)\big]+O(\varepsilon^3)$. Dividing $\mathscr R\mathbf n$ by $\mathscr R$ gives $\mathbf n=\mathbf e+\varepsilon\mathbf v_{j\perp}-\tfrac{\varepsilon^2}2\big(r\mathbf a_{j\perp}+\|\mathbf v_{j\perp}\|^2\mathbf e\big)+O(\varepsilon^3)$, a unit vector to this order. The transmitter velocity at emission is $\mathbf v_j-\mathbf a_j\tau+O(\tau^2)$, so $\varepsilon D_t=1-\varepsilon s-\varepsilon^2(\|\mathbf v_{j\perp}\|^2-r\,\mathbf e\cdot\mathbf a_j)+O(\varepsilon^3)$ and $1/(\varepsilon D_t)=1+\varepsilon s+\varepsilon^2(\|\mathbf v_j\|^2-r\,\mathbf e\cdot\mathbf a_j)+O(\varepsilon^3)$. Also $1/\mathscr R^2=r^{-2}\big[1-2\varepsilon s+\varepsilon^2(2s^2-\|\mathbf v_j\|^2+r\,\mathbf e\cdot\mathbf a_j)\big]+O(\varepsilon^3)$. The product of the last two scalars is $r^{-2}(1-\varepsilon s)+O(\varepsilon^3)$: the second-order scalar corrections cancel. Multiplying by $\mathbf n$ gives the display, and reading the three factors separately gives the attribution of the first-order term. $\square$

Claim grade: derived; checked numerically below. Falsifier: a smooth subfield history on which the remainder after subtracting the displayed terms fails to scale as the cube of the speed ratio.

**Theorem 4.2 (the Section 9a bracket agrees with Section 9 through second order).** On the same history, $\dot{\mathscr R}=\dot r+O(\varepsilon)$ and $\ddot{\mathscr R}=\ddot r+O(\varepsilon)$ with $\dot r=\mathbf e\cdot(\mathbf V_i-\mathbf v_j)$ and $\ddot r=\mathbf e\cdot(\mathbf A_i-\mathbf a_j)+\|(\mathbf V_i-\mathbf v_j)_\perp\|^2/r$ the present-separation derivatives. Hence

$$
1-\frac{\dot{\mathscr R}^2}{2c_f^2}+\frac{\mathscr R\ddot{\mathscr R}}{c_f^2}=1-\frac{\dot r^2}{2c_f^2}+\frac{r\ddot r}{c_f^2}+O(\varepsilon^3),
$$

and the playback factor $p$ and the delayed transmitter acceleration $\mathbf A_j(S)$ first affect the acceleration at order $\varepsilon^3$.

*Proof.* $p=D_r/D_t=1-\varepsilon\,\mathbf n\cdot(\mathbf V_i-\mathbf V_j(S))+O(\varepsilon^2)$, so $\dot{\mathscr R}=c_f(1-p)=\mathbf e\cdot(\mathbf V_i-\mathbf v_j)+O(\varepsilon)$. In $\ddot{\mathscr R}$, $c_f/D_t=1+O(\varepsilon)$, $p^2=1+O(\varepsilon)$, $\mathbf A_j(S)=\mathbf a_j+O(\varepsilon)$, $\mathbf w=\mathbf V_i-\mathbf v_j+O(\varepsilon)$ and $\mathscr R=r+O(\varepsilon)$. The bracket's deviation from one carries an explicit $\varepsilon^2$, so first-order errors in $\dot{\mathscr R}$ and $\ddot{\mathscr R}$ enter at $\varepsilon^3$. $\square$

Claim grade: derived. Falsifier: a history on which the two brackets differ at second order in the speed ratio.

**Corollary 4.3 (additive decomposition and the order of first departure).** On identical regular subfield histories,

$$
\mathbf A^{\mathrm{9a}}=\mathbf A^{\mathrm{S9}}+\big(\mathbf A^{\mathrm{ME}}-\mathbf A^{\mathrm{IS}}\big)+O(\varepsilon^3)\,\frac{K}{r^2}.
$$

Section 9a first departs from Section 9 at order $1/c_f$, one order before the Weber bracket itself acts, and the departure is the canonical delay correction $\sigma K(\mathbf v_j-2s\mathbf e)/(r^2c_f)$ of Theorem 4.1. Through second order the delay corrections and the Weber corrections simply add; their cross terms are third order. Section 9a also departs from Section 9 in losing equal-and-opposite coupling: the sum of the two members' first-order terms is $\sigma K[(\mathbf v_i+\mathbf v_j)-2(\mathbf e\cdot(\mathbf v_i+\mathbf v_j))\mathbf e]/(r^2c_f)$, which vanishes only when the centre of position is at rest in the absolute frame.

*Proof.* Multiply the expansions of Theorems 4.1 and 4.2; the product of the first-order prefactor term with the second-order bracket term is third order. The sum formula follows by exchanging the roles of $i$ and $j$, which reverses $\mathbf e$. $\square$

Claim grade: derived; checked numerically below. Falsifier: a residual $\mathbf A^{\mathrm{9a}}-\mathbf A^{\mathrm{S9}}-\mathbf A^{\mathrm{ME}}+\mathbf A^{\mathrm{IS}}$ that does not scale as the cube of the speed ratio on prescribed smooth subfield histories.

**Numerical check of Theorems 4.1 to 4.3 on prescribed histories.** The Principal Investigator's check script [weber-delayed-pair-pi-checks.mjs](../evidence/weber-delayed-pair-pi-checks.mjs) prescribes cubic polynomial histories for both members with a fixed shape, positions scaled by $\rho=K/(4\beta^2)$, velocities by $\beta$, accelerations by $\beta^2/\rho$ and jerks by $\beta^3/\rho^2$, locates the exact partner root by bisection, and evaluates the four laws with the kinematic accelerations. Every column below is normalized by $K/r^2$. These are prescribed histories, not solutions and not target runs; the script is a check of the algebra, run after the derivation was written.

| $\beta$ | $\|\mathbf A^{\mathrm{ME}}-\mathbf A^{\mathrm{IS}}-\text{first order}\|$ | $\|\ldots-\text{second order}\|$ | $\|\mathbf A^{\mathrm{9a}}-\mathbf A^{\mathrm{ME}}\|$ | $\|\mathbf A^{\mathrm{9a}}-\mathbf A^{\mathrm{S9}}-\mathbf A^{\mathrm{ME}}+\mathbf A^{\mathrm{IS}}\|$ |
| --- | --- | --- | --- | --- |
| $0.05$ | $1.80\times10^{-3}$ | $4.42\times10^{-5}$ | $8.08\times10^{-4}$ | $4.54\times10^{-4}$ |
| $0.025$ | $4.53\times10^{-4}$ | $5.69\times10^{-6}$ | $2.59\times10^{-4}$ | $5.70\times10^{-5}$ |
| $0.0125$ | $1.14\times10^{-4}$ | $7.22\times10^{-7}$ | $7.17\times10^{-5}$ | $7.14\times10^{-6}$ |
| $0.00625$ | $2.85\times10^{-5}$ | $9.09\times10^{-8}$ | $1.88\times10^{-5}$ | $8.92\times10^{-7}$ |

Successive rows fall by factors of $4.0$, $7.8$ to $8.0$, $3.1$ to $3.8$ and $7.9$ to $8.0$: the first-order remainder is second order, the second-order remainder is third order, the Section 9a bracket correction is second order, and the decomposition residual is third order, as the theorems state. On the rigid circle of the preregistration the same script finds the transverse part of $\mathbf A^{\mathrm{ME}}-\mathbf A^{\mathrm{IS}}$ on receiver 1 equal to $-K\mathbf v_{2\perp}/(r^2c_f)=+K\mathbf v_{1\perp}/(r^2c_f)$ to within $3\times10^{-5}$ relative at $\beta=0.00625$, that is, a forward push.

Claim grade: measured, by the named script in double precision on the stated histories; it checks the algebra of the theorems and establishes nothing about solutions. Falsifier: rerunning the script and obtaining ratios between rows that depart from $4$ and $8$ as $\beta\to0$.

**Corollary 4.4 (what any scalar bracket on the delayed line of action shares).** Let a law have the form $\sigma Kc_f B\,\mathbf n/(\mathscr R^2|D_t|)$ on the canonical roots with a scalar bracket $B=1+O(1/c_f)$ that depends on the history only through scalars such as $\mathscr R$ and its derivatives. Then its acceleration on receiver $i$ agrees with the canonical law in the transverse direction through first order: the transverse part is $\sigma K\mathbf v_{j\perp}/(r^2c_f)+O(1/c_f^2)$ for every such $B$, because a scalar bracket multiplies $\mathbf n$ and the first-order transverse part of $\mathbf n$ is $\mathbf v_{j\perp}/c_f$ independent of $B$. For the mirror pair, $\mathbf v_{2\perp}=-\mathbf v_{1\perp}$ and $\sigma=-1$, so each member receives the forward push $K\|\mathbf v_{i\perp}\|/(r^2c_f)$ at first order whatever the bracket. Section 9a has $B=1+O(1/c_f^2)$ and is a special case.

Claim grade: derived. Falsifier: a scalar bracket of the stated form whose first-order transverse acceleration differs from the canonical one.

This corollary matters for item 7: no choice of Weber coefficients, and no scalar modification of the bracket, can remove the first-order forward push on the mirror pair. Removing it requires changing the line of action or adding a non-radial term, which are separate selections and are not executed here.

## 5. History domain

Section 9a on the pair is a neutral functional differential equation with state-dependent delay: the right-hand side samples the second derivative of the transmitter's history at the delayed time. This section states the class of complete histories on which the regular evolution is defined, the compatibility condition at release, the minimum-delay margin, and a local existence and uniqueness argument, following the method of the amplitude-gradient and Maxwell equation-domain analyses as precedents for method only.

**Definition 5.1 (admissible complete past).** A pair preparation at release time $T_0$ consists of twice continuously differentiable paths $\mathbf X_1,\mathbf X_2$ on $(-\infty,T_0]$ with Lipschitz second derivatives on every bounded interval, with positive separation and both speeds at most $(1-\eta)c_f$ for some $\eta>0$ on $(-\infty,T_0]$. The regular chart is the set of continuations on which these three conditions persist.

On the regular chart, Lemma 2.1 gives one partner root per receiver with $D_t\ge\eta c_f>0$, no self root, and the delay bound $\tau\ge r/(2c_f)$ once $v_{\max}\le c_f$. Lemma 2.2 gives $\det M_i>1$. The law is therefore equivalent on the chart to the explicit system $\mathbf A_i(T)=M_i^{-1}\mathbf b_i$, whose right-hand side depends on $T$, on the present state $(\mathbf X_i,\mathbf V_i)$ of the receiver, and on the transmitter's history at the single delayed time $S_{ij}(T)$ through $\mathbf X_j(S),\mathbf V_j(S),\mathbf A_j(S)$.

**Compatibility at release.** The past's acceleration at $T_0^-$ is whatever the declared past supplies, and the law's solved acceleration at $T_0^+$ is $M_i^{-1}\mathbf b_i$ evaluated on the past. Their difference $\boldsymbol\Delta_i$ is the compatibility defect. If $\boldsymbol\Delta_i=0$ for both members the solution is $C^2$ at $T_0$; otherwise it is $C^{1,1}$ there, with a jump in acceleration. A rigid-circle past has defect equal to the first-order forward push of Corollary 3.3 plus the radial mismatch between the circle's centripetal acceleration and the canonical radial component; a Section 9 past has defect equal to the difference of the two laws on the release state, which by Corollary 4.3 is $\mathbf A^{\mathrm{ME}}-\mathbf A^{\mathrm{IS}}+O(1/c_f^3)$ on a slow state. Neither declared past is compatible, and none is available in closed form; the defect is therefore recorded, not removed.

**Proposition 5.2 (propagation of the release jump).** Let $T_1$ be the first reception time at which $S_{ij}(T_1)=T_0$. The delayed acceleration $\mathbf A_j(S)$ jumps by $\boldsymbol\Delta_j$ as $T$ crosses $T_1$, and the solved present acceleration jumps by

$$
\boldsymbol\Delta_i^{(1)}=M_i^{-1}\,\frac{\sigma K\,p^2\,(\mathbf n\cdot\boldsymbol\Delta_j)}{\mathscr R\,|D_t|\,D_t}\,(-\mathbf n)
=\frac{K\,p^2\,(\mathbf n\cdot\boldsymbol\Delta_j)}{\mathscr RD_t^2+K}\,\mathbf n\quad(\sigma=-1,\ D_t>0),
$$

so only the component of the transmitter's jump along the line of action propagates, the propagated jump is radial along $\mathbf n$, and its magnitude is at most $\|\boldsymbol\Delta_j\|\,p^2K/(\mathscr RD_t^2+K)$. The jumps are not smoothed: at the next reception $T_2$ with $S(T_2)=T_1$ the process repeats with $\boldsymbol\Delta^{(1)}$ in place of $\boldsymbol\Delta$. On a slow history $p^2K/(\mathscr RD_t^2+K)\approx K/(rc_f^2)=2\beta^2$ for the Kepler circle, so successive jumps decay geometrically; on a state with $K/(rc_f^2)$ of order one they need not decay.

*Proof.* Only $\mathbf b_i$ depends on $\mathbf A_j(S)$, linearly through $-\sigma K p^2\mathbf n(\mathbf n\cdot\mathbf A_j(S))/(\mathscr R|D_t|D_t)$; apply $M_i^{-1}$ from Lemma 2.2, whose action on a vector along $\mathbf n$ is division by $1+K/(\mathscr RD_t^2)$. $\square$

Claim grade: derived. Falsifier: a measured acceleration jump at the first reception of the release differing from the displayed formula on a run whose defect is known.

The breaking points $T_0<T_1<T_2<\cdots$ are separated by at least the minimum delay, so finitely many lie in any bounded interval. Between consecutive breaking points the right-hand side is as smooth as the history allows.

**Theorem 5.3 (local existence, uniqueness and continuation).** For an admissible complete past, Section 9a has a unique continuation on $[T_0,T_0+\tau_{\min})$ with $\tau_{\min}=r(T_0)/(2c_f)$, twice differentiable except at $T_0$ where the acceleration may jump; the continuation extends step by step and remains unique as long as the regular chart persists: positive separation, both speeds below $(1-\eta)c_f$, and bounded state. The continuation fails only by leaving the chart: contact, a member reaching the wake speed, or escape to infinity in finite time (which bounded accelerations exclude).

*Proof.* Method of steps. On $[T_0,T_0+\tau_{\min})$ the delayed time satisfies $S_{ij}(T)<T_0$ for both members by the delay bound, so the delayed quantities are known functions of the receiver's present position through the root equation; the root depends smoothly on $(T,\mathbf X_i)$ by the implicit function theorem because $D_t\ne0$. The right-hand side $M_i^{-1}\mathbf b_i$ is then continuous in $T$ and locally Lipschitz in $(\mathbf X_i,\mathbf V_i)$: $\mathbf b_i$ is a smooth function of the root data, and the root data are Lipschitz in $(T,\mathbf X_i)$ because the past is $C^{2,1}$. The Picard–Lindelöf theorem gives a unique $C^2$ solution on the step, apart from the jump of $\mathbf A$ at $T_0$. The solution produced on a step is again $C^{2,1}$ away from the breaking points and $C^{1,1}$ across them, so the next step has the same structure with a $C^{1,1}$ history whose acceleration is piecewise Lipschitz; Lipschitz dependence survives because the right-hand side is Lipschitz in the history's acceleration at the delayed time and that acceleration is piecewise Lipschitz with finitely many jumps per step. The standard continuation alternative applies on the chart. $\square$

Claim grade: derived on the stated hypotheses; the regularity bookkeeping across breaking points is the step that a reader should check most closely. Falsifier: an admissible past with two distinct continuations on the first step, or a continuation that leaves the chart without contact, wake-speed arrival or unbounded growth.

The exact gap: no closed-form compatible past is available, so every evolved preparation carries a release jump and belongs to the $C^{1,1}$ class rather than the $C^2$ class named in Section 9a's domain statement; the measured jump sizes in Sections 6 and 7 quantify how far each preparation is from the $C^2$ class.

## 6. Slow nearly circular pair

**Derived leading rate.** By Corollary 4.3, on a slow mirror pair the Section 9a relative acceleration $\mathbf A_1-\mathbf A_2$ equals the Section 9 relative acceleration plus the canonical first-order correction $\big[K(\mathbf w-2\dot r\mathbf e)\big]/(r^2c_f)$ with $\mathbf w=\mathbf V_1-\mathbf V_2$ and $\sigma=-1$, up to second-order terms. Its transverse part is $K\mathbf w_\perp/(r^2c_f)$, a push along the orbital motion, so

$$
\frac{dh}{dT}=\frac{K\,h}{r^2c_f}+O\!\left(\frac{K\beta^2 h}{r^2c_f}\right),\qquad h=\|\mathbf r\times\dot{\mathbf r}\| .
$$

On a near-circular state with $h^2=2Kr$ (the circle of both Section 9 and the inverse square), $r=h^2/(2K)$ and $h^3\,dh/dT=4K^3/c_f$, that is $d(h^4)/dT=16K^3/c_f$ and, for the slow radius $\rho_h=h^2/(4K)$,

$$
\frac{d(\rho_h^2)}{dT}=\frac{K}{c_f}\big(1+O(\beta^2)\big).
$$

The sign is expansion and the leading rate is the canonical one. The Weber bracket, which is exactly one on a circle and second order near one, contributes to the rate only at relative order $\beta^2$; by Theorem 4.1 the canonical second-order term on a circular history is purely radial ($s=0$, $\mathbf a_{j\perp}=0$), so the first correction to the tangential push is third order in $\beta$ and the relative correction to the rate is $O(\beta^2)$. The instantaneous Weber circle, exact under Section 9, is not approached: the forward push is present at every radius.

Claim grade: derived as a formal leading-order statement from Corollary 4.3 and the near-circular relation $h^2=2Kr$; it is not a controlled theorem with an explicit remainder for the actual delayed solution, which would require the apparatus of the [canonical controlled secular comparison](slow-binary-controlled-secular-comparison.md) rebuilt for Section 9a and is not attempted in the four-hour window. The measured confirmation on declared windows follows. Falsifier: a measured slope of $\rho_h^2$ on a slow mirror circle that is negative, or that fails to approach $K/c_f$ as $\beta$ decreases.

**Measured results, subject lane.** The coupled-history instrument [weber-delayed-pair-instrument.mjs](../evidence/weber-delayed-pair-instrument.mjs) (lane B; Dormand–Prince 5(4) with relative tolerance $10^{-10}$, quintic Hermite history, exact root bracketing, breaking points located at every generation) passed all six known cases first, with its receipt recorded at 2026-10-06T03:30:50Z, before any target: stationary $1/4$ at range two; the affine $0.09$ case and two hundred random affine sources against the causal quadratic to $10^{-12}$; the zero-coefficient circle with $d=0.09987533737220836$ against the scalar fixed point $0.09987533737220838$ and the closed-form components to relative $6\times10^{-16}$; the rigid-circle bracket equal to one with $|\dot{\mathscr R}|,|\ddot{\mathscr R}|\le1.6\times10^{-16}$ for $\beta$ from $0.02$ to $0.7$; the first-order scaling of Section 9a minus Section 9 with ratios $0.5005$, $0.5001$, $0.5000$ under halving of $\beta$, and the second-order scaling of the Section 9 bracket on an off-balance circle with ratios $0.2516$, $0.2504$, $0.2501$; and the nominal orders of the integrator and interpolant. The release defect measured on each rigid-circle preparation equals the tangential push of Corollary 3.3 to the printed digits, and the first-generation jump on SC-1, $4.643\times10^{-10}$, matches Proposition 5.2's prediction $4.64\times10^{-10}$.

| Preparation | Window | Termination and first event | $r$: start, end, extremes | $h$: start, end | slope of $\rho_h^2$: full window; halves | speed max | $\det M$ range | release defect |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SC-1, $\beta=0.05$ | $25133$ | final time; first event a maximum of $r$, $358.36$ at $T=16519.87$ | $200\to334.20$, max $358.4$ | $20\to27.189$ | $0.9016$; $1.026$, $0.902$ | $0.0518$ | $1.0028$ to $1.0050$ | $1.248\times10^{-6}$ |
| SC-2, $\beta=0.02$ | $196350$ | final time; no event | $1250\to1588.63$ | $50\to55.338$ | $1.0016$; $1.064$, $0.932$ | $0.02028$ | $1.00063$ to $1.00080$ | $1.28\times10^{-8}$ |
| SC-3, $\beta=0.1$ | $3142$ | final time; no event | $50\to159.81$ | $10\to14.967$ | $0.7628$; $1.127$, $0.510$ | $0.1072$ | $1.0062$ to $1.0197$ | $3.98\times10^{-5}$ |

Refinement at one hundredth of the tolerances changed $r$ at the end of the window by at most $1.3\times10^{-9}$, $h$ by at most $9\times10^{-12}$ and the slope by at most $1.8\times10^{-5}$; a fixed-step fourth-order Runge–Kutta cross-method run of SC-1 agreed to $2.6\times10^{-9}$ in $r$ and $4\times10^{-5}$ in slope. Root residuals were below $10^{-13}$ where $|T|\lesssim10^3$ and reached $5.9\times10^{-12}$ and $2.9\times10^{-11}$ on SC-1 and SC-2, the representable spacing of $S$ at those times.

Reading. All three slopes are positive, and the slowest preparation gives the canonical rate to two parts in a thousand: SC-2 within $0.2\%$ of $K/c_f$, SC-1 ten percent low, SC-3 twenty-four percent low, inside the preregistered margins of five, fifteen and forty percent. The rate falls across each window, from above one in the first half to below one in the second, as the orbit develops eccentricity and the near-circular relation $h^2=2Kr$ behind the leading rate ceases to hold; the first turning point of SC-1 is a maximum of $r$ reached late in the second orbit. The angular quantity $h$ grows monotonically in every run. The instantaneous Weber circle is never approached.

Claim grade: measured, by the named subject instrument in double precision on the declared preparations and windows; the lane agreement with the separately authored reference is reported in Section 8 and tests implementations of the same law, not the law. Falsifier: rerunning any case file and obtaining a different termination, first event, or a slope of the opposite sign.

## 7. Eccentric preparations from the instantaneous bound class

The three Section 9 bound-class states of the [persistence record](weber-overnight-persistence.md) were released with a declared past equal to the Section 9 solution continued backward over $S\in[-40,0]$, generated by the frozen Section 9 instrument at relative tolerance $10^{-12}$ and interpolated like the evolved history. Lane B observed that the Section 9 law is even under time reversal, so this past is the forward Section 9 run with reversed velocities. The release defect is the difference between the two laws on the release state and is large at these speeds: thirty percent of the Section 9 acceleration for WP-2 and fifty-seven percent, mostly tangential, for WP-3.

| Preparation | Window | Termination and first event | $r$ | $h$ | speeds | $\det M$ | $\varepsilon$ (diagnostic) | release defect; first jump |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WP-2, apocentre at $x=3$ | $476.09$ | final time; first event a minimum of $r$, $2.99823$ at $T=0.884$, then monotone expansion | $3\to308.83$, leaves $[2.042,3.000]$ upward within the first radial period and never returns | $2.2045\to6.1968$ | $0.367\to$ max $0.544$, rising while separating | $1.0025$ to $1.274$ | $-0.397\to+0.194$ | $0.0349$; $3.98\times10^{-3}$ at $T=2.805$, then $3.0\times10^{-4}$, $6.1\times10^{-6}$, $5.3\times10^{-8}$ |
| WP-3, circle at $x=1$ with kicks | $88.86$ | **speed equality** of both members at $T=0.5684620177$, one eighth of an instantaneous orbital period; run stopped without remedy | $1\to1.1245$ | $1.4142\to2.1714$ | $0.7071\to1.0000000000$ | $1.559$ to $1.619$ | $-1.0\to+0.46$ | $0.569$; the release had not yet been received (lag $0.84$) |
| WP-1, drifting circle at $x=4$ | $710.86$ | final time; no event; monotone expansion | $4\to340.91$ | $2.8287\to6.6719$ | max $0.404$ and $0.508$, asymmetric | $1.0023$ to $1.218$ | $-0.250\to+0.098$ | $0.0203$ and $0.0218$; asymmetric jumps $2.12\times10^{-3}$ at $T=3.633$ and $1.30\times10^{-3}$ at $T=4.026$ |

Refinement changed $r$ at the end by at most $8.4\times10^{-9}$, $h$ by $3.4\times10^{-11}$ and the WP-3 event time by $1.9\times10^{-11}$; densifying the stored past tenfold changed WP-2's final $r$ by $3\times10^{-9}$ and WP-3's event time by $6\times10^{-11}$. No contact, no obstruction and no escape event occurred in any window. The instantaneous energy-like quantity $\varepsilon$, an invariant of Section 9 and a diagnostic here, changes sign from bound to unbound values in all three runs.

Reading. The two bound-class states that stay below the wake speed leave the instantaneous turning interval within their first radial period and expand without return, with member speeds increasing while the pair separates; this is the first-order forward push of Section 4 at speeds where it is no longer small. The fast state WP-3 reaches the wake speed in both members before one eighth of an orbit; at that moment the regular chart of Lemma 2.1 ends, because self roots may appear and the transmitter factor can vanish, and the frozen law supplies no continuation rule. Whether the approach to speed equality has finite acceleration and whether a continuation exists are outside this screen. Finite survival of WP-1 and WP-2 to the end of their windows establishes only those intervals; both are unbound on them.

Claim grade: measured, by the subject instrument on the declared preparations and windows. Falsifier: a Section 9a trajectory from the WP-2 state and the declared past that remains inside $[2.042,3.000]$, or a WP-3 run under the frozen law whose speeds stay below $c_f$ through one orbital period.

## 8. Verdict

**Binding is lost secularly.** On the slow mirror circles the loss is at the canonical leading rate $d(\rho_h^2)/dT=K/c_f$, measured to two parts in a thousand at $\beta=0.02$, with the measured relative correction growing with $\beta$ and negative; the mechanism is the first-order forward push of the canonical delayed prefactor, which Section 9a inherits unchanged because its Weber bracket acts one order later (Corollary 4.3). On the instantaneous bound-class states the loss is immediate: WP-1 and WP-2 are unbound within one radial period, and WP-3 leaves the regular chart by reaching the wake speed. No bound, persistent pair motion of Section 9a was found below the wake speed, and Corollary 3.3 excludes the rigid circles there exactly. The exact circles above the wake speed (Proposition 3.4) are the canonical ones, outside every speed ceiling, with untransferred stability; they are not a bound class in the sense asked.

The verdict is graded as follows. The exclusion of exact subfield circles and the order and origin of the departure are derived. The slow-pair rate is derived formally and measured on three windows by the subject lane; its agreement with the independent reference is recorded below. The eccentric fates are measured on the declared windows. The inference from these to "no bound class persists" is an inference over the preparations examined, not a theorem over all initial histories; its falsifier is any complete history below the wake speed on which $h$ does not grow on average.

**Lane agreement and disagreements.** The [independent reference](weber-delayed-pair-independent-reference.md) (lane C; method of steps, fixed-step classical Runge–Kutta at 4000 and 8000 steps per period, its own root solve, elimination and quintic history, written blind to lane B) passed the same six known cases first, recorded at 03:24:48Z and rerun at 03:34:18Z after integrator corrections that its document records, then ran the same preparations. Its derivations of Sections 2 to 4 agree with the Principal Investigator's in every displayed formula, including the cancellation of the second-order scalar terms in Theorem 4.1 and the attribution of the first-order term to three ingredients; it strengthened Theorem 3.1 by proving the equivalence without the invertibility hypothesis, which is needed only for uniqueness of the continuation, as stated here. Its circle census on $1<\beta\le6$ found exactly one continuous zero of $C_t$, $\beta_*\in[3.070356625378,3.070356625438]$, enclosing the value of Proposition 3.4, and identified the apparent sign change near $\beta\approx2.9717$ as a fold birth of two partner roots with $D_t\to0$, a nonordinary event and not a balance. Comparing the two lanes' run records by a script over matching labels:

| Quantity | Agreement | Comment |
| --- | --- | --- |
| $h$ at window end: SC-1, SC-2 (lane C at escape threshold $10^4$), SC-3, WP-1, WP-2 | relative $4\times10^{-10}$, $4\times10^{-15}$, $1\times10^{-8}$, $2\times10^{-12}$, $9\times10^{-7}$ | all within the preregistered $10^{-6}$ |
| maximum $r$ of SC-1 | relative $5\times10^{-9}$ | turning radius |
| WP-3 speed-equality time | relative $1.2\times10^{-10}$ | $0.5684620177$ in both lanes |
| full-window slopes of $\rho_h^2$ | relative $8\times10^{-6}$ (SC-1), $4\times10^{-5}$ (SC-2), $1\times10^{-4}$ (SC-3), $3\times10^{-4}$ (WP-2), $4\times10^{-3}$ (WP-1) | the two lanes use different slope estimators on a curve that is not linear; the preregistered $10^{-6}$ applied to $r$ and $h$, not to slopes |
| turning-point times: SC-1 maximum, WP-2 minimum | relative $5.6\times10^{-6}$ and $2.6\times10^{-3}$ | **disagreement beyond $10^{-6}$**, explained but not averaged: lane C locates turning points at its nodes (step $0.006$ for WP-2) and both extrema are flat, so the radii agree to $10^{-9}$ while the times do not |
| $h$ at the WP-3 stop | relative $1.8\times10^{-4}$ | **disagreement beyond $10^{-6}$**, unresolved: the event times agree to $10^{-10}$, so the difference is in where each lane evaluates $h$ at a stopped run; neither lane's value is preferred here |
| SC-2 at the preregistered escape threshold | lane C stops at $T=0$ with an escape event; lane B's crossing-based detector does not fire | both lanes report the threshold as a preregistration defect; lane C's completed run uses a labelled threshold $10^4$ with state, window and law unchanged |

Lane C also recorded a quasi-circular estimate of the rate correction, $(K/c_f)(1-\tfrac53\beta^2)$, graded inferred, and noted that it does not explain the first-half slopes above $K/c_f$, which both lanes measured and which remain open. Agreement between the two lanes tests two implementations of the same frozen law on the same histories; it does not test the law, and the derived statements rest on the proofs in Sections 2 to 5.

Claim grade of the agreement: measured, by direct comparison of the two lanes' run records. Falsifier: a rerun of either lane whose $h$ at a completed window departs from the other's by more than $10^{-6}$.

## 9. Claims, grades and falsifiers

| Claim | Grade | Falsifier |
| --- | --- | --- |
| One partner root, no self root, $D_t>0$, $\det M_i>1$ on subfield pair histories (Lemmas 2.1, 2.2) | derived | a subfield state with two partner roots, a self root or $\det M_i\le1$ |
| Bracket exactly one on rigid circles; Section 9a circle iff canonical circle (Theorem 3.1) | derived | a rigid root branch with nonzero $\dot{\mathscr R}$, or a circle balanced under one law only |
| No exact circle for $0<\beta\le1$ (Corollary 3.3) | derived | a zero of the tangential coefficient on $(0,1]$ |
| Exact superfield circles at $\beta_1,\beta_2,\beta_3$ (Proposition 3.4) | measured scan, identification derived | a missed zero or disagreement with the certified canonical value |
| First departure from Section 9 at order $1/c_f$, from range, weight and line of action together; bracket agrees through $1/c_f^2$; additive decomposition (Theorems 4.1 to 4.3) | derived, numerically checked | a remainder of the wrong order on a smooth prescribed history |
| No scalar bracket removes the first-order forward push (Corollary 4.4) | derived | a counterexample bracket |
| Admissible-past class, release jump formula, local existence and uniqueness, continuation alternative (Section 5) | derived | a nonunique continuation or a jump violating Proposition 5.2 |
| Slow pair expands at leading rate $K/c_f$ with relative correction $O(\beta^2)$ (Section 6) | derived formally; measured on three windows by two separately authored instruments, SC-2 slope within $0.2\%$ of $K/c_f$ | a negative or non-canonical measured slope |
| Rate not constant over the windows; first-half slopes above $K/c_f$ (Sections 6 and 8) | measured, open | an explanation at second order, or a longer slow window showing the first-half excess is transient |
| WP-1 and WP-2 unbound within one radial period; WP-3 reaches the wake speed at $T=0.5684620177$ (Section 7) | measured, both lanes | a run from the same state and past that stays bound or below $c_f$ |
| No bound class persists under Section 9a on the pair (Section 8) | inferred from the derived exclusion, the derived leading rate and the measured fates | a complete subfield history on which $h$ does not grow on average |
| Three causal-delay adaptations could retain binding ([proposals](weber-delayed-pair-adaptation-proposals.md)) | proposals, not executed | a first-order expansion of a proposal that still shows a transverse push |

**Elapsed time.** Start 2026-10-06T02:56:30Z; frozen 2026-10-06T03:50Z; fifty-four minutes of the four-hour window were used. Lane B used thirty minutes and lane C thirty-two minutes of wall time; no run exceeded nine seconds, so no supervised job was launched; the closeout for owner task `claude-weber-delayed-pair-20261006` reported `clear`.

**Next decisive step.** The structural result of Corollary 4.4 is the decisive fact for any continuation: the pair cannot be bound by any scalar bracket on the canonical delayed line of action. If the operator wishes to pursue a delayed Weber family further, the first calculation is the slow-motion expansion of proposal P1 (extrapolated line of action), by hand, before any evolution; if the first-order transverse term vanishes there, the second-order secular rate of $h$ under P1 decides. The open measured item within the frozen law is the first-half slopes above $K/c_f$ on the slow circles, which a longer window at $\beta=0.01$ with the same two instruments would settle.

## 10. Propagation list for later single-writer integration

Every item names its source here and its destination; none has been applied, because shared manuscripts, priorities, queues, the registry, the ledger and the equation-variants directory were off limits to this investigation.

| Source here | Destination | Proposed entry |
| --- | --- | --- |
| Theorem 3.1, Corollary 3.3, Proposition 3.4 | [equation-variants manuscript, Section 9a](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation) | one paragraph: on the pair, Section 9a has exactly the canonical circles; none for $0<\beta\le1$; the superfield ones are BIN-3's, with untransferred stability |
| Theorems 4.1 to 4.3, Corollary 4.4 | same section | one paragraph: first departure from Section 9 at order $1/c_f$ from the delayed prefactor; additive decomposition; no scalar bracket removes the forward push |
| Sections 6 to 8 | [binary-research manuscript](../manuscript.md), after the Section 9 Weber passage | a subsection "Delayed Weber pair" with the rate table, the eccentric fates and the verdict, at the stated grades |
| Section 8 verdict | [binary-research priorities](../priorities.md) and [work-queue](../work-queue.md) | a readable synthesis with the verdict and the open first-half-slope item; the proposals document indexed as proposals only |
| Corollary 3.3 and Proposition 3.4 | [geometry configuration registry](../../configurations/geometry-configuration-registry.md) | a BIN row: "Antipodal uniform circle, Section 9a: excluded for $0<\beta\le1$ (derived); exact at the canonical superfield values (derived from BIN-3); stability not transferred" |
| Sections 6 and 8 | [findings ledger](../../configurations/findings-ledger.md) | an F-BIN row: "Section 9a slow pair drifts at $d(\rho_h^2)/dT=K/c_f(1+O(\beta^2))$; derived leading order, measured on two instruments; bound class lost" |
| Lemma 2.2 | equation-variants manuscript, Section 9a domain statement | the invertibility hypothesis holds automatically for an opposite-polarity pair below the wake speed |
| Section 5 | [braid-program delayed ring screen](../../braid-program/analysis/weber-delayed-ring-screen.md) cross-reference | the neutral-equation release-jump propagation applies to any Section 9a evolution from a declared past |

## Addenda

- 2026-10-06T03:50Z: Sections 6 to 10 completed from the two lanes' records; status set to frozen. No target state, window or law clause changed after the preregistration freeze; the preregistration defects found by the lanes are recorded in its addenda.
- 2026-10-06T03:59Z, validation: `node scripts/check-content-integrity.mjs` ran with six of seven required checks passing and "Validate content indexes and references" failing on one warning, a markdown link to the directory `weber-delayed-pair-cases/` in the instrument note; the link was replaced by plain text and `node scripts/validate-content.mjs --check --strict` then passed with 0 errors and 0 warnings. No generated artifact was written. Relative links in the five new documents resolve by a basename check, and no disallowed causal-delay term appears in any new file by grep.
