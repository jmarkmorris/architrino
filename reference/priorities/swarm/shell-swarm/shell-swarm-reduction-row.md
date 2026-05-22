# Shell Swarm Reduction Row

Promotion status: `priority-only`. This packet formalizes the shell swarm as a case reduction of the general neutral swarm certificate, not as a separate ontology and not as a completed retained branch. It refines [neutral-swarm-model.md](../neutral-swarm/neutral-swarm-model.md), [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md), [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md), and [nested-shell-swarm-radial-support-functional.md](../nested-shell-swarm/nested-shell-swarm-radial-support-functional.md).

The reduction target is:

$$
\mathfrak{R}_{\mathrm{neutral}}^\nu(B)
+
\mathcal{R}_{\mathrm{shell}}
\quad
\Longrightarrow
\quad
\text{neutral swarm branch in the shell swarm case}.
$$

The implication is only a case classification. It does not retain the branch unless the root, tail, dynamics, support, action, Noether, event, stability, inventory, and observer-export rows also close on the same live ledger.

---

## 1. Case Data

Let

$$
I=\{1,\ldots,6\},
\qquad
\sigma:I\to\{+1,-1\},
\qquad
\sum_{i\in I}\sigma_i=0
$$

be the neutral swarm site and polarity ledger. A shell swarm case adds a common support descriptor

$$
\mathcal{D}_{\mathrm{shell}}
=
\left(
\mathbf{C},
R_{\mathrm{sh}}^-,
R_{\mathrm{sh}}^+,
\epsilon_{\mathrm{spread}},
\mathsf{SupportPolicy},
\mathsf{OccupancyPolicy}
\right),
$$

with

$$
0<R_{\mathrm{sh}}^-<R_{\mathrm{sh}}^+,
\qquad
\Delta_{\mathrm{sh}}
=
\frac{R_{\mathrm{sh}}^+-R_{\mathrm{sh}}^-}
{(R_{\mathrm{sh}}^++R_{\mathrm{sh}}^-)/2}.
$$

The site support radius is

$$
r_i(\lambda)=\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|.
$$

The common-band residual is

$$
\mathcal{R}_{\mathrm{band}}^{\mathrm{shell}}(B)
=
\max_i
\sup_\lambda
\left[
\left(R_{\mathrm{sh}}^- - r_i(\lambda)\right)_+
+
\left(r_i(\lambda)-R_{\mathrm{sh}}^+\right)_+
\right].
$$

The branch is not in the shell swarm case unless

$$
\mathcal{R}_{\mathrm{band}}^{\mathrm{shell}}(B)=0
$$

or an explicitly declared tolerance row bounds it below the retained support tolerance.

---

## 2. Spread And Non-Spherical Condition

A shell swarm is a controlled radial support-band case. It is not a spherical-curve assumption. Define the causal-time mean support radius

$$
\bar r_i^u
=
\frac{1}{H_i}
\int_0^{H_i}
r_i(\Lambda_i(u))\,du,
\qquad
\bar r^u=\frac16\sum_{i\in I}\bar r_i^u.
$$

The same-support spread row is

$$
\mathcal{R}_{\mathrm{spread}}^{\mathrm{shell}}(B)
=
\max_i
\frac{|\bar r_i^u-\bar r^u|}{\bar r^u}.
$$

A narrow shell swarm case requires

$$
\mathcal{R}_{\mathrm{spread}}^{\mathrm{shell}}(B)\le\epsilon_{\mathrm{spread}},
$$

but the free-support radial derivatives

$$
r_i'(\lambda)
=
\mathbf{n}_i(\lambda)\cdot\mathbf{T}_i(\lambda)
$$

may be nonzero. The stronger fixed-radius row

$$
r_i(\lambda)\equiv R_i
$$

is an optional subcase. It must not be silently inserted into the shell swarm reduction.

---

## 3. Support Work And Complementarity

The shell swarm support row is admissible only if the support work is tracked on the same center-time chart as the dynamics. With

