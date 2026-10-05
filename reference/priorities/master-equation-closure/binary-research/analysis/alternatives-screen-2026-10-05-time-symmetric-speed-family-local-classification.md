# Local nonlinear classification at every strictly subfield circle

## Theorem, equation and topology

Claim grade: derived candidate, pending separate assessment by the coordinating investigator. Fix any $\beta_0\in(0,1)$. For the selected equal past/future canonical radial equation with mixing weight $1/2$ and $K=c_f=1$, the antipodal circular family exhausts all classical Cartesian periodic boundary solutions sufficiently close to the speed-$\beta_0$ circle in physical period and normalized position and velocity, modulo constant Euclidean motions. Each sufficiently nearby period selects exactly one circle from this family. At the base period itself, every sufficiently nearby solution is a rigid image of the base circle.

The equation includes the complete paths of two opposite-polarity labels and every ordinary self and partner source in both time directions. No mirror condition, planarity restriction or fixed center is imposed on the perturbations. The conclusion is local at every individual positive speed below one. It supplies no common neighborhood radius as $\beta_0\to0$ or $\beta_0\to1$, no explicit numerical radius, no classification of distant periods or subharmonic neighborhoods, and no stability, attraction or causal-release assertion.

The linear premise is the [full-speed fixed-period kernel theorem](alternatives-screen-2026-10-05-time-symmetric-speed-family-kernel.md), independently reconstructed and frozen in the [separate adjudication](alternatives-screen-2026-10-05-time-symmetric-speed-family-adjudication.md) before this nonlinear derivation began. Its kernel at each strictly subfield circle consists exactly of three translations and three rigid rotations. The proof below reconstructs the nonlinear bridge; a kernel count alone would not establish the present theorem. The [earlier varying-period source](alternatives-screen-2026-10-05-time-symmetric-varying-period.md) and its [independent assessment](../../collinear-research/analysis/alternatives-screen-2026-10-05-time-symmetric-varying-period-adjudication.md) supply the method at speed one half. The extension here uses a base-dependent subfield margin and the new full-speed linear premise, with every functional-analytic step stated for arbitrary $\beta_0$.

In precise terms, let $P_0$ be the physical period of the base circle and let $q_\pm(\theta)=\pm(\cos\theta,\sin\theta,0)$ on the fixed phase domain $\mathbb R/(2\pi\mathbb Z)$. There exist positive $\delta_P$ and $\delta_Y$ such that any classical $P$-periodic solution $X$, with $|P-P_0|<\delta_P$ and normalized history $Y(\theta)=X(P\theta/(2\pi))$ satisfying $\|Y-R(\beta_0)q\|_{C^1}<\delta_Y$, has the form

$$
X_i(T)=c_0+O\,R(\beta(P))q_i(2\pi T/P),\qquad O\in SO(3),\quad c_0\in\mathbb R^3.
$$

Here $c_0$ is a constant translation, $O$ is a constant spatial rotation, and $\beta(P)$ is the unique nearby family speed with physical period $P$. Closeness modulo rigid motions is equivalent after applying one preliminary rigid motion. The norm controls both labeled Cartesian positions and first phase derivatives uniformly; when frequency stays in a compact positive interval this is equivalent to controlling position and physical velocity. A nominated nearby period need not initially be declared fundamental: the conclusion makes it the circle's fundamental period.

## Exact circles and a valid period parameter

For $0<\beta<1$, the unique angle $x\in(0,3/4)$ satisfies $x=\beta\cos x$. Set $c=\cos x$, $s=\sin x$ and $D=1+\beta s$. The exact circular family is

$$
R(\beta)=\frac1{4\beta^2cD},\qquad
\omega(\beta)=\frac\beta R=4\beta^3cD,\qquad
P(\beta)=\frac{2\pi}{\omega(\beta)}=\frac\pi{2\beta^3cD}.
$$

