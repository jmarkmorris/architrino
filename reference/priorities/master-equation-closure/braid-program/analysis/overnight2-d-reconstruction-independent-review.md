# Independent review of the endpoint-preserving reference reconstruction

## Verdict and scope

**Derived disposition:** the polynomial construction in the [frozen reconstruction note](overnight2-d-reference-reconstruction.md) satisfies all six endpoint constraints in exact arithmetic. It is the unique quintic with those position, velocity, and acceleration data. Adjacent cells are $C^2$ at an ordinary node if their supplied acceleration traces agree. Distinct acceleration traces at source-kick receptions can be retained without a position or velocity jump. An exact old source-zero event remains an event of the corrected reference when receiver position and source birth position are preserved there; uniqueness and absence of additional events still require a speed or monotonicity argument.

**Instrument disposition:** the [frozen floating diagnostic](overnight2-d-quintic-reference.py) implements the bubble algebra correctly and recomputes delayed rows using the reconstructed source through dynamic dispatch. Its numerical application has three concrete issues: simultaneous events can be overwritten, terminal acceleration can use inconsistent traces, and an inherited source-velocity projection can silently change the meaning of the reported residual outside the strict-interior domain. These are detailed below. The conditional interpolation theorem survives; the current instrument is not accepted as a general implementation of every event and domain clause.

This review used the live Germund Dahlquist lens and Specialist charter, independently derived the polynomial and its controls, and inspected the imported evaluation path. It ran no controls or target and used no target result as evidence. The selected original release, kick, complete past, $K=c_f=c_a=1$, partner weights, zero self acceleration, and inclusive post-summation response remain unchanged. The comparison reference is not an alternative evolution law.

## 1. Endpoint constraints and uniqueness

Let a cell have endpoints $a,a+h$ with $h>0$, and set $q=(t-a)/h$. Let $\mathbf x_3$ be the restriction of one old cubic to this cell. The refinement grid must include every old cubic breakpoint, so a new cell never crosses an unrepresented old breakpoint. Write the desired changes in the two acceleration traces as $\mathbf d_0,\mathbf d_1$ and define

$$
\mathbf b(q)=\frac{h^2}{2}\left[\mathbf d_0q^2(1-q)^3+\mathbf d_1q^3(1-q)^2\right].
$$

At each endpoint the relevant factor has a zero of order two, so $\mathbf b$ and $d\mathbf b/dt$ vanish. Near the left endpoint, $\mathbf b=h^2\mathbf d_0q^2/2+O(q^3)$; near the right endpoint, $\mathbf b=h^2\mathbf d_1(1-q)^2/2+O((1-q)^3)$. Since $d/dt=h^{-1}d/dq$, these expansions give

$$
\mathbf b''(a+)=\mathbf d_0,
\qquad
\mathbf b''((a+h)-)=\mathbf d_1.
$$

Consequently $\mathbf x_5=\mathbf x_3+\mathbf b$ preserves both positions and velocities and has the assigned endpoint accelerations. Its degree is at most five. If two quintics satisfy the same six scalar endpoint data, their difference has zeros of multiplicity at least three at both endpoints. It would be divisible by $q^3(1-q)^3$, a polynomial of degree six, and hence must vanish. Applying this argument to each coordinate proves uniqueness.

Expanding the bubble gives the coefficients used by the code:

$$
\mathbf b=h^2\left[\tfrac12\mathbf d_0q^2+
(-\tfrac32\mathbf d_0+\tfrac12\mathbf d_1)q^3+
(\tfrac32\mathbf d_0-\mathbf d_1)q^4+
(-\tfrac12\mathbf d_0+\tfrac12\mathbf d_1)q^5\right].
$$

The code's velocity and acceleration polynomials are the first two derivatives of this expression with the correct powers of $h$. Its special branches at $q=0,1$ return the exact algebraic endpoint correction values for the supplied floating coefficients.

