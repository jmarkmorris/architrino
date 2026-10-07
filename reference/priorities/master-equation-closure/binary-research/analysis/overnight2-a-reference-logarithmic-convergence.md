# An analytic coefficient-space construction of the local logarithmic manifold

**Derived reference for separate assessment: a convergent local construction exists, with an explicit sufficient contraction criterion and no evaluated numerical radius.** The formal parameterization in the [independently frozen method assessment](overnight2-a-reference-logarithmic-manifold-method.md) admits a convergent construction in a degree-weighted analytic coefficient space. The argument uses the exact invariance equation directly, not analyticity of the existing $C^1$ history semiflow. The accepted nonresonance and matrix tail estimate supply a bounded inverse between the declared spaces. An analytic implicit-clock contraction and a quadratic-remainder contraction then give a positive, presently unevaluated parameter radius.

This reference was derived without seeing a new convergence subject, coefficient output or numerical instrument. It uses the Jack K. Hale lens and retains the exact original coefficient-one logarithmic mirror-planar law, balance zero, complete preparation and compatible positive-amplitude family. It constructs a mathematical parameterization of their limiting local strong unstable manifold; it does not select a new complete physical past or an actual finite-amplitude event. Only this new report is written.

## Exact premises and the chosen spaces

Use the notation and frozen Cartesian matrix $M_{\rm C}(\gamma)$ of the method assessment. In particular $k=\alpha+i\beta$, $\alpha\ge\alpha_0=.0138698363660541>0$, $A=ae_1$, $\Omega=\omega J$, $B=I+\Omega$, and $0<\lambda<1$. All are exact admitted values, not rounded replacements. The [circle assessment](overnight2-a-reference-logarithmic-circle.md) supplies the complete mirror-planar spectral census and backward uniqueness. No additional exponent exclusion is inferred from a scout.

Let $\mathcal A$ be the scalar Wiener algebra of absolutely summable coefficients on the unit bidisc:

$$
f(\zeta,\eta)=\sum_{i,j\ge0}f_{ij}\zeta^i\eta^j,
\qquad \|f\|_{\mathcal A}=\sum_{i,j}|f_{ij}|.
$$

The monomials $\zeta,\eta$ have norm one. Convolution gives $\|fg\|_{\mathcal A}\le\|f\|_{\mathcal A}\|g\|_{\mathcal A}$ by the triangle inequality and summing the nonnegative product series. Constants and convergent power series of sufficiently small algebra elements therefore obey the usual product, reciprocal, logarithm and square-root rules. This is an algebraic control on the space before use of the nonlinear equation.

For Cartesian vectors use the coefficient sum of complex Euclidean norms. Define

$$
Y=\mathcal A^2,\qquad
X=\left\{W:\ \|W\|_X=\sum_{i,j}\max(1,(i+j)^2)|W_{ij}|_2<\infty\right\}.
$$

Both are complete weighted sequence spaces. Let $X_{\ge2}$ and $Y_{\ge2}$ be the closed subspaces with no constant or linear coefficients. Put $K_*=|k|$ and $\mathcal L=k\zeta\partial_\zeta+\bar k\eta\partial_\eta$. On a degree-$N$ coefficient, $\mathcal L$ multiplies by $\gamma_{ij}=ik+j\bar k$, with $|\gamma_{ij}|\le K_*N$. Hence

$$
\|W\|_Y\le\|W\|_X,\qquad
\|\mathcal LW\|_Y\le K_*\|W\|_X,\qquad
\|\mathcal L^2W\|_Y\le K_*^2\|W\|_X.
$$

Thus the second time derivative is a bounded map from $X$ to $Y$. It is not assumed bounded on the unweighted algebra itself. These weights also control the values and first two parameter derivatives on the closed bidisc by absolute convergence.

## A complex clock neighborhood with source contraction

Write $\ell=\lambda+e$, with $e\in\mathcal A$. Choose a positive clock radius $\varepsilon<\lambda$, small enough that

$$
q:=\lambda^\alpha(1-\varepsilon/\lambda)^{-K_*}<1.
$$

Such a radius exists because $\lambda^\alpha<1$. The logarithm series gives

$$
\|\log(\ell/\lambda)\|_{\mathcal A}
\le-\log(1-\varepsilon/\lambda),\qquad
\|\ell^k\|_{\mathcal A},\ \|\ell^{\bar k}\|_{\mathcal A}\le q.
$$

