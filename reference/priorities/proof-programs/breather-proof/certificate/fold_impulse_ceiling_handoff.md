# Fold Impulse Ceiling Handoff

## Status

This handoff is the proof packet for the current null-coordinate pre-ledger blocker on packet `seed-doubled-four-arc-cosine-template-v0`. It does not certify the breather, promote the branch chart, or alter the candidate packet. It converts the remaining rejection

`preledger_rejected_fold_impulse_and_fold_adjacent_parent_leftovers_remaining`

into a finite theorem target for the next certificate pass.

The current refined pre-ledger already has:

- 140 certified empty rows: 116 range-empty base rows plus 24 diagonal-exclusion empty rows;
- 6 accepted strict simple-root subrows;
- 4 kinematic fold-layer atlas entries with positive curvature floors, positive exit floors, and parity data;
- 22 unresolved live-ledger rows: 16 fold-layer rows whose impulse ceilings now have an accepted fixed-parameter external certificate, plus 6 parent range-overlap rows whose accepted interiors leave fold-adjacent boundary leftovers.

The branch chart remains unauthorized until all 22 unresolved live-ledger rows are rewritten as accepted `empty`, `simple_root`, or `fold_layer` rows on the same packet identity tuple. The accepted full-interval constants certificate makes the 16 fold rows fold-ceiling-ready, but it does not close the six parent complements or rewrite the live ledger.

## Follow-On Fold Artifacts

The current follow-on artifacts narrow this handoff without accepting the live pre-ledger:

- `fold_impulse_bound_derivation.md` derives the conditional finite separator form
  $$
  I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
  \le
  C_\Sigma\eta^{1/2}A_{\Sigma,\eta,\epsilon_c}
  $$
  and records a coarse full-interval fallback.
- `fold_impulse_constants.json` records diagnostic finite constants for $\Sigma_1,\ldots,\Sigma_4$ under `status=diagnostic_bound_not_interval_certified`.
- `fold_row_consumption_report.md` maps exactly which 16 fold rows and 6 parent rows would be consumed after accepted finite constants and parent-complement closure.
- `fold_interval_constants_contract.md` defines the accepted-constants contract for the mollifier or direct quadrature route, coupling convention, row-tube projections, source slices, row enclosures, and separator aggregates.
- `fold_parent_boundary_complement_packet.md` defines the accepted alternatives for the six parent boundary complements: strict range-empty gaps or coverage by accepted fold-layer rows.
- `fold_mollifier_coupling_audit.md` resolves the packet coupling convention as $g=1.0=\Gamma=\kappa\epsilon^2$ while rejecting accepted constants without a certified mollifier norm or direct quadrature route.
- `fold_interval_constants_attempt.json` is the current rejected interval attempt; it preserves finite diagnostic values but marks every fold row and separator non-accepted.
- `fold_row_consumption_attempt.md` records the resulting row state: zero rows consumed, `causal_ledger.json` still rejected, and `branch_chart.json` unauthorized.
- `fold_mollifier_kernel_candidate.md` supplies a compact-support $C^1$ shell candidate with $M_\delta=15/16$ and $\|\delta_\eta\|_\infty=46.875$ at $\eta=0.02$.
- `fold_row_tube_coverage_attempt.md` rejects the existing refined intervals as accepted row-tube coverage: the packet still lacks certified $E_B$, $S_B(t)$, $L_{r,B}$, $L_{s,B}$, and support-coverage proofs for all sixteen fold rows.
- `fold_full_interval_fallback_legality.md` shows that the contracts permit a coarse fixed-parameter full-interval fallback, while excluding row-tube $O(\eta^{1/2})$ scaling and direct-quadrature claims.
- `fold_full_interval_constants_certificate.json` accepts finite fixed-parameter fold constants for all sixteen fold rows and all four separators with $M_\delta=15/16$, $\Gamma=1$, $\eta=0.02$, and $\epsilon_c=0.05$.
- `fold_parent_after_full_interval_status.md` records the post-constants state: the sixteen fold rows are fold-ceiling-ready, but the six parent boundary complements still block the pre-ledger.
- `fold_parent_w_complement_closure_attempt.md` and `fold_parent_u_complement_closure_attempt.md` reject immediate parent-side consumption because the artifacts did not name disjoint boundary-complement intervals, strict complement gaps, or exact fold-family memberships.
- `fold_parent_complement_partition_attempt.md` names the natural boundary strips and rejects strict range-empty closure because the null-coordinate ranges are zero/touching rather than strictly separated.
- `fold_parent_endpoint_exclusion_legality.md` rejects endpoint-touching exclusion under the current two-alternative parent-complement contract.
- `fold_parent_fold_family_membership_attempt.md` rejects exact accepted fold-family membership for all 20 named parent-complement strips.
- `fold_parent_contract_decision_packet.md` records the resulting proof-policy fork: add a third endpoint-exclusion alternative, add a regular-boundary fold-coverage theorem, or keep the current contract and reject this packet.

