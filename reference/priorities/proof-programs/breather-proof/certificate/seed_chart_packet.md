# Seed-Chart Packet Contract

## Status

This packet specifies the next executable artifact set for the collinear-breather certificate. It does not instantiate
$$
\phi_{\mathrm{cyc}},
$$
and it does not promote the conditional Schauder theorem. It fixes the data contract, equations, table schemas, and first candidate-construction route for the seed-chart gate after the coarse itinerary parity pass.

The current upstream gate is `itinerary.json`, whose doubled four-arc generic itinerary has only passed the separator parity check. The next accepted output is a candidate cycle with a null-coordinate causal pre-ledger and then an active branch chart on the same sampled domain.

## Artifact Contract

The seed-chart gate must produce the following files in this directory:

| Artifact | Role | Promotion condition |
| --- | --- | --- |
| `phi_cyc.json` | Candidate center history, period, normalization, symmetry chart, and interpolation or basis data | Supplies the single history being certified |
| `mesh.json` | Sampled certificate mesh $\{\theta_j\}_{j=0}^{N}$ and sample tolerances | Gives a common domain for every seed-chart row |
| `causal_ledger.json` | Null-coordinate causal pre-ledger for ordered receiver-source blocks | Classifies blocks as empty, simple-root, or fold-layer before root solving |
| `causal_preledger_interval_report.md` | Interval proof or failing block for the pre-ledger theorem target | Rejects bad candidates before branch-chart certification |
| `branch_chart.json` | Active branches, inactive complements, signed sheet labels, memory-depth ranges, Jacobian formulas, and origin-layer labels | Supplies the finite branch chart for the seed row |
| `seed_chart_interval_report.md` | Interval proof of seed margins and sensitivity constants | Passes only with strict positive margins |

The seed margin vector is
$$
\mathcal{M}_{\mathrm{seed}}
=
\left(
\nu_{\mathrm{seed}},
\gamma_{\mathrm{gap}},
\gamma_h,
\gamma_{\mathrm{env}},
L_J,
L_F,
L_h,
L_{\mathrm{env}}
\right).
$$
The seed-chart row passes only if
$$
\nu_{\mathrm{seed}}>0,
\qquad
\gamma_{\mathrm{gap}}>0,
\qquad
\gamma_h>0,
\qquad
\gamma_{\mathrm{env}}>0,
$$
and the four sensitivity constants are finite on the same certified domain.

## Candidate Cycle Schema

`phi_cyc.json` should use this top-level shape:

| Field | Required content |
| --- | --- |
| `schema` | `breather-phi-cyc-v1` |
| `status` | `candidate`, `preledger_rejected`, `branch_chart_rejected`, or `seed_chart_ready` |
| `itinerary_id` | Must match `doubled_four_arc_generic` unless a replacement itinerary is explicitly reported |
| `parameters` | $c_f$, $\eta$, $\epsilon_c$, $g=\kappa\epsilon^2$, memory horizon $h$, normalization choices |
| `period` | $T_{\mathrm{cyc}}$ and section anchor |
| `symmetry` | Signed-sheet convention, origin crossings, and periodic identification |
| `basis` | Piecewise interpolation, collocation, quadrature, or fold-adapted fractional basis data |
| `arcs` | Ordered interval list with speed class, endpoint data, separator events, and origin-layer flags |
| `samples` | Values of $x$, $\dot x$, optional $\ddot x$, and local basis residuals on the mesh |
| `construction_notes` | Whether the candidate came from ansatz, collocation, simulation, or a hybrid route |

The mesh file should identify every sample by normalized phase
$$
\theta_j\in[0,1],
\qquad
t_j=T_{\mathrm{cyc}}\theta_j,
$$
and by its active itinerary interval. Separator neighborhoods must be refined more densely than ordinary sub-field interiors.

## Null-Coordinate Pre-Ledger

Use
$$
u(t)=c_f t-x(t),
\qquad
w(t)=c_f t+x(t).
$$
The self-image equation
$$
|x(t)-x(s)|=c_f(t-s),
\qquad
s<t,
$$
splits into the two exact ledgers:
$$
x(t)>x(s)
\quad\Longleftrightarrow\quad
u(t)=u(s),
$$
and
$$
x(t)<x(s)
\quad\Longleftrightarrow\quad
w(t)=w(s).
$$

For every ordered receiver-source block
$$
(I_\alpha,I_\beta),
\qquad
t\in I_\alpha,
\qquad
s\in I_\beta,
\qquad
s<t,
$$
`causal_ledger.json` should record one row for each required subblock:

| Field | Required content |
| --- | --- |
| `receiver_interval` | $I_\alpha$ |
| `source_interval` | $I_\beta$ |
| `ledger` | `u` or `w` |
| `receiver_range` | Interval enclosure for $u(I_\alpha)$ or $w(I_\alpha)$ |
| `source_range` | Interval enclosure for $u(I_\beta)$ or $w(I_\beta)$ |
| `status` | `empty`, `simple_root`, `fold_layer`, or `split_required` |
| `range_gap` | Positive gap for empty rows |
| `monotone_floor` | Positive derivative floor for simple-root rows |
| `root_count_bound` | Certified count or interval count |
| `root_sign` | Sign of $x(t)-x(s)$ on the row |
| `jacobian_floor` | Floor for $J_u=du/ds/c_f$ or $J_w=dw/ds/c_f$ |
| `memory_depth_range` | Certified range of $t-s$ |
| `separator_event` | Fold or origin-layer event when applicable |
| `failure_code` | Empty unless the row blocks promotion |

