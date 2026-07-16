# Tiers 2–4 Clean-Room Reduction-Layer Cross-Verification — 2026-07-15

**Status:** `PREDECLARED_NOT_RUN` (this line is updated per tier as results land).
**Predecessor:** [t1-reduction-layer-cross-verification-2026-07-15.md](t1-reduction-layer-cross-verification-2026-07-15.md)
(Tier 1: charge rows cross-verified PASS; §14 re-sequenced BLOCKED-ON-CAPABILITY,
owned by the [root-completeness wall packet](../eom-root-completeness-wall-diagnostic-dispatch-packet.md)).
**Authorization:** operator re-sequencing decision, ratified 2026-07-15 (claims-triage
ledger, Tier-1 adjudication section): Tiers 2–4 proceed now under the standing
blind-authorship protocol with per-tier fail-closed gates.

## Standing protocol and the §14 amendment

The standing rules of the original reduction-layer dispatch apply unchanged:
blind authorship (the reduction author does not open, grep, import, or execute
anything under `scripts/braid-ideal/`), fixture firewall (a separate extractor
performed the constants-only read), predeclared tolerances, per-tier fail-closed
gates, `src/solver` untouched, oracle unmodified, no `content/markdown/aaa`
edits. Amendment carried from the §14 episode: **the owning definition is part
of the fixture.** Every observable's definition is quoted verbatim from its
owning spec, with a per-quotation citation, in the fixture packet
[t2-t4-fixture-data-2026-07-15.json](t2-t4-fixture-data-2026-07-15.json)
(extraction report:
[t2-t4-fixture-extraction-report-2026-07-15.md](t2-t4-fixture-extraction-report-2026-07-15.md)).
No definition is restated from the dispatch prompt.

## Build statement

The unmodified EOM target was rebuilt before any computation:
`libeom_native.a` built 2026-07-15 18:59:25 -0400, 54 minutes after the newest
`src/eom` source change (`native/eom_native_evolution_fixture_cli.cpp`,
2026-07-15 18:05:49 -0400); zero `src/eom` files are newer than the build.
Environment note (declared): this pass runs in the sandboxed Linux (arm64)
workspace with system GCC, MPFR/GMP, and Boost headers; the prior Tier-1 pass
built on the operator's macOS host. The reduction layer is
implementation-independent of that difference and states its own numeric
precision controls below.

## Tier gates (declared before any run)

- Tier order is 2 → 3 → 4; a tier starts only after the previous tier is fully
  dispositioned.
- **FAIL** (a certified independent value disagreeing with the recorded value
  beyond its predeclared tolerance) stops the tier sequence immediately; the
  report carries the reproduction command; no implementation is modified.
- **NOT-VERIFIABLE** (certificate exhaustion, non-settling refinement, missing
  input) is not a FAIL. Per the operator's ratified re-sequencing rationale and
  the Tier-3 contingency in the dispatch, any `analytic_interval_exhausted`
  wall — in any tier — is registered as a dated witness in the
  [root-completeness wall packet](../eom-root-completeness-wall-diagnostic-dispatch-packet.md)
  (sample index, pair slot, fixture ref) and the remaining numbers of the tier
  continue. The gate to the next tier requires every number of the current tier
  dispositioned (PASS or NOT-VERIFIABLE-with-witness) with **zero FAILs**. This
  gate interpretation is declared here so it is auditable; it extends the
  dispatch's explicit Tier-3 rule to Tier 2 in the same spirit.
- Long runs emit heartbeats (rung, sample index, pair progress, wall seconds);
  nothing is reported DONE with an unwatched job.

## Predeclaration — tolerances and reduction choices (written before the first Tier 2–4 calculation)

Common comparison rule: a comparison evaluates `|new − recorded| ≤ τ` where
`τ = max(τ_base, w_cert)`; `w_cert` is the live certified enclosure width (or
documented refinement-movement scale) of the independent value, and `τ_base`
is fixed now, per number, from the owning record's own printed precision.
`w_cert` may only widen a tolerance by honest instrument width; it never
converts a disagreement into a pass, because a FAIL is declared whenever the
certified interval and the recorded value disagree by more than `τ` with the
interval settled. If the independent value's refinement does not settle
(movement increasing under refinement, as in the Tier-1 §14 ladder), the
disposition is NOT-VERIFIABLE, and `τ_base` is never widened from live
movement.

### Tier 2 — ε_bind residual norms (instantaneous, fixed configurations)

