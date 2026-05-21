# Retained Branch Promotion Theorem

Promotion status: `priority-only`. This packet composes the same-level tri-binary proof stack into one promotion theorem. It states the exact mathematical certificate required before a same-level tri-binary branch can be treated as retained rather than as a dynamics screen, ansatz, or priority-only candidate.

The theorem is intentionally strict: every row must use the same curve family, active root ledger, memory convention, source-pair policy, support convention, action convention, event interval, inventory ledger, and endpoint convention.

---

## 1. Promotion Certificate

A retained same-level branch packet is a tuple

$$
\mathsf{R}_{\mathrm{tri}}(B)
=
\left(
\mathsf{C}_{\mathrm{geom}},
\mathsf{C}_{\mathrm{root}},
\mathsf{C}_{\mathrm{dyn}},
\mathsf{C}_{\mathrm{conv}},
\mathsf{C}_{\Gamma},
\mathsf{C}_{\mathrm{Noether}},
\mathsf{C}_{\mathrm{stab}},
\mathsf{C}_{\mathrm{inventory}},
\mathsf{C}_{\mathrm{event}},
\mathsf{C}_{\mathrm{export}}
\right).
$$

The entries are:

| Certificate | Required content |
| --- | --- |
| $\mathsf{C}_{\mathrm{geom}}$ | closed arclength curves, equal-period row, support-band row, exact-antipodal or declared relaxed chart, center gauge, noncollision floor |
| $\mathsf{C}_{\mathrm{root}}$ | support-complete active root ledger with brackets, excluded gaps, Jacobian floors, memory depth, tail exclusion or tail assimilation |
| $\mathsf{C}_{\mathrm{dyn}}$ | support-complete tangential and curvature dynamics closure |
| $\mathsf{C}_{\mathrm{conv}}$ | finite-mode convergence from certified rows to a curve-level branch |
| $\mathsf{C}_{\Gamma}$ | action-derived scale or tensorial inertia row, plus fitted/action compatibility |
| $\mathsf{C}_{\mathrm{Noether}}$ | Noether action conservation closure for energy, momentum, angular momentum, charge, and source provenance |
| $\mathsf{C}_{\mathrm{stab}}$ | root-dependent variational equation, monodromy, action Hessian or declared stability-energy row, gauge split, transverse stability or declared NHIM row |
| $\mathsf{C}_{\mathrm{inventory}}$ | integer architrino inventory, polarity map, central-inventory ledger, and branch labels |
| $\mathsf{C}_{\mathrm{event}}$ | event interval, endpoint convention, boundary exchange, and source provenance ledgers |
| $\mathsf{C}_{\mathrm{export}}$ | observer-export rows marked `passed`, `failed`, or `not_computed`; exports do not define retention |

The promotion theorem concerns the first nine rows. The export row is attached to prevent overclaiming; it is not allowed to rescue a failed branch certificate.

A machine-readable retained packet should have the shape

$$
\mathfrak{P}_{\mathrm{ret}}(B,W)
=
\left(
\mathrm{id}_B,
W,
\mathcal{H}_B,
\mathcal{A}_B,
\eta_{\mathrm{mem}},
\Pi_{\mathrm{src}},
\Pi_{\mathrm{end}},
\mathsf{Root},
\mathsf{Dyn},
\mathsf{Limit},
\mathsf{Action}_{\Gamma},
\mathsf{Noether},
\mathsf{Event},
\mathsf{Stability},
\mathsf{Exports},
\mathsf{Compare},
\epsilon_{\mathrm{tol}},
\mathrm{status}
\right).
$$

The compact promotion predicate is

$$
\mathrm{Promote}_{\mathrm{ret}}(B,W)
\Longleftrightarrow
P_{\mathrm{root}}
\wedge
P_{\mathrm{dyn}}
\wedge
P_{\mathrm{lim}}
\wedge
P_{\Gamma}
\wedge
P_{\mathrm{Noether}}
\wedge
P_{\mathrm{event}}
\wedge
P_{\mathrm{stab}}.
$$

