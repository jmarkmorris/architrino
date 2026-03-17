# Master-Equation Breather Program

This chapter sits between the canonical delayed law in [master-equation.md](./master-equation.md) and the frozen one-dimensional reference scaffold in [collinear-breather.md](./collinear-breather.md). Its purpose is not to reopen the 1D proof program, but to extract the transportable theorem architecture and to state clearly which replacement lemmas are required before a genuine breather theorem can be pursued at the level of the master equation.

The strategic point is simple. The collinear chapter should now be treated as a resolved reference model for delayed recapture, tame-envelope packaging, and fixed-point closure. The next task is therefore not further compression of the 1D note, but abstraction: identify what part of that scaffold belongs to the general delayed dynamics, what part uses the ordered geometry of the line, and what new geometry must replace those 1D-only moves in higher dimension.

## Purpose

The breather problem for the full delayed master equation is not a single obstruction. It is the conjunction of five distinct analytic burdens:

- choosing a codimension-one return section in history space,
- controlling active delayed-root topology along one cycle,
- proving that delayed self-drive does not defeat global recapture,
- packaging the resulting trajectories into a single closed convex tame self-map domain,
- and closing the fixed-point step on that domain.

The frozen collinear scaffold shows that these burdens can be separated cleanly. In particular, it shows that the final existence theorem should be organized around a history-space return map rather than around a scalar speed closure alone. This chapter records that abstraction in a form suitable for later use in the master-equation stack.

## Position in the Dynamics Stack

The intended division of labor is:

- [master-equation.md](./master-equation.md) gives the exact delayed law, the branch-sum form, the path-history integral form, and the causal Jacobians.
- [collinear-breather.md](./collinear-breather.md) supplies the first near-complete global existence scaffold in a reduced geometry where ordering on the line eliminates tangential drift.
- this chapter translates the 1D scaffold into a master-equation theorem program by separating portable structure from collinear-specific arguments.

Accordingly, this document should be read neither as a replacement for the master equation nor as a second reduced-model note. It is a bridge chapter: a theorem blueprint for transporting the 1D existence architecture into the higher-dimensional delayed dynamics.

## Portable Return-Map Architecture

Let
$$
\mathbf{X}(t)\in \mathcal{Q}
$$
denote the full configuration variable of the master equation on its configuration manifold
$$
\mathcal{Q}.
$$
For a fixed memory horizon
$$
h>0,
$$
write the history space as
$$
\mathcal{H}_h \equiv C^1([-h,0];\mathcal{Q}).
$$

Choose a codimension-one section function
$$
G:\mathcal{Q}\to\mathbb{R},
$$
and let
$$
\mathscr{S}\equiv \{ \mathbf{Y}\in \mathcal{Q}\mid G(\mathbf{Y})=0\}.
$$
The raw outbound and inbound section classes are then
$$
\Sigma^+_{\mathscr{S}}
\equiv
\left\{
\Phi\in\mathcal{H}_h
\;\middle|\;
G(\Phi(0))=0,
\qquad
\nabla G(\Phi(0))\!\cdot\!\dot\Phi(0)>0
\right\},
$$
$$
\Sigma^-_{\mathscr{S}}
\equiv
\left\{
\Phi\in\mathcal{H}_h
\;\middle|\;
G(\Phi(0))=0,
\qquad
\nabla G(\Phi(0))\!\cdot\!\dot\Phi(0)<0
\right\}.
$$

This section anchoring removes the absolute time-translation symmetry of the continuous delayed flow. As in the collinear reference model, the periodic-orbit question is therefore recast as a fixed-point question for a returned history.

For the dual-mollified dynamics with shell width
$$
\eta>0
$$
and short-distance core scale
$$
\epsilon_c>0,
$$
the exact history-space return map should be written on its natural domain:
$$
P_\eta:\operatorname{Dom}(P_\eta)\subseteq \Sigma^-_{\mathscr{S}}\to \Sigma^-_{\mathscr{S}},
\qquad
P_\eta(\Phi)=\mathbf{X}_{T(\Phi)},
$$
where
$$
T(\Phi)>0
$$
is the first later return time to the same inbound section after one full excursion.

This is the first master-equation lesson from the 1D scaffold: the correct object is the full history-space return map. Scalar diagnostics can still be useful, but they are only projections of
$$
P_\eta,
$$
not substitutes for it.

## What the 1D Reference Model Already Settled

The frozen collinear chapter contributes five structural lessons that should now be treated as stable.

### 1. Dual mollification is structural, not cosmetic

The shell width
$$
\eta
$$
and the core cutoff
$$
\epsilon_c
$$
play different roles and should not be conflated. The first regularizes caustic transit across the causal shell. The second regularizes the short-distance amplitude divergence. The 1D scaffold works precisely because those two pathologies are separated rather than blurred into a single smoothing parameter.

### 2. Convex Banach bounds and tame delayed geometry must be split

The 1D chapter now makes a clean distinction between:

- a convex section envelope
  $$
  \mathcal{C}_{x_\ast,\eta},
  $$
- and a later closed convex tame envelope
  $$
  \mathcal{K}_{x_\ast,\eta}\subseteq \mathcal{C}_{x_\ast,\eta}.
  $$

That split is portable. In the master-equation setting, one should not expect Jacobian lower bounds, branch-count bounds, or root-persistence conditions to be convex by inspection. The convex Banach-space box and the tame delayed-root package are different theorem objects.

### 3. Seed nonvacuity must be explicit

The 1D scaffold no longer leaves the tame class abstractly nonempty. It builds an explicit affine seed history, then thickens it to a section-side tame neighborhood, and only afterward seeks full-cycle propagation. That logic is also portable. One should not expect higher-dimensional tame classes to be nonempty merely because their defining inequalities look plausible.

### 4. The fixed-point capstone needs one matching domain

The final Schauder route only becomes legitimate after continuity, precompactness, and the self-map property all live on one and the same closed convex tame domain. This is now explicit in the 1D manuscript and should remain explicit in every higher-dimensional formulation.

### 5. Parameter solvability is coupled

The collinear audit showed that local recapture margins and global envelope constants cannot be treated as algebraically independent when the crossing-speed bounds depend on envelope-scale collapse estimates. The master-equation analogue should therefore be phrased from the beginning as a coupled admissible-regime problem rather than as a sequential parameter-picking exercise.

## Abstract Envelope Hierarchy

The general master-equation breather program should inherit the same three-layer hierarchy:

1. the raw inbound section
   $$
   \Sigma^-_{\mathscr{S}};
   $$
2. a convex Banach envelope
   $$
   \mathcal{C}_{\mathscr{S},\eta}\subseteq \Sigma^-_{\mathscr{S}};
   $$
3. and a closed convex tame envelope
   $$
   \mathcal{K}_{\mathscr{S},\eta}\subseteq \mathcal{C}_{\mathscr{S},\eta}.
   $$

The master-equation analogue of
$$
\mathcal{C}_{\mathscr{S},\eta}
$$
should carry only visibly convex constraints such as:

- section anchoring,
- uniform position bounds,
- uniform speed bounds,
- uniform acceleration bounds,
- and a causal-memory-depth bound.

The analogue of
$$
\mathcal{K}_{\mathscr{S},\eta}
$$
must then add the genuinely delayed geometry:

- persistence of active partner and self roots,
- lower bounds on the causal Jacobians,
- branch-count control,
- and exclusion of root birth, root collision, and other topological degeneracies along the controlled cycle.

This is the natural packaging in which Arzela-Ascoli and Schauder can later be used. Anything looser risks repeating the old domain/codomain mismatch.

## 1D-Only Mechanisms and Their Replacement Obligations

The transport from the collinear reference model to the master equation is not literal. Several key moves in the 1D note use the ordered geometry of the line and therefore cannot simply be quoted in higher dimension.

### Ordered sorting maps

The 1D scaffold organizes delayed topology around the scalar sorting maps
$$
w(t)=x(t)+c_f t
\qquad
\text{and}
\qquad
z(t)=x(t)-c_f t.
$$
Those maps force deep-past roots into rigid order intervals and make descent arguments explicit.

No direct higher-dimensional analogue exists merely by replacing
$$
x
$$
with
$$
\mathbf{x}.
$$
What is needed instead is a replacement coercive functional or ordered comparison geometry that can play the same role:

- it must isolate which delayed branches are geometrically admissible;
- it must prevent uncontrolled root proliferation;
- and it must turn far-past delayed roots into a controlled subset that can be either excluded or transported into a regime of uniform transversality.

### Exact scalar Jacobians

In 1D the causal Jacobians reduce to explicit signed scalars. In the master equation they retain the exact form
$$
J_{ij}(t;t_0)
=
1-\frac{\mathbf{v}_j(t_0)\cdot \hat{\mathbf{r}}_{ij}(t;t_0)}{c_f},
$$
but the sign bookkeeping is no longer exhausted by line ordering.

The replacement burden is therefore a vector transversality theorem: one must find geometric hypotheses that keep
$$
|J_{ij}|
$$
uniformly away from zero along the relevant branch family, even in the presence of tangential motion and changing line-of-sight direction.

### Deep-past self-root relocation

In the 1D reference note, deep-past outward self-roots on the apocenter window are forced back onto the pre-crossing inbound leg, where they become unique and automatically transversal. This is a genuinely strong collinear mechanism, but it is also genuinely one-dimensional.

The higher-dimensional replacement cannot rely on line order. It must instead produce one of two outcomes:

- either a geometric exclusion theorem showing that such remote self-roots cannot occur in the chosen regime,
- or a transport theorem showing that any such roots must lie on a controlled branch family with uniform Jacobian bounds and finite multiplicity.

### Affine seed simplicity

The affine seed in 1D works because a linearly inbound history on the line automatically suppresses same-side exact self roots when its speed is strictly sub-field-speed. In higher dimension an affine seed is no longer automatically tame, because direction and curvature matter.

The replacement burden is therefore an explicit section-anchored seed packet in the full configuration geometry. It must come with:

- a strict sub-field-speed margin where needed,
- a finite controlled set of delayed partner roots,
- exclusion or control of same-source self intersections on the stored interval,
- and a small section neighborhood that preserves those properties in the
  $$
  C^1
  $$
  topology.

### Outer-turn closure without tangential loss

The 1D problem has no tangential channel. In the master equation, any breather theorem must account for tangential drift, angular deflection, or other transverse escape directions that the line simply does not possess.

The replacement burden is therefore a recapture theorem with a genuinely vector coercive quantity. One needs a higher-dimensional analogue of the 1D inner and outer force margins, but measured against all escape channels rather than against a single signed radial variable.

## Master-Equation Theorem Spine

The portable theorem ladder should therefore look as follows.

> **Target Proposition (Sectioned tame well-posedness).**
> For a chosen return section
> $$
> \mathscr{S}
> $$
> and dual-mollified parameters
> $$
> (\eta,\epsilon_c),
> $$
> there exists a nonempty section-side tame class
> $$
> \mathcal{H}^{\mathrm{adm}}_{\mathscr{S},\eta}\subseteq \Sigma^-_{\mathscr{S}}
> $$
> on which the active delayed branches are well defined, simple, and stable under small
> $$
> C^1
> $$
> perturbations.

> **Target Proposition (Seeded nonvacuity in the full geometry).**
> There exists an explicit history
> $$
> \Phi_{\mathrm{seed}}\in \Sigma^-_{\mathscr{S}}
> $$
> and a nonempty section neighborhood
> $$
> \mathcal{C}^{\mathrm{seed}}_{\mathscr{S},\eta}
> $$
> on which the delayed-root topology and the chosen section transversality remain controlled.

> **Target Theorem (One-cycle tame propagation).**
> A sufficiently small nonempty subclass of
> $$
> \mathcal{C}^{\mathrm{seed}}_{\mathscr{S},\eta}
> $$
> propagates through one full delayed cycle while preserving the branch-control, Jacobian, memory-depth, and section-return bounds needed for the return map.

> **Target Proposition (Closed convex tame envelope).**
> There exists a nonempty closed convex set
> $$
> \mathcal{K}_{\mathscr{S},\eta}\subseteq \mathcal{C}_{\mathscr{S},\eta}\subseteq \Sigma^-_{\mathscr{S}}
> $$
> that contains the propagated tame class, is closed under the relevant delayed-root constraints, and carries a well-defined return map
> $$
> P_\eta:\mathcal{K}_{\mathscr{S},\eta}\to \mathcal{K}_{\mathscr{S},\eta}.
> $$

> **Target Proposition (Continuity and precompactness).**
> On
> $$
> \mathcal{K}_{\mathscr{S},\eta},
> $$
> the return map is continuous in the
> $$
> C^1
> $$
> topology and its image is precompact.

> **Target Theorem (Master-equation breather via Schauder).**
> Under the preceding inputs, the return map has a fixed point
> $$
> \Phi^\ast_\eta\in \mathcal{K}_{\mathscr{S},\eta},
> \qquad
> P_\eta(\Phi^\ast_\eta)=\Phi^\ast_\eta.
> $$
> The associated delayed trajectory is a bounded periodic solution of the dual-mollified master equation.

This is the correct abstract endpoint. The real work is not the formal Schauder step itself, but the geometric production of the tame self-map domain on which Schauder is allowed to act.

## Immediate Geometric Research Burdens

The first master-equation work should now concentrate on four concrete questions.

### 1. Choice of section

One needs a return section that is both dynamically natural and analytically stable under perturbation. In the 1D chapter this role is played by
$$
x=x_\ast
$$
with fixed crossing sign. In higher dimension the corresponding section should separate one cycle cleanly and eliminate time-shift symmetry without introducing artificial coordinate singularities.

### 2. Branch-topology control

The master equation already gives the exact causal root equations and the delay-map Jacobians. What is missing is a theorem that packages them into a finite tame branch family on a full excursion, rather than only at isolated times. This is the higher-dimensional replacement for the collinear root-sorting technology.

### 3. Vector recapture margins

The 1D scaffold reduces the inner and outer turns to explicit inequalities
$$
\mathfrak M_{\mathrm{in}}>0
\qquad
\text{and}
\qquad
\mathfrak M_{\mathrm{out}}>0.
$$
The master-equation replacement must be a vector coercive margin that beats all escape channels, not merely a scalar outward radial speed.

### 4. Coupled regime closure

The full theorem program must close a coupled algebraic and geometric regime in which:

- the local delayed geometry is tame,
- the recapture inequalities are strict,
- the one-cycle bounds fit inside a convex envelope,
- and the resulting return image stays inside the same tame domain.

This coupled closure problem should be stated honestly from the outset. It is where the global theorem will either succeed or fail.

## Recommended Next Regime

The most sensible continuation after the frozen collinear model is not the completely unconstrained many-body master equation. It is the first higher-dimensional regime in which line-order arguments fail but a strong symmetry reduction still survives.

The natural candidate is a reflection-symmetric planar binary with a codimension-one return section chosen to control both radial and tangential escape. That regime is still close enough to the collinear reference model to inherit much of the return-map architecture, but it is already far enough from the line to force genuinely new geometry.

If that planar bridge regime also resists tame-envelope closure, then the obstruction will be informative: it will show exactly where the collinear proof architecture ceases to transport.

## First Planar Bridge Regime

Work on the reflection-symmetric planar two-body subclass
$$
\mathbf{x}_1(t)=-\mathbf{r}(t),
\qquad
\mathbf{x}_2(t)=\mathbf{r}(t),
\qquad
\mathbf{r}(t)\in \Pi\cong \mathbb{R}^2,
\qquad
q_1=-\epsilon,
\qquad
q_2=+\epsilon.
$$
Write
$$
\rho(t)\equiv \|\mathbf{r}(t)\|,
\qquad
\hat{\mathbf{e}}_r(t)\equiv \frac{\mathbf{r}(t)}{\rho(t)},
\qquad
\hat{\mathbf{e}}_\theta(t)\equiv R_{\pi/2}\hat{\mathbf{e}}_r(t),
$$
away from the collision set, and decompose the planar velocity as
$$
\dot{\mathbf{r}}(t)=u_r(t)\hat{\mathbf{e}}_r(t)+u_\theta(t)\hat{\mathbf{e}}_\theta(t).
$$
When a polar-angle coordinate is convenient, write
$$
\mathbf{r}(t)=\rho(t)(\cos\vartheta(t),\sin\vartheta(t)).
$$

The first technical lesson is that the planar bridge should be written on a rotationally reduced chart. If one keeps the full planar rotation symmetry visible, then the most natural fixed-radius section is not affine in the ambient Banach space and the convex-envelope step is obscured from the start. The clean approach is therefore to quotient rigid planar rotations locally at the section by choosing the representative with
$$
\mathbf{r}(0)=\rho_\ast \mathbf{e}_1,
\qquad
\mathbf{e}_2\cdot \dot{\mathbf{r}}(0)>0.
$$
After this gauge choice, the remaining return question is codimension one in the reduced history space: the only equality that defines the section is the fixed section radius
$$
\rho(0)=\rho_\ast.
$$

This regime is the first honest transport problem beyond the line. It preserves reflection symmetry, center-of-mass reduction, and a single binary degree of freedom, but it no longer permits scalar ordering arguments to suppress tangential drift or delayed-root wrapping by inspection.

## Raw Section and Envelope Hierarchy in the Planar Regime

Let
$$
\mathcal{H}^{\Pi}_h \equiv C^1([-h,0];\Pi)
$$
denote the reduced planar history space in the above gauge.

The raw outbound and inbound sections should be taken as
$$
\Sigma^{+}_{\rho_\ast,\Pi}
\equiv
\left\{
\Phi\in\mathcal{H}^{\Pi}_h
\;\middle|\;
\Phi(0)=\rho_\ast \mathbf{e}_1,
\quad
\mathbf{e}_1\cdot\dot\Phi(0)>0,
\quad
\mathbf{e}_2\cdot\dot\Phi(0)>0
\right\},
$$
$$
\Sigma^{-}_{\rho_\ast,\Pi}
\equiv
\left\{
\Phi\in\mathcal{H}^{\Pi}_h
\;\middle|\;
\Phi(0)=\rho_\ast \mathbf{e}_1,
\quad
\mathbf{e}_1\cdot\dot\Phi(0)<0,
\quad
\mathbf{e}_2\cdot\dot\Phi(0)>0
\right\}.
$$
The fixed position removes the reduced rotational freedom, the sign of
$$
\mathbf{e}_1\cdot\dot\Phi(0)
$$
selects outbound versus inbound passage, and the sign of
$$
\mathbf{e}_2\cdot\dot\Phi(0)
$$
fixes the orientation branch so that the returned history does not flip across the reflection symmetry.

