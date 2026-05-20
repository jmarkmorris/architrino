# Planar Seed Packet

## Status

This handoff is the first queued packet for [planar-bridge-closure](planar-bridge-closure.md). It prepares the reduced planar history space, rotational gauge, section transversality, and finite sector data needed by the next row, `cone_branch_regularity`.

It does not promote the planar bridge ahead of the active collinear certificate. The parent proof-program queue still gives `breather_certificate` priority over `planar_bridge`; this packet only fixes the mathematical handoff shape for use after the collinear finite-certificate gate passes, or after that gate fails with an explicit obstruction that the planar bridge is meant to resolve.

## Dependency On The Collinear Certificate

The planar bridge inherits only the certificate architecture from the collinear program:

- one candidate history or finite candidate family must be certified on one fixed domain;
- every causal-root branch row must be authorized by a finite causal-root ledger;
- inactive candidate roots must have positive range gaps;
- active roots must have a positive Jacobian floor away from declared fold layers;
- the final theorem promotion still requires one closed convex tame envelope and one continuous self-map statement.

Until the collinear certificate supplies its finite packet or a precise obstruction, this planar packet has status `queued-preparatory`. Its acceptance can make the next planar row well posed, but it cannot by itself assert a planar breather, a planar return-map fixed point, or a content-level theorem.

## Reduced Planar History Space

Work in the reflection-symmetric planar binary subclass from the chapter:
$$
\mathbf{x}_1(t)=-\mathbf{r}(t),
\qquad
\mathbf{x}_2(t)=\mathbf{r}(t),
\qquad
\mathbf{r}(t)\in\Pi\cong\mathbb{R}^2,
\qquad
q_1=-\epsilon,
\qquad
q_2=+\epsilon.
$$
For a stored memory horizon
$$
h>0,
$$
use the planar history space
$$
\mathcal{H}_{h,\Pi}^{1}
\equiv
C^1([-h,0];\Pi),
\qquad
\phi(\theta)=\mathbf{r}(\theta).
$$
The local norm for the seed packet is
$$
\|\phi\|_{1,h}
\equiv
\sup_{\theta\in[-h,0]}\|\phi(\theta)\|
+
\sup_{\theta\in[-h,0]}\|\dot\phi(\theta)\|.
$$
The seed packet works inside the bounded regularized class
$$
\mathcal{C}_{\Pi}
=
\left\{
\phi\in\mathcal{H}_{h,\Pi}^{1}
\;\middle|\;
\rho_{\min}\le\|\phi(\theta)\|\le\rho_{\max},
\;
\|\dot\phi(\theta)\|\le U_{\max},
\;
\operatorname{Lip}(\dot\phi)\le A_{\max}
\right\},
$$
where
$$
0<\rho_{\min}<\rho_\ast<\rho_{\max}.
$$
The radius floor keeps the rotational gauge away from the origin, the speed ceiling keeps the active causal-root search finite on the declared window, and the Lipschitz-velocity ceiling is the regularized substitute for uncontrolled impulsive behavior.

## Rotational Gauge

The planar rotation action on histories is
$$
(R_\psi\phi)(\theta)=R_\psi\phi(\theta),
\qquad
\psi\in\mathbb{R}/2\pi\mathbb{Z}.
$$
For histories with
$$
\phi(0)\ne\mathbf{0},
$$
define the gauge angle
$$
\psi_\phi=\operatorname{Arg}\phi(0)
$$
and the local gauge representative
$$
G(\phi)(\theta)=R_{-\psi_\phi}\phi(\theta).
$$
The section representative satisfies
$$
G(\phi)(0)=\|\phi(0)\|\mathbf e_1.
$$
The orientation side of the section is fixed by
$$
\mathbf e_2\cdot \dot{G(\phi)}(0)>0.
$$
This removes rigid planar rotation without imposing a non-affine phase condition on the whole stored history.

