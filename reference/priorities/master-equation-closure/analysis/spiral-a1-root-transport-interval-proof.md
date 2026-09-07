# Spiral A1 Root-Transport Interval Proof Packet

Status. Topology diagnostic for the A1 root-transport row at
$$
a_{\mathrm{A1}}=0.204,
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right].
$$
This packet consumes [spiral-a1-root-window-certificate](spiral-a1-root-window-certificate.md), [spiral-a1-restart](spiral-a1-restart.md), and the VP-1 template [spiral-vp1-root-transport-interval-proof](spiral-vp1-root-transport-interval-proof.md). It supplies no canonical action or conservation evidence.

Claim level. Dependent analytic topology contract for the retained A1 chart. The root-transport row is not an independent interval obstruction once the same A1 active root tubes, nonzero active Jacobian floor, positive $b(\theta)$, and velocity-projection convention used in $J$ are certified. It is the differentiated causal-delay identity for the retained root equation. Repository theorem-grade status remains pending until a transmitter-side branch certificate consumes these records with accepted causal wake accounts.

## Fixed A1 Inputs

Use the A1 spiral history
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),
\qquad
p(\theta)=-a\sin\theta,
\qquad
a=0.204,
$$
and
$$
b(\theta)=b_\ast\exp(a(1-\cos\theta)),
\qquad
b_\ast=\frac{7}{2}.
$$
On $I_\ast$, $b(\theta)>0$ strictly. The retained active windows are
$$
P_1=[2.55,2.69],
\qquad
P_2=[4.00,4.34],
\qquad
P_3=[6.78,7.12],
\qquad
S_1=[4.82,5.02].
$$

The partner and self root equations are
$$
F_p(\theta,\Delta)
=
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)},
\qquad
\Lambda_p=\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
and
$$
F_s(\theta,\Delta)
=
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)},
\qquad
\Lambda_s=\sqrt{1+\rho^2-2\rho\cos\Delta},
$$
where
$$
\rho(\theta,\Delta)
=
\exp(a(\cos\theta-\cos(\theta-\Delta))).
$$
The active Jacobians are
$$
J_{12}
=
1+
\frac{b(\theta)\rho}{\Lambda_p}
\left[\sin\Delta-p_0(\cos\Delta+\rho)\right],
$$
$$
J_{11}
=
1-
\frac{b(\theta)\rho}{\Lambda_s}
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right],
\qquad
p_0=-a\sin(\theta-\Delta).
$$
For partner and self roots, the key identity is
$$
\frac{\partial F_p}{\partial\Delta}=-\frac{J_{12}}{b(\theta)},
\qquad
\frac{\partial F_s}{\partial\Delta}=-\frac{J_{11}}{b(\theta)}.
$$
Because $b(\theta)>0$, the A1 active Jacobian floor gives a nonzero $\partial_\Delta F$ row on every retained active tube.

## A1-Specific Dependencies

The root-window packet supplies the retained active chart:

| Label | Equation | Window | Boundary orientation | Active Jacobian support |
| --- | --- | ---: | --- | ---: |
| $P_1$ | $F_p$ | $[2.55,2.69]$ | one decreasing root | $3.68716858750136\le J_{12}\le4.431676467309756$ |
| $P_2$ | $F_p$ | $[4.00,4.34]$ | one increasing root | $-2.3490890666655564\le J_{12}\le-1.5675458135817848$ |
| $P_3$ | $F_p$ | $[6.78,7.12]$ | one decreasing root | $1.262499729917764\le J_{12}\le2.247802759764517$ |
| $S_1$ | $F_s$ | $[4.82,5.02]$ | one decreasing root | $4.178866881884487\le J_{11}\le4.822357388971106$ |

Thus the packet-level active floor may use
$$
\nu_{\mathrm{cert}}^{\mathrm{A1}}=1.20,
$$
with stricter displayed lower endpoint $1.2624997299177638$ on the padded $P_3$ rectangle. The same packet also supplies inactive complement signs, self-coincidence exclusion on $0<\Delta\le1/2$, and finite-memory control below $4\pi$. These rows are dependencies of the root-offset map because they prevent branch exchange, unlisted active roots, and self coincidence inside the declared chart.

## Root-Transport Identity

Let $\alpha$ be one retained active branch with source label $j_\alpha$ and kind $p$ or $s$. Put
$$
\mathbf{R}_\alpha(\theta,\Delta)
=
\mathbf{x}_i(\theta)-\mathbf{x}_{j_\alpha}(\theta-\Delta),
\qquad
L_\alpha(\theta,\Delta)=|\mathbf{R}_\alpha(\theta,\Delta)|,
$$
and
$$
\hat{\mathbf r}_\alpha
=
\frac{\mathbf{R}_\alpha}{L_\alpha}.
$$
On the certified A1 active tubes, $L_\alpha=r(\theta)\Lambda_\alpha>0$ and the root equation is equivalent to
$$
G_\alpha(\theta,\Delta)
\equiv
L_\alpha(\theta,\Delta)-\frac{c_f}{\Omega}\Delta
=0.
$$

