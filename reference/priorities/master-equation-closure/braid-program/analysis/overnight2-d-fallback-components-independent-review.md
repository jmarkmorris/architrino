# Independent review of local root enclosures and constant matrix weights

## Disposition and scope

**Derived disposition:** the [local causal-root enclosure](overnight2-d-local-causal-root-enclosure.md) and [constant matrix-weight comparison](overnight2-d-matrix-weight-comparison.md) are valid conditional components. Inspection and independent analytical controls found no implementation defect in [the matrix-weight helper](overnight2-d-matrix-weight.py) within its declared finite real symmetric positive-definite, three-dimensional input contract. The local root-displacement conclusion has a direct proof for globally Lipschitz sources, supplied below, which avoids reading “piecewise integration” as an additional unstated regularity assumption.

This review establishes neither a target application nor an improvement of the existing physical error bounds. It confers no additional actual-history interval, ceiling continuation, or tail conclusion. The current scalar-weight admission and its independently reviewed receipts retain their existing scope. No scientific target or receipt was inspected or replayed for this assignment.

The Ramon E. Moore role and Specialist charter supplied the review lens; the derivations and independently known controls supply the evidence. The three subjects remained read-only. Parent integration belongs to the [existing research account](overnight2-d-followup-and-research-2026-10-07.md).

## Complete root selection with a local strict factor

Fix reception time $t$ and define $F_x(r)=r-|x-q(t-r)|$ for delays $r\ge0$. Here $q$ is a complete continuous source, globally 1-Lipschitz on its past, and bounded on the sufficiently distant negative past. Units are $c_f=1$. For $r_2>r_1$, the reverse triangle inequality gives

$$
0\le F_x(r_2)-F_x(r_1)\le2(r_2-r_1).
$$

Thus $F_x$ is nondecreasing and 2-Lipschitz. Distinct present positions give $F_x(0)<0$, while bounded distant past gives $F_x(r)\to+\infty$. These assumptions establish existence before a bracket is supplied. Once opposite strict bracket signs are verified, those signs already supply existence within the bracket.

On a finite bracket with nonzero source distance, the Lipschitz chain rule gives, almost everywhere,

$$
F_x'(r)=1-n_x(r)\cdot q'(t-r),\qquad n_x(r)=\frac{x-q(t-r)}{|x-q(t-r)|}.
$$

If this derivative is at least $d>0$, absolute continuity gives $F_x(v)-F_x(u)\ge d(v-u)$ for bracket points $u<v$. Opposite strict signs therefore imply one root there. Global monotonicity and those strict signs exclude every exterior root. This is a complete root argument, including the remote past; it is not merely persistence of one numerically tracked root.

An ordinary acceleration knot does not enter this first derivative. At a source-velocity jump, position continuity is essential, and the interval implementation must cover both velocity traces and both adjacent pieces. A uniform bound on both traces is a sufficient practical condition; changing the derivative at an isolated point does not alter the absolute-continuity proof. Global feasibility cannot be replaced with a speed sample or an uncertified polynomial overshoot.

### Candidate error and translation

Let $x_\theta=x_0+\theta p$, $|p|\le P$, and let $r_c$ be a candidate with $|F_{x_0}(r_c)|\le\epsilon$. The reverse triangle inequality yields $|F_{x_\theta}(r_c)|\le\epsilon+P$. On the full proposed bracket $[r_c-\delta,r_c+\delta]$, suppose the nonzero-distance and common slope conditions hold for every $\theta\in[0,1]$. Then

$$
F_{x_\theta}(r_c-\delta)\le\epsilon+P-d\delta<0,
\qquad
F_{x_\theta}(r_c+\delta)\ge-(\epsilon+P)+d\delta>0
$$

whenever $0<\delta<r_c$ and $d\delta>\epsilon+P$. This proves the claimed complete enclosure. The factor must be validated on the enlarged region itself. Equality does not give the strict signs used to exclude exterior roots.

There is a useful proof improvement over integrating a pointwise implicit derivative. Write $r_\theta$ and $r_\eta$ for the now-established roots. At the same delay,

$$
|F_{x_\theta}(r_\eta)-F_{x_\eta}(r_\eta)|\le |\theta-\eta|\,|p|.
$$

Strong monotonicity of $F_{x_\theta}$ inside the common bracket consequently gives

