# Independent rejection of two coupled three-dimensional trial histories

Date: 2026-10-03. Scenario: unchanged Master Equation, $K=c_f=1$, all positive-delay self roots included. **Verdict: computer-assisted derived, independently checked rejection of the two literal complete histories `H0.05-T02` and `H0.3-T02`. No exclusion of the Fourier box or arbitrary coupled waveforms.**

## Subject and separate construction

The [frozen subject](ring-nonrigid-3d-followup-coupled-search-2026-10-03.md#measured-six-start-search), SHA-256 `596eca6dc6351e43fe0f986a0996dce0ec2f2c00f2574d75f2d6b30d05c174c1`, defines the two complete histories by literal decimal parameters. Their radius, phase and alternating axial height all vary. The six numerical fits are measured proposals, without a whole-box exclusion.

The separately authored [Cartesian instrument](../../../../../scripts/braid-program/ring_followup_coupled_independent_20261003.py), SHA-256 `2f53229a6768667599556e338710444722170735e859e04b1c80bd6942d43a65`, imports no subject implementation. It reconstructs receiver and source in absolute Cartesian coordinates rather than the subject's reception-rotating coordinates. It evaluates the squared causal gap, its derivative, source velocity and all three acceleration components independently. Subject root boxes are hints only: fresh endpoint signs and a strict derivative prove each root, and fresh signed gap subdivision excludes every complementary interval.

Analytical static-hexagon acceleration $(-5/4+1/\sqrt3,0,0)$ and a known complete static scalar root/complement chart passed before the target. The final known receipt is `.local-data/ring-followup/geometry/coupled-independent/known.json`, SHA-256 `f2a840c266c8cf06f0617723cfcc7a040c9cd52cdae1d97a5ac9ff046364e836`. A pathname correction preceded this final known-first run; no target had run before that correction.

## Complete reception-zero census and residual

Write the subject's dimensionless delay as $\delta=d/R$. Independent global radius, angular-rate and acceleration bounds give a recent-self secant speed strictly above one and a recent-partner range strictly positive. This excludes roots between zero and the positive recent cutoff. The maximum simultaneous geometric separation supplies a finite remote delay bound; the terminal endpoint is chosen strictly beyond it. Neither is an imposed root cap. Every intervening interval is covered by protected roots or strict inactive gaps.

At reception time zero, each trial has exactly eight ordinary roots per receiver, hence 48 directed hits including six self hits by the declared rotation/reflection covariance. Every transmitter divisor is nonzero and every signed contribution is retained. The following deliberately widened outward bounds are for $R^2$ times physical acceleration residual in absolute Cartesian coordinates:

| Literal history | First component | Second component | Axial component |
| --- | --- | --- | --- |
| `H0.05-T02` | $[-0.006720,-0.006719]$ | $[0.0113580,0.0113581]$ | $[0.0782825,0.0782826]$ |
| `H0.3-T02` | $[-0.252944,-0.252943]$ | $[-0.0732250,-0.0732249]$ | $[-0.0973741,-0.0973740]$ |

An exact complete history must have zero residual at every reception time. Its nonzero residual at this one time suffices to reject each literal history, after the complete past census. This verdict therefore needs no promotion of the subject's full-period Fourier intervals or uniform phase-chart assertions. Those are frozen subject results outside this independent acceptance. No stability spectrum is assigned to either failed trial.

The target receipt is `.local-data/ring-followup/geometry/coupled-independent/target.json`, SHA-256 `6a914b4167079f201c9a9ec4d6fd9b8bb867bb7224080cd80006ab4369049483`. Its consumed chart identities are `e824df339064225dc0fea55d8f4db3cf4d56af42eda2296e501de534b3835465` and `a874b5f32f5d991c1d5f7ef4fc474ee2f3a1644db0d924276e2760bc9a397338`. Owned run `6398b6fb-55eb-4def-8c11-b482440d1233` completed in 1.478 supervised wall seconds with exit zero, zero stderr and its process group closed, by the supervisor receipt. Lease closure is operational evidence only.

## Domain, remaining question and falsifier

The accepted negative concerns these two supplied all-time histories only. The six floating optimizer outcomes do not exclude their searched box, prove a global minimum, or establish that every coupled three-dimensional ring fails. Disconnected finite-amplitude balances, more harmonics, other phase relations and arbitrary nonperiodic histories remain open. No exact new structure, evolved motion or stability follows.

An independently demonstrated omitted root, failed recent/remote guard, incorrect Cartesian source velocity or polarity covariance, or corrected outward residual containing zero would overturn the affected rejection. An exact different waveform would answer the remaining existence question without contradicting these two trial negatives. The operator can check the declared literals and receipt paths against the separate instrument.
