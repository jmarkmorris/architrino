# Root-Ledger Floquet Stability Certificate

Promotion status: `priority-only`. This packet states the stability certificate required after a same-level exact-antipodal dynamics row closes. It refines the return-map diagnostics in [retained-branch-dynamics-protocol.md](retained-branch-dynamics-protocol.md) into a root-ledger-preserving Floquet theorem target. It does not claim that the current $M=3$ rows are stable or retained.

The central point is that stability must be computed on the same delayed-root ledger as the force and action rows. A Floquet multiplier computed with frozen roots or a changed memory convention is not a branch stability certificate. The derivative operator behind this certificate is stated explicitly in [root-dependent-variational-equation.md](root-dependent-variational-equation.md), the action-side Hessian and Morse/Floquet compatibility row are stated in [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md), the conservative-versus-dissipative stability classification is stated in [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md), the expected neutral quotient is stated in [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md), and the conservative unit-circle signature test is stated in [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md).

For a bounded speed factor branch, this packet is fixed-speed only unless the monodromy state includes speed perturbations and the root sensitivities use [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md). The successor variational state is

$$
\delta X^{\nu}
=
\left(
\delta\mathbf{Y},
\delta\mathbf{T},
\delta\nu,
\delta\eta,
\delta\Gamma,
\delta\mathcal{E}
\right).
$$

The dynamics residuals linearized by the monodromy are

$$
R_{N,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma_B^{\nu}P_i^\perp\widetilde{\mathbf{F}}_i^{\nu},
$$

and

$$
R_{T,i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^{\nu}\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i^{\nu}.
$$

Freezing $\nu_i$ while using bounded-speed roots gives

$$
\texttt{bounded-speed-stability-ledger-mismatch}.
$$

---

## 1. Branch State And Return Section

Let $B$ be a candidate support-complete dynamics branch with closed curve packet

$$
\mathbf{Y}_B=\{\mathbf{Y}_{i,B}\}_{i=1}^6,
$$

period $L$, memory ledger $\mathcal{A}_B$, and action/force convention fixed. Let $\mathscr{H}_B$ be the admissible history space over one memory interval with center gauge, equal-period gauge, support band, root-status convention, and inventory row imposed.

Choose a return section

$$
\Sigma_B\subset\mathscr{H}_B
$$

by fixing one phase gauge and quotienting translations, rotations that are declared gauge, and any exact phase-neutral direction. The return map is

$$
P_B:\Sigma_B\to\Sigma_B.
$$

It is defined only while the perturbed history preserves:

1. noncollision and support floors;
2. root labels and statuses;
3. Jacobian floors;
4. memory completeness or certified tail exclusion;
5. inventory and event convention.

If any row changes before return, the stability packet exits with a branch-event code rather than reporting a multiplier.

---

## 2. Linearized Root-Ledger Dynamics

Let $\xi_i(\lambda)$ be a normal perturbation of $\mathbf{Y}_{i,B}(\lambda)$. For a retained root

$$
a=(i,j,\lambda,\mu),
$$

the root variation is

$$
D_\xi\eta_a
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
\xi_i(\lambda)
-
\xi_j(\lambda-\eta_a)
\right]
}{J_a}.
$$

The force variation has three pieces:

$$
D_\xi\widetilde{\mathbf{F}}_i
=
\sum_{a\in\mathcal{A}_i}
\left(
D_\xi w_a\,\widehat{\mathbf{R}}_a
+
w_aD_\xi\widehat{\mathbf{R}}_a
\right),
$$

where

$$
w_a=\frac{\sigma_i\sigma_j}{\eta_a^2|J_a|}.
$$

The projected-force variation is

$$
D_\xi(P_i^\perp\widetilde{\mathbf{F}}_i)
=
(D_\xi P_i^\perp)\widetilde{\mathbf{F}}_i
+
P_i^\perp D_\xi\widetilde{\mathbf{F}}_i.
$$

Thus the linearized dynamics operator around a scalar-$\Gamma$ branch is

$$
\mathcal{L}_B\xi
=
\xi''
-
\Gamma_B
D_\xi(P^\perp\widetilde{\mathbf{F}})
-
(D_\xi\Gamma_B)P^\perp\widetilde{\mathbf{F}}.
$$

If $\Gamma_B$ is not action-derived, the stability packet may still report a diagnostic linearization, but its status is

$$
\texttt{floquet-gamma-fit-only}.
$$

---

## 3. Monodromy And Gauge Split

Let $\Phi_B(L)$ be the root-ledger-preserving monodromy operator for the linearized history evolution over one period. On the return section, define the reduced monodromy

$$
M_B
=
\Pi_{\mathrm{ng}}\Phi_B(L)\Pi_{\Sigma},
$$

where $\Pi_{\Sigma}$ projects initial perturbations to the section and $\Pi_{\mathrm{ng}}$ removes gauge-neutral directions at return.

The spectrum splits as

$$
\operatorname{spec}(M_B)
=
\operatorname{spec}_{\mathrm{gauge}}
\cup
\operatorname{spec}_{\mathrm{tan}}
\cup
\operatorname{spec}_{\perp}.
$$

