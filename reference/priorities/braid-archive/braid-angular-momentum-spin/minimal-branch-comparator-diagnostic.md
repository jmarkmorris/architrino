# Minimal Branch Comparator Diagnostic

Status. Priority proof packet for `tri_binary_partition_rule`, downstream of [minimal-candidate-set-instance.md](minimal-candidate-set-instance.md), [finite-branch-candidate-set-packet.md](finite-branch-candidate-set-packet.md), and [branch-selection-law-packet.md](branch-selection-law-packet.md). This packet defines the first two-candidate comparator diagnostic between the blocked reduced minimal core candidate and a hypothetical retained wake or recoil competitor. It is priority material only. It does not promote branch uniqueness, spinor closure, measurement response, Bell recovery, or a universal minimal-branch rule to theorem status.

Claim level. Defer with blocker. The diagnostic gives a common residual vector format for comparing

$$
\mathfrak a_{\min}
\quad\text{against}\quad
\mathfrak a_{\mathrm{wr}},
$$

where $\mathfrak a_{\min}$ is the reduced minimal candidate from [minimal-candidate-set-instance.md](minimal-candidate-set-instance.md), and $\mathfrak a_{\mathrm{wr}}$ is a hypothetical retained wake or recoil competitor emitted by the finite candidate-set machinery. The packet can identify which rows are populated, blocked, or locally excluded. It cannot select a branch until both candidates have evaluable retained row payloads and the branch-selection law has a valid ordering or tie verdict.

Promotion decision. Defer with blocker. Promote only after a concrete finite retained candidate set contains at least these two non-duplicate records, both records populate the same residual vector fields, and the branch-selection law can report one of:

$$
\operatorname{Sel}_{B,N}=\mathfrak a_{\min},
\qquad
\operatorname{Sel}_{B,N}=\mathfrak a_{\mathrm{wr}},
\qquad
\operatorname{Tie}_{\varepsilon}(\mathfrak a_{\min},\mathfrak a_{\mathrm{wr}}),
$$

with no hidden wake, recoil, transport, or root-energy slack. Until then, the correct state is blocked diagnostic comparison, not branch uniqueness.

## Comparator Inputs

Fix the same reduced transition window, pre-branch chart, and coupling datum used by the minimal candidate instance:

$$
W_{\min}=[t_i,t_f],
\qquad
B_{\min}^-,
\qquad
\Gamma_{\min}
=
\left(
+1,
\Delta E_{\mathrm{tx}},
\Delta\mathbf J_{\mathrm{tx}},
\hat{\mathbf a},
\mathrm{Geom}_{\min}
\right).
$$

Let the reduced minimal candidate be

$$
\mathfrak a_{\min}
=
\left(
B_{\min}^+,
\boldsymbol{\Delta I}_{\min},
\mathrm{core},
\mathfrak m_{B_{\min}^+},
\lambda_{\min},
\mathcal P_{\min}^{\mathrm{red}},
\mathcal Q_{\min}^{\mathrm{iso}},
\mathrm{blocked}
\right),
$$

with

$$
\boldsymbol{\Delta I}_{\min}
=
\left(
\frac{\hbar}{2},
\frac{\hbar}{4},
\frac{\hbar}{4},
0
\right)
$$

in the clean positive outer-coupled calibration.

The competing retained record is a placeholder for the first non-minimal candidate that preserves the same coupling datum but routes non-clean ledger terms through a declared wake or recoil channel:

$$
\mathfrak a_{\mathrm{wr}}
=
\left(
B_{\mathrm{wr}}^+,
\boldsymbol{\Delta I}_{\mathrm{wr}},
\kappa_{\mathrm{wr}},
\mathfrak m_{B_{\mathrm{wr}}^+},
\lambda_{\mathrm{wr}},
\mathcal P_{\mathrm{wr}},
\mathcal Q_{\mathrm{wr}}^{\mathrm{iso}},
\upsilon_{\mathrm{wr}}
\right),
$$

where

