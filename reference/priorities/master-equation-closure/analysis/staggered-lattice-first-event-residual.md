# Bounding the equation error of the staggered comparison

## Purpose and claim boundary

The numerical comparison follows the two polarity sublattices in opposite vertical directions. To decide what the exact solution does, one must bound how far this comparison departs from the unchanged Master Equation at every time between saved samples. This document gives that continuous equation-error calculation. Its output is an acceleration-error bound; the separate [continuation argument](staggered-lattice-first-event.md) must propagate that error together with uncertainty in the complete earlier history before it can establish an event.

**Claim grade: derived enclosure method with a completed, independently assessed interval calculation.** The numerical path is a comparison function. It is not asserted to satisfy the full equation after its own first speed-one crossing. The original infinite stationary block sum, all delayed source corrections, $g=16$ and $c_f=1$ remain fixed. The separate first-event proof propagates these residual bounds and establishes the exact branch's arrival.

## 1. Define the comparison between samples

Write the comparison displacement as $Q(t)$. For $t\le0$, it is $a e^{\lambda_c t}$, where $a=2^{-40}$ and $\lambda_c$ is the saved binary growth-rate center. The exact history instead uses the exact characteristic root and its proved nonlinear correction. Both differences belong in the trajectory-error propagation; setting the correction to zero is not an alternative exact preparation.

For positive time, define $Q$ as the quintic polynomial matching the saved displacement, velocity and acceleration at both ends of each time step. Treat each saved binary number as an exact rational number when defining this polynomial. Reconstructing its coefficients by outward interval arithmetic then encloses that exact polynomial. The saved floating polynomial coefficients are convenience output and are not used as its mathematical definition.

Adjacent positive-time polynomials have identical position, velocity and acceleration traces at their shared sample. At zero, position and velocity match the exponential, while acceleration can have a small jump. Thus the comparison is continuously differentiable and piecewise twice differentiable. That regularity is sufficient for the twice-integrated error comparison. Any identity using differences of acceleration across zero must include the jump explicitly.

The polynomial enclosures prove positive comparison velocity and acceleration throughout each cell. This permits source position and velocity ranges to be bounded by their endpoint values even when a causal emission interval spans several cells. Acceleration and jerk ranges use the union of the relevant polynomial-cell bounds, together with the exponential side when the interval crosses zero. Node positivity alone would not justify these range bounds.

## 2. Every causal root and source row

Use the source offset $d=j-i$, its vertical component $m$, transverse squared distance $p=d_1^2+d_2^2$, and polarity $\sigma=(-1)^{m+p}$. The range and transmitter denominator are

$$
r=\sqrt{p+[Q(t)-m-\sigma Q(s)]^2},\qquad
s=t-r,\qquad
D=1-\sigma nQ'(s),\qquad
n=\frac{Q(t)-m-\sigma Q(s)}r.
$$

Every offset with the same $(m,p)$ has the same scalar row. Its exact integer multiplicity retains all such offsets. An interval iteration encloses each emission time, beginning with the complete geometric delay bounds for a prescribed displacement radius below $1/2$. Intersecting successive enclosures preserves the root. The positive source-speed margin verifies uniqueness on the complete possible emission interval. After the comparison crosses speed one, these cross-channel calculations still use earlier subunit source segments; they do not assert the absence of own-history rows on that comparison.

Subtract the stationary source row before summing. Small source displacements are factored algebraically, so rounding does not turn a difference of nearly equal stationary rows into a false disturbance. The interval row evaluator also encloses the complete receiver and source sensitivities in the continuation proof. All finite rows are summed with their signs and exact multiplicities. A separate absolute tail accounts for every omitted changing source.

## 3. The stationary infinite sum

The residual calculation uses an independently established polynomial enclosure of the original stationary block field. Along the axis,

$$
S(q)=c_3q^3-\sum_{\ell\in\{6,8,10,12,14\}}\ell c_\ell q^{\ell-1}+R(q).
$$

The full cubic coefficient has its previously certified interval. The higher coefficients have exact finite-shell enclosures and explicit infinite tails. The remainder covers every degree from fifteen onward in the acceleration field. Evaluating these bounds at the current displacement keeps the error small as $q$ tends to zero. The derivative enclosure uses the corresponding differentiated remainder. This is a representation of the same block sum, not a finite bare lattice or a modified interaction kernel.

These retained stationary references are unchanged. The numerical comparison used a different representation to obtain its central values; agreement between the two representations is not assumed by the residual proof. The residual encloses the original equation directly on the saved comparison.

## 4. Bound the error throughout a reception cell

Let $\mathcal F[Q]$ be the full cross-source acceleration functional and define the defect

$$
\rho(t)=Q''(t)-\mathcal F[Q](t).
$$

On a reception cell $[u,v]$, let $c=(u+v)/2$. An interval evaluation gives the midpoint defect and a bound on its derivative throughout the cell. The mean-value estimate is

