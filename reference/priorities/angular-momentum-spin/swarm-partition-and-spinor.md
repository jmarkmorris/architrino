# Swarm Partition and Spinor Closure

This detailed priority file supports [Angular Momentum and Spin Closure](angular-momentum-spin.md). It preserves the tri-binary partition theorem target, solved minimal transition, ordered Noether swarm frame, spinor proof obligations, and component-resolved causal-writhe hypothesis.

## Result 2026-05-12: Tri-Binary Partition Theorem Target

The one-$h$ table in [energy.md](../../../content/markdown/aaa/dynamics/energy.md) should now be read as the seed of a constrained theorem target, not as the final partition. The $f_{\psi}$ row records the initial bookkeeping gauge for an outer-coupled positive transaction: the hit is first logged as $\Delta I_{\text{outer}}^{(0)}=+\hbar$. The final $f$ row asks for the stable post-redistribution branch. The unknown scalar partition is:

$$
\boldsymbol{\Delta I}
=
\left(
\Delta I_{\text{inner}},
\Delta I_{\text{middle}},
\Delta I_{\text{outer}},
\Delta I_{\text{wake}}
\right).
$$

Normalize the energy-table aliases to the bridge convention before using the table as a proof target:

| Energy-table alias | Theorem-target variable | Role |
| --- | --- | --- |
| $\Delta I_{\text{in}}$ | $\Delta I_{\text{inner}}$ | Self-hit / super-field-speed reconfiguration channel. |
| $\Delta I_{\text{mid}}$ | $\Delta I_{\text{middle}}$ | Field-speed separator or fulcrum channel. |
| $\Delta I_{\text{out}}$ and $\Delta I_o$ | $\Delta I_{\text{outer}}$ | Sub-field-speed external interface channel. |
| $\Delta I_{\text{wake}}$ | $\Delta I_{\text{wake}}$ | Causal-wake angular-momentum exchange projected onto the active generator. |

For a pre-transaction stable branch $B$, a candidate post-transaction branch $B'$, a transaction sign $\sigma\in\{+1,-1\}$, and a transaction axis $\hat{\mathbf a}$ supplied by the coupling geometry, the theorem target is the following constrained solve.

1. **Closed-cycle action and scalar rotational action.**
   $$
   \Delta A_{\text{cycle}}=\sigma h,
   \qquad
   \Delta I_{\text{inner}}
   +\Delta I_{\text{middle}}
   +\Delta I_{\text{outer}}
   +\Delta I_{\text{wake}}
   =
   \sigma\hbar.
   $$
   The sign-consistency rule in the energy table is only an admissibility inequality for a net positive or net negative transaction. It does not determine the partition.

