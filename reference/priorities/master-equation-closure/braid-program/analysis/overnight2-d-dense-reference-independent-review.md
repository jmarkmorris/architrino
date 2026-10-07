# Independent review of the high-order dense comparison reference

## Verdict and boundary

**Derived disposition:** the frozen [dense-reference instrument](overnight2-d-dense-reference.py) correctly converts the inspected SciPy nested dense polynomial to power coefficients and evaluates its first two time derivatives. Its source uses the derivative of the same position polynomial, with no source projection. Its method-of-steps guard prevents accepted root evaluations from using unfinished source history. The original complete comparison past and encoded initial state are retained rather than truncated or replaced by a late history segment.

No algebraic or source-coverage defect was found that blocks the proposed bounded pre-front numerical pilot. This is conditional numerical-method acceptance only. Pointwise speed guards do not prove global root uniqueness; the initialization remains an encoded approximation to the original literal preparation; and later source-zero receptions can lie inside smooth dense cells with unbounded-by-sampling residual contributions. The instrument is a research comparison reference, not a production EOM solver, validated evolution, or physical acceptance result.

**Measured controls:** the script's control mode passed in the shared venv, with oscillator value/derivative discrepancy `1.1695899804209375e-10`. A separate lightweight reviewer check passed seven-term endpoint identities and static-source completed-history, unfinished-history, and boundary-root cases. Neither run used the eight-member target. The subject SHA-256 before review was `1c64cbd0fb5f41f7db3eb8056a3bdad5943235ba98b16d71a9accaa51a6ae5b4`.

## 1. Nested polynomial conversion and derivative evaluation

The locally installed SciPy version was measured as `1.15.2`. Direct inspection of `Dop853DenseOutput._call_impl` shows that it starts at zero, visits `F` in reverse order, adds each vector, and multiplies alternately by $q$ and $1-q$, finally adding the old state. The reviewed `coefficients` routine performs exactly those polynomial operations: multiplication by $q$ shifts coefficients by one degree, while multiplication by $1-q$ adds the old coefficients and subtracts their one-degree shift. Thus it reconstructs the same polynomial in exact arithmetic. It adds its own floating conversion error; parity with the nested evaluator is not an interval equivalence claim.

For seven dense vectors $F_0,\ldots,F_6$, write the polynomial as $P(q)$. Independently expanding the outer factors gives

$$
P(0)=y_0,\qquad P(1)=y_0+F_0,
\qquad P_q'(0)=F_0+F_1,
\qquad P_q'(1)=F_0-F_1-F_2.
$$

The inspected SciPy construction has $F_0=\Delta y$, $F_1=hf_{\mathrm{old}}-\Delta y$, and $F_2=2\Delta y-h(f_{\mathrm{new}}+f_{\mathrm{old}})$. Substitution gives endpoint time derivatives $f_{\mathrm{old}}$ and $f_{\mathrm{new}}$. For the position components, the right-hand side is the numerical velocity state, so adjacent accepted position polynomials have the corresponding common endpoint velocity in exact arithmetic. Their second derivatives need not agree. This dense reconstruction is not being claimed $C^2$ at ordinary step boundaries.

The derivative evaluator is the differentiated Horner recurrence. If the current partial polynomial and its derivatives are $p,p',p''$, adding the next coefficient replaces them by $qp+c$, $qp'+p$, and $qp''+2p'$. The code updates the second derivative before the first, and the first before the value, so the recurrence uses the required old quantities. Dividing by $h$ and $h^2$ converts derivatives in $q$ to derivatives in time. The same recurrence applies to its vector and member-shaped coefficient arrays.

The symbolic three-vector control is exact: vectors $F=(2,3,5)$ with $y_0=7$ expand to $7+5q+2q^2-5q^3$. The degree-five derivative control uses $P(q)=q^5$, $h=2$, so the time derivatives are $(5/2)q^4$ and $5q^3$. Both expected answers follow directly without subject code. A separate reviewer control used seven vectors $F_k=k+1$, $y_0=7$, $h=2$, and checked endpoint values $7,8$ and derivatives $3/2,-2$.

The fixed reshape into eight power coefficients agrees with the seven-vector dense implementation inspected here. It is version-dependent implementation knowledge, not an invariant of an arbitrary future library. The reproducibility record should retain the SciPy and NumPy runtime versions alongside the source hashes when target evidence is used.

## 2. Completed-history source coverage

Let $t_n$ be the end of the completed source history and $t\ge t_n$ a trial receiver time in the next step. The minimum permitted delay is $\ell=t-t_n$. The routine evaluates the causal gap