The planar analogue of the convex Banach envelope should then be a visibly convex subset
$$
\mathcal{C}^{\Pi}_{\rho_\ast,\eta}\subseteq \Sigma^{-}_{\rho_\ast,\Pi}
$$
defined only by affine or norm-convex bounds. A workable target is
$$
\mathcal{C}^{\Pi}_{\rho_\ast,\eta}
\equiv
\left\{
\Phi\in \Sigma^{-}_{\rho_\ast,\Pi}
\;\middle|\;
\begin{array}{l}
\|\Phi(\theta)-\rho_\ast \mathbf{e}_1\|\le R_{\max},
\\[0.4em]
\|\dot\Phi(\theta)\|\le U_{\max},
\\[0.4em]
\|\dot\Phi(\theta)-\dot\Phi(\theta')\|\le A_{\max}|\theta-\theta'|,
\\[0.4em]
U_{\theta,\min}\le \mathbf{e}_2\cdot\dot\Phi(0)\le U_{\theta,\max}
\end{array}
\text{ for all }
\theta,\theta'\in[-h,0]
\right\}.
$$
Its role is exactly the role played by the section envelope in the frozen collinear chapter: it carries only the convex bookkeeping needed for compactness and for section-side control. It should not yet contain any delayed-root topology.

The tame envelope must then be posed as a stricter target on the same section:
$$
\mathcal{K}^{\Pi}_{\rho_\ast,\eta}\subseteq \mathcal{C}^{\Pi}_{\rho_\ast,\eta}.
$$
The point is not to redefine
$$
\mathcal{K}^{\Pi}_{\rho_\ast,\eta}
$$
as an arbitrary nonconvex tame subclass, but to seek a closed convex set on which the delayed geometry can be packaged by quantitative common bounds. Concretely, the intended theorem object is a closed convex set
$$
\mathcal{K}^{\Pi}_{\rho_\ast,\eta}
$$
and constants
$$
N_{\mathrm{br}},
\quad
\nu_J,
\quad
\delta_{\mathrm{sep}},
\quad
I_{\mathrm{cau}},
\quad
m_{\mathrm{in}},
\quad
m_{\mathrm{out}}
$$
such that every
$$
\Phi\in \mathcal{K}^{\Pi}_{\rho_\ast,\eta}
$$
admits one-cycle continuation with:

- at most
  $$
  N_{\mathrm{br}}
  $$
  active delayed partner and self branches on the controlled cycle;
- branch separation at least
  $$
  \delta_{\mathrm{sep}};
  $$
- causal Jacobian bound
  $$
  |J_{ij}(t;t_0)|\ge \nu_J;
  $$
- dual-mollified caustic-transit impulse bounded by
  $$
  I_{\mathrm{cau}};
  $$
- and vector recapture margins at least
  $$
  m_{\mathrm{in}}
  \qquad
  \text{and}
  \qquad
  m_{\mathrm{out}}
  $$
  on the inner and outer return windows.

This is the first concrete higher-dimensional target for a legitimate Schauder route.

## Planar Replacement Obligations

The reduced planar bridge now breaks into six concrete packages:

- sectorized directional sorting, replacing the 1D
  $$
  w/z
  $$
  order by directional support control;
- deep-past sector relocation, replacing line-order transport of remote self roots;
- sectorwise cone transversality, replacing scalar Jacobian sign bookkeeping;
- an explicit planar seed packet, replacing the 1D affine-seed nonvacuity step;
- bounded planar caustic transit, integrating the compulsory inbound self-branch birth as a controlled fold impulse;
- and unified vector recapture criteria, replacing the scalar inner and outer turn inequalities.

The package details below carry the actual theorem statements.

### First theorem package: sectorized directional sorting

The first concrete planar task should be to replace the scalar 1D order by a finite directional atlas.

Fix a sector half-width
$$
0<\alpha_{\mathrm{sort}}<\frac{\pi}{4},
$$
and choose a finite family of unit directions
$$
\mathcal{U}=\{\hat{\mathbf{u}}_1,\dots,\hat{\mathbf{u}}_M\}\subset S^1
$$
such that the closed sectors
$$
\mathfrak{S}_k
\equiv
\left\{
\hat{\mathbf{u}}\in S^1
\;\middle|\;
\angle(\hat{\mathbf{u}},\hat{\mathbf{u}}_k)\le \alpha_{\mathrm{sort}}
\right\}
$$
cover
$$
S^1.
$$
The sector family is fixed once and for all for the chosen tame class. What varies from trajectory to trajectory is only which subfamily is active on a given controlled window.

Two cycle windows should then be named explicitly:
$$
I_{\mathrm{in}}=[t_{\mathrm{in}}^-,t_{\mathrm{x}}],
\qquad
I_{\mathrm{ap}}=[t_{\mathrm{ap}}^-,t_{\mathrm{ap}}^+].
$$
Here
$$
I_{\mathrm{in}}
$$
is the final inbound window ending at the first center crossing time
$$
t_{\mathrm{x}},
$$
and
$$
I_{\mathrm{ap}}
$$
is the late-apocenter window on the later outbound branch where the outer-turn problem is analyzed.

For any two times
$$
s<t,
$$
define the exact self and partner chord directions
$$
\hat{\mathbf{u}}_{s,t}^{\mathrm{self}}
\equiv
\frac{\mathbf{r}(t)-\mathbf{r}(s)}{\|\mathbf{r}(t)-\mathbf{r}(s)\|},
\qquad
\hat{\mathbf{u}}_{s,t}^{\mathrm{part}}
\equiv
\frac{\mathbf{r}(t)+\mathbf{r}(s)}{\|\mathbf{r}(t)+\mathbf{r}(s)\|},
$$
whenever the denominators are nonzero. The sector label of a root is the unique index
$$
k
$$
for which the corresponding chord direction lies in
$$
\mathfrak{S}_k,
$$
after shrinking the tame class so that active directions stay a positive angular distance away from sector overlaps.

> **Target Proposition (Windowed directional monotonicity).**
> There exist positive constants
> $$
> \sigma_{\mathrm{in}},
> \qquad
> \sigma_{\mathrm{ap}},
> $$
> and active sector subfamilies
> $$
> \mathcal{U}_{\mathrm{in}},
> \qquad
> \mathcal{U}_{\mathrm{ap}}
> \subseteq
> \mathcal{U}
> $$
> such that:
> 1. every active self or partner chord direction on
>    $$
>    I_{\mathrm{in}}
>    $$
>    lies in some sector from
>    $$
>    \mathcal{U}_{\mathrm{in}};
>    $$
> 2. every active self or partner chord direction on
>    $$
>    I_{\mathrm{ap}}
>    $$
>    lies in some sector from
>    $$
>    \mathcal{U}_{\mathrm{ap}};
>    $$
> 3. for every
>    $$
>    \hat{\mathbf{u}}_k\in \mathcal{U}_{\mathrm{in}},
>    \qquad
>    t\in I_{\mathrm{in}},
>    $$
>    the support function obeys
>    $$
>    \frac{d}{dt}\zeta^-_{\hat{\mathbf{u}}_k}(t)\le -\sigma_{\mathrm{in}};
>    $$
> 4. for every
>    $$
>    \hat{\mathbf{u}}_k\in \mathcal{U}_{\mathrm{ap}},
>    \qquad
>    t\in I_{\mathrm{ap}},
>    $$
>    one has
>    $$
>    \frac{d}{dt}\zeta^-_{\hat{\mathbf{u}}_k}(t)\le -\sigma_{\mathrm{ap}},
>    \qquad
>    \frac{d}{dt}\zeta^+_{\hat{\mathbf{u}}_k}(t)\ge \sigma_{\mathrm{ap}}.
>    $$

The first monotonicity statement is the planar replacement for the inbound ordered fall that, in the collinear chapter, feeds collapse and root control. The second is the higher-dimensional descendant of the late
$$
z
$$
-descent package: it separates the outgoing and incoming directional support levels on the apocenter window instead of relying on a single global scalar order.

The exact root equations now reveal why these support functions are the right replacement objects. If
$$
s<t
$$
is a self root, then with
$$
\hat{\mathbf{u}}=\hat{\mathbf{u}}_{s,t}^{\mathrm{self}}
$$
one has
$$
\mathbf{r}(t)-\mathbf{r}(s)=c_f(t-s)\hat{\mathbf{u}},
$$
hence
$$
\zeta^-_{\hat{\mathbf{u}}}(t)=\zeta^-_{\hat{\mathbf{u}}}(s).
$$
If
$$
s<t
$$
is a partner root, then with
$$
\hat{\mathbf{u}}=\hat{\mathbf{u}}_{s,t}^{\mathrm{part}}
$$
one has
$$
\mathbf{r}(t)+\mathbf{r}(s)=c_f(t-s)\hat{\mathbf{u}},
$$
hence
$$
\zeta^-_{\hat{\mathbf{u}}}(t)=-\zeta^+_{\hat{\mathbf{u}}}(s).
$$

> **Target Corollary (Sector-labeled branch family).**
> Assume the windowed directional monotonicity proposition. Then on each of the windows
> $$
> I_{\mathrm{in}}
> \qquad
> \text{and}
> \qquad
> I_{\mathrm{ap}},
> $$
> every active delayed root belongs to a unique labeled family
> $$
> \beta^{\mathrm{self}}_k
> \qquad
> \text{or}
> \qquad
> \beta^{\mathrm{part}}_k,
> \qquad
> \hat{\mathbf{u}}_k\in\mathcal{U},
> $$
> with the following consequences:
> 1. for fixed
>    $$
>    t
>    $$
>    and fixed sector
>    $$
>    \mathfrak{S}_k,
>    $$
>    there is at most one earlier self-root time
>    $$
>    s<t
>    $$
>    in that sector on the window under consideration;
> 2. for fixed
>    $$
>    t
>    $$
>    and fixed sector
>    $$
>    \mathfrak{S}_k,
>    $$
>    there is at most one earlier partner-root time
>    $$
>    s<t
>    $$
>    in that sector on the window under consideration;
> 3. the total number of active self and partner roots on either window is therefore bounded by
>    $$
>    2M;
>    $$
> 4. branch birth, branch death, or branch relabeling can occur only when an active chord direction meets a sector boundary or when the relevant monotonicity margin
>    $$
>    \sigma_{\mathrm{in}}
>    \quad
>    \text{or}
>    \quad
>    \sigma_{\mathrm{ap}}
>    $$
>    degenerates, which defines the planar caustic tube that later propositions must control.

This corollary is the exact branch-labeling consequence needed for the rest of the bridge program. It converts the delayed-root picture from an a priori moving continuum of planar chord directions into a finite labeled branch family that can be propagated, bounded, and inserted into the tame-envelope construction.

The next burden is deep-past sector relocation: remote late-apocenter self roots must either be excluded or forced into a pre-crossing inbound cone where uniqueness and transversality return.

### Second theorem package: deep-past sector relocation

The next concrete step is to convert the sector labels from the first package into a genuine exclusion-versus-relocation theorem on the late-apocenter window.

Let
$$
I_{\mathrm{out}}=[t_{\mathrm{x}},t_{\mathrm{ap}}^-]
$$
denote the earlier outbound interval between the first center crossing and the start of the late-apocenter window. For each active apocenter sector
$$
\mathfrak{S}_k,
\qquad
\hat{\mathbf{u}}_k\in \mathcal{U}_{\mathrm{ap}},
$$
define the sector support envelopes
$$
\zeta^-_{k,\max}(t)
\equiv
\sup_{\hat{\mathbf{u}}\in \mathfrak{S}_k}\zeta^-_{\hat{\mathbf{u}}}(t),
\qquad
\zeta^-_{k,\min}(t)
\equiv
\inf_{\hat{\mathbf{u}}\in \mathfrak{S}_k}\zeta^-_{\hat{\mathbf{u}}}(t).
$$
The higher-dimensional replacement for the collinear outbound-level exclusion is the sectorwise gap
$$
\Delta^{\mathrm{out}}_k
\equiv
\inf_{s\in I_{\mathrm{out}}}\zeta^-_{k,\min}(s)
-
\sup_{t\in I_{\mathrm{ap}}}\zeta^-_{k,\max}(t).
$$

If
$$
\Delta^{\mathrm{out}}_k>0,
$$
then no self root on
$$
I_{\mathrm{ap}}
$$
whose chord direction lies in
$$
\mathfrak{S}_k
$$
can have its source time on
$$
I_{\mathrm{out}}.
$$
Indeed, a self root with exact direction
$$
\hat{\mathbf{u}}\in \mathfrak{S}_k
$$
would satisfy
$$
\zeta^-_{\hat{\mathbf{u}}}(t)=\zeta^-_{\hat{\mathbf{u}}}(s),
$$
hence
$$
\zeta^-_{k,\max}(t)\ge \zeta^-_{k,\min}(s),
$$
contradicting the strict gap.

The remaining source candidate is therefore the pre-crossing inbound interval. To record that geometry, define the pre-crossing source cones
$$
\mathfrak{C}_{\mathrm{in},k}
\equiv
\left\{
\lambda \hat{\mathbf{u}}
\;\middle|\;
\lambda\ge 0,
\quad
\hat{\mathbf{u}}\in \mathfrak{S}_k
\right\},
\qquad
\mathfrak{C}_{\mathrm{in}}
\equiv
\bigcup_{\hat{\mathbf{u}}_k\in\mathcal{U}_{\mathrm{ap}}}\mathfrak{C}_{\mathrm{in},k}.
$$
The intended meaning is not that the full inbound leg lies in one cone. The intended meaning is that once a deep-past root is assigned a sector label
$$
k,
$$
its admissible pre-crossing source point should be confined to the matching inbound cone
$$
\mathfrak{C}_{\mathrm{in},k}.
$$

The first package should also be strengthened sectorwise: after shrinking
$$
\alpha_{\mathrm{sort}}
$$
and the tame class if necessary, the directional monotonicity bounds should hold uniformly for every
$$
\hat{\mathbf{u}}\in\mathfrak{S}_k,
\qquad
\hat{\mathbf{u}}_k\in\mathcal{U}_{\mathrm{in}}\cup \mathcal{U}_{\mathrm{ap}},
$$
not only for the sector centers. This is the form actually needed for uniqueness and relocation.

> **Target Proposition (Sectorwise outbound exclusion).**
> Assume the windowed directional monotonicity package and suppose that for every active apocenter sector
> $$
> \hat{\mathbf{u}}_k\in\mathcal{U}_{\mathrm{ap}}
> $$
> one has
> $$
> \Delta^{\mathrm{out}}_k>0.
> $$
> Let
> $$
> t\in I_{\mathrm{ap}}
> $$
> and let
> $$
> s<t
> $$
> be a self-root time whose chord direction belongs to
> $$
> \mathfrak{S}_k.
> $$
> Then
> $$
> s\notin I_{\mathrm{out}}.
> $$

This is the direct planar analogue of the 1D statement that late apocenter levels fall below the entire earlier outbound range. The point is the same as in the frozen scaffold, but the comparison is now sectorwise and uses support envelopes rather than a single scalar
$$
z.
$$

> **Target Proposition (Pre-crossing sector relocation).**
> Assume the sectorwise outbound exclusion proposition, and assume in addition that:
> 1. every self root on
>    $$
>    I_{\mathrm{ap}}
>    $$
>    with delay at least
>    $$
>    \tau_{\mathrm{dp}}
>    $$
>    has source time
>    $$
>    s\le t_{\mathrm{ap}}^-;
>    $$
> 2. for every active apocenter sector
>    $$
>    \mathfrak{S}_k,
>    $$
>    the pre-crossing inbound history intersects the matching cone
>    $$
>    \mathfrak{C}_{\mathrm{in},k}
>    $$
>    in a connected interval on which
>    $$
>    \frac{d}{ds}\zeta^-_{\hat{\mathbf{u}}}(s)\le -\sigma_{\mathrm{in}}^{\sharp}<0
>    \qquad
>    \text{for every }
>    \hat{\mathbf{u}}\in \mathfrak{S}_k;
>    $$
> 3. outside that connected inbound interval, the pre-crossing history has no source point whose self chord to the late-apocenter window lies in
>    $$
>    \mathfrak{S}_k.
>    $$
>
> Then every deep-past self root on
> $$
> I_{\mathrm{ap}}
> $$
> is either absent or has a unique source time
> $$
> s\in I_{\mathrm{in}}
> $$
> with
> $$
> \mathbf{r}(s)\in \mathfrak{C}_{\mathrm{in},k}
> $$
> for the matching sector label
> $$
> k.
> $$

This is the correct replacement for the collinear relocation lemma. The source is not forced onto one signed interval because there is no global line order. It is forced into a sector-matched pre-crossing cone where directional monotonicity restores uniqueness.

> **Target Corollary (Deep-past sector suppression).**
> Assume the pre-crossing sector relocation proposition and, in addition, a uniform Jacobian lower bound
> $$
> |J_s(t;s)|\ge \nu_{J,\mathrm{dp}}>0
> $$
> on the relocated deep-past branches. Then the total self contribution from all deep-past late-apocenter roots satisfies
> $$
> \|\mathbf{a}^{\mathrm{deep}}_{s}(t)\|
> \le
> \frac{M_{\mathrm{ap}}\kappa\epsilon^2}{
> \bigl(c_f^2\tau_{\mathrm{dp}}^2+\epsilon_c^2\bigr)\nu_{J,\mathrm{dp}}}
> \qquad
> \text{for every }
> t\in I_{\mathrm{ap}},
> $$
> where
> $$
> M_{\mathrm{ap}}=|\mathcal{U}_{\mathrm{ap}}|.
> $$

This corollary is the exact output needed later for the outer-turn comparison argument. Once each deep-past sector contributes at most one transversal branch, the full delayed self-drive is reduced to a finite sector count times a single branch amplitude bound.

The next burden is cone transversality: active branch families need velocity-cone hypotheses that keep the relevant Jacobians uniformly positive throughout the controlled cycle.

### Third theorem package: sectorwise cone transversality

The transversality problem should be stated sectorwise, because the line of sight is already sector-labeled by the first package and the deep-past relocation theorem returns the source to a sector-matched inbound cone.

For each sector
$$
\mathfrak{S}_k
$$
and each controlled window
$$
W\in\{I_{\mathrm{in}},I_{\mathrm{ap}}\},
$$
introduce closed velocity cones
$$
\mathfrak{V}^{\mathrm{self}}_{k,W}\subset \Pi,
\qquad
\mathfrak{V}^{\mathrm{part}}_{k,W}\subset \Pi.
$$
These are not spatial source cones. They live in velocity space and encode the admissible emitter velocities for source points whose active chord directions lie in
$$
\mathfrak{S}_k.
$$

For each such cone define the projection ceilings
$$
\Gamma^{\mathrm{self}}_{k,W}
\equiv
\sup_{\mathbf{v}\in \mathfrak{V}^{\mathrm{self}}_{k,W}}
\ \sup_{\hat{\mathbf{u}}\in \mathfrak{S}_k}
\mathbf{v}\cdot \hat{\mathbf{u}},
$$
$$
\Gamma^{\mathrm{part}}_{k,W}
\equiv
\sup_{\mathbf{v}\in \mathfrak{V}^{\mathrm{part}}_{k,W}}
\ \sup_{\hat{\mathbf{u}}\in \mathfrak{S}_k}
\mathbf{v}\cdot \hat{\mathbf{u}}.
$$
The associated dimensionless Jacobian floors are
$$
\nu^{\mathrm{self}}_{J,k,W}
\equiv
1-\frac{\Gamma^{\mathrm{self}}_{k,W}}{c_f},
\qquad
\nu^{\mathrm{part}}_{J,k,W}
\equiv
1-\frac{\Gamma^{\mathrm{part}}_{k,W}}{c_f}.
$$
Thus any theorem that produces
$$
\Gamma^{\mathrm{self}}_{k,W}<c_f,
\qquad
\Gamma^{\mathrm{part}}_{k,W}<c_f
$$
automatically yields positive transversality margins.

> **Target Proposition (Windowwise velocity-cone realization).**
> There exist closed cones
> $$
> \mathfrak{V}^{\mathrm{self}}_{k,W},
> \qquad
> \mathfrak{V}^{\mathrm{part}}_{k,W},
> \qquad
> \hat{\mathbf{u}}_k\in \mathcal{U}_{\mathrm{in}}\cup \mathcal{U}_{\mathrm{ap}},
> \qquad
> W\in\{I_{\mathrm{in}},I_{\mathrm{ap}}\},
> $$
> such that every active labeled branch family
> $$
> \beta^{\mathrm{self}}_k
> \qquad
> \text{or}
> \qquad
> \beta^{\mathrm{part}}_k
> $$
> on
> $$
> W
> $$
> has its emitter velocity in the corresponding cone and satisfies
> $$
> \Gamma^{\mathrm{self}}_{k,W}\le c_f(1-\nu^{\mathrm{self}}_{J,k,W}),
> \qquad
> \Gamma^{\mathrm{part}}_{k,W}\le c_f(1-\nu^{\mathrm{part}}_{J,k,W})
> $$
> for some positive constants
> $$
> \nu^{\mathrm{self}}_{J,k,W},
> \qquad
> \nu^{\mathrm{part}}_{J,k,W}.
> $$
> Consequently every active branch on those windows obeys
> $$
> J_{ij}(t;t_0)\ge \min\{\nu^{\mathrm{self}}_{J,k,W},\nu^{\mathrm{part}}_{J,k,W}\}>0.
> $$

The content of this proposition is geometric rather than algebraic. One has to prove that admissible emitter velocities stay inside cones whose forward projection onto every active line-of-sight sector remains strictly sub-field-speed. That is the planar replacement for the scalar statement that the 1D Jacobian sign never approaches zero on the controlled branch family.

For later use it is convenient to compress the windowwise floors into
$$
\nu_{J,\mathrm{cyc}}
\equiv
\min_{k,W}
\bigl\{
\nu^{\mathrm{self}}_{J,k,W},
\nu^{\mathrm{part}}_{J,k,W}
\bigr\}.
$$
Then the entire controlled cycle satisfies
$$
|J_{ij}(t;t_0)|\ge \nu_{J,\mathrm{cyc}}>0
$$
on every labeled active branch.

The relocated deep-past self branches should carry a stronger inbound version of the same statement. On the pre-crossing source interval the desirable geometry is not merely sub-field-speed projection, but strictly negative projection onto the sector direction.

> **Target Proposition (Inbound cone strengthening for relocated deep-past branches).**
> Assume the pre-crossing sector relocation theorem. Then for every active apocenter sector
> $$
> \mathfrak{S}_k
> $$
> there exists a closed inbound velocity cone
> $$
> \mathfrak{V}^{\mathrm{dp}}_{k,\mathrm{in}}\subset \Pi
> $$
> and a constant
> $$
> \mu_{J,\mathrm{dp},k}>0
> $$
> such that every relocated deep-past source point on the matching inbound interval satisfies
> $$
> \dot{\mathbf{r}}(s)\in \mathfrak{V}^{\mathrm{dp}}_{k,\mathrm{in}},
> \qquad
> \dot{\mathbf{r}}(s)\cdot \hat{\mathbf{u}}\le -\mu_{J,\mathrm{dp},k}
> \qquad
> \text{for every }
> \hat{\mathbf{u}}\in \mathfrak{S}_k.
> $$
> Therefore every relocated deep-past self branch satisfies
> $$
> J_s(t;s)
> =
> 1-\frac{\dot{\mathbf{r}}(s)\cdot \hat{\mathbf{u}}_{s,t}^{\mathrm{self}}}{c_f}
> \ge
> 1+\frac{\mu_{J,\mathrm{dp},k}}{c_f}.
> $$

This is the precise higher-dimensional analogue of the collinear fact that a pre-crossing inbound source automatically gives
$$
J_s>1.
$$
The proof burden is now cone separation on the pre-crossing source interval rather than a one-line sign argument.

> **Target Corollary (Deep-past Jacobian floor from inbound cone separation).**
> Assume the inbound cone strengthening proposition and define
> $$
> \nu_{J,\mathrm{dp}}
> \equiv
> 1+\frac{1}{c_f}\min_k \mu_{J,\mathrm{dp},k}.
> $$
> Then every relocated deep-past self branch on
> $$
> I_{\mathrm{ap}}
> $$
> obeys
> $$
> |J_s(t;s)|\ge \nu_{J,\mathrm{dp}}>1.
> $$

This is the exact Jacobian input promised in the deep-past sector suppression corollary above. Once it is available, the late-apocenter deep-past amplitude bound is fully reduced to sector count, delay separation, and the inbound cone geometry.

The next burden is section-side nonvacuity: the planar seed must realize strict chord defect and finite transversal partner geometry on the reduced section.

### Fourth theorem package: explicit planar seed packet

The section-side nonvacuity problem should now be made explicit in the reduced planar chart rather than left as an abstract existence claim.

Fix positive constants
$$
\rho_\ast>0,
\qquad
u_{r,\mathrm{seed}}>0,
\qquad
u_{\theta,\mathrm{seed}}>0,
$$
and define
$$
U_{\mathrm{seed}}
\equiv
\sqrt{u_{r,\mathrm{seed}}^2+u_{\theta,\mathrm{seed}}^2}.
$$
Assume
$$
U_{\mathrm{seed}}<c_f.
$$
Set
$$
\mathbf{v}_{\mathrm{seed}}
\equiv
-u_{r,\mathrm{seed}}\mathbf{e}_1
+
u_{\theta,\mathrm{seed}}\mathbf{e}_2
$$
and define the explicit affine planar seed by
$$
\Phi_{\mathrm{seed}}(\theta)
\equiv
\rho_\ast \mathbf{e}_1+\theta \mathbf{v}_{\mathrm{seed}},
\qquad
\theta\in[-h,0].
$$

This is the minimal planar analogue of the frozen 1D affine inbound seed. It is still affine in history time, but it already carries the genuinely planar datum that the tangential component is positive at the section.

> **Target Proposition (Explicit planar affine seed history).**
> Fix
> $$
> \rho_\ast>0,
> \qquad
> u_{r,\mathrm{seed}}>0,
> \qquad
> u_{\theta,\mathrm{seed}}>0,
> \qquad
> U_{\mathrm{seed}}<c_f,
> $$
> and let
> $$
> \Phi_{\mathrm{seed}}(\theta)
> =
> \rho_\ast \mathbf{e}_1+\theta \mathbf{v}_{\mathrm{seed}}
> $$
> as above. Define
> $$
> \sigma_{p,\mathrm{seed}}
> \equiv
> \frac{2\rho_\ast}{
> \sqrt{c_f^2-u_{\theta,\mathrm{seed}}^2}
> -
> u_{r,\mathrm{seed}}}.
> $$
> If
> $$
> h>\sigma_{p,\mathrm{seed}},
> $$
> then:
> 1. the section conditions hold:
>    $$
>    \Phi_{\mathrm{seed}}(0)=\rho_\ast \mathbf{e}_1,
>    \qquad
>    \mathbf{e}_1\cdot\dot\Phi_{\mathrm{seed}}(0)=-u_{r,\mathrm{seed}}<0,
>    \qquad
>    \mathbf{e}_2\cdot\dot\Phi_{\mathrm{seed}}(0)=u_{\theta,\mathrm{seed}}>0;
>    $$
> 2. the stored path has constant speed and zero acceleration:
>    $$
>    \sup_{\theta\in[-h,0]}
>    \|\dot\Phi_{\mathrm{seed}}(\theta)\|
>    =
>    U_{\mathrm{seed}},
>    \qquad
>    \ddot\Phi_{\mathrm{seed}}(\theta)=0;
>    $$
> 3. there are no exact same-source self roots on
>    $$
>    [-h,0);
>    $$
> 4. there is exactly one partner root on the stored interval, located at
>    $$
>    \theta_{p,\mathrm{seed}}=-\sigma_{p,\mathrm{seed}},
>    $$
>    and its Jacobian obeys
>    $$
>    J_{p,\mathrm{seed}}
>    \ge
>    1-\frac{U_{\mathrm{seed}}}{c_f}
>    >0.
>    $$

The proof is the planar version of the 1D seed argument, but the partner root is now genuinely vectorial. Writing
$$
\sigma=-\theta>0,
$$
the partner root equation at the section time is
$$
\|\rho_\ast \mathbf{e}_1+\Phi_{\mathrm{seed}}(-\sigma)\|
=
\sqrt{(2\rho_\ast+u_{r,\mathrm{seed}}\sigma)^2+u_{\theta,\mathrm{seed}}^2\sigma^2}
=
c_f\sigma.
$$
Because
$$
U_{\mathrm{seed}}<c_f,
$$
this equation has the unique positive solution
$$
\sigma=\sigma_{p,\mathrm{seed}}.
$$
Equivalently, the scalar function
$$
H_{\mathrm{seed}}(\sigma)
\equiv
\|\rho_\ast \mathbf{e}_1+\Phi_{\mathrm{seed}}(-\sigma)\|-c_f\sigma
$$
starts from
$$
H_{\mathrm{seed}}(0)=2\rho_\ast>0
$$
and satisfies
$$
H_{\mathrm{seed}}'(\sigma)\le U_{\mathrm{seed}}-c_f<0,
$$
so the root is unique once
$$
h>\sigma_{p,\mathrm{seed}}.
$$

For exact self roots on the stored interval one has
$$
\|\Phi_{\mathrm{seed}}(0)-\Phi_{\mathrm{seed}}(\theta)\|
=
U_{\mathrm{seed}}|\theta|
<
c_f|\theta|
\qquad
\text{for every }
\theta\in[-h,0),
$$
which is the desired chord-defect inequality. Thus the seed carries no exact same-source self roots at all. For the unique partner root, the source particle velocity has norm
$$
U_{\mathrm{seed}},
$$
so the causal Jacobian satisfies the uniform lower bound
$$
J_{p,\mathrm{seed}}
=
1-\frac{\mathbf{v}_{1}(\theta_{p,\mathrm{seed}})\cdot \hat{\mathbf{r}}_{p,\mathrm{seed}}}{c_f}
\ge
1-\frac{U_{\mathrm{seed}}}{c_f}
>0.
$$

Consequently, if the convex-envelope constants satisfy
$$
R_{\max}\ge U_{\mathrm{seed}}h,
\qquad
U_{\max}\ge U_{\mathrm{seed}},
\qquad
A_{\max}>0,
\qquad
0<U_{\theta,\min}\le u_{\theta,\mathrm{seed}}\le U_{\theta,\max},
$$
then
$$
\Phi_{\mathrm{seed}}\in \mathcal{C}^{\Pi}_{\rho_\ast,\eta}.
$$

> **Target Corollary (Nonempty planar section-side tame neighborhood).**
> Under the hypotheses of the explicit planar affine seed proposition, there exist
> $$
> \varepsilon_{\mathrm{seed}}>0,
> \qquad
> \nu_{\mathrm{seed}}>0,
> $$
> and a sector label
> $$
> \hat{\mathbf{u}}_{k_{\mathrm{seed}}}\in \mathcal{U}_{\mathrm{in}}
> $$
> such that the set
> $$
> \mathcal{C}^{\Pi,\mathrm{seed}}_{\rho_\ast,\eta}
> \equiv
> \left\{
> \Phi\in \mathcal{C}^{\Pi}_{\rho_\ast,\eta}
> \;\middle|\;
> \Phi(0)=\rho_\ast\mathbf{e}_1,
> \quad
> \mathbf{e}_1\cdot\dot\Phi(0)\le -\frac{u_{r,\mathrm{seed}}}{2},
> \quad
> \mathbf{e}_2\cdot\dot\Phi(0)\ge \frac{u_{\theta,\mathrm{seed}}}{2},
> \quad
> \|\Phi-\Phi_{\mathrm{seed}}\|_{C^1([-h,0])}\le \varepsilon_{\mathrm{seed}}
> \right\}
> $$
> is nonempty and has the following properties:
> 1. every
>    $$
>    \Phi\in\mathcal{C}^{\Pi,\mathrm{seed}}_{\rho_\ast,\eta}
>    $$
>    satisfies
>    $$
>    \sup_{\theta\in[-h,0]}\|\dot\Phi(\theta)\|
>    \le
>    \frac{U_{\mathrm{seed}}+c_f}{2}
>    <c_f;
>    $$
> 2. hence no member of the class has an exact same-source self root on
>    $$
>    [-h,0);
>    $$
> 3. the stored partner root persists uniquely, remains simple, and satisfies
>    $$
>    |J_p|\ge \nu_{\mathrm{seed}};
>    $$
> 4. the corresponding partner chord direction remains inside one fixed sector
>    $$
>    \mathfrak{S}_{k_{\mathrm{seed}}}.
>    $$

This is the first honest nonvacuity statement for the planar bridge. It says that the reduced section, the chord-defect self-root exclusion, and the sector-labeled partner geometry are simultaneously realizable on a nonempty open patch of the planar history space.

The next burden is bounded planar caustic transit: the first inbound self-branch birth must be integrated through as a controlled shell impulse rather than excluded as a pathology.

### Fifth theorem package: bounded planar caustic transit

The first seed-side dynamical obstruction is the birth of the principal inbound self branch. In the planar regime this should be formulated as a controlled fold in the exact self-delay equation, not as a global transversality statement that pretends the fold never occurs.

For
$$
s<t,
$$
define the self-delay defect by
$$
G_s(t,s)
\equiv
\|\mathbf{r}(t)-\mathbf{r}(s)\|-c_f(t-s).
$$
Self roots satisfy
$$
G_s(t,s)=0.
$$
Whenever
$$
\mathbf{r}(t)\ne \mathbf{r}(s),
$$
one has
$$
\partial_s G_s(t,s)
=
c_f-\dot{\mathbf{r}}(s)\cdot \hat{\mathbf{u}}_{s,t}^{\mathrm{self}}
=
c_f J_s(t;s).
$$
Thus a self-root caustic is exactly the loss of source transversality
$$
J_s(t;s)=0
$$
along the same defect equation.

Fix a nonempty seed-generated tame inbound class
$$
\mathcal{C}^{\Pi,\mathrm{in}}_{\rho_\ast,\eta}
\subseteq
\mathcal{C}^{\Pi,\mathrm{seed}}_{\rho_\ast,\eta}
$$
on which the directional sorting, deep-past sector relocation, and cone-transversality packages all hold on the pre-crossing leg.

The planar caustic event should then be organized around one birth pair
$$
(t_{\mathrm{cau}},s_{\mathrm{cau}}),
\qquad
s_{\mathrm{cau}}<t_{\mathrm{cau}},
$$
with associated sector label
$$
\hat{\mathbf{u}}_{k_{\mathrm{cau}}}\in \mathcal{U}_{\mathrm{in}}.
$$
For a tube radius
$$
\delta_{\mathrm{cau}}>0,
$$
write the caustic tube in the
$$
(t,s)
$$
plane as
$$
\mathcal{T}_{\mathrm{cau}}(\delta_{\mathrm{cau}})
\equiv
\left\{
(t,s)
\;\middle|\;
|t-t_{\mathrm{cau}}|+|s-s_{\mathrm{cau}}|
\le
\delta_{\mathrm{cau}},
\quad
s<t
\right\},
$$
and let the associated reception-time window be
$$
W_{\mathrm{cau}}
\equiv
[t_{\mathrm{cau}}-\delta_{\mathrm{cau}},\,t_{\mathrm{cau}}+\delta_{\mathrm{cau}}].
$$

> **Target Theorem (Inbound planar caustic transit and recovery).**
> Assume there exist class constants
> $$
> \nu_{p,\mathrm{cau}}>0,
> \qquad
> \lambda_{\mathrm{cau}}>0,
> \qquad
> \chi_{\mathrm{cau}}>0,
> \qquad
> \nu_{s,\mathrm{rec}}>0,
> \qquad
> N_{s,\mathrm{cau}}\in \mathbb{N},
> \qquad
> I_{\mathrm{cau}}<\infty,
> $$
> such that for every inbound trajectory issued from
> $$
> \mathcal{C}^{\Pi,\mathrm{in}}_{\rho_\ast,\eta}
> $$
> the following hold:
> 1. **partner-branch safety:** every active partner branch on the pre-crossing leg remains simple and satisfies
>    $$
>    |J_p|\ge \nu_{p,\mathrm{cau}};
>    $$
> 2. **single fold birth of the principal self branch:** there is exactly one pair
>    $$
>    (t_{\mathrm{cau}},s_{\mathrm{cau}})
>    $$
>    with sector label
>    $$
>    k_{\mathrm{cau}}
>    $$
>    such that
>    $$
>    G_s(t_{\mathrm{cau}},s_{\mathrm{cau}})=0,
>    \qquad
>    \partial_s G_s(t_{\mathrm{cau}},s_{\mathrm{cau}})=0,
>    $$
>    while the fold is nondegenerate:
>    $$
>    \partial_{ss}G_s(t_{\mathrm{cau}},s_{\mathrm{cau}})\ge \lambda_{\mathrm{cau}},
>    \qquad
>    \partial_t G_s(t_{\mathrm{cau}},s_{\mathrm{cau}})\le -\chi_{\mathrm{cau}};
>    $$
> 3. **controlled branch count through the tube:** outside
>    $$
>    \mathcal{T}_{\mathrm{cau}}(\delta_{\mathrm{cau}})
>    $$
>    all active self branches are simple and sector-labeled, and the total number of active self branches on the pre-crossing leg is bounded by
>    $$
>    N_{s,\mathrm{cau}};
>    $$
> 4. **bounded dual-mollified caustic impulse:** if
>    $$
>    \mathbf{a}^{\mathrm{self}}_{\eta,\mathrm{cau}}(t)
>    $$
>    denotes the self contribution coming from the branch family intersecting
>    $$
>    \mathcal{T}_{\mathrm{cau}}(\delta_{\mathrm{cau}}),
>    $$
>    then
>    $$
>    \left\|
>    \int_{W_{\mathrm{cau}}}
>    \mathbf{a}^{\mathrm{self}}_{\eta,\mathrm{cau}}(t)\,dt
>    \right\|
>    \le
>    I_{\mathrm{cau}};
>    $$
> 5. **post-tube Jacobian recovery:** once
>    $$
>    t\ge t_{\mathrm{cau}}+\delta_{\mathrm{cau}},
>    $$
>    the born self branch persists in a fixed sector family and satisfies
>    $$
>    |J_s(t;s(t))|\ge \nu_{s,\mathrm{rec}};
>    $$
> 6. **sorting-gap handoff:** the exiting post-tube history still lies in the same directional-sorting regime needed for the subsequent post-crossing window.

> Then the compulsory inbound self-branch birth contributes only a finite controlled velocity impulse, does not destroy the tame branch package, and hands the trajectory to the later recapture stage with restored Jacobian control.

This is the exact higher-dimensional analogue of the resolved 1D pivot. The theorem does not deny the caustic. It isolates it to one fold tube, integrates the dual-mollified effect across that tube, and demands recovery of the simple-branch regime immediately afterward.

The proof architecture should be split into three bounded tasks.

1. **Fold-birth localization.**
   Show that the first loss of self transversality on the pre-crossing leg occurs at one sector-labeled fold pair and not by uncontrolled simultaneous births in several sectors.
2. **Shell-impulse estimate.**
   Use dual mollification and the fold normal form to prove integrability of the self contribution across
   $$
   W_{\mathrm{cau}},
   $$
   with a class-uniform bound by
   $$
   I_{\mathrm{cau}}.
   $$
3. **Recovery outside the tube.**
   Prove that the born self branch exits the caustic tube into the same sectorwise cone-transversality regime already used elsewhere, yielding
   $$
   |J_s|\ge \nu_{s,\mathrm{rec}}.
   $$

> **Target Corollary (Planar caustic handoff).**
> Under the inbound planar caustic-transit theorem, the pre-crossing leg issued from
> $$
> \mathcal{C}^{\Pi,\mathrm{in}}_{\rho_\ast,\eta}
> $$
> reaches the post-tube inbound window with:
> 1. the same partner-branch control,
> 2. one sector-labeled principal self branch with recovered Jacobian floor
>    $$
>    \nu_{s,\mathrm{rec}},
>    $$
> 3. total self impulse error bounded by
>    $$
>    I_{\mathrm{cau}},
>    $$
> 4. and no uncontrolled change in branch labels.

This corollary is the precise output needed before any vector recapture margin can be trusted. Without it, the post-crossing comparison problem would start from a branch topology that may already have disintegrated at the first self-birth event.

The next burden is vector recapture: the planar turn criteria must beat self drive and centrifugal leakage while keeping tangential forcing bounded.

### Sixth theorem package: unified vector recapture criteria

The planar comparison problem should be written on two explicit windows:
$$
W_{\mathrm{in}}^{\mathrm{turn}}
\equiv
[t_{\mathrm{in}}^{\mathrm{turn}},\,t_{\mathrm{in}}^{\mathrm{turn}}+\tau_{\mathrm{in}}],
\qquad
W_{\mathrm{out}}^{\mathrm{turn}}
\equiv
I_{\mathrm{ap}}
=[t_{\mathrm{ap}}^-,\,t_{\mathrm{ap}}^+].
$$
The first is the short post-crossing window issued by the caustic handoff. The second is the late-apocenter window on the later outbound branch.

Write the net acceleration in the moving polar frame as
$$
\mathbf{a}_{\mathrm{net}}(t)
=
a_r(t)\hat{\mathbf{e}}_r(t)
+
a_\theta(t)\hat{\mathbf{e}}_\theta(t),
\qquad
a_r(t)=\hat{\mathbf{e}}_r(t)\cdot \mathbf{a}_{\mathrm{net}}(t),
\qquad
a_\theta(t)=\hat{\mathbf{e}}_\theta(t)\cdot \mathbf{a}_{\mathrm{net}}(t).
$$
Then
$$
\ddot\rho(t)=a_r(t)+\rho(t)\dot\vartheta(t)^2.
$$
The scalar 1D turn inequalities are therefore replaced by a competition among three windowwise quantities:

- an inward partner floor,
- an outward self ceiling,
- and a centrifugal leakage ceiling.

> **Target Proposition (Windowwise vector-force split).**
> There exist nonnegative constants
> $$
> \underline A^{\mathrm{in}}_p,
> \quad
> \overline A^{\mathrm{in}}_s,
> \quad
> \Theta_{\mathrm{in}},
> \quad
> \Gamma_{\theta,\mathrm{in}},
> $$
> and
> $$
> \underline A^{\mathrm{out}}_p,
> \quad
> \overline A^{\mathrm{out}}_s,
> \quad
> \Theta_{\mathrm{out}},
> \quad
> \Gamma_{\theta,\mathrm{out}},
> $$
> such that on
> $$
> W_{\mathrm{in}}^{\mathrm{turn}}
> $$
> one has
> $$
> -a_r^{\mathrm{part}}(t)\ge \underline A^{\mathrm{in}}_p,
> \qquad
> a_r^{\mathrm{self}}(t)\le \overline A^{\mathrm{in}}_s,
> \qquad
> \rho(t)\dot\vartheta(t)^2\le \Theta_{\mathrm{in}},
> \qquad
> |a_\theta(t)|\le \Gamma_{\theta,\mathrm{in}},
> $$
> and on
> $$
> W_{\mathrm{out}}^{\mathrm{turn}}
> $$
> one has
> $$
> -a_r^{\mathrm{part}}(t)\ge \underline A^{\mathrm{out}}_p,
> \qquad
> a_r^{\mathrm{self}}(t)\le \overline A^{\mathrm{out}}_s,
> \qquad
> \rho(t)\dot\vartheta(t)^2\le \Theta_{\mathrm{out}},
> \qquad
> |a_\theta(t)|\le \Gamma_{\theta,\mathrm{out}}.
> $$

Define the reference inward accelerations
$$
a^{\mathrm{in}}_{\mathrm{ref}}
\equiv
\underline A^{\mathrm{in}}_p-\overline A^{\mathrm{in}}_s-\Theta_{\mathrm{in}},
\qquad
a^{\mathrm{out}}_{\mathrm{ref}}
\equiv
\underline A^{\mathrm{out}}_p-\overline A^{\mathrm{out}}_s-\Theta_{\mathrm{out}}.
$$
Whenever these are positive, the radial comparison inequality becomes
$$
\ddot\rho(t)\le -a^{\mathrm{in}}_{\mathrm{ref}}<0
\qquad
\text{on }W_{\mathrm{in}}^{\mathrm{turn}},
$$
and
$$
\ddot\rho(t)\le -a^{\mathrm{out}}_{\mathrm{ref}}<0
\qquad
\text{on }W_{\mathrm{out}}^{\mathrm{turn}}.
$$

This is the exact place where the planar bridge differs from the 1D proof scaffold. In the collinear note the comparison race is partner attraction versus self drive. Here the same race acquires the additional positive leakage term
$$
\rho\dot\vartheta^2,
$$
and the tangential forcing bound is needed precisely so that the leakage ceiling
$$
\Theta_{\mathrm{in}}
\quad
\text{or}
\quad
\Theta_{\mathrm{out}}
$$
can be maintained throughout the comparison window.

> **Target Theorem (Unified planar vector recapture criterion).**
> Assume the windowwise vector-force split proposition and define the initial outward radial speeds
> $$
> V_{\mathrm{in},0}
> \equiv
> \dot\rho(t_{\mathrm{in}}^{\mathrm{turn}}),
> \qquad
> V_{\mathrm{out},0}
> \equiv
> \dot\rho(t_{\mathrm{ap}}^-).
> $$
> If
> $$
> a^{\mathrm{in}}_{\mathrm{ref}}>0,
> \qquad
> |W_{\mathrm{in}}^{\mathrm{turn}}|
> \ge
> \frac{V_{\mathrm{in},0}}{a^{\mathrm{in}}_{\mathrm{ref}}},
> $$
> then the first post-crossing radial velocity reaches zero on or before the end of
> $$
> W_{\mathrm{in}}^{\mathrm{turn}}.
> $$
> If, in addition,
> $$
> a^{\mathrm{out}}_{\mathrm{ref}}>0,
> \qquad
> |W_{\mathrm{out}}^{\mathrm{turn}}|
> \ge
> \frac{V_{\mathrm{out},0}}{a^{\mathrm{out}}_{\mathrm{ref}}},
> $$
> then the late outbound radial velocity also reaches zero on or before the end of
> $$
> W_{\mathrm{out}}^{\mathrm{turn}}.
> $$
> Consequently the trajectory makes both the inner post-crossing turn and the final outer turn inside the controlled planar windows.

The proof is a direct comparison argument once the windowwise floors and ceilings are in hand. The real work is therefore not the last line of the proof. It is the production of the constants
$$
\underline A^{\mathrm{in}}_p,
\quad
\overline A^{\mathrm{in}}_s,
\quad
\Theta_{\mathrm{in}},
\quad
\underline A^{\mathrm{out}}_p,
\quad
\overline A^{\mathrm{out}}_s,
\quad
\Theta_{\mathrm{out}}
$$
from the earlier bridge packages.

The dependency chain should be recorded explicitly:

1. the caustic handoff theorem supplies the controlled entry data for
   $$
   W_{\mathrm{in}}^{\mathrm{turn}};
   $$
2. the directional sorting and transversality packages keep the partner floor and local self ceiling stable on the inner window;
3. the deep-past relocation and suppression packages produce the outer self ceiling on
   $$
   W_{\mathrm{out}}^{\mathrm{turn}};
   $$
4. the tangential forcing bounds are what keep
   $$
   \Theta_{\mathrm{in}}
   \quad
   \text{and}
   \quad
   \Theta_{\mathrm{out}}
   $$
   from becoming uncontrolled.

> **Target Corollary (Inner and outer planar turn margins).**
> Under the unified planar vector recapture criterion, define
> $$
> \mathfrak{M}^{\Pi}_{\mathrm{in}}
> \equiv
> a^{\mathrm{in}}_{\mathrm{ref}},
> \qquad
> \mathfrak{M}^{\Pi}_{\mathrm{out}}
> \equiv
> a^{\mathrm{out}}_{\mathrm{ref}}.
> $$
> Then the bridge note has precise higher-dimensional replacements for the 1D quantities
> $$
> \mathfrak M_{\mathrm{in}}>0
> \qquad
> \text{and}
> \qquad
> \mathfrak M_{\mathrm{out}}>0.
> $$
> The only remaining burden is to prove those margins from the earlier sector, cone, caustic, and deep-past packages.

## Synthesis of the Reduced Planar Bridge

At this point the live bridge note is not yet treating the completely general planar master equation. It is treating a symmetry-reduced planar binary with:

- reflection symmetry,
- center-of-mass reduction,
- a rotationally fixed section representative,
- and one relative planar degree of freedom.

That distinction should remain explicit. The present bridge is the first higher-dimensional transport problem beyond the line, but it is still a reduced regime. The note has not yet advanced to arbitrary 2D delayed trajectories, arbitrary planar many-body branch topology, or the full master equation without symmetry reduction.

Within this reduced planar regime, the theorem ladder now has a definite shape:

1. a nonempty section-side seed packet
   $$
   \mathcal{C}^{\Pi,\mathrm{seed}}_{\rho_\ast,\eta}
   $$
   provides explicit nonvacuity;
2. directional sorting organizes active delayed roots into finitely many sector-labeled branch families;
3. deep-past sector relocation or exclusion removes the late-apocenter analogue of uncontrolled remote self roots;
4. sectorwise cone transversality supplies cycle-wide Jacobian floors together with the stronger deep-past bound
   $$
   \nu_{J,\mathrm{dp}}>1;
   $$
5. bounded planar caustic transit integrates the compulsory inbound self-branch birth through one controlled fold tube;
6. unified vector recapture criteria replace the 1D inner and outer turn inequalities by the planar margins
   $$
   \mathfrak{M}^{\Pi}_{\mathrm{in}}>0,
   \qquad
   \mathfrak{M}^{\Pi}_{\mathrm{out}}>0.
   $$

This synthesis also isolates the exact difference from the frozen 1D scaffold. The collinear note relies on total order and scalar comparison. The reduced planar bridge replaces those by sector atlases, velocity cones, fold tubes, and a radial comparison law that must pay the centrifugal leakage term
$$
\rho\dot\vartheta^2.
$$
So the present note is not “the general 2D case.” It is the first reduced 2D bridge in which tangential escape is already real, but still symmetry-controlled.

What remains missing before the Schauder route can be executed as a serious closure theorem is now sharply delimited:

- one closed convex tame self-map domain
  $$
  \mathcal{K}^{\Pi}_{\rho_\ast,\eta};
  $$
- continuity and precompactness of the reduced planar return map on that same domain;
- and one coupled parameter regime in which all sorting, relocation, transversality, caustic, and recapture constants are simultaneously realizable.

### Seventh theorem package: reduced planar tame-envelope closure

The final reduced planar closure step should now be stated on the gauge-fixed section itself, not merely on the ungauged physical return slice.

If
$$
\Phi\in \Sigma^-_{\rho_\ast,\Pi}
$$
admits a first full-cycle return time
$$
T^\Pi(\Phi)>0
$$
to the physical radius
$$
\rho(T^\Pi(\Phi))=\rho_\ast
$$
with the same orientation branch
$$
\mathbf{e}_2\cdot \dot{\mathbf{r}}(T^\Pi(\Phi))>0,
$$
let
$$
\mathcal{R}_{\Phi}\in SO(2)
$$
be the unique rigid rotation such that
$$
\mathcal{R}_{\Phi}\mathbf{r}(T^\Pi(\Phi))=\rho_\ast \mathbf{e}_1,
\qquad
\mathbf{e}_2\cdot \mathcal{R}_{\Phi}\dot{\mathbf{r}}(T^\Pi(\Phi))>0.
$$
The reduced planar return map should therefore be defined by
$$
P^\Pi_\eta(\Phi)(\theta)
\equiv
\mathcal{R}_{\Phi}\mathbf{r}(T^\Pi(\Phi)+\theta),
\qquad
\theta\in[-h,0].
$$
This is the correct reduced return map. Without the gauge reset
$$
\mathcal{R}_{\Phi},
$$
the returned history would not land back in the fixed representative section
$$
\Sigma^-_{\rho_\ast,\Pi}.
$$

The planar envelope target should now be phrased in terms of the constants already produced by the local packages:
$$
R_{\max},
\quad
U_{\max},
\quad
A_{\max},
\quad
T_{\mathrm{cyc},\max},
\quad
N_{\mathrm{br}},
\quad
\delta_{\mathrm{sep}},
\quad
\nu_{J,\mathrm{cyc}},
\quad
\nu_{J,\mathrm{dp}},
\quad
I_{\mathrm{cau}},
\quad
\mathfrak{M}^{\Pi}_{\mathrm{in}},
\quad
\mathfrak{M}^{\Pi}_{\mathrm{out}}.
$$
The point is not to define
$$
\mathcal{K}^{\Pi}_{\rho_\ast,\eta}
$$
by naively intersecting
$$
\mathcal{C}^{\Pi}_{\rho_\ast,\eta}
$$
with all root-label predicates pointwise. That would generally destroy convexity. The correct target is the existence of one closed convex subset on which these constants imply the whole delayed-geometry package uniformly.

> **Target Proposition (Closed convex tame envelope in the reduced planar section).**
> There exists a nonempty closed convex set
> $$
> \mathcal{K}^{\Pi}_{\rho_\ast,\eta}
> \subseteq
> \mathcal{C}^{\Pi}_{\rho_\ast,\eta}
> \subseteq
> \Sigma^-_{\rho_\ast,\Pi}
> $$
> such that:
> 1. the seed-generated class
>    $$
>    \mathcal{C}^{\Pi,\mathrm{seed}}_{\rho_\ast,\eta}
>    $$
>    lies in
>    $$
>    \mathcal{K}^{\Pi}_{\rho_\ast,\eta};
>    $$
> 2. every
>    $$
>    \Phi\in \mathcal{K}^{\Pi}_{\rho_\ast,\eta}
>    $$
>    admits a unique forward continuation on
>    $$
>    [0,T_{\mathrm{cyc},\max}]
>    $$
>    with uniform position, speed, acceleration, and memory-depth bounds inside the convex envelope;
> 3. along that full cycle, the directional sorting, deep-past relocation, cone transversality, caustic-transit, and vector-recapture packages all hold with the same class constants
>    $$
>    N_{\mathrm{br}},
>    \quad
>    \delta_{\mathrm{sep}},
>    \quad
>    \nu_{J,\mathrm{cyc}},
>    \quad
>    \nu_{J,\mathrm{dp}},
>    \quad
>    I_{\mathrm{cau}},
>    \quad
>    \mathfrak{M}^{\Pi}_{\mathrm{in}},
>    \quad
>    \mathfrak{M}^{\Pi}_{\mathrm{out}};
>    $$
> 4. the first full-cycle return time
>    $$
>    T^\Pi(\Phi)
>    $$
>    is uniformly transverse on the physical return circle, and the rotated return
>    $$
>    P^\Pi_\eta(\Phi)
>    $$
>    satisfies the same section anchoring and orientation constraints that define
>    $$
>    \Sigma^-_{\rho_\ast,\Pi}.
>    $$

This proposition is the reduced planar analogue of the 1D envelope-construction target. Its role is to place the entire cycle geometry on one domain before asking for a self-map theorem.

> **Target Theorem (Reduced planar invariant-envelope closure).**
> Assume the closed convex tame envelope proposition and suppose, in addition, that:
> 1. the rotated returned histories satisfy the same convex envelope bounds
>    $$
>    \|\Phi(\theta)-\rho_\ast \mathbf{e}_1\|\le R_{\max},
>    \qquad
>    \|\dot\Phi(\theta)\|\le U_{\max},
>    \qquad
>    \operatorname{Lip}(\dot\Phi)\le A_{\max};
>    $$
> 2. the returned branch family preserves the same sector labels, branch-count bound, and separation margin;
> 3. the returned histories preserve the same Jacobian floors
>    $$
>    \nu_{J,\mathrm{cyc}},
>    \qquad
>    \nu_{J,\mathrm{dp}};
>    $$
> 4. the returned inner and outer recapture windows satisfy the same strict planar margins
>    $$
>    \mathfrak{M}^{\Pi}_{\mathrm{in}}>0,
>    \qquad
>    \mathfrak{M}^{\Pi}_{\mathrm{out}}>0.
>    $$
>
> Then
> $$
> P^\Pi_\eta\!\big(\mathcal{K}^{\Pi}_{\rho_\ast,\eta}\big)
> \subseteq
> \mathcal{K}^{\Pi}_{\rho_\ast,\eta}.
> $$

This is the self-map statement the entire bridge has been building toward. It says that after one full physical excursion and one gauge reset back to the reduced section, no envelope constant is lost.

> **Target Proposition (Continuity and precompactness of the reduced planar return map).**
> On
> $$
> \mathcal{K}^{\Pi}_{\rho_\ast,\eta},
> $$
> the map
> $$
> P^\Pi_\eta:\mathcal{K}^{\Pi}_{\rho_\ast,\eta}\to \mathcal{K}^{\Pi}_{\rho_\ast,\eta}
> $$
> is continuous in the
> $$
> C^1([-h,0];\Pi)
> $$
> topology, and its image is precompact.

The argument should parallel the 1D continuity step, but with one additional ingredient: continuity of the gauge-reset rotation
$$
\mathcal{R}_{\Phi}
$$
with respect to the returned section data. Once the return time, returned position, and returned velocity vary continuously and transversely, the rotation back to
$$
\rho_\ast \mathbf{e}_1
$$
also varies continuously.

> **Target Theorem (Reduced planar Schauder capstone).**
> Assume:
> 1. the closed convex tame envelope proposition in the reduced planar section;
> 2. the reduced planar invariant-envelope closure theorem;
> 3. the continuity and precompactness proposition for
>    $$
>    P^\Pi_\eta
>    $$
>    on
>    $$
>    \mathcal{K}^{\Pi}_{\rho_\ast,\eta};
>    $$
> 4. and the nonempty seed-generated class
>    $$
>    \mathcal{C}^{\Pi,\mathrm{seed}}_{\rho_\ast,\eta}\neq \varnothing.
>    $$
>
> Then there exists
> $$
> \Phi^\ast_\eta
> \in
> \mathcal{K}^{\Pi}_{\rho_\ast,\eta}
> $$
> such that
> $$
> P^\Pi_\eta(\Phi^\ast_\eta)=\Phi^\ast_\eta.
> $$
> The corresponding reduced planar trajectory is a bounded periodic solution of the dual-mollified master equation within the reflection-symmetric planar binary regime.

This is the honest endpoint of the current bridge note. It is still conditional, but it is now conditional on one sharply identified reduced planar closure problem rather than on a diffuse collection of unresolved local lemmas.

## Precise Failure Alternative for the Planar Bridge

If the planar bridge fails, the failure should be recorded as a theorem-level obstruction rather than as a vague expression of difficulty. The meaningful obstruction alternatives are:

1. no rotationally reduced affine section produces a nonempty convex section envelope
   $$
   \mathcal{C}^{\Pi}_{\rho_\ast,\eta}
   $$
   together with a well-defined gauge-reset return map
   $$
   P^\Pi_\eta;
   $$
2. every candidate directional sorting or cone-transversality package loses a positive Jacobian floor, either on the full controlled cycle
   $$
   \nu_{J,\mathrm{cyc}}\le 0
   $$
   or on the relocated deep-past branches
   $$
   \nu_{J,\mathrm{dp}}\le 1,
   $$
   so branch persistence cannot be maintained;
3. every candidate tame class loses one of the delayed-geometry controls needed for one common return domain: bounded branch count
   $$
   N_{\mathrm{br}},
   $$
   branch separation
   $$
   \delta_{\mathrm{sep}},
   $$
   or bounded caustic impulse
   $$
   I_{\mathrm{cau}}<\infty;
   $$
4. every candidate inner or outer comparison window satisfies
   $$
   \mathfrak{M}^{\Pi}_{\mathrm{in}}\le 0
   \qquad
   \text{or}
   \qquad
   \mathfrak{M}^{\Pi}_{\mathrm{out}}\le 0,
   $$
   so partner attraction cannot beat self-drive plus centrifugal leakage on the reduced planar windows;
5. the rotated full-cycle return fails to preserve the same section anchoring, envelope bounds, or tame constants, so that
   $$
   P^\Pi_\eta\!\big(\mathcal{K}^{\Pi}_{\rho_\ast,\eta}\big)
   \nsubseteq
   \mathcal{K}^{\Pi}_{\rho_\ast,\eta};
   $$
6. or the reduced return map fails to be continuous or precompact on the same closed convex domain, so the Schauder capstone has no legitimate domain of application.

Any one of these constitutes a precise statement that the frozen 1D scaffold does not transport to the reflection-symmetric planar binary without an additional invariant, symmetry, or coercive mechanism. That is the obstruction that should be written down if the planar program breaks.

## Beyond the Reduced Planar Bridge

The next genuinely new 2D regime would not yet be the full many-body master equation. It would already arise if one dropped the reflection-symmetric binary reduction while staying in a single plane. Even that smaller step introduces new burdens that are absent from the present bridge.

First, the section and gauge problem becomes genuinely multicomponent. The present note fixes one relative planar degree of freedom and resets the return by a single rotation back to
$$
\rho_\ast \mathbf{e}_1.
$$
In a less constrained planar regime, the return section would have to be posed on a higher-dimensional shape space modulo rigid Euclidean symmetries, and the gauge reset would no longer be a one-angle correction.

Second, the delayed-root topology ceases to be a single sector-labeled branch family over one relative chord geometry. One should expect a finite branch graph rather than one labeled list: several inequivalent source-receiver chord types, several sector atlases, and potentially competing branch births on the same window.

Third, the deep-past relocation mechanism would need a new replacement. In the reduced planar bridge, remote late-apocenter self roots are pushed back into one pre-crossing inbound cone family. Without that reduction, there may be no single inbound cone or even one distinguished pre-crossing leg. A more general 2D regime would therefore need either a global provenance graph for delayed branches or a new topological exclusion theorem.

Fourth, the escape geometry is no longer exhausted by the scalar leakage term
$$
\rho\dot\vartheta^2.
$$
That term is the correct planar correction for one relative polar degree of freedom. A less constrained 2D regime would require a genuinely multi-channel escape estimate, with several tangential or shear-like directions that can steal coercivity from the radial comparison argument.

Fifth, the tame-envelope problem itself becomes harder. The reduced planar note asks for one closed convex tame domain in a fixed
$$
C^1([-h,0];\Pi)
$$
chart. Beyond that regime, even the correct Banach chart and the right convex section envelope may become part of the theorem burden rather than fixed background data.

For that reason, the present chapter should be read as the first 2D bridge, not as the general planar theorem program. Only after these additional burdens are isolated and given their own theorem targets would it be honest to say that the work has moved beyond the reduced planar bridge.

### First unreduced planar theorem targets

The next honest regime should still remain modest: a planar binary without the reflection-symmetric return reduction, but also without yet opening the full many-body master equation. Even there, the bridge should be restarted with a new theorem ladder rather than by informal analogy with the reduced planar case.

Write
$$
\mathcal{Q}^{\sharp}_{\mathrm{pl}}
\equiv
\mathcal{Q}_{\mathrm{pl}}/SE(2)
$$
for the planar shape quotient after rigid Euclidean symmetries are removed. The first unreduced planar bridge should then be organized around the following targets.

1. A section-and-gauge package on
   $$
   C^1([-h,0];(\mathbb{R}^2)^2)
   $$
   represented in the quotient chart
   $$
   \mathcal{Q}^{\sharp}_{\mathrm{pl}},
   $$
   with one codimension-one return condition and one explicit gauge selector that chooses a canonical representative of each returned history. In the reduced planar bridge the gauge reset is one rotation angle. Here the theorem target must identify the correct quotient chart and prove that the returned history depends continuously on that gauge choice.
2. A finite branch-graph package for the active delayed roots. Instead of one sector-labeled family of self and partner branches, one should expect a finite graph
   $$
   \mathscr{G}^{\sharp}_{\mathrm{br}}
   $$
   whose vertices encode source-receiver chord types and whose edges encode admissible fold births, fold deaths, or branch handoffs between windows. The replacement theorem must bound that graph uniformly and exclude uncontrolled simultaneous fold accumulation.
3. A provenance or exclusion package for deep-past roots. The reduced planar argument pushes late self roots into one pre-crossing inbound cone family. The unreduced planar target should instead prove that every remote active root either relocates into a finite provenance class on the earlier branch graph or is excluded by a topological obstruction principle. Without such a theorem there is no honest replacement for deep-past relocation.
4. A multi-channel recapture package. The reduced planar comparison law pays one scalar leakage term
   $$
   \rho\dot\vartheta^2.
   $$
   In the unreduced planar regime the replacement must control several escape channels at once: rotational, tangential, and shear-like components in the quotient dynamics. The correct theorem target is therefore not one scalar inequality, but a coercive inward comparison that dominates every nonradial leakage channel on the chosen inner and outer windows.
5. A new closure package on one quotient-space convex envelope
   $$
   \mathcal{C}^{\sharp}_{\rho_\ast,\eta}
   $$
   and one closed convex tame envelope
   $$
   \mathcal{K}^{\sharp}_{\rho_\ast,\eta}
   \subseteq
   \mathcal{C}^{\sharp}_{\rho_\ast,\eta}.
   $$
   The returned histories must land back in the same gauge-fixed quotient section, preserve the branch-graph, provenance, leakage, and recapture constants, and define a continuous precompact self-map on that same domain.

#### Section-and-gauge target for the first unreduced planar binary

The first step in that ladder should be made fully explicit. For a labeled planar binary write
$$
\mathbf{Y}(t)
\equiv
(\mathbf{x}_1(t),\mathbf{x}_2(t))
\in
(\mathbb{R}^2)^2,
$$
and decompose the instantaneous configuration into midpoint and chord variables
$$
\mathbf{m}(t)
\equiv
\frac{\mathbf{x}_1(t)+\mathbf{x}_2(t)}{2},
\qquad
\mathbf{q}(t)
\equiv
\mathbf{x}_2(t)-\mathbf{x}_1(t).
$$
This is the reason the unreduced planar binary is the correct next regime. The quotient by translations is still explicit through
$$
\mathbf{m},
$$
and the quotient by rotations is still explicit through the present chord
$$
\mathbf{q}(0),
$$
even though the dynamics no longer collapse to one reflection-symmetric relative trajectory.

Fix a return radius
$$
\rho_\ast>0.
$$
The raw inbound section should be posed on full binary histories by
$$
\Sigma^{-,\sharp}_{\rho_\ast}
\equiv
\left\{
\Phi=(\Phi_1,\Phi_2)\in C^1([-h,0];(\mathbb{R}^2)^2)
\;\middle|\;
\|\mathbf{q}_{\Phi}(0)\|=\rho_\ast,
\quad
\mathbf{q}_{\Phi}(0)\cdot \dot{\mathbf{q}}_{\Phi}(0)<0
\right\},
$$
where
$$
\mathbf{q}_{\Phi}(\theta)\equiv \Phi_2(\theta)-\Phi_1(\theta).
$$
This is the physical inbound crossing condition before any quotient representative is chosen.

For
$$
\Phi\in \Sigma^{-,\sharp}_{\rho_\ast},
$$
let
$$
\mathbf{a}_{\Phi}\equiv \mathbf{m}_{\Phi}(0),
\qquad
\mathbf{m}_{\Phi}(\theta)\equiv \frac{\Phi_1(\theta)+\Phi_2(\theta)}{2},
$$
and let
$$
\mathcal{R}_{\Phi}\in SO(2)
$$
be the unique rotation such that
$$
\mathcal{R}_{\Phi}\mathbf{q}_{\Phi}(0)=\rho_\ast \mathbf{e}_1.
$$
Define the gauge selector by
$$
\mathfrak{G}_{\rho_\ast}(\Phi)(\theta)
\equiv
\left(
\mathcal{R}_{\Phi}\big(\Phi_1(\theta)-\mathbf{a}_{\Phi}\big),
\mathcal{R}_{\Phi}\big(\Phi_2(\theta)-\mathbf{a}_{\Phi}\big)
\right),
\qquad
\theta\in[-h,0].
$$
The corresponding gauge-fixed section is
$$
\widehat{\Sigma}^{-,\sharp}_{\rho_\ast}
\equiv
\left\{
\Psi\in C^1([-h,0];(\mathbb{R}^2)^2)
\;\middle|\;
\mathbf{m}_{\Psi}(0)=0,
\quad
\mathbf{q}_{\Psi}(0)=\rho_\ast \mathbf{e}_1,
\quad
\mathbf{e}_1\cdot \dot{\mathbf{q}}_{\Psi}(0)<0
\right\}.
$$

> **Target Proposition (Gauge-fixed inbound section for the first unreduced planar bridge).**
> There exists a nonempty class
> $$
> \mathcal{H}^{\sharp,\mathrm{sec}}_{\rho_\ast,\eta}
> \subseteq
> \Sigma^{-,\sharp}_{\rho_\ast}
> $$
> such that:
> 1. every
>    $$
>    SE(2)
>    $$
>    orbit in
>    $$
>    \mathcal{H}^{\sharp,\mathrm{sec}}_{\rho_\ast,\eta}
>    $$
>    meets the gauge-fixed section
>    $$
>    \widehat{\Sigma}^{-,\sharp}_{\rho_\ast}
>    $$
>    in exactly one history;
> 2. the selector
>    $$
>    \mathfrak{G}_{\rho_\ast}:
>    \mathcal{H}^{\sharp,\mathrm{sec}}_{\rho_\ast,\eta}
>    \to
>    \widehat{\Sigma}^{-,\sharp}_{\rho_\ast}
>    $$
>    is continuous in the
>    $$
>    C^1
>    $$
>    topology;
> 3. every
>    $$
>    \Psi\in \widehat{\Sigma}^{-,\sharp}_{\rho_\ast}
>    \cap
>    \mathfrak{G}_{\rho_\ast}\!\big(
>    \mathcal{H}^{\sharp,\mathrm{sec}}_{\rho_\ast,\eta}
>    \big)
>    $$
>    admits a first later return time
>    $$
>    T^{\sharp}(\Psi)>0
>    $$
>    to the raw section
>    $$
>    \Sigma^{-,\sharp}_{\rho_\ast}
>    $$
>    with uniform transversality
>    $$
>    \big|
>    \mathbf{q}(T^{\sharp}(\Psi))
>    \cdot
>    \dot{\mathbf{q}}(T^{\sharp}(\Psi))
>    \big|
>    \ge
>    \lambda^{\sharp}_{\mathrm{sec}}
>    >0;
>    $$
> 4. the gauge-reset return map
>    $$
>    P^{\sharp}_{\eta}(\Psi)
>    \equiv
>    \mathfrak{G}_{\rho_\ast}\!\big(
>    \mathbf{Y}_{T^{\sharp}(\Psi)}
>    \big)
>    $$
>    is therefore well defined and lands again in
>    $$
>    \widehat{\Sigma}^{-,\sharp}_{\rho_\ast}.
>    $$

This is the first unreduced-planar replacement for the reduced planar section anchoring. Its purpose is to make the quotient representative, the return section, and the gauge reset part of the theorem burden before any branch-graph or recapture package is attempted.

#### Finite branch-graph target for the unreduced planar bridge

Once the gauge-fixed section is available, the next missing object is the delayed-root replacement for the reduced planar sector-labeled branch family. In the unreduced planar binary one no longer follows a single relative chord geometry. Instead one must track several source-receiver chord types at once.

For
$$
\tau=(i\leftarrow j)\in \{1,2\}\times \{1,2\},
$$
define the corresponding delayed-root defect by
$$
G_{\tau}(t,s)
\equiv
\bigl\|
\mathbf{x}_i(t)-\mathbf{x}_j(s)
\bigr\|
-c_f(t-s),
\qquad
s<t,
$$
and let
$$
\hat{\mathbf{u}}_{\tau}(t,s)
\equiv
\frac{\mathbf{x}_i(t)-\mathbf{x}_j(s)}
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|}
$$
be the associated chord direction whenever the denominator is nonzero. The active delayed roots over one candidate cycle should be studied only after the cycle is partitioned into a finite family of windows
$$
\mathcal{W}^{\sharp}
=
\{W_1,\dots,W_{L^{\sharp}}\},
$$
chosen so that no window straddles more than one geometric event of the candidate excursion: section entry, near-crossing passage, outbound expansion, late turn, or returned entry into the section.