$$
\sup_{u\le t\le v}|\rho(t)|
\le |\rho(c)|+\frac{v-u}{2}\sup_{u\le t\le v}|\rho'(t)|.
$$

Using the derivative of the defect preserves cancellation between the polynomial's changing acceleration and the changing delayed field. Bounding both complete accelerations independently over the whole cell would lose that cancellation.

The derivative calculation retains the exact linear operator

$$
Lh(t)=\frac{16}{3}\sum_{d\ne0}\frac{h'(t-|d|)}{|d|^2}.
$$

For each finite source, put $s_0=t-|d|$. Its shifted source jets are compared with those at $s_0$ using integrals of the intervening derivative. For example, $Q'(s)-Q'(s_0)$ is the integral of acceleration between those times. A difference of accelerations uses jerk on each smooth segment plus the acceleration jump at zero if the interval crosses it. Shell symmetry cancels the remaining static source-position derivative exactly. This retains the correct growing linear mode throughout the long small-amplitude portion of the calculation.

## 5. The infinitely distant changing sources

If the retained cube has radius $N>H+2B$, every omitted source emits before zero throughout $0\le t\le H$, where $B$ is the comparison displacement bound. The comparison's omitted past is exactly exponential. The shell count $24m^2+2\le26m^2$ and the earlier-emission factor $e^{-\lambda_c m}$ give convergent geometric majorants for the acceleration and its reception derivative. The exact branch's additional nonlinear ancient correction is accounted for separately in the trajectory comparison.

For the reception derivative, the full receiver sensitivity contains an old-source acceleration term. A speed bound alone is therefore insufficient. On this tail, the exponential estimate also verifies $20|Q'(s)|+8r|Q''(s)|<2$, giving the stated $4/r^3$ sensitivity bound. The shell factor twenty-six multiplies both the old velocity and acceleration terms. Every omitted source is included by these inequalities; no memory cutoff is imposed on the law.

## Evidence and current status

The new interval arithmetic and archive reconstruction passed recorded known cases before their first target use. A separate reference checked the row formulas against exact rational moving-source geometries and checked exponential bounds by independently constructed rational series. A separate exact-rational Bernstein reconstruction checked every saved polynomial cell, its endpoint joins, coefficient enclosures and positive velocity and acceleration. These are checks of the comparison and enclosure instruments, not an assumption that the numerical evolution is exact.

The continuous calculation covers 597 reception cells from zero through $1193/128=9.3203125$, as recorded by `residual-grid64-complete.json` in the first-event integration evidence owner. Its explicitly evaluated source cube contains 24,388 nonzero offsets in 3,073 scalar groups, as recorded by the authenticated numerical archive and its receipt; the infinite complement is included analytically. The largest acceleration-defect bound over those cells is below $0.220349$. The earlier small-growth cells have much smaller absolute defects, so the trajectory comparison uses each cell's own bound rather than this global maximum.

Independent review identified two small completion obligations in the first raw pass. The acceleration trace difference at zero is bounded above by $3.517760\times10^{-27}$. The exact-rational completion instrument adds $16\cdot26N$ times that bound and the cell half-width, covering every possible source interval crossing zero. Its largest addition is below $1.600581\times10^{-25}$. The instrument also verifies that the complete comparison displacement is below $31/128$. That leaves at least $1/64$ of slack inside the initial geometric root tube, more than the $2^{-45}$ upper bound on its endpoint subtraction rounding. The raw pass and source bytes are retained unchanged; the completed receipt, which includes these obligations, is the residual input to the trajectory proof.

The full calculation finished in 174.12 seconds according to its receipt. Its owned supervisor recorded exit code zero and a closed process group. An earlier eight-cell pilot remains diagnostic and is superseded by the completed receipt. No regular test suite or physical law was changed.

The first complete propagation closed every cell but gave an endpoint velocity lower bound of only $0.9968404175$. This was an insufficient certificate, not a reversal. The final residual retains all 576 cells through time nine and replaces the later cells by 82 cells of width $1/256$. A known-first suffix calculation reuses the frozen evaluator and explicit junction allowance; it preserves every earlier cell exactly. The largest suffix defect is then below $0.023476977$. The refinement took 22.88 seconds according to its receipt and changed neither the saved comparison trajectory nor any earlier proof input.

The completed refined receipt is `residual-refined-complete.json`. Independent coverage and exact-rational checks authenticate its complete partition and unchanged prefix. Propagation over all 658 final cells then closes the first-event proof: the auxiliary endpoint velocity lower bound exceeds $1.0211550976$, forcing a first actual speed-one arrival by $1193/128$. This conclusion uses the separate trajectory-error argument and its independent replay, not residual size alone. The [independent assessment](staggered-lattice-first-event-independent-adjudication.md) records each check's scope.
