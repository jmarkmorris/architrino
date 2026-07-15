# Section 86 Continuous Controller And Multirate Performance

Date: 2026-07-14

## Scope

This packet records an implementation and measurement round against the
accepted six-worldline Section 86 direct-evolution diagnostic. All physics
tolerances remained unchanged:

- position and velocity: `2e-6`;
- acceleration and quadrature: `5e-3`;
- correction: `2e-7`.

The final diagnostic binary was built at `23:08:09-0400`. Its static library
was built at `23:07:22-0400`, after the latest participating EOM source change
at `23:07:14-0400`.

## Implemented mechanisms

**Derived and implemented.** The opt-in continuous adaptive controller uses
the maximum normalized position/velocity step-doubling error. Its bounded
scale is

$$
q = \operatorname{clamp}\!\left(q_{\min},q_{\max},
0.9\,e^{-1/3}\right).
$$

The exponent is the same cubic local-error scaling already encoded by the
legacy one-eighth headroom rule. Acceptance and rejection tolerances are not
changed. Legacy power-of-two growth remains available.

**Derived and implemented.** The opt-in synchronized multirate publication
layer compares each path's full-step cubic with its two-half-step cubics over
both complete half intervals. A path receives one coarse accepted segment
only when the outward dense position and velocity differences remain below
one eighth of their respective tolerances. The coarse segment's published
remainder is enlarged to enclose the fine path. Other paths retain the two
fine segments. Every path still reaches one common receiver time, the mixed
history set is recertified, and publication remains atomic.

This is a same-law, mixed accepted-history cadence. It does not yet skip the
fine corrector evaluation for slow paths, so it is not the complete active-
receiver multirate scheduler described in the production architecture.

**Verified existing mechanism.** Root-free-cell warm carry was already
implemented. It requires matching history and segment identity, inflates the
prior residual by a proved receiver-time and candidate-history drift bound,
and reuses a cell only when the inflated residual still excludes zero. No
parallel execution change was made in this round.

## Continuous-controller result

**Measured.** The four-step continuous run accepted all four attempts, with
step sizes

`0.0005, 0.0005229088046, 0.0010458176092, 0.0015924037440`,

and reached `t=0.0036611301578` in `405.305441583` seconds. The controller's
next proposed size was `0.0020121240990`. Root certification consumed
`395.860231167` seconds, or `97.67%` of total wall time.

**Measured lower bound.** The legacy power-of-two run required
`598.08552` seconds to reach only `t=0.0035`. Because the continuous run had
already certified dense history through that earlier time in
`405.305441583` seconds, the measured early-horizon gain is at least
`1.47564x`. This is a local diagnostic result, not a cycle-time projection.

## Synchronized-multirate result

**Measured.** Two four-step multirate samples produced the same accepted
schedule, zero rejections, and `t=0.0036596619792`. Their wall times were
`383.861501917` and `470.764073375` seconds. The samples fall on opposite
sides of the `405.305441583`-second continuous-only result. The final-source
sample was `0.86095x` as fast as continuous-only; the two-sample multirate
mean was `0.94850x` as fast.

**Inferred from the measured variance.** No multirate wall-time gain is
established. The feature remains opt-in. The MPFR-heavy fourth step dominates
and has enough run-to-run wall-time variance to swamp the smaller history-
cadence effect.

**Measured path selection.** The classifier coarsened `I+`, `I-`, `O+`, and
`O-` on accepted steps 1, 3, and 4. It coarsened all six paths on accepted
step 2. The middle pair therefore remained on the fine cadence whenever its
dense synchronization error lacked headroom.

**Measured trajectory comparison.** At the first three exactly shared
accepted times, all 108 position and velocity interval components from the
continuous-only and final multirate runs overlapped. The maximum midpoint
differences were `1.35057e-10` in position and `1.03741e-7` in velocity,
below the unchanged `2e-6` local tolerances.

## Warm root-locality result

**Measured over three paired three-step samples.** Warm carry averaged
`9.243083305` seconds; disabling it averaged `9.465927084` seconds. The
measured gain was `1.02411x`. Warm carry reduced reevaluated root cells from
`521708` to `421772` per run, a `19.16%` reduction, while root-batch wall time
improved by `2.17%` on average.

The result supports retaining certificate-safe locality, but it also shows
that cell-count reduction is not a wall-time proxy.

## Validation

**Measured.** The final source passed:

- 16 native coupled-evolution tests;
- 14 native history/root-layer tests;
- the EOM CMake build;
- scoped `git diff --check`.

The coupled tests include bounded continuous step selection, atomic mixed-
cadence publication, and fewer retained segments for a certified slow path.

## Verdict

**Measured.** Continuous error-scaled step selection bought at least
`1.47564x` over the measured early horizon and is the retained performance
result of this round.

**Measured negative.** Synchronized multirate publication is numerically
valid and reduces slow-path segment cadence, but it did not establish a wall-
time gain under the MPFR-heavy Section 86 sample. It remains opt-in pending a
larger matched sample or the full active-receiver scheduler.

**Measured.** Existing certificate-safe warm locality bought `1.02411x` over
the three-step paired sample and remains enabled.
