# Bounded Speed Factor All-Pairs Ledger Handoff Contract

Promotion status: `priority-only`. This packet sits between the fixed rigid-octahedral all-pairs certificate in [Octahedral Root Ledger Certification Target](../neutral-braid/octahedral-root-ledger-certification-target.md), the general neutral braid ledger in [All Pairs Root Ledger](../neutral-braid/all-pairs-root-ledger.md), the bounded-speed root-sheet formulas in [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md), and the coupled residual object in [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md).

The incremental value is narrow: the fixed-speed octahedral payload now certifies the $30$ ordered distinct source pairs on one rigid carrier, but a bounded-speed solve changes the clocks, delayed source phases, root equations, source-normal root charts, receiver-normal branch weights, derivative columns, tail cells, and event surfaces. This packet prevents that fixed-speed success marker from being consumed as a bounded-speed live ledger. It strengthens the existing `ledger-convention-mismatch`, `root-ledger-persistence-failure`, `implicit-consumer-stale`, and `derivative-block-stale` rows; it does not add an independent retained-branch gate.

---

## 1. Fixed-Speed Source Ledger

Let the certified fixed-speed rigid-octahedral source ledger be

$$
\mathcal{L}_{\mathrm{oct}}^{1}
=
\left(
\Pi_{\mathrm{all}}^{\mathrm{oct}},
\mathcal{T}_{\theta},
\mathcal{A}_{\mathrm{oct}}^{1},
\mathcal{I}_{\mathrm{oct}}^{1},
h_{\mathrm{mem}}^{1},
J_{0}^{1},
\mathsf{Chk}_{\Pi}^{1},
\mathsf{Chk}_{\mathrm{root}}^{1}
\right).
$$

The emitted certificate has

$$
|\Pi_{\mathrm{all}}^{\mathrm{oct}}|=30,
\qquad
h_{\mathrm{mem}}^{1}=2,
\qquad
J_0^1\approx0.379856290603,
$$

with one positive-delay root for each ordered distinct pair, complete inactive-gap ownership on $(0,2]$, ordinary same-source rows excluded, and no tail beyond the support bound. Its valid status is

$$
\texttt{all-pairs-root-ledger-certified}.
$$

This status certifies only the fixed carrier root ledger. It may seed bounded-speed root labels, initial brackets, and equality-row checksums, but it is not a bounded-speed live ledger unless the rows in this packet are rebuilt and certified.

The frozen fixed-ledger speed-ODE diagnostic in [Octahedral Speed Ode Diagnostic](../neutral-braid/octahedral-speed-ode-diagnostic.md) is still a source-side screen. It consumes $\mathcal{L}_{\mathrm{oct}}^{1}$ and reports `sampled-speed-ode-zero-mean-failed`, but it does not change the handoff status because it does not rebuild $\chi_i$, $\Lambda_i$, $G_r^\nu$, $J_r^\nu$, root derivatives, tail ownership, or downstream consumer checksums.

---

## 2. Bounded-Speed Target Ledger

A bounded-speed consumer must build a live ledger

$$
\mathcal{L}_{\mathrm{live}}^{\nu}
=
\left(
\Pi_{\mathrm{all}},
\mathcal{U}^{\nu},
\chi,
\Lambda,
\mathcal{A}_{\mathrm{all}}^{\nu,+},
\mathcal{I}_{\mathrm{all}}^{\nu},
\mathcal{T}_{\mathrm{tail}}^{\nu},
\mathcal{J}^{\nu},
\mathcal{D}_{\mathrm{root}}^{\nu},
\mathsf{Chk}_{\mathrm{live}}^{\nu}
\right),
$$

where $\mathcal{U}^{\nu}$ is the causal-time receiver cover, $\chi_i$ and $\Lambda_i$ are the bounded-speed clock maps, $\mathcal{A}_{\mathrm{all}}^{\nu,+}$ is the active root set after any tail assimilation, $\mathcal{I}_{\mathrm{all}}^{\nu}$ is the inactive-gap cover, $\mathcal{T}_{\mathrm{tail}}^{\nu}$ is the finite tail exclusion or assimilation cover, $\mathcal{J}^{\nu}$ contains sign labels and Jacobian floors, and $\mathcal{D}_{\mathrm{root}}^{\nu}$ contains root-sheet, Jacobian, and force derivative columns.

