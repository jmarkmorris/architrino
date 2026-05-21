# Support-Complete $M=3$ Stability Handoff

Promotion status: `priority-only`. This packet states the stability handoff required after an exact-antipodal $M=3$ support-complete dynamics/action candidate and Noether/event handoff. It specializes [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md), [root-dependent-variational-equation.md](root-dependent-variational-equation.md), [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md), [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md), [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md), and [energy-momentum-orbital-stability-theorem.md](energy-momentum-orbital-stability-theorem.md) to the current $M=3$ branch stack.

It does not retain a branch. It says what must be computed after a support-complete $M=3$ dynamics/action candidate before any stability or retention claim is allowed.

This handoff is fixed-speed unless the stability state includes the bounded speed factor. For a bounded-speed successor, replace $\xi_i(\lambda)$ by an augmented perturbation

$$
(\xi_i,\rho_i)=(\delta\mathbf{Y}_i,\delta\nu_i),
$$

and compute root, force, action-scale, and monodromy derivatives using [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md). A stability handoff that freezes $\rho_i$ after $\nu_i$ becomes a branch variable has status

$$
\texttt{bounded-speed-stability-ledger-mismatch}.
$$

---

## 1. Input Ledger

The stability handoff starts from one frozen ledger

$$
\mathcal{L}_{\mathrm{stab}}^{M3}
=
\left(
\mathcal{L}_{M3}^{+},
\mathcal{S}_{\mathrm{tot}}^{M3},
\mathcal{I}_{M3},
\Sigma_{M3},
\mathscr{H}_{M3},
\Pi_{\mathrm{red}},
W_{\mathrm{stab}}
\right),
$$

where $\mathcal{L}_{M3}^{+}$ is the same support-complete root/action ledger used by the dynamics, action, and Noether/event packets; $\mathcal{I}_{M3}$ is the conserved-current map; $\Sigma_{M3}$ is the return section; $\mathscr{H}_{M3}$ is the history chart over the certified memory interval; and $\Pi_{\mathrm{red}}$ is the gauge, neutral, and conserved-level quotient projector.

The handoff is invalid if any row changes root labels, memory depth, endpoint convention, action convention, inventory labels, or Noether current levels:

$$
\texttt{floquet-root-ledger-mismatch}.
$$

---

## 2. Root-Dependent Variational Operator

For a perturbation $\xi_i(\lambda)$, every retained root or root sheet $a$ must vary with the perturbation:

$$
D_\xi\eta_a
=
\frac{
\widehat{\mathbf{R}}_a\cdot
\left[
\xi_i(\lambda)-\xi_j(\lambda-\eta_a)
\right]
}{
J_a
}.
$$

The force variation is

$$
D_\xi\widetilde{\mathbf{F}}_i
=
\sum_{a\in\mathcal{A}_{i}^{+}}
D_\xi\mathbf{f}_a,
$$

where $D_\xi\mathbf{f}_a$ includes the variation of $\eta_a$, $\widehat{\mathbf{R}}_a$, and $J_a$ on the fixed sign stratum. If tail sheets were assimilated, this uses the sheet derivatives from [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md).

The linearized support-complete dynamics operator is

$$
\mathcal{L}_{M3}\xi
=
D_\xi\mathbf{K}
-
\Gamma_BD_\xi(P^\perp\widetilde{\mathbf{F}})
-
D_\xi\Gamma_B\,P^\perp\widetilde{\mathbf{F}}.
$$

The tangential row is

$$
\mathcal{T}_{M3}\xi
=
D_\xi\mathbf{T}\cdot\widetilde{\mathbf{F}}
+
\mathbf{T}\cdot D_\xi\widetilde{\mathbf{F}}.
$$

The variational row is valid only when

$$
\mathcal{L}_{M3}\xi=0,
\qquad
\mathcal{T}_{M3}\xi=0,
$$

modulo declared gauge, branch-tangent, and fixed-current constraints. A frozen-root matrix has status

$$
\texttt{floquet-frozen-root-invalid}.
$$

If the scale derivative uses a fitted $\Gamma_K$ rather than the action-derived row, the status is

$$
\texttt{floquet-gamma-fit-only}.
$$

---

## 3. Return Section And Monodromy

Choose a return section

$$
\Sigma_{M3}=\{Z:h_\Sigma(Z)=0\}
$$

