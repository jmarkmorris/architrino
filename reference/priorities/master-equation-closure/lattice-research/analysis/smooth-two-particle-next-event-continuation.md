# Fixed-past comparison toward the next physical event

## Scope and present claim level

This calculation continues the same alternating cubic lattice, coupling $g=16$, wake speed $c_f=1$, supplied complete past and unmodified Master Equation as the [accepted continuation across the original displacement boundary](smooth-two-particle-beyond-class-boundary.md). Its objective is the next vertical maximum of the two selected architrinos or an earlier obstruction of the causal-root equation. The supplied past remains a specific preparation; this investigation does not make a typical-population claim.

The [independently accepted continuous comparison](smooth-two-particle-next-event-independent-adjudication.md) establishes a first global wake-speed event in $(87/16,351/64]$ while both selected architrinos are still rising. The numerical comparison after its own first wake-speed crossing solves an explicitly defined auxiliary equation; it is not asserted to continue the full Master Equation after that crossing. The actual event conclusion uses equality of the two equations only up to the first global speed-one event, followed by the conditional self-root obstruction theorem. The incoming-history refinements, analytical ingredients, complete error propagation and event extraction have passed their independent checks.

## 1. A fixed-history auxiliary equation

Write $X_i(t)=i+y_i(t)$ for the position of the architrino anchored at $i\in\mathbb Z^3$. The polarity alternates with the parity of the coordinate sum. Let $H=11/2$ and $B=7/20$. The accepted histories through time $5$ have displacement norm less than $0.062304433$ and speed less than one. For different anchors, a receiver satisfying $|y_i(t)|\le B$ obeys

$$
5+|X_i(t)-X_j(5)|-t
\ge 6-B-0.062304433-H
=0.087695567>0.
$$

The function $s\mapsto s+|X_i(t)-X_j(s)|-t$ is strictly increasing on the accepted subunit-speed past. Therefore its unique cross-source root lies before $5$. If the full solution is stopped at its first global speed-one event, no later cross root is possible: for $5\le s\le t$,

$$
|X_i(t)-X_j(s)|
\ge 1-B-0.062304433-(s-5)>t-s.
$$

This establishes the use of fixed earlier histories without assuming any unproved continuation of those histories. The sharper bound $|y_j|<0.07$ gives a source-query ceiling $H-1+B+0.07=4.92<5$.

Define the auxiliary receiver equation by retaining all cross-source contributions from these fixed histories and the same convergent infinite stationary sum. It omits positive self roots by definition. Before the first actual global speed-one event, every self-root set is empty, so the auxiliary equation and the Master Equation agree. After a numerical comparison crosses speed one, the auxiliary equation remains a useful comparison object, but equality with the full law is no longer asserted.

The exact finite census contains 1502 potentially affected receiver identities by $H$. The incoming archive contains 1350 histories and includes all 1142 labels that can contribute through the source-query ceiling. The independently audited actual/trial union contains 149046 generated source relationships, including 8720 trial-only relationships and no omitted actual relationship. Original negative-time pulse corrections are retained separately. The infinite remainder is stationary and is evaluated by the same grouped sum as in the earlier proof.

## 2. Signed receiver derivatives

For one cross-source row, let $R=X_i(t)-X_j(s)$, $r=|R|$, $n=R/r$, $v=X_j'(s)$, $a=X_j''(s)$ and $D=1-n\cdot v$. The acceleration kernel before its polarity and coupling factors is

$$
K=\frac{n}{r^2D}.
$$

Implicit differentiation of $s+r=t$ with respect to receiver position gives

$$
\frac{ds}{dx}=-\frac{n^T}{D},\qquad
M=\frac{dR}{dx}=I+\frac{vn^T}{D},\qquad
P=I-nn^T.
$$

Consequently

$$
DK=
\left[\frac{I-3nn^T}{r^3D}+\frac{nv^TP}{r^3D^2}\right]M
-\frac{nn^T(n\cdot a)}{r^2D^3}.
$$

The independent reference uses the equivalent symmetric expression

$$
DK=\frac{I}{r^3D}+\frac{vn^T+nv^T}{r^3D^2}
+\frac{nn^T[|v|^2+2n\cdot v-3-r(n\cdot a)]}{r^3D^3}.
$$

Signed row matrices are summed before taking their operator norm. This preserves cancellation between positive and negative source relationships. Summing their separate norms is valid but discards that cancellation and gives a much weaker trajectory comparison.

### 2.1 Exact stationary cancellation in each changed row

