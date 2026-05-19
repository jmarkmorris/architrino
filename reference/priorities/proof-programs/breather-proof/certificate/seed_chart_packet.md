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

## Packet Identity And Same Certified Domain

The next executable packet must be certified on one fixed domain. Define the packet identity tuple
$$
\mathfrak{I}_{\mathrm{seed}}
=
\left(
\mathcal{K},
T_{\mathrm{cyc}},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta
\right).
$$
Every artifact in the seed-chart gate must record this same tuple, either directly or by exact artifact references. The seed-chart interval report fails before margin arithmetic unless
$$
\mathfrak{I}_{\mathrm{seed}}^{\phi}
=
\mathfrak{I}_{\mathrm{seed}}^{\Theta}
=
\mathfrak{I}_{\mathrm{seed}}^{\mathcal{L}}
=
\mathfrak{I}_{\mathrm{seed}}^{\mathcal{B}},
$$
where the superscripts refer respectively to `phi_cyc.json`, `mesh.json`, `causal_ledger.json`, and `branch_chart.json`.

The report must also verify the row references
`mesh.subblocks -> causal_ledger.rows -> branch_chart.branches`.
Thus every branch-chart row is authorized by exactly one accepted pre-ledger row, every simple-root pre-ledger row required by the itinerary is consumed by the branch chart, every empty row remains an inactive complement with a positive range gap, and every fold-layer row is routed to the fold-event atlas rather than to a branch-sum formula.

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

## Candidate Cycle As A Finite Object

The candidate-cycle packet is the finite mathematical object
$$
\Pi_{\mathrm{cyc}}
=
\left(
T_{\mathrm{cyc}},
\mathcal{K},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta,
\mathcal{T}_{\mathrm{tol}},
\mathcal{R}_{\mathrm{target}}
\right).
$$
Here
$$
T_{\mathrm{cyc}}>0
$$
is the proposed period,
$$
\mathcal{K}
$$
is the ordered velocity-class itinerary with arc intervals
$$
I_\alpha=[t_\alpha^-,t_\alpha^+],
$$
$$
\mathcal{S}
$$
is the symmetry and section normalization chart,
$$
\mathcal{P}=(c_f,\eta,\epsilon_c,g,h)
$$
is the parameter tuple with
$$
g=\kappa\epsilon^2,
$$
$$
\mathcal{B}_{\mathrm{rep}}
$$
is the finite interpolation, collocation, quadrature, or fold-adapted basis representation,
$$
\Theta=\{\theta_j\}_{j=0}^{N}
$$
is the sampled phase mesh,
$$
\mathcal{T}_{\mathrm{tol}}
$$
is the tolerance vector, and
$$
\mathcal{R}_{\mathrm{target}}
$$
is the residual target vector used by the later returned-sample and seed-margin rows.

The representation block
$$
\mathcal{B}_{\mathrm{rep}}
$$
must be finite: each arc records coefficients, basis labels, endpoint enclosures, and interval evaluation rules for
$$
x(t),
\qquad
\dot x(t),
\qquad
\ddot x(t)
$$
where the last quantity is supplied only when the representation differentiates classically away from fold layers. A fold layer records its separator center
$$
t_\Sigma,
$$
its layer radius
$$
\rho_\Sigma,
$$
its local coordinate
$$
\tau=t-t_\Sigma,
$$
and either the fractional coefficients such as
$$
a_{3/2},
\qquad
a_{5/2},
$$
or an interval-collocation enclosure that replaces those coefficients with the same residual targets.

The normalization chart
$$
\mathcal{S}
$$
must state the section anchor and the symmetry rule used to remove the time-translation freedom. The default section is
$$
x(0)=x_\ast,
\qquad
\dot x(0)<0,
$$
with periodic identification
$$
x(t+T_{\mathrm{cyc}})=x(t),
\qquad
\dot x(t+T_{\mathrm{cyc}})=\dot x(t).
$$
If the packet uses an apocenter-even or origin-crossing-odd symmetry chart, the paired arc labels and signed-sheet rule must be explicit rather than inferred from the coefficient table.