$$
G(\tau)=\tau-|\mathbf x-\mathbf x_j(t-\tau)|
$$

at $\ell$ and requires $G(\ell)<0$. It then brackets a zero with $\tau>\ell$. Every bracket evaluation uses $t-\tau\le t_n$, and `DenseHistory.raw` separately rejects any positive source time beyond its saved endpoint. Negative source times use the complete analytic comparison past. Thus unfinished positive source history is not interpolated, extrapolated, or assigned zero.

Interpreting the gap sign as excluding all roots in the unfinished interval requires monotonicity of the source-root function. A complete reference with global speed below one supplies that monotonicity and root existence. The current query guards do not prove this global property between queries. Therefore the code gives a fail-closed evaluation discipline, while complete ordinary-root admission still needs a whole-cell reference-speed/separation proof. A successful numerical root alone does not establish a complete root census.

If a causal root lies exactly at $\tau=\ell$, its source time is the completed endpoint and is actually available. The strict `G(ell)>=0` rejection nevertheless stops. This is a conservative restriction, not use of missing history or a mathematical defect. A stopped run may need a smaller numerical step; it does not establish that the selected physical motion cannot continue.

The separate static-source check used reception $t=3$, completed endpoint $t_n=1$, and a stationary source at zero. At receiver coordinate three, the root is $\tau=3$, $S=0$, and the positive acceleration is $1/9$; the check accepted it and asserted that every source query satisfied $S\le1$. At receiver coordinate one, the root would have $S=2$ and the guard rejected it. At receiver coordinate two, the root has $S=1$ exactly and the conservative guard also rejected it. These known cases isolate the source-coverage behavior without an evolution target.

The local SciPy `_dense_output_impl` performs extra right-hand-side evaluations to build its dense coefficients. The reviewed loop calls it before appending the new cell to `hist`, so those extra evaluations are subject to the same completed-history restriction as the step stages. After the cell is appended, residual evaluations can use it as completed reference data. No second evolving trajectory is silently substituted into the source history.

## 3. Initialization and position-velocity compatibility

The instrument loads the original tagged initial position and velocity arrays and starts the new numerical state from those arrays. It does not start from the later old reference endpoint. Positive old nodes beyond zero are not reused as source history: accepted dense cells supply the new positive comparison history. The negative branch is the same joined rigid comparison past provided by the preparation reader.

That joined past includes the comparison-only constant position translation used to meet the encoded initial positions. The encoded initial velocity is the retained post-kick value; it is not recomputed as exact trigonometric velocity plus an exact kick in this instrument. Consequently original literal preparation and comparison initialization remain related by the prior representation-error bounds. The script does not establish those bounds afresh or eliminate them. The exact selected law, original preparation, original kick, unit constants, partner weights, and zero-self clause must remain attached to any later comparison claim.

For a completed positive source cell, `raw` returns the position polynomial and its derivative. The ordinary row denominator uses that derivative directly, without feasible-velocity projection. This fixes the source-side incompatibility that a separate velocity interpolant could introduce. During numerical stages the receiver state contains both position and velocity, and the right-hand side is $(V,A)$; the stage velocity is guarded. The completed position polynomial's derivative generally differs in the interior from the integrator's dense velocity-state polynomial. The code measures that difference as `max_kinematic_sample_mismatch` and correctly uses the position derivative when evaluating the reconstructed source and residual.

The exact-arithmetic dense endpoint identities give a compatible piecewise position path across accepted nodes. Floating integration, nested-to-power conversion, coefficient evaluation, and the analytic join can leave endpoint representation discrepancies. A rigorous reference must specify whether it is defined by exact encoded coefficients, exact endpoint data with an interpolation rule, or another explicit construction, and then bound every mismatch in that representation. Sampled kinematic mismatch is not a bound on those endpoint discrepancies. The initial source-zero velocity jump is retained as a prescribed trace change, not interpreted as a positive-time physical velocity reset.

## 4. Source-zero receptions and later nonsmooth cells

The event monitor is $t-|\mathbf x_i(t)-\mathbf x_j(0)|$. The code detects an endpoint transition from negative to nonnegative, locates a floating zero inside the accepted dense cell, and records the ordered channel and cell. It does not split or restart the DOP853 step at that reception, and it does not modify velocity there. This is consistent with constructing an approximate comparison path through an acceleration jump, provided the resulting event-cell residual is explicitly accounted for.

