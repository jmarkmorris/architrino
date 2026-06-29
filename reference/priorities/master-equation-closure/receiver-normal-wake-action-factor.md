# Receiver-Normal Wake-Action Factor

Status. Mandatory model-change audit for master-equation closure, A1 outward
constants, action/wake-history closure, and solver support. This packet records
the receiver-normal factor required by the canonical Master EOM branch law.
Rows without the receiver-normal numerator are not force/action evidence.
Stationary, fixed-source, or fixed-receiver reductions must be recomputed from
this identity inside the selected retained row.

Claim level. Accepted correction to the Master EOM branch-strength law; exact
geometry identity for smooth retained roots; downstream proof paths must restart
their force/action rows from this law.

## Receiver-Normal Identity

For source $j$, receiver $i$, and causal constraint
$$
F_{ij}(t,s)=\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s)=0,
$$
define
$$
D_{s,ij}=c_f-\hat{\mathbf r}_{ij}(t,s)\cdot\mathbf v_j(s),
\qquad
D_{t,ij}=c_f-\hat{\mathbf r}_{ij}(t,s)\cdot\mathbf v_i(t).
$$
On a retained simple-root branch $s=s_\ell(t)$ with $D_{s,ij}\ne0$,
implicit differentiation gives
$$
\frac{ds_\ell}{dt}=\frac{D_{t,ij}}{D_{s,ij}}.
$$

Interpretation. $D_{s,ij}^{-1}$ is the source-normal causal-root denominator.
It remains the transversality floor that makes a simple root legal. $D_{t,ij}$
is the receiver-normal numerator: it says how fast the receiver path cuts
through the source-emitted causal wake sequence. If a receiver is stationary in
the Euclidean-void rest frame, then $D_{t,ij}=c_f$ follows by substitution in
this equation. That reduction is a receiver-normal sanity check, not a promotion
route for rows that omit $D_t$. In every nontrivial receiver-normal case,
$D_{t,ij}/D_{s,ij}$ is geometry-dependent and cannot be replaced by one
constant.

## Proof Impact

| Proof lane | Immediate impact |
| --- | --- |
| Event-local Master EOM force rows | Restart required for force magnitude. Source-normal root and inactive-gap rows survive as topology inputs, but strength rows that omit $D_t$ are not branch-action evidence. |
| Action / wake-history / power rows | Restart required. Each row must use $D_{t,ij}/D_{s,ij}$ on the same retained record. |
| A1 outward constants | Invalid as closure evidence until each selected retained row emits receiver-normal bounds $D_{t,\alpha}^{-},D_{t,\alpha}^{+}$ on the same boxes. |
| Noether wake-history closure | Needs same-record binding between active roots, source-normal Jacobian floors, receiver-normal factors, and boundary wake-history charges. |
| Solver packets | Central branch weight / delayed-hit strength consumes the unsigned receiver-normal factor, while the source-normal denominator remains a transversality field. |

## A1-Specific Target

For each retained A1 label $\alpha\in\{P_1,P_2,P_3,S_1\}$, the action-ready
same-box row should add
$$
D_{t,\alpha}(\theta,p)
=
c_f-\hat{\mathbf r}_{\alpha}(\theta,p)\cdot\mathbf v_i(\theta,p)
$$
and report outward bounds $D_{t,\alpha}^{-},D_{t,\alpha}^{+}$ on the same
$I_c\times W_\alpha$ boxes used for $D_{s,\alpha}$, inactive-cover gaps, and
branch-sum constants. A missing $D_t$ row invalidates the force/action/
wake-history row as closure evidence. It does not falsify root topology,
inactive gaps, or source-normal transversality rows.

## Solver Acceptance Target

A solver-side receiver-normal row is accepted only when it reports:

- source-to-receiver unit direction,
- source normal speed $\hat{\mathbf r}\cdot\mathbf v_j$,
- receiver normal speed $\hat{\mathbf r}\cdot\mathbf v_i$,
- source-normal denominator $D_s$,
- receiver-normal numerator $D_t$,
- receiver-normal factor $D_t/D_s$,
- fail-closed status for nonfinite values, small $D_s$, or small $D_t$ when the selected proof requires monotone receiver sampling.

This is consumed as the branch-strength row. A separate variational proof is
still required for action derivation, but not for using receiver-normal branch
strength in the Master EOM.