**Independent exact control:** for $x(t)=t^5$ on $[0,1]$, the cubic matching $x(0),x'(0),x(1),x'(1)$ is $-2t^2+3t^3$. Its left acceleration is $-4$ and right acceleration is $14$, so the discrepancies to the exact accelerations $0,20$ are $4,6$. Substitution gives $b(t)=2t^2-3t^3+t^5$, and the sum is identically $t^5$. Differentiating this identity verifies both derivative controls without using the diagnostic. The previously rejected cubic $-3t^2+4t^3$ has right derivative six and is not the required endpoint interpolant. The subject correctly records that fixture error separately from target evidence. Its reported floating discrepancy was not rerun in this review.

## 2. Ordinary-node regularity and genuine event preservation

At a shared ordinary node, the adjacent old cubics have common position and velocity data. If the left cell is assigned endpoint acceleration $\mathbf A$ and the right cell is assigned the same $\mathbf A$, their corrected second derivatives agree. The joined corrected path is therefore $C^2$ there in exact arithmetic. Third derivatives may differ; the construction does not claim global $C^3$ regularity.

The old delayed acceleration is continuous at an ordinary receiver node when the admitted roots and source velocities remain continuous and their denominators stay positive. A jump in old source acceleration alone does not make the acceleration row jump, although it affects its derivative. Using the same old-reference acceleration value on both sides of such an ordinary node is consequently appropriate. This removes the interpolation-induced acceleration kink identified by the [signed-transport review](overnight2-d-signed-independent-review.md), subject to the quantitative floating-trace qualification in Section 4.

At a genuine source-zero reception, assign the complete left and right total acceleration traces separately. The corrected path remains $C^1$ there, and its second derivative has precisely the assigned jump. This retains a comparison representation of the prescribed source-front effect; it introduces no velocity reset or contact rule.

For an exact old event time $t_*>0$, the front condition is

$$
t_*=|\mathbf x_i(t_*)-\mathbf x_j(0)|.
$$

If the refined grid includes $t_*$, the bubble vanishes there for every member; it also leaves the source birth position unchanged. Thus the same equality holds for the corrected path. This proves preservation of that zero, not by itself that it is the only zero. A whole-path speed bound below one gives a strictly increasing monitor $t-|\mathbf x_i(t)-\mathbf x_j(0)|$ and hence excludes extra or reversed crossings. A floating approximation to $t_*$ only preserves its approximate monitor value, not an exact event time. Full source-clock and ordinary-root admission remain separate obligations.

The supplied endpoint accelerations are evaluated on the old path. After changing all source paths, the equation's acceleration generally changes. The corrected endpoint second derivative therefore need not equal the equation's acceleration on the corrected history. The note correctly requires recomputing that residual and does not claim exact collocation or an evolved solution.

## 3. Whole-cell correction bounds available for certification

The same polynomial gives useful conservative bounds without sampling. Put $D=\max(|\mathbf d_0|,|\mathbf d_1|)$. The convex blend of the endpoint discrepancies has norm at most $D$, while $q^2(1-q)^2\le1/16$. Hence

$$
|\mathbf b(q)|\le\frac{h^2D}{32}\qquad(0\le q\le1).
$$

For a speed bound, let $B_k^m(q)=\binom{m}{k}q^k(1-q)^{m-k}$ denote the nonnegative Bernstein basis, whose members sum to one. The bubble has degree-five control vectors

$$
(P_0,P_1,P_2,P_3,P_4,P_5)
=\frac{h^2}{20}(0,0,\mathbf d_0,\mathbf d_1,0,0).
$$

Differentiating their Bernstein expansion gives a degree-four convex combination of the five vectors

$$
\frac h4(0,\mathbf d_0,\mathbf d_1-\mathbf d_0,-\mathbf d_1,0).
$$

Therefore

$$
|\mathbf b'(t)|\le\frac h4
\max\{|\mathbf d_0|,|\mathbf d_1-\mathbf d_0|,|\mathbf d_1|\}
\le\frac{hD}{2}.
$$

A second differentiation gives degree-three acceleration control vectors

$$
(\mathbf d_0,\mathbf d_1-2\mathbf d_0,\mathbf d_0-2\mathbf d_1,\mathbf d_1),
$$

whose maximum norm bounds the entire acceleration correction. These identities are exact polynomial facts, not target numerical bounds.

