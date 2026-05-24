# Octahedral Fold-Aware Cross-Binary Critical Value Atlas

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-primitive-critical-atlas](octahedral-fold-aware-cross-binary-primitive-critical-atlas.md). The predecessor reduces the quarter-profile primitive-extrema search to six sampled candidate locations. This packet evaluates the primitive

$$
A(u)=\int_0^u f_\times(q)\,dq
$$

at those locations with transformed composite midpoint quadrature.

It is a sampled critical-value atlas, not an interval quadrature certificate, not an interval critical-exhaustion theorem, and not a retained branch.

## Quadrature Convention

The six sampled candidate locations are

$$
\left\{
0,\ 
0.129625153956,\ 
0.997370655243,\ 
1.133431464570,\ 
1.159039827771,\ 
\frac{\pi}{2}
\right\}.
$$

Near fold endpoint limits, ordinary $\theta$-midpoint quadrature converges poorly because the projected source row is singular but integrable. This packet therefore uses transformed segment coordinates:

- regular segments use ordinary midpoint quadrature in $\theta$;
- segments ending at a fold use a right-fold square coordinate;
- segments starting at a fold use a left-fold square coordinate.

This improves the sampled numerical row but does not convert it into interval quadrature.

## Candidate Values

With $384$ panels per candidate segment and the certified positive speed-ratio zero estimate $v_*\approx3.021564740248$, the sampled primitive values are:

| Candidate | $\theta$ | Role | Sampled $A(\theta)$ |
| --- | ---: | --- | ---: |
| `endpoint.0` | $0$ | quarter-left endpoint | $0$ |
| `I1.z1` | $0.129625153956$ | sampled $M_Q$ candidate | $0.001648085483$ |
| `fold.3-` | $0.997370655243$ | fold endpoint limit | $-0.119730796144$ |
| `I2.z1` | $1.133431464570$ | regular critical value | $-0.112301969057$ |
| `fold.2+` | $1.159039827771$ | fold endpoint limit without extremum turn | $-0.113269182298$ |
| `endpoint.Q` | $\pi/2$ | sampled $m_Q$ candidate | $-0.2680796825$ |

The sampled value ordering is therefore

$$
\boxed{
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
}
$$

Thus the sampled value row is

$$
\boxed{
C_{\times,\mathrm{samp}}
\approx
-0.2680796825,
}
$$

$$
\boxed{
m_{Q,\mathrm{samp}}
\approx
-0.2680796825
\quad\text{at }Q,
}
$$

and

$$
\boxed{
M_{Q,\mathrm{samp}}
\approx
0.001648085483
\quad\text{at }u_1\approx0.129625153956.
}
$$

The centered sampled average and excursion radius are

$$
\frac{C_{\times,\mathrm{samp}}}{2}
\approx
-0.13403984125,
\qquad
D_{\times,\mathrm{samp}}
\approx
0.135687926733.
$$

These values should not be mixed with the older left-endpoint sampled payload in [octahedral-fold-aware-cross-binary-quarter-profile-certificate](octahedral-fold-aware-cross-binary-quarter-profile-certificate.md) unless the quadrature convention is named. Both rows are sampled diagnostics rather than interval enclosures.

The direct successor [octahedral-fold-aware-cross-binary-fold-square-limit-atlas](octahedral-fold-aware-cross-binary-fold-square-limit-atlas.md) supplies the local fold normal form behind the transformed quadrature. It proves the square-coordinate endpoint model

$$
g_\pm(y)=2y\,f_\times(\theta_f\pm y^2)
$$

has finite one-sided limits at the folded sides, with analytic limits

$$
\theta_{3-}^{-}:\ -0.192715477558,
\qquad
\theta_{2+}^{+}:\ -0.325542989718,
$$

and zero square limits on the opposite regular sides. It preserves that interval endpoint enclosures and interval quadrature remain open.

The next successor [octahedral-fold-aware-cross-binary-forcing-derivative-atlas](octahedral-fold-aware-cross-binary-forcing-derivative-atlas.md) supplies the regular-cell derivative formula for $f_\times$ and samples the two interior primitive-critical rows as nondegenerate negative-slope crossings. It preserves that interval derivative enclosures, interval critical exhaustion, and interval quadrature remain open.

The later [octahedral-fold-aware-cross-binary-finite-candidate-reduction](octahedral-fold-aware-cross-binary-finite-candidate-reduction.md) consumes this value ordering with the forcing-topology rows. It states the conditional finite-candidate theorem and computes the equal-radius value budgets required to certify $C_\times$, $m_Q$, and $M_Q$ once interval critical exhaustion and interval quadrature exist.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-critical-value-atlas.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-critical-value-atlas.mjs) emits:

- predecessor validation for the primitive-critical atlas;
- no-fixed-speed-window quadrature parameters;
- the primitive definition $A(u)=\int_0^u f_\times(q)dq$;
- five transformed segment-integral rows;
- six candidate-value rows;
- the sampled $C_\times$, $m_Q$, and $M_Q$ ordering;
- non-retention and non-interval boundaries.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-critical-value-atlas.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-critical-value-atlas.test.js) verifies predecessor validation, speed-window removal, transformed quadrature rows, candidate values, sampled value ordering, CLI emission, JSON validation, and non-retention claims.

## Claim Boundary

This packet certifies only sampled rows:

$$
\texttt{certifies\_sampled\_critical\_value\_atlas=true},
$$

$$
\texttt{certifies\_sampled\_critical\_value\_quadrature=true},
$$

$$
\texttt{certifies\_sampled\_candidate\_minmax=true},
$$

and

$$
\texttt{certifies\_sampled\_C\_m\_Q\_M\_Q\_values=true}.
$$

It does not certify:

$$
\texttt{certifies\_C\_m\_Q\_M\_Q\_interval\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_quadrature\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
$$

$$
\texttt{certifies\_cross\_binary\_coarea\_interval\_profile=false},
$$

$$
\texttt{certifies\_representative\_interval\_profile=false},
$$

$$
\texttt{certifies\_receiver\_orbit\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{sampled-source-atlas-aware-critical-value-atlas-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it converts the sampled finite candidate set into sampled values for $C_\times$, $m_Q$, and $M_Q$. Its direct successors add the fold-square endpoint model required by future interval quadrature and the regular-cell derivative formula required by future interval critical exhaustion. These packets should not be promoted into reader-facing AAA prose until transformed quadrature is replaced by interval quadrature and the primitive-critical candidate set is upgraded to interval critical exhaustion.
