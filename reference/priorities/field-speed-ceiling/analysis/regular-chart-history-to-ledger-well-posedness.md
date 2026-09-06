# FSC-007 — Regular-Chart History-to-Ledger Well-Posedness

**Date:** 2026-09-02 **Status:** conditional local existence and uniqueness proved on the declared atom-free fixed-census chart; continuation holds to the first explicitly listed breaking event; the margin-zero exact-mirror chart is excluded. **Owner:** FSC-007. **Dependent result:** FSC-011 gains a local unique continuation corollary for the exact FSC-010 circular history inside the FSC-013 tube.

## Question and verdict

Does the proposed constrained-response problem define one local future when the delayed-root chart is regular, finite, and separated from every event boundary?

Yes. A fixed finite ordinary census, finite delay window, positive delay, range, $D_t$, and $D_r$ floors, bounded $W^{2,\infty}$ histories, inactive-channel certificates, and no event-guard crossing make the history-to-root and history-to-ledger maps explicitly Lipschitz. The pointwise tangent-cone projection is not jointly continuous across the velocity-ball boundary, so it is not used as the fixed-point operator. The normal-cone evolution solution operator is nonexpansive in the supplied ledger; composed with the ledger map, it is a contraction for a sufficiently short interval. The result continues uniquely until one named floor, census, trace, delay-window, or event condition breaks.

Plainly: away from coincidence and other singular boundaries, nearby stored paths produce nearby root times and nearby acceleration sums. The velocity constraint is handled as a whole evolution problem, whose output changes by no more than the change in its input ledger. Over a short enough time this feedback shrinks errors, so one and only one local solution exists.

## 1. Regular-chart data and hypotheses

Normalize $c_f=1$. Fix a start time $T_0$, a finite delay window $[T_0-H,T_0]$, finitely many labels, and a finite set $\mathcal C_i$ of active ordinary root slots for each receiver $i$. On a candidate interval $I_h=[T_0,T_0+h]$, each slot $c=(i\leftarrow j,\alpha)$ has one root $S_c(t)$ in a declared compact bracket and satisfies

$$
t-S_c(t)\ge\tau_0>0,
\qquad
r_c(t)\ge r_0>0,
\qquad
D_{t,c}(t)\ge d_t>0,
\qquad
D_{r,c}(t)\ge d_r>0.
$$

All candidate paths obey $\|\mathbf V_i\|\le c_a$, with $c_a\le1$, and lie in a closed $W^{2,\infty}$ tube with $\|\mathbf A_i\|_{L^\infty}\le A_0$. Couplings $k_c=\kappa|q_iq_j|$ and polarity signs are fixed. Left and right representatives at $T_0$ are declared and agree with the retained history; velocities have no atoms on $I_h$.

Plainly: the theorem begins inside one chart where the list of wake crossings is already known and finite. Every crossing stays a definite time and distance away from its emission, both root slopes stay positive, speeds and accelerations are bounded, and no hidden jump is allowed.

The inactive census is protected by explicit sign gaps on its compact search brackets, except where a separate rigidity certificate excludes a same-transmitter characteristic interval. Root brackets remain inside the finite delay window. The received-source clocks have only their absolutely continuous increasing parts on $I_h$; there are no plateaus, jumps, singular-continuous components, zero-delay diagonals, characteristic intervals, cross-channel ownership ambiguities, or event atoms in the active census. A positive chart buffer $R>0$ separates the candidate ball from every event guard and every loss of these properties.

Plainly: “regular” is not shorthand for missing assumptions. Inactive channels need their own proof that a root cannot appear, and the candidate ball must stay a positive distance from every special event type. If a frozen clock, simultaneous event, or root-factor zero enters, this theorem stops.

For two histories $h$ and $\widetilde h$ in the tube, set

$$
\eta
=
\max_i\max\left\{
\|\mathbf X_i-\widetilde{\mathbf X}_i\|_{L^\infty},
\|\mathbf V_i-\widetilde{\mathbf V}_i\|_{L^\infty}
\right\}
$$

