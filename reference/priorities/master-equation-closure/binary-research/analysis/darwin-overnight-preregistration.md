# Darwin lane: preregistration of the binary target runs

## Status

- Run: `darwin-overnight` (start 2026-10-05T12:50Z, final-hour freeze 19:50Z, deadline 20:50Z). Author: `darwin-overnight PI`. Written 2026-10-05 13:19–13:23Z, after the analytic reduction ([investigation](darwin-overnight-investigation.md)), the blind [independent reference](darwin-overnight-independent-adjudication.md) and the [instrument controls](../evidence/darwin-overnight-pair-instrument.md) were complete (all three workers returned by 13:18Z), and before any target run. Frozen at 13:23Z: later changes are appended under "Amendments" with their time and reason and never overwrite the frozen text.
- Grade of this document: a procedure, not a result. It fixes the law, the instrument settings, the tolerances, the case table, the coverage rules and the decision rules so that the round-2 measurements are interpretable without fitting.

## 1. Frozen law and selections

The Section 10 boxed functional of the [equation-variants manuscript](../../equation-variants/manuscript.md#10-darwin-inspired-low-speed-interaction-comparison) exactly as displayed: unit weights in the quadratic velocity term, inverse-distance pair term $-\sigma_{ij}K/r_{ij}$, velocity-coupling term $+\sigma_{ij}K/(2c_f^2r_{ij})[\mathbf V_i\cdot\mathbf V_j+(\mathbf V_i\cdot\mathbf e_{ij})(\mathbf V_j\cdot\mathbf e_{ij})]$, no historical kinetic correction, instantaneous present-position support, $c_f=1$, $K=1$ for every pair, Euler–Lagrange equations solved as the implicit system $H(\mathbf X)\mathbf A=\mathbf G(\mathbf X,\mathbf V)$ with the full velocity Hessian. Opposite polarity ($\sigma=-1$) is the target; same polarity ($\sigma=+1$) is a control. No delay, no fitted coefficient, no kinetic correction, no clamp, projection or softening. The frozen obstruction rule: a history ends when $H$ is singular or ill-conditioned beyond the thresholds below, or when $\det H$ changes sign within a step; no continuation across it.

Units: length $K/c_f^2$, time $K/c_f^3$, speed in units of $c_f$. Interaction parameter $\epsilon=K/(c_f^2r)=1/r$.

## 2. Instrument and settings (frozen)

Subject instrument: `../evidence/darwin-overnight-pair-instrument.mjs`, whose controls receipt `../evidence/darwin-overnight-pair-instrument-controls.json` records 12 of 12 known-case passes before any target use (straight lines, zero-coupling circle and free fall against closed forms, invariant drift and convergence orders under the full law, order swap, rigid rotation, time reversal, obstruction at closed-form threshold radii). Reference: `../evidence/darwin-overnight-independent-reference.mjs` (reduced quadratures and root finding, two quadrature rules bracketed, zero-coupling known case passed first, 23 of 23).

Settings for every target run: primary integrator Dormand–Prince 5(4), relative tolerance $10^{-10}$, absolute tolerance $10^{-12}$; convergence check rerun at relative tolerance $10^{-12}$; cross-integrator fixed-step RK4 with step $h=5$ (for circles at $r_0=400$, $h=10$ is permitted and must be declared in the run record); event time tolerance $10^{-9}$; obstruction thresholds $|\det H|<10^{-12}$ or $\operatorname{cond}_2H>10^{12}$ or a sign change of $\det H$ within a step; contact radius $10^{-3}$; escape radius $10^{4}$; output cadence at most $1/200$ of the shortest relevant period for bound cases and at most one time unit for radial cases. Declared approximation bounds, used as events only (they do not alter acceleration): member speed $0.1$ and $\epsilon=0.05$ (that is, $r=20$).

Agreement tolerances with the reference (acceptance of a measured number as checked): event times, apsides, periods and apsidal advances within $10^{-7}$ relative of the reference value or inside its bracket widened by $10^{-7}$ relative; the two subject tolerance settings within $10^{-7}$ relative of each other; RK4 within $10^{-5}$ relative of the primary. Invariant drift over a run: $|\Delta E/E|$, $|\Delta\mathbf J|/|\mathbf J|$ and $|\Delta\mathbf P|$ each below $10^{-8}$ for the primary setting. Failing an agreement tolerance does not change the result; it marks the number as unchecked and sends the case to the adjudication step.

## 3. Case table

All cases: $c_f=K=1$; two members; polarities as stated; mirror preparation means $\mathbf X_2=-\mathbf X_1$, $\mathbf V_2=-\mathbf V_1$ (so $\mathbf P=0$); separation $r$; "individual speed" is the speed of one member; $u_c(r_0)=(2r_0+\tfrac12)^{-1/2}$ is the exact circular individual speed of the frozen law (derived on both sides); the member on the $+x$ axis moves in $+y$ for tangential launches. Every case records the supremum of member speed, the maximum of $\epsilon$, every event in order with time and state, the invariant drifts, and the coverage entry of Section 4. Run lengths are integration times; a case that ends earlier by an event records the event as its result.

| ID | Polarity | Preparation | Run length | Predeclared expectation (derived, both sides) | What the run measures | Reference values available before the run |
| --- | --- | --- | --- | --- | --- | --- |
| DC-050 | opposite | mirror circle, $r_0=50$, $u=u_c(50)=0.09975093361076327$ | 20 periods ($20\times1574.7184211069932$) | exact circle; inside domain (speed $0.0998$, $\epsilon=0.02$) | separation deviation, return error per period, invariant drift, events | yes (both tables) |
| DC-100 | opposite | mirror circle, $r_0=100$, $u=u_c(100)=0.07062245515464487$ | 20 periods ($20\times4448.433075160754$) | exact circle; inside domain | as above | yes |
| DC-200 | opposite | mirror circle, $r_0=200$, $u=u_c(200)=0.049968779266390755$ | 20 periods | exact circle; inside domain | as above | yes |
| DC-400 | opposite | mirror circle, $r_0=400$, $u=u_c(400)=0.03534429569218016$ | 5 periods | exact circle; inside domain | as above | yes |
| DC-025 | opposite | mirror circle, $r_0=25$, $u=u_c(25)=0.14071950894605836$ | 20 periods | exact circle; outside domain by speed at release (adapted-law statement only) | as above | yes |
| DE-100 | opposite | mirror, $r_0=100$, tangential $u=0.9\,u_c(100)$ | 10 radial periods ($10\times3451.6063244356$) | bound, pericentre $67.85299550778794$, apocentre $100$, apsidal advance $0.058250070627$ per radial period; inside domain (pericentre speed $0.09345$, $\epsilon_{\max}=0.01474$) | apsides, radial period, apsidal advance, drift | yes |
| DR-100 | opposite | mirror rest release, $r_0=100$ | to first stop event | leaves speed domain at $r=49.5$ ($T=649.1260725157$), leaves $\epsilon$ domain at $r=20$ ($T=759.0853889143$), obstruction at $r=1$ ($T=792.3083820322$, speed $0.70356236397$) | event times, speed at obstruction, no $c_f$ crossing | yes |
| DH-100 | opposite | mirror head-on, $r_0=100$, individual speeds $0.02$ inward | to first stop event | $r=20$ at $T=596.0555909292$, obstruction at $r=1$ at $T=629.1840957683$ | as DR-100 | yes |
| SR-100 | same | mirror rest release, $r_0=100$ | to $r=200$ | disperses; asymptotic individual speed $0.1$; $r=200$ at $T=1143.3778308988$ | event time, speed | yes |
| SH-100 | same | mirror head-on, $r_0=100$, individual speeds $0.05$ inward | to the turning point and back to $r=100$ | turning point $r_{\min}=80.16032064128257$ at $T=369.1224013167$; no singularity | turning event, time | yes |
| DL-100 | opposite | mirror, $r_0=100$, tangential $u=0.005$ (reduced $\ell=b(100)\cdot100\cdot0.005=0.5025$, $\ell^2<1/2$) | to first stop event | reduced-problem prediction: no pericentre, falls to contact; under the frozen rule ends by obstruction at $r=1$ after leaving the domain at $r=20$ (adapted-law statement) | whether a turning point occurs before $r=1$; event times | no (classification only; reference may compute blind in round 2) |
| DG-100 | opposite | DC-100 preparation plus a common velocity $(0.005,0,0)$ added to both members (so $\mathbf P\ne0$, mirror broken) and an out-of-plane velocity $(0,0,0.002)$ added to member 1 only | 20 periods of DC-100 | reference inference: relative motion stays near the circle to second order in the drift, centre drifts linearly with a periodic wobble; untested | separation history, relative-plane tilt, centre trajectory, drift, events | no (general perturbation; round 2 adjudication) |
| DT-100 | opposite | DC-100 preparation with member 1 speed multiplied by $1.01$ and member 2 unchanged (mirror broken in-plane, $\mathbf P\ne0$) | 20 periods of DC-100 | spectral stability predicts bounded separation oscillation at $\omega_r$ with centre drift; untested | as DG-100 | no |
| WR-150 (withheld) | opposite | mirror head-on, $r_0=150$, individual speeds $0.03$ inward | to first stop event | not computed by either worker before this document | event times to $r=49.5$-equivalent speed crossing, $r=20$, $r=1$ | to be computed blind by the reference worker in round 2 before seeing the run |
| WE-150 (withheld) | opposite | mirror, $r_0=150$, tangential $u=0.95\,u_c(150)$ | 10 radial periods | not computed by either worker before this document | pericentre, apocentre, radial period, apsidal advance | to be computed blind by the reference worker in round 2 before seeing the run |

The withheld cases WR-150 and WE-150 appear in no worker table; the PI chose them at 13:21Z. The reference worker computes them in round 2 from its reduced instrument before it is shown any subject run; the instrument worker runs them without being told the reference values. Agreement on these two is the decisive independent check that neither side was tuned to the other.

## 4. Speed and approximation-domain coverage rules

For each case: inside the declared domain means supremum of member speed $\le0.1$ and maximum $\epsilon\le0.05$ over the whole recorded interval; partially inside names the first exit event; outside at release is stated as such. Speed labels: a history whose member speeds never reach $c_f=1$ supports the unrestricted, inclusive-ceiling and strict-ceiling labels on its whole interval, and that is recorded explicitly for all three; a crossing of $c_f$ is an event after which only the unrestricted label applies. A ceiling never modifies acceleration in this law. A result outside the declared domain is a statement about the adapted law and is labelled so; it is not a statement about Darwin's approximation.

## 5. Decision rules (as defined in the launch prompt)

Definitions. A regular robust bound opposite-polarity history inside the declared domain is a measured history of the full Cartesian law that: stays inside the domain for its whole run length; shows recurring finite apsides (or, for a circle, separation deviation below $10^{-6}$ relative per period) for the whole run; conserves the three invariants to the tolerance of Section 2; raises no event other than turning points; agrees between the two integrator settings and with RK4 to the tolerances of Section 2; and, where a reference value exists, agrees with it. "Robust" is established only by DG-100 and DT-100 (perturbations outside the mirror symmetry, with centre drift and out of plane) remaining bounded in separation over their run length; a mirror-only result is not robust.

NO GO (checked, independently confirmed): either (i) the acceleration matrix is singular throughout the relevant domain, which is already excluded by the derived $\det H=(1-1/r^2)(1-1/(4r^2))^2\ge1-1/400$ on $r\ge20$ (both sides); or (ii) the circle cases DC-050 to DC-400 and the eccentric cases DE-100 and WE-150 all fail to be regular bound histories as defined, by an event (contact, escape, obstruction, domain exit) or by secular departure not attributable to step error (confirmed by the tolerance-$10^{-12}$ rerun and RK4), and the reference worker, given the run records, confirms the failure is a property of the law rather than of the instrument. On NO GO the finding is written with its falsifier and the run closes early.

GO to the secondary target (four-member alternating ring) requires all of: DC-100 and DC-200 regular bound for 20 periods; DE-100 and WE-150 bound with apsides and apsidal advance agreeing with the reference; WR-150 event times agreeing with the blind reference; DG-100 and DT-100 bounded in separation for their run length with drift as inferred; no disagreement left open between subject and reference on any derived statement except those explicitly recorded as open in the adjudication section of the investigation file.

CONTINUE (neither) in every other outcome: the binary remains the target, the failing case is analysed, and no ring work starts.

What no outcome establishes: global persistence (a theorem is required), physical binding, physical energy or momentum, or anything about delayed laws.

## 6. Order of work in round 2

1. Reference worker (blind to subject runs): compute WR-150 and WE-150 and, if time allows, DL-100, from its reduced instrument; append to its controls JSON and adjudication file before being shown any run record.
2. Instrument worker: run the case table in the order DC-100, DE-100, DR-100, DH-100, SR-100, SH-100, WR-150, WE-150, DC-050, DC-200, DC-400, DL-100, DG-100, DT-100, DC-025; write run records under `.local-data/master-equation-closure/darwin-overnight/instrument/targets/` and a measured-runs summary into `../evidence/darwin-overnight-pair-instrument.md`; then the PI copies the summary table into "Measured runs (round 2)" of the investigation file.
3. PI compares, then the reference worker adjudicates the frozen run records in its reserved section.
4. Reduction worker: resolve the open common-centre spectrum question in closed form in its own file.

## Amendments

None.
