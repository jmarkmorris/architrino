# Local nonlinear isolation of the fixed-period time-symmetric circle

## The theorem and its boundary

The exactly balanced equal-past/future circle at speed $\beta=1/2$ is locally isolated, modulo rigid Euclidean motions, among all Cartesian classical periodic solutions with its fixed physical period. The perturbations need not be mirror symmetric, planar or circular. Closeness in position and velocity over one full period suffices.

**Claim grade: derived, using the previously admitted computer-assisted fixed-period kernel theorem.** The new argument proves differentiability of the complete-root nonlinear boundary operator, a bounded inverse estimate after removing its symmetry kernel, and an actual symmetry slice. The kernel count alone did not establish this conclusion. The finite-dimensional spectral enclosures are inherited from the accepted [Fourier assessment](../../analysis/alternatives-screen-2026-10-05-adjudication-validation.md#frozen-interval-source-and-receipt-audit), not recomputed or independently re-certified in this source.

Fix the selected [equal-time-symmetric canonical radial law](../../equation-variants/manuscript.md#14-time-symmetric-direct-interaction), with $\alpha=1/2$ and $K=c_f=1$, persistent opposite-polarity labels, every past and future ordinary root and the unchanged self clause. Let $\xi\in(0,1/2)$ be the unique solution of $\xi=\tfrac12\cos\xi$, and put

$$
R_0=\frac1{\cos\xi(1+\tfrac12\sin\xi)},\qquad
\omega_0=\frac1{2R_0},\qquad P_0=\frac{2\pi}{\omega_0}=4\pi R_0.
$$

The base complete paths are

$$
Q_+(t)=R_0(\cos\omega_0t,\sin\omega_0t,0),\qquad Q_-(t)=-Q_+(t).
$$

**Local isolation theorem.** There is a number $\varepsilon_*>0$ such that every pair $X=(X_+,X_-)$ of $C^2$, $P_0$-periodic Cartesian paths satisfying the selected equation at every real time and

$$
\|X-Q\|_{C^1(\mathbb R/P_0\mathbb Z)}<\varepsilon_*
$$

has the form

$$
X_i(t)=c+OQ_i(t),\qquad i\in\{+,-\},
$$

for a constant $c\in\mathbb R^3$ and a constant proper rotation $O\in SO(3)$. The rotation and translation can be chosen near the identity and zero when $X$ is close to this representative. Thus every such nearby solution is exactly the same circular boundary solution after a rigid spatial motion. A reflection gives no additional orbit of this planar base because reflection in its plane fixes it, and any improper image is also a proper rotational image.

The number $\varepsilon_*$ is existential; no numerical neighborhood is certified. The theorem fixes $P_0$, the law and its complete-history class. Time shifts of this circle are already spatial rotations about its normal, so a seventh phase quotient is unnecessary. Varying-period families, nonperiodic all-time perturbations, causal initial-value evolution, stability and attraction are separate questions. The theorem makes none of those claims.

## Exact balance and complete nearby root census

The [frozen binary source](alternatives-screen-2026-10-05-binary.md#5-equal-pastfuture-radial-boundary-problem) gives the circle family. Its balance can be checked directly at the present member on the positive first axis. A partner root on either time side has range $2R_0\cos\xi$, time displacement $\tau_0=2\xi/\omega_0$, and transmitter denominator $D_0=1+\tfrac12\sin\xi$. The two source directions are $(\cos\xi,\pm\sin\xi,0)$. Their equally weighted attractive rows have average

$$
-\frac{e_r}{4R_0^2\cos\xi D_0}
=-\frac{1}{4R_0}e_r=-R_0\omega_0^2e_r,
$$

where the middle equality uses the defining value of $R_0$. Thus $Q''$ equals the complete selected acceleration. The tangential terms cancel because both time directions are retained with equal weight.

Let $\mathcal X=C^2_{\rm per}([0,P_0];\mathbb R^6)$, using the norm that controls both paths and their first two derivatives, and let $\mathcal Y=C^0_{\rm per}([0,P_0];\mathbb R^6)$ with the uniform norm. Derivatives and values match at the period endpoints. Paths in these spaces are extended periodically to every real time; the full histories are never truncated or prescribed independently on one time side.

Choose an open neighborhood $\mathcal U$ of $Q$ in $\mathcal X$ so that

$$
\max_i\|X_i'\|_\infty<\frac34,
\qquad R_0<|X_+(t)-X_-(t)|<3R_0
$$

for every $t$. These conditions also hold in a sufficiently small $C^1$ neighborhood. For $i\ne j$ and $\varepsilon\in\{-1,+1\}$, define the partner root by its positive time displacement $\tau_{ij,\varepsilon}(t)$:

$$
\tau=|X_i(t)-X_j(t+\varepsilon\tau)|,
\qquad S=t+\varepsilon\tau.
$$

Here $\varepsilon=-1$ denotes the past side and $+1$ the future side. The residual $H(\tau)=\tau-|X_i(t)-X_j(t+\varepsilon\tau)|$ is strictly increasing with lower slope $1/4$ in the Lipschitz sense, including any points where the norm itself is nondifferentiable. It is negative at zero and tends to positive infinity. Hence exactly one root exists on each side for each receiver. At a root, range is positive and

$$
D_{ij,\varepsilon}=1+\varepsilon n_{ij,\varepsilon}\cdot X_j'(S)>\frac14,
\qquad \frac{4R_0}{7}<\tau_{ij,\varepsilon}<12R_0.
$$

The delay bounds follow from $d/(1+b)\le\tau\le d/(1-b)$ with present separation $d\in(R_0,3R_0)$ and $b=3/4$. They are bounds on the unique complete root, not an imposed search horizon. Periodic repetition of the path cannot create additional roots, because the source clock remains strictly monotone over all real source times.

For a same-label past or future hit, the chord estimate gives

$$
|X_i(t)-X_i(t+\varepsilon\tau)|\le\frac34\tau<\tau
$$

for every $\tau>0$. Consequently no positive-delay or positive-advance self root exists anywhere in $\mathcal U$. The ordinary zero-delay endpoint remains excluded as required by the selected law. This complete root census does not use mirror symmetry, planarity, a fixed center or a restriction on Cartesian perturbation modes. It also shows that taking the absolute value in the original transmitter denominator introduces no nonsmooth sign change on this neighborhood.

## A continuously differentiable nonlinear boundary operator

On $\mathcal U$, define the complete acceleration functional by its now-proved root census:

$$
\mathcal A_i(X)(t)
=-\frac12\sum_{\varepsilon=\pm1}
\frac{n_{ij,\varepsilon}(t)}{\tau_{ij,\varepsilon}(t)^2D_{ij,\varepsilon}(t)},
\qquad j\ne i,
$$

and define the residual

$$
\mathcal F:\mathcal U\subset\mathcal X\longrightarrow\mathcal Y,
\qquad \mathcal F(X)=X''-\mathcal A(X).
$$

The minus sign is the fixed opposite-polarity factor. Ordinary self reception remains part of the law and contributes an empty sum by the preceding strict chord proof. The zeros of $\mathcal F$ are exactly the complete $P_0$-periodic solutions within this neighborhood, and $\mathcal F(Q)=0$.

The root dependence and the source-velocity composition must be differentiated in appropriate spaces. The map

$$
(X,\tau)\longmapsto\tau-|X_i(t)-X_j(t+\varepsilon\tau(t))|
$$

is continuously Fréchet differentiable into $C^0_{m per}$ near the positive root graph. Its derivative with respect to $\tau$ is multiplication by $D_{ij,\varepsilon}$, whose inverse is bounded because $D>1/4$. The Banach implicit-function theorem therefore gives a $C^1$ root map $X\mapsto\tau_{ij,\varepsilon}$ from $\mathcal X$ to $C^0_{m per}$. Uniqueness identifies this local implicit map with the complete root already constructed. Periodicity of the map follows from uniqueness applied at $t$ and $t+P_0$.

The required composition regularity can also be checked directly. For $f\in C^1_{m per}$ and $a\in C^0_{m per}$, the evaluation map $E(f,a)(t)=f(t+a(t))$ has derivative

$$
DE(f,a)[k,b]=k(t+a(t))+f'(t+a(t))b(t).
$$

The Taylor error of the $f$ term is bounded by its derivative's modulus of continuity times $\|b\|_\infty$. The shifted $k$ error is at most $\|k'\|_\infty\|b\|_\infty$. These are a Fréchet remainder of smaller order than $\|k\|_{C^1}+\|b\|_\infty$, and the same uniform estimates establish continuity of the derivative. Apply this first to source positions, then to source velocities with $f=X_j'\in C^1$. The second application explains why $C^2$ is a convenient domain: differentiating source velocity at its changed root uses $X_j''$. No third derivative is required.

All remaining operations in $\mathcal A$ are smooth finite-dimensional functions of the positive range, positive denominator, displacement and evaluated velocity. Therefore $\mathcal A$, and hence $\mathcal F$, is $C^1:\mathcal U\subset C^2_{m per}\to C^0_{m per}$. In particular, with $L=D\mathcal F(Q)$,

$$
\mathcal F(Q+w)=Lw+\mathcal N(w),\qquad
\frac{\|\mathcal N(w)\|_{C^0}}{\|w\|_{C^2}}\longrightarrow0
\quad\text{as }\|w\|_{C^2}\to0.
$$

The result concerns this loss of two derivatives in the operator, not a claim of differentiability from a space controlling only velocity. The final $C^1$ neighborhood statement will follow separately from the equation itself.

## Linearization, its accepted kernel and a bounded inverse estimate

The first variation of one row can be derived before invoking the earlier kernel result. At either base root, write $r=\tau_0$, $n$ for direction, $v=Q_j'(S)$, $a=Q_j''(S)$, $D=1+\varepsilon n\cdot v$, and

$$
d=w_i(t)-w_j(S),\qquad
P_n=I-nn^{\mathsf T},\qquad
B_\varepsilon=I-\frac{\varepsilon vn^{\mathsf T}}D.
$$

Differentiating the root equation gives

$$
\delta S=\frac{\varepsilon n\cdot d}D,
\qquad \delta r_{\rm vector}=B_\varepsilon d,
\qquad \delta n=P_nB_\varepsilon d/r.
$$

The source velocity variation is $w_j'(S)+a\,\delta S$. It must be retained in the denominator variation

$$
\delta D=\varepsilon\left[v\cdot\delta n+n\cdot w_j'(S)+(n\cdot a)\delta S\right].
$$

Thus the derivative of the radial row is of the form $M_\varepsilon(t)d+N_\varepsilon(t)w_j'(S)$, with smooth bounded coefficients. More explicitly, for the fixed partner polarity $\sigma=-1$,

$$
\begin{aligned}
M_\varepsilon&=\frac{\sigma}{r^3D}
\left[(I-3nn^{\mathsf T})B_\varepsilon
-\frac{\varepsilon nv^{\mathsf T}P_nB_\varepsilon}{D}
-\frac{r(n\cdot a)nn^{\mathsf T}}{D^2}\right],\\
N_\varepsilon&=-\frac{\sigma\varepsilon nn^{\mathsf T}}{r^2D^2}.
\end{aligned}
$$

Averaging both time directions reproduces the full Cartesian operator in the [frozen first variation](alternatives-screen-2026-10-05-binary.md#8-time-symmetric-cartesian-first-variation-and-exact-transverse-spectrum). This derivation includes the emission-clock changes and agrees with the operator to which the accepted Fourier kernel count applies. In particular it has the structural form

$$
Lw=w''-\mathcal Bw,\qquad
\mathcal B:C^1_{m per}\longrightarrow C^0_{m per}
\text{ bounded linear}.
$$

Only current or shifted $w$ and shifted $w'$ enter; the appearance of the base acceleration in a coefficient does not introduce $w''$ into $\mathcal B$.

Exact symmetry controls check this variation independently of matrix evaluation. A common translation $w_i=c$ gives $d=0$, $w_j'=0$ and $Lw=0$. For an infinitesimal rigid rotation $w_i=\Omega Q_i$, $\Omega^{\mathsf T}=-\Omega$, one has $n\cdot d=n\cdot\Omega(rn)=0$, hence no root-time change. Direction and velocity rotate together, leaving $D$ unchanged; the row variation is $\Omega\mathcal A(Q)$ and the acceleration variation is $\Omega Q''$. Therefore $Lw=0$ again.

The accepted fixed-period kernel theorem supplies the converse:

$$
\ker L=\mathcal K
=\{(c+\Omega Q_+,\ c+\Omega Q_-):c\in\mathbb R^3, \Omega^{\mathsf T}=-\Omega\},
\qquad\dim_{\mathbb R}\mathcal K=6.
$$

Its exact transverse analysis and planar finite-block enclosures with a proved Fourier tail are summarized in the [independent assessment](../../analysis/alternatives-screen-2026-10-05-adjudication-validation.md#frozen-interval-source-and-receipt-audit). A possible distinction between a smooth Fourier kernel and our $C^2$ kernel creates no gap: if $Lw=0$ and $w\in C^2$, then $\mathcal Bw\in C^1$ because the base coefficients are smooth and its time shifts are constant. Hence $w''\in C^1$, so $w\in C^3$. Iteration makes every kernel element smooth. The admitted mode count therefore applies to this entire Banach-space kernel.

Use the continuous bilinear form

$$
\langle f,g\rangle_0=\frac1{P_0}\int_0^{P_0}\sum_{i=\pm}f_i(t)\cdot g_i(t)\,dt
$$

and the closed complement

$$
\mathcal E=\{w\in\mathcal X:\langle w,k\rangle_0=0\text{ for every }k\in\mathcal K\}.
$$

There exists a finite constant $C_*>0$ such that

$$
\|w\|_{C^2}\le C_*\|Lw\|_{C^0},\qquad w\in\mathcal E.
$$

Here is an elementary proof, avoiding a surjectivity assumption. If no such constant existed, choose $w_n\in\mathcal E$ with $\|w_n\|_{C^2}=1$ and $Lw_n\to0$ in $C^0$. The compact embedding of periodic $C^2$ into $C^1$ gives a subsequence converging to $w$ in $C^1$: bounded second derivatives make the first derivatives uniformly equicontinuous, and the paths themselves are also uniformly equicontinuous. Since $\mathcal B$ is bounded from $C^1$ to $C^0$,

$$
w_n''=Lw_n+\mathcal Bw_n\longrightarrow\mathcal Bw
$$

uniformly. Integration together with the already convergent positions and velocities shows that $w\in C^2$, $w''=\mathcal Bw$, and $w_n\to w$ in $C^2$. Thus $w\in\ker L\cap\mathcal E=\{0\}$, while $\|w\|_{C^2}=1$, a contradiction.

This estimate is a bounded inverse of $L|_{\mathcal E}$ onto its closed range. Closedness follows because a Cauchy sequence of outputs has, by the estimate, a Cauchy sequence of inputs in the complete space $\mathcal E$. The proof supplies exactly the inverse control needed for isolation; it does not assert that $L$ is onto all of $\mathcal Y$, nor does it infer nonlinear solvability for arbitrary forcing. Equivalently, the highest-derivative operator is accompanied only by a compact lower-order perturbation, but no unproved Fredholm range condition is needed here.

## Removing rigid motions by an actual local slice

It remains to show that nearby solutions can be put in $Q+\mathcal E$ by genuine Euclidean transformations. An infinitesimal orthogonality condition alone would not suffice.

Let $e_1,e_2,e_3$ be the fixed Cartesian basis. Take the six symmetry vectors

$$
T_\alpha=(e_\alpha,e_\alpha),\qquad
R_\alpha=(e_\alpha\times Q_+,e_\alpha\times Q_-),\qquad \alpha=1,2,3.
$$

Their Gram matrix in $\langle\cdot,\cdot\rangle_0$ is

$$
\operatorname{diag}(2,2,2,R_0^2,R_0^2,2R_0^2).
$$

The translation-rotation cross terms vanish pointwise because $Q_++Q_-=0$. For rotations, averaging the squared projection of a fixed axis onto the circular radial vector gives the displayed positive entries. This verifies that all six directions are independent and that the spatial rotation action has no continuous stabilizer on the labeled, parametrized circle.

Parameterize a small rigid motion by $g_pX=O_pX+c_p$, where $p\in\mathbb R^6$, $c_p$ gives its translation and $O_p$ is the exponential of its skew rotation matrix. Define the six-component function

$$
\Phi(p,X)_\alpha=\langle g_p^{-1}X-Q,k_\alpha\rangle_0,
$$

where $(k_\alpha)$ is the ordered symmetry basis above. At $(p,X)=(0,Q)$, the derivative with respect to $p$ is the negative Gram matrix, hence invertible. The finite-dimensional implicit-function theorem, with $X$ as a Banach-space parameter, gives a unique small $p=p(X)$ for every sufficiently nearby $X$, and

$$
w(X):=g_{p(X)}^{-1}X-Q\in\mathcal E,\qquad
\|w(X)\|_{C^2}\le C\|X-Q\|_{C^2}.
$$

All maps here use only constant matrices, translations and bounded period integrals. There is no time reparametrization or variable-period adjustment.

The equation is Euclidean equivariant on the complete domain. Rigid motions preserve ranges, root times, denominators, labels, the time direction and the fixed period; they rotate both accelerations and received rows. Consequently

$$
\mathcal F(g_pX)=O_p\mathcal F(X).
$$

Thus an actual nearby solution, after this finite rigid motion, is still a solution and lies on the exact slice. Both common-center and opposite-displacement perturbations, including out-of-plane components, are included in this construction.

## The nonlinear uniqueness argument

Let $X$ be a nearby zero of $\mathcal F$ and set $w=g_{p(X)}^{-1}X-Q\in\mathcal E$. Equivariance and $\mathcal F(Q)=0$ imply

$$
0=\mathcal F(Q+w)=Lw+\mathcal N(w).
$$

The bounded inverse estimate gives

$$
\|w\|_{C^2}\le C_*\|\mathcal N(w)\|_{C^0}.
$$

By continuous Fréchet differentiability, the right side is at most $\tfrac12\|w\|_{C^2}$ when $w$ is sufficiently small. Hence $w=0$. Therefore $X=g_{p(X)}Q$ exactly.

This proves isolation in a $C^2$ neighborhood without solving a projected nonlinear equation, counting a cokernel as though it were a kernel, or assuming an action principle. It excludes even a nonsmoothly parameterized sequence of distinct nearby classical periodic solutions: each individual solution in the neighborhood is a rigid copy. The argument is stronger than merely excluding a differentiable bifurcating branch with a nonsymmetry tangent.

## Position-and-velocity neighborhoods among classical solutions

The asserted $C^1$ neighborhood can now be justified without claiming that $\mathcal F$ is differentiable on $C^1$. Let $X$ be any classical solution in a sufficiently small $C^1$ neighborhood of $Q$. The speed and separation inequalities of the root census hold. At the base root time displacement $\tau_0$, the perturbed root residual differs from zero by at most $2\|X-Q\|_{C^0}$. Its slope is at least $1/4$, so

$$
\|\tau_X-\tau_0\|_\infty\le8\|X-Q\|_{C^0}.
$$

For the sampled velocity, adding and subtracting the base velocity at the perturbed source time gives

$$
|X_j'(t+\varepsilon\tau_X)-Q_j'(t+\varepsilon\tau_0)|
\le\|X'-Q'\|_\infty
+\|Q_j''\|_\infty\,|\tau_X-\tau_0|.
$$

Only the smooth base acceleration appears in this estimate; it does not assume a bound on the unknown solution's second derivative. The displacement estimate is similar. Smoothness of the algebraic row on the fixed range and denominator margins therefore gives

$$
\|\mathcal A(X)-\mathcal A(Q)\|_{C^0}\le C\|X-Q\|_{C^1}.
$$

Because both paths solve the equation, $X''-Q''=\mathcal A(X)-\mathcal A(Q)$. Thus

$$
\|X-Q\|_{C^2}\le C'\|X-Q\|_{C^1}.
$$

Shrinking the $C^1$ neighborhood puts every classical solution into the already proved $C^2$ isolation neighborhood. This proves the theorem in its stated topology and prevents uncontrolled high-frequency acceleration from evading it. No claim is made for a path class that does not define the source velocities and the classical boundary equation.

## Falsifiers, evidence and remaining scope

The argument is falsified by any of the following checkable failures:

- An additional past, future or self root for a nearby complete path satisfying the stated common speed and separation margins.
- Failure of the source-velocity evaluation to be $C^1$ from the declared $C^2$ domain into $C^0$, or a linearized acceleration term involving a perturbation's second derivative rather than only its position and velocity.
- An additional fixed-period Cartesian kernel element beyond the six symmetry directions, contradicting the accepted complete Fourier and interval result.
- A normalized sequence on the symmetry slice with residual tending to zero but no $C^2$ limit, despite the displayed compactness and second-derivative identity.
- A singular Gram matrix for the six actual rigid-motion directions, or failure of rigid-motion covariance of the selected all-root equation.
- A sequence of classical $P_0$-periodic solutions converging to $Q$ in $C^1$ that are not rigid Euclidean images of $Q$.

The linear kernel result is an inherited, explicitly identified premise with computer-assisted finite-mode evidence. The nonlinear differentiability, complete neighboring census, inverse estimate, finite group slice and remainder argument are new analytic derivations in this source. They were developed without reading coordinator independent-reference additions for this target. No new numerical instrument, periodic target integration or finite-mode recalculation was performed.

The proof leaves the neighborhood radius unquantified. It supplies no causal future selector, no nonlinear stability verdict, no uniqueness among varying-period solutions, no classification of distant periodic solutions and no continuation at a speed or root boundary. Those are different mathematical questions, not hidden consequences of local isolation. The small rigid-motion orbit is precisely the local zero set of the fixed-period boundary equation.

## Source and validation record

`shasum -a 256` measured the source identities used for the exact circle and admitted kernel:

| Source | SHA-256 |
| --- | --- |
| [Frozen binary source](alternatives-screen-2026-10-05-binary.md) | `9362c263573002225ecf47258ebdd37a5a9ccfb5ccd4af4d787a060ff1de47a3` |
| [Independent Fourier assessment](../../analysis/alternatives-screen-2026-10-05-adjudication-validation.md) | `3bbb29e6da1c33fbdfddf174134ca819ab479d2b8db5e17a334b2f562fbaee20` |

These are source-byte measurements, not new verification of the spectral receipt. The exact translation and rotation controls were reconstructed algebraically above before applying the inherited kernel count to the operator. The bounded-inverse proof also explicitly checks how that count extends to the chosen classical function space.

Only this newly assigned source was written. Earlier subjects and independent assessments, the law, period, shared manuscripts, ledgers, queues, generated artifacts and Git publication remain unchanged by this work. No owned computational process was launched or left running. Fresh independent mathematical assessment is required before the coordinator integrates the new nonlinear result.

`git diff --no-index --check /dev/null reference/priorities/master-equation-closure/binary-research/analysis/alternatives-screen-2026-10-05-time-symmetric-local-isolation.md` emitted no whitespace diagnostics; its exit status 1 denotes the new-file difference. The equations, function-space mapping, symmetry gauge and scope were reread in the written source. This textual validation is not a rerun of the accepted spectral certificate.
