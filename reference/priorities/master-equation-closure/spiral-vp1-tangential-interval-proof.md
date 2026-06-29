# VP-1 Tangential-Drive Interval Proof Packet

Status. Team-agent worker packet for the VP-1 weighted tangential-drive interval row. This packet stays inside the declared VP-1 candidate history and the retained $P_1,P_2,P_3,S_1$ chart. It does not edit the executable runner, does not edit the generated interval report, and does not promote VP-1 into authored AAA prose.

Verdict. The theorem-grade interval row is not closed by this packet, because no outward-rounded interval evaluator was run here. The blocker is sharply reduced: the weighted integral sign no longer needs a delicate quadrature argument if the branch contribution lower rows below are certified. The reduced target is to prove the pointwise bound
$$
T(\theta)\ge0.05008>0
\qquad
\text{for every }\theta\in I_\ast.
$$
Once that pointwise row is certified, the nonnegative weight
$$
w(\theta)=\cos^2(3\theta)\ge0
$$
on $I_\ast$ proves
$$
\mathcal{D}_T(I_\ast)\ge0
$$
and therefore certifies VP-1 as a failed bare isolated spiral candidate for the tangential-drive row.

## Fixed Chart

The candidate history and corridor are those in [spiral-branch-chart-certificate](spiral-branch-chart-certificate.md):
$$
a=\frac{1}{10},
\qquad
b_\ast=\frac{7}{2},
\qquad
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],
\qquad
D_{\mathrm{cert}}=\left[\frac{1}{2},4\pi\right].
$$
The active branch chart is fixed as
$$
\mathcal{P}(\theta)=\{P_1(\theta),P_2(\theta),P_3(\theta)\},
\qquad
\mathcal{S}(\theta)=\{S_1(\theta)\}.
$$
The branch contribution functions are
$$
C_{P_k}(\theta)
=
W_{P_k}^{\mathrm{rec}}(\theta)
\frac{S_T^p(\theta,\Delta_{P_k}(\theta))}
{\Lambda_p^3(\theta,\Delta_{P_k}(\theta))},
$$
and
$$
C_{S_1}(\theta)
=
W_{S_1}^{\mathrm{rec}}(\theta)
\frac{S_T^s(\theta,\Delta_{S_1}(\theta))}
{\Lambda_s^3(\theta,\Delta_{S_1}(\theta))}.
$$
Thus
$$
T(\theta)=C_{P_1}(\theta)+C_{P_2}(\theta)+C_{P_3}(\theta)+C_{S_1}(\theta).
$$

## Branch Enclosure Contract

The active-root lane supplies the following fixed tubes and sampled support constants. They are the branch enclosures consumed by this packet; theorem-grade use requires replacing each displayed floating support row by an outward interval row on the same tube.

| Label | Fixed active tube | Root orientation | Tube $|J|$ support |
| --- | ---: | --- | ---: |
| $P_1$ | $[2.48,2.52]$ | one decreasing root | $4.317674591130$ |
| $P_2$ | $[4.30,4.46]$ | one increasing root | $1.646844756160$ |
| $P_3$ | $[6.78,6.92]$ | one decreasing root | $1.583450277090$ |
| $S_1$ | $[4.80,4.90]$ | one decreasing root | $3.859089352535$ |

The sampled root ranges inside those tubes are
$$
\Delta_{P_1}\in[2.483783565495,2.513210685537],
\qquad
\Delta_{P_2}\in[4.314545257180,4.446461736163],
$$
$$
\Delta_{P_3}\in[6.794516169889,6.908404038645],
\qquad
\Delta_{S_1}\in[4.816469361591,4.881739408531].
$$
These sampled ranges are not used as theorem-grade enclosures; they explain the numerical margin behind the target rows below.

## Pointwise Reduction

It is enough to certify the following four lower rows on the active root curves:

| Label | Floating support lower row | Outward interval target |
| --- | ---: | ---: |
| $P_1$ | $0.44118060955189992$ | $C_{P_1}(\theta)\ge0.44117$ |
| $P_2$ | $-0.31061730954767192$ | $C_{P_2}(\theta)\ge-0.31063$ |
| $P_3$ | $0.029659694959540323$ | $C_{P_3}(\theta)\ge0.02965$ |
| $S_1$ | $-0.11009526061786626$ | $C_{S_1}(\theta)\ge-0.11011$ |