These artifacts do not edit `causal_ledger.json`, do not authorize `branch_chart.json`, and do not promote any row in the live ledger. The remaining gap for a passed pre-ledger is now a proof-policy decision about the parent-complement contract plus any follow-on closure certificate. A sharper row-tube/source-slice route or direct quadrature route remains valuable, but it is no longer the immediate fixed-parameter blocker.

## Theorem Target

> **Theorem target (Fold impulse ceiling and fold-adjacent promotion).**
> Fix the candidate packet
> $$
> \mathfrak{I}_{\mathrm{seed}}
> =
> \left(
> \mathcal{K},
> T_{\mathrm{cyc}},
> \mathcal{S},
> \mathcal{P},
> \mathcal{B}_{\mathrm{rep}},
> \Theta
> \right)
> $$
> recorded by `phi_cyc.json`, `mesh.json`, `mesh_refined_preledger_v1.json`, `causal_ledger.json`, and `fold_layer_atlas.json`, with
> $$
> T_{\mathrm{cyc}}=2\pi,
> \qquad
> c_f=1,
> \qquad
> \eta=0.02,
> \qquad
> \epsilon_c=0.05,
> \qquad
> h=2\pi.
> $$
> Suppose every separator
> $$
> \Sigma\in\{\Sigma_1,\Sigma_2,\Sigma_3,\Sigma_4\}
> $$
> satisfies the certified fold-layer alternative
> $$
> \alpha_{\Sigma}>0,
> \qquad
> \nu_{\mathrm{exit},\Sigma}>0,
> \qquad
> I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty,
> \qquad
> \Delta N_\Sigma\in2\mathbb{Z},
> \qquad
> \Delta D_\Sigma=0.
> $$
> Suppose also that each of the six parent range-overlap rows is partitioned into its already accepted simple-root subrow plus fold-adjacent boundary complements, and each complement is either range-empty with a positive gap or is covered by one of the accepted fold-layer alternatives above.
>
> Then the current refined null-coordinate pre-ledger has no remaining `split_required` rows. The 16 rows touching separator layers are accepted as `fold_layer`, the 6 strict simple-root subrows retain their existing margins, and the later branch chart is authorized to refine only the accepted simple-root rows. Fold-layer rows enter only through the certified fold-event atlas and the dual-mollified fold integral, not through simple-root branch-sum formulas.

## Current Certificate Inputs

The candidate history is the analytic template
$$
x(\theta)=1.25\cos(2\pi\theta),
\qquad
T_{\mathrm{cyc}}=2\pi,
\qquad
c_f=1.
$$
The null coordinates are
$$
u(t)=c_f t-x(t),
\qquad
w(t)=c_f t+x(t).
$$

The refined mesh uses separator radius
$$
\rho_\theta=0.0125,
\qquad
\rho_t=0.07853981634.
$$
The global accepted margins already recorded by `causal_ledger.json` are
$$
\gamma_{\mathrm{empty}}=0.208212341788,
\qquad
\gamma_{\mathrm{inact}}=0.208212341788,
$$
$$
\nu_{\mathrm{simple}}=0.055761655527,
\qquad
\gamma_{\mathrm{cov}}=0.005,
$$
$$
\gamma_{\tau}=0.278626695826,
\qquad
\gamma_h=4.197933629682,
\qquad
\gamma_{\mathrm{sign}}=0.278626695826.
$$