Fix also a finite sector atlas
$$
\mathcal{U}^{\sharp}
=
\{\mathfrak{S}^{\sharp}_1,\dots,\mathfrak{S}^{\sharp}_{M^{\sharp}}\}
$$
on
$$
S^1,
$$
with positive overlap margins removed so that every active chord direction remains a definite angular distance away from sector boundaries except inside the later caustic neighborhoods. For each type
$$
\tau,
$$
window
$$
W_{\ell},
$$
and sector
$$
\mathfrak{S}^{\sharp}_k,
$$
an active local branch should mean a simple root curve
$$
s=\beta^{\tau}_{k,\ell,m}(t),
\qquad
t\in I^{\tau}_{k,\ell,m}\subseteq W_{\ell},
$$
satisfying
$$
G_{\tau}\bigl(t,\beta^{\tau}_{k,\ell,m}(t)\bigr)=0,
\qquad
\hat{\mathbf{u}}_{\tau}\bigl(t,\beta^{\tau}_{k,\ell,m}(t)\bigr)\in \mathfrak{S}^{\sharp}_k,
$$
and
$$
\bigl|J_{\tau}\bigl(t,\beta^{\tau}_{k,\ell,m}(t)\bigr)\bigr|>0.
$$

The branch graph
$$
\mathscr{G}^{\sharp}_{\mathrm{br}}
$$
should then be defined as follows.

