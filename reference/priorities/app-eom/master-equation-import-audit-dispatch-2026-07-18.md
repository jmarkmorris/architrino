# Master-Equation Import-Audit Dispatch Packet (2026-07-18)

Operator-requested dispatch packet from the 2026-07-18 import-audit thread. Source audit: `reference/priorities/master-equation-closure/brainstorming.md`, "Import Audit of the Master-Equation Main Path (2026-07-18)".

All threads dispatched from this packet are **analysis-only** and write-restricted to `reference/priorities/app-eom/`. No canon edits, no code edits, no shared-ledger edits.

## Falsification Framework

Every variant of the master equation is tested on three independent axes. A variant is never scored against canon-derived numbers (circular); it is scored against these:

1. **Internal closure.** The variant's energy, momentum, and angular-momentum wake ledger must close on retained records under the same action convention. A variant that leaks conserved charges with no compensating wake term is falsified internally.
2. **Anchored recovery.** The variant must not break recoveries already anchored to tested physics (static inverse-square limit; eventually Darwin-order magnetism, Lorentz behavior). Failing an anchor its competitor passes is falsification.
3. **Discriminating regime.** A regime where the variants predict different outcomes on identical initial data, run under evidence-independence rules (independent oracle or closed form on at least one side).

A "model swept over its own knobs" is evidence about the model only; variants enter testing with a derived or declared form, never a fitted parameter.

## Prioritized Investigation List

1. **Darwin-order magnetism expansion (analytic).** Expand the branch law to $O(v^2/c_f^2)$, sum over a neutral drifting population, and compare the receiver-velocity-linear coefficient to the Darwin interaction. Decisive on the sampling-rule postulate; costs no solver time. Falsified variants: any whose coefficient misses the anchored magnetism scaling.
2. **Sampling-rule lemma (radial vs. vector crossing; density vs. gradient coupling).** State the receiver coupling rule as a lemma family and derive per-hit discriminators. The vector-crossing variant predicts a per-hit transverse component in a two-body encounter; canon predicts exactly zero. Falsifier: internal-closure failure or the Darwin/anchor axis from item 1.
3. **Signed vs. unsigned receiver-normal convention ($W=|m|$ vs. signed $m$).** Discriminating regime: retained branch records with $D_T<0$ (super-field-speed receiver crossing). Arbitration: which convention closes the wake conservation ledger on the same record.
4. **Action-residual closure ($\mathbf C^{(\eta)}\to 0$).** The route that turns the second-order acceleration-first form from axiom into theorem. Falsifier for canon's form: a proven non-vanishing residual with no recoil-inclusive ledger closure.
5. **Parallel-stream simulation spec (native numerical magnetism test).** Two drifting bare-architrino streams (no bound assembly required), instrumented for time-averaged transverse momentum transfer. Independent evidence paired with item 1 (analytic vs. numerical — evidence independence by construction). Cost is empirical: profile before committing scale.
6. **Speed-attractor derivation.** The measured speed-attractor pin is the only simulation-born hint of first-order dynamics. If the canonical second-order law derives the attractor, the first-order variant is unmotivated (Occam falsification); if it provably cannot, the variant gains standing.
7. **Wake vector-cargo variant.** Shells carry the emitter's velocity vector as frozen cargo; receiver couples to it. Reduces to canon in the static limit by construction. Discriminators: modified two-body equilibria; whether enriched kernel opens force balance where the canonical photon search returned zero. Falsifiers: internal closure, anchored statics.
8. **$c_{\mathrm{eff}}/c_f$ implications ledger.** If $c_f \gg c_{\mathrm{eff}}$: magnetism at drift scale $v/c_f$ is far too weak, forcing emergent EM and Lorentz structure onto internal assembly circulation at $c_f$ scale; the ratio becomes a derivable dimensionless target for sea/photon closure.
9. **Speculative variant ledger (nonlinear superposition, discrete emission cadence, physical $\eta$).** Capture with claim levels and discriminating regimes; no knob sweeps. Superposition testing routes through the constitutive-sea program (derived form only); cadence and physical $\eta$ are constrained by continuum-tested regimes.

## Codex Prompts

Each prompt inherits the meta wrapper in `reference/op/codex-goal-seeking-prompt-template.md`. Common constraint block, repeated verbatim in every prompt below.

### P1 — Darwin-Order Expansion

```
Closure goal: Determine analytically whether the canonical master-equation
branch law, expanded to second order in v/c_f and summed over a neutral
drifting source population, reproduces the Darwin-order interaction between
moving charges, and report the coefficient comparison as the decisive test
of the receiver-sampling postulate.

Context: The canonical per-hit law is A = kappa * q_i q_j * |D_T/D_s| *
rhat / r^2 with D_s = c_f - rhat.V_src(T_em), D_T = c_f - rhat.V_rec(T),
defined in content/markdown/aaa/dynamics/master-equation.md. Magnetism is
barred as an architrino-level primitive and must emerge from delayed
central hits (AGENTS.md Theory Layer Discipline; acceleration-not-force
directive applies).

Task: (1) Expand the delayed branch law consistently to O(v^2/c_f^2),
keeping delay, root transport, and the receiver-normal factor
self-consistent (do not import Lienard-Wiechert intermediate results;
derive from the AAA kernel). (2) Sum over a neutral line population with
polarity-dependent drift (a current). (3) Extract the receiver-velocity-
independent coefficient (effective E) and receiver-velocity-linear
coefficient (effective B candidate). (4) Compare against the Darwin-order
benchmark and state match or mismatch with the exact coefficient ratio.
(5) Grade every claim (derived/measured/inferred/guessed) and name the
falsifier: what coefficient value would refute the central sampling rule.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-darwin-order-branch-expansion.md,
containing the full analysis. Modify no other file anywhere in the
repository - no canon, no code, no shared ledgers (priorities.md,
work-log.md), no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file with derivation, coefficient table,
match/mismatch verdict, claim grades, and named falsifiers.
```

### P2 — Sampling-Rule Lemma and Variant Discriminators

