# Sharpness of the light-cone condition for the infinite alternating lattice

## Result

**In words.** The [fixed-past field theorem](saturday-cross-geometry-continuation-2026-10-20.md#4-theorem-a-the-far-members-act-as-a-fixed-field) for the infinite alternating lattice asks, besides a uniform anchor ball and a speed margin, that the far members' displacements and speeds at their emission times be summable against the inverse cube and the inverse square of distance. This note shows that this summability cannot be dropped or weakened in exponent. For any profile of amplitudes that fails it on a cone of sources, there is a history with that profile, with every member inside a small anchor ball, with speeds far below wake speed, three times continuously differentiable paths, exactly one ordinary causal root in every ordered channel between distinct members and no positive-delay root in any member's own channel, for which the prescribed lattice sum at one receiver diverges to positive infinity in one component under every order of the complete eight-source blocks.

The mechanism is the one accepted in the [delayed-summation obstruction](population-delayed-summation.md#exact-causal-rows-and-the-common-sign-correction) for the population class. Each source in a cone is given one short pulse, timed so that it occurs exactly when that source emits the wake that reaches the receiver at the reception time. If the pulse gives the source a velocity along the line of sight whose sign follows the source's polarity, the change of the transmitter weight $1/D$ multiplies the source's polarity a second time, so the correction to its row points the same way for both polarities. If the pulse instead displaces the source along the line of sight with the same polarity-following sign, the change of range does the same. The corrections cannot cancel between neighbouring sources of opposite polarity, and their sum is the sum of the amplitudes against the inverse square (velocity pulses) or the inverse cube (displacement pulses) of distance.

**Theorem B.** *Let $\mathcal C$ be the cone of labels defined below and let $0\le\nu_j\le1/1024$ for $j\in\mathcal C$. (V) If $\sum_{j\in\mathcal C}\nu_j\lvert j\rvert^{-2}=\infty$, the velocity-pulse history built from $(\nu_j)$ satisfies the hypotheses (H1) and (H2) of Theorem A with $b=1/64$ and $w=5/64$ at receiver $0$ and time $0$, has $\nu_j\le V_j\le80\nu_j$ on every light-cone window, and its prescribed sum at reception $(0,\mathbf 0)$ diverges to $+\infty$ in the first component under every exhaustion by complete blocks. (E) If $\sum_{j\in\mathcal C}\nu_j\lvert j\rvert^{-3}=\infty$, the displacement-pulse history has the same properties, with $E_j=\nu_j$ and $V_j=L_j=0$ on every light-cone window for window half-width $h\le1/4$, in place of the velocity statement.* **Grade: derived.**

In particular, for power profiles $\nu_j=\nu\lvert j\rvert^{-k}$ with $0<\nu\le1/1024$: velocity pulses diverge for every $k\in[0,1]$, and displacement pulses diverge for $k=0$, which is a uniformly bounded displacement. These are exactly the complements of the thresholds $k_1>1$ and $k_0>0$ of [Corollary A.3](saturday-cross-geometry-continuation-2026-10-20.md#6-explicit-tails). For $k_1>1$ and $k_0>0$ the same families satisfy Theorem A, so the dividing lines are sharp within power profiles.

Every history here is a prescribed past. None is claimed to solve the equation, and nothing here says that a solution of the lattice equation can carry such a profile on a receiver's past light cone. What the theorem shows is that the light-cone condition of Theorem A is not implied by the uniform hypotheses that suffice for finite populations: positive separation, a speed margin, three times continuously differentiable paths and ordinary roots.

## 1. Setting and the two families

The population, rows, roots and prescription are those of Section 2 of the [field theorem](saturday-cross-geometry-continuation-2026-10-20.md#2-setting): labels $j\in\mathbb Z^3$, anchors $\mathbf p_j=j$, polarities $\sigma_j=(-1)^{j_1+j_2+j_3}$, coupling $g>0$, $c_f=1$, row $g\sigma_i\sigma_j\Psi(\mathbf R,\mathbf v)$ with $\Psi=\mathbf n/(r^2D)$, and the prescribed sum $\mathbf B_i=g\sigma_i[\mathbf S_i+\sum_{j\ne i}\sigma_j\mathbf c_j]$ with the stationary field summed by complete eight-source blocks and the correction required to converge absolutely. The receiver is label $0$, which has $\sigma_0=+1$; it rests at its anchor for all time up to the reception time $0$.

For $j\ne0$ put $d_j=\lvert j\rvert$ and $\mathbf n_j=-j/d_j$, the unit vector from anchor $j$ toward the receiver. With $\mathbf e=(1,0,0)$, the cone is

$$
\mathcal C=\{j\ne0:\ d_j\ge10,\ \mathbf n_j\cdot\mathbf e\ge1/2\}.
$$

Two pulse shapes are used. The velocity pulse is the one of the accepted obstruction, extended by zero outside $(-1,1)$; the displacement pulse is a plateau with a three-times-differentiable step on each side, extended by zero outside $(-2,2)$:

$$
\psi(t)=t(1-t^2)^4\quad(\lvert t\rvert<1),\qquad
\phi(t)=\begin{cases}1,&\lvert t\rvert\le1,\\ 1-P(\lvert t\rvert-1),&1<\lvert t\rvert<2,\end{cases}\qquad P(u)=35u^4-84u^5+70u^6-20u^7 .
$$

The polynomial $\psi$ vanishes to fourth order at $\pm1$. The step $P$ has $P(0)=0$, $P(1)=1$ and $P'(u)=140u^3(1-u)^3$, so its first three derivatives vanish at both ends of $[0,1]$. Both extensions are therefore three times continuously differentiable. They satisfy $\psi(0)=0$, $\psi'(0)=1$, and $\phi=1$, $\phi'=0$ on $[-1,1]$. Termwise absolute bounds of the expanded polynomial on $[-1,1]$ give $\lVert\psi\rVert_\infty\le16$ and $\lVert\psi'\rVert_\infty\le80$ (the bounds of the accepted obstruction); and $0\le\phi\le1$, $\lVert\phi'\rVert_\infty=\max P'=140/64<3$.

**Velocity-pulse family (V).** For $j\in\mathcal C$, $\mathbf X_j(s)=\mathbf p_j+\nu_j\sigma_j\mathbf n_j\,\psi(s+d_j)$; every other label, including the receiver, rests at its anchor.

**Displacement-pulse family (E).** For $j\in\mathcal C$, with $s_j^*=-(d_j-\nu_j\sigma_j)$, $\mathbf X_j(s)=\mathbf p_j+\nu_j\sigma_j\mathbf n_j\,\phi(s-s_j^*)$; every other label rests at its anchor.

In both families each pulse is supported in an interval of length at most $4$ centred within $10^{-3}$ of $-d_j\le-10$, so every pulse ends before time $-7$; the support moves to older times as the source is farther, and all labels are at their anchors at time $0$. Uniformly, in family (V) the displacement is at most $16\nu_j\le1/64$ and the speed at most $80\nu_j\le5/64$; in family (E) the displacement is at most $\nu_j\le1/1024$ and the speed at most $3\nu_j<1/256$.

> Claim grade: derived. The bounds are termwise polynomial estimates; the paths are three times continuously differentiable with uniformly bounded derivatives, so their velocities are Lipschitz. Falsifier: a label of either family exceeding the stated displacement or speed bound for an admitted $\nu_j$.

## 2. Hypotheses of the field theorem and the root census

Take $T_*=0$ and receiver $i=0$. Hypothesis (H1) holds with $b=1/64$, since every displacement is at most $1/64$ at every past time; (H2) holds with $w=5/64$, since every speed is at most $5/64$. For any $h<(1-2b)/2$ the root census then holds at every reception in $N_h$ by the argument in the proof of Theorem A(a), which uses only (H1) and (H2) and not the summability that these histories are built to violate: every other member has exactly one root, emitted at least $\gamma=1-2b-2h$ before the event, with $D\ge1-w=59/64$. Every member also has an empty positive-delay own channel, because its chord over any delay $\tau>0$ is at most $w\tau<\tau$. At the reception $(0,\mathbf 0)$ itself the root of a pulsed source is exact.

- *Family (V).* At $s=-d_j$ the source is at its anchor, $\mathbf X_j(-d_j)=\mathbf p_j$, because $\psi(0)=0$, and its range from the receiver is $d_j$, equal to the delay. So $s=-d_j$ is the root. Its direction is $\mathbf n_j$ and its source velocity is $\nu_j\sigma_j\mathbf n_j$, because $\psi'(0)=1$, so $D=1-\nu_j\sigma_j$.
- *Family (E).* At $s=s_j^*$ the source is at $\mathbf p_j+\nu_j\sigma_j\mathbf n_j=-(d_j-\nu_j\sigma_j)\mathbf n_j$, at range $d_j-\nu_j\sigma_j=-s_j^*$ from the receiver, so $s_j^*$ is the root. The source velocity there is zero, because $\phi'=0$ on the plateau, so $D=1$; the direction is $\mathbf n_j$.

On the light-cone window $W_j=[-d_j-c_W,-d_j+c_W]$ of the field theorem, which contains the pulse centre, family (V) has $V_j\ge\lvert\mathbf X_j'(-d_j)\rvert=\nu_j$ and $V_j\le80\nu_j$, and, when $h\le1/4$, family (E) has $E_j=\nu_j$ and $V_j=L_j=0$: then $c_W=2b+2h\le17/32$, so the window $W_j$ lies within $c_W+\nu_j<1$ of $s_j^*$, that is, inside the plateau, where the displacement is the constant $\nu_j\sigma_j\mathbf n_j$.

> Claim grade: derived. Falsifier: a second root in some channel of either family, a root later than $-\gamma$, or an error in the exact root evaluations; the monotonicity argument of Theorem A(a) and the two displayed equalities are where to look.

## 3. The corrections have a common sign

Write $\mathbf c_j$ for the correction row of source $j$ at the reception $(0,\mathbf 0)$, so that the prescribed sum is $g[\mathbf S_0(\mathbf 0)+\sum_j\sigma_j\mathbf c_j]$. Unpulsed sources rest at their anchors, so their corrections vanish.

*Family (V).* The actual row is $\mathbf n_j/(d_j^2(1-\nu_j\sigma_j))$ and the static row is $\mathbf n_j/d_j^2$, so

$$
\sigma_j\mathbf c_j=\frac{\sigma_j\mathbf n_j}{d_j^{2}}\Bigl[\frac1{1-\nu_j\sigma_j}-1\Bigr]=\frac{\nu_j\,\mathbf n_j}{d_j^{2}(1-\nu_j\sigma_j)},
$$

because $\sigma_j^2=1$. This is the identity of the accepted obstruction with a source-dependent amplitude. Its projection on $\mathbf e$ is at least $\nu_j/(2(1+\nu_j)d_j^2)\ge\nu_j/(3d_j^2)$ on the cone.

*Family (E).* The actual row is $\mathbf n_j/(d_j-\nu_j\sigma_j)^2$, so

$$
\sigma_j\mathbf c_j=\sigma_j\mathbf n_j\Bigl[\frac1{(d_j-\nu_j\sigma_j)^{2}}-\frac1{d_j^{2}}\Bigr].
$$

For $\sigma_j=+1$ the bracket is positive and at least $2\nu_j/d_j^3$. For $\sigma_j=-1$ the bracket is negative and $\sigma_j$ reverses it, giving $\mathbf n_j\,\nu_j(2d_j+\nu_j)/(d_j^2(d_j+\nu_j)^2)$, whose coefficient is at least $2\nu_j/(d_j(d_j+\nu_j)^2)\ge2\nu_j/(d_j^3(1+\nu_j/d_j)^2)\ge\nu_j/d_j^3$, because $\nu_j/d_j\le10^{-4}$. Either way $\sigma_j\mathbf c_j$ is a nonnegative multiple of $\mathbf n_j$ with coefficient at least $\nu_j/d_j^3$, and its projection on $\mathbf e$ is at least $\nu_j/(2d_j^3)$ on the cone.

In both families the polarity has disappeared from the sign: a positive source is pushed or moved one way and a negative source the opposite way, and the opposite polarity of the row turns both corrections in the same direction.

> Claim grade: derived. These are exact rational identities followed by elementary lower bounds; no expansion in $\nu_j$ is used. Falsifier: an error in either displayed identity or a pulsed source with negative $\mathbf e$-projection of $\sigma_j\mathbf c_j$.

## 4. Divergence under every block exhaustion

An *exhaustion by complete blocks* is a sequence of finite sets of complete eight-source blocks that eventually contains every block; it need not be nested. Along such a sequence $F_1,F_2,\dots$ the partial prescribed sums are

$$
\mathbf P_m=g\sum_{\mathbf n\in F_m}\Bigl[\mathbf B^0_{\mathbf n}(\mathbf 0)+\sum_{j\in\mathbf n,\,j\ne0}\sigma_j\mathbf c_j\Bigr],
$$

where $\mathbf B^0_{\mathbf n}$ is the block's stationary contribution. The stationary block series converges absolutely; this is the reconstructed [stationary block theorem](population-independent-adjudication.md#independent-reconstruction-of-stationary-block-convergence), here with unit spacing. So $\lvert\sum_{\mathbf n\in F}\mathbf B^0_{\mathbf n}(\mathbf 0)\rvert\le S_0=\sum_{\mathbf n}\lvert\mathbf B^0_{\mathbf n}(\mathbf 0)\rvert<\infty$ for every finite $F$. The corrections have nonnegative $\mathbf e$-projections, and by Section 3

$$
\sum_{j\in\mathcal C}\mathbf e\cdot\sigma_j\mathbf c_j\ \ge\ \frac13\sum_{j\in\mathcal C}\frac{\nu_j}{d_j^{2}}\quad\text{(V)},\qquad
\sum_{j\in\mathcal C}\mathbf e\cdot\sigma_j\mathbf c_j\ \ge\ \frac12\sum_{j\in\mathcal C}\frac{\nu_j}{d_j^{3}}\quad\text{(E)},
$$

both infinite by hypothesis. Given any threshold $M$, choose a finite set $Q$ of labels whose corrections have total $\mathbf e$-projection above $M/g+S_0$. Every block containing a label of $Q$ belongs to $F_m$ for all large $m$, and the remaining corrections in $F_m$ have nonnegative projection, so $\mathbf e\cdot\mathbf P_m>M$ for all large $m$. Hence $\mathbf e\cdot\mathbf P_m\to+\infty$ along every exhaustion by complete blocks, and the changed-source correction does not converge absolutely, so the prescription assigns no value.

For power profiles $\nu_j=\nu d_j^{-k}$, $0\le k$, the hypothesis is certified by the device of the accepted obstruction, the block-aligned box $Q_m=\{-2m\le j_1<-m,\ -m\le j_2,j_3<m\}$ for even $m\ge16$: it is a union of complete blocks, has $4m^3$ labels, lies in $\mathcal C$ because $\mathbf n_j\cdot\mathbf e\ge1/\sqrt3$ and $d_j\ge m$ there, and has $d_j\le\sqrt6\,m$. With $\nu_j=\nu d_j^{-k}$ it contributes at least $\frac{4\nu}{3}\,6^{-1-k/2}\,m^{1-k}$ in family (V) and at least $\frac{2\nu}{6\sqrt6}\,6^{-k/2}\,m^{-k}$ in family (E); the boxes with $m=2^p$, $p\ge4$, are disjoint, so the total is infinite for $0\le k\le1$ in (V) and for $k=0$ in (E).

For $k>1$ in family (V), and for $k>0$ in family (E) with $h\le1/4$, the light-cone sums of the [field theorem](saturday-cross-geometry-continuation-2026-10-20.md#4-theorem-a-the-far-members-act-as-a-fixed-field) converge. In family (V), $E_j\le16\nu d_j^{-k}$, $V_j\le80\nu d_j^{-k}$, and the Lipschitz constant of the velocity is at most $\nu d_j^{-k}\lVert\psi''\rVert_\infty$, so Corollary A.3 applies with centre $\mathbf c=\mathbf 0$ and $k_0=k_1=k_2=k$. In family (E), $E_j=\nu d_j^{-k}$ and $V_j=L_j=0$ on the windows, so $\Sigma_0=\sum2\nu d_j^{-k}\rho_j^{-3}$ and $\Sigma_1^x=\sum24\nu d_j^{-k}\rho_j^{-4}$ are finite for $k>0$ by the shell count, and $\Sigma_1^t=0$; Corollary A.3 is not needed, and would not apply for $k\le1$ because the velocities off the windows are of size $\nu d_j^{-k}$. The dividing exponents are therefore exactly $k_1=1$ for velocity and $k_0=0$ for displacement.

> Claim grade: derived. Falsifier: a complete-block exhaustion along which the first component of the partial sums stays bounded, which would contradict the nonnegativity of the corrections together with the absolute convergence of the stationary block series; or an error in the box count, cone inclusion or lower bounds.

## 5. Scope

- **What is shown.** The light-cone summability conditions of the field theorem are sharp as sufficient assumptions, in the worst-case sense that for any amplitude profile violating them on the cone there is a history in the uniform class, with exactly those amplitudes at the emission times, for which the prescribed sum does not exist. This is not a necessity theorem for every individual history whose amplitude majorant fails to be summable. The uniform hypotheses that make the finite-population lemma work, namely positive separation, a speed margin, Lipschitz velocities and ordinary roots, therefore do not by themselves transfer the fixed-past field control to the infinite lattice.
- **What is not shown.** That any solution of the lattice equation has such a profile; divergence at receivers other than label $0$; anything about the Lipschitz part of the light-cone condition, for which no counterexample is given; anything about other summation prescriptions, except that a prescription with a convergent stationary baseline over finite source sets fails in the same way, as the [summation adjudication](population-summation-independent-adjudication.md) accepts conditionally.
- **Relation to the accepted obstruction.** The accepted result is the case $\nu_j=\nu$ of family (V) in the population class with its own spacing; this note adds source-dependent amplitudes, the displacement family and the exact dividing exponents, and places the result against the positive theorem.

The arithmetic of this note is exact algebra and elementary counting. No instrument is used.