- A vertex is one local branch label
  $$
  v=(\tau,k,\ell,m).
  $$
- Two vertices are joined by an edge when they represent the same simple root branch continued across adjacent windows, or when they meet one admissible fold tube where a branch birth, branch death, or branch handoff occurs.

This is the correct replacement object. In the reduced planar bridge the active roots could be recorded as a finite list because one relative geometry and one sector family were enough. In the unreduced planar bridge the natural finite object is instead a graph whose vertices remember both the chord type and the local window.

> **Target Proposition (Finite active branch graph on the unreduced planar cycle).**
> There exist:
> $$
> L^{\sharp},
> \qquad
> M^{\sharp},
> \qquad
> N^{\sharp}_{\mathrm{br}},
> \qquad
> \delta^{\sharp}_{\mathrm{sep}},
> \qquad
> \nu^{\sharp}_{J},
> \qquad
> M^{\sharp}_{\mathrm{cau}},
> $$
> a cycle partition
> $$
> \mathcal{W}^{\sharp},
> $$
> a sector atlas
> $$
> \mathcal{U}^{\sharp},
> $$
> and a finite family of pairwise separated caustic tubes
> $$
> \mathfrak{T}^{\sharp}_{\mathrm{cau},1},
> \dots,
> \mathfrak{T}^{\sharp}_{\mathrm{cau},M^{\sharp}_{\mathrm{cau}}},
> $$
> such that for every gauge-fixed history
> $$
> \Psi\in
> \widehat{\Sigma}^{-,\sharp}_{\rho_\ast}
> \cap
> \mathfrak{G}_{\rho_\ast}\!\big(
> \mathcal{H}^{\sharp,\mathrm{sec}}_{\rho_\ast,\eta}
> \big)
> $$
> the active delayed roots on one full returned cycle satisfy:
> 1. every active root of every chord type
>    $$
>    \tau
>    $$
>    belongs to exactly one vertex
>    $$
>    (\tau,k,\ell,m)
>    $$
>    of a finite graph
>    $$
>    \mathscr{G}^{\sharp}_{\mathrm{br}}(\Psi),
>    $$
>    and the total number of vertices is bounded by
>    $$
>    N^{\sharp}_{\mathrm{br}};
>    $$
> 2. on every vertex domain outside the caustic tubes, the root branch is
>    $$
>    C^1
>    $$
>    in
>    $$
>    t
>    $$
>    and satisfies the uniform Jacobian lower bound
>    $$
>    \bigl|J_{\tau}\bigl(t,\beta^{\tau}_{k,\ell,m}(t)\bigr)\bigr|
>    \ge
>    \nu^{\sharp}_{J}
>    >0;
>    $$
> 3. two distinct active vertices with the same chord type
>    $$
>    \tau
>    $$
>    and the same sector label
>    $$
>    k
>    $$
>    on the same window are separated by a delay gap at least
>    $$
>    \delta^{\sharp}_{\mathrm{sep}}
>    >0;
>    $$
> 4. every edge of
>    $$
>    \mathscr{G}^{\sharp}_{\mathrm{br}}(\Psi)
>    $$
>    is of exactly one of the following kinds:
>    continuation across adjacent windows,
>    fold birth/death inside one caustic tube,
>    or one admissible branch handoff between two vertices meeting the same tube;
> 5. outside the union of the caustic tubes the graph is locally constant in
>    $$
>    t,
>    $$
>    so no uncontrolled simultaneous fold accumulation or instantaneous infinite relabeling can occur along the cycle.
>
> In particular, the active delayed-root topology of the unreduced planar binary is encoded by one finite graph rather than by an a priori continuum of chord directions.

This proposition is the unreduced-planar replacement for the reduced planar branch-count and branch-labeling package. The main difference is not merely higher notation. It is that the theorem now has to control branch continuation across several chord types and windows, not just uniqueness inside one scalar or sector-labeled family.

#### Deep-past provenance-or-exclusion target for the unreduced planar bridge

The next burden is the unreduced-planar replacement for deep-past relocation. In the reduced planar bridge, a remote late-turn self root is pushed back into one pre-crossing inbound cone. That statement is too rigid once several chord types and several window families are active. The correct replacement is weaker in form but still finite: every remote late-turn root must either trace backward to one of finitely many earlier provenance classes in the branch graph, or be excluded altogether.

Let
$$
\mathcal{W}^{\sharp}_{\mathrm{lt}}
\subseteq
\mathcal{W}^{\sharp}
$$
denote the late-turn receiver windows on which outer recapture versus escape is analyzed, and let
$$
\mathcal{W}^{\sharp}_{\mathrm{out}},
\qquad
\mathcal{W}^{\sharp}_{\mathrm{prov}}
\subseteq
\mathcal{W}^{\sharp}
$$
denote, respectively, the intermediate outbound windows and the earlier provenance windows that precede
$$
\mathcal{W}^{\sharp}_{\mathrm{lt}}
$$
in the receiver-time order of the cycle partition. A deep-past active root on a late-turn window should mean one with delay
$$
t-s\ge \tau^{\sharp}_{\mathrm{dp}}.
$$

For a vertex
$$
v=(\tau,k,\ell,m)
$$
of
$$
\mathscr{G}^{\sharp}_{\mathrm{br}}(\Psi),
$$
write
$$
S(v)
\equiv
\beta^{\tau}_{k,\ell,m}\!\bigl(I^{\tau}_{k,\ell,m}\bigr)
$$
for its source-time trace. If
$$
W_{\ell}\in \mathcal{W}^{\sharp}_{\mathrm{lt}},
$$
call
$$
v
$$
a late-turn vertex. Define the backward ancestry
$$
\operatorname{Anc}^{-}(v)
$$
to be the set of vertices reachable from
$$
v
$$
by a chain of continuation or handoff edges that never moves to a later receiver window in the cycle order. This is the graph-theoretic replacement for “going back to the inbound leg.”

The finite provenance objects should now be defined at the graph level rather than at the level of individual root times. A provenance class should mean a connected subgraph
$$
\mathfrak{P}^{\sharp}_a
\subseteq
\mathscr{G}^{\sharp}_{\mathrm{br}}(\Psi)
$$
whose vertices all lie in provenance windows
$$
W_{\ell}\in \mathcal{W}^{\sharp}_{\mathrm{prov}},
$$
share one chord type
$$
\tau
$$
and one sector label
$$
k,
$$
and have connected source traces
$$
\bigcup_{v\in \mathfrak{P}^{\sharp}_a}S(v)
$$
on which the source parameterization is simple and carries one uniform Jacobian floor
$$
\nu^{\sharp}_{J,\mathrm{dp}}>0.
$$