The tolerance vector must include at least
$$
\epsilon_x,
\qquad
\epsilon_v,
\qquad
\epsilon_{\mathrm{EOM}},
\qquad
\epsilon_{\mathrm{range}},
\qquad
\epsilon_J,
\qquad
\epsilon_{\mathrm{fold}}.
$$
On simple-root chart samples the candidate must expose equation residuals of the form
$$
E_j
\equiv
\left|
\ddot x(t_j)-F_\eta^{\Pi}(t_j)
\right|
\le
\epsilon_{\mathrm{EOM},j},
$$
where
$$
F_\eta^{\Pi}
$$
denotes the dual-mollified absolute-time vector field evaluated from the packet data on the certified simple-root chart. Across fold layers the residual target is not a branch-sum residual; it is the interval integral of the dual-mollified fold contribution over the recorded layer.

The returned-history residual targets are
$$
R_j^x
\equiv
\left|
P_\eta(\phi_{\mathrm{cyc}})(\theta_j)
-
\phi_{\mathrm{cyc}}(\theta_j)
\right|,
\qquad
R_j^v
\equiv
\left|
\partial_\theta P_\eta(\phi_{\mathrm{cyc}})(\theta_j)
-
\dot\phi_{\mathrm{cyc}}(\theta_j)
\right|.
$$
They are stored as targets at this gate, not as proof of returned-sample preservation. The seed-chart row may proceed only after the same
$$
\Pi_{\mathrm{cyc}}
$$
supplies the pre-ledger inputs, branch-chart inputs, and residual targets without changing period, normalization, mesh, or tolerances between files.

### Finite residual construction route

The candidate cycle may come from a closed-form ansatz, direct quadrature,
simulation-assisted fitting, continuation, or interval collocation. These routes
are equivalent at this gate only if they produce one finite residual problem on
the same packet identity. The finite reduction must also record the map data
that make a root meaningful: the projection from an admissible history into the
finite coefficient vector, the reconstruction/evaluation map from that vector
back into the declared history space, and the local neighborhood and regularity
assumptions under which the reduction is being used. A least-squares trace or
mesh residual without those data is candidate-search evidence, not a
seed-chart packet. Let
$$
\mathbf a
=
\left(
T_{\mathrm{cyc}},
\mathcal S,
\mathcal P,
\mathbf c
\right)
$$
collect the period, section/symmetry data, parameter tuple, and finite
representation coefficients for
$$
\phi_{\mathrm{cyc}}(\cdot;\mathbf a).
$$
The candidate residual vector is
$$
\mathcal R_{\mathrm{cand}}(\mathbf a)
=
\left(
G_{\mathrm{sec}},
G_{\mathrm{sym}},
G_{\mathrm{per}},
\{E_j\}_{j\in\Theta_{\mathrm{simple}}},
\{I_{\Sigma,k}\}_{k},
\{R_j^x,R_j^v\}_{j\in\Theta}
\right).
$$
Here
$$
G_{\mathrm{sec}},
\qquad
G_{\mathrm{sym}},
\qquad
G_{\mathrm{per}}
$$
enforce section anchoring, symmetry, and periodicity;
$$
E_j
$$
are the simple-root equation residuals;
$$
I_{\Sigma,k}
$$
are the dual-mollified fold-layer integral residuals; and
$$
R_j^x,
\qquad
R_j^v
$$
are the returned-history sample residuals.

If the route uses interval Newton, a Krawczyk operator, or an equivalent
interval-collocation enclosure, the candidate-construction certificate should
prove
$$
K(X)\subset \operatorname{int}(X)
$$
for a coefficient box
$$
X\ni\mathbf a.
$$
This inclusion is not a breather theorem and does not replace the pre-ledger. It
only promotes `candidate data absent` to a finite candidate packet whose
residuals, pre-ledger rows, branch chart, fold atlas, and returned-sample
targets can be tested on the same mesh.

For continuation or bifurcation-generated candidates, the branch parameter,
continuation step, and branch status are construction notes only. The accepted
object is one frozen coefficient vector
$$
\mathbf a
$$
and, when interval methods are used, one coefficient box
$$
X
$$
satisfying
$$
K(X)\subset \operatorname{int}(X)
$$
on the declared packet identity. Bifurcation labels, curve membership, or
monodromy multipliers do not waive the null-coordinate pre-ledger, branch
chart, fold atlas, or returned-sample rows.

## Candidate Cycle Schema

`phi_cyc.json` should use this top-level shape:

| Field | Required content |
| --- | --- |
| `schema` | `breather-phi-cyc-v1` |
| `packet_id` | Stable identifier for the shared packet identity tuple $\mathfrak{I}_{\mathrm{seed}}$ |
| `status` | `candidate`, `preledger_rejected`, `branch_chart_rejected`, or `seed_chart_ready` |
| `itinerary_id` | Must match `doubled_four_arc_generic` unless a replacement itinerary is explicitly reported |
| `parameters` | $c_f$, $\eta$, $\epsilon_c$, $g=\kappa\epsilon^2$, memory horizon $h$, normalization choices |
| `period` | $T_{\mathrm{cyc}}$ and section anchor |
| `symmetry` | Signed-sheet convention, origin crossings, and periodic identification |
| `basis` | Piecewise interpolation, collocation, quadrature, or fold-adapted fractional basis data |
| `collocation_meta` | For collocation routes: subinterval partition, polynomial degree, collocation nodes, period normalization, and the section-anchoring row; otherwise `null` with a construction-route note |
| `solution_manifold_compatibility` | Endpoint compatibility for the first-order state $Y=(x,u)$, including $\dot X(0)=U(0)$, $\dot U(0)=F_\eta(\Phi)$, and the tangent constraint consumed by the monodromy row |
| `arcs` | Ordered interval list with speed class, endpoint data, separator events, and origin-layer flags |
| `samples` | Values of $x$, $\dot x$, optional $\ddot x$, and local basis residuals on the mesh |
| `evaluation_enclosures` | Interval evaluation rules for $x$, $\dot x$, $\ddot x$, $u$, $w$, and the needed range bounds |
| `residual_targets` | $E_j$, $R_j^x$, $R_j^v$, and fold-integral targets keyed to `mesh.json` |
| `artifact_inputs` | Hashes or version labels of the itinerary, mesh, and parameter tuple used by the packet |
| `construction_notes` | Whether the candidate came from ansatz, collocation, simulation, or a hybrid route |

The mesh file should identify every sample by normalized phase
$$
\theta_j\in[0,1],
\qquad
t_j=T_{\mathrm{cyc}}\theta_j,
$$
and by its active itinerary interval. Separator neighborhoods must be refined more densely than ordinary sub-field interiors.

`mesh.json` must record the following finite mesh data:

| Field | Required content |
| --- | --- |
| `schema` | `breather-mesh-v1` |
| `packet_id` | Must equal the `packet_id` in `phi_cyc.json` |
| `itinerary_ref` | The selected itinerary id and separator-event list used to build the subblocks |
| `period_ref` | The exact `period` entry from `phi_cyc.json` |
| `nodes` | Ordered phase nodes $\theta_j$ with $t_j=T_{\mathrm{cyc}}\theta_j$ |
| `arc_membership` | The itinerary arc or fold layer containing each node |
| `subblocks` | Receiver-source subblock partition used by `causal_ledger.json` |
| `mesh_widths` | Maximum ordinary, separator-layer, and origin-layer mesh widths |
| `adaptation_policy` | Uniform, separator-refined, residual-equidistributed, or hybrid mesh policy, with the reason each separator and origin layer receives its declared refinement |
| `sample_tolerances` | The local $\epsilon_x$, $\epsilon_v$, $\epsilon_{\mathrm{EOM}}$, $\epsilon_{\mathrm{range}}$, and $\epsilon_J$ budgets |
| `endpoint_policy` | Periodic endpoint identification, excluded diagonal rule, and fold-layer boundary convention |

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
| `row_id` | Stable row key matching one `mesh.json` subblock and one ledger coordinate |
| `packet_id` | Must equal the `packet_id` in `phi_cyc.json` and `mesh.json` |
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
| `itinerary_required` | Whether the selected itinerary requires an active row, an inactive complement, or a fold-layer row here |
| `failure_code` | Empty unless the row blocks promotion |

The pre-ledger passes only if every block is certified empty, certified simple-root, or routed to a bounded fold-layer certificate. A `split_required` row is a failed pre-ledger until the split is performed.

### Null-coordinate causal pre-ledger lemma