inside the root-regular history chart. Let $\Phi_{M3}(L_*)$ be the solution operator of the root-dependent variational equation over one arclength period. The return-map derivative is

$$
DP_{M3}(Z_B)
=
\Pi_\Sigma\Phi_{M3}(L_*)
-
\dot Z_B
\frac{
Dh_\Sigma[\Phi_{M3}(L_*)(\cdot)]
}{
Dh_\Sigma[\dot Z_B]
}.
$$

After quotienting gauge, declared tangent-family directions, physical neutral directions, and fixed Noether-current levels, the reduced monodromy is

$$
M_{M3}
=
\Pi_{\mathrm{red}}DP_{M3}(Z_B)\Pi_{\mathrm{red}}.
$$

The packet must emit the spectrum split

$$
\operatorname{spec}(M_{M3})
=
\operatorname{spec}_{\mathrm{gauge}}
\cup
\operatorname{spec}_{\mathrm{neutral}}
\cup
\operatorname{spec}_{\perp}.
$$

Gauge and declared neutral multipliers near $1$ do not count as instability. Undeclared unit multipliers do:

$$
\texttt{extra-unit-multiplier-degeneracy}.
$$

---

## 4. Noether Neutral Reduction

Let the declared continuous generator algebra be

$$
\mathfrak{g}_{M3}
=
\mathfrak{g}_{\mathrm{time}}
\oplus
\mathfrak{g}_{\mathrm{trans}}
\oplus
\mathfrak{g}_{\mathrm{rot}}
\oplus
\mathfrak{g}_{\mathrm{phase}}
\oplus
\mathfrak{g}_{\mathrm{int}},
$$

with only actually admitted summands included. The expected neutral subspace is

$$
\mathcal{U}_{M3}
=
\mathcal{G}_{M3}
\oplus
\mathcal{T}_{M3}
\oplus
\mathcal{P}_{M3},
$$

where $\mathcal{G}_{M3}$ is pure gauge, $\mathcal{T}_{M3}$ is declared branch-family or torus tangent freedom, and $\mathcal{P}_{M3}$ is physical neutral freedom required by a conservation law or exact symmetry.

The conserved-current map from the Noether/event handoff is

$$
\mathcal{I}_{M3}
=
\left(
E,
\mathbf{p},
\mathbf{J},
Q,
\mathcal{R}_{\mathrm{src}}
\right).
$$

The fixed-current projector is

$$
\Pi_{\ker D\mathcal{I}}
=
I
-
W_{\mathrm{stab}}^{-1}D\mathcal{I}_{M3}^{*}
\left(
D\mathcal{I}_{M3}W_{\mathrm{stab}}^{-1}D\mathcal{I}_{M3}^{*}
\right)^{-1}
D\mathcal{I}_{M3}.
$$

The final reduced projector combines fixed-current and neutral quotient rows:

$$
\Pi_{\mathrm{red}}
=
\Pi_{\ker D\mathcal{I}}
\Pi_{\perp}
\Pi_{\ker D\mathcal{I}}.
$$

If the conserved-current map is missing, the stability packet exits with

$$
\texttt{conservation-leaf-projector-open}.
$$

If the measured nullity differs from the expected generator count, it exits with

$$
\texttt{expected-nullity-mismatch}.
$$

---

## 5. Conservative Monodromy Audit

If the Noether/event handoff declares a conservative closed branch, the return map should preserve the reduced boundary two-form. Let

$$
\Omega_{\perp}^{M3}
=
d\Theta_{\perp}^{M3}
$$

be the boundary two-form on the reduced quotient. The presymplectic audit is

$$
E_{\Omega}
=
M_{M3}^{T}\Omega_{\perp}^{M3}M_{M3}
-
\Omega_{\perp}^{M3},
$$

with acceptance criterion

$$
\frac{\|E_{\Omega}\|}
{1+\|\Omega_{\perp}^{M3}\|}
\le
\epsilon_{\Omega}.
$$

If $\Omega_{\perp}^{M3}$ is nondegenerate and this audit passes, transverse multipliers must occur in reciprocal pairs:

$$
\mu,\quad
\overline{\mu},\quad
\mu^{-1},\quad
\overline{\mu}^{-1}.
$$

Therefore strict attraction,

$$
\max_{\mu\in\operatorname{spec}_{\perp}}|\mu|
\le
1-\epsilon_{\mathrm{stab}},
$$

