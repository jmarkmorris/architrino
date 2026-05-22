# Central Inventory And Event Ledgers

Promotion status: `priority-only`. This document is a theorem/proof-target packet for the same-level tri-binary architecture. It does not migrate corpus prose, simulation fixtures, app assets, or Archie terminology. Its job is to make the central-inventory and event-ledger obligations explicit enough that a retained branch certificate can later decide whether the same-level architecture replaces the former axial / polar-charge bookkeeping.

Source posture: read this packet with [swarm-architecture.md](swarm-architecture.md) and [swarm.md](../swarm.md). The equations below are closure targets, not completed conservation proofs.

---

## 1. Ledger Objects

Let a retained branch $B$ carry a finite labeled architrino set

$$
A_B=\{a_1,\ldots,a_{N_B}\},
\qquad
\sigma_a\in\{+1,-1\},
\qquad
q_a=\sigma_a\epsilon,
\qquad
\epsilon=\frac{|e|}{6}.
$$

The integer inventory row is

$$
N_+(B)=\sum_{a\in A_B}\mathbf{1}_{\sigma_a=+1},
\qquad
N_-(B)=\sum_{a\in A_B}\mathbf{1}_{\sigma_a=-1},
$$

$$
N(B)=N_+(B)+N_-(B),
\qquad
Q(B)=\epsilon\left(N_+(B)-N_-(B)\right).
$$

The same retained row also carries the branch state and history data

$$
\mathcal{B}
=
\left(
A_B,
X_B,
\mathcal{H}_B,
\mathcal{I}_B,
\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{(B)}
\right),
$$

where $\mathcal{I}_B$ is the integer inventory ledger and $\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{(B)}$ is the event ledger for energy, momentum, angular momentum, charge, and source provenance.

---

## 2. Neutral Noether-Core Inventory

A neutral Noether core is a six-architrino branch with

$$
N(B)=6,
\qquad
N_+(B)=N_-(B)=3,
\qquad
Q(B)=0.
$$

For a neutral three-binary same-level site set, this integer row also implies the source-site inventory in [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md):

$$
N_{\mathrm{attr}}(i)=3,
\qquad
N_{\mathrm{rep}}(i)=2
$$

for each receiver $i$, excluding itself. This row is a structural inventory bias only; weighted delayed force closure still depends on root delays, Jacobians, directions, multiplicities, and any self or medium-response rows.

For the same-level architecture, its bookkeeping split is

$$
\mathcal{I}_{\mathrm{core}}
=
\left(
N_+,N_-;
C_{\mathrm{cent}},
S_{\mathrm{chor}}
\right)
=
\left(
3,3;
(0,0),
(3,3)
\right).
$$

Here $S_{\mathrm{chor}}$ is the neutral same-level choreography inventory. $C_{\mathrm{cent}}=(0,0)$ means the neutral Noether-core row has no uncompensated central inventory.

Proof target: show that the neutral choreography row can be represented by noncolliding architrino worldlines whose retained causal-root ledger has finite active roots, a positive Jacobian floor, finite memory depth, fixed-speed tangent closure or bounded-speed speed-ODE closure, and closed history-dressed energy.

---

## 3. Charged Twelve-Architrino Fermion Inventory

A charged fermion branch is a twelve-architrino branch

$$
N(B)=12,
\qquad
N_+(B)+N_-(B)=12.
$$

Define the integer charge index

$$
k_B=N_+(B)-N_-(B)=\frac{Q(B)}{\epsilon}=6\frac{Q(B)}{e}.
$$

Then

$$
N_+(B)=\frac{12+k_B}{2},
\qquad
N_-(B)=\frac{12-k_B}{2},
\qquad
k_B\in 2\mathbb{Z},
$$

with the phenomenology-facing rows restricted by later Standard Model recovery gates. For the usual charge units,

| Observer charge | $k_B$ | $N_+$ | $N_-$ |
| --- | ---: | ---: | ---: |
| $-e$ | $-6$ | $3$ | $9$ |
| $-\frac{2}{3}e$ | $-4$ | $4$ | $8$ |
| $-\frac{1}{3}e$ | $-2$ | $5$ | $7$ |
| $+\frac{1}{3}e$ | $2$ | $7$ | $5$ |
| $+\frac{2}{3}e$ | $4$ | $8$ | $4$ |
| $+e$ | $6$ | $9$ | $3$ |

