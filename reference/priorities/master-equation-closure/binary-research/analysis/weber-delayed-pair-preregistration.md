# Delayed Weber pair: preregistration

**Status: frozen 2026-10-06T03:03Z by the Principal Investigator, before any target evaluation.** This document fixes the law, the preparations, the known cases, the tolerances and the team's own predictions for the investigation launched by the [launch brief](weber-delayed-pair-launch-brief.md). The actual investigation clock started at 2026-10-06T02:56:30Z, the time of this session's first command, and its deadline is 2026-10-06T06:56:30Z. Nothing below is a result. Edits after the freeze time are limited to the dated addenda section at the end.

## 1. The law under investigation

The law is [Section 9a of the equation-variants manuscript](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation), unchanged. For every locally smooth ordinary causal root $S=S_{ij}(T)$ with delayed range $\mathscr R_{ij}(T)=\|\mathbf X_i(T)-\mathbf X_j(S)\|=c_f(T-S)>0$, line of action $\mathbf n_{ij}$ from the emission position $\mathbf X_j(S)$ to the receiver $\mathbf X_i(T)$, and transmitter factor $D_{t,ij}=c_f-\mathbf n_{ij}\cdot\mathbf V_j(S)$,

$$
\mathbf A_i(T)=\sum_j\sum_{S\in\mathcal C_{ij}(T)}\frac{\sigma_{ij}Kc_f}{\mathscr R_{ij}^2|D_{t,ij}|}\left[1-\frac{\dot{\mathscr R}_{ij}^2}{2c_f^2}+\frac{\mathscr R_{ij}\ddot{\mathscr R}_{ij}}{c_f^2}\right]\mathbf n_{ij}.
$$

Dots are total derivatives in absolute reception time $T$. The coefficients are $\lambda_{\mathrm W}=-1/2$ and $\mu_{\mathrm W}=1$. Every positive-delay self root is admitted; the same-time endpoint $S=T$ is excluded; there is no boundary response and no softening. The polarity sign is $\sigma_{ij}=q_iq_j$. Every numerical instantiation sets $K=c_f=1$; wherever the $c_f$ dependence matters analytically, $c_f$ is kept as a symbol and the low-speed limit is taken by scaling $K$, speeds and radii.

The geometry is one isolated pair: member 1 is an electrino, $q_1=-1$, and member 2 is a positrino, $q_2=+1$, so $\sigma_{12}=\sigma_{21}=-1$ and $\sigma_{11}=\sigma_{22}=+1$. On a history in which both members remain below the wake speed, neither member has a self root, so each receiver has exactly one partner root. Self roots arise only once a member's speed reaches or exceeds $c_f$; they are admitted whenever they exist.

The approval boundary of the launch brief applies: no other delayed reading of the bracket, no change of line of action, coefficients, exponents or root set, no ceiling or event rule, no additional members, and no future-supported interaction. When the law fails or leaves its domain the failure is reported without a remedy.

## 2. Quantities measured

For a pair with present separation vector $\mathbf r=\mathbf X_1-\mathbf X_2$ and present relative velocity $\dot{\mathbf r}=\mathbf V_1-\mathbf V_2$:

| Symbol | Definition | Role |
| --- | --- | --- |
| $r$ | $\|\mathbf r\|$ | present separation |
| $h$ | $\|\mathbf r\times\dot{\mathbf r}\|$ | angular quantity, a diagnostic and not an invariant of this law |
| $\rho_h$ | $h^2/(4K)$ | slow radius inferred from $h$; it equals the member radius of the zero-delay circle with the same $h$ |
| $\varepsilon$ | $\tfrac12(1+2K/(c_f^2r))\dot r^2+h^2/(2r^2)-2K/r$ | the instantaneous Weber energy-like quantity of Section 9 for $\sigma=-1$, monitored as a diagnostic only |
| $\beta_i$ | $\|\mathbf V_i\|/c_f$ | member speed ratio in the absolute frame |
| $\det M_i$ | $\det(I-\sum\sigma K\mathbf n\mathbf n^{\mathsf T}/(\mathscr R|D_t|D_t))$ | present-acceleration solve conditioning |

