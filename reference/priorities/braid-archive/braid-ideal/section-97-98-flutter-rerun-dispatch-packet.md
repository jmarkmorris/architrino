# Dispatch Packet — §97/§98 Flutter Re-Run on the Validated EOM Engine

**Date:** 2026-07-14
**Status:** returned horizon-blocked on 2026-07-14; quarantine retained
**Re-anchors:** the §97/§98 flutter magnitudes, quarantined in
[claims-triage-ledger-2026-07-12.md](../../app-solver/claims-triage-ledger-2026-07-12.md)
as T2 **high priority** (self-labeled unanchored — the worst-footed T2 row).
**Runs independently of §86.** §86 is stalled at a pinned-fold feasibility wall;
this packet is deliberately scoped to the region where that wall does not exist.

---

Closure goal: On the CI-validated coupled `src/eom` engine, decide by **direct
time evolution under the master equation** whether the isolated rotating triple
is flutter-free anywhere in the sub-$c_f$ region §97/§98 sampled — testing the
**sign** of the growth, not the magnitude — and thereby either harden or
overturn the §97/§98 no-flutter-free-triple negative.

## What is and is not at issue

**Not at issue (T1, survives).** The isolated triple **does not bind**.
$\epsilon_{\rm bind}$ is a force-balance residual; the evaluator computes
instantaneous force correctly, and force-balance negatives are the safest rows
in the ledger. Do not re-litigate binding. Do not re-run the bind search.

**At issue (T2, quarantined).** Every $\operatorname{Re}\lambda_{\rm lead}$ in
§97/§98. §98 Part 0 states the defect plainly: on the identical spindle
geometry the generalized arbitrary-config pencil returns
$0.630731170234615$ while the specialized pencil returns
$0.198856884972164$ — a factor $3.17$. §98 correctly labeled every
arbitrary-config stability number a "coarse generalized gyroscopic-family
screen" whose "sign is useful as seed-grade evidence, but its magnitude is not
a corner-calibrated measurement."

**The load-bearing claim needs only the sign.** §97/§98's contribution to the
strategic frontier is the negative: across $105$ staged points, $100$ full-DOF
points, and $1{,}000$ no-tilt points, **zero** were flutter-free. That negative
rests on $\operatorname{Re}\lambda_{\rm lead}>0$ everywhere — a sign claim. The
magnitudes were never load-bearing and are not worth recovering. **Scope this
campaign to the sign.**

**No anchor exists in the pencil family.** Do not re-anchor the generalized
pencil against the specialized one: both are quarantined, and the specialized
one's own $0.198857$ is the §86 value that direct evolution has not yet
replaced. There is no calibrated corner to anchor to. The anchor must be a
direct evolution. This is why the ledger's phrase "re-score with an anchored
pencil" is superseded by this packet.

## Why this is feasible where §86 is not

The §86 wall is the self-fold at the $v=c_f$ speed pin: the V5 middle layer
rides at exactly $R_M\cos\alpha_M\,\omega=c_f$, a self-hit opens the instant the
path departs the circle, and the resulting finite-width quadrature costs
$\sim32$ s per accepted step at $6.4\times10^{5}$ steps per braid cycle.

The isolated triple has no such pin. In the **sub-$c_f$ region** the chord
inequality keeps the open self-search interval root-free, no self-fold opens,
and steps are cheap — the $\omega/\omega_{V5}=0.95$ pilot ran $260\times$ larger
steps with zero rejections. §97/§98's reported growth rates in the target region
are $O(0.02)$ to $O(1)$, so $t\gtrsim1/\lambda$ is $O(1)$–$O(50)$ time units, a
horizon the engine can actually reach.

**Supra-$c_f$ rows are out of scope for this packet.** §97 explicitly places
rings at site-speed ratios $1.05$ and $1.20$ and activates same-source roots;
§98 exercises the supra-field regime. Those rows inherit the §86 fold wall and
must wait on the pinned-fold work. Declare them deferred; do not attempt them,
and do not let a sub-$c_f$ verdict be reported as covering them.

## Method

1. **Verify the object before evolving it.** §97's staged search held $R_i$ and
   $z_i$ at corner values and opened one coordinate family at a time; §98 Part 1
   varied all $15$ coordinates $(R_i,z_i,\omega_i,\phi_i,\alpha_i)_{i=1}^{3}$.
   Build the triple as explicit worldlines directly from the recorded
   coordinates and confirm against the spec before evolving: worldline count,
   per-site charge $\pm|e|/6$, net charge, ring sense, polarity orientation,
   handedness, axial order, radii, axial positions, cadences, phases, tilts.
   Report the constructed object. If it disagrees with the spec, stop and report
   — a wrong object is how §96–§98 went wrong before.
