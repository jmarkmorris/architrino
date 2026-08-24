# Transverse-Moving Two-Architrino Return-Map Diagnostic

Status: CURRENT-SOURCE DIAGNOSTIC; FIRST REBOUND CONFIRMED; NO RETURN INTERVAL, CAMPAIGN FATE, RETENTION, OR PHYSICS RESULT BOOKED (2026-07-24).

This packet records the earlier $s=0.25$ transverse-moving setup. It is not the operator-requested stationary release and must not be used as that experiment's baseline. The zero-velocity experiment is recorded separately in [2026-07-24-stationary-rest-two-architrino-breather-diagnostic.md](2026-07-24-stationary-rest-two-architrino-breather-diagnostic.md).

## Question and answer

For the declared transverse opposite-polarity binary at $c_f=1$, $d=1$, and $s=0.25$, the current EOM solver reproduces one inward-to-outward separation reversal. R1 and R2 agree on its sampled minimum to $4.47\times10^{-7}$ and on its linearly interpolated zero-radial-speed time to $1.36\times10^{-6}$. No later outward-to-inward reversal occurs through the last completed R2 checkpoint at $t=2.4$, so the sampled return map contains zero completed return intervals.

Claim grade: measured sampled diagnostic. The minimum-maximum-minimum return definition is a declared reducer rule, not a theorem of the motion.

Plainly: this pair performs one robust rebound, not a full breath. It opens after the rebound and has not turned back inward in the certified finite trace.

## Refinement result

The read-only reducer `scripts/eom/analyze-binary-breather-frames.mjs` groups the two EOM-emitted endpoint samples, computes

$$
r=\lVert\mathbf x_+-\mathbf x_-\rVert,
\qquad
\dot r=
\frac{(\mathbf x_+-\mathbf x_-)\mathbin{\cdot}
(\mathbf v_+-\mathbf v_-)}{r},
$$

and records a turning bracket only when consecutive nonzero sampled values of $\dot r$ have opposite signs. A completed diagnostic return interval requires minimum-maximum-minimum order. The reducer is descriptive and is not an independent EOM oracle.

| Level | Last atomic checkpoint | Final $r$ | Final $\dot r$ | Turning points | Sampled maximum individual speed | Terminal state |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| R0 | $1.55$ | $0.7838137400$ | $-0.0905614152$ | 0 | $0.499593733$ | `root_completeness_not_certified` |
| R1 | $2.185$ | $0.8544460804$ | $+0.349026238$ | 1 minimum | $0.607740439$ | `root_completeness_not_certified` |
| R2 | $2.4$ | $0.9463067374$ | $+0.500683160$ | 1 minimum | $0.618597774$ | diagnostic stop at checkpoint |

R1 brackets the minimum on $[1.7175,1.7200]$ with sampled minimum $0.7757710298$ and linear zero estimate $1.7186713881$. R2 gives the same time bracket, sampled minimum $0.7757714760$, and linear zero estimate $1.7186700309$. The maximum sampled midpoint drift is zero in every row. There is only one minimum and no later maximum, so period drift, amplitude drift, and return-map drift are undefined rather than zero.

Plainly: finer resolution confirms the same first bounce and sees farther. It does not supply a second turn or any evidence that the motion repeats. The zero midpoint drift is a symmetry diagnostic, not a conservation result.

## Initial-condition and retained-history sensitivity

At R0, all three endpoint-matched retained histories halt at $t=1.55$ while still moving inward. Relative to `P0-inertial`, the final separation differs by $-2.16\times10^{-8}$ for `P1-lateral` and by $-1.16413\times10^{-4}$ for `P2-longitudinal`. These are pre-clearance comparisons and do not satisfy the Campaign 1 prehistory-collapse gate.

Changing only the declared release speed from $s=0.25$ to $s=0.50$ changes the observed finite trace: the pair separates from release and reaches $r=1.281984826$ with $\dot r=+0.528613883$ at $t=1.025$, then halts on `root_completeness_not_certified` without any sampled turnaround.

