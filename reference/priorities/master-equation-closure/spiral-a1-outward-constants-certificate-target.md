# Spiral A1 Outward-Constants Certificate Target

Status. Receiver-normal restart target for `a1_outward_constants_handoff` and
the A1 branch of `spiral_branch_chart_test`. Outward constants are closure
evidence only when they carry same-box receiver-normal branch strength. This
packet exists to rebuild the target with same-box $D_t/D_s$ bounds. It consumes
[spiral-a1-second-variation-remainder-bound](spiral-a1-second-variation-remainder-bound.md),
[spiral-a1-radial-transport-jet-report](spiral-a1-radial-transport-jet-report.md),
and the retained A1 row set in
[spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json). It does
not edit the executable runner, sidecar rows, generated reports, priority queues
outside this bucket, or authored AAA prose.

Claim level. Candidate restart target only. This packet turns the retained A1
topology row set into a receiver-normal outward-constants contract. It does not
prove A1 finite-collar obstruction, does not identify a finite-amplitude repair
channel, and does not certify a branch.

## Retained Row Set

The certificate must use the same retained A1 row set throughout:

$$
a_{\mathrm{A1}}=0.204,\qquad b_\ast=7/2,\qquad
I_c=[0,0.02],
$$

with active labels

$$
\mathcal L_{\mathrm{A1}}=\{P_1,P_2,P_3,S_1\}
$$

and retained windows

| Label | Retained window $W_\alpha$ |
| --- | --- |
| $P_1$ | $[2.55,2.69]$ |
| $P_2$ | $[4.00,4.34]$ |
| $P_3$ | $[6.78,7.12]$ |
| $S_1$ | $[4.82,5.02]$ |

The retained fixed A1 sidecar rows still supply the pointwise retained root
ledger, inactive-gap row, source-speed Jacobian floor, and finite-memory row.
Their radial-turn, weighted tangential-drive, and exact
tangential-compatibility rows are invalid as force/action evidence under the
receiver-normal Master EOM until each retained label has same-box $D_t/D_s$
bounds. They do not certify the nonconstant finite collar. The present target
starts only after the receiver-normal branch table, endpoint-slope-cancelled
retained profile, and tangential transport have been selected.

## Admissible Perturbation Class

Let $x=-\theta$ on the retained past collar $0\le x\le\Delta_R$, with
$\Delta_R=\Delta_{P_3}$. Let $q_0$ be the endpoint-slope-cancelled retained
past profile. A homogeneous perturbation is

$$
q_p(x)=q_0(x)+(Np)(x),
\qquad p\in\mathbb R^m,
$$

where the columns of $N$ span the homogeneous retained rows. For a declared
radius $b$, the certificate class is

$$
\mathcal A_b^{\mathrm{A1}}
=
\left\{
p:\|p\|\le b,\ p\text{ satisfies the rows below, and the retained }3+1
\text{ ledger persists on }I_c
\right\}.
$$

The locked homogeneous rows are

$$
h_p'(0)=0,\qquad
h_p(\Delta_\alpha)=0,\qquad
\int_0^{\Delta_\alpha}h_p(x)\,dx=0
\quad(\alpha\in\mathcal L_{\mathrm{A1}}),
$$

$$
h_p'(\Delta_R)=0,\qquad h_p''(\Delta_R)=0,\qquad
\sum_{\alpha\in\mathcal L_{\mathrm{A1}}}C_\alpha h_p'(\Delta_\alpha)=0.
$$

The last row keeps the sampled endpoint-slope cancellation locked. The
certificate may use the ladder radii

$$
b\in\{0.001,0.003,0.01,0.03\},
$$

but no radius passes until all admissibility and outward-constant rows below
are certified on the same boxes.

## Required Outward Constants

The certificate must report the following constants outward, not sampled:

| Constant | Meaning | Current status |
| --- | --- | --- |
| $q_{\min},q_{\max}$ | Lower and upper bounds for $q_p$ on the past collar and transported $Q_p$ on $I_c$. | Sample convention only: $0.2\le q_p,Q_p\le3.0$. |
| $\kappa_\alpha$ | Seed-root clearance from $\Delta_{\alpha,0}(\theta)$ to the endpoints of $W_\alpha$. | Not outward on the endpoint-slope-cancelled finite collar. |
| $\nu_\alpha$ | Source-speed Jacobian floor on $I_c\times W_\alpha$. | Fixed-history sidecar has a floor; nonconstant finite-collar class needs its own outward row. |
| $D_{t,\alpha}^{-},D_{t,\alpha}^{+}$ | Receiver-normal bounds $c_f-\hat{\mathbf r}_\alpha\cdot\mathbf v_i$ for the action/wake-history receiver-normal factor on $I_c\times W_\alpha$. | Newly required for action-ready rows; absent for current A1 outward constants. |
| $g_P,g_S$ | Partner and self inactive-complement gaps on the finite collar. | Fixed-history sidecar has gaps; nonconstant class needs its own outward row. |
| $H_b$ | Past-profile perturbation envelope on $[-\Delta_R,0]$. | Algebraic target from $N$ and $b$, not yet outward-certified with positivity. |
| $E_Q^+(b)$ | Transported future-profile envelope on $I_c$. | Conditional on branch-sum and transport bounds. |
| $E_{\Delta,\alpha}(b)$ | Retained-root offset envelope inside $W_\alpha$. | Conditional on $q_{\min}$, $\nu_\alpha$, and memory-segment envelopes. |
| $C_T^-,C_T^+,C_B^-,C_B^+$ | Finite-amplitude branch-sum envelopes for $T_Q$ and $B_Q$. | Formula staged; outward summand derivative boxes not yet supplied. |
| $E_T^{(1)},E_B^{(1)}$ | First-variation branch-sum envelopes. | Not outward. |
| $E_T^{(2)},E_B^{(2)}$ | Second-variation branch-sum envelopes. | Not outward. |
| $K_Q,K_Q^{(1)},K_Q^{(2)}$ | Tangential-transport Gronwall constants for finite-amplitude, first-variation, and second-variation bounds. | Conditional on branch-sum constants. |
| $C_1,C_2$ or $E_\ast(b)$ | Residual-envelope constants for $\mathcal R_R^{\mathrm{tr}}(\theta;p)-\mathcal R_R^{\mathrm{tr}}(\theta;0)$. | Sample ladder only; not stable or outward. |