2. **Select the falsification targets, not the convenient ones.** The negative
   is hardest to defend at the point with the **smallest converged growth**, so
   evolve that point. From §98:
   - the Part 1 declared branch-set floor,
     $\operatorname{Re}\lambda_{\rm lead}=0.0197978008023$;
   - the best Part 1 branch `M-O-I` at $24$ samples,
     $\operatorname{Re}\lambda_{\rm lead}=0.393849549275$ (coordinates tabulated
     in the §98 spec);
   - Part 2 point $73$ ($0.520758028$ at $24$ samples) as an independent
     geometry.
   Take the §97 best fully scored finalist ($0.721318143353$) as a fourth,
   larger-signal case. Exclude any point whose low growth is already a known
   sampling artifact — §98 Part 2 point $3$ and point $852$ both collapse under
   the $24$-sample ladder and are settled; do not spend evolution on them.
3. **Supply a genuine circular-arc prehistory** over $[-h,0]$ with $h\ge$ the
   largest causal delay in the triple, using the native factory so the endpoint
   witness is provenance-bound.
4. **Evolve, do not rebuild a pencil.** No prescribed motion; every position is
   an output of the master equation. Use `src/eom` as-is; do not fork it.
5. **Measure with the control-relative observable.** Reuse the §86 runner's
   construction: evolve an independent unperturbed control to the same final
   time, compare perturbed and control layer frames, remove the mean rotation,
   report the RMS relative rotation. This avoids confusing the triple's finite
   inter-ring geometry with perturbation amplitude.
6. **Reach a horizon that can carry the answer.** This is the gate the §86 run
   failed. At $t=3.8\times10^{-5}$ the §86 amplitude excess was linear in $t$ to
   $1.3\times10^{-3}$ and its "slope" was the seed transient. **Evolve to
   $t\gtrsim5/\lambda_{\rm expected}$ — several e-foldings — or report the run
   as horizon-blocked.** A slope fitted below one e-folding is not a
   measurement, and the first check on any reported slope is whether the
   amplitude excess is still linear in $t$; if it is, the run has measured
   nothing.

## Discipline and coverage

- **Convergence:** step size, memory depth $h$, and prehistory-segment
  sampling ladders on every scored point; a slope that moves under refinement is
  not converged.
- **Perturbation coverage:** at least two independent directions and at least
  two magnitudes per point, with the magnitude ladder confirming the response is
  in the linear regime (or reporting that it is not).
- **Sampling strides:** report slopes at multiple strides. A stride whose fit is
  undefined for lack of samples is a horizon failure, not a result.
- **Fail-closed:** no "flutter real / artifact / free" from one under-resolved
  run. Do not relax tolerances to reach a horizon; report the wall instead.
- **Report the object:** worldline count, per-site and net charge, geometry,
  prehistory depth, field speed, coupling, steps, cycles, wall time per step.
- Architrino-level, no mass and no $mv$ (the pencil's $M$ diagonal entries are
  integration weights, not ontology, and no evolved claim may lean on them);
  "delayed", never the disallowed variant; KaTeX; `validate-content` and
  `build-scene-graph` `--check --strict` and `git diff --check` pass; report
  generator drift rather than `--write`ing it.

## Expected output

An evidence packet under `evidence/`, a work-log entry, and a ledger status
update recording:

1. the constructed object versus the spec, per point;
2. the evolved control-relative amplitude history, with the linear-in-$t$ check
   applied and reported;
3. converged log slopes with their step/$h$/sampling/direction/magnitude
   ladders, **or** an explicit horizon-blocked declaration with the wall-time
   arithmetic that establishes it;
4. one of three dispositions per point — growth confirmed (sign holds),
   bounded/returning (sign overturned), or horizon-blocked;
5. the sub-$c_f$ scope boundary stated, with supra-$c_f$ rows declared deferred.

Record evidence and status. **Do not lift the quarantine** — that is the
adjudicator's call on return.

## On return — adjudication

Verify: object matches spec; evolution is direct, not a rebuilt pencil; the
horizon reached several e-foldings; the amplitude is no longer linear in $t$;
convergence in step, $h$, and sampling; coverage across directions and
magnitudes. Then the §97/§98 flutter row moves from T2 QUARANTINED to resolved
**as a sign claim over the sub-$c_f$ region** — the magnitudes stay retired, and
the supra-$c_f$ region stays open.

