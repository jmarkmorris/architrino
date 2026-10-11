# Spherical curvature coverage, wave 16: the six poles at g = 1/10 continued past first reception

Author: Claude specialist "spherical-curvature coverage" (jack-k-hale), for the Claude PI of the operator-selected spherical 3:3 Master Equation investigation. Written 2026-10-11, between 02:57 and the save stamp at the end of this file (UTC, read with `date -u`). Frozen on handback; corrections only as dated companions. Prior waves 1 to 15 are frozen and unchanged.

Law and conventions as in every prior wave: sphere of radius R = 1, canonical all-root acceleration, c_f = 1, K = 1, radial part discarded, prescribed histories are input, no integrator of any kind. All intervals below are outward-rounded mpmath `iv` enclosures at 30 digits (directed rounding for the arithmetic, square root, sine and cosine); every enclosure in the JSON records contains the exact value under the stated premises. Intervals are quoted in this report by truncating both endpoints to the digits shown (the upper ends quoted here can therefore sit below the stored upper ends by less than one unit in the last quoted digit); the exact outward-rounded endpoints are the 25-digit strings in the JSON files. Grades: derived, measured-with-enclosure, inferred; falsifiers are stated per claim. Every post-reception value below is a moving-source value and is labelled **unadjudicated pending the reviewer's moving-source/pole great-circle reference**.

## 0. Result in plain words

The six poles released from rest at g = 1/10 reach their first reception (the window end, where positrino P1 first reads a post-release emission of another member) at T* in [1.366684593623, 1.366684709182], with the arc coordinate q(T*) in [0.0935969659, 0.0935971742] and speed in [0.1373057801, 0.1373059342] (the wave-15 window end reproduced by the same machinery). The images read first are the two nearest electrinos E2 and E3, both at the same delay by symmetry. From T* the motion was continued by the interval method of steps with the wave-13 affine delayed-forcing model, ten fixed steps of Delta = 0.01, every step certified sub-wake with the other three images fixed and with the delay containment asserted. The certified reached time past reception is

- t in [1.466684593623, 1.466684709182] (exactly T* + 0.10), with q in [0.1078360786, 0.1078365557] and speed q' in [0.1474868323, 0.1474914818];
- the delayed feedback accelerates: at that time the enclosed speed lies above the fixed-image reduction's speed, which is in [0.1474760960, 0.1474762344], by an excess in [1.0598e-5, 1.5386e-5]; the sign is decided at the ends of steps 4 to 10, undecided (overlapping enclosures) at the ends of steps 1 to 3;
- the exact stop: the eleventh step (t in [1.4666846, 1.4766847]) closes as an enclosure but cannot be certified with the other images fixed, because the like images P2 and P3 are first read at t_like in [1.4670405072, 1.4677497282], inside that step. Nothing failed numerically; the model's premise (only E2 and E3 moving) ends there.

## 1. Assignment and boundaries

Wave-16 assignment (PI): continue the g = 1/10 six-pole rest release past the window end by the interval method of steps; derive the first images read, the root equation and transmitter factor for a source moving along its own meridian, the post-reception right-hand side as a function of q(t), q(t - tau), q'(t - tau), continuity at the window end, and the time at which the next image class is read; (1) enclose the window motion as the history; (2) a fixed plan of at most 40 steps of Delta = 0.01 with the wave-13 affine model, with the psi'' hull repair and the tau-containment assertion, certified while sub-wake and while the other images stay fixed; controls as in wave 13; report the certified reached time, the enclosed position and speed there, the sign of the feedback relative to the fixed-image reduction at the same time, and the exact stop.

Boundaries kept: writes only under the coverage prefix; no edit of any frozen file; no git write command; nothing deleted, overwritten or moved among retained outputs (one provenance gap is declared in section 7); no integrator; foreground runs under 120 s, pinned, with PID, `/usr/bin/time -p` and the internal alarm in the receipt from the first command; the compute slot is held.

## 2. Derivation (grade: derived)

Geometry (wave 14). Positrinos start at +e1, +e2, +e3, electrinos at -e1, -e2, -e3. The symmetry group of order 12 (the cyclic permutation C3 of the axes, the three mirrors swapping two axes, and the inversion composed with the charge swap) carries P1's great-circle path to every other member's path with the same arc coordinate q(t). P1 moves on

