# Dynamical-Sea Axis Absorber — Reorienting-Dipole Build Spec (CTO Handoff)

Claim level: build spec / instrument handoff. This packet specifies the minimal
dynamical extension of the co-drifting-sea machinery that escapes the
frozen-orientation multipole no-go, so the structured sea can be tested for the
one thing the whole convergence frontier now waits on: an **axis absorber** that
anchors the braid spin axis $\hat n\to\hat d$ under oblique drift while settling
the drift-frame transverse shear $\sigma\to0$. It extends the runner only; the
central solver `AbsoluteHistoryRootRuntime.mjs` is untouched. It is the empirical
half of the axis-absorber question for the
[boosted-delay shape-attractor theorem target](../master-equation-closure/boosted-delay-attractor-theorem-target.md)
(Corollary 1, large-drift Lorentz ruler) and the mass-map $A_0$ native release.

## Why this instrument (the bounding no-go it must escape)

The frozen-orientation co-drift cage family is closed
([native-axial-drift-envelope-instrument-spec.md](native-axial-drift-envelope-instrument-spec.md),
cage-symmetry scan): for a **frozen-orientation** co-drifting multipole sea the
axis-anchoring torque and the transverse shear are the *same anisotropic
multipole* — anisotropic cages anchor but shear, axisymmetric cages (polar-pair,
high rings) neither anchor nor shear. So the shared axis absorber's anchoring
torque must be **axisymmetric about $\hat d$**, which no static multipole can
supply. The surviving routes are dynamical: the sea's orientational **response**
must be time-dependent so that its time-averaged torque is axisymmetric about
$\hat d$ while its instantaneous anisotropy supplies the anchoring.

## What it builds (the minimal escape)

Two default-off knobs on the existing `DECLARED.coDriftCage` object, both
carried entirely through the existing `centerVelocity` production surface (no
native-ABI change). Both null at $u=0$ (the co-drift cage is only defined with
drift), so every rest/axial regression is exact.

1. **Reorienting dipole (primary — the closure-goal task).**
   `coDriftCage.reorient = { enabled, target, rate }`. Each co-drifting cage
   site carries a dipole whose orientation $\hat p_k(t)$ continuously **tracks a
   target axis**: `target = "driftHat"` (the fixed $\hat d$) or
   `target = "braidAxis"` (the braid's instantaneous spin axis $\hat n(t)$, read
   each step from `braidAxisRow(states).axisUnit`). `rate = Infinity` is the
   saturated limit ($\hat p_k(t)=$ target exactly each step); a finite `rate`
   $\gamma$ is a first-order lag $\dot{\hat p}_k=\gamma(\text{target}-\hat p_k)_\perp$
   carried as cage state. The **reorientation velocity** $\dot{\hat p}_k$ is the
   physics: it enters the branch factor $D_s=c_f-\mathbf v_{\rm src}\cdot\hat r$
   of every cage endpoint, so a dipole that tracks the tumbling braid axis
   produces a dynamical (not static-multipole) torque whose time average over the
   braid's own precession is axisymmetric about $\hat d$. This is the minimal
   thing that steps outside the frozen-multipole lemma.

2. **Co-orbital ring (complementary route).**
   `coDriftCage.orbit = { enabled, rate }`. The equatorial ring centers rotate in
   azimuth about $\hat d$ at angular rate $\Omega=\texttt{rate}\cdot\omega$
   (polar sites, on $\hat d$, are invariant), so the time-averaged charge
   distribution of the ring is an axisymmetric annulus about $\hat d$ — the
   direct way to average away the frozen 4-fold transverse structure that made
   the octahedral cage shear. Endpoint velocity picks up the orbital term
   $\Omega\,\hat d\times\mathbf c$.

## Mechanics (contract-preserving reconstruction)

The reorienting/orbiting endpoint worldline is not uniform, but each cage
endpoint is booked through the same production causal-root path
(`seaWakeContribution` → `solveMovingCircularSourceCausalRoots`) by a **tangent
reconstruction at the emission-time estimate**. For receiver $\mathbf x_i$ at
reception time $t_H$, `seaWakeContribution` already forms the emission estimate
$t_{\rm root}=t_H-|\mathbf x_i-\mathbf P_k(t_H)|/c_f$. At $t_{\rm root}$ the
instantaneous endpoint position $\mathbf P_k(t_{\rm root})$ and velocity
$\mathbf V_k(t_{\rm root})=\mathbf u+\text{(orbit)}\pm(p_0/2)\dot{\hat p}_k$ are
evaluated; the production source is set to the uniform line tangent to the true
worldline there — `centerAtEpoch = P - V·t_root`, `centerVelocity = V`. This is
first-order accurate across the $\pm0.05$ causal scan window and carries the
reorientation/orbital velocity into $D_s$ exactly. `coDriftCage.reorient.enabled
= false` and `orbit.enabled = false` reproduce the frozen build to the digit
(regression). The live target axis $\hat n(t)$ and its rate $\dot{\hat n}$ are
computed once per step in `runRelease` (finite difference of
`braidAxisRow(states).axisUnit`) and attached to the cage object read by
`seaWakeContribution`.