All constants must be emitted for the same radius $b$, the same collar boxes
$\Theta_i\subset I_c$, the same active windows $W_\alpha$, and the same inactive
complement cover. A row computed on different boxes is diagnostic-only. If the
certificate is consumed as an action or wake-history row, the same-box family
must also bind the receiver-normal factor
$$
\frac{ds_\alpha}{d\theta}
\quad\text{or equivalently}\quad
\frac{ds_\alpha}{dt}
=
\frac{c_f-\hat{\mathbf r}_\alpha\cdot\mathbf v_i}
{c_f-\hat{\mathbf r}_\alpha\cdot\mathbf v_j}
$$
for each retained label, or else state why the event-local force row is being
used without action-rate promotion.

## Pass Conditions

Let

$$
R(p)=\mathcal R_R^{\mathrm{tr}}(\theta;p),
$$

sampled or boxed over the collar rows under test. The obstruction row needs an
outward base-residual lower bound

$$
\rho_\ast\le \|R(0)\|_\infty
$$

on at least one declared collar row or interval box. The current sampled
degree-18 endpoint-slope-cancelled ladder has

$$
\|R(0)\|_\infty\approx2.108902635160094\times10^{-4},
$$

so the one-percent material-improvement floor used by the diagnostics is

$$
\Delta_{\mathrm{mat}}\approx2.108902635160094\times10^{-6}.
$$

A material obstruction certificate at radius $b$ passes only if all
admissibility rows pass and either

$$
C_1b+\frac12C_2b^2\le \Delta_{\mathrm{mat}}<\rho_\ast
$$

or the direct finite-amplitude envelope satisfies

$$
E_\ast(b)\le \Delta_{\mathrm{mat}}<\rho_\ast.
$$

A theorem-grade obstruction for the declared class replaces the material floor
by the stronger strict inequality

$$
C_1b+\frac12C_2b^2<\rho_\ast
\qquad\text{or}\qquad
E_\ast(b)<\rho_\ast.
$$

The sampled ladder currently suggests the scale

$$
C_{1,\mathrm{samp}}\approx5.46\times10^{-12},\qquad
C_{2,\mathrm{samp}}\approx6.61\times10^{-4},
$$

with material-floor ratios below $0.141$ through $b=0.03$. Because the sampled
$C_2$ estimate changes by about $0.731$ between adjacent amplitudes, these
numbers are not accepted constants.

## Status Rows

| Row | Required output | Status now |
| --- | --- | --- |
| `admissible_profile_bounds` | Outward $q_{\min},q_{\max},H_b,E_Q^+(b)$ on past and future collar. | `blocked_pending_outward_bounds` |
| `retained_root_persistence` | Outward $\kappa_\alpha,\nu_\alpha,E_{\Delta,\alpha}(b)$ and proof that roots stay in $W_\alpha$. | `blocked_pending_outward_bounds` |
| `inactive_gap_persistence` | Outward no-root cover with $g_P>0$ and $g_S>0$ after perturbation. | `blocked_pending_outward_bounds` |
| `branch_sum_constants` | Outward $C_T^-,C_T^+,C_B^-,C_B^+$ and first/second variation envelopes. | `blocked_pending_summand_derivative_boxes` |
| `transport_constants` | Outward Gronwall constants $K_Q,K_Q^{(1)},K_Q^{(2)}$ on the same boxes. | `conditional_on_branch_sum_constants` |
| `residual_envelope` | Outward $C_1,C_2$ or $E_\ast(b)$ on the same boxes. | `sampled_unstable_only` |
| `obstruction_or_channel_decision` | Pass/fail comparison against $\rho_\ast$ and $\Delta_{\mathrm{mat}}$. | `blocked_pending_outward_constants` |

## First Failure Modes

The first failed row determines the next mathematical packet:

1. `positivity_loss`: $q_{\min}$ cannot be kept positive on the declared class.
   The next packet must shrink or redesign $\mathcal A_b^{\mathrm{A1}}$.
2. `root_window_escape`: some $E_{\Delta,\alpha}(b)\ge\kappa_\alpha$ while
   denominators remain bounded. The next packet targets root migration, not
   branch-sum algebra.
3. `inactive_root_birth`: an inactive complement gap cannot stay sign-separated.
   The next packet must enlarge the retained ledger or reject the class.
4. `jacobian_floor_loss`: some $\nu_\alpha$ cannot be kept positive. The next
   packet targets the source-speed denominator, not radial residual reduction.
5. `transport_exit`: tangential transport leaves $[q_{\min},q_{\max}]$ or loses
   well-posedness before $\theta_c$. The next packet targets the transport
   envelope.
