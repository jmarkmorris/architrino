# Continuation through the second receiving shell of the fixed smooth control

## Result and scope

For the unchanged smooth two-target complete history and $0<G/\ell\le16$, the EOM population continues through the distance-$\sqrt3\ell$ received pulse to the common horizon $T=79\ell/128$. Exactly 32 environmental labels have nonconstant future histories on this interval, comprising the original 24 labels and eight new receivers. Forty ordered receiver/source pairs receive a complete old pulse: 24 at anchor distance $\sqrt2\ell$ and 16 at anchor distance $\sqrt3\ell$. Eight of the original receivers receive from both changed sources. The two targets and every other label remain stationary throughout the future interval.

The original history class, summation convention and complete root census are preserved. Every arriving emission satisfies $s\le-195\ell/512<0$. Thus the environmental futures are solved under the equation, but their newly generated emissions have not yet arrived. This is a finite-interval theorem for the fixed supplied disturbance, not a theorem for arbitrary old-history perturbations or a selected physical population domain.

Claim grade: derived, submitted for independent reconstruction. The previous [first-pulse theorem](smooth-two-particle-pulse-continuation.md) and its [independent adjudication](smooth-two-particle-pulse-independent-adjudication.md) remain unchanged dependencies. This extension retains their positive coupling range and does not reclassify $16<G/\ell<2^{48}$ or the independently accepted original-class obstruction at $G/\ell\ge2^{48}$. No contact, genericity, account or global existence claim follows.

## 1. Unchanged input and improved estimate

Set $c_f=1$, $\mathbf z_i=\ell i$ for $i\in\mathbb Z^3$, $\sigma_i=(-1)^{i_1+i_2+i_3}$ and $G=\kappa q_0^2>0$. The changed labels are $E=\{0,e_1\}$, $e_1=(1,0,0)$, with common displacement direction $\mathbf e=(0,0,1)$. Their complete prescribed pasts are

$$
\mathbf X_j(s)=\mathbf z_j+\varepsilon\ell\mathbf e\,
\psi\big(8(s/\ell+5/4)\big),\quad j\in E,\quad s\le0,
\qquad \varepsilon=2^{-16},
$$

where $\psi(v)=v(1-v^2)^4$ on $|v|<1$ and is zero elsewhere. Every other past is stationary. The support is $[-11\ell/8,-9\ell/8]$, and derivatives through third order vanish at its endpoints. These supplied pasts are not asserted to solve the past EOM. The [original class](population-history-class.md) and the fixed eight-source block prescription are unchanged.

The earlier coefficient-sum bound on pulse speed can be sharpened without altering the pulse. Inside its support,

$$
\psi'(v)=(1-v^2)^3(1-9v^2).
$$

For $z=v^2\in[0,1]$, the derivative of $(1-z)^3(1-9z)$ is $12(1-z)^2(3z-1)$. Its extrema and endpoints give values $1,-16/27,0$, proving $|\psi'|\le1$. Therefore the exact same history satisfies

$$
\sup\|\dot{\mathbf X}_j\|\le\nu=8\varepsilon=1/8192.
$$

The previously proved bounds on displacement, input acceleration and input jerk remain available:

$$
\sup\|\mathbf X_j-\mathbf z_j\|\le\varepsilon\ell,
\quad \sup\|\ddot{\mathbf X}_j\|\le3/(8\ell),
\quad \sup\|\mathbf X_j^{(3)}\|\le27/(2\ell^2).
$$

Use dimensionless time $t=T/\ell$, coupling $g=G/\ell$ and receiver displacement $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\mathbf z_i)/\ell$. Physical velocity, acceleration and jerk are respectively $\mathbf y_i'$, $\mathbf y_i''/\ell$ and $\mathbf y_i'''/\ell^2$. All labels remain stationary through the accepted onset $t_* =\sqrt2-11/8$.

## 2. Fixed-source representation and receiving set

Take the proof ball and common horizon

$$
b=1/1024,\qquad H=79/128<5/8.
$$

These are bounds for the solution, not changes to the admitted class. The accepted cubic stationary field satisfies, under the original block sum,

$$
\|\mathbf S(\mathbf y)\|\le C_b\|\mathbf y\|^3,
\quad \|D\mathbf S(\mathbf y)\|\le3C_b\|\mathbf y\|^2,
\qquad C_b=1309/(1-b)^5<1400.
$$

Its derivation uses stationary equilibrium, signed cube symmetry and the absolutely summable third kernel derivative. No stability conclusion is inferred. The receiver's own stationary source is omitted from this field; the constructed full histories will have no positive self roots.

For a changed cross source $j$ and receiver $i$, put $\mathbf k=i-j$ and $u=s/\ell+11/8$. The unchanged profile can be written exactly as $p(u)=(-1+8u)u^4(1-4u)^4$ on $[0,1/4]$ and zero elsewhere. Define at its actual source root

