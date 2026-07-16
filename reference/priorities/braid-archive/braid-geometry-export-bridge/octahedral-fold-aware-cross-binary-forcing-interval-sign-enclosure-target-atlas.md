# Octahedral Fold-Aware Cross-Binary Forcing Interval Sign-Enclosure Target Atlas

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas](octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.md) and consumes the fold-collar information from [octahedral-fold-aware-cross-binary-fold-square-limit-atlas](octahedral-fold-aware-cross-binary-fold-square-limit-atlas.md). The margin atlas identified the current sampled bottleneck. This packet turns that bottleneck into explicit outward-rounded interval targets and corrects the proof geometry: regular subcells must be handled in ordinary $\theta$ charts, while singular fold collars must be handled in the square coordinate.

It is an interval sign-enclosure target atlas. It does not certify interval sign topology, interval derivative enclosure, interval critical exhaustion, interval quadrature, $C_\times,m_Q,M_Q$ interval enclosures, or retained branch status.

The direct successor [octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate](octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.md) proves the conditional square-coordinate sign-transport theorem for the two singular collars and adds sampled finite-collar signs for both the transformed forcing $G=2y f_\times$ and the derivative numerator $D=\tau(yG_y-G)$. That successor still leaves outward-rounded interval collar enclosure and full interval sign topology open.

## Regular Source Equations

On regular source sheets,

$$
F_{\kappa,v}(\theta,\delta)
=
\frac{\delta^2}{v^2}-2+\sin(2\theta-\delta)+\kappa\sin\delta,
\qquad
\phi=2\theta-\delta,
$$

$$
D=F_\delta
=
\frac{2\delta}{v^2}-\cos\phi+\kappa\cos\delta,
\qquad
\delta'=-\frac{2\cos\phi}{D}.
$$

The source forcing row is

$$
B_\kappa=-\frac12(\cos\phi+\kappa\cos\delta),
$$

$$
s_{\kappa,\sigma}(\theta;v)
=
\sum_{\delta\in\mathcal R^+_{\kappa,v}(\theta)}
\frac{2\sigma B_\kappa}{v\delta^2|D|}.
$$

The representative cross-binary forcing remains

$$
f_\times(u)
=
s_{+,+}(u)-s_{+,+}(u+Q)+s_{-,+}(u)-s_{-,+}(u+Q),
\qquad
Q=\pi/2.
$$

The regular derivative enclosure target is

