# Return-Cycle Lorentz Quantization

This bridge gives a compact reader-facing account of the Lorentz milestone developed in the spacetime and Noether braid chapters. Its preferred name is **Return-Cycle Lorentz Quantization**. The name is more precise than `quantized Lorentz factor` because the smooth observer-level Lorentz function is not replaced by a step function. The proposed quantized object is the admissible material realization, indexed by a closed return-cycle branch of the Noether braid causal-root ledger. A discrete branch label does not establish that the states or velocities within that branch are discrete.

The formal derivation of the axis-ratio law belongs to [Lorentz Kinematics](../../spacetime/lorentz-kinematics.md#closed-return-derivation-of-the-lorentz-axis-ratio). The canonical geometry variables belong to [Braid Envelope Geometry](../../noether-braid/braid-envelope-geometry.md#canonical-geometry-variables). The special-relativity dictionary remains in [Special Relativity and Deformable Noether Braids](./special-relativity-noether-braid.md). For the interactive geometry surface, open [Coincident-Midpoint Three-Axis Circular Lorentz Geometry App](../../../../../ideal-braid.html).

The key point is easy to lose: the smooth Lorentz formula remains the effective observer law. The proposed restriction concerns the admissible material routes by which an assembly realizes that law. A candidate Noether braid branch must close through an admitted causal-root history. Those conditions can restrict its internal state while still allowing continuous families; isolated quantized states require an additional dynamical and spectral argument.

## Naming And Scope

The older working phrase `branch-quantized Lorentz response` remains mathematically accurate. It names the proposed realization of Lorentz behavior through stable branch classes of the causal-root ledger, whose existence remains to be shown. The preferred topic name, **Return-Cycle Lorentz Quantization**, is better for a bridge document because it names the mechanism before the classification:

- `return-cycle` identifies the closed causal-wake path that must phase-close;
- `Lorentz` identifies the observer-level target law;
- `quantization` names the proposed additional restriction to admissible material states; discrete branch classes alone do not prove discrete states.

The claim is therefore not
$$
\gamma(v)\quad\text{is a step function}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-acd62affa849eb03)

The claim is
$$
\text{realized material Lorentz response}
\quad
\text{is branch-indexed by closed return-cycle ledgers}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-09d839c7cc261dfc)

Here $c_\star$ denotes the declared channel speed for the Lorentz comparison; the convention is defined in [Lorentz Kinematics](../../spacetime/lorentz-kinematics.md). A primitive wake-speed version of this comparison uses $c_\star=c_f$; a dressed observer channel requires its own transport and coordinate map.

At the effective observer level, the measured envelope can still be the usual smooth function
$$
\gamma_\star(v)
=
\frac{1}{\sqrt{1-v^2/c_\star^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bbfdd7585def83c1)

## Level Separation

The bridge separates four levels:

| Level | Role |
| --- | --- |
| Substrate ontology | Architrinos evolve in the Euclidean void under absolute time and delayed causal wakes. |
| Assembly dynamics | The proposed periodic realization must close all three indexed binary return cycles through one admitted causal-root history. |
| Geometry projection | The proposed axisymmetric ellipsoidal approximation has shape ratio $\xi=R_{\parallel}/R_{\perp}$; its accuracy must be checked against the full envelope. |
| Observer law | Contraction, clock dilation, synchronization, and two-way signal invariance are joint recovery targets for the same branch and observer map. |

This level separation is essential. The Lorentz equation is not being promoted to substrate ontology. It is an observer-level envelope that must be implemented by closed assembly dynamics.

## One-Way Roots Are Not Yet Lorentz Geometry

A one-way causal leg along the group-velocity direction exposes the preferred Noether sea frame. For the fixed-endpoint comparison, take a homogeneous isotropic propagation chart with constant channel speed $c_\star>0$, constant group speed $0\le v<c_\star$, and positive co-moving endpoint separations fixed during each return. In this subsection the durations $t_\pm$ and periods use that chart's time; it is absolute time $T$ only for a primitive chart. Define
$$
\beta_\star\equiv\frac{v}{c_\star}
\qquad
\gamma_\star\equiv\frac{1}{\sqrt{1-\beta_\star^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dcfcfd5cb198585e)

For an envelope semiaxis $R_{\parallel}$ along group velocity, the forward and rear one-way legs are
$$
t_{+}
=
\frac{R_{\parallel}}{c_\star-v}
\qquad
t_{-}
=
\frac{R_{\parallel}}{c_\star+v}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fba26134494313c5)

They are unequal for $v>0$. A single one-way leg therefore cannot be the Lorentz law, because it carries the preferred-frame asymmetry directly.

The first structural step is to change the object being analyzed. The periodic material-clock realization studied here requires a closed branch with compatible phase and causal-root history. This does not require every persistent material state to be a single periodic orbit. The Lorentz-relevant object is the closed return cycle.

## Closed Return Derivation

The longitudinal closed return time is the sum of the forward and rear legs:
$$
P_{\parallel}
=
t_{+}+t_{-}
=
\frac{R_{\parallel}}{c_\star-v}
+
\frac{R_{\parallel}}{c_\star+v}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6b732691196073fa)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_{\parallel}$ is the closed signal-cycle period parallel to the assembly group velocity. $P_{\perp}$ is the closed signal-cycle period perpendicular to the assembly group velocity.