$$
\kappa_{\mathrm{wr}}\in\{\mathrm{wake},\mathrm{refl}\}.
$$

The competitor must not change $\Gamma_{\min}$, $\hat{\mathbf a}$, $\Delta E_{\mathrm{tx}}$, or $\Delta\mathbf J_{\mathrm{tx}}$. A wake competitor must carry a retained action-kernel pullback for

$$
\Delta\mathbf J_{\mathrm{wake},B_{\mathrm{wr}}^+}^{(\eta)}[W_{\min}],
\qquad
\Delta E_{\mathrm{wake},B_{\mathrm{wr}}^+}^{(\eta)}.
$$

A recoil competitor must carry an outgoing source or apparatus channel with a declared angular-momentum ledger row. Without that retained channel, the record is blocked if the data are absent and locally excluded if it still claims to pass.

## Comparator Tuple

Define the two-candidate comparator tuple

$$
\mathfrak K_{\min,\mathrm{wr}}
=
\left(
B_{\min}^-,
\Gamma_{\min},
W_{\min},
\mathfrak a_{\min},
\mathfrak a_{\mathrm{wr}},
\Theta_{\min,\mathrm{wr}},
\mathcal R_{\mathrm{cmp}},
\mathcal V_{\mathrm{cmp}}
\right).
$$

Here $\Theta_{\min,\mathrm{wr}}$ is the quotient comparison witness. It has three allowed outcomes:

$$
\Theta_{\min,\mathrm{wr}}
\in
\{\mathrm{duplicate},\mathrm{nonisomorphic},\mathrm{blocked}\}.
$$

It is `duplicate` only if a declared chart isomorphism maps the retained active rows, inactive-gap witnesses, path-history record, phase cells, wake pullback, partition residuals, routing rows, and microstate data of one candidate to the other. It is `nonisomorphic` when both quotient witnesses are populated and no allowed chart isomorphism identifies them. It is `blocked` when either quotient witness is missing or carries a payload conflict.

The comparator verdict is

$$
\mathcal V_{\mathrm{cmp}}
\in
\{\mathrm{pass},\mathrm{blocked},\mathrm{locally\_excluded},\mathrm{tolerance\_tie},\mathrm{physical\_tie}\}.
$$

The verdict is diagnostic. It does not replace $\operatorname{Sel}_{B,N}$ from the branch-selection law.

## Residual Vector

For each candidate $\mathfrak a\in\{\mathfrak a_{\min},\mathfrak a_{\mathrm{wr}}\}$, define the candidate-side diagnostic residual

$$
\mathcal R_{\mathrm{diag}}(\mathfrak a)
=
\left(
r_{\mathrm{id}},
r_{\mathrm{rows}},
r_{\mathrm{root}},
r_{\Phi},
r_{\mathrm{stab}},
r_{\mathrm{pull}},
r_{\mathrm{part}},
r_{\mathrm{route}},
r_{\mathrm{quot}},
r_{\mathrm{tie}}
\right).
$$

The entries $r_{\mathrm{rows}}$, $r_{\mathrm{root}}$, $r_{\Phi}$, $r_{\mathrm{stab}}$, $r_{\mathrm{pull}}$, $r_{\mathrm{part}}$, and $r_{\mathrm{route}}$ are inherited from $\mathcal R_{\mathrm{sel}}$ in the branch-selection law. The comparator adds:

$$
r_{\mathrm{id}}(\mathfrak a)
=
\begin{cases}
0,&\mathfrak a\text{ preserves }B_{\min}^-,\Gamma_{\min},W_{\min}\text{ and has an allowed }\kappa,\\
\infty,&\text{otherwise,}
\end{cases}
$$

$$
r_{\mathrm{quot}}(\mathfrak a)
=
\begin{cases}
0,&\mathcal Q_{\mathfrak a}^{\mathrm{iso}}\text{ is populated and payload-consistent},\\
\star,&\text{the quotient witness is missing or undecidable},\\
\infty,&\text{the record claims an impossible quotient identification,}
\end{cases}
$$