```
Closure goal: State the receiver sampling rule of the master equation as
an explicit lemma family (radial-projection coupling vs. full crossing-
velocity coupling; surface-density vs. density-gradient coupling), derive
the per-hit and two-body discriminators between the family members, and
specify how each member would be falsified.

Context: The delta-collapse Jacobian forces the D_s denominator; the D_T
numerator and its radial-projection form are postulated
(content/markdown/aaa/dynamics/master-equation.md, receiver-normal branch
strength sections; import audit in reference/priorities/
master-equation-closure/brainstorming.md 2026-07-18). Acceleration-first
language only.

Task: (1) Write each candidate coupling rule precisely at the per-hit
level. (2) Prove which rules are excluded or forced by the delta-collapse
mathematics and which are free choices. (3) Derive the sharpest
discriminating observable for each pair (e.g., per-hit transverse
component in a two-architrino encounter with transverse relative motion:
zero for canon, nonzero for vector coupling). (4) For each member state
the three-axis falsification: internal ledger closure, anchored statics,
discriminating regime. (5) Rank the members by current evidence.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-sampling-rule-lemma-and-variants.md.
Modify no other file anywhere in the repository - no canon, no code, no
shared ledgers, no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file with the lemma family, forced-vs-chosen
proof, discriminator table, and per-member falsifiers with claim grades.
```

### P3 — Signed vs. Unsigned Receiver-Normal Convention

```
Closure goal: Adjudicate the signed-orientation (m = D_T/D_s) versus
unsigned-magnitude (W = |m|) convention in the master-equation branch
strength by identifying the regimes where they differ and specifying the
conservation-ledger arbitration test.

Context: The canon keeps signed m for root-transport bookkeeping but uses
W = |m| in the acceleration magnitude (content/markdown/aaa/dynamics/
master-equation.md). The conventions diverge exactly where D_T < 0
(super-field-speed receiver crossing along the line of action). Import
audit: reference/priorities/master-equation-closure/brainstorming.md
(2026-07-18).

Task: (1) Characterize the D_T < 0 stratum: which geometries reach it
(self-hit charts, close binaries, super-field-speed histories) and cite
retained-record classes in the repo where it occurs or could be
constructed. (2) Derive what each convention predicts for the acceleration
direction across a D_T sign change and whether the crossing is continuous.
(3) Specify the arbitration: on one retained super-field-speed branch
record, which convention closes the energy/momentum/angular-momentum wake
ledger under the same action convention. State this as a runnable test
spec (inputs, instrument, pass/fail) without running anything. (4) Grade
claims and state which observation would falsify each convention.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-signed-receiver-normal-convention.md.
Modify no other file anywhere in the repository - no canon, no code, no
shared ledgers, no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file with stratum characterization,
divergence derivation, arbitration test spec, claim grades, falsifiers.
```

### P4 — Action-Residual Closure for the Second-Order Form

```
Closure goal: Advance the scale-only action program by determining, for at
least one certified branch-chart class, whether the residual C^(eta)
vanishes, cancels, or must close as a recoil-inclusive wake-history term -
the result that decides whether the acceleration-first second-order form
is derived or remains an axiom.

Context: content/markdown/aaa/dynamics/master-equation.md (action residual
and exact nonlocal Lagrangian sections) states the promotion condition:
the scale-only action derives the canonical branch law only when the
integrated residual vanishes with the same branch floors and boundary
convention. Import audit flags the second-order form as the retained
Newtonian structure (reference/priorities/master-equation-closure/
brainstorming.md 2026-07-18).

Task: (1) Restate the residual condition precisely for one tractable
branch-chart class (recommend: principal circular partner branch, whose
root certificate is derived in content/markdown/aaa/dynamics/
binary-dynamics.md). (2) Attempt the residual evaluation analytically on
that class. (3) If it vanishes: state the derivation chain that follows.
If it does not: state the recoil-inclusive ledger term it requires and
what that means for the second-order postulate. (4) Identify the smallest
next lemma either way. Grade all claims; no numerical runs.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-action-residual-second-order.md.
Modify no other file anywhere in the repository - no canon, no code, no
shared ledgers, no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file with the restated condition, the
evaluation attempt, the verdict or blocking obstruction, and the next
lemma, with claim grades.
```

### P5 — Parallel-Stream Simulation Spec

```
Closure goal: Specify, without running or building anything, the native
EOM simulation that tests emergent magnetism: two drifting bare-architrino
streams instrumented for time-averaged transverse momentum transfer,
compared against the parallel-current benchmark scaling.

Context: No stable charged assembly is certified, so bare architrino
streams stand in for currents; they evolve natively under the unmodified
canonical law (no prescribed orbits - see the 2026-07-12 evaluator audit
lesson). The analytic counterpart is the Darwin-order expansion (P1);
together they form an evidence-independent pair. Wall cost scales
measured N^1.97; cost claims are empirical.

Task: (1) Define stream configurations: polarity layout, linear density,
drift speed range (deep sub-field-speed), separation, prehistory family
(straight, endpoint-matched), boundary/termination handling for finite
streams. (2) Define the instrument: time-averaged transverse momentum
transfer per unit stream length, with its error budget sourced from the
certified interval outputs. (3) Define pass/fail: expected scaling with
drift speeds and separation for the magnetism analogue, and what measured
outcome would falsify the central sampling rule vs. support it.
(4) Estimate cost drivers qualitatively and name what must be profiled
before scale commitment - no cost numbers without profiling. (5) State
explicitly which existing EOM contracts (evolution contract v0, record
schema) the spec consumes; propose no engine changes.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-parallel-stream-simulation-spec.md.
Modify no other file anywhere in the repository - no canon, no code, no
shared ledgers, no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file containing the full runnable spec
(configurations, instrument, pass/fail, profiling prerequisites), claim
grades, and named falsifiers.
```

### P6 — Speed-Attractor Derivation

