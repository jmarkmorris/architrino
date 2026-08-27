# F6c Correlated Residual Box Envelope

Status: derived conditional proof and independently fixed implementation controls, pending independent review, 2026-08-27. This artifact supplies no actual-data evaluation, execution plan, metric or score.

## Scope and exact premises

The direct consumer is the polynomial-remainder operation in the accepted [residual integral and supremum definition](2026-08-27-f6c-residual-integral-supremum-enclosure.md), SHA-256 `945441097fdd2934434dd2ff6d9dd6f06a77898752db6bcac90745a76420eb4b`. Its unchanged [pure reference](../../../../scripts/eom/oracle/f6c_residual_integral_supremum.py), SHA-256 `fc170a91b2747923bda89ef00b58d529c98bf96b01cc7b2c05c035042fc79c5a`, owns `IntegralKey`, `Polynomial`, `ResidualPartition`, numerical limits and outward 90-significant-digit presentation. Its [controls](../../../../tests/test_f6c_residual_integral_supremum.py) remain independently fixed at SHA-256 `d80ca8bab38bface925fbdee1530f43919c83b331a878f004ef1601b2cf09b24`. The existing [member predeclaration](2026-08-26-f6c-normalized-member-acceleration-predeclaration.md) still owns interval Gauss–Kronrod, the final width target, the subdivision allowance and the three-rung requirement.

Plainly: this is one missing mathematical operation inside the existing measurement method. It neither replaces that method nor grants permission to run it.

We work in normalized wake-speed units with $c_f=1$, absolute time $T$ and Euclidean spatial components. Fix one member, one original accepted frame side, and one closed positive-width leaf $J=[a,b]$ contained in that frame. Put $h=b-a$, $u=T-a$ and $\lambda=L_0^2$, where the unchanged ruler is $L_0=0.5320012303229503$. For the same nonempty reconstructed family $\mathcal F_H$, assume the complete law-side acceleration satisfies $A_k(T;X)\in[\ell_k,v_k]$ for every $T\in J$, every $X\in\mathcal F_H$ and each component $k=1,2,3$. These finite ordered intervals are signed acceleration bounds, not squared-residual bounds. Write the exact frame curvature as $B_k(u)=H_k''(a+u)=\alpha_k+\beta_k u$.

Plainly: the fixed future has exactly known linear curvature within one cubic frame. The law-side acceleration may vary with time and with the admissible past; only its existing whole-leaf bounds are used.

Let $p(u)=p_0+p_1u+p_2u^2$ be any fixed degree-at-most-two polynomial, with the exact supplied coefficients and the same key and local origin. In particular, a protocol may first round its interpolation coefficients downward to 90 digits; those resulting decimal strings define $p$ exactly here. The operation must not substitute the unrounded interpolant. Define $f(T;X)=\lambda\sum_k(B_k(u)-A_k(T;X))^2$. The acceleration premise, original-frame coefficient identity, source generation, member, frame side and normalization are external premises; consistency labels alone do not authenticate them. No derivative of $\mathbf A$ or second derivative of an arbitrary admissible past is assumed.

Plainly: the polynomial may be an approximation, but the subtraction must use precisely that approximation. The proof needs no unproved smoothness of the family.

## Common-time envelope theorem

For a real number $z$ and an interval $I$, let $\operatorname{dist}(z,I)$ be the ordinary nonnegative distance from $z$ to $I$. For $0\le u\le h$, define

$$
m(u)=\lambda\sum_{k=1}^3\operatorname{dist}\bigl(B_k(u),[\ell_k,v_k]\bigr)^2-p(u),\qquad
M(u)=\lambda\sum_{k=1}^3\max\bigl\{(B_k(u)-\ell_k)^2,(B_k(u)-v_k)^2\bigr\}-p(u)
$$

Plainly: at one fixed time, the nearest allowed acceleration gives the smallest squared mismatch, and the farthest endpoint gives the largest. All three components and the subtracted polynomial retain that same time.

The exact interval hull over the independent acceleration-box relaxation is

$$
E_J=[e_-,e_+],\qquad e_-=\min_{0\le u\le h}m(u),\qquad e_+=\max_{0\le u\le h}M(u)
$$