on the common delay-and-candidate window. This is the working history norm for the estimates below; the shared $A_0$ bound, rather than an acceleration-difference term, controls evaluation of velocity at displaced source times.

Plainly: $\eta$ is the largest position or velocity change between the two stored histories. Both histories are already known to have accelerations no larger than $A_0$, which prevents a tiny root-time shift from sampling a wildly different source velocity.

## 2. History-to-root and clock estimates

At the root of slot $c$, the two causal functions differ by at most $2\eta$. The common transmitter-factor floor makes each causal function increase in source time at rate at least $d_t$. Therefore

$$
|S_c(t)-\widetilde S_c(t)|
\le
C_S\eta,
\qquad
C_S=\frac{2}{d_t}.
$$

Plainly: moving the receiver and transmitter histories by at most $\eta$ moves the causal equation vertically by at most $2\eta$. A slope of at least $d_t$ converts that vertical change into the displayed root-time change.

Define the comparison constants

$$
C_R=2+\frac{2}{d_t},
\qquad
C_U=\frac{2C_R}{r_0},
$$

$$
C_{D_t}=C_U+1+\frac{2A_0}{d_t},
\qquad
C_{D_r}=C_U+1.
$$

Then the received vectors, ranges, directions, and root factors satisfy

$$
\|\mathbf r_c-\widetilde{\mathbf r}_c\|
\le C_R\eta,
\qquad
|r_c-\widetilde r_c|
\le C_R\eta,
$$

$$
\|\widehat{\mathbf r}_c-\widehat{\widetilde{\mathbf r}}_c\|
\le C_U\eta,
\qquad
|D_{t,c}-\widetilde D_{t,c}|
\le C_{D_t}\eta,
\qquad
|D_{r,c}-\widetilde D_{r,c}|
\le C_{D_r}\eta.
$$

Plainly: the root shift adds at most one speed times the time shift to the source-position error. The positive range floor keeps normalization into a unit direction well conditioned, and the acceleration bound controls how much source velocity changes when the root time moves.

Since $S'_c=D_{r,c}/D_{t,c}$ and $0<D_{r,c}\le2$, the active clock derivatives obey

$$
\|S'_c-\widetilde S'_c\|_{L^\infty(I_h)}
\le
\left(
\frac{C_{D_r}}{d_t}
+
\frac{2C_{D_t}}{d_t^2}
\right)\eta.
$$

This proves Lipschitz control of both the root graph and the absolutely continuous received-clock density on the declared chart. It does not extend through a clock plateau, jump, or singular-continuous component.

Plainly: both the selected source time and the rate at which that source time advances change continuously with the history. The denominators stay safe only because the root slopes have fixed positive floors.

## 3. History-to-ledger estimate

For slot $c$, the ordinary acceleration row is

$$
\mathbf a_c(h;t)
=
\sigma_c k_c
\frac{\widehat{\mathbf r}_c(t)}{r_c(t)^2D_{t,c}(t)}.
$$

The preceding estimates and the range and transmitter-factor floors give

$$
\|\mathbf a_c(h;t)-\mathbf a_c(\widetilde h;t)\|
\le
L_c\eta,
$$

with the explicit constant

$$
L_c
=
k_c\left[
\frac{C_U}{r_0^2d_t}
+
\frac{2C_R}{r_0^3d_t}
+
\frac{C_{D_t}}{r_0^2d_t^2}
\right].
$$

Plainly: the three bracketed terms respectively control changes in direction, inverse-square range, and inverse transmitter factor. Every possible denominator is bounded away from zero before the estimate is used.

Let

$$
B_A
=
\max_i\sum_{c\in\mathcal C_i}
\frac{k_c}{r_0^2d_t},
\qquad
L_A
=
\max_i\sum_{c\in\mathcal C_i}L_c.
$$

For the complete finite ordinary ledger $\mathbf A_i[h]=\sum_{c\in\mathcal C_i}\mathbf a_c[h]$,

