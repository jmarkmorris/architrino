# Return-Cycle Lorentz Quantization

This bridge gives a compact reader-facing account of the Lorentz milestone developed in the spacetime and Noether braid chapters. Its preferred name is **Return-Cycle Lorentz Quantization**. The name is more precise than `quantized Lorentz factor` because the smooth observer-level Lorentz function is not replaced by a step function. The quantized object is the material realization of that function: a discrete admissible return-cycle branch of the Noether braid causal-root ledger.

The formal derivation of the axis-ratio law belongs to [Lorentz Kinematics](../../spacetime/lorentz-kinematics.md#closed-return-derivation-of-the-lorentz-axis-ratio). The canonical geometry variables belong to [Braid Envelope Geometry](../../noether-braid/braid-envelope-geometry.md#canonical-geometry-variables). The special-relativity dictionary remains in [Special Relativity and Deformable Noether Braids](./special-relativity-noether-braid.md). For the interactive geometry surface, open [Ideal Noether Braid: Lorentz Geometry App](../../../../../ideal-braid.html).

The key point is easy to lose: the smooth Lorentz formula remains the effective observer law. The discrete object is the material route by which an assembly realizes that law. A Noether braid cannot choose an arbitrary continuous internal return state; it must close through admissible causal-root ledger classes that project to the smooth envelope in the observer limit.

## Naming And Scope

The older working phrase `branch-quantized Lorentz response` remains mathematically accurate. It says that a stable material assembly realizes Lorentz behavior through branch classes of the causal-root ledger. The preferred topic name, **Return-Cycle Lorentz Quantization**, is better for a bridge document because it names the mechanism before the classification:

- `return-cycle` identifies the closed causal-wake path that must phase-close;
- `Lorentz` identifies the observer-level target law;
- `quantization` identifies that the admissible realizations are discrete branch classes, not arbitrary continuous material states.

The claim is therefore not
$$
\gamma(v)\quad\text{is a step function}
$$
The claim is
$$
\text{realized material Lorentz response}
\quad
\text{is branch-indexed by closed return-cycle ledgers}
$$
Here $c_\star$ denotes the declared channel speed for the Lorentz comparison; the convention is defined in [Lorentz Kinematics](../../spacetime/lorentz-kinematics.md). In the app's field-speed lesson, $c_\star=c_f$.

At the effective observer level, the measured envelope can still be the usual smooth function
$$
\gamma_\star(v)
=
\frac{1}{\sqrt{1-v^2/c_\star^2}}
$$

## Level Separation

The bridge separates four levels:

| Level | Role |
| --- | --- |
| Substrate ontology | Architrinos evolve in the Euclidean void under absolute time and delayed causal wakes. |
| Assembly dynamics | A Noether braid must close inner, middle, and outer binary return cycles through a causal-root ledger. |
| Geometry projection | The outer-binary exclusion envelope exposes an oblate spheroidal envelope with shape ratio $\xi=R_{\parallel}/R_{\perp}$. |
| Observer law | Physical Observers infer Lorentz contraction, clock dilation, and two-way signal invariance after branch averaging and Noether sea dressing. |

This level separation is essential. The Lorentz equation is not being promoted to substrate ontology. It is an observer-level envelope that must be implemented by closed assembly dynamics.

## One-Way Roots Are Not Yet Lorentz Geometry

A one-way causal leg along the drift direction exposes the preferred Noether sea frame. In a homogeneous dressed channel with speed $c_\star$, define
$$
\beta_\star\equiv\frac{v}{c_\star}
\qquad
\gamma_\star\equiv\frac{1}{\sqrt{1-\beta_\star^2}}
$$
For an envelope semiaxis $R_{\parallel}$ along drift, the forward and rear one-way legs are
$$
t_{+}
=
\frac{R_{\parallel}}{c_\star-v}
\qquad
t_{-}
=
\frac{R_{\parallel}}{c_\star+v}
$$
They are unequal. A single one-way leg therefore cannot be the Lorentz law, because it carries the preferred-frame asymmetry directly.

The first structural step is to change the object being analyzed. A material clock or ruler is not a one-way signal. It is a closed branch that must return with the correct phase, root count, and wake ledger. The Lorentz-relevant object is the closed return cycle.

## Closed Return Derivation

The longitudinal closed return time is the sum of the forward and rear legs:
$$
T_{\parallel}
=
t_{+}+t_{-}
=
\frac{R_{\parallel}}{c_\star-v}
+
\frac{R_{\parallel}}{c_\star+v}
$$
Combining the fractions gives
$$
T_{\parallel}
=
\frac{2R_{\parallel}c_\star}{c_\star^2-v^2}
=
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
$$

The transverse return cycle uses part of the causal budget to keep pace with the translated receiver. The remaining transverse closure speed is
$$
c_{\perp}
=
c_\star\sqrt{1-\frac{v^2}{c_\star^2}}
=
\frac{c_\star}{\gamma_\star}
$$
For transverse semiaxis $R_{\perp}$,
$$
T_{\perp}
=
\frac{2R_{\perp}}{c_{\perp}}
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

The Lorentz-admissible closure condition is that the same material branch closes with one period in the longitudinal and transverse channels:
$$
T_{\parallel}
=
T_{\perp}
+
O(\epsilon_{\mathrm{LV}}T_0)
$$
In the homogeneous zero-leakage limit,
$$
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$
so
$$
\xi(v)
\equiv
\frac{R_{\parallel}(v)}{R_{\perp}(v)}
=
\frac{1}{\gamma_\star(v)}
$$
This is the direct Lorentz-to-geometry map.

## Oblate Spheroidal Envelope Projection

The moving Noether braid envelope is represented by an oblate spheroidal envelope,
$$
\frac{x_{\perp,1}^2+x_{\perp,2}^2}{R_{\perp}^2}
+
\frac{x_{\parallel}^2}{R_{\parallel}^2}
=
1
$$
with Lorentz-compatible semiaxes
$$
R_{\parallel}
=
\frac{R_{\perp}}{\gamma_\star}
$$
in the homogeneous zero-leakage limit. If energy state or Noether sea conditions also change the transverse scale, separate the shape and scale channels:
$$
R_{\perp}(v,E,n)
=
\lambda(v,E,n)R_0
\qquad
R_{\parallel}(v,E,n)
=
\frac{\lambda(v,E,n)R_0}{\gamma_\star(v)}
$$
Thus $\gamma_\star$ maps to the shape channel $\xi$, while $\lambda$ remains a separate scale, energy, and medium-response channel.

This gives a simple geometry dictionary for the no-extra-scale lesson case:
$$
\xi
\equiv
\frac{R_{\parallel}}{R_{\perp}}
=
\sqrt{1-\beta_\star^2}
=
\frac{1}{\gamma_\star}
\qquad
\gamma_\star
=
\frac{R_{\perp}}{R_{\parallel}}
$$
The velocity fraction is therefore recovered from the envelope by
$$
\beta_\star
=
\sqrt{1-\xi^2}
=
\sqrt{1-\frac{R_{\parallel}^2}{R_{\perp}^2}}
$$
In ordinary geometry language, $\beta_\star$ is the eccentricity of the oblate spheroidal envelope, while $\gamma_\star$ is the transverse-to-longitudinal aspect ratio. The envelope is not merely a picture placed beside the Lorentz factor; its measured semiaxes determine $\xi$, $\gamma_\star$, and $\beta_\star$ in the homogeneous zero-leakage limit.

The same map explains the clock side. A moving clock branch is a closed return cycle, so time dilation is the stretch of the period required for the branch to return to compatible phase:
$$
T(v)=\gamma_\star(v)T_0
$$
in the ideal homogeneous limit. The size of the object sets the base period $T_0$; the velocity-dependent multiplier is the dimensionless factor $\gamma_\star$.

This distinction matters near the light-speed limit. The oblate spheroidal envelope becomes thin because $R_{\parallel}=R_{\perp}/\gamma_\star$ tends to zero. But the forward leg of the closed cycle contains the catch-up denominator $c_\star-v$:
$$
t_+
=
\frac{R_{\parallel}}{c_\star-v}
=
\frac{R_{\perp}}{c_\star}
\sqrt{\frac{1+\beta_\star}{1-\beta_\star}}
$$
so $t_+\to\infty$ as $\beta_\star\to1$. The rear leg tends to zero, but the closed period diverges. Thus the clock does not diverge because the envelope is large; it diverges because the forward causal update has almost no catch-up margin left.

The outer binary is special because it supplies the leading visible envelope. It is not sufficient by itself. A Lorentz-admissible branch must also retune the hidden inner and middle ledgers so that clock closure, action conservation, and leakage bounds are solved by the same branch.

## Simultaneity From the Leg Difference

The closed-return derivation used only the *sum* of the two one-way legs: the forward leg $t_+=R_\parallel/(c_\star-v)$ and the backward leg $t_-=R_\parallel/(c_\star+v)$ add to the round-trip period, and equating longitudinal with transverse closure fixes the ruler contraction $\xi=1/\gamma_\star$ and the clock dilation $T=\gamma_\star T_0$. The *difference* of the same two legs is not discarded structure; it is the third Lorentz pillar. For two sites of the moving assembly separated by rest longitudinal distance $x'$, the fore-and-aft asymmetry of the one-way legs is

$$
\tfrac12\left(t_+-t_-\right)
=
\frac{R_\parallel\,v}{c_\star^2-v^2}
=
\frac{R_\parallel\,v}{c_\star^2}\,\gamma_\star^2 .
$$

Referred to the assembly's own dilated clock ($d\tau=dT/\gamma_\star$) and its rest separation ($R_\parallel=x'/\gamma_\star$), this is the offset