and

$$
r_{\mathrm{tie}}(\mathfrak a)
=
\begin{cases}
0,&\tau_{\mathfrak m}(\mathfrak a)\text{ is populated or unnecessary because no tie remains},\\
\star,&\tau_{\mathfrak m}(\mathfrak a)\text{ is needed but absent},\\
\infty,&\tau_{\mathfrak m}(\mathfrak a)\text{ depends on a forbidden chart label convention.}
\end{cases}
$$

The symbol $\star$ means blocked data, not a numerical residual. A candidate with any $\star$ entry is not passed to lexicographic selection as a passing candidate.

The pair residual is

$$
\mathcal R_{\mathrm{cmp}}
=
\left(
\mathcal R_{\mathrm{diag}}(\mathfrak a_{\min}),
\mathcal R_{\mathrm{diag}}(\mathfrak a_{\mathrm{wr}}),
r_{\Theta},
r_{\mathrm{order}}
\right),
$$

where

$$
r_{\Theta}
=
\begin{cases}
0,&\Theta_{\min,\mathrm{wr}}\in\{\mathrm{duplicate},\mathrm{nonisomorphic}\},\\
\star,&\Theta_{\min,\mathrm{wr}}=\mathrm{blocked},
\end{cases}
$$

and $r_{\mathrm{order}}$ is blocked until both candidates are evaluable or one candidate is locally excluded by retained data.

## Pass, Blocked, And Excluded Distinctions

A candidate-side row is `pass` only when the retained data populate the required expression and its residual interval lies within tolerance:

$$
\left\|\mathcal R_{\mathrm{sel}}(\mathfrak a)\right\|_{\infty}\le1.
$$

For the minimal candidate, the reduced rows

$$
\mathcal R_I^{B_{\min}}=0,
\qquad
\mathcal R_{\mathbf J}^{B_{\min}}=\mathbf 0,
\qquad
\mathcal R_{\perp}^{B_{\min}}=\mathbf 0
$$

remain conditional passes only. They do not make $\mathfrak a_{\min}$ evaluable because root replay, phase lock, torque consistency, normalized wake pullback, section stability, energy routing, and non-minimal competitor rows remain absent.

A row is `blocked` when the candidate is allowed by the generator grammar but the retained data needed to evaluate the row are missing or undecidable. For this diagnostic the expected initial partition is

$$
\mathfrak a_{\min}\in\mathcal A_{N,\min}^{\mathrm{blk}},
\qquad
\mathfrak a_{\mathrm{wr}}\in
\mathcal A_N^{\mathrm{blk}}
\cup
\mathcal A_N^{\mathrm{eval}}
\cup
\mathcal A_N^{\mathrm{excl}},
$$

depending on whether the first wake or recoil competitor has actually populated its retained route payload.

A row is `locally_excluded` only when retained data certify a hard violation before ranking. In this two-candidate diagnostic the most relevant local exclusions are:

- the competitor changes $\Gamma_{\min}$ rather than preserving the coupling datum;
- force, torque, wake, and partition rows use different retained active row sets;
- a nonzero wake, recoil, transport, or root-energy term has no declared branch-chart source;
- the quotient witness merges records while dropping wake, recoil, path-history, or microstate data;
- a certified sign or stability margin violates the branch-selection law requirements.

The transaction is not forbidden while either candidate is blocked:

$$
\left(
\mathfrak a_{\min}\in\mathcal A_N^{\mathrm{blk}}
\;\text{or}\;
\mathfrak a_{\mathrm{wr}}\in\mathcal A_N^{\mathrm{blk}}
\right)
\Longrightarrow
\mathcal V_{\mathrm{cmp}}=\mathrm{blocked}
$$

unless retained data locally exclude one candidate and the other is fully evaluable.

## Comparator Decision Rule

The diagnostic decision rule is ordered as follows.

