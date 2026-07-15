# Section 86 Adaptive Step Permission

Date: 2026-07-14

## Question and claim boundary

This diagnostic asks what temporal step the unchanged local-error controller
permits on the Section 86 retained-history evolution. It is not an optimization
round and makes no solver-correctness claim. Agreement among runs of the same
native implementation is convergence evidence only, not independent evidence
of physical correctness.

All rows retain position and velocity tolerances `2e-6`, acceleration and
quadrature tolerances `5e-3`, correction tolerance `2e-7`, the
`sharp_with_finite_width_fallback` chart, the fold-onset-aware temporal method,
and warm root exclusion.

## Instrument

The runner gained two diagnostic-only controls:

- `diagnostic_maximum_accepted_steps` stops after an exact number of atomically
  accepted steps and returns `diagnostic_accepted_step_limit_reached` without
  changing any attempted-step acceptance rule;
- `--state-output` writes accepted endpoint interval midpoints and radii.

The static library was rebuilt at `2026-07-14T19:47:10-0400` and the diagnostic
binary at `2026-07-14T19:47:15-0400`. The latest participating source change
was `2026-07-14T19:46:51-0400`, so the executed binary was newer than every
source file it used.

The 14 native coupled-evolution regression tests passed before measurement.

## Adaptive result

**Measured.** With initial step `0.0005`, minimum `0.00001`, maximum `0.02`,
adaptive growth enabled, eight requested workers, and a 20-accepted-step stop,
all 20 steps accepted and none rejected. The controller sequence was three
steps at `0.0005`, three at `0.001`, and fourteen at `0.002`. It ended with
`controller_step_size=0.002`.

| Accepted step | Step size | Position estimate | Position / tolerance | Velocity estimate | Velocity / tolerance | Wall seconds |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 0.0005 | 3.90286e-10 | 0.000195 | 1.27465e-6 | 0.637325 | 5.40905 |
| 2 | 0.0005 | 2.25148e-11 | 0.0000113 | 9.03438e-8 | 0.0451719 | 5.30168 |
| 3 | 0.0005 | 1.37476e-11 | 0.00000687 | 5.53148e-8 | 0.0276574 | 5.48004 |
| 4 | 0.001 | 1.34624e-10 | 0.0000673 | 2.71157e-7 | 0.135579 | 5.91875 |
| 5 | 0.001 | 8.69504e-11 | 0.0000435 | 1.75558e-7 | 0.087779 | 575.976 |
| 6 | 0.001 | 6.41578e-11 | 0.0000321 | 1.29720e-7 | 0.064860 | 1041.48 |
| 7 | 0.002 | 7.34927e-10 | 0.000367 | 7.36298e-7 | 0.368149 | 840.780 |
| 8 | 0.002 | 5.92045e-10 | 0.000296 | 5.94778e-7 | 0.297389 | 487.974 |
| 9 | 0.002 | 5.39960e-10 | 0.000270 | 5.44846e-7 | 0.272423 | 363.907 |
| 10 | 0.002 | 5.26289e-10 | 0.000263 | 5.31393e-7 | 0.265697 | 276.107 |
| 11 | 0.002 | 5.30250e-10 | 0.000265 | 5.35701e-7 | 0.267851 | 171.017 |
| 12 | 0.002 | 5.52825e-10 | 0.000276 | 5.58744e-7 | 0.279372 | 150.483 |
| 13 | 0.002 | 5.77975e-10 | 0.000289 | 5.84427e-7 | 0.292214 | 130.057 |
| 14 | 0.002 | 6.16244e-10 | 0.000308 | 6.23329e-7 | 0.311665 | 109.305 |
| 15 | 0.002 | 6.61210e-10 | 0.000331 | 6.68994e-7 | 0.334497 | 104.653 |
| 16 | 0.002 | 7.07078e-10 | 0.000354 | 7.15624e-7 | 0.357812 | 89.9829 |
| 17 | 0.002 | 7.67492e-10 | 0.000384 | 7.76991e-7 | 0.388496 | 81.2189 |
| 18 | 0.002 | 8.32814e-10 | 0.000416 | 8.43195e-7 | 0.421598 | 87.1093 |
| 19 | 0.002 | 8.96190e-10 | 0.000448 | 9.07582e-7 | 0.453791 | 88.2900 |
| 20 | 0.002 | 9.82559e-10 | 0.000491 | 9.95176e-7 | 0.497588 | 87.1212 |

**Derived from the controller rule and measured estimates.** Growth requires
two consecutive accepted steps at no more than one eighth of the position and
velocity tolerances, so the velocity growth threshold is `2.5e-7`. Every
accepted `0.002` step exceeded that growth threshold while remaining below the
`2e-6` acceptance tolerance. The observed `0.002` plateau is therefore the
controller doing exactly what its declared rule says.

**Measured cost.** Total evolution time was `4707.580491333` seconds, or
`235.379` seconds per accepted step across the ramp. The fourteen `0.002`
steps averaged `219.143` seconds. The final ten plateau steps averaged
`109.924` seconds. Cost was strongly nonuniform: individual accepted steps
ranged from `5.30168` to `1041.48` seconds. Exact-root work used
`4620.199721663` wall seconds and MPFR worker time summed to
`9179.153708829` seconds.

## Cold-start fixed ladder

**Measured.** Each requested fixed step rejected on its first attempt and then
halted because its minimum equaled its maximum. All three failures were
`numeric_step_budget_exceeded` on the middle-path velocity estimate. Position,
acceleration, quadrature, and correction gates remained within their declared
limits on the attempted step.

| Fixed step | Accepted | Rejected | Rejection rate | Maximum position estimate | Position / tolerance | Maximum velocity estimate | Velocity / tolerance | Maximum correction estimate | Correction / tolerance | Wall seconds |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 0.001 | 0 | 1 | 100% | 1.91394e-9 | 0.000957 | 3.12484e-6 | 1.56242 | 1.87152e-8 | 0.093576 | 2.16312 |
| 0.002 | 0 | 1 | 100% | 4.55472e-9 | 0.002277 | 3.72563e-6 | 1.86282 | 3.47643e-8 | 0.173822 | 2.02975 |
| 0.005 | 0 | 1 | 100% | 1.61612e-7 | 0.080806 | 5.39094e-5 | 26.9547 | 1.77313e-7 | 0.886565 | 241.944 |

Because no cold-start ladder row published an accepted step, there is no
accepted coarse trajectory to compare with a fixed `0.0005` reference. A
reference-only run would not create the missing comparison side, so it was not
run.

## Verdict

- **Measured:** the unchanged adaptive controller permits a history-dependent
  plateau of `0.002` after a required `0.0005` and `0.001` ramp, with zero
  rejected attempts in 20 accepted steps.
- **Derived:** `pinned_fold_aware_temporal_step=1` selects the fold-onset-aware
  integration method; it does not pin the global controller step.
- **Measured:** `0.001`, `0.002`, and `0.005` are not valid cold-start fixed
  steps at the unchanged tolerances.
- **Inferred from measured nonuniform cost:** multiplying the old cycle time by
  the step-count ratio is not a supported runtime forecast. The local-error
  controller permits `0.002` after ramping, but the measured accepted-step cost
  is not remotely constant.
- **Not claimed:** this same-implementation diagnostic is not an independent
  correctness oracle and does not promote any engine, migration, or theory
  claim.