2. **Vector angular-momentum conservation.**
   The scalar equation must descend from the vector ledger above:
   $$
   \sum_{\ell\in\{I,M,O\}}
   \Delta\mathbf I_\ell^{\text{mech}}
   +
   \Delta\mathbf L_{\text{tr}}
   +
   \Delta\mathbf L_{\text{wake}}^{\text{core}}
   =
   \Delta\mathbf J_{\text{coupl}}.
   $$
   In the first separated-scale circular scaffold, set $\Delta\mathbf L_{\text{tr}}=0$ and define
   $$
   \Delta I_{\text{inner}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_I^{\text{mech}},
   \quad
   \Delta I_{\text{middle}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_M^{\text{mech}},
   \quad
   \Delta I_{\text{outer}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf I_O^{\text{mech}},
   \quad
   \Delta I_{\text{wake}}
   =
   \hat{\mathbf a}\cdot\Delta\mathbf L_{\text{wake}}^{\text{core}}.
   $$
   Outside that scaffold, the transport remainder must remain in the vector equation instead of being hidden inside a scalar partition.

3. **Energy conservation.**
   $$
   \omega_I^{\ast}\Delta I_{\text{inner}}
   +
   \omega_M^{\ast}\Delta I_{\text{middle}}
   +
   \omega_O^{\ast}\Delta I_{\text{outer}}
   +
   \Delta E_{\text{wake}}
   =
   \Delta E_{\text{coupl}},
   $$
   with
   $$
   \Delta E_{\text{coupl}}
   =
   f_{\text{coupl}}\Delta A_{\text{cycle}}
   =
   \omega_{\text{coupl}}\sigma\hbar.
   $$
   The $\omega_\ell^{\ast}$ terms are branch-local effective angular frequencies across the discrete step. A full derivation must replace them with the appropriate cycle integral if $\omega_\ell$ changes appreciably during the transition.

4. **Root-ledger admissibility.**
   The candidate branch must move from one admissible causal-root ledger to another:
   $$
   \mathcal R(t_i)\longrightarrow\mathcal R(t_f),
   \qquad
   \mathcal H_{\ell,\alpha}(t_i)\longrightarrow\mathcal H_{\ell,\alpha}(t_f).
   $$
   On a raw self-root separator chart, the known parity guardrail is $\Delta N\in2\mathbb Z$ with $\Delta D=0$; on a grouped channel ledger, the same event may be recorded as one newly active channel. The partition theorem must state which chart is being used and which ledger jump produces each $\Delta I_\ell$.

5. **Phase-lock constraints.**
   The post-transaction branch must close the active causal roots over a full tri-binary cycle:
   $$
   \Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t_f)
   \equiv0\pmod{2\pi},
   \qquad
   \Phi_\ell(B')-\Phi_m(B')=2\pi k_{\ell m}.
   $$
   The phase functions must include geometric phase, wake-return delay, and causal-root ledger contribution for the chosen branch chart.

6. **Coupling geometry.**
   The external or internal transaction supplies boundary data:
   $$
   \left(
   \Delta E_{\text{coupl}},
   \Delta\mathbf J_{\text{coupl}},
   \hat{\mathbf a}
   \right)
   =
   \mathrm{Geom}_{\text{coupl}}
   (\text{exposed layer},\text{incidence direction},\text{impact parameter},\text{orientation data},\text{wake recoil channel}).
   $$
   For the first worked transition, use the outer-exposed case from the energy table. The outer-first entry is an initial condition, not a license to assign the final $\hbar$ entirely to $\Delta I_{\text{outer}}$.

7. **Branch stability.**
   A candidate $B'$ counts as an accepted partition only if it is stable under the delayed dynamics. The certificate should report a Floquet or interval-equivalent condition such as
   $$
   \rho(D\mathcal P_{B'})<1,
   $$
   together with positive root-existence, inactive-root gap, and phase-lock margins.

The theorem target is: solve these constraints over admissible post-branches $B'$. If one stable branch satisfies them, the partition is unique for the supplied coupling geometry. If several stable branches satisfy them, the partition is branch-dependent and the later measurement-response model must carry the branch-selection rule. If no stable branch satisfies them, the transaction is forbidden, reflected, or routed into wake exchange.

### Sharpened Partition Candidate Set

For a pre-transaction branch $B$ and coupling datum
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
$$
define the stable partition candidate set
$$
\mathscr P(B,\Gamma_{\text{coupl}})
=
\left\{
\left(B',\boldsymbol{\Delta I}\right):
C_{\mathbf J}\wedge C_A\wedge C_E\wedge C_R\wedge C_\Phi\wedge C_G\wedge C_S
\right\},
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
\right).
$$

The vector-ledger condition is
$$
C_{\mathbf J}:\quad
\sum_{\ell\in\{I,M,O\}}
\Delta\mathbf I_\ell^{\text{mech}}
+
\Delta\mathbf L_{\text{tr}}
+
\Delta\mathbf L_{\text{wake}}^{\text{core}}
=
\Delta\mathbf J_{\text{coupl}},
$$
with the scalar components defined only by projection onto the supplied transaction axis:
$$
\Delta I_{\text{inner}}
=
\hat{\mathbf a}\cdot\Delta\mathbf I_I^{\text{mech}},
\quad
\Delta I_{\text{middle}}
=
\hat{\mathbf a}\cdot\Delta\mathbf I_M^{\text{mech}},
\quad
\Delta I_{\text{outer}}
=
\hat{\mathbf a}\cdot\Delta\mathbf I_O^{\text{mech}},
\quad
\Delta I_{\text{wake}}
=
\hat{\mathbf a}\cdot\Delta\mathbf L_{\text{wake}}^{\text{core}}.
$$

The scalar action-closure condition is
$$
C_A:\quad
\Delta A_{\text{cycle}}=\sigma h,
\qquad
\Delta I_{\text{inner}}
+
\Delta I_{\text{middle}}
+
\Delta I_{\text{outer}}
+
\Delta I_{\text{wake}}
=
\sigma\hbar.
$$

The energy-closure condition is
$$
C_E:\quad
\omega_I^{\ast}\Delta I_{\text{inner}}
+
\omega_M^{\ast}\Delta I_{\text{middle}}
+
\omega_O^{\ast}\Delta I_{\text{outer}}
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}},
$$
or, outside the first action-angle approximation,
$$
C_E:\quad
\sum_{\ell\in\{I,M,O\}}
\int_{B\to B'}\omega_\ell\,dI_\ell
+
\Delta E_{\text{root}}
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}.
$$

The root-ledger admissibility condition is
$$
C_R:\quad
\left(
\mathcal R_B,\{\mathcal H_{\ell,\alpha}^{B}\}_{\ell,\alpha}
\right)
\longrightarrow
\left(
\mathcal R_{B'},\{\mathcal H_{\ell,\alpha}^{B'}\}_{\ell,\alpha}
\right)
$$
through declared fold, separator, grouped-channel, or branch-continuation rules, with raw self-root jumps obeying $\Delta N\in2\mathbb Z$ and $\Delta D=0$ on charts where that parity guardrail applies.

The phase-lock condition is
$$
C_\Phi:\quad
\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t_f;B')
\equiv0\pmod{2\pi},
\qquad
\Phi_\ell(B')-\Phi_m(B')=2\pi k_{\ell m},
$$
including geometric phase, wake-return delay, and causal-root ledger phase for every active branch used by $B'$.

The coupling-geometry condition is
$$
C_G:\quad
\left(
\Delta E_{\text{coupl}},
\Delta\mathbf J_{\text{coupl}},
\hat{\mathbf a}
\right)
=
\mathrm{Geom}_{\text{coupl}}
(\text{exposed layer},\text{incidence direction},\text{impact parameter},\text{orientation data},\text{wake recoil channel}),
$$
so $\hat{\mathbf a}$ and the source recoil are boundary data, not adjustable fit parameters inside the partition solve.

The branch-stability condition is
$$
C_S:\quad
\rho(D\mathcal P_{B'})<1,
\qquad
g_{\text{root}}(B')>0,
\qquad
g_{\text{phase}}(B')>0,
$$
where $g_{\text{root}}$ is the minimum active-root / inactive-root separation margin and $g_{\text{phase}}$ is the minimum phase-lock margin on the regularized chart.

### Branch-Selection Condition

The transaction is **unique** when
$$
\left|\mathscr P(B,\Gamma_{\text{coupl}})\right|=1.
$$
In that case the single element $\left(B',\boldsymbol{\Delta I}\right)$ is the branch-selected partition for the supplied coupling geometry.

The transaction is **branch-dependent** when
$$
\left|\mathscr P(B,\Gamma_{\text{coupl}})\right|>1.
$$
In that case the theorem is incomplete until a deterministic selection map
$$
\operatorname{Sel}_B:
\Gamma_{\text{coupl}}\times\mathfrak m_B
\longrightarrow
\mathscr P(B,\Gamma_{\text{coupl}})
$$
is supplied, where $\mathfrak m_B$ denotes the unresolved microstate data retained by the declared branch chart.

The transaction is **forbidden** when
$$
\mathscr P(B,\Gamma_{\text{coupl}})=\varnothing
$$
and no reflected or wake-exchange branch satisfies vector, energy, root-ledger, phase-lock, and stability closure.

The transaction is **reflected** when no accepted post-branch changes the core partition, but there exists a stable recoil branch $B_{\text{refl}}$ satisfying
$$
\Delta\mathbf L_{\text{mech}}^{\text{core}}
+
\Delta\mathbf L_{\text{tr}}
=
\mathbf 0,
\qquad
\Delta\mathbf J_{\text{coupl}}
+
\Delta\mathbf J_{\text{refl}}
+
\Delta\mathbf L_{\text{wake}}^{\text{core}}
=
\mathbf 0,
$$
with the outgoing source or apparatus channel carrying $\Delta\mathbf J_{\text{refl}}$.

The transaction is **routed into wake exchange** when no stable mechanical redistribution satisfies $C_{\mathbf J}$ and $C_E$, but a stable branch satisfies
$$
\Delta I_{\text{wake}}\ne0
\quad\text{or}\quad
\Delta E_{\text{wake}}\ne0
$$
and the full vector and energy ledgers close after the wake term is retained.

## Result 2026-05-12: Solved Minimal Four-Substep Transition

The bridge now contains one solved separated-scale transition rather than only a symbolic ledger. The solved branch is deliberately narrow: fixed projected normals, no transport remainder, no retained wake angular momentum after closure, one outer substep, one middle hinge substep, and two equal inner self-hit substeps. It is a branch certificate, not the general partition theorem.

Let the common substep be $\iota$. The branch rule is

$$
\Delta I_{\text{outer}}=\iota,
\qquad
\Delta I_{\text{middle}}=\iota,
\qquad
\Delta I_{\text{inner}}=2\iota,
\qquad
\Delta I_{\text{wake}}=0.
$$

The accepted positive transaction fixes the scalar ledger:

$$
\iota+\iota+2\iota=\hbar,
\qquad
\iota=\frac{\hbar}{4}.
$$

The solved partition is therefore

$$
\boxed{
\Delta I_{\text{outer}}=\frac{\hbar}{4},
\qquad
\Delta I_{\text{middle}}=\frac{\hbar}{4},
\qquad
\Delta I_{\text{inner}}=\frac{\hbar}{2},
\qquad
\Delta I_{\text{wake}}=0.
}
$$

Using the linearized mechanical scaffold, the fixed-radius outer retune is

$$
\Delta R_O=0,
\qquad
\Delta\omega_O
=
\frac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2},
$$

with admissibility condition

$$
R_O^-\left(
\omega_O^-
+
\frac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2}
\right)<c_f.
$$

The middle hinge remains on $R_M\omega_M=c_f$ to first order:

$$
\Delta R_M
=
\frac{\hbar}
{8\mu_{\text{arch}}R_M^-\omega_M^-},
\qquad
\Delta\omega_M
=
-
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_M^-\right)^2},
$$

so

$$
R_M^-\Delta\omega_M+\omega_M^-\Delta R_M=0.
$$

The fixed-radius inner two-substep retune is

$$
\Delta R_I=0,
\qquad
\Delta\omega_I
=
\frac{\hbar}
{4\mu_{\text{arch}}\left(R_I^-\right)^2},
$$

with self-hit admissibility condition

$$
s_I^+
=
\frac{R_I^-\left(
\omega_I^-
+
\frac{\hbar}{4\mu_{\text{arch}}\left(R_I^-\right)^2}
\right)}
{c_f}
>1,
$$

and self-delay condition

$$
\delta_{\text{self}}^+
=
2s_I^+\sin\!\left(\frac{\delta_{\text{self}}^+}{2}\right).
$$

On a raw simple-root separator chart, the two inner substeps correspond to the minimal even self-root jump

$$
\Delta N_{\text{self}}=+2,
\qquad
\Delta D=0,
$$

provided the active roots remain simple through the regularized transition.

The energy condition is also explicit. In the first action-angle approximation with no retained wake energy and no residual root-energy term, the accepted source channel must have branch-local frequency

$$
\omega_{\text{tx}}
=
\omega_{\ast}
\equiv
\frac{\omega_O^{\ast}+\omega_M^{\ast}+2\omega_I^{\ast}}{4}.
$$

If

$$
\Delta E_{\text{mismatch}}
=
\left(\omega_{\text{tx}}-\omega_{\ast}\right)\hbar
$$

does not vanish, the clean four-substep branch is not energy-closed. For $\omega_{\text{tx}}<\omega_{\ast}$, a low-frequency outer hit cannot produce this positive inner self-hit retune without drawing energy from a root reconfiguration or the wake/internal ledger. For $\omega_{\text{tx}}>\omega_{\ast}$, the surplus must be routed into wake recoil, transport, or another admissible branch.

This result is useful because it gives the first explicit failure gate as well as the first explicit success branch. The transition is allowed in the clean minimal chart only when the angular ledger, speed-regime inequalities, self-root parity, self-delay equation, and energy-frequency condition all hold.

### Candidate 2026-06-20: Test $(O,M,I)=(f-1,f,f+2)$ Around The Middle Hinge

Status: priority-only candidate under `tri_binary_partition_rule` and `worked_three_layer_noether_transition`. This is not a theorem row, not a canonized tri-binary law, and not reader-facing corpus prose. Its value is that it turns the operator/developer's three-binary offset intuition into a branch-family test that the existing partition and certificate machinery can accept or reject.

Promotion decision: defer with blocker. Promote only after a retained branch chart shows that the same candidate offset relation closes phase, speed-regime, causal-root, vector-ledger, energy, and stability rows. Until then, preserve it as a high-priority branch-family target because it probes whether the middle binary is genuinely acting as the $v=c_f$ hinge between the outer interface layer and the doubled inner self-hit response.

The candidate relation is

$$
n_O=f-1,
\qquad
n_M=f,
\qquad
n_I=f+2,
\qquad
f\in\mathbb Z_{>1},
$$

where $n_O,n_M,n_I$ are integer phase-lock or resonance indices for the outer, middle, and inner layers in the declared branch chart. These indices must not be mistaken for raw speeds. The speed rows remain separate:

$$
s_O=R_O\omega_O<c_f,
\qquad
s_M=R_M\omega_M\approx c_f,
\qquad
s_I=R_I\omega_I>c_f.
$$

The reason this candidate outranks the symmetric relation $(O,M,I)=(f-1,f,f+1)$ is the already populated minimal four-substep scaffold: the clean branch assigns one outer substep, one middle hinge substep, and two equal inner self-hit substeps. The offset $f+2$ is therefore the natural first test for whether the inner layer's extra self-hit burden is a phase-lock or resonance-index echo of the action partition

$$
\Delta I_{\text{outer}}:\Delta I_{\text{middle}}:\Delta I_{\text{inner}}
=
1:1:2.
$$

The exact test is not to impose the offset relation as a premise of the theorem. For each admissible $f$, build a finite candidate family containing both

$$
(n_O,n_M,n_I)=(f-1,f,f+2)
$$

and the symmetric control

$$
(n_O,n_M,n_I)=(f-1,f,f+1).
$$

Each candidate must carry the same retained rows already demanded by this workstream:

1. outer speed row $s_O<c_f$;
2. middle hinge row $\left|s_M-c_f\right|\le\varepsilon_M$;
3. inner self-hit row with accepted same-source roots, positive Jacobian floor, and declared self-root parity;
4. phase-lock rows for every active intra-layer and inter-layer root;
5. scalar and vector action partition rows;
6. energy-frequency row, including declared root-energy, wake-energy, recoil, or transport routing if the clean energy row does not close;
7. post-branch stability row.

First calculation. Insert the two candidate offset families into the existing action-angle energy condition. In the clean no-wake, no-root-energy approximation, compare whether

$$
\omega_{\text{tx}}\hbar
=
\omega_O^\ast\Delta I_{\text{outer}}
+
\omega_M^\ast\Delta I_{\text{middle}}
+
\omega_I^\ast\Delta I_{\text{inner}}
$$

selects the populated minimal value

$$
\omega_\ast
=
\frac{\omega_O^\ast+\omega_M^\ast+2\omega_I^\ast}{4}
$$

more naturally for the $(f-1,f,f+2)$ family than for the symmetric control. If the comparison depends on undeclared wake or root-energy slack, the candidate remains blocked rather than promoted.

Reduced solver probe 2026-06-20. The first executable comparison now lives in [tri-binary-offset-family-runner.mjs](../../../scripts/angular-momentum/tri-binary-offset-family-runner.mjs). It uses the central solver bridge to sample circular source roots, delayed hits, root-ledger details, and circular self-hit spans for both the $(f-1,f,f+2)$ candidate and the $(f-1,f,f+1)$ control. The default report target is `.tmp/angular-momentum-spin/tri-binary-offset-family-solver-report.json`.

The reduced probe supports continued priority work but does not certify the branch. In the `phase-lock` policy, where offsets are treated as integer labels and radii are retuned so the outer, middle, and inner speeds stay sub-field, field-speed, and super-field, both families pass the sampled reduced rows with no inner self-hit span separation. In the diagnostic `index-ratio` stress policy, where speed ratios are mapped to $n_{\ell}/n_M$, both families pass the sampled reduced rows and the $(f-1,f,f+2)$ candidate has the larger inner self-hit span for $2\le f\le8$. This means the candidate remains live because the solver sees the expected stronger inner self-hit burden under the stress mapping, but promotion still requires a retained branch chart with phase, vector-ledger, energy-routing, wake, torque, and stability residuals. The current action-scale subpacket also keeps the middle-hinge route on the priority path: its best route-local scale candidate misses by $1.3999924176888445\times10^{-7}$, and the residual-correction diagnostic rules out quadrature convergence and the tested simple endpoint-leakage scales. The same diagnostic maps the miss to a required wake boundary-charge norm $0.09870019421579312$, gap $1.3613099170139975\times10^{-7}$, and its boundary-charge increment candidate audit reports `boundary_charge_increment_candidates_rejected_target_derived_comparison_only` with zero acceptance-eligible matches among 10 tested rows. The alternate-normalization diagnostic reports `alternate_normalization_shift_candidates_rejected_target_derived_comparison_only`: exactness would require changing the action-kernel margin ratio from $4$ to $3.9999944830507057$, shifting $\eta$ by $3.385162359106908\times10^{-8}$ or the minimum $h_+$ route width by $1.35406307597008\times10^{-7}$, but none of the 11 tested quadrature or endpoint-width candidate rows supplies an acceptance-eligible match. The retained-work / near-field diagnostic reports `retained_work_action_scale_candidates_rejected_target_derived_comparison_only`: 23 finite route-payload rows were tested, zero acceptance-eligible rows matched, and the closest independent route-payload row is `same_source_endpoint_pair_residual_half` at residual magnitude $1.3686468311394084\times10^{-4}$. The coefficient-provenance diagnostic reports `coefficient_provenance_candidates_rejected_target_derived_comparison_only`: exactness would require the `outer->middle` least-norm coefficient to shift by $5.599969670755378\times10^{-7}$, but accepted least-norm solve residuals, accepted row-amplitude residuals, and finite causal-gap Gaussian effects do not supply it; the best independent coefficient-unit row is only $9.470949326781743\times10^{-17}$. That leaves an independent source for the boundary-charge increment, a new normalization derivation beyond the rejected current rows, a new retained-work / near-field law beyond the tested formal route-payload rows, or different exact route-local action-scale law as the next proof target.

The same report now carries a branch-chart projection. It marks `root_chart_reduced`, `active_row_lineage_probe`, `torque_wake_same_row_diagnostic`, `outer_speed`, `middle_hinge`, `inner_self_hit`, `cycle_phase_closure_proxy`, `phase_at_hit_rows`, `self_root_parity_index_proxy`, and `energy_frequency_target` as populated reduced rows, while leaving the retained branch-selection residual blocked: `row_set_identity`, `phase_lock`, `torque_consistency`, `tail_wake_pullback`, `vector_partition_retained`, `energy_routing`, `section_stability`, and `non_minimal_retained_competitors` still lack a retained certificate payload. The selected `index-ratio:f2` $(f-1,f,f+2)$ case remains a candidate-only retained-lineage / phase / torque-wake diagnostic payload: it has same-row force / partition / torque / wake diagnostic row IDs, finite instantaneous torque and diagnostic wake samples, a fixed-receiver time-window torque probe, binary-to-binary path-history roots/hits, replayed root-ledger detail rows, transition classification, inactive-gap margins, retained hit-time coverage, two boundary-only hinge-point candidates, point-event witnesses, point-event admissibility rows, layer-balanced branch-transport incidence rows, and a preferred $\pi/2$ topology branch-transport pair-map. `retainedBranchClaim=false` remains the solver verdict.

The $\pi/2$ middle hinge remains the live hinge point. The middle speed residual is $0$, both pair-map routes run through the middle layer, two of two hinge-chart rows pass with maximum chart residual $0$, and both middle pair-map routes stitch positive-width one-sided root intervals through common root key `2856731379702547500`. It is still fail-closed because one same-source middle route requires compensation, `zeroSlackRetainedChartNoGo=true`, maximum required endpoint compensation norm is $0.6280004778252143$, maximum required phase compensation is $0.4171748331791605$, and exact endpoint transport is not accepted. The latest nested path-history segment-bound diagnostic contains the current endpoint residuals within the 32-segment middle-layer approximation envelope, the endpoint linear-segment convergence diagnostic now populates the finite-segment convergence certificate, and the exact circular endpoint replacement target now shows that exact replacement would clear same-source endpoint transport at residual $5.551115123125783\times10^{-17}$. The reduced circular endpoint-provider law candidate supplies the exact circular layer-clock map with point residual $0$, and the retained endpoint-provider acceptance target now binds it to the same route/root-key row set with `sameRetainedRowSetProviderPass=true` and accepts the local route-authorized endpoint-provider point-event domain as `route_authorized_endpoint_provider_point_event_domain_accepted`. The new global-domain obstruction target reports `route_authorized_endpoint_provider_global_domain_blocked_point_only_common_root_and_compensation`: local endpoint-provider acceptance is true, but the all-pair common-root interval is point-only with no side interval, global retained row-set identity is missing, the same-source route still requires compensation, and `retainedBranchClaim=false`; full retained-branch acceptance or a positive-width common retained time domain remains open.

The positive-width retained-domain lift target now makes the failure mode explicit. `aaa-tri-binary-positive-width-retained-domain-lift-target.v1` reports `positive_width_retained_domain_lift_blocked_all_pair_point_only_and_route_compensation`: both middle routes have positive route-restricted one-sided width, but the all-pair retained-domain side intervals fail because `inner->inner` and `middle->middle` are point-only and the left/right side coverage misses different pair sets. This preserves the hinge packet as a high-priority $(f-1,f,f+2)$ candidate while ruling out immediate promotion from route-local width alone.

The full point-event rule lift target now tests the other side of that fork. `aaa-tri-binary-full-point-event-rule-lift-target.v1` reports `full_point_event_rule_lift_blocked_point_only_identity_and_route_compensation`: candidate point-event admissibility, branch-transport incidence, and topology pair-map support all pass at the $\pi/2$ hinge; the off-diagonal point-torque norm is $2.7755575615628914\times10^{-17}$; and the route root key is the same retained root key `2856731379702547500`. The target stays fail-closed because the branch-transport pair map is not geometrically continuous, zero-slack branch transport is missing, one same-source route still requires compensation, global retained row-set identity is missing, `inner->inner` and `middle->middle` are point-only diagonal identity rows, and retained force, torque, wake, phase, partition, stability, vector-ledger, and energy-routing rows are not certified on that same event.

The diagonal identity rule target now turns those point-only diagonal rows into an explicit tested component instead of a vague blocker. `aaa-tri-binary-full-point-event-diagonal-identity-rule-target.v1` reports `full_point_event_diagonal_identity_rule_candidate_populated_acceptance_blocked`: diagonal identity witnesses are populated for `inner->inner`, `middle->middle`, and `outer->outer`; the first two are point-only; and the `outer->outer` row has positive side width. This means the hinge has a candidate diagonal identity rule at point-event scope, but not an accepted full point-event rule. The remaining blockers are retained-transport and retained-payload blockers: endpoint-provider geometry is still route-authorized local evidence, zero-slack branch transport and global row-set identity are missing, the same-source route requires compensation, and retained payload / energy-routing / full-rule acceptance are absent.

The full point-event payload coverage target now sharpens that blocker. `aaa-tri-binary-full-point-event-payload-coverage-target.v1` reports `full_point_event_payload_coverage_partial_route_wake_energy_carriers_populated_acceptance_blocked`: candidate point-event force/torque evidence, local provider-assisted branch geometry, complete compensated route payload, route-authorized wake boundary-charge pullback, and exact same-event energy carriers are all populated. The target remains fail-closed because accepted $\omega_{\text{tx}}$, derived $\sigma\hbar$ action scale, accepted wake-energy increment law, retained phase / torque / partition / stability payloads, explicit point-only diagonal identity treatment, accepted retained energy routing, and an accepted full point-event rule are still missing.

The exact-endpoint action-scale diagnostic now rejects a tempting shortcut. `aaa-tri-binary-exact-endpoint-provider-action-scale-diagnostic.v1` reports `exact_endpoint_provider_action_scale_candidates_rejected`: the same-source endpoint provider supplies exact circular replacement geometry to residual $5.551115123125783\times10^{-17}$, but its correction norms do not derive the required $\sigma\hbar$ scale. The best endpoint-provider action-scale candidate is the incoming-plus-outgoing correction norm $0.01905412066988491$, with residual magnitude $0.08245070332079805$ against the required $0.10150482399068296$.

The action-scale independent-source exclusion summary now reports `action_scale_independent_source_current_search_exhausted_full_event_rule_or_new_law_required`. The diagnostic excludes eight current candidate families and leaves `acceptedIndependentActionScaleSourcePass=false`, so the remaining $\sigma\hbar$ burden is no longer broad "try more of the same" scalar matching. The next solver pressure is to either write the full point-event rule that handles the point-only diagonal identity rows on the same retained event, or introduce a new independent action-scale law beyond the tested existing scalar, route-local derivation, residual correction, boundary-charge increment, normalization shift, retained-work, coefficient-provenance, and exact-endpoint-provider sources.

The endpoint-provider-assisted branch-transport geometry target now narrows the same-source geometry blocker. `aaa-tri-binary-endpoint-provider-assisted-branch-transport-geometry-target.v1` reports `endpoint_provider_assisted_branch_transport_geometry_populated_sampled_route_compensation_remains`: the same-source route still fails sampled zero-slack geometry, but the accepted exact circular endpoint provider supplies route-authorized replacement geometry with maximum provider-assisted residual $5.551115123125783\times10^{-17}$; the same-receiver route remains sampled zero-slack. This converts the geometry question from "is there exact local endpoint geometry?" to "can route-authorized provider geometry become global retained branch transport with row-set identity, a full point-event rule or positive-width retained domain, and retained force / torque / wake / phase / partition / stability payload rows?"

The global retained-transport lift target now answers that narrowed question for the current rows. `aaa-tri-binary-endpoint-provider-global-retained-transport-lift-target.v1` reports `endpoint_provider_global_retained_transport_lift_candidate_populated_acceptance_blocked`: the same-source provider substitution plus the same-receiver sampled zero-slack route cover all route geometry at candidate scope, but the provider substitution is still route-authorized endpoint-provider evidence, not sampled zero-slack global retained transport. The remaining lift blockers are endpoint-provider route-only scope, missing sampled zero-slack branch route, missing global row-set identity, missing full point-event or positive-width retained-domain acceptance, missing retained payload rows, missing retained energy routing, and missing accepted full point-event rule.

The physical retained provider-transport law target now tests whether that provider substitution can itself become the retained transport law. `aaa-tri-binary-physical-retained-provider-transport-law-target.v1` reports `physical_retained_provider_transport_law_candidate_geometry_populated_global_acceptance_blocked`: the exact reduced endpoint-provider map is populated on the same-source route with residual $5.551115123125783\times10^{-17}$, but `acceptedPhysicalRetainedProviderTransportLawPass=false`. The current evidence is still local route-authorized point-event geometry because it lacks declaration on the global retained row set, full point-event or positive-width common retained-domain support, retained payload rows, retained energy routing, and an accepted full point-event rule.

Route-payload certificate continuation. The runner now adds `aaa-tri-binary-compensated-route-payload-certificate.v1` after the hinge-root branch-route feasibility row. The route carrier still passes as a candidate, and the payload certificate is complete at the route-diagnostic level as `compensated_route_payload_complete_formal_acceptance_blocked`. The populated route fields are `bounded_undeclared_route_slack`, `transport_angular_momentum_increment`, `root_energy_increment`, and `recoil_channel_data`; the maximum unit transport angular-momentum norm is $0.09754069445241503$, the maximum unit-action root-energy increment is $0.4171748331791596$, and the maximum unit recoil angular-momentum norm is $0.09754069445241503$.

Route-local row-amplitude and wake-energy target update. The route-authorized wake diagnostic now accepts the normalized action-kernel wake charge as `normalized_action_kernel_wake_charge_accepted_route_local` with target charge norm $0.09870005808480142$ and residual $0$, accepts the retained crossing-domain pullback as `route_authorized_retained_crossing_domain_pullback_accepted` over two route rows, accepts `aaa-tri-binary-route-local-least-norm-boundary-charge-amplitude-law.v1` with maximum row residual $0$, and sets the wake payload to `wake_payload_boundary_charge_pullback_accepted_wake_energy_law_missing`. The wake-energy target is now `wake_energy_increment_target_action_boundary_derivative_evaluated_action_scale_missing`: it rejects zero wake energy against the nonzero boundary charge, rejects reusing the $0.4171748331791596$ root-energy diagnostic as retained wake energy, rejects treating boundary-charge norm $0.09870005808480142$ as energy without a transaction frequency or accepted action-boundary derivative law, and evaluates the natural $\omega_\ast$-weighted boundary-charge candidate as $0.2714251597332039$ using $\omega_\ast=2.75$ while blocking it because $\omega_\ast$ is not an accepted $\omega_{\text{tx}}$ and the action scale is undeclared. The direct action-boundary derivative target `aaa-tri-binary-action-boundary-wake-energy-derivative-target.v1` now populates all four local $\partial_{t_1}K_{\mathrm{eff}}$ boundary rows, applies the finite-Gaussian endpoint-clearance gauge repair `aaa-tri-binary-finite-gaussian-endpoint-clearance-gauge-repair.v1`, and evaluates the normalized history integral. The derivative target is `action_boundary_derivative_kernel_history_integral_evaluated_action_scale_missing`: maximum route-width endpoint leakage before gauge repair is $0.009460477799001017$, maximum endpoint-clearance residual after gauge repair is $0$, half weighted local boundary derivative sum is $-2.83881740534609$, and half weighted normalized $\partial_{t_1}K_{\mathrm{eff}}$ sum is $-2.6740124169676682$. The new `aaa-tri-binary-action-boundary-wake-energy-law-candidate.v1` row is now `action_boundary_wake_energy_law_candidate_omega_tx_and_scale_law_search_no_simple_candidate_accepted`: it compares that unit-action derivative against $\omega_\ast|\Delta J_{\mathrm{wake}}|=0.2714251597332039$, requires energy orientation $-1$ and positive action-scale factor $0.10150482399068296$ if the $\omega_\ast$ comparison were accepted as the transaction-energy target, and now accepts the required orientation through `aaa-tri-binary-action-boundary-energy-orientation-law-target.v1`. That target evaluates four candidate signs, accepts `route_local_common_sigma_sign=-1` with residual $0$, and marks `negative_action_time_derivative_convention` and `unit_action_derivative_sign` exact but ineligible because they are not independent route-local orientation evidence. `aaa-tri-binary-action-boundary-action-scale-law-search-target.v1` evaluates 37 finite existing scalar candidates, accepts none, and has closest rejected candidate `target_charge_norm` at $0.09870005808480142$ with residual $-0.002804765905881537$ and residual magnitude $0.002804765905881537$. `aaa-tri-binary-action-boundary-action-scale-derivation-target.v1` records the exact required scale row as diagnostic-only, reports `action_boundary_action_scale_derivation_target_measured_scale_populated_route_local_candidates_rejected`, and tests 14 finite route-local candidates from the accepted amplitude/coefficient rows and the action-kernel margin ratio; its best eligible miss is `least_norm_boundary_charge_coefficient_min_abs_over_action_kernel_margin` at $0.10150468399144119$ with residual magnitude $1.3999924176888445\times10^{-7}$. `aaa-tri-binary-action-boundary-action-scale-residual-correction-diagnostic.v1` now reports `action_scale_residual_correction_diagnostic_quadrature_stable_endpoint_candidates_rejected`: 8192-step quadrature leaves residual magnitude $1.3999855889845758\times10^{-7}$, and the tested endpoint-leakage correction scales do not match. Its boundary-charge gap diagnostic maps the miss to a required wake-charge norm $0.09870019421579312$, gap $1.3613099170139975\times10^{-7}$, and its boundary-charge increment candidate audit reports `boundary_charge_increment_candidates_rejected_target_derived_comparison_only`: 10 candidates were tested, zero acceptance-eligible rows matched, and the only exact row is the ineligible remapping of the measured action-scale miss. The residual-correction diagnostic also carries `aaa-tri-binary-action-boundary-alternate-normalization-shift-diagnostic.v1`, which reports `alternate_normalization_shift_candidates_rejected_target_derived_comparison_only`: exactness would require margin ratio $3.9999944830507057$ rather than $4$, or equivalent shifts $\Delta\eta=3.385162359106908\times10^{-8}$ and $\Delta h_+=1.35406307597008\times10^{-7}$, but zero acceptance-eligible quadrature or endpoint-width rows match those shifts. It also carries `aaa-tri-binary-action-boundary-retained-work-action-scale-diagnostic.v1`, which reports `retained_work_action_scale_candidates_rejected_target_derived_comparison_only`: 23 finite retained-work / near-field rows were tested, zero acceptance-eligible rows matched, and the closest independent route-payload candidate is `same_source_endpoint_pair_residual_half` at $0.1016416886737969$, residual magnitude $1.3686468311394084\times10^{-4}$. It now also carries `aaa-tri-binary-action-scale-coefficient-provenance-diagnostic.v1`, which reports `coefficient_provenance_candidates_rejected_target_derived_comparison_only`: exactness for the best row requires coefficient magnitude $0.40601929596273184$ rather than $0.40601873596576477$, with equivalent required shifts in signed $\Delta\eta$, row amplitude, common coupling, target charge, inferred column, and $N_{zz}$, but accepted least-norm solve residuals, row-amplitude residuals, and finite causal-gap Gaussian effects all reject as sources. `aaa-tri-binary-omega-tx-law-search-target.v1` evaluates 15 finite transaction-frequency candidates, accepts none, and now reports `omega_tx_law_search_minimal_branch_frequency_certificate_formal_acceptance_blocked`: the clean weighted $\omega_\ast=(\omega_O+\omega_M+2\omega_I)/4=2.75$ identity remains ineligible as the comparison target, while `aaa-tri-binary-minimal-branch-transaction-frequency-certificate-target.v1` proves the reduced four-substep candidate $\omega_{\text{tx}}^{(4)}=2.75$ with residual $0$ but blocks acceptance on geometrically continuous branch transport and accepted retained branch/event domain. `aaa-tri-binary-same-event-energy-routing-target.v1` now reports `same_event_energy_routing_target_minimal_branch_boundary_candidate_formal_acceptance_blocked`: the minimal-branch frequency boundary-charge row and the scaled action-boundary derivative row both hit $\Delta E_{\mathrm{wake}}=0.2714251597332039$ with residual $0$, but accepted $\omega_{\text{tx}}$, derived $\sigma\hbar$ action scale, and accepted wake-energy law are still missing. `aaa-tri-binary-omega-same-event-dependency-diagnostic.v1` reports `omega_same_event_dependency_carrier_populated_retained_event_blockers_remain`: both exact same-event carrier rows are populated, so the frequency-certificate side is no longer blocked on carrier population, but it remains blocked on geometrically continuous branch transport, accepted retained branch claim, and global retained point-event rule or positive-width common retained time domain. The nested same-source emission-clock transport diagnostic reports `same_source_emission_clock_transport_chart_exact_endpoint_residual_blocked`: chart transport residual is $5.551115123125783\times10^{-17}$, while endpoint advection residual $0.00022316007514149727$ and maximum endpoint-to-emission-chart residual $0.009607165803389037$ keep endpoint transport unaccepted. The closest eligible rejected frequency candidate remains `outer_inner_angular_velocity_mean` at $2.5$ with residual $-0.25$. The next executable target is therefore not quadrature convergence, endpoint repair, current least-norm residuals, current row-amplitude residuals, finite causal-gap Gaussian effects, currently populated scalar matching, tested alternate-normalization shifts, currently populated retained-work route-payload scalars, same-event carrier population, or middle-chart clock/phase transport, but retained acceptance of the exact four-substep transaction-frequency certificate or an alternate nontrivial $\omega_{\text{tx}}$ law, plus endpoint/path-history transport acceptance for the same-source route, an independent source for the boundary-charge increment, a new normalization derivation, a new retained-work / near-field law, or different exact route-local action-scale law that closes the remaining action-scale residual on the same route-authorized retained event.

Same-source endpoint-residual disposition. The same-source emission-clock transport diagnostic remains `same_source_emission_clock_transport_chart_exact_endpoint_residual_blocked`, so no retained transport law is accepted. Its nested path-history segment-bound diagnostic now reports `same_source_path_history_segment_error_bound_contains_endpoint_residuals`: the 32-segment middle-layer bound $0.009607359799384785$ and double bound $0.01921471959876957$ contain the endpoint advection, endpoint-to-chart, and endpoint-pair versus chart-chord residuals. The nested endpoint linear-segment replay diagnostic now reports `same_source_endpoint_linear_segment_replay_identifies_linearization_error`: both sampled source endpoints replay as finite 32-segment interpolation points with maximum replay residual $4.775249788392736\times10^{-16}$, while their residual against exact circular replay is the segment interpolation error. Its nested convergence diagnostic reports `same_source_endpoint_linear_segment_convergence_certificate_populated`: segment counts $16,32,64,128,256$ decrease the maximum linear-to-exact circular residual from $0.028600000511357693$ to $0.00015042504896734804$, match the 32-segment residual, and keep all rows within shrinking segment-error bounds. Its exact circular endpoint replacement target reports `same_source_exact_circular_endpoint_replacement_target_populated_formal_acceptance_blocked`: replacing sampled endpoints with exact circular middle-chart endpoints clears advection to $5.551115123125783\times10^{-17}$ and endpoint-pair residual versus chart chord to $0$, while requiring endpoint corrections $0.009446954866495872$ incoming and $0.009607165803389037$ outgoing. The nested reduced circular endpoint-provider law candidate reports `same_source_reduced_circular_endpoint_provider_law_candidate_populated_formal_acceptance_blocked`: its provider point residual is $0$, provider advection residual is $5.551115123125783\times10^{-17}$, and the reduced provider parameters are radius $0.5$, angular velocity $2$, and phase-at-epoch $0.39269908169872414$. The same-source emission-clock diagnostic reports aggregate retained endpoint-provider acceptance as `same_source_retained_endpoint_provider_accepted`, and its retained endpoint-provider acceptance target reports `same_source_retained_endpoint_provider_route_authorized_point_event_accepted`: one of one same-source row has the provider on the same route/root-key row set and is accepted under the local route-authorized endpoint-provider point-event domain, with root key `2856731379702547500`, minimum one-sided route width $0.09817477042468115$, and row status `same_source_retained_endpoint_provider_route_authorized_point_event_accepted`. The endpoint-provider row-set task is therefore closed at this local scope, and the new obstruction target explicitly blocks global lift because the all-pair common-root interval is point-only, no common one-sided retained interval exists, one same-source route remains compensation-required, and the retained branch claim is false. The remaining branch task is global retained-branch / full point-event acceptance or positive-width common retained-domain acceptance on that same row set, plus wake, action-scale, and wake-energy closure, not another middle-chart clock/phase explanation, finite-segment convergence proof, row-set-provider search, or unconstrained endpoint correction.

Failure modes:

1. The $(f-1,f,f+2)$ family cannot keep $s_M$ within the middle-hinge tolerance while $s_O<c_f$ and $s_I>c_f$.
2. The inner $f+2$ offset does not correspond to retained self-hit rows with a positive Jacobian floor and the declared separator parity.
3. The symmetric $(f-1,f,f+1)$ control passes all residuals with lower or equal branch-selection cost.
4. Both families pass without a deterministic branch-selection rule, leaving the offset relation branch-dependent rather than theorem-grade.
5. The relation closes only by hiding wake, recoil, transport, or root-energy terms outside the declared event ledger.

## Result 2026-05-12: Ordered Noether-Core Frame For Spinor Closure

This section defines the ordered-frame target only. It does not prove spin-$\tfrac{1}{2}$ behavior. Use it as the spinor closure target until the holonomy calculation is derived from the delayed dynamics.

The dynamics scaffold above uses $\ell\in\{I,M,O\}$ for inner, middle, and outer. The ordered-frame and chirality literature also uses $\{H,M,L\}$, where $H$ is high / inner, $M$ is middle, and $L$ is low / outer. These are two labels for the same three binary roles, not two different triads.

For each ordered layer $a\in\{H,M,L\}$, let $P_a(t)$ be the instantaneous binary plane and let $\hat{\mathbf n}_a(t)$ be the oriented unit normal selected by that binary's circulation. In the ordinary 3D regime the ordered normal triad is non-coplanar:

$$
\det\!\big[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L\big]\ne0.
$$

The candidate ordered Noether swarm frame is the history-lifted object

$$
F_{\text{NC}}(t)=
\big(
\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L;\
\mathcal{G}_H,\mathcal{G}_M,\mathcal{G}_L,\
\mathcal{G}_{HM},\mathcal{G}_{HL},\mathcal{G}_{ML};\
\chi_c
\big).
$$

Here $\mathcal{G}_a$ is the causal-root ledger for layer $a$: active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history over the chosen closure period. The inter-layer ledgers $\mathcal{G}_{ab}$ record delayed exchange roots and phase-lock constraints between binary layers. The branch label $\chi_c$ records ordered core chirality, currently the `HML/HLM` datum, with $Wr_c$ or a multi-component causal-writhe parity as the leading formal candidate.

The configuration-space quotient must remove only genuine gauge redundancy: center-of-mass translation, time-origin choice, smooth phase reparameterization inside a closed root-ledger cell, and small deformations that preserve the ordered layer labels, root ledgers, and chirality branch. It must not quotient away permutations of $H,M,L$, reversal of the oriented normals, or branch-changing causal-root relabelings. With those restrictions, the frame has an $SO(3)$ orientation projection but may carry a two-sheet history lift:

$$
\pi:\widetilde{\mathcal Q}_{\text{NC}}^{\text{ord}}
\to
\mathcal Q_{\text{NC}}^{\text{ord}},
\qquad
\mathrm{fiber}\simeq\mathbb{Z}_2.
$$

The spinor closure target is to show that a physical $2\pi$ rotation closes the base frame but transports the history-lifted state to the opposite sheet, while a $4\pi$ rotation closes both:

$$
\tilde q \xrightarrow{2\pi} -\tilde q,
\qquad
\tilde q \xrightarrow{4\pi} \tilde q.
$$

Equivalently, derive a nontrivial holonomy homomorphism

$$
\mu:\pi_1(SO(3))\cong\mathbb{Z}_2
\to
\mathrm{Aut}(\mathcal{G},\chi_c)
$$

from delayed causal-root transport. If $\mu$ is trivial, the ordered-frame route does not supply fermion spinor closure.

**Theorem target (ordered-frame spinor lift).** Let $\tilde q\in\widetilde{\mathcal Q}_{\text{NC}}^{\text{ord}}$ be a stable ordered-core branch with conserved $\mathcal J_B(\mathfrak H_B)$, and let $\gamma_{2\pi}$ be a physical rotation path whose base-frame projection returns the visible ordered normal triad after $2\pi$. The lift is spinor-like only if there is an involution $\iota$ with $\iota^2=\mathrm{id}$ and $\iota\notin G_{\text{gauge}}$ such that
$$
\pi\!\left(\mathcal T_{\gamma_{2\pi}}\tilde q\right)
=
\pi(\tilde q),
\qquad
\mathcal T_{\gamma_{2\pi}}\tilde q
=
\iota(\tilde q)
\ne
\tilde q,
$$
while the doubled path restores the full lifted state:
$$
\mathcal T_{\gamma_{4\pi}}\tilde q
=
\tilde q.
$$
The nontrivial $2\pi$ lift must act on causal-root ledgers, phase branches, causal-writhe parity, or $\chi_c$ in a way that is not removable by the branch-preserving quotient, and the $4\pi$ restoration must preserve the total angular-momentum functional along the entire path.

If $\mathcal T_{\gamma_{2\pi}}\tilde q=\tilde q$, the ordered frame closes as an ordinary $SO(3)$ object. If $\mathcal T_{\gamma_{4\pi}}\tilde q\ne\tilde q$, the proposed two-sheet lift fails as a fermion spinor closure target.

In the planar alignment limit,

$$
\det\!\big[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L\big]\to0,
$$

the ordered 3D frame leaves the spinor-test domain and should reduce to the $SO(2)$ / $U(1)$ phase branch described in the Planck-alignment and horizon-chirality notes.

## Result 2026-05-14: Provisional Ordered-History Holonomy Model

This pass adds a geometry-first candidate for the spinor closure mechanism. It is not a completed spin proof and does not import spin-$\tfrac{1}{2}$ behavior from quantum mechanics. The candidate claim is narrower: a non-coplanar ordered Noether swarm frame can require $4\pi$ restoration only if the delayed causal-wake history detects the noncontractible $2\pi$ loop of the visible orientation frame and records that detection as a branch-preserving two-sheet history lift.

The geometric reason is the same kind of obstruction as a tethered-frame or belt-holonomy obstruction, but here the tether is not an external analogy. It is the active causal-root and causal-wake history of the Noether swarm. The present ordered normal triad may return after a $2\pi$ rotation, while the delayed roots still remember how the three oriented binary planes, pro/anti branch data, transaction axis, and component-resolved causal-writhe data were transported through the loop.

**Definition (provisional ordered-history sheet).** Fix a stable branch chart $B$ with non-coplanar ordered normals and conserved $\mathcal J_B(\mathfrak H_B)$. Let $\mathcal Q_B^{\text{ord}}$ be the branch-preserving configuration cell whose gauge quotient removes center-of-mass translation, time-origin choice, and smooth phase reparameterization inside the same root-ledger cell, but does not remove ordered layer identity, oriented-normal reversal, causal-root relabeling, or chirality-branch change.

For $q\in\mathcal Q_B^{\text{ord}}$, the ordered normal triad determines a visible orientation

$$
\rho_B(q)\in SO(3)
$$

by applying a fixed ordered-frame extraction to $(\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L)$. The lifted history state is provisionally

$$
\tilde q_B
=
\left(
q,\epsilon_{\text{wake}}
\right),
\qquad
\epsilon_{\text{wake}}\in\mathbb Z_2,
$$

where $\epsilon_{\text{wake}}$ is a provisional wake-history parity, not a new canon term. It is the parity class of the transported causal-wake / causal-root history relative to the transaction axis $\hat{\mathbf a}$ and the ordered component-resolved causal-writhe data

$$
\mathcal{W}_{c}^{\text{core}}
=
\left(
\{Wr_c^a\}_{a\in\{H,M,L\}},
\{Wr_c^{ab}\}_{a<b},
\chi_{HML}^{(c)},
\{s_a^{\text{plane}}\}_{a\in\{H,M,L\}},
s_{\text{axial}},
\Sigma_{\mathrm{WCT}}
\right).
$$

For this provisional parity to be admissible, it must be invariant under every allowed branch-preserving gauge homotopy and change only through a declared branch-changing event: causal-root relabeling, root fold, separator crossing, chirality-branch change, or causal-locus reconnection.

Equivalently, the candidate two-sheet cover is the branch-history cover whose loop holonomy is

$$
\eta_B:
\pi_1(\mathcal Q_B^{\text{ord}},q_0)
\longrightarrow
\mathbb Z_2,
\qquad
\mathcal T_\gamma(q_0,\epsilon)
=
\left(q_0,\epsilon+\eta_B([\gamma])\right).
$$

The spinor-like condition is the equality

$$
\eta_B([\gamma])
=
\left[\rho_{B\ast}([\gamma])\right]_{\mathbb Z_2},
$$

where the right-hand side identifies $\pi_1(SO(3))$ with $\mathbb Z_2$. Thus a physical path $\gamma_{2\pi}$ whose visible orientation projection is the generator of $\pi_1(SO(3))$ must satisfy

$$
\eta_B([\gamma_{2\pi}])=1,
\qquad
\eta_B([\gamma_{2\pi}\ast\gamma_{2\pi}])=0.
$$

The second equation is the $4\pi$ restoration condition.

**Lemma (provisional belt-holonomy obstruction).** Suppose a stable ordered-core branch $B$ admits the map $\eta_B$ above, and suppose $\epsilon_{\text{wake}}$ is not removed by $G_{\text{gauge}}$. Then a $2\pi$ physical rotation of the visible ordered frame transports $\tilde q_B$ to the opposite history sheet, while the doubled $4\pi$ path restores the full lifted state.

*Proof route.* The ordered normal triad gives an $SO(3)$ orientation projection. A $2\pi$ physical rotation is the nontrivial element of $\pi_1(SO(3))\cong\mathbb Z_2$, so the spinor-like condition gives $\eta_B=1$ on that loop. The lifted transport therefore changes $\epsilon_{\text{wake}}$. Because $\epsilon_{\text{wake}}\notin G_{\text{gauge}}$, this changed sheet is a physical branch-history difference, not a removable coordinate choice. Concatenating the same loop with itself gives the trivial element of $\mathbb Z_2$, so the second transport has $\eta_B=0$ and restores the lifted history. The proof becomes an actual Noether swarm proof only after $\epsilon_{\text{wake}}$ is computed from causal-root continuation and component-resolved causal writhe on a stable branch certificate.

**Counterexample / falsifier.** If the causal-root ledgers and $\mathcal{W}_{c}^{\text{core}}$ are invariant under the generator loop, or if the quotient treats $\epsilon_{\text{wake}}$ as gauge, then $\eta_B([\gamma_{2\pi}])=0$ and the ordered core closes as an ordinary $SO(3)$ object after $2\pi$. Likewise, if the ordered normals become coplanar so that

$$
\det\!\big[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L\big]=0,
$$

the branch leaves the non-coplanar spinor-test domain and the candidate two-sheet ordered-frame lift is not available.

**Exact first proof step.** Extract one stable separated-scale branch certificate and build a $2\pi$ return table. For each active root in $\mathcal{G}_a$ and $\mathcal{G}_{ab}$, continue the root along $\gamma_{2\pi}$, record whether the source / receiver ordering, winding or phase branch, separator history, and component-resolved causal-writhe entry return identically or with odd parity, and verify that $\mathcal J_B(\mathfrak H_B)$ remains conserved along the path. If the table gives a nonzero $\epsilon_{\text{wake}}$ change without branch loss, the first holonomy gate passes; if it returns identically, this geometry route fails for that branch.

### Next Proof Obligations For Spinor Closure

1. **Branch-certificate extraction:** for one stable separated-scale Noether swarm branch, extract $P_a$, $\hat{\mathbf n}_a$, $\mathcal{G}_a$, $\mathcal{G}_{ab}$, $\chi_c$, phase offsets, and the total angular-momentum ledger over a common closure period.
2. **Quotient lemma:** prove that the branch-preserving quotient above has an $SO(3)$ frame projection while retaining any nontrivial history sheet; state exactly which deformations are gauge and which are physical branch changes.
3. **Holonomy calculation:** transport $F_{\text{NC}}$ around a controlled $2\pi$ rotation path and compute the induced action on causal-root ledgers, causal-writhe parity, and phase-closure residuals. The result must come from delayed root transport, not from the usual spinor analogy.
4. **$4\pi$ restoration test:** show that the same transport over $4\pi$ restores the full history-lifted state, not only the visible normal triad. Failure to restore falsifies the proposed lift; restoration after $2\pi$ collapses the target back to ordinary $SO(3)$ behavior.
5. **Angular-momentum compatibility:** show that the history lift preserves the conserved $\mathbf{L}_{\text{tot}}=\mathbf{L}_{\text{mech}}+\mathbf{L}_{\text{wake}}$ ledger and does not hide unbalanced torque in the quotient.
6. **Planar degeneration check:** drive the same branch toward $\det[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L]\to0$ and verify whether the rotation test transitions from $4\pi$ to $2\pi$ return as the configuration reduces toward the planar $SO(2)$ / $U(1)$ branch.
7. **Measurement handoff:** only after the lift is proved, define how an apparatus axis couples to this full ordered-frame ledger to produce the two observed spin outcomes.

### Partition And Spinor Falsifiers

1. **Missing wake term.** A proposed partition is falsified if $C_{\mathbf J}$ or $C_E$ closes only after setting $\Delta I_{\text{wake}}=0$ or $\Delta E_{\text{wake}}=0$ by assumption while the branch torque integral gives a nonzero wake contribution.
2. **Broken vector ledger.** A scalar solution of $C_A$ is rejected if
   $$
   \sum_{\ell\in\{I,M,O\}}
   \Delta\mathbf I_\ell^{\text{mech}}
   +
   \Delta\mathbf L_{\text{tr}}
   +
   \Delta\mathbf L_{\text{wake}}^{\text{core}}
   -
   \Delta\mathbf J_{\text{coupl}}
   \ne
   \mathbf 0.
   $$
3. **Incompatible phase lock.** A candidate $B'$ is rejected if any active branch has
   $$
   \Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t_f;B')
   \not\equiv0\pmod{2\pi}
   $$
   after geometric phase, wake-return delay, and causal-root ledger phase are included.
4. **Unstable post-branch.** A candidate $B'$ is rejected if $\rho(D\mathcal P_{B'})\ge1$, $g_{\text{root}}(B')\le0$, or $g_{\text{phase}}(B')\le0$.
5. **Nonunique branch without selection rule.** A branch-dependent partition is rejected as a theorem if $\left|\mathscr P(B,\Gamma_{\text{coupl}})\right|>1$ and no deterministic $\operatorname{Sel}_B$ is supplied.
6. **Failed $4\pi$ restoration.** An ordered-frame spinor candidate is falsified if the visible frame closes after $2\pi$ but $\mathcal T_{\gamma_{4\pi}}\tilde q\ne\tilde q$, or if $\mathcal T_{\gamma_{2\pi}}\tilde q=\tilde q$ in a branch where spinor closure is required.

