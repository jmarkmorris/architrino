# Causal Action Functional

This chapter defines a scalar statistic for comparing delayed histories under the [Master Equation](master-equation.md#the-master-equation-canonical-form). An architrino is a primitive pointlike entity carrying one polarity. Its [causal wake](../foundations/architrino.md#the-wake-is-geometry-not-fluid) is the expanding geometric record emitted along its path. A receiver samples earlier emissions where those wakes intersect its current position. The statistic sums the magnitudes of these retained hits after removing their polarity, coupling scale, and acceleration direction.

A scalar comparison can help organize candidate histories, but the full retained record remains essential: different root geometries can produce the same scalar value. The vector acceleration law determines motion; this statistic is not a proved variational action for that law.

## Problem Statement and Goal

A retained branch record identifies continuously tracked causal roots together with the transmitter and receiver histories used to evaluate them. This chapter defines a finite comparison on regular branches, a projected crossing statistic, and a candidate excess saddle height between histories. These objects describe the supplied histories. Their connection to physical stability, transitions, or effective assembly response requires a separate derivation.

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

Here $i$ is the receiver, $j$ is the transmitter, $T_r$ is reception time, $T_t<T_r$ is emission time, and $\hat{\mathbf r}_{ij}$ points from the emission position to the reception position. Both $D_t$ and $D_r$ have speed units; $W^{\mathrm{acc}}$ is dimensionless. The transmitter factor measures how emission times bunch near a received root. The signed derivative $dT_t/dT_r=D_r/D_t$ instead describes playback of that root as reception time advances.

On a differentiable history with an interior simple root, $D_t\ne0$ permits local continuation by the implicit-function theorem. Recording $D_r$ supplies the playback derivative; its absence from a numerical record does not invalidate that theorem, but leaves the playback value unverified. Neither the acceleration nor this scalar statistic acquires an extra factor $D_r/D_t$ by default.

## Core Functional Definitions

Fix a finite set of $N$ architrinos, a history horizon $h>0$, and an absolute-time reception window $[T_0,T_1]$, with $T_{\mathrm{win}}=T_1-T_0>0$. Their compatible position and velocity histories cover $[T_0-h,T_1]$. On the regular retained chart $\mathfrak B$, each active root has strict delay $0<T_r-T_t<h$, positive chord length $r_{ij}$, and $D_t\ne0$. Zero-delay self coincidence is excluded. Assume a uniform finite root count, positive separation and transmitter-Jacobian floors, and positive margins from the retained delay endpoints throughout this window.

Choose a fixed comparison length $\epsilon_c\ge0$. The receiver-time average of branch magnitudes is
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

This statistic is sign-blind and coupling-normalized: it suppresses $\kappa$, $|q_iq_j|$, and the polarity sign $\sigma_{ij}=\mathrm{sign}(q_iq_j)$. Each distinct ordered transmitter-to-receiver root is counted once. Opposite directions and polarities add in magnitude. The result has inverse-area units, not units of physical action or energy. It differs from the [candidate causal-delay variational scaffold](master-equation.md#candidate-causal-delay-fokker-type-interaction-term), whose variation still has to reproduce the Master Equation.

The regular-domain assumptions make this integral finite. If at most $M$ total roots are retained at any reception time, $r\ge d_{\min}>0$, and $|D_t|\ge d_t>0$, then each summand is at most $c_f/[d_t(d_{\min}^2+\epsilon_c^2)]$ and the average is at most $Mc_f/[d_t(d_{\min}^2+\epsilon_c^2)]$. This is a derived bound for the declared finite chart; it says nothing about an infinite assembly or a chart losing its floors.

A positive $\epsilon_c$ softens only this scalar's distance denominator. It changes the comparison statistic and does not define a physical core or alter the vector EOM. Comparisons hold the member set, length units, reception window, memory horizon, and $\epsilon_c$ fixed. Doubling a record by duplicate entries doubles its sum, while rescaling all lengths and $\epsilon_c$ by a factor $a$ rescales the statistic by $a^{-2}$ when dimensionless root geometry is held fixed. Neither change establishes a physical transition cost.

The normalized directional acceleration kernel is
$$
\frac{W_{ij}^{\mathrm{acc}}}{r_{ij}^2}
\hat{\mathbf r}_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1c3f87e44bcd0f9a)

and the complete per-hit acceleration is $\kappa\sigma_{ij}|q_iq_j|$ times this vector. The total acceleration sums every retained hit. A candidate action must produce that law through its variation; the displayed acceleration kernel is not thereby an action integrand. An extremum of $\bar{\mathcal A}_{\mathrm{rec}}$ is an optional search criterion, with its variation space and constraints stated, rather than a necessary condition for a physical solution.

The proposed response application is at the effective assembly level. No physical mass belongs to an individual architrino, and this inverse-area scalar supplies no quantitative mass map. An inertial-response, energy-equivalent, or gravitational interpretation requires its own defined assembly probe and derivation; these channels cannot be identified merely because they use the same retained history. [Energy](energy.md#kinetic-energy-and-momentum-of-a-single-architrino) explains the distinction between primitive kinetic bookkeeping and candidate assembly mass.

### Limits at Singular Events

The definition above excludes caustics where $D_t=0$. A finite distance denominator does not regularize that factor. For an ordinary fold crossed transversely in reception time, a branch-pair magnitude proportional to $|T_r-T_*|^{-1/2}$ is locally integrable. A different approach can fail: the local root family $g(x;T)=x^2-T^2$ has roots $\pm|T|$ and pair weight $1/|T|$, whose integral diverges at zero. This is a mathematical counterexample to automatic integrability, not an asserted EOM trajectory.

No finite-width parameter $\eta$ enters the displayed statistic. A singular extension must separately define its mollified functional, coincidence treatment, event convention, and limiting topology, and prove that its regular-root limit agrees with the statistic where that comparison is intended. The existence of such an extension is open here. A calculation at a persistent circular tangency, where $D_t=0$ throughout the window, cannot be reported as a finite value of the present formula.

## Geometric/Topological Framework

The causal root locus is defined by
$$
g_{ij}(T_r,T_t)
=
\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t)=0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-40b63d537ff1ba90)

