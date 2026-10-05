# Binary Histories and Dynamics

This chapter studies an isolated electrino–positrino pair and the complete delayed histories that determine its acceleration. It separates the unchanged Master Equation from the explicitly conditional ceiling-model calculations. Encounters constrained to one line are developed in [collinear research](../collinear-research/manuscript.md); coupling several pairs requires the complete assembly ledger developed in the [Braid Program](../braid-program/manuscript.md).

The [circular certificate](analysis/circular-binary-all-root-certificate.md) fixes the positive pair coupling $K=\kappa|q_1q_2|>0$ and a specified speed cap $c_a$, with $0<c_a\le c_f$. The conditional response used in the circular chapter leaves the ordinary acceleration unchanged below that cap. At the cap it removes only a positive component parallel to velocity, after summing the complete ordinary acceleration; braking is retained. This is the stated ceiling variant, not an adoption of a cap in the unchanged Master Equation.

## 1. Circular motion and regular local evolution

### Unchanged-equation circle above wake speed

The unchanged Master Equation also has a distinct antipodal periodic circle above wake speed. A fresh complete-root enclosure and [independent Cartesian adjudication](../braid-program/analysis/ring-inventory-independent-adjudication-2026-10-03.md) give $\beta\approx3.070356625389678759$, $R\approx0.08694167347415921394$ and $\Omega\approx35.31513142891423$ in $K=c_f=1$ units. There are four ordinary hits per receiver, including one positive-delay self hit. The exact scalar tangential zero, inward radial balance and rotation covariance make this a complete exact periodic solution. The [binary analysis](analysis/superwake-circle-stability-2026-10-03.md) retains its assumptions, enclosures and falsifiers.

This circle has two independently checked simple positive real common-radius/phase characteristic rates, approximately $17.3705115178244$ and $74.4724614324770$. A fixed-past common tangential input couples to both growing poles. Exactness therefore supplies no stability claim. The witnesses concern a formal first variation about the exact reference; a compatible nonlinear history construction and later fate remain open. The ceiling-model calculations below retain their separately stated response law.

