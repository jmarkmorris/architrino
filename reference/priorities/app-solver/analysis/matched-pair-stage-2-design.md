# Matched-Pair Enclosure, Stage 2 Preparation: Piecewise Windows and Error-Carrying Histories

This record prepares Stage 2 of the [matched-pair integration scope](../contracts/matched-pair-enclosure-integration-scope.md): the extension of the grouped two-source enclosure from one error-free cubic slab to a search window that spans several segments of each source and to histories that carry reconstruction error radii. It states the extended theorem with its proof, says exactly which properties of a history carrier the proof relies on and which carriers are known to have them, and gives the outward construction and the controls. It is preparation in a new file. Stage 2 has not been released by the reviewer, nothing here is implemented, and the Stage 1 route on the live checkout is unchanged. All numerical instances use $c_f=1$.

The reasoning uses only the canonical kernel of the [Master EOM Binding](../contracts/master-eom-binding-v1.md) and the geometry of prescribed histories. It was derived before reading the reviewer's preparation note; afterwards three lines of that note were read, which describe the same structure of a nominal acceleration bound plus explicit velocity error allowances. The reviewer's derivation remains separate.

## 1. Why Stage 1 does not already cover these cases

Stage 1 takes each source's second derivative from one cubic and treats that cubic as the source history itself. Two things break when the window crosses a segment join or the segment carries error radii. First, a single cubic no longer describes the window. Second, and more seriously, an error radius on position and velocity says nothing about acceleration: a true path may wiggle inside its position and velocity tubes with arbitrarily large second derivative, so the nominal cubic's acceleration is not a bound on the true one. The scope states this as a requirement: position and velocity error radii are never differentiated into an acceleration claim.

The extension below needs no bound on the true acceleration. The place where Stage 1 used it was the change of one source's velocity between the two emission times. That change can be split into the change of the nominal velocity, which the nominal acceleration does bound, plus the velocity error at each of the two times, which the velocity error radius bounds directly.

## 2. Setting and hypotheses

Fix a receiver box $\mathcal R$ containing the true receiver position at the exact reception time $T_r$, and a window $I=[S_0,T_r]$. Each source $\pm$ has a nominal history $\mathbf P_\pm$ on $I$ that is a cubic polynomial on each of finitely many contiguous segments, with componentwise position and velocity error radii $\mathbf e^x_\pm$ and $\mathbf e^v_\pm$ that are constant on each segment. Write $\varepsilon^x_\pm$ and $\varepsilon^v_\pm$ for upper bounds, over the window, of the Euclidean norms of those radius vectors.

The true source histories $\mathbf X_\pm$ are assumed to satisfy three hypotheses.

- **H1, a path.** $\mathbf X_\pm$ is absolutely continuous on $I$ with derivative $\mathbf V_\pm$ almost everywhere. In words: the source moves continuously and its position is the time integral of its velocity.
- **H2, the tubes.** At every time $S\in I$, $\mathbf X_\pm(S)$ lies within $\mathbf e^x_\pm$ of $\mathbf P_\pm(S)$ and $\mathbf V_\pm(S)$ lies within $\mathbf e^v_\pm$ of $\dot{\mathbf P}_\pm(S)$, componentwise, with the nominal curve and radii of the segment containing $S$; at a join both adjacent segments' statements hold.
- **H3, the same velocity.** The $\mathbf V_\pm$ of H2 is the derivative of H1. This is what "derivative-compatible" means: the velocity tube encloses the actual rate of change of the position, not some other quantity.

Define, over the whole window: a convex set $\Omega$ containing both position tubes, at distance at least $r^->0$ from every point of $\mathcal R$; a speed bound $v^+<1$ on the velocity tubes; the nominal equal-time separation bound $\ell_0\ge\|\mathbf P_+(S)-\mathbf P_-(S)\|$; the nominal equal-time relative velocity bound $w_0\ge\|\dot{\mathbf P}_+(S)-\dot{\mathbf P}_-(S)\|$; a nominal acceleration bound $a_0\ge\|\ddot{\mathbf P}_\pm(S)\|$ inside segments; and $J\ge$ the sum, over the joins of either source inside the window, of the norm of the jump of that source's nominal velocity across the join. Put $\nu$ any number with $0<\nu\le1-v^+$, and

