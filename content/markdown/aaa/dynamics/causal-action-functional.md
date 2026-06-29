# Causal Action Functional

## Problem Statement and Goal

This chapter gives the action-functional side of the canonical receiver-normal Master EOM. Its
job is not to preserve a separate scalar law. Its job is to define which
retained branch records may be used for action, stability, mass-response, and
transition-cost calculations after the branch has been rebuilt with
receiver-normal strength.

The active branch strength is
$$
W_{ij}^{\mathrm{rec}}(t;t_0)
=
\left|
\frac{D_{t,ij}(t;t_0)}{D_{s,ij}(t;t_0)}
\right|,
$$
with
$$
D_{s,ij}
=
c_f-\mathbf v_j(t_0)\cdot\hat{\mathbf r}_{ij}(t;t_0),
\qquad
D_{t,ij}
=
c_f-\mathbf v_i(t)\cdot\hat{\mathbf r}_{ij}(t;t_0).
$$

A branch record that contains only $D_s$ is incomplete for current force/action
use. $D_s$ remains the source-normal transversality denominator for root
existence, caustic routing, and inactive-gap diagnostics. Force, action, power,
wake-history charge, mass-response, and conservation rows require $D_t$ on the
same retained record.

## Core Functional Definitions

On a retained chart $\mathfrak B$ with active causal roots
$t_0\in\mathcal C_{ij}(t)$, the receiver-normal scalar branch statistic is
$$
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B]
=
\frac{1}{T}
\int_0^T
\sum_{i,j}
\sum_{t_0\in\mathcal C_{ij}(t)}
\frac{W_{ij}^{\mathrm{rec}}(t;t_0)}
{r_{ij}^2(t;t_0)+\epsilon_c^2}
\,dt.
$$

This is a scalar statistic, not the vector Master EOM itself. It keeps the same
causal roots and receiver-normal strength while discarding the line-of-action
direction. Its use is limited:

1. compare candidate branch classes,
2. define transition-cost and barrier targets,
3. supply scalar rows for later mass or medium-response tests,
4. hand candidates back to the Master EOM for vector force and conservation
checks.

The exact vector force/action consumer must use
$$
\frac{W_{ij}^{\mathrm{rec}}}{r_{ij}^2}
\hat{\mathbf r}_{ij}
$$
on the same retained branch record. A scalar extremum of
$\bar{\mathcal A}_{\mathrm{rec}}$ is therefore only a candidate branch label
until the vector residuals close.

## Geometric/Topological Framework

The causal root locus is defined by
$$
g_{ij}(t,t_0)
=
\|\mathbf x_i(t)-\mathbf x_j(t_0)\|-c_f(t-t_0)=0.
$$

On a simple retained root, $D_s\ne0$ supplies the local inverse-function
condition. The branch label persists as long as the same retained record keeps:

| Row | Required status |
| --- | --- |
| root residual | zero on the retained box |
| source-normal denominator | bounded away from zero except declared caustic routing |
| receiver-normal numerator | present on the same retained record |
| receiver-normal strength | outward-rounded $W^{\mathrm{rec}}$ interval |
| inactive gaps | positive on the retained complement |
| finite memory | declared finite horizon |
| regulator state | declared $\eta$ and $\epsilon_c$ limits or finite values |

Branch labels may change only at declared boundaries: a root enters or leaves
the memory window, an inactive gap closes, $D_s$ reaches a caustic boundary, a
collision regulator is invoked, or the retained record fails same-box identity.

## Causal Writhe and Topological Use

Topological quantities such as causal writhe remain admissible only as branch
geometry:
$$
Wr_c(\mathfrak B)
=
\sum_{\alpha,\beta}
\operatorname{sgn}(\alpha,\beta)\,
\chi_{\mathrm{causal}}(\alpha,\beta).
$$

This notation records signed causal-locus crossings or linkages in the retained
record. It does not supply force strength. Any use of $Wr_c$ in spin,
chirality, confinement, or horizon-interface arguments must also state the
branch record on which $D_s$, $D_t$, and $W^{\mathrm{rec}}$ are available.

## Circular Benchmark as a Branch-Count Theorem

The circular branch-count benchmark is topology only. Circular self-hit births,
Jacobian-null thresholds, and inactive-gap ledgers may classify causal-root
structure, but they do not imply a circular no-go, force-balance result, action
minimum, or mass scale.

A current circular benchmark must emit:

| Evidence row | Required content |
| --- | --- |
| retained roots | partner/self labels and windows |
| $D_s$ | nonzero denominator floor or declared caustic route |
| $D_t$ | receiver-normal numerator interval |
| $W^{\mathrm{rec}}$ | same-record branch strength interval |
| vector residual | radial and tangential Master EOM residuals |
| scalar statistic | $\bar{\mathcal A}_{\mathrm{rec}}$ on the same record |
| negative control | fail-closed result when $D_t$ is absent or mismatched |

Until those rows exist, circular material is not evidence for action closure.

## Branch Barrier and Transition Cost

For a path of retained charts $\mathfrak B_\lambda$, define the candidate
receiver-normal barrier
$$
B_{\mathrm{rec}}(\lambda_0,\lambda_1)
=
\inf_{\mathfrak B_\lambda}
\int_{\lambda_0}^{\lambda_1}
\left[
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B_\lambda]
-
\min_{\lambda'}\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B_{\lambda'}]
\right]_+
d\lambda.
$$

This is a transition-cost target, not a proof of stability. A promoted barrier
must state the retained branch path, the root identity across the path, the
regulator state, and the same-record receiver-normal branch-strength rows.

## Reduced Branch-Certificate Targets

A branch certificate that consumes this chapter must report:

| Certificate row | Required content |
| --- | --- |
| branch identity | retained roots, inactive gaps, finite memory |
| receiver-normal strength | same-box $D_s$, $D_t$, and $W^{\mathrm{rec}}$ |
| scalar stationarity | first-variation or discrete comparison row for $\bar{\mathcal A}_{\mathrm{rec}}$ |
| vector consistency | Master EOM residual on the same retained record |
| Noether pullback | energy, momentum, and angular-momentum wake-history rows |
| negative controls | rejection of missing, mismatched, or receiver-normal-incomplete rows |

The branch certificate is not promoted if any of those rows are supplied by
different root boxes, different regulator states, or different history records.

## Summary and Status

The current action-functional lane is a receiver-normal rebuild target. It keeps
causal-root topology, branch labels, caustic routing, and scalar comparison
targets, but action evidence requires complete receiver-normal branch records.
The next useful mathematical artifact is one retained branch packet
that binds root topology, $D_s$, $D_t$, $W^{\mathrm{rec}}$, vector residuals,
scalar statistic, Noether pullback, and fail-closed negative controls on the
same record.