is incompatible with a conservative nondegenerate quotient unless a dissipative or boundary-exchange row is declared. The failure status is

$$
\texttt{floquet-conservative-contraction-incompatible}.
$$

---

## 6. Stability Alternatives

The stability handoff has three mathematically distinct outcomes.

### 6.1 Conservative Elliptic Candidate

If every non-gauge transverse multiplier satisfies

$$
||\mu|-1|\le\epsilon_{\mathrm{ell}},
$$

and every unit-circle eigenspace is semisimple with definite nonzero Krein form

$$
\mathfrak{k}_{\mu}(v,w)
=
i\Omega_{\perp}^{M3}(\overline{v},w),
$$

then the status is

$$
\texttt{m3-conservative-elliptic-candidate}.
$$

This means conservative linear boundedness candidate, not attracting stability.

### 6.2 Conservative Orbital-Stable Candidate

Let the fixed-current leaf be

$$
\mathcal{C}_{\mu_B}
=
\{Z:\mathcal{I}_{M3}(Z)=\mu_B\}.
$$

Let $\mathcal{S}_{M3}$ be the symplectic slice after quotienting group orbit, gauge, branch-family, and expected neutral directions. The energy-momentum Hessian is

$$
Q_{\mathrm{EM},M3}
=
D^2
\left(
\mathcal{S}_{\mathrm{tot}}^{M3}
-
\langle\Lambda,\mathcal{I}_{M3}\rangle
\right).
$$

If

$$
Q_{\mathrm{EM},M3}[\eta,\eta]
\ge
c_B\|[\eta]\|_{H^1_{\eta}}^2,
\qquad
c_B>0,
$$

on the slice and the Krein audit is clean, the status is

$$
\texttt{m3-conservative-orbital-stable-candidate}.
$$

The conclusion is orbital boundedness on the fixed current leaf, not asymptotic attraction.

### 6.3 Dissipative Or Exchange Attractor Candidate

If a Noether-Sea, medium-response, or boundary-exchange row is admitted, the packet may test contraction only after it emits a positive dissipation quadratic form

$$
D_{M3}[\xi,\xi]\ge d_B\|\xi\|_{\mathscr{H}}^2,
\qquad
d_B>0,
$$

and an action-energy inequality

$$
\mathcal{E}_{\mathrm{lin}}(M_{M3}\xi)
\le
(1-\alpha_B)
\mathcal{E}_{\mathrm{lin}}(\xi)
+
\epsilon_{\mathrm{exch}}\|\xi\|^2.
$$

Only then may the status be

$$
\texttt{m3-dissipative-attractor-candidate}.
$$

---

## 7. Nonlinear Perturbation Recovery

Every stability alternative remains only linear until the perturbation recovery row passes. For perturbations inside the certified history ball,

$$
\|\Delta Z\|_{\mathscr{H}}\le\epsilon_P,
$$

the evolved history must preserve root labels, tail status, Jacobian floors, noncollision floors, support bounds, inventory labels, action convention, and event convention. The recovery inequality is

$$
\left\|
\Pi_{\mathrm{red}}
\left(
P_{M3}(Z_B+\Delta Z)-Z_B
\right)
\right\|_{\mathscr{H}}
\le
\kappa_P\|\Delta Z\|_{\mathscr{H}}.
$$

For an attracting exchange row, require $\kappa_P<1$. For a conservative orbital row, replace contraction by bounded distance to the group orbit on the fixed current leaf:

$$
\operatorname{dist}
\left(
P_{M3}^{n}(Z_B+\Delta Z),
G_{\mu_B}\cdot Z_B
\right)
\le
C\|\Delta Z\|.
$$

If this row is absent, the status remains

$$
\texttt{nonlinear-recovery-required}.
$$

---

## 8. Handoff Theorem

**Theorem target: exact-antipodal $M=3$ stability handoff.** Suppose an exact-antipodal $M=3$ packet supplies a support-complete dynamics/action candidate, Noether/event handoff, fixed-current map, root-dependent variational operator, return section, neutral-mode quotient, boundary two-form audit, and perturbation recovery row, all on $\mathcal{L}_{\mathrm{stab}}^{M3}$.

Then the branch may receive exactly one stability classification:

$$
\texttt{m3-conservative-elliptic-candidate},
\qquad
\texttt{m3-conservative-orbital-stable-candidate},
\qquad
\texttt{m3-dissipative-attractor-candidate},
$$