The pre-ledger passes only if every block is certified empty, certified simple-root, or routed to a bounded fold-layer certificate. A `split_required` row is a failed pre-ledger until the split is performed.

### Range-gap and simple-root tests

For each ordered receiver-source block, define the null-coordinate range gaps
$$
\Delta^u_{\alpha\beta}
\equiv
\operatorname{dist}\!\big(u(I_\alpha),u(I_\beta)\big),
\qquad
\Delta^w_{\alpha\beta}
\equiv
\operatorname{dist}\!\big(w(I_\alpha),w(I_\beta)\big).
$$
The relevant ledger row is certified empty when its range gap is strictly positive. The row is certified simple-root only after the corresponding source-side derivative floor is strictly positive:
$$
\inf_{s\in I_\beta}
\left|1-\frac{\dot x(s)}{c_f}\right|
>0
\qquad
\text{for the }u\text{ ledger},
$$
or
$$
\inf_{s\in I_\beta}
\left|1+\frac{\dot x(s)}{c_f}\right|
>0
\qquad
\text{for the }w\text{ ledger}.
$$
If neither strict range separation nor a monotone source floor can be certified, the row must be split until one of those tests applies or else routed to a bounded fold layer. This is the seed-chart stop condition: unresolved rows do not proceed to branch-chart certification.

Every accepted fold-layer row must point to the itinerary parity ledger and preserve
$$
\Delta N\in 2\mathbb{Z},
\qquad
\Delta D=0.
$$
The pre-ledger therefore strengthens the coarse itinerary parity check by attaching it to the actual ordered arc-pair blocks of
$$
\phi_{\mathrm{cyc}}.
$$

## Branch Chart Schema

After the pre-ledger passes, `branch_chart.json` should list active roots with inactive complements:

| Field | Required content |
| --- | --- |
| `branch_id` | Stable identifier keyed by receiver interval, source interval, ledger, and sheet |
| `source_relation` | `partner`, `self`, or `origin_layer_self` |
| `root_enclosure` | Interval enclosure for $s(t)$ or sampled root values |
| `line_of_action_sign` | $\hat r$ or signed 1D equivalent |
| `jacobian_formula` | Formula and interval floor for $J$ |
| `memory_depth_range` | Range for $t-s$ |
| `amplitude_bound` | Bound for the dual-mollified contribution on the row |
| `degree_contribution` | Signed-degree contribution |
| `inactive_complement` | Certified gap excluding nearby roots |
| `fold_transition` | Incoming/outgoing fold labels where relevant |
| `topology_flag` | Whether the branch requires topology-row confirmation |

The active branch chart is not accepted if any inactive complement has zero gap, any active simple branch loses its Jacobian floor, or any fold-layer row is silently reduced to a branch-sum formula.

## First Candidate Construction Route

Start with the doubled four-arc generic itinerary:
$$
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}.
$$

Use a symmetry-constrained piecewise candidate:

1. Choose section data
   $$
   x(0)=x_\ast,
   \qquad
   \dot x(0)=-u_\ast,
   \qquad
   0<u_\ast<c_f.
   $$
2. Build sub-field, separator, super-field, recapture, mirror-super-field, and final sub-field pieces with $C^1$ matching away from fold layers.
3. Use fold-adapted local coordinates near each $\Sigma_i$ rather than forcing a polynomial branch through $|\dot x|=c_f$.
4. Enforce returned-history sampling:
   $$
   P_\eta(\phi_{\mathrm{cyc}})(\theta_j)=\phi_{\mathrm{cyc}}(\theta_j),
   \qquad
   \partial_\theta P_\eta(\phi_{\mathrm{cyc}})(\theta_j)=\dot\phi_{\mathrm{cyc}}(\theta_j),
   $$
   only as a residual target at this stage.
5. Run the null-coordinate pre-ledger before solving full branch residuals.

If this route fails at the pre-ledger, reject the candidate or refine the itinerary before corridor arithmetic. If it passes the pre-ledger but fails the branch chart, preserve the exact failing block as the next proof obstruction.

## Pass/Fail Routing

| Failure row | Meaning | Next route |
| --- | --- | --- |
| Candidate data absent | No instantiated $\phi_{\mathrm{cyc}}$ or mesh | Build candidate before causal ledger work |
| Pre-ledger failure | Some ordered block is neither empty, simple-root, nor bounded fold-layer | Reject candidate, split block, or change itinerary |
| Branch-chart failure | Active roots are not finite or strict gaps/floors are absent | Strengthen candidate or move to interval collocation |
| Seed-margin failure | The finite chart exists but lacks strict seed margins | Adjust certificate radius, mesh, or candidate |
| Fold-layer leakage | Fold row was treated as a simple-root branch | Return to dual-mollified fold certificate |

The accepted output of this packet is `seed_chart_ready`, not a breather theorem.
