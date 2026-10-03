# Independent calculation for the instantaneous collinear logarithmic comparison

## Scope and result

Two constituents start on opposite sides of the origin and accelerate toward one another under the explicitly declared instantaneous logarithmic receiver law. Both constituents move. This calculation derives their separation from their common individual inward speed, which increases strictly while separation remains positive. For every finite initial half-separation $x_0>0$, coupling $K>0$, and initial individual inward speed $0\le u_0<1$, both constituents first reach individual speed one at positive separation and finite absolute time. The instantaneous equation is regular there. Its positive-separation solution continues to a finite limiting contact time with unbounded individual speed, so it supplies no ordinary finite-velocity continuation through contact.

> Claim grade: derived. The result follows from the two receiver-coordinate gradients and the explicit solution parametrized by individual speed below. Its domain is exactly the instantaneous comparison with the stated symmetric initial data; it is not a delayed-law, EOM-solver, passage, or breather result. Falsifier: failure of the displayed parametrization to satisfy either original receiver equation and its initial data, a finite-speed zero of the separation, or a nonpositive difference between the contact and speed-one times would reject the corresponding conclusion.

This supporting calculation belongs to [LPR-001](../manuscript.md#two-moving-opposites-exact-instantaneous-approach). No initial prehistory is needed for this instantaneous ordinary differential equation. Instantaneous initial positions and velocities do not specify a prehistory for any later causal problem.

## Receiver law, coordinates, and dimensions

Use absolute time $T$ and a fixed scalar coordinate $X$ along a line in the Euclidean void. The two labels have polarities $\sigma_+=+1$ and $\sigma_-=-1$. Their receiver acceleration-potentials are

$$
\Psi_i(X_i;X_j)=-K\sigma_i\sigma_j\ln\!\left(\frac{|X_i-X_j|}{r_0}\right),
\qquad
\ddot X_i=-\partial_{X_i}\Psi_i,
\qquad i\ne j
$$

Here $K>0$ is the logarithmic coupling, $r_0>0$ is an arbitrary reference length, and dots denote derivatives with respect to $T$. In each partial derivative, the other receiver's instantaneous coordinate is held independent. There are exactly two partner contributions and no self contribution in this declared comparison. If length and time have dimensions $L$ and $\mathcal T$, then $[K]=[\Psi_i]=L^2\mathcal T^{-2}$, because one spatial derivative must have acceleration dimension $L\mathcal T^{-2}$. This does not identify $K$ with the dimensionally different coupling of an inverse-square acceleration law.

We work in normalized wake-speed units with $c_f=1$. The value one is a diagnostic individual-speed level; the instantaneous equation contains no finite-propagation geometry or speed restriction. All speeds and $K$ in exponentials below are expressed in these units, so ratios such as $u^2/K$ are dimensionless.

Set the initial instant to $T=0$ and prescribe

$$
X_+(0)=x_0,\qquad X_-(0)=-x_0,\qquad
\dot X_+(0)=-u_0,\qquad \dot X_-(0)=u_0,\qquad
x_0>0,\qquad 0\le u_0<1
$$

The case $u_0=0$ is release from rest. The case $u_0>0$ supplies an already inward-moving pair. These are initial-data choices for the same equation, without any assertion about how either preparation arose before $T=0$.

## Reduction from the two moving receivers

For distinct coordinates, differentiating before imposing the symmetry gives

$$
\partial_{X_i}\ln|X_i-X_j|=\frac{1}{X_i-X_j},
\qquad
\ddot X_i=\frac{K\sigma_i\sigma_j}{X_i-X_j}
$$

Opposite polarities therefore produce attraction. Define the positive full separation $d=X_+-X_-$ and the midpoint $C=(X_++X_-)/2$. On the domain $d>0$ the individual and reduced equations are

$$
\ddot X_+=-\frac{K}{d},\qquad
\ddot X_-=+\frac{K}{d},\qquad
\ddot C=0,\qquad
\ddot d=-\frac{2K}{d}
$$

The midpoint has $C(0)=\dot C(0)=0$, so it remains at the origin. Consequently $X_+=d/2=x$ and $X_-=-d/2=-x$, with half-separation $x=d/2$. The individual inward speed is $u=-\dot x=-\dot d/2$, and $d_0=d(0)=2x_0$. The first-order system is

$$
\dot d=-2u,\qquad \dot u=\frac{K}{d},\qquad
d(0)=d_0,\qquad u(0)=u_0
$$

Thus the individual acceleration magnitude is $K/d=K/(2x)$, while the separation acceleration has twice that magnitude. Substituting $X_-= -X_+$ into the scalar before differentiating would differentiate both coordinates along the symmetric family; that total derivative is not the receiver-coordinate partial derivative specified by the model. Keeping this distinction prevents an erroneous factor of two.

The vector field $(d,u)\mapsto(-2u,K/d)$ has continuous derivatives on $d>0$. In a neighborhood bounded away from $d=0$ its derivatives are bounded, so the ordinary differential equation has a unique local solution for any finite initial state there. In addition, $\dot u>0$ throughout this domain. The speed can therefore be used as a trajectory parameter even at rest release, where $\dot d(0)=0$ but $\dot u(0)=K/d_0>0$.

## Exact solution parametrized by individual speed

Divide the separation equation by the strictly positive speed derivative. This divides by $\dot u$, not by $u$, and is valid at $u_0=0$:

$$
\frac{\mathrm d d}{\mathrm d u}=-\frac{2u}{K}d,\qquad
\frac{\mathrm dT}{\mathrm d u}=\frac{d}{K}
$$

Integrating the first equation from $u_0$ to $u$ and then integrating the second gives the explicit parametrization

$$
d(u)=d_0\exp\!\left(-\frac{u^2-u_0^2}{K}\right)
$$

$$
T(u)=\frac{d_0}{K}\exp\!\left(\frac{u_0^2}{K}\right)
\int_{u_0}^{u}\exp\!\left(-\frac{w^2}{K}\right)\,\mathrm dw,
\qquad u_0\le u<\infty
$$

Here $w$ is a dummy individual-speed variable. Every finite $u$ gives positive $d$, and $\mathrm dT/\mathrm du=d/K>0$ gives a unique inverse $u(T)$ on the image of this time map. The positions then follow as $X_\pm(T)=\pm d(u(T))/2$.

Direct substitution checks the entire reconstruction:

$$
\frac{\mathrm d d/\mathrm du}{\mathrm dT/\mathrm du}=-2u,\qquad
\frac{\mathrm du}{\mathrm dT}=\frac{K}{d},\qquad
\ddot d=-\frac{2K}{d},\qquad
\ddot X_\pm=\mp\frac{K}{d}
$$

These identities reproduce both original receiver accelerations with the prescribed polarity signs. Evaluating at $u=u_0$ gives $T=0$, $d=d_0$, and the required individual velocities. Together with local uniqueness, the reconstruction identifies the unique forward solution throughout its positive-separation interval.

The same calculation yields the first integral

$$
u^2+K\ln\!\left(\frac{d}{d_0}\right)=u_0^2
$$

Equivalently, $\dot d^{\,2}+4K\ln(d/d_0)=4u_0^2$. This is a derived scalar invariant of the declared ordinary differential equation. No mass, mechanical-energy premise, or conserved delayed account is used. Its derivative vanishes directly because $2u\dot u+K\dot d/d=2uK/d-2Ku/d=0$.

Solving the inward branch of this invariant for elapsed time gives the separation quadrature

$$
T(d)=\frac12\int_d^{d_0}
\frac{\mathrm ds}{\sqrt{u_0^2+K\ln(d_0/s)}}
$$

The dummy variable $s$ is a positive full separation. The factor $1/2$ is required because $-\dot d=2u$. In half-separation coordinates, the equivalent expression is $T(x)=\int_x^{x_0}[u_0^2+K\ln(x_0/y)]^{-1/2}\,\mathrm dy$, where $y$ is a dummy half-separation.

## First individual-speed-one event

Since $u$ increases strictly from $u_0<1$, individual speed one is attained exactly once on the forward branch. Evaluating the parametrization at $u=1$ gives

$$
d_1=d_0\exp\!\left(-\frac{1-u_0^2}{K}\right),\qquad
x_1=x_0\exp\!\left(-\frac{1-u_0^2}{K}\right)>0
$$

$$
T_1=\frac{d_0}{K}\exp\!\left(\frac{u_0^2}{K}\right)
\int_{u_0}^{1}\exp\!\left(-\frac{w^2}{K}\right)\,\mathrm dw
$$

The integration interval has positive finite length and the integrand is positive and bounded, so $0<T_1<\infty$. Each individual has speed one there, while the closing speed of the full separation is $-\dot d(T_1)=2$. The acceleration magnitude $K/d_1$ is finite and positive. Thus speed one is crossed transversely, meaning its time derivative is nonzero, at a regular point of the instantaneous equation. The equation continues uniquely past this diagnostic level to speeds greater than one.

No forward inward-to-outward turn precedes this event: $u$ is strictly increasing, so $\dot d=-2u<0$ for every $T>0$. Rest release has zero velocity at its initial instant, but it immediately begins moving inward; it is not a forward velocity-sign-changing turn. Contact cannot precede speed one because $d(u)>0$ for every finite $u$, including $u=1$.

To express the times with named functions, define the error function by $\operatorname{erf}(z)=(2/\sqrt\pi)\int_0^z e^{-q^2}\,\mathrm dq$ and its complement by $\operatorname{erfc}(z)=1-\operatorname{erf}(z)$, where $q$ is dimensionless. Then

$$
T_1=\frac{d_0\sqrt\pi}{2\sqrt K}
\exp\!\left(\frac{u_0^2}{K}\right)
\left[
\operatorname{erf}\!\left(\frac{1}{\sqrt K}\right)
-\operatorname{erf}\!\left(\frac{u_0}{\sqrt K}\right)
\right]
$$

This special-function notation abbreviates the exact integral; it introduces no numerical approximation.

## Limiting contact time and speed

The full forward interval is determined by the limit $u\to\infty$. The Gaussian integral converges, giving

$$
T_c=\frac{d_0}{K}\exp\!\left(\frac{u_0^2}{K}\right)
\int_{u_0}^{\infty}\exp\!\left(-\frac{w^2}{K}\right)\,\mathrm dw
=\frac{d_0\sqrt\pi}{2\sqrt K}
\exp\!\left(\frac{u_0^2}{K}\right)
\operatorname{erfc}\!\left(\frac{u_0}{\sqrt K}\right)
$$

In particular, $T_c$ is finite and positive. There is a strictly positive interval after the speed-one event:

$$
T_c-T_1=\frac{d_0}{K}\exp\!\left(\frac{u_0^2}{K}\right)
\int_1^{\infty}\exp\!\left(-\frac{w^2}{K}\right)\,\mathrm dw>0
$$

As $T\uparrow T_c$, the separation decreases to zero, the individual speed increases without bound, and each individual acceleration magnitude $K/d$ also diverges. The first integral specifies the speed divergence exactly as $u=\sqrt{u_0^2+K\ln(d_0/d)}$. Thus the speed is finite at every positive separation, although its limit at contact is infinite.

The positions have continuous limits $X_\pm\to0$, but the velocities have no finite limits. Moreover, integrating $\dot u=K/d$ gives $\int_0^T K/d(S)\,\mathrm dS=u(T)-u_0\to\infty$. The singular acceleration therefore does not admit finite accumulated velocity on the incoming endpoint. The stated equation has no classical solution at $d=0$ and no continuation through that endpoint with finite continuous velocity. This excludes an ordinary finite-velocity passage under the declared equation; it makes no claim about separately prescribed weaker contact rules.

For an additional endpoint check, let $I(u)=\int_u^\infty e^{-w^2/K}\,\mathrm dw$. Comparing derivatives of $I(u)$ and $(K/2u)e^{-u^2/K}$ as $u\to\infty$ gives their ratio tending to one. Consequently

$$
T_c-T(u)\sim\frac{d(u)}{2u}=\frac{x(u)}{u}
\qquad (u\to\infty)
$$

The symbol $\sim$ means that the ratio tends to one. This limit displays how contact can have finite elapsed time even though the incoming speed has no finite limit. It is derived from the exact solution, without assuming a finite-speed contact geometry.

## Release from rest and closing-speed bookkeeping

For $u_0=0$, the speed parametrization remains regular at the initial state. The exact contact and speed-one times reduce to

$$
d_1=d_0e^{-1/K},\qquad
T_1=\frac{d_0\sqrt\pi}{2\sqrt K}\operatorname{erf}\!\left(\frac{1}{\sqrt K}\right),\qquad
T_c=\frac{d_0\sqrt\pi}{2\sqrt K}
$$

A local expansion of the original smooth system gives $u(T)=(K/d_0)T+O(T^3)$ and $d(T)=d_0-(K/d_0)T^2+O(T^4)$. Equivalently, $x(T)=x_0-KT^2/(4x_0)+O(T^4)$. Here $O(T^n)$ denotes a remainder bounded by a constant times $T^n$ near the initial instant. These expansions show immediate inward departure with the acceleration prescribed by the receiver law.

The separation quadrature has an integrable upper-end singularity at rest release: $\ln(d_0/s)\sim(d_0-s)/d_0$ as $s\uparrow d_0$, so its integrand grows only as $(d_0-s)^{-1/2}$. Using the squared first integral alone to define a first-order separation equation would lose the original acceleration condition at the rest point and can admit artificial waiting segments. Such segments have zero separation acceleration during the wait and fail $\ddot d=-2K/d_0$. The smooth two-variable system or the speed parametrization fixes the unique immediate release.

The pair's relative closing speed is $2u$, not $u$. If $u_0<1/2$, relative closing speed one occurs earlier, at

$$
d_{\mathrm{rel}}=d_0\exp\!\left(-\frac{1/4-u_0^2}{K}\right),\qquad
T_{\mathrm{rel}}=\frac{d_0}{K}\exp\!\left(\frac{u_0^2}{K}\right)
\int_{u_0}^{1/2}\exp\!\left(-\frac{w^2}{K}\right)\,\mathrm dw
$$

Here $T_{\mathrm{rel}}<T_1$ because the speed parameter reaches $1/2$ before it reaches one. If $u_0=1/2$, relative closing speed one already holds at the initial instant. If $u_0>1/2$, it is already exceeded initially and is never attained later. None of these relative-speed statements changes the first individual-speed-one event.

## Reference-radius independence and limits of inference

For opposite polarities, changing the reference radius from $r_0$ to another positive value $\widetilde r_0$ adds a coordinate-independent constant:

$$
\widetilde\Psi_i-\Psi_i=-K\ln\!\left(\frac{\widetilde r_0}{r_0}\right)
$$

The receiver derivatives are unchanged. Every trajectory, event separation, and elapsed-time expression above uses $d/d_0$ and has no dependence on $r_0$. Reference-radius independence is therefore exact; changing $r_0$ cannot turn speed-one crossing into a cap, remove contact, or produce a rebound.

The inherited [inverse-distance collinear obstructions](inverse-distance-collinear-obstructions.md) concern specified delayed or strict-speed comparisons and retain their conditional, self-checked grade. No event time or history from those comparisons enters this calculation, and this calculation does not independently establish their delayed claims. In particular, the instantaneous finite-time infinite-speed contact derived here is not an assumed finite-speed crossing, and the diagnostic $u=1$ has no causal-root singularity in the present model. Delayed reception, source factors, admitted roots, self reception, and contact continuation remain properties to establish for each separately defined model.

## Independence and check record

The calculation was constructed from the LPR-001 queue specification and the two supplied receiver laws, using full separation and individual-speed parametrization. The parallel primary calculation and new primary manuscript treatment were not read before this document was first saved. The existing conditional obstruction note was read only to preserve its scope; its formulas were not used to derive the instantaneous trajectory.

The mathematical check is the displayed analytic substitution into both receiver equations, plus the initial values, monotonicity, positive event separation, convergence of the contact integral, and cancellation under a reference-radius shift. No trajectory integrator, parameter sweep, or numerical EOM run was used. This document supplies a separately constructed analytic comparison; the integrating agent must still compare its frozen formulas with the primary calculation before reporting agreement between the two.

## Comparison after freezing this calculation

The preceding calculation was frozen before the [primary calculation](instantaneous-collinear-first-event.md) was read. The pending comparison described in the preceding record is completed in this separate section; the independent mathematics above was not changed to obtain agreement. The introductory LPR-001 navigation link was subsequently redirected from the live queue to the completed manuscript treatment; this is the only change to the frozen text above.

The command shasum -a 256 measured the entire independent file before this review section and navigation change as 5f24e059e1414973480a69eca7a36cef6db3a9ddd135597bfae9d76cf1836a5f, and measured the entire primary file before review as f989f342d7effbd6c0fb1fa1e94cd9a65eca6c891bc4074282e0560b3dbe972d. These digests identify the compared versions; they are provenance, not evidence that either derivation is correct.

The analytical comparison accepts the primary first-event theorem under its declared instantaneous assumptions. Identifying its half-separation $x$ with $d/2$ and its event subscript $v$ with the subscript $1$ used here gives the following exact matches.

| Object | Independently derived form | Primary form after $d_0=2x_0$ |
| --- | --- | --- |
| Individual inward acceleration | $\dot u=K/d$ | $\dot u=K/(2x)$ |
| First integral | $u^2=u_0^2+K\ln(d_0/d)$ | $u^2=u_0^2+K\ln(x_0/x)$ |
| Exact time | $(d_0/K)e^{u_0^2/K}\int_{u_0}^{u}e^{-w^2/K}\,\mathrm dw$ | $(2x_0/K)e^{u_0^2/K}\int_{u_0}^{u}e^{-w^2/K}\,\mathrm dw$ |
| Individual-speed-one separation | $d_1=d_0e^{-(1-u_0^2)/K}$ | $d_v=2x_v=2x_0e^{-(1-u_0^2)/K}$ |
| Contact time | $(d_0\sqrt\pi/(2\sqrt K))e^{u_0^2/K}\operatorname{erfc}(u_0/\sqrt K)$ | $(x_0\sqrt\pi/\sqrt K)e^{u_0^2/K}\operatorname{erfc}(u_0/\sqrt K)$ |
| Event order and endpoint | $0<T_1<T_c<\infty$, with $u\to\infty$ as $d\to0$ | Same statement with $T_v=T_1$ and $x=d/2$ |

The two derivations begin differently: the primary differentiates its first integral in half-separation coordinates, whereas the independent route solves the full-separation equation as a function of individual speed and obtains the first integral afterward. Both then expose the same speed-parametrized clock. Their agreement is a separate analytical reconstruction of this ordinary differential equation, not numerical replication or independent physical support for choosing the logarithmic model.

The primary's additional finite-$u_0\ge1$ cases are also supported by the independent equation $\dot u=K/d>0$ and the same positive-separation parametrization. At $u_0=1$, equality occurs initially; for $u_0>1$, there is no future equality. The integral defining a positive future speed-one time is restricted to $u_0<1$, as the primary states. Extending these initial-data cases does not change the contact conclusion for any finite $u_0\ge0$.

No mathematical defect was found in the primary's receiver-gradient normalization, polarity, rest release, event formula, event ordering, contact limit, or reference-radius independence by this explicit analytical comparison. Its exact example with $c_f=1$, $x_0=K=1$, and $u_0=0$ also follows by direct substitution into the independent formulas. This assessment does not verify the separate identification of $K$ with a coefficient in a delayed candidate, whose model derivation lies outside this calculation.

> Claim grade: derived, independently reconstructed for the stated instantaneous comparison. Falsifier: a discrepancy under the table's substitutions, a nonzero residual in either original receiver equation, or a reference-radius dependence in the compared trajectory would reject the assessment. A subsequent change to either mathematical derivation requires a fresh scoped comparison; the recorded hashes identify only the versions read here.
