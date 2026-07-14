# Claims-Triage Ledger — post-solver-audit (2026-07-12)

**Purpose.** After the [central-solver audit](central-solver-independent-audit-2026-07-12.md) found the solver is a delayed-force/root **evaluator over prescribed orbits with no coupled integrator**, every recorded conclusion must be sorted by *what the evaluator could actually compute*. This ledger is that sort, and it doubles as the **quarantine register**: nothing here is deleted; Tier-2/Tier-3 rows are flagged `QUARANTINED — pending re-derivation on the validated integrator`.

**Tiers.**
- **T1 SURVIVES** — instantaneous delayed-force facts and **force-balance** results (does the net force/torque vanish or not on a given configuration). The kernel is validated (unit tests pass); these stand regardless of any integrator. Force-balance **negatives** ("does not balance / does not bind / does not close") are the safest of all.
- **T2 RE-ANCHOR** — linear-stability (pencil / $\mathrm{Re}\,\lambda$) verdicts. Valid only if (a) the pencil is anchored to a hand-checkable case and (b) it linearizes about an actually force-balanced configuration. Confirm each anchor, then confirm with the real integrator that predicted linear growth manifests in a true evolution.
- **T3 RE-DERIVE** — any temporal/dynamical claim (release, dispersal, settling/locking over time, amplitude growth, long-term fate, super-$c_f$ evolution). These used ad-hoc Euler or normal-form extrapolation and must be re-run.

**Method note.** Built from the memory index (the distilled conclusion register). A deeper pass through `reference/priorities/**/brainstorming.md` + work-logs can add finer-grained rows; the tiering rules above apply unchanged. Where a single entry mixes types, the claim is split.

