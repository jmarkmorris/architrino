# Octahedral Fold-Aware Cross-Binary Finite Interval Closure Reduction

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-source-atlas-interval-implication](octahedral-fold-aware-cross-binary-source-atlas-interval-implication.md) and [octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction](octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.md). It composes the bridge reduction back into the source-atlas implication theorem, so the bridge predicates are no longer separate primitive assumptions.

It is a finite interval-row reduction theorem. It is not an actual outward-rounded interval enclosure certificate, not an interval sign-topology proof, not an interval quadrature certificate, and not a retained branch.

## Finite Closure Reduction Theorem

The source-atlas implication theorem says:

$$
\text{regular signs}+\text{fold-collar }G,D\text{ signs}+\text{bridge predicates}+\text{value quadrature}
\Longrightarrow
\text{critical exhaustion and candidate ordering}.
$$

The interval bridge-predicate reduction says:

$$
\text{five bridge endpoint signs}+\text{two }I_2\text{ derivative signs}
\Longrightarrow
\text{three bridge predicates}.
$$

Composing the two statements gives:

> On one shared source atlas, actual outward-rounded enclosures for the finite row set imply the primitive-critical candidate set
>
> $$
> \{0,u_1,\theta_{3-},u_2,\theta_{2+},Q\}
> $$
>
> and the corresponding candidate-value ordering for $C_\times,m_Q,M_Q$.

The proof is substitution plus controlled row accounting. The two bridge derivative rows are already the regular-subcell rows `I2.derivative-positive.before-turn` and `I2.derivative-negative.after-turn`, so they are imported uses of existing derivative enclosures rather than new analytic obligations. The five bridge endpoint signs stay separate bridge obligations until a future certificate proves that any similarly named point-sign row is the same interval object with the same source-atlas chart and enclosure radius.

## Finite Row Census

The composed finite row census is:

| Row family | Count |
| --- | ---: |
| Existing point-sign rows | $13$ |
| Bridge endpoint sign rows | $5$ |
| Zero-isolation rows | $3$ |
| Regular-subcell sign rows | $5$ |
| Fold-collar $G,D$ rows | $2$ |
| Theta-order rows | $4$ |
| Candidate-value budget rows | $1$ |
| Total finite row families | $33$ |

The bridge endpoint row accounting is:

| Bridge endpoint row | Canonical row | Status |
| --- | --- | --- |
| `theta_3plus.entry.forcing` | `I2.left-scan.forcing` | separate bridge endpoint row |
| `I2.turn-crest.forcing` | `I2.d1.forcing` | separate bridge endpoint row with label overlap |
| `I2.left-forcing-bracket.forcing` | `I2.f1.left.forcing` | separate bridge endpoint row with label overlap |
| `I2.right-forcing-bracket.forcing` | `I2.f1.right.forcing` | separate bridge endpoint row with label overlap |
| `theta_2minus.exit.forcing` | `I2.right-scan.forcing` | separate bridge endpoint row |

The bridge derivative rows are both already regular-subcell rows:

$$
\texttt{I2.entry-to-turn.derivative-positive}
\equiv
\texttt{I2.derivative-positive.before-turn},
$$

$$
\texttt{I2.turn-to-exit.derivative-negative}
\equiv
\texttt{I2.derivative-negative.after-turn}.
$$

## Bottleneck

The bridge reduction's weakest inherited bridge budget is

$$
\texttt{I2.turn-bridge-forcing-positive}
\quad\text{with radius}\quad
0.00282486983786.
$$

The global finite-row bottleneck remains the imported source-atlas sign bottleneck:

$$
\texttt{I1.forcing-bracket}
\quad\text{with radius}\quad
0.000236179200694.
$$

Thus the bridge work is no longer the smallest-radius obstruction. The next mathematical closure burden is a true outward-rounded enclosure pass for the thirty-three finite row families, with the first radius target still set by the $I_1$ forcing bracket.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.mjs) emits:

- predecessor validation for the source-atlas interval implication and interval bridge-predicate reduction;
- no-fixed-speed-window finite interval parameters;
- the finite source-atlas interval closure reduction theorem;
- the imported point-sign rows;
- bridge endpoint separation rows and derivative row de-duplication rows;
- the thirty-three-family finite interval row census;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.test.js) verifies predecessor validation, speed-window removal, theorem statement, bridge endpoint separation, bridge derivative de-duplication, row census, global bottleneck preservation, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_finite\_interval\_closure\_reduction\_theorem=true},
$$

$$
\texttt{eliminates\_bridge\_predicates\_as\_primitive\_assumptions=true},
\qquad
\texttt{emits\_finite\_interval\_row\_census=true}.
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
\texttt{source-atlas-aware-finite-interval-closure-reduction-stated}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it composes the interval implication and bridge reduction into one finite closure theorem and proves that the bridge predicates are no longer primitive assumptions. It should not be promoted into reader-facing AAA prose until the thirty-three finite row families have actual outward-rounded interval enclosures, or until a retained branch certificate consumes the finite closure theorem.

The direct successor [octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure](octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md) attacks the global finite-row bottleneck directly. It certifies the `I1.forcing-bracket` endpoint point signs under the no-fixed-speed-window speed envelope while leaving full directed-rounding interval arithmetic, `I1` derivative enclosure, critical exhaustion, quadrature, and retained branch status open.
