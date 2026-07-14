# Dispatch Packet — §86 Flutter Re-Run on the Validated EOM Engine

**Date:** 2026-07-13
**Status:** prerequisite gate, exact field-speed start, and first fold-crossing atomic publication passed; convergence ladders in progress
**Supersedes evidentiary basis of:** the §86 linear-pencil flutter claim (Re λ = +0.199), quarantined in [claims-triage-ledger-2026-07-12.md](../app-solver/claims-triage-ledger-2026-07-12.md) as the lead T2 item.

---

Closure goal: On the CI-validated coupled EOM engine, determine the true dynamical fate of the tilted-spindle braid by **direct time evolution under the master equation** — does a perturbation grow (flutter real), saturate to a bounded limit cycle (§90 question), or return (flutter was a pencil artifact) — and extract the growth behavior from the evolved trajectory, replacing the linear-pencil 0.199 as the authoritative §86 result.

## Prerequisite gate (do first, do not skip)

CI parity (native ↔ 90-digit oracle) proves the two implementations agree; it does **not** prove the physics matches theory. Before trusting any braid dynamics, confirm the **theorem-anchored physics cases** on the native engine:

1. **Sub-$c_f$ anti-damped departure, not hold.** Seed a symmetric two-body pair on the analytic circular configuration (binary-dynamics.md:212-235) with a genuine circular-arc prehistory of depth ≥ max delay. Evolve several orbits. The engine must reproduce the same-sheet no-go's **positive tangential-work sign** and depart from a constant-speed circle (binary-dynamics.md:682-717). A sustained circle is an automatic FAIL. The theorem does not fix the radial direction; report inward or outward motion from the evolved trajectory.
2. **Super-$c_f$ self-hit.** A curved super-$c_f$ history must produce the self-hit root at the closed-form hinge $\delta_s=2s\sin(\delta_s/2)$ (binary-dynamics.md:323) and a well-defined self-force; a straight-line super-$c_f$ history must produce **no** self-hit (binary-dynamics.md:882).

(jughead independently ran the collinear pieces on the pure-Python oracle: attraction/repulsion exact, and a 3-step coupled evolution of opposite charges moved them together by the ½at² amount — force + forward dynamics confirmed. The two cases above are the remaining, harder, multi-cycle confirmations, feasible only on the fast native engine.)

## Method — direct evolution, NOT a rebuilt pencil

1. **Build the object as explicit worldlines.** Construct the §86 spindle-braid V5 configuration (the 6-architrino tilted spindle at its candidate geometry — radii, per-layer frequency, tilt, phases) as genuine architrino paths with charge $\pm|e|/6$. Supply a **circular-arc prehistory** covering $[-h,0]$ with $h \ge$ the largest causal delay in the assembly (so every partner and self root has real history to resolve).
2. **Anchor the evolution first.** Before the braid, reproduce a known 2-body datum on the same engine (e.g. the sub-$c_f$ positive tangential-work sign and evolved departure from the prerequisite gate) so the evolution is corner-anchored, not free-floating.
3. **Evolve under the master equation** for several braid cycles at converged step size, with memory depth $h$ a first-class parameter. No prescribed motion; every position is an output.
4. **Measure the growth honestly.** Track a physical asymmetry/amplitude observable (e.g. departure of the inter-layer phase/tilt pattern from its locked value) across cycles. Extract the growth from the log-slope of the evolved amplitude. Report which of three outcomes holds:
   - **Unbounded growth** → flutter real; report the evolved rate (this supersedes 0.199; compare sign + order of magnitude only).
   - **Bounded limit cycle** → flutter saturates → this simultaneously answers §90 (the normal-form extrapolation said no saturation; the true evolution decides).
   - **Return to the locked pattern** → the 0.199 was a linear-pencil artifact; §86 no-go is overturned.

## Discipline and coverage

- **Convergence:** the outcome must survive refinement in step size **and** memory depth $h$ and a cycle-sampling ladder; a growth rate that moves under refinement is not converged.
- **Perturbation coverage:** seed multiple perturbation directions/magnitudes; a single seed is not a verdict.
- **Fail-closed:** do not declare "flutter real / artifact / saturating" from one under-resolved run. Near-marginal outcomes need the ladder.
- **Report the object:** exact worldline count, charges (net and per-site), geometry, prehistory depth, field speed, coupling, steps, cycles.
- Central `src/eom` engine used as-is (do not fork it); architrino-level, no mass; "delayed" not the disallowed variant; KaTeX.

