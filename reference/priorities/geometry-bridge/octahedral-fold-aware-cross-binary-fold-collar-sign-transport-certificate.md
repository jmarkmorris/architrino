# Octahedral Fold-Aware Cross-Binary Fold-Collar Sign-Transport Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas](octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md). The predecessor staged the square-coordinate fold-collar proof geometry. This packet closes the local sign-transport theorem for the two singular collars and records sampled finite-collar evidence on the same source atlas.

It is a conditional theorem plus sampled certificate. It does not certify interval fold-collar enclosure, interval sign topology, interval derivative enclosure on regular subcells, interval critical exhaustion, interval quadrature, $C_\times,m_Q,M_Q$ interval enclosures, receiver-orbit clock-length return, or retained branch status.

The direct successor [octahedral-fold-aware-cross-binary-source-atlas-interval-implication](octahedral-fold-aware-cross-binary-source-atlas-interval-implication.md) combines this $G,D$ collar theorem with the source-atlas quarter-cell formula and the interval sign-enclosure target atlas. It states the exact implication from shared source-atlas interval predicates to critical exhaustion and exposes the three bridge predicates that must be certified before the finite-candidate row can become theorem-grade.

## Square-Coordinate Transport Theorem

Let the folded side be written as

$$
\theta=\theta_f+\tau y^2,
\qquad
y>0,
\qquad
\tau\in\{-1,+1\},
$$

where $\tau=-1$ on a left folded collar and $\tau=+1$ on a right folded collar. Define

$$
G(y)=2y\,f_\times(\theta_f+\tau y^2)
$$

and the derivative-transport numerator

$$
D(y)=\tau\left(y\frac{dG}{dy}-G(y)\right).
$$

Then

$$
\boxed{
f_\times(\theta_f+\tau y^2)=\frac{G(y)}{2y},
\qquad
f'_\times(\theta_f+\tau y^2)=\frac{D(y)}{4y^3}.
}
$$

Thus a certified collar proof cannot use $G<0$ alone to infer the derivative sign. It must control both $G$ and $D$. If $G<0$ and $D<0$ on the left collar, then

$$
f_\times(\theta_{3-}-y^2)<0,
\qquad
f'_\times(\theta_{3-}-y^2)<0.
$$

If $G<0$ and $D>0$ on the right collar, then

$$
f_\times(\theta_{2+}+y^2)<0,
\qquad
f'_\times(\theta_{2+}+y^2)>0.
$$

When $G(y)\to L\ne0$, the asymptotic form is

$$
f_\times(\theta_f+\tau y^2)\sim\frac{L}{2y},
\qquad
f'_\times(\theta_f+\tau y^2)\sim-\frac{\tau L}{4y^3}.
$$

This is the mathematical advancement in this packet: the fold collar is no longer treated as a failed $\theta$-Lipschitz endpoint. It is a square-coordinate sign-transport problem with explicit forcing and derivative numerators.

## Certified Sampled Collar Rows

The certificate imports the positive speed-ratio zero enclosure

$$
v_*\in[3.02156,3.02157],
\qquad
v_*\approx3.021564740248,
$$

and imposes no fixed speed band.

The two singular collar rows are:

| Collar | $\tau$ | Square limit $L$ | Target radius $|L|/2$ | Sampled $G$ sign | Sampled $D$ sign | Transported signs |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| $\theta_{3-}^{-}$, $\theta=\theta_{3-}-y^2$ | $-1$ | $-0.192715477558$ | $0.096357738779$ | $-$ | $-$ | $f_\times<0$, $f'_\times<0$ |
| $\theta_{2+}^{+}$, $\theta=\theta_{2+}+y^2$ | $+1$ | $-0.325542989718$ | $0.162771494859$ | $-$ | $+$ | $f_\times<0$, $f'_\times>0$ |

The sampled finite-collar checks use

$$
y\in\{0.1,0.07,0.05,0.03,0.02,0.01,0.007,0.005,0.003,0.002,0.001\}.
$$

For $\theta_{3-}^{-}$ the smallest sampled square-weighted sign margin is about

$$
0.183416337450,
$$

and for $\theta_{2+}^{+}$ it is about

$$
0.325659851585.
$$

The derivative-tail samples use the four smallest $y$ values. They confirm the expected signs of both $f'_\times$ and $D=4y^3f'_\times$ on the sampled tail.

## What This Removes

The failed proof route was to bound $f'_\times$ as an ordinary $\theta$ derivative through the projected folds. That is the wrong geometry: $f_\times$ has square-root fold behavior, and $f'_\times$ has a $y^{-3}$ singularity. The correct proof obligation is instead:

$$
G(y)<0
\quad\text{and}\quad
D(y)\lessgtr0
$$

on certified square-coordinate collars, plus ordinary regular-subcell enclosures away from the folds.

This certificate therefore removes the need for a bounded $\theta$-derivative at the singular endpoints. It does not remove the need for outward-rounded interval enclosures.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.mjs) emits:

- predecessor validation for the interval sign-enclosure target atlas and fold-square limit atlas;
- no-fixed-speed-window collar parameters;
- the $G$ and $D$ transport theorem;
- two singular collar rows;
- sampled finite-collar $G$ signs through the square-weighted forcing rows;
- derivative-tail signs for both $f'_\times$ and $D=4y^3f'_\times$;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.test.js) verifies predecessor validation, speed-window removal, theorem identities, singular collar row constants, finite-collar sampled signs, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_conditional\_fold\_collar\_sign\_transport\_theorem=true},
$$

$$
\texttt{certifies\_sampled\_singular\_collar\_forcing\_signs=true},
$$

$$
\texttt{certifies\_sampled\_singular\_collar\_derivative\_tail\_signs=true},
$$

and

$$
\texttt{certifies\_sampled\_singular\_collar\_transport\_D\_signs=true}.
$$

It does not claim:

$$
\texttt{certifies\_interval\_fold\_collar\_enclosure=false},
\qquad
\texttt{certifies\_interval\_fold\_limit\_enclosure=false},
\qquad
\texttt{certifies\_interval\_sign\_topology=false},
$$

$$
\texttt{certifies\_interval\_derivative\_enclosure=false},
\qquad
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
$$

$$
\texttt{certifies\_C\_m\_Q\_M\_Q\_interval\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{sampled-source-atlas-aware-fold-collar-sign-transport-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it closes the local square-coordinate sign-transport theorem and replaces a failed bounded-$\theta$ derivative idea with the correct $G,D$ collar proof obligation. It should not be promoted into reader-facing AAA prose until outward-rounded interval collar enclosures and regular-subcell sign enclosures are produced on one shared source atlas, or until the result is consumed by a retained branch certificate.
