# Evolved-History Root Path: Independent Diagnosis

Date: 2026-07-14

## Scope and claim boundary

This packet records an engine diagnosis reached from native measurements before
consulting the claims-triage adjudication. The defect is in the general
evolved-history root and acceleration path. The Section 97 object is only the
reproducer and acceptance fixture.

Section 97 and Section 98 flutter are retired as void because their objects do
not satisfy the force-balance precondition. This packet reports no flutter
verdict, sign, slope, or growth rate.

## Independent measurements

1. The original evolved-history wall occurred first on an off-diagonal root at
   reception time `0.34`. Its emission root was approximately
   `-0.694543087879809`, inside the retained segment `[-0.70,-0.68]`. The
   residual enclosure straddled zero by about `3e-9`, while the source-normal
   enclosure was strictly positive near `1.129384`. This was a simple root, not
   a caustic.
2. The MPFR fallback searched adjacent representable MPFR values. At 512 bits,
   even roughly one million representable-value advances move by only about
   `1e-150`; they cannot escape a retained-history reconstruction enclosure of
   order `1e-9`. Increasing arithmetic precision therefore could not resolve
   this epistemic enclosure.
3. The declared root tolerance was `1e-5`. A strict-sign intermediate-value
   bracket inside that tolerance was available and is a complete root
   certificate. Adding that general bracket route moved the Section 97 fixture
   past both original walls (`0.3375` and `0.3825`) without changing the root
   tolerance or source-normal floor.
4. The repaired root path crossed the field-speed rail and certified snapshots
   with speed above `c_f`. The next wall was at accepted time
   `1.7542187499999955`, not at the original root failure.
5. At that wall, the `I+<-I+` self row changed from zero delayed roots to one
   positive-orientation delayed root near emission time `1.48012`. Both
   snapshots certified the complete root-free complement, a clear memory
   boundary, and exclusion of the coincident same-source endpoint. An interior
   fold creates or removes an opposite-sign pair. With memory entry excluded,
   this one-root change is continuation through the excluded coincident
   endpoint, not an interior fold/caustic. The native controller had been
   routing it to the fold regulator.
6. After endpoint-continuation classification, the unchanged local velocity
   test exposed a sharp-chart discontinuity of about `6.66e-5`, above the
   `2e-6` publication tolerance. Reducing the step floor did not remove that
   discrepancy. The hybrid chart had been waiting for an individual sharp
   acceleration certificate to fail rather than selecting the finite-width
   causal-surface chart for the newly active super-field self branch.
7. The finite-width row then exposed a retained-history accuracy limit. With
   the evolved segments published at `2e-6` state tolerances, its acceleration
   enclosure narrowed from about `0.018423` at 5,001 cells to `0.008683` at
   50,001 cells and `0.007875` at 200,001 cells, above the unchanged `0.005`
   quadrature tolerance. MPFR did not change this limit. The remaining width is
   retained-history uncertainty, not floating-point roundoff or insufficient
   cell count.
8. A later replay isolated a second general simple-root mechanism at accepted
   time `1.7142620849608892`. The off-diagonal root lay on the continuous join
   at emission time `0.61`; treating the two adjacent retained segments
   independently left both endpoint evaluations uncertain. A two-segment
   strict-sign enclosure certified the one continuous root. Making that route
   demand-driven reduced the measured two-step replay from about `80.8` to
   `4.05` seconds.
9. The first full evolved-history oracle comparison found a genuine native
   divergence at reception time `1.6274999999999908` on `I+<-I+`. Native
   reported a complete zero-root set, while the 90-digit oracle retained 89
   source-normal cells near the endpoint. Native had applied a local
   sub-field or super-field endpoint shortcut to older self-history cells.
   That is not a valid whole-path proof on a curved or mixed-speed history.
