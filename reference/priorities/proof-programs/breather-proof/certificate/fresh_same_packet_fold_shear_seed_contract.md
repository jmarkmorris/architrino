# Fresh Same-Packet Fold-Shear Seed Contract

## Scope

This packet freezes the finite fold-shear deformation as the initial-history seed
for the next fresh fold-collocation attempt. It is priority-only. It does not
claim a solved candidate, does not pass the null-coordinate pre-ledger, does not
edit `causal_ledger.json`, does not edit `fold_layer_atlas.json`, and does not
authorize `branch_chart.json`.

Source artifacts:

- `gap_opening_live_fold_shear_input.seed_cosine_residuals.v0.json`
- `gap_opening_live_fold_shear_result.seed_cosine_residuals.v0.json`
- `fold_shear_deformed_candidate.seed_cosine_residuals.v0.json`
- `fold_shear_phase_shift_audit.seed_cosine_residuals.v0.json`
- `fresh_same_packet_fold_shear_seed.v0.json`

## Verdict

The accepted claim level is:

> finite same-packet initial-history seed for the fresh fold-collocation solve,
> not a pre-ledger pass.

The finite fold-shear seed supplies a constructive history direction that opens
the listed residual parent-complement collars in the local matrix. The new
phase-shift audit then moves that seed off the old zero-velocity turning section
and onto an inbound section while preserving the finite null-coordinate gap
calculations under shifted row intervals. The result is still only a seed for a
fresh same-packet solve.

## Packet Identity Contract

The successor attempt should use the contract identity
$$
\mathfrak{I}_{\mathrm{fresh\_shear\_v0}}
=
\left(
\texttt{doubled\_four\_arc\_generic},
T_0,
\mathcal{S}_0,
\mathcal{P},
\mathcal{B}_{\mathrm{fold\_shear}},
\Theta_0
\right),
$$
with
$$
T_0=6.28318530718,
\qquad
\mathcal{P}=(c_f,\eta,\epsilon_c,g)=(1,0.02,0.05,1).
$$

The initial history before section shifting is
$$
X_0(\theta)
=
1.25\cos(2\pi\theta)+\varepsilon H(\theta),
\qquad
\varepsilon=\frac{1}{16}.
$$
The fold-shear witness is
$$
H(\theta)
=
h_{A0}\psi_{A0}(\theta)
+h_{A1}\psi_{A1}(\theta)
+h_{A2}\psi_{A2}(\theta),
\qquad
H(\theta+1/2)=-H(\theta),
$$
with
$$
(h_{A0},h_{A1},h_{A2})
=
(0.433491813815,\ -0.556350501775,\ -1).
$$
For an arc $A=[L_A,R_A]$,
$$
\psi_A(\theta)
=
\sin^2\!\left(\pi\frac{\theta-L_A}{R_A-L_A}\right)
$$
on $[L_A,R_A]$ and is zero outside that arc. The first-half arcs are
$$
A_0=[0,0.14758361765],
\qquad
A_1=[0.14758361765,0.35241638235],
\qquad
A_2=[0.35241638235,1/2].
$$

## Inbound Section Phase Shift

The finite seed preserves the old turning-section velocity. The fresh
fold-collocation target needs an inbound section. Use the shifted history
$$
X_\delta(\theta)=X_0(\theta+\delta),
\qquad
\delta=0.02.
$$
The phase-shift audit records
$$
X_\delta(0)=1.2447644729563,
\qquad
\dot x_\delta(0)=-0.0876176690331297,
$$
so the inbound speed is
$$
v_\ast=0.0876176690331297<c_f.
$$
The shifted separator coordinates are
$$
\sigma_1'=0.12758361765,
\quad
\sigma_2'=0.33241638235,
\quad
\sigma_3'=0.62758361765,
\quad
\sigma_4'=0.83241638235.
$$

The phase shift preserves the finite residual-collar gap calculations when the
source and receiver intervals are shifted together. If
$$
y_\sigma(\theta;X,T)=c_fT\theta+\sigma X(\theta),
\qquad
\sigma\in\{-1,+1\},
$$
then for the shifted candidate
$$
\widetilde y_\sigma(\theta-\delta;X_\delta,T_0)
=
y_\sigma(\theta;X_0,T_0)-c_fT_0\delta.
$$
Therefore every source-minus-receiver null-coordinate difference on a shifted
collar is unchanged.

## Residual-Collar Surplus

The finite surplus law from the local fold-shear matrix is
$$
g_m(\varepsilon)=\varepsilon\lambda_m-\kappa_m.
$$
The threshold for all listed collars is
$$
\varepsilon_{\min}
=
\max_m\frac{\kappa_m}{\lambda_m}
=
0.0515044597755009.
$$
At
$$
\varepsilon=\frac{1}{16}=0.0625,
$$
the generated finite seed records
$$
\min_m g_m(\varepsilon)=0.00106743573978125.
$$
The phase-shift audit preserves that finite surplus for the shifted collar rows.

## Successor Output Contract

The next lawful solver packet must produce fresh artifacts keyed to
`fresh-same-packet-fold-shear-seed-v0` or a deliberately renamed successor
identity:

| Artifact | Required content |
| --- | --- |
| successor `phi_cyc.json` | The shifted fold-shear initial history, section data, basis coefficients, period, parameters, and construction notes. |
| successor `mesh.json` | A shifted separator-refined mesh and ordered subblocks under the same identity. |
| successor `causal_ledger.json` | A null-coordinate pre-ledger generated from the same shifted candidate. |
| successor `causal_preledger_interval_report.md` | A pass/fail interval report proving or rejecting every row as `empty`, `simple_root`, or `fold_layer`. |
| structural-Jacobian packet | The same-packet matrices $B=DC(\mathbf a_0)$ and $A=D\delta(\mathbf a_0)$, plus dynamic residual, fold-integral, and returned-sample targets. |

The stop rule remains unchanged: no branch chart is authorized unless the fresh
null-coordinate pre-ledger has no `split_required` rows and every parent
complement is consumed by an accepted same-packet alternative.

## Capture Decision

Priority-only as a concrete proof-program advance. The finite seed and
phase-shift audit should not be promoted into `content/markdown/aaa` until a
fresh same-packet candidate carries them through the structural Jacobian,
dynamic residuals, fold integrals, and outward-rounded null-coordinate
pre-ledger.
