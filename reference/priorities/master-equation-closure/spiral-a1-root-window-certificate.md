# Spiral A1 Root-Window Certificate

Status. Topology diagnostic for the retained root chart at
$$
a_{\mathrm{A1}}=0.204,
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
D_{\mathrm{cert}}=\left[\frac{1}{2},4\pi\right].
$$
This packet writes the $a_{\mathrm{A1}}$ root-window, inactive-gap,
transmitter-side floor, self-coincidence, and finite-memory records. It supplies
no canonical action or conservation evidence.

Claim level. Priority topology packet for the retained $3+1$ root chart. The
transmitter-side rebuild must reproduce any retained topology it consumes and
must add same-record $D_t$, $D_r$, $W^{\mathrm{acc}}$, and signed playback
before any physical interpretation.

## Candidate Definition

Use the same isolated symmetric variable-pitch spiral history as the VP-1 packet,
but with the larger pitch amplitude
$$
a=a_{\mathrm{A1}}=0.204.
$$
Thus
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),
\qquad
p(\theta)=-\frac{r'(\theta)}{r(\theta)}=-a\sin\theta,
$$
and
$$
b(\theta)=b_\ast\exp(a(1-\cos\theta)),
\qquad
\rho(\theta,\Delta)=
\exp(a(\cos\theta-\cos(\theta-\Delta))).
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
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right],
\qquad
p_0=-a\sin(\theta-\Delta).
$$
As in the VP-1 proof packets,
$$
\frac{\partial F_p}{\partial\Delta}=-\frac{J_{12}}{b(\theta)},
\qquad
\frac{\partial F_s}{\partial\Delta}=-\frac{J_{11}}{b(\theta)}.
$$
Since $b(\theta)>0$, a signed active Jacobian interval fixes the monotonicity of
the root equation inside the corresponding active window.

## Proposed Active Windows

The sampled scan at $a=0.204$ reported stable active counts
partner $3$, self $1$, with sampled active-root ranges:
$$
P_1=[2.5713450531078994,2.663900309079577],
$$
$$
P_2=[4.0243551433924765,4.303061548800072],
$$
$$
P_3=[6.807857572606611,7.07922185955913],
$$
$$
S_1=[4.850439475449452,4.979304247401895].
$$
Use the following padded windows:

| Label | Equation | Proposed window | Lower padding | Upper padding | Orientation target |
| --- | --- | ---: | ---: | ---: | --- |
| $P_1$ | $F_p$ | $[2.55,2.69]$ | $0.02134505310789958$ | $0.02609969092042297$ | decreasing |
| $P_2$ | $F_p$ | $[4.00,4.34]$ | $0.024355143392476464$ | $0.036938451199928224$ | increasing |
| $P_3$ | $F_p$ | $[6.78,7.12]$ | $0.027857572606611036$ | $0.040778140440870025$ | decreasing |
| $S_1$ | $F_s$ | $[4.82,5.02]$ | $0.03043947544945169$ | $0.04069575259810421$ | decreasing |

The sampled root-curve support gives
$$
\min_{\alpha,\theta}|J_\alpha(\theta,\Delta_\alpha(\theta))|
\approx
1.571400166,
$$
so the active roots are not near a sampled fold. The interval-window Jacobian
floor below is more conservative because it covers the full padded rectangles,
not only the sampled root curves.

## Interval Cover Used

The finite-cover check used:

- boundary sign rows: $1024$ uniform $\theta$ slabs over $I_\ast$;
- active Jacobian rows: $256$ uniform $\theta$ slabs and $256$ uniform $\Delta$
  slabs per active window;
- inactive complement rows: $256$ uniform $\theta$ slabs and $512$ uniform
  $\Delta$ slabs per inactive complement interval.

No checked interval box touched zero in the rows reported below.

## Active-Tube Sign Rows

The active boundary signs are:

| Label | Lower boundary row | Upper boundary row | Interval verdict |
| --- | ---: | ---: | --- |
| $P_1$ | $\inf_{\theta\in I_\ast}F_p(\theta,2.55)\ge0.02327841337561864$ | $\sup_{\theta\in I_\ast}F_p(\theta,2.69)\le-0.02978018728543574$ | one decreasing root |
| $P_2$ | $\sup_{\theta\in I_\ast}F_p(\theta,4.00)\le-0.015511934249122337$ | $\inf_{\theta\in I_\ast}F_p(\theta,4.34)\ge0.016685493907867995$ | one increasing root |
| $P_3$ | $\inf_{\theta\in I_\ast}F_p(\theta,6.78)\ge0.013459584304543746$ | $\sup_{\theta\in I_\ast}F_p(\theta,7.12)\le-0.019894617543425582$ | one decreasing root |
| $S_1$ | $\inf_{\theta\in I_\ast}F_s(\theta,4.82)\ge0.03528914782326042$ | $\sup_{\theta\in I_\ast}F_s(\theta,5.02)\le-0.054154924914498574$ | one decreasing root |

The active Jacobian rows on the padded windows are:

| Label | Interval Jacobian row | Certified $|J|$ support |
| --- | ---: | ---: |
| $P_1$ | $3.68716858750136\le J_{12}\le4.431676467309756$ | $|J_{12}|\ge3.6871685875013593$ |
| $P_2$ | $-2.3490890666655564\le J_{12}\le-1.5675458135817848$ | $|J_{12}|\ge1.5675458135817846$ |
| $P_3$ | $1.262499729917764\le J_{12}\le2.247802759764517$ | $|J_{12}|\ge1.2624997299177638$ |
| $S_1$ | $4.178866881884487\le J_{11}\le4.822357388971106$ | $|J_{11}|\ge4.1788668818844865$ |

Therefore the usable packet-level Jacobian floor is
$$
\nu_{\mathrm{cert}}^{\mathrm{A1}}=1.20.
$$
The stricter displayed interval lower endpoint is $1.2624997299177638$, attained
by the padded $P_3$ rectangle in this cover.

## Inactive Complement Rows

The active windows leave the partner inactive complement
$$
Q_0^p=I_\ast\times[1/2,2.55],
\qquad
Q_1^p=I_\ast\times[2.69,4.00],
$$
$$
Q_2^p=I_\ast\times[4.34,6.78],
\qquad
Q_3^p=I_\ast\times[7.12,4\pi],
$$
and the self inactive complement
$$
Q_0^s=I_\ast\times[1/2,4.82],
\qquad
Q_1^s=I_\ast\times[5.02,4\pi].
$$

The finite-box interval signs are:

| Box | Sign row | Outward support |
| --- | --- | ---: |
| $Q_0^p$ | $F_p>0$ | $\inf_{Q_0^p}F_p\ge0.020051913424797393$ |
| $Q_1^p$ | $F_p<0$ | $\sup_{Q_1^p}F_p\le-0.013701001601861494$ |
| $Q_2^p$ | $F_p>0$ | $\inf_{Q_2^p}F_p\ge0.012936842082889475$ |
| $Q_3^p$ | $F_p<0$ | $\sup_{Q_3^p}F_p\le-0.017313034019960313$ |
| $Q_0^s$ | $F_s>0$ | $\inf_{Q_0^s}F_s\ge0.03468826285877968$ |
| $Q_1^s$ | $F_s<0$ | $\sup_{Q_1^s}F_s\le-0.052796071373979674$ |

Thus the inactive signed gap supported by this packet is
$$
g_{\mathrm{inactive}}^{\mathrm{A1}}\ge0.0129.
$$
This proves, at priority-packet level, that no unlisted partner or self root
exists in $I_\ast\times D_{\mathrm{cert}}$ outside the four retained windows.

## Excluded Self-Coincidence Row