Combining the fractions gives
$$
P_{\parallel}
=
\frac{2R_{\parallel}c_\star}{c_\star^2-v^2}
=
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1dc205065c06ee74)

The transverse return cycle uses part of the causal budget to keep pace with the translated receiver. The remaining transverse closure speed is
$$
c_{\perp}
=
c_\star\sqrt{1-\frac{v^2}{c_\star^2}}
=
\frac{c_\star}{\gamma_\star}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f5fc9cc7a625c20d)

For transverse semiaxis $R_{\perp}$,
$$
P_{\perp}
=
\frac{2R_{\perp}}{c_{\perp}}
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2721799ceb7b0340)

The imposed orientation-independent clock target is that the same material branch closes with one period in the longitudinal and transverse channels:
$$
P_{\parallel}
=
P_{\perp}
+
O(\epsilon_{\mathrm{LV}}P_0)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ae9bfb34f3a31110)

In the homogeneous zero-leakage limit,
$$
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

[View →](../../../../../equation-mapping.html#corpus-equation-05b73cb812924746)

so
$$
\xi(v)
\equiv
\frac{R_{\parallel}(v)}{R_{\perp}(v)}
=
\frac{1}{\gamma_\star(v)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dee85187f0644438)

This is a conditional kinematic axis-ratio derivation from equal return periods. The Master Equation must independently establish a branch that realizes the assumed endpoint geometry, common channel, and equal-period condition.

## Oblate Spheroidal Envelope Projection

Under an additional axisymmetric ellipsoidal approximation, the moving envelope is represented by an oblate spheroid in co-moving spatial displacements of the declared chart:
$$
\frac{x_{\perp,1}^2+x_{\perp,2}^2}{R_{\perp}^2}
+
\frac{x_{\parallel}^2}{R_{\parallel}^2}
=
1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1bf27f13625d1723)

with Lorentz-compatible semiaxes
$$
R_{\parallel}
=
\frac{R_{\perp}}{\gamma_\star}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3415bfa2e40535be)

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

