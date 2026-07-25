# Parallel-Stream EOM Simulation Specification

## Verdict and scope

This specification defines one bounded-population EOM simulation family with
two jobs:

1. independently test the derived canonical prediction
   $C_{B,\mathrm{can}}=0$ on neutral drifting streams; and
2. preserve the same initial-data and measurement geometry for later
   discrimination of source-vector-cargo repairs and the SR/SV/GR/GV sampling
   family.

The primary result is a dimensionless interval for $C_B$, not a visual
trajectory. The canonical pass interval is predeclared as

$$
\boxed{\mathcal I_{C_B}\subseteq[-0.05,0.05],
\qquad
\operatorname{width}(\mathcal I_{C_B})\le 0.10.}
$$

This width resolves the canonical value $0$ from the normalized repair target
$1$ with at least $0.95$ coefficient units of separation. A wider interval is
inconclusive; it is not a verified null.

**Claim grade: derived** for the separation between the values $0$ and $1$.
**Claim grade: guessed, as a predeclared design tolerance** for the $0.05$
half-width. Its falsifier is a pre-run sensitivity and cost profile showing
that another width gives a materially stronger decision at lower measured
cost without inspecting the scientific output.

No build or simulation is part of this specification. No EOM solver semantic,
request, certificate, or schema change is proposed.

**Claim grade: measured by the scope of this file.**

## Evidence roles

P1 derived the exact infinite-line canonical null from the common-slice label
transport $d\xi/dy=D_s/c_f$. The proposed EOM calculation does not encode that
change of variable or use the analytic result as its returned value. It sums
the implemented ordered-pair rows, evolves every path from accepted retained
history, and extracts transverse velocity transfer from accepted endpoints.
Agreement is therefore analytic-versus-numerical evidence, rather than replay
of an analytic fixture.

**Claim grade: inferred evidence-design claim.** Its falsifier is a future
implementation that inserts the P1 cancellation, $C_B=0$, or a P1-derived
golden output into the EOM calculation or its pass decision.

The P2 code-inspection anchor is separate: direct inspection found that the
EOM solver evaluates the SR row

$$
\mathbf A_{i\leftarrow j}
=
\kappa q_iq_j
\left|\frac{D_T}{D_s}\right|
\frac{\mathbf r}{r^3}.
$$

That inspection establishes what the executable is intended to compute. It is
not independent evidence that the law is physically correct.

**Claim grade: measured by direct code inspection** in
`src/eom/src/CertifiedAcceleration.cpp`, where the source normal, receiver
normal, absolute branch ratio, inverse-square radial vector, charge product,
and coupling are assembled into each sharp acceleration row. The falsifier is
a content-bound inspection at execution time that finds a different formula
or an execution record bound to a different model.

## Existing contract boundary

The evolved stream cases consume the following existing authorities and
interfaces only:

- `eom_evolution_contract/v0`, including continuous retained-history initial
  data, immutable accepted-state stepping, complete ordered-pair coverage,
  atomic publication, and root/history behavior requiring verification before advancement;
- `master_eom_binding/v0`, which pins the canonical equation, $\kappa$, $c_f$,
  charge and polarity convention, sharp/finite-width chart policy, regulators,
  finite-history rule, and branch aggregation;
- the numeric policy and explicit error ledger in
  `precision-dynamic-range-and-certification-contract.md`;
- the existing `NativeCoupledEvolutionRequest` fields for paths, start/end
  times, step controls, $c_f$, coupling, tolerances, precision bounds,
  deterministic reduction, resource limits, and worker count; and
- the existing `eom_native_coupled_evolution_certificate/v0`,
  `eom_native_atomic_coupled_step_certificate/v0`,
  `eom_native_acceleration_snapshot_certificate/v1`,
  `eom_native_pair_acceleration_certificate/v0`, and optional
  `eom_native_evolution_checkpoint/v4` records.