This equation states that a wake emitted at $T_t$ reaches its receiver at $T_r$. On the regular chart, $\partial_{T_t}g_{ij}=D_{t,ij}\ne0$. Smooth histories and strict margins from coincidence and both delay endpoints let that root continue locally. The scalar is evaluated on this root family; it does not reconstruct the family from its value.

A numerical root enclosure must prove existence and uniqueness, not merely contain zero in an interval evaluation of $g$. For example, $g(x)=x-x+1+0.1x$ has exact range $[1,1.2]$ on $[0,2]$, although direct interval arithmetic gives $[-1,3.2]$. Thus a zero-containing interval can coexist with a nonzero derivative and no root. A sign-changing bracket with a derivative of fixed nonzero sign supplies an elementary existence-and-uniqueness certificate. More general enclosures need an equally applicable argument and bounds on input, truncation, and rounding errors. Outward rounding alone covers only rounding error.

Excluded roots also require coverage of the entire remaining delay domain, after the active-root neighborhoods and declared endpoint exclusions have been removed. Continuation between overlapping enclosures must match the same root uniquely. Changing an enclosing box is a numerical representation change; it does not itself change the physical root. Conversely, two distinct roots can lie in the same large box.

Interior folds, memory-boundary entry or exit, and the excluded zero-delay self endpoint are distinct events. A generic interior fold requires a nonzero second root derivative and a transverse parameter unfolding; it creates or removes a pair. A memory-boundary crossing can change the retained count while $D_t$ stays nonzero. A change of reduced-angle label can leave the physical count unchanged. The [Binary Dynamics root atlas](binary-dynamics.md#root-multiplicity-vs-speed) illustrates all three distinctions.

## Causal Writhe and Topological Use

To define a projected crossing statistic, first supply an oriented three-dimensional realization of the retained causal-locus strands and a regular projection onto an oriented plane. This realization and projection are additional comparison data; they are not determined by the scalar magnitude. Require finitely many transverse double crossings, with a specified over/under strand at each crossing and no projected triple points or tangencies. Fix the causal-admissibility rule that selects which crossings are included before evaluating the sum.

Let $\mathcal E(\mathfrak B)$ be the finite set of individual crossing events, counting each event once even when the same two strands cross repeatedly. Define
$$
Wr_c(\mathfrak B)
=
\sum_{e\in\mathcal E(\mathfrak B)}
\operatorname{sgn}(e)\,\chi_{\mathrm{causal}}(e).
$$

[View →](../../../../equation-mapping.html#corpus-equation-d01dac9d72a83d7d)

Here $\operatorname{sgn}(e)$ is the sign of the determinant of the projected oriented over-strand and under-strand tangents in the declared plane orientation. The indicator $\chi_{\mathrm{causal}}(e)$ is one exactly for events admitted by the declared rule, and zero otherwise. Self-crossings of a strand use its two distinct parameter locations; a coincident parameter paired with itself is not a crossing. Subdividing a strand does not change the event set or count an event twice.

This definition gives a diagram statistic relative to the supplied realization, projection, orientation, and selection rule. It is unchanged under deformations that preserve the selected crossings and their signs. It is not asserted invariant under arbitrary projection changes, crossing births, or changes of framing. If the realization or selection rule is unspecified, $Wr_c$ has no determined value.

The statistic is not automatically the geometric writhe in the framed relation $Lk=\operatorname{Wr}+\operatorname{Tw}$ discussed in [Constructing the Absolute Frame](../foundations/constructing-the-absolute-frame.md#parity-convention-and-dynamical-chirality) and [Architrino](../foundations/architrino.md#provenance-and-persistence). Linking numbers require their own curve and closure definitions. Any connection to spin, protected chirality, or confinement needs a separate invariance and physical-response derivation; a crossing count supplies neither acceleration strength nor an assembly mass.

## Circular Benchmark (Branch-Count Theorem)

Consider a family of prescribed, non-translating, uniform circular histories. On each member of the family, radius $R>0$ and angular rate $\omega\ne0$ are constant over the entire relevant lookback. Define the positive speed ratio
$$
\beta_f=\frac{|\omega|R}{c_f}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbf48509e929cd9b)

The family parameter is distinct from absolute reception time. The root count of each uniform circular history is constant in reception time when the retained window is fixed. If every family member has $\beta_f\le\beta_{\max}<\infty$, its full nontrivial self-root count satisfies
$$
N_{\mathrm{self}}(\beta_f)
\le
\frac{2\beta_{\max}}{\pi}+C_{\mathrm{circ}},
\qquad C_{\mathrm{circ}}=2.
$$

[View →](../../../../equation-mapping.html#corpus-equation-a320e7a66f6e837c)

A finite retained horizon can only reduce this full count. The full absolute-sine chart has asymptotic count $N_{\mathrm{self}}(\beta_f)=2\beta_f/\pi+O(1)$. On the positive-sine subchart alone,
$$
N_{\mathrm{self}}^{(+)}(\beta_f)=\frac{\beta_f}{\pi}+O(1).
$$

[View →](../../../../equation-mapping.html#corpus-equation-2376285d1dd4b77c)

To prove these statements, let $\xi=|\omega|(T_r-T_t)/2>0$. The full root equation is $\beta_f|\sin\xi|=\xi$, hence $0<\xi\le\beta_f$. The first sine half-wave contributes at most one positive root; each subsequent half-wave contributes at most two because $\beta_f|\sin\xi|-\xi$ is strictly concave inside it. At most $\lfloor\beta_f/\pi\rfloor+1$ half-waves intersect this interval, giving $N_{\mathrm{self}}\le2\lfloor\beta_f/\pi\rfloor+1\le2\beta_f/\pi+1$ whenever roots exist. The stated constant also covers the empty-root regime.

For the matching asymptotic lower bound, every later complete half-wave whose midpoint lies below $\beta_f$ has negative values at both endpoints and a positive value at its midpoint, so it contributes two roots. Only a bounded number of end half-waves escape this argument. Half of the sine half-waves have positive sine, which gives the one-sign asymptotic above. This sign is the sine-lobe sign of the full half-angle, not the reduced-angle orientation label in the binary atlas.

Higher interior pair births occur at tangencies with $D_t=0$. The principal self onset at $\beta_f=1$ is an excluded coincident endpoint. The principal root's later passage through full delay angle $\pi$ at $\beta_f=\pi/2$ has $J=1$ and changes only its signed representation. The root-count theorem includes distinct geometric roots at tangency, but evaluating the sharp magnitude there lies outside the regular scalar domain.

On a regular uniform non-translating circular root, $D_r=D_t$ and the playback ratio is one, whereas the acceleration weight is $W^{\mathrm{acc}}=c_f/|D_t|=1/|J|$, with $J=D_t/c_f$. At a tangency the playback quotient is not evaluated as $0/0$; the known circular root family must be treated separately. The detailed geometry is given in [Master Equation](master-equation.md) and [Binary Dynamics](binary-dynamics.md#root-multiplicity-vs-speed).

> Claim grade: derived for the prescribed uniform circular family. A count exceeding $2\beta_f/\pi+2$ or an unbounded discrepancy from $2\beta_f/\pi$ would refute the respective bound or asymptotic statement. This result establishes no dynamical circular solution, action extremum, or stability property.

The uniform-history restriction is essential. For varying angular rate, the delayed angle is $\int_{T_t}^{T_r}\omega(u)du$, not $\omega(T_r)(T_r-T_t)$; varying radius also changes the chord. With $c_f=R=1$ and prescribed $\theta(T)=(\pi/3)T^2$, emission at zero and reception at one have chord one and delay one. The instantaneous uniform-circle substitution instead gives chord $\sqrt3$. Thus a bound on instantaneous speed alone does not supply this proof for nonuniform histories.

## Branch Barrier and Transition Cost

Fix the member set, history horizon, reception window, units, and $\epsilon_c$ used in the scalar comparison. Let $\mathcal D$ be a declared subset of compatible $C^1$ position histories on $[T_0-h,T_1]$ satisfying the regular-domain assumptions above, including complete root identification. Give it the induced $C^1$ topology after fixing length and time units. State any additional physical constraints defining this subset; membership in $\mathcal D$ alone does not mean that a history solves the EOM.

For two histories in $\mathcal D$, let $\Gamma$ range over all continuous paths in this specified space connecting them, with matched roots continued through overlapping charts. The current domain permits no singular or memory-boundary transition; an extension allowing such events needs an explicit new event prescription and a well-defined scalar on it. Define the excess saddle height
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

where $[x]_+=\max(x,0)$ and the infimum over an empty path class is $+\infty$. That value means the chosen admissible domain has no connecting path; it does not prove a physical impossibility. Continuous monotone reparametrizations covering the same path leave its supremum unchanged. The formula is symmetric in the endpoints when the path class is closed under reversal.

Subtracting the larger endpoint value makes this an excess height, not a directional activation cost. A monotone scalar path from zero to ten has zero excess. One exhibited path gives an upper bound on $B_{\mathrm{rec}}$; a positive lower bound requires an argument covering every admissible connecting path. The height retains inverse-area units and is not a transition energy. An integral cost would additionally require a path measure, such as arclength in a specified metric. Its relation to a physical transition remains an inferred application target, falsified by a transition class that violates the proposed response relation.

## Reduced Branch-Certificate Targets

The full retained record accompanies every scalar value. It contains the histories, uniquely identified roots, excluded-root coverage, interior and Jacobian margins, transmitter/receiver factors, and comparison conventions. A numerical approximation also states its error bounds. Equivalent overlapping enclosures can represent one record; unrelated histories or regulator conventions cannot be silently combined.

Scalar stationarity is an optional search hypothesis. A first-variation claim must specify its admissible variations, and a finite discrete comparison establishes only the values actually compared. The Master Equation does not imply stationarity of this chosen statistic. Vector consistency instead requires the complete signed acceleration residual; a small numerical residual alone does not prove the existence or stability of an exact solution.

Conservation requires an independently constructed motion, wake, and boundary account. For a chosen quadratic kinetic proxy, defining $U(T)=-\int\sum_i\mu_{\mathrm{arch}}\mathbf A_i\cdot\mathbf V_i\,dT$ makes $K+U$ constant along the supplied trajectory by construction. This identity is useful for work bookkeeping, but provides no independent Noether charge. Momentum and angular-momentum reconstructions have the same limitation. A Noether charge requires a compatible variational action and its symmetry and boundary derivation; another constructive wake-balance route must establish its own conservation identity independently. [Energy](energy.md#energy-conservation-and-exchange) and [Delay Dynamics Energy](../validation/simulations/action-energy/delay-dynamics-energy.md#accepted-construction-routes) explain these separate roles.

## What the Functional Establishes

The regular scalar measures the received branch-magnitude density of the supplied history in fixed comparison conventions. The full record retains root topology, identity, and event information; the scalar value alone does not. The circular theorem bounds a prescribed uniform history's root count, the crossing definition gives a projection-dependent statistic, and the minimax formula defines an excess height on a specified admissible space. None of these constructions derives a variational generator, a physical mass map, or a stability and conservation theorem. Those conclusions require their own dynamical, response, and independent charge derivations.
