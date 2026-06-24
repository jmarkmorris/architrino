# Branch Selection Law Packet

Status. Priority proof packet for `tri_binary_partition_rule` after [fundamental-ledger-branch-chart-packet.md](fundamental-ledger-branch-chart-packet.md) and [minimal-four-substep-certificate-instance.md](minimal-four-substep-certificate-instance.md). This file defines a deterministic branch-selection residual law target. It is not reader-facing prose and it does not promote branch uniqueness, spinor closure, measurement response, or Bell recovery to theorem status.

Claim level. The packet turns the current branch-dependent blocker into a concrete residual object:

$$
\operatorname{Sel}_B:
\Gamma_{\text{coupl}}\times\mathfrak m_{B^-}
\longrightarrow
\mathcal A(B^-,\Gamma_{\text{coupl}},W),
$$

where $\mathfrak m_{B^-}$ is the unresolved microstate data retained by the declared pre-transaction branch chart. A theorem-grade branch-selection law still requires either a unique selected post-branch or a declared physical tie-breaking invariant. A label-order convention, file order, or numerical solver order is not a physical selection law.

## Inputs And Candidate Post-Branch Set

Fix a transition window

$$
W=[t_i,t_f],
$$

a pre-transaction branch chart $B^-$, and a coupling datum

$$
\Gamma_{\text{coupl}}
=
\left(
\sigma,
\Delta E_{\text{coupl}},
\Delta\mathbf J_{\text{coupl}},
\hat{\mathbf a},
\mathrm{Geom}_{\text{coupl}}
\right),
\qquad
\sigma\in\{+1,-1\}.
$$

The branch-selection packet evaluates post-transaction chart candidates generated from $B^-$ by declared root-continuation, fold, separator, grouped-channel, recoil, wake-exchange, or transport-routing rules. A candidate record is

$$
\mathfrak a
=
\left(
B^+,
\boldsymbol{\Delta I},
\kappa,
\mathfrak m_{B^+}
\right),
$$

where

$$
\boldsymbol{\Delta I}
=
\left(
\Delta I_{\text{inner}},
\Delta I_{\text{middle}},
\Delta I_{\text{outer}},
\Delta I_{\text{wake}}
\right),
$$

$\kappa$ records the declared outcome class, and $\mathfrak m_{B^+}$ records the post-branch microstate data needed to compare physically distinct candidates.

Define the candidate post-branch set

$$
\mathcal A(B^-,\Gamma_{\text{coupl}},W)
=
\left\{
\mathfrak a:
\begin{array}{l}
B^+\text{ is produced from }B^-\text{ by a declared branch-continuation or routing rule on }W,\\
\Gamma_{\text{coupl}}\text{ is held fixed, including }\hat{\mathbf a}\text{ and source or apparatus recoil data},\\
\mathfrak C_{\mathbf J}(B^-,B^+,\Gamma_{\text{coupl}},W;h,\eta,\epsilon_c)\text{ is evaluable},\\
\text{the same retained active rows are used for force, torque, wake, and partition residuals}
\end{array}
\right\}.
$$

If any row in $\mathfrak C_{\mathbf J}$ cannot be evaluated because the retained row set, endpoint convention, normalized tail-wake pullback, or branch-continuation rule is missing, the candidate is blocked rather than accepted or forbidden.

Partition the candidate set into local outcome classes:

$$
\mathcal A
=
\mathcal A_{\mathrm{core}}
\cup
\mathcal A_{\mathrm{wake}}
\cup
\mathcal A_{\mathrm{refl}},
$$

where:

- $\mathcal A_{\mathrm{core}}$ contains post-branches whose core partition changes and whose declared wake and transport terms are part of the same full vector and energy ledger.
- $\mathcal A_{\mathrm{wake}}$ contains post-branches routed into wake exchange, with $\Delta I_{\text{wake}}\ne0$ or $\Delta E_{\mathrm{wake},B}^{(\eta)}\ne0$ retained as an evaluated ledger term rather than as a hidden correction.
- $\mathcal A_{\mathrm{refl}}$ contains stable recoil branches with no accepted core partition change and an outgoing source or apparatus channel carrying the reflected angular momentum.