The cheap P2 controls consume the existing certified acceleration-snapshot
path on prescribed retained histories. They are conditional equation-response
tests, not canonical evolved-motion evidence.

**Claim grade: measured by direct contract and header inspection.** The
falsifier is a pre-run interface audit showing that any listed field or record
is unavailable, or that a requested observable requires an engine field not
already present.

The analysis layer may read accepted histories, endpoint velocity enclosures,
per-path local errors, per-root acceleration rows, receiver totals, timing
records, and fingerprints. It may combine those values with outward-rounded
interval arithmetic. It must not feed a corrected path, prescribed future
segment, endpoint constraint, or analysis result back into evolution.

**Claim grade: derived contract consequence.**

The primary stream and control rows use the sharp chart because P1 adjudicates
the sharp canonical branch. If any required row reaches a caustic, a zero
source normal, a close-approach condition requiring the finite-width chart, or
another sharp-chart failure, this instrument is inapplicable to that
configuration. Substituting the finite-width chart would test a different
regulated observable and is not an allowed rescue inside this packet.

**Claim grade: derived scope match.** Its falsifier is a demonstration that
P1's $C_B=0$ theorem includes the proposed finite-width replacement with the
same normalization and no additional remainder.

There is no variant selector in this specification. A later kernel swap must
arrive through a separately accepted model binding and implementation change.
The same input manifest and analysis equations can then be replayed, but this
file does not authorize that change.

**Claim grade: measured for the present specification; inferred for reuse.**

## Stream geometry and initial histories

### Coordinates and finite population

Use two straight stream axes parallel to $\hat{\mathbf x}$:

$$
\mathbf X_A=(x,0,0),
\qquad
\mathbf X_B=(x,\rho,0),
\qquad
\rho>0.
$$

Each stream has a measured core $|x|\le \ell$ and an endpoint collar
$\ell<|x|\le \ell+g$. The complete represented length is
$L=2(\ell+g)$. Only the fixed path identities whose common-slice positions lie
inside the core at $T_0$ enter the reported transfer. Collar paths evolve and
contribute causally but are not counted as receivers in the primary average.

**Claim grade: guessed design choice.** Its falsifier is a pre-run root-coverage
or end-bound calculation showing that no finite $g$ can meet the declared
budget for the selected $\rho$, density, and observation window.

Use a separation and resolution ladder rather than one committed scale:

$$
a\ll\rho\ll\ell<\ell+g,
\qquad
n_+=n_-=n=\frac{1}{a}.
$$

The actual values of $a/\rho$, $\ell/\rho$, and $g/\rho$ are selected before
the scientific run from certification and profiling, then frozen. At least two
lattice spacings and two endpoint-collar lengths are required for the error
ledger. A second separation, with all dimensionless ratios preserved, checks
the expected $1/\rho$ normalization without refitting $\kappa$.

**Claim grade: derived** that the ladders expose lattice, endpoint, and
separation dependence. **Claim grade: guessed** that two accepted levels will
be sufficient; failure of the certified remainder bounds requires additional
levels rather than extrapolation by eye.

### Polarity cells and currents

Each stream contains equal linear number densities of $+q$ and $-q$
architrinos, so its common-slice signed line density vanishes:

$$
\Lambda_R=n(+q)+n(-q)=0,
\qquad R\in\{A,B\}.
$$

Within each cell of length $a$, place the two polarities at complementary
quarter-cell offsets. Run the phase-mirrored realization with the polarity
offsets exchanged and interval-average the two results. No opposite-polarity
paths are co-located. This suppresses a chosen lattice phase without treating
the pair as a bound assembly.

**Claim grade: derived** for exact cell neutrality and avoidance of
co-location. **Claim grade: inferred** that the phase mirror reduces leading
lattice bias; the certified lattice remainder, not that inference, controls
acceptance.

Give the two polarities equal and opposite longitudinal drift about zero bulk
number flow:

$$
u_{R,+}=s_R\frac{u_R}{2},
\qquad
u_{R,-}=-s_R\frac{u_R}{2},
\qquad
\mathcal J_R=s_Rnqu_R,
\qquad s_R\in\{-1,+1\}.
$$

Use $\beta_R=|u_R|/(2c_f)\le10^{-2}$ and a second speed level no larger than
half the first. Every retained root must certify $D_s>0$ and $D_T>0$ with
margin. The speed ladder checks that a later nonzero variant response has the
declared current parity; the canonical infinite-line null itself is exact on
the positive-normal constant-drift chart and does not require a low-speed
extrapolation.

**Claim grade: derived** for neutrality, current, and current reversal.
**Claim grade: guessed, as a deep-sub-field-speed operating choice** for
$10^{-2}$ and the half-speed check. The falsifier is a pre-run conditioning
profile showing inadequate signal-to-noise ratio or loss of the positive-normal
margin.

### Four current-parity runs

For every accepted geometry, phase, speed, and refinement level, evolve all
four sign combinations

$$
(s_A,s_B)=(+,+),(+,-),(-,+),(-,-).
$$

All non-sign inputs, path labels, tolerances, reduction order, observation
times, and resource limits remain identical. Reversing a current swaps only
the two polarity drift directions in that stream.

**Claim grade: derived test design.** The four-run signed combination below
cancels contributions that are even in either current. Its falsifier is a
manifest comparison that finds another changed input.

### Straight endpoint-matched prehistory

For every path $i$ with endpoint position $\mathbf X_i(T_0)$ and assigned
drift $\mathbf u_i$, supply

$$
\mathbf X_i(S)=\mathbf X_i(T_0)+\mathbf u_i(S-T_0),
\qquad
\dot{\mathbf X}_i(S)=\mathbf u_i,
\qquad
S\in[T_0-H,T_0].
$$

The final retained-history position and velocity must match the initial EOM
endpoint exactly. The history depth must cover every possible emission root
used through $T_2$, including the farthest represented endpoint, plus the
contract's required boundary clearance. No authored continuation exists for
$T>T_0$; every later segment is accepted EOM evolution.

**Claim grade: derived contract-compliant initial-data construction.** Its
falsifiers are any endpoint discontinuity, any root touching the memory
boundary, any `insufficient_history_depth` result, or any prescribed future
segment.

### Observation window

Use a fixed accepted window $[T_1,T_2]$ after $T_0$, together with a nested
shorter window sharing $T_1$. Choose the window before inspecting transverse
transfer. It must be long enough for the requested time average and short
enough that certified deviations from straight, uniform stream geometry fit
inside the allocated evolution-geometry budget.

**Claim grade: guessed design choice.** The falsifier is a certified position
or velocity deviation whose propagated effect exceeds that budget. In that
case the run is inconclusive; the paths are not constrained back onto the
lines.

## Finite-length and continuum control

Finite endpoints are the principal contamination of the P1 infinite-line
null. They are handled by a bound, not by assuming that symmetric placement
removes them.

For each receiver core path, split source contributions into the represented
core and endpoint collars using existing per-pair identities. Bound the
unrepresented continuation beyond each endpoint with the positive-normal
sharp-row magnitude envelope

$$
\left\|\mathbf A_{i\leftarrow j}\right\|
\le
\kappa |q_iq_j|
\frac{c_f+V_{\max}}{c_f-U_{\max}}
\frac{1}{r^2},
$$

and use the sharper transverse tail integral when its interval assumptions are
certified:

$$
\int_{|y|\ge Y}
\frac{\rho\,dy}{(y^2+\rho^2)^{3/2}}
=
\frac{2}{\rho}
\left(1-\frac{Y}{\sqrt{Y^2+\rho^2}}\right).
$$

