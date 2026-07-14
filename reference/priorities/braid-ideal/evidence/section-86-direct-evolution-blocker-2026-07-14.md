# §86 Native-EOM Direct-Evolution Start Certificate — 2026-07-14

## Scope and disposition

This packet records the first direct native-EOM attempt to evolve the exact
six-architrino `SELF_EQUILIBRATED_V5` §86 object after the direction-neutral
theorem gate passed. It uses the central `src/eom` engine and does not rebuild
or evaluate the quarantined linear pencil.

Disposition: `priority-only`; `exact_v5_start_certified`;
`first_fold_atomic_publication_certified`; `convergence_ladders_started`;
`section_86_verdict_blocked`; `section_90_verdict_blocked`;
`no_score_increase`.

## Reproducible instrument

Source:
[section-86-direct-evolution.cpp](../../../../scripts/eom/section-86-direct-evolution.cpp)

Build from the repository root against the existing native library:

```bash
c++ -std=c++20 -O3 -DNDEBUG \
  -Isrc/eom/include -I/opt/homebrew/include \
  scripts/eom/section-86-direct-evolution.cpp \
  .tmp/eom-native-dev/libeom_native.a \
  /opt/homebrew/lib/libmpfr.dylib \
  /opt/homebrew/lib/libgmp.dylib \
  -pthread -o .tmp/section-86-direct-evolution
```

Exact-rail start certificate:

```bash
.tmp/section-86-direct-evolution \
  --snapshot-only --chart=sharp --omega-scale=1 \
  --history-depth=8 --history-segment-step=0.02
```

Finite-width fallback probe:

```bash
.tmp/section-86-direct-evolution \
  --snapshot-only --chart=sharp_with_finite_width_fallback \
  --omega-scale=1 --history-depth=8 --history-segment-step=0.02 \
  --acceleration-tolerance=0.005 --quadrature-tolerance=0.005
```

The instrument constructs native factory-certified circular-arc cubic-Hermite
prehistories, calls
`certify_native_acceleration_snapshot`, and calls
`evolve_native_coupled_histories` only after a certified start. Its amplitude
observable compares each perturbed layer frame with an independently evolved
unperturbed control, removes the mean three-layer rotation, and reports the RMS
relative rotation. It therefore does not confuse the locked spindle's finite
inter-layer geometry with perturbation amplitude.

## Exact object

- Worldlines: 6, arranged as antipodal pairs in layers I, M, and O.
- Per-layer charges: one $+|e|/6$ and one $-|e|/6$.
- Net charge: $0$.
- Geometry $(R,\alpha,\theta)$:
  - I: $(0.5540023029040714,-0.4738568919164604,-0.28274333882308134)$;
  - M: $(1,0.2834414705238791,2.0943951023931953)$;
  - O: $(0.7521203514419849,1.1257373675363425,5.925392810520749)$.
- Common angular frequency:
  $\omega=1.0415596039524766$.
- Middle-layer speed:
  $R_M\cos(\alpha_M)\omega=c_f=1$.
- Period: $6.032477914212839$.
- Native coupling: $36\kappa_{\rm eq}=10.304229970992187$, with
  $\kappa_{\rm eq}=0.2862286103053385$.
- Circular prehistory: $[-8,0]$, segment width $0.02$.
- Seed shown in the certificate: `imx`, scale $10^{-3}$; the control-relative
  initial amplitude is $8.1649658093\times10^{-4}$.

## Exact field-speed endpoint certificate

The central retained-history layer now owns a uniform-circular history factory
and binds its endpoint witness into the history provenance. Its exact
tangential-speed token is the kinematic datum, and the nominal radius is a
required geometry cross-check. For every nonzero delay $\Delta$ on that
factory-produced circle,

$$
|X(T)-X(T-\Delta)|
=2\rho\left|\sin\left(\frac{\omega\Delta}{2}\right)\right|
<\rho|\omega|\Delta
=v\Delta
\le c_f\Delta.
$$