A smooth dense polynomial cannot reproduce a nonzero acceleration jump pointwise. Nominal smooth order-eight integration and degree-seven dense interpolation do not by themselves give their smooth-case accuracy across that jump. Adaptive error control may reduce steps, but neither that response nor event logging supplies a bound on the omitted defect. A later rigorous residual calculation must locate the front, use the correct one-sided acceleration rows, and cover the entire event cell or a validated event slab with all possible injection times.

The monitor is strictly increasing if the whole receiver path stays below unit speed. Under that hypothesis a channel crosses a source-zero front at most once. Endpoint sign changes alone do not establish this hypothesis or exclude a crossing followed by a return between sampled endpoints. Close or simultaneous channels remain separate event records; this preserves their labels but does not prove a common event ordering. The monitor's endpoint uses the accepted state position, while its root callback uses the dense polynomial, so finite arithmetic also needs an endpoint-consistency allowance when a monitor value is very close to zero.

At an exact source-zero query, the inherited negative-time convention returns the left velocity trace. A single point value is immaterial to an almost-everywhere residual integral, but root-location error can select the wrong side over a small nonzero numerical interval. That error must be enclosed for certification. No new event law is authorized by this numerical reference.

## 5. Meaning of the numerical controls and remaining obligations

The constant-velocity root control is independent of root iteration: for source position $\mathbf v s$, receiver position $\mathbf r$ at time zero, and $|\mathbf v|<1$, solving $\tau=|\mathbf r+\tau\mathbf v|$ gives

$$
\tau=\frac{\mathbf r\cdot\mathbf v+\sqrt{(\mathbf r\cdot\mathbf v)^2+(1-|\mathbf v|^2)|\mathbf r|^2}}{1-|\mathbf v|^2}.
$$

The expected direction and transmitter denominator then follow directly. The harmonic oscillator control has independent exact position $\cos t$ and derivatives $-\sin t,-\cos t$. Those controls test root evaluation and dense differentiation on known smooth inputs. They do not validate the original eight-member release or its later source-front behavior.

The target's three fixed interior residual points are samples, not interval extrema or a validated residual integral. Its minimum root factors and delays and maximum source speeds are also sampled query metadata. No convergence order, complete prefix enclosure, or actual tail entry follows from these values. The correct next certification obligations are complete reference-domain bounds, explicit endpoint and initial representation errors, event/knot residual bounds, and a validated nonlinear error-propagation argument through the full finite history required by the tail theorem.

The source-bracket and speed guards may stop before those obligations are met. Such a stop is diagnostic evidence about the chosen method or reference domain; it is not evidence of a physical obstruction. No root suppression, history truncation, source projection, or additional physical event response should be introduced to bypass it.

## Validation and falsifiers

The coefficient conversion is falsified by an exact nested polynomial whose converted coefficients represent a different polynomial. The derivative evaluator is falsified by a known polynomial yielding incorrect scaled derivatives. The source-coverage implementation is falsified by an accepted source query beyond the completed history, while a rejected boundary root is merely conservative. A claimed compatible source is falsified if its returned velocity differs from the derivative of its declared position polynomial. The independent controls and explicit identities above are checkable witnesses for these claims.

This reviewer ran:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 PYTHONDONTWRITEBYTECODE=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-dense-reference.py controls
```

It returned exit zero and `PASS`, reporting oscillator maximum `1.1695899804209375e-10`. Direct `inspect.getsource` reads of the local SciPy dense evaluator and constructor established the implementation identity used in Section 1 and measured version `1.15.2`.

A separate in-memory shared-venv script imported the frozen subject, built $F=(1,2,3,4,5,6,7)$ and $y_0=7$, checked its endpoint values and $h=2$ derivatives, then applied `row` to the three static-source cases in Section 2. Its source callback asserted `s<=1` on every call. It returned `PASS: seven-term endpoint identities; static completed-source root; unfinished and boundary-root rejection; all source queries within completed history`. All these inputs have independently known answers; no target history was processed.

Only this new review companion was authored. The existing subjects and earlier reviews were not edited. The parent owns the receiving [research account](overnight2-d-followup-and-research-2026-10-07.md), numerical targets, and later integration. No target computation, child agent, or sidebar message was started by this review.

Final editorial receipt: repeat `shasum -a 256` returned the unchanged subject identity `1c64cbd0fb5f41f7db3eb8056a3bdad5943235ba98b16d71a9accaa51a6ae5b4`. File-scoped `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-dense-reference-independent-review.md` emitted no whitespace diagnostics (difference exit status 1). Explicit `test -f` checks passed for both local link destinations; there are no fragment targets.
