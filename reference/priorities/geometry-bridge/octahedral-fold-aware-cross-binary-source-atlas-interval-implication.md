# Octahedral Fold-Aware Cross-Binary Source-Atlas Interval Implication

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction](octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.md), [octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas](octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md), and [octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate](octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.md). It states the source-atlas interval implication theorem that the next closure proof must use, and it exposes a logical gap that was still implicit in the target atlas.

The packet is not another physics requirement. It is a sufficiency theorem for the existing representative quarter-profile proof:

$$
\text{shared source-atlas interval predicates}
\quad\Longrightarrow\quad
\text{interval critical exhaustion and finite candidate reduction}.
$$

It does not certify interval sign topology, interval critical exhaustion, interval quadrature, $C_\times,m_Q,M_Q$ interval enclosures, receiver-orbit clock-length return, or retained branch status.

## Source-Atlas Formula Scope

The quarter-cell reduction fixes the common source-atlas formula

$$
f_\times(u)
=
s_{+,+}(u)-s_{+,+}(u+Q)+s_{-,+}(u)-s_{-,+}(u+Q),
\qquad
Q=\pi/2,
$$

with source roots determined by

$$
F_{\kappa,v}(\theta,\delta)
=
\frac{\delta^2}{v^2}-2+\sin(2\theta-\delta)+\kappa\sin\delta=0.
$$

The source atlas partitions the representative quarter profile into three regular cells and two fold endpoints:

$$
0<\theta_{3-}<\theta_{2+}<Q.
$$

The current closure target is therefore not a global unconstrained profile proof. It is a finite source-atlas interval problem on:

$$
I_1,\quad
\theta_{3-},\quad
I_2,\quad
\theta_{2+},\quad
I_3.
$$

## Interval Implication Theorem

On the regular cells,

$$
A'_\times=f_\times,
\qquad
A''_\times=f'_\times.
$$

At the singular collars, use

$$
G(y)=2y\,f_\times(\theta_f+\tau y^2),
\qquad
D(y)=\tau(yG_y-G),
$$

so

$$
f_\times=\frac{G}{2y},
\qquad
f'_\times=\frac{D}{4y^3}.
$$

The conditional theorem is:

> If one shared source-atlas interval certificate proves the regular-subcell sign predicates, the fold-collar $G,D$ sign predicates, the bridge positivity/negativity predicates below, theta-order enclosures, and candidate-value quadrature enclosures, then the primitive extrema of $A_\times$ on $[0,Q]$ are exhausted by
>
> $$
> \{0,u_1,\theta_{3-},u_2,\theta_{2+},Q\}.
> $$
>
> Candidate-value intervals below the imported full-order budget then certify the sampled order of $C_\times,m_Q,M_Q$.

The proof is one-dimensional calculus:

1. $f'_\times<0$ and a signed forcing bracket give one zero in $I_1$.
2. $I_2$ entry positivity, turn-bridge positivity, post-turn monotonicity, and the signed later forcing bracket give one zero in $I_2$.
3. $f_\times<0$ on $I_3$ excludes regular zeros there.
4. The fold endpoints are included as boundary candidates because ordinary $\theta$ differentiation fails there.
5. The $G,D$ collar identities replace the invalid bounded-$\theta$ derivative assumption at the folds.

## Bridge Predicates Exposed

The interval target atlas already staged point signs, zero isolation rows, regular-subcell rows, fold-collar targets, theta-order rows, and one value-budget row. This implication packet shows that theorem-grade critical exhaustion also needs three bridge predicates stated explicitly:

| Bridge predicate | Needed sign | Why it is necessary |
| --- | ---: | --- |
| `theta_3plus.regular-entry-positive` | $f_\times>0$ | I2 uniqueness needs positivity immediately after $\theta_{3-}$; a positive crest sample alone does not exclude an early hidden zero. |
| `I2.turn-bridge-forcing-positive` | $f_\times>0$ | The derivative-turn bracket must not hide a forcing zero before the later signed forcing bracket. |
| `theta_2minus.regular-exit-negative` | $f_\times<0$ | The post-zero negative branch must transport to the regular side before $\theta_{2+}$, excluding a hidden return before the fold endpoint. |

These are not new physics gates. They are the missing logical links needed for the already-staged interval topology proof to imply the finite-candidate theorem.

The direct successor [octahedral-fold-aware-cross-binary-bridge-predicate-certificate](octahedral-fold-aware-cross-binary-bridge-predicate-certificate.md) proves the regular bridge propagation lemma for these rows and attaches sampled sign-bracket witnesses to all three bridge predicates. The follow-on [octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction](octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.md) reduces the theorem-grade bridge proof to five endpoint forcing enclosures and two imported $I_2$ derivative-sign enclosures. The finite closure successor [octahedral-fold-aware-cross-binary-finite-interval-closure-reduction](octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.md) composes those bridge rows back into this implication theorem, leaving thirty-three finite row families as the remaining source-atlas interval proof burden. Together these packets close the sampled bridge gap and make the interval bridge gap finite, but they still leave actual outward-rounded endpoint, derivative, regular-cell, fold-collar, and quadrature enclosures open.

## Current Bottleneck

The imported sign-topology target still has the sampled bottleneck

$$
\texttt{I1.forcing-bracket},
$$

with sampled margin

$$
0.000472358401387,
$$

and first outward-rounded radius target

$$
0.000236179200694.
$$

The full six-candidate value-ordering budget remains

$$
0.0004836066205.
$$

Thus the next closure proof is sharply finite: prove the thirty-three finite row families on the same source atlas, with the bridge endpoint rows kept separate until an interval-object equivalence certificate identifies any overlap with existing point-sign rows.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-source-atlas-interval-implication.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-source-atlas-interval-implication.mjs) emits:

- predecessor validation for the source-atlas quarter-cell reduction, interval sign-enclosure target atlas, and fold-collar sign-transport certificate;
- no-fixed-speed-window interval implication parameters;
- the source-atlas formula scope and three quarter cells;
- the conditional interval critical-exhaustion implication theorem;
- three regular-subcell implication rows;
- two fold-collar $G,D$ implication rows;
- three explicit bridge predicates;
- the imported value-budget implication;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-source-atlas-interval-implication.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-source-atlas-interval-implication.test.js) verifies predecessor validation, speed-window removal, formula-scope import, target counts, bottleneck preservation, theorem statement, fold-collar $G,D$ rows, bridge predicate exposure, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_conditional\_interval\_implication\_theorem=true},
$$

and

$$
\texttt{identifies\_missing\_bridge\_predicates=true}.
$$

It does not claim:

$$
\texttt{certifies\_interval\_fold\_collar\_enclosure=false},
\qquad
\texttt{certifies\_interval\_sign\_topology=false},
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
\texttt{source-atlas-aware-interval-implication-theorem-stated}.
}
$$

## Promotion Decision

This packet is `priority-only` and classified as `defer with blocker`. The theorem is reader-facing mathematics, but it should not be promoted into `content/markdown/aaa` until the bridge predicates and outward-rounded interval enclosures are actually certified, or until a retained branch certificate consumes this implication theorem.
