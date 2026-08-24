# Stationary-Rest Two-Architrino Breather Diagnostic

Status: CURRENT-SOURCE DIAGNOSTIC; INWARD APPROACH CONFIRMED; CROSSING AND RETURN-MAP QUESTION BLOCKED BY ROOT COMPLETENESS (2026-07-24).

## Result

Two opposite-polarity architrinos were placed at $\mathbf X_\pm(0)=(\pm0.5,0,0)$ with both velocities exactly zero. Each was held stationary on $-20\le T\le0$ before release, with $c_f=1$. The cross-wake travel time at release separation is one, so the retained horizon is twenty times that travel time.

The independently checked release acceleration is inward:

$$
\mathbf A_+(0)=(-0.28622861030534,0,0),\qquad
\mathbf A_-(0)=(+0.28622861030534,0,0),
$$

with EOM solver enclosure

$$
A_{r,\mathrm{rel}}(0)\in
[-0.572457220610732,\,-0.572457220610621].
$$

Claim grade: measured EOM-solver diagnostic, with the release row independently recomputed by `eom_independent_oracle/v0`.

Plainly: this is the requested no-kick release. The delayed wake already exists, and the first certified motion pulls the two architrinos directly together.

All three refinements preserve exact collinearity and a midpoint at the origin. They progress inward until the next cross-pair causal roots exhaust numerical precision:

| Level | Last certified $T$ | Separation $r$ | Radial separation rate $\dot r$ | Each path's speed | Speed fraction of $c_f$ | Next attempted endpoint |
|---|---:|---:|---:|---:|---:|---:|
| R0 | $1.24000$ | $0.517362711$ | $-0.886739725$ | $0.443369863$ | $44.34\%$ | $1.24500$ |
| R1 | $1.45000$ | $0.294631865$ | $-1.290596062$ | $0.645298031$ | $64.53\%$ | $1.45250$ |
| R2 | $1.54625$ | $0.152080360$ | $-1.740628434$ | $0.870314217$ | $87.03\%$ | $1.54750$ |

The R2 terminal speed comes from the last atomically published cubic and has declared velocity error $2.14\times10^{-5}$. At the common time $T=1.2$, the three positive-path $x$ positions are $0.275910707$, $0.275911274$, and $0.275911518$ from R0 through R2, while their $x$ velocities are $-0.418499586$, $-0.418498548$, and $-0.418498223$. Thus the shared certified portion is refining coherently even though the reachable endpoint moves.

Claim grade: measured finite-time EOM-solver trace. The sampled reducer is descriptive, not an independent oracle.

Plainly: finer settings let the pair get closer and faster before certification fails. Every certified point is still on the inward leg. The differing stop points are not three different physical outcomes.

## Crossing, recapture, and return map

No certified labeled-path crossing occurs. Consequently:

- there is no crossing location or crossing symmetry error to report;
- there is no speed-at-crossing measurement;
- no post-crossing separation reversal is observed;
- no outer turning point or recapture is observed;
- the trace contains zero inner minima, zero later maxima, and zero complete minimum-maximum-minimum excursions;
- successive-extremum changes and ratios are undefined;
- the finite-time return-map trend is `unresolved`.

The maximum measured midpoint drift and transverse separation are both zero through every retained trace. These are symmetry checks, not conservation claims.

Plainly: the solver certifies “they fall toward one another.” It loses the causal roots before it can tell us whether they cross, bounce, reach the field-speed boundary, or later come back. There is not yet even one complete breath to compare with a second.

## Horizon sensitivity

At R0, stationary retained-history depths $H=10$, $20$, and $40$ produced byte-identical frame streams and byte-identical release-acceleration records. All three stopped at $T=1.24$ with the same separation, radial separation rate, and root failure. The frame-stream SHA-256 is `8830d31256927d06a0fda483d1ee4237be07efb4e5d3e1321d54b67508737aeb`; the release-record SHA-256 is `4e82440946008f5ca24a441bed5b3afa952e51b4288cbecc1044bb5aff6a4396`.

Claim grade: measured lower-bound sensitivity for one constant history. This is not the materially different, endpoint-matched three-prehistory collapse required for a temporal-memory claim.

Plainly: once the stationary history is comfortably longer than the unit wake travel time, making it still longer changes nothing in this trace. That does not prove that arbitrary preparation histories are forgotten.

## Gates and exact failure

The first campaign-booking gate is G3: the corrected-solver checkpoint harness is not accepted and cannot be upgraded in the same change that first exercises this new seed. No campaign fate is booked.

Within the motion, the first failed execution gate is `root_completeness_not_certified`. On every refinement, both cross rows fail with `numeric_precision_limit_exhausted`; the self rows are not the blocker. At R2 the rejected atomic step is $1.54625\rightarrow1.54750$. Only history through $T=1.54625$ is retained.

The independent Python oracle certifies the release roots and acceleration and agrees with the EOM solver at $T=0$. No independent-oracle continuation window was produced near the close-approach failure, and no master-equation residual ledger or post-$H$ collapse window exists.

Claim grade: measured instrument and execution-gate status.

Plainly: the initial attraction is independently checked. The unresolved piece is precisely the close approach, where the production solver cannot yet prove that it has found every causal root.

## Build, checks, and artifacts

- repository `HEAD`: `863b21c9de8fdc896b2f01aef4022cbf1ac41988`;
- live `src/eom` digest: `21f6f65348917712dfd9a904cc4d9e12455a41265f5a1f9892c9aebdb23e1c7b`;
- fresh EOM static-library SHA-256: `a0916a1868ecea0fe7b7aaefef5c6d06ffb012627ca4aecde6685956624dfbf0`;
- evolution-run harness SHA-256: `cb1a652efd0a66c7c2c5742f138e2d57589035c1c5322c2e9d43fa6a936acccd`;
- post-run halt-detail harness SHA-256: `2908e0917462ae3da588879a3070672d7189b4bef49468cd649aec7ae8f88151`;
- fresh compiled EOM checks: 5/5 passed;
- sampled reducer tests: 4/4 passed.

Raw manifests, exact retained-history records, checkpoints, release acceleration, frames, and census rows remain under `.local-data/braid-program/stationary-rest-breather/`, which the repository ignores. The predeclared protocol is [stationary-binary-breather-diagnostic.md](../campaigns/stationary-binary-breather-diagnostic.md).

No architrino-level energy account is reported because no accepted account is defined for this diagnostic.

## Conclusion and falsifier

The correct stationary pair definitely begins a symmetric inward approach. Whether it breathes is unresolved, not negative: the certified trace ends before crossing or a positive-separation inner turn. The result provides no evidence of rebound, recapture, repeated breathing, permanent stability, retention, or physical realization.

This conclusion is overturned by a source-frozen accepted run that preserves root completeness through the close approach and records either (a) crossing, a later outer maximum, and a subsequent inner minimum, or (b) a certified non-crossing inner turn followed by the same outer-return sequence. A repeated breather trend additionally requires refinement-stable successive excursion ratios and the declared acceptance accounts.

Plainly: the next physics question is still worth answering. The obstacle is now sharply localized: extend certified cross-root handling through the near-collision, then rerun this unchanged zero-velocity seed.