The reduction implements, from the owning quotes in the fixture packet only:
per-site delayed-force evaluation under the canonical per-hit law
(master-equation.md quotes; soft regulator as the declared fixture constant),
complete causal-root records per directed site pair, cycle averaging at the
owning sample count, the κ⋆ least-squares formula, and the ε_bind norm — all
authored independently of the legacy scripts.

| Number | Recorded value (token) | Owning sampling | τ_base | Basis |
|---|---:|---:|---:|---|
| §96 ε_bind | `0.0492298548241` | cycleSamples = 3 (fixture constant) | $10^{-9}$ | Both instruments book the identical declared configuration at identical declared sampling and regulator; the recorded token carries 12 significant digits; $10^{-9}$ accommodates double-precision accumulation differences between independently authored implementations while sitting 7 orders below the 0.03 gate scale. Root-set disagreement — the thing being tested — produces deltas far above this. |
| §99 photon ε_bind | `0.9922225625` | 24-cycle-sample ladder row (owning spec table) | $10^{-8}$ | Same rule; recorded token carries 10 decimals; the assembly is larger (more accumulation), so one order looser than §96. |
| §99 electron-rest ε_bind | `0.9999927135` | rest row of the recorded continuation; ladder stays within $3.1\times10^{-7}$ of one | $10^{-8}$ | Same basis as the photon row. |

Secondary diagnostics (reported, not gated): §96 κ⋆ `4.52636941`, residual
vector `(0.06849450,-0.02235171,-0.02879827)`, τ_z `+13.37621958`; §99 photon
κ⋆ ladder tokens; §99 electron κ⋆ `6.3558550e-5`. Gate-verdict rows
(ε_bind > 0.03) are reported alongside each comparison.

**Declared handling of the §99 UNRESOLVED row identities.** The owning records
do not pin the best-coarse pairIndex (photon: 12 candidates; electron: 4
candidates; ladder drift unstated — unresolved register, fixture packet). The
reduction therefore evaluates every candidate configuration reconstructed from
the declared stride mapping, at rest first and then (photon only, if no rest
match) at the declared drift grid, and identifies the row whose independent
(κ⋆, ε_bind) matches the recorded tokens within tolerance. Exactly one match →
the comparison proceeds on that row and the identification is recorded.
Zero matches → **FAIL** is not declared against a guessed row; the disposition
is FAIL only if *no* declared-coverage candidate reproduces the recorded
values within $10^{-4}$ (a two-sided identity failure that indicts the
recorded row itself); otherwise ambiguity (multiple matches) is reported as
NOT-VERIFIABLE-identity with all matching rows listed.

### Tier 3 — averaged bookings

| Number | Recorded value (token) | Owning definition anchor | τ_base | Basis |
|---|---:|---|---:|---|
| §82 net self-torque | `+0.424` | §82 Result 3: whole-braid net secular z-torque, all six sites, delayed partner wake, period-averaged, held rigid V5 seed, Nt = 24, soft = 0.02, fitted κ⋆ | $5\times10^{-4}$ | The owning §82 sentence records three decimals; its half-unit is $5\times10^{-4}$. The §92-quoted full-precision token `+0.4240300292341333` is a same-code-family regression target, so it is compared as a *diagnostic only* (gating on it would import legacy print precision as if it were independent evidence). |
| §60 rail pump | `+0.227` (packet constant `0.2274`, in-build `0.22736`) | §58 Result 2 / §60: middle layer's tangential DC row at fitted κ⋆, single-time rigid booking, R_M = 1 gauge | $5\times10^{-4}$ | Owning named booking carries three decimals; same half-unit rule. Deltas to `0.2274` and `0.22736` reported as diagnostics. |
| §92/§93 Δz | `1.419842173795055` (dispatch grade `1.42`) | §93: two-variable Newton solve of the individual pro-braid pump row and the relative axial-force row, 72 directed cross rows, four cycle samples | $5\times10^{-3}$ | The claim named for verification is `Δz = 1.42` (three significant digits; half-unit $5\times10^{-3}$). The independent layer performs its *own* two-variable solve on its own cross-row evaluations; the full-precision token is a same-instrument output and is compared as a diagnostic. Solve conditioning witness: the recorded Jacobian has eigenvalues of order 3–12, so a force-row tolerance of $10^{-6}$ propagates to position error orders below τ_base. |
| §92/§93 Δφ (if cheap) | `3.8435815410366416` (dispatch grade `3.84`) | same solve | $5\times10^{-3}$ | Same basis as Δz. |