These classes are mutually exclusive only after the routing rule is declared. If one candidate can be described in two classes without changing the residual rows, the packet is underspecified.

## Branch-Selection Residual Vector

For each evaluable candidate $\mathfrak a\in\mathcal A(B^-,\Gamma_{\text{coupl}},W)$, define the hard residual vector

$$
\mathcal R_{\mathrm{sel}}(\mathfrak a)
=
\left(
r_{\mathrm{rows}},
r_{\mathrm{root}},
r_{\Phi},
r_{\mathrm{stab}},
r_{\mathrm{pull}},
r_{\mathrm{part}},
r_{\mathrm{route}}
\right).
$$

The row-identity entry is a hard Boolean residual:

$$
r_{\mathrm{rows}}(\mathfrak a)
=
\begin{cases}
0,
&
\mathcal R_{\mathrm{force}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{torque}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{wake}}^{\mathrm{act}},\\
\infty,
&\text{otherwise.}
\end{cases}
$$

The root and phase entries are normalized by the declared certificate tolerances:

$$
r_{\mathrm{root}}
=
\max
\left\{
\frac{\epsilon_{\mathrm{root}}(B^-)}{\varepsilon_{\mathrm{root}}},
\frac{\epsilon_{\mathrm{root}}(B^+)}{\varepsilon_{\mathrm{root}}},
\frac{\epsilon_{\mathrm{rt}}(B^-)}{\varepsilon_{\mathrm{rt}}},
\frac{\epsilon_{\mathrm{rt}}(B^+)}{\varepsilon_{\mathrm{rt}}},
\frac{\nu_{\min}}{\nu_J(B^-)},
\frac{\nu_{\min}}{\nu_J(B^+)},
\frac{g_{\min}}{g_{\mathrm{inact}}(B^-)},
\frac{g_{\min}}{g_{\mathrm{inact}}(B^+)}
\right\},
$$

$$
r_{\Phi}
=
\max
\left\{
\frac{\epsilon_{\Phi}(B^-)}{\varepsilon_{\Phi}},
\frac{\epsilon_{\Phi}(B^+)}{\varepsilon_{\Phi}}
\right\}.
$$

The stability entry is

$$
r_{\mathrm{stab}}
=
\max
\left\{
\frac{\left\|\mathcal R_{\mathrm{return}}(B^+)\right\|}
{\varepsilon_{\mathrm{return}}},
\frac{\rho(M_{\mathcal S}\vert_{E_\perp})}
{1-\lambda_{\mathrm{sec}}^{B^+}}
\right\},
$$

with the convention $r_{\mathrm{stab}}=\infty$ if $\lambda_{\mathrm{sec}}^{B^+}\le0$ or if $1-\lambda_{\mathrm{sec}}^{B^+}\le0$. A declared positive trapping replacement may replace the second entry, but it must be reported as part of the same certificate row rather than as a new gate.

The pullback entry checks torque consistency and normalized delayed-interior characteristic-tail wake charge:

$$
r_{\mathrm{pull}}
=
\max
\left\{
\max_{\ell\in\{I,M,O\}}
\frac{\left\|\mathcal R_{T,\ell}^{B^+}\right\|}{\varepsilon_T},
\frac{\left\|\mathcal R_{\mathrm{wake}}^{B^+}\right\|}
{\varepsilon_{\mathrm{wake}}}
\right\}.
$$

The partition entry is

$$
r_{\mathrm{part}}
=
\max
\left\{
\frac{\left\|\mathcal R_{\mathbf J}^{B^+}\right\|}
{\varepsilon_{\mathbf J}},
\frac{\left|\mathcal R_I^{B^+}\right|}{\varepsilon_I},
\frac{\left\|\mathcal R_{\perp}^{B^+}\right\|}
{\varepsilon_{\perp}},
\frac{\left|\mathcal R_E^{B^+}\right|}{\varepsilon_E}
\right\}.
$$

The routing entry prevents wake, root-energy, recoil, and transport terms from being used as undeclared slack:

