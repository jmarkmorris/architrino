# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair Scaled Sampled-Node Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.md). The predecessor put the two coalescing `3-` source roots into the scaled chart

$$
p=\frac{\delta-\delta_f}{y},
\qquad
\theta=\theta_{3-}(\nu)-y^2.
$$

This packet upgrades the finite speed/collar stencil nodes from ordinary sampled roots to directed-rounded interval brackets in the scaled $z$ coordinate. It does not itself certify a continuous root-tube cell cover or the fold-pair remainder; the root-tube successor now closes the root-geometry part and leaves the fold-pair $G,D$ quotient remainder open.

## Sampled-Node Interval Row

For each predecessor speed/y node and each fold-pair branch, the packet refines the nearby source root and opens a symmetric bracket

$$
z_\pm\in[z_{\pm,\mathrm{root}}-10^{-5},z_{\pm,\mathrm{root}}+10^{-5}].
$$

At the two bracket endpoints it evaluates the scaled source equation

$$
K_\pm(z)
=
\frac{
F(\nu,\theta_{3-}(\nu)-y^2,\delta_f\pm\beta y+y^2z)
}{y^3}
$$

with outward-rounded interval arithmetic. It also encloses

$$
J_\pm=\frac{F_\delta}{y}
$$

across each $z$ bracket. The signs are certified at every sampled node:

$$
J_->0,
\qquad
J_+<0.
$$

This proves one fold-pair root in each sampled-node $z$ bracket by endpoint sign change and sign-definite $J_\pm$.

## Result

The directed-rounded sampled-node interval replay emits:

| Row | Certified value |
| --- | ---: |
| speed/y sample nodes | $95$ |
| $z$ endpoint intervals | $380$ |
| minimum endpoint $K$ clearance | $4.21884749358\times10^{-6}$ |
| minimum $|J_\pm|$ clearance | $0.773505505914$ |
| $\max |R_G^{\mathrm{pair}}|/y^2$ interval upper | $0.179366300118$ |
| $\max |R_D^{\mathrm{pair}}|/y^2$ interval upper | $0.881942400111$ |

The resulting status is

$$
\boxed{
\texttt{directed-rounded-sampled-node-theta3minus-fold-pair-scaled-interval-certified}.
}
$$

The $R_D^{\mathrm{pair}}/y^2$ interval upper is wider than the sampled quotient because this packet uses a finite $z$ interval rather than a point root. It still gives a useful budget row: at the outer collar radius,

$$
0.881942400111(0.115)^2<0.012,
$$

well below the certified negative-limit margin $0.192653693867$.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_sampled\_node\_fold\_pair\_z\_brackets=true},
$$

and

$$
\texttt{certifies\_directed\_rounded\_sampled\_node\_fold\_pair\_GD\_quotient\_enclosures=true}.
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
| `theta3minus.sampled-fold-pair-scaled-stencil` | sampled-stencil certified |
| `theta3minus.sampled-node-fold-pair-z-brackets` | directed-rounded certified |
| `theta3minus.sampled-node-fold-pair-GD-quotient-enclosures` | directed-rounded certified |
| `theta3minus.fold-pair-scaled-root-tube-cell-cover` | directed-rounded cell-cover certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md) |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | directed-rounded open |
| `theta3minus.regular-root-remainder` | directed-rounded open |
| `I1.regular-critical-exhaustion` | blocked by theta3minus remainder |
| `representative-cross-binary-retention` | open |

The root-tube successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md) now replaces the finite-node $z_\pm,J_\pm$ replay with a directed-rounded speed/y cell cover. The remaining fold-pair proof is no longer a root-finding question. It is the $G,D$ quotient remainder row over the certified root tubes.

## Continuous-Cell Formula Target

For a continuous cell proof, the branch variable should be written without dividing a raw interval hull by $y^3$. Let $\varepsilon\in\{-1,+1\}$ and set

$$
r_\varepsilon=\varepsilon\beta+y z,
\qquad
q_\varepsilon=r_\varepsilon+2y,
$$

so that

$$
\delta=\delta_f+y r_\varepsilon,
\qquad
\phi=\phi_f-y q_\varepsilon.
$$

With

$$
C_4(t)=\frac{\cos t-1+t^2/2}{t^4},
\qquad
S_3(t)=\frac{\sin t-t}{t^3},
$$

the exact numerator of

$$
K_\varepsilon(y,z,\nu)
=
\frac{
F(\tilde\theta_f(\nu)-y^2,\delta_f(\nu)+y r_\varepsilon;\nu,+1)
}{y^3},
\qquad
\tilde\theta_f(\nu)=\theta_{3-}(\nu)+\frac{\pi}{2}
$$

can be evaluated through the Taylor-cancelled identity

$$
\begin{aligned}
F-F_f
={}&
\frac{2\delta_f y r_\varepsilon+y^2r_\varepsilon^2}{\nu^2}
-\cos\phi_f\,yq_\varepsilon
-\frac12\sin\phi_f\,y^2q_\varepsilon^2
-\cos\phi_f\,y^3q_\varepsilon^3S_3(yq_\varepsilon)
+\sin\phi_f\,y^4q_\varepsilon^4C_4(yq_\varepsilon)\\
&+\cos\delta_f\,yr_\varepsilon
-\frac12\sin\delta_f\,y^2r_\varepsilon^2
+\cos\delta_f\,y^3r_\varepsilon^3S_3(yr_\varepsilon)
+\sin\delta_f\,y^4r_\varepsilon^4C_4(yr_\varepsilon).
\end{aligned}
$$

The continuous-cell certificate should algebraically use the fold identities $F_f=0$, $F_{\delta,f}=0$, and $-F_{\theta,f}+\frac12F_{\delta\delta,f}\beta^2=0$ before interval division by $y^3$. That is the stable route from finite-node $z_\pm$ brackets to a real speed/y cell cover; direct interval evaluation of $F/y^3$ should remain an audit row only.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.mjs). It emits:

- directed-rounded sampled-node $z_\pm$ endpoint brackets;
- sign-definite $J_\pm=F_\delta/y$ intervals on each bracket;
- interval enclosures for $R_G^{\mathrm{pair}}/y^2$ and $R_D^{\mathrm{pair}}/y^2$ at the sampled nodes;
- explicit open continuous-collar, regular-root, `I1`, quadrature, and retention rows.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, endpoint brackets, $J$ signs, quotient budgets, overclaim rejection, and CLI write/validate behavior.