For $0<\Delta\le1/2$, the mean-value bound gives
$$
\rho(\theta,\Delta)\ge e^{-a/2}=e^{-0.102}.
$$
Also $b(\theta)\ge7/2$ on $I_\ast$, and
$$
\frac{2(1-\cos\Delta)}{\Delta^2}
\ge
8(1-\cos(1/2)).
$$
Therefore
$$
\frac{F_s(\theta,\Delta)}{\Delta}
\ge
\sqrt{8e^{-0.102}(1-\cos(1/2))}-\frac{2}{7}
=0.6546965362251012\ldots>0.
$$
The endpoint $\Delta=0$ remains the excluded self-coincidence row, not an active
self-force branch.

## Finite-Memory Estimate

The coarse VP-1 memory estimate is no longer sufficient at $a=0.204$:
$$
b_\ast e^{2a}(1+e^{2a})
=13.17835098704818>4\pi.
$$
The corridor-specific estimate still closes the finite-memory row. Put
$$
x=\cos\theta,
\qquad
\frac{\sqrt3}{2}\le x\le1.
$$
For either partner or self roots,
$$
\Delta=b(\theta)\Lambda_{p,s}
\le
\frac{7}{2}e^{a(1-x)}(1+e^{a(1+x)})
=
\frac{7}{2}\left(e^{a(1-x)}+e^{2a}\right).
$$
Hence, on $I_\ast$,
$$
\Delta
\le
B_{\mathrm{mem}}^{\mathrm{A1}}
\equiv
\frac{7}{2}
\left(
e^{0.204(1-\sqrt3/2)}+e^{0.408}
\right)
=8.860302120379817<4\pi.
$$
The clearance to the declared memory horizon is
$$
4\pi-B_{\mathrm{mem}}^{\mathrm{A1}}
=3.7060684939793553.
$$
The largest retained padded active endpoint is $7.12$, so
$$
7.12<B_{\mathrm{mem}}^{\mathrm{A1}}<4\pi.
$$

## Proof Obligations For Executable Replacement

The sampled A1 rows are ready to be replaced by executable interval rows only
when the runner or a typed sidecar emits the following rows with the same
candidate constants:

1. `active_root_continuation`: the four padded windows above, with boundary sign
   intervals and signed Jacobian intervals proving exactly one simple root in
   each active tube for every $\theta\in I_\ast$.
2. `root_count_stability`: the six inactive complement boxes above, with
   strict interval signs and a declared inactive floor
   $g_{\mathrm{inactive}}^{\mathrm{A1}}>0$.
3. `jacobian_floor`: the retained active Jacobian floor
   $\nu_J\ge1.20$, or a sharper outward lower endpoint if the runner uses a
   narrower root enclosure than the padded rectangles.
4. `self_coincidence_clearance`: the analytic row
   $F_s(\theta,\Delta)/\Delta\ge0.6546965362251012\ldots$ on
   $0<\Delta\le1/2$.
5. `finite_memory`: the corridor-specific bound
   $B_{\mathrm{mem}}^{\mathrm{A1}}=8.860302120379817<4\pi$ and the retained
   active-window maximum $7.12<B_{\mathrm{mem}}^{\mathrm{A1}}$.
6. `root_transport`: the $C^1$ root-offset residual must be evaluated on the
   same retained active identities before the chart can be promoted as a full
   branch-history certificate.
7. `radial_turn` and `tangential_drive`: the companion
   [spiral-a1-restart](spiral-a1-restart.md) packet derives same-box
   $W^{\mathrm{acc}}=c_f/|D_t|$ intervals and keeps $D_r/D_t$ as playback.
   Outward aggregates, action, and conservation remain separate obligations.

## Packet Verdict

Root-window verdict: `topology-diagnostic-only`. The active-root, inactive-gap,
Jacobian-floor, self-coincidence, and finite-memory rows above certify the
retained $P_1,P_2,P_3,S_1$ chart at priority-packet level under the displayed
finite-cover arithmetic.

Repository verdict: `transmitter_side_acceleration_rebuilt`. No deleted sidecar
or generated report is an active authority for this chart.

Promotion decision: priority-only for closure. The A1 retained root chart is not
ready for reader-facing corpus promotion as a closure result until outward
aggregates and accepted causal wake accounts are emitted.