$$
\|\mathbf A[h]\|_{L^\infty(I_h)}\le B_A,
\qquad
\|\mathbf A[h]-\mathbf A[\widetilde h]\|_{L^\infty(I_h)}
\le L_A\eta.
$$

Plainly: $B_A$ bounds the size of the whole acceleration ledger, while $L_A$ bounds how much that ledger can change when the history changes. Finiteness of the root census is what lets the row-by-row bounds be added.

> **Regular history-to-ledger Lipschitz theorem.** Under the hypotheses in Section 1, the selected root graphs, active received-source clocks, each ordinary row, and the complete ledger are Lipschitz functions of the finite-delay history in the displayed norm, with constants $C_S$, $C_R$, $C_U$, $C_{D_t}$, $C_{D_r}$, $L_c$, and $L_A$.

**Claim grade:** `derived on the declared regular chart`. The theorem is falsified by two histories satisfying every stated floor, census, trace, and $W^{2,\infty}$ hypothesis for which one displayed bound fails.

Plainly: this is the estimate FSC-007 was missing. A counterexample must stay inside the same protected chart; crossing an event or losing a floor is a breaking event, not a falsifier of the chart theorem.

The optimal codomain at this regularity is $L^\infty$ for the ledger. A $W^{1,\infty}$ ledger estimate does not follow from $W^{2,\infty}$ histories alone: differentiating a row evaluates the transmitter acceleration at a displaced source time, and translations are not Lipschitz in the $L^\infty$ norm. A stronger ledger-derivative estimate would require, for example, $W^{3,\infty}$ histories or one shared quantitative modulus of continuity for acceleration.

Plainly: bounded acceleration is enough to control the ledger values, but not the derivative of those values. Claiming the stronger norm would silently assume that acceleration itself varies in a controlled way.

## 4. Projected-response continuity at the correct level

The pointwise formula $\mathcal P_{\mathbf V}(\mathbf A)$ is not jointly continuous on the whole closed velocity ball. For a unit vector $\mathbf e$, take $\mathbf V_n=(1-1/n)\mathbf e$ and $\mathbf A=\mathbf e$. Then $\mathcal P_{\mathbf V_n}(\mathbf A)=\mathbf e$ at interior points, while $\mathcal P_{\mathbf e}(\mathbf A)=\mathbf0$ on the boundary.

Plainly: an outward raw acceleration is untouched an arbitrarily small distance inside the speed ball but is removed exactly on the boundary. A proof that assumes one globally smooth pointwise projection would therefore be invalid.

The needed continuity belongs to the evolution response. If $\mathscr S(\mathbf f,\mathbf V_0)$ denotes the unique solution of

$$
\dot{\mathbf V}+N_{\mathcal B_{c_a}}(\mathbf V)\ni\mathbf f,
\qquad
\mathbf V(T_0)=\mathbf V_0,
$$

then maximal monotonicity of the fixed ball's normal cone gives

$$
\|\mathscr S(\mathbf f,\mathbf V_0)-\mathscr S(\widetilde{\mathbf f},\widetilde{\mathbf V}_0)\|_{L^\infty(I_h)}
\le
\|\mathbf V_0-\widetilde{\mathbf V}_0\|
+
h\|\mathbf f-\widetilde{\mathbf f}\|_{L^\infty(I_h)}.
$$

Plainly: although the instantaneous boundary formula has a jump, the complete constrained velocity trajectory is stable. Starting from nearby velocities and supplying nearby ledgers produces nearby velocity histories, with no amplification beyond the elapsed-time integral of the ledger difference.

## 5. Local contraction, existence, and uniqueness

Choose $h<\tau_0$. Every root used on $I_h$ then has source time before $T_0$, so the fixed retained history supplies all transmitter traces during the first method-of-steps interval. For fixed transmitter histories and two candidate receiver positions $\mathbf x,\widetilde{\mathbf x}$, define

$$
c_R=1+\frac1{d_t},
\qquad
c_U=\frac{2c_R}{r_0},
\qquad
c_D=c_U+\frac{A_0}{d_t}.
$$

