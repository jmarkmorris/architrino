# Full Two-Body Darwin Match for the P7A Cargo Family

## Finding in plain language

The second anchor does not select a member of the P7A family. It rejects the
family as a complete point-to-point Darwin-order interaction law.

The arbitrary-geometry receiver-source bilinear sector is internally
informative: term-by-term matching fixes it uniquely to

$$
\boxed{(c,d,e,f)=(2,0,0,-3).}
$$

Those values independently reproduce P7A's two neutral-line combinations,

$$
c+\frac f3=1,
\qquad
e+\frac f3=-1.
$$

But the complete per-hit law also contains receiver-normal and delayed-source
rows that the neutral line hid. The source-static law has an unavoidable term
$-\mathbf N(\mathbf N\cdot\mathbf V)/c_f$, while the Darwin
benchmark has no term linear in receiver velocity when the source is static.
Independently, the source-linear and source-quadratic rows demand mutually
incompatible values of $(a,b)$. Therefore

$$
\boxed{\text{no }(a,b,c,d,e,f)\text{ matches the full benchmark}.}
$$

**Verdict: inconsistency.** Within the declared local, first-order cargo
ansatz, Path A is falsified as the complete standalone per-hit Darwin recovery
route. Under the P7A fork, the magnetism burden returns to Path B: bound
structure and/or Noether sea constitutive response. A later proposal could
reopen a per-hit route only by changing the ansatz or its receiver-normal base,
not by selecting another member of this family.

**Claim grade: derived conditional on the P7A ansatz, the positive-normal
simple-root chart, and the same constant-source-velocity scope as P1.** The
Path B routing is an **inferred program consequence** of that derived negative,
not a derivation of the Path B mechanism. No run or measured result enters this
packet.

## Scope, native variables, and measure convention

The native calculation comes first. The observer-level Darwin expression is
introduced only afterward as a recovery target.

Use the P1/P7A positive-normal simple-root chart

$$
g(T,S)=r-c_f(T-S)=0,
\qquad
D_s=c_f-\hat{\mathbf r}\cdot\mathbf U>0,
\qquad
D_T=c_f-\hat{\mathbf r}\cdot\mathbf V>0,
$$

with

$$
\mathbf r=\mathbf X_i(T)-\mathbf X_j(S),
\qquad
r=\|\mathbf r\|,
\qquad
\hat{\mathbf r}=\frac{\mathbf r}{r},
$$

$$
\mathbf U=\mathbf V_j(S),
\qquad
\mathbf V=\mathbf V_i(T).
$$

As in P1, the source velocity is constant over the retained delay interval.
"General moving source" here means arbitrary source-velocity direction and
arbitrary receiver-source geometry, not a source with nonzero acceleration.
An acceleration-dependent source row lies outside the P7A basis.
The uniform-source subcase is already sufficient to decide existence: if
"general" were enlarged to include nonzero source acceleration, the
observer-level field would contain additional acceleration-dependent rows
that this ansatz also cannot represent. That larger scope therefore cannot
restore a member rejected on the uniform-source subcase.

Define the same-time separation from the source's position at reception time,

$$
\mathbf R=\mathbf X_i(T)-\mathbf X_j(T),
\qquad
R=\|\mathbf R\|,
\qquad
\mathbf N=\frac{\mathbf R}{R},
$$

and the dimensionless velocities and scalar contractions

$$
\boldsymbol\beta=\frac{\mathbf U}{c_f},
\qquad
\boldsymbol\gamma=\frac{\mathbf V}{c_f},
\qquad
p=\mathbf N\cdot\boldsymbol\beta,
\qquad
h=\mathbf N\cdot\boldsymbol\gamma,
\qquad
z=\boldsymbol\beta\cdot\boldsymbol\gamma.
$$

The order symbol $O(\epsilon^3)$ counts either velocity ratio as
$O(\epsilon)$.

For one source identity, the sharp source-time delta collapse supplies the
P1/P7A factor $1/D_s$. There is no continuum source-label change of variable
for one identity, so no additional $D_s/c_f$ factor may be inserted in the
point-to-point law. The factor $D_s/c_f$ appears only later, when the same law
is summed over common-time labels on the infinite line. This distinction keeps
the root and measure conventions identical to P1 and P7A.