$$
\rho_i(u)=r_i(\Lambda_i(u)),
$$

define shell barriers

$$
B_i^+(u)=\rho_i(u)-R_{\mathrm{sh}}^+\le0,
\qquad
B_i^-(u)=R_{\mathrm{sh}}^--\rho_i(u)\le0.
$$

The multiplier row is

$$
\mu_i^+(u)\ge0,
\qquad
\mu_i^-(u)\ge0,
\qquad
\mu_i^+B_i^+=0,
\qquad
\mu_i^-B_i^-=0.
$$

The support generalized force consumed by the bounded-speed dynamics is

$$
\widetilde{\mathbf{F}}_{i,\mathrm{supp}}^\nu
=
\left(\mu_i^+-\mu_i^-\right)\mathbf{n}_i.
$$

The support work status is one of:

| Status | Meaning |
| --- | --- |
| `support-work-zero` | multipliers vanish on the retained interval |
| `support-work-exact` | support work is an exact contribution to the same action ledger |
| `support-work-event-ledgered` | support work is exchanged through explicitly statused event rows |
| `support-work-open` | support work is untracked; the shell swarm branch is not retained |

---

## 4. Optional Occupancy Rows

Containment or shielding language is allowed only when the branch claims a support-distribution effect. In that case it must consume the occupancy density rows from the neutral swarm model:

$$
n_{\mathrm{occ},\delta}(\mathbf{x})
=
\sum_{i\in I}
\frac1{H_i}
\int_0^{H_i}
K_\delta(\mathbf{x}-\mathbf{Y}_i(\Lambda_i(u)))\,du,
$$

and

$$
n_{\mathrm{sgn},\delta}(\mathbf{x})
=
\sum_{i\in I}
\sigma_i
\frac1{H_i}
\int_0^{H_i}
K_\delta(\mathbf{x}-\mathbf{Y}_i(\Lambda_i(u)))\,du.
$$

The optional coverage and signed-balance residuals are

$$
\mathcal{R}_{\mathrm{cover}}^\delta
=
\sup_{\mathbf{x}\in\mathcal{A}_{\mathrm{shell}}}
\left(n_{\min}-n_{\mathrm{occ},\delta}(\mathbf{x})\right)_+,
\qquad
\mathcal{R}_{\mathrm{sgn}}^\delta
=
\sup_{\mathbf{x}\in\mathcal{A}_{\mathrm{shell}}}
|n_{\mathrm{sgn},\delta}(\mathbf{x})|.
$$

These rows are optional for a shell swarm branch. They are required only when the branch claims cloud-like containment, shielding, or near-neutral coarse exposure.

---

## 5. Shell Reduction Residual

The shell swarm reduction block is

$$
\mathcal{R}_{\mathrm{shell}}
=
\left(
\mathcal{R}_{\mathrm{band}}^{\mathrm{shell}},
\mathcal{R}_{\mathrm{spread}}^{\mathrm{shell}},
\mathcal{R}_{\mathrm{support\text{-}work}},
\mathcal{R}_{\mathrm{support\text{-}event}},
\mathcal{R}_{\mathrm{occupancy}}^\delta,
\mathcal{R}_{\mathrm{case\text{-}status}}
\right).
$$

The branch status is:

| Status | Meaning |
| --- | --- |
| `shell-case-passed` | support band, spread, and support work rows close on the same ledger |
| `shell-case-without-occupancy` | shell case passes, but no containment or shielding claim is made |
| `shell-case-occupancy-open` | shell support passes, but a claimed support-distribution effect lacks coverage or signed-balance rows |
| `shell-case-failed` | common support band or spread rows fail |
| `neutral-branch-only` | the neutral swarm branch may remain viable, but the shell swarm case reduction is not available |

Thus failure of $\mathcal{R}_{\mathrm{shell}}$ rejects only the shell swarm case. It does not reject the broader neutral swarm branch unless a required neutral certificate row also fails.