The root shift is at most $\|\mathbf x-\widetilde{\mathbf x}\|/d_t$, and one row satisfies

$$
\|\mathbf a_c(t,\mathbf x)-\mathbf a_c(t,\widetilde{\mathbf x})\|
\le
\ell_c^{\mathrm{rec}}\|\mathbf x-\widetilde{\mathbf x}\|,
$$

where

$$
\ell_c^{\mathrm{rec}}
=
k_c\left[
\frac{c_U}{r_0^2d_t}
+
\frac{2}{d_t^2r_0^3}
+
\frac{c_D}{r_0^2d_t^2}
\right].
$$

Set

$$
L_{\mathrm{rec}}
=
\max_i\sum_{c\in\mathcal C_i}\ell_c^{\mathrm{rec}}.
$$

Plainly: during the first short step every transmitter event lies in the already known past. The only unknown entering the raw ledger is the receiver's current position, so this sharper constant avoids charging the contraction for an independent future source-velocity error that is not present.

Let $\mathscr K_h$ be the complete sup-norm space of ball-valued velocity paths with the fixed initial velocity and Lipschitz constant at most $B_A$. Their positions are

$$
\mathbf X_{\mathbf v}(t)
=
\mathbf X(T_0)+\int_{T_0}^t\mathbf v(u)\,du.
$$

Require as a separate **invariant-cylinder hypothesis** that these integrated paths remain inside the declared chart buffer for the chosen $h$. This is checkable from the chart's position, velocity, census, and guard margins; it is not implied by the word regular.

Plainly: the candidate set contains every speed-limited velocity curve whose acceleration is no larger than the maximum ledger. The invariant-cylinder check confirms that none of those candidates can reach a singular boundary during this one step.

Define $\Gamma\mathbf v$ by forming the complete ledger along $\mathbf X_{\mathbf v}$ and solving the normal-cone evolution with that supplied ledger. Then

$$
\|\Gamma\mathbf v-\Gamma\mathbf w\|_{L^\infty(I_h)}
\le
q\|\mathbf v-\mathbf w\|_{L^\infty(I_h)},
\qquad
q=\frac12L_{\mathrm{rec}}h^2.
$$

Moreover $\|\dot{\Gamma\mathbf v}\|\le B_A$, so $\Gamma$ maps $\mathscr K_h$ into itself. The explicit sufficient step conditions are

$$
0<h<\tau_0,
\qquad
\frac12L_{\mathrm{rec}}h^2<1,
$$

together with the invariant-cylinder check.

Plainly: a velocity error first accumulates into a position error, and the changed acceleration then accumulates back into velocity. Those two integrations make the feedback gain proportional to $h^2$. A short enough step shrinks the error and keeps the iteration inside the protected cylinder.

Banach's fixed-point theorem supplies one and only one $\mathbf v\in\mathscr K_h$ with $\Gamma\mathbf v=\mathbf v$. Its position lies in $W^{2,\infty}$, it satisfies the complete-ledger normal-cone inclusion almost everywhere, and its root census and clocks are the declared ones.

Plainly: the fixed point is the local delayed solution. Existence comes from convergence of the iteration; uniqueness comes from the fact that two fixed points would have to be closer by the factor $q<1$, which is possible only if they are identical.

> **FSC-007 regular-chart local well-posedness theorem.** Every atom-free finite-delay initial history admitting the stated fixed census, floors, $W^{2,\infty}$ bound, inactive-channel certificates, trace compatibility, event buffer, and invariant cylinder has a unique local constrained continuation for every sufficiently short step satisfying the displayed delay and contraction inequalities. The theorem applies to the full proposed normal-cone response, including velocity-ball contact, without assuming pointwise continuity of $\mathcal P_{\mathbf V}$.

**Claim grade:** `conditional derived theorem inside the proposed FSC model`. It is falsified by two distinct fixed points inside one declared invariant cylinder satisfying all hypotheses, failure of the explicit contraction estimate, or nonexistence despite the self-map and contraction conditions.