Gauge multipliers must be declared rather than treated as instability:

$$
|\mu_g-1|\le\epsilon_g.
$$

For a stable retained limit-cycle candidate, the transverse multipliers must obey

$$
\max_{\mu\in\operatorname{spec}_{\perp}}|\mu|
\le
1-\epsilon_{\mathrm{stab}}.
$$

For a quasiperiodic carrier with $k$ neutral torus directions, exactly $k$ declared tangential multipliers may satisfy

$$
|\mu_t-1|\le\epsilon_g,
$$

and every remaining non-gauge multiplier must satisfy the same transverse bound.

---

## 4. NHIM Domination Row

For a normally hyperbolic invariant manifold target, write the continuous-time exponents as

$$
\lambda_\parallel,
\qquad
\lambda_\perp.
$$

The domination row is

$$
\max \operatorname{Re}\lambda_\perp
<
\min_{\lambda_\parallel\notin\mathrm{gauge}}
\operatorname{Re}\lambda_\parallel
-
\epsilon_{\mathrm{dom}}.
$$

If the branch has no expanding internal direction, the row is a stable carrier row. If it has declared internal expansion, the packet must also emit an entropy or mixing diagnostic and an invariant-measure target; otherwise `srb_target` remains open.

---

## 5. Perturbation Recovery

A nonlinear stability check is required because the linearized operator is valid only on a root-regular chart. Let $\Delta Z$ be a finite perturbation satisfying

$$
\|\Delta Z\|_{\mathscr{H}}\le\epsilon_P.
$$

The perturbation recovery row passes if the evolved history returns to the same section, root-status convention, memory ledger, and inventory row with

$$
\left\|
\Pi_{\mathrm{ng}}\left(P_B(Z_B+\Delta Z)-Z_B\right)
\right\|_{\mathscr{H}}
\le
\kappa_P\|\Delta Z\|_{\mathscr{H}},
$$

where

$$
\kappa_P<1
$$

for a stable limit-cycle target. For a quasiperiodic or NHIM target, the contraction is required only in the normal bundle, with neutral tangential drift projected out.

---

## 6. Stability Lemma Target

**Lemma target: root-ledger Floquet stability.** Suppose a support-complete dynamics branch candidate passes:

1. root/Jacobian, noncollision, support, memory, tail, and action-scale certificates;
2. delayed-force Lipschitz and differentiability envelopes on a history neighborhood;
3. a root-ledger-preserving monodromy calculation;
4. gauge-neutral multiplier identification;
5. transverse multiplier or NHIM domination inequalities;
6. nonlinear perturbation recovery on the same return section.

Then the branch has the declared local stability class on the retained root ledger. The conclusion is conditional on the same branch convention; changing memory, force, action, inventory, or root-status rows invalidates the stability certificate and requires recomputation.

Proof route:

1. root/Jacobian and Lipschitz envelopes give a smooth local semiflow on the retained history chart;
2. the return section removes gauge directions and makes $P_B$ a local map;
3. the monodromy spectrum controls first-order return behavior;
4. the nonlinear recovery inequality controls finite perturbations in the certified neighborhood;
5. standard Floquet or NHIM persistence applies inside the root-regular chart.

---

## 7. Current $M=3$ Reading

The present $M=3$ rows are not yet stability candidates. They lack:

1. a support-complete dynamics zero;
2. an action-derived $\Gamma_B$;
3. a root-ledger-preserving monodromy operator;
4. gauge-neutral multiplier extraction;
5. nonlinear perturbation recovery;
6. finite-mode convergence to a curve-level branch.

The status is therefore

$$
\texttt{root-ledger-floquet-stability-open},
\qquad
\texttt{dynamics-closure-required-first},
\qquad
\texttt{not-retained}.
$$

---

## 8. Required Output Fields

Future retained-branch packets should emit:

| Field | Required payload |
| --- | --- |
| `return_section` | gauge fixes, section condition, and projected history norm |
| `linearized_root_sensitivities` | $D_\xi\eta_a$ for every retained label |
| `linearized_force_operator` | $D_\xi(P^\perp\widetilde{\mathbf{F}})$ with root motion included |
| `gamma_linearization_status` | action-derived, tensorial, or fit-only |
| `monodromy_operator` | $\Phi_B(L)$ or finite-dimensional representation with root-ledger-preserving method |
| `gauge_multiplier_split` | declared gauge-neutral multipliers and tolerance |
| `transverse_spectrum` | transverse multipliers or exponents and stability margin |
| `nhim_domination` | domination gap if an NHIM target is claimed |
| `perturbation_recovery` | nonlinear recovery inequality and tested perturbation radius |
| `stability_decision` | `stable-limit-cycle`, `quasiperiodic-carrier`, `nhim-candidate`, `unstable`, or `not-computed` |

Failure/status codes:

$$
\texttt{root-ledger-floquet-stability-open},
\qquad
\texttt{floquet-root-ledger-mismatch},
\qquad
\texttt{floquet-gamma-fit-only},
$$

$$
\texttt{gauge-multiplier-unresolved},
\qquad
\texttt{nhim-domination-fail},
\qquad
\texttt{not-retained}.
$$
