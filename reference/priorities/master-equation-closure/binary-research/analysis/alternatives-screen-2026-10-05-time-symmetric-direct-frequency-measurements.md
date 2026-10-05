# Direct Cartesian frequency measurements

This record follows the [frozen independent protocol](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-coordinator-protocol.md), SHA-256 `d0eac315ba22e78aa5b6e5effe9cf5894ab899ec77d3b1bbb9ebf5edc4ae7c8d`. The [direct Cartesian instrument](../evidence/alternatives-screen-2026-10-05-time-symmetric-direct-frequency.py) is frozen at `fbfc188ffa84404528ecff58d4242da866e939650d81c6628b4cbb6d1ab00081` before any target call. It uses shared-venv mpmath at 65 decimal digits and directly evaluates the two full Cartesian source derivatives.

**Known-before-target receipt:** the shared-venv invocation without `--target` returned `passed: true` for stationary derivatives in both source directions, exact translation and phase covariance at a nonzero speed, the Hermitian symbol identity and the two limiting determinant polynomials. The receipt is retained as local provenance in the ignored binary evidence owner, `time-symmetric-direct-frequency-known-2026-10-05.json`. This pass was inspected and recorded before running the fixed six-speed target. The controls validate these identities, not complete root counting.

The finite target has measured grade only. Roots and derivatives found by arbitrary-precision iteration are candidates rather than interval enclosures. The exact all-speed tail theorem is a separate analytical premise; completeness on the remaining compact frequency interval cannot be inferred from these six speeds.

The frozen instrument's `--target` run returned the following measured candidates. The complete precision output is local provenance in `time-symmetric-direct-frequency-target-2026-10-05.json` under the matching ignored binary owner. Every listed determinant derivative is positive at the returned opposite root, but that finite-precision sign is not an interval certificate.

| Physical speed | Opposite frequency candidate | Determinant slope at candidate | Common double-root coefficient |
| --- | --- | --- | --- |
| 0.1 | 0.995085276849 | 1.989980318699 | 3.961156748514 |
| 0.25 | 0.971701899511 | 1.937568999791 | 3.787635028665 |
| 0.5 | 0.909647004168 | 1.771322119079 | 3.346396074809 |
| 0.75 | 0.845508767759 | 1.573744105797 | 2.602032862669 |
| 0.9 | 0.813993764470 | 1.462947366350 | 1.852776588524 |
| 0.99 | 0.798921203768 | 1.400613062930 | 1.258329308841 |

The opposite zero-root quadratic coefficient was numerically minus one at every sampled speed to the working precision. An exact identity is a research lead, not established by this repeated value. The opposite branch appears to remain simple and between zero and one at these samples; no absence of intervening collisions, additional roots or endpoint change follows. The most decisive next step is an analytic coefficient identity and a complete compact-domain enclosure or inequality.
