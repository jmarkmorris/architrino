# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair Scaled Root-Tube Cell Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md). The predecessor certified directed-rounded $z_\pm$ brackets and $J_\pm$ signs only at the finite speed/y stencil nodes. This packet upgrades the fold-pair root geometry to a finite speed/y cell cover.

It is not a fold-pair $G,D$ remainder proof and it is not full $\theta_{3-}^{-}$ collar closure.

## Taylor-Cancelled Cell Equation

The source equation used by the executable row is the shifted source equation

$$
F(\tilde\theta,\delta;\nu,+1)
=
\frac{\delta^2}{\nu^2}-2+\sin(2\tilde\theta-\delta)+\sin\delta,
$$

with

$$
\tilde\theta_f(\nu)=\theta_{3-}(\nu)+\frac{\pi}{2}.
$$

For branch sign $\varepsilon\in\{-1,+1\}$, set

$$
r_\varepsilon=\varepsilon\beta+y z,
\qquad
q_\varepsilon=r_\varepsilon+2y,
$$

so that

$$
\tilde\theta=\tilde\theta_f(\nu)-y^2,
\qquad
\delta=\delta_f(\nu)+y r_\varepsilon,
\qquad
\phi=\phi_f-yq_\varepsilon.
$$

The certified endpoint function is

$$
K_\varepsilon(y,z,\nu)
=
\frac{
F(\tilde\theta_f(\nu)-y^2,\delta_f(\nu)+y r_\varepsilon;\nu,+1)
}{y^3}.
$$

The packet does not intervalize this as raw $F/y^3$. It evaluates $K_\varepsilon$ through the Taylor-cancelled functions

$$
C_4(t)=\frac{\cos t-1+t^2/2}{t^4},
\qquad
S_3(t)=\frac{\sin t-t}{t^3},
$$

after applying the fold identities $F_f=0$, $F_{\delta,f}=0$, and $A\beta^2=2\cos\phi_f$, where $A=\frac12F_{\delta\delta,f}$. The resulting interval expression is

$$
\begin{aligned}
K_\varepsilon={}&
2\varepsilon A\beta z+yAz^2
-2\sin\phi_f(\varepsilon\beta+yz)-2\sin\phi_f y\\
&+y\sin\phi_f q_\varepsilon^4 C_4(yq_\varepsilon)
+y\sin\delta_f r_\varepsilon^4 C_4(yr_\varepsilon)\\
&-\cos\phi_f q_\varepsilon^3 S_3(yq_\varepsilon)
+\cos\delta_f r_\varepsilon^3 S_3(yr_\varepsilon).
\end{aligned}
$$

The sign row for uniqueness is the scaled denominator

$$
J_\varepsilon=\frac{F_\delta}{y}.
$$

## Cell Cover Result

The certificate covers the speed enclosure with $16$ speed cells and the collar $0\le y\le0.115$ with $64$ y cells. The branch tubes are

$$
Z_-=[-3.0,-2.6],
\qquad
Z_+=[-3.05,-2.85].
$$

Across the cover:

| Row | Certified value |
| --- | ---: |
| speed cells | $16$ |
| y cells | $64$ |
| speed/y cells | $1024$ |
| branch cells | $2048$ |
| $K_\varepsilon$ endpoint intervals | $4096$ |
| $H_\varepsilon$ endpoint intervals | $4096$ |
| minimum endpoint $K_\varepsilon$ clearance | $0.0255177449896$ |
| minimum $|J_\varepsilon|$ clearance | $0.753122074783$ |
| minimum endpoint $H_\varepsilon$ clearance | $0.43543435566$ |
| minimum $|J_\varepsilon|$ clearance on the $h$ graph | $0.742965436$ |
| maximum Taylor argument $|t|$ | $0.193990805039$ |

The signs are

$$
K_-(Z_-^{\mathrm{lo}})<0<K_-(Z_-^{\mathrm{hi}}),
\qquad
J_->0,
$$

and

$$
K_+(Z_+^{\mathrm{lo}})>0>K_+(Z_+^{\mathrm{hi}}),
\qquad
J_+<0.
$$

The resulting status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-scaled-root-tube-cell-cover-certified}.
}
$$

This closes the finite-node root-tube gap for the coalescing fold pair. The executable row now also proves the $h$-coordinate root graph described below, so the remaining fold-pair burden is no longer root existence, root-graph contraction, or $J$ sign control. The successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.md) certifies the positive-y $G,D$ quotients on that $h$ graph, [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md) certifies the sampled first-y cancellation mechanism, and the first-y coefficient packets now interval-certify the constant-through-sextic quotient coefficients through [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.md). The live burden is now the directed-rounded first-y $G,D$ septic-tail/enclosure.