The default same-level split keeps the visible choreography neutral:

$$
S_{\mathrm{chor}}=(3,3),
$$

and places the uncompensated integer charge in the central inventory row

$$
C_{\mathrm{cent}}(B)
=
\left(
\frac{6+k_B}{2},
\frac{6-k_B}{2}
\right).
$$

Thus

$$
\mathcal{I}_B
=
\left(
N_+(B),N_-(B);
C_{\mathrm{cent}}(B),
S_{\mathrm{chor}}
\right),
$$

with

$$
N_\pm(B)=C_{\mathrm{cent},\pm}(B)+S_{\mathrm{chor},\pm},
\qquad
Q(B)=\epsilon\left(C_{\mathrm{cent},+}-C_{\mathrm{cent},-}\right).
$$

Example: an electron-like row has

$$
k_B=-6,
\qquad
C_{\mathrm{cent}}=(0,6),
\qquad
S_{\mathrm{chor}}=(3,3),
\qquad
Q=-e.
$$

The central inventory is a ledger row. It is not permission to place unresolved point charges at $\mathbf{C}(t)$ or to bypass the same-level branch certificate.

---

## 4. Central Inventory Versus Same-Level Choreography

The branch state must separate two obligations:

| Obligation | Mathematical role | What must not be assumed |
| --- | --- | --- |
| $C_{\mathrm{cent}}$ | integer count of uncompensated polarity in the branch inventory | a literal singular pile of point charges at the branch center |
| $S_{\mathrm{chor}}$ | neutral six-architrino same-level choreography | automatic stability, automatic shielding, or automatic Lorentz export |
| $X_B,\mathcal{H}_B$ | realized worldlines and retained history | permission to discard tangent roots or near-zero self roots |
| $\mathcal{L}_{E\mathbf{p}\mathbf{J}Q}^{(B)}$ | conservation and provenance ledger | permission to hide missing energy, charge, recoil, or medium updates |

A physical representative must declare, for every $a\in A_B$, either a resolved worldline $\mathbf{x}_a(t)$ or an explicitly regularized support with regulator $\eta>0$. For point representatives over a window $W$,

$$
d_{\min}^{(B)}
=
\inf_{\substack{a\ne b\\ t\in W}}
\left\|\mathbf{x}_a(t)-\mathbf{x}_b(t)\right\|
>
\epsilon_x.
$$

If a central-inventory label is not resolved as a noncolliding point worldline, then its row must be assigned a regularized status:

$$
\mathrm{status}(a)
\in
\{
\texttt{absent-by-policy},
\texttt{regularized-fold-layer},
\texttt{split-source-retained},
\texttt{reject}
\}.
$$

The branch is rejected unless all central-inventory labels avoid singular coincidence by an allowed resolved or regularized status and the associated causal-root Jacobians satisfy

$$
0<\epsilon_J
<
\inf_{(a,b,t,s)\in\mathcal{A}_B}
|J_{ab}(t,s)|.
$$

In the fixed-speed special case, the same-level choreography row must also close the tangential residual. Relative to the branch center $\mathbf{C}(t)$, use

$$
\mathbf{u}_a(t)=\dot{\mathbf{x}}_a(t)-\dot{\mathbf{C}}(t),
\qquad
\mathcal{R}_{\mathrm{tan},a}(t)
=
\mathbf{u}_a(t)\cdot
\left[
\sum_{(b,s)\in\mathcal{A}_a(t)}
\mathbf{F}_{ab}(t,s)
-
\ddot{\mathbf{C}}(t)
\right],
$$

within the declared tolerance. Central inventory cannot compensate for an open same-level choreography residual.

In the bounded speed factor case, this pointwise fixed-speed row is replaced by the scalar speed equation, primitive excursion, speed-band feasibility, and clock/length row from [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), plus the support/action exchange rows if free-support constraints are active. Central inventory cannot compensate for an open speed-ODE, support, or action ledger either.