For each root label $r=(i,j,\alpha)$ the bounded-speed equation is

$$
G_r^{\nu}(u,\eta_r;\mathbf{Y},\nu)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta_r))
\right\|
-\eta_r
=0,
$$

with

$$
J_r^{\nu}
=
1-\nu_j(\lambda_j^-)
\mathbf{T}_j(\lambda_j^-)\cdot\widehat{\mathbf{R}}_r,
\qquad
\lambda_j^-=\Lambda_j(u-\eta_r).
$$

The fixed-speed certificate is recovered only on the special slice

$$
\nu_i\equiv1,
\qquad
\chi_i=\Lambda_i=\mathrm{id},
\qquad
\mathbf{Y}_i=\mathbf{x}_i^{\mathrm{oct}},
$$

with the fixed support and phase convention. Leaving that slice changes $G_r^{\nu}$ and $J_r^{\nu}$, so the root set and all downstream receiver-normal branch weights must be recomputed.

---

## 3. Handoff Rows

The handoff map

$$
\mathsf{H}_{1\to\nu}:
\mathcal{L}_{\mathrm{oct}}^{1}
\leadsto
\mathcal{L}_{\mathrm{live}}^{\nu}
$$

is accepted only when the following rows are emitted on one bounded-speed ledger identity.

| Row | Required payload |
| --- | --- |
| `source_ledger_reference` | fixed source artifact id, fixed-speed-special-case flag, $\mathsf{Chk}_{\Pi}^{1}$, $\mathsf{Chk}_{\mathrm{root}}^{1}$, delay bounds, $J_0^1$, and ordinary same-source policy |
| `bounded_chart` | coefficient vector $z=(a,b,r,\gamma,s,e)$ or declared subchart, support descriptor, period or winding convention, endpoint convention, row weights, and gauge rows |
| `clock_lift` | $\nu_i$, speed band, $\chi_i$, $\Lambda_i$, $H_i$, inverse-clock derivatives, and the map from fixed phase cells to causal-time cells where a continuation seed is claimed |
| `pair_policy_handoff` | $\Pi_{\mathrm{all}}$ with $30$ ordered distinct source pairs, no unordered compression, and equality rows for any shell braid or nested shell braid reduction |
| `root_label_handoff` | for every fixed seed label, either a certified bounded-speed root tube, a certified event/reset status, or an explicit dropped-label reason tied to a ledger reset |
| `active_root_equations` | $G_r^{\nu}=0$, delay brackets, delay floors, owner cells, positive memory status, and source provenance for every retained root in $\mathcal{A}_{\mathrm{all}}^{\nu,+}$ |
| `inactive_gap_cover` | disjoint inactive cells with certified predicates on the bounded-speed $G_r^{\nu}$, not inherited fixed-speed gap predicates |
| `jacobian_floor` | sign labels $\zeta_r$, floors $\zeta_rJ_r^{\nu}\ge J_0^{\nu}>0$, and proof-ball persistence radii |
| `tail_interface` | support-complete route or finite tail cover on $(h_{\mathrm{mem}},\eta_{\mathrm{sup}}]$, terminal predicates, assimilated root sheets, $\epsilon_{\mathcal{F}}^{\mathrm{tail},\nu}$, and rerun status |
| `root_derivative_columns` | $d\eta_r/du$, $D_v\eta_r$, $D_vJ_r^{\nu}$, $D_vW_{r,\nu}^{\mathrm{rec}}$, $D_v\widehat{\mathbf{R}}_r$, and $D_v\mathbf{f}_r^{\nu}$ for all active curve, speed, clock, inverse-clock, root, support, action, and event variables consumed downstream |
| `force_checksum` | all-pairs force row $F_i^{\nu}$, source signs, delay weights, receiver-normal $W_{r,\nu}^{\mathrm{rec}}$ weights, self/medium/support terms, and the active root set used by tangent, normal, support, action, and event rows |
| `consumer_checksum` | one hash or structured checksum tying dynamics, support, action, event, Krawczyk, stability, and observer-export consumers to the same $\mathcal{A}_{\mathrm{all}}^{\nu,+}$, inactive gaps, tail convention, clock maps, and row weights |

A fixed-speed source row may appear in `source_ledger_reference`; it may not replace any bounded-speed row from `clock_lift` through `consumer_checksum`.

---

## 4. Derivative And Schur Consumption