$$
\delta\tau
=
\frac{v}{c_\star^2}\,x' ,
$$

the offset that recovers relativity of simultaneity once the observer-synchrony identification is made: two events assigned the corresponding physical-clock synchronization are offset by $(v/c_\star^2)\,x'$ in the absolute frame. It vanishes at rest and grows with drift.

The three pillars are therefore one accounting once that identification closes. A Lorentz boost is the full one-way leg ledger of a moving assembly: the **sum** of the legs delivers length contraction and time dilation, while the **difference** supplies the offset required for relativity of simultaneity. Length, time, and simultaneity are not three independent postulates but three readings of the same fore-and-aft causal delay — which is why a single factor $\gamma_\star$ governs all of them.

## Quantized Realization

Return-Cycle Lorentz Quantization can now be stated as a branch map. For a stable branch class $q$, define
$$
\gamma_{\mathrm{rul}}^{(q)}(v)
\equiv
\frac{R_{\perp,q}(v)}{R_{\parallel,q}(v)}
=
\frac{1}{\xi_q(v)}
\qquad
\gamma_{\mathrm{clk}}^{(q)}(v)
\equiv
\frac{T_q(v)}{T_0}
$$
The realized material Lorentz response is the branch-indexed tuple
$$
q
\longmapsto
\left(
\xi_q(v),
\gamma_{\mathrm{rul}}^{(q)}(v),
\gamma_{\mathrm{clk}}^{(q)}(v),
\mathcal{L}_{\mathrm{root}}^{(q)}(v)
\right)
$$
The admissible set at fixed background conditions is
$$
\Gamma_{\mathrm{adm}}(v)
=
\left\{
\left(
\gamma_{\mathrm{clk}}^{(q)}(v),
\gamma_{\mathrm{rul}}^{(q)}(v)
\right)
:
q\in\mathcal{Q}_{\mathrm{stable}}(v)
\right\}
$$
A successful homogeneous weak-field Lorentz limit requires
$$
\gamma_{\mathrm{clk}}^{(q)}(v)
=
\gamma_{\mathrm{rul}}^{(q)}(v)
=
\gamma_\star(v)
+
O(\epsilon_{\mathrm{LV}})
$$
for every branch class admitted as stable clock/ruler material.