---

## 5. Event Ledger Convention

For an event $e$ over $[t_-,t_+]$, let $\mathcal{B}_{\mathrm{in}}(e)$ and $\mathcal{B}_{\mathrm{out}}(e)$ be the incoming and outgoing retained branch multisets. For any scalar or vector quantity $X$,

$$
\Delta X_{\mathrm{branch}}(e)
=
\sum_{B\in\mathcal{B}_{\mathrm{out}}(e)}X(B;t_+)
-
\sum_{B\in\mathcal{B}_{\mathrm{in}}(e)}X(B;t_-).
$$

The Noether-Sea update row is

$$
\Delta\mathcal{S}_{\mathrm{sea}}(e)
=
\left(
\Delta N_{+,\mathrm{sea}},
\Delta N_{-,\mathrm{sea}},
\Delta E_{\mathrm{sea}},
\Delta\mathbf{p}_{\mathrm{sea}},
\Delta\mathbf{J}_{\mathrm{sea}},
\Delta\rho_{\text{core}},
\Delta\chi_{\text{sea}}
\right).
$$

The event ledger is the tuple

$$
\mathcal{L}_e
=
\left(
\Delta A_e,
\Delta\mathcal{S}_{\mathrm{sea}}(e),
\Delta E_{\mathrm{coh}}(e),
\Delta\mathbf{p}_{\mathrm{coh}}(e),
\Delta\mathbf{J}_{\mathrm{coh}}(e),
\Delta E_{\mathrm{recoil}}(e),
\Delta\mathbf{p}_{\mathrm{recoil}}(e),
\Delta\mathbf{J}_{\mathrm{recoil}}(e),
\Delta E_{\mathrm{boundary}}(e),
B_{\mathrm{heat}}(e)\ \text{if admitted}
\right),
$$

where $\Delta A_e$ is the source-provenance row for labeled architrinos, $\Delta E_{\mathrm{coh}},\Delta\mathbf{p}_{\mathrm{coh}},\Delta\mathbf{J}_{\mathrm{coh}}$ cover named coherent outputs such as photon branches, $\Delta E_{\mathrm{boundary}}$ covers declared boundary exchange, and $B_{\mathrm{heat}}$ is present only under the heat-channel restriction in Section 8.

When the heat-channel row is not admitted, set $B_{\mathrm{heat}}(e)=0$ and omit $\mathcal{R}_{\mathrm{heat}}$ from the event certificate.

The convention is out-minus-in. A closed event has zero total residual after all named branch, coherent, recoil, boundary, and Noether-Sea updates are included.

---

## 6. Source-Provenance Equations

Let $\mu_a^{\mathrm{in}}(e),\mu_a^{\mathrm{out}}(e)\in\{0,1\}$ record whether architrino label $a$ belongs to a named incoming or outgoing branch at event $e$. Let

$$
s_a^{\mathrm{sea}\to\mathrm{branch}}(e),
\qquad
s_a^{\mathrm{branch}\to\mathrm{sea}}(e)
$$

record transfer between branch inventory and the Noether Sea. The source-provenance residual is

$$
\mathcal{R}_{\mathrm{src},a}(e)
=
\mu_a^{\mathrm{out}}(e)
-
\mu_a^{\mathrm{in}}(e)
-
s_a^{\mathrm{sea}\to\mathrm{branch}}(e)
+
s_a^{\mathrm{branch}\to\mathrm{sea}}(e).
$$

The event passes source provenance only if

$$
\mathcal{R}_{\mathrm{src}}(e)
=
\sum_a
\left|
\mathcal{R}_{\mathrm{src},a}(e)
\right|
=0.
$$

Charge conservation is then a separate observable residual, not a substitute for label provenance:

$$
\mathcal{R}_Q(e)
=
\Delta Q_{\mathrm{branch}}(e)
+
\epsilon
\left(
\Delta N_{+,\mathrm{sea}}(e)-\Delta N_{-,\mathrm{sea}}(e)
\right)
+
\Delta Q_{\mathrm{coh}}(e)
+
\Delta Q_{\mathrm{boundary}}(e).
$$