## Touch points (runner only)

1. `DECLARED.coDriftCage.reorient` and `.orbit` sub-objects (declared regulators;
   both disabled by default).
2. `buildCoDriftCage`: tag each endpoint with `baseCenter` (co-moving epoch-0
   center), `cageFrameDir`, `pm`, `shellIndex`; attach `reorient`/`orbit`/
   `driftHat`/`omega`/frozen `pHat` to the cage object. Frozen-path endpoints
   unchanged.
3. `runRelease`: per step, if the cage reorients, set `cage.liveAxis`,
   `cage.liveAxisRate` from `braidAxisRow(states)` (or $\hat d$ for
   `driftHat`), advancing a finite-rate lag state when `rate` is finite.
4. `wakeAcceleration`: pass the live cage into `seaWakeContribution`.
5. `seaWakeContribution`: when the cage reorients/orbits, reconstruct each
   endpoint's tangent source at $t_{\rm root}$ (above); else book endpoints as-is.
6. `coDriftCageCoherenceRow`: use the live $\hat p_k(t)$ / orbited centers.
7. CLI: `--reorient`, `--reorient-target=braidAxis|driftHat`,
   `--reorient-rate=<num|inf>`, `--co-orbit`, `--orbit-rate=<num>`.
8. Fixture part (h): reorient/orbit disabled ⇒ exact frozen regression; null at
   $u=0$; `target=driftHat` ⇒ all dipoles along $\hat d$; finite-rate lag
   integrates; resumable determinism. Keep the 36/36 suite green.

## Run matrix

Row 7 V5, $u=0.2$, $dt=0.001$, 0.5 rot, native free-tilt release, $\theta\in\{30°,90°\}$:

- `--co-drift-cage --reorient --reorient-target=braidAxis` at
  `--cage-geometry=polarPairOnly` (axisymmetric positions: isolates the dipole
  dynamics) and `octahedral` (against the frozen 4-fold baseline).
- `--co-drift-cage --co-orbit --orbit-rate=1` at `octahedral` (ring averaging).
- optionally the combination, and a finite `--reorient-rate` lag scan.

Measure, against the bare and frozen-cage oblique baselines: (1) axis anchoring
$\hat n\!\cdot\!\hat d$ over the release; (2) drift-frame $\sigma(t)$ settling;
(3) cage coherence (`coDriftCageCoherenceRow`); (4) per-layer radial ledger
(unspoiled ⇒ axis-only, as intended — the bare V5 owns the radial channel).

## Decision tree (from the theorem target)

- Anchors **and** settles $\sigma\to0$ ⇒ the axis absorber closes; large-drift
  Lorentz ruler + Corollary 1 + $A_0$ open together.
- Anchors but $\sigma$ won't settle ⇒ the shear is localized to the composed
  dynamics; push $\sigma=0$ onto the return-cycle relaxation / attractor-
  uniqueness theorem (analytic).
- Cannot anchor axisymmetrically ⇒ non-rigid axis dynamics (an internal
  deformation coordinate coupling to the whirl, the §68 fork) is the last channel.

## Build + run status (2026-07-10)

BUILT. All touch points implemented in
`scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs`
(the `reorient`/`orbit` sub-objects on `DECLARED.coDriftCage`; per-step
`updateCageLiveOrientation`; the tangent-at-$t_{\rm root}$ reconstruction
`dynamicalEndpointState` inside `seaWakeContribution`; the coherence-row and CLI
extensions). `AbsoluteHistoryRootRuntime.mjs` is unchanged. Fixture part (h)
added; the 37/37 suite is green (36 frozen + reorient/orbit disabled regress to
the digit). Row 7 V5, $u=0.2$, $dt=0.001$, 0.5 rot, native free-tilt release.

### Result — the reorienting-dipole route ANCHORS axisymmetrically (first of its
kind), but WEAKLY, and does not settle $\sigma$ (measurement grade)