The unreduced-planar exclusion step must also be stated graphwise. For each chord type
$$
\tau
$$
and each sector
$$
\mathfrak{S}^{\sharp}_k
$$
that appears on a late-turn vertex, define the corresponding outbound exclusion slab
$$
\mathfrak{E}^{\sharp}_{\tau,k}
\equiv
\bigl\{
(t,s)
\,\big|\,
t\in W_{\ell},
\ s\in W_{\ell'},
\ W_{\ell}\in\mathcal{W}^{\sharp}_{\mathrm{lt}},
\ W_{\ell'}\in\mathcal{W}^{\sharp}_{\mathrm{out}},
\ \hat{\mathbf{u}}_{\tau}(t,s)\in \mathfrak{S}^{\sharp}_k
\bigr\}.
$$
The intended theorem input is that
$$
G_{\tau}
$$
has fixed nonzero sign on every such slab, so no active late-turn root can draw its source from the intermediate outbound block.

> **Target Proposition (Deep-past provenance or exclusion on the unreduced planar branch graph).**
> Assume the finite active branch-graph proposition and suppose, in addition, that:
> 1. for every late-turn type-sector pair
>    $$
>    (\tau,k),
>    $$
>    the defect
>    $$
>    G_{\tau}
>    $$
>    has fixed nonzero sign on the outbound exclusion slab
>    $$
>    \mathfrak{E}^{\sharp}_{\tau,k},
>    $$
>    so no active root with receiver in
>    $$
>    \mathcal{W}^{\sharp}_{\mathrm{lt}}
>    $$
>    can have source in
>    $$
>    \mathcal{W}^{\sharp}_{\mathrm{out}};
>    $$
> 2. there exists a finite family of provenance classes
>    $$
>    \mathfrak{P}^{\sharp}_1,
>    \dots,
>    \mathfrak{P}^{\sharp}_{P^{\sharp}_{\mathrm{prov}}}
>    $$
>    with the connected-source and Jacobian-floor properties described above;
> 3. every connected component of
>    $$
>    \mathscr{G}^{\sharp}_{\mathrm{br}}(\Psi)
>    $$
>    that meets a late-turn vertex contains at most one provenance class;
> 4. any backward ancestry chain from a late-turn vertex that avoids all provenance classes must remain trapped in the union of late-turn vertices and caustic tubes, and such a trapped component is forbidden by the branch graph parity rule for fold births and deaths.
>
> Then every deep-past active root on a late-turn window is either absent or belongs to a late-turn vertex
> $$
> v
> $$
> whose backward ancestry
> $$
> \operatorname{Anc}^{-}(v)
> $$
> meets exactly one provenance class
> $$
> \mathfrak{P}^{\sharp}_a.
> $$
> In particular, the total family of deep-past late-turn roots is controlled by the finite provenance count
> $$
> P^{\sharp}_{\mathrm{prov}}.
> $$

This is the correct unreduced-planar replacement for deep-past relocation. A remote root is no longer forced onto one literal inbound cone. Instead it is forced into one finite earlier provenance class of the branch graph, and the only alternative is a precise obstruction: a trapped late-turn component unsupported by any earlier provenance source.

> **Target Corollary (Deep-past suppression from finite provenance classes).**
> Assume the deep-past provenance-or-exclusion proposition. Then on every late-turn receiver window one has the uniform bound
> $$
> \bigl\|
> \mathbf{a}^{\sharp,\mathrm{deep}}(t)
> \bigr\|
> \le
> \frac{
> P^{\sharp}_{\mathrm{prov}}
> \kappa\epsilon^2
> }{
> \bigl(c_f^2(\tau^{\sharp}_{\mathrm{dp}})^2+\epsilon_c^2\bigr)
> \nu^{\sharp}_{J,\mathrm{dp}}
> },
> $$
> for every
> $$
> t\in \bigcup_{W\in \mathcal{W}^{\sharp}_{\mathrm{lt}}} W,
> $$
> because each admissible provenance class contributes at most one uniformly transversal deep-past branch at the chosen delay scale.

This is the quantity the later unreduced-planar recapture package should consume. Once the remote self contribution is reduced to a finite provenance count times one branch amplitude bound, the deep-past part of self-drive is again a controlled term rather than an open-ended graph-combinatorial hazard.

#### Multi-channel recapture target for the unreduced planar bridge

The next replacement burden is the turn mechanism itself. In the reduced planar bridge the recapture inequality was written in polar form and paid the single leakage term
$$
\rho\dot\vartheta^2.
$$
That is no longer the honest object once the dynamics are organized on the unreduced quotient chart. The correct target is a coercive primary escape coordinate together with a finite family of leakage channels that measure how the remaining quotient modes steal inward control.

Choose a gauge-fixed quotient neighborhood
$$
\mathscr{U}^{\sharp}_{\mathrm{turn}}
\subseteq
C^1([-h,0];\mathcal{Q}^{\sharp}_{\mathrm{pl}})
$$
that contains the relevant post-crossing and late-turn windows. The comparison argument should now be phrased in terms of one smooth escape observable
$$
\rho^{\sharp}(t)\ge 0
$$
and finitely many nonnegative leakage channels
$$
\Lambda^{\sharp}_1(t),
\dots,
\Lambda^{\sharp}_{Q^{\sharp}_{\mathrm{esc}}}(t).
$$
The intended meaning is:

- $\rho^{\sharp}$ measures excursion size in the primary escape direction on the quotient chart;
- each
  $$
  \Lambda^{\sharp}_{\alpha}
  $$
  measures one distinct noncoercive way in which the remaining quotient modes can feed outward motion;
- the number
  $$
  Q^{\sharp}_{\mathrm{esc}}
  $$
  should be finite on the chosen chart.

Let
$$
W^{\sharp}_{\mathrm{in,turn}}
$$
be the first post-crossing recapture window and let
$$
W^{\sharp}_{\mathrm{out,turn}}
\subseteq
\bigcup_{W\in \mathcal{W}^{\sharp}_{\mathrm{lt}}}W
$$
be the late-turn window. The quotient comparison law should then be organized as
$$
\ddot{\rho}^{\sharp}(t)
=
-A^{\sharp}_{p}(t)
+A^{\sharp}_{s,\mathrm{loc}}(t)
+A^{\sharp}_{s,\mathrm{deep}}(t)
+\sum_{\alpha=1}^{Q^{\sharp}_{\mathrm{esc}}}\Lambda^{\sharp}_{\alpha}(t),
$$
where:

- $A^{\sharp}_{p}(t)\ge 0$ is the inward partner contribution in the primary escape coordinate;
- $A^{\sharp}_{s,\mathrm{loc}}(t)\ge 0$ is the ceiling coming from non-deep active self branches on the controlled windows;
- $A^{\sharp}_{s,\mathrm{deep}}(t)\ge 0$ is the deep-past ceiling supplied by the provenance-suppression package.

> **Target Proposition (Windowwise multi-channel quotient-force split).**
> There exist nonnegative constants
> $$
> \underline A^{\sharp}_{p,\mathrm{in}},
> \qquad
> \overline A^{\sharp}_{s,\mathrm{loc,in}},
> \qquad
> \overline A^{\sharp}_{s,\mathrm{deep,in}},
> \qquad
> \Theta^{\sharp}_{\alpha,\mathrm{in}}
> \quad
> (1\le \alpha\le Q^{\sharp}_{\mathrm{esc}}),
> $$
> and
> $$
> \underline A^{\sharp}_{p,\mathrm{out}},
> \qquad
> \overline A^{\sharp}_{s,\mathrm{loc,out}},
> \qquad
> \overline A^{\sharp}_{s,\mathrm{deep,out}},
> \qquad
> \Theta^{\sharp}_{\alpha,\mathrm{out}}
> \quad
> (1\le \alpha\le Q^{\sharp}_{\mathrm{esc}})
> $$
> such that on
> $$
> W^{\sharp}_{\mathrm{in,turn}}
> $$
> one has
> $$
> A^{\sharp}_{p}(t)\ge \underline A^{\sharp}_{p,\mathrm{in}},
> \qquad
> A^{\sharp}_{s,\mathrm{loc}}(t)\le \overline A^{\sharp}_{s,\mathrm{loc,in}},
> \qquad
> A^{\sharp}_{s,\mathrm{deep}}(t)\le \overline A^{\sharp}_{s,\mathrm{deep,in}},
> \qquad
> \Lambda^{\sharp}_{\alpha}(t)\le \Theta^{\sharp}_{\alpha,\mathrm{in}},
> $$
> for every
> $$
> \alpha,
> $$
> and on
> $$
> W^{\sharp}_{\mathrm{out,turn}}
> $$
> one has
> $$
> A^{\sharp}_{p}(t)\ge \underline A^{\sharp}_{p,\mathrm{out}},
> \qquad
> A^{\sharp}_{s,\mathrm{loc}}(t)\le \overline A^{\sharp}_{s,\mathrm{loc,out}},
> \qquad
> A^{\sharp}_{s,\mathrm{deep}}(t)\le \overline A^{\sharp}_{s,\mathrm{deep,out}},
> \qquad
> \Lambda^{\sharp}_{\alpha}(t)\le \Theta^{\sharp}_{\alpha,\mathrm{out}},
> $$
> for every
> $$
> \alpha.
> $$

Define the unreduced-planar recapture margins
$$
\mathfrak{M}^{\sharp}_{\mathrm{in}}
\equiv
\underline A^{\sharp}_{p,\mathrm{in}}
-\overline A^{\sharp}_{s,\mathrm{loc,in}}
-\overline A^{\sharp}_{s,\mathrm{deep,in}}
-\sum_{\alpha=1}^{Q^{\sharp}_{\mathrm{esc}}}\Theta^{\sharp}_{\alpha,\mathrm{in}},
$$
$$
\mathfrak{M}^{\sharp}_{\mathrm{out}}
\equiv
\underline A^{\sharp}_{p,\mathrm{out}}
-\overline A^{\sharp}_{s,\mathrm{loc,out}}
-\overline A^{\sharp}_{s,\mathrm{deep,out}}
-\sum_{\alpha=1}^{Q^{\sharp}_{\mathrm{esc}}}\Theta^{\sharp}_{\alpha,\mathrm{out}}.
$$
Whenever these are positive, the primary escape observable obeys the comparison inequalities
$$
\ddot{\rho}^{\sharp}(t)\le -\mathfrak{M}^{\sharp}_{\mathrm{in}}<0
\qquad
\text{on }W^{\sharp}_{\mathrm{in,turn}},
$$
and
$$
\ddot{\rho}^{\sharp}(t)\le -\mathfrak{M}^{\sharp}_{\mathrm{out}}<0
\qquad
\text{on }W^{\sharp}_{\mathrm{out,turn}}.
$$

> **Target Theorem (Unreduced-planar multi-channel recapture criterion).**
> Assume the windowwise multi-channel quotient-force split proposition and define the initial outward escape speeds
> $$
> V^{\sharp}_{\mathrm{in},0}
> \equiv
> \dot{\rho}^{\sharp}(t^{\sharp}_{\mathrm{in}}),
> \qquad
> V^{\sharp}_{\mathrm{out},0}
> \equiv
> \dot{\rho}^{\sharp}(t^{\sharp}_{\mathrm{out}}),
> $$
> at the entrance times of
> $$
> W^{\sharp}_{\mathrm{in,turn}}
> \qquad
> \text{and}
> \qquad
> W^{\sharp}_{\mathrm{out,turn}}.
> $$
> If
> $$
> \mathfrak{M}^{\sharp}_{\mathrm{in}}>0,
> \qquad
> |W^{\sharp}_{\mathrm{in,turn}}|
> \ge
> \frac{V^{\sharp}_{\mathrm{in},0}}{\mathfrak{M}^{\sharp}_{\mathrm{in}}},
> $$
> then the primary escape speed reaches zero on or before the end of
> $$
> W^{\sharp}_{\mathrm{in,turn}}.
> $$
> If, in addition,
> $$
> \mathfrak{M}^{\sharp}_{\mathrm{out}}>0,
> \qquad
> |W^{\sharp}_{\mathrm{out,turn}}|
> \ge
> \frac{V^{\sharp}_{\mathrm{out},0}}{\mathfrak{M}^{\sharp}_{\mathrm{out}}},
> $$
> then the late-turn outward escape speed also reaches zero on or before the end of
> $$
> W^{\sharp}_{\mathrm{out,turn}}.
> $$
> Consequently the candidate excursion makes both the post-crossing recapture turn and the final late turn inside the controlled unreduced-planar windows.

This is the exact place where the unreduced planar bridge separates from the reduced planar one. The reduced planar note had one leakage ceiling,
$$
\rho\dot\vartheta^2.
$$
The unreduced planar bridge requires a finite leakage budget
$$
\sum_{\alpha=1}^{Q^{\sharp}_{\mathrm{esc}}}\Theta^{\sharp}_{\alpha,\bullet},
$$
because coercivity can now be lost through several quotient modes rather than through one scalar angular channel.

The dependency chain should be stated explicitly here:

1. the gauge-fixed section package supplies the chart in which
   $$
   \rho^{\sharp}
   $$
   and the leakage channels are defined;
2. the finite branch graph supplies the local active-branch ceilings that define
   $$
   \overline A^{\sharp}_{s,\mathrm{loc,in}}
   \quad
   \text{and}
   \quad
   \overline A^{\sharp}_{s,\mathrm{loc,out}};
   $$
3. the provenance-or-exclusion package supplies
   $$
   \overline A^{\sharp}_{s,\mathrm{deep,in}}
   \quad
   \text{and}
   \quad
   \overline A^{\sharp}_{s,\mathrm{deep,out}};
   $$
4. the remaining new burden is to prove that all quotient leakage channels admit finite ceilings
   $$
   \Theta^{\sharp}_{\alpha,\mathrm{in}},
   \qquad
   \Theta^{\sharp}_{\alpha,\mathrm{out}},
   $$
   on the same windows.

#### Why the unreduced planar object is still called a breather

The word **breather** does not mean that the motion remains one-dimensional. It means that one controlled size or escape observable repeatedly contracts and expands while the full delayed trajectory stays bounded and returns to a section. In the reduced planar bridge that observable was the relative radius
$$
\rho(t).
$$
In the unreduced planar bridge it is the quotient escape coordinate
$$
\rho^{\sharp}(t).
$$

So the intended dynamical picture is still a breathing one:

- an inbound contraction toward the near-crossing regime;
- entry into the self-hit-capable or even super-field-speed regime, where active delayed self branches and caustic tubes can appear;
- a post-crossing outward excursion;
- a controlled recapture turn;
- a later outward excursion;
- and a final late turn that sends the trajectory back toward the return section.

What is being claimed is therefore a **turnaround**, not a hard elastic bounce. The theorem targets do not say that the architrinos strike a wall and reverse instantaneously. They say that after the super-field-speed episode has activated the relevant delayed geometry, the outward escape observable still reaches zero on controlled windows and changes sign again under the net inward delayed force balance. In that sense the configuration “breathes”: it expands, fails to escape, contracts again, and repeats.

Super-field-speed motion is therefore not the endpoint of the story. It is the regime in which self-hit branches are born and the causal geometry becomes singular enough to require caustic control. The breather claim is precisely that these episodes can be integrated through without converting the trajectory into scattering. Instead they feed a later recapture-and-return mechanism.

#### Unreduced-planar tame-envelope and closure targets

The remaining bridge step is now the same structural one that appeared in the 1D and reduced planar programs: place the entire cycle on one closed convex tame self-map domain.

The unreduced-planar envelope should be phrased in terms of the constants already produced by the local packages:
$$
R^{\sharp}_{\max},
\quad
U^{\sharp}_{\max},
\quad
A^{\sharp}_{\max},
\quad
T^{\sharp}_{\mathrm{cyc},\max},
\quad
N^{\sharp}_{\mathrm{br}},
\quad
\delta^{\sharp}_{\mathrm{sep}},
\quad
\nu^{\sharp}_{J},
\quad
\nu^{\sharp}_{J,\mathrm{dp}},
\quad
P^{\sharp}_{\mathrm{prov}},
\quad
Q^{\sharp}_{\mathrm{esc}},
\quad
\mathfrak{M}^{\sharp}_{\mathrm{in}},
\quad
\mathfrak{M}^{\sharp}_{\mathrm{out}}.
$$
The point is again not to define the tame class by pointwise intersection of every branch-graph or provenance predicate. That would generally fail to preserve convexity. The correct theorem target is one closed convex subset on which all of those constants hold uniformly.

Write
$$
\mathcal{C}^{\sharp}_{\rho_\ast,\eta}
\subseteq
\widehat{\Sigma}^{-,\sharp}_{\rho_\ast}
$$
for the unreduced-planar convex section envelope in the gauge-fixed chart and
$$
\mathcal{K}^{\sharp}_{\rho_\ast,\eta}
\subseteq
\mathcal{C}^{\sharp}_{\rho_\ast,\eta}
$$
for the desired closed convex tame envelope.

> **Target Proposition (Closed convex tame envelope in the unreduced planar section).**
> There exists a nonempty closed convex set
> $$
> \mathcal{K}^{\sharp}_{\rho_\ast,\eta}
> \subseteq
> \mathcal{C}^{\sharp}_{\rho_\ast,\eta}
> \subseteq
> \widehat{\Sigma}^{-,\sharp}_{\rho_\ast}
> $$
> such that:
> 1. a nonempty propagated gauge-fixed class
>    $$
>    \mathcal{C}^{\sharp,\mathrm{prop}}_{\rho_\ast,\eta}
>    $$
>    lies in
>    $$
>    \mathcal{K}^{\sharp}_{\rho_\ast,\eta};
>    $$
> 2. every
>    $$
>    \Psi\in \mathcal{K}^{\sharp}_{\rho_\ast,\eta}
>    $$
>    admits a unique forward continuation on
>    $$
>    [0,T^{\sharp}_{\mathrm{cyc},\max}]
>    $$
>    with uniform quotient-chart position, speed, acceleration, and memory-depth bounds inside the convex envelope;
> 3. along that full cycle, the gauge-fixed section, finite branch graph, deep-past provenance-or-exclusion, and multi-channel recapture packages all hold with the same class constants
>    $$
>    N^{\sharp}_{\mathrm{br}},
>    \quad
>    \delta^{\sharp}_{\mathrm{sep}},
>    \quad
>    \nu^{\sharp}_{J},
>    \quad
>    \nu^{\sharp}_{J,\mathrm{dp}},
>    \quad
>    P^{\sharp}_{\mathrm{prov}},
>    \quad
>    Q^{\sharp}_{\mathrm{esc}},
>    \quad
>    \mathfrak{M}^{\sharp}_{\mathrm{in}},
>    \quad
>    \mathfrak{M}^{\sharp}_{\mathrm{out}};
>    $$
> 4. the first full-cycle return time
>    $$
>    T^{\sharp}(\Psi)
>    $$
>    is uniformly transverse on the raw section, and the gauge-reset return
>    $$
>    P^{\sharp}_{\eta}(\Psi)
>    $$
>    satisfies the same gauge-fixed section anchoring that defines
>    $$
>    \widehat{\Sigma}^{-,\sharp}_{\rho_\ast}.
>    $$

This is the unreduced-planar analogue of the earlier envelope-construction targets. Its role is to put the entire quotient-space cycle geometry on one domain before asking for a self-map theorem.

> **Target Theorem (Unreduced-planar invariant-envelope closure).**
> Assume the closed convex tame envelope proposition and suppose, in addition, that:
> 1. the returned gauge-fixed histories satisfy the same convex envelope bounds
>    $$
>    \|\Psi(\theta)\|_{(\mathbb{R}^2)^2}\le R^{\sharp}_{\max},
>    \qquad
>    \|\dot{\Psi}(\theta)\|_{(\mathbb{R}^2)^2}\le U^{\sharp}_{\max},
>    \qquad
>    \operatorname{Lip}(\dot{\Psi})\le A^{\sharp}_{\max};
>    $$
> 2. the returned active delayed-root topology preserves the same branch-graph bound, separation margin, provenance count, and leakage-channel count
>    $$
>    N^{\sharp}_{\mathrm{br}},
>    \qquad
>    \delta^{\sharp}_{\mathrm{sep}},
>    \qquad
>    P^{\sharp}_{\mathrm{prov}},
>    \qquad
>    Q^{\sharp}_{\mathrm{esc}};
>    $$
> 3. the returned histories preserve the same Jacobian floors
>    $$
>    \nu^{\sharp}_{J},
>    \qquad
>    \nu^{\sharp}_{J,\mathrm{dp}};
>    $$
> 4. the returned post-crossing and late-turn windows satisfy the same strict recapture margins
>    $$
>    \mathfrak{M}^{\sharp}_{\mathrm{in}}>0,
>    \qquad
>    \mathfrak{M}^{\sharp}_{\mathrm{out}}>0.
>    $$
>
> Then
> $$
> P^{\sharp}_{\eta}\!\big(
> \mathcal{K}^{\sharp}_{\rho_\ast,\eta}
> \big)
> \subseteq
> \mathcal{K}^{\sharp}_{\rho_\ast,\eta}.
> $$

This is the self-map statement the unreduced-planar bridge is aiming at. It says that after one full physical excursion and one quotient gauge reset, no branch-graph, provenance, leakage, or recapture constant is lost.

> **Target Proposition (Continuity and precompactness of the unreduced-planar return map).**
> On
> $$
> \mathcal{K}^{\sharp}_{\rho_\ast,\eta},
> $$
> the map
> $$
> P^{\sharp}_{\eta}:
> \mathcal{K}^{\sharp}_{\rho_\ast,\eta}
> \to
> \mathcal{K}^{\sharp}_{\rho_\ast,\eta}
> $$
> is continuous in the
> $$
> C^1([-h,0];\mathcal{Q}^{\sharp}_{\mathrm{pl}})
> $$
> topology, and its image is precompact.

The extra burden beyond the reduced planar case is that continuity must now absorb the quotient gauge selector together with the returned branch graph. So the proof target is continuity not only of return time and returned history, but also of the canonical representative and the finite graph data used to define the tame class.

> **Target Theorem (Unreduced-planar Schauder capstone).**
> Assume:
> 1. the closed convex tame envelope proposition in the unreduced planar section;
> 2. the unreduced-planar invariant-envelope closure theorem;
> 3. the continuity and precompactness proposition for
>    $$
>    P^{\sharp}_{\eta}
>    $$
>    on
>    $$
>    \mathcal{K}^{\sharp}_{\rho_\ast,\eta};
>    $$
> 4. and the nonempty propagated gauge-fixed class
>    $$
>    \mathcal{C}^{\sharp,\mathrm{prop}}_{\rho_\ast,\eta}\neq \varnothing.
>    $$
>
> Then there exists
> $$
> \Psi^\ast_{\eta}
> \in
> \mathcal{K}^{\sharp}_{\rho_\ast,\eta}
> $$
> such that
> $$
> P^{\sharp}_{\eta}(\Psi^\ast_{\eta})=\Psi^\ast_{\eta}.
> $$
> The corresponding gauge-fixed trajectory is a bounded periodic solution modulo the chosen
> $$
> SE(2)
> $$
> gauge, and therefore a genuine unreduced-planar breather of the dual-mollified master equation in the first non-reflection-symmetric binary regime.

The unreduced-planar bridge can therefore now be read as one explicit ladder:
gauge-fixed section and return map
$$
\longrightarrow
$$
finite active branch graph
$$
\longrightarrow
$$
deep-past provenance or exclusion
$$
\longrightarrow
$$
multi-channel recapture
$$
\longrightarrow
$$
closed convex tame envelope and self-map
$$
\longrightarrow
$$
Schauder closure.
This is the precise resumable order of proof burden for the first non-reflection-symmetric planar binary.

If the unreduced-planar bridge fails, the failure should now be recorded in closure-stage terms rather than as a generic expression of difficulty. The meaningful obstruction alternatives are:

1. no gauge-fixed quotient section produces a nonempty convex envelope
   $$
   \mathcal{C}^{\sharp}_{\rho_\ast,\eta}
   $$
   together with a well-defined return map
   $$
   P^{\sharp}_{\eta};
   $$
2. every candidate active branch graph loses one of the finite-control bounds
   $$
   N^{\sharp}_{\mathrm{br}}<\infty,
   \qquad
   \delta^{\sharp}_{\mathrm{sep}}>0,
   \qquad
   \nu^{\sharp}_{J}>0;
   $$
3. every candidate deep-past provenance package either forces
   $$
   P^{\sharp}_{\mathrm{prov}}=\infty
   $$
   or loses the deep-past Jacobian floor
   $$
   \nu^{\sharp}_{J,\mathrm{dp}}>0,
   $$
   so the remote self contribution is no longer uniformly controlled;
4. every candidate quotient comparison law either forces
   $$
   Q^{\sharp}_{\mathrm{esc}}=\infty
   $$
   or yields nonpositive recapture margins
   $$
   \mathfrak{M}^{\sharp}_{\mathrm{in}}\le 0
   \qquad
   \text{or}
   \qquad
   \mathfrak{M}^{\sharp}_{\mathrm{out}}\le 0,
   $$
   so partner attraction cannot dominate self-drive plus the full leakage budget on the controlled windows;
5. or every closed convex tame candidate domain fails one of the closure requirements
   $$
   P^{\sharp}_{\eta}\!\big(
   \mathcal{K}^{\sharp}_{\rho_\ast,\eta}
   \big)
   \subseteq
   \mathcal{K}^{\sharp}_{\rho_\ast,\eta},
   $$
   continuity, or precompactness.

Any one of these is the honest statement that the frozen 1D scaffold and the reduced planar bridge do not yet transport to the first non-reflection-symmetric planar binary without an additional invariant, symmetry, or coercive mechanism.

## Beyond the Unreduced Planar Binary

The next genuinely many-body regime does not require an immediate jump to full spatial generality. It already appears when one allows a third active body while remaining in a single plane. So the first honest step beyond the present bridge is not yet the unrestricted master equation on arbitrary configurations. It is the first planar many-body regime in which binary-relative coordinates are no longer sufficient.

That step introduces new burdens that are absent even from the unreduced planar binary.

First, the quotient section and gauge problem becomes higher-rank. In the binary bridge, one present chord is enough to anchor orientation after translation is removed. In a planar many-body regime there is no single distinguished chord that canonically fixes the whole shape. The return section would have to be posed on a higher-dimensional quotient shape space
$$
\mathcal{Q}^{\mathrm{mb}}_{\mathrm{pl}}
\equiv
\mathcal{Q}_{N,\mathrm{pl}}/SE(2),
$$
and the gauge selector would have to control stabilizers, near-collinear degeneracies, and possible relabeling ambiguities among bodies that play symmetric roles.

Second, the delayed-root combinatorics ceases to be a finite graph over one receiver-source family. Each receiver now sees several active source families at once, and several branch events can interact through shared bodies. The natural replacement object is therefore a finite active delay hypergraph
$$
\mathscr{H}^{\mathrm{mb}}_{\mathrm{br}},
$$
not merely a graph
$$
\mathscr{G}^{\sharp}_{\mathrm{br}}.
$$
Its vertices would encode receiver index, source index, sector data, and window data, while its higher-order incidences would record coupled fold events or exchange events that cannot be represented by pairwise edges alone.

Third, provenance control becomes cluster-valued rather than branch-valued. In the unreduced planar binary, a remote late-turn root is forced into one finite provenance class of the earlier branch graph. In a many-body regime, a late remote contribution may pass through several interacting source families before it is geometrically understood. The next theorem target would therefore need a finite ancestry complex for delayed branches, together with an exclusion principle preventing indefinite migration through ever-new source clusters.

Fourth, the recapture problem ceases to be a one-observable comparison. The binary bridge can still organize the turn mechanism around one primary escape coordinate
$$
\rho^{\sharp}
$$
and a finite leakage budget. In a many-body regime there are several genuine escape channels: pair separation, cluster separation, shear between subclusters, and exchange of the body that is farthest from the current core. The next honest theorem target would therefore require a finite family of escape observables
$$
\rho^{\mathrm{mb}}_1,\dots,\rho^{\mathrm{mb}}_{K_{\mathrm{esc}}},
$$
and a coercive comparison law that dominates all open scattering channels at once, not only one preferred outward mode.

Fifth, the tame-envelope problem becomes atlas-level. It is no longer enough to preserve one branch graph, one provenance count, and one leakage count on one fixed quotient chart. The many-body closure problem must preserve the active delay hypergraph, the cluster ancestry data, the recapture margins for all escape observables, and the choice of gauge representative on one closed convex tame self-map domain, or else state precisely why no such single chart exists.

For that reason, the present chapter should still be read as a binary bridge note, even after the unreduced planar extension. Only after the many-body section, hypergraph, ancestry, multi-observable recapture, and closure targets are isolated in the same theorem-level way would it be honest to say that the breather program has moved from the binary bridge toward the full master-equation setting.

### First planar three-body bridge regime

The next concrete target should now be fixed more narrowly than the generic
$$
N\text{-body}
$$
language above. The first honest many-body bridge is best posed as a planar three-body model with one distinguished opposite-sign body and a same-sign outer pair. Up to global sign reversal, write
$$
q_1=+\epsilon,
\qquad
q_2=-\epsilon,
\qquad
q_3=+\epsilon,
$$
with all three trajectories constrained to one plane.

This is the smallest regime in which the binary-relative chart fails for structural rather than cosmetic reasons. It preserves enough symmetry to permit a clean gauge discussion, but it already introduces the genuinely new burdens that the binary bridge cannot see:

- no single present chord canonically fixes orientation;
- each receiver sees more than one source family at once;
- delayed provenance can pass through changing pair or cluster organization;
- and recapture must dominate more than one outward channel.

The theorem objective is not yet a classification of all planar three-body bounded motions. It is the first transport test for the breather architecture itself:

> **Planar-three-body bridge objective.**
> Construct a history-space return map for a charge-neutral planar three-body delayed system and isolate a nonempty closed convex tame domain on which that return map is well defined. If this succeeds, the corresponding Schauder capstone becomes the first many-body breather theorem in the master-equation stack. If it fails, the obstruction should be written down in section/gauge, hypergraph, ancestry, recapture, or atlas-closure terms.

The package ladder below is now the right place to resume work. It turns the present many-body discussion from a boundary marker into a live theorem program.

### First many-body theorem package: section and gauge fixing on planar shape space

Let
$$
\mathbf{x}(t)=\big(\mathbf{x}_1(t),\mathbf{x}_2(t),\mathbf{x}_3(t)\big)
\in
\mathcal{Q}_{3,\mathrm{pl}}
\equiv
\big(\mathbb{R}^2\big)^3\setminus\Delta_{\mathrm{coll}}
$$
denote the ordered planar three-body configuration away from collisions, where
$$
\Delta_{\mathrm{coll}}
$$
is the collision locus. Remove translations by imposing the center-of-mass condition
$$
\mathbf{x}_1+\mathbf{x}_2+\mathbf{x}_3=0.
$$
The remaining quotient by rigid planar rotations defines the reduced shape space
$$
\mathcal{Q}^{\mathrm{mb}}_{\mathrm{pl}}
\equiv
\mathcal{Q}_{3,\mathrm{pl}}/SE(2).
$$

Before fixing any gauge, the first analytic object should be the unreduced history space
$$
\widetilde{\mathcal{H}}^{\mathrm{mb}}_h
\equiv
C^1([-h,0];\mathcal{Q}_{3,\mathrm{pl}})
$$
together with the center-of-mass-compatible admissible class
$$
\widetilde{\mathcal{H}}^{\mathrm{adm},\mathrm{mb}}_h
\equiv
\left\{
\widetilde{\Phi}\in \widetilde{\mathcal{H}}^{\mathrm{mb}}_h
\;\middle|\;
\begin{array}{l}
\widetilde{\Phi}_1(\theta)+\widetilde{\Phi}_2(\theta)+\widetilde{\Phi}_3(\theta)=0
\ \text{for all }\theta\in[-h,0],
\\[0.4em]
\min_{i\neq j}\|\widetilde{\Phi}_i(\theta)-\widetilde{\Phi}_j(\theta)\|\ge d_{\min}>0,
\\[0.4em]
\big|\det(\mathbf{a}_{\widetilde{\Phi}}(0),\mathbf{b}_{\widetilde{\Phi}}(0))\big|\ge \delta_{\mathrm{col}}>0,
\\[0.4em]
\|\dot{\widetilde{\Phi}}(\theta)\|\le U_{\max}
\end{array}
\right\}.
$$
This is the space on which local existence, uniqueness, and continuous dependence should first be posed. Only after that should one quotient by rigid rotations and choose a canonical representative.

For the first three-body bridge it is useful to distinguish the opposite-sign body from the same-sign pair, but not to hard-code a full ordering beyond that role split. Accordingly, the gauge selector should be permutation-rigid only with respect to the two same-sign outer bodies.

Choose the present-time Jacobi vectors
$$
\mathbf{a}(t)\equiv \mathbf{x}_1(t)-\mathbf{x}_3(t),
\qquad
\mathbf{b}(t)\equiv \mathbf{x}_2(t)-\frac{\mathbf{x}_1(t)+\mathbf{x}_3(t)}{2}.
$$
The first vector tracks the same-sign pair separation, while the second tracks the opposite-sign body's displacement from the outer-pair midpoint. Away from the near-collinear set
$$
\mathfrak{D}_{\mathrm{col}}
\equiv
\left\{
(\mathbf{a},\mathbf{b})\;\middle|\;
\big|\det(\mathbf{a},\mathbf{b})\big|\le \delta_{\mathrm{col}}
\right\},
$$
one may impose the canonical gauge
$$
\mathbf{a}(0)=A_\ast \mathbf{e}_1,
\qquad
\mathbf{e}_2\cdot \mathbf{b}(0)>0,
\qquad
\mathbf{e}_1\cdot \dot{\mathbf{b}}(0)<0,
$$
with fixed
$$
A_\ast>0.
$$
The first condition removes rotation by anchoring the same-sign pair on the horizontal axis, the second chooses the upper-half-plane representative for the opposite-sign body, and the third picks the inbound branch across the section.

The resulting gauge-fixed history space is
$$
\mathcal{H}^{\mathrm{mb}}_h
\equiv
C^1([-h,0];\mathcal{Q}^{\mathrm{mb}}_{\mathrm{pl}}),
$$
and the raw inbound section should be written as
$$
\Sigma^{-,\mathrm{mb}}_{A_\ast}
\equiv
\left\{
\Phi\in \mathcal{H}^{\mathrm{mb}}_h
\;\middle|\;
\mathbf{a}_\Phi(0)=A_\ast \mathbf{e}_1,
\quad
\mathbf{e}_2\cdot \mathbf{b}_\Phi(0)\ge B_{\min},
\quad
\mathbf{e}_1\cdot \dot{\mathbf{b}}_\Phi(0)\le -V_{\mathrm{in}}
\right\},
$$
for fixed positive constants
$$
B_{\min},
\qquad
V_{\mathrm{in}}.
$$

This is the many-body analogue of the binary section packages: it removes time translation through a codimension-one section, removes planar rotation through a canonical representative, and keeps the same-sign pair quotient visible without pretending that the full three-body shape can be controlled by one scalar radius.

> **Target Proposition (Unreduced local well-posedness and maximal-time alternative for the planar three-body bridge).**
> For sufficiently small dual-mollification scales
> $$
> \eta>0,
> \qquad
> \epsilon_c>0,
> $$
> and admissible initial histories
> $$
> \widetilde{\Phi}\in \widetilde{\mathcal{H}}^{\mathrm{adm},\mathrm{mb}}_h,
> $$
> the dual-mollified master equation defines a unique local solution
> $$
> \widetilde{\mathbf{X}}(t)
> $$
> depending continuously on the initial history in the
> $$
> C^1
> $$
> topology.
>
> Moreover, there exists a maximal continuation time
> $$
> T_{\max}=T_{\max}(\widetilde{\Phi})\in(0,\infty]
> $$
> such that if
> $$
> T_{\max}<\infty,
> $$
> then at least one explicit control quantity must fail as
> $$
> t\uparrow T_{\max}:
> $$
> 1. a pair distance reaches the collision threshold
>    $$
>    d_{\min};
>    $$
> 2. the non-collinearity margin
>    $$
>    |\det(\mathbf{a}(t),\mathbf{b}(t))|
>    $$
>    falls to
>    $$
>    \delta_{\mathrm{col}};
>    $$
> 3. a Jacobian floor or branch-separation floor from the later hypergraph package collapses;
> 4. or the required
>    $$
>    C^1
>    $$
>    norm bound for the controlled cycle blows up.

This is the analytic entry point the later theorem ladder should consume. The bridge program should no longer speak of one-cycle continuation without speaking about distance from this explicit bad set.

> **Target Proposition (Gauge selector and sectioned chart stability for the planar three-body bridge).**
> For sufficiently small dual-mollification scales
> $$
> \eta>0,
> \qquad
> \epsilon_c>0,
> $$
> and for section constants
> $$
> A_\ast,
> \quad
> B_{\min},
> \quad
> V_{\mathrm{in}},
> \quad
> \delta_{\mathrm{col}},
> \quad
> d_{\min}
> $$
> in an admissible regime, there exists a nonempty open subset
> $$
> \mathcal{H}^{\mathrm{adm},\mathrm{mb}}_{A_\ast,\eta}
> \subseteq
> \Sigma^{-,\mathrm{mb}}_{A_\ast}
> $$
> such that:
> 1. the gauge selector is unique and continuous on
>    $$
>    \mathcal{H}^{\mathrm{adm},\mathrm{mb}}_{A_\ast,\eta};
>    $$
> 2. every history in that class comes from one unreduced admissible history
>    $$
>    \widetilde{\Phi}\in \widetilde{\mathcal{H}}^{\mathrm{adm},\mathrm{mb}}_h
>    $$
>    through the canonical gauge map;
> 3. as long as the unreduced solution stays a positive distance away from the bad set named in the maximal-time alternative, the gauge-fixed representative remains in the same chart and depends continuously on the underlying unreduced solution;
> 4. the first-return time to the same gauge-fixed inbound section is well defined whenever the later recapture packages succeed;
> 5. the only local gauge-level failure alternatives are collision approach, near-collinear gauge degeneracy, section-tangency loss, or role-exchange ambiguity of the same-sign pair.

This is the correct chart-level theorem target because all later many-body bookkeeping depends on having one honest chart in which the delayed branches can even be named, but only after unreduced local well-posedness has already been secured.

### Second many-body theorem package: quantitative branch regularity and no-accumulation

Before the active delay hypergraph can be treated as a finite object, one needs an analytic theorem ruling out Zeno-type accumulation of folds, sector crossings, or source-cluster exchanges inside one controlled cycle.

For each ordered receiver-source pair
$$
(i,j)\in\{1,2,3\}^2,
$$
including
$$
i=j,
$$
define the exact delay defect
$$
g_{ij}(t;s)
\equiv
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s).
$$
A fold event is a pair
$$
(t,s_\ast)
$$
with
$$
g_{ij}(t;s_\ast)=0,
\qquad
\partial_s g_{ij}(t;s_\ast)=0.
$$
The first analytic bridge theorem should impose one quantitative nondegeneracy regime:

- a uniform acceleration bound
  $$
  \|\ddot{\mathbf{x}}_i\|\le A_{\max};
  $$
- a uniform acceleration-Lipschitz bound
  $$
  \|\ddot{\mathbf{x}}_i(t)-\ddot{\mathbf{x}}_i(t')\|
  \le
  L_A|t-t'|;
  $$
- a strict fold curvature floor
  $$
  |\partial_s^2 g_{ij}(t;s_\ast)|\ge \gamma_{\mathrm{fold}}>0
  $$
  at every admissible fold;
- and a uniform Jacobian floor
  $$
  |\partial_s g_{ij}(t;s)|\ge \nu_J^{\mathrm{mb}}>0
  $$
  away from the explicitly listed fold tubes.

Under these hypotheses the delay defects should satisfy one explicit derivative hierarchy on the controlled cycle:
$$
|\partial_s g_{ij}(t;s)|\le C^{\mathrm{mb}}_{1,g},
\qquad
|\partial_s^2 g_{ij}(t;s)|\le C^{\mathrm{mb}}_{2,g},
\qquad
|\partial_s^3 g_{ij}(t;s)|\le C^{\mathrm{mb}}_{3,g},
$$
for constants determined only by
$$
U_{\max},
\quad
A_{\max},
\quad
L_A,
\quad
d_{\min}.
$$
The point of this hierarchy is that it makes the fold geometry quantitative rather than qualitative: once
$$
\partial_s g_{ij}=0
$$
is known to be a genuinely curved zero with bounded third derivative, the root geometry cannot oscillate arbitrarily fast nearby.

> **Target Proposition (Quantitative no-accumulation of many-body delay events).**
> Assume the unreduced local well-posedness package and suppose, in addition, that on the controlled cycle:
> 1. each defect
>    $$
>    g_{ij}(t;s)
>    $$
>    obeys the derivative hierarchy
>    $$
>    C^{\mathrm{mb}}_{1,g},
>    \qquad
>    C^{\mathrm{mb}}_{2,g},
>    \qquad
>    C^{\mathrm{mb}}_{3,g};
>    $$
> 2. every admissible fold is nondegenerate with curvature floor
>    $$
>    \gamma_{\mathrm{fold}}>0;
>    $$
> 3. away from the listed fold tubes one has the simple-branch floor
>    $$
>    |\partial_s g_{ij}(t;s)|\ge \nu_J^{\mathrm{mb}}>0.
>    $$
>
> Then there exists a strict minimum event gap
> $$
> \Delta\tau_{\mathrm{evt}}>0
> $$
> depending only on the derivative bounds and the floors
> $$
> C^{\mathrm{mb}}_{1,g},
> \qquad
> C^{\mathrm{mb}}_{2,g},
> \qquad
> C^{\mathrm{mb}}_{3,g},
> \qquad
> \gamma_{\mathrm{fold}},
> \qquad
> \nu_J^{\mathrm{mb}},
> $$
> such that:
> 1. two distinct fold events for the same receiver-source family cannot occur with source-time separation smaller than
>    $$
>    \Delta\tau_{\mathrm{evt}};
>    $$
> 2. sector-boundary crossings and admissible source-cluster exchanges are likewise separated by at least
>    $$
>    \Delta\tau_{\mathrm{evt}}
>    $$
>    along every controlled branch family;
> 3. hence no fold, relabeling, or exchange event can accumulate in finite time on the controlled cycle;
> 4. consequently the total number of admissible event hyperedges on one cycle is bounded by
>    $$
>    N^{\mathrm{mb}}_{\mathrm{edge}}
>    \le
>    \left\lceil \frac{T_{\mathrm{cyc}}}{\Delta\tau_{\mathrm{evt}}}\right\rceil
>    N^{\mathrm{mb}}_{\mathrm{fam}},
>    $$
>    where
>    $$
>    T_{\mathrm{cyc}}
>    $$
>    is the controlled cycle length and
>    $$
>    N^{\mathrm{mb}}_{\mathrm{fam}}
>    $$
>    is the finite number of receiver-source-sector families allowed by the gauge chart and directional atlas.

The intended proof route is short enough to be stated now.

1. Fix one receiver-source family
$$
(i,j)
$$
and one admissible fold
$$
(t,s_\ast).
$$
Taylor-expand
$$
\partial_s g_{ij}(t;s)
$$
about
$$
s=s_\ast.
$$
Because
$$
\partial_s g_{ij}(t;s_\ast)=0
$$
and
$$
|\partial_s^2 g_{ij}(t;s_\ast)|\ge \gamma_{\mathrm{fold}}>0,
$$
while
$$
|\partial_s^3 g_{ij}(t;s)|\le C^{\mathrm{mb}}_{3,g},
$$
the first derivative cannot return to zero until
$$
|s-s_\ast|
$$
exceeds a definite scale depending only on
$$
\gamma_{\mathrm{fold}}
\qquad
\text{and}
\qquad
C^{\mathrm{mb}}_{3,g}.
$$

2. Away from the fold tubes, the Jacobian floor
$$
|\partial_s g_{ij}(t;s)|\ge \nu_J^{\mathrm{mb}}
$$
prevents any hidden simple-root degeneracy. So branch continuation, sector crossing, and admissible source-cluster exchange can only happen at isolated events and cannot pile up between adjacent fold neighborhoods.

3. The same Taylor argument applied at sector-boundary and exchange events, together with the derivative hierarchy, yields one common lower time scale
$$
\Delta\tau_{\mathrm{evt}}>0
$$
for the full finite event alphabet.

4. Once every event consumes at least
$$
\Delta\tau_{\mathrm{evt}}
$$
of cycle order, the total number of admissible events on one cycle is bounded by the cycle length times the finite receiver-source-sector family count. That is the step that turns analytic regularity into the finite hypergraph bound.

This is the missing analytic bridge from local well-posedness to finite combinatorics. Without it, the later hypergraph package is only suggestive bookkeeping rather than a theorem-level object.

### Third many-body theorem package: bounded many-body caustic transit and fold ceilings

The no-accumulation package makes the fold geometry discrete. The next analytic burden is to show that traversing the corresponding fold tubes does not inject an uncontrolled velocity impulse into the many-body comparison channels.

This point is harmless in the binary scaffolds only because the dual-mollified caustic transit bounds were already available there. In the planar three-body regime one must now account not only for simple Type II fold tubes, but also for Type III shared-body coupled folds, where two or three active branch families involving one common body traverse controlled Jacobian collapse in one local event block.

For each principal escape channel
$$
m\in\{1,2,3,4\},
$$
let
$$
W^{\mathrm{mb}}_{\mathrm{fold}}(\mathsf{e})
$$
denote one controlled fold tube associated with an admissible Type II or Type III hyperedge
$$
\mathsf{e}\in\mathscr{E}^{\mathrm{mb}}_{\mathrm{br}}.
$$
The theorem target is that the dual-mollified branch sum contributes only a finite channelwise impulse across that tube:
$$
\left|
\int_{W^{\mathrm{mb}}_{\mathrm{fold}}(\mathsf{e})}
\Pi_m(t)\cdot
\ddot{\mathbf{X}}(t)\,dt
\right|
\le
F^{\mathrm{mb}}_{m,\mathsf{e}},
$$
where
$$
\Pi_m
$$
is the channel projection associated with
$$
\rho^{\mathrm{mb}}_m
$$
and the right-hand side depends only on the dual-mollification parameters, the fold-curvature floor, the branch-separation data, and the local multiplicity of the hyperedge.

The first many-body theorem should be stated with exactly that dependence visible.

> **Target Proposition (Bounded dual-mollified caustic transit for simple and shared-body folds).**
> Assume the unreduced local well-posedness package and the quantitative no-accumulation package. Suppose, in addition, that on every admissible fold tube:
> 1. the fold-curvature floor
>    $$
>    \gamma_{\mathrm{fold}}>0
>    $$
>    holds;
> 2. distinct active branches are separated by at least
>    $$
>    \delta^{\mathrm{mb}}_{\mathrm{sep}}>0;
>    $$
> 3. the local fold multiplicity is restricted to the admissible Type II and Type III event blocks;
> 4. and the dual-mollification parameters
>    $$
>    \eta,
>    \qquad
>    \epsilon_c
>    $$
>    lie in the same small regime as the earlier binary transit lemmas.
>
> Then for each principal channel
> $$
> m=1,2,3,4
> $$
> there exists a finite universal fold ceiling
> $$
> F^{\mathrm{mb}}_m<\infty
> $$
> such that:
> 1. every admissible Type II fold tube contributes at most
>    $$
>    F^{\mathrm{mb}}_m
>    $$
>    to the channelwise velocity impulse of
>    $$
>    \rho^{\mathrm{mb}}_m;
>    $$
> 2. every admissible Type III shared-body coupled fold block contributes at most
>    $$
>    F^{\mathrm{mb}}_m
>    $$
>    after summing all participating branch families in that block;
> 3. the corresponding post-transit velocity and acceleration remain inside the same
>    $$
>    U_{\max},
>    \qquad
>    A_{\max},
>    \qquad
>    L_A
>    $$
>    envelope up to a controlled renormalization of the constants;
> 4. therefore the fold contribution appearing in the recapture package may be absorbed into one finite channelwise ceiling
>    $$
>    L^{\mathrm{mb}}_{m,\mathrm{fold}}(t)
>    \le
>    F^{\mathrm{mb}}_m
>    $$
>    on every controlled recapture window.

The intended proof mechanism should also be written down now, because this is exactly where the planar three-body program could still fail.

1. Localize one admissible fold tube by the no-accumulation constants
$$
\Delta\tau_{\mathrm{evt}},
\qquad
\gamma_{\mathrm{fold}},
\qquad
\delta^{\mathrm{mb}}_{\mathrm{sep}}.
$$
On that tube, use the fold-curvature floor to reduce each singular branch denominator to the standard dual-mollified one-dimensional caustic transit model after a controlled change of source parameter.

2. For a Type II fold, apply the same dual-mollified transit estimate as in the earlier bridge packages, with constants tracked uniformly through the many-body Jacobian and distance floors.

3. For a Type III shared-body coupled fold, decompose the local block into finitely many simultaneously active branch families. The branch-separation floor prevents exact branch collision away from the shared fold event, and the admissible multiplicity list prevents arbitrarily high local singular rank. Hence the total impulse is bounded by a finite sum of controlled dual-mollified transit integrals.

4. Project those local impulse bounds onto the Jacobi channels
$$
\rho^{\mathrm{mb}}_1,\dots,\rho^{\mathrm{mb}}_4.
$$
This yields the finite ceilings
$$
F^{\mathrm{mb}}_m
$$
consumed later by the recapture windows and also preserves the acceleration-Lipschitz control needed by the next cycle's no-accumulation package.

This is the last missing analytic bridge between finite branch combinatorics and the concrete recapture inequalities. Without it, the fold ceilings in the principal margins remain formal placeholders.

### Fourth many-body theorem package: finite active delay hypergraph

Once the gauge-fixed section is chosen, the next burden is to replace the binary branch graph by a finite active delay hypergraph over one controlled cycle.

Fix a finite family of cycle windows
$$
\mathcal{W}^{\mathrm{mb}}
=
\left\{
W_1,\dots,W_{N_W}
\right\},
$$
chosen to separate the inbound compression stage, the crossing or near-core stage, the post-crossing recapture stage, and the late-turn stage. For each ordered receiver-source pair
$$
(i,j)\in \{1,2,3\}^2,
\qquad
i\neq j,
$$
and for the self family
$$
(i,i),
$$
let
$$
g_{ij}(t;s)
\equiv
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|-c_f(t-s)
$$
denote the exact delayed-root equation on a window
$$
W_\alpha\in\mathcal{W}^{\mathrm{mb}}.
$$
As in the reduced planar bridge, choose a fixed finite directional atlas on
$$
S^1,
$$
but now each active root must carry receiver index, source index, sector label, and window label.

Define the active delay hypergraph
$$
\mathscr{H}^{\mathrm{mb}}_{\mathrm{br}}
=
\big(
\mathscr{V}^{\mathrm{mb}}_{\mathrm{br}},
\mathscr{E}^{\mathrm{mb}}_{\mathrm{br}}
\big)
$$
as follows.

- A vertex
  $$
  \mathsf{v}=(i,j,\alpha,k,\ell)
  $$
  records one active branch family with receiver
  $$
  i,
  $$
  source
  $$
  j,
  $$
  window
  $$
  W_\alpha,
  $$
  directional sector
  $$
  \mathfrak{S}_k,
  $$
  and branch multiplicity label
  $$
  \ell.
  $$
- A hyperedge
  $$
  \mathsf{e}\in \mathscr{E}^{\mathrm{mb}}_{\mathrm{br}}
  $$
  joins a finite set of such vertices whenever the corresponding root families can meet in one coupled fold event, one sector-exchange event, or one receiver-source role-exchange event forced by the same body geometry.

The point of the hypergraph language is that in a three-body regime, several branch births can share one body and one geometric degeneracy. Pairwise edges are therefore not enough to encode the admissible local branch moves.

For the first planar-three-body bridge, the admissible hyperedges should be restricted to a finite list of local event types:

- **Type I: single-branch continuation hyperedge.**
  A one-vertex or two-vertex hyperedge recording continuation of the same simple branch family across adjacent windows with unchanged receiver, source, and sector data.
- **Type II: simple fold birth or fold death hyperedge.**
  A hyperedge supported inside one controlled fold tube for one receiver-source pair
  $$
  (i,j),
  $$
  where exactly one simple branch is created or annihilated.
- **Type III: shared-body coupled fold hyperedge.**
  A hyperedge joining two or three vertices when several branch families involving one common body meet one common degeneracy and their births or deaths must be recorded together.
- **Type IV: sector relabeling hyperedge.**
  A hyperedge recording passage of one active branch across one sector boundary of the fixed directional atlas without changing the underlying receiver-source family.
- **Type V: source-cluster exchange hyperedge.**
  A hyperedge recording one admissible cluster move from the ancestry package:
  $$
  \{i\}\leftrightarrow \{i,j\},
  \qquad
  \{i,j\}\leftrightarrow \{i\},
  \qquad
  \{i,j\}\leftrightarrow \{i,k\},
  $$
  always through one local shared-body event already visible in the delayed geometry.

No other hyperedge type should be allowed in the first bridge regime. In particular, there should be no hyperedge representing simultaneous creation of arbitrarily many fresh branches, no instantaneous jump to a source cluster outside
$$
\mathfrak{C}^{\mathrm{mb}}_{\mathrm{src}},
$$
and no event that changes receiver, source cluster, sector family, and window label all at once without passing through one of the listed local types.

> **Target Proposition (Finite active hypergraph control on the planar three-body cycle).**
> Assume the unreduced local well-posedness package, the gauge-selector package, and the quantitative no-accumulation package. On a sufficiently small section-side tame subclass of
> $$
> \mathcal{H}^{\mathrm{adm},\mathrm{mb}}_{A_\ast,\eta},
> $$
> there exist finite constants
> $$
> N^{\mathrm{mb}}_{\mathrm{vert}},
> \qquad
> N^{\mathrm{mb}}_{\mathrm{edge}},
> \qquad
> \nu^{\mathrm{mb}}_J,
> \qquad
> \delta^{\mathrm{mb}}_{\mathrm{sep}},
> \qquad
> \Delta\tau_{\mathrm{evt}}
> $$
> such that every one-cycle continuation admits an active delay hypergraph
> $$
> \mathscr{H}^{\mathrm{mb}}_{\mathrm{br}}
> $$
> with:
> 1. at most
>    $$
>    N^{\mathrm{mb}}_{\mathrm{vert}}
>    $$
>    active branch vertices and at most
>    $$
>    N^{\mathrm{mb}}_{\mathrm{edge}}
>    $$
>    admissible coupled fold hyperedges;
> 2. branch separation at least
>    $$
>    \delta^{\mathrm{mb}}_{\mathrm{sep}};
>    $$
> 3. causal Jacobian bound
>    $$
>    |J_{ij}(t;s)|\ge \nu^{\mathrm{mb}}_J
>    $$
>    away from the explicitly controlled fold tubes;
> 4. root birth, root death, sector relabeling, and source-exchange events occurring only through the listed hyperedges and separated in cycle order by at least
>    $$
>    \Delta\tau_{\mathrm{evt}};
>    $$
> 5. no uncontrolled branch proliferation outside those hypergraph-coded events.

> More concretely:
> 1. every hyperedge belongs to one of the five admissible types above;
> 2. every fold tube supports only finitely many Type II or Type III hyperedges, with multiplicity bounded by the no-accumulation event-gap constant
>    $$
>    \Delta\tau_{\mathrm{evt}};
>    $$
> 3. every sector boundary crossing supports only one Type IV relabeling event per active branch family at the chosen scale;
> 4. every source-cluster exchange belongs to one Type V hyperedge compatible with the ancestry-package move list;
> 5. hence every backward ancestry chain and every forward recapture chain passes through a finite event alphabet rather than an open-ended combinatorial explosion.

This proposition should also be read together with the smooth-window floors from the recapture package:
$$
\|\mathbf{a}\|\ge a_{\min},
\qquad
\|\mathbf{b}\|\ge b_{\min},
\qquad
|\det(\mathbf{a},\mathbf{b})|\ge \Delta_{\min},
\qquad
\delta_{\mathrm{role}}\ge \delta_{\mathrm{role},\min},
$$
whenever one asks the same active hypergraph to feed the principal recapture margins. The hypergraph theorem itself does not differentiate the observables
$$
\rho^{\mathrm{mb}}_m,
$$
but the event structure it produces must be compatible with the smooth windows on which those derivatives are later taken.

This is the many-body replacement for the binary branch graph packages. Once it is proved, later ancestry and recapture arguments can consume a finite combinatorial object rather than an open-ended moving family of delayed roots.

### Fifth many-body theorem package: cluster-valued ancestry and deep-past exclusion

The next burden is the many-body replacement for deep-past provenance. In the unreduced planar binary, every remote late-turn root was traced back to one finite provenance class on an earlier branch graph. In the planar three-body regime that is no longer the right object, because a delayed influence may pass through changing pair or cluster organization before its geometry becomes simple enough to compare.

Let
$$
\mathcal{W}^{\mathrm{mb}}_{\mathrm{lt}}
\subseteq
\mathcal{W}^{\mathrm{mb}}
$$
denote the late-turn receiver windows, and let
$$
\mathcal{W}^{\mathrm{mb}}_{\mathrm{mid}},
\qquad
\mathcal{W}^{\mathrm{mb}}_{\mathrm{prov}}
\subseteq
\mathcal{W}^{\mathrm{mb}}
$$
denote, respectively, the intermediate post-crossing windows and the earlier provenance windows that precede the late-turn block in the cycle order. A deep-past active branch on a late-turn window should mean one with delay
$$
t-s\ge \tau^{\mathrm{mb}}_{\mathrm{dp}}.
$$

For the first planar-three-body bridge, the source-cluster alphabet should be fixed as
$$
\mathfrak{C}^{\mathrm{mb}}_{\mathrm{src}}
\equiv
\Big\{
\{1\},\{2\},\{3\},\{1,3\},\{1,2\},\{2,3\}
\Big\},
$$
and only the following backward exchange moves should be admissible:

- singleton-to-pair attachment
  $$
  \{i\}\leftrightarrow \{i,j\}
  $$
  through one hypergraph-coded fold or sector exchange;
- pair-to-singleton detachment
  $$
  \{i,j\}\leftrightarrow \{i\}
  $$
  through one listed fold exit;
- pair swap
  $$
  \{i,j\}\leftrightarrow \{i,k\}
  $$
  through one shared-body exchange hyperedge.

No other source-cluster jump should be allowed in the ancestry relation.

For each late-turn hypergraph vertex
$$
\mathsf{v}_{\mathrm{late}}
\in
\mathscr{V}^{\mathrm{mb}}_{\mathrm{br}},
$$
define its backward ancestry set
$$
\operatorname{Anc}(\mathsf{v}_{\mathrm{late}})
$$
to be the sub-hypergraph reached by following admissible backward continuation through the hyperedges of
$$
\mathscr{H}^{\mathrm{mb}}_{\mathrm{br}}
$$
into earlier windows, never moving to a later receiver window in the cycle order. A cluster ancestry complex should then mean a finite family
$$
\mathfrak{A}^{\mathrm{mb}}
=
\left\{
\mathfrak{a}_1,\dots,\mathfrak{a}_{N_{\mathrm{anc}}}
\right\}
$$
of connected ancestry components, each tagged by:

- the receiver body,
- the active source cluster, meaning either a single body or an ordered pair acting as the current effective delayed source family,
- the provenance windows in which that ancestry lives,
- and the admissible exchange moves by which one source cluster can pass to another.

More concretely, each ancestry component
$$
\mathfrak{a}_m
$$
should lie entirely in provenance windows
$$
W_\alpha\in \mathcal{W}^{\mathrm{mb}}_{\mathrm{prov}},
$$
carry one fixed receiver body
$$
i_m,
$$
one fixed sector label
$$
k_m,
$$
and one connected source-cluster trace on which the relevant branch parameterizations remain simple with one common Jacobian floor
$$
\nu^{\mathrm{mb}}_{J,\mathrm{anc}}>0.
$$

The point is that a remote contribution should now be forced into one finite ancestry complex rather than into one literal earlier branch family.

> **Target Proposition (Deep-past cluster ancestry or exclusion for the planar three-body bridge).**
> Assume the gauge-fixed section package, the quantitative no-accumulation package, and the finite active delay hypergraph package. Then on a sufficiently small tame subclass, with the same event-gap and branch-regularity data
> $$
> \Delta\tau_{\mathrm{evt}},
> \qquad
> \nu^{\mathrm{mb}}_J,
> \qquad
> \delta^{\mathrm{mb}}_{\mathrm{sep}},
> $$
> there exists a finite ancestry complex
> $$
> \mathfrak{A}^{\mathrm{mb}}
> $$
> such that every late-turn active delayed branch satisfies exactly one of the following:
> 1. its backward ancestry meets one unique cluster ancestry component
>    $$
>    \mathfrak{a}_m\in\mathfrak{A}^{\mathrm{mb}};
>    $$
> 2. its backward ancestry enters a controlled fold tube or exchange tube already listed in the active hypergraph;
> 3. or it is excluded by a no-migration alternative asserting that an infinite chain of fresh source-cluster exchanges cannot occur inside the controlled cycle.

> Moreover:
> 1. each late-turn branch meets at most one ancestry component;
> 2. the total number of admissible ancestry components is bounded by
>    $$
>    N_{\mathrm{anc}};
>    $$
> 3. each ancestry component contributes at most one uniformly transversal deep-past branch per admissible source-cluster channel on the chosen delay scale;
> 4. any backward ancestry chain from a late-turn branch that avoids all ancestry components must remain trapped in the union of late-turn windows, mid windows, and controlled fold or exchange tubes, and such a trapped component is forbidden by the finite-cycle parity rule for admissible cluster exchanges;
> 5. every admissible backward cluster exchange in such a chain is separated from the next by at least
>    $$
>    \Delta\tau_{\mathrm{evt}},
>    $$
>    so no ancestry chain can hide an infinite migration process inside one controlled cycle;
> 6. therefore the full deep-past contribution on the late-turn windows is bounded by a finite ancestry count times one branch-amplitude ceiling.

This is the many-body replacement for the binary deep-past relocation theorem. A remote root is no longer pushed onto one pre-crossing leg. Instead it is forced into one finite ancestry object, and the only alternative is a precise obstruction: uncontrolled migration through ever-new source clusters.

The no-migration clause should be read sharply. Because the source-cluster alphabet
$$
\mathfrak{C}^{\mathrm{mb}}_{\mathrm{src}}
$$
is finite and the admissible exchange moves are local and hypergraph-coded, an endless backward chain would have to revisit one earlier cluster pattern without ever entering a provenance component. The intended obstruction theorem is that no such trapped exchange cycle can persist entirely inside
$$
\mathcal{W}^{\mathrm{mb}}_{\mathrm{lt}}
\cup
\mathcal{W}^{\mathrm{mb}}_{\mathrm{mid}}
$$
and the controlled fold or exchange tubes.

> **Target Corollary (Deep-past suppression from finite cluster ancestry).**
> Assume the deep-past cluster-ancestry-or-exclusion proposition. Then on every controlled late-turn window one has a uniform bound
> $$
> A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
> \le
> \frac{
> N_{\mathrm{anc}}\,\kappa\epsilon^2
> }{
> \bigl(c_f^2(\tau^{\mathrm{mb}}_{\mathrm{dp}})^2+\epsilon_c^2\bigr)
> \nu^{\mathrm{mb}}_{J,\mathrm{anc}}
> },
> $$
> for every
> $$
> t\in \bigcup_{W\in \mathcal{W}^{\mathrm{mb}}_{\mathrm{lt}}}W,
> $$
> because each admissible ancestry component contributes at most one uniformly transversal deep-past branch at the chosen delay scale and Jacobian floor.

This is the quantity the many-body recapture inequalities should consume. Once the remote self drive is reduced to a finite ancestry count times one ceiling, and once the fold contribution is reduced to the channelwise ceilings
$$
F^{\mathrm{mb}}_m
$$
from the caustic-transit package, the late-turn comparison law becomes quantitative again.

### Sixth many-body theorem package: finite escape-observable recapture law

The next replacement burden is the turn mechanism itself. In the planar three-body regime there is no single honest escape coordinate. The recapture theorem must instead dominate a finite family of outward channels at once.

Choose smooth quotient observables
$$
\rho^{\mathrm{mb}}_1,\dots,\rho^{\mathrm{mb}}_{K_{\mathrm{esc}}}
:
\mathcal{Q}^{\mathrm{mb}}_{\mathrm{pl}}
\to
[0,\infty)
$$
adapted to the Jacobi coordinates
$$
\mathbf{a}=\mathbf{x}_1-\mathbf{x}_3,
\qquad
\mathbf{b}=\mathbf{x}_2-\frac{\mathbf{x}_1+\mathbf{x}_3}{2}.
$$
For the first three-body bridge the natural concrete choice is
$$
\rho^{\mathrm{mb}}_1(\mathbf{a},\mathbf{b})\equiv \|\mathbf{a}\|,
$$
$$
\rho^{\mathrm{mb}}_2(\mathbf{a},\mathbf{b})\equiv \|\mathbf{b}\|,
$$
$$
\rho^{\mathrm{mb}}_3(\mathbf{a},\mathbf{b})\equiv
\frac{\big|\det(\mathbf{a},\mathbf{b})\big|}{\|\mathbf{a}\|+\|\mathbf{b}\|},
$$
$$
\rho^{\mathrm{mb}}_4(\mathbf{a},\mathbf{b})\equiv
\max\Big\{
\|\mathbf{x}_1\|,
\|\mathbf{x}_2\|,
\|\mathbf{x}_3\|
\Big\}
-\|\mathbf{x}_2\|.
$$

Their intended meanings are:

- $$
  \rho^{\mathrm{mb}}_1
  $$
  measures same-sign outer-pair separation;
- $$
  \rho^{\mathrm{mb}}_2
  $$
  measures separation between the opposite-sign body and the outer-pair midpoint;
- $$
  \rho^{\mathrm{mb}}_3
  $$
  measures shear or triangle-area escape, normalized to avoid pure scale inflation dominating the shape signal;
- $$
  \rho^{\mathrm{mb}}_4
  $$
  measures farthest-body exchange, vanishing when the opposite-sign body remains the distinguished core body and becoming positive when one outer body threatens to take over that role.

These are not claimed to be the only possible observables. They are the first concrete family that matches the chosen gauge and the intended failure channels.

Let
$$
I^{\mathrm{mb}}_{\mathrm{post}}
$$
and
$$
I^{\mathrm{mb}}_{\mathrm{late}}
$$
denote the post-crossing and late-turn windows, respectively. For each observable
$$
\rho^{\mathrm{mb}}_m
$$
write its one-cycle comparison law abstractly as
$$
\ddot{\rho}^{\mathrm{mb}}_m(t)
\le
-\,\Lambda^{\mathrm{mb}}_m(t)
+L^{\mathrm{mb}}_m(t)
+A^{\mathrm{mb}}_{s,\mathrm{deep}}(t),
$$
where, for each
$$
m,
$$
the comparison terms are understood channelwise:

- $$
  \Lambda^{\mathrm{mb}}_m(t)\ge 0
  $$
  is the net inward or recapturing contribution relevant to channel
  $$
  m;
  $$
- $$
  L^{\mathrm{mb}}_m(t)\ge 0
  $$
  is the leakage budget from all other channels and gauge-motion terms;
- $$
  A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
  $$
  is the deep-past ceiling supplied by the cluster-ancestry package.

To make these comparison laws honest theorem objects, the principal channels should only be differentiated on windows where the relevant denominators and branches stay uniformly away from their singular sets. Introduce the smooth-window floors
$$
\|\mathbf{a}(t)\|\ge a_{\min}>0,
\qquad
\|\mathbf{b}(t)\|\ge b_{\min}>0,
$$
$$
|\det(\mathbf{a}(t),\mathbf{b}(t))|\ge \Delta_{\min}>0
\qquad
\text{on sign-fixed shear windows,}
$$
$$
\delta_{\mathrm{role}}(t)\ge \delta_{\mathrm{role},\min}>0
\qquad
\text{on role windows.}
$$
Accordingly, the smooth recapture windows should be refined as:
$$
I^{\mathrm{mb}}_{1,\mathrm{post}}
\equiv
\left\{
t\in I^{\mathrm{mb}}_{\mathrm{post}}
\;\middle|\;
\|\mathbf{a}(t)\|\ge a_{\min}
\right\},
$$
$$
I^{\mathrm{mb}}_{1,\mathrm{late}}
\equiv
\left\{
t\in I^{\mathrm{mb}}_{\mathrm{late}}
\;\middle|\;
\|\mathbf{a}(t)\|\ge a_{\min}
\right\},
$$
$$
I^{\mathrm{mb}}_{2,\mathrm{post}}
\equiv
\left\{
t\in I^{\mathrm{mb}}_{\mathrm{post}}
\;\middle|\;
\|\mathbf{b}(t)\|\ge b_{\min}
\right\},
$$
$$
I^{\mathrm{mb}}_{2,\mathrm{late}}
\equiv
\left\{
t\in I^{\mathrm{mb}}_{\mathrm{late}}
\;\middle|\;
\|\mathbf{b}(t)\|\ge b_{\min}
\right\},
$$
$$
I^{\mathrm{mb}}_{3,\mathrm{post}}
\equiv
\left\{
t\in I^{\mathrm{mb}}_{\mathrm{post}}
\;\middle|\;
|\det(\mathbf{a}(t),\mathbf{b}(t))|\ge \Delta_{\min}
\right\},
$$
$$
I^{\mathrm{mb}}_{3,\mathrm{late}}
\equiv
\left\{
t\in I^{\mathrm{mb}}_{\mathrm{late}}
\;\middle|\;
|\det(\mathbf{a}(t),\mathbf{b}(t))|\ge \Delta_{\min}
\right\},
$$
$$
I^{\mathrm{mb}}_{4,\mathrm{post}}
\equiv
\left\{
t\in I^{\mathrm{mb}}_{\mathrm{post}}
\;\middle|\;
\delta_{\mathrm{role}}(t)\ge \delta_{\mathrm{role},\min}
\right\},
$$
$$
I^{\mathrm{mb}}_{4,\mathrm{late}}
\equiv
\left\{
t\in I^{\mathrm{mb}}_{\mathrm{late}}
\;\middle|\;
\delta_{\mathrm{role}}(t)\ge \delta_{\mathrm{role},\min}
\right\}.
$$

If one of these floors collapses, that should not be hidden inside the recapture inequalities. It is a separate named event: pair-collapse, midpoint-collapse, shear-sign switching, or role-tie loss. The principal channel theorems should therefore be read only on the corresponding smooth windows above.

For the first three-body bridge these terms should be read concretely as follows:

- for
  $$
  \rho^{\mathrm{mb}}_1,
  $$
  the leading inward term should come from the delayed attraction of the opposite-sign body on the same-sign pair, while leakage includes tangential rotation of the pair axis and same-sign self-repulsive widening;
- for
  $$
  \rho^{\mathrm{mb}}_2,
  $$
  the leading inward term should come from the combined opposite-sign attractions between body
  $$
  2
  $$
  and the outer pair, while leakage includes pair breathing and quotient-frame acceleration of the midpoint;
- for
  $$
  \rho^{\mathrm{mb}}_3,
  $$
  the leading inward term should come from delayed flattening or anti-shear alignment, while leakage includes uniform breathing that preserves aspect ratio only to lower order;
- for
  $$
  \rho^{\mathrm{mb}}_4,
  $$
  the leading inward term should come from the persistence of the distinguished opposite-sign core role, while leakage includes any near-tie in body radii that threatens a role exchange.

The point of writing the comparison law channelwise is that one does not need one scalar miracle quantity. One needs a finite family of inequalities whose common positivity excludes all geometrically natural scattering routes.

The first two channels admit a direct Jacobi-level expansion that should anchor the later recapture estimates.

For
$$
\rho^{\mathrm{mb}}_1=\|\mathbf{a}\|,
\qquad
\hat{\mathbf{a}}\equiv \frac{\mathbf{a}}{\|\mathbf{a}\|},
$$
one has on every noncollision, non-pair-collapse window
$$
\dot{\rho}^{\mathrm{mb}}_1
=
\hat{\mathbf{a}}\cdot \dot{\mathbf{a}},
$$
and
$$
\ddot{\rho}^{\mathrm{mb}}_1
=
\hat{\mathbf{a}}\cdot \ddot{\mathbf{a}}
\;+\;
\frac{\|\dot{\mathbf{a}}\|^2-\big(\hat{\mathbf{a}}\cdot\dot{\mathbf{a}}\big)^2}{\|\mathbf{a}\|}.
$$
Writing
$$
\ddot{\mathbf{a}}=\ddot{\mathbf{x}}_1-\ddot{\mathbf{x}}_3,
$$
the first term is the true pair-axis forcing and the second is the tangential leakage caused by rotation of the same-sign pair axis in the plane. Since the leakage term is nonnegative, the useful inward comparison law is obtained by isolating the pair-axis component
$$
\Lambda^{\mathrm{mb}}_1(t)
\equiv
-\hat{\mathbf{a}}(t)\cdot\ddot{\mathbf{a}}(t),
$$
and the geometric leakage ceiling
$$
L^{\mathrm{mb}}_1(t)
\equiv
\frac{\|\dot{\mathbf{a}}(t)\|^2-\big(\hat{\mathbf{a}}(t)\cdot\dot{\mathbf{a}}(t)\big)^2}{\|\mathbf{a}(t)\|}
+L^{\mathrm{mb}}_{1,\mathrm{rep}}(t),
$$
where
$$
L^{\mathrm{mb}}_{1,\mathrm{rep}}(t)
$$
is the explicit ceiling for same-sign self-driven widening and any partner-mediated outward component not absorbed into
$$
\Lambda^{\mathrm{mb}}_1.
$$
The recapture target for
$$
\rho^{\mathrm{mb}}_1
$$
is therefore
$$
\ddot{\rho}^{\mathrm{mb}}_1(t)
\le
-\,\Lambda^{\mathrm{mb}}_1(t)
+L^{\mathrm{mb}}_1(t)
+A^{\mathrm{mb}}_{s,\mathrm{deep}}(t).
$$

To connect this directly to the master equation, write
$$
\ddot{\mathbf{x}}_i(t)
=
\sum_{j=1}^3
\sum_{s\in\mathcal{C}_{ij}(t)}
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}
{r_{ij}(t;s)^2\,|J_{ij}(t;s)|}
\hat{\mathbf{r}}_{ij}(t;s),
$$
with the usual convention that the
$$
j=i
$$
terms are self branches. Then
$$
\Lambda^{\mathrm{mb}}_1(t)
=
-\hat{\mathbf{a}}(t)\cdot\big(\ddot{\mathbf{x}}_1(t)-\ddot{\mathbf{x}}_3(t)\big)
$$
splits into branch families:
$$
\Lambda^{\mathrm{mb}}_1
=
\Lambda^{\mathrm{mb}}_{1,\mathrm{core}}
-\Lambda^{\mathrm{mb}}_{1,\mathrm{same}}
-\Lambda^{\mathrm{mb}}_{1,\mathrm{self}},
$$
where:

- $$
  \Lambda^{\mathrm{mb}}_{1,\mathrm{core}}
  $$
  is the inward projection of the opposite-sign body
  $$
  2
  $$
  acting on the same-sign pair
  $$
  (1,3);
  $$
- $$
  \Lambda^{\mathrm{mb}}_{1,\mathrm{same}}
  $$
  collects the outward projection of the direct same-sign interaction between bodies
  $$
  1
  $$
  and
  $$
  3;
  $$
- $$
  \Lambda^{\mathrm{mb}}_{1,\mathrm{self}}
  $$
  collects the outward pair-axis projections of the self branches on bodies
  $$
  1
  $$
  and
  $$
  3.
  $$

The unresolved but now explicit theorem burden is to prove, on the recapture windows, that the opposite-sign core term dominates the same-sign and self-driven widening after all admissible fold-tube and deep-past ceilings are paid.

Accordingly, a first branch-sum ceiling for the residual widening term should be written as
$$
L^{\mathrm{mb}}_{1,\mathrm{rep}}(t)
\equiv
\Big(\Lambda^{\mathrm{mb}}_{1,\mathrm{same}}(t)\Big)_+
+
\Big(\Lambda^{\mathrm{mb}}_{1,\mathrm{self}}(t)\Big)_+
+
L^{\mathrm{mb}}_{1,\mathrm{fold}}(t),
$$
where
$$
(\cdot)_+
$$
denotes positive part and
$$
L^{\mathrm{mb}}_{1,\mathrm{fold}}(t)
$$
is the additional local ceiling needed near controlled coupled folds. In other words, the pair-separation channel is reduced to a contest between one inward projected source family and a finite list of outward projected branch families.

For
$$
\rho^{\mathrm{mb}}_2=\|\mathbf{b}\|,
\qquad
\hat{\mathbf{b}}\equiv \frac{\mathbf{b}}{\|\mathbf{b}\|},
$$
one has likewise
$$
\dot{\rho}^{\mathrm{mb}}_2
=
\hat{\mathbf{b}}\cdot \dot{\mathbf{b}},
$$
and
$$
\ddot{\rho}^{\mathrm{mb}}_2
=
\hat{\mathbf{b}}\cdot \ddot{\mathbf{b}}
\;+\;
\frac{\|\dot{\mathbf{b}}\|^2-\big(\hat{\mathbf{b}}\cdot\dot{\mathbf{b}}\big)^2}{\|\mathbf{b}\|}.
$$
Since
$$
\ddot{\mathbf{b}}
=
\ddot{\mathbf{x}}_2-\frac{\ddot{\mathbf{x}}_1+\ddot{\mathbf{x}}_3}{2},
$$
the first term measures the net delayed pull of the opposite-sign body toward or away from the outer-pair midpoint, while the second term is the transverse leakage created by midpoint-frame rotation and shape drift. The natural channelwise definitions are therefore
$$
\Lambda^{\mathrm{mb}}_2(t)
\equiv
-\hat{\mathbf{b}}(t)\cdot \ddot{\mathbf{b}}(t),
$$
$$
L^{\mathrm{mb}}_2(t)
\equiv
\frac{\|\dot{\mathbf{b}}(t)\|^2-\big(\hat{\mathbf{b}}(t)\cdot\dot{\mathbf{b}}(t)\big)^2}{\|\mathbf{b}(t)\|}
+L^{\mathrm{mb}}_{2,\mathrm{breath}}(t),
$$
where
$$
L^{\mathrm{mb}}_{2,\mathrm{breath}}(t)
$$
collects the pair-breathing and quotient-frame error terms generated by the simultaneous motion of
$$
\mathbf{a}
$$
and
$$
\mathbf{b}.
$$
The recapture target for
$$
\rho^{\mathrm{mb}}_2
$$
is thus
$$
\ddot{\rho}^{\mathrm{mb}}_2(t)
\le
-\,\Lambda^{\mathrm{mb}}_2(t)
+L^{\mathrm{mb}}_2(t)
+A^{\mathrm{mb}}_{s,\mathrm{deep}}(t).
$$

Here the master-equation projection is
$$
\Lambda^{\mathrm{mb}}_2(t)
=
-\hat{\mathbf{b}}(t)\cdot
\left(
\ddot{\mathbf{x}}_2(t)
-\frac{\ddot{\mathbf{x}}_1(t)+\ddot{\mathbf{x}}_3(t)}{2}
\right),
$$
and this naturally decomposes into:
$$
\Lambda^{\mathrm{mb}}_2
=
\Lambda^{\mathrm{mb}}_{2,\mathrm{attr}}
-\Lambda^{\mathrm{mb}}_{2,\mathrm{pair}}
-\Lambda^{\mathrm{mb}}_{2,\mathrm{self}},
$$
where:

- $$
  \Lambda^{\mathrm{mb}}_{2,\mathrm{attr}}
  $$
  is the inward projection of the combined opposite-sign attractions between body
  $$
  2
  $$
  and the outer pair;
- $$
  \Lambda^{\mathrm{mb}}_{2,\mathrm{pair}}
  $$
  is the outward projection induced by breathing of the same-sign pair midpoint itself;
- $$
  \Lambda^{\mathrm{mb}}_{2,\mathrm{self}}
  $$
  is the outward projection of self branches on all three bodies onto the
  $$
  \hat{\mathbf{b}}
  $$
  direction.

The natural branch-sum leakage ceiling is therefore
$$
L^{\mathrm{mb}}_{2,\mathrm{breath}}(t)
\equiv
\Big(\Lambda^{\mathrm{mb}}_{2,\mathrm{pair}}(t)\Big)_+
+
\Big(\Lambda^{\mathrm{mb}}_{2,\mathrm{self}}(t)\Big)_+
+
L^{\mathrm{mb}}_{2,\mathrm{fold}}(t),
$$
with
$$
L^{\mathrm{mb}}_{2,\mathrm{fold}}(t)
$$
again denoting the explicit ceiling for fold-tube amplification and local gauge-frame error terms.

So the midpoint-separation channel is likewise reduced to one concrete branch-sum competition: the combined inward opposite-sign attraction against pair breathing, self-drive, transverse rotation, and controlled fold amplification.

For the shear channel
$$
\rho^{\mathrm{mb}}_3(\mathbf{a},\mathbf{b})
=
\frac{|\det(\mathbf{a},\mathbf{b})|}{\|\mathbf{a}\|+\|\mathbf{b}\|},
$$
write
$$
\Delta_{ab}\equiv \det(\mathbf{a},\mathbf{b}),
\qquad
S_{ab}\equiv \|\mathbf{a}\|+\|\mathbf{b}\|.
$$
On one fixed sign branch
$$
\operatorname{sign}(\Delta_{ab})=\varsigma\in\{\pm1\},
$$
the observable becomes
$$
\rho^{\mathrm{mb}}_3=\varsigma\,\frac{\Delta_{ab}}{S_{ab}},
$$
so its first derivative may be organized as
$$
\dot{\rho}^{\mathrm{mb}}_3
=
\varsigma\,
\frac{
\det(\dot{\mathbf{a}},\mathbf{b})+\det(\mathbf{a},\dot{\mathbf{b}})
}{S_{ab}}
-
\varsigma\,
\frac{\Delta_{ab}\,\dot S_{ab}}{S_{ab}^2}.
$$
The theorem burden is not to memorize the full second derivative term-by-term, but to split it into:
$$
\ddot{\rho}^{\mathrm{mb}}_3(t)
\le
-\,\Lambda^{\mathrm{mb}}_3(t)
+L^{\mathrm{mb}}_3(t)
+A^{\mathrm{mb}}_{s,\mathrm{deep}}(t),
$$
where
$$
\Lambda^{\mathrm{mb}}_3(t)
$$
is the net anti-shear projection coming from delayed flattening of the triangle relative to the chosen sign branch, and
$$
L^{\mathrm{mb}}_3(t)
$$
collects denominator breathing, branch-sign switching near
$$
\Delta_{ab}=0,
$$
and fold-tube amplification. A first useful decomposition is
$$
\Lambda^{\mathrm{mb}}_3
=
\Lambda^{\mathrm{mb}}_{3,\mathrm{flat}}
-\Lambda^{\mathrm{mb}}_{3,\mathrm{swap}}
-\Lambda^{\mathrm{mb}}_{3,\mathrm{self}},
$$
where:

- $$
  \Lambda^{\mathrm{mb}}_{3,\mathrm{flat}}
  $$
  is the inward projection of delayed flattening or anti-shear alignment;
- $$
  \Lambda^{\mathrm{mb}}_{3,\mathrm{swap}}
  $$
  is the outward projection produced by pair breathing or source-cluster swaps that increase signed area;
- $$
  \Lambda^{\mathrm{mb}}_{3,\mathrm{self}}
  $$
  is the outward shear contribution of self branches.

The corresponding leakage ceiling should be written as
$$
L^{\mathrm{mb}}_3(t)
\equiv
\Big(\Lambda^{\mathrm{mb}}_{3,\mathrm{swap}}(t)\Big)_+
+
\Big(\Lambda^{\mathrm{mb}}_{3,\mathrm{self}}(t)\Big)_+
+
L^{\mathrm{mb}}_{3,\mathrm{den}}(t)
+
L^{\mathrm{mb}}_{3,\mathrm{fold}}(t),
$$
where
$$
L^{\mathrm{mb}}_{3,\mathrm{den}}(t)
$$
controls the derivative loss from the breathing denominator
$$
S_{ab}^{-1}
$$
and
$$
L^{\mathrm{mb}}_{3,\mathrm{fold}}(t)
$$
controls fold-tube and sign-branch switching errors near the small-area set.

For the role-exchange channel
$$
\rho^{\mathrm{mb}}_4
=
\max\Big\{
\|\mathbf{x}_1\|,
\|\mathbf{x}_2\|,
\|\mathbf{x}_3\|
\Big\}
-\|\mathbf{x}_2\|,
$$
the correct local formulation is piecewise. On any subwindow where one outer body, say
$$
\mathbf{x}_{i_\ast},
\qquad
i_\ast\in\{1,3\},
$$
uniquely realizes the maximum radius with a gap
$$
\delta_{\mathrm{role}}>0,
$$
one has the smooth branch
$$
\rho^{\mathrm{mb}}_4
=
\|\mathbf{x}_{i_\ast}\|-\|\mathbf{x}_2\|.
$$
Then, with
$$
\hat{\mathbf{x}}_{i_\ast}\equiv \frac{\mathbf{x}_{i_\ast}}{\|\mathbf{x}_{i_\ast}\|},
\qquad
\hat{\mathbf{x}}_{2}\equiv \frac{\mathbf{x}_{2}}{\|\mathbf{x}_{2}\|},
$$
the channelwise comparison law should be organized as
$$
\ddot{\rho}^{\mathrm{mb}}_4(t)
\le
-\,\Lambda^{\mathrm{mb}}_4(t)
+L^{\mathrm{mb}}_4(t)
+A^{\mathrm{mb}}_{s,\mathrm{deep}}(t),
$$
with
$$
\Lambda^{\mathrm{mb}}_4(t)
\equiv
-\hat{\mathbf{x}}_{i_\ast}(t)\cdot \ddot{\mathbf{x}}_{i_\ast}(t)
+\hat{\mathbf{x}}_{2}(t)\cdot \ddot{\mathbf{x}}_{2}(t),
$$
interpreted as persistence of the distinguished opposite-sign core role, and with leakage ceiling
$$
L^{\mathrm{mb}}_4(t)
\equiv
L^{\mathrm{mb}}_{4,\mathrm{curv}}(t)
+
L^{\mathrm{mb}}_{4,\mathrm{tie}}(t)
+
L^{\mathrm{mb}}_{4,\mathrm{fold}}(t).
$$
Here:

- $$
  L^{\mathrm{mb}}_{4,\mathrm{curv}}
  $$
  collects the usual tangential curvature terms from differentiating the two norms;
- $$
  L^{\mathrm{mb}}_{4,\mathrm{tie}}
  $$
  controls the loss of smoothness near a near-tie
  $$
  \|\mathbf{x}_{i_\ast}\|\approx \|\mathbf{x}_2\|
  $$
  or
  $$
  \|\mathbf{x}_1\|\approx \|\mathbf{x}_3\|;
  $$
- $$
  L^{\mathrm{mb}}_{4,\mathrm{fold}}
  $$
  controls fold-tube amplification on the chosen role branch.

The intended theorem burden is to show that, on controlled subwindows with a strict role gap
$$
\delta_{\mathrm{role}}>0,
$$
the inward role-persistence term beats curvature, tie, self-drive, and fold leakage strongly enough to keep the opposite-sign body from losing the distinguished core role.

These four formulas are the concrete comparison identities the planar-three-body bridge should use. They say where the useful inward coercivity must come from and where the leakage terms enter for all principal escape channels.

The next step is to specify the first recapture windows for the principal channels, beginning with the first two Jacobi channels for which the cleanest local turning lemma is available. Let
$$
t_{\mathrm{x}}^{\mathrm{mb}}
$$
denote the first near-core crossing or minimum-core event after the initial inbound section, and let
$$
t_{\mathrm{turn}}^{\mathrm{mb}}
$$
denote the first later time at which the distinguished opposite-sign body and the same-sign outer pair are both candidates for outward escape rather than continued compression. The first controlled windows should then be taken as
$$
I^{\mathrm{mb}}_{\rho,\mathrm{post}}
\equiv
\big[t_{\mathrm{x}}^{\mathrm{mb}},\,t_{\mathrm{x}}^{\mathrm{mb}}+\Delta_{\rho,\mathrm{post}}\big],
$$
$$
I^{\mathrm{mb}}_{\rho,\mathrm{late}}
\equiv
\big[t_{\mathrm{turn}}^{\mathrm{mb}}-\Delta_{\rho,\mathrm{late}},\,t_{\mathrm{turn}}^{\mathrm{mb}}\big],
$$
with positive window lengths
$$
\Delta_{\rho,\mathrm{post}},
\qquad
\Delta_{\rho,\mathrm{late}}.
$$

On
$$
I^{\mathrm{mb}}_{\rho,\mathrm{post}}
$$
the intended role is immediate post-core recapture: the same-sign pair must not continue widening unchecked, and the opposite-sign body must not continue peeling away from the outer-pair midpoint. On
$$
I^{\mathrm{mb}}_{\rho,\mathrm{late}}
$$
the intended role is late-turn closure: the same observables must already be losing outward momentum before a genuine scattering configuration forms.

> **Target Proposition (Two-channel Jacobi recapture on the first planar-three-body windows).**
> Assume:
> 1. the gauge-fixed section package;
> 2. the finite active delay hypergraph package;
> 3. the deep-past suppression bound
>    $$
>    A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
>    \le
>    A^{\mathrm{mb}}_{\mathrm{deep},\max};
>    $$
> 4. and controlled fold ceilings
>    $$
>    L^{\mathrm{mb}}_{1,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_1,
>    \qquad
>    L^{\mathrm{mb}}_{2,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_2
>    $$
>    on the two windows above.
>
> Suppose, in addition, that on each of the smooth windows
> $$
> I^{\mathrm{mb}}_{1,\mathrm{post}}\cap I^{\mathrm{mb}}_{2,\mathrm{post}},
> \qquad
> I^{\mathrm{mb}}_{1,\mathrm{late}}\cap I^{\mathrm{mb}}_{2,\mathrm{late}},
> $$
> one has strict projected inequalities
> $$
> \Lambda^{\mathrm{mb}}_{1,\mathrm{core}}
> >
> \Big(\Lambda^{\mathrm{mb}}_{1,\mathrm{same}}\Big)_+
> +
> \Big(\Lambda^{\mathrm{mb}}_{1,\mathrm{self}}\Big)_+
> +
> \frac{\|\dot{\mathbf{a}}\|^2-\big(\hat{\mathbf{a}}\cdot\dot{\mathbf{a}}\big)^2}{\|\mathbf{a}\|}
> +
> F^{\mathrm{mb}}_1
> +
> A^{\mathrm{mb}}_{\mathrm{deep},\max},
> $$
> $$
> \Lambda^{\mathrm{mb}}_{2,\mathrm{attr}}
> >
> \Big(\Lambda^{\mathrm{mb}}_{2,\mathrm{pair}}\Big)_+
> +
> \Big(\Lambda^{\mathrm{mb}}_{2,\mathrm{self}}\Big)_+
> +
> \frac{\|\dot{\mathbf{b}}\|^2-\big(\hat{\mathbf{b}}\cdot\dot{\mathbf{b}}\big)^2}{\|\mathbf{b}\|}
> +
> F^{\mathrm{mb}}_2
> +
> A^{\mathrm{mb}}_{\mathrm{deep},\max}.
> $$
> Then the two principal escape observables obey
> $$
> \ddot{\rho}^{\mathrm{mb}}_1(t)<0,
> \qquad
> \ddot{\rho}^{\mathrm{mb}}_2(t)<0
> $$
> throughout those windows.
>
> In particular:
> 1. if
>    $$
>    \dot{\rho}^{\mathrm{mb}}_1
>    $$
>    or
>    $$
>    \dot{\rho}^{\mathrm{mb}}_2
>    $$
>    is initially positive at the start of either window, it must strictly decrease along that window;
> 2. if the window is long enough and the initial outward rates are uniformly bounded, each observable reaches a turning time inside the window;
> 3. therefore the pair-separation and midpoint-separation channels cannot both sustain monotone outward escape across the first post-crossing or late-turn stages.

This is the first honest recapture lemma for the planar three-body bridge. It does not yet prove the full many-body return, but it reduces the first two escape channels to explicit projected inequalities on controlled windows.

To align the abstract recapture theorem with the first concrete lemma, the principal margins for
$$
m=1,2
$$
should be defined directly from the projected branch-sum gaps above. Namely,
$$
\mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{1,\mathrm{post}}}
\left[
\Lambda^{\mathrm{mb}}_{1,\mathrm{core}}(t)
-
\Big(\Lambda^{\mathrm{mb}}_{1,\mathrm{same}}(t)\Big)_+
-
\Big(\Lambda^{\mathrm{mb}}_{1,\mathrm{self}}(t)\Big)_+
-
\frac{\|\dot{\mathbf{a}}(t)\|^2-\big(\hat{\mathbf{a}}(t)\cdot\dot{\mathbf{a}}(t)\big)^2}{\|\mathbf{a}(t)\|}
-
L^{\mathrm{mb}}_{1,\mathrm{fold}}(t)
-
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\right],
$$
$$
\mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{1,\mathrm{late}}}
\left[
\Lambda^{\mathrm{mb}}_{1,\mathrm{core}}(t)
-
\Big(\Lambda^{\mathrm{mb}}_{1,\mathrm{same}}(t)\Big)_+
-
\Big(\Lambda^{\mathrm{mb}}_{1,\mathrm{self}}(t)\Big)_+
-
\frac{\|\dot{\mathbf{a}}(t)\|^2-\big(\hat{\mathbf{a}}(t)\cdot\dot{\mathbf{a}}(t)\big)^2}{\|\mathbf{a}(t)\|}
-
L^{\mathrm{mb}}_{1,\mathrm{fold}}(t)
-
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\right],
$$
$$
\mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{post}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{2,\mathrm{post}}}
\left[
\Lambda^{\mathrm{mb}}_{2,\mathrm{attr}}(t)
-
\Big(\Lambda^{\mathrm{mb}}_{2,\mathrm{pair}}(t)\Big)_+
-
\Big(\Lambda^{\mathrm{mb}}_{2,\mathrm{self}}(t)\Big)_+
-
\frac{\|\dot{\mathbf{b}}(t)\|^2-\big(\hat{\mathbf{b}}(t)\cdot\dot{\mathbf{b}}(t)\big)^2}{\|\mathbf{b}(t)\|}
-
L^{\mathrm{mb}}_{2,\mathrm{fold}}(t)
-
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\right],
$$
$$
\mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{late}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{2,\mathrm{late}}}
\left[
\Lambda^{\mathrm{mb}}_{2,\mathrm{attr}}(t)
-
\Big(\Lambda^{\mathrm{mb}}_{2,\mathrm{pair}}(t)\Big)_+
-
\Big(\Lambda^{\mathrm{mb}}_{2,\mathrm{self}}(t)\Big)_+
-
\frac{\|\dot{\mathbf{b}}(t)\|^2-\big(\hat{\mathbf{b}}(t)\cdot\dot{\mathbf{b}}(t)\big)^2}{\|\mathbf{b}(t)\|}
-
L^{\mathrm{mb}}_{2,\mathrm{fold}}(t)
-
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\right].
$$