For example, a validated old-reference speed bound $L$ and a validated maximum correction-speed bound $\eta$ imply new-reference speed at most $L+\eta$. A validated old pair-separation bound $d$ and per-member position-correction bounds $\beta_i$ imply new pair separation at least $d-\beta_i-\beta_j$. If these remain strictly positive with a strict subunit speed gap, the root-region theorem can be applied to the new reference. Bounds established only for the old cubic do not transfer without this correction. A floating implementation must outwardly evaluate the stored coefficients and cell widths and account for the exact declared reference representation before using these inequalities as a certificate.

## 4. Concrete diagnostic issues and derivative domains

### 4.1. Simultaneous source fronts are overwritten

The inspected code builds `eventmap={t:(i,j) for t,i,j in events}`. If two channels have the same encoded event time, the later pair replaces the earlier pair. Only the retained channel is then corrected from the nominal row into its two one-sided traces. The complete left and right acceleration sums can consequently omit other simultaneous jump corrections, although `events` still counts all list entries.

This is a code-level counterexample for any input with two equal-time channel events. No numerical claim that the running target has such a collision is made. The required repair is to group all channels at each common event time and apply every channel's one-sided replacement before finalizing the total traces. Near-equal times are a separate finite-precision and event-localization question; they must not be arbitrarily merged into a mathematically simultaneous event. An independent small control should exercise at least two exactly simultaneous channels with nonzero distinct jumps.

### 4.2. The terminal acceleration can mix cell traces

`Quintic.raw` first evaluates the base cubic using the base `searchsorted(..., side='right')` convention. Its bubble index is separately capped at the final refined cell. When the reconstruction endpoint is an internal old-history node, the base call selects the next old cubic's right-hand acceleration, while the final bubble supplies the correction designed for the preceding old cubic's left-hand acceleration. The returned endpoint acceleration is then

$$
\mathbf A_{\mathrm{end}}^-+
\bigl(\ddot{\mathbf x}_3(\mathrm{end}+)-\ddot{\mathbf x}_3(\mathrm{end}-)\bigr)
$$

in the idealized exact-coefficient calculation, rather than the intended left trace. This mismatch vanishes only when the old acceleration happens to be continuous there. It is not caused by the bubble formula.

An explicit terminal left-trace evaluation is needed. Interior Gauss samples avoid this exact endpoint, and positive-delay source evaluations before the endpoint lie earlier, so this finding alone does not invalidate every sampled interior residual. It does invalidate an unqualified derivative API or endpoint check. At time zero, the existing method deliberately returns the prescribed negative-time trace; the positive-time initialization trace must likewise be requested explicitly rather than inferred from a single derivative value at zero.

### 4.3. Inherited source projection can alter the reported residual

The reconstructed object inherits `History.row` through `Joined`. That row locates its root using `self.raw`, then calls `feasible(v,a)`, which projects a source velocity with norm above one before using it in the transmitter denominator. Thus `Q.row` does evaluate reconstructed source positions, but outside the strict-interior domain it combines the raw position curve with a separately projected source velocity.

Meanwhile the diagnostic records `raw reconstructed acceleration - sum(Q.row)` and omits a separate position-velocity compatibility residual for this projected velocity. Without subunit speed at every queried source point, that expression is not the ordinary-law residual of the raw compatible reconstructed path. The reported maximum sampled speed covers receiver Gauss samples; source points queried by delayed row evaluation need not belong to that sample set, and their speed metadata is discarded.

The appropriate repair for this strict-interior experiment is an explicit queried-source speed guard and retained telemetry, together with a receiver guard. Such sampled guards catch a domain violation at the actual calls; they still do not prove a whole-path speed bound. A separate whole-cell correction enclosure, such as Section 3, is needed before certification. Alternatively one would need the full feasible-reference comparison with its position and velocity residuals, which is a different declared diagnostic. Silent clipping must not be described as the original ordinary residual.

### 4.4. Floating traces are approximations to the ideal endpoint data

The discrepancy arrays subtract old accelerations evaluated at `nextafter(left,right)` and `nextafter(right,left)`. Those are nearby interior points, not the mathematical endpoint traces. Since cubic acceleration is affine, their discrepancy from the limiting trace is the cell jerk multiplied by the small time displacement, before arithmetic error. The resulting stored coefficients can leave a small nonzero acceleration mismatch at an ordinary knot. The exact $C^2$ theorem therefore describes the ideal endpoint data; a certificate for the stored polynomial must either compute those traces consistently or enclose the remaining mismatch.

