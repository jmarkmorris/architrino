# Claims-Triage Ledger — post-solver-audit (2026-07-12)

**Purpose.** After the [central-solver audit](central-solver-independent-audit-2026-07-12.md) found the solver is a delayed-force/root **evaluator over prescribed orbits with no coupled integrator**, every recorded conclusion must be sorted by *what the evaluator could actually compute*. This ledger is that sort, and it doubles as the **quarantine register**: nothing here is deleted; Tier-2/Tier-3 rows are flagged `QUARANTINED — pending re-derivation on the validated integrator`.

**Tiers.**
- **T1 SURVIVES** — instantaneous delayed-force facts and **force-balance** results (does the net force/torque vanish or not on a given configuration). The kernel is validated (unit tests pass); these stand regardless of any integrator. Force-balance **negatives** ("does not balance / does not bind / does not close") are the safest of all.
- **T2 RE-ANCHOR** — linear-stability (pencil / $\mathrm{Re}\,\lambda$) verdicts. Valid only if (a) the pencil is anchored to a hand-checkable case and (b) it linearizes about an actually force-balanced configuration. Confirm each anchor, then confirm with the real integrator that predicted linear growth manifests in a true evolution.
- **T3 RE-DERIVE** — any temporal/dynamical claim (release, dispersal, settling/locking over time, amplitude growth, long-term fate, super-$c_f$ evolution). These used ad-hoc Euler or normal-form extrapolation and must be re-run.

**Method note.** Built from the memory index (the distilled conclusion register). A deeper pass through `reference/priorities/**/brainstorming.md` + work-logs can add finer-grained rows; the tiering rules above apply unchanged. Where a single entry mixes types, the claim is split.

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
| §86 axis flutter $\mathrm{Re}\,\lambda=0.199$ (genuine circulatory; rigid-fix family closed) | linear stability (reference pencil) | **T2** | **QUARANTINED** | the reference value; re-anchor + confirm growth is real in a true evolution |
| §87 wake-Ward / balanced-cell (pump $+0.424$ bound; superluminal caustic) | action/force bookkeeping | **T1/T2** | **QUARANTINED (T2 part)** | already BARRED held-to-proof; caustic is evaluator geometry |
| §88 dressed electron: pump cancels; flutter damps-not-dissolves | pump cancel / stability | **T1** + **T2** | **QUARANTINED (flutter)** | pump-cancel is force-balance (T1); flutter verdict T2 |
| §89 Lagrange-dressed: L-points unstable; enters $G$ but aggravates flutter | L-point balance / stability | **T1** + **T2** | **QUARANTINED (flutter)** | L-point locations are force-balance; instability/aggravation T2 |
| §90 nonlinear saturation ($l_1=+0.041$; grows past 1 rad by $t\approx51$) | temporal amplitude growth | **T3** | **QUARANTINED** | Stuart-Landau normal-form extrapolation off the linear pencil (already flagged) |
| §91 Kapitza: flutter not stiffness-stabilizable (circulatory) | linear-stability character | **T2** | **QUARANTINED** | re-anchor; confirm circulatory character on real integrator |
| §92/§93 contra-pair: **pump closes** ($\Delta z=1.42$) | force-balance (pump cancel) | **T1** | — | first native self-sinking; force-balance fact |
| §92/§93 contra-pair: saddle + $\mathrm{Re}\,\lambda=+5.30$ divergence | linear stability | **T2** | **QUARANTINED** | used as an anchored control in §99 (to 1e-9) → provisional; confirm dynamically |
| §92/§93 contra-pair: does **not lock** | dynamical settling | **T3** | **QUARANTINED** | "locking" is a temporal outcome |
| §94 no radiative settling | dynamical shedding | **T3** | **QUARANTINED** | radiative settling is a time-evolution claim |
| §95 dressed pair: payload has **no equilibrium** | force-balance (no equilibrium) | **T1** | — | "no force-balanced payload point" is a balance fact |
| §96 moving stacked-rings: Mach verified; **doesn't bind**; pump $+13.4$; flutter | bind/pump (T1) + flutter (T2) | **T1** + **T2** | **QUARANTINED (flutter)** | non-bind + pump are force-balance; flutter T2 |
| §97/§98 isolated-triple: **no bind, flutter-free** found | non-bind (force-balance) | **T1** | — | the binding negative survives |
| §97/§98 flutter magnitudes (pencil ~3× off validated) | linear stability, **unanchored** | **T2** | **QUARANTINED (high priority)** | explicitly unanchored (self-labeled non-corner-comparable) — re-anchor first |
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

## Summary

- **T1 SURVIVES:** the geometry/force-balance spine — cancellations, equilibria, anchors ($\kappa_{\rm eq}$, $R_M$), charge ledgers, and all the **non-bind / no-free-particle / no-equilibrium negatives** (§84, §95, §96, §97/§98, §99). The frontier pivot to the constitutive sea rests here and holds.
- **T2 RE-ANCHOR (quarantined):** every flutter/stability $\mathrm{Re}\,\lambda$ verdict (§57, §59, §86, §88, §89, §91, §92/§93, §96, §97/§98, §99, reorienting-dipole). Priority order: §97/§98 (known unanchored) worst; §99 (anchored) best; §86 (0.199 reference) pivotal.
- **T3 RE-DERIVE (quarantined):** every temporal claim (§83 dispersal, §90 growth, §92/§93 non-lock, §94 no-settling, §60 coherent expansion, §62 dt-fragility, collinear breather, native confirmation shape-loss).

## Re-run worklist for the validated integrator (in order)
1. **§86 flutter (0.199)** — the reference. Re-anchor the pencil, then evolve and check the linear growth is real. Everything T2 hangs off this.
2. **§97/§98 flutter magnitudes** — re-score with an anchored pencil (the known-bad one).
3. **T3 dynamical set** — §83 release, §90 saturation, §92/§93 locking, §94 settling, §60 expansion — re-run as true evolutions.
4. **§99 assembly** — re-confirm the anchored pencil verdict under real evolution (force-balance non-bind already survives).

Nothing re-enters "dynamical" or "stable/unstable" status without passing the new integrator's independent oracle (O1–O6).
