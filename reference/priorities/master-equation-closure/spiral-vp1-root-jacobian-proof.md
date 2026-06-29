# VP-1 Active-Root And Jacobian-Floor Packet

Status: complete proof packet for the VP-1 active-root continuation and Jacobian-floor rows.

Claim level: topology diagnostic. This packet does not claim a theorem-grade
interval proof and supplies no current force/action evidence. It gives active
root labels, fixed root tubes, sampled gap and Jacobian margins that may seed a
new receiver-normal rebuild.

Certificate verdict: sampled-pass for the partner/self active-root continuation and Jacobian-floor rows on
$$
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
D_{\mathrm{cert}}=\left[\frac{1}{2},4\pi\right].
$$
No active branch exchange, root-count change, or active Jacobian-null contact was found in the sampled diagnostic. The theorem-grade row remains pending until the same constants are reproduced by an outward-rounded interval certificate over the active tubes and inactive complements, and any force/action consumer also supplies same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows.

## Equations Used

This packet uses the VP-1 history and root equations retained here as topology
setup:
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
The partner equation is
$$
F_p(\theta,\Delta)
=
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)}
=0,
\qquad
\Lambda_p=\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
and the self equation is
$$
F_s(\theta,\Delta)
=
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)}
=0,
\qquad
\Lambda_s=\sqrt{1+\rho^2-2\rho\cos\Delta}.
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
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right].
$$
For both equations, direct differentiation at fixed $\theta$ gives the useful certificate identity
$$
\frac{\partial F_p}{\partial\Delta}=-\frac{J_{12}}{b(\theta)},
\qquad
\frac{\partial F_s}{\partial\Delta}=-\frac{J_{11}}{b(\theta)}.
$$
Thus a positive active Jacobian floor is also the simple-root and no-fold condition for the retained root tubes.

## Active Root Ledger

The executable scan used $\Delta_{\mathrm{co}}=1/2$. Across 2001 equally spaced $\theta$ values in $I_\ast$, with bracketing root solves on $D_{\mathrm{cert}}$, the count was stable:

| Class | Active labels | Sampled count on every $\theta$ row |
| --- | --- | ---: |
| Partner | $P_1,P_2,P_3$ | $3$ |
| Self | $S_1$ | $1$ |

The sampled root ranges are:

| Label | Fixed tube used for the certificate contract | Sampled $\Delta_{\min}$ | Sampled $\Delta_{\max}$ | Sampled minimum active $|J|$ |
| --- | ---: | ---: | ---: | ---: |
| $P_1$ | $[2.48,2.52]$ | $2.483783565495$ | $2.513210685537$ | $4.322605935726$ |
| $P_2$ | $[4.30,4.46]$ | $4.314545257180$ | $4.446461736163$ | $1.669656880405$ |
| $P_3$ | $[6.78,6.92]$ | $6.794516169889$ | $6.908404038645$ | $1.729219513180$ |
| $S_1$ | $[4.80,4.90]$ | $4.816469361591$ | $4.881739408531$ | $3.872720632692$ |

The active Jacobian floor supported by the sampled root curves is therefore
$$
\nu_J^{\mathrm{sample}}
\ge
1.669656880405,
$$
with the minimum attained on the partner label $P_2$ at the left endpoint $\theta=-\pi/6$ within numerical precision.

The fixed active tubes give a more conservative derivative-floor contract. A sampled/optimized search over the whole tube rectangles gave
$$
\inf_{P_1\ \mathrm{tube}}|J_{12}|\ge4.317674591130,
\qquad
\inf_{P_2\ \mathrm{tube}}|J_{12}|\ge1.646844756160,
$$
$$
\inf_{P_3\ \mathrm{tube}}|J_{12}|\ge1.583450277090,
\qquad
\inf_{S_1\ \mathrm{tube}}|J_{11}|\ge3.859089352535.
$$
The interval implementation should therefore target the conservative active-tube floor
$$
\nu_{\mathrm{cert}}=1.50.
$$

## Root-Tube Sign Rows

The following sign rows are the finite certificate contract for one and only one simple root in each fixed tube. The displayed values are sampled/optimized margins, not outward interval bounds.

| Label | Lower-tube boundary sign | Upper-tube boundary sign | Tube $|J|$ support | Contract verdict |
| --- | ---: | ---: | ---: | --- |
| $P_1$ | $\inf_\theta F_p(\theta,2.48)\ge0.004614070870$ | $\sup_\theta F_p(\theta,2.52)\le-0.008653429673$ | $|J_{12}|\ge4.317674591130$ | one decreasing root |
| $P_2$ | $\sup_\theta F_p(\theta,4.30)\le-0.008280277278$ | $\inf_\theta F_p(\theta,4.46)\ge0.006339817506$ | $|J_{12}|\ge1.646844756160$ | one increasing root |
| $P_3$ | $\inf_\theta F_p(\theta,6.78)\ge0.007404400623$ | $\sup_\theta F_p(\theta,6.92)\le-0.005891750705$ | $|J_{12}|\ge1.583450277090$ | one decreasing root |
| $S_1$ | $\inf_\theta F_s(\theta,4.80)\ge0.017949126722$ | $\sup_\theta F_s(\theta,4.90)\le-0.021310290451$ | $|J_{11}|\ge3.859089352535$ | one decreasing root |