Very close grid points also require explicit handling. If neighboring event times are adjacent floating values, a nominal interior point formed by `left+q*h` may round to an endpoint, and `nextafter(left,right)` may equal `right`. The current code does not establish that every claimed Gauss point is strictly interior in floating arithmetic. This is a representation qualification, not a measured defect in the running grid. Shape, time-order and endpoint-coverage checks should accompany any reusable corrected instrument.

## 5. Meaning of the residual comparison

For an ordinary strict-interior reference, the residual is the reference acceleration minus the complete acceleration obtained from its own delayed source paths. The code recomputes old and new rows at the same chosen receiver times, and dynamic dispatch makes the new row call the new source reconstruction. Subject to the domain qualifications above, this is the correct direction for a dependent residual diagnostic; evaluating only against old sources would answer a different question.

Three-point Gauss quadrature is exact for scalar polynomials of degree at most five, but the norm of a delayed residual is not generally such a polynomial. Its root times, inverse ranges, transmitter factors, and vector norm are nonpolynomial functions. Visiting every cell therefore provides a quadrature over the full selected domain, not an upper bound on the residual integral or maximum. Selecting only some cells gives a quadrature over those cells; it cannot estimate the missing contribution without another argument. The code's separate all-cell flag is necessary and correctly distinguishes these cases.

A smaller sampled residual can motivate a certificate attempt. It does not establish pointwise residual reduction, an integral upper bound, discretization order, convergence of the history, or a smaller error in the actual release. Old and new rows share the same root/evaluation implementation, so their agreement or relative improvement is not independent evidence of root correctness. Complete revised input and dependency identities are also required for reproducing a retained correction array; the script hash alone is insufficient if an inherited evaluator or tagged history file changes.

## 6. Falsifiers, disposition, and validation

The endpoint theorem is falsified by any exact substitution yielding a nonzero added endpoint position or velocity, or an acceleration correction different from the prescribed discrepancy. Ordinary-node $C^2$ continuity is falsified by different one-sided corrected accelerations despite equal exact supplied acceleration data and correctly evaluated old traces. Event preservation is falsified by a changed source-zero front equality at a node where receiver and source birth positions are both exactly preserved. The whole-cell bounds are falsified by a polynomial value or derivative exceeding the displayed bounds under their stated coefficients and positive cell width.

The instrument issues have concrete checks: simultaneous channels must all appear in both total traces; a terminal node with unequal old acceleration traces must return the declared reconstruction-side derivative; and a queried superunit source must not silently enter a report labelled an ordinary strict-interior residual. A corrected instrument needs these controls before target use. The parent has acknowledged those three repairs and will preserve the running subject and its evidence before making them. This review does not adjudicate an uninspected repaired version.

Actual finite-history admission remains open. It requires the corrected reference's own complete speed/root domain, a validated residual and representation error, initialization, nonlinear source-time and event contributions, and rigorous propagation to the entire history required by the tail theorem. The original node data remaining fixed does not provide those bounds.

The subject SHA-256 measured before review was `3ac12532553da4eac6f03384f748b59e28fa90d1c127b9ca211ca0cfc716e38e`; the inspected diagnostic SHA-256 was `933744cce3ae34295912fad432a2dcfbdc6437f4b91decb67f2481b1a7f3255e`. Independent evidence here consists of algebraic differentiation, polynomial uniqueness, the exact degree-five control, Bernstein convex-combination bounds, and source-code tracing through the inherited evaluator. No numerical test result is attributed to this review.

Only this new review companion was authored. The parent owns the receiving [research account](overnight2-d-followup-and-research-2026-10-07.md), source repairs, and all target execution. No frozen subject, shared owner, running process, or existing evidence was changed by this review.

Final editorial receipt: repeat `shasum -a 256` reads returned both frozen identities above unchanged. File-scoped `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-reconstruction-independent-review.md` emitted no whitespace diagnostics (difference exit status 1). Explicit `test -f` checks passed for the four local link destinations; no fragment targets occur. The polynomial and Bernstein formulas were independently differentiated and reread; no controls, target run, or child agent was started.