If the sign holds, the strategic frontier conclusion hardens: no isolated
rotating triple is flutter-free, and the pivot to a constitutive Noether sea is
supported by an evolved result rather than an unanchored screen. If the sign
overturns anywhere, that point becomes the most valuable object in the braid
program and everything else queues behind it.

Closure goal (next): carry the same direct-evolution sign method to the
remaining T2 flutter rows in ledger order (§99 anchored pencil, §92/§93,
§88/§89, §57/§59), taking the cheap sub-$c_f$ rows first and leaving every
$v=c_f$-pinned and supra-$c_f$ row queued behind the pinned-fold work.

---

## Adjudication — 2026-07-14 (on the horizon-blocked return)

**The campaign was ill-posed, and the error is this packet's, not the run's.**
The execution was disciplined: faithful object, no rebuilt pencil, no relaxed
tolerances, the linear-in-$t$ check applied and honored, binding untouched,
targets triaged against their own specs before evolving. The report should be
read as a correct refusal, not a failure.

### The §97/§98 flutter claim is void, not quarantined

This packet asked for the **sign of the growth of a perturbation** about the
§97 finalist. That question has no referent. The evolved point carries a
recorded $\epsilon_{\rm bind}=0.118508409171$ against a gate of $0.03$: its net
radial force is $12\%$ away from what its own circular motion requires. It is
not an equilibrium. There is nothing to be perturbed about.

The ledger's T2 definition already bars this. T2 verdicts are "valid only if
(a) the pencil is anchored to a hand-checkable case **and (b) it linearizes
about an actually force-balanced configuration**." Condition (b) fails for
every §97/§98 point **by their own recorded $\epsilon_{\rm bind}$** — that is
precisely the content of the T1 non-bind negative. §97's three fully scored
finalists fail bind. §98's Part 1 branch minima and both Part 2 scans found
zero binding points; point $852$ was scored at $\epsilon_{\rm bind}=0.999999995$,
i.e. no force balance whatsoever, and still received a
$\operatorname{Re}\lambda_{\rm lead}$.

One may linearize about a non-equilibrium *trajectory* (a tangent map about the
path actually followed). §97/§98 did not do that. They linearized about a circle
the object does not follow, so the linearization carries a nonzero constant term
that dominates the eigenvalue structure. The pencil describes nothing — at any
anchoring, at any magnitude, of either sign.

**Disposition: the §97/§98 flutter row is retired as void.** Not re-run, not
re-anchored, not re-scored. Remove it from the re-run worklist.

**This costs the corpus nothing.** §97/§98's load-bearing contribution is the
T1 negative — the isolated triple does not bind — which never depended on the
pencil. Flutter-freeness was always moot where nothing binds: a stability
verdict on a non-existent equilibrium adds no evidence for or against the
strategic pivot to a constitutive Noether sea. Retiring the flutter row removes
a claim that was never carrying weight, and removes a re-run that could only
have produced ill-posed numbers.

### What the evolution did establish

The run is not empty. The §97 finalist, evolved under the master equation from a
certified start with no imposed motion, **departs its circle immediately and
drives itself into a root-completeness wall within $0.04$ of a period.** That is
an independent direct-evolution confirmation of the T1 non-bind negative,
obtained on the new engine. It is worth recording as such. It says nothing about
flutter, because flutter is undefined there.

### Standing correction to the method

Before any future direct-evolution stability dispatch: **confirm the target is
force-balanced first.** A T2 stability re-run is only meaningful on a
configuration that passes the bind gate. Where the T1 negative says nothing
binds, the corresponding T2 flutter row is void by construction and must be
retired rather than re-run. Apply this test to the remaining T2 tier before
dispatching any of it — §96's flutter row sits on a recorded non-bind and is
the next candidate for the same retirement.

### The precision wall is a separate matter and is worth diagnosing

The wall reported here — `numeric_precision_limit_exhausted`, unmoved from $512$
to $1024$ MPFR bits — is not explained by precision, and it is not explained by
this packet's ill-posedness either. It should be resolved on its own terms
because the same class of wall gates §86 and the rest of T2. See
[eom-root-completeness-wall-diagnostic-dispatch-packet.md](../../app-solver/eom-root-completeness-wall-diagnostic-dispatch-packet.md).