Plainly: local well-posedness is now proved exactly where the chart supplies enough quantitative room. The theorem is conditional because those rooms and certificates must be checked for the history being continued; it is not a universe-wide solution theorem.

## 6. Continuation boundary

Repeat the construction by the method of steps while a uniform positive version of every hypothesis survives. The unique solution continues to the first time at which at least one of the following occurs: a delay or range floor vanishes; $D_t$ or $D_r$ loses its floor; the active census changes; an inactive or same-transmitter certificate fails; a root bracket exits the finite history window; a left or right trace ceases to be the declared representative; the $W^{2,\infty}$ bound or chart buffer is exhausted; a clock gains a plateau, jump, or singular-continuous part; an event guard is reached; or an atom or cross-channel ownership ambiguity appears.

Plainly: the theorem can be restarted as long as the same kind of ordinary wake geometry persists. It stops exactly when the problem becomes a different chart, not at an unnamed “loss of regularity.”

No margin-zero exact-mirror state satisfies these hypotheses: its post-event partner margins have infimum zero, its frozen endpoint and characteristic families are nonordinary, and its continuation is already multivalued. The event-adjacent no-cascade theorem classifies that boundary separately and does not import it into FSC-007.

Plainly: this theorem cannot choose among the exact-mirror waiting-time branches. That event sits precisely where the positive inactive gap and ordinary-clock assumptions fail.

## 7. Specialized circular-binary corollary and route comparison

For the FSC-013 circular tube, one may take

$$
\tau_0=R_*D,
\qquad
r_0=R_*c_\circ,
\qquad
d_t=d_r=\frac{d_\circ}{2},
\qquad
A_0=\frac{1+\rho}{R_*},
$$

with $0<\rho\le\rho_0$. Each receiver has one partner row with $k_c=K$, both self channels have the packet's strict-curvature exclusion, equal-time collision has a positive floor, and the exact all-past FSC-010 circle is a fixed point of $\Gamma$. The exact history therefore supplies its own existence witness, and the contraction proves uniqueness on every sufficiently short invariant regular step.

Plainly: the circular packets supply every geometric number the general theorem asks for. The exact circle also supplies a zero-defect center, so the self-map condition costs no additional assumption for that history.

> **FSC-011 local circular continuation corollary.** The exact FSC-010 all-past circular history has a unique local continuation inside the atom-free FSC-013 fixed-census chart under the proposed constrained response. The continuation is the same circle. A full perturbative theorem for every history in the FSC-013 $W^{2,\infty}$ tube remains conditional on a verified invariant response regime and compatible right-acceleration trace.

**Claim grade:** `derived local solution and uniqueness theorem inside the proposed FSC model` for the exact circular history; `open conditional extension` for the whole perturbative tube. The corollary is falsified by a second distinct local solution in the chart with the same exact circular past, or by failure of any FSC-013 floor along the exact continuation.

Plainly: the prescribed circle is now more than a root-and-balance calculation: within this protected chart, its complete past determines one short future, and that future is the circle. This is not stability; the theorem does not say nearby histories stay nearby for long times or return after perturbation.

The general FSC-007 route is preferable because its constants expose every denominator and can be reused on other regular charts. The specialized circular route is stronger only in verification economy: FSC-013 already proves its census, floors, collision gap, and self-root exclusion. Neither route crosses the exact-mirror event, proves perturbation stability, or supplies a retained physical binary.

Plainly: one theorem does the analytic work, while the circular packet supplies a fully checked place to apply it. Keeping those jobs separate avoids overstating a circle-specific calculation as a general event law.

## 8. Nonclaims

No field-speed ceiling, constrained response, swept-source law, exact-mirror event law, continuation selector, canonical Master Equation change, stability result, capture claim, retained binary, conservation account, or physical realization is adopted. FSC-007 is closed only as the stated regular-chart theorem; FSC-011 advances only to the exact local circular continuation and the declared conditional perturbative boundary.

## Closure goal

Use the quotient, no-cascade, and regular-chart boundaries to frame the operator's continuation-selection decision without importing regular-chart uniqueness into the multivalued exact-mirror event.
