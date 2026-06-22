# Bounded Speed Factor Tail Cover Completeness Lemma

Promotion status: `priority-only`. This packet closes the audit gap left by [bounded-speed-factor-tail-krawczyk-certificate.md](bounded-speed-factor-tail-krawczyk-certificate.md): local bounded-speed tail predicates are not enough unless they are assembled into one finite, owned, coefficient-box persistent cover of the whole causal-time tail domain. It feeds the `tail-persistence-open` row in [bounded-speed-factor-coupled-fixed-point-theorem.md](bounded-speed-factor-coupled-fixed-point-theorem.md).

It does not retain a branch. Its only purpose is to make $\rho_{\mathrm{tail}}^{\nu}$ eligible for a bounded speed factor Krawczyk or coupled fixed-point certificate.

---

## 1. Causal-Time Tail Domain

Fix one bounded-speed branch chart, source-pair policy $\Pi_{\mathrm{src}}$, same-source policy, endpoint convention $\Pi_{\mathrm{end}}$, period or winding convention, support bound, and event convention. For each receiver site,

$$
\chi_i(\lambda_i)=\int_0^{\lambda_i}\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i=\chi_i^{-1},
\qquad
0<\nu_-\le\nu_i\le\nu_+.
$$

Let $U_i^{\mathrm{per}}=[0,H_i)$ for an equal-period row, or the declared lifted causal-time period for a winding row. The bounded-speed causal-time tail domain is

$$
\mathcal{D}_{\mathrm{tail}}^{\nu}
=
\bigsqcup_{(i,j)\in\Pi_{\mathrm{src}}}
\{(i,j)\}\times U_i^{\mathrm{per}}\times T_{\mathrm{tail}}^{\nu},
\qquad
T_{\mathrm{tail}}^{\nu}
=
(\eta_{\mathrm{mem}},B_{\mathrm{sup}}+m_\eta].
$$

The root function on this domain is

$$
G_{ij}^{\nu}(u,\eta)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta.
$$

The arithmetic cover may use closed interval hulls, but ownership is defined on half-open sets so every point of $\mathcal{D}_{\mathrm{tail}}^{\nu}$ is counted exactly once.

---

## 2. Atomic Tail Cells And Ownership Map

Let $U_{p,s}$ be a receiver causal-time cell split at receiver period cuts, source period cuts of $u-\eta$, event-window endpoints, and any inverse-time-map enclosure boundary. Let $Q_{q,s}=[a_{q,s},b_{q,s}]$ be a closed delay hull with owned delay set $O_{q,s}\subset Q_{q,s}$. An atomic bounded-speed tail cell is

$$
c=(i,j,p,q,s),
\qquad
\overline{\mathcal{Q}}_c^{\nu}
=
U_{p,s}\times Q_{q,s},
\qquad
O_c^{\nu}
=
U_{p,s}^{\mathrm{own}}\times O_{q,s}.
$$

The ownership map is a finite function

$$
\Omega_{\mathrm{tail}}^{\nu}:
\mathcal{D}_{\mathrm{tail}}^{\nu}
\to
\mathcal{C}_{\mathrm{tail}}
\sqcup
\mathcal{B}_{\mathrm{tail}}
\sqcup
\mathcal{E}_{\mathrm{tail}},
$$

where $\mathcal{C}_{\mathrm{tail}}$ are ordinary atomic cells, $\mathcal{B}_{\mathrm{tail}}$ are boundary owners, and $\mathcal{E}_{\mathrm{tail}}$ are declared event-reset owners. For ordinary cells,

$$
\Omega_{\mathrm{tail}}^{\nu}(i,j,u,\eta)=c
\quad\Longleftrightarrow\quad
(u,\eta)\in O_c^{\nu}.
$$

The map is admissible only if

$$
\mathcal{D}_{\mathrm{tail}}^{\nu}
=
\left(\bigsqcup_c \{(i,j)\}\times O_c^{\nu}\right)
\sqcup
\left(\bigsqcup_b O_b^{\nu}\right)
\sqcup
\left(\bigsqcup_e O_e^{\nu}\right).
$$

