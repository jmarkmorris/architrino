# Independent adjudication of the varying-period time-symmetric circle theorem

## Conclusion and inherited premise

**Derived assessment: the proposed local classification is valid at its stated scope.** For the selected equal-past/future radial equation with $\alpha=1/2$, $K=c_f=1$, the exact circular family exhausts the nearby classical Cartesian periodic boundary solutions, modulo constant Euclidean motions, when both physical period and normalized position/velocity history may vary near the speed-$1/2$ circle. The neighborhood is existential. The result does not assert stability, attraction, a causal evolution, a selected future from past data, or a classification far from this circle.

The reviewed [varying-period subject](../../binary-research/analysis/alternatives-screen-2026-10-05-time-symmetric-varying-period.md) was read before this independent reconstruction. The independently admitted [fixed-period theorem](../../binary-research/analysis/alternatives-screen-2026-10-05-time-symmetric-local-isolation.md) is a load-bearing premise: its full Cartesian kernel consists exactly of the six infinitesimal Euclidean motions, and its symmetry complement has a bounded inverse estimate onto the linearized range. The earlier computer-assisted Fourier certificate is neither resampled nor recertified here. This assessment reconstructs the new parameter argument, complete root chart, differentiability and nonlinear uniqueness; it is not an independent replacement for the inherited spectral evidence.

A useful simplification strengthens the transparency of the proof: in the common phase coordinate, the symmetry **subspace itself is independent of frequency**. Only the lengths of its rotation basis vectors vary. Thus a fixed complement suffices for the entire local family.

## Exact period derivative

Let $c=\cos\xi$, $s=\sin\xi$, and $D=1+\beta s$, with $\xi=\beta\cos\xi$. For $0<\beta<1$, the angle is the unique root in $(0,1)$ and $D>0$. Differentiation gives

$$
\xi'=\frac cD,\qquad
R=\frac1{4\beta^2cD},\qquad
P=\frac{\pi}{2\beta^3cD}.
$$

Consequently