The differential of the gauge angle is controlled by the radius floor. For a variation
$$
\delta\phi\in C^1([-h,0];\Pi),
$$
one has, at the section point
$$
\phi(0)=\rho_\ast\mathbf e_1,
$$
the first variation
$$
\delta\psi_\phi
=
\frac{\mathbf e_2\cdot\delta\phi(0)}{\rho_\ast}.
$$
Thus the gauge reset is locally Lipschitz on the seed class with constant bounded by
$$
L_\psi\le\rho_{\min}^{-1}.
$$
The gauge row fails if a candidate packet allows
$$
\inf_{\theta\in[-h,0]}\|\phi(\theta)\|=0
$$
or loses the orientation inequality at the section.

## Section Transversality

For a gauged history, write
$$
\rho_\phi(\theta)=\|\phi(\theta)\|,
\qquad
\hat{\mathbf e}_{r,\phi}(\theta)=\frac{\phi(\theta)}{\rho_\phi(\theta)},
\qquad
\hat{\mathbf e}_{\theta,\phi}(\theta)=R_{\pi/2}\hat{\mathbf e}_{r,\phi}(\theta).
$$
At the section point
$$
\phi(0)=\rho_\ast\mathbf e_1,
$$
the radial and tangential velocities are
$$
u_r(\phi)=\mathbf e_1\cdot\dot\phi(0),
\qquad
u_\theta(\phi)=\mathbf e_2\cdot\dot\phi(0).
$$
The incoming section is
$$
\Sigma_{\rho_\ast}^{-}
=
\left\{
\phi\in\mathcal{C}_{\Pi}
\;\middle|\;
\phi(0)=\rho_\ast\mathbf e_1,
\;
u_\theta(\phi)\ge u_{\theta,0}>0,
\;
u_r(\phi)\le-u_{r,0}<0
\right\}.
$$
The quantitative section margins are
$$
\gamma_{\mathrm{rad}}
\equiv
-u_r(\phi)-u_{r,0},
\qquad
\gamma_{\mathrm{tan}}
\equiv
u_\theta(\phi)-u_{\theta,0}.
$$
A seed history is section-transverse only when
$$
\gamma_{\mathrm{rad}}>0,
\qquad
\gamma_{\mathrm{tan}}>0.
$$
The radial margin makes the return-time equation locally solvable by the implicit function theorem. The tangential margin prevents the same radial crossing from falling back into the collinear gauge slice.

For a later returned history
$$
\phi_{\mathrm{ret}}=G(\mathbf r_{T_{\mathrm{ret}}+\cdot}),
$$
the return row must prove the analogous crossing estimate
$$
\left|\dot\rho(T_{\mathrm{ret}})\right|\ge\nu_{\mathrm{ret}}>0.
$$
That return margin is not part of this seed row, but this seed row records the same kind of margin so the later gauge-continuity theorem has the right input.

## Causal-Root Equations In The Reduced Planar Chart

The following notation is local to this handoff. Let
$$
\varsigma_\beta=
\begin{cases}
+1,&\text{self source},\\
-1,&\text{partner source}.
\end{cases}
$$
For the right-hand receiver at
$$
\mathbf r(t),
$$
the source position represented by a branch candidate
$$
\beta
$$
is
$$
\varsigma_\beta\mathbf r(t+\theta),
\qquad
\theta\in[-h,0).
$$
The reduced causal-root equation is
$$
F_\beta(t,\theta)
\equiv
\left\|
\mathbf r(t)-\varsigma_\beta\mathbf r(t+\theta)
\right\|
+c_f\theta
=0.
$$
When a simple active root is present, write it as
$$
\theta_\beta(t)
$$
and define the delayed chord direction
$$
\hat{\mathbf q}_\beta(t)
\equiv
\frac{\mathbf r(t)-\varsigma_\beta\mathbf r(t+\theta_\beta(t))}
{\left\|\mathbf r(t)-\varsigma_\beta\mathbf r(t+\theta_\beta(t))\right\|}.
$$
The source velocity on that row is
$$
\mathbf v_{\beta,\mathrm{src}}(t)
\equiv
\varsigma_\beta\dot{\mathbf r}(t+\theta_\beta(t)).
$$
The corresponding Jacobian is
$$
J_\beta(t)
=
1-\frac{\mathbf v_{\beta,\mathrm{src}}(t)\cdot\hat{\mathbf q}_\beta(t)}{c_f}.
$$
The first excursion slab must stay in the simple-root regime except at fold tubes explicitly deferred to the later fold row. Thus this seed packet supplies the active-root floor
$$
\nu_J
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{act}}}
\inf_{t\in I_\beta}J_\beta(t)
>0
$$
on the initial cone-control interval.

