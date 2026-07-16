# Spiral VP-1 Receiver-Normal Restart Packet

Status: `active-restart`.

Claim level: priority-only branch restart target. This packet preserves the VP-1 topology and interval evidence while withdrawing every inherited radial, tangential, action, power, sensitivity, and pass/fail conclusion that lacks same-record receiver-normal branch strength.

## Retained Candidate And Evidence

The fixed candidate is
$$
a=\frac{1}{10},
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
D_{\mathrm{cert}}=\left[\frac{1}{2},4\pi\right],
$$
with retained labels $P_1,P_2,P_3,S_1$.

The evidence packets remain distinct:

- [active-root and Jacobian packet](spiral-vp1-root-jacobian-proof.md): sampled continuation, branch separation, and Jacobian margins;
- [inactive-memory packet](spiral-vp1-inactive-memory-proof.md): finite-memory and self-coincidence derivations plus inactive-complement and transport setup;
- [interval root-gap packet](spiral-vp1-interval-root-gap-proof.md): outward active-tube and inactive-complement sign rows;
- [root-transport packet](spiral-vp1-root-transport-interval-proof.md): exact differentiated causal-root identity.

These packets support topology only. Their root boxes, identities, and regulator state must be reproduced on the receiver-normal force/action record.

## Required Receiver-Normal Branch Table

For every retained label $\alpha$, emit on the same retained box
$$
D_{s,\alpha},
\qquad
D_{T,\alpha},
\qquad
W_\alpha^{\mathrm{rec}}
=
\left|\frac{D_{T,\alpha}}{D_{s,\alpha}}\right|.
$$

| Required row | Content |
| --- | --- |
| retained identity | branch-family id, label, source/receiver ids, time row, root box, regulator state, and source artifact hash |
| topology binding | exact active labels, inactive-gap rows, finite-memory bound, and root-transport dependency consumed |
| receiver-normal fields | same-record outward intervals for $D_s$, $D_T$, and $W^{\mathrm{rec}}$ |
| radial projection | per-branch radial interval and aggregated $B_r^{\mathrm{rec}}$ |
| tangential projection | per-branch tangential interval and weighted drive over $I_\ast$ |
| compatibility | receiver-normal turn-center tangential residual when tested |
| scalar decision | any $\Gamma$ comparison, sensitivity margin, or pass/fail statistic derived from the same aggregation |
| negative controls | reject missing $D_T$, mismatched record or box, altered label list, and source-normal substitution |

The radial decision may compare
$$
B_r^{\mathrm{rec}}
=
\sum_{\alpha\in\{P_1,P_2,P_3,S_1\}}
B_{r,\alpha}^{\mathrm{rec}}
$$
with an independently justified kinematic $\Gamma$ interval only after both objects are declared on the retained record. The weighted tangential decision is the outward interval integral over $I_\ast$ of the branch sum recomputed with $W^{\mathrm{rec}}$.

## Consumer And Schema Rule

A validator or sidecar may mark a radial, tangential, or compatibility row `passed` or `certified_fail` only if it verifies the same retained labels, same root boxes, same-record $D_s$, $D_T$, $W^{\mathrm{rec}}$, receiver-normal projection and aggregation, source artifact identity, and a negative control that fails when $D_T$ is removed or mismatched.

Parameter sensitivity and next-candidate exclusion must be recomputed from these receiver-normal rows. They cannot inherit a sampled drive sign, source-normal branch threshold, finite-difference repair search, or purged sidecar status.

## Promotion Rule And Falsifiers

VP-1 currently has topology diagnostics but no canonical Master EOM drive verdict. Promotion requires one reproducible retained record that binds the topology evidence to the complete receiver-normal branch table and its radial/tangential consumer.

The restart fails if an unlisted root appears, an active Jacobian floor or inactive gap closes, the finite-memory bound is exceeded, root transport changes branch identity, $D_T$ is missing or record-mismatched, aggregation changes the label list, or a scalar decision consumes a source-normal proxy rather than $W^{\mathrm{rec}}$.