The entire open self-search interval is therefore root-free when $v\le c_f$;
only the excluded coincident endpoint remains. The certificate is valid only
for the factory history at its bound reception time. It is not available to
an arbitrary cubic path.

Native negative and positive controls pass:

- an ordinary straight $v=c_f$ rail remains
  `caustic_route_required / numeric_source_normal_sign_uncertified`, because
  its coincidence continuum is not the circular chord case;
- a factory-produced curved $v=c_f$ history certifies
  `certified_complete`, `coincident_endpoint_excluded=true`, and zero roots,
  including forced MPFR escalation;
- inconsistent radius/frequency/speed requests are rejected by the factory.

The exact six-worldline sharp snapshot now certifies all 36 ordered pairs and
all 36 acceleration rows:

```text
snapshot status=certified_complete unresolved_roots=0
acceleration_status=certified_complete unresolved_accelerations=0
pair_route=certified_moving_history_traversal
```

This closes the former exact-start blocker. It is an engine certificate, not
evidence for or against flutter.

## First evolved fold and atomic publication

The first unconstrained corrected candidate leaves the certified circular
prehistory under the master equation. The sharp root search then finds a fold
candidate on each middle self pair in the genuine prehistory, not at the
coincident endpoint. For a reception time $0.0024129912$, the difficult cell
lies near emission time $-0.03954$. This is the onset of a curved self-hit as
the middle path departs the field-speed circle. No tangential-work sign or
radial direction was imposed on the motion.

The sharp chart correctly fails closed on that fold. The first finite-width
implementation also failed closed because it assigned every time cell a
uniform error-density budget. The narrow fold retained an irreducible local
interval width, so subdivision exhausted 300,001 visited cells even though
the global acceleration enclosure could satisfy the declared tolerance.

The native finite-width integrator now retains certified interval integrals
for every active time cell, sums them in chronological fixed-pairwise order,
and refines the cell with the largest component width. It accepts only when
the width of the total acceleration enclosure is within the unchanged global
quadrature tolerance. Size-proportional reduction checks avoid the quadratic
resummation cost of checking after every fixed number of splits. The
deliberately starved resource fixture still fails closed.

Atomic recertification now measures the distance from the corrected endpoint
acceleration midpoint to the recertified inflated-history interval. A
contained midpoint has zero error; a gap larger than the unchanged correction
tolerance rejects. This replaces a midpoint-to-midpoint comparison that was
measuring the centering of a $5\times10^{-3}$-wide certified quadrature
interval against a $2\times10^{-7}$ correction tolerance.

The first exact-V5 fold-crossing step then publishes under the normal policy:

```text
step=0 status=accepted accepted_time=1.8851493481915121e-05 atomic=1
accepted_snapshot=certified_complete uncertified_root_rows=0
caustic_routes=2 finite_width_pairs=2 maximum_quadrature_cells=193338
maximum_position_error=1.35515e-11
maximum_velocity_error=1.43755e-06
```

The control and perturbed runs each accepted one step with zero rejections.
Both middle self-fold rows are handled by certified finite-width pair
accelerations; no root row remains uncertified. The unchanged normal policy is
acceleration tolerance $5\times10^{-3}$, quadrature tolerance
$5\times10^{-3}$, position tolerance $2\times10^{-6}$, velocity tolerance
$2\times10^{-6}$, correction tolerance $2\times10^{-7}$, maximum quadrature
depth 32, and maximum quadrature cells 300,000.

## Initial convergence and perturbation rungs

The first five rows below evolve an independent unperturbed control to the same
final time, $1.8851493481915121\times10^{-5}$, or
$3.125\times10^{-6}$ braid cycles. The final row extends the refined `imx`
case to $3.7702986963830242\times10^{-5}$, or
$6.25\times10^{-6}$ cycles. All control and perturbed steps published
atomically with zero rejected steps and zero uncertified root rows.