Let $R_0$ denote the receiver-to-anchor vector and $y$ the source displacement, so that $R=R_0-y$. Put $r_0=|R_0|$ and

$$
\Delta r=r_0-r=\frac{2R_0\cdot y-|y|^2}{r_0+r},\qquad
d_k=r^{-k}-r_0^{-k}
=\frac{\Delta r\sum_{j=0}^{k-1}r^j r_0^{k-1-j}}{r^k r_0^k}.
$$

The static derivative difference is exactly

$$
dA=I d_3-3\left[\frac{-R_0y^T-yR_0^T+yy^T}{r^5}+R_0R_0^T d_5\right].
$$

With $A=(I-3nn^T)/r^3$, the changed derivative can then be evaluated as

$$
DK-DK_0=dA+A\left[\frac{I(n\cdot v)}D+\frac{vn^T}{D^2}\right]
+\frac{nv^TPM}{r^3D^2}-\frac{nn^T(n\cdot a)}{r^2D^3}.
$$

Every term contains a source displacement, velocity or acceleration. A source that is identically stationary therefore gives zero across a whole receiver box. This algebra avoids subtracting two broad interval enclosures whose exact stationary parts are equal.

### 2.2 The infinite stationary derivative

Let $S_0(y)$ denote the original grouped stationary sum at displacement $y$. Its constant and linear terms vanish by the accepted lattice symmetry and grouping. Define the cubic vector

$$
T_i(y)=y_i^3-\frac32y_i\sum_{j\ne i}y_j^2.
$$

The stationary sum can be enclosed on $|y|\le B<1$ in the form

$$
S_0(y)=aT(y)-\sum_{L=6,8,10,12,14}\nabla V_L(y)+\mathcal R(y),
$$

where $V_L$ is the exact degree-$L$ potential polynomial summed over the finite cube $\|n\|_\infty\le24$, $n\ne0$. Its coefficients are defined by expanding

$$
V_L(y)=\sum_{0<\|n\|_\infty\le24}
\frac{(-1)^{n_1+n_2+n_3}}{|n|^{L+1}}
|y|^L P_L\left(\frac{n\cdot y}{|n||y|}\right).
$$

The expression at $y=0$ is its homogeneous polynomial extension. The cubic coefficient is enclosed independently by

$$
14.313597191615461\le a\le14.315062036797517.
$$

The omitted finite-cube coefficients and all higher degrees are bounded separately. For a unit direction $u$, the solid harmonic $|y|^L P_L(u\cdot y/|y|)$ has Hessian norm at most $L(L-1)|y|^{L-2}$. The resulting positive tail series starts with $240B^{14}\sum_{n\ne0}|n|^{-17}$. Its geometric ratio is bounded by $B^2$ for the nearest shell and by $B^2/4$ outside the nearest cube. At $B=7/20$, the complete omitted derivative, including the finite-cube tail and coupling $16$, is less than $0.011483154$.

This gives an interval matrix for the full stationary derivative without separately enclosing and subtracting the large nearest-neighbor terms. All coefficients are enclosed using independent exact integer shell moments and outward radical bounds. The numerical trajectory retains its original stationary evaluation; this polynomial is an analytical enclosure of the same sum.

## 3. Continuous error propagation

Let $\widehat y_i$ be the retained piecewise-quintic comparison. On one time cell, enclose the signed receiver Jacobian by a matrix interval and let $L_i$ bound its operator norm. Let $q_i$ enclose the source-history uncertainty and $\rho_i$ the continuous residual of the comparison equation. For the vector error $e_i=y_i-\widehat y_i$,

$$
|e_i''|\le L_i|e_i|+q_i+\rho_i.
$$

This is a vector acceleration bound; it is not a differential inequality for the second derivative of $|e_i|$. Twice integration and the positive Volterra comparison instead give scalar majorants

$$
P_i'=V_i,\qquad V_i'=L_iP_i+q_i+\rho_i,
\qquad |e_i|\le P_i,\quad |e_i'|\le V_i.
$$

The source uncertainty is evaluated at a certified upper emission-time cut. If a source has speed bound $w<1$, acceleration bound $b_a$, range lower bound $d$, and position and velocity error bounds $E_P,E_V$, its contribution to $q_i$ is at most $16(C_PE_P+C_VE_V)$, where

$$
C_P=\frac{2}{d^3(1-w)^2}
+\frac{w/d^3+b_a/d^2}{(1-w)^3},\qquad
C_V=\frac{1}{d^2(1-w)^2}.
$$

