# Independent review of the finite-history error route

## Verdict and scope

**Derived disposition:** the [finite-history error proposal](overnight-d-finite-history-error.md) gives a valid conditional route to an exact-history enclosure on source intervals with certified ordinary roots and controlled source-velocity continuity. Its feasible-velocity construction, complementarity penalty, normal-cone energy estimate, and displayed smooth-bracket partner-row bound are correct. The strictly positive scalar envelope is a valid comparison barrier once all delayed-time errors and initial history errors are included.

It is not yet a complete enclosure theorem across the prescribed kick. Splitting a source bracket at zero alone does not handle roots on opposite sides, and the smooth $L_xE_x+L_vE_v$ estimate then needs an additional jump term or a separately proved event treatment. Existence and continuation through a discontinuous source-velocity interface also need their own argument when source-clock transversality is unavailable. The note already identifies these as obligations; they must remain explicit in any implementation or numerical claim. No actual envelope values were calculated in this review.

A second precise correction concerns the optional zero-initial-error energy formulation: an arbitrary solution of that energy comparison equation need not dominate the error. Use a strictly positive envelope as displayed, the maximal energy solution, or a rigorously justified limit from strictly positive initial allowances.

The equation remains $K=c_f=c_a=1$, original partner weights, zero self acceleration, and the original inclusive unit-ball response applied after summation. The diagnostic scalar $\lambda_i$ only decomposes an approximation residual. It supplies no new response factor or evolution rule.

## Feasible velocity and defects

For a position interpolant $\mathbf x$ with locally absolutely continuous derivative, Euclidean projection $\mathbf w=\Pi_B(\dot{\mathbf x})$ is feasible and locally absolutely continuous because projection onto the closed convex ball is nonexpansive. A finite piecewise cubic Hermite history with matching endpoint derivatives has this regularity away from a prescribed jump such as the kick. On the branches $|\dot{\mathbf x}|<1$ and $|\dot{\mathbf x}|>1$, respectively,

$$
\dot{\mathbf w}=\ddot{\mathbf x},
\qquad
\dot{\mathbf w}=\frac{(I-\mathbf u\mathbf u^{\mathsf T})\ddot{\mathbf x}}{|\dot{\mathbf x}|},
\quad \mathbf u=\frac{\dot{\mathbf x}}{|\dot{\mathbf x}|}.
$$

An almost-everywhere derivative suffices for the energy estimate. Certification at uncertain branch crossings must enclose the relevant derivative values rather than differentiate the branch chosen by a floating norm. Merely knowing that a derivative exists almost everywhere would not suffice: absolute continuity, or an explicitly controlled bounded-variation formulation including all jumps, is required for integration of the derivative estimate.

The independent definitions are

$$
\rho^x=\dot{\mathbf x}-\mathbf w,
\qquad
\rho^v=\dot{\mathbf w}-\mathbf a+\lambda\mathbf w,
\qquad \lambda\ge0.
$$

Here $\mathbf a$ evaluates the chosen complete approximate partner history with its approximate positions and feasible source velocities. It is deliberately a two-field approximation; $\mathbf w$ need not equal $\dot{\mathbf x}$. The kinematic defect records that difference instead of silently changing the exact relation $\dot{\mathbf X}=\mathbf V$.

At an interior feasible velocity, $\lambda\mathbf w$ is generally not a normal-cone vector. The required defect is exactly

$$
q=\lambda|\mathbf w|(1-|\mathbf w|)
=\sup_{\mathbf V\in B}\lambda(\mathbf V-\mathbf w)\cdot\mathbf w.
$$

Thus $q$ is nonnegative, vanishes for a boundary velocity or $\lambda=0$, and correctly penalizes an artificial interior radial subtraction. This identity independently verifies the subject's complementarity bookkeeping.

## Energy estimate and jump accounting

Set $\mathbf e_v=\mathbf V-\mathbf w$ and $\mathbf e_x=\mathbf X-\mathbf x$. From the exact normal-cone evolution and the residual identity,

$$
\dot{\mathbf e}_v=\mathbf A-\mathbf a-\rho^v-\boldsymbol\xi+\lambda\mathbf w.
$$

The outward normal-cone inequality against the feasible point $\mathbf w$ gives $\mathbf e_v\cdot\boldsymbol\xi\ge0$. The preceding supremum identity controls the other radial term. Therefore, almost everywhere,

$$
\frac12\frac{d}{dt}|\mathbf e_v|^2
\le |\mathbf e_v|\bigl(|\mathbf A-\mathbf a|+|\rho^v|\bigr)+q,
\qquad
D^+|\mathbf e_x|\le|\mathbf e_v|+|\rho^x|.
$$