```
Closure goal: Determine whether the canonical second-order master equation
derives the measured speed-attractor pin, thereby deciding whether the
first-order (velocity-targeting) variant law has any standing.

Context: Native runs measured a speed attractor (reference/priorities
records of the 2026-07-09 native confirmation run; stay off the c_f pin in
seeds per the eom-attractor-search workstream). If canon derives the
attractor from self-hit dynamics, a first-order fundamental law is
unmotivated; if canon provably cannot, the variant gains standing. Import
audit: reference/priorities/master-equation-closure/brainstorming.md
(2026-07-18).

Task: (1) Collect what the repo actually measured about the attractor
(instruments, records, claim grades) - distinguish measured from inferred.
(2) Attempt an analytic mechanism from the canonical law: self-hit branch
structure near field speed, sign of the net along-track acceleration
above and below c_f. (3) State the verdict as one of: derived, plausible-
with-named-gap, or not derivable (with the obstruction). (4) Specify the
sharpest discriminating test between second-order canon and a first-order
variant if the verdict is not "derived". No solver runs.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-speed-attractor-derivation.md.
Modify no other file anywhere in the repository - no canon, no code, no
shared ledgers, no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file with the evidence inventory, mechanism
attempt, verdict, and discriminating test, with claim grades.
```

### P7 — Wake Vector-Cargo Variant

```
Closure goal: Formalize the wake vector-cargo variant - causal shells
carrying the emitter's velocity at emission as frozen cargo that the
receiver couples to - and derive its discriminators and falsifiers against
the canonical scalar-density law.

Context: The canonical shell carries only scalar density; emitter velocity
enters only through shell spacing (D_s). The vector-cargo variant is the
AAA-native analogue of the structure that makes electrodynamics' velocity
field work, flagged in the 2026-07-18 import audit (reference/priorities/
master-equation-closure/brainstorming.md). It must be formalized natively;
do not import Lienard-Wiechert forms as premises.

Task: (1) Write the variant per-hit law precisely: what vector the shell
carries, how the receiver couples, and confirm reduction to canon in the
static limit. (2) Check internal closure: does the variant admit the same
delta-collapse structure and a closing conservation ledger, or does it
require new wake bookkeeping. (3) Derive discriminators: two-body
equilibrium shifts, and whether the enriched kernel qualitatively changes
the binding landscape where the canonical photon search returned zero
force balance (analysis only - no search reruns). (4) Three-axis
falsification statement for the variant and for canon relative to it.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-wake-vector-cargo-variant.md.
Modify no other file anywhere in the repository - no canon, no code, no
shared ledgers, no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file with the formalized variant law,
closure check, discriminator derivations, and falsifiers, with claim
grades.
```

### P8 — c_eff/c_f Ratio Implications

```
Closure goal: Produce the implications ledger for the hypothesis
c_f >> c_eff: what it forces onto emergent electromagnetism, Lorentz
recovery, and assembly internal structure, and what would measure or
bound the ratio.

Context: The master equation contains only c_f; c_eff (observed light
speed) is an assembly-level property of photon propagation through the
sea. If c_f >> c_eff, drift-scale delay effects scale as v/c_f and are
too weak to be observed magnetism, forcing emergent EM and the Lorentz
factor onto internal assembly circulation at c_f scale, with c_eff as the
assembly limiting speed. Thread source: 2026-07-18 import-audit Q&A.

Task: (1) Derive the scaling argument precisely: magnetism analogue
strength vs. v/c_f and v/c_eff, and the contradiction with observed
scaling if carried at drift scale. (2) State what the hypothesis forces:
which recovery burdens move to internal-circulation carriers, what the
divergence at v -> c_eff must be (assembly effect, never substrate).
(3) Identify existing repo anchors that constrain the ratio (c_f and
d_0 = R_MCB anchors; Planck-emergent chain) and state what additional
derivation would fix c_eff/c_f. (4) List falsifiable consequences of
c_f >> c_eff vs. c_f = c_eff. Grade all claims.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-cf-ceff-ratio-implications.md.
Modify no other file anywhere in the repository - no canon, no code, no
shared ledgers, no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file with the scaling derivation, forced-
consequence ledger, ratio-fixing targets, and falsifiable consequences,
with claim grades.
```

### P9 — Speculative Variant Ledger

```
Closure goal: Capture the remaining master-equation variants - nonlinear
superposition, discrete emission cadence, and physical (nonzero) eta -
as a claim-graded ledger with discriminating regimes and falsifiers, so
they are preserved without becoming unowned work orders.

Context: 2026-07-18 import audit (reference/priorities/
master-equation-closure/brainstorming.md). Evidence discipline: a model
swept over its own knobs is evidence about the model; each variant enters
only with a derived or declared form. Superposition testing routes through
the constitutive-sea program; cadence and physical eta are constrained by
continuum-tested regimes.

Task: For each of the three variants: (1) state the variant precisely and
what canonical postulate it replaces; (2) name its discriminating regime
and why current instruments can or cannot reach it; (3) state its
three-axis falsification; (4) state the promotion condition - what result
elsewhere in the program would elevate it from speculation to an owned
proof target; (5) assign claim level speculation unless a derivation
exists. Explicitly mark that no knob-sweep numerical work is authorized
from this ledger.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-speculative-variant-ledger.md.
Modify no other file anywhere in the repository - no canon, no code, no
shared ledgers, no other priorities areas. Read access is unrestricted.
No git commands.

Expected output: the analysis file with the three variant entries, each
with discriminating regime, falsifiers, and promotion condition.
```

## Parallelism Map

All nine prompts are read-only outside their own single new output file, and the nine output filenames are distinct, so **all nine can run in parallel** with no write conflicts. None edits shared ledgers.

Recommended waves by decision value, if capacity is limited:

- **Wave 1 (decisive, analytic, cheap):** P1, P2, P3, P4 — these adjudicate the audit's core postulates.
- **Wave 2 (specs and ledgers):** P5, P6, P7, P8, P9. P5 pairs with P1 as its evidence-independent numerical twin and reads better after P1's result exists, but nothing blocks it technically.