Here $O_b^{\nu}$ owns memory endpoints, period-cut faces, slab endpoints, and active-root collars assigned by $\Pi_{\mathrm{end}}$; $O_e^{\nu}$ owns a finite event surface or event window where the current tail ledger is intentionally stopped and reset.

---

## 3. Terminal Predicates

Every owned object in the map must receive exactly one terminal predicate.

| Terminal predicate | Required certificate |
| --- | --- |
| `excluded` | one distance, monotone, Lipschitz, or Newton predicate excludes $G_{ij}^{\nu}=0$ on $O_c^{\nu}$ with positive selected margin |
| `assimilated-root-tube` | a bounded-speed Krawczyk tube satisfies $K_Z^{\nu}\subset\operatorname{int}Z$, has fixed $J_{ij}^{\nu}$ sign, positive complement gap, and unique root-sheet label |
| `boundary-owned` | a memory endpoint, period-cut face, slab face, or active-root collar is assigned to exactly one adjacent ledger by $\Pi_{\mathrm{end}}$, with a one-sided collar margin preventing double ownership |
| `event-reset` | a declared event surface or event window is reached before tail persistence closes, with event normal-form data and a reset ledger identity |

For an excluded cell, the selected predicate exports

$$
m_{\mathrm{sel}}^{\nu}(c)>e_{\mathrm{sel}}^{\nu}(c).
$$

For an assimilated tube $u$, the selected tube margin is

$$
m_{\mathrm{tube}}^{\nu}(u)
=
\min
\left\{
J_u^- - \epsilon_J,\,
m_{\mathrm{Kraw}}^{\nu}(u),\,
g_u^{\mathrm{comp}}-\epsilon_G,\,
s_u^{\mathrm{sep}}
\right\}
>
e_{\mathrm{tube}}^{\nu}(u).
$$

An `event-reset` predicate is terminal for the current cover, but it is not a retained-tail status. It forces the coupled packet to report an event row before any `bounded-speed-coupled-fixed-point-candidate` status.

---

## 4. Overlap Consistency

Closed arithmetic hulls may overlap on faces. If

$$
\overline{\mathcal{Q}}_c^{\nu}
\cap
\overline{\mathcal{Q}}_d^{\nu}
\ne
\varnothing,
\qquad
c\ne d,
$$

then the owned interiors must be disjoint,

$$
O_c^{\nu}\cap O_d^{\nu}=\varnothing,
$$

and the overlap must satisfy one of the following consistency rows:

1. both cells name the same boundary owner in $\mathcal{B}_{\mathrm{tail}}$;
2. a root tube crossing the face has the same ordered source pair, tube label, sign stratum, delay interval, and force contribution on both sides;
3. two excluded cells agree that the shared face is root-free with a positive one-sided margin;
4. an event-reset owner replaces both adjacent ordinary owners on the declared event face.

Equivalently, the ledger must not contain two distinct force contributions for the same owned point:

$$
\#\left\{
o:
(i,j,u,\eta)\in O_o^{\nu}
\right\}=1
\qquad
\text{for every }(i,j,u,\eta)\in\mathcal{D}_{\mathrm{tail}}^{\nu}.
$$

---

## 5. Coefficient-Box Persistence

Let $z$ denote the active bounded-speed chart variables consumed by the tail and coupled packets. For the tail-only packet one may take $z=(a,b,\gamma)$; for the coupled packet use the full chart $z=(a,b,r,\gamma,s,e)$. Let

$$
X_\rho^{\nu}=\{z:\|z-z_0\|\le\rho\}.
$$

The cover is coefficient-box persistent on $X_\rho^{\nu}$ only if the ownership map, period-cut splits, inverse-time-map enclosures, endpoint convention, source-pair labels, terminal predicate choice, and event convention remain unchanged for every $z\in X_\rho^{\nu}$. A sufficient row is

$$
m_{\tau}^{\nu}(\ell)
-
e_{\tau}^{\nu}(\ell)
-
L_{\tau,\ell}^{\nu,z}\rho
>0
$$

for every selected ordinary cell, tube, boundary owner, and event-reset owner $\ell$. The exported tail radius is therefore

$$
\rho_{\mathrm{cover}}^{\nu}
=
\min_{\ell}
\frac{
m_{\tau}^{\nu}(\ell)-e_{\tau}^{\nu}(\ell)
}{
L_{\tau,\ell}^{\nu,z}
}.
$$