**Quarantine enforcement — closed 2026-07-14.** This ledger sorted the *conclusion register*. It never asked which quarantined conclusions were **already promoted into reader-facing `content/markdown/aaa` prose**. Several were — including rows whose stated provenance is a "native retained-history solver" release that the solver audit found never existed. The [current-tree audit](corpus-promotion-audit-2026-07-14.md) and the [git history audit](corpus-promotion-history-audit-2026-07-14.md) registered 46 live rows across 10 files; all are now adjudicated and **the corpus is repaired** (11 files, T3 removed, T2 re-graded to indication, T1 preserved verbatim — see the history audit's adjudication section). The quarantine is now enforced in the corpus, not only in this ledger. The T1 spine and the strategic conclusion are unchanged.

**Scope reassurance.** The geometry + force-balance spine (T1) is the bulk of the corpus and is intact. The strategic frontier conclusion — *no bare braid / isolated triple / planar assembly binds → constitutive sea is the lever* — rests on **T1 force-balance negatives** and survives. What gets re-adjudicated is the **stability + dynamics superstructure** (roughly the release/flutter/settling arc), selectively by type.

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
| §86 axis flutter $\mathrm{Re}\,\lambda=0.199$ (genuine circulatory; rigid-fix family closed) | linear stability (reference pencil) | **T2** | **QUARANTINED — DIRECT-EVOLUTION CAMPAIGN AT A FEASIBILITY WALL** | direction-neutral theorem gate, exact $v=c_f$ circular start, and fold-crossing atomic publication pass at normal tolerances; adjudicated 2026-07-14 — the $6.25\times10^{-6}$-cycle horizon is linear in $t$ to $1.3\times10^{-3}$, so its $0.60113$ slope is the seed transient and carries no eigenvalue. The analytic fold reduces exact-V5 fold cells $100.3\times$. The pinned-fold-aware temporal certificate then proves the old step collapse was a first-order estimator artifact: onset accepts $5\times10^{-4}$ and post-onset accepts $10^{-3}$ with zero uncertified roots and unchanged tolerances. Exact-root/correction snapshots still cost about 43.7 s per post-onset step, projecting to 3.05 days per cycle before ladder multipliers; the evolved-history root-path defect also remains open. Frequency continuation is barred because it crosses a self-hit topology change. Next object: repair/profile the exact snapshot path or enlarge the certified post-onset step. $0.199$ non-authoritative |
| §87 wake-Ward / balanced-cell (pump $+0.424$ bound; superluminal caustic) | action/force bookkeeping | **T1/T2** | **QUARANTINED (T2 part)** | already BARRED held-to-proof; caustic is evaluator geometry |
| §88 dressed electron: pump cancels; flutter damps-not-dissolves | pump cancel / stability | **T1** + **T2** | **QUARANTINED (flutter)** | pump-cancel is force-balance (T1); flutter verdict T2 |
| §89 Lagrange-dressed: L-points unstable; enters $G$ but aggravates flutter | L-point balance / stability | **T1** + **T2** | **QUARANTINED (flutter)** | L-point locations are force-balance; instability/aggravation T2 |
| §90 nonlinear saturation ($l_1=+0.041$; grows past 1 rad by $t\approx51$) | temporal amplitude growth | **T3** | **QUARANTINED — DOWNSTREAM OF §86 EVOLUTION** | Stuart-Landau normal-form extrapolation remains non-authoritative; exact V5 direct evolution now publishes its first fold-crossing steps, but the multi-cycle saturation ladder has not run and is blocked by the same pinned-fold feasibility wall. Saturation is claimed at $t\approx51$, i.e. $\approx8.5$ braid cycles — a longer horizon than §86 needs, so §90 cannot resolve before §86 |
| §91 Kapitza: flutter not stiffness-stabilizable (circulatory) | linear-stability character | **T2** | **QUARANTINED** | re-anchor; confirm circulatory character on real integrator |
| §92/§93 contra-pair: **pump closes** ($\Delta z=1.42$) | force-balance (pump cancel) | **T1** | — | first native self-sinking; force-balance fact |
| §92/§93 contra-pair: saddle + $\mathrm{Re}\,\lambda=+5.30$ divergence | linear stability | **T2** | **QUARANTINED** | used as an anchored control in §99 (to 1e-9) → provisional; confirm dynamically |
| §92/§93 contra-pair: does **not lock** | dynamical settling | **T3** | **QUARANTINED** | "locking" is a temporal outcome |
| §94 no radiative settling | dynamical shedding | **T3** | **QUARANTINED** | radiative settling is a time-evolution claim |
| §95 dressed pair: payload has **no equilibrium** | force-balance (no equilibrium) | **T1** | — | "no force-balanced payload point" is a balance fact |
| §96 moving stacked-rings: Mach verified; **doesn't bind**; pump $+13.4$; flutter | bind/pump (T1) + flutter (T2) | **T1** + **T2** | **QUARANTINED (flutter)** | non-bind + pump are force-balance; flutter T2 |
| §97/§98 isolated-triple: **no bind, flutter-free** found | non-bind (force-balance) | **T1** | — | the binding negative survives |
| §97/§98 flutter magnitudes (pencil ~3× off validated) | linear stability about a **non-equilibrium** | **T2 → VOID** | **RETIRED 2026-07-14 — not re-runnable, removed from the worklist** | Adjudicated void rather than quarantined. T2 validity requires the pencil to linearize about an actually force-balanced configuration; every §97/§98 point fails that by its own recorded $\epsilon_{\rm bind}$ (the evolved finalist $0.1185$ against the $0.03$ gate; Part 2 point $852$ received a growth rate at $\epsilon_{\rm bind}=0.999999995$). They linearized about a circle the object does not follow, so the linearization carries a dominant constant term and the pencil has no referent — at any anchoring, magnitude, or sign. **Retiring it costs nothing:** the load-bearing §97/§98 result is the T1 non-bind negative, which never used the pencil, and flutter-freeness is moot where nothing binds. The direct-evolution attempt is not wasted — the §97 finalist departed its circle within $0.04$ of a period under the master equation, an independent evolved confirmation of the T1 negative. The `numeric_precision_limit_exhausted` wall it hit is a separate engine question, now the program's critical path: [root-completeness wall diagnostic](eom-root-completeness-wall-diagnostic-dispatch-packet.md). Evidence: [§97/§98 direct-evolution horizon blocker](../braid-ideal/evidence/section-97-98-direct-evolution-horizon-blocker-2026-07-14.md); [adjudication](../braid-ideal/section-97-98-flutter-rerun-dispatch-packet.md) |
| §99 planar assembly: **doesn't bind** ($\epsilon_{\rm bind}\approx1.0$); pump-cancel; charge; no rest photon | force-balance + charge | **T1** | — | non-bind, pump-cancel, charge, cross-speed force balance all evaluator-valid |
| §99 flutter/lock (pencil anchored to 1e-9) | linear stability, anchored | **T2** | **QUARANTINED (provisional-OK)** | anchor passed; still confirm growth manifests in a true evolution |
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
| §96 | 1 (stacked rings) | flat / planar ($\alpha=0$) | none | moving (Mach drift $u$) | — | E |
| §97 / §98 | 1 (isolated triple, 3) | tilt continuum (flat↔tilted) | none | sub / field / **supra**-$c_f$ | — | E |
| §99 | 2 (contra-rotating pair) | planar ($\alpha=0$, no caps) | photon: none · electron: 6-electrino −1e | rest + boosted | labeled proxy ring | D |
| Collinear breather | 2 (head-on) | collinear (1-D) | none | moving (approaching) | — | H |
| Native confirmation run | 1 (bare V5) | tilted | none | rest → released | — | A |
| Native axial-drift (reorienting-dipole) | 1 (V5) | tilted | none | moving (drift $u$) | reorienting co-drift dipole | C |

**Classes.** **A** — bare tilted V5 at rest (flutter/release/stability: §57, §59, §60, §83, §86, §90, §91, §94, native confirmation); **B** — dressed tilted V5 + payload (§88, §89); **C** — braid + sea, moving/oblique (§85, §62, §87, axial-drift); **D** — contra-rotating pair, planar (§92/§93 rest; §99 rest+boosted +payload); **E** — moving single braid/triple (§96 flat-stack; §97/§98 triple, into supra-$c_f$); **H** — collinear head-on (breather). Class A is the largest and is being hardened first by the §86 run.

### On the unnumbered entries

The tail rows lacking a `§` are not omissions — the ledger spans **three numbering schemes plus named threads**:
- **braid-search arc** §82–§99 (single §, the flutter/pair/assembly work);
- **sea / tangential-screen arc** §68–§76 — "Tangential-sea no-go" is **§70**, "S1/S2 nested-hinge closed" is **§68(a)**, and the "§85 global-drain sea" row is shorthand for the **§71–76** coupled-braid+sea complex;
- **Row scheme** §49–§62 (the V3/V5 support/sea-family rows);
- **named memory threads** with no single § — *collinear breather obstruction*, *native confirmation run*, *native axial-drift envelope*, *collider-anomaly triage*, and the foundational T1 rows (geometry anchors, charge ledgers). Real items; key them by name.

---

## Summary

- **T1 SURVIVES:** the geometry/force-balance spine — cancellations, equilibria, anchors ($\kappa_{\rm eq}$, $R_M$), charge ledgers, and all the **non-bind / no-free-particle / no-equilibrium negatives** (§84, §95, §96, §97/§98, §99). The frontier pivot to the constitutive sea rests here and holds.
- **T2 RE-ANCHOR (quarantined):** every flutter/stability $\mathrm{Re}\,\lambda$ verdict (§57, §59, §86, §88, §89, §91, §92/§93, §96, §97/§98, §99, reorienting-dipole). Priority order: §97/§98 (known unanchored) worst; §99 (anchored) best; §86 (0.199 reference) pivotal.
- **T3 RE-DERIVE (quarantined):** every temporal claim (§83 dispersal, §90 growth, §92/§93 non-lock, §94 no-settling, §60 coherent expansion, §62 dt-fragility, collinear breather, native confirmation shape-loss).

## Re-run worklist for the validated integrator (in order)

### EOM capability gate for this ledger

The million-path scale profile is a long-term EOM goal, not a prerequisite for
this ledger. The quarantined objects are bounded populations: pairs, triples,
the six-worldline V5, and dressed or payload-bearing objects in the low tens of
worldlines. Their difficulty is long certified evolution through complete self/partner root
families and fold events, not population scale.

The immediate capability plan is [claims-triage small-population long-horizon
evolution](../app-eom/claims-triage-small-population-long-horizon-plan.md). It
requires persistent retained histories, checkpoint/resume, reproducible
convergence and perturbation campaigns, precise all-pair reduction, and a cheap
certified treatment of the exact-$v=c_f$ pinned self-fold. GPU, multi-GPU,
distributed history, and the million-path acceptance profile remain valuable
future work but do not block any row in this ledger unless measurement later
shows that a specific ledger run cannot reach its required horizon on the
native CPU path.

0. **`src/eom` evolved-history root-path DEFECT** — inserted 2026-07-14 as the **critical path**; diagnosed the same day. Two campaigns stalled on root completeness from opposite directions (§86 at the $v=c_f$ pin, cost-walled; §97 at strictly sub-$c_f$ speeds, precision-walled at $t=0.335$, unmoved by $512\to1024$ MPFR bits). **Verdict: defect, not caustic.** The independent oracle certifies all 36 §97 ordered pairs at $\min D_s=0.6824$, and Cauchy–Schwarz plus measured accelerations hold $D_s\ge0.42$ at the wall row across the whole window — no caustic is reachable there. Independently, the wall moves $2.75\times$ under step refinement and $2.59\times$ under prehistory-segment refinement while staying invariant in $h$: it tracks discretization, not physical time. Leading mechanism: per-segment error-token accumulation (residual-risk item 4 of the engine inspection — flagged, never checked), which is precision-independent by construction and explains all five signature facts. **This gates every row below, and it re-opens the §86 cost diagnosis** — a root-scan defect at the pin presents exactly as expensive-but-correct fold handling. [Evidence](evidence/eom-root-completeness-wall-ds-diagnostic-2026-07-14.md) · [repair dispatch](eom-root-completeness-wall-diagnostic-dispatch-packet.md).
1. **§86 flutter (0.199)** — the reference. The theorem anchor, exact V5 $v=c_f$ circular start, analytic fold force, and pinned-fold-aware temporal-onset certificates pass. Everything T2 hangs off this. **Now blocked at an exact-snapshot feasibility wall, not a temporal-onset or coverage gap:** the old first-order full-step/two-half-step collapse was an estimator artifact; onset now accepts $5\times10^{-4}$ and the post-onset controller accepts $10^{-3}$. At the measured 43.7 s post-onset cost, however, $t\gtrsim5$ is about 2.53 days for one rung before the required refinements and seeds. Repair the evolved-history root-path defect and profile/optimize exact-root plus coupled-correction snapshots before restarting the ladder. See the [dispatch packet adjudication](../braid-ideal/section-86-flutter-rerun-dispatch-packet.md).
2. ~~**§97/§98 flutter magnitudes**~~ — **removed from the worklist 2026-07-14.** Adjudicated **void**, not quarantined: every §97/§98 point fails the force-balance precondition for a T2 verdict by its own recorded $\epsilon_{\rm bind}$, so the pencil linearizes about a circle the object does not follow and has no referent. Not re-runnable and not worth re-running; the load-bearing T1 non-bind negative is untouched and never used the pencil. **Apply the same test to the rest of the tier before dispatching it** — a T2 flutter row sitting on a recorded non-bind is void by construction (§96 is the next candidate). See the [adjudication](../braid-ideal/section-97-98-flutter-rerun-dispatch-packet.md).
3. **T3 dynamical set** — §83 release, §90 saturation, §92/§93 locking, §94 settling, §60 expansion — re-run as true evolutions.
4. **§99 assembly** — re-confirm the anchored pencil verdict under real evolution (force-balance non-bind already survives).

Nothing re-enters "dynamical" or "stable/unstable" status without passing the new integrator's independent oracle (O1–O6).
