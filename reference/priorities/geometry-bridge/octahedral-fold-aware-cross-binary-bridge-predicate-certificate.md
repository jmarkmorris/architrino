# Octahedral Fold-Aware Cross-Binary Bridge-Predicate Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-source-atlas-interval-implication](octahedral-fold-aware-cross-binary-source-atlas-interval-implication.md) and [octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate](octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.md). The interval implication packet exposed three bridge predicates that were still open. This packet proves the regular bridge propagation lemma and attaches sampled source-atlas witness rows to those predicates.

It is a sampled bridge-predicate certificate. It is not an interval bridge-predicate enclosure, not an interval sign-topology proof, not an interval quadrature certificate, and not a retained branch.

## Regular Bridge Propagation Lemma

On a compact regular source-atlas bridge interval $[a,b]$, the ordinary one-dimensional monotonicity theorem gives:

1. If $f'_\times>0$ on $[a,b]$ and $f_\times(a)>0$, then $f_\times>0$ on $[a,b]$.
2. If $f'_\times<0$ on $[a,b]$ and $f_\times(b)>0$, then $f_\times>0$ on $[a,b]$.
3. If $f'_\times<0$ on $[a,b]$ and $f_\times(a)<0$, then $f_\times<0$ on $[a,b]$.

This lemma is the mathematical advance in the packet: the three bridge predicates are no longer informal missing conditions. They are reduced to endpoint signs plus derivative-sign enclosures on named regular bridge intervals.

## Sampled Bridge Rows

The source sign-bracket certificate supplies sampled witness rows on $I_2$:

$$
0<\theta_{3-}\approx0.997370655243
<
\theta_{2+}\approx1.159039827771
<
Q=\pi/2.
$$

| Bridge predicate | Sampled row(s) | Sampled sign | Propagation role |
| --- | --- | ---: | --- |
| `theta_3plus.regular-entry-positive` | `I2.left-scan` | $+$ | With $f'_\times>0$ from the regular entry to the derivative turn, positivity transports forward. |
| `I2.turn-bridge-forcing-positive` | `I2.d1`, `I2.f1.left` | $+$, $+$ | Positivity reaches the derivative turn, then transports backward from the positive left forcing bracket across the post-turn bridge. |
| `theta_2minus.regular-exit-negative` | `I2.f1.right`, `I2.right-scan` | $-$, $-$ | With $f'_\times<0$ after the later forcing zero, negativity transports forward to the regular exit before $\theta_{2+}$. |

Numerically, the imported rows include:

$$
f_\times(\texttt{I2.left-scan})\approx0.0440101436804,
\qquad
f_\times(\texttt{I2.d1})\approx0.0707209047205,
$$

$$
f_\times(\texttt{I2.f1.left})\approx0.00564973967572,
\qquad
f_\times(\texttt{I2.f1.right})\approx-0.00830067226785,
$$

$$
f_\times(\texttt{I2.right-scan})\approx-0.0586847626208.
$$

The weakest sampled bridge margin is therefore the positive left forcing bracket, approximately

$$
0.00564973967572.
$$

## Interval Successor Conditions

The sampled certificate closes the bridge gap only at the sampled and lemma level. The interval successor must still prove, on the same source atlas:

- endpoint sign enclosures for `I2.left-scan`, `I2.d1`, `I2.f1.left`, `I2.f1.right`, and `I2.right-scan`;
- derivative-sign enclosures for the entry-to-turn bridge, the turn-to-left-forcing-bracket bridge, and the right-forcing-bracket-to-$\theta_{2+}$ regular-exit bridge;
- compatibility of those bridge enclosures with the fold-collar $G,D$ rows and regular-subcell sign rows already staged by the interval implication theorem.

Once those interval bridge predicates are certified, the source-atlas implication theorem can consume them without adding another gate:

$$
\text{regular signs}+\text{fold-collar }G,D\text{ signs}+\text{bridge predicates}
\Longrightarrow
\text{interval critical exhaustion}.
$$

The direct successor [octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction](octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.md) states the finite interval-row theorem for these bridge predicates. It reduces the bridge proof to five endpoint forcing enclosures and two imported $I_2$ derivative-sign enclosures with inherited radius budgets.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-bridge-predicate-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-bridge-predicate-certificate.mjs) emits:

- predecessor validation for the source-atlas interval implication and forcing sign-bracket certificate;
- no-fixed-speed-window bridge parameters;
- the regular bridge propagation lemma;
- five sampled bridge endpoint rows;
- three conditional derivative bridge rows;
- three sampled bridge-predicate certificate rows;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-bridge-predicate-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-bridge-predicate-certificate.test.js) verifies predecessor validation, speed-window removal, the three monotone sign-transport statements, sampled bridge endpoint signs, sampled bridge-predicate closure, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_bridge\_propagation\_lemma=true},
\qquad
\texttt{certifies\_sampled\_bridge\_predicates=true}.
$$

It does not claim:

$$
\texttt{certifies\_interval\_bridge\_predicates=false},
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
\texttt{sampled-source-atlas-aware-bridge-predicate-certificate-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it proves the bridge propagation lemma and attaches sampled witness rows to all three exposed bridge predicates. It should not be promoted into reader-facing AAA prose until the derivative-sign and endpoint-sign bridge rows are replaced by outward-rounded interval enclosures, or until a retained branch certificate consumes the interval implication theorem.
