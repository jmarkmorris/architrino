# Section 88 — The Native Dressed Electron (Seed-Grade Coarse Pilot)

**Claim level:** seed grade. Coarse pilot only. No native force-free release is
authorized. Central solver (`src/solver/app/AbsoluteHistoryRootRuntime.mjs`)
untouched; this packet reuses the prescribed-worldline causal-wake evaluator and
the Section 57/58 support, tangential, and tilt machinery exactly as exported,
extending only the seed geometry and readback to the 12-site, net-charged
inventory.

**Runner:** `scripts/braid-ideal/dressed-electron-native-pilot.mjs`
**Tests:** `tests/braid-ideal-dressed-electron-native-pilot.test.js`
**Owner workstream:** braid-angular-momentum-spin.

## Object

The dressed electron is the neutral six-architrino V5 spindle scaffold
($3\epsilon_+, 3\epsilon_-$, net $0$; `SELF_EQUILIBRATED_V5.geo`) plus its charged
axial payload of six electrinos ($6\epsilon_-$), giving 12 architrinos and net
charge $-6\epsilon = -1e$, per
[Quantum Number Mapping](../../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
and [Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md).
The question is whether the charged payload changes the bare-scaffold no-gos
found on the neutral core (radial support, the axial pump, the Section 86 axis
flutter), or whether the dressed object simply inherits them.

## Placement ansatz (declared; NOT pinned by corpus)

`quantum-number-mapping.md` gives the axial layer as six architrinos on polar
sites selected by a *polar calm region* — a transverse saddle/relative-minimum
of the scaffold's superposed delayed potential near the spin axis — but pins
neither the polar radii nor the cadence. This pilot uses the most conservative
realization consistent with that text:

- six electrinos ($\text{pol} = -1$) placed **on the spin axis** ($\rho = 0$), so
  they carry no orbital angular momentum and no spin, as three symmetric
  $\pm z$ pairs at heights $\pm\,\text{scale}\cdot\{h_1,h_2,h_3\}$;
- static relative to the assembly centroid (no cadence coupling in the coarse
  pilot); the single search knob is the axial `scale`.

This is an ansatz, reported as such. A co-rotating axial shell ($\rho>0$,
nonzero spin $J$) is the declared alternative; it is not run here because the
on-axis column is the cleanest object on which the polar-calm docking claim and
the flutter question separate.

## Cross-checks (bare recovery)

The runner's independent single-time $z$-torque proxy reproduces the bare
scaffold axial pump, $\tau_z^{\text{bare}} = +0.42403$ (the Section 82 held-seed
$+0.424$), and the reused `gyroscopicTiltAnalysisFull` reproduces the Section 86
flutter growth $\operatorname{Re}\lambda = +0.199$ (whirl frequency $2.412$).
**Regression is exact:** dropping the payload recovers the bare
`supportRatios()` ratios and $\kappa^\*$ bit-for-bit and yields zero payload
pump contribution.

## Gate results

**(a) Radial support + closure + docking.** On the spin axis the cycle-averaged
transverse force vanishes identically — the whole axis is a lateral-calm *line*,
not merely point poles — so the axial column docks laterally for free and its
confinement is purely axial. Scaffold radial support is degraded when the column
is compact (the payload dominates the near wake) and recovers toward the bare
ratios ($I/M/O \approx 0.84/0.79/0.97$ at $\text{scale}=2$) as the column moves
out. The naive equal-spacing column is **not** an axial equilibrium: the
cycle-mean axial force on the electrinos does not null (axial imbalance
$\approx 0.36$ at $\text{scale}=2$, falling to $\approx 0.08$ by $\text{scale}=4$).
There is a genuine tension between compactness and scaffold-support preservation;
no clean self-consistent closure emerges from the one-knob on-axis ansatz at seed
grade.

**(b) Axial pump.** The charged payload **cancels** part of the bare pump rather
than adding to it: the dressed scaffold $z$-torque falls to $+0.367$ at
$\text{scale}=2$, a payload contribution of $-0.057$ ($\approx -13\%$ of the bare
$+0.424$). The on-axis payload carries no direct $z$-torque ($x=y=0$); the effect
is entirely the payload$\rightarrow$scaffold wake reshaping the scaffold's own
pump.

**(c) Section 86 axis flutter.** Because the axis is a cycle-averaged lateral-calm
line, a rigid tilt carries the on-axis payload onto the tilted scaffold's
(also-calm) new axis, so the payload adds no first-order transverse restoring
($K_{\text{pay}}\approx 0$) and, being spinless, no gyroscopic term
($J_{\text{pay}}=0$). It loads the tilt sector **inertially only**. In the
reduced $\lambda^2 M + \lambda G + K$ pencil this leaves the destabilizing
gyroscopic sector $G$ unchanged and lowers the growth rate through added inertia
alone. The estimate stays $\operatorname{Re}\lambda > 0$: the payload **damps but
does not dissolve** the flutter. (The inertia ratio is large and unphysical at
wide columns, so the estimate is a **sign/direction** result, not a magnitude;
the full 12-site gyroscopic re-diagonalization is the native run's job.)

**(d) EM/photon channel.** The payload opens a $-1e$ **monopole** (Coulomb /
photon) channel absent on the neutral core (bare core net charge $0$). The
symmetric $\pm$ column has zero axial dipole; the leading payload moment is the
axial quadrupole. The object now couples to external EM at $O(1/r)$ potential and
to the photon sector via its charge current; the dynamic photon-emission ledger
is a separate native burden.

## Honest verdict

The dressed electron **partially rescues** the scaffold — it supplies its own
$-1e$ charge and EM channel, cancels $\approx 13\%$ of the bare axial pump, and
inertially damps the flutter — **but it inherits the Section 86 flutter no-go at
seed grade**: a spinless on-axis payload cannot reach the gyroscopic sector that
drives the instability. This is a direct, honest answer to the enabling question:
the §84–§87 bare-core no-gos are **not** dissolved by the minimal (spinless,
on-axis) dressing. The declared alternative — a **co-rotating (spin-carrying)
axial layer** with $J_{\text{pay}}\neq 0$ — is the first candidate that could
enter $G$ and is the natural next target.

## Assumptions and proof burden

- On-axis, static, equal-spacing column: an explicit ansatz, not a solved axial
  equilibrium. The 1-D axial force balance is unsolved (coarse pilot).
- Support/pump metrics are single-time ($T=0$) rigid evaluations (the Section
  36/60 convention); the docking metric is cycle-averaged. Cycle-averaged
  self-torque and the full dynamic pump are deferred.
- The flutter shift is a reduced rigid-tilt perturbation estimate (sign only).
- No native release, no retained-branch claim, no acceptance.

## Intended corpus destination

If the co-rotating-axial-layer follow-on confirms the gyroscopic entry, promote
the qualitative result — *minimal spinless dressing damps but does not dissolve
the axis flutter; spin-carrying dressing is required to reach the gyroscopic
sector* — into
[Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md) and the
Noether-braid angular-momentum treatment. Until then this stays priority
material at seed grade.

`Closure goal:` decide whether a co-rotating (spin-carrying) $6\epsilon_-$ axial
layer with $J_{\text{pay}}\neq 0$ enters the gyroscopic sector $G$ and can null
the Section 86 flutter, using a 12-site extension of `gyroscopicTiltAnalysisFull`.
