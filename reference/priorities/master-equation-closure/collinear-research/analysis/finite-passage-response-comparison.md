# Finite passage, springs and other restoring responses

> **Mixed scope: quadratic-response sections are quarantined.** The stronger stationary strict-speed theorem below assumes the added quadratic receiver multiplier. That theorem and the softened/linear examples using it are inactive special examinations, not current scenario assumptions; reuse requires explicit operator re-selection. The general local integrability criterion under its stated crossing bounds, the separate self-root criterion and the external oscillator comparisons do not depend on selecting that multiplier and retain their own conditional scopes. The original mathematics is preserved. See the [collinear quarantine disposition](../README.md#quarantined-quadratic-response-examinations).

## Result and meaning

**Derived result:** with the original arrival geometry and source-motion weighting, a distance response less singular than $1/R$ has finite accumulated acceleration on a crossing whose speed and source factor stay away from their singular limits. A stronger statement holds for the stationary mirror encounter with the proposed multiplier $1-v^2$: positive responses behaving as $R^p$ with $p>-1$ reach a finite coincidence limit at speed strictly below one. A response that tends to zero also supplies a continuous zero acceleration limit there, provided the source-speed gap remains positive. These statements do not by themselves prove a unique outgoing history or repeated bounded motion.

Springs illustrate a particularly simple response: attraction proportional to displacement, which vanishes at equilibrium and reverses direction after passage. Our [softened experiment](strict-speed-finite-contact-passage.md) already has that behavior at small delayed range. Its growing excursions show why a locally spring-shaped response and a breather are different achievements.

This 2026-09-27 comparison retains the [assumption audit](master-equation-assumption-audit.md) and treats springs, pendulums and molecular vibrations only as external comparisons. It adopts no mass, ordinary mechanical force law or molecular mechanism as an architrino premise. No new trajectory was run. The derivations are self-checked, not independently reviewed theorems.

## Separate response strength from arrival weighting

Set $c_f=1$. On the one-dimensional partner branch, let $d=x_i(T)-x_j(S)$ be signed delayed separation, $R=|d|$, $n=\operatorname{sgn}d$ and $D=1-nv_j(S)$. Write a proposed attractive response as

$$
A_i=-m(v_i)\frac{n f(R)}{D},\qquad T-S=R.
$$

$f(R)\ge0$ is the distance-response magnitude, including its coupling. The current comparison uses either $m=1$ or the already proposed $m=1-v_i^2$. This notation does not specify a new fourth speed regime. A coefficient multiplying a different power of distance has different dimensions; quantitative comparisons must state a reference range and normalization.

Suppose near a nonzero-speed crossing that $R$ is bounded above and below by positive constants times $|T-T_c|$, $D$ is bounded above and below by positive constants, and the multiplier has the same property. Then finite one-sided accumulated magnitude is equivalent, up to these bounds, to

$$
\int_0^\epsilon f(R)\,dR<\infty.
$$

For $f(R)\sim C R^p$ with $C>0$, the criterion is $p>-1$. A finite integral permits a finite velocity change but does not automatically define acceleration exactly at coincidence. Bounded magnitude, continuous acceleration, and unique continuation are stronger and distinct requirements.

| Distance magnitude near zero | Finite accumulated magnitude under these crossing bounds? | Value at coincidence | Consequence |
| --- | --- | --- | --- |
| $C/R^2$ | No | Diverges | Fails the finite-velocity passage test |
| $C/R$ | No; logarithmic divergence | Diverges | Weakening to inverse distance is insufficient |
| $C/\sqrt R$ | Yes | Diverges | A finite-velocity limit can coexist with undefined pointwise acceleration |
| $C$ | Yes | Direction jumps across zero | Requires an explicit interpretation at the sign change |
| $C\sqrt R$ | Yes | Continuous zero | The spatial response is not Lipschitz at zero; uniqueness requires a separate argument |
| $CR$ | Yes | Continuous zero | Linear restoring response is locally Lipschitz before combining it with the delay dependence |
| $CR^3$ | Yes | Continuous zero | Smooth but weaker restoration close to the center |

Here “Lipschitz” means that a small change of position changes the response by at most a fixed constant times that change. It is useful in uniqueness proofs, but is not a proof of uniqueness for the full delayed equation. For $f\to0$, assigning zero at $R=0$ is a continuous extension of the vector expression on a strict-speed domain; it remains an explicit extension beyond the original positive-delay rule.

## A stronger conclusion for the stationary strict-speed encounter

**Quarantined theorem for the additional quadratic response.** The following proof requires that expressly modified equation; it is not a conclusion for the Master Equation or for a strict speed domain alone.

Take the same mirror preparation $X_+=x$, $X_-=-x$, $x=a>0$ and inward speed $u=0$ on the supplied stationary past. Assume $f$ is positive and locally regular for $0<R\le2a$, and $f(R)\le C R^p$ near zero for some $p>-1$. Use the proposed strict-speed multiplier. Before coincidence,

$$
x'=-u,\qquad
u'=(1-u^2)\frac{f(R)}{1-u(S)},\qquad
R=x(T)+x(S)=T-S.
$$

Positive separation bounds source times away from the reception endpoint, so the same earlier-history argument as in the [quadratic-response analysis](strict-speed-quadratic-response.md) forbids speed equality there and permits regular continuation. No positive-delay self root exists while the intervening history is strictly subfield. Positivity of $f$ makes $u$ increase from zero. Once $u(T_0)=u_0>0$, the remaining distance falls at least at rate $u_0$, so coincidence is approached at a finite time $T_c$.

To check the limiting speed without assuming a speed gap, set $z=\operatorname{artanh}u$. The exact arrival derivative is

$$
\frac{dS}{dT}=\frac{1+u(T)}{1-u(S)},\qquad
dz=\frac{f(R)}{1+u(T)}\,dS.
$$

The source denominator has cancelled in this change of integration variable. This is a way to evaluate the accumulated response, not removal of the denominator from the acceleration law.

As $T\uparrow T_c$, the emission time tends to $T_c$ too. Otherwise a limiting emission $S_*<T_c$ would satisfy $T_c-S_*=x(S_*)=\int_{S_*}^{T_c}u(t)\,dt<T_c-S_*$, a contradiction. For $S$ sufficiently near $T_c$,

$$
R\ge x(S)=\int_S^{T_c}u(t)\,dt\ge u_0(T_c-S).
$$

If $-1<p<0$, this bounds $f(R)$ above by a constant times $(T_c-S)^p$, whose integral is finite. If $p\ge0$, $f$ is bounded near zero and its integral over the finite source-time interval is finite. Contributions away from coincidence are regular. Therefore $z(T_c^-)$ is finite and

$$
u(T_c^-)=\tanh z(T_c^-)<1.
$$

This establishes a permitted strict-speed incoming contact limit for the stated class. It does not compute its numerical speed or provide the outgoing solution. For $p>0$, the now-established source-speed gap also makes the incoming acceleration tend to zero. For a continuous zero extension the matching outgoing limit must still be checked. Existence, uniqueness, subsequent braking and return are separate questions.

## What changes when arrivals crowd or self roots appear?

The first table assumes a source-factor gap. If instead, on a declared crossing, $D\sim cR^q$ with $q>0$ and a nonvanishing receiver multiplier, the corresponding criterion becomes $p-q>-1$. The exponents must come from the actual histories. This observation is a warning about which bounds are required, not a prediction that every encounter has that scaling.

For the monotone self-birth geometry of the [existing self-root analysis](mirror-close-approach-causal-root-boundary.md), write $\rho=T_r-T_s$, $w_-=1-u(T_s)$ and $w_+=u(T_r)-1$. With unsuppressed self response $f_{\mathrm s}(\rho)$, the exact measure is

$$
A_{\mathrm s}\,dT_r=\frac{f_{\mathrm s}(\rho)}{w_-+w_+}\,d\rho.
$$

If $w_-+w_+\sim c\rho^k$ and $f_{\mathrm s}(\rho)\sim C\rho^p$, finite accumulation requires $p>k-1$. A prescribed smooth crossing with nonzero slope of speed at the threshold has $k=1$. A linear restoring self magnitude, $p=1$, passes this integrability test there, while a constant nonzero self magnitude does not. Slower threshold crossings require different bounds. Passing this test does not prove that such a prescribed crossing solves the coupled equation. It also does not turn a finite instantaneous contact value into a valid treatment of an entire nonisolated arrival family.

## What springs and other natural oscillators teach

**Spring, external classical comparison.** For displacement $y$ from an equilibrium position, an ideal linear spring gives $\ddot y=-\omega^2y$. The restoring acceleration is zero at equilibrium, grows with displacement and changes sign when the object crosses equilibrium. Existing velocity carries it through; it then slows and turns. This approximation applies within an elastic range, not at unlimited stretch. See [Feynman on the harmonic oscillator](https://www.feynmanlectures.caltech.edu/I_21.html) and [the limits of Hooke's law](https://www.feynmanlectures.caltech.edu/I_12.html). Crossing $y=0$ means crossing an equilibrium position, not two material points occupying the same place.

The equation itself has the derived invariant

$$
\frac{d}{dT}\left(\frac12\dot y^2+\frac12\omega^2y^2\right)
=\dot y(\ddot y+\omega^2y)=0.
$$

This is why the ideal undriven, undamped model repeats without growing excursions. Smooth contact alone is not responsible; the complete equation has a balance that holds throughout the motion. An architrino law would need its own corresponding analysis, not an imported mechanical-energy interpretation.

**Pendulum, external classical comparison.** Small swings around the bottom have the same approximate linear restoring equation. The equilibrium is an angular position of a constrained body. It illustrates regular passage through a balance point, not primitive attraction between two coincident constituents. [Feynman's oscillator discussion](https://www.feynmanlectures.caltech.edu/I_21.html) places this comparison alongside the spring.

**Molecular vibration, external effective comparison.** The harmonic approximation describes displacement from a nonzero equilibrium bond length, as set out in [MIT's spectroscopy notes](https://ocw.mit.edu/courses/5-35-introduction-to-experimental-chemistry-fall-2012/3f54ecef6f159a0a11dd60251491e075_MIT5_35F12_Mod1_Background.pdf). A smooth effective potential with $U'(r_0)=0$ and $U''(r_0)>0$ has expansion $U(r)=U(r_0)+\tfrac12U''(r_0)(r-r_0)^2+\cdots$, giving a restoring response linear in $r-r_0$. This is a model about an actual equilibrium; it does not predict nuclei passing through coincidence. Its lesson is that an approximately spring-shaped response can emerge from a more complicated interaction near a stable configuration.

## Our softened interaction already contains a linear restoring center

**Quarantined example.** The spatial expansion is an algebraic property of the stated response; the passage and return results cited here belong to the combined softened-plus-quadratic study.

The earlier finite-length response was

$$
f_\ell(R)=\frac{GR}{(R^2+\ell^2)^{3/2}}
=\frac{G}{\ell^3}R+O(R^3)\quad\text{as }R\to0.
$$

Before source and receiver weighting, its signed response is therefore $-Gd/\ell^3+O(d^3)$ close to coincidence. It belongs to the same local class as a linear spring. At large range it instead falls as $G/R^2$; an ideal linear spring grows with displacement, so their global restoring properties are different. Near-center similarity does not establish equal escape or turning behavior.

The recorded passage is consistent with this finite, vanishing center response. The subsequent speed gain remains possible because the actual equation samples delayed source positions and velocities, includes the source-motion weighting, and includes the proposed receiver factor. It is not the instantaneous oscillator equation. The [acceleration-balance audit](strict-speed-acceleration-balance.md) already records the unequal departure and return contributions. Calling the interaction a spring would not remove those differences.

## Recommendation and checkable limits

**Current comparison correction, 2026-10-02:** the historical “completed linear-response comparison” below used an unselected receiver multiplier and did not perform the originally accepted ordinary-versus-delayed comparison. Its stronger multiplier-bearing theorem remains quarantined. The [corrected comparison](multiplier-free-linear-delayed-comparison.md) independently measures the first two passages and turns without that factor, then reaches a self-root birth requiring the complete uncapped ledger. This does not replace the assumptions of the general local integrability criterion or convert the historical strict-speed theorem into a multiplier-free theorem.

The recommendations below are retained as part of the original comparison. They do not select a response for current research or reactivate the quarantined softened/linear family; any such extension requires explicit operator re-selection.

The useful response class for regular contact is a signed attraction that vanishes continuously at zero, with at least linear behavior offering a simple locally Lipschitz spatial expression. This is a mathematical recommendation, not a physical selection. Slower-than-inverse-distance singular laws can have finite accumulated effects but leave a pointwise event problem. Source crowding must be checked separately, and the strict-speed proof above must not be reused in a superfield self-interacting case.

The [completed linear-response comparison](linear-delayed-response-comparison.md) supplies the exact balance identity and bounded numerical departure-and-return calculation for a purely linear delayed response under the same arrival weighting, compared with the instantaneous oscillator. The delayed example has growing crossing speeds and turning distances; its instantaneous strict-speed counterpart repeats at its original amplitude. The speed factor and normalization are fixed in that comparison, which tests delay and its arrival weighting together. Independent full-trajectory validation and a general cycle-growth theorem remain open. The result identifies why the familiar oscillator balance does not transfer to this equation; it does not establish a spring as the physical architrino law.

Counterexamples to the integral bounds or source-time change would overturn the corresponding derived claim. An independently validated outgoing solution is needed to strengthen an incoming limit into passage, and a repeating retained history or suitable bounded-motion result is needed to strengthen passage into a breather. No such new result is asserted here.
