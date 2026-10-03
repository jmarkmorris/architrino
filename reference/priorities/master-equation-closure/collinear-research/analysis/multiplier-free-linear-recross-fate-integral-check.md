# Independent checks of the recrossing continuation

## Independence and inputs

The new [centered velocity-clock audit](../../../../../scripts/collinear-research/linear-recross-fate-independent-integral.py) checks the [recross continuation](multiplier-free-linear-recross-fate-continuation.md) without reading the subject's acceleration arrays or source-coordinate solver state. It reads recorded receiver times and velocities, integrates $w=1+v$ to reconstruct the centered clock $P-P_u$, and separately compares that reconstruction with the subject's saved centered position. Recent source clocks are built from the reconstructed velocity integral; the unchanged polynomial root oracle enumerates every admitted earlier source in each channel. This is a numerical consistency check of supplied trajectories, not an exact released-history enclosure or global fate theorem.

Source inputs and receivers are copied by SHA-256 before each final target read. The final fine first-loop input is the byte-frozen dense profile in `.local-data/collinear-research/linear-recross-fate/final-h8192/`. It contains 4001 samples of each singular source-coordinate segment and 1001 samples of the smooth surviving-root return. The source-coordinate subject and the velocity-integral audit were authored separately. Their common law is a hypothesis being checked, not independently established physics.

## Known references before target use

An exact quadratic clock checks integration of linear recorded velocity. An exact parabolic negative-source root checks per-hit reception-time integration; its analytically known acceleration is $-k(1/B+1/\sqrt{Bb})$ for $B=0.6$, $b=1.4$. The integrated reference on $0.001\le T\le0.01$ is -0.007104138310550573, and the direct quadrature error is $2.39\times10^{-15}$. The frozen range service's exact unequal-curvature fold and receiver-mapping controls also pass before each target.

A second exact control checks piecewise velocity interpolation at an acceleration jump. A single interpolation across a received fold can distort the smooth segment after it; each side must retain its own velocity interpolant. The final audit therefore splits the recorded velocity at the downward birth and minimum reception. The initial unsegmented attempt had a large artificial clock mismatch and supplies no accepted equation result. The corrected exact piecewise-linear control passes before the target reconstruction.

All numerical instances use $c_f=1$ and the executable shared venv. Neither immutable oracle nor its range service was changed. Their known-case runtime outputs are routed to the new ignored evidence owner.

## Clock and positive-cutoff integral results

Independently integrating the initial sample-B upward interval gives a maximum centered clock discrepancy $1.33\times10^{-18}$ against its source-coordinate reconstruction, with endpoint height $3.96758766606\times10^{-10}$. The exact quadratic control preceded this diagnostic. For the final dense first recross continuation, the independent piecewise velocity integral differs from the subject's centered clock by at most $1.96\times10^{-18}$ through its next upward event. This removes the earlier large cancellation in $T+x$; it does not establish exact history accuracy.

The final complete polynomial census gives one partner plus three self roots on the downward interval, then one partner plus one self root after the minimum pair disappears. Positive and negative channels are all inspected; zero-delay diagonals are excluded. The receiver-time integral uses 31, 61 and 121 partitions with order-16 Gaussian quadrature and endpoint clustering.

| Window | Finest velocity-increment residual | Scope |
| --- | ---: | --- |
| 16.168638027557 to 16.168641468162 | $-7.69\times10^{-9}$ | After positive downward-birth cutoff to minimum reception minus $10^{-9}$ |
| 16.168641479162 to 16.168787129579 | $3.34\times10^{-14}$ | Minimum reception plus $10^{-8}$ to next upward event minus $10^{-7}$ |

The first residuals are approximately $-7.69\times10^{-9}$ on each refinement, rather than tending to zero with receiver quadrature. This checks the reconstructed polynomial equation to that measured consistency scale; no independent continuous error bound or certificate across the omitted singular endpoints is claimed. The second residual is stable near $3.34\times10^{-14}$. The exact conditional minimum-fold theorem supplies the event mechanism separately. The saved final receipt records all source/receiver identities, complete probe ledgers and individual refinement values.

## Independent global-profile application check

The new [profile checker](../../../../../scripts/collinear-research/linear-recross-fate-profile-check.py) examines the surviving old-source profiles used by the [conditional global theorem](multiplier-free-linear-recross-fate-independent-check.md#a-uniform-source-normalization-permits-global-no-turn-continuation). Before its target it checks an exact cubic derivative range, the exact normalized smaller-family orbit at four curvatures, and the claimed saddle eigenvalues. Maximum orbit residual is $1.42\times10^{-14}$ and eigenvalue comparison error $2.22\times10^{-16}$.

For the frozen h8192 source, take the absolute receiver-clock interval $I=[7.1442355762350225,7.144237576235023]$. Each surviving inverse-source interval lies within a single cubic polynomial cell, so its derivatives are smooth there. Exhaustive evaluation of the derivative endpoints and interior polynomial extrema gives

$$
0.264062154727\le Q'(s_p)\le0.264063063419,
$$

$$
1.786902977106\le P'(s_o)\le1.786902994531.
$$

Consequently the measured conservative polynomial bounds are $\alpha\ge0.923758959214$ and $R(T_u,L)\ge7.602870362593$, well above $2\sqrt{k}\approx1.070006748213$. With $R=\alpha T+\beta$ this gives $R(T,L)\ge7.602870362593+0.923758959214(T-T_u)$ on this compact clock interval for all $T\ge T_u$. These are floating-point polynomial-range measurements. They support the conditional theorem's profile application and smoothness assumptions, but do not certify the exact held-release history or replace outward-rounded interval arithmetic.

## Evidence limits and falsifiers

Receipts, copied inputs, scripts and final snapshots belong to `.local-data/collinear-research/linear-recross-fate-independent/`. A disagreement between integrated velocity and centered position, a missing root in any of the four channels, a materially larger increment residual after a conditioning-resolved reconstruction, or failure of a known control would withdraw the respective numerical consistency claim. Profile application would fail if an inverse crossed a polynomial knot, a transmitter denominator vanished, $\alpha$ lost positivity or the old acceleration fell below its threshold on the declared interval. Global behavior follows only from the independent conditional proof; finite numerical cycles never establish it.
