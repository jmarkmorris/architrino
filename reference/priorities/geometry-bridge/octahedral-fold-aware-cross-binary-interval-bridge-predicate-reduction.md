# Octahedral Fold-Aware Cross-Binary Interval Bridge-Predicate Reduction

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-bridge-predicate-certificate](octahedral-fold-aware-cross-binary-bridge-predicate-certificate.md) and [octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas](octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md). The predecessor bridge packet proved the sampled regular bridge propagation lemma. This packet states the interval bridge-predicate reduction theorem: exactly which endpoint and derivative interval enclosures must pass before the three bridge predicates can be treated as interval-grade inputs to [octahedral-fold-aware-cross-binary-source-atlas-interval-implication](octahedral-fold-aware-cross-binary-source-atlas-interval-implication.md).

It is not an actual outward-rounded interval enclosure certificate. It is the theorem and finite row reduction that a future interval engine must satisfy.

## Interval Bridge-Predicate Reduction Theorem

Let the regular $I_2$ source-atlas bridge be split by the derivative-turn row and the later forcing bracket. Suppose one shared source atlas supplies:

- five endpoint forcing sign enclosures;
- the imported derivative-sign enclosure `I2.derivative-positive.before-turn`;
- the imported derivative-sign enclosure `I2.derivative-negative.after-turn`.

Then the three bridge predicates needed by the source-atlas implication theorem follow:

$$
\texttt{theta\_3plus.regular-entry-positive},
\qquad
\texttt{I2.turn-bridge-forcing-positive},
\qquad
\texttt{theta\_2minus.regular-exit-negative}.
$$

The proof is one-dimensional monotonicity:

1. Positive derivative from the $\theta_{3+}$ regular entry transports positive forcing forward.
2. A positive forcing enclosure at the derivative turn covers the turn localization where the derivative sign changes.
3. Negative derivative after the turn transports positivity backward from the left forcing bracket.
4. Negative derivative after the later forcing zero transports negativity forward from the right forcing bracket to the regular exit before $\theta_{2+}$.
5. The resulting three bridge predicates are substituted into the already-stated source-atlas interval implication theorem.

Thus the bridge gap is reduced to seven finite interval rows, not an open-ended topology search.

## Endpoint And Derivative Rows

The bridge endpoint rows are:

| Target row | Expected sign | Sampled margin | Target radius |
| --- | ---: | ---: | ---: |
| `theta_3plus.entry.forcing` | $+$ | $0.0440101436804$ | $0.0220050718402$ |
| `I2.turn-crest.forcing` | $+$ | $0.0707209047205$ | $0.0353604523602$ |
| `I2.left-forcing-bracket.forcing` | $+$ | $0.00564973967572$ | $0.00282486983786$ |
| `I2.right-forcing-bracket.forcing` | $-$ | $0.00830067226785$ | $0.00415033613393$ |
| `theta_2minus.exit.forcing` | $-$ | $0.0586847626208$ | $0.0293423813104$ |

The imported derivative rows are:

| Target row | Expected sign | Role |
| --- | ---: | --- |
| `I2.derivative-positive.before-turn` | $+$ | Transports entry positivity forward to the derivative-turn side. |
| `I2.derivative-negative.after-turn` | $-$ | Transports turn-bridge positivity backward and post-zero negativity forward. |

With the current target margin factor, the weakest inherited bridge radius budget is

$$
0.00282486983786,
$$

coming from `I2.left-forcing-bracket.forcing` inside `I2.turn-bridge-forcing-positive`.

## Bridge Predicate Rows

| Bridge predicate | Endpoint rows | Derivative rows | Budget |
| --- | --- | --- | ---: |
| `theta_3plus.regular-entry-positive` | `theta_3plus.entry.forcing` | `I2.entry-to-turn.derivative-positive` | $0.0220050718402$ |
| `I2.turn-bridge-forcing-positive` | `theta_3plus.entry.forcing`, `I2.turn-crest.forcing`, `I2.left-forcing-bracket.forcing` | `I2.entry-to-turn.derivative-positive`, `I2.turn-to-exit.derivative-negative` | $0.00282486983786$ |
| `theta_2minus.regular-exit-negative` | `I2.right-forcing-bracket.forcing`, `theta_2minus.exit.forcing` | `I2.turn-to-exit.derivative-negative` | $0.00415033613393$ |

These rows refine the previous sampled bridge-predicate certificate. The bridge predicates are now no longer just sampled signs; they are finite interval proof obligations with inherited target budgets and a stated theorem showing why those rows are sufficient.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.mjs) emits:

- predecessor validation for the sampled bridge-predicate certificate and forcing interval sign-enclosure target atlas;
- no-fixed-speed-window interval bridge parameters;
- the interval bridge-predicate reduction theorem;
- five bridge endpoint sign-enclosure target rows;
- two imported derivative bridge target rows;
- three interval bridge-predicate reduction rows with inherited budgets;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.test.js) verifies predecessor validation, speed-window removal, theorem statement, endpoint and derivative target rows, bridge reduction rows, weakest-budget summary, CLI emission, JSON validation, invalid controls, and non-retention claims.

The direct successor [octahedral-fold-aware-cross-binary-finite-interval-closure-reduction](octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.md) composes this bridge reduction into the source-atlas interval implication theorem. It keeps the five bridge endpoint rows separate, imports the two derivative rows as existing regular-subcell obligations, and reduces the remaining interval-closure burden to thirty-three finite row families.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_interval\_bridge\_predicate\_reduction\_theorem=true},
$$

$$
\texttt{emits\_bridge\_endpoint\_enclosure\_targets=true},
\qquad
\texttt{imports\_bridge\_derivative\_enclosure\_targets=true}.
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
\texttt{source-atlas-aware-interval-bridge-predicate-reduction-stated}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it turns the bridge gap into a finite interval-row theorem with explicit budgets. Its direct successor composes those bridge rows into the full source-atlas interval implication theorem. It should not be promoted into reader-facing AAA prose until the finite row families are replaced by actual outward-rounded endpoint, derivative, regular-cell, fold-collar, and quadrature enclosures, or until a retained branch certificate consumes the full interval implication theorem.