### Op-Discussion Hypothesis: Component-Resolved Causal Writhe Bridge

Status: hypothesis from the 2026-05-12 Op-discussion pass, not established doctrine and not yet a canon definition.

The working result is that scalar $Wr_c[\gamma]$ is a strong chirality signal but is probably too compressed to carry all three labels by itself. It can plausibly detect handedness of a single causal self-interaction pattern, but a scalar total can alias or vanish when the tri-binary has multiple role-labeled components, balanced pro/anti pairings, mixed planar rows, or a weak-coupling-triad exposure state that depends on wake geometry rather than only on intrinsic handedness.

The stronger candidate is a component-resolved causal-writhe data set, kept as separate projections rather than collapsed into one sign:

$$
\mathcal{W}_{c}^{\text{core}}
=
\left(
\{Wr_c^a\}_{a\in\{H,M,L\}},
\{Wr_c^{ab}\}_{a<b},
\chi_{HML}^{(c)},
\{s_a^{\text{plane}}\}_{a\in\{H,M,L\}},
s_{\text{axial}},
\Sigma_{\mathrm{WCT}}
\right).
$$

Here $Wr_c^a$ records self-causal writhe on a labeled binary layer, $Wr_c^{ab}$ records cross-component causal writhe / linking on the delayed locus between two labeled layers, $\chi_{HML}^{(c)}$ records the ordered 3D `HML/HLM` chirality candidate, $s_a^{\text{plane}}$ records the planar angular-momentum sign of each layer relative to the chosen exterior normal, $s_{\text{axial}}=\operatorname{sgn}(\mathbf{J}_{\text{net}}\cdot\hat{\mathbf V})$ records the high-velocity axial branch when a translation direction exists, and $\Sigma_{\mathrm{WCT}}$ records which weak-coupling-triad sites are forward-exposed rather than wake-hidden.

