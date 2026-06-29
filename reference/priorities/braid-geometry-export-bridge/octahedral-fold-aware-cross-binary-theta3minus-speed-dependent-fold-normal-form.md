# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold Normal Form

Promotion status: `priority-only`.

This packet is the direct theorem target after [octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure](octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.md). The compact complement packet closed the ordinary-$\theta$ interval rows away from the $\theta_{3-}$ fold, but it exposed that the fold collar cannot be closed as a fixed-reference collar across the speed enclosure.

This packet now has an executable sampled certificate. It does not close the interval fold-collar radius. It moves the collar into the correct chart, verifies the sampled normal-form sign margins there, and reduces the next theorem-grade row to a directed-rounded remainder proof.

## Fixed-Collar Obstruction

The fixed-reference collar

$$
\theta=\theta_{3-}-y^2,
\qquad
\theta_{3-}=0.997370655243,
$$

does not remain on one folded side for every speed in

$$
\nu\in[3.02156,3.02157].
$$

The sampled endpoint fold locations are

$$
\theta_{3-}(3.02156)\approx0.997377676237,
\qquad
\theta_{3-}(3.02157)\approx0.997362865339.
$$

Therefore the fixed collar crosses the upper-speed fold when

$$
y<
y_{\mathrm{cross}}
=
\sqrt{0.997370655243-0.997362865339}
\approx
0.00279103994955.
$$

This is why a proof in the fixed chart is not a uniform collar proof. The correct collar chart must move with the fold:

$$
\boxed{
\theta=\theta_{3-}(\nu)-y^2.
}
$$

## Normal-Form Sign Target

In the speed-dependent chart define

$$
G(y,\nu)=2y f_\times(\theta_{3-}(\nu)-y^2;\nu)
$$

and, on the left collar,

$$
D(y,\nu)=G(y,\nu)-y\partial_yG(y,\nu).
$$

Then the transported identities are

$$
f_\times(\theta_{3-}(\nu)-y^2;\nu)=\frac{G(y,\nu)}{2y},
$$

and

$$
f'_\times(\theta_{3-}(\nu)-y^2;\nu)=\frac{D(y,\nu)}{4y^3}.
$$

Thus the collar row needed by `I1` regular critical exhaustion is

$$
\boxed{
G(y,\nu)<0,
\qquad
D(y,\nu)<0
\quad
\text{for }0<y\le0.115,\;\nu\in[3.02156,3.02157].
}
$$

The fold-square atlas gives the central normal-form constants for the folded source row:

| Constant | Value |
| --- | ---: |
| $L$ | $-0.192715477558$ |
| $\delta_f$ | $3.296355158443$ |
| $\phi_f$ | $1.839978805633$ |
| $F_\theta$ | $-0.531886889080$ |
| $F_{\delta\delta}$ | $-0.590781619939$ |
| $B_f$ | $0.626995805987$ |
| $\alpha=-2F_\theta/F_{\delta\delta}$ | $-1.800620977799$ |

The theorem target is an interval version of

$$
G(y,\nu)=L(\nu)+R_G(y,\nu),
\qquad
D(y,\nu)=L(\nu)+R_D(y,\nu),
$$

with

$$
L_+<0,
\qquad
|R_G(y,\nu)|<-L_+,
\qquad
|R_D(y,\nu)|<-L_+.
$$

This proves the signs of both the forcing and the transported derivative without trying to bound the singular ordinary-$\theta$ derivative directly.

A sampled endpoint replay of the same normal-form formula gives

$$
L(3.02156)\approx-0.192718445926,
\qquad
L(3.02157)\approx-0.192712184631.
$$

This is not yet an interval enclosure, but it shows the likely margin: the speed-endpoint drift in $L$ is about $6.3\times10^{-6}$, far smaller than the negative fold-limit margin.

The directed-rounded successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.md) now upgrades this limiting row. It proves the speed-dependent fold endpoint bracket

$$
3.29632\le\delta_f(\nu)\le3.29639
$$

with endpoint signs and $E_\delta>0$, then encloses

$$
L(\nu)\in[-0.192777102773,-0.192653693867].
$$

Thus the remaining theorem-grade burden is no longer the sign of $L$. It is the directed-rounded proof that $G-L$ and $D-L$ stay inside that negative margin on the moving collar.

## Sampled Moving-Collar Certificate

The executable artifact evaluates the speed-dependent fold row at

$$
\nu\in
\{3.02156,3.0215625,3.021564740248,3.0215675,3.02157\}
$$

and the finite collar samples

$$
y\in
\{0.115,0.1,0.07,0.05,0.03,0.02,0.01,0.007,0.005,0.003,0.002,0.001\}.
$$

On this grid:

- every sampled fold row has $\alpha<0$, so the folded side is left;
- every sampled limit $L(\nu)$ is negative;
- every sampled moving-collar $G(y,\nu)$ is negative;
- every sampled moving-collar $D(y,\nu)$ is negative;
- the source-root signature remains `1,3,1,1`.

The sampled margins are:

$$
\min |L(\nu)|\approx0.192712184631,
$$

$$
\min |G(y,\nu)|\approx0.182011106818,
$$

and

$$
\min |D(y,\nu)|\approx0.192695535182.
$$

This is stronger than the previous fixed-collar diagnostic because the fold location now moves with $\nu$. It is still a sampled certificate, not a directed-rounded interval proof.

## Required Interval Ingredients

The proof needs:

- directed-rounded remainder bounds for $G-L$ and $D-L$ using the already-certified fold endpoint bracket and negative $L$ interval;
- two folded root branches

