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