or a first-failure status from Section 10. No attracting classification is allowed on a conservative nondegenerate quotient. No conservative orbital-stability classification is allowed without the fixed-current leaf, symplectic slice, and energy-momentum Hessian.

Proof route:

1. root and sheet derivative envelopes define the variational history flow;
2. the return section gives the reduced monodromy;
3. Noether neutral reduction removes gauge and expected unit directions;
4. the boundary two-form audit distinguishes conservative reciprocal-pair dynamics from exchange-driven contraction;
5. Krein and energy-momentum rows classify conservative boundedness or saddle behavior;
6. nonlinear perturbation recovery upgrades the linear classification inside the certified root-regular neighborhood.

---

## 9. Required Output Fields

A successor exact-antipodal $M=3$ stability packet must emit:

| Field | Required payload |
| --- | --- |
| `stability_ledger_id` | root, memory, endpoint, action, event, current, and quotient conventions |
| `return_section` | phase condition, section projector, and history norm |
| `root_dependent_variational_operator` | $D\eta_a$, $D\mathbf{f}_a$, $D\Gamma_B$, $\mathcal{L}_{M3}$, and $\mathcal{T}_{M3}$ |
| `monodromy_operator` | $\Phi_{M3}(L_*)$, $DP_{M3}$, and $M_{M3}$ |
| `neutral_mode_reduction` | generator variations, expected nullity, fixed-current projector, and quotient rank |
| `boundary_two_form` | $\Theta_{\perp}^{M3}$, $\Omega_{\perp}^{M3}$, rank, and preservation audit |
| `spectrum` | gauge, neutral, and transverse multipliers with pairing residuals |
| `krein_rows` | unit eigenspaces, Krein signatures, and collision scan |
| `energy_momentum_rows` | fixed-current leaf, symplectic slice, augmented Hessian, and coercivity margin |
| `exchange_rows` | dissipation/storage/contraction data if attraction is claimed |
| `perturbation_recovery` | finite perturbation radius, persistence margins, and recovery inequality |
| `stability_handoff_status` | one status from Section 10 |

---

## 10. Decision Statuses

The handoff can return:

| Status | Meaning |
| --- | --- |
| `m3-conservative-elliptic-candidate` | conservative unit-circle/Krein rows pass after neutral reduction |
| `m3-conservative-orbital-stable-candidate` | fixed-current energy-momentum Hessian is coercive on the symplectic slice |
| `m3-dissipative-attractor-candidate` | admitted exchange row supplies positive dissipation and nonlinear contraction |
| `dynamics-action-candidate-required-first` | no support-complete dynamics/action candidate exists |
| `noether-event-handoff-required-first` | fixed-current map or Noether/event currents are missing |
| `floquet-root-ledger-mismatch` | monodromy uses different root, memory, action, or event convention |
| `floquet-frozen-root-invalid` | root motion or root-sheet motion is frozen in the variational operator |
| `floquet-gamma-fit-only` | scale derivative uses diagnostic fitted $\Gamma_K$ rather than action scale |
| `conservation-leaf-projector-open` | fixed-current projector cannot be built |
| `expected-nullity-mismatch` | measured neutral nullity differs from declared generator count |
| `presymplectic-form-open` | boundary two-form is missing |
| `omega-rank-nullity-unresolved` | reduced two-form rank or nullity is not certified |
| `reciprocal-multiplier-pairing-fail` | conservative reciprocal multiplier audit fails |
| `floquet-conservative-contraction-incompatible` | strict contraction is claimed on a conservative nondegenerate quotient |
| `krein-form-not-defined` | unit-circle eigenspace lacks a nondegenerate Krein form |
| `energy-momentum-current-open` | fixed current components are not declared |
| `symplectic-slice-degenerate` | energy-momentum slice is degenerate |
| `constrained-hessian-not-coercive` | energy-momentum Hessian is not positive on the slice |
| `medium-damping-required` | attraction is claimed without an admitted exchange/dissipation row |
| `nonlinear-recovery-required` | finite perturbation recovery has not been certified |

Current exact-antipodal $M=3$ status remains

$$
\texttt{root-ledger-floquet-stability-open},
\qquad
\texttt{not-retained},
$$

until this handoff is run after dynamics/action and Noether/event closure.
