# VP-1 Inactive-Memory Proof Packet

Status. Topology diagnostic for the VP-1 inactive-complement, finite-memory,
self-coincidence, and root-transport lane. This packet stays inside the VP-1
candidate history and does not mark `spiral_branch_chart_test` complete.

Claim level. Partial topology support. The finite-memory inequality and the near-coincidence self row are certified for the declared VP-1 equations with
$$
\Delta_{\mathrm{co}}=\frac{1}{2}.
$$
The inactive-complement cover and root-transport residual contract are specified
with concrete seed rows from the active-root lane, but they are not theorem-grade
complete until a new certificate supplies outward interval active-root tubes,
box gaps, derivative residual results, and any acceleration consumer separately
emits same-record $D_t$ and $W_{\mathrm{acc}}=c_f/|D_t|$, with $D_r/D_t$ carried separately only for signed playback.

## Fixed VP-1 Domain

The lane uses
$$
a=\frac{1}{10},
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
D_h=(0,4\pi],
$$
with
$$
D_{\mathrm{cert}}=\left[\frac{1}{2},4\pi\right].
$$
The near-coincidence self interval is therefore
$$
0<\Delta<\frac{1}{2}.
$$

## Finite-Memory Verdict

The source packet already gives
$$
\rho\le e^{2a},
\qquad
\Lambda_{p,s}\le1+e^{2a},
\qquad
b(\theta)\le b_\ast e^{2a},
$$
and hence
$$
\Delta\le b_\ast e^{2a}(1+e^{2a})
=9.4962960953\ldots<4\pi.
$$
This proves finite memory, but VP-1 admits a sharper corridor-specific bound. Put
$$
x=\cos\theta,
\qquad
\frac{\sqrt3}{2}\le x\le1.
$$
For fixed $\theta$,
$$
\rho\le e^{a(1+x)}
$$
and
$$
b(\theta)=b_\ast e^{a(1-x)}.
$$
Thus every partner or self root satisfies
$$
\Delta=b(\theta)\Lambda_{p,s}
\le
\frac{7}{2}e^{a(1-x)}(1+e^{a(1+x)})
=
\frac{7}{2}(e^{a(1-x)}+e^{2a})
$$
and therefore
$$
\Delta\le
B_{\mathrm{mem}}^{\mathrm{VP1}}
\equiv
\frac{7}{2}
\left(
e^{(1-\sqrt3/2)/10}+e^{1/5}
\right)
=7.8221162806\ldots<4\pi.
$$
The memory-depth row is accepted with
$$
h_{\mathrm{mem}}
\le
\frac{B_{\mathrm{mem}}^{\mathrm{VP1}}}{\Omega}
<
\frac{4\pi}{\Omega}=h.
$$
The certified analytic clearance is
$$
4\pi-B_{\mathrm{mem}}^{\mathrm{VP1}}
=4.7442543338\ldots.
$$
The sampled active root maximum from the source-compatible scan is
$$
\Delta_{\max}^{\mathrm{sample}}=6.9084040387\ldots,
$$
and the coarse active window maximum below is $6.92<B_{\mathrm{mem}}^{\mathrm{VP1}}$.

## Self-Coincidence Clearance

For the self geometry,
$$
\Lambda_s^2=(1-\rho)^2+2\rho(1-\cos\Delta).
$$
On $0<\Delta\le1/2$, the mean-value bound gives
$$
\rho\ge e^{-1/20}.
$$
Also,
$$
\frac{2(1-\cos\Delta)}{\Delta^2}
\ge
8(1-\cos(1/2))
$$
on this interval. Since $b(\theta)\ge7/2$ on $I_\ast$,
$$
\frac{F_s(\theta,\Delta)}{\Delta}
=
\frac{\Lambda_s(\theta,\Delta)}{\Delta}
-\frac{1}{b(\theta)}
\ge
\sqrt{8e^{-1/20}(1-\cos(1/2))}-\frac{2}{7}
=0.6794678492\ldots.
$$
Therefore
$$
\inf_{\theta\in I_\ast,\ 0<\Delta<1/2}
\frac{|F_s(\theta,\Delta)|}{\Delta}
\ge0.6794678492\ldots>0.
$$
Verdict: the near-coincidence self row is certified. The endpoint $\Delta=0$ remains an excluded self-coincidence row and is not an active self-force branch.

## Inactive-Complement Coverage Status

The inactive-cover contract is:

1. The root/Jacobian lane supplies active tubes
$$
\mathcal{T}_{p,k,m}\subset I_m\times D_{\mathrm{cert}},
\qquad
k=1,2,3,
$$
and
$$
\mathcal{T}_{s,1,m}\subset I_m\times D_{\mathrm{cert}},
$$
over a finite cover $\{I_m\}$ of $I_\ast$, each with one simple root and a positive $\partial_\Delta F$ floor.

2. The executable subtracts those tubes from each slab $I_m\times D_{\mathrm{cert}}$ and emits inactive boxes
$$
Q_a^p=I_m\times K_a^p,
\qquad
Q_a^s=I_m\times K_a^s.
$$