Events recorded, in the sense of the Section 9 pair instrument, with no change to the law: contact at $r<10^{-6}$, escape at $r>10^{3}$, speed equality $\beta_i=1$ in the absolute frame (a census change, because self roots become possible), turning points of $r$, and an obstruction when $|\det M_i|<10^{-8}$. The first event is reported with its time.

## 3. Preparations

Every preparation declares a complete past on $S<0$. The release is at $T=0$. Since the law samples the delayed transmitter acceleration, the past must be twice differentiable and must supply positions, velocities and accelerations on the sampled interval. The compatibility defect at release is the difference between the past's acceleration at $T=0^-$ and the law's solved acceleration at $T=0^+$; it is recorded for every preparation and is not removed.

| Label | Preparation at $T=0$ | Declared complete past | Window | Purpose |
| --- | --- | --- | --- | --- |
| SC-1 | Mirror circle, $\beta=0.05$: $\rho=1/(4\beta^2)=100$, $\Omega=\beta/\rho=5\times10^{-4}$; $\mathbf X_1=(100,0,0)$, $\mathbf V_1=(0,0.05,0)$, $\mathbf X_2=-\mathbf X_1$, $\mathbf V_2=-\mathbf V_1$ | the same rigid circle for all $S<0$ | $T\in[0,25133]$, two zero-delay orbital periods | slow secular drift |
| SC-2 | Mirror circle, $\beta=0.02$: $\rho=625$, $\Omega=3.2\times10^{-5}$; $\mathbf X_1=(625,0,0)$, $\mathbf V_1=(0,0.02,0)$, mirror partner | rigid circle | $T\in[0,196350]$, one orbital period | slow drift, speed dependence of the rate |
| SC-3 | Mirror circle, $\beta=0.1$: $\rho=25$, $\Omega=4\times10^{-3}$; $\mathbf X_1=(25,0,0)$, $\mathbf V_1=(0,0.1,0)$, mirror partner | rigid circle | $T\in[0,3142]$, two orbital periods | approach to the fast regime |
| WP-2 | Apocentre release at $x=3$ from the [instantaneous persistence record](weber-overnight-persistence.md): $\mathbf X_1=(1.5,0,0)$, $\mathbf V_1=(0,0.36742346141748,0)$, $\mathbf X_2=-\mathbf X_1$, $\mathbf V_2=-\mathbf V_1$ | the Section 9 instantaneous Weber solution continued backward from the release state, computed with the frozen Section 9 pair instrument over $S\in[-40,0]$, which exceeds the largest possible delay | $T\in[0,476.09]$, twenty instantaneous radial periods | eccentric bound-class state |
| WP-3 | Circle at $x=1$ with the $10^{-3}$ radial and out-of-plane kicks of the persistence record: $\mathbf X_1=(0.5,0,0)$, $\mathbf V_1=(0.00070710678119,0.70710678118655,0.00070710678119)$, mirror partner | Section 9 backward solution over $S\in[-40,0]$ | $T\in[0,88.86]$, twenty instantaneous orbital periods | fast bound-class state near the speed boundary |
| WP-1 | Circle at $x=4$ with kick and common drift $(0.05,0,0)$: $\mathbf X_1=(2,0,0)$, $\mathbf V_1=(0.055,0.35355339059327,0.01)$, $\mathbf X_2=(-2,0,0)$, $\mathbf V_2=(0.05,-0.35355339059327,0)$ | Section 9 backward solution over $S\in[-40,0]$ | $T\in[0,710.86]$, twenty instantaneous orbital periods | drifting centre, loss of boost invariance; optional if time remains |