The factors account for the change of emission time as well as the source values at that time. Position, velocity and acceleration errors from the accepted incoming histories are retained. Acceleration bounds include the maximum inherited uncertainty over the complete earlier prefix. An error is set to zero only when both the actual first-front theorem and an exact archived zero prefix prove that the two paths agree identically there. Trial-only rows remain in the comparison.

Every receiver tube is tested throughout a continuous time cell, using Bernstein bounds for its comparison polynomial. A guessed tube radius is accepted only when the propagated position majorant is strictly inside it. The comparison must also close $|\widehat y_i|+P_i<B$ for every receiver. Residual estimates use the same stationary sum and complete actual/trial source union; an assumed diagnostic residual is explicitly insufficient for an actual theorem.

### 3.1 Sharpening the already accepted incoming histories

The incoming numerical histories are immutable. Their previous error bounds can nevertheless be sharpened without changing any trajectory. On an already accepted interval, the old position-error bound supplies a valid receiver neighborhood for the signed derivative. Repropagating the scalar majorants with that derivative and the retained continuous residual gives a second valid error bound. Taking the smaller of the old and new endpoint bounds preserves validity. For acceleration, take the smaller of the old cumulative bound and the maximum of the new earlier cumulative bound and the new cell bound. This preserves the entire prefix required by later emission-time queries.

The earlier common error function had used its $73/32$ endpoint errors at every positive source time below $73/32$. The accepted proof itself contains smaller time-dependent majorants. They are reconstructed from its same positive-kernel recurrence, original residual budgets and complete source families, including both selected targets. Before $33/32$ the existing scalar bound has derivative coefficient $7$ and residual budget $10^{-10}$; from $33/32$ to $57/32$ it has derivative coefficient $8$, the same residual budget and its delayed-source uncertainty; from $57/32$ to $73/32$ it retains derivative coefficient $8$ and residual budget $10^{-8}$. The acceleration error in each stage is its residual and delayed-source uncertainty plus the derivative coefficient times the position error. Cumulative maxima are retained across both joins.

From $73/32$ onward the refinement uses the already certified residual for each receiver and time bin, rather than replacing all early bins by the final stage maximum. Every residual receipt applies to an authenticated bit-identical prefix of the current archive. A receiver absent from an earlier receipt is assigned zero error only when its actual history and numerical history are both identically stationary throughout that interval; no claim that its unevaluated numerical equation residual vanishes is needed.

## 4. What would certify the physical event

The event proof requires all of the following estimates from the same completed comparison.

1. Every auxiliary receiver remains inside the displacement domain through $H$, so that all fixed-past cross roots stay complete and regular.
2. Both selected target vertical velocities remain positive until $H$.
3. At least one auxiliary receiver has speed strictly greater than one at $H$ after subtracting its velocity error. Continuity then gives a first global speed-one time no later than $H$.
4. Every identity and time cell that could contain that first event has strictly positive $v\cdot a$ at speed one. Identities whose continuous speed upper bound stays below one are excluded; the numerical ordering alone does not identify the first actual event.

For the last condition, a useful bound at an actual speed-one event is

$$
v\cdot a\ge \widehat v\cdot\widehat a
-V_i|\widehat a|-A_i,
$$

where $A_i$ bounds the acceleration error and $|v|=1$ has been used. A positive lower bound permits the [independently derived transverse self-root birth argument](../../analysis/smooth-two-particle-next-event-root-birth.md). That argument, together with a bounded cross-source remainder, establishes an obstruction to a $C^3$ transverse passage satisfying the unchanged equation with every positive self root included. It does not exclude arbitrary weaker continuations or define a new event rule. Merely observing a numerical speed equal to one does not establish such an obstruction.

## 5. Completed event certificate

**Claim grade: derived and independently accepted.** Let $\tau$ be the first time any architrino reaches speed one. The completed comparison gives

$$
\frac{87}{16}<\tau\le\frac{351}{64},
\qquad 5.4375<\tau\le5.484375.
$$

Every speed is less than $0.948131$ through the left endpoint. At the right endpoint, the auxiliary solution for the architrino anchored at $(-1,0,1)$ has speed greater than $1.0014633$. Continuity therefore forces the first global speed-one event inside the stated interval. This witness supplies an upper time bound; it does not identify the first actual architrino to reach the event.

Both selected targets satisfy

$$
z_i'(t)>0.1320962439\qquad(5\le t\le\tau).
$$

Together with the accepted earlier rise, this excludes the next vertical maximum before the event. All identities that could be the first to reach speed one have

