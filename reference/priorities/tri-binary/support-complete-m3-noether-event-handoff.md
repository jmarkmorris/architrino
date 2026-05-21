# Support-Complete $M=3$ Noether Event Handoff

Promotion status: `priority-only`. This packet states the conservation and event-ledger handoff required after an exact-antipodal $M=3$ support-complete dynamics/action candidate. It specializes [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md), [central-inventory-and-event-ledgers.md](central-inventory-and-event-ledgers.md), and [retained-branch-promotion-theorem.md](retained-branch-promotion-theorem.md) to the current same-level tri-binary dynamics stack.

It does not retain a branch. It says what the next packet must compute if the exact-antipodal $M=3$ solve reaches `support-complete-exact-antipodal-dynamics-action-candidate`.

This handoff is fixed-speed unless the total action, event interval, and currents are rebuilt for the bounded speed factor. In the bounded-speed successor, the period is

$$
T_i^{\nu}
=
\frac{R_*}{c_f}
\int_0^{L_i}\frac{d\lambda}{\nu_i(\lambda)},
$$

and $\mathcal{S}_{\mathrm{tot}}^{M3}$ must include speed-factor kinetic, constraint, storage, or exchange terms. If $\nu_i$ varies but the handoff uses $T_*=R_*L_*/c_f$, the status is

$$
\texttt{bounded-speed-noether-period-stale}.
$$

---

## 1. Handoff Preconditions

The Noether/event handoff may start only after one frozen ledger has passed:

$$
\mathcal{L}_{M3}^{+}
=
\left(
\eta_{\mathrm{mem}},
\mathcal{A}_{\eta}^{+},
\Pi_{\mathrm{src}},
\Pi_{\mathrm{end}},
\operatorname{sign}J,
W_{\mathcal{E}},
\mathsf{Action}_{\Gamma},
\mathsf{Inv}
\right).
$$

Here $\mathcal{A}_{\eta}^{+}$ is either the certified active ledger after tail exclusion or the sheet-complete ledger after tail-root-sheet assimilation. The action row has already supplied

$$
\Gamma_B
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}c_f^2}
$$

or a declared tensorial inertia replacement, and the virtual-work curl row has passed on the same root ledger.

If any of these prerequisites are absent, the status remains

$$
\texttt{event-action-not-computed}.
$$

---

## 2. Total Action And Event Window

Fix one event interval

$$
[t_-,t_+],
$$

or, for a closed single-branch period test, one branch period

$$
T_*=\frac{R_*L_*}{c_f}.
$$

The total action for the handoff is

$$
\mathcal{S}_{\mathrm{tot}}^{M3}
=
\mathcal{S}_{\mathrm{car}}
+
\mathcal{S}_{\mathrm{hist}}^{+}
+
\mathcal{S}_{\mathrm{constraints}}
+
\mathcal{S}_{\mathrm{sea/event}},
$$

where $\mathcal{S}_{\mathrm{hist}}^{+}$ is the action or exact virtual-work primitive associated with the sheet-complete force ledger. The event interval, endpoint convention, inventory labels, branch histories, and Noether-Sea exchange rows must all use the same $\mathcal{A}_{\eta}^{+}$ convention.

The handoff is invalid if one row uses active-window roots and another uses support-complete roots:

$$
\texttt{force-action-ledger-mismatch}.
$$

---

## 3. Generator Rows

Let $\xi$ be an infinitesimal generator acting on branch histories, inventory labels, and event variables. The required generators are:

| Generator | Current |
| --- | --- |
| time translation $\partial_t$ | energy $E$ |
| spatial translation $\mathbf{a}$ | momentum $\mathbf{a}\cdot\mathbf{p}$ |
| rotation $\boldsymbol{\Omega}$ | angular momentum $\boldsymbol{\Omega}\cdot\mathbf{J}$ |
| inventory/provenance relabeling $\upsilon$ | charge and source provenance $Q,\mathcal{R}_{\mathrm{src}}$ |

The first variation on the root-regular history chart must have the form