[View →](../../../../../equation-mapping.html#corpus-equation-cca4b7056657b7cc)

Thus $\gamma_\star$ maps to the shape channel $\xi$, while $\lambda$ remains a separate scale, energy, and medium-response channel. Two semiaxes do not determine the full boundary without the ellipsoidal assumption; directional residuals against the retained envelope must test that approximation.

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

[View →](../../../../../equation-mapping.html#corpus-equation-d837b64cf488ff66)

For the nonnegative speed magnitude and $0<\xi\le1$, the comparison inverts to
$$
\beta_\star
=
\sqrt{1-\xi^2}
=
\sqrt{1-\frac{R_{\parallel}^2}{R_{\perp}^2}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-769fa47768899888)

In ordinary geometry language, $\beta_\star$ is the eccentricity of the oblate spheroidal envelope, while $\gamma_\star$ is the transverse-to-longitudinal aspect ratio. The envelope is not merely a picture placed beside the Lorentz factor; its measured semiaxes determine $\xi$, $\gamma_\star$, and $\beta_\star$ in the homogeneous zero-leakage limit.

The same map explains the clock side. With the same isotropic channel, $P_0=2R_0/c_\star$, and no extra transverse scaling ($\lambda=1$), the comparison gives the clock-dilation target:
$$
P(v)=\gamma_\star(v)P_0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ad47d7d0529c2a26)

Here $P$ is the cycle period of the declared clock branch. If the scale is retained, the preceding return formula instead gives $P/P_0=\lambda\gamma_\star$. Therefore the shape ratio alone does not derive the standard clock factor; the dynamics must fix $\lambda=1$ or supply a separately derived compensating clock response.

This distinction matters near the light-speed limit. For fixed positive transverse size, the oblate spheroidal envelope becomes thin because $R_{\parallel}=R_{\perp}/\gamma_\star$ tends to zero. But the forward leg of the closed cycle contains the catch-up denominator $c_\star-v$:
$$
t_+
=
\frac{R_{\parallel}}{c_\star-v}
=
\frac{R_{\perp}}{c_\star}
\sqrt{\frac{1+\beta_\star}{1-\beta_\star}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5269b150a8189755)

so $t_+\to\infty$ as $\beta_\star\to1$ at fixed positive $R_\perp$. A speed-dependent scale that shrinks sufficiently fast changes this limit; divergence is not independent of the scale channel. In the fixed-transverse-size case, the rear leg tends to zero while the closed period diverges. Thus the clock does not diverge because the envelope is large; it diverges because the forward causal update has almost no catch-up margin left.

The visible assembly envelope is not supplied by one taxonomy-designated binary. A Lorentz-admissible branch must retune all three indexed binary ledgers so that the geometry projection, clock closure, action conservation, and leakage bounds are solved by the same branch.

## Simultaneity From the Leg Difference

The closed-return derivation used only the *sum* of the two one-way legs: the forward leg $t_+=R_\parallel/(c_\star-v)$ and the backward leg $t_-=R_\parallel/(c_\star+v)$ add to the round-trip period, and equating longitudinal with transverse closure fixes $\xi=1/\gamma_\star$. The standard clock factor additionally requires the no-extra-scale condition just stated. The *difference* of the same two legs is not discarded structure; it supplies a synchronization comparison once the clock and coordinate maps have been established. For two sites of the moving assembly separated by rest longitudinal distance $x'$, the fore-and-aft asymmetry of the one-way legs is

$$
\tfrac12\left(t_+-t_-\right)
=
\frac{R_\parallel\,v}{c_\star^2-v^2}
=
\frac{R_\parallel\,v}{c_\star^2}\,\gamma_\star^2 .
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6f1f79caff527c96)

In a primitive isotropic chart with the no-extra-scale clock law, express this duration in moving-clock units ($d\tau=dT/\gamma_\star$) and use rest separation $R_\parallel=x'/\gamma_\star$, with $x'>0$. The result is the positive clock-offset magnitude

$$
\delta\tau
=
\frac{v}{c_\star^2}\,x' ,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ece0442086c80dee)

For the effective Lorentz comparison $t'=\gamma_\star(T-vX/c_\star^2)$ and $x'=\gamma_\star(X-vT)$, two moving sites separated by $x'$ at the same absolute time have $\Delta t'=-vx'/c_\star^2$. Thus the displayed $\delta\tau$ is the magnitude of their synchrony offset, not an absolute-time separation. Conversely, events simultaneous in the moving chart ($\Delta t'=0$) have $\Delta T=\gamma_\star vx'/c_\star^2$. The sign depends on which site is subtracted. These comparisons require the same clock law and Einstein synchronization; the raw leg difference alone does not derive that operational map.