$$
|r_\theta-r_\eta|\le\frac{|\theta-\eta|\,|p|}{d}.
$$

This proves the root-to-root displacement and Lipschitz dependence without a finite smooth partition or differentiation at a crossing. In particular $|r_1-r_0|\le P/d$. The candidate is a different object: $|r_0-r_c|\le\epsilon/d$, and $|r_1-r_c|\le(\epsilon+P)/d$. The frozen note correctly distinguishes these objects. Recommended clarification after the freeze: use this two-point proof in place of relying on unspecified “piecewise integration.” No stronger source regularity is needed for the claimed enclosure.

### Independent controls and provenance

The root controls were derived algebraically and then checked by exact `Fraction` arithmetic. For $q(s)=(\min(\max(s,0),1),0,0)$, $t=3$, and $x=(0,2,0)$, the positive-delay equation on the moving source piece is $r^2=(3-r)^2+4$. It gives $r=13/6$, source time $5/6$, and $D=1+(5/6)/(13/6)=18/13$. Squared endpoint comparisons verify the signs at $2$ and $5/2$, and the direction's nonpositive first component proves $D\ge1$ throughout the bracket and its traces. For $x=(3,0,0)$, the identity $3-q_1(3-r)=r$ holds for every $r\in[2,3]$, producing an entire root plateau with $D=0$. A wider bracket can have strict endpoint signs while containing this plateau: the strict local factor cannot be omitted.

A separate static-source control has $x_\theta=2+\theta/4$, candidate $2$, $\epsilon=0$, $P=1/4$, $d=1$, and $\delta=1/2$. Its exact roots lie strictly inside $[3/2,5/2]$ and move by at most $1/4$. As an existence counterexample when bounded negative past is omitted without supplying bracket signs, the globally unit-speed straight source $q(s)=s$ at $t=0$, receiver $x=1$, has $F_x(r)=-1$ for every $r\ge0$ and has no root.

