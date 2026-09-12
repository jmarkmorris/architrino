# Self-Energy and Regularization

An [architrino](../../../foundations/architrino.md) is a primitive pointlike polarity carrier with no physical mass property. It emits a causal wake: a continuous family of expanding spherical surfaces centered on its past positions. A self-hit occurs when one of those earlier surfaces reaches the same architrino. The [Master Equation](../../../dynamics/master-equation.md#the-master-equation-canonical-form) specifies the resulting acceleration; it does not by itself assign a stored self-energy.

Here a candidate self-energy means the same-transmitter part of an independently constructed history-energy account, with its reference value, retained history, and boundaries declared. Its existence and allocation remain open under the [Energy construction](../../../dynamics/energy.md#energy-conservation-and-exchange). Self-acceleration, work delivered by self-hits, and stored self-history energy are different quantities. This chapter establishes bounded acceleration and work on stated regular domains and explains why those bounds do not prove finite physical self-energy or a regulator-independent limit.

## Classical self-energy pathology (contrast)

In the classical comparison, electrostatic self-energy is the energy assigned to a charge's own electric field. The electric field $\mathbf E$ measures the local electric response per test charge. A point-source potential proportional to $1/r$ gives $\|\mathbf E\|\propto1/r^2$, and the classical energy-density rule is proportional to $\|\mathbf E\|^2$. With inner cutoff $b>0$ and fixed outer radius $R>b$, the radial energy integral is proportional to $\int_b^R r^{-2}\,dr=1/b-1/R$, which diverges as $b\to0^+$. The factor $r^2$ in the three-dimensional volume element supplies the reduction from $r^{-4}$ to $r^{-2}$.

That calculation follows from the classical field-energy rule and its point-source extrapolation; it is not a substrate premise. A source-dependent scalar proportional to $1/r$ can also describe a regular receiver chart in this theory, but that fact does not supply the classical squared-gradient energy density. The distinction concerns the energy construction, not a prohibition on inverse-distance scalars. The source note below identifies the classical comparison.

## Why the zero-radius divergence is quarantined here

### Single Emissions and Continuous History

Write $T_t$ for emission time, $T_r$ for reception time, and $\Delta=T_r-T_t>0$ for the elapsed absolute time. The fixed wake speed is $c_f>0$. A surface emitted by transmitter $j$ is centered at its earlier position $\mathbf X_j(T_t)$ and has radius $R=c_f\Delta$. At a test point $\mathbf X$, let $r=\|\mathbf X-\mathbf X_j(T_t)\|$ be distance from that center. In the [constant-emission normalization](background-and-simple-action.md#continuous-emission-and-acceleration), the interval $dT_t$ carries signed measure $d\mu_j=c_fq_j\,dT_t$, where $q_j$ is the fixed polarity amplitude.

For $r>0$ and $\Delta>0$, the volume-distribution representation of that emission element is
$$
d\rho_j(T_r,\mathbf X;T_t)
=\frac{d\mu_j}{4\pi r^2}\delta(r-c_f\Delta)
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-ede9b15ac5ad6b2f)

The Dirac distribution $\delta$ selects the sphere; it has inverse-length units here. Integrating over three-dimensional space cancels the spherical area factor and returns $d\mu_j$. The surface density is therefore $d\mu_j/(4\pi R^2)$, not an independent full polarity amplitude assigned to every time in a continuous family.

One emitted surface has spherical support. The history of a stationary transmitter over a retained duration $h>0$ nevertheless gives, at every interior radius $0<r<c_fh$,
$$
\int_0^h \frac{c_fq_j}{4\pi r^2}\delta(r-c_f\Delta)\,d\Delta
=\frac{q_j}{4\pi r^2}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-f39fd1021008fb30)

The factor $1/c_f$ from the delta change of variables cancels the emission factor $c_f$. This derived stationary-history representation is consistent with the [regular receiver scalar](../../../dynamics/energy.md#net-causal-wake-potential) proportional to $1/r$. Neither quantity is an independently stored material energy density.

### Strict Delay and the Self Endpoint

For receiver $i$, a causal root is an emission time satisfying $g_{ij}(T_r;T_t)=r_{ij}-c_f(T_r-T_t)=0$, where $r_{ij}=\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|$. Self-hits have $j=i$. Strict delay requires $T_t<T_r$, so every admitted sharp root has $r_{ij}=c_f\Delta>0$. The convention $H(0)=0$, with $H$ the step selecting positive delay, records exclusion of the zero-delay diagonal; implement that exclusion in the root domain. See [Causal Set and Delay Geometry](causal-set-and-delay-geometry.md).

The exclusion is not a prescription for multiplying undefined distributions at coincidence, nor does it bound the limit as positive delay approaches zero. At finite wake width, off-root history points can also have zero separation. Excluding one endpoint supplies no control of those points or of a neighborhood of the endpoint, and it does not select a continuation through a coincident self-root birth.

### Two Distinct Regularizations

Mollification replaces the sharp delta by the Gaussian $\delta_\eta(g)=\exp[-g^2/(2\eta^2)]/(\sqrt{2\pi}\eta)$, where $\eta>0$ is a length measuring width in the distance gap $g$. In the time gap $\Delta-r/c_f$, the corresponding width is $\eta/c_f$; its normalized Gaussian equals $c_f\delta_\eta(g)$. Width and normalization must change together.

A Gaussian smooths the selector but leaves any inverse-distance singularity in the amplitude. For a concrete prescribed-history counterexample, use normalized wake-speed units $c_f=1$ and $\mathbf X_i(T)=(T/2,0,0)$, evaluated at $T_r=0$. Then $r_{ii}=\Delta/2$ and $g_{ii}=-\Delta/2$, so no positive-delay sharp self-root exists. Yet the Gaussian-only inverse-square magnitude integral is
$$
\int_0^h \frac{4}{\Delta^2}\delta_\eta(-\Delta/2)\,d\Delta=\infty
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-d57cd41627b11a67)

The Gaussian tends to the positive value $1/(\sqrt{2\pi}\eta)$ as $\Delta\to0^+$, leaving a nonintegrable inverse-square factor. This is a derived counterexample to Gaussian-only regularity on that domain, not a proposed solution of the coupled equations. Setting the endpoint value to zero cannot repair the integral.

Finite-width evaluation therefore requires a positive separation bound throughout its actual integration domain, or a separately declared spatial core. The [Master Equation auxiliary regulator](../../../dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) uses the vector kernel
$$
\frac{\mathbf r_{ij}}{(r_{ij}^2+\epsilon_c^2)^{3/2}},
\qquad \epsilon_c>0
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-ad65ba33b018c51f)