3. Every inactive box reports an outward interval gap
$$
g_a^p=\inf_{Q_a^p}|F_p(\theta,\Delta)|>0,
\qquad
g_a^s=\inf_{Q_a^s}|F_s(\theta,\Delta)|>0.
$$

The active-root lane now supplies fixed sampled tubes, but they are not outward interval enclosures. The present lane therefore cannot certify the inactive complements as theorem-grade complete. The exact executable blocker is the absence of outward interval active-root enclosures whose boundaries can be subtracted from $I_\ast\times D_{\mathrm{cert}}$ before evaluating the inactive gaps.

The following floating seed cover is supplied for the executable certificate. It is a smoke-test target, not an accepted interval certificate.

| Class | Active windows used for seed cover |
| --- | --- |
| Partner | $[2.48,2.52]$, $[4.30,4.46]$, $[6.78,6.92]$ |
| Self | $[4.80,4.90]$ |

| Class | Inactive $\Delta$ interval | Floating seed gap |
| --- | ---: | ---: |
| Partner | $[1/2,2.48]$ | $4.6140708700\times10^{-3}$ |
| Partner | $[2.52,4.30]$ | $8.2802772780\times10^{-3}$ |
| Partner | $[4.46,6.78]$ | $6.3398175058\times10^{-3}$ |
| Partner | $[6.92,4\pi]$ | $5.8917507049\times10^{-3}$ |
| Self | $[1/2,4.80]$ | $1.7949126722\times10^{-2}$ |
| Self | $[4.90,4\pi]$ | $2.1310290451\times10^{-2}$ |

Acceptance requires replacing these floating seed gaps by outward interval rows on the actual slabbed complement boxes. A successful executable certificate should report
$$
g_{\mathrm{inactive}}^{\mathrm{VP1}}
=
\min_a\{g_a^p,g_a^s\}>0.
$$

## Root-Transport Residual Contract

For each certified active branch $\alpha$, the simple-root map satisfies
$$
F_\alpha(\theta,\Delta_\alpha(\theta))=0,
\qquad
\frac{d\Delta_\alpha}{d\theta}
=
-\frac{\partial_\theta F_\alpha}{\partial_\Delta F_\alpha}.
$$
The executable residual row is
$$
\mathcal{R}_{\mathrm{tr},\alpha}(\theta)
\equiv
\left|
1-\frac{d\Delta_\alpha}{d\theta}
-
\frac{1-\hat{\mathbf r}_\alpha\cdot\mathbf{v}_{i,\alpha}/c_f}
{J_\alpha}
\right|.
$$
Equivalently, the interval evaluator may use
$$
\widehat{\mathcal{R}}_{\mathrm{tr},\alpha}(\theta)
\equiv
\left|
1+\frac{\partial_\theta F_\alpha}{\partial_\Delta F_\alpha}
-
\frac{1-\hat{\mathbf r}_\alpha\cdot\mathbf{v}_{i,\alpha}/c_f}
{J_\alpha}
\right|.
$$
In exact arithmetic this residual vanishes on a $C^1$ simple-root tube because it is the differentiated causal-delay equation. The certificate still must emit interval rows because the VP-1 history-compatibility row requires the retained root-offset maps and the same active-root identities throughout the history tube.

Floating smoke check: a 101-point central-difference scan on the sampled active branches gave
$$
\max_{\alpha,\theta}
\mathcal{R}_{\mathrm{tr},\alpha}^{\mathrm{float}}
\le8.6\times10^{-10}.
$$
This supports the algebraic contract but does not replace the interval residual row. The executable certificate should initially target
$$
\varepsilon_{\mathrm{tr}}=10^{-8}
$$
as a smoke tolerance, then replace it with the outward interval residual radius emitted by the final runner.

## Certificate Verdict

Finite memory: certified, with the sharpened bound
$$
B_{\mathrm{mem}}^{\mathrm{VP1}}=7.8221162806\ldots<4\pi.
$$

Self-coincidence clearance: certified for
$$
0<\Delta<\frac{1}{2}
$$
with lower bound
$$
0.6794678492\ldots.
$$

Inactive complement coverage: not yet certified. The box-cover contract and floating seed rows are supplied, but theorem-grade acceptance is blocked until active tube enclosures and outward interval inactive-gap rows are emitted.

Root-transport residual: contract defined and algebraically consistent. The smoke residual is below $10^{-8}$, but theorem-grade acceptance is blocked until the executable certificate evaluates the residual on the certified active tubes.

Integration notes for the executable certificate:

- Use $\Delta_{\mathrm{co}}=1/2$ and carry the self-coincidence clearance as a separate declared row.
- Use $B_{\mathrm{mem}}^{\mathrm{VP1}}$ as the memory-depth bound and reject any retained active enclosure whose upper endpoint reaches this bound.
- Import the active tube rows from the VP-1 root/Jacobian proof packet before constructing inactive complements.
- Replace the floating seed gaps above with outward interval rows on slabbed boxes.
- Evaluate $\widehat{\mathcal{R}}_{\mathrm{tr},\alpha}$ using the same active root identities, Jacobian rows, and receiver/source velocity projections as the force rows.
- Do not promote VP-1 or mark `spiral_branch_chart_test` complete from this packet alone; the radial-turn and weighted tangential-drive verdicts are owned by the separate drive-verdict lane.