The tail radius used downstream must obey

$$
\rho_{\mathrm{tail}}^{\nu}
\le
\rho_{\mathrm{cover}}^{\nu}.
$$

If the local Krawczyk predicates pass but the ownership map or cover persistence is missing, the result is `bounded-speed-tail-cover-incomplete`, not `bounded-speed-tail-certificate-open` closed.

---

## 6. No-Gap Cover Condition

The no-gap predicate is a global finite-cover condition, not a cellwise predicate. In each ordered source pair, sort the owned receiver intervals and delay slabs after all splits. The cover passes only if:

$$
U_i^{\mathrm{per}}
=
\bigsqcup_p U_{p}^{\mathrm{own}},
\qquad
T_{\mathrm{tail}}^{\nu}
=
\bigsqcup_q O_q,
$$

with first delay ownership beginning at the open memory endpoint,

$$
O_0=(\eta_{\mathrm{mem}},b_0],
$$

and final delay ownership ending at the support bound,

$$
\max_q b_q=B_{\mathrm{sup}}+m_\eta.
$$

In certificate form, the ledger emits a cover residual

$$
\mathcal{R}_{\mathrm{cover}}^{\nu}
=
\left(
N_{\mathrm{unowned}},
N_{\mathrm{duplicate}},
\Delta_U,
\Delta_Q,
\Delta_{\mathrm{cut}},
\Delta_{\mathrm{event}}
\right),
$$

where $N_{\mathrm{unowned}}=N_{\mathrm{duplicate}}=0$, $\Delta_U=\Delta_Q=0$ are exact interval-adjacency checks, and $\Delta_{\mathrm{cut}}=\Delta_{\mathrm{event}}=0$ mean all period-cut and event-window faces have owners. The no-gap condition is

$$
\mathcal{R}_{\mathrm{cover}}^{\nu}=0
\qquad
\text{and}
\qquad
\operatorname{persist}(\Omega_{\mathrm{tail}}^{\nu})=\texttt{coefficient-box}.
$$

---

## 7. Theorem Target

**Theorem target: bounded-speed tail cover completeness.** Fix the bounded-speed data above. Suppose a finite ownership map $\Omega_{\mathrm{tail}}^{\nu}$ is emitted, every owned object has exactly one terminal predicate from Section 3, overlap consistency holds on every closed-hull intersection, the no-gap cover residual vanishes, and every selected owner has positive coefficient-box persistence on $X_\rho^{\nu}$. Then the bounded-speed support-tail row is complete on $\mathcal{D}_{\mathrm{tail}}^{\nu}$ throughout $X_\rho^{\nu}$.

If no `event-reset` owner is present, every tail point is either root-free or represented by one assimilated bounded-speed root tube. The tail certificate may export $\rho_{\mathrm{tail}}^{\nu}\le\rho_{\mathrm{cover}}^{\nu}$ to the Krawczyk chart.

If an `event-reset` owner is present, the cover is complete only up to the declared event reset. The coupled packet must report the event status and open a new ledger after the reset; it may not report retained tail persistence across the event.

Proof route:

1. the ownership identity partitions the full causal-time tail domain into finitely many owned objects;
2. the no-gap residual eliminates missing receiver, delay, period-cut, and event-window faces;
3. overlap consistency prevents duplicate roots, duplicate force entries, and mismatched boundary ownership;
4. excluded predicates remove $G_{ij}^{\nu}=0$ from their owned cells;
5. Krawczyk tube predicates give unique differentiable tail root sheets with fixed sign strata on their owned cells;
6. boundary-owned rows prevent memory endpoints and period/slab faces from being double-counted as tail roots;
7. coefficient-box persistence keeps the same partition and terminal predicates on the whole proof ball.

---

## 8. First-Failure Ordering And Status Codes

A bounded-speed tail-cover run reports the first failed row in this order:

1. `bounded-speed-tail-domain-open`
2. `bounded-speed-tail-ownership-map-open`
3. `bounded-speed-tail-no-gap-failure`
4. `bounded-speed-tail-overlap-inconsistent`
5. `bounded-speed-tail-boundary-owner-open`
6. `bounded-speed-tail-event-reset-open`
7. `bounded-speed-tail-cell-uncertified`
8. `bounded-speed-tail-root-tube-uncertified`
9. `bounded-speed-tail-coefficient-box-open`
10. `bounded-speed-tail-cover-incomplete`
11. `bounded-speed-tail-cover-complete`
12. `bounded-speed-tail-cover-complete-event-reset`

| Status | Meaning |
| --- | --- |
| `bounded-speed-tail-domain-open` | $\mathcal{D}_{\mathrm{tail}}^{\nu}$, $T_{\mathrm{tail}}^{\nu}$, period/winding convention, or source-pair policy is not declared |
| `bounded-speed-tail-ownership-map-open` | the finite map $\Omega_{\mathrm{tail}}^{\nu}$ is missing or does not assign owners |
| `bounded-speed-tail-no-gap-failure` | some tail point is unowned, duplicated, or not covered through the support bound |
| `bounded-speed-tail-overlap-inconsistent` | adjacent closed hulls disagree on boundary owner, root label, predicate, or force contribution |
| `bounded-speed-tail-boundary-owner-open` | memory endpoint, period cut, slab face, or active-root collar lacks a one-sided owner |
| `bounded-speed-tail-event-reset-open` | an event surface is detected without normal-form and reset-ledger data |
| `bounded-speed-tail-cell-uncertified` | an ordinary owned cell has no positive exclusion predicate |
| `bounded-speed-tail-root-tube-uncertified` | a proposed tube lacks Krawczyk inclusion, sign floor, complement gap, or separation |
| `bounded-speed-tail-coefficient-box-open` | terminal predicates are pointwise only or have no positive persistence radius |
| `bounded-speed-tail-cover-incomplete` | local predicates pass but the global finite cover predicate has not closed |
| `bounded-speed-tail-cover-complete` | the full tail cover is coefficient-box persistent and has no event reset |
| `bounded-speed-tail-cover-complete-event-reset` | the cover is complete only up to a declared event reset |

---

## 9. Output Schema

A bounded-speed tail-cover run must emit:

| Field | Payload |
| --- | --- |
| `cover_id` | branch chart, coefficient box, source-pair policy, same-source policy, endpoint convention, period/winding convention, event convention, and row weights |
| `tail_domain_nu` | $\mathcal{D}_{\mathrm{tail}}^{\nu}$, $U_i^{\mathrm{per}}$, $T_{\mathrm{tail}}^{\nu}$, $B_{\mathrm{sup}}$, $m_\eta$, and memory endpoint convention |
| `atomic_tail_cells_nu` | finite list of $(i,j,p,q,s)$ cells, closed hulls $\overline{\mathcal{Q}}_c^{\nu}$, owned sets $O_c^{\nu}$, and split reasons |
| `ownership_map_nu` | $\Omega_{\mathrm{tail}}^{\nu}$, boundary owners, event-reset owners, and exact disjoint accounting identity |
| `terminal_predicates` | one of `excluded`, `assimilated-root-tube`, `boundary-owned`, or `event-reset` for every owner |
| `overlap_consistency` | face-adjacency rows, shared boundary owners, matching tube labels, and no duplicate force contribution |
| `coefficient_box_persistence` | $X_\rho^{\nu}$, selected margins, errors, sensitivity bounds, $\rho_{\mathrm{cover}}^{\nu}$, and pointwise/coefficient-box status |
| `no_gap_cover` | $\mathcal{R}_{\mathrm{cover}}^{\nu}$, sorted receiver/delay adjacency, period-cut owners, event-window owners, and support-bound endpoint |
| `tail_radius_export` | $\rho_{\mathrm{tail}}^{\nu}\le\rho_{\mathrm{cover}}^{\nu}$, limiting owner, limiting predicate, and downstream eligibility |
| `status` | first failed status, `bounded-speed-tail-cover-complete`, or `bounded-speed-tail-cover-complete-event-reset` |

Current status before such a run is

$$
\texttt{bounded-speed-tail-cover-incomplete},
\qquad
\texttt{tail-persistence-open},
\qquad
\texttt{not-retained}.
$$