Plainly: this is the smallest interval justified by allowing each acceleration component to take any value in its supplied box at any time. The physical family is a subset of that relaxation, so the same interval also encloses its residual minus the polynomial.

**Proof.** For fixed $u$, minimizing $(B_k(u)-z)^2$ over $z\in[\ell_k,v_k]$ gives zero when $B_k(u)$ is inside the interval and the nearer endpoint square otherwise. Convexity gives the maximum at an endpoint. The three independent interval choices form a Cartesian product, so the sum's minimum and maximum are the sums of those coordinate extrema. Subtracting the same fixed $p(u)$ establishes $m(u)\le f(a+u;X)-p(u)\le M(u)$. Taking extrema over the compact time interval gives inclusion. Conversely, the coordinate choices attaining each fixed-time extremum belong to the box relaxation, and the continuous functions $m,M$ attain their extrema; therefore neither endpoint of $E_J$ can be improved for that relaxation. This last exactness claim is not a claim that one admissible history attains the box extremes.

Plainly: the proof is exact about the numerical box model. It does not turn the box's allowed variation into demonstrated variation of the actual family.

## Finite rational evaluation

For each nonconstant affine component, the only possible branch changes are the solutions of $B_k(u)=\ell_k$, $B_k(u)=v_k$ and $B_k(u)=(\ell_k+v_k)/2$. Keep only distinct solutions strictly inside $(0,h)$, then include $0$ and $h$. There are at most nine interior cuts and ten positive-width pieces. Zero slopes require no division; coincident solutions are deduplicated; boundary solutions are already covered by the endpoints. On each open piece, selecting branches at its rational midpoint gives exact quadratic expressions for $m$ and $M$. Their continuous values agree at every shared boundary, including tied endpoint choices.

Plainly: the formulas can change only when linear curvature crosses a box endpoint or its midpoint. These are algebraic checks inside one leaf, not extra requests to the history or root provider.

For any resulting quadratic $q(u)=c_0+c_1u+c_2u^2$ on a closed piece $[r,s]$, evaluate both endpoints and also $u_*=-c_1/(2c_2)$ when $c_2\ne0$ and $r<u_*<s$. The minimum and maximum of those exact rational values are the exact extrema on that piece; a linear or constant polynomial needs only endpoints. Collect the minima of the lower quadratics and maxima of the upper quadratics. Arithmetic capacity exhaustion is unresolved, not permission to drop a vertex or widen an input silently. Only final presentation rounds $e_-$ downward and $e_+$ upward to 90 significant digits. In particular, $f-p$ is signed and must not be clipped to nonnegative values.

Plainly: endpoints alone can miss an interior turning point. Checking the one possible vertex on every piece completes the calculation without sampling or differentiation of the unknown acceleration.

The returned mathematical object is one `ResidualPartition` with the original `IntegralKey` and exactly one `ResidualPiece` whose domain is the full original leaf $J$ and whose residual interval encloses $E_J$. Retain the exact supplied polynomial alongside it. The internal cuts are not emitted reception cells, do not call a provider, do not create root queries, and do not consume or enlarge a scheduler's subdivision allowance. All 15 authority flags of the frozen reference remain false. This object can enter the existing surrogate-integral identity only under its unchanged same-family, same-key and uniform-premise requirements.

Plainly: a few internal polynomial cases produce one whole-leaf remainder bound. They do not create a new measurement partition or establish source truth.

## Why shared time matters, and what it cannot recover

For any auxiliary vector $\mathbf a(T)$, put $\mathbf y=\mathbf H''-\mathbf a$ and $\boldsymbol\delta=\mathbf A-\mathbf a$. Exact expansion gives

$$
f-p=\bigl[\lambda\|\mathbf y\|^2-p\bigr]+\lambda\bigl[-2\mathbf y\cdot\boldsymbol\delta+\|\boldsymbol\delta\|^2\bigr]
$$

Plainly: subtracting a useful polynomial before taking the time range can preserve cancellation of the known curvature. Merely subtracting two independently computed scalar ranges loses that cancellation.

