# Exact signed source-history defect relative to the current affine row

**Independent analytical reference, 2026-10-06.** Ramon E. Moore lens. Derived in response to the subject author's case-only question, before reading its proposed signed-source companion. Keep the canonical opposite-pair law, $c_f=1$, actual completed histories and both independent partner clocks. The construction below interpolates inputs to the acceleration functional only; it neither replaces the physical past nor declares an affine path to be a coupled solution.

## One receiver and its exact root derivative

Fix a reception time $t$, receiver $i$ and source $j$. Put $z=X_i(t)-X_j(t)=dN_i$ and $v_0=V_j(t)$. For positive delay $r$ define the actual source integrals

$$
B(r)=\int_0^r A_j(t-s)\,ds,
\qquad H(r)=\int_0^r(r-s)A_j(t-s)\,ds.
\tag{1}
$$

The actual source is $X_j(t-r)=X_j(t)-rv_0+H(r)$. Interpolate it with its current affine continuation by replacing $H$ with $\lambda H$, $0\le\lambda\le1$, keeping the receiver position fixed. At the unique ordinary root $R=R_\lambda$,

$$
S=z+Rv_0-\lambda H(R)=Rn,
\quad V=v_0-\lambda B(R),
\quad D=1-n\cdot V>0.
\tag{2}
$$

Complete strict-speed source history and the strict current speed preserve a complete strict bound under this convex velocity interpolation. Hence the complete partner gap is monotone and has exactly one root for every $\lambda$. On a generated speed tube $\beta<1$ with $t>d/(1-\beta)$, the gap at that generated upper delay gives $d/(1+\beta)\le R\le d/(1-\beta)$; remote speed is not relabeled as $\beta$.

Let $\rho=\partial_\lambda R$ and $\Pi_n=I-nn^{\mathsf T}$. Differentiation gives

$$
\rho=-\frac{n\cdot H(R)}D,
\qquad n_\lambda=\frac{\Pi_n[-H(R)+V\rho]}R,
\tag{3}
$$

$$
V_\lambda=-B(R)-\lambda A_j(t-R)\rho,
\qquad
D_\lambda=-n_\lambda\cdot V+n\cdot B(R)
+\lambda n\cdot A_j(t-R)\rho.
\tag{4}
$$

The sampled acceleration and moving root in (4) are essential. No root time or transmitter factor is frozen in the interpolation.

The canonical per-hit contribution is $F_i(\lambda)=-Kn/(R^2D)$. Therefore its exact current-separation radial defect is

$$
N_i\cdot[F_i(1)-F_i(0)]
=-K\int_0^1\frac1{R^2D}
\left\{N_i\cdot n_\lambda
-(N_i\cdot n)\left(\frac{2\rho}R+\frac{D_\lambda}D\right)\right\}\,d\lambda.
\tag{5}
$$

For the pair, take $N_+=N$ and $N_-=-N$ and sum (5). The sum is precisely the radial projection of the actual-minus-current-affine relative acceleration. Its two integrals have different roots, source functions and factors. This expression retains the full source segment, including all its signed vector components.

Locally Lipschitz source velocity suffices for the integral formula (1), local absolute continuity in $\lambda$, and the almost-everywhere chain rules in (3)–(5). At a seam the sampled acceleration is used where that chain rule exists; integration supplies the same identity. There is no supplied jerk assumption. These are partner-functional comparisons; the actual complete self-root census remains the original strict-speed exclusion.

## A sign-changing integral control

The simplest analytical control shows why a bound on acceleration magnitude is insufficient for the sign of (5). At $v_0=0$ and $\lambda=0$, let the source acceleration on the sampled interval be parallel to $N_i$, with scalar profile $a(s)=N_i\cdot A_j(t-s)$. Then $R=d$, $n=N_i$, $n_\lambda=0$, and

$$
N_i\cdot F_i'(0)
=\frac K{d^2}\left(B_N(d)-\frac{2H_N(d)}d\right)
=\frac K{d^2}\int_0^d\left(\frac{2s}d-1\right)a(s)\,ds.
\tag{6}
$$

A constant acceleration profile gives exactly zero first variation. The affine profile $a(s)=a_0+b s$ gives exactly $Kb/6$. Both signs are possible even with $a(s)>0$ throughout the interval, by taking either sign of a sufficiently small $b$ relative to $a_0/d$. This is a polynomial identity control on the source functional, not a newly selected physical preparation or an assertion that such profiles solve the coupled equation. It tests precisely the information content of acceleration bounds and positivity, not actual nominal attainability.

Thus a magnitude bound supplies an absolute error estimate for (5), but not its sign. Current conditions $u\ge0$ and $J<0$ at first attainment constrain simultaneous positions and velocities; they do not determine the signed profile in (6), much less the full vector integrals (5). To exploit (5) for the actual nominal branch, a new preparation-specific signed history estimate must control those integrals or their time accumulation. The exact functional is now explicit; its needed sign remains an actual mathematical obligation.

## Claim boundary and falsifiers

Equations (1)–(6) are derived identities, independently controlled by constant and affine scalar acceleration profiles. They do not prove that the physical radial defect has either sign, that a first negative-account attainment escapes, or that a point-state enclosure has an actual counterexample. A missing source-acceleration transport term, a failure of complete root monotonicity, or an actual signed-history theorem supplying the missing sign would falsify the corresponding formula or claimed information gap. No numerical target, new source, scientific process or frozen-file mutation was used.