$$
\frac{P'}P=-\frac3\beta+\frac{s}{c}\xi'-\frac{s+\beta c\xi'}D
=-\frac3\beta-\frac{\beta c^2}{D^2}<0.
$$

The cancellation of $s/D$ is exact. In particular, $P'(1/2)$ is strictly negative, and $\omega=2\pi/P$ has strictly positive derivative. A unique smooth local $\beta(\omega)$ exists. As a separate sign check, using $\beta=\xi/\cos\xi$ gives $P=\pi\cos^2\xi/[2\xi^3(1+\xi\tan\xi)]$, whose logarithmic derivative with respect to $\xi$ is the sum of three strictly negative terms. Thus the period direction is a genuine family parameter, rather than an extra fixed-period kernel vector.

## Complete phase-root chart

Use $\theta=\omega t$, with $\omega$ in a compact positive interval around $\omega_0$. The unknown $Y=(Y_+,Y_-)$ is a pair of complete $2\pi$-periodic $C^2$ Cartesian paths, with physical velocity $\omega Y'$. Choose common margins

$$
\omega\|Y_i'\|_\infty<b=\frac34,\qquad
0<d_-<|Y_+(\theta)-Y_-(\theta)|<d_+.
$$

For side $\varepsilon=\pm1$ the positive phase displacement satisfies

$$
H(\zeta)=\zeta-\omega|Y_i(\theta)-Y_j(\theta+\varepsilon\zeta)|=0.
$$

For $\zeta_2>\zeta_1$, the source chord inequality gives $H(\zeta_2)-H(\zeta_1)\ge(1-b)(\zeta_2-\zeta_1)$. Since $H(0)<0$ and $H(\zeta)\to+\infty$, there is exactly one root per partner and side on the entire phase half-line. At its root, writing $\tau=\zeta/\omega$,

$$
\frac{d_-}{1+b}<\tau<\frac{d_+}{1-b},\qquad
D_Y=1+\varepsilon n\cdot\omega Y_j'(\theta+\varepsilon\zeta)>1-b.
$$

A self chord instead obeys $\omega|Y_i(\theta)-Y_i(\theta+\varepsilon\zeta)|\le b\zeta<\zeta$, excluding every nonzero self root. Periodic repeats do not supply extra roots. The zero endpoint remains excluded by the selected law, rather than being used as an ordinary hit. These statements cover nonmirror, nonplanar perturbations and both complete time directions.

Thus the subject's two partner rows, positive denominators and empty ordinary self sums give exactly the selected all-root equation on this neighborhood. No boundary input is silently replaced by a causal initial history.

## Joint differentiability in the declared norms

Let $a$ vary frequency, $w$ vary the paths, and write $S=\theta+\varepsilon\zeta$, $r=|Y_i(\theta)-Y_j(S)|$, $d=w_i(\theta)-w_j(S)$. Differentiating the phase-root equation yields the explicit joint variation

$$
\delta\zeta=\frac{a r+\omega n\cdot d}{D_Y}.
$$

The corresponding displacement and sampled physical-velocity variations are

$$
\delta Z=d-\varepsilon Y_j'(S)\delta\zeta,\qquad
\delta(\omega Y_j'(S))=aY_j'(S)+\omega w_j'(S)+\varepsilon\omega Y_j''(S)\delta\zeta.
$$

Together with $\delta n=(I-nn^{\mathsf T})\delta Z/r$ and $\delta\tau=\delta\zeta/\omega-\zeta a/\omega^2$, these formulas retain every frequency, root-motion and source-acceleration term in the radial rows. The positive range and denominator margins make the remaining algebra smooth.

For completeness, evaluation $(f,z)\mapsto f(\theta+z(\theta))$ is $C^1:C^1\times C^0\to C^0$, with derivative $k(\theta+z)+f'(\theta+z)v$. Its remainder is bounded by the modulus of continuity of $f'$ times $\|v\|_\infty$, plus $\|k'\|_\infty\|v\|_\infty$. The derivative is continuous in the relevant operator norm because differences in shifted $k$ are bounded by $\|k'\|_\infty$ times the shift difference. Apply this to positions and, separately, to $f=Y_j'$. The latter is the reason for the $C^2$ path domain. No $Y'''$ is required.

The root residual therefore has a jointly $C^1$ local map from $(\omega,Y,\zeta)$ into $C^0$, with its $\zeta$ derivative the invertible multiplication operator $D_Y$. The Banach implicit-function theorem gives a jointly $C^1$ root graph; global uniqueness above identifies this graph with the complete physical root. Hence

$$
\mathcal F(\omega,Y)=\omega^2Y''-\mathcal A_\omega(Y)
$$

is jointly $C^1$ from an open subset of $\mathbb R\times C^2_{\rm per}$ to $C^0_{\rm per}$. The subject uses the correct function-space mapping.

At a circular base its linearization has form $L_\omega=\omega^2\partial_\theta^2-\mathcal B_\omega$, with $\mathcal B_\omega:C^1\to C^0$ bounded for each fixed frequency. Frequency changes its smooth coefficients and constant source shifts. Crucially,

$$
\|w'(\cdot+a)-w'(\cdot+b)\|_\infty\le|a-b|\|w''\|_\infty
$$

proves operator continuity from $C^2$ to $C^0$. The stronger statement in $C^1\to C^0$ would generally be false: derivatives of $w_n(\theta)=\sin(n\theta)/n$ have order-one changes under shifts of size $\pi/n$ despite uniformly bounded $C^1$ norms. The reviewed argument never needs that false statement.

## A fixed symmetry complement and uniform inverse

Let $q_\pm(\theta)=\pm(\cos\theta,\sin\theta,0)$, so $Q_\omega=R(\omega)q$. The symmetry kernel spans

$$
T_\alpha=(e_\alpha,e_\alpha),\qquad
J_\alpha=(e_\alpha\times q_+,e_\alpha\times q_-),\qquad\alpha=1,2,3.
$$

This span is the same for every nearby frequency because $R(\omega)>0$. Its normalized phase Gram matrix is $\operatorname{diag}(2,2,2,1,1,2)$. Let $\Pi$ be its fixed finite-rank projection and $E=\ker\Pi$ in $C^2$. The subject's $\Pi_\omega$ equals this same projection; its continuity argument is valid and may be simplified to equality.

The inherited estimate at $\omega_0$ gives $\|w\|_{C^2}\le C_0\|L_{\omega_0}w\|_{C^0}$ on $E$. Since $L_\omega\to L_{\omega_0}$ in $C^2\to C^0$ operator norm,

$$
\|w\|_{C^2}\le C_0\|L_\omega w\|_{C^0}
+C_0\|L_{\omega_0}-L_\omega\|\,\|w\|_{C^2}.
$$

Shrinking the frequency interval so the last coefficient is below $1/2$ gives the uniform bound $\|w\|_{C^2}\le2C_0\|L_\omega w\|_{C^0}$. Exact Euclidean covariance puts all six symmetry tangents in every kernel; the bound excludes every additional kernel direction. Surjectivity onto the full residual space is unnecessary, and no new spectral count at another frequency is assumed.

## Actual slice and nonlinear uniqueness

Use small actual rigid motions $g_pY=O_pY+c_p$, and impose $\langle g_p^{-1}Y-Q_\omega,k_\alpha\rangle=0$ against the fixed basis above. At $(p,Y)=(0,Q_\omega)$, the parameter derivative has translation block $-2I$ and rotation block $-R(\omega)\operatorname{diag}(1,1,2)$, with zero cross blocks. It is uniformly invertible near the base. The finite-dimensional implicit-function theorem with Banach parameters supplies a jointly continuous local slice

$$
w=g_{p(\omega,Y)}^{-1}Y-Q_\omega\in E
$$

and uniform $C^2$ norm control. Rigid covariance preserves the equation and all its complete roots; it does not involve a time reparametrization. A nearby solution therefore satisfies $0=L_\omega w+N_\omega(w)$ on this exact slice.

Joint continuity of the derivative along the compact base curve gives a uniform remainder modulus $\|N_\omega(w)\|_{C^0}\le\eta(\|w\|_{C^2})\|w\|_{C^2}$, with $\eta(r)\to0$. A finite cover of the curve suffices; compactness of a whole Banach-space ball is not being assumed. Combining this with the uniform inverse and taking $2C_0\eta<1$ forces $w=0$. Thus every nearby full zero is a Euclidean image of $Q_\omega$. This excludes even nondifferentiable sequences of noncircular solutions, not only smooth bifurcating branches.

Time translation of this circle is already an axial spatial rotation, so no seventh slice condition is missing. Reflections and label reversal yield no additional local orbit of this planar labeled circle beyond proper spatial rotations. A uniform drift would not be periodic and is outside the boundary class.

## Why a position/velocity neighborhood suffices

For a classical solution $Y$ close to $Q_\omega$ in $C^1$, evaluate its phase-root residual at the base root. The residual error is at most $2\omega\|Y-Q_\omega\|_{C^0}$; the slope is at least $1/4$. Hence $\|\zeta_Y-\zeta_Q\|_\infty\le8\omega\|Y-Q_\omega\|_{C^0}$, uniformly in the small frequency interval. For the sampled derivative,

$$
|Y_j'(S_Y)-Q_{\omega,j}'(S_Q)|
\le\|Y'-Q_\omega'\|_\infty
+\|Q_\omega''\|_\infty|S_Y-S_Q|.
$$

Only the known smooth circle's second derivative appears. Fixed positive range/denominator margins then imply $\|\mathcal A_\omega(Y)-\mathcal A_\omega(Q_\omega)\|_{C^0}\le C\|Y-Q_\omega\|_{C^1}$. Since both are solutions at the same frequency and $\omega$ is bounded away from zero, their equations yield $\|Y-Q_\omega\|_{C^2}\le C'\|Y-Q_\omega\|_{C^1}$. High-frequency acceleration is therefore controlled among classical zeros, without falsely extending the nonlinear differentiability assertion to all of $C^1$.

Finally, $Q_\omega$ varies smoothly and $P\leftrightarrow\omega$ is continuous. Closeness to the original normalized base plus closeness of physical period gives the required closeness to $Q_\omega$. The proved conclusion makes the nominated nearby period fundamental; no separate minimal-period assumption or exclusion by sampling is needed.

## Validation, boundaries and falsifiers

No counterexample or proof gap was found in the reviewed source. The conclusion is derived conditional on the inherited, independently admitted six-dimensional kernel certificate. Its new analytical bridge is valid. A direct construction of noncircular classical periodic zeros approaching the base in period and normalized $C^1$ history would contradict the combined theorem and identify a failure in one of its named premises.

Other concrete falsifiers are an extra complete root despite the uniform speed margin, a failure of the joint source-velocity variation above, failure of $C^2\to C^0$ operator continuity, or an extra fixed-period kernel vector omitted by the inherited spectrum. This assessment supplies no explicit neighborhood radius, no new numerical spectral verification, no claim about nonperiodic or distant-period solutions, and no stability or causal interpretation.

Source identities were measured by `shasum -a 256` on the exact inspected files:

| Source | SHA-256 |
| --- | --- |
| [Varying-period subject](../../binary-research/analysis/alternatives-screen-2026-10-05-time-symmetric-varying-period.md) | `baba157108fbbefd65e70fb2222bc6dbd702cf191ec585efb27cc7a764ac2325` |
| [Inherited fixed-period theorem](../../binary-research/analysis/alternatives-screen-2026-10-05-time-symmetric-local-isolation.md) | `3e6088f0816071c479a8f1f5da728d35280419d679e48e3e320e38f1af0f2698` |
| [Inherited Fourier assessment](../../analysis/alternatives-screen-2026-10-05-adjudication-validation.md) | `3bbb29e6da1c33fbdfddf174134ca819ab479d2b8db5e17a334b2f562fbaee20` |

The live equation-variants Section 14 was read to verify the fixed signs, weights and source denominators. The live Jack K. Hale role and specialist charter supplied a hereditary-domain review lens, not acceptance authority. Only this new adjudication file was written. No subject, shared manuscript, earlier reference, numerical instrument or retained receipt was changed, and no computational producer was launched.

Textual validation: `git diff --no-index --check /dev/null` on this new adjudication emitted no whitespace diagnostics; exit status 1 denotes the new-file difference. A final `shasum -a 256` confirmed that the subject still has the frozen `baba157108fbbefd65e70fb2222bc6dbd702cf191ec585efb27cc7a764ac2325` identity. This is source and formatting validation, not a new spectral computation.