The fold atlas already supplies
$$
\alpha_{\Sigma,\min}=0.669228904575,
\qquad
\nu_{\mathrm{exit},\Sigma,\min}=0.055761655527,
$$
and all four local parity checks satisfy
$$
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$
The missing data are exactly the finite values of
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}.
$$

| Separator | Ledger | Layer | $\theta_\Sigma$ | $t_\Sigma$ | $\alpha_{\Sigma}$ | $\nu_{\mathrm{exit},\Sigma}$ | $\Delta N_\Sigma$ | $\Delta D_\Sigma$ | Rows touching layer |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| $\Sigma_1$ | `w` | `F1` | 0.14758361765 | 0.927295217999 | 0.669228904575 | 0.055761655527 | 2 | 0 | `R_w_F1_A0`, `R_w_F1_F1`, `R_w_A1_F1`, `R_w_A2_F1` |
| $\Sigma_2$ | `w` | `F2` | 0.35241638235 | 2.214297435591 | 0.669228904575 | 0.055761655527 | -2 | 0 | `R_w_F2_A0`, `R_w_F2_A1`, `R_w_F2_F2`, `R_w_A2_F2` |
| $\Sigma_3$ | `u` | `F3` | 0.64758361765 | 4.068887871589 | 0.669228904575 | 0.055761655527 | 2 | 0 | `R_u_F3_A2`, `R_u_F3_F3`, `R_u_A3_F3`, `R_u_A4_F3` |
| $\Sigma_4$ | `u` | `F4` | 0.85241638235 | 5.355890089181 | 0.669228904575 | 0.055761655527 | -2 | 0 | `R_u_F4_A2`, `R_u_F4_A3`, `R_u_F4_F4`, `R_u_A4_F4` |

## Local Fold Normal Form

Use this local notation only inside this handoff. For a row using
$$
y\in\{u,w\},
$$
write the row defect as
$$
G_B(t,s)=y(t)-y(s).
$$
At a separator layer, one row variable
$$
q\in\{t,s\}
$$
lies in the fold interval
$$
|q-q_\Sigma|\le\rho_t.
$$
Let
$$
\zeta=q-q_\Sigma.
$$
The fold normal form to certify is the interval statement
$$
G_B(t,s)
=
G_B^\Sigma(\lambda)
+a_\Sigma \zeta^2
+R_\Sigma(\lambda,\zeta),
$$
where
$$
|2a_\Sigma+\partial_{\zeta\zeta}R_\Sigma|
\ge
\alpha_{\Sigma}>0
$$
on the layer, and the non-fold boundary of the layer has recovered Jacobian floor
$$
\frac{|y'(q)|}{c_f}
\ge
\nu_{\mathrm{exit},\Sigma}>0.
$$
Equivalently, the certificate may use the stored atlas form
$$
y'(q_\Sigma)=0,
\qquad
|y''(q)|\ge\alpha_{\Sigma}>0,
\qquad
\inf_{q\in\partial I_{\Sigma}}
\frac{|y'(q)|}{c_f}
\ge
\nu_{\mathrm{exit},\Sigma}>0.
$$

The analytic point is that no source-time branch
$$
s_B^y(t)=(y|_{I_\beta^s})^{-1}(y(t))
$$
is allowed to be used through the layer when the layer is classified as `fold_layer`. The fold contribution must be evaluated from the dual-mollified absolute-time integral law.

For the 1D self-image term, the row-level fold acceleration contribution may be bounded from
$$
a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)
=
\kappa\epsilon^2
\int_{I_\beta^s}
\frac{\hat r_s(t;s)}
{|x(t)-x(s)|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds
$$
restricted to the certified row region. Here `row region` is local shorthand in this handoff for the relevant subset of
$$
I_\alpha^r\times I_\beta^s
$$
inside the separator layer; it is not a new project term. The row impulse is
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
\equiv
\int_{I_\alpha^r}
\left|a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)\right|\,dt.
$$
The separator ceiling is accepted when the rows touching that separator satisfy
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\ge
\sum_{B\in\mathcal{F}_{\Sigma}}
I^{\mathrm{fold}}_{\eta,\epsilon_c,B}
$$
and the reported value is finite.

The preferred proof form is the normal-form bound already requested by the atlas:
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
\le
C_\Sigma\eta^{1/2}
A_{\Sigma,\eta,\epsilon_c}
<\infty,
$$
where
$$
A_{\Sigma,\eta,\epsilon_c}
\ge
\sup_{B\in\mathcal{F}_{\Sigma}}
\sup_{t\in I_\alpha^r}
\left|a^{\mathrm{fold}}_{\eta,\epsilon_c,B}(t)\right|
$$
and
$$
C_\Sigma<\infty
$$
is the interval-certified fold transit constant. A sharper direct quadrature bound may replace this estimate if it is computed on the same packet identity tuple and records a strict finite enclosure for every row in
$$
\mathcal{F}_{\Sigma}.
$$

## Inequalities To Prove

The next certificate pass should prove the following finite statements without changing the packet identity.

1. Packet identity:
   $$
   \mathfrak{I}_{\mathrm{seed}}^{\phi}
   =
   \mathfrak{I}_{\mathrm{seed}}^{\Theta}
   =
   \mathfrak{I}_{\mathrm{seed}}^{\mathcal{L}}
   =
   \mathfrak{I}_{\mathrm{seed}}^{\mathcal{F}}.
   $$

2. Fold normal form on every separator:
   $$
   \alpha_{\Sigma}>0,
   \qquad
   \nu_{\mathrm{exit},\Sigma}>0.
   $$
   These are already present in the atlas; the proof pass should preserve the stored floors and fail if a rewritten partition weakens them.

3. Finite fold acceleration and impulse:
   $$
   A_{\Sigma,\eta,\epsilon_c}<\infty,
   \qquad
   C_\Sigma<\infty,
   \qquad
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty.
   $$
   If the normal-form estimate is used, the accepted row must record
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}
   \le
   C_\Sigma\eta^{1/2}
   A_{\Sigma,\eta,\epsilon_c}.
   $$