Integration after completion: operator reviews the nine analysis files; promotion of any conclusion into canon or into other priorities areas is a separate, operator-approved step (deliberately outside these threads' write scope).

## P1 Adjudication (2026-07-18)

P1 (`analysis-darwin-order-branch-expansion.md`) returned a **derived, exact negative**: the canonical law's current coefficient on a neutral drifting infinite line is $C_B=0$ against the Darwin benchmark $1$. Mechanism: the delta-collapse denominator supplies exactly one power of $1/D_s$, and the common-slice source-label transport supplies exactly one power of $D_s/c_f$; they cancel, erasing all source-drift information from the bulk sum. Independently spot-checked (root quadratic, label transport $d\xi/dy=D_s/c_f$, exact cancellation) and endorsed. Scope: falsifies the central sampling rule *as a standalone origin* of Darwin-order magnetism; assembly-level channels remain open and now carry the full recovery burden.

Consequences for the remaining threads:

- **P7 promoted to decisive.** The vector-cargo variant is the most direct repair candidate; its survival condition is now concrete — current coefficient $1$ after the same neutral-line sum with the same measure transport.
- **P2:** the population-sum survival test (does the family member's source-drift dependence survive the $d\xi\to dy$ transport) is the primary discriminator; per-hit structure is secondary.
- **P5 role change:** the canonical prediction is a known null, so the parallel-stream run becomes independent verification of P1 plus a reusable variant-discrimination instrument.
- **Structural lead for repairs:** the one-power balance is the pivot. Electrodynamics' velocity field carries an effective cubed source-normal factor, which is why its current response survives. Any surviving variant must break the one-power balance with a *derived* mechanism (vector cargo, vector sampling numerator, or extra source-normal weighting), not a fitted one.

Known defect in the P1 file: TeX typo `\left{` (line ~190) breaks KaTeX; fix on next touch.

## P2 Adjudication (2026-07-18)

P2 (`analysis-sampling-rule-lemma-and-variants.md`) delivered the forced-vs-chosen decomposition and the four-member family SR/SV/GR/GV with normalization-free discriminators (transverse control; static slope $2$ vs $3$) and per-member three-axis falsifiers. Endorsed; refines the import audit: $D_T$ is forced as scalar crossing rate and signed root transport — only its use as acceleration *weight* is chosen. Code inspection confirms SR is the implemented member.

**Cross-P1 adjudication finding (derived):** every P2 family member has the form $K(r)f(D_T,\mathbf V_\perp^{\mathrm{recv}})/|D_s|$ — one $D_s$ power below, no source-velocity cargo above. Under P1's exact measure transport ($d\xi = dy\,D_s/c_f$, with $r(y),\hat{\mathbf r}(y)$ drift-independent in emission coordinates), the drift cancels for **all four members**: $C_B=0$ across the entire family. SV/GV's transverse terms are receiver-velocity-driven and cannot carry a source current. P2's two axes are orthogonal to the current-response axis.

Consequence: the only per-hit repairs that can yield $C_B\ne0$ are (i) source-velocity numerator cargo — **P7's vector-cargo variant, now the sole live per-hit repair candidate** — or (ii) a derived change of the $D_s$ power. Failing both, magnetism recovery is exclusively an assembly/sea-channel burden. P5's harness should adopt P2's Controls A/B/C as instrument rows alongside the parallel-stream current test.

## P3 Adjudication (2026-07-18)

P3 (`analysis-signed-receiver-normal-convention.md`) endorsed. Key derived results: the discriminating stratum is $m<0$ (equivalent to $D_T<0$ only on a certified $D_s>0$ chart; conventions agree when both normals are negative); the conventions differ by *direction*, not magnitude — the signed row flips attraction/repulsion relative to the historical emission point, the unsigned row keeps the polarity ray with a modulus cusp; both vanish continuously at $D_T=0$. Geometry corrections adopted: uniform circular charts give $m=+1$ exactly (never discriminating, even super-field-speed); closeness never sets the sign; the cleanest control is a stationary source with a receiver receding super-field-speed along the line of action ($D_s=c_f$). Repo state: no existing record adjudicates; the $D_T<0<D_s$ accelerating-circular case is display-only. The frozen-action dual-replay Noether-ledger arbitration spec is accepted as the decisive instrument design.

**Cross-link to P6 (inferred, high value):** self-hit dynamics live exactly on super-field-speed history where the conventions diverge, and signed $m<0$ turns like-polarity self-hits attractive. If the speed-attractor mechanism differs between conventions, the already-measured attractor pin arbitrates the sign convention with no new runs. P6 must evaluate its mechanism under both conventions and report whether the attractor is convention-sensitive.

## P4 Adjudication (2026-07-18)

P4 (`analysis-action-residual-second-order.md`) endorsed; key identity and orthogonality argument spot-checked. **Derived negative:** the pure scalar $1/r$ causal action fails the scale-only residual test on the principal circular partner chart — the transposed source contribution cancels the tangential residual component but leaves a strictly nonzero radial coefficient on each worldline; antipodal residuals cancel only globally, which independent compact variations do not permit as a derivation. The acceleration-first second-order Master EOM therefore remains a postulate on this chart, with two exits: an invariant counterterm, or a recoil-inclusive wake ledger (closure open). P4's *principal-circle recoil-pullback lemma* — tested on branch-preserving perturbations, since the exact circle's symmetry zeros all three global recoil projections — is adopted as the successor target (P10 below).

## Next Dispatch Set (post-P1–P4)

All members write one distinct new file in `reference/priorities/app-eom/` and are parallel-safe. Priority order: P7A, P6A, P10, P5A, then P8/P9 as capacity allows. Execution-tier note: actually *running* P3's dual-replay arbitration or P5's streams requires solver execution outside the analysis-only scope of these threads — that is a separate operator decision after the specs land.

### P7A — Vector-Cargo Variant (amended)

```
Closure goal: Formalize the wake vector-cargo variant - causal shells carrying
the emitter's velocity at emission as frozen cargo that the receiver couples
to - and determine whether it is the per-hit repair for the magnetism deficit:
compute its current coefficient under the exact neutral-line measure transport,
with survival condition C_B = 1.

Context (updated by adjudication): P1 (analysis-darwin-order-branch-
expansion.md) derived C_B = 0 for the canonical law: the delta-collapse 1/D_s
is exactly eaten by the common-slice label transport d(xi)/dy = D_s/c_f, and
r(y), rhat(y) are drift-independent in emission coordinates. P2 (analysis-
sampling-rule-lemma-and-variants.md) plus dispatch-packet adjudication showed
every member of the SR/SV/GR/GV family shares this null: one D_s power below,
no source-velocity cargo above. A variant survives only if source-velocity
dependence sits in the numerator (or the D_s power changes by a derived
mechanism). Vector cargo is now the sole live per-hit repair candidate.

Task: (1) Write the variant per-hit law precisely: what vector the shell
carries (candidate: V_j(T_em), or its decomposition), how the receiver couples,
and confirm exact reduction to canon in the static limit. (2) Apply P1's exact
measure transport to the neutral drifting infinite line and compute the
variant's C_B; state whether the survival condition C_B = 1 fixes the cargo
coupling uniquely or leaves a family. (3) Check the P2 discriminators: unlike
SV (receiver-velocity transverse response), vector cargo predicts a transverse
response driven by SOURCE velocity - specify the mirrored Control A (moving
source, stationary receiver) that separates them. (4) Internal closure: the
cargo term adds momentum/angular-momentum ledger burden; state the required
wake rows. (5) Three-axis falsification for the variant and for canon relative
to it. Note P4's result: any action-level derivation of the cargo term
inherits the open residual/recoil structure.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-wake-vector-cargo-variant.md.
Modify no other file anywhere in the repository - no canon, no code, no shared
ledgers, no other priorities areas. Read access is unrestricted. No git
commands.

Expected output: the analysis file with the formalized law, the C_B
computation under the exact transport, coupling-uniqueness statement,
discriminators, ledger burden, and falsifiers, all claim-graded.
```

### P6A — Speed-Attractor Derivation (amended)

```
Closure goal: Determine whether the canonical second-order master equation
derives the measured speed-attractor pin, evaluating the self-hit mechanism
under BOTH receiver-normal conventions (unsigned W = |m| and signed m), and
report whether the attractor is convention-sensitive - if it is, the existing
measurement may arbitrate the sign convention at zero run cost.

Context (updated by adjudication): P3 (analysis-signed-receiver-normal-
convention.md) derived that the conventions differ exactly on m < 0 rows,
where the signed row flips attraction/repulsion relative to the historical
emission point - and self-hit dynamics live on super-field-speed history where
such rows can occur (though uniform circular self-charts give m = +1 exactly
and never discriminate; check which m-sign strata the attractor transient
actually visits). Native runs measured a speed attractor (2026-07-09 native
confirmation run; eom-attractor-search workstream: stay off the c_f pin in
seeds).

Task: (1) Inventory what the repo measured about the attractor (instruments,
records, claim grades); distinguish measured from inferred. (2) Attempt an
analytic mechanism from the canonical law: self-hit branch structure near
field speed, sign of net along-track acceleration above and below c_f - under
the unsigned convention first, then repeat under the signed convention.
(3) State whether the mechanism and predicted attractor location/stability
differ between conventions; if yes, state precisely which existing or cheap
observation discriminates. (4) Verdict per convention: derived / plausible-
with-named-gap / not derivable. (5) If canon (either convention) derives the
attractor, state the consequence for the first-order variant law (Occam
falsification). No solver runs.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-speed-attractor-derivation.md.
Modify no other file anywhere in the repository - no canon, no code, no shared
ledgers, no other priorities areas. Read access is unrestricted. No git
commands.

Expected output: the analysis file with evidence inventory, dual-convention
mechanism analysis, convention-sensitivity verdict, and discriminating
observation, all claim-graded.
```

### P10 — Principal-Circle Recoil-Pullback Lemma (new)

```
Closure goal: Attempt P4's smallest next lemma: on a branch-preserving
neighborhood of the principal circular partner chart, determine whether the
pure scalar action's nonzero residual admits wake-history increments
(E, P, J)_wake whose cut derivatives equal the three negative residual
projections - deciding whether the residual is legitimate recoil carried by
the same action or an unclosed alteration of the acceleration law.

Context: P4 (analysis-action-residual-second-order.md) derived the strictly
nonzero per-worldline residual R_C on the principal circular chart: the
transposed source term cancels the tangential component, leaving a radial
coefficient kappa|q1q2| omega beta cos(xi) / (4 c_f R J_p^3). The exact
antipodal circle zeros all three GLOBAL recoil projections by symmetry, so
the lemma must be tested on branch-preserving perturbations (e.g., slightly
elliptical or unequal-radius deformations that keep the single-root
certificate, positive J and r floors, and the inactive-gap condition).

Task: (1) Construct the perturbed chart family and verify branch preservation
to first order. (2) Compute the perturbed residual projections
sum_i V_i . R_C,i, sum_i R_C,i, sum_i X_i x R_C,i to leading order in the
deformation. (3) Attempt an explicit wake-history functional from the same
regularized action whose cut derivatives supply the negatives of those
projections; state the obstruction precisely if none exists. (4) Verdict:
pass (recoil-inclusive second-order action law supported on this neighborhood)
or fail (pure scalar scaffold supports neither the canonical nor a conserved
recoil-inclusive law; the second-order Master EOM remains an independent
postulate pending a different invariant action). (5) Name the smallest
follow-on lemma either way. Claim-grade everything; no numerical runs.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-recoil-pullback-lemma.md.
Modify no other file anywhere in the repository - no canon, no code, no shared
ledgers, no other priorities areas. Read access is unrestricted. No git
commands.

Expected output: the analysis file with the perturbed chart construction,
projection computations, wake-functional attempt or obstruction, verdict, and
follow-on lemma, all claim-graded.
```

### P5A — Parallel-Stream Simulation Spec (amended)

```
Closure goal: Specify, without running or building anything, the native EOM
simulation that independently verifies the derived null C_B = 0 for the
canonical law on drifting-stream currents, and doubles as the reusable
instrument for discriminating repair variants (vector cargo) and the P2
control family.

Context (updated by adjudication): P1 derived C_B = 0 exactly for the
canonical law; the numerical run's role is now independent verification of
that null (analytic vs. numerical - evidence independence by construction)
plus a variant-discrimination instrument, not exploration. P2's Controls A
(transverse receiver motion), B (static two-radius slope), and C (transverse
velocity finite difference) should be adopted as additional instrument rows;
P7A adds a mirrored Control A (moving source, stationary receiver) for
source-velocity cargo. No stable charged assembly exists, so currents are
bare architrino streams evolved natively under the unmodified law.

Task: (1) Stream configurations: polarity layout, linear density, drift
speeds (deep sub-field-speed), separation, straight endpoint-matched
prehistory, finite-length end-effect handling (P1 notes end effects are the
main contamination of the infinite-line null - bound them or cancel them
symmetrically). (2) Instrument: time-averaged transverse momentum transfer
per unit stream length with certified error budget; expected result zero
within budget for the canonical law - state the width that makes the null
meaningful. (3) Control A/B/C rows and the mirrored Control A as separate
cheap instrument cases. (4) Pass/fail: what nonzero measurement would mean
(P1 falsified or implementation drift - distinguish via the P2 code-inspection
anchor), and what variant signatures would look like if the kernel were later
swapped. (5) Qualitative cost drivers and profiling prerequisites; no cost
numbers without profiling. (6) Consume existing EOM contracts only; no engine
changes.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-parallel-stream-simulation-spec.md.
Modify no other file anywhere in the repository - no canon, no code, no shared
ledgers, no other priorities areas. Read access is unrestricted. No git
commands.

Expected output: the analysis file with configurations, instruments, null
criteria, variant signatures, and profiling prerequisites, all claim-graded.
```

## P7A Adjudication (2026-07-18)

P7A (`analysis-wake-vector-cargo-variant.md`) endorsed; pivotal integrals and the $\mathcal R_{\hat r}$ line-cancellation independently checked. Results: **bare additive velocity cargo is not the repair** (receiver-independent forbidden line response, $C_B$ still $0$); the **bilinear receiver-cargo channel** $\mathcal K=\mathbf U(\hat{\mathbf r}\cdot\mathbf V)-\hat{\mathbf r}(\mathbf U\cdot\mathbf V)$ gives $C_B=\lambda$ exactly, so $\lambda=1$ survives; the anchor selects a **family, not a law** ($\alpha$ free; $d$ invisible on the line; $a,f$ freedom in the general ansatz). Adjudication additions (derived): $\mathcal K=\mathbf V\times(\mathbf U\times\hat{\mathbf r})$ — the survival condition natively reproduces the observer-level magnetic tensor shape; and $\mathbf V\cdot\mathcal K=0$ means the bilinear-only member $(\alpha=0,\lambda=1)$ closes its energy wake row identically, leaving only momentum and angular-momentum rows open — **the leanest live candidate**. Unchecked by adjudicator: the $f/3$ coefficients in the general-ansatz constraints. Global $D_T\le0$ continuation deliberately unfixed — couples to P3's arbitration.

Theory fork now explicit: **Path A** — enrich the per-hit law with bilinear cargo (magnetism at per-hit level; new P/J wake burdens; inherits P4's residual obligation). **Path B** — minimal canon; P1 then forbids magnetism from any free-architrino bulk, so recovery falls entirely on bound-structure/sea response (constitutive-sea program).

## P6A Adjudication (2026-07-18)

P6A (`analysis-speed-attractor-derivation.md`) endorsed; the short-delay self-root asymptotic independently checked ($g/\Delta=\delta-\tfrac12\alpha\Delta$, root $\Delta_*=2\delta/\alpha$, $D_T\simeq-\delta$, $D_s\simeq+\delta$, $m\simeq-1$, $\mu\simeq1$). Results:

- **Convention-sensitive mechanism, derived branchwise:** on the just-super-field-speed accelerating short-delay self-root, signed $m$ *brakes* the excursion with restoring slope $\partial\dot u/\partial u=-K\mu^2/D_s<0$ and null $\to u=c_f$ as $\mu\to1$ — a candidate native field-speed governor. Unsigned $|m|$ *reinforces* the excursion (branchwise obstruction; no two-sided restoring law from this mechanism). Verdicts: unsigned **not derivable** from available identities/evidence; signed **plausible with named gaps** (finite-width endpoint impulse, self-consistent root birth, complete root sum, below-pin memory, transverse control, prehistory, full-history return map).
- **Provenance kill, strengthened by adjudicator memory:** the July 9 pin's producer is identified as the legacy braid-ideal JS stack (owner script `scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs`, run record fold-crossing-chart-spec.md §30) — quarantined 2026-07-12, retired 2026-07-16. Per solver-ownership policy, non-EOM provenance is non-evidence even if recovered. **Zero-cost arbitration is barred, not merely blocked**; the attractor is formally unmeasured at canonical grade.
- **First-order variant:** unmotivated but not falsified; Occam falsification requires a second-order convention to actually close the seven stability burdens.

Consequence: the sign-convention fork (P3) now has a *dynamical* stake beyond ledger closure — the signed convention supplies the only derived candidate mechanism for a $c_f$ speed governor. Arbitration paths, in order: (1) P3's frozen-action dual-replay ledger test; (2) a new native EOM near-pin crossing run emitting the per-root $(u,\dot u,D_s,D_T,m,\mu)$ table P6A specifies, evaluated as the same-state counterfactual sums under both conventions. A natural execution-tier packet would combine both on one crossing record. Candidate analytic successor (P12): the finite-width coincident-endpoint impulse lemma for self-root birth — P6A's named gap 3 and P4/P10's regularized-chart machinery overlap there.

### P11 — Full Two-Body Darwin Match (new)

```
Closure goal: Pin the vector-cargo coefficient family by matching the full
two-body Darwin-order acceleration - general single moving source, moving
receiver, arbitrary geometry - and report whether the second anchor fixes the
family to a unique member or exposes genuine underdetermination.

Context: P7A (analysis-wake-vector-cargo-variant.md) derived that the neutral-
line Darwin anchor fixes lambda = 1 but leaves alpha free, d invisible, and
a, f constrained only jointly (b = -2a, c + f/3 = 1, e + f/3 = -1). The full
point-to-point Darwin interaction sees the coefficients the symmetric line
hides. Adjudication notes: K = V x (U x rhat) and V.K = 0; the bilinear-only
member (alpha = 0, lambda = 1) closes the energy wake row identically and is
the leanest candidate.

Task: (1) State the full Darwin-order two-body acceleration benchmark
(observer-level recovery target, entering only after the native calculation;
cite an independent source for its form). (2) Expand the general P7A cargo
ansatz per-hit law for a single moving source at Darwin order, keeping delay,
root transport, and measure conventions identical to P1/P7A. (3) Match
coefficients term by term; solve the resulting constraint system for
(a, b, c, d, e, f). (4) Verdict: unique member, one-parameter residual family,
or inconsistency (no member matches both anchors - which would falsify the
entire local first-order cargo ansatz and route magnetism to Path B).
(5) Independently verify the f/3 coefficients in P7A's line constraints as a
by-product. (6) State what each surviving free parameter would need for
selection (which control, which anchor). Claim-grade everything; no runs.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-two-body-darwin-match.md.
Modify no other file anywhere in the repository - no canon, no code, no shared
ledgers, no other priorities areas. Read access is unrestricted. No git
commands.

Expected output: the analysis file with the benchmark statement, term-by-term
match, constraint solution, uniqueness verdict, f/3 verification, and
selection requirements for any surviving freedom, all claim-graded.
```

## P10 Adjudication (2026-07-18)

P10 (`analysis-recoil-pullback-lemma.md`) endorsed: **PASS**. Central kernel identity independently verified ($K_0=\delta_\eta(g)/r$ splits exactly as $K_{\mathrm{scale}}+K_C$ with $DK_{\mathrm{scale}}=-\delta_\eta(g)/r^2$ and $DK_C=-\delta'_\eta(g)/(c_fr)$; cross terms cancel; no counterterm). The P4 residual is legitimate same-action recoil: explicit wake increments close energy, momentum, and angular-momentum rows on a branch-preserving deformed family (radius split lifts the momentum projection, compact velocity bump lifts the energy projection — the symmetry-degeneracy trap P4 warned about is avoided). Adjudicator did not independently re-derive the $\Pi_1$ expansion coefficient (built-in self-checks manifest). Open: split-gauge uniqueness in $h_+$ — P10's *characteristic-split independence lemma* is adopted as **P13**; without it the recoil designation is bookkeeping-vulnerable.

Consequence: the pure scalar action derives a conserved second-order law — canon **plus** recoil row, $\mu_{\mathrm{arch}}\mathbf A=\mathbf R_{\mathrm{scale}}+\mathbf R_C$. The canonical scale-only law remains a postulate unless another invariant action cancels $\mathbf R_C$. New fork: adopt the derived recoil-inclusive law vs. retain clean canon.

**Cross-link to P11 (adjudicator-derived):** on the circular chart $\|\mathbf R_C\|/\|\text{main row}\| = \beta^2c^3/J_p^3$ — the recoil row is $O(v^2/c_f^2)$, i.e. **Darwin order**. P11 must therefore declare its base law (canon or recoil-inclusive) before coefficient matching; the recoil row and any cargo terms contribute at the same order. If P11 is already running, treat its result as conditional on the canonical base and plan a recoil-inclusive delta pass.

### P12 — Coincident-Endpoint Impulse Lemma (new)

```
Closure goal: Determine, via the dual-mollified law, whether the just-born
short-delay self-root delivers a finite integrated impulse through the
field-speed crossing window, and whether the signed-convention braking
mechanism survives regularization - closing P6A's named gap 3.

Context: P6A (analysis-speed-attractor-derivation.md) derived the short-delay
self-root asymptotic on an accelerating just-super-field-speed history:
Delta_* = 2 delta / alpha, D_T ~ -delta, D_s ~ +delta, m ~ -1, mu ~ 1. As
delta -> 0+ the root's separation, D_s, and D_T all vanish together, so the
sharp simple-root acceleration is not uniform in the limit and the branch is
born from the excluded coincident endpoint. The canon's dual-mollified law
(master-equation.md, dual-mollified evolution law and finite-eta quarantine
sections) with causal-surface width eta and core scale epsilon_c is the
declared route for such events; the H(0)=0 self-coincident endpoint
convention applies. P3 (analysis-signed-receiver-normal-convention.md)
supplies the local sign-change comparison at simple crossings.

Task: (1) Set up the dual-mollified acceleration for the accelerating
same-source short-delay geometry with retained history through the crossing;
identify which regulator (eta, epsilon_c, or both) controls the newborn
branch. (2) Compute the integrated along-track impulse of the newborn branch
through a crossing window under the unsigned convention and under the signed
convention; determine finiteness and leading regulator scaling. (3) Determine
whether the signed convention's restoring (braking) sign survives
regularization, and whether the feedback settles, chatters, overshoots, or
ejects at leading order - state this as a local map on (delta, alpha), not a
global attractor claim. (4) State the regulator-independence requirement:
which observables must be eta- and epsilon_c-independent for the mechanism to
be promotable, per the canon's transition-observable rule. (5) Name the
smallest follow-on (e.g., self-consistent root birth under the acceleration
it generates). Claim-grade everything; no numerical runs.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-coincident-endpoint-impulse-lemma.md.
Modify no other file anywhere in the repository - no canon, no code, no shared
ledgers, no other priorities areas. Read access is unrestricted. No git
commands.

Expected output: the analysis file with the regularized setup, dual-convention
impulse computation, sign-survival verdict, regulator-independence
requirements, and follow-on, all claim-graded.
```

### P13 — Characteristic-Split Independence Lemma (new)

```
Closure goal: Prove or refute P10's follow-on lemma: the recoil wake-history
increments defined by the exact kernel split K_0 = K_scale + K_C are
independent of the characteristic endpoint choice h_+ - deciding whether the
recoil designation is physical or split-gauge bookkeeping.

Context: P10 (analysis-recoil-pullback-lemma.md) proved the pure scalar
action's residual is same-action recoil via the exact decomposition with
K_scale built from an outgoing-characteristic integral starting at -h_+.
The pass is existence-only: if the cross-cut derivatives of
(E, P, J)_wake,C depend on h_+, the recoil transfer is a bookkeeping
artifact; if they do not, the recoil pullback is split-gauge independent on
the certified branch neighborhood. Dispatch-packet P10 adjudication notes the
recoil row is O(beta^2) relative to the main row (Darwin order), so this
lemma also gates whether P11's recoil-inclusive base-law comparison is
well defined.

Task: (1) For two endpoint-clear characteristic choices h_+^(1), h_+^(2) on
the same retained branch tube, compute the difference of the residual kernels
and show it is supported off the causal surface (both tails endpoint-clear).
(2) Compute the difference of the three cross-cut wake increments and their
cut derivatives on compact-interior and period-matched cuts; prove the
derivative difference is zero, a cut-constant, or a declared endpoint flux -
or exhibit a nonzero interior dependence. (3) Verdict: split-gauge
independent (recoil is physical on this neighborhood) or split-dependent
(recoil designation demoted to bookkeeping; P10's pass becomes a
construction, and the recoil-inclusive law loses its derived standing).
(4) If independent, state what additional structure (if any) is needed to
extend independence beyond the certified neighborhood. Claim-grade
everything; no numerical runs.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-characteristic-split-independence.md.
Modify no other file anywhere in the repository - no canon, no code, no shared
ledgers, no other priorities areas. Read access is unrestricted. No git
commands.

Expected output: the analysis file with the two-split difference computation,
cut-derivative comparison, independence verdict, and extension requirements,
all claim-graded.
```

## P11 Adjudication (2026-07-18)

P11 (`analysis-two-body-darwin-match.md`) endorsed; native expansion cross-checked against P1's kernel, Darwin benchmark re-derived, $f/3$ integral verified. **Verdict: inconsistency — the entire P7A cargo family is falsified** as a complete point-to-point Darwin-order law. The bilinear subsystem is uniquely $(c,d,e,f)=(2,0,0,-3)$ and passes the line projections, but the direct-source sector demands incompatible $b\in\{2,1,0\}$ across rows. Path A (per-hit cargo magnetism) is closed within the local first-order ansatz; **magnetism recovery routes to Path B** (bound structure / Noether sea constitutive response), converging with the existing constitutive-sea pivot.

**Elevated finding — the $-h\mathbf N$ row (adjudicator escalation):** with a static source, canon predicts a *first-order* receiver-velocity modulation $\big(1-\hat{\mathbf r}\cdot\mathbf V/c_f\big)$ of the radial acceleration; the Maxwell benchmark has no receiver-velocity dependence there (relativistic-inertia rows are second order). This contradiction is independent of cargo and indicts the receiver-normal *weight* postulate itself — P2's "chosen" $|D_T|$ numerator now carries a quantified first-order conflict with the electrodynamics anchor. P1's neutral-line test was blind to it (row $\propto$ net charge). Interlock: P6A's governor uses the same $D_T$ structure; P14's outcome reaches it.

### P14 — Static-Source First-Order Receiver Row (new)

```
Closure goal: Adjudicate the -hN obstruction: determine whether the canonical
receiver-normal weight's first-order receiver-velocity modulation of a static
source's radial acceleration (A ~ (1 - rhat.V/c_f) N/R^2) can be absorbed by
observer-level closure (assembly rods, clocks, absolute-time-to-observed-time
conversion), or whether it falsifies the D_T-as-acceleration-weight postulate
against the electrodynamics recovery anchor.

Context: P11 (analysis-two-body-darwin-match.md) exposed the row as a
cargo-independent first-order contradiction with the Maxwell benchmark (static
charge exerts velocity-independent force on a moving test charge; relativistic
inertia enters at second order). P2 (analysis-sampling-rule-lemma-and-
variants.md) graded D_T forced as crossing rate but chosen as acceleration
weight. P1's neutral-line test was blind to the row (it sums proportional to
net charge). P6A's governor mechanism uses the same D_T structure - state the
consequence for it under each outcome.

Task: (1) State precisely what observable the row modulates at first order
(orbit shapes, fall rates, spectroscopy analogues) in substrate coordinates.
(2) Enumerate the observer-level absorption candidates: emergent proper-time
rescaling (assembly clocks tick differently in motion), rod contraction,
measure redefinitions in the Lorentz-recovery chain - and determine at what
order each operates; a first-order radial modulation needs a first-order
absorber, so identify whether any candidate legitimately operates at first
order (e.g., first-order Doppler in observed rates) without breaking other
anchors. (3) If no absorber exists: state the minimal receiver-weight
modification that removes the row (candidate: unit weight W=1 with D_T
retained only in root transport) and re-derive its consequences for P1's C_B,
P2's family table, P3's stratum, and P6A's governor (which requires a
D_T-dependent along-track term - state whether the governor survives).
(4) Verdict: absorbable / falsifies-the-weight / undecidable-with-named-gap.
(5) Name the smallest follow-on. Claim-grade everything; no runs.

Write restriction (strict): create exactly one new file,
reference/priorities/app-eom/analysis-static-source-receiver-row.md.
Modify no other file anywhere in the repository - no canon, no code, no shared
ledgers, no other priorities areas. Read access is unrestricted. No git
commands.

Expected output: the analysis file with the observable statement, absorber
enumeration with orders, modification consequences if unabsorbable, verdict,
and follow-on, all claim-graded.
```

## P5A Adjudication (2026-07-18)

P5A (`analysis-parallel-stream-simulation-spec.md`) endorsed as an execution-ready instrument spec. Key design strengths: four-run current-parity projection (isolates the doubly-current-odd response; cancels current-even contamination **including P11's $-h\mathbf N$ row**), predeclared $C_B$ interval $[-0.05,0.05]$ with frozen error-budget allocation, bound-not-assumed finite-length handling (tail integral verified), contract-compliant straight prehistory, explicit evidence independence from P1's analytic route, and a drift-before-physics diagnosis ladder. Staleness note: the cargo "survival target 1" signature row predates P11's falsification of the cargo family; the variant-replay machinery stands as a general instrument for any future frozen law. Execution is operator-gated: pilot profile → scale selection → scientific matrix.

### P8 / P9 — unchanged

Dispatch as originally written in this packet when capacity allows. Note for P8: P1's null raises its stakes — with per-hit magnetism excluded, the assembly/sea channel carries the full recovery burden, which is exactly the channel P8's $c_f\gg c_{\mathrm{eff}}$ analysis constrains.