1. If either record lacks a candidate identity, row-lineage map, quotient witness, or retained route payload needed by its declared outcome class, set
   $$
   \mathcal V_{\mathrm{cmp}}=\mathrm{blocked}.
   $$
2. If retained data locally exclude one candidate and the other candidate is evaluable and passing, the comparator may report a one-candidate diagnostic pass:
   $$
   \mathcal V_{\mathrm{cmp}}=\mathrm{pass}.
   $$
   This is not branch uniqueness; it only says the excluded record is not a live comparator.
3. If both candidates are evaluable and passing, apply the branch-selection law outcome priority and lexicographic functional $\mathcal J_{\mathrm{sel}}$. A strict ordering gives a diagnostic pass for the ordered pair:
   $$
   \mathcal J_{\mathrm{sel}}(\mathfrak a_1)
   <
   \mathcal J_{\mathrm{sel}}(\mathfrak a_2).
   $$
4. If the interval values overlap and no refinement policy separates them, set
   $$
   \mathcal V_{\mathrm{cmp}}
   =
   \mathrm{tolerance\_tie}.
   $$
5. If both candidates are non-isomorphic, passing, exactly tied, and no valid $\tau_{\mathfrak m}$ separates them, set
   $$
   \mathcal V_{\mathrm{cmp}}
   =
   \mathrm{physical\_tie}.
   $$

The diagnostic may therefore compare the blocked reduced minimal candidate against a retained wake or recoil competitor without claiming that the minimal branch is selected.

## Initial Diagnostic State

The first instantiated state is

$$
\mathfrak K_{\min,\mathrm{wr}}^{(0)}
=
\left(
B_{\min}^-,
\Gamma_{\min},
W_{\min},
\mathfrak a_{\min},
\mathfrak a_{\mathrm{wr}},
\mathrm{blocked},
\mathcal R_{\mathrm{cmp}}^{(0)},
\mathrm{blocked}
\right),
$$

with

$$
\mathcal R_{\mathrm{diag}}(\mathfrak a_{\min})
=
\left(
0,
\star,
\star,
\star,
\star,
\star,
\star,
\star,
0,
\star
\right),
$$

where the reduced scalar, vector, and transverse rows are recorded as conditional algebraic checks inside the blocked partition entry, not as a full $\mathcal R_{\mathrm{sel}}$ pass.

The competitor side is intentionally not filled by assumption:

$$
\mathcal R_{\mathrm{diag}}(\mathfrak a_{\mathrm{wr}})
=
\left(
r_{\mathrm{id}}^{\mathrm{wr}},
r_{\mathrm{rows}}^{\mathrm{wr}},
r_{\mathrm{root}}^{\mathrm{wr}},
r_{\Phi}^{\mathrm{wr}},
r_{\mathrm{stab}}^{\mathrm{wr}},
r_{\mathrm{pull}}^{\mathrm{wr}},
r_{\mathrm{part}}^{\mathrm{wr}},
r_{\mathrm{route}}^{\mathrm{wr}},
r_{\mathrm{quot}}^{\mathrm{wr}},
r_{\mathrm{tie}}^{\mathrm{wr}}
\right).
$$

Each entry must be populated by a real finite-candidate record before the comparison can become evaluable.

## Proof Burden Left Open

The next proof burden is to instantiate $\mathfrak a_{\mathrm{wr}}$ from retained branch-chart data rather than from a descriptive possibility. The required payload is:

- a generator word using $\mathfrak G_{\mathrm{wake}}$ or $\mathfrak G_{\mathrm{refl}}$ without changing $\Gamma_{\min}$;
- a retained row-lineage map and new-row provenance labels;
- root replay, phase lock, torque consistency, normalized wake pullback, route, energy, and stability payloads;
- a quotient witness that keeps wake, recoil, path-history, and microstate data visible;
- a valid $\tau_{\mathfrak m}$ or an explicit tie verdict.

Until those rows exist, this packet is a comparator diagnostic with a blocker. It is not a selection theorem and must remain outside `content/markdown/aaa`.
