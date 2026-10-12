# Generated-History Inclusion, Addendum 2: Causality Bootstrap, Fixed-Point Map and a Prototype Validated Far-Step Carrier

This addendum follows [addendum 1](matched-pair-stage-3-addendum-1.md), whose reviewed bytes are preserved, and the [independent review](matched-pair-review-stage-3-addendum-1-2026-10-11.md) of it. It does three things the review asked for. It replaces an imprecise causality sentence in the control with an explicit bootstrap. It restates the existence argument of the validated far step with the correct integral map. And it reports a prototype of the carrier that the theorem describes, with a qualification packet. The prototype is scratch evidence in new files. It is not part of the solver, changes no solver behaviour, and does not release Stage 3 of the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md); evolution entry points still refuse the grouped policy. Every numerical instance uses $c_f=1$.

## 1. Tier B causality, stated as a closed bootstrap

Addendum 1, section 4.2, said that the source "starts the step at rest at distance $R=10$ with an acceleration of order $\kappa/R^2$, so it stays farther than $h$ throughout". An order statement does not exclude new emissions. The review supplied the explicit argument, which is adopted here in place of that sentence. **Claim grade: derived**, by the reviewer and checked by the author. Falsifier: an emission after $T=0$ that reaches the other path within the step under the inequalities below.

Both charges are positive and both paths are at rest at $T=0$, the receiver at $0$ and the source at $10$. Suppose that up to some time every cross root is emitted before $T=0$ and both speeds are below $1$. Then the source reads the receiver's static prescribed past, so its acceleration $a_s$ satisfies $0\le a_s\le\kappa/100$. The receiver reads the oscillating prescribed source at distance at least $10$ with transmitter factor at least $2/5$, so $-\kappa/40\le a_r\le0$. Integrating with $\kappa=10^{-3}$ over $0\le t\le4$:

$$
0\le v_s\le4\times10^{-5},\qquad10\le z_s\le10+8\times10^{-5},\qquad-10^{-4}\le v_r\le0,\qquad-2\times10^{-4}\le z_r\le0.
$$

These bounds keep both speeds far below $1$ and the cross distance at least $10$, which exceeds the whole step length $4$. An emission in $[0,t]$ would have to cross at least $10$ in at most $4$, so none arrives, and the supposition persists with strict margin for the whole step. Each joined path is continuously differentiable and below field speed, so it has no root on its own past. The lower end of the retained window at $-20$ has strictly negative residual for both cross pairs, so their roots stay strictly inside the prescribed past. The receiver's true motion in the coupled problem is therefore exactly the motion bracketed in addendum 1, section 4.3, and the argument never uses the solver-generated source future as truth.

## 2. The existence argument, with the double-integral map

Lemma 2 of addendum 1 spoke of "the integral operator" on curves of position and velocity. The review pointed out that hypothesis H5 does not make the map $\mathbf x\mapsto\mathbf x_0+\int\mathbf v$ invariant for arbitrary box-valued velocity curves, and that the right object is the double-integral position map. The corrected argument follows. **Claim grade: derived**, subject to the same hypotheses H0 to H5. Falsifier: a field satisfying H4 and H5 for which the map below leaves the set, or has two fixed points.

Fix a path $i$, an initial state $(\mathbf x_0,\mathbf v_0)\in\mathcal X_{i,0}\times\mathcal V_{i,0}$, and the field $\mathbf F_i$ of Lemma 2, which is continuous on $[T,T+h]\times\mathcal X_i$ and Lipschitz in position. On the set $\mathcal C$ of continuous position curves $\mathbf x:[T,T+h]\to\mathcal X_i$, define

$$
(\Phi\mathbf x)(T+\tau)=\mathbf x_0+\tau\,\mathbf v_0+\int_0^\tau(\tau-s)\,\mathbf F_i\bigl(T+s,\mathbf x(T+s)\bigr)\,ds .
$$