**Claim grade: derived for the chart, notation, and measure distinction;
declared scope for constant source velocity; source-backed inference for the
accelerated-source extension.** Falsifier: the P1/P7A
single-identity measure contains a common-slice label Jacobian before any
population sum, or the retained source segment is not uniform on the chart
used for the expansion.

## Native P7A expansion before comparison

The general P7A cargo numerator is

$$
\begin{aligned}
\mathbf N_{\mathrm{cargo}}
=&\ a\mathbf U
+b\hat{\mathbf r}(\mathbf U\cdot\hat{\mathbf r})\\
&+\frac{1}{c_f}\Big[
c\mathbf U(\mathbf V\cdot\hat{\mathbf r})
+d\mathbf V(\mathbf U\cdot\hat{\mathbf r})
+e\hat{\mathbf r}(\mathbf U\cdot\mathbf V)\\
&\hspace{4.8em}
+f\hat{\mathbf r}(\mathbf U\cdot\hat{\mathbf r})
(\mathbf V\cdot\hat{\mathbf r})
\Big],
\end{aligned}
$$

and its exact per-hit acceleration on this chart is

$$
\mathbf A_{i\leftarrow j}^{\mathrm{P7A}}
=\kappa Q_{ij}\frac{1}{r^2D_s}
\left[D_T\hat{\mathbf r}+\mathbf N_{\mathrm{cargo}}\right].
$$

P1 gives the delayed geometry

$$
\frac rR
=1+p+\frac12(\beta^2+p^2)+O(\epsilon^3),
$$

$$
\hat{\mathbf r}
=\mathbf N\left(1-p+\frac12(p^2-\beta^2)\right)
+\boldsymbol\beta+O(\epsilon^3),
$$

$$
\frac{D_s}{c_f}
=1-p+p^2-\beta^2+O(\epsilon^3).
$$

The prefactor needed by every cargo row is therefore

$$
\frac{R^2}{r^2}\frac{c_f}{D_s}
=1-p+O(\epsilon^3),
$$

and

$$
\boldsymbol\beta\cdot\hat{\mathbf r}
=p-p^2+\beta^2+O(\epsilon^3).
$$

The two direct-cargo basis vectors consequently expand as

$$
\frac{R^2}{r^2}\frac{c_f}{D_s}\,a\boldsymbol\beta
=a\boldsymbol\beta-ap\boldsymbol\beta+O(\epsilon^3),
$$

$$
\frac{R^2}{r^2}\frac{c_f}{D_s}\,
b\hat{\mathbf r}
(\boldsymbol\beta\cdot\hat{\mathbf r})
=b\left[
\mathbf N(p+\beta^2-3p^2)+p\boldsymbol\beta
\right]+O(\epsilon^3).
$$

The bilinear rows are already second order, so their direction vectors and
scalar products may be evaluated at zeroth order. Adding these cargo rows to
P1's canonical branch expansion gives the complete native result

$$
\boxed{
\begin{aligned}
\frac{R^2}{\kappa Q_{ij}}
\mathbf A_{i\leftarrow j}^{\mathrm{P7A}}
=&\ \mathbf N
\Big[
1+(b-2)p-h\\
&\quad
+\left(\frac32-3b\right)p^2
+\left(-\frac12+b\right)\beta^2
+(-1+e)z
+(3+f)ph
\Big]\\
&+(1+a)\boldsymbol\beta\\
&+(-1-a+b)p\boldsymbol\beta
+(-1+c)h\boldsymbol\beta
+d p\boldsymbol\gamma
+O(\epsilon^3).
\end{aligned}
}
$$

This is the native object that is compared below. In particular, the
$-h\mathbf N$ row is present even at $\boldsymbol\beta=\mathbf0$, because P7A
deliberately reduces to the canonical receiver-normal law when the source is
static.

**Claim grade: derived conditional on the exact P7A numerator.** Falsifier:
direct multiplication of the displayed delay, source-normal, inverse-square,
and cargo expansions changes any boxed basis coefficient through second
order.

## Observer-level Darwin recovery target

This section is comparison-only effective physics. It is not an
architrino-level premise.