$$
\delta_{\xi}\mathcal{S}_{\mathrm{tot}}^{M3}
=
\left[
\mathcal{J}_{\xi}^{M3}
\right]_{t_-}^{t_+}
+
\int_{t_-}^{t_+}
\left\langle
\mathrm{EL}_{M3}^{+},
\delta_{\xi}X
\right\rangle dt
+
\mathcal{R}_{\xi,\mathrm{sea}}
+
\mathcal{R}_{\xi,\mathrm{boundary}}.
$$

The Euler-Lagrange residual $\mathrm{EL}_{M3}^{+}$ is the continuous branch residual corresponding to the support-complete dynamics/action row:

$$
\mathrm{EL}_{M3}^{+}
\sim
\left(
R_T^{+},
R_K^{+},
R_\gamma^{+}
\right),
$$

with the exact proportionality fixed by the action convention. A fitted $\Gamma_K$ residual is not enough for this row.

The Noether currents must be identified as

$$
\mathcal{J}_{\partial_t}^{M3}=E_{M3},
\qquad
\mathcal{J}_{\mathbf{a}}^{M3}=\mathbf{a}\cdot\mathbf{p}_{M3},
\qquad
\mathcal{J}_{\boldsymbol{\Omega}}^{M3}
=
\boldsymbol{\Omega}\cdot\mathbf{J}_{M3}.
$$

The inventory/provenance row must reduce to the integer source equations from the central-inventory packet:

$$
\mathcal{R}_{\mathrm{src},a}
=
\mu_a^{\mathrm{out}}
-
\mu_a^{\mathrm{in}}
-
s_a^{\mathrm{sea}\to\mathrm{branch}}
+
s_a^{\mathrm{branch}\to\mathrm{sea}}.
$$

For a neutral six-architrino exact-antipodal $M=3$ branch, the base inventory row is

$$
N_+=N_-=3,
\qquad
Q=0.
$$

This inventory row is not optional. The exact-antipodal geometry cannot replace integer polarity accounting.

---

## 4. Closed-Period Branch Test

Before using a branch inside a reaction event, the single-period no-event test should close. Over one period $T_*$, with no boundary or Noether-Sea exchange, require

$$
\left[
\mathcal{J}_{\xi}^{M3}
\right]_{0}^{T_*}
=0
$$

for time translation, spatial translation, and rotation, up to the certified branch residual envelope. Quantitatively,

$$
\left|
\left[
\mathcal{J}_{\xi}^{M3}
\right]_{0}^{T_*}
\right|
\le
C_{\xi}^{M3}
\|\mathrm{EL}_{M3}^{+}\|
+
\epsilon_{\mathrm{curl}}
+
\epsilon_{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\Gamma}
+
\epsilon_{\mathrm{sea}}
+
\epsilon_{\mathrm{endpoint}}.
$$

The closed-period test passes when the right-hand side is at most the declared tolerance $\tau_\xi$ for every generator:

$$
C_{\xi}^{M3}
\|\mathrm{EL}_{M3}^{+}\|
+
\epsilon_{\mathrm{curl}}
+
\epsilon_{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\Gamma}
+
\epsilon_{\mathrm{sea}}
+
\epsilon_{\mathrm{endpoint}}
\le
\tau_\xi.
$$

If the branch is exactly periodic in geometry but the Noether currents do not close under the same action ledger, the status is

$$
\texttt{branch-current-nonperiodic}.
$$

---

## 5. Event Ledger Test

For an event $e$ with incoming and outgoing branch multisets, use the out-minus-in convention

$$
\Delta X_{\mathrm{branch}}(e)
=
\sum_{B\in\mathcal{B}_{\mathrm{out}}(e)}
X(B;t_+)
-
\sum_{B\in\mathcal{B}_{\mathrm{in}}(e)}
X(B;t_-).
$$

The event residual vector is

$$
\mathcal{R}_{\mathrm{event}}^{M3}(e)
=
\left(
\mathcal{R}_E,
\mathcal{R}_{\mathbf{p}},
\mathcal{R}_{\mathbf{J}},
\mathcal{R}_Q,
\mathcal{R}_{\mathrm{src}}
\right).
$$