$$
\begin{gathered}
\mathbf R=\mathbf k+\mathbf y-p(u)\mathbf e,\quad r=\|\mathbf R\|,
\quad \mathbf n=\mathbf R/r,\quad D=1-n_3p'(u),\\
t+11/8-u=r,\qquad
\mathbf Q_{\mathbf k}(t,\mathbf y)
=\frac{\mathbf K(\mathbf R)}D-\mathbf K(\mathbf k+\mathbf y),
\quad \mathbf K(\mathbf x)=\mathbf x/\|\mathbf x\|^3.
\end{gathered}
$$

Every such cross root is unique and lies in the supplied past on this ball: at source time zero the delay-minus-range residual is at most $H-(1-b)<0$, and it becomes positive toward the remote past with slope at least $1-\nu$ in delay. Thus an auxiliary stationary extension used to define the source function never supplies an active emission. The exact receiver equations are

$$
\mathbf y_i''=g\left[\mathbf S(\mathbf y_i)
+\sum_{j\in E\setminus\{i\}}\sigma_i\sigma_j\mathbf Q_{i-j}(t,\mathbf y_i)\right].
$$

There are at most two finite corrections. The polarity factor must be retained: it is $+1$ for distance squared two and $-1$ for distance squared three. Receiver playback does not weight the acceleration.

At either support endpoint the source is at its anchor. A receiver displacement bounded by $b$ shifts its reception time from the anchor time by at most $b$. The strict inequalities

$$
-1/8+b<0,
\qquad H<2-11/8-b,
\qquad \sqrt3-9/8+b<H
$$

therefore exclude all distance-one pulses after release, exclude every distance-at-least-two pulse before $H$, and allow complete reception of the distance-$\sqrt3$ pulse before $H$. Their interpretation follows from monotonicity of the source-root residual, not deletion of roots by distance. For any inactive pulse, the complete root remains present but its source history equals the stationary reference there.

The possible receiving labels are consequently

$$
\mathcal A=\bigcup_{j\in\{0,e_1\}}
\{i:\|i-j\|^2\in\{2,3\}\}.
$$

Each distance-squared-two sphere contains twelve labels and each distance-squared-three sphere contains eight. Equal squared distances to the two target centers are impossible, since their difference is $2i_1-1$. The mixed intersections each have four labels: $(0,\pm1,\pm1)$ and $(1,\pm1,\pm1)$. Thus there are 40 ordered pulse pairs, eight double receivers and 32 distinct receiving labels. The new eight labels beyond the accepted first set are exactly

$$
\mathcal N=\{(-1,\pm1,\pm1),(2,\pm1,\pm1)\}.
$$

Neither target belongs to $\mathcal A$. At every anchor outside $\mathcal A$, the finite corrections and stationary field vanish throughout $[0,H]$, so the constant future solves the receiver equation there.

## 3. Uniform continuation without narrowing the coupling range

For a possibly active correction, $\|\mathbf k\|\ge\sqrt2$. Both its actual range and the segment to the stationary position satisfy $r\ge\sqrt2-b-\varepsilon>1$. Since $\|D\mathbf K\|\le2$ and $\|\mathbf K\|\le1$ on that segment, exact subtraction gives

$$
\|\mathbf Q_{\mathbf k}\|
\le\frac{2\varepsilon+\nu}{1-\nu}
=\frac5{32764}.
$$

Distance-one corrections vanish identically on this ball, so their smaller ranges do not enter this bound. Including both possible changed-source rows, the uniform coefficient obeys

$$
\|\mathbf S\|+\sum_j\|\mathbf Q_{i-j}\|
\le C_b b^3+\frac{10}{32764}<\frac1{3200}.
$$

The last inequality is a strict rational comparison; for example replacing $C_b$ by $1400$ still suffices. The source functions are at least $C^2$ in time and receiver position: the old profile is $C^3$, ranges are positive and implicit-source denominators have a uniform floor. The finite system for the 32 labels therefore has a locally unique classical solution. Starting from zero displacement and velocity at release gives, up to a first exit,

$$
\|\mathbf y_i''(t)\|<g/3200,
\qquad \|\mathbf y_i'(t)\|\le gt/3200,
\qquad \|\mathbf y_i(t)\|\le gt^2/6400.
$$

For $0<g\le16$ and $t\le H<5/8$,

$$
\|\mathbf y_i\|<\frac{16(5/8)^2}{6400}=\frac1{1024}=b,
\quad \|\mathbf y_i'\|<\frac1{320},
\quad \|\mathbf y_i''\|<\frac1{200}.
$$