Here $P_{\mathrm{root}}$ means support-complete roots and floors; $P_{\mathrm{dyn}}$ means support-complete dynamics closure; $P_{\mathrm{lim}}$ means finite-mode convergence or direct curve-level certification; $P_{\Gamma}$ means action-derived scale and curl closure; $P_{\mathrm{Noether}}$ means conservation from one action/event ledger; $P_{\mathrm{event}}$ means inventory, source provenance, recoil, and boundary exchange closure; and $P_{\mathrm{stab}}$ means root-ledger-preserving stability.

---

## 2. Dynamics Closure Row

The dynamics row must be support-complete. It is not enough to lower the sampled residual. On the retained ledger,

$$
\mathcal{R}_{\mathrm{tan}}
=
\mathbf{T}\cdot\widetilde{\mathbf{F}}
=0,
$$

and

$$
\mathcal{R}_{K}
=
\mathbf{K}
-
\Gamma_B P^\perp\widetilde{\mathbf{F}}
=0
$$

within declared tolerance. The coefficient $\Gamma_B$ is the action-derived branch scale, not merely a least-squares fit. If a finite packet still uses $\Gamma_K^{\mathrm{fit}}$, it must also pass

$$
|\Gamma_K^{\mathrm{fit}}-\Gamma_B|\,\|A_{\mathrm{force}}\|
\le
\tau_{\Gamma}.
$$

The dynamics closure row must cite either:

1. [support-complete-m3-successor-certificate-target.md](support-complete-m3-successor-certificate-target.md), for a finite exact-antipodal $M=3$ candidate; or
2. [finite-mode-branch-convergence-theorem.md](finite-mode-branch-convergence-theorem.md), for the continuum limit of a certified refinement sequence.

An active-window row, a fit-only row, a frozen-tail row, or a sample-grid row cannot promote.

---

## 3. Finite-Mode Convergence Row

A finite solver row promotes only through a certified sequence

$$
(M_\nu,K_\nu)\to\infty
$$

with uniform floors

$$
d_{\min}\ge d_0,
\qquad
\eta_{\min}\ge\eta_0,
\qquad
J_{\min}\ge J_0,
\qquad
r_{\max}\le r_0,
$$

support-complete memory, a stable source-pair policy, delayed-force Lipschitz envelopes, and

$$
\epsilon_{\mathrm{disc}}^{(\nu)}\to0,
\qquad
\|\mathcal{F}_{\eta}^{(\nu)}\|_{\infty}\to0.
$$

The limit curve must inherit exact antipodality or a declared relaxed chart, equal period, root isolation, support completeness, and action-derived scale. If excluded-gap margins collapse, the sequence terminates at a branch event rather than promoting.

---

## 4. Action And Conservation Row

The action row must supply one total action

$$
\mathcal{S}_{\mathrm{tot}}
=
\mathcal{S}_{\mathrm{car}}
+
\mathcal{S}_{\mathrm{hist}}
+
\mathcal{S}_{\mathrm{constraints}}
+
\mathcal{S}_{\mathrm{sea/event}}
$$

on the same root ledger. The delayed-force work one-form must pass

$$
\frac{\|\mathcal{C}\|_{\mathrm{F}}}{1+\|W\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}}.
$$

For each Noether generator $\xi$, the conservation residual must obey

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
\epsilon_{\mathrm{endpoint}}
\le
\tau_\xi.
$$

In the zero-error limit this gives

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

If any conservation row uses a different root, memory, inventory, endpoint, or event convention, the status is `force-action-ledger-mismatch`.

---

## 5. Stability Row

After dynamics and action closure, stability must be computed from the root-dependent variational equation:

$$
\mathcal{L}_B\xi=0,
\qquad
\mathcal{T}_B\xi=0,
$$

with root-delay, Jacobian, force, projector, and $\Gamma_B$ variations included. Let the reduced monodromy be

$$
M_B=\Pi_{\mathrm{ng}}DP_B(Z_B)\Pi_\Sigma.
$$

For a stable limit-cycle branch,

$$
\max_{\mu\in\operatorname{spec}_{\perp}(M_B)}
|\mu|
\le
1-\epsilon_{\mathrm{stab}}.
$$

