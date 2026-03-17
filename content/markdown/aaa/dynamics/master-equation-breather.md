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
   C^1([-h,0];\mathcal{Q}^{\sharp}_{\mathrm{pl}})
   $$
   with one codimension-one return condition and one explicit gauge selector that chooses a canonical representative of each returned history. In the reduced planar bridge the gauge reset is one rotation angle. Here the theorem target must identify the correct quotient chart and prove that the returned history depends continuously on that gauge choice.
2. A finite branch-graph package for the active delayed roots. Instead of one sector-labeled family of self and partner branches, one should expect a finite graph
   $$
   \mathscr{G}_{\mathrm{br}}(t)
   $$
   whose vertices encode source-receiver chord types and whose edges encode admissible fold births, mergers, or handoffs between windows. The replacement theorem must bound that graph uniformly and exclude uncontrolled simultaneous fold accumulation.
3. A provenance or exclusion package for deep-past roots. The reduced planar argument pushes late self roots into one pre-crossing inbound cone family. The unreduced planar target should instead prove that every remote active root either relocates into a finite provenance class on the earlier branch graph or is excluded by a topological obstruction principle. Without such a theorem there is no honest replacement for deep-past relocation.
4. A multi-channel recapture package. The reduced planar comparison law pays one scalar leakage term
   $$
   \rho\dot\vartheta^2.
   $$
   In the unreduced planar regime the replacement must control several escape channels at once: rotational, tangential, and shear-like components in the quotient dynamics. The correct theorem target is therefore not one scalar inequality, but a coercive inward comparison that dominates every nonradial leakage channel on the chosen inner and outer windows.
5. A new closure package on one quotient-space convex envelope
   $$
   \mathcal{C}^{\sharp}_{\eta}
   $$
   and one closed convex tame envelope
   $$
   \mathcal{K}^{\sharp}_{\eta}
   \subseteq
   \mathcal{C}^{\sharp}_{\eta}.
   $$
   The returned histories must land back in the same gauge-fixed quotient section, preserve the branch-graph and recapture constants, and define a continuous precompact self-map on that same domain.

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

If that theorem ladder cannot be stated cleanly, then the obstruction should be recorded at that level: either the quotient section is not well posed, the branch graph is not uniformly finite, provenance control fails, the multi-channel recapture estimate loses coercivity, or no convex tame self-map domain survives the gauge reset.

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