By the implicit function theorem, each certified active tube carries a unique $C^1$ root-offset map $\Delta_\alpha(\theta)$ satisfying
$$
F_\alpha(\theta,\Delta_\alpha(\theta))=0,
\qquad
\partial_\Delta F_\alpha(\theta,\Delta_\alpha(\theta))\ne0,
$$
and
$$
\Delta_\alpha'(\theta)
=
-\frac{\partial_\theta F_\alpha}{\partial_\Delta F_\alpha}.
$$
Differentiating the equivalent physical causal-delay equation gives
$$
\hat{\mathbf r}_\alpha\cdot
\left(
\frac{d\mathbf{x}_i}{d\theta}(\theta)
-
\frac{d\mathbf{x}_{j_\alpha}}{d\theta}(\theta-\Delta_\alpha(\theta))
(1-\Delta_\alpha'(\theta))
\right)
=
\frac{c_f}{\Omega}\Delta_\alpha'(\theta).
$$
Since $d\mathbf{x}/d\theta=\mathbf v/\Omega$, define
$$
\beta_{i,\alpha}
=
\frac{\hat{\mathbf r}_\alpha\cdot\mathbf v_i}{c_f},
\qquad
\beta_{j,\alpha}
=
\frac{\hat{\mathbf r}_\alpha\cdot\mathbf v_{j_\alpha}}{c_f},
\qquad
J_\alpha=1-\beta_{j,\alpha}.
$$
Then
$$
\Delta_\alpha'(\theta)
=
\frac{\beta_{i,\alpha}-\beta_{j,\alpha}}{1-\beta_{j,\alpha}},
\qquad
1-\Delta_\alpha'(\theta)
=
\frac{1-\beta_{i,\alpha}}{J_\alpha}.
$$
Equivalently,
$$
J_\alpha(1-\Delta_\alpha'(\theta))-(1-\beta_{i,\alpha})=0.
$$
Using the implicit derivative, the runner-facing residual identity is
$$
1+\frac{\partial_\theta F_\alpha}{\partial_\Delta F_\alpha}
-
\frac{1-\beta_{i,\alpha}}{J_\alpha}
=0,
$$
with division-free equivalent
$$
J_\alpha
\left(
\partial_\Delta F_\alpha+\partial_\theta F_\alpha
\right)
-
(1-\beta_{i,\alpha})\partial_\Delta F_\alpha
=0.
$$

## Sidecar-Ready `root_transport` Row

The row should be recorded as a dependent analytic pass, keyed to the A1 active chart rather than to sampled root data. A sidecar-compatible shape is:

```yaml
root_transport:
  status: analytic_pass_when_dependencies_pass
  candidate:
    a: 0.204
    b_star: 3.5
    theta_interval: [-pi/6, pi/6]
    delta_cert: [1/2, 4*pi]
    active_labels: [P_1, P_2, P_3, S_1]
  retained_windows:
    P_1: {kind: partner, equation: F_p, delta_window: [2.55, 2.69], jacobian: J_12}
    P_2: {kind: partner, equation: F_p, delta_window: [4.00, 4.34], jacobian: J_12}
    P_3: {kind: partner, equation: F_p, delta_window: [6.78, 7.12], jacobian: J_12}
    S_1: {kind: self, equation: F_s, delta_window: [4.82, 5.02], jacobian: J_11}
  identities:
    partner_partial_delta: "partial_Delta F_p = -J_12 / b(theta)"
    self_partial_delta: "partial_Delta F_s = -J_11 / b(theta)"
    implicit_transport: "Delta_alpha' = -partial_theta F_alpha / partial_Delta F_alpha"
    velocity_transport: "1 - Delta_alpha' = (1 - beta_i_alpha) / J_alpha"
    residual: "1 + partial_theta F_alpha / partial_Delta F_alpha - (1 - beta_i_alpha) / J_alpha = 0"
    residual_division_free: "J_alpha*(partial_Delta F_alpha + partial_theta F_alpha) - (1 - beta_i_alpha)*partial_Delta F_alpha = 0"
  dependency_rows:
    active_boundary_signs: spiral-a1-root-window-certificate
    inactive_complement_signs: spiral-a1-root-window-certificate
    self_coincidence_clearance: spiral-a1-root-window-certificate
    finite_memory: spiral-a1-root-window-certificate
    jacobian_floor:
      packet_floor: 1.20
      displayed_lower_endpoint: 1.2624997299177638
  theorem_status_rule:
    pass: all dependency rows pass on the same A1 chart and same projection convention
    blocked: any dependency row is missing, mismatched, or fails
  numerical_audit:
    required_for_theorem: false
    allowed_residuals: [root_transport_residual, root_transport_residual_division_free]
```

Any replacement certificate should not classify this row from sampled roots. If a numerical residual audit is emitted, it is an audit of the analytic dependency row unless the certificate is separately certifying a transported numerical representation of $\Delta_\alpha(\theta)$ with an interval derivative error bound.

## Blockers and Failure Modes

No independent A1 root-transport blocker remains after the active tubes are certified. The row is blocked only by dependency failure or convention mismatch:

- an active window fails to certify exactly one simple root over $I_\ast$;
- $\partial_\Delta F_\alpha$ contains zero, equivalently the active $J_\alpha$ floor closes;
- the replacement certificate mixes root equations, source labels, Jacobian rows, or velocity projections from different branch conventions;
- the self branch touches spatial coincidence, so $L_\alpha=0$ and $\hat{\mathbf r}_\alpha$ is undefined;
- an inactive complement row admits an unlisted partner or self root;
- finite-memory control fails below the declared $4\pi$ horizon;
- sampled or finite-difference $\Delta_\alpha'$ values are promoted as theorem-grade evidence without an outward interval error bound.

## Promotion Decision

Priority capture complete; transmitter-side acceleration rebuild completed in [spiral-a1-restart](spiral-a1-restart.md). The A1 root-transport identity is not ready for authored corpus promotion as an isolated result because outward signed-playback intervals, radial and tangential aggregates, and accepted causal wake accounts remain open.