The strict interior estimate excludes the first displacement exit. Smoothness on a slightly larger ball and bounded velocity exclude finite ordinary-differential-equation breakdown before $H$. Appending stationary paths outside $\mathcal A$ constructs every environmental and target future. The uniform receiver Lipschitz constants also yield uniqueness in the bounded classical comparison class (displacement at most $b$, speed at most $1/4$). On this class the complete causal identification in Section 5 reduces the full equation to the same receiver equations. This is not a claim of uniqueness across singular or unbounded alternative continuation classes.

For jerk, one can retain the conservative differentiated-row estimate from the first-pulse proof. Along a receiver path, write $\mathbf v=\mathbf y_i'$, $\mathbf W=p'(u)\mathbf e$, $\mathbf A=p''(u)\mathbf e$. Differentiating the actual root gives

$$
u'=\frac{1-\mathbf n\cdot\mathbf v}{D},
\quad \mathbf R'=\mathbf v-\mathbf W u',
\quad \mathbf n'=\frac{(I-\mathbf n\mathbf n^{\mathsf T})\mathbf R'}r,
\quad D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,u'.
$$

Using the weaker already accepted bounds $\|\mathbf v\|\le1/4$, $\|\mathbf W\|\le5/512$ and $\|\mathbf A\|\le3/8$, with $r>1$, gives $|u'|<4/3$, $\|\mathbf R'\|<17/64$, $|D'|<33/64$ and $D>63/64$. Hence, including the derivative of the subtracted stationary row,

$$
\left\|\frac{d\mathbf Q_{\mathbf k}}{dt}\right\|
<\frac{34}{63}+\frac{2112}{3969}+\frac12<2.
$$