Here $U_{\max}<c_f$ and $V_{\max}<c_f$ are certified source and receiver speed
upper bounds over the observation window. The absolute polarity-density sum
is used in the tail bound; neutrality is not used to shrink it. The longer
collar must agree with the shorter-collar result inside this bound.

**Claim grade: derived** for both envelopes on a certified positive-normal
sharp chart. The falsifiers are a source or receiver normal that crosses zero,
a finite-width row not covered by a separately valid envelope, or failure of
the nested-length intervals to overlap after the tail allowance.

The lattice-to-continuum allowance is obtained from the two phase realizations,
the spacing ladder, and an outward-rounded midpoint-remainder bound over each
cell. The remainder uses certified separation, normal, position, and velocity
hulls over the observation window. A difference between two spacings is a
diagnostic, not by itself a certificate; acceptance requires the explicit
remainder interval to cover both levels.

**Claim grade: derived certification rule.** Its falsifier is inability to
bound the cell derivative or failure of the refined intervals to overlap.

## Primary instrument

### Transverse transfer rate

Let $\mathcal R_B$ be the fixed set of stream-$B$ receiver identities selected
from the core at $T_0$. For one sign run define the time-averaged transverse
momentum-transfer rate per unit measured length by

$$
\mathcal Q_B(s_A,s_B)
=
\frac{\mu_{\mathrm{arch}}}{2\ell(T_2-T_1)}
\sum_{i\in\mathcal R_B}
\left[V_{i,y}(T_2)-V_{i,y}(T_1)\right].
$$

$\mu_{\mathrm{arch}}$ is the optional universal conversion from substrate
acceleration to higher-level momentum bookkeeping. It does not enter the EOM
solver. The mass-independent primary data are the same velocity increments;
$\mu_{\mathrm{arch}}$ cancels from the normalized coefficient below.

**Claim grade: derived** from integrating acceleration over the accepted
window. The falsifier is disagreement, outside interval budgets, with the
time integral of the accepted receiver-total transverse acceleration rows.

Extract the part odd in both currents:

$$
\mathcal Q_B^{(11)}
=
\frac14
\left[
\mathcal Q_B(+,+)-\mathcal Q_B(+,-)
-\mathcal Q_B(-,+)+\mathcal Q_B(-,-)
\right].
$$

With stream $A$ at $y=0$, stream $B$ at $y=\rho$, and positive currents along
$+\hat{\mathbf x}$, define

$$
\widehat C_B
=
-\frac{\rho c_f^2}
{2\kappa\mu_{\mathrm{arch}}|\mathcal J_A\mathcal J_B|}
\mathcal Q_B^{(11)}.
$$

Repeat with $A$ as receiver and require the two directed coefficients to
overlap after applying the coordinate sign convention. Do not average them
until they pass separately; otherwise a delayed nonreciprocal residual could
hide in the average.

**Claim grade: derived** from P1's normalization and the four-run parity
projection. The falsifier is a direct substitution of the stream currents
into P1's receiver-linear line expression that gives a different sign or
normalization.

### Certified error interval

Construct $\mathcal I_{C_B}$ by outward-rounded propagation of these separate
rows. The final column is the maximum contribution to the dimensionless
$C_B$ half-width; the entries sum to $0.05$.

| Error row | Source | Acceptance condition | Maximum half-width | Grade |
| --- | --- | --- | ---: | --- |
| Native numerical interval | Accepted endpoint velocity hulls, per-path local errors, correction residuals, complete root records, acceleration rows, receiver totals, reconstruction status, fixed interval reduction, and precision escalation | Every contributing step is accepted; complete ordered-pair domain; all reconstructions and enclosures certified | $0.015$ | measured |
| Finite-length interval | Two collar lengths plus the absolute omitted-tail bound | Refined intervals overlap after the declared bound | $0.015$ | derived test |
| Lattice interval | Two phases, two spacings, and the cell remainder bound | Refined intervals overlap and the remainder covers both | $0.010$ | derived test |
| Evolution-geometry interval | Certified deviations from the straight constant-drift chart, propagated through the row envelope | Nested time windows overlap after allowance | $0.005$ | derived test |
| Current and normalization interval | Decimal-token enclosures for $\rho,c_f,\kappa,q,n,u_A,u_B$ | Denominator excludes zero and remains inside the allocation | $0.003$ | measured |
| Worker/restart replay interval | One-worker versus selected-worker replay; uninterrupted versus checkpoint/restart replay when restart is used | Discrete root/branch decisions match and result intervals overlap | $0.002$ | measured |