6. `small_gain_failure`: branch-sum feedback prevents a closed bound for
   $E_Q^+(b)$. The next packet must sharpen branch-sum derivative boxes or use
   direct interval propagation.
7. `residual_envelope_too_large`: admissibility passes but
   $C_1b+\frac12C_2b^2$ or $E_\ast(b)$ exceeds the obstruction threshold because
   of a named branch-sum, transport, or force-ratio term. This is the first
   legal finite-amplitude channel candidate.
8. `sampled_noise_only`: the only large terms come from unstable
   finite-difference or second-difference diagnostics without analytic-tangent
   agreement. The next packet must replace the diagnostic, not search along
   those columns.

## Minimal Executable Smoke 2026-06-28

The full default sampled ladder remains too expensive for rapid inner-loop
certificate work because repeated retained-root bisection dominates each
candidate transport. A reduced deterministic smoke therefore uses the
finite-collar knobs directly:

Operational note. The finite-collar remainder diagnostic rebuilds its objective
arguments from `--finite-collar-samples`,
`--finite-collar-integration-panels`, `--finite-collar-transport-steps`, and
`--finite-collar-delta-steps`. Lowering only the outer `--theta-samples`,
`--integration-panels`, or `--transport-steps` flags does not make the
certificate-adjacent ladder a fast smoke, because the analytic tangent and
candidate-vector loops still call the finite-collar objective settings.

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.02 --delta-steps 256 --integration-panels 32 --profile-mode tangential_transport --transport-steps 40 --past-profile endpoint_slope_cancel --endpoint-cancel-positivity-samples 201 --diagnostic-mode finite_collar_remainder_constants_ladder --finite-collar-samples 3 --finite-collar-integration-panels 16 --finite-collar-transport-steps 16 --finite-collar-delta-steps 128 --finite-collar-positivity-samples 101 --finite-collar-remainder-ray-count 1 --finite-collar-second-order-steps 0.01,0.02 --finite-collar-remainder-radii 0.001,0.003,0.01
```

The smoke reports

$$
\|R(0)\|_\infty\approx5.043133339652168\times10^{-3},
\qquad
C_{1,\mathrm{samp}}\approx1.0080330167277282\times10^{-9},
\qquad
C_{2,\mathrm{samp}}\approx1.6920762560199143\times10^{-4},
$$

with a one-coordinate ray, two amplitudes, and

$$
\max\frac{|\Delta C_2|}{|C_2|}\approx0.7060743371539325.
$$

The resulting classification is still
`sampled_remainder_constants_unstable`. The small radius ladder remains below
the smoke material floor at the sampled level, but the boolean obstruction
support is false because $C_2$ is unstable. This row is therefore useful only as
a turnaround smoke and not as evidence for any outward constant, obstruction
certificate, or admissible channel.

This adds one operational constraint to the certificate target: future runner
work should preserve a fast smoke mode that reports the same decision fields as
the full ladder, while the certificate-grade path must still emit outward
profile, retained-root, inactive-gap, branch-sum, transport, and residual
constants on the same boxes.

## Current First-Failure Reading 2026-06-28

The reduced smoke does not apply the full certificate ladder because it does
not emit outward profile, retained-root, inactive-gap, branch-sum, and
transport boxes. The current failure reading is therefore split by scope:

| Scope | First unresolved row | Current reading |
| --- | --- | --- |
| Certificate-grade A1 ladder | `admissible_profile_bounds` | No outward $q_{\min},q_{\max},H_b,E_Q^+(b)$ row has been certified on the retained A1 boxes. The obstruction/channel comparison is not yet legal. |
| Reduced finite-collar smoke | `sampled_noise_only` | The sampled residual ladder reports `sampled_remainder_constants_unstable`; its $C_2$ variation is diagnostic noise for certificate purposes, not an outward residual envelope. |
| Promotion gate | `blocked_pending_outward_constants` | The A1 handoff remains priority-only until the same boxes carry admissibility, root/gap persistence, branch-sum, transport, and residual-envelope constants plus the pass/fail comparison. |

### Next Evidence Object: `a1_admissible_profile_bounds/v0`

The next evidence object is a single-radius outward admissibility packet, not
another sampled residual ladder. It must use one declared $b$, the retained A1
row set, the same $\Theta_i\subset I_c$ boxes, the same active windows
$W_\alpha$, and the same inactive-complement cover used by the later root/gap
and residual rows.

| Field | Required content | Closure effect |
| --- | --- | --- |
| Row identity | `b`, $\Theta_i$, $W_\alpha$, inactive-cover id, retained row-set path, and source commit or artifact hash. | Prevents mixing diagnostic rows from different boxes. |
| Past-profile bounds | Outward $q_{\min},q_{\max},H_b$ for $q_p$ on $[-\Delta_R,0]$. | If $q_{\min}\le0$, classify the first failure as `positivity_loss`. |
| Future-profile admissibility | Outward $q_{\min},q_{\max}$ for transported $Q_p$ on $I_c$, plus the emitted or explicitly missing ingredients needed for $E_Q^+(b)$. | If transport leaves the declared bounds before $\theta_c$, classify `transport_exit`; if the bound cannot close because branch-sum feedback is missing, leave `branch_sum_constants` as the next blocked row. |
| First-failure statement | One of `positivity_loss`, `transport_exit`, `small_gain_failure`, or `admissible_profile_bounds_passed_to_root_gap_rows`, with the failed inequality named. | Passing this object only permits retained-root and inactive-gap persistence work; it does not certify obstruction, channel existence, or A1 closure. |

A sampled finite-collar smoke may be cited only as diagnostic context for this
object. It cannot supply any field above unless the value is outward-certified
on the declared boxes.

Current attempt artifact:
[spiral-a1-admissible-profile-bounds.v0.json](spiral-a1-admissible-profile-bounds.v0.json)
records the current fail-closed packet for $b=0.001$. The executable diagnostic
mode is:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.02 --delta-steps 128 --integration-panels 16 --profile-mode tangential_transport --transport-steps 16 --past-profile endpoint_slope_cancel --endpoint-cancel-positivity-samples 101 --diagnostic-mode a1_admissible_profile_bounds_attempt --finite-collar-samples 3 --finite-collar-integration-panels 16 --finite-collar-transport-steps 16 --finite-collar-delta-steps 128 --finite-collar-positivity-samples 101 --admissible-profile-bernstein-depth 12
```