No derivative of the pointwise projected acceleration map is used. Local integrability of the ordinary input and residual bounds, absolute continuity of exact and approximate future velocities, and the exact normal-cone inclusion are the analytical hypotheses behind this integration. Bounded ordinary input suffices locally.

At an artificial approximate-velocity jump at a positive reception time, while the exact velocity is continuous, the triangle inequality gives the subject's update $E_v^+\ge E_v^-+|\Delta\mathbf w|$. At the prescribed time-zero kick the exact velocity itself jumps, so initialize from the prescribed post-kick trace or use $E_v^+\ge E_v^-+|\Delta\mathbf V-\Delta\mathbf w|$ when both jumps are known. The positive-time approximate-jump rule alone does not account for the exact initial kick. Source evaluation at the kick additionally requires the fixed law's declared one-sided value or event convention; it cannot be chosen by the checker.

## Root comparison and noncircular admission

At a fixed reception time $t$, define

$$
\overline F(s)=|\mathbf x_i(t)-\mathbf x_j(s)|-(t-s).
$$

At the exact root $S$, position errors bounded by a running envelope $E_x(t)$ imply $|\overline F(S)|\le2E_x(t)$. If $\overline F'$ is at least $\gamma>0$ almost everywhere throughout an interval containing both $S$ and the selected approximate root $\bar S$, integration gives

$$
|S-\bar S|\le 2E_x(t)/\gamma.
$$

This uses $\dot{\mathbf x}_j$ in $\overline F'=1-\overline{\mathbf n}\cdot\dot{\mathbf x}_j$, exactly as the subject states. Replacing it with $\mathbf w_j$ would omit the kinematic defect. An absolutely continuous gap with a positive derivative bound on both sides of the kick still admits this root-location argument across the kick; it is the source-velocity comparison, not position continuity, that subsequently fails to be Lipschitz there.

A concrete bootstrap can establish the root hypotheses without first assuming the desired exact margins. For a bracket $[a,b]$, certify

$$
\overline F(a)+2E_x(t)<0,
\qquad
\overline F(b)-2E_x(t)>0,
\qquad
\overline F'(s)\ge\gamma>0\quad(a\le s\le b).
$$

The exact all-past cap makes its causal gap nondecreasing. The strict endpoint signs then place every exact root in $(a,b)$. Interval geometric bounds supply an approximate range lower bound $\bar r$ and approximate transmitter lower bound $\bar\delta$. With the root-shift bound $\Delta_s$, one can certify the exact range by $\bar r-\Delta_s>0$ and the exact transmitter by

$$
\bar\delta-[\Delta_n+E_v(t)+M\Delta_s]>0
$$

on a smooth source bracket. Shared smaller positive floors $r,\delta$ then feed the displayed row estimate. The interdependence of $r$ and $\Delta_n$ is handled by selecting candidate floors and verifying all inequalities simultaneously; it is not an assumption that the exact solution already has them. Strict margins on a proposed error region are what permit a first-exit proof to retain the ordinary root.

The complete retained remote history and positive present separation must remain available for root existence. Positive exact transmitter factors exclude root intervals and multiple exact roots under the true cap. The approximate position history, however, can exceed speed one: feasibility of $\mathbf w$ does not make its causal gap globally monotone. Consequently a locally increasing approximate bracket does not by itself prove that there are no other approximate roots. Either certify a complete approximate root census with exactly one root per channel, or explicitly define the comparison acceleration by the selected roots and treat the remaining discrepancy in the residual. Calling that selected sum the unchanged complete ordinary approximate sum would require the former census. This distinction does not alter the exact equation.

## Partner-row estimate and the kick obstruction

On a smooth bracket let $|\dot{\mathbf x}_j|\le L$, let $\mathbf w_j$ be $M$-Lipschitz, and assume exact and approximate ranges and transmitter factors have common positive floors $r,\delta$. Then

$$
\Delta_s=\frac{2E_x}{\gamma},
\qquad
|\mathbf d-\overline{\mathbf d}|\le2E_x+L\Delta_s,
\qquad
\Delta_n=\frac{2(2E_x+L\Delta_s)}r,
$$

and

$$
|\mathbf V_j(S)-\mathbf w_j(\bar S)|\le E_v+M\Delta_s,
\qquad
|D_t-\overline D_t|\le\Delta_n+E_v+M\Delta_s.
$$

