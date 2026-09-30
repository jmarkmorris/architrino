# Independent assessment of later-motion certification

## Verdict and scope

**Accepted as a computer-assisted derivation for the fixed control: both targets have exactly three consecutive vertical turns on $5/4\le t\le2$, and the following upward excursion is less than one third of the preceding downward excursion.** The physical equation remains the unmodified Master Equation for the same infinite alternating lattice, supplied past, fixed stationary block sum, $g=16$ and $c_f=1$. The argument encloses the original stationary field in both stages; it does not insert a damping term or infer one from the motion.

| Claim | Current assessment |
| --- | --- |
| Source-to-target residual propagation | Accepted; the looser profile's hypotheses pass for the frozen candidate |
| Exact dyadic Hermite definition and shared-node $C^2$ joins | Accepted |
| Retained archive shapes, finite nodal values, 76 source identities and exact early zeros | Independently checked |
| Continuous source and target tube enclosures | Accepted on all declared polynomial cells |
| Complete source and target residual budgets | Accepted with $\rho_s=10^{-10}$, $\rho_t=10^{-9}$ |
| Actual later velocity reversals and consecutive excursion comparison | Accepted on $[5/4,2]$; the following excursion is below one third of its predecessor |
| Eventual damping or typical populated-universe behavior | Not established |

The independent evidence is a fresh derivation, separately authored exact propagation arithmetic, direct high-precision implicit-row checks, and an exact rational Bernstein verification of the continuous sign windows. The contributor's propagation arithmetic was not read or executed. The approximate path constructor, frozen residual checker and turn checker were inspected as subjects. One unchanged full residual replay supplements those independent checks; replay is not counted as an independent mathematical reference. No reviewed subject, earlier adjudication, approximant, numerical instrument or shared tracker was edited. The earlier [continuation adjudication](smooth-two-particle-later-independent-adjudication.md) remains an accepted dependency; its existence theorem is not being re-established by numerical success.

This acceptance closes the numerical-error and exact-comparison-tube gap left by the earlier later-motion comparisons. It does not settle the trajectories as $t\to\infty$, classify a different coupling or preparation, certify a horizontal separation sign at the new endpoint, or prove decay in every coordinate. The [mathematical synthesis](smooth-two-particle-later-certification.md) gives the result's full fixed-history context.

## 1. Propagating an error against the unchanged equation

Let $y_j$ denote an actual environmental source displacement and $P_j$ its polynomial approximation on $[0,a]$, where $a=33/32$. The accepted causal cutoff means these source equations contain only the exact original target pulses and the full stationary field $gS_0$. Let $Z_i$ approximate the receiving target through time two. Its target equation receives the complete known source prefixes, including both original exciting pulses for each reused source.

For the row $Q=K(R)/D-K(R_0)$, $K(R)=R/|R|^3$ and $D=1-n\cdot U'(s)$, differentiating the implicit root gives $D_y s=-n^{\mathsf T}/D$. Subtracting $DK(R_0)$ before taking norms gives the receiver-position bound

$$
\mathcal L(P,V,A,r)=\frac{24P}{r^4}
+\frac2{r^3}\big[(1-V)^{-2}-1\big]
+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3}.
$$

The last term includes source acceleration because a change in receiver position changes the sampled emission time. Omitting that acceleration term would invalidate the propagation constant even though the instantaneous acceleration law contains only emitted position and velocity.

The actual and polynomial sources lie in the ball $b_s=1/60000$, with speed at most $v_s=1/16000$ and acceleration at most $A_s=1/400$. The old pulse has amplitude $1/314928$, speed $1/8192$ and the inherited acceleration ceiling $3/8$. Each active old range exceeds $7/5$. Adding the stationary derivative $3gCb_s^2$, $C=1400$, gives independently

$$
L_s<6.132465<7.
$$

If the complete source residual has norm at most $\rho_s$, exact initial position and velocity imply

$$
|y_j-P_j|\le\frac{\rho_s}{7}\bigl(\cosh(\sqrt7t)-1\bigr),
\qquad
|y_j'-P_j'|\le\frac{\rho_s}{\sqrt7}\sinh(\sqrt7t).
$$

