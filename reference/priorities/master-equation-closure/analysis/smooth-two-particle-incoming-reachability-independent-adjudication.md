# Independent adjudication of unforced incoming-history reachability

**Disposition: independently accepted; claim grade: derived. Event reachability remains open.** The alternating cubic lattice admits an exact two-sublattice reduction in an exponentially decaying ancient-history class. Its linearization about the verified resting equilibrium has a unique positive real growth exponent. A weighted contraction constructs actual nonzero nonlinear ancient solutions approaching the resting lattice and yields instability in the stated uniform complete-history norm. No construction here reaches a transverse wake-speed event, and no localized or generic preparation conclusion follows.

Sections 1–4 were captured before reading the concurrent incoming-reachability subjects. Section 5 independently reconstructs the subsequently proposed real weighted contraction, including its root and Jacobian estimates, before reading its full subject. The coupling is $g=16$, wake speed $c_f=1$, unit-spaced anchors are $i\in\mathbb Z^3$, and polarities are $\sigma_i=(-1)^{i_1+i_2+i_3}$. The [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), original stationary block prescription and all previously accepted histories remain unchanged. The old supplied pulse is not replaced by the ansatz below; these are different complete-history questions.

## 1. What an unforced preparation must supply

The [preparation assessment](smooth-two-particle-preparation-independent-adjudication.md) already excludes the exact supplied compact pulse as a past solution of the unforced equation. An alternative needs the equation on every incoming reception, with each root evaluated on that same alternative complete past. A finite endpoint state does not supply those data, and solving a delayed equation backward from that state is not an existence argument.

Two distinct incoming conditions must also remain separate. A history that equals the exact resting lattice for all times before a finite onset cannot depart within a class where the stationary solution has the accepted local uniqueness property. An ancient history may instead approach rest as $t\to-\infty$ while being nonzero at every finite time. The second condition has no finite zero-data onset and is not excluded by that uniqueness argument. It is a viable theorem target, not an already constructed preparation.

## 2. An exact all-label staggered reduction

Consider the vector ansatz

$$
X_i(t)=i+\sigma_i q(t),\qquad t\le T.
\tag{1}
$$

Assume initially only that $q$ is a proposed smooth path satisfying

$$
|q(t)|\le B<\frac12,\qquad |q'(t)|\le w<1,
\qquad |q(t)|+|q'(t)|\le C e^{\beta t}
\quad(t\le T),\quad \beta>0.
\tag{2}
$$

An irrelevant shift of the time origin can be absorbed into $C$. These are conditions on a candidate path, not a conclusion that the path solves the equation. They imply a uniform distinct-label range floor $1-2B$ and exclude all positive-delay self roots by the complete-history subunit chord inequality.

For a positive receiver, put $d=i-j\ne0$, $r_d=|d|$, $\chi_d=(-1)^{d_1+d_2+d_3}$. Its unique emission $s_d(t)<t$ solves

$$
t-s_d=|d+q(t)-\chi_d q(s_d)|.
\tag{3}
$$

The source-variable residual is $F_t(s)=|d+q(t)-\chi_dq(s)|-(t-s)$. It is strictly increasing since its derivative is at least $1-w$; it has opposite signs at the two ends of the causal domain. Thus (3) includes the complete cross-root set. On this root set let $R_d=d+q(t)-\chi_d q(s_d)$, $n_d=R_d/|R_d|$ and

$$
K(R,v)=\frac{R}{|R|^3(1-\widehat R\cdot v)}.
$$

The exact reduced acceleration functional is