10. The replacement is an arc-length certificate: a self cell is root-free
    only when the speed bound is strictly below `c_f` over every intervening
    retained segment from that emission cell through reception. A regression
    with a slow older segment followed by a fast segment preserves its root
    under forced MPFR escalation. The repaired 90-digit replay changes the old
    divergent row to `certified_complete`, zero roots, and zero unresolved
    cells.
11. After the globally sub-field interval ended, the inner self rows developed
    a near-multiple super-field root cluster. The sharp method did not publish
    a root count that its retained-history enclosure could not support. The
    row now records `numeric_self_root_cluster_uncertified` and takes the bound
    finite-width causal-surface route. A checkpoint replay advanced from
    `1.6291314697265535` to `1.63` in 19 accepted steps with zero rejections;
    native/oracle parity covered all 720 ordered-pair rows in those 20 emitted
    snapshots without divergence.

## General repairs implemented

- The exact-pair root certifier now retains the adjacent-representable MPFR
  route and adds a tolerance-bounded strict-sign IVT bracket. Large uncertainty
  still fails closed.
- The 90-digit oracle implements the same mathematical acceptance rule
  independently and accepts overlapping retained-history endpoint enclosures
  under the native continuity contract.
- The direct-evolution runner emits the exact accepted evolved histories and
  root certificates for step-for-step native/oracle comparison and reports the
  first divergence.
- Sharp acceleration rows may refine only the difficult root bracket before
  taking a finite-width fallback; the global root tolerance remains unchanged.
- The native event integrator now has global best-first reduction,
  Gaussian-tail block exclusion, centered emission integration, and a monotone
  causal-residual/CDF route. These changes retain the unchanged finite-width
  master-equation integrand and fail closed at the declared total tolerance.
- A native endpoint-root-continuation certificate distinguishes a one-root
  self branch entering through the excluded coincident endpoint from an
  interior fold. A polynomial `x(t)=t^2` regression certifies the zero-to-one
  root transition. A second regression covers the cubic tangency
  $g(D)=2\rho\sin(\omega D/2)-c_fD$: the exact rail has a triple coincident
  endpoint, departures at `1e-6` and `1e-4` produce roots near
  `0.0047035` and `0.0470287`, and the zero-to-one change is classified as
  `coincident_endpoint_root_continuation`, not an interior fold.
- Same-history endpoint exclusion now uses the exact self identity plus a
  strict source-normal sign when retained-error enclosures make the endpoint
  residual contain, rather than equal, zero. Near-multiple self-root clusters
  that still lack a complete sharp root set remain explicit and use the
  finite-width route; no sharp root is silently omitted.
- Whole-interval sub-field exclusion and the self-root-cluster route are
  implemented independently in native C++ and the 90-digit oracle.
- Finite-width acceleration now also has monotone residual/CDF integration and
  segment-correlated reduction. Child subdivisions may sharpen a retained
  segment, but they may not count its parent error as independent uncertainty.
- The Section 97 fixture can checkpoint and resume exact accepted histories;
  diagnostic resource refinements are validated against the checkpoint model
  fingerprint.

## Acceptance status

The measured root-path mechanisms above are repaired and independently
regressed. The full engine acceptance is not yet closed. The chained baseline
has reached `t=1.63`; its continuation to `t=6.93` is running with unchanged
root, acceleration, quadrature, position, and velocity tolerances. Required
remaining evidence:

1. Section 97 reaches at least `t=6.93` in the baseline, step-refined, and
   prehistory-segment-refined runs without a moving numeric wall.
2. Extend the exact evolved-history native/oracle agreement from the current
   accepted checkpoint chain through the required horizon, reporting the first
   divergent step and pair if one appears.
3. Repeat the Section 86 timing without a competing long run. The instrument
   now reports whole-step stage timing and classification with every accepted step.
   `maximum_quadrature_cells` is the maximum across all acceleration snapshots
   evaluated inside that accepted atomic step, not merely the final accepted
   snapshot. The earlier final-snapshot-only row was `32.4315` wall seconds,
   `maximum_quadrature_cells=1928`, and
   `middle_self_root_classification=coincident_endpoint_root_continuation`;
   it is preliminary and superseded by the clean all-stage attribution below.