A constant box midpoint is already an allowed auxiliary vector: $a_k=(\ell_k+v_k)/2$ gives $\delta_k\in[-(v_k-\ell_k)/2,(v_k-\ell_k)/2]$. The theorem above computes the exact pointwise box extrema of this same identity while retaining common time. For example, with $B_1(u)=10u$, all other components zero, point acceleration zero and $p(u)=100\lambda u^2$ on $[0,0.1]$, the exact result is $E_J=[0,0]$. Independently taking $Q=[0,\lambda]$ and $\operatorname{range}(p)=[0,\lambda]$ would give $Q-\operatorname{range}(p)=[-\lambda,\lambda]$.

Plainly: the example proves that the operation can genuinely tighten a remainder using existing boxes alone. It is an analytic control, not a prediction for F6c data.

If an existing $Q$ encloses the entire same box relaxation of $f$, then $E_J\subseteq Q-\operatorname{range}(p)$. A separately serialized acceleration box may be slightly wider than the unrounded box used to compute a saved $Q$, so that stronger containment must not be assumed across differently rounded intermediates. When both are valid uniform bounds for the actual family, their intersection is always a valid remainder bound; an empty intersection is a failed premise or arithmetic check. No strict contraction, final $10^{-6}$ width, total runtime or full-history result follows without the corresponding calculation and reviewed execution authority.

Plainly: tighter is something to check, not assume. Previously rounded records can have slightly different margins even when each is individually valid.

If the exact independent-box envelope remains too broad, this operation has exhausted the information in that box relaxation. A tighter result would require additional information, such as a uniformly proved bound on $\mathbf A(T;X)-\mathbf a(T)$ that preserves time or same-root dependence inside the sharp kernel. Subtracting another independent final acceleration box does not itself provide that information. Broad arithmetic bounds do not prove broad actual family variation or impossibility of the requested precision.

Plainly: the next missing information, if needed, is a better relation between acceleration and time—not an assumed derivative or a claim that the physics varies as widely as its current enclosure.

## Exact affine input boundary

The cubic Hermite construction in the unchanged [acceleration reference](../../../../scripts/eom/oracle/continuous_reception_acceleration.py), SHA-256 `abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8`, makes $\mathbf H''$ affine with rational coefficients. Finite decimal endpoint data do not guarantee terminating-decimal coefficients after division by frame widths. The implementation interface therefore accepts each `Affine(intercept,slope)` field as either a bounded exact decimal string or an exact `Fraction`, not a subclass or coercible substitute; numerator and denominator obey the frozen 262144-bit rational-capacity bound. No conversion through binary floating point or finite decimal rounding is permitted. The original-frame coefficient identity remains an external premise.

Plainly: exact frame data can produce fractions with infinitely repeating decimals. Keeping those fractions directly avoids introducing an unrecorded curvature error.

If a different later provider chooses an approximate affine $\widetilde{\mathbf B}$, a sound adaptation would require proved componentwise whole-leaf errors $\mathbf B-\widetilde{\mathbf B}\in\mathbf C$ and the effective box $[\ell_k,v_k]-C_k$, because $\mathbf B-\mathbf A=\widetilde{\mathbf B}-(\mathbf A-(\mathbf B-\widetilde{\mathbf B}))$. That error proof is not supplied here and is unnecessary for the declared exact-rational interface.

Plainly: a checked coefficient-error allowance can protect the same identity. An unchecked rounded substitute cannot.

## Independent pre-implementation controls

The following exact known-answer plan was fixed and sent before the subject implementation was written: UTF-8 plan SHA-256 `96ea187231baad292212ba642eef4c29fbdc74903150493404f61e556e717285`. These expected values come from direct elementary minimization, not from that implementation. Let $\lambda=(5320012303229503/10^{16})^2$, $J=[0,0.1]$ and $z=10(T-J.\mathrm{lo})$; every omitted component is zero with point acceleration zero. Polynomial coefficients are converted exactly to the local variable $u=T-J.\mathrm{lo}$.