$$
s'_{\kappa,\sigma}
=
\sum_\delta
\frac{2\sigma}{v\delta^2|D|}
\left[
\dot B
-B\left(\frac{2\delta'}{\delta}+\frac{\dot D}{D}\right)
\right],
$$

with

$$
\dot B
=
\sin\phi+\frac12(\kappa\sin\delta-\sin\phi)\delta',
$$

$$
\dot D
=
2\sin\phi+
\left(\frac{2}{v^2}-\sin\phi-\kappa\sin\delta\right)\delta'.
$$

These formulas define the regular-subcell interval problem. They are not valid as ordinary bounded-$\theta$ derivative controls through a projected fold singularity.

## Fold-Collar Sign Transport Lemma

The sampled theta-Lipschitz route fails near the fold-adjacent ends because $f_\times$ has square-root fold behavior and $f'_\times$ is unbounded there. The fold-square packet supplies the right coordinate.

For a folded side,

$$
\theta=\theta_f-y^2
\quad\text{or}\quad
\theta=\theta_f+y^2,
\qquad
y>0,
$$

and

$$
2y\,f_\times(\theta_f\pm y^2)\to L.
$$

For the derivative sign, the interval successor must also control

$$
D(y)=\tau\left(y\frac{d}{dy}\left[2y\,f_\times(\theta_f+\tau y^2)\right]-2y\,f_\times(\theta_f+\tau y^2)\right),
$$

because

$$
f'_\times(\theta_f+\tau y^2)=\frac{D(y)}{4y^3}.
$$

Then

$$
f_\times(\theta_f\pm y^2)\sim\frac{L}{2y}.
$$

For the left folded side,

$$
\frac{d}{d\theta}f_\times(\theta_f-y^2)
\sim
\frac{L}{4y^3},
$$

and for the right folded side,

$$
\frac{d}{d\theta}f_\times(\theta_f+y^2)
\sim
-\frac{L}{4y^3}.
$$

Thus an interval proof of $L<0$, with a collar bound that keeps the transformed integrand negative for $0<y\le\sqrt{\varepsilon_F}$, transports the forcing sign. Transporting the derivative sign additionally requires the corresponding sign of $D(y)$. With both $G=2y f_\times$ and $D$ controlled, the singular collar signs are:

| Fold collar | Square-limit sign | Forcing sign for small $y$ | Derivative sign for small $y$ |
| --- | ---: | ---: | ---: |
| $\theta_{3-}^{-}$, $\theta=\theta_{3-}-y^2$ | $L_{3-}^{-}<0$ | $f_\times<0$ | $f'_\times<0$ |
| $\theta_{2+}^{+}$, $\theta=\theta_{2+}+y^2$ | $L_{2+}^{+}<0$ | $f_\times<0$ | $f'_\times>0$ |

The imported sampled limits are

$$
L_{3-}^{-}\approx-0.192715477558,
\qquad
L_{2+}^{+}\approx-0.325542989718.
$$

This is the main mathematical advancement in this packet: the interval sign proof is no longer asked to force a bounded $\theta$-derivative through a fold. It has a regular chart away from the fold and a square-coordinate collar at the fold.

## Interval Target Rows

With $v_*\in[3.02156,3.02157]$ and estimate $v_*\approx3.021564740248$, the staged interval sign targets are:

| Target family | Count | Role |
| --- | ---: | --- |
| Point sign enclosures | 13 | Preserve the signed forcing and derivative witness rows from the margin atlas. |
| Zero isolation brackets | 3 | Preserve `I1.f1`, `I2.d1`, and `I2.f1`. |
| Regular-subcell sign rows | 5 | Prove the required signs on compact regular subcells away from folds. |
| Fold-collar sign transport rows | 2 | Use $2y f_\times(\theta_f\pm y^2)$ to transport signs through the singular fold collars. |
| Theta-order rows | 4 | Preserve bracket widths and crest-before-zero order. |
| Value-budget import rows | 1 | Preserve the full six-candidate ordering budget from the finite-candidate reduction. |

The first outward-rounded enclosure radius target is half the current bottleneck budget:

$$
\boxed{
0.5\cdot 0.000472358401387
=
0.000236179200694.
}
$$

This is not a claim that such outward-rounded enclosures have been computed. It is the first radius target that an interval arithmetic successor must beat.

## Subcell Predicate Map

The interval proof should be split as follows:

| Region | Required interval predicate |
| --- | --- |
| $I_1$ regular interior | Prove $f'_\times<0$ up to the left fold collar and preserve $f_\times(a_1)>0>f_\times(b_1)$. |
| $\theta_{3-}^{-}$ fold collar | Prove $2y f_\times(\theta_{3-}-y^2)<0$ for the collar, giving $f_\times<0$ and $f'_\times<0$ near the fold. |
| $\theta_{3-}^{+}$ regular side | Prove the ordinary finite forcing side remains positive when entering $I_2$. |
| $I_2$ regular interior | Prove the derivative-turn bracket, positive crest, $f_\times(a_2)>0>f_\times(b_2)$, and negative derivative after the turn. |
| $\theta_{2+}^{-}$ regular side | Prove the ordinary finite forcing side remains negative when leaving $I_2$. |
| $\theta_{2+}^{+}$ fold collar | Prove $2y f_\times(\theta_{2+}+y^2)<0$, giving $f_\times<0$ and $f'_\times>0$ near the fold. |
| $I_3$ regular interior | Prove $f'_\times>0$ and $f_\times<0$ through $Q$. |

Once these rows are interval-certified on one shared source atlas, the finite-candidate theorem can be upgraded from sampled topology to interval critical exhaustion. The candidate set remains

$$
\{0,u_1,\theta_{3-},u_2,\theta_{2+},Q\}.
$$

The sampled value order to preserve by interval quadrature remains

$$
A(Q)<A(\theta_{3-})<A(\theta_{2+})<A(u_2)<A(0)<A(u_1).
$$

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.mjs) emits:

- predecessor validation for the forcing sign-topology margin atlas and fold-square limit atlas;
- no-fixed-speed-window target parameters;
- thirteen point sign enclosure targets;
- three zero isolation targets;
- five regular-subcell sign targets;
- two fold-collar square-coordinate sign transport targets;
- four theta-order targets;
- one imported value-budget target;
- the bottleneck-derived first outward-rounded radius target;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.test.js) verifies predecessor validation, no speed-window imposition, target-row counts and names, bottleneck preservation, fold-collar sign transport, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet may claim:

$$
\texttt{emits\_interval\_sign\_enclosure\_targets=true},
$$

$$
\texttt{stages\_fold\_collar\_square\_coordinate\_sign\_targets=true},
$$

and

$$
\texttt{proves\_fold\_collar\_sign\_transport\_formula=true}.
$$

It does not claim:

$$
\texttt{certifies\_interval\_sign\_topology=false},
\qquad
\texttt{certifies\_interval\_derivative\_enclosure=false},
\qquad
\texttt{certifies\_interval\_critical\_exhaustion=false},
$$

$$
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{certifies\_C\_m\_Q\_M\_Q\_interval\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{source-atlas-aware-forcing-interval-sign-enclosure-target-atlas-staged}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it corrects the interval proof geometry and states the fold-collar sign transport lemma. It should not be promoted into reader-facing AAA prose until outward-rounded interval enclosures are actually produced for the regular subcells and fold collars, or until this target atlas is consumed by a retained branch certificate.