Internal witnesses for the §92/§93 row (reported): cross-torque transfer
antisymmetry (recorded `∓1.27754e-4`), common axial force at machine scale,
minimum source-receiver distance above the declared collision floor.

Contingency (dispatch, pre-authorized): a certified-route
`analytic_interval_exhausted` wall on any Tier-3 window marks that number
NOT-VERIFIABLE, registers the dated witness in the wall packet, and the tier
continues.

### Tier 4 — optimization fixed points

The fixed-point solve is the new layer's own, authored from the owning
equilibrium conditions (§58 quotes: rail-pinned cadence ω = c_f/(R_M cos α_M);
κ frozen once; radial equilibrium with the tangential ledger closed at the
exported shape). The pin-as-attractor is retired (ledger R3); what is verified
is the **balance point** and the two recorded constants, not any attractor
claim.

| Number | Recorded value (token) | τ_base | Basis |
|---|---:|---:|---|
| κ_eq | `0.28623` | $5\times10^{-6}$ | Half-unit of the recorded five-decimal token. |
| R_M^eq | `3.4937` | $5\times10^{-5}$ | Half-unit of the recorded five-significant-digit token. |

Internal consistency witnesses (declared): (i) the gauge-invariance witness
κ_eq = 1/R_M^eq — algebraically trivial within one gauge, so the *content* of
the witness is gauge-orbit invariance: the layer solves at two distinct seed
gauges and requires the two R_M^eq values to agree to relative $10^{-9}$;
(ii) the radial residual at the solved point against the owning `~4e-6` scale
and the declared release-gate constant `5e-5`; (iii) the tangential rows
τ_I, τ_O against the owning `0.0006` / `0.0004` scale.

## Results

*(appended per tier below; nothing above this line is edited after the first
Tier-2 calculation)*

### Tier 2 results — 2026-07-15

**Finding in plain language.** The §96 ε_bind residual is independently
reproduced to $1.3\times10^{-13}$ — four orders inside the predeclared
$10^{-9}$ tolerance — together with every secondary diagnostic (κ⋆, the full
residual vector, its norm, and the pump τ_z), so the §96 row **PASSES**, with
two definitional findings: (i) the recorded "complete root record" books the
**partner wake only** — the drift makes the middle and outer sites
superluminal and each then carries exactly one same-source causal root inside
the declared window, and with those self roots included ε_bind becomes
$0.4409$ (κ⋆ $5.2933$); the recorded tokens reproduce only with self roots
excluded; the non-bind verdict ($>0.03$) holds under both readings; (ii) the
recorded radii tokens are 8-digit roundings of the exact dyadic values
$0.9951171875/1.8740234375$ (frozen verbatim in the §99 `baseRings`
literals) — the recorded κ⋆ token discriminates and confirms the dyadic
reading. The two §99 ε_bind tokens are **NOT-VERIFIABLE**: the predeclared
row-identification procedure (all 12 photon and 4 electron candidates from
the declared stride mapping, at rest and then on the declared drift grids,
under both self-root bookings and a documented ensemble of soft-branch-factor
placements) produced **zero** (κ⋆, ε_bind) token matches, while two
structural constraints derived from the recorded tokens themselves — the
exact 3-vs-6-cycle-sample ladder equality and the machine-zero pump — force
the photon row into the ω-symmetric occupancy-(2,2,2) family
`pairIndex ∈ {0,1,4}`, of which the two reconstructable members (0, 4) fail
to reproduce the tokens and the third (1) is a **sea-on row whose proxy-sea
construction is not extractable from the fixture packet** (algorithm-level,
firewalled). The electron analog is the same: reconstructable candidates 0
and 2 fail, sea-on candidates 1 and 3 cannot be built, and the recorded
ladder-replay band (within $3.1\times10^{-7}$ of one) is matched only by the
braids-only evaluation of sea-on candidate 1. This is a missing-input /
unresolved-identity disposition (fixture `UNRESOLVED-1/2/3`), not a FAIL: no
declared-coverage candidate can be *certified* non-reproducing while the
sea-on half of the schedule is unreconstructable and the regulator placement
is undetermined by any owning quote. Crucially, the **gate verdicts the §99
retirement rests on are confirmed for every reconstructable candidate under
every documented reading**: every photon row has ε_bind ≥ 0.889 (rest rows
≥ 0.958) and every electron row ε_bind ≥ 0.99991 against the 0.03 gate;
charge ledgers are exact (0e photon, −1e electron); and the ω-symmetric rows
are pump-free at certified exact-zero scale ($|\tau_z|\sim10^{-22}$; the
recorded $10^{-16}$ tokens are float noise of that zero).