The leg sum, axis ratio, and clock-offset magnitude fit one conditional Lorentz comparison. A physical boost map still requires the common scale, clock response, and synchronization identification to follow from the same admitted assembly dynamics. The algebra organizes those obligations without proving their realization.

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
\frac{P_q(v)}{P_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-01020a353ac75c6e)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_q$ is the cycle period of clock branch $q$.

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

[View →](../../../../../equation-mapping.html#corpus-equation-0fbfaf3da15d287b)

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

[View →](../../../../../equation-mapping.html#corpus-equation-4a831a61cf6530c7)

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

[View →](../../../../../equation-mapping.html#corpus-equation-af117602029923f0)

for every branch class admitted as stable clock/ruler material.

This defines the branch-indexed comparison. The smooth curve remains the observer-level target. Discreteness of the stable admissible set, rather than merely of its root labels, remains a separate quantization claim requiring proof.

## All-Binary Closure Burden

The full branch state is not just the visible oblate spheroidal envelope. For branch $q$, use the indexed-binary state
$$
B_q(v)
=
\left(
\left(R_a,\omega_a,s_a,\mathbf{A}_a\right)_{a=1}^{3};\,
\mathcal{L}_{\mathrm{root}};\,
\mathcal{L}_{\mathrm{wake}}
\right)_q
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1162a35049619abe)

Here $R_a$ are binary radii, $\omega_a$ angular frequencies, $s_a$ characteristic binary speeds, and $\mathbf A_a$ binary axes; the two ledgers retain the required causal roots and wake history.

If a one-$h$ full-cycle action transaction is independently established for a declared effective action map, represent the associated branch update as
$$
B_q(v)
\longrightarrow
B_{q'}(v+\Delta v)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e3bd7fa61f521282)

For each persistent binary index $a\in\{1,2,3\}$, the proposed branch ledger separates a phase-return condition from an additional action-quantization target:
$$
\Delta\phi_a=2\pi n_a
\qquad
n_a\in\mathbb{Z}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5f094809f331d45a)

$$
\Delta A_a=n_a h+\epsilon_a^{\mathrm{leak}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-151ea745b1d3f104)

Here $\Delta A_a$ is a cycle-action quantity, $h=2\pi\hbar$ is the effective action scale to be recovered, and $\epsilon_a^{\mathrm{leak}}$ has action units. Integer phase winding alone does not imply the second display; that requires a canonical phase/action relation and its domain, including any geometric or turning-point phase corrections. A closed branch requires the persistently indexed binary rows to be compatible with the same all-binary action transaction, not tuned independently.

For the one-quantum comparison, let $\sigma\in\{-1,+1\}$ select action removal or addition, and use canonical action variables $I_a$ with cycle actions $A_a=2\pi I_a$ in the applicable action-angle chart. The proposed total-action ledger is
$$
\Delta A_{\text{cycle}}
=
\sigma h
\qquad
\Delta I_1+\Delta I_2+\Delta I_3+\Delta I_{\text{wake}}
=
\sigma\hbar
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a4f8b75b4d192caf)

For a differentiable effective Hamiltonian with $\omega_a=\partial H/\partial I_a$, at fixed other canonical variables and external parameters, the corresponding energy comparison is
$$
\sum_{a\in\{1,2,3\}}
\int_{B_q\to B_{q'}}\omega_a\,dI_a
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e7213a7f5673d10a)

Changes in external parameters or remaining degrees of freedom require their additional work or differential terms. The displayed energy balance therefore applies only when those terms vanish or are explicitly included in the defined coupling/wake accounts; it is not a substrate energy postulate. $\mathbf A_a$ in the branch tuple denotes the source-declared binary axis variable, not an acceleration in this display.

The proposed geometry projection is the visible part of the sequence
$$
\text{one-}h\text{ action transaction}
\longrightarrow
\text{orthogonal-axis three-binary branch update}
\longrightarrow
\text{assembly-envelope oblation}
\longrightarrow
\text{effective }\gamma_\star(v)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fadcabcb97f8397f)

This sequence is the main reason the term `return-cycle` is preferred. The substantive target is to obtain the envelope as a projection of one closed all-binary branch, rather than assigning its geometry independently.

## Prediction And Failure Mode

The mathematical prediction is not a generic Lorentz-violation coefficient. It is a structured residual. Smooth residuals inside a fixed nonresonant branch chart require regular dependence of the retained solution and observable on its parameters. Even dependence on a signed translation parameter additionally requires velocity-reversal symmetry of the complete preparation, medium, orientation, and readout; group-speed magnitude alone cannot test odd contributions. Candidate sources of structure near a chart-changing event include separator approach, inter-layer resonance, finite-memory cutoff, Jacobian-floor loss, or causal-root multiplicity change.

Schematically, the two-way anisotropy diagnostic should decompose as
$$
\Delta_{\mathrm{tw}}(\beta_\star,\theta)
=
\Delta_{\mathrm{tw}}^{\mathrm{smooth}}(\beta_\star,\theta)
+
\sum_{r\in\mathcal{R}_{\mathrm{res}}}
B_r\,\mathcal{W}_r(\beta_\star)\cos(2m_r\theta+\varphi_r)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-21e536d91583bdb7)

