# Structured-Sea Shared-Absorber Instrument — Saturated Co-Orbital / Reorienting Sea Build Spec

Claim level: build spec / instrument handoff. This packet scopes the instrument
for the **last surviving route on the convergence frontier**: a single structured
sea that must simultaneously (1) supply the $\ge1/3$-pump ($\approx0.076$)
tangential rail-pump deficit at the rail for **S1/S2** (the shape-attractor /
tangential absorber) and (2) anchor the braid spin axis $\hat n\to\hat d$ with a
*settled* dynamical torque for the **axis-anchor coherence**. It extends the
runner only (spindle-braid-native-retained-history-confirmation-run.mjs (retired script: `scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs`)),
reusing the built `coDriftCage.reorient`/`orbit` dynamical-sea surfaces; the
central solver `AbsoluteHistoryRootRuntime.mjs` is untouched.

## Why this instrument (the convergence funnel)

Every **bare** and **internal** route for both obligations is now closed:

- Bare axis sector: closed in both frames — resting (§§61–66, every bare channel a
  pump; the native self-hit brake caps at $2/3$) and moving (§68, the drift
  orientation torque stiffens only the *global* axis, not the internal flutter).
- Bare / hinge tangential absorber: the nested-shell super-field inner binary
  cannot supply the middle deficit ([§69](fold-crossing-chart-spec.md#69-the-super-field-inner-binary-feasibility-resolution);
  cross-hit relay closed for the neutral braid, native self-hit caps at $2/3$).
- Internal deformation (§68 route (a)): closed at both the linear and the
  parametric level ([nonrigid-axis-internal-deformation-instrument-spec.md](nonrigid-axis-internal-deformation-instrument-spec.md);
  the breathing–flutter linear coupling is axisymmetry-forbidden, and no bounded
  breathing cycle absorbs the pump or damps the flutter — a bound already requires
  an external brake $\varrho>1$, i.e. the sea).

So the **structured sea is the sole surviving route for both obligations**, and
the whole frontier funnels onto one object. The linear orientational-dipole sea
is closed for the axis (§67: band-structured, starves the inner, circulatory-
dominated, destabilizes when scaled up); the surviving named routes are the
**saturated** orientational response (§67 route (i) — the nonlinearity that closed
the radial 6% class, §40), the **co-orbital cage** (§55), and the bulk-boundary
medium. This instrument tests the first two, together, as one shared absorber.

## The two obligations and the mechanism map (why one sea might do both — and might not)

The sea is the **angular-momentum bath and cap support, not the radial scaffold**
(sea-lane result). This is exactly why it is the right home for both obligations,
because both are angular-momentum statements, not radial-confinement ones:

- **(1) Tangential rail-pump deficit (S1/S2).** The middle's $+0.2274$ rail pump
  is *orbital* spin angular momentum injected each rotation. Absorbing it means
  exchanging orbital angular momentum with the sea — the **co-orbital** channel
  (cage members orbiting about $\hat d$ carry angular momentum away). The
  reorienting-dipole channel does *not* touch it: the dynamical-sea run measured
  the reorienting sea **axis-only** — at axial drift the coherent-expansion track
  $R_\perp(t)$ is identical to bare to three digits and the middle support stays
  starved $\approx0.00$ ([dynamical-sea-axis-absorber-instrument-spec.md](dynamical-sea-axis-absorber-instrument-spec.md)).
- **(2) Axis anchor $\hat n\to\hat d$.** Established gain-reachable but coherence-
  limited: the saturated **reorienting** dipole tracking $\hat n(t)$ anchors the
  axis ($66°\to38°$, to $10°$ at dipole-gain 2) via the reorientation velocity
  $\dot{\hat n}$ entering the branch factor — but it is transient, resonant, and
  strain-limited (cage coherence $F\to8.2$ at the strong anchor).

**The tension this instrument must resolve.** The two channels map to the two
dynamical knobs — **co-orbit → tangential**, **reorient → axis** — but they were
measured *antagonistic*: co-orbiting the ring reduces the shear yet **anti-anchors**
the axis ($66°\to89°$), and the frozen-cage lemma showed the anchoring torque and
the transverse shear are the same multipole. So the central question is not "does
the sea work" but **"can one sea run both knobs coherently, or are they forced to
split?"** The instrument is built to decide exactly that.

## What it builds (the saturated, coherent, dual-channel sea)

Three additions to the existing dynamical `coDriftCage` machinery, all carried
through the built `centerVelocity` / tangent-reconstruction surface (no native-ABI
change; all null at $u=0$ so every rest regression is exact):

1. **Saturated orientational response** (`coDriftCage.saturate = { enabled, p0sat }`).
   The reorientation response is capped at a saturation dipole $p_{0,\rm sat}$
   (the nonlinearity that closed the radial 6% class, §40), replacing the linear
   response §67 closed. The saturated response is what makes the time-averaged
   torque axisymmetric about $\hat d$ while the instantaneous anisotropy anchors.

2. **Co-orbital angular-momentum exchange, measured on the tangential channel**
   (reuse `coDriftCage.orbit`, but now book the middle **rail-pump absorbed
   fraction** and the $R_\perp(t)$ track, not only the axis/shear). This is the
   new measurement: does a co-orbiting sea, exchanging orbital angular momentum,
   absorb the $\ge1/3$-pump deficit the reorienting-only sea leaves untouched.

3. **Sea back-reaction / coherence** (`coDriftCage.backReaction = { enabled, stiffness }`).
   The gain sweep showed a settled anchor needs a *stiff, coherent* sea (the
   strong anchor co-peaks with strain $F\to8.2$). Include the cage members'
   response to each other (and to the braid), so the coherence row
   `coDriftCageCoherenceRow` reports a self-consistent $F$, not a strained
   free-response spike. A config that anchors only at $F\gg1$ is disqualified
   (it would disperse a real sea).

## The joint measurement (both channels, same config, same run)

At each sea config, on the native free-tilt release at $\kappa_{\rm eq}=0.28623$,
Row-7 V5 seed, oblique drift $\theta\in\{30°,90°\}$ and axial $\theta=0$ control:

- **S1/S2 channel:** the middle **rail-pump absorbed fraction** (impulse-resolved
  booking, the §66 converged surface) and the coherent-expansion track $R_\perp(t)$
  vs the bare $0.96\to2.37$. Target: absorbed fraction $\ge1/3$ (closing the
  deficit the bare $2/3$ brake leaves) and $R_\perp$ **stops expanding** (the
  S1/S2 witness).
- **Axis channel:** $\hat n\cdot\hat d$ over the release (target: settled anchor,
  not the transient $66°\to38°\to$rebound) and the drift-frame shear $\sigma(t)$.
- **Coherence:** the self-consistent cage $F$ (must stay $O(1)$, not the $8.2$
  strain spike).

## Touch points (runner only)

1. `DECLARED.coDriftCage.saturate` and `.backReaction` sub-objects (declared
   regulators; disabled by default; null at $u=0$).
2. `buildCoDriftCage` / `updateCageLiveOrientation`: apply the saturation cap and
   the back-reaction response when enabled; frozen/linear paths unchanged.
3. The release readback: book the **middle rail-pump absorbed fraction** and
   $R_\perp(t)$ **together with** the axis/shear/coherence rows already produced
   by the dynamical-sea run (the joint-channel report is the new artifact).
4. CLI: `--saturate`, `--sat-p0=<num>`, `--back-reaction`, `--sea-stiffness=<num>`,
   composed with the existing `--co-drift-cage --reorient --co-orbit --dipole-gain`.
5. Fixture part: saturate/back-reaction disabled ⇒ exact dynamical-sea regression;
   null at $u=0$; keep the suite green.

## Run matrix

Row-7 V5, $\kappa_{\rm eq}=0.28623$, $dt=0.001$, 0.5 rot:

- `--co-drift-cage --co-orbit --orbit-rate=1` at axial $\theta=0$: the **isolated
  tangential test** — does a co-orbiting sea absorb the rail pump ($R_\perp$ vs
  bare, absorbed fraction) where the reorienting-only sea did not.
- `--co-drift-cage --reorient --saturate` at $\theta=90°$: the **isolated axis
  test** with saturation + back-reaction (settled anchor at $O(1)$ coherence).
- `--co-drift-cage --reorient --co-orbit --saturate --back-reaction` at
  $\theta=30°,90°$: the **shared-absorber test** — both knobs, both channels,
  same config; read whether one sea delivers both or the co-orbit/reorient
  antagonism forces a split.
- optional spatial separation: co-orbital equatorial ring (tangential) + polar
  reorienting dipoles (axis), to test a *separated* dual sea if the co-located one
  is antagonistic.

## Decision tree

- **One sea supplies BOTH** ($\ge1/3$-pump absorbed, $R_\perp$ flat, settled
  anchor, $O(1)$ coherence) ⇒ the shared absorber closes S1/S2 **and** the axis
  anchor together; the large-drift Lorentz ruler, R3 (posable at the stabilized
  fixed point), and the mass-map $A_0$ release all open at once. Names the first
  native candidate row since Row 7.
- **Sea absorbs the tangential pump but the axis won't settle (or vice versa), or
  co-orbit and reorient are antagonistic** ⇒ the obligations **split**: report
  which channel each sea structure serves and test the *separated* dual sea
  (equatorial co-orbital ring + polar reorienting dipoles). S1/S2 and the axis
  then close on two sea sub-structures rather than one.
- **Neither channel closes on any saturated/co-orbital/coherent config** ⇒ the
  saturated co-orbital sea route closes; the last remaining structured-environment
  channel is the **bulk-boundary medium**, and the frontier reduces to that single
  object.

## Claim ladder

- The joint-channel measurement is **native-grade** (the impulse-resolved rail-pump
  booking and the $R_\perp$ track are the §66/§60 converged surfaces; the axis /
  shear / coherence rows are the dynamical-sea surfaces).
- The saturation and back-reaction responses are **declared regulators** with
  their own null/regression witnesses; the sea is a modeled structured environment,
  not derived from a self-consistent Noether-sea constitutive law (that derivation
  is the separate constitutive-response lane).
- Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`;
  nothing here authorizes a release or acceptance; no new validator or schema
  beyond the fixture rows. Central solver untouched.

## Ownership

Native-run / sea lane; extends the confirmation-run runner alongside the
dynamical-sea build. It is the executable form of the two-obligation shared-absorber
question the §66 and §68 verdicts both hand off, and the last route on the
convergence frontier before the bulk-boundary medium.