There are at most two such corrections, and $3C_b b^2<1/256<2$ bounds the stationary derivative. It follows that $\|\mathbf y_i'''\|<5g\le80$. The source profile's endpoint flatness makes acceleration and jerk continuous at every reception boundary. The joined histories remain globally $C^3$ through release and both received pulses. Completion of a pulse does not assert that a moving receiver stops.

## 4. Moving reception times and the eight new motions

For every one of the 40 pulse pairs, with $d=\|i-j\|\in\{\sqrt2,\sqrt3\}$, define

$$
F_{ij}^{a}(t)=t+11/8-\|i-j+\mathbf y_i(t)\|,
\qquad
F_{ij}^{b}(t)=t+9/8-\|i-j+\mathbf y_i(t)\|.
$$

Both derivatives are at least $319/320>0$. The displacement estimate brackets their unique zeros as

$$
t_{ij}^{a}\in[d-11/8-b,d-11/8+b],
\qquad
t_{ij}^{b}\in[d-9/8-b,d-9/8+b].
$$

All brackets lie in $[0,H]$; the last endpoint is below $\sqrt3-9/8+b<H$. The zeros solve the actual moving-receiver causal equations. Along a root, $u'=(1-\mathbf n\cdot\mathbf y_i')/D>0$, so the pulse is traversed in order and cannot be reentered. The second pulse begins at a shifted time for the eight already moving double receivers; its start must not be identified with the anchor time by assumption.

For the eight new labels, their constant anchor path solves the equation until

$$
t_3=\sqrt3-11/8.
$$

Their other target is at distance $\sqrt6$, whose pulse is outside this horizon. Thus their first motion begins at the exact anchor onset $t_3$. To prove nonconstant motion rather than only count potential receivers, set $\theta=t-t_3>0$ and let $\mathbf k=i-j$ relative to the new label's distance-$\sqrt3$ source. Here $\|\mathbf k\|^2=3$, $k_3=\pm1$ and $\sigma_i\sigma_j=-1$.

Near the support start, $p(u)=-u^4+O(u^5)$ and $p'(u)=-4u^3+O(u^4)$. At the anchor the implicit root gives $u=\theta+O(\theta^4)$ and therefore

$$
\mathbf Q_{\mathbf k}(t_3+\theta,0)
=-\frac{4\mathbf k k_3}{9}\theta^3+O(\theta^4).
$$

The receiver field is uniformly locally Lipschitz in $\mathbf y$. Its integral equation with zero initial displacement and velocity consequently gives $\mathbf y_i=O_g(\theta^5)$: the anchor acceleration is $O_g(\theta^3)$, and the Lipschitz feedback is bounded by an integral with kernel $\theta-s$, so the usual elementary integral iteration preserves that fifth-order bound. Substitution back into the implicit root and acceleration changes the remainder only at higher order. After including the negative polarity product and integrating twice,

$$
\boxed{\quad
\mathbf y_i(t_3+\theta)
=\frac{g\mathbf k k_3}{45}\theta^5+O_g(\theta^6).
\quad}
$$

The coefficient is nonzero for every $g>0$. The original 24 histories are already nonconstant by the accepted first-response theorem. Together with the stationary complement this proves exactly 32 nonconstant environmental future histories on $[0,H]$. It does not assert nonzero instantaneous velocity at every time.

## 5. Complete EOM roots and original-class preservation

Join all constructed futures to their complete prescribed pasts. The sharpened old speed and new motion estimates give complete displacement less than $b\ell$ and complete speed at most $1/320$. At every reception through $H\ell$, for every cross channel and all earlier emissions,

$$
r_{ij}(T,s)\ge\ell\|i-j\|-2b\ell\ge511\ell/512.
$$

The full delay residual $f_{ij,T}(\tau)=\tau-\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|$ grows at least $319/320$ times the delay increment. It starts negative and becomes positive toward the remote past by the displacement bound. Thus there is exactly one cross root, globally over positive delay. Its half-width $w=\ell/256$ tube has positive delay and range at least $511\ell/512$, with transmitter floor $319/320$ throughout. Its complement satisfies $|f|\ge319w/320>w/4$.

For self channels, the complete speed bound gives $f_{ii,T}(\tau)\ge319\tau/320$. There are no positive-delay self roots. Both the normalized near-diagonal margin and the ordinary complement for $\tau\ge2w$ exceed their original floors. The exact diagonal is not assigned a value. No fold, root birth or omitted remote emission is hidden in the census.

Every retained cross root now satisfies

$$
s=T-r\le\ell\left(\frac{79}{128}-\frac{511}{512}\right)
=-\frac{195\ell}{512}<0.
$$

This proves that the old-source representation is the full EOM on the constructed interval. Environmental motion is solved, while absence of its newly generated emissions from the received update follows from geometry. In the broader comparison class used for uniqueness, complete speed at most $1/4$ still excludes self roots, and the same displacement bound excludes all nonnegative cross emissions, which suffices for the same identification.

The complete-history bounds include

$$
\begin{gathered}
\sup\|\mathbf X_i-\mathbf z_i\|<\ell/1024,
\qquad \sup\|\dot{\mathbf X}_i\|\le1/320,\\
\sup\|\ddot{\mathbf X}_i\|\le\max(3/8,g/3200)/\ell,
\qquad
\sup\|\mathbf X_i^{(3)}\|\le\max(27/2,5g)/\ell^2.
\end{gathered}
$$

For $g\le16$, these retain the original displacement, speed, acceleration and jerk ceilings with slack. Equal-time separation exceeds the original release threshold, and the unchanged cube-volume argument retains the same infinite density bounds. The complete history at every cut through $H\ell$ lies in the original declared class.

Falsifiers of the extension are a violated exact pulse-speed inequality; a missing signed source row; an uncounted receiving pair inside the proved ball and horizon; failure of the strict acceleration comparison; a displacement exit despite that comparison; a second root despite complete monotonicity; an arriving nonnegative emission despite its range bound; or a failed class ceiling under the displayed estimates. A different independently prescribed history or a coupling outside the stated range is outside the theorem.

## 6. What this resolves and what remains

The proved interval receives the entire next old pulse at every relevant moving receiver, without changing the pulse, its two source labels, the coupling range or the summation rule. The perturbation is supplied in the past; the environmental response is generated by the equation. Unlike the rigid-cell obstruction, no independently chosen distant old disturbances are introduced.

The next anchor distance is $2\ell$, with support start at $t=5/8$, beyond this horizon and the displacement margin. Continuing through that shell requires another receiving-set and motion estimate. The condition $t<1-2b$ still suffices to exclude nonnegative cross emissions while the displacement bound holds, but is not itself a lifespan theorem. Once newly generated emissions actually arrive, source and receiver variations must both enter a coupled-history estimate. The targets remain stationary and separated by $\ell$ in this control; no target-contact conclusion or generic populated-universe conclusion is obtained.

## Development and validation record

The operator selected continuation through the next receiving shell. This document is the new proof owner; the previous pulse, first-response, class and independent-adjudication sources remain read-only. Seven scientific input hashes were frozen with shasum -a 256 in .tmp/smooth-two-particle-second-shell/frozen-inputs.sha256 before development. The existing historical manuscript-coverage snapshots remain historical bindings, not files to refresh. No generator or scientific-reference source is changed.

The new exact-rational and finite-lattice instrument .tmp/smooth-two-particle-second-shell/check.mjs passed known arithmetic, comparison and six-unit-neighbor controls before target use, recorded in known-check.txt. Its target run verified the strict rational acceleration constants, squared shell-separation comparisons, horizon, emission bound and 32-label/40-pair/eight-double-receiver enumeration. These measured arithmetic checks are supplementary; they do not establish the analytical continuation theorem. The proof requires independent reconstruction before acceptance. No numerical EOM evolution or simulation evidence is claimed.