These are complex-algebra bounds. Using only the real-axis inequality $\ell^\alpha<1$ would not be sufficient when the clock is complexified. The factor $K_*$ explicitly controls that issue.

For $U=A+W$, define the source composition

$$
U_s=U(\zeta\ell^k,\eta\ell^{\bar k}).
$$

Its degree-$N$ coefficient contribution has algebra norm at most $|U_{ij}|_2q^N$. Therefore the defining sum converges normally. The same is true for $\mathcal LU$ evaluated at the source. Differentiation with respect to the clock produces polynomial degree factors, but every fixed such factor is bounded after multiplication by $q^N$. More directly, on a slightly larger clock ball still satisfying $q<1$, the series of holomorphic composition terms converges uniformly on bounded $X$ sets. It defines a jointly analytic map of $W$ and $e$ into $Y$. This supplies analytic state-dependent evaluation in the chosen coefficient spaces; no analyticity assertion about arbitrary $C^1$ histories is used.

With $E_\ell=e^{\Omega\log\ell}$, set

$$
C=U+\ell E_\ell U_s,\qquad
G(e,W)=1-\lambda-e-\sqrt{C\cdot C}.
$$

The bilinear Cartesian square has base value $d_0^2>0$, where $d_0=1-\lambda$. Shrink the clock radius and the $X$ radius so that $\|C\cdot C-d_0^2\|_{\mathcal A}<d_0^2/2$. The square-root series about $d_0^2$ then defines an analytic map. At $(e,W)=(0,0)$, the frozen clock calculation gives

$$
G(0,0)=0,\qquad D_eG(0,0)=-D_0I_{\mathcal A},\qquad D_0=1/\lambda>0.
$$

An explicit sufficient implicit-clock criterion on a chosen product ball is

$$
\sup\|I+D_0^{-1}D_eG(e,W)\|\le\frac12,
\qquad
\sup_W\|G(0,W)\|_{\mathcal A}<\frac{D_0\varepsilon}{2}.
$$

The map $e\mapsto e+D_0^{-1}G(e,W)$ then maps the closed clock ball into itself and is a contraction. Analyticity and the displayed base derivative show that some positive product ball satisfies these inequalities; no numerical size is claimed. Starting with $e=0$, the iterates are analytic in $W$ and converge uniformly on a smaller ball. Cauchy estimates on that smaller ball show that the limit $e(W)$ is analytic. This is also a direct proof of the needed local analytic implicit-function conclusion.

When $W$ has zero constant coefficient, every clock iterate has zero constant coefficient, so $\ell_{00}=\lambda$ exactly. The construction retains the real-conjugate coefficient symmetry. It neither selects another root nor changes the positive square-root or logarithm branch.

## The nonlinear response is analytic between the declared spaces

With the solved clock, define

$$
d=1-\ell,\qquad n=C/d,\qquad
D=1+n\cdot E_\ell(BU+\mathcal LU)_s,
\qquad \Phi(W)=\frac{C}{d^2D}.
$$

At the base, $d=d_0$ and $D=D_0$. Shrink the $X$ ball again so that

$$
\|d-d_0\|_{\mathcal A}<d_0/2,\qquad
\|D-D_0\|_{\mathcal A}<D_0/2,\qquad
\|C\|_Y\le2d_0.
$$

Reciprocal series and the already established source composition make $\Phi:X\to Y$ analytic there. The algebra norm supplies the explicit response bound

$$
\|\Phi(W)\|_Y\le B_0:=\frac{16}{d_0D_0}.
$$

The full residual is

$$
\mathcal F(W)=\mathcal L^2W+(I+2\Omega)\mathcal LW
+(\Omega+\Omega^2)(A+W)+\Phi(W).
$$

Its constant value is zero by the admitted Cartesian balance, and it is an analytic map $X\to Y$. The local differential terms are linear; only $\Phi$ contributes second derivatives with respect to $W$.

Choose a positive $\rho$ so that the preceding analytic construction and bound $B_0$ hold on a neighborhood of the closed $X$ ball of radius $2\rho$. Cauchy's formula in two scalar directions, each of radius $\rho/4$, gives the conservative second derivative bound

$$
\sup_{\|W\|_X\le\rho}\|D^2\Phi(W)\|_{X\times X\to Y}
\le C_2:=\frac{16B_0}{\rho^2}.
$$

Indeed the two direction increments together have norm at most $\rho/2$, within the larger ball, and the mixed Cauchy coefficient is bounded by $B_0/(\rho/4)^2$. This establishes a finite derivative bound in a specified norm, rather than presuming a quadratic remainder from the earlier $C^1$ theorem.