| Seed | Step | $h$ | Prehistory segment | Accepted steps | Amplitude ratio | Maximum finite-width cells |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `imx` | $1.8851493482\times10^{-5}$ | 8 | 0.02 | 1 | 1.0000113416719871 | 193,338 |
| `imx` | $9.4257467410\times10^{-6}$ | 8 | 0.02 | 2 | 1.0000113385130536 | 182,090 |
| `imx` | $9.4257467410\times10^{-6}$ | 10 | 0.02 | 2 | 1.0000113385130522 | 182,090 |
| `imx` | $9.4257467410\times10^{-6}$ | 8 | 0.01 | 2 | 1.0000113276017875 | 183,100 |
| `mox` | $9.4257467410\times10^{-6}$ | 8 | 0.02 | 2 | 1.0000048071394834 | 182,090 |
| `imx` extended | $9.4257467410\times10^{-6}$ | 8 | 0.02 | 4 | 1.0000226690179788 | 182,768 |

The common-endpoint step refinement changes the `imx` amplitude ratio by
$3.16\times10^{-9}$. Increasing $h$ from 8 to 10 changes it by
$1.4\times10^{-15}$, and halving the prehistory segment width changes it by
$1.09\times10^{-8}$. The four-step extension produces a first stride-1
diagnostic log slope of $0.6011279128$; stride 2, 5, and 10 fits remain
undefined because too few samples exist. These rungs establish the first
fold-crossing publication and begin the required ladders. Their horizon is far
too short for a converged log-slope fit, saturation test, or flutter verdict.

A frequency continuation isolates the obstruction:

| $\omega/\omega_{V5}$ | Start snapshot | Exact evolution |
| ---: | --- | --- |
| $1$ | uncertified, two middle self-endpoint rows | not started |
| $0.999$ | uncertified, same two rows | not started |
| $0.9975$ | certified | first corrected step cannot remain root-complete |
| $0.99$ | certified | advances briefly, then loses root completeness |
| $0.95$ | certified | paired control/perturbed pilot completed $0.01$ cycle |

The $0.95$ pilot is an instrument check, not a §86 result. It completed 26
accepted steps and zero rejected steps through $0.0634998$, and its sampling
strides agreed on the very-short-window control-relative log slope at about
$0.626$. The altered frequency, short horizon, and absence of the required
step, memory, sampling, and seed ladders prohibit using that number as a
flutter rate.

## Adjudication

The theorem prerequisite is passed. The §86 direct-evolution campaign is
properly corner-anchored, its control-relative observable is implemented, and
the exact candidate passes both the start certificate and the first
fold-crossing atomic-publication gate. Step, memory-depth, prehistory-sampling,
and independent-direction rungs now advance beyond time zero without relaxed
tolerances.

Section §86 nevertheless remains **T2 QUARANTINED**, while the downstream §90
saturation claim remains **T3 QUARANTINED**. The longest evolved window is
only $6.25\times10^{-6}$ cycles, and only its finest sampling stride has enough
points for a fit, so it cannot distinguish growth, return, or a bounded limit
cycle. The pencil value $+0.199$ remains non-authoritative and is not replaced.

The dispatched multi-cycle ladder is not computationally reachable on this
route. At the accepted exact-V5 step, one braid cycle requires
$6.4\times10^{5}$ accepted steps, each resolving the two middle finite-width
self-fold pairs with about $1.9\times10^{5}$ interval cells. Even one cycle is
therefore a months-scale run at the measured per-step cost, before the
step/$h$/sampling/direction/magnitude ladder multiplies it. The cheaper
$0.95$ continuation is not a substitute: it removes the pinned self-fold and
crosses a self-hit root-topology change on the way back to exact V5.

The first missing accepted object is a cheap certified treatment of the
pinned self-fold, preferably a local analytic model of fold onset from the
closed-form circular hinge $\delta_s=2s\sin(\delta_s/2)$. The alternative is a
certificate proving that the step collapse is controller conservatism rather
than a genuine resolution requirement. Until one of those objects lands, no
more multi-cycle exact-V5 ladder runs are warranted. The controller's opt-in
step-growth recovery and accepted-snapshot reuse remain independently tested
engine improvements, but they do not change this feasibility adjudication.
