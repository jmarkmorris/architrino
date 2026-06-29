# Receiver-Path Wake-Action Pullback

Status. Priority-only model-change audit for master-equation closure, A1
outward constants, action/wake-history closure, and solver support. This packet
does not replace the canonical event-local Master EOM force row. It records the
receiver-path factor that must be audited whenever a proof consumes accumulated
action, power, wake-history charge, or finite-window conservation rather than
only an instantaneous branch force.

Claim level. Candidate correction to action-measure usage; exact geometry
identity for smooth retained roots; not yet promoted as a changed force law.

## Root-Transport Identity

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

Interpretation. $D_{s,ij}^{-1}$ is the source-side causal-root Jacobian already
used in the event-local branch law. $D_{t,ij}$ is the receiver-crossing factor:
it says how fast the receiver path cuts through the source-emitted causal wake
sequence. If the receiver is stationary in the Euclidean-void rest frame, then
$D_{t,ij}=c_f$ and the effect can be absorbed into the chosen normalization. If
the receiver has radial motion relative to the source-emission direction, the
factor is geometry-dependent and cannot be replaced by one constant.

## Proof Impact

| Proof lane | Immediate impact |
| --- | --- |
| Event-local Master EOM force rows | Do not restart automatically. These rows remain source-side Jacobian-weighted line-of-action targets unless a later variational proof shows the receiver factor belongs in the force row itself. |
| Action / wake-history / power rows | Must be audited. Any row that interprets received branch density as an accumulated action rate must declare whether it uses $D_{s,ij}^{-1}$ alone or the receiver-path pullback $D_{t,ij}/D_{s,ij}$. |
| A1 outward constants | Not ready for action closure until each selected retained row either emits receiver-crossing bounds $D_{t,\alpha}^{-},D_{t,\alpha}^{+}$ on the same boxes or proves the stationary/constant-normalization exemption. |
| Noether wake-history closure | Needs same-record binding between active roots, source-side Jacobian floors, receiver-crossing factors, and boundary wake-history charges. |
| Solver packets | Need an explicit receiver-pullback diagnostic so simulations can vary receiver radial velocity independently of $\kappa$. |

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
branch-sum constants. A missing $D_t$ row blocks action/wake-history promotion
but does not by itself falsify an event-local force row.

## Solver Acceptance Target

A solver-side receiver-pullback row is accepted only when it reports:

- source-to-receiver unit direction,
- source radial speed $\hat{\mathbf r}\cdot\mathbf v_j$,
- receiver radial speed $\hat{\mathbf r}\cdot\mathbf v_i$,
- source-side denominator $D_s$,
- receiver-side numerator $D_t$,
- root-transport factor $D_t/D_s$,
- fail-closed status for nonfinite values, small $D_s$, or small $D_t$ when the selected proof requires monotone receiver sampling.

This should be consumed as a diagnostic/action row first. Promotion to a
changed force law requires a separate variational proof and a comparison against
the existing Master EOM branch rows.