## On return — jughead adjudicates and updates the ledger

Verify: theorem gate passed before the braid run; evolution corner-anchored (not a rebuilt pencil); convergence in step + $h$ + sampling; coverage across seeds. Then update the claims-triage ledger — §86 moves from **T2 QUARANTINED** to resolved (real / artifact / saturating), and §90 with it. If §86 resolves, the rest of the T2 flutter tier (§88, §89, §91, §92/§93, §96, §97/§98, §99) can re-run against the same direct-evolution method in ledger order.

Closure goal (next): from the §86 verdict, re-run the T2 stability tier and the T3 temporal set (§83 release, §60 expansion, collinear breather) as direct evolutions, retiring the quarantine claim by claim.

## Execution result — 2026-07-14

The prerequisite campaign stopped fail-closed before the spindle braid. The
reproducible probe and measured output are recorded in
[section-86-theorem-gates-2026-07-14.md](evidence/section-86-theorem-gates-2026-07-14.md).

- The super-$c_f$ curved-history self-hit gate passed: one certified self-root
  at $\delta_s=3.7909885379$ with hinge residual
  $6.23\times10^{-9}$ and a finite self-acceleration. The straight-history
  control certified zero self-roots.
- The sub-$c_f$ binary snapshot passed the theorem's actual local prediction:
  the fitted circular row had inward radial acceleration
  $a_r=-0.2499946541$ against the $-0.25$ circular need and positive tangential
  acceleration $a_\theta=+0.1208179726$.
- Direct native evolution completed 200 accepted coupled steps through $T=2$
  with no rejected steps. The half-separation radius grew from $1$ to
  $1.1532465269$, the speed grew from $0.5$ to $0.6886482862$, and the final
  radial velocity was $+0.2150273963$. The evolved branch is an anti-damped
  **outward** departure. This is an allowed outcome because the theorem fixes
  the tangential-work sign and non-hold departure, not the radial direction.
- A two-level $T=0.5$ step check, $\Delta T=0.01$ versus $0.005$, agreed in
  endpoint radius to $1.34\times10^{-8}$ and speed to
  $7.88\times10^{-8}$.
- The run reached $0.159$ of the initial binary period
  $P=4\pi\approx12.5664$. This is enough to establish the local theorem anchor
  and the converged non-hold direction; longer binary evolution remains a
  useful engine-coverage ladder rather than a radial-direction prerequisite.

The curved/straight self-hit gate and the direction-neutral sub-$c_f$
anti-damping gate therefore pass. On 2026-07-14 the operator explicitly
confirmed that outward departure counts as the evolved result and authorized
the §86 direct-evolution campaign. The §86 and §90 ledger rows remain
quarantined only until that campaign produces its convergence and
perturbation-coverage verdict.

The central engine now constructs and provenance-binds a uniform-circular
endpoint witness. The strict chord inequality certifies the entire open
self-search interval at $v=c_f$, while the ordinary straight $v=c_f$ rail
remains unresolved as the required negative control. The exact six-worldline
start now certifies all 36 ordered pairs and acceleration rows.

The first unconstrained candidate step then develops a middle-layer self-fold
in the genuine circular prehistory. The sharp chart fails closed there. The
finite-width route now allocates its declared quadrature tolerance against the
global interval integral and refines the largest uncertainty contributor. The
normal-tolerance inflated history recertifies with zero uncertified root rows,
two handled caustic routes, and atomic publication of all six worldlines.

The first common-endpoint ladders have started: step refinement agrees in the
control-relative amplitude ratio to $3.16\times10^{-9}$, increasing history
depth from 8 to 10 changes the ratio by $1.4\times10^{-15}$, and halving the
prehistory segment width changes it by $1.09\times10^{-8}$. Independent `imx`
and `mox` perturbation directions both publish. The full object, controls,
fold diagnostics, and initial ladder are recorded in
[section-86-direct-evolution-blocker-2026-07-14.md](evidence/section-86-direct-evolution-blocker-2026-07-14.md).

