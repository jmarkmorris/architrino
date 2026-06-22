# Octahedral Fold-Aware Cross-Binary Forcing Sign-Topology Margin Atlas

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate](octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.md) and [octahedral-fold-aware-cross-binary-finite-candidate-reduction](octahedral-fold-aware-cross-binary-finite-candidate-reduction.md). The sign-bracket packet supplies explicit signed forcing and derivative witnesses. The finite-candidate reduction supplies the value-ordering budgets for $C_\times$, $m_Q$, and $M_Q$. This packet consolidates those rows into a single sampled margin atlas.

It is a sampled source-atlas-aware forcing sign-topology margin atlas. It is not an interval derivative enclosure, not an interval hidden-zero exclusion, not an interval quadrature certificate, not a $C_\times,m_Q,M_Q$ interval enclosure, and not a retained branch.

## Core Margin Rows

The margin atlas records the numerical slack that a future interval proof must beat:

| Row | Target predicate | Sampled margin |
| --- | --- | ---: |
| `I1.forcing-bracket` | $f_\times(a_1)>0>f_\times(b_1)$ | $0.000472358401387$ |
| `I1.transversality` | $f'_\times(u_1)<0$ | $0.0903091258188$ |
| `I2.derivative-turn-bracket` | $f'_\times(c_L)>0>f'_\times(c_R)$ | $0.0520912735854$ |
| `I2.crest-positive-forcing` | $f_\times(u_c)>0$ | $0.0707209047205$ |
| `I2.forcing-bracket` | $f_\times(a_2)>0>f_\times(b_2)$ | $0.00564973967572$ |
| `I2.transversality` | $f'_\times(u_2)<0$ | $4.1764551399$ |
| `I3.endpoint-forcing-negative` | $f_\times$ negative at sampled $I_3$ endpoints | $0.0329365148835$ |
| `I3.endpoint-derivative-positive` | $f'_\times$ positive at sampled $I_3$ endpoints | $0.434970197587$ |
| `I2.turn-before-zero` | $u_c<u_2$ | gap $0.033867572886$, equal-radius order budget $0.016933786443$ |
| `value.full-order` | six-candidate value ordering | equal-radius value budget $0.0004836066205$ |

The two limiting scales are nearly equal:

$$
\boxed{
\text{weakest sign-preservation budget}
=0.000472358401387
}
$$

from the `I1.forcing-bracket` row, and

$$
\boxed{
\text{full value-ordering budget}
=0.0004836066205
}
$$

from the `value.full-order` row. Therefore the current sampled closure bottleneck is

$$
\boxed{
0.000472358401387
}
$$

and it comes from preserving the first forcing bracket.

## Mathematical Use

This packet turns qualitative interval obligations into numerical closure targets. A future interval sign proof must produce outward-rounded enclosures for $f_\times$ and $f'_\times$ on the named subcells whose radii are below the emitted sign-preservation budgets. A future interval quadrature proof must produce candidate-value enclosures below the imported value-ordering budget if it wants the full sampled candidate order, or below the weaker $M_Q$ and $m_Q$ budgets when only extrema are needed.

The result is still sampled. Endpoint signs and sampled grid signs do not exclude hidden zeros. Endpoint derivative signs do not prove monotonicity on a whole subcell without interval derivative enclosures. The regular derivative formula is not applied at `fold.3-` or `fold.2+`; those remain governed by the fold-square packet.

The direct successor [octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas](octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md) converts these margins into outward-rounded interval targets and records the fold-collar sign transport lemma. The successor keeps the same bottleneck budget but splits the interval proof into regular $\theta$ subcells and square-coordinate fold collars, because a bounded $\theta$-Lipschitz derivative route is not valid through the projected fold singularities.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.mjs) emits:

- predecessor validation for the forcing sign-bracket certificate, forcing-topology atlas, and finite-candidate reduction;
- no-fixed-speed-window margin parameters;
- the candidate order `endpoint.0`, `I1.z1`, `fold.3-`, `I2.z1`, `fold.2+`, `endpoint.Q`;
- ten core margin rows;
- detailed signed-value margin rows;
- sampled topology-grid margin rows;
- theta-separation rows;
- bottleneck summary rows;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.test.js) verifies predecessor validation, speed-window removal, candidate order, core margins, bottleneck identification, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet certifies only sampled margin budgets:

$$
\texttt{certifies\_sampled\_sign\_topology\_margin\_atlas=true},
$$

$$
\texttt{certifies\_sampled\_sign\_preservation\_budgets=true},
\qquad
\texttt{certifies\_sampled\_turn\_order\_margin=true},
\qquad
\texttt{certifies\_sampled\_value\_margin\_budget\_import=true}.
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
\texttt{sampled-source-atlas-aware-forcing-sign-topology-margin-atlas-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically useful because it turns the sign topology and value ordering into explicit margin budgets. It should not be promoted into reader-facing AAA prose until interval enclosures beat these budgets or the margin atlas is consumed by a retained branch certificate.