The decisive three-way comparison at the **axisymmetric-position** geometry
(`polarPairOnly`, $\theta=90°$), axis-vs-drift angle over the release:

| dipole law | axis-vs-$\hat d$ (start→end) | $\sigma$ (start→end) | verdict |
|---|---|---|---|
| track $\hat n(t)$, saturated (rate $\infty$) | $66°\to\mathbf{38°}$ | $0.31\to0.37$ | **anchors** (weak), $\sigma$ grows |
| track $\hat n(t)$, lagged (rate 2) | $66°\to65°$ | $0.31\to0.60$ | no anchor |
| fixed along $\hat d$ (`driftHat`) | $66°\to66°\to89°$ | $0.31\to0.60$ | no anchor |

The frozen polar-pair and the static-along-$\hat d$ dipole both anchor
**nothing** (bare-identical), reproducing the no-go. Only the **saturated
tracking of the braid's instantaneous axis** $\hat n(t)$ pulls the spin axis
toward $\hat d$ ($66°\to38°$); the finite-lag control kills it. So the anchoring
is supplied by the **reorientation velocity** $\dot{\hat n}$ entering the branch
factor $D_s$ — a genuinely dynamical, axisymmetric-about-$\hat d$ torque that no
static multipole can produce. This is the **first axis anchoring in the program
from an axisymmetric-position sea**, validating the escape mechanism the
frozen-multipole lemma pointed to.

But it is **weak and does not close the joint requirement**: the anchor reaches
only $\sim38°$ (not $\hat n\to\hat d$), is absent at $\theta=30°$ (axis ends
$\sim79°$, dominated by the same bare transient — $\sigma$ dips to $0.015$ then
rebounds), and $\sigma$ does not settle ($0.31\to0.37$ at $\theta=90°$).

### Result — the co-orbital ring is the dynamical face of the anchor=shear lemma

`--co-orbit --orbit-rate=1` on the octahedral cage **reduces** the drift-frame
shear ($\sigma\;0.31\to0.22$ by 0.25 rot — the ring azimuthal average kills the
4-fold anisotropy) but **anti-anchors** the axis ($66°\to89°$). Reorienting the
octahedral dipoles instead **destroys** the frozen octahedral anchor and goes
incoherent (force spikes $\sim3.6$). Both confirm dynamically the structural
lemma: axisymmetrizing the ring removes the anchor together with the shear.

### Gain sweep — the anchor is gain-reachable to $\hat n\to\hat d$, but $\sigma$ is decoupled from it

Diagnostic knobs `--dipole-gain` (scales the cage dipole length $p_0$, i.e. the
reorientation authority $\sim p_0\,\dot{\hat n}$) and `--cage-spacing` probe
whether the confirmed lever can be pushed to $\hat n\to\hat d$ (polar-pair,
track $\hat n$, $\theta=90°$, axis-vs-$\hat d$ start→min→end / $\sigma$ end):

| config | axis start→min→end | $\sigma$ end | note |
|---|---|---|---|
| $p_0\times1$, $a{=}2.326$ | $66°\to38°\to38°$ | 0.37 | baseline anchor |
| $p_0\times1.5$ | $66°\to66°\to84°$ | 0.40 | no anchor (non-monotone) |
| $p_0\times2$ | $66°\to\mathbf{10°}\to32°$ | 0.42 | **near $\hat n\to\hat d$**, rebounds |
| $a{=}2.0$ | $66°\to66°\to84°$ | 0.34 | no anchor |
| $a{=}1.8$ | $66°\to37°\to37°$ | 0.24 | anchors, halts @1.58 |

Two facts. (1) **The anchor is gain-reachable but a strain-coupled resonance.**
At $p_0\times2$ the spin axis swings to $10°$ from $\hat d$ (from $66°$) — the
lever *can* reach the target — but the anchor-vs-strain tradeoff across the sweep
is a sharp **resonance**, not a monotone gain response:

| config | best axis-vs-$\hat d$ | peak cage $F$ | end $\sigma$ |
|---|---|---|---|
| $p_0\times1$ | $38°$ | 0.96 | 0.37 |
| $p_0\times1.5$ | $66°$ (no anchor) | 0.29 | 0.40 |
| $p_0\times2$ | $\mathbf{10°}$ | $\mathbf{8.2}$ | 0.42 |
| $p_0\times3$ | $46°$ | 0.21 | 0.48 |
| $a{=}2.0$ | $66°$ (no anchor) | 0.73 | 0.34 |
| $a{=}1.8$ | $37°$ | 0.70 | 0.24 |