The longest tested horizon is only $6.25\times10^{-6}$ braid cycles. Its first
stride-1 diagnostic log slope is $0.60113$, while stride 2, 5, and 10 remain
undefined for lack of samples. It cannot supply a converged growth or
saturation verdict. The $0.199$ pencil result therefore remains quarantined
and non-authoritative, and §90 remains unanswered until the multi-cycle
step/$h$/sampling/direction/magnitude ladders converge.

## Adjudication — 2026-07-14

**Quarantine stands.** §86 remains T2 QUARANTINED, §90 T3 QUARANTINED. The
engine certificates are accepted: theorem gate, exact six-worldline start,
first fold-crossing atomic publication. The recorded restraint is correct — no
verdict was claimed from an under-resolved run.

Three findings change the dispatch.

**1. The $0.60113$ log slope carries no eigenvalue information.** It is the
seed-determined initial slope, not a growth rate. Across the whole window the
control-relative amplitude excess is linear in $t$ to $1.3\times10^{-3}$:
$1.13417\times10^{-5}$ at $t_1$ and $2.26690\times10^{-5}$ at $t_2=2t_1$, a
doubling ratio of $1.99874$. Both an exponential $e^{\lambda t}$ and a linear
drift give the same first-order signature at this horizon, so the observable
cannot discriminate them. Quantitatively, a genuine $\lambda=0.199$ would
produce an excess of $7.5\times10^{-6}$ over the full window — the same order
as the measured $2.27\times10^{-5}$, and therefore invisible under the seed
transient. Separating $\lambda$ from the transient needs
$t\gtrsim1/\lambda\approx5$, i.e. $\gtrsim0.83$ braid cycles; several cycles
for a converged fit. The horizon is $3.77\times10^{-5}$ — short by five to six
orders of magnitude. The $0.626$ slope from the $\omega/\omega_{V5}=0.95$
pilot is the same quantity ($t=0.0635\ll1/\lambda$) and its near-agreement with
$0.60113$ is evidence that both measure the seed, not the physics.

**2. The campaign as dispatched is not reachable.** At the accepted exact-V5
step $9.4257\times10^{-6}$, one braid cycle is $6.4\times10^{5}$ steps; a
five-cycle ladder is $3.2\times10^{6}$ steps, each carrying two finite-width
fold pairs at $\sim1.9\times10^{5}$ certified interval cells — order
$10^{12}$ cells for one rung, before the step/$h$/sampling/direction/magnitude
ladder multiplies it. This is a feasibility wall, not a bug and not a
resource-tuning matter.

**3. The cost is the physics, so it cannot be tuned away by moving off the
pin.** The $0.95$ pilot takes steps $260\times$ larger ($2.44\times10^{-3}$,
$\approx2470$ steps/cycle) and completes cleanly. The frequency continuation
table shows why: root completeness survives at $0.95$ and is lost by $0.99$.
The V5 middle layer is pinned at exactly $R_M\cos\alpha_M\,\omega=c_f$, where
the chord inequality keeps the open self-search interval root-free on the exact
circle but a self-hit opens the instant the path departs it. The runs are cheap
exactly where the self-fold is absent and expensive exactly where it is
present. A rate measured at $0.95$ and continued to $1$ would extrapolate
across a change in self-hit root topology, not along a smooth deformation of
one dynamical problem. **Do not accept a frequency-continued rate as the §86
result.**

**Next accepted object.** Not more steps. Either (a) a cheap certified
treatment of the pinned self-fold — the circular hinge $\delta_s=2s\sin(\delta_s/2)$
is closed-form, and the fold onset as the middle path departs the $v=c_f$
circle plausibly admits a local analytic model in place of subdividing
$1.9\times10^{5}$ cells per pair per step; or (b) a demonstration that the
adaptive step collapse at the pin is controller conservatism rather than a
genuine resolution requirement, which would need its own certificate. Route (a)
is both an engine target and a physics target: the local structure of the
self-hit at the speed pin is §86's actual content. Until one of these lands,
extending the present ladder burns compute against a wall.

Closure goal (next): decide between the analytic pinned-fold route and a
step-collapse certificate, then re-dispatch §86 with a horizon that reaches
$t\gtrsim5$.
