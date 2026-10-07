# Independent review of the geometry-preserving finite-history comparison

## Verdict and scope

**Derived disposition:** the frozen [geometry comparison](overnight-d-finite-geometry-enclosure.md) has correct implicit-root derivatives, row derivative matrices, fixed-translation endpoint identity, normal-cone damping estimate, weighted receiver matrix, and delayed block comparison. These are conditional error inequalities about a reference path, not a stability result or an exact-history enclosure. No numerical target or sampled screen was used to validate this derivation.

The complete application still needs simultaneous admission of every auxiliary root and every smooth homotopy piece, a continuous reference at the kick, initialized history errors, and interval bounds for matrices, residuals, and the saved delayed envelope. The independently certified [kick inventory](overnight-d-kick-crossing-independent-review-2026-10-07.md) resolves the conditional source-zero transversality and supplies a usable homotopy-jump correction within the proposed tube; it does not supply the other bounds.

The important correction to kick bookkeeping is that a receiver translation can cross the kick sphere twice even when its endpoint roots lie on the same side. A correction supported only on the temporal exact/reference branch mismatch would miss this case. The frozen smooth identity already excludes such crossings, so this is an obligation when extending it, rather than an algebraic counterexample to its stated smooth domain.

## Independent derivative reconstruction

Fix the reception time, reference source path, and translation variables. Write $\mathbf v=\dot{\mathbf x}_j(s)$, $\mathbf W=\mathbf w_j(s)+\mathbf z$, $\tau=t-s$, and $\mathbf n=(\mathbf x_i+\mathbf p-\mathbf x_j(s))/\tau$. The causal equation has differential

$$
0=\mathbf n^\top d\mathbf p+(1-\mathbf n\cdot\mathbf v)\,ds.
$$

Therefore, with $\gamma=1-\mathbf n\cdot\mathbf v>0$,

$$
s_{\mathbf p}=-\mathbf n^\top/\gamma,
\qquad \tau_{\mathbf p}=\mathbf n^\top/\gamma,
\qquad N=\frac{(I-\mathbf n\mathbf n^\top)(I+\mathbf v\mathbf n^\top/\gamma)}\tau.
$$

The transmitter denominator is $D=1-\mathbf n\cdot\mathbf W$. At fixed $\mathbf z$ its derivative is

$$
D_{\mathbf p}=-\mathbf W^\top N
+\frac{(\mathbf n\cdot\dot{\mathbf w}_j)\mathbf n^\top}\gamma.
$$

Differentiating $f=\sigma\mathbf n/(\tau^2D)$ now gives

$$
f_{\mathbf p}=\sigma\left[
\frac{(I+\mathbf n\mathbf W^\top/D)N}{\tau^2D}
-\frac{2\mathbf n\mathbf n^\top}{\tau^3D\gamma}
-\frac{(\mathbf n\cdot\dot{\mathbf w}_j)\mathbf n\mathbf n^\top}{\tau^2D^2\gamma}
\right].
$$

At fixed $\mathbf p$, the root and normal do not depend on $\mathbf z$, so

$$
f_{\mathbf z}=\frac{\sigma\mathbf n\mathbf n^\top}{\tau^2D^2}.
$$

These agree with the subject's $B$ and $C$, including the sign of the source-velocity derivative term. Confusing $\gamma$ with $D$ would be incorrect when the feasible velocity differs from the position derivative or when the velocity addition is nonzero. Only the reference derivative $\dot{\mathbf w}_j$ appears; no exact source acceleration is being assumed available.

Two analytic checks are independent of the numerical screen. For a static source with $\mathbf W=0$, $B=\sigma(I-3\mathbf n\mathbf n^\top)/\tau^3$ and $C=\sigma\mathbf n\mathbf n^\top/\tau^2$, yielding the stated range-two diagonal matrices. In one-dimensional outward geometry with constant source velocity $u$, $D=\gamma=1-u$ and the longitudinal derivative is $-2\sigma/[\tau^3(1-u)^2]$. Direct differentiation of $f=\sigma(1-u)/(x-ut)^2$ gives the same result.

## The fixed translation identity and its domain

At a fixed exact emission time $S$, take

$$
\mathbf p=\mathbf e_i^x(t)-\mathbf e_j^x(S),
\qquad \mathbf z=\mathbf e_j^v(S).
$$

Then $\mathbf x_i(t)+\mathbf p-\mathbf x_j(S)=\mathbf X_i(t)-\mathbf X_j(S)$ and $\mathbf w_j(S)+\mathbf z=\mathbf V_j(S)$. Thus the endpoint auxiliary root is exactly $S$ if it belongs to the selected unique admitted root branch. Along the parameter path $\theta\mapsto(\theta\mathbf p,\theta\mathbf z)$, these two error vectors are fixed numbers. They are not re-evaluated at $s(\theta)$, so their derivatives do not introduce unknown exact acceleration or derivatives of delayed errors.

On an absolutely continuous smooth-branch homotopy,