The target is

$$
\mathcal{R}_{\mathrm{src}}(e)=0,
\qquad
\mathcal{R}_Q(e)=0.
$$

This two-row requirement prevents a reaction from closing charge numerically while leaving outgoing architrinos without a declared source.

---

## 7. Pair Production Target

For a fermion branch $B_k$ with charge index $k$ and its antimatter branch $B_{-k}$,

$$
\mathcal{I}_{B_k}
=
\left(
\frac{12+k}{2},
\frac{12-k}{2};
\left(\frac{6+k}{2},\frac{6-k}{2}\right),
(3,3)
\right),
$$

$$
\mathcal{I}_{B_{-k}}
=
\left(
\frac{12-k}{2},
\frac{12+k}{2};
\left(\frac{6-k}{2},\frac{6+k}{2}\right),
(3,3)
\right).
$$

The produced pair has

$$
N_+(B_k)+N_+(B_{-k})=12,
\qquad
N_-(B_k)+N_-(B_{-k})=12,
\qquad
Q(B_k)+Q(B_{-k})=0.
$$

The pair-production provenance row is

$$
\mathsf{A}_{B_k}
\dot{\cup}
\mathsf{A}_{B_{-k}}
\subseteq
\mathsf{A}_{\mathrm{sea\ source}}(e)
\dot{\cup}
\mathsf{A}_{\mathrm{incoming\ branches}}(e),
$$

with equality after the event ledger includes returned, recoil, boundary, and Noether-Sea labels. Here $\dot{\cup}$ denotes disjoint union of labels in the ledger.

The pair-production event target is

$$
\gamma_{\mathrm{in}}
+
\Delta\mathcal{S}_{\mathrm{sea}}^{-}
\longrightarrow
B_k+B_{-k}
+
\Delta\mathcal{S}_{\mathrm{sea}}^{+}
+
\Gamma_{\mathrm{out}}
+
\mathrm{recoil},
$$

where $\gamma_{\mathrm{in}}$ and $\Gamma_{\mathrm{out}}$ are coherent photon-branch rows when present, not mandatory notation for every event. The residual conditions are

$$
\mathcal{R}_{\mathrm{src}}(e)=0,
\qquad
\mathcal{R}_Q(e)=0,
\qquad
\mathcal{R}_E(e)=0,
\qquad
\mathcal{R}_{\mathbf{p}}(e)=\mathbf{0},
\qquad
\mathcal{R}_{\mathbf{J}}(e)=\mathbf{0}.
$$

Failure to supply the source labels for the $24$ outgoing branch architrinos is `pair-source-provenance-open`, even when the net charge row is zero.

---

## 8. Reaction Conservation Residuals

A generic reaction row has the symbolic form

$$
\sum_\alpha n_\alpha B_{k_\alpha}^{\mathrm{in}}
+
\Gamma_{\mathrm{in}}
+
\Delta\mathcal{S}_{\mathrm{sea}}^{-}
\longrightarrow
\sum_\beta m_\beta B_{\ell_\beta}^{\mathrm{out}}
+
\Gamma_{\mathrm{out}}
+
\Delta\mathcal{S}_{\mathrm{sea}}^{+}
+
\mathrm{recoil}
+
\mathrm{boundary}.
$$

The integer inventory residuals are

$$
\mathcal{R}_{N_+}(e)
=
\sum_\beta m_\beta N_+(B_{\ell_\beta})
-
\sum_\alpha n_\alpha N_+(B_{k_\alpha})
+
\Delta N_{+,\mathrm{sea}}(e)
+
\Delta N_{+,\mathrm{boundary}}(e),
$$

$$
\mathcal{R}_{N_-}(e)
=
\sum_\beta m_\beta N_-(B_{\ell_\beta})
-
\sum_\alpha n_\alpha N_-(B_{k_\alpha})
+
\Delta N_{-,\mathrm{sea}}(e)
+
\Delta N_{-,\mathrm{boundary}}(e).
$$

The charge residual may be written equivalently as