where $\theta$ is the declared measurement orientation, $B_r$ an amplitude, $\mathcal W_r$ a branch-localized profile, $m_r$ an integer harmonic index, and $\varphi_r$ a phase. The even angular harmonics assume a readout invariant under orientation reversal; otherwise odd harmonics may occur. These functions need an independent derivation or a clearly labeled fit. An unexplained residual could reflect model inadequacy, measurement uncertainty, preparation asymmetry, or numerical error; its cause cannot be assigned from the fitted shape alone.

The failure mode is equally sharp. If the declared exclusion envelope gives
$$
\xi_q(v)
\approx
\frac{1}{\gamma_\star(v)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-db4cf011c72ab039)

but the clock channel gives a different factor,
$$
\gamma_{\mathrm{clk}}^{(q)}(v)
\neq
\gamma_{\mathrm{rul}}^{(q)}(v)
+O(\epsilon_{\mathrm{LV}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bc6df02c959a6947)

then the bridge fails. The theory must not tune the ruler, clock, momentum, and signal channels separately.

## Status

Return-Cycle Lorentz Quantization is a derivation and simulation target, not a completed theorem. The chapter supplies a conditional fixed-endpoint axis-ratio calculation, an assumed envelope projection, and proposed action/branch interfaces. The next closure step is to solve an explicit translating branch family from the master delayed law, extract $\mathcal{L}_{\mathrm{root}}^{(q)}(v)$, and verify that the same branch gives the clock factor, ruler factor, and two-way leakage bound.

That step has no confirmation from evolved dynamics. What the prescribed translating-family kinematics supply is exact algebra rather than a measured trajectory: the speed budget and internal cadence relation $\omega(v)=\omega_0/\gamma_\star$ follow from the family's own ansatz, and the raw half-leg difference is $R_\parallel v\gamma_\star^2/c_\star^2$. Converting to moving-clock units and rest separation yields the distinct offset magnitude $vx'/c_\star^2$; the raw prefactor is not a universal simultaneity-scaling prediction when $R_\parallel$ changes. The actual moving branch may deform internally. Whether its envelope's relative flattening tracks the ruler law $\xi(v)/\xi(0)\to1/\gamma_\star$ remains a target that requires evolution under the delayed acceleration law and measurement of the settled relative-periodic branch. The open remainder is therefore confirmation at any group speed, then across the full group-speed range, together with the joint clock-ruler-leakage solve on a retained branch. Whether isolated dynamics or the Noether sea stabilizes the orientation at any group speed must be established from the retained dynamics; no speed-dependent sufficiency division follows from the prescribed geometry.

If the translating-branch step succeeds, it establishes the declared clock-ruler-signal comparison. A bridge to one-$h$ action increments additionally requires their independent action-quantization derivation; the Lorentz solve alone does not supply it.