$$
\ell^+=\ell_0+\varepsilon^x_++\varepsilon^x_-,\qquad
\omega^+=w_0+\frac{a_0\,\ell^+}{\nu}+J+\varepsilon^v_++\varepsilon^v_- .
$$

## 3. Theorem

Under H1 to H3 and the bounds of section 2, let the residual of each source be $g_\pm(S)=\|\mathbf y-\mathbf X_\pm(S)\|-(T_r-S)$ for the true receiver point $\mathbf y\in\mathcal R$. If $g_\pm(S_0)<0$ for every point of the box and both sources, each source has exactly one causal root in $I$, strictly inside it, and the pair's acceleration has every component in $[-B,B]$ with

$$
B=C\left[\frac{(2\nu+v^+)\,\ell^+}{(r^-)^3\nu^3}+\frac{\omega^+}{(r^-)^2\nu^2}\right],\qquad C=|\kappa q_r|\,\epsilon .
$$

If $g_\pm(S_0)>0$ for every point of the box and both sources, neither has a root in $I$ and the pair contributes exactly zero on the window.

With one segment, zero radii and no join, $\ell^+=\ell_0$, $J=0$ and $\omega^+=w_0+a_0\ell_0/\nu$, which is the Stage 1 radius.

### Proof

*Monotone residual.* By H1 and H3, $g_\pm$ is absolutely continuous with derivative $1-\mathbf n_\pm\cdot\mathbf V_\pm$ almost everywhere, where $\mathbf n_\pm$ is the unit vector from source to receiver; the distance is positive because the path lies in $\Omega$. By H2 the speed is at most $v^+$, so the derivative is at least $\nu>0$ almost everywhere, and an absolutely continuous function with almost-everywhere positive derivative is strictly increasing. Hence at most one root. At $S=T_r$ the residual is the distance, at least $r^->0$. So $g_\pm(S_0)<0$ gives exactly one root, strictly inside, by continuity; $g_\pm(S_0)>0$ gives none. Joins play no role: the residual is one continuous increasing function on the whole window, and a root is a time, not a property of a segment, so there is nothing to assign to one side of a join.

*Root-time difference.* Let $S_\pm$ be the roots. Since $g_-(S_-)=0$, the reverse triangle inequality gives $|g_+(S_-)|\le\|\mathbf X_+(S_-)-\mathbf X_-(S_-)\|$. By H2 the true equal-time separation is at most the nominal one plus both position radii, so $|g_+(S_-)|\le\ell^+$. Integrating $g_+'\ge\nu$ between $S_-$ and $S_+$ gives $|S_+-S_-|\le\ell^+/\nu$.

*Delayed position difference.* $\mathbf X_+(S_+)-\mathbf X_-(S_-)=[\mathbf X_+(S_+)-\mathbf X_+(S_-)]+[\mathbf X_+(S_-)-\mathbf X_-(S_-)]$. The first bracket is the integral of $\mathbf V_+$ over a time interval of length at most $\ell^+/\nu$, by H1 and H3, so its norm is at most $v^+\ell^+/\nu$. The second is at most $\ell^+$. The sum is at most $\ell^+(\nu+v^+)/\nu\le\ell^+/\nu$.

*Delayed velocity difference.* Write the true velocity as nominal plus error, $\mathbf V_\pm=\dot{\mathbf P}_\pm+\boldsymbol\eta_\pm$ with $\|\boldsymbol\eta_\pm\|\le\varepsilon^v_\pm$ by H2. Then

