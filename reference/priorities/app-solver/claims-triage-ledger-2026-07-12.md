# Claims-Triage Ledger — post-solver-audit (2026-07-12)

**Purpose.** After the [central-solver audit](central-solver-independent-audit-2026-07-12.md) found the solver is a delayed-force/root **evaluator over prescribed orbits with no coupled integrator**, every recorded conclusion must be sorted by *what the evaluator could actually compute*. This ledger is that sort, the quarantine register, and the row-by-row recovery plan. T2 rows first face the force-balance precondition; T3 rows first face the prehistory-collapse test. A failed precondition retires the row as void or not well-posed rather than dispatching a more precise version of the same invalid question.

**Tiers.**
- **T1 SURVIVES** — instantaneous delayed-force facts and **force-balance** results (does the net force/torque vanish or not on a given configuration). The kernel is validated (unit tests pass); these stand regardless of any integrator. Force-balance **negatives** ("does not balance / does not bind / does not close") are the safest of all.
- **T2 RE-ANCHOR** — linear-stability (pencil / $\mathrm{Re}\,\lambda$) verdicts. Valid only if (a) the pencil is anchored to a hand-checkable case and (b) it linearizes about an actually force-balanced configuration. Confirm each anchor, then confirm with the real integrator that predicted linear growth manifests in a true evolution.
- **T3 RE-DERIVE** — any temporal/dynamical claim (release, dispersal, settling/locking over time, amplitude growth, long-term fate, super-$c_f$ evolution). These used ad-hoc Euler or normal-form extrapolation and require matched multi-seed collapse tests on the validated integrator before any seed-independent claim can lift.

**Method note.** Built from the memory index (the distilled conclusion register). A deeper pass through `reference/priorities/**/brainstorming.md` + work-logs can add finer-grained rows; the tiering rules above apply unchanged. Where a single entry mixes types, the claim is split.

**The T3 remedy is insufficient — 2026-07-14.** This ledger quarantined every temporal claim "pending re-derivation on the validated integrator." That remedy does not work. A [collapse test on the antipodal binary](../braid-ideal/evidence/antipodal-binary-prehistory-collapse-test-2026-07-14.md) — four materially different prehistories seeded to the *identical* $(R_0,s_0)$ — shows the futures **do not collapse**: seed spread in $s$ reaches $40.7\%$ and remains $38.1\%$ at $t=65=6.5h$, against a refinement control of $1.5\times10^{-8}$ (signal-to-noise $2.6\times10^{7}$ at the original plateau). The common-radius phase spread grows to $0.14399$ on the extended interval. This is a delay system; the state is a function on $[-h,0]$ and every history is admissible. **A circular prehistory does not approximate the answer — it selects one.** Every T3 row below is therefore **seed-indexed**, and no row ever justified its seed. Re-running any of them on `src/eom` with a circular prehistory reproduces the original error at higher precision. **Every T3 re-run requires a collapse test — multiple materially different prehistories at matched initial state, evolved past $h$ — or its result is not about the object.** Synchronized spread is diagnostic rather than dispositive: the binary circular/out pair's $s(t)$ gap shrinks while its same-radius phase gap grows. This is a correction to the re-run protocol itself, not to any single row.