The normalization bound is conservative but valid. Since the reception time is common, $|\tau-\bar\tau|=|S-\bar S|$. Applying the mean-value estimate to $\tau^{-2}$ and the identity for reciprocal transmitter factors gives exactly

$$
|\mathbf A_{i\leftarrow j}-\mathbf a_{i\leftarrow j}|
\le\frac{\Delta_n}{r^2\delta}
+\frac{2\Delta_s}{r^3\delta}
+\frac{\Delta_n+E_v+M\Delta_s}{r^2\delta^2}.
$$

For example, writing $h=2/\gamma$ and $k=2(2+Lh)/r$, valid channel coefficients are

$$
L_x^{ij}=\frac{k}{r^2\delta}+\frac{2h}{r^3\delta}+\frac{k+Mh}{r^2\delta^2},
\qquad L_v^{ij}=\frac1{r^2\delta^2}.
$$

Seven-row sums and a maximum over receiver labels produce nonnegative scalar coefficients. The projection is handled by the energy argument, so no unproved Lipschitz estimate for the boundary acceleration response is needed.

**A source kick obstructs this homogeneous Lipschitz estimate.** Let a continuous capped source path be static for $s<0$ and have velocity $a\mathbf e$ for $s>0$, with $0<a<1$, and consider normals tending to $\mathbf e$ with ranges tending to a fixed positive $r$. Source times $S=-\varepsilon$ and $\bar S=+\varepsilon$ can be selected by an $O(\varepsilon)$ perturbation of receiver position. The factors tend to $1$ and $1-a$, respectively, while both remain ordinary. The row difference tends to $a/[r^2(1-a)]>0$ although the source-time and position differences tend to zero. Using the same prescribed source-velocity function for exact and approximate histories makes the same-time velocity error zero. Thus no finite constant multiplying $E_x$ and $E_v$ can cover a bracket straddling the kick. This is a kinematic counterexample to extending the row functional's smooth-bracket Lipschitz property, not a claimed coupled eight-member solution.

A precise allowed repair is a certified modulus. If the approximate source velocity has a jump $J_j=|\mathbf w_j(0+)-\mathbf w_j(0-)|$ and is $M$-Lipschitz on each side, then

$$
|\mathbf V_j(S)-\mathbf w_j(\bar S)|
\le E_v+M\Delta_s+J_j\,\mathbf 1_{\{|\bar S|\le\Delta_s\}}.
$$

The indicator is conservative: a segment between the two source times can cross zero only when the approximate root is within $\Delta_s$ of it. This adds $J_j\mathbf 1/(r^2\delta^2)$ to the displayed row error bound, and the same jump allowance must enter any transmitter-floor bootstrap. When a common $\delta$ cannot survive that coarse comparison, direct one-sided geometric bounds must certify both transmitter factors instead. A rigorous time-step bound on the indicator and jump contribution can be folded into an extra nonnegative residual term; a sampled crossing time cannot justify dropping it. Merely splitting the source bracket does not eliminate the interval of receptions for which the two roots lie on opposite sides.

## Scalar delayed comparison

Take nonnegative, locally integrable coefficient and defect bounds. They must hold over the entire proposed error region, not just along sampled approximate states. Initialize the envelopes to cover all exact-versus-approximate history errors at every possibly accessible earlier source time, including the prescribed post-kick trace. Delays satisfy $S,\bar S<t$ when the certified range floor is positive.

For strictly positive $E_v$, the displayed system

$$
E_x'=E_v+R_x,
\qquad
E_v'=L_xE_x+L_vE_v+R_v+Q/E_v
$$

is a valid barrier on smooth admitted brackets. Every right-hand term is nonnegative, so the resulting envelopes are nondecreasing. This is why an error at $S\le t$ is bounded by $E_x(t),E_v(t)$, even when its earlier allowance differs from the present one. A first-contact argument applies to the maximum over the eight labels; at contact $|\mathbf e_v|=E_v>0$, division of the energy inequality is legitimate. One must not divide by the smaller interior error and then replace $Q/|\mathbf e_v|$ by $Q/E_v$ away from contact, because that inequality has the wrong direction. Standard strict-barrier perturbation or the squared-error comparison supplies the non-strict case.

For source-kick straddles the repaired system requires, for example,

$$
E_v'=L_xE_x+L_vE_v+R_v+R_{\mathrm{kick}}+Q/E_v,
$$

where $R_{\mathrm{kick}}$ bounds the maximum receiver sum of the jump terms on each time interval. A sharper piecewise event argument may replace this coarse term, but must be proved and initialized explicitly. Jump updates to $E_v$ and coefficients preserve nondecreasing envelopes. If an alternative implementation allows its envelopes to decrease, it must separately retain the running supremum over all accessible past source times.