For the shear and role-exchange channels, the principal margins should likewise be defined from the concrete decompositions above:
$$
\mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{post}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{3,\mathrm{post}}}
\left[
\Lambda^{\mathrm{mb}}_{3,\mathrm{flat}}(t)
-
\Big(\Lambda^{\mathrm{mb}}_{3,\mathrm{swap}}(t)\Big)_+
-
\Big(\Lambda^{\mathrm{mb}}_{3,\mathrm{self}}(t)\Big)_+
-
L^{\mathrm{mb}}_{3,\mathrm{den}}(t)
-
L^{\mathrm{mb}}_{3,\mathrm{fold}}(t)
-
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\right],
$$
$$
\mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{late}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{3,\mathrm{late}}}
\left[
\Lambda^{\mathrm{mb}}_{3,\mathrm{flat}}(t)
-
\Big(\Lambda^{\mathrm{mb}}_{3,\mathrm{swap}}(t)\Big)_+
-
\Big(\Lambda^{\mathrm{mb}}_{3,\mathrm{self}}(t)\Big)_+
-
L^{\mathrm{mb}}_{3,\mathrm{den}}(t)
-
L^{\mathrm{mb}}_{3,\mathrm{fold}}(t)
-
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\right],
$$
$$
\mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{post}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{4,\mathrm{post}}}
\left[
\Lambda^{\mathrm{mb}}_4(t)
-
L^{\mathrm{mb}}_{4,\mathrm{curv}}(t)
-
L^{\mathrm{mb}}_{4,\mathrm{tie}}(t)
-
L^{\mathrm{mb}}_{4,\mathrm{fold}}(t)
-
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\right],
$$
$$
\mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{late}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{4,\mathrm{late}}}
\left[
\Lambda^{\mathrm{mb}}_4(t)
-
L^{\mathrm{mb}}_{4,\mathrm{curv}}(t)
-
L^{\mathrm{mb}}_{4,\mathrm{tie}}(t)
-
L^{\mathrm{mb}}_{4,\mathrm{fold}}(t)
-
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\right],
$$
where the smooth-window floors
$$
a_{\min},
\qquad
b_{\min},
\qquad
\Delta_{\min},
\qquad
\delta_{\mathrm{role},\min}
$$
are part of the recapture hypotheses rather than hidden background assumptions.