| Case | Required curvature and acceleration box | Polynomial | Exact envelope |
| --- | --- | --- | --- |
| Shared quadratic cancellation | $B_1=z$, $A_1=0$ | $\lambda z^2$ | $[0,0]$ |
| Nonzero box radius | $B_1=z$, $A_1\in[-1,1]$ | $\lambda z^2$ | $[-\lambda,3\lambda]$ |
| Interior lower vertex | $B_1=z$, $A_1=0$ | $\lambda z$ | $[-\lambda/4,0]$ |
| Interior upper vertex | $\mathbf B=\mathbf A=0$ | $\lambda(z-1/2)^2$ | $[-\lambda/4,0]$ |
| Signed remainder | $\mathbf B=\mathbf A=0$ | $1$ | $[-1,-1]$ |
| Signed constant components | $\mathbf B=(1,-2,3)$; boxes $[-2,0],[-3,-1],[2,4]$ | $0$ | $[\lambda,11\lambda]$ |
| Nine distinct interior cuts | $\mathbf B=(z,z,z)$; boxes $[.1,.3],[.4,.6],[.7,.9]$ | $0$ | $[2\lambda/25,63\lambda/50]$ |
| Negative affine slope | $\mathbf B=(1-z,z-1/2,0)$; point zero box | $0$ | $[\lambda/8,5\lambda/4]$ |
| Coincident cuts and boundary cuts | $\mathbf B=(z,z,z)$; all boxes $[0,1]$ | $0$ | $[0,3\lambda]$ |
| Zero slopes and point boxes | $\mathbf B=\mathbf A=(1,1,1)$ | $0$ | $[0,0]$ |

Plainly: these examples exercise cancellation, both kinds of turning point, signed values, all nine possible interior cuts, repeated cuts and constant components. They can expose a wrong algorithm without consulting actual F6c data.

The nine-cut case has lower minimum $2\lambda/25$ at $z=1/2$ and upper maximum $63\lambda/50$ at $z=0,1$; its nine cuts are $z=.1,.2,\ldots,.9$. The negative-slope case has lower vertex $z=3/4$. Repeat the first eight cases on $J=[.02,.12]$ with unchanged local coefficients to check the origin. Replacing the cancellation case's polynomial by $p-10^{-90}$ gives the exact point remainder $[10^{-90},10^{-90}]$. Check outward inclusion of every exact answer, unchanged inputs, the same key and full-leaf single-piece output, and all false authority flags. Reject degree three, reversed or nonfinite boxes, invalid shapes, invalid normalization/context/domain and unsupported record types using the frozen parser contract.

Plainly: the shifted and tiny-offset controls ensure that the code uses the supplied local polynomial exactly, not a reconstructed or silently repaired one.

Following the exact-rational interface decision and before final implementation review, independently add $B_1(u)=1/3+(7/11)u$, point zero acceleration, $p=0$ and $h=1/10$. This positive increasing affine ranges from $1/3$ to $1/3+7/110=131/330$, so the exact envelope is $\lambda[1/9,(131/330)^2]$. Reject `Fraction` subclasses, booleans and over-capacity rational fields; do not treat conversion success as exact-type validation. This supplemental case was fixed after the interface decision, separately from the pre-implementation plan above.

Plainly: the repeating-fraction control checks the actual representation problem directly. Its answer follows from two exact endpoint values, not from the subject implementation.

## Falsifiers and next boundary

The algebraic claim is overturned by an exact $u\in[0,h]$ and acceleration vector inside the supplied Cartesian box for which $\lambda\sum_k(B_k(u)-A_k)^2-p(u)$ lies outside the returned exact envelope, or by a missed branch boundary or quadratic vertex. The application claim fails if a supplied acceleration box is not uniform for the same member, frame side, leaf and family, or if the affine coefficients are not the exact required curvature and no proved error allowance is supplied. Source and process authentication remain separate. This proof establishes neither a historical-trajectory identity nor completed quadrature, RMS/peak accuracy, three-rung agreement, EOM execution, retention, H3, metric availability or score authority.

Plainly: the implementation can be checked with small exact examples; applying it to the real data still requires correctly bound inputs. Nothing here upgrades a conditional one-leaf bound into a physical or full-history result.

Closure goal: independently check this finite common-time envelope, then reuse it as a conditional whole-leaf polynomial-remainder provider without changing the existing measurement settings.
