# Spiral VP-1 $a$-Sensitivity Sampled Report

Status. Priority-only sampled continuation report for `spiral_branch_chart_test`. This packet uses the current executable formulas in [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py) with $b_\ast=7/2$ and $I_\ast=[-\pi/6,\pi/6]$, but varies the pitch amplitude $a$. It does not edit the runner, sidecar, generated interval report, priority queue, or authored AAA prose.

Claim level. Sampled target selector, not an interval certificate. Every negative-drive row below must be replaced by active-root intervals, inactive-gap intervals, Jacobian-floor intervals, finite-memory control, radial-threshold intervals, and an outward tangential-drive interval before it can enter a theorem-grade sidecar.

## Method

The local check imported [spiral_branch_chart_certificate.py](spiral_branch_chart_certificate.py), changed only the module constant `A`, and evaluated:

- sampled active root stability with `theta_samples=101` or `201` and `delta_steps=4096`;
- sampled weighted tangential drive with Simpson quadrature using `quadrature_intervals=512` or `1024`;
- the same $b_\ast=7/2$, $\Delta_{\mathrm{co}}=1/2$, $D_{\mathrm{cert}}=[1/2,4\pi]$, and corridor $I_\ast=[-\pi/6,\pi/6]$ as VP-1.

No result in this packet uses a sidecar row or an outward interval certificate.

## Three-Row Continuation Seed

The first continuation rows requested by [spiral-vp1-next-candidate-sensitivity](spiral-vp1-next-candidate-sensitivity.md) were:

| $a$ | Sampled active counts | Sampled active-count stable | Sampled minimum $|J|$ | Sampled $\mathcal{D}_T(I_\ast)$ | Sampled verdict |
| ---: | --- | --- | ---: | ---: | --- |
| $0.08$ | partner $3$, self $1$ | `true` | $1.6665550942143361$ | $0.044523092025427514$ | sampled positive fail |
| $0.10$ | partner $3$, self $1$ | `true` | $1.6696568804033394$ | $0.040130017760667554$ | sampled positive fail |
| $0.12$ | partner $3$, self $1$ | `true` | $1.672413131582449$ | $0.03498227033573346$ | sampled positive fail |

This gives a negative one-sided direction: increasing $a$ decreases the sampled weighted tangential drive while preserving the sampled $3+1$ root count near VP-1.

## Sign-Reversal Bracket

Extending the same sampled continuation gives:

| $a$ | Sampled active-count stable | Sampled counts min/max | Sampled minimum $|J|$ | Sampled $\mathcal{D}_T(I_\ast)$ |
| ---: | --- | --- | ---: | ---: |
| $0.200$ | `true` | partner $3$, self $1$ | $1.5778521870051658$ | $0.0016349997567818924$ |
| $0.201$ | `true` | partner $3$, self $1$ | $1.5762435649673598$ | $0.0010135624482260745$ |
| $0.202$ | `true` | partner $3$, self $1$ | $1.5746328504530376$ | $0.00038464637193606007$ |
| $0.2025$ | `true` | partner $3$, self $1$ | $1.5738267062395908$ | $0.00006734215531920999$ |
| $0.203$ | `true` | partner $3$, self $1$ | $1.5730200361680755$ | $-0.0002518821347646662$ |
| $0.204$ | `true` | partner $3$, self $1$ | $1.571405114769179$ | $-0.0008961600695014303$ |
| $0.205$ | `true` | partner $3$, self $1$ | $1.5697880788731609$ | $-0.001548327874816564$ |

The sampled zero crossing lies between $a=0.2025$ and $a=0.203$ on the same sampled $3+1$ active-count ledger. This is the first concrete next-candidate signal after VP-1: increasing the pitch amplitude from $0.10$ toward $0.203$ appears to move the bare isolated spiral from positive to negative weighted tangential drive before the sampled root count changes.

## Branch-Transition Warning

Further continuation shows why this must be treated as a new candidate-certificate target rather than a global scanner result:

| $a$ | Sampled active-count stable | Sampled min/max counts | Sampled minimum $|J|$ | Sampled $\mathcal{D}_T(I_\ast)$ |
| ---: | --- | --- | ---: | ---: |
| $0.210$ | `true` | partner $3$, self $1$ | $1.5616709204511134$ | $-0.004932686451402698$ |
| $0.220$ | `true` | partner $3$, self $1$ | $1.5452736435068426$ | $-0.01238514843779937$ |
| $0.230$ | `true` | partner $3$, self $1$ | $1.5286524439250928$ | $-0.020914405681035714$ |
| $0.235$ | `false` | partner $3$, self $1$ to self $3$ | $0.147158166906038$ | $-0.025563401699279495$ |
| $0.240$ | `false` | partner $3$, self $1$ to self $3$ | $0.12567009894468018$ | $-0.02500299978045667$ |
| $0.280$ | `true` | partner $3$, self $3$ | $0.8416331080576964$ | $-0.07306308237398534$ |

The $a\approx0.235$ region is a branch-transition warning: additional self roots appear somewhere in the corridor and the sampled Jacobian floor drops sharply. Negative sampled tangential drive beyond that transition is not evidence for the same $3+1$ chart.

## Next Certificate Target

The smallest useful next certificate is therefore not a wide scan. It is a focused candidate packet around
$$
a_{\mathrm{A1}}\in[0.203,0.205],
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
$$
with a newly certified retained $3+1$ active chart. The interval proof must emit:

1. active root enclosures for the actual $a_{\mathrm{A1}}$ roots, not the VP-1 fixed windows;
2. inactive partner and self complement gaps on $I_\ast\times[1/2,4\pi]$;
3. active Jacobian floor $\nu_J>0$ and finite memory depth;
4. outward radial branch interval $B_r(0)\in[B_r^-,B_r^+]$ and thresholds $G_{\mathrm{pass}}=-B_r^-$, $G_{\mathrm{fail}}=-B_r^+$;
5. outward tangential interval $\mathcal{D}_T(I_\ast)\in[D_T^-,D_T^+]$ with a strict negative upper endpoint $D_T^+\le-\varepsilon_T$ for some declared $\varepsilon_T>0$.

Even if this target proves a negative tangential-drive interval, theorem-grade passing spiral closure still requires a strict accepted $\Gamma$ interval satisfying
$$
\Gamma^-+B_r^->0.
$$
Without that force-ratio row, an $a_{\mathrm{A1}}$ certificate would be a negative-drive candidate target with radial turn still blocked.

## Promotion Decision

Priority-only. The sampled sign reversal is a concrete mathematical target for `spiral_branch_chart_test`, but it is not reader-facing corpus material until a retained $a_{\mathrm{A1}}$ chart is interval-certified and the radial $\Gamma$ row is resolved.