The final interval is the Minkowski sum of the propagated numerical interval
and the signed contamination intervals, followed by the normalization above.
No row may be deleted because its measured midpoint is convenient. Unresolved
root sets, interval overflow, exhausted precision, incomplete history, rejected
steps, or non-atomic publication make the result inconclusive.

No row may borrow another row's unused allocation after scientific output is
visible. A different allocation requires a new predeclared instrument version
before rerunning the scientific matrix.

**Claim grade: derived error-budget arithmetic and guessed allocation.** The
allocation's falsifier is a pre-run certification profile showing that it is
unachievable or poorly balanced; that result may motivate a new frozen version
but does not relax this one post hoc.

## Cheap control cases

The controls use manufactured continuous straight histories and one or a few
certified snapshots. They reuse the same $c_f$, $\kappa$, charge convention,
chart, root tolerances, precision policy, and fixed reduction rule as the
stream runs. Their evidence status is `conditional` because their future
motion is not being tested.

**Claim grade: measured contract classification; inferred cost ordering.**
The actual wall time and memory must still be profiled.

### Control A: transverse receiver motion

Use one stationary source at emission, one receiver with
$\mathbf V_i=\mathbf V_\perp$, and
$0<\|\mathbf V_\perp\|<c_f$, with $\mathbf V_\perp\perp\hat{\mathbf r}$.
Measure the acceleration component orthogonal to $\hat{\mathbf r}$. SR and GR
predict zero; SV and GV predict the nonzero transverse component stated in P2.

Require a zero-member interval within $\pm0.05$ after normalizing by the
corresponding vector-member magnitude. A vector-member run passes its
prediction only if its interval contains the declared nonzero value and
excludes zero.

**Claim grade: derived** for the discriminator. **Claim grade: guessed** for
the normalized half-width.

### Control B: stationary two-radius slope

Use stationary source and receiver histories at at least two separations with
no coupling refit. Compute

$$
n
=
-\frac{\log(\|\mathbf A(r_2)\|/\|\mathbf A(r_1)\|)}
{\log(r_2/r_1)}.
$$

SR and SV predict $n=2$; GR and GV predict $n=3$. Require
$\operatorname{rad}(\mathcal I_n)\le0.10$ and containment of the applicable
integer. An interval overlapping both families is inconclusive.

**Claim grade: derived** for the slope predictions. **Claim grade: guessed**
for the $0.10$ radius.

### Control C: transverse receiver-velocity finite difference

Use two snapshot requests with identical
$(r,\hat{\mathbf r},D_s,V_r)$ and different receiver
$\mathbf V_\perp$. Subtract the transverse acceleration rows before any whole-
trajectory comparison:

$$
\Delta\mathbf A_\perp
=
\mathbf A_\perp(\mathbf V_{\perp,2})
-\mathbf A_\perp(\mathbf V_{\perp,1}).
$$

SR and GR predict zero; SV and GV predict
$-K_p\Delta\mathbf V_\perp/|D_s|$. Use the same normalized width rule as
Control A.

**Claim grade: derived.**

### Mirrored Control A: transverse source motion

Hold the receiver stationary and give the source a transverse emission
velocity while manufacturing the same
$(r,\hat{\mathbf r},D_s,D_T)$ comparison geometry. Measure the component
orthogonal to $\hat{\mathbf r}$ and repeat with the source velocity reversed.