$$
\mathcal{R}_Q(e)
=
\epsilon
\left(
\mathcal{R}_{N_+}(e)-\mathcal{R}_{N_-}(e)
\right)
+
\Delta Q_{\mathrm{coh}}(e).
$$

The energy, momentum, and angular-momentum residuals are

$$
\mathcal{R}_E(e)
=
\Delta E_{\mathrm{branch}}(e)
+
\Delta E_{\mathrm{sea}}(e)
+
\Delta E_{\mathrm{coh}}(e)
+
\Delta E_{\mathrm{recoil}}(e)
+
\Delta E_{\mathrm{boundary}}(e)
+
B_{\mathrm{heat}}(e),
$$

$$
\mathcal{R}_{\mathbf{p}}(e)
=
\Delta\mathbf{p}_{\mathrm{branch}}(e)
+
\Delta\mathbf{p}_{\mathrm{sea}}(e)
+
\Delta\mathbf{p}_{\mathrm{coh}}(e)
+
\Delta\mathbf{p}_{\mathrm{recoil}}(e)
+
\Delta\mathbf{p}_{\mathrm{boundary}}(e),
$$

$$
\mathcal{R}_{\mathbf{J}}(e)
=
\Delta\mathbf{J}_{\mathrm{branch}}(e)
+
\Delta\mathbf{J}_{\mathrm{sea}}(e)
+
\Delta\mathbf{J}_{\mathrm{coh}}(e)
+
\Delta\mathbf{J}_{\mathrm{recoil}}(e)
+
\Delta\mathbf{J}_{\mathrm{boundary}}(e).
$$

The closure target is

$$
\left(
\mathcal{R}_{N_+},
\mathcal{R}_{N_-},
\mathcal{R}_Q,
\mathcal{R}_E,
\mathcal{R}_{\mathbf{p}},
\mathcal{R}_{\mathbf{J}}
\right)
=
\left(
0,0,0,0,\mathbf{0},\mathbf{0}
\right),
$$

under the same active causal-root, regulator, endpoint, and branch-history convention used for the retained branch certificate.

Heat-channel restriction: $B_{\mathrm{heat}}(e)$ may be named only after coherent photon output, recoil, bound-remnant change, reaction products, boundary exchange, and Noether-Sea medium update are either populated or explicitly ruled out. Heat is not a hidden loss term. If $B_{\mathrm{heat}}$ is present, its admissibility residual is

$$
\mathcal{R}_{\mathrm{heat}}(e)
=
B_{\mathrm{heat}}(e)
-
\left[
-\Delta E_{\mathrm{branch}}
-\Delta E_{\mathrm{sea}}
-\Delta E_{\mathrm{coh}}
-\Delta E_{\mathrm{recoil}}
-\Delta E_{\mathrm{boundary}}
\right],
$$

and this row is evaluated only after all bracketed channels have named entries. Momentum and angular-momentum residuals cannot be assigned to heat alone; their carrier must be a branch, coherent output, recoil object, boundary term, or Noether-Sea update.

---

## 9. Recoil And Noether-Sea Update Rows

If recoil is invoked, the receiving object or branch set $\mathrm{Rec}(e)$ must be named. The recoil residual is

$$
\mathcal{R}_{\mathrm{recoil}}(e)
=
\left(
\Delta E_{\mathrm{recoil}}-\sum_{R\in\mathrm{Rec}(e)}\Delta E_R,
\Delta\mathbf{p}_{\mathrm{recoil}}-\sum_{R\in\mathrm{Rec}(e)}\Delta\mathbf{p}_R,
\Delta\mathbf{J}_{\mathrm{recoil}}-\sum_{R\in\mathrm{Rec}(e)}\Delta\mathbf{J}_R
\right).
$$

The target is

$$
\mathcal{R}_{\mathrm{recoil}}(e)=\left(0,\mathbf{0},\mathbf{0}\right).
$$

The Noether-Sea update must be computed from the same event interval and the same branch histories:

$$
\mathcal{R}_{\mathrm{sea}}(e)
=
\Delta\mathcal{S}_{\mathrm{sea}}(e)
-
\mathsf{U}_{\mathrm{sea}}
\left(
e;
\{X_B,\mathcal{H}_B\}_{B\in\mathcal{B}_{\mathrm{in}}\cup\mathcal{B}_{\mathrm{out}}},
\eta,
\mathcal{A}_e
\right),
$$