This tuple gives the desired non-collapse discipline:

- `pro/anti` should be tested against the ordered 3D causal-writhe / cross-link pattern, especially the `HML/HLM` branch history.
- horizon planar signs should be tested against $\{s_a^{\text{plane}}\}$ and the eight-row `CW/CCW` table, with the two uniform rows treated as endpoint candidates rather than forced identifications with `pro/anti`.
- weak left/right exposure should be tested against $s_{\text{axial}}$ plus $\Sigma_{\mathrm{WCT}}$, because the weak gate depends on forward exposure and wake shielding, not on planar boundary helicity alone.

The labels may collapse only under additional proved conditions: axialization drives $\mathbf{J}_{\text{net}}\parallel\pm\hat{\mathbf V}$, the horizon state relaxes to a uniform planar row, and the same sign choice reliably exposes or hides the weak-coupling triad. Until those three conditions are derived or simulated, the bridge should preserve `pro/anti`, `CW/CCW`, and weak `L/R` as related but distinct readouts.

Missing evidence:

1. Evaluate $Wr_c^a$ and $Wr_c^{ab}$ on controlled pro-swarm and anti-swarm nested shell swarm trajectories to see whether the ordered `HML/HLM` distinction survives smooth deformation and flips only through causal-locus reconnection.
2. Test whether scalar $Wr_c[\gamma]$ aliases distinct ordered cores or balanced pro/anti pairings; if it aliases, require the component-resolved data set before using causal writhe as a spin bridge.
3. In horizon-adjacent simulations, track $\{s_a^{\text{plane}}\}$, $\mathbf{J}_{\text{net}}\cdot\hat{\mathbf V}$, mixed-row lifetimes, and branch persistence after re-expansion.
4. In weak-sector exposure tests, verify whether the same $\Sigma_{\mathrm{WCT}}$ that gates left-handed docking also supplies the CKM overlap domain and reaction-provenance payload.
5. Tie every sign to the conserved history-aware angular-momentum ledger, including $\mathbf{L}_{\text{wake}}$, so the bridge is not merely a kinematic normal-vector convention.

Decision question for Op: Should the next proof pass define the bridge object as component-resolved causal-writhe data first, instead of trying to promote scalar $Wr_c$ as the direct `pro/anti` / planar-sign / weak-exposure identifier?