**Tier-2 comparison table.**

| Number | Recorded token | New value (booking) | w_cert | \|Δ\| | τ | Disposition | Grade |
|---|---:|---:|---:|---:|---:|---|---|
| §96 ε_bind | `0.0492298548241` | `0.0492298548239723471913` (partner-only roots, dyadic radii, 3 cycle samples) | $1\times10^{-29}$ (dps 40→60 movement) | $1.28\times10^{-13}$ | $10^{-9}$ | **PASS** | measured |
| §99 photon ε_bind (24-sample ladder row) | `0.9922225625` | no certified row: identity unresolved; nearest structurally admissible family {0,1,4} does not reproduce (0, 4) or cannot be built (1, sea-on) | — | — | $10^{-8}$ | **NOT-VERIFIABLE** (identity + missing input) | measured (gate row only) |
| §99 electron-rest ε_bind | `0.9999927135` | no certified row: candidates 0/2 fail to reproduce; 1/3 sea-on unreconstructable; ladder-band token matched only by braids-only candidate 1 | — | — | $10^{-8}$ | **NOT-VERIFIABLE** (identity + missing input) | measured (gate row only) |

Zero FAILs; per the declared tier gate (every Tier-2 number dispositioned
PASS or NOT-VERIFIABLE-with-witness), the Tier-3 gate is **open**. No
`analytic_interval_exhausted` wall fired anywhere in Tier 2 (≈50,000
certified root records), so no entry is added to the root-completeness wall
packet; the §99 blocker is registered here as a missing-input witness
instead.

**§96 secondary diagnostics (all at the fitted κ⋆, partner-only booking).**

| Diagnostic | Recorded | New (dps 60) | \|Δ\| |
|---|---:|---:|---:|
| κ⋆ | `4.52636941` | `4.5263694127230741` | $2.7\times10^{-9}$ (half-unit $5\times10^{-9}$) |
| residual vector (axial order M→I→O) | `(0.06849450,-0.02235171,-0.02879827)` | `(0.06849450412,-0.02235171001,-0.02879826722)` | $(4.1\times10^{-9},1.3\times10^{-11},2.8\times10^{-9})$ |
| ‖R‖₂ | `0.07759147` | `0.0775914700827898` | $8.3\times10^{-11}$ |
| τ_z (z of Σ sites r×κ⋆F, cycle-averaged, per-site-row κ⋆) | `+13.37621958` | `+13.3762195777517093` | $2.2\times10^{-9}$ |

The recorded residual-vector component order is identified as the **axial
order (M, I, O)**, and the κ⋆/τ_z bookings as **per-site** rows (the
ring-summed alternative halves both and is excluded by the tokens). Root
inventory: 30 partner roots per sample (exactly one causal root for each of
the 30 directed partner pairs inside the window-8 record; the two constructed
phase-match roots sit at exactly $\tau=d_1, d_2$ with $D_T=D_s=1$), plus one
self root each for the four superluminal M/O sites when self-inclusive;
min $|D_s|=0.3517$ (no caustic in the record); per-ring sample/site spread
$\le 5\times10^{-61}$ at dps 60 (exact time-translation invariance witness).
Radii-token sensitivity: literal 8-digit radii give ε_bind
`0.0492298540376` ($|\Delta|=7.9\times10^{-10}$, marginally inside τ) but
κ⋆ `4.5263694222`, which rounds to 4.52636942 ≠ recorded token 4.52636941;
the exact dyadic radii round to every recorded token. The dyadic reading is
therefore the identified geometry and the one compared above.

**Soft-regulator interpretation note.** The declared prescription
"$W^{\rm rec}\to D_s/(D_s^2+{\rm soft}^2)$" was implemented as regularizing
the $1/|D_s|$ factor of the canonical $W^{\rm rec}=|D_T/D_s|$:
$W_{\rm soft}=|D_T|\,|D_s|/(D_s^2+{\rm soft}^2)$, soft $=0.02$. On every
§96-class record this is *exactly degenerate* with the $D_s$-only and
$D_T$-only symmetric placements ($D^2/(D^2+s^2)$), because $D_T=D_s$ on every
rigid co-rotating common-drift root (the §82 lemma extends to the drifted
record: the §96 PASS at $10^{-13}$ validates the soft *form* but cannot fix
the *placement*). The §99 contra-rotating records do depend on the placement;
no owning quote fixes it; the documented ensemble
{$|D_T||D_s|/(D_s^2+s^2)$, $D_s^2/(D_s^2+s^2)$, $D_T^2/(D_T^2+s^2)$,
symmetric geometric mean} was therefore evaluated and reported, and none
reproduces the §99 tokens on any reconstructable candidate.

