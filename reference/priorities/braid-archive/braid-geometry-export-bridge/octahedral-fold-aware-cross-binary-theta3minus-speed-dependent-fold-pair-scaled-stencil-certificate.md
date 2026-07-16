# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair Scaled Stencil Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.md). The predecessor separated the $\theta_{3-}^{-}$ remainder burden into a coalescing fold-pair part and a regular-root part. This packet tightens the fold-pair side by moving the two singular roots into the scaled chart

$$
p=\frac{\delta-\delta_f(\nu)}{y},
\qquad
\theta=\theta_{3-}(\nu)-y^2.
$$

Receiver-normal status: restart target. The scaled root geometry still records
bounded $p,z,J$ rows for the coalescing roots, but the retired $G,D$ fold-pair
rows are not receiver-normal Master EOM force/action evidence.

## Scaled Fold-Pair Rows

For the two roots in the folded source term

$$
\texttt{-s_{\{+,+\}}(u+Q)}
$$

nearest $\delta_f(\nu)$, the sampled rows use

$$
\delta_\pm(y,\nu)
=
\delta_f(\nu)\pm \beta(\nu)y+y^2z_\pm(y,\nu).
$$

The first quadratic coefficient is tracked by

$$
\gamma(\nu)
=
\frac{
F_{\theta\delta}
-
\frac16F_{\delta\delta\delta}\beta^2
}{
F_{\delta\delta}
},
$$

so the diagnostic check is that $z_\pm$ stay bounded and close to $\gamma$ on the sampled collar. The scaled denominator row is

$$
J_\pm(y,\nu)
=
\frac{
F_\delta(\theta_{3-}(\nu)-y^2,\delta_\pm(y,\nu);\nu)
}{y}.
$$

The sample verifies the expected signs

$$
J_- > 0,
\qquad
J_+ < 0,
$$

and emits the same-row receiver-normal diagnostic

$$
N_{\pm}^{\mathrm{rec}}
=
F_\delta+2\cos\phi,
\qquad
W_{\pm}^{\mathrm{rec}}
=
\frac{N_{\pm}^{\mathrm{rec}}}{F_\delta}.
$$

The theorem-grade successor must rederive the fold-pair force/action quotient
with receiver-normal branch strength. The old $G_{\mathrm{pair}}$ and
$D_{\mathrm{pair}}$ quotient rows are diagnostic residue only.

## Sampled Result

Across the same five speed samples and nineteen collar samples used by the predecessor, the packet now records:

| Row | Sampled value |
| --- | ---: |
| sample count | $95$ |
| $\max |z_\pm|$ | $2.97447891747$ |
| $\max |z_\pm-\gamma|$ | $0.225146535728$ |
| $\min |J_\pm|$ | $0.77350681608$ |
| minimum pair-to-regular separation | $1.73277431787$ |
| receiver-normal evidence status | invalidated by receiver-normal Master EOM |
| maximum receiver-normal scaled-row reconstruction error | $9.64228696887\times10^{-14}$ |

The resulting status is

$$
\boxed{
\texttt{receiver-normal-zero-bracket-restart-required}.
}
$$

This remains useful only as root geometry. It converts the singular fold pair
into bounded sampled variables with a nonzero scaled denominator $J_\pm$, but
it does not certify force/action closure under the receiver-normal Master EOM.

The next active successor is the receiver-normal zero-bracket search and then a
rederived fold-pair normal form with same-record $D_s$, $D_t$, and
$W^{\mathrm{rec}}$ rows.

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-endpoint-bracket` | directed-rounded interval certified |
| `theta3minus.negative-fold-limit-L` | directed-rounded interval certified |
| `theta3minus.sampled-fold-pair-scaled-roots` | diagnostic root geometry only |
| `theta3minus.sampled-fold-pair-quadratic-remainder-quotients` | invalidated by receiver-normal Master EOM |
| `theta3minus.sampled-node-fold-pair-scaled-interval` | invalidated as force/action evidence; root-geometry replay only |
| `theta3minus.fold-pair-root-tube-cell-cover` | invalidated as force/action evidence; root-geometry replay only |
| `theta3minus.fold-pair-scaled-remainder` | receiver-normal restart required |
| `theta3minus.regular-root-remainder` | receiver-normal restart required |
| `I1.regular-critical-exhaustion` | blocked by receiver-normal restart |
| `representative-cross-binary-retention` | open |

The remaining fold-pair successor must rederive the scaled quotient target
from receiver-normal branch strength before any intervalization can resume.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_sampled\_theta3minus\_fold\_pair\_scaled\_stencil=false}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_directed\_rounded\_regular\_root\_remainder=false},
$$

$$
\texttt{certifies\_directed\_rounded\_speed\_dependent\_fold\_normal\_form\_remainder=false},
\qquad
\texttt{certifies\_theta\_3minus\_left\_fold\_collar\_interval\_radius=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.mjs). It emits:

- scaled $p_\pm$ and $z_\pm$ rows for the two coalescing roots;
- scaled denominator rows $J_\pm=F_\delta/y$;
- receiver-normal diagnostic rows $N_\pm^{\mathrm{rec}}$ and $W_\pm^{\mathrm{rec}}$;
- pair-to-regular separation margins;
- receiver-normal restart status for force/action evidence;
- explicit non-directed-rounded, non-`I1`, non-quadrature, and non-retention claim boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.test.js) validates schema, no-fixed-speed-window discipline, scaled $p,z,J$ rows, receiver-normal diagnostics, pair-root identification, overclaim rejection, and CLI write/validate behavior.