The global monotonicity, fixed-emission exclusion, and local positive-factor argument reuse the mathematics already derived in the [October 6 tail review](overnight-d-tail-independent-review-2026-10-06.md#root-existence-complete-exclusion-and-the-transmitter-floor). Its [local construction](overnight-d-tail-independent-review-2026-10-06.md#a-local-construction-that-permits-a-frozen-clock) also already uses bracket sensitivity in the normal-cone continuation argument. The present new contribution is the explicit candidate-error/translation certificate and unit-speed ordinary-root/plateau controls. Recommended attribution correction after the freeze: link that predecessor in the fallback note. This review does not establish a new local-existence theorem or extend the predecessor's source regularity class for acceleration evolution.

## Conditional exclusion of later receptions of the original birth

The parent's additional consequence is valid under explicit actual-path hypotheses. Let $b_j=X_j(0)$ be the actual source birth position, and let the receiver remain 1-Lipschitz after an admitted time $T>0$. Define $G_{ij}(t)=t-|X_i(t)-b_j|$. The reverse triangle inequality gives $G_{ij}(t_2)\ge G_{ij}(t_1)$ for $t_2\ge t_1\ge T$. If a validated actual margin gives $G_{ij}(T)\ge\gamma_{ij}>0$, that margin persists for as long as the receiver speed premise holds.

If the complete source is also 1-Lipschitz, then $F_t(t)=G_{ij}(t)>0$ and monotonicity excludes every causal root of delay $r\ge t$. Every root therefore has source time $s=t-r>0$. In fact, the 2-Lipschitz inequality gives

$$
\gamma_{ij}\le G_{ij}(t)=F_t(t)-F_t(r)\le2(t-r)=2s,
\qquad s\ge\gamma_{ij}/2.
$$

Uniqueness and ordinary-root regularity are not needed for this exclusion itself, although they remain relevant to the acceleration law and continuation. This is the predecessor's fixed-emission gap argument with emission threshold zero. It neither proves future existence nor proves the speed premise. A nonnegative margin with possible equality is insufficient: a receiver moving outward at unit speed along a ray from the birth can have $G=0$ on a whole interval.

Removing later comparison jump budgets requires more than positivity of the actual root. The comparison and auxiliary homotopy roots used to subtract the two acceleration evaluations must also avoid the source-zero discontinuity, or their existing support budget must remain. A numerical actual-position margin must include the error in both the receiver and the original birth position. No all-channel actual positive margin, comparison-homotopy exclusion, or resulting budget removal is claimed at the existing admitted endpoint in this review.

## Independent matrix-weight derivation

For a fixed real symmetric positive-definite matrix $S_i$, put $z_i=(S_i e_i^x,e_i^v)$ and $Y_i=|z_i|$. With signed receiver matrix $B_i$, the receiver block is

$$
A_i=\begin{pmatrix}0&S_i\\B_iS_i^{-1}&0\end{pmatrix},\qquad
\frac{A_i+A_i^\top}{2}=\frac12\begin{pmatrix}0&K_i\\K_i^\top&0\end{pmatrix},\qquad
K_i=S_i+S_i^{-1}B_i^\top.
$$

Squaring the last block matrix produces diagonal blocks $K_iK_i^\top$ and $K_i^\top K_i$. Its eigenvalues are the positive and negative singular values of $K_i$, including zeros. Therefore the largest eigenvalue, and hence Euclidean logarithmic norm, is exactly $\|K_i\|_2/2$. The order $S_i^{-1}B_i^\top$ is essential. Signed receiver channels must still be summed before taking the receiver norm; substituting the sum of channel norms can lose the intended cancellation.

The delayed source error is $[-B_{ij}S_j^{-1},C_{ij}]z_j(s)$. Thus the source's own weight appears on the right of $B_{ij}$, while the receiver block uses $S_i$. A negative-time source translation has acceleration contribution bounded by $\|B_{ij}\|_2d_j^*$ with zero velocity discrepancy. Residual and source-zero acceleration integrals enter the velocity component of $z_i$ unchanged, so they require no extra $S_i$ factor.

Certified constants $c_i\ge\|S_i^{-1}\|_2$ and $a_i\ge\|S_i\|_2$ give $|e_i^x|\le c_iY_i$, $|e_i^v|\le Y_i$, and $Y_i(0)\le a_i d_i^*+v_i^*$. Positive-source root translations require $P_{ij}\ge c_iU_i+c_jW_j$ and velocity radius $Z_{ij}\ge W_j$. When the source interval can also be negative, its position allowance must cover both the negative translation and this positive-history bound. The two-pass past coverage, refined containment, strict scalar trial, and simultaneous update remain necessary.

Each $S_i$ must stay fixed across the entire represented history and all cell updates. Changing it would change saved envelopes and introduce additional terms if time-dependent. A receiver-growth decrease alone is not a physical improvement: larger $c_i$, initialization, or delayed blocks can outweigh it. The oscillator cancellation is a supplied linear comparison control, not a claim of equilibrium or stability of the target.

## Helper inspection and known controls

`weight` converts a finite symmetric $3\times3$ encoded matrix to exact binary rationals, evaluates all three leading minors exactly, and rejects a nonpositive minor. Sylvester's criterion therefore certifies the encoded candidate's positive definiteness. For inverse entry $(i,j)$, the code removes row $j$ and column $i$ before applying the cofactor sign; this is the required adjugate transpose. Exact rational conversion through `enclose` compares each rounded endpoint back to the rational value and moves it outward when needed. No floating eigendecomposition establishes the inverse.

`receiver_growth` implements the derived order, and `delayed_norm` constructs the required three-by-six block using the source metric. `norm_upper` consumes the verified spectral routine's upper endpoint. That routine's floating spectral estimate proposes a bound; interval positive leading minors verify the midpoint Gram bound, and the outward Frobenius radius covers the interval matrix. The existing subnormal fallback remains in that dependency. Extreme finite inputs can fail closed because their inverse or verified norm cannot be represented; this review makes no all-magnitudes successful-completion claim. Callers must propagate such exceptions as unresolved validation, and must not manufacture an unchecked metric object or interpret an upper norm value as a two-sided enclosure of the exact norm.

**Measured validation:** the shared-venv helper command completed exit zero under one-thread BLAS settings and `PYTHONDONTWRITEBYTECODE=1`, with the primitive, matrix-norm, and matrix-weight known-control groups reporting `PASS`. A separate inline control run then completed exit zero with the following independently determined expectations:

| Control | Independent expectation and result |
| --- | --- |
| Exact Gaussian elimination oracle | First checked against the known inverse of $\left(\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right)$; passed before checking the helper. |
| Full coupled SPD matrix | $S=\left(\begin{smallmatrix}4&2&-2\\2&10&2\\-2&2&3\end{smallmatrix}\right)=LL^\top$, with $L=\left(\begin{smallmatrix}2&0&0\\1&3&0\\-1&1&1\end{smallmatrix}\right)$; exact minors $4,36,36$ and rational Gaussian-elimination inverse all enclosed. The inverse is $\left(\begin{smallmatrix}13/18&-5/18&2/3\\-5/18&2/9&-1/3\\2/3&-1/3&1\end{smallmatrix}\right)$. |
| Noncommuting receiver order | $S=\operatorname{diag}(1,2,1/2)$ and $B_{12}=8$ only. The leading Gram eigenvalue solves $\lambda^2-21\lambda+4=0$. Exact rational inequalities on the returned upper bound prove it lies above the larger root after the required square/rescale, and the growth upper bound is below $2.3$. Reversed order would give Gram trace $69$ and growth above $4$. |
| Source-weight delayed block | $S_j=\operatorname{diag}(2,3,4)$, $B_{12}=6$, $C_{13}=4$, otherwise zero. The single nonzero block row has norm $\sqrt{20}$; the returned bound squared is at least $20$ and the bound is below $4.48$. |
| Physical conversions | The same diagonal metric has exact inverse norm $1/2$ and initialization norm $4$; returned upper bounds cover both and are within $10^{-8}$. |
| Invalid inputs | Wrong shape, NaN, infinity, and a symmetric indefinite matrix were rejected. Supplied controls separately reject singular, negative diagonal, and nonsymmetric weights. |
| Root controls | Exact rational ordinary root $13/6$, factor $18/13$, endpoint signs, plateau identity, and static translated-root enclosure passed. The continuum assertions also have the algebraic proofs above; point samples alone are not their proof. |

These tests used analytical values and a separately written exact elimination procedure, rather than parity with the helper's adjugate or a target output. No scratch file or target result was created.

## Identities, falsifiers, and preservation

The following subject identities were measured by `shasum -a 256` and retained for the final preservation check:

| Subject | SHA-256 |
| --- | --- |
| `overnight2-d-local-causal-root-enclosure.md` | `adc6f221576b452f234ed1982d90c8952353898eb8bc43d22680bb7e636df7e3` |
| `overnight2-d-matrix-weight-comparison.md` | `31af04495a78b13ce21303839967362d974fba93f15b0e06c17b97f17c229371` |
| `overnight2-d-matrix-weight.py` | `ecd044f02e7dc0c9a6ad94de21c7bc2774430d3e6845c0b13abdc0df12eb9c76` |

Relevant inspected dependency identities are `overnight2-d-interval-variation.py` = `a1d59de294381bec198247039ce7a67781d0cbf31832a378b7c10e95cdbea5f1`, `overnight2-d-initialization-check.py` = `4cea0ac572420687f0445508759403e4c2da8ef13f2bfe8e9c97c72438db2915`, `overnight2-d-interval-matrix-norm.py` = `c026c2689ee0b222f00cbfeb7beb56f42f3423a39b13dae82588cb8def978775`, and `overnight-d-tail-interval-independent-check.py` = `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff`. The predecessor tail review is `c1e551372f56484b5a36e17552076c5943a5adeccac58629de66fb2d2ec79e2f`. This is a bounded audit of the new helper and its relevant arithmetic consumers; it does not replace earlier full dependency reviews.

Falsifiers for a later application include any complete-history speed violation, nonpositive local factor on an intersected piece or trace, missing source coverage, nonstrict bracket sign, inverse outside its interval, incorrect matrix multiplication order, receiver/source weight interchange, inconsistent saved-history weight, or physical conversion omitted from a root region. A later budget-removal claim is also falsified by a nonpositive actual birth margin or an auxiliary root still crossing zero. A norm verification exception supplies no bound.

Only this new companion was written. The frozen subjects, earlier reviews, shared account, local scientific receipts, and production files were left untouched. Final validation comprises repeat subject/dependency SHA-256 checks, relative-link resolution, and a whitespace check of this companion. There is no required mathematical repair before these components can be used conditionally; the proof clarification and predecessor link above should accompany subsequent integration. A target application still needs its own whole-region arithmetic, complete coverage, provenance, physical allowance comparison, and independent receipt adjudication.