At a reception point on the positive first axis, the two partner directions are $(c,\pm s,0)$, their common range is $2Rc$ and their common denominator is $D$. Their half-weighted attractive rows average to $-e_r/(4R^2cD)=-\beta^2e_r/R=-R\omega^2e_r$. The tangential terms cancel. The complete strict-subfield self-chord inequality excludes all nonzero self roots. Thus this is exact balance for the selected equation before any linear or nonlinear assertion is used.

Implicit differentiation gives $x'=c/D$, and direct logarithmic differentiation gives

$$
\frac{P'}P=-\frac3\beta+\frac{s}{c}x'-\frac{s+\beta c x'}D
=-\frac3\beta-\frac{\beta c^2}{D^2}<0.
$$

The two terms $s/D$ cancel. Hence $\omega'(\beta)>0$ and there is a smooth local inverse $\beta(\omega)$ at every $\beta_0\in(0,1)$. The period direction is an actual variation within one fixed equation, not an additional fixed-period kernel vector. From now on put $Q_\omega=R(\beta(\omega))q$ and work with the common phase $\theta=\omega T$.

## A complete root chart near an arbitrary base speed

Choose $b=(1+\beta_0)/2<1$. Shrink a closed frequency interval $I$ around $\omega_0=\omega(\beta_0)$ until its circles have speeds strictly below $b$, its radii stay close to $R_0=R(\beta_0)$ and $\inf_I\omega>0$. Choose a product neighborhood of the base curve with

$$
\omega\|Y_i'\|_\infty<b,\qquad
0<d_-<|Y_+(\theta)-Y_-(\theta)|<d_+,
$$

uniformly in $\theta$ and $\omega\in I$. For example $d_-=R_0$ and $d_+=3R_0$ are available after shrinking $I$ and the neighborhood. These strict inequalities define an open chart even in $C^1$. Complete periodic paths are extended to the entire real phase line.

For each receiver $i$, the other label $j$ and time sign $\varepsilon=\pm1$, the positive source phase displacement $\zeta$ satisfies

$$
H(\zeta)=\zeta-\omega|Y_i(\theta)-Y_j(\theta+\varepsilon\zeta)|=0.
$$

For $\zeta_2>\zeta_1$, the source chord bound gives $H(\zeta_2)-H(\zeta_1)\ge(1-b)(\zeta_2-\zeta_1)$, including any intermediate point where the norm is nondifferentiable. Since $H(0)<0$ and $H\to+\infty$, there is exactly one partner root on each complete half-line. At that root, put $S=\theta+\varepsilon\zeta$, $\tau=\zeta/\omega$, $Z=Y_i(\theta)-Y_j(S)$, $r=|Z|=\tau$, $n=Z/r$ and $V=\omega Y_j'(S)$. The bounds are

$$
\frac{d_-}{1+b}<\tau<\frac{d_+}{1-b},\qquad
D_Y=1+\varepsilon n\cdot V>1-b>0.
$$

They follow by comparing the present separation with the source displacement during time $\tau$. A self chord instead obeys $\omega|Y_i(\theta)-Y_i(\theta+\varepsilon\zeta)|\le b\zeta<\zeta$ for every $\zeta>0$. Thus there are no noninstantaneous self roots. Periodic repeats add no ordinary sources. The instantaneous endpoint remains excluded by the selected law. This is a complete root census for the whole neighborhood, including arbitrary nonmirror and out-of-plane histories.

Define the full acceleration and residual by

$$
\mathcal A_{\omega,i}(Y)=-\frac12\sum_{\varepsilon=\pm1}\frac{n_{ij,\varepsilon}}{\tau_{ij,\varepsilon}^2D_{Y,ij,\varepsilon}},\qquad
\mathcal F(\omega,Y)=\omega^2Y''-\mathcal A_\omega(Y).
$$

The self contribution is empty by proof, not removed from the equation by convention. The zeros of $\mathcal F$ are precisely the complete classical boundary solutions on this chart, and $\mathcal F(\omega,Q_\omega)=0$ throughout $I$.

## Joint continuous differentiability with varying frequency

The domain is an open subset of $\mathbb R\times\mathcal X$, where $\mathcal X=C^2_{\rm per}(\mathbb R;\mathbb R^6)$ with the norm controlling the first two derivatives. The target is $\mathcal Y=C^0_{\rm per}(\mathbb R;\mathbb R^6)$ with the uniform norm. No differentiability from a velocity-only domain is assumed.

The basic evaluation map $E(f,z)(\theta)=f(\theta+z(\theta))$ is continuously Fréchet differentiable from $C^1_{\rm per}\times C^0_{\rm per}$ into $C^0_{\rm per}$, with

$$
DE(f,z)[k,v]=k(\theta+z)+f'(\theta+z)v.
$$

Indeed the remainder of the $f$ term is bounded by the modulus of continuity of $f'$ at scale $\|v\|_\infty$, times $\|v\|_\infty$; the shifted $k$ error is at most $\|k'\|_\infty\|v\|_\infty$. These bounds are smaller order than the joint increment. For continuity of the derivative, the operator evaluating $k$ changes by at most the shift difference times $\|k'\|_\infty$, while the multiplier $f'(\theta+z)$ changes continuously by uniform continuity. Applying this to positions and then to $f=Y_j'$ proves the necessary composition regularity. The second application uses $Y_j''$ but requires no third derivative.

The root residual, as a map of $(\omega,Y,\zeta)$ into $C^0_{\rm per}$, is jointly $C^1$ near each positive root graph. Its partial derivative with respect to the graph $\zeta$ is multiplication by $D_Y$, bounded below by $1-b$. The Banach implicit-function theorem therefore supplies a jointly $C^1$ root map. Global root uniqueness above identifies it with the full physical source graph and ensures periodicity.

The frequency terms can be checked explicitly. Let $a$ vary $\omega$, let $w$ vary $Y$ and set $d=w_i(\theta)-w_j(S)$. Then

$$
\delta\zeta=\frac{a r+\omega n\cdot d}{D_Y},\qquad
\delta Z=d-\varepsilon Y_j'(S)\delta\zeta,\qquad
\delta\tau=\frac{\delta\zeta}{\omega}-\frac{\zeta a}{\omega^2},
$$

$$
\delta V=aY_j'(S)+\omega w_j'(S)+\varepsilon\omega Y_j''(S)\delta\zeta,\qquad
\delta n=\frac{(I-nn^{\mathsf T})\delta Z}{r},\qquad
\delta D_Y=\varepsilon(\delta n\cdot V+n\cdot\delta V).
$$

In particular the sampled physical velocity has both an explicit frequency variation and the shifted-source acceleration term. Varying one radial row uses

$$
\delta\left(\frac n{\tau^2D_Y}\right)
=\frac{\delta n}{\tau^2D_Y}-\frac{2n\delta\tau}{\tau^3D_Y}-\frac{n\delta D_Y}{\tau^2D_Y^2}.
$$

Positive range and denominator bounds make all remaining operations smooth. Hence $\mathcal F$ is jointly $C^1:\mathbb R\times C^2_{m per}\to C^0_{m per}$ on the chart. Its full derivative includes $2\omega aY''+\omega^2w''$ from the acceleration side, in addition to the displayed row variations.

## Compact lower-order structure and coercivity on a fixed complement

At a circle let $L_\omega=D_Y\mathcal F(\omega,Q_\omega)$. Setting $a=0$ in the variation gives

$$
L_\omega w=\omega^2w''-\mathcal B_\omega w,
\qquad \mathcal B_\omega:C^1_{m per}\longrightarrow C^0_{m per}\ \text{bounded linear}.
$$

Only current or shifted perturbation positions and shifted first derivatives enter $\mathcal B_\omega$. The base acceleration in a coefficient does not introduce a perturbation second derivative there. The source phase shifts at a circle are the constants $\pm2x(\beta(\omega))$, and its coefficient functions are smooth periodic functions.

This is a Fredholm operator of index zero: it has finite-dimensional kernel, closed range and finite-dimensional quotient of the target by its range, with equal kernel and quotient dimensions. To see the structure, $\omega^2\partial_\theta^2:C^2_{m per}\to C^0_{m per}$ has the six constant vectors as its kernel and the six zero-mean conditions as its range constraints; integrating a zero-mean continuous right side twice with the periodic integration constants gives its entire range. It therefore has index $6-6=0$. The embedding $C^2_{m per}\hookrightarrow C^1_{m per}$ is compact by uniform equicontinuity of positions and velocities, so $\mathcal B_\omega$ is a compact perturbation of this operator in the $C^2\to C^0$ mapping. Compact perturbations preserve the Fredholm property and index. The independently established six-dimensional kernel thus also implies a six-dimensional quotient by the range. Surjectivity onto all residuals is not asserted or needed.

For direct control of the nonlinear problem, a compactness argument gives the required estimate without any range solvability assumption. Let $e_\alpha$ be the Cartesian unit vectors and define six fixed phase functions

$$
T_\alpha=(e_\alpha,e_\alpha),\qquad
J_\alpha=(e_\alpha\times q_+,e_\alpha\times q_-),\qquad \alpha=1,2,3.
$$

Their real span $\mathcal K$ is the kernel at every circle: the actual rotation vectors are $R(\omega)J_\alpha$, which have the same span because $R>0$. Use the normalized phase pairing $\langle f,g\rangle=(2\pi)^{-1}\int_0^{2\pi}\sum_i f_i\cdot g_i\,d\theta$. The Gram matrix of this fixed basis is $\operatorname{diag}(2,2,2,1,1,2)$. Let $\Pi$ be its continuous finite-rank projection and $E=\ker\Pi\subset C^2_{m per}$. This is a fixed closed complement at every local frequency.

At $\omega_0$ there is a finite $C_0$ such that

$$
\|w\|_{C^2}\le C_0\|L_{\omega_0}w\|_{C^0},\qquad w\in E.
$$

Otherwise take $w_n\in E$ with unit $C^2$ norm and $L_{\omega_0}w_n\to0$. A subsequence converges in $C^1$ to $w$ by compact embedding. Then $w_n''=\omega_0^{-2}(L_{\omega_0}w_n+\mathcal B_{\omega_0}w_n)$ converges uniformly to $\omega_0^{-2}\mathcal B_{\omega_0}w$. Integration identifies a $C^2$ limit and gives convergence in $C^2$. That limit has unit norm, lies in $E$ and satisfies $L_{\omega_0}w=0$, contradicting $E\cap\mathcal K=\{0\}$. The estimate gives a bounded inverse of $L_{\omega_0}|_E$ onto its closed range, which is the precise coercivity needed below.

Translation and rotation supply independent known controls for identifying this kernel with the geometric directions. A common translation changes neither displacement nor source velocity; an infinitesimal rigid rotation changes each radial row by that same rotation and leaves its clock and denominator invariant. Exact balance then gives $L_\omega T_\alpha=L_\omega J_\alpha=0$. The converse is the separately assessed full Cartesian spectral theorem. No stability interpretation is attached to this identification.

## Locally uniform inverse and an actual Euclidean slice

The family $L_\omega$ is continuous in operator norm from $C^2$ to $C^0$. Smooth coefficients vary continuously, and the potentially delicate shifted velocity satisfies

$$
\|w'(\cdot+a_1)-w'(\cdot+a_2)\|_\infty\le|a_1-a_2|\,\|w''\|_\infty.
$$

Continuity of translations in the operator norm on arbitrary continuous functions would be false and is not used. On $E$, subtracting the two operators gives

$$
\|w\|_{C^2}\le C_0\|L_\omega w\|_{C^0}
+C_0\|L_{\omega_0}-L_\omega\|_{C^2\to C^0}\|w\|_{C^2}.
$$

Shrink $I$ so the last coefficient is less than $1/2$. Then $\|w\|_{C^2}\le2C_0\|L_\omega w\|_{C^0}$ uniformly for $\omega\in I$, $w\in E$. The inverse constant is local to the selected positive base speed. Nothing in this argument bounds it at the two excluded endpoints.

An orthogonality constraint alone does not put actual solutions in $E$. Parameterize small actual rigid motions by $g_pY=O_pY+c_p$, where $p\in\mathbb R^6$ gives three translations and three rotation parameters, and impose

$$
\Phi(p,\omega,Y)_\alpha
=\langle g_p^{-1}Y-Q_\omega,k_\alpha\rangle=0,
\qquad (k_1,\ldots,k_6)=(T_1,T_2,T_3,J_1,J_2,J_3).
$$

At $p=0$, $Y=Q_\omega$, differentiation with respect to $p$ gives the negative diagonal matrix with entries $2,2,2,R(\omega),R(\omega),2R(\omega)$. Its entries stay strictly positive on $I$. The finite-dimensional implicit-function theorem with Banach parameters gives a local continuously differentiable $p(\omega,Y)$ and a genuine sliced perturbation $w=g_{p(\omega,Y)}^{-1}Y-Q_\omega\in E$, with uniform $C^2$ norm control after shrinking the interval and neighborhood. All group actions here use constant matrices and translations; no time-dependent coordinate change is made.

Rigid motions preserve distances, root clocks, denominators, time signs, labels and periods, and rotate the acceleration. Thus $\mathcal F(\omega,g_pY)=O_p\mathcal F(\omega,Y)$ on the complete chart. A sliced solution is still a solution. Time translation of a circle is already an axial spatial rotation and introduces no seventh symmetry at fixed period; spatial reflections or label reversal do not add a local family beyond the rigid circle images. A uniform drift is excluded by periodicity.

## Nonlinear uniqueness and the position/velocity neighborhood

Joint continuous differentiability gives, uniformly along the compact local base curve,

$$
\mathcal F(\omega,Q_\omega+w)=L_\omega w+N_\omega(w),\qquad
\|N_\omega(w)\|_{C^0}\le\eta(\|w\|_{C^2})\|w\|_{C^2},\quad \eta(r)\longrightarrow0.
$$

Uniformity follows from continuity of $D_Y\mathcal F$ near the compact curve $(\omega,Q_\omega)$ and a finite cover of that curve. Compactness of a Banach-space ball is neither claimed nor required. For a sufficiently small sliced solution, the uniform inverse estimate yields

$$
\|w\|_{C^2}\le2C_0\|N_\omega(w)\|_{C^0}
\le2C_0\eta(\|w\|_{C^2})\|w\|_{C^2}<\|w\|_{C^2}
$$

unless $w=0$. Therefore every nearby $C^2$ zero is exactly a rigid image of $Q_\omega$. This argument controls each solution individually and excludes nondifferentiably parameterized accumulating branches as well as smooth bifurcations. It requires neither a variational action nor a solution of an arbitrarily forced equation.

To obtain the stated neighborhood in position and velocity among classical solutions, let $Y$ be a classical zero that is $C^1$ close to $Q_\omega$ at the same frequency. Evaluate its phase-root residual at the base root. The residual error is at most $2\omega\|Y-Q_\omega\|_{C^0}$, so monotonicity yields

$$
\|\zeta_Y-\zeta_Q\|_\infty
\le\frac{2\omega}{1-b}\|Y-Q_\omega\|_{C^0}.
$$

For sampled source derivatives, add and subtract the known circle derivative at the shifted source phase:

$$
|Y_j'(S_Y)-Q_{\omega,j}'(S_Q)|
\le\|Y'-Q_\omega'\|_\infty
+\|Q_\omega''\|_\infty|S_Y-S_Q|.
$$

Only the base acceleration appears, so no bound on the unknown $Y''$ is assumed. The position estimate is analogous. The uniform positive range and denominator margins imply $\|\mathcal A_\omega(Y)-\mathcal A_\omega(Q_\omega)\|_{C^0}\le C\|Y-Q_\omega\|_{C^1}$, with $C$ finite on $I$. Both are solutions at the same frequency, so $\omega^2(Y''-Q_\omega'')=\mathcal A_\omega(Y)-\mathcal A_\omega(Q_\omega)$ gives

$$
\|Y-Q_\omega\|_{C^2}\le C'\|Y-Q_\omega\|_{C^1}.
$$

Shrinking the $C^1$ neighborhood therefore puts each classical solution into the proved $C^2$ neighborhood. Continuity of $Q_\omega$ and $P\leftrightarrow\omega$ converts closeness to the original base history and closeness of period into the required closeness to the corresponding circle. This completes the stated theorem at arbitrary $\beta_0\in(0,1)$.

At fixed period the local zero set is the six-dimensional rigid-motion orbit. With period free, it is that orbit together with the single circle-family parameter. Indeed differentiating $\mathcal F(\omega,Q_\omega)=0$ gives $L_\omega\partial_\omega Q_\omega+\partial_\omega\mathcal F=0$, and a joint linearized zero $(a,w)$ has $w-a\partial_\omega Q_\omega\in\mathcal K$. This verifies that the family direction belongs to the joint parameter problem and is absent from the fixed-period kernel. The exact nonlinear proof above, rather than this tangent count, establishes exhaustion of the local solution set.

## Evidence, falsifiers and assessment boundary

The new result is analytical conditional on the separately assessed all-speed kernel theorem. Exact circle balance, the period derivative, translation and rotation controls, the source-clock variation, the compactness estimate and the nonlinear slice argument are displayed above. No new numerical target, EOM solver evolution, periodic shooting computation or additional Fourier scan was used for this nonlinear result. The previous independent varying-period assessment was read after freezing the new kernel verdict; it is methodological evidence, not a second independent assessment of this newly written extension.

Concrete falsifiers are an additional complete source on a chart satisfying the stated speed and separation margins; failure of the joint source-velocity derivative in the declared $C^2\to C^0$ spaces; a perturbation second derivative hidden in $\mathcal B_\omega$; a normalized slice sequence with residual tending to zero contradicting the compactness proof; a singular rigid-motion Gram matrix; or noncircular classical periodic solutions whose periods and normalized $C^1$ histories approach any one fixed strictly subfield circle. A branch approaching only an excluded endpoint, or a solution at a distant period, is outside the theorem. Formal growing mixed-time exponentials and causal-release questions are also outside this boundary classification.

The constants depend on the selected base speed. Low-speed degeneration of the opposite first-mode determinant and loss of the strict speed margin near one prevent claiming an endpoint-uniform radius from this argument. The factored quantity $P(x)$ used in the kernel certificate remains positive at zero; the degenerating factor is $\sin^2x$. There is no unresolved internal step identified in the presented derivation, but separate mathematical assessment remains required before shared integration. The new document does not amend the frozen kernel review, the prior subjects, either independent reference, or the shared manuscript and status owners.

Source identities were measured by `shasum -a 256` over the exact inspected files:

| Source | SHA-256 |
| --- | --- |
| Full-speed kernel theorem | `d9b643565d9682fad07df0476f8a6802d0de254b850f570ad4021d930a996c80` |
| Frozen full-speed independent assessment | `181ef67fbcaf9e01b120932bef8bee6260f6e69155aeee07d289c6443358dff7` |
| Earlier varying-period source | `baba157108fbbefd65e70fb2222bc6dbd702cf191ec585efb27cc7a764ac2325` |
| Earlier independent varying-period assessment | `2e4e6a3b7dbd7cac51e935e8674bf27cd6c944e9c94b308794f51e5b988382f7` |
| Earlier fixed-period nonlinear source | `3e6088f0816071c479a8f1f5da728d35280419d679e48e3e320e38f1af0f2698` |

This source belongs to the new nonlinear derivation stage and awaits its own independent adjudication. The fixed-period kernel assessment was completed first and is not rewritten to incorporate this stage.