$$
\mathcal F[q](t)=g\left\{S_0(q(t))+
\sum_{d\ne0}\chi_d\left[
K(R_d,\chi_d q'(s_d))-
\frac{d+q(t)}{|d+q(t)|^3}\right]\right\}.
\tag{4}
$$

Here $S_0$ is the accepted stationary lattice field, with the receiver's own anchor omitted and the original block summation. Its regularity and $S_0(0)=DS_0(0)=0$ are recorded in the [stationary-field assessment](smooth-two-particle-through-five-independent-adjudication.md#1-a-sharper-bound-for-the-unchanged-infinite-stationary-field). Equation (4) retains that field instead of assigning an order to an ungrouped stationary sum.

Even-parity translations leave the ansatz and its equation invariant. For a negative receiver, replacing $d$ by $-d$ reverses $R_d$, the source velocity and the resulting acceleration, while leaving $\chi_d$ and the transmitter denominator unchanged. The stationary field has the same odd symmetry. Consequently the full population equations on (1) are exactly equivalent to

$$
q''=\mathcal F[q].
\tag{5}
$$

This is a conditional equivalence of equations on a symmetry class. It is not an existence theorem for (5).

### 2.1. The infinitely many changing sources are controlled

Equation (3) gives $s_d\le t-r_d+2B$. The two terms in a changed row obey the elementary displacement and source-velocity estimate

$$
\left|K(R_d,\chi_d q'(s_d))-
\frac{d+q(t)}{|d+q(t)|^3}\right|
\le\frac{2|q(s_d)|}{(r_d-2B)^3}
+\frac{|q'(s_d)|}{(r_d-2B)^2(1-w)}.
\tag{6}
$$

The first term follows from the norm bound $2/|R|^3$ for the derivative of $R/|R|^3$, along the full displacement segment; the second follows from the difference between $1/(1-n\cdot v)$ and one. Substitution of (2) bounds (6) by

$$
C e^{\beta t+2\beta B}e^{-\beta r_d}
\left[\frac{2}{(r_d-2B)^3}
+\frac{1}{(r_d-2B)^2(1-w)}\right].
\tag{7}
$$

There are $24k^2+2$ lattice labels on the cube shell $\|d\|_\infty=k$. Since $r_d\ge k$, (7) is summable. The changing-source correction in (4) therefore converges absolutely and uniformly for $t\le T$. Reindexing that correction under inversion or cubic symmetry is justified. The conditional stationary field keeps its separately accepted prescription.

All labels generally move under (1), so a finite disturbed-source census from the old pulse experiment cannot be imported. Exponential decay at earlier emissions is the reason the new infinite correction is admissible. A common translation of all labels is also a different ansatz; it does not share the polarity cancellation derived next.

## 3. Independent linearization at the actual equilibrium

Write $q=\varepsilon h$ and differentiate at $\varepsilon=0$. At zero displacement, the emission is $t-r_d$. Put $u_d=d/r_d$ and

$$
H_d=\frac{I-3u_du_d^{\mathsf T}}{r_d^3}.
$$

The first variation of a general cross row is

$$
H_d\big[y_i(t)-y_j(t-r_d)\big]
+\frac{u_du_d^{\mathsf T}}{r_d^2}y_j'(t-r_d).
\tag{8}
$$

The displacement term differentiates the geometric inverse-square row; the velocity term differentiates the positive transmitter denominator. A first-order emission shift multiplies an already first-order source perturbation and contributes no further first-order term at a stationary background. For exponentially decaying smooth $h$, the derivative of the changed-source sum is absolutely convergent by the same exponential shell estimate; the receiver term is the accepted $DS_0(0)=0$.

Substitute $y_i=\sigma_i h$ and $y_j=\sigma_i\chi_d h$, multiply by the row polarity $\chi_d$, and divide by $\sigma_i$. The source displacement and source velocity lose their parity factor. Cubic symmetry on each finite Euclidean shell gives

$$
\sum_{|d|=r}u_du_d^{\mathsf T}=\frac{N_r}{3}I,
\qquad \sum_{|d|=r}H_d=0.
$$

The source displacement term vanishes shellwise. The complete linearized equation becomes

$$
h''(t)=\frac g3\sum_{d\ne0}\frac{h'(t-r_d)}{r_d^2}.
\tag{9}
$$

The signs in (9) are positive. This is not a linearization about the imposed pulse or another nonequilibrium state. The resting infinite alternating lattice is the accepted equilibrium, and (9) is derived from its full transmitter-weighted equation.

For comparison, a common translation $y_i=h$ would retain $\chi_d$ in the source-velocity sum. Confusing those two displacement patterns would change the characteristic equation. Neither pattern permits a claim that an arbitrary prescribed translation is already an unforced solution.

## 4. A unique real exponential growth rate

For $h(t)=a e^{\lambda t}$ with $a\ne0$ and $\lambda>0$, define

$$
S(\lambda)=\sum_{d\ne0}\frac{e^{-\lambda r_d}}{r_d^2},
\qquad
d(z)=z^2-\frac{gz}{3}S(z)\quad(z>0).
$$

The eigenvalue equation is

$$
\lambda=\frac g3 S(\lambda).
\tag{10}
$$

The sum is finite for each positive argument, continuous and strictly decreasing, and tends to zero at infinity. Its positive nearest-neighbor terms alone make $\lambda-(g/3)S(\lambda)$ negative for sufficiently small positive $\lambda$. That function is strictly increasing, so (10) has exactly one positive real solution. This establishes a three-component growing exponential mode. No claim is made about the entire complex spectrum or the dimension of a nonlinear unstable manifold.

At $g=16$, elementary bounds already give $2<\lambda<3$. The lower endpoint follows from $32e^{-2}>2$. For the upper endpoint, retain the first cube shell exactly and bound the rest using $r_d\ge k$:

$$
S(3)\le6e^{-3}+6e^{-3\sqrt2}+\frac83e^{-3\sqrt3}
+26\frac{e^{-6}}{1-e^{-3}}.
$$

Using $\sqrt2>7/5$, $\sqrt3>5/3$, $e^3>20$, $e^{21/5}>64$, $e^5>128$ gives

$$
S(3)<\frac3{10}+\frac3{32}+\frac1{48}+\frac{13}{190}
<\frac9{16},
$$

so $(16/3)S(3)<3$. These are deliberately coarse analytic bounds, not a numerical eigenvalue estimate.

### 4.1. A useful nonresonance estimate for an ancient-series construction

For every integer $k\ge2$, monotonicity of $S$ and (10) imply

$$
d(k\lambda)
=k^2\lambda^2-\frac{gk\lambda}{3}S(k\lambda)
\ge k(k-1)\lambda^2>0.
\tag{11}
$$

Thus higher integer harmonics do not encounter another positive-real characteristic root. The exact reduction is odd: $\mathcal F[-q]=-\mathcal F[q]$ by inversion. These facts support a proposed power-series construction beginning with $q(t)=a e^{\lambda t}$ and solving higher harmonics. They do not prove that the nonlinear functional is analytic in the required infinite-history norm or that the resulting formal series converges. In particular, arbitrary formal coefficients and ordinary backward integration do not fill that gap.

## 5. Independent reconstruction of nonlinear ancient existence

For $\gamma>0$ define the complete normed space of real vector paths on $(-\infty,0]$ by

$$
\|q\|_{X_\gamma}
=\max_{0\le k\le2}\sup_{t\le0}
\frac{e^{-\gamma t}|q^{(k)}(t)|}{\gamma^k}.
$$

Completeness follows from uniform convergence of a Cauchy sequence and its first two derivatives on each compact interval, preserving the derivative relations and the weighted bounds. Let $Y_\gamma$ be the continuous paths with norm $\sup_{t\le0}e^{-\gamma t}|f(t)|$. Put $\beta=2\lambda$, where $\lambda$ is the positive root of (10), and write $Lq$ for the right side of (9).

### 5.1. The nonlinear remainder has no derivative loss

For a sufficiently small fixed ball in $X_\lambda$, the range and transmitter margins in §2 hold uniformly. Let $N(q)=\mathcal F[q]-Lq$. The needed estimates are

$$
\|N(q)\|_{Y_\beta}\le C\|q\|_{X_\lambda}^2,
$$

$$
\|N(q_1)-N(q_2)\|_{Y_\beta}
\le C_1\rho\|q_1-q_2\|_{X_\beta},
\qquad \|q_j\|_{X_\lambda}\le\rho,
\quad q_1-q_2\in X_\beta.
\tag{12}
$$

Here $C,C_1$ depend on the fixed exponents and a fixed small domain, not on the chosen paths or amplitude. The following direct row calculation supplies these estimates without requiring a third derivative of the input path.

Fix a smooth source path and let $J$ denote the full receiver-position derivative of its received row, including the source-emission change. At its root set $r=|R|$, $n=R/r$, $P=I-nn^{\mathsf T}$, $D=1-n\cdot v$, and source acceleration $a$. Direct implicit differentiation gives

$$
J=\frac{P}{r^3D}
+\frac{Pv n^{\mathsf T}+n v^{\mathsf T}P-2nn^{\mathsf T}}{r^3D^2}
+\frac{|Pv|^2nn^{\mathsf T}}{r^3D^3}
-\frac{(n\cdot a)nn^{\mathsf T}}{r^2D^3}.
\tag{13}
$$

For example, the root changes by $ds=-n\cdot dx/D$, so $dR=(I+vn^{\mathsf T}/D)dx$ and $dr=n\cdot dx/D$; differentiating $n/(r^2D)$ then yields (13). This is a direct derivative of the canonical row, not a replacement kernel. Let $H(R_0)=D[R_0/|R_0|^3]$, $R_0=d+q(t)$, and $B_v=nn^{\mathsf T}/(r^2D^2)$. Varying the full history by $h$ differentiates a changed row as

$$
[J-H(R_0)]h(t)-\chi_dJ h(s_d)+\chi_dB_vh'(s_d).
\tag{14}
$$

In particular, (13) implies the factor-preserving estimate

$$
|J-H(R_0)|
\le C_2\left(
\frac{|q(s_d)|}{r_d^4}
+\frac{|q'(s_d)|}{r_d^3}
+\frac{|q''(s_d)|}{r_d^2}\right).
\tag{15}
$$

The denominators in (15) may be replaced by $r_d$ at a fixed constant cost because $r_d\ge1$ and the ball is uniformly small. Crucially, the undelayed perturbation $h(t)$ in (14) is multiplied by a factor sampled in the exponentially small earlier source history. Bounding $J$ and $H$ separately would lose that factor and would not establish the desired all-label estimate.

Subtract the zero-history version of (14). The differences of $J$ and $B_v$ contain either $q(t)$ or exponentially delayed source position, velocity or acceleration. The other differences are $h(s_d)-h(t-r_d)$ and $h'(s_d)-h'(t-r_d)$; the mean value bound uses only $h'$ and $h''$. The root shift is bounded by $C_3\rho e^{\lambda t}$. Using $s_d\le t-r_d+2B$ and (15), the resulting per-row bound is at most

$$
C_4\rho\|h\|_{X_\gamma}
e^{(\lambda+\gamma)t}
\frac{e^{-\lambda r_d}+e^{-\gamma r_d}}{r_d^2},
\qquad \gamma\in\{\lambda,\beta\}.
\tag{16}
$$

The stationary receiver term satisfies $|DS_0(q(t))h(t)|\le C_5\rho^2\|h\|_{X_\gamma}e^{(2\lambda+\gamma)t}$ by the accepted stationary bound. Summing (16) is justified by exponential shell convergence. Differentiate pointwise along the interpolation $q_\theta=q_2+\theta(q_1-q_2)$ and integrate over $0\le\theta\le1$. This gives the second estimate in (12). Interpolating from zero with $\gamma=\lambda$ gives the first. No uniform Fréchet continuity of an arbitrary weighted $q''$ is assumed; the pointwise derivative and its uniform summable bound suffice.

### 5.2. Contracting the remainder of one growing mode

Define

$$
(Tf)(t)=\frac g3\sum_{d\ne0}\frac1{r_d^2}
\int_{-\infty}^{t-r_d}f(u)\,du,
\qquad
(If)(t)=\int_{-\infty}^t(t-u)f(u)\,du.
$$

Termwise integration and differentiation are permitted by the exponential bounds. Thus $(Tf)''=Lf$, $\|I\|_{Y_\beta\to X_\beta}\le\beta^{-2}$, and

$$
\|T\|_{X_\beta\to X_\beta}
\le\theta:=\frac{gS(\beta)}{3\beta}<\frac12.
\tag{17}
$$

For a small nonzero vector $a$, put $q(t)=a e^{\lambda t}+w(t)$ and solve

$$
w=Tw+I N(ae^{\lambda t}+w).
\tag{18}
$$

The leading mode satisfies $T(ae^{\lambda t})=ae^{\lambda t}$. Although that mode lies in $X_\lambda$ rather than $X_\beta$, the remainder lies in $X_\beta$. The embedding estimate $\|w\|_{X_\lambda}\le4\|w\|_{X_\beta}$ is explicit.

Choose the ball radius $R=8C|a|^2/\beta^2$, taking $a$ small enough that $4R\le|a|$ and $2|a|$ remains in the fixed domain of (12). Its image under (18) has norm at most

$$
\theta R+\beta^{-2}C(2|a|)^2\le R.
$$

Shrinking $a$ further makes its Lipschitz constant $\theta+2C_1|a|/\beta^2<1$. The contraction theorem gives a unique fixed point in this ball and hence

$$
q(t)=ae^{\lambda t}+O(|a|^2e^{2\lambda t})
\quad\text{in the weighted }C^2\text{ norm}.
\tag{19}
$$

Differentiating (18) twice proves the exact nonlinear equation (5). The solution is nonzero because its first exponential coefficient is $a$. The root formulas and the convergent sum make $\mathcal F[q]$ continuously differentiable in time when $q\in C^2$: only source acceleration and receiver velocity enter the time derivative. Therefore $q\in C^3$. The entire solution can be kept within any fixed sufficiently small displacement, speed, acceleration and jerk neighborhood by choosing $a$ small. Every negative reception satisfies the unchanged equation; there is no imposed finite onset.

This construction proves existence for an infinite coherent two-sublattice history. It does not invoke an unstable-manifold theorem for an unspecified infinite-delay state space, assume analyticity of a formal series, or replace the actual past by an exponentially shaped profile.

### 5.3. Independent conservative constants

The local argument can be made explicit without evaluating the growth exponent numerically. Take $\rho\le1/64$, $2<\lambda<3$ and $\lambda\le\gamma\le\beta=2\lambda<6$. Then $r\ge31r_d/32$, $D\ge61/64$, and the source-time shift is at most $2\rho e^{\lambda t}$. Consequently $e^{\gamma|s_d-(t-r_d)|}\le e^{3/16}<2$. Formula (13), together with the derivative bound $24/|R|^4$ for $H(R)$, gives

$$
|J-H(R_0)|
\le\frac{28|q(s_d)|}{r_d^4}
+\frac{10|q'(s_d)|}{r_d^3}
+\frac{2|q''(s_d)|}{r_d^2}.
\tag{21}
$$

For the velocity-response tensor, differentiating $RR^{\mathsf T}/|R|^4$ gives the bound $6/|R|^3$. With $B_{v,0}=u_du_d^{\mathsf T}/r_d^2$, this yields

$$
|B_v-B_{v,0}|
\le\frac{7(|q(t)|+|q(s_d)|)}{r_d^3}
+\frac{4|q'(s_d)|}{r_d^2}.
\tag{22}
$$

The five differences in (14) are the coefficient on $h(t)$, the changed $J$ on $h(s_d)$, the shifted value of $h$, the changed $B_v$ on $h'(s_d)$, and the shifted value of $h'$. After factoring $\rho\|h\|_{X_\gamma}e^{(\lambda+\gamma)t}/r_d^2$, their respective bounds are

$$
\begin{aligned}
&152e^{-\lambda r_d},\\
&56e^{-\gamma r_d}+304e^{-(\lambda+\gamma)r_d},\\
&48e^{-\gamma r_d},\\
&84e^{-\gamma r_d}+456e^{-(\lambda+\gamma)r_d},\\
&144e^{-\gamma r_d}.
\end{aligned}
$$

Their sum is at most $1244e^{-\lambda r_d}$. Multiplication by $gS(\lambda)=3\lambda<9$ gives a full changing-source derivative constant below $11196$. The accepted stationary derivative bound gives $\|DS_0(q)\|\le100|q|^2$ on this smaller ball, so its acceleration derivative adds at most $1600\rho^2\le25\rho$. Thus the common conservative choice

$$
C=C_1=300000
\tag{23}
$$

in (12) exceeds the independently derived bound $11221$. This includes both $\gamma=\lambda$, needed for the quadratic estimate, and $\gamma=\beta$, needed for contraction. The large allowance is not a fitted coefficient.

In particular, one may replace the qualitative ball above by

$$
\|w\|_{X_\beta}\le K|a|^2,\qquad
K=150000,\qquad
0<|a|\le\frac1{2000000}.
\tag{24}
$$

Indeed, $\|q\|_{X_\lambda}\le|a|+4K|a|^2\le2|a|<1/64$, and $\beta^2>16$. Its image norm is strictly below $[K/2+4C/16]|a|^2=K|a|^2$. Its Lipschitz constant is below $1/2+2C_1|a|/16\le0.51875<1$. The endpoint lower bounds

$$
|q(0)|\ge|a|-K|a|^2,\qquad
\widehat a\cdot q'(0)\ge\lambda|a|-\beta K|a|^2,
\qquad
\widehat a\cdot q''(0)\ge\lambda^2|a|-\beta^2K|a|^2
$$

are positive throughout (24). They describe a tiny actual incoming branch, far below unit speed. They are not a wake-speed event certificate.

## 6. Scoped nonlinear instability and the remaining event question

Use the uniform complete-past norm

$$
\|Y\|_{\rm hist}
=\sup_{s\le0,\ i\in\mathbb Z^3}
\bigl(|y_i(s)|+|y_i'(s)|\bigr).
\tag{20}
$$

Fix one sufficiently small branch from §5. Its endpoint has $|q(0)|\ge|a|-R>0$. For $T>0$, the time-translated history $q_T(t)=q(t-T)$ is an exact solution through $t=T$, by autonomy. Its complete incoming norm at time zero tends to zero like $e^{-\lambda T}$, whereas $|q_T(T)|=|q(0)|$ is fixed. The full intermediate path stays within the same small regular domain. Thus the resting lattice is nonlinearly unstable in (20) among these admissible coherent two-sublattice histories. This precise norm and admissible class are part of the conclusion. It proves neither generic instability nor instability under spatially localized disturbances.

A complete incoming event example still requires continuing one of these same nonlinear histories to a first global speed-one event and proving positive incoming radial acceleration there, while excluding prior causal-root, range or summation obstructions. That is not supplied by the local contraction. The construction can deliberately be kept uniformly subunit throughout its entire proved interval.

The earlier fixed-pulse event certificate cannot be transferred to this ansatz: every source past differs, the number of moving identities differs and the alternating target displacement differs from the original equal target pulse. Its strong outgoing-obstruction theorem would apply to a newly reached event only after the incoming hypotheses were separately proved. The present linear mode is also spatially periodic rather than a localized finite disturbance, so it is not a theorem about arbitrary small localized preparation histories.

## 7. Independent review boundary and falsifiers

The independent mathematical references are the exact polarity/inversion reduction, estimate (6), exponential shell convergence, direct transmitter-weighted row differentiation, finite-shell tensor symmetry and the independent weighted-contraction reconstruction in §5. They were captured before reading the concurrent subject. A failed polarity sign, an omitted transmitter-velocity term or a nonzero shell sum of $H_d$ would falsify (9). A failure of (7) under its declared history bounds would defeat the new infinite-source reduction. A failure of the summable estimate (16), the integration bounds (17) or the contraction ball would defeat nonlinear ancient existence. A growing linear mode alone would not repair those gaps. Transverse event reach remains unproved rather than an accepted consequence of the local branch.

### Final subject and domain assessment

The full [construction subject](smooth-two-particle-incoming-reachability.md), SHA-256 `6ab6b3227df6229fd3561585b8c9ecc6373984bbd1eebba56e6cc00a5ac71c7c`, and [domain audit](smooth-two-particle-incoming-reachability-domain.md), SHA-256 `9b4cfd222d5a42c064d7b5cf668f34d696a6e546c032a304bfc010e6121db10d`, are accepted at their stated scopes. Their $q-d$ convention is the $d\mapsto-d$ version of the $d+q$ convention here and gives the same functional after legitimate inversion of the absolute correction. The subject's looser bracket $2<\lambda<4$ is sufficient; this independent derivation additionally proves $\lambda<3$.

| Claim | Independent disposition |
| --- | --- |
| Exact staggered reduction and all-label summation with the original stationary blocks | Accepted |
| Unique positive real linear exponent and higher integer-harmonic nonresonance | Accepted; no entire complex-spectrum claim |
| Weighted $C^2$ nonlinear remainder, explicit constants and contraction | Accepted |
| Actual nonzero ancient solutions of the unchanged equation | Accepted for the stated coherent family |
| $C^3$ bootstrap and inherited small-history root, range, density and jet ceilings | Accepted |
| Nonlinear instability in the stated uniform complete-history norm | Accepted for a class admitting these infinite coherent histories |
| Localized or generic instability, typical preparation, or eventual damping | Not established |
| Wake-speed arrival or its exclusion for the new branch | Open |
| Conditional outgoing-obstruction transfer if this branch reaches a transverse first event | Accepted with the domain audit's exponential-tail and uniform-position hypotheses |

The subject's explicit jerk bound also checks independently. Using its wider $\lambda<4$ domain, the changed-row contribution has coefficient below $16\cdot768\cdot(2S(\lambda))<18432$, while its stationary contribution has coefficient at most $16\cdot12\cdot1500/64^2=70.3125$. Their sum is $296037/16<20000$. At the stated amplitude this gives jerk below $0.02$, together with the displayed displacement, speed and acceleration ceilings. The tiny complete-history speed also gives the claimed $1/256$ root tubes and complement gaps directly. There is no appeal to the old finite-disturbance continuation theorem.

The optional analytic-functional argument in the domain audit is separately accepted on its explicit small complex Banach ball. The bilinear complex squared range and its analytic square-root branch are controlled there; no complex receiver ball of radius one is asserted. This supports an alternative analytic approach, but the accepted real $C^2$ construction does not depend on it or on a smooth-to-analytic inference.

The pre-subject reconstruction, including the independent weighted proof and explicit constants, was frozen before the construction subject was read. Its SHA-256 is `b1393a471d27e766ea1d9ccf2fad9069284892e4cbfe5ba2b33a7f69be3b9d02`. The new exact Fraction instrument `reference.py` passed its known elementary exponential controls and the known 26-neighbor census before target evaluation. It then verified the elementary growth bracket, rational Jacobian constants, contraction and jerk bounds, and finite-shell tensor identities for 4,912 labels. The finite shell control corroborates the algebra; the general tensor identity and infinite summability follow from the written symmetry and tail proofs.

Input hashes, the frozen pre-subject reconstruction, the final subject/domain/adjudication snapshots, exact controls and presentation receipts are retained under `.local-data/master-equation-closure/incoming-reachability/independent/`. Five previously recorded scientific input hashes were rechecked with `shasum -a 256 -c` and all matched. The reused math-aware presentation checker passed its known positive and negative cases before checking this document; that check covers KaTeX, delimiters, relative linked-file existence and whitespace, not mathematical validity. No prior equation, history, reference or shared tracker was edited, and no physical simulation or Git publication was performed.
