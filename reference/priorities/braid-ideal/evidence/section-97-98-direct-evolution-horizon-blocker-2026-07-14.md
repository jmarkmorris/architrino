# §97/§98 Direct-Evolution Sign Campaign — Horizon Blocker

**Date:** 2026-07-14

**Disposition:** `priority-only`; `section_97_horizon_blocked`;
`section_98_m_o_i_object_blocked`; `supra_field_deferred`;
`no_growth_sign_adjudicated`; `quarantine_retained`; `no_score_increase`.

## Decision

The direct-evolution campaign does **not** harden or overturn the §97/§98
no-flutter-free-triple negative. The only requested point that can be
constructed exactly with the provenance-bound native circular-history factory
is the zero-drift §97 finalist. Its control-relative evolution reaches at most
$t=0.335$, only $4.83\%$ of the required $t\ge5/0.721318143353=6.931754$ horizon,
before the coupled engine fails closed on root completeness. Step and
prehistory-segment refinement move the usable horizon materially. No evolved
log slope is admitted as a growth-rate or sign measurement.

The §97/§98 flutter row therefore remains T2 **QUARANTINED**. The pencil
magnitudes remain retired. The T1 non-bind negative is untouched.

## Target triage before evolution

| Requested target | Recorded object check | Disposition |
|---|---|---|
| §98 Part 1 branch-set floor, exploratory $\operatorname{Re}\lambda=0.0197978008023$ | Branch 11 is `supra`, order `O-M-I`, and the value is a coarse branch minimum rather than a converged accepted row. | Deferred behind the pinned-fold work. No evolution. |
| §98 Part 1 `M-O-I`, 24-sample $\operatorname{Re}\lambda=0.393849549275$ | Six sites, net charge zero, all senses negative, polarity pattern $(+,-,-)$, negative handedness, common axial drift $u=0.156$, and maximum initial site speed $0.777176<c_f$. The native uniform-circular factory has no axial-drift parameter. | `object_blocked`. Removing $u$ would change the recorded worldlines; no substitute object was evolved. |
| §98 Part 2 point 73, 24-sample $\operatorname{Re}\lambda=0.520758028$ | Field-speed row with two three-charge rings, one two-charge ring, an explicit six-electrino payload, breathing, axis misalignment, and axial modes: 14 worldlines, not an isolated six-worldline triple. It is also the settled sampling artifact excluded by the dispatch. | Excluded. No evolution. |
| §97 best fully scored finalist, recorded $\operatorname{Re}\lambda=0.721318143353$ | Exact six-worldline, zero-drift, sub-$c_f$ object; native-factory compatible. | Evolved; horizon-blocked. |

All other supra-$c_f$ §97/§98 rows are deferred. Nothing in this packet is a
verdict on them.

## Constructed §97 object

The runner constructs the recorded §97 finalist directly from its worldline
coordinates. It does not rerun binding and does not construct a pencil.

- Worldlines: six, as three antipodal two-site rings.
- Per ring: one $+|e|/6$ site and one $-|e|/6$ site; net charge zero.
- Axial order: `I-M-O`; positive handedness; all ring senses positive; all
  polarity orientations positive.
- Field speed: $c_f=1$; drift $u=0$.
- Ring I: $(R,z,\omega,\phi,\alpha)=(0.55,0,
  0.7811697029643574,-0.2827433388230814,-0.47385689191646047)$.
- Ring M: $(R,z,\omega,\phi,\alpha)=(1,0,
  0.7811697029643574,2.0943951023931953,0)$.
- Ring O: $(R,z,\omega,\phi,\alpha)=(0.75,0,
  0.7811697029643574,5.40179403492245,1.1257373675363425)$.
- Initial site speeds: I $0.3823031$, M $0.7811697$, O $0.2522267$; all are
  strictly below $c_f$.
- The recorded radial fitted coupling is $0.22164267233087945$. With explicit
  $\pm|e|/6$ site charges, the native request coupling is
  $36\times0.22164267233087945=7.9791362039116605$. This instantiates the
  recorded point; it is not a new bind fit.
- Circular prehistory: native provenance-bound factory over $[-h,0]$, with
  $h\in\{8,10\}$ and segment widths $0.02$ and $0.01$.
- At time zero, all 36 ordered root rows and all acceleration rows certify
  complete under the moving-history traversal.

## Instrument and unchanged policy

Source: [section-97-98-direct-evolution.cpp](../../../../scripts/eom/section-97-98-direct-evolution.cpp)

Build:

```bash
c++ -std=c++20 -O3 -DNDEBUG \
  -Isrc/eom/include -I/opt/homebrew/include \
  scripts/eom/section-97-98-direct-evolution.cpp \
  .tmp/eom-native-dev/libeom_native.a \
  /opt/homebrew/lib/libmpfr.dylib \
  /opt/homebrew/lib/libgmp.dylib \
  -pthread -o .tmp/section-97-98-direct-evolution
```

The runner evolves an independent unperturbed control and reports the RMS
relative layer-frame rotation after removing mean rotation. The request keeps
the normal §86 policy: sharp chart, root tolerance $10^{-5}$, source-normal
floor $10^{-24}$, acceleration and quadrature tolerances $5\times10^{-3}$,
position and velocity tolerances $2\times10^{-6}$, correction tolerance
$2\times10^{-7}$, and fail-closed atomic publication. No tolerance was relaxed.

## Horizon and convergence results

The expected-value horizon is used only for run planning:
$t_H=5/0.721318143353=6.931754$, or $0.8618$ of the initial $8.04330$ period.
It does not rehabilitate the retired magnitude.