$$
r_{\mathrm{route}}
=
\max
\left\{
\chi_{\mathrm{undecl}},
\frac{\left\|\Delta\mathbf L_{\mathrm{tr}}^{B^+}\right\|}
{\left\|\Delta\mathbf J_{\text{coupl}}\right\|+\varepsilon_{\mathbf J}},
\frac{\left\|\Delta\mathbf J_{\mathrm{wake},B^+}^{(\eta)}[W]\right\|}
{\left\|\Delta\mathbf J_{\text{coupl}}\right\|+\varepsilon_{\mathbf J}},
\frac{\left|\Delta E_{\mathrm{root}}^{B^+}\right|
+\left|\Delta E_{\mathrm{wake},B^+}^{(\eta)}\right|}
{\left|\Delta E_{\text{coupl}}\right|+\varepsilon_E}
\right\},
$$

where $\chi_{\mathrm{undecl}}=0$ when every nonzero routing term has a declared source in the branch chart and $\chi_{\mathrm{undecl}}=\infty$ otherwise.

A candidate passes the hard branch-selection residual rows when

$$
\left\|\mathcal R_{\mathrm{sel}}(\mathfrak a)\right\|_{\infty}
\le
1.
$$

This pass condition is a certificate filter only. It does not by itself select among multiple passing candidates.

## Deterministic Selection Rule

For each outcome class $\mathcal A_\kappa$, define the passing subset

$$
\mathcal A_\kappa^{\mathrm{pass}}
=
\left\{
\mathfrak a\in\mathcal A_\kappa:
\left\|\mathcal R_{\mathrm{sel}}(\mathfrak a)\right\|_{\infty}\le1
\right\}.
$$

The outcome-class priority is:

$$
\mathcal A_{\mathrm{core}}^{\mathrm{pass}}
\succ
\mathcal A_{\mathrm{wake}}^{\mathrm{pass}}
\succ
\mathcal A_{\mathrm{refl}}^{\mathrm{pass}}.
$$

Thus a core partition is selected if any core candidate passes. A wake-routed candidate is selected only when no core candidate passes. A reflected candidate is selected only when no core or wake-routed candidate passes. This priority is part of the packet's proposed law and remains a theorem target, not an established dynamical theorem.

Within the highest nonempty passing outcome class, select by lexicographic minimization of

$$
\mathcal J_{\mathrm{sel}}(\mathfrak a)
=
\left(
r_{\mathrm{part}},
r_{\mathrm{pull}},
r_{\mathrm{root}},
r_{\Phi},
r_{\mathrm{stab}},
\mathcal D_{\mathrm{route}},
\mathcal D_{\mathrm{cont}},
\tau_{\mathfrak m}
\right).
$$

The routing load is

$$
\mathcal D_{\mathrm{route}}
=
\left(
\frac{\left\|\Delta\mathbf L_{\mathrm{tr}}^{B^+}\right\|}
{\left\|\Delta\mathbf J_{\text{coupl}}\right\|+\varepsilon_{\mathbf J}},
\frac{\left\|\Delta\mathbf J_{\mathrm{wake},B^+}^{(\eta)}[W]\right\|}
{\left\|\Delta\mathbf J_{\text{coupl}}\right\|+\varepsilon_{\mathbf J}},
\frac{\left|\Delta E_{\mathrm{root}}^{B^+}\right|
+\left|\Delta E_{\mathrm{wake},B^+}^{(\eta)}\right|}
{\left|\Delta E_{\text{coupl}}\right|+\varepsilon_E}
\right).
$$

The branch-continuation displacement is a declared chart functional

$$
\mathcal D_{\mathrm{cont}}
=
D_{\mathrm{retune}}
+D_{\mathrm{normal}}
+D_{\mathrm{root}}
+D_{\mathrm{phase}},
$$

with local components

$$
D_{\mathrm{retune}}
=
\sum_{\ell\in\{I,M,O\}}
\left(
\frac{\left|\Delta R_\ell\right|}{R_\ell^-+\epsilon_R}
+
\frac{\left|\Delta\omega_\ell\right|}{\left|\omega_\ell^-\right|+\epsilon_\omega}
\right),
$$

$$
D_{\mathrm{normal}}
=
\sum_{\ell\in\{I,M,O\}}
\left\|\Delta\hat{\mathbf n}_\ell\right\|,
$$