### Measured adjudicator follow-up folded into acceptance

The adjudicator independently measured the exact V5 middle self pair as a
cubic endpoint tangency,

$$
g(D)=2\rho\sin(\omega D/2)-c_fD
=-\frac{\rho\omega^3}{24}D^3+O(D^5),
$$

with `rho=0.96009867914`, `omega=1.0415596039524766`, and `c_f=1`.
The native `coincident_endpoint_root_continuation` result agrees with that
topology, but it does not establish a cost reduction. Independently inflating
the two endpoints by publication tolerance $\epsilon$ creates the approximate
sign-certification floor

$$
D_{\mathrm{noise}}
\simeq \frac{1}{\omega}
\left(\frac{24\epsilon}{\rho}\right)^{1/3}.
$$

For $\epsilon=2\times10^{-6}$, this gives about `0.0354`, close to the
observed difficult delay near `0.0419`. The §86 acceptance work therefore
measured four routes: independent endpoint errors, correlated
self-chord only, stable circular residual only, and both corrections. Each row
must report whole-step maximum quadrature cells, wall seconds, and the
middle-self classification. The unchanged finite-width route and cell count
under correct classification are accepted as a clean negative result.

The active §97 horizon continuation uses position and velocity publication
tolerances of `2e-7`, ten times tighter than the earlier `2e-6` envelope.
Consequently, its wall location is evidence for the `2e-7` row only. A matched
`2e-6` run under the same repaired root path is required to distinguish a
general repair from cube-root noise-floor mitigation. This comparison does not
change the required §97 horizon, step-refinement, prehistory-segment-refinement,
or evolved-history parity plan.

No engine, migration, or theory claim is promoted until the required §97 rows
close.

### Section 86 atomic-step ablation result

The four routes were measured on the same one-step V5 fixture with step
`0.0005`, unchanged publication tolerances `2e-6`, unchanged acceleration and
quadrature tolerances `0.005`, the finite-width fallback chart, and the full
atomic acceptance matrix. The §97 horizon process was active concurrently, so
the seconds below are diagnostic-load observations, not clean machine
benchmarks. The maximum cell count remains a deterministic-work result.

| Route | Maximum quadrature cells | Correlated self-chord cells | Stable circular-residual cells | Step seconds | Middle self-root classification |
| --- | ---: | ---: | ---: | ---: | --- |
| independent endpoints, ordinary residual | 1,928 | 0 | 0 | 623.540 | `coincident_endpoint_root_continuation` |
| correlated self chord only | 1,928 | 1,582 | 0 | 603.705 | `coincident_endpoint_root_continuation` |
| stable exact-circle residual only | 1,928 | 0 | 0 | 543.591 | `coincident_endpoint_root_continuation` |
| correlated chord and stable exact-circle residual | 1,928 | 1,582 | 0 | 601.144 | `coincident_endpoint_root_continuation` |

The negative result is unambiguous. Endpoint-continuation classification does
not select a cheaper acceleration path. Cross-segment self correlation is
active and removes the independently manufactured endpoint error, but it does
not reduce the maximum subdivision count. The cancellation-stable exact-circle
formula is not active at the cost-driving evolved-history stage; enabling it
cannot reduce that stage's cells. These two levers are refuted and are not
active targets. The unchanged 1,928-cell result is retained as a determinism
check, not as a cost proxy.

### Section 86 clean serialized step attribution

The competing §97 process was suspended with `SIGSTOP`, the §86 step was run
with one native worker, and §97 was resumed with `SIGCONT` after the profiler
and runner completed. This makes the result serialized against the competing
project computation. The accepted fixed step was `0.0005`.