This is the precise sense in which the Lorentz equation is quantized. The smooth curve remains the observer-level envelope. The Noether braid implementation is discrete because each accepted material realization must be a closed causal-root ledger class.

## All-Layer Closure Burden

The full branch state is not just the outer oblate spheroidal envelope. For branch $q$, use the all-layer state
$$
B_q(v)
=
\left(
R_I,R_M,R_O;\,
\omega_I,\omega_M,\omega_O;\,
s_I,s_M,s_O;\,
\mathbf{A}_I,\mathbf{A}_M,\mathbf{A}_O;\,
\mathcal{L}_{\mathrm{root}};\,
\mathcal{L}_{\mathrm{wake}}
\right)_q
$$
A one-$h$ full-cycle transaction should be treated as a branch update,
$$
B_q(v)
\longrightarrow
B_{q'}(v+\Delta v)
$$
For each binary layer $\ell\in\{I,M,O\}$, the branch ledger can expose a layer-level phase and action row:
$$
\Delta\phi_\ell=2\pi n_\ell
\qquad
n_\ell\in\mathbb{Z}
$$
$$
\Delta A_\ell=n_\ell h+\epsilon_\ell^{\mathrm{leak}}
$$
where $\epsilon_\ell^{\mathrm{leak}}$ records unresolved branch leakage or coupling to the wake ledger. A closed branch requires the layer rows to be compatible with the same all-layer action transaction, not tuned independently.

subject to the action ledger
$$
\Delta A_{\text{cycle}}
=
\sigma h
\qquad
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}
=
\sigma\hbar
$$
and the all-layer energy ledger
$$
\sum_{\ell\in\{I,M,O\}}
\int_{B_q\to B_{q'}}\omega_\ell\,dI_\ell
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}
$$
The geometry projection is then the visible part of the sequence
$$
\text{one-}h\text{ action transaction}
\longrightarrow
\text{nested shell braid branch update}
\longrightarrow
\text{outer-envelope oblation}
\longrightarrow
\text{effective }\gamma_\star(v)
$$

This sequence is the main reason the term `return-cycle` is preferred. The breakthrough is not simply that the outer envelope becomes oblate. The stronger claim is that the oblate spheroidal envelope is the visible projection of a closed all-layer branch ledger.

## Prediction And Failure Mode

The mathematical prediction is not a generic Lorentz-violation coefficient. It is a structured residual. Inside a fixed nonresonant branch chart, deviations from the Lorentz coefficient target should be smooth and even in drift speed. Near a chart-changing event, any surviving residual should carry a branch signature: separator approach, inter-layer resonance, finite-memory cutoff, Jacobian-floor loss, or causal-root multiplicity change.

Schematically, the two-way anisotropy diagnostic should decompose as
$$
\Delta_{\mathrm{tw}}(\beta,\theta)
=
\Delta_{\mathrm{tw}}^{\mathrm{smooth}}(\beta,\theta)
+
\sum_{r\in\mathcal{R}_{\mathrm{res}}}
B_r\,\mathcal{W}_r(\beta)\cos(2m_r\theta+\varphi_r)
$$
where each residual label $r$ must be traceable to a named branch-chart feature. A residual with no branch source is not a successful prediction; it is fitting error or an incomplete closure model.

The failure mode is equally sharp. If the outer envelope gives
$$
\xi_q(v)
\approx
\frac{1}{\gamma_\star(v)}
$$
but the clock channel gives a different factor,
$$
\gamma_{\mathrm{clk}}^{(q)}(v)
\neq
\gamma_{\mathrm{rul}}^{(q)}(v)
+O(\epsilon_{\mathrm{LV}})
$$
then the bridge fails. The theory must not tune the ruler, clock, momentum, and signal channels separately.

## Status

Return-Cycle Lorentz Quantization is a derivation and simulation target, not a completed theorem. The corpus has the closed-return axis-ratio derivation, the geometry projection, and the all-layer branch ledger scaffold. The next closure step is to solve an explicit translating branch family from the master delayed law, extract $\mathcal{L}_{\mathrm{root}}^{(q)}(v)$, and verify that the same branch gives the clock factor, ruler factor, and two-way leakage bound.

A seed-grade release of a translating rigid family gives partial confirmation of that step at small drift. The moving envelope's relative flattening tracks the ruler law, $\xi(v)/\xi(0)\to1/\gamma_\star$, agreeing within about two parts in a thousand at $v=0.2\,c_\star$; the internal cadence dilates as $\omega(v)=\omega_0/\gamma_\star$; and the leg-difference simultaneity offset is exactly zero at rest and grows with drift in step with the $v\gamma_\star^2$ prediction. The open remainder is confirmation across the full drift range together with the joint clock-ruler-leakage solve on a retained branch. At larger drift the moving assembly's axis orientation must be held by its medium rather than by the isolated assembly, a burden carried by the Noether sea response; the small-drift regime is where the assembly's own structure suffices.

If that step succeeds, the result is more than a Lorentz derivation. It is a controlled bridge between special relativity, one-$h$ action increments, and Noether braid geometry.