The energy, momentum, and angular-momentum rows are

$$
\mathcal{R}_E
=
\Delta E_{\mathrm{branch}}
+
\Delta E_{\mathrm{coh}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{boundary}}
+
\Delta E_{\mathrm{sea}},
$$

$$
\mathcal{R}_{\mathbf{p}}
=
\Delta\mathbf{p}_{\mathrm{branch}}
+
\Delta\mathbf{p}_{\mathrm{coh}}
+
\Delta\mathbf{p}_{\mathrm{recoil}}
+
\Delta\mathbf{p}_{\mathrm{boundary}}
+
\Delta\mathbf{p}_{\mathrm{sea}},
$$

and

$$
\mathcal{R}_{\mathbf{J}}
=
\Delta\mathbf{J}_{\mathrm{branch}}
+
\Delta\mathbf{J}_{\mathrm{coh}}
+
\Delta\mathbf{J}_{\mathrm{recoil}}
+
\Delta\mathbf{J}_{\mathrm{boundary}}
+
\Delta\mathbf{J}_{\mathrm{sea}}.
$$

The charge row is

$$
\mathcal{R}_Q
=
\Delta Q_{\mathrm{branch}}
+
\epsilon
\left(
\Delta N_{+,\mathrm{sea}}
-
\Delta N_{-,\mathrm{sea}}
\right)
+
\Delta Q_{\mathrm{coh}}
+
\Delta Q_{\mathrm{boundary}}.
$$

The event row passes only if

$$
\|\mathcal{R}_{\mathrm{event}}^{M3}(e)\|_{\mathcal{E}_{\mathrm{event}}}
\le
\tau_{\mathrm{event}}
$$

with all terms emitted on the same endpoint and Noether-Sea exchange convention. A missing exchange row is not zero by default; it has status

$$
\texttt{medium-update-open}
$$

unless the event packet explicitly proves that the exchange term is absent by policy.

The no-medium-response case is an explicit row, not a silent omission:

$$
\Delta E_{\mathrm{sea}}
=
\Delta\mathbf{p}_{\mathrm{sea}}
=
\Delta\mathbf{J}_{\mathrm{sea}}
=
\Delta N_{+,\mathrm{sea}}
=
\Delta N_{-,\mathrm{sea}}
=0.
$$

If a medium response is admitted, the packet must instead emit an exchange equation such as

$$
\frac{d}{d\lambda}\mathcal{E}_{\mathrm{sea}}
=
\mathcal{P}_{\mathrm{sea}}
-
\mathcal{D}_{\mathrm{sea}}
+
\mathcal{R}_{\mathrm{sea},E},
\qquad
\mathcal{D}_{\mathrm{sea}}\ge0,
$$

plus the matching momentum, angular-momentum, source, boundary, and isotropy/curl exchange rows on $[t_-,t_+]$. If this exchange equation uses a different root or event convention, the status is

$$
\texttt{medium-update-root-mismatch}.
$$

---

## 6. Handoff Theorem

**Theorem target: exact-antipodal $M=3$ Noether event handoff.** Suppose an exact-antipodal $M=3$ packet passes support-complete dynamics/action closure on $\mathcal{L}_{M3}^{+}$, including tail exclusion or root-sheet assimilation, root-sensitive force derivatives, action-derived scale or tensorial inertia, virtual-work curl closure, and Krawczyk/cokernel tolerance. Suppose further that the total action $\mathcal{S}_{\mathrm{tot}}^{M3}$ is invariant under time translation, spatial translation, rotation, and declared inventory/provenance relabeling on one event interval.

Then the Noether currents satisfy the quantitative current-closure bounds in Sections 4 and 5. In the zero-error limit, the closed-period branch or event packet obeys

$$
\mathcal{R}_E=0,
\qquad
\mathcal{R}_{\mathbf{p}}=\mathbf{0},
\qquad
\mathcal{R}_{\mathbf{J}}=\mathbf{0},
\qquad
\mathcal{R}_Q=0,
\qquad
\mathcal{R}_{\mathrm{src}}=0.
$$

