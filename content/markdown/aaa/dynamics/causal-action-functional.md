# Causal Action Functional

This chapter explains how action-like scalar summaries may be used alongside delayed dynamics with transmitter-side acceleration weight. An architrino is a primitive pointlike entity carrying one polarity, and its [causal wake](../foundations/architrino.md#the-emitted-wake) is the expanding record emitted along its path. The [Master Equation](master-equation.md#the-master-equation-canonical-form) remains the vector acceleration law. The functional defined here is a branch statistic used to compare retained histories, estimate candidate barriers, and feed stability or mass-response tests without replacing that law.

The central warning is simple: a scalar action value is valid only on the same retained branch record that supplies the causal roots, transmitter-side factor, receiver-side factor, and transmitter-side acceleration weight. Otherwise the statistic has lost the causal information that made the branch physical.

## Problem Statement and Goal

The action-functional construction does not supply a separate substrate law. It defines which retained branch records may be used for action, stability, mass-response, and transition-cost calculations after the branch has been rebuilt with transmitter-side acceleration weight. A retained branch record identifies a continuously tracked family of causal roots together with the history, regulator, and event-role data needed to evaluate them.

The active branch strength is
$$
W_{ij}^{\mathrm{acc}}(T_r;T_t)
=
\frac{c_f}{|D_{t,ij}(T_r;T_t)|},
$$

[View →](../../../../equation-mapping.html#corpus-equation-590fe06025cd1656)
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

[View →](../../../../equation-mapping.html#corpus-equation-8a6251085e86126c)

A retained hit must say how densely the transmitter laid down the arriving wake surface. The receiver-side quantity is recorded separately through the signed playback derivative $D_r/D_t$.

A branch record that contains $D_t$ but omits $D_r$ can still define the instantaneous acceleration weight, but it cannot certify root continuation through reception time. Action, power, wake-history, mass-response, and conservation claims must state whether they consume transmitter-side acceleration, signed root playback, or both; they may not multiply the two by default.

## Core Functional Definitions

On a retained chart $\mathfrak B$ with active causal roots $T_t\in\mathcal C_{ij}(T_r)$, choose a native-time window $[T_0,T_1]$ and set $T_{\mathrm{win}}=T_1-T_0>0$. The receiver-side scalar branch statistic is
$$
\bar{\mathcal A}_{\mathrm{rec}}[\mathfrak B]
=
\frac{1}{T_{\mathrm{win}}}
\int_{T_0}^{T_1}
\sum_{i,j}
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\frac{W_{ij}^{\mathrm{acc}}(T_r;T_t)}
{r_{ij}^2(T_r;T_t)+\epsilon_c^2}
\,dT_r.
$$

[View →](../../../../equation-mapping.html#corpus-equation-1dd1374a989fc66f)

This statistic is sign-blind and coupling-normalized: it suppresses $\kappa$, $|q_iq_j|$, and the polarity sign $\sigma_{ij}=\mathrm{sign}(q_iq_j)$. Attractive and repulsive records therefore add by received magnitude rather than canceling by direction. After the native-time average, $\bar{\mathcal A}_{\mathrm{rec}}$ has inverse-area units; it is action-like only in the sense that it accumulates receiver-side branch-magnitude density on the retained causal record. It is not automatically the exact Fokker-type variational action, whose causal kernel is tested separately in [Master Equation](master-equation.md#exact-causal-delay-fokker-type-interaction-term).

This number measures how much same-record causal-hit magnitude a branch carries over the window after signs, coupling scale, and acceleration direction have been stripped off.

This is a scalar statistic, not the vector Master EOM itself. It keeps the same causal roots and transmitter-side acceleration weight while discarding the line-of-action direction. Its use is limited:

1. compare candidate branch classes,
2. define transition-cost and barrier targets,
3. supply scalar records for later mass or medium-response tests,
4. hand candidates back to the Master EOM for vector acceleration and conservation checks.

The exact vector acceleration/action consumer must use
$$
\frac{W_{ij}^{\mathrm{acc}}}{r_{ij}^2}
\hat{\mathbf r}_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1c3f87e44bcd0f9a)
on the same retained branch record. A scalar extremum of $\bar{\mathcal A}_{\mathrm{rec}}$ is therefore only a candidate branch label until the vector residuals close.

## Geometric/Topological Framework

The causal root locus is defined by
$$
g_{ij}(T_r,T_t)
=
\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t)=0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-40b63d537ff1ba90)

The root condition says that a wake emitted by transmitter $j$ at $T_t$ reaches receiver $i$ exactly at reception time $T_r$.

On a simple retained root, $D_t\ne0$ supplies the local inverse-function condition. A retained record is the branch-local data structure that binds the root, transmitter identity, receiver identity, regulator state, and acceleration/action entries to one history chart. A retained box is an interval or chart neighborhood that encloses those entries together; outward-rounded intervals have endpoints rounded away from the computed value so the true entry remains enclosed. The branch label persists as long as the same retained record keeps:

| Row | Required status |
| --- | --- |
| root residual | zero on the retained box |
| transmitter-side factor | bounded away from zero except declared caustic routing |
| receiver-side factor | present on the same retained record |
| transmitter-side acceleration weight | outward-rounded $W^{\mathrm{acc}}$ interval |
| inactive gaps | positive on the retained complement |
| finite memory | declared finite horizon |
| regulator state | declared $\eta$ and $\epsilon_c$ limits or finite values |

Branch labels may change only at declared boundaries: a root enters or leaves the memory window, an inactive gap closes, $D_t$ reaches a caustic boundary, a collision regulator is invoked, or the retained records no longer occupy the same box.

## Causal Writhe and Topological Use

Topological quantities such as causal writhe remain admissible only as branch geometry:
$$
Wr_c(\mathfrak B)
=
\sum_{\alpha,\beta}
\operatorname{sgn}(\alpha,\beta)\,
\chi_{\mathrm{causal}}(\alpha,\beta).
$$

[View →](../../../../equation-mapping.html#corpus-equation-d01dac9d72a83d7d)

This notation records signed causal-locus crossings or linkages in the retained record. Here $\alpha$ and $\beta$ index oriented retained causal-locus strands or strand segments in the declared projection. The indicator $\chi_{\mathrm{causal}}(\alpha,\beta)$ equals $1$ only when the two strands form an admissible crossing or linkage event on the same retained record, and equals $0$ otherwise. The sign $\operatorname{sgn}(\alpha,\beta)$ is the orientation sign of the ordered strand pair relative to the declared branch framing; it is not defined at a fold, framing slip, or unresolved collision record.

$Wr_c$ is therefore a causal-locus crossing statistic, not a replacement for the canonical framed-topology records such as $Lk=\operatorname{Wr}+\operatorname{Tw}$ in [Constructing the Absolute Frame](../foundations/constructing-the-absolute-frame.md#parity-convention-and-dynamical-chirality) and [Architrino](../foundations/architrino.md#provenance-and-persistence). It does not supply acceleration strength. Any use of $Wr_c$ in spin, chirality, confinement, or horizon-interface arguments must also state the branch record on which $D_t$, $D_r$, and $W^{\mathrm{acc}}$ are available.

## Circular Benchmark (Branch-Count Theorem)

The circular branch-count benchmark is topology only. Circular self-hit births, Jacobian-null thresholds, and inactive-gap ledgers may classify causal-root structure, but they do not imply a circular no-go, acceleration-balance result, action minimum, or mass scale.

The circular no-proliferation result supplies the relevant branch-count theorem. In the symmetric circular benchmark, write
$$
\beta_f(T)=\frac{\omega(T)R(T)}{c_f}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbf48509e929cd9b)
If $|\beta_f(T)|\le\beta_{\max}<\infty$ uniformly, then the active circular self-hit count is uniformly bounded:
$$
N_{\mathrm{self}}(T)
\le
\frac{\beta_{\max}}{\pi}+C_{\mathrm{circ}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-a320e7a66f6e837c)
where $C_{\mathrm{circ}}$ is an absolute endpoint-count constant for the circular root equation. On a one-sign subchart this has the sharper asymptotic form
$$
N_{\mathrm{self}}^{(+)}(\beta_f)=\frac{\beta_f}{\pi}+O(1).
$$

[View →](../../../../equation-mapping.html#corpus-equation-2376285d1dd4b77c)
The estimate follows from the circular self-root equation $2\beta_f|\sin(\delta/2)|=\delta$. Every positive root lies in the compact interval $0<\delta\le 2\beta_f$, and each half-winding contributes only a bounded number of intersections with the line $\delta/(2\beta_f)$. The number of available half-windings therefore grows linearly with $\beta_f$, which gives the stated bound and one-sign asymptotic count.

The branch births occur at tangencies of the circular root equation, so the root census, Jacobian-null thresholds, and inactive-gap changes are one topological ledger. On the non-translating circular chart, $D_r=D_t$, so the playback ratio is one. The acceleration weight is instead $W^{\mathrm{acc}}=c_f/|D_t|=1/|J|$ in normalized units and is not generally one. The branch-count theorem therefore uses the root structure and does not certify acceleration balance, action closure, or stability. The detailed circular derivations are in [Master Equation](master-equation.md) and the winding-index census in [Binary Dynamics](binary-dynamics.md#root-multiplicity-vs-speed).

> Claim grade: derived for the circular benchmark under the stated uniform speed bound. Falsifier: a circular causal root outside $0<\delta\le2\beta_f$, an unbounded number of intersections within one half-winding, or root counts growing faster than linearly with bounded $\beta_f$ would refute the estimate. The theorem does not claim the existence or stability of any dynamical circular branch.

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

For a path $\Gamma:\lambda\mapsto\mathfrak B_\lambda$ of retained charts with endpoints $\mathfrak B_{\lambda_0}$ and $\mathfrak B_{\lambda_1}$, define the candidate receiver-side barrier by the reparametrization-invariant saddle height
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

[View →](../../../../equation-mapping.html#corpus-equation-7f3f13319fb1edf1)

This is a transition-cost target, not a proof of stability. An accepted barrier must state the retained branch path, the root identity across the path, the regulator state, and the same-record transmitter-side acceleration-weight records. If a later certificate uses an integral barrier instead, the accepted record must also declare the path measure, for example arclength in a stated metric on chart space.

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

The branch certificate is not accepted if any of those entries are supplied by different root boxes, different regulator states, or different history records.

## What the Functional Establishes

The functional preserves causal-root topology, branch labels, caustic routing, and scalar comparison targets, but it remains a receiver-side branch statistic rather than a proved variational generator of the Master Equation. Action evidence requires a complete same-record account binding root topology, $D_t$, $D_r$, $W^{\mathrm{acc}}$, vector residuals, the scalar statistic, the Noether pullback, and the stated negative controls. Until that account closes, an extremum or barrier in $\bar{\mathcal A}_{\mathrm{rec}}$ grades a candidate history and does not establish stability, mass, or conservation.