$$
\delta_\pm(y,\nu)
=
\delta_f(\nu)\pm\sqrt{|\alpha(\nu)|}\,y+y^2z_\pm(y,\nu),
$$

with interval bounds for $z_\pm$ and $y\partial_yz_\pm$;
- a denominator separation bound

$$
|F_\delta(\theta_{3-}(\nu)-y^2,\delta_\pm(y,\nu);\nu)|
\ge
m_\delta y;
$$

- regular-root residual bounds for all nonfolded source-root branches, so their contributions to $G$ and $D$ remain smaller than the fold-limit margin.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_sampled\_speed\_dependent\_fold\_normal\_form\_margin=true},
$$

and

$$
\texttt{certifies\_sampled\_speed\_dependent\_moving\_collar\_GD\_signs=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_speed\_dependent\_fold\_normal\_form\_remainder=false},
$$

$$
\texttt{certifies\_theta\_3minus\_left\_fold\_collar\_interval\_radius=false},
\qquad
\texttt{certifies\_I1\_complement\_sign\_interval\_enclosures=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{sampled-speed-dependent-theta3minus-fold-normal-form-certified}.
}
$$

The directed-rounded fold-limit successor status is

$$
\texttt{directed-rounded-theta3minus-fold-limit-interval-certified}.
$$

The sampled remainder-budget successor status is

$$
\texttt{sampled-theta3minus-remainder-budget-feasibility-certified}.
$$

The sampled fold-pair scaled-stencil successor status is now

$$
\texttt{receiver-normal-zero-bracket-restart-required}.
$$

The directed-rounded sampled-node fold-pair successor status is now

$$
\texttt{receiver-normal-zero-bracket-restart-required}.
$$

The directed-rounded fold-pair root-tube cell-cover successor status is

$$
\texttt{directed-rounded-theta3minus-fold-pair-scaled-root-tube-cell-cover-certified}.
$$

The sampled regular-root stencil successor status is

$$
\texttt{sampled-theta3minus-regular-root-stencil-certified}.
$$

The directed-rounded sampled-node regular-root successor status is

$$
\texttt{directed-rounded-sampled-node-theta3minus-regular-root-interval-certified}.
$$

The directed-rounded regular-root cell-cover successor status is

$$
\texttt{directed-rounded-theta3minus-regular-root-cell-cover-certified}.
$$

The directed-rounded regular-root complement-slab successor status is

$$
\texttt{directed-rounded-theta3minus-regular-root-complement-slab-exclusion-certified}.
$$

These successors sharpen the theorem target: on the sampled collar, the fold-pair residual is $O(y^2)$, while the regular-root residual is $R_G^{\mathrm{reg}}=O(y)$ and $R_D^{\mathrm{reg}}=O(y^3)$. The fold-pair side now has a directed-rounded speed/y cell cover for the Taylor-cancelled $K_\varepsilon$ endpoint signs, the $h$-coordinate root graph, and $J_\varepsilon$ signs, with minimum endpoint $K_\varepsilon$ clearance $0.0255177449896$, minimum endpoint $H_\varepsilon$ clearance $0.43543435566$, and minimum $|J_\varepsilon|$ clearance $0.742965436$ on the $h$ graph. It also has a directed-rounded positive-y $G,D$ quotient cover on $1008$ cells, with minimum denominator positive clearance $25.1505521458$ and no raw zero-cell $y^{-2}$ division. The sampled first-y jet witness proves the cancellation mechanism at the speed-cell endpoints, and the first-y coefficient chain now directed-rounded certifies $Q_G(0)>0$, $Q_D(0)<0$, $Q_{G,1}$ through $Q_{G,6}$, and $Q_{D,1}$ through $Q_{D,6}$, leaving a septic-tail budget above $1420531798760000000$ on the first y cell. The regular-root side now has a directed-rounded speed/y cell cover for the four named regular-sheet quotient rows, with minimum endpoint $F$ clearance $0.0000290544619118$, minimum $|F_\delta|$ clearance $0.581059952407$, $\max |R_G^{\mathrm{reg}}|/y\le0.0880368563612$, and $\max |R_D^{\mathrm{reg}}|/y^3\le0.602156573611$. The hybrid raw-$F$/fold-$p$ complement-slab packet closes the regular-root complement with minimum raw $F$ clearance $0.0000273284209642$ and minimum scaled fold-$p$ $F/y^2$ clearance $0.000252834825122$. The directed-rounded successor should close the first-y-cell $G,D$ septic-tail bound over the certified $h$ root graph.

The successor row is

$$
\texttt{theta\_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required}.
$$

Once this row proves $G<0$ and $D<0$ through the speed-dependent collar, the compact complement interval rows and the `I1.f1` unique zero can compose into `I1` regular critical exhaustion.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.mjs). It emits:

- the speed-dependent $\theta_{3-}(\nu)$ fold rows;
- sampled normal-form constants $F_\theta$, $F_{\delta\delta}$, $B_f$, $\alpha$, $\beta$, and $L$;
- moving-collar $G,D$ rows in the chart $\theta=\theta_{3-}(\nu)-y^2$;
- the fixed-speed $D=G-yG_y$ transport identity;
- explicit non-interval, non-retention, and non-overclaim boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.test.js) validates schema, no-fixed-speed-window discipline, moving fold endpoint behavior, sampled $L<0$, sampled moving-collar $G,D<0$, root-signature preservation, open interval boundary, overclaim rejection, and CLI write/validate behavior.