Inactive branch candidates are recorded by compact chart complements
$$
Q_\beta\subset [0,T_{\mathrm{cone}}]\times[-h,0]
$$
with margin
$$
\gamma_{\mathrm{gap}}
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{inact}}}
\inf_{(t,\theta)\in Q_\beta}
|F_\beta(t,\theta)|
>0.
$$
Active memory depths must also remain away from the stored-horizon boundary:
$$
\gamma_h
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{act}}}
\inf_{t\in I_\beta}
\operatorname{dist}\big(\theta_\beta(t),\{-h,0\}\big)
>0.
$$

## Seed Packet Data

The finite seed packet is the tuple
$$
\Pi_{\mathrm{pl,seed}}
=
\left(
h,
\eta,
c_f,
\epsilon,
\kappa,
\rho_\ast,
T_{\mathrm{cone}},
\phi_0,
\Theta,
\mathcal{B}_{\mathrm{act}},
\mathcal{B}_{\mathrm{inact}},
\mathfrak{S}_{\mathrm{cone}},
\mathcal{M}_{\mathrm{pl,seed}},
\mathcal{L}_{\mathrm{pl,seed}}
\right).
$$
Here:

- $h,\eta,c_f,\epsilon,\kappa$ are the memory, mollifier, field-speed, polarity, and coupling parameters.
- $\rho_\ast$ is the return-section radius.
- $T_{\mathrm{cone}}>0$ is the first controlled post-section slab for the next row.
- $\phi_0\in\Sigma_{\rho_\ast}^{-}$ is the center seed history.
- $\Theta=\{\theta_j\}_{j=0}^{N}$ is the stored-history mesh with $-h=\theta_0<\cdots<\theta_N=0$.
- $\mathcal{B}_{\mathrm{act}}$ is the finite active causal-root list on $[0,T_{\mathrm{cone}}]$.
- $\mathcal{B}_{\mathrm{inact}}$ is the finite inactive complement after deleting neighborhoods of active roots and declared fold tubes.
- $\mathfrak{S}_{\mathrm{cone}}$ is the sector atlas consumed by `cone_branch_regularity`.
- $\mathcal{M}_{\mathrm{pl,seed}}$ is the strict margin vector.
- $\mathcal{L}_{\mathrm{pl,seed}}$ is the finite sensitivity vector used to choose a certified tube radius.

The packet must also record a finite representation of
$$
\phi_0,
\qquad
\dot\phi_0,
$$
and of the short continuation
$$
\mathbf r_0(t),
\qquad
\dot{\mathbf r}_0(t),
\qquad
0\le t\le T_{\mathrm{cone}},
$$
by interpolation, collocation, quadrature, or another declared finite basis. A plotted trace or informal simulation is not enough; the representation must include interval evaluation rules for the root equations and the sector inequalities.

## Finite Sector And Cone Data For The Next Row