The source-identity payload that binds the endpoint-slope-cancelled
perturbation to that packet is emitted by the sibling diagnostic mode:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/spiral_a1_finite_memory_transport.py --theta-hi 0.02 --delta-steps 128 --integration-panels 16 --profile-mode tangential_transport --transport-steps 16 --past-profile endpoint_slope_cancel --endpoint-cancel-positivity-samples 101 --diagnostic-mode a1_endpoint_slope_cancel_source_identity --finite-collar-samples 3 --finite-collar-integration-panels 16 --finite-collar-transport-steps 16 --finite-collar-delta-steps 128 --finite-collar-positivity-samples 101 --admissible-profile-bernstein-depth 12
```

The sampled seed and transported $Q$ values stay inside the declared
$0.2\le Q\le3.0$ convention on this grid, and the retained rows replay with no
sampled retained-window failure. The packet now also emits a local
exact-rational subdivided-Bernstein certificate for the past
endpoint-slope-cancelled polynomial and a local exact-rational node-extrema
certificate for the emitted future piecewise-linear transport profile:

| Past-profile quantity | Current local certificate |
| --- | --- |
| $q_{\min}$ | `0.6542907922493042` |
| $q_{\max}$ | `1.536808073607694` |
| $H_b$ | `0.5368080736076938` |

| Future emitted profile quantity | Current local certificate |
| --- | --- |
| $Q_{\min}$ | `1.0` |
| $Q_{\max}$ | `1.0152046296486557` |
| Auxiliary $Q'$ interval | `[0.720598851445857, 0.8023571583642308]` |
| Node payload digest | `sha256:4d4183edadf3bd20775d6f1ce8bafa5d74386a1886f014ed13dc3ee64b262951` |

The future certificate is `a1_future_piecewise_linear_profile_box_certificate.v0`.
It has `bounds_emitted_piecewise_linear_profile=true` and
`outward_for_continuous_transport_equation=false`. Its $Q'$ row is explicitly
`auxiliary_transport_derivative_interpolant_not_derivative_of_piecewise_linear_q`,
so it must not be consumed as a derivative certificate for the emitted
piecewise-linear $Q$. These local certificates advance the past-profile and
emitted-profile subrows, but they are not yet a shared interval-box certificate.
The packet now records a deterministic source-identity digest for the
endpoint-slope-cancelled homogeneous perturbation:
`sha256:cba10155d5b54719bf7e4a48f86abd27dcabdca4fe24fd040a67b35e2c7a73b0`.
The digest now has a reproducible source-payload diagnostic, but that payload is
provenance only, with `used_as_certificate=false`; it is not a shared
interval-box certificate. The packet also emits
`shared_interval_box_certificate_target` as a fail-closed contract. Its
coefficient-enclosure subrow now carries a
`float64_nextafter_single_ulp_enclosure` attempt with 42 intervals, but that row
has `used_as_certificate=false` and is not a directed-rounding interval
certificate. The past-profile interval-box subrow now also carries a float64
subdivided-Bernstein attempt with a subdivision-tree digest, plus
`a1_past_profile_interval_box_certificate.v0`, an exact-rational
subdivided-Bernstein float64 `nextafter` local certificate. That local
certificate encloses 61,440 control points over 4,096 subintervals and gives
$q_{\min}=0.6542907922493042$, $q_{\max}=1.536808073607694$, and
$H_b=0.5368080736076938$. It has `used_as_local_certificate=true`, but
`used_as_shared_certificate=false` and `authorizes_outward_certificate=false`.
The future-profile subrow carries the local emitted-profile certificate above,
with certificate digest
`sha256:420d8460230e9dc97463d5dd374c3625f0f8a09b2cbc12fa70c5c685d911f51a`.
It has `used_as_local_certificate=true`, but
`used_as_shared_certificate=false`, `authorizes_outward_certificate=false`, and
does not supply $E_Q^+(b)$ for the admissible class.
The shared target now also emits
`a1_future_continuous_transport_bounds_target.v0` with target digest
`sha256:df8f4fe0cef71edfde0063149ad0cfe4cbc01cd0449f78a646195d19a9e998f9`.
That row binds the same source digest, radius $b=0.001$, $\theta$ interval,
declared $0.2\le Q\le3.0$ bounds, local past-profile certificate digest, and
local future emitted-profile certificate digest to the still-missing
continuous-transport and $E_Q^+(b)$ obligation. It is target-only: it requires
continuous-transport equation interval boxes, future-profile bounds on the same
$\theta$ boxes, an outward $E_Q^+(b)$ bound, a transport Gronwall constant
$K_Q$, and the branch-sum feedback bound. It explicitly rejects
piecewise-linear node extrema, the auxiliary $Q'$ interpolant, and sampled
transport replay as certificate evidence.
The retained-root context now also emits
`a1_retained_root_window_sample_replay.v0` with replay digest
`sha256:f17e6495fa4f91631f26d9b5c8e39dd9573f73b5bf320ab95924452614ed9c5e`.
On the three-point $\theta$ sample grid it reports the retained labels in the
declared order, sampled global `3+1` partner/self root counts, and sampled
minimum retained-window clearance `0.04429899040143903`. This is a
root-window replay only: it has `used_as_certificate=false`,
`bounds_retained_root_interval_boxes=false`, and
`bounds_inactive_cover_interval_boxes=false`.
The same retained-root context now records
`a1_retained_root_window_sign_bracket_sample_replay.v0` with replay digest
`sha256:1fa836595fb7c2450b417e1ecab1c431d2a7af53e128395e704578f640a80d12`.
It verifies 12 sampled endpoint sign brackets over the retained windows, with
sampled minimum endpoint absolute value `0.03165673240831124` and sampled
maximum endpoint absolute value `0.15897364203230846`. This is a sampled
sign-bracket success marker only: it has `used_as_certificate=false`,
`bounds_retained_root_interval_boxes=false`, and
`bounds_inactive_cover_interval_boxes=false`.
The retained-root context also records
`a1_inactive_cover_global_root_exclusion_sample_replay.v0` with replay digest
`sha256:f1bf76712348f952e9e2678dd40ff2047ece37c42b2e8483539aadf8933776be`.
On the same three-point $\theta$ sample grid it reports expected global
partner/self root counts, maps all 12 sampled roots into the retained windows,
and records `sampled_inactive_root_count=0`. This is an inactive-complement
sample replay only: it has `used_as_certificate=false`,
`bounds_retained_root_interval_boxes=false`, and
`bounds_inactive_cover_interval_boxes=false`.
The shared target row now additionally records
`a1_retained_root_inactive_cover_interval_box_target.v0` with target digest
`sha256:63dede344647775adc3afdf507b6664b2fd52173ffb5e713c87b3af524a22618`.
That target binds the same source digest, radius $b=0.001$, and
$0\le\theta\le0.02$ interval to 4 retained-window endpoint-sign obligations,
4 retained-window Jacobian-floor obligations, and 6 inactive-cover no-root
obligations. It is still target-only: it has `used_as_certificate=false`,
`authorizes_outward_certificate=false`,
`bounds_retained_root_interval_boxes=false`, and
`bounds_inactive_cover_interval_boxes=false`.
The directed-rounding backend subrow now carries a digestible backend target,
`a1_directed_rounding_backend_target.v0`, plus
`a1_directed_rounding_backend_self_audit.v0`. The self-audit uses
exact-rational float64 `nextafter` brackets, passes all 7 audited rows with
zero failures, and records the rounding-policy audit trail for the audited
coefficient and Bernstein-control-point rows. It still has
`used_as_certificate=false` and `authorizes_outward_certificate=false`; it is
not a shared interval-box certificate, does not control hardware rounding mode,
and does not certify the shared past/future/root/inactive-cover interval-box
family. The target records the required outward-rounded coefficient rows,
Bernstein subdivision control points, shared past/future/root/inactive-cover
interval-box family, and rounding-mode audit trail for the next
certificate-grade pass. Its current runtime probe now nests
`a1_directed_rounding_runtime_backend_availability_audit.v0` with digest
`sha256:09b744e5acee6172144e093761aa49ea42f69afb2c50f85555e5c662a7c21873`
and status `directed_rounding_runtime_backend_unavailable_fail_closed`.
That availability audit records `float64_nextafter_probe_present=true`, but
`hardware_rounding_mode_control_available=false`,
`shared_runtime_rounding_mode_audit_trail_available=false`, and
`directed_rounding_interval_backend_module_available=false`. Its exact
replacement object is
`a1_directed_rounding_interval_backend_runtime_identity.v0`, which must set
`directed_rounding_backend_target.current_runtime_probe.directed_rounding_backend_available`
true and provide a backend runtime id, build/version digest, rounding-mode
transition-log digest, `source_q_derivative_composition` operation-trace digest,
and shared interval-box-family digest. The nested runtime-identity row now
carries executable absence probe
`a1_directed_rounding_interval_backend_runtime_identity_absence_probe.v0` with
digest
`sha256:12853a3f9a69957dbfa09b8f2837be09e9b61314feb3c88e9e44df93d77d7406`
and status
`directed_rounding_runtime_identity_absence_probe_backend_identity_missing_fail_closed`.
That probe checks candidate backend modules and the current
`spiral_branch_chart_certificate` helpers. It now rejects symbol-only backend
modules unless they expose
`A1_DIRECTED_ROUNDING_RUNTIME_IDENTITY_PROVIDER` with non-null identity fields,
required rounding-mode transition modes, operation rows bound to the backend
runtime id, and a shared interval-box family bound to the same backend runtime.
It finds local interval helpers and float64 `nextafter`, but no backend runtime
id provider, build/version digest provider, rounding-mode transition-log provider,
`source_q_derivative_composition` operation-trace provider, or shared
interval-box-family digest provider. The runtime-identity row has digest
`sha256:1da9412a496d1cdac218185473f5540aca764ae0e59c337709a48ae983b24dc4`
and status
`runtime_identity_absence_probe_executed_backend_identity_missing_fail_closed`;
all five required identity fields remain explicitly absent and the row has
`used_as_certificate=false`.
The shared target row now records local certificates for
`past_profile_interval_box` and `future_transport_interval_box`, a computed
sampled `a1_future_continuous_transport_bounds_attempt.v0`, the target
continuous-transport / $E_Q^+(b)$ obligation object, and a target-only
retained-root / inactive-cover obligation object. The computed attempt consumes
the future node certificate, samples `tangential_transport_derivative` on the 16
transport steps, bounds the piecewise-linear transport defect by
`defect_sup_upper=0.0027421963363138966`, and reports
`integrated_l1_defect_upper=5.109894306984598e-05`. It still has
`outward_for_continuous_transport_equation=false`, `emits_E_Q_plus_b=false`, and
`first_failure=branch_sum_feedback_bound_missing`; it is not a replacement for
summand derivative boxes, $E_Q^+(b)$, or $K_Q$. The packet now also records
`a1_branch_sum_feedback_bound_attempt.v0`, which samples the existing tangent
branch-sum code on 2 nullspace columns across 3 $\theta$ samples for 6 total
rows. That row has `emits_E_Q_plus_b=false`, `emits_K_Q=false`, and
`first_failure=summand_derivative_boxes_absent`, so it narrows the branch-sum
blocker without authorizing an outward certificate. That branch-sum row now
nests `a1_outward_summand_derivative_boxes_target.v0` with target digest
`sha256:e641c41515cdb888c6a100900a37b7d86000d6bfad302eb79111afafc75f4a36` and
status `target_only_outward_summand_derivative_boxes_absent`. The target
requires the retained labels `P_1`, `P_2`, `P_3`, and `S_1` on the same source
digest, $b=0.001$, $\theta$ interval, retained-root boxes, inactive-cover
boxes, and outward summand-derivative boxes. It names the derivative families
for tangential summand partials, radial summand partials, retained-root motion,
and source-profile variation, with `summand_partial_interval_boxes` as the
first missing interval row. Its negative-control policy rejects sampled float64
finite differences as certificate evidence because grid samples, central
float64 partials, sampled root motion, and Simpson memory integrals do not
produce outward intervals on the shared boxes. It keeps
`emits_E_Q_plus_b=false`, `emits_K_Q=false`, and
`authorizes_outward_certificate=false`.
The branch-sum row now also nests
`a1_summand_partial_interval_boxes_negative_control.v0` with negative-control
digest `sha256:5d6453e5d9ef1debe7b455cb254ae0f810713b07c9eb232f04a79744b02b9c14`.
That readout expands `summand_partial_interval_boxes` into 36 label/family
slots over `P_1`, `P_2`, `P_3`, and `S_1`: tangential summand partials,
radial summand partials, retained-root motion, and source-profile variation.
It records 6 sampled branch-sum rows and 24 sampled summand rows, but every
slot fails as `sampled_value_not_outward_interval_box`. The central float64
partials, sampled root motion, sampled source-profile values, and Simpson
memory integrals remain point-sample evidence, so the object has
`satisfies_summand_partial_interval_boxes=false`,
`emits_E_Q_plus_b=false`, `emits_K_Q=false`, and
`authorizes_outward_certificate=false`. This is a priority-only negative
control, not an interval certificate.
A narrower one-slot construction attempt is now nested beside that matrix:
`a1_summand_partial_interval_box_one_slot_construction_attempt.v0` with digest
`sha256:d0e8490e23bba2c4b2df22169ba0bd7ac665b9ee77afe7b74dfc671ccf7ec120`.
It targets only `P_1` / `tangential_summand_partials` /
`partial_T_alpha_partial_delta_alpha` and fixes the intended formula row as
`partial_delta_alpha T_alpha(theta, delta_alpha, q_source_alpha)` with
`theta` and `q_source_alpha` held fixed. The nested
`a1_one_slot_formula_dependency_audit.v0` now has audit digest
`sha256:319a27596db0d3bdadc019e7b84c91380a371a1456b543af57fe4be18bf4cdc4`.
It now nests
`a1_p1_retained_root_delta_alpha_interval_box_attempt.v0` with digest
`sha256:461557ae07eb1669a0e91740e591b413eff4e5a1d85158a0192e5f0fc157bacb`.
That row proposes the local priority-only interval
$\delta_{P_1}\in[2.642787400798279,2.6465010095985613]$, verifies the
sampled `P_1` roots lie inside it, verifies endpoint signs over 16
$\theta$-slabs, and records a positive local `J_partner` floor
`3.7900798832489038`. It is not certificate-grade: it uses a local
past-polynomial-antiderivative plus future piecewise-linear source-memory
integral row, and it is not a shared retained-root, source-profile, or
inactive-cover interval-box certificate. The dependency audit now also nests
`a1_p1_q_source_alpha_interval_box_attempt.v0` with digest
`sha256:133c33f160562f1894db6d686a073aa377994f8614994b8dda03737a446a1a36`.
That row maps the same $\theta\in[0,0.02]$ and local
$\delta_{P_1}$ box to the past-profile source interval
`[-2.6465010095985617,-2.6227874007982783]`, equivalently
`[2.622787400798278,2.646501009598562]` in $x=-\theta$, and uses exact
rational subwindow Bernstein control points to emit the local priority-only
box
`P_1_q_source_alpha_interval_box=[0.9860944162989329,1.0003045214613422]`.
The row encloses 61,440 control points over 4,096 subintervals and has
control-point interval payload digest
`sha256:957743ab45c969f2ee83eece58dbdf64e369482936b6287ad567e08ecc8ee377`.
It has `used_as_local_certificate=true`, but `used_as_certificate=false`,
`used_as_shared_certificate=false`, and
`authorizes_outward_certificate=false`.

Consuming the local retained-root delta box and the local q-source box narrows
the selected-partial formula probe to `partial_T_alpha_partial_delta_alpha` in
`[0.578120456576599,1.0825200208208012]` and records
`partial_delta_J_partner_with_source_q_interval_formula` as locally evaluated.
The selected-slot attempt now emits the named priority-only row
`a1_p1_tangential_summand_partial_interval_row.v0` with row digest
`sha256:c6c106272dae72e9a8102823c59bc82006f5799b4d2b72a49289032f7939cf0d`
and status
`priority_local_P_1_tangential_summand_partial_interval_row_present_shared_audit_missing`.
That row packages the same $\theta$, local `P_1` retained-root
`delta_alpha`, local `P_1` q-source, `J_partner`, and source-theta interval
inputs with the formula interval
`partial_T_alpha_partial_delta_alpha=[0.578120456576599,1.0825200208208012]`.
It records `emits_priority_local_interval_row=true` and
`used_as_local_certificate=true`, but still has
`emits_selected_slot_interval_box=false`,
`satisfies_summand_partial_interval_boxes=false`,
`emits_E_Q_plus_b=false`, `emits_K_Q=false`, and
`authorizes_outward_certificate=false`. Its first failure remains
`shared_directed_rounding_audit_trail_for_source_q_derivative_composition`, with
the first missing shared backend/source-box identity field
`directed_rounding_backend_target.current_runtime_probe.directed_rounding_backend_available`.
The same selected-slot attempt now also records the strongest safe shared-audit
candidate currently available:
`a1_p1_source_q_derivative_composition_shared_audit_candidate.v0` with digest
`sha256:b755c3b9b4438b098510fda8a99db9f03719d6c51ac9e13bdfea95b3c8d895a0`
and status
`local_P_1_source_q_derivative_composition_shared_audit_candidate_present_backend_runtime_identity_missing`.
That candidate packages three fail-closed subrows and now exposes the
`a1_directed_rounding_interval_backend_runtime_identity_absence_probe.v0`
provider-absence artifact directly, including its provider-acceptance rule and
digest `sha256:12853a3f9a69957dbfa09b8f2837be09e9b61314feb3c88e9e44df93d77d7406`.
The operation-trace manifest
candidate `a1_source_q_derivative_composition_operation_trace_manifest.v0` has
digest `sha256:491669640b6a3c053e4375da6936c72f465185e4586022aa2ea9502e6578de5e`
and records the local formula-operation sequence for
`source_q_derivative_composition`; it is not a backend-owned per-operation
rounding trace and it does not fill
`source_q_derivative_composition_operation_trace_digest` in the runtime identity
row. The local shared interval-box-family candidate has digest
`sha256:984a7e4745f8af58fe0af84a1028f7fc4b0e17f4e1e5f21436745455cf7d0764`
and binds the current local `P_1` delta, q-source, control-point, and
summand-partial row digests under the same source digest, radius, and
$\theta$ interval, plus the local retained-root bridge digest
`sha256:9874b7418681498ee81e1ea030cf2aeaebdc9040aae43034d8fad4d482ddefb8`
and local inactive-cover bridge digest
`sha256:12be5929249e2e59d4c6e35ce096dc2c79894c712b4ad4f42977f4e396665f10`;
it does not satisfy the real `shared_interval_box_family_digest` field. The
same-box inactive-cover absence row has digest
`sha256:927b63360d9b8382c00042102fd6c59f54450522cf4239d79bb17959a3e69347`
and records `same_box_inactive_cover_binding_absent` with
`same_box_inactive_cover_binding_present=false`. Its local bridge is
`a1_inactive_cover_interval_box_certificate_bridge.v0`, which signs 384
fixed-A1 sidecar subboxes with minimum signed gap
`0.011837068222509071`, but records
`bounds_selected_finite_collar_inactive_cover_interval_boxes=false` and
`used_as_shared_certificate=false`.
The retained-root bridge is
`a1_retained_root_interval_box_certificate_bridge.v0` with digest
`sha256:9874b7418681498ee81e1ea030cf2aeaebdc9040aae43034d8fad4d482ddefb8`;
it signs the four fixed-A1 active windows with minimum endpoint signed gap
`0.023743565835518284` and minimum absolute Jacobian floor
`0.8201857463114794`, but records
`bounds_selected_finite_collar_retained_root_interval_boxes=false` and
`used_as_shared_certificate=false`.
The dependency audit also nests
`a1_shared_directed_rounding_audit_trail_for_source_q_derivative_composition.v0`
with digest
`sha256:caa4f2ad6d6f91e1f9ee0603d3b5c19f9d75ef3fdf6d75ac7933bfac58f447d4`.
That object checks the selected $\theta$ interval, the local retained-root
`P_1` delta box, the local `P_1` q-source box, the local formula rows, and the
existing directed-rounding backend target/self-audit. It records
`local_readout_present=true` and
`directed_rounding_backend_self_audit_rows_failed=0`, but it is still only a
priority-only readout with `used_as_shared_certificate=false`. Its first
missing shared backend/source-box identity field is
`directed_rounding_backend_target.current_runtime_probe.directed_rounding_backend_available`;
the selected-slot audit also carries the runtime availability audit digest
`sha256:09b744e5acee6172144e093761aa49ea42f69afb2c50f85555e5c662a7c21873`
and names
`a1_directed_rounding_interval_backend_runtime_identity.v0` as the next
required runtime/backend evidence object. The nested runtime-identity row now
records executable absence probe digest
`sha256:12853a3f9a69957dbfa09b8f2837be09e9b61314feb3c88e9e44df93d77d7406`
and still records `backend_runtime_id`, `backend_version_or_build_digest`,
`rounding_mode_transition_log_digest`,
`source_q_derivative_composition_operation_trace_digest`, and
`shared_interval_box_family_digest` as the missing fields. The availability
negative control records that the float64 `nextafter` probe, the passing
self-audit rows, and the sampled partials do not satisfy backend availability,
and that a missing rounding-mode transition log, missing operation-trace digest,
missing shared interval-box-family digest, or mixed backend digest fails closed;
the remaining missing shared fields are the directed rounding mode audit-trail
probe, `P_1_retained_root_delta_alpha_interval_box_attempt.used_as_shared_certificate`,
`P_1_q_source_alpha_interval_box_attempt.used_as_shared_certificate`, and
`P_1_q_source_alpha_interval_box_attempt.past_profile_certificate_used_as_shared_certificate`.
Even with the named row and the shared-audit candidate, the attempt still does
not emit a selected-slot interval box: the first missing dependency row remains
`shared_directed_rounding_audit_trail_for_source_q_derivative_composition`.
The backend row, audit-trail row, named summand-partial row, operation-trace
manifest candidate, interval-box-family candidate, retained-root bridge,
inactive-cover bridge, and inactive-cover absence row remain local fail-closed
readouts, not shared directed-rounding audit trails over shared retained-root,
source-profile, and inactive-cover boxes. They record
the central-float64 `P_1` sampled partials only as rejected diagnostic reference
values, so
`satisfies_selected_slot=false`, `emits_E_Q_plus_b=false`, `emits_K_Q=false`,
and `authorizes_outward_certificate=false`. The selected-slot first failure is
`one_slot_shared_directed_rounding_audit_trail_for_source_q_derivative_composition_missing`.

Coordinator note. The next smallest closure target is a real directed-rounding
runtime identity provider for the `source_q_derivative_composition` path. It
must provide `backend_runtime_id`, `backend_version_or_build_digest`,
`rounding_mode_transition_log_digest`,
`source_q_derivative_composition_operation_trace_digest`, and
`shared_interval_box_family_digest`, with the shared interval-box family bound
to the existing local `P_1` retained-root, q-source, named summand-partial, and
inactive-cover rows. Until those provider fields exist, the current manifest and
box-family digests are candidate-only records. They may only advance the first
branch-sum constant row; they do not certify A1 obstruction, channel existence,
or the outward certificate.

The top-level row identity now carries
`inactive_cover_id=inactive_cover_interval_boxes`, and the shared-box target
now records both `retained_root_interval_boxes` and
`inactive_cover_interval_boxes` under `local_bridge_box_ids_present`, with
`missing_box_ids=[]`. The live same-box blockers are no longer absent cover ids;
they are the absent selected finite-collar same-box retained-root and
inactive-cover bindings. The sampled retained-root replay, sampled sign-bracket
replay, sampled inactive-cover replay, computed transport-defect attempt,
branch-sum feedback attempt, local retained-root bridge, local inactive-cover
bridge, and target-only obligation objects do not turn the row into a shared
certificate. The local past-profile Bernstein certificate and emitted
future-profile certificate are not a shared interval-box certificate because the
retained-root and inactive-cover bridges are local fixed-A1 sidecar evidence
only, hardware directed rounding is not controlled, and the $E_Q^+(b)$ row is
still missing pending branch-sum and transport constants.

The packet now adds `a1_certificate_composition_readiness.v0` with readiness
digest `sha256:d4ec0af77b005042f080f6cd9704c5cf4de67402a898ab375c3893c0ed0d1fff`.
This row composes the local past/future certificate digests with the
continuous-transport target and retained-root/inactive-cover target, then names
the still-missing certificate-grade objects:
`future_continuous_transport_bounds`, `E_Q_plus_b_outward_bound`,
`retained_root_interval_boxes`, `inactive_cover_interval_boxes`,
`branch_sum_constants`, `transport_constants`, and `residual_envelope`. Its
first missing evidence object is
`a1_future_continuous_transport_bounds/v0`; it has
`used_as_certificate=false` and authorizes no outward certificate or
obstruction/channel decision. The branch-sum constants, transport constants,
and residual envelope are also still absent, so the current first failure
remains `admissible_profile_bounds`. The reduced smoke result and retained-root
replay are carried only as diagnostic context with `used_as_certificate=false`.

## Advancement Decision

This packet materially narrows `a1_outward_constants_handoff` from "make the
sampled ladder stable" to the concrete certificate above:

1. keep the endpoint-slope-cancelled homogeneous perturbation class fixed;
2. select a radius $b$ from the ladder or a smaller certified radius;
3. certify admissibility on the retained A1 row set;
4. emit outward branch-sum, transport, and residual-envelope constants on the
   same boxes;
5. classify the outcome as interval obstruction, legal finite-amplitude
   channel, or failed admissibility.

Promotion decision. Priority-only. No master-equation closure, A1 branch
certification, or corpus-facing theorem is claimed until this contract produces
outward constants and a pass/fail comparison on the same A1 boxes.