Here $\mathbf r_{ij}=\mathbf X_i(T_r)-\mathbf X_j(T_t)$ and $\epsilon_c$ is a length controlling the spatial denominator. Its magnitude is bounded by $2/(3\sqrt3\,\epsilon_c^2)$, obtained by maximizing $r/(r^2+\epsilon_c^2)^{3/2}$ at $r=\epsilon_c/\sqrt2$. Since $\delta_\eta\le1/(\sqrt{2\pi}\eta)$, finite memory and finitely many fixed-amplitude transmitters give bounded auxiliary acceleration at fixed positive $\eta,\epsilon_c$. The bound is not uniform as either regulator vanishes. The kernel's continuous zero value at $\mathbf r_{ij}=0$ supplies no physical coincidence response or stored self-energy.

The Gaussian has nonzero tails, so finite-width evaluation is an integral over emission bands and their complement, not automatically a discrete sharp-root sum. A separation floor at the roots alone does not control all sampled history points. Any omitted bands, old history, endpoint neighborhoods, or transmitters require an explicit bound; spatial normalization must also account for the truncated radial domain near a newly emitted surface.

### Regular Self-Hit Bounds

On a regular root, define the transmitter Jacobian $D_t=\partial_{T_t}g_{ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t)$, with velocity $\mathbf V_j=d\mathbf X_j/dT$ and outward unit direction $\hat{\mathbf r}_{ij}=\mathbf r_{ij}/r_{ij}$. The dimensionless acceleration weight is $W^{\mathrm{acc}}=c_f/|D_t|$. The factor $D_t$ has speed units; it arises once when the emission-time delta is collapsed. Receiver motion controls root playback, not an extra multiplier on this acceleration.

For at most $M_i$ retained self-roots at each reception time, separation $r_{ii}\ge d>0$, and $|D_t|\ge\nu_t>0$, the canonical retained sum satisfies
$$
\|\mathbf A_{i\leftarrow i}^{\mathrm{ret}}(T_r)\|
\le \frac{M_i\kappa q_i^2c_f}{\nu_t d^2}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-4b469a8f9f2c39e3)

Here $\kappa>0$ is the Master Equation coupling; $\kappa q_i^2$ has acceleration-times-area units. The inequality follows by bounding each root's inverse-square factor and weight, then using the triangle inequality. Each distinct same-identity root is counted once. The bound requires a uniformly finite root count, positive margins from the retained delay endpoints, and complete accounting of the retained roots. Older-history and excluded-domain contributions need separate bounds.

A simple nontrivial self-root also requires motion faster than $c_f$ somewhere between emission and reception. For a continuously differentiable path whose speed never exceeds $c_f$, the self-hit equality forces equality between chord length, path length, and $c_f\Delta$; this requires straight motion at exactly $c_f$, for which $D_t=0$. Exceeding $c_f$ is necessary for a simple root but is insufficient to establish one, and the receiver's current speed need not exceed $c_f$. These are the [interval-speed lemma's](../../../dynamics/master-equation.md#self-hit-regime) precise limits.

Claim grade: derived for the displayed emission identities, counterexample, kernel maximum, and regular-root bound on their stated domains. A violation with those domains and normalizations unchanged would refute the corresponding result. None establishes regulator convergence, a physical self-energy, or stability.

## Practical guidance (numerics and analysis)

Choose the wake width relative to resolved path curvature and separations, but establish the integration-domain or core bound independently. Compare complete root identities and omitted contributions under time-step, history-depth, and regulator refinement. On a common regular chart, the [two-stage recovery target](../../../dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) first takes $\eta\to0^+$ at fixed $\epsilon_c$, then $\epsilon_c\to0^+$ while separations remain positive. A different joint limit needs its own proof. Weak convergence of a selector alone does not control its product with a singular amplitude or an unbounded energy integrand.

For work bookkeeping, choose the quadratic scalar $K_{\mu,i}=\tfrac12\mu_{\mathrm{arch}}\|\mathbf V_i\|^2$, where the universal positive coefficient $\mu_{\mathrm{arch}}$ converts units and is not primitive mass. Define self-work over $[T_a,T_b]$ by
$$
\mathcal W_{\mathrm{self},i}^{\mathrm{ret}}
=\int_{T_a}^{T_b}
\mu_{\mathrm{arch}}\mathbf A_{i\leftarrow i}^{\mathrm{ret}}(T)\cdot\mathbf V_i(T)\,dT
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-68c3f54e20f56cb0)