where $\mathsf{U}_{\mathrm{sea}}$ is the still-open Noether-Sea update extraction target and $\mathcal{A}_e$ is the event's retained causal-root ledger. Until $\mathsf{U}_{\mathrm{sea}}$ is supplied, event rows that rely on medium exchange must remain `not_computed` or `failed`, not promoted by implication.

---

## 10. Event-Ledger Closure Vector

The event certificate row is

$$
\mathcal{R}_{\mathrm{event}}(e)
=
\left(
\mathcal{R}_Q,
\mathcal{R}_E,
\mathcal{R}_{\mathbf{p}},
\mathcal{R}_{\mathbf{J}},
\mathcal{R}_{\mathrm{src}},
\mathcal{R}_{\mathrm{recoil}},
\mathcal{R}_{\mathrm{sea}},
\mathcal{R}_{\mathrm{heat}}
\right),
$$

with $\mathcal{R}_{\mathrm{heat}}$ included only when $B_{\mathrm{heat}}$ is named. A row passes only if

$$
\frac{|\mathcal{R}_Q|}{\epsilon_Q}\le1,
\qquad
\frac{|\mathcal{R}_E|}{\epsilon_E}\le1,
\qquad
\frac{\|\mathcal{R}_{\mathbf{p}}\|}{\epsilon_{\mathbf{p}}}\le1,
\qquad
\frac{\|\mathcal{R}_{\mathbf{J}}\|}{\epsilon_{\mathbf{J}}}\le1,
$$

$$
\mathcal{R}_{\mathrm{src}}=0,
\qquad
\|\mathcal{R}_{\mathrm{recoil}}\|\le\epsilon_{\mathrm{recoil}},
\qquad
\|\mathcal{R}_{\mathrm{sea}}\|\le\epsilon_{\mathrm{sea}},
$$

and, when present,

$$
\frac{|\mathcal{R}_{\mathrm{heat}}|}{\epsilon_{\mathrm{heat}}}\le1.
$$

This vector is the event-ledger part of the same-level branch certificate. It is not a replacement for root-ledger, noncollision, regularization, tangential-residual, history-energy, exposure, Lorentz, photon, color, or strong-field rows.

---

## 11. Axial Inventory Compatibility

The Archie canon currently keeps `axial architrino`, `axial layer`, `axial pattern`, `axial inventory`, and `axial frame` as established fermion axial-structure terms. This priority packet does not change those terms and does not migrate corpus prose.

Compatibility rule: an existing axial inventory row may be compared with the same-level central-inventory split only as a compatibility interface:

$$
\mathcal{I}_{\mathrm{ax}}
\rightsquigarrow
\left(
C_{\mathrm{cent}},
S_{\mathrm{chor}},
\mathrm{axial\ pattern},
\mathrm{axial\ frame}
\right),
$$

not as an identity and not as migration authority. A later architecture decision may prove that the same six non-core architrino bookkeeping formerly described as axial inventory is recovered by $C_{\mathrm{cent}}+S_{\mathrm{chor}}$, but this document only states the proof burden.

The word `polar` remains restricted to polar-site geometry or legacy references to the former polar-charge problem. It is not a separate electric charge channel unless the integer inventory ledger supplies the corresponding net $Q$.

---

## 12. Branch Certificate Rows And Failure Modes

The central-inventory and event-ledger addition to a same-level branch certificate should contain the rows below.