Let $x=(a,b,s,\gamma,e)$ denote outer bounded-speed variables and let $r$ denote root-sheet corrector variables. If roots are eliminated before the coupled Krawczyk calculation, the handoff must emit

$$
\mathcal{R}_{R}^{\nu}(x,r)=0,
\qquad
D_r\mathcal{R}_{R}^{\nu}
\text{ invertible on the proof ball}.
$$

Every downstream row $\mathcal{R}_{O}^{\nu}$ that consumes the eliminated roots must use

$$
D\widehat{\mathcal{R}}_{O}^{\nu}
=
D_x\mathcal{R}_{O}^{\nu}
-
D_r\mathcal{R}_{O}^{\nu}
\left(
D_r\mathcal{R}_{R}^{\nu}
\right)^{-1}
D_x\mathcal{R}_{R}^{\nu}.
$$

Thus the fixed-speed root certificate supplies only starting labels and a fixed-slice check. A bounded-speed residual that freezes $\eta_r$, $J_r$, delayed directions, tail predicates, support multipliers, action scale, or event endpoints after $a$ or $b$ moves has not crossed the handoff.

---

## 5. First-Failure Ordering

A handoff packet must report the first applicable status in this order:

1. `bounded-speed-ledger-handoff-open`
2. `source-ledger-reference-open`
3. `fixed-speed-special-case`
4. `bounded-chart-open`
5. `clock-lift-open`
6. `pair-policy-handoff-mismatch`
7. `root-label-handoff-open`
8. `root-equation-open`
9. `inactive-root-gap-failure`
10. `root-jacobian-floor-failure`
11. `tail-persistence-open`
12. `root-derivative-columns-open`
13. `force-checksum-mismatch`
14. `consumer-checksum-mismatch`
15. `implicit-consumer-stale`
16. `derivative-block-stale`
17. `ledger-convention-mismatch`
18. `bounded-speed-live-ledger-handoff-candidate`

The status `fixed-speed-special-case` is not a failure of the fixed-speed certificate. It means the packet has not left $\nu_i\equiv1$ and therefore cannot be consumed as a bounded-speed candidate. The status `bounded-speed-live-ledger-handoff-candidate` means only that the bounded-speed ledger is coherent enough to feed $\mathfrak{C}_{\mathrm{cpl}}^{\nu}$; it does not close the coupled fixed-point theorem and does not retain a branch.

---

## 6. Theorem Target

**Theorem target: bounded-speed all-pairs ledger handoff.** Fix a certified fixed-speed source ledger $\mathcal{L}_{\mathrm{oct}}^{1}$, a bounded-speed branch chart, a coefficient box $X$, one support descriptor, one period or winding convention, one event convention, and one row-weight convention. Suppose a solver emits:

1. a source-ledger reference to $\mathcal{L}_{\mathrm{oct}}^{1}$ without claiming bounded-speed validity from fixed-speed rows alone;
2. bounded-speed clock maps $\chi_i$, $\Lambda_i$, periods $H_i$, speed-band margins, and derivative columns on $X$;
3. the ordered all-pairs policy $\Pi_{\mathrm{all}}$ with equality rows for every optional shell braid or nested shell braid reduction;
4. a bounded-speed active-root and inactive-gap cover for every ordered distinct source pair on the declared causal-time cells;
5. positive delay floors, fixed Jacobian sign strata, positive bounded-speed Jacobian floors, and root persistence radii on $X$;
6. a support-complete memory route or finite tail exclusion/assimilation cover, with rerun instructions whenever tail assimilation changes $\mathcal{A}_{\mathrm{all}}^{\nu,+}$;
7. full root, Jacobian, delayed-direction, receiver-normal branch-weight, support, action, event, and clock derivative columns, or a Schur replacement using the displayed implicit derivative;
8. downstream checksums proving that dynamics, support, action, event, Krawczyk, stability, and observer-export rows consume the same $\mathcal{L}_{\mathrm{live}}^{\nu}$.

Then the fixed-speed all-pairs certificate has been validly handed off into a bounded-speed live-ledger candidate on $X$. The coupled residual $\mathfrak{C}_{\mathrm{cpl}}^{\nu}$ may consume that ledger. If any row fails, the solver must stop at the first-failure status above rather than treating the fixed-speed root certificate as a bounded-speed proof row.

Current status:

$$
\texttt{bounded-speed-ledger-handoff-open}.
$$
