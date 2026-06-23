# Noether Action Conservation Closure Theorem

Promotion status: `priority-only`. This packet turns event conservation from a parallel checklist into a consequence of one action and one retained root ledger. It connects [history-force-variationality-condition.md](history-force-variationality-condition.md), [gamma-scale-action-row.md](gamma-scale-action-row.md), [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md), [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md), [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md), and [central-inventory-and-event-ledgers.md](central-inventory-and-event-ledgers.md). It does not claim that the current $M=3$ rows pass the theorem.

The target is:

$$
\text{same action}
+\text{same root ledger}
+\text{same event window}
\quad
\Longrightarrow
\quad
\text{same conservation ledger}.
$$

---

## 1. Total Action Row

Let a candidate branch/event packet declare one support-complete active causal-root ledger $\mathcal{A}_B$, one endpoint convention, one branch inventory row, and one event interval

$$
[t_-,t_+].
$$

The total branch-plus-event action is

$$
\mathcal{S}_{\mathrm{tot}}
=
\mathcal{S}_{\mathrm{car}}
+
\mathcal{S}_{\mathrm{hist}}
+
\mathcal{S}_{\mathrm{constraints}}
+
\mathcal{S}_{\mathrm{sea/event}}.
$$

The delayed-force part is admissible only when the work one-form curl row passes:

$$
\frac{\|\mathcal{C}\|_{\mathrm{F}}}
{1+\|W\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}}.
$$

The scale part is admissible only when the branch emits an action-derived scalar

$$
\Gamma_B
=
\frac{E_\epsilon(R_*)}{m_{\mathrm{car}}(B)c_f^2},
$$

or an explicitly tensorial inertia row. A fitted $\Gamma_K$ alone cannot enter this theorem.

For a bounded speed factor branch, this total action row must be upgraded to the bounded-speed action in [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md). The branch state includes $\nu_i$, the kinetic term includes $\frac12m_{\mathrm{car}}c_f^2\nu_i^2$, and the conservation ledger must account for speed-factor work. If $\nu_i$ varies but the Noether row uses the fixed-speed action, the status is

$$
\texttt{bounded-speed-noether-action-stale}.
$$

---

## 2. Noether Identity On One Ledger

Let $\xi$ be a symmetry generator acting on the branch history and event variables. The relevant cases are:

| Generator | Conserved current |
| --- | --- |
| time translation $\partial_t$ | energy $E$ |
| spatial translation $\mathbf{a}$ | momentum $\mathbf{a}\cdot\mathbf{p}$ |
| rotation $\boldsymbol{\Omega}$ | angular momentum $\boldsymbol{\Omega}\cdot\mathbf{J}$ |
| inventory phase/provenance relabeling | charge/source row $Q,\mathcal{R}_{\mathrm{src}}$ |

On the root-regular history chart, the first variation has the form

$$
\delta_\xi\mathcal{S}_{\mathrm{tot}}
=
\left[
\mathcal{J}_\xi
\right]_{t_-}^{t_+}
+
\int_{t_-}^{t_+}
\left\langle
\mathrm{EL}_B,
\delta_\xi X
\right\rangle dt
+
\mathcal{R}_{\xi,\mathrm{sea}}
+
\mathcal{R}_{\xi,\mathrm{boundary}}.
$$

Here $\mathrm{EL}_B$ is the branch Euler-Lagrange residual on the same active-root ledger. The Noether currents satisfy

$$
\mathcal{J}_{\partial_t}=E,
\qquad
\mathcal{J}_{\mathbf{a}}=\mathbf{a}\cdot\mathbf{p},
\qquad
\mathcal{J}_{\boldsymbol{\Omega}}=\boldsymbol{\Omega}\cdot\mathbf{J}.
$$

The event ledger closes only when the Noether sea state and boundary residuals are also recorded on the same interval and endpoint convention.

---

## 3. Quantitative Conservation Bound

For each generator $\xi$, define the conservation residual

$$
\mathcal{R}_{\xi}
=
\left[
\mathcal{J}_\xi
\right]_{t_-}^{t_+}
+
\mathcal{R}_{\xi,\mathrm{sea}}
+
\mathcal{R}_{\xi,\mathrm{boundary}}.
$$

If the branch residual, curl, tail, discretization, and endpoint errors are bounded, then

$$
|\mathcal{R}_{\xi}|
\le
C_\xi\|\mathrm{EL}_B\|
+
\epsilon_{\mathrm{curl}}
+
\epsilon_{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{endpoint}}.
$$

Thus the conservation rows pass to tolerance if

$$
C_\xi\|\mathrm{EL}_B\|
+
\epsilon_{\mathrm{curl}}
+
\epsilon_{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{endpoint}}
\le
\tau_{\xi}
$$

for $\xi=\partial_t,\mathbf{a},\boldsymbol{\Omega}$ and for the inventory/provenance generator.