| Certificate row | Required object | Passing condition | Failure modes |
| --- | --- | --- | --- |
| `integer_inventory` | $(N_+,N_-;C_{\mathrm{cent}},S_{\mathrm{chor}},Q)$ | integer counts match branch type and $Q=\epsilon(N_+-N_-)$ | `inventory-mismatch`, `charge-index-noninteger` |
| `attraction_repulsion_inventory` | per-site $(N_{\mathrm{attr}},N_{\mathrm{rep}})=(3,2)$ for a neutral same-level six-site row | emitted beside weighted delayed force sums as structural bias, not closure proof | `attraction-repulsion-inventory-open`, `structural-bias-overread` |
| `central_choreography_split` | resolved split between $C_{\mathrm{cent}}$ and $S_{\mathrm{chor}}$ | central inventory is ledgered and choreography remains neutral where declared | `central-inventory-singularity`, `choreography-not-neutral` |
| `noncollision` | $d_{\min}^{(B)}>\epsilon_x$ or declared regularized support | no unresolved coincident point representatives | `projection-collision`, `central-inventory-singularity` |
| `regularization` | $\eta>0$ rule, split-source representative, or absent-by-policy status | no unresolved near-zero self roots; any split-source Jacobian floor stays positive | `near-zero-self-root-unresolved`, `jacobian-floor-violation`, `regularization-unset` |
| `source_provenance` | label transfer row $\mathcal{R}_{\mathrm{src}}$ | every outgoing architrino has an incoming or Noether-Sea source | `source-provenance-open`, `orphan-outgoing-label` |
| `pair_production` | $B_k+B_{-k}$ pair row | total pair inventory $(12,12)$ and zero net $Q$ with $24$ source labels | `pair-source-provenance-open`, `pair-charge-open` |
| `reaction_inventory` | $\mathcal{R}_{N_+},\mathcal{R}_{N_-},\mathcal{R}_Q$ | signed inventory and charge rows close | `reaction-inventory-open`, `charge-residual-open` |
| `event_conservation` | $\mathcal{R}_E,\mathcal{R}_{\mathbf{p}},\mathcal{R}_{\mathbf{J}}$ | energy, momentum, and angular momentum close within tolerance | `energy-ledger-open`, `momentum-ledger-open`, `angular-momentum-ledger-open` |
| `recoil` | named $\mathrm{Rec}(e)$ rows | recoil entries equal the named receiving branch/object changes | `recoil-open`, `recoil-recipient-missing` |
| `noether_sea_update` | $\Delta\mathcal{S}_{\mathrm{sea}}$ and $\mathsf{U}_{\mathrm{sea}}$ | medium update computed from the same roots and event interval | `medium-update-open`, `medium-update-root-mismatch` |
| `heat_channel` | $B_{\mathrm{heat}}$ only when allowed | heat row appears only after nonheat channels are named or ruled out | `heat-channel-unjustified`, `heat-as-hidden-loss` |
| `axial_compatibility` | comparison with $\mathcal{I}_{\mathrm{ax}}$ when needed | axial inventory is treated as compatibility language, not migrated by implication | `axial-inventory-drift`, `polar-charge-reintroduced` |

Required branch-certificate theorem target:

$$
\max_i
\frac{
\|\mathcal{R}_{\mathrm{inventory/event},i}\|
}{
\epsilon_{\mathrm{inventory/event},i}
}
\le1,
\qquad
\mathcal{R}_{\mathrm{src}}=0,
\qquad
d_{\min}^{(B)}>\epsilon_x
\ \text{or declared regularized support},
$$

on the same retained branch packet that also passes the root, Jacobian, memory-depth, tangential, history-energy, exposure, and observer-export rows.

---

## 13. Promotion Blockers

This packet remains `priority-only` until all blockers below are closed:

1. At least one same-level neutral Noether-core branch passes the six-architrino inventory row and the noncollision / regularization rows.
2. At least one charged twelve-architrino branch passes the central-inventory split without singular charge placement.
3. At least one pair-production row supplies source provenance for all $24$ outgoing branch architrinos.
4. A reaction event row closes $\mathcal{R}_Q$, $\mathcal{R}_E$, $\mathcal{R}_{\mathbf{p}}$, $\mathcal{R}_{\mathbf{J}}$, $\mathcal{R}_{\mathrm{src}}$, $\mathcal{R}_{\mathrm{recoil}}$, and $\mathcal{R}_{\mathrm{sea}}$ under one endpoint convention.
5. Any use of $B_{\mathrm{heat}}$ passes the heat-channel restriction rather than hiding an unclosed event residual.
6. Axial inventory compatibility is resolved by an explicit architecture decision rather than silent corpus migration.
