# Propagation helper interface and whole-cell tube obligations

**Grade: implementation contract for the accepted propagation method.** The [derived method](authorized-cases-ten-hour-e-propagation-method.md) has [independent mathematical acceptance](authorized-cases-ten-hour-reference-e-propagation-adjudication.md). The [helper](../evidence/authorized-cases-ten-hour-e-propagation.py), SHA-256 `a1b850177383f0aa2fff17e6014b9e3305f9240010b33a25c8b480b0533284ba`, has separate [conditional instrument admission](authorized-cases-ten-hour-reference-e-propagation-instrument-admission.md). Neither acceptance certifies a target coefficient without the domains below.

The helper imports only the frozen directed interval helper version two, SHA-256 `73ffb3275981a367ef039b9d06dc7d37817b1bb7e514557ecb30fbb4cfd634fa`. Its [known receipt](../evidence/authorized-cases-ten-hour-e-propagation-known.json) records ten analytical controls passing at 05:55:38 UTC before target use, including full nonzero source acceleration and jerk, directed norms, signed summation and the finite comparison. The shared venv executed this short check. No numerical target or long process was launched by this worker.

## Two different interval domains

For each receiving cell and each of its twelve directed hits, the caller provides whole-cell interval enclosures of range, ray, source velocity, source acceleration, source jerk and current receiver velocity. The cell covers every reception time and source piece used by the proof. A source seam requires a union bound or separately certified comparison correction.

The **current receiver domain** encloses the line segment between the actual and trial current receiver states, while the completed source curve is held equal to the trial. Its auxiliary roots must lie strictly in completed history. Call `jacobian(R,n,v,a,jerk,u)` on this domain, then `signed_sum` with the original three polarity products per receiver. Call `block_coefficients(A,B,gamma)` only after this signed sum. The result encloses the weighted growth coefficient, position-Jacobian norm and receiver-velocity-Jacobian norm. Skewness is an exact theorem of the row; interval widths in the stored matrix are not an additional physical symmetric term.

The **completed source discrepancy domain** compares the actual and auxiliary trial source-root evaluations at the same actual receiver state. It must enclose the full independent-input segment between their tuples $(R,n,v,a,u)$, including the acceleration error of the completed source. The receiver velocity is held identical for each such comparison, but its possible values over the receiving tube are still enclosed. The partial matrices returned by `jacobian` are valid on this larger tuple domain even though intermediate rays need not have unit length. The current-root Jacobian returned in the same call is not used for this purpose.

Call `source_from_partials(row,b,ell,A0,J0)` on that second domain. It returns sharper positive coefficients using directed norms of $F_R,F_n,F_v,F_a$ rather than the global speed-only estimates. Specifically,

$$
P_x=\frac{|F_R|+2\|F_n\|/\ell+\|F_v\|A_0+\|F_a\|J_0}{1-b},\quad
P_v=\|F_v\|,\quad P_a=\|F_a\|.
$$

Every displayed norm denotes its certified supremum on the complete tuple domain. The supplied source errors and $A_0,J_0$ bounds cover the union of both root neighborhoods and the interval between the roots. A narrow nominal geometry box cannot be reused for either domain without proving the required inclusion. The broader `source_coefficients` function implements the accepted conservative fallback; it is not a claim of numerical feasibility.

## Cell recurrence and acceptance inequalities

Fix a positive rational weight per receiver, or explicitly retain the method's norm-change factor at every change. Given each prior weighted radius and the completed-source errors, form the nonnegative forcing upper bound from the whole-cell residual plus all three directed source contributions. `step(radius,forcing,width,coeff)` returns upper bounds for the whole-cell weighted radius, position, velocity and acceleration errors. The acceleration error includes the receiver-velocity matrix norm even though that matrix contributes no positive term to current weighted-norm growth.

For every target receiving cell, the proof record must establish all of the following:

1. Actual and auxiliary root windows precede the completed-history face, and the receiving width is below their certified delay floor.
2. The complete past and generated prefix retain strict speed, positive separation, all twelve ordinary partner roots and no positive-delay self root.
3. The intervals used by the Jacobian and source coefficients include their different full domains, including every crossed analytic or polynomial seam.
4. The propagated position, velocity and acceleration bounds stay strictly inside the error caps used to construct those domains. A failed cap is a failed enclosure, not an actual physical event.
5. The next completed-source record stores acceleration as well as position and velocity bounds, with no forgotten initial-history discrepancy.

For the exact reconstructed preparation, the trial and physical supplied past agree, and the release position/velocity errors are zero. That identity belongs to the E trial owner and must be invoked explicitly. If a different serialized patch or launch knot is used, its discrepancy must instead be supplied; zero error is not inferred from a file label.

The method does not require a delayed-acceleration gain below one, but large positive delayed gain can make the finite recurrence useless. A nominal exact-circle gain cannot replace the directed tube sum of the actual $\|F_a\|$ coefficients. Failure to beat the departure-observable error budget is likewise a certificate limitation.

## Polynomial source extension for residual cells

The same source-coefficient function can compare a local polynomial extension with the real piecewise trial across a source seam. This is a residual comparison device only. Enclose their position, velocity and acceleration differences on the whole union of both local root neighborhoods and the intervening source interval. Prove both local roots exist and the relevant gaps remain monotone. The independently retained complete root census belongs to the real trial, not to the polynomial extension.

With those hypotheses the root shift is bounded by the position discrepancy divided by $1-b$, and the response discrepancy is bounded by $P_xe_x+P_ve_v+P_ae_a$. Add that correction, for all three hits, to the polynomial-extension Taylor residual bound. There is no claim that the extension is a complete physical source, and no replacement of the prescribed history or generated trial. The E worker owns these polynomial difference and root proofs.

A numerical propagation pilot or longer certificate still needs a separately frozen input manifest and independent output assessment. The current deliverable is an admitted, known-case-tested recurrence with explicit caller obligations. It establishes no actual target departure by itself.