**Quarantine enforcement — closed 2026-07-14.** This ledger sorted the *conclusion register*. It never asked which quarantined conclusions were **already promoted into reader-facing `content/markdown/aaa` prose**. Several were — including rows whose stated provenance is a "native retained-history solver" release that the solver audit found never existed. The [current-tree audit](corpus-promotion-audit-2026-07-14.md) and the [git history audit](corpus-promotion-history-audit-2026-07-14.md) registered 46 live rows across 10 files; all are now adjudicated and **the corpus is repaired** (11 files, T3 removed, T2 re-graded to indication, T1 preserved verbatim — see the history audit's adjudication section). The quarantine is now enforced in the corpus, not only in this ledger. The T1 spine and the strategic conclusion are unchanged.

**Scope reassurance.** The geometry + force-balance spine (T1) is the bulk of the corpus and is intact. The strategic frontier conclusion — *no bare braid / isolated triple / planar assembly binds → constitutive sea is the lever* — rests on **T1 force-balance negatives** and survives. What gets re-adjudicated is the **stability + dynamics superstructure** (roughly the release/flutter/settling arc), selectively by type.

## T3 prehistory-independence protocol

For $N$ worldlines the evolved state is the retained function

$$
H_t(\theta)=\{\mathbf x_i(t+\theta),\mathbf v_i(t+\theta)\}_{i=1}^{N},
\qquad -h\le\theta\le0,
$$

not the endpoint vector alone. Every T3 rerun must therefore apply this order:

1. verify the object, charges, geometry, seed formulas, and equality of every
   endpoint position and velocity after only declared symmetries;
2. use at least three materially different endpoint-matched histories and
   multiple perturbation directions and magnitudes;
3. certify from the active-root ledger that no root still reaches the seeded
   interval $t<0$; $t>h$ by itself is not the clearance certificate;
4. compare symmetry-reduced observables on common phase branches, reporting
   synchronized-time spread separately rather than treating it as collapse;
5. establish the numerical envelope with half-step, half-prehistory-segment,
   deeper inactive history-boundary, and rate-sampling refinements;
6. fit an outcome law only after every declared seed pair reaches and remains
   within that envelope. State the tested basin. A resolved endpoint-matched
   counterexample pair refutes a universal curve; a finite seed family cannot
   prove universality over every admissible history;
7. name the closed form, theorem, or separately authored oracle that checks
   the load-bearing engine corner.

If the phase curves collapse, the common curve can support a basin-specific
seed-independent T3 claim. If a resolved pair remains separated, the result is
seed-indexed and the object-level claim is not well-posed without a preparation
condition. If neither occurs, quarantine remains. The full mathematical form,
binary calibration, and current-tree reproduction are in the
[prehistory-extension adjudication](../braid-ideal/evidence/antipodal-binary-prehistory-extension-adjudication-2026-07-14.md).

---

## Ledger

| Claim (section / memory) | Component | Tier | Quarantine | Reason / re-run note |
|---|---|---|---|---|
| §14 neutral braid ~97% cancellation | instantaneous force cancellation | **T1** | — | evaluator computes instantaneous force correctly |
| Geometry: octahedral/FCC, $\kappa_{\rm eq}=0.28623$, $R_M\approx3.49$, size anchors | force-balance geometry | **T1** | — | equilibria/anchors are force-balance facts |
| Charge ledgers (net $-1e$, neutral pairs) | explicit charge sums | **T1** | — | arithmetic over explicit sites |
| §82 radiation no-go (both channels bound; self-torque $+0.424$) | energy/force-interval bound at instants | **T1** | — | canonical $W^{\rm rec}$ energy bound; instantaneous seed |
| §83 native release **disperses** (halt $t\approx4.80$) | temporal evolution | **T3** | **QUARANTINED** | ad-hoc semi-implicit Euler + accel cap over prescribed prehistory (already flagged) |
| §83/§84 torque-null no-go; **no bare braid is a free particle** (airtight) | force/torque balance + closure impossibility | **T1** | — | "no torque-free + supported + closed config" is a balance statement |
| §85 global-drain sea: $L_z$ export $\approx0$; saturable $\sim5\times$ short; needs $\sim390\times$ sea damping | drain magnitudes + damping estimate | **T2** | **QUARANTINED** | magnitudes from evaluator; dynamical-sea absorption is T3 |
| §86 axis flutter $\mathrm{Re}\,\lambda=0.199$ (genuine circulatory; rigid-fix family closed) | legacy one-number stability claim; replacement V5 phase-collapse campaign | **T2 → NOT WELL-POSED AS STATED** | **LEGACY CLAIM RETIRED; REPLACEMENT COLLAPSE CAMPAIGN OPEN** | The object-level $0.199$ claim declares neither a retained prehistory nor a basin and is no longer a quarantined number awaiting a more precise rerun. The binary $t=65=6.5h$ negative establishes the method but not the V5 outcome. Apply the [superseding collapse design](../braid-ideal/section-86-flutter-rerun-dispatch-packet.md#superseding-design--2026-07-14-multi-seed-collapse): V5 phase collapse can produce a basin-specific common curve; V5 non-collapse leaves seed-indexed conditional curves. The [campaign preflight](../braid-ideal/evidence/section-86-v5-collapse-campaign-preflight-2026-07-14.md) admits endpoint-matched circular, radial-breath, and tilt-modulated histories, but no seed has reached clearance, so the replacement row remains open. Synchronized-time shrinkage alone does not pass the gate. |
| §87 wake-Ward / balanced-cell (pump $+0.424$ bound; superluminal caustic) | action/force bookkeeping | **T1/T2** | **QUARANTINED (T2 part)** | already BARRED held-to-proof; caustic is evaluator geometry |
| §88 dressed electron: pump cancels; flutter damps-not-dissolves | pump cancel / stability | **T1** + **T2** | **QUARANTINED (flutter)** | pump-cancel is force-balance (T1); flutter verdict T2 |
| §89 Lagrange-dressed: L-points unstable; enters $G$ but aggravates flutter | L-point balance / stability | **T1** + **T2** | **QUARANTINED (flutter)** | L-point locations are force-balance; instability/aggravation T2 |
| §90 nonlinear saturation ($l_1=+0.041$; grows past 1 rad by $t\approx51$) | temporal amplitude growth | **T3** | **QUARANTINED — DOWNSTREAM OF §86 COLLAPSE** | The Stuart-Landau extrapolation is non-authoritative. A seed-independent saturation claim exists only if the Section 86 prehistories first collapse; otherwise this row is not well-posed as stated. |
| §91 Kapitza: flutter not stiffness-stabilizable (circulatory) | linear-stability character | **T2** | **QUARANTINED** | re-anchor; confirm circulatory character on real integrator |
| §92/§93 contra-pair: **pump closes** ($\Delta z=1.42$) | force-balance (pump cancel) | **T1** | — | first native self-sinking; force-balance fact |
| §92/§93 contra-pair: saddle + $\mathrm{Re}\,\lambda=+5.30$ divergence | linear stability | **T2** | **QUARANTINED** | used as an anchored control in §99 (to 1e-9) → provisional; confirm dynamically |
| §92/§93 contra-pair: does **not lock** | dynamical settling | **T3** | **QUARANTINED** | "locking" is a temporal outcome |
| §94 no radiative settling | dynamical shedding | **T3** | **QUARANTINED** | radiative settling is a time-evolution claim |
| §95 dressed pair: payload has **no equilibrium** | force-balance (no equilibrium) | **T1** | — | "no force-balanced payload point" is a balance fact |
| §96 moving stacked-rings: Mach verified; **doesn't bind**; pump $+13.4$; flutter | bind/pump (T1) + linear stability about a non-equilibrium | **T1** + **T2 → VOID** | **T2 RETIRED 2026-07-14 — not re-runnable** | The Mach geometry, $\epsilon_{\rm bind}=0.0492298548241>0.03$, pump, and non-bind verdict survive as T1 diagnostics. Because the target fails force balance, its pencil omits a nonzero constant residual and has no stability referent. Evidence: [Section 96 retirement](../braid-ideal/evidence/section-96-flutter-force-balance-retirement-2026-07-14.md). |
| §97/§98 isolated-triple: **no bind, flutter-free** found | non-bind (force-balance) | **T1** | — | the binding negative survives |
| §97/§98 flutter magnitudes (pencil ~3× off validated) | linear stability about a **non-equilibrium** | **T2 → VOID** | **RETIRED 2026-07-14 — not re-runnable, removed from the worklist** | Adjudicated void rather than quarantined. T2 validity requires the pencil to linearize about an actually force-balanced configuration; every §97/§98 point fails that by its own recorded $\epsilon_{\rm bind}$ (the evolved finalist $0.1185$ against the $0.03$ gate; Part 2 point $852$ received a growth rate at $\epsilon_{\rm bind}=0.999999995$). They linearized about a circle the object does not follow, so the linearization carries a dominant constant term and the pencil has no referent — at any anchoring, magnitude, or sign. **Retiring it costs nothing:** the load-bearing §97/§98 result is the T1 non-bind negative, which never used the pencil, and flutter-freeness is moot where nothing binds. The direct-evolution attempt is not wasted — the §97 finalist departed its circle within $0.04$ of a period under the master equation, an independent evolved confirmation of the T1 negative. The `numeric_precision_limit_exhausted` wall it hit is a separate engine question, now the program's critical path: [root-completeness wall diagnostic](eom-root-completeness-wall-diagnostic-dispatch-packet.md). Evidence: [§97/§98 direct-evolution horizon blocker](../braid-ideal/evidence/section-97-98-direct-evolution-horizon-blocker-2026-07-14.md); [adjudication](../braid-ideal/section-97-98-flutter-rerun-dispatch-packet.md) |
| §99 planar assembly: **doesn't bind** ($\epsilon_{\rm bind}\approx1.0$); pump-cancel; charge; no force-balanced rest-photon candidate in declared coverage | force-balance + charge | **T1** | — | non-bind, pump-cancel, charge, and cross-speed force-balance rows are evaluator-valid; the rest-photon statement is coverage-limited |
| §99 flutter/lock (pencil implementation anchored to $10^{-9}$) | linear stability and local locking about non-equilibria | **T2 → VOID** | **RETIRED 2026-07-14 — not re-runnable** | The anchor validates the pencil implementation, not the target. Photon $\epsilon_{\rm bind}=0.9922225625$ and electron-rest $\epsilon_{\rm bind}=0.9999927135$ fail the $0.03$ precondition, so the target spectra and saddle readings have no stability referent. Evidence: [Section 99 retirement](../braid-ideal/evidence/section-99-stability-force-balance-retirement-2026-07-14.md). |
| §49–58 sea family: V3/V5 equilibria; self-equilibrated V5 (speed pin = size pin) | force-balance equilibria | **T1** | — | equilibria are balance facts |
| §57 stability matrix; §59 tilt-block restoring | linear stability | **T2** | **QUARANTINED** | re-anchor |
| §60 Row7: first bare radial closure (support 1/1/1); $\kappa_{\rm eq}$ gauge-invariant | force-balance closure | **T1** | — | closure/support are balance facts |
| §60 Row7: $+0.227$ rail pump un-absorbed → **coherent expansion** | temporal expansion | **T3** | **QUARANTINED** | "coherent expansion on release" is time-evolution |
| §62 Row8: d0-from-survival rejected (over-absorb 2–24×, **dt-fragile**) | integration-sensitive | **T3** | **QUARANTINED** | "dt-fragile" is an integrator artifact |
| §49–58 Rows 2–6 rejections (tangential dispersal, lag collapse, cap capture, polar credit) | force-balance budgets | **T1** | — | rejection reasons are force/credit-balance; "dispersal" phrasing is diagnostic, not an evolved run |
| Collinear breather obstruction (far-side KE floor, anti-damping trap) | trajectory return | **T3** | **QUARANTINED** | breather return is a temporal evolution |
| Native confirmation run (candidate rejected: shape loss on release) | temporal shape evolution | **T3** | **QUARANTINED** | release/shape-loss is dynamical |
| Native axial-drift: $\xi(u)/\xi(0)=1/\gamma$ ruler; frozen-cage ruled out | kinematic / multipole balance | **T1** | — | kinematic ruler + multipole argument |
| Native axial-drift: reorienting-dipole sub-critical/gain-reachable | linear stability | **T2** | **QUARANTINED** | re-anchor |
| Tangential-sea no-go; S1/S2 nested-hinge closed; iso-frequency refuted | force-balance / representability | **T1** | — | balance + representability facts |
| Collider-anomaly triage (LEP $A_{FB}^b$, etc.) | PDG data fit | **T1 (non-solver)** | — | independent of the solver; not affected |

---

## Re-run object geometry (quarantined items)

Object for each quarantined (re-run) row, for planning. **Five geometry classes** — resolving a class cascades to its members. Geometry *type* is cross-checked; exact per-site counts/charges come from each item's own fixture. ("Dressed" = bare braid + payload; "bare" = no payload. V5 = the 6-architrino self-equilibrated tilted spindle.)

| Item | Braids | Axis | Payload | Group vel. | Sea | Class |
|---|---|---|---|---|---|---|
| §57 / §59 | 1 (V5) | tilted | none | rest | static cage (sea-family rows) | A |
| §60 (Row 7) | 1 (bare V5) | tilted | none | rest → released | — | A |
| §62 (Row 8) | 1 (V5) | tilted | none | rest | $\rho_c$ absorption cell | C |
| §83 | 1 (bare V5) | tilted | none | rest → released force-free | — | A |
| §85 (= §71–76 arc) | 1 (V5) | tilted / oblique | none | moving $u{\approx}0.2$ | co-orbital cage | C |
| §86 | 1 (V5) | tilted | none | rest | — | A |
| §87 | 2 (balanced pro/anti cell) + wake | tilted | none | rest | transport cell | C |
| §88 | 1 dressed (~12) | tilted | 6-electrino spinless column, −1e | rest | — | B |
| §89 | 1 dressed (~12) | tilted | co-rotating Lagrange electrinos, −1e | rest | — | B |
| §90 | 1 (V5) | tilted | none | rest | — | A |
| §91 | 1 (V5) | tilted | none | rest | — | A |
| §92 / §93 | 2 (contra-rotating pair) | planar | none (neutral) | rest | — | D |
| §94 | 1 (V5) | tilted | none | rest | — | A |
| Collinear breather | 2 (head-on) | collinear (1-D) | none | moving (approaching) | — | H |
| Native confirmation run | 1 (bare V5) | tilted | none | rest → released | — | A |
| Native axial-drift (reorienting-dipole) | 1 (V5) | tilted | none | moving (drift $u$) | reorienting co-drift dipole | C |

**Classes.** **A** — bare tilted V5 at rest (flutter/release/stability: §57, §59, §60, §83, §86, §90, §91, §94, native confirmation); **B** — dressed tilted V5 + payload (§88, §89); **C** — braid + sea, moving/oblique (§85, §62, §87, axial-drift); **D** — contra-rotating pair, planar (§92/§93 rest); **H** — collinear head-on (breather). The former Class-E stability rows (§96–§98) and the Section 99 target spectrum are retired as non-equilibrium pencils, so they no longer appear in this quarantined-object table. Class A is the largest and is being tested first by the Section 86 collapse campaign.

### On the unnumbered entries

The tail rows lacking a `§` are not omissions — the ledger spans **three numbering schemes plus named threads**:
- **braid-search arc** §82–§99 (single §, the flutter/pair/assembly work);
- **sea / tangential-screen arc** §68–§76 — "Tangential-sea no-go" is **§70**, "S1/S2 nested-hinge closed" is **§68(a)**, and the "§85 global-drain sea" row is shorthand for the **§71–76** coupled-braid+sea complex;
- **Row scheme** §49–§62 (the V3/V5 support/sea-family rows);
- **named memory threads** with no single § — *collinear breather obstruction*, *native confirmation run*, *native axial-drift envelope*, *collider-anomaly triage*, and the foundational T1 rows (geometry anchors, charge ledgers). Real items; key them by name.

---

## Summary

- **T1 SURVIVES:** the geometry/force-balance spine — cancellations, equilibria, anchors ($\kappa_{\rm eq}$, $R_M$), charge ledgers, and all the **non-bind / no-free-particle / no-equilibrium negatives** (§84, §95, §96, §97/§98, §99). The frontier pivot to the constitutive sea rests here and holds.
- **T2 RE-ANCHOR (quarantined):** the remaining well-posed flutter/stability rows (§57, §59, §86, §88, §89, §91, §92/§93, reorienting-dipole). Section 86 is pivotal and now uses the collapse method. Sections 96, 97/98, and 99 are retired as void because their pencils linearized about non-equilibria.
- **T3 RE-DERIVE (quarantined):** every temporal claim (§83 dispersal, §90 growth, §92/§93 non-lock, §94 no-settling, §60 coherent expansion, §62 dt-fragility, collinear breather, native confirmation shape-loss).

## Re-run worklist for the validated integrator (in order)

### EOM capability gate for this ledger

The million-path scale profile is a long-term EOM goal, not a prerequisite for
this ledger. The quarantined objects are bounded populations: pairs, triples,
the six-worldline V5, and dressed or payload-bearing objects in the low tens of
worldlines. Their difficulty is long certified evolution through complete self/partner root
families and fold events, not population scale.

The immediate EOM capability gate is closed. The evolved-history root defect was
repaired, native-to-independent-oracle parity is $72/72$, the token-dominance
gate reduced accepted step cost $88.39\times$, and the accepted Section 86 step
grew to $5\times10^{-4}$. Optimization is closed unless a new profile supplies
a measured target. GPU, multi-GPU, distributed history, and the million-path
acceptance profile remain future work; none currently blocks this
bounded-population ledger.

1. **Section 86 multi-seed collapse campaign.** The antipodal-binary prerequisite
   returned: its seed spread remains $38.1\%$ at $t=65=6.5h$, and its common-radius
   phase spread grows. Run the V5 directly as the prehistory-independence test
   under the [superseding design](../braid-ideal/section-86-flutter-rerun-dispatch-packet.md#superseding-design--2026-07-14-multi-seed-collapse).
   The [preflight](../braid-ideal/evidence/section-86-v5-collapse-campaign-preflight-2026-07-14.md)
   now supplies a certified endpoint-matched inner/outer seed basin and its
   refinement rung; the remaining operation is the post-clearance evolution.
   A one-seed rate and synchronized-time shrinkage are not verdicts; phase-curve
   collapse lifts the row, while persistent separation reclassifies it as not
   well-posed.
2. **T3 dynamical set.** Section 83 release, Section 90 saturation,
   Sections 92/93 locking, Section 94 settling, and Section 60 expansion are
   multi-seed collapse tests: matched full-precision initial state, at least
   three materially different prehistories, evolution past $h$, and a numerical
   refinement control. Collapse lifts a seed-independent curve; non-collapse
   reclassifies the row as not well-posed; an unaffordable horizon is reported
   with wall-time arithmetic.

Nothing re-enters "dynamical" or "stable/unstable" status without passing the new integrator's independent oracle (O1–O6).
