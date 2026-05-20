# Spiral A1 Drive Interval Packet

Status. Priority-only proof packet for the $a_{\mathrm{A1}}=0.204$ drive rows in `spiral_branch_chart_test`. This packet records the radial threshold rule, an outward radial branch-sum interval, a strict negative tangential-drive interval probe, and the exact evidence required before sidecar promotion. It does not edit the executable runner, the current sidecar, generated reports, priority queues, or authored AAA prose.

Claim level. A1 radial threshold interval report plus sidecar-consumed tangential interval-pass row, not a full theorem-grade bare-spiral certificate. The force-ratio row remains blocked: $\Gamma$ must not be used as a search knob and must not be inferred from $b_\ast$, a branch threshold, or the tangential sign. Repository theorem-grade status remains pending until the radial force-ratio row is resolved.

## Candidate Row

The fixed A1 drive target is
$$
a_{\mathrm{A1}}=0.204,
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right].
$$
The sampled continuation report gives the active ledger as partner $3$, self $1$, with sampled minimum active $|J|$ equal to $1.571405114769179$ and sampled weighted tangential drive
$$
D_T^{\mathrm{samp}}(I_\ast)
=-0.0008961600695014303.
$$
The companion [spiral-a1-root-window-certificate](spiral-a1-root-window-certificate.md) packet replaces this sampled ledger with retained A1 windows
$$
P_1=[2.55,2.69],
\qquad
P_2=[4.00,4.34],
\qquad
P_3=[6.78,7.12],
\qquad
S_1=[4.82,5.02],
$$
plus active boundary signs, inactive-complement signs, a conservative Jacobian floor, self-coincidence clearance, and finite-memory control. The retained labels remain ordered as $P_1,P_2,P_3,S_1$ for this target. The VP-1 fixed root tubes are not reusable evidence for this row.

## Radial Threshold Rule

For an A1 retained chart $C_{\mathrm{A1}}$, let the outward radial branch interval at the turn center be
$$
B_r(C_{\mathrm{A1}};0)\in[B_r^-,B_r^+].
$$
Report the threshold endpoints
$$
G_{\mathrm{pass}}=-B_r^-,
\qquad
G_{\mathrm{fail}}=-B_r^+.
$$
If an accepted force-ratio interval is later supplied in the fixed normalization
$$
\Gamma=\frac{r_\ast^3\Omega^2}{\kappa q_1^2},
\qquad
\Gamma\in[\Gamma^-,\Gamma^+],
$$
then the radial row has exactly these outcomes:

| Outcome | Required interval inequality |
| --- | --- |
| `passed` | $\Gamma^-+B_r^->0$ |
| `certified_fail` | $\Gamma^+ + B_r^+\le0$ |
| `blocked` | Neither strict inequality is proved, or no accepted $\Gamma$ interval is declared. |

With no declared $\Gamma$ interval, the A1 radial row may only be a threshold report. It cannot be used to complete `spiral_branch_chart_test`, and it cannot guide the search.

## Radial Branch Interval Probe

A read-only local evaluation of [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py) with only the module constant `A` set to `0.204` and the A1 retained windows above gives the following outward center rows at $\theta_\ast=0$ with initial root pad $10^{-8}$:

| Label | $\Delta$ interval | Radial contribution interval | $J$ interval |
| --- | ---: | ---: | ---: |
| $P_1$ | $[2.6459754351052864,2.645975455105287]$ | $[0.17510669230789663,0.17510673258977116]$ | $[3.8434172296227684,3.8434174798139584]$ |
| $P_2$ | $[4.145702914734943,4.1457029347349446]$ | $[-0.08717952675258234,-0.08717950569165187]$ | $[-1.8324468327625067,-1.8324466925008982]$ |
| $P_3$ | $[6.8374027371194845,6.837402757119486]$ | $[-0.15742109417234781,-0.15742108635897262]$ | $[1.5990335643769507,1.5990336140163282]$ |
| $S_1$ | $[4.898122153956867,4.898122173956868]$ | $[0.06349913729025959,0.0634991434689803]$ | $[4.492697981252946,4.492698075757034]$ |

Thus the retained-chart radial branch interval is
$$
B_r(C_{\mathrm{A1}};0)
\in[-0.005994791326773983,-0.005994715991872956],
$$
with force-ratio threshold endpoints
$$
G_{\mathrm{pass}}=0.005994791326773983,
\qquad
G_{\mathrm{fail}}=0.005994715991872956.
$$
The minimum active $|J|$ lower endpoint on these center enclosures is $1.5990335643769504$, and the maximum root interval width is $2.000000165480742\times10^{-8}$. This is still a threshold report, not a radial pass, because no accepted $\Gamma$ interval has been declared.