$$
\mathbf V_+(S_+)-\mathbf V_-(S_-)=\bigl[\dot{\mathbf P}_+(S_+)-\dot{\mathbf P}_+(S_-)\bigr]+\bigl[\dot{\mathbf P}_+(S_-)-\dot{\mathbf P}_-(S_-)\bigr]+\boldsymbol\eta_+(S_+)-\boldsymbol\eta_-(S_-).
$$

The first bracket is a change of the nominal velocity of one source over a time interval of length at most $\ell^+/\nu$: inside segments it changes at rate at most $a_0$, and at each join crossed it jumps by at most that join's nominal jump, so its norm is at most $a_0\ell^+/\nu+J$. The second bracket is at most $w_0$. The error terms contribute at most $\varepsilon^v_++\varepsilon^v_-$. The sum is at most $\omega^+$. No statement about the true acceleration is used, and none is available.

*Kernel difference.* The kernel $K(\mathbf x,\mathbf v)=\mathbf n/(r^2D)$ and its derivative bounds $L_x\le(2\nu+v^+)/((r^-)^3\nu^2)$ and $L_v\le1/((r^-)^2\nu^2)$ on $\Omega$ times the speed ball are those of the reviewed theorem and do not involve the histories. Both delayed events lie in that convex product by H2. Moving first in position and then in velocity gives $\|K_+-K_-\|\le L_x\ell^+/\nu+L_v\omega^+$, and multiplying by $C$ gives $B$. The receiver-box statement follows as in Stage 0, because every constant is uniform over the box. ∎

**Claim grade: derived**, conditional on H1 to H3. Falsifier: histories satisfying H1 to H3 and every stated bound and membership sign whose exact two-root acceleration has a component outside $[-B,B]$.

## 4. Which carriers satisfy the hypotheses

This is the part that decides what Stage 2 may admit, and it is not settled by the theorem.

| Carrier | H1 to H3 | Basis |
| --- | --- | --- |
| Supplied piecewise cubic with zero error tokens | Hold exactly | The true history is the nominal curve. The history layer verifies at construction, in exact rational arithmetic, that adjacent segments are contiguous in time and that their position and velocity enclosures overlap at the join; with zero radii that is exact equality, so the curve and its derivative are continuous. **Measured** by reading `validate_segment_join` in `src/eom/src/History.cpp` lines 194 to 221 |
| Supplied piecewise cubic with declared error radii | Hold if the supplier's declaration means what H2 and H3 say | The evolution contract requires a continuous history with a certified interpolation error bound. Whether a particular supplier's radii bound the true position and its true derivative together over whole segments is the supplier's certificate, not something the solver checks |
| Uniform-circular factory history | Expected to hold | The factory builds cubics against an analytic circle with stated radii. That its radii satisfy H2 and H3 over whole segments has **not** been verified in this work |
| History generated by the solver's own evolution | **Not established** | Published segments are inflated by the accepted step-doubling discrepancy. That is an error estimate carried into the history. No inspected contract or proof shows that the true solution of the delayed equation lies in those tubes with its derivative in the velocity tube |

Two consequences follow. First, the existing individual far-field enclosure already relies on H1 to H3 for whatever history it is given, because its at-most-one-root argument differentiates the residual using a speed bound taken from the velocity hull. Stage 2 therefore asks nothing of a carrier that the accepted individual route does not already ask. Second, for solver-generated histories neither route has an established inclusion of the true solution, and Stage 2 does not supply one. A grouped enclosure on a generated history is exactly as good as that history's tubes, and should be reported at that grade: an enclosure of every path consistent with the published tubes, not of the solution of the Master Equation.

**Claim grade: inferred** for the statement that the individual route relies on the same hypotheses, from the form of its contract theorem; **measured** for the join validation; the generated-history row is a statement of what has not been shown. Falsifier for the last: a contract or proof establishing that published tubes enclose the true solution and its derivative.

Stage 3 would integrate grouped uncertainty into evolution. Because generated-history inclusion is not established, Stage 3's entry condition in the scope is not met by anything in this record.