| Measured component | Seconds | Fraction of total wall | Accounting |
| --- | ---: | ---: | --- |
| Finite-width execution union | 4.500060 | 0.7117% | Primary stage |
| Exact-pair root batch | 627.804960 | 99.2861% | Primary stage |
| Retained-history reconstruction, traversal, copy, and hash | 0.008046 | 0.00127% | Primary stage |
| Corrector control excluding its snapshots and history copy/hash | 0.000175 | 0.0000277% | Primary stage |
| Additional MPFR precision attempts | 445.736570 | 70.4924% | Nested inside exact-pair roots |
| Allocation/free profiler samples | 14,132 / 52,510 | 26.9130% | Exclusive active-worker samples, nested inside MPFR roots |

Total wall time was `632.318909` seconds. Binary64 root work used `1.650611`
CPU seconds and MPFR root work used `626.152585` CPU seconds. Acceleration-stage
precision escalation had zero attempts. The corrector used nine iterations
across three accepted substeps (`4,3,2`); there were zero rejected corrector
substeps, zero rejected atomic steps, and no retry. Fourteen acceleration
snapshots were certified. Corrector-inclusive time was `581.400232` seconds,
but `581.395545` seconds of it was nested snapshot certification, so it must
not be added to the root and finite-width rows.

The middle self pair remained
`coincident_endpoint_root_continuation`, and the maximum was 1,928 quadrature
cells. The cells do not track the measured cost. The exact evidence record is
[section-86-step-cost-attribution-2026-07-14.json](section-86-step-cost-attribution-2026-07-14.json).

## Comparison with the adjudicator after independent capture

After the diagnosis above was captured, it was compared with the adjudicator's
root-wall packet and claims-triage ledger.

- Both routes classify the original wall as an engine defect on a transversal
  root, not a physical caustic. The adjudicator measured a minimum source
  normal of `0.6824` across the certified ordered pairs and a lower bound above
  `0.42` at the wall. The independently isolated failing bracket had a strictly
  positive source-normal enclosure near `1.129384`.
- Both routes find that the wall follows discretization rather than physical
  time. The adjudicator measured wall motion of `2.75x` under step refinement
  and `2.59x` under prehistory-segment refinement while remaining invariant in
  history depth. The independent implementation trace explains the immediate
  mechanism: adjacent-value MPFR search cannot overcome the retained-history
  enclosure, even though a tolerance-valid strict-sign bracket exists.
- The adjudicator's packet named even-crossing/co-cell root completeness as the
  first suspect. The measured implementation failure was more specific: the
  MPFR fallback treated additional arithmetic bits as if they reduced path
  reconstruction uncertainty. The repair therefore preserves complete-cell
  exclusion and adds a tolerance-bounded IVT root enclosure; it does not add a
  Section 97 exception.
- The later coincident-endpoint, chart-selection, and retained-history accuracy
  failures occur only after the original wall is removed. They are additional
  engine findings and do not alter the adjudicator's retirement of Section
  97/98 flutter as void.

## Section 86 token-dominance escalation repair

The escalation trigger now separates arithmetic-limited enclosures from
retained-error-token-dominated enclosures. Token-dominated simple roots take a
binary64 tolerance-bounded strict-sign IVT bracket; a source-normal enclosure
whose zero overlap and width are explained by the retained position and
velocity radii fails closed to the finite-width route without entering MPFR.
Every accepted bracket still requires a sign-definite source-normal hull.

On the same serialized fixed `0.0005` step, wall time fell from `632.318909`
seconds to `7.153516` seconds. MPFR fell from `626.152585` CPU seconds and 80
attempts to zero seconds, zero pair certifications, and zero attempts. The
accepted result retained 14 acceleration snapshots, corrector iterations
`4,3,2`, 1,928 maximum quadrature cells, and
`coincident_endpoint_root_continuation`. The 72-row evolved-history
native/oracle replay and all four root, history, acceleration, and coupled
evolution suites passed. Exact evidence:
[section-86-token-dominance-root-gate-2026-07-14.json](section-86-token-dominance-root-gate-2026-07-14.json).