Then, for every $\theta\in I_\ast$,
$$
T(\theta)
\ge
0.44117-0.31063+0.02965-0.11011
=0.05008>0.
$$
Consequently
$$
\mathcal{D}_T(I_\ast)
=
\int_{-\pi/6}^{\pi/6}\cos^2(3\theta)\,T(\theta)\,d\theta
\ge
0.05008
\int_{-\pi/6}^{\pi/6}\cos^2(3\theta)\,d\theta.
$$
The weight integral is exact:
$$
\int_{-\pi/6}^{\pi/6}\cos^2(3\theta)\,d\theta=\frac{\pi}{6}.
$$
Hence the pointwise interval target would imply the explicit integral lower bound
$$
\mathcal{D}_T(I_\ast)
\ge
0.05008\cdot\frac{\pi}{6}
=0.026221826681962806\ldots>0.
$$
This is weaker than the sampled quadrature value but already closes the sign needed for VP-1 rejection, because the pass condition is
$$
\mathcal{D}_T(I_\ast)\le-\varepsilon_T,
\qquad
\varepsilon_T>0.
$$

## Sampled Margin

The same branch continuation gives the sampled pointwise floor
$$
\min_{\theta\in I_\ast}T(\theta)
\approx
0.07533930778292029,
$$
near
$$
\theta\approx-0.05580580397326822.
$$
The converged sampled weighted diagnostic is
$$
\mathcal{D}_T(I_\ast)
\approx
0.04013001776065915.
$$
The interval certificate should therefore have comfortable room to prove either the pointwise target above or the sharper quadrature target
$$
\mathcal{D}_T(I_\ast)\ge0.04012>0.
$$

## Slabbed Interval Contract

Primary pointwise contract:

- Use $N_\theta=256$ equal slabs
$$
I_m=
\left[
-\frac{\pi}{6}+\frac{m\pi}{768},
-\frac{\pi}{6}+\frac{(m+1)\pi}{768}
\right],
\qquad
m=0,\ldots,255.
$$
- On each $I_m$, retain only the fixed active tubes $P_1:[2.48,2.52]$, $P_2:[4.30,4.46]$, $P_3:[6.78,6.92]$, and $S_1:[4.80,4.90]$.
- Prove the root-boundary sign rows and active $|J|$ floors on each tube before evaluating the tangential contributions.
- Evaluate outward intervals for $C_{P_1}(I_m)$, $C_{P_2}(I_m)$, $C_{P_3}(I_m)$, and $C_{S_1}(I_m)$ using the same active root identities as the branch-chart certificate.
- Pass the pointwise row if
$$
\min_{0\le m<256}
\left(
C_{P_1,m}^-+C_{P_2,m}^-+C_{P_3,m}^-+C_{S_1,m}^-
\right)
\ge0.05008.
$$

Fallback quadrature contract:

- If natural interval evaluation over $256$ slabs is too wide, split to $N_\theta=512$ equal slabs and shrink each active $\Delta$ enclosure by interval bisection inside its fixed tube.
- Report an outward interval for the weighted slab sum
$$
\sum_m
\int_{I_m}
\cos^2(3\theta)
\left(
C_{P_1}(\theta)+C_{P_2}(\theta)+C_{P_3}(\theta)+C_{S_1}(\theta)
\right)d\theta.
$$
- The theorem-grade rejection target is
$$
\mathcal{D}_T(I_\ast)^-\ge0.
$$
The practical lower-bound target, matching the sampled margin with slack, is
$$
\mathcal{D}_T(I_\ast)^-\ge0.04012.
$$

## Integration Notes

- Do not change the VP-1 candidate history, the branch labels, the root tubes, or the declared weight while evaluating this row.
- Do not accept a negative $\mathcal{D}_T(I_\ast)$ produced by roots outside the retained $P_1,P_2,P_3,S_1$ chart, by a Jacobian-null window, or by changing $D_{\mathrm{cert}}$.
- If the interval evaluator proves the four branch contribution targets, the weighted tangential-drive row is closed as a VP-1 failure without needing quadrature error analysis.
- If the interval evaluator cannot prove the four contribution targets but proves $\mathcal{D}_T(I_\ast)^-\ge0$ by slabbed integration, the tangential-drive row is also closed as a VP-1 failure.
- If the lower endpoint remains below zero, the tangential-drive row remains blocked even though the sampled margin is positive.

## Claim Map

- Ontology: none added.
- Derivation/closure target: reduce the weighted tangential-drive interval blocker to a pointwise lower-bound certificate on the retained $P_1,P_2,P_3,S_1$ branch chart.
- Effective summary: sampled VP-1 is a positive-drive failure, with $\mathcal{D}_T(I_\ast)\approx0.04013001776065915$; theorem-grade rejection is pending only on outward interval evaluation of the same sign.
- Speculation: none promoted.