## 5. Outward construction

Split the window at every segment boundary of either source that lies strictly inside it. On each resulting cell both sources are single cubics, so the Stage 1 re-expansion gives each source's position, velocity and acceleration control boxes on that cell, in the cell's own local time. Then, over all cells:

- $\Omega$ is the box hull of all position control boxes, each widened componentwise by its segment's position radii; $r^-$ is the distance from $\mathcal R$ to that box, rounded down.
- $v^+$ is the largest upper norm of a velocity control box widened by its segment's velocity radii.
- $\ell_0$ and $w_0$ are the largest upper norms of the differences of equal-index position and velocity control boxes of the two sources on a cell; $a_0$ is the largest upper norm of an acceleration control box.
- $J$ is the sum over interior boundaries of each source of the upper norm of the difference between the last velocity control box before the boundary and the first after it.
- $\varepsilon^x_\pm$ and $\varepsilon^v_\pm$ are the largest upper norms of the radius vectors of the segments the window meets.

Membership uses the widened first position control box of the first cell: $G_0=\|\mathcal R-(\mathbf b_0\pm\mathbf e^x)\|-(T_r-S_0)$, present when its upper endpoint is negative and absent when its lower endpoint is positive. The prefix before the window is re-proved from each member's own position hull exactly as in Stage 1; that hull already includes error radii.

Coverage is complete by construction: the cells tile $[S_0,T_r]$ exactly, because the history layer guarantees contiguous segments, and the route declines unless every cell boundary is matched by exact decimal comparison and the last cell ends at the reception token.

**Claim grade: derived** for the bounds, from the Bernstein hull property on each cell and the inclusion property of outward arithmetic. Falsifier: a nominal position, velocity, separation, relative velocity, acceleration or join jump of an admitted pair above its computed bound.

## 6. Policy and accounting

Stage 2 would add a second policy value alongside the Stage 1 one, so a run states which domain it admits. Pairing, the two-slice budget, the member markers, the single interval per group, the per-request recheck, the complete-matrix comparison with a fresh certification, and the refusal by the evolution entry points are unchanged; the certificate gains the cell list, the per-source radii, the join-jump sum and the separate nominal and widened bounds, all of which fall under the existing field-by-field comparison. The capability stays snapshot-only.

## 7. Controls for an independent reference

| Control | Purpose |
| --- | --- |
| The Stage 1 static, affine and quadratic pairs with each history split into two or three segments at decimal times | The radius must reduce to the Stage 1 value up to rounding; totals must contain the same exact values |
| A window whose roots fall on opposite sides of a join, and one with a root exactly at a join | Shows that joins need no ownership rule |
| Unequal segmentation of the two sources | Exercises the cell split |
| Exact pair with a declared position radius, and an independently chosen true path displaced inside the tube | The exact acceleration of the displaced pair must lie in the enclosure |
| Exact pair with a declared velocity radius, and a true path whose velocity differs within the tube while its position stays in the position tube | Exercises the velocity allowance without any acceleration bound |
| A true path that oscillates inside the tubes with large second derivative | The enclosure must still hold; this is the case a nominal-acceleration claim would get wrong |
| Radii large enough that the widened speed bound reaches one, or the widened box reaches the receiver | Must decline |
| A window with a gap, a non-contiguous boundary, or a last cell ending before reception | Must decline |

## 8. What is established and what is open

Established here, at the level of mathematics: the grouped enclosure extends to piecewise windows and tube-carried histories with no bound on the true acceleration, under three stated hypotheses; joins require no ownership convention; and exact piecewise cubics satisfy the hypotheses by a property the history layer already enforces.

Open: independent review of sections 2 to 5; implementation, which has not started; verification of the uniform-circular factory's radii against H2 and H3; and, most importantly, any inclusion result for solver-generated histories, without which a grouped enclosure on evolved histories is conditional and Stage 3 cannot be entered honestly.