$$
X_i'(\tau)\cdot X_i''(\tau)>1.4630814180.
$$

The candidate set consists of the two selected targets, the two anchors $(-1,0,1)$ and $(2,0,1)$, the four anchors $(x,\pm1,1)$ with $x\in\{0,1\}$, and the four anchors $(x,\pm1,0)$ with $x\in\{0,1\}$. These twelve possibilities are a rigorous enclosure of the first-event identities. The first numerical crossing among four environmental paths does not resolve their actual ordering.

### 5.1 Continuation and separation before the event

The auxiliary error tubes close on every cell through $351/64$, with

$$
\sup_i|y_i(t)|<0.265391<B.
$$

The finite receiver equation consequently has a unique continuation throughout this interval: its fixed-history roots are simple, its acceleration is locally Lipschitz in receiver position, and the comparison prevents departure from the interior displacement domain. The complement remains stationary by the independently audited first-front census. Thus this finite auxiliary solution and its stationary complement agree with the full Master Equation until $\tau$.

The minimum lattice-anchor distance is one, so every two distinct identities satisfy the simultaneous geometric bound

$$
|X_i(t)-X_j(t)|\ge|i-j|-|y_i(t)|-|y_j(t)|>0.469218
\qquad(t\le\tau).
$$

In particular, no architrino approaches a unit-lattice neighbor more closely than this lower bound before the event. This is a conservative guaranteed separation, not a measured closest approach. It excludes simultaneous contact as the earlier obstruction in this experiment.

The sharper computed source cut before the forcing endpoint is below $4.778039$, safely inside the accepted history through $5$. Uniform independent bounds $|y_j|<0.07$, $|X_j'|\le1/5$ and $|X_j''|\le1$ hold on the required incoming histories. With receiver displacement at most $7/20$, every causal cross range is greater than $29/50$, every source denominator is at least $4/5$, and the changed-row degree is at most 223. The derivative of each causal row, its stationary subtraction and the unchanged stationary sum therefore remain finite. An independently derived bound places the pre-event jerk below $200000$. This is a larger analytical neighborhood, not a change to the equation or a physical jerk ceiling.

No cross-root obstruction, contact or infinite-sum failure precedes $\tau$. At $\tau$, the positive value of $X_i'\cdot X_i''$ supplies the transverse hypothesis of the self-root theorem. A hypothetical $C^3$ continuation would immediately produce the divergent near-zero-delay own-history row described there, while the cross-source sum stays bounded. Hence the unchanged equation admits no such classical smooth continuation across this endpoint. This conclusion does not supply an alternative event update or determine nonsmooth continuations.

## Development evidence and reproduction

The exact census and archive-preservation audit are retained in `.local-data/master-equation-closure/next-event/history/target.json`. The numerical auxiliary history is retained in `next-event/evolution/cross-reference/reference.npz` under the same evidence owner. The signed derivative subjects have passed stationary, displaced-static, longitudinal, transverse, acceleration and noncollinear rational controls; the independent reference evaluates the separately derived symmetric formula. Numerical source component bounds are retained in `next-event/continuation/source-boxes.npz` and still require the accepted actual-history error additions when used.

The completed subject is `event_comparison.py`, with its exact known controls in `event-comparison-known.json` and its 32 continuous cells in `event-comparison.json`. The independently derived residual is `next-event/residual/residual-polynomial.json`; the accepted incoming error table is `prefix-refinement4.npz`. `event_extract2.py` verifies the consecutive subunit prefix, selects the first endpoint with a speed lower bound above one, and extracts the candidate identities and continuous margins. Its result uses the first 31 cells. The final cell through $11/2$ also closes but is unnecessary for the event bracket.

The final independently authored event reference checks all 48064 positive-kernel receiver steps, the continuous cell signs and the endpoint speed radicals. It confirms the same first forcing prefix and lower time bound, with stronger outward lower values than those reported in §5. The separate coefficient, source-prefix, residual-coverage and causal-census references are retained under `next-event/independent/`. `next-event/continuation/retention.json` binds the current subject copies, controls, results and immutable input receipts; its README records the reproduction order and dependency recovery pointers.

The event run completed in 98.868 seconds in watched foreground session 43552, returned exit code zero, and has no continuing process. The incoming refinement completed in 335.531 seconds in watched foreground session 96533 and likewise returned exit code zero. Earlier insufficient comparison bounds were retained separately; none was interpreted as a physical event or law failure. The late residual refinement is a reserve and is not an input to this event conclusion.