This follows by twice integrating the error equation and iterating the nonnegative integral kernel. At $a$, the two gain factors are below $0.955298$ and $2.880756$. Thus the subject's simpler bounds $E_P=\rho_s$, $E_V=3\rho_s$ are valid over every sampled source time. The source residual includes $gS_0(P_j)$, so these are errors directly against the original equation; there is no intermediate background-free exact dynamics in this proof.

At a fixed receiver, source errors move the causal root by at most $E_P/(1-v_s)$. The received source position therefore differs by at most $E_P/(1-v_s)$, and the received velocity by at most $E_V+A_sE_P/(1-v_s)$. Combining the kernel and denominator changes gives the subject's history coefficients

$$
C_P(r)=\frac{2r^{-3}}{(1-v_s)^2}
+\frac{v_sr^{-3}+A_sr^{-2}}{(1-v_s)^3},
\qquad C_V(r)=\frac{r^{-2}}{(1-v_s)^2}.
$$

For a target inside $B_t=10^{-5}$, its five unit-distance, twelve face-diagonal and four body-diagonal source identities have safe rational range floors $99/100$, $7/5$ and $12/7$. All actual and trial source roots remain below $1+B_t+b_s<a$. The full target receiver Lipschitz constant, including $3gCB_t^2$, is below $0.611380<1$. Independently evaluated exact fractions give

$$
H_P+3H_V<934.961202<940,
\qquad H_P=g\sum_jn_jC_P(r_j),\quad H_V=g\sum_jn_jC_V(r_j).
$$

With complete target residual $\rho_t$, put $q=\rho_t+(H_P+3H_V)\rho_s$. Both target paths have zero data through $t=1$. For $w=(t-1)_+\le1$, their position and velocity differences are therefore bounded by $q(\cosh w-1)$ and $q\sinh w$. The acceleration difference on each open polynomial cell is at most the position error plus $q$.

The independent rational and positive-series reconstruction gives:

| Residual profile | Target position error | Target velocity error | Target acceleration error on cells |
| --- | ---: | ---: | ---: |
| $\rho_s=10^{-10}$, $\rho_t=10^{-9}$ | $<5.131902\times10^{-8}$ | $<1.110520\times10^{-7}$ | $<1.458152\times10^{-7}$ |
| $\rho_s=10^{-11}$, $\rho_t=10^{-9}$ | $<5.620674\times10^{-9}$ | $<1.216288\times10^{-8}$ | $<1.597029\times10^{-8}$ |

These are stricter than the rounded bounds in the subject. Even its looser position error plus the required polynomial radius is $9.06\times10^{-6}<B_t$, closing the temporary actual-target tube by a first-exit argument. This propagation statement is conditional on its residual and polynomial hypotheses; Section 4 verifies every required hypothesis of the looser profile for the frozen archive, completing acceptance of the stated error bounds.

## 2. Causal inactivity, joins and the actual-law residual

The polynomial source histories must be exactly zero through their stated conservative first-onset cuts. Small sampled values do not suffice. The exact cuts exclude premature trial rows outside the accepted 21-source target set: the maximum sampled times for the excluded source families are, respectively,

$$
B_t+b_s<1/32,\qquad
2+B_t+b_s-12/7<11/32,
$$

$$
2+B_t+b_s-7/5<39/64<27/32.
$$

These strict rational comparisons were independently checked. They cover both tied nearest excluded families from the earlier adjudication. The fixed target-emitter prefix in the exact reduced equation is stationary through $a$; no evolving target source is received on this horizon. The retained target archive also has a stronger exact zero prefix through $1063/1024>a$, so it supplies no discrepant target-emitter trial history in that prefix.

For propagation, exact $C^1$ joins and absolutely continuous velocity suffice. A velocity jump would contribute an impulse not covered by an open-cell residual bound. The retained approximant has stronger $C^2$ joins: shared stored endpoint positions, velocities and accelerations define the same endpoint values in adjacent exact Hermite polynomials. Its third derivative can jump. A Taylor residual bound must stay inside a target polynomial cell; across a source knot it must enclose the required one-sided derivatives. The latter is valid because source acceleration is continuous and source jerk is piecewise bounded.

The complete residual is the polynomial acceleration minus the exact reduced Master Equation evaluated on the same approximation data. Bounding the stationary term by its norm ball $22400|P_j|^3$ or $22400|Z_i|^3$ encloses that unchanged term. Centering that ball at zero does not assert that the field is zero. The full residual budget must add this ball at both source and target stages, rather than append a damping estimate or ignore the earlier field's influence on source history.

