# Causal Action Functional

This chapter explains how action-like scalar summaries are allowed to enter delayed dynamics with transmitter-side acceleration weight. The [Master Equation](master-equation.md#the-master-equation-canonical-form) remains the vector law. The causal action functional is a branch statistic used to compare retained histories, estimate barriers, and feed stability or mass-response tests without replacing the line-of-action acceleration.

The central warning is simple: a scalar action value is valid only on the same retained branch record that supplies the causal roots, transmitter-side factor, receiver-side factor, and transmitter-side acceleration weight. Otherwise the statistic has lost the causal information that made the branch physical.

## Problem Statement and Goal

This chapter gives the action-functional side of the canonical transmitter-side Master EOM. Its
job is not to preserve a separate scalar law. Its job is to define which
retained branch records may be used for action, stability, mass-response, and
transition-cost calculations after the branch has been rebuilt with
transmitter-side acceleration weight.

The active branch strength is
$$
W_{ij}^{\mathrm{acc}}(T_r;T_t)
=
\frac{c_f}{|D_{t,ij}(T_r;T_t)|},
$$
with
$$
D_{t,ij}
=
c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}(T_r;T_t),
\qquad
D_{r,ij}
=
c_f-\mathbf V_i(T_r)\cdot\hat{\mathbf r}_{ij}(T_r;T_t).
$$

Plain language: a retained hit must say how densely the transmitter laid down the arriving wake surface. The receiver-side quantity is recorded separately through the signed playback derivative $D_r/D_t$.

A branch record that contains $D_t$ but omits $D_r$ can still define the instantaneous acceleration weight, but it cannot certify root continuation through reception time. Action, power, wake-history, mass-response, and conservation claims must state whether they consume transmitter-side acceleration, signed root playback, or both; they may not multiply the two by default.

## Core Functional Definitions

On a retained chart $\mathfrak B$ with active causal roots
$T_t\in\mathcal C_{ij}(T_r)$, the receiver-side scalar branch statistic over a native-time window $T_{\mathrm{win}}$ is
$$
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B]
=
\frac{1}{T_{\mathrm{win}}}
\int_0^{T_{\mathrm{win}}}
\sum_{i,j}
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\frac{W_{ij}^{\mathrm{acc}}(T_r;T_t)}
{r_{ij}^2(T_r;T_t)+\epsilon_c^2}
\,dT.
$$

This statistic is sign-blind and coupling-normalized: it suppresses
$\kappa$, $|q_iq_j|$, and the polarity sign
$\sigma_{ij}=\mathrm{sign}(q_iq_j)$. Attractive and repulsive records therefore
add by received magnitude rather than canceling by direction. After the
native-time average, $\bar{\mathcal A}_{\mathrm{rec}}$ has inverse-area units;
it is action-like only in the sense that it accumulates receiver-side
branch-magnitude density on the retained causal record. It is not automatically
the exact Fokker-type variational action, whose causal kernel is tested
separately in [Master Equation](master-equation.md#exact-causal-delay-fokker-type-interaction-term).

Plain language: this number asks how much same-record causal-hit magnitude a
branch carries over the window after signs, coupling scale, and push direction
have been stripped off.

This is a scalar statistic, not the vector Master EOM itself. It keeps the same
causal roots and transmitter-side acceleration weight while discarding the line-of-action
direction. Its use is limited:

1. compare candidate branch classes,
2. define transition-cost and barrier targets,
3. supply scalar records for later mass or medium-response tests,
4. hand candidates back to the Master EOM for vector acceleration and conservation
checks.

The exact vector acceleration/action consumer must use
$$
\frac{W_{ij}^{\mathrm{acc}}}{r_{ij}^2}
\hat{\mathbf r}_{ij}
$$
on the same retained branch record. A scalar extremum of
$\bar{\mathcal A}_{\mathrm{rec}}$ is therefore only a candidate branch label
until the vector residuals close.

## Geometric/Topological Framework

The causal root locus is defined by
$$
g_{ij}(T_r,T_t)
=
\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t)=0.
$$

Plain language: the root condition says that a wake emitted by transmitter $j$ at
$T_t$ reaches receiver $i$ exactly at reception time $T_r$.

On a simple retained root, $D_t\ne0$ supplies the local inverse-function
condition. A retained record is the branch-local data packet that binds the
root, transmitter identity, receiver identity, regulator state, and acceleration/action
entries to one history chart. A retained box is an interval or chart neighborhood
that encloses those entries together; outward-rounded intervals have endpoints
rounded away from the computed value so the true entry remains enclosed. The
branch label persists as long as the same retained record keeps:

| Row | Required status |
| --- | --- |
| root residual | zero on the retained box |
| transmitter-side factor | bounded away from zero except declared caustic routing |
| receiver-side factor | present on the same retained record |
| transmitter-side acceleration weight | outward-rounded $W^{\mathrm{acc}}$ interval |
| inactive gaps | positive on the retained complement |
| finite memory | declared finite horizon |
| regulator state | declared $\eta$ and $\epsilon_c$ limits or finite values |

Branch labels may change only at declared boundaries: a root enters or leaves
the memory window, an inactive gap closes, $D_t$ reaches a caustic boundary, a
collision regulator is invoked, or the retained records no longer occupy the same
box.

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
record. Here $\alpha$ and $\beta$ index oriented retained causal-locus strands
or strand segments in the declared projection. The indicator
$\chi_{\mathrm{causal}}(\alpha,\beta)$ equals $1$ only when the two strands form
an admissible crossing or linkage event on the same retained record, and equals
$0$ otherwise. The sign $\operatorname{sgn}(\alpha,\beta)$ is the orientation
sign of the ordered strand pair relative to the declared branch framing; it is
not defined at a fold, framing slip, or unresolved collision record.