4. Fold parity preservation:
   $$
   \Delta N_\Sigma\in2\mathbb{Z},
   \qquad
   \Delta D_\Sigma=0.
   $$
   These are already present as coarse parity data; the next pass should attach them to the accepted `fold_layer` rows rather than leaving them only in the atlas.

5. Parent-row promotion. Each parent row below must be replaced by its strict simple-root subrow plus finite boundary complements:

| Parent row | Accepted simple-root subrow | Ledger | Boundary-complement rule |
| --- | --- | --- | --- |
| `R_w_A1_A0` | `S_w_A1_A0_4` | `w` | Complements must be range-empty or routed to $\Sigma_1$ / $\Sigma_2$ fold-layer coverage. |
| `R_w_A2_A0` | `S_w_A2_A0_5` | `w` | Complements must be range-empty or routed to $\Sigma_1$ / $\Sigma_2$ fold-layer coverage. |
| `R_w_A2_A1` | `S_w_A2_A1_6` | `w` | Complements must be range-empty or routed to $\Sigma_1$ / $\Sigma_2$ fold-layer coverage. |
| `R_u_A3_A2` | `S_u_A3_A2_1` | `u` | Complements must be range-empty or routed to $\Sigma_3$ / $\Sigma_4$ fold-layer coverage. |
| `R_u_A4_A2` | `S_u_A4_A2_2` | `u` | Complements must be range-empty or routed to $\Sigma_3$ / $\Sigma_4$ fold-layer coverage. |
| `R_u_A4_A3` | `S_u_A4_A3_3` | `u` | Complements must be range-empty or routed to $\Sigma_3$ / $\Sigma_4$ fold-layer coverage. |

For each accepted simple-root subrow, the already certified inequalities must remain strict:
$$
\mu_{\beta}^{y}>0,
\qquad
\lambda_{\alpha}^{y}>0,
\qquad
\operatorname{dist}\!\big(Y_{\alpha}^{y},\partial Y_{\beta}^{y}\big)>0,
$$
$$
0<t-s_B^y(t)<h,
\qquad
\chi_y\bigl(x(t)-x(s_B^y(t))\bigr)>0,
\qquad
|J_y|\ge\nu_B>0.
$$

