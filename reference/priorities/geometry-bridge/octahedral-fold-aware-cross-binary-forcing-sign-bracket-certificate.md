# Octahedral Fold-Aware Cross-Binary Forcing Sign-Bracket Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-forcing-topology-atlas](octahedral-fold-aware-cross-binary-forcing-topology-atlas.md). The predecessor recovers the sampled topology of $A'_\times=f_\times$ on the three source-atlas-aware regular cells. This packet records the explicit signed witness rows behind that topology.

It is a sampled source-atlas-aware forcing sign-bracket certificate. It is not an interval derivative enclosure, not an interval hidden-zero exclusion, not an interval quadrature certificate, and not a retained branch.

## Sign-Bracket Rows

On regular cells,

$$
A'_\times(u)=f_\times(u),
\qquad
A''_\times(u)=f'_\times(u).
$$

The executable certificate evaluates $f_\times$ and $f'_\times$ at the sampled brackets for the two forcing zeros and the single derivative turning row:

| Row | $\theta$ | $f_\times$ | $f'_\times$ | Source-root count |
| --- | ---: | ---: | ---: | ---: |
| `I1.left-scan` | $0.000010000000$ | $0.0329321609826$ | $-0.434940067780$ | $6$ |
| `I1.f1.left` | $0.124678831905$ | $0.000472358401387$ | $-0.100761106742$ | $6$ |
| `I1.f1` | $0.129625153862$ | $8.26984314362\times10^{-12}$ | $-0.0903091258188$ | $6$ |
| `I1.f1.right` | $0.145456970556$ | $-0.00118515466667$ | $-0.0603893762600$ | $6$ |
| `I1.right-scan` | $0.997360655243$ | $-30.4268477092$ | $-1523556.00712$ | $6$ |
| `I2.left-scan` | $0.997380655243$ | $0.0440101436804$ | $0.150357976814$ | $4$ |
| `I2.d1.left` | $1.098411388073$ | $0.0706902700497$ | $0.0520912735854$ | $4$ |
| `I2.d1` | $1.099563891683$ | $0.0707209047205$ | $-4.97288599188\times10^{-11}$ | $4$ |
| `I2.d1.right` | $1.101779079167$ | $0.0705933755317$ | $-0.119722958263$ | $4$ |
| `I2.f1.left` | $1.132088299016$ | $0.00564973967572$ | $-4.22731591138$ | $4$ |
| `I2.f1` | $1.133431464569$ | $3.96220209420\times10^{-12}$ | $-4.17645513990$ | $4$ |
| `I2.f1.right` | $1.135455990111$ | $-0.00830067226785$ | $-4.00612414821$ | $4$ |
| `I2.right-scan` | $1.159029827771$ | $-0.0586847626208$ | $-0.592984835445$ | $4$ |
| `I3.left-scan` | $1.159049827771$ | $-51.5306424174$ | $2573689.00087$ | $6$ |
| `I3.right-scan` | $1.570796316795$ | $-0.0329365148835$ | $0.434970197587$ | $6$ |

Thus the certificate proves the sampled sign rows

$$
f_\times(a_1)>0>f_\times(b_1),
\qquad
f'_\times(u_1)<0,
$$

$$
f'_\times(c_L)>0>f'_\times(c_R),
\qquad
f_\times(u_c)>0,
\qquad
u_c<u_2,
$$

and

$$
f_\times(a_2)>0>f_\times(b_2),
\qquad
f'_\times(u_2)<0.
$$

The third regular cell has negative forcing at both sampled scan endpoints and positive derivative at both sampled scan endpoints.

## Mathematical Use

This packet strengthens the topology row from a label to explicit signed witness data. It gives bracketed existence for the two regular forcing zeros and the single derivative turning row, and it records sampled transversality at both regular primitive-critical rows.

It still does not prove uniqueness. Even-multiplicity zeros or tightly paired sign changes between witness rows remain open until outward-rounded sign enclosures or interval Newton exclusions are supplied.

The direct successor [octahedral-fold-aware-cross-binary-finite-candidate-reduction](octahedral-fold-aware-cross-binary-finite-candidate-reduction.md) converts this topology into a conditional finite-candidate theorem and derives the value-margin budgets needed to certify $C_\times$, $m_Q$, and $M_Q$ once interval enclosures exist. The follow-on [octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas](octahedral-fold-aware-cross-binary-forcing-sign-topology-margin-atlas.md) combines the sign and value budgets into one margin atlas.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.mjs) emits:

- predecessor validation for the forcing-topology atlas;
- no-fixed-speed-window certificate parameters;
- the regular-cell rule $A'_\times=f_\times$, $A''_\times=f'_\times$;
- fifteen signed witness rows;
- sign-bracket summary rows for $I_1$, $I_2$, and $I_3$;
- the six topology candidates;
- non-retention and non-interval boundaries.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.test.js) verifies predecessor validation, speed-window removal, signed zero brackets, derivative-turn order, candidate preservation, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet certifies only sampled sign witness rows:

$$
\texttt{certifies\_sampled\_forcing\_sign\_brackets=true},
\qquad
\texttt{certifies\_sampled\_transversality\_rows=true},
\qquad
\texttt{certifies\_sampled\_derivative\_turn\_order=true}.
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
\texttt{sampled-source-atlas-aware-forcing-sign-bracket-certificate-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it turns sampled topology labels into explicit signed witness rows and transversality checks. It should not be promoted into reader-facing AAA prose until the sign brackets are replaced by interval enclosures or are consumed by an interval critical-exhaustion proof.