The sector atlas is a finite family
$$
\mathfrak{S}_{\mathrm{cone}}
=
\left\{
S_m=(\alpha_m,\omega_m)
\right\}_{m=1}^{M},
\qquad
0<\omega_m<\frac{\pi}{2},
$$
where
$$
S_m
=
\left\{
\mathbf u\in\Pi\setminus\{\mathbf0\}
\;\middle|\;
\left|
\operatorname{Arg}(e^{-i\alpha_m}\mathbf u)
\right|
\le\omega_m
\right\}.
$$
For every active branch row
$$
\beta\in\mathcal{B}_{\mathrm{act}},
$$
the packet assigns sector labels
$$
m_{\mathrm{rec}}(\beta),
\qquad
m_{\mathrm{src}}(\beta),
\qquad
m_{\mathrm{chord}}(\beta),
$$
such that, on the branch interval
$$
I_\beta\subset[0,T_{\mathrm{cone}}],
$$
the receiver velocity, source velocity, and delayed chord satisfy
$$
\dot{\mathbf r}_0(t)\in S_{m_{\mathrm{rec}}(\beta)},
\qquad
\mathbf v_{\beta,\mathrm{src}}(t)\in S_{m_{\mathrm{src}}(\beta)},
\qquad
\hat{\mathbf q}_\beta(t)\in S_{m_{\mathrm{chord}}(\beta)}.
$$
The sector boundary margin is
$$
\gamma_{\mathrm{sector}}
\equiv
\min_{\beta}
\inf_{t\in I_\beta}
\min
\left\{
d_{S_{m_{\mathrm{rec}}(\beta)}}(\dot{\mathbf r}_0(t)),
d_{S_{m_{\mathrm{src}}(\beta)}}(\mathbf v_{\beta,\mathrm{src}}(t)),
d_{S_{m_{\mathrm{chord}}(\beta)}}(\hat{\mathbf q}_\beta(t))
\right\}
>0,
$$
where
$$
d_{S_m}(\mathbf u)
\equiv
\omega_m-
\left|
\operatorname{Arg}(e^{-i\alpha_m}\mathbf u)
\right|.
$$
Because the sector atlas uses angular data, the same active rows must also
record the following nonzero-direction floor, local to this handoff:
$$
\nu_{\mathrm{dir}}
\equiv
\min_{\beta}
\inf_{t\in I_\beta}
\min
\left\{
\|\dot{\mathbf r}_0(t)\|,
\|\mathbf v_{\beta,\mathrm{src}}(t)\|,
\left\|\mathbf r_0(t)-\varsigma_\beta\mathbf r_0(t+\theta_\beta(t))\right\|
\right\}
>0.
$$
The chord-length term is automatically tied to
$$
c_f(-\theta_\beta(t))
$$
on active roots, but it is still recorded so interval checks can reject a row
before an undefined angular expression enters the sector ledger.

The cone-transversality row also needs angular separation from Jacobian-null directions. In this packet that information is recorded by
$$
\nu_J>0,
\qquad
\nu_{\mathrm{dir}}>0,
\qquad
\gamma_{\mathrm{sector}}>0,
$$
together with the active-row formulas for
$$
J_\beta(t)
$$
and the sector assignments above. The next row may refine these data, but it should not have to invent the finite angular atlas from scratch.

## Acceptance Margins

The strict seed margin vector is
$$
\mathcal{M}_{\mathrm{pl,seed}}
=
\left(
\gamma_{\mathrm{rad}},
\gamma_{\mathrm{tan}},
\nu_J,
\gamma_{\mathrm{gap}},
\gamma_h,
\nu_{\mathrm{dir}},
\gamma_{\mathrm{sector}},
\gamma_{\mathrm{env}}
\right),
$$
where
$$
\gamma_{\mathrm{env}}
\equiv
\min\left\{
\inf_{\theta\in[-h,0]}(\|\phi_0(\theta)\|-\rho_{\min}),
\inf_{\theta\in[-h,0]}(\rho_{\max}-\|\phi_0(\theta)\|),
U_{\max}-\sup_{\theta\in[-h,0]}\|\dot\phi_0(\theta)\|,
A_{\max}-\operatorname{Lip}(\dot\phi_0)
\right\}.
$$
The seed row passes only if every component of
$$
\mathcal{M}_{\mathrm{pl,seed}}
$$
is strictly positive.

The finite sensitivity vector is
$$
\mathcal{L}_{\mathrm{pl,seed}}
=
\left(
L_{\mathrm{rad}},
L_{\mathrm{tan}},
L_J,
L_F,
L_h,
L_{\mathrm{dir}},
L_{\mathrm{sector}},
L_{\mathrm{env}}
\right).
$$
These constants bound the change in each margin under a
$$
C^1
$$
perturbation of the center seed history. Once they are finite, an admissible certified radius is any
$$
0<r_{\mathrm{pl,seed}}
<
\min\left\{
\frac{\gamma_{\mathrm{rad}}}{2L_{\mathrm{rad}}},
\frac{\gamma_{\mathrm{tan}}}{2L_{\mathrm{tan}}},
\frac{\nu_J}{2L_J},
\frac{\gamma_{\mathrm{gap}}}{2L_F},
\frac{\gamma_h}{2L_h},
\frac{\nu_{\mathrm{dir}}}{2L_{\mathrm{dir}}},
\frac{\gamma_{\mathrm{sector}}}{2L_{\mathrm{sector}}},
\frac{\gamma_{\mathrm{env}}}{2L_{\mathrm{env}}}
\right\},
$$
omitting any quotient whose denominator is zero because the corresponding margin is unchanged to first order on the chart.

