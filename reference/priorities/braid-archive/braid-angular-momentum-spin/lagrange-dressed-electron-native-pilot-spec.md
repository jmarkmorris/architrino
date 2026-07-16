# Section 89 — The Lagrange-Docked Co-Rotating Dressed Electron (Seed-Grade Coarse Pilot)

**Claim level:** seed grade. Coarse pilot only. No native force-free release is
authorized. Central solver (`src/solver/app/AbsoluteHistoryRootRuntime.mjs`) and
the base instruments (`spindle-braid-screw-drift-evaluator.mjs`,
`spindle-support-ratio-targeted-search.mjs`) are untouched; this packet only
imports their exports and adds the 12-site, net-charged, co-rotating build and
readback.

**Runner:** `scripts/braid-ideal/lagrange-dressed-electron-native-pilot.mjs`
**Tests:** `tests/braid-ideal-lagrange-dressed-electron-native-pilot.test.js`
**Owner workstream:** braid-angular-momentum-spin.

## Object and enabling question

The dressed electron is the neutral six-architrino V5 spindle scaffold
($3\epsilon_+, 3\epsilon_-$, net $0$; `SELF_EQUILIBRATED_V5.geo`) plus a charged
payload of six electrinos ($6\epsilon_-$), giving 12 architrinos and net charge
$-6\epsilon = -1e$. Section 88 (jh14) placed the payload as a spinless on-axis
column and found it **damps but does not dissolve** the Section 86 axis flutter,
because an on-axis payload carries no angular momentum ($J_{\text{pay}} = 0$) and
so never touches the gyroscopic sector $G$ that drives the instability. Section 88
named the required next object: a **co-rotating (spin-carrying) axial layer** with
$J_{\text{pay}} \neq 0$. This packet builds it and answers whether it dissolves the
Section 84–88 bare-core no-gos.

## The Lagrange reduction (the new primary ansatz)

Each V5 binary is the $\pm$ co-rotating pair of one layer (I, M, O). For a
like-charge test electrino ($\text{pol} = -1$) co-rotating with the assembly at
$\omega$, its equilibria in the binary's co-rotating frame are the points where
the delayed two-body wake plus the centrifugal term net to zero:

$$
\mathbf{r}_{\text{res}}(\mathbf{X}) = \kappa^\*\,\mathbf{a}_{\text{wake}}(\mathbf{X}) - \mathbf{a}_{\text{cent}}(\mathbf{X}) = \mathbf{0},
$$

with $\mathbf{a}_{\text{cent}}$ the centripetal need $-\omega^2\rho\,\hat{\boldsymbol\rho}$
of a site co-rotating at radius $\rho$. Linear stability is evaluated in the full
rotating frame, $\ddot{\delta\mathbf{r}} = J_G\,\delta\mathbf{r} - 2\boldsymbol\Omega\times\dot{\delta\mathbf{r}}$,
so the Coriolis term (which stabilizes classical triangular points) is included.

**Findings (step 1).** Each binary has two genuine co-rotating-frame equilibria —
one triangular-analog (larger $\rho$) and one near-axis/collinear-analog — and
**both carry $\rho > 0$, hence $J_{\text{pay}} \neq 0$**. Every one of them is
**linearly unstable** once Coriolis is included ($\operatorname{Re}\lambda > 0$ for
all six equilibria across the three binaries). There is **no exact $L4/L5$ mirror
pair**: the rotating causal wake has a handedness (reflection through the member
azimuthal plane reverses the sense of rotation), so the mirror image of an
equilibrium is not an equilibrium (mirror residual $\approx 0.6$–$1.5$, not $0$).
The "two per binary" docking sites are therefore the two distinct located
equilibria, declared as the ansatz.

## Gate results

**(a) Support / tangential closure and spin.** The docked payload sits at radii
comparable to the scaffold layers, so it dominates the near wake and disrupts the
scaffold's radial support: the unified coupling $\kappa^\*$ moves off the bare
value and the middle-layer support ratio collapses well below $1$. The dressed
object **does not close** its radial + tangential ledgers at one coupling, and the
single-binary equilibria are not equilibria of the assembled 12-body object
(cycle-mean dock imbalance $\gtrsim 0.05$). It **does** carry nonzero payload
angular momentum ($L_z \neq 0$): the property Section 88 lacked, present here by
construction.

**(b, pump) Axial pump.** Unlike the Section 88 on-axis column (whose direct
$z$-torque was identically zero), the off-axis co-rotating payload carries a
**direct $z$-torque** and strongly reshapes the scaffold pump (payload
contribution larger in magnitude than the bare $+0.424$). The dressed object is
farther from a torque-free state than the bare scaffold, not closer.