## 3. Exact nodal approximant audit

The [approximant definition](smooth-two-particle-later-approximant.md) treats each binary64 nodal value as the exact dyadic rational encoded in its bits. Solving the six Hermite endpoint conditions independently gives the same quintic as the subject. Universal symbolic substitution verifies position, first derivative and second derivative at both ends. Consequently a single shared finite node defines exact $C^2$ joins for all cells; no floating coefficient table is presumed to join exactly.

After those known identities passed, the independent archive audit read `.local-data/master-equation-closure/later-certification/approx/approximant-h1024.npz`. Its hash matched its manifest. All six nodal arrays have finite binary64 values, the stated shapes, and exact zero initial data. The lattice-label set contains exactly the required 76 environmental sources, and the six receiver labels have the documented order. All source early-zero cuts passed on every stored position, velocity and acceleration node. The two target candidates have exact zero nodes through index 1063, and hence their entire cells through time $1063/1024$ vanish identically.

These findings establish a mathematically unambiguous continuous candidate. They do not establish its accuracy or any continuous residual maximum. Candidate construction may use an equation that omits the background because it only proposes data; acceptance must compare those data with the unchanged equation.

## 4. Accepted full-law residual certificate

The frozen [residual checker](smooth-two-particle-later-residual.py) uses outward intervals for elementary operations, reconstructs Hermite coefficients from exact floating-point nodes, and encloses reception-time Taylor coefficients through order two. Independent differentiation of $s+|R_0-U(s)|=t$ gives

