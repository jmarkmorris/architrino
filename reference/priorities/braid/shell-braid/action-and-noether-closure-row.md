# Action And Noether Closure Row

Promotion status: `priority-only`. This packet joins the bounded-speed dynamics, delayed-force work, support work, event ledger, and Noether-current rows into one closure target. It refines [bounded-speed-factor-variational-noether-closure.md](bounded-speed-factor-variational-noether-closure.md), [history-force-variationality-condition.md](history-force-variationality-condition.md), [gamma-scale-action-row.md](gamma-scale-action-row.md), [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md), and [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md).

The purpose is to separate two claims:

$$
\text{small force residual}
\not\Longrightarrow
\text{retained physical branch},
$$

while

$$
\text{dynamics residual}
+
\text{action-derived scale}
+
\text{Noether/event ledger}
\quad
\Longrightarrow
\quad
\text{candidate for retained branch status}.
$$

This packet does not prove the implication. It defines the rows that must close before the implication can be used.

---

## 1. Shared Ledger Requirement

Let a candidate branch $B$ carry curves, speed factors, roots, support data, and event variables:

$$
B
=
\left(
\mathbf{Y},
\nu,
\mathcal{A}^{\nu},
\mathcal{D}_{\mathrm{supp}},
\mathcal{E},
\mathcal{I}
\right).
$$

The same $B$ must be consumed by:

| Row | Consumes |
| --- | --- |
| dynamics | $\mathbf{Y}$, $\nu$, $\mathcal{A}^{\nu}$, force weights |
| action scale | $\mathbf{Y}$, $\nu$, $\mathcal{A}^{\nu}$, support and event variables |
| support work | $\mathcal{D}_{\mathrm{supp}}$, multipliers, endpoint convention |
| Noether currents | action symmetries and event endpoints |
| event ledger | charge, energy, momentum, angular momentum, source provenance |

If any row is computed on a different active-root ledger, memory depth, support descriptor, or endpoint convention, the status is

$$
\texttt{mixed-ledger-action-invalid}.
$$

---

## 2. Variationality Row

Let $c=(c_1,\ldots,c_m)$ be a finite branch chart and let

$$
\omega_{\mathrm{hist}}^\nu
=
\sum_{k=1}^m
W_k(c)\,dc_k
$$

be the delayed-force virtual-work one-form after root sensitivities, speed-clock sensitivities, support variations, and event endpoint variations are included.

The action-derived row requires the finite-mode curl to vanish within tolerance:

$$
\mathcal{R}_{\mathrm{curl}}^\nu
=
\max_{k,\ell}
\left|
\partial_{c_\ell}W_k
-
\partial_{c_k}W_\ell
\right|
\le
\epsilon_{\mathrm{curl}}.
$$

If this row fails, the fitted curvature response coefficient remains diagnostic:

$$
\Gamma_K
\ne
\Gamma_B
\quad
\text{as a proven branch scale}.
$$

The row may fail because the branch is not action-derived, because the chart omits event variables, because tail roots are missing, or because support work is not included. The failure code must distinguish these cases.

---

## 3. Branch Scale Row

An action-compatible branch scale is allowed only after the virtual-work row supplies a scalar inertia reduction:

$$
\Gamma_B
=
\frac{\mathcal{N}_{\mathrm{force}}(B)}
{\mathcal{I}_{\mathrm{branch}}(B)},
$$

where $\mathcal{N}_{\mathrm{force}}$ is computed from the same weighted delayed forces that enter the dynamics residual and $\mathcal{I}_{\mathrm{branch}}$ is computed from the same history action, speed storage, support work, and event terms.

The fit/action compatibility residual is

$$
\mathcal{R}_{\Gamma}
=
\frac{|\Gamma_K-\Gamma_B|}
{\max(|\Gamma_B|,\epsilon_\Gamma)}.
$$

The allowed statuses are:

| Status | Meaning |
| --- | --- |
| `gamma-action-compatible` | $\mathcal{R}_{\mathrm{curl}}^\nu$ and $\mathcal{R}_{\Gamma}$ pass on one ledger |
| `gamma-fit-only` | force residuals use a fitted $\Gamma_K$ with no action proof |
| `gamma-ledger-mixed` | fitted and action rows consume different ledgers |
| `gamma-rejected` | no action-compatible scale exists in the tested chart |

---

## 4. Noether Current Rows

The action row must emit conserved-current residuals for the symmetries it claims. The minimum set is:

$$
\mathcal{R}_{Q}=0,
$$

$$
\mathcal{R}_{E}
=
\sup_{u\in W}
\frac{|E_{\mathrm{hist}}(u)-E_{\mathrm{hist}}(u_0)-E_{\mathrm{event}}(u)|}
{\epsilon_E},
$$

$$
\mathcal{R}_{\mathbf{p}}
=
\sup_{u\in W}
\frac{\|\mathbf{p}_{\mathrm{hist}}(u)-\mathbf{p}_{\mathrm{hist}}(u_0)-\mathbf{p}_{\mathrm{event}}(u)\|}
{\epsilon_p},
$$

and

$$
\mathcal{R}_{\mathbf{J}}
=
\sup_{u\in W}
\frac{\|\mathbf{J}_{\mathrm{hist}}(u)-\mathbf{J}_{\mathrm{hist}}(u_0)-\mathbf{J}_{\mathrm{event}}(u)\|}
{\epsilon_J^{\mathrm{Noether}}}.
$$

The source-provenance ledger must also report which architrinos, roots, support events, self-hit intervals, fold-layer regulators, and Noether sea exchange terms carry each current update.

---

## 5. Event Closure

For an event interval $[u_-,u_+]$, define the event balance vector

$$
\Delta\mathcal{C}_{\mathrm{event}}
=
\left(
\Delta Q,
\Delta E,
\Delta\mathbf{p},
\Delta\mathbf{J},
\Delta\mathsf{Source},
\Delta\mathsf{Sea}
\right).
$$

The event closes only if

$$
\Delta\mathcal{C}_{\mathrm{event}}
=0
$$

after including all declared outgoing branch rows, support impulses, self-hit exchange, fold-layer work, regulator endpoint terms, and Noether sea updates.

If a missing channel is inserted after the fact, the packet must mark the original branch as

$$
\texttt{event-ledger-incomplete}
$$

rather than retroactively treating the earlier dynamics residual as retained.

---

## 6. Closure Block

The action and Noether closure residual is

$$
\mathcal{R}_{\mathrm{A/N}}
=
\left(
\mathcal{R}_{\mathrm{curl}}^\nu,
\mathcal{R}_{\Gamma},
\mathcal{R}_{Q},
\mathcal{R}_{E},
\mathcal{R}_{\mathbf{p}},
\mathcal{R}_{\mathbf{J}},
\mathcal{R}_{\mathrm{source}},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{sea}}
\right).
$$

The branch status is:

| Status | Meaning |
| --- | --- |
| `action-noether-closed` | all rows close on one live ledger |
| `dynamics-only` | force or curvature residuals improved, but action/Noether rows are not computed |
| `fit-only-scale` | $\Gamma_K$ is fitted but no $\Gamma_B$ has been derived |
| `event-ledger-open` | conservation requires an unclosed event or exchange channel |
| `noether-rejected` | a required current cannot close under the declared branch data |

Only `action-noether-closed` may feed retained-branch promotion or observer-export claims.