In component form, the target rows are

$$
\mathcal{R}_{E}=0,
\qquad
\mathcal{R}_{\mathbf{p}}=\mathbf{0},
\qquad
\mathcal{R}_{\mathbf{J}}=\mathbf{0},
$$

and

$$
\mathcal{R}_{Q}=0,
\qquad
\mathcal{R}_{\mathrm{src}}=0,
$$

up to the certified error envelope above.

---

## 4. Ledger Matching Conditions

The theorem is invalid if any of the following rows use different conventions:

| Row | Must match |
| --- | --- |
| dynamics closure | same root labels, delays, Jacobians, memory depth, and endpoint convention |
| action exactness | same work one-form, root sensitivities, and force ledger |
| scale/action | same $\Gamma_B$ or inertia operator used in the dynamics row |
| stability/event window | same return section, event interval, and root-status convention |
| central inventory | same architrino labels, polarity map, $Q$, and source provenance |
| Noether sea update | same event interval and boundary exchange convention |

If a conservation row is computed on a different root or memory policy, its status is

$$
\texttt{force-action-ledger-mismatch}.
$$

If the Noether sea update is required but absent, its status is

$$
\texttt{medium-update-open}.
$$

---

## 5. Theorem Target

**Theorem target: Noether action conservation closure.** Suppose a same-level branch/event packet passes:

1. support-complete dynamics closure on one active causal-root ledger;
2. delayed-force one-form exactness;
3. action-derived scale or tensorial inertia row;
4. root-ledger Floquet or return stability on the same endpoint convention;
5. central inventory and source-provenance ledger;
6. Noether sea state and boundary update rows for the same event interval.

If $\mathcal{S}_{\mathrm{tot}}$ is invariant under time translations, spatial translations, rotations, and the declared inventory/provenance relabeling, then the event ledger conservation residuals obey the quantitative bound in Section 3. In the zero-error limit, the branch/event packet satisfies

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

1. root/Jacobian floors and the delayed-force Lipschitz envelope give a smooth root-regular history chart;
2. the curl condition promotes the delayed-force work one-form to $\mathcal{S}_{\mathrm{hist}}$;
3. the action-scale row derives the inertia/force scale in the same variational problem;
4. the stability/event row keeps the return window inside the same root, memory, inventory, and endpoint convention;
5. Noether's identity gives the boundary current relation for each generator;
6. the event ledger identifies those currents with $E$, $\mathbf{p}$, $\mathbf{J}$, $Q$, and source provenance;
7. certified tail, mesh, curl, endpoint, and branch residual errors give the quantitative bound.

---

## 6. Current $M=3$ Reading

The current $M=3$ exact-antipodal rows cannot yet use this theorem. They lack:

1. support-complete memory;
2. a closed dynamics row;
3. a passed work-one-form curl test;
4. an action-derived $\Gamma_B$ or inertia operator;
5. a root-ledger Floquet stability row;
6. a same-window Noether sea/event update.

Therefore the status is

$$
\texttt{noether-conservation-closure-open},
\qquad
\texttt{event-action-not-computed},
\qquad
\texttt{not-retained}.
$$

---

## 7. Required Output Fields

Future retained branch/event packets should emit:

| Field | Required payload |
| --- | --- |
| `total_action` | $\mathcal{S}_{\mathrm{tot}}$ terms, endpoint convention, and event interval |
| `symmetry_generators` | time, translation, rotation, and inventory/provenance generators |
| `noether_currents` | $\mathcal{J}_\xi$ identified with $E$, $\mathbf{p}$, $\mathbf{J}$, $Q$, and source provenance |
| `branch_el_residual` | $\|\mathrm{EL}_B\|$ on the retained root ledger |
| `action_exactness_error` | $\epsilon_{\mathrm{curl}}$ from the work one-form |
| `tail_disc_endpoint_errors` | $\epsilon_{\mathrm{tail}}$, $\epsilon_{\mathrm{disc}}$, and $\epsilon_{\mathrm{endpoint}}$ |
| `sea_boundary_residuals` | $\mathcal{R}_{\xi,\mathrm{sea}}$ and $\mathcal{R}_{\xi,\mathrm{boundary}}$ |
| `conservation_bounds` | $C_\xi$, $\tau_\xi$, and pass/fail for each generator |
| `ledger_match_status` | whether all rows used one root, memory, action, inventory, and event convention |
| `conservation_decision` | `noether-conservation-closed`, `noether-conservation-open`, or first failure code |

Failure/status codes:

$$
\texttt{noether-conservation-closure-open},
\qquad
\texttt{event-action-not-computed},
\qquad
\texttt{force-action-ledger-mismatch},
$$

$$
\texttt{medium-update-open},
\qquad
\texttt{endpoint-current-unmatched},
\qquad
\texttt{not-retained}.
$$
