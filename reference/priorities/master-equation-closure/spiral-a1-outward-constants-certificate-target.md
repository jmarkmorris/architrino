# Spiral A1 Outward-Constants Certificate Target

Status. Priority-only mathematical artifact for `a1_outward_constants_handoff`
and the A1 branch of `spiral_branch_chart_test`. This packet consumes
[spiral-a1-second-variation-remainder-bound](spiral-a1-second-variation-remainder-bound.md),
[spiral-a1-radial-transport-jet-report](spiral-a1-radial-transport-jet-report.md),
and the retained A1 row set in
[spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json). It does
not edit the executable runner, sidecar rows, generated reports, priority queues
outside this bucket, or authored AAA prose.

Claim level. Candidate certificate target only. This packet turns the sampled
finite-collar remainder-constants ladder into a concrete outward-constants
contract. It does not prove A1 finite-collar obstruction, does not identify a
finite-amplitude repair channel, and does not certify a branch.

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

The already accepted fixed A1 sidecar rows supply the pointwise retained root
ledger, inactive-gap row, source-speed Jacobian floor, finite-memory row,
radial-turn row for the prescribed constant-$\Omega$ history, weighted
tangential-drive row, and exact tangential-compatibility rejection. They do not
certify the nonconstant finite collar. The present target starts only after the
endpoint-slope-cancelled retained profile and tangential transport have been
selected.

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
complement cover. A row computed on different boxes is diagnostic-only.

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
The retained-root context now also emits
`a1_retained_root_window_sample_replay.v0` with replay digest
`sha256:f17e6495fa4f91631f26d9b5c8e39dd9573f73b5bf320ab95924452614ed9c5e`.
On the three-point $\theta$ sample grid it reports the retained labels in the
declared order, sampled global `3+1` partner/self root counts, and sampled
minimum retained-window clearance `0.04429899040143903`. This is a
root-window replay only: it has `used_as_certificate=false`,
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
certificate-grade pass.
The shared target row now records local certificates for
`past_profile_interval_box` and `future_transport_interval_box`, but
`retained_root_interval_boxes` and `inactive_cover_interval_boxes` remain
absent. The sampled retained-root replay does not change that missing-box
status. The local past-profile Bernstein certificate and emitted future-profile
certificate are not a shared interval-box certificate because the retained-root
and inactive-cover boxes are still absent, hardware directed rounding is not
controlled, and the continuous transport / $E_Q^+(b)$ row is still absent
pending branch-sum and transport constants. The branch-sum constants, transport
constants, and residual envelope are also still absent, so the current first
failure remains `admissible_profile_bounds`. The reduced smoke result and
retained-root replay are carried only as diagnostic context with
`used_as_certificate=false`.

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