$$
s'=\frac{1-n\cdot Z'}D,
\qquad
\frac{s''}{2}=-\frac{(|w|^2-(n\cdot w)^2)/r+n\cdot(Z''-U''(s')^2)}{2D},
\quad w=Z'-U's'.
$$

The source-velocity Taylor coefficients are $U'$, $U''s'$ and $U''s''/2+U'''(s')^2/2$. The checker includes the $U'''$ term; omitting it would invalidate the second residual derivative. Its centered finite-row defect formula has the correct structure

$$
E(t)\in E(m)+E'(m)(t-m)+\tfrac12 E''(I)(t-m)^2.
$$

The nonnegative square interval must contain every $(t-m)^2$, and the remainder derivative must cover every intersected source piece. The stationary norm ball is added after this finite-row enclosure, avoiding an unsupported derivative expansion of the infinite field.

### 4.1. Root inclusion, arithmetic and piece coverage

The initial source-time radius is an outward upper bound on the complete source displacement. For a fixed reception and receiver position, the endpoints $s_\pm=t-|R_0|\pm b$ bracket a root because $s+|R_0-U(s)|-t$ is nonpositive at $s_-$ and nonnegative at $s_+$. The global source speed bound makes that residual strictly increasing. Every intersection with $t-|R_0-U(S)|$ therefore retains the unique root in $S$; contraction is not used as a substitute for an initial existence bracket. The final code rounds the radius above $1/314928$ for the old pulse and above $1/60000$ for generated histories. Each evaluated root denominator must have a strictly positive interval lower bound. The accepted range and speed arguments exclude additional roots and positive self roots; the zero-delay diagonal is unevaluated.

Reading the final implementation confirms that each addition, multiplication and reciprocal expands its floating result outward. Negation and hull/intersection endpoints introduce no rounding. Squares use the exact nonnegative lower bound when the input crosses zero; square roots are additionally accepted only after outward squares verify both endpoints. The all-cell state bounds keep the target operations finite and range-safe. The argument uses the host's binary64 elementary arithmetic, with the directed endpoint expansion and explicit square checks recorded by the instrument; it does not treat an ordinary floating estimate as an interval.

The final grid and subdivision checks require powers of two and a bounded grid product. With the frozen archive, $h=1/1024$ and subdivision eight, every receiver interval has exact dyadic width $1/8192$, every midpoint is exactly representable, and each interval lies inside one target polynomial cell. The loop covers 8,448 intervals for each of the 76 sources and 16,384 intervals for the right target. Input shape, finite nodal data, exact lattice identities and early-zero checks precede residual evaluation. Source-time evaluation intersects every touched history piece and takes their derivative hulls, including both one-sided jerks at a source knot. No source value beyond $33/32$ is extrapolated.

The interval sum uses the exact checkerboard signs and original transmitter factor. Its output combines Cartesian component bounds into an outward Euclidean norm. The stationary contribution is added to each cell's total bound at both stages. The maximum is taken over those total cell bounds, not by assuming that maxima of different terms occur at the same time.

### 4.2. Independent row checks and complete replay

The separately authored `rows.py` constructs the received row directly from an 80-digit solution of its implicit range equation. It differentiates that complete expression, rather than using the checker's Taylor formulas. Its own known controls first matched affine-source and quadratic-source causal rows, including their first two reception derivatives, to separate closed forms. Only after that recorded pass did it inspect eight nonconstant rows drawn from the frozen source and target polynomials. Every Cartesian component through the second time coefficient lay inside the subject's interval. An additional exact $C^2$ cubic-onset source crosses a history knot where jerk jumps; four reception points on both sides also lie inside the interval jet. These checks independently test the nonconstant root derivative and knot handling. They are scoped point/row checks, not substitutes for the complete residual enclosure.

The unchanged residual checker was then replayed once, after its own known controls passed, with only its output directory redirected to reviewer-owned scratch. It returned the same all-cell bounds as `certified-full-s8.json`:

| Certified quantity | Outward upper bound, rounded upward | Required ceiling |
| --- | ---: | ---: |
| Source polynomial displacement | $1.152181\times10^{-6}$ | $1/60000$ |
| Source polynomial speed | $1.883765\times10^{-5}$ | $1/16000$ |
| Source polynomial acceleration | $6.915457\times10^{-4}$ | $1/400$ |
| Target polynomial displacement | $4.651661\times10^{-6}$ | $9\times10^{-6}$ |
| Complete source residual | $9.471749\times10^{-11}$ | $10^{-10}$ |
| Complete target residual | $1.539527\times10^{-11}$ | $10^{-9}$ |

The included stationary-field contributions have maxima below $3.422589\times10^{-14}$ for sources and $2.254303\times10^{-12}$ for the target. Their inclusion is also verified by the code path, independently of their small numerical sizes. The source residual is the closer budget: it passes the looser profile, not the tighter $10^{-11}$ source profile. The full replay took 37.762 seconds by that execution's internal timer; this is a measured replay cost, not a comparative performance claim.

The reviewed formulas, source coverage, exact joins, interval arithmetic and complete receipt jointly satisfy the looser propagation theorem. Thus the uniform actual-target errors are below $6\times10^{-8}$ in position, $1.2\times10^{-7}$ in velocity and $2\times10^{-7}$ in acceleration on the polynomial cells, with the stated endpoint interpretation. These are errors against the original infinite-lattice equation.

## 5. Independently certified turns and excursions

With the residual profile accepted, a polynomial velocity at an endpoint whose magnitude exceeds the velocity error supplies the actual sign. Opposite endpoint signs give at least one actual reversal. A fixed polynomial acceleration sign exceeding the acceleration error makes actual velocity strictly monotone there and gives uniqueness within the window. Continuous velocity-sign coverage between windows is additionally needed to call the turns consecutive. The frozen [turn checker](smooth-two-particle-later-turns.py) performs all these interval tests, binds its input to the residual checker and archive, and preserves the common trough in its ratio calculation.

The independent `turns.py` uses exact rational Bernstein coefficients rather than the subject's interval Horner evaluation. For a cell polynomial $p(\theta)=\sum_{j=0}^na_j\theta^j$, its Bernstein coefficients are

$$
b_k=\sum_{j=0}^k\frac{\binom{k}{j}}{\binom{n}{j}}a_j.
$$

The basis functions $\binom nk\theta^k(1-\theta)^{n-k}$ are nonnegative and sum to one on $[0,1]$, so $p$ lies between the minimum and maximum $b_k$. Applying this identity to the exact differentiated Hermite coefficients gives a continuous bound on each cell, without sampling. Known controls for the quadratic coefficients, a quintic power/Bernstein identity, endpoint derivatives and the common-trough ratio passed before the archive was used.

Every relevant source-data and receipt identity matched before this independent sign calculation. Exact rational bounds covered all 768 target polynomial cells on $[5/4,2]$, partitioned between three turning windows and four sign intervals. They prove:

| Actual turn | Exact time window | Independent enclosing height in $10^{-6}\ell$, rounded outward |
| --- | --- | --- |
| Maximum | $[1545/1024,1547/1024]$ | $[4.591093,4.711429]$ |
| Minimum | $[1878/1024,1881/1024]$ | $[-0.428117,-0.307786]$ |
| Maximum | $[2019/1024,2024/1024]$ | $[0.980321,1.100835]$ |

The actual acceleration is strictly negative, positive and negative in these respective windows. The independent actual velocity enclosures on the four intervening intervals are, with outward rounding,

$$
[3.165800\times10^{-7},8.136717\times10^{-6}],\quad
[-4.707942\times10^{-5},-2.980572\times10^{-7}],
$$

$$
[2.387971\times10^{-7},1.803108\times10^{-5}],\quad
[-1.988131\times10^{-6},-2.561515\times10^{-7}].
$$

None includes zero. There are exactly three consecutive turns on this declared interval. The actual vertical histories of the two targets agree by the accepted reflection symmetry of the unchanged equation and complete past; no numerical symmetry tolerance is needed for that conclusion.

Let consecutive certified heights be $M_1,m_2,M_3$, with downward excursion $D=M_1-m_2$ and upward excursion $U=M_3-m_2$. When both excursions are positive, $M_3<M_1$ proves $U<D$ because the common trough cancels. For enclosing height intervals $[A_-,A_+]$, $[B_-,B_+]$, $[C_-,C_+]$ with the subject's strict ordering, differentiating $(C-B)/(A-B)$ shows it decreases with $A$ and $B$ and increases with $C$. This reconstructs the ratio enclosure

$$
\frac{C_--B_+}{A_+-B_+}\le\frac UD\le
\frac{C_+-B_-}{A_--B_-}.
$$

The exact Bernstein calculation gives the stronger outward summary

$$
0.256635<\frac UD<0.304620<\frac13.
$$

Its exact rational endpoints are retained in `turns-target.json`. They also independently confirm the subject's slightly wider enclosure $[0.25662338783195393,0.30464640934261117]$. Thus a smaller following excursion is established for the fixed supplied history. No damping mechanism or conclusion about future excursions is inferred from this finite result.

## Development evidence and limits

The separately authored `.tmp/mec-008-later-certification/moore/check.py` passed known controls before reading the target archive or evaluating propagation constants: universal six-endpoint Hermite identities, exact quintic recovery, binary64-to-dyadic conversion, positive-series base cases and a constant-acceleration Volterra integral. The `known.json` receipt is bound to its source hash. Target mode then passed 17 strict exact comparisons and the archive checks above. `target.json` retains exact fractions, positive margins, archive identity and the three reviewed mathematical/approximant source identities.

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/moore/check.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/moore/check.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/moore/rows.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/moore/rows.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/moore/turns.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/moore/turns.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/moore/replay.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/moore/replay.py target
```

The row and Bernstein instruments have separate known-control receipts and script identities. The former checks its frozen residual subject before and after the run; the latter checks the archive and full residual receipt. The complete replay writes only under `.tmp/mec-008-later-certification/moore/replay/`; its known controls precede its target use. The reviewed source bytes and output identities are retained in those receipts. The mathematical synthesis was read for claim grading; its fixed-history, unchanged-equation and finite-interval restrictions agree with this assessment.

At completion, `shasum -a 256` on the propagation subject, approximant note, approximant constructor, residual checker and turn checker matched the corresponding retained review or known-control receipts. This adjudication passed `git diff --no-index --check /dev/null` against its exact Markdown path. These checks establish byte continuity and whitespace status; the mathematical and numerical acceptance comes from the separately described derivations, enclosures and controls.

No blocker remains for this fixed finite-interval certification. The unresolved questions are later continuation and excursions, eventual settling, the other coordinates at comparable accuracy, other couplings, and physically self-consistent preparation. A failed exact join, false early-zero assertion, excluded source that can enter, missing stationary contribution, invalid interval operation, uncontained root, omitted knot derivative, failed propagation margin or uncertified velocity-sign interval would invalidate the corresponding strengthened claim. A later growing excursion would not invalidate these already certified finite-interval inequalities.