**(b, flutter) Section 86 axis flutter — the headline gate.** A **12-site
extension of the gyroscopic tilt pencil** carries the payload rigidly with its
parent binary (rigid-dressed-layer reduction: 6 tilt DOF, but every per-layer
inertia $m_L$, spin $J_L$, pump $\Gamma_L$, and stiffness $K$ summed over the full
12-site inventory). With the payload **dropped** this pencil reproduces the base
`gyroscopicTiltAnalysisFull` growth rate **exactly**
($\operatorname{Re}\lambda = 0.19886$), certifying the evaluator. With the payload
docked, the per-layer spin $J_L$ grows by roughly $3$–$5\times$: the spin-carrying
payload **does enter the gyroscopic sector $G$** — the qualitative advance over
Section 88. **Yet the flutter is not dissolved; it is aggravated**
($\operatorname{Re}\lambda: 0.199 \to \gtrsim 0.4$). Entering $G$ is **necessary
but not sufficient**: the sign and structure of the added gyroscopic and pump
coupling from this minimal Lagrange-docked payload worsen the whirl.

**(c) Magnetic moment.** The circulating co-rotating charge sources a magnetic
moment $\mu_z = \tfrac12\sum q\,(\mathbf{r}\times\mathbf{v})_z \neq 0$ (the neutral
scaffold's $\pm$ pairs cancel) — the observable Section 88's spinless column
lacked. The **orbital** gyromagnetic ratio is $g_{\text{orb}} \approx 1$; reaching
$g \approx 2$ requires the spin structure, not orbital payload circulation alone,
which is a qualitative gap reported honestly.

**(d) EM/photon channel.** The $-1e$ payload opens a **monopole** (Coulomb /
photon) channel absent on the neutral core ($q_{\text{bare}} = 0$). The $L4/L5$
dock is not $\pm$-symmetric, so the payload also carries a small static electric
dipole and quadrupole; the leading channel is the monopole.

**Fallback.** Because no binary Lagrange point is stable, the packet also reports
the declared fallback: a symmetric co-rotating electrino ring at **matched total
payload angular momentum** $L_z$, which carries $J_{\text{pay}}$ by construction
with zero net dipole and can be fed to the same 12-site pencil.

## Honest verdict

The Lagrange-docked co-rotating payload **achieves the Section 88 requirement** —
it carries $J_{\text{pay}} \neq 0$, sources a magnetic moment, and **does enter the
gyroscopic sector $G$** — but it **does not dissolve** the Section 84–88 no-gos and
in this minimal realization **aggravates** them: no binary Lagrange point is
stable, the radial + tangential ledgers do not close at one coupling, the axial
pump grows, and the Section 86 flutter growth rate **increases**
($\operatorname{Re}\lambda: 0.199 \to \gtrsim 0.4$). The direct, honest answer to
the enabling question: **reaching the gyroscopic sector is necessary but not
sufficient to null the flutter**; a spin-carrying payload can enter $G$ and still
make the whirl worse. The next candidate is a payload whose gyroscopic
contribution enters $G$ with the **opposite sense** (counter-rotating or
sense-split layer), tuned to cancel rather than reinforce the bare gyroscopic
term — the natural continuation of the Section 86 interleaving-sense analysis.

## Assumptions and proof burden

- The Lagrange placement is an **ansatz**, not a solved self-consistent dock: the
  single-binary equilibria are located in the restricted two-body-plus-test
  problem, not in the assembled 12-body field, and are linearly unstable.
- Support/pump metrics are single-time ($T = 0$) rigid evaluations (the Section
  36/60 convention); the docking metric is cycle-averaged.
- The 12-site flutter pencil is a **rigid-dressed-layer** reduction (payload tilts
  with its parent binary): 6 tilt DOF, coarse cadence. Independent payload-tilt
  DOF and the full self-consistent re-diagonalization are deferred to the native
  run. The bare-drop validation reproduces the base instrument exactly.
- The magnetic-moment $g$ comparison is qualitative (architrinos carry no
  intrinsic mass; $g \approx 2$ is a separate spin-structure claim).
- No native release, no retained-branch claim, no acceptance.

## Intended corpus destination

If a sense-split or counter-rotating follow-on confirms that an oppositely-signed
gyroscopic payload can null the Section 86 flutter, promote the qualitative
result — *reaching the gyroscopic sector is necessary but not sufficient; the sign
of the payload's gyroscopic coupling decides dissolution vs aggravation* — into
[Electron](../../../../content/markdown/aaa/assemblies/fermions/electron.md) and the
Noether-braid angular-momentum treatment. Until then this stays priority material
at seed grade.

`Closure goal:` decide whether a **sense-split / counter-rotating** $6\epsilon_-$
payload — entering the gyroscopic sector $G$ with the sign opposite to the bare
term — can drive $\operatorname{Re}\lambda \to 0$, using the same 12-site pencil
with per-binary precession sense as the tuning knob.