For each boundary complement declared empty, prove a strict range gap:
$$
\Delta^y_B
=
\operatorname{dist}\!\big(Y_{\alpha}^{y},Y_{\beta}^{y}\big)
>0.
$$
For each boundary complement routed to a fold layer, identify the separator
$$
\Sigma
$$
and include it in the corresponding
$$
\mathcal{F}_{\Sigma}
$$
impulse sum.

## Pass/Fail Criteria

The fold-ceiling pass succeeds only if all of the following are true:

- every row currently carrying `fold_layer_impulse_ceiling_not_evaluated` is rewritten as `fold_layer` with a finite
  $$
  I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma};
  $$
- every row currently carrying `range_overlap_requires_level_split` is replaced by accepted subrows, and no boundary complement remains `split_required`;
- the six accepted simple-root subrows keep their positive source floor, receiver floor, source-coverage gap, memory-depth gap, horizon gap, sign margin, and root-count bound
  $$
  [1,1];
  $$
- no accepted empty row loses its positive range gap;
- no fold row is emitted as a simple-root row, and no branch-sum residual is evaluated on a separator layer;
- all reported constants are computed on the same
  $$
  T_{\mathrm{cyc}},
  \qquad
  \mathcal{K},
  \qquad
  \mathcal{P},
  \qquad
  \Theta.
  $$

The pass fails immediately if any one of the following occurs:

- a reported fold ceiling is absent, infinite, or computed on a different packet identity;
- the fold transit constant
  $$
  C_\Sigma
  $$
  or acceleration enclosure
  $$
  A_{\Sigma,\eta,\epsilon_c}
  $$
  is missing when the normal-form estimate is used;
- the direct quadrature route does not enclose every row touching the separator;
- any separator loses
  $$
  \alpha_{\Sigma}>0
  \qquad
  \text{or}
  \qquad
  \nu_{\mathrm{exit},\Sigma}>0;
  $$
- any separator has
  $$
  \Delta N_\Sigma\notin2\mathbb{Z}
  \qquad
  \text{or}
  \qquad
  \Delta D_\Sigma\ne0;
  $$
- any fold-adjacent parent-boundary complement is neither range-empty nor covered by an accepted fold-layer row.

## Branch-Chart Routing After Acceptance

If this packet passes, `branch_chart.json` may refine the pre-ledger but may not reinterpret it.

Accepted simple-root rows route to branch-chart simple branches:
$$
s_B^y(t)=(y|_{I_\beta^s})^{-1}(y(t)),
$$
with the stored Jacobian floor, memory-depth range, sign margin, and inactive-complement gap. These are the only rows allowed to appear in `branch_chart.json` with `preledger_status_ref` equal to `simple_root`.

Accepted empty rows route to inactive complements with their positive range gaps. They do not authorize active roots.

Accepted fold-layer rows route to the fold-event atlas. They may supply incoming and outgoing chart labels, parity data, row impulse ceilings, and fold-transition labels for adjacent simple-root branches. They do not supply a branch
$$
s_B^y(t)
$$
through the separator layer, and they do not authorize a branch-sum contribution with a collapsing
$$
|J_y|^{-1}
$$
factor. Their force contribution enters later residual and topology rows only as the dual-mollified fold integral.

Therefore the branch-chart acceptance condition after this pass is:
$$
\{\text{simple branches}\}
\subseteq
\{\text{accepted `simple_root` pre-ledger rows}\},
$$
$$
\{\text{fold transitions}\}
\subseteq
\{\text{accepted `fold_layer` pre-ledger rows with finite }I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}\}.
$$
Any fold-layer leakage into a simple-root branch chart rejects the seed chart even if the numerical residuals look small.

## Immediate Next Artifact

The next action is not a live-ledger edit. Use `fold_parent_contract_decision_packet.md` to decide the parent-complement proof policy:

1. add a third endpoint-exclusion alternative and then attempt an endpoint-contact closure certificate;
2. add a regular-boundary fold-coverage theorem and then attempt a coverage certificate; or
3. keep the current two-alternative contract unchanged and reject this packet before branch-chart certification.

Only after an approved route closes every named parent-complement strip should a separate live ledger update rewrite the 16 fold rows and 6 parent rows from `split_required` to accepted rows.

Until those artifacts exist, the correct status remains:

`branch_chart_authorized: false`
