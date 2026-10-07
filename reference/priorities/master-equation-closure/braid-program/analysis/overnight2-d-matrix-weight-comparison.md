# Constant matrix weights for the delayed error comparison

## Purpose and boundary

The current [delayed admission application](overnight2-d-delayed-admission.md) uses the same scalar position weight $\alpha$ in every spatial direction. This note derives a possible refinement if that comparison becomes too conservative. It changes only the norm used to prove error bounds. It does not change the original preparation, acceleration equation, kick, causal roots or selected ceiling response. The [independent component review](overnight2-d-fallback-components-independent-review.md) accepts the conditional formulas and helper within their finite three-dimensional positive-definite contract. No target calculation or improvement is claimed here.

The setting is the strict-interior domain already used by the current application: complete source roots, positive causal factors, the original prescribed history, and separately controlled source-zero jumps. The signed smooth error equation has receiver coefficient $B_i=\sum_{j\ne i}\overline B_{ij}$ and delayed contribution $-\overline B_{ij}e_j^x(s)+\overline C_{ij}e_j^v(s)$. Bars denote homotopy averages enclosed by the validated matrix regions. The argument is an error estimate about a time-dependent reference with its residual retained, not a stability spectrum.

## A constant positive-definite position weight

For each member choose a constant real symmetric positive-definite matrix $S_i$ and define

$$
w_i=S_i e_i^x,\qquad Y_i=\left(|w_i|^2+|e_i^v|^2\right)^{1/2}.
$$

Then $|e_i^v|\le Y_i$ and $|e_i^x|\le\|S_i^{-1}\|_2Y_i$. Constant weights avoid a derivative or a norm change at reception-cell boundaries. The receiver part in these coordinates is

$$
A_i=\begin{pmatrix}0&S_i\\B_iS_i^{-1}&0\end{pmatrix}.
$$

Since $S_i=S_i^\top$, its symmetric part has off-diagonal block $(S_i+S_i^{-1}B_i^\top)/2$. The eigenvalues of a symmetric matrix with zero diagonal blocks and off-diagonal block $K$ are the positive and negative singular values of $K$. Therefore its Euclidean logarithmic norm is exactly

$$
\mu_i=\frac12\left\|S_i+S_i^{-1}B_i^\top\right\|_2.
$$

The multiplication order matters: $S_i^{-1}B_i^\top$ cannot generally be replaced by $B_i^\top S_i^{-1}$. When $S_i=\alpha I$, this reduces to the current scalar-weight formula.

The delayed block acting on the source's own weighted coordinates is

$$
H_{ij}=\left[-\overline B_{ij}S_j^{-1}\quad\overline C_{ij}\right].
$$

It uses the source weight $S_j$, whereas the receiver logarithmic norm uses $S_i$. The smooth positive-source forcing is bounded by $\|H_{ij}\|_2E_j(s)$. A negative source still contributes $\|B_{ij}\|_2d_j^*$ with zero velocity error. The residual is an acceleration residual in the existing position-exact reference, so its norm integral enters unchanged. Finite source-zero jump contributions are also acceleration differences and enter through the same separately bounded integral budgets.

## Root regions, initialization and the first-exit bound

Let $c_i\ge\|S_i^{-1}\|_2$ be a certified upper bound. Receiver trial $U_i$ and earlier source bound $W_j$ imply a translation radius

$$
P_{ij}\ge c_iU_i+c_jW_j
$$

on a positive source interval. Include the negative translation allowance where that branch is possible. The source-velocity radius remains $Z_{ij}\ge W_j$. The earlier two-pass history selection and containment check are otherwise unchanged. Initial bounds may use $E_i(0)\ge\|S_i\|_2d_i^*+v_i^*$; the full initial error vectors are not required if their independently certified norms are available.

After verified matrix norms, whole-cell residual integrals and source-front budgets are supplied, the same nonnegative scalar comparison and simultaneous first-exit test apply. The final physical bounds are velocity error at most $E_i$ and position error at most $c_iE_i$. These conversions must be used consistently for every earlier source lookup and final reported neighborhood. A smaller weighted number alone is not a stronger physical error bound.

## A known cancellation case

Consider the supplied anisotropic oscillator coefficient $B_i=-\operatorname{diag}(\omega_1^2,\omega_2^2,\omega_3^2)$ with positive constants $\omega_k$. Choosing $S_i=\operatorname{diag}(\omega_1,\omega_2,\omega_3)$ makes

$$
S_i+S_i^{-1}B_i^\top=0.
$$

The receiver contributes zero logarithmic growth in this norm. If the three frequencies differ, no single scalar $\alpha$ cancels every direction. This is an exact linear comparison control showing why the refinement can be useful; it is not a claim that the release has that coefficient or is an equilibrium. The actual delayed block, nonsymmetric receiver part and coefficient variation may remove the benefit.

## Verification requirements and method selection

An encoded symmetric matrix defines an exact binary-rational candidate weight. Positive definiteness can be established by exact-rational leading principal minors. Its exact-rational adjugate divided by its nonzero determinant gives an independent inverse, converted outward to the existing interval representation. The reviewed three-row spectral verifier can then bound the norms needed above. Candidate eigenvectors or square roots may propose a weight, but cannot establish positive definiteness, inversion or error reduction by themselves.

The practical selection question is whether any fixed weights reduce a complete physical position/velocity envelope relative to the scalar-weight application on identical residual input and root domains. A sampled reduction of receiver growth is only a diagnostic; larger inverse weights or delayed blocks may negate it. The existing scalar-weight application remains primary until a complete comparison demonstrates otherwise. Falsifiers are a nonpositive weight minor, an inverse outside its enclosure, incorrect matrix order, inconsistent source/receiver weights, an uncovered root region, or a final physical error bound that fails its required allowance.