$$
\frac{d}{d\theta}f(\theta\mathbf p,\theta\mathbf z)
=B(\theta)\mathbf p+C(\theta)\mathbf z.
$$

Integration gives the subject's exact identity. It requires a unique root, positive range, positive $\gamma$, positive $D$, and a reference source branch with the required differentiability throughout the whole connecting homotopy. Ordinary endpoints alone do not establish these hypotheses. Continuous Hermite segment boundaries and continuous feasible-velocity projection transitions are harmless when the required derivatives and bounds hold almost everywhere and the integrated map is absolutely continuous. A discontinuity of the source velocity contributes a jump; a discontinuity of the source position first requires repairing the reference itself.

Bounds for $\mathbf p$ and $\mathbf z$ use the error at the actual source time $S$, not the homotopy source time $s(\theta)$. Bounds on the coefficient matrices must cover every possible actual $S$ and every intermediate $s(\theta)$ admitted by the proposed error region. Replacing either one with a single nominal source time would narrow the claim unjustifiably.

## Weighted energy and damping

With $\mathbf q_i=(\alpha\mathbf e_i^x,\mathbf e_i^v)$, the exact normal-cone inequality against feasible $\mathbf w_i$ gives $-\mathbf e_i^v\cdot\boldsymbol\xi_i\le0$. The independent identity

$$
\lambda_i\mathbf e_i^v\cdot\mathbf w_i
=\frac{\lambda_i}{2}(|\mathbf V_i|^2-|\mathbf w_i|^2-|\mathbf e_i^v|^2)
\le-\frac{\lambda_i}{2}|\mathbf e_i^v|^2
+\frac{\lambda_i}{2}(1-|\mathbf w_i|^2)
$$

is valid for every feasible exact and approximate velocity and every diagnostic $\lambda_i\ge0$. Its upper defect $Q_i$ is nonnegative. Compared with the earlier complementarity penalty $q_i=\lambda_i|\mathbf w_i|(1-|\mathbf w_i|)$, the new penalty is larger by $\lambda_i(1-|\mathbf w_i|)^2/2$ and purchases the displayed damping term. There is no unacknowledged modification of the exact ceiling response.

Substitution of the row identity into $\tfrac12(Y_i^2)'$ gives the homogeneous quadratic form