and $D_{\mathrm{root}}$ and $D_{\mathrm{phase}}$ count only declared fold, separator, grouped-channel, branch-continuation, and phase-cell changes. They must not count arbitrary root-label relabeling as physical closeness.

The final entry $\tau_{\mathfrak m}$ is a physical microstate ordering invariant supplied by $\mathfrak m_{B^-}$ and $\mathfrak m_{B^+}$. It may use retained history-sheet order, source/receiver ordering, phase-cell orientation, or another declared invariant of the branch chart. If $\tau_{\mathfrak m}$ is absent, chart-label dependent, or changes under an allowed relabeling of the same retained rows, it is not a valid tie-breaker.

The branch-selection map is therefore

$$
\operatorname{Sel}_B
\left(
\Gamma_{\text{coupl}},
\mathfrak m_{B^-};W
\right)
=
\operatorname{lexmin}_{\mathfrak a\in\mathcal A_{\kappa_\star}^{\mathrm{pass}}}
\mathcal J_{\mathrm{sel}}(\mathfrak a),
$$

where $\mathcal A_{\kappa_\star}^{\mathrm{pass}}$ is the highest-priority nonempty passing outcome class.

## Outcome Classification

The transaction is accepted when

$$
\mathcal A_{\mathrm{core}}^{\mathrm{pass}}\ne\varnothing
$$

and the lexicographic minimum is unique after quotienting by declared chart isomorphisms. The selected element gives the branch-selected partition

$$
\boldsymbol{\Delta I}_{\mathrm{sel}}
=
\left(
\Delta I_{\text{inner}},
\Delta I_{\text{middle}},
\Delta I_{\text{outer}},
\Delta I_{\text{wake}}
\right)_{\operatorname{Sel}_B}.
$$

The transaction is routed into wake exchange when

$$
\mathcal A_{\mathrm{core}}^{\mathrm{pass}}=\varnothing,
\qquad
\mathcal A_{\mathrm{wake}}^{\mathrm{pass}}\ne\varnothing,
$$

and the selected wake-routed candidate has an evaluated nonzero wake contribution that closes the full vector and energy residuals. This is not an accepted clean core partition; it is a routed branch with explicit wake ledger responsibility.

The transaction is routed to reflection when

$$
\mathcal A_{\mathrm{core}}^{\mathrm{pass}}
=
\mathcal A_{\mathrm{wake}}^{\mathrm{pass}}
=
\varnothing,
\qquad
\mathcal A_{\mathrm{refl}}^{\mathrm{pass}}\ne\varnothing.
$$

The reflected branch must report the outgoing source or apparatus angular momentum $\Delta\mathbf J_{\mathrm{refl}}$ and must close the same vector, energy, root, phase, wake, and stability rows.

The transaction is forbidden only when all evaluable passing sets are empty and no candidate is blocked by missing certificate data:

$$
\mathcal A_{\mathrm{core}}^{\mathrm{pass}}
=
\mathcal A_{\mathrm{wake}}^{\mathrm{pass}}
=
\mathcal A_{\mathrm{refl}}^{\mathrm{pass}}
=
\varnothing.
$$

If a candidate set is empty because root rows, wake pullbacks, torque rows, or stability rows were not populated, the correct verdict is blocked, not forbidden.

## Tie Cases

Two candidates are the same candidate if a declared chart isomorphism maps their retained active rows, path-history records, phase cells, wake pullback, and partition residual rows onto one another. Such duplicates are quotient artifacts and do not create branch dependence.

A tolerance tie occurs when interval or numerical bounds overlap so that two non-isomorphic candidates cannot be ordered by $\mathcal J_{\mathrm{sel}}$. The certificate verdict is then

$$
\operatorname{Tie}_{\varepsilon}
\left(
\mathfrak a_1,\mathfrak a_2
\right),
$$

and the branch-selection law is blocked until the residual intervals separate or a valid $\tau_{\mathfrak m}$ orders the candidates.

An exact physical tie occurs when two non-isomorphic passing candidates have identical $\mathcal J_{\mathrm{sel}}$ and no declared microstate invariant separates them. The theorem target remains branch-dependent:

$$
\left|\operatorname{arglexmin}\mathcal J_{\mathrm{sel}}\right|>1.
$$