The strong anchor ($p_0\times2$, $10°$) **co-peaks with the cage strain**
($F\to8.2$) and is bracketed by weak/failed anchors on both sides ($p_0\times1.5$
and $p_0\times3$) — i.e. the strong anchor is a resonance whose torque is
inseparable from a strain that would disperse a back-reacting sea. Off-resonance
the anchor is weak and the cage is calm. So the anchor is **coherence-limited**:
a settled anchor needs a *stiff, coherent* dynamical sea (back-reaction retained)
or resonance tuning with strain relief, not more gain. (2) **$\sigma$ is
decoupled from the anchor and from anchor quality.** It never settles at any gain
(0.24–0.48) and does not track anchor strength — the *best* anchor ($p_0\times2$,
$10°$) has the *worst* end $\sigma$ (0.42), while a weak anchor ($a{=}1.8$, $37°$)
has the lowest (0.24). The sea does modestly *reduce* $\sigma$ versus the bare
oblique release ($0.60\to0.24$–$0.48$), but never settles it, and the reduction
is uncorrelated with the anchor. So settling $\sigma$ is a separate shape-sector
obligation, not something the axis torque delivers.

### Result — the dynamical sea is axis-only; it does NOT absorb the rail pump (S1/S2)

Tested whether the dynamical sea incidentally supplies the radial / rail-pump
absorption S1/S2 needs, at **axial** drift ($\theta=0$, $u=0.2$, where the axis
does not tumble): bare vs frozen-octahedral, co-orbital, and reorienting-polar-
pair cages. The coherent-expansion track $R_\perp(t)$ is **identical to bare to
three digits** for every variant ($0.96\to2.37$ over 0.5 rot; frozen-cage differs
by $<1.5\%$, co-orbit/reorient by $<0.3\%$), and the middle-layer support stays
starved ($\approx0.00$) throughout regardless of the cage. So the dynamical sea —
like every prior sea configuration — is **axis-only**: it does not absorb the
rail pump and does not slow the coherent expansion. This rules the dynamical-sea
route out for S1/S2 and confirms the shape-attractor closure is a genuinely
separate obligation (the Group-A tangential rail-pump absorber), not reachable
through the axis-sector sea.

### Verdict and decision-tree placement

The dynamical reorienting-dipole sea is the **first structured-sea configuration
to anchor the braid axis from an axisymmetric-position (no-go-escaping) sea** —
the mechanism the theorem target hypothesized is real (saturated orientational
response, $\dot{\hat n}$-driven), and the gain sweep shows it is **reachable to
$\hat n\to\hat d$** (axis to $10°$ from $\hat d$ at $p_0\times2$). It does **not**
close Corollary 1, and the sweep sharpens *why* into two separated obligations:

1. **Axis anchor** — the lever exists and is gain-reachable, but at fixed
   dipole strength the anchor is **transient, resonant (non-monotone in gain),
   and strain-limited** (the strong-anchor event spikes cage coherence to
   $F\to8.2$). A settled anchor needs a **coherent** dynamical sea (the sea's own
   back-reaction included) and/or resonant tuning, not just more gain — this is
   the CTO-lane continuation.
2. **Transverse shear $\sigma=0$** — the sweep shows $\sigma$ is **decoupled
   from the axis anchor** (never settles at any gain; grows *while* the axis is
   best-anchored). This definitively moves $\sigma=0$ off the axis-absorber and
   onto the **return-cycle relaxation / attractor-uniqueness theorem** (Corollary
   1 as a property of the composed shape dynamics — the proof-lane continuation,
   [return-cycle-relaxation-sigma-attractor-theorem-target.md](return-cycle-relaxation-sigma-attractor-theorem-target.md)).

So the decision-tree branch *"reorientation anchors but $\sigma$ won't settle"*
is confirmed, with the anchor gain-reachable but coherence-limited. The
non-rigid-axis-dynamics fallback (§68) stays live for a settled anchor.

Reproduce (per config; resumable per $u$-cell):
`--drift-envelope --co-drift-cage --reorient --reorient-target=braidAxis --cage-geometry=polarPairOnly --row=7 --u-grid=0,0.2 --drift-angle=90 --drift-rotations=0.5 --drift-dt=0.001`
(swap `--reorient-target=driftHat`, `--reorient-rate=2`, `--drift-angle=30`,
`--cage-geometry=octahedral`, or `--co-orbit --orbit-rate=1` for the controls).

## Ownership

CTO/solver-lane build. Native root engine untouched; the dynamical response
lives on the existing `centerVelocity` surface and the runner's cage/readback.
Fail-closed: names no retained branch, authorizes no acceptance.
