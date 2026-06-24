# Equation Closure Pass 2026-06-23 S

## Scope

- Shared retained event or positive-width domain carrier $\mathfrak D_R$.
- Current fail-closed reducers:
  - [check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs);
  - [compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs);
  - [noether-sea-density-compression-surface-slice.mjs](../../../scripts/spacetime/noether-sea-density-compression-surface-slice.mjs);
  - [finite-window-statistical-carrier.mjs](../../../scripts/equation-mapping/finite-window-statistical-carrier.mjs).

## Result

This pass factors the shared acceptance logic behind the current reducers into a score-neutral mathematical object. For any retained row family $R$, keep the carrier

$$
\mathfrak D_R
=
\left(
\mathsf D,\,
\Theta_D,\,
S_D,\,
\iota_D,\,
\{\Pi_r\}_{r\in R},\,
\mathcal R_D
\right),
$$

and add the acceptance vector

$$
\mathbf A_R(\mathfrak D_R)
=
\left(
A_D,\,
A_{\iota},\,
\{A_r\}_{r\in R},\,
A_{\mathrm{src}},\,
A_{\mathrm{overlap}},\,
A_{\mathrm{split}},\,
A_{\mathrm{retune}},\,
A_{\mathrm{lane}}
\right).
$$

Each component is binary in the score-moving interpretation:

- $A_D=1$ when the retained event or positive-width domain itself is accepted and source-backed.
- $A_{\iota}=1$ when raw row identity, inventory, role map, or quotient policy is preserved on the retained support.
- $A_r=1$ when row $r$ is accepted, concrete, source-backed, and bound to the same event/domain.
- $A_{\mathrm{src}}=1$ when every accepted row or witness resolves to a durable source/evidence file.
- $A_{\mathrm{overlap}}=1$ when shared row projections have a consistent retained preimage.
- $A_{\mathrm{split}}=1$ when the split-domain witness is zero.
- $A_{\mathrm{retune}}=1$ when the hidden-retune witness is zero and source-backed.
- $A_{\mathrm{lane}}=1$ when the lane residual itself passes after the support and row bindings are accepted.

The first-blocker operator is then

$$
B_R(\mathfrak D_R)
=
\min_{\prec_R}
\left\{
x\in\operatorname{coords}\mathbf A_R:
A_x(\mathfrak D_R)=0
\right\},
$$

where $\prec_R$ is the row-family order declared by the relevant reducer. The current first blockers are not separate theory claims; they are the first failed coordinates of $\mathbf A_R$:

| Lane | Carrier instance | Current first blocker |
| --- | --- | --- |
| `EQ-02` through `EQ-04` | $S_{\mathrm{eq}}$ retained-domain packet | `missing_accepted_raw_labeled_rows_preserved_on_retained_history` |
| `EQ-06` through `EQ-11`, `EQ-20`, `EQ-24`, `EQ-32` | $\Theta_{\mathrm{sea}}^{(\ell,W)}$ retained coefficient window | `missing_accepted_theta_sea_rho_NS` |
| `EQ-28` and `EQ-29` | $\mathsf e_{\gamma e}^{0}$ native Compton/recoil event | `missing_accepted_photon_gate_A_input_output` |
| `EQ-31` finite-window statistics | $\mathcal C_{\mathrm{stat}}^{W,T}$ retained carrier | `missing_accepted_W` |

## Closure Lemma Target

The score-moving lemma is:

$$
\mathbf A_R(\mathfrak D_R)=\mathbf 1
\;\Longrightarrow\;
\Theta_D
\text{ is the accepted fiber product over the common carrier when }R\text{ has a distinguished base,}
\;\Longrightarrow\;
\operatorname{RowId}_R(\mathfrak D_R)=1
\;\text{and}\;
\mathcal R_D
\text{ is eligible for row-specific interpretation.}
$$

For `S_eq`, the distinguished base is $\mathcal C_u=\mathcal C_{02\text{-}04}^{\mathrm{bin}}(u)$, and $\mathcal S_{\mathrm{split}}=0$ means the clock, envelope, two-way signal, energy, momentum, phase, and Noether sea legs factor through one fiber product rather than a separately tuned product of row labels. The converse is not required. A row family may pass identity while still failing a lane residual. The acceptance vector is deliberately stricter than a row-label match because it includes source-backed evidence, split-domain, retune, and lane-residual coordinates.

## Score Disposition

No score changes. Naming $\mathbf A_R$ and $B_R$ only clarifies the existing fail-closed condition. It does not supply accepted retained rows for any lane.

## Next Closure Step

The fastest honest score movement still requires replacing one attempted first-blocker coordinate with accepted retained evidence:

1. For $S_{\mathrm{eq}}$, supply accepted `raw_labeled_rows_preserved_on_retained_history` on the same retained event or positive-width domain.
2. For $\Theta_{\mathrm{sea}}^{(\ell,W)}$, supply accepted source-backed `rho_NS` and the rest of the same-window Noether sea rows.
3. For $\mathsf e_{\gamma e}^{0}$, supply accepted source-backed `photon_gate_A_input_output` on the same event carrier.
4. For $\mathcal C_{\mathrm{stat}}^{W,T}$, supply accepted source-backed $W$ before transition, measure, detector, partition, corridor, and retune rows can matter.

The coordinator should treat these as alternative first coordinates of one acceptance-vector program, not as disconnected bookkeeping chores.