The [collinear mirror example](../collinear-research/manuscript.md#4-incoming-acceleration-and-the-singular-endpoint) reaches a nonordinary boundary where regular evolution theorems do not select a future. The circular pair provides a complementary test within a regular chart. The argument first establishes a complete root census and acceleration compatibility, then asks which additional history-space hypotheses support local evolution. Stability remains a separate question.

<a id="51-the-exact-circular-binary"></a>
The [hundred-rung binary table](../braid-program/analysis/ring-inventory-ladders-all600-table-2026-10-03.md) now extends this baseline circle through T200. Every local balance is [independently admitted](../braid-program/analysis/ring-inventory-ladder-independent-adjudication-2026-10-03.md), then its two growing roots and tangential-input coupling are [independently checked](../braid-program/analysis/ring-inventory-spectrum-independent-adjudication-2026-10-03.md). The [fixed-inventory tail](../braid-program/analysis/ring-inventory-tail-independent-adjudication-2026-10-03.md) gives $R/R_*=1/(6\beta)+\ln2/(\pi\beta^2)+o(\beta^{-2})$, $Rv\to K/(6c_f)$ and speed spacing $\pi$. The [independent low-speed cover](../braid-program/analysis/ring-low-speed-independent-adjudication-2026-10-03.md) also confirms circle exclusion through equality, with two ordinary partner hits and no self hits exactly at wake speed. Whole-cell uniqueness, other sectors and a nonlinear superwake history remain open.

### 1.1. The exact circular binary

<a id="511-root-census-and-acceleration-compatibility"></a>
#### 1.1.1. Root census and acceleration compatibility

The [circular certificate](analysis/circular-binary-all-root-certificate.md) supplies the cleanest regular positive result. Prescribe an isolated all-past antipodal pair $\mathbf X_\pm(T)=\pm R\mathbf e_r(T)$ with opposite polarity and constant speed $R|\omega|=c_a\le c_f$. Let $\lambda=c_a/c_f$ and half-delay angle $\xi=|\omega|(T-S)/2$. Every partner root satisfies $\xi=\lambda|\cos\xi|$. Since $0<\xi\le\lambda\le1<\pi/2$, it reduces to

$$
\xi=\lambda\cos\xi,\qquad F_\lambda'(\xi)=1+\lambda\sin\xi>0
$$

There is exactly one partner root. A self root would require $\eta=\lambda|\sin\eta|$ at positive $\eta$, impossible because the chord is strictly shorter than the corresponding wake distance. The complete ordinary ledger is therefore one partner contribution per receiver, with

$$
r=2R\cos\xi,\qquad D_t=D_r=c_f(1+\lambda\sin\xi),\qquad
\mathbf A^{\mathrm{ord}}=-\frac{K}{4R^2\cos^2\xi(1+\lambda\sin\xi)}(\cos\xi\,\mathbf e_r-\sin\xi\,\mathbf e_\theta)
$$

Its radial component is inward and its tangential component forward. The boundary response removes the latter. Matching the former to $-c_a^2\mathbf e_r/R$ selects

$$
R_\ast(\lambda)=\frac{K}{4c_a^2\cos\xi(1+\lambda\sin\xi)},\qquad |\omega_\ast|=\frac{c_a}{R_\ast}
$$

At $c_a=c_f=1$, $D=\cos D$ gives $D\approx0.7390851332151606$, $R_\ast/K\approx0.2021113735152611$, $|\omega_\ast|K\approx4.9477670782$ and $P/K\approx1.269903212$. These are rounded numerical evaluations of the analytic expressions, consistent with the retained [100-digit endpoint receipt](evidence/fsc-010-circular-binary-all-root-mpmath-receipt.v1.json), not new interval certificates.

<a id="512-the-radius-family-and-interior-circle-exclusion"></a>
#### 1.1.2. The radius family and interior-circle exclusion

The [secondary theorems](analysis/circular-binary-secondary-theorems.md) delimit the result. A uniform circle strictly below the ceiling retains its unprojected forward component and fails the equation. At fixed $K,c_f$, the compatible radius decreases across $0<\lambda\le1$, with

$$
\xi=\lambda-\frac{\lambda^3}{2}+\frac{13\lambda^5}{24}+O(\lambda^7),\qquad
R_\ast=\frac{K}{4c_a^2}\left(1-\frac{\lambda^2}{2}+\frac{7\lambda^4}{8}+O(\lambda^6)\right)
$$

This gives a minimum only inside the stated family. It supplies no universal minimum radius, action quantum or maximum physical frequency. Root conditioning is favorable: $d\xi/d\lambda=\cos\xi/(1+\lambda\sin\xi)\in(0,1)$, and $\lambda=\xi/\cos\xi$ parameterizes the family explicitly. Interval-Newton-ready algebra does not replace an actual directed-rounding certificate.

The same complete raw circular ledger directly excludes an isolated all-past antipodal uniform circle under the unchanged Master Equation at every speed $0<w\le c_f$: its tangential acceleration is strictly positive, whereas uniform circular acceleration has zero tangential component. At equality the circle still has no positive-delay self root. This exclusion does not depend on a collinear continuation theorem and makes no assertion about superfield circular candidates.

<a id="513-rigid-translation-fails-the-complete-response"></a>
#### 1.1.3. Rigid translation fails the complete response

Constant-speed rigid translation of the pair must be perpendicular to its rotation plane. In the equal-ceiling helical chart, with axial speed $u_h>0$ and circular speed $v_h>0$, $u_h^2+v_h^2=c_f^2$, the half-delay remains $D$, while $D_t=D_r=v_h^2(1+\sin D)/c_f$. The complete response has a strictly negative axial component and cannot sustain constant translation. The product $r^2D_t=4D^2R^2c_f(1+\sin D)$ is independent of the speed split, so the row magnitude does not vanish as the root factors degenerate. This excludes the whole rigid uniformly translating constant-boundary-speed circle class; deformed, externally coupled or nonuniformly translating assemblies remain outside the argument. The identity $D_t=D_r$ follows from the declared chord-exchange symmetry, but equality of the factors alone does not prove that symmetry.

<a id="52-from-admissible-histories-to-local-evolution"></a>
### 1.2. From admissible histories to local evolution

<a id="521-a-geometric-neighborhood-and-a-history-space-contract"></a>
#### 1.2.1. A geometric neighborhood and a history-space contract

The [census-neighborhood theorem](analysis/circular-binary-census-stability-neighborhood.md) intersects a dimensionless $W^{2,\infty}$ neighborhood with the ceiling-admissible histories. Its explicit sufficient radius is approximately $0.0682586$ in normalized coordinates. It gives a partner-delay bracket $[R_\ast D,3R_\ast D]$, range floor $R_\ast\cos(3D/2)$, factor floors $[1+\sin(D/2)]/2$, a root-displacement bound and positive equal-time separation. Its acceleration control excludes straight self chords. These are geometry statements about admissible histories in a specified tube.

The [regular-history theorem](../analysis/regular-chart-history-to-ledger-well-posedness.md) adds what coupled evolution needs: finitely many fixed root slots, a sufficient delay window, atom-free $W^{2,\infty}$ histories with controlled acceleration, selected pointwise representatives and compatible traces, root-bracket floors on the intervening intervals, preserved inactive strata and a response cylinder mapped into itself. Root location is Lipschitz with coefficient $2/d_t$ for a transmitter floor $d_t>0$. Composing delayed position and velocity evaluations yields explicit $L^\infty$ row and total-ledger bounds; a stronger derivative-norm conclusion needs stronger acceleration regularity.

<a id="522-contraction-and-the-continuation-boundary"></a>
#### 1.2.2. Contraction and the continuation boundary

For a horizon $h$ shorter than the delay floor, all transmitter data lie in the already known history. The receiver response map is contractive when

$$
q=\frac12L_{\mathrm{rec}}h^2<1
$$

Here $L_{\mathrm{rec}}$ is the theorem's receiver-position ledger constant. The invariant-cylinder assumption is essential to make this a self-map. The exact all-past certified circle satisfies the conditional theorem and has a unique local continuation. Extending the conclusion uniformly to every history in the geometric tube still requires a verified invariant response regime and compatible right-acceleration trace. Continuation stops at the first loss of a floor, census, clock, trace, history coverage, response regime, ownership condition or event classification.

<a id="523-the-separate-stability-problem"></a>
#### 1.2.3. The separate stability problem

No orbital stability or capture follows. A stability theorem would require a constructed solution and a differentiable evolution and return map on a declared history space, then the correct symmetry reduction and spectral hypotheses. A reduced spectral radius below one, under those nonlinear hypotheses, supports local exponential asymptotic stability and its local basin; a list of multipliers without that structure does not. Nor can any regular positive-gap theorem select the [mirror continuation](../collinear-research/manuscript.md#61-delayed-braking-from-the-same-complete-past) where the reception factors vanish.

<a id="53-planar-perturbations-and-the-ellipse-question"></a>
### 1.3. Planar perturbations and the ellipse question

The exact circular history has a unique local continuation within its admitted regular chart. This is stronger than a prescribed radius balance, but it does not show attraction from nearby histories, stability, or formation. The nearby-root theorem protects reception geometry; it does not assert that evolved disturbances remain in that neighborhood. No elliptical binary has been established in this investigation. Elliptical or precessing motion must satisfy the full delayed equation and cap; it cannot be inferred from an instantaneous inverse-square analogy.

<a id="531-first-sharp-radial-response"></a>
#### 1.3.1. First sharp radial response

The [planar first-variation analysis](analysis/planar-circle-sharp-first-variation.md) begins at the exact solution $R_\ast$ with $c_f=c_a=1$. Supply a nearby unit-speed antipodal circular input history of radius $R$, angular speed $1/R$, and release the future to the equation. This is an initial-history response test, not a new equilibrium or an evolved perturbed orbit. Its sole partner root still obeys $D=\cos D$; the sharp capped initial acceleration is $-R_\ast\mathbf e_r/R^2$. For distance $\rho$ from the fixed antipodal midpoint,

$$
\dot\rho(0)=0,\qquad
\ddot\rho(0^+)=\frac1R-\frac{R_\ast}{R^2}
=\frac{R-R_\ast}{R^2}.
$$

The initially wider history therefore has outward radial acceleration, and the narrower history has inward radial acceleration. This is a derived non-restoring initial response for that input-history family. It is not a stability theorem: the changing history determines later roots, and the displayed initial formula is not a closed radial evolution equation. The supplied history may have an acceleration mismatch at release and is not asserted to meet the stronger compatible-trace continuation theorem.

<a id="532-the-delayed-perturbation-equation"></a>
#### 1.3.2. The delayed perturbation equation

For a smooth planar variation $\mathbf u_i$ about the exact circular solution, fix receiver time $t$ and let $s$ be its base emission time. Set $\mathbf r=\mathbf X_i(t)-\mathbf X_j(s)$, $\mathbf n=\mathbf r/r$, $J=1-\mathbf n\cdot\mathbf v_j(s)>0$. The sharp causal condition determines

$$
\delta s=-\frac{\mathbf n\cdot[\mathbf u_i(t)-\mathbf u_j(s)]}{J},
\qquad
\delta\mathbf r=\mathbf u_i(t)-\mathbf u_j(s)-\mathbf v_j(s)\delta s.
$$

With $\delta r=\mathbf n\cdot\delta\mathbf r$ and $\delta\mathbf n=(I-\mathbf n\mathbf n^{\mathsf T})\delta\mathbf r/r$, the transmitter-factor variation is

$$
\delta J=-\delta\mathbf n\cdot\mathbf v_j(s)-\mathbf n\cdot[\dot{\mathbf u}_j(s)+\mathbf a_j(s)\delta s].
$$

The path acceleration $\mathbf a_j(s)$ appears through evaluating velocity at the displaced emission time; it is not an added acceleration-dependent emission term. For the opposite-polarity raw row $\mathbf a=-K\mathbf n/(r^2J)$,

$$
\delta\mathbf a=-\frac{K}{r^2J}\left[\delta\mathbf n-\mathbf n\left(\frac{2\delta r}{r}+\frac{\delta J}{J}\right)\right].
$$

On the active unit-speed boundary branch, where the raw forward component remains positive and $\mathbf v_i\cdot\dot{\mathbf u}_i=0$, the effective variation is

$$
\ddot{\mathbf u}_i=(I-\mathbf v_i\mathbf v_i^{\mathsf T})\delta\mathbf a-[\dot{\mathbf u}_i\mathbf v_i^{\mathsf T}+\mathbf v_i\dot{\mathbf u}_i^{\mathsf T}]\mathbf a.
$$

These are derived necessary equations for differentiable solution families on this branch. They account for both changed root time and changed cap direction. They do not establish differentiability of the solution map or cover speed reductions into the interior, where a separate one-sided constrained analysis is required. The next stability object is the rotating-frame delayed system, its admissible modes and symmetry directions, and the connection to a justified evolution map. No spectrum, nonlinear stability, or ellipse follows from the first variation alone.

<a id="533-a-growing-antipodal-planar-mode"></a>
#### 1.3.3. A growing antipodal planar mode

The [rotating-frame mode calculation](analysis/planar-circle-growing-mode.md) advances the first variation to a characteristic equation. Put $\tau=t/R_\ast$ and write $\mathbf u_A=R_\ast(a\mathbf e_r+b\mathbf e_\theta)$, $\mathbf u_B=-\mathbf u_A$. The boundary-speed constraint is $a+b'=0$. A mode $b=e^{z\tau}$ therefore has $a=-ze^{z\tau}$ and radial velocity coefficient $q=-(1+z^2)$. Set $C=\cos D=D$, $S=\sin D$, $J=1+S$, and $E=e^{-2Dz}$. Define

$$
N=-Cz-S+E(-Cz+S),\quad M=-Sz+C+E(Sz+C),\quad
B(z)=\frac{1-2S}{2C^2}M+\frac{3N}{2CJ}+\frac{ECq}{J}.
$$

The complete delayed row and cap variation give

$$
F(z)=-z(1+z^2)-B(z)+q\frac SC=0.
$$

The phase mode satisfies $F(0)=0$, while direct differentiation gives $F'(0)=1$. On the positive real axis, $F(z)=-z^3-(S/C)z^2+O(z)\to-\infty$. Continuity therefore proves at least one positive real characteristic root: the boundary-branch linearized system has a growing antipodal planar mode. The [arithmetic instrument](../../../../scripts/field-speed-ceiling/planar-circle-growing-mode.mjs), after its known-case and phase checks, locates one at approximately $z=0.410171808$. Its approximate linear amplitude factor over one base period is $e^{2\pi z}\approx13.1600$. This is a floating-point location of an analytically established mode, not a nonlinear trajectory or an interval-certified spectrum.

The [analytic confinement estimate](analysis/planar-circle-growing-mode.md#31-analytic-confinement-of-nonnegative-real-part-roots) also proves that every characteristic root with nonnegative real part satisfies $|z|<3$. For $r=|z|$ in this half-plane, termwise bounds on the displayed characteristic equation give $|F(z)+z^3|<1.40r^2+3.31r+3.64$. The cubic $r^3-1.40r^2-3.31r-3.64$ is positive and increasing for $r\ge3$, which excludes roots there. The [reassessment](analysis/planar-circle-instability-review-reassessment.md#33-an-analytic-spectral-bound-and-an-uncertified-numerical-count) distinguishes this proof from the previously reported floating-point winding near two: that diagnostic does not certify the exact count, uniqueness or simplicity of the positive root, or the absence of other center roots.

This result is stronger than the initially non-restoring radius response, but its scope remains the sharp delayed linearization on the active ceiling branch. A nonlinear instability theorem requires compatible finite-amplitude histories realizing this tangent and a justified differentiable evolution or direct nonlinear growth argument. No elliptical orbit, final collapse, escape, or saturated motion follows. The exact circle remains a solution; its robustness now faces a concrete growing linear mode rather than an untested stability expectation.

<a id="534-nonlinear-instability-on-the-active-planar-boundary"></a>
#### 1.3.4. Nonlinear instability on the active planar boundary

The [nonlinear proof](analysis/planar-circle-nonlinear-instability.md) establishes local instability for the antipodal unit-speed branch by constructing physical all-past solutions. Its §4 checks the original Krisztin–Walther–Wu (1999), Appendix I, [Theorem I.3, pp. 168–169](https://books.google.com/books?id=dZRjVZkPG2YC&pg=PA168), including the standing hypotheses on pp. 167–168. The [independent review](evidence/planar-circle-instability-independent-review.md) and [corrected reassessment](analysis/planar-circle-instability-review-reassessment.md) record the completed source and application checks. The positions-only estimate below makes the local departure observable in positions; it does not establish motion afterward.

Let $Q$ denote planar rotation, $\mathcal J=Q(\pi/2)$, $\tau=t/R_\ast$, and reconstruct the physical pair by $\mathbf X_A=R_\ast Q(\tau)p(\tau)$, $\mathbf X_B=-\mathbf X_A$. A heading angle $\alpha$ represents the unit velocity through $e(\alpha)=(\cos\alpha,\sin\alpha)$. With dimensionless delay $d$, define

$$
b=p(\tau)+Q(-d)p(\tau-d),\quad |b|=d,\quad n=b/|b|,\quad
J_t=1+n\cdot Q(-d)e(\alpha(\tau-d)),
$$

$$
\mathcal A=-\frac{(K/R_\ast)n}{|b|^2J_t},\qquad
p'=e(\alpha)-\mathcal Jp,\qquad
\alpha'=(\mathcal Je(\alpha))\cdot\mathcal A-1.
$$

These are exactly the sharp partner equation and active ceiling projection in heading coordinates. They enforce speed one without a first-order truncation. The base circle is the constant state $p=(1,0)$, $\alpha=\pi/2$. Its forward raw acceleration is strictly positive and its root is separated from singularities.

On an open $C^1$ neighborhood of this constant history, the implicit root has derivative $G_d=-(1+\sin D)\ne0$ at the base, so the delay depends smoothly on history. Differentiating the full functional uses values of the history variation, but no derivatives of that variation; derivatives of the base history enter only as coefficients of the shifted evaluation. Its derivative therefore extends continuously to continuous variations. These are the solution-manifold smoothness conditions used by the [state-dependent-delay instability theorem](https://www.math.u-szeged.hu/ejqtde/p5301.pdf). This is a mathematical analysis tool applied to the sharp equation, not an added physical premise.

Theorem I.3 supplies a local unstable manifold with backward orbits converging geometrically to the circle. The time-map derivative has invariant stable, center and unstable subspaces; the strict stable gap and finite unstable spectrum permit the required equivalent norms. The neutral phase direction remains in the center space. The theorem needs only a local $C^1$ map and a contracting inverse restricted to its unstable graph, without an inverse of the full map. Applying it, the proof constructs actual solutions for all negative times. Their position and heading obey the reconstruction equation throughout their past, so they are admissible unit-speed histories. Choose dimensionless history length $h=4$ and a local radius bound $|p|<1+\epsilon$ with $\epsilon<1/2$. Every possible partner separation is then below $2(1+\epsilon)<h$, excluding roots older than the represented history. This is exact history coverage for these solutions, not a physical memory cutoff. Positive root and forward-acceleration margins preserve the sharp active branch locally.

The positive-root eigenvector in these coordinates is $(-z,1,1+z^2)e^{z\tau}$. It satisfies the linearized heading system and is transverse to the circular phase tangent $(0,1,1)$. Nonzero nearby points on the unstable manifold therefore depart from the circle's phase family, while their negative-time histories approach it. Starting sufficiently far back yields arbitrarily close admissible initial histories that later leave a fixed small neighborhood. This establishes local nonlinear instability even after allowing phase changes.

The derived conclusion is existential: there are admissible antipodal planar disturbances, arbitrarily small in the stated history norm, whose evolution leaves a fixed neighborhood of the circular phase family. The exact circle remains a solution. This result does not determine escape, collision, an ellipse, or saturation after departure, nor does it exclude other stable configurations. The supporting proof records the reduction, root census and checked theorem hypotheses.

The grade is derived conditional on KWW Theorem I.3 and the checked local-history hypotheses. The published mathematical theorem is an explicit proof input; its earlier page inspection and application checks do not amount to an independent reproof of that theorem or a new adjudication in this integration.

The [position-to-history lemma](analysis/planar-circle-nonlinear-instability.md#6-exact-scope-of-the-conclusion) makes the departure visible in positions on a window of dimensionless length $2h=8$. In its local domain, let $M_2>0$ bound the second derivative of rotating position and let $L$ be a uniform Lipschitz constant for the history equation. Positional distance at most $\varepsilon$ from one fixed phase circle throughout that window implies final history distance at most

$$
(1+L)\left[\varepsilon+\frac\pi2\left(2\sqrt{\varepsilon M_2}+\frac{2\varepsilon}{h}+\varepsilon\right)\right].
$$

Taylor's integral remainder first bounds the position derivative; the unit-circle chord inequality then bounds the heading difference, and the local equation bounds the state derivative. The history norm here is $\sup(|p|+|\alpha|)+\sup(|p'|+|\alpha'|)$ in one local heading lift. When the displayed bound is smaller than a fixed history departure $\eta$, positions cannot remain within $\varepsilon$ of any single phase circle on that window. A sufficiently small multiple of $\eta^2$ is a sufficient positional scale. This is a finite-window consequence of the all-past construction, not an instantaneous radial claim or a fit with an arbitrarily varying phase.

The theorem application distinguishes two steps. Instability on the endpoint-compatible solution manifold alone does not supply physical histories. The additional construction uses backward orbits on the unstable graph of a differentiable time-$a$ map, tangent to its expanding spectral subspace; matching history segments and forward uniqueness concatenate these into complete negative-time solutions. Continuous dependence fills the intervals between the discrete times. The supporting proof states this route explicitly rather than citing an introductory remark as the theorem. Reflection symmetry gives both receiver equations, and the regular-chart contraction identifies the constructed antipodal solution with the unique two-body evolution locally. Neither step requires a count of every unstable eigenvalue; existence of one positive mode suffices.

<a id="535-first-observed-departures-under-the-sharp-equation"></a>
#### 1.3.5. First observed departures under the sharp equation

The [departure diagnostic](analysis/sharp-circle-first-departure.md) integrates the sharp equation from supplied all-past unit-speed circular histories of radii $1.001R_\ast$ and $0.999R_\ast$. Their future is generated by the equation; their imposed past has an acceleration mismatch at release, so they are not claimed to be exact unstable-manifold histories. The instrument first passes the exact-circle known case and then halves both the maximum time step and turning control. These are floating-point, history-interpolated calculations, with no smoothing of the causal surface or spatial kernel and no interval certification.

For the larger-radius input, the raw forward acceleration changes sign near $t/R_\ast=19.910$, at radius approximately $2.8723R_\ast$. The finer numerical crossing bracket is $[19.9095,19.9100]$. The partner root remains ordinary: its last accepted transmitter factor is approximately 1.93981. The change matters dynamically because negative forward acceleration is braking that the ceiling must retain. The unit-speed heading formulation therefore stops at this boundary. The speed-variable continuation in §1.3.6 follows the ensuing motion; the first-departure calculation alone established neither escape nor an outer turning point.

For the smaller-radius input, the adaptive numerical run reaches the radius guard $0.01R_\ast$ near $t/R_\ast=16.4406$, with positive forward component at the evaluated accepted states and trial stages and endpoint transmitter factor approximately 0.8999. This is an observed numerical sign history, not a proof of positivity between evaluations. The guard is a stopping criterion, not a physical core or modified law. No collision, limiting spiral, or new event at zero range follows. The [receipt](evidence/sharp-circle-departure-receipt.json) binds reproduction commands, instrument hash, known-case result and refinement summaries. The [contracting-run review](analysis/sharp-circle-escape-independent-review.md#35-contracting-input-separate-resolution-question) records the different stopping events in an exploratory fixed-step instrument and the need for controlled comparisons at shared radii. That diagnostic's resolution sensitivity neither refutes nor certifies the adaptive run. The supplied-history outcomes are separate from the analytical construction of unstable admissible histories.


#### 1.3.6. Braking continuation and a sufficient escape condition

The [sharp braking continuation](analysis/sharp-circle-braking-continuation.md) follows the same supplied $1.001R_\ast$ history through release from the ceiling. On the active boundary it removes the positive forward component; after that component changes sign it evolves both velocity components with the full ordinary partner acceleration. Thus slowing below $c_f$ changes no causal weight or emission rule. Self action remains absent and no smoothing is used.

The explicit-use [numerical instrument](../../../../scripts/field-speed-ceiling/sharp-circle-braking.mjs) first passes the exact-circle control, an analytically integrated sharp subfield segment, and a separate ceiling-switch algorithm control. Two step resolutions put release near normalized time 19.90982975 at radius $2.87223645R_\ast$. The calculation then reaches time 1000 at radius $489.04675R_\ast$, speed $0.47827616c_f$, and outward radial speed $0.47816403c_f$, without an observed radial maximum, speed minimum, or return to the ceiling. These are measured floating-point results with history interpolation, not certified trajectories. Their [receipt](evidence/sharp-circle-braking-receipt.json) preserves parameters, source identity, controls and refinement summaries.

A derived sufficient condition gives this continued expansion a test beyond extending the observation horizon. Assume the exact antipodal solution through $T_0$ has Lipschitz velocity and one ordinary partner root at each receiver time. Let $e$ be a fixed unit direction, $x=e\cdot X$, with $x_0=x(T_0)>0$, velocity $v_0$, and $w_0=e\cdot v_0>0$. Suppose $S<T_0$ satisfies $g(T_0,S)<0$, where $g(t,s)=|X(t)+X(s)|-(t-s)$, and $x(s)\ge0$, $|V(s)|\le b<1$ on $[S,T_0]$. Cap monotonicity excludes sources at or before $S$ permanently; later sources are controlled by the future bounds below. If $0<u<w_0$, $|v_0|<b$, and

$$
I=\frac{k}{(1-b)u x_0}<\min\{b-|v_0|,w_0-u\},
$$

then the future remains subfield and $x(t)\ge x_0+u(t-T_0)$. To see why, assume these speed and recession bounds until a possible first failure. They give $J\ge1-b$ and hit range at least $x_0+u(t-T_0)$. Integrating the resulting inverse-square acceleration bound over the entire future gives total velocity change at most $I$. The strict inequality prevents either bound from failing, while positive range and transmitter factor preserve the regular root. Velocity converges to a nonzero limit and separation grows without bound. The focused analysis supplies the complete hypotheses and a further sufficient condition excluding a radial maximum.

The numerical history at $T_0=1000$, with $e$ along its velocity, $b=0.7$ and $u=0.35$, gives $x_0\simeq488.93209$, $I\simeq0.09637656$, and a remaining inequality margin about 0.03189960. Whole-segment bounds on the represented interpolated past also meet the source conditions. The [independent escape review](analysis/sharp-circle-escape-independent-review.md) supports the conditional criterion with completed regularity and continuation hypotheses, and separately corroborates the outward numerical trend. It does not prove escape from the exact supplied history: a validated finite-prefix enclosure must place that history inside the required margins. The supplied past's acceleration mismatch remains, so this calculation also does not determine the fate of all dynamically admissible near-circular histories.

The stronger Theorem B in the [corrected review](analysis/sharp-circle-escape-independent-review.md#24-a-sharpened-criterion) uses transverse source speed, because longitudinal source motion in the outgoing direction raises the transmitter factor. With $m=\min_{[S,T_0]}e\cdot X$, nonnegative longitudinal source velocity, $|V_\perp|\le\beta<1$ on that interval, $q_0=|V_\perp(T_0)|$ and $x_0+m>0$, its sufficient condition is

$$
I_B=\frac{k}{(1-\beta)u(x_0+m)}
<\min\{w_0-u,\beta-q_0,1-|v_0|\}.
$$

It gives $J\ge1-\beta$, includes the source's longitudinal distance in the range floor, and closes the future bounds by integrating the acceleration. Lipschitz retained velocity permits Picard–Lindelöf continuation on windows shorter than the positive delay floor; reflection symmetry and uniqueness identify the reduction with the two-body solution. The [full treatment](analysis/sharp-circle-braking-continuation.md#6-stronger-escape-criterion-and-corrected-finite-target) includes the uncertain-direction radial condition. The corrected plan seeks existence through time 300 and errors at most 0.5 in position and 0.02 in velocity on $[99.27557599180734,300]$, together with continuous root and source bounds. These are planning allowances, not achieved errors. Position allowance 1 was too large to preserve the negative old-source gap.

The preceding escape arguments also apply to an unchanged-equation antipodal solution with all their complete-history, ordinary-root, regularity, old-source exclusion and strict bootstrap hypotheses. They do not need a positive boundary projection once the future stays strictly subfield. This conditional applicability does not transfer the preceding capped numerical preparation to the unchanged model or establish escape from that supplied input.

#### 1.3.7. First-window interval equation-error bounds

The reviewed normal-cone comparison can cover ceiling contact without locating its exact time. For a comparison path satisfying $\dot{\widetilde X}=\widetilde V$ and $|\widetilde V|\le1$, let $\widetilde\nu$ be an admissible normal reaction and define the full equation defect $\mathcal R=\dot{\widetilde V}+\widetilde\nu-A[\widetilde X]$. Monotonicity gives

$$
\frac{d}{dt}|V-\widetilde V|
\le |A[X]-A[\widetilde X]|+|\mathcal R|
\quad\text{almost everywhere}.
$$

The [first-window evaluator](analysis/sharp-circle-first-window-defect.md) bounds the second term on $[0,1]$, where all partner sources remain in the supplied analytic past. It constructs continuous unit-speed arcs from sharp-row midpoint estimates, then treats their stored decimal angular rates as exact comparison coefficients. These curves satisfy the speed and position–velocity constraints exactly; they are approximations for checking the equation, not asserted physical solutions. Outward-rounded interval root brackets and the differentiated moving-root equation enclose the full defect between knots through a centered first-degree Taylor bound. Positive forward acceleration is verified, so the normal reaction cancels the radial part and the complete residual is the transverse mismatch.

Before the target calculation the evaluator encloses zero defect for the compatible $r_0=1$ circle, and encloses the known nonzero defect $1/4$ while excluding zero for the unit-speed $r_0=2$ circle. For the expanding input's comparison curve with 128 arcs and 512 time boxes, the maximum defect is bounded above by 0.000053736821978284 and its integral by 0.000044155325273996. The transmitter factor remains above 1.6706, range above 1.4780, and source times below $-0.4798$. The [receipt](evidence/sharp-circle-first-window-defect-receipt.json) binds these interval results to the exact comparison coefficients and controls.

This evaluator certifies the comparison curve's equation defect, subject to the interval backend and implementation. Turning that defect into a bound on the released solution requires the separate sensitivity and continuation argument below.

#### 1.3.8. A closed first-window trajectory bound

The [first-window trajectory analysis](analysis/sharp-circle-first-window-tube.md) completes this step for the supplied $r_0=1.001$ circular past. Within position distance $\rho=0.01$ of the comparison curve, a source-time buffer of width $\eta=0.02$ on either side of its root preserves hit range at least 1.4480, transmitter factor above 1.6100 and source time below $-0.4598$. Strict opposite signs at the buffer ends, together with speed-cap monotonicity of the causal gap, establish exactly one ordinary partner root over the entire history. Thus the acceleration depends only on the current receiver position and the unchanged analytic past throughout this region.

Implicit differentiation of the causal equation gives $D_Xs[h]=-n\cdot h/J$. Including this source-time shift in the direction, range and transmitter-factor derivatives yields the receiver-position sensitivity bound $|A(t,X)-A(t,\widetilde X)|\le L|X-\widetilde X|$, with $L=6.506751907827792756$. If $p=|X-\widetilde X|$ and $q=|V-\widetilde V|$, the normal-cone comparison then gives $p'\le q$ and $q'\le Lp+\delta$, with zero initial errors and the full defect bound $\delta$ above. Hence

$$
p(t)\le\frac{\delta}{L}\bigl(\cosh(\sqrt L\,t)-1\bigr),\qquad
q(t)\le\frac{\delta}{\sqrt L}\sinh(\sqrt L\,t).
$$

The outward-rounded bounds at time one are 0.000044992163416492 in position and 0.000134190370747611 in velocity; monotonicity makes them uniform bounds on $[0,1]$. Both are strictly inside the proposed position and velocity regions. A positive forward-acceleration bound throughout those regions permits local heading evolution at unit speed. The strict error inequalities prevent exit, while bounded acceleration and positive root margins permit continuation through time one. Normal-cone comparison supplies uniqueness, and reflection identifies the antipodal reduction with the full pair. The actual forward component stays above 0.8990253, so both members remain at field speed throughout the interval.

The [arithmetic receipt](evidence/sharp-circle-first-window-tube-receipt.json) records known analytic controls passed before the target, checks against all 512 earlier binary boxes, directed rounding and the closed inequalities. This is a derived finite-prefix result conditional on its proof, the original defect evaluation and the interval backend; it has not yet been independently reviewed. It does not establish escape, the braking-release time or an all-past admissible perturbation. The next extension must propagate the nonzero errors and verify the complete root bounds on the next interval, adding source-history error once receptions reach positive emission times.

## 2. Finite binary evolution and its limits

### 2.1. A transverse rebound without a completed return

A distinct transverse-moving release, with speed $0.25$, produces a retained rebound. Its refined first separation minimum is near $0.775771$, with interpolated zero radial speed near $T=1.71867$. The longest retained rung reaches $T=2.4$ while still moving outward and has no outer maximum. The declared return requires minimum–maximum–minimum order, so the record contains one rebound and zero completed return intervals. Period and return drift are undefined, not zero.

An earlier removed run had also motivated the breathing investigation, but its numerical authority was withdrawn when its raw bundles were removed. The later retained moving release bears its own identity and evidence; it does not revive the withdrawn run. The [stationary diagnostic](evidence/2026-07-24-stationary-rest-two-architrino-breather-diagnostic.md) and [moving return-map account](evidence/2026-07-24-current-solver-two-architrino-breather-return-map.md) keep the experiments separate.



<a id="22-local-outward-departure-and-a-later-inward-turn"></a>

### 2.2. Local outward departure and a reported radial sign change

A radially balanced circular two-member past has another behavior. On its principal one-partner-root, no-self-root chart with $0<\beta<1$, the initial radial velocity and acceleration vanish, but the delayed tangential acceleration is positive. Rotational covariance and the exact polar equations give

$$
r^{(3)}(0)=2\omega(0)a_\theta(0)>0,\qquad
r(T)=R+\frac{\omega(0)a_\theta(0)}3T^3+O(T^4).
$$

Thus the initial departure is outward at cubic order. The derivation is acceleration-first and does not import an angular-momentum conservation argument. It is local: positive tangential acceleration does not prohibit a later radial maximum, nor must it make total speed increase when radial acceleration projects negatively on velocity.

A longer retained circular-history release reports a numerical radial-velocity sign change. Its observer mapping starts at radius 2 kpc and member speed 100 km/s, while the actual numerical evolution remains normalized to $c_f=1$. Successive accepted midpoint samples change sign at normalized times 18,547.75–18,548.00, mapped to roughly 120.989–120.991 million years, with radius about 2.00840092573 kpc. The earlier total-speed maximum and this reported radial event are distinct.

That long run explicitly changes root and acceleration tolerances through a fingerprint-bound continuation sequence and records overlap controls. It is not one unchanged refinement ladder. The independent circular reference checks release calibration, not the complete later trajectory. Inspection of the measurement code shows midpoint extraction from retained position and velocity hulls; its stopping rule does not prove opposite interval radial signs for the exact solution. The [historical radial-turn record](evidence/2026-08-11-physical-binary-retained-history-radial-turn.md) is preserved, while the [current assessment](analysis/binary-review-integration-2026-10-03.md#evidence-and-reproducibility-boundaries) limits its universal-monotonicity claim to the numerical observation. No later inward fate, repeated excursion, binding or persistent branch follows.

The [slow-binary calculation](analysis/slow-binary-first-order-drift.md) derives a local row remainder bound and the forced response about the zero-delay circular control. With initial member speed $v$, $\omega=v/R$ and leading forward acceleration $f=v^3/(Rc_f)$, its first-order radial velocity is $2f(1-\cos\omega T)/\omega$. It predicts outward mean drift with a double zero near one revolution, and separately reproduces the measured speed maximum and radius increment closely. This is an analytical comparison independent of the solver, with no achieved exact-trajectory error bound. The tiny reported negative radial velocity is a higher-order event that the leading expression cannot resolve. Formal averaging gives $d(R^2)/dT=K/c_f$ and a quadratic-in-angle spiral. The [controlled finite comparison](analysis/slow-binary-controlled-secular-comparison.md) proves the drift for a corrected geometric slow radius on its explicit finite interval; the [wider-regime theorem](analysis/slow-binary-wider-regime.md), accepted by a [separate reconstruction](analysis/slow-binary-wider-regime-independent-adjudication.md), now proves all-future ordinary dispersal for the declared complete supplied mirror preparation when $0<\epsilon=v_0/c_f\le1/2000$ and $v_0^2=K/(4R_0)$. Member radius tends to infinity, total angle is finite, and velocity approaches an outward radial limit that may be zero. This is a theorem about the actual delayed solution, without an all-future averaged-rate claim or pointwise monotonic-radius claim. The [historical preparation subject](analysis/historical-binary-preparation-membership.md), accepted by its [independent adjudication](analysis/historical-binary-preparation-independent-adjudication.md), checks those hypotheses explicitly. An ideal complete circle defined by exact reflection at the recorded parameters satisfies all of them. The literal retained source has only a finite circular certificate on solver time $[-3,0]$ and separately rounded phase tokens; its enclosures do not establish an exact correlated mirror history. The theorem therefore proves dispersal of the reconstructed ideal reference, while applicability to the saved numerical source remains unresolved. Neither the later trajectory nor its tiny radial dip is certified. Non-mirror fate and Campaign 1 remain separate.

The [exact-source audit](analysis/historical-binary-exact-source-binding.md), accepted by its [independent reconstruction](analysis/historical-binary-source-binding-independent-adjudication.md), separates three statements. The newly declared ideal reflected circle fits every saved initial position and velocity evaluation enclosure. A finite reconstruction of declared controls matches both checkpoint fingerprints. Neither identifies the nominal functional source: its uniform-circle certificate fixes independently rounded decimal phases, whereas its intervals bound evaluation error. For phase difference $\Delta\ne\pi$, the midpoint of equal-radius source circles is $R_0\cos(\Delta/2)(\cos(\omega T+\Delta/2),\sin(\omega T+\Delta/2))$, after choosing the first phase as zero. That midpoint rotates and cannot be removed by a constant spatial translation. A new remote-past completion therefore cannot make the already stored nominal interval exactly mirror-correlated. The saved source's all-future fate needs a proof allowing this mismatch, complete admissible histories and both causal clocks; containment or a finite fingerprint does not substitute for that proof.

### 2.3. What a completed return experiment still requires

The exact regular-circle theorem, a short local existence result and the measured binary events provide different parts of a future return analysis. None completes it alone. A full cycle needs a retained history long enough for every causal root, a precise action on labels and rates, independent equation comparison and a refinement ladder that reaches the common target. A nearby-history experiment additionally needs its perturbation histories to lie inside the actual admissible neighborhood.

Only genuine symmetry directions may be removed before interpreting growth or multipliers. A finite-width prescribed pass region is not an attracting basin, and a numerical spectrum about a non-equilibrium has no stability referent. The existing deferred return and perturbation questions therefore remain scientifically substantive even where the corresponding bounded mathematical investigation is administratively complete.

## Ring-session analytical completion: low speed and slow growth

The [independently adjudicated all-even low-speed proof](../braid-program/analysis/ring-arbitrary-inventory-low-speed-independent-adjudication-2026-10-03.md) includes the antipodal binary: its tangential residual is strictly positive for $0<\beta\le1$ and its rest radial residual is $-1/4$ in normalized units. There is no exact low-speed circle to linearise about. At the separately admitted sufficiently high exact superwake binary loci, the [slow-branch theorem](../braid-program/analysis/ring-slow-planar-limit-independent-adjudication-2026-10-03.md) gives normalized $\lambda/\beta\to6\tau_*$, $\tau_*=0.71616422657180624\ldots$, in addition to fast growth. No computable first rung, full spectrum or nonlinear binary fate is supplied. These are completed bounded analytical results of the authorized ring session; BP-001 and deferred numerical tasks retain their status.