For the remaining channels
$$
m=5,\dots,K_{\mathrm{esc}},
$$
retain the abstract definitions
$$
\mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{post}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{\mathrm{post}}}
\Big(
\Lambda^{\mathrm{mb}}_m(t)
-L^{\mathrm{mb}}_m(t)
-A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\Big),
$$
$$
\mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{late}}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{\mathrm{late}}}
\Big(
\Lambda^{\mathrm{mb}}_m(t)
-L^{\mathrm{mb}}_m(t)
-A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\Big).
$$

With this convention,
$$
\mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}}>0,
\quad
\mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}}>0,
\quad
\mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{post}}>0,
\quad
\mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{late}}>0,
\quad
\mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{post}}>0,
\quad
\mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{late}}>0,
\quad
\mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{post}}>0,
\quad
\mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{late}}>0
$$
are the concrete margin versions of the four principal escape-channel inequalities. Whenever all of the many-body margins are positive, each escape observable feels a strictly inward comparison law on the corresponding controlled window.

> **Target Proposition (Principal four-channel recapture closure).**
> Assume the gauge-fixed section package, the bounded many-body caustic-transit package, the finite active delay hypergraph package, and the deep-past cluster-ancestry suppression bound. Suppose, in addition, that
> $$
> \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}}>0,
> \quad
> \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}}>0,
> \quad
> \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{post}}>0,
> \quad
> \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{late}}>0,
> $$
> $$
> \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{post}}>0,
> \quad
> \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{late}}>0,
> \quad
> \mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{post}}>0,
> \quad
> \mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{late}}>0.
> $$
> Then the four principal escape channels
> $$
> \rho^{\mathrm{mb}}_1,\rho^{\mathrm{mb}}_2,\rho^{\mathrm{mb}}_3,\rho^{\mathrm{mb}}_4
> $$
> cannot sustain a simultaneous scattering drift through the post-crossing and late-turn stages.
>
> More precisely:
> 1. the pair-separation channel cannot keep widening monotonically;
> 2. the midpoint-separation channel cannot keep ejecting the opposite-sign body monotonically;
> 3. the shear channel cannot keep increasing triangle-area escape monotonically on one fixed sign branch;
> 4. the role-exchange channel cannot cross into a persistent outer-body takeover on any subwindow with
>    $$
>    \delta_{\mathrm{role}}>0;
>    $$
> 5. therefore any remaining candidate scattering route must pass through a higher channel
>    $$
>    \rho^{\mathrm{mb}}_m,
>    \qquad
>    m\ge 5,
>    $$
>    or else violate one of the already-listed fold, tie, or chart hypotheses.