Proof route:

1. use support-complete root floors and sheet derivatives to define a smooth history-action chart;
2. use curl closure to identify $\mathcal{S}_{\mathrm{hist}}^{+}$;
3. use the action-scale row to match dynamics and action units;
4. apply Noether's identity to the total branch-plus-event action;
5. identify boundary currents with $E$, $\mathbf{p}$, $\mathbf{J}$, $Q$, and source provenance;
6. bound the residual terms by dynamics, curl, tail, discretization, scale, endpoint, and Noether-Sea exchange errors.

---

## 7. Required Output Fields

A successor exact-antipodal $M=3$ Noether/event packet must emit:

| Field | Required payload |
| --- | --- |
| `ledger_id` | root, memory, endpoint, source-pair, action, inventory, and weight convention |
| `event_interval` | $[t_-,t_+]$ or closed-period $T_*$ |
| `total_action_terms` | carrier, history, constraints, and sea/event terms |
| `generator_rows` | time, translation, rotation, and provenance generators |
| `noether_currents` | $E$, $\mathbf{p}$, $\mathbf{J}$, $Q$, and $\mathcal{R}_{\mathrm{src}}$ definitions |
| `branch_residual_envelope` | $\|\mathrm{EL}_{M3}^{+}\|$ and its error conversion constants $C_\xi^{M3}$ |
| `action_errors` | $\epsilon_{\mathrm{curl}}$, $\epsilon_\Gamma$, scalar-inertia or tensor-inertia residual |
| `root_disc_endpoint_errors` | $\epsilon_{\mathrm{tail}}$, $\epsilon_{\mathrm{disc}}$, and $\epsilon_{\mathrm{endpoint}}$ |
| `inventory_row` | $N_+$, $N_-$, $Q$, architrino labels, and provenance map |
| `sea_boundary_updates` | zero/no-response row or admitted exchange equations for energy, momentum, angular momentum, charge, and density/delay updates |
| `event_residuals` | $\mathcal{R}_E$, $\mathcal{R}_{\mathbf{p}}$, $\mathcal{R}_{\mathbf{J}}$, $\mathcal{R}_Q$, and $\mathcal{R}_{\mathrm{src}}$ |
| `handoff_status` | one status from Section 8 |

---

## 8. Decision Statuses

The handoff returns:

| Status | Meaning |
| --- | --- |
| `m3-noether-event-handoff-ready` | all generator, current, inventory, endpoint, and event rows are emitted on one ledger |
| `m3-noether-closed-period-pass` | single-branch period currents close within tolerance |
| `m3-event-ledger-pass` | event residuals close within tolerance |
| `event-action-not-computed` | dynamics/action candidate has not supplied the total action or Noether currents |
| `force-action-ledger-mismatch` | root, memory, endpoint, action, or inventory conventions disagree |
| `symmetry-generator-ledger-mismatch` | a generator row acts on a different root/action/event ledger |
| `inventory-mismatch` | inventory labels differ between branch, action, and event rows |
| `central-inventory-unresolved` | integer polarity inventory or central-inventory status is missing |
| `central-inventory-singularity` | central-inventory labels are treated as unresolved coincident point charges |
| `source-provenance-open` | architrino source labels do not close |
| `charge-residual-open` | charge residual fails after branch, coherent, boundary, and sea terms are included |
| `energy-ledger-open` | energy residual fails after all admitted terms are included |
| `momentum-ledger-open` | momentum residual fails after all admitted terms are included |
| `angular-momentum-ledger-open` | angular-momentum residual fails after all admitted terms are included |
| `medium-update-open` | required Noether-Sea or boundary exchange row is absent |
| `medium-update-root-mismatch` | medium exchange uses a different root, action, or event convention |
| `endpoint-current-unmatched` | endpoint current convention does not match the event interval |
| `branch-current-nonperiodic` | closed-period geometry passes but Noether currents do not close |

Current exact-antipodal $M=3$ status remains

$$
\texttt{event-action-not-computed},
\qquad
\texttt{not-retained},
$$

until this handoff is run after a support-complete dynamics/action candidate.