By H4 the integrand's field value lies in $\mathcal A_i$, and $\mathcal A_i$ is convex, so the integral lies in $\tfrac{\tau^2}{2}\mathcal A_i$. By H5, $\mathbf x_0+\tau\mathbf v_0+\tfrac{\tau^2}{2}\mathcal A_i\subseteq\mathcal X_i$. So $\Phi$ maps $\mathcal C$ into itself. Its image is uniformly bounded and equicontinuous because $\mathbf F_i$ is bounded, and $\Phi$ is continuous, so it has a fixed point on the closed convex set $\mathcal C$; the Lipschitz property makes it unique. The velocity is then defined by $\mathbf v(T+\tau)=\mathbf v_0+\int_0^\tau\mathbf F_i\,ds$, which lies in $\mathbf v_0+\tau\mathcal A_i\subseteq\mathcal V_i$ and is the derivative of the fixed point. The rest of Lemma 2 and the theorem stand as written: these curves stay in their boxes, so no new cross root and no self root arises, and uniqueness against any other continuation follows from the regular chart in a neighbourhood and continuation of coincident solutions.

## 3. The prototype carrier

The [prototype](../evidence/matched_pair_stage_3_validated_far_step_carrier.py) performs one step of the theorem in exact rational arithmetic, rounding outward to thirty-six decimal places wherever a product, quotient or square root is taken. It imports no solver code. A path is a list of cubic segments, each with per-axis position and velocity radii and a provenance label. A step returns a certificate whose status is `certified` only if every hypothesis holds and the declared budgets are met; only then does it carry published segments. Otherwise it is `declined`, with a code and no continuation.

**H0.** Every segment must be labelled `exact_prescribed` or `validated_far_step`, all histories must end at the step start, prescribed segments must carry zero radii, and consecutive prescribed segments must agree exactly in position and velocity at their join. Anything else declines with `VFS-H0-01`. The retained emission domain starts at the latest of the paths' first times.

**H1.** The speed bound over the retained past is the largest norm of the velocity tube over each segment. The velocity range of a cubic's derivative is computed exactly from its endpoint and vertex values. The step velocity box $\mathcal V_i=\mathcal V_{i,0}+[0,h]\mathcal A_i$ is included once it exists. A bound at or above $1$ declines with `VFS-H1-01`.

**H2.** The distance between every two step position boxes must exceed $h$, checked on the boxes actually used; otherwise `VFS-H2-01`.

**H3.** For each ordered pair the source's position tube at the start of the retained domain is compared with the receiver's step box. If the largest distance is below the earliest delay $T-S_{\min}$ the pair is present. If the smallest distance is above the latest delay $T+h-S_{\min}$ the pair is absent and contributes nothing. Otherwise the step declines with `VFS-H3-01`.

**H4, by computation.** For a present pair the complete set of roots over the step is enclosed, and the kernel is evaluated over it. Every root for a reception time in $[T,T+h]$ and a receiver position in the box satisfies $t-S=r$, where $r$ is the distance to the emission point. If the roots lie in a window $W$ and the source's position tube over $W$ gives $r\in[r^-,r^+]$ against the receiver box, then they lie in $W\cap[T-r^+,\,T+h-r^-]$. Starting from the whole retained past and repeating this until it stops shrinking gives a window $W^\ast$ containing every root. The source's position and velocity tubes over $W^\ast$ then enclose every emission state the true past can have at a root, by H0. With the receiver box $\mathcal X_i$, the source position hull $\mathcal P$ and velocity hull $\mathcal U$, the kernel $\mathbf n/(r^2D)$ is evaluated in interval arithmetic: $\mathbf n\in(\mathcal X_i-\mathcal P)/[r^-,r^+]$ clipped to $[-1,1]$, $D\in1-\mathbf n\cdot\mathcal U$ clipped to $[1-v_W,\,1+v_W]$ with $v_W$ the speed bound on $W^\ast$. A nonpositive distance floor or transmitter-factor floor declines with `VFS-H4-01`. The box $\mathcal A_i$ is the sum of $\kappa q_iq_j$ times these kernel boxes. It is centred on the actual acceleration, and its radius shrinks with the step because $W^\ast$ does.