This proposition is the bridge between the local channel calculations and the full many-body recapture theorem. It says that once the four principal channels are controlled, any residual failure is no longer hidden in the obvious geometry; it must come from either a higher auxiliary channel or an explicit closure-stage obstruction.

> **Target Theorem (Planar-three-body multi-observable recapture criterion).**
> Assume:
> 1. the gauge-fixed section package;
> 2. the bounded many-body caustic-transit package;
> 3. the finite active delay hypergraph package;
> 4. the deep-past cluster-ancestry suppression bound;
> 5. and one coupled parameter regime in which all comparison terms are defined with common constants.
>
> Suppose, in addition, that for every
> $$
> m=1,\dots,K_{\mathrm{esc}}
> $$
> one has
> $$
> \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{post}}>0,
> \qquad
> \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{late}}>0.
> $$
> Then:
> 1. no escape observable can continue increasing throughout the full post-crossing window;
> 2. no escape observable can remain positive and outward-driving throughout the late-turn window;
> 3. at least one controlled return event forces the shape back toward the gauge-fixed inbound section without opening a new uncontrolled scattering channel;
> 4. consequently the candidate excursion makes both the post-crossing recapture turn and the late-turn return inside the controlled planar-three-body windows.

This is the first honest many-body recapture theorem target. It says that the configuration does not merely avoid one preferred binary escape. It must fail to escape in every channel that the three-body quotient geometry naturally opens.

### Seventh many-body theorem package: atlas-level tame-envelope closure

The remaining bridge step is now the same structural one that appeared in the 1D, reduced-planar, and unreduced-planar programs: put the whole cycle on one closed convex tame self-map domain. The only difference is that the data to be preserved are now genuinely atlas-level.

Let
$$
\mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
\subseteq
\Sigma^{-,\mathrm{mb}}_{A_\ast}
$$
denote the convex section envelope carrying only visible Banach-space bounds, such as:

- uniform bounds on the Jacobi vectors
  $$
  \mathbf{a},\mathbf{b};
  $$
- uniform velocity and Lipschitz acceleration bounds;
- memory-depth bounds;
- and the section-side non-near-collinearity margin.

This convex envelope should remain purely kinematic. It should not be defined by fixing one hypergraph, one ancestry complex, or one exact branch-count pattern, because those are not visibly convex invariants.

The next theorem burden is therefore not yet a convex tame set, but a stability proposition on the convex Banach box:

> **Target Proposition (Hypergraph and atlas stability on the convex Banach envelope).**
> On a sufficiently small convex section envelope
> $$
> \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta},
> $$
> the later branch-regularity, hypergraph, ancestry, and recapture packages remain stable in the following sense:
> 1. every history in
>    $$
>    \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
>    $$
>    that satisfies the quantitative no-accumulation floors
>    $$
>    \gamma_{\mathrm{fold}},
>    \qquad
>    \nu^{\mathrm{mb}}_J,
>    \qquad
>    \Delta\tau_{\mathrm{evt}}
>    $$
>    belongs to one finite admissible event class;
> 2. the corresponding active hypergraph and ancestry data vary only through the listed local event alphabet;
> 3. the smooth-window floors
>    $$
>    a_{\min},
>    \qquad
>    b_{\min},
>    \qquad
>    \Delta_{\min},
>    \qquad
>    \delta_{\mathrm{role},\min}
>    $$
>    and the corresponding principal windows
>    $$
>    I^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    I^{\mathrm{mb}}_{m,\mathrm{late}},
>    \qquad
>    m=1,2,3,4,
>    $$
>    remain nondegenerate on one nonempty tame subregion;
> 4. the principal recapture margins on that tame subregion remain bounded away from zero by one common floor
>    $$
>    \mathfrak{m}^{\mathrm{mb}}_{\mathrm{prin}}>0;
>    $$
> 5. and there exists a continuous projection or retraction
>    $$
>    \mathfrak{R}^{\mathrm{mb}}:
>    \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}\to
>    \mathcal{T}^{\mathrm{mb}}_{A_\ast,\eta}
>    $$
>    onto that tame subregion whenever one wants to return from the convex Banach box to the graph-stable class.

Only after this separation should one define the many-body tame target. The many-body tame envelope target should then be a closed subset
$$
\mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}
\subseteq
\mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
$$
on which the following constants are all preserved simultaneously:

- gauge-selector continuity and uniqueness;
- finite active hypergraph bounds;
- finite cluster-ancestry bounds;
- the branch-regularity and event-gap data
  $$
  \Delta\tau_{\mathrm{evt}},
  \qquad
  \nu^{\mathrm{mb}}_J,
  \qquad
  \delta^{\mathrm{mb}}_{\mathrm{sep}};
  $$
- the smooth-window floors
  $$
  a_{\min},
  \qquad
  b_{\min},
  \qquad
  \Delta_{\min},
  \qquad
  \delta_{\mathrm{role},\min};
  $$
- recapture margins for every
  $$
  \rho^{\mathrm{mb}}_m;
  $$
- the concrete recapture-window lengths
  $$
  \Delta_{\rho,\mathrm{post}},
  \qquad
  \Delta_{\rho,\mathrm{late}};
  $$
- the fold ceilings
  $$
  F^{\mathrm{mb}}_1,
  \qquad
  F^{\mathrm{mb}}_2;
  $$
- the first four principal margins
  $$
  \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{post}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{late}};
  $$
- and one fixed atlas representative on the relevant quotient chart.

This strengthening matters. In the planar-three-body bridge, the tame layer cannot merely remember that “some recapture theorem holds.” It must preserve the actual windows and margin constants on which the first concrete recapture lemma was proved, or else the local turning argument could be lost after one return. But those data should now be understood as structure carried on a stable tame subregion of the convex Banach box, not as the definition of convexity itself.

> **Target Proposition (Closed tame graph-stable subregion in the planar three-body section).**
> There exists a nonempty closed set
> $$
> \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
> \subseteq
> \Sigma^{-,\mathrm{mb}}_{A_\ast}
> $$
> such that every history in
> $$
> \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}
> $$
> admits one-cycle continuation with the same gauge, hypergraph, ancestry, recapture-window, fold-ceiling, and recapture-margin constants, and such that the corresponding returned history lands back in the same set after the canonical gauge reset.

> Concretely, the preserved data should include:
> 1. one common gauge-fixed representative and one common non-near-collinear chart;
> 2. the same active delay-hypergraph size bounds and cluster-ancestry bounds;
> 3. the same branch-regularity and event-gap data
>    $$
>    \Delta\tau_{\mathrm{evt}},
>    \qquad
>    \nu^{\mathrm{mb}}_J,
>    \qquad
>    \delta^{\mathrm{mb}}_{\mathrm{sep}};
>    $$
> 4. the same smooth-window floors
>    $$
>    a_{\min},
>    \qquad
>    b_{\min},
>    \qquad
>    \Delta_{\min},
>    \qquad
>    \delta_{\mathrm{role},\min};
>    $$
> 5. the same controlled windows
>    $$
>    I^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    I^{\mathrm{mb}}_{m,\mathrm{late}},
>    \qquad
>    m=1,2,3,4;
>    $$
> 6. the same fold ceilings
>    $$
>    F^{\mathrm{mb}}_1,
>    \qquad
>    F^{\mathrm{mb}}_2;
>    $$
> 7. and the same strict positivity margins
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{post}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{late}},
>    $$
>    together with the remaining
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{late}}
>    $$
>    for
>    $$
>    m=3,\dots,K_{\mathrm{esc}}.
>    $$

This is the correct tame-structure target because the first two Jacobi channels are no longer abstract placeholders. If their window geometry or margin positivity is not propagated through the return map, then the concrete recapture lemma has no stable domain on which to operate.

> **Target Theorem (Planar-three-body invariant-envelope closure and Schauder capstone).**
> Assume:
> 1. the convex Banach-envelope proposition;
> 2. the hypergraph-and-atlas stability proposition on that envelope;
> 3. the closed tame graph-stable subregion proposition;
> 4. the corresponding invariant-envelope closure theorem;
> 5. and continuity and precompactness of the gauge-fixed many-body return map on the relevant convex Banach box together with the tame retraction or projection.
>
> Then the return map has a fixed point
> $$
> \Phi^{\ast,\mathrm{mb}}_\eta
> \in
> \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta},
> $$
> and the associated delayed trajectory is a bounded periodic planar-three-body solution of the dual-mollified master equation.
>
> In particular, the fixed-point trajectory preserves one common gauge chart, one common active delay hypergraph, one common ancestry complex, and one common family of post-crossing and late-turn recapture margins through every return. That is the many-body analogue of the earlier bridge closures on one tame self-map domain.

This is the first honest many-body breather target in the chapter. Everything above it is there only to make this statement legitimate.

The planar-three-body bridge now has the same explicit theorem-ladder shape as the earlier binary bridges:

- gauge-fixed section and shape-space well-posedness;
- quantitative branch regularity and no-accumulation of delay events;
- bounded many-body caustic transit and fold ceilings;
- finite active delay-hypergraph control;
- cluster-valued ancestry or exclusion for deep-past branches;
- finite escape-observable recapture on explicit smooth windows;
- and atlas-level tame-envelope closure leading to the Schauder capstone.

## Capstone Statement

The 1D collinear chapter should now be used as a frozen reference theorem scaffold. The present chapter records the higher-level lesson:

> **Theorem Program (Breather architecture for the master equation).**
> A master-equation breather theorem should be pursued by constructing a sectioned history-space return map, proving a nonempty tame propagated class, separating convex Banach bounds from tame delayed-root geometry, and then closing the resulting return map on one closed convex tame self-map domain. The unresolved burden is no longer the abstract fixed-point theorem. It is the geometric production of that domain outside the ordered 1D setting.

This is the correct point from which to resume work on the broader dynamics stack.

## Related Chapters

- [master-equation.md](./master-equation.md)
- [collinear-breather.md](./collinear-breather.md)
- [binary-dynamics.md](./binary-dynamics.md)
- [tri-binary-dynamics.md](./tri-binary-dynamics.md)
- [energy.md](./energy.md)