The independent source for the form is *The Feynman Lectures on Physics*,
Volume II: [Chapter 26, equations 26.2--26.13](https://www.feynmanlectures.caltech.edu/II_26.html)
gives the exact electric field of a uniformly moving point charge relative to
its present position and $\mathbf B=\mathbf U\times\mathbf E/c^2$; [Chapter
1, equation 1.1](https://www.feynmanlectures.caltech.edu/II_01.html) gives the
receiver interaction $q_i(\mathbf E+\mathbf V\times\mathbf B)$. Independently,
Kunze and Spohn, ["Slow Motion of Charges Interacting Through the Maxwell
Field," *Communications in Mathematical Physics* 212 (2000),
437--467](https://doi.org/10.1007/s002200000219), establish the Darwin
Lagrangian as the slow-motion Maxwell approximation. These sources are
independent of the P1/P7A construction.

Replacing the observer comparison speed by P1's shared normalization $c_f$,
the exact uniform-source electric row relative to the source's present
position is

$$
\mathbf A_{E}
=\frac{\kappa Q_{ij}}{R^2}
\frac{1-\beta^2}
{(1-\beta^2+ p^2)^{3/2}}
\mathbf N.
$$

Expanding it and adding the receiver-velocity-linear magnetic row gives the
full Darwin interaction acceleration in the P1 normalization:

$$
\boxed{
\begin{aligned}
\frac{R^2}{\kappa Q_{ij}}\mathbf A_{\mathrm D}
=&\ \mathbf N
\left(1+\frac12\beta^2-\frac32p^2\right)
+\boldsymbol\gamma\times
(\boldsymbol\beta\times\mathbf N)
+O(\epsilon^3)\\
=&\ \mathbf N
\left(1+\frac12\beta^2-\frac32p^2-z\right)
+h\boldsymbol\beta
+O(\epsilon^3).
\end{aligned}
}
$$

"Interaction acceleration" here follows P1: $\kappa Q_{ij}/R^2$ is the
static acceleration normalization, and the benchmark compares the
electromagnetic interaction row. Converting an observer's relativistic
momentum equation to coordinate acceleration would add universal
receiver-inertia rows of order $\gamma^2$; those rows are outside the P7A
ansatz and are not part of P1's coefficient normalization. Including them
would add mismatches and cannot repair any mismatch found here.

The benchmark has no term linear in source velocity and no term linear in
receiver velocity alone. Its receiver-velocity dependence starts with the
bilinear tensor

$$
\boldsymbol\gamma\times
(\boldsymbol\beta\times\mathbf N)
=h\boldsymbol\beta-z\mathbf N.
$$

**Claim grade: derived from the cited independent exact field and receiver
interaction, then expanded through $O(\epsilon^2)$; observer-level recovery
target by import classification.** Falsifier: expanding the cited uniform-motion
field relative to the present source position produces a nonradial electric
row, a first-order velocity row, or coefficients other than $1/2$ and
$-3/2$.

## Term-by-term coefficient match

The same-time tensor basis is independent for arbitrary geometry and generic
$\boldsymbol\beta,\boldsymbol\gamma$. Matching its coefficients gives:

| Basis row | P7A coefficient | Darwin coefficient | Constraint | Result |
| --- | ---: | ---: | --- | --- |
| $\mathbf N$ | $1$ | $1$ | $1=1$ | match |
| $p\mathbf N$ | $b-2$ | $0$ | $b=2$ | direct first-order row |
| $\boldsymbol\beta$ | $1+a$ | $0$ | $a=-1$ | direct first-order row |
| $h\mathbf N$ | $-1$ | $0$ | $-1=0$ | **contradiction independent of cargo coefficients** |
| $p^2\mathbf N$ | $3/2-3b$ | $-3/2$ | $b=1$ | contradicts $b=2$ |
| $\beta^2\mathbf N$ | $-1/2+b$ | $1/2$ | $b=1$ | contradicts $b=2$ |
| $p\boldsymbol\beta$ | $-1-a+b$ | $0$ | $b=1+a$ | with $a=-1$, requires $b=0$ |
| $h\boldsymbol\beta$ | $-1+c$ | $1$ | $c=2$ | unique bilinear value |
| $p\boldsymbol\gamma$ | $d$ | $0$ | $d=0$ | unique bilinear value |
| $z\mathbf N$ | $-1+e$ | $-1$ | $e=0$ | unique bilinear value |
| $ph\mathbf N$ | $3+f$ | $0$ | $f=-3$ | unique bilinear value |

Thus the bilinear subsystem has the unique solution

$$
\boxed{c=2,\qquad d=0,\qquad e=0,\qquad f=-3.}
$$

The remaining equations have no solution. The receiver-only contradiction
$-1=0$ already proves inconsistency. Even if that row were removed by changing
the receiver-normal base, the direct source sector would still require

$$
(a,b)=(-1,2)
$$

at first order, while the source-quadratic radial rows require $b=1$ and the
source-quadratic transverse row requires $b=0$ after $a=-1$. No single
$(a,b)$ satisfies those requirements.

**Claim grade: derived.** Falsifier: the tensor basis becomes linearly
dependent for generic three-dimensional geometry, or an audited native or
benchmark coefficient changes so that all displayed equations admit one
common six-tuple.

## Independent verification of P7A's $f/3$ line coefficients

Return only now to P1's infinite line. Let

$$
\mathbf U=u\hat{\mathbf x},
\qquad
\hat{\mathbf r}
=\frac{-y\hat{\mathbf x}+\rho\hat{\mathbf y}}
{\sqrt{y^2+\rho^2}},
\qquad
r=\sqrt{y^2+\rho^2}.
$$

The exact common-time identity transport is

$$
\frac{d\xi}{dy}=\frac{D_s}{c_f},
$$

so it cancels the per-hit $1/D_s$ factor exactly, as in P1/P7A. For the four
bilinear basis rows, symmetric integration gives

$$
\int_{-\infty}^{\infty}
\frac{\mathbf U(\mathbf V\cdot\hat{\mathbf r})}{r^2}\,dy
=\frac{2u}{\rho}V_y\hat{\mathbf x},
$$

$$
\int_{-\infty}^{\infty}
\frac{\mathbf V(\mathbf U\cdot\hat{\mathbf r})}{r^2}\,dy
=\mathbf0,
$$

$$
\int_{-\infty}^{\infty}
\frac{\hat{\mathbf r}(\mathbf U\cdot\mathbf V)}{r^2}\,dy
=\frac{2u}{\rho}V_x\hat{\mathbf y},
$$

and

$$
\begin{aligned}
&\int_{-\infty}^{\infty}
\frac{\hat{\mathbf r}
(\mathbf U\cdot\hat{\mathbf r})
(\mathbf V\cdot\hat{\mathbf r})}{r^2}\,dy\\
&\qquad
=\frac{2u}{3\rho}
\left(V_y\hat{\mathbf x}+V_x\hat{\mathbf y}\right).
\end{aligned}
$$

The factor $1/3$ follows from

$$
\int_{-\infty}^{\infty}
\frac{y^2}{(y^2+\rho^2)^{5/2}}\,dy
=\frac{2}{3\rho^2}.
$$

Therefore the full line bilinear row is proportional to

$$
\frac{2u}{\rho}
\left[
\left(c+\frac f3\right)V_y\hat{\mathbf x}
+\left(e+\frac f3\right)V_x\hat{\mathbf y}
\right].
$$

Matching the Darwin line tensor
$V_y\hat{\mathbf x}-V_x\hat{\mathbf y}$ gives exactly

$$
\boxed{
c+\frac f3=1,
\qquad
e+\frac f3=-1.
}
$$

The pointwise solution passes this necessary projection:

$$
2+\frac{-3}{3}=1,
\qquad
0+\frac{-3}{3}=-1.
$$

The $d$ row vanishes because its integrand is odd. This explains why the line
could not see $d$. It also explains the earlier residual freedom in $f$: the
line observes only the two projected combinations, whereas arbitrary geometry
separates $h\boldsymbol\beta$, $z\mathbf N$, and $ph\mathbf N$.

For completeness, the receiver-independent direct line row is proportional to

$$
\left(a+\frac b2\right)u\hat{\mathbf x},
$$

so its absence gives $b=-2a$. The pointwise first-order conditions
$(a,b)=(-1,2)$ satisfy this line projection, confirming that the line hides the
direct-sector inconsistency rather than contradicting the pointwise first-order
calculation.

**Claim grade: derived independently of P7A's quoted line constraints.**
Falsifier: direct evaluation of the four displayed symmetric integrals changes
the $f$ projection from $1/3$, makes the $d$ row nonzero, or changes the direct
projection from $a+b/2$.

## Uniqueness and parameter-selection disposition

There is no surviving parameter family and therefore no surviving free
parameter that can be selected by another control. The second anchor has
produced a falsification, not a one-parameter residual family.

The second anchor nevertheless resolves the earlier P7A invisibilities as
follows:

| P7A freedom before this match | Arbitrary-geometry selector | Outcome |
| --- | --- | --- |
| $d$ | The $p\boldsymbol\gamma$ row, requiring nonzero $\mathbf U\cdot\mathbf N$ and a receiver velocity not absorbed into the other basis vectors | $d=0$ |
| $f$ | The $ph\mathbf N$ row, requiring both source and receiver radial projections nonzero | $f=-3$ |
| $c$ | The $h\boldsymbol\beta$ row after the canonical contribution is retained | $c=2$ |
| $e$ | The $z\mathbf N$ row after the canonical contribution is retained | $e=0$ |
| $a$ and $b$ | Source-moving, receiver-stationary pointwise rows; P7A's mirrored Control A sees their transverse projection | first order gives $(a,b)=(-1,2)$, but source-quadratic rows reject every such pair |

P7A's minimal family

$$
a=\alpha,
\quad b=-2\alpha,
\quad c=\lambda,
\quad d=f=0,
\quad e=-\lambda
$$

cannot contain the pointwise bilinear solution for any $(\alpha,\lambda)$,
because the full match requires $f=-3$ and simultaneously $(c,e)=(2,0)$.
In particular, the lean bilinear-only member $(\alpha,\lambda)=(0,1)$ retains
its derived receiver-side work orthogonality, but it fails this independent
point-to-point recovery anchor. Work orthogonality selects bookkeeping
economy; it does not select Darwin correctness.

If the full Darwin anchor were intentionally discarded and only the neutral
line retained, then $a$ would still require P7A's mirrored Control A, $d$ would
require an off-line two-body control, and $f$ would require a pointwise tensor
anchor. That counterfactual does not rescue the family here because the full
anchor has already returned incompatible equations.

**Claim grade: derived for the absence of surviving freedom and for the
minimal-family exclusion; inferred for the statement that further controls
would be meaningful only after a new ansatz is proposed.**

## Claim ledger and falsifiers

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| The boxed P7A point-to-point expansion is correct through Darwin order. | derived conditional on P7A | Re-expanding the exact retained-root law changes a displayed basis coefficient at $O(\epsilon^2)$ or lower. |
| The observer benchmark is the equal-time uniform-source Darwin interaction row shown above. | observer-level derived recovery target | The cited exact uniform-motion field and receiver interaction expand to another tensor under P1's static normalization. |
| The bilinear subsystem fixes $(c,d,e,f)=(2,0,0,-3)$. | derived | A generic-geometry coefficient match admits another bilinear tuple. |
| P7A's two $f/3$ line coefficients are correct. | derived | The displayed $y^2/(y^2+\rho^2)^{5/2}$ integral or its vector projection yields another factor or sign. |
| The full six-coefficient system is inconsistent. | derived | One six-tuple satisfies every row in the term-by-term table. |
| The minimal $(\alpha,\lambda)=(0,1)$ member fails the pointwise anchor despite its work orthogonality. | derived | Its coefficients equal the unique pointwise bilinear tuple and its remaining rows match the benchmark. |
| Path A is closed within this local first-order cargo ansatz. | inferred from the derived inconsistency | A member of the unchanged ansatz passes the full point-to-point benchmark. |
| Magnetism must now be pursued through Path B under the declared fork. | inferred program routing | An independently derived enlarged per-hit law reopens Path A and passes the same benchmark plus its native ledger obligations. |

## Promotion disposition

Disposition: **priority-only**. This packet is a chart-local analytic
falsification of the P7A coefficient family as a complete Darwin recovery law.
It does not alter canon, the Master EOM, or the EOM solver. No run was
performed. Promotion would require an independently derived replacement
mechanism and its conservation, global-chart, and recovery closure.