Rigid-circle pasts are twice differentiable and have a compatibility defect at release equal to the tangential acceleration that the delayed law supplies and the circle does not. Section 9 pasts are twice differentiable solutions of a different law and have a compatibility defect equal to the difference between the two laws on the release state. In both cases the defect propagates as a jump in acceleration at the reception time of the release, because the law samples the transmitter's acceleration. The size of that jump is recorded.

Every window is a fixed interval. Finite survival to the end of a window establishes only the measured interval.

## 4. Known cases that every new instrument passes first

An instrument is run on a target only after it has returned the known answer on each of these and the pass is recorded in a receipt.

1. **Stationary separated pair.** Two stationary members at range $2$: one partner root at lag $2$, $D_t=1$, $\dot{\mathscr R}=\ddot{\mathscr R}=0$, bracket one, acceleration magnitude $1/4$ toward the partner. From the [frozen controls](weber-delayed-pair-controls.md#stationary-controls).
2. **Transverse affine source.** Stationary receiver at $(1,0)$ and source $\mathbf X_j(S)=(0,0.3(S+1))$; at $T=0$, $S=-1$, $\ddot{\mathscr R}=0.09$, bracket $1.09$. Also the general affine formulas $\dot{\mathscr R}=-(\mathbf n\cdot\mathbf v)/D_t$ and $\ddot{\mathscr R}=\|\mathbf v_\perp\|^2/(\mathscr R D_t^3)$ with a stationary receiver. From the [frozen controls](weber-delayed-pair-controls.md#affine-source-controls-in-closed-form).
3. **Zero-coefficient control against the canonical circle.** With $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$ the instrument must reproduce the canonical Master Equation on the rigid mirror circle. Receiver 1 at $(\rho,0)$ with velocity $(0,\beta)$ and partner on the antipode receives one root at angular lag $d$, the unique root of $d=2\beta\cos(d/2)$ on $(0,\pi)$, with $\mathscr R=2\rho\cos(d/2)$, $\mathbf n=(\cos(d/2),-\sin(d/2))$, $D_t=1+\beta\sin(d/2)$, and acceleration $-\mathbf n/(\mathscr R^2D_t)$, whose radial component is $-1/(4\rho^2\cos(d/2)D_t)$ and whose tangential component along the velocity is $+\sin(d/2)/(4\rho^2\cos^2(d/2)D_t)$. For $\beta=0.05$, $\rho=100$: $d=0.0998753\ldots$, to be evaluated by the instrument's own root solve and compared with a direct solve of the scalar equation. The two separately authored lanes derive these values independently; the numbers printed here are the Principal Investigator's and are themselves subject to the lanes' check.
4. **Rigid-circle bracket.** On the same rigid circle with the frozen coefficients, the instrument's $\dot{\mathscr R}$ and $\ddot{\mathscr R}$ on the partner root must vanish to $10^{-12}$ and the bracket must equal one, so the Section 9a acceleration equals the canonical one.
5. **Slow weakly coupled approach to Section 9.** On a prescribed Kepler circle history of member radius $\rho$ with $K=1$, evaluate Section 9a and Section 9 on the same history. Scaling $\beta\to\beta/2$ at fixed $K$ (so $\rho\to4\rho$) must scale the difference of the two laws, normalized by the inverse-square magnitude $K/r^2$, by a factor $1/2$ to within ten percent for $\beta\le0.05$: the difference is first order in $\beta$. The Section 9 bracket's own deviation from one is second order and must scale by $1/4$.
6. **Integrator order.** A refinement study on a prescribed-source problem with a closed-form answer must show the method's nominal order, as in the Section 9 instrument's control (e).

The Section 9 pair instrument [weber-overnight-pair-instrument.mjs](../evidence/weber-overnight-pair-instrument.mjs), already validated, supplies the Section 9 side of known case 5 and the backward pasts of WP-1, WP-2 and WP-3. It is a comparison and a history generator, not a premise.

## 5. Tolerances

- Root location: residual of the arrival identity below $10^{-13}$ in time units.
- Integration: relative tolerance $10^{-10}$ or better; a refinement run at one hundredth of the step or tolerance measures the error.
- Lane agreement: the two separately authored integrators agree on $r(T)$ and $h(T)$ to relative $10^{-6}$ over each window, and on every event time to $10^{-6}$; a disagreement above this is reported as a disagreement, not averaged.
- Rate measurement: the secular rate $d(\rho_h^2)/dT$ is the least-squares slope of $\rho_h^2$ against $T$ over the whole window, with the slope over each half-window reported as a drift check.

## 6. Predictions, frozen before evaluation

The grades are the grades of the predictions now, not of any result.

1. **Rigid rotation (item 1).** On a rigid mirror circle every lag is constant, so $\dot{\mathscr R}=\ddot{\mathscr R}=0$ and the bracket is exactly one. Section 9a on a complete rigid circle equals the canonical Master Equation on the same circle. A rigid circle is a solution of Section 9a if and only if it is a solution of the canonical law; uniqueness of the implicit solve needs $\det M_i\ne0$. For $0<\beta\le1$ there is one partner root and no self root, its tangential coefficient $\sin(d/2)/(4\rho^2\cos^2(d/2)D_t)$ is strictly positive, and therefore no exact circle exists. Above the wake speed the census changes and exact circles are decided by the census. Grade of the prediction: derived in outline; the lanes re-derive it.
2. **First departure from Section 9 (item 2).** On a slow separated history the Weber bracket of Section 9a equals the Section 9 bracket through order $1/c_f^2$; the departure is at order $1/c_f$ and comes entirely from the canonical prefactor: the delayed range, the delayed line of action and the transmitter weight together give $\sigma K[\mathbf e+(\mathbf v_j-2(\mathbf e\cdot\mathbf v_j)\mathbf e)/c_f]/r^2$, where $\mathbf e$ is the present unit separation and $\mathbf v_j$ the transmitter's present velocity. No single ingredient produces it alone. The playback factor $p$ and the delayed transmitter acceleration first appear at order $1/c_f^3$. Grade: derived in outline.
3. **Invertibility.** For the opposite-polarity pair on a history with both transmitter factors positive, $\det M_i=1+K/(\mathscr R D_t^2)>1$ for each member; no obstruction can occur below the wake speed. Grade: derived in outline.
4. **Slow nearly circular pair (item 4).** $h$ increases and the pair expands. The leading rate is the canonical one: $d(\rho_h^2)/dT\to K/c_f$ as $\beta\to0$, with a relative correction that vanishes with $\beta$. Numerically, SC-2 gives a slope within five percent of $1$, SC-1 within fifteen percent, SC-3 within forty percent, all positive. The instantaneous Weber circle, which is exact under Section 9, is not approached. Grade: inferred from prediction 2; the magnitude of the correction is guessed.
5. **Eccentric preparations (item 5).** WP-2 leaves the instantaneous turning interval $[2.0420,3.0000]$ upward within its first five radial periods and shows $h$ increasing on average; no contact, no obstruction and no speed-equality event occur in the window. WP-3 behaves the same way but faster, with $h$ growing by more than ten percent within the window; its member speeds stay below $c_f$. WP-1 shows the same expansion plus a drift-dependent asymmetry. Grade: guessed; at these speeds the bracket can change sign on parts of a period, so the sign of the average drift is not derived.
6. **History domain (item 3).** The equation is a neutral state-dependent delay system: the right-hand side samples the second derivative of the history. Compatibility at release requires the past's acceleration to equal the law's solved acceleration; without it a jump in acceleration propagates to every later reception time of the release and is not smoothed, with amplitude multiplied at each generation by a factor of size $K/(\mathscr R D_t^2)$. For the slow preparations that factor is small and the jumps decay geometrically; for WP-3 it is of order one. Grade: inferred.
7. **Verdict (item 6).** Binding is lost secularly at the canonical leading rate; no bound class persists. Grade: inferred.

## 7. Falsifiers of the predictions

- A rigid mirror circle on which the instrument's $\dot{\mathscr R}$ or $\ddot{\mathscr R}$ is not zero to tolerance, or a subfield circle whose tangential coefficient vanishes.
- A measured difference between Section 9a and Section 9 on identical slow histories that scales as $\beta^2$ rather than $\beta$.
- A negative measured slope of $\rho_h^2$ on any slow circle, or a slope differing from $K/c_f$ by more than the stated margin at SC-2.
- A WP-2 or WP-3 run that remains inside its instantaneous turning interval for the full window.
- A singular present-acceleration block on a subfield history.

## 8. Lanes and files

| Lane | Role lens | Files written |
| --- | --- | --- |
| A, theory and domain, Principal Investigator | hereditary dynamics | this preregistration, [weber-delayed-pair-investigation.md](weber-delayed-pair-investigation.md), [weber-delayed-pair-adaptation-proposals.md](weber-delayed-pair-adaptation-proposals.md) if item 7 applies |
| B, coupled-history instrument and evolution | `germund-dahlquist` | `../evidence/weber-delayed-pair-instrument.mjs`, `../evidence/weber-delayed-pair-instrument.md`, `../evidence/weber-delayed-pair-instrument-controls.json`, `../evidence/weber-delayed-pair-runs.json`, `../evidence/weber-delayed-pair-cases/` |
| C, separately authored reference and adversarial check | `ramon-e-moore` | [weber-delayed-pair-independent-reference.md](weber-delayed-pair-independent-reference.md), `../evidence/weber-delayed-pair-reference.mjs`, `../evidence/weber-delayed-pair-reference-known.json`, `../evidence/weber-delayed-pair-reference-runs.json` |

Lane C does not read lane B's files or outputs until its own numbers are recorded. Lane B does not read lane C's. Both read this preregistration and the frozen controls. Bulky trajectories go to `.local-data/master-equation-closure/weber-delayed-pair/` and scratch to `.tmp/weber-delayed-pair/`.

## Addenda after the freeze

- 2026-10-06T03:04Z, before any target evaluation: the printed value of $d$ at $\beta=0.05$ in known case 3 was corrected from $0.0999375$ to $0.0998753$, the fixed point of $d=0.1\cos(d/2)$; no other change.
- 2026-10-06T03:38Z, recorded after lane B's target runs, as defects of this preregistration and not as changes to any target: (i) SC-2's initial separation $r_0=1250$ already exceeds the frozen escape threshold $r>10^3$, so an escape event is undetectable on SC-2; the window result stands on its own and no escape claim is made for SC-2. (ii) Known case 5 is degenerate in its second half: the Kepler circle $\rho=1/(4\beta^2)$ is the exact Section 9 circle $h^2=2Kr$, on which the Section 9 bracket is identically one, so its second-order scaling cannot be ratioed there; lane B supplied a labelled off-balance circle $\rho=1.2/(4\beta^2)$ for that half. (iii) The root-residual tolerance $10^{-13}$ in time units is not attainable in double precision at reception times of order $10^4$ to $10^5$, where the representable spacing of $S$ is of order $10^{-12}$ to $10^{-11}$; the attained residuals are reported per run. Lane C had not reported when this addendum was written.
- 2026-10-06T03:41Z, after both lanes reported: lane C's reference stopped SC-2 at $T=0$ on the defective escape threshold and completed the window under a labelled deviation with threshold $10^4$, state, window and law unchanged; lane B's crossing-based detector did not fire. Lane C's turning-point times are node-resolved, which explains the lane disagreement on flat extrema recorded in the [investigation](weber-delayed-pair-investigation.md#8-verdict). No target state, window or law clause was changed after the freeze.