The canonical SR kernel and all four P2 members have no source-velocity vector
in the numerator; their per-hit acceleration remains radial on the fixed row.
A source-vector-cargo repair predicts a transverse component that is odd under
source-velocity reversal. Its exact magnitude and sign must come from the
separately accepted variant law and must be frozen before execution.

**Claim grade: derived** for the canonical/P2 zero and the source-velocity
parity discriminator. **Claim grade: inferred** for a generic nonzero
vector-cargo signature; a cargo law whose declared contraction is radial is a
counterexample and must state that prediction instead.

## Expected signature table

| Kernel | Stream $C_B$ | Control A | Control B slope | Control C | Mirrored A | Grade |
| --- | ---: | --- | ---: | --- | --- | --- |
| SR, canonical | $0$ | transverse zero | $2$ | transverse difference zero | transverse zero | derived |
| SV | $0$ | receiver-driven nonzero | $2$ | receiver-driven nonzero | transverse zero | derived |
| GR | $0$ | transverse zero | $3$ | transverse difference zero | transverse zero | derived |
| GV | $0$ | receiver-driven nonzero | $3$ | receiver-driven nonzero | transverse zero | derived |
| Source-vector cargo reducing to SR statics | nonzero; survival target $1$ | law-dependent, expected SR-like if cargo is source-only | $2$ if static reduction is exact | law-dependent, expected zero if cargo is source-only | source-driven nonzero | inferred until the variant equation fixes each coefficient |

The P2 family cannot repair the stream-current null because its transverse
terms carry receiver velocity and its transmitter-side-factor power remains unchanged.
Only a source-velocity numerator or a separately derived change in source-
normal power can change the current coefficient on this test.

**Claim grade: derived from P1's exact measure transport and P2's declared
family.** The falsifier is a correct transported population sum for one P2
member that retains source drift.

## Pass, fail, and diagnosis

### Canonical verification pass

The canonical stream row passes only when all of the following hold:

1. every contributing evolution certificate is complete, atomic, and bound to
   the inspected SR implementation and canonical model binding, with
   `evidence_status` equal to `canonical`;
2. root, branch, history, precision, reconstruction, reduction, worker, and
   optional restart checks pass;
3. the endpoint, lattice, and evolution-geometry ladders overlap inside their
   predeclared bounds;
4. both directed stream coefficients separately satisfy
   $\mathcal I_{C_B}\subseteq[-0.05,0.05]$ with width at most $0.10$; and
5. the control rows return the canonical SR signature inside their declared
   widths.

**Claim grade: guessed acceptance policy built from derived discriminators.**
Its falsifier is a pre-run audit showing that a listed condition does not bear
on the null or that a missing independent contamination row can move
$\widehat C_B$ outside the interval.

### Inconclusive outcomes

An interval containing zero but wider than $0.10$, a failed refinement
overlap, an unbounded endpoint or lattice allowance, a geometry-deformation
overrun, or any not advanced EOM outcome is inconclusive. It neither verifies
nor falsifies P1.

**Claim grade: derived from interval logic.**

### Nonzero outcome and the P2 anchor

If a refined interval excludes zero, distinguish the causes in this order:

1. Reinspect the content-bound EOM row assembly and the run's model binding.
   If it is not the P2-anchored SR formula, classify the result as
   implementation or binding drift; it does not bear on P1.
2. If SR is bound correctly, inspect per-root and receiver-total certificates,
   the fixed reduction, the current-reversal manifest, and the transfer
   postprocessor. A mismatch is implementation or instrument drift.
3. If those agree, require endpoint, lattice, time-window, worker, restart,
   spacing, collar, separation, and speed ladders to retain a nonzero interval.
   Failure at any ladder is unresolved contamination.
4. Only a nonzero interval that survives all preceding checks is a numerical
   falsifier of P1's claimed continuum null on the represented chart. It still
   does not establish the Darwin value $1$ unless the interval also contains
   $1$ under the same normalization.