## Quotient Successor Mechanism

The next fold-pair row should not bound the $G,D$ quotients by ranging freely over the broad branch tubes. Those tubes certify existence and nondegeneracy, but the quotient row must stay on the root graph. The structural identity is

$$
\partial_zK_\varepsilon=J_\varepsilon.
$$

Since this packet certifies fixed signs for $J_\varepsilon$ on every branch tube, each speed/y cell has one monotone root graph inside its certified tube. The quotient successor should therefore contract or parameterize that root graph before evaluating

$$
Q_G^{\mathrm{pair}}=
\frac{G_{\mathrm{pair}}-L}{y^2},
\qquad
Q_D^{\mathrm{pair}}=
\frac{D_{\mathrm{pair}}-L}{y^2}.
$$

For $y>0$ cells, the existing sampled-node $G,D$ interval formulas can be lifted after root-graph contraction. The first cell touching $y=0$ still requires a Taylor-cancelled quotient expression, because raw division by $y^2$ would lose the cancellation that defines the finite fold-pair limit.

The cancellation coordinate for that successor is

$$
z_\varepsilon=\gamma(\nu)+yh_\varepsilon,
\qquad
\delta_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2+y^3h_\varepsilon,
$$

where

$$
\gamma(\nu)
=
\frac{
F_{\theta\delta,f}
-F_{\delta\delta\delta,f}\beta^2/6
}{F_{\delta\delta,f}}.
$$

Define

$$
H_\varepsilon(y,h,\nu)
=
\frac{
K_\varepsilon(y,\gamma+yh,\nu)-K_\varepsilon(0,\gamma,\nu)
}{y}.
$$

Then the branch contraction can be performed in $h$ rather than in the broad $z$ tube, with the same monotonicity control inherited from

$$
\partial_hH_\varepsilon
=
\partial_zK_\varepsilon
=
J_\varepsilon.
$$

The executable row evaluates $H_\varepsilon$ by a zero-safe Taylor expression using

$$
S_5(t)=\frac{\sin t-t+t^3/6}{t^5},
\qquad
S_5(0)=\frac1{120},
$$

and certifies the branch boxes

$$
h_-\in[0.8,4.0],
\qquad
h_+\in[-2.2,0.2],
$$

with endpoint signs

$$
H_-(0.8)<0<H_-(4.0),
\qquad
J_->0,
$$

and

$$
H_+(-2.2)>0>H_+(0.2),
\qquad
J_+<0.
$$

This is the clean near-zero chart for the quotient row. It lets the successor assert the constant and first-order coefficients of $G_{\mathrm{pair}}-L$ and $D_{\mathrm{pair}}-L$ vanish before bounding the second-order coefficient and remainder.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_root\_tube\_cell\_cover=true},
$$

and

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_J\_sign\_cell\_cover=true}.
$$

It also may claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_h\_root\_graph\_cell\_cover=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_directed\_rounded\_regular\_root\_remainder=false},
$$

$$
\texttt{certifies\_directed\_rounded\_speed\_dependent\_fold\_normal\_form\_remainder=false},
\qquad
\texttt{certifies\_theta\_3minus\_left\_fold\_collar\_interval\_radius=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.sampled-node-fold-pair-scaled-interval` | directed-rounded sampled-node certified |
| `theta3minus.fold-pair-scaled-root-tube-cell-cover` | directed-rounded cell-cover certified |
| `theta3minus.fold-pair-h-root-graph-cell-cover` | directed-rounded cell-cover certified |
| `theta3minus.fold-pair-h-graph-positive-y-GD-quotient` | directed-rounded cell-cover certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-jet-cancellation` | sampled analytic jet certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md) |
| `theta3minus.fold-pair-first-y-GD-constant-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-linear-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quadratic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |
| `theta3minus.regular-root-remainder-continuous-collar` | directed-rounded open |
| `I1.regular-critical-exhaustion` | blocked by theta3minus remainder |
| `representative-cross-binary-retention` | open |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs). It emits:

- directed-rounded $K_\varepsilon$ endpoint signs on each speed/y cell;
- directed-rounded $H_\varepsilon$ endpoint signs on each speed/y cell;
- directed-rounded $J_\varepsilon$ signs on each branch tube;
- Taylor argument bounds for the $C_4,S_3,S_5$ remainder functions;
- explicit open fold-pair remainder, regular-root remainder, `I1`, quadrature, and retention rows.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.test.js) validates schema, no-fixed-speed-window discipline, cell counts, $K$ endpoint signs, $H$ endpoint signs, $J$ signs, Taylor argument bounds, overclaim rejection, and CLI write/validate behavior.
