# Octahedral Fold-Aware Cross-Binary Forcing-Topology Atlas

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-forcing-derivative-atlas](octahedral-fold-aware-cross-binary-forcing-derivative-atlas.md). The predecessor derives the regular-cell implicit derivative formula for $f_\times$. This packet uses that derivative row to recover the sampled forcing topology of the representative quarter profile.

It is a sampled source-atlas-aware forcing-topology atlas. It is not an interval derivative enclosure, not an interval critical-exhaustion theorem, not an interval quadrature certificate, and not a retained branch.

## Topology Rule

On regular cells,

$$
A'(u)=f_\times(u),
\qquad
A''(u)=f'_\times(u).
$$

The topology packet samples $f_\times$ and the implicit derivative $f'_\times$ on the three source-atlas-aware regular cells:

$$
I_1=[0,\theta_{3-}),
\qquad
I_2=(\theta_{3-},\theta_{2+}),
\qquad
I_3=(\theta_{2+},Q).
$$

The result is the sampled forcing topology:

| Cell | Source-root count | Sampled $f_\times$ topology | Sampled $f'_\times$ topology | Sampled role |
| --- | ---: | --- | --- | --- |
| $I_1$ | $6$ | $+$ to $-$ with one zero at $u_1\approx0.129625153862$ | negative throughout sampled regular probes | decreasing cell with one sampled zero |
| $I_2$ | $4$ | $+$ to $-$ with one zero at $u_2\approx1.133431464569$ | one $+$ to $-$ derivative turn at $u_c\approx1.099563891683$ | one sampled crest before one sampled zero |
| $I_3$ | $6$ | negative throughout sampled regular probes | positive throughout sampled regular probes | increasing but still negative cell |

At the derivative turning row in $I_2$,

$$
u_c\approx1.099563891683,
\qquad
f_\times(u_c)\approx0.070720904720.
$$

Thus the sampled profile has one interior crest of $f_\times$ in $I_2$, but that crest is positive and occurs before the sampled zero of $f_\times$.

## Candidate Set Recovered From Topology

The topology rows recover the same six primitive candidate locations as the primitive-critical and critical-value atlases:

$$
\boxed{
\left\{
0,\ 
u_1,\ 
\theta_{3-},\ 
u_2,\ 
\theta_{2+},\ 
Q
\right\}.
}
$$

In ordered form:

| Candidate | $\theta$ | Role |
| --- | ---: | --- |
| `endpoint.0` | $0$ | quarter-left endpoint |
| `I1.z1` | $0.129625153862$ | sampled regular critical point |
| `fold.3-` | $0.997370655243$ | fold-local minimum candidate |
| `I2.z1` | $1.133431464569$ | sampled regular critical point |
| `fold.2+` | $1.159039827771$ | fold endpoint limit without extremum turn |
| `endpoint.Q` | $\pi/2$ | quarter-right endpoint |

The regular critical rows remain sampled nondegenerate local maxima of $A$ because the predecessor gives

$$
f'_\times(u_1)\approx-0.090309125625,
\qquad
f'_\times(u_2)\approx-4.176455139963.
$$

The fold rows remain governed by the square-coordinate endpoint model, not by ordinary regular-cell derivative language.

## What This Does And Does Not Close

This packet gives the future interval proof a concrete topology to certify:

$$
I_1:\text{ decreasing with one zero,}
\qquad
I_2:\text{ one crest then one zero,}
\qquad
I_3:\text{ increasing but negative.}
$$

It does not prove hidden-zero exclusion in the interval sense. Dense sampling plus bisection can miss even-multiplicity zeros or closely paired oscillations. The future interval proof must replace this sampled topology with outward-rounded derivative sign enclosures or interval Newton exclusions on the topology subcells, while using the fold-square endpoint enclosures at $\theta_{3-}$ and $\theta_{2+}$.

The direct successor [octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate](octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.md) records the signed witness rows behind the sampled topology. The following [octahedral-fold-aware-cross-binary-finite-candidate-reduction](octahedral-fold-aware-cross-binary-finite-candidate-reduction.md) converts those rows into a conditional finite-candidate theorem and derives the margin budgets needed for future interval quadrature.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-forcing-topology-atlas.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-forcing-topology-atlas.mjs) emits:

- predecessor validation for the forcing-derivative atlas;
- no-fixed-speed-window topology parameters;
- the regular-cell topology rule $A'=f_\times$, $A''=f'_\times$;
- three regular-cell topology rows;
- sampled forcing-zero isolation rows;
- the sampled $I_2$ derivative-turning row;
- the primitive candidate set recovered from topology;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-forcing-topology-atlas.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-forcing-topology-atlas.test.js) verifies predecessor validation, speed-window removal, topology-rule emission, three-cell topology classes, sampled zero isolation, candidate-set recovery, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet certifies only sampled topology rows:

$$
\texttt{certifies\_sampled\_regular\_cell\_forcing\_topology=true},
$$

$$
\texttt{certifies\_sampled\_regular\_forcing\_zero\_isolation=true},
$$

$$
\texttt{certifies\_sampled\_derivative\_turning\_row=true},
$$

and

$$
\texttt{certifies\_sampled\_primitive\_candidate\_set\_from\_topology=true}.
$$

It does not certify:

$$
\texttt{certifies\_interval\_derivative\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_fold\_limit\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_quadrature\_enclosure=false},
$$

$$
\texttt{certifies\_C\_m\_Q\_M\_Q\_interval\_enclosure=false},
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
\texttt{sampled-source-atlas-aware-forcing-topology-atlas-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it recovers the six primitive candidate locations from the sampled topology of $f_\times$ and $f'_\times$, not merely from a black-box sign scan. It should not be promoted into reader-facing AAA prose until the topology subcells are upgraded to interval sign enclosures or are consumed by an interval critical-exhaustion proof for the representative quarter profile.