**Claim grade: derived diagnostic logic.** The operator-checkable falsifier is
the first row in this sequence whose record contradicts the proposed
classification.

For a later variant replay, a result supports only that variant's declared
signature if the same initial-data fingerprints, extraction equations,
contamination bounds, and widths are retained. Fitting cargo coefficients to
these outputs and then calling the same rows confirmation is prohibited
self-agreement.

**Claim grade: derived evidence-independence rule.**

## Profiling prerequisites and qualitative cost drivers

No wall-time, memory, throughput, or scale number is asserted here. Before a
population-size commitment, rebuild the EOM solver, record the binary build
time against the latest source change, bind executable and input hashes, and
profile a small representative matrix that exercises the same history depth,
drift regime, chart, tolerances, and output fields as the scientific run.

**Claim grade: derived workflow requirement.**

The profile must attribute at least these qualitative drivers:

- total path count from two streams, two polarities, endpoint collars, and
  phase/refinement replicas;
- logical ordered receiver-transmitter pairs and the fractions excluded, enclosed,
  evaluated exactly, or unresolved by certified traversal;
- retained-history depth, segment count, history-window construction, and
  history hashing/copying;
- root binary64 work, root MPFR replay, precision-escalation attempts, and
  difficult near-boundary rows;
- sharp versus finite-width acceleration work, quadrature cells, regulator
  ladders, and reconstruction retries;
- correction iterations, full-step/two-half-step work, rejected steps,
  recertification, and observation-window length;
- fixed interval reduction and cancellation width for nearly neutral receiver
  totals;
- worker idle/orchestration time and reproducibility replays;
- certificate, accepted-history, checkpoint, and postprocessing storage; and
- the incremental cost of the spacing, collar, speed, separation, worker, and
  restart ladders.

**Claim grade: measured as available timing/counter categories and inferred as
the relevant cost-driver set.** The falsifier for any claimed dominant driver
is the profile attribution itself; geometry or pair counts alone are not cost
evidence.

Scale selection occurs only after the pilot demonstrates that the complete
$C_B$ interval can plausibly reach the declared width within the operator's
resource envelope. If it cannot, the next action is to improve the analysis
bound or certified execution path under a separate authorization, not to
weaken the null width after seeing the result.

**Claim grade: inferred recommendation.**

## Claim ledger and disposition

| Claim | Grade | Direct falsifier |
| --- | --- | --- |
| The canonical infinite neutral drifting line has $C_B=0$. | derived in P1; not re-derived here | A correct same-record population sum or accepted convergent instrument excludes zero. |
| The EOM solver currently implements SR. | measured by direct code inspection | A content-bound pre-run inspection finds a different row. |
| Four current reversals isolate the response odd in both currents. | derived | Expanding the signed combination leaves an even-in-current term. |
| The finite run represents the infinite-line claim only after endpoint, lattice, and geometry allowances pass. | derived test condition | A missing contamination changes the coefficient outside the accepted interval. |
| An interval contained in $[-0.05,0.05]$ and no wider than $0.10$ is the required meaningful null. | guessed, predeclared tolerance | A pre-run decision analysis selects another width without seeing the scientific output. |
| Controls A/C separate radial from receiver-vector sampling and Control B separates surface from gradient scaling. | derived in P2 | The declared equations give the same control outputs. |
| Mirrored Control A separates source-vector cargo from the P2 family. | derived as a parity test; variant magnitude inferred | A declared cargo equation has no source-odd transverse term. |
| Timing and pair counts do not establish cost without profiling. | derived evidence rule | An actual profile, not a proxy, establishes the cost allocation. |

Disposition: **priority-only simulation specification**. It is ready for an
operator-authorized implementation and execution packet, but it does not
promote a canonical claim, authorize a kernel change, or record a measured
simulation result.

**Claim grade: measured by this file's scope.**
