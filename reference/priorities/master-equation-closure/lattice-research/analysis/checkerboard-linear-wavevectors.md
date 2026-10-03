# Checkerboard linear modes and spatially localized ancient histories

The exact stationary alternating cubic lattice permits a linearization about an actual equilibrium. This note derives its general spatial-mode equation and a band of growing modes for every positive coupling. It then constructs complete ancient solutions of the linearized equation with rapidly decaying spatial tails. The nonlinear localized preparation requested by the [work queue](../work-queue.md#specify-a-spatially-localized-self-consistent-lattice-preparation) remains unconstructed.

**Claim grade:** derived in this integration, with the staggered characteristic equation as an exact analytical control. The proof has been self-reviewed; no separate mathematical adjudication or general-wavevector numerical calculation is claimed. The [existing nonlinear ancient construction](smooth-two-particle-incoming-reachability.md) remains a different, coherent infinite-support result at $g=16$.

## Equilibrium, histories and conventions

Use unit lattice spacing, $c_f=1$, $g>0$, anchors $j\in\mathbb Z^3$ and polarity $\sigma_j=(-1)^{j_1+j_2+j_3}$. Write $X_j(T)=j+u_j(T)$. The equilibrium has $u_j=0$ for its complete past. Preserve the stationary eight-source block prescription and consider first variations with displacement and velocity decaying exponentially as $T\to-\infty$. This temporal condition makes the source corrections and their derivatives absolutely summable. It is not a summation rule for a nondecaying periodic past.

The complete small subfield geometry has one positive-delay root per distinct source and no own-history root. Put $d=i-j$, $r=|d|$, $n_d=d/r$ and

$$
T_d=\frac{3n_dn_d^{\mathsf T}-I}{r^3},\qquad
B_d=\frac{n_dn_d^{\mathsf T}}{r^2}.
$$

Here $I$ is the three-dimensional identity matrix. The derivative of the stationary vector row $d/r^3$ is $-T_d$. Its receiver-position contribution sums to zero by cubic symmetry on every complete shell: $\sum n_dn_d^{\mathsf T}=(\#\text{shell})I/3$. Parity is constant on a shell because $\sum d_a$ and $\sum d_a^2$ agree modulo two. The signed receiver derivative therefore vanishes as well. This is the same zero derivative established by the stationary field, with its declared grouping preserved.

The source-position derivative contributes $T_du_j(T-r)$. Differentiating the transmitter denominator contributes $B_du_j'(T-r)$. The first-order shift of emission time does not add another term because the background source position and velocity are constant. Thus the linear equation is

$$
u_i''(T)=g\sum_{d\ne0}(-1)^{d_1+d_2+d_3}
\left[T_du_{i-d}(T-r)+B_du_{i-d}'(T-r)\right].
$$

This is acceleration-first dynamics derived from the delayed row. No mechanical mass, force law, primitive stiffness or standard-physics dispersion relation is assumed.

## General spatial-mode matrix and exact control

Let $Q=(\pi,\pi,\pi)$, with spatial wavevectors understood modulo $2\pi$. A spatial mode is a displacement whose phase changes by $k\cdot j$ from site to site. Substituting $u_j(T)=Ue^{\lambda T+ik\cdot j}$ gives

$$
F(k,\lambda)U=0,\qquad
F(k,\lambda)=\lambda^2I-gM(k,\lambda),
$$

$$
M(k,\lambda)=\sum_{d\ne0}e^{-\lambda r-i(k+Q)\cdot d}
\left[T_d+\lambda B_d\right].
$$

For real $k$ and $\operatorname{Re}\lambda>0$, this sum and every finite derivative converge absolutely and locally uniformly. Polynomial factors produced by differentiating with respect to $k$ or $\lambda$ are dominated by the exponential range factor. Locally complex $k$ is also permitted when its imaginary part is smaller than the positive real part of $\lambda$ in the chosen norm. Hence $F$ is analytic there. For real $k,\lambda>0$, pairing $d$ and $-d$ replaces their phase factors by real cosines, so $F$ is real symmetric.

At $k=Q$, the phase equals one. Shell cancellation gives the exact control

$$
M(Q,\lambda)=\frac\lambda3\Sigma(\lambda)I,\qquad
\Sigma(\lambda)=\sum_{d\ne0}\frac{e^{-\lambda r}}{r^2}.
$$

Thus the nonzero growth root satisfies the manuscript's equation $\lambda=g\Sigma(\lambda)/3$, including its established $2<\lambda<4$ bound at $g=16$. An implementation must pass this matrix identity and the known bracket before being used at other wavevectors. This note uses the identity analytically and runs no matrix instrument.

## A positive growth root at every coupling

The function $\Sigma$ is positive, continuous and strictly decreasing for $\lambda>0$. It tends to zero at infinity. It tends to infinity as $\lambda\downarrow0$: a lattice annulus of radius comparable to $1/\lambda$ has order $\lambda^{-3}$ sites, each contributing order $\lambda^2$ with an exponential bounded below. Consequently

$$
h(\lambda)=\lambda-\frac g3\Sigma(\lambda)
$$

increases from minus infinity to plus infinity. It has exactly one positive zero $\lambda_g$. Differentiating the absolutely convergent sum gives $h'(\lambda_g)>1$. At that zero,

$$
\partial_\lambda F(Q,\lambda_g)
=\lambda_g h'(\lambda_g)I>0.
$$

The scalar zero is simple; the determinant has multiplicity three because the same scalar multiplies each spatial component. This proves a positive linear mode for every $g>0$. It does not extend the separately proved nonlinear branch or its event certificate to every coupling.

## An open band of positive real growth roots

Fix $g>0$. Choose a sufficiently small real interval $[a,b]$ around $\lambda_g$, with $a>0$, and a small circle $\Gamma$ around the same root inside $\operatorname{Re}\lambda>0$. At $Q$, $F(Q,a)$ is negative definite and $F(Q,b)$ positive definite; $\partial_\lambda F$ is positive definite throughout the interval after shrinking it. Continuity preserves all three properties for real $k$ in an open neighborhood $\mathcal N$ of $Q$.

Each ordered eigenvalue of the real symmetric matrix $F(k,\lambda)$ is continuous in $\lambda$. The positive-definite derivative makes it strictly increase. Each therefore crosses zero once in $(a,b)$. This supplies three positive real roots counted with multiplicity, without assuming differentiable individual eigenvalue or eigenvector branches at the triple root.

The contour can be chosen to enclose precisely this cluster. At $Q$ its determinant has three zeros and no boundary zero. On the compact contour, sufficiently small changes of $k$ make $|\det F(k,\lambda)-\det F(Q,\lambda)|<|\det F(Q,\lambda)|$. Continuous deformation then preserves the number of enclosed zeros, counted with multiplicity. Shrinking $\mathcal N$ if needed identifies this cluster with the three real crossings above.

This is a positive-growth band, not a calculation of the entire spectrum or all wavevectors. It proves linear instability in classes admitting these modes, not nonlinear stability or instability in every history norm.

## Localized complete linear histories without selecting eigenvalue branches

Choose a nonzero smooth vector function $V(k)$ compactly supported inside $\mathcal N$ on the wavevector torus. Define

$$
\widehat u(k,T)=\frac1{2\pi i}\oint_\Gamma
e^{\lambda T}F(k,\lambda)^{-1}V(k)\,d\lambda,
\qquad
u_j(T)=\frac1{(2\pi)^3}\int e^{ik\cdot j}\widehat u(k,T)\,dk.
$$

The contour surrounds the roots and avoids them. It lets the construction use a matrix inverse smooth in $k$ on the contour instead of choosing individual eigenvectors across degeneracies. Choose the seed with $V(-k)=\overline{V(k)}$ in the torus neighborhood of $Q$; pairing conjugates makes $u_j$ real.

The history solves the linear equation for every finite $T$. Applying that equation under the contour multiplies the integrand by $F$; the remaining integral of $e^{\lambda T}V(k)$ is zero because it is analytic inside the contour. The delayed lattice sums can be interchanged with the integrals because $\operatorname{Re}\lambda$ stays positive. There is no finite onset, source kick or prescribed release join.

For each finite $T$, $\widehat u$ is smooth and compactly supported in $k$. Repeated integration by parts therefore gives spatial decay faster than every inverse power of $|j|$, for $u_j$ and each fixed number of time derivatives. On $T\le0$, the contour's strictly positive minimum real part gives exponentially small complete-past bounds in each such spatially weighted norm. These tails are rapidly decaying, not compact spatial support.

The histories genuinely grow in the linear equation. On the real roots in this neighborhood, positive definiteness of $\partial_\lambda F$ makes each inverse-matrix residue positive semidefinite. At a root with kernel basis $K$, its residue is

$$
R=K\left(K^{\mathsf T}\partial_\lambda F K\right)^{-1}K^{\mathsf T}.
$$

The sum of cluster residues is continuous in $k$ by its contour representation and equals $[\lambda_g h'(\lambda_g)]^{-1}I$ at $Q$. It remains uniformly positive definite on a sufficiently small compact seed support. Since every enclosed root lies above $a>0$, for $T\ge0$ the representation $\widehat u=\sum e^{\lambda_jT}R_jV$ implies $|\widehat u|\ge c e^{aT}|V|$ for some $c>0$. The spatial square-sum norm consequently grows at least exponentially. This remains a linear result: once displacement or speed ceases to be small, it cannot be extrapolated as the actual Master Equation trajectory.

## Remaining nonlinear burden and falsifiers

The localized follow-up now has complete ancient linear seeds and a positive spectral band. An exact nonlinear construction still needs a spatially weighted history space, a nonlinear remainder estimate, complete root control and an inverse or fixed-point argument that handles mode coupling. The coherent scalar construction's estimates do not automatically provide those results. No new assigned calculation or replacement of the active coupling-classification task is authorized by this note.

Falsifiers include a wrong source-position or transmitter-velocity derivative, failure of the exact staggered matrix control, a failure of the stated absolute convergence, or an error in the contour substitution or positive-residue argument. A localized nonlinear obstruction would defeat the proposed nonlinear route without refuting the linear theorem. Independent mathematical review should test these steps before the localized linear result is used as a verified nonlinear premise.