Claim grade: measured finite-window sensitivity.

Plainly: the one-rebound behavior is sensitive to the release state. The tested faster row opens immediately and never turns back before the solver loses root completeness. None of these short rows establishes that preparation history has been forgotten.

## First failed gates

The first campaign-booking gate is the already-open G3/G4 instrument reacceptance gate. The corrected-solver checkpoint harness has not passed its required separate fresh reacceptance. This run also exposed a concrete G3 problem: after checkpoint resume, `chunksCompleted` and `cumulativeWallSeconds` restart at zero, and a no-step finalization overwrites the manifest with zero counters. The step and chunk heartbeat log retains the actual R2 continuation through $t=2.4$; the manifest therefore cannot be used as a cumulative cost receipt.

Within the evolved motion, the first numerical gate failure is certified root completeness: R0 stops before the first reversal, R1 stops while opening after it, and the $s=0.50$ sensitivity row stops before any recapture. R2 was stopped at the last atomic $t=2.4$ checkpoint because R0/R1 had already failed the required refinement envelope and the next $0.1$ R2 chunk cost $88.49$ seconds.

Claim grade: measured instrument and execution-gate failure.

Plainly: Campaign 1 cannot book this as a bound, dispersed, or breathing binary. The execution instrument still needs reacceptance, and the coarse and middle refinement rows cannot certify the necessary time window.

## Energy and other claim boundaries

No energy, momentum, or angular-momentum diagnostic is reported. The current master-equation readiness matrix states that the causal retained-history update determines acceleration but does not yet define accepted kinematic and wake-account maps closing those quantities. Inventing a standard-mechanics energy for this pair would violate the theory layer and would not be an EOM diagnostic.

Claim grade: derived current theory boundary.

The sampled speed maxima remain below $c_f=1$, but the reducer is not a certified velocity-enclosure instrument. General native fixtures and the independent Python oracle suites passed; no per-run Campaign 1 residual ledger or G5 independent-oracle window was produced. No claim window reaches the $H=20$ prehistory-clearance boundary.

Plainly: there is no legitimate energy balance to quote, and the run is much too short and incomplete to establish retention, permanent stability, a physical assembly, or “breathing forever.”

## Build, checks, and local artifacts

- EOM source digest: `21f6f65348917712dfd9a904cc4d9e12455a41265f5a1f9892c9aebdb23e1c7b`.
- EOM static library SHA-256: `cf1b03edd7d1a53d914d2e3407ab4ed76e6874acac6940f7d7aa59d2e05981f2`.
- Harness source SHA-256: `f382aa77ae2a5eca6a345a9cde814866d597622fde4ad228be076b3e5df7ddeb`.
- Harness binary SHA-256: `7fe866d4bd53d1e48ddac8fcc13ab87e54bb206667736d314fe7e012ec5f8e68`.
- Fresh CTest result: 5/5 passed.
- Independent Python oracle suites: 34/34 history, 12/12 acceleration, and 29/29 coupled evolution passed.
- Reducer unit tests: 3/3 passed.
- Current construction-only workload validation: 27 configurations, 81 production coordinates, 243 refinement rows, and status `passed`; it books no physics.

Raw checkpoints, frames, records, manifests, logs, and reducer JSON remain under `.local-data/braid-program/breather-20260724-current/`, which the repository ignores. Durable conclusions live in this packet.

## Falsifier and next burden

The bounded conclusion is overturned if an accepted, source-frozen harness with cumulative resume accounting passes R1 and R2 root completeness through a later maximum and a second minimum, while the three declared prehistories collapse after $H=20$ and the residual, root-ledger, record-parity, sub-field enclosure, and per-run independent-oracle gates all pass. The smallest next step is to repair and separately reaccept G3 resume accounting, then extend certified root completeness past the present transverse frontier before spending on longer return-map runs.

Plainly: the live result is “one bounce, then unresolved outward motion,” not a breather verdict.