$$
\mathbf q_i^\top
\begin{pmatrix}
(\alpha'/\alpha)I&\alpha I\\
(\sum_j\overline B_{ij})/\alpha&-(\lambda_i/2)I
\end{pmatrix}\mathbf q_i.
$$

This verifies the factor $\lambda_i/2$ and the order of summation. Taking the maximum eigenvalue of the symmetric part bounds the quadratic form even for nonsymmetric receiver matrices and even when that eigenvalue is negative. Source terms take the form $\mathbf e_i^v\cdot H_{ij}\mathbf q_j(S)$, so $|\mathbf e_i^v|\le Y_i$ and the spectral norm of the complete $3\times6$ block give the claimed delayed term. The residual vector is $(-\alpha\rho_i^x,-\rho_i^v)$ and therefore has norm $R_i$ as displayed. A vector kick remainder contributes at most its norm times $Y_i$, giving an additive $J_i$ after division.

The oscillator check is exact: $B_i=-\omega^2I$, $\alpha=\omega$, and $\lambda_i=0$ make the off-diagonal symmetric blocks cancel and yield zero logarithmic growth. This validates the mathematical cancellation mechanism; it does not establish that the actual delayed system has small error amplification.

## Delayed first-contact comparison and existence scope

For an upper barrier $E_i(t)>0$, validate coefficient bounds over the complete joint error and root region. For each actual source bracket use a bound on

$$
\sup_{s\ \mathrm{in\ bracket}}\|H_{ij}(t,s)\|_2E_j(s).
$$

A nominal $s$, a single saved sample, or the current value $E_j(t)$ cannot replace this supremum unless a separate bound justifies it. Neither $E_i$ nor $\alpha$ has to be monotone. The scale $\alpha$ must be positive and defined at every accessible past source time as well as at positive reception times; its reciprocal must remain bounded on the compact source intervals being used.

At the first contact $Y_i=E_i>0$, all earlier delayed errors satisfy their saved barriers, and the energy inequality permits division by $Y_i=E_i$. The $Q_i/E_i$ term is therefore legitimate there; substituting it for $Q_i/Y_i$ at arbitrary interior points would not be legitimate. A strict supersolution or the usual limiting strict-barrier argument prevents first exit. Local integrability and boundedness on the admitted compact region justify the comparison. Positive delays keep delayed arguments in the already controlled history. A negative receiver logarithmic-growth bound does not invalidate first contact, because it multiplies equal positive values at contact.

This argument bounds any solution while it exists in the joint region. To turn it into existence through a full finite interval, initialize a valid local normal-cone solution and simultaneously certify root completeness, positive range and factor margins, bounded ordinary input, compatible source regularity, and no first exit from the error region. Local restart then rules out a finite termination on a smooth source branch. At the source kick, the separately certified transverse front crossings allow a one-sided event continuation, conditional on the other ordinary-root conditions. There are only 56 such fronts, but overlapping brackets still require event handling valid for their possible orders and coincidences. Neither the energy inequality alone nor a small nominal error curve supplies these continuation hypotheses.

## Continuous reference, kick correction, and initialization

The independent kick review verifies the comparison-only repair $\mathbf x_j(s)=\mathbf X_j^{\mathrm{rigid}}(s)+\mathbf d_j$ for $s\le0$, with $\mathbf d_j=\mathbf X_j^{\mathrm{stored}}(0)-\mathbf X_j^{\mathrm{rigid}}(0)$; keep positive Hermite history unchanged. This removes the position jump exactly, leaves negative velocities unchanged, and replaces an unjustified zero initial-history error by the explicitly bounded constant position error. Residuals involving negative sources must be recomputed for this joined reference. Earlier unshifted floating screens do not become certificates for it retroactively.

The interval inventory proves $|\mathbf d_j|<4\times10^{-12}$ and post-kick velocity representation error below $4\times10^{-13}$ for every member. Taking $\alpha(s)=0.2$ on the prescribed past and at initialization gives

$$
Y_i(0)\le0.2|\mathbf d_i|+|\mathbf e_i^v(0)|<1.2\times10^{-12},
\qquad
Y_i(s)=0.2|\mathbf d_i|<8\times10^{-13}\quad(s<0).
$$

Thus uniform initial and prescribed-past barriers $E_i=2\times10^{-12}$ are certified for this particular joined reference. This is initialization only. The earlier screen's nominal $10^{-14}$ allowance is not validated by these bounds, although the interval bounds themselves are conservative and do not establish a lower bound on the true representation errors.

For the kick correction, an affine receiver translation intersects the source-zero sphere at most twice. At each isolated crossing the exact row jump is

$$
\Delta f=\frac{\sigma\mathbf n}{t^2}
\frac{\mathbf n\cdot\Delta\mathbf w}{D^+D^-}.
$$

The new interval inventory supplies positive factors for the entire $|\mathbf p|\le0.2$, $|\mathbf z|\le0.001$ front region of the joined reference. If $|\mathbf p|\le P\le0.2$ on a channel's certified support slab, its integrated correction is bounded by

$$
\int J_{ij}\le\frac{4|\Delta\mathbf w_j|P}{\bar\kappa\,t_{\min}^2\delta^+\delta^-}.
$$

The per-channel coefficient is retained in the independent JSON. At $P=0.2$, summed per-receiver integrated forcing is at most $7.70\times10^{-6}$ before subsequent error amplification. This bound accounts for both homotopy crossings even when endpoint source branches agree. It is not restricted to the temporal exact/reference event-mismatch interval, and it does not certify the smooth off-front matrices.

An integrated kick budget must be used through a valid integral comparison or event/slab budget construction. Adding its total at the beginning of a slab and then allowing it to decay under a negative $\mu_i$ can underbound a later injection of the same mass. A simple safe implementation is the certified pointwise two-jump coefficient on the entire enclosing bracket; exploiting the smaller adaptive integrated bound requires accounting for the possible forcing times and subsequent propagation. It cannot simply be declared a final velocity-error allowance.

Finally, tail admission still uses the Hermite derivative, whereas $Y_i$ controls error relative to the feasible projected velocity. The required conversion is $|\mathbf V_i-\dot{\mathbf x}_i|\le E_i+|\rho_i^x|$, and the position bound is $E_i/\alpha$. These must satisfy the tail's requested allowances over its required source-history interval, not merely at the final receiver time.

## Validation, falsifiers, and disposition

This proof review directly reconstructed the calculus and energy algebra and used the static-source, constant-velocity, and oscillator analytic cases. It ran no target computation and relied on no sampled matrix agreement. The previously completed interval kick inventory is used only for the separate conditional front and initialization data, with its assumptions and open obligations retained.

Falsifiers for the accepted formulas are a smooth admitted root violating the implicit derivative, a chain-rule term missing from $B$ or $C$, an endpoint translation that fails to recover the exact row under the declared uniqueness, or a weighted energy trajectory crossing a validated strict barrier while all delayed histories and root hypotheses hold. A discontinuous reference position, omitted homotopy kick crossing, pointwise coefficient substituted for an error-region bound, or uninitialized delayed representation error invalidates an application without refuting the conditional identities.

Only this new proof companion was authored for the geometry adjudication; the frozen subject and numerical screens remain untouched. At review, its frozen SHA-256 is `a9a015c0b59d79bc42d43e61c76d710c185de3b87be2611df90d0f1f2fc3b9f3`. The conditional mathematical route is accepted with the explicit reference-join, kick-count, initialization, and comparison obligations above. Actual finite-history admission remains unresolved.

Validation receipt: `shasum -a 256` confirmed the subject's frozen hash above after review, and a file-scoped `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this new companion (difference exit status 1). The reviewer's separate kick-compute owner closeout returned `status: clear`; no computation remains owned by this review.