This is the retained same-identity contribution to the change of the chosen kinetic scalar along an actual trajectory; omitted self-history and other transmitters supply separate work entries. If speed is bounded by $V_{\max}$, the regular-root bound above gives $|\mathcal W_{\mathrm{self},i}^{\mathrm{ret}}|\le\mu_{\mathrm{arch}}V_{\max}(T_b-T_a)M_i\kappa q_i^2c_f/(\nu_t d^2)$. Finite self-work does not assign a stored self-energy. A different kinetic scalar requires its own power coefficient, as explained in [Energy](../../../dynamics/energy.md).

A fixed-transmitter benchmark with scalar $U=q_i\Phi_\eta$ must declare the potential $\Phi_\eta$ in the same units, core convention, history window, and branch domain as the modeled acceleration. Require independently established gradient matching $\mu_{\mathrm{arch}}\mathbf A_i=-\nabla_{\mathbf X_i}U$ for the total modeled response. Along a smooth trajectory the chain rule then gives
$$
\Delta K_{\mu,i}
=-\Delta U+\int_{T_a}^{T_b}\partial_TU(\mathbf X_i(T),T)\,dT
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-556a130c88e2020f)

Here each $\Delta$ means the final minus initial value. The identity reduces to $\Delta K_{\mu,i}=-\Delta U$ when the explicit-time integral vanishes; a time-independent scalar with a fixed reference zero is a sufficient condition. A stationary source position alone does not exclude switched emission, changing history cuts, or explicit time dependence. A spatially constant offset depending on time would preserve the gradient and change the endpoint difference.

Moving-transmitter and self-hit branches need the [history-aware construction routes](delay-dynamics-energy.md#accepted-construction-routes), which retain action variation, delivered work, and boundary exchange as distinct objects. Defining an interaction entry by the negative integral of kinetic power makes their sum constant by construction; it supplies no independent conservation theorem or no-runaway bound. Agreement between a Green-function surrogate, an auxiliary scalar-kernel comparison, and a root implementation is implementation parity unless an independent reference verifies the same law and normalization. Such agreement cannot remove $W^{\mathrm{acc}}$ from the canonical response.

The [regularization analysis](well-posedness-and-regularization.md) states the continuation and refinement obligations. Finite self-energy, a regulator-independent subtraction defining a renormalized quantity, conserved total energy, and assembly mass recovery remain open until one construction supplies their values and boundaries. A surviving dependence on core scale, wake width, history cutoff, or subtraction convention rejects the corresponding regulator-independent claim.

## Sign-resolved bookkeeping

An assembly is an organized collection of architrinos; the [Noether sea](../../../spacetime/noether-sea.md) is the proposed ambient population of neutral assemblies. Their positive- and negative-polarity wake contributions can cancel in a declared far-wake response. A small signed sum does not bound the separate magnitudes: contributions $a$ and $-a$ have zero sum and total magnitude $2|a|$. This derived algebraic fact supports recording signed acceleration, signed power, and magnitudes separately.

Polarity is not an energy sign. Work also depends on receiver polarity and velocity, and a same-identity contribution contains $q_i^2$. The [Causal Action Functional](../../../dynamics/causal-action-functional.md#core-functional-definitions) defines a sign-blind, coupling-normalized branch-magnitude statistic with inverse-area units; its magnitude is neither physical action nor stored energy. Root records, that statistic, self-work, and any independently constructed history-energy entries retain their distinct meanings and counting conventions.

Large internal energy together with weak far-wake response remains an assembly hypothesis, graded guessed until a common branch and energy construction establishes both quantities. Sign-resolved diagnostics can reveal cancellation; they cannot by themselves distinguish physical low-energy states from high-energy states, establish shielding-induced mass, or prove stability. A claimed energy inference is rejected if it supplies only cancellation or a branch-magnitude statistic without the independent energy map.

## Source Note

Feynman, Leighton, and Sands, *The Feynman Lectures on Physics*, volume II (1964), chapter 8, [Electrostatic Energy](https://www.feynmanlectures.caltech.edu/II_08.html), §8-6 and equation (8.35), supports the classical field-energy comparison and its point-charge divergence. It is used only as an external comparison; the delayed acceleration law and the bounds above use the declared substrate geometry and bookkeeping definitions.
