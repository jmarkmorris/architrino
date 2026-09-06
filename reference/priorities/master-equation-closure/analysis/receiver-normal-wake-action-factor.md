# Receiver-Normal Wake-Action Factor

Status. Mandatory model-change audit for master-equation closure, A1 outward constants, action/wake-history closure, and solver support. This packet records the receiver-normal factor required by the canonical Master EOM branch law. Rows without the receiver-normal numerator are not force/action evidence. Stationary, fixed-source, or fixed-receiver reductions must be recomputed from this identity inside the selected retained row.

Claim level. Accepted correction to the Master EOM branch-strength law; exact geometry identity for smooth retained roots; downstream proof paths must restart their force/action rows from this law.

Current disposition. `priority-only` for wake-history closure. The identity below is accepted as the branch-strength correction, but no wake-history, action, power, breather, or mass-response packet promotes from it until that packet supplies the same retained record with accepted branch identity, $D_s$, $D_T$, $W^{\mathrm{rec}}$, and the derivative rows consumed by the packet.

## Receiver-Normal Identity

For source $j$, receiver $i$, and causal constraint
$$
F_{ij}(T,T_{\mathrm{em}})
=\|\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}})\|-c_f(T-T_{\mathrm{em}})=0,
$$
define
$$
D_{s,ij}=c_f-\hat{\mathbf r}_{ij}(T,T_{\mathrm{em}})\cdot\mathbf V_j(T_{\mathrm{em}}),
\qquad
D_{T,ij}=c_f-\hat{\mathbf r}_{ij}(T,T_{\mathrm{em}})\cdot\mathbf V_i(T).
$$
On a retained simple-root branch $T_{\mathrm{em}}=T_{\ell,\mathrm{em}}(T)$ with $D_{s,ij}\ne0$, implicit differentiation gives
$$
\frac{dT_{\ell,\mathrm{em}}}{dT}=\frac{D_{T,ij}}{D_{s,ij}}.
$$

Interpretation. $D_{s,ij}^{-1}$ is the source-normal causal-root denominator. It remains the transversality floor that makes a simple root legal. $D_{T,ij}$ is the receiver-normal numerator: it says how fast the receiver path cuts through the source-emitted causal wake sequence. If a receiver is stationary in the Euclidean-void rest frame, then $D_{T,ij}=c_f$ follows by substitution in this equation. That reduction is a receiver-normal sanity check, not a promotion route for rows that omit $D_T$. In every nontrivial receiver-normal case, $D_{T,ij}/D_{s,ij}$ is geometry-dependent and cannot be replaced by one constant.

## Proof Impact

| Proof lane | Immediate impact |
| --- | --- |
| Event-local Master EOM force rows | Restart required for force magnitude. Source-normal root and inactive-gap rows survive as topology inputs, but strength rows that omit $D_T$ are not branch-action evidence. |
| Action / wake-history / power rows | Restart required. Each row must use $D_{T,ij}/D_{s,ij}$ on the same retained record. |
| A1 outward constants | Invalid as closure evidence until each selected retained row emits receiver-normal bounds $D_{T,\alpha}^{-},D_{T,\alpha}^{+}$ on the same boxes. |
| Noether wake-history closure | Needs same-record binding between active roots, source-normal Jacobian floors, receiver-normal factors, and boundary wake-history charges. |
| Solver packets | Central branch weight / delayed-hit strength consumes the unsigned receiver-normal factor, while the source-normal denominator remains a transversality field. |

## A1-Specific Target

For each retained A1 label $\alpha\in\{P_1,P_2,P_3,S_1\}$, the action-ready same-box row should add
$$
D_{T,\alpha}(\theta,p)
=
c_f-\hat{\mathbf r}_{\alpha}(\theta,p)\cdot\mathbf v_i(\theta,p)
$$
and report outward bounds $D_{T,\alpha}^{-},D_{T,\alpha}^{+}$ on the same $I_c\times W_\alpha$ boxes used for $D_{s,\alpha}$, inactive-cover gaps, and branch-sum constants. A missing $D_T$ row invalidates the force/action/ wake-history row as closure evidence. It does not falsify root topology, inactive gaps, or source-normal transversality rows.

## Solver Acceptance Target

A solver-side receiver-normal row is accepted only when it reports:

- source-to-receiver unit direction,
- source normal speed $\hat{\mathbf r}\cdot\mathbf v_j$,
- receiver normal speed $\hat{\mathbf r}\cdot\mathbf v_i$,
- source-normal denominator $D_s$,
- receiver-normal numerator $D_T$,
- receiver-normal factor $D_T/D_s$,
- verification failed status for nonfinite values, small $D_s$, or small $D_T$ when the selected proof requires monotone receiver sampling.

This is consumed as the branch-strength row. A separate variational proof is still required for action derivation, but not for using receiver-normal branch strength in the Master EOM.

## Wake-History Pullback Theorem Target

Wake-history closure is not merely the presence of event rows on a retained ledger. A wake-history action or power packet consumes the receiver-normal sampling rate along a moving receiver path, so its first theorem target is a same-record pullback statement.

For every retained branch row $\rho=(i,j,\ell,T,T_{\ell,\mathrm{em}})$ used by a wake-history increment, the row must bind
$$
D_{s,\rho},
\qquad
D_{T,\rho},
\qquad
W_{\rho}^{\mathrm{rec}}=\left|D_{T,\rho}/D_{s,\rho}\right|,
\qquad
D_vD_{s,\rho},
\qquad
D_vD_{T,\rho},
\qquad
D_vW_{\rho}^{\mathrm{rec}}
$$
to the same source/receiver ids, retained box, regulator state, event ledger, and source artifact hash. On a fixed $D_s,D_T$ sign stratum the reconstruction condition is
$$
D_vW_{\rho}^{\mathrm{rec}}
=
\frac{\zeta_{T,\rho}\zeta_{s,\rho}}{D_{s,\rho}^2}
\left(
D_{s,\rho}D_vD_{T,\rho}
-
D_{T,\rho}D_vD_{s,\rho}
\right).
$$

The closure equation to prove is that the finite-window wake-history increment is a pullback of source-provenanced emitted weight through the same receiver-normal branch record:
$$
D_v\mathcal{H}_{\mathrm{wake}}^{W}
=
\sum_{\rho\in\mathfrak{R}_{W}^{\mathrm{ret}}}
q_{\rho}
\left[
D_vW_{\rho}^{\mathrm{rec}}\,
\mathcal{K}_{\rho}^{(\eta,\epsilon_c)}
+
W_{\rho}^{\mathrm{rec}}\,
D_v\mathcal{K}_{\rho}^{(\eta,\epsilon_c)}
\right]
+
\mathcal{R}_{\mathrm{wake},v}^{\mathrm{rec}},
$$
with the same retained branch list $\mathfrak{R}_{W}^{\mathrm{ret}}$ consumed by the action, power, event, and Noether balance rows. A source-normal diagnostic alone, a terminal aggregate, or a finite-difference table after branch identity is erased fails with `receiver-normal-first-derivative-row-missing` or `receiver-normal-derivative-record-mismatch` rather than authorizing wake-history closure. A row that carries a different retained branch list exits as `branch-family-consumer-checksum-mismatch`.
