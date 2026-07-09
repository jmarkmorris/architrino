# Collinear Breather

Receiver-normal restart notice. The return-map architecture, root-topology
lemmas, inactive-gap logic, finite-memory controls, and source-normal
transversality rows in this chapter remain candidate proof inputs. Any recapture
margin, self-drive margin, branch-force estimate, action row, or finite
certificate is closure evidence only after it is redriven with the
receiver-normal factor $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ on the same
retained branch record.

The proof process restarts at the receiver-normal branch table. Earlier margins,
constants, candidate cycles, and finite certificates are not inherited as proof
steps; at most, their root-topology and history-space structure become input
obligations that must be rebound to the same receiver-normal EOM record.

This chapter isolates the simplest reduced dynamical problem that can test a self-hit-assisted bounded-recapture mechanism without tangential geometry. Its purpose is to provide a mathematically tractable bridge between the full delayed master equation and the first rigorous existence question for bounded two-body motion.

The guiding idea is narrow: if delayed self-interaction can contribute to any bounded recapture mechanism at all, it should first be visible in a reflection-symmetric one-dimensional opposite-polarity binary. If it cannot be made to work there, then later claims about maximum-curvature binaries, nested shell braid locking, and assembly-level closure lose their cleanest analytic foothold.

The reader should treat this as a proof laboratory, not as the final physical assembly. The one-dimensional setup removes angular momentum and shell geometry so the delayed self-hit question is exposed directly. Success here would supply a controlled recapture mechanism to lift into richer branches; failure here would sharply constrain what later braid arguments are allowed to assume.

## Overview

In Lineland there is only a single endless road. Upon it travel two polarity-bearing points. From a great distance they rush toward one another, drawn together by their mutual pull. Each accelerates as it approaches the other. Yet whatever influence a point emits into the line does not act everywhere at once; it spreads along the road at a finite pace, leaving behind a wake of its past motion. For a time each point runs ahead of the disturbance it has already sent out. They meet, pass, and continue apart. But presently each encounters the older wake it cast while approaching. This delayed encounter pushes outward, while the partner, now behind, continues to pull inward. Thus the whole affair reduces to a contest on a line: a delayed push from one'S own past against the present pull of the other. The purpose of this chapter is to determine whether that contest can be forced into repeated recapture rather than escape, and to state the theorem program that would make such a bounded cycle rigorous.


Formally, this chapter develops a proof scaffold for the global existence question of a periodic limit cycle in a symmetric two-body collinear system governed by a strongly nonlinear state-dependent delay differential equation. The dynamics use a dual-mollified delayed kernel, separating the short-distance $1/r^2$ singularity from the causal-isochron boundary. The main analytic difficulty is the velocity-dependent causal-fold geometry, where Jacobians can approach
$$
J\to 0
$$
The scaffold attacks that geometry by constructing the sorting maps
$$
w(T)=X(T)+c_f T
\qquad
\text{and}
\qquad
z(T)=X(T)-c_f T
$$
which isolate root birth, root exclusion, deep-past localization, and bounded caustic transit. From there the delayed dynamics are reduced to explicit conservative force margins for the inner recapture and the outer apocenter turn, and these are assembled into a closed, convex, precompact invariant-envelope program in
$$
C^1([-h,0])
$$
The final fixed-point step is then delegated to Arzela-Ascoli compactness and a Schauder-type argument once the nonempty tame class is fully propagated through one cycle. At present, that capstone remains a theorem target rather than a completed proof.

## Status Map

This chapter has three different status layers, and they should be read separately:

- completed local and regional lemma packages, especially for delayed-root geometry, caustic transit, inner recapture, and trimmed-apocenter outer-turn control,
- target propositions that package those estimates into one closed convex tame self-map domain,
- and the final Schauder capstone, which remains conditional on that domain-level closure.

In particular, the manuscript already contains substantial outer-turn and apocenter material. The main remaining burden is not to invent an outer-turn mechanism from scratch, but to assemble the local theorem packages into one coupled invariant-envelope regime on which the return map is continuous, precompact, and self-mapping.

This chapter is the proof core for the breather program. Completion now means replacing the conditional finite-certificate rows with one verified certificate: an instantiated
$$
\phi_{\mathrm{cyc}}
$$
a finite branch chart, a closed convex certificate, a strict coupled corridor, a monodromy diagnostic, returned-sample preservation, certified topology, and then Schauder.

## Reading Map

Readers looking for the main structural bottlenecks can use the following map.

- The sign and physical interpretation caveat appears in [Signed-branch caution](#signed-branch-caution).
- The return-map setup begins in [Regularized Return Map](#regularized-return-map).
- The compactness and fixed-point architecture begins in [Global Existence via Arzela-Ascoli](#global-existence-via-arzela-ascoli).
- The coupled-envelope bottleneck appears in [Invariant-envelope closure](#invariant-envelope-closure) and the later [Capstone Statement](#capstone-statement).
- The outer-turn program is developed in [Outer-turn recapture target](#outer-turn-recapture-target), [Deep-past outer self suppression target](#deep-past-outer-self-suppression-target), [z-map descent target](#z-map-descent-target), and the [Capstone Statement](#capstone-statement).
- The compressed endpoint appears in [Capstone Statement](#capstone-statement).

## Proof-Program Dependency Map

At the highest level, the proof program now runs in the following order:

1. collapse-to-crossing control,
2. pre-crossing caustic transit and recovery,
3. local post-crossing recapture,
4. outer-turn recapture on the trimmed apocenter window,
5. turn-to-section return,
6. invariant-envelope closure on one coupled tame domain,
7. continuity and precompactness of the return map on that same domain,
8. Schauder fixed-point closure.

This is the dependency chain that should govern future edits. New local estimates are useful only insofar as they feed one of these eight loads.

## Purpose

The full dynamics stack currently mixes several hard problems at once:

- state-dependent delays,
- Jacobian amplification,
- self-hit branch birth,
- tangential drift in 2D and 3D,
- and multi-scale coupling in nested shell braids.

This chapter strips away everything except the minimum ingredients needed to test a bounded delayed orbit:

- two architrinos,
- one spatial dimension,
- opposite polarities,
- exact partner hits,
- exact self-hit roots,
- and an $\eta>0$ regularization suitable for return-map analysis.

The point is not to claim that this reduced problem is already the physical atom of the theory. The point is to identify the first model in which a breather-like bounded state could be proved or ruled out.

This chapter should therefore be read as an internal reduced model inside $\mathbb{A}\mathbb{A}\mathbb{A}$, not as a claim about standard electrodynamics. Its delayed kernel, self-hit bookkeeping, and dual-mollified return-map architecture are the working axioms of the theorem program. The relation of that program to more classical delayed-interaction formalisms, such as action-based Fokker or Wheeler-Feynman-type viewpoints, belongs to the surrounding master-equation discussion rather than being assumed here as an equivalence theorem.

## Exact 1D State Variables

Work on the reflection-symmetric center-of-mass subspace
$$
X_1(T)=-X(T),
\qquad
X_2(T)=X(T),
\qquad
q_1=-\epsilon,
\qquad
q_2=+\epsilon
$$

Here:

- $X(T)\in\mathbb{R}$ is the signed native coordinate of the right-hand architrino on the reduced line,
- $dX/dT(T)$ is its signed native velocity,
- the center of mass is fixed at the origin,
- and the full two-body state is recovered by reflection.

The exact delayed state lives on a history space
$$
\mathcal{H}_h = C^1([-h,0];\mathbb{R})
$$
with history segment
$$
X_T(\theta)\equiv X(T+\theta),
\qquad
\theta\in[-h,0]
$$
for a memory horizon $h>0$ large enough to contain all active causal roots under study.

Useful derived quantities:
$$
d(T)\equiv 2|X(T)|,
\qquad
u(T)\equiv \frac{dX}{dT}(T)
$$

When $X(T)>0$ and $u(T)<0$, the labeled right-hand architrino is inbound on the right exterior branch. After label-preserving passage through the center, the same particle continues on the left exterior branch with $X(T)<0$. For theorem work on full oscillations, the safest interpretation is therefore in signed native coordinates $X\in\mathbb{R}$ together with the radial distance $d(T)=2|X(T)|$.

## Partner-Only Hinge Radius

Before self-hit is active, the natural zeroth-order picture is partner-dominated infall from large separation. In that reduced picture it is useful to define the first dynamically meaningful radius as the location where the inbound speed reaches the field speed.

### Definition

Let $X_{c_f}>0$ denote the **hinge radius** for the partner-only inbound benchmark:
$$
|u| = c_f
\qquad
\text{at}
\qquad
X = X_{c_f}
$$

This is not yet a theorem of the full delayed system. It is a reduced-model normalization tied to the inbound partner-attraction phase before the self-hit-capable regime is entered.

### Dimensionless normalization

Define
$$
\chi \equiv \frac{X}{X_{c_f}},
\qquad
\upsilon \equiv \frac{u}{c_f}
$$

Then the hinge is located at
$$
\chi = 1,
\qquad
|\upsilon|=1
$$

This makes the reduced narrative explicit:

- $\chi \gg 1$: far-field partner-dominated infall,
- $\chi \searrow 1$: approach to the field-speed hinge,
- $\chi < 1$: self-hit-capable regime becomes dynamically relevant.

### Coulomb-like zeroth-order estimate

If one uses the quadratic kinetic bookkeeping proxy with universal constant $\mu_{\text{arch}}$ and ignores delay at leading order, the partner-only effective potential is
$$
U_{\text{pair}}(X)
\approx
-\frac{\kappa\epsilon^2}{2X}
$$
since the pair separation is $d=2X$.

Starting from rest at infinity, a zeroth-order energy balance gives
$$
\frac{1}{2}\mu_{\text{arch}} u^2
\approx
\frac{\kappa\epsilon^2}{2X}
$$

Imposing the hinge condition $|u|=c_f$ yields
$$
\mu_{\text{arch}} c_f^2
\approx
\frac{\kappa\epsilon^2}{X_{c_f}},
\qquad
X_{c_f}
\approx
\frac{\kappa\epsilon^2}{\mu_{\text{arch}} c_f^2}
$$

Thus one may, if desired, choose reduced units so that
$$
X_{c_f}=1
$$

This is the cleanest way to formalize the intuition that the partner-only inbound fall from infinity reaches field speed at a distinguished radius. In the bookkeeping convention just displayed, setting $X_{c_f}=1$ fixes the dimensionless combination
$$
\frac{\kappa\epsilon^2}{\mu_{\text{arch}}c_f^2}=1
$$
If one also chooses reduced units with $c_f=1$, $\epsilon=1$, and $\mu_{\text{arch}}=1$, then the local benchmark has $\kappa=1$. This is a unit convention for the partner-only hinge estimate, not a physical derivation of the coupling. An acceleration-first normalization that omits the quadratic bookkeeping constant must declare its convention separately, because numerical factors in the hinge relation then shift.

The partner-only benchmark should also not be read as a crossing formula at the origin. The same zeroth-order energy estimate gives
$$
u^2
\approx
\frac{\kappa\epsilon^2}{\mu_{\text{arch}}X}
$$
so it predicts $|u|\to\infty$ as $X\to0^+$. The hinge marks where the reduced partner-only model has reached the self-hit-capable regime and should hand off to the delayed root ledger rather than being extrapolated through the origin.

### Receiver-normal delayed partner correction

The preceding estimate is intentionally only a dimensional scale. It drops the
causal-root branch factor and therefore should not be used as evidence that a
released history reaches field speed at a finite exterior radius. On the
simplest receiver-normal exterior chart, the partner source is locally affine:
$$
X(T_{\mathrm{em}})\approx X(T)-v(T-T_{\mathrm{em}}),
\qquad
v=\frac{dX}{dT}(T),
\qquad
X(T)>0
$$
The partner causal equation gives
$$
\Delta T_p=T-T_{\mathrm{em}}=\frac{2X}{c_f+v},
\qquad
r_p=c_f\Delta T_p,
\qquad
D_s=c_f+v
$$
while the receiver-normal numerator is
$$
D_T=c_f-v.
$$
Thus the delayed partner force is neither the naive conservative inverse-square
force nor a source-normal-only row. The receiver-normal branch strength is
$$
W_p^{\mathrm{rec}}
=
\left|\frac{D_T}{D_s}\right|
=
\frac{c_f-v}{c_f+v}
$$
on this inbound exterior chart, and therefore
$$
\frac{W_p^{\mathrm{rec}}}{r_p^2}
=
\frac{1}{4X^2}
\left(1-\frac{v^2}{c_f^2}\right).
$$
The simple-root receiver-normal comparison law is consequently
$$
\frac{d^2X}{dT^2}
=
-\frac{g}{4X^2}
\left(1-\frac{(dX/dT)^2}{c_f^2}\right),
\qquad
g\equiv\kappa\epsilon^2
$$
as long as the exterior partner chart remains valid and $-c_f<dX/dT$.

Writing
$$
\beta\equiv\frac{dX/dT}{c_f},
\qquad
\alpha\equiv\frac{g}{4c_f^2}
$$
the phase equation has the exact receiver-normal invariant
$$
\ln\!\left(\frac{1-\beta^2}{1-\beta_0^2}\right)
=
-2\alpha\left(\frac{1}{X}-\frac{1}{X_0}\right)
$$
For a released exterior branch with $\beta_0=0$ at $X=X_0$, this gives
$$
\beta_{\mathrm{in}}(X)
=
-\sqrt{
1-\exp\!\left[-2\alpha\left(\frac{1}{X}-\frac{1}{X_0}\right)\right]
}
$$
where the negative square-root branch is the inbound branch. Hence
$-1<\beta_{\mathrm{in}}(X)<0$ for every $X>0$ on the exterior chart, and the
time parametrization is the quadrature
$$
T-T_0
=
\int_X^{X_0}\frac{d\xi}{-c_f\,\beta_{\mathrm{in}}(\xi)}
$$
This is a receiver-normal restart scaffold, not a solved breather baseline. It
shows only that the affine exterior partner row by itself still approaches
field speed only at the origin-layer limit. Any finite-radius field-speed
crossing, sub-field return, or recapture mechanism must be redriven from the
dual-mollified law with the same-record $D_T/D_s$ branch strength.

### Field-Speed Head-On Caustic Test

A tempting boundary test is to place the left Electrino and right Positrino at
$$
X_L(0)=-X_0,
\qquad
X_R(0)=+X_0
$$
with inward velocities
$$
\frac{dX_L}{dT}(0)=+c_f,
\qquad
\frac{dX_R}{dT}(0)=-c_f
$$
This is not ordinary initial data for the simple-root branch law unless the path history is also specified. If the intended prehistory is affine field-speed infall,
$$
X_L(T_{\mathrm{em}})=-X_0+c_fT_{\mathrm{em}},
\qquad
X_R(T_{\mathrm{em}})=X_0-c_fT_{\mathrm{em}},
\qquad
T_{\mathrm{em}}\le0
$$
then the opposite-source wake is still in flight at $T=0$. For the right-hand receiver before the origin meeting,
$$
X_R(T)-X_L(T_{\mathrm{em}})=c_f(T-T_{\mathrm{em}})
$$
reduces to
$$
2X_0-c_f(T+T_{\mathrm{em}})=c_f(T-T_{\mathrm{em}})
$$
and hence
$$
T=\frac{X_0}{c_f}
$$
Thus there is no partner root for $0\le T<X_0/c_f$ on this affine chart, while at $T=X_0/c_f$ all affine source times co-arrive at the origin. That event is a caustic, not a regular branch.

The same-source ledger is already singular. Along either affine field-speed history,
$$
|X_i(T)-X_i(T_{\mathrm{em}})|=c_f(T-T_{\mathrm{em}})
$$
for every $T_{\mathrm{em}}<T$, and the simple-root Jacobian is
$$
J=0
$$
Therefore the exact field-speed head-on seed is a fail-closed separator test. It can be studied only through the dual-mollified finite-history integral with declared shell width, core scale, emission cadence if used, and memory horizon. If that regularized limit fails to converge, the result is not a failed simulation detail; it means that exact field-speed inbound history is not a lawful seed for the collinear breather certificate without dephasing, curvature, held-release preparation, or another branch-certified regularization mechanism.

The finite-history calculation can still be stated exactly before the origin caustic. For the right Positrino, define
$$
\Delta(T)\equiv 2(X_0-c_fT),
\qquad
g\equiv\kappa\epsilon^2
$$
The same-source continuum contributes
$$
a_R^{\mathrm{self}}(T;H,\eta,\epsilon_c)
=
-g\,\delta_\eta(0)
\int_0^H
\frac{du}{c_f^2u^2+\epsilon_c^2}
=
-\frac{g\,\delta_\eta(0)}{c_f\epsilon_c}
\arctan\!\left(\frac{c_fH}{\epsilon_c}\right)
$$
while the off-shell partner tail contributes
$$
a_R^{\mathrm{partner}}(T;H,\eta,\epsilon_c)
=
-g\,\delta_\eta(\Delta(T))
\int_0^H
\frac{du}{(\Delta(T)+c_fu)^2+\epsilon_c^2}
$$
Equivalently,
$$
a_R^{\mathrm{partner}}
=
-\frac{g\,\delta_\eta(\Delta(T))}{c_f\epsilon_c}
\left[
\arctan\!\left(\frac{\Delta(T)+c_fH}{\epsilon_c}\right)
-
\arctan\!\left(\frac{\Delta(T)}{\epsilon_c}\right)
\right]
$$
Thus the infinite-history limit is finite for fixed $\eta$ and $\epsilon_c$,
$$
a_R^{\mathrm{self}}(\infty,\eta,\epsilon_c)
=
-\frac{\pi g\,\delta_\eta(0)}{2c_f\epsilon_c}
$$
but it is not regulator independent. For any centered mollifier with $\delta(0)>0$ and
$$
\delta_\eta(y)=\eta^{-1}\delta(y/\eta)
$$
the same-source continuum scales as
$$
-\frac{\pi g\,\delta(0)}{2c_f\eta\epsilon_c}
$$
as $\eta,\epsilon_c\to0$. For the compact polynomial shell candidate
$$
\delta(z)=\frac{15}{16}(1-z^2)^2
$$
on $|z|\le1$ and zero outside, this becomes
$$
-\frac{15\pi g}{32c_f\eta\epsilon_c}
$$
At $T=0$ with $X_0=1$, this compact shell also sets the partner term exactly to zero whenever $\eta<2X_0$, because the partner support has not reached the receiver. The theory consequence is sharper than "the partner wake is in flight": an exact affine $v=c_f$ inbound history produces a regulator-dependent self-continuum acceleration before the partner wake can contribute. A lawful candidate must therefore break the exact continuum by preparation or branch geometry before the simple-root certificate can begin.

## Held-Release Restart Target

A held source remains a lawful way to specify pre-release history, but the
held-release solution is purged as a solution artifact because it used the
superseded branch law. Let a left-hand Electrino and right-hand Positrino
be held at
$$
X_2(T)=+X_0,\qquad X_1(T)=-X_0,\qquad X_0 > 0
$$
with zero velocity for a holding interval long enough that the stationary partner wakes have reached the opposite side before release:
$$
T_{\mathrm{hold}}\ge \frac{2X_0}{c_f}
$$
Set the release time to $T=0$. During the first post-release segment, while
the partner emission time still lies in the held history,
$$
D_s=c_f,
\qquad
D_T=c_f-\frac{dX}{dT}(T),
\qquad
W^{\mathrm{rec}}=\left|1-\frac{dX/dT(T)}{c_f}\right|.
$$
The receiver-normal restart equation is therefore
$$
\frac{d^2X}{dT^2}(T)
=
-\frac{\kappa\epsilon^2}{(X(T)+X_0)^2}
\left|1-\frac{dX/dT(T)}{c_f}\right|,
\qquad
X(0)=X_0,\qquad
\frac{dX}{dT}(0)=0.
$$

Two structural facts follow immediately and should be recorded before any
numerics. First, $D_s=c_f$ exactly on this segment, because the retained partner
emission lies in the held history where the source is at rest. There is no
source-normal caustic anywhere on the held chart, and the delay
$(X(T)+X_0)/c_f$ stays finite. Second, on the inbound leg $dX/dT<0$, so
$W^{\mathrm{rec}}>1$ and grows without bound as the receiver accelerates: the
branch strength *amplifies* the attraction it is already responding to. Nothing
in the equation is singular or marginal at $dX/dT=-c_f$. The held chart
therefore carries the receiver through field speed at a finite radius $X>0$
once $\kappa\epsilon^2/(c_f^2X_0)$ clears a threshold, with the core scale
$\epsilon_c$ setting the amplitude cap.

This is the concrete reason the exterior affine partner chart in
[Closed-Form Collinear Breather Ansatz](./closed-form-collinear-breather-ansatz.md)
sees a barrier where none exists. That chart freezes the source velocity equal
to the receiver's, forcing $D_s\to0$ as $dX/dT\to-c_f$; the held chart holds the
source velocity at its true delayed value and finds $D_s=c_f$. Field speed for
the *receiver* is not a branch event. See
[Separator Taxonomy](../dynamics/master-equation.md#separator-taxonomy).

The energy identity, handoff angle, numerical fixture, and source-normal
continuity claim must be recomputed from this receiver-normal ODE and then
matched to the moving-partner delayed chart with the same-record $D_T/D_s$
factor before they can act as evidence.

## Partner-Hit and Self-Hit Root Equations

For the right-hand architrino $X_2(T)=X(T)$, the exact causal root conditions split naturally into partner and self branches.

### Partner-hit roots

A partner-hit emission time $T_0<T$ satisfies
$$
|X(T)+X(T_0)| = c_f(T-T_0)
$$

Define the partner-root set
$$
\mathcal{C}_p(T)
\equiv
\left\{
T_0<T \;\middle|\; |X(T)+X(T_0)| = c_f(T-T_0)
\right\}
$$

On this symmetry subspace the 1D line-of-action sign is
$$
\hat r_p(T;T_0)=\mathrm{sgn}\!\big(X(T)+X(T_0)\big)
$$
and the partner Jacobian becomes
$$
J_p(T;T_0)
=
1-\frac{dX_1/dT(T_0)\hat r_p(T;T_0)}{c_f}
=
1+\frac{dX/dT(T_0)\hat r_p(T;T_0)}{c_f}
$$

Because $q_1q_2<0$, this branch is attractive.

### Self-hit roots

A nontrivial self-hit emission time $T_0<T$ satisfies
$$
|X(T)-X(T_0)| = c_f(T-T_0),
\qquad
T_0\neq T
$$

Define the self-root set
$$
\mathcal{C}_s(T)
\equiv
\left\{
T_0<T \;\middle|\; |X(T)-X(T_0)| = c_f(T-T_0)
\right\}
$$

The self line-of-action sign is
$$
\hat r_s(T;T_0)=\mathrm{sgn}\!\big(X(T)-X(T_0)\big)
$$
and the self Jacobian is
$$
J_s(T;T_0)
=
1-\frac{dX/dT(T_0)\hat r_s(T;T_0)}{c_f}
$$

Because $q_2q_2>0$, each self branch is repulsive.

### Receiver-normal branch-row admissibility target

A simple-root branch row is not admissible as force evidence merely because it
has a source-normal Jacobian floor. For each retained branch row
$$
b=(r,T,T_0),
\qquad
r\in\{p,s\},
$$
the same retained record must carry the causal-root replay, the source-normal
transversality denominator, the receiver-normal numerator, and the resulting
receiver-normal branch strength.

For partner rows set
$$
r_p(T;T_0)=|X(T)+X(T_0)|,
\qquad
D_{S,p}(T;T_0)=c_f+\frac{dX}{dT}(T_0)\hat r_p(T;T_0),
$$
$$
D_{T,p}(T;T_0)=c_f-\frac{dX}{dT}(T)\hat r_p(T;T_0),
\qquad
W_p^{\mathrm{rec}}(T;T_0)
=
\left|\frac{D_{T,p}(T;T_0)}{D_{S,p}(T;T_0)}\right|.
$$
For self rows set
$$
r_s(T;T_0)=|X(T)-X(T_0)|,
\qquad
D_{S,s}(T;T_0)=c_f-\frac{dX}{dT}(T_0)\hat r_s(T;T_0),
$$
$$
D_{T,s}(T;T_0)=c_f-\frac{dX}{dT}(T)\hat r_s(T;T_0),
\qquad
W_s^{\mathrm{rec}}(T;T_0)
=
\left|\frac{D_{T,s}(T;T_0)}{D_{S,s}(T;T_0)}\right|.
$$
Thus
$$
D_{S,p}=c_fJ_p,
\qquad
D_{S,s}=c_fJ_s,
$$
so $J_p$ and $J_s$ remain source-normal transversality diagnostics rather
than standalone force weights.

The row passes the receiver-normal admissibility target only if these fields
are bound to the same branch row as the root identity and the sign data:
$$
\left(
T_0,\hat r_r,r_r,D_{S,r},D_{T,r},W_r^{\mathrm{rec}}
\right)
$$
on one retained record. A source-normal denominator, a root-topology row, or a
pre-ledger interval without that same-record binding is diagnostic only. It
cannot feed the corridor, monodromy, returned-sample, certified topology, or
Schauder rows.

### Reduced branch-resolved equation

On the exact root-selected model, the right-particle acceleration is
$$
\frac{d^2X}{dT^2}(T)
=
-\,\kappa \epsilon^2
\sum_{T_0\in\mathcal{C}_p(T)}
\frac{\hat r_p(T;T_0)W_p^{\mathrm{rec}}(T;T_0)}
{r_p(T;T_0)^2}
+
\kappa \epsilon^2
\sum_{T_0\in\mathcal{C}_s(T)}
\frac{\hat r_s(T;T_0)W_s^{\mathrm{rec}}(T;T_0)}
{r_s(T;T_0)^2}
$$

The first sum is partner attraction. The second is self-hit repulsion. Reflection symmetry gives the left-particle equation automatically.

Plain language: in 1D there is no tangential direction to hide in. The entire competition is between delayed inward attraction and delayed outward self-repulsion, with each active branch row carrying both the source-normal transversality denominator and the receiver-normal branch strength on the same retained record.

### Receiver-normal weight conversion

Every force bound in this note is stated against the canonical branch weight
$W^{\mathrm{rec}}_r=|D_{T,r}/D_{S,r}|$. Because $D_{S,r}=c_fJ_r$, the weight
factors as
$$
W^{\mathrm{rec}}_r
=
\frac{|D_{T,r}|}{c_f}\cdot\frac{1}{|J_r|},
\qquad
D_{T,r}=c_f-\frac{dX}{dT}(T)\,\hat r_r
$$
The source-normal factor $1/|J_r|$ is what a transversality floor controls. The
receiver-normal factor $|D_{T,r}|/c_f$ is a separate quantity, and it is not
bounded by $1$. On a tame envelope with $\left|\frac{dX}{dT}\right|\le U_{\max}<c_f$
it obeys the two-sided bound
$$
\Theta_-\le\frac{|D_{T,r}|}{c_f}\le\Theta_+,
\qquad
\Theta_\mp\equiv 1\mp\frac{U_{\max}}{c_f},
\qquad
0<\Theta_-\le1\le\Theta_+<2
$$
Two consequences fix how every lemma below must be read.

**Sightline sign decides the direction of the correction.** Because $\hat r_r$
points from the emission point to the receiver, $\frac{dX}{dT}(T)\hat r_r$ is the
receiver's recession rate from that emission point. A branch whose source lies
*ahead* of the receiver, meaning $\frac{dX}{dT}(T)\hat r_r<0$, has
$|D_{T,r}|>c_f$ and is amplified. A branch whose source lies *behind* has
$|D_{T,r}|<c_f$ and is suppressed, vanishing at the receiver-normal null
$\frac{dX}{dT}(T)\hat r_r=c_f$. Therefore a bound written with the source-normal
weight $1/|J_r|$ alone is a valid *lower* bound on the true magnitude exactly
when the source lies ahead, and a valid *upper* bound exactly when the source
lies behind. It is not otherwise valid, in either direction.

**Common-sightline arcs.** On an arc where every active branch shares one
line-of-action sign $\hat r_r=\rho$, the factor $|D_{T,r}|/c_f=|1-\rho\,\frac{dX}{dT}(T)/c_f|$
is the *same* for every branch and factors out of the whole branch sum:
$$
\frac{d^2X}{dT^2}(T)
=
\left|1-\rho\,\frac{dX/dT(T)}{c_f}\right|
\cdot
\left[
-\kappa\epsilon^2\!\!\sum_{T_0\in\mathcal{C}_p(T)}\!\!\frac{\rho}{r_p^2\,|J_p|c_f}
+
\kappa\epsilon^2\!\!\sum_{T_0\in\mathcal{C}_s(T)}\!\!\frac{\rho}{r_s^2\,|J_s|c_f}
\right]
$$
The receiver-normal factor is a positive common prefactor there. It therefore
cannot change the *sign* of the net acceleration, and every dominance argument
comparing partner attraction against self-repulsion on such an arc survives the
conversion unchanged. What it does change is every acceleration *floor*, every
transit *time*, and every impulse *budget*, each of which must be rescaled by
$\Theta_-$ or $\Theta_+$ as the direction of the inequality requires.

This is the sense in which the conversion is not cosmetic. Dropping
$|D_{T,r}|/c_f$ from the branch weight removes the entire velocity-dependent
force. By the
[receiver-velocity affine form](../dynamics/master-equation.md#receiver-velocity-affine-form-and-the-branch-resistance-tensor),
the collinear law is exactly
$$
\frac{d^2X}{dT^2}+\Gamma(T)\,\frac{dX}{dT}=c_f\,\Xi(T)
$$
with $\Gamma$ and $\Xi$ independent of $\frac{dX}{dT}(T)$, and the damping
coefficient $\Gamma$ carries the polarity sign of each branch. Partner
attraction contributes $\Gamma<0$, so it anti-damps and injects at rate
$|w_p|s_p^2$ on both the inbound and the outbound leg. Self-repulsion
contributes $\Gamma>0$ and drains at rate $w_ss_s^2$. **The self rows are the
only damping channel in this reduction.** A closed cycle requires the self drain
to balance the partner injection over the period, and that balance, not the
field-speed threshold, is what the outer-turn program below has to establish.

## Regularized 1D Equation

For analysis and numerics, replace the shell delta by a smooth mollifier $\delta_\eta$ with width $\eta>0$. Then the reduced equation can be written in integral form:
$$
\frac{d^2X}{dT^2}(T)
=
-\,\kappa \epsilon^2
\int_{-\infty}^{T} dT_0\;
\frac{\hat r_p(T;T_0)}
{|X(T)+X(T_0)|^2}
\delta_\eta\!\big(|X(T)+X(T_0)|-c_f(T-T_0)\big)
$$
$$
\qquad
+
\kappa \epsilon^2
\int_{-\infty}^{T} dT_0\;
\frac{\hat r_s(T;T_0)}
{|X(T)-X(T_0)|^2}
\delta_\eta\!\big(|X(T)-X(T_0)|-c_f(T-T_0)\big)
$$
with the understanding that the source-normal denominators and receiver-normal branch factors reappear in the branch-sum representation when the mollified shell collapses onto isolated roots.

The normalization convention for the shell mollifier is fixed once and used throughout the estimates below. Choose a nonnegative even
$$
C^1
$$
function
$$
\delta\in C^1_c(\mathbb{R}),
\qquad
\operatorname{supp}\delta\subset[-1,1],
\qquad
\int_{\mathbb{R}}\delta(y)\,dy=1
$$
and set
$$
\delta_\eta(y)\equiv \eta^{-1}\delta(y/\eta)
$$
Thus
$$
\operatorname{supp}\delta_\eta\subset[-\eta,\eta],
\qquad
\int_{\mathbb{R}}\delta_\eta(y)\,dy=1,
\qquad
\|\delta_\eta\|_\infty=\eta^{-1}\|\delta\|_\infty
$$
Every shell-leakage, fold-impulse, and outer-self estimate using
$$
\|\delta_\eta\|_\infty
$$
uses this convention. On a simple-root chart,
$$
\int f(T_{\mathrm{em}})\delta_\eta(g(T,T_{\mathrm{em}}))\,dT_{\mathrm{em}}
\longrightarrow
\sum_{g(T,T_{\mathrm{em},k})=0}
\frac{f(T_{\mathrm{em},k})}{|\partial_{T_{\mathrm{em}}} g(T,T_{\mathrm{em},k})|}
$$
and the fixed factor
$$
c_f^{-1}
$$
from
$$
\partial_{T_{\mathrm{em}}} g=c_fJ
$$
is absorbed into the branch-law normalization of
$$
\kappa
$$

For theorem work across the origin crossing, shell regularization alone is not enough to control the inverse-square amplitude. A more robust local model therefore introduces a **dual mollification**: the shell mollifier $\delta_\eta$ for delayed root selection together with a short-distance core mollifier $\epsilon_c>0$ in the amplitude denominator,
$$
\frac{1}{r^2}
\quad\leadsto\quad
\frac{1}{r^2+\epsilon_c^2}
$$
This leaves the delayed shell selection controlled by $\eta$ while the core mollifier caps the near-origin amplitude spike strongly enough for a clean $C^1$ theorem program.

For the certified finite-memory problem, the exact dual-mollified reduced evolution law is the absolute-time integral
$$
\frac{d^2X}{dT^2}(T)
=
-\,\kappa\epsilon^2
\int_{T-h}^{T}
\frac{\hat r_p(T;T_{\mathrm{em}})}
{|X(T)+X(T_{\mathrm{em}})|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|X(T)+X(T_{\mathrm{em}})|-c_f(T-T_{\mathrm{em}})\big)\,dT_{\mathrm{em}}
$$
$$
\qquad
+
\kappa\epsilon^2
\int_{T-h}^{T}
\frac{\hat r_s(T;T_{\mathrm{em}})}
{|X(T)-X(T_{\mathrm{em}})|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|X(T)-X(T_{\mathrm{em}})|-c_f(T-T_{\mathrm{em}})\big)\,dT_{\mathrm{em}}
$$
The branch-sum equations used throughout the proof scaffold are simple-root reductions of this law. Across causal folds, caustic transit, and certified topology arguments, the integral law is the primary object.
After the receiver-normal restart, any simple-root reduction that is used as
force evidence must pass the receiver-normal branch-row admissibility target
above; otherwise it remains a root-topology or transversality diagnostic only.

The regularized formulation is the one best suited to:

- local well-posedness,
- continuation criteria,
- numerical return-map construction,
- and eventually the controlled limit $\eta\to 0^+$.

### Origin-layer continuity of the dual-mollified 1D field

On an interval that contains an origin crossing, the working equation is the absolute-time integral law above, not the branch-sum reduction. The branch-sum signs
$$
\hat r_p,
\qquad
\hat r_s
$$
are exterior-chart data. They must be reattached to the correct outgoing sheet after the crossing, and they should not be treated as a smooth scalar formula through
$$
X=0
$$

> **Lemma (Origin-layer continuity of the dual-mollified 1D field).**
> Fix
> $$
> \eta>0,
> \qquad
> \epsilon_c>0,
> \qquad
> h>0.
> $$
> Let a signed collinear history have a single label-preserving origin crossing on a layer
> $$
> |T|\le \tau_{\mathrm{cross}},
> $$
> with fixed incoming and outgoing exterior-sheet labels. Define the sheet-projected radial acceleration on the layer by applying the absolute-time integral law in the signed coordinate and then projecting to the active radial sheet:
> $$
> F^\rho_{\eta,\epsilon_c}(T)
> \equiv
> \sigma_{\mathrm{out}}(T)F^X_{\eta,\epsilon_c}(T),
> \qquad
> \rho(T)=|X(T)|.
> $$
> Assume the layer has a uniform velocity bound, a uniform acceleration bound, and no uncontrolled nontransverse root accumulation except the certified fold events carried by the layer chart. Then
> $$
> F^\rho_{\eta,\epsilon_c}
> $$
> extends as a
> $$
> C^1
> $$
> function of the radial coordinate and stored history across
> $$
> \rho=0.
> $$
> In particular, the sign flip of the exterior scalar branch terms is absorbed by the sheet projection, and the radial equation may be continued through the origin layer without introducing a scalar force discontinuity.

Proof.
The absolute-time integral law has denominator bounded below by
$$
\epsilon_c^2
$$
and the shell factor
$$
\delta_\eta
$$
is a fixed
$$
C^1
$$
mollifier with compact support. Hence the layer integrand and its first variations in the stored
$$
C^1
$$
history are dominated by constants depending only on
$$
(\eta,\epsilon_c,h)
$$
and the layer tube bounds. The signed exterior direction changes when the trajectory passes through
$$
X=0
$$
but the radial projection multiplies by the outgoing sheet label at the same crossing. On the two sides of the layer this converts the exterior signed direction into the same radial direction field. Any remaining sign changes occur only across the certified causal-root surfaces inside the integral; away from certified folds they are simple-root changes of variables, and at certified folds the fold tube is handled by the integral law rather than by a branch sum. Dominated convergence, with the standard one-dimensional coarea calculation on the simple-root pieces, gives continuity and the first radial derivative on the whole layer.

Thus the core scale controls the amplitude and the shell scale controls the root selection, while the sheet projection controls the origin sign flip. Exterior branch-sum formulas may be resumed after the trajectory leaves the crossing layer and the signed sheet labels are again fixed.

## Inbound/Outbound Sign Structure

The first genuine dynamical question is not whether self-hit exists, but whether its sign structure permits recapture. In 1D this can be stated exactly.

### Exterior-branch convention

Fix an interval on which
$$
X(T)>0
$$

Then:

- **inbound** means $\frac{dX}{dT}(T)<0$,
- **outbound** means $\frac{dX}{dT}(T)>0$.

This is the natural branch on which to analyze collapse, rebound, and return to a section at $X=X_\ast>0$.

### Partner term

On the exterior branch, the partner source points inward only for active partner roots whose delayed source remains on the opposite side of the current right-hand particle. In the signed variables this is the branch condition
$$
X(T)+X(T_0)>0
$$
The recapture estimates below use a tame exterior-root class in which all active partner roots entering the lower-bound arguments satisfy this condition. Any partner roots with
$$
X(T)+X(T_0)<0
$$
are not inward partner roots; they must either be excluded by the delayed-root hypotheses or carried as a separate error channel.

Write
$$
A_p(T)
\equiv
\kappa \epsilon^2
\sum_{T_0\in\mathcal{C}_p(T)}
\frac{\mathbf{1}_{\{X(T)+X(T_0)>0\}}W_p^{\mathrm{rec}}(T;T_0)}
{r_p(T;T_0)^2}
\ge 0
$$

On that inward exterior partner channel the signed contribution is
$$
a_p(T)=-A_p(T)
$$

Therefore, when the inward exterior partner channel is active:

- on the inbound leg, $a_p$ has the **same sign as the velocity** and speeds the collapse up,
- on the outbound leg, $a_p$ has the **opposite sign to the velocity** and brakes the escape.

### Self-hit split into outer-memory and inner-memory roots

The self term does not have a fixed sign. Split the active self roots into
$$
\mathcal{C}_s^{\text{out}}(T)
\equiv
\left\{
T_0\in\mathcal{C}_s(T)\;\middle|\; X(T_0)>X(T)
\right\}
$$
$$
\mathcal{C}_s^{\text{in}}(T)
\equiv
\left\{
T_0\in\mathcal{C}_s(T)\;\middle|\; X(T_0)<X(T)
\right\}
$$

For $T_0\in\mathcal{C}_s^{\text{out}}(T)$ one has
$$
\hat r_s(T;T_0)=\mathrm{sgn}(X(T)-X(T_0))=-1
$$
so that branch contributes **negative** acceleration.

For $T_0\in\mathcal{C}_s^{\text{in}}(T)$ one has
$$
\hat r_s(T;T_0)=\mathrm{sgn}(X(T)-X(T_0))=+1
$$
so that branch contributes **positive** acceleration.

Define the corresponding positive amplitudes
$$
A_s^{\text{out}}(T)
\equiv
\kappa \epsilon^2
\sum_{T_0\in\mathcal{C}_s^{\text{out}}(T)}
\frac{W_s^{\mathrm{rec}}(T;T_0)}{r_s(T;T_0)^2}
$$
$$
A_s^{\text{in}}(T)
\equiv
\kappa \epsilon^2
\sum_{T_0\in\mathcal{C}_s^{\text{in}}(T)}
\frac{W_s^{\mathrm{rec}}(T;T_0)}{r_s(T;T_0)^2}
$$

On the tame exterior-root class where all active partner roots are inward exterior roots, the total acceleration on the exterior branch is
$$
\frac{d^2X}{dT^2}(T)= -A_p(T)-A_s^{\text{out}}(T)+A_s^{\text{in}}(T)
$$

This is the key reduced formula.

### Physical interpretation

- **Inbound** ($\frac{dX}{dT}<0$):
  - the retained inward partner channel strengthens infall,
  - outer-memory self roots also strengthen infall,
  - inner-memory self roots oppose infall.

- **Outbound** ($\frac{dX}{dT}>0$):
  - the retained inward partner channel brakes the outward motion,
  - outer-memory self roots also brake the outward motion,
  - inner-memory self roots drive further escape.

So self-hit is not a permanent outward engine. Its effect depends on where the active remembered emission points sit relative to the current position.

### Signed-branch caution

The formulas above are exact on a fixed exterior slice $X(T)>0$, but they should not be overread as proving that a physical 1D trajectory can rebound at some $X_{\min}>0$ and then move back out on the same right-hand branch. In the current 1D delayed kernel, the pre-origin inbound leg is driven inward by partner attraction and by the self branches available on that slice. So the physically relevant oscillatory program should be formulated as an **origin-crossing** one in signed coordinates, or equivalently in the radial variable
$$
\rho(T)\equiv |X(T)|
$$

In that formulation, a full oscillation alternates between the right and left exterior branches with label-preserving passage through $X=0$. The theorem targets later in this note should therefore be read as targets for post-crossing recapture of the radial distance rather than as literal pre-origin bounce statements on a single $X>0$ branch.

Every theorem that crosses the origin must use the origin-layer integral chart from Lemma `Origin-layer continuity of the dual-mollified 1D field`. The signed branch-sum formulas are valid again only after the crossing layer has been exited and the exterior sheet labels have been fixed. In particular, local recapture estimates stated in
$$
\rho(T)=|X(T)|
$$
are radial post-crossing estimates; they are not proofs that the signed scalar branch-sum field is smooth at
$$
X=0
$$

In particular, the present 1D geometry should not be treated as a radial simplification of the 2D circular case. Along a true collinear history, the self-hit term is naturally read as an anti-damping or positive-work contribution on the physically relevant post-crossing outbound branch: the self interaction tends to reinforce the current radial motion rather than furnish a centrifugal-style barrier. The corrected theorem program therefore asks whether partner attraction can recapture the motion **despite** that self-drive, not because self-hit itself creates the turnaround.

## Necessary Recapture Condition

The breather question can now be reduced to one concrete inequality.

Fix an outbound time $T_\sharp$ on the exterior branch with
$$
X(T_\sharp)>0,
\qquad
\frac{dX}{dT}(T_\sharp)=u_\sharp>0
$$

If the trajectory is ever to turn around and re-enter as an inbound branch, there must exist a later time $T_{\mathrm{turn}}>T_\sharp$ such that
$$
\frac{dX}{dT}(T_{\mathrm{turn}})=0
$$

Integrating the reduced acceleration identity gives
$$
0
=
u_\sharp + \int_{T_\sharp}^{T_{\mathrm{turn}}}
\Big(
-A_p(S)-A_s^{\text{out}}(S)+A_s^{\text{in}}(S)
\Big)\,dS
$$

Equivalently,
$$
u_\sharp
=
\int_{T_\sharp}^{T_{\mathrm{turn}}}
\Big(
A_p(S)+A_s^{\text{out}}(S)-A_s^{\text{in}}(S)
\Big)\,dS
$$

Therefore a **necessary condition for recapture** is
$$
\sup_{T>T_\sharp}
\int_{T_\sharp}^{T}
\Big(
A_p(S)+A_s^{\text{out}}(S)-A_s^{\text{in}}(S)
\Big)\,dS
\ge
u_\sharp
$$

If this inequality fails, then the total accumulated braking from partner attraction plus outer-memory self-hit is never strong enough to overcome the outbound speed and the trajectory cannot turn around.

### Stronger sufficient criterion

If there exists an interval $[T_1,T_2]$ with $T_1\ge T_\sharp$ on which
$$
A_p(T)+A_s^{\text{out}}(T)-A_s^{\text{in}}(T)\ge \delta >0
$$
for all $T\in[T_1,T_2]$, and
$$
\int_{T_1}^{T_2}\delta\,dT \ge \frac{dX}{dT}(T_1)
$$
then a turning point must occur no later than $T_2$.

This criterion is not expected to be the final theorem, but it gives the correct sign target for both numerics and analysis.

## Regularized Return Map

To state a breather problem precisely, define a return section on the symmetric history space rather than on instantaneous phase space alone.

Fix:

- a section location $X_\ast>0$,
- a memory horizon $h$ large enough to contain all active branches on one cycle,
- and a regularization width $\eta>0$.

### Admissible history class

Work first with the raw outbound and inbound sections in the full history space
$$
\mathcal{H}_h
$$
$$
\Sigma^+_{X_\ast,\eta}
\equiv
\left\{
 \phi\in\mathcal{H}_h
\;\middle|\;
\phi(0)=X_\ast,
\qquad
\dot\phi(0)>0
\right\}
$$
$$
\Sigma^-_{X_\ast,\eta}
\equiv
\left\{
 \phi\in\mathcal{H}_h
\;\middle|\;
\phi(0)=X_\ast,
\qquad
\dot\phi(0)<0
\right\}
$$

Because the section histories are anchored by
$$
\phi(0)=X_\ast
$$
with prescribed crossing sign, this return section quotients out the absolute time-translation symmetry of the continuous delayed flow. A periodic trajectory therefore appears as a fixed returned history rather than as an unpinned one-parameter family of time shifts.

The first workable theorem domain should not be the full sections
$$
\Sigma^\pm_{X_\ast,\eta}
$$
but a controlled tame subclass on which the regularized delayed dynamics and return times are well behaved.

Let
$$
\mathcal{H}^{\mathrm{adm}}_{X_\ast,\eta}
\subset
\mathcal{H}_h
$$
denote an admissible reflection-symmetric history class with the following properties on $\theta\in[-h,0]$:

- section anchoring at $\theta=0$,
- uniform position bounds
  $$
  X_{\min}\le \phi(\theta)\le X_{\max}
  $$
- uniform speed bounds
  $$
  |\dot\phi(\theta)|\le u_{\max}
  $$
- uniform Lipschitz-velocity bounds
  $$
  |\dot\phi(\theta_1)-\dot\phi(\theta_2)|
  \le
  a_{\max}|\theta_1-\theta_2|,
  \qquad
  \theta_1,\theta_2\in[-h,0]
  $$
- and a transversality bound on every active partner and self root,
  $$
  |J_p|\ge \nu,
  \qquad
  |J_s|\ge \nu,
  \qquad
  \nu>0
  $$

Also require the active causal memory depth to fit inside the chosen history window:
$$
\tau_{\max}(\phi)\le h
\qquad
\text{for every }\phi\in\mathcal{H}^{\mathrm{adm}}_{X_\ast,\eta}
$$

The role of
$$
\mathcal{H}^{\mathrm{adm}}_{X_\ast,\eta}
$$
is simple: it isolates a tame region of history space on which the regularized vector field, root selection, and section crossings can plausibly be controlled. The Lipschitz-velocity bound is the first compactness-oriented ingredient for a later Arzela-Ascoli step in $C^1$; equivalently, $\ddot\phi$ exists almost everywhere with $|\ddot\phi|\le a_{\max}$ in the weak sense. The memory-depth bound ensures the delayed law really closes on the chosen history interval. Whether the eventual theorem program allows histories that approach $X=0$ arbitrarily closely is a separate question and should not be conflated with the first well-posedness regime.

For
$$
\phi\in\Sigma^+_{X_\ast,\eta}
$$
for which the $\eta$-regularized dynamics is well defined up to the first later time
$$
T^-_\eta(\phi)>0
$$
such that:

- the trajectory has completed one outbound excursion and recapture,
- $X(T^-_\eta(\phi))=X_\ast$,
- and $\frac{dX}{dT}(T^-_\eta(\phi))<0$.

Then define the exact outbound-to-inbound history map on its natural domain
$$
Q_\eta:\operatorname{Dom}(Q_\eta)\subseteq \Sigma^+_{X_\ast,\eta}\to\Sigma^-_{X_\ast,\eta},
\qquad
Q_\eta(\phi)=X_{T^-_\eta(\phi)}
$$

For
$$
\phi\in\Sigma^-_{X_\ast,\eta}
$$
for which the $\eta$-regularized dynamics is well defined up to the first return time
$$
T(\phi)>0
$$
such that:

- the trajectory has completed one collapse-and-rebound cycle,
- $X(T(\phi))=X_\ast$,
- and $\frac{dX}{dT}(T(\phi))<0$ again.

Then define the exact history-space return map on its natural domain
$$
P_\eta:\operatorname{Dom}(P_\eta)\subseteq \Sigma^-_{X_\ast,\eta}\to\Sigma^-_{X_\ast,\eta},
\qquad
P_\eta(\phi)=X_{T(\phi)}
$$

This is the natural reduced object for theorem work. The core fixed-point question belongs to $P_\eta$ on a controlled subset of history space, not to any scalar speed map by itself.

### Projected scalar speed map

The scalar map is useful only after choosing a specific way to inject scalar speed data into the outbound history section.

Assume there is a continuous injection
$$
\iota_\eta(\,\cdot\,;X_\ast):I\to\Sigma^+_{X_\ast,\eta},
\qquad
u\mapsto \phi^+_{\eta}(u;X_\ast)
$$
from an interval $I\subset(0,\infty)$ of outbound speeds into admissible outbound histories, such that
$$
\dot\phi^+_{\eta}(u;X_\ast)(0)=u
$$

This injection is extra structure. It is not part of the master equation itself; it is a chosen slice through history space.

Write the corresponding trajectory as $X(T;u,X_\ast,\eta)$ with initial section data
$$
X(0;u,X_\ast,\eta)=X_\ast,
\qquad
\frac{dX}{dT}(0;u,X_\ast,\eta)=u
$$

If the trajectory is recaptured and returns to the inbound section, define the projected scalar map
$$
R_\eta(u;X_\ast)
\equiv
-\frac{dX}{dT}\!\big(T^-_\eta(u;X_\ast);u,X_\ast,\eta\big)
>0
$$

Thus $R_\eta(u;X_\ast)$ is the magnitude of the next inbound speed when the trajectory re-crosses the same section $X=X_\ast$.

Equivalently, if
$$
\Pi:\Sigma^-_{X_\ast,\eta}\to(0,\infty),
\qquad
\Pi(\phi)\equiv -\dot\phi(0)
$$
denotes the inbound speed projection on the section, then
$$
R_\eta(\,\cdot\,;X_\ast)
=
\Pi\circ Q_\eta\circ \iota_\eta(\,\cdot\,;X_\ast)
$$

This is the correct status of the scalar map: it is a projection of the history-space excursion map through a chosen one-parameter injection, not an autonomous closure law of the delayed system.

Now introduce the net inward braking density
$$
B_\eta(T;u,X_\ast)
\equiv
A_p(T)+A_s^{\text{out}}(T)-A_s^{\text{in}}(T)
$$
so that along the trajectory
$$
\frac{d^2X}{dT^2}(T;u,X_\ast,\eta) = -B_\eta(T;u,X_\ast)
$$

Integrating from the outbound crossing at $T=0$ to the next inbound crossing at $T=T^-_\eta(u;X_\ast)$ gives
$$
-R_\eta(u;X_\ast)
=
u + \int_{0}^{T^-_\eta(u;X_\ast)}
\frac{d^2X}{dT^2}(S;u,X_\ast,\eta)\,dS
=
u - \int_{0}^{T^-_\eta(u;X_\ast)}
B_\eta(S;u,X_\ast)\,dS
$$

Equivalently,
$$
R_\eta(u;X_\ast)
=
-u + \int_{0}^{T^-_\eta(u;X_\ast)}
B_\eta(S;u,X_\ast)\,dS
$$

This is the clean projected scalar map: the next inbound speed equals the total accumulated inward braking budget over the outbound-and-return excursion minus the outbound launch speed at the section.

If $T^\mathrm{turn}_\eta(u;X_\ast)$ denotes the first turning time with
$$
\frac{dX}{dT}\!\big(T^\mathrm{turn}_\eta(u;X_\ast)\big)=0
$$
then the same map splits into two exact pieces:
$$
u
=
\int_{0}^{T^\mathrm{turn}_\eta(u;X_\ast)}
B_\eta(S;u,X_\ast)\,dS
$$
$$
R_\eta(u;X_\ast)
=
\int_{T^\mathrm{turn}_\eta(u;X_\ast)}^{T^-_\eta(u;X_\ast)}
B_\eta(S;u,X_\ast)\,dS
$$

The first identity is the outbound recapture condition on the section. The second states that the next inbound speed is exactly the inward gain accumulated after the turning point.

### Scalar closure condition

The map $R_\eta$ is only a projection of the exact history-space map $Q_\eta$, but it is the sharpest scalar diagnostic for recapture on the fixed section $X=X_\ast$.

If the admissible family is symmetric enough that outbound and inbound section data are parameterized by the same scalar speed, then a scalar breather candidate satisfies
$$
u_\ast = R_\eta(u_\ast;X_\ast)
$$

However, this scalar fixed-point condition does not by itself imply periodic closure. The delayed dynamics only closes when the full history is returned:
$$
\phi^\ast = P_\eta(\phi^\ast)
$$

The scalar map is therefore best read as a reduced diagnostic for recapture and speed balance. The actual theorem program should proceed by finding a closed, bounded, invariant subset of the raw inbound section
$$
\Sigma^-_{X_\ast,\eta}
$$
and then packaging it inside the later convex-envelope hierarchy
$$
\mathcal{C}_{X_\ast,\eta}
\supseteq
\mathcal{K}_{X_\ast,\eta}
$$

### Local recapture architecture

The scalar map is only a diagnostic for section-speed balance. The real local input to the global fixed-point route is a post-crossing recapture theorem on a uniform admissible crossing subclass. The global envelope hierarchy
$$
\mathcal{C}_{X_\ast,\eta}
\supseteq
\mathcal{K}_{X_\ast,\eta}
$$
is introduced later; at the local level the only issue is whether partner attraction can erase the first post-crossing outward radial speed before the self drive pushes the trajectory to large radius.

The sorting map
$$
w(T)\equiv X(T)+c_f T
$$
organizes that geometry. On the initial post-crossing branch, as long as
$$
\frac{dX}{dT}(T)<-c_f
$$
one has
$$
\frac{dw}{dT}(T)=\frac{dX}{dT}(T)+c_f<0,
\qquad
w(0)=0
$$
and therefore
$$
w(T)<0
\qquad
\text{for }0<T\le \tau_{\mathrm{loc}}
$$
If
$$
T_{\mathrm{zero}}<0
$$
is the earlier inbound time satisfying
$$
w(T_{\mathrm{zero}})=0
$$
then every active self root selected by
$$
w(T_s)=w(T)
$$
must satisfy
$$
T_s<T_{\mathrm{zero}}
$$
The active self roots are therefore forced back into the earlier sub-field-speed inbound source region, where the self Jacobian is automatically noncaustic. This is the mechanism behind the bounded self-drive estimate used in the local theorem below.

> **Theorem (Local Origin-Crossing Recapture).**
> Let the 1D kernel be dual-mollified by a shell width $\eta>0$ and a core mollifier $\epsilon_c>0$. Let $\phi$ be an admissible signed history with an origin crossing at $T=0$ and outward radial speed
> $$
> V_0\equiv V_\phi(0)>c_f.
> $$
> Take $\phi$ from a fixed admissible crossing subclass
> $$
> \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c},
> $$
> defined below so that the local constants used in Lemmas 1-4 are uniform on that class.
> Assume hypotheses (H1)-(H4) below, and assume either:
> 1. the abstract Goldilocks hypothesis (H5), or
> 2. the explicit short-window assumptions of Proposition `Explicit short-window recapture regime`.
>
> Then there exists a time window $[0,\tau_{\mathrm{env}}]$ on which:
> $$
> w(T)<0,
> \qquad
> A_s^{\rho}(T)\le \overline A_s^{\rho},
> $$
> and the radial acceleration satisfies
> $$
> \frac{d^2\rho}{dT^2}(T)\le -A_p^{\rho}(T)+A_s^{\rho}(T).
> $$
> If, in addition,
> $$
> \tau_{\mathrm{env}}\ge \tau_{\mathrm{sep}},
> \qquad
> \sigma\equiv \frac{V_0-c_f}{2},
> \qquad
> \tau_{\mathrm{sep}}\equiv \frac{2\eta}{\sigma},
> $$
> then on the delayed subwindow
> $$
> [\tau_{\mathrm{sep}},\tau_{\mathrm{env}}],
> $$
> every active self root satisfies
> $$
> T_s\le T_{\mathrm{zero}}-\frac{\eta}{2c_f},
> $$
> so the caustic is separated from the active self branches there.
> If the resulting impulse margin obeys
> $$
> V_0<
> \int_0^{\tau_{\mathrm{env}}}
> \Big(
> \underline A_p^{\rho}(S)-\overline A_s^{\rho}
> \Big)\,dS,
> $$
> then there exists
> $$
> \tau_{\mathrm{turn}}\in(0,\tau_{\mathrm{env}}]
> $$
> such that
> $$
> \frac{d\rho}{dT}(\tau_{\mathrm{turn}})=0.
> $$
> In particular, the post-crossing branch is radially recaptured on the initial window.

This is the operative local theorem of the manuscript. The abstract form passes through (H5), while the concrete route used later is the explicit short-window proposition proved from Lemmas 1-4.

### Hypotheses unpacked

The current theorem target is intended as a **local-in-time recapture theorem** on an initial post-crossing window. Its hypotheses can be organized as follows.

**(H1) Origin-crossing data.**
$$
\phi(0)=0,
\qquad
\dot\phi(0)=-V_0,
\qquad
V_0>c_f
$$

**(H2) Sorting-map phase picture on the stored past.**
For the history sorting map
$$
w(\theta)=\phi(\theta)+c_f\theta,
\qquad
\theta\in[-h,0]
$$
there exist times
$$
T_{\mathrm{zero}}<T_{\mathrm{hinge}}<0
$$
such that
$$
w(T_{\mathrm{zero}})=0,
\qquad
\dot\phi(T_{\mathrm{hinge}})=-c_f
$$
and
$$
w(\theta)>0
\qquad
\text{for }\theta\in(T_{\mathrm{zero}},0)
$$
For any fixed interior margin
$$
0<\gamma_w<\min\{T_{\mathrm{hinge}}-T_{\mathrm{zero}},-T_{\mathrm{hinge}}\}
$$
continuity then gives the compact-subinterval gap
$$
\delta_w
\equiv
\min_{\theta\in[T_{\mathrm{zero}}+\gamma_w,-\gamma_w]} w(\theta)
>0
$$

**(H3) Past transversality on the sub-field-speed source region.**
There exists $\nu>0$ such that
$$
\dot\phi(\theta)\ge -c_f+\nu
\qquad
\text{for }\theta\in[-h,T_{\mathrm{zero}}]
$$

**(H4) Shell-mollifier separation from the interior sorting gap.**
For the compact-subinterval gap chosen in (H2), the shell mollifier width is small enough that its support cannot bridge from the negative post-crossing values of $w(T)$ into the positive interior sorting hump:
$$
\eta<\frac{\delta_w}{2}
$$

**(H5) Goldilocks crossing-speed / core-mollifier regime.**
There exists a time window
$$
[0,\tau_{\mathrm{env}}]\subseteq [0,\tau_{\mathrm{tube}}]
$$
such that
$$
V_0<
\int_0^{\tau_{\mathrm{env}}}
\Big(
\underline A_p^{\rho}(S;\phi,V_0,\epsilon_c)
-
\overline A_s^{\rho}(\phi,\nu)
\Big)\,dS
$$
At this stage this remains the abstract bottleneck hypothesis. A concrete sufficient realization is provided later by the proposition `Explicit short-window recapture regime`, which chooses
$$
\tau_{\mathrm{env}}=\tau_\epsilon\equiv \frac{\epsilon_c}{2\beta_{p,\max}}
$$
on a fixed admissible crossing subclass and replaces the integral inequality by explicit algebraic bounds on
$$
(\eta,\epsilon_c,V_{\max},\kappa\epsilon^2)
$$

### Uniform admissible crossing subclass

To make those local constants concrete, fix positive class parameters
$$
c_f<V_{\min}\le V_{\max},
\qquad
\gamma_w,
\qquad
\delta_{w,\min},
\qquad
\nu,
\qquad
\rho_{0,\min},
\qquad
a_{\max},
\qquad
a_{\mathrm{tube}},
\qquad
\tau_{\mathrm{tube}}
$$
and an integer root-count bound
$$
N_s^{\max}\ge 1
$$

Let
$$
\mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}
\subset
C^1([-h,0];\mathbb{R})
$$
denote the class of signed crossing histories $\phi$ satisfying:

- the theorem hypotheses (H1)-(H4) with class-wide constants bounded by
  $$
  V_{\min}\le V_0(\phi)\le V_{\max},
  \qquad
  \delta_w(\phi;\gamma_w)\ge \delta_{w,\min},
  \qquad
  \nu(\phi)\ge \nu
  $$
- a uniform pre-crossing Lipschitz-velocity bound,
  $$
  |\dot\phi(\theta_1)-\dot\phi(\theta_2)|
  \le
  a_{\max}|\theta_1-\theta_2|
  \qquad
  \text{for }\theta_1,\theta_2\in[-h,0]
  $$
- a uniform pre-caustic radius bound,
  $$
  \rho_{\mathrm{zero}}(\phi)
  \equiv
  -c_f T_{\mathrm{zero}}(\phi)
  =
  \phi(T_{\mathrm{zero}}(\phi))
  \ge
  \rho_{0,\min}
  $$
- and a forward local tube condition: the dual-mollified forward continuation exists on
  $$
  [0,\tau_{\mathrm{tube}}]
  $$
  satisfies
  $$
  |\frac{d^2X_\phi}{dT^2}(T)|\le a_{\mathrm{tube}}
  \qquad
  \text{for }0\le T\le \tau_{\mathrm{tube}}
  $$
  every active self root on that window obeys
  $$
  |J_s(T;T_s)|\ge \frac{\nu}{c_f}
  $$
  and has at most
  $$
  N_s^{\max}
  $$
  active self roots on the initial post-crossing window.

The shell width is chosen inside the class-uniform interior sorting gap:
$$
\eta<\frac{\delta_{w,\min}}{2}
$$

From these class parameters one may fix the derived constants
$$
\sigma_{\min}\equiv \frac{V_{\min}-c_f}{2},
\qquad
a_{\mathrm{loc}}\equiv a_{\mathrm{tube}},
\qquad
a_\ast\equiv \max\{a_{\max},a_{\mathrm{tube}}\},
\qquad
\beta_{p,\min}\equiv \frac{2c_fV_{\min}}{V_{\min}+c_f},
\qquad
\beta_{p,\max}\equiv \frac{2c_fV_{\max}}{V_{\max}+c_f},
\qquad
\tau_1\equiv \min\!\left\{\tau_{\mathrm{tube}},\frac{\sigma_{\min}}{a_{\mathrm{tube}}}\right\}
$$
with $\tau_\rho$ chosen so that
$$
V_{\max}\tau_\rho+\frac{a_{\mathrm{tube}}}{2}\tau_\rho^2
\le
\frac{\rho_{0,\min}}{2}
$$
On this subclass:

- Lemma 1 uses the common continuation constants $(\sigma_{\min},a_{\mathrm{tube}},\tau_1)$,
- Lemma 2 uses the common geometric separation data $(\rho_{0,\min},\nu,N_s^{\max})$,
- Lemma 3 admits a common partner-root remainder constant
  $$
  C_p=C_p(V_{\max},c_f,a_\ast)
  $$
- and the explicit short-window proposition can be written uniformly by replacing $(V_0,\beta_p)$ with the class-wide worst-case pair $(V_{\max},\beta_{p,\max})$, while the delayed-entry time uses the lower-speed bound $\sigma_{\min}$.

This is the sense in which the later local constants are inherited by construction rather than introduced ad hoc.

The crossing subclass uses the following constants.

| Constant | Bound or role | Used by |
| --- | --- | --- |
| $V_{\min}$ | lower crossing speed, strictly above $c_f$ | Lemma 1, Lemma 3 |
| $V_{\max}$ | upper crossing speed and worst-case radial speed | Lemma 3, Lemma 4, explicit recapture regime |
| $\gamma_w$ | compact pre-crossing sorting-gap trimming scale | (H2), Lemma 2 |
| $\delta_{w,\min}$ | class-wide lower sorting gap on the trimmed interval | shell-width exclusion in Lemma 2 |
| $\nu$ | self-root Jacobian floor, scaled by $c_f$ in the statement | Lemma 2 and tame topology |
| $\rho_{0,\min}$ | minimum pre-caustic radius at $T_{\mathrm{zero}}$ | Lemma 2 delayed-source separation |
| $a_{\max}$ | stored-history Lipschitz-velocity bound | Lemma 3 partner-root remainder |
| $a_{\mathrm{tube}}$ | forward acceleration ceiling on the local tube | Lemma 1 and Lemma 3 |
| $\tau_{\mathrm{tube}}$ | guaranteed forward continuation window | Lemma 1 |
| $N_s^{\max}$ | active self-root count ceiling | Lemma 2 self-drive bound |
| $\sigma_{\min}$ | uniform super-field crossing surplus $(V_{\min}-c_f)/2$ | Lemma 1 and delayed-entry time |
| $a_\ast$ | common acceleration remainder bound $\max\{a_{\max},a_{\mathrm{tube}}\}$ | Lemma 3 |
| $\beta_{p,\min}$ | lower partner linear coefficient from $V_{\min}$ | short-window dominance checks |
| $\beta_{p,\max}$ | upper partner linear coefficient from $V_{\max}$ | explicit recapture regime |
| $\tau_1$ | class-uniform post-crossing monotonicity window | Lemma 1 through Lemma 4 |
| $\tau_\rho$ | window on which delayed sources stay away from the origin layer | Lemma 2 delayed-window refinement |

### Lemma ladder

The theorem target naturally breaks into four lemmas.

**Lemma 1: Short-time continuation and sorting-map monotonicity.**
Prove that there exists $\tau_1>0$ such that
$$
\frac{dX}{dT}(T)\le -c_f
\qquad
\text{for }0\le T\le \tau_1
$$
so that
$$
\frac{dw}{dT}(T)\le 0
\qquad
\text{and hence}
\qquad
w(T)<0
$$
on the initial post-crossing window.

Working form:
let
$$
\sigma\equiv \frac{V_0-c_f}{2}>0
$$
Because the dual-mollified vector field is finite on the post-crossing window, there exists a local acceleration bound
$$
|\frac{d^2X}{dT^2}(T)|\le a_{\mathrm{loc}}
\qquad
\text{for }0\le T\le \tau_{\mathrm{loc}}
$$
Choose
$$
\tau_1\le \min\!\left\{\tau_{\mathrm{loc}},\frac{\sigma}{a_{\mathrm{loc}}}\right\}
$$
Then
$$
\frac{dX}{dT}(T)
\le
\frac{dX}{dT}(0)+a_{\mathrm{loc}}T
=
-V_0+a_{\mathrm{loc}}T
\le
-V_0+\sigma
=
-c_f-\sigma
<
-c_f
$$
for all $T\in[0,\tau_1]$. Consequently
$$
\frac{dw}{dT}(T)=\frac{dX}{dT}(T)+c_f\le -\sigma
$$
and integrating from $w(0)=0$ gives
$$
w(T)\le -\sigma T<0
\qquad
\text{for }0<T\le \tau_1
$$

Proof.
The forward local tube condition in the admissible crossing subclass gives existence of the dual-mollified continuation on $[0,\tau_{\mathrm{loc}}]$ together with the bound
$$
|\frac{d^2X}{dT^2}(T)|\le a_{\mathrm{loc}}
$$
Because
$$
\frac{dX}{dT}(0)=-V_0<-c_f
$$
the fundamental theorem of calculus yields
$$
\frac{dX}{dT}(T)=\frac{dX}{dT}(0)+\int_0^T \frac{d^2X}{dT^2}(S)\,dS
\le
-V_0+a_{\mathrm{loc}}T
$$
Choosing
$$
\tau_1\le \min\!\left\{\tau_{\mathrm{loc}},\frac{\sigma}{a_{\mathrm{loc}}}\right\}
$$
forces
$$
\frac{dX}{dT}(T)\le -V_0+\sigma=-c_f-\sigma<-c_f
$$
for every $T\in[0,\tau_1]$. Therefore
$$
\frac{dw}{dT}(T)=\frac{dX}{dT}(T)+c_f\le -\sigma
$$
and integration from the crossing value
$$
w(0)=X(0)+c_f\cdot 0=0
$$
gives
$$
w(T)\le -\sigma T<0
$$
on $(0,\tau_1]$. This proves the lemma. On a fixed admissible crossing subclass the same argument is uniform after replacing $\sigma$ by $\sigma_{\min}$ and $a_{\mathrm{loc}}$ by $a_{\mathrm{tube}}$.

**Lemma 2: Caustic isolation and uniform self-drive bound.**
Use the local tube bounds to obtain a crude self-drive estimate on the full post-crossing window, and then use (H2)-(H4) together with Lemma 1 to show that on a delayed subwindow every active self root lies strictly before $T_{\mathrm{zero}}$ and hence stays away from the caustic hinge.

Working form:
fix $T\in(0,\tau_1]$ and suppose a self-emission time $T_s<T$ lies in the support of the shell mollifier on the left-moving post-crossing branch. If the shell mollifier has support band $\eta$, then
$$
\left|X(T)-X(T_s)+c_f(T-T_s)\right|\le \eta
$$
which is equivalent to
$$
\left|w(T_s)-w(T)\right|\le \eta
$$

On the full initial tube one assumes the class-wide branch-count bound and a
same-record receiver-normal branch-strength ceiling
$$
W_s^{\mathrm{rec}}(T;T_s)
\le
\overline W_s^{\mathrm{rec}}
$$
for every retained self row in the tube. Therefore
$$
A_s^{\rho}(T)
\le
N_s^{\max}\,
\kappa\epsilon^2\,
\overline W_s^{\mathrm{rec}}\,
\frac{1}{\epsilon_c^2}
\equiv
\overline A_s^{\rho}
\qquad
\text{for }0\le T\le \tau_1
$$
This is the basic bounded self-drive estimate used in the local theorem.

One obtains a stronger separated statement on a slightly delayed subwindow. Define
$$
\tau_{\mathrm{sep}}\equiv \frac{2\eta}{\sigma}
$$
Then for $T\in[\tau_{\mathrm{sep}},\tau_1]$,
$$
w(T)\le -2\eta
$$
so any active self root satisfies
$$
w(T_s)\le -\eta
$$
Hence every active self root on that delayed subwindow satisfies
$$
T_s<T_{\mathrm{zero}}
$$
Since on the sub-field-speed source region one has
$$
\frac{dw}{dT}(\theta)=\frac{dX}{dT}(\theta)+c_f\ge \nu,
\qquad
\theta\in[-h,T_{\mathrm{zero}}]
$$
monotonicity together with the upper sorting-slope bound $dw/dT<2c_f$ on the sub-field-speed source region gives
$$
T_s\le T_{\mathrm{zero}}-\gamma(\eta),
\qquad
\gamma(\eta)\equiv \frac{\eta}{2c_f}
$$

Thus the caustic is uniformly separated from the active self roots on the delayed subwindow.

A sharper geometric version is available only on the delayed window where the roots have already entered the sub-field-speed source region. Since
$$
w(T_{\mathrm{zero}})=0
\qquad
\Longrightarrow
\qquad
X(T_{\mathrm{zero}})=-c_f T_{\mathrm{zero}}
\equiv
\rho_{\mathrm{zero}}>0
$$
and the pre-crossing branch is inbound, one has
$$
X(T_s)\ge \rho_{\mathrm{zero}}
\qquad
\text{for every }T_s\le T_{\mathrm{zero}}
$$
Choose a short window $[0,\tau_\rho]$ on which
$$
\rho(T)=|X(T)|\le \frac{\rho_{\mathrm{zero}}}{2}
$$
Then every active self root on the delayed geometric window
$$
T\in[\tau_{\mathrm{sep}},\min\{\tau_1,\tau_\rho\}]
$$
satisfies
$$
|X(T)-X(T_s)|
=
\rho(T)+X(T_s)
\ge
\frac{\rho_{\mathrm{zero}}}{2}
$$
Hence the same branch-count bound yields the sharper estimate
$$
A_s^{\rho}(T)
\le
N_s^{\max}\,
\kappa\epsilon^2\,
\overline W_s^{\mathrm{rec}}\,
\frac{4}{\rho_{\mathrm{zero}}^2}
\equiv
\overline A_{s,\mathrm{geom}}^{\rho}
$$
which is independent of the core mollifier $\epsilon_c$. This is the delayed-window version that can sharpen the Goldilocks condition once the short-time window extends beyond $\tau_{\mathrm{sep}}$.

Proof.
On the full initial tube, each active self branch contributes a radial acceleration of the form
$$
\kappa\epsilon^2\,
W_s^{\mathrm{rec}}\,
\frac{1}{r_s^2+\epsilon_c^2}
$$
with
$$
W_s^{\mathrm{rec}}\le \overline W_s^{\mathrm{rec}}
$$
by the same-record branch-strength ceiling and
$$
r_s^2+\epsilon_c^2\ge \epsilon_c^2
$$
by core mollification. Summing over at most
$$
N_s^{\max}
$$
active self roots gives the crude bound
$$
A_s^{\rho}(T)\le \overline A_s^\rho
$$
for
$$
0\le T\le \tau_1
$$

For the delayed separation, Lemma 1 gives
$$
w(T)\le -\sigma T
$$
Hence for
$$
T\in[\tau_{\mathrm{sep}},\tau_1],
\qquad
\tau_{\mathrm{sep}}=\frac{2\eta}{\sigma}
$$
one has
$$
w(T)\le -2\eta
$$
If a self root $T_s<T$ lies in the shell support, then
$$
|w(T_s)-w(T)|\le \eta
$$
so
$$
w(T_s)\le -\eta<0
$$
But hypothesis (H2) states that
$$
w(\theta)>0
\qquad
\text{for }\theta\in(T_{\mathrm{zero}},0)
$$
therefore no such $T_s$ can lie in $(T_{\mathrm{zero}},0)$ and hence
$$
T_s<T_{\mathrm{zero}}
$$
On the source region
$$
[-h,T_{\mathrm{zero}}]
$$
hypothesis (H3) gives the two-sided sorting-slope bound
$$
\nu
\le
\frac{dw}{dT}(\theta)=\frac{dX}{dT}(\theta)+c_f
\le
M,
\qquad
M\equiv c_f+\sup_{\theta\in[-h,T_{\mathrm{zero}}]}\frac{dX}{dT}(\theta)
$$
A separation in time is a *lower* bound on $T_{\mathrm{zero}}-T_s$, so it must be extracted from the *upper* slope bound. Applying the mean-value theorem between $T_s$ and $T_{\mathrm{zero}}$ yields
$$
w(T_{\mathrm{zero}})-w(T_s)\le M\,(T_{\mathrm{zero}}-T_s)
$$
Since
$$
w(T_{\mathrm{zero}})=0
\qquad
\text{and}
\qquad
w(T_s)\le -\eta
$$
the left side is at least $\eta$, and it follows that
$$
T_s\le T_{\mathrm{zero}}-\frac{\eta}{M}
=
T_{\mathrm{zero}}-\gamma(\eta)
$$
On the sub-field-speed source region $\frac{dX}{dT}<c_f$, so $M<2c_f$ and the admissible constant $\gamma(\eta)=\eta/(2c_f)$ may be used without further hypotheses. The lower slope bound $\nu$ is still needed, but for the source-normal Jacobian floor, not for this separation.

This proves the delayed caustic-separation claim.

For the geometric refinement, use that the selected source branch is inbound before the crossing, so $X(\theta)$ decreases toward the origin on the stored pre-crossing leg. Thus
$$
T_s\le T_{\mathrm{zero}}
\qquad
\Longrightarrow
\qquad
X(T_s)\ge X(T_{\mathrm{zero}})=\rho_{\mathrm{zero}}
$$
If in addition
$$
0\le T\le \tau_\rho
\qquad
\text{and}
\qquad
\rho(T)\le \frac{\rho_{\mathrm{zero}}}{2}
$$
then on the delayed geometric window
$$
T\in[\tau_{\mathrm{sep}},\min\{\tau_1,\tau_\rho\}]
$$
one has
$$
|X(T)-X(T_s)|=\rho(T)+X(T_s)\ge \frac{\rho_{\mathrm{zero}}}{2}
$$
Replacing the crude denominator bound
$$
r_s^2+\epsilon_c^2\ge \epsilon_c^2
$$
by
$$
r_s^2+\epsilon_c^2\ge \frac{\rho_{\mathrm{zero}}^2}{4}
$$
and summing again over at most
$$
N_s^{\max}
$$
branches gives
$$
A_s^\rho(T)\le \overline A_{s,\mathrm{geom}}^\rho
$$
This proves Lemma 2.

**Lemma 3: Partner-root linearization and lower bound.**
Use the linearized partner root
$$
T_p
=
-\left(\frac{V_0-c_f}{V_0+c_f}\right)T
$$
to derive the partner-distance bound
$$
r_p(T)\le
\left(\frac{2c_fV_0}{V_0+c_f}\right)T+\mathcal{O}(T^2)
$$
and hence a lower bound on the core-mollified partner attraction
$$
A_p^{\rho}(T)\ge \underline A_p^{\rho}(T)
$$

Working form:
write
$$
S\equiv -T_p>0
$$
for the past partner-emission time measured backward from the crossing. On the active partner branch, shell support gives
$$
\left||X(T)+X(T_p)|-c_f(T+S)\right|\le \eta
$$

Assume the signed trajectory is $C^1$ through the crossing and obeys uniform acceleration bounds on both sides of $T=0$. Then there exists
$$
a_\ast\equiv \max\{a_{\mathrm{loc}},a_{\max}\}
$$
such that the Taylor remainders satisfy
$$
X(T)= -V_0 T + R_+(T),
\qquad
|R_+(T)|\le \frac{a_\ast}{2}T^2
$$
for $T\in[0,\tau_1]$, and
$$
X(T_p)= V_0 S + R_-(S),
\qquad
|R_-(S)|\le \frac{a_\ast}{2}S^2
$$
for $S\in[0,\tau_1]$.

Substituting these expansions into the partner-shell condition yields
$$
\left|
V_0(T-T_{\mathrm{em}})-c_f(T+S)
+E_p(T,S)
\right|
\le \eta
$$
where
$$
|E_p(T,S)|\le \frac{a_\ast}{2}(T^2+S^2)
$$

Let
$$
\alpha\equiv \frac{V_0-c_f}{V_0+c_f}\in(0,1),
\qquad
\beta_p\equiv \frac{2c_fV_0}{V_0+c_f}
$$
Then the linearized root is $S=\alpha T$. For sufficiently small $T$ and $\eta$, the exact active partner root obeys the one-sided estimate
$$
S\le \alpha T + C_p(T^2+\eta)
$$
for some constant $C_p$ depending only on $(V_0,c_f,a_\ast)$.

Consequently the delayed partner distance satisfies the upper bound
$$
r_p(T)=c_f(T+S)
\le
\beta_p T + c_f C_p(T^2+\eta)
$$

This is the form needed for the theorem program: as the trajectory brakes after the crossing, the true partner distance can only become smaller than this leading linear estimate, which strengthens the partner attraction. Therefore the core-mollified partner term admits the explicit lower bound
$$
A_p^{\rho}(T)
\ge
\frac{\kappa\epsilon^2}{
\left(
\beta_p T + c_f C_p(T^2+\eta)
\right)^2+\epsilon_c^2}
\equiv
\underline A_p^{\rho}(T)
$$

Proof.
Let
$$
F(T,S)\equiv V_0(T-T_{\mathrm{em}})-c_f(T+S)+E_p(T,S)
$$
The shell condition on the active partner branch is precisely
$$
|F(T,S)|\le \eta
$$
At the linear level,
$$
F_0(T,S)=V_0(T-T_{\mathrm{em}})-c_f(T+S)
$$
has root
$$
S=\alpha T,
\qquad
\alpha=\frac{V_0-c_f}{V_0+c_f}
$$
and
$$
\partial_{T_{\mathrm{em}}} F_0(0,0)=-(V_0+c_f)\neq 0
$$
Write
$$
E_p(T,S)=-(R_+(T)+R_-(S))
$$
so the absolute remainder bounds imply
$$
|E_p(T,\alpha T)|
\le
\frac{a_\ast}{2}(1+\alpha^2)T^2
\equiv
C_0 T^2
$$
Moreover the integral remainder formula gives
$$
|\partial_{T_{\mathrm{em}}} E_p(T,S)|\le a_\ast S
$$
After shrinking the local window if necessary, assume
$$
0\le S\le \tau_1
\qquad
\text{and}
\qquad
a_\ast\tau_1\le \frac{V_0+c_f}{2}
$$
Then on that window
$$
\partial_{T_{\mathrm{em}}} F(T,S)
=
-(V_0+c_f)+\partial_{T_{\mathrm{em}}} E_p(T,S)
\le
-\frac{V_0+c_f}{2}<0
$$
Hence the active partner branch is quantitatively nondegenerate. Applying the mean-value theorem in the $S$ variable between $S$ and $\alpha T$ yields a point $\xi$ between them such that
$$
F(T,S)-F(T,\alpha T)=\partial_{T_{\mathrm{em}}} F(T,\xi)\,(S-\alpha T)
$$
Therefore
$$
\frac{V_0+c_f}{2}\,|S-\alpha T|
\le
|F(T,S)|+|F(T,\alpha T)|
\le
\eta+C_0 T^2
$$
so
$$
|S-\alpha T|
\le
\frac{2}{V_0+c_f}\big(\eta+C_0 T^2\big)
$$
Thus there is an explicit constant
$$
C_p=C_p(V_0,c_f,a_\ast)
$$
such that
$$
S\le \alpha T + C_p(T^2+\eta)
$$
Substituting into
$$
r_p(T)=c_f(T+S)
$$
gives
$$
r_p(T)\le c_f(1+\alpha)T+c_f C_p(T^2+\eta)
=
\beta_p T + c_f C_p(T^2+\eta)
$$
Because the core-mollified partner contribution is monotone decreasing in the delayed distance,
$$
r_p(T)\le r_{\mathrm{ub}}(T)
\qquad
\Longrightarrow
\qquad
\frac{1}{r_p(T)^2+\epsilon_c^2}
\ge
\frac{1}{r_{\mathrm{ub}}(T)^2+\epsilon_c^2}
$$
where
$$
r_{\mathrm{ub}}(T)\equiv \beta_p T + c_f C_p(T^2+\eta)
$$
Multiplying by the positive prefactor
$$
\kappa\epsilon^2
$$
gives
$$
A_p^\rho(T)\ge \underline A_p^\rho(T)
$$
which proves the lemma. On the admissible crossing subclass the same argument is uniform after replacing
$$
V_0\mapsto V_{\max}
\qquad
\text{in }C_p
$$
and, when desired for a conservative bound, replacing
$$
\beta_p\mapsto \beta_{p,\max}
$$

**Lemma 4: Recapture integration.**
Show that the function
$$
f(T)
\equiv
V_0-
\int_0^T
\Big(
\underline A_p^{\rho}(S)-\overline A_s^{\rho}
\Big)\,dS
$$
has a zero on the initial window under (H5), and conclude that the true radial speed must vanish there.

Working form:
fix a window $[0,\tau]$ on which Lemma 2 and Lemma 3 both hold, and define
$$
B_\tau\equiv c_f C_p(\tau^2+\eta)
$$
Then for $0\le T\le \tau$,
$$
\underline A_p^{\rho}(T)
\ge
\frac{\kappa\epsilon^2}{
\left(\beta_p T+B_\tau\right)^2+\epsilon_c^2
}
$$

Integrating this explicit lower bound gives the partner impulse estimate
$$
\Delta V_p(\tau)
\equiv
\int_0^\tau \underline A_p^{\rho}(S)\,dS
\ge
\frac{\kappa\epsilon^2}{\beta_p\epsilon_c}
\left[
\arctan\!\left(\frac{\beta_p\tau+B_\tau}{\epsilon_c}\right)
-
\arctan\!\left(\frac{B_\tau}{\epsilon_c}\right)
\right]
$$

If the self-drive is bounded above by a constant $\overline A_s^\rho$ on the same window, then the total outward impulse from self-hit is at most
$$
\Delta V_s(\tau)\le \overline A_s^\rho\,\tau
$$

Therefore a sufficient recapture condition is
$$
V_0<
\Delta V_p(\tau)-\overline A_s^\rho\,\tau
$$

If, in addition, the chosen window reaches the delayed geometric regime,
$$
\tau\ge \tau_{\mathrm{sep}}
\qquad
\text{and}
\qquad
\tau\le \tau_\rho
$$
then one may split the self-drive loss as
$$
\Delta V_s(\tau)
\le
\overline A_s^\rho\,\tau_{\mathrm{sep}}
+
\overline A_{s,\mathrm{geom}}^\rho\,(\tau-\tau_{\mathrm{sep}})
$$
and therefore the sharper sufficient recapture condition becomes
$$
V_0<
\Delta V_p(\tau)
-
\overline A_s^\rho\,\tau_{\mathrm{sep}}
-
\overline A_{s,\mathrm{geom}}^\rho\,(\tau-\tau_{\mathrm{sep}})
$$

This is the working form of the Goldilocks condition. It makes the bottleneck explicit: one must show that there exist parameters
$$
(\eta,\epsilon_c,V_0,\tau)
$$
for which the dual-mollified partner impulse beats the bounded self-drive loss on a nonempty initial window.

On a fixed admissible crossing subclass, the corresponding class-uniform version replaces
$$
V_0\mapsto V_{\max},
\qquad
\beta_p\mapsto \beta_{p,\max},
\qquad
\sigma\mapsto \sigma_{\min}
$$
and uses the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast)
$$
That conservative substitution is the bridge from the single-history Lemma 4 estimate to the class-uniform proposition below.

Proof.
Let
$$
V(T)\equiv \frac{d\rho}{dT}(T)
$$
denote the outward radial speed on the post-crossing branch. Then
$$
V(0)=V_0>0
$$
By Lemma 2 and Lemma 3, on every window $[0,\tau]$ where both lemmas hold one has
$$
\frac{d^2\rho}{dT^2}(T)\le -\underline A_p^\rho(T)+\overline A_s^\rho
$$
Integrating from $0$ to $T\le \tau$ yields
$$
V(T)
=
V_0+\int_0^T \frac{d^2\rho}{dT^2}(S)\,dS
\le
V_0-\int_0^T\big(\underline A_p^\rho(S)-\overline A_s^\rho\big)\,dS
=
f(T)
$$
If the delayed geometric regime is available, the same integration gives the sharper estimate
$$
V(T)
\le
V_0-\Delta V_p(T)
+
\overline A_s^\rho\,\tau_{\mathrm{sep}}
+
\overline A_{s,\mathrm{geom}}^\rho\,(T-\tau_{\mathrm{sep}})
$$
for
$$
T\in[\tau_{\mathrm{sep}},\tau]
$$

Now assume the Goldilocks condition holds on $[0,\tau]$, so that
$$
f(\tau)<0
$$
If $V$ remained strictly positive on the whole interval $[0,\tau]$, then evaluating the previous bound at $T=\tau$ would give
$$
0<V(\tau)\le f(\tau)<0
$$
which is impossible. Therefore the set
$$
\{T\in[0,\tau]:V(T)=0\}
$$
is nonempty. Define
$$
\tau_{\mathrm{turn}}
\equiv
\inf\{T\in[0,\tau]:V(T)=0\}
$$
Continuity of $V$ implies
$$
V(\tau_{\mathrm{turn}})=0
$$
so the outward radial speed vanishes by time $\tau$. This is the desired recapture statement.

The class-uniform version is the same argument with the conservative substitutions
$$
V_0\mapsto V_{\max},
\qquad
\beta_p\mapsto \beta_{p,\max},
\qquad
\sigma\mapsto \sigma_{\min}
$$
and the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast)
$$
which is precisely the form used in the explicit short-window proposition below.

Using monotonicity of the arctangent integrand gives a simpler algebraic lower bound:
$$
\Delta V_p(\tau)
\ge
\frac{\kappa\epsilon^2\,\tau}{
\epsilon_c^2+\left(\beta_p\tau+B_\tau\right)^2
}
$$
Hence a cleaner sufficient recapture condition is
$$
V_0<
\tau
\left[
\frac{\kappa\epsilon^2}{
\epsilon_c^2+\left(\beta_p\tau+B_\tau\right)^2
}
-
\overline A_s^\rho
\right]
$$

Equivalently,
$$
\kappa\epsilon^2
>
\left(
\frac{V_0}{\tau}
+
\overline A_s^\rho
\right)
\left[
\epsilon_c^2+\left(\beta_p\tau+B_\tau\right)^2
\right]
$$

This is the most useful practical form of (H5) in the manuscript: once the constants in Lemma 2 and Lemma 3 are fixed, recapture reduces to a checkable algebraic inequality.

For a fixed admissible crossing subclass, the same inequality is made class-uniform by replacing
$$
V_0\mapsto V_{\max},
\qquad
\beta_p\mapsto \beta_{p,\max}
$$
and taking the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast)
$$
That replacement is exactly what the proposition below implements.

One can simplify further on a short window where the shell-error term is dominated by the linear partner term. If
$$
B_\tau\le \beta_p\tau
$$
then
$$
\Delta V_p(\tau)
\ge
\frac{\kappa\epsilon^2\,\tau}{
\epsilon_c^2+4\beta_p^2\tau^2
}
$$
and therefore a sufficient short-window recapture condition is
$$
V_0<
\tau
\left[
\frac{\kappa\epsilon^2}{
\epsilon_c^2+4\beta_p^2\tau^2
}
-
\overline A_s^\rho
\right]
$$

Since
$$
B_\tau=c_f C_p(\tau^2+\eta)
$$
the dominance condition $B_\tau\le \beta_p\tau$ is itself a quadratic inequality in $\tau$. A nonempty admissible interval exists whenever
$$
\eta\le \frac{\beta_p^2}{4c_f^2 C_p^2}
$$
provided the corresponding roots lie inside the local validity window of Lemmas 1-3.

For class-uniform use on $\mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}$, the corresponding sufficient condition is obtained conservatively by replacing
$$
\beta_p\mapsto \beta_{p,\min}
$$
since the linear partner term must dominate uniformly for every admissible history. The explicit proposition below avoids mixing $\beta_{p,\min}$ and $\beta_{p,\max}$ in a single window estimate by choosing $\tau_\epsilon$ directly from $\beta_{p,\max}$ and then bounding
$$
\beta_p\tau_\epsilon+B_{\tau_\epsilon}
$$
in one step.

> **Proposition (Explicit short-window recapture regime).**
> On a fixed admissible crossing subclass $\mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}$, choose the class-uniform window
> $$
> \tau_\epsilon\equiv \frac{\epsilon_c}{2\beta_{p,\max}}.
> $$
> Assume
> $$
> \tau_\epsilon\le \tau_1,
> \qquad
> \eta\le \frac{\epsilon_c}{4c_f C_p},
> \qquad
> \epsilon_c\le \frac{\beta_{p,\max}^2}{c_f C_p}.
> $$
> Then
> $$
> B_{\tau_\epsilon}
> =
> c_f C_p\left(\tau_\epsilon^2+\eta\right)
> \le
> \frac{\epsilon_c}{2}
> $$
> and since
> $$
> \beta_p\tau_\epsilon+B_{\tau_\epsilon}
> \le
> \beta_{p,\max}\tau_\epsilon+\frac{\epsilon_c}{2}
> =
> \epsilon_c,
> $$
> one obtains
> $$
> \Delta V_p(\tau_\epsilon)
> \ge
> \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}.
> $$
> Therefore a class-uniform sufficient recapture condition is
> $$
> V_{\max}<
> \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
> -
> \frac{\overline A_s^\rho\,\epsilon_c}{2\beta_{p,\max}},
> $$
> or equivalently
> $$
> \kappa\epsilon^2
> \mathrel{>}
> 4\beta_{p,\max}V_{\max}\,\epsilon_c
> +
> 2\overline A_s^\rho\,\epsilon_c^2.
> $$
> If, in addition,
> $$
> \tau_{\mathrm{sep},\max}\le \tau_\epsilon\le \tau_\rho,
> \qquad
> \tau_{\mathrm{sep},\max}\equiv \frac{2\eta}{\sigma_{\min}},
> $$
> then Lemma 2 yields the delayed-window refinement
> $$
> V_{\max}<
> \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
> -
> \overline A_s^\rho\,\tau_{\mathrm{sep},\max}
> -
> \overline A_{s,\mathrm{geom}}^\rho\,(\tau_\epsilon-\tau_{\mathrm{sep},\max}).
> $$

This proposition is the first genuinely explicit realization of (H5) in the note. It converts the abstract impulse inequality into a concrete dual-mollified parameter regime.

Proof sketch:

1. Lemma 1 gives the class-uniform post-crossing monotonicity
   $$
   w(T)<0
   \qquad
   \text{for }0<T\le \tau_1
   $$
2. Lemma 2 supplies the full-window self-drive bound
   $$
   A_s^\rho(T)\le \overline A_s^\rho
   \qquad
   \text{for }0\le T\le \tau_1
   $$
   with the delayed-window refinement available once
   $$
   \tau_{\mathrm{sep},\max}\le T\le \tau_\rho
   $$
3. Lemma 3 gives the class-uniform partner lower bound with
   $$
   \beta_p\le \beta_{p,\max},
   \qquad
   B_\tau\le c_f C_p(\tau^2+\eta)
   $$
   At
   $$
   \tau_\epsilon=\frac{\epsilon_c}{2\beta_{p,\max}}
   $$
   the stated assumptions force
   $$
   \beta_p\tau_\epsilon+B_{\tau_\epsilon}\le \epsilon_c
   $$
   so the denominator of the partner integrand is bounded above by
   $$
   \epsilon_c^2+\epsilon_c^2=2\epsilon_c^2
   $$
   The rectangle-area lower bound therefore gives
   $$
   \Delta V_p(\tau_\epsilon)\ge \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
   $$
4. The stated algebraic inequality is exactly the condition that this class-uniform inward partner impulse beats the class-uniform outward self-drive loss by time $\tau_\epsilon$.
5. Lemma 4 then gives a zero of the radial speed on $[0,\tau_\epsilon]$, proving local post-crossing recapture for every history in the subclass.

The rectangle-area estimate in Step 3 is deliberately conservative. A sharper certificate should keep the exact arctangent impulse from Lemma 4, or certify a Cauchy-Schwarz lower bound on the partner integrand over the same short window. Record this improvement by a factor
$$
Q_{\mathrm{CS}}\ge 1
$$
in
$$
\Delta V_p(\tau_\epsilon)
\ge
Q_{\mathrm{CS}}\,
\frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
$$
In the standard half-core window the target refinement is
$$
Q_{\mathrm{CS}}=\sqrt{2}
$$
provided the interval certificate proves the required monotone coverage of the partner-distance strip. The later corridor arithmetic should use the certified value of
$$
Q_{\mathrm{CS}}
$$
not assume the improvement without an interval report.

In the joint short-window regime
$$
\eta=\mathcal{O}(\epsilon_c),
\qquad
\epsilon_c\downarrow 0
$$
the right-hand side is
$$
\mathcal{O}(\epsilon_c)
$$
so any fixed positive coupling scale $\kappa\epsilon^2$ eventually dominates it. Subject to the local validity constraints from Lemmas 1-3, this exhibits a nonempty dual-mollified parameter regime in which local post-crossing recapture follows directly from the explicit inequality.

### Local takeaway

The local bottleneck is exactly Lemma 4 together with (H5). Lemmas 1 and 2 lock down the sorting-map geometry and the bounded self drive; Lemma 3 extracts the partner lower bound; Lemma 4 converts those two ingredients into a recapture condition by integrating the net radial impulse.

Operationally, the local theorem reduces the first post-crossing turn to one explicit race: the regularized partner impulse must beat the bounded self-drive loss on a nonempty initial window. Proposition `Explicit short-window recapture regime` is the concrete form used later in the manuscript, and its strict margin is precisely the inner-cycle quantity
$$
\mathfrak M_{\mathrm{in}}>0
$$
that enters the global invariant-envelope theorem.

## Global Existence via Arzela-Ascoli

The local origin-crossing theorem supplies only the inner turnaround. The global capstone is an isolated fixed point of the full return map
$$
P_\eta:\Sigma^-_{X_\ast,\eta}\to\Sigma^-_{X_\ast,\eta}
$$
In the dual-mollified setting the final topological target is therefore to construct a nonempty closed convex tame envelope
$$
\mathcal{K}_{X_\ast,\eta}\subset C^1([-h,0])
$$
not a continuous family of equal-amplitude cycles. Exact energy for the dual-mollified problem remains conditional on action-level regularization, so the fixed-point route should be built from uniform bounds, continuity, and compactness rather than from a presumed conserved history functional.

The global input list is now fixed:

1. a nonempty tame inbound class propagated from the affine seed history;
2. collapse-to-crossing control and the local origin-crossing recapture theorem;
3. outer-turn and return-to-section control;
4. a convex section envelope
   $$
   \mathcal{C}_{X_\ast,\eta}
   $$
   and a closed convex tame sub-envelope
   $$
   \mathcal{K}_{X_\ast,\eta}\subseteq \mathcal{C}_{X_\ast,\eta}
   $$
5. continuity and precompactness of
   $$
   P_\eta
   $$
   on
   $$
   \mathcal{K}_{X_\ast,\eta}
   $$
6. and the self-map property
   $$
   P_\eta\!\big(\mathcal{K}_{X_\ast,\eta}\big)\subseteq \mathcal{K}_{X_\ast,\eta}
   $$

Only after those inputs live on the same domain does Schauder apply.

### Status of the global capstone ingredients

The theorem status of the global program should be read in three layers.

- The local and regional geometry is already organized into serious theorem packages: branch control, caustic transit, inner recapture, outer-turn recapture, and return-to-section.
- The compactness mechanism is conceptually standard once one has class-uniform bounds on one closed domain: this is the Arzela-Ascoli side of the argument.
- The active unresolved burden is domain production: the manuscript still has to place nonempty tame propagation, closed convexity, continuity, precompactness, and the self-map property on one and the same set
  $$
  \mathcal{K}_{X_\ast,\eta}
  $$

So the true blocker is not the abstract fixed-point theorem. It is the production of one legitimate tame self-map domain carrying all of the hypotheses at once.

### Convex section envelope

The visible Banach-space constraints should be separated from the delayed-root constraints. Fix constants
$$
X_\ast\in(0,X_{\max}),
\qquad
U_{\max}>0,
\qquad
A_{\max}>0,
\qquad
h\ge \frac{2X_{\max}}{c_f}
$$
and define
$$
\mathcal{C}_{X_\ast,\eta}
\subset
\Sigma^-_{X_\ast,\eta}
$$
to be the set of histories $\phi\in C^1([-h,0])$ such that:

- section anchoring:
  $$
  \phi(0)=X_\ast
  $$
- inbound sign at the section:
  $$
  \dot\phi(0)\le 0
  $$
- position envelope:
  $$
  -X_{\max}\le \phi(\theta)\le X_{\max}
  \qquad
  \text{for }\theta\in[-h,0]
  $$
- speed envelope:
  $$
  |\dot\phi(\theta)|\le U_{\max}
  \qquad
  \text{for }\theta\in[-h,0]
  $$
- Lipschitz-velocity envelope:
  $$
  |\dot\phi(\theta_1)-\dot\phi(\theta_2)|
  \le
  A_{\max}|\theta_1-\theta_2|
  \qquad
  \text{for }\theta_1,\theta_2\in[-h,0]
  $$

This set is closed and convex in the $C^1$ topology. The horizon condition is handled externally: if
$$
|\phi(\theta)|\le X_{\max}
$$
on the stored interval, then every partner or self chord is at most
$$
2X_{\max}
$$
so
$$
\tau_{\max}(\phi)\le \frac{2X_{\max}}{c_f}\le h
$$
The point is to keep only affine and supremum-type constraints inside
$$
\mathcal{C}_{X_\ast,\eta}
$$
while postponing nonlocal tame delayed-root conditions to a sub-envelope.
The envelope is intentionally written in the signed coordinate
$$
X\in[-X_{\max},X_{\max}]
$$
rather than in a one-sided radial coordinate. A genuine origin-crossing cycle may store data from both sign sheets inside
$$
[-h,0]
$$
so a one-sided condition
$$
0\le \phi\le X_{\max}
$$
would exclude valid histories whenever the memory window crosses the origin. Branch labels, exterior sheets, and origin-crossing status belong to the finite tame certificate, not to the convex Banach envelope.
Those delayed-root conditions are not visibly convex inside
$$
\mathcal{C}_{X_\ast,\eta}
$$
so the next proposition is a genuine packaging target rather than an automatic consequence of intersecting
$$
\mathcal{C}_{X_\ast,\eta}
$$
with the naive tame subclass.

> **Target Proposition (Closed Convex Tame Envelope).**
> The remaining topological task is to exhibit a nonempty closed convex set
> $$
> \mathcal{K}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}_{X_\ast,\eta}
> $$
> such that:
> 1. the propagated nonempty tame class lies inside
>    $$
>    \mathcal{K}_{X_\ast,\eta};
>    $$
> 2. the return map
>    $$
>    P_\eta
>    $$
>    is well defined on
>    $$
>    \mathcal{K}_{X_\ast,\eta};
>    $$
> 3. the delayed-root persistence and Jacobian bounds defining tameness remain valid on that domain;
> 4. and the tame constraints are closed under limits in the
>    $$
>    C^1
>    $$
>    topology on that domain.

This is the exact topological object needed by the final fixed-point theorem. The role of
$$
\mathcal{C}_{X_\ast,\eta}
$$
is to carry the convex bounds; the role of
$$
\mathcal{K}_{X_\ast,\eta}
$$
is to put the same convex bounds and the tame delayed geometry on one matching domain. In particular, this target does not assert that Jacobian lower bounds or branch-count restrictions are convex by inspection. It isolates the additional burden of producing a closed convex subset on which those tame conditions persist. The self-map property is a separate dynamical burden supplied later by invariant-envelope closure.

The clean way to discharge that burden is not to put the nonconvex delayed-root labels directly into the definition of
$$
\mathcal{K}_{X_\ast,\eta}
$$
Instead, one should produce a finite tame certificate: a finite family of continuous affine functionals
$$
\ell_\alpha:C^1([-h,0])\to\mathbb{R},
\qquad
\alpha\in\mathcal{I}_{\mathrm{cert}}
$$
and constants
$$
b_\alpha
$$
such that the closed affine tube
$$
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
\equiv
\left\{
\phi\in\mathcal{C}_{X_\ast,\eta}
\;\middle|\;
\ell_\alpha(\phi)\le b_\alpha
\text{ for every }\alpha\in\mathcal{I}_{\mathrm{cert}}
\right\}
$$
implies the desired finite branch chart, Jacobian floors, root-count ceilings, and memory-depth bounds.

> **Proposition (Finite certificate construction of a closed convex tame envelope).**
> Suppose there exists a finite tame certificate
> $$
> \{\ell_\alpha\le b_\alpha\}_{\alpha\in\mathcal{I}_{\mathrm{cert}}}
> $$
> with the following properties:
>
> 1. one seed-propagated history
>    $$
>    \phi_{\mathrm{seed,cyc}}\in\mathcal{C}_{X_\ast,\eta}
>    $$
>    satisfies all certificate inequalities with strict slack;
> 2. every
>    $$
>    \phi\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
>    $$
>    has the same finite active branch chart on the stored interval and on the controlled one-cycle continuation;
>    this chart includes the signed exterior sheet labels and origin-crossing layer labels needed to interpret the signed
>    $$
>    X
>    $$
>    history;
> 3. on that chart the delayed roots remain simple with uniform Jacobian floor
>    $$
>    |J|\ge \nu_{\mathrm{cert}}>0;
>    $$
> 4. the active branch count, memory depth, position, speed, and Lipschitz-velocity bounds are bounded by the constants used in
>    $$
>    \mathcal{C}_{X_\ast,\eta};
>    $$
> 5. and these certificate implications are closed under
>    $$
>    C^1
>    $$
>    limits inside
>    $$
>    \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}.
>    $$
>
> Then
> $$
> \mathcal{K}_{X_\ast,\eta}
> \equiv
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> is a nonempty closed convex tame envelope.

Proof.
The set
$$
\mathcal{C}_{X_\ast,\eta}
$$
is closed and convex by its affine section condition, interval bounds, speed bounds, and Lipschitz-velocity bound. Each certificate condition
$$
\ell_\alpha(\phi)\le b_\alpha
$$
is a closed half-space in
$$
C^1([-h,0])
$$
so the finite intersection
$$
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
is closed and convex. It is nonempty because
$$
\phi_{\mathrm{seed,cyc}}
$$
lies in it with strict slack. Items 2-4 give the finite branch chart, Jacobian floors, branch-count ceilings, memory-depth bounds, and Banach-envelope bounds required for tameness. Item 5 says exactly that these tame properties persist under
$$
C^1
$$
limits inside the certified set. Hence
$$
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
is the required nonempty closed convex tame envelope.

The finite-certificate language can be made concrete by using a sampled
$$
C^1
$$
tube around one strictly controlled seed-cycle history. This avoids treating the nonlinear branch-chart conditions themselves as convex constraints.

For completion, the center history cannot remain schematic. The proof needs an instantiated
$$
\phi_{\mathrm{cyc}}
$$
with a period
$$
T_{\mathrm{cyc}}
$$
a finite active branch list
$$
\mathcal{B}_{\mathrm{act}}
$$
inactive branch complements, a mesh
$$
\{\theta_j\}_{j=0}^{N}
$$
and returned-sample residuals. Until that data packet exists, every finite-certificate statement below is conditional.

> **Proposition (Sampled seed-cycle tube gives a finite tame certificate).**
> Let
> $$
> \phi_{\mathrm{cyc}}\in\mathcal{C}_{X_\ast,\eta}
> $$
> be a seed-propagated history whose one-cycle continuation is defined on
> $$
> [0,T_{\max}]
> $$
> and has strict margins:
> 1. every active delayed root on the stored interval and on the controlled continuation is simple with
>    $$
>    |J|\ge 2\nu_{\mathrm{chart}}>0;
>    $$
> 2. every inactive candidate root equation has gap at least
>    $$
>    2\gamma_{\mathrm{gap}}>0
>    $$
>    on the compact chart complement;
> 3. all memory depths stay at distance at least
>    $$
>    2\gamma_h>0
>    $$
>    from the boundary of the stored horizon;
> 4. the position, speed, and Lipschitz-velocity envelope bounds hold with strict slack.
>
> Assume also that the dual-mollified solution map is continuous from initial
> $$
> C^1([-h,0])
> $$
> data into
> $$
> C^1([-h,T_{\max}])
> $$
> on the corresponding branch chart. Then there are a radius
> $$
> r_{\mathrm{cert}}>0,
> $$
> a finite mesh
> $$
> -h=\theta_0<\theta_1<\cdots<\theta_N=0,
> $$
> and finitely many affine sample inequalities
> $$
> |\phi(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)|\le \frac{r_{\mathrm{cert}}}{4},
> \qquad
> |\dot\phi(\theta_j)-\dot\phi_{\mathrm{cyc}}(\theta_j)|
> \le \frac{r_{\mathrm{cert}}}{4},
> \qquad
> 0\le j\le N,
> $$
> such that every
> $$
> \phi\in\mathcal{C}_{X_\ast,\eta}
> $$
> satisfying those finite inequalities lies in a
> $$
> C^1
> $$
> neighborhood on which the same active branch chart, Jacobian floor, root-count ceiling, and memory-depth bound persist through the controlled continuation. Consequently these sample inequalities form a finite tame certificate of the kind used in the previous proposition.

Proof.
By the strict branch-chart margins and compactness of the stored and controlled continuation intervals, there is a radius
$$
r_{\mathrm{chart}}>0
$$
such that any history whose controlled continuation stays within
$$
r_{\mathrm{chart}}
$$
of the seed-cycle continuation in
$$
C^1
$$
has the same active roots, no inactive root births, Jacobian floor at least
$$
\nu_{\mathrm{chart}}
$$
and the same memory-depth bound. The strict envelope slack gives a second radius
$$
r_{\mathrm{env}}>0
$$
for the position, speed, and Lipschitz-velocity constraints. By continuous dependence of the branch-chart solution map, shrink to
$$
r_{\mathrm{cert}}
\le
\min\{r_{\mathrm{chart}},r_{\mathrm{env}}\}
$$
so that initial
$$
C^1
$$
distance at most
$$
r_{\mathrm{cert}}
$$
from
$$
\phi_{\mathrm{cyc}}
$$
keeps the full controlled continuation inside the required chart tube.

Choose the mesh with maximum step
$$
\Delta
$$
small enough that
$$
2U_{\max}\Delta\le \frac{r_{\mathrm{cert}}}{2},
\qquad
2A_{\max}\Delta\le \frac{r_{\mathrm{cert}}}{2}
$$
If the displayed sample inequalities hold, then for any
$$
\theta\in[-h,0]
$$
and a nearest mesh point
$$
\theta_j
$$
one has
$$
|\phi(\theta)-\phi_{\mathrm{cyc}}(\theta)|
\le
|\phi(\theta)-\phi(\theta_j)|
+|\phi(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)|
+|\phi_{\mathrm{cyc}}(\theta_j)-\phi_{\mathrm{cyc}}(\theta)|
\le
r_{\mathrm{cert}}
$$
and the same estimate with the Lipschitz-velocity bound gives
$$
|\dot\phi(\theta)-\dot\phi_{\mathrm{cyc}}(\theta)|
\le
r_{\mathrm{cert}}
$$
Thus the finite sample tube implies the required
$$
C^1
$$
tube. Each absolute-value sample condition is just two continuous affine inequalities in
$$
C^1([-h,0])
$$
The previous proposition then turns their finite intersection with
$$
\mathcal{C}_{X_\ast,\eta}
$$
into a closed convex tame envelope.

For the first remaining blocker, the seed-cycle certificate should therefore be audited by the following finite margin ledger:
$$
\nu_{\mathrm{seed}}
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{act}}}
\inf_{T\in I_\beta}|J_\beta(T)|
$$
$$
\gamma_{\mathrm{gap}}
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{inact}}}
\inf_{(T,\theta)\in Q_\beta}
|F_\beta(T,\theta)|
$$
$$
\gamma_h
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{act}}}
\inf_{T\in I_\beta}
\operatorname{dist}\big(\theta_\beta(T),\{-h,0\}\big)
$$
together with the envelope slack
$$
\gamma_{\mathrm{env}}
\equiv
\min\left\{
X_{\max}-\sup|\phi_{\mathrm{cyc}}|,
\;
U_{\max}-\sup|\dot\phi_{\mathrm{cyc}}|,
\;
A_{\max}-\operatorname{Lip}(\dot\phi_{\mathrm{cyc}})
\right\}
$$
Here
$$
F_\beta(T,\theta)=0
$$
denotes the delayed-root equation for branch candidate
$$
\beta
$$
the sets
$$
I_\beta
$$
are the compact active branch intervals, and
$$
Q_\beta
$$
is the compact inactive chart complement after deleting small neighborhoods of the active roots. Positivity of
$$
\nu_{\mathrm{seed}},
\qquad
\gamma_{\mathrm{gap}},
\qquad
\gamma_h,
\qquad
\gamma_{\mathrm{env}}
$$
is exactly the strict seed-cycle tube condition needed to choose
$$
r_{\mathrm{cert}}
$$

> **Proposition (Quantitative seed-cycle radius choice).**
> Assume the seed-cycle margin ledger satisfies
> $$
> \nu_{\mathrm{seed}}>0,
> \qquad
> \gamma_{\mathrm{gap}}>0,
> \qquad
> \gamma_h>0,
> \qquad
> \gamma_{\mathrm{env}}>0.
> $$
> Suppose also that on the certified chart there are finite local sensitivity constants
> $$
> L_J,
> \qquad
> L_F,
> \qquad
> L_h,
> \qquad
> L_{\mathrm{env}}
> $$
> such that a
> $$
> C^1
> $$
> perturbation of size
> $$
> r
> $$
> changes active Jacobians by at most
> $$
> L_Jr,
> $$
> inactive root-equation gaps by at most
> $$
> L_Fr,
> $$
> active memory-depth distances by at most
> $$
> L_hr,
> $$
> and the envelope slacks by at most
> $$
> L_{\mathrm{env}}r.
> $$
> Then any radius satisfying
> $$
> 0<r_{\mathrm{cert}}
> <
> \min\left\{
> \frac{\nu_{\mathrm{seed}}}{2L_J},
> \frac{\gamma_{\mathrm{gap}}}{2L_F},
> \frac{\gamma_h}{2L_h},
> \frac{\gamma_{\mathrm{env}}}{2L_{\mathrm{env}}}
> \right\}
> $$
> produces the strict chart margins required by Proposition `Sampled seed-cycle tube gives a finite tame certificate`, after omitting any quotient with zero sensitivity because that margin is then unchanged to first order on the chart.

Proof.
For any history within
$$
r_{\mathrm{cert}}
$$
of
$$
\phi_{\mathrm{cyc}}
$$
in
$$
C^1
$$
the active Jacobian floor is at least
$$
\nu_{\mathrm{seed}}-L_Jr_{\mathrm{cert}}
>
\frac{\nu_{\mathrm{seed}}}{2}>0
$$
The inactive root-equation gap remains at least
$$
\gamma_{\mathrm{gap}}-L_Fr_{\mathrm{cert}}
>
\frac{\gamma_{\mathrm{gap}}}{2}>0
$$
so no inactive branch is born. The active memory-depth distance remains at least
$$
\gamma_h-L_hr_{\mathrm{cert}}
>
\frac{\gamma_h}{2}>0
$$
so no active root reaches the stored-horizon boundary. Finally, the envelope slack remains at least
$$
\gamma_{\mathrm{env}}-L_{\mathrm{env}}r_{\mathrm{cert}}
>
\frac{\gamma_{\mathrm{env}}}{2}>0
$$
These four strict inequalities are precisely the branch-chart, gap, memory-depth, and envelope margins required for the sampled finite certificate.

### Precompactness of returned histories

> **Proposition (Precompactness of the Return Image).**
> Fix a dual-mollified inbound class
> $$
> \mathcal{A}_{X_\ast,\eta}
> \subset
> \Sigma^-_{X_\ast,\eta}
> $$
> such that:
> 1. for every
>    $$
>    \psi\in\mathcal{A}_{X_\ast,\eta},
>    $$
>    the one-cycle return time
>    $$
>    T(\psi)
>    $$
>    is well defined and lies in
>    $$
>    [T_{\min},T_{\max}];
>    $$
> 2. every returned history
>    $$
>    \phi=P_\eta(\psi)
>    $$
>    satisfies the bounds
>    $$
>    -X_{\max}\le \phi(\theta)\le X_{\max},
>    \qquad
>    |\dot\phi(\theta)|\le U_{\max},
>    \qquad
>    |\dot\phi(\theta_1)-\dot\phi(\theta_2)|
>    \le
>    A_{\max}|\theta_1-\theta_2|,
>    \qquad
>    \theta,\theta_1,\theta_2\in[-h,0],
>    $$
>    together with
>    $$
>    \tau_{\max}(\phi)\le h.
>    $$
>
> Then
> $$
> P_\eta\!\big(\mathcal{A}_{X_\ast,\eta}\big)
> $$
> is precompact in
> $$
> C^1([-h,0]).
> $$

Proof.
Take any sequence
$$
\phi_n=P_\eta(\psi_n),
\qquad
\psi_n\in\mathcal{A}_{X_\ast,\eta}
$$
The returned-history bounds give uniform boundedness in
$$
C^0([-h,0])
$$
and the speed bound gives
$$
|\phi_n(\theta_1)-\phi_n(\theta_2)|
\le
U_{\max}|\theta_1-\theta_2|
$$
so
$$
\{\phi_n\}
$$
is equicontinuous. The Lipschitz-velocity bound gives
$$
|\dot\phi_n(\theta_1)-\dot\phi_n(\theta_2)|
\le
A_{\max}|\theta_1-\theta_2|
$$
so
$$
\{\dot\phi_n\}
$$
is uniformly bounded and equicontinuous.

Arzela-Ascoli therefore yields a subsequence, still denoted
$$
\phi_n
$$
such that
$$
\phi_n\to \phi_\ast
\qquad
\text{and}
\qquad
\dot\phi_n\to v_\ast
$$
uniformly on
$$
[-h,0]
$$
Since
$$
\phi_n(\theta)-\phi_n(0)=\int_0^\theta \dot\phi_n(\sigma)\,d\sigma
$$
passing to the limit gives
$$
\phi_\ast(\theta)-\phi_\ast(0)=\int_0^\theta v_\ast(\sigma)\,d\sigma
$$
Hence
$$
\phi_\ast\in C^1([-h,0])
\qquad
\text{and}
\qquad
\dot\phi_\ast=v_\ast
$$
so the subsequence converges in the
$$
C^1
$$
norm. Therefore
$$
P_\eta\!\big(\mathcal{A}_{X_\ast,\eta}\big)
$$
is precompact in
$$
C^1([-h,0])
$$

This proposition deliberately stops short of invariance. Its role is only to show that once the return map is defined on a uniformly controlled class, its image cannot spread out arbitrarily in history space.

### Certified branch-chart well-posedness

The continuity row used later should be a theorem on certified branch charts, not an informal regularity assumption. The following proposition is the local analytic input needed by the return-map proof.

> **Proposition (Local well-posedness on a certified branch chart).**
> Fix dual-mollified parameters
> $$
> \eta>0,
> \qquad
> \epsilon_c>0,
> $$
> and a memory horizon
> $$
> h>0.
> $$
> Let
> $$
> \mathcal{U}\subset C^1([-h,0])
> $$
> be a certified branch-chart neighborhood with:
> 1. a finite active branch list
>    $$
>    \mathcal{B}_{\mathrm{act}};
>    $$
> 2. signed sheet and crossing-layer labels fixed on the chart;
> 3. if a chart interval meets an origin-crossing layer, the vector field there is evaluated by Lemma `Origin-layer continuity of the dual-mollified 1D field`, not by an exterior branch-sum formula;
> 4. active causal roots satisfying
>    $$
>    |J_\beta|\ge \nu>0
>    \qquad
>    \text{for every }\beta\in\mathcal{B}_{\mathrm{act}};
>    $$
> 5. uniform bounds
>    $$
>    \|\phi\|_{C^1}\le M,
>    \qquad
>    \operatorname{Lip}(\dot\phi)\le A_{\max},
>    \qquad
>    \tau_\beta(T)\in[0,h-\gamma_h]
>    $$
>    for some
>    $$
>    \gamma_h>0;
>    $$
> 6. and inactive branch gaps bounded away from zero on the chart complement.
>
> Then there exists
> $$
> \tau_{\mathrm{wp}}>0
> $$
> such that every
> $$
> \phi\in\mathcal{U}
> $$
> has a unique dual-mollified forward continuation on
> $$
> [0,\tau_{\mathrm{wp}}],
> $$
> and the solution map
> $$
> \phi
> \longmapsto
> X_\phi|_{[-h,\tau_{\mathrm{wp}}]}
> $$
> is locally Lipschitz from
> $$
> C^1([-h,0])
> $$
> into
> $$
> C^1([-h,\tau_{\mathrm{wp}}]).
> $$

Proof.
On exterior certified charts the active root functions persist with
$$
|J|\ge\nu
$$
so the implicit-function theorem makes each root time locally Lipschitz in the receiver time and in the stored history. The inactive gap prevents any additional root from entering the finite chart on the controlled interval. The dual-mollified kernel is smooth on the shell scale
$$
\eta
$$
and is uniformly bounded on the core scale
$$
\epsilon_c>0
$$
with denominator at least
$$
\epsilon_c^2
$$
On an origin-crossing chart, the previous origin-layer lemma supplies the same local
$$
C^1
$$
radial vector-field control after the sheet projection, so the signed scalar branch-sum discontinuity is not part of the local well-posedness argument.
Together with the finite branch count and the fixed horizon
$$
h
$$
these bounds make the branch-chart vector field locally Lipschitz as a map from the stored
$$
C^1
$$
history segment to acceleration. The integral equation
$$
X(T)=\phi(0)+T\dot\phi(0)+\int_0^T(T-S)\,F_\eta(X_S)\,dS
$$
then gives local existence and uniqueness by the standard contraction argument on a short
$$
C^1
$$
tube. Applying the same Lipschitz estimate to two solutions and using Gronwall on the controlled interval gives local Lipschitz dependence of
$$
X
$$
and
$$
\frac{dX}{dT}
$$
on the initial history.

### Certified fold-event atlas

The continuity theorem must distinguish uncontrolled branch changes from certified separator events. A full origin-crossing cycle may pass through field-speed folds, so the certificate should not require a single unchanged branch list on the whole cycle.

> **Definition (Certified fold-event atlas).**
> A certified fold-event atlas for one return consists of finitely many fold layers
> $$
> \mathfrak{F}_1,\ldots,\mathfrak{F}_{N_{\mathrm{fold}}}
> $$
> together with:
> 1. incoming and outgoing active branch lists
>    $$
>    \mathcal{B}_{k}^{-},
>    \qquad
>    \mathcal{B}_{k}^{+};
>    $$
> 2. a local fold normal form
>    $$
>    g_k(T,S;\lambda)
>    =
>    a_k(S-s_k)^2+b_k\lambda+\mathrm{higher\ order},
>    \qquad
>    a_kb_k\ne 0;
>    $$
> 3. parity data
>    $$
>    \Delta N_k=\pm2,
>    \qquad
>    \Delta D_k=0;
>    $$
> 4. a finite fold-impulse ceiling and an outgoing chart on which the post-fold roots again have a positive Jacobian floor;
> 5. a **nondegeneracy certificate** $a_k\ne0$ excluding a cusp or a coalescence of several folds at $s_k$;
> 6. a **strict-interior memory certificate** $\max_\ell\,(T-T_{\mathrm{em},\ell})\le h-\gamma_h$ with $\gamma_h>0$, on both the incoming and the outgoing chart.
>
> Outside the union of the fold layers, the active roots must remain simple with the certified Jacobian floors and inactive-root gaps.

Rows 5 and 6 are the two loopholes the earlier atlas left open. Writing the parity data as $\Delta N_k\in2\mathbb{Z}$ rather than $\Delta N_k=\pm2$ is weaker than Proposition 3 of [Master Equation](../dynamics/master-equation.md), and would admit a cusp, or two coalescing folds, as a single "even" event. Cusps and higher strata $\Sigma^{1,1}$ are not certified by the generic fold law and must route to a separate singular-stratum chart, which this atlas does not supply; the nondegeneracy certificate excludes them instead.

Row 6 closes the second gap. By Proposition 4 of the same chapter, an active generator can also leave the retained window $[T-h,T)$ when its required delay crosses the memory depth. That is a boundary-exit event, not a fold: it carries an odd unsigned jump and can change the finite-window signed degree $D^{(h)}$. No parity-preserving fold chart covers it. The atlas is therefore complete only on charts where every active delay is strictly interior with a declared margin $\gamma_h$; without that certificate the fold layers do not exhaust the branch transitions and the continuity claim below is not available.

This reconciles the continuity row with the causal-fold geometry. A source-normal caustic may be a genuine root-pair birth or death, but it is not an uncontrolled discontinuity if the atlas records the parity-preserving transition and hands the trajectory to a certified outgoing chart. A receiver-normal null, by contrast, needs no fold layer at all: the branch strength passes through zero, the root set is unchanged, and the acceleration is continuous. See [Separator Taxonomy](../dynamics/master-equation.md#separator-taxonomy).

### Continuity on the tame envelope

> **Proposition (Continuity of the Return Map on $\mathcal{K}_{X_\ast,\eta}$).**
> Let
> $$
> \mathcal{K}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}_{X_\ast,\eta}
> $$
> be a closed convex tame envelope such that:
> 1. each
>    $$
>    \psi\in\mathcal{K}_{X_\ast,\eta}
>    $$
>    admits a unique forward continuation on
>    $$
>    [0,T_{\max}]
>    $$
>    with class-uniform position, speed, acceleration, Jacobian, and memory-depth bounds;
> 2. on that forward tube, Proposition `Local well-posedness on a certified branch chart` applies on finitely many exterior and origin-layer chart intervals covering the continuation;
> 3. outside a certified fold-event atlas the active delayed roots persist continuously with the history, with no root birth, root collision, or Jacobian loss of transversality; across each certified fold layer, the active branch list undergoes the parity-preserving transition recorded in the atlas;
> 4. the first return to the inbound section is uniformly transverse:
>    $$
>    X(T(\psi);\psi)=X_\ast,
>    \qquad
>    \frac{dX}{dT}(T(\psi);\psi)\le -u_{\mathrm{sec}}<0.
>    $$
>
> Then
> $$
> P_\eta:\mathcal{K}_{X_\ast,\eta}\to C^1([-h,0])
> $$
> is continuous.

Proof.
Take
$$
\psi_n\to \psi
\qquad
\text{in }C^1([-h,0])
$$
The certified branch-chart well-posedness proposition and the class-uniform tube bounds imply
$$
X_n\to X,
\qquad
\frac{dX_n}{dT}\to \frac{dX}{dT}
$$
uniformly on compact intervals in
$$
[0,T_{\max}]
$$
The tame root-persistence hypothesis prevents uncontrolled branch changes and Jacobian loss. The certified fold-event atlas covers the finitely many permitted caustic transitions by integral-law fold layers with fixed incoming and outgoing charts. Given the nondegeneracy and strict-interior memory certificates carried by that atlas, those layers exhaust the branch transitions, and the forward solution map is continuous on the tame envelope. Without them the envelope may contain a cusp or a memory-boundary exit, and continuity is not established there. For the section function
$$
G(T,\psi)\equiv X(T;\psi)-X_\ast
$$
the convergence of
$$
X_n
$$
to
$$
X
$$
is uniform in a fixed neighborhood of
$$
T(\psi)
$$
Uniform transversality gives
$$
G(T(\psi),\psi)=0,
\qquad
\partial_TG(T(\psi),\psi)=\frac{dX}{dT}(T(\psi);\psi)\le -u_{\mathrm{sec}}<0
$$
and therefore
$$
T(\psi_n)\to T(\psi)
$$
Indeed, for small
$$
\delta>0
$$
the values
$$
G(T(\psi)-\delta,\psi)
\qquad
\text{and}
\qquad
G(T(\psi)+\delta,\psi)
$$
have opposite signs, and the same sign separation holds for
$$
G(\cdot,\psi_n)
$$
for all sufficiently large
$$
n
$$
The uniform transversality bound excludes a second nearby return and identifies this zero with
$$
T(\psi_n)
$$
Finally,
$$
P_\eta(\psi_n)(\theta)=X_n(T(\psi_n)+\theta)
$$
so the convergence of trajectories and return times yields
$$
P_\eta(\psi_n)\to P_\eta(\psi)
$$
in
$$
C^1([-h,0])
$$

### Invariant-envelope closure

The goal of this section is to turn many local estimates into one return trap. A single margin can show that one part of the motion bends the right way, but a breather proof needs the whole delayed history to stay in a controlled class for an entire cycle. The invariant envelope is that controlled class: if the three margins stay positive together, the return map has a plausible domain on which fixed-point closure can be attempted.

The cycle estimates now reduce to three explicit margins:

$$
\mathfrak M_{\mathrm{in}}
\equiv
\frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
-
\frac{\overline A_s^\rho\,\epsilon_c}{2\beta_{p,\max}}
-
V_{\max}
$$
coming from Proposition `Explicit short-window recapture regime`, and
$$
\mathfrak M_{\mathrm{ent}}
\equiv
\underline A_p^{\mathrm{out}}
-
\overline A_{s,\mathrm{ent}}^{\mathrm{out}}
$$
coming from Lemma 29, and
$$
\mathfrak M_{\mathrm{out}}
\equiv
\underline A_p^{\mathrm{out}}
-
\frac{\kappa\epsilon^2}{c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
-
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\epsilon_c^2}
$$
coming from the unified trimmed-apocenter outer-turn criterion. The first margin forces the initial post-crossing turnaround, the second supplies the non-circular sub-field-speed apocenter-entry window, and the third forces the final apocenter turn once that window exists.

> **Theorem (Invariant-Envelope Closure from Compatible Explicit Regimes).**
> Fix
> $$
> X_\ast>0
> $$
> and a tame inbound class
> $$
> \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}_{X_\ast,\eta}.
> $$
> Assume:
> 1. the collapse-to-crossing control theorem holds on
>    $$
>    \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
>    $$
>    with crossing-speed upper bound
>    $$
>    V_{\max};
>    $$
> 2. Proposition `Explicit short-window recapture regime` applies at every first crossing issued from this class, so that
>    $$
>    \mathfrak M_{\mathrm{in}}>0;
>    $$
> 3. Lemma 29 applies on the outer-entry interval with
>    $$
>    \mathfrak M_{\mathrm{ent}}
>    \ge
>    a_{\mathrm{ent}}^{\mathrm{out}}>0,
>    $$
>    and with enough interval length to produce either a finite outer turn or a retained strict sub-field-speed window;
> 4. Proposition `Unified trimmed-apocenter outer-turn criterion` applies on the final apocenter window supplied by the entry step, so that
>    $$
>    \mathfrak M_{\mathrm{out}}>0;
>    $$
> 5. the turn-to-section return lemmas give class-uniform section-return bounds
>    $$
>    X_{\mathrm{out},\max},
>    \qquad
>    U_{\mathrm{sec},\max},
>    \qquad
>    A_{\mathrm{cyc},\max},
>    \qquad
>    T_{\mathrm{cyc},\max};
>    $$
> 6. the envelope parameters satisfy
>    $$
>    X_{\max}\ge \max\{X_\ast,X_{\mathrm{out},\max}\},
>    $$
>    $$
>    U_{\max}\ge \max\{V_{\max},V_{\mathrm{ent}}^{\mathrm{out}},U_{\mathrm{sec},\max}\},
>    $$
>    $$
>    A_{\max}\ge A_{\mathrm{cyc},\max},
>    \qquad
>    T_{\max}\ge T_{\mathrm{cyc},\max},
>    \qquad
>    h\ge \frac{2X_{\max}}{c_f};
>    $$
> 7. the returned history preserves the same Jacobian and branch-count bounds used to define tameness.
>
> Then
> $$
> P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}\big)
> \subseteq
> \mathcal{C}_{X_\ast,\eta}.
> $$

Proof.
Collapse-to-crossing control delivers an admissible crossing with speed at most
$$
V_{\max}
$$
The strict inner margin
$$
\mathfrak M_{\mathrm{in}}>0
$$
then gives the first post-crossing turn by Proposition `Explicit short-window recapture regime`. On the return half, the entry margin
$$
\mathfrak M_{\mathrm{ent}}\ge a_{\mathrm{ent}}^{\mathrm{out}}>0
$$
activates Lemma 29. Thus either the outer turn has already occurred, or the trajectory enters a retained strict sub-field-speed apocenter window. In the second case, Proposition `Unified trimmed-apocenter outer-turn criterion` supplies the final apocenter turn because
$$
\mathfrak M_{\mathrm{out}}>0
$$
The return lemmas then give re-entry to
$$
X=X_\ast
$$
with class-uniform position, speed, acceleration, time, and tame delayed-root bounds. The envelope inequalities in item 6 place the entire returned history back inside
$$
\mathcal{C}_{X_\ast,\eta}
$$
This is the dynamical input needed to turn
$$
\mathcal{K}_{X_\ast,\eta}
$$
into a genuine self-map domain for
$$
P_\eta
$$

This theorem should be read narrowly. It records the exact self-map statement obtained once the tame envelope exists and the compatibility inequalities are jointly solvable. It does not by itself close either of those two burdens.

> **Target Proposition (Coupled admissible parameter regime).**
> Fix the geometric and dynamical constants extracted from the cycle estimates:
> $$
> V_{\max},
> \qquad
> V_{\mathrm{ent}}^{\mathrm{out}},
> \qquad
> X_{\mathrm{out},\max},
> \qquad
> U_{\mathrm{sec},\max},
> \qquad
> A_{\mathrm{cyc},\max},
> \qquad
> T_{\mathrm{cyc},\max},
> $$
> together with the local and outer-turn parameters
> $$
> \beta_{p,\max},
> \qquad
> C_p,
> \qquad
> \tau_1,
> \qquad
> \tau_{\mathrm{deep}},
> \qquad
> \tau_{\mathrm{sub}}^{\mathrm{out}},
> \qquad
> a_{\mathrm{ent}}^{\mathrm{out}},
> \qquad
> T_{\mathrm{ent}}^{\mathrm{out}},
> \qquad
> \sigma_{\mathrm{out}},
> \qquad
> \overline A_s^\rho,
> \qquad
> \overline A_{s,\mathrm{ent}}^{\mathrm{out}},
> \qquad
> \underline A_p^{\mathrm{out}}.
> $$
> Assume the dual-mollified parameters
> $$
> (\eta,\epsilon_c)
> $$
> satisfy the explicit inner-window inequalities
> $$
> \tau_\epsilon=\frac{\epsilon_c}{2\beta_{p,\max}}\le \tau_1,
> \qquad
> \eta\le \frac{\epsilon_c}{4c_f C_p},
> \qquad
> \epsilon_c\le \frac{\beta_{p,\max}^2}{c_f C_p},
> $$
> and the strict margin conditions
> $$
> \mathfrak M_{\mathrm{in}}>0,
> \qquad
> \mathfrak M_{\mathrm{ent}}
> =
> \underline A_p^{\mathrm{out}}
> -
> \overline A_{s,\mathrm{ent}}^{\mathrm{out}}
> \ge
> a_{\mathrm{ent}}^{\mathrm{out}}>0,
> \qquad
> \mathfrak M_{\mathrm{out}}>0.
> $$
> Also assume the outer-entry interval budget satisfies
> $$
> T_{\mathrm{ent}}^{\mathrm{out}}
> \ge
> \frac{\big(V_{\mathrm{ent}}^{\mathrm{out}}-(c_f-\sigma_{\mathrm{out}})\big)_+}
> {a_{\mathrm{ent}}^{\mathrm{out}}}
> +
> \tau_{\mathrm{sub}}^{\mathrm{out}}.
> $$
> Then there exist envelope constants
> $$
> X_{\max},
> \qquad
> U_{\max},
> \qquad
> A_{\max},
> \qquad
> T_{\max},
> \qquad
> h
> $$
> satisfying
> $$
> X_{\max}\ge \max\{X_\ast,X_{\mathrm{out},\max}\},
> $$
> $$
> U_{\max}\ge \max\{V_{\max},V_{\mathrm{ent}}^{\mathrm{out}},U_{\mathrm{sec},\max}\},
> $$
> $$
> A_{\max}\ge A_{\mathrm{cyc},\max},
> \qquad
> T_{\max}\ge T_{\mathrm{cyc},\max},
> \qquad
> h\ge \frac{2X_{\max}}{c_f}.
> $$
> The remaining compatibility task is to solve these inequalities simultaneously. In particular, the manuscript must not treat the strict local margins
> $$
> \mathfrak M_{\mathrm{in}}>0,
> \qquad
> \mathfrak M_{\mathrm{ent}}\ge a_{\mathrm{ent}}^{\mathrm{out}}>0,
> \qquad
> \mathfrak M_{\mathrm{out}}>0
> $$
> as algebraically independent of the envelope constants. The crossing-speed bound
> $$
> V_{\max}
> $$
> enters
> $$
> U_{\max}\ge \max\{V_{\max},V_{\mathrm{ent}}^{\mathrm{out}},U_{\mathrm{sec},\max}\},
> $$
> while the collapse estimates producing
> $$
> V_{\max}
> $$
> may themselves depend on the partner acceleration floor and hence on the global position scale
> $$
> X_{\max}.
> $$
> Likewise, the coarse entry ceiling
> $$
> \overline A_{s,\mathrm{ent}}^{\mathrm{out}}
> $$
> and the entry speed ceiling
> $$
> V_{\mathrm{ent}}^{\mathrm{out}}
> $$
> are envelope-level quantities: they depend on the same branch-count, fold-ceiling, deep-past, speed, and position bounds that define the controlled cycle.
> A valid nonemptiness proof must therefore close a coupled algebraic system in
> $$
> (\eta,\epsilon_c,X_{\max},U_{\max},A_{\max},T_{\max},h,
> V_{\mathrm{ent}}^{\mathrm{out}},
> a_{\mathrm{ent}}^{\mathrm{out}},
> T_{\mathrm{ent}}^{\mathrm{out}},
> \overline A_{s,\mathrm{ent}}^{\mathrm{out}}),
> $$
> rather than verify the local margins first and choose the envelope constants afterward with arbitrary slack.

This target isolates the remaining algebraic compatibility issue. Once collapse-to-crossing bounds, the inner recapture margin, the outer-turn margin, and the envelope bookkeeping constants are packaged on one coupled regime, invariant-envelope closure becomes an actual self-map statement. Until then, simultaneous solvability of the displayed inequalities remains part of the scaffold rather than a completed proposition.

For later proof checking, the finite strict-regime list can be taken to include:
$$
\tau_1-\frac{\epsilon_c}{2\beta_{p,\max}}>0,
\qquad
\frac{\epsilon_c}{4c_fC_p}-\eta>0,
\qquad
\frac{\beta_{p,\max}^2}{c_fC_p}-\epsilon_c>0
$$
$$
\frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
-
\frac{\overline A_s^\rho\epsilon_c}{2\beta_{p,\max}}
-
V_{\max}
>0
$$
$$
\underline A_p^{\mathrm{out}}
-
\overline A_{s,\mathrm{ent}}^{\mathrm{out}}
-
a_{\mathrm{ent}}^{\mathrm{out}}
\ge 0,
\qquad
a_{\mathrm{ent}}^{\mathrm{out}}>0
$$
$$
\underline A_p^{\mathrm{out}}
-
\frac{\kappa\epsilon^2}{c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
-
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\epsilon_c^2}
>0
$$
$$
T_{\mathrm{ent}}^{\mathrm{out}}
-
\frac{\big(V_{\mathrm{ent}}^{\mathrm{out}}-(c_f-\sigma_{\mathrm{out}})\big)_+}
{a_{\mathrm{ent}}^{\mathrm{out}}}
-
\tau_{\mathrm{sub}}^{\mathrm{out}}
\ge 0
$$
together with the five envelope domination inequalities for
$$
X_{\max},
\qquad
U_{\max},
\qquad
A_{\max},
\qquad
T_{\max},
\qquad
h
$$
Any dependence of
$$
V_{\max},
\qquad
V_{\mathrm{ent}}^{\mathrm{out}},
\qquad
T_{\mathrm{ent}}^{\mathrm{out}},
\qquad
\overline A_{s,\mathrm{ent}}^{\mathrm{out}}
$$
on the envelope constants must be inserted into this list before claiming a strict slack point.

> **Proposition (Strict slack point gives a nonempty coupled regime).**
> Let
> $$
> p
> \equiv
> (\eta,\epsilon_c,X_{\max},U_{\max},A_{\max},T_{\max},h,
> V_{\mathrm{ent}}^{\mathrm{out}},
> a_{\mathrm{ent}}^{\mathrm{out}},
> T_{\mathrm{ent}}^{\mathrm{out}},
> \overline A_{s,\mathrm{ent}}^{\mathrm{out}})
> $$
> denote the coupled parameter tuple, and suppose the coupled-regime requirements can be written as a finite family of continuous inequalities
> $$
> F_q(p)>0,
> \qquad
> q\in\mathcal{Q}_{\mathrm{reg}},
> $$
> together with the finite envelope domination inequalities
> $$
> G_r(p)\ge 0,
> \qquad
> r\in\mathcal{Q}_{\mathrm{env}}.
> $$
> Here the list includes the inner-window inequalities, the margins
> $$
> \mathfrak M_{\mathrm{in}}>0,
> \qquad
> \mathfrak M_{\mathrm{ent}}\ge a_{\mathrm{ent}}^{\mathrm{out}}>0,
> \qquad
> \mathfrak M_{\mathrm{out}}>0,
> $$
> the outer-entry interval budget, and the envelope bounds for
> $$
> X_{\max},
> \qquad
> U_{\max},
> \qquad
> A_{\max},
> \qquad
> T_{\max},
> \qquad
> h.
> $$
> If there exists one parameter tuple
> $$
> p_0
> $$
> such that all strict inequalities have positive slack and all envelope inequalities have nonnegative slack, with the zero-slack envelope inequalities allowed only where increasing the corresponding envelope constant preserves every other inequality, then the admissible coupled-regime set is nonempty. If the envelope inequalities also have strict slack at
> $$
> p_0,
> $$
> then the admissible regime contains an open neighborhood of
> $$
> p_0.
> $$

Proof.
Because the family
$$
\mathcal{Q}_{\mathrm{reg}}
$$
is finite and each
$$
F_q
$$
is continuous, positive slack at
$$
p_0
$$
persists on a small neighborhood of
$$
p_0
$$
The same argument applies to every envelope inequality with strict slack. If one envelope inequality is saturated but the corresponding envelope constant can be increased without weakening the other inequalities, enlarge that constant slightly first; this turns the saturated domination inequality into a strict one while preserving the already strict margin inequalities. After this finite adjustment, all inequalities hold with strict slack on one neighborhood. Hence the coupled admissible set is nonempty, and in the strict-slack case open.

This proposition reduces the coupled-regime problem to a finite arithmetic certificate: exhibit one tuple
$$
p_0
$$
at which the inner margin, apocenter-entry margin, outer margin, entry-time budget, and envelope domination inequalities all hold simultaneously.
For completion this tuple must be actual data, either concrete numbers or interval enclosures whose lower endpoints give strict positive slack. A qualitative statement that the inner margin improves as
$$
\epsilon_c\downarrow 0
$$
is not enough, because the outer caustic and self terms may worsen under the same parameter move.

The following nonemptiness test should be run before the full coupled-corridor certificate. It isolates the core-scale conflict between the inner recapture estimate and the outer shell-leakage estimate.

> **Proposition (Corridor nonemptiness criterion).**
> Use the fixed mollifier normalization
> $$
> \Lambda_\delta
> \equiv
> \eta\|\delta_\eta\|_\infty
> =
> \|\delta\|_\infty.
> $$
> Suppose
> $$
> S_{\mathrm{in}}^\rho>0,
> \qquad
> \sigma_{\mathrm{out}}>0,
> \qquad
> P_{\mathrm{out}}>0.
> $$
> The inner coefficient condition
> $$
> C_{\mathrm{in}}(\epsilon_c)>0
> $$
> is equivalent to
> $$
> \epsilon_c^2
> <
> \frac{1}{2S_{\mathrm{in}}^\rho}.
> $$
> The outer shell-deep coefficient condition is equivalent to
> $$
> P_{\mathrm{eff}}(\epsilon_c)>0,
> \qquad
> \epsilon_c^2
> >
> \frac{2\Lambda_\delta}
> {\sigma_{\mathrm{out}}P_{\mathrm{eff}}(\epsilon_c)},
> $$
> where
> $$
> P_{\mathrm{eff}}(\epsilon_c)
> \equiv
> P_{\mathrm{out}}-D_{\mathrm{deep}}(\epsilon_c).
> $$
> Therefore the factorized corridor has a possible core-scale window only if there exists
> $$
> \epsilon_c>0
> $$
> such that
> $$
> \frac{2\Lambda_\delta}
> {\sigma_{\mathrm{out}}P_{\mathrm{eff}}(\epsilon_c)}
> <
> \epsilon_c^2
> <
> \frac{1}{2S_{\mathrm{in}}^\rho}.
> $$
> In the coarse audit where
> $$
> D_{\mathrm{deep}}(\epsilon_c)
> $$
> is negligible, this reduces to the explicit window
> $$
> \sqrt{\frac{2\Lambda_\delta}{\sigma_{\mathrm{out}}P_{\mathrm{out}}}}
> \lesssim
> \epsilon_c
> \lesssim
> \frac{1}{\sqrt{2S_{\mathrm{in}}^\rho}},
> $$
> and the approximate nonemptiness condition
> $$
> \sigma_{\mathrm{out}}P_{\mathrm{out}}S_{\mathrm{in}}^\rho
> >
> 4\Lambda_\delta.
> $$

Proof.
The first equivalence follows directly from
$$
\frac{1}{4\beta_{p,\max}\epsilon_c}
-
\frac{S_{\mathrm{in}}^\rho\epsilon_c}{2\beta_{p,\max}}
>0
$$
The second follows from
$$
P_{\mathrm{out}}
-
D_{\mathrm{deep}}(\epsilon_c)
-
\frac{2\eta\|\delta_\eta\|_\infty}{\sigma_{\mathrm{out}}\epsilon_c^2}
>0
$$
and the definition of
$$
\Lambda_\delta
$$
Combining the lower and upper core-scale requirements gives the displayed window. If this window is empty, the factorized corridor fails by parameter incompatibility before any seed-cycle residual or return-map argument is relevant.

The following sufficient corridor is the scalar form of that arithmetic certificate. It does not prove the geometric coefficients by itself; it separates the coefficient audit from the final coupling choice.

> **Proposition (Factorized corridor for a strict coupled-regime point).**
> Write
> $$
> g\equiv \kappa\epsilon^2.
> $$
> Suppose the force bounds on a chosen envelope factor as
> $$
> \overline A_s^\rho=g\,S_{\mathrm{in}}^\rho,
> \qquad
> \underline A_p^{\mathrm{out}}=gP_{\mathrm{out}},
> \qquad
> \overline A_{s,\mathrm{ent}}^{\mathrm{out}}=g\,S_{\mathrm{ent}}^{\mathrm{out}},
> $$
> where the coefficients are independent of
> $$
> g.
> $$
> Define
> $$
> D_{\mathrm{deep}}(\epsilon_c)
> \equiv
> \frac{1}{c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2},
> \qquad
> L_{\mathrm{shell}}(\eta,\epsilon_c)
> \equiv
> \frac{2\eta\|\delta_\eta\|_\infty}{\sigma_{\mathrm{out}}\epsilon_c^2}.
> $$
> Assume the selected
> $$
> (\eta,\epsilon_c)
> $$
> satisfy the strict short-window inequalities
> $$
> \frac{\epsilon_c}{2\beta_{p,\max}}<\tau_1,
> \qquad
> \eta<\frac{\epsilon_c}{4c_fC_p},
> \qquad
> \epsilon_c<\frac{\beta_{p,\max}^2}{c_fC_p},
> $$
> and that there exists
> $$
> m_{\mathrm{ent}}>0
> $$
> with
> $$
> P_{\mathrm{out}}-S_{\mathrm{ent}}^{\mathrm{out}}-m_{\mathrm{ent}}>0.
> $$
> Also assume
> $$
> C_{\mathrm{in}}(\epsilon_c)
> \equiv
> \frac{1}{4\beta_{p,\max}\epsilon_c}
> -
> \frac{S_{\mathrm{in}}^\rho\,\epsilon_c}{2\beta_{p,\max}}
> >0,
> $$
> or, if the Cauchy-Schwarz partner-impulse refinement has been interval-certified,
> $$
> C_{\mathrm{in}}^{\mathrm{CS}}(\epsilon_c)
> \equiv
> \frac{Q_{\mathrm{CS}}}{4\beta_{p,\max}\epsilon_c}
> -
> \frac{S_{\mathrm{in}}^\rho\,\epsilon_c}{2\beta_{p,\max}}
> >0.
> $$
> $$
> P_{\mathrm{out}}
> -
> D_{\mathrm{deep}}(\epsilon_c)
> -
> L_{\mathrm{shell}}(\eta,\epsilon_c)
> >0,
> $$
> and
> $$
> T_{\mathrm{ent}}^{\mathrm{out}}>\tau_{\mathrm{sub}}^{\mathrm{out}}.
> $$
> Then every coupling scale
> $$
> g
> >
> \max\left\{
> \frac{V_{\max}}{C_{\mathrm{in}}(\epsilon_c)},
> \frac{\big(V_{\mathrm{ent}}^{\mathrm{out}}-(c_f-\sigma_{\mathrm{out}})\big)_+}
> {m_{\mathrm{ent}}\big(T_{\mathrm{ent}}^{\mathrm{out}}-\tau_{\mathrm{sub}}^{\mathrm{out}}\big)}
> \right\}
> $$
> with
> $$
> C_{\mathrm{in}}(\epsilon_c)
> $$
> replaced by the certified
> $$
> C_{\mathrm{in}}^{\mathrm{CS}}(\epsilon_c)
> $$
> if that refinement is used,
> gives a strict coupled-regime point by setting
> $$
> a_{\mathrm{ent}}^{\mathrm{out}}=gm_{\mathrm{ent}}.
> $$

Proof.
The short-window inequalities are strict by assumption. The inner margin becomes
$$
\mathfrak M_{\mathrm{in}}
=
gC_{\mathrm{in}}(\epsilon_c)-V_{\max}
$$
which is positive by the lower bound on
$$
g
$$
If the certified Cauchy-Schwarz refinement is used, the same argument replaces
$$
C_{\mathrm{in}}
$$
by
$$
C_{\mathrm{in}}^{\mathrm{CS}}
$$
The entry margin satisfies
$$
\mathfrak M_{\mathrm{ent}}-a_{\mathrm{ent}}^{\mathrm{out}}
=
g\big(P_{\mathrm{out}}-S_{\mathrm{ent}}^{\mathrm{out}}-m_{\mathrm{ent}}\big)
>0
$$
The outer margin factors as
$$
\mathfrak M_{\mathrm{out}}
=
g\big(
P_{\mathrm{out}}
-
D_{\mathrm{deep}}(\epsilon_c)
-
L_{\mathrm{shell}}(\eta,\epsilon_c)
\big)
$$
which is positive by the coefficient hypothesis. Finally, the lower bound on
$$
g
$$
also gives
$$
T_{\mathrm{ent}}^{\mathrm{out}}
\ge
\frac{\big(V_{\mathrm{ent}}^{\mathrm{out}}-(c_f-\sigma_{\mathrm{out}})\big)_+}
{gm_{\mathrm{ent}}}
+
\tau_{\mathrm{sub}}^{\mathrm{out}}
$$
Thus the finite strict-regime list holds. Choosing the envelope constants with strict domination slack then supplies the strict slack point required by the previous proposition.

> **Proposition (Certified self-map criterion).**
> Let
> $$
> \mathcal{K}_{X_\ast,\eta}
> =
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> be a closed convex tame envelope produced by a finite certificate
> $$
> \{\ell_\alpha\le b_\alpha\}_{\alpha\in\mathcal{I}_{\mathrm{cert}}}.
> $$
> Assume:
> 1. the invariant-envelope closure theorem applies on
>    $$
>    \mathcal{K}_{X_\ast,\eta},
>    $$
>    so that
>    $$
>    P_\eta(\phi)\in\mathcal{C}_{X_\ast,\eta}
>    \qquad
>    \text{for every }\phi\in\mathcal{K}_{X_\ast,\eta};
>    $$
> 2. each certificate inequality is preserved by one return:
>    $$
>    \ell_\alpha(P_\eta(\phi))\le b_\alpha
>    \qquad
>    \text{for every }
>    \alpha\in\mathcal{I}_{\mathrm{cert}}
>    \text{ and every }
>    \phi\in\mathcal{K}_{X_\ast,\eta}.
>    $$
>
> Then
> $$
> P_\eta(\mathcal{K}_{X_\ast,\eta})
> \subseteq
> \mathcal{K}_{X_\ast,\eta}.
> $$

Proof.
Fix
$$
\phi\in\mathcal{K}_{X_\ast,\eta}
$$
By invariant-envelope closure,
$$
P_\eta(\phi)\in\mathcal{C}_{X_\ast,\eta}
$$
By certificate preservation,
$$
\ell_\alpha(P_\eta(\phi))\le b_\alpha
\qquad
\text{for every }\alpha\in\mathcal{I}_{\mathrm{cert}}
$$
Therefore
$$
P_\eta(\phi)
\in
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
=
\mathcal{K}_{X_\ast,\eta}
$$
Since
$$
\phi
$$
was arbitrary, the claimed self-map inclusion follows.

For the sampled certificate above, certificate preservation has an entirely finite form.

> **Proposition (Finite sampled preservation criterion).**
> Suppose
> $$
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> is defined by the sampled seed-cycle tube in Proposition `Sampled seed-cycle tube gives a finite tame certificate`, with mesh
> $$
> \{\theta_j\}_{j=0}^N
> $$
> and radius
> $$
> r_{\mathrm{cert}}.
> $$
> Assume invariant-envelope closure gives
> $$
> P_\eta(\phi)\in\mathcal{C}_{X_\ast,\eta}
> \qquad
> \text{for every }\phi\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}.
> $$
> If, for every
> $$
> \phi\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> and every mesh index
> $$
> 0\le j\le N,
> $$
> the returned history obeys
> $$
> |P_\eta(\phi)(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)|
> \le \frac{r_{\mathrm{cert}}}{4},
> \qquad
> |\partial_\theta P_\eta(\phi)(\theta_j)-\dot\phi_{\mathrm{cyc}}(\theta_j)|
> \le \frac{r_{\mathrm{cert}}}{4},
> $$
> then
> $$
> P_\eta(\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}})
> \subseteq
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}.
> $$

Proof.
The invariant-envelope theorem gives the returned-history membership in
$$
\mathcal{C}_{X_\ast,\eta}
$$
The displayed finite sample inequalities are exactly the certificate inequalities defining
$$
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
in the sampled construction. Hence every returned history satisfies all certificate inequalities and therefore lies in
$$
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$

The hard part of applying this criterion is proving the finite mesh inequalities uniformly. The following budget form is the one that should be used in later proof checking.

> **Proposition (Returned-sample budget certificate).**
> In the setting of Proposition `Finite sampled preservation criterion`, suppose there are finite returned-sample budgets
> $$
> E_{j,+}^{X},
> \qquad
> E_{j,-}^{X},
> \qquad
> E_{j,+}^{v},
> \qquad
> E_{j,-}^{v},
> \qquad
> 0\le j\le N,
> $$
> such that for every
> $$
> \phi\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> the returned history satisfies
> $$
> P_\eta(\phi)(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)
> \le E_{j,+}^{X},
> \qquad
> \phi_{\mathrm{cyc}}(\theta_j)-P_\eta(\phi)(\theta_j)
> \le E_{j,-}^{X},
> $$
> and
> $$
> \partial_\theta P_\eta(\phi)(\theta_j)-\dot\phi_{\mathrm{cyc}}(\theta_j)
> \le E_{j,+}^{v},
> \qquad
> \dot\phi_{\mathrm{cyc}}(\theta_j)-\partial_\theta P_\eta(\phi)(\theta_j)
> \le E_{j,-}^{v}.
> $$
> If the strict sample-slack inequalities
> $$
> \max\{E_{j,+}^{X},E_{j,-}^{X},E_{j,+}^{v},E_{j,-}^{v}\}
> <
> \frac{r_{\mathrm{cert}}}{4}
> \qquad
> \text{for every }0\le j\le N
> $$
> hold, then
> $$
> P_\eta(\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}})
> \subseteq
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}.
> $$

Proof.
The one-sided budget inequalities imply
$$
|P_\eta(\phi)(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)|
<
\frac{r_{\mathrm{cert}}}{4}
$$
and
$$
|\partial_\theta P_\eta(\phi)(\theta_j)-\dot\phi_{\mathrm{cyc}}(\theta_j)|
<
\frac{r_{\mathrm{cert}}}{4}
$$
for every mesh index. Proposition `Finite sampled preservation criterion` then gives the self-map inclusion.

> **Proposition (Residual-plus-sensitivity sampled preservation).**
> In the setting above, assume the center history
> $$
> \phi_{\mathrm{cyc}}
> $$
> has a defined return
> $$
> P_\eta(\phi_{\mathrm{cyc}}),
> $$
> and define the one-sided returned residuals
> $$
> R_{j,+}^{X}
> \equiv
> \big(P_\eta(\phi_{\mathrm{cyc}})(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)\big)_+,
> \qquad
> R_{j,-}^{X}
> \equiv
> \big(\phi_{\mathrm{cyc}}(\theta_j)-P_\eta(\phi_{\mathrm{cyc}})(\theta_j)\big)_+,
> $$
> $$
> R_{j,+}^{v}
> \equiv
> \big(\partial_\theta P_\eta(\phi_{\mathrm{cyc}})(\theta_j)-\dot\phi_{\mathrm{cyc}}(\theta_j)\big)_+,
> \qquad
> R_{j,-}^{v}
> \equiv
> \big(\dot\phi_{\mathrm{cyc}}(\theta_j)-\partial_\theta P_\eta(\phi_{\mathrm{cyc}})(\theta_j)\big)_+.
> $$
> Suppose also that the return map sample functionals have finite local sensitivity constants on
> $$
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}},
> $$
> namely
> $$
> |P_\eta(\phi)(\theta_j)-P_\eta(\phi_{\mathrm{cyc}})(\theta_j)|
> \le
> L_j^X\|\phi-\phi_{\mathrm{cyc}}\|_{C^1},
> $$
> $$
> |\partial_\theta P_\eta(\phi)(\theta_j)
> -
> \partial_\theta P_\eta(\phi_{\mathrm{cyc}})(\theta_j)|
> \le
> L_j^v\|\phi-\phi_{\mathrm{cyc}}\|_{C^1}
> $$
> for every
> $$
> \phi\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}.
> $$
> If
> $$
> \max\{R_{j,+}^{X},R_{j,-}^{X}\}+L_j^X r_{\mathrm{cert}}
> <
> \frac{r_{\mathrm{cert}}}{4},
> $$
> and
> $$
> \max\{R_{j,+}^{v},R_{j,-}^{v}\}+L_j^v r_{\mathrm{cert}}
> <
> \frac{r_{\mathrm{cert}}}{4}
> $$
> for every
> $$
> 0\le j\le N,
> $$
> then the returned-sample budget certificate holds, and hence
> $$
> P_\eta(\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}})
> \subseteq
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}.
> $$

Proof.
The sampled certificate construction gives
$$
\|\phi-\phi_{\mathrm{cyc}}\|_{C^1}\le r_{\mathrm{cert}}
$$
for every
$$
\phi\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
Therefore
$$
P_\eta(\phi)(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)
\le
R_{j,+}^{X}+L_j^X r_{\mathrm{cert}}
$$
and the same triangle-inequality argument gives the other three one-sided bounds. The displayed strict inequalities therefore define returned-sample budgets satisfying the previous proposition. The self-map inclusion follows.

This criterion is only a sufficient route. If the raw local sensitivity is too large, the boundary-trapping lemma below can still prove preservation by direct inward-margin estimates at the certificate faces.

> **Lemma (Boundary trapping for the sampled certificate).**
> Assume the returned-sample budget certificate and write
> $$
> s_{\mathrm{sam}}
> \equiv
> \frac{r_{\mathrm{cert}}}{4}
> -
> \max_{0\le j\le N}
> \max\{E_{j,+}^{X},E_{j,-}^{X},E_{j,+}^{v},E_{j,-}^{v}\}.
> $$
> If
> $$
> s_{\mathrm{sam}}>0,
> $$
> then every codimension-one sample face of
> $$
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> is strictly inward under one return.

Proof.
The sample faces are exactly the four one-sided equalities, for each mesh index
$$
j
$$
obtained by replacing one of
$$
|\phi(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)|\le \frac{r_{\mathrm{cert}}}{4},
\qquad
|\dot\phi(\theta_j)-\dot\phi_{\mathrm{cyc}}(\theta_j)|
\le \frac{r_{\mathrm{cert}}}{4}
$$
with equality and choosing a sign. If a returned history touched one such face, the corresponding returned-sample defect would equal
$$
\frac{r_{\mathrm{cert}}}{4}
$$
But the returned-sample budget bounds that same defect by at most
$$
\frac{r_{\mathrm{cert}}}{4}-s_{\mathrm{sam}}
$$
a contradiction. Hence no returned history reaches any sample face; all sample faces are strictly inward.

One useful route for proving the budget hypotheses is a boundary-trapping check: for each certificate face
$$
\ell_\alpha=b_\alpha
$$
show that any trajectory whose returned history would otherwise touch that face is pushed strictly back toward
$$
\ell_\alpha<b_\alpha
$$
by one of the established cycle margins. Because the certificate family is finite, these facewise checks reduce the global self-map property to finitely many inward-pointing inequalities.

> **Theorem (Finite-certificate invariant closure package).**
> Assume:
> 1. the seed-cycle margin ledger is positive and the quantitative radius criterion has been used to choose
>    $$
>    r_{\mathrm{cert}};
>    $$
> 2. the sampled finite certificate defines
>    $$
>    \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}};
>    $$
> 3. the factorized coupled-regime corridor holds, so invariant-envelope closure gives
>    $$
>    P_\eta(\phi)\in\mathcal{C}_{X_\ast,\eta}
>    \qquad
>    \text{for every }\phi\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}};
>    $$
> 4. and either the direct returned-sample budget certificate holds on
>    $$
>    \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}},
>    $$
>    for example by boundary trapping, or the residual-plus-sensitivity sampled preservation criterion holds on
>    $$
>    \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}.
>    $$
>
> Then
> $$
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> is a nonempty closed convex tame self-map domain for
> $$
> P_\eta,
> $$
> namely
> $$
> P_\eta\!\big(\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}\big)
> \subseteq
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}.
> $$

Proof.
The positive seed-cycle ledger and the radius criterion give the strict branch-chart, gap, memory-depth, and envelope margins required by the sampled finite certificate. The finite certificate construction then makes
$$
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
a nonempty closed convex tame envelope. The factorized corridor supplies the coupled strict-slack point needed by invariant-envelope closure, so returned histories lie in
$$
\mathcal{C}_{X_\ast,\eta}
$$
Finally, a direct returned-sample budget certificate gives the finite sampled preservation criterion immediately. If that direct route is not used, the residual-plus-sensitivity criterion implies the same returned-sample budget certificate. In either case the finite sampled preservation criterion gives the certificate inequalities after one return. Therefore the returned history lies in the certified set itself, proving the self-map inclusion.

The finite self-map ledger has five rows. The first, second, third, and fifth rows produce the self-map certificate and well-posed variational interpretation; the fourth row is a stability diagnostic that decides whether returned-sample preservation should be attempted by sensitivities or by boundary trapping. Adding the certified topology row below gives the full six-row Schauder-ready audit.

1. **Seed-chart row.**
   Verify
   $$
   \nu_{\mathrm{seed}}>0,
   \qquad
   \gamma_{\mathrm{gap}}>0,
   \qquad
   \gamma_h>0,
   \qquad
   \gamma_{\mathrm{env}}>0
   $$
   and finite sensitivities
   $$
   L_J,
   \qquad
   L_F,
   \qquad
   L_h,
   \qquad
   L_{\mathrm{env}}
   $$
   This row chooses
   $$
   r_{\mathrm{cert}}
   $$
   and produces the closed convex tame certificate.
   The row begins with a candidate
   $$
   \phi_{\mathrm{cyc}}
   $$
   a common mesh, and a null-coordinate causal pre-ledger. For each ordered receiver-source block
   $$
   (I_\alpha,I_\beta)
   $$
   the pre-ledger must classify the row as empty, simple-root, or fold-layer using
   $$
   u=c_f T-X,
   \qquad
   w=c_f T+X
   $$
   Empty rows require strict range separation; simple-root rows require a positive source-side derivative floor; fold-layer rows remain outside branch-sum reduction until the dual-mollified fold certificate supplies the parity-preserving transition
   $$
   \Delta N\in 2\mathbb{Z},
   \qquad
   \Delta D=0
   $$
   Any unresolved row blocks the seed chart before corridor, monodromy, or returned-sample work begins.
2. **Coupled-corridor row.**
   Verify
   $$
   C_{\mathrm{in}}(\epsilon_c)>0,
   \qquad
   P_{\mathrm{out}}-S_{\mathrm{ent}}^{\mathrm{out}}-m_{\mathrm{ent}}>0,
   \qquad
   P_{\mathrm{out}}-D_{\mathrm{deep}}(\epsilon_c)-L_{\mathrm{shell}}(\eta,\epsilon_c)>0
   $$
   choose
   $$
   g=\kappa\epsilon^2
   $$
   above the factorized threshold, and set
   $$
   a_{\mathrm{ent}}^{\mathrm{out}}=gm_{\mathrm{ent}}
   $$
   This row supplies the strict coupled-regime point. For a completed proof, this row must be a concrete numerical or interval certificate for one tuple
   $$
   p_0
   $$
   in the coupled system, not separate local parameter choices.
3. **Solution-manifold compatibility row.**
   The section history must live on the compatible first-order history
   manifold before any variational or monodromy row is interpreted. Write the
   local first-order lift as
   $$
   Y=(X,U),
   \qquad
   \mathcal{H}_h^{(1)}=C^1([-h,0];\mathbb{R}^2)
   $$
   and define the admissible compatibility class
   $$
   \mathcal{X}_\eta
   =
   \left\{
   \Phi=(X,U)\in\mathcal{H}_h^{(1)}
   :
   \dot X(0)=U(0),
   \quad
   \dot U(0)=F_\eta(\Phi)
   \right\}
   $$
   The candidate packet must report this endpoint row on the same packet
   identity as the pre-ledger, branch chart, fold atlas, and returned samples.
   The tangent row consumed by monodromy must satisfy
   $$
   \dot \Xi(0)=V(0),
   \qquad
   \dot V(0)=D F_\eta(\Phi)\Psi
   $$
   Thus monodromy differentiates certified branch maps on compatible histories;
   it is not a frozen-delay calculation on an arbitrary $C^1$ box.
4. **Monodromy diagnostic row.**
   Compute an interval enclosure for the section-anchored linearized return map
   $$
   D P_\eta(\phi_{\mathrm{cyc}})
   $$
   on the certificate mesh. The section anchoring removes the neutral time-translation direction before the spectrum is interpreted. Record the discrete monodromy matrix
   $$
   M_N
   $$
   an interval spectral enclosure, and an explicit diagnostic margin
   $$
   \delta_{\mathrm{mon}}>0
   $$
   If any certified eigenvalue satisfies
   $$
   |\lambda|>1+\delta_{\mathrm{mon}}
   $$
   the residual-plus-sensitivity route should be considered closed for that unstable direction, and the returned-sample row must use direct one-sided boundary trapping. If the spectrum and operator-norm enclosure are small enough to give usable constants
   $$
   L_j^X,
   \qquad
   L_j^v
   $$
   this row authorizes the residual-plus-sensitivity route. Schauder itself does not require linear stability; this row is a proof-strategy selector for the finite preservation audit.

   The same row must also report the zero-mode quotient used for interpretation. Let
   $$
   Z_{\mathrm{time}}(\theta)=\dot\phi_{\mathrm{cyc}}(\theta)
   $$
   denote the infinitesimal time-shift direction before section anchoring. If additional ansatz or certificate parameters
   $$
   \alpha^a
   $$
   are carried, their tangent rows
   $$
   Z_a(\theta)=\partial_{\alpha^a}\phi_{\mathrm{cyc}}(\theta;\alpha)
   $$
   must be classified as neutral, constrained by the section, or transverse. This prevents a harmless collective-coordinate drift from being mistaken for an unstable return direction, and it prevents a genuine transverse instability from being hidden inside a free parameter.
5. **Returned-sample row.**
   Prefer the direct one-sided budget route when local sensitivities are large: prove
   $$
   E_{j,\pm}^{X},
   \qquad
   E_{j,\pm}^{v}
   $$
   by boundary trapping with strict sample slack. Equivalently, when the sensitivity constants are tame enough, verify
   $$
   \max\{R_{j,+}^{X},R_{j,-}^{X}\}+L_j^X r_{\mathrm{cert}}
   <
   \frac{r_{\mathrm{cert}}}{4},
   \qquad
   \max\{R_{j,+}^{v},R_{j,-}^{v}\}+L_j^v r_{\mathrm{cert}}
   <
   \frac{r_{\mathrm{cert}}}{4}
   $$
   for every mesh index. This row supplies certificate preservation under one return.

This ledger is deliberately finite. Passing the seed-chart, coupled-corridor, solution-manifold compatibility, and returned-sample rows turns the domain-production burden into the self-map inclusion; the monodromy row identifies whether the returned-sample proof should use sensitivity control or boundary trapping. Failing any required row identifies the exact obstruction.

### Certified topology row

After the finite closure audit supplies
$$
P_\eta\!\big(\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}\big)
\subseteq
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
precompactness is no longer a separate dynamical mystery: the returned histories already lie in the same certified
$$
C^1
$$
envelope. Continuity still requires one extra topological margin, namely strict transversality of the returned section.

Define the certified return-speed margin
$$
u_{\mathrm{ret}}^{\mathrm{cert}}
\equiv
-\dot\phi_{\mathrm{cyc}}(0)-\frac{r_{\mathrm{cert}}}{4}
$$
Because the mesh includes
$$
\theta_N=0
$$
the returned-sample inequalities imply
$$
\partial_\theta P_\eta(\phi)(0)
\le
\dot\phi_{\mathrm{cyc}}(0)+\frac{r_{\mathrm{cert}}}{4}
=
-u_{\mathrm{ret}}^{\mathrm{cert}}
$$
Thus
$$
u_{\mathrm{ret}}^{\mathrm{cert}}>0
$$
is the finite section-transversality check needed by the continuity proposition.

> **Proposition (Certified topology on the finite self-map domain).**
> Assume the finite-certificate invariant closure package, and assume in addition:
> 1. the certified return-speed margin satisfies
>    $$
>    u_{\mathrm{ret}}^{\mathrm{cert}}>0;
>    $$
> 2. the certified branch-chart well-posedness proposition applies on the finite chart intervals covering the stored history and one-cycle continuation;
> 3. the active delayed roots persist on
>    $$
>    \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
>    $$
>    with the Jacobian floors, branch-count ceilings, and memory-depth bounds supplied by the certificate outside the certified fold-event atlas, and each fold layer in that atlas has a parity-preserving incoming-to-outgoing chart transition.
>
> Then
> $$
> P_\eta:
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> \to
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> is continuous, and
> $$
> P_\eta\!\big(\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}\big)
> $$
> is precompact in
> $$
> C^1([-h,0]).
> $$

Proof.
The finite-certificate invariant closure package gives
$$
P_\eta(\phi)\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
\subseteq
\mathcal{C}_{X_\ast,\eta}
$$
for every
$$
\phi\in\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
Hence every returned history satisfies the position, speed, Lipschitz-velocity, and horizon bounds required by Proposition `Precompactness of the Return Image`; that proposition gives precompactness.

For continuity, certified branch-chart well-posedness gives continuous dependence of the controlled continuation on the initial history while the certificate keeps the same exterior charts, origin-layer charts, fold-event atlas, and Jacobian floors. The displayed return-speed estimate gives the uniform transverse return condition
$$
\frac{dX}{dT}(T(\phi);\phi)\le -u_{\mathrm{ret}}^{\mathrm{cert}}<0
$$
Therefore the continuity proposition for the return map applies with
$$
\mathcal{K}_{X_\ast,\eta}
=
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
and yields continuity of
$$
P_\eta
$$
on the certified domain.

The full Schauder-ready audit therefore has six rows:

1. the seed-chart row;
2. the coupled-corridor row;
3. the solution-manifold compatibility row;
4. the monodromy diagnostic row;
5. the returned-sample row;
6. and the topology row
   $$
   u_{\mathrm{ret}}^{\mathrm{cert}}>0
   $$
   plus certified branch-chart well-posedness and a certified fold-event atlas on the controlled continuation.

### Remaining blockers before Schauder

At this stage the remaining blockers are narrow and explicit:

No remaining blocker asks for an elementary closed-form orbit. The proof needs one instantiated candidate cycle
$$
\phi_{\mathrm{cyc}}
$$
defined against the dual-mollified absolute-time law, and finite certificate data proving that the same closed convex tame domain is self-mapping, continuous, and precompact under
$$
P_\eta
$$

The first explicit velocity-class packet has moved the obstruction from candidate absence to candidate falsification. A fixed cosine candidate supplies useful null-coordinate and fold-layer diagnostics, but it fails at the parent-complement part of the pre-ledger: after accepted simple-root windows and fold-layer diagnostics are removed, some parent complements still carry equality cores or non-strict null-coordinate overlap. The next admissible route is therefore a fresh fold-adapted collocation candidate, or an equivalent certified construction, whose pre-ledger closes before any seed-chart or branch-chart row begins.

A stricter sub-field-speed comparison branch is now a restart route rather than
an available baseline. The held-release segment and exterior affine
delayed-partner chart must be solved with the receiver-normal factors above.
Only after that recomputation may the proof ask whether field-speed separators
are dynamically produced by the full dual-mollified dynamics or replaced by a
certified sub-field return mechanism.

The negative-breather lesson is that even a formal expansion valid to all
orders can miss a leakage channel outside the expansion scale. The collinear
program therefore treats a small residual curve, a long-lived numerical trace,
or a closed-looking ansatz as candidate evidence only. Promotion requires the
existing certificate rows to close the leakage routes they control: the
pre-ledger fold-layer budgets, coupled-corridor propagation, returned-sample
preservation, and topology/self-map row on one certified domain. The same rule
applies internally: partial diagnostics remain candidate evidence while
parent-complement equality cores remain unresolved.

Before those five audit rows can be meaningful, the candidate must pass the named null-coordinate pre-ledger target from [Closed-Form Collinear Breather Ansatz](./closed-form-collinear-breather-ansatz.md#null-coordinate-causal-pre-ledger). Concretely, the proof must:

1. produce one candidate cycle
   $$
   \phi_{\mathrm{cyc}}
   $$
   with a certificate mesh and either fold-adapted fractional basis data near field-speed separators or an interval-collocation representation with equivalent residual targets;
2. verify the `Null-Coordinate Causal Pre-Ledger` target for
   $$
   |X(T)-X(T_{\mathrm{em}})|=c_f(T-T_{\mathrm{em}}),
   \qquad
   T_{\mathrm{em}}<T
   $$
   using
   $$
   u=c_f T-X,
   \qquad
   w=c_f T+X
   $$
   to classify every ordered arc-pair block as empty, simple-root, or fold-layer. After accepted simple-root and fold-layer subblocks are removed, the remaining parent-complement strips must also be consumed by strict range separation, endpoint-excluded singleton contact under the declared boundary convention, exact fold-layer coverage, or another already accepted same-packet complement predicate. If this finite pre-ledger cannot be certified with strict gaps, derivative floors, fold-layer bounds, and consumed parent complements, the candidate or itinerary fails before the seed-cycle margin ledger is attempted;
3. verify the seed-cycle margin ledger
   $$
   \nu_{\mathrm{seed}}>0,
   \qquad
   \gamma_{\mathrm{gap}}>0,
   \qquad
   \gamma_h>0,
   \qquad
   \gamma_{\mathrm{env}}>0
   $$
   then apply the quantitative radius criterion for
   $$
   r_{\mathrm{cert}}
   $$
   to choose the sampled finite tame certificate for
   $$
   \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
   $$
4. verify the factorized coupled-corridor inequalities
   $$
   C_{\mathrm{in}}(\epsilon_c)>0,
   \qquad
   P_{\mathrm{out}}-S_{\mathrm{ent}}^{\mathrm{out}}-m_{\mathrm{ent}}>0,
   \qquad
   P_{\mathrm{out}}-D_{\mathrm{deep}}(\epsilon_c)-L_{\mathrm{shell}}(\eta,\epsilon_c)>0
   $$
   then choose
   $$
   g=\kappa\epsilon^2
   $$
   above the displayed corridor threshold for the finite coupled-regime system in
   $$
   (\eta,\epsilon_c,X_{\max},U_{\max},A_{\max},T_{\max},h,
   V_{\mathrm{ent}}^{\mathrm{out}},
   a_{\mathrm{ent}}^{\mathrm{out}},
   T_{\mathrm{ent}}^{\mathrm{out}},
   \overline A_{s,\mathrm{ent}}^{\mathrm{out}})
   $$
   by producing one strict numeric or interval tuple
   $$
   p_0
   $$
   rather than treating local margins and envelope constants as independent;
5. compute the monodromy diagnostic for
   $$
   D P_\eta(\phi_{\mathrm{cyc}})
   $$
   on the section-anchored mesh. If the interval spectral enclosure has an unstable direction
   $$
   |\lambda|>1+\delta_{\mathrm{mon}}
   $$
   use the result to route the returned-sample proof to boundary trapping rather than residual-plus-sensitivity estimates.
6. derive returned-sample budgets. If the sample sensitivities
   $$
   L_j^X,
   \qquad
   L_j^v
   $$
   are too large to close the residual-plus-sensitivity route, use direct boundary trapping for
   $$
   E_{j,\pm}^{X},
   \qquad
   E_{j,\pm}^{v}
   $$
   with strict sample slack. When sensitivities are small enough, the residual-plus-sensitivity inequalities
   $$
   R_{j,\pm}^{X}+L_j^X r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4},
   \qquad
   R_{j,\pm}^{v}+L_j^v r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4}
   $$
   are sufficient. In either case, prove the finite checks that imply
   $$
   P_\eta(\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}})
   \subseteq
   \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
   $$
   on that same domain.
7. verify the topology row:
   $$
   u_{\mathrm{ret}}^{\mathrm{cert}}>0
   $$
   and certified branch-chart well-posedness for the dual-mollified vector field on the controlled continuation, including the origin-layer chart and certified fold-event atlas, so the certified topology proposition gives continuity and precompactness on
   $$
   \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
   $$

Once the pre-ledger gate passes and the five audit rows are theorem-level, the finite-certificate invariant closure package supplies the self-map domain and the certified topology proposition supplies continuity and precompactness. The remaining Schauder step is then formally routine.

### Schauder capstone

> **Conditional Theorem (Schauder Existence of a Dual-Mollified Collinear Breather).**
> Assume:
> 1. the theorem `Seed-to-Tame Full-Cycle Propagation`;
> 2. the finite-certificate invariant closure package, producing the nonempty closed convex tame self-map domain
>    $$
>    \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}};
>    $$
> 3. and the certified topology proposition, giving continuity and precompactness of
>    $$
>    P_\eta
>    $$
>    on that same certified domain.
>
> Then there exists
> $$
> \phi_\eta^\ast
> \in
> \mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
> $$
> such that
> $$
> P_\eta(\phi_\eta^\ast)=\phi_\eta^\ast.
> $$
> The corresponding delayed trajectory is an exact bounded periodic origin-crossing two-body motion in the dual-mollified collinear model.

Proof.
`Seed-to-Tame Full-Cycle Propagation` supplies a nonempty tame class. The finite-certificate invariant closure package places that class inside a nonempty closed convex self-map domain
$$
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
Continuity and precompactness place the return image inside a compact subset of that same domain, while invariant-envelope closure prevents escape. Schauder therefore yields a fixed point of
$$
P_\eta
$$
on
$$
\mathcal{K}_{X_\ast,\eta}^{\mathrm{cert}}
$$
and by construction that fixed point is exactly a periodic returned history.
This capstone remains conditional on the finite closure audit and certified topology row. Without one nonempty closed convex tame self-map domain carrying propagation, continuity, precompactness, and invariance all at once, Schauder does not yet apply.

### Seed history and tame-class nonemptiness

The remaining global nonvacuity issue is now easy to state. The invariant-envelope theorem is useful only if the section-side tame class is actually nonempty. The next theorem target is therefore to construct at least one explicit inbound history with controlled delayed geometry and then thicken it to a small nonempty tame neighborhood in the section topology.

The simplest seed is a strictly sub-field-speed affine inbound history on the right exterior branch. It is not meant to solve the full forward dynamics; its role is only to prove that the section-side tame constraints are simultaneously realizable.

> **Target Theorem (Seed History and Section-Tame Nonemptiness).**
> Fix
> $$
> X_\ast>0,
> \qquad
> 0<u_{\mathrm{seed}}<c_f,
> \qquad
> h\ge \frac{2X_\ast}{c_f-u_{\mathrm{seed}}}.
> $$
> Then there exists an explicit inbound history
> $$
> \psi_{\mathrm{seed}}\in \Sigma^-_{X_\ast,\eta}\cap \mathcal{C}_{X_\ast,\eta}
> $$
> such that:
> 1. the stored history lies in the position, speed, and acceleration envelope;
> 2. the stored partner root structure is finite and transversal;
> 3. there are no exact same-side self roots on the stored interval;
> 4. and a sufficiently small $C^1$ section neighborhood of
>    $$
>    \psi_{\mathrm{seed}}
>    $$
>    remains inside a section-level tame subclass
>    $$
>    \mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
>    \subseteq
>    \mathcal{C}_{X_\ast,\eta}.
>    $$

This theorem is intentionally only a section-side nonemptiness statement. It does not yet say that the forward delayed flow preserves the same class for one full cycle. That stronger claim belongs to the later invariant-envelope theorem.

> **Proposition (Explicit affine inbound seed history).**
> Fix
> $$
> X_\ast>0,
> \qquad
> 0<u_{\mathrm{seed}}<c_f,
> \qquad
> h\ge \frac{2X_\ast}{c_f-u_{\mathrm{seed}}}.
> $$
> Define
> $$
> \psi_{\mathrm{seed}}(\theta)
> \equiv
> X_\ast-u_{\mathrm{seed}}\theta,
> \qquad
> \theta\in[-h,0].
> $$
> Then:
> 1. the section conditions hold:
>    $$
>    \psi_{\mathrm{seed}}(0)=X_\ast,
>    \qquad
>    \dot\psi_{\mathrm{seed}}(0)=-u_{\mathrm{seed}}<0;
>    $$
> 2. the stored path is right exterior and monotone inbound:
>    $$
>    X_\ast
>    \le
>    \psi_{\mathrm{seed}}(\theta)
>    \le
>    X_\ast+u_{\mathrm{seed}}h,
>    \qquad
>    \dot\psi_{\mathrm{seed}}(\theta)=-u_{\mathrm{seed}},
>    \qquad
>    \ddot\psi_{\mathrm{seed}}(\theta)=0;
>    $$
> 3. there is exactly one partner root on the stored interval, located at
>    $$
>    \theta_{p,\mathrm{seed}}
>    =
>    -\frac{2X_\ast}{c_f-u_{\mathrm{seed}}},
>    $$
>    and its Jacobian satisfies
>    $$
>    J_{p,\mathrm{seed}}
>    =
>    1-\frac{u_{\mathrm{seed}}}{c_f}>0;
>    $$
> 4. there are no exact same-side self roots on
>    $$
>    [-h,0).
>    $$
>
> Consequently, if
> $$
> X_{\max}\ge X_\ast+u_{\mathrm{seed}}h,
> \qquad
> U_{\max}\ge u_{\mathrm{seed}},
> \qquad
> A_{\max}>0,
> \qquad
> \nu_{\mathrm{seed}}\le 1-\frac{u_{\mathrm{seed}}}{c_f},
> $$
> then
> $$
> \psi_{\mathrm{seed}}\in \mathcal{C}_{X_\ast,\eta},
> $$
> and the stored-history transversality bounds hold with
> $$
> |J_p|\ge \nu_{\mathrm{seed}},
> $$
> while the self-root transversality condition is vacuous on the seed because there are no exact same-side self roots.

Proof.
The section anchoring and inbound sign are immediate from the definition of
$$
\psi_{\mathrm{seed}}
$$
Since
$$
\theta\in[-h,0]
$$
one has
$$
\psi_{\mathrm{seed}}(\theta)=X_\ast-u_{\mathrm{seed}}\theta
=
X_\ast+u_{\mathrm{seed}}|\theta|
$$
so the stored path remains on the right exterior branch, decreases monotonically toward the section as
$$
\theta\uparrow 0
$$
and satisfies the displayed position, speed, and acceleration bounds.

For a partner root at the section time
$$
\theta=0
$$
the delayed causal relation is
$$
X_\ast+\psi_{\mathrm{seed}}(\theta_p)=c_f(0-\theta_p)
$$
Writing
$$
S=-\theta_p>0
$$
this becomes
$$
X_\ast+\bigl(X_\ast+u_{\mathrm{seed}}S\bigr)=c_f S
$$
hence
$$
2X_\ast=(c_f-u_{\mathrm{seed}})S
$$
and therefore
$$
S=\frac{2X_\ast}{c_f-u_{\mathrm{seed}}}
$$
The lower bound on
$$
h
$$
ensures that
$$
\theta_{p,\mathrm{seed}}=-S
$$
lies inside
$$
[-h,0]
$$
Since the seed velocity is constant,
$$
J_{p,\mathrm{seed}}
=
1+\frac{\dot\psi_{\mathrm{seed}}(\theta_{p,\mathrm{seed}})}{c_f}
=
1-\frac{u_{\mathrm{seed}}}{c_f}>0
$$

Now consider exact same-side self roots on the stored interval. Such a root would satisfy
$$
|\psi_{\mathrm{seed}}(0)-\psi_{\mathrm{seed}}(\theta_s)|
=
c_f(0-\theta_s)
$$
Again writing
$$
S=-\theta_s>0
$$
the left-hand side equals
$$
u_{\mathrm{seed}}S
$$
so the equation becomes
$$
u_{\mathrm{seed}}S=c_f S
$$
Because
$$
0<u_{\mathrm{seed}}<c_f
$$
this has no solution for
$$
S>0
$$
Hence there are no exact same-side self roots on
$$
[-h,0)
$$

The final membership claim is then immediate from the displayed envelope inequalities.

> **Corollary (Nonempty section-level tame neighborhood).**
> Under the hypotheses of the proposition, there exists
> $$
> \varepsilon_{\mathrm{seed}}>0
> $$
> such that the set
> $$
> \mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
> \equiv
> \left\{
> \phi\in \mathcal{C}_{X_\ast,\eta}
> \;\middle|\;
> \phi(0)=X_\ast,
> \quad
> \dot\phi(0)\le -\frac{u_{\mathrm{seed}}}{2},
> \quad
> \|\phi-\psi_{\mathrm{seed}}\|_{C^1([-h,0])}\le \varepsilon_{\mathrm{seed}}
> \right\}
> $$
> is nonempty and consists of inbound section histories whose stored partner root persists uniquely and whose stored same-side exact self roots remain absent.

Proof sketch.
The set is nonempty because
$$
\psi_{\mathrm{seed}}\in \mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
$$
for every
$$
\varepsilon_{\mathrm{seed}}>0
$$
The seed has a strict sub-field-speed margin
$$
\sigma_{\mathrm{seed}}\equiv c_f-u_{\mathrm{seed}}>0
$$
and a simple partner root with
$$
J_{p,\mathrm{seed}}>0
$$
By continuity of the root equations and of the Jacobian factors under small $C^1$ perturbations of the stored history, these properties persist for all histories sufficiently close to
$$
\psi_{\mathrm{seed}}
$$
Likewise, the same-side self-root equation has a strict gap on the seed because
$$
u_{\mathrm{seed}}<c_f
$$
so exact same-side self roots cannot appear under a sufficiently small perturbation. Therefore a small enough neighborhood remains inside a section-level tame subclass.

This corollary is the first concrete nonvacuity statement for the theorem program. The remaining task is no longer to show that tame histories exist at all, but to propagate such a seed class through the full delayed cycle strongly enough that it becomes the nonempty class required by the invariant-envelope theorem.

### Seed-to-tame propagation target

The seed construction resolves only the section-side nonvacuity issue. The next step is to promote a smaller neighborhood of seed histories to a genuinely nonempty tame class for the delayed flow itself. In other words, one wants to replace
$$
\mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
$$
by a forward-propagated subclass on which the collapse, recapture, return, and root-control estimates all hold on one full cycle.

This is the precise bridge from the section-level seed construction to the invariant-envelope theorem.

> **Target Theorem (Seed-to-Tame Full-Cycle Propagation).**
> Assume the affine seed proposition and the nonempty section-level neighborhood corollary above. Then there exists a nonempty subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}_{X_\ast,\eta}
> $$
> such that:
> 1. every
>    $$
>    \psi\in \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
>    $$
>    admits a unique forward continuation through one full cycle;
> 2. the collapse-to-crossing control theorem applies uniformly on this class;
> 3. the explicit inner recapture regime and the unified trimmed-apocenter outer-turn criterion both apply uniformly on this class;
> 4. the turn-to-section return lemmas apply uniformly on this class;
> 5. and the returned history satisfies
>    $$
>    P_\eta(\psi)\in \mathcal{C}_{X_\ast,\eta}.
>    $$
>
> In particular,
> $$
> \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}\neq \varnothing,
> $$
> the return map
> $$
> P_\eta
> $$
> is well defined on a nonempty tame class, and the invariant-envelope theorem becomes nonvacuous.

This theorem is deliberately phrased as a propagation target rather than a proved proposition. The real remaining work is to show that the estimates already developed later in the note can be made uniform on a sufficiently small seed neighborhood rather than only along a single handpicked history.

### Seed-propagation ladder

The intended proof order is:

1. **Local forward continuation from the seed neighborhood.**
   Show that a sufficiently small
   $$
   C^1
   $$
   neighborhood of
   $$
   \psi_{\mathrm{seed}}
   $$
   evolves uniquely for at least one collapse phase while preserving the initial stored partner-root simplicity and same-side self-root exclusion.
2. **Seed-neighborhood collapse control.**
   Prove that the collapse-to-crossing estimates can be made uniform on a smaller neighborhood
   $$
   \mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}
   \subseteq
   \mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
   $$
3. **Seed-neighborhood realization of the inner regime.**
   Verify that the first crossing from this neighborhood lands uniformly in the Goldilocks window required by Proposition `Explicit short-window recapture regime`.
4. **Seed-neighborhood realization of the outer regime.**
   Verify that the same trajectories satisfy the hypotheses of the unified trimmed-apocenter outer-turn criterion on the final apocenter window.
5. **Returned-history reentry.**
   Show that the returned history segment lies back inside
   $$
   \mathcal{C}_{X_\ast,\eta}
   $$
   and, after shrinking once more if necessary, inside a forward-propagation subclass
   $$
   \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
   $$

The conceptual point is simple: the seed history does not need to solve the whole breather problem by itself. It only needs to provide one strict interior point of history space around which all the already-developed cycle estimates can be made uniform. Once such a neighborhood is propagated through one full cycle, the nonempty tame class required by the Schauder program is in hand.

> **Proposition (Local seed-neighborhood continuation with stored-root persistence).**
> Assume the affine seed proposition above, and strengthen the horizon choice slightly to
> $$
> h>\frac{2X_\ast}{c_f-u_{\mathrm{seed}}}.
> $$
> Then there exist constants
> $$
> 0<\varepsilon_{\mathrm{loc}}<\min\!\left\{\frac{u_{\mathrm{seed}}}{2},\,c_f-u_{\mathrm{seed}}\right\},
> \qquad
> \nu_{\mathrm{loc}}>0,
> \qquad
> \tau_{\mathrm{loc}}>0,
> $$
> and a nonempty subclass
> $$
> \mathcal{C}^{\mathrm{seed,loc}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
> $$
> such that for every
> $$
> \phi\in \mathcal{C}^{\mathrm{seed,loc}}_{X_\ast,\eta}
> $$
> one has:
> 1. **strict stored sub-field-speed bound:**
>    $$
>    |\dot\phi(\theta)|\le u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}}<c_f
>    \qquad
>    \text{for }\theta\in[-h,0];
>    $$
> 2. **absence of exact same-side self roots on the stored interval:**
>    there is no
>    $$
>    \theta_s\in[-h,0)
>    $$
>    such that
>    $$
>    |\phi(0)-\phi(\theta_s)|=c_f(0-\theta_s);
>    $$
> 3. **unique simple stored partner root:**
>    there exists a unique
>    $$
>    \theta_p(\phi)\in[-h,0)
>    $$
>    satisfying
>    $$
>    \phi(0)+\phi(\theta_p)=c_f(0-\theta_p),
>    $$
>    and its Jacobian obeys
>    $$
>    J_p(\phi;\theta_p)\ge \nu_{\mathrm{loc}}>0;
>    $$
> 4. **short-time forward continuation:**
>    if the dual-mollified vector field is locally Lipschitz on the stored-root branch determined above, then the history
>    $$
>    \phi
>    $$
>    admits a unique forward continuation on
>    $$
>    [0,\tau_{\mathrm{loc}}]
>    $$
>    with continuous dependence on the initial history in the
>    $$
>    C^1([-h,0])
>    $$
>    topology.
>
> In particular, the first item of the seed-propagation ladder holds on a nonempty neighborhood.

Proof sketch.
Because
$$
h>\frac{2X_\ast}{c_f-u_{\mathrm{seed}}}
$$
there is a positive slack
$$
\delta_h
\equiv
(c_f-u_{\mathrm{seed}})h-2X_\ast
>0
$$
Choose
$$
\varepsilon_{\mathrm{loc}}>0
$$
small enough that
$$
u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}}<c_f
$$
and
$$
\varepsilon_{\mathrm{loc}}h<\delta_h
$$
Let
$$
\mathcal{C}^{\mathrm{seed,loc}}_{X_\ast,\eta}
\equiv
\left\{
\phi\in \mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
\;\middle|\;
\|\phi-\psi_{\mathrm{seed}}\|_{C^1([-h,0])}\le \varepsilon_{\mathrm{loc}}
\right\}
$$
This set is nonempty because it contains
$$
\psi_{\mathrm{seed}}
$$

For any
$$
\phi\in \mathcal{C}^{\mathrm{seed,loc}}_{X_\ast,\eta}
$$
the derivative bound gives
$$
|\dot\phi(\theta)|
\le
u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}}
<c_f
$$
on
$$
[-h,0]
$$
Now suppose a same-side self root
$$
\theta_s<0
$$
 existed. By the mean value theorem,
$$
|\phi(0)-\phi(\theta_s)|
\le
(u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}})(0-\theta_s)
<
c_f(0-\theta_s)
$$
contradicting the exact root equation. Hence no exact same-side self root exists on the stored interval.

For the partner root, define
$$
F_\phi(\theta)\equiv \phi(0)+\phi(\theta)+c_f\theta
$$
Then
$$
F_\phi(0)=2X_\ast>0
$$
while
$$
F_\phi(-h)
\le
X_\ast+\bigl(X_\ast+u_{\mathrm{seed}}h+\varepsilon_{\mathrm{loc}}h\bigr)-c_f h
=
2X_\ast-(c_f-u_{\mathrm{seed}}-\varepsilon_{\mathrm{loc}})h
<
0
$$
by the choice of
$$
\varepsilon_{\mathrm{loc}}
$$
Moreover,
$$
F_\phi'(\theta)=\dot\phi(\theta)+c_f
\ge
c_f-(u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}})
>0
$$
so
$$
F_\phi
$$
is strictly increasing. Therefore it has a unique zero
$$
\theta_p(\phi)\in[-h,0)
$$
At that root,
$$
J_p(\phi;\theta_p)
=
1+\frac{\dot\phi(\theta_p)}{c_f}
\ge
1-\frac{u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}}}{c_f}
\equiv
\nu_{\mathrm{loc}}
>0
$$

Finally, on this branch pattern the dual-mollified force law has one simple stored partner root and no exact same-side self roots on the initial history. Under the stated local Lipschitz hypothesis, standard local existence and continuous-dependence theory for functional differential equations yields a unique forward continuation on a short interval
$$
[0,\tau_{\mathrm{loc}}]
$$
This proves the proposition.

> **Proposition (Seed-neighborhood collapse control under a uniform inward bracket).**
> Let
> $$
> \mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,loc}}_{X_\ast,\eta}
> $$
> be a nonempty subclass. Assume there exist constants
> $$
> 0<a_-^{\mathrm{seed}}\le a_+^{\mathrm{seed}},
> \qquad
> \nu_{\mathrm{coll}}>0,
> \qquad
> A_{\mathrm{coll}}>0,
> $$
> such that for every
> $$
> \psi\in \mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}
> $$
> the corresponding forward trajectory satisfies on its pre-crossing leg:
> 1. the two-sided inward acceleration bracket
>    $$
>    -a_+^{\mathrm{seed}}
>    \le
>    \frac{d^2X}{dT^2}(T;\psi)
>    \le
>    -a_-^{\mathrm{seed}}<0;
>    $$
> 2. the acceleration ceiling
>    $$
>    |\frac{d^2X}{dT^2}(T;\psi)|\le A_{\mathrm{coll}};
>    $$
> 3. and the active pre-crossing roots satisfy the uniform transversality bound
>    $$
>    |J_p|\ge \nu_{\mathrm{coll}},
>    \qquad
>    |J_s|\ge \nu_{\mathrm{coll}}.
>    $$
>
> Then:
> 1. every
>    $$
>    \psi\in \mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}
>    $$
>    reaches the origin in finite time, with the uniform bound
>    $$
>    T_{\mathrm{cross}}(\psi)
>    \le
>    \sqrt{\frac{2X_\ast}{a_-^{\mathrm{seed}}}};
>    $$
> 2. the pre-crossing tube bounds
>    $$
>    0\le X(T;\psi)\le X_{\mathrm{seed},\max},
>    \qquad
>    |\frac{dX}{dT}(T;\psi)|\le U_{\mathrm{seed},\max},
>    \qquad
>    |\frac{d^2X}{dT^2}(T;\psi)|\le A_{\mathrm{coll}}
>    $$
>    hold on the collapse leg for suitable class constants
>    $$
>    X_{\mathrm{seed},\max},
>    \qquad
>    U_{\mathrm{seed},\max};
>    $$
> 3. and if one chooses constants
>    $$
>    V_{\min}^{\mathrm{seed}},
>    \qquad
>    V_{\max}^{\mathrm{seed}}
>    $$
>    satisfying the uniform speed-window inequalities from Lemma 7 for every admissible section speed in
>    $$
>    \left[\frac{u_{\mathrm{seed}}}{2},\,u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}}\right],
>    $$
>    then the collapse-to-crossing control theorem applies on
>    $$
>    \mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}.
>    $$

Proof sketch.
For every
$$
\psi\in \mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}
$$
the lower inward acceleration bound implies finite-time crossing by Lemma 6, yielding the displayed uniform bound on
$$
T_{\mathrm{cross}}(\psi)
$$
The two-sided acceleration bracket and the section-speed interval inherited from
$$
\mathcal{C}^{\mathrm{seed,loc}}_{X_\ast,\eta}
$$
allow Lemma 7 to be applied with
$$
u_0\in
\left[\frac{u_{\mathrm{seed}}}{2},\,u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}}\right]
$$
This produces a class-uniform crossing-speed window once
$$
V_{\min}^{\mathrm{seed}},
\qquad
V_{\max}^{\mathrm{seed}}
$$
are chosen to dominate the resulting comparison bounds.

Finally, Lemma 8 upgrades the monotone inbound motion, the crossing-time bound, and the acceleration ceiling to the stated position-speed-acceleration tube bounds on the entire collapse leg. Together with the assumed Jacobian lower bound, these are exactly the ingredients required by the collapse-to-crossing theorem. Hence that theorem applies uniformly on
$$
\mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}
$$

> **Proposition (Seed-neighborhood realization of the explicit inner recapture regime).**
> Let
> $$
> \mathcal{C}^{\mathrm{seed,in}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}
> $$
> be a nonempty subclass on which the collapse-to-crossing control theorem applies with uniform crossing-speed window
> $$
> V_{\min}^{\mathrm{seed}}
> \le
> -\frac{dX}{dT}(T_{\mathrm{cross}};\psi)
> \le
> V_{\max}^{\mathrm{seed}}
> \qquad
> \text{for every }
> \psi\in \mathcal{C}^{\mathrm{seed,in}}_{X_\ast,\eta}.
> $$
> Assume further that the crossing histories issued from this class satisfy the admissible-crossing hypotheses with the same class constants entering Proposition `Explicit short-window recapture regime`, and that
> $$
> V_{\max}^{\mathrm{seed}}
> <
> \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
> -
> \frac{\overline A_s^\rho\,\epsilon_c}{2\beta_{p,\max}},
> $$
> together with
> $$
> \tau_\epsilon=\frac{\epsilon_c}{2\beta_{p,\max}}\le \tau_1,
> \qquad
> \eta\le \frac{\epsilon_c}{4c_f C_p},
> \qquad
> \epsilon_c\le \frac{\beta_{p,\max}^2}{c_f C_p}.
> $$
> Then every first crossing launched from
> $$
> \mathcal{C}^{\mathrm{seed,in}}_{X_\ast,\eta}
> $$
> lies in the explicit short-window recapture regime, and the corresponding post-crossing branch turns around on the class-uniform window
> $$
> [0,\tau_\epsilon].
> $$

Proof sketch.
By the collapse-to-crossing theorem, every
$$
\psi\in \mathcal{C}^{\mathrm{seed,in}}_{X_\ast,\eta}
$$
reaches a crossing history inside the admissible crossing subclass and with outgoing radial speed at most
$$
V_{\max}^{\mathrm{seed}}
$$
The displayed inequality is exactly the sufficient recapture condition from Proposition `Explicit short-window recapture regime`, with
$$
V_{\max}
$$
there replaced by the seed-neighborhood crossing-speed bound
$$
V_{\max}^{\mathrm{seed}}
$$
The three displayed small-window inequalities guarantee the same choice
$$
\tau_\epsilon=\frac{\epsilon_c}{2\beta_{p,\max}}
$$
is admissible. Therefore Proposition `Explicit short-window recapture regime` applies uniformly to every first crossing issued from
$$
\mathcal{C}^{\mathrm{seed,in}}_{X_\ast,\eta}
$$
yielding a class-uniform post-crossing turnaround on
$$
[0,\tau_\epsilon]
$$

This proposition closes the inner half of the seed-propagation program at the regime level: once the seed neighborhood is shrunk far enough that its collapse phase lands uniformly in the Goldilocks crossing window, the local post-crossing recapture mechanism becomes available without any additional pointwise tuning.

> **Proposition (Seed-neighborhood realization of the unified outer-turn regime).**
> Let
> $$
> \mathcal{C}^{\mathrm{seed,out}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,in}}_{X_\ast,\eta}
> $$
> be a nonempty subclass such that the post-crossing recapture, return-half, and outer-branch delayed-geometry estimates developed later in the note hold uniformly on the corresponding trajectories. Assume in particular that for every
> $$
> \psi\in \mathcal{C}^{\mathrm{seed,out}}_{X_\ast,\eta}
> $$
> there is a trimmed apocenter window
> $$
> I_{\mathrm{deep}}(\psi)=[T_a(\psi)+\tau_{\mathrm{deep}},\,T_b(\psi)]
> $$
> on which the unified trimmed-apocenter outer-turn criterion is applicable with the same class constants
> $$
> \underline A_p^{\mathrm{out}},
> \qquad
> \tau_{\mathrm{deep}},
> \qquad
> \sigma_{\mathrm{out}},
> \qquad
> a_{z}^{\mathrm{out}},
> \qquad
> a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}>0.
> $$
> Assume moreover that the explicit inequalities
> $$
> z\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
> -
> \frac{a_{z}^{\mathrm{out}}}{2}
> \big(T_a+\tau_{\mathrm{deep}}-T_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
> <0,
> $$
> $$
> \underline A_p^{\mathrm{out}}
> -
> \frac{\kappa\epsilon^2}{c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
> -
> \frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
> \sigma_{\mathrm{out}}\epsilon_c^2}
> \ge
> a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}>0
> $$
> hold uniformly on that class.
>
> Then every trajectory issued from
> $$
> \mathcal{C}^{\mathrm{seed,out}}_{X_\ast,\eta}
> $$
> satisfies the outer-turn recapture mechanism uniformly: the trimmed-apocenter acceleration obeys
> $$
> \frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
> \qquad
> \text{for }T\in I_{\mathrm{deep}}(\psi),
> $$
> and, if
> $$
> |I_{\mathrm{deep}}(\psi)|
> \ge
> \frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}},
> $$
> then a finite outer turn occurs on or just beyond the trimmed apocenter window for every member of the class.

Proof sketch.
By assumption, the same uniform constants entering the outer-turn layer apply to every trajectory launched from
$$
\mathcal{C}^{\mathrm{seed,out}}_{X_\ast,\eta}
$$
The first displayed inequality is exactly the outbound-level exclusion condition from the
$$
z
$$
-descent layer, while the second displayed inequality is the refined trimmed-apocenter force margin. Therefore the unified trimmed-apocenter outer-turn criterion applies uniformly across the class.

It follows that every trajectory on the seed-out neighborhood has:

- outbound-level exclusion on the trimmed apocenter window,
- deep-past same-side root localization onto the pre-crossing inbound leg,
- the refined deep-past suppression bound,
- and the inward acceleration margin
  $$
  \frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
  $$
  on
  $$
  I_{\mathrm{deep}}(\psi)
  $$

The final turning claim is then exactly the conclusion of the unified trimmed-apocenter criterion once the window length dominates
$$
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}}
$$

This proposition closes the outer half of the seed-propagation program at the regime level: once the seed neighborhood is small enough that the outer delayed geometry and trimmed-apocenter bounds are uniform, the outer-turn mechanism becomes class-uniform with no further history-by-history tuning.

> **Proposition (Returned-history reentry from uniform seed-cycle bounds).**
> Let
> $$
> \mathcal{C}^{\mathrm{seed,ret}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,out}}_{X_\ast,\eta}
> $$
> be a nonempty subclass such that:
> 1. the collapse-to-crossing control theorem applies uniformly on this class;
> 2. the seed-neighborhood realization of the explicit inner recapture regime applies uniformly on this class;
> 3. the seed-neighborhood realization of the unified outer-turn regime applies uniformly on this class;
> 4. the turn-to-section return lemmas apply uniformly on this class with class constants
>    $$
>    X_{\mathrm{out},\max}^{\mathrm{seed}},
>    \qquad
>    U_{\mathrm{sec},\max}^{\mathrm{seed}},
>    \qquad
>    A_{\mathrm{cyc},\max}^{\mathrm{seed}},
>    \qquad
>    T_{\mathrm{cyc},\max}^{\mathrm{seed}};
>    $$
> 5. and the returned-history tameness estimates hold uniformly on this class.
>
> Assume moreover that the envelope parameters satisfy
> $$
> X_{\max}\ge \max\{X_\ast,X_{\mathrm{out},\max}^{\mathrm{seed}}\},
> $$
> $$
> U_{\max}\ge \max\{V_{\max}^{\mathrm{seed}},U_{\mathrm{sec},\max}^{\mathrm{seed}}\},
> $$
> $$
> A_{\max}\ge A_{\mathrm{cyc},\max}^{\mathrm{seed}},
> \qquad
> T_{\max}\ge T_{\mathrm{cyc},\max}^{\mathrm{seed}},
> \qquad
> h\ge \frac{2X_{\max}}{c_f}.
> $$
>
> Then
> $$
> P_\eta(\psi)\in \mathcal{C}_{X_\ast,\eta}
> \qquad
> \text{for every }
> \psi\in \mathcal{C}^{\mathrm{seed,ret}}_{X_\ast,\eta}.
> $$
> If, in addition, the same stored-history Jacobian, root-count, and local continuation bounds that define the seed-side propagation class persist on the returned segment, then after shrinking once more if necessary there exists a nonempty forward-propagation subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,ret}}_{X_\ast,\eta}
> $$
> such that
> $$
> P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}\big)
> \subseteq
> \mathcal{C}_{X_\ast,\eta}.
> $$

Proof sketch.
Items 1-3 provide the full dynamical cycle structure:

- finite-time first crossing with controlled speed,
- class-uniform inner turnaround after the first crossing,
- class-uniform outer turnaround on the trimmed apocenter window.

Item 4 then supplies the section-return consequences from the return-half layer:
$$
0\le X(T;\psi)\le X_{\mathrm{out},\max}^{\mathrm{seed}},
\qquad
|\frac{dX}{dT}(T;\psi)|\le U_{\mathrm{sec},\max}^{\mathrm{seed}},
\qquad
|\frac{d^2X}{dT^2}(T;\psi)|\le A_{\mathrm{cyc},\max}^{\mathrm{seed}}
$$
through the full cycle and up to the first inbound section return, together with the time bound
$$
T(\psi)\le T_{\mathrm{cyc},\max}^{\mathrm{seed}}
$$
The displayed envelope inequalities therefore imply that the returned history segment fits inside the convex envelope
$$
\mathcal{C}_{X_\ast,\eta}
$$
Hence
$$
P_\eta(\psi)\in \mathcal{C}_{X_\ast,\eta}
$$
for every
$$
\psi\in \mathcal{C}^{\mathrm{seed,ret}}_{X_\ast,\eta}
$$

If the returned segment also preserves the same stored-history root simplicity, Jacobian lower bounds, and local continuation control that defined the seed-side propagation class, then one may shrink the class once more to a nonempty subclass
$$
\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
$$
on which those properties hold both before and after one full return. This gives exactly the forward-propagation tame class required by the invariant-envelope theorem.

This proposition closes the seed-propagation ladder at the nonvacuity level. The remaining logical step inside that ladder is to package the four seed-neighborhood propositions into a single nonempty tame-class theorem. The later Schauder route still requires the sampled tame-envelope certificate, coupled strict-slack arithmetic, and returned-sample preservation on the same domain.

> **Theorem (Nonempty tame class from seed propagation).**
> Assume:
> 1. the affine seed proposition and the nonempty section-level tame neighborhood corollary;
> 2. the proposition on local seed-neighborhood continuation with stored-root persistence;
> 3. the proposition on seed-neighborhood collapse control under a uniform inward bracket;
> 4. the proposition on seed-neighborhood realization of the explicit inner recapture regime;
> 5. the proposition on seed-neighborhood realization of the unified outer-turn regime;
> 6. and the proposition on returned-history reentry from uniform seed-cycle bounds.
>
> Then there exists a nonempty subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}_{X_\ast,\eta}
> $$
> such that:
> 1. the return map
>    $$
>    P_\eta
>    $$
>    is well defined on
>    $$
>    \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta};
>    $$
> 2. the collapse-to-crossing, inner-recapture, outer-turn, and return-half bounds all apply uniformly on this class;
> 3. the returned histories satisfy
>    $$
>    P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}\big)
>    \subseteq
>    \mathcal{C}_{X_\ast,\eta};
>    $$
> 4. and the invariant-envelope theorem is therefore nonvacuous on a genuine delayed history class.
>
> In particular, once the sampled certificate, coupled strict-slack inequalities, returned-sample preservation, continuity, and precompactness are verified on this same class, the Schauder route applies on a nonempty self-map domain.

Proof sketch.
The seed proposition and its neighborhood corollary provide a nonempty section-side class
$$
\mathcal{C}^{\mathrm{seed}}_{X_\ast,\eta}
\neq
\varnothing
$$
The local seed-neighborhood continuation proposition then produces a smaller nonempty subclass
$$
\mathcal{C}^{\mathrm{seed,loc}}_{X_\ast,\eta}
$$
on which the stored delayed geometry is simple and the forward flow is locally well defined. The collapse-control proposition shrinks again to a nonempty class
$$
\mathcal{C}^{\mathrm{seed,coll}}_{X_\ast,\eta}
$$
on which the collapse-to-crossing theorem applies uniformly.

The inner-regime proposition next yields a nonempty subclass
$$
\mathcal{C}^{\mathrm{seed,in}}_{X_\ast,\eta}
$$
whose first crossings lie uniformly in the explicit short-window recapture regime. The outer-regime proposition then yields a further nonempty subclass
$$
\mathcal{C}^{\mathrm{seed,out}}_{X_\ast,\eta}
$$
on which the trimmed-apocenter outer-turn mechanism applies uniformly. Finally, the returned-history reentry proposition produces a nonempty subclass
$$
\mathcal{C}^{\mathrm{seed,ret}}_{X_\ast,\eta}
$$
whose full-cycle images lie back in
$$
\mathcal{C}_{X_\ast,\eta}
$$

Choose
$$
\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
$$
to be any nonempty forward-propagation subclass supplied by the last proposition. By construction, all cycle estimates invoked in the invariant-envelope synthesis hold uniformly on this class, and the return map is well defined there. The inclusion
$$
P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}\big)
\subseteq
\mathcal{C}_{X_\ast,\eta}
$$
is exactly the conclusion of the returned-history reentry step. Hence the invariant-envelope theorem is nonvacuous on a genuine delayed history class.

This theorem reduces the seed-side nonvacuity gap to a bracket verification. The note contains:

- an explicit nonempty section-side seed, proved outright,
- a propagation ladder from that seed to a nonempty tame class, conditional on the uniform inward bracket $0<a_-^{\mathrm{seed}}\le a_+^{\mathrm{seed}}$,
- explicit inner and outer recapture regimes,
- invariant-envelope closure on a certified closed convex history set, conditional on the sampled certificate and coupled strict-slack arithmetic,
- and the stated precompactness, continuity, and Schauder route.

The bracket is where the receiver-normal conversion bites. On the inbound seed leg the retained partner image lies ahead of the receiver, so the lower bracket $a_-^{\mathrm{seed}}$ holds with the source-normal-only estimate as a conservative floor, while the upper bracket $a_+^{\mathrm{seed}}$ must carry the amplification ceiling $\Theta_+=1+U_{\max}/c_f$ from the weight conversion. Neither bracket may be inherited from a source-normal-only row.

The remaining work is therefore to discharge that bracket with the receiver-normal weight on the same retained record, verify the sampled tame-envelope certificate, verify the factorized coupled-corridor inequalities, and derive returned-sample budgets with strict sample slack, either through residual-plus-sensitivity control or direct boundary trapping, on that same class.

### Collapse-to-crossing target

The next concrete theorem should attack Step 1 of the cycle ladder directly. Its role is to connect tame inbound section data to the already-audited local post-crossing recapture theorem.

> **Target Theorem (Collapse-to-Crossing Control).**
> Fix a dual-mollified tame inbound subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}_{X_\ast,\eta}.
> $$
> Assume there exist class constants
> $$
> 0<V_{\min}\le V_{\max},
> \qquad
> A_{\max}>0,
> \qquad
> \nu>0,
> \qquad
> \tau_{\mathrm{cross},\max}>0
> $$
> such that every trajectory launched from
> $$
> \psi\in\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
> $$
> satisfies, on its inbound pre-crossing leg:
> 1. **finite-time crossing:**
>    there exists a first time
>    $$
>    T_{\mathrm{cross}}(\psi)\in(0,\tau_{\mathrm{cross},\max}]
>    $$
>    with
>    $$
>    X(T_{\mathrm{cross}}(\psi);\psi)=0;
>    $$
> 2. **crossing-speed window:**
>    the signed crossing speed obeys
>    $$
>    -V_{\max}\le \frac{dX}{dT}(T_{\mathrm{cross}}(\psi);\psi)\le -V_{\min}<-c_f;
>    $$
> 3. **tube preservation before crossing:**
>    $$
>    0\le X(T;\psi)\le X_{\max},
>    \qquad
>    |\frac{dX}{dT}(T;\psi)|\le U_{\max},
>    \qquad
>    |\frac{d^2X}{dT^2}(T;\psi)|\le A_{\max}
>    $$
>    for
>    $$
>    0\le T\le T_{\mathrm{cross}}(\psi);
>    $$
> 4. **pre-crossing transversality:**
>    all active roots on the pre-crossing leg satisfy the same Jacobian lower bound
>    $$
>    |J_p|\ge \nu,
>    \qquad
>    |J_s|\ge \nu.
>    $$
>
> Then the translated crossing history belongs to a uniform admissible crossing subclass of the type used by the local origin-crossing recapture theorem. In particular, the post-crossing local recapture theorem applies immediately after the crossing.

This theorem is the missing hinge between the inbound section map and the local post-crossing analysis. It says: if tame inbound histories reach the origin in finite time with a controlled super-field-speed crossing and without losing the tube bounds, then the entire local recapture machine developed earlier becomes available automatically.

### Collapse-to-crossing lemma ladder

The intended proof order for the collapse phase is:

1. **Inbound partner-dominance lemma.**
   Produce a class-uniform lower bound on inward partner acceleration on the pre-crossing leg.
2. **Finite-time crossing lemma.**
   Use the inward acceleration and inbound section sign to show that
   $$
   X(T)
   $$
   reaches zero in bounded time.
3. **Crossing-speed bounds.**
   Estimate the speed gain accumulated before the crossing and show the resulting crossing speed lies inside
   $$
   [V_{\min},V_{\max}]
   $$
4. **Pre-crossing tube preservation.**
   Verify that position, speed, and acceleration remain inside the tame envelope up to
   $$
   T_{\mathrm{cross}}
   $$
5. **Crossing-history admissibility.**
   Show that the translated history at
   $$
   T_{\mathrm{cross}}
   $$
   satisfies the sorting-map, Jacobian, and branch-count hypotheses needed by the local origin-crossing theorem.

Among these, the most delicate step is not finite-time arrival itself, but the quantitative crossing-speed window. The local post-crossing theorem needs the crossing to land in the Goldilocks regime:

- fast enough that the sorting map stays on the descending side and the caustic remains behind the trajectory,
- but not so fast that the integrated post-crossing partner impulse can no longer erase the outward radial speed.

So the collapse-to-crossing theorem is not merely a reachability statement. It is a controlled entry theorem into the local recapture regime.

**Lemma 5: Inbound partner-dominance lower bound.**
Assume the pre-crossing leg of a tame inbound trajectory satisfies:

- right exterior inbound geometry,
  $$
  0\le X(T)\le X_{\max},
  \qquad
  \frac{dX}{dT}(T)\le 0
  $$
- at least one inward exterior active partner branch for each
  $$
  T\in[0,T_{\mathrm{cross}}]
  $$
  with
  $$
  X(T)+X(T_p)>0,
  \qquad
  0\le X(T_p)\le X_{\max}
  $$
- the speed bound
  $$
  |\frac{dX}{dT}(T)|\le U_{\max}
  $$
- and the partner Jacobian transversality bound
  $$
  |J_p(T;T_p)|\ge \nu
  $$
  on every active partner root.

Then the partner contribution to the inward acceleration obeys the class-uniform lower bound
$$
A_p(T)\ge \underline A_p^{\mathrm{in}}
\equiv
\frac{\kappa\epsilon^2}{
\left(4X_{\max}^2+\epsilon_c^2\right)
\left(1+\frac{U_{\max}}{c_f}\right)
}
$$
Equivalently, the partner acceleration satisfies
$$
a_p(T)=-A_p(T)\le -\underline A_p^{\mathrm{in}}<0
$$

Proof.
Along the retained inward exterior partner channel, the delayed source remains on the opposite side of the current right-hand particle, so each retained partner contribution points inward and has the form
$$
a_p(T)=-A_p(T)
$$
For any retained active partner root
$$
T_p<T
$$
the delayed separation is
$$
r_p(T;T_p)=X(T)+X(T_p)
$$
Because both the current and delayed positions lie in the tame position envelope,
$$
0\le X(T)\le X_{\max},
\qquad
0\le X(T_p)\le X_{\max}
$$
one has
$$
r_p(T;T_p)\le 2X_{\max}
$$
Hence the dual-mollified amplitude denominator satisfies
$$
r_p(T;T_p)^2+\epsilon_c^2\le 4X_{\max}^2+\epsilon_c^2
$$

On the same branch the 1D partner line-of-action sign is
$$
\hat r_p=+1
$$
so
$$
J_p(T;T_p)=1+\frac{\frac{dX}{dT}(T_p)}{c_f}
$$
Using the speed bound gives the crude upper estimate
$$
|J_p(T;T_p)|\le 1+\frac{U_{\max}}{c_f}
$$

The receiver-normal numerator on this row is, by the weight conversion,
$$
\frac{|D_{T,p}(T;T_p)|}{c_f}
=
\left|1-\frac{dX/dT(T)}{c_f}\right|
=
1+\frac{\left|dX/dT(T)\right|}{c_f}
\ge
1
$$
because $\hat r_p=+1$ while $\frac{dX}{dT}(T)\le0$: the retained partner image
lies **ahead** of the inbound receiver, so its branch strength is amplified. The
inbound partner lower bound therefore needs no receiver-normal penalty, and the
source-normal-only estimate is a valid, merely conservative, floor.

Therefore each retained active partner branch contributes at least
$$
\kappa\epsilon^2
\frac{W_p^{\mathrm{rec}}(T;T_p)}{
r_p(T;T_p)^2+\epsilon_c^2
}
=
\kappa\epsilon^2
\frac{|D_{T,p}|/c_f}{
\left(r_p(T;T_p)^2+\epsilon_c^2\right)|J_p(T;T_p)|
}
\ge
\frac{\kappa\epsilon^2}{
\left(4X_{\max}^2+\epsilon_c^2\right)
\left(1+\frac{U_{\max}}{c_f}\right)
}
$$
Since at least one inward exterior partner branch is active, summing over the retained active partner roots yields
$$
A_p(T)\ge \underline A_p^{\mathrm{in}}
$$
which proves the lemma.

**Lemma 6: Finite-time crossing under a net inward acceleration floor.**
Assume the pre-crossing leg starts from the inbound section
$$
X(0)=X_\ast>0,
\qquad
\frac{dX}{dT}(0)\le 0
$$
and suppose there exists a constant
$$
a_{\mathrm{in}}>0
$$
such that the full pre-crossing acceleration obeys
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in}}
\qquad
\text{for }0\le T\le T_{\mathrm{cross}}
$$
Then the trajectory reaches the origin in finite time, with
$$
T_{\mathrm{cross}}
\le
\sqrt{\frac{2X_\ast}{a_{\mathrm{in}}}}
$$

In particular, a sufficient realization is
$$
A_s^{\mathrm{in}}(T)-A_s^{\mathrm{out}}(T)
\le
\theta\,\underline A_p^{\mathrm{in}}
\qquad
\text{for }0\le T\le T_{\mathrm{cross}}
$$
for some
$$
0\le \theta<1
$$
since then
$$
\frac{d^2X}{dT^2}(T)
=
-A_p(T)-A_s^{\mathrm{out}}(T)+A_s^{\mathrm{in}}(T)
\le
-(1-\theta)\underline A_p^{\mathrm{in}}
\equiv
-a_{\mathrm{in}}
$$

Proof.
Integrating the acceleration bound once gives
$$
\frac{dX}{dT}(T)
\le
\frac{dX}{dT}(0)-a_{\mathrm{in}}T
\le
-a_{\mathrm{in}}T
$$
because
$$
\frac{dX}{dT}(0)\le 0
$$
Integrating again from
$$
X(0)=X_\ast
$$
yields
$$
X(T)
\le
X_\ast+\frac{dX}{dT}(0)T-\frac{a_{\mathrm{in}}}{2}T^2
\le
X_\ast-\frac{a_{\mathrm{in}}}{2}T^2
$$
Therefore
$$
X(T)\le 0
$$
whenever
$$
T\ge \sqrt{\frac{2X_\ast}{a_{\mathrm{in}}}}
$$
By continuity of the trajectory, there is a first crossing time
$$
T_{\mathrm{cross}}\in
\left(0,\sqrt{\frac{2X_\ast}{a_{\mathrm{in}}}}\right]
$$
such that
$$
X(T_{\mathrm{cross}})=0
$$
This proves the lemma.

**Lemma 7: Crossing-speed bounds under two-sided acceleration control.**
Assume the pre-crossing leg starts from
$$
X(0)=X_\ast>0,
\qquad
\frac{dX}{dT}(0)=-u_0,
\qquad
u_0\ge 0
$$
and suppose there exist positive constants
$$
0<a_-\le a_+
$$
such that
$$
-a_+\le \frac{d^2X}{dT^2}(T)\le -a_-
\qquad
\text{for }0\le T\le T_{\mathrm{cross}}
$$
Define the quadratic comparison roots
$$
\tau_\pm
\equiv
\frac{\sqrt{u_0^2+2a_\pm X_\ast}-u_0}{a_\pm}
$$
Then the crossing time satisfies
$$
\tau_+\le T_{\mathrm{cross}}\le \tau_-
$$
and the crossing speed obeys
$$
u_0+a_-\tau_+
\le
-\frac{dX}{dT}(T_{\mathrm{cross}})
\le
u_0+a_+\tau_-
$$

In particular, if the class constants satisfy
$$
V_{\min}\le u_0+a_-\tau_+,
\qquad
u_0+a_+\tau_-\le V_{\max}
$$
then the crossing lands in the Goldilocks speed window
$$
V_{\min}\le -\frac{dX}{dT}(T_{\mathrm{cross}})\le V_{\max}
$$

Proof.
Integrating the two-sided acceleration bound gives
$$
-u_0-a_+T
\le
\frac{dX}{dT}(T)
\le
-u_0-a_-T
$$
Integrating again yields the quadratic comparison bounds
$$
X_\ast-u_0 T-\frac{a_+}{2}T^2
\le
X(T)
\le
X_\ast-u_0 T-\frac{a_-}{2}T^2
$$

Let
$$
q_\pm(T)\equiv X_\ast-u_0 T-\frac{a_\pm}{2}T^2
$$
Each $q_\pm$ has a unique positive root, namely
$$
\tau_\pm
=
\frac{\sqrt{u_0^2+2a_\pm X_\ast}-u_0}{a_\pm}
$$
Because
$$
X(T)\le q_-(T)
$$
the crossing must occur no later than the first time the upper comparison reaches zero:
$$
T_{\mathrm{cross}}\le \tau_-
$$
Likewise,
$$
X(T)\ge q_+(T)
$$
so the trajectory cannot cross before the lower comparison reaches zero:
$$
T_{\mathrm{cross}}\ge \tau_+
$$
Hence
$$
\tau_+\le T_{\mathrm{cross}}\le \tau_-
$$

Evaluating the velocity bounds at the crossing time gives
$$
-\frac{dX}{dT}(T_{\mathrm{cross}})
\ge
u_0+a_- T_{\mathrm{cross}}
\ge
u_0+a_-\tau_+
$$
and
$$
-\frac{dX}{dT}(T_{\mathrm{cross}})
\le
u_0+a_+ T_{\mathrm{cross}}
\le
u_0+a_+\tau_-
$$
This proves the claimed crossing-speed bracket.

**Lemma 8: Pre-crossing tube preservation from monotonicity and bounded acceleration.**
Assume the pre-crossing leg starts from the inbound section
$$
X(0)=X_\ast,
\qquad
\frac{dX}{dT}(0)=-u_0,
\qquad
0\le u_0\le U_{\mathrm{in}}
$$
with
$$
0<X_\ast\le X_{\max}
$$
Assume moreover that on
$$
[0,T_{\mathrm{cross}}]
$$
the trajectory satisfies:

- inward monotonicity,
  $$
  \frac{dX}{dT}(T)\le 0
  $$
- bounded crossing time,
  $$
  T_{\mathrm{cross}}\le \tau_{\mathrm{cross},\max}
  $$
- and a uniform acceleration bound,
  $$
  |\frac{d^2X}{dT^2}(T)|\le A_{\max}
  $$

If
$$
U_{\mathrm{in}}+A_{\max}\tau_{\mathrm{cross},\max}\le U_{\max}
$$
then the full pre-crossing tube bounds hold:
$$
0\le X(T)\le X_{\max},
\qquad
|\frac{dX}{dT}(T)|\le U_{\max},
\qquad
|\frac{d^2X}{dT^2}(T)|\le A_{\max}
\qquad
\text{for }0\le T\le T_{\mathrm{cross}}
$$

Proof.
Because
$$
\frac{dX}{dT}(T)\le 0
\qquad
\text{for }0\le T\le T_{\mathrm{cross}}
$$
the position is nonincreasing on the pre-crossing leg. Since the first crossing occurs at
$$
X(T_{\mathrm{cross}})=0
$$
one has
$$
0\le X(T)\le X(0)=X_\ast\le X_{\max}
\qquad
\text{for }0\le T\le T_{\mathrm{cross}}
$$

For the velocity, the acceleration bound gives
$$
|\frac{dX}{dT}(T)-\frac{dX}{dT}(0)|
\le
\int_0^T |\frac{d^2X}{dT^2}(S)|\,dS
\le
A_{\max} T
\le
A_{\max}\tau_{\mathrm{cross},\max}
$$
Therefore
$$
|\frac{dX}{dT}(T)|
\le
|\frac{dX}{dT}(0)|+A_{\max}\tau_{\mathrm{cross},\max}
\le
U_{\mathrm{in}}+A_{\max}\tau_{\mathrm{cross},\max}
\le
U_{\max}
$$
The acceleration bound is already part of the hypotheses, so the full tube estimate follows.

This lemma does not by itself control Jacobian transversality or branch-count growth. It isolates the easier kinematic part of tube preservation: once monotone inbound motion, bounded crossing time, and bounded acceleration are known, the position-speed tube closes automatically up to the crossing.

**Lemma 9: Crossing-history admissibility.**
Let
$$
\psi\in \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
$$
be an inbound history for which the pre-crossing leg satisfies Lemmas 6-8. Let
$$
T_{\mathrm{cross}}=T_{\mathrm{cross}}(\psi)
$$
denote the first crossing time and define the translated crossing history
$$
\phi_{\mathrm{cross}}(\theta)
\equiv
X(T_{\mathrm{cross}}+\theta;\psi),
\qquad
\theta\in[-h,0]
$$
Assume, in addition, that the pre-crossing collapse provides:

- a crossing-speed window
  $$
  V_{\min}\le -\frac{dX}{dT}(T_{\mathrm{cross}})\le V_{\max},
  \qquad
  V_{\min}>c_f
  $$
- a stored-past sorting-map geometry with class-uniform data
  $$
  T_{\mathrm{zero}}<T_{\mathrm{hinge}}<0,
  \qquad
  \delta_w(\phi_{\mathrm{cross}};\gamma_w)\ge \delta_{w,\min}
  $$
- sub-field-speed source transversality on the pre-hinge portion of the translated history,
  $$
  \dot\phi_{\mathrm{cross}}(\theta)\ge -c_f+\nu
  \qquad
  \text{for }\theta\in[-h,T_{\mathrm{zero}}]
  $$
- and the same class-uniform acceleration and root-count bounds used in the definition of
  $$
  \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}
  $$

If
$$
\eta<\frac{\delta_{w,\min}}{2},
\qquad
h\ge \frac{2X_{\max}}{c_f}
$$
then
$$
\phi_{\mathrm{cross}}\in \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}
$$

In particular, the local origin-crossing recapture theorem applies to the translated crossing history.

Proof.
By construction of the translated segment,
$$
\phi_{\mathrm{cross}}(0)=X(T_{\mathrm{cross}})=0
$$
The crossing-speed hypothesis gives
$$
\dot\phi_{\mathrm{cross}}(0)=\frac{dX}{dT}(T_{\mathrm{cross}})
\in[-V_{\max},-V_{\min}]
$$
with
$$
V_{\min}>c_f
$$
which is exactly the origin-crossing speed requirement of the admissible crossing subclass.

The stored-past sorting-map assumptions are likewise phrased directly on the translated history
$$
\phi_{\mathrm{cross}}
$$
They therefore supply the required times
$$
T_{\mathrm{zero}}<T_{\mathrm{hinge}}<0
$$
the interior compact-subinterval gap
$$
\delta_w(\phi_{\mathrm{cross}};\gamma_w)\ge \delta_{w,\min}
$$
and the sub-field-speed source transversality bound
$$
\dot\phi_{\mathrm{cross}}(\theta)\ge -c_f+\nu
\qquad
\text{for }\theta\in[-h,T_{\mathrm{zero}}]
$$
Because
$$
\eta<\frac{\delta_{w,\min}}{2}
$$
the shell-width condition required in the local post-crossing theorem is also satisfied.

The acceleration and root-count hypotheses are inherited by assumption from the pre-crossing tame tube and the translated-history bounds. Finally, the horizon choice
$$
h\ge \frac{2X_{\max}}{c_f}
$$
ensures that all causal delays compatible with the position envelope fit inside the stored history window.

Thus every defining condition of
$$
\mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}
$$
holds for
$$
\phi_{\mathrm{cross}}
$$
which proves the lemma.

This lemma isolates the exact last handoff in the proof architecture. The collapse phase does not itself prove local recapture; it only has to deliver the trajectory into the admissible crossing subclass where the already-established post-crossing theorem takes over.

### Pre-crossing caustic-transit target

The collapse-to-crossing ladder has its kinematic part in place. The remaining hard issue is delayed geometry, but it must be framed correctly. Because the inbound speed rises from a sub-field-speed regime to a crossing speed strictly larger than $c_f$, the trajectory must pass through the hinge
$$
\frac{dX}{dT}=-c_f
$$
At that hinge, the self-hit sorting map necessarily creates a self root, and the corresponding self Jacobian reaches
$$
J_s=0
$$
at the instant of birth. So the correct theorem target is not global self-root transversality on the whole pre-crossing leg. The correct target is a **controlled caustic transit**:

- the partner branch stays safely away from the caustic,
- the self branch is born at the hinge,
- the resulting inward impulse remains bounded in the dual-mollified model,
- and the self Jacobian recovers to a strictly positive lower bound before the origin crossing.

> **Target Theorem (Pre-crossing Caustic Transit and Recovery).**
> Fix a dual-mollified tame inbound subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
> \subseteq
> \mathcal{C}_{X_\ast,\eta}.
> $$
> Assume the pre-crossing leg from every
> $$
> \psi\in\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
> $$
> satisfies the kinematic hypotheses of Lemmas 5-8. Suppose moreover that there exist class constants
> $$
> \nu_p>0,
> \qquad
> \nu_s>0,
> \qquad
> N_{p,\max}\ge 1,
> \qquad
> N_{s,\max}\ge 1,
> \qquad
> \Delta V_{\mathrm{cau},\max}<\infty,
> \qquad
> \delta_{w,\min}>0
> $$
> such that on the entire pre-crossing leg:
> 1. **partner-root safety:** the active partner branch persists continuously and remains transversal,
>    $$
>    |J_p|\ge \nu_p;
>    $$
> 2. **hinge birth of the self branch:** exactly one principal self root is born when
>    $$
>    \frac{dX}{dT}=-c_f,
>    $$
>    and no uncontrolled branch proliferation occurs before the crossing;
> 3. **bounded caustic impulse:** the dual-mollified inward velocity gain contributed during the self-root birth and immediate caustic transit is bounded by
>    $$
>    \Delta V_{\mathrm{cau},\max};
>    $$
> 4. **post-hinge Jacobian recovery:** by the time of the origin crossing, the active self branch has receded into the sub-field-speed past strongly enough that
>    $$
>    |J_s|\ge \nu_s;
>    $$
> 5. **sorting-gap inheritance:** the translated crossing history satisfies
>    $$
>    \delta_w(\phi_{\mathrm{cross}};\gamma_w)\ge \delta_{w,\min}.
>    $$
>
> Then the collapse phase preserves the full delayed geometry needed by Lemma 9, and the translated crossing history lies in the admissible crossing subclass
> $$
> \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}.
> $$

This is the genuine delayed-geometry bottleneck behind the collapse phase. Lemmas 5-8 reduce the kinematic part of the infall to ordinary differential inequalities; the theorem above is what must control the compulsory self-root birth and show that it helps the collapse without destroying the Goldilocks crossing window.

### Pre-crossing propagation ladder

The intended proof order for this delayed-geometry step is:

1. **Partner-root safety lemma.**
   Show that the active partner branch persists continuously along the inbound leg and never reaches a caustic before the crossing.
2. **Hinge-birth lemma.**
   Prove that exactly one principal self root is born when the trajectory passes through
   $$
   \frac{dX}{dT}=-c_f
   $$
3. **Caustic-transit impulse bound.**
   Show that the dual-mollified self-root birth contributes only a bounded inward velocity kick
   $$
   \Delta V_{\mathrm{cau}}\le \Delta V_{\mathrm{cau},\max}
   $$
   and therefore does not destroy the Goldilocks crossing-speed upper bound.
4. **Root-count bound.**
   Show that the total number of active branches on the inbound leg remains bounded by class constants
   $$
   N_{p,\max},\quad N_{s,\max}
   $$
5. **Sorting-gap inheritance and Jacobian recovery.**
   Prove that by the time of the origin crossing the active self root has moved far enough into the sub-field-speed past that
   $$
   |J_s|\ge \nu_s
   $$
   and the translated crossing history inherits the compact-subinterval sorting gap needed by the local post-crossing theorem.

The first item is a partner-branch regularity statement. The second and third items explicitly embrace the self-root caustic instead of assuming it away. The fifth is the exact handoff needed to pass from the inbound collapse theorem to the local origin-crossing recapture theorem.

**Lemma 10: Partner-root safety on the inbound leg.**
Assume the pre-crossing leg satisfies:

- right exterior inbound geometry
  $$
  X(T)\ge 0,
  \qquad
  \frac{dX}{dT}(T)\le 0
  $$
- a unique hinge time
  $$
  T_{\mathrm{hinge}}\in(0,T_{\mathrm{cross}})
  $$
  with
  $$
  \frac{dX}{dT}(T_{\mathrm{hinge}})=-c_f
  $$
- and strict post-hinge super-field-speed infall
  $$
  \frac{dX}{dT}(T)<-c_f
  \qquad
  \text{for }T\in(T_{\mathrm{hinge}},T_{\mathrm{cross}}]
  $$

Define
$$
w(T)\equiv X(T)+c_f T,
\qquad
y(T)\equiv c_f T-X(T)
$$
Then the active partner root on the inbound leg is selected by
$$
w(T_p)=y(T),
\qquad
T_p<T
$$
Moreover:

1. the partner branch persists continuously on
   $$
   [0,T_{\mathrm{cross}}]
   $$
2. it remains strictly on the ascending side of the sorting map,
   $$
   T_p(T)<T_{\mathrm{hinge}}
   $$
3. and therefore the partner Jacobian stays strictly positive:
   $$
   J_p(T;T_p)=\frac{\frac{dw}{dT}(T_p)}{c_f}>0
   $$

Proof.
On the inbound leg,
$$
\frac{dy}{dT}(T)=c_f-\frac{dX}{dT}(T)\ge c_f>0
$$
so $y(T)$ is strictly increasing. Also,
$$
\frac{dw}{dT}(T)=\frac{dX}{dT}(T)+c_f
$$
which is positive before the hinge, zero at the hinge, and negative after the hinge. Hence
$$
w(T)
$$
has a strict maximum at
$$
T=T_{\mathrm{hinge}}
$$

It therefore suffices to show that
$$
y(T)<w(T_{\mathrm{hinge}})
\qquad
\text{for every }T\in[0,T_{\mathrm{cross}}]
$$
Since $y$ is increasing, it is enough to check this at the crossing time. Using
$$
X(T_{\mathrm{cross}})=0
$$
gives
$$
y(T_{\mathrm{cross}})=c_f T_{\mathrm{cross}}
$$
On the other hand,
$$
w(T_{\mathrm{hinge}})=X(T_{\mathrm{hinge}})+c_f T_{\mathrm{hinge}}
$$
By the mean value theorem and the strict post-hinge inequality
$$
\frac{dX}{dT}<-c_f
\qquad
\text{on }(T_{\mathrm{hinge}},T_{\mathrm{cross}}]
$$
one has
$$
X(T_{\mathrm{cross}})-X(T_{\mathrm{hinge}})
<
-c_f\,(T_{\mathrm{cross}}-T_{\mathrm{hinge}})
$$
Since
$$
X(T_{\mathrm{cross}})=0
$$
this rearranges to
$$
X(T_{\mathrm{hinge}})
>
c_f\,(T_{\mathrm{cross}}-T_{\mathrm{hinge}})
$$
hence
$$
w(T_{\mathrm{hinge}})
=
X(T_{\mathrm{hinge}})+c_f T_{\mathrm{hinge}}
>
c_f T_{\mathrm{cross}}
=
y(T_{\mathrm{cross}})
$$
Therefore
$$
y(T)<w(T_{\mathrm{hinge}})
$$
for all pre-crossing times, so the partner branch never reaches the hinge maximum.

Because
$$
w
$$
is strictly increasing on the ascending side, there is a unique solution
$$
T_p(T)<T_{\mathrm{hinge}}
$$
to
$$
w(T_p)=y(T)
$$
for each
$$
T\in[0,T_{\mathrm{cross}}]
$$
This gives continuous persistence of the partner branch. Finally, on that ascending side,
$$
\frac{dw}{dT}(T_p)>0
$$
so
$$
J_p(T;T_p)=\frac{\frac{dw}{dT}(T_p)}{c_f}>0
$$
Thus the partner branch remains safe from the caustic throughout the infall.

**Lemma 11: Hinge birth and uniqueness of the principal self root.**
Assume the pre-crossing leg satisfies a strict inward acceleration floor
$$
\frac{d^2X}{dT^2}(T)\le -a_-<0
\qquad
\text{for }0\le T\le T_{\mathrm{cross}}
$$
and define
$$
w(T)\equiv X(T)+c_f T
$$
Let
$$
T_{\mathrm{hinge}}
$$
be the unique time at which
$$
\frac{dX}{dT}(T_{\mathrm{hinge}})=-c_f
$$
Then:

1. $w$ is strictly concave on the pre-crossing interval,
2. $w$ has a unique global maximum at
   $$
   T=T_{\mathrm{hinge}}
   $$
3. for each
   $$
   T\in(T_{\mathrm{hinge}},T_{\mathrm{cross}}]
   $$
   there exists a unique self root
   $$
   T_s(T)<T_{\mathrm{hinge}}
   $$
   satisfying
   $$
   w(T_s)=w(T)
   $$
4. and this self branch is born at the hinge with
   $$
   \lim_{T\downarrow T_{\mathrm{hinge}}} T_s(T)=T_{\mathrm{hinge}},
   \qquad
   J_s(T;T_s)\to 0^+
   $$

Proof.
Differentiate twice:
$$
\frac{dw}{dT}(T)=\frac{dX}{dT}(T)+c_f,
\qquad
\frac{d^2w}{dT^2}(T)=\frac{d^2X}{dT^2}(T)
$$
By hypothesis,
$$
\frac{d^2w}{dT^2}(T)\le -a_-<0
$$
so
$$
w
$$
is strictly concave on the full pre-crossing interval. Hence
$$
\frac{dw}{dT}
$$
is strictly decreasing and can vanish at most once. Since
$$
\frac{dw}{dT}(T_{\mathrm{hinge}})=\frac{dX}{dT}(T_{\mathrm{hinge}})+c_f=0
$$
the hinge is the unique critical point of
$$
w
$$
and therefore its unique global maximum.

For
$$
T<T_{\mathrm{hinge}}
$$
the function
$$
w
$$
is strictly increasing, so no earlier time can satisfy
$$
w(T_s)=w(T)
$$
with
$$
T_s<T
$$
For
$$
T>T_{\mathrm{hinge}}
$$
strict concavity implies that
$$
w(T)<w(T_{\mathrm{hinge}})
$$
and because the ascending branch is strictly increasing up to the hinge, there is a unique
$$
T_s(T)<T_{\mathrm{hinge}}
$$
such that
$$
w(T_s)=w(T)
$$
This is the unique principal self root on the pre-crossing leg.

As
$$
T\downarrow T_{\mathrm{hinge}}
$$
continuity and uniqueness force
$$
T_s(T)\uparrow T_{\mathrm{hinge}}
$$
On the relevant outer-memory branch,
$$
J_s(T;T_s)=1+\frac{\frac{dX}{dT}(T_s)}{c_f}=\frac{\frac{dw}{dT}(T_s)}{c_f}
$$
Since
$$
T_s(T)<T_{\mathrm{hinge}}
$$
lies on the ascending side,
$$
\frac{dw}{dT}(T_s)>0
$$
so
$$
J_s(T;T_s)>0
$$
But as
$$
T_s(T)\uparrow T_{\mathrm{hinge}}
$$
one has
$$
\frac{dw}{dT}(T_s)\downarrow \frac{dw}{dT}(T_{\mathrm{hinge}})=0
$$
hence
$$
J_s(T;T_s)\to 0^+
$$
So the self branch is born exactly at the hinge and is unique.

**Lemma 12: Bounded caustic-transit impulse in the dual-mollified model.**
Fix a hinge-centered time window
$$
I_{\mathrm{cau}}
\equiv
[T_{\mathrm{hinge}}-\tau_{\mathrm{cau}},\,T_{\mathrm{hinge}}+\tau_{\mathrm{cau}}]
$$
on which the dual-mollified self interaction is evaluated through the regularized time-integral representation with:

- shell mollifier
  $$
  \delta_\eta
  $$
  bounded by
  $$
  \|\delta_\eta\|_\infty<\infty
  $$
- core mollifier
  $$
  \epsilon_c>0
  $$
- and memory horizon
  $$
  h>0
  $$

Assume the self integral on this window is taken only over the stored history
$$
T_0\in[T-h,T]
$$
Then the total inward velocity kick contributed by the self branch across the hinge window is finite and obeys the crude bound
$$
\Delta V_{\mathrm{cau}}
\le
\frac{2\kappa\epsilon^2\,h\,\tau_{\mathrm{cau}}\|\delta_\eta\|_\infty}{\epsilon_c^2}
\equiv
\Delta V_{\mathrm{cau},\max}
$$

In particular, the self-root birth at
$$
J_s=0
$$
does not produce an infinite velocity jump in the dual-mollified model.

Proof.
On the hinge window, evaluate the self contribution in the regularized integral form rather than the branch-sum form. By construction of the dual mollification, the self acceleration satisfies the absolute bound
$$
|a_s(T)|
\le
\kappa\epsilon^2
\int_{T-h}^{T}
\frac{\delta_\eta(\cdots)}{|X(T)-X(T_0)|^2+\epsilon_c^2}\,dT_0
$$
Because
$$
|X(T)-X(T_0)|^2+\epsilon_c^2\ge \epsilon_c^2
$$
and
$$
\delta_\eta(\cdots)\le \|\delta_\eta\|_\infty
$$
one obtains
$$
|a_s(T)|
\le
\kappa\epsilon^2
\int_{T-h}^{T}
\frac{\|\delta_\eta\|_\infty}{\epsilon_c^2}\,dT_0
=
\frac{\kappa\epsilon^2\,h\,\|\delta_\eta\|_\infty}{\epsilon_c^2}
$$
Integrating over the hinge window gives
$$
\Delta V_{\mathrm{cau}}
\le
\int_{I_{\mathrm{cau}}}|a_s(T)|\,dT
\le
\frac{\kappa\epsilon^2\,h\,\|\delta_\eta\|_\infty}{\epsilon_c^2}
\cdot
|I_{\mathrm{cau}}|
$$
Since
$$
|I_{\mathrm{cau}}|=2\tau_{\mathrm{cau}}
$$
this yields
$$
\Delta V_{\mathrm{cau}}
\le
\frac{2\kappa\epsilon^2\,h\,\tau_{\mathrm{cau}}\|\delta_\eta\|_\infty}{\epsilon_c^2}
\equiv
\Delta V_{\mathrm{cau},\max}
$$
Thus the caustic transit contributes a finite inward impulse in the dual-mollified model.

**Lemma 13: Post-hinge Jacobian recovery and sorting-gap inheritance.**
Assume the pre-crossing leg satisfies Lemmas 10-12, and let
$$
T_{\mathrm{cross}}
$$
denote the first origin crossing. Define
$$
w(T)\equiv X(T)+c_f T
$$
on the unshifted inbound leg, and let
$$
T_{\mathrm{zero}}<T_{\mathrm{hinge}}
$$
be the unique time satisfying
$$
w(T_{\mathrm{zero}})=w(T_{\mathrm{cross}})
$$
Assume moreover that on the ascending side of the sorting map one has the lower derivative bound
$$
\frac{dw}{dT}(T)\ge \nu_s>0
\qquad
\text{for }T\in[T_{\mathrm{zero}},T_{\mathrm{hinge}}-\gamma_w]
$$
for some
$$
\gamma_w>0
$$
Then:

1. the active self root at the crossing is exactly
   $$
   T_s(T_{\mathrm{cross}})=T_{\mathrm{zero}}
   $$
2. the recovered self Jacobian at the crossing satisfies
   $$
   J_s(T_{\mathrm{cross}};T_{\mathrm{zero}})
   =
   \frac{\frac{dw}{dT}(T_{\mathrm{zero}})}{c_f}
   \ge
   \frac{\nu_s}{c_f}
   $$
3. and the translated crossing history
   $$
   \phi_{\mathrm{cross}}(\theta)=X(T_{\mathrm{cross}}+\theta)
   $$
   inherits a compact-subinterval sorting gap:
   for every
   $$
   0<\gamma<\min\{T_{\mathrm{hinge}}-T_{\mathrm{zero}},\,T_{\mathrm{cross}}-T_{\mathrm{hinge}}\}
   $$
   the translated sorting function
   $$
   \widetilde w(\theta)
   \equiv
   \phi_{\mathrm{cross}}(\theta)+c_f\theta
   =
   w(T_{\mathrm{cross}}+\theta)-w(T_{\mathrm{cross}})
   $$
   satisfies
   $$
   \widetilde w(\theta)>0
   \qquad
   \text{for }\theta\in(T_{\mathrm{zero}}-T_{\mathrm{cross}},0)
   $$
   and therefore
   $$
   \delta_w(\phi_{\mathrm{cross}};\gamma)>0
   $$

Proof.
By Lemma 11, for each
$$
T\in(T_{\mathrm{hinge}},T_{\mathrm{cross}}]
$$
there exists a unique principal self root
$$
T_s(T)<T_{\mathrm{hinge}}
$$
such that
$$
w(T_s)=w(T)
$$
Evaluating this at the crossing time and using the defining property of
$$
T_{\mathrm{zero}}
$$
shows
$$
T_s(T_{\mathrm{cross}})=T_{\mathrm{zero}}
$$

On the relevant outer-memory branch,
$$
J_s(T_{\mathrm{cross}};T_{\mathrm{zero}})
=
1+\frac{\frac{dX}{dT}(T_{\mathrm{zero}})}{c_f}
=
\frac{\frac{dw}{dT}(T_{\mathrm{zero}})}{c_f}
$$
The assumed lower derivative bound on the ascending side therefore yields
$$
J_s(T_{\mathrm{cross}};T_{\mathrm{zero}})
\ge
\frac{\nu_s}{c_f}>0
$$
which is the desired post-hinge Jacobian recovery.

For the sorting-gap inheritance, define
$$
\widetilde w(\theta)=w(T_{\mathrm{cross}}+\theta)-w(T_{\mathrm{cross}})
$$
Then
$$
\widetilde w(0)=0
$$
and
$$
\widetilde w(T_{\mathrm{zero}}-T_{\mathrm{cross}})=0
$$
Because
$$
w(T)<w(T_{\mathrm{hinge}})
$$
for all
$$
T\neq T_{\mathrm{hinge}}
$$
and because the level
$$
w(T_{\mathrm{cross}})
$$
intersects the strictly concave graph of
$$
w
$$
exactly at
$$
T_{\mathrm{zero}}
\quad\text{and}\quad
T_{\mathrm{cross}}
$$
it follows that
$$
\widetilde w(\theta)>0
$$
for every
$$
\theta\in(T_{\mathrm{zero}}-T_{\mathrm{cross}},0)
$$
Restricting to any compact subinterval away from the two zeros, continuity yields a positive minimum, which is precisely the required compact-subinterval sorting gap
$$
\delta_w(\phi_{\mathrm{cross}};\gamma)>0
$$
This proves the lemma.

### Turn-to-section return target

Once the local post-crossing theorem has produced a turning point, the remaining analytic burden is to close the excursion back to the inbound section. This is the return-half analogue of the collapse-to-crossing theorem.

> **Target Theorem (Turn-to-Section Return).**
> Fix a dual-mollified tame crossing subclass
> $$
> \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}
> $$
> and suppose the local origin-crossing recapture theorem produces, for every admissible crossing history, a turning time
> $$
> T_{\mathrm{turn}}\le \tau_{\mathrm{env}}
> $$
> with
> $$
> \frac{d\rho}{dT}(T_{\mathrm{turn}})=0.
> $$
> Assume there exist class constants
> $$
> X_{\max},
> \qquad
> U_{\max},
> \qquad
> A_{\max},
> \qquad
> T_{\mathrm{ret},\max}>0
> $$
> such that for every post-turn branch:
> 1. **inward return after the turn:**
>    the trajectory re-enters toward the origin after
>    $$
>    T_{\mathrm{turn}},
>    $$
>    crosses the center a second time, reaches the reflected section state
>    $$
>    X=X_\ast,
>    \qquad
>    \frac{dX}{dT}>0,
>    $$
>    on the right exterior branch, and after one further outer turn returns to the section
>    $$
>    X=X_\ast
>    $$
>    as an inbound branch;
> 2. **bounded excursion on the return half:**
>    $$
>    0\le X(T)\le X_{\max}
>    \qquad
>    \text{for }T_{\mathrm{turn}}\le T\le T(\psi);
>    $$
> 3. **bounded speed and acceleration on the return half:**
>    $$
>    |\frac{dX}{dT}(T)|\le U_{\max},
>    \qquad
>    |\frac{d^2X}{dT^2}(T)|\le A_{\max}
>    \qquad
>    \text{for }T_{\mathrm{turn}}\le T\le T(\psi);
>    $$
> 4. **bounded return time:**
>    the first inbound section return satisfies
>    $$
>    0<T(\psi)-T_{\mathrm{turn}}\le T_{\mathrm{ret},\max};
>    $$
> 5. **bounded inbound section speed:**
>    $$
>    -\frac{dX}{dT}(T(\psi))\le U_{\max};
>    $$
> 6. **returned-history control:**
>    the translated segment
>    $$
>    X_{T(\psi)}
>    $$
>    satisfies the same acceleration, Jacobian, and branch-count bounds required by the tame envelope.
>
> Then the post-turn branch closes the full cycle back to the inbound section, and the return map
> $$
> P_\eta
> $$
> is well defined on the corresponding tame class with
> $$
> P_\eta(\psi)\in \mathcal{C}_{X_\ast,\eta}.
> $$

This theorem is the last missing dynamical segment of the cycle. The collapse-to-crossing theorem feeds the local recapture theorem; the turn-to-section return theorem feeds the invariant-envelope and Schauder steps.

### Turn-to-section return ladder

The intended proof order for the return half is:

1. **Post-turn inward-drive lemma.**
   Show that after the turning time the net delayed force drives the trajectory back toward the origin strongly enough to prevent outward re-escape.
2. **Second-crossing lemma.**
   Prove that the trajectory crosses the origin a second time in finite time after the turn.
3. **Reflected-section lemma.**
   Show that after the second crossing, the trajectory reaches
   $$
   X=X_\ast
   $$
   on the right exterior branch with
   $$
   \frac{dX}{dT}>0
   $$
4. **Outer-turn closure lemma.**
   Show that after one further outer turn on the right branch, the trajectory returns to
   $$
   X=X_\ast
   $$
   again on an inbound branch.
5. **Return-speed bound.**
   Estimate the inbound speed at the section and show
   $$
   -\frac{dX}{dT}(T(\psi))\le U_{\max}
   $$
6. **Returned-history tameness.**
   Prove that the translated return segment inherits the tame acceleration, Jacobian, and branch-count bounds.

The first, fourth, and fifth items are the real analytic bottlenecks on the return half. The middle two are reachability statements once the sign of the post-turn drive is controlled.

**Lemma 14: Post-turn inward-drive lemma.**
Let
$$
T_{\mathrm{turn}}
$$
be a turning time produced by the local origin-crossing recapture theorem, so that
$$
\rho(T_{\mathrm{turn}})=\rho_{\max}>0,
\qquad
\frac{d\rho}{dT}(T_{\mathrm{turn}})=0
$$
Assume there exists a post-turn window
$$
[T_{\mathrm{turn}},\,T_{\mathrm{turn}}+\tau_{\mathrm{ret}}]
$$
and a constant
$$
a_{\mathrm{ret}}>0
$$
such that on that window the radial acceleration satisfies
$$
\frac{d^2\rho}{dT^2}(T)\le -a_{\mathrm{ret}}
$$
Then:

1. the trajectory cannot re-escape outward on that window,
2. the radial speed becomes strictly inward immediately after the turn,
   $$
   \frac{d\rho}{dT}(T)\le -a_{\mathrm{ret}}(T-T_{\mathrm{turn}})
   \qquad
   \text{for }T\in[T_{\mathrm{turn}},\,T_{\mathrm{turn}}+\tau_{\mathrm{ret}}]
   $$
3. and the radius decreases monotonically there, with
   $$
   \rho(T)\le
   \rho_{\max}
   -
   \frac{a_{\mathrm{ret}}}{2}(T-T_{\mathrm{turn}})^2
   $$

In particular, a sufficient realization is
$$
A_p^\rho(T)-A_s^\rho(T)\ge a_{\mathrm{ret}}>0
\qquad
\text{for }T\in[T_{\mathrm{turn}},\,T_{\mathrm{turn}}+\tau_{\mathrm{ret}}]
$$
because then
$$
\frac{d^2\rho}{dT^2}(T)\le -a_{\mathrm{ret}}
$$

Proof.
Integrating the radial acceleration bound from the turning time gives
$$
\frac{d\rho}{dT}(T)
=
\frac{d\rho}{dT}(T_{\mathrm{turn}})
+
\int_{T_{\mathrm{turn}}}^{T}\frac{d^2\rho}{dT^2}(S)\,dS
\le
0-a_{\mathrm{ret}}(T-T_{\mathrm{turn}})
$$
which proves the velocity estimate and shows that
$$
\frac{d\rho}{dT}(T)<0
\qquad
\text{for }T>T_{\mathrm{turn}}
$$
Thus the trajectory moves strictly inward immediately after the turn and cannot re-escape outward on the stated window.

Integrating once more yields
$$
\rho(T)
=
\rho(T_{\mathrm{turn}})
+
\int_{T_{\mathrm{turn}}}^{T}\frac{d\rho}{dT}(S)\,dS
\le
\rho_{\max}
-
\frac{a_{\mathrm{ret}}}{2}(T-T_{\mathrm{turn}})^2
$$
which proves the monotone decrease of the radius on the post-turn window.

**Lemma 15: Finite-time second crossing after the turn.**
Assume the hypotheses of Lemma 14 and suppose, in addition, that the return window is long enough to satisfy
$$
\tau_{\mathrm{ret}}
\ge
\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}
$$
Then the trajectory reaches the center again in finite time: there exists
$$
T_{\mathrm{cross}}^{(2)}
\in
\left(
T_{\mathrm{turn}},
\,
T_{\mathrm{turn}}+\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}
\right]
$$
such that
$$
\rho\!\big(T_{\mathrm{cross}}^{(2)}\big)=0
$$

Equivalently, in signed coordinates the trajectory crosses the origin a second time by that time.

Proof.
Lemma 14 gives the comparison bound
$$
\rho(T)\le
\rho_{\max}
-
\frac{a_{\mathrm{ret}}}{2}(T-T_{\mathrm{turn}})^2
$$
for
$$
T\in[T_{\mathrm{turn}},\,T_{\mathrm{turn}}+\tau_{\mathrm{ret}}]
$$
Therefore
$$
\rho(T)\le 0
$$
whenever
$$
T-T_{\mathrm{turn}}
\ge
\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}
$$
Because the assumed window length satisfies
$$
\tau_{\mathrm{ret}}
\ge
\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}
$$
the comparison reaches zero before the end of the return window. Since
$$
\rho(T_{\mathrm{turn}})=\rho_{\max}>0
$$
and
$$
\rho
$$
is continuous, there exists a first time
$$
T_{\mathrm{cross}}^{(2)}
\in
\left(
T_{\mathrm{turn}},
\,
T_{\mathrm{turn}}+\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}
\right]
$$
for which
$$
\rho\!\big(T_{\mathrm{cross}}^{(2)}\big)=0
$$
This proves the lemma.

**Lemma 16: Return to the reflected section state after the second crossing.**
Assume the hypotheses of Lemma 15 and let
$$
T_{\mathrm{cross}}^{(2)}
$$
denote the second origin crossing. Assume, in addition, that there exists a post-second-crossing window
$$
[T_{\mathrm{cross}}^{(2)},\,T_{\mathrm{cross}}^{(2)}+\tau_{\ast}]
$$
on which:

- the trajectory lies on the right exterior branch,
  $$
  X(T)\ge 0
  $$
- the motion is outward,
  $$
  \frac{dX}{dT}(T)\ge v_{\ast}>0
  $$
- and the position remains bounded above by the global excursion envelope,
  $$
  X(T)\le X_{\max}
  $$

If
$$
\tau_{\ast}\ge \frac{X_\ast}{v_{\ast}}
$$
then there exists a first time
$$
T_{\ast}
\in
\left[
T_{\mathrm{cross}}^{(2)},
\,
T_{\mathrm{cross}}^{(2)}+\frac{X_\ast}{v_{\ast}}
\right]
$$
such that
$$
X(T_{\ast})=X_\ast,
\qquad
\frac{dX}{dT}(T_{\ast})\ge v_{\ast}>0
$$

Equivalently, by reflection symmetry of the two-body state, the trajectory has returned to the reflected section state corresponding to the inbound section at radius
$$
X_\ast
$$

Proof.
For
$$
T\in[T_{\mathrm{cross}}^{(2)},\,T_{\mathrm{cross}}^{(2)}+\tau_{\ast}]
$$
the lower speed bound gives
$$
X(T)
=
X(T_{\mathrm{cross}}^{(2)})
+
\int_{T_{\mathrm{cross}}^{(2)}}^{T}\frac{dX}{dT}(S)\,dS
\ge
v_{\ast}(T-T_{\mathrm{cross}}^{(2)})
$$
because
$$
X(T_{\mathrm{cross}}^{(2)})=0
$$
Hence
$$
X(T)\ge X_\ast
$$
whenever
$$
T-T_{\mathrm{cross}}^{(2)}\ge \frac{X_\ast}{v_{\ast}}
$$
Since
$$
\tau_{\ast}\ge \frac{X_\ast}{v_{\ast}}
$$
the trajectory reaches radius
$$
X_\ast
$$
within the stated window. Continuity of
$$
X
$$
then gives a first time
$$
T_\ast
\in
\left[
T_{\mathrm{cross}}^{(2)},
\,
T_{\mathrm{cross}}^{(2)}+\frac{X_\ast}{v_{\ast}}
\right]
$$
such that
$$
X(T_\ast)=X_\ast
$$
The outward speed bound on the window implies
$$
\frac{dX}{dT}(T_\ast)\ge v_\ast>0
$$
Thus the trajectory reaches the reflected section state in finite time.

For the full return-map program this is the natural intermediate object: literal signed return to
$$
X=X_\ast
$$
with
$$
\frac{dX}{dT}<0
$$
requires one further outer-turn control step, whereas return to the reflected section state is the immediate consequence of the second crossing plus outward continuation on the right branch.

**Lemma 17: Outer-turn closure from the reflected section state.**
Assume the hypotheses of Lemma 16 and let
$$
T_\ast
$$
denote the reflected-section time, so that
$$
X(T_\ast)=X_\ast,
\qquad
\frac{dX}{dT}(T_\ast)\ge v_\ast>0
$$
Assume, in addition, that there exists a later outer turning time
$$
T_{\mathrm{turn}}^{\mathrm{out}}
>
T_\ast
$$
with
$$
X\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=X_{\mathrm{out}}\ge X_\ast,
\qquad
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0
$$
and a post-turn window
$$
\left[
T_{\mathrm{turn}}^{\mathrm{out}},
\,
T_{\mathrm{turn}}^{\mathrm{out}}+\tau_{\mathrm{in}}
\right]
$$
on which
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in}}^{\mathrm{out}}<0
$$
If
$$
\tau_{\mathrm{in}}
\ge
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_{\mathrm{in}}^{\mathrm{out}}}}
$$
then there exists a first return time
$$
T(\psi)
\in
\left[
T_{\mathrm{turn}}^{\mathrm{out}},
\,
T_{\mathrm{turn}}^{\mathrm{out}}+
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_{\mathrm{in}}^{\mathrm{out}}}}
\right]
$$
such that
$$
X(T(\psi))=X_\ast,
\qquad
\frac{dX}{dT}(T(\psi))<0
$$

Proof.
Integrating the acceleration bound from the outer turning time gives
$$
\frac{dX}{dT}(T)
=
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)
+
\int_{T_{\mathrm{turn}}^{\mathrm{out}}}^{T}\frac{d^2X}{dT^2}(S)\,dS
\le
-a_{\mathrm{in}}^{\mathrm{out}}(T-T_{\mathrm{turn}}^{\mathrm{out}})
$$
for
$$
T\in
\left[
T_{\mathrm{turn}}^{\mathrm{out}},
\,
T_{\mathrm{turn}}^{\mathrm{out}}+\tau_{\mathrm{in}}
\right]
$$
because
$$
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0
$$
Hence
$$
\frac{dX}{dT}(T)<0
$$
for all
$$
T>T_{\mathrm{turn}}^{\mathrm{out}}
$$
in the window, so the trajectory moves strictly inward on the right branch after the outer turn.

Integrating once more yields
$$
X(T)
\le
X_{\mathrm{out}}
-
\frac{a_{\mathrm{in}}^{\mathrm{out}}}{2}
\big(T-T_{\mathrm{turn}}^{\mathrm{out}}\big)^2
$$
Therefore
$$
X(T)\le X_\ast
$$
whenever
$$
T-T_{\mathrm{turn}}^{\mathrm{out}}
\ge
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_{\mathrm{in}}^{\mathrm{out}}}}
$$
By the assumed lower bound on
$$
\tau_{\mathrm{in}}
$$
the comparison reaches
$$
X_\ast
$$
before the end of the window. Since
$$
X\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=X_{\mathrm{out}}\ge X_\ast
$$
and
$$
X
$$
is continuous, there exists a first time
$$
T(\psi)
\in
\left[
T_{\mathrm{turn}}^{\mathrm{out}},
\,
T_{\mathrm{turn}}^{\mathrm{out}}+
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_{\mathrm{in}}^{\mathrm{out}}}}
\right]
$$
for which
$$
X(T(\psi))=X_\ast
$$
The strict inward velocity bound implies
$$
\frac{dX}{dT}(T(\psi))<0
$$
Thus the trajectory returns to the inbound section in finite time.

**Lemma 18: Inbound section-speed bound after the outer turn.**
Assume the hypotheses of Lemma 17 and, in addition, that on the post-turn window
$$
\left[
T_{\mathrm{turn}}^{\mathrm{out}},
\,
T(\psi)
\right]
$$
the acceleration satisfies the two-sided bound
$$
-a_{+}^{\mathrm{out}}
\le
\frac{d^2X}{dT^2}(T)
\le
-a_{-}^{\mathrm{out}}
<
0,
\qquad
0<a_{-}^{\mathrm{out}}\le a_{+}^{\mathrm{out}}
$$
Then the inbound section speed satisfies
$$
0<
-\frac{dX}{dT}(T(\psi))
\le
a_{+}^{\mathrm{out}}
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_{-}^{\mathrm{out}}}}
$$
In particular, a sufficient condition for the tame return-speed bound is
$$
a_{+}^{\mathrm{out}}
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_{-}^{\mathrm{out}}}}
\le
U_{\max}
$$

Proof.
Integrating the upper acceleration bound from the outer turning time to the inbound section return gives
$$
\frac{dX}{dT}(T(\psi))
=
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)
+
\int_{T_{\mathrm{turn}}^{\mathrm{out}}}^{T(\psi)}\frac{d^2X}{dT^2}(S)\,dS
\ge
-a_{+}^{\mathrm{out}}
\big(T(\psi)-T_{\mathrm{turn}}^{\mathrm{out}}\big)
$$
because
$$
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0
$$
Since Lemma 17 already gives
$$
\frac{dX}{dT}(T(\psi))<0
$$
this implies
$$
0<
-\frac{dX}{dT}(T(\psi))
\le
a_{+}^{\mathrm{out}}
\big(T(\psi)-T_{\mathrm{turn}}^{\mathrm{out}}\big)
$$

It remains to bound the elapsed time. By the lower acceleration floor,
$$
X(T)
\le
X_{\mathrm{out}}
-
\frac{a_{-}^{\mathrm{out}}}{2}
\big(T-T_{\mathrm{turn}}^{\mathrm{out}}\big)^2
$$
on
$$
\left[
T_{\mathrm{turn}}^{\mathrm{out}},
\,
T(\psi)
\right]
$$
Evaluating at
$$
T=T(\psi)
$$
and using
$$
X(T(\psi))=X_\ast
$$
yields
$$
T(\psi)-T_{\mathrm{turn}}^{\mathrm{out}}
\le
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_{-}^{\mathrm{out}}}}
$$
Substituting this into the previous speed bound proves
$$
0<
-\frac{dX}{dT}(T(\psi))
\le
a_{+}^{\mathrm{out}}
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_{-}^{\mathrm{out}}}}
$$
The stated sufficient condition for
$$
-\frac{dX}{dT}(T(\psi))\le U_{\max}
$$
is immediate.

**Lemma 19: Returned-history tameness from final-window bounds.**
Let
$$
T(\psi)
$$
be an inbound section return time produced by Lemma 17, and define the translated return history
$$
X_{T(\psi)}(\theta)=X\!\big(T(\psi)+\theta\big),
\qquad
\theta\in[-h,0]
$$
Assume that on the final window
$$
[T(\psi)-h,\,T(\psi)]
$$
the trajectory satisfies:

- the section anchoring and sign conditions
  $$
  X(T(\psi))=X_\ast,
  \qquad
  \frac{dX}{dT}(T(\psi))<0
  $$
- the envelope bounds
  $$
  0\le X(T)\le X_{\max},
  \qquad
  |\frac{dX}{dT}(T)|\le U_{\max},
  \qquad
  |\frac{d^2X}{dT^2}(T)|\le A_{\max}
  $$
- and the same Jacobian and active-root count bounds that define the tame return class.

Then
$$
X_{T(\psi)}
$$
lies in the tame return envelope. In particular, if those final-window bounds are exactly the defining bounds of
$$
\mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
$$
then
$$
P_\eta(\psi)=X_{T(\psi)}\in \mathcal{C}^{\mathrm{tame}}_{X_\ast,\eta}
$$

Proof.
For
$$
\theta\in[-h,0]
$$
the translated history satisfies
$$
X_{T(\psi)}(\theta)=X\!\big(T(\psi)+\theta\big)
$$
so every point of the history segment is sampled from the final window
$$
[T(\psi)-h,\,T(\psi)]
$$
Therefore the pointwise bounds on
$$
X,\qquad \frac{dX}{dT},\qquad \frac{d^2X}{dT^2}
$$
transfer directly to
$$
X_{T(\psi)},\qquad \frac{dX}{dT}_{T(\psi)},\qquad \frac{d^2X}{dT^2}_{T(\psi)}
$$
The section anchoring conditions at
$$
\theta=0
$$
follow from
$$
X(T(\psi))=X_\ast,
\qquad
\frac{dX}{dT}(T(\psi))<0
$$
Likewise, because the Jacobian and active-root count bounds are assumed uniformly on the same final window, they transfer directly to the translated segment.

Hence the translated history satisfies the defining bounds of the tame return class, which proves the lemma.

### Outer-turn recapture target

The remaining major dynamical gap on the return half is no longer kinematic. Lemmas 17 and 18 show that, once an outer turning point exists with a post-turn inward acceleration floor, the literal inbound section return follows by comparison geometry. The unresolved question is therefore whether the delayed forces actually create such an outer turn on the right exterior branch.

> **Target Theorem (Outer-Turn Recapture).**
> Fix a dual-mollified tame return class and suppose the return-half branch has already reached the reflected section state
> $$
> X=X_\ast,
> \qquad
> \frac{dX}{dT}>0
> $$
> on the right exterior branch. Assume there exist class constants
> $$
> X_{\mathrm{out},\max},
> \qquad
> a_{\mathrm{in}}^{\mathrm{out}}>0,
> \qquad
> a_{+}^{\mathrm{out}}>0
> $$
> such that on the subsequent outer branch:
> 1. **bounded outward excursion:**
>    the trajectory remains in
>    $$
>    X_\ast\le X(T)\le X_{\mathrm{out},\max}
>    $$
>    until the first outer turn;
> 2. **outer-turn existence:**
>    there exists a first time
>    $$
>    T_{\mathrm{turn}}^{\mathrm{out}}
>    $$
>    with
>    $$
>    \frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0,
>    \qquad
>    X\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=X_{\mathrm{out}}\in[X_\ast,X_{\mathrm{out},\max}];
>    $$
> 3. **post-turn inward-force margin:**
>    on a window after
>    $$
>    T_{\mathrm{turn}}^{\mathrm{out}},
>    $$
>    the signed acceleration satisfies
>    $$
>    -a_{+}^{\mathrm{out}}
>    \le
>    \frac{d^2X}{dT^2}(T)
>    \le
>    -a_{\mathrm{in}}^{\mathrm{out}}
>    <
>    0;
>    $$
> 4. **final-window tame bounds:**
>    the trajectory on the last
>    $$
>    h
>    $$
>    units before the section return satisfies the same position, speed, acceleration, Jacobian, and root-count bounds used in Lemma 19.
>
> Then the outer branch closes back to the literal inbound section by Lemmas 17–19, and the remaining task is reduced to proving the force bounds that realize items 1–3.

This theorem isolates the outer-branch analogue of the inner recapture problem: near the apocenter one must show that delayed partner attraction plus favorable path-history geometry dominate the outward self-drive strongly enough to force one more turn.

### Outer-turn recapture ladder

The intended proof order for the outer branch is:

1. **Outer-branch partner lower bound.**
   Derive a class-uniform lower bound for the inward partner contribution on the right exterior branch.
2. **Outer-branch self-drive upper bound.**
   Bound the outward self contribution there, using the longer partner distance and sub-field-speed Jacobian dilation on the delayed branches.
3. **Outer-force margin theorem.**
   Prove a quantitative inequality of the form
   $$
   A_p(T)-A_s(T)\ge a_{\mathrm{in}}^{\mathrm{out}}>0
   $$
   on an apocenter window.
4. **Outer-turn existence theorem.**
   Integrate the force margin to show that the outward branch stops at a finite radius
   $$
   X_{\mathrm{out}}\le X_{\mathrm{out},\max}
   $$
   and develops a true outer turn.
5. **Post-turn window theorem.**
   Show that the same force margin, or a weaker two-sided acceleration bracket, persists long enough after the turn to trigger Lemmas 17 and 18.

The third and fourth items are the main analytic bottlenecks. Once a robust outer-force margin is available, the remaining return-to-section estimates are already in place.

**Lemma 20: Outer-branch partner lower bound.**
Assume the post-second-crossing outer branch satisfies:

- right exterior outbound geometry,
  $$
  X_\ast\le X(T)\le X_{\mathrm{out},\max},
  \qquad
  \frac{dX}{dT}(T)\ge 0
  $$
- at least one retained active partner branch for each
  $$
  T\in[T_\ast,T_{\mathrm{turn}}^{\mathrm{out}}]
  $$
- the speed bound
  $$
  |\frac{dX}{dT}(T)|\le U_{\max}
  $$
- the partner roots retained in this lower bound remain inward exterior roots with
  $$
  X(T)+X(T_p)>0,
  \qquad
  0\le X(T_p)\le X_{\mathrm{out},\max}
  $$
- and the partner Jacobian upper bound
  $$
  |J_p(T;T_p)|\le J_{p,\max}^{\mathrm{out}}
  $$
  on every retained active partner root.
  The speed bound permits the conservative choice
  $$
  J_{p,\max}^{\mathrm{out}}=1+\frac{U_{\max}}{c_f}
  $$

Then the partner contribution to the inward acceleration obeys the class-uniform lower bound
$$
A_p(T)\ge \underline A_p^{\mathrm{out}}
\equiv
\Theta_-\cdot
\frac{\kappa\epsilon^2}{
\left(4X_{\mathrm{out},\max}^2+\epsilon_c^2\right)J_{p,\max}^{\mathrm{out}}},
\qquad
\Theta_-=1-\frac{U_{\max}}{c_f}>0
$$
Equivalently, the partner acceleration satisfies
$$
a_p(T)=-A_p(T)\le -\underline A_p^{\mathrm{out}}<0
$$
on the outer branch.

The factor $\Theta_-$ is the receiver-normal penalty, and on this branch it cannot be dropped. Here $\hat r_p=+1$ while $\frac{dX}{dT}(T)\ge0$, so the retained partner image lies **behind** the outbound receiver and its branch strength is suppressed:
$$
\frac{|D_{T,p}(T;T_p)|}{c_f}
=
1-\frac{dX/dT(T)}{c_f}
\in[\Theta_-,1]
$$
The source-normal-only estimate $\kappa\epsilon^2/((r_p^2+\epsilon_c^2)|J_p|)$ therefore over-states this floor by up to $1/\Theta_-$ and is not a valid lower bound. The strict positivity of the floor survives because the tame envelope enforces $U_{\max}<c_f$; it would fail exactly at the receiver-normal null $\frac{dX}{dT}=c_f$, where the inward pull of a source lying behind the receiver vanishes identically.

Proof.
Along the retained inward exterior partner channel, the delayed source remains on the opposite side of the current right-hand particle, so each retained contribution points inward and therefore contributes with signed acceleration
$$
a_p(T)=-A_p(T)
$$
For any active partner root
$$
T_p<T
$$
the delayed partner separation satisfies
$$
r_p(T;T_p)=X(T)+X(T_p)
$$
Because both the current and delayed positions remain within the outer excursion envelope,
$$
0\le X(T)\le X_{\mathrm{out},\max},
\qquad
0\le X(T_p)\le X_{\mathrm{out},\max}
$$
we obtain
$$
0<r_p(T;T_p)\le 2X_{\mathrm{out},\max}
$$
Hence the core-mollified denominator obeys
$$
r_p(T;T_p)^2+\epsilon_c^2
\le
4X_{\mathrm{out},\max}^2+\epsilon_c^2
$$

Each retained active partner contribution therefore has magnitude
$$
\frac{\kappa\epsilon^2\,W_p^{\mathrm{rec}}(T;T_p)}{r_p(T;T_p)^2+\epsilon_c^2}
=
\frac{\kappa\epsilon^2}{
\left(r_p(T;T_p)^2+\epsilon_c^2\right)|J_p(T;T_p)|}
\cdot
\frac{|D_{T,p}(T;T_p)|}{c_f}
\ge
\Theta_-\cdot
\frac{\kappa\epsilon^2}{
\left(4X_{\mathrm{out},\max}^2+\epsilon_c^2\right)J_{p,\max}^{\mathrm{out}}}
$$
using $|D_{T,p}|/c_f\ge\Theta_-$ from the weight conversion. Summing over the retained active partner branches and retaining only one branch yields
$$
A_p(T)\ge \underline A_p^{\mathrm{out}}
$$
which proves the lemma.

**Lemma 21: Conditional outer-branch self-drive upper bound.**
Assume that on the outer branch
$$
[T_\ast,T_{\mathrm{turn}}^{\mathrm{out}}]
$$
the active self branches satisfy:

- a root-count bound
  $$
  N_s(T)\le N_{s,\max}^{\mathrm{out}}
  $$
- a self-Jacobian transversality bound
  $$
  |J_s(T;T_s)|\ge \nu_s^{\mathrm{out}}>0
  $$
  on every active self root,
- and a delayed self-separation lower bound
  $$
  r_s(T;T_s)\ge r_{s,\min}^{\mathrm{out}}>0
  $$
  on every active self root.

Then the outward self contribution obeys the class-uniform upper bound
$$
A_s(T)\le \overline A_s^{\mathrm{out}}
\equiv
N_{s,\max}^{\mathrm{out}}\,
\frac{\kappa\epsilon^2}{
\big((r_{s,\min}^{\mathrm{out}})^2+\epsilon_c^2\big)\,\nu_s^{\mathrm{out}}}
$$

On this branch the active self roots are outbound-level roots, so $\hat r_s=+1$
while $\frac{dX}{dT}(T)\ge0$: the receiver recedes from its own retained
emission points, $|D_{T,s}|/c_f=1-\frac{dX/dT(T)}{c_f}\le1$, and the outward
self-drive is *suppressed* by exactly the same receiver-normal factor that
suppresses the inward partner pull of Lemma 20. The source-normal-only estimate
is therefore a valid ceiling here, and no receiver-normal penalty is needed.

The coincidence is structural rather than accidental. Lemma 20 and Lemma 21 read
the same **common-sightline arc**: $\hat r_p=\hat r_s=+1$, so
$|D_T|/c_f=1-\frac{dX/dT(T)}{c_f}$ is one common positive prefactor of the whole
branch sum. Consequently the net inward acceleration on the outer branch obeys
$$
a_{\mathrm{in}}^{\mathrm{out}}(T)
=
\left(1-\frac{dX/dT(T)}{c_f}\right)
\Big[
A_p^{\mathrm{src}}(T)-A_s^{\mathrm{src}}(T)
\Big]
$$
where the bracket carries only source-normal weights. The receiver-normal factor
cannot change which term dominates. Partner dominance on the outer branch is
therefore decided exactly as before, and the redriven inward floor is the old
floor multiplied by $\Theta_-$.

Proof.
For each active self root
$$
T_s<T
$$
the contribution to the outward self-drive has magnitude
$$
\frac{\kappa\epsilon^2\,W_s^{\mathrm{rec}}(T;T_s)}{r_s(T;T_s)^2+\epsilon_c^2}
=
\frac{\kappa\epsilon^2}{
\big(r_s(T;T_s)^2+\epsilon_c^2\big)\,|J_s(T;T_s)|}
\cdot
\frac{|D_{T,s}(T;T_s)|}{c_f}
\le
\frac{\kappa\epsilon^2}{
\big(r_s(T;T_s)^2+\epsilon_c^2\big)\,|J_s(T;T_s)|}
$$
Using the assumed lower bounds on
$$
r_s(T;T_s)
\qquad
\text{and}
\qquad
|J_s(T;T_s)|
$$
gives the branchwise estimate
$$
\frac{\kappa\epsilon^2}{
\big(r_s(T;T_s)^2+\epsilon_c^2\big)\,|J_s(T;T_s)|}
\le
\frac{\kappa\epsilon^2}{
\big((r_{s,\min}^{\mathrm{out}})^2+\epsilon_c^2\big)\,\nu_s^{\mathrm{out}}}
$$
Summing over at most
$$
N_{s,\max}^{\mathrm{out}}
$$
active self branches yields
$$
A_s(T)\le \overline A_s^{\mathrm{out}}
$$
which proves the lemma.

**Lemma 22: Outer-force margin on the apocenter window.**
Assume that on an outer-branch window
$$
[T_\ast,\,T_\ast+\tau_{\mathrm{apo}}]
$$
the signed dynamics can be written in the form
$$
\frac{d^2X}{dT^2}(T)\le -A_p(T)+A_s(T)
$$
where
$$
A_p(T)
$$
is the inward partner contribution and
$$
A_s(T)
$$
is the total outward delayed self contribution on that window. If
$$
A_p(T)\ge \underline A_p^{\mathrm{out}}
\qquad
\text{and}
\qquad
A_s(T)\le \overline A_s^{\mathrm{out}}
$$
there with
$$
\underline A_p^{\mathrm{out}}-\overline A_s^{\mathrm{out}}
\ge
a_{\mathrm{in}}^{\mathrm{out}}>0
$$
then
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in}}^{\mathrm{out}}<0
$$
for every
$$
T\in[T_\ast,\,T_\ast+\tau_{\mathrm{apo}}]
$$

In particular, Lemmas 20 and 21 reduce the outer-turn force margin to the parameter inequality
$$
\Theta_-\cdot
\frac{\kappa\epsilon^2}{
\left(4X_{\mathrm{out},\max}^2+\epsilon_c^2\right)J_{p,\max}^{\mathrm{out}}}
-
N_{s,\max}^{\mathrm{out}}\,
\frac{\kappa\epsilon^2}{
\big((r_{s,\min}^{\mathrm{out}})^2+\epsilon_c^2\big)\,\nu_s^{\mathrm{out}}}
\ge
a_{\mathrm{in}}^{\mathrm{out}}>0
$$

Proof.
By hypothesis,
$$
\frac{d^2X}{dT^2}(T)\le -A_p(T)+A_s(T)
$$
Using the lower bound for the inward partner term and the upper bound for the outward self term yields
$$
\frac{d^2X}{dT^2}(T)
\le
-\underline A_p^{\mathrm{out}}+\overline A_s^{\mathrm{out}}
\le
-a_{\mathrm{in}}^{\mathrm{out}}<0
$$
which proves the claim.

**Lemma 23: Finite-radius outer turn under an apocenter force margin.**
Assume the hypotheses of Lemma 22 and suppose, in addition, that at the reflected section time
$$
T_\ast
$$
the trajectory satisfies
$$
X(T_\ast)=X_\ast,
\qquad
\frac{dX}{dT}(T_\ast)=v_\ast>0
$$
If the apocenter window is long enough to satisfy
$$
\tau_{\mathrm{apo}}\ge \frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
$$
then there exists a first outer turning time
$$
T_{\mathrm{turn}}^{\mathrm{out}}
\in
\left[
T_\ast,
\,
T_\ast+\frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
\right]
$$
such that
$$
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0
$$
Moreover, the turning radius obeys the explicit bound
$$
X_{\mathrm{out}}
=
X\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)
\le
X_\ast+\frac{v_\ast^2}{2a_{\mathrm{in}}^{\mathrm{out}}}
$$

In particular, a sufficient condition for the outer-turn radius envelope is
$$
X_\ast+\frac{v_\ast^2}{2a_{\mathrm{in}}^{\mathrm{out}}}\le X_{\mathrm{out},\max}
$$

Proof.
Lemma 22 gives the uniform acceleration bound
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in}}^{\mathrm{out}}
$$
on
$$
[T_\ast,\,T_\ast+\tau_{\mathrm{apo}}]
$$
Integrating from
$$
T_\ast
$$
to any later time
$$
T
$$
in that window yields
$$
\frac{dX}{dT}(T)
=
\frac{dX}{dT}(T_\ast)
+
\int_{T_\ast}^{T}\frac{d^2X}{dT^2}(S)\,dS
\le
v_\ast-a_{\mathrm{in}}^{\mathrm{out}}(T-T_\ast)
$$
Therefore
$$
\frac{dX}{dT}(T)\le 0
$$
whenever
$$
T-T_\ast\ge \frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
$$
Because
$$
\tau_{\mathrm{apo}}\ge \frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
$$
the comparison velocity reaches zero before the end of the apocenter window. Since
$$
\frac{dX}{dT}(T_\ast)=v_\ast>0
$$
and
$$
\frac{dX}{dT}
$$
is continuous, there exists a first time
$$
T_{\mathrm{turn}}^{\mathrm{out}}
\in
\left[
T_\ast,
\,
T_\ast+\frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
\right]
$$
for which
$$
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0
$$

Integrating the velocity estimate once more gives
$$
X(T)
\le
X_\ast+v_\ast(T-T_\ast)
-
\frac{a_{\mathrm{in}}^{\mathrm{out}}}{2}(T-T_\ast)^2
$$
Evaluating at
$$
T=T_{\mathrm{turn}}^{\mathrm{out}}
$$
and using
$$
T_{\mathrm{turn}}^{\mathrm{out}}-T_\ast
\le
\frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
$$
yields
$$
X_{\mathrm{out}}
\le
X_\ast+\frac{v_\ast^2}{2a_{\mathrm{in}}^{\mathrm{out}}}
$$
which proves the radius bound.

**Lemma 24: Post-turn acceleration bracket after the outer turn.**
Assume the hypotheses of Lemma 23 and let
$$
T_{\mathrm{turn}}^{\mathrm{out}}
$$
be the first outer turning time, with
$$
X\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=X_{\mathrm{out}},
\qquad
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0
$$
Assume, in addition, that there exists a post-turn window
$$
\left[
T_{\mathrm{turn}}^{\mathrm{out}},
\,
T_{\mathrm{turn}}^{\mathrm{out}}+\tau_{\mathrm{in}}
\right]
$$
on which the delayed force contributions satisfy
$$
A_p(T)\ge \underline A_{p,\mathrm{post}}^{\mathrm{out}},
\qquad
A_s(T)\le \overline A_{s,\mathrm{post}}^{\mathrm{out}}
$$
with
$$
\underline A_{p,\mathrm{post}}^{\mathrm{out}}
-
\overline A_{s,\mathrm{post}}^{\mathrm{out}}
\ge
a_-^{\mathrm{out}}>0
$$
and also admit a class-uniform upper acceleration bound
$$
|\frac{d^2X}{dT^2}(T)|\le a_+^{\mathrm{out}}
$$
Then on that post-turn window one has the two-sided acceleration bracket
$$
-a_+^{\mathrm{out}}
\le
\frac{d^2X}{dT^2}(T)
\le
-a_-^{\mathrm{out}}
<
0
$$

Consequently, if
$$
\tau_{\mathrm{in}}
\ge
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_-^{\mathrm{out}}}}
$$
then the hypotheses of Lemmas 17 and 18 hold with
$$
a_{\mathrm{in}}^{\mathrm{out}}=a_-^{\mathrm{out}}
$$

Proof.
On the post-turn window the signed equation has the form
$$
\frac{d^2X}{dT^2}(T)\le -A_p(T)+A_s(T)
$$
Using the assumed lower bound for the inward partner term and the upper bound for the outward self term yields
$$
\frac{d^2X}{dT^2}(T)
\le
-\underline A_{p,\mathrm{post}}^{\mathrm{out}}
+
\overline A_{s,\mathrm{post}}^{\mathrm{out}}
\le
-a_-^{\mathrm{out}}<0
$$
The assumed absolute acceleration bound gives
$$
\frac{d^2X}{dT^2}(T)\ge -a_+^{\mathrm{out}}
$$
so the stated two-sided bracket follows.

If
$$
\tau_{\mathrm{in}}
\ge
\sqrt{\frac{2(X_{\mathrm{out}}-X_\ast)}{a_-^{\mathrm{out}}}}
$$
then Lemma 17 applies with
$$
a_{\mathrm{in}}^{\mathrm{out}}=a_-^{\mathrm{out}}
$$
and Lemma 18 applies with the pair
$$
(a_-^{\mathrm{out}},a_+^{\mathrm{out}})
$$
This is exactly the required post-turn handoff.

### Outer-branch delayed-geometry target

The outer-turn force-margin lemmas are now in place, but Lemma 21 is still conditional on delayed self geometry. The remaining task is to prove that on the right exterior outbound branch the active self roots stay both sparse and noncaustic long enough to make the outer-force margin genuine rather than assumed.

> **Target Theorem (Outer-Branch Self-Root Separation and Transversality).**
> Fix a tame outer-branch class on the right exterior outbound interval
> $$
> [T_\ast,T_{\mathrm{turn}}^{\mathrm{out}}].
> $$
> Suppose the branch stays within the excursion tube
> $$
> X_\ast\le X(T)\le X_{\mathrm{out},\max},
> \qquad
> 0\le \frac{dX}{dT}(T)\le U_{\max},
> $$
> and that its same-side delayed self interactions are organized by the outer sorting map
> $$
> z(T)\equiv X(T)-c_f T.
> $$
> Assume there exist class constants
> $$
> r_{s,\min}^{\mathrm{out}}>0,
> \qquad
> \nu_s^{\mathrm{out}}>0,
> \qquad
> N_{s,\max}^{\mathrm{out}}\in\mathbb{N}
> $$
> such that on the apocenter window:
> 1. active self roots satisfy a uniform delayed-separation lower bound
>    $$
>    r_s(T;T_s)\ge r_{s,\min}^{\mathrm{out}},
>    $$
> 2. active self roots stay on a noncaustic side of the outer sorting map with
>    $$
>    |J_s(T;T_s)|\ge \nu_s^{\mathrm{out}},
>    $$
> 3. and the number of active self branches obeys
>    $$
>    N_s(T)\le N_{s,\max}^{\mathrm{out}}.
>    $$
>
> Then Lemma 21 applies, and the outer-force margin reduces to the explicit parameter inequality of Lemma 22.

This theorem is the outer-branch analogue of the earlier pre-crossing and post-crossing delayed-geometry steps: the partner floor is comparatively easy, while the decisive issue is keeping the self branches away from both short-distance concentration and Jacobian collapse.

### Outer-branch delayed-geometry ladder

The intended proof order is:

1. **Outer sorting-map lemma.**
   Identify the correct same-side sorting map on the right exterior outbound branch and show that active self roots are organized by its level sets.
2. **Delayed-separation lemma.**
   Prove that the active outer self roots cannot approach the current point closer than a class-uniform radius
   $$
   r_{s,\min}^{\mathrm{out}}>0
   $$
   on the apocenter window.
3. **Outer self-transversality lemma.**
   Show that the active self roots stay on a noncaustic side of the sorting map, giving
   $$
   |J_s|\ge \nu_s^{\mathrm{out}}>0
   $$
4. **Outer root-count lemma.**
   Prove that the number of active same-side self branches remains bounded by
   $$
   N_{s,\max}^{\mathrm{out}}
   $$
5. **Self-drive upper-bound corollary.**
   Feed the preceding three items into Lemma 21.

The second and third items are the real bottlenecks. Once they are available, the outer-turn recapture theorem becomes a direct comparison argument.

**Lemma 25: Outer sorting-map identity on the right exterior outbound branch.**
Assume the trajectory lies on the right exterior outbound branch,
$$
X(T)\ge 0,
\qquad
\frac{dX}{dT}(T)\ge 0
$$
and consider same-side self roots
$$
T_s<T
$$
for which the delayed self-hit condition is
$$
X(T)-X(T_s)=c_f(T-T_s)
$$
Define the outer sorting map
$$
z(T)\equiv X(T)-c_f T
$$
Then every such active self root is selected by the level-set identity
$$
z(T_s)=z(T)
$$
Consequently, the same-side outer self branches on the right exterior outbound leg are organized by level sets of
$$
z
$$

Proof.
The same-side delayed self-hit condition is
$$
X(T)-X(T_s)=c_f(T-T_s)
$$
Rearranging gives
$$
X(T)-c_f T=X(T_s)-c_f T_s
$$
which is exactly
$$
z(T)=z(T_s)
$$
Thus every active same-side self root on the right exterior outbound branch is a level-set root of
$$
z
$$
which proves the lemma.

**Lemma 26: Exact same-side self-root exclusion on a strictly sub-field-speed outer window.**
Assume there exists an outer-branch window
$$
[T_a,T_b]\subseteq [T_\ast,\infty)
$$
on which the outbound speed stays strictly below field speed:
$$
0\le \frac{dX}{dT}(T)\le c_f-\sigma_{\mathrm{out}}
<c_f
\qquad
\text{for }T\in[T_a,T_b]
$$
with some
$$
\sigma_{\mathrm{out}}>0
$$
Then the outer sorting map
$$
z(T)=X(T)-c_f T
$$
is strictly decreasing on that window. Consequently, there are no exact same-side self roots
$$
T_s<T
$$
with both
$$
T_s,T\in[T_a,T_b]
$$
and
$$
X(T)-X(T_s)=c_f(T-T_s)
$$

Proof.
On the stated window one has
$$
\frac{dz}{dT}(T)=\frac{dX}{dT}(T)-c_f\le -\sigma_{\mathrm{out}}<0
$$
so
$$
z
$$
is strictly decreasing on
$$
[T_a,T_b]
$$
If there existed an exact same-side self root pair
$$
T_s<T
$$
with both times in that window, Lemma 25 would give
$$
z(T_s)=z(T)
$$
But strict monotonicity of
$$
z
$$
implies
$$
z(T_s)>z(T)
$$
whenever
$$
T_s<T
$$
which is impossible. Therefore no such exact same-side self root exists on the strictly sub-field-speed outer window.

This shows that on a strictly sub-field-speed apocenter window the exact delayed self geometry is maximally favorable: same-side outer self roots are absent. The remaining issue for the dual-mollified model is then not exact root multiplicity, but control of the shell-smeared near-diagonal contribution.

**Lemma 27: Shell-tail bound on a strictly sub-field-speed outer window.**
Assume the hypotheses of Lemma 26 on a window
$$
[T_a,T_b]\subseteq [T_\ast,\infty)
$$
and assume that the same-side outer self contribution is evaluated in the dual-mollified integral form with:

- shell mollifier
  $$
  \delta_\eta
  $$
  supported where its argument lies in
  $$
  [-\eta,\eta]
  $$
- essential bound
  $$
  \|\delta_\eta\|_\infty<\infty
  $$
- core mollifier
  $$
  \epsilon_c>0
  $$
- and memory horizon
  $$
  h>0
  $$

For each fixed
$$
T\in[T_a,T_b]
$$
let the **local** same-side shell contribution be integrated only over delayed times
$$
T_0\in[T_a,T]
$$
for which the outer sorting-map mismatch
$$
z(T_0)-z(T)
$$
lies in the shell support. Then the local same-side outer self contribution obeys the pointwise bound
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(T)
\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$

This lemma controls only the same-window shell leakage. Same-side contributions from
$$
T_0<T_a
$$
are deep-past channels and must be excluded or bounded separately by the later deep-past suppression package.

In particular, on a strictly sub-field-speed apocenter window the local outer self term coming from same-side shell leakage is uniformly bounded by an
$$
\mathcal{O}\!\left(\frac{\eta}{\sigma_{\mathrm{out}}\epsilon_c^2}\right)
$$
quantity, even though the exact same-side root set is empty.

Proof.
Fix
$$
T\in[T_a,T_b]
$$
By Lemma 26,
$$
z(T)=X(T)-c_f T
$$
is strictly decreasing with derivative bounded above by
$$
\frac{dz}{dT}(T)\le -\sigma_{\mathrm{out}}<0
$$
Hence for any delayed time
$$
T_0<T
$$
in the same window one has
$$
z(T_0)-z(T)\ge \sigma_{\mathrm{out}}(T-T_0)
$$
Therefore, if
$$
|z(T_0)-z(T)|\le \eta
$$
then necessarily
$$
0\le T-T_0\le \frac{\eta}{\sigma_{\mathrm{out}}}
$$
So the set of delayed times inside the shell support has measure at most
$$
\frac{\eta}{\sigma_{\mathrm{out}}}
\le
\frac{2\eta}{\sigma_{\mathrm{out}}}
$$

Evaluating the local same-side self term in integral form and using
$$
|X(T)-X(T_0)|^2+\epsilon_c^2\ge \epsilon_c^2
$$
gives
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(T)
\le
\kappa\epsilon^2
\int_{T_a}^{T}
\frac{\delta_\eta(\cdots)}{|X(T)-X(T_0)|^2+\epsilon_c^2}\,dT_0
\le
\frac{\kappa\epsilon^2\,\|\delta_\eta\|_\infty}{\epsilon_c^2}
\cdot
\left|\operatorname{supp}_T(\delta_\eta)\right|
$$
Using the support-measure bound yields
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(T)
\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$
which proves the lemma.

**Corollary 28: Sub-field-speed outer-force margin from partner floor versus local shell tail.**
Assume there exists an apocenter window
$$
[T_a,T_b]\subseteq [T_\ast,\infty)
$$
on which the branch has not yet turned and:

- the outer branch is strictly sub-field-speed,
  $$
  0\le \frac{dX}{dT}(T)\le c_f-\sigma_{\mathrm{out}}<c_f
  $$
- the partner lower bound of Lemma 20 holds with
  $$
  A_p(T)\ge \underline A_p^{\mathrm{out}}
  $$
- the only local same-window outward self contribution on that window is the same-side shell tail estimated in Lemma 27,
- and deep-past outward self channels are absent or have already been bounded by zero on this local-only corollary.

If
$$
\underline A_p^{\mathrm{out}}
-
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
\ge
a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}>0
$$
then on that window one has the unconditional inward acceleration bound
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}<0
$$

In particular, on a strictly sub-field-speed apocenter window with no remaining deep-past outward self channel, the outer-force margin reduces to a direct parameter race between the partner floor and the shell-mollified same-window self leakage.

Proof.
Lemma 20 gives
$$
A_p(T)\ge \underline A_p^{\mathrm{out}}
$$
By Lemma 26, there are no exact same-side self roots with both times on the stated window, and Lemma 27 therefore bounds the surviving same-window shell contribution by
$$
A_s^{\mathrm{out}}(T)=A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(T)\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$
Using the signed dynamics
$$
\frac{d^2X}{dT^2}(T)\le -A_p(T)+A_s^{\mathrm{out}}(T)
$$
yields
$$
\frac{d^2X}{dT^2}(T)
\le
-\underline A_p^{\mathrm{out}}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
\le
-a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}<0
$$
which proves the corollary.

**Lemma 29: Coarse speed-decay entry into a strict sub-field-speed apocenter window.**
Fix a desired strict sub-field-speed gap
$$
\sigma_{\mathrm{out}}>0
$$
and write
$$
v_{\mathrm{sub}}^{\mathrm{out}}
\equiv
c_f-\sigma_{\mathrm{out}}
$$
Assume there is an outbound outer-entry interval
$$
I_{\mathrm{ent}}\equiv[T_0,T_1]
$$
on which the branch has not yet been shown to turn, but the following non-circular data are available:

- the trajectory is on the right exterior outbound branch as long as no turn has occurred,
  $$
  X_\ast\le X(T)\le X_{\mathrm{out},\max},
  \qquad
  \frac{dX}{dT}(T)\ge 0
  $$
- the entry interval carries a coarse inward braking margin at the sub-field-speed boundary and above it:
  $$
  \frac{d^2X}{dT^2}(T)\le -a_{\mathrm{ent}}^{\mathrm{out}}<0
  \qquad
  \text{whenever }
  T\in I_{\mathrm{ent}}
  \text{ and }
  \frac{dX}{dT}(T)\ge v_{\mathrm{sub}}^{\mathrm{out}}
  $$
- the interval is long enough for entry plus a retained sub-field-speed window of length
  $$
  \tau_{\mathrm{sub}}^{\mathrm{out}}>0
  $$
  $$
  T_1-T_0
  \ge
  \frac{\big(\frac{dX}{dT}(T_0)-v_{\mathrm{sub}}^{\mathrm{out}}\big)_+}
  {a_{\mathrm{ent}}^{\mathrm{out}}}
  +
  \tau_{\mathrm{sub}}^{\mathrm{out}}
  $$

Then one of the following alternatives holds:

1. a finite outer turn occurs before the retained sub-field-speed window is exhausted; or
2. there exists an entry time
   $$
   T_a\in
   \left[
   T_0,\,
   T_0+
   \frac{\big(\frac{dX}{dT}(T_0)-v_{\mathrm{sub}}^{\mathrm{out}}\big)_+}
   {a_{\mathrm{ent}}^{\mathrm{out}}}
   \right]
   $$
   such that the branch remains strictly sub-field-speed and outbound on
   $$
   I_{\mathrm{sub}}\equiv
   [T_a,T_a+\tau_{\mathrm{sub}}^{\mathrm{out}}]
   $$
   namely
   $$
   0\le \frac{dX}{dT}(T)\le c_f-\sigma_{\mathrm{out}}
   \qquad
   \text{for every }T\in I_{\mathrm{sub}}
   $$

The coarse margin can be certified without using the sub-field-speed sorting argument. For example, it is enough to have on
$$
I_{\mathrm{ent}}
$$
a partner floor and a coarse total outward ceiling satisfying
$$
\underline A_p^{\mathrm{out}}
-
\overline A_{s,\mathrm{ent}}^{\mathrm{out}}
\ge
a_{\mathrm{ent}}^{\mathrm{out}}>0
$$
where
$$
\overline A_{s,\mathrm{ent}}^{\mathrm{out}}
$$
includes all outward self, fold, shell, and deep-past channels on the entry interval. This ceiling is deliberately coarse: it is not allowed to use Lemma 26 or Lemma 27, because those lemmas are consequences of the sub-field-speed window produced here.

Proof.
Let
$$
v(T)\equiv \frac{dX}{dT}(T)
$$
If
$$
v(T_0)\le v_{\mathrm{sub}}^{\mathrm{out}}
$$
set
$$
T_a=T_0
$$
Otherwise, as long as
$$
v(T)\ge v_{\mathrm{sub}}^{\mathrm{out}}
$$
and no turn has occurred, the coarse margin gives
$$
v'(T)=\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{ent}}^{\mathrm{out}}
$$
Integrating from
$$
T_0
$$
shows that
$$
v(T)
\le
v(T_0)-a_{\mathrm{ent}}^{\mathrm{out}}(T-T_0)
$$
throughout the portion of the interval where
$$
v\ge v_{\mathrm{sub}}^{\mathrm{out}}
$$
Hence either the velocity reaches zero first, giving a finite outer turn, or it reaches
$$
v_{\mathrm{sub}}^{\mathrm{out}}
$$
no later than
$$
T_0+
\frac{\big(v(T_0)-v_{\mathrm{sub}}^{\mathrm{out}}\big)_+}
{a_{\mathrm{ent}}^{\mathrm{out}}}
$$
Call the first such time
$$
T_a
$$

It remains to show that the trajectory cannot immediately exit back above
$$
v_{\mathrm{sub}}^{\mathrm{out}}
$$
before the retained window is exhausted. Suppose instead that, after entry and before any turn, there is a first time
$$
T_{\mathrm{exit}}>T_a
$$
at which
$$
v(T_{\mathrm{exit}})=v_{\mathrm{sub}}^{\mathrm{out}}
$$
and the velocity is about to cross from
$$
v\le v_{\mathrm{sub}}^{\mathrm{out}}
$$
to
$$
v>v_{\mathrm{sub}}^{\mathrm{out}}
$$
At this boundary point the same coarse margin applies, so
$$
v'(T_{\mathrm{exit}})
\le
-a_{\mathrm{ent}}^{\mathrm{out}}<0
$$
which is incompatible with an upward first exit. Therefore the sub-field-speed inequality is forward invariant on the retained part of
$$
I_{\mathrm{ent}}
$$
until a turn occurs.

The length hypothesis ensures that
$$
[T_a,T_a+\tau_{\mathrm{sub}}^{\mathrm{out}}]\subseteq I_{\mathrm{ent}}
$$
If no turn occurs on that retained interval, then the outbound condition supplies
$$
v(T)\ge 0
$$
and the forward-invariance argument supplies
$$
v(T)\le v_{\mathrm{sub}}^{\mathrm{out}}=c_f-\sigma_{\mathrm{out}}
$$
This is exactly the claimed strict sub-field-speed apocenter window. The final displayed partner-floor condition implies the coarse acceleration hypothesis directly from the signed dynamics
$$
\frac{d^2X}{dT^2}(T)\le -A_p(T)+A_s^{\mathrm{out}}(T)
$$
using
$$
A_p(T)\ge \underline A_p^{\mathrm{out}},
\qquad
A_s^{\mathrm{out}}(T)\le \overline A_{s,\mathrm{ent}}^{\mathrm{out}}
$$

**Corollary 29.1: Strict sub-field-speed apocenter window.**
Assume there exists an apocenter window
$$
I_{\mathrm{sub}}\equiv[T_a,T_b]\subseteq[T_\ast,\infty)
$$
on which the branch has not yet turned and satisfies
$$
0\le \frac{dX}{dT}(T)\le c_f-\sigma_{\mathrm{out}}<c_f
\qquad
\text{for every }T\in I_{\mathrm{sub}}
$$
Then the hypotheses of Lemmas 26 and 27 hold on
$$
I_{\mathrm{sub}}
$$

This corollary is intentionally separated from the entry mechanism. Lemma 29 supplies
$$
I_{\mathrm{sub}}
$$
under the coarse speed-decay hypotheses; if that lemma instead reaches the first alternative, then the outer turn has already occurred and the local sub-field-speed criterion is not needed for existence.

Proof.
The displayed speed bound is exactly the strict sub-field-speed hypothesis used by Lemma 26. Lemma 27 then applies to the local shell-smeared contribution on the same window.

**Proposition: Explicit sub-field-speed apocenter recapture regime.**
Assume the outer branch reaches an apocenter window
$$
I_{\mathrm{sub}}\equiv[T_a,T_b]
$$
before any known outer turn, and on that window:

- the branch remains outbound,
  $$
  0\le \frac{dX}{dT}(T)
  $$
- the branch is strictly sub-field-speed,
  $$
  \frac{dX}{dT}(T)\le c_f-\sigma_{\mathrm{out}}<c_f
  $$
- the partner lower bound of Lemma 20 holds with
  $$
  A_p(T)\ge \underline A_p^{\mathrm{out}}
  $$
- and deep-past outward self channels are absent or already bounded by zero, so the only outward self contribution on this local criterion is the same-window shell leakage of Lemma 27.

If, in addition, the parameter inequality
$$
\Theta_-\cdot
\frac{\kappa\epsilon^2}{
\left(4X_{\mathrm{out},\max}^2+\epsilon_c^2\right)J_{p,\max}^{\mathrm{out}}}
-
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
\ge
a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}>0
$$
holds, then on
$$
I_{\mathrm{sub}}
$$
one has the inward acceleration bound
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}<0
$$

In particular, if
$$
T_b-T_a
\ge
\frac{\frac{dX}{dT}(T_a)}{a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}}
$$
then a finite outer turn occurs on
$$
\left[T_a,\,T_a+\frac{\frac{dX}{dT}(T_a)}{a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}}\right]
$$
with radius bound
$$
X_{\mathrm{out}}
\le
X(T_a)+\frac{\frac{dX}{dT}(T_a)^2}{2a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}}
$$

Proof.
Corollary 29.1 activates Lemmas 26 and 27 on
$$
I_{\mathrm{sub}}
$$
so the same-window outer self contribution is reduced to the shell-tail bound
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(T)\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$
Combining this with the partner lower bound from Lemma 20 gives exactly the hypothesis of Corollary 28, hence
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}<0
$$
on
$$
I_{\mathrm{sub}}
$$

Integrating from
$$
T_a
$$
to
$$
T\in I_{\mathrm{sub}}
$$
gives
$$
\frac{dX}{dT}(T)\le \frac{dX}{dT}(T_a)-a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}(T-T_a)
$$
If the displayed window-length condition holds, continuity of
$$
\frac{dX}{dT}
$$
forces a first zero of the velocity inside the stated interval. Integrating the same comparison once more gives the radius bound.

### Deep-past outer self suppression target

The outer-turn program is now reduced to one explicit remaining issue. On the final sub-field-speed apocenter window, the local same-side self roots are annihilated by the monotonicity of
$$
z(T)=X(T)-c_f T
$$
so the local outward self-drive is only the shell tail bounded in Lemma 27. The remaining possible outward self contributions are therefore the roots that come from much earlier times
$$
T_s<T_a
$$
outside the local sub-field-speed window but still satisfy
$$
z(T_s)=z(T)
$$

> **Target Theorem (Deep-Past Outer Self Suppression).**
> Fix a final sub-field-speed apocenter window
> $$
> [T_a,T_b]\subseteq [T_\ast,\infty)
> $$
> on which
> $$
> 0\le \frac{dX}{dT}(T)\le c_f-\sigma_{\mathrm{out}}<c_f.
> $$
> Assume that every outward-driving same-side self root
> $$
> T_s<T_a
> $$
> satisfying
> $$
> z(T_s)=z(T)
> $$
> obeys:
> 1. a macroscopic delayed-separation lower bound
>    $$
>    r_s(T;T_s)\ge R_{\mathrm{deep}}^{\mathrm{out}}>0,
>    $$
> 2. a deep-past transversality bound
>    $$
>    |J_s(T;T_s)|\ge \nu_{s,\mathrm{deep}}^{\mathrm{out}}>0,
>    $$
> 3. and a deep-past root-count bound
>    $$
>    N_{s,\mathrm{deep}}^{\mathrm{out}}(T)\le N_{s,\mathrm{deep},\max}^{\mathrm{out}}.
>    $$
>
> Then the total outward self contribution from deep-past roots satisfies
> $$
> A_{s,\mathrm{deep}}^{\mathrm{out}}(T)
> \le
> \overline A_{s,\mathrm{deep}}^{\mathrm{out}}
> \equiv
> N_{s,\mathrm{deep},\max}^{\mathrm{out}}\,
> \frac{\kappa\epsilon^2}{
> \big((R_{\mathrm{deep}}^{\mathrm{out}})^2+\epsilon_c^2\big)\,\nu_{s,\mathrm{deep}}^{\mathrm{out}}}.
> $$
> Consequently, if
> $$
> \underline A_p^{\mathrm{out}}
> -
> \overline A_{s,\mathrm{deep}}^{\mathrm{out}}
> -
> \frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
> \sigma_{\mathrm{out}}\,\epsilon_c^2}
> \ge
> a_{\mathrm{in},\mathrm{full}}^{\mathrm{out}}>0,
> $$
> then the full outward self-drive on the apocenter window is dominated and the outer-force margin becomes unconditional there.

This is the final missing outer-branch analogue of the post-crossing self-drive bound: local same-side roots are eliminated by the sub-field-speed sorting geometry, while the deep-past roots must be shown harmless by distance and Jacobian dilution.

### Deep-past suppression ladder

The intended proof order is:

1. **Deep-past separation lemma.**
   Show that any same-side outer root with
   $$
   T_s<T_a
   $$
   must satisfy a macroscopic delay gap and hence a macroscopic spatial separation
   $$
   r_s(T;T_s)\ge R_{\mathrm{deep}}^{\mathrm{out}}
   $$
2. **Deep-past transversality lemma.**
   Prove that the emitting velocities at those earlier times stay away from the outer caustic side, giving
   $$
   |J_s|\ge \nu_{s,\mathrm{deep}}^{\mathrm{out}}
   $$
3. **Deep-past root-count lemma.**
   Bound the number of such roots by a class constant.
4. **Deep-past suppression corollary.**
   Combine the three bounds into the explicit amplitude estimate above.

The first two items are the real bottlenecks. Once deep-past roots are diluted by distance and Jacobian control, the outer-turn proposition becomes a direct explicit parameter race.

**Lemma 30: Deep-past separation on a trimmed apocenter window.**
Assume the hypotheses of Lemma 26 on a final sub-field-speed apocenter window
$$
[T_a,T_b]
$$
and fix a trimming parameter
$$
0<\tau_{\mathrm{deep}}\le T_b-T_a
$$
Let
$$
I_{\mathrm{deep}}
\equiv
[T_a+\tau_{\mathrm{deep}},\,T_b]
$$
If
$$
T\in I_{\mathrm{deep}}
$$
and
$$
T_s<T_a
$$
is a same-side outward-driving self root satisfying
$$
z(T_s)=z(T)
$$
then:

1. the delayed time gap is uniformly bounded below,
   $$
   T-T_s\ge \tau_{\mathrm{deep}}
   $$
2. and the causal self separation is therefore macroscopic,
   $$
   r_s(T;T_s)=c_f(T-T_s)\ge c_f\tau_{\mathrm{deep}}
   $$

In particular, on the trimmed subwindow
$$
I_{\mathrm{deep}}
$$
one may take
$$
R_{\mathrm{deep}}^{\mathrm{out}}=c_f\tau_{\mathrm{deep}}
$$

Proof.
Because
$$
T\in[T_a+\tau_{\mathrm{deep}},\,T_b]
$$
and
$$
T_s<T_a
$$
one immediately has
$$
T-T_s>(T_a+\tau_{\mathrm{deep}})-T_a=\tau_{\mathrm{deep}}
$$
hence in particular
$$
T-T_s\ge \tau_{\mathrm{deep}}
$$

For an outward-driving same-side self root on the right exterior outbound branch, the causal relation is
$$
X(T)-X(T_s)=c_f(T-T_s)
$$
Therefore
$$
r_s(T;T_s)=c_f(T-T_s)\ge c_f\tau_{\mathrm{deep}}
$$
which proves the lemma.

**Lemma 31: Deep-past transversality from a sub-field-speed source region.**
Assume there exists a source interval
$$
I_{\mathrm{src}}^{\mathrm{deep}}\subseteq (-\infty,T_a]
$$
on which the emitting velocities satisfy the strict sub-field-speed bound
$$
0\le \frac{dX}{dT}(\theta)\le c_f-\nu_{\mathrm{deep}}
<c_f
\qquad
\text{for every }\theta\in I_{\mathrm{src}}^{\mathrm{deep}}
$$
with some
$$
\nu_{\mathrm{deep}}>0
$$
Let
$$
T\in I_{\mathrm{deep}}
$$
and let
$$
T_s\in I_{\mathrm{src}}^{\mathrm{deep}}
$$
be a same-side outward-driving self root satisfying
$$
z(T_s)=z(T)
$$
Then the self Jacobian at the emitting time obeys
$$
J_s(T;T_s)=1-\frac{\frac{dX}{dT}(T_s)}{c_f}
\ge
\frac{\nu_{\mathrm{deep}}}{c_f}>0
$$

In particular, on such deep-past roots one may take
$$
\nu_{s,\mathrm{deep}}^{\mathrm{out}}=\frac{\nu_{\mathrm{deep}}}{c_f}
$$

Proof.
For a same-side outward-driving self root on the right exterior outbound branch one has
$$
X(T)-X(T_s)=c_f(T-T_s),
\qquad
X(T)>X(T_s)
$$
so the line-of-action sign is
$$
\hat r_s(T;T_s)=+1
$$
Therefore the self Jacobian reduces to
$$
J_s(T;T_s)=1-\frac{\frac{dX}{dT}(T_s)}{c_f}
$$
Because
$$
T_s\in I_{\mathrm{src}}^{\mathrm{deep}}
$$
and the source interval is strictly sub-field-speed, we have
$$
\frac{dX}{dT}(T_s)\le c_f-\nu_{\mathrm{deep}}
$$
Substituting gives
$$
J_s(T;T_s)
\ge
1-\frac{c_f-\nu_{\mathrm{deep}}}{c_f}
=
\frac{\nu_{\mathrm{deep}}}{c_f}>0
$$
which proves the lemma.

**Corollary 32: Deep-past amplitude suppression on a trimmed apocenter window.**
Assume:

- the hypotheses of Lemma 30 on the trimmed apocenter window
  $$
  I_{\mathrm{deep}}=[T_a+\tau_{\mathrm{deep}},\,T_b]
  $$
- the hypotheses of Lemma 31 with a deep-past sub-field-speed source interval
  $$
  I_{\mathrm{src}}^{\mathrm{deep}}\subseteq (-\infty,T_a]
  $$
- and a deep-past root-count bound
  $$
  N_{s,\mathrm{deep}}^{\mathrm{out}}(T)\le N_{s,\mathrm{deep},\max}^{\mathrm{out}}
  $$
  for
  $$
  T\in I_{\mathrm{deep}}
  $$

Then the total outward self contribution from deep-past same-side roots satisfies
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(T)
\le
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
\equiv
N_{s,\mathrm{deep},\max}^{\mathrm{out}}\,
\frac{\kappa\epsilon^2}{
\big(c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2\big)\,(\nu_{\mathrm{deep}}/c_f)}
$$
for every
$$
T\in I_{\mathrm{deep}}
$$

In particular, on the trimmed apocenter window the full outward self-drive is bounded by
$$
A_s^{\mathrm{out}}(T)
\le
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$
provided the only remaining local same-side contribution is the shell tail of Lemma 27.

Proof.
Fix
$$
T\in I_{\mathrm{deep}}
$$
and let
$$
T_s<T_a
$$
be any outward-driving same-side deep-past root with
$$
z(T_s)=z(T)
$$
Lemma 30 gives the macroscopic separation bound
$$
r_s(T;T_s)\ge c_f\tau_{\mathrm{deep}}
$$
Lemma 31 gives the transversality bound
$$
|J_s(T;T_s)|\ge \frac{\nu_{\mathrm{deep}}}{c_f}
$$
A deep-past root retained on the outbound leg is an outward-driving root, so
$\hat r_s=+1$ while $\frac{dX}{dT}(T)\ge0$. Hence
$|D_{T,s}|/c_f=1-\frac{dX/dT(T)}{c_f}\le1$: the receiver recedes from these
emission points and the deep-past drive is receiver-normal suppressed. The
source-normal-only estimate is therefore a valid ceiling, and dropping the
suppression only weakens the bound. Each deep-past branch contributes at most
$$
\frac{\kappa\epsilon^2\,W_s^{\mathrm{rec}}(T;T_s)}{r_s(T;T_s)^2+\epsilon_c^2}
\le
\frac{\kappa\epsilon^2}{
\big(r_s(T;T_s)^2+\epsilon_c^2\big)\,|J_s(T;T_s)|}
\le
\frac{\kappa\epsilon^2}{
\big(c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2\big)\,(\nu_{\mathrm{deep}}/c_f)}
$$
This step is a branch-resolved reduction and is licensed only because the deep-past window is separated from the caustic hinge by Lemma 30 and from the origin layer by the trimming hypothesis. It may not be applied across either.

Summing over at most
$$
N_{s,\mathrm{deep},\max}^{\mathrm{out}}
$$
deep-past roots yields
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(T)
\le
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
$$
which proves the first claim.

If, in addition, the only local same-side outward contribution is the shell tail on the final sub-field-speed window, Lemma 27 supplies the second term, and the stated total bound follows by addition.

**Corollary 33: Full trimmed-apocenter outer-force margin.**
Assume on the trimmed apocenter window
$$
I_{\mathrm{deep}}=[T_a+\tau_{\mathrm{deep}},\,T_b]
$$
that:

- the partner lower bound of Lemma 20 holds,
  $$
  A_p(T)\ge \underline A_p^{\mathrm{out}}
  $$
- the same-side local self contribution is only the shell tail controlled by Lemma 27,
- and the deep-past outward self contribution satisfies the suppression estimate of Corollary 32.

If
$$
\underline A_p^{\mathrm{out}}
-
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
-
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
\ge
a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}>0
$$
then on
$$
I_{\mathrm{deep}}
$$
the full outward self-drive is dominated and one has the unconditional inward acceleration bound
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}<0
$$

In particular, if
$$
|I_{\mathrm{deep}}|
\ge
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}}
$$
where
$$
v_{\mathrm{deep}}
\equiv
\sup_{T\in I_{\mathrm{deep}}}\frac{dX}{dT}(T)
$$
then the same comparison argument as in Lemma 23 forces a finite outer turn inside or immediately after the trimmed window.

Proof.
By Lemma 20,
$$
A_p(T)\ge \underline A_p^{\mathrm{out}}
$$
By Corollary 32,
$$
A_s^{\mathrm{out}}(T)
\le
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$
Therefore the signed dynamics satisfy
$$
\frac{d^2X}{dT^2}(T)\le -A_p(T)+A_s^{\mathrm{out}}(T)
\le
-\underline A_p^{\mathrm{out}}
+
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$
The assumed parameter inequality gives
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}<0
$$
which proves the first claim.

If the trimmed window length dominates
$$
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}}
$$
then integrating the acceleration comparison exactly as in Lemma 23 forces the outward velocity to hit zero in finite time. This yields a finite outer turn on or just beyond the trimmed apocenter interval.

**Lemma 34: Deep-past source localization by outer-level exclusion.**
Assume the first origin crossing occurs at
$$
T=0,
\qquad
X(0)=0
$$
and let
$$
I_{\mathrm{deep}}=[T_a+\tau_{\mathrm{deep}},\,T_b]
\subseteq
[T_\ast,T_{\mathrm{turn}}^{\mathrm{out}}]
$$
be a trimmed apocenter window on the later right exterior outbound branch. Assume moreover that the outer sorting levels on the trimmed window lie strictly below the entire earlier outbound range:
$$
\sup_{T\in I_{\mathrm{deep}}} z(T)
<
\inf_{0\le S\le T_a} z(S)
$$
If
$$
T\in I_{\mathrm{deep}}
$$
and
$$
T_s<T_a
$$
satisfies
$$
z(T_s)=z(T)
$$
then necessarily
$$
T_s<0
$$

In particular, every deep-past same-side root on the trimmed apocenter window is forced onto the pre-crossing leg.

Proof.
Fix
$$
T\in I_{\mathrm{deep}}
$$
and suppose for contradiction that
$$
0\le T_s\le T_a
$$
Then by the assumed outbound-level exclusion one has
$$
z(T)
\le
\sup_{r\in I_{\mathrm{deep}}} z(r)
<
\inf_{0\le S\le T_a} z(S)
\le
z(T_s)
$$
which contradicts
$$
z(T_s)=z(T)
$$
Therefore
$$
T_s<0
$$
as claimed.

**Lemma 35: Deep-past root uniqueness and automatic transversality on the pre-crossing inbound leg.**
Assume the hypotheses of Lemma 34, and assume the pre-crossing source interval
$$
[-h,0]
$$
satisfies
$$
\frac{dX}{dT}(S)<0
\qquad
\text{for }S\in[-h,0]
$$
If
$$
T\in I_{\mathrm{deep}}
$$
and
$$
T_s<0
$$
is a same-side outward-driving self root with
$$
z(T_s)=z(T)
$$
then:

1. the source root is unique on
   $$
   [-h,0]
   $$
2. the self Jacobian satisfies the automatic lower bound
   $$
   J_s(T;T_s)=1-\frac{\frac{dX}{dT}(T_s)}{c_f}>1
   $$
3. and hence one may take
   $$
   N_{s,\mathrm{deep},\max}^{\mathrm{out}}\le 1,
   \qquad
   \nu_{s,\mathrm{deep}}^{\mathrm{out}}\ge 1
   $$
   on the trimmed apocenter window.

Proof.
On the pre-crossing inbound leg one has
$$
\frac{dz}{dT}(S)=\frac{dX}{dT}(S)-c_f<-c_f<0
\qquad
\text{for }S\in[-h,0]
$$
Therefore
$$
z
$$
is strictly decreasing on
$$
[-h,0]
$$
Hence the level equation
$$
z(S)=z(T)
$$
can have at most one solution
$$
S\in[-h,0]
$$
which proves uniqueness of the deep-past source root on that interval.

For a same-side outward-driving self root on the right exterior outbound branch one has
$$
\hat r_s(T;T_s)=+1
$$
so
$$
J_s(T;T_s)=1-\frac{\frac{dX}{dT}(T_s)}{c_f}
$$
Since
$$
\frac{dX}{dT}(T_s)<0
$$
it follows immediately that
$$
J_s(T;T_s)>1
$$
Thus
$$
|J_s(T;T_s)|\ge 1
$$
and the stated bounds
$$
N_{s,\mathrm{deep},\max}^{\mathrm{out}}\le 1,
\qquad
\nu_{s,\mathrm{deep}}^{\mathrm{out}}\ge 1
$$
follow.

**Corollary 36: Refined deep-past suppression from outbound-level exclusion.**
Assume:

- the hypotheses of Lemma 30 on the trimmed apocenter window
  $$
  I_{\mathrm{deep}}=[T_a+\tau_{\mathrm{deep}},\,T_b]
  $$
- the outbound-level exclusion hypothesis of Lemma 34,
  $$
  \sup_{T\in I_{\mathrm{deep}}} z(T)
  <
  \inf_{0\le S\le T_a} z(S)
  $$
- and the pre-crossing inbound monotonicity hypothesis of Lemma 35,
  $$
  \frac{dX}{dT}(S)<0
  \qquad
  \text{for }S\in[-h,0]
  $$

Then every deep-past same-side outward-driving root on
$$
I_{\mathrm{deep}}
$$
lies on the pre-crossing inbound leg, is unique, and satisfies
$$
|J_s(T;T_s)|\ge 1
$$
Consequently,
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(T)
\le
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
\qquad
\text{for every }T\in I_{\mathrm{deep}}
$$

Proof.
By Lemma 34, any deep-past same-side root with
$$
z(T_s)=z(T)
$$
must satisfy
$$
T_s<0
$$
Lemma 35 then shows that on the pre-crossing inbound leg such a root is unique and obeys
$$
|J_s(T;T_s)|\ge 1
$$
Lemma 30 gives the separation bound
$$
r_s(T;T_s)\ge c_f\tau_{\mathrm{deep}}
$$
This root drives the receiver outward, so $\hat r_s=+1$ while $\frac{dX}{dT}(T)\ge0$ on the apocenter window. By the weight conversion its receiver-normal numerator obeys $|D_{T,s}|/c_f=1-\frac{dX/dT(T)}{c_f}\le1$, so the branch is receiver-normal suppressed and the source-normal-only quotient is a valid ceiling. Therefore the single deep-past branch contributes at most
$$
\frac{\kappa\epsilon^2\,W_s^{\mathrm{rec}}(T;T_s)}{r_s(T;T_s)^2+\epsilon_c^2}
\le
\frac{\kappa\epsilon^2}{
\big(r_s(T;T_s)^2+\epsilon_c^2\big)\,|J_s(T;T_s)|}
\le
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
$$
which proves the claim.

**Corollary 37: Refined trimmed-apocenter outer-force margin.**
Assume on the trimmed apocenter window
$$
I_{\mathrm{deep}}=[T_a+\tau_{\mathrm{deep}},\,T_b]
$$
that:

- the partner lower bound of Lemma 20 holds,
  $$
  A_p(T)\ge \underline A_p^{\mathrm{out}}
  $$
- the same-side local self contribution is only the shell tail controlled by Lemma 27,
- the hypotheses of Corollary 36 hold, so the deep-past same-side contribution satisfies
  $$
  A_{s,\mathrm{deep}}^{\mathrm{out}}(T)
  \le
  \frac{\kappa\epsilon^2}{
  c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
  $$
- and there are no additional outward-driving self branches on
  $$
  I_{\mathrm{deep}}
  $$
  beyond those two channels.

If
$$
\underline A_p^{\mathrm{out}}
-
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
-
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
\ge
a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}>0
$$
then on
$$
I_{\mathrm{deep}}
$$
one has the unconditional inward acceleration bound
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
$$

In particular, if
$$
|I_{\mathrm{deep}}|
\ge
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}}
$$
then the same comparison argument as in Lemma 23 forces a finite outer turn on or just beyond the trimmed apocenter window.

Proof.
By Lemma 20,
$$
A_p(T)\ge \underline A_p^{\mathrm{out}}
$$
By Corollary 36,
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(T)
\le
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
$$
By Lemma 27, the local same-side shell leakage satisfies
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(T)
\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$
Under the stated hypothesis that these exhaust the outward-driving self channels on
$$
I_{\mathrm{deep}}
$$
the full outward self contribution is bounded by the sum of those two terms. Therefore
$$
\frac{d^2X}{dT^2}(T)\le -A_p(T)+A_s^{\mathrm{out}}(T)
\le
-\underline A_p^{\mathrm{out}}
+
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
$$
The assumed parameter inequality gives
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
$$
which proves the first claim.

If
$$
|I_{\mathrm{deep}}|
\ge
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}}
$$
then integrating the acceleration comparison exactly as in Lemma 23 forces the outward velocity to hit zero in finite time, yielding a finite outer turn on or just beyond the trimmed apocenter interval.

### z-map descent target

The outer-turn and deep-past layers are now reduced to one remaining geometric hypothesis:
$$
\sup_{T\in I_{\mathrm{deep}}} z(T)
<
\inf_{0\le S\le T_a} z(S),
\qquad
z(T)=X(T)-c_f T
$$
This is an exclusion statement saying that the late apocenter levels of
$$
z
$$
have descended below the entire earlier outbound range. Once this holds, the deep-past roots are forced onto the pre-crossing inbound leg by Lemma 34, and the refined outer-force margin becomes fully explicit.

> **Target Theorem (Outbound-Level Exclusion by z-Descent).**
> Assume the right exterior outbound branch starts at the first origin crossing with
> $$
> X(0)=0,
> \qquad
> \frac{dX}{dT}(0)=V_0>c_f,
> $$
> and later develops an outer hinge time
> $$
> T_{\mathrm{hinge}}^{\mathrm{out}}
> $$
> defined by
> $$
> \frac{dX}{dT}\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)=c_f.
> $$
> Assume further that on the post-hinge outbound branch there is a sub-field-speed deceleration window on which
> $$
> \frac{d^2X}{dT^2}(T)\le -a_{z}^{\mathrm{out}}<0.
> $$
> If the resulting descent of
> $$
> z(T)=X(T)-c_f T
> $$
> is large enough that, on a trimmed apocenter window
> $$
> I_{\mathrm{deep}}=[T_a+\tau_{\mathrm{deep}},\,T_b],
> $$
> one has
> $$
> \sup_{T\in I_{\mathrm{deep}}} z(T)
> <
> \inf_{0\le S\le T_a} z(S),
> $$
> then Lemma 34 applies and the deep-past same-side roots are forced onto the pre-crossing inbound leg.

This theorem isolates the final missing global shape statement for the outer sorting map. The earlier sections now reduce the outer-turn problem to proving enough descent of
$$
z
$$
after the outer hinge.

### z-map descent ladder

The intended proof order is:

1. **Outer-hinge lemma.**
   Show that the outbound branch has a first time
   $$
   T_{\mathrm{hinge}}^{\mathrm{out}}
   $$
   with
   $$
   \frac{dX}{dT}=c_f
   $$
   so
   $$
   \frac{dz}{dT}=0
   $$
2. **Post-hinge monotonicity lemma.**
   Prove that once
   $$
   \frac{dX}{dT}<c_f
   $$
   the sorting map
   $$
   z(T)=X(T)-c_f T
   $$
   is strictly decreasing.
3. **Quadratic descent lemma.**
   Use the post-hinge acceleration floor to obtain an explicit estimate
   $$
   z(T)\le z\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
   -
   \frac{a_{z}^{\mathrm{out}}}{2}
   \big(T-T_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
   $$
4. **Outbound-level exclusion corollary.**
   Compare this late-time upper bound with the earlier outbound range
   $$
   [0,T_a]
   $$
   to verify the hypothesis of Lemma 34.

The third and fourth items are the real bottlenecks. Once the descent estimate pushes the late
$$
z
$$
levels below the earlier outbound range, the deep-past topology is fully controlled.

**Lemma 38: Outer hinge and z-monotonicity on the outbound branch.**
Assume the right exterior outbound branch satisfies
$$
\frac{dX}{dT}(0)=V_0>c_f
$$
and later reaches a first outer turn at time
$$
T_{\mathrm{turn}}^{\mathrm{out}}
$$
with
$$
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0
$$
Then there exists a first outer hinge time
$$
T_{\mathrm{hinge}}^{\mathrm{out}}
\in
(0,T_{\mathrm{turn}}^{\mathrm{out}})
$$
such that
$$
\frac{dX}{dT}\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)=c_f
$$
Moreover, for
$$
z(T)=X(T)-c_f T
$$
one has
$$
\frac{dz}{dT}(T)=\frac{dX}{dT}(T)-c_f
$$
so
$$
\frac{dz}{dT}(T)>0
$$
for
$$
0\le T<T_{\mathrm{hinge}}^{\mathrm{out}}
$$
and
$$
\frac{dz}{dT}(T)\le 0
$$
for
$$
T_{\mathrm{hinge}}^{\mathrm{out}}\le T\le T_{\mathrm{turn}}^{\mathrm{out}}
$$

Proof.
The velocity
$$
\frac{dX}{dT}
$$
is continuous on the outbound branch. At the crossing,
$$
\frac{dX}{dT}(0)=V_0>c_f
$$
while at the outer turn,
$$
\frac{dX}{dT}\!\big(T_{\mathrm{turn}}^{\mathrm{out}}\big)=0<c_f
$$
By the intermediate value theorem there exists at least one time
$$
T\in(0,T_{\mathrm{turn}}^{\mathrm{out}})
$$
for which
$$
\frac{dX}{dT}(T)=c_f
$$
Define
$$
T_{\mathrm{hinge}}^{\mathrm{out}}
$$
to be the first such time. Then
$$
\frac{dX}{dT}(T)>c_f
\qquad
\text{for }0\le T<T_{\mathrm{hinge}}^{\mathrm{out}}
$$
and by definition
$$
\frac{dX}{dT}\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)=c_f
$$
Therefore
$$
\frac{dz}{dT}(T)=\frac{dX}{dT}(T)-c_f>0
$$
before the hinge, and
$$
\frac{dz}{dT}\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)=0
$$
If in addition the post-hinge branch remains sub-field-speed, then
$$
\frac{dz}{dT}(T)\le 0
$$
there. This proves the stated monotonicity.

**Lemma 39: Quadratic post-hinge z-descent.**
Assume there exists a post-hinge interval
$$
[T_{\mathrm{hinge}}^{\mathrm{out}},\,T_c]
\subseteq
[T_{\mathrm{hinge}}^{\mathrm{out}},\,T_{\mathrm{turn}}^{\mathrm{out}}]
$$
on which
$$
\frac{d^2X}{dT^2}(T)\le -a_{z}^{\mathrm{out}}<0
$$
Then for every
$$
T\in[T_{\mathrm{hinge}}^{\mathrm{out}},\,T_c]
$$
one has
$$
\frac{dz}{dT}(T)\le -a_{z}^{\mathrm{out}}\big(T-T_{\mathrm{hinge}}^{\mathrm{out}}\big)
$$
and
$$
z(T)\le z\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
-\frac{a_{z}^{\mathrm{out}}}{2}
\big(T-T_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
$$

Proof.
Since
$$
z(T)=X(T)-c_f T
$$
one has
$$
\frac{d^2z}{dT^2}(T)=\frac{d^2X}{dT^2}(T)
$$
On the stated interval this gives
$$
\frac{d^2z}{dT^2}(T)\le -a_{z}^{\mathrm{out}}<0
$$
At the outer hinge,
$$
\frac{dz}{dT}\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
=
\frac{dX}{dT}\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)-c_f
=0
$$
Integrating the acceleration bound from
$$
T_{\mathrm{hinge}}^{\mathrm{out}}
$$
to
$$
T
$$
yields
$$
\frac{dz}{dT}(T)
\le
-a_{z}^{\mathrm{out}}
\big(T-T_{\mathrm{hinge}}^{\mathrm{out}}\big)
$$
which is the first claim. Integrating once more gives
$$
z(T)
\le
z\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
-\frac{a_{z}^{\mathrm{out}}}{2}
\big(T-T_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
$$
which proves the quadratic descent estimate.

**Corollary 40: Outbound-level exclusion from explicit z-descent.**
Assume the hypotheses of Lemma 39 and let
$$
I_{\mathrm{deep}}=[T_a+\tau_{\mathrm{deep}},\,T_b]
\subseteq
[T_{\mathrm{hinge}}^{\mathrm{out}},\,T_c]
$$
be a trimmed apocenter window on the post-hinge branch. Define the earlier outbound floor
$$
m_{\mathrm{out}}^{\mathrm{early}}
\equiv
\inf_{0\le S\le T_a} z(S)
$$
If
$$
z\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
-
\frac{a_{z}^{\mathrm{out}}}{2}
\big(T_a+\tau_{\mathrm{deep}}-T_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
<
m_{\mathrm{out}}^{\mathrm{early}}
$$
then the outbound-level exclusion hypothesis of Lemma 34 holds:
$$
\sup_{T\in I_{\mathrm{deep}}} z(T)
<
\inf_{0\le S\le T_a} z(S)
$$

Proof.
Because
$$
I_{\mathrm{deep}}\subseteq
[T_{\mathrm{hinge}}^{\mathrm{out}},\,T_c]
$$
and Lemma 39 gives
$$
\frac{dz}{dT}(T)\le -a_{z}^{\mathrm{out}}\big(T-T_{\mathrm{hinge}}^{\mathrm{out}}\big)\le 0
$$
on that interval, the function
$$
z
$$
is nonincreasing there. Therefore its supremum on
$$
I_{\mathrm{deep}}
$$
is attained at the left endpoint:
$$
\sup_{T\in I_{\mathrm{deep}}} z(T)=z(T_a+\tau_{\mathrm{deep}})
$$
Applying Lemma 39 at
$$
T=T_a+\tau_{\mathrm{deep}}
$$
yields
$$
z(T_a+\tau_{\mathrm{deep}})
\le
z\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
-
\frac{a_{z}^{\mathrm{out}}}{2}
\big(T_a+\tau_{\mathrm{deep}}-T_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
$$
If the right-hand side is strictly smaller than
$$
m_{\mathrm{out}}^{\mathrm{early}}
=
\inf_{0\le S\le T_a} z(S)
$$
then
$$
\sup_{T\in I_{\mathrm{deep}}} z(T)
<
\inf_{0\le S\le T_a} z(S)
$$
which is exactly the required outbound-level exclusion.

**Remark (Simplified earlier-outbound floor).**
Under the hypotheses of Lemma 38, the function
$$
z(T)=X(T)-c_f T
$$
is strictly increasing on
$$
[0,T_{\mathrm{hinge}}^{\mathrm{out}})
$$
and nonincreasing on
$$
[T_{\mathrm{hinge}}^{\mathrm{out}},T_a]
$$
Therefore the earlier outbound floor satisfies
$$
m_{\mathrm{out}}^{\mathrm{early}}
=
\inf_{0\le S\le T_a} z(S)
=
\min\{z(0),z(T_a)\}
=
\min\{0,z(T_a)\}
$$
because
$$
z(0)=X(0)-c_f\cdot 0=0
$$
In particular, a sufficient condition for outbound-level exclusion is simply
$$
z(T_a+\tau_{\mathrm{deep}})<0
$$
or more conservatively, the explicit descent inequality
$$
z\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
-
\frac{a_{z}^{\mathrm{out}}}{2}
\big(T_a+\tau_{\mathrm{deep}}-T_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
<0
$$

> **Proposition (Unified trimmed-apocenter outer-turn criterion).**
> Assume:
> 1. the partner lower bound of Lemma 20 holds on a trimmed apocenter window
>    $$
>    I_{\mathrm{deep}}=[T_a+\tau_{\mathrm{deep}},\,T_b],
>    $$
> 2. the same-side local self contribution on that window is only the shell tail controlled by Lemma 27,
> 3. the pre-crossing inbound source interval satisfies
>    $$
>    \frac{dX}{dT}(S)<0
>    \qquad
>    \text{for }S\in[-h,0],
>    $$
> 4. the post-hinge branch satisfies the quadratic descent estimate of Lemma 39,
> 5. and the following two explicit inequalities hold:
>    $$
>    z\!\big(T_{\mathrm{hinge}}^{\mathrm{out}}\big)
>    -
>    \frac{a_{z}^{\mathrm{out}}}{2}
>    \big(T_a+\tau_{\mathrm{deep}}-T_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
>    <0,
>    $$
>    $$
>    \underline A_p^{\mathrm{out}}
>    -
>    \frac{\kappa\epsilon^2}{c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
>    -
>    \frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
>    \sigma_{\mathrm{out}}\,\epsilon_c^2}
>    \ge
>    a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}>0.
>    $$
>
> Then:
> 1. outbound-level exclusion holds on
>    $$
>    I_{\mathrm{deep}},
>    $$
> 2. every deep-past same-side outward-driving root is forced onto the pre-crossing inbound leg and is unique there,
> 3. the trimmed-apocenter acceleration satisfies
>    $$
>    \frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
>    \qquad
>    \text{for }T\in I_{\mathrm{deep}},
>    $$
> 4. and if
>    $$
>    |I_{\mathrm{deep}}|
>    \ge
>    \frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}},
>    $$
>    then a finite outer turn occurs on or just beyond the trimmed apocenter window.

Proof.
The first displayed inequality and Corollary 40 imply the outbound-level exclusion hypothesis of Lemma 34. Lemma 35 then forces any deep-past same-side outward-driving root onto the pre-crossing inbound leg, where it is unique and satisfies
$$
|J_s|\ge 1
$$
Therefore Corollary 36 yields the deep-past bound
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(T)
\le
\frac{\kappa\epsilon^2}{c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
$$
Combining that with the shell-tail bound of Lemma 27 and the partner floor of Lemma 20 gives exactly the second displayed inequality, so Corollary 37 applies and yields
$$
\frac{d^2X}{dT^2}(T)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
\qquad
\text{on }I_{\mathrm{deep}}
$$
If the trimmed window length dominates
$$
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}}
$$
then the same comparison argument as in Lemma 23 forces the outward velocity to hit zero in finite time, yielding a finite outer turn on or just beyond
$$
I_{\mathrm{deep}}
$$

### Equal-amplitude cycling

The current delayed geometry does not naturally point to a continuous family of equal-amplitude cycles. In a purely causal delayed system, the more plausible generic picture is:

- net delayed braking at large excursion,
- net delayed pumping at small excursion,
- and an isolated balance point where the two effects cancel over one cycle.

If that picture is correct, the relevant mathematical object is an isolated fixed point of $P_\eta$, possibly attracting, rather than a one-parameter conservative orbit family. Equal-amplitude cycling is therefore plausible only if some stronger cycle-balance or exact history-functional structure is present; otherwise one should expect amplitude drift to be the generic behavior away from the fixed point.

### Residual Scope Boundaries

The scaffold is now coherent enough to freeze as a proof program, but the following scope boundaries still need to stay explicit.

- **Origin singularity.** The shell regularization $\delta_\eta$ does not by itself remove the divergence of the amplitude factor $1/r^2$ at the origin crossing. For the current braking-dominance theorem target, an explicit core mollifier of the denominator should be treated as required rather than optional, for example by replacing $r^{-2}$ with $(r^2+\epsilon_c^2)^{-1}$ or an equivalent short-distance regularization.
- **State-space labeling.** The theorem program is safest in true signed coordinates $X\in\mathbb{R}$, with recapture phrased in the radial variable $\rho=|X|$. Any language suggesting a rebound on the same $X>0$ branch before the origin should be treated as provisional shorthand rather than as a derived dynamical fact.
- **Physical plausibility boundary.** In the collinear geometry the self term is not a centrifugal barrier. On the physically relevant post-crossing outbound branch it tends to reinforce the current radial motion. So the only plausible recapture mechanism in this model is that delayed partner attraction eventually dominates that outward self-drive on the outer leg. If the outer-turn theorem target fails, then the collinear breather should be read as a failed stabilization test rather than as an almost-closed proof.
- **Polarity-signed damping is the real obstruction.** The receiver-normal weight conversion shows why the outer-turn target is hard, and it is not the field-speed threshold. The collinear law is exactly $\frac{d^2X}{dT^2}+\Gamma\frac{dX}{dT}=c_f\Xi$ with $\Gamma=\sum_\ell w_\ell$ carrying the polarity sign of each branch. Partner attraction anti-damps and injects at rate $|w_p|s_p^2$ on *both* legs; self-repulsion damps and drains at rate $w_ss_s^2$. The self rows are therefore the only damping channel available, and a closed cycle requires the self drain to balance the partner injection over the period. A partner-only reduction cannot bind at any coupling: it is a strictly anti-damped delayed oscillator. Whether the retained self rows are strong enough to close the balance is exactly the open content of the outer-turn theorem target, and no source-normal-only estimate can see the question, because the source-normal-only weight is work-symmetric and has $\Gamma\equiv0$.
- **Apocenter-entry window.** Lemma 29 supplies the strict sub-field-speed window from a coarse entry-brake margin, or else reaches the outer turn before that window is needed. The global proof still has to include the coarse entry-brake ceiling inside the coupled parameter regime rather than smuggling it in through the local z-map argument.
- **Past-velocity transversality.** The Jacobians $J_p$ and $J_s$ depend on emission-time velocities, not current velocity. Turning through $\frac{dX}{dT}=0$ at the present time does not by itself preserve transversality, so the lower bounds on $|J|$ must be checked against the delayed high-speed part of the history. These remain source-normal quantities; the receiver-normal numerator on the same retained record is supplied by the weight conversion, which converts each $1/|J|$ estimate into the canonical $W^{\mathrm{rec}}$ weight through the factor $|D_T|/c_f\in[\Theta_-,\Theta_+]$.
- **Partner-root inequality, not equality.** As the trajectory brakes after the crossing, the true partner distance can only become smaller than the leading linear prediction, which strengthens the partner force. So the partner-root estimate should be used as an upper bound on $r_p(T)$ and therefore a lower bound on $A_p^{\rho}(T)$, not as an exact identity on the nonlinear window.
- **Inner rebound region.** The theorem program still packages the actual near-center reversal into the admissible history class. That is acceptable for the reduced problem, but it means the hardest local dynamics near the inner rebound is not yet derived from first principles here.
- **Root multiplicity control.** The branch sums defining $A_p$, $A_s^{\text{out}}$, and $A_s^{\text{in}}$ are only tame if the number of active roots stays controlled. The regularized model softens each branch contribution, but it does not by itself prevent root proliferation from defeating the envelope bounds.
- **Candidate-packet falsification.** A rejected candidate packet may preserve useful diagnostics, such as strict subrows, fold normal forms, or range gaps, but those diagnostics do not promote the packet into a branch chart. Once a pre-ledger leaves a positive-width parent-complement overlap, a residual equality core, or an uncertified endpoint-scale gap, the same packet cannot feed the corridor, monodromy, returned-sample, topology, or Schauder rows.
- **Compactness is conditional.** The added acceleration bound is the right first step toward precompactness in $C^1$, but a later fixed-point theorem will still need the exact topology and continuity properties of the return map to be verified rather than assumed.
- **Continuity through the crossing.** The theorem uses a history class in which velocity is continuous through $T=0$, but the dual-mollified acceleration can still develop a very sharp gradient near the origin. Any Banach-space formulation must therefore keep enough Lipschitz-velocity, or weak acceleration, control near the boundary of the history interval that the delayed integrals remain well behaved at the crossing.
- **The head-on collinear breather does not close, and the reason is the anti-damping monotonicity trap.** By the receiver-velocity affine form the collinear law is a polarity-signed damped oscillator: partner attraction anti-damps ($\Gamma_p<0$, a net energy source on every leg) and self-repulsion is the only sink ($\Gamma_s>0$). The decisive structural fact is that self-repulsion requires a self-hit, and a self-hit requires a non-monotone trajectory: on a monotone segment $|X(t)-X(s)|<c_f(t-s)$ for $s<t$, so no self-root exists. A head-on release from rest is globally monotone — it falls to the origin, crosses, and recedes — so the self drain never activates, while partner anti-damping injects energy throughout. Direct stiffness-free integration of the sub-field regime confirms this: the far-side return kinetic energy at the mirror radius converges to a strictly positive floor with the self-work identically zero, and the orbit coasts out (partner attraction then dies by forward-root starvation as the pair recedes near field speed). At stronger coupling the anti-damped infall reaches field speed at finite radius and goes super-field into the origin — the fail-closed field-speed head-on event — so that branch is runaway as well. A collinear breather must therefore be a **folded** history whose self-hit drain, over a period, cancels the partner anti-damping injection; the head-on family is demonstrably not one. This is the concrete reason a stabilization mechanism that breaks monotonicity — dephasing, curvature, or angular momentum — is required, and it relocates the outer-turn target from a force-floor inequality to a non-monotonicity-and-self-drain closure condition.

## Capstone Statement

The existence capstone of the manuscript is the Schauder theorem target above. In compressed form, the final 1D statement is:

> **Theorem Target (Dual-Mollified Collinear Breather).**
> For some nonempty parameter regime
> $$
> (\kappa,\epsilon,c_f,\eta,\epsilon_c,h,X_\ast)
> $$
> and some closed convex tame envelope
> $$
> \mathcal{K}_{X_\ast,\eta}\subseteq \Sigma^-_{X_\ast,\eta},
> $$
> the return map $P_\eta$ has a fixed point
> $$
> \phi^\ast_\eta \in \mathcal{K}_{X_\ast,\eta},
> \qquad
> P_\eta(\phi^\ast_\eta)=\phi^\ast_\eta.
> $$
> The corresponding trajectory is a bounded periodic two-body motion in which:
> 1. partner attraction drives the inward phase,
> 2. a post-crossing outward self-hit drive is eventually overcome strongly enough for radial recapture,
> 3. the motion returns to the same inbound section data after one full cycle.

The stability version is stronger:

> **Further Target (Stable Breather).**
> The Fréchet derivative $DP_\eta(\phi^\ast_\eta)$ has spectral radius $<1$ on the section modulo time-shift symmetry, so the fixed point attracts nearby admissible histories.

This is the first clean theorem target for a self-hit-assisted bounded-recapture mechanism. It avoids the 2D circular tangential obstruction and does not require the full nested shell braid architecture.

## Why This Reduced Problem Comes First

This model should be attacked before the full circular MCB or full nested shell braid for three reasons.

### 1. No tangential obstruction

The circular binary has a tangential no-go problem. The 1D model has no tangential channel at all. That removes the main obstruction already visible in the planar circular analysis.

### 2. Exact scalar branch factors

In 1D,
$$
\hat r \in \{-1,+1\}
$$
so the source-normal delay-map diagnostics reduce to explicit scalar factors
$$
J_p = 1+\frac{\frac{dX}{dT}(T_0)\hat r_p}{c_f},
\qquad
J_s = 1-\frac{\frac{dX}{dT}(T_0)\hat r_s}{c_f}
$$
The receiver-normal numerators $D_T$ are scalar factors as well. This makes
the same-record binding of root identity, source-normal transversality, and
receiver-normal branch strength much easier to track analytically.

### 3. Direct test of the self-hit mechanism

If the collinear breather does not exist even after regularization, then the claim that delayed self-interaction can participate in a bounded binary-recapture mechanism is badly weakened. If the target theorem is eventually closed, then the theory would gain its first rigorous bounded delayed attractor.

## What Counts as Success or Failure

### Success

This reduced problem succeeds if it supports a proof program for:

- local well-posedness of the regularized 1D dynamics,
- well-defined first-return times on a nontrivial section,
- existence of a fixed point of $P_\eta$,
- and, ideally, local stability of that fixed point.

### Failure

This reduced problem fails as a stabilization test if:

- the return map is not well defined on any robust section,
- all trajectories escape or collapse instead of returning,
- the self-hit branches do not produce reversal strongly enough to create recurrence,
- or the $\eta\to 0^+$ limit destroys every regularized bounded orbit.

## Appendix: Why a Closed-Form Solution Is Unlikely

The following boxed aside is heuristic rather than theorem-level. Its purpose is not to prove a no-closed-form theorem, but to explain why the fixed-point and envelope route is mathematically more realistic than a search for an explicit formula
$$
X(T)=f(T,X_0,V_0)
$$
Here "closed-form solution" means an elementary formula for the orbit. It does not mean that the evolution law itself is unavailable. The dual-mollified absolute-time integral law is already an exact certified-law target; branch sums are local reductions on simple-root charts.

> **Heuristic aside.**
>
> The symmetries of the 1D line make a closed formula tempting. One might hope for an expression
> $$
> X(T)=f(T,X_0,V_0)
> $$
> that captures the entire orbit from elementary initial data.
>
> The delayed system does not support that expectation. It is a dynamical object with infinite-dimensional memory, state-dependent delays, and changing root topology, so the natural proof target is an invariant history-space return map rather than a global elementary solution.
>
> **1. The phase space is infinite-dimensional.**
> In ordinary Newtonian mechanics, the state is a point
> $$
> (X_0,V_0)
> $$
> in a finite-dimensional phase space. But the delayed master equation of $\mathbb{A}\mathbb{A}\mathbb{A}$ is non-Markovian. To compute the acceleration at
> $$
> T=0^+,
> $$
> it is not enough to know only
> $$
> X_0
> \qquad
> \text{and}
> \qquad
> V_0.
> $$
> One must know the stored path history
> $$
> \phi(\theta),
> \qquad
> \theta\in[-h,0],
> $$
> because the active causal roots depend on how the particle arrived at the present state. The genuine initial datum is therefore a function, not a point.
>
> **2. The delays are state-dependent and implicit.**
> Even a linear constant-delay equation already resists elementary closed forms. Here the delay times are not fixed constants at all; they are roots of the implicit equations
> $$
> |X(T)\pm X(T_s)|=c_f(T-T_s).
> $$
> The timeline is being solved for at the same moment as the trajectory. The equation is not merely nonlinear; it is continually rewriting its own delayed arguments through the unknown path history.
>
> **3. The caustic changes the root topology.**
> At the hinge
> $$
> \frac{dX}{dT}=-c_f,
> $$
> a new self-hit branch is born. The number of active roots changes with the motion itself. Whatever one chooses to call a "closed form," it should not be expected to glide effortlessly across a dynamics in which the active branch structure changes as the trajectory passes through a causal fold.
>
> **4. The shadow of the three-body problem still hangs over the room.**
> Even instantaneous inverse-square dynamics already taught us that explicit formulas are not to be expected in generic nonlinear few-body problems. Here the 1D breather may look like a two-body problem, but the delayed self-interaction makes it behave like a path-history problem with an effectively infinite braid of past images. One should not expect such a system to become simpler merely because it lives on a line.
>
> **The silver lining.**
> This is why the strategy is mathematically appropriate. It replaces the search for a global closed-form solution with a proof target that is stronger for the purpose of the chapter:
>
> - existence of the delayed orbit,
> - uniqueness once the history is fixed,
> - boundedness inside an invariant envelope,
> - and a fixed point of the return map.
>
> In other words, we do not need a formula for
> $$
> X(T)
> $$
> valid for arbitrary data. The proof needs one candidate cycle
> $$
> \phi_{\mathrm{cyc}},
> $$
> and a finite certificate proving that the return map is continuous, precompact, and self-mapping on one closed convex tame domain.
>
> If one ever seeks formulas again, the natural place is not the global initial-value problem but the periodic orbit itself: after a fixed point
> $$
> \phi_\eta^\ast
> $$
> is established, one might try an asymptotic or Fourier-type representation of that specific limit cycle. But that would be a local description of the attractor, not a universal closed form for arbitrary initial data.

## Related Chapters

- [master-equation.md](../dynamics/master-equation.md)
- [binary-dynamics.md](../dynamics/binary-dynamics.md)
- [causal-action-functional.md](../dynamics/causal-action-functional.md)
- [energy.md](../dynamics/energy.md)
- [Noether Braid Doubling-Frequency Resonance Lock](../noether-braid/noether-braid-doubling-frequency-resonance-lock.md)