Define the certified seed tube by
$$
\mathcal{K}_{\mathrm{pl,seed}}
=
\left\{
\phi\in\Sigma_{\rho_\ast}^{-}
\;\middle|\;
\|\phi-\phi_0\|_{1,h}\le r_{\mathrm{pl,seed}}
\right\}.
$$
Then every history in
$$
\mathcal{K}_{\mathrm{pl,seed}}
$$
keeps the same rotational gauge side, the same incoming section transversality, the same active-root chart on
$$
[0,T_{\mathrm{cone}}],
$$
the same inactive-root exclusions, the same memory-depth separation, and the same sector atlas with half-margins. This is the exact handoff needed by `cone_branch_regularity`.

## Pass/Fail Alternatives

The row has one pass condition and seven useful failure alternatives.

Pass:

- All margins in
  $$
  \mathcal{M}_{\mathrm{pl,seed}}
  $$
  are strictly positive, all sensitivities in
  $$
  \mathcal{L}_{\mathrm{pl,seed}}
  $$
  are finite, and the certified tube
  $$
  \mathcal{K}_{\mathrm{pl,seed}}
  $$
  is nonempty.

Failure alternatives:

1. **No reduced planar history space with a regular gauge.** The candidate reaches the origin or violates the radius floor, so the rotational gauge angle is not controlled.
2. **No transverse incoming section.** Either
   $$
   \gamma_{\mathrm{rad}}\le0
   $$
   or
   $$
   \gamma_{\mathrm{tan}}\le0,
   $$
   so the section crossing or orientation side is not stable.
3. **No finite active branch chart on the first slab.** The active root list is incomplete, or the inactive gap satisfies
   $$
   \gamma_{\mathrm{gap}}\le0.
   $$
4. **No pre-fold Jacobian floor.** The initial cone interval reaches
   $$
   J_\beta=0
   $$
   before a declared fold tube, so `cone_branch_regularity` cannot start in the simple-root regime.
5. **No finite sector margin.** The delayed chord, source velocity, or receiver velocity touches a sector boundary, giving
   $$
   \gamma_{\mathrm{sector}}\le0.
   $$
6. **Undefined angular sector data.** A receiver velocity, source velocity, or delayed chord loses the nonzero-direction floor, giving
   $$
   \nu_{\mathrm{dir}}\le0.
   $$
7. **No certified tube radius.** At least one required sensitivity is infinite, or the margin arithmetic forces
   $$
   r_{\mathrm{pl,seed}}=0.
   $$

Alternatives 1 and 2 instantiate the parent failure mode "no seed packet with quantitative section transversality can be maintained." Alternatives 3 through 7 are routed to the next row only as precise obstructions; they are not grounds to promote the planar bridge or to weaken the collinear-certificate dependency.

## Next-Row Handoff

If this packet passes, `cone_branch_regularity` receives:

- the nonempty certified seed tube
  $$
  \mathcal{K}_{\mathrm{pl,seed}},
  $$
- the first excursion slab
  $$
  [0,T_{\mathrm{cone}}],
  $$
- the active and inactive branch lists
  $$
  \mathcal{B}_{\mathrm{act}},
  \qquad
  \mathcal{B}_{\mathrm{inact}},
  $$
- the sector atlas
  $$
  \mathfrak{S}_{\mathrm{cone}},
  $$
- the strict cone margins
  $$
  \nu_J,
  \qquad
  \nu_{\mathrm{dir}},
  \qquad
  \gamma_{\mathrm{sector}},
  $$
- and the certified perturbation radius
  $$
  r_{\mathrm{pl,seed}}.
  $$

The next row should prove that these data persist under the dual-mollified delayed dynamics on the whole first excursion slab. This seed packet supplies the finite initial data and acceptance arithmetic; it does not prove the local cone theorem, the bounded fold-transit theorem, the radial leakage-budget inequality, or the tame-envelope return theorem.