Because $F_\Delta=-J/b(\theta)$ and $b(\theta)>0$, the sign of $J$ fixes the root orientation inside each active tube. The active roots are simple throughout the sampled corridor, and a directed interval proof of the tube rows would certify continuation by the implicit function theorem.

## Inactive Gap Support

The fixed active tubes leave the following inactive complement boxes on $D_{\mathrm{cert}}$. The sampled/optimized gaps are:

| Class | Complement interval in $\Delta$ | Expected sign | Sampled lower bound for $|F|$ |
| --- | ---: | ---: | ---: |
| Partner | $[0.50,2.48]$ | $+$ | $0.004614070870$ |
| Partner | $[2.52,4.30]$ | $-$ | $0.008280277278$ |
| Partner | $[4.46,6.78]$ | $+$ | $0.006339817506$ |
| Partner | $[6.92,4\pi]$ | $-$ | $0.005891750705$ |
| Self | $[0.50,4.80]$ | $+$ | $0.017949126722$ |
| Self | $[4.90,4\pi]$ | $-$ | $0.021310290451$ |

For the excluded self-coincidence row,
$$
0<\Delta<\frac{1}{2},
$$
the sampled minimum was
$$
\inf_{\theta\in I_\ast,\ 0<\Delta\le1/2}
\frac{F_s(\theta,\Delta)}{\Delta}
\ge
0.701469317243,
$$
at the sampled boundary $\theta=\pi/6$, $\Delta=1/2$. The directed interval certificate should target the conservative clearance
$$
\frac{F_s(\theta,\Delta)}{\Delta}\ge0.70
$$
on this excluded-coincidence row.

The self geometry has inactive spatial coincidences at full-turn offsets such as $\Delta=2\pi$ and at the endpoint $\Delta=4\pi$. These are not causal roots because $F_s<0$ there, but the inactive-gap evaluator must not ask for $J_{11}$ at those inactive points where $\Lambda_s=0$. They do not affect the active $S_1$ Jacobian floor because the retained self tube is separated from those spatial coincidences.

## Branch-Exchange Risk

No same-class branch exchange was observed. The sampled partner separation floors were
$$
\inf_{\theta}(\Delta_{P_2}-\Delta_{P_1})
\ge
1.830761691684,
$$
$$
\inf_{\theta}(\Delta_{P_3}-\Delta_{P_2})
\ge
2.419127162198.
$$
There is only one retained self branch, so same-class self exchange is impossible on this chart. The closest partner/self separation was between $P_2$ and $S_1$:
$$
\inf_{\theta}|\Delta_{S_1}-\Delta_{P_2}|
\ge
0.370007626591.
$$
Partner and self roots are labelled by different root equations, so this cross-class distance is diagnostic only; it is not a branch-exchange channel.

## Memory And Active Spatial Clearance

The largest sampled active root was
$$
\Delta_{\max}^{\mathrm{sample}}=6.908404038645
$$
on $P_3$ near $\theta=-\pi/6$. This is below the finite-memory estimate already stated in the source packet,
$$
b_\ast e^{2a}(1+e^{2a})=9.497\ldots<4\pi.
$$
The smallest sampled active separation factor was
$$
\Lambda_{\min}^{\mathrm{act}}\ge0.700208312247,
$$
so no active root approaches the inactive self spatial-coincidence points.

## Pass And Failure Conditions

The active-root/Jacobian rows pass at theorem grade only if an outward-rounded implementation proves all of the following over $I_\ast\times D_{\mathrm{cert}}$:

- exactly the four active tubes $P_1,P_2,P_3,S_1$ contain roots;
- each active tube has a sign-changing boundary row and a monotone derivative row using $F_\Delta=-J/b(\theta)$;
- the active-tube Jacobian lower bound satisfies $\nu_J\ge1.50$;
- every inactive complement has a positive $|F|$ gap;
- the excluded self-coincidence row satisfies $F_s/\Delta\ge0.70$ for $0<\Delta\le1/2$;
- active branch separation remains positive, with no same-class branch exchange;
- the maximum retained root remains below the finite-memory bound.

The rows fail if any interval box proves or permits one of the following:

- an unlisted partner or self root outside the four active tubes;
- an active $J=0$ contact or a tube whose derivative interval crosses zero;
- a closed inactive gap;
- a failure of the self near-coincidence clearance;
- a same-class branch exchange or root fold inside $I_\ast$;
- an active root exceeding the displayed finite-memory bound.

## Integration Notes

The strongest safe integration status is:

- `active_root_continuation`: sampled-pass, interval-contract pending.
- `root_count_stability`: sampled-pass with fixed active tubes and inactive complement gaps.
- `jacobian_floor`: sampled-pass with $\nu_J^{\mathrm{sample}}\ge1.669656880405$ and interval target $\nu_{\mathrm{cert}}=1.50$.
- `branch_exchange_risk`: no sampled risk; partner separation and cross-class separation have wide margins.
- `theorem_grade`: false until a directed interval runner reproduces the sign, gap, and $J$ rows with outward bounds.

This packet should be consumed by the executable certificate as the fixed VP-1 root-ledger contract. It does not mark `spiral_branch_chart_test` complete and does not decide the weighted tangential-drive verdict.
