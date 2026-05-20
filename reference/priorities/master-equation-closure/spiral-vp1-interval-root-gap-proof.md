# VP-1 Interval Root-Gap Proof Packet

Status. Team-agent worker proof packet for the VP-1 active-root interval tubes and inactive complements. This packet uses the fixed VP-1 contract
$$
\Delta_{\mathrm{co}}=\frac{1}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
D_{\mathrm{cert}}=\left[\frac{1}{2},4\pi\right],
$$
with active windows
$$
P_1=[2.48,2.52],
\qquad
P_2=[4.30,4.46],
\qquad
P_3=[6.78,6.92],
\qquad
S_1=[4.80,4.90].
$$

Claim level. Interval proof-packet support for the active-root and inactive-gap rows. The mathematical sign rows below close the root-gap blocker at packet level for the declared fixed tubes. The repository-generated report is still not theorem-grade because these interval rows are not yet emitted by `spiral_branch_chart_certificate.py`, and this worker was not authorized to edit the executable runner or generated report.

Verdict for this lane: `interval-pass packet; runner-integration blocker remains`.

## Equations Used

The packet uses
$$
a=\frac{1}{10},
\qquad
b_\ast=\frac{7}{2},
\qquad
b(\theta)=b_\ast\exp(a(1-\cos\theta)),
$$
$$
\rho(\theta,\Delta)
=
\exp(a(\cos\theta-\cos(\theta-\Delta))),
\qquad
p_0=-a\sin(\theta-\Delta).
$$
The partner root equation is
$$
F_p(\theta,\Delta)
=
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)},
\qquad
\Lambda_p=\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
and the self root equation is
$$
F_s(\theta,\Delta)
=
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)},
\qquad
\Lambda_s=\sqrt{1+\rho^2-2\rho\cos\Delta}.
$$
For interval evaluation near inactive self spatial coincidences, the equivalent nonnegative form
$$
\Lambda_s^2=(1-\rho)^2+2\rho(1-\cos\Delta)
$$
is the stable row; otherwise dependency overestimation can create a false negative lower endpoint for the radicand.

The Jacobians are
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
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right].
$$
Direct differentiation gives
$$
\frac{\partial F_p}{\partial\Delta}=-\frac{J_{12}}{b(\theta)},
\qquad
\frac{\partial F_s}{\partial\Delta}=-\frac{J_{11}}{b(\theta)}.
$$
Since $b(\theta)>0$, a signed Jacobian interval fixes the $\Delta$-monotonicity of the corresponding root equation inside each active tube.

## Finite Interval Cover Used

The interval audit used outward interval arithmetic at 50 decimal digits. The finite covers were:

- boundary sign rows: $1024$ uniform $\theta$ slabs over $I_\ast$;
- active Jacobian tubes: $256$ uniform $\theta$ slabs and $128$ uniform $\Delta$ slabs per active window;
- inactive complements: $256$ uniform $\theta$ slabs and $512$ uniform $\Delta$ slabs per inactive complement interval.

For an inactive complement interval $K=[\Delta^-,\Delta^+]$, the actual checked boxes are
$$
Q_{m,n}=I_m\times K_n,
\qquad
0\le m<256,
\qquad
0\le n<512,
$$
where
$$
I_m=
\left[
-\frac{\pi}{6}+\frac{m\pi}{3\cdot256},
-\frac{\pi}{6}+\frac{(m+1)\pi}{3\cdot256}
\right],
$$
and
$$
K_n=
\left[
\Delta^-+\frac{n(\Delta^+-\Delta^-)}{512},
\Delta^-+\frac{(n+1)(\Delta^+-\Delta^-)}{512}
\right].
$$
No checked interval box contained zero in the rows reported below.

## Active-Tube Sign Rows

The active-root boundary signs are:

| Label | Lower boundary row | Upper boundary row | Orientation |
| --- | ---: | ---: | --- |
| $P_1$ | $\inf_{\theta\in I_\ast}F_p(\theta,2.48)\ge0.004393201551$ | $\sup_{\theta\in I_\ast}F_p(\theta,2.52)\le-0.008533770451$ | decreasing |
| $P_2$ | $\sup_{\theta\in I_\ast}F_p(\theta,4.30)\le-0.008197125043$ | $\inf_{\theta\in I_\ast}F_p(\theta,4.46)\ge0.006244188305$ | increasing |
| $P_3$ | $\inf_{\theta\in I_\ast}F_p(\theta,6.78)\ge0.007355662585$ | $\sup_{\theta\in I_\ast}F_p(\theta,6.92)\le-0.005840782435$ | decreasing |
| $S_1$ | $\inf_{\theta\in I_\ast}F_s(\theta,4.80)\ge0.017879994640$ | $\sup_{\theta\in I_\ast}F_s(\theta,4.90)\le-0.021270473852$ | decreasing |

Thus every fixed tube has a sign change across its two $\Delta$ boundaries for every $\theta\in I_\ast$.

The active Jacobian rows are:

| Label | Interval Jacobian row on $I_\ast\times W_\alpha$ | Certified $|J|$ support |
| --- | ---: | ---: |
| $P_1$ | $4.311082950310\le J_{12}\le4.526483409835$ | $|J_{12}|\ge4.31$ |
| $P_2$ | $-2.032593190175\le J_{12}\le-1.643913704686$ | $|J_{12}|\ge1.64$ |
| $P_3$ | $1.582787874783\le J_{12}\le2.066467009636$ | $|J_{12}|\ge1.58$ |
| $S_1$ | $3.857049109299\le J_{11}\le4.151485504575$ | $|J_{11}|\ge3.85$ |

The conservative Jacobian-floor target usable by the coordinator is therefore
$$
\nu_{\mathrm{cert}}=1.50.
$$
Since the derivative sign cannot change inside any active tube, the boundary sign row and $\partial_\Delta F=-J/b(\theta)$ prove exactly one simple active root in each of $P_1,P_2,P_3,S_1$ for every $\theta\in I_\ast$.

## Inactive Complement Boxes

The inactive complement of the partner active windows in $D_{\mathrm{cert}}$ is
$$
Q_0^p=I_\ast\times[1/2,2.48],
\qquad
Q_1^p=I_\ast\times[2.52,4.30],
$$
$$
Q_2^p=I_\ast\times[4.46,6.78],
\qquad
Q_3^p=I_\ast\times[6.92,4\pi].
$$
The inactive complement of the self active window is
$$
Q_0^s=I_\ast\times[1/2,4.80],
\qquad
Q_1^s=I_\ast\times[4.90,4\pi].
$$

The interval sign rows on the finite box cover are:

| Box | Sign row | Outward support |
| --- | --- | ---: |
| $Q_0^p$ | $F_p>0$ | $\inf_{Q_0^p}F_p\ge0.003077488399$ |
| $Q_1^p$ | $F_p<0$ | $\sup_{Q_1^p}F_p\le-0.006729323291$ |
| $Q_2^p$ | $F_p>0$ | $\inf_{Q_2^p}F_p\ge0.004291281917$ |
| $Q_3^p$ | $F_p<0$ | $\sup_{Q_3^p}F_p\le-0.004676393714$ |
| $Q_0^s$ | $F_s>0$ | $\inf_{Q_0^s}F_s\ge0.017673313426$ |
| $Q_1^s$ | $F_s<0$ | $\sup_{Q_1^s}F_s\le-0.021151428292$ |

Therefore the signed inactive-complement floor for the declared fixed windows is
$$
g_{\mathrm{inactive}}^{\mathrm{VP1}}
\ge
0.0030.
$$
This proves that no unlisted partner or self causal root exists in $I_\ast\times D_{\mathrm{cert}}$ outside the four active windows.

## Excluded Self-Coincidence And Memory Rows

The excluded self-coincidence row is inherited from the inactive-memory packet:
$$
\inf_{\theta\in I_\ast,\ 0<\Delta<1/2}
\frac{|F_s(\theta,\Delta)|}{\Delta}
\ge0.6794678492\ldots>0.
$$
For theorem-grade use, the coordinator should carry the analytic row above, or the rounded target
$$
\frac{|F_s(\theta,\Delta)|}{\Delta}\ge0.67,
$$
rather than the sampled-only $0.70$ target from the earlier active-root packet.

The active windows obey
$$
\Delta\le6.92
<
B_{\mathrm{mem}}^{\mathrm{VP1}}
=7.8221162806\ldots
<4\pi,
$$
so the fixed tubes remain below the corridor-specific finite-memory bound.

## Pass And Blocker Status

| Row | Packet status | Coordinator constant |
| --- | --- | --- |
| Active partner roots | interval-pass | $P_1=[2.48,2.52]$, $P_2=[4.30,4.46]$, $P_3=[6.78,6.92]$ |
| Active self root | interval-pass | $S_1=[4.80,4.90]$ |
| Active sign rows | interval-pass | boundary margin at least $0.0040$ |
| Active Jacobian floor | interval-pass | $\nu_{\mathrm{cert}}=1.50$ |
| Inactive partner complements | interval-pass | signed gap at least $0.0030$ |
| Inactive self complements | interval-pass | signed gap at least $0.017$ |
| Excluded self coincidence | analytic-pass | $|F_s|/\Delta\ge0.6794678492\ldots$ |
| Finite memory for fixed tubes | pass | $6.92<B_{\mathrm{mem}}^{\mathrm{VP1}}=7.8221162806\ldots$ |

The lane blocker is no longer a missing mathematical sign condition for the fixed VP-1 tubes. The exact blocker left is executable integration: `spiral_branch_chart_certificate.py` and `spiral-branch-chart-interval-report.md` still report sampled/blocker status because this worker did not edit the runner or generated report. A coordinator can port the finite-cover rows above into the executable certificate without changing the VP-1 root windows.

This packet does not decide the root-transport row, radial-turn force-ratio row, or weighted tangential-drive interval row. It only closes the active-root interval-tube and inactive-complement sign-gap lane for the declared VP-1 contract.