**H5.** The step boxes start as $\mathcal X_{i,0}+[0,h]\mathcal V_{i,0}$. After each evaluation of $\mathcal A_i$ the required set $\mathcal X_{i,0}+[0,h]\mathcal V_{i,0}+[0,h^2/2]\mathcal A_i$ is compared with the box used. If it is contained, the enclosure is established for those boxes. If not, the boxes are enlarged past the required set and H2 to H4 are evaluated again. Twelve failures decline with `VFS-H5-01`.

**Publication.** The nominal curve is the quadratic through the midpoints of the inherited sections with the midpoint of $\mathcal A_i$ as acceleration, with coefficients rounded to decimals. The published radii are $\rho_x+h\rho_v+\tfrac{h^2}{2}\rho_a$ and $\rho_v+h\rho_a$ plus the rounding deviation, where $\rho_x$ and $\rho_v$ are the inherited radii and $\rho_a$ is the radius of $\mathcal A_i$. A whole-step comparison then checks, through the Bernstein coefficients of the difference on $[0,h]$, that at every time in the step the published position tube contains the theorem's position set and the published velocity tube contains its velocity set; a negative slack aborts. The next step takes its inherited sections from the published segment's end, with both radii.

**Budgets.** A step declares a largest admissible growth of the position radius and of the velocity radius. Growth beyond either declines with `VFS-BUDGET-01`, although the tube is valid. This is the validated counterpart of the solver's position and velocity tolerances.

## 4. Qualification

The [runner](../evidence/matched_pair_stage_3_validated_far_step_qualification.py) and its retained [output](../evidence/matched-pair-stage-3-validated-far-step-qualification-output.txt) are described in the [qualification receipt](../evidence/matched-pair-stage-3-validated-far-step-receipt-2026-10-11.md), with identities, the truth references and three retained failures. The coupling is $10^{-3}$ and the budgets are $10^{-8}$ in position and in velocity, the tolerances of the control. Static known cases run first and stop the run if they fail.

| Case | What is checked | Result |
| --- | --- | --- |
| K1 | Static past on the axis at distance $10$, one step of $1/128$. | Certified. Receiver and source tubes contain closed-form brackets of the true state. Velocity radius growth $4.0\times10^{-18}$. |
| K2 | Static past off the axes, source at $(3,4,0)$, one step of $1/128$. | Certified. Both nonzero velocity and position components contain the brackets; the third contains zero. |
| K3 | The small-time truth bracket itself, at amplitude zero. | Contains the exact static values. |
| T1 | The control's oscillating past, first step of $1/128$. | Certified within budget: velocity radius growth $1.42\times10^{-9}$, position $5.5\times10^{-12}$. Velocity tube $[-7.818,\,-7.534]\times10^{-8}$ contains the true bracket $[-7.67258665,\,-7.67258624]\times10^{-8}$; position likewise. |
| T2 | A second step from the published end of the first. | Certified within budget. The step inherits nonzero position and velocity radii, radii do not shrink across the join, the new start tube contains the old end tube, and the tube at $2h$ contains the true bracket. |
| T3 | The control's past, $512$ steps of $1/256$ to $t=2$. | All $512$ certified within budget; largest velocity growth in one step $1.71\times10^{-9}$. End velocity tube $[-1.98244,\,-1.94081]\times10^{-5}$, half-width $2.08\times10^{-7}$, contains the whole true bracket $[-1.96342,\,-1.95832]\times10^{-5}$ and is disjoint from the solver's aliased interval $[-2.00009,\,-2.00005]\times10^{-5}$ by $1.76\times10^{-7}$. End position tube has half-width $1.67\times10^{-7}$ and contains the true bracket. The source's tubes contain their closed-form bracket. |
| T4 | The adversarial step itself, one step of $2$. | Without a budget the hypotheses hold and the tube, $[-5.00,\,-1.18]\times10^{-5}$ in velocity, contains the true bracket. With the declared budgets it declines with `VFS-BUDGET-01`. |
| N1 to N3 | A segment labelled as a step-doubling estimate; a prescribed segment with a radius; a prescribed join with a velocity corner. | Each declines with `VFS-H0-01`. |
| N4, N7 | A past at or above field speed; a coupling strong enough that the step velocity box reaches field speed. | Each declines with `VFS-H1-01`. |
| N5 | A step longer than the separation. | Declines with `VFS-H2-01`. |
| N6 | A retained window whose start coincides with a root. | Declines with `VFS-H3-01`. |
| N8 | The enclosure iteration limited to one pass. | Declines with `VFS-H5-01`. |
| N9 | A step of $1/4$ on the control under the declared budgets. | Declines with `VFS-BUDGET-01`. |
| P1 | A retained window too short for any root. | Both pairs certified absent; certified with exactly zero acceleration, conditional on the retained window being the complete emission domain. |