## Tangential Interval Probe

The A1 tangential row can pass only by a strict outward negative upper endpoint:
$$
D_T(C_{\mathrm{A1}};I_\ast)\in[D_T^-,D_T^+],
\qquad
D_T^+\le-\varepsilon_T,
\qquad
\varepsilon_T>0.
$$
A coordinator interval probe using the retained A1 windows, $4096$ equal $\theta$ slabs, nextafter-directed interval arithmetic, slabwise active-root enclosures, and the nonnegative weight $w(\theta)=\cos^2(3\theta)$ reports
$$
D_T(C_{\mathrm{A1}};I_\ast)
\in[-0.0015572472070875527,-0.00023480430280344085].
$$
Therefore the priority-packet tangential row has a strict negative upper endpoint. A sidecar-compatible margin may use
$$
\varepsilon_T=2.0\times10^{-4},
\qquad
D_T^+\le-2.0\times10^{-4}.
$$
The same probe reports minimum active $|J|$ lower endpoint $1.5711302941214833$, maximum root interval width $0.0004111903157433261$, maximum root pad $0.00016384$, and pointwise tangential-sum interval envelope
$$
T(\theta)\in[-0.028377386511489664,0.08125119561398353]
$$
across the slabs. The proof is a weighted-integral certificate, not a pointwise negative-sum certificate.

The tangential row outcomes are:

| Outcome | Required interval inequality |
| --- | --- |
| `passed` | $D_T^+\le-\varepsilon_T$ for a declared $\varepsilon_T>0$ |
| `certified_fail` | $D_T^-\ge0$ |
| `blocked_interval_width` | $D_T^-<0<D_T^+$ |

## Evidence Required Before Sidecar Promotion

Sidecar promotion requires all of the following A1-specific evidence:

1. Candidate metadata: `a=0.204`, `b_star=3.5`, `theta_interval=[-pi/6,pi/6]`, `delta_co=1/2`, `delta_cert=[1/2,4*pi]`, and active labels exactly `P_1,P_2,P_3,S_1`.
2. Active chart certificate: outward A1 root enclosures for the three partner roots and one self root across $I_\ast$, endpoint sign rows on every retained root tube, no inactive partner or self roots in the complement, a positive active Jacobian floor $\nu_J>0$, self-coincidence clearance on $0<\Delta<1/2$, finite-memory control below $4\pi$, and the root-transport dependency row.
3. Radial threshold certificate: outward contribution intervals for $P_1,P_2,P_3,S_1$ at $\theta_\ast=0$, their outward sum $B_r(C_{\mathrm{A1}};0)\in[B_r^-,B_r^+]$, threshold endpoints $G_{\mathrm{pass}}=-B_r^-$ and $G_{\mathrm{fail}}=-B_r^+$, root-boundary verification, and a positive lower bound for active $|J|$ on the radial enclosures.
4. Radial force-ratio source, only if the row is promoted as `passed` or `certified_fail`: a declared numeric interval `gamma_interval=[Gamma^-,Gamma^+]`, the exact normalization `Gamma = r_*^3 Omega^2/(kappa q_1^2)`, a nonempty accepted `gamma_source`, and the strict margin required by the radial threshold rule. Without this source, the only legal radial status is `blocked`.
5. Tangential pass certificate: [spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json) emits the outward integral interval `D_T_interval=[-0.0015572472070875527,-0.00023480430280344085]`, root-boundary verification, positive active $|J|$ lower bound, nonnegative weight $w(\theta)=\cos^2(3\theta)$ on $I_\ast$, `epsilon_T=2.0e-4`, and the strict inequality $D_T^+\le-\epsilon_T`.
6. Diagnostic separation: sampled values may appear only as diagnostic fields. No sampled root, sampled branch sum, sampled active count, or sampled $D_T$ value may be treated as sidecar-proof evidence.

If a runner-integrated A1 chart later finds a branch transition, extra self roots, inactive-gap closure, or a Jacobian-null row, this drive packet must be treated as a rejected chart diagnostic rather than a passing negative-drive candidate.

## Promotion Decision

Priority-only for closure, sidecar-promoted for the tangential row. A1 now has retained-root structural rows, root transport, a radial threshold interval, and a strict negative tangential-drive row consumed by [spiral-a1-current-interval-rows](spiral-a1-current-interval-rows.json) and reported in [spiral-a1-interval-report](spiral-a1-interval-report.md). It is still not ready for authored corpus promotion as an isolated spiral closure result because the radial turn remains blocked without an independently derived $\Gamma$ interval. The next durable result should resolve the radial row by supplying an accepted force-ratio interval, or keep A1 explicitly classified as a tangential-pass/radial-blocked benchmark.