For a quasiperiodic or NHIM branch, the packet must declare neutral tangent directions and pass the NHIM domination row. In every case, nonlinear perturbation recovery must be checked on the same root-ledger chart. Frozen-root or fit-only stability has status `root-ledger-floquet-stability-open` or `floquet-gamma-fit-only`.

If an action-side stability claim is made, [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md) must also supply the second root sensitivities, quotient Hessian, Morse index, and Morse/Floquet compatibility row. Action coercivity alone is not a replacement for return-map contraction unless the action-decrease row is certified.

---

## 6. Promotion Theorem Target

**Theorem target: retained same-level tri-binary branch promotion.** Suppose a branch packet $B$ supplies:

1. a closed geometry certificate with equal period, support, gauge, and noncollision floors;
2. a support-complete root certificate with positive delay, Jacobian, bracket, gap, memory, and tail rows;
3. support-complete dynamics closure with action-derived $\Gamma_B$;
4. finite-mode convergence or a direct curve-level certificate;
5. delayed-force action exactness and fitted/action scale compatibility;
6. Noether action conservation closure on one event interval and inventory ledger;
7. root-dependent Floquet/NHIM stability, with second-variation action stability when an action-norm stability claim is used, on the same root, memory, and action convention;
8. central inventory, source provenance, and endpoint ledgers matching the dynamics/action row.

Then $B$ is a retained same-level tri-binary branch candidate. It may be promoted from priority-only status into reader-facing corpus prose with its claim level, assumptions, and unresolved observer-export rows stated.

If any of rows 1 through 8 fail, $B$ remains a priority-only screen or theorem target. In particular:

$$
\texttt{active-window-only},
\quad
\texttt{gamma-fitted-not-derived},
\quad
\texttt{event-action-not-computed},
\quad
\texttt{root-ledger-floquet-stability-open}
$$

are non-promotion statuses.

---

## 7. Proof Dependency DAG

The proof dependencies are:

$$
\mathsf{C}_{\mathrm{geom}}
\longrightarrow
\mathsf{C}_{\mathrm{root}}
\longrightarrow
\mathsf{C}_{\mathrm{dyn}}
\longrightarrow
\mathsf{C}_{\Gamma}
\longrightarrow
\mathsf{C}_{\mathrm{Noether}}.
$$

The finite-mode convergence row depends on the first three rows:

$$
(\mathsf{C}_{\mathrm{geom}},\mathsf{C}_{\mathrm{root}},\mathsf{C}_{\mathrm{dyn}})
\longrightarrow
\mathsf{C}_{\mathrm{conv}}.
$$

The stability row depends on the dynamics and action rows:

$$
(\mathsf{C}_{\mathrm{root}},\mathsf{C}_{\mathrm{dyn}},\mathsf{C}_{\Gamma})
\longrightarrow
\mathsf{C}_{\mathrm{stab}}.
$$

The final retained-branch decision is

$$
\left(
\mathsf{C}_{\mathrm{geom}},
\mathsf{C}_{\mathrm{root}},
\mathsf{C}_{\mathrm{dyn}},
\mathsf{C}_{\mathrm{conv}},
\mathsf{C}_{\Gamma},
\mathsf{C}_{\mathrm{Noether}},
\mathsf{C}_{\mathrm{stab}},
\mathsf{C}_{\mathrm{inventory}},
\mathsf{C}_{\mathrm{event}}
\right)
\Longrightarrow
\texttt{retained-same-level-branch-candidate}.
$$

Observer exports are downstream:

$$
\texttt{retained-same-level-branch-candidate}
\longrightarrow
\mathsf{C}_{\mathrm{export}}.
$$

They may fail or remain `not_computed` without invalidating branch retention, but they block the corresponding Lorentz, photon, mass, color, strong-field, or cosmology claim.

---

## 8. Current $M=3$ Reading

The current exact-antipodal $M=3$ packet is far below promotion:

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{event-action-not-computed},
\qquad
\texttt{root-ledger-floquet-stability-open}.
$$

Its positive status is narrower:

$$
\texttt{m3-extended-window-descent-survives}.
$$

Thus the correct promotion decision is `not-retained`, with exact-antipodal continuation still live. The next mathematical gate is the support-complete $M=3$ successor certificate, not migration into corpus claims.