All 45 recorded rows pass, of which 40 are assertions and 5 are recorded quantities. Every decline returns no published segments, and the function that appends a continuation refuses a declined certificate.

## 5. What this establishes and what it does not

**Claim grade: measured**, by the prototype and runner identified in the receipt, on the cases listed. On those cases a carrier built from the theorem's hypotheses publishes position and velocity tubes that contain separately bracketed true states, carries inherited uncertainty in both, and declines without a continuation when a hypothesis or a budget fails. On the adversarial control it does what the step-doubling carrier did not: at the aliased step it either reports a tube five orders of magnitude wider or declines for budget, and at resolved steps it reaches $t=2$ with a tube that contains the true state and excludes the aliased interval.

The limits are these.

- It is a prototype in exact rational arithmetic, outside the solver. Nothing in the solver computes these hypotheses, and no production carrier exists. The solver's outward binary and multiple-precision arithmetic, its history types and its certificates would each need their own implementation and review.
- Provenance is a label the prototype trusts. A real carrier must bind each validated segment to the certificate that produced it, by identity, as the snapshot stages learned to do for the grouped certificate.
- The tube is first order. Reaching $t=2$ within the budgets took $512$ steps and ended with a velocity half-width of $2.08\times10^{-7}$; the solver's ordinary carrier at $256$ steps published $4.7\times10^{-9}$ without proof. The validated radius accumulates the variation of the acceleration over every step. No cost comparison was made.
- It covers only steps in which all paths are mutually farther apart than the step, below field speed, with every pair uniformly present or absent on a complete retained past. Near pairs, self-hits, and paths at or above field speed are outside it.
- The truth references and the prototype share one author, except that the reviewer's separately written bracket at $t=2$, as reported in the review, also lies inside the T3 tube. The small-time bracket used in T1 and T2 is new and unreviewed. Two instances and one population of two paths are not a qualification of a population-scale carrier.
- The grouped route does not consume these tubes. The snapshot module admits only exact histories; admitting validated segments would use the general tube form of the grouped theorem, whose regularity condition H0 now supplies, and would be a separate reviewed change.

Falsifiers: a case in which the prototype certifies and a correct bracket of the true state lies outside its tube; a decline case that returns published segments; a hypothesis the prototype reports as holding that fails on exact evaluation; or an error in the root-window argument of section 3.

## 6. Disposition

The validated far step is no longer only a statement. A bounded prototype implements its hypotheses computationally, including the acceleration enclosure over a whole step, and is qualified on analytic known cases, the adversarial control, inherited uncertainty and decline cases. It is evidence that the route is feasible and what it costs in tube width. It is not a solver capability. Stage 3 is not entered, production evolution still refuses the grouped policy, and exact fallback remains in force.
