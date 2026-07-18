# Coincident-Endpoint Impulse Lemma for the Newborn Self Root

Status: analysis-only, priority-only. This file does not promote a
receiver-normal convention, a sharp coincident-endpoint law, or a speed
attractor.

Claim level: the frozen-history dual-mollified reduction, the fixed-regulator
impulse, its leading two-regulator scaling, and the branchwise sign comparison
are derived. The resulting one-pass local map is derived only for the retained
prescribed history. Its prediction for a self-consistent trajectory is an
inference and remains a closure target.

Governing inputs: the [P6A speed-attractor analysis](analysis-speed-attractor-derivation.md),
the [P3 signed-convention comparison](analysis-signed-receiver-normal-convention.md),
the canonical [dual-mollified evolution law](../../../content/markdown/aaa/dynamics/master-equation.md#dual-mollified-absolute-time-evolution-law),
and its [finite-$\eta$ quarantine rule](../../../content/markdown/aaa/dynamics/master-equation.md#finite-eta-pathology-quarantine-theorem-target).

## Finding

The newborn short-delay self root gives a finite along-track velocity increment
for every fixed pair $\eta>0$ and $\epsilon_c>0$. It does **not** give a finite,
regulator-independent impulse when both regulators are removed. The leading
magnitude is

$$
|\Delta V_{\parallel,\mathrm{new}}|
\asymp
\frac{\kappa |q_i|^2}
{c_f^2\max\!\left(\sqrt{\eta/\alpha},\epsilon_c/c_f\right)}.
$$

Thus $\eta$ controls resolution of the causal-root birth from the excluded
coincident endpoint, while $\epsilon_c$ controls the inverse-square amplitude
at the same endpoint. Both enter the local law; the larger of their induced
delay scales controls the leading newborn-branch impulse. The core regulator
remains necessary for the unpartitioned same-source diagonal neighborhood even
when the branch-local impulse is width-dominated.

The signed convention preserves the braking sign at every finite regulator:
the newborn contribution is along $-\widehat{\mathbf e}$. The unsigned
convention preserves the opposite, reinforcing sign. However, the signed
braking increment grows rather than converges under regulator refinement. In
the frozen-history local map it generically crosses past $\delta=0$ and leaves
the crossing layer on the sub-field side; the unsigned map leaves on the
super-field side. This is a one-pass overshoot/ejection verdict for the local
layer, not a global runaway or attractor verdict. Settling and chatter require
the self-consistent retained-history return map and are not established here.

Grade: **derived for the frozen-history local reduction; inferred, not
established, for self-consistent evolution**. The finding is overturned if an
analytic treatment of the same dual-mollified law produces a finite,
path-independent joint regulator limit for the complete transition impulse, or
if the self-consistent birth changes the local scaling before the predicted
high-gain kick develops.

## Local Retained-History Geometry

Let $T_0$ be the field-speed crossing, put

$$
t=T-T_0,
\qquad
\tau=T-T_{\mathrm{em}}>0,
$$

and retain the source history through $T_0$. Let

$$
\delta(T)=u(T)-c_f,
\qquad
\alpha=\dot u(T_0)>0,
\qquad
\widehat{\mathbf e}=\frac{\mathbf V_i(T_0)}{c_f}.
$$

On a smooth accelerating same-source history, the leading along-track
expansion is

$$
\delta(T_0+t)=\alpha t+O(t^2),
$$

$$
\mathbf r_{ii}(t,\tau)
=
\mathbf X_i(T_0+t)-\mathbf X_i(T_0+t-\tau)
=
\widehat{\mathbf e}
\left(c_f\tau+\alpha t\tau-\frac12\alpha\tau^2\right)
+O(t^2\tau+t\tau^2+\tau^3).
$$

Curvature changes the direction at $O(\tau)$ but changes its along-track
projection only at higher order. Therefore

$$
g(t,\tau)
=
r_{ii}(t,\tau)-c_f\tau
=
\alpha\tau\left(t-\frac{\tau}{2}\right)
+O(t^2\tau+t\tau^2+\tau^3),
$$

$$
D_T(t,\tau)
=
c_f-\widehat{\mathbf r}_{ii}\cdot\mathbf V_i(T_0+t)
=
-\alpha t+O(t^2+\tau^2).
$$

The leading residual has the excluded endpoint root $\tau=0$ for all $t$ and
the newborn noncoincident root

$$
\tau_*(t)=2t+O(t^2),
\qquad t>0.
$$

At that root,

$$
\Delta_*=\tau_*=\frac{2\delta}{\alpha}+O(\delta^2),
\qquad
D_T=-\delta+O(\delta^2),
\qquad
D_s=+\delta+O(\delta^2),
\qquad
m=-1+O(\delta),
$$

which reproduces the P6A short-delay chart. Its emission time is
$T_{\mathrm{em},*}=T_0-t+O(t^2)$, so the root actually consumes retained
pre-crossing history rather than an instantaneous state.

Grade: **derived local asymptotic**, conditional on smooth retained history,
$\alpha>0$, and a local interval on which the same-source direction does not
reverse. A direct Taylor expansion with a different leading sign or root
location under these assumptions falsifies it.

## Dual-Mollified Acceleration

Write

$$
K_i=\kappa |q_i|^2,
\qquad
\delta_\eta(z)=\frac{1}{\eta}\varphi\!\left(\frac{z}{\eta}\right),
\qquad
\varphi(z)=\frac{e^{-z^2/2}}{\sqrt{2\pi}}.
$$

Because $\sigma_{ii}=+1$, the leading same-source along-track part of the
canonical dual-mollified law is

$$
a_{\parallel}^{\mathrm{unsigned}}(t)
=
K_i
\int_0^h
\frac{c_f\tau}
{\left(c_f^2\tau^2+\epsilon_c^2\right)^{3/2}}
|D_T(t,\tau)|
\delta_\eta\!\big(g(t,\tau)\big)\,d\tau
+\text{higher-order geometry terms}.
$$

The signed counterfactual keeps the same history, causal-surface mollifier,
core kernel, polarity row, and endpoint convention, and changes only
$|D_T|$ to $D_T$:

$$
a_{\parallel}^{\mathrm{signed}}(t)
=
K_i
\int_0^h
\frac{c_f\tau}
{\left(c_f^2\tau^2+\epsilon_c^2\right)^{3/2}}
D_T(t,\tau)
\delta_\eta\!\big(g(t,\tau)\big)\,d\tau
+\text{higher-order geometry terms}.
$$

The complete vector integrand is assigned its zero continuous extension at
$\tau=0$. The $H(0)=0$ convention therefore supplies no instantaneous
self-row. At finite $\eta$, however, a neighborhood of the diagonal remains
inside the mollifier support. The core scale is still required to control that
neighborhood.

For $t>0$, the two leading zeros of $g$ have an intervening stationary point at
$\tau=t$. To assign a branch-local diagnostic without assigning the excluded
endpoint to the newborn root, define the newborn root cell by

$$
\mathcal N_t=\{\tau:t\le\tau<h\},
\qquad t>0.
$$

The complementary cell contains the endpoint layer. When $t\gg
\sqrt{\eta/\alpha}$, the two mollifier lobes are resolved and the cell choice
does not affect the collapsed newborn row. Inside the birth layer, another
boundary between the two zeros changes an order-one coefficient but not the
sign or regulator scaling. The complete transition observable must therefore
be checked both without a branch partition and, if a branch-local impulse is
reported, for partition stability.

The regulators have distinct and simultaneous roles:

- The causal-surface scale
  $$
  \ell_\eta=\sqrt{\frac{\eta}{\alpha}}
  $$
  is the receiver-time scale at which the root spacing $2t$ becomes comparable
  to its mollified width $\eta/(\alpha t)$.
- The core scale
  $$
  \ell_c=\frac{\epsilon_c}{c_f}
  $$
  is the delay scale at which the inverse-square row stops resolving
  $r\simeq c_f\tau$.

Grade: **derived setup and scale balance**. It is falsified by a same-law local
rescaling in which causal-root overlap occurs at a scale not proportional to
$\sqrt{\eta/\alpha}$ or the core crossover occurs at a scale not proportional
to $\epsilon_c/c_f$.

## Newborn-Branch Integrated Impulse

On the newborn cell and to leading order for $t>0$,

$$
a_{\parallel,\mathrm{new}}^{\mathrm{unsigned}}(t)
=
+K_i\alpha t
\int_t^h
\frac{c_f\tau}
{\left(c_f^2\tau^2+\epsilon_c^2\right)^{3/2}}
\delta_\eta\!\left(\alpha\tau\left(t-\frac{\tau}{2}\right)\right)d\tau,
$$

$$
a_{\parallel,\mathrm{new}}^{\mathrm{signed}}(t)
=
-K_i\alpha t
\int_t^h
\frac{c_f\tau}
{\left(c_f^2\tau^2+\epsilon_c^2\right)^{3/2}}
\delta_\eta\!\left(\alpha\tau\left(t-\frac{\tau}{2}\right)\right)d\tau.
$$

Every factor after the displayed sign is nonnegative. Hence finite
regularization cannot reverse the P3 sign comparison.

Let $0<L\ll h$ be a local exit time, still short compared with the curvature
and acceleration-variation scales, and define

$$
J_{\eta,\epsilon_c}(L)
=
\int_0^L
a_{\parallel,\mathrm{new}}^{\mathrm{unsigned}}(t)\,dt.
$$

For fixed $\eta>0$ and $\epsilon_c>0$, the integrand is bounded on the compact
crossing window and

$$
\Delta V_{\parallel,\mathrm{new}}^{\mathrm{unsigned}}
=+J_{\eta,\epsilon_c}(L),
\qquad
\Delta V_{\parallel,\mathrm{new}}^{\mathrm{signed}}
=-J_{\eta,\epsilon_c}(L).
$$

Thus both convention impulses are finite at fixed regulators and have equal
leading magnitude with opposite signs.

To expose the regulator dependence, set

$$
t=\ell_\eta z,
\qquad
\tau=\ell_\eta y,
\qquad
\rho=\frac{\ell_c}{\ell_\eta}
=
\frac{\epsilon_c}{c_f}\sqrt{\frac{\alpha}{\eta}}.
$$

Then, as $L/\ell_\eta\to\infty$ while $L$ remains inside the local-history
chart,

$$
\boxed{
J_{\eta,\epsilon_c}(L)
=
\frac{K_i}{c_f^2\ell_\eta}
\mathcal C_\varphi(\rho)
+O\!\left(\frac{K_i}{c_f^2L}\right)
}
$$

with the positive dimensionless coefficient

$$
\mathcal C_\varphi(\rho)
=
\int_0^\infty
z\int_z^\infty
\frac{y\,\varphi\!\left(y(z-y/2)\right)}
{(y^2+\rho^2)^{3/2}}
\,dy\,dz.
$$

This integral is finite for every $\rho\ge0$. It has two relevant limits.

### Core-dominated birth, $\ell_c\gg\ell_\eta$

The causal-surface lobes resolve before the core kernel changes. Collapsing the
newborn lobe first gives

$$
a_{\parallel,\mathrm{new}}^{\mathrm{unsigned}}(t)
\longrightarrow
K_i
\frac{2c_ft}{\left(4c_f^2t^2+\epsilon_c^2\right)^{3/2}},
$$

and therefore

$$
J_{0,\epsilon_c}(L)
=
\frac{K_i}{2c_f}
\left(
\frac{1}{\epsilon_c}
-
\frac{1}{\sqrt{4c_f^2L^2+\epsilon_c^2}}
\right).
$$

Equivalently,

$$
\mathcal C_\varphi(\rho)
\sim\frac{1}{2\rho},
\qquad
J_{\eta,\epsilon_c}(L)
\sim\frac{K_i}{2c_f\epsilon_c}.
$$

The fixed-core impulse is finite, but it diverges like $\epsilon_c^{-1}$ when
the core is removed.

### Causal-width-dominated birth, $\ell_\eta\gg\ell_c$

The endpoint and newborn lobes overlap before the core is resolved. The
coefficient tends to the finite positive mollifier constant

$$
C_\varphi=\mathcal C_\varphi(0),
$$

so

$$
J_{\eta,\epsilon_c}(L)
\sim
C_\varphi
\frac{K_i\sqrt{\alpha}}{c_f^2\sqrt{\eta}}.
$$

The fixed-width impulse is finite, but it diverges like $\eta^{-1/2}$ when the
causal-surface width is removed along this regime.

For matched refinement, $0<\rho<\infty$, the coefficient retains explicit
dependence on the regulator ratio. In summary,

$$
J_{\eta,\epsilon_c}(L)
=
\Theta\!\left(
\frac{K_i}
{c_f^2\max(\ell_\eta,\ell_c)}
\right),
$$

up to the positive mollifier and branch-cell coefficient. The joint sharp
limit is divergent and refinement-path dependent. The ordinary finite-impulse
fold lemma does not apply because its distance-floor assumption fails here at
the same event as the root birth.

Grade: **derived within the local dual-mollified reduction**. A bounded
analytic evaluation of the displayed positive integral along every joint
refinement path would falsify the divergence verdict. A different order-one
coefficient from another admissible newborn/endpoint cell partition does not
falsify the scaling; failure of the complete transition impulse to share the
same scaling would show that the branch-local partition is not a promotable
observable.

## Sign Survival and the Local $(\delta,\alpha)$ Map

Let

$$
L_R=\max(\ell_\eta,\ell_c)
$$

and take an outgoing section $t=\Lambda L_R$, where $\Lambda>1$ is fixed and
the section remains inside the local Taylor chart. Write

$$
J_R
=
C_J
\frac{K_i}{c_f^2L_R},
\qquad
A_R
=
C_A
\frac{K_i}{c_f^2L_R^2},
$$

where $C_J>0$ and $C_A>0$ are dimensionless functions of the fixed window,
mollifier, and regulator ratio. The one-pass map obtained by evaluating the
newborn row on the retained accelerating history is

$$
\boxed{
\mathcal M_\chi(\delta,\alpha)
=
\left(
\delta+\alpha\Lambda L_R+\chi J_R,
\quad
\alpha+\chi A_R
\right),
\qquad
\chi=
\begin{cases}
+1,&\text{unsigned},\\
-1,&\text{signed}.
\end{cases}
}
$$

Here the second coordinate is the outgoing along-track acceleration in this
one-pass approximation. It is not a claim that the incoming $\alpha$ remains
prescribed after the newborn row becomes large.

The dimensionless local gain is

$$
G_R
=
\frac{K_i}{c_f^2\alpha L_R^2}.
$$

- If $G_R\ll1$, the signed row is a finite braking correction, but this map
  alone does not establish settling.
- If $G_R=O(1)$, the outgoing side depends on the regulator ratio and on the
  complete retained-history row; no regulator-independent transition is
  available.
- If $G_R\gg1$, which is the leading regime as both regulators are removed at
  fixed $K_i$ and $\alpha$, then for entry states
  $|\delta|=O(\alpha L_R)$ the signed map has
  $\delta_{\mathrm{out}}<0$ and $\alpha_{\mathrm{out}}<0$: it overshoots the
  field-speed crossing and is ejected from the local layer on the sub-field
  side. The unsigned map has the opposite signs and is ejected on the
  super-field side.

The signed restoring direction therefore survives regularization, but a
finite restoring **gain** does not. One crossing cannot diagnose chatter,
because chatter requires at least a second root-birth or retained-memory
return. It cannot diagnose settling, because settling requires a contracting
map on the complete history state. The local map predicts overshoot/ejection
of the crossing layer at high gain; whether the self-consistent trajectory
returns, chatters, or continues away is unestablished.

Grade: **derived one-pass local-map classification; inferred warning for the
self-consistent dynamics**. Its operator-checkable falsifier is a
self-consistent analytic local solution whose exit state remains inside an
$O(\alpha L_R)$ crossing layer while $G_R\to\infty$, or whose signed newborn
row has positive along-track impulse under the same regulator and endpoint
conventions.

## Regulator-Independence Requirement

The canon's transition-observable rule must be applied on a two-parameter
ladder here. Refining $\eta$ alone is insufficient because the event also
contacts the core locus. For every promoted transition observable $Y$, the
limit

$$
\lim_{(\eta,\epsilon_c)\to(0,0)}Y_{\eta,\epsilon_c}
$$

must exist, be finite, and be independent of refinement path, including
$\eta\to0$ at fixed $\epsilon_c$, $\epsilon_c\to0$ at fixed $\eta$, and
matched paths with fixed $\rho$. The branch status and root matching must also
remain stable on the same ladder.

For this mechanism, the minimum promoted observable set is:

1. the complete vector velocity increment $\Delta\mathbf V$ across the
   crossing window and its along-track component
   $\Delta V_\parallel$;
2. the transition location and window scale, the root-birth status, the
   newborn root identity, and the matched active/inactive root ledger on both
   sides;
3. the outgoing local state and retained-history section, including
   $(\delta_{\mathrm{out}},\alpha_{\mathrm{out}})$, transverse velocity, and
   the history segment needed to reproduce the next update;
4. the sign and finite gain of the proposed braking map, not the sampled peak
   acceleration, because a transition claim is an integrated statement;
5. the action/EOM, energy, momentum, and angular-momentum residuals with the
   same $\eta$, $\epsilon_c$, endpoint convention, and window; and
6. if a branch-local newborn impulse is retained, its invariance under a
   declared family of endpoint/newborn cell partitions, or else its replacement
   by the partition-free complete transition impulse.

The current calculation fails the first, third, and fourth requirements in the
joint sharp limit: the impulse and outgoing local map diverge and depend on the
regulator ratio. Therefore the signed braking mechanism is a valid
finite-regulator local sign result but is not promotable as a sharp
transition mechanism.

Grade: **derived application of the canonical transition rule to the displayed
two-regulator asymptotic**. A common finite limit for all listed observables,
with stable root metadata and residuals, would overturn the fail-closed
disposition.

## Smallest Follow-On

The smallest follow-on is an analytic, self-consistent initial-layer problem
for one same-source path, one local along-track direction, no partners, and
fixed positive $\eta$ and $\epsilon_c$. Replace the prescribed
$\delta(t)=\alpha t$ history after $T_0$ by the history generated by the same
dual-mollified acceleration it enters:

$$
\dot\delta(t)
=
a_{\mathrm{bg}}(t)
+a_{\parallel,ii}^{\eta,\epsilon_c}[\delta|_{[-h,t]}],
\qquad
\delta(0)=0,
$$

with the pre-crossing history fixed and identical under both convention
replays. The proof target is to establish the first root-birth time, the
finite-regulator exit map, and whether feedback alters the
$\ell_\eta$/$\ell_c$ scaling before $G_R$ becomes order one. Only after that
local problem closes should a second-return calculation ask whether the signed
trajectory chatters or settles.

Grade: **derived minimal closure target**. It is smaller than a complete
attractor run because it removes partners, transverse dynamics, long-time
return, and numerical evidence while testing the exact assumption that failed
in the one-pass map.

## Claim Grades and Falsifiers

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| The newborn root is controlled by both $\eta$ and $\epsilon_c$. | Derived. | A same-law local reduction that resolves the root birth without $\eta$ and bounds the coincident inverse-square amplitude without $\epsilon_c$. |
| The fixed-regulator newborn impulse is finite. | Derived. | Divergence of the displayed compact-window integral for some fixed positive $\eta$ and $\epsilon_c$ under the stated smooth-history bounds. |
| The sharp newborn impulse has a finite joint regulator limit. | Rejected by the derived asymptotic. | A finite path-independent evaluation along the core-dominated, width-dominated, and fixed-$\rho$ ladders. |
| Signed regularization reverses the braking sign. | Rejected. | A positive signed along-track integral from the displayed positive kernel with $D_T<0$. |
| The unsigned newborn row brakes the just-super-field excursion. | Rejected. | A negative unsigned along-track integral under the same like-polarity, outward geometry. |
| The signed one-pass map settles at $\delta=0$. | Rejected at leading high gain. | A contracting self-consistent local map with a finite regulator-independent gain would replace this one-pass verdict. |
| The signed one-pass map overshoots and leaves the local layer when $G_R\gg1$. | Derived for the frozen history; self-consistent consequence inferred. | A same-order term that keeps both outgoing coordinates inside the crossing layer or changes the signed impulse sign. |
| The local calculation establishes chatter or a global attractor. | Not claimed. | Those require at least the self-consistent first return and a contracting complete-history map. |

## Disposition

This packet closes P6A's named gap 3 at the frozen-history local-law level with
a negative sharp-limit verdict: finite regulators quarantine the event, and
the signed braking sign survives, but the integrated impulse does not converge
to a finite regulator-independent transition. The result remains
`priority-only`. No canon, convention, code, shared ledger, or attractor claim
is changed.