The formal substitution $Z=E_v^2$ yields

$$
Z'=2\sqrt Z\,(L_xE_x+L_v\sqrt Z+R_v)+2Q.
$$

At $Z=0$ this equation need not be uniquely solvable. With $L_x=L_v=Q=0$ and $R_v=1$, both $Z=0$ and $Z=t^2$ solve $Z'=2\sqrt Z$, $Z(0)=0$; the former fails to bound an error with $|\mathbf e_v|=t$. This gives the exact correction to “an equivalent energy formulation can treat zero initial error directly”: select a maximal solution or a justified positive-initial-data limit. Keeping the proposal's strictly positive initial allowance avoids the ambiguity.

## Existence, continuation, and the actual-entry obligation

The error inequalities conditionally bound a solution; they do not alone create one. Away from the source kick, certified positive range and transmitter margins together with compatible Lipschitz source velocities permit the local normal-cone method of steps already established in the earlier tail review. Strict simultaneous root, error, and present-separation margins then rule out the corresponding finite first exits and permit continuation.

At a root evaluating a source-velocity jump, the acceleration functional can be discontinuous as a function of the receiver position even when the root remains ordinary. The earlier $C^{1,1}$ source-history construction does not directly apply. A sufficient separate route would certify finitely many crossings with a positive lower source-clock speed, define the fixed one-sided kernel values, and concatenate the one-sided ordinary solutions with a proved transversal event treatment. The formula $S'=(1-\mathbf n\cdot\mathbf V_i)/(1-\mathbf n\cdot\mathbf V_j)$ shows why a positive transmitter factor alone is insufficient for that transversality: its receiver numerator can vanish under the inclusive cap. Frozen or grazing clocks at the source kick require their own existence/event analysis; importing a new differential-inclusion selector would change the law and is not authorized. An already established exact continuation through those events could instead be an explicit input to the enclosure theorem.

For the desired final admission, a bound relative to $\mathbf w=\Pi_B(\dot{\mathbf x})$ must also be translated to the velocity field used by the tail-neighborhood certificate. That certificate bounds exact velocity relative to the stored Hermite derivative $\overline{\mathbf V}=\dot{\mathbf x}$. Therefore the needed inequality is

$$
|\mathbf V-\overline{\mathbf V}|\le E_v+|\mathbf w-\dot{\mathbf x}|=E_v+|\rho^x|\le0.001
$$

throughout the tail's required old-source intervals. Merely obtaining $E_v\le0.001$ relative to the projected feasible velocity is insufficient when the Hermite derivative exceeds one. Likewise the initial-center allowance uses $|\mathbf V(T_0)-\mathbf U|\le E_v(T_0)+|\mathbf w(T_0)-\mathbf U|$. For the already checked seed-1 literal endpoint centers, the exact rational norm test places them inside the ball, so projection leaves the endpoint center unchanged; the history-wide conversion is still required. The position envelope directly compares the same Hermite position and needs no such velocity conversion.

This conversion, a validated residual/coefficient integration, a complete root/bracket bootstrap including every kick straddle, and an existence treatment through any nontransversal source-kick event are the remaining mathematical and computational obligations. They could make this a valid exact-entry route. No smallness or practicality claim follows before those bounds are calculated.

## Validation, falsifiers, and changed files

This review used direct algebra and explicit analytic counterexamples; it ran no numerical target, imported no earlier instrument, launched no computation or additional agent, and changed no frozen subject. The only authored file is this companion. The hypothetical discontinuous-source example tests the row-functional claim independently of any solver output; the zero-energy example tests the comparison assertion independently of the eight-member dynamics.

Falsifiers for the accepted smooth-bracket argument are an error trajectory violating the energy estimate with feasible $\mathbf w$ and the stated residuals, a root shift exceeding $2E_x/\gamma$ despite certified common-bracket signs and derivative bounds, or a row difference exceeding the displayed telescoping estimate with all common positive floors intact. For actual admission, an omitted source-time error, an unaccounted kick straddle, a failed exact root margin, or failure of $E_v+|\rho^x|\le0.001$ on the required old-source intervals invalidates this enclosure attempt. Such a failure says nothing by itself about escape or about the already checked conditional tail theorem.

At capture, `shasum -a 256` measured the frozen subject as `3e90535c940a96a34c35ddb1ef0faa44aca8207e48cd773b1d7024c972edb2e9`. A file-scoped `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics (difference exit status 1). No numerical screen, including the subsequently reported sampled residual experiment, was used as a premise of this proof review.