**§99 row-identification record (predeclared procedure).** All 12 photon
candidates were evaluated at rest (both self bookings, primary regulator
reading), then on the full declared drift grid {0.9, 0.99, 0.999, 0.9999}
(96 further rows), then under the documented convention ensemble
(regulator placements × anti-braid phase-map variants × self bookings ≈ 300
evaluated rows); the 4 electron candidates likewise at rest and on
{0.25, 0.5, 0.75}. Zero rows matched the recorded (κ⋆, ε_bind) tokens at
identification precision. Structural narrowing from the recorded tokens:
(a) κ⋆ and ε_bind identical at 3 and 6 cycle samples to all ten printed
digits requires the half-period symmetry (t → t+P/2 equals rotation by π
plus polarity conjugation), which holds only for occupancy (2,2,2) with unit
ω scales — photon pairIndex ∈ {0,1,4}; (b) the recorded pump residuals
($3.71\times10^{-16}$, ladder ≤ $3.65\times10^{-16}$) are float noise of the
conjugation-symmetric exact zero, which the ω-scaled rows break by O(0.2) —
independently confirming (a). Both reconstructable members fail to reproduce;
the sea-on member cannot be built from the packet. Nearest rows (diagnostics,
not identities): pair 2 at rest, symmetric-soft, self-inclusive, N=1 gives
κ⋆ `0.0944907817` (within $2.4\times10^{-5}$ of the recorded best-coarse
`0.09446654050233466`) but ε `0.98984` (off $1.8\times10^{-3}$) and a
*non-zero pump* (|τ_z| ≈ 0.23), which excludes it; pair 4 (pump-free family)
gives at best (0.1007, 0.99110). Electron: recorded κ⋆ magnitude scale
($6.36\times10^{-5}$) and the near-one ε structure are reproduced by every
candidate (κ⋆ ∈ [−3×10⁻⁴, +2×10⁻⁴], ε ≥ 0.99991), and the u=0.25
coarse-objective token `0.9999997624` is approached to $2\times10^{-7}$
(braids-only pair 3, u=1/4), but no exact (κ⋆, ε) identity exists among
buildable candidates.

**Gate-verdict rows (reported alongside, per predeclaration).** Binding gate
0.03: every evaluated §99 row fails binding by ≥ 0.86 absolute margin
(photon min ε over all 168 primary-reading rows 0.8894; electron min
0.99991); §96 fails at 0.0492 under the recorded booking and at 0.4409
self-inclusive. Charge: photon 0e exactly, electron −1e exactly (payload
−6ε), every candidate. Pump: ω-symmetric §99 rows are pump-free at
$|\tau_z|\le 10^{-21}$ certified; §96 is pump-loaded, τ_z = +13.376 ≫ 0.02.
The Tier-2 evidence therefore independently confirms every retirement-grade
gate verdict while leaving the §99 decimal tokens unverifiable to token
precision.

**Precision control.** All numerics run in exact-rational configuration
arithmetic (every fixture constant is a finite decimal; phases and sample
times are carried as $a+b\pi$ with $a,b\in\mathbb{Q}$), so degeneracies such
as the luminal rail $\omega R_M=c_f$ and the self-root threshold
$\lambda^2\ge1$ are decided exactly, never by float comparison. Causal roots
are certified complete by the authored subdivision argument (exclusion by a
global $|G'|$ Lipschitz bound with outward-rounding pad; bracket admission
only with certified sign change plus a global $|G''|$ monotonicity bound;
exact-rational quadratic branch for on-axis pairs; the closed-form
$|\sin\xi|=\lambda\xi$ reduction for self pairs; fail-closed
`analytic_interval_exhausted` on tangency — never triggered). The §96
comparison value carries a dps-40→dps-60 refinement movement of
$1\times10^{-29}$ (= w_cert), monotone decreasing from the dps-24/30 rungs;
the settling rule is satisfied. Identification rows ran at dps 20 with
dps-20→40 movement ≤ $2.4\times10^{-11}$, orders below all identification
scales.