X1(q) = cos q e1 - sin q (e2 + e3)/sqrt2, T1(q) = dX1/dq = -sin q e1 - cos q (e2 + e3)/sqrt2,

P2 on X2(q) = cos q e2 - sin q (e3 + e1)/sqrt2, P3 on X3(q) = cos q e3 - sin q (e1 + e2)/sqrt2, and the electrinos on -X1, -X2, -X3. During the window (t < T*) P1 reads every other member at its initial site: chords sqrt(2 + sqrt2 sin q) to +e2 and +e3 (increasing in q), sqrt(2 - sqrt2 sin q) to -e2 and -e3 (decreasing), 2 cos(q/2) to -e1 (decreasing).

(a) Which images are read first. P1 first reads a post-release emission of member j at the first t with t = chord_j(q(t)) (the emission at time 0 from the initial site). The smallest chord along the motion is the one to -e2 and -e3: sqrt(2 - sqrt2 sin q) = sqrt2 - q/2 - q^2/(8 sqrt2) + ..., strictly below sqrt2 for q > 0 while the like chords exceed sqrt2 and the antipode chord is near 2. The two chords to E2 and E3 are equal for every q (the mirror e2 <-> e3 fixes P1's path and swaps E2 and E3), so both are read at the same delay, and the window end is T* = sqrt(2 - sqrt2 sin q(T*)). From T* on, the hits from E2 and E3 come from post-release emissions of moving sources; the hits from +e2, +e3 and -e1 remain the fixed-site hits until their own chords are reached (section 2(e)).

(b) Root equation and transmitter factor. The source E2 sits at -X2(q') at its own emission time, with q' = q(t - tau) (its own arc coordinate at that time; by symmetry the same function q). Receiver-minus-emitter vector r = X1(q) + X2(q'), and with X1(q).X2(q') = -sin(q + q')/sqrt2 + sin q sin q'/2,

r^2 = 2 - sqrt2 sin(q + q') + sin q sin q'.

The causal root condition is tau = r(q(t), q(t - tau)); at q' = 0 it reduces to the fixed chord. The source velocity along its own meridian is V = -q'(t - tau) T2(q') (the electrino moves on the great circle through -e2 toward +(e3 + e1)/sqrt2, by the symmetry image of P1's motion). Its component along the emitter-to-receiver direction rhat = r/|r| uses T2(q').X2(q') = 0 and

T2(q').X1(q) = -cos(q + q')/sqrt2 + sin q cos q'/2, so V.rhat = q'(t - tau) M/r with M = cos(q + q')/sqrt2 - sin q cos q'/2,

and the transmitter factor is D_t = c_f - V.rhat = 1 - q'(t - tau) M/r. M is positive on the range reached here (it is 1/sqrt2 at q = q' = 0), so the source approaches along the line of sight and D_t < 1: the delayed hit is amplified. Monotonicity of the root function: h(tau) = tau - r(q(t), q(t - tau)) has dh/dtau = 1 + (dr/dq') q'(t - tau) = 1 - V.rhat = D_t > 0 sub-wake (the identity dr/dq' = -M/r is checked from the explicit partial derivative), so the root is unique and bisection on the sign of h is legitimate; for the same reason the root from E3 is the same number.

(c) Post-reception right-hand side. The tangential hit on P1 from E2 (unlike, attracting) is a_E = -(T1(q).r)/(r^3 D_t) with T1(q).X2(q') = -cos(q + q')/sqrt2 + cos q sin q'/2, hence

a_E(q, q', v') = N/(r^3 D_t), N = cos(q + q')/sqrt2 - cos q sin q'/2, r^2 as above, D_t = 1 - v' M/r, v' = q'(t - tau).

The hit from E3 is the same number by the mirror symmetry (the e2 <-> e3 mirror fixes P1's path and T1 and swaps the two sources). Writing F(q) for the full fixed-image tangential field of wave 14 (five fixed images), the post-reception law is

q''(t) = g [ F(q) - 2 a_E^fixed(q) + 2 a_E(q, q(t - tau), q'(t - tau)) ], a_E^fixed(q) = cos q / (sqrt2 (2 - sqrt2 sin q)^(3/2)),

the centripetal term having been discarded as in every wave (it is radial on the sphere; the tangential projection is what the arc coordinate obeys).

(d) Continuity at the window end. At t = T* the delayed argument is zero: q' = 0 and v' = 0, so r = sqrt(2 - sqrt2 sin q), N = cos q/sqrt2, D_t = 1 and a_E = a_E^fixed: the right-hand side is continuous across T* (its value is g F(q(T*)) from both sides); its first derivative is not, because the delayed source starts to move. This is why the wave-13 model, which carries the acceleration as a value plus a range of its time derivative, is the right tool and why the first steps carry the hull of the history's acceleration over the release (section 3).

(e) When the next image class is read. The like images +e2 and +e3 are read first among the remaining three at the first t with t = sqrt(2 + sqrt2 sin q(t)); the antipode -e1 at t = 2 cos(q(t)/2), near 2. Both residuals rho_j(t) = chord_j(q(t)) - t are strictly decreasing sub-wake (|d chord/dq| = |T1 . rhat_j| <= 1 and q' < 1), so an image stays fixed over a step exactly when its residual at the step end is positive; this is the certification used (section 3) and the lower bound on t_like comes from the first step on which it fails.

(f) Derivatives for the affine model. The total time derivative of the delayed term along the motion is

da_E/dt = a_q q' + a_q' v' (1 - tau') + a_v' q''(t - tau) (1 - tau'), tau' = (r_q q' + r_q' v')/(1 + r_q' v'),

with q''(t - tau) = g F(q(t - tau)) during the window (the history law), and the partial derivatives a_q, a_q', a_v' obtained by the quotient rule from N, r, M and D_t (the script writes every one of them out explicitly). The fixed-image part contributes g (F'(q) - 2 d a_E^fixed/dq) q'.

## 3. Method

History. The window motion at g = 1/10 is enclosed by the frozen wave-14/15 first-integral machinery executed in-process (q up to 0.3, N = 4000 cells in u = sqrt q, first cell u1 = 0.005): q(s) and q'(s) are enclosed for any s > 0 by `q_of_t`, both increasing in s; for s <= 0 the source is at rest (q = 0, q' = 0, q'' = 0). The window end T* is enclosed by the wave-15 bisection on the strictly increasing residual t - min_j chord_j(q(t)) and agrees with wave 15 (same machinery, same N; the wave-15 value was [1.3666845936, 1.3666847091]).

History hulls and the psi'' hull repair. For a delayed-argument range s in [s_lo, s_hi] the script returns q in [q(s_lo), q(s_hi)], q' in [q'(s_lo), q'(s_hi)] (with the lower ends 0 when s_lo <= 0) and the acceleration q'' = g F(q hull); when the range reaches below the release (s_lo < 0) the acceleration hull is the hull of 0 and g F(q hull), because the source's acceleration jumps from 0 to g F(0) at release. (The first draft returned g F(0) for a range entirely before release; it was corrected to 0 before the validation run val3; see section 7.)

Delay at a step start. tau0 at (t0, Q0) is enclosed by bisection on h(tau) = tau - r(Q0, q(t0 - tau)) (increasing, section 2(b)) with the bracket chord(Q0) +/- 0.03; when the midpoint value straddles zero, the two ends are refined separately (largest tau with h < 0, smallest with h > 0, 40 bisections each), so the width of tau0 is set by the widths of t0, Q0 and of the history, not by the bisection.

Affine step (wave 13). On [t0, t0 + Delta] the candidate sets S (for q) and VS (for q') are inflated hulls of the linear extrapolation; the delay over the step is enclosed by tau_range = tau0 + tau'(S, VS, history over t_int - tau_range) [0, Delta], iterated from the initial range tau0 + [-1, 0.5] Delta, and the assertion tau_new inside tau_range is checked before use (the record carries `tau_containment_asserted`; a step whose range did not contain its image would not close). With the history hulls over t_int - tau_range, the acceleration at t0, a0 = g [F(Q0) - 2 a_E^fixed(Q0) + 2 a_E(Q0, q(t0 - tau0), q'(t0 - tau0))], and the range a' of its time derivative over the step (section 2(f)), the images S_new = Q0 + V0 [0, s] + a0 [0, s^2/2] + a' [0, s^3/6] and VS_new = V0 + a0 [0, s] + a' [0, s^2/2] must lie strictly inside S and VS (closure; at most ten inflations, the plan is fixed and no step size is adapted); the step end values are the images at s = Delta. Certification of a step: closure, up(VS_new) < 1 (sub-wake, which also keeps every root unique and excludes self roots by the sphere theorem), D_t positive at t0 and over the step, tau containment asserted, and every other image fixed at the step end: chord_j(end_q) > up(t_end) for +e2/+e3 and for -e1 (section 2(e)). Run 1 used the coarser (valid) hull test chord_j(candidate S) > up(t_end) and therefore stopped one step earlier; run 2 is the final one (section 7).

Feedback sign. At each certified step end the enclosed speed is compared with the fixed-image reduction's speed at the same time, taken from the window enclosure continued past T* (the first-integral enclosure is an enclosure of the reduction's solution for all q up to 0.3 whether or not the images are actually fixed); the reduction's q and q' are increasing in t (q' > 0 and q'' = g F(q) > 0: the record checks F > 0 on the reduction's q hull and it holds at every step), so the hull of the reduction at the two ends of the narrow step-end time interval encloses it there.

Controls (as in wave 13). (1) Known: a fixed-image affine step from t = 1.2 must intersect the window enclosure's own continuation at t = 1.21 (both enclose the same solution). (2) Negative: at the probe t = T* + 0.05 the delayed hit computed with the wrong sign of the velocity term in D_t must be disjoint from the correct one. (3) Continuity: at T* the delayed term with tau = t and zero history must intersect the fixed-image term.

Plan as stated before the run: at most 40 steps of Delta = 0.01 from T*, stop at the first step that fails certification; no adaptation. Executed twice with identical plan (run 1 with the hull fixed-image test, run 2 with the end-of-step residual test; both outputs retained).

## 4. Results (grade: measured-with-enclosure; moving-source values unadjudicated)

Window end and start state (N = 4000): T* in [1.366684593623, 1.366684709182]; q(T*) in [0.0935969659, 0.0935971742]; q'(T*) in [0.1373057801, 0.1373059342]. Continuity check at T*: delayed term in [0.27578771295, 0.27578872523], fixed-image term in [0.27578771301, 0.27578778337] (they intersect), tau in [1.3666845964, 1.3666847039], D_t in [0.99999659, 1].

Steps (run 2; t_end is the upper end of the step-end time interval, whose width is 1.2e-7, rounded up to eight decimals (the one column not truncated); tau0 and D_t at the step start; q and q' at the step end; "reduction" is the fixed-image reduction's speed at the same time; "like chord" is the lower bound of sqrt(2 + sqrt2 sin q) at the step end, to be compared with t_end):

| step | t_end | tau0 | D_t(t0) | q(t_end) | q'(t_end) | reduction q' | sign | like chord |
|---|---|---|---|---|---|---|---|---|
| 1 | 1.37668471 | [1.3666845964, 1.3666847038] | [0.99999658, 1] | [0.0949751014, 0.0949753124] | [0.1383213237, 0.1383217909] | [0.1383214765, 0.1383216179] | undecided | 1.46086 |
| 2 | 1.38668471 | [1.3659621909, 1.3659754864] | [0.99894754, 1] | [0.0963633938, 0.0963636134] | [0.1393371420, 0.1393385313] | [0.1393374552, 0.1393375841] | undecided | 1.46153 |
| 3 | 1.39668471 | [1.3652460930, 1.3652599753] | [0.99892602, 1] | [0.0977618457, 0.0977620835] | [0.1403532498, 0.1403555790] | [0.1403537176, 0.1403538611] | undecided | 1.46220 |
| 4 | 1.40668471 | [1.3645130498, 1.3645131780] | [0.99845574, 0.99845589] | [0.0991704646, 0.0991707267] | [0.1413705276, 0.1413731771] | [0.1413702853, 0.1413704165] | above | 1.46288 |
| 5 | 1.41668471 | [1.3637670884, 1.3637672446] | [0.99794124, 0.99794167] | [0.1005892592, 0.1005895489] | [0.1423883962, 0.1423913699] | [0.1423871422, 0.1423872878] | above | 1.46356 |
| 6 | 1.42668471 | [1.3630100599, 1.3630102258] | [0.99742710, 0.99742737] | [0.1020182355, 0.1020185560] | [0.1434068624, 0.1434101638] | [0.1434043143, 0.1434044479] | above | 1.46425 |
| 7 | 1.43668471 | [1.3622419433, 1.3622421209] | [0.99691314, 0.99691331] | [0.1034573995, 0.1034577541] | [0.1444259325, 0.1444295653] | [0.1444217814, 0.1444219292] | above | 1.46494 |
| 8 | 1.44668471 | [1.3614627250, 1.3614629164] | [0.99639937, 0.99639947] | [0.1049067572, 0.1049071493] | [0.1454456132, 0.1454495810] | [0.1454395738, 0.1454397098] | above | 1.46564 |
| 9 | 1.45668471 | [1.3606723795, 1.3606726074] | [0.99588567, 0.99588593] | [0.1063663149, 0.1063667477] | [0.1464659109, 0.1464702177] | [0.1464576670, 0.1464578171] | above | 1.46634 |
| 10 | 1.46668471 | [1.3598709144, 1.3598711604] | [0.99537228, 0.99537248] | [0.1078360786, 0.1078365557] | [0.1474868323, 0.1474914818] | [0.1474760960, 0.1474762344] | above | 1.46704 |
| 11 | 1.47668471 | [1.3590583083, 1.3590585746] | [0.99485910, 0.99485927] | [0.1093160547, 0.1093165794] | [0.1485083840, 0.1485133801] | not applicable | not certified | 1.46775 |

Every step closed at the first inflation, with tau containment asserted, D_t positive over the step (step 10: D_t range [0.99485000, 0.99537970]), sub-wake by a wide margin, the antipode chord above 1.997, and the history speed over the delayed range increasing from [0, 0.0021911] (step 1) to [0.0096813, 0.0107653] (step 10).

Certified reached time past reception: t in [1.466684593623, 1.466684709182] = T* + 0.10 (ten certified steps). Enclosed state there: q in [0.1078360786, 0.1078365557], speed q' in [0.1474868323, 0.1474914818]; in Cartesian terms P1 is at cos q e1 - sin q (e2 + e3)/sqrt2 with cos q in [0.99419, 0.99420] and sin q/sqrt2 in [0.076103, 0.076104] (the exact enclosure is the q interval). The delay read there is tau in [1.3598709144, 1.3598711604] with D_t in [0.99537228, 0.99537248] at the step start: the two nearest electrinos are read at emissions made about 0.107 after their release, approaching along the line of sight at about 0.46 percent of c_f.

Sign of the feedback relative to the fixed-image reduction at the same time: above (the feedback accelerates). At the reached time the enclosed speed exceeds the reduction's by an excess in [1.0598e-5, 1.5386e-5] (lower end = lower end of the enclosed speed minus upper end of the reduction's; upper end likewise); the enclosed position also lies above the reduction's q, which is in [0.1078358217, 0.1078360222], by an excess in [5.6e-8, 7.3e-7]. The sign is decided from the end of step 4 on and undecided at steps 1 to 3, where the delayed argument lies in the first cell of the window enclosure (q' hull [0, 0.0022] to [0, 0.0032]) and the step enclosures are as wide as the gap.

Exact stop. Step 11 (t in [1.466684593623, 1.476684709182]) closes as an enclosure (q end [0.1093160547, 0.1093165794], speed end [0.1485083840, 0.1485133801]) but cannot be certified with the other images fixed: the like-image chord at its end, sqrt(2 + sqrt2 sin q) in [1.4677495, 1.4677497], is below the step end 1.4766847. With the closed step-11 set S in [0.1078360786, 0.1093165794] (valid while the like images are unread) the first reading time of the like images P2 and P3 is enclosed:

t_like in [1.4670405072, 1.4677497282]

(lower bound: the smaller of chord(S) and the step start, the larger of the two; upper bound: the larger end of chord(S), which lies inside the step, so the images cannot remain unread past it). The antipode -e1 (chord about 1.997) and all other image classes come later. Continuation past t_like requires the like images' moving-source terms (sources P2 and P3 moving on their own meridians, receding from P1: D_t > 1 there) and is outside this wave's plan.

Run 1 (coarser fixed-image test) certified nine steps, reached t in [1.456684593623, 1.456684709182] with the same per-step enclosures (identical numbers at steps 1 to 9), and stopped at step 10 because the hull test compared the chord over the inflated candidate set with the step end; the sharper end-of-step residual test (derived in section 2(e)) certifies step 10 as well. Both outputs are retained.

## 5. Controls (all pass in validation and final runs)

(1) Known: the fixed-image affine step from t = 1.2 ends at q in [0.0733281287, 0.0733282833], q' in [0.1214262651, 0.1214265264]; the window enclosure at 1.21 gives q in [0.0733281158, 0.0733282892], q' in [0.1214263682, 0.1214265127]; they intersect (and here nest).
(2) Negative: at the probe T* + 0.05 (history speed [0.00536076, 0.00536644]) the correct delayed hit is in [0.27847867, 0.27851422] with D_t in [0.99742752, 0.99743057]; the wrong-sign hit is in [0.27705044, 0.27708580] with D_t in [1.00256943, 1.00257248]; disjoint, the control is sensitive at the 0.5 percent level that the velocity term produces.
(3) Continuity at T*: pass (section 4).

## 6. Grading and falsifiers

- Derived: the images read first and their equal delay; the root equation, the transmitter factor D_t = 1 - q'(t - tau) M/r and the identity dh/dtau = D_t; the post-reception right-hand side; continuity at T*; the strictly decreasing residuals and the end-of-step fixed-image criterion; the derivative formulas of the affine model. Falsifier: any algebraic error in sections 2(b), 2(c) or 2(f); the script carries the formulas verbatim and an independent re-derivation of T1.X2, T2.X1 and r^2 would expose one.
- Measured-with-enclosure: T*, the start state, the ten step enclosures, the reached time, the enclosed position and speed there, the feedback sign and its excess interval, and the t_like bracket. Premises: directed rounding of the listed mpmath operations; the frozen wave-14/15 family, first integral and enclosure; the affine model's remainder form; the fixed plan. Falsifier: a point evaluation of the true solution (by any method the reviewer accepts) outside any quoted interval at the quoted time, or a second interval implementation of the same law disagreeing with these enclosures.
- Inferred: that the excess is produced by the approach of the two electrinos (D_t < 1 and a shorter delayed distance than the fixed chord), not by a numerical artefact: the excess grows step by step as D_t falls (0.9999 to 0.9954) and is absent in the fixed-image control. Falsifier: an enclosure with the velocity term removed but the delayed position kept (or the reverse) that does not split the excess accordingly.
- Not independent evidence: run 1 and run 2 share the script and the history; their agreement is replay agreement only.
- Unadjudicated: every moving-source value (tau, D_t, the post-reception enclosures, the feedback sign and the t_like bracket) pending the reviewer's moving-source/pole great-circle reference.

## 7. Provenance, receipts, preservation

Receipt: `/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave16-commands.txt` (every run: UTC start, cwd, literal command with the thread pin, `/usr/bin/time -p` and the perl alarm of 110 s, PID, exit status, wall/user/sys). Runs: val (N = 500; failed at import because the wave-15 text contains its own marker string, fixed by splitting on the last occurrence), val2 (N = 500, 2.4 s), val3 (N = 500, 7.3 s, after the history and delay-refinement fixes), N4000 run 1 (30.0 s), N4000 run 2 (32.4 s, final), and the two like-reading-time derivations (0.04 s each). All foreground, one at a time, well under the alarm.

Script versions: the step script was edited in place three times during development (the marker fix; the history acceleration hull for pre-release ranges together with the two-sided delay refinement, between val2 and val3; the end-of-step fixed-image criterion, between run 1 and run 2). The outputs of every version are retained, but the exact bytes of the superseded script versions are not (the edits overwrote the single file before the final run). This is a declared provenance gap for val2 and run 1 only: their numbers are reproduced by the retained script except for the documented differences (val2's steps 1 to 3 carried a wider tau0 from the single-sided bisection and run 1 stops one step earlier). From here on, script edits during a wave will be made as new version files.

Evidence files (all under `/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/noether-sea-research/evidence/`, prefix `spherical-curvature-claude-coverage-wave16-`), sha256 at handback:

- `sixpole-steps-iv.py` (final script, run 2 and the like-reading-time inputs): 1f6502823060093a7235b7b284dce3be1cdff0ffbab6f20a380bfcbd6ac5caaa
- `sixpole-steps-iv-N4000-run2.json` (final): 5349837057633d0c81fd8b20f904a3014c2b0a67196e1f5262b0e180db562784; `.out`: db18a1b0b3fd51a306c757fd3c0f2bfbd2b5a69aefaf803a4c1df5e755fd612a; `.out.time`: b80f29aced79458fe2a7d1b79767473db19ab4e464f34b0c14c6bbe1be7e7703
- `sixpole-steps-iv-N4000.json` (run 1, retained): c457e16ae94672baada917c365696904d9d6dc8bb13b3c9a02b326368af09f69; `.out`: 694d98dc32abcc74f7febdef1046647da926afb6639808358a68baf3892fd520; `.out.time`: 97e1f84028571469d14c3ee8c91add98ea764a20ec8ced3308a8d6846c51ff09
- `sixpole-steps-iv-val2.json` / `.out` / `.out.time`: 60572fb32dc8efbc4a4dd3c3440f705d775da624648203d019f5f80c21fbf64d / 5ac9ae354873c35a4527bc236bd58104e5797a8dd65f9540243a7b118708511f / 592bcf46ee1cfbedd3b7e27a02b26aca8286e97aabd1c672aaaa5029cb713f59
- `sixpole-steps-iv-val3.json` / `.out` / `.out.time`: 0a5258b545b2d815cd9241581d8757bde7a0acf629a88069b7f61987bd79ad8e / a0ec25c6a033d0ffeb2040c624534c69888c5ac0e988cc1083c5eb22722e28a9 / 3b4536e26cdc585bcd76d0969021dc04f56bded2cb36b497d1a35956e955f2af
- `sixpole-steps-iv-val.out` (empty) / `.out.time` (the import traceback): e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 / 34d000c3d7e6fa3d1dd4a6fdd2350b4e07e01b60cf11026f0e3efdc395861230
- `like-reading-time-v2.py` / `.out` / `.out.time` (final t_like derivation): bf2fa1aa05252411d86f84da05b4562c9ada84206ea34db94978fad7de1a6a32 / 9460aea153a3889667bef01cb902a767c07abd7a46cb3ddc5be88dad324fd61b / 69f9f3aa5b065ed3264861cca5720425b490a1115f7d8853c8cab77a2ff93a52
- `like-reading-time.py` / `.out` / `.out.time` (v1 on run 1; its upper bound was not established because the step-10 chord range exceeded the step end, which is why v2 states the applicable case): d31cb36f1adecde02855afcf6e2b7bf71b2e0301a86d7380b7fb9e2ee12d0ad8 / 660aa379bb7500a746d588fe2d525b60719cc26695071cc717dbd17d0edc2a68 / 302732af76ca3eab791b52904a4ed3b0f543b9387f423c028783f4353e0912c6
- `commands.txt`: hashed in the handback message (it is appended after this report is saved).

Retained coverage evidence total: 7328 KiB (limit 10 MiB). Nothing was deleted, overwritten or moved among retained outputs. Frozen inputs executed in-process: `spherical-curvature-claude-coverage-wave15-rest-iv.py` and, through it, `spherical-curvature-claude-coverage-wave14-rest-iv.py` (unchanged).

## 8. Limits and next possible actions

Limits: the model holds only while E2 and E3 are the only moving sources, which ends at t_like; the first three steps' feedback sign is undecided because of the first-cell coarseness (u1 = 0.005) of the window enclosure, not because of the model; the affine remainder grows the speed enclosure by about 4.5e-7 per step, so a plan of 40 steps would have stayed decisive had the premise held.

Next possible actions, with a recommendation for each:
1. Extend the method of steps across t_like by adding the like images' moving-source terms (sources P2, P3 on their own meridians, receding, D_t > 1, same derivation pattern as section 2 with sign +1 and the like chord), still with fixed steps of 0.01 and at most 40 steps; recommended, because it is the next premise boundary and the machinery is in place (about 30 s per run).
2. Split the excess into its two causes (delayed position versus velocity term) by two diagnostic enclosures with one ingredient frozen; recommended as a cheap check that turns the inferred mechanism into a measured one.
3. Refine the first cell of the window enclosure (u1 = 0.001) to decide the sign at steps 1 to 3; low priority, since the sign is already decided from step 4 on and the undecided steps carry no contradiction.

Save stamp: report saved at 2026-10-11T03:00:59Z (date -u read immediately before this append); the commands receipt and this stamp line were the only writes after the report body.
Correction stamp: at 2026-10-11T03:01:14Z (date -u read immediately before this append) the step-table caption was amended to say that the t_end column is rounded up to eight decimals rather than truncated (a transcription check found the discrepancy); no number changed. Final hash follows in the handback.