$Wr_c$ is therefore a causal-locus crossing statistic, not a replacement for
the canonical framed-topology records such as
$Lk=\operatorname{Wr}+\operatorname{Tw}$ in
[Constructing the Absolute Frame](../foundations/constructing-the-absolute-frame.md#parity-convention-and-dynamical-chirality)
and [Architrino](../foundations/architrino.md#provenance-and-persistence). It
does not supply acceleration strength. Any use of $Wr_c$ in spin, chirality,
confinement, or horizon-interface arguments must also state the branch record
on which $D_t$, $D_r$, and $W^{\mathrm{acc}}$ are available.

## Circular Benchmark (Branch-Count Theorem)

The circular branch-count benchmark is topology only. Circular self-hit births,
Jacobian-null thresholds, and inactive-gap ledgers may classify causal-root
structure, but they do not imply a circular no-go, acceleration-balance result, action
minimum, or mass scale.

The theorem spine is the circular no-proliferation result already used by the
delayed dynamics stack. In the symmetric circular benchmark, write
$$
\beta_f(T)=\frac{\omega(T)R(T)}{c_f}.
$$
If $|\beta_f(T)|\le\beta_{\max}<\infty$ uniformly, then the active circular
self-hit count is uniformly bounded:
$$
N_{\mathrm{self}}(T)
\le
\frac{\beta_{\max}}{\pi}+C_{\mathrm{circ}},
$$
where $C_{\mathrm{circ}}$ is an absolute endpoint-count constant for the
circular root equation. On a one-sign subchart this has the sharper asymptotic
form
$$
N_{\mathrm{self}}^{(+)}(\beta_f)=\frac{\beta_f}{\pi}+O(1).
$$
The branch births occur at tangencies of the circular root equation, so the
root census, Jacobian-null thresholds, and inactive-gap changes are one
topological ledger. On the non-translating circular chart, $D_r=D_t$, so the
playback ratio is one. The acceleration weight is instead
$W^{\mathrm{acc}}=c_f/|D_t|=1/|J|$ in normalized units and is not generally
one. The branch-count theorem therefore uses the root structure and does not
certify acceleration balance, action closure, or stability. The detailed
circular derivations are in
[Master Equation](master-equation.md) and the winding-index census in
[Binary Dynamics](binary-dynamics.md#root-multiplicity-vs-speed).

A current circular benchmark must emit:

| Evidence record | Required content |
| --- | --- |
| retained roots | partner/self labels and windows |
| $D_t$ | nonzero denominator floor or declared caustic route |
| $D_r$ | receiver-side factor interval |
| $W^{\mathrm{acc}}$ | same-record branch strength interval |
| vector residual | radial and tangential Master EOM residuals |
| scalar statistic | $\bar{\mathcal A}_{\mathrm{rec}}$ on the same record |
| negative control | Not advanced disposition: verification is incomplete when $D_r$ is absent and failed when $D_r$ is mismatched |

Until those records exist, circular material is not evidence for action closure.

## Branch Barrier and Transition Cost

For a path $\Gamma:\lambda\mapsto\mathfrak B_\lambda$ of retained charts with
endpoints $\mathfrak B_{\lambda_0}$ and $\mathfrak B_{\lambda_1}$, define the
candidate receiver-side barrier by the reparametrization-invariant saddle
height
$$
B_{\mathrm{rec}}(\lambda_0,\lambda_1)
=
\inf_{\Gamma:\mathfrak B_{\lambda_0}\to\mathfrak B_{\lambda_1}}
\sup_{\lambda\in[\lambda_0,\lambda_1]}
\left[
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B_\lambda]
-
\max\!\left(
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B_{\lambda_0}],
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B_{\lambda_1}]
\right)
\right]_+
$$

This is a transition-cost target, not a proof of stability. A promoted barrier
must state the retained branch path, the root identity across the path, the
regulator state, and the same-record transmitter-side acceleration-weight records. If a
later certificate uses an integral barrier instead, the promoted record must
also declare the path measure, for example arclength in a stated metric on
chart space.

## Reduced Branch-Certificate Targets

A branch certificate that consumes this chapter must report:

| Certificate entry | Required content |
| --- | --- |
| branch identity | retained roots, inactive gaps, finite memory |
| transmitter-side acceleration weight | $D_t$, $D_r$, and $W^{\mathrm{acc}}$ enclosed on the same retained box |
| scalar stationarity | first-variation or discrete comparison record for $\bar{\mathcal A}_{\mathrm{rec}}$ |
| vector consistency | Master EOM residual on the same retained record |
| Noether pullback | energy, momentum, and angular-momentum wake-history records from the same action or realized-trajectory record; see [Energy](energy.md#energy-conservation-and-exchange) and [Delay Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md#accepted-construction-routes) |
| negative controls | rejection of missing, mismatched, or incomplete records |

The branch certificate is not promoted if any of those entries are supplied by
different root boxes, different regulator states, or different history records.

## Summary and Status

The current action-functional program is a receiver-side rebuild target. It keeps
causal-root topology, branch labels, caustic routing, and scalar comparison
targets, but action evidence requires complete transmitter-side branch records.
The next useful mathematical artifact is one retained branch packet
that binds root topology, $D_t$, $D_r$, $W^{\mathrm{acc}}$, vector residuals,
scalar statistic, Noether pullback, and negative controls required before advancement on the
same record.