**Heartbeat record.** `.tmp/eom-verification/t2-heartbeat.log` (per-sample
lines: configuration label, N, sample index, cumulative certified roots, wall
seconds). Two detached photon identification jobs were reaped by the sandbox
mid-sweep (last heartbeat at pair 6); the sweep was re-run to completion in
foreground chunks with an idempotent per-row JSONL record; no row was
reported from an unwatched job.

**Raw results.** `.tmp/eom-verification/t2-results-summary.json` (index),
`t2-section96-official.json`, `t2-section96-roundedtokens.json`,
`t2-s99-photon-identify-*.json`, `t2-s99-photon-driftgrid-*.jsonl`,
`t2-s99-electron-identify-*.json`, `t2-s99-electron-driftgrid-*.jsonl`,
`t2-s99-photon-N24-gate-rows.json`.

**Reproduction.**

```
python3 scripts/eom-verification/t2_epsilon_bind_reduction.py s96 \
  --dps 40 60 --self-variants --out t2-section96-official.json
python3 scripts/eom-verification/t2_epsilon_bind_reduction.py s96 \
  --dps 40 --exclude-self --rounded-tokens --out t2-section96-roundedtokens.json
python3 scripts/eom-verification/t2_epsilon_bind_reduction.py s99-identify \
  --object photon --dps 20 --samples 1 3 --drifts 0 --out <photon-rest>.json
python3 scripts/eom-verification/t2_epsilon_bind_reduction.py s99-identify \
  --object photon --dps 20 --samples 1 --drifts 0.9 0.99 0.999 0.9999 --out <photon-drift>.json
python3 scripts/eom-verification/t2_epsilon_bind_reduction.py s99-identify \
  --object electron --dps 20 --samples 1 3 --drifts 0 0.25 0.5 0.75 --out <electron>.json
```

(each also accepts `--exclude-self`; the branch-factor ensemble is the
`w_mode` field of `Ctx` in `scripts/eom-verification/t2_epsilon_bind_lib.py`).

**Falsifiers.** (§96) The PASS is overturned if a fixture-firewalled
reduction implementing the same owning quotes produces a certified
partner-only ε_bind outside `0.0492298548241 ± 1e-9`, or if the owning §96
instrument is shown to include same-source roots in the recorded row (which
would convert this PASS into a definitional FAIL at Δ ≈ 0.39). (§99) The
NOT-VERIFIABLE dispositions are overturned in either direction by supplying
the two missing inputs — the recorded rows' pairIndex/drift identities and
the proxy-sea site construction — after which the same reduction either
reproduces the tokens within $10^{-8}$ (PASS) or certifies a two-sided
identity failure (FAIL). The gate-verdict confirmations are falsified by any
declared-coverage §99 candidate reaching ε_bind ≤ 0.03 under the canonical
per-hit law with the declared regulator.

**Claim grades.** §96 ε_bind + diagnostics: *measured* (certified
independent reduction, exact configuration arithmetic). §96 partner-only
booking identification and dyadic-radii identification: *derived* (token
arithmetic pins both). §99 ladder-equality ⇒ ω-symmetric/occupancy narrowing
and pump-zero symmetry argument: *derived*. §99 gate-verdict confirmations
(non-bind margins, charge, pump-free family): *measured* over the
reconstructable candidate ensemble. §99 sea-on-row hints (photon pair 1,
electron pair 1): *inferred* (braids-only evaluations of unreconstructable
rows); not usable as identities.

**Blind-authorship read set (Tier 2).** This evidence file (predeclaration);
the fixture packet `t2-t4-fixture-data-2026-07-15.json`; owning specs
`reference/priorities/braid-ideal/moving-phase-matched-stacked-rings-braid-spec.md`
and `reference/priorities/braid-ideal/planar-assembled-free-particle-spec.md`;
the predecessor evidence file (style/protocol only);
`scripts/eom-verification/t1_reduction_layer.py`; `scripts/eom/oracle/`
module listing (no oracle file was imported by the Tier-2 reduction, which is
self-contained on mpmath + exact rationals). Nothing under
`scripts/braid-ideal/` was opened, grepped, imported, or executed. Files
created: `scripts/eom-verification/t2_epsilon_bind_lib.py`,
`scripts/eom-verification/t2_epsilon_bind_reduction.py`, raw results under
`.tmp/eom-verification/`. Files modified: this evidence file (this appended
section only). `src/solver`, `src/eom`, the oracle, and
`content/markdown/aaa` were untouched; no git command was run.
