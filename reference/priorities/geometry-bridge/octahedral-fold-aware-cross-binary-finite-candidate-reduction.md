# Octahedral Fold-Aware Cross-Binary Finite-Candidate Reduction

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-forcing-topology-atlas](octahedral-fold-aware-cross-binary-forcing-topology-atlas.md) and [octahedral-fold-aware-cross-binary-critical-value-atlas](octahedral-fold-aware-cross-binary-critical-value-atlas.md), with [octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate](octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.md) providing the companion signed witness rows. The topology packet identifies the regular-cell forcing structure. The critical-value packet evaluates the primitive $A(u)=\int_0^u f_\times(q)dq$ at the six sampled candidates. This packet states the conditional finite-candidate theorem and derives the numerical margin budgets needed for a future interval proof of $C_\times$, $m_Q$, and $M_Q$.

It is a conditional finite-candidate reduction with sampled witness rows. It is not an interval critical-exhaustion theorem, not an interval quadrature certificate, not an interval value enclosure, and not a retained branch.

## Conditional Reduction Theorem

On regular cells,

$$
A'_\times(u)=f_\times(u),
\qquad
A''_\times(u)=f'_\times(u).
$$

The theorem target is:

> If certified derivative-sign topology for $f_\times$ holds on the three source-atlas-aware regular cells, and if the fold-square endpoint charts identify $\theta_{3-}$ and $\theta_{2+}$ as endpoint candidates, then all primitive extrema of $A$ on $[0,Q]$ lie in
>
> $$
> \{0,u_1,\theta_{3-},u_2,\theta_{2+},Q\}.
> $$

The proof route is ordinary one-dimensional calculus:

1. Use $A'_\times=f_\times$ and $A''_\times=f'_\times$ on each regular cell.
2. On $I_1$, $f'_\times<0$ plus a positive-to-negative bracket for $f_\times$ gives one regular critical point.
3. On $I_2$, a single positive-to-negative derivative turn before the positive-to-negative forcing bracket gives one regular critical point after the crest.
4. On $I_3$, negative forcing excludes regular primitive-critical points.
5. Add $0$, $Q$, and the two fold endpoint limits because ordinary regular-cell differentiation is not valid at folds.

The present packet verifies only the sampled witness rows for these hypotheses. Exact interval critical exhaustion remains open.

## Candidate Set

The forcing topology and critical-value rows align on the same six candidates:

| Candidate | $\theta$ | Role |
| --- | ---: | --- |
| `endpoint.0` | $0$ | quarter-left endpoint |
| `I1.z1` | $0.129625153956$ | sampled $M_Q$ candidate |
| `fold.3-` | $0.997370655243$ | fold endpoint limit |
| `I2.z1` | $1.133431464570$ | regular critical value |
| `fold.2+` | $1.159039827771$ | fold endpoint limit without extremum turn |
| `endpoint.Q` | $\pi/2$ | sampled $m_Q$ candidate |

The sampled value order is

$$
A(Q)
<
A(\theta_{3-})
<
A(\theta_{2+})
<
A(u_2)
<
A(0)
<
A(u_1).
$$

## Margin Budgets

The critical-value atlas gives

$$
M_{Q,\mathrm{samp}}\approx0.001648085483
\quad\text{at }u_1,
$$

$$
m_{Q,\mathrm{samp}}\approx C_{\times,\mathrm{samp}}
\approx-0.2680796825
\quad\text{at }Q.
$$

The maximum margin against the second-highest candidate is

$$
M_{Q,\mathrm{samp}}-A(0)
\approx
0.001648085483,
$$

so equal-radius candidate value intervals would certify the sampled maximum if the interval radius is below

$$
\boxed{
0.0008240427415.
}
$$

The minimum margin against the second-lowest candidate is

$$
A(\theta_{3-})-A(Q)
\approx
0.148348886356,
$$

so equal-radius candidate value intervals would certify the sampled minimum if the interval radius is below

$$
\boxed{
0.074174443178.
}
$$

The smallest adjacent ordering gap is between `fold.2+` and `I2.z1`:

$$
A(u_2)-A(\theta_{2+})
\approx
0.000967213241.
$$

Thus full six-candidate ordering by equal-radius intervals would require radius below

$$
\boxed{
0.0004836066205.
}
$$

The sign of $C_\times$ itself has the larger budget

$$
|C_{\times,\mathrm{samp}}|
\approx
0.2680796825.
$$

These are not interval enclosures. They are the exact margin thresholds that a future interval quadrature packet must beat once interval critical exhaustion has reduced the extrema to the six candidates.

The direct successor [octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas](octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.md) combines these value-ordering budgets with the forcing sign-bracket margins. It identifies the current sampled closure bottleneck as the `I1.forcing-bracket` sign-preservation budget $0.000472358401387$, just below the full value-ordering budget $0.0004836066205$.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-finite-candidate-reduction.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-finite-candidate-reduction.mjs) emits:

- predecessor validation for the forcing-topology atlas and critical-value atlas;
- no-fixed-speed-window reduction parameters;
- the conditional finite-candidate theorem statement and proof route;
- four reduction rows for $I_1$, $I_2$, $I_3$, and boundary candidates;
- the aligned six-candidate set;
- adjacent value-margin rows;
- $M_Q$, $m_Q$, full-ordering, positive-$M_Q$, and negative-$C_\times$ budget rows;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-finite-candidate-reduction.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-finite-candidate-reduction.test.js) verifies predecessor validation, speed-window removal, theorem statement, candidate alignment, margin budgets, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet certifies only the conditional theorem statement and sampled margin budgets:

$$
\texttt{certifies\_conditional\_finite\_candidate\_reduction=true},
$$

$$
\texttt{certifies\_sampled\_topology\_witness\_for\_reduction=true},
\qquad
\texttt{certifies\_sampled\_candidate\_value\_margin\_budgets=true}.
$$

It does not certify:

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
\texttt{certifies\_cross\_binary\_coarea\_interval\_profile=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{sampled-source-atlas-aware-finite-candidate-reduction-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it converts the forcing topology into a conditional finite-candidate theorem and computes the numerical margins that a future interval proof must beat. It should not be promoted into reader-facing AAA prose until the sign topology and candidate values are interval-certified or are consumed by a retained branch certificate.