## Bounded inverse of the high-degree homological operator

The derivative $\mathcal M=D\mathcal F(0)$ is diagonal by monomial degree-frequency, with coefficient matrix $M_{\rm C}(\gamma_{ij})$. The independently reconstructed differential includes the actual source-clock and shifted-source-velocity terms. For $N=i+j\ge2$, the census gives invertibility because $\operatorname{Re}\gamma_{ij}=N\alpha>\alpha$.

The accepted tail estimate supplies, for $|\gamma|\ge10$ in the required half-plane,

$$
\|M_{\rm C}(\gamma)^{-1}\|_2
\le\frac1{|\gamma|^2-6.62|\gamma|-23.966}.
$$

For $|\gamma|\ge20$ the denominator exceeds $.6|\gamma|^2$: at twenty the difference is $160-132.4-23.966>0$, and it increases thereafter. Since $|\gamma_{ij}|\ge N\alpha\ge N\alpha_0$, choose any integer $N_0\ge20/\alpha_0$. Then a sufficient inverse constant is

$$
C_*=
\max\left\{
\max_{2\le i+j<N_0}(i+j)^2\|M_{\rm C}(ik+j\bar k)^{-1}\|_2,
\frac5{3\alpha_0^2}
\right\}<\infty.
$$

The first maximum is over finitely many invertible matrices. Its finiteness is proved by the accepted census; it has not been numerically enclosed in this review. Coefficientwise inversion therefore defines a bounded map $\mathcal M^{-1}:Y_{\ge2}\to X_{\ge2}$ with norm at most $C_*$. Conversely $\mathcal M:X_{\ge2}\to Y_{\ge2}$ is bounded by the residual differentiation already established. This is an actual Banach-space isomorphism, not pointwise formal invertibility alone.

The degree-squared weight is important. It matches the quadratic matrix growth and pays for the two time derivatives. Using the same unweighted norm on both sides would leave an unbounded differential operator and would not justify the following contraction.

## A sufficient contraction criterion and existential convergence

Let $p(\zeta,\eta)=\zeta v+\eta\bar v$ for the fixed admitted eigenvector normalization, and put $P_*:=\|p\|_X=2|v|_2>0$. Seek

$$
W=rp+h,\qquad h\in X_{\ge2},
$$

where $r$ is a small scalar amplitude used to scale the analytic parameter domain. It is not a new physical preparation parameter. Since $\mathcal Mp=0$, the residual equation is

$$
\mathcal Mh+\mathcal N(rp+h)=0,\qquad
\mathcal N(W)=\mathcal F(W)-\mathcal MW.
$$

For $W$ with no constant coefficient, source composition preserves degree and the nonlinear remainder has degree at least two. In particular the residual's constant and linear coefficients vanish exactly after fixing the base and eigenvectors. Solving the high-degree equation solves the whole equation; no low-degree residual is discarded.

The derivative bound gives

$$
\|\mathcal N(W)\|_Y\le\frac{C_2}{2}\|W\|_X^2,
\qquad \|D\mathcal N(W)\|_{X\to Y}\le C_2\|W\|_X
\quad(\|W\|_X\le\rho).
$$

Set $\delta=|r|P_*$ and impose the explicit sufficient inequalities

$$
0<\delta<\min\left\{\frac\rho2,\frac1{4C_*C_2}\right\}.
$$

On the closed ball $\|h\|_X\le\delta$, the map

$$
\mathcal T_r(h)=-\mathcal M^{-1}\mathcal N(rp+h)
$$

has norm at most $2C_*C_2\delta^2<\delta/2$ and Lipschitz constant at most $2C_*C_2\delta<1/2$. Completeness and successive contraction give a unique fixed point, with

$$
\|h\|_X\le2C_*C_2\delta^2.
$$

All constants are finite and the allowable $\delta$ is strictly positive. Thus this proves existential convergence. It does not merely postpone convergence to a future conjecture. It also does not assign a numerical radius: the clock ball, $\rho$, finite low-degree inverse maximum and regular history margins have not been quantitatively enclosed.

For any fixed small positive real $r$, rescale $z=r\zeta$, $w=r\eta$. The resulting $U(z,w)$ is analytic on the bidisc $|z|,|w|<r$, with the prescribed linear coefficients. The formal recursion is unique at every higher degree, so its Taylor coefficients are the formal coefficients already specified by the method. Reality conjugacy follows from invariance of the equation and uniqueness of the contraction. The construction proves convergence of that formal series at some positive radius.

