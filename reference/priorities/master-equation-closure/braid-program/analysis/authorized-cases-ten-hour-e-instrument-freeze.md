# Original E+M finite-history residual instrument freeze

The physical case and departure objective are fixed by [the method record](authorized-cases-ten-hour-e-method.md). This record fixes the concrete subject instrument before its first numerical target. It is a proof/reference instrument over a retained trial, not a production evolution implementation. The EOM solver remains the production solver owner.

## Exact trial and source identities

The retained input is the original finer E+M positive-$10^{-4}$ constant-offset history at `.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json`, SHA-256 `ef83cb8910090bf4c7179ebef65986c8895bb0d693e1a50bc5099a018393e193`. Every post-release stored number is interpreted as the exact binary rational recovered by JSON parsing. Each segment is the unique degree-five Hermite polynomial matching the stored endpoint positions, velocities and accelerations, with derivatives evaluated from that polynomial.

The physical analytic past uses exact decimal $\beta,r,\epsilon$ from the case owner, exact $\omega=\beta/r$, exact quarter-turn angles and the exact owner-defined compatibility patch. Directed interval root brackets enclose all launch hits and the resulting patch coefficients. Only the trial's launch knot is replaced by those exact physical position, velocity and acceleration values. Subsequent stored knots remain unchanged. This deterministic trial reconstruction changes no prescribed physical history; it makes the proof trial share the exact compatible past and removes an artificial floating-point release seam. Interval widths enclose the unrepresented exact coefficients, rather than defining a family of new physical cases.

| Subject source | SHA-256 at pretarget freeze |
| --- | --- |
| [Interval Taylor jets](../evidence/authorized-cases-ten-hour-e-interval-jets.py) | `55e9be8160bdea6efbb4937b505f892c8996070c7b395c1fd4b46f551a4c0553` |
| [Exact trial reconstruction](../evidence/authorized-cases-ten-hour-e-trial.py) | `2e093cc571fe8a822d22e7901c146bddeae56f5f9a2a96d5ae1c9cb33214f19a` |
| [Whole-cell residual](../evidence/authorized-cases-ten-hour-e-residual.py) | `a0dfe37d7a870611d6aec81120df50b24bc23f588267f80e2f3306a51df53335` |

## Whole-cell method and known-first controls

The interval package encloses Taylor coefficients through order four using `mpmath.iv` at 40 decimal digits. An implicit source-clock coefficient is obtained by solving the squared causal equation coefficient by coefficient; its derivative with respect to source time is $2RD>0$. The full response retains delayed source velocity and acceleration, receiver velocity and their changing root. Exact binary interval endpoints are exported as outward-rounded decimal endpoints.

On each receiving cell, the proof first encloses every source root over the whole cell. Trial speed below $0.6$ implies the root-time Lipschitz bound $(1+0.6)/(1-0.6)=4$. Source intervals contained in one analytic or polynomial piece permit a fourth-order Taylor remainder. A source interval crossing a seam causes receiving-cell subdivision; cells no wider than $10^{-10}$ instead use direct interval union evaluation over every source piece. No differentiability across a jerk seam is assumed. Trial speed bounds use the convex hull of Bernstein velocity coefficients and include the entire analytic past.

Claim grade: measured by the shared-venv `--known` run before any target. The controls passed exact binomial, positive-square-root and sine jets; stationary and affine causal roots/full responses; nonzero transverse delayed acceleration; the independently supplied exact quartic accelerated-source E+M response; exact vector quintic derivatives; continuous-acceleration transport across a $C^{2,1}$ seam; the rational diagonal observable; Bernstein bounds; a rational fourth-order remainder; all twelve static-square hit residuals on a whole cell; and outward positive/negative-third exports. The complete known receipt is `.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour/e-known-before-target.json`, SHA-256 `d939b741a0dc1a74f61a77b572e21d03c2ad3aff21996cf56f986c4255862b08`.

The static-square whole-cell control encloses its analytically known residual; it does not claim that an interval bound equals that residual. A wide initial control cell exposed severe interval dependency and did not satisfy the chosen sharpness assertion. Reducing that known-control cell to $[0.25,0.251]$ produced the declared enclosure before any target. This is a bound-sharpness observation, not target evidence.

## Admission and resource boundary

Status: ◐ Partial — independent method admission is recorded in [the reference adjudication](authorized-cases-ten-hour-reference-e-method-adjudication.md); the concrete instrument is submitted for review before target use. The reference's [separate comparison correction](authorized-cases-ten-hour-reference-e-comparison-correction.md) preserves the corrected weighted error coefficient and exact accelerated-source polynomial control.

The proposed first target is an instrument pilot on at most three original receiving segments, with a 150-second internal graceful cutoff and a 180-second owned-supervisor deadline. It uses the existing input and writes a unique `e-residual-pilot-v1.json` beneath the ignored `authorized-cases-ten-hour` owner. Its heartbeat is fixed at 30 seconds. That pilot measures proof cost and enclosure sharpness; it cannot certify a later departure or physical event. A full target, if admitted, remains within $T\le10r$ and the outer campaign deadline, with bounded source/output retention.

The separate subject propagation worker owns tube coefficients and actual-solution error propagation. A residual result is insufficient until that independently assessed recurrence closes all speed, range, separation, denominator, delay and completed-source conditions. Failure of a bound, control, root census, seam cover or resource limit stops the numerical proof path without changing the equation or history. No nonlinear departure, speed-one event or asymptotic fate is claimed by this freeze.