For a receiver-source subblock
$$
B=(I_\alpha^r,I_\beta^s)
$$
and a ledger coordinate
$$
y\in\{u,w\},
$$
define the interval ranges
$$
Y_{\alpha}^{y}=y(I_\alpha^r),
\qquad
Y_{\beta}^{y}=y(I_\beta^s),
$$
the range gap
$$
\Delta^y_B
\equiv
\operatorname{dist}\!\big(Y_{\alpha}^{y},Y_{\beta}^{y}\big),
$$
the source monotonicity floor
$$
\mu_{\beta}^{y}
\equiv
\inf_{s\in I_\beta^s}
\frac{|y'(s)|}{c_f},
$$
and the receiver monotonicity floor
$$
\lambda_{\alpha}^{y}
\equiv
\inf_{t\in I_\alpha^r}
\frac{|y'(t)|}{c_f}.
$$
The derivative formulas are
$$
\frac{u'(s)}{c_f}
=
1-\frac{\dot x(s)}{c_f},
\qquad
\frac{w'(s)}{c_f}
=
1+\frac{\dot x(s)}{c_f}.
$$

> **Lemma (Null-Coordinate Causal Pre-Ledger).**
> Fix a finite candidate-cycle packet
> $$
> \Pi_{\mathrm{cyc}}
> $$
> and a finite ordered subblock partition of every receiver-source arc pair
> $$
> (I_\alpha,I_\beta),
> \qquad
> s<t.
> $$
> Suppose that every subblock satisfies exactly one of the following certified alternatives.
>
> 1. **Certified empty.** For both incompatible ledgers or for the ledger selected by the row,
>    $$
>    \Delta^y_B\ge \gamma_{\mathrm{range},B}>0.
>    $$
> 2. **Certified simple-root.** For one ledger
>    $$
>    y\in\{u,w\},
>    $$
>    the source and receiver monotonicity floors obey
>    $$
>    \mu_{\beta}^{y}\ge\nu_{\mathrm{src},B}>0,
>    \qquad
>    \lambda_{\alpha}^{y}\ge\nu_{\mathrm{rec},B}>0,
>    $$
>    the receiver range is strictly covered by the source range,
>    $$
>    \operatorname{dist}\!\big(Y_{\alpha}^{y},\partial Y_{\beta}^{y}\big)
>    \ge
>    \gamma_{\mathrm{cov},B}>0,
>    $$
>    the nontrivial memory-depth window is strict,
>    $$
>    \gamma_{\tau,B}
>    \le
>    t-s_B^y(t)
>    \le
>    h-\gamma_{h,B},
>    $$
>    and the line-of-action sign is separated,
>    $$
>    \chi_y\bigl(x(t)-x(s_B^y(t))\bigr)
>    \ge
>    \gamma_{\mathrm{sign},B}>0,
>    \qquad
>    \chi_u=+1,
>    \qquad
>    \chi_w=-1.
>    $$
>    Here
>    $$
>    s_B^y(t)=(y|_{I_\beta^s})^{-1}(y(t))
>    $$
>    is the unique source-time branch supplied by monotonicity.
> 3. **Certified fold-layer.** The subblock lies inside one listed separator layer
>    $$
>    |s-s_\Sigma|\le\rho_\Sigma
>    $$
>    for a ledger coordinate
>    $$
>    y\in\{u,w\},
>    $$
>    with
>    $$
>    y'(s_\Sigma)=0,
>    \qquad
>    |y''(s)|\ge\alpha_{\Sigma}>0
>    $$
>    on the layer, with boundary recovery
>    $$
>    \inf_{s\in\partial I_{\Sigma}}
>    \frac{|y'(s)|}{c_f}
>    \ge
>    \nu_{\mathrm{exit},\Sigma}>0,
>    $$
>    with finite fold impulse ceiling
>    $$
>    I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty,
>    $$
>    and with parity data
>    $$
>    \Delta N_\Sigma\in2\mathbb{Z},
>    \qquad
>    \Delta D_\Sigma=0.
>    $$
>
> Then `causal_ledger.json` is a finite pre-ledger for the self-image equation
> $$
> |x(t)-x(s)|=c_f(t-s),
> \qquad
> s<t,
> $$
> and every ordered subblock is accepted as `empty`, `simple_root`, or `fold_layer`. Empty rows contain no roots. Simple-root rows contain one interval-defined source branch
> $$
> s_B^y(t)
> $$
> with Jacobian floor at least
> $$
> \nu_{\mathrm{src},B}.
> $$
> Fold-layer rows are not branch-sum rows and may enter the branch chart only through the certified fold-event atlas.

Proof route. Empty rows follow from interval separation of null-coordinate ranges. In a simple-root row, source monotonicity makes
$$
y|_{I_\beta^s}
$$
injective, the strict range-cover inequality makes the inverse branch exist for every receiver time in the subblock, and the memory-depth and sign floors exclude the diagonal and the wrong signed sheet. The source derivative floor is exactly the null-coordinate Jacobian floor
$$
|J_y|=\frac{|y'(s)|}{c_f}.
$$
A fold-layer row is the only accepted location where this Jacobian may vanish; the normal-form curvature floor and boundary recovery keep the layer finite, while the fold parity data preserve the delayed-root degree through the layer.

### Pass/fail inequalities

The pre-ledger passes only if the following global margins are positive on the same
$$
\Pi_{\mathrm{cyc}}
$$
and mesh:

$$
\gamma_{\mathrm{empty}}
\equiv
\min_{B\in\mathcal{E}}
\Delta^{y(B)}_B
>0,
$$

$$
\nu_{\mathrm{simple}}
\equiv
\min_{B\in\mathcal{S}_{\mathrm{root}}}
\mu_{\beta}^{y(B)}
>0,
$$

$$
\gamma_{\mathrm{cov}}
\equiv
\min_{B\in\mathcal{S}_{\mathrm{root}}}
\operatorname{dist}\!\big(Y_{\alpha}^{y(B)},\partial Y_{\beta}^{y(B)}\big)
>0,
$$

$$
\gamma_{\tau}
\equiv
\min_{B\in\mathcal{S}_{\mathrm{root}}}
\inf_{t\in I_\alpha^r}
\bigl(t-s_B^{y(B)}(t)\bigr)
>0,
$$

$$
\gamma_{h}
\equiv
\min_{B\in\mathcal{S}_{\mathrm{root}}}
\inf_{t\in I_\alpha^r}
\bigl(h-(t-s_B^{y(B)}(t))\bigr)
>0,
$$

$$
\gamma_{\mathrm{sign}}
\equiv
\min_{B\in\mathcal{S}_{\mathrm{root}}}
\inf_{t\in I_\alpha^r}
\chi_{y(B)}
\bigl(x(t)-x(s_B^{y(B)}(t))\bigr)
>0.
$$

For every accepted fold layer
$$
\Sigma,
$$
the fold bounds must satisfy
$$
\alpha_{\Sigma}>0,
\qquad
\nu_{\mathrm{exit},\Sigma}>0,
\qquad
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty,
\qquad
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$
For every inactive complement adjacent to a simple row, the inactive gap must satisfy
$$
\gamma_{\mathrm{inact}}
\equiv
\min_{B\in\mathcal{I}_{\mathrm{inactive}}}
\operatorname{dist}\!\big(Y_{\alpha}^{y(B)},Y_{\beta}^{y(B)}\big)
>0.
$$
If any displayed minimum is zero, negative, absent from the interval report, or computed on a different mesh or period than
$$
\Pi_{\mathrm{cyc}},
$$
the pre-ledger fails.

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

### Branch-chart reduction

The pre-ledger reduces the later branch-chart search by replacing a two-variable root search on every ordered block with three finite row types. A certified empty row becomes an inactive complement with gap
$$
\Delta^y_B.
$$
A certified simple-root row contributes the one inverse branch
$$
s_B^y(t)=(y|_{I_\beta^s})^{-1}(y(t)),
$$
so `branch_chart.json` only has to refine the stored interval enclosure, Jacobian floor, memory-depth range, and amplitude bound for that named branch. A certified fold-layer row contributes no simple branch until the fold-event atlas supplies incoming and outgoing chart labels, parity data, and the finite fold-impulse ceiling.

The branch-chart validator is therefore forbidden to search blocks with positive range gaps, forbidden to collapse fold layers into branch-sum rows, and required to key every active simple branch back to exactly one `causal_ledger.json` row. This makes the pre-ledger a rejection gate before interval root certification: if the finite null-coordinate row set does not close, there is no certified branch chart to refine.

### Pre-ledger falsifiers

A candidate or itinerary is rejected before branch-chart certification if an itinerary-required active row has
$$
\Delta^u_B>0
\qquad
\text{and}
\qquad
\Delta^w_B>0,
$$
because neither null ledger can contain the required self-image root on that block.

A candidate or itinerary is rejected before branch-chart certification if a row declared inactive has one ledger satisfying the simple-root inequalities above with
$$
\gamma_{\tau,B}>0,
\qquad
\gamma_{h,B}>0,
\qquad
\gamma_{\mathrm{sign},B}>0,
$$
because the pre-ledger has found an unlisted active self-image branch.

A candidate or itinerary is rejected before branch-chart certification if a separator row has
$$
\alpha_{\Sigma}=0,
\quad
\nu_{\mathrm{exit},\Sigma}=0,
\quad
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}=\infty,
\quad
\Delta N_\Sigma\notin2\mathbb{Z},
\quad
\text{or}
\quad
\Delta D_\Sigma\ne0.
$$
This falsifier prevents an unresolved field-speed separator from being hidden inside a simple-root branch chart.

## Branch Chart Schema

After the pre-ledger passes, `branch_chart.json` should list active roots with inactive complements:

| Field | Required content |
| --- | --- |
| `packet_id` | Must equal the `packet_id` in `phi_cyc.json`, `mesh.json`, and `causal_ledger.json` |
| `branch_id` | Stable identifier keyed by receiver interval, source interval, ledger, and sheet |
| `preledger_row_id` | Identifier of the `causal_ledger.json` row authorizing the branch |
| `preledger_status_ref` | Must be `simple_root` for a simple branch; fold rows must not appear here as simple branches |
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

> **Lemma (Authorized branch-chart refinement).**
> Suppose the `Null-Coordinate Causal Pre-Ledger` has passed on
> $$
> \Pi_{\mathrm{cyc}}
> $$
> and suppose `branch_chart.json` satisfies the packet identity check and the row references above. Suppose further that:
>
> 1. each simple branch has `preledger_status_ref` equal to `simple_root`;
> 2. its source-time enclosure lies inside the inverse branch
>    $$
>    s_B^y(t)=(y|_{I_\beta^s})^{-1}(y(t));
>    $$
> 3. its Jacobian floor, memory-depth range, line-of-action sign, and amplitude bound refine the corresponding pre-ledger row without weakening any lower bound; and
> 4. no branch-chart row is attached to a pre-ledger row whose status is `empty`, `fold_layer`, or `split_required`.
>
> Then the branch chart is a refinement of the finite pre-ledger rather than a new root search. Every active simple row has one authorized root branch, every inactive complement keeps its pre-ledger range gap, and every fold-layer row remains outside branch-sum evaluation until the certified fold-event atlas supplies the incoming and outgoing chart labels.

This lemma supplies the branch-chart acceptance condition for the seed-chart interval report. A failure is certificate-useful: if a branch has no authorizing pre-ledger row, the pre-ledger was incomplete; if a required simple-root row is unconsumed, the branch chart is incomplete; if a fold row appears as a simple branch, the packet has leaked a separator layer into the wrong analytic regime.

`causal_preledger_interval_report.md` must list the minima
$$
\gamma_{\mathrm{empty}},
\quad
\nu_{\mathrm{simple}},
\quad
\gamma_{\mathrm{cov}},
\quad
\gamma_{\tau},
\quad
\gamma_h,
\quad
\gamma_{\mathrm{sign}},
\quad
\gamma_{\mathrm{inact}},
$$
the fold-layer tuple
$$
(\alpha_{\Sigma},\nu_{\mathrm{exit},\Sigma},I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma},\Delta N_\Sigma,\Delta D_\Sigma)
$$
for every separator, and the exact failing row when any minimum is not strict.

`seed_chart_interval_report.md` must verify that `phi_cyc.json`, `mesh.json`, `causal_ledger.json`, and `branch_chart.json` all use the same
$$
T_{\mathrm{cyc}},
\qquad
\mathcal{K},
\qquad
\mathcal{P},
\qquad
\Theta,
$$
before it reports
$$
\nu_{\mathrm{seed}},
\qquad
\gamma_{\mathrm{gap}},
\qquad
\gamma_h,
\qquad
\gamma_{\mathrm{env}},
\qquad
L_J,
\qquad
L_F,
\qquad
L_h,
\qquad
L_{\mathrm{env}}.
$$

The seed-chart interval report must end with a finite pass/fail table whose first row is the packet identity check, whose second row is pre-ledger consumption, whose third row is branch-chart authorization, and whose remaining rows are the strict margins
$$
\nu_{\mathrm{seed}},
\qquad
\gamma_{\mathrm{gap}},
\qquad
\gamma_h,
\qquad
\gamma_{\mathrm{env}},
$$
and finite sensitivities
$$
L_J,
\qquad
L_F,
\qquad
L_h,
\qquad
L_{\mathrm{env}}.
$$
The report fails if any row is absent, computed from a different packet identity tuple, non-strict where strictness is required, or infinite where a finite constant is required.

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