## Compatible histories and identification with the accepted manifold

The $X$ norm controls $U$, $\mathcal LU$ and $\mathcal L^2U$. Hence for every real-slice parameter $w=\bar z$ in a smaller bidisc,

$$
\Xi_{z,w}(s)=\big(U(ze^{ks},we^{\bar k s}),
\mathcal LU(ze^{ks},we^{\bar k s})\big),\qquad -H\le s\le0,
$$

is a compatible $C^1$ position/velocity-state history. The first component has derivative equal to the second throughout the segment, and the full invariance equation gives the endpoint acceleration compatibility. Source parameters contract for negative real similarity time, so these histories form an actual local solution of the autonomous finite-history equation.

Shrink the parameter radius once more to preserve the admitted positive separation, physical speed and root margins. This is possible quantitatively from the same norm: if $\|W\|_X\le\epsilon$, then the physical velocity change is at most $(\|B\|+K_*)\epsilon$, while the position change is at most $\epsilon$. The base has $a>0$, speed strictly below one and an interior ordinary clock. The analytic clock bounds keep the source inside the fixed history window and preserve the positive transmitter denominator. No analytical continuation through the formal physical origin $T=-1$ is asserted.

The entire backward parameter orbit contracts at rate $\alpha>.012$. Its compatible history deviation consequently has $C^1$ norm $O(e^{\alpha\tau})$ as $\tau\to-\infty$, because each nonconstant monomial decays at least at that rate and the degree-weighted sums remain bounded. It lies in the uniqueness class of the previously accepted backward graph. The leading spectral projection has invertible real two-dimensional derivative on the modal tangent. Backward uniqueness and that local inverse identify the parameterized image with a neighborhood of the same strong unstable manifold.

This identification concerns the autonomous limiting histories already attained by the original family. It does not create a complete physical preparation extending backward through $T=-1$, and it does not replace the held remote past of any actual member. The exact original-family checkpoint is still the level set of its history eigenfunctional, not automatically a circle of constant modulus in the new analytic coordinates. Numerical transport and an actual finite-member event require their own enclosed history and transfer argument.

## Remaining quantitative obligation, falsifiers and preservation

The open task has narrowed from existence of a convergent local parameterization to a usable, independently enclosed radius and error bound. A numerical admission must bound the finite part of $C_*$, choose the complex clock ball with $q<1$, close its derivative and residual inequalities, enclose the nonlinear response on the chosen coefficient ball, and verify the resulting compatible-history margins. The contraction criterion above then gives an explicit norm error and can support a separate rigorous finite-tail or a-posteriori construction. Floating-point coefficients alone do not evaluate those constants.

Falsifiers are failure of the complex source contraction bound, lack of analyticity or a wrong clock derivative in the declared algebra, an unbounded high-degree inverse despite the tail estimate, a missed growing characteristic exponent at a homological frequency, loss of degree preservation, or a nonlinear term containing unaccounted higher current derivatives. The weighted maps and their bounds expose each possible failure. This proof does not invoke analyticity of a $C^1$ history flow and therefore does not inherit that unjustified premise.

The only new durable artifact is this analytical reference. No subject criterion, coefficient output or new instrument was inspected; no computation, new physical history, recursive agent, shared-owner edit, production change, Git mutation or generator was used. The parent owns integration into [the main A report](overnight2-a-followup-and-research-2026-10-07.md). Earlier frozen equations, references and retained numerical evidence remain read-only.

**Identity, validation and freeze, 2026-10-07 04:23 UTC.** Native `shasum -a 256` returned the unchanged frozen identities `5a3d1fe01c4e92365893747c375ac2f30e42498501e73a3d4f11cb725fdfadcc` for the method assessment, `ed90fe91852b82b0b688894df4b88da08f5edd8906aa251ec2012efa93543f24` for the circle assessment, and `d7641f13599326551a74ccb9563e71edf33ef341f3ff086c3906be30844c4615` for the original formal method. `node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs reference/priorities/master-equation-closure/binary-research/analysis/overnight2-a-reference-logarithmic-convergence.md` passed its known controls before the target, then passed 137 math spans, three local links and whitespace. This check covers syntax and destinations only. The independent approach is frozen for parent assessment; its quantitative constants and radius remain unevaluated, and no retained numerical evidence is claimed.