| Direction | Amplitude | Step / minimum | $h$ | Segment | Common measured end | Control / perturbed accepted end | Amplitude ratio | Status |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| `imx` | $10^{-3}$ | $0.01/0.0025$ | 8 | 0.02 | $0.3300$ | $0.3375/0.3825$ | $1.05441$ | horizon-blocked |
| `imx` | $10^{-3}$ | $0.01/0.0025$ | 10 | 0.02 | $0.3300$ | $0.3375/0.3825$ | $1.05441$ | horizon-blocked; $h$-stable |
| `imx` | $10^{-3}$ | $0.01/0.0025$ | 8 | 0.01 | $0.1275$ | $0.7475/0.1275$ | $1.03055$ | horizon-blocked; segment ladder not converged |
| `imx` | $10^{-3}$ | $0.005/0.000625$ | 8 | 0.02 | $0.1200$ | $0.121875/0.511875$ | $1.02902$ | horizon-blocked; step ladder not converged |
| `imx` | $5\times10^{-4}$ | $0.01/0.0025$ | 8 | 0.02 | $0.2775$ | $0.3375/0.2775$ | $1.05201$ | horizon-blocked |
| `mox` | $10^{-3}$ | $0.01/0.0025$ | 8 | 0.02 | $0.0125$ | $0.3375/0.0125$ | $0.99811$ | horizon-blocked; stride fits undefined |
| `mox` | $5\times10^{-4}$ | $0.01/0.0025$ | 8 | 0.02 | $0.3350$ | $0.3375/0.3525$ | $0.99800$ | horizon-blocked |

The baseline $h=8$ and $h=10$ amplitude histories agree to floating-point
precision. The step and segment ladders do not agree on the usable horizon,
and the independent-direction magnitude ladder is not in a common linear
response regime. Those failures prohibit a converged sign.

## Linear-in-$t$ check

For the short `imx` step-refined and segment-refined windows, a straight-line
fit of amplitude excess $A(t)/A(0)-1$ gives $R^2=0.9990$ and $0.9988$,
respectively. They are still linear seed transients and measure nothing. The
longer baseline begins to curve ($R^2=0.961$), but it spans only $0.238$
expected e-foldings out of the required five and is not stable under the
step/segment ladder.

The `mox`, $5\times10^{-4}$ history has no monotone excess over its $0.335$
window, but the $10^{-3}$ sibling fails at $0.0125$. That is not magnitude
convergence and cannot support a bounded/returning disposition. All printed
log slopes are diagnostic only; none is admitted as a growth rate or sign.

## Root-completeness wall and wall-time arithmetic

The baseline control first loses certification on `I+<-I-` and `I-<-I+`;
the perturbation first loses certification on `O+<-M+` and `O-<-M-`. The rows
reach `numeric_precision_limit_exhausted` at 512 MPFR bits. Raising the ceiling
to 1024 bits leaves the wall unchanged. The certified finite-width fallback
also leaves it unchanged because the unresolved rows never receive a complete
root certificate.

A paired $t=0.1$ pilot took $0.37484$ s for 20 accepted control-plus-perturbed
steps, or $0.01874$ s per accepted path-step. At fixed $0.01$ step, the full
$6.931754$ horizon would require about 1,388 paired accepted steps and roughly
26 s at that measured rate. The campaign instead halts after at most $0.335$
common time, leaving $6.596754$ time units. The blocker is therefore root
completeness, not projected wall time.

## Raw histories

- [baseline `imx`, $10^{-3}$](section-97-direct-evolution-imx-a1e-3-step1e-2-h8-seg2e-2.csv)
- [`imx`, $h=10$](section-97-direct-evolution-imx-a1e-3-step1e-2-h10-seg2e-2.csv)
- [`imx`, segment $0.01$](section-97-direct-evolution-imx-a1e-3-step1e-2-h8-seg1e-2.csv)
- [`imx`, step $0.005$](section-97-direct-evolution-imx-a1e-3-step5e-3-h8-seg2e-2.csv)
- [`imx`, $5\times10^{-4}$](section-97-direct-evolution-imx-a5e-4-step1e-2-h8-seg2e-2.csv)
- [`mox`, $10^{-3}$](section-97-direct-evolution-mox-a1e-3-step1e-2-h8-seg2e-2.csv)
- [`mox`, $5\times10^{-4}$](section-97-direct-evolution-mox-a5e-4-step1e-2-h8-seg2e-2.csv)

## First missing accepted objects

1. A central-engine complete-root certificate across the evolving §97
   off-diagonal and antipodal-pair precision walls without relaxing the
   fail-closed tolerances.
2. A provenance-bound native prehistory representation for a uniformly
   axially drifting circular worldline, so the converged sub-$c_f$ §98 `M-O-I`
   point can be constructed without deleting its recorded drift.

These are existing derivation/validation obligations, not new theory claims.
Promotion classification remains `priority-only`; no AAA corpus promotion is
authorized by a horizon-blocked run.

## Validation

- `git diff --check`: passed.
- `node scripts/build-scene-graph.mjs --check --strict`: passed with zero
  errors and zero warnings.
- Native coupled-evolution fixture: passed.
- `PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python"
  tests/test_eom_native_coupled_evolution.py -v`: 11/11 passed.
- Final §97 native snapshot: all ordered root and acceleration rows certified.
- `node scripts/validate-content.mjs --check --strict`: blocked by two ambient
  broken links in `reference/priorities/app-eom/priorities.md` to the missing
  `claims-triage-small-population-long-horizon-plan.md`. Neither the file nor
  the links are in this campaign's write set; no generated artifact was
  rewritten.