A symmetry-paired tie is allowed only if the coupling geometry and microstate data do not distinguish the pair and the later measurement-response model carries the resulting unresolved branch measure explicitly. It is not a deterministic single-branch selection.

## Minimal Four-Substep Branch As A Test Case

For the clean positive outer-coupled certificate,

$$
\sigma=+1,
\qquad
\Delta\mathbf J_{\text{coupl}}=\hbar\hat{\mathbf a},
\qquad
\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]=\mathbf 0,
\qquad
\Delta\mathbf L_{\mathrm{tr}}^{B_{\min}}=\mathbf 0,
$$

and

$$
\boldsymbol{\Delta I}_{\min}
=
\left(
\frac{\hbar}{2},
\frac{\hbar}{4},
\frac{\hbar}{4},
0
\right).
$$

The populated algebraic rows give

$$
\mathcal R_I^{B_{\min}}=0,
\qquad
\mathcal R_{\mathbf J}^{B_{\min}}=\mathbf 0,
\qquad
\mathcal R_{\perp}^{B_{\min}}=\mathbf 0,
$$

and

$$
\mathcal R_E^{B_{\min}}
=
\left(\omega_\ast-\omega_{\text{tx}}\right)\hbar,
\qquad
\omega_\ast
=
\frac{\omega_O^\ast+\omega_M^\ast+2\omega_I^\ast}{4}.
$$

Therefore $B_{\min}^+$ can enter $\mathcal A_{\mathrm{core}}^{\mathrm{pass}}$ only if:

1. the retained root-chart, phase-lock, torque-consistency, normalized tail-wake pullback, and section-stability rows are populated and pass;
2. the outer speed, middle hinge, inner self-hit, and self-root parity rows pass;
3. $\left|\omega_{\text{tx}}-\omega_\ast\right|\hbar\le\varepsilon_E$, or a declared non-clean channel moves the candidate into $\mathcal A_{\mathrm{wake}}$ or another routed class.

The minimal branch is therefore the first calibration candidate for the selection law. It is not a proof that every supplied coupling geometry selects the same four-substep partition.

## Failure Modes Sharpened By This Packet

1. **Blocked candidate enumeration.** $\mathcal A(B^-,\Gamma_{\text{coupl}},W)$ is not evaluable because the post-branch generator, retained row set, or routing rule is missing.
2. **Row-set mismatch.** Force, torque, normalized tail-wake pullback, and partition residuals do not use the same retained active rows.
3. **Scalar-only closure.** $\mathcal R_I^{B^+}$ passes while $\mathcal R_{\mathbf J}^{B^+}$, $\mathcal R_{\perp}^{B^+}$, or $\mathcal R_E^{B^+}$ fails.
4. **Hidden routing slack.** Root-energy, wake-energy, recoil, or transport terms are used without a declared branch-chart source.
5. **Phase relabeling.** Phase lock closes only after undeclared root relabeling, phase-cell replacement, or branch-label sorting.
6. **Unstable algebraic branch.** The partition rows close, but return residual, inactive gap, Jacobian floor, phase margin, or section-stability margin fails.
7. **Residual tie.** Two non-isomorphic candidates cannot be ordered by the residual intervals.
8. **Physical exact tie.** Two passing candidates remain tied after chart isomorphism quotienting and no valid $\tau_{\mathfrak m}$ exists.
9. **Minimal-branch overreach.** The four-substep branch is used as a universal rule without checking its energy-frequency row and blocked branch-chart rows.

## Proof Burden Left Open

This packet supplies the deterministic residual law target, not the proof that delayed Noether braid dynamics realizes it. The next proof burden is to compute at least one nontrivial finite candidate set $\mathcal A(B^-,\Gamma_{\text{coupl}},W)$ from retained branch-chart data, evaluate $\mathcal R_{\mathrm{sel}}$ on every candidate, and show either:

$$
\left|
\operatorname{arglexmin}_{\mathfrak a\in\mathcal A_{\kappa_\star}^{\mathrm{pass}}}
\mathcal J_{\mathrm{sel}}(\mathfrak a)
\right|
=
1,
$$

or a controlled tie case that is carried forward as unresolved microstate measure rather than hidden inside a theorem claim.
