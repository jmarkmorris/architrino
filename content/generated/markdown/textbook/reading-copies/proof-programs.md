# Proof Programs

## Master Equation Breather

This chapter sits between the canonical delayed law in [master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md) and the one-dimensional reference scaffold in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md). It is a theorem-program atlas, not the proof itself. Its purpose is to extract the transportable theorem architecture and to state clearly which replacement lemmas would be required before a genuine breather theorem can be pursued at the level of the master equation.

The strategic point is simple. The proof should first close in the collinear dual-mollified model by producing a candidate cycle, a finite branch chart, a closed convex certificate, a return self-map, and the Schauder fixed point. Only after that closure is certified should the higher-dimensional sections below be reused as dependency maps. The next task in this chapter is therefore abstraction: identify what part of the collinear scaffold belongs to the general delayed dynamics, what part uses the ordered geometry of the line, and what new geometry must replace those 1D-only moves in higher dimension.

### Purpose

The breather problem for the full delayed master equation is not a single obstruction. It is the conjunction of five distinct analytic burdens:

- choosing a codimension-one return section in history space,
- controlling active delayed-root topology along one cycle,
- proving that delayed self-drive does not defeat global recapture,
- packaging the resulting trajectories into a single closed convex tame self-map domain,
- and closing the fixed-point step on that domain.

The collinear scaffold shows that these burdens can be separated cleanly. In particular, it shows that the final existence theorem should be organized around a history-space return map rather than around a scalar speed closure alone. This chapter records that abstraction in a form suitable for later use in the master-equation stack.

### Position in the Dynamics Stack

The intended division of labor is:

- [master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md) gives the exact delayed law, the branch-sum form, the path-history integral form, and the causal Jacobians.
- [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md) supplies the live reduced proof target in a geometry where ordering on the line eliminates tangential drift.
- this chapter translates the 1D scaffold into a master-equation theorem atlas by separating portable structure from collinear-specific arguments.

Accordingly, this document should be read neither as a replacement for the master equation nor as a second reduced-model note. It is a bridge chapter: a theorem blueprint for transporting the 1D existence architecture into higher-dimensional delayed dynamics after the collinear certificate has closed.

### Portable Return-Map Architecture

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

#### Absolute-time evolution law for certification

The return-map program does not require an elementary closed-form orbit. It requires a precise evolution law, one candidate cycle, and a finite certificate showing that the same closed convex tame domain is preserved by the return map.

For the dual-mollified master equation, the certification-level evolution law may be written directly in absolute time as
$$
\ddot{\mathbf{x}}_i(t)
=
\kappa\epsilon^2
\sum_j \sigma_{ij}
\int_{t-h}^{t}
\frac{\widehat{\mathbf r}_{ij}(t,s)}
{\|\mathbf r_{ij}(t,s)\|^2+\epsilon_c^2}\,
\delta_\eta\!\big(\|\mathbf r_{ij}(t,s)\|-c_f(t-s)\big)\,ds,
$$
where
$$
\mathbf r_{ij}(t,s)
\equiv
\mathbf{x}_i(t)-\mathbf{x}_j(s),
\qquad
\widehat{\mathbf r}_{ij}(t,s)
\equiv
\frac{\mathbf r_{ij}(t,s)}{\|\mathbf r_{ij}(t,s)\|}.
$$
Here
$$
h
$$
is the certified memory horizon,
$$
\eta
$$
is the causal-shell width, and
$$
\epsilon_c
$$
is the short-distance core scale.

Branch-sum formulas are derived from this absolute-time integral only on simple-root charts, where the causal shell has isolated transversal roots. They are therefore local analytic reductions, not the global definition of the dynamics through fold transit or certified topology.

The proof burden is consequently finite-certificate closure:
$$
\text{candidate cycle}
\to
\text{null-coordinate pre-ledger closure}
\to
\text{finite branch chart}
\to
\text{closed convex certificate}
\to
\text{return self-map}
\to
\text{Schauder}.
$$
The collinear pre-ledger is a falsification gate, not bookkeeping: finite parent-complement coverage must close before any branch chart is authorized.

In concrete terms, instantiate a candidate history
$$
\Phi_{\mathrm{cyc}},
$$
choose the certified domain around it, and prove that
$$
P_\eta
$$
is continuous, precompact, and self-mapping on that one domain.

The planar and many-body sections below should therefore be read as roadmap layers. They record dependencies that must eventually be discharged, but they are not themselves completed proofs.

### What the 1D Reference Model Already Settled

The frozen collinear chapter contributes five structural lessons that should now be treated as stable.

#### 1. Dual mollification is structural, not cosmetic

The shell width
$$
\eta
$$
and the core cutoff
$$
\epsilon_c
$$
play different roles and should not be conflated. The first regularizes caustic transit across the causal shell. The second regularizes the short-distance amplitude divergence. The 1D scaffold works precisely because those two pathologies are separated rather than blurred into a single smoothing parameter.

#### 2. Convex Banach bounds and tame delayed geometry must be split

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

#### 3. Seed nonvacuity must be explicit

The 1D scaffold no longer leaves the tame class abstractly nonempty. It builds an explicit affine seed history, then thickens it to a section-side tame neighborhood, and only afterward seeks full-cycle propagation. That logic is also portable. One should not expect higher-dimensional tame classes to be nonempty merely because their defining inequalities look plausible.

#### 4. The fixed-point capstone needs one matching domain

The final Schauder route only becomes legitimate after continuity, precompactness, and the self-map property all live on one and the same closed convex tame domain. This is now explicit in the 1D manuscript and should remain explicit in every higher-dimensional formulation.

#### 5. Parameter solvability is coupled

The collinear audit showed that local recapture margins and global envelope constants cannot be treated as algebraically independent when the crossing-speed bounds depend on envelope-scale collapse estimates. The master-equation analogue should therefore be phrased from the beginning as a coupled admissible-regime problem rather than as a sequential parameter-picking exercise.

### Abstract Envelope Hierarchy

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
must not be defined by a raw intersection of delayed-root predicates. Persistence of active branches, Jacobian floors, memory-depth bounds, and caustic exclusions are generally not convex conditions when imposed pointwise on histories. Instead, the standard method throughout this chapter is:

1. choose a finite affine or sampled certificate around a candidate cycle;
2. make the defining inequalities of the certificate visibly convex in the stored history data;
3. prove that those convex certificate inequalities imply the delayed-geometry package:

- persistence of active partner and self roots,
- lower bounds on the causal Jacobians,
- branch-count control,
- and exclusion of root birth, root collision, and other topological degeneracies along the controlled cycle.

Convexity lives in the certificate. The delayed-root topology is a theorem-level consequence of the certificate, not the definition of the convex set itself. This is the natural packaging in which Arzela-Ascoli and Schauder can later be used. Anything looser risks repeating the old domain/codomain mismatch.

### 1D-Only Mechanisms and Their Replacement Obligations

The transport from the collinear reference model to the master equation is not literal. Several key moves in the 1D note use the ordered geometry of the line and therefore cannot simply be quoted in higher dimension.

#### Ordered sorting maps

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

#### Exact scalar Jacobians

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

#### Deep-past self-root relocation

In the 1D reference note, deep-past outward self-roots on the apocenter window are forced back onto the pre-crossing inbound leg, where they become unique and automatically transversal. This is a genuinely strong collinear mechanism, but it is also genuinely one-dimensional.

The higher-dimensional replacement cannot rely on line order. It must instead produce one of two outcomes:

- either a geometric exclusion theorem showing that such remote self-roots cannot occur in the chosen regime,
- or a transport theorem showing that any such roots must lie on a controlled branch family with uniform Jacobian bounds and finite multiplicity.

#### Affine seed simplicity

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

#### Outer-turn closure without tangential loss

The 1D problem has no tangential channel. In the master equation, any breather theorem must account for tangential drift, angular deflection, or other transverse escape directions that the line simply does not possess.

The replacement burden is therefore a recapture theorem with a genuinely vector coercive quantity. One needs a higher-dimensional analogue of the 1D inner and outer force margins, but measured against all escape channels rather than against a single signed radial variable.

### Master-Equation Theorem Spine

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
> defined by finite affine or sampled certificate inequalities. It contains the propagated tame class, and its certificate implies the relevant branch labels, Jacobian floors, memory-depth bounds, and caustic exclusions needed to carry a well-defined return map
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
> If the section is posed in absolute configuration space with no quotient gauge reset, the associated delayed trajectory is a bounded periodic solution of the dual-mollified master equation.

This is the abstract endpoint once no quotient gauge reset is being used. In any reduced or gauge-fixed planar setting, the same fixed-point statement first gives a relative breather in the quotient variables. An absolute periodic trajectory in the fixed Euclidean void requires an additional zero-holonomy reconstruction condition. The real work is not the formal Schauder step itself, but the geometric production and certification of the tame self-map domain on which Schauder is allowed to act.

#### Collective-coordinate and zero-mode bookkeeping

Higher-dimensional transport must also separate genuine deformation directions from neutral collective coordinates. For a candidate cycle
$$
\mathbf{X}_{\mathrm{cyc}}(t;\alpha),
$$
with finite parameters
$$
\alpha^a,
$$
define the tangent histories
$$
Z_a(\theta)\equiv
\partial_{\alpha^a}\mathbf{X}_{\mathrm{cyc}}(\theta;\alpha).
$$
Each
$$
Z_a
$$
must be assigned to one of three roles before the monodromy or Floquet data are used:

- removed by section or gauge fixing, such as time translation or rigid rotation;
- retained as a physical collective coordinate whose return is tested by a zero-holonomy or phase-closure equation;
- transverse to the branch and therefore part of the stability or returned-sample certificate.

This is the master-equation analogue of moduli and zero-mode bookkeeping in soliton theory, but it remains an $\mathbb{A}\mathbb{A}\mathbb{A}$ certificate rule. It does not add supersymmetry or gauge-theory ontology. Its concrete use is to prevent neutral drift from contaminating the finite certificate: the return-map derivative should be interpreted on the quotient chart, while any retained collective coordinate must satisfy its own closure residual
$$
\mathcal{H}_a(\Phi_{\mathrm{cyc}})=0.
$$

### Immediate Geometric Research Burdens

The first master-equation work should now concentrate on four concrete questions.

#### 1. Choice of section

One needs a return section that is both dynamically natural and analytically stable under perturbation. In the 1D chapter this role is played by
$$
x=x_\ast
$$
with fixed crossing sign. In higher dimension the corresponding section should separate one cycle cleanly and eliminate time-shift symmetry without introducing artificial coordinate singularities.

#### 2. Branch-topology control

The master equation already gives the exact causal root equations and the delay-map Jacobians. What is missing is a theorem that packages them into a finite tame branch family on a full excursion, rather than only at isolated times. This is the higher-dimensional replacement for the collinear root-sorting technology.

#### 3. Vector recapture margins

The 1D scaffold reduces the inner and outer turns to explicit inequalities
$$
\mathfrak M_{\mathrm{in}}>0
\qquad
\text{and}
\qquad
\mathfrak M_{\mathrm{out}}>0.
$$
The master-equation replacement must be a vector coercive margin that beats all escape channels, not merely a scalar outward radial speed.

#### 4. Coupled regime closure

The full theorem program must close a coupled algebraic and geometric regime in which:

- the local delayed geometry is tame,
- the recapture inequalities are strict,
- the one-cycle bounds fit inside a convex envelope,
- and the resulting return image stays inside the same tame domain.

This coupled closure problem should be stated honestly from the outset. It is where the global theorem will either succeed or fail.

### Recommended Next Regime

The most sensible continuation after the frozen collinear model is not the completely unconstrained many-body master equation. It is the first higher-dimensional regime in which line-order arguments fail but a strong symmetry reduction still survives.

The natural candidate is a reflection-symmetric planar binary with a codimension-one return section chosen to control both radial and tangential escape. That regime is still close enough to the collinear reference model to inherit much of the return-map architecture, but it is already far enough from the line to force genuinely new geometry.

The active working chapter for that bridge is now [Planar Bridge Closure](../../../../markdown/aaa/proof-programs/planar-bridge-closure.md). The present document remains the larger roadmap and dependency spine.

If that planar bridge regime also resists tame-envelope closure, then the obstruction will be informative: it will show exactly where the collinear proof architecture ceases to transport.

### First Planar Bridge Regime

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

### Raw Section and Envelope Hierarchy in the Planar Regime

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

### Planar Replacement Obligations

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

#### First theorem package: sectorized directional sorting

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

For each direction, distinguish the instantaneous directional phases
$$
\zeta^-_{\hat{\mathbf{u}}}(t)
\equiv
\mathbf{r}(t)\cdot\hat{\mathbf{u}}-c_f t,
\qquad
\zeta^+_{\hat{\mathbf{u}}}(t)
\equiv
\mathbf{r}(t)\cdot\hat{\mathbf{u}}+c_f t,
$$
from the automatic running envelopes
$$
\underline{\zeta}^-_{\hat{\mathbf{u}}}(t)
\equiv
\inf_{\theta\le t}\zeta^-_{\hat{\mathbf{u}}}(\theta),
\qquad
\overline{\zeta}^+_{\hat{\mathbf{u}}}(t)
\equiv
\sup_{\theta\le t}\zeta^+_{\hat{\mathbf{u}}}(\theta).
$$
The running infimum
$$
\underline{\zeta}^-_{\hat{\mathbf{u}}}
$$
is non-increasing by definition, and the running supremum
$$
\overline{\zeta}^+_{\hat{\mathbf{u}}}
$$
is non-decreasing by definition. The nontrivial theorem burden is therefore not monotonicity of those running envelopes. It is the stronger active-sector assertion that, on the windows where a delayed chord is actually active, the running envelope is achieved by the current time and the instantaneous phase has a strict derivative margin.

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

> **Target Proposition (Two-tier windowed directional monotonicity).**
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
> 3. these active subfamilies are stable on their windows: active chord directions stay a positive angular distance away from sector boundaries, except inside the later certified sector-boundary or fold tubes;
> 4. for every
>    $$
>    \hat{\mathbf{u}}_k\in \mathcal{U}_{\mathrm{in}},
>    \qquad
>    t\in I_{\mathrm{in}},
>    $$
>    the support function obeys
>    $$
>    \underline{\zeta}^-_{\hat{\mathbf{u}}_k}(t)
>    =
>    \zeta^-_{\hat{\mathbf{u}}_k}(t),
>    \qquad
>    \frac{d}{dt}\zeta^-_{\hat{\mathbf{u}}_k}(t)\le -\sigma_{\mathrm{in}};
>    $$
> 5. for every
>    $$
>    \hat{\mathbf{u}}_k\in \mathcal{U}_{\mathrm{ap}},
>    \qquad
>    t\in I_{\mathrm{ap}},
>    $$
>    one has
>    $$
>    \underline{\zeta}^-_{\hat{\mathbf{u}}_k}(t)
>    =
>    \zeta^-_{\hat{\mathbf{u}}_k}(t),
>    \qquad
>    \frac{d}{dt}\zeta^-_{\hat{\mathbf{u}}_k}(t)\le -\sigma_{\mathrm{ap}},
>    \qquad
>    \overline{\zeta}^+_{\hat{\mathbf{u}}_k}(t)
>    =
>    \zeta^+_{\hat{\mathbf{u}}_k}(t),
>    \qquad
>    \frac{d}{dt}\zeta^+_{\hat{\mathbf{u}}_k}(t)\ge \sigma_{\mathrm{ap}}.
>    $$
> 6. for inactive sector centers
>    $$
>    \hat{\mathbf{u}}_k\notin\mathcal{U}_{\mathrm{in}}
>    \quad\text{or}\quad
>    \hat{\mathbf{u}}_k\notin\mathcal{U}_{\mathrm{ap}},
>    $$
>    only the automatic running-envelope monotonicity is required. No strict derivative margin is imposed on transverse directions with no active branch on the corresponding window.

The first monotonicity statement is the planar replacement for the inbound ordered fall that, in the collinear chapter, feeds collapse and root control. The second is the higher-dimensional descendant of the late
$$
z
$$
-descent package: it separates the outgoing and incoming directional support levels on the apocenter window instead of relying on a single global scalar order.

This two-tier form is intentionally weaker than universal sectorwise descent. Tangential motion can make transverse sector centers move with the wrong instantaneous sign even while the active chord geometry remains controlled. The theorem target only asks for strict descent in the finite active sector subfamily
$$
\mathcal{U}_{\mathrm{in}}
\quad
\text{or}
\quad
\mathcal{U}_{\mathrm{ap}},
$$
and asks the certificate to prove that this subfamily does not migrate continuously around
$$
S^1
$$
during the window.

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
>    2M_{\mathrm{act},W}
>    \le
>    2M,
>    $$
>    where
>    $$
>    M_{\mathrm{act},W}
>    $$
>    is the number of active sector centers on the window
>    $$
>    W\in\{I_{\mathrm{in}},I_{\mathrm{ap}}\};
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

#### Second theorem package: deep-past sector relocation

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

#### Third theorem package: sectorwise cone transversality

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

#### Fourth theorem package: explicit planar seed packet

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

#### Fifth theorem package: bounded planar caustic transit

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

#### Sixth theorem package: unified vector recapture criteria

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

### Synthesis of the Reduced Planar Bridge

At this point the reduced-planar bridge layer is not treating the completely general planar master equation. It records a symmetry-reduced planar binary dependency map with:

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

#### Seventh theorem package: reduced planar tame-envelope closure

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
The price of this gauge reset is a reconstruction condition. A fixed point of
$$
P^\Pi_\eta
$$
is periodic in the reduced representative section, but in the fixed Euclidean void it reconstructs as
$$
\mathbf r(T^\Pi+\theta)
=
\mathcal{R}_{\Phi^\ast}^{-1}\mathbf r(\theta),
\qquad
\theta\in[-h,0].
$$
Thus the physical trajectory is an absolute periodic orbit only when the rotational holonomy is trivial:
$$
\mathcal{R}_{\Phi^\ast}=\mathrm{Id}.
$$
Without that additional condition, the result is a relative breather modulo the chosen
$$
SO(2)
$$
gauge.

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
Equivalently, the reduced planar bridge should use the same finite certificate convention as the collinear proof: a finite affine or sampled certificate defines the convex set, and the branch labels, Jacobian floors, memory-depth bounds, and caustic exclusions are consequences proved from that certificate.

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
> 2. the returned finite certificate implies the same sector labels, branch-count bound, and separation margin;
> 3. the returned finite certificate implies the same Jacobian floors
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

This is the self-map statement the entire bridge has been building toward. It says that after one full physical excursion and one gauge reset back to the reduced section, the same finite certificate remains valid and no envelope constant is lost.

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
> The corresponding reduced planar trajectory is a bounded relative breather of the dual-mollified master equation within the reflection-symmetric planar binary regime. It is an absolute periodic solution in the fixed Euclidean void only if the reconstructed rotational holonomy satisfies
> $$
> \mathcal{R}_{\Phi^\ast_\eta}=\mathrm{Id}.
> $$

This is the honest endpoint of the current bridge note. It is still conditional, but it is now conditional on one sharply identified reduced planar closure problem rather than on a diffuse collection of unresolved local lemmas.

### Precise Failure Alternative for the Planar Bridge

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

### Beyond the Reduced Planar Bridge

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

The burden growth is cumulative:

| Burden | Reduced planar binary | Unreduced planar binary | Many-body bridge |
| --- | --- | --- | --- |
| Section and gauge | one radius section plus one rotation reset | quotient chart with explicit $SE(2)$ selector and holonomy | atlas-level gauge selector with chart-stability theorem |
| Delayed-root topology | finite sector-labeled branch family | canonical finite branch graph with fold edges | finite active delay hypergraph |
| Deep-past control | sector relocation or exclusion | branch-graph provenance or exclusion | cluster-valued ancestry or exclusion |
| Recapture | one radial channel plus one angular leakage term | finite leakage-channel comparison with resonance control | finite escape-observable family with channel margins |
| Closure domain | closed convex tame envelope in one reduced chart | quotient-space convex envelope preserving graph and holonomy data | atlas-level convex core preserving hypergraph, ancestry, and recapture windows |

For that reason, the present chapter should be read as the first 2D bridge, not as the general planar theorem program. Only after these additional burdens are isolated and given their own theorem targets would it be honest to say that the work has moved beyond the reduced planar bridge.

#### First unreduced planar theorem targets

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

##### Section-and-gauge target for the first unreduced planar binary

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

> **Target Proposition (Holonomy reconstruction for quotient fixed points).**
> As in the reduced planar bridge, a fixed point of
> $$
> P^{\sharp}_{\eta}
> $$
> is first a quotient-space fixed point. Let the full-cycle gauge reset be represented by the Euclidean holonomy
> $$
> H_{\Psi^\ast}
> =
> (\mathbf a_{\Psi^\ast},\mathcal R_{\Psi^\ast})
> \in SE(2),
> $$
> where
> $$
> \mathbf a_{\Psi^\ast}
> $$
> is the translation removed by the selector and
> $$
> \mathcal R_{\Psi^\ast}
> $$
> is the rotation back to the canonical chord. The reconstructed physical motion is absolute periodic only if
> $$
> H_{\Psi^\ast}=(0,\mathrm{Id}).
> $$
> Otherwise the fixed point is a relative breather modulo
> $$
> SE(2).
> $$
>
> In symmetry-reduced regimes this condition may be forced by the symmetry itself. For example, the reflection-symmetric reduced planar bridge can force the rotational part to be
> $$
> \mathcal R_{\Psi^\ast}=\mathrm{Id}
> $$
> once the gauge is chosen compatibly with the reflection. In the unreduced planar bridge there is no such automatic cancellation. The absolute-periodic problem is therefore a separate finite-dimensional zero-holonomy reconstruction problem, with two effective holonomy components after the section-and-gauge constraints are imposed.

This proposition should be treated as part of every quotient-space Schauder capstone. Schauder on the quotient gives a relative breather; zero holonomy is an additional reconstruction condition, analogous in role to a characteristic multiplier condition in Floquet theory.

##### Finite branch-graph target for the unreduced planar bridge

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
should then be defined by one canonical convention.

- A vertex is one maximal simple local branch segment
  $$
  v=(\tau,k,\ell,m).
  $$
- The multiplicity label
  $$
  m
  $$
  is assigned by the source-time order of the simple roots inside the fixed type-sector-window cell after the fold tubes and sector-boundary tubes have been removed.
- Folds are represented as edges, not as additional vertices. A fold edge carries the fold-tube label, the incoming and outgoing local branch labels, and the parity data for the root-count jump.
- Continuation across adjacent windows is also represented by an edge. Thus a window-boundary fold is never represented by a vertex split; it is one labeled fold edge between the adjacent simple-branch vertices that enter and exit the certified tube.

With this convention, the graph is uniquely determined by a gauge-fixed history, the fixed window partition, the fixed sector atlas, and the listed caustic tubes: vertices are maximal connected components of the simple-root set after the controlled tubes are removed, and edges record the unique admissible continuation or fold transition through the adjacent tube.

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
> N_{\mathrm{mult}}^{\max},
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
>    N^{\sharp}_{\mathrm{br}}
>    \le
>    4M^{\sharp}L^{\sharp}N_{\mathrm{mult}}^{\max};
>    $$
>    here the factor
>    $$
>    4
>    $$
>    is the number of source-receiver chord types
>    $$
>    |\{1,2\}\times\{1,2\}|,
>    $$
>    and
>    $$
>    N_{\mathrm{mult}}^{\max}
>    $$
>    is the certified maximum number of simple root branches in one fixed type-sector-window cell;
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
>    is of exactly one of the following kinds under the canonical convention:
>    a continuation edge across adjacent windows,
>    a fold birth/death edge labeled by one caustic tube,
>    or one admissible branch-handoff edge labeled by the same tube;
> 5. outside the union of the caustic tubes the graph is locally constant in
>    $$
>    t,
>    $$
>    so no uncontrolled simultaneous fold accumulation or instantaneous infinite relabeling can occur along the cycle.
> 6. the graph construction is canonical: no admissible fold tube may be encoded alternatively as a vertex split, and the source-time ordering convention fixes the multiplicity labels.
>
> In particular, the active delayed-root topology of the unreduced planar binary is encoded by one finite graph rather than by an a priori continuum of chord directions.

This proposition is the unreduced-planar replacement for the reduced planar branch-count and branch-labeling package. The main difference is not merely higher notation. It is that the theorem now has to control branch continuation across several chord types and windows, not just uniqueness inside one scalar or sector-labeled family.

##### Deep-past provenance-or-exclusion target for the unreduced planar bridge

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

##### Multi-channel recapture target for the unreduced planar bridge

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

> **Target Hypothesis (Leakage-channel independence and resonance control).**
> The leakage-channel ceilings in the preceding force split are usable in the recapture margin only under one of two certified conditions:
> 1. **simultaneous pointwise ceiling:** the inequalities
>    $$
>    0\le \Lambda^{\sharp}_{\alpha}(t)\le \Theta^{\sharp}_{\alpha,\bullet}
>    $$
>    are proved on the same controlled tube, at the same times, for all
>    $$
>    \alpha=1,\dots,Q^{\sharp}_{\mathrm{esc}};
>    $$
> 2. **non-resonant channel decomposition:** the leakage subsystem obtained by linearizing the quotient dynamics along the candidate cycle has Floquet exponents or channel frequencies
>    $$
>    \omega_1,\ldots,\omega_{Q^{\sharp}_{\mathrm{esc}}}
>    $$
>    satisfying an explicit finite-order non-resonance gap
>    $$
>    |n\cdot\omega|
>    \ge
>    \gamma^{\sharp}_{\mathrm{res}}>0
>    \qquad
>    \text{for every }0\ne n\in\mathbb{Z}^{Q^{\sharp}_{\mathrm{esc}}},
>    \quad
>    |n|_1\le N^{\sharp}_{\mathrm{res}},
>    $$
>    or equivalently a monodromy certificate with non-resonant Floquet multipliers on the leakage block.
>
> If neither condition is certified, the scalar leakage budget
> $$
> \sum_{\alpha}\Theta^{\sharp}_{\alpha,\bullet}
> $$
> is not an admissible proof input. It must be replaced by a coupled leakage budget
> $$
> \Theta^{\sharp}_{\mathrm{coupled},\bullet}
> $$
> computed from the full leakage block, including possible parametric resonance between channels.

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
These displayed margins are the simultaneous-ceiling form. In the non-resonant averaged form, or in any case where the channels are only bounded after coupling, replace the sums by the certified coupled budgets
$$
\Theta^{\sharp}_{\mathrm{coupled,in}},
\qquad
\Theta^{\sharp}_{\mathrm{coupled,out}}.
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
That sum is proof-valid only when the preceding resonance-control hypothesis has been discharged. Otherwise the recapture criterion must consume the coupled leakage budget produced by the full leakage monodromy block.

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
   on the same windows, together with either simultaneous pointwise validity or the non-resonant leakage-block certificate.

##### Why the unreduced planar object is still called a breather

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

##### Unreduced-planar tame-envelope and closure targets

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
The point is again not to define the tame class by pointwise intersection of every branch-graph or provenance predicate. That would generally fail to preserve convexity. The correct theorem target is one finite certificate whose affine or sampled inequalities define a closed convex subset; the branch graph, provenance count, leakage channels, Jacobian floors, and recapture margins must then be proved from that certificate with uniform slack.

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
> 2. the returned finite certificate implies the same branch-graph bound, separation margin, provenance count, and leakage-channel count
>    $$
>    N^{\sharp}_{\mathrm{br}},
>    \qquad
>    \delta^{\sharp}_{\mathrm{sep}},
>    \qquad
>    P^{\sharp}_{\mathrm{prov}},
>    \qquad
>    Q^{\sharp}_{\mathrm{esc}};
>    $$
> 3. the returned finite certificate implies the same Jacobian floors
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
> The corresponding gauge-fixed trajectory is a bounded relative breather modulo the chosen
> $$
> SE(2)
> $$
> gauge. By Proposition `Holonomy reconstruction for quotient fixed points`, it reconstructs to an absolute periodic solution in the fixed Euclidean void only if the full-cycle holonomy satisfies
> $$
> H_{\Psi^\ast_\eta}=(0,\mathrm{Id}).
> $$

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

### Beyond the Unreduced Planar Binary

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

#### First planar three-body bridge regime

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

This seed is not charge-neutral:
$$
q_1+q_2+q_3=+\epsilon.
$$
It should therefore be read as a local nonneutral three-body subsystem, or as a compensated subsystem inside a larger neutral assembly whose compensating charge remains outside the reduced bridge model. A globally neutral many-body theorem would need a different seed, for example a neutral four-body packet, and should not be inferred from the present
$$
(+,-,+)
$$
three-body bridge.

This compensation is a dynamical hypothesis, not only an ontological interpretation. A nonneutral local subsystem may carry a long-wavelength radiation or reaction channel that slowly drains or injects energy relative to the local bridge variables. The three-body bridge must therefore use one of the following two conventions:

1. replace the seed by a globally neutral four-body packet, for example
   $$
   (+,-,+,-)
   $$
   in a quadrupole-like arrangement, before claiming a neutral many-body theorem;
2. keep the local
   $$
   (+,-,+)
   $$
   subsystem but add an external compensation budget
   $$
   E_{\mathrm{ext}}
   $$
   from the surrounding neutral assembly, and subtract that budget from every local recapture margin that could be weakened by uncompensated radiation or far-field reaction.

Under the second convention, every many-body margin below should be read in compensated form, for example
$$
\mathfrak{M}^{\mathrm{mb}}_{m,\bullet}
\quad\leadsto\quad
\mathfrak{M}^{\mathrm{mb}}_{m,\bullet}-E_{\mathrm{ext}},
$$
unless a sharper channel-specific external budget has been certified. Without one of these conventions, the planar three-body bridge is only a local nonneutral transport test and cannot be promoted to a globally neutral breather theorem.

This is the smallest regime in which the binary-relative chart fails for structural rather than cosmetic reasons. It preserves enough symmetry to permit a clean gauge discussion, but it already introduces the genuinely new burdens that the binary bridge cannot see:

- no single present chord canonically fixes orientation;
- each receiver sees more than one source family at once;
- delayed provenance can pass through changing pair or cluster organization;
- and recapture must dominate more than one outward channel.

The theorem objective is not yet a classification of all planar three-body bounded motions. It is the first transport test for the breather architecture itself:

> **Planar-three-body bridge objective.**
> Construct a history-space return map for the compensated local
> $$
> (+,-,+)
> $$
> planar three-body delayed subsystem and isolate a nonempty closed convex tame domain on which that return map is well defined. If this succeeds, the corresponding Schauder capstone becomes the first local many-body breather theorem in the master-equation stack. If it fails, the obstruction should be written down in section/gauge, hypergraph, ancestry, recapture, or atlas-closure terms. A globally neutral theorem is a later four-body-or-larger closure problem.

The package ladder below records the dependency map for a later many-body proof attempt. It should not be treated as active proof work until the collinear certificate chain has closed.

#### Seed-side leading-order geometry for the planar three-body bridge

Before tightening the full delay geometry, one should record one explicit planar seed family for which the leading partner attraction is already stronger than the obvious geometric leakage. That is the many-body analogue of the frozen 1D affine seed packet: it does not prove the breather by itself, but it shows that the first recapture margins are not vacuous.

Work in the center-of-mass chart and write
$$
\mathbf{x}_1
=
\frac{1}{2}\mathbf{a}-\frac{1}{3}\mathbf{b},
\qquad
\mathbf{x}_2
=
\frac{2}{3}\mathbf{b},
\qquad
\mathbf{x}_3
=
-\frac{1}{2}\mathbf{a}-\frac{1}{3}\mathbf{b}.
$$
These factors are the standard equal-mass Jacobi coordinates for the chosen labels:
$$
\mathbf{a}=\mathbf{x}_1-\mathbf{x}_3,
\qquad
\mathbf{b}=\mathbf{x}_2-\frac{\mathbf{x}_1+\mathbf{x}_3}{2},
\qquad
\mathbf{x}_1+\mathbf{x}_2+\mathbf{x}_3=0.
$$
Thus the factors
$$
-\frac{1}{3}\mathbf{b}
$$
in
$$
\mathbf{x}_1
\quad
\text{and}
\quad
\mathbf{x}_3
$$
are intentional: the same-sign outer pair lies on the base line with midpoint
$$
-\frac{1}{3}\mathbf{b},
$$
the opposite-sign body lies at
$$
\frac{2}{3}\mathbf{b},
$$
and the center of mass remains at the origin on the axis of symmetry.

Choose seed parameters
$$
A_\ast>0,
\qquad
B_\ast>0,
\qquad
u_{a,\mathrm{seed}}>0,
\qquad
u_{b,\mathrm{seed}}>0,
\qquad
V_{x,\mathrm{seed}}>0,
$$
and define the Jacobi seed history by
$$
\mathbf{a}_{\mathrm{seed}}(\theta)
\equiv
\bigl(A_\ast-u_{a,\mathrm{seed}}\theta\bigr)\mathbf{e}_1,
$$
$$
\mathbf{b}_{\mathrm{seed}}(\theta)
\equiv
-V_{x,\mathrm{seed}}\theta\,\mathbf{e}_1
+
\bigl(B_\ast-u_{b,\mathrm{seed}}\theta\bigr)\mathbf{e}_2,
\qquad
\theta\in[-h,0].
$$
Since
$$
\theta\le 0,
$$
the same-sign pair is farther apart in the recent past and the opposite-sign body sits higher in the recent past. At the section time
$$
\theta=0
$$
one has
$$
\mathbf{a}_{\mathrm{seed}}(0)=A_\ast\mathbf{e}_1,
\qquad
\mathbf{b}_{\mathrm{seed}}(0)=B_\ast\mathbf{e}_2,
\qquad
\dot{\mathbf{b}}_{\mathrm{seed}}(0)
=
-V_{x,\mathrm{seed}}\mathbf{e}_1-u_{b,\mathrm{seed}}\mathbf{e}_2,
$$
so the gauge conditions
$$
\mathbf{e}_2\cdot \mathbf{b}(0)>0,
\qquad
\mathbf{e}_1\cdot \dot{\mathbf{b}}(0)<0
$$
are automatic.

The associated seed body velocities are
$$
\dot{\mathbf{x}}_{1,\mathrm{seed}}
=
-\left(
\frac{u_{a,\mathrm{seed}}}{2}
-\frac{V_{x,\mathrm{seed}}}{3}
\right)\mathbf{e}_1
+\frac{u_{b,\mathrm{seed}}}{3}\mathbf{e}_2,
$$
$$
\dot{\mathbf{x}}_{2,\mathrm{seed}}
=
-\frac{2V_{x,\mathrm{seed}}}{3}\mathbf{e}_1
-\frac{2u_{b,\mathrm{seed}}}{3}\mathbf{e}_2,
$$
$$
\dot{\mathbf{x}}_{3,\mathrm{seed}}
=
\left(
\frac{u_{a,\mathrm{seed}}}{2}
+\frac{V_{x,\mathrm{seed}}}{3}
\right)\mathbf{e}_1
+\frac{u_{b,\mathrm{seed}}}{3}\mathbf{e}_2.
$$
Hence one sufficient sub-field-speed condition is
$$
U^{\mathrm{mb}}_{\mathrm{seed}}
\equiv
\max\left\{
\left\|
\dot{\mathbf{x}}_{1,\mathrm{seed}}
\right\|,
\left\|
\dot{\mathbf{x}}_{2,\mathrm{seed}}
\right\|,
\left\|
\dot{\mathbf{x}}_{3,\mathrm{seed}}
\right\|
\right\}
<c_f.
$$

At the section time define the common partner distance
$$
R_{\mathrm{pair}}
\equiv
\left\|
\frac{1}{2}A_\ast \mathbf{e}_1-B_\ast \mathbf{e}_2
\right\|
=
\sqrt{\frac{A_\ast^2}{4}+B_\ast^2}.
$$
Then the instantaneous Coulomb-like partner projections satisfy
$$
\ddot{\mathbf{a}}_{\mathrm{seed}}^{\mathrm{part}}
=
-\,\frac{\kappa\epsilon^2}{R_{\mathrm{pair}}^3}\,
\mathbf{a}_{\mathrm{seed}}(0),
$$
while the direct same-sign pair repulsion contributes
$$
\ddot{\mathbf{a}}_{\mathrm{seed}}^{\mathrm{same}}
=
\frac{2\kappa\epsilon^2}{A_\ast^3}\,
\mathbf{a}_{\mathrm{seed}}(0).
$$
Therefore the leading pair-axis seed forcing is
$$
\Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}
\equiv
-\hat{\mathbf{a}}_{\mathrm{seed}}(0)\cdot
\left(
\ddot{\mathbf{a}}_{\mathrm{seed}}^{\mathrm{part}}
+
\ddot{\mathbf{a}}_{\mathrm{seed}}^{\mathrm{same}}
\right)
=
\kappa\epsilon^2
\left(
\frac{A_\ast}{R_{\mathrm{pair}}^3}
-\frac{2}{A_\ast^2}
\right).
$$

Likewise, the leading midpoint-axis attraction from the opposite-sign body against the outer-pair midpoint is
$$
\ddot{\mathbf{b}}_{\mathrm{seed}}^{\mathrm{part}}
=
-\,\frac{3\kappa\epsilon^2}{R_{\mathrm{pair}}^3}\,
\mathbf{b}_{\mathrm{seed}}(0),
$$
so
$$
\Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}
\equiv
-\hat{\mathbf{b}}_{\mathrm{seed}}(0)\cdot
\ddot{\mathbf{b}}_{\mathrm{seed}}^{\mathrm{part}}
=
\frac{3\kappa\epsilon^2 B_\ast}{R_{\mathrm{pair}}^3}.
$$
At this symmetric seed, the direct same-sign pair force does not contribute to
$$
\mathbf{b}
$$
at leading order.

The leading geometric leakage ceilings at the section are equally explicit:
$$
L^{\mathrm{mb}}_{1,\mathrm{geom,seed}}
=
0,
$$
because
$$
\dot{\mathbf{a}}_{\mathrm{seed}}(0)
=
-u_{a,\mathrm{seed}}\mathbf{e}_1
$$
is parallel to
$$
\mathbf{a}_{\mathrm{seed}}(0),
$$
and
$$
L^{\mathrm{mb}}_{2,\mathrm{geom,seed}}
=
\frac{V_{x,\mathrm{seed}}^2}{B_\ast},
$$
because
$$
\hat{\mathbf{b}}_{\mathrm{seed}}(0)=\mathbf{e}_2
$$
while the transverse component of
$$
\dot{\mathbf{b}}_{\mathrm{seed}}(0)
$$
is exactly
$$
V_{x,\mathrm{seed}}\mathbf{e}_1.
$$

These formulas already show the right geometric sweet spot: choose
$$
B_\ast
$$
not too large compared with
$$
A_\ast,
$$
and choose
$$
V_{x,\mathrm{seed}}
$$
small relative to
$$
\kappa\epsilon^2 B_\ast/R_{\mathrm{pair}}^3.
$$
Then the first two inward channels are positive before any refined delay bookkeeping is invoked.

> **Target Proposition (Explicit symmetric planar-three-body seed packet with positive leading principal margins).**
> Fix
> $$
> A_\ast>0,
> \qquad
> B_\ast>0
> $$
> such that
> $$
> B_\ast^2
> <
> \left(
> 2^{-2/3}-\frac{1}{4}
> \right)
> A_\ast^2,
> \qquad
> B_\ast
> <
> \frac{\sqrt{3}}{2}A_\ast.
> $$
> Then:
> 1. the pair-axis seed attraction is strictly inward,
>    $$
>    \Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}>0;
>    $$
> 2. the midpoint-axis seed attraction is strictly inward,
>    $$
>    \Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}>0;
>    $$
> 3. the role gap at the seed is strictly positive,
>    $$
>    \|\mathbf{x}_{1,\mathrm{seed}}(0)\|
>    =
>    \|\mathbf{x}_{3,\mathrm{seed}}(0)\|
>    >
>    \|\mathbf{x}_{2,\mathrm{seed}}(0)\|;
>    $$
> 4. and if
>    $$
>    0<V_{x,\mathrm{seed}}
>    <
>    \sqrt{
>    \frac{3\kappa\epsilon^2 B_\ast^2}{2R_{\mathrm{pair}}^3}
>    },
>    $$
>    then the leading midpoint leakage satisfies
>    $$
>    L^{\mathrm{mb}}_{2,\mathrm{geom,seed}}
>    <
>    \frac{1}{2}\Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}.
>    $$
>
> Consequently the first two principal margins and the role-gap floor are nonvacuous on a nonempty open neighborhood of this seed, provided the delayed fold and deep-past ceilings are chosen smaller than the remaining slack.

> **Proof.**
> The inequality
> $$
> \Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}>0
> $$
> is equivalent to
> $$
> \frac{A_\ast}{R_{\mathrm{pair}}^3}
> >
> \frac{2}{A_\ast^2},
> $$
> which is
> $$
> R_{\mathrm{pair}}^3<\frac{A_\ast^3}{2}
> $$
> and therefore
> $$
> R_{\mathrm{pair}}^2<2^{-2/3}A_\ast^2.
> $$
> Since
> $$
> R_{\mathrm{pair}}^2=\frac{A_\ast^2}{4}+B_\ast^2,
> $$
> the stated bound on
> $$
> B_\ast
> $$
> is exactly the desired condition.
>
> The positivity of
> $$
> \Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}
> $$
> is immediate from
> $$
> B_\ast>0.
> $$
> The role-gap inequality becomes
> $$
> \frac{A_\ast^2}{4}+\frac{B_\ast^2}{9}
> >
> \frac{4B_\ast^2}{9},
> $$
> which is equivalent to
> $$
> B_\ast<\frac{\sqrt{3}}{2}A_\ast.
> $$
> Finally,
> $$
> L^{\mathrm{mb}}_{2,\mathrm{geom,seed}}
> =
> \frac{V_{x,\mathrm{seed}}^2}{B_\ast}
> <
> \frac{1}{2}\cdot
> \frac{3\kappa\epsilon^2 B_\ast}{R_{\mathrm{pair}}^3}
> =
> \frac{1}{2}\Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}
> $$
> is exactly the displayed upper bound on
> $$
> V_{x,\mathrm{seed}}.
> $$
> These inequalities are strict, so they persist on one nonempty
> $$
> C^1
> $$
> neighborhood of the seed history.

> **Target Corollary (Seed-neighborhood realization of the leading planar-three-body principal margins).**
> Under the hypotheses of the explicit symmetric seed proposition, there exists
> $$
> \varepsilon^{\mathrm{mb}}_{\mathrm{seed}}>0
> $$
> and a nonempty
> $$
> C^1
> $$
> neighborhood
> $$
> \mathcal{C}^{\mathrm{mb},\mathrm{seed}}_{A_\ast,B_\ast,\eta}
> $$
> of
> $$
> \Phi^{\mathrm{mb}}_{\mathrm{seed}}
> $$
> inside the gauge-fixed section such that every
> $$
> \Phi\in \mathcal{C}^{\mathrm{mb},\mathrm{seed}}_{A_\ast,B_\ast,\eta}
> $$
> retains:
> 1. the same-sign pair axis in one fixed narrow cone around
>    $$
>    \mathbf{e}_1;
>    $$
> 2. the opposite-sign midpoint axis in one fixed upper-half-plane cone;
> 3. a strictly positive role gap;
> 4. and strictly positive leading-order seed-side margins for
>    $$
>    \rho^{\mathrm{mb}}_1
>    \qquad
>    \text{and}
>    \qquad
>    \rho^{\mathrm{mb}}_2.
>    $$

This is the many-body analogue of the old seed-neighborhood realization step in the frozen 1D chapter. Its role is only to certify that the principal inward hierarchy is not attached to one isolated affine history, but persists on one genuine local seed packet from which the later delayed and hypergraph packages may start.

The remaining seed-side burden is to pass from these Coulomb-like proxy margins to the true delayed branch-sum law. On the affine seed this should be a perturbative step, because every emitter speed is strictly sub-field-speed and the recent history is exactly linear.

For the affine seed and its small
$$
C^1
$$
thickenings, denote by
$$
r^{\mathrm{inst}}_{ij}(t)
\equiv
\|\mathbf{x}_i(t)-\mathbf{x}_j(t)\|
$$
the instantaneous pair distances and by
$$
s_{ij}(t)
$$
the exact causal-delay partner/source times on the preserved seed-side branch families, whenever those branches exist on a short controlled window.

> **Lemma (Delayed seed-margin persistence on the symmetric planar seed packet).**
> Assume the explicit symmetric planar-three-body seed proposition and fix one seed-side neighborhood
> $$
> \mathcal{C}^{\mathrm{mb},\mathrm{seed}}_{A_\ast,B_\ast,\eta}
> $$
> with
> $$
> U^{\mathrm{mb}}_{\mathrm{seed}}<c_f.
> $$
> After replacing this neighborhood by a smaller nonempty seed packet if necessary, there exist:
> 1. a short controlled seed window
>    $$
>    [0,\tau^{\mathrm{mb}}_{\mathrm{seed}}],
>    $$
> 2. a finite branch-delay ceiling
>    $$
>    \Delta^{\mathrm{mb}}_{\mathrm{seed}},
>    $$
> 3. local velocity and acceleration tolerances
>    $$
>    \varepsilon_V,
>    \qquad
>    \varepsilon_A,
>    $$
>    satisfying
>    $$
>    \varepsilon_V+\varepsilon_A\Delta^{\mathrm{mb}}_{\mathrm{seed}}
>    \le
>    \min\left\{
>    U^{\mathrm{mb}}_{\mathrm{seed}},
>    \frac{c_f-U^{\mathrm{mb}}_{\mathrm{seed}}}{2}
>    \right\},
>    $$
> 4. a finite list of seed-side branch families
>    $$
>    \mathscr{B}^{\mathrm{mb}}_{\mathrm{seed}},
>    $$
> 5. and constants
>    $$
>    C^{\mathrm{mb}}_{\mathrm{delay}},
>    \qquad
>    C^{\mathrm{mb}}_{J},
>    \qquad
>    C^{\mathrm{mb}}_{\Lambda,1},
>    \qquad
>    C^{\mathrm{mb}}_{\Lambda,2}
>    $$
> depending only on the seed parameters and the local seed neighborhood,
>
> such that every history
> $$
> \Phi\in \mathcal{C}^{\mathrm{mb},\mathrm{seed}}_{A_\ast,B_\ast,\eta}
> $$
> satisfies, on that window and on the listed source intervals:
> 1. each active seed-side branch in
>    $$
>    \mathscr{B}^{\mathrm{mb}}_{\mathrm{seed}}
>    $$
>    is unique and simple;
> 2. the exact causal-delay distances obey
>    $$
>    \bigl|
>    r_{ij}(t;s_{ij}(t))
>    -
>    r^{\mathrm{inst}}_{ij}(t)
>    \bigr|
>    \le
>    C^{\mathrm{mb}}_{\mathrm{delay}}
>    \frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f}
>    r^{\mathrm{inst}}_{ij}(t);
>    $$
> 3. the exact causal Jacobians obey
>    $$
>    \bigl|
>    J_{ij}(t;s_{ij}(t))-1
>    \bigr|
>    \le
>    C^{\mathrm{mb}}_{J}
>    \frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f};
>    $$
> 4. the exact delayed principal inward terms satisfy
>    $$
>    \bigl|
>    \Lambda^{\mathrm{mb}}_1(t)-\Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}
>    \bigr|
>    \le
>    C^{\mathrm{mb}}_{\Lambda,1}
>    \frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f},
>    $$
>    $$
>    \bigl|
>    \Lambda^{\mathrm{mb}}_2(t)-\Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}
>    \bigr|
>    \le
>    C^{\mathrm{mb}}_{\Lambda,2}
>    \frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f};
>    $$
> 5. and therefore, if
>    $$
>    \Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}
>    >
>    2C^{\mathrm{mb}}_{\Lambda,1}\frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f},
>    \qquad
>    \Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}
>    >
>    2C^{\mathrm{mb}}_{\Lambda,2}\frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f},
>    $$
>    then the true delayed inward terms satisfy the uniform seed-side bounds
>    $$
>    \Lambda^{\mathrm{mb}}_1(t)\ge \frac{1}{2}\Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}>0,
>    \qquad
>    \Lambda^{\mathrm{mb}}_2(t)\ge \frac{1}{2}\Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}>0
>    $$
>    on
>    $$
>    [0,\tau^{\mathrm{mb}}_{\mathrm{seed}}].
>    $$

> **Proof.**
> Work first on the affine seed history. The seed-side branch list
> $$
> \mathscr{B}^{\mathrm{mb}}_{\mathrm{seed}}
> $$
> is chosen to be precisely the finite collection of source-receiver branches whose Coulomb-like contributions form
> $$
> \Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}
> \qquad
> \text{and}
> \qquad
> \Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}.
> $$
> For one such branch write
> $$
> \beta=(i,j),
> \qquad
> \Delta t_\beta(t)=t-s_\beta(t),
> $$
> and set
> $$
> g_\beta(t;s;\Phi)
> =
> \|\mathbf{x}_i(t;\Phi)-\mathbf{x}_j(s;\Phi)\|-c_f(t-s).
> $$
> On the affine seed, the source derivative is
> $$
> \partial_s g_\beta(t;s;\Phi_{\mathrm{seed}})
> =
> c_f-\dot{\mathbf{x}}_{j,\mathrm{seed}}\cdot
> \hat{\mathbf{r}}_\beta(t;s;\Phi_{\mathrm{seed}})
> \ge
> c_f-U^{\mathrm{mb}}_{\mathrm{seed}}
> >0.
> $$
> Hence every seed branch is simple. Since the seed branch set is finite and the seed roots stay in compact source subintervals inside
> $$
> [-h,0],
> $$
> the implicit-function theorem gives, after reducing
> $$
> \tau^{\mathrm{mb}}_{\mathrm{seed}}
> $$
> if necessary, one source-time graph
> $$
> s_{\beta,\mathrm{seed}}(t)
> $$
> for each
> $$
> \beta\in\mathscr{B}^{\mathrm{mb}}_{\mathrm{seed}}
> $$
> on
> $$
> [0,\tau^{\mathrm{mb}}_{\mathrm{seed}}].
> $$
> Define
> $$
> \Delta^{\mathrm{mb}}_{\mathrm{seed}}
> $$
> to dominate both the listed seed branch delays and the receiver-window length on this compact set.
> Shrink the seed packet so that these roots remain inside the same source intervals and so that, on those intervals,
> $$
> \|\dot{\mathbf{x}}_k(0;\Phi)-\dot{\mathbf{x}}_{k,\mathrm{seed}}(0)\|
> \le
> \varepsilon_V,
> \qquad
> \|\ddot{\mathbf{x}}_k(\theta;\Phi)\|
> \le
> \varepsilon_A
> $$
> for every body
> $$
> k
> $$
> and for almost every source time
> $$
> \theta.
> $$
> The local Lipschitz-velocity bound gives the uniform speed ceiling
> $$
> \|\dot{\mathbf{x}}_k(\theta;\Phi)\|
> \le
> U^{\mathrm{mb}}_{\mathrm{seed}}
> +
> \varepsilon_V
> +
> \varepsilon_A\Delta^{\mathrm{mb}}_{\mathrm{seed}}
> \le
> \frac{U^{\mathrm{mb}}_{\mathrm{seed}}+c_f}{2}
> <c_f,
> $$
> and it is also bounded by
> $$
> 2U^{\mathrm{mb}}_{\mathrm{seed}}
> $$
> for perturbative estimates in powers of
> $$
> U^{\mathrm{mb}}_{\mathrm{seed}}/c_f.
> $$
> Thus
> $$
> \partial_s g_\beta(t;s;\Phi)
> \ge
> c_f-
> \left(
> U^{\mathrm{mb}}_{\mathrm{seed}}
> +
> \varepsilon_V
> +
> \varepsilon_A\Delta^{\mathrm{mb}}_{\mathrm{seed}}
> \right)
> \equiv
> \nu^{\mathrm{mb}}_{\mathrm{seed}}
> >0.
> $$
> The defect
> $$
> g_\beta(t;s;\Phi)
> $$
> is therefore strictly increasing in source time on each listed source interval. The seed root persists by the implicit-function theorem, and strict monotonicity excludes any second root in the same seed-side interval. This proves uniqueness and simplicity for every branch in
> $$
> \mathscr{B}^{\mathrm{mb}}_{\mathrm{seed}}.
> $$
>
> The causal-delay length estimate follows from the root identity
> $$
> c_f\Delta t_\beta(t)
> =
> r_\beta(t;s_\beta(t))
> $$
> and the source displacement formula
> $$
> \mathbf{x}_j(t)-\mathbf{x}_j(s_\beta(t))
> =
> \dot{\mathbf{x}}_{j,\mathrm{seed}}(0)\Delta t_\beta(t)
> +
> O\!\left(
> \varepsilon_V\Delta t_\beta(t)
> +
> \varepsilon_A\Delta t_\beta(t)^2
> \right).
> $$
> Equivalently, with
> $$
> U_\ast
> \equiv
> U^{\mathrm{mb}}_{\mathrm{seed}}
> +
> \varepsilon_V
> +
> \varepsilon_A\Delta^{\mathrm{mb}}_{\mathrm{seed}},
> $$
> one has
> $$
> \bigl\|
> \mathbf{x}_j(t)-\mathbf{x}_j(s_\beta(t))
> \bigr\|
> \le
> U_\ast\Delta t_\beta(t).
> $$
> By the reverse triangle inequality,
> $$
> \bigl|
> r_\beta(t;s_\beta(t))
> -
> r^{\mathrm{inst}}_\beta(t)
> \bigr|
> \le
> U_\ast\Delta t_\beta(t)
> =
> \frac{U_\ast}{c_f}
> r_\beta(t;s_\beta(t)).
> $$
> Since
> $$
> r_\beta(t;s_\beta(t))
> \le
> r^{\mathrm{inst}}_\beta(t)
> +
> \frac{U_\ast}{c_f}
> r_\beta(t;s_\beta(t)),
> $$
> and
> $$
> U_\ast<c_f,
> $$
> it follows that
> $$
> r_\beta(t;s_\beta(t))
> \le
> \frac{1}{1-U_\ast/c_f}
> r^{\mathrm{inst}}_\beta(t).
> $$
> Combining the two inequalities gives
> $$
> \bigl|
> r_\beta(t;s_\beta(t))
> -
> r^{\mathrm{inst}}_\beta(t)
> \bigr|
> \le
> \frac{U_\ast/c_f}{1-U_\ast/c_f}
> r^{\mathrm{inst}}_\beta(t).
> $$
> The shrinkage condition
> $$
> \varepsilon_V+\varepsilon_A\Delta^{\mathrm{mb}}_{\mathrm{seed}}
> \le
> \min\left\{
> U^{\mathrm{mb}}_{\mathrm{seed}},
> \frac{c_f-U^{\mathrm{mb}}_{\mathrm{seed}}}{2}
> \right\}
> $$
> and the fixed strict gap
> $$
> U^{\mathrm{mb}}_{\mathrm{seed}}<c_f
> $$
> absorb the factor on the right into the advertised constant
> $$
> C^{\mathrm{mb}}_{\mathrm{delay}}
> \frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f}.
> $$
>
> The same speed ceiling gives the Jacobian estimate directly. For every listed branch,
> $$
> J_\beta(t;s_\beta(t))
> =
> 1-\frac{\dot{\mathbf{x}}_j(s_\beta(t))\cdot
> \hat{\mathbf{r}}_\beta(t;s_\beta(t))}{c_f},
> $$
> so
> $$
> \bigl|J_\beta(t;s_\beta(t))-1\bigr|
> \le
> \frac{U_\ast}{c_f}
> \le
> C^{\mathrm{mb}}_J
> \frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f}.
> $$
> In particular
> $$
> J_\beta(t;s_\beta(t))
> \ge
> 1-\frac{U_\ast}{c_f}
> =
> \frac{\nu^{\mathrm{mb}}_{\mathrm{seed}}}{c_f}
> >0,
> $$
> so the reciprocal Jacobian remains uniformly bounded on the seed packet.
>
> It remains to compare the projected branch sums with the seed projections. On the compact seed-side set just constructed, all instantaneous distances are bounded below by one positive number
> $$
> d^{\mathrm{mb}}_{\mathrm{seed}}>0,
> $$
> all causal Jacobians are bounded below by
> $$
> \nu^{\mathrm{mb}}_{\mathrm{seed}}/c_f,
> $$
> and the branch list is finite. The dual-mollified branch contribution is therefore a smooth function of
> $$
> \mathbf{r}_\beta,
> \qquad
> J_\beta^{-1},
> \qquad
> \hat{\mathbf{a}},
> \qquad
> \hat{\mathbf{b}},
> $$
> on this compact set. The causal-delay estimate controls the difference between delayed and instantaneous chords. The present-time drift over the short seed window satisfies
> $$
> \|\mathbf{x}_k(t)-\mathbf{x}_{k,\mathrm{seed}}(0)\|
> \le
> U_\ast\tau^{\mathrm{mb}}_{\mathrm{seed}},
> $$
> and the window was chosen so that
> $$
> \tau^{\mathrm{mb}}_{\mathrm{seed}}
> \le
> d^{\mathrm{mb}}_{\mathrm{seed}}/c_f.
> $$
> Thus the present-time axis drift and the causal-delay chord drift are both
> $$
> O\!\left(U^{\mathrm{mb}}_{\mathrm{seed}}/c_f\right)
> $$
> relative to the seed distances. The mean-value theorem on the compact branch-geometry set gives constants
> $$
> C^{\mathrm{mb}}_{\Lambda,1},
> \qquad
> C^{\mathrm{mb}}_{\Lambda,2}
> $$
> such that
> $$
> \bigl|
> \Lambda^{\mathrm{mb}}_1(t)-\Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}
> \bigr|
> \le
> C^{\mathrm{mb}}_{\Lambda,1}
> \frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f},
> $$
> $$
> \bigl|
> \Lambda^{\mathrm{mb}}_2(t)-\Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}
> \bigr|
> \le
> C^{\mathrm{mb}}_{\Lambda,2}
> \frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f}.
> $$
> Finally, if the two seed margins dominate twice these perturbation ceilings, subtracting the corresponding estimate gives
> $$
> \Lambda^{\mathrm{mb}}_1(t)\ge \frac{1}{2}\Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}>0,
> \qquad
> \Lambda^{\mathrm{mb}}_2(t)\ge \frac{1}{2}\Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}>0
> $$
> throughout
> $$
> [0,\tau^{\mathrm{mb}}_{\mathrm{seed}}],
> $$
> which is the claimed seed-side persistence.

> **Corollary (Delayed realization of the first seed-side principal margins).**
> Under the hypotheses of the delayed seed-margin persistence lemma, if
> $$
> \Lambda^{\mathrm{mb}}_{1,\mathrm{seed}}
> -
> 2C^{\mathrm{mb}}_{\Lambda,1}\frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f}
> >
> 0,
> $$
> $$
> \Lambda^{\mathrm{mb}}_{2,\mathrm{seed}}
> -
> 2C^{\mathrm{mb}}_{\Lambda,2}\frac{U^{\mathrm{mb}}_{\mathrm{seed}}}{c_f}
> >
> 2L^{\mathrm{mb}}_{2,\mathrm{geom,seed}},
> $$
> and the seed-side fold and deep-past ceilings are smaller than the remaining slack, then the true delayed principal margins for
> $$
> \rho^{\mathrm{mb}}_1
> \qquad
> \text{and}
> \qquad
> \rho^{\mathrm{mb}}_2
> $$
> are strictly positive on the first seed-side controlled window.
>
> **Proof.**
> The delayed seed-margin persistence lemma gives positive lower bounds for the two leading seed-side inward terms after subtracting the causal-delay perturbation ceilings. The remaining fold and deep-past contributions enter the principal-margin inequalities only through their stated ceilings. If those ceilings are smaller than the remaining slack in the two displayed inequalities, subtracting them leaves both principal margins strictly positive on the same controlled seed window.

This is the missing bridge from the explicit geometric seed packet to the real delayed master equation. Once this perturbative upgrade is available, the many-body seed no longer lives only in the Coulomb-like proxy model; it enters the exact branch-sum dynamics with quantitative slack.

This is the first genuine many-body seed-side margin calculation in the chapter. It does not yet prove the full delayed recapture theorem, but it identifies one concrete planar geometry in which the desired inward hierarchy is already visible in the bare Jacobi dynamics.

#### First many-body theorem package: section and gauge fixing on planar shape space

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

#### Second many-body theorem package: quantitative branch regularity and no-accumulation

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
Write
$$
\mathbf{r}_{ij}(t;s)\equiv \mathbf{x}_i(t)-\mathbf{x}_j(s),
\qquad
r_{ij}(t;s)\equiv \|\mathbf{r}_{ij}(t;s)\|,
\qquad
\hat{\mathbf{r}}_{ij}(t;s)\equiv \frac{\mathbf{r}_{ij}(t;s)}{r_{ij}(t;s)}.
$$
Then
$$
\partial_s g_{ij}(t;s)
=
c_f-\dot{\mathbf{x}}_j(s)\cdot \hat{\mathbf{r}}_{ij}(t;s),
$$
$$
\partial_t g_{ij}(t;s)
=
\dot{\mathbf{x}}_i(t)\cdot \hat{\mathbf{r}}_{ij}(t;s)-c_f,
$$
$$
\partial_s^2 g_{ij}(t;s)
=
-\ddot{\mathbf{x}}_j(s)\cdot \hat{\mathbf{r}}_{ij}(t;s)
+\frac{
\|\dot{\mathbf{x}}_j(s)\|^2-
\big(\dot{\mathbf{x}}_j(s)\cdot \hat{\mathbf{r}}_{ij}(t;s)\big)^2
}{
r_{ij}(t;s)
},
$$
and
$$
\partial_s^3 g_{ij}(t;s)
$$
is a finite linear combination of terms built from
$$
\dddot{\mathbf{x}}_j(s),
\qquad
\dot{\mathbf{x}}_j(s),
\qquad
\ddot{\mathbf{x}}_j(s),
\qquad
r_{ij}(t;s)^{-1},
\qquad
r_{ij}(t;s)^{-2},
$$
so it is controlled by the same
$$
U_{\max},
\quad
A_{\max},
\quad
L_A,
\quad
d_{\min}
$$
envelope.
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

> **Lemma (Uniform isolation of admissible folds).**
> Fix one receiver-source family
> $$
> (i,j)
> $$
> and one admissible fold
> $$
> (t,s_\ast)
> $$
> with
> $$
> \partial_s g_{ij}(t;s_\ast)=0,
> \qquad
> |\partial_s^2 g_{ij}(t;s_\ast)|\ge \gamma_{\mathrm{fold}}>0.
> $$
> If
> $$
> |\partial_s^3 g_{ij}(t;s)|\le C^{\mathrm{mb}}_{3,g}
> $$
> on the corresponding fold tube, then
> $$
> \partial_s g_{ij}(t;s)\neq 0
> $$
> for every
> $$
> 0<|s-s_\ast|<\delta_{\mathrm{fold}},
> \qquad
> \delta_{\mathrm{fold}}
> \equiv
> \frac{\gamma_{\mathrm{fold}}}{C^{\mathrm{mb}}_{3,g}}.
> $$
> In particular, two distinct fold roots for the same receiver-source family in the same receiver-time slice cannot have source-time separation smaller than
> $$
> \delta_{\mathrm{fold}}.
> $$
>
> **Proof.**
> Taylor-expand
> $$
> \partial_s g_{ij}(t;s)
> $$
> about
> $$
> s=s_\ast.
> $$
> Since
> $$
> \partial_s g_{ij}(t;s_\ast)=0,
> $$
> one has
> $$
> \partial_s g_{ij}(t;s)
> =
> \partial_s^2 g_{ij}(t;s_\ast)(s-s_\ast)
> +
> \frac{1}{2}\partial_s^3 g_{ij}(t;\xi_s)(s-s_\ast)^2
> $$
> for some
> $$
> \xi_s
> $$
> between
> $$
> s
> $$
> and
> $$
> s_\ast.
> $$
> Therefore
> $$
> |\partial_s g_{ij}(t;s)|
> \ge
> |s-s_\ast|
> \left(
> \gamma_{\mathrm{fold}}
> -
> \frac{1}{2}C^{\mathrm{mb}}_{3,g}|s-s_\ast|
> \right),
> $$
> and the bracket stays strictly positive throughout the stated interval.

> **Lemma (Uniform receiver-time passage through admissible folds).**
> Fix one admissible fold
> $$
> (t_\ast,s_\ast)
> $$
> and assume, in addition, that the receiver-time derivative is transversal there:
> $$
> |\partial_t g_{ij}(t_\ast;s_\ast)|\ge \chi_{\mathrm{fold}}>0.
> $$
> Let
> $$
> s_{\mathrm{fold}}(t)
> $$
> be the local fold sheet obtained from
> $$
> \partial_s g_{ij}(t;s_{\mathrm{fold}}(t))=0
> $$
> by the curvature floor, and define the scalar fold-passage function
> $$
> G_{\mathrm{fold}}(t)
> \equiv
> g_{ij}(t;s_{\mathrm{fold}}(t)).
> $$
> If
> $$
> |\ddot{G}_{\mathrm{fold}}(t)|\le C^{\mathrm{mb}}_{2,tg}
> $$
> on the corresponding controlled fold tube, then the same receiver-source family cannot produce a second fold event with receiver-time separation smaller than
> $$
> \delta_{\mathrm{fold},t}
> \equiv
> \frac{\chi_{\mathrm{fold}}}{C^{\mathrm{mb}}_{2,tg}}.
> $$
>
> **Proof.**
> The curvature floor gives
> $$
> \partial_s^2 g_{ij}(t_\ast;s_\ast)\neq 0,
> $$
> so the implicit-function theorem gives the local fold sheet
> $$
> s_{\mathrm{fold}}(t).
> $$
> A receiver-time fold passage occurs exactly at a zero of
> $$
> G_{\mathrm{fold}}(t).
> $$
> At the given fold,
> $$
> \dot{G}_{\mathrm{fold}}(t_\ast)
> =
> \partial_t g_{ij}(t_\ast;s_\ast)
> +
> \partial_s g_{ij}(t_\ast;s_\ast)\dot{s}_{\mathrm{fold}}(t_\ast)
> =
> \partial_t g_{ij}(t_\ast;s_\ast),
> $$
> hence
> $$
> |\dot{G}_{\mathrm{fold}}(t_\ast)|\ge \chi_{\mathrm{fold}}.
> $$
> Taylor expansion gives, for some
> $$
> \xi_t
> $$
> between
> $$
> t
> $$
> and
> $$
> t_\ast,
> $$
> $$
> \dot{G}_{\mathrm{fold}}(t)
> =
> \dot{G}_{\mathrm{fold}}(t_\ast)
> +
> \ddot{G}_{\mathrm{fold}}(\xi_t)(t-t_\ast).
> $$
> Therefore
> $$
> |\dot{G}_{\mathrm{fold}}(t)|
> \ge
> \chi_{\mathrm{fold}}-C^{\mathrm{mb}}_{2,tg}|t-t_\ast|,
> $$
> which stays strictly positive whenever
> $$
> 0<|t-t_\ast|<\chi_{\mathrm{fold}}/C^{\mathrm{mb}}_{2,tg}.
> $$
> Thus
> $$
> G_{\mathrm{fold}}
> $$
> is strictly monotone throughout that receiver-time interval and cannot have a second zero there. Therefore the same fold family cannot complete a second receiver-time passage through a fold inside that interval.

> **Proposition (Quantitative no-accumulation of many-body delay events).**
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
> 4. every admissible fold is also transversal in receiver time:
>    $$
>    |\partial_t g_{ij}(t_\ast;s_\ast)|\ge \chi_{\mathrm{fold}}>0,
>    $$
>    and the controlled cycle carries one receiver-time fold-passage ceiling
>    $$
>    |\ddot{G}_{\mathrm{fold}}(t)|\le C^{\mathrm{mb}}_{2,tg}
>    $$
>    on each local fold sheet
>    $$
>    G_{\mathrm{fold}}(t)=g_{ij}(t;s_{\mathrm{fold}}(t)).
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
> \qquad
> \chi_{\mathrm{fold}},
> \qquad
> C^{\mathrm{mb}}_{2,tg},
> $$
> such that:
> 1. two distinct fold roots for the same receiver-source family in one receiver-time slice cannot occur with source-time separation smaller than
>    $$
>    \Delta\tau_{\mathrm{evt}};
>    $$
> 2. two fold passages for the same receiver-source family are separated in receiver time by at least
>    $$
>    \Delta\tau_{\mathrm{evt}};
>    $$
> 3. sector-boundary crossings and admissible source-cluster exchanges are likewise separated by at least
>    $$
>    \Delta\tau_{\mathrm{evt}}
>    $$
>    along every controlled branch family;
> 4. hence no fold, relabeling, or exchange event can accumulate in finite time on the controlled cycle;
> 5. consequently the total number of admissible event hyperedges on one cycle is bounded by
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

One admissible quantitative choice is
$$
\Delta\tau_{\mathrm{evt}}
\equiv
\min\left\{
\frac{\gamma_{\mathrm{fold}}}{C^{\mathrm{mb}}_{3,g}},
\frac{\chi_{\mathrm{fold}}}{C^{\mathrm{mb}}_{2,tg}},
\frac{\nu_J^{\mathrm{mb}}}{2C^{\mathrm{mb}}_{2,g}},
\Delta\tau_{\mathrm{sec}},
\Delta\tau_{\mathrm{exc}}
\right\},
$$
where
$$
\Delta\tau_{\mathrm{sec}},
\qquad
\Delta\tau_{\mathrm{exc}}
$$
are the corresponding sector-boundary and admissible exchange isolation scales produced by the same derivative hierarchy. The first two terms are the source-time and receiver-time fold-isolation scales. The third term is the uniform simple-branch persistence scale away from fold tubes: if
$$
|\partial_s g_{ij}(t;s_0)|\ge \nu_J^{\mathrm{mb}},
$$
then
$$
|\partial_s g_{ij}(t;s)|\ge \frac{1}{2}\nu_J^{\mathrm{mb}}
$$
whenever
$$
|s-s_0|<\frac{\nu_J^{\mathrm{mb}}}{2C^{\mathrm{mb}}_{2,g}}.
$$

> **Corollary (Finite event count on one controlled cycle).**
> Under the hypotheses of the quantitative no-accumulation proposition,
> $$
> N^{\mathrm{mb}}_{\mathrm{edge}}
> \le
> \left\lceil \frac{T_{\mathrm{cyc}}}{\Delta\tau_{\mathrm{evt}}}\right\rceil
> N^{\mathrm{mb}}_{\mathrm{fam}},
> $$
> so every admissible fold, relabeling, or exchange family is finite on one controlled cycle.

The remaining local input is simple-branch persistence away from fold tubes.

> **Lemma (Uniform persistence of simple branches away from fold tubes).**
> Fix one receiver-source family
> $$
> (i,j)
> $$
> and one point
> $$
> (t,s_0)
> $$
> outside the controlled fold tubes with
> $$
> |\partial_s g_{ij}(t;s_0)|\ge \nu_J^{\mathrm{mb}}.
> $$
> If
> $$
> |\partial_s^2 g_{ij}(t;s)|\le C^{\mathrm{mb}}_{2,g}
> $$
> on the corresponding branch neighborhood, then
> $$
> |\partial_s g_{ij}(t;s)|\ge \frac{1}{2}\nu_J^{\mathrm{mb}}
> $$
> whenever
> $$
> |s-s_0|<\delta_{\mathrm{simp}},
> \qquad
> \delta_{\mathrm{simp}}
> \equiv
> \frac{\nu_J^{\mathrm{mb}}}{2C^{\mathrm{mb}}_{2,g}}.
> $$
>
> **Proof.**
> By the mean-value theorem,
> $$
> |\partial_s g_{ij}(t;s)-\partial_s g_{ij}(t;s_0)|
> \le
> C^{\mathrm{mb}}_{2,g}|s-s_0|.
> $$
> So on the stated interval one has
> $$
> |\partial_s g_{ij}(t;s)|
> \ge
> \nu_J^{\mathrm{mb}}-C^{\mathrm{mb}}_{2,g}|s-s_0|
> \ge
> \frac{1}{2}\nu_J^{\mathrm{mb}}.
> $$

The remaining event types are not detected by
$$
\partial_s g_{ij}=0
$$
alone, so their proof burden should also be stated explicitly. For each fixed branch family in one atlas chart, let
$$
\Theta_{\mathrm{sec}}(t)
$$
denote the signed distance of the active direction to the nearest sector boundary, and let
$$
\Theta_{\mathrm{exc}}(t)
$$
denote the signed gap function that distinguishes the currently active admissible source-cluster channel from the next admissible exchange channel in the same local event block. On the controlled cycle these should satisfy one derivative hierarchy
$$
|\dot{\Theta}_{\mathrm{sec}}(t)|\le C^{\mathrm{mb}}_{1,\mathrm{sec}},
\qquad
|\ddot{\Theta}_{\mathrm{sec}}(t)|\le C^{\mathrm{mb}}_{2,\mathrm{sec}},
$$
$$
|\dot{\Theta}_{\mathrm{exc}}(t)|\le C^{\mathrm{mb}}_{1,\mathrm{exc}},
\qquad
|\ddot{\Theta}_{\mathrm{exc}}(t)|\le C^{\mathrm{mb}}_{2,\mathrm{exc}},
$$
together with transversality floors at admissible relabeling and exchange events:
$$
|\dot{\Theta}_{\mathrm{sec}}(t_\ast)|\ge \gamma_{\mathrm{sec}}>0,
\qquad
|\dot{\Theta}_{\mathrm{exc}}(t_\ast)|\ge \gamma_{\mathrm{exc}}>0.
$$
These are the sector and exchange analogues of the fold-curvature floor. Under those hypotheses one may define
$$
\Delta\tau_{\mathrm{sec}}
\equiv
\frac{\gamma_{\mathrm{sec}}}{C^{\mathrm{mb}}_{2,\mathrm{sec}}},
\qquad
\Delta\tau_{\mathrm{exc}}
\equiv
\frac{\gamma_{\mathrm{exc}}}{C^{\mathrm{mb}}_{2,\mathrm{exc}}},
$$
and the same Taylor argument shows that sector relabelings and admissible exchanges are isolated in cycle time by at least those scales.
Along any active branch away from the fold tubes one also has
$$
\dot{s}(t)
=
-\frac{\partial_t g_{ij}(t;s(t))}{\partial_s g_{ij}(t;s(t))},
$$
so the simple-branch persistence lemma supplies the denominator floor needed to keep
$$
\dot{s}(t)
$$
uniformly bounded there. That is the analytic input behind the bounded first and second derivatives of
$$
\Theta_{\mathrm{sec}}(t),
\qquad
\Theta_{\mathrm{exc}}(t)
$$
on the corresponding branch segments.

> **Proof.**
> Fix one controlled cycle and one admissible receiver-source-sector family.
>
> 1. **Fold isolation.**
>    For each admissible fold
>    $$
>    (t,s_\ast),
>    $$
>    the source-time fold-isolation lemma yields one local branch parameterization of the fold tube, while the receiver-time passage lemma yields a forbidden cycle-time interval
>    $$
>    (t_\ast-\delta_{\mathrm{fold},t},\,t_\ast+\delta_{\mathrm{fold},t})
>    $$
>    containing no second fold event of the same family. Hence fold events for that family are discrete in receiver time with separation at least
>    $$
>    \delta_{\mathrm{fold},t}.
>    $$
>
> 2. **Simple-branch persistence between folds.**
>    Outside the union of those fold neighborhoods, the Jacobian floor
>    $$
>    |\partial_s g_{ij}|\ge \nu_J^{\mathrm{mb}}
>    $$
>    and the simple-branch persistence lemma imply that every active root branch remains uniformly transversal on intervals of source-time size
>    $$
>    \delta_{\mathrm{simp}}
>    =
>    \frac{\nu_J^{\mathrm{mb}}}{2C^{\mathrm{mb}}_{2,g}}.
>    $$
>    In particular, no hidden tangency can arise between two successive fold neighborhoods.
>
> 3. **Sector-event isolation.**
>    On each active branch family, a sector relabeling occurs precisely when
>    $$
>    \Theta_{\mathrm{sec}}(t)=0.
>    $$
>    The sector transversality floor
>    $$
>    |\dot{\Theta}_{\mathrm{sec}}(t_\ast)|\ge \gamma_{\mathrm{sec}}
>    $$
>    and the second-derivative bound
>    $$
>    |\ddot{\Theta}_{\mathrm{sec}}(t)|\le C^{\mathrm{mb}}_{2,\mathrm{sec}}
>    $$
>    imply, by the same Taylor argument, that two successive sector relabelings on the same branch family are separated by at least
>    $$
>    \Delta\tau_{\mathrm{sec}}.
>    $$
>
> 4. **Exchange-event isolation.**
>    Likewise, an admissible source-cluster exchange occurs only when
>    $$
>    \Theta_{\mathrm{exc}}(t)=0.
>    $$
>    The exchange transversality floor
>    $$
>    |\dot{\Theta}_{\mathrm{exc}}(t_\ast)|\ge \gamma_{\mathrm{exc}}
>    $$
>    and the derivative bound
>    $$
>    |\ddot{\Theta}_{\mathrm{exc}}(t)|\le C^{\mathrm{mb}}_{2,\mathrm{exc}}
>    $$
>    imply separation by at least
>    $$
>    \Delta\tau_{\mathrm{exc}}.
>    $$
>
> 5. **Common event gap.**
>    Set
>    $$
>    \Delta\tau_{\mathrm{evt}}
>    \equiv
>    \min\left\{
>    \delta_{\mathrm{fold}},
>    \delta_{\mathrm{fold},t},
>    \delta_{\mathrm{simp}},
>    \Delta\tau_{\mathrm{sec}},
>    \Delta\tau_{\mathrm{exc}}
>    \right\}.
>    $$
>    Then no admissible fold, hidden Jacobian loss, sector relabeling, or admissible exchange can recur within cycle-time separation smaller than
>    $$
>    \Delta\tau_{\mathrm{evt}}.
>    $$
>
> 6. **Finite event count.**
>    The gauge chart and directional atlas allow only finitely many receiver-source-sector families
>    $$
>    N^{\mathrm{mb}}_{\mathrm{fam}}.
>    $$
>    Since each family contributes at most
>    $$
>    \lceil T_{\mathrm{cyc}}/\Delta\tau_{\mathrm{evt}}\rceil
>    $$
>    admissible events on one cycle, the total number of admissible hyperedges is bounded by
>    $$
>    N^{\mathrm{mb}}_{\mathrm{edge}}
>    \le
>    \left\lceil \frac{T_{\mathrm{cyc}}}{\Delta\tau_{\mathrm{evt}}}\right\rceil
>    N^{\mathrm{mb}}_{\mathrm{fam}}.
>    $$
>    This proves the proposition.

This is the missing analytic bridge from local well-posedness to finite combinatorics. Without it, the later hypergraph package is only suggestive bookkeeping rather than a theorem-level object.

#### Third many-body theorem package: bounded many-body caustic transit and fold ceilings

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

The first proof-oriented step is to reduce every admissible fold tube to one quantitative normal form.

> **Lemma (Fold-tube normal form with quantitative Jacobian control).**
> Fix one admissible Type II or Type III fold tube
> $$
> W^{\mathrm{mb}}_{\mathrm{fold}}(\mathsf{e})
> $$
> and one participating branch family
> $$
> (i,j,s(t)).
> $$
> Assume the no-accumulation derivative hierarchy, the fold-curvature floor
> $$
> \gamma_{\mathrm{fold}}>0,
> $$
> and the branch-separation floor
> $$
> \delta^{\mathrm{mb}}_{\mathrm{sep}}>0.
> $$
> Then after translating the fold center to
> $$
> (t_\ast,s_\ast)
> $$
> and restricting to a sufficiently small controlled tube, there exists a local source parameter
> $$
> u=s-s_\ast
> $$
> such that
> $$
> J_{ij}(t;s)
> =
> \partial_s g_{ij}(t;s)
> =
> \alpha_{ij}(t)\,u
> +
> \mathcal{R}_{ij}(t,u),
> $$
> with
> $$
> |\alpha_{ij}(t)|\ge \frac{1}{2}\gamma_{\mathrm{fold}},
> \qquad
> |\mathcal{R}_{ij}(t,u)|\le C^{\mathrm{mb}}_{3,g}|u|^2
> $$
> throughout the tube.
> Consequently,
> $$
> |J_{ij}(t;s)|
> \gtrsim
> \gamma_{\mathrm{fold}}\,|u|
> $$
> away from the fold center, with constants depending only on
> $$
> \gamma_{\mathrm{fold}}
> \qquad
> \text{and}
> \qquad
> C^{\mathrm{mb}}_{3,g}.
> $$

> **Proof.**
> Translate the fold center to
> $$
> (t_\ast,s_\ast)
> $$
> and write
> $$
> u=s-s_\ast.
> $$
> Since
> $$
> \partial_s g_{ij}(t_\ast;s_\ast)=0
> $$
> and
> $$
> |\partial_s^2 g_{ij}(t_\ast;s_\ast)|\ge \gamma_{\mathrm{fold}},
> $$
> Taylor expansion in
> $$
> s
> $$
> gives
> $$
> \partial_s g_{ij}(t;s)
> =
> \partial_s^2 g_{ij}(t;s_\ast)\,u
> +
> \mathcal{R}_{ij}(t,u),
> $$
> with remainder satisfying
> $$
> |\mathcal{R}_{ij}(t,u)|
> \le
> C^{\mathrm{mb}}_{3,g}|u|^2.
> $$
> Define
> $$
> \alpha_{ij}(t)\equiv \partial_s^2 g_{ij}(t;s_\ast).
> $$
> By continuity in
> $$
> t
> $$
> and by shrinking the receiver-time tube if necessary, the fold-curvature floor persists:
> $$
> |\alpha_{ij}(t)|\ge \frac{1}{2}\gamma_{\mathrm{fold}}.
> $$
> Choose the source-width of the tube so that
> $$
> C^{\mathrm{mb}}_{3,g}|u|
> \le
> \frac{1}{4}\gamma_{\mathrm{fold}}
> $$
> there. Then
> $$
> |J_{ij}(t;s)|
> =
> |\alpha_{ij}(t)u+\mathcal{R}_{ij}(t,u)|
> \ge
> \frac{1}{4}\gamma_{\mathrm{fold}}|u|,
> $$
> which is the required normal form and lower bound.

This is the exact local reduction needed for the dual-mollified transit bound: every admissible many-body fold tube behaves like one controlled one-dimensional Jacobian zero, up to uniformly bounded error.

Once that reduction is available, the actual impulse bound becomes a finite-dimensional bookkeeping problem.

> **Lemma (Channelwise bounded impulse across one admissible fold block).**
> Under the same hypotheses, fix one principal channel
> $$
> m\in\{1,2,3,4\}.
> $$
> Then there exists a constant
> $$
> \mathfrak{F}^{\mathrm{mb}}_m
> \equiv
> \mathfrak{F}^{\mathrm{mb}}_m
> \big(
> \eta,
> \epsilon_c,
> \gamma_{\mathrm{fold}},
> \delta^{\mathrm{mb}}_{\mathrm{sep}},
> U_{\max},
> A_{\max}
> \big)
> <\infty
> $$
> such that for every admissible fold block
> $$
> \mathsf{e}
> $$
> one has
> $$
> \left|
> \int_{W^{\mathrm{mb}}_{\mathrm{fold}}(\mathsf{e})}
> \Pi_m(t)\cdot
> \ddot{\mathbf{X}}(t)\,dt
> \right|
> \le
> \mathfrak{F}^{\mathrm{mb}}_m\,
> M_{\mathrm{loc}}(\mathsf{e}),
> $$
> where
> $$
> M_{\mathrm{loc}}(\mathsf{e})\in\{1,2,3\}
> $$
> is the local admissible multiplicity of the Type II or Type III event block.
>
> In particular, if
> $$
> M_{\max}^{\mathrm{mb}}
> \equiv
> \max_{\mathsf{e}\in\mathscr{E}^{\mathrm{mb}}_{\mathrm{br}}}
> M_{\mathrm{loc}}(\mathsf{e}),
> $$
> then the universal fold ceiling
> $$
> F^{\mathrm{mb}}_m
> \equiv
> \mathfrak{F}^{\mathrm{mb}}_m M_{\max}^{\mathrm{mb}}
> $$
> is finite.

> **Proof.**
> For a Type II fold, insert the fold-tube normal form into the dual-mollified branch kernel. After the local change of variable from
> $$
> s
> $$
> to
> $$
> u,
> $$
> the singular factor is reduced to the same one-dimensional model already controlled in the earlier bridge packages, with all remaining distance and projection factors bounded by the
> $$
> d_{\min},
> \qquad
> U_{\max},
> \qquad
> A_{\max}
> $$
> envelope.
>
> For a Type III fold block, sum over the finitely many participating branch families. The branch-separation floor excludes uncontrolled secondary collisions away from the common fold center, and the admissible event alphabet bounds the local multiplicity by
> $$
> M_{\mathrm{loc}}(\mathsf{e})\le 3.
> $$
> So the total channelwise impulse is bounded by a finite sum of the same controlled one-dimensional transit integrals.

> **Proposition (Bounded dual-mollified caustic transit for simple and shared-body folds).**
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

More concretely, one may take
$$
F^{\mathrm{mb}}_m
\equiv
\mathfrak{F}^{\mathrm{mb}}_m M_{\max}^{\mathrm{mb}},
$$
where
$$
\mathfrak{F}^{\mathrm{mb}}_m
$$
is the single-branch transit constant from the previous lemma and
$$
M_{\max}^{\mathrm{mb}}\le 3
$$
is the maximal admissible local fold multiplicity in the Type II / Type III event alphabet.

The proof is written one local fold block at a time.

> **Lemma (Type II fold-tube transit estimate).**
> Fix one admissible Type II fold tube
> $$
> W^{\mathrm{mb}}_{\mathrm{fold}}(\mathsf{e})
> $$
> and one principal channel
> $$
> m\in\{1,2,3,4\}.
> $$
> Under the fold-tube normal form, the corresponding branch contribution to the channelwise impulse satisfies
> $$
> \left|
> \int_{W^{\mathrm{mb}}_{\mathrm{fold}}(\mathsf{e})}
> \Pi_m(t)\cdot
> \mathbf{a}^{(ij)}_{\eta}(t)\,dt
> \right|
> \le
> \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}},
> $$
> for some finite constant depending only on
> $$
> \epsilon_c,
> \qquad
> \gamma_{\mathrm{fold}},
> \qquad
> d_{\min},
> \qquad
> U_{\max},
> \qquad
> A_{\max},
> \qquad
> \chi_{\mathrm{fold}},
> \qquad
> U^{\mathrm{mb}}_{\mathrm{tube}}.
> $$
> Here
> $$
> U^{\mathrm{mb}}_{\mathrm{tube}}
> $$
> denotes the controlled source half-width of the fold tube in the normal-form coordinate
> $$
> u=s-s_\ast.
> $$
>
> **Proof.**
> Write
> $$
> J_{ij}(t;s)=\alpha_{ij}(t)u+\mathcal{R}_{ij}(t,u),
> \qquad
> u=s-s_\ast,
> $$
> as in the fold-tube normal form. The proof is then an explicit reduction to a one-dimensional singular integral.
>
> 1. **Jacobian lower bound on the tube.**
>    By the normal form lemma,
>    $$
>    |J_{ij}(t;s)|\ge c_{\mathrm{fold}}|u|
>    $$
>    with
>    $$
>    c_{\mathrm{fold}}\asymp \gamma_{\mathrm{fold}}.
>    $$
>
> 2. **Distance and projection control.**
>    On the controlled tube, the pair distance obeys
>    $$
>    r_{ij}(t;s)\ge d_{\min},
>    $$
>    while the channel projection satisfies
>    $$
>    |\Pi_m(t)\cdot \hat{\mathbf{r}}_{ij}(t;s)|
>    \le
>    C_m^{\mathrm{proj}}
>    $$
>    for some
>    $$
>    C_m^{\mathrm{proj}}
>    =
>    C_m^{\mathrm{proj}}(U_{\max},A_{\max}).
>    $$
>
> 3. **Kernel reduction.**
>    The dual-mollified branch kernel is therefore bounded by
>    $$
>    \frac{C_m^{\mathrm{proj}}\kappa\epsilon^2}{
>    \bigl(d_{\min}^2+\epsilon_c^2\bigr)\bigl(c_{\mathrm{fold}}|u|+\eta\bigr)
>    }
>    $$
>    up to a harmless change of constants. Thus the entire fold singularity is reduced to the one-dimensional factor
>    $$
>    \frac{1}{|u|+\eta}.
>    $$
>
> 4. **Exact fold-time cancellation.**
>    Since the source branch
>    $$
>    s=s(t)
>    $$
>    is simple, differentiating the root relation
>    $$
>    g_{ij}(t;s(t))=0
>    $$
>    yields
>    $$
>    \frac{ds}{dt}
>    =
>    -\frac{\partial_t g_{ij}(t;s(t))}{\partial_s g_{ij}(t;s(t))}.
>    $$
>    Hence
>    $$
>    dt
>    =
>    \frac{|\partial_s g_{ij}(t;s(t))|}{|\partial_t g_{ij}(t;s(t))|}\,ds
>    =
>    \frac{|J_{ij}(t;s)|}{|\partial_t g_{ij}(t;s)|}\,du.
>    $$
>    By shrinking the controlled fold tube if necessary, the receiver-time passage floor from the no-accumulation package persists along the active root branch; write the persisted floor again as
>    $$
>    \chi_{\mathrm{fold}}.
>    $$
>    Thus
>    $$
>    |\partial_t g_{ij}(t;s)|\ge \chi_{\mathrm{fold}}>0.
>    $$
>    Therefore the singular factor
>    $$
>    |J_{ij}|^{-1}
>    $$
>    in the force kernel is exactly cancelled by the
>    $$
>    |J_{ij}|
>    $$
>    factor in the time-volume element
>    $$
>    dt.
>    $$
>
> 5. **Uniform finite impulse bound.**
>    Let
>    $$
>    U^{\mathrm{mb}}_{\mathrm{tube}}
>    \equiv
>    \sup_{(t,s)\in W^{\mathrm{mb}}_{\mathrm{fold}}(\mathsf{e})}|u|.
>    $$
>    The fold-tube width is already controlled by the no-accumulation and normal-form constants, so
>    $$
>    U^{\mathrm{mb}}_{\mathrm{tube}}<\infty
>    $$
>    depends only on the same geometric data. After cancellation, the branch contribution is bounded by
>    $$
>    \frac{C_m^{\mathrm{proj}}\kappa\epsilon^2}{
>    \chi_{\mathrm{fold}}\bigl(d_{\min}^2+\epsilon_c^2\bigr)
>    }
>    \int_{|u|\le U^{\mathrm{mb}}_{\mathrm{tube}}}du,
>    $$
>    hence by
>    $$
>    \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}}
>    \le
>    \frac{
>    2C_m^{\mathrm{proj}}\kappa\epsilon^2U^{\mathrm{mb}}_{\mathrm{tube}}
>    }{
>    \chi_{\mathrm{fold}}\bigl(d_{\min}^2+\epsilon_c^2\bigr)
>    }.
>    $$
>    This bound is finite and remains uniformly finite as
>    $$
>    \eta\downarrow 0.
>    $$
>    Thus the fold impulse ceiling is controlled by one geometric transit width and one receiver-time passage floor rather than by a logarithmic mollifier loss. Therefore
>    $$
>    \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}}
>    $$
>    depends only on
>    $$
>    \epsilon_c,
>    \gamma_{\mathrm{fold}},
>    d_{\min},
>    U_{\max},
>    A_{\max},
>    \chi_{\mathrm{fold}},
>    U^{\mathrm{mb}}_{\mathrm{tube}}.
>    $$
>
> 6. **Conclusion.**
>    The resulting finite bound is
>    $$
>    \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}},
>    $$
>    as required.

> **Lemma (Type III shared-body superposition estimate).**
> Fix one admissible Type III shared-body coupled fold block
> $$
> \mathsf{e}.
> $$
> Then for each principal channel
> $$
> m
> $$
> one has
> $$
> \left|
> \int_{W^{\mathrm{mb}}_{\mathrm{fold}}(\mathsf{e})}
> \Pi_m(t)\cdot
> \ddot{\mathbf{X}}(t)\,dt
> \right|
> \le
> M_{\mathrm{loc}}(\mathsf{e})\,\mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}},
> $$
> where
> $$
> M_{\mathrm{loc}}(\mathsf{e})\le 3.
> $$
>
> **Proof.**
> Decompose the block into its participating branch families
> $$
> \beta_1,\dots,\beta_{M_{\mathrm{loc}}(\mathsf{e})}.
> $$
> The branch-separation floor
> $$
> \delta^{\mathrm{mb}}_{\mathrm{sep}}>0
> $$
> ensures that away from the common fold center these branches do not produce any additional unresolved near-collision or near-fold singularity. Each branch therefore satisfies the hypotheses of the Type II estimate on the same controlled tube. Summing the finitely many bounds gives
> $$
> \sum_{\ell=1}^{M_{\mathrm{loc}}(\mathsf{e})}
> \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}}
> =
> M_{\mathrm{loc}}(\mathsf{e})\,\mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}},
> $$
> and the admissible event alphabet gives
> $$
> M_{\mathrm{loc}}(\mathsf{e})\le 3.
> $$

> **Corollary (Renormalized post-transit envelope constants).**
> There exist finite constants
> $$
> U_{\max}^{+},
> \qquad
> A_{\max}^{+},
> \qquad
> L_A^{+}
> $$
> depending only on the pre-transit envelope and the fold ceilings
> $$
> F^{\mathrm{mb}}_m
> $$
> such that every admissible fold block sends the controlled tube data into a post-transit state satisfying
> $$
> \|\dot{\mathbf{X}}\|\le U_{\max}^{+},
> \qquad
> \|\ddot{\mathbf{X}}\|\le A_{\max}^{+},
> \qquad
> \operatorname{Lip}(\ddot{\mathbf{X}})\le L_A^{+}.
> $$
> In the eventual invariant-envelope argument one must choose the kinematic box so that these renormalized constants are absorbed back into the same admissible class.
>
> **Proof.**
> The channelwise impulse bounds give a finite change in every projected velocity component across one admissible fold block, bounded by
> $$
> F^{\mathrm{mb}}_m.
> $$
> Away from the fold tube, the pre-transit trajectory already obeys the ambient kinematic envelope. Therefore the total post-transit velocity bound is obtained by adding the finite fold-impulse ceilings to the pre-transit velocity box. The same localization and tube-width bounds show that acceleration and acceleration-Lipschitz norms can increase by only a finite amount depending on the same transit constants. Hence one obtains finite renormalized constants
> $$
> U_{\max}^{+},
> \qquad
> A_{\max}^{+},
> \qquad
> L_A^{+}
> $$
> depending only on the pre-transit envelope and the fold ceilings.

> **Proof of the bounded caustic-transit proposition.**
> Fix one admissible fold block.
>
> 1. **Tube localization.**
>    By the no-accumulation package, the fold block lies in one isolated receiver-time tube of width controlled by
>    $$
>    \Delta\tau_{\mathrm{evt}}.
>    $$
>    So no second singular event interacts with the tube at the same scale.
>
> 2. **Type II local model.**
>    For a simple fold, apply the fold-tube normal form and the Type II transit estimate. This gives one finite channelwise impulse bound
>    $$
>    \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}}.
>    $$
>    By the exact fold-time cancellation, this bound is uniform in
>    $$
>    \eta\downarrow 0
>    $$
>    and is governed by the receiver-time passage floor and the geometric source-width of the tube.
>
> 3. **Type III superposition.**
>    For a shared-body coupled fold, decompose into the finitely many participating branch families and use the superposition lemma. This yields
>    $$
>    \mathfrak{F}^{\mathrm{mb}}_m
>    =
>    \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}}M_{\max}^{\mathrm{mb}}.
>    $$
>
> 4. **Projection to the principal channels.**
>    The projections
>    $$
>    \Pi_m
>    $$
>    defining
>    $$
>    \rho^{\mathrm{mb}}_1,\dots,\rho^{\mathrm{mb}}_4
>    $$
>    are uniformly bounded on the smooth windows. Therefore the same finite impulse controls the fold-loss terms
>    $$
>    L^{\mathrm{mb}}_{m,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_m.
>    $$
>
> 5. **Post-transit regularity.**
>    The renormalized envelope corollary shows that the post-transit trajectory still satisfies a controlled
>    $$
>    C^1
>    $$
>    and acceleration-Lipschitz bound, so the next no-accumulation cycle remains available.
>
> 6. **Universal ceiling.**
>    Since every admissible fold block is of Type II or Type III and the local multiplicity is bounded by
>    $$
>    M_{\max}^{\mathrm{mb}}\le 3,
>    $$
>    the universal choice
>    $$
>    F^{\mathrm{mb}}_m
>    =
>    \mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}}M_{\max}^{\mathrm{mb}}
>    $$
>    controls every block on the cycle. This is now a genuine geometric transit invariant of the controlled fold alphabet, and it is exactly the ceiling consumed later by the recapture margins.

This is the last missing analytic bridge between finite branch combinatorics and the concrete recapture inequalities. Without it, the fold ceilings in the principal margins remain formal placeholders.

#### Fourth many-body theorem package: finite active delay hypergraph

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

> **Proof draft of the finite active hypergraph proposition.**
> Fix one controlled one-cycle continuation in the admissible gauge chart.
>
> 1. **Finite event alphabet.**
>    By construction, every allowed topological change of an active branch family belongs to one of the five admissible local types: continuation, simple fold, shared-body coupled fold, sector relabeling, or source-cluster exchange. No other event type is permitted.
>
> 2. **Finite event times.**
>    The no-accumulation package gives one common cycle-time gap
>    $$
>    \Delta\tau_{\mathrm{evt}}>0
>    $$
>    between any two admissible events on the same controlled family. Hence the total number of event times on one cycle is finite.
>
> 3. **Finite vertex set.**
>    Away from event times, every active branch is simple, sector-labeled, and carried by one receiver-source-window-sector family. Since the receiver index, source index, window label, and sector label all range over finite sets, and since the event count is finite, only finitely many branch segments can occur over the full cycle. This yields
>    $$
>    N^{\mathrm{mb}}_{\mathrm{vert}}<\infty.
>    $$
>
> 4. **Finite hyperedge set.**
>    Each admissible event time contributes exactly one local hyperedge of Type I-V. Since the admissible event times are finite and every event block has multiplicity bounded by the admissible alphabet, the total hyperedge count is finite and obeys
>    $$
>    N^{\mathrm{mb}}_{\mathrm{edge}}
>    \le
>    \left\lceil \frac{T_{\mathrm{cyc}}}{\Delta\tau_{\mathrm{evt}}}\right\rceil
>    N^{\mathrm{mb}}_{\mathrm{fam}}.
>    $$
>
> 5. **Branch separation and Jacobian control.**
>    The simple-branch persistence lemma and the caustic-transit package guarantee that outside the explicitly controlled fold tubes one retains the uniform Jacobian floor
>    $$
>    |J_{ij}(t;s)|\ge \nu^{\mathrm{mb}}_J
>    $$
>    and branch-separation floor
>    $$
>    \delta^{\mathrm{mb}}_{\mathrm{sep}}>0.
>    $$
>    Therefore no uncontrolled branch proliferation can occur between hypergraph-coded event blocks.
>
> 6. **Compatibility with later packages.**
>    Because the hypergraph changes only through the listed event alphabet and does so at finitely many isolated times, every later backward ancestry chain and every later forward recapture chain may be read on one finite combinatorial object. That is exactly the content needed by the ancestry and recapture packages.

This is the many-body replacement for the binary branch graph packages. Once it is proved, later ancestry and recapture arguments can consume a finite combinatorial object rather than an open-ended moving family of delayed roots.

#### Fifth many-body theorem package: cluster-valued ancestry and deep-past exclusion

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
> Assume the preceding section, no-accumulation, and finite-hypergraph packages. Then on a sufficiently small tame subclass, with the same event-gap and branch-regularity data
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

This finite-cycle parity rule should now be treated as an explicit upstream geometric target, not as invisible background logic:

> **Target Lemma (No trapped admissible exchange cycles in the planar three-body ancestry graph).**
> No closed loop of admissible source-cluster exchanges supported entirely inside
> $$
> \mathcal{W}^{\mathrm{mb}}_{\mathrm{lt}}
> \cup
> \mathcal{W}^{\mathrm{mb}}_{\mathrm{mid}}
> $$
> and the controlled fold or exchange tubes can avoid the provenance region indefinitely while preserving the admissible receiver, sector, and cluster bookkeeping.
>
> **Proof draft.**
> The intended mechanism is that every admissible backward exchange consumes a definite amount of source-time depth, while the late-turn and mid-window block has only finite cycle extent.
>
> 1. **Backward source-time drift on one simple branch.**
>    Along one simple delayed branch
>    $$
>    g_{ij}(t;s(t))=0,
>    $$
>    one has
>    $$
>    \frac{ds}{dt}
>    =
>    -\frac{\partial_t g_{ij}}{\partial_s g_{ij}}.
>    $$
>    On the controlled late-turn and mid windows, the no-accumulation package gives the receiver-time passage floor
>    $$
>    |\partial_t g_{ij}|\ge \chi_{\mathrm{evt}}>0,
>    $$
>    while away from the explicitly listed fold tubes the simple-branch Jacobian floor gives
>    $$
>    |\partial_s g_{ij}|\ge \nu^{\mathrm{mb}}_J>0.
>    $$
>    Hence
>    $$
>    \left|\frac{ds}{dt}\right|
>    \ge
>    \frac{\chi_{\mathrm{evt}}}{\sup|\partial_s g_{ij}|}
>    \equiv
>    c^{\mathrm{mb}}_{s,\mathrm{drift}}>0
>    $$
>    on every simple branch segment in those windows. In backward continuation, the source time therefore moves strictly toward earlier history at a controlled rate.
>
> 2. **Macroscopic drop across one admissible exchange block.**
>    Distinct admissible exchanges are separated in receiver time by at least
>    $$
>    \Delta\tau_{\mathrm{evt}}.
>    $$
>    Therefore, between two successive exchange blocks on one backward chain, the source time drops by at least
>    $$
>    \Delta s_{\min}^{\mathrm{mb}}
>    \equiv
>    c^{\mathrm{mb}}_{s,\mathrm{drift}}\Delta\tau_{\mathrm{evt}}
>    >0,
>    $$
>    up to the uniformly controlled fold-tube and exchange-tube widths already absorbed into the event constants.
>
> 3. **No indefinite cycling inside the late/mid block.**
>    Suppose a closed loop of admissible cluster exchanges were supported entirely inside
>    $$
>    \mathcal{W}^{\mathrm{mb}}_{\mathrm{lt}}
>    \cup
>    \mathcal{W}^{\mathrm{mb}}_{\mathrm{mid}}.
>    $$
>    After traversing one full loop with
>    $$
>    q\ge 1
>    $$
>    exchange blocks, the cumulative backward source-time drop would be at least
>    $$
>    q\,\Delta s_{\min}^{\mathrm{mb}}.
>    $$
>    But the receiver bookkeeping is assumed to return to the same late/mid combinatorial state, so the corresponding source time would also have to return to the same bounded portion of the history strip attached to that state. This is impossible once
>    $$
>    q\,\Delta s_{\min}^{\mathrm{mb}}
>    $$
>    exceeds the total width of the late/mid source-time slab.
>
> 4. **Finite-state closure contradiction.**
>    Because the state alphabet
>    $$
>    (i,\alpha,k,\mathfrak{c}_{\mathrm{src}},\ell)
>    $$
>    is finite, any putative infinite trapped exchange process would eventually repeat one previous state. Repeating the same state after a nonzero source-time drop contradicts the deterministic branch continuation on simple segments and the controlled local event alphabet at folds or exchanges. Therefore no trapped admissible exchange cycle can persist entirely inside the late-turn and mid-window region without entering the provenance zone.

This is now the exact topological/kinematic input consumed by the ancestry package: finite-state recurrence alone is not enough, but finite-state recurrence plus monotone source-time drift rules out the only remaining migration loophole.

> **Proof draft of the deep-past cluster-ancestry-or-exclusion proposition.**
> Fix one late-turn vertex
> $$
> \mathsf{v}_{\mathrm{late}}
> \in
> \mathscr{V}^{\mathrm{mb}}_{\mathrm{br}}.
> $$
>
> 1. **Finite backward state space.**
>    By the finite-hypergraph package, every backward continuation path from
>    $$
>    \mathsf{v}_{\mathrm{late}}
>    $$
>    runs inside one finite directed hypergraph whose event times are separated by
>    $$
>    \Delta\tau_{\mathrm{evt}}.
>    $$
>    Introduce the combinatorial state
>    $$
>    \Sigma(\mathsf{v})
>    \equiv
>    \bigl(
>    i(\mathsf{v}),
>    \alpha(\mathsf{v}),
>    k(\mathsf{v}),
>    \mathfrak{c}_{\mathrm{src}}(\mathsf{v}),
>    \ell(\mathsf{v})
>    \bigr),
>    $$
>    consisting of receiver label, window label, sector label, active source cluster, and branch multiplicity label. Because each factor ranges over a finite alphabet, the total number of such states is finite. Hence every backward ancestry chain either:
>    $$
>    \text{(a) terminates in an earlier window,}
>    \qquad
>    \text{(b) reaches the provenance region,}
>    \qquad
>    \text{or (c) revisits one previous state.}
>    $$
>
> 2. **Monotone window descent.**
>    By definition of backward ancestry, continuation is only allowed into earlier receiver windows in the cycle order, except for passage through one listed fold tube or one listed exchange tube already recorded in the hypergraph. Therefore no ancestry chain can oscillate indefinitely between unrelated window families. Once the chain has entered
>    $$
>    \mathcal{W}^{\mathrm{mb}}_{\mathrm{prov}},
>    $$
>    it stays inside the earlier part of the cycle unless one of the admissible hypergraph moves forces it out again; but such an exit would have to be encoded by one of the same finitely many state transitions above.
>
> 3. **Provenance-component extraction.**
>    Collect all backward-connected sub-hypergraphs lying entirely in the provenance windows
>    $$
>    \mathcal{W}^{\mathrm{mb}}_{\mathrm{prov}}
>    $$
>    for which the receiver label and sector label remain fixed and the admissible source-cluster trace stays inside the allowed move list
>    $$
>    \{i\}\leftrightarrow \{i,j\},
>    \qquad
>    \{i,j\}\leftrightarrow \{i\},
>    \qquad
>    \{i,j\}\leftrightarrow \{i,k\}.
>    $$
>    On each such component the branchwise Jacobian floor
>    $$
>    \nu^{\mathrm{mb}}_{J,\mathrm{anc}}>0
>    $$
>    and the branch-separation floor
>    $$
>    \delta^{\mathrm{mb}}_{\mathrm{sep}}>0
>    $$
>    exclude secondary unresolved branching. The resulting connected pieces are the ancestry components
>    $$
>    \mathfrak{a}_1,\dots,\mathfrak{a}_{N_{\mathrm{anc}}}.
>    $$
>    Their total number is finite because both the state alphabet and the finite hypergraph are finite.
>
> 4. **Uniqueness of ancestry attachment.**
>    Suppose one late-turn branch met two distinct ancestry components
>    $$
>    \mathfrak{a}_p\neq \mathfrak{a}_q.
>    $$
>    Then a backward path from
>    $$
>    \mathsf{v}_{\mathrm{late}}
>    $$
>    to
>    $$
>    \mathfrak{a}_p
>    $$
>    and one to
>    $$
>    \mathfrak{a}_q
>    $$
>    would have to split through either:
>    $$
>    \text{(a) a receiver-window reversal,}
>    \qquad
>    \text{(b) an unlisted cluster exchange,}
>    \qquad
>    \text{or (c) a repeated branch birth unsupported by the hypergraph alphabet.}
>    $$
>    Each alternative contradicts the finite-hypergraph proposition. Hence every late-turn branch meets at most one ancestry component.
>
> 5. **Exclusion of trapped migration.**
>    Assume now that one backward ancestry chain avoids all ancestry components. By Step 1, it must eventually revisit one previous combinatorial state
>    $$
>    \Sigma(\mathsf{v}).
>    $$
>    By Step 2, this repeated state cannot be realized by wandering through infinitely many earlier windows; it must close into one trapped loop inside
>    $$
>    \mathcal{W}^{\mathrm{mb}}_{\mathrm{lt}}
>    \cup
>    \mathcal{W}^{\mathrm{mb}}_{\mathrm{mid}}
>    $$
>    together with the explicitly controlled fold or exchange tubes. Every jump in that loop is one admissible cluster exchange separated from the next by at least
>    $$
>    \Delta\tau_{\mathrm{evt}}.
>    $$
>    The target lemma on no trapped admissible exchange cycles rules out exactly such a closed loop by showing that each exchange block forces a definite backward drop in source time. Therefore every backward ancestry chain either reaches one unique ancestry component or terminates through one listed local event tube without generating uncontrolled migration.
>
> 6. **Componentwise deep-past amplitude bound.**
>    Fix one ancestry component
>    $$
>    \mathfrak{a}_m.
>    $$
>    On that component,
>    $$
>    t-s\ge \tau^{\mathrm{mb}}_{\mathrm{dp}},
>    \qquad
>    |J_{ij}(t;s)|\ge \nu^{\mathrm{mb}}_{J,\mathrm{anc}},
>    \qquad
>    r_{ij}(t;s)\ge c_f\tau^{\mathrm{mb}}_{\mathrm{dp}},
>    $$
>    so one branch contribution is bounded by
>    $$
>    \frac{\kappa\epsilon^2}{
>    \bigl(c_f^2(\tau^{\mathrm{mb}}_{\mathrm{dp}})^2+\epsilon_c^2\bigr)
>    \nu^{\mathrm{mb}}_{J,\mathrm{anc}}
>    }.
>    $$
>    Because branch simplicity and the admissible source-cluster alphabet allow at most one uniformly transversal deep-past branch per source-cluster channel on the chosen delay scale, each ancestry component contributes at most a fixed finite multiple of that ceiling. Summing over at most
>    $$
>    N_{\mathrm{anc}}
>    $$
>    ancestry components gives the claimed finite deep-past suppression bound.

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

For the later recapture and closure packages, abbreviate this ancestry ceiling by
$$
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}
\equiv
\frac{
N_{\mathrm{anc}}\,\kappa\epsilon^2
}{
\bigl(c_f^2(\tau^{\mathrm{mb}}_{\mathrm{dp}})^2+\epsilon_c^2\bigr)
\nu^{\mathrm{mb}}_{J,\mathrm{anc}}
}.
$$
Then
$$
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\le
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}
$$
on every controlled late-turn window, and the recapture margins below may treat
$$
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}
$$
as one fixed arithmetic input.

#### Sixth many-body theorem package: finite escape-observable recapture law

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
> Assume the section package, the bounded caustic-transit package, the finite active delay hypergraph package, and the deep-past suppression bound
>    $$
>    A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
>    \le
>    \overline{A}^{\mathrm{mb}}_{\mathrm{deep}};
>    $$
> together with the fold ceilings produced there
>    $$
>    L^{\mathrm{mb}}_{1,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_1,
>    \qquad
>    L^{\mathrm{mb}}_{2,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_2
>    $$
>    on the two windows above, with
>    $$
>    F^{\mathrm{mb}}_1
>    =
>    \mathfrak{F}^{\mathrm{mb}}_1 M_{\max}^{\mathrm{mb}},
>    \qquad
>    F^{\mathrm{mb}}_2
>    =
>    \mathfrak{F}^{\mathrm{mb}}_2 M_{\max}^{\mathrm{mb}}.
>    $$
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
> \overline{A}^{\mathrm{mb}}_{\mathrm{deep}},
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
> \overline{A}^{\mathrm{mb}}_{\mathrm{deep}}.
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

> **Proof draft of the two-channel Jacobi recapture proposition.**
> On the smooth windows
> $$
> I^{\mathrm{mb}}_{1,\mathrm{post}}\cap I^{\mathrm{mb}}_{2,\mathrm{post}},
> \qquad
> I^{\mathrm{mb}}_{1,\mathrm{late}}\cap I^{\mathrm{mb}}_{2,\mathrm{late}},
> $$
> the observables
> $$
> \rho^{\mathrm{mb}}_1=\|\mathbf{a}\|,
> \qquad
> \rho^{\mathrm{mb}}_2=\|\mathbf{b}\|
> $$
> are twice differentiable and obey the comparison identities already derived above.
>
> 1. **Channel $\rho^{\mathrm{mb}}_1$.**
>    Insert the decomposition
>    $$
>    \Lambda^{\mathrm{mb}}_1
>    =
>    \Lambda^{\mathrm{mb}}_{1,\mathrm{core}}
>    -
>    \Lambda^{\mathrm{mb}}_{1,\mathrm{same}}
>    -
>    \Lambda^{\mathrm{mb}}_{1,\mathrm{self}}
>    $$
>    into the identity for
>    $$
>    \ddot{\rho}^{\mathrm{mb}}_1.
>    $$
>    Bound the outward pieces by positive part, control the fold contribution by
>    $$
>    L^{\mathrm{mb}}_{1,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_1,
>    $$
>    and bound the deep-past term by
>    $$
>    A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)\le \overline{A}^{\mathrm{mb}}_{\mathrm{deep}}.
>    $$
>    The stated projected inequality then gives
>    $$
>    \ddot{\rho}^{\mathrm{mb}}_1(t)<0.
>    $$
>
> 2. **Channel $\rho^{\mathrm{mb}}_2$.**
>    The same argument applied to
>    $$
>    \Lambda^{\mathrm{mb}}_2
>    =
>    \Lambda^{\mathrm{mb}}_{2,\mathrm{attr}}
>    -
>    \Lambda^{\mathrm{mb}}_{2,\mathrm{pair}}
>    -
>    \Lambda^{\mathrm{mb}}_{2,\mathrm{self}}
>    $$
>    yields
>    $$
>    \ddot{\rho}^{\mathrm{mb}}_2(t)<0.
>    $$
>
> 3. **Turning inside the window.**
>    If either outward rate is initially positive, strict negativity of the second derivative forces that outward rate to decrease monotonically. Therefore, provided the window length dominates the initial slope divided by the corresponding margin, the observable reaches an inward-turning time before the end of the window.
>
> 4. **Joint exclusion of monotone escape.**
>    Since both
>    $$
>    \ddot{\rho}^{\mathrm{mb}}_1
>    \qquad
>    \text{and}
>    \qquad
>    \ddot{\rho}^{\mathrm{mb}}_2
>    $$
>    are strictly negative on the same controlled windows, the pair-separation and midpoint-separation channels cannot both sustain monotone outward escape through the post-crossing or late-turn stage.

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

Here
$$
L^{\mathrm{mb}}_{1,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_1,
\qquad
L^{\mathrm{mb}}_{2,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_2
$$
are understood as direct outputs of the bounded many-body caustic-transit package, not as independent recapture assumptions.
On the late-turn windows, the ancestry package likewise provides the fixed ceiling
$$
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\le
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}.
$$
So the first two principal margins may be read as explicit arithmetic inequalities with already-settled fold and deep-past inputs.

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

Likewise, the fold-loss terms
$$
L^{\mathrm{mb}}_{3,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_3,
\qquad
L^{\mathrm{mb}}_{4,\mathrm{fold}}(t)\le F^{\mathrm{mb}}_4
$$
come from the same bounded caustic-transit package, with
$$
F^{\mathrm{mb}}_3
=
\mathfrak{F}^{\mathrm{mb}}_3 M_{\max}^{\mathrm{mb}},
\qquad
F^{\mathrm{mb}}_4
=
\mathfrak{F}^{\mathrm{mb}}_4 M_{\max}^{\mathrm{mb}}.
$$
Together with
$$
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t)
\le
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}},
$$
this means the principal four-channel closure theorem below consumes only fixed ceilings coming from the caustic-transit and ancestry packages, not any additional unresolved path-history term.

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
> Assume the section package, the bounded caustic-transit package, the finite active delay hypergraph package, and the deep-past cluster-ancestry suppression bound. Suppose, in addition, that
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

> **Proof draft of the principal four-channel recapture closure proposition.**
> On the corresponding smooth windows, positivity of
> $$
> \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}},
> \qquad
> \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}},
> \qquad
> \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{post}},
> \qquad
> \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{late}}
> $$
> gives the two-channel Jacobi turning result already proved above. Likewise, positivity of
> $$
> \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{post}},
> \qquad
> \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{late}}
> $$
> forces
> $$
> \ddot{\rho}^{\mathrm{mb}}_3<0
> $$
> on the sign-fixed shear windows, and positivity of
> $$
> \mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{post}},
> \qquad
> \mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{late}}
> $$
> forces
> $$
> \ddot{\rho}^{\mathrm{mb}}_4<0
> $$
> on the role-gap windows.
> Because the principal margins were defined using
> $$
> F^{\mathrm{mb}}_1,\dots,F^{\mathrm{mb}}_4
> $$
> and
> $$
> \overline{A}^{\mathrm{mb}}_{\mathrm{deep}},
> $$
> this already accounts for every controlled fold loss and every controlled deep-past contribution in the four principal channels.
>
> Therefore none of the four principal channels can maintain a positive outward-driving second derivative throughout the controlled post-crossing and late-turn stages. Any candidate excursion that still avoids return must therefore do so through either:
> 1. one auxiliary channel
>    $$
>    \rho^{\mathrm{mb}}_m,
>    \qquad
>    m\ge 5,
>    $$
>    not already covered by the principal four-channel block; or
> 2. breakdown of one named hypothesis, namely collapse of a smooth-window floor, failure of the chart, or one unaccounted fold/tie event.
>
> This is exactly the claimed alternative.

> **Target Theorem (Planar-three-body multi-observable recapture criterion).**
> Assume the section package, the bounded caustic-transit package, the finite active delay hypergraph package, and the deep-past cluster-ancestry suppression bound, all in one coupled parameter regime in which the comparison terms are defined with common constants.
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

> Here the only nonlocal error budgets entering the comparison laws are the fixed ceilings
> $$
> F^{\mathrm{mb}}_m,
> \qquad
> m=1,\dots,4,
> $$
> from the bounded caustic-transit package and
> $$
> \overline{A}^{\mathrm{mb}}_{\mathrm{deep}}
> $$
> from the cluster-ancestry package. Once those constants are fixed, the recapture criterion is reduced to strict positivity of finitely many margin inequalities on the controlled windows.

This is the first honest many-body recapture theorem target. It says that the configuration does not merely avoid one preferred binary escape. It must fail to escape in every channel that the three-body quotient geometry naturally opens.

#### Seventh many-body theorem package: atlas-level tame-envelope closure

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
> 4. the bounded caustic-transit package remains uniform there, with one common local multiplicity cap
>    $$
>    M_{\max}^{\mathrm{mb}}\le 3
>    $$
>    and one common family of transit constants
>    $$
>    \mathfrak{F}^{\mathrm{mb}}_1,
>    \qquad
>    \mathfrak{F}^{\mathrm{mb}}_2,
>    \qquad
>    \mathfrak{F}^{\mathrm{mb}}_3,
>    \qquad
>    \mathfrak{F}^{\mathrm{mb}}_4,
>    $$
>    hence one common family of fold ceilings
>    $$
>    F^{\mathrm{mb}}_m
>    =
>    \mathfrak{F}^{\mathrm{mb}}_m M_{\max}^{\mathrm{mb}},
>    \qquad
>    m=1,2,3,4;
>    $$
> 5. the principal recapture margins on that tame subregion remain bounded away from zero by one common floor
>    $$
>    \mathfrak{m}^{\mathrm{mb}}_{\mathrm{prin}}>0;
>    $$
> 6. and there exists a nonempty convex subset
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
>    \subseteq
>    \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
>    $$
>    lying entirely inside that tame subregion and carrying the same preserved event class, smooth-window floors, fold ceilings, and principal-margin floors.

> **Proof draft of the hypergraph-and-atlas stability proposition.**
> Start from one seed history in the convex Banach envelope for which the no-accumulation, caustic-transit, ancestry, and principal recapture packages all hold. Because the envelope controls
> $$
> \|\mathbf{X}\|,
> \qquad
> \|\dot{\mathbf{X}}\|,
> \qquad
> \operatorname{Lip}(\dot{\mathbf{X}}),
> $$
> the delay defects and the sector/exchange gap functions depend continuously on the history in the
> $$
> C^1
> $$
> topology.
>
> 1. **Persistence of the event class.**
>    Transversal zeros of
>    $$
>    \partial_s g_{ij},
>    \qquad
>    \Theta_{\mathrm{sec}},
>    \qquad
>    \Theta_{\mathrm{exc}}
>    $$
>    are structurally stable under sufficiently small
>    $$
>    C^1
>    $$
>    perturbations. Therefore, on a sufficiently small convex neighborhood of the seed, no new event type is created and no listed event disappears except by leaving the neighborhood.
>
> 2. **Persistence of the smooth windows.**
>    The floors
>    $$
>    a_{\min},
>    \qquad
>    b_{\min},
>    \qquad
>    \Delta_{\min},
>    \qquad
>    \delta_{\mathrm{role},\min}
>    $$
>    depend continuously on the trajectory. Hence on a sufficiently small tame subregion they remain positive, and the corresponding windows
>    $$
>    I^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    I^{\mathrm{mb}}_{m,\mathrm{late}}
>    $$
>    remain nondegenerate.
>
> 3. **Persistence of the principal margins.**
>    Every term entering
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{late}}
>    $$
>    varies continuously on the smooth windows, and the fold-loss terms are uniformly bounded by the same caustic-transit constants. Therefore strict positivity at the seed persists on a sufficiently small tame subregion.
>
> 4. **Convex tame core.**
>    The next proposition below shows how to realize such a subset by explicit tube-and-cone inequalities around the seed. Therefore one may choose a sufficiently small convex subset
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
>    \subseteq
>    \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
>    $$
>    lying entirely inside the tame region where the same event class, smooth-window floors, transit constants, and principal margins are preserved.

The remaining closure burden is then purely analytic: prove that the return map sends this convex tame core into itself.

To make this convex core theorem-level rather than rhetorical, one should define it by visibly convex seed-centered tube and cone conditions, not by delayed-root predicates.

Fix one seed history
$$
\Phi^{\mathrm{mb}}_{\mathrm{seed}}
\in
\mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
$$
for which the no-accumulation, caustic-transit, ancestry, and principal recapture packages already hold. Let
$$
W\in\left\{
I^{\mathrm{mb}}_{\mathrm{post}},
I^{\mathrm{mb}}_{\mathrm{late}}
\right\}.
$$
Choose:

- closed planar cones
  $$
  \mathfrak{C}^{a}_W,
  \qquad
  \mathfrak{C}^{b}_W,
  \qquad
  \mathfrak{C}^{\mathrm{role}}_W
  \subset \Pi
  $$
  for the pair axis
  $$
  \mathbf{a},
  $$
  the midpoint axis
  $$
  \mathbf{b},
  $$
  and the distinguished role-gap vector
  $$
  \mathbf{x}_{i_\ast}-\mathbf{x}_2;
  $$
- closed velocity cones
  $$
  \mathfrak{V}^{i}_W\subset \Pi,
  \qquad
  i=1,2,3,
  $$
  and, for each active branch family
  $$
  \beta
  $$
  in the preserved event class, one closed chord-direction cone
  $$
  \mathfrak{U}^{\beta}_W\subset \Pi;
  $$
- support vectors
  $$
  \mathbf{n}^{a}_W,
  \qquad
  \mathbf{n}^{b}_W,
  \qquad
  \mathbf{n}^{\mathrm{role}}_W
  \in \Pi;
  $$
- and positive support floors
  $$
  \alpha^{a}_W,
  \qquad
  \alpha^{b}_W,
  \qquad
  \alpha^{\mathrm{role}}_W.
  $$

Choose the seed-centered tube radii small enough that every active branch family
$$
\beta
$$
arising from a history in that tube has its unnormalized chord vector in one fixed narrow spatial cone whose normalized directions lie in
$$
\mathfrak{U}^{\beta}_W.
$$
This induced chord-direction control is part of the geometric setup, not an extra defining predicate of the convex set.

The intended geometric compatibility conditions are:

1. for every
   $$
   \mathbf{u}_a\in \mathfrak{C}^{a}_W,
   \qquad
   \mathbf{u}_b\in \mathfrak{C}^{b}_W,
   $$
   one has
   $$
   \mathbf{n}^{a}_W\cdot \mathbf{u}_a\ge \alpha^{a}_W\|\mathbf{u}_a\|,
   \qquad
   \mathbf{n}^{b}_W\cdot \mathbf{u}_b\ge \alpha^{b}_W\|\mathbf{u}_b\|,
   $$
   and the cone pair is angle-separated so that
   $$
   |\det(\mathbf{u}_a,\mathbf{u}_b)|
   \ge
   \varsigma^{ab}_W\,
   \|\mathbf{u}_a\|\,\|\mathbf{u}_b\|
   $$
   for some
   $$
   \varsigma^{ab}_W>0;
   $$
2. for every
   $$
   \mathbf{u}_{\mathrm{role}}
   \in
   \mathfrak{C}^{\mathrm{role}}_W
   $$
   one has
   $$
   \mathbf{n}^{\mathrm{role}}_W\cdot \mathbf{u}_{\mathrm{role}}
   \ge
   \alpha^{\mathrm{role}}_W
   \|\mathbf{u}_{\mathrm{role}}\|;
   $$
3. for every active branch family
   $$
   \beta=(i,j)
   $$
   and every
   $$
   \mathbf{v}\in \mathfrak{V}^{j}_W,
   \qquad
   \hat{\mathbf{u}}\in \mathfrak{U}^{\beta}_W,
   $$
   one has
   $$
   \mathbf{v}\cdot \hat{\mathbf{u}}
   \le
   c_f(1-\nu^{\mathrm{cvx}}_{\beta,W})
   $$
   for some
   $$
   \nu^{\mathrm{cvx}}_{\beta,W}>0.
   $$

These are the many-body closure analogues of the earlier sectorwise cone-transversality package: they are visibly convex restrictions on unnormalized vectors, but they imply the nonconvex Jacobian, shear, and role-gap floors used later.

For the explicit symmetric seed packet above, these abstract cones and supports should be specialized rather than left anonymous. At the section time the seed directions are
$$
\hat{\mathbf{a}}_{\mathrm{seed}}(0)=\mathbf{e}_1,
\qquad
\hat{\mathbf{b}}_{\mathrm{seed}}(0)=\mathbf{e}_2,
$$
and the relevant role-gap vector may be taken as
$$
\mathbf{r}^{\mathrm{role}}_{\mathrm{seed}}
\equiv
\mathbf{x}_{1,\mathrm{seed}}(0)-\mathbf{x}_{2,\mathrm{seed}}(0)
=
\frac{1}{2}A_\ast \mathbf{e}_1-B_\ast \mathbf{e}_2.
$$
Accordingly one should choose
$$
\mathbf{n}^{a}_W=\mathbf{e}_1,
\qquad
\mathbf{n}^{b}_W=\mathbf{e}_2,
\qquad
\mathbf{n}^{\mathrm{role}}_W
=
\frac{\mathbf{r}^{\mathrm{role}}_{\mathrm{seed}}}{\|\mathbf{r}^{\mathrm{role}}_{\mathrm{seed}}\|},
$$
on the seed-side windows, and one should center the corresponding cones on:
$$
\mathfrak{C}^{a}_W
\ \text{around}\
\mathbf{e}_1,
\qquad
\mathfrak{C}^{b}_W
\ \text{around}\
\mathbf{e}_2,
$$
$$
\mathfrak{C}^{\mathrm{role}}_W
\ \text{around}\
\mathbf{r}^{\mathrm{role}}_{\mathrm{seed}},
\qquad
\mathfrak{V}^{i}_W
\ \text{around}\
\dot{\mathbf{x}}_{i,\mathrm{seed}}.
$$
The support floors should be chosen from the seed values with explicit slack:
$$
\alpha^{a}_W
=
A_\ast-\sigma^{a}_{\mathrm{seed}},
\qquad
\alpha^{b}_W
=
B_\ast-\sigma^{b}_{\mathrm{seed}},
$$
$$
\alpha^{\mathrm{role}}_W
=
\|\mathbf{r}^{\mathrm{role}}_{\mathrm{seed}}\|
-\sigma^{\mathrm{role}}_{\mathrm{seed}},
$$
for positive seed slacks
$$
\sigma^{a}_{\mathrm{seed}},
\qquad
\sigma^{b}_{\mathrm{seed}},
\qquad
\sigma^{\mathrm{role}}_{\mathrm{seed}}
$$
small enough that the corresponding inequalities still hold strictly on the whole seed packet. This is the concrete way in which the symmetric seed should sit inside the later convex core.

> **Target Proposition (Explicit convex tame core inside the planar-three-body Banach envelope).**
> There exist positive tube radii
> $$
> \varepsilon_X,
> \qquad
> \varepsilon_V,
> \qquad
> \varepsilon_A
> $$
> and closed cones
> $$
> \mathfrak{C}^{a}_W,
> \qquad
> \mathfrak{C}^{b}_W,
> \qquad
> \mathfrak{C}^{\mathrm{role}}_W,
> \qquad
> \mathfrak{V}^{i}_W,
> \qquad
> \mathfrak{U}^{\beta}_W
> $$
> satisfying the compatibility conditions above such that the set
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> $$
> of all gauge-fixed histories
> $$
> \Phi=(\mathbf{X},\dot{\mathbf{X}})
> \in
> \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
> $$
> obeying
> 1. the seed-centered tube bounds
>    $$
>    \sup_t
>    \|\mathbf{X}(t)-\mathbf{X}_{\mathrm{seed}}(t)\|
>    \le
>    \varepsilon_X,
>    $$
>    $$
>    \sup_t
>    \|\dot{\mathbf{X}}(t)-\dot{\mathbf{X}}_{\mathrm{seed}}(t)\|
>    \le
>    \varepsilon_V,
>    $$
>    $$
>    \operatorname{Lip}(\dot{\mathbf{X}})
>    \le
>    A_\ast+\varepsilon_A;
>    $$
> 2. the pointwise cone conditions
>    $$
>    \mathbf{a}(t)\in \mathfrak{C}^{a}_W,
>    \qquad
>    \mathbf{b}(t)\in \mathfrak{C}^{b}_W,
>    \qquad
>    \mathbf{x}_{i_\ast}(t)-\mathbf{x}_2(t)\in \mathfrak{C}^{\mathrm{role}}_W,
>    \qquad
>    \dot{\mathbf{x}}_i(t)\in \mathfrak{V}^{i}_W
>    $$
>    on every controlled window
>    $$
>    W,
>    $$
> 3. the affine support inequalities
>    $$
>    \mathbf{n}^{a}_W\cdot \mathbf{a}(t)\ge \alpha^{a}_W,
>    \qquad
>    \mathbf{n}^{b}_W\cdot \mathbf{b}(t)\ge \alpha^{b}_W,
>    \qquad
>    \mathbf{n}^{\mathrm{role}}_W\cdot
>    \bigl(\mathbf{x}_{i_\ast}(t)-\mathbf{x}_2(t)\bigr)
>    \ge
>    \alpha^{\mathrm{role}}_W
>    $$
>    on every controlled window,
>
> is a nonempty closed convex subset of
> $$
> \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}
> $$
> and lies entirely inside the tame region where the following nonconvex data are forced with uniform floors:
> 1. the pair and midpoint floors
>    $$
>    \|\mathbf{a}(t)\|\ge a_{\min}^{\mathrm{cvx}},
>    \qquad
>    \|\mathbf{b}(t)\|\ge b_{\min}^{\mathrm{cvx}};
>    $$
> 2. the shear floor
>    $$
>    |\det(\mathbf{a}(t),\mathbf{b}(t))|
>    \ge
>    \Delta_{\min}^{\mathrm{cvx}};
>    $$
> 3. the role-gap floor
>    $$
>    \delta_{\mathrm{role}}(t)
>    \ge
>    \delta_{\mathrm{role},\min}^{\mathrm{cvx}};
>    $$
> 4. and the branchwise Jacobian floors
>    $$
>    |J_\beta(t)|
>    \ge
>    \nu^{\mathrm{cvx}}_{J,\beta}
>    \qquad
>    \text{for every active branch family }
>    \beta.
>    $$

> **Proof draft.**
> The defining inequalities are visibly convex: the seed-centered
> $$
> C^0/C^1
> $$
> tube bounds are norm-convex, the Lipschitz bound is convex, pointwise membership in each closed cone is convex, and the support inequalities are affine.
>
> 1. **Closedness and convexity.**
>    Every defining condition is closed under uniform convergence on the history interval, hence
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
>    $$
>    is closed. Intersections of closed convex tube, cone, and affine constraints remain convex.
>
> 2. **Nonemptiness.**
>    Choose the cones and support vectors around the seed with aperture small enough that the seed itself satisfies them with strict slack. Then the seed belongs to
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}.
>    $$
>
> 3. **Norm floors from affine support.**
>    Since
>    $$
>    \mathbf{n}^{a}_W\cdot \mathbf{a}\ge \alpha^{a}_W
>    \qquad
>    \text{and}
>    \qquad
>    \|\mathbf{n}^{a}_W\|=1,
>    $$
>    one gets
>    $$
>    \|\mathbf{a}\|\ge \alpha^{a}_W.
>    $$
>    Likewise
>    $$
>    \|\mathbf{b}\|\ge \alpha^{b}_W.
>    $$
>    Hence one may take
>    $$
>    a_{\min}^{\mathrm{cvx}}
>    =
>    \min_W \alpha^{a}_W,
>    \qquad
>    b_{\min}^{\mathrm{cvx}}
>    =
>    \min_W \alpha^{b}_W.
>    $$
>
> 4. **Shear and role-gap floors from cone separation.**
>    The angular separation of
>    $$
>    \mathfrak{C}^{a}_W
>    \qquad
>    \text{and}
>    \qquad
>    \mathfrak{C}^{b}_W
>    $$
>    implies
>    $$
>    |\det(\mathbf{a},\mathbf{b})|
>    \ge
>    \varsigma^{ab}_W\,
>    \|\mathbf{a}\|\,\|\mathbf{b}\|
>    \ge
>    \varsigma^{ab}_W\alpha^{a}_W\alpha^{b}_W.
>    $$
>    Therefore
>    $$
>    \Delta_{\min}^{\mathrm{cvx}}
>    =
>    \min_W
>    \varsigma^{ab}_W\alpha^{a}_W\alpha^{b}_W
>    >0.
>    $$
>    Likewise the role cone and support inequality give a positive lower bound
>    $$
>    \delta_{\mathrm{role},\min}^{\mathrm{cvx}}
>    $$
>    after shrinking the role-cone aperture if necessary.
>
> 5. **Jacobian floors from cone transversality.**
>    On each active branch family
>    $$
>    \beta=(i,j),
>    $$
>    the induced chord-direction cone
>    $$
>    \mathfrak{U}^{\beta}_W
>    $$
>    and the emitter velocity cone
>    $$
>    \mathfrak{V}^{j}_W
>    $$
>    satisfy
>    $$
>    \dot{\mathbf{x}}_j\cdot \hat{\mathbf{r}}_\beta
>    \le
>    c_f(1-\nu^{\mathrm{cvx}}_{\beta,W}),
>    $$
>    so
>    $$
>    J_\beta(t)
>    =
>    1-\frac{\dot{\mathbf{x}}_j\cdot \hat{\mathbf{r}}_\beta}{c_f}
>    \ge
>    \nu^{\mathrm{cvx}}_{\beta,W}.
>    $$
>    Taking the minimum over the finite branch family list yields one common Jacobian floor.
>
> 6. **Containment in the tame region.**
>    These floors imply the smooth-window, branch-regularity, and role-gap hypotheses used in the recapture and closure packages. Therefore
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
>    $$
>    lies entirely inside the tame region where the preserved event class, fold ceilings, and principal margins are already stable.

> **Target Corollary (Seed-centered realization of the explicit convex tame core).**
> Assume the explicit symmetric planar-three-body seed proposition, the seed-neighborhood realization of the leading principal margins, and the delayed seed-margin persistence lemma. Then one may choose:
> 1. seed-centered support vectors
>    $$
>    \mathbf{n}^{a}_W=\mathbf{e}_1,
>    \qquad
>    \mathbf{n}^{b}_W=\mathbf{e}_2,
>    \qquad
>    \mathbf{n}^{\mathrm{role}}_W
>    =
>    \frac{\mathbf{r}^{\mathrm{role}}_{\mathrm{seed}}}{\|\mathbf{r}^{\mathrm{role}}_{\mathrm{seed}}\|};
>    $$
> 2. narrow closed cones centered on
>    $$
>    \mathbf{e}_1,
>    \qquad
>    \mathbf{e}_2,
>    \qquad
>    \mathbf{r}^{\mathrm{role}}_{\mathrm{seed}},
>    \qquad
>    \dot{\mathbf{x}}_{i,\mathrm{seed}};
>    $$
> 3. and positive support slacks
>    $$
>    \sigma^{a}_{\mathrm{seed}},
>    \qquad
>    \sigma^{b}_{\mathrm{seed}},
>    \qquad
>    \sigma^{\mathrm{role}}_{\mathrm{seed}},
>    $$
>
> such that the resulting convex core
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> $$
> is nonempty and contains the whole delayed seed packet
> $$
> \mathcal{C}^{\mathrm{mb},\mathrm{seed}}_{A_\ast,B_\ast,\eta}
> $$
> as a strict interior subset relative to the preserved tame class.

> **Proof draft.**
> The explicit symmetric seed satisfies:
> 1. the support inequalities with margins
>    $$
>    A_\ast,
>    \qquad
>    B_\ast,
>    \qquad
>    \|\mathbf{r}^{\mathrm{role}}_{\mathrm{seed}}\|;
>    $$
> 2. the cone conditions with zero angular defect, since
>    $$
>    \mathbf{a}_{\mathrm{seed}}(0)\parallel \mathbf{e}_1,
>    \qquad
>    \mathbf{b}_{\mathrm{seed}}(0)\parallel \mathbf{e}_2;
>    $$
> 3. and the delayed seed-margin persistence lemma gives one seed-side window on which the same branch families remain unique and the same principal inward margins stay positive.
>
> Therefore one may choose the cone apertures and support slacks small enough that:
> - the whole local seed packet remains inside the same tube-and-cone inequalities;
> - the induced Jacobian, shear, and role-gap floors remain strictly positive;
> - and the corresponding convex core is nonempty because it already contains that seed packet.
>
> This is the explicit nonvacuity step for the many-body convex core. After this corollary, the convex-core package is no longer merely compatible with the seed geometry; it is concretely centered on it.

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
- the bounded caustic-transit data
  $$
  M_{\max}^{\mathrm{mb}},
  \qquad
  \mathfrak{F}^{\mathrm{mb}}_1,
  \qquad
  \mathfrak{F}^{\mathrm{mb}}_2,
  \qquad
  \mathfrak{F}^{\mathrm{mb}}_3,
  \qquad
  \mathfrak{F}^{\mathrm{mb}}_4;
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
  F^{\mathrm{mb}}_2,
  \qquad
  F^{\mathrm{mb}}_3,
  \qquad
  F^{\mathrm{mb}}_4;
  $$
- the first four principal margins
  $$
  \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{post}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{late}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{post}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{late}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{post}},
  \quad
  \mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{late}};
  $$
- and one fixed atlas representative on the relevant quotient chart.

The coupled parameter regime underlying this closed tame target should likewise be made explicit:

> **Target Proposition (Coupled parameter solvability for the first planar-three-body tame regime).**
> There exists a nonempty parameter region in
> $$
> (\eta,\epsilon_c,A_\ast,B_{\min},V_{\mathrm{in}},a_{\min},b_{\min},\Delta_{\min},\delta_{\mathrm{role},\min},\tau^{\mathrm{mb}}_{\mathrm{dp}},\dots)
> $$
> such that all of the following hold simultaneously:
> 1. the no-accumulation floors and event-gap bounds;
> 2. the bounded caustic-transit ceilings
>    $$
>    F^{\mathrm{mb}}_m;
>    $$
> 3. the ancestry and deep-past suppression bounds;
> 4. the strict positivity of the principal margins
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{late}};
>    $$
> 5. and the nondegeneracy of the smooth recapture windows.

> **Proof draft of the coupled parameter solvability proposition.**
> The constants are coupled, but their dependencies are triangular once the previous packages are ordered correctly.
>
> 1. **Choose the kinematic box first.**
>    Fix
>    $$
>    A_\ast
>    $$
>    and the seed-centered tube radii
>    $$
>    \varepsilon_X,
>    \qquad
>    \varepsilon_V,
>    \qquad
>    \varepsilon_A
>    $$
>    so that the explicit convex core proposition applies.
>
> 2. **Choose cone apertures and support floors.**
>    Pick the spatial and velocity cones narrow enough that the induced constants
>    $$
>    a_{\min}^{\mathrm{cvx}},
>    \qquad
>    b_{\min}^{\mathrm{cvx}},
>    \qquad
>    \Delta_{\min}^{\mathrm{cvx}},
>    \qquad
>    \delta_{\mathrm{role},\min}^{\mathrm{cvx}},
>    \qquad
>    \nu^{\mathrm{cvx}}_{J,\beta}
>    $$
>    are positive with slack relative to the seed history.
>
> 3. **Choose the mollification regime.**
>    Then take
>    $$
>    \eta,
>    \qquad
>    \epsilon_c
>    $$
>    small enough for the Type II / Type III caustic-transit estimates, but not so small that the resulting fold ceilings
>    $$
>    F^{\mathrm{mb}}_m
>    $$
>    dominate the inward recapture floors.
>
> 4. **Balance recapture against leakage.**
>    Because the inward branch-sum terms and the leakage terms vary continuously with these parameters on the smooth windows, the strict seed inequalities persist on one nonempty open parameter neighborhood. Hence the principal margins
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{late}}
>    $$
>    remain positive there.
>
> 5. **Preserve deep-past suppression.**
>    Finally choose
>    $$
>    \tau^{\mathrm{mb}}_{\mathrm{dp}}
>    $$
>    large enough that the deep-past ceiling remains below the recapture slack already reserved in Step 4.
>
> 6. **Reserve trapping slack on the convex-core boundary.**
>    Tighten the support floors and tube radii so that the seed and its one-cycle image satisfy every cone and support inequality with a strictly positive margin. The same open-parameter argument then leaves room for the inward-pointing boundary estimates used in the convex-core trapping lemma below.
>
> Therefore the admissible parameter region is the intersection of finitely many open inequalities, all already satisfied by the seed with slack; hence it is nonempty.

The proposition above gives the right abstract dependency structure, but the next proof burden is to write one explicit sufficient corridor analogous to the short-window recapture regime in the frozen 1D scaffold. For the first planar-three-body bridge, the natural corridor is controlled by the four principal channels together with the branch-regularity and trapping slack budgets.

For
$$
m=1,2,3,4
$$
and
$$
W\in\left\{
\mathrm{post},
\mathrm{late}
\right\},
$$
introduce:
$$
\underline{\Lambda}^{\mathrm{mb}}_{m,W}
\equiv
\inf_{t\in I^{\mathrm{mb}}_{m,W}}
\Lambda^{\mathrm{mb}}_m(t),
$$
$$
\overline{L}^{\mathrm{mb}}_{m,W}
\equiv
\sup_{t\in I^{\mathrm{mb}}_{m,W}}
\Bigl(
L^{\mathrm{mb}}_{m,\mathrm{geom}}(t)
+
L^{\mathrm{mb}}_{m,\mathrm{fold}}(t)
\Bigr),
$$
$$
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}
\equiv
\sup_{t\in I^{\mathrm{mb}}_{\mathrm{post}}\cup I^{\mathrm{mb}}_{\mathrm{late}}}
A^{\mathrm{mb}}_{s,\mathrm{deep}}(t),
$$
and the strict principal margin floors
$$
\mathfrak{m}^{\mathrm{mb}}_{m,W}
\equiv
\underline{\Lambda}^{\mathrm{mb}}_{m,W}
-
\overline{L}^{\mathrm{mb}}_{m,W}
-
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}.
$$
Here
$$
L^{\mathrm{mb}}_{m,\mathrm{geom}}
$$
collects all non-fold leakage already isolated in the channel decompositions, so that
$$
\overline{L}^{\mathrm{mb}}_{m,W}
$$
is a genuine channelwise ceiling.

Likewise define the maximal outward initial speeds
$$
V^{\mathrm{mb}}_{m,W,\max}
\equiv
\sup_{\Phi\in\mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}}
\bigl(\dot{\rho}^{\mathrm{mb}}_m\bigr)_+(t^{\Phi}_{m,W,\mathrm{in}}),
$$
where
$$
t^{\Phi}_{m,W,\mathrm{in}}
$$
is the entry time of the history
$$
\Phi
$$
into the corresponding controlled window, and let
$$
\ell^{\mathrm{mb}}_{m,W}
\equiv
|I^{\mathrm{mb}}_{m,W}|
$$
denote the window length.

The trapping-region bookkeeping should then use the excursion ceilings
$$
E^{\mathrm{mb}}_{m,W}
\equiv
\frac{\bigl(V^{\mathrm{mb}}_{m,W,\max}\bigr)^2}
{2\mathfrak{m}^{\mathrm{mb}}_{m,W}},
$$
whenever
$$
\mathfrak{m}^{\mathrm{mb}}_{m,W}>0,
$$
because
$$
\ddot{\rho}^{\mathrm{mb}}_m\le -\mathfrak{m}^{\mathrm{mb}}_{m,W}
$$
on the corresponding window then bounds every outward excursion before turning by the usual one-dimensional comparison estimate.

> **Target Proposition (Explicit principal-channel parameter corridor for the first planar-three-body tame regime).**
> Assume the explicit convex tame core proposition and define the principal channel floors above. Suppose there exist positive constants
> $$
> \mathfrak{m}^{\mathrm{mb}}_{\mathrm{prin}},
> \qquad
> s^{a}_{\mathrm{trap}},
> \qquad
> s^{b}_{\mathrm{trap}},
> \qquad
> s^{\Delta}_{\mathrm{trap}},
> \qquad
> s^{\mathrm{role}}_{\mathrm{trap}}
> $$
> such that:
> 1. for every
>    $$
>    m=1,2,3,4
>    \qquad
>    \text{and}
>    \qquad
>    W\in\{\mathrm{post},\mathrm{late}\},
>    $$
>    one has
>    $$
>    \mathfrak{m}^{\mathrm{mb}}_{m,W}
>    \ge
>    \mathfrak{m}^{\mathrm{mb}}_{\mathrm{prin}}>0;
>    $$
> 2. the controlled windows are long enough for turning:
>    $$
>    \ell^{\mathrm{mb}}_{m,W}
>    \ge
>    \frac{V^{\mathrm{mb}}_{m,W,\max}}{\mathfrak{m}^{\mathrm{mb}}_{m,W}}
>    \qquad
>    \text{for all }
>    m=1,2,3,4;
>    $$
> 3. the resulting excursion ceilings satisfy
>    $$
>    E^{\mathrm{mb}}_{1,W}<s^{a}_{\mathrm{trap}},
>    \qquad
>    E^{\mathrm{mb}}_{2,W}<s^{b}_{\mathrm{trap}},
>    \qquad
>    E^{\mathrm{mb}}_{3,W}<s^{\Delta}_{\mathrm{trap}},
>    \qquad
>    E^{\mathrm{mb}}_{4,W}<s^{\mathrm{role}}_{\mathrm{trap}}
>    $$
>    on both windows;
> 4. the support and cone slack in the explicit convex core dominate those trapping budgets:
>    $$
>    a_{\min}^{\mathrm{cvx}}-\alpha^{a}_{\partial}>s^{a}_{\mathrm{trap}},
>    \qquad
>    b_{\min}^{\mathrm{cvx}}-\alpha^{b}_{\partial}>s^{b}_{\mathrm{trap}},
>    $$
>    $$
>    \Delta_{\min}^{\mathrm{cvx}}-\Delta_{\partial}>s^{\Delta}_{\mathrm{trap}},
>    \qquad
>    \delta_{\mathrm{role},\min}^{\mathrm{cvx}}-\delta^{\mathrm{role}}_{\partial}>s^{\mathrm{role}}_{\mathrm{trap}},
>    $$
>    where the boundary thresholds
>    $$
>    \alpha^{a}_{\partial},
>    \qquad
>    \alpha^{b}_{\partial},
>    \qquad
>    \Delta_{\partial},
>    \qquad
>    \delta^{\mathrm{role}}_{\partial}
>    $$
>    are the defining support values of the convex-core boundary faces;
> 5. the branchwise Jacobian floor and fold ceilings satisfy
>    $$
>    \nu^{\mathrm{cvx}}_{J,\beta}\ge \nu^{\mathrm{mb}}_{J,\min}>0,
>    \qquad
>    F^{\mathrm{mb}}_m\le \overline{F}^{\mathrm{mb}}_m
>    $$
>    with the chosen
>    $$
>    \overline{F}^{\mathrm{mb}}_m
>    $$
>    already absorbed into
>    $$
>    \overline{L}^{\mathrm{mb}}_{m,W}.
>    $$
>
> Then all four principal recapture channels turn inward before exhausting the convex-core slack, and the principal part of the boundary-trapping lemma follows. In particular, these inequalities are a concrete sufficient realization of the coupled parameter solvability proposition for the principal many-body corridor.

> **Proof draft.**
> On each controlled window,
> $$
> \ddot{\rho}^{\mathrm{mb}}_m
> \le
> -\mathfrak{m}^{\mathrm{mb}}_{m,W}
> $$
> by definition of the principal floor. Therefore the outward speed can persist for at most
> $$
> V^{\mathrm{mb}}_{m,W,\max}/\mathfrak{m}^{\mathrm{mb}}_{m,W}
> $$
> time, which is available by hypothesis. Integrating once more gives the excursion ceiling
> $$
> E^{\mathrm{mb}}_{m,W}
> \le
> \frac{\bigl(V^{\mathrm{mb}}_{m,W,\max}\bigr)^2}
> {2\mathfrak{m}^{\mathrm{mb}}_{m,W}}.
> $$
> The slack inequalities in Step 4 then prevent the corresponding support, shear, or role boundary from being reached before turning. The Jacobian and fold hypotheses ensure that no fold or transversality loss invalidates the comparison law on the same windows. Hence the four principal channels remain trapped inside the explicit convex core.

One should also record a practical scaling corridor for later proofs. The first planar-three-body bridge should be pursued in a regime where
$$
\eta,\epsilon_c\downarrow 0,
\qquad
\tau^{\mathrm{mb}}_{\mathrm{dp}}\uparrow\infty,
$$
with:

- the branchwise Jacobian floors and cone apertures fixed away from zero;
- the fold ceilings
  $$
  F^{\mathrm{mb}}_m
  $$
  remaining
  $$
  o(1)
  $$
  relative to the inward branch-sum floors
  $$
  \underline{\Lambda}^{\mathrm{mb}}_{m,W};
  $$
- the deep-past ceiling
  $$
  \overline{A}^{\mathrm{mb}}_{\mathrm{deep}}
  $$
  tending to zero;
- and the entry speeds
  $$
  V^{\mathrm{mb}}_{m,W,\max}
  $$
  small enough that the excursion ceilings stay below the fixed convex-core slack.

In that corridor the coupled parameter problem is no longer a vague compatibility hope. It is reduced to checking a finite family of explicit inequalities against one seed-centered slack budget.

Accordingly, the abstract coupled parameter solvability proposition should be read as proved once one verifies:

1. the explicit convex tame core proposition;
2. the explicit principal-channel parameter corridor above;
3. the branchwise Jacobian and no-accumulation floors on the same parameter slab;
4. and the deep-past / ancestry suppression inequalities on that slab.

This is the planar-three-body analogue of the explicit short-window recapture regime in the frozen 1D scaffold. The closure packages may now consume it as a named parameter-intersection target rather than a silent background hope.

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
> 4. the same bounded caustic-transit data
>    $$
>    M_{\max}^{\mathrm{mb}},
>    \qquad
>    \mathfrak{F}^{\mathrm{mb}}_1,
>    \qquad
>    \mathfrak{F}^{\mathrm{mb}}_2,
>    \qquad
>    \mathfrak{F}^{\mathrm{mb}}_3,
>    \qquad
>    \mathfrak{F}^{\mathrm{mb}}_4;
>    $$
> 5. the same smooth-window floors
>    $$
>    a_{\min},
>    \qquad
>    b_{\min},
>    \qquad
>    \Delta_{\min},
>    \qquad
>    \delta_{\mathrm{role},\min};
>    $$
> 6. the same controlled windows
>    $$
>    I^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    I^{\mathrm{mb}}_{m,\mathrm{late}},
>    \qquad
>    m=1,2,3,4;
>    $$
> 7. the same fold ceilings
>    $$
>    F^{\mathrm{mb}}_1,
>    \qquad
>    F^{\mathrm{mb}}_2,
>    \qquad
>    F^{\mathrm{mb}}_3,
>    \qquad
>    F^{\mathrm{mb}}_4;
>    $$
> 8. and the same strict positivity margins
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{post}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{2,\mathrm{late}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{post}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{late}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{post}},
>    \quad
>    \mathfrak{M}^{\mathrm{mb}}_{4,\mathrm{late}},
>    $$
>    together with the remaining
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{post}},
>    \qquad
>    \mathfrak{M}^{\mathrm{mb}}_{m,\mathrm{late}}
>    $$
>    for
>    $$
>    m=5,\dots,K_{\mathrm{esc}}.
>    $$

This is the correct tame-structure target because the first two Jacobi channels are no longer abstract placeholders. If their window geometry or margin positivity is not propagated through the return map, then the concrete recapture lemma has no stable domain on which to operate.

> **Proof draft of the closed tame graph-stable subregion proposition.**
> Assume the coupled parameter solvability proposition and the explicit convex tame core proposition. Let
> $$
> \mathcal{T}^{\mathrm{mb}}_{A_\ast,\eta}
> $$
> be the tame subregion produced by the hypergraph-and-atlas stability proposition. Define
> $$
> \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}
> $$
> to be the closed subset of that tame region on which the same gauge chart, event class, ancestry bounds, smooth-window floors, fold ceilings, and principal margins are all preserved with the same constants.
> Choose in addition a nonempty convex subset
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> \subseteq
> \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}
> $$
> given by the explicit tube-and-cone construction and lying entirely inside the same tame region.
>
> 1. **Closedness.**
>    Each defining inequality for
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}
>    $$
>    is closed in the ambient
>    $$
>    C^1
>    $$
>    topology: non-strict norm bounds are closed, lower bounds on the preserved floors are closed after the margins are frozen with positive slack, and the event class is constant on the tame region by construction. Hence
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}
>    $$
>    is closed.
>
> 2. **Nonemptiness.**
>    The seed history used to define the tame region belongs to
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta},
>    $$
>    and the coupled parameter solvability proposition guarantees that the defining margins and floors are simultaneously satisfiable, so the set is nonempty.
>
> 3. **Return-map invariance at the level of tame data.**
>    By the earlier well-posedness, no-accumulation, caustic-transit, ancestry, and recapture packages, every history in
>    $$
>    \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}
>    $$
>    completes one controlled cycle with the same preserved constants. After the canonical gauge reset, the returned history therefore lies in the same closed tame data class.

> **Lemma (Boundary trapping for the explicit convex core).**
> Assume the explicit convex tame core proposition, the coupled parameter solvability proposition, the principal four-channel recapture closure proposition, and the closed tame graph-stable subregion proposition.
> Then every codimension-one boundary face of
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> $$
> coming from one defining tube, cone, or affine support inequality is strictly inward-pointing under one controlled return.
>
> More precisely:
> 1. if the returned history touched one pair-axis support face
>    $$
>    \mathbf{n}^{a}_W\cdot \mathbf{a}=\alpha^{a}_W
>    $$
>    or one boundary ray of
>    $$
>    \mathfrak{C}^{a}_W,
>    $$
>    then the corresponding boundary defect would force a nonnegative outward drift in
>    $$
>    \rho^{\mathrm{mb}}_1,
>    $$
>    contradicting
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{post}}>0
>    \qquad
>    \text{or}
>    \qquad
>    \mathfrak{M}^{\mathrm{mb}}_{1,\mathrm{late}}>0;
>    $$
> 2. if it touched one midpoint support face or one boundary ray of
>    $$
>    \mathfrak{C}^{b}_W,
>    $$
>    the same argument contradicts the
>    $$
>    \rho^{\mathrm{mb}}_2
>    $$
>    margins;
> 3. if it touched the shear-separation boundary determined by the cone pair
>    $$
>    (\mathfrak{C}^{a}_W,\mathfrak{C}^{b}_W),
>    $$
>    then the resulting loss of signed-area slack contradicts the
>    $$
>    \rho^{\mathrm{mb}}_3
>    $$
>    margin positivity;
> 4. if it touched one role-gap support face or one boundary ray of
>    $$
>    \mathfrak{C}^{\mathrm{role}}_W,
>    $$
>    the resulting near-tie contradicts the
>    $$
>    \rho^{\mathrm{mb}}_4
>    $$
>    margin positivity;
> 5. if it touched one velocity-cone face
>    $$
>    \partial\mathfrak{V}^{i}_W,
>    $$
>    then the corresponding chord projection reaches the Jacobian transversality threshold and contradicts the preserved branch-regularity floor
>    $$
>    \nu^{\mathrm{cvx}}_{J,\beta}>0;
>    $$
> 6. and if it touched one outer Banach-tube face in the ambient
>    $$
>    C^0/C^1
>    $$
>    box, then the resulting extremal history would violate the reserved post-transit and recapture slack from the coupled parameter regime.

> **Proof draft.**
> Let one returned history touch a boundary face of
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}.
> $$
> Because the closed tame graph-stable subregion proposition already preserves the event class, fold ceilings, deep-past bounds, smooth windows, and principal margins, only the explicit convex-core inequalities need to be checked.
>
> 1. **Support faces for**
>    $$
>    \mathbf{a},
>    \mathbf{b}.
>    $$
>    Touching
>    $$
>    \mathbf{n}^{a}_W\cdot \mathbf{a}=\alpha^{a}_W
>    $$
>    means the pair axis has exhausted its inward slack on one controlled window. But the corresponding margin positivity forces
>    $$
>    \ddot{\rho}^{\mathrm{mb}}_1<0
>    $$
>    there, so the returned history cannot remain on or beyond that support face. The same argument with
>    $$
>    \rho^{\mathrm{mb}}_2
>    $$
>    excludes contact with the midpoint support face.
>
> 2. **Cone rays and shear boundary.**
>    Contact with a boundary ray of
>    $$
>    \mathfrak{C}^{a}_W
>    \qquad
>    \text{or}
>    \qquad
>    \mathfrak{C}^{b}_W
>    $$
>    is exactly the loss of angular slack that drives
>    $$
>    |\det(\mathbf{a},\mathbf{b})|
>    $$
>    toward its minimum. The
>    $$
>    \rho^{\mathrm{mb}}_3
>    $$
>    comparison law forbids persistent outward motion toward that shear boundary while
>    $$
>    \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{post}},
>    \mathfrak{M}^{\mathrm{mb}}_{3,\mathrm{late}}>0.
>    $$
>
> 3. **Role boundary.**
>    Contact with one support face or boundary ray of
>    $$
>    \mathfrak{C}^{\mathrm{role}}_W
>    $$
>    is precisely the collapse of the distinguished-core role gap. But the role-exchange margin positivity forces
>    $$
>    \ddot{\rho}^{\mathrm{mb}}_4<0
>    $$
>    on the role windows, so this boundary cannot be reached under one controlled return.
>
> 4. **Velocity-cone faces.**
>    If one returned history touched
>    $$
>    \partial\mathfrak{V}^{i}_W,
>    $$
>    the corresponding emitter velocity would saturate the branchwise transversality inequality against one admissible chord-direction cone. That contradicts the preserved positive Jacobian floor and hence the no-accumulation / branch-regularity package.
>
> 5. **Outer Banach-tube faces.**
>    On the remaining ambient tube faces, use the reserved trapping slack from the coupled-parameter regime together with the bounded caustic-transit ceilings and the recapture margins. Any returned history touching the outer
>    $$
>    C^0/C^1
>    $$
>    boundary would require one principal observable or one kinematic ceiling to use up all reserved slack, contradicting the previously established inward comparison laws and post-transit bounds.
>
> Hence every defining boundary face is inward-pointing.

> **Lemma (One-cycle preservation of the explicit convex core inequalities).**
> Assume the explicit convex tame core proposition, the coupled parameter solvability proposition, the boundary trapping lemma above, and the closed tame graph-stable subregion proposition.
> Then the gauge-reset return map sends every history in
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> $$
> to a returned history satisfying the same:
> 1. seed-centered tube bounds
>    $$
>    \varepsilon_X,
>    \qquad
>    \varepsilon_V,
>    \qquad
>    \varepsilon_A;
>    $$
> 2. pointwise cone conditions
>    $$
>    \mathfrak{C}^{a}_W,
>    \qquad
>    \mathfrak{C}^{b}_W,
>    \qquad
>    \mathfrak{C}^{\mathrm{role}}_W,
>    \qquad
>    \mathfrak{V}^{i}_W;
>    $$
> 3. and affine support inequalities
>    $$
>    \alpha^{a}_W,
>    \qquad
>    \alpha^{b}_W,
>    \qquad
>    \alpha^{\mathrm{role}}_W.
>    $$

> **Proof draft.**
> The returned history already lies in the same closed tame data class by the previous proposition, so the active event class, smooth-window floors, fold ceilings, and principal margins are preserved.
>
> Assume for contradiction that the returned history does not lie in
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}.
> $$
> Since the convex core is closed and the seed lies strictly in its interior relative to the preserved tame class, there is a first defining boundary face touched by the returned history. But the boundary trapping lemma rules out contact with every such face: pair and midpoint support faces are excluded by
> $$
> \rho^{\mathrm{mb}}_1,
> \rho^{\mathrm{mb}}_2,
> $$
> the shear boundary by
> $$
> \rho^{\mathrm{mb}}_3,
> $$
> the role boundary by
> $$
> \rho^{\mathrm{mb}}_4,
> $$
> the velocity-cone faces by the preserved Jacobian floors, and the remaining ambient tube faces by the reserved trapping slack in the coupled-parameter regime. This contradiction proves
> $$
> \mathcal{P}^{\mathrm{mb}}_{\eta}
> \big(
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> \big)
> \subseteq
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}.
> $$

> **Proof draft of the invariant-envelope closure theorem.**
> Assume the coupled parameter solvability proposition and the explicit convex tame core proposition.
> The remaining closure burden is to show that the gauge-reset return map
> $$
> \mathcal{P}^{\mathrm{mb}}_{\eta}
> $$
> sends
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> $$
> into itself.
>
> 1. The well-posedness and continuation packages ensure the map is defined on the whole tame region.
> 2. The no-accumulation and caustic-transit packages preserve the event class and fold ceilings.
> 3. The ancestry package preserves the deep-past ceiling.
> 4. The recapture package preserves the principal margin positivity and the controlled windows.
> 5. The one-cycle convex-core preservation lemma preserves the same tube-and-cone inequalities.
> 6. The gauge reset preserves the chosen chart representative.
>
> Therefore
> $$
> \mathcal{P}^{\mathrm{mb}}_{\eta}
> \big(
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> \big)
> \subseteq
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}.
> $$

> **Target Theorem (Planar-three-body invariant-envelope closure and Schauder capstone).**
> Assume the convex Banach-envelope proposition, the hypergraph-and-atlas stability proposition on that envelope, the explicit convex tame core proposition, the coupled parameter solvability proposition, the closed tame graph-stable subregion proposition, the corresponding invariant-envelope closure theorem, and continuity and precompactness of the gauge-fixed many-body return map on the relevant convex Banach box.
>
> Then the return map has a fixed point
> $$
> \Phi^{\ast,\mathrm{mb}}_\eta
> \in
> \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta},
> $$
> and the associated delayed trajectory is a bounded relative-periodic planar-three-body solution of the dual-mollified master equation modulo the canonical
> $$
> SE(2)
> $$
> gauge. It is an absolute periodic solution in the fixed Euclidean void only if the accumulated full-cycle holonomy is
> $$
> H^{\mathrm{mb}}_{\Phi^{\ast,\mathrm{mb}}_\eta}=(0,\mathrm{Id}).
> $$
>
> In particular, the fixed-point trajectory preserves one common gauge chart, one common active delay hypergraph, one common ancestry complex, and one common family of post-crossing and late-turn recapture margins through every return. That is the many-body analogue of the earlier bridge closures on one tame self-map domain.

> **Proof draft of the Schauder capstone.**
> Apply Schauder directly to the return map
> $$
> \mathcal{P}^{\mathrm{mb}}_{\eta}
> $$
> on the convex subset
> $$
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> \subseteq
> \mathcal{C}^{\mathrm{mb}}_{A_\ast,\eta}.
> $$
> By the closure theorem,
> $$
> \mathcal{P}^{\mathrm{mb}}_{\eta}
> \big(
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> \big)
> \subseteq
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}},
> $$
> and by assumption the map is continuous and precompact there. Therefore the standard Schauder fixed-point theorem yields one fixed history
> $$
> \Phi^{\ast,\mathrm{mb}}_\eta
> \in
> \mathcal{K}^{\mathrm{mb}}_{\mathrm{cvx}}
> \subseteq
> \mathcal{K}^{\mathrm{mb}}_{A_\ast,\eta}.
> $$
> The corresponding trajectory is relative-periodic by construction of the gauge-reset return map and remains bounded because it never leaves the same controlled Banach box and tame data class. Absolute periodicity is the separate zero-holonomy reconstruction condition stated above.

This is the first honest local many-body breather target in the chapter. Everything above it is there only to make this statement legitimate.

The planar-three-body bridge now has the same explicit theorem-ladder shape as the earlier binary bridges:

- gauge-fixed section and shape-space well-posedness;
- quantitative branch regularity and no-accumulation of delay events;
- bounded many-body caustic transit and fold ceilings;
- finite active delay-hypergraph control;
- cluster-valued ancestry or exclusion for deep-past branches;
- finite escape-observable recapture on explicit smooth windows;
- and atlas-level tame-envelope closure leading to the Schauder capstone.

### Capstone Statement

The 1D collinear chapter should now be used as a frozen reference theorem scaffold. The present chapter records the higher-level lesson:

> **Theorem Program (Breather architecture for the master equation).**
> A master-equation breather theorem should be pursued from the dual-mollified absolute-time integral law, with branch sums used only on certified simple-root charts. The proof task is to construct a sectioned history-space return map, produce one candidate cycle with finite certificate data, separate convex Banach bounds from tame delayed-root geometry, and then close the resulting return map on one closed convex tame self-map domain. The unresolved burden is no longer the abstract fixed-point theorem or an elementary closed-form orbit. It is the geometric production and certification of that domain outside the ordered 1D setting.

Operationally, the live proof burden remains the collinear certificate chain:
$$
\phi_{\mathrm{cyc}}
\to
\text{null-coordinate pre-ledger closure}
\to
\text{finite branch chart}
\to
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
\to
P_\eta(\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}})
\subseteq
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
\to
\text{Schauder}.
$$
Here the pre-ledger is a candidate-falsification gate: unresolved parent-complement strips stop the chain before branch-chart, certificate, self-map, or Schauder work begins.

The reduced planar, unreduced planar, and planar three-body sections should stay frozen as dependency maps until that chain is closed.

This is the correct point from which to resume work on the broader dynamics stack.

### Related Chapters

- [master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md)
- [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md)
- [binary-dynamics.md](../../../../markdown/aaa/dynamics/binary-dynamics.md)
- [tri-binary-dynamics.md](../../../../markdown/aaa/dynamics/tri-binary-dynamics.md)
- [energy.md](../../../../markdown/aaa/dynamics/energy.md)

## 1D Collinear Binary (Reduced Model)

This chapter isolates the simplest reduced dynamical problem that can test a self-hit-assisted bounded-recapture mechanism without tangential geometry. Its purpose is to provide a mathematically tractable bridge between the full delayed master equation and the first rigorous existence question for bounded two-body motion.

The guiding idea is narrow: if delayed self-interaction can contribute to any bounded recapture mechanism at all, it should first be visible in a reflection-symmetric one-dimensional opposite-charge binary. If it cannot be made to work there, then later claims about maximum-curvature binaries, tri-binary locking, and assembly-level closure lose their cleanest analytic foothold.

### Overview

In Lineland there is only a single endless road. Upon it travel two charged points. From a great distance they rush toward one another, drawn together by their mutual pull. Each accelerates as it approaches the other. Yet whatever influence a point emits into the line does not act everywhere at once; it spreads along the road at a finite pace, leaving behind a wake of its past motion. For a time each charge runs ahead of the disturbance it has already sent out. They meet, pass, and continue apart. But presently each encounters the older wake it cast while approaching. This delayed encounter pushes outward, while the partner charge, now behind, continues to pull inward. Thus the whole affair reduces to a contest on a line: a delayed push from one’s own past against the present pull of the other. The purpose of this chapter is to determine whether that contest can be forced into repeated recapture rather than escape, and to state the theorem program that would make such a bounded cycle rigorous.

Formally, this chapter develops a proof scaffold for the global existence question of a periodic limit cycle in a symmetric two-body collinear system governed by a strongly nonlinear state-dependent delay differential equation. The dynamics use a dual-mollified delayed kernel, separating the short-distance $1/r^2$ singularity from the causal-shell boundary. The main analytic difficulty is the velocity-dependent causal-fold geometry, where Jacobians can approach
$$
J\to 0.
$$
The scaffold attacks that geometry by constructing the sorting maps
$$
w(t)=x(t)+c_f t
\qquad
\text{and}
\qquad
z(t)=x(t)-c_f t,
$$
which isolate root birth, root exclusion, deep-past localization, and bounded caustic transit. From there the delayed dynamics are reduced to explicit conservative force margins for the inner recapture and the outer apocenter turn, and these are assembled into a closed, convex, precompact invariant-envelope program in
$$
C^1([-h,0]).
$$
The final fixed-point step is then delegated to Arzela-Ascoli compactness and a Schauder-type argument once the nonempty tame class is fully propagated through one cycle. At present, that capstone remains a theorem target rather than a completed proof.

### Status Map

This chapter now has three different status layers, and they should be read separately:

- completed local and regional lemma packages, especially for delayed-root geometry, caustic transit, inner recapture, and trimmed-apocenter outer-turn control,
- target propositions that package those estimates into one closed convex tame self-map domain,
- and the final Schauder capstone, which remains conditional on that domain-level closure.

In particular, the manuscript already contains substantial outer-turn and apocenter material. The main remaining burden is not to invent an outer-turn mechanism from scratch, but to assemble the local theorem packages into one coupled invariant-envelope regime on which the return map is continuous, precompact, and self-mapping.

This chapter is the proof core for the breather program. Completion now means replacing the conditional finite-certificate rows with one verified certificate: an instantiated
$$
\phi_{\mathrm{cyc}},
$$
a finite branch chart, a closed convex certificate, a strict coupled corridor, a monodromy diagnostic, returned-sample preservation, certified topology, and then Schauder.

### Reading Map

Readers looking for the main structural bottlenecks can use the following map.

- The sign and physical interpretation caveat appears in [Signed-branch caution](#signed-branch-caution).
- The return-map setup begins in [Regularized Return Map](#regularized-return-map).
- The compactness and fixed-point architecture begins in [Global Existence via Arzela-Ascoli](#global-existence-via-arzela-ascoli).
- The coupled-envelope bottleneck appears in [Invariant-envelope closure](#invariant-envelope-closure) and the later [Capstone Statement](#capstone-statement).
- The outer-turn program is developed in [Outer-turn recapture target](#outer-turn-recapture-target), [Deep-past outer self suppression target](#deep-past-outer-self-suppression-target), [z-map descent target](#z-map-descent-target), and the [Capstone Statement](#capstone-statement).
- The compressed endpoint appears in [Capstone Statement](#capstone-statement).

### Proof-Program Dependency Map

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

### Purpose

The full dynamics stack currently mixes several hard problems at once:

- state-dependent delays,
- Jacobian amplification,
- self-hit branch birth,
- tangential drift in 2D and 3D,
- and multi-scale coupling in tri-binaries.

This chapter strips away everything except the minimum ingredients needed to test a bounded delayed orbit:

- two architrinos,
- one spatial dimension,
- opposite polarities,
- exact partner hits,
- exact self-hit roots,
- and an $\eta>0$ regularization suitable for return-map analysis.

The point is not to claim that this reduced problem is already the physical atom of the theory. The point is to identify the first model in which a breather-like bounded state could be proved or ruled out.

This chapter should therefore be read as an internal reduced model inside $\mathbb{A}\mathbb{A}\mathbb{A}$, not as a claim about standard electrodynamics. Its delayed kernel, self-hit bookkeeping, and dual-mollified return-map architecture are the working axioms of the present theorem program. The relation of that program to more classical delayed-interaction formalisms, such as action-based Fokker or Wheeler-Feynman-type viewpoints, belongs to the surrounding master-equation discussion rather than being assumed here as an equivalence theorem.

### Exact 1D State Variables

Work on the reflection-symmetric center-of-mass subspace
$$
x_1(t)=-x(t),
\qquad
x_2(t)=x(t),
\qquad
q_1=-\epsilon,
\qquad
q_2=+\epsilon.
$$

Here:

- $x(t)\in\mathbb{R}$ is the signed position of the right-hand architrino,
- $\dot x(t)$ is its signed velocity,
- the center of mass is fixed at the origin,
- and the full two-body state is recovered by reflection.

The exact delayed state lives on a history space
$$
\mathcal{H}_h = C^1([-h,0];\mathbb{R}),
$$
with history segment
$$
x_t(\theta)\equiv x(t+\theta),
\qquad
\theta\in[-h,0],
$$
for a memory horizon $h>0$ large enough to contain all active causal roots under study.

Useful derived quantities:
$$
d(t)\equiv 2|x(t)|,
\qquad
u(t)\equiv \dot x(t).
$$

When $x(t)>0$ and $u(t)<0$, the labeled right-hand architrino is inbound on the right exterior branch. After label-preserving passage through the center, the same particle continues on the left exterior branch with $x(t)<0$. For theorem work on full oscillations, the safest interpretation is therefore in signed coordinates $x\in\mathbb{R}$ together with the radial distance $d(t)=2|x(t)|$.

### Partner-Only Hinge Radius

Before self-hit is active, the natural zeroth-order picture is partner-dominated infall from large separation. In that reduced picture it is useful to define the first dynamically meaningful radius as the location where the inbound speed reaches the field speed.

#### Definition

Let $x_{c_f}>0$ denote the **hinge radius** for the partner-only inbound benchmark:
$$
|u| = c_f
\qquad
\text{at}
\qquad
x = x_{c_f}.
$$

This is not yet a theorem of the full delayed system. It is a reduced-model normalization tied to the inbound partner-attraction phase before the self-hit-capable regime is entered.

#### Dimensionless normalization

Define
$$
\chi \equiv \frac{x}{x_{c_f}},
\qquad
\upsilon \equiv \frac{u}{c_f}.
$$

Then the hinge is located at
$$
\chi = 1,
\qquad
|\upsilon|=1.
$$

This makes the reduced narrative explicit:

- $\chi \gg 1$: far-field partner-dominated infall,
- $\chi \searrow 1$: approach to the field-speed hinge,
- $\chi < 1$: self-hit-capable regime becomes dynamically relevant.

#### Coulomb-like zeroth-order estimate

If one uses the quadratic kinetic bookkeeping proxy with universal constant $\mu_{\text{arch}}$ and ignores delay at leading order, the partner-only effective potential is
$$
U_{\text{pair}}(x)
\approx
-\frac{\kappa\epsilon^2}{2x},
$$
since the pair separation is $d=2x$.

Starting from rest at infinity, a zeroth-order energy balance gives
$$
\frac{1}{2}\mu_{\text{arch}} u^2
\approx
\frac{\kappa\epsilon^2}{2x}.
$$

Imposing the hinge condition $|u|=c_f$ yields
$$
\mu_{\text{arch}} c_f^2
\approx
\frac{\kappa\epsilon^2}{x_{c_f}},
\qquad
x_{c_f}
\approx
\frac{\kappa\epsilon^2}{\mu_{\text{arch}} c_f^2}.
$$

Thus one may, if desired, choose reduced units so that
$$
x_{c_f}=1.
$$

This is the cleanest way to formalize the intuition that the partner-only inbound fall from infinity reaches field speed at a distinguished radius. In the bookkeeping convention just displayed, setting $x_{c_f}=1$ fixes the dimensionless combination
$$
\frac{\kappa\epsilon^2}{\mu_{\text{arch}}c_f^2}=1.
$$
If one also chooses reduced units with $c_f=1$, $\epsilon=1$, and $\mu_{\text{arch}}=1$, then the local benchmark has $\kappa=1$. This is a unit convention for the partner-only hinge estimate, not a physical derivation of the coupling. An acceleration-first normalization that omits the quadratic bookkeeping constant must declare its convention separately, because numerical factors in the hinge relation then shift.

The partner-only benchmark should also not be read as a crossing formula at the origin. The same zeroth-order energy estimate gives
$$
u^2
\approx
\frac{\kappa\epsilon^2}{\mu_{\text{arch}}x},
$$
so it predicts $|u|\to\infty$ as $x\to0^+$. The hinge marks where the reduced partner-only model has reached the self-hit-capable regime and should hand off to the delayed root ledger rather than being extrapolated through the origin.

#### Delayed partner correction

The preceding estimate is intentionally only a dimensional scale. It drops the causal-root Jacobian and therefore should not be used as evidence that a released history reaches field speed at a finite exterior radius. On the simplest action-generated exterior chart, the partner source is locally affine:
$$
x(s)\approx x(t)-v(t-s),
\qquad
v=\dot x(t),
\qquad
x(t)>0.
$$
The partner causal equation gives
$$
\tau_p=t-s=\frac{2x}{c_f+v},
\qquad
r_p=c_f\tau_p,
\qquad
J_p=1+\frac{v}{c_f}.
$$
Thus the delayed partner force is not the naive conservative inverse-square force. The simple-root branch law is
$$
\ddot x
=
-\frac{g}{4x^2}
\left(1+\frac{\dot x}{c_f}\right),
\qquad
g\equiv\kappa\epsilon^2,
$$
as long as the exterior partner chart remains valid and $-c_f<\dot x$.

Writing
$$
\beta\equiv\frac{\dot x}{c_f},
\qquad
\alpha\equiv\frac{g}{4c_f^2},
$$
the phase equation has the exact invariant
$$
\beta-\beta_0
-\ln\!\left(\frac{1+\beta}{1+\beta_0}\right)
=
\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right).
$$
For a released exterior branch with $\beta_0=0$ at $x=x_0$, this becomes
$$
\beta-\ln(1+\beta)
=
\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right).
$$
The left side diverges as $\beta\to-1^+$, so this delayed partner branch approaches field speed only in the limiting approach to $x=0$, not at a finite exterior radius. The finite-radius hinge scale $x_{c_f}$ is therefore a normalization of the naive partner-only estimate, while the action-generated delayed partner test says that any finite-radius field-speed crossing must come from structure omitted by the affine exterior partner chart: finite-width shell effects, core-layer transit, nonaffine path history, self-image terms, or a different certified branch chart.

The corresponding exact sub-field branch can be written with the Lambert $W$ function. Let
$$
S(x)
\equiv
\beta_0-\ln(1+\beta_0)
+\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right).
$$
Then
$$
\beta_k(x)
=
-1-\operatorname{W}_k\!\left(-e^{-(S(x)+1)}\right).
$$
For the inbound released branch, $k=0$. Define
$$
\beta_{\mathrm{in}}(x)
\equiv
-1-\operatorname{W}_0\!\left(-e^{-(S(x)+1)}\right).
$$
Then $-1<\beta_{\mathrm{in}}(x)<0$, and the time parametrization is the quadrature
$$
t-t_0
=
\int_x^{x_0}\frac{d\xi}{-c_f\,\beta_{\mathrm{in}}(\xi)}.
$$
This is the controlled sub-field-speed analytic comparison problem: it is generated by the delayed branch force rather than by prescribing a future path. A full breather theorem still has to prove how this exterior branch connects through the core layer and returns through the history-space map.

#### Field-Speed Head-On Caustic Test

A tempting boundary test is to place the left Electrino and right Positrino at
$$
x_L(0)=-x_0,
\qquad
x_R(0)=+x_0,
$$
with inward velocities
$$
\dot x_L(0)=+c_f,
\qquad
\dot x_R(0)=-c_f.
$$
This is not ordinary initial data for the simple-root branch law unless the path history is also specified. If the intended prehistory is affine field-speed infall,
$$
x_L(s)=-x_0+c_fs,
\qquad
x_R(s)=x_0-c_fs,
\qquad
s\le0,
$$
then the opposite-source wake is still in flight at $t=0$. For the right-hand receiver before the origin meeting,
$$
x_R(t)-x_L(s)=c_f(t-s)
$$
reduces to
$$
2x_0-c_f(t+s)=c_f(t-s),
$$
and hence
$$
t=\frac{x_0}{c_f}.
$$
Thus there is no partner root for $0\le t<x_0/c_f$ on this affine chart, while at $t=x_0/c_f$ all affine source times co-arrive at the origin. That event is a caustic, not a regular branch.

The same-source ledger is already singular. Along either affine field-speed history,
$$
|x_i(t)-x_i(s)|=c_f(t-s)
$$
for every $s<t$, and the simple-root Jacobian is
$$
J=0.
$$
Therefore the exact field-speed head-on seed is a fail-closed separator test. It can be studied only through the dual-mollified finite-history integral with declared shell width, core scale, emission cadence if used, and memory horizon. If that regularized limit fails to converge, the result is not a failed simulation detail; it means that exact field-speed inbound history is not a lawful seed for the collinear breather certificate without dephasing, curvature, held-release preparation, or another branch-certified regularization mechanism.

The finite-history calculation can still be stated exactly before the origin caustic. For the right Positrino, define
$$
\Delta(t)\equiv 2(x_0-c_ft),
\qquad
g\equiv\kappa\epsilon^2.
$$
The same-source continuum contributes
$$
a_R^{\mathrm{self}}(t;H,\eta,\epsilon_c)
=
-g\,\delta_\eta(0)
\int_0^H
\frac{du}{c_f^2u^2+\epsilon_c^2}
=
-\frac{g\,\delta_\eta(0)}{c_f\epsilon_c}
\arctan\!\left(\frac{c_fH}{\epsilon_c}\right),
$$
while the off-shell partner tail contributes
$$
a_R^{\mathrm{partner}}(t;H,\eta,\epsilon_c)
=
-g\,\delta_\eta(\Delta(t))
\int_0^H
\frac{du}{(\Delta(t)+c_fu)^2+\epsilon_c^2}.
$$
Equivalently,
$$
a_R^{\mathrm{partner}}
=
-\frac{g\,\delta_\eta(\Delta(t))}{c_f\epsilon_c}
\left[
\arctan\!\left(\frac{\Delta(t)+c_fH}{\epsilon_c}\right)
-
\arctan\!\left(\frac{\Delta(t)}{\epsilon_c}\right)
\right].
$$
Thus the infinite-history limit is finite for fixed $\eta$ and $\epsilon_c$,
$$
a_R^{\mathrm{self}}(\infty,\eta,\epsilon_c)
=
-\frac{\pi g\,\delta_\eta(0)}{2c_f\epsilon_c},
$$
but it is not regulator independent. For any centered mollifier with $\delta(0)>0$ and
$$
\delta_\eta(y)=\eta^{-1}\delta(y/\eta),
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
-\frac{15\pi g}{32c_f\eta\epsilon_c}.
$$
At $t=0$ with $x_0=1$, this compact shell also sets the partner term exactly to zero whenever $\eta<2x_0$, because the partner support has not reached the receiver. The theory consequence is sharper than "the partner wake is in flight": an exact affine $v=c_f$ inbound history produces a regulator-dependent self-continuum acceleration before the partner wake can contribute. A lawful candidate must therefore break the exact continuum by preparation or branch geometry before the simple-root certificate can begin.

### Prepared Held-Release Benchmark

A useful initial-data test fixes the pre-release history explicitly. Let a right-hand Positrino and left-hand Electrino be held at
$$
x_2(t)=+x_0,\qquad x_1(t)=-x_0,\qquad x_0 > 0,
$$
with zero velocity for a holding interval long enough that the stationary partner wakes have reached the opposite side before release:
$$
T_{\mathrm{hold}}\ge \frac{2x_0}{c_f}.
$$
Set the release time to $t=0$. During the held interval the holding constraint cancels the stationary partner attraction, and a stationary architrino has no nontrivial self-hit root.

For the right-hand coordinate after release, while the partner emission time still lies in the held history, the partner source position is fixed at $-x_0$ and the partner Jacobian is $1$. The reduced equation is the ordinary initial-value problem
$$
\ddot x(t)
=
-\frac{\kappa\epsilon^2}{(x(t)+x_0)^2},
\qquad
x(0)=x_0,\qquad
\dot x(0)=0.
$$
In particular,
$$
\ddot x(0)
=
-\frac{\kappa\epsilon^2}{4x_0^2}.
$$
This initial action-generated ODE segment has an exact energy identity. With
$$
g\equiv\kappa\epsilon^2,
$$
one has
$$
\frac{1}{2}\dot x^2-\frac{g}{x+x_0}
=
-\frac{g}{2x_0},
$$
and therefore
$$
|\dot x|^2
=
2g\left(\frac{1}{x+x_0}-\frac{1}{2x_0}\right).
$$
Extrapolating the stationary-source ODE to the origin gives the speed bound
$$
|\dot x|_{\max}^2=\frac{g}{x_0}.
$$
Therefore the extrapolated held-source branch reaches field speed strictly before the origin only if
$$
c_f^2<\frac{g}{x_0},
$$
with equality corresponding to field speed at the origin. In the normalized comparison $g=1$ and $c_f=1$, a release from $x_0>1$ remains sub-field-speed throughout this ODE extrapolation, and therefore throughout the actual held-source segment. Thus a starting position such as $x_0=1.25$ does not by itself imply a field-speed crossing under the action-generated held-release force.

The handoff from held partner history to moving partner history is also explicit. Put
$$
y(t)\equiv x(t)+x_0.
$$
The inbound solution can be parametrized by
$$
y(\theta)=2x_0\cos^2\theta,
\qquad
x(\theta)=x_0\cos(2\theta),
\qquad
\dot x(\theta)=-\sqrt{\frac{g}{x_0}}\tan\theta,
$$
with
$$
t(\theta)=2x_0\sqrt{\frac{x_0}{g}}\left(\theta+\sin\theta\cos\theta\right).
$$
The first moving-partner emission, released at $t=0$, reaches the right-hand receiver when
$$
y(t_\ast)=c_ft_\ast.
$$
Equivalently, if
$$
\rho\equiv c_f\sqrt{\frac{x_0}{g}},
$$
then the handoff angle is the unique solution of
$$
\cos^2\theta_\ast
=
\rho\left(\theta_\ast+\sin\theta_\ast\cos\theta_\ast\right),
\qquad
0\le\theta_\ast\le\frac{\pi}{4},
$$
whenever the solution occurs before the origin. Since the left-minus-right side has derivative
$$
-\sin(2\theta)-2\rho\cos^2\theta<0,
$$
the root is unique. It occurs before or at the origin exactly when
$$
\rho\ge\frac{1}{1+\pi/2}.
$$
The stronger normalized condition $x_0>g/c_f^2$ gives $\rho>1$, so the held-source segment both hands off before the origin and remains strictly sub-field-speed up to the handoff.

If one asks whether field speed occurs before the handoff rather than before the origin, the exact comparison is sharper. Field speed would occur at $\theta_c=\arctan\rho$, so it occurs before handoff exactly when
$$
\frac{1-\rho^2}{1+\rho^2}>\rho\arctan\rho.
$$
The $x_0=1.25$, $g=1$, $c_f=1$ benchmark has $\rho>1$, so it is safely outside that early-field-speed regime.

For $x_0=1.25$, $g=1$, and $c_f=1$, the handoff values are
$$
\theta_\ast\approx0.400048009813582,
\qquad
x_\ast\approx0.8707972823389274,
\qquad
\dot x_\ast\approx-0.37820836925058077.
$$
Thus the lawful held-release preparation enters the moving-partner delayed chart with a finite sub-field-speed state rather than with the singular exact field-speed self-continuum.

The handoff is also a regular simple-root opening. For the moving partner emission time $t_e$, define
$$
F(t,t_e)\equiv x(t)+x(t_e)-c_f(t-t_e).
$$
At the handoff,
$$
F(t_\ast,0)=0,
\qquad
\partial_{t_e}F(t_\ast,0)=\dot x(0)+c_f=c_f>0.
$$
Therefore the delayed emission time continues uniquely for $t$ near $t_\ast$, with
$$
\frac{dt_e}{dt}
=
\frac{c_f-\dot x(t)}{c_f+\dot x(t_e)}.
$$
The partner Jacobian at handoff is
$$
J_p(t_\ast;0)=1+\frac{\dot x(0)}{c_f}=1,
$$
so the partner acceleration is continuous across the transition:
$$
-\frac{g}{(x(t_\ast)+x_0)^2}
=
-\frac{g}{(x(t_\ast)+x(0))^2\,J_p(t_\ast;0)}.
$$
Thus the held-release handoff is not a hidden caustic. It is a regular transfer from fixed partner history into the delayed moving-partner chart.

This ODE segment remains valid until the first post-release partner emission reaches the right-hand receiver. If $t_\ast$ denotes that handoff time, then
$$
x(t_\ast)+x_0=c_f t_\ast.
$$
After that time the partner root samples the moving history and must be solved as a delayed emission time $t_e < t$:
$$
x(t)+x(t_e)=c_f(t-t_e),
$$
with exterior-branch partner Jacobian
$$
J_p(t;t_e)=1+\frac{\dot x(t_e)}{c_f}.
$$
Thus the held-release benchmark supplies a simple ODE start, but it does not remove the delayed partner-root problem once the receiver begins sampling post-release history.

### Partner-Hit and Self-Hit Root Equations

For the right-hand architrino $x_2(t)=x(t)$, the exact causal root conditions split naturally into partner and self branches.

#### Partner-hit roots

A partner-hit emission time $t_0<t$ satisfies
$$
|x(t)+x(t_0)| = c_f(t-t_0).
$$

Define the partner-root set
$$
\mathcal{C}_p(t)
\equiv
\left\{
t_0<t \;\middle|\; |x(t)+x(t_0)| = c_f(t-t_0)
\right\}.
$$

On this symmetry subspace the 1D line-of-action sign is
$$
\hat r_p(t;t_0)=\mathrm{sgn}\!\big(x(t)+x(t_0)\big),
$$
and the partner Jacobian becomes
$$
J_p(t;t_0)
=
1-\frac{\dot x_1(t_0)\hat r_p(t;t_0)}{c_f}
=
1+\frac{\dot x(t_0)\hat r_p(t;t_0)}{c_f}.
$$

Because $q_1q_2<0$, this branch is attractive.

#### Self-hit roots

A nontrivial self-hit emission time $t_0<t$ satisfies
$$
|x(t)-x(t_0)| = c_f(t-t_0),
\qquad
t_0\neq t.
$$

Define the self-root set
$$
\mathcal{C}_s(t)
\equiv
\left\{
t_0<t \;\middle|\; |x(t)-x(t_0)| = c_f(t-t_0)
\right\}.
$$

The self line-of-action sign is
$$
\hat r_s(t;t_0)=\mathrm{sgn}\!\big(x(t)-x(t_0)\big),
$$
and the self Jacobian is
$$
J_s(t;t_0)
=
1-\frac{\dot x(t_0)\hat r_s(t;t_0)}{c_f}.
$$

Because $q_2q_2>0$, each self branch is repulsive.

#### Reduced branch-resolved equation

On the exact root-selected model, the right-particle acceleration is
$$
\ddot x(t)
=
-\,\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_p(t)}
\frac{\hat r_p(t;t_0)}
{|x(t)+x(t_0)|^2\,|J_p(t;t_0)|}
+
\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_s(t)}
\frac{\hat r_s(t;t_0)}
{|x(t)-x(t_0)|^2\,|J_s(t;t_0)|}.
$$

The first sum is partner attraction. The second is self-hit repulsion. Reflection symmetry gives the left-particle equation automatically.

Plain language: in 1D there is no tangential direction to hide in. The entire competition is between delayed inward attraction and delayed outward self-repulsion, with the Jacobian deciding how sharply each branch is weighted.

### Regularized 1D Equation

For analysis and numerics, replace the shell delta by a smooth mollifier $\delta_\eta$ with width $\eta>0$. Then the reduced equation can be written in integral form:
$$
\ddot x(t)
=
-\,\kappa \epsilon^2
\int_{-\infty}^{t} dt_0\;
\frac{\hat r_p(t;t_0)}
{|x(t)+x(t_0)|^2}
\delta_\eta\!\big(|x(t)+x(t_0)|-c_f(t-t_0)\big)
$$
$$
\qquad
+
\kappa \epsilon^2
\int_{-\infty}^{t} dt_0\;
\frac{\hat r_s(t;t_0)}
{|x(t)-x(t_0)|^2}
\delta_\eta\!\big(|x(t)-x(t_0)|-c_f(t-t_0)\big),
$$
with the understanding that the exact Jacobian factors reappear in the branch-sum representation when the mollified shell collapses onto isolated roots.

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
\int_{\mathbb{R}}\delta(y)\,dy=1,
$$
and set
$$
\delta_\eta(y)\equiv \eta^{-1}\delta(y/\eta).
$$
Thus
$$
\operatorname{supp}\delta_\eta\subset[-\eta,\eta],
\qquad
\int_{\mathbb{R}}\delta_\eta(y)\,dy=1,
\qquad
\|\delta_\eta\|_\infty=\eta^{-1}\|\delta\|_\infty.
$$
Every shell-leakage, fold-impulse, and outer-self estimate using
$$
\|\delta_\eta\|_\infty
$$
uses this convention. On a simple-root chart,
$$
\int f(s)\delta_\eta(g(t,s))\,ds
\longrightarrow
\sum_{g(t,s_k)=0}
\frac{f(s_k)}{|\partial_s g(t,s_k)|},
$$
and the fixed factor
$$
c_f^{-1}
$$
from
$$
\partial_s g=c_fJ
$$
is absorbed into the branch-law normalization of
$$
\kappa.
$$

For theorem work across the origin crossing, shell regularization alone is not enough to control the inverse-square amplitude. A more robust local model therefore introduces a **dual mollification**: the shell mollifier $\delta_\eta$ for delayed root selection together with a short-distance core mollifier $\epsilon_c>0$ in the amplitude denominator,
$$
\frac{1}{r^2}
\quad\leadsto\quad
\frac{1}{r^2+\epsilon_c^2}.
$$
This leaves the delayed shell selection controlled by $\eta$ while the core mollifier caps the near-origin amplitude spike strongly enough for a clean $C^1$ theorem program.

For the certified finite-memory problem, the exact dual-mollified reduced evolution law is the absolute-time integral
$$
\ddot x(t)
=
-\,\kappa\epsilon^2
\int_{t-h}^{t}
\frac{\hat r_p(t;s)}
{|x(t)+x(s)|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|x(t)+x(s)|-c_f(t-s)\big)\,ds
$$
$$
\qquad
+
\kappa\epsilon^2
\int_{t-h}^{t}
\frac{\hat r_s(t;s)}
{|x(t)-x(s)|^2+\epsilon_c^2}\,
\delta_\eta\!\big(|x(t)-x(s)|-c_f(t-s)\big)\,ds.
$$
The branch-sum equations used throughout the proof scaffold are simple-root reductions of this law. Across causal folds, caustic transit, and certified topology arguments, the integral law is the primary object.

The regularized formulation is the one best suited to:

- local well-posedness,
- continuation criteria,
- numerical return-map construction,
- and eventually the controlled limit $\eta\to 0^+$.

#### Origin-layer continuity of the dual-mollified 1D field

On an interval that contains an origin crossing, the working equation is the absolute-time integral law above, not the branch-sum reduction. The branch-sum signs
$$
\hat r_p,
\qquad
\hat r_s
$$
are exterior-chart data. They must be reattached to the correct outgoing sheet after the crossing, and they should not be treated as a smooth scalar formula through
$$
x=0.
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
> |t|\le \tau_{\mathrm{cross}},
> $$
> with fixed incoming and outgoing exterior-sheet labels. Define the sheet-projected radial acceleration on the layer by applying the absolute-time integral law in the signed coordinate and then projecting to the active radial sheet:
> $$
> F^\rho_{\eta,\epsilon_c}(t)
> \equiv
> \sigma_{\mathrm{out}}(t)F^x_{\eta,\epsilon_c}(t),
> \qquad
> \rho(t)=|x(t)|.
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
\epsilon_c^2,
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
x=0,
$$
but the radial projection multiplies by the outgoing sheet label at the same crossing. On the two sides of the layer this converts the exterior signed direction into the same radial direction field. Any remaining sign changes occur only across the certified causal-root surfaces inside the integral; away from certified folds they are simple-root changes of variables, and at certified folds the fold tube is handled by the integral law rather than by a branch sum. Dominated convergence, with the standard one-dimensional coarea calculation on the simple-root pieces, gives continuity and the first radial derivative on the whole layer.

Thus the core scale controls the amplitude and the shell scale controls the root selection, while the sheet projection controls the origin sign flip. Exterior branch-sum formulas may be resumed after the trajectory leaves the crossing layer and the signed sheet labels are again fixed.

### Inbound/Outbound Sign Structure

The first genuine dynamical question is not whether self-hit exists, but whether its sign structure permits recapture. In 1D this can be stated exactly.

#### Exterior-branch convention

Fix an interval on which
$$
x(t)>0.
$$

Then:

- **inbound** means $\dot x(t)<0$,
- **outbound** means $\dot x(t)>0$.

This is the natural branch on which to analyze collapse, rebound, and return to a section at $x=x_\ast>0$.

#### Partner term

On the exterior branch, the partner source points inward only for active partner roots whose delayed source remains on the opposite side of the current right-hand particle. In the signed variables this is the branch condition
$$
x(t)+x(t_0)>0.
$$
The recapture estimates below use a tame exterior-root class in which all active partner roots entering the lower-bound arguments satisfy this condition. Any partner roots with
$$
x(t)+x(t_0)<0
$$
are not inward partner roots; they must either be excluded by the delayed-root hypotheses or carried as a separate error channel.

Write
$$
A_p(t)
\equiv
\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_p(t)}
\frac{\mathbf{1}_{\{x(t)+x(t_0)>0\}}}{|x(t)+x(t_0)|^2\,|J_p(t;t_0)|}
\ge 0.
$$

On that inward exterior partner channel the signed contribution is
$$
a_p(t)=-A_p(t).
$$

Therefore, when the inward exterior partner channel is active:

- on the inbound leg, $a_p$ has the **same sign as the velocity** and speeds the collapse up,
- on the outbound leg, $a_p$ has the **opposite sign to the velocity** and brakes the escape.

#### Self-hit split into outer-memory and inner-memory roots

The self term does not have a fixed sign. Split the active self roots into
$$
\mathcal{C}_s^{\text{out}}(t)
\equiv
\left\{
t_0\in\mathcal{C}_s(t)\;\middle|\; x(t_0)>x(t)
\right\},
$$
$$
\mathcal{C}_s^{\text{in}}(t)
\equiv
\left\{
t_0\in\mathcal{C}_s(t)\;\middle|\; x(t_0)<x(t)
\right\}.
$$

For $t_0\in\mathcal{C}_s^{\text{out}}(t)$ one has
$$
\hat r_s(t;t_0)=\mathrm{sgn}(x(t)-x(t_0))=-1,
$$
so that branch contributes **negative** acceleration.

For $t_0\in\mathcal{C}_s^{\text{in}}(t)$ one has
$$
\hat r_s(t;t_0)=\mathrm{sgn}(x(t)-x(t_0))=+1,
$$
so that branch contributes **positive** acceleration.

Define the corresponding positive amplitudes
$$
A_s^{\text{out}}(t)
\equiv
\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_s^{\text{out}}(t)}
\frac{1}{|x(t)-x(t_0)|^2\,|J_s(t;t_0)|},
$$
$$
A_s^{\text{in}}(t)
\equiv
\kappa \epsilon^2
\sum_{t_0\in\mathcal{C}_s^{\text{in}}(t)}
\frac{1}{|x(t)-x(t_0)|^2\,|J_s(t;t_0)|}.
$$

On the tame exterior-root class where all active partner roots are inward exterior roots, the total acceleration on the exterior branch is
$$
\ddot x(t)= -A_p(t)-A_s^{\text{out}}(t)+A_s^{\text{in}}(t).
$$

This is the key reduced formula.

#### Physical interpretation

- **Inbound** ($\dot x<0$):
  - the retained inward partner channel strengthens infall,
  - outer-memory self roots also strengthen infall,
  - inner-memory self roots oppose infall.

- **Outbound** ($\dot x>0$):
  - the retained inward partner channel brakes the outward motion,
  - outer-memory self roots also brake the outward motion,
  - inner-memory self roots drive further escape.

So self-hit is not a permanent outward engine. Its effect depends on where the active remembered emission points sit relative to the current position.

#### Signed-branch caution

The formulas above are exact on a fixed exterior slice $x(t)>0$, but they should not be overread as proving that a physical 1D trajectory can rebound at some $x_{\min}>0$ and then move back out on the same right-hand branch. In the current 1D delayed kernel, the pre-origin inbound leg is driven inward by partner attraction and by the self branches available on that slice. So the physically relevant oscillatory program should be formulated as an **origin-crossing** one in signed coordinates, or equivalently in the radial variable
$$
\rho(t)\equiv |x(t)|.
$$

In that formulation, a full oscillation alternates between the right and left exterior branches with label-preserving passage through $x=0$. The theorem targets later in this note should therefore be read as targets for post-crossing recapture of the radial distance rather than as literal pre-origin bounce statements on a single $x>0$ branch.

Every theorem that crosses the origin must use the origin-layer integral chart from Lemma `Origin-layer continuity of the dual-mollified 1D field`. The signed branch-sum formulas are valid again only after the crossing layer has been exited and the exterior sheet labels have been fixed. In particular, local recapture estimates stated in
$$
\rho(t)=|x(t)|
$$
are radial post-crossing estimates; they are not proofs that the signed scalar branch-sum field is smooth at
$$
x=0.
$$

In particular, the present 1D geometry should not be treated as a radial simplification of the 2D circular case. Along a true collinear history, the self-hit term is naturally read as an anti-damping or positive-work contribution on the physically relevant post-crossing outbound branch: the self interaction tends to reinforce the current radial motion rather than furnish a centrifugal-style barrier. The corrected theorem program therefore asks whether partner attraction can recapture the motion **despite** that self-drive, not because self-hit itself creates the turnaround.

### Necessary Recapture Condition

The breather question can now be reduced to one concrete inequality.

Fix an outbound time $t_\sharp$ on the exterior branch with
$$
x(t_\sharp)>0,
\qquad
\dot x(t_\sharp)=u_\sharp>0.
$$

If the trajectory is ever to turn around and re-enter as an inbound branch, there must exist a later time $t_{\mathrm{turn}}>t_\sharp$ such that
$$
\dot x(t_{\mathrm{turn}})=0.
$$

Integrating the reduced acceleration identity gives
$$
0
=
u_\sharp + \int_{t_\sharp}^{t_{\mathrm{turn}}}
\Big(
-A_p(s)-A_s^{\text{out}}(s)+A_s^{\text{in}}(s)
\Big)\,ds.
$$

Equivalently,
$$
u_\sharp
=
\int_{t_\sharp}^{t_{\mathrm{turn}}}
\Big(
A_p(s)+A_s^{\text{out}}(s)-A_s^{\text{in}}(s)
\Big)\,ds.
$$

Therefore a **necessary condition for recapture** is
$$
\sup_{t>t_\sharp}
\int_{t_\sharp}^{t}
\Big(
A_p(s)+A_s^{\text{out}}(s)-A_s^{\text{in}}(s)
\Big)\,ds
\ge
u_\sharp.
$$

If this inequality fails, then the total accumulated braking from partner attraction plus outer-memory self-hit is never strong enough to overcome the outbound speed and the trajectory cannot turn around.

#### Stronger sufficient criterion

If there exists an interval $[t_1,t_2]$ with $t_1\ge t_\sharp$ on which
$$
A_p(t)+A_s^{\text{out}}(t)-A_s^{\text{in}}(t)\ge \delta >0
$$
for all $t\in[t_1,t_2]$, and
$$
\int_{t_1}^{t_2}\delta\,dt \ge \dot x(t_1),
$$
then a turning point must occur no later than $t_2$.

This criterion is not expected to be the final theorem, but it gives the correct sign target for both numerics and analysis.

### Regularized Return Map

To state a breather problem precisely, define a return section on the symmetric history space rather than on instantaneous phase space alone.

Fix:

- a section location $x_\ast>0$,
- a memory horizon $h$ large enough to contain all active branches on one cycle,
- and a regularization width $\eta>0$.

#### Admissible history class

Work first with the raw outbound and inbound sections in the full history space
$$
\mathcal{H}_h:
$$
$$
\Sigma^+_{x_\ast,\eta}
\equiv
\left\{
 \phi\in\mathcal{H}_h
\;\middle|\;
\phi(0)=x_\ast,
\qquad
\dot\phi(0)>0
\right\},
$$
$$
\Sigma^-_{x_\ast,\eta}
\equiv
\left\{
 \phi\in\mathcal{H}_h
\;\middle|\;
\phi(0)=x_\ast,
\qquad
\dot\phi(0)<0
\right\}.
$$

Because the section histories are anchored by
$$
\phi(0)=x_\ast
$$
with prescribed crossing sign, this return section quotients out the absolute time-translation symmetry of the continuous delayed flow. A periodic trajectory therefore appears as a fixed returned history rather than as an unpinned one-parameter family of time shifts.

The first workable theorem domain should not be the full sections
$$
\Sigma^\pm_{x_\ast,\eta},
$$
but a controlled tame subclass on which the regularized delayed dynamics and return times are well behaved.

Let
$$
\mathcal{H}^{\mathrm{adm}}_{x_\ast,\eta}
\subset
\mathcal{H}_h
$$
denote an admissible reflection-symmetric history class with the following properties on $\theta\in[-h,0]$:

- section anchoring at $\theta=0$,
- uniform position bounds
  $$
  x_{\min}\le \phi(\theta)\le x_{\max},
  $$
- uniform speed bounds
  $$
  |\dot\phi(\theta)|\le u_{\max},
  $$
- uniform Lipschitz-velocity bounds
  $$
  |\dot\phi(\theta_1)-\dot\phi(\theta_2)|
  \le
  a_{\max}|\theta_1-\theta_2|,
  \qquad
  \theta_1,\theta_2\in[-h,0],
  $$
- and a transversality bound on every active partner and self root,
  $$
  |J_p|\ge \nu,
  \qquad
  |J_s|\ge \nu,
  \qquad
  \nu>0.
  $$

Also require the active causal memory depth to fit inside the chosen history window:
$$
\tau_{\max}(\phi)\le h
\qquad
\text{for every }\phi\in\mathcal{H}^{\mathrm{adm}}_{x_\ast,\eta}.
$$

The role of
$$
\mathcal{H}^{\mathrm{adm}}_{x_\ast,\eta}
$$
is simple: it isolates a tame region of history space on which the regularized vector field, root selection, and section crossings can plausibly be controlled. The Lipschitz-velocity bound is the first compactness-oriented ingredient for a later Arzela-Ascoli step in $C^1$; equivalently, $\ddot\phi$ exists almost everywhere with $|\ddot\phi|\le a_{\max}$ in the weak sense. The memory-depth bound ensures the delayed law really closes on the chosen history interval. Whether the eventual theorem program allows histories that approach $x=0$ arbitrarily closely is a separate question and should not be conflated with the first well-posedness regime.

For
$$
\phi\in\Sigma^+_{x_\ast,\eta}
$$
for which the $\eta$-regularized dynamics is well defined up to the first later time
$$
T^-_\eta(\phi)>0
$$
such that:

- the trajectory has completed one outbound excursion and recapture,
- $x(T^-_\eta(\phi))=x_\ast$,
- and $\dot x(T^-_\eta(\phi))<0$.

Then define the exact outbound-to-inbound history map on its natural domain
$$
Q_\eta:\operatorname{Dom}(Q_\eta)\subseteq \Sigma^+_{x_\ast,\eta}\to\Sigma^-_{x_\ast,\eta},
\qquad
Q_\eta(\phi)=x_{T^-_\eta(\phi)}.
$$

For
$$
\phi\in\Sigma^-_{x_\ast,\eta}
$$
for which the $\eta$-regularized dynamics is well defined up to the first return time
$$
T(\phi)>0
$$
such that:

- the trajectory has completed one collapse-and-rebound cycle,
- $x(T(\phi))=x_\ast$,
- and $\dot x(T(\phi))<0$ again.

Then define the exact history-space return map on its natural domain
$$
P_\eta:\operatorname{Dom}(P_\eta)\subseteq \Sigma^-_{x_\ast,\eta}\to\Sigma^-_{x_\ast,\eta},
\qquad
P_\eta(\phi)=x_{T(\phi)}.
$$

This is the natural reduced object for theorem work. The core fixed-point question belongs to $P_\eta$ on a controlled subset of history space, not to any scalar speed map by itself.

#### Projected scalar speed map

The scalar map is useful only after choosing a specific way to inject scalar speed data into the outbound history section.

Assume there is a continuous injection
$$
\iota_\eta(\,\cdot\,;x_\ast):I\to\Sigma^+_{x_\ast,\eta},
\qquad
u\mapsto \phi^+_{\eta}(u;x_\ast),
$$
from an interval $I\subset(0,\infty)$ of outbound speeds into admissible outbound histories, such that
$$
\dot\phi^+_{\eta}(u;x_\ast)(0)=u.
$$

This injection is extra structure. It is not part of the master equation itself; it is a chosen slice through history space.

Write the corresponding trajectory as $x(t;u,x_\ast,\eta)$ with initial section data
$$
x(0;u,x_\ast,\eta)=x_\ast,
\qquad
\dot x(0;u,x_\ast,\eta)=u.
$$

If the trajectory is recaptured and returns to the inbound section, define the projected scalar map
$$
R_\eta(u;x_\ast)
\equiv
-\dot x\!\big(T^-_\eta(u;x_\ast);u,x_\ast,\eta\big)
>0.
$$

Thus $R_\eta(u;x_\ast)$ is the magnitude of the next inbound speed when the trajectory re-crosses the same section $x=x_\ast$.

Equivalently, if
$$
\Pi:\Sigma^-_{x_\ast,\eta}\to(0,\infty),
\qquad
\Pi(\phi)\equiv -\dot\phi(0),
$$
denotes the inbound speed projection on the section, then
$$
R_\eta(\,\cdot\,;x_\ast)
=
\Pi\circ Q_\eta\circ \iota_\eta(\,\cdot\,;x_\ast).
$$

This is the correct status of the scalar map: it is a projection of the history-space excursion map through a chosen one-parameter injection, not an autonomous closure law of the delayed system.

Now introduce the net inward braking density
$$
B_\eta(t;u,x_\ast)
\equiv
A_p(t)+A_s^{\text{out}}(t)-A_s^{\text{in}}(t),
$$
so that along the trajectory
$$
\ddot x(t;u,x_\ast,\eta) = -B_\eta(t;u,x_\ast).
$$

Integrating from the outbound crossing at $t=0$ to the next inbound crossing at $t=T^-_\eta(u;x_\ast)$ gives
$$
-R_\eta(u;x_\ast)
=
u + \int_{0}^{T^-_\eta(u;x_\ast)}
\ddot x(s;u,x_\ast,\eta)\,ds
=
u - \int_{0}^{T^-_\eta(u;x_\ast)}
B_\eta(s;u,x_\ast)\,ds.
$$

Equivalently,
$$
R_\eta(u;x_\ast)
=
-u + \int_{0}^{T^-_\eta(u;x_\ast)}
B_\eta(s;u,x_\ast)\,ds.
$$

This is the clean projected scalar map: the next inbound speed equals the total accumulated inward braking budget over the outbound-and-return excursion minus the outbound launch speed at the section.

If $T^\mathrm{turn}_\eta(u;x_\ast)$ denotes the first turning time with
$$
\dot x\!\big(T^\mathrm{turn}_\eta(u;x_\ast)\big)=0,
$$
then the same map splits into two exact pieces:
$$
u
=
\int_{0}^{T^\mathrm{turn}_\eta(u;x_\ast)}
B_\eta(s;u,x_\ast)\,ds,
$$
$$
R_\eta(u;x_\ast)
=
\int_{T^\mathrm{turn}_\eta(u;x_\ast)}^{T^-_\eta(u;x_\ast)}
B_\eta(s;u,x_\ast)\,ds.
$$

The first identity is the outbound recapture condition on the section. The second states that the next inbound speed is exactly the inward gain accumulated after the turning point.

#### Scalar closure condition

The map $R_\eta$ is only a projection of the exact history-space map $Q_\eta$, but it is the sharpest scalar diagnostic for recapture on the fixed section $x=x_\ast$.

If the admissible family is symmetric enough that outbound and inbound section data are parameterized by the same scalar speed, then a scalar breather candidate satisfies
$$
u_\ast = R_\eta(u_\ast;x_\ast).
$$

However, this scalar fixed-point condition does not by itself imply periodic closure. The delayed dynamics only closes when the full history is returned:
$$
\phi^\ast = P_\eta(\phi^\ast).
$$

The scalar map is therefore best read as a reduced diagnostic for recapture and speed balance. The actual theorem program should proceed by finding a closed, bounded, invariant subset of the raw inbound section
$$
\Sigma^-_{x_\ast,\eta}
$$
and then packaging it inside the later convex-envelope hierarchy
$$
\mathcal{C}_{x_\ast,\eta}
\supseteq
\mathcal{K}_{x_\ast,\eta}.
$$

#### Local recapture architecture

The scalar map is only a diagnostic for section-speed balance. The real local input to the global fixed-point route is a post-crossing recapture theorem on a uniform admissible crossing subclass. The global envelope hierarchy
$$
\mathcal{C}_{x_\ast,\eta}
\supseteq
\mathcal{K}_{x_\ast,\eta}
$$
is introduced later; at the local level the only issue is whether partner attraction can erase the first post-crossing outward radial speed before the self drive pushes the trajectory to large radius.

The sorting map
$$
w(t)\equiv x(t)+c_f t
$$
organizes that geometry. On the initial post-crossing branch, as long as
$$
\dot x(t)<-c_f,
$$
one has
$$
\dot w(t)=\dot x(t)+c_f<0,
\qquad
w(0)=0,
$$
and therefore
$$
w(t)<0
\qquad
\text{for }0<t\le \tau_{\mathrm{loc}}.
$$
If
$$
t_{\mathrm{zero}}<0
$$
is the earlier inbound time satisfying
$$
w(t_{\mathrm{zero}})=0,
$$
then every active self root selected by
$$
w(t_s)=w(t)
$$
must satisfy
$$
t_s<t_{\mathrm{zero}}.
$$
The active self roots are therefore forced back into the earlier sub-field-speed inbound source region, where the self Jacobian is automatically noncaustic. This is the mechanism behind the bounded self-drive estimate used in the local theorem below.

> **Theorem (Local Origin-Crossing Recapture).**
> Let the 1D kernel be dual-mollified by a shell width $\eta>0$ and a core mollifier $\epsilon_c>0$. Let $\phi$ be an admissible signed history with an origin crossing at $t=0$ and outward radial speed
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
> w(t)<0,
> \qquad
> A_s^{\rho}(t)\le \overline A_s^{\rho},
> $$
> and the radial acceleration satisfies
> $$
> \ddot\rho(t)\le -A_p^{\rho}(t)+A_s^{\rho}(t).
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
> t_s\le t_{\mathrm{zero}}-\frac{\eta}{\nu},
> $$
> so the caustic is separated from the active self branches there.
> If the resulting impulse margin obeys
> $$
> V_0<
> \int_0^{\tau_{\mathrm{env}}}
> \Big(
> \underline A_p^{\rho}(s)-\overline A_s^{\rho}
> \Big)\,ds,
> $$
> then there exists
> $$
> \tau_{\mathrm{turn}}\in(0,\tau_{\mathrm{env}}]
> $$
> such that
> $$
> \dot\rho(\tau_{\mathrm{turn}})=0.
> $$
> In particular, the post-crossing branch is radially recaptured on the initial window.

This is the operative local theorem of the manuscript. The abstract form passes through (H5), while the concrete route used later is the explicit short-window proposition proved from Lemmas 1-4.

#### Hypotheses unpacked

The current theorem target is intended as a **local-in-time recapture theorem** on an initial post-crossing window. Its hypotheses can be organized as follows.

**(H1) Origin-crossing data.**
$$
\phi(0)=0,
\qquad
\dot\phi(0)=-V_0,
\qquad
V_0>c_f.
$$

**(H2) Sorting-map phase picture on the stored past.**
For the history sorting map
$$
w(\theta)=\phi(\theta)+c_f\theta,
\qquad
\theta\in[-h,0],
$$
there exist times
$$
t_{\mathrm{zero}}<t_{\mathrm{hinge}}<0
$$
such that
$$
w(t_{\mathrm{zero}})=0,
\qquad
\dot\phi(t_{\mathrm{hinge}})=-c_f,
$$
and
$$
w(\theta)>0
\qquad
\text{for }\theta\in(t_{\mathrm{zero}},0).
$$
For any fixed interior margin
$$
0<\gamma_w<\min\{t_{\mathrm{hinge}}-t_{\mathrm{zero}},-t_{\mathrm{hinge}}\},
$$
continuity then gives the compact-subinterval gap
$$
\delta_w
\equiv
\min_{\theta\in[t_{\mathrm{zero}}+\gamma_w,-\gamma_w]} w(\theta)
>0.
$$

**(H3) Past transversality on the sub-field-speed source region.**
There exists $\nu>0$ such that
$$
\dot\phi(\theta)\ge -c_f+\nu
\qquad
\text{for }\theta\in[-h,t_{\mathrm{zero}}].
$$

**(H4) Shell-mollifier separation from the interior sorting gap.**
For the compact-subinterval gap chosen in (H2), the shell mollifier width is small enough that its support cannot bridge from the negative post-crossing values of $w(t)$ into the positive interior sorting hump:
$$
\eta<\frac{\delta_w}{2}.
$$

**(H5) Goldilocks crossing-speed / core-mollifier regime.**
There exists a time window
$$
[0,\tau_{\mathrm{env}}]\subseteq [0,\tau_{\mathrm{tube}}],
$$
such that
$$
V_0<
\int_0^{\tau_{\mathrm{env}}}
\Big(
\underline A_p^{\rho}(s;\phi,V_0,\epsilon_c)
-
\overline A_s^{\rho}(\phi,\nu)
\Big)\,ds.
$$
At this stage this remains the abstract bottleneck hypothesis. A concrete sufficient realization is provided later by the proposition `Explicit short-window recapture regime`, which chooses
$$
\tau_{\mathrm{env}}=\tau_\epsilon\equiv \frac{\epsilon_c}{2\beta_{p,\max}}
$$
on a fixed admissible crossing subclass and replaces the integral inequality by explicit algebraic bounds on
$$
(\eta,\epsilon_c,V_{\max},\kappa\epsilon^2).
$$

#### Uniform admissible crossing subclass

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
\tau_{\mathrm{tube}},
$$
and an integer root-count bound
$$
N_s^{\max}\ge 1.
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
  \nu(\phi)\ge \nu,
  $$
- a uniform pre-crossing Lipschitz-velocity bound,
  $$
  |\dot\phi(\theta_1)-\dot\phi(\theta_2)|
  \le
  a_{\max}|\theta_1-\theta_2|
  \qquad
  \text{for }\theta_1,\theta_2\in[-h,0],
  $$
- a uniform pre-caustic radius bound,
  $$
  \rho_{\mathrm{zero}}(\phi)
  \equiv
  -c_f t_{\mathrm{zero}}(\phi)
  =
  \phi(t_{\mathrm{zero}}(\phi))
  \ge
  \rho_{0,\min},
  $$
- and a forward local tube condition: the dual-mollified forward continuation exists on
  $$
  [0,\tau_{\mathrm{tube}}],
  $$
  satisfies
  $$
  |\ddot x_\phi(t)|\le a_{\mathrm{tube}}
  \qquad
  \text{for }0\le t\le \tau_{\mathrm{tube}},
  $$
  every active self root on that window obeys
  $$
  |J_s(t;t_s)|\ge \frac{\nu}{c_f},
  $$
  and has at most
  $$
  N_s^{\max}
  $$
  active self roots on the initial post-crossing window.

The shell width is chosen inside the class-uniform interior sorting gap:
$$
\eta<\frac{\delta_{w,\min}}{2}.
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
\tau_1\equiv \min\!\left\{\tau_{\mathrm{tube}},\frac{\sigma_{\min}}{a_{\mathrm{tube}}}\right\},
$$
with $\tau_\rho$ chosen so that
$$
V_{\max}\tau_\rho+\frac{a_{\mathrm{tube}}}{2}\tau_\rho^2
\le
\frac{\rho_{0,\min}}{2}.
$$
On this subclass:

- Lemma 1 uses the common continuation constants $(\sigma_{\min},a_{\mathrm{tube}},\tau_1)$,
- Lemma 2 uses the common geometric separation data $(\rho_{0,\min},\nu,N_s^{\max})$,
- Lemma 3 admits a common partner-root remainder constant
  $$
  C_p=C_p(V_{\max},c_f,a_\ast),
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
| $\rho_{0,\min}$ | minimum pre-caustic radius at $t_{\mathrm{zero}}$ | Lemma 2 delayed-source separation |
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

#### Lemma ladder

The theorem target naturally breaks into four lemmas.

**Lemma 1: Short-time continuation and sorting-map monotonicity.**
Prove that there exists $\tau_1>0$ such that
$$
\dot x(t)\le -c_f
\qquad
\text{for }0\le t\le \tau_1,
$$
so that
$$
\dot w(t)\le 0
\qquad
\text{and hence}
\qquad
w(t)<0
$$
on the initial post-crossing window.

Working form:
let
$$
\sigma\equiv \frac{V_0-c_f}{2}>0.
$$
Because the dual-mollified vector field is finite on the post-crossing window, there exists a local acceleration bound
$$
|\ddot x(t)|\le a_{\mathrm{loc}}
\qquad
\text{for }0\le t\le \tau_{\mathrm{loc}}.
$$
Choose
$$
\tau_1\le \min\!\left\{\tau_{\mathrm{loc}},\frac{\sigma}{a_{\mathrm{loc}}}\right\}.
$$
Then
$$
\dot x(t)
\le
\dot x(0)+a_{\mathrm{loc}}t
=
-V_0+a_{\mathrm{loc}}t
\le
-V_0+\sigma
=
-c_f-\sigma
<
-c_f
$$
for all $t\in[0,\tau_1]$. Consequently
$$
\dot w(t)=\dot x(t)+c_f\le -\sigma,
$$
and integrating from $w(0)=0$ gives
$$
w(t)\le -\sigma t<0
\qquad
\text{for }0<t\le \tau_1.
$$

Proof.
The forward local tube condition in the admissible crossing subclass gives existence of the dual-mollified continuation on $[0,\tau_{\mathrm{loc}}]$ together with the bound
$$
|\ddot x(t)|\le a_{\mathrm{loc}}.
$$
Because
$$
\dot x(0)=-V_0<-c_f,
$$
the fundamental theorem of calculus yields
$$
\dot x(t)=\dot x(0)+\int_0^t \ddot x(s)\,ds
\le
-V_0+a_{\mathrm{loc}}t.
$$
Choosing
$$
\tau_1\le \min\!\left\{\tau_{\mathrm{loc}},\frac{\sigma}{a_{\mathrm{loc}}}\right\}
$$
forces
$$
\dot x(t)\le -V_0+\sigma=-c_f-\sigma<-c_f
$$
for every $t\in[0,\tau_1]$. Therefore
$$
\dot w(t)=\dot x(t)+c_f\le -\sigma,
$$
and integration from the crossing value
$$
w(0)=x(0)+c_f\cdot 0=0
$$
gives
$$
w(t)\le -\sigma t<0
$$
on $(0,\tau_1]$. This proves the lemma. On a fixed admissible crossing subclass the same argument is uniform after replacing $\sigma$ by $\sigma_{\min}$ and $a_{\mathrm{loc}}$ by $a_{\mathrm{tube}}$.

**Lemma 2: Caustic isolation and uniform self-drive bound.**
Use the local tube bounds to obtain a crude self-drive estimate on the full post-crossing window, and then use (H2)-(H4) together with Lemma 1 to show that on a delayed subwindow every active self root lies strictly before $t_{\mathrm{zero}}$ and hence stays away from the caustic hinge.

Working form:
fix $t\in(0,\tau_1]$ and suppose a self-emission time $t_s<t$ lies in the support of the shell mollifier on the left-moving post-crossing branch. If the shell mollifier has support radius $\eta$, then
$$
\left|x(t)-x(t_s)+c_f(t-t_s)\right|\le \eta,
$$
which is equivalent to
$$
\left|w(t_s)-w(t)\right|\le \eta.
$$

On the full initial tube one only assumes the class-wide transversality and branch-count bounds. Therefore
$$
A_s^{\rho}(t)
\le
N_s^{\max}\,
\kappa\epsilon^2\,
\frac{c_f}{\nu}\,
\frac{1}{\epsilon_c^2}
\equiv
\overline A_s^{\rho}
\qquad
\text{for }0\le t\le \tau_1.
$$
This is the basic bounded self-drive estimate used in the local theorem.

One obtains a stronger separated statement on a slightly delayed subwindow. Define
$$
\tau_{\mathrm{sep}}\equiv \frac{2\eta}{\sigma}.
$$
Then for $t\in[\tau_{\mathrm{sep}},\tau_1]$,
$$
w(t)\le -2\eta,
$$
so any active self root satisfies
$$
w(t_s)\le -\eta.
$$
Hence every active self root on that delayed subwindow satisfies
$$
t_s<t_{\mathrm{zero}}.
$$
Since on the sub-field-speed source region one has
$$
\dot w(\theta)=\dot x(\theta)+c_f\ge \nu,
\qquad
\theta\in[-h,t_{\mathrm{zero}}],
$$
monotonicity gives
$$
t_s\le t_{\mathrm{zero}}-\gamma(\eta),
\qquad
\gamma(\eta)\equiv \frac{\eta}{\nu}.
$$

Thus the caustic is uniformly separated from the active self roots on the delayed subwindow.

A sharper geometric version is available only on the delayed window where the roots have already entered the sub-field-speed source region. Since
$$
w(t_{\mathrm{zero}})=0
\qquad
\Longrightarrow
\qquad
x(t_{\mathrm{zero}})=-c_f t_{\mathrm{zero}}
\equiv
\rho_{\mathrm{zero}}>0,
$$
and the pre-crossing branch is inbound, one has
$$
x(t_s)\ge \rho_{\mathrm{zero}}
\qquad
\text{for every }t_s\le t_{\mathrm{zero}}.
$$
Choose a short window $[0,\tau_\rho]$ on which
$$
\rho(t)=|x(t)|\le \frac{\rho_{\mathrm{zero}}}{2}.
$$
Then every active self root on the delayed geometric window
$$
t\in[\tau_{\mathrm{sep}},\min\{\tau_1,\tau_\rho\}]
$$
satisfies
$$
|x(t)-x(t_s)|
=
\rho(t)+x(t_s)
\ge
\frac{\rho_{\mathrm{zero}}}{2}.
$$
Hence the same branch-count bound yields the sharper estimate
$$
A_s^{\rho}(t)
\le
N_s^{\max}\,
\kappa\epsilon^2\,
\frac{c_f}{\nu}\,
\frac{4}{\rho_{\mathrm{zero}}^2}
\equiv
\overline A_{s,\mathrm{geom}}^{\rho},
$$
which is independent of the core mollifier $\epsilon_c$. This is the delayed-window version that can sharpen the Goldilocks condition once the short-time window extends beyond $\tau_{\mathrm{sep}}$.

Proof.
On the full initial tube, each active self branch contributes a radial acceleration of the form
$$
\kappa\epsilon^2\,
\frac{1}{|J_s|}\,
\frac{1}{r_s^2+\epsilon_c^2},
$$
with
$$
|J_s|\ge \frac{\nu}{c_f}
$$
by the class definition and
$$
r_s^2+\epsilon_c^2\ge \epsilon_c^2
$$
by core mollification. Summing over at most
$$
N_s^{\max}
$$
active self roots gives the crude bound
$$
A_s^{\rho}(t)\le \overline A_s^\rho
$$
for
$$
0\le t\le \tau_1.
$$

For the delayed separation, Lemma 1 gives
$$
w(t)\le -\sigma t.
$$
Hence for
$$
t\in[\tau_{\mathrm{sep}},\tau_1],
\qquad
\tau_{\mathrm{sep}}=\frac{2\eta}{\sigma},
$$
one has
$$
w(t)\le -2\eta.
$$
If a self root $t_s<t$ lies in the shell support, then
$$
|w(t_s)-w(t)|\le \eta,
$$
so
$$
w(t_s)\le -\eta<0.
$$
But hypothesis (H2) states that
$$
w(\theta)>0
\qquad
\text{for }\theta\in(t_{\mathrm{zero}},0),
$$
therefore no such $t_s$ can lie in $(t_{\mathrm{zero}},0)$ and hence
$$
t_s<t_{\mathrm{zero}}.
$$
On the source region
$$
[-h,t_{\mathrm{zero}}],
$$
hypothesis (H3) gives
$$
\dot w(\theta)=\dot x(\theta)+c_f\ge \nu.
$$
Applying the mean-value theorem between $t_s$ and $t_{\mathrm{zero}}$ yields
$$
w(t_{\mathrm{zero}})-w(t_s)\ge \nu\,(t_{\mathrm{zero}}-t_s).
$$
Since
$$
w(t_{\mathrm{zero}})=0
\qquad
\text{and}
\qquad
w(t_s)\le -\eta,
$$
it follows that
$$
t_s\le t_{\mathrm{zero}}-\frac{\eta}{\nu}
=
t_{\mathrm{zero}}-\gamma(\eta).
$$
This proves the delayed caustic-separation claim.

For the geometric refinement, use that the selected source branch is inbound before the crossing, so $x(\theta)$ decreases toward the origin on the stored pre-crossing leg. Thus
$$
t_s\le t_{\mathrm{zero}}
\qquad
\Longrightarrow
\qquad
x(t_s)\ge x(t_{\mathrm{zero}})=\rho_{\mathrm{zero}}.
$$
If in addition
$$
0\le t\le \tau_\rho
\qquad
\text{and}
\qquad
\rho(t)\le \frac{\rho_{\mathrm{zero}}}{2},
$$
then on the delayed geometric window
$$
t\in[\tau_{\mathrm{sep}},\min\{\tau_1,\tau_\rho\}]
$$
one has
$$
|x(t)-x(t_s)|=\rho(t)+x(t_s)\ge \frac{\rho_{\mathrm{zero}}}{2}.
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
A_s^\rho(t)\le \overline A_{s,\mathrm{geom}}^\rho.
$$
This proves Lemma 2.

**Lemma 3: Partner-root linearization and lower bound.**
Use the linearized partner root
$$
t_p
=
-\left(\frac{V_0-c_f}{V_0+c_f}\right)t
$$
to derive the partner-distance bound
$$
r_p(t)\le
\left(\frac{2c_fV_0}{V_0+c_f}\right)t+\mathcal{O}(t^2),
$$
and hence a lower bound on the core-mollified partner attraction
$$
A_p^{\rho}(t)\ge \underline A_p^{\rho}(t).
$$

Working form:
write
$$
s\equiv -t_p>0
$$
for the past partner-emission time measured backward from the crossing. On the active partner branch, shell support gives
$$
\left||x(t)+x(t_p)|-c_f(t+s)\right|\le \eta.
$$

Assume the signed trajectory is $C^1$ through the crossing and obeys uniform acceleration bounds on both sides of $t=0$. Then there exists
$$
a_\ast\equiv \max\{a_{\mathrm{loc}},a_{\max}\}
$$
such that the Taylor remainders satisfy
$$
x(t)= -V_0 t + R_+(t),
\qquad
|R_+(t)|\le \frac{a_\ast}{2}t^2,
$$
for $t\in[0,\tau_1]$, and
$$
x(t_p)= V_0 s + R_-(s),
\qquad
|R_-(s)|\le \frac{a_\ast}{2}s^2,
$$
for $s\in[0,\tau_1]$.

Substituting these expansions into the partner-shell condition yields
$$
\left|
V_0(t-s)-c_f(t+s)
+E_p(t,s)
\right|
\le \eta,
$$
where
$$
|E_p(t,s)|\le \frac{a_\ast}{2}(t^2+s^2).
$$

Let
$$
\alpha\equiv \frac{V_0-c_f}{V_0+c_f}\in(0,1),
\qquad
\beta_p\equiv \frac{2c_fV_0}{V_0+c_f}.
$$
Then the linearized root is $s=\alpha t$. For sufficiently small $t$ and $\eta$, the exact active partner root obeys the one-sided estimate
$$
s\le \alpha t + C_p(t^2+\eta)
$$
for some constant $C_p$ depending only on $(V_0,c_f,a_\ast)$.

Consequently the delayed partner distance satisfies the upper bound
$$
r_p(t)=c_f(t+s)
\le
\beta_p t + c_f C_p(t^2+\eta).
$$

This is the form needed for the theorem program: as the trajectory brakes after the crossing, the true partner distance can only become smaller than this leading linear estimate, which strengthens the partner attraction. Therefore the core-mollified partner term admits the explicit lower bound
$$
A_p^{\rho}(t)
\ge
\frac{\kappa\epsilon^2}{
\left(
\beta_p t + c_f C_p(t^2+\eta)
\right)^2+\epsilon_c^2}
\equiv
\underline A_p^{\rho}(t).
$$

Proof.
Let
$$
F(t,s)\equiv V_0(t-s)-c_f(t+s)+E_p(t,s).
$$
The shell condition on the active partner branch is precisely
$$
|F(t,s)|\le \eta.
$$
At the linear level,
$$
F_0(t,s)=V_0(t-s)-c_f(t+s)
$$
has root
$$
s=\alpha t,
\qquad
\alpha=\frac{V_0-c_f}{V_0+c_f},
$$
and
$$
\partial_s F_0(0,0)=-(V_0+c_f)\neq 0.
$$
Write
$$
E_p(t,s)=-(R_+(t)+R_-(s)),
$$
so the absolute remainder bounds imply
$$
|E_p(t,\alpha t)|
\le
\frac{a_\ast}{2}(1+\alpha^2)t^2
\equiv
C_0 t^2.
$$
Moreover the integral remainder formula gives
$$
|\partial_s E_p(t,s)|\le a_\ast s.
$$
After shrinking the local window if necessary, assume
$$
0\le s\le \tau_1
\qquad
\text{and}
\qquad
a_\ast\tau_1\le \frac{V_0+c_f}{2}.
$$
Then on that window
$$
\partial_s F(t,s)
=
-(V_0+c_f)+\partial_s E_p(t,s)
\le
-\frac{V_0+c_f}{2}<0.
$$
Hence the active partner branch is quantitatively nondegenerate. Applying the mean-value theorem in the $s$ variable between $s$ and $\alpha t$ yields a point $\xi$ between them such that
$$
F(t,s)-F(t,\alpha t)=\partial_s F(t,\xi)\,(s-\alpha t).
$$
Therefore
$$
\frac{V_0+c_f}{2}\,|s-\alpha t|
\le
|F(t,s)|+|F(t,\alpha t)|
\le
\eta+C_0 t^2,
$$
so
$$
|s-\alpha t|
\le
\frac{2}{V_0+c_f}\big(\eta+C_0 t^2\big).
$$
Thus there is an explicit constant
$$
C_p=C_p(V_0,c_f,a_\ast)
$$
such that
$$
s\le \alpha t + C_p(t^2+\eta).
$$
Substituting into
$$
r_p(t)=c_f(t+s)
$$
gives
$$
r_p(t)\le c_f(1+\alpha)t+c_f C_p(t^2+\eta)
=
\beta_p t + c_f C_p(t^2+\eta).
$$
Because the core-mollified partner contribution is monotone decreasing in the delayed distance,
$$
r_p(t)\le r_{\mathrm{ub}}(t)
\qquad
\Longrightarrow
\qquad
\frac{1}{r_p(t)^2+\epsilon_c^2}
\ge
\frac{1}{r_{\mathrm{ub}}(t)^2+\epsilon_c^2},
$$
where
$$
r_{\mathrm{ub}}(t)\equiv \beta_p t + c_f C_p(t^2+\eta).
$$
Multiplying by the positive prefactor
$$
\kappa\epsilon^2
$$
gives
$$
A_p^\rho(t)\ge \underline A_p^\rho(t),
$$
which proves the lemma. On the admissible crossing subclass the same argument is uniform after replacing
$$
V_0\mapsto V_{\max}
\qquad
\text{in }C_p
$$
and, when desired for a conservative bound, replacing
$$
\beta_p\mapsto \beta_{p,\max}.
$$

**Lemma 4: Recapture integration.**
Show that the function
$$
f(t)
\equiv
V_0-
\int_0^t
\Big(
\underline A_p^{\rho}(s)-\overline A_s^{\rho}
\Big)\,ds
$$
has a zero on the initial window under (H5), and conclude that the true radial speed must vanish there.

Working form:
fix a window $[0,\tau]$ on which Lemma 2 and Lemma 3 both hold, and define
$$
B_\tau\equiv c_f C_p(\tau^2+\eta).
$$
Then for $0\le t\le \tau$,
$$
\underline A_p^{\rho}(t)
\ge
\frac{\kappa\epsilon^2}{
\left(\beta_p t+B_\tau\right)^2+\epsilon_c^2
}.
$$

Integrating this explicit lower bound gives the partner impulse estimate
$$
\Delta V_p(\tau)
\equiv
\int_0^\tau \underline A_p^{\rho}(s)\,ds
\ge
\frac{\kappa\epsilon^2}{\beta_p\epsilon_c}
\left[
\arctan\!\left(\frac{\beta_p\tau+B_\tau}{\epsilon_c}\right)
-
\arctan\!\left(\frac{B_\tau}{\epsilon_c}\right)
\right].
$$

If the self-drive is bounded above by a constant $\overline A_s^\rho$ on the same window, then the total outward impulse from self-hit is at most
$$
\Delta V_s(\tau)\le \overline A_s^\rho\,\tau.
$$

Therefore a sufficient recapture condition is
$$
V_0<
\Delta V_p(\tau)-\overline A_s^\rho\,\tau.
$$

If, in addition, the chosen window reaches the delayed geometric regime,
$$
\tau\ge \tau_{\mathrm{sep}}
\qquad
\text{and}
\qquad
\tau\le \tau_\rho,
$$
then one may split the self-drive loss as
$$
\Delta V_s(\tau)
\le
\overline A_s^\rho\,\tau_{\mathrm{sep}}
+
\overline A_{s,\mathrm{geom}}^\rho\,(\tau-\tau_{\mathrm{sep}}),
$$
and therefore the sharper sufficient recapture condition becomes
$$
V_0<
\Delta V_p(\tau)
-
\overline A_s^\rho\,\tau_{\mathrm{sep}}
-
\overline A_{s,\mathrm{geom}}^\rho\,(\tau-\tau_{\mathrm{sep}}).
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
\sigma\mapsto \sigma_{\min},
$$
and uses the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast).
$$
That conservative substitution is the bridge from the single-history Lemma 4 estimate to the class-uniform proposition below.

Proof.
Let
$$
V(t)\equiv \dot\rho(t)
$$
denote the outward radial speed on the post-crossing branch. Then
$$
V(0)=V_0>0.
$$
By Lemma 2 and Lemma 3, on every window $[0,\tau]$ where both lemmas hold one has
$$
\ddot\rho(t)\le -\underline A_p^\rho(t)+\overline A_s^\rho.
$$
Integrating from $0$ to $t\le \tau$ yields
$$
V(t)
=
V_0+\int_0^t \ddot\rho(s)\,ds
\le
V_0-\int_0^t\big(\underline A_p^\rho(s)-\overline A_s^\rho\big)\,ds
=
f(t).
$$
If the delayed geometric regime is available, the same integration gives the sharper estimate
$$
V(t)
\le
V_0-\Delta V_p(t)
+
\overline A_s^\rho\,\tau_{\mathrm{sep}}
+
\overline A_{s,\mathrm{geom}}^\rho\,(t-\tau_{\mathrm{sep}})
$$
for
$$
t\in[\tau_{\mathrm{sep}},\tau].
$$

Now assume the Goldilocks condition holds on $[0,\tau]$, so that
$$
f(\tau)<0.
$$
If $V$ remained strictly positive on the whole interval $[0,\tau]$, then evaluating the previous bound at $t=\tau$ would give
$$
0<V(\tau)\le f(\tau)<0,
$$
which is impossible. Therefore the set
$$
\{t\in[0,\tau]:V(t)=0\}
$$
is nonempty. Define
$$
\tau_{\mathrm{turn}}
\equiv
\inf\{t\in[0,\tau]:V(t)=0\}.
$$
Continuity of $V$ implies
$$
V(\tau_{\mathrm{turn}})=0,
$$
so the outward radial speed vanishes by time $\tau$. This is the desired recapture statement.

The class-uniform version is the same argument with the conservative substitutions
$$
V_0\mapsto V_{\max},
\qquad
\beta_p\mapsto \beta_{p,\max},
\qquad
\sigma\mapsto \sigma_{\min},
$$
and the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast),
$$
which is precisely the form used in the explicit short-window proposition below.

Using monotonicity of the arctangent integrand gives a simpler algebraic lower bound:
$$
\Delta V_p(\tau)
\ge
\frac{\kappa\epsilon^2\,\tau}{
\epsilon_c^2+\left(\beta_p\tau+B_\tau\right)^2
}.
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
\right].
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
\right].
$$

This is the most useful practical form of (H5) in the present manuscript: once the constants in Lemma 2 and Lemma 3 are fixed, recapture reduces to a checkable algebraic inequality.

For a fixed admissible crossing subclass, the same inequality is made class-uniform by replacing
$$
V_0\mapsto V_{\max},
\qquad
\beta_p\mapsto \beta_{p,\max},
$$
and taking the common remainder constant
$$
C_p=C_p(V_{\max},c_f,a_\ast).
$$
That replacement is exactly what the proposition below implements.

One can simplify further on a short window where the shell-error term is dominated by the linear partner term. If
$$
B_\tau\le \beta_p\tau,
$$
then
$$
\Delta V_p(\tau)
\ge
\frac{\kappa\epsilon^2\,\tau}{
\epsilon_c^2+4\beta_p^2\tau^2
},
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
\right].
$$

Since
$$
B_\tau=c_f C_p(\tau^2+\eta),
$$
the dominance condition $B_\tau\le \beta_p\tau$ is itself a quadratic inequality in $\tau$. A nonempty admissible interval exists whenever
$$
\eta\le \frac{\beta_p^2}{4c_f^2 C_p^2},
$$
provided the corresponding roots lie inside the local validity window of Lemmas 1-3.

For class-uniform use on $\mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}$, the corresponding sufficient condition is obtained conservatively by replacing
$$
\beta_p\mapsto \beta_{p,\min},
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
   w(t)<0
   \qquad
   \text{for }0<t\le \tau_1.
   $$
2. Lemma 2 supplies the full-window self-drive bound
   $$
   A_s^\rho(t)\le \overline A_s^\rho
   \qquad
   \text{for }0\le t\le \tau_1,
   $$
   with the delayed-window refinement available once
   $$
   \tau_{\mathrm{sep},\max}\le t\le \tau_\rho.
   $$
3. Lemma 3 gives the class-uniform partner lower bound with
   $$
   \beta_p\le \beta_{p,\max},
   \qquad
   B_\tau\le c_f C_p(\tau^2+\eta).
   $$
   At
   $$
   \tau_\epsilon=\frac{\epsilon_c}{2\beta_{p,\max}},
   $$
   the stated assumptions force
   $$
   \beta_p\tau_\epsilon+B_{\tau_\epsilon}\le \epsilon_c,
   $$
   so the denominator of the partner integrand is bounded above by
   $$
   \epsilon_c^2+\epsilon_c^2=2\epsilon_c^2.
   $$
   The rectangle-area lower bound therefore gives
   $$
   \Delta V_p(\tau_\epsilon)\ge \frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}.
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
\frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}.
$$
In the standard half-core window the target refinement is
$$
Q_{\mathrm{CS}}=\sqrt{2},
$$
provided the interval certificate proves the required monotone coverage of the partner-distance strip. The later corridor arithmetic should use the certified value of
$$
Q_{\mathrm{CS}},
$$
not assume the improvement without an interval report.

In the joint short-window regime
$$
\eta=\mathcal{O}(\epsilon_c),
\qquad
\epsilon_c\downarrow 0,
$$
the right-hand side is
$$
\mathcal{O}(\epsilon_c),
$$
so any fixed positive coupling scale $\kappa\epsilon^2$ eventually dominates it. Subject to the local validity constraints from Lemmas 1-3, this exhibits a nonempty dual-mollified parameter regime in which local post-crossing recapture follows directly from the explicit inequality.

#### Local takeaway

The local bottleneck is exactly Lemma 4 together with (H5). Lemmas 1 and 2 lock down the sorting-map geometry and the bounded self drive; Lemma 3 extracts the partner lower bound; Lemma 4 converts those two ingredients into a recapture condition by integrating the net radial impulse.

Operationally, the local theorem reduces the first post-crossing turn to one explicit race: the regularized partner impulse must beat the bounded self-drive loss on a nonempty initial window. Proposition `Explicit short-window recapture regime` is the concrete form used later in the manuscript, and its strict margin is precisely the inner-cycle quantity
$$
\mathfrak M_{\mathrm{in}}>0
$$
that enters the global invariant-envelope theorem.

### Global Existence via Arzela-Ascoli

The local origin-crossing theorem supplies only the inner turnaround. The global capstone is an isolated fixed point of the full return map
$$
P_\eta:\Sigma^-_{x_\ast,\eta}\to\Sigma^-_{x_\ast,\eta}.
$$
In the dual-mollified setting the final topological target is therefore to construct a nonempty closed convex tame envelope
$$
\mathcal{K}_{x_\ast,\eta}\subset C^1([-h,0]),
$$
not a continuous family of equal-amplitude cycles. Exact energy for the dual-mollified problem remains conditional on action-level regularization, so the fixed-point route should be built from uniform bounds, continuity, and compactness rather than from a presumed conserved history functional.

The global input list is now fixed:

1. a nonempty tame inbound class propagated from the affine seed history;
2. collapse-to-crossing control and the local origin-crossing recapture theorem;
3. outer-turn and return-to-section control;
4. a convex section envelope
   $$
   \mathcal{C}_{x_\ast,\eta}
   $$
   and a closed convex tame sub-envelope
   $$
   \mathcal{K}_{x_\ast,\eta}\subseteq \mathcal{C}_{x_\ast,\eta};
   $$
5. continuity and precompactness of
   $$
   P_\eta
   $$
   on
   $$
   \mathcal{K}_{x_\ast,\eta};
   $$
6. and the self-map property
   $$
   P_\eta\!\big(\mathcal{K}_{x_\ast,\eta}\big)\subseteq \mathcal{K}_{x_\ast,\eta}.
   $$

Only after those inputs live on the same domain does Schauder apply.

#### Status of the global capstone ingredients

The theorem status of the global program should be read in three layers.

- The local and regional geometry is already organized into serious theorem packages: branch control, caustic transit, inner recapture, outer-turn recapture, and return-to-section.
- The compactness mechanism is conceptually standard once one has class-uniform bounds on one closed domain: this is the Arzela-Ascoli side of the argument.
- The active unresolved burden is domain production: the manuscript still has to place nonempty tame propagation, closed convexity, continuity, precompactness, and the self-map property on one and the same set
  $$
  \mathcal{K}_{x_\ast,\eta}.
  $$

So the true blocker is not the abstract fixed-point theorem. It is the production of one legitimate tame self-map domain carrying all of the hypotheses at once.

#### Convex section envelope

The visible Banach-space constraints should be separated from the delayed-root constraints. Fix constants
$$
x_\ast\in(0,X_{\max}),
\qquad
U_{\max}>0,
\qquad
A_{\max}>0,
\qquad
h\ge \frac{2X_{\max}}{c_f},
$$
and define
$$
\mathcal{C}_{x_\ast,\eta}
\subset
\Sigma^-_{x_\ast,\eta}
$$
to be the set of histories $\phi\in C^1([-h,0])$ such that:

- section anchoring:
  $$
  \phi(0)=x_\ast;
  $$
- inbound sign at the section:
  $$
  \dot\phi(0)\le 0;
  $$
- position envelope:
  $$
  -X_{\max}\le \phi(\theta)\le X_{\max}
  \qquad
  \text{for }\theta\in[-h,0];
  $$
- speed envelope:
  $$
  |\dot\phi(\theta)|\le U_{\max}
  \qquad
  \text{for }\theta\in[-h,0];
  $$
- Lipschitz-velocity envelope:
  $$
  |\dot\phi(\theta_1)-\dot\phi(\theta_2)|
  \le
  A_{\max}|\theta_1-\theta_2|
  \qquad
  \text{for }\theta_1,\theta_2\in[-h,0].
  $$

This set is closed and convex in the $C^1$ topology. The horizon condition is handled externally: if
$$
|\phi(\theta)|\le X_{\max}
$$
on the stored interval, then every partner or self chord is at most
$$
2X_{\max},
$$
so
$$
\tau_{\max}(\phi)\le \frac{2X_{\max}}{c_f}\le h.
$$
The point is to keep only affine and supremum-type constraints inside
$$
\mathcal{C}_{x_\ast,\eta},
$$
while postponing nonlocal tame delayed-root conditions to a sub-envelope.
The envelope is intentionally written in the signed coordinate
$$
x\in[-X_{\max},X_{\max}]
$$
rather than in a one-sided radial coordinate. A genuine origin-crossing cycle may store data from both sign sheets inside
$$
[-h,0],
$$
so a one-sided condition
$$
0\le \phi\le X_{\max}
$$
would exclude valid histories whenever the memory window crosses the origin. Branch labels, exterior sheets, and origin-crossing status belong to the finite tame certificate, not to the convex Banach envelope.
Those delayed-root conditions are not visibly convex inside
$$
\mathcal{C}_{x_\ast,\eta},
$$
so the next proposition is a genuine packaging target rather than an automatic consequence of intersecting
$$
\mathcal{C}_{x_\ast,\eta}
$$
with the naive tame subclass.

> **Target Proposition (Closed Convex Tame Envelope).**
> The remaining topological task is to exhibit a nonempty closed convex set
> $$
> \mathcal{K}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}
> $$
> such that:
> 1. the propagated nonempty tame class lies inside
>    $$
>    \mathcal{K}_{x_\ast,\eta};
>    $$
> 2. the return map
>    $$
>    P_\eta
>    $$
>    is well defined on
>    $$
>    \mathcal{K}_{x_\ast,\eta};
>    $$
> 3. the delayed-root persistence and Jacobian bounds defining tameness remain valid on that domain;
> 4. and the tame constraints are closed under limits in the
>    $$
>    C^1
>    $$
>    topology on that domain.

This is the exact topological object needed by the final fixed-point theorem. The role of
$$
\mathcal{C}_{x_\ast,\eta}
$$
is to carry the convex bounds; the role of
$$
\mathcal{K}_{x_\ast,\eta}
$$
is to put the same convex bounds and the tame delayed geometry on one matching domain. In particular, this target does not assert that Jacobian lower bounds or branch-count restrictions are convex by inspection. It isolates the additional burden of producing a closed convex subset on which those tame conditions persist. The self-map property is a separate dynamical burden supplied later by invariant-envelope closure.

The clean way to discharge that burden is not to put the nonconvex delayed-root labels directly into the definition of
$$
\mathcal{K}_{x_\ast,\eta}.
$$
Instead, one should produce a finite tame certificate: a finite family of continuous affine functionals
$$
\ell_\alpha:C^1([-h,0])\to\mathbb{R},
\qquad
\alpha\in\mathcal{I}_{\mathrm{cert}},
$$
and constants
$$
b_\alpha
$$
such that the closed affine tube
$$
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
\equiv
\left\{
\phi\in\mathcal{C}_{x_\ast,\eta}
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
>    \phi_{\mathrm{seed,cyc}}\in\mathcal{C}_{x_\ast,\eta}
>    $$
>    satisfies all certificate inequalities with strict slack;
> 2. every
>    $$
>    \phi\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
>    $$
>    has the same finite active branch chart on the stored interval and on the controlled one-cycle continuation;
>    this chart includes the signed exterior sheet labels and origin-crossing layer labels needed to interpret the signed
>    $$
>    x
>    $$
>    history;
> 3. on that chart the delayed roots remain simple with uniform Jacobian floor
>    $$
>    |J|\ge \nu_{\mathrm{cert}}>0;
>    $$
> 4. the active branch count, memory depth, position, speed, and Lipschitz-velocity bounds are bounded by the constants used in
>    $$
>    \mathcal{C}_{x_\ast,\eta};
>    $$
> 5. and these certificate implications are closed under
>    $$
>    C^1
>    $$
>    limits inside
>    $$
>    \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
>    $$
>
> Then
> $$
> \mathcal{K}_{x_\ast,\eta}
> \equiv
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
> $$
> is a nonempty closed convex tame envelope.

Proof.
The set
$$
\mathcal{C}_{x_\ast,\eta}
$$
is closed and convex by its affine section condition, interval bounds, speed bounds, and Lipschitz-velocity bound. Each certificate condition
$$
\ell_\alpha(\phi)\le b_\alpha
$$
is a closed half-space in
$$
C^1([-h,0]),
$$
so the finite intersection
$$
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
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
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
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
T_{\mathrm{cyc}},
$$
a finite active branch list
$$
\mathcal{B}_{\mathrm{act}},
$$
inactive branch complements, a mesh
$$
\{\theta_j\}_{j=0}^{N},
$$
and returned-sample residuals. Until that data packet exists, every finite-certificate statement below is conditional.

> **Proposition (Sampled seed-cycle tube gives a finite tame certificate).**
> Let
> $$
> \phi_{\mathrm{cyc}}\in\mathcal{C}_{x_\ast,\eta}
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
> \phi\in\mathcal{C}_{x_\ast,\eta}
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
\nu_{\mathrm{chart}},
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
2A_{\max}\Delta\le \frac{r_{\mathrm{cert}}}{2}.
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
r_{\mathrm{cert}},
$$
and the same estimate with the Lipschitz-velocity bound gives
$$
|\dot\phi(\theta)-\dot\phi_{\mathrm{cyc}}(\theta)|
\le
r_{\mathrm{cert}}.
$$
Thus the finite sample tube implies the required
$$
C^1
$$
tube. Each absolute-value sample condition is just two continuous affine inequalities in
$$
C^1([-h,0]).
$$
The previous proposition then turns their finite intersection with
$$
\mathcal{C}_{x_\ast,\eta}
$$
into a closed convex tame envelope.

For the first remaining blocker, the seed-cycle certificate should therefore be audited by the following finite margin ledger:
$$
\nu_{\mathrm{seed}}
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{act}}}
\inf_{t\in I_\beta}|J_\beta(t)|,
$$
$$
\gamma_{\mathrm{gap}}
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{inact}}}
\inf_{(t,\theta)\in Q_\beta}
|F_\beta(t,\theta)|,
$$
$$
\gamma_h
\equiv
\min_{\beta\in\mathcal{B}_{\mathrm{act}}}
\inf_{t\in I_\beta}
\operatorname{dist}\big(\theta_\beta(t),\{-h,0\}\big),
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
\right\}.
$$
Here
$$
F_\beta(t,\theta)=0
$$
denotes the delayed-root equation for branch candidate
$$
\beta,
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
r_{\mathrm{cert}}.
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
C^1,
$$
the active Jacobian floor is at least
$$
\nu_{\mathrm{seed}}-L_Jr_{\mathrm{cert}}
>
\frac{\nu_{\mathrm{seed}}}{2}>0.
$$
The inactive root-equation gap remains at least
$$
\gamma_{\mathrm{gap}}-L_Fr_{\mathrm{cert}}
>
\frac{\gamma_{\mathrm{gap}}}{2}>0,
$$
so no inactive branch is born. The active memory-depth distance remains at least
$$
\gamma_h-L_hr_{\mathrm{cert}}
>
\frac{\gamma_h}{2}>0,
$$
so no active root reaches the stored-horizon boundary. Finally, the envelope slack remains at least
$$
\gamma_{\mathrm{env}}-L_{\mathrm{env}}r_{\mathrm{cert}}
>
\frac{\gamma_{\mathrm{env}}}{2}>0.
$$
These four strict inequalities are precisely the branch-chart, gap, memory-depth, and envelope margins required for the sampled finite certificate.

#### Precompactness of returned histories

> **Proposition (Precompactness of the Return Image).**
> Fix a dual-mollified inbound class
> $$
> \mathcal{A}_{x_\ast,\eta}
> \subset
> \Sigma^-_{x_\ast,\eta}
> $$
> such that:
> 1. for every
>    $$
>    \psi\in\mathcal{A}_{x_\ast,\eta},
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
> P_\eta\!\big(\mathcal{A}_{x_\ast,\eta}\big)
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
\psi_n\in\mathcal{A}_{x_\ast,\eta}.
$$
The returned-history bounds give uniform boundedness in
$$
C^0([-h,0]),
$$
and the speed bound gives
$$
|\phi_n(\theta_1)-\phi_n(\theta_2)|
\le
U_{\max}|\theta_1-\theta_2|,
$$
so
$$
\{\phi_n\}
$$
is equicontinuous. The Lipschitz-velocity bound gives
$$
|\dot\phi_n(\theta_1)-\dot\phi_n(\theta_2)|
\le
A_{\max}|\theta_1-\theta_2|,
$$
so
$$
\{\dot\phi_n\}
$$
is uniformly bounded and equicontinuous.

Arzela-Ascoli therefore yields a subsequence, still denoted
$$
\phi_n,
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
[-h,0].
$$
Since
$$
\phi_n(\theta)-\phi_n(0)=\int_0^\theta \dot\phi_n(s)\,ds,
$$
passing to the limit gives
$$
\phi_\ast(\theta)-\phi_\ast(0)=\int_0^\theta v_\ast(s)\,ds.
$$
Hence
$$
\phi_\ast\in C^1([-h,0])
\qquad
\text{and}
\qquad
\dot\phi_\ast=v_\ast,
$$
so the subsequence converges in the
$$
C^1
$$
norm. Therefore
$$
P_\eta\!\big(\mathcal{A}_{x_\ast,\eta}\big)
$$
is precompact in
$$
C^1([-h,0]).
$$

This proposition deliberately stops short of invariance. Its role is only to show that once the return map is defined on a uniformly controlled class, its image cannot spread out arbitrarily in history space.

#### Certified branch-chart well-posedness

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
>    \tau_\beta(t)\in[0,h-\gamma_h]
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
> x_\phi|_{[-h,\tau_{\mathrm{wp}}]}
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
|J|\ge\nu,
$$
so the implicit-function theorem makes each root time locally Lipschitz in the receiver time and in the stored history. The inactive gap prevents any additional root from entering the finite chart on the controlled interval. The dual-mollified kernel is smooth on the shell scale
$$
\eta
$$
and is uniformly bounded on the core scale
$$
\epsilon_c>0,
$$
with denominator at least
$$
\epsilon_c^2.
$$
On an origin-crossing chart, the previous origin-layer lemma supplies the same local
$$
C^1
$$
radial vector-field control after the sheet projection, so the signed scalar branch-sum discontinuity is not part of the local well-posedness argument.
Together with the finite branch count and the fixed horizon
$$
h,
$$
these bounds make the branch-chart vector field locally Lipschitz as a map from the stored
$$
C^1
$$
history segment to acceleration. The integral equation
$$
x(t)=\phi(0)+t\dot\phi(0)+\int_0^t(t-s)\,F_\eta(x_s)\,ds
$$
then gives local existence and uniqueness by the standard contraction argument on a short
$$
C^1
$$
tube. Applying the same Lipschitz estimate to two solutions and using Gronwall on the controlled interval gives local Lipschitz dependence of
$$
x
$$
and
$$
\dot x
$$
on the initial history.

#### Certified fold-event atlas

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
>    g_k(t,s;\lambda)
>    =
>    a_k(s-s_k)^2+b_k\lambda+\mathrm{higher\ order},
>    \qquad
>    a_kb_k\ne 0;
>    $$
> 3. parity data
>    $$
>    \Delta N_k\in2\mathbb{Z},
>    \qquad
>    \Delta D_k=0;
>    $$
> 4. a finite fold-impulse ceiling and an outgoing chart on which the post-fold roots again have a positive Jacobian floor.
>
> Outside the union of the fold layers, the active roots must remain simple with the certified Jacobian floors and inactive-root gaps.

This reconciles the continuity row with the causal-fold geometry. A field-speed separator may be a genuine root-pair birth or death, but it is not an uncontrolled discontinuity if the atlas records the parity-preserving transition and hands the trajectory to a certified outgoing chart.

#### Continuity on the tame envelope

> **Proposition (Continuity of the Return Map on $\mathcal{K}_{x_\ast,\eta}$).**
> Let
> $$
> \mathcal{K}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}
> $$
> be a closed convex tame envelope such that:
> 1. each
>    $$
>    \psi\in\mathcal{K}_{x_\ast,\eta}
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
>    x(T(\psi);\psi)=x_\ast,
>    \qquad
>    \dot x(T(\psi);\psi)\le -u_{\mathrm{sec}}<0.
>    $$
>
> Then
> $$
> P_\eta:\mathcal{K}_{x_\ast,\eta}\to C^1([-h,0])
> $$
> is continuous.

Proof.
Take
$$
\psi_n\to \psi
\qquad
\text{in }C^1([-h,0]).
$$
The certified branch-chart well-posedness proposition and the class-uniform tube bounds imply
$$
x_n\to x,
\qquad
\dot x_n\to \dot x
$$
uniformly on compact intervals in
$$
[0,T_{\max}].
$$
The tame root-persistence hypothesis prevents uncontrolled branch changes and Jacobian loss. The certified fold-event atlas covers the finitely many permitted separator transitions by integral-law fold layers with fixed incoming and outgoing charts, so the forward solution map is continuous on the entire tame envelope. For the section function
$$
G(t,\psi)\equiv x(t;\psi)-x_\ast,
$$
the convergence of
$$
x_n
$$
to
$$
x
$$
is uniform in a fixed neighborhood of
$$
T(\psi).
$$
Uniform transversality gives
$$
G(T(\psi),\psi)=0,
\qquad
\partial_tG(T(\psi),\psi)=\dot x(T(\psi);\psi)\le -u_{\mathrm{sec}}<0,
$$
and therefore
$$
T(\psi_n)\to T(\psi).
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
n.
$$
The uniform transversality bound excludes a second nearby return and identifies this zero with
$$
T(\psi_n).
$$
Finally,
$$
P_\eta(\psi_n)(\theta)=x_n(T(\psi_n)+\theta),
$$
so the convergence of trajectories and return times yields
$$
P_\eta(\psi_n)\to P_\eta(\psi)
$$
in
$$
C^1([-h,0]).
$$

#### Invariant-envelope closure

The cycle estimates now reduce to three explicit margins:
$$
\mathfrak M_{\mathrm{in}}
\equiv
\frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
-
\frac{\overline A_s^\rho\,\epsilon_c}{2\beta_{p,\max}}
-
V_{\max},
$$
coming from Proposition `Explicit short-window recapture regime`, and
$$
\mathfrak M_{\mathrm{ent}}
\equiv
\underline A_p^{\mathrm{out}}
-
\overline A_{s,\mathrm{ent}}^{\mathrm{out}},
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
\sigma_{\mathrm{out}}\epsilon_c^2},
$$
coming from the unified trimmed-apocenter outer-turn criterion. The first margin forces the initial post-crossing turnaround, the second supplies the non-circular sub-field-speed apocenter-entry window, and the third forces the final apocenter turn once that window exists.

> **Theorem (Invariant-Envelope Closure from Compatible Explicit Regimes).**
> Fix
> $$
> x_\ast>0
> $$
> and a tame inbound class
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}.
> $$
> Assume:
> 1. the collapse-to-crossing control theorem holds on
>    $$
>    \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
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
>    X_{\max}\ge \max\{x_\ast,X_{\mathrm{out},\max}\},
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
> P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
> \subseteq
> \mathcal{C}_{x_\ast,\eta}.
> $$

Proof.
Collapse-to-crossing control delivers an admissible crossing with speed at most
$$
V_{\max}.
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
\mathfrak M_{\mathrm{out}}>0.
$$
The return lemmas then give re-entry to
$$
x=x_\ast
$$
with class-uniform position, speed, acceleration, time, and tame delayed-root bounds. The envelope inequalities in item 6 place the entire returned history back inside
$$
\mathcal{C}_{x_\ast,\eta}.
$$
This is the dynamical input needed to turn
$$
\mathcal{K}_{x_\ast,\eta}
$$
into a genuine self-map domain for
$$
P_\eta.
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
> X_{\max}\ge \max\{x_\ast,X_{\mathrm{out},\max}\},
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
\frac{\beta_{p,\max}^2}{c_fC_p}-\epsilon_c>0,
$$
$$
\frac{\kappa\epsilon^2}{4\beta_{p,\max}\epsilon_c}
-
\frac{\overline A_s^\rho\epsilon_c}{2\beta_{p,\max}}
-
V_{\max}
>0,
$$
$$
\underline A_p^{\mathrm{out}}
-
\overline A_{s,\mathrm{ent}}^{\mathrm{out}}
-
a_{\mathrm{ent}}^{\mathrm{out}}
\ge 0,
\qquad
a_{\mathrm{ent}}^{\mathrm{out}}>0,
$$
$$
\underline A_p^{\mathrm{out}}
-
\frac{\kappa\epsilon^2}{c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
-
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\epsilon_c^2}
>0,
$$
$$
T_{\mathrm{ent}}^{\mathrm{out}}
-
\frac{\big(V_{\mathrm{ent}}^{\mathrm{out}}-(c_f-\sigma_{\mathrm{out}})\big)_+}
{a_{\mathrm{ent}}^{\mathrm{out}}}
-
\tau_{\mathrm{sub}}^{\mathrm{out}}
\ge 0,
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
h.
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
p_0.
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
>0.
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
\Lambda_\delta.
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
> \overline A_s^\rho=gS_{\mathrm{in}}^\rho,
> \qquad
> \underline A_p^{\mathrm{out}}=gP_{\mathrm{out}},
> \qquad
> \overline A_{s,\mathrm{ent}}^{\mathrm{out}}=gS_{\mathrm{ent}}^{\mathrm{out}},
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
gC_{\mathrm{in}}(\epsilon_c)-V_{\max},
$$
which is positive by the lower bound on
$$
g.
$$
If the certified Cauchy-Schwarz refinement is used, the same argument replaces
$$
C_{\mathrm{in}}
$$
by
$$
C_{\mathrm{in}}^{\mathrm{CS}}.
$$
The entry margin satisfies
$$
\mathfrak M_{\mathrm{ent}}-a_{\mathrm{ent}}^{\mathrm{out}}
=
g\big(P_{\mathrm{out}}-S_{\mathrm{ent}}^{\mathrm{out}}-m_{\mathrm{ent}}\big)
>0.
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
\big),
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
\tau_{\mathrm{sub}}^{\mathrm{out}}.
$$
Thus the finite strict-regime list holds. Choosing the envelope constants with strict domination slack then supplies the strict slack point required by the previous proposition.

> **Proposition (Certified self-map criterion).**
> Let
> $$
> \mathcal{K}_{x_\ast,\eta}
> =
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
> $$
> be a closed convex tame envelope produced by a finite certificate
> $$
> \{\ell_\alpha\le b_\alpha\}_{\alpha\in\mathcal{I}_{\mathrm{cert}}}.
> $$
> Assume:
> 1. the invariant-envelope closure theorem applies on
>    $$
>    \mathcal{K}_{x_\ast,\eta},
>    $$
>    so that
>    $$
>    P_\eta(\phi)\in\mathcal{C}_{x_\ast,\eta}
>    \qquad
>    \text{for every }\phi\in\mathcal{K}_{x_\ast,\eta};
>    $$
> 2. each certificate inequality is preserved by one return:
>    $$
>    \ell_\alpha(P_\eta(\phi))\le b_\alpha
>    \qquad
>    \text{for every }
>    \alpha\in\mathcal{I}_{\mathrm{cert}}
>    \text{ and every }
>    \phi\in\mathcal{K}_{x_\ast,\eta}.
>    $$
>
> Then
> $$
> P_\eta(\mathcal{K}_{x_\ast,\eta})
> \subseteq
> \mathcal{K}_{x_\ast,\eta}.
> $$

Proof.
Fix
$$
\phi\in\mathcal{K}_{x_\ast,\eta}.
$$
By invariant-envelope closure,
$$
P_\eta(\phi)\in\mathcal{C}_{x_\ast,\eta}.
$$
By certificate preservation,
$$
\ell_\alpha(P_\eta(\phi))\le b_\alpha
\qquad
\text{for every }\alpha\in\mathcal{I}_{\mathrm{cert}}.
$$
Therefore
$$
P_\eta(\phi)
\in
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
=
\mathcal{K}_{x_\ast,\eta}.
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
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
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
> P_\eta(\phi)\in\mathcal{C}_{x_\ast,\eta}
> \qquad
> \text{for every }\phi\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
> $$
> If, for every
> $$
> \phi\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
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
> P_\eta(\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}})
> \subseteq
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
> $$

Proof.
The invariant-envelope theorem gives the returned-history membership in
$$
\mathcal{C}_{x_\ast,\eta}.
$$
The displayed finite sample inequalities are exactly the certificate inequalities defining
$$
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
$$
in the sampled construction. Hence every returned history satisfies all certificate inequalities and therefore lies in
$$
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
$$

The hard part of applying this criterion is proving the finite mesh inequalities uniformly. The following budget form is the one that should be used in later proof checking.

> **Proposition (Returned-sample budget certificate).**
> In the setting of Proposition `Finite sampled preservation criterion`, suppose there are finite returned-sample budgets
> $$
> E_{j,+}^{x},
> \qquad
> E_{j,-}^{x},
> \qquad
> E_{j,+}^{v},
> \qquad
> E_{j,-}^{v},
> \qquad
> 0\le j\le N,
> $$
> such that for every
> $$
> \phi\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
> $$
> the returned history satisfies
> $$
> P_\eta(\phi)(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)
> \le E_{j,+}^{x},
> \qquad
> \phi_{\mathrm{cyc}}(\theta_j)-P_\eta(\phi)(\theta_j)
> \le E_{j,-}^{x},
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
> \max\{E_{j,+}^{x},E_{j,-}^{x},E_{j,+}^{v},E_{j,-}^{v}\}
> <
> \frac{r_{\mathrm{cert}}}{4}
> \qquad
> \text{for every }0\le j\le N
> $$
> hold, then
> $$
> P_\eta(\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}})
> \subseteq
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
> $$

Proof.
The one-sided budget inequalities imply
$$
|P_\eta(\phi)(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)|
<
\frac{r_{\mathrm{cert}}}{4},
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
> R_{j,+}^{x}
> \equiv
> \big(P_\eta(\phi_{\mathrm{cyc}})(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)\big)_+,
> \qquad
> R_{j,-}^{x}
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
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}},
> $$
> namely
> $$
> |P_\eta(\phi)(\theta_j)-P_\eta(\phi_{\mathrm{cyc}})(\theta_j)|
> \le
> L_j^x\|\phi-\phi_{\mathrm{cyc}}\|_{C^1},
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
> \phi\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
> $$
> If
> $$
> \max\{R_{j,+}^{x},R_{j,-}^{x}\}+L_j^x r_{\mathrm{cert}}
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
> P_\eta(\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}})
> \subseteq
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
> $$

Proof.
The sampled certificate construction gives
$$
\|\phi-\phi_{\mathrm{cyc}}\|_{C^1}\le r_{\mathrm{cert}}
$$
for every
$$
\phi\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
$$
Therefore
$$
P_\eta(\phi)(\theta_j)-\phi_{\mathrm{cyc}}(\theta_j)
\le
R_{j,+}^{x}+L_j^x r_{\mathrm{cert}},
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
> \max\{E_{j,+}^{x},E_{j,-}^{x},E_{j,+}^{v},E_{j,-}^{v}\}.
> $$
> If
> $$
> s_{\mathrm{sam}}>0,
> $$
> then every codimension-one sample face of
> $$
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
> $$
> is strictly inward under one return.

Proof.
The sample faces are exactly the four one-sided equalities, for each mesh index
$$
j,
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
\frac{r_{\mathrm{cert}}}{4}.
$$
But the returned-sample budget bounds that same defect by at most
$$
\frac{r_{\mathrm{cert}}}{4}-s_{\mathrm{sam}},
$$
a contradiction. Hence no returned history reaches any sample face; all sample faces are strictly inward.

One useful route for proving the budget hypotheses is a boundary-trapping check: for each certificate face
$$
\ell_\alpha=b_\alpha,
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
>    \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}};
>    $$
> 3. the factorized coupled-regime corridor holds, so invariant-envelope closure gives
>    $$
>    P_\eta(\phi)\in\mathcal{C}_{x_\ast,\eta}
>    \qquad
>    \text{for every }\phi\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}};
>    $$
> 4. and either the direct returned-sample budget certificate holds on
>    $$
>    \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}},
>    $$
>    for example by boundary trapping, or the residual-plus-sensitivity sampled preservation criterion holds on
>    $$
>    \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
>    $$
>
> Then
> $$
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
> $$
> is a nonempty closed convex tame self-map domain for
> $$
> P_\eta,
> $$
> namely
> $$
> P_\eta\!\big(\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}\big)
> \subseteq
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
> $$

Proof.
The positive seed-cycle ledger and the radius criterion give the strict branch-chart, gap, memory-depth, and envelope margins required by the sampled finite certificate. The finite certificate construction then makes
$$
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
$$
a nonempty closed convex tame envelope. The factorized corridor supplies the coupled strict-slack point needed by invariant-envelope closure, so returned histories lie in
$$
\mathcal{C}_{x_\ast,\eta}.
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
   \gamma_{\mathrm{env}}>0,
   $$
   and finite sensitivities
   $$
   L_J,
   \qquad
   L_F,
   \qquad
   L_h,
   \qquad
   L_{\mathrm{env}}.
   $$
   This row chooses
   $$
   r_{\mathrm{cert}}
   $$
   and produces the closed convex tame certificate.
   The row begins with a candidate
   $$
   \phi_{\mathrm{cyc}},
   $$
   a common mesh, and a null-coordinate causal pre-ledger. For each ordered receiver-source block
   $$
   (I_\alpha,I_\beta),
   $$
   the pre-ledger must classify the row as empty, simple-root, or fold-layer using
   $$
   u=c_f t-x,
   \qquad
   w=c_f t+x.
   $$
   Empty rows require strict range separation; simple-root rows require a positive source-side derivative floor; fold-layer rows remain outside branch-sum reduction until the dual-mollified fold certificate supplies the parity-preserving transition
   $$
   \Delta N\in 2\mathbb{Z},
   \qquad
   \Delta D=0.
   $$
   Any unresolved row blocks the seed chart before corridor, monodromy, or returned-sample work begins.
2. **Coupled-corridor row.**
   Verify
   $$
   C_{\mathrm{in}}(\epsilon_c)>0,
   \qquad
   P_{\mathrm{out}}-S_{\mathrm{ent}}^{\mathrm{out}}-m_{\mathrm{ent}}>0,
   \qquad
   P_{\mathrm{out}}-D_{\mathrm{deep}}(\epsilon_c)-L_{\mathrm{shell}}(\eta,\epsilon_c)>0,
   $$
   choose
   $$
   g=\kappa\epsilon^2
   $$
   above the factorized threshold, and set
   $$
   a_{\mathrm{ent}}^{\mathrm{out}}=gm_{\mathrm{ent}}.
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
   \mathcal{H}_h^{(1)}=C^1([-h,0];\mathbb{R}^2),
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
   \right\}.
   $$
   The candidate packet must report this endpoint row on the same packet
   identity as the pre-ledger, branch chart, fold atlas, and returned samples.
   The tangent row consumed by monodromy must satisfy
   $$
   \dot \Xi(0)=V(0),
   \qquad
   \dot V(0)=D F_\eta(\Phi)\Psi.
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
   M_N,
   $$
   an interval spectral enclosure, and an explicit diagnostic margin
   $$
   \delta_{\mathrm{mon}}>0.
   $$
   If any certified eigenvalue satisfies
   $$
   |\lambda|>1+\delta_{\mathrm{mon}},
   $$
   the residual-plus-sensitivity route should be considered closed for that unstable direction, and the returned-sample row must use direct one-sided boundary trapping. If the spectrum and operator-norm enclosure are small enough to give usable constants
   $$
   L_j^x,
   \qquad
   L_j^v,
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
   E_{j,\pm}^{x},
   \qquad
   E_{j,\pm}^{v}
   $$
   by boundary trapping with strict sample slack. Equivalently, when the sensitivity constants are tame enough, verify
   $$
   \max\{R_{j,+}^{x},R_{j,-}^{x}\}+L_j^x r_{\mathrm{cert}}
   <
   \frac{r_{\mathrm{cert}}}{4},
   \qquad
   \max\{R_{j,+}^{v},R_{j,-}^{v}\}+L_j^v r_{\mathrm{cert}}
   <
   \frac{r_{\mathrm{cert}}}{4}
   $$
   for every mesh index. This row supplies certificate preservation under one return.

This ledger is deliberately finite. Passing the seed-chart, coupled-corridor, solution-manifold compatibility, and returned-sample rows turns the domain-production burden into the self-map inclusion; the monodromy row identifies whether the returned-sample proof should use sensitivity control or boundary trapping. Failing any required row identifies the exact obstruction.

#### Certified topology row

After the finite closure audit supplies
$$
P_\eta\!\big(\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}\big)
\subseteq
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}},
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
-\dot\phi_{\mathrm{cyc}}(0)-\frac{r_{\mathrm{cert}}}{4}.
$$
Because the mesh includes
$$
\theta_N=0,
$$
the returned-sample inequalities imply
$$
\partial_\theta P_\eta(\phi)(0)
\le
\dot\phi_{\mathrm{cyc}}(0)+\frac{r_{\mathrm{cert}}}{4}
=
-u_{\mathrm{ret}}^{\mathrm{cert}}.
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
>    \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
>    $$
>    with the Jacobian floors, branch-count ceilings, and memory-depth bounds supplied by the certificate outside the certified fold-event atlas, and each fold layer in that atlas has a parity-preserving incoming-to-outgoing chart transition.
>
> Then
> $$
> P_\eta:
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
> \to
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
> $$
> is continuous, and
> $$
> P_\eta\!\big(\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}\big)
> $$
> is precompact in
> $$
> C^1([-h,0]).
> $$

Proof.
The finite-certificate invariant closure package gives
$$
P_\eta(\phi)\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
\subseteq
\mathcal{C}_{x_\ast,\eta}
$$
for every
$$
\phi\in\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
$$
Hence every returned history satisfies the position, speed, Lipschitz-velocity, and horizon bounds required by Proposition `Precompactness of the Return Image`; that proposition gives precompactness.

For continuity, certified branch-chart well-posedness gives continuous dependence of the controlled continuation on the initial history while the certificate keeps the same exterior charts, origin-layer charts, fold-event atlas, and Jacobian floors. The displayed return-speed estimate gives the uniform transverse return condition
$$
\dot x(T(\phi);\phi)\le -u_{\mathrm{ret}}^{\mathrm{cert}}<0.
$$
Therefore the continuity proposition for the return map applies with
$$
\mathcal{K}_{x_\ast,\eta}
=
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}},
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

#### Remaining blockers before Schauder

At this stage the remaining blockers are narrow and explicit:

No remaining blocker asks for an elementary closed-form orbit. The proof needs one instantiated candidate cycle
$$
\phi_{\mathrm{cyc}},
$$
defined against the dual-mollified absolute-time law, and finite certificate data proving that the same closed convex tame domain is self-mapping, continuous, and precompact under
$$
P_\eta.
$$

The first explicit velocity-class packet has moved the obstruction from candidate absence to candidate falsification. A fixed cosine candidate supplies useful null-coordinate and fold-layer diagnostics, but it fails at the parent-complement part of the pre-ledger: after accepted simple-root windows and fold-layer diagnostics are removed, some parent complements still carry equality cores or non-strict null-coordinate overlap. The next admissible route is therefore a fresh fold-adapted collocation candidate, or an equivalent certified construction, whose pre-ledger closes before any seed-chart or branch-chart row begins.

There is now also a stricter sub-field-speed comparison branch. The held-release ODE segment and the exterior affine delayed-partner chart are action-generated baselines, not prescribed trajectories. They show that a normalized release from $x_0>1$ need not reach field speed during the held-source segment, and that the exterior delayed partner branch approaches $\dot x=-c_f$ only at the origin-layer limit. This does not prove a sub-field-speed breather, but it changes the proof burden: field-speed separators must be derived from the full dual-mollified dynamics or replaced by a certified sub-field return mechanism.

The negative-breather lesson is that even a formal expansion valid to all
orders can miss a leakage channel outside the expansion scale. The collinear
program therefore treats a small residual curve, a long-lived numerical trace,
or a closed-looking ansatz as candidate evidence only. Promotion requires the
existing certificate rows to close the leakage routes they control: the
pre-ledger fold-layer budgets, coupled-corridor propagation, returned-sample
preservation, and topology/self-map row on one certified domain. The same rule
applies internally: partial diagnostics remain candidate evidence while
parent-complement equality cores remain unresolved.

Before those five audit rows can be meaningful, the candidate must pass the named null-coordinate pre-ledger target from [Closed-Form Collinear Breather Ansatz](../../../../markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md#null-coordinate-causal-pre-ledger). Concretely, the proof must:

1. produce one candidate cycle
   $$
   \phi_{\mathrm{cyc}},
   $$
   with a certificate mesh and either fold-adapted fractional basis data near field-speed separators or an interval-collocation representation with equivalent residual targets;
2. verify the `Null-Coordinate Causal Pre-Ledger` target for
   $$
   |x(t)-x(s)|=c_f(t-s),
   \qquad
   s<t,
   $$
   using
   $$
   u=c_f t-x,
   \qquad
   w=c_f t+x
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
   \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}};
   $$
4. verify the factorized coupled-corridor inequalities
   $$
   C_{\mathrm{in}}(\epsilon_c)>0,
   \qquad
   P_{\mathrm{out}}-S_{\mathrm{ent}}^{\mathrm{out}}-m_{\mathrm{ent}}>0,
   \qquad
   P_{\mathrm{out}}-D_{\mathrm{deep}}(\epsilon_c)-L_{\mathrm{shell}}(\eta,\epsilon_c)>0,
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
   |\lambda|>1+\delta_{\mathrm{mon}},
   $$
   use the result to route the returned-sample proof to boundary trapping rather than residual-plus-sensitivity estimates.
6. derive returned-sample budgets. If the sample sensitivities
   $$
   L_j^x,
   \qquad
   L_j^v
   $$
   are too large to close the residual-plus-sensitivity route, use direct boundary trapping for
   $$
   E_{j,\pm}^{x},
   \qquad
   E_{j,\pm}^{v}
   $$
   with strict sample slack. When sensitivities are small enough, the residual-plus-sensitivity inequalities
   $$
   R_{j,\pm}^{x}+L_j^x r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4},
   \qquad
   R_{j,\pm}^{v}+L_j^v r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4},
   $$
   are sufficient. In either case, prove the finite checks that imply
   $$
   P_\eta(\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}})
   \subseteq
   \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
   $$
   on that same domain.
7. verify the topology row:
   $$
   u_{\mathrm{ret}}^{\mathrm{cert}}>0
   $$
   and certified branch-chart well-posedness for the dual-mollified vector field on the controlled continuation, including the origin-layer chart and certified fold-event atlas, so the certified topology proposition gives continuity and precompactness on
   $$
   \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
   $$

Once the pre-ledger gate passes and the five audit rows are theorem-level, the finite-certificate invariant closure package supplies the self-map domain and the certified topology proposition supplies continuity and precompactness. The remaining Schauder step is then formally routine.

#### Schauder capstone

> **Conditional Theorem (Schauder Existence of a Dual-Mollified Collinear Breather).**
> Assume:
> 1. the theorem `Seed-to-Tame Full-Cycle Propagation`;
> 2. the finite-certificate invariant closure package, producing the nonempty closed convex tame self-map domain
>    $$
>    \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}};
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
> \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}
> $$
> such that
> $$
> P_\eta(\phi_\eta^\ast)=\phi_\eta^\ast.
> $$
> The corresponding delayed trajectory is an exact bounded periodic origin-crossing two-body motion in the dual-mollified collinear model.

Proof.
`Seed-to-Tame Full-Cycle Propagation` supplies a nonempty tame class. The finite-certificate invariant closure package places that class inside a nonempty closed convex self-map domain
$$
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
$$
Continuity and precompactness place the return image inside a compact subset of that same domain, while invariant-envelope closure prevents escape. Schauder therefore yields a fixed point of
$$
P_\eta
$$
on
$$
\mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}},
$$
and by construction that fixed point is exactly a periodic returned history.
This capstone remains conditional on the finite closure audit and certified topology row. Without one nonempty closed convex tame self-map domain carrying propagation, continuity, precompactness, and invariance all at once, Schauder does not yet apply.

#### Seed history and tame-class nonemptiness

The remaining global nonvacuity issue is now easy to state. The invariant-envelope theorem is useful only if the section-side tame class is actually nonempty. The next theorem target is therefore to construct at least one explicit inbound history with controlled delayed geometry and then thicken it to a small nonempty tame neighborhood in the section topology.

The simplest seed is a strictly sub-field-speed affine inbound history on the right exterior branch. It is not meant to solve the full forward dynamics; its role is only to prove that the section-side tame constraints are simultaneously realizable.

> **Target Theorem (Seed History and Section-Tame Nonemptiness).**
> Fix
> $$
> x_\ast>0,
> \qquad
> 0<u_{\mathrm{seed}}<c_f,
> \qquad
> h\ge \frac{2x_\ast}{c_f-u_{\mathrm{seed}}}.
> $$
> Then there exists an explicit inbound history
> $$
> \psi_{\mathrm{seed}}\in \Sigma^-_{x_\ast,\eta}\cap \mathcal{C}_{x_\ast,\eta}
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
>    \mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}
>    \subseteq
>    \mathcal{C}_{x_\ast,\eta}.
>    $$

This theorem is intentionally only a section-side nonemptiness statement. It does not yet say that the forward delayed flow preserves the same class for one full cycle. That stronger claim belongs to the later invariant-envelope theorem.

> **Proposition (Explicit affine inbound seed history).**
> Fix
> $$
> x_\ast>0,
> \qquad
> 0<u_{\mathrm{seed}}<c_f,
> \qquad
> h\ge \frac{2x_\ast}{c_f-u_{\mathrm{seed}}}.
> $$
> Define
> $$
> \psi_{\mathrm{seed}}(\theta)
> \equiv
> x_\ast-u_{\mathrm{seed}}\theta,
> \qquad
> \theta\in[-h,0].
> $$
> Then:
> 1. the section conditions hold:
>    $$
>    \psi_{\mathrm{seed}}(0)=x_\ast,
>    \qquad
>    \dot\psi_{\mathrm{seed}}(0)=-u_{\mathrm{seed}}<0;
>    $$
> 2. the stored path is right exterior and monotone inbound:
>    $$
>    x_\ast
>    \le
>    \psi_{\mathrm{seed}}(\theta)
>    \le
>    x_\ast+u_{\mathrm{seed}}h,
>    \qquad
>    \dot\psi_{\mathrm{seed}}(\theta)=-u_{\mathrm{seed}},
>    \qquad
>    \ddot\psi_{\mathrm{seed}}(\theta)=0;
>    $$
> 3. there is exactly one partner root on the stored interval, located at
>    $$
>    \theta_{p,\mathrm{seed}}
>    =
>    -\frac{2x_\ast}{c_f-u_{\mathrm{seed}}},
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
> X_{\max}\ge x_\ast+u_{\mathrm{seed}}h,
> \qquad
> U_{\max}\ge u_{\mathrm{seed}},
> \qquad
> A_{\max}>0,
> \qquad
> \nu_{\mathrm{seed}}\le 1-\frac{u_{\mathrm{seed}}}{c_f},
> $$
> then
> $$
> \psi_{\mathrm{seed}}\in \mathcal{C}_{x_\ast,\eta},
> $$
> and the stored-history transversality bounds hold with
> $$
> |J_p|\ge \nu_{\mathrm{seed}},
> $$
> while the self-root transversality condition is vacuous on the seed because there are no exact same-side self roots.

Proof.
The section anchoring and inbound sign are immediate from the definition of
$$
\psi_{\mathrm{seed}}.
$$
Since
$$
\theta\in[-h,0],
$$
one has
$$
\psi_{\mathrm{seed}}(\theta)=x_\ast-u_{\mathrm{seed}}\theta
=
x_\ast+u_{\mathrm{seed}}|\theta|,
$$
so the stored path remains on the right exterior branch, decreases monotonically toward the section as
$$
\theta\uparrow 0,
$$
and satisfies the displayed position, speed, and acceleration bounds.

For a partner root at the section time
$$
\theta=0,
$$
the delayed causal relation is
$$
x_\ast+\psi_{\mathrm{seed}}(\theta_p)=c_f(0-\theta_p).
$$
Writing
$$
s=-\theta_p>0,
$$
this becomes
$$
x_\ast+\bigl(x_\ast+u_{\mathrm{seed}}s\bigr)=c_f s,
$$
hence
$$
2x_\ast=(c_f-u_{\mathrm{seed}})s,
$$
and therefore
$$
s=\frac{2x_\ast}{c_f-u_{\mathrm{seed}}}.
$$
The lower bound on
$$
h
$$
ensures that
$$
\theta_{p,\mathrm{seed}}=-s
$$
lies inside
$$
[-h,0].
$$
Since the seed velocity is constant,
$$
J_{p,\mathrm{seed}}
=
1+\frac{\dot\psi_{\mathrm{seed}}(\theta_{p,\mathrm{seed}})}{c_f}
=
1-\frac{u_{\mathrm{seed}}}{c_f}>0.
$$

Now consider exact same-side self roots on the stored interval. Such a root would satisfy
$$
|\psi_{\mathrm{seed}}(0)-\psi_{\mathrm{seed}}(\theta_s)|
=
c_f(0-\theta_s).
$$
Again writing
$$
s=-\theta_s>0,
$$
the left-hand side equals
$$
u_{\mathrm{seed}}s,
$$
so the equation becomes
$$
u_{\mathrm{seed}}s=c_f s.
$$
Because
$$
0<u_{\mathrm{seed}}<c_f,
$$
this has no solution for
$$
s>0.
$$
Hence there are no exact same-side self roots on
$$
[-h,0).
$$

The final membership claim is then immediate from the displayed envelope inequalities.

> **Corollary (Nonempty section-level tame neighborhood).**
> Under the hypotheses of the proposition, there exists
> $$
> \varepsilon_{\mathrm{seed}}>0
> $$
> such that the set
> $$
> \mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}
> \equiv
> \left\{
> \phi\in \mathcal{C}_{x_\ast,\eta}
> \;\middle|\;
> \phi(0)=x_\ast,
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
\psi_{\mathrm{seed}}\in \mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}
$$
for every
$$
\varepsilon_{\mathrm{seed}}>0.
$$
The seed has a strict sub-field-speed margin
$$
\sigma_{\mathrm{seed}}\equiv c_f-u_{\mathrm{seed}}>0
$$
and a simple partner root with
$$
J_{p,\mathrm{seed}}>0.
$$
By continuity of the root equations and of the Jacobian factors under small $C^1$ perturbations of the stored history, these properties persist for all histories sufficiently close to
$$
\psi_{\mathrm{seed}}.
$$
Likewise, the same-side self-root equation has a strict gap on the seed because
$$
u_{\mathrm{seed}}<c_f,
$$
so exact same-side self roots cannot appear under a sufficiently small perturbation. Therefore a small enough neighborhood remains inside a section-level tame subclass.

This corollary is the first concrete nonvacuity statement for the theorem program. The remaining task is no longer to show that tame histories exist at all, but to propagate such a seed class through the full delayed cycle strongly enough that it becomes the nonempty class required by the invariant-envelope theorem.

#### Seed-to-tame propagation target

The seed construction resolves only the section-side nonvacuity issue. The next step is to promote a smaller neighborhood of seed histories to a genuinely nonempty tame class for the delayed flow itself. In other words, one wants to replace
$$
\mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}
$$
by a forward-propagated subclass on which the collapse, recapture, return, and root-control estimates all hold on one full cycle.

This is the precise bridge from the section-level seed construction to the invariant-envelope theorem.

> **Target Theorem (Seed-to-Tame Full-Cycle Propagation).**
> Assume the affine seed proposition and the nonempty section-level neighborhood corollary above. Then there exists a nonempty subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}
> $$
> such that:
> 1. every
>    $$
>    \psi\in \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
>    $$
>    admits a unique forward continuation through one full cycle;
> 2. the collapse-to-crossing control theorem applies uniformly on this class;
> 3. the explicit inner recapture regime and the unified trimmed-apocenter outer-turn criterion both apply uniformly on this class;
> 4. the turn-to-section return lemmas apply uniformly on this class;
> 5. and the returned history satisfies
>    $$
>    P_\eta(\psi)\in \mathcal{C}_{x_\ast,\eta}.
>    $$
>
> In particular,
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\neq \varnothing,
> $$
> the return map
> $$
> P_\eta
> $$
> is well defined on a nonempty tame class, and the invariant-envelope theorem becomes nonvacuous.

This theorem is deliberately phrased as a propagation target rather than a proved proposition. The real remaining work is to show that the estimates already developed later in the note can be made uniform on a sufficiently small seed neighborhood rather than only along a single handpicked history.

#### Seed-propagation ladder

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
   \mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta}
   \subseteq
   \mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}.
   $$
3. **Seed-neighborhood realization of the inner regime.**
   Verify that the first crossing from this neighborhood lands uniformly in the Goldilocks window required by Proposition `Explicit short-window recapture regime`.
4. **Seed-neighborhood realization of the outer regime.**
   Verify that the same trajectories satisfy the hypotheses of the unified trimmed-apocenter outer-turn criterion on the final apocenter window.
5. **Returned-history reentry.**
   Show that the returned history segment lies back inside
   $$
   \mathcal{C}_{x_\ast,\eta}
   $$
   and, after shrinking once more if necessary, inside a forward-propagation subclass
   $$
   \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}.
   $$

The conceptual point is simple: the seed history does not need to solve the whole breather problem by itself. It only needs to provide one strict interior point of history space around which all the already-developed cycle estimates can be made uniform. Once such a neighborhood is propagated through one full cycle, the nonempty tame class required by the Schauder program is in hand.

> **Proposition (Local seed-neighborhood continuation with stored-root persistence).**
> Assume the affine seed proposition above, and strengthen the horizon choice slightly to
> $$
> h>\frac{2x_\ast}{c_f-u_{\mathrm{seed}}}.
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
> \mathcal{C}^{\mathrm{seed,loc}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}
> $$
> such that for every
> $$
> \phi\in \mathcal{C}^{\mathrm{seed,loc}}_{x_\ast,\eta}
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
h>\frac{2x_\ast}{c_f-u_{\mathrm{seed}}},
$$
there is a positive slack
$$
\delta_h
\equiv
(c_f-u_{\mathrm{seed}})h-2x_\ast
>0.
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
\varepsilon_{\mathrm{loc}}h<\delta_h.
$$
Let
$$
\mathcal{C}^{\mathrm{seed,loc}}_{x_\ast,\eta}
\equiv
\left\{
\phi\in \mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}
\;\middle|\;
\|\phi-\psi_{\mathrm{seed}}\|_{C^1([-h,0])}\le \varepsilon_{\mathrm{loc}}
\right\}.
$$
This set is nonempty because it contains
$$
\psi_{\mathrm{seed}}.
$$

For any
$$
\phi\in \mathcal{C}^{\mathrm{seed,loc}}_{x_\ast,\eta},
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
[-h,0].
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
c_f(0-\theta_s),
$$
contradicting the exact root equation. Hence no exact same-side self root exists on the stored interval.

For the partner root, define
$$
F_\phi(\theta)\equiv \phi(0)+\phi(\theta)+c_f\theta.
$$
Then
$$
F_\phi(0)=2x_\ast>0,
$$
while
$$
F_\phi(-h)
\le
x_\ast+\bigl(x_\ast+u_{\mathrm{seed}}h+\varepsilon_{\mathrm{loc}}h\bigr)-c_f h
=
2x_\ast-(c_f-u_{\mathrm{seed}}-\varepsilon_{\mathrm{loc}})h
<
0
$$
by the choice of
$$
\varepsilon_{\mathrm{loc}}.
$$
Moreover,
$$
F_\phi'(\theta)=\dot\phi(\theta)+c_f
\ge
c_f-(u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}})
>0,
$$
so
$$
F_\phi
$$
is strictly increasing. Therefore it has a unique zero
$$
\theta_p(\phi)\in[-h,0).
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
>0.
$$

Finally, on this branch pattern the dual-mollified force law has one simple stored partner root and no exact same-side self roots on the initial history. Under the stated local Lipschitz hypothesis, standard local existence and continuous-dependence theory for functional differential equations yields a unique forward continuation on a short interval
$$
[0,\tau_{\mathrm{loc}}].
$$
This proves the proposition.

> **Proposition (Seed-neighborhood collapse control under a uniform inward bracket).**
> Let
> $$
> \mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,loc}}_{x_\ast,\eta}
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
> \psi\in \mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta}
> $$
> the corresponding forward trajectory satisfies on its pre-crossing leg:
> 1. the two-sided inward acceleration bracket
>    $$
>    -a_+^{\mathrm{seed}}
>    \le
>    \ddot x(t;\psi)
>    \le
>    -a_-^{\mathrm{seed}}<0;
>    $$
> 2. the acceleration ceiling
>    $$
>    |\ddot x(t;\psi)|\le A_{\mathrm{coll}};
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
>    \psi\in \mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta}
>    $$
>    reaches the origin in finite time, with the uniform bound
>    $$
>    t_{\mathrm{cross}}(\psi)
>    \le
>    \sqrt{\frac{2x_\ast}{a_-^{\mathrm{seed}}}};
>    $$
> 2. the pre-crossing tube bounds
>    $$
>    0\le x(t;\psi)\le X_{\mathrm{seed},\max},
>    \qquad
>    |\dot x(t;\psi)|\le U_{\mathrm{seed},\max},
>    \qquad
>    |\ddot x(t;\psi)|\le A_{\mathrm{coll}}
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
>    \mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta}.
>    $$

Proof sketch.
For every
$$
\psi\in \mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta},
$$
the lower inward acceleration bound implies finite-time crossing by Lemma 6, yielding the displayed uniform bound on
$$
t_{\mathrm{cross}}(\psi).
$$
The two-sided acceleration bracket and the section-speed interval inherited from
$$
\mathcal{C}^{\mathrm{seed,loc}}_{x_\ast,\eta}
$$
allow Lemma 7 to be applied with
$$
u_0\in
\left[\frac{u_{\mathrm{seed}}}{2},\,u_{\mathrm{seed}}+\varepsilon_{\mathrm{loc}}\right].
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
\mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta}.
$$

> **Proposition (Seed-neighborhood realization of the explicit inner recapture regime).**
> Let
> $$
> \mathcal{C}^{\mathrm{seed,in}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta}
> $$
> be a nonempty subclass on which the collapse-to-crossing control theorem applies with uniform crossing-speed window
> $$
> V_{\min}^{\mathrm{seed}}
> \le
> -\dot x(t_{\mathrm{cross}};\psi)
> \le
> V_{\max}^{\mathrm{seed}}
> \qquad
> \text{for every }
> \psi\in \mathcal{C}^{\mathrm{seed,in}}_{x_\ast,\eta}.
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
> \mathcal{C}^{\mathrm{seed,in}}_{x_\ast,\eta}
> $$
> lies in the explicit short-window recapture regime, and the corresponding post-crossing branch turns around on the class-uniform window
> $$
> [0,\tau_\epsilon].
> $$

Proof sketch.
By the collapse-to-crossing theorem, every
$$
\psi\in \mathcal{C}^{\mathrm{seed,in}}_{x_\ast,\eta}
$$
reaches a crossing history inside the admissible crossing subclass and with outgoing radial speed at most
$$
V_{\max}^{\mathrm{seed}}.
$$
The displayed inequality is exactly the sufficient recapture condition from Proposition `Explicit short-window recapture regime`, with
$$
V_{\max}
$$
there replaced by the seed-neighborhood crossing-speed bound
$$
V_{\max}^{\mathrm{seed}}.
$$
The three displayed small-window inequalities guarantee the same choice
$$
\tau_\epsilon=\frac{\epsilon_c}{2\beta_{p,\max}}
$$
is admissible. Therefore Proposition `Explicit short-window recapture regime` applies uniformly to every first crossing issued from
$$
\mathcal{C}^{\mathrm{seed,in}}_{x_\ast,\eta},
$$
yielding a class-uniform post-crossing turnaround on
$$
[0,\tau_\epsilon].
$$

This proposition closes the inner half of the seed-propagation program at the regime level: once the seed neighborhood is shrunk far enough that its collapse phase lands uniformly in the Goldilocks crossing window, the local post-crossing recapture mechanism becomes available without any additional pointwise tuning.

> **Proposition (Seed-neighborhood realization of the unified outer-turn regime).**
> Let
> $$
> \mathcal{C}^{\mathrm{seed,out}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,in}}_{x_\ast,\eta}
> $$
> be a nonempty subclass such that the post-crossing recapture, return-half, and outer-branch delayed-geometry estimates developed later in the note hold uniformly on the corresponding trajectories. Assume in particular that for every
> $$
> \psi\in \mathcal{C}^{\mathrm{seed,out}}_{x_\ast,\eta}
> $$
> there is a trimmed apocenter window
> $$
> I_{\mathrm{deep}}(\psi)=[t_a(\psi)+\tau_{\mathrm{deep}},\,t_b(\psi)]
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
> z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
> -
> \frac{a_{z}^{\mathrm{out}}}{2}
> \big(t_a+\tau_{\mathrm{deep}}-t_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
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
> \mathcal{C}^{\mathrm{seed,out}}_{x_\ast,\eta}
> $$
> satisfies the outer-turn recapture mechanism uniformly: the trimmed-apocenter acceleration obeys
> $$
> \ddot x(t)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
> \qquad
> \text{for }t\in I_{\mathrm{deep}}(\psi),
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
\mathcal{C}^{\mathrm{seed,out}}_{x_\ast,\eta}.
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
  \ddot x(t)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
  $$
  on
  $$
  I_{\mathrm{deep}}(\psi).
  $$

The final turning claim is then exactly the conclusion of the unified trimmed-apocenter criterion once the window length dominates
$$
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}}.
$$

This proposition closes the outer half of the seed-propagation program at the regime level: once the seed neighborhood is small enough that the outer delayed geometry and trimmed-apocenter bounds are uniform, the outer-turn mechanism becomes class-uniform with no further history-by-history tuning.

> **Proposition (Returned-history reentry from uniform seed-cycle bounds).**
> Let
> $$
> \mathcal{C}^{\mathrm{seed,ret}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,out}}_{x_\ast,\eta}
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
> X_{\max}\ge \max\{x_\ast,X_{\mathrm{out},\max}^{\mathrm{seed}}\},
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
> P_\eta(\psi)\in \mathcal{C}_{x_\ast,\eta}
> \qquad
> \text{for every }
> \psi\in \mathcal{C}^{\mathrm{seed,ret}}_{x_\ast,\eta}.
> $$
> If, in addition, the same stored-history Jacobian, root-count, and local continuation bounds that define the seed-side propagation class persist on the returned segment, then after shrinking once more if necessary there exists a nonempty forward-propagation subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}^{\mathrm{seed,ret}}_{x_\ast,\eta}
> $$
> such that
> $$
> P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
> \subseteq
> \mathcal{C}_{x_\ast,\eta}.
> $$

Proof sketch.
Items 1-3 provide the full dynamical cycle structure:

- finite-time first crossing with controlled speed,
- class-uniform inner turnaround after the first crossing,
- class-uniform outer turnaround on the trimmed apocenter window.

Item 4 then supplies the section-return consequences from the return-half layer:
$$
0\le x(t;\psi)\le X_{\mathrm{out},\max}^{\mathrm{seed}},
\qquad
|\dot x(t;\psi)|\le U_{\mathrm{sec},\max}^{\mathrm{seed}},
\qquad
|\ddot x(t;\psi)|\le A_{\mathrm{cyc},\max}^{\mathrm{seed}},
$$
through the full cycle and up to the first inbound section return, together with the time bound
$$
T(\psi)\le T_{\mathrm{cyc},\max}^{\mathrm{seed}}.
$$
The displayed envelope inequalities therefore imply that the returned history segment fits inside the convex envelope
$$
\mathcal{C}_{x_\ast,\eta}.
$$
Hence
$$
P_\eta(\psi)\in \mathcal{C}_{x_\ast,\eta}
$$
for every
$$
\psi\in \mathcal{C}^{\mathrm{seed,ret}}_{x_\ast,\eta}.
$$

If the returned segment also preserves the same stored-history root simplicity, Jacobian lower bounds, and local continuation control that defined the seed-side propagation class, then one may shrink the class once more to a nonempty subclass
$$
\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
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
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}
> $$
> such that:
> 1. the return map
>    $$
>    P_\eta
>    $$
>    is well defined on
>    $$
>    \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta};
>    $$
> 2. the collapse-to-crossing, inner-recapture, outer-turn, and return-half bounds all apply uniformly on this class;
> 3. the returned histories satisfy
>    $$
>    P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
>    \subseteq
>    \mathcal{C}_{x_\ast,\eta};
>    $$
> 4. and the invariant-envelope theorem is therefore nonvacuous on a genuine delayed history class.
>
> In particular, once the sampled certificate, coupled strict-slack inequalities, returned-sample preservation, continuity, and precompactness are verified on this same class, the Schauder route applies on a nonempty self-map domain.

Proof sketch.
The seed proposition and its neighborhood corollary provide a nonempty section-side class
$$
\mathcal{C}^{\mathrm{seed}}_{x_\ast,\eta}
\neq
\varnothing.
$$
The local seed-neighborhood continuation proposition then produces a smaller nonempty subclass
$$
\mathcal{C}^{\mathrm{seed,loc}}_{x_\ast,\eta}
$$
on which the stored delayed geometry is simple and the forward flow is locally well defined. The collapse-control proposition shrinks again to a nonempty class
$$
\mathcal{C}^{\mathrm{seed,coll}}_{x_\ast,\eta}
$$
on which the collapse-to-crossing theorem applies uniformly.

The inner-regime proposition next yields a nonempty subclass
$$
\mathcal{C}^{\mathrm{seed,in}}_{x_\ast,\eta}
$$
whose first crossings lie uniformly in the explicit short-window recapture regime. The outer-regime proposition then yields a further nonempty subclass
$$
\mathcal{C}^{\mathrm{seed,out}}_{x_\ast,\eta}
$$
on which the trimmed-apocenter outer-turn mechanism applies uniformly. Finally, the returned-history reentry proposition produces a nonempty subclass
$$
\mathcal{C}^{\mathrm{seed,ret}}_{x_\ast,\eta}
$$
whose full-cycle images lie back in
$$
\mathcal{C}_{x_\ast,\eta}.
$$

Choose
$$
\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
$$
to be any nonempty forward-propagation subclass supplied by the last proposition. By construction, all cycle estimates invoked in the invariant-envelope synthesis hold uniformly on this class, and the return map is well defined there. The inclusion
$$
P_\eta\!\big(\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}\big)
\subseteq
\mathcal{C}_{x_\ast,\eta}
$$
is exactly the conclusion of the returned-history reentry step. Hence the invariant-envelope theorem is nonvacuous on a genuine delayed history class.

This theorem closes the seed-side nonvacuity gap in the global existence program. The note now contains:

- an explicit nonempty section-side seed,
- a propagation ladder from that seed to a nonempty tame class,
- explicit inner and outer recapture regimes,
- invariant-envelope closure on a certified closed convex history set, conditional on the sampled certificate and coupled strict-slack arithmetic,
- and the previously stated precompactness, continuity, and Schauder route.

The remaining work is therefore no longer to construct a nonempty delayed class. It is to verify the sampled tame-envelope certificate, verify the factorized coupled-corridor inequalities, and derive returned-sample budgets with strict sample slack, either through residual-plus-sensitivity control or direct boundary trapping, on that same class.

#### Collapse-to-crossing target

The next concrete theorem should attack Step 1 of the cycle ladder directly. Its role is to connect tame inbound section data to the already-audited local post-crossing recapture theorem.

> **Target Theorem (Collapse-to-Crossing Control).**
> Fix a dual-mollified tame inbound subclass
> $$
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}.
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
> \psi\in\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> $$
> satisfies, on its inbound pre-crossing leg:
> 1. **finite-time crossing:**
>    there exists a first time
>    $$
>    t_{\mathrm{cross}}(\psi)\in(0,\tau_{\mathrm{cross},\max}]
>    $$
>    with
>    $$
>    x(t_{\mathrm{cross}}(\psi);\psi)=0;
>    $$
> 2. **crossing-speed window:**
>    the signed crossing speed obeys
>    $$
>    -V_{\max}\le \dot x(t_{\mathrm{cross}}(\psi);\psi)\le -V_{\min}<-c_f;
>    $$
> 3. **tube preservation before crossing:**
>    $$
>    0\le x(t;\psi)\le X_{\max},
>    \qquad
>    |\dot x(t;\psi)|\le U_{\max},
>    \qquad
>    |\ddot x(t;\psi)|\le A_{\max}
>    $$
>    for
>    $$
>    0\le t\le t_{\mathrm{cross}}(\psi);
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

#### Collapse-to-crossing lemma ladder

The intended proof order for the collapse phase is:

1. **Inbound partner-dominance lemma.**
   Produce a class-uniform lower bound on inward partner acceleration on the pre-crossing leg.
2. **Finite-time crossing lemma.**
   Use the inward acceleration and inbound section sign to show that
   $$
   x(t)
   $$
   reaches zero in bounded time.
3. **Crossing-speed bounds.**
   Estimate the speed gain accumulated before the crossing and show the resulting crossing speed lies inside
   $$
   [V_{\min},V_{\max}].
   $$
4. **Pre-crossing tube preservation.**
   Verify that position, speed, and acceleration remain inside the tame envelope up to
   $$
   t_{\mathrm{cross}}.
   $$
5. **Crossing-history admissibility.**
   Show that the translated history at
   $$
   t_{\mathrm{cross}}
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
  0\le x(t)\le X_{\max},
  \qquad
  \dot x(t)\le 0,
  $$
- at least one inward exterior active partner branch for each
  $$
  t\in[0,t_{\mathrm{cross}}],
  $$
  with
  $$
  x(t)+x(t_p)>0,
  \qquad
  0\le x(t_p)\le X_{\max},
  $$
- the speed bound
  $$
  |\dot x(t)|\le U_{\max},
  $$
- and the partner Jacobian transversality bound
  $$
  |J_p(t;t_p)|\ge \nu
  $$
  on every active partner root.

Then the partner contribution to the inward acceleration obeys the class-uniform lower bound
$$
A_p(t)\ge \underline A_p^{\mathrm{in}}
\equiv
\frac{\kappa\epsilon^2}{
\left(4X_{\max}^2+\epsilon_c^2\right)
\left(1+\frac{U_{\max}}{c_f}\right)
}.
$$
Equivalently, the partner acceleration satisfies
$$
a_p(t)=-A_p(t)\le -\underline A_p^{\mathrm{in}}<0.
$$

Proof.
Along the retained inward exterior partner channel, the delayed source remains on the opposite side of the current right-hand particle, so each retained partner contribution points inward and has the form
$$
a_p(t)=-A_p(t).
$$
For any retained active partner root
$$
t_p<t,
$$
the delayed separation is
$$
r_p(t;t_p)=x(t)+x(t_p).
$$
Because both the current and delayed positions lie in the tame position envelope,
$$
0\le x(t)\le X_{\max},
\qquad
0\le x(t_p)\le X_{\max},
$$
one has
$$
r_p(t;t_p)\le 2X_{\max}.
$$
Hence the dual-mollified amplitude denominator satisfies
$$
r_p(t;t_p)^2+\epsilon_c^2\le 4X_{\max}^2+\epsilon_c^2.
$$

On the same branch the 1D partner line-of-action sign is
$$
\hat r_p=+1,
$$
so
$$
J_p(t;t_p)=1+\frac{\dot x(t_p)}{c_f}.
$$
Using the speed bound gives the crude upper estimate
$$
|J_p(t;t_p)|\le 1+\frac{U_{\max}}{c_f}.
$$

Therefore each retained active partner branch contributes at least
$$
\kappa\epsilon^2
\frac{1}{
\left(r_p(t;t_p)^2+\epsilon_c^2\right)|J_p(t;t_p)|
}
\ge
\frac{\kappa\epsilon^2}{
\left(4X_{\max}^2+\epsilon_c^2\right)
\left(1+\frac{U_{\max}}{c_f}\right)
}.
$$
Since at least one inward exterior partner branch is active, summing over the retained active partner roots yields
$$
A_p(t)\ge \underline A_p^{\mathrm{in}},
$$
which proves the lemma.

**Lemma 6: Finite-time crossing under a net inward acceleration floor.**
Assume the pre-crossing leg starts from the inbound section
$$
x(0)=x_\ast>0,
\qquad
\dot x(0)\le 0,
$$
and suppose there exists a constant
$$
a_{\mathrm{in}}>0
$$
such that the full pre-crossing acceleration obeys
$$
\ddot x(t)\le -a_{\mathrm{in}}
\qquad
\text{for }0\le t\le t_{\mathrm{cross}}.
$$
Then the trajectory reaches the origin in finite time, with
$$
t_{\mathrm{cross}}
\le
\sqrt{\frac{2x_\ast}{a_{\mathrm{in}}}}.
$$

In particular, a sufficient realization is
$$
A_s^{\mathrm{in}}(t)-A_s^{\mathrm{out}}(t)
\le
\theta\,\underline A_p^{\mathrm{in}}
\qquad
\text{for }0\le t\le t_{\mathrm{cross}},
$$
for some
$$
0\le \theta<1,
$$
since then
$$
\ddot x(t)
=
-A_p(t)-A_s^{\mathrm{out}}(t)+A_s^{\mathrm{in}}(t)
\le
-(1-\theta)\underline A_p^{\mathrm{in}}
\equiv
-a_{\mathrm{in}}.
$$

Proof.
Integrating the acceleration bound once gives
$$
\dot x(t)
\le
\dot x(0)-a_{\mathrm{in}}t
\le
-a_{\mathrm{in}}t,
$$
because
$$
\dot x(0)\le 0.
$$
Integrating again from
$$
x(0)=x_\ast
$$
yields
$$
x(t)
\le
x_\ast+\dot x(0)t-\frac{a_{\mathrm{in}}}{2}t^2
\le
x_\ast-\frac{a_{\mathrm{in}}}{2}t^2.
$$
Therefore
$$
x(t)\le 0
$$
whenever
$$
t\ge \sqrt{\frac{2x_\ast}{a_{\mathrm{in}}}}.
$$
By continuity of the trajectory, there is a first crossing time
$$
t_{\mathrm{cross}}\in
\left(0,\sqrt{\frac{2x_\ast}{a_{\mathrm{in}}}}\right]
$$
such that
$$
x(t_{\mathrm{cross}})=0.
$$
This proves the lemma.

**Lemma 7: Crossing-speed bounds under two-sided acceleration control.**
Assume the pre-crossing leg starts from
$$
x(0)=x_\ast>0,
\qquad
\dot x(0)=-u_0,
\qquad
u_0\ge 0,
$$
and suppose there exist positive constants
$$
0<a_-\le a_+
$$
such that
$$
-a_+\le \ddot x(t)\le -a_-
\qquad
\text{for }0\le t\le t_{\mathrm{cross}}.
$$
Define the quadratic comparison roots
$$
\tau_\pm
\equiv
\frac{\sqrt{u_0^2+2a_\pm x_\ast}-u_0}{a_\pm}.
$$
Then the crossing time satisfies
$$
\tau_+\le t_{\mathrm{cross}}\le \tau_-,
$$
and the crossing speed obeys
$$
u_0+a_-\tau_+
\le
-\dot x(t_{\mathrm{cross}})
\le
u_0+a_+\tau_-.
$$

In particular, if the class constants satisfy
$$
V_{\min}\le u_0+a_-\tau_+,
\qquad
u_0+a_+\tau_-\le V_{\max},
$$
then the crossing lands in the Goldilocks speed window
$$
V_{\min}\le -\dot x(t_{\mathrm{cross}})\le V_{\max}.
$$

Proof.
Integrating the two-sided acceleration bound gives
$$
-u_0-a_+t
\le
\dot x(t)
\le
-u_0-a_-t.
$$
Integrating again yields the quadratic comparison bounds
$$
x_\ast-u_0 t-\frac{a_+}{2}t^2
\le
x(t)
\le
x_\ast-u_0 t-\frac{a_-}{2}t^2.
$$

Let
$$
q_\pm(t)\equiv x_\ast-u_0 t-\frac{a_\pm}{2}t^2.
$$
Each $q_\pm$ has a unique positive root, namely
$$
\tau_\pm
=
\frac{\sqrt{u_0^2+2a_\pm x_\ast}-u_0}{a_\pm}.
$$
Because
$$
x(t)\le q_-(t),
$$
the crossing must occur no later than the first time the upper comparison reaches zero:
$$
t_{\mathrm{cross}}\le \tau_-.
$$
Likewise,
$$
x(t)\ge q_+(t),
$$
so the trajectory cannot cross before the lower comparison reaches zero:
$$
t_{\mathrm{cross}}\ge \tau_+.
$$
Hence
$$
\tau_+\le t_{\mathrm{cross}}\le \tau_-.
$$

Evaluating the velocity bounds at the crossing time gives
$$
-\dot x(t_{\mathrm{cross}})
\ge
u_0+a_- t_{\mathrm{cross}}
\ge
u_0+a_-\tau_+,
$$
and
$$
-\dot x(t_{\mathrm{cross}})
\le
u_0+a_+ t_{\mathrm{cross}}
\le
u_0+a_+\tau_-.
$$
This proves the claimed crossing-speed bracket.

**Lemma 8: Pre-crossing tube preservation from monotonicity and bounded acceleration.**
Assume the pre-crossing leg starts from the inbound section
$$
x(0)=x_\ast,
\qquad
\dot x(0)=-u_0,
\qquad
0\le u_0\le U_{\mathrm{in}},
$$
with
$$
0<x_\ast\le X_{\max}.
$$
Assume moreover that on
$$
[0,t_{\mathrm{cross}}],
$$
the trajectory satisfies:

- inward monotonicity,
  $$
  \dot x(t)\le 0,
  $$
- bounded crossing time,
  $$
  t_{\mathrm{cross}}\le \tau_{\mathrm{cross},\max},
  $$
- and a uniform acceleration bound,
  $$
  |\ddot x(t)|\le A_{\max}.
  $$

If
$$
U_{\mathrm{in}}+A_{\max}\tau_{\mathrm{cross},\max}\le U_{\max},
$$
then the full pre-crossing tube bounds hold:
$$
0\le x(t)\le X_{\max},
\qquad
|\dot x(t)|\le U_{\max},
\qquad
|\ddot x(t)|\le A_{\max}
\qquad
\text{for }0\le t\le t_{\mathrm{cross}}.
$$

Proof.
Because
$$
\dot x(t)\le 0
\qquad
\text{for }0\le t\le t_{\mathrm{cross}},
$$
the position is nonincreasing on the pre-crossing leg. Since the first crossing occurs at
$$
x(t_{\mathrm{cross}})=0,
$$
one has
$$
0\le x(t)\le x(0)=x_\ast\le X_{\max}
\qquad
\text{for }0\le t\le t_{\mathrm{cross}}.
$$

For the velocity, the acceleration bound gives
$$
|\dot x(t)-\dot x(0)|
\le
\int_0^t |\ddot x(s)|\,ds
\le
A_{\max} t
\le
A_{\max}\tau_{\mathrm{cross},\max}.
$$
Therefore
$$
|\dot x(t)|
\le
|\dot x(0)|+A_{\max}\tau_{\mathrm{cross},\max}
\le
U_{\mathrm{in}}+A_{\max}\tau_{\mathrm{cross},\max}
\le
U_{\max}.
$$
The acceleration bound is already part of the hypotheses, so the full tube estimate follows.

This lemma does not by itself control Jacobian transversality or branch-count growth. It isolates the easier kinematic part of tube preservation: once monotone inbound motion, bounded crossing time, and bounded acceleration are known, the position-speed tube closes automatically up to the crossing.

**Lemma 9: Crossing-history admissibility.**
Let
$$
\psi\in \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
$$
be an inbound history for which the pre-crossing leg satisfies Lemmas 6-8. Let
$$
t_{\mathrm{cross}}=t_{\mathrm{cross}}(\psi)
$$
denote the first crossing time and define the translated crossing history
$$
\phi_{\mathrm{cross}}(\theta)
\equiv
x(t_{\mathrm{cross}}+\theta;\psi),
\qquad
\theta\in[-h,0].
$$
Assume, in addition, that the pre-crossing collapse provides:

- a crossing-speed window
  $$
  V_{\min}\le -\dot x(t_{\mathrm{cross}})\le V_{\max},
  \qquad
  V_{\min}>c_f,
  $$
- a stored-past sorting-map geometry with class-uniform data
  $$
  t_{\mathrm{zero}}<t_{\mathrm{hinge}}<0,
  \qquad
  \delta_w(\phi_{\mathrm{cross}};\gamma_w)\ge \delta_{w,\min},
  $$
- sub-field-speed source transversality on the pre-hinge portion of the translated history,
  $$
  \dot\phi_{\mathrm{cross}}(\theta)\ge -c_f+\nu
  \qquad
  \text{for }\theta\in[-h,t_{\mathrm{zero}}],
  $$
- and the same class-uniform acceleration and root-count bounds used in the definition of
  $$
  \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}.
  $$

If
$$
\eta<\frac{\delta_{w,\min}}{2},
\qquad
h\ge \frac{2X_{\max}}{c_f},
$$
then
$$
\phi_{\mathrm{cross}}\in \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}.
$$

In particular, the local origin-crossing recapture theorem applies to the translated crossing history.

Proof.
By construction of the translated segment,
$$
\phi_{\mathrm{cross}}(0)=x(t_{\mathrm{cross}})=0.
$$
The crossing-speed hypothesis gives
$$
\dot\phi_{\mathrm{cross}}(0)=\dot x(t_{\mathrm{cross}})
\in[-V_{\max},-V_{\min}],
$$
with
$$
V_{\min}>c_f,
$$
which is exactly the origin-crossing speed requirement of the admissible crossing subclass.

The stored-past sorting-map assumptions are likewise phrased directly on the translated history
$$
\phi_{\mathrm{cross}}.
$$
They therefore supply the required times
$$
t_{\mathrm{zero}}<t_{\mathrm{hinge}}<0,
$$
the interior compact-subinterval gap
$$
\delta_w(\phi_{\mathrm{cross}};\gamma_w)\ge \delta_{w,\min},
$$
and the sub-field-speed source transversality bound
$$
\dot\phi_{\mathrm{cross}}(\theta)\ge -c_f+\nu
\qquad
\text{for }\theta\in[-h,t_{\mathrm{zero}}].
$$
Because
$$
\eta<\frac{\delta_{w,\min}}{2},
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
\phi_{\mathrm{cross}},
$$
which proves the lemma.

This lemma isolates the exact last handoff in the proof architecture. The collapse phase does not itself prove local recapture; it only has to deliver the trajectory into the admissible crossing subclass where the already-established post-crossing theorem takes over.

#### Pre-crossing caustic-transit target

The collapse-to-crossing ladder now has its kinematic part in place. The remaining hard issue is delayed geometry, but it must be framed correctly. Because the inbound speed rises from a sub-field-speed regime to a crossing speed strictly larger than $c_f$, the trajectory must pass through the hinge
$$
\dot x=-c_f.
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
> \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
> \subseteq
> \mathcal{C}_{x_\ast,\eta}.
> $$
> Assume the pre-crossing leg from every
> $$
> \psi\in\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}
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
>    \dot x=-c_f,
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

#### Pre-crossing propagation ladder

The intended proof order for this delayed-geometry step is:

1. **Partner-root safety lemma.**
   Show that the active partner branch persists continuously along the inbound leg and never reaches a caustic before the crossing.
2. **Hinge-birth lemma.**
   Prove that exactly one principal self root is born when the trajectory passes through
   $$
   \dot x=-c_f.
   $$
3. **Caustic-transit impulse bound.**
   Show that the dual-mollified self-root birth contributes only a bounded inward velocity kick
   $$
   \Delta V_{\mathrm{cau}}\le \Delta V_{\mathrm{cau},\max},
   $$
   and therefore does not destroy the Goldilocks crossing-speed upper bound.
4. **Root-count bound.**
   Show that the total number of active branches on the inbound leg remains bounded by class constants
   $$
   N_{p,\max},\quad N_{s,\max}.
   $$
5. **Sorting-gap inheritance and Jacobian recovery.**
   Prove that by the time of the origin crossing the active self root has moved far enough into the sub-field-speed past that
   $$
   |J_s|\ge \nu_s,
   $$
   and the translated crossing history inherits the compact-subinterval sorting gap needed by the local post-crossing theorem.

The first item is a partner-branch regularity statement. The second and third items explicitly embrace the self-root caustic instead of assuming it away. The fifth is the exact handoff needed to pass from the inbound collapse theorem to the local origin-crossing recapture theorem.

**Lemma 10: Partner-root safety on the inbound leg.**
Assume the pre-crossing leg satisfies:

- right exterior inbound geometry
  $$
  x(t)\ge 0,
  \qquad
  \dot x(t)\le 0,
  $$
- a unique hinge time
  $$
  t_{\mathrm{hinge}}\in(0,t_{\mathrm{cross}})
  $$
  with
  $$
  \dot x(t_{\mathrm{hinge}})=-c_f,
  $$
- and strict post-hinge super-field-speed infall
  $$
  \dot x(t)<-c_f
  \qquad
  \text{for }t\in(t_{\mathrm{hinge}},t_{\mathrm{cross}}].
  $$

Define
$$
w(t)\equiv x(t)+c_f t,
\qquad
y(t)\equiv c_f t-x(t).
$$
Then the active partner root on the inbound leg is selected by
$$
w(t_p)=y(t),
\qquad
t_p<t.
$$
Moreover:

1. the partner branch persists continuously on
   $$
   [0,t_{\mathrm{cross}}],
   $$
2. it remains strictly on the ascending side of the sorting map,
   $$
   t_p(t)<t_{\mathrm{hinge}},
   $$
3. and therefore the partner Jacobian stays strictly positive:
   $$
   J_p(t;t_p)=\frac{\dot w(t_p)}{c_f}>0.
   $$

Proof.
On the inbound leg,
$$
\dot y(t)=c_f-\dot x(t)\ge c_f>0,
$$
so $y(t)$ is strictly increasing. Also,
$$
\dot w(t)=\dot x(t)+c_f,
$$
which is positive before the hinge, zero at the hinge, and negative after the hinge. Hence
$$
w(t)
$$
has a strict maximum at
$$
t=t_{\mathrm{hinge}}.
$$

It therefore suffices to show that
$$
y(t)<w(t_{\mathrm{hinge}})
\qquad
\text{for every }t\in[0,t_{\mathrm{cross}}].
$$
Since $y$ is increasing, it is enough to check this at the crossing time. Using
$$
x(t_{\mathrm{cross}})=0
$$
gives
$$
y(t_{\mathrm{cross}})=c_f t_{\mathrm{cross}}.
$$
On the other hand,
$$
w(t_{\mathrm{hinge}})=x(t_{\mathrm{hinge}})+c_f t_{\mathrm{hinge}}.
$$
By the mean value theorem and the strict post-hinge inequality
$$
\dot x<-c_f
\qquad
\text{on }(t_{\mathrm{hinge}},t_{\mathrm{cross}}],
$$
one has
$$
x(t_{\mathrm{cross}})-x(t_{\mathrm{hinge}})
<
-c_f\,(t_{\mathrm{cross}}-t_{\mathrm{hinge}}).
$$
Since
$$
x(t_{\mathrm{cross}})=0,
$$
this rearranges to
$$
x(t_{\mathrm{hinge}})
>
c_f\,(t_{\mathrm{cross}}-t_{\mathrm{hinge}}),
$$
hence
$$
w(t_{\mathrm{hinge}})
=
x(t_{\mathrm{hinge}})+c_f t_{\mathrm{hinge}}
>
c_f t_{\mathrm{cross}}
=
y(t_{\mathrm{cross}}).
$$
Therefore
$$
y(t)<w(t_{\mathrm{hinge}})
$$
for all pre-crossing times, so the partner branch never reaches the hinge maximum.

Because
$$
w
$$
is strictly increasing on the ascending side, there is a unique solution
$$
t_p(t)<t_{\mathrm{hinge}}
$$
to
$$
w(t_p)=y(t)
$$
for each
$$
t\in[0,t_{\mathrm{cross}}].
$$
This gives continuous persistence of the partner branch. Finally, on that ascending side,
$$
\dot w(t_p)>0,
$$
so
$$
J_p(t;t_p)=\frac{\dot w(t_p)}{c_f}>0.
$$
Thus the partner branch remains safe from the caustic throughout the infall.

**Lemma 11: Hinge birth and uniqueness of the principal self root.**
Assume the pre-crossing leg satisfies a strict inward acceleration floor
$$
\ddot x(t)\le -a_-<0
\qquad
\text{for }0\le t\le t_{\mathrm{cross}},
$$
and define
$$
w(t)\equiv x(t)+c_f t.
$$
Let
$$
t_{\mathrm{hinge}}
$$
be the unique time at which
$$
\dot x(t_{\mathrm{hinge}})=-c_f.
$$
Then:

1. $w$ is strictly concave on the pre-crossing interval,
2. $w$ has a unique global maximum at
   $$
   t=t_{\mathrm{hinge}},
   $$
3. for each
   $$
   t\in(t_{\mathrm{hinge}},t_{\mathrm{cross}}],
   $$
   there exists a unique self root
   $$
   t_s(t)<t_{\mathrm{hinge}}
   $$
   satisfying
   $$
   w(t_s)=w(t),
   $$
4. and this self branch is born at the hinge with
   $$
   \lim_{t\downarrow t_{\mathrm{hinge}}} t_s(t)=t_{\mathrm{hinge}},
   \qquad
   J_s(t;t_s)\to 0^+.
   $$

Proof.
Differentiate twice:
$$
\dot w(t)=\dot x(t)+c_f,
\qquad
\ddot w(t)=\ddot x(t).
$$
By hypothesis,
$$
\ddot w(t)\le -a_-<0,
$$
so
$$
w
$$
is strictly concave on the full pre-crossing interval. Hence
$$
\dot w
$$
is strictly decreasing and can vanish at most once. Since
$$
\dot w(t_{\mathrm{hinge}})=\dot x(t_{\mathrm{hinge}})+c_f=0,
$$
the hinge is the unique critical point of
$$
w,
$$
and therefore its unique global maximum.

For
$$
t<t_{\mathrm{hinge}},
$$
the function
$$
w
$$
is strictly increasing, so no earlier time can satisfy
$$
w(t_s)=w(t)
$$
with
$$
t_s<t.
$$
For
$$
t>t_{\mathrm{hinge}},
$$
strict concavity implies that
$$
w(t)<w(t_{\mathrm{hinge}}),
$$
and because the ascending branch is strictly increasing up to the hinge, there is a unique
$$
t_s(t)<t_{\mathrm{hinge}}
$$
such that
$$
w(t_s)=w(t).
$$
This is the unique principal self root on the pre-crossing leg.

As
$$
t\downarrow t_{\mathrm{hinge}},
$$
continuity and uniqueness force
$$
t_s(t)\uparrow t_{\mathrm{hinge}}.
$$
On the relevant outer-memory branch,
$$
J_s(t;t_s)=1+\frac{\dot x(t_s)}{c_f}=\frac{\dot w(t_s)}{c_f}.
$$
Since
$$
t_s(t)<t_{\mathrm{hinge}}
$$
lies on the ascending side,
$$
\dot w(t_s)>0,
$$
so
$$
J_s(t;t_s)>0.
$$
But as
$$
t_s(t)\uparrow t_{\mathrm{hinge}},
$$
one has
$$
\dot w(t_s)\downarrow \dot w(t_{\mathrm{hinge}})=0,
$$
hence
$$
J_s(t;t_s)\to 0^+.
$$
So the self branch is born exactly at the hinge and is unique.

**Lemma 12: Bounded caustic-transit impulse in the dual-mollified model.**
Fix a hinge-centered time window
$$
I_{\mathrm{cau}}
\equiv
[t_{\mathrm{hinge}}-\tau_{\mathrm{cau}},\,t_{\mathrm{hinge}}+\tau_{\mathrm{cau}}]
$$
on which the dual-mollified self interaction is evaluated through the regularized time-integral representation with:

- shell mollifier
  $$
  \delta_\eta
  $$
  bounded by
  $$
  \|\delta_\eta\|_\infty<\infty,
  $$
- core mollifier
  $$
  \epsilon_c>0,
  $$
- and memory horizon
  $$
  h>0.
  $$

Assume the self integral on this window is taken only over the stored history
$$
t_0\in[t-h,t].
$$
Then the total inward velocity kick contributed by the self branch across the hinge window is finite and obeys the crude bound
$$
\Delta V_{\mathrm{cau}}
\le
\frac{2\kappa\epsilon^2\,h\,\tau_{\mathrm{cau}}\|\delta_\eta\|_\infty}{\epsilon_c^2}
\equiv
\Delta V_{\mathrm{cau},\max}.
$$

In particular, the self-root birth at
$$
J_s=0
$$
does not produce an infinite velocity jump in the dual-mollified model.

Proof.
On the hinge window, evaluate the self contribution in the regularized integral form rather than the branch-sum form. By construction of the dual mollification, the self acceleration satisfies the absolute bound
$$
|a_s(t)|
\le
\kappa\epsilon^2
\int_{t-h}^{t}
\frac{\delta_\eta(\cdots)}{|x(t)-x(t_0)|^2+\epsilon_c^2}\,dt_0.
$$
Because
$$
|x(t)-x(t_0)|^2+\epsilon_c^2\ge \epsilon_c^2
$$
and
$$
\delta_\eta(\cdots)\le \|\delta_\eta\|_\infty,
$$
one obtains
$$
|a_s(t)|
\le
\kappa\epsilon^2
\int_{t-h}^{t}
\frac{\|\delta_\eta\|_\infty}{\epsilon_c^2}\,dt_0
=
\frac{\kappa\epsilon^2\,h\,\|\delta_\eta\|_\infty}{\epsilon_c^2}.
$$
Integrating over the hinge window gives
$$
\Delta V_{\mathrm{cau}}
\le
\int_{I_{\mathrm{cau}}}|a_s(t)|\,dt
\le
\frac{\kappa\epsilon^2\,h\,\|\delta_\eta\|_\infty}{\epsilon_c^2}
\cdot
|I_{\mathrm{cau}}|.
$$
Since
$$
|I_{\mathrm{cau}}|=2\tau_{\mathrm{cau}},
$$
this yields
$$
\Delta V_{\mathrm{cau}}
\le
\frac{2\kappa\epsilon^2\,h\,\tau_{\mathrm{cau}}\|\delta_\eta\|_\infty}{\epsilon_c^2}
\equiv
\Delta V_{\mathrm{cau},\max}.
$$
Thus the caustic transit contributes a finite inward impulse in the dual-mollified model.

**Lemma 13: Post-hinge Jacobian recovery and sorting-gap inheritance.**
Assume the pre-crossing leg satisfies Lemmas 10-12, and let
$$
t_{\mathrm{cross}}
$$
denote the first origin crossing. Define
$$
w(t)\equiv x(t)+c_f t
$$
on the unshifted inbound leg, and let
$$
t_{\mathrm{zero}}<t_{\mathrm{hinge}}
$$
be the unique time satisfying
$$
w(t_{\mathrm{zero}})=w(t_{\mathrm{cross}}).
$$
Assume moreover that on the ascending side of the sorting map one has the lower derivative bound
$$
\dot w(t)\ge \nu_s>0
\qquad
\text{for }t\in[t_{\mathrm{zero}},t_{\mathrm{hinge}}-\gamma_w],
$$
for some
$$
\gamma_w>0.
$$
Then:

1. the active self root at the crossing is exactly
   $$
   t_s(t_{\mathrm{cross}})=t_{\mathrm{zero}},
   $$
2. the recovered self Jacobian at the crossing satisfies
   $$
   J_s(t_{\mathrm{cross}};t_{\mathrm{zero}})
   =
   \frac{\dot w(t_{\mathrm{zero}})}{c_f}
   \ge
   \frac{\nu_s}{c_f},
   $$
3. and the translated crossing history
   $$
   \phi_{\mathrm{cross}}(\theta)=x(t_{\mathrm{cross}}+\theta)
   $$
   inherits a compact-subinterval sorting gap:
   for every
   $$
   0<\gamma<\min\{t_{\mathrm{hinge}}-t_{\mathrm{zero}},-t_{\mathrm{hinge}}\},
   $$
   the translated sorting function
   $$
   \widetilde w(\theta)
   \equiv
   \phi_{\mathrm{cross}}(\theta)+c_f\theta
   =
   w(t_{\mathrm{cross}}+\theta)-w(t_{\mathrm{cross}})
   $$
   satisfies
   $$
   \widetilde w(\theta)>0
   \qquad
   \text{for }\theta\in(t_{\mathrm{zero}}-t_{\mathrm{cross}},0),
   $$
   and therefore
   $$
   \delta_w(\phi_{\mathrm{cross}};\gamma)>0.
   $$

Proof.
By Lemma 11, for each
$$
t\in(t_{\mathrm{hinge}},t_{\mathrm{cross}}],
$$
there exists a unique principal self root
$$
t_s(t)<t_{\mathrm{hinge}}
$$
such that
$$
w(t_s)=w(t).
$$
Evaluating this at the crossing time and using the defining property of
$$
t_{\mathrm{zero}}
$$
shows
$$
t_s(t_{\mathrm{cross}})=t_{\mathrm{zero}}.
$$

On the relevant outer-memory branch,
$$
J_s(t_{\mathrm{cross}};t_{\mathrm{zero}})
=
1+\frac{\dot x(t_{\mathrm{zero}})}{c_f}
=
\frac{\dot w(t_{\mathrm{zero}})}{c_f}.
$$
The assumed lower derivative bound on the ascending side therefore yields
$$
J_s(t_{\mathrm{cross}};t_{\mathrm{zero}})
\ge
\frac{\nu_s}{c_f}>0,
$$
which is the desired post-hinge Jacobian recovery.

For the sorting-gap inheritance, define
$$
\widetilde w(\theta)=w(t_{\mathrm{cross}}+\theta)-w(t_{\mathrm{cross}}).
$$
Then
$$
\widetilde w(0)=0
$$
and
$$
\widetilde w(t_{\mathrm{zero}}-t_{\mathrm{cross}})=0.
$$
Because
$$
w(t)<w(t_{\mathrm{hinge}})
$$
for all
$$
t\neq t_{\mathrm{hinge}},
$$
and because the level
$$
w(t_{\mathrm{cross}})
$$
intersects the strictly concave graph of
$$
w
$$
exactly at
$$
t_{\mathrm{zero}}
\quad\text{and}\quad
t_{\mathrm{cross}},
$$
it follows that
$$
\widetilde w(\theta)>0
$$
for every
$$
\theta\in(t_{\mathrm{zero}}-t_{\mathrm{cross}},0).
$$
Restricting to any compact subinterval away from the two zeros, continuity yields a positive minimum, which is precisely the required compact-subinterval sorting gap
$$
\delta_w(\phi_{\mathrm{cross}};\gamma)>0.
$$
This proves the lemma.

#### Turn-to-section return target

Once the local post-crossing theorem has produced a turning point, the remaining analytic burden is to close the excursion back to the inbound section. This is the return-half analogue of the collapse-to-crossing theorem.

> **Target Theorem (Turn-to-Section Return).**
> Fix a dual-mollified tame crossing subclass
> $$
> \mathcal{K}^{\mathrm{cross}}_{\eta,\epsilon_c}
> $$
> and suppose the local origin-crossing recapture theorem produces, for every admissible crossing history, a turning time
> $$
> t_{\mathrm{turn}}\le \tau_{\mathrm{env}}
> $$
> with
> $$
> \dot\rho(t_{\mathrm{turn}})=0.
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
>    t_{\mathrm{turn}},
>    $$
>    crosses the center a second time, reaches the reflected section state
>    $$
>    x=x_\ast,
>    \qquad
>    \dot x>0,
>    $$
>    on the right exterior branch, and after one further outer turn returns to the section
>    $$
>    x=x_\ast
>    $$
>    as an inbound branch;
> 2. **bounded excursion on the return half:**
>    $$
>    0\le x(t)\le X_{\max}
>    \qquad
>    \text{for }t_{\mathrm{turn}}\le t\le T(\psi);
>    $$
> 3. **bounded speed and acceleration on the return half:**
>    $$
>    |\dot x(t)|\le U_{\max},
>    \qquad
>    |\ddot x(t)|\le A_{\max}
>    \qquad
>    \text{for }t_{\mathrm{turn}}\le t\le T(\psi);
>    $$
> 4. **bounded return time:**
>    the first inbound section return satisfies
>    $$
>    0<T(\psi)-t_{\mathrm{turn}}\le T_{\mathrm{ret},\max};
>    $$
> 5. **bounded inbound section speed:**
>    $$
>    -\dot x(T(\psi))\le U_{\max};
>    $$
> 6. **returned-history control:**
>    the translated segment
>    $$
>    x_{T(\psi)}
>    $$
>    satisfies the same acceleration, Jacobian, and branch-count bounds required by the tame envelope.
>
> Then the post-turn branch closes the full cycle back to the inbound section, and the return map
> $$
> P_\eta
> $$
> is well defined on the corresponding tame class with
> $$
> P_\eta(\psi)\in \mathcal{C}_{x_\ast,\eta}.
> $$

This theorem is the last missing dynamical segment of the cycle. The collapse-to-crossing theorem feeds the local recapture theorem; the turn-to-section return theorem feeds the invariant-envelope and Schauder steps.

#### Turn-to-section return ladder

The intended proof order for the return half is:

1. **Post-turn inward-drive lemma.**
   Show that after the turning time the net delayed force drives the trajectory back toward the origin strongly enough to prevent outward re-escape.
2. **Second-crossing lemma.**
   Prove that the trajectory crosses the origin a second time in finite time after the turn.
3. **Reflected-section lemma.**
   Show that after the second crossing, the trajectory reaches
   $$
   x=x_\ast
   $$
   on the right exterior branch with
   $$
   \dot x>0.
   $$
4. **Outer-turn closure lemma.**
   Show that after one further outer turn on the right branch, the trajectory returns to
   $$
   x=x_\ast
   $$
   again on an inbound branch.
5. **Return-speed bound.**
   Estimate the inbound speed at the section and show
   $$
   -\dot x(T(\psi))\le U_{\max}.
   $$
6. **Returned-history tameness.**
   Prove that the translated return segment inherits the tame acceleration, Jacobian, and branch-count bounds.

The first, fourth, and fifth items are the real analytic bottlenecks on the return half. The middle two are reachability statements once the sign of the post-turn drive is controlled.

**Lemma 14: Post-turn inward-drive lemma.**
Let
$$
t_{\mathrm{turn}}
$$
be a turning time produced by the local origin-crossing recapture theorem, so that
$$
\rho(t_{\mathrm{turn}})=\rho_{\max}>0,
\qquad
\dot\rho(t_{\mathrm{turn}})=0.
$$
Assume there exists a post-turn window
$$
[t_{\mathrm{turn}},\,t_{\mathrm{turn}}+\tau_{\mathrm{ret}}]
$$
and a constant
$$
a_{\mathrm{ret}}>0
$$
such that on that window the radial acceleration satisfies
$$
\ddot\rho(t)\le -a_{\mathrm{ret}}.
$$
Then:

1. the trajectory cannot re-escape outward on that window,
2. the radial speed becomes strictly inward immediately after the turn,
   $$
   \dot\rho(t)\le -a_{\mathrm{ret}}(t-t_{\mathrm{turn}})
   \qquad
   \text{for }t\in[t_{\mathrm{turn}},\,t_{\mathrm{turn}}+\tau_{\mathrm{ret}}],
   $$
3. and the radius decreases monotonically there, with
   $$
   \rho(t)\le
   \rho_{\max}
   -
   \frac{a_{\mathrm{ret}}}{2}(t-t_{\mathrm{turn}})^2.
   $$

In particular, a sufficient realization is
$$
A_p^\rho(t)-A_s^\rho(t)\ge a_{\mathrm{ret}}>0
\qquad
\text{for }t\in[t_{\mathrm{turn}},\,t_{\mathrm{turn}}+\tau_{\mathrm{ret}}],
$$
because then
$$
\ddot\rho(t)\le -a_{\mathrm{ret}}.
$$

Proof.
Integrating the radial acceleration bound from the turning time gives
$$
\dot\rho(t)
=
\dot\rho(t_{\mathrm{turn}})
+
\int_{t_{\mathrm{turn}}}^{t}\ddot\rho(s)\,ds
\le
0-a_{\mathrm{ret}}(t-t_{\mathrm{turn}}),
$$
which proves the velocity estimate and shows that
$$
\dot\rho(t)<0
\qquad
\text{for }t>t_{\mathrm{turn}}.
$$
Thus the trajectory moves strictly inward immediately after the turn and cannot re-escape outward on the stated window.

Integrating once more yields
$$
\rho(t)
=
\rho(t_{\mathrm{turn}})
+
\int_{t_{\mathrm{turn}}}^{t}\dot\rho(s)\,ds
\le
\rho_{\max}
-
\frac{a_{\mathrm{ret}}}{2}(t-t_{\mathrm{turn}})^2,
$$
which proves the monotone decrease of the radius on the post-turn window.

**Lemma 15: Finite-time second crossing after the turn.**
Assume the hypotheses of Lemma 14 and suppose, in addition, that the return window is long enough to satisfy
$$
\tau_{\mathrm{ret}}
\ge
\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}.
$$
Then the trajectory reaches the center again in finite time: there exists
$$
t_{\mathrm{cross}}^{(2)}
\in
\left(
t_{\mathrm{turn}},
\,
t_{\mathrm{turn}}+\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}
\right]
$$
such that
$$
\rho\!\big(t_{\mathrm{cross}}^{(2)}\big)=0.
$$

Equivalently, in signed coordinates the trajectory crosses the origin a second time by that time.

Proof.
Lemma 14 gives the comparison bound
$$
\rho(t)\le
\rho_{\max}
-
\frac{a_{\mathrm{ret}}}{2}(t-t_{\mathrm{turn}})^2
$$
for
$$
t\in[t_{\mathrm{turn}},\,t_{\mathrm{turn}}+\tau_{\mathrm{ret}}].
$$
Therefore
$$
\rho(t)\le 0
$$
whenever
$$
t-t_{\mathrm{turn}}
\ge
\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}.
$$
Because the assumed window length satisfies
$$
\tau_{\mathrm{ret}}
\ge
\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}},
$$
the comparison reaches zero before the end of the return window. Since
$$
\rho(t_{\mathrm{turn}})=\rho_{\max}>0
$$
and
$$
\rho
$$
is continuous, there exists a first time
$$
t_{\mathrm{cross}}^{(2)}
\in
\left(
t_{\mathrm{turn}},
\,
t_{\mathrm{turn}}+\sqrt{\frac{2\rho_{\max}}{a_{\mathrm{ret}}}}
\right]
$$
for which
$$
\rho\!\big(t_{\mathrm{cross}}^{(2)}\big)=0.
$$
This proves the lemma.

**Lemma 16: Return to the reflected section state after the second crossing.**
Assume the hypotheses of Lemma 15 and let
$$
t_{\mathrm{cross}}^{(2)}
$$
denote the second origin crossing. Assume, in addition, that there exists a post-second-crossing window
$$
[t_{\mathrm{cross}}^{(2)},\,t_{\mathrm{cross}}^{(2)}+\tau_{\ast}]
$$
on which:

- the trajectory lies on the right exterior branch,
  $$
  x(t)\ge 0,
  $$
- the motion is outward,
  $$
  \dot x(t)\ge v_{\ast}>0,
  $$
- and the position remains bounded above by the global excursion envelope,
  $$
  x(t)\le X_{\max}.
  $$

If
$$
\tau_{\ast}\ge \frac{x_\ast}{v_{\ast}},
$$
then there exists a first time
$$
t_{\ast}
\in
\left[
t_{\mathrm{cross}}^{(2)},
\,
t_{\mathrm{cross}}^{(2)}+\frac{x_\ast}{v_{\ast}}
\right]
$$
such that
$$
x(t_{\ast})=x_\ast,
\qquad
\dot x(t_{\ast})\ge v_{\ast}>0.
$$

Equivalently, by reflection symmetry of the two-body state, the trajectory has returned to the reflected section state corresponding to the inbound section at radius
$$
x_\ast.
$$

Proof.
For
$$
t\in[t_{\mathrm{cross}}^{(2)},\,t_{\mathrm{cross}}^{(2)}+\tau_{\ast}],
$$
the lower speed bound gives
$$
x(t)
=
x(t_{\mathrm{cross}}^{(2)})
+
\int_{t_{\mathrm{cross}}^{(2)}}^{t}\dot x(s)\,ds
\ge
v_{\ast}(t-t_{\mathrm{cross}}^{(2)}),
$$
because
$$
x(t_{\mathrm{cross}}^{(2)})=0.
$$
Hence
$$
x(t)\ge x_\ast
$$
whenever
$$
t-t_{\mathrm{cross}}^{(2)}\ge \frac{x_\ast}{v_{\ast}}.
$$
Since
$$
\tau_{\ast}\ge \frac{x_\ast}{v_{\ast}},
$$
the trajectory reaches radius
$$
x_\ast
$$
within the stated window. Continuity of
$$
x
$$
then gives a first time
$$
t_\ast
\in
\left[
t_{\mathrm{cross}}^{(2)},
\,
t_{\mathrm{cross}}^{(2)}+\frac{x_\ast}{v_{\ast}}
\right]
$$
such that
$$
x(t_\ast)=x_\ast.
$$
The outward speed bound on the window implies
$$
\dot x(t_\ast)\ge v_\ast>0.
$$
Thus the trajectory reaches the reflected section state in finite time.

For the full return-map program this is the natural intermediate object: literal signed return to
$$
x=x_\ast
$$
with
$$
\dot x<0
$$
requires one further outer-turn control step, whereas return to the reflected section state is the immediate consequence of the second crossing plus outward continuation on the right branch.

**Lemma 17: Outer-turn closure from the reflected section state.**
Assume the hypotheses of Lemma 16 and let
$$
t_\ast
$$
denote the reflected-section time, so that
$$
x(t_\ast)=x_\ast,
\qquad
\dot x(t_\ast)\ge v_\ast>0.
$$
Assume, in addition, that there exists a later outer turning time
$$
t_{\mathrm{turn}}^{\mathrm{out}}
>
t_\ast
$$
with
$$
x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=X_{\mathrm{out}}\ge x_\ast,
\qquad
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0,
$$
and a post-turn window
$$
\left[
t_{\mathrm{turn}}^{\mathrm{out}},
\,
t_{\mathrm{turn}}^{\mathrm{out}}+\tau_{\mathrm{in}}
\right]
$$
on which
$$
\ddot x(t)\le -a_{\mathrm{in}}^{\mathrm{out}}<0.
$$
If
$$
\tau_{\mathrm{in}}
\ge
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_{\mathrm{in}}^{\mathrm{out}}}},
$$
then there exists a first return time
$$
T(\psi)
\in
\left[
t_{\mathrm{turn}}^{\mathrm{out}},
\,
t_{\mathrm{turn}}^{\mathrm{out}}+
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_{\mathrm{in}}^{\mathrm{out}}}}
\right]
$$
such that
$$
x(T(\psi))=x_\ast,
\qquad
\dot x(T(\psi))<0.
$$

Proof.
Integrating the acceleration bound from the outer turning time gives
$$
\dot x(t)
=
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)
+
\int_{t_{\mathrm{turn}}^{\mathrm{out}}}^{t}\ddot x(s)\,ds
\le
-a_{\mathrm{in}}^{\mathrm{out}}(t-t_{\mathrm{turn}}^{\mathrm{out}})
$$
for
$$
t\in
\left[
t_{\mathrm{turn}}^{\mathrm{out}},
\,
t_{\mathrm{turn}}^{\mathrm{out}}+\tau_{\mathrm{in}}
\right],
$$
because
$$
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0.
$$
Hence
$$
\dot x(t)<0
$$
for all
$$
t>t_{\mathrm{turn}}^{\mathrm{out}}
$$
in the window, so the trajectory moves strictly inward on the right branch after the outer turn.

Integrating once more yields
$$
x(t)
\le
X_{\mathrm{out}}
-
\frac{a_{\mathrm{in}}^{\mathrm{out}}}{2}
\big(t-t_{\mathrm{turn}}^{\mathrm{out}}\big)^2.
$$
Therefore
$$
x(t)\le x_\ast
$$
whenever
$$
t-t_{\mathrm{turn}}^{\mathrm{out}}
\ge
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_{\mathrm{in}}^{\mathrm{out}}}}.
$$
By the assumed lower bound on
$$
\tau_{\mathrm{in}},
$$
the comparison reaches
$$
x_\ast
$$
before the end of the window. Since
$$
x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=X_{\mathrm{out}}\ge x_\ast
$$
and
$$
x
$$
is continuous, there exists a first time
$$
T(\psi)
\in
\left[
t_{\mathrm{turn}}^{\mathrm{out}},
\,
t_{\mathrm{turn}}^{\mathrm{out}}+
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_{\mathrm{in}}^{\mathrm{out}}}}
\right]
$$
for which
$$
x(T(\psi))=x_\ast.
$$
The strict inward velocity bound implies
$$
\dot x(T(\psi))<0.
$$
Thus the trajectory returns to the inbound section in finite time.

**Lemma 18: Inbound section-speed bound after the outer turn.**
Assume the hypotheses of Lemma 17 and, in addition, that on the post-turn window
$$
\left[
t_{\mathrm{turn}}^{\mathrm{out}},
\,
T(\psi)
\right]
$$
the acceleration satisfies the two-sided bound
$$
-a_{+}^{\mathrm{out}}
\le
\ddot x(t)
\le
-a_{-}^{\mathrm{out}}
<
0,
\qquad
0<a_{-}^{\mathrm{out}}\le a_{+}^{\mathrm{out}}.
$$
Then the inbound section speed satisfies
$$
0<
-\dot x(T(\psi))
\le
a_{+}^{\mathrm{out}}
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_{-}^{\mathrm{out}}}}.
$$
In particular, a sufficient condition for the tame return-speed bound is
$$
a_{+}^{\mathrm{out}}
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_{-}^{\mathrm{out}}}}
\le
U_{\max}.
$$

Proof.
Integrating the upper acceleration bound from the outer turning time to the inbound section return gives
$$
\dot x(T(\psi))
=
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)
+
\int_{t_{\mathrm{turn}}^{\mathrm{out}}}^{T(\psi)}\ddot x(s)\,ds
\ge
-a_{+}^{\mathrm{out}}
\big(T(\psi)-t_{\mathrm{turn}}^{\mathrm{out}}\big),
$$
because
$$
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0.
$$
Since Lemma 17 already gives
$$
\dot x(T(\psi))<0,
$$
this implies
$$
0<
-\dot x(T(\psi))
\le
a_{+}^{\mathrm{out}}
\big(T(\psi)-t_{\mathrm{turn}}^{\mathrm{out}}\big).
$$

It remains to bound the elapsed time. By the lower acceleration floor,
$$
x(t)
\le
X_{\mathrm{out}}
-
\frac{a_{-}^{\mathrm{out}}}{2}
\big(t-t_{\mathrm{turn}}^{\mathrm{out}}\big)^2
$$
on
$$
\left[
t_{\mathrm{turn}}^{\mathrm{out}},
\,
T(\psi)
\right].
$$
Evaluating at
$$
t=T(\psi)
$$
and using
$$
x(T(\psi))=x_\ast
$$
yields
$$
T(\psi)-t_{\mathrm{turn}}^{\mathrm{out}}
\le
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_{-}^{\mathrm{out}}}}.
$$
Substituting this into the previous speed bound proves
$$
0<
-\dot x(T(\psi))
\le
a_{+}^{\mathrm{out}}
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_{-}^{\mathrm{out}}}}.
$$
The stated sufficient condition for
$$
-\dot x(T(\psi))\le U_{\max}
$$
is immediate.

**Lemma 19: Returned-history tameness from final-window bounds.**
Let
$$
T(\psi)
$$
be an inbound section return time produced by Lemma 17, and define the translated return history
$$
x_{T(\psi)}(\theta)=x\!\big(T(\psi)+\theta\big),
\qquad
\theta\in[-h,0].
$$
Assume that on the final window
$$
[T(\psi)-h,\,T(\psi)]
$$
the trajectory satisfies:

- the section anchoring and sign conditions
  $$
  x(T(\psi))=x_\ast,
  \qquad
  \dot x(T(\psi))<0,
  $$
- the envelope bounds
  $$
  0\le x(t)\le X_{\max},
  \qquad
  |\dot x(t)|\le U_{\max},
  \qquad
  |\ddot x(t)|\le A_{\max},
  $$
- and the same Jacobian and active-root count bounds that define the tame return class.

Then
$$
x_{T(\psi)}
$$
lies in the tame return envelope. In particular, if those final-window bounds are exactly the defining bounds of
$$
\mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta},
$$
then
$$
P_\eta(\psi)=x_{T(\psi)}\in \mathcal{C}^{\mathrm{tame}}_{x_\ast,\eta}.
$$

Proof.
For
$$
\theta\in[-h,0],
$$
the translated history satisfies
$$
x_{T(\psi)}(\theta)=x\!\big(T(\psi)+\theta\big),
$$
so every point of the history segment is sampled from the final window
$$
[T(\psi)-h,\,T(\psi)].
$$
Therefore the pointwise bounds on
$$
x,\qquad \dot x,\qquad \ddot x
$$
transfer directly to
$$
x_{T(\psi)},\qquad \dot x_{T(\psi)},\qquad \ddot x_{T(\psi)}.
$$
The section anchoring conditions at
$$
\theta=0
$$
follow from
$$
x(T(\psi))=x_\ast,
\qquad
\dot x(T(\psi))<0.
$$
Likewise, because the Jacobian and active-root count bounds are assumed uniformly on the same final window, they transfer directly to the translated segment.

Hence the translated history satisfies the defining bounds of the tame return class, which proves the lemma.

#### Outer-turn recapture target

The remaining major dynamical gap on the return half is no longer kinematic. Lemmas 17 and 18 show that, once an outer turning point exists with a post-turn inward acceleration floor, the literal inbound section return follows by comparison geometry. The unresolved question is therefore whether the delayed forces actually create such an outer turn on the right exterior branch.

> **Target Theorem (Outer-Turn Recapture).**
> Fix a dual-mollified tame return class and suppose the return-half branch has already reached the reflected section state
> $$
> x=x_\ast,
> \qquad
> \dot x>0
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
>    x_\ast\le x(t)\le X_{\mathrm{out},\max}
>    $$
>    until the first outer turn;
> 2. **outer-turn existence:**
>    there exists a first time
>    $$
>    t_{\mathrm{turn}}^{\mathrm{out}}
>    $$
>    with
>    $$
>    \dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0,
>    \qquad
>    x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=X_{\mathrm{out}}\in[x_\ast,X_{\mathrm{out},\max}];
>    $$
> 3. **post-turn inward-force margin:**
>    on a window after
>    $$
>    t_{\mathrm{turn}}^{\mathrm{out}},
>    $$
>    the signed acceleration satisfies
>    $$
>    -a_{+}^{\mathrm{out}}
>    \le
>    \ddot x(t)
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

#### Outer-turn recapture ladder

The intended proof order for the outer branch is:

1. **Outer-branch partner lower bound.**
   Derive a class-uniform lower bound for the inward partner contribution on the right exterior branch.
2. **Outer-branch self-drive upper bound.**
   Bound the outward self contribution there, using the longer partner distance and sub-field-speed Jacobian dilation on the delayed branches.
3. **Outer-force margin theorem.**
   Prove a quantitative inequality of the form
   $$
   A_p(t)-A_s(t)\ge a_{\mathrm{in}}^{\mathrm{out}}>0
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
  x_\ast\le x(t)\le X_{\mathrm{out},\max},
  \qquad
  \dot x(t)\ge 0,
  $$
- at least one retained active partner branch for each
  $$
  t\in[t_\ast,t_{\mathrm{turn}}^{\mathrm{out}}],
  $$
- the speed bound
  $$
  |\dot x(t)|\le U_{\max},
  $$
- the partner roots retained in this lower bound remain inward exterior roots with
  $$
  x(t)+x(t_p)>0,
  \qquad
  0\le x(t_p)\le X_{\mathrm{out},\max},
  $$
- and the partner Jacobian upper bound
  $$
  |J_p(t;t_p)|\le J_{p,\max}^{\mathrm{out}}
  $$
  on every retained active partner root.
  The speed bound permits the conservative choice
  $$
  J_{p,\max}^{\mathrm{out}}=1+\frac{U_{\max}}{c_f}.
  $$

Then the partner contribution to the inward acceleration obeys the class-uniform lower bound
$$
A_p(t)\ge \underline A_p^{\mathrm{out}}
\equiv
\frac{\kappa\epsilon^2}{
\left(4X_{\mathrm{out},\max}^2+\epsilon_c^2\right)J_{p,\max}^{\mathrm{out}}}.
$$
Equivalently, the partner acceleration satisfies
$$
a_p(t)=-A_p(t)\le -\underline A_p^{\mathrm{out}}<0
$$
on the outer branch.

Proof.
Along the retained inward exterior partner channel, the delayed source remains on the opposite side of the current right-hand particle, so each retained contribution points inward and therefore contributes with signed acceleration
$$
a_p(t)=-A_p(t).
$$
For any active partner root
$$
t_p<t,
$$
the delayed partner separation satisfies
$$
r_p(t;t_p)=x(t)+x(t_p).
$$
Because both the current and delayed positions remain within the outer excursion envelope,
$$
0\le x(t)\le X_{\mathrm{out},\max},
\qquad
0\le x(t_p)\le X_{\mathrm{out},\max},
$$
we obtain
$$
0<r_p(t;t_p)\le 2X_{\mathrm{out},\max}.
$$
Hence the core-mollified denominator obeys
$$
r_p(t;t_p)^2+\epsilon_c^2
\le
4X_{\mathrm{out},\max}^2+\epsilon_c^2.
$$

Each retained active partner contribution therefore has magnitude at least
$$
\frac{\kappa\epsilon^2}{
\left(r_p(t;t_p)^2+\epsilon_c^2\right)|J_p(t;t_p)|}
\ge
\frac{\kappa\epsilon^2}{
\left(4X_{\mathrm{out},\max}^2+\epsilon_c^2\right)J_{p,\max}^{\mathrm{out}}}.
$$
Summing over the retained active partner branches and retaining only one branch yields
$$
A_p(t)\ge \underline A_p^{\mathrm{out}},
$$
which proves the lemma.

**Lemma 21: Conditional outer-branch self-drive upper bound.**
Assume that on the outer branch
$$
[t_\ast,t_{\mathrm{turn}}^{\mathrm{out}}],
$$
the active self branches satisfy:

- a root-count bound
  $$
  N_s(t)\le N_{s,\max}^{\mathrm{out}},
  $$
- a self-Jacobian transversality bound
  $$
  |J_s(t;t_s)|\ge \nu_s^{\mathrm{out}}>0
  $$
  on every active self root,
- and a delayed self-separation lower bound
  $$
  r_s(t;t_s)\ge r_{s,\min}^{\mathrm{out}}>0
  $$
  on every active self root.

Then the outward self contribution obeys the class-uniform upper bound
$$
A_s(t)\le \overline A_s^{\mathrm{out}}
\equiv
N_{s,\max}^{\mathrm{out}}\,
\frac{\kappa\epsilon^2}{
\big((r_{s,\min}^{\mathrm{out}})^2+\epsilon_c^2\big)\,\nu_s^{\mathrm{out}}}.
$$

Proof.
For each active self root
$$
t_s<t,
$$
the contribution to the outward self-drive has magnitude bounded by
$$
\frac{\kappa\epsilon^2}{
\big(r_s(t;t_s)^2+\epsilon_c^2\big)\,|J_s(t;t_s)|}.
$$
Using the assumed lower bounds on
$$
r_s(t;t_s)
\qquad
\text{and}
\qquad
|J_s(t;t_s)|
$$
gives the branchwise estimate
$$
\frac{\kappa\epsilon^2}{
\big(r_s(t;t_s)^2+\epsilon_c^2\big)\,|J_s(t;t_s)|}
\le
\frac{\kappa\epsilon^2}{
\big((r_{s,\min}^{\mathrm{out}})^2+\epsilon_c^2\big)\,\nu_s^{\mathrm{out}}}.
$$
Summing over at most
$$
N_{s,\max}^{\mathrm{out}}
$$
active self branches yields
$$
A_s(t)\le \overline A_s^{\mathrm{out}},
$$
which proves the lemma.

**Lemma 22: Outer-force margin on the apocenter window.**
Assume that on an outer-branch window
$$
[t_\ast,\,t_\ast+\tau_{\mathrm{apo}}],
$$
the signed dynamics can be written in the form
$$
\ddot x(t)\le -A_p(t)+A_s(t),
$$
where
$$
A_p(t)
$$
is the inward partner contribution and
$$
A_s(t)
$$
is the total outward delayed self contribution on that window. If
$$
A_p(t)\ge \underline A_p^{\mathrm{out}}
\qquad
\text{and}
\qquad
A_s(t)\le \overline A_s^{\mathrm{out}}
$$
there with
$$
\underline A_p^{\mathrm{out}}-\overline A_s^{\mathrm{out}}
\ge
a_{\mathrm{in}}^{\mathrm{out}}>0,
$$
then
$$
\ddot x(t)\le -a_{\mathrm{in}}^{\mathrm{out}}<0
$$
for every
$$
t\in[t_\ast,\,t_\ast+\tau_{\mathrm{apo}}].
$$

In particular, Lemmas 20 and 21 reduce the outer-turn force margin to the parameter inequality
$$
\frac{\kappa\epsilon^2}{
\left(4X_{\mathrm{out},\max}^2+\epsilon_c^2\right)J_{p,\max}^{\mathrm{out}}}
-
N_{s,\max}^{\mathrm{out}}\,
\frac{\kappa\epsilon^2}{
\big((r_{s,\min}^{\mathrm{out}})^2+\epsilon_c^2\big)\,\nu_s^{\mathrm{out}}}
\ge
a_{\mathrm{in}}^{\mathrm{out}}>0.
$$

Proof.
By hypothesis,
$$
\ddot x(t)\le -A_p(t)+A_s(t).
$$
Using the lower bound for the inward partner term and the upper bound for the outward self term yields
$$
\ddot x(t)
\le
-\underline A_p^{\mathrm{out}}+\overline A_s^{\mathrm{out}}
\le
-a_{\mathrm{in}}^{\mathrm{out}}<0,
$$
which proves the claim.

**Lemma 23: Finite-radius outer turn under an apocenter force margin.**
Assume the hypotheses of Lemma 22 and suppose, in addition, that at the reflected section time
$$
t_\ast
$$
the trajectory satisfies
$$
x(t_\ast)=x_\ast,
\qquad
\dot x(t_\ast)=v_\ast>0.
$$
If the apocenter window is long enough to satisfy
$$
\tau_{\mathrm{apo}}\ge \frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}},
$$
then there exists a first outer turning time
$$
t_{\mathrm{turn}}^{\mathrm{out}}
\in
\left[
t_\ast,
\,
t_\ast+\frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
\right]
$$
such that
$$
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0.
$$
Moreover, the turning radius obeys the explicit bound
$$
X_{\mathrm{out}}
=
x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)
\le
x_\ast+\frac{v_\ast^2}{2a_{\mathrm{in}}^{\mathrm{out}}}.
$$

In particular, a sufficient condition for the outer-turn radius envelope is
$$
x_\ast+\frac{v_\ast^2}{2a_{\mathrm{in}}^{\mathrm{out}}}\le X_{\mathrm{out},\max}.
$$

Proof.
Lemma 22 gives the uniform acceleration bound
$$
\ddot x(t)\le -a_{\mathrm{in}}^{\mathrm{out}}
$$
on
$$
[t_\ast,\,t_\ast+\tau_{\mathrm{apo}}].
$$
Integrating from
$$
t_\ast
$$
to any later time
$$
t
$$
in that window yields
$$
\dot x(t)
=
\dot x(t_\ast)
+
\int_{t_\ast}^{t}\ddot x(s)\,ds
\le
v_\ast-a_{\mathrm{in}}^{\mathrm{out}}(t-t_\ast).
$$
Therefore
$$
\dot x(t)\le 0
$$
whenever
$$
t-t_\ast\ge \frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}.
$$
Because
$$
\tau_{\mathrm{apo}}\ge \frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}},
$$
the comparison velocity reaches zero before the end of the apocenter window. Since
$$
\dot x(t_\ast)=v_\ast>0
$$
and
$$
\dot x
$$
is continuous, there exists a first time
$$
t_{\mathrm{turn}}^{\mathrm{out}}
\in
\left[
t_\ast,
\,
t_\ast+\frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
\right]
$$
for which
$$
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0.
$$

Integrating the velocity estimate once more gives
$$
x(t)
\le
x_\ast+v_\ast(t-t_\ast)
-
\frac{a_{\mathrm{in}}^{\mathrm{out}}}{2}(t-t_\ast)^2.
$$
Evaluating at
$$
t=t_{\mathrm{turn}}^{\mathrm{out}}
$$
and using
$$
t_{\mathrm{turn}}^{\mathrm{out}}-t_\ast
\le
\frac{v_\ast}{a_{\mathrm{in}}^{\mathrm{out}}}
$$
yields
$$
X_{\mathrm{out}}
\le
x_\ast+\frac{v_\ast^2}{2a_{\mathrm{in}}^{\mathrm{out}}},
$$
which proves the radius bound.

**Lemma 24: Post-turn acceleration bracket after the outer turn.**
Assume the hypotheses of Lemma 23 and let
$$
t_{\mathrm{turn}}^{\mathrm{out}}
$$
be the first outer turning time, with
$$
x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=X_{\mathrm{out}},
\qquad
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0.
$$
Assume, in addition, that there exists a post-turn window
$$
\left[
t_{\mathrm{turn}}^{\mathrm{out}},
\,
t_{\mathrm{turn}}^{\mathrm{out}}+\tau_{\mathrm{in}}
\right]
$$
on which the delayed force contributions satisfy
$$
A_p(t)\ge \underline A_{p,\mathrm{post}}^{\mathrm{out}},
\qquad
A_s(t)\le \overline A_{s,\mathrm{post}}^{\mathrm{out}},
$$
with
$$
\underline A_{p,\mathrm{post}}^{\mathrm{out}}
-
\overline A_{s,\mathrm{post}}^{\mathrm{out}}
\ge
a_-^{\mathrm{out}}>0,
$$
and also admit a class-uniform upper acceleration bound
$$
|\ddot x(t)|\le a_+^{\mathrm{out}}.
$$
Then on that post-turn window one has the two-sided acceleration bracket
$$
-a_+^{\mathrm{out}}
\le
\ddot x(t)
\le
-a_-^{\mathrm{out}}
<
0.
$$

Consequently, if
$$
\tau_{\mathrm{in}}
\ge
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_-^{\mathrm{out}}}},
$$
then the hypotheses of Lemmas 17 and 18 hold with
$$
a_{\mathrm{in}}^{\mathrm{out}}=a_-^{\mathrm{out}}.
$$

Proof.
On the post-turn window the signed equation has the form
$$
\ddot x(t)\le -A_p(t)+A_s(t).
$$
Using the assumed lower bound for the inward partner term and the upper bound for the outward self term yields
$$
\ddot x(t)
\le
-\underline A_{p,\mathrm{post}}^{\mathrm{out}}
+
\overline A_{s,\mathrm{post}}^{\mathrm{out}}
\le
-a_-^{\mathrm{out}}<0.
$$
The assumed absolute acceleration bound gives
$$
\ddot x(t)\ge -a_+^{\mathrm{out}},
$$
so the stated two-sided bracket follows.

If
$$
\tau_{\mathrm{in}}
\ge
\sqrt{\frac{2(X_{\mathrm{out}}-x_\ast)}{a_-^{\mathrm{out}}}},
$$
then Lemma 17 applies with
$$
a_{\mathrm{in}}^{\mathrm{out}}=a_-^{\mathrm{out}},
$$
and Lemma 18 applies with the pair
$$
(a_-^{\mathrm{out}},a_+^{\mathrm{out}}).
$$
This is exactly the required post-turn handoff.

#### Outer-branch delayed-geometry target

The outer-turn force-margin lemmas are now in place, but Lemma 21 is still conditional on delayed self geometry. The remaining task is to prove that on the right exterior outbound branch the active self roots stay both sparse and noncaustic long enough to make the outer-force margin genuine rather than assumed.

> **Target Theorem (Outer-Branch Self-Root Separation and Transversality).**
> Fix a tame outer-branch class on the right exterior outbound interval
> $$
> [t_\ast,t_{\mathrm{turn}}^{\mathrm{out}}].
> $$
> Suppose the branch stays within the excursion tube
> $$
> x_\ast\le x(t)\le X_{\mathrm{out},\max},
> \qquad
> 0\le \dot x(t)\le U_{\max},
> $$
> and that its same-side delayed self interactions are organized by the outer sorting map
> $$
> z(t)\equiv x(t)-c_f t.
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
>    r_s(t;t_s)\ge r_{s,\min}^{\mathrm{out}},
>    $$
> 2. active self roots stay on a noncaustic side of the outer sorting map with
>    $$
>    |J_s(t;t_s)|\ge \nu_s^{\mathrm{out}},
>    $$
> 3. and the number of active self branches obeys
>    $$
>    N_s(t)\le N_{s,\max}^{\mathrm{out}}.
>    $$
>
> Then Lemma 21 applies, and the outer-force margin reduces to the explicit parameter inequality of Lemma 22.

This theorem is the outer-branch analogue of the earlier pre-crossing and post-crossing delayed-geometry steps: the partner floor is comparatively easy, while the decisive issue is keeping the self branches away from both short-distance concentration and Jacobian collapse.

#### Outer-branch delayed-geometry ladder

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
   |J_s|\ge \nu_s^{\mathrm{out}}>0.
   $$
4. **Outer root-count lemma.**
   Prove that the number of active same-side self branches remains bounded by
   $$
   N_{s,\max}^{\mathrm{out}}.
   $$
5. **Self-drive upper-bound corollary.**
   Feed the preceding three items into Lemma 21.

The second and third items are the real bottlenecks. Once they are available, the outer-turn recapture theorem becomes a direct comparison argument.

**Lemma 25: Outer sorting-map identity on the right exterior outbound branch.**
Assume the trajectory lies on the right exterior outbound branch,
$$
x(t)\ge 0,
\qquad
\dot x(t)\ge 0,
$$
and consider same-side self roots
$$
t_s<t
$$
for which the delayed self-hit condition is
$$
x(t)-x(t_s)=c_f(t-t_s).
$$
Define the outer sorting map
$$
z(t)\equiv x(t)-c_f t.
$$
Then every such active self root is selected by the level-set identity
$$
z(t_s)=z(t).
$$
Consequently, the same-side outer self branches on the right exterior outbound leg are organized by level sets of
$$
z.
$$

Proof.
The same-side delayed self-hit condition is
$$
x(t)-x(t_s)=c_f(t-t_s).
$$
Rearranging gives
$$
x(t)-c_f t=x(t_s)-c_f t_s,
$$
which is exactly
$$
z(t)=z(t_s).
$$
Thus every active same-side self root on the right exterior outbound branch is a level-set root of
$$
z,
$$
which proves the lemma.

**Lemma 26: Exact same-side self-root exclusion on a strictly sub-field-speed outer window.**
Assume there exists an outer-branch window
$$
[t_a,t_b]\subseteq [t_\ast,\infty)
$$
on which the outbound speed stays strictly below field speed:
$$
0\le \dot x(t)\le c_f-\sigma_{\mathrm{out}}
<c_f
\qquad
\text{for }t\in[t_a,t_b]
$$
with some
$$
\sigma_{\mathrm{out}}>0.
$$
Then the outer sorting map
$$
z(t)=x(t)-c_f t
$$
is strictly decreasing on that window. Consequently, there are no exact same-side self roots
$$
t_s<t
$$
with both
$$
t_s,t\in[t_a,t_b]
$$
and
$$
x(t)-x(t_s)=c_f(t-t_s).
$$

Proof.
On the stated window one has
$$
\dot z(t)=\dot x(t)-c_f\le -\sigma_{\mathrm{out}}<0,
$$
so
$$
z
$$
is strictly decreasing on
$$
[t_a,t_b].
$$
If there existed an exact same-side self root pair
$$
t_s<t
$$
with both times in that window, Lemma 25 would give
$$
z(t_s)=z(t).
$$
But strict monotonicity of
$$
z
$$
implies
$$
z(t_s)>z(t)
$$
whenever
$$
t_s<t,
$$
which is impossible. Therefore no such exact same-side self root exists on the strictly sub-field-speed outer window.

This shows that on a strictly sub-field-speed apocenter window the exact delayed self geometry is maximally favorable: same-side outer self roots are absent. The remaining issue for the dual-mollified model is then not exact root multiplicity, but control of the shell-smeared near-diagonal contribution.

**Lemma 27: Shell-tail bound on a strictly sub-field-speed outer window.**
Assume the hypotheses of Lemma 26 on a window
$$
[t_a,t_b]\subseteq [t_\ast,\infty),
$$
and assume that the same-side outer self contribution is evaluated in the dual-mollified integral form with:

- shell mollifier
  $$
  \delta_\eta
  $$
  supported where its argument lies in
  $$
  [-\eta,\eta],
  $$
- essential bound
  $$
  \|\delta_\eta\|_\infty<\infty,
  $$
- core mollifier
  $$
  \epsilon_c>0,
  $$
- and memory horizon
  $$
  h>0.
  $$

For each fixed
$$
t\in[t_a,t_b],
$$
let the **local** same-side shell contribution be integrated only over delayed times
$$
t_0\in[t_a,t]
$$
for which the outer sorting-map mismatch
$$
z(t_0)-z(t)
$$
lies in the shell support. Then the local same-side outer self contribution obeys the pointwise bound
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(t)
\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}.
$$

This lemma controls only the same-window shell leakage. Same-side contributions from
$$
t_0<t_a
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
t\in[t_a,t_b].
$$
By Lemma 26,
$$
z(t)=x(t)-c_f t
$$
is strictly decreasing with derivative bounded above by
$$
\dot z(t)\le -\sigma_{\mathrm{out}}<0.
$$
Hence for any delayed time
$$
t_0<t
$$
in the same window one has
$$
z(t_0)-z(t)\ge \sigma_{\mathrm{out}}(t-t_0).
$$
Therefore, if
$$
|z(t_0)-z(t)|\le \eta,
$$
then necessarily
$$
0\le t-t_0\le \frac{\eta}{\sigma_{\mathrm{out}}}.
$$
So the set of delayed times inside the shell support has measure at most
$$
\frac{\eta}{\sigma_{\mathrm{out}}}
\le
\frac{2\eta}{\sigma_{\mathrm{out}}}.
$$

Evaluating the local same-side self term in integral form and using
$$
|x(t)-x(t_0)|^2+\epsilon_c^2\ge \epsilon_c^2
$$
gives
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(t)
\le
\kappa\epsilon^2
\int_{t_a}^{t}
\frac{\delta_\eta(\cdots)}{|x(t)-x(t_0)|^2+\epsilon_c^2}\,dt_0
\le
\frac{\kappa\epsilon^2\,\|\delta_\eta\|_\infty}{\epsilon_c^2}
\cdot
\left|\operatorname{supp}_t(\delta_\eta)\right|.
$$
Using the support-measure bound yields
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(t)
\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2},
$$
which proves the lemma.

**Corollary 28: Sub-field-speed outer-force margin from partner floor versus local shell tail.**
Assume there exists an apocenter window
$$
[t_a,t_b]\subseteq [t_\ast,\infty)
$$
on which the branch has not yet turned and:

- the outer branch is strictly sub-field-speed,
  $$
  0\le \dot x(t)\le c_f-\sigma_{\mathrm{out}}<c_f,
  $$
- the partner lower bound of Lemma 20 holds with
  $$
  A_p(t)\ge \underline A_p^{\mathrm{out}},
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
a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}>0,
$$
then on that window one has the unconditional inward acceleration bound
$$
\ddot x(t)\le -a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}<0.
$$

In particular, on a strictly sub-field-speed apocenter window with no remaining deep-past outward self channel, the outer-force margin reduces to a direct parameter race between the partner floor and the shell-mollified same-window self leakage.

Proof.
Lemma 20 gives
$$
A_p(t)\ge \underline A_p^{\mathrm{out}}.
$$
By Lemma 26, there are no exact same-side self roots with both times on the stated window, and Lemma 27 therefore bounds the surviving same-window shell contribution by
$$
A_s^{\mathrm{out}}(t)=A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(t)\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}.
$$
Using the signed dynamics
$$
\ddot x(t)\le -A_p(t)+A_s^{\mathrm{out}}(t)
$$
yields
$$
\ddot x(t)
\le
-\underline A_p^{\mathrm{out}}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}
\le
-a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}<0,
$$
which proves the corollary.

**Lemma 29: Coarse speed-decay entry into a strict sub-field-speed apocenter window.**
Fix a desired strict sub-field-speed gap
$$
\sigma_{\mathrm{out}}>0,
$$
and write
$$
v_{\mathrm{sub}}^{\mathrm{out}}
\equiv
c_f-\sigma_{\mathrm{out}}.
$$
Assume there is an outbound outer-entry interval
$$
I_{\mathrm{ent}}\equiv[t_0,t_1]
$$
on which the branch has not yet been shown to turn, but the following non-circular data are available:

- the trajectory is on the right exterior outbound branch as long as no turn has occurred,
  $$
  x_\ast\le x(t)\le X_{\mathrm{out},\max},
  \qquad
  \dot x(t)\ge 0;
  $$
- the entry interval carries a coarse inward braking margin at the sub-field-speed boundary and above it:
  $$
  \ddot x(t)\le -a_{\mathrm{ent}}^{\mathrm{out}}<0
  \qquad
  \text{whenever }
  t\in I_{\mathrm{ent}}
  \text{ and }
  \dot x(t)\ge v_{\mathrm{sub}}^{\mathrm{out}};
  $$
- the interval is long enough for entry plus a retained sub-field-speed window of length
  $$
  \tau_{\mathrm{sub}}^{\mathrm{out}}>0:
  $$
  $$
  t_1-t_0
  \ge
  \frac{\big(\dot x(t_0)-v_{\mathrm{sub}}^{\mathrm{out}}\big)_+}
  {a_{\mathrm{ent}}^{\mathrm{out}}}
  +
  \tau_{\mathrm{sub}}^{\mathrm{out}}.
  $$

Then one of the following alternatives holds:

1. a finite outer turn occurs before the retained sub-field-speed window is exhausted; or
2. there exists an entry time
   $$
   t_a\in
   \left[
   t_0,\,
   t_0+
   \frac{\big(\dot x(t_0)-v_{\mathrm{sub}}^{\mathrm{out}}\big)_+}
   {a_{\mathrm{ent}}^{\mathrm{out}}}
   \right]
   $$
   such that the branch remains strictly sub-field-speed and outbound on
   $$
   I_{\mathrm{sub}}\equiv
   [t_a,t_a+\tau_{\mathrm{sub}}^{\mathrm{out}}],
   $$
   namely
   $$
   0\le \dot x(t)\le c_f-\sigma_{\mathrm{out}}
   \qquad
   \text{for every }t\in I_{\mathrm{sub}}.
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
a_{\mathrm{ent}}^{\mathrm{out}}>0,
$$
where
$$
\overline A_{s,\mathrm{ent}}^{\mathrm{out}}
$$
includes all outward self, fold, shell, and deep-past channels on the entry interval. This ceiling is deliberately coarse: it is not allowed to use Lemma 26 or Lemma 27, because those lemmas are consequences of the sub-field-speed window produced here.

Proof.
Let
$$
v(t)\equiv \dot x(t).
$$
If
$$
v(t_0)\le v_{\mathrm{sub}}^{\mathrm{out}},
$$
set
$$
t_a=t_0.
$$
Otherwise, as long as
$$
v(t)\ge v_{\mathrm{sub}}^{\mathrm{out}}
$$
and no turn has occurred, the coarse margin gives
$$
v'(t)=\ddot x(t)\le -a_{\mathrm{ent}}^{\mathrm{out}}.
$$
Integrating from
$$
t_0
$$
shows that
$$
v(t)
\le
v(t_0)-a_{\mathrm{ent}}^{\mathrm{out}}(t-t_0)
$$
throughout the portion of the interval where
$$
v\ge v_{\mathrm{sub}}^{\mathrm{out}}.
$$
Hence either the velocity reaches zero first, giving a finite outer turn, or it reaches
$$
v_{\mathrm{sub}}^{\mathrm{out}}
$$
no later than
$$
t_0+
\frac{\big(v(t_0)-v_{\mathrm{sub}}^{\mathrm{out}}\big)_+}
{a_{\mathrm{ent}}^{\mathrm{out}}}.
$$
Call the first such time
$$
t_a.
$$

It remains to show that the trajectory cannot immediately exit back above
$$
v_{\mathrm{sub}}^{\mathrm{out}}
$$
before the retained window is exhausted. Suppose instead that, after entry and before any turn, there is a first time
$$
t_{\mathrm{exit}}>t_a
$$
at which
$$
v(t_{\mathrm{exit}})=v_{\mathrm{sub}}^{\mathrm{out}}
$$
and the velocity is about to cross from
$$
v\le v_{\mathrm{sub}}^{\mathrm{out}}
$$
to
$$
v>v_{\mathrm{sub}}^{\mathrm{out}}.
$$
At this boundary point the same coarse margin applies, so
$$
v'(t_{\mathrm{exit}})
\le
-a_{\mathrm{ent}}^{\mathrm{out}}<0,
$$
which is incompatible with an upward first exit. Therefore the sub-field-speed inequality is forward invariant on the retained part of
$$
I_{\mathrm{ent}}
$$
until a turn occurs.

The length hypothesis ensures that
$$
[t_a,t_a+\tau_{\mathrm{sub}}^{\mathrm{out}}]\subseteq I_{\mathrm{ent}}.
$$
If no turn occurs on that retained interval, then the outbound condition supplies
$$
v(t)\ge 0,
$$
and the forward-invariance argument supplies
$$
v(t)\le v_{\mathrm{sub}}^{\mathrm{out}}=c_f-\sigma_{\mathrm{out}}.
$$
This is exactly the claimed strict sub-field-speed apocenter window. The final displayed partner-floor condition implies the coarse acceleration hypothesis directly from the signed dynamics
$$
\ddot x(t)\le -A_p(t)+A_s^{\mathrm{out}}(t),
$$
using
$$
A_p(t)\ge \underline A_p^{\mathrm{out}},
\qquad
A_s^{\mathrm{out}}(t)\le \overline A_{s,\mathrm{ent}}^{\mathrm{out}}.
$$

**Corollary 29.1: Strict sub-field-speed apocenter window.**
Assume there exists an apocenter window
$$
I_{\mathrm{sub}}\equiv[t_a,t_b]\subseteq[t_\ast,\infty)
$$
on which the branch has not yet turned and satisfies
$$
0\le \dot x(t)\le c_f-\sigma_{\mathrm{out}}<c_f
\qquad
\text{for every }t\in I_{\mathrm{sub}}.
$$
Then the hypotheses of Lemmas 26 and 27 hold on
$$
I_{\mathrm{sub}}.
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
I_{\mathrm{sub}}\equiv[t_a,t_b]
$$
before any known outer turn, and on that window:

- the branch remains outbound,
  $$
  0\le \dot x(t),
  $$
- the branch is strictly sub-field-speed,
  $$
  \dot x(t)\le c_f-\sigma_{\mathrm{out}}<c_f,
  $$
- the partner lower bound of Lemma 20 holds with
  $$
  A_p(t)\ge \underline A_p^{\mathrm{out}},
  $$
- and deep-past outward self channels are absent or already bounded by zero, so the only outward self contribution on this local criterion is the same-window shell leakage of Lemma 27.

If, in addition, the parameter inequality
$$
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
\ddot x(t)\le -a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}<0.
$$

In particular, if
$$
t_b-t_a
\ge
\frac{\dot x(t_a)}{a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}},
$$
then a finite outer turn occurs on
$$
\left[t_a,\,t_a+\frac{\dot x(t_a)}{a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}}\right],
$$
with radius bound
$$
X_{\mathrm{out}}
\le
x(t_a)+\frac{\dot x(t_a)^2}{2a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}}.
$$

Proof.
Corollary 29.1 activates Lemmas 26 and 27 on
$$
I_{\mathrm{sub}},
$$
so the same-window outer self contribution is reduced to the shell-tail bound
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(t)\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}.
$$
Combining this with the partner lower bound from Lemma 20 gives exactly the hypothesis of Corollary 28, hence
$$
\ddot x(t)\le -a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}<0
$$
on
$$
I_{\mathrm{sub}}.
$$

Integrating from
$$
t_a
$$
to
$$
t\in I_{\mathrm{sub}}
$$
gives
$$
\dot x(t)\le \dot x(t_a)-a_{\mathrm{in},\mathrm{shell}}^{\mathrm{out}}(t-t_a).
$$
If the displayed window-length condition holds, continuity of
$$
\dot x
$$
forces a first zero of the velocity inside the stated interval. Integrating the same comparison once more gives the radius bound.

#### Deep-past outer self suppression target

The outer-turn program is now reduced to one explicit remaining issue. On the final sub-field-speed apocenter window, the local same-side self roots are annihilated by the monotonicity of
$$
z(t)=x(t)-c_f t,
$$
so the local outward self-drive is only the shell tail bounded in Lemma 27. The remaining possible outward self contributions are therefore the roots that come from much earlier times
$$
t_s<t_a,
$$
outside the local sub-field-speed window but still satisfy
$$
z(t_s)=z(t).
$$

> **Target Theorem (Deep-Past Outer Self Suppression).**
> Fix a final sub-field-speed apocenter window
> $$
> [t_a,t_b]\subseteq [t_\ast,\infty)
> $$
> on which
> $$
> 0\le \dot x(t)\le c_f-\sigma_{\mathrm{out}}<c_f.
> $$
> Assume that every outward-driving same-side self root
> $$
> t_s<t_a
> $$
> satisfying
> $$
> z(t_s)=z(t)
> $$
> obeys:
> 1. a macroscopic delayed-separation lower bound
>    $$
>    r_s(t;t_s)\ge R_{\mathrm{deep}}^{\mathrm{out}}>0,
>    $$
> 2. a deep-past transversality bound
>    $$
>    |J_s(t;t_s)|\ge \nu_{s,\mathrm{deep}}^{\mathrm{out}}>0,
>    $$
> 3. and a deep-past root-count bound
>    $$
>    N_{s,\mathrm{deep}}^{\mathrm{out}}(t)\le N_{s,\mathrm{deep},\max}^{\mathrm{out}}.
>    $$
>
> Then the total outward self contribution from deep-past roots satisfies
> $$
> A_{s,\mathrm{deep}}^{\mathrm{out}}(t)
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

#### Deep-past suppression ladder

The intended proof order is:

1. **Deep-past separation lemma.**
   Show that any same-side outer root with
   $$
   t_s<t_a
   $$
   must satisfy a macroscopic delay gap and hence a macroscopic spatial separation
   $$
   r_s(t;t_s)\ge R_{\mathrm{deep}}^{\mathrm{out}}.
   $$
2. **Deep-past transversality lemma.**
   Prove that the emitting velocities at those earlier times stay away from the outer caustic side, giving
   $$
   |J_s|\ge \nu_{s,\mathrm{deep}}^{\mathrm{out}}.
   $$
3. **Deep-past root-count lemma.**
   Bound the number of such roots by a class constant.
4. **Deep-past suppression corollary.**
   Combine the three bounds into the explicit amplitude estimate above.

The first two items are the real bottlenecks. Once deep-past roots are diluted by distance and Jacobian control, the outer-turn proposition becomes a direct explicit parameter race.

**Lemma 30: Deep-past separation on a trimmed apocenter window.**
Assume the hypotheses of Lemma 26 on a final sub-field-speed apocenter window
$$
[t_a,t_b],
$$
and fix a trimming parameter
$$
0<\tau_{\mathrm{deep}}\le t_b-t_a.
$$
Let
$$
I_{\mathrm{deep}}
\equiv
[t_a+\tau_{\mathrm{deep}},\,t_b].
$$
If
$$
t\in I_{\mathrm{deep}}
$$
and
$$
t_s<t_a
$$
is a same-side outward-driving self root satisfying
$$
z(t_s)=z(t),
$$
then:

1. the delayed time gap is uniformly bounded below,
   $$
   t-t_s\ge \tau_{\mathrm{deep}},
   $$
2. and the causal self separation is therefore macroscopic,
   $$
   r_s(t;t_s)=c_f(t-t_s)\ge c_f\tau_{\mathrm{deep}}.
   $$

In particular, on the trimmed subwindow
$$
I_{\mathrm{deep}}
$$
one may take
$$
R_{\mathrm{deep}}^{\mathrm{out}}=c_f\tau_{\mathrm{deep}}.
$$

Proof.
Because
$$
t\in[t_a+\tau_{\mathrm{deep}},\,t_b]
$$
and
$$
t_s<t_a,
$$
one immediately has
$$
t-t_s>(t_a+\tau_{\mathrm{deep}})-t_a=\tau_{\mathrm{deep}},
$$
hence in particular
$$
t-t_s\ge \tau_{\mathrm{deep}}.
$$

For an outward-driving same-side self root on the right exterior outbound branch, the causal relation is
$$
x(t)-x(t_s)=c_f(t-t_s).
$$
Therefore
$$
r_s(t;t_s)=c_f(t-t_s)\ge c_f\tau_{\mathrm{deep}},
$$
which proves the lemma.

**Lemma 31: Deep-past transversality from a sub-field-speed source region.**
Assume there exists a source interval
$$
I_{\mathrm{src}}^{\mathrm{deep}}\subseteq (-\infty,t_a]
$$
on which the emitting velocities satisfy the strict sub-field-speed bound
$$
0\le \dot x(\theta)\le c_f-\nu_{\mathrm{deep}}
<c_f
\qquad
\text{for every }\theta\in I_{\mathrm{src}}^{\mathrm{deep}}
$$
with some
$$
\nu_{\mathrm{deep}}>0.
$$
Let
$$
t\in I_{\mathrm{deep}}
$$
and let
$$
t_s\in I_{\mathrm{src}}^{\mathrm{deep}}
$$
be a same-side outward-driving self root satisfying
$$
z(t_s)=z(t).
$$
Then the self Jacobian at the emitting time obeys
$$
J_s(t;t_s)=1-\frac{\dot x(t_s)}{c_f}
\ge
\frac{\nu_{\mathrm{deep}}}{c_f}>0.
$$

In particular, on such deep-past roots one may take
$$
\nu_{s,\mathrm{deep}}^{\mathrm{out}}=\frac{\nu_{\mathrm{deep}}}{c_f}.
$$

Proof.
For a same-side outward-driving self root on the right exterior outbound branch one has
$$
x(t)-x(t_s)=c_f(t-t_s),
\qquad
x(t)>x(t_s),
$$
so the line-of-action sign is
$$
\hat r_s(t;t_s)=+1.
$$
Therefore the self Jacobian reduces to
$$
J_s(t;t_s)=1-\frac{\dot x(t_s)}{c_f}.
$$
Because
$$
t_s\in I_{\mathrm{src}}^{\mathrm{deep}}
$$
and the source interval is strictly sub-field-speed, we have
$$
\dot x(t_s)\le c_f-\nu_{\mathrm{deep}}.
$$
Substituting gives
$$
J_s(t;t_s)
\ge
1-\frac{c_f-\nu_{\mathrm{deep}}}{c_f}
=
\frac{\nu_{\mathrm{deep}}}{c_f}>0,
$$
which proves the lemma.

**Corollary 32: Deep-past amplitude suppression on a trimmed apocenter window.**
Assume:

- the hypotheses of Lemma 30 on the trimmed apocenter window
  $$
  I_{\mathrm{deep}}=[t_a+\tau_{\mathrm{deep}},\,t_b],
  $$
- the hypotheses of Lemma 31 with a deep-past sub-field-speed source interval
  $$
  I_{\mathrm{src}}^{\mathrm{deep}}\subseteq (-\infty,t_a],
  $$
- and a deep-past root-count bound
  $$
  N_{s,\mathrm{deep}}^{\mathrm{out}}(t)\le N_{s,\mathrm{deep},\max}^{\mathrm{out}}
  $$
  for
  $$
  t\in I_{\mathrm{deep}}.
  $$

Then the total outward self contribution from deep-past same-side roots satisfies
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(t)
\le
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
\equiv
N_{s,\mathrm{deep},\max}^{\mathrm{out}}\,
\frac{\kappa\epsilon^2}{
\big(c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2\big)\,(\nu_{\mathrm{deep}}/c_f)}
$$
for every
$$
t\in I_{\mathrm{deep}}.
$$

In particular, on the trimmed apocenter window the full outward self-drive is bounded by
$$
A_s^{\mathrm{out}}(t)
\le
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2},
$$
provided the only remaining local same-side contribution is the shell tail of Lemma 27.

Proof.
Fix
$$
t\in I_{\mathrm{deep}}
$$
and let
$$
t_s<t_a
$$
be any outward-driving same-side deep-past root with
$$
z(t_s)=z(t).
$$
Lemma 30 gives the macroscopic separation bound
$$
r_s(t;t_s)\ge c_f\tau_{\mathrm{deep}}.
$$
Lemma 31 gives the transversality bound
$$
|J_s(t;t_s)|\ge \frac{\nu_{\mathrm{deep}}}{c_f}.
$$
Therefore each deep-past branch contributes at most
$$
\frac{\kappa\epsilon^2}{
\big(r_s(t;t_s)^2+\epsilon_c^2\big)\,|J_s(t;t_s)|}
\le
\frac{\kappa\epsilon^2}{
\big(c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2\big)\,(\nu_{\mathrm{deep}}/c_f)}.
$$
Summing over at most
$$
N_{s,\mathrm{deep},\max}^{\mathrm{out}}
$$
deep-past roots yields
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(t)
\le
\overline A_{s,\mathrm{deep}}^{\mathrm{out}},
$$
which proves the first claim.

If, in addition, the only local same-side outward contribution is the shell tail on the final sub-field-speed window, Lemma 27 supplies the second term, and the stated total bound follows by addition.

**Corollary 33: Full trimmed-apocenter outer-force margin.**
Assume on the trimmed apocenter window
$$
I_{\mathrm{deep}}=[t_a+\tau_{\mathrm{deep}},\,t_b]
$$
that:

- the partner lower bound of Lemma 20 holds,
  $$
  A_p(t)\ge \underline A_p^{\mathrm{out}},
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
a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}>0,
$$
then on
$$
I_{\mathrm{deep}}
$$
the full outward self-drive is dominated and one has the unconditional inward acceleration bound
$$
\ddot x(t)\le -a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}<0.
$$

In particular, if
$$
|I_{\mathrm{deep}}|
\ge
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}},
$$
where
$$
v_{\mathrm{deep}}
\equiv
\sup_{t\in I_{\mathrm{deep}}}\dot x(t),
$$
then the same comparison argument as in Lemma 23 forces a finite outer turn inside or immediately after the trimmed window.

Proof.
By Lemma 20,
$$
A_p(t)\ge \underline A_p^{\mathrm{out}}.
$$
By Corollary 32,
$$
A_s^{\mathrm{out}}(t)
\le
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}.
$$
Therefore the signed dynamics satisfy
$$
\ddot x(t)\le -A_p(t)+A_s^{\mathrm{out}}(t)
\le
-\underline A_p^{\mathrm{out}}
+
\overline A_{s,\mathrm{deep}}^{\mathrm{out}}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}.
$$
The assumed parameter inequality gives
$$
\ddot x(t)\le -a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}<0,
$$
which proves the first claim.

If the trimmed window length dominates
$$
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{trim}}^{\mathrm{out}}},
$$
then integrating the acceleration comparison exactly as in Lemma 23 forces the outward velocity to hit zero in finite time. This yields a finite outer turn on or just beyond the trimmed apocenter interval.

**Lemma 34: Deep-past source localization by outer-level exclusion.**
Assume the first origin crossing occurs at
$$
t=0,
\qquad
x(0)=0,
$$
and let
$$
I_{\mathrm{deep}}=[t_a+\tau_{\mathrm{deep}},\,t_b]
\subseteq
[t_\ast,t_{\mathrm{turn}}^{\mathrm{out}}]
$$
be a trimmed apocenter window on the later right exterior outbound branch. Assume moreover that the outer sorting levels on the trimmed window lie strictly below the entire earlier outbound range:
$$
\sup_{t\in I_{\mathrm{deep}}} z(t)
<
\inf_{0\le s\le t_a} z(s).
$$
If
$$
t\in I_{\mathrm{deep}}
$$
and
$$
t_s<t_a
$$
satisfies
$$
z(t_s)=z(t),
$$
then necessarily
$$
t_s<0.
$$

In particular, every deep-past same-side root on the trimmed apocenter window is forced onto the pre-crossing leg.

Proof.
Fix
$$
t\in I_{\mathrm{deep}}
$$
and suppose for contradiction that
$$
0\le t_s\le t_a.
$$
Then by the assumed outbound-level exclusion one has
$$
z(t)
\le
\sup_{r\in I_{\mathrm{deep}}} z(r)
<
\inf_{0\le s\le t_a} z(s)
\le
z(t_s),
$$
which contradicts
$$
z(t_s)=z(t).
$$
Therefore
$$
t_s<0,
$$
as claimed.

**Lemma 35: Deep-past root uniqueness and automatic transversality on the pre-crossing inbound leg.**
Assume the hypotheses of Lemma 34, and assume the pre-crossing source interval
$$
[-h,0]
$$
satisfies
$$
\dot x(s)<0
\qquad
\text{for }s\in[-h,0].
$$
If
$$
t\in I_{\mathrm{deep}}
$$
and
$$
t_s<0
$$
is a same-side outward-driving self root with
$$
z(t_s)=z(t),
$$
then:

1. the source root is unique on
   $$
   [-h,0],
   $$
2. the self Jacobian satisfies the automatic lower bound
   $$
   J_s(t;t_s)=1-\frac{\dot x(t_s)}{c_f}>1,
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
\dot z(s)=\dot x(s)-c_f<-c_f<0
\qquad
\text{for }s\in[-h,0].
$$
Therefore
$$
z
$$
is strictly decreasing on
$$
[-h,0].
$$
Hence the level equation
$$
z(s)=z(t)
$$
can have at most one solution
$$
s\in[-h,0],
$$
which proves uniqueness of the deep-past source root on that interval.

For a same-side outward-driving self root on the right exterior outbound branch one has
$$
\hat r_s(t;t_s)=+1,
$$
so
$$
J_s(t;t_s)=1-\frac{\dot x(t_s)}{c_f}.
$$
Since
$$
\dot x(t_s)<0,
$$
it follows immediately that
$$
J_s(t;t_s)>1.
$$
Thus
$$
|J_s(t;t_s)|\ge 1,
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
  I_{\mathrm{deep}}=[t_a+\tau_{\mathrm{deep}},\,t_b],
  $$
- the outbound-level exclusion hypothesis of Lemma 34,
  $$
  \sup_{t\in I_{\mathrm{deep}}} z(t)
  <
  \inf_{0\le s\le t_a} z(s),
  $$
- and the pre-crossing inbound monotonicity hypothesis of Lemma 35,
  $$
  \dot x(s)<0
  \qquad
  \text{for }s\in[-h,0].
  $$

Then every deep-past same-side outward-driving root on
$$
I_{\mathrm{deep}}
$$
lies on the pre-crossing inbound leg, is unique, and satisfies
$$
|J_s(t;t_s)|\ge 1.
$$
Consequently,
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(t)
\le
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
\qquad
\text{for every }t\in I_{\mathrm{deep}}.
$$

Proof.
By Lemma 34, any deep-past same-side root with
$$
z(t_s)=z(t)
$$
must satisfy
$$
t_s<0.
$$
Lemma 35 then shows that on the pre-crossing inbound leg such a root is unique and obeys
$$
|J_s(t;t_s)|\ge 1.
$$
Lemma 30 gives the separation bound
$$
r_s(t;t_s)\ge c_f\tau_{\mathrm{deep}}.
$$
Therefore the single deep-past branch contributes at most
$$
\frac{\kappa\epsilon^2}{
\big(r_s(t;t_s)^2+\epsilon_c^2\big)\,|J_s(t;t_s)|}
\le
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2},
$$
which proves the claim.

**Corollary 37: Refined trimmed-apocenter outer-force margin.**
Assume on the trimmed apocenter window
$$
I_{\mathrm{deep}}=[t_a+\tau_{\mathrm{deep}},\,t_b]
$$
that:

- the partner lower bound of Lemma 20 holds,
  $$
  A_p(t)\ge \underline A_p^{\mathrm{out}},
  $$
- the same-side local self contribution is only the shell tail controlled by Lemma 27,
- the hypotheses of Corollary 36 hold, so the deep-past same-side contribution satisfies
  $$
  A_{s,\mathrm{deep}}^{\mathrm{out}}(t)
  \le
  \frac{\kappa\epsilon^2}{
  c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2},
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
a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}>0,
$$
then on
$$
I_{\mathrm{deep}}
$$
one has the unconditional inward acceleration bound
$$
\ddot x(t)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0.
$$

In particular, if
$$
|I_{\mathrm{deep}}|
\ge
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}},
$$
then the same comparison argument as in Lemma 23 forces a finite outer turn on or just beyond the trimmed apocenter window.

Proof.
By Lemma 20,
$$
A_p(t)\ge \underline A_p^{\mathrm{out}}.
$$
By Corollary 36,
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(t)
\le
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}.
$$
By Lemma 27, the local same-side shell leakage satisfies
$$
A_{s,\mathrm{shell,loc}}^{\mathrm{out}}(t)
\le
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}.
$$
Under the stated hypothesis that these exhaust the outward-driving self channels on
$$
I_{\mathrm{deep}},
$$
the full outward self contribution is bounded by the sum of those two terms. Therefore
$$
\ddot x(t)\le -A_p(t)+A_s^{\mathrm{out}}(t)
\le
-\underline A_p^{\mathrm{out}}
+
\frac{\kappa\epsilon^2}{
c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}
+
\frac{2\kappa\epsilon^2\,\eta\,\|\delta_\eta\|_\infty}{
\sigma_{\mathrm{out}}\,\epsilon_c^2}.
$$
The assumed parameter inequality gives
$$
\ddot x(t)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0,
$$
which proves the first claim.

If
$$
|I_{\mathrm{deep}}|
\ge
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}},
$$
then integrating the acceleration comparison exactly as in Lemma 23 forces the outward velocity to hit zero in finite time, yielding a finite outer turn on or just beyond the trimmed apocenter interval.

#### z-map descent target

The outer-turn and deep-past layers are now reduced to one remaining geometric hypothesis:
$$
\sup_{t\in I_{\mathrm{deep}}} z(t)
<
\inf_{0\le s\le t_a} z(s),
\qquad
z(t)=x(t)-c_f t.
$$
This is an exclusion statement saying that the late apocenter levels of
$$
z
$$
have descended below the entire earlier outbound range. Once this holds, the deep-past roots are forced onto the pre-crossing inbound leg by Lemma 34, and the refined outer-force margin becomes fully explicit.

> **Target Theorem (Outbound-Level Exclusion by z-Descent).**
> Assume the right exterior outbound branch starts at the first origin crossing with
> $$
> x(0)=0,
> \qquad
> \dot x(0)=V_0>c_f,
> $$
> and later develops an outer hinge time
> $$
> t_{\mathrm{hinge}}^{\mathrm{out}}
> $$
> defined by
> $$
> \dot x\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)=c_f.
> $$
> Assume further that on the post-hinge outbound branch there is a sub-field-speed deceleration window on which
> $$
> \ddot x(t)\le -a_{z}^{\mathrm{out}}<0.
> $$
> If the resulting descent of
> $$
> z(t)=x(t)-c_f t
> $$
> is large enough that, on a trimmed apocenter window
> $$
> I_{\mathrm{deep}}=[t_a+\tau_{\mathrm{deep}},\,t_b],
> $$
> one has
> $$
> \sup_{t\in I_{\mathrm{deep}}} z(t)
> <
> \inf_{0\le s\le t_a} z(s),
> $$
> then Lemma 34 applies and the deep-past same-side roots are forced onto the pre-crossing inbound leg.

This theorem isolates the final missing global shape statement for the outer sorting map. The earlier sections now reduce the outer-turn problem to proving enough descent of
$$
z
$$
after the outer hinge.

#### z-map descent ladder

The intended proof order is:

1. **Outer-hinge lemma.**
   Show that the outbound branch has a first time
   $$
   t_{\mathrm{hinge}}^{\mathrm{out}}
   $$
   with
   $$
   \dot x=c_f,
   $$
   so
   $$
   \dot z=0.
   $$
2. **Post-hinge monotonicity lemma.**
   Prove that once
   $$
   \dot x<c_f,
   $$
   the sorting map
   $$
   z(t)=x(t)-c_f t
   $$
   is strictly decreasing.
3. **Quadratic descent lemma.**
   Use the post-hinge acceleration floor to obtain an explicit estimate
   $$
   z(t)\le z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
   -
   \frac{a_{z}^{\mathrm{out}}}{2}
   \big(t-t_{\mathrm{hinge}}^{\mathrm{out}}\big)^2.
   $$
4. **Outbound-level exclusion corollary.**
   Compare this late-time upper bound with the earlier outbound range
   $$
   [0,t_a]
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
\dot x(0)=V_0>c_f,
$$
and later reaches a first outer turn at time
$$
t_{\mathrm{turn}}^{\mathrm{out}}
$$
with
$$
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0.
$$
Then there exists a first outer hinge time
$$
t_{\mathrm{hinge}}^{\mathrm{out}}
\in
(0,t_{\mathrm{turn}}^{\mathrm{out}})
$$
such that
$$
\dot x\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)=c_f.
$$
Moreover, for
$$
z(t)=x(t)-c_f t
$$
one has
$$
\dot z(t)=\dot x(t)-c_f,
$$
so
$$
\dot z(t)>0
$$
for
$$
0\le t<t_{\mathrm{hinge}}^{\mathrm{out}},
$$
and
$$
\dot z(t)\le 0
$$
for
$$
t_{\mathrm{hinge}}^{\mathrm{out}}\le t\le t_{\mathrm{turn}}^{\mathrm{out}}.
$$

Proof.
The velocity
$$
\dot x
$$
is continuous on the outbound branch. At the crossing,
$$
\dot x(0)=V_0>c_f,
$$
while at the outer turn,
$$
\dot x\!\big(t_{\mathrm{turn}}^{\mathrm{out}}\big)=0<c_f.
$$
By the intermediate value theorem there exists at least one time
$$
t\in(0,t_{\mathrm{turn}}^{\mathrm{out}})
$$
for which
$$
\dot x(t)=c_f.
$$
Define
$$
t_{\mathrm{hinge}}^{\mathrm{out}}
$$
to be the first such time. Then
$$
\dot x(t)>c_f
\qquad
\text{for }0\le t<t_{\mathrm{hinge}}^{\mathrm{out}},
$$
and by definition
$$
\dot x\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)=c_f.
$$
Therefore
$$
\dot z(t)=\dot x(t)-c_f>0
$$
before the hinge, and
$$
\dot z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)=0.
$$
If in addition the post-hinge branch remains sub-field-speed, then
$$
\dot z(t)\le 0
$$
there. This proves the stated monotonicity.

**Lemma 39: Quadratic post-hinge z-descent.**
Assume there exists a post-hinge interval
$$
[t_{\mathrm{hinge}}^{\mathrm{out}},\,t_c]
\subseteq
[t_{\mathrm{hinge}}^{\mathrm{out}},\,t_{\mathrm{turn}}^{\mathrm{out}}]
$$
on which
$$
\ddot x(t)\le -a_{z}^{\mathrm{out}}<0.
$$
Then for every
$$
t\in[t_{\mathrm{hinge}}^{\mathrm{out}},\,t_c]
$$
one has
$$
\dot z(t)\le -a_{z}^{\mathrm{out}}\big(t-t_{\mathrm{hinge}}^{\mathrm{out}}\big)
$$
and
$$
z(t)\le z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
-\frac{a_{z}^{\mathrm{out}}}{2}
\big(t-t_{\mathrm{hinge}}^{\mathrm{out}}\big)^2.
$$

Proof.
Since
$$
z(t)=x(t)-c_f t,
$$
one has
$$
\ddot z(t)=\ddot x(t).
$$
On the stated interval this gives
$$
\ddot z(t)\le -a_{z}^{\mathrm{out}}<0.
$$
At the outer hinge,
$$
\dot z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
=
\dot x\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)-c_f
=0.
$$
Integrating the acceleration bound from
$$
t_{\mathrm{hinge}}^{\mathrm{out}}
$$
to
$$
t
$$
yields
$$
\dot z(t)
\le
-a_{z}^{\mathrm{out}}
\big(t-t_{\mathrm{hinge}}^{\mathrm{out}}\big),
$$
which is the first claim. Integrating once more gives
$$
z(t)
\le
z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
-\frac{a_{z}^{\mathrm{out}}}{2}
\big(t-t_{\mathrm{hinge}}^{\mathrm{out}}\big)^2,
$$
which proves the quadratic descent estimate.

**Corollary 40: Outbound-level exclusion from explicit z-descent.**
Assume the hypotheses of Lemma 39 and let
$$
I_{\mathrm{deep}}=[t_a+\tau_{\mathrm{deep}},\,t_b]
\subseteq
[t_{\mathrm{hinge}}^{\mathrm{out}},\,t_c]
$$
be a trimmed apocenter window on the post-hinge branch. Define the earlier outbound floor
$$
m_{\mathrm{out}}^{\mathrm{early}}
\equiv
\inf_{0\le s\le t_a} z(s).
$$
If
$$
z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
-
\frac{a_{z}^{\mathrm{out}}}{2}
\big(t_a+\tau_{\mathrm{deep}}-t_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
<
m_{\mathrm{out}}^{\mathrm{early}},
$$
then the outbound-level exclusion hypothesis of Lemma 34 holds:
$$
\sup_{t\in I_{\mathrm{deep}}} z(t)
<
\inf_{0\le s\le t_a} z(s).
$$

Proof.
Because
$$
I_{\mathrm{deep}}\subseteq
[t_{\mathrm{hinge}}^{\mathrm{out}},\,t_c]
$$
and Lemma 39 gives
$$
\dot z(t)\le -a_{z}^{\mathrm{out}}\big(t-t_{\mathrm{hinge}}^{\mathrm{out}}\big)\le 0
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
\sup_{t\in I_{\mathrm{deep}}} z(t)=z(t_a+\tau_{\mathrm{deep}}).
$$
Applying Lemma 39 at
$$
t=t_a+\tau_{\mathrm{deep}}
$$
yields
$$
z(t_a+\tau_{\mathrm{deep}})
\le
z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
-
\frac{a_{z}^{\mathrm{out}}}{2}
\big(t_a+\tau_{\mathrm{deep}}-t_{\mathrm{hinge}}^{\mathrm{out}}\big)^2.
$$
If the right-hand side is strictly smaller than
$$
m_{\mathrm{out}}^{\mathrm{early}}
=
\inf_{0\le s\le t_a} z(s),
$$
then
$$
\sup_{t\in I_{\mathrm{deep}}} z(t)
<
\inf_{0\le s\le t_a} z(s),
$$
which is exactly the required outbound-level exclusion.

**Remark (Simplified earlier-outbound floor).**
Under the hypotheses of Lemma 38, the function
$$
z(t)=x(t)-c_f t
$$
is strictly increasing on
$$
[0,t_{\mathrm{hinge}}^{\mathrm{out}})
$$
and nonincreasing on
$$
[t_{\mathrm{hinge}}^{\mathrm{out}},t_a].
$$
Therefore the earlier outbound floor satisfies
$$
m_{\mathrm{out}}^{\mathrm{early}}
=
\inf_{0\le s\le t_a} z(s)
=
\min\{z(0),z(t_a)\}
=
\min\{0,z(t_a)\},
$$
because
$$
z(0)=x(0)-c_f\cdot 0=0.
$$
In particular, a sufficient condition for outbound-level exclusion is simply
$$
z(t_a+\tau_{\mathrm{deep}})<0,
$$
or more conservatively, the explicit descent inequality
$$
z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
-
\frac{a_{z}^{\mathrm{out}}}{2}
\big(t_a+\tau_{\mathrm{deep}}-t_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
<0.
$$

> **Proposition (Unified trimmed-apocenter outer-turn criterion).**
> Assume:
> 1. the partner lower bound of Lemma 20 holds on a trimmed apocenter window
>    $$
>    I_{\mathrm{deep}}=[t_a+\tau_{\mathrm{deep}},\,t_b],
>    $$
> 2. the same-side local self contribution on that window is only the shell tail controlled by Lemma 27,
> 3. the pre-crossing inbound source interval satisfies
>    $$
>    \dot x(s)<0
>    \qquad
>    \text{for }s\in[-h,0],
>    $$
> 4. the post-hinge branch satisfies the quadratic descent estimate of Lemma 39,
> 5. and the following two explicit inequalities hold:
>    $$
>    z\!\big(t_{\mathrm{hinge}}^{\mathrm{out}}\big)
>    -
>    \frac{a_{z}^{\mathrm{out}}}{2}
>    \big(t_a+\tau_{\mathrm{deep}}-t_{\mathrm{hinge}}^{\mathrm{out}}\big)^2
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
>    \ddot x(t)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
>    \qquad
>    \text{for }t\in I_{\mathrm{deep}},
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
|J_s|\ge 1.
$$
Therefore Corollary 36 yields the deep-past bound
$$
A_{s,\mathrm{deep}}^{\mathrm{out}}(t)
\le
\frac{\kappa\epsilon^2}{c_f^2\tau_{\mathrm{deep}}^2+\epsilon_c^2}.
$$
Combining that with the shell-tail bound of Lemma 27 and the partner floor of Lemma 20 gives exactly the second displayed inequality, so Corollary 37 applies and yields
$$
\ddot x(t)\le -a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}<0
\qquad
\text{on }I_{\mathrm{deep}}.
$$
If the trimmed window length dominates
$$
\frac{v_{\mathrm{deep}}}{a_{\mathrm{in},\mathrm{ref}}^{\mathrm{out}}},
$$
then the same comparison argument as in Lemma 23 forces the outward velocity to hit zero in finite time, yielding a finite outer turn on or just beyond
$$
I_{\mathrm{deep}}.
$$

#### Equal-amplitude cycling

The current delayed geometry does not naturally point to a continuous family of equal-amplitude cycles. In a purely causal delayed system, the more plausible generic picture is:

- net delayed braking at large excursion,
- net delayed pumping at small excursion,
- and an isolated balance point where the two effects cancel over one cycle.

If that picture is correct, the relevant mathematical object is an isolated fixed point of $P_\eta$, possibly attracting, rather than a one-parameter conservative orbit family. Equal-amplitude cycling is therefore plausible only if some stronger cycle-balance or exact history-functional structure is present; otherwise one should expect amplitude drift to be the generic behavior away from the fixed point.

#### Residual Scope Boundaries

The scaffold is now coherent enough to freeze as a proof program, but the following scope boundaries still need to stay explicit.

- **Origin singularity.** The shell regularization $\delta_\eta$ does not by itself remove the divergence of the amplitude factor $1/r^2$ at the origin crossing. For the current braking-dominance theorem target, an explicit core mollifier of the denominator should be treated as required rather than optional, for example by replacing $r^{-2}$ with $(r^2+\epsilon_c^2)^{-1}$ or an equivalent short-distance regularization.
- **State-space labeling.** The theorem program is safest in true signed coordinates $x\in\mathbb{R}$, with recapture phrased in the radial variable $\rho=|x|$. Any language suggesting a rebound on the same $x>0$ branch before the origin should be treated as provisional shorthand rather than as a derived dynamical fact.
- **Physical plausibility boundary.** In the collinear geometry the self term is not a centrifugal barrier. On the physically relevant post-crossing outbound branch it tends to reinforce the current radial motion. So the only plausible recapture mechanism in this model is that delayed partner attraction eventually dominates that outward self-drive on the outer leg. If the outer-turn theorem target fails, then the collinear breather should be read as a failed stabilization test rather than as an almost-closed proof.
- **Apocenter-entry window.** Lemma 29 now supplies the strict sub-field-speed window from a coarse entry-brake margin, or else reaches the outer turn before that window is needed. The global proof still has to include the coarse entry-brake ceiling inside the coupled parameter regime rather than smuggling it in through the local z-map argument.
- **Past-velocity transversality.** The Jacobians $J_p$ and $J_s$ depend on emission-time velocities, not current velocity. Turning through $\dot x=0$ at the present time does not by itself preserve transversality, so the lower bounds on $|J|$ must be checked against the delayed high-speed part of the history.
- **Partner-root inequality, not equality.** As the trajectory brakes after the crossing, the true partner distance can only become smaller than the leading linear prediction, which strengthens the partner force. So the partner-root estimate should be used as an upper bound on $r_p(t)$ and therefore a lower bound on $A_p^{\rho}(t)$, not as an exact identity on the nonlinear window.
- **Inner rebound region.** The theorem program still packages the actual near-center reversal into the admissible history class. That is acceptable for the current reduced problem, but it means the hardest local dynamics near the inner rebound is not yet derived from first principles here.
- **Root multiplicity control.** The branch sums defining $A_p$, $A_s^{\text{out}}$, and $A_s^{\text{in}}$ are only tame if the number of active roots stays controlled. The regularized model softens each branch contribution, but it does not by itself prevent root proliferation from defeating the envelope bounds.
- **Candidate-packet falsification.** A rejected candidate packet may preserve useful diagnostics, such as strict subrows, fold normal forms, or range gaps, but those diagnostics do not promote the packet into a branch chart. Once a pre-ledger leaves a positive-width parent-complement overlap, a residual equality core, or an uncertified endpoint-scale gap, the same packet cannot feed the corridor, monodromy, returned-sample, topology, or Schauder rows.
- **Compactness is conditional.** The added acceleration bound is the right first step toward precompactness in $C^1$, but a later fixed-point theorem will still need the exact topology and continuity properties of the return map to be verified rather than assumed.
- **Continuity through the crossing.** The theorem uses a history class in which velocity is continuous through $t=0$, but the dual-mollified acceleration can still develop a very sharp gradient near the origin. Any Banach-space formulation must therefore keep enough Lipschitz-velocity, or weak acceleration, control near the boundary of the history interval that the delayed integrals remain well behaved at the crossing.

### Capstone Statement

The existence capstone of the manuscript is the Schauder theorem target above. In compressed form, the final 1D statement is:

> **Theorem Target (Dual-Mollified Collinear Breather).**
> For some nonempty parameter regime
> $$
> (\kappa,\epsilon,c_f,\eta,h,x_\ast)
> $$
> and some closed convex tame envelope
> $$
> \mathcal{K}_{x_\ast,\eta}\subseteq \Sigma^-_{x_\ast,\eta},
> $$
> the return map $P_\eta$ has a fixed point
> $$
> \phi^\ast_\eta \in \mathcal{K}_{x_\ast,\eta},
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

This is the first clean theorem target for a self-hit-assisted bounded-recapture mechanism. It avoids the 2D circular tangential obstruction and does not require the full tri-binary architecture.

### Why This Reduced Problem Comes First

This model should be attacked before the full circular MCB or full tri-binary for three reasons.

#### 1. No tangential obstruction

The circular binary has a tangential no-go problem. The 1D model has no tangential channel at all. That removes the main obstruction already visible in the planar circular analysis.

#### 2. Exact scalar Jacobians

In 1D,
$$
\hat r \in \{-1,+1\},
$$
so the delay-map Jacobians reduce to explicit scalar factors
$$
J_p = 1+\frac{\dot x(t_0)\hat r_p}{c_f},
\qquad
J_s = 1-\frac{\dot x(t_0)\hat r_s}{c_f}.
$$
This makes the branch geometry much easier to track analytically.

#### 3. Direct test of the self-hit mechanism

If the collinear breather does not exist even after regularization, then the claim that delayed self-interaction can participate in a bounded binary-recapture mechanism is badly weakened. If the target theorem is eventually closed, then the theory would gain its first rigorous bounded delayed attractor.

### What Counts as Success or Failure

#### Success

This reduced problem succeeds if it supports a proof program for:

- local well-posedness of the regularized 1D dynamics,
- well-defined first-return times on a nontrivial section,
- existence of a fixed point of $P_\eta$,
- and, ideally, local stability of that fixed point.

#### Failure

This reduced problem fails as a stabilization test if:

- the return map is not well defined on any robust section,
- all trajectories escape or collapse instead of returning,
- the self-hit branches do not produce reversal strongly enough to create recurrence,
- or the $\eta\to 0^+$ limit destroys every regularized bounded orbit.

### Appendix: Why a Closed-Form Solution Is Unlikely

The following boxed aside is heuristic rather than theorem-level. Its purpose is not to prove a no-closed-form theorem, but to explain why the fixed-point and envelope route is mathematically more realistic than a search for an explicit formula
$$
x(t)=f(t,X_0,V_0).
$$
Here "closed-form solution" means an elementary formula for the orbit. It does not mean that the evolution law itself is unavailable. The dual-mollified absolute-time integral law is already an exact certified-law target; branch sums are local reductions on simple-root charts.

> **Heuristic aside.**
>
> The symmetries of the 1D line make a closed formula tempting. One might hope for an expression
> $$
> x(t)=f(t,X_0,V_0)
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
> t=0^+,
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
> |x(t)\pm x(t_s)|=c_f(t-t_s).
> $$
> The timeline is being solved for at the same moment as the trajectory. The equation is not merely nonlinear; it is continually rewriting its own delayed arguments through the unknown path history.
>
> **3. The caustic changes the root topology.**
> At the hinge
> $$
> \dot x=-c_f,
> $$
> a new self-hit branch is born. The number of active roots changes with the motion itself. Whatever one chooses to call a "closed form," it should not be expected to glide effortlessly across a dynamics in which the active branch structure changes as the trajectory passes through a causal fold.
>
> **4. The shadow of the three-body problem still hangs over the room.**
> Even instantaneous inverse-square dynamics already taught us that explicit formulas are not to be expected in generic nonlinear few-body problems. Here the 1D breather may look like a two-body problem, but the delayed self-interaction makes it behave like a path-history problem with an effectively infinite swarm of past images. One should not expect such a system to become simpler merely because it lives on a line.
>
> **The silver lining.**
> This is why the present strategy is mathematically appropriate. It replaces the search for a global closed-form solution with a proof target that is stronger for the purpose of the chapter:
>
> - existence of the delayed orbit,
> - uniqueness once the history is fixed,
> - boundedness inside an invariant envelope,
> - and a fixed point of the return map.
>
> In other words, we do not need a formula for
> $$
> x(t)
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

### Related Chapters

- [master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md)
- [binary-dynamics.md](../../../../markdown/aaa/dynamics/binary-dynamics.md)
- [causal-action-functional.md](../../../../markdown/aaa/dynamics/causal-action-functional.md)
- [energy.md](../../../../markdown/aaa/dynamics/energy.md)
- [dyadic-resonance-lock.md](../../../../markdown/aaa/dynamics/dyadic-resonance-lock.md)

## Closed-Form Collinear Breather Ansatz

This note starts a parallel ansatz program for the 1D collinear breather. It does not replace the fixed-point proof architecture in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md). Its purpose is to generate certificate data for that proof program. A closed-form or closed-by-quadrature orbit is useful only insofar as it produces a candidate cycle, a branch chart, a mesh, and return residuals with strict audit slack.

This program is optional for the existence proof. The proof does not need an elementary closed-form orbit; it needs one candidate certified cycle and a finite certificate for the return map on a closed convex tame domain.

The external breather literature supplies useful terminology pressure but not a
mechanism that can be imported into this proof. In this chapter, `breather`
means a bounded delayed return-map fixed point in the collinear
$\mathbb{A}\mathbb{A}\mathbb{A}$ reduction. Standard nonlinear-wave breathers
are comparison objects; they do not replace the causal-root ledger, fold-layer
integrals, returned-history residuals, or Schauder-domain audit needed here.

Negative breather results sharpen the same rule. In a nonintegrable wave
equation, a formal expansion can be valid to all orders while the true dynamics
still leak energy and fail to contain an exact localized periodic solution. The
$\mathbb{A}\mathbb{A}\mathbb{A}$ consequence is not to import that radiation
mechanism; it is to refuse promotion from formal closure alone. A candidate
history remains approximate until fold-layer budgets, returned-history
residuals, and the closed convex self-map audit are all certified on the same
packet.

The integrable and near-integrable nonlinear Schrodinger catalogs strengthen
the terminology boundary. Their coherent profiles, Darboux constructions,
rogue-wave limits, and degenerate-breather limits depend on equation classes
and conservation structures not present in the delayed architrino law. They are
useful only as a checklist for native certification: the ansatz must declare
which variables are certificate coordinates, which limit or degeneration is
being taken, and which separator or fold layer remains bounded in the causal-root
ledger. A limit that exists only in the external equation is not an ansatz
transfer.

Perturbation nonpersistence results give the same refusal in another form. If a
candidate survives only because an exact integrable symmetry or cancellation is
kept intact, it is not a proof route for this certificate. The collinear program
must show survival under the dual-mollified delayed law itself, with leakage
channels closed by certificate rows rather than by analogy to a special wave
equation.

The same discipline applies to construction methods. A numerical enclosure,
validated quadrature orbit, or interval-collocation solve is equivalent to a
closed-form ansatz only if it produces the same finite candidate packet:
period, section/symmetry chart, representation coefficients, mesh, residual
targets, causal pre-ledger inputs, and branch-chart inputs on one certified
domain.

The state-dependent-delay periodic-orbit literature gives the methodological
reason for this rule. A periodic boundary-value problem can be reduced locally
to algebraic root finding only when the finite vector is tied to a projection
from histories and a reconstruction back into the history space. For this
collinear certificate, a residual vector is therefore not just a numerical fit:
it must record the projection/reconstruction convention, the local neighborhood
where the reduction is meant to hold, and the regularity assumptions that make
the returned history meaningful.

Collocation adds a second discipline. The piecewise polynomial is a candidate
representation of a periodic boundary-value problem, not a proof object by
itself. A collocation packet must state the subinterval partition, polynomial
degree, collocation nodes, period normalization, and section anchoring used to
remove time-translation symmetry. Mesh-node superconvergence, meaning extra
accuracy at selected nodes, is not assumed as a global bound; separator and
origin layers need interval residual bounds on cells, not only small residuals
at mesh points.

Continuation and finite auxiliary ODE constructions are useful only at the
candidate-source level. A continued branch point or auxiliary-system orbit must
reconstruct to the declared signed history, period, mesh, separator layers, and
causal-root ledger before it can feed the certificate. Nonuniform
transition-layer behavior near separators must be bounded by interval cell
estimates, not inferred from small residuals at isolated nodes.

The accepted output of this note is therefore a certificate packet
$$
\mathfrak{C}_{\mathrm{ans}}
=
\left(
\phi_{\mathrm{cyc}},
T,
\mathcal{B}_{\mathrm{act}},
\{\theta_j\}_{j=0}^{N},
\{R_j^x,R_j^v\}_{j=0}^{N}
\right),
$$
where
$$
\phi_{\mathrm{cyc}}
$$
is the candidate cycle,
$$
T
$$
is its proposed period,
$$
\mathcal{B}_{\mathrm{act}}
$$
is the finite active branch list with inactive complements, and the sampled residuals feed the finite audit in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md).

The guiding suspicion is:

- below field speed, the active causal roots are tame and the force may reduce to a small number of effective $1/r$ phase-space curves, with conservative potential curves only as a certified special case;
- at field speed, the sorting maps become marginal and the orbit passes through a metastable separator;
- above field speed, the active branch structure changes and must be matched by explicit crossing laws rather than by one smooth formula.

If a closed-form collinear breather exists, it is likely not one elementary expression on the whole line. The more plausible object is a piecewise analytic orbit whose pieces are joined by causal matching conditions at the field-speed separators and at origin crossings.

### Status

This is an ansatz document, not a theorem. It records the first closed-form search path and the algebraic tests needed before it can feed the finite certificate program in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md).

The target object is a candidate history
$$
\phi_{\mathrm{cyc}},
$$
because the finite Schauder audit now needs an instantiated center history, a mesh, and certificate data. A closed-form ansatz is useful exactly if it can produce that
$$
\phi_{\mathrm{cyc}}
$$
without first solving the return-map fixed point abstractly. A numerical enclosure, validated quadrature orbit, or other certified construction would serve the same proof role if it supplies the same certificate rows.

The governing law for that certification is the dual-mollified absolute-time integral law from [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md). Branch-sum formulas inside this note are working reductions on finite simple-root charts, not replacements for the integral law through separator layers or causal folds.

The first explicit velocity-class packet has sharpened this status without proving a breather. A fixed cosine candidate fails at the parent-complement part of the null-coordinate pre-ledger: after the accepted simple-root windows and fold-layer diagnostics are removed, residual equality cores remain in the parent complements. Those diagnostics are useful, but they do not authorize branch-chart construction. The next candidate source must therefore be a fresh fold-adapted collocation packet, or an equivalent certified construction, whose null-coordinate pre-ledger passes before any active branch chart is built.

### Variables and Speed Classes

Work in the same reflection-symmetric 1D reduction as the main note:
$$
x_1(t)=-x(t),
\qquad
x_2(t)=x(t),
$$
with field speed
$$
c_f>0.
$$
For this ansatz it is useful to introduce the radial speed
$$
u(t)\equiv |\dot x(t)|
$$
and the field-speed shorthand
$$
v_f\equiv c_f.
$$

The three speed classes are:

1. **sub-field branch**
   $$
   u(t)<v_f;
   $$
2. **field-speed separator**
   $$
   u(t)=v_f;
   $$
3. **super-field branch**
   $$
   u(t)>v_f.
   $$

The signed sorting maps from the main proof remain the natural branch variables:
$$
w(t)=x(t)+c_f t,
\qquad
z(t)=x(t)-c_f t.
$$
On an outbound right branch,
$$
\dot z(t)=\dot x(t)-c_f.
$$
Thus
$$
\dot x<c_f,
\qquad
\dot x=c_f,
\qquad
\dot x>c_f
$$
mean, respectively, that
$$
z
$$
is decreasing, stationary, or increasing. The separator
$$
\dot x=c_f
$$
is therefore not merely a speed value; it is a causal sorting transition.

### Constant-Velocity Causal Algebra

The simplest way to see where a closed form might come from is to freeze the velocity locally. Suppose
$$
x(t_0)\approx x(t)-v(t-t_0),
\qquad
v=\dot x(t).
$$
For a partner hit, the causal equation is
$$
x(t)+x(t_0)=c_f(t-t_0).
$$
Writing
$$
\tau=t-t_0,
$$
gives
$$
2x=(c_f+v)\tau,
\qquad
\tau_p=\frac{2x}{c_f+v}.
$$
The causal partner distance is therefore
$$
r_p=c_f\tau_p=\frac{2c_f x}{c_f+v},
$$
and the branch Jacobian is
$$
J_p=1+\frac{v}{c_f}.
$$
Ignoring the short-distance core for a moment, the partner force scale becomes
$$
A_p
\sim
\frac{\kappa\epsilon^2}{r_p^2J_p}
=
\frac{\kappa\epsilon^2(c_f+v)}{4c_f x^2}.
$$
With
$$
\beta\equiv \frac{v}{c_f},
\qquad
g\equiv \kappa\epsilon^2,
$$
this reads
$$
A_p
\sim
\frac{g(1+\beta)}{4x^2}.
$$

This is not, by itself, a conservative potential curve. The Jacobian factor makes the affine partner force velocity dependent, so the local model is a Lienard-type phase equation. On the bare affine partner chart,
$$
\ddot x
=
-\frac{g}{4x^2}
\left(1+\frac{\dot x}{c_f}\right).
$$
Writing
$$
v(x)=\dot x,
\qquad
\ddot x=v\frac{dv}{dx},
$$
gives the separable phase equation
$$
\frac{v}{1+v/c_f}\,dv
=
-\frac{g}{4x^2}\,dx.
$$
Hence the exact affine partner invariant is
$$
c_f v-c_f^2\ln|c_f+v|
=
\frac{g}{4x}+C_{\mathcal{R}}.
$$
This implicit phase-space curve replaces the naive energy curve on the affine partner chart. The logarithmic term also exposes a useful topology check: in the unsoftened affine partner model, reaching
$$
v=-c_f
$$
requires
$$
x\to0.
$$
Thus the inbound field-speed separator and the origin-crossing layer are tightly coupled in the bare model. The dual core scale
$$
\epsilon_c
$$
and shell width
$$
\eta
$$
soften this coincidence, but the certificate should still treat the separator and origin layer as coupled events unless interval data prove a strict separation.

The exact core-mollified version replaces
$$
x^2
$$
by the corresponding branch distance square plus
$$
\epsilon_c^2.
$$
When a conservative approximation is separately certified, the candidate potential curves should use
$$
R_{\epsilon_c}(r)\equiv \sqrt{r^2+\epsilon_c^2}
$$
rather than a bare
$$
|r|.
$$

#### Sub-field-speed partner-only benchmark

The sub-field comparison case must be generated from the force law, not prescribed as a future path. On the exterior affine partner chart above, fix initial data
$$
x(0)=x_0>0,
\qquad
\dot x(0)=c_f\beta_0,
\qquad
-1<\beta_0\le0,
$$
and evolve by
$$
\ddot x
=
-\frac{g}{4x^2}
\left(1+\frac{\dot x}{c_f}\right).
$$
The held-release preparation supplies one concrete source of such initial data. If the pre-release source is held at $-x_0$ and
$$
y(t)\equiv x(t)+x_0,
$$
then the held-source segment has
$$
y(\theta)=2x_0\cos^2\theta,
\qquad
x(\theta)=x_0\cos(2\theta),
\qquad
\dot x(\theta)=-\sqrt{\frac{g}{x_0}}\tan\theta.
$$
The first moving-partner wake reaches the receiver at the unique angle satisfying
$$
\cos^2\theta_\ast
=
\rho\left(\theta_\ast+\sin\theta_\ast\cos\theta_\ast\right),
\qquad
\rho\equiv c_f\sqrt{\frac{x_0}{g}}.
$$
For $x_0=1.25$, $g=1$, and $c_f=1$, this gives
$$
x_\ast\approx0.8707972823389274,
\qquad
\beta_\ast\approx-0.37820836925058077.
$$
Thus the exterior Lambert branch can be initialized from a finite sub-field-speed handoff rather than from the rejected exact field-speed head-on prehistory.

With
$$
\alpha=\frac{g}{4c_f^2},
$$
the exact phase invariant is
$$
\beta-\beta_0
-\ln\!\left(\frac{1+\beta}{1+\beta_0}\right)
=
\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right),
\qquad
\beta=\frac{\dot x}{c_f}.
$$
Equivalently, if
$$
S(x)=\beta_0-\ln(1+\beta_0)+\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right),
$$
then the two analytic velocity branches are
$$
\beta_k(x)
=
-1-\operatorname{W}_k\!\left(-e^{-(S(x)+1)}\right).
$$
The inbound sub-field branch is
$$
\beta_{\mathrm{in}}(x)
=
-1-\operatorname{W}_0\!\left(-e^{-(S(x)+1)}\right),
$$
and satisfies $-1<\beta_{\mathrm{in}}(x)<0$ for every $x>0$ on the exterior chart. The outbound branch uses the other real Lambert branch when the same invariant is continued away from the core layer. The branch time is recovered by
$$
t-t_0
=
\int_x^{x_0}\frac{d\xi}{-c_f\,\beta_{\mathrm{in}}(\xi)}.
$$

This gives a controlled analytic baseline for a sub-field-speed breather search. The exterior partner branch does not reach
$$
|\dot x|=c_f
$$
at any finite $x>0$; the logarithm diverges as $\beta\to-1^+$. Therefore a finite-radius field-speed separator is not produced by this action-generated partner chart. It must come from a core-layer effect, finite shell width, nonaffine path history, a self-image contribution, or a different certified branch chart.

The same branch also supplies an exact self-root exclusion test in the sharp-shell limit. If a candidate history satisfies
$$
|\dot x(t)|\le c_f-\sigma
\qquad
\text{on a stored interval}
$$
for some $\sigma>0$, then for all $s<t$ in that interval,
$$
|x(t)-x(s)|
\le
(c_f-\sigma)(t-s)
<
c_f(t-s).
$$
Thus the exact same-side self-hit equation has no nontrivial solution there. For finite shell width $\eta$, the possible self contribution is confined to the near-diagonal collar
$$
0<t-s\le \frac{\eta}{\sigma},
$$
and must be bounded from the dual-mollified integral law rather than inserted as an exact simple-root branch. This separates the analytic sub-field test from the field-speed fold program: the test asks whether partner attraction plus the finite-width self-collar can close a return without ever producing a true field-speed separator.

#### Signed partner branch table

The local affine partner calculation should now be kept as a table of certified branch data. Work on an exterior chart
$$
x(t)=\sigma q(t),
\qquad
q(t)>0,
\qquad
\sigma\in\{-1,+1\},
$$
with radial velocity
$$
u_r(t)\equiv \dot q(t).
$$
On a locally affine same-exterior window,
$$
q(s)\approx q(t)-u_r(t)(t-s),
$$
the partner root has
$$
\tau_p=t-s=\frac{2q}{c_f+u_r},
\qquad
r_p=c_f\tau_p,
\qquad
\hat r_p=\sigma,
\qquad
J_p=1+\frac{u_r}{c_f}.
$$
The signed partner acceleration in the
$$
x
$$
coordinate points as
$$
\operatorname{sgn}(a_p)=-\sigma,
$$
that is, inward toward the origin.

| Arc chart | Radial assumptions | $\tau_p$ | $\hat r_p$ | $J_p$ | Partner sign in $x$ | Validity conditions |
| --- | --- | --- | --- | --- | --- | --- |
| inbound exterior | $q>0$, $u_r<0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | $1+\dfrac{u_r}{c_f}$ | $-\sigma$ | $c_f+u_r\ge \nu c_f$, no origin crossing inside the affine window |
| field-speed hinge | $u_r=-c_f$ | singular | $\sigma$ before the fold | $0$ | fold-controlled | branch-sum form invalid; use the dual-mollified fold integral |
| origin-crossing layer | $q\lesssim \epsilon_c$ or $\sigma$ changes | not a single affine root | changes by layer | chart-dependent | core-controlled | use the absolute-time integral law, not one exterior branch table |
| outbound exterior | $q>0$, $u_r>0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | $1+\dfrac{u_r}{c_f}>1$ | $-\sigma$ | same exterior chart and certified active root |
| apocenter sub-field | $q>0$, $|u_r|<c_f$, $u_r\to 0$ | $\dfrac{2q}{c_f+u_r}$ | $\sigma$ | near $1$ | $-\sigma$ | strict sub-field margin and active-root separation on the apocenter window |

This table is only the partner column of the certificate packet. The self-image columns must be produced separately because their source and receiver are the same labeled path and their active roots can change at field-speed separators.

### Why the Field-Speed Separator Matters

For same-side self hits on an affine segment,
$$
|x(t)-x(t_0)|=|v|\tau.
$$
The exact causal shell equation is
$$
|v|\tau=c_f\tau.
$$
For
$$
\tau>0,
$$
this is possible only when
$$
|v|=c_f.
$$
Therefore a perfectly affine segment has no same-side exact self root away from the field-speed separator. Self branches appear because the real trajectory is not globally affine: acceleration, origin crossing, and later return geometry let a present point meet older path-history images.

This suggests a closed-form strategy:

1. solve sub-field and super-field segments as certified phase-space arcs, using Lienard quadrature where the causal Jacobian remains velocity dependent;
2. treat the field-speed separator as the event where causal images are born, die, or switch branch labels;
3. impose matching laws at those separator events.

The separator is metastable in the sense that small perturbations decide whether the sorting map keeps descending, stalls, or reverses. In the dual-mollified model the separator should become a thin transition layer rather than an infinite impulse.

#### Separator normal form and fold scaling

For certificate purposes, the field-speed separator is a codimension-one event surface in the reduced phase data together with an active branch label:
$$
\Sigma_{\mathcal{B}}
=
\{(x,v,\mathcal{B}): |v|=c_f\}.
$$
Here
$$
\mathcal{B}
$$
is part of the state description, because crossing
$$
\Sigma_{\mathcal{B}}
$$
can create, annihilate, or relabel path-history roots even when
$$
(x,v)
$$
remains continuous.

Near a separator event, the dual-mollified vector field should be treated as a regularized perturbation of the bare branch-sum field. The shell width
$$
\eta
$$
and core radius
$$
\epsilon_c
$$
are then small but fixed certificate parameters, not limiting symbols to be discarded before the impulse budget is computed.

Let
$$
g(t,s;\lambda)=0
$$
denote one signed causal-root defect on a local chart, with
$$
\lambda
$$
the transverse separator coordinate. A generic branch-topology change has the fold normal form
$$
g(t,s;\lambda)
=
a(s-s_\Sigma)^2+b\lambda
+O(|s-s_\Sigma|^3+|\lambda||s-s_\Sigma|+\lambda^2),
\qquad
ab\ne 0.
$$
Thus the active-root change is a saddle-node of branch labels: two simple roots are born or annihilated as the sign of
$$
b\lambda/a
$$
changes. In the dual-mollified chart, the shell support
$$
|g|\lesssim\eta
$$
gives the fold-root thickness
$$
|s-s_\Sigma|=O(\eta^{1/2}).
$$
Under a transverse passage through the fold coordinate, the unresolved fold layer has the same
$$
O(\eta^{1/2})
$$
clock-time scale after reparametrizing by the local fold coordinate. If a concrete chart uses a different clock normalization, the certificate must record the interval enclosure directly.

Consequently the fold impulse ceiling is not a free assertion. It must be supplied by an interval bound of the form
$$
|\Delta v_\Sigma|
\le
I^{\mathrm{fold}}_{\eta,\epsilon_c}
\le
C_\Sigma\eta^{1/2}
A_{\Sigma,\eta,\epsilon_c},
$$
where
$$
A_{\Sigma,\eta,\epsilon_c}
$$
is an interval upper bound for the dual-mollified acceleration on the certified fold tube and
$$
C_\Sigma
$$
is the corresponding transversality constant. The certificate may use a sharper direct quadrature bound, but it must expose the normal-form constants and the resulting finite slack.

### Piecewise Chart Ansatz

Let
$$
\mathcal{R}
\in
\{<,=,>\}
$$
denote a speed class relative to
$$
v_f.
$$
On each open region away from the separator, first fix a branch chart
$$
\mathcal{I}_{\mathcal{R}}
$$
containing the active partner and self-image data. On that chart the delayed force should first be written as a phase-space law
$$
v\frac{dv}{dx}
=
F_{\mathcal{R}}(x,v;\mathcal{I}_{\mathcal{R}}),
\qquad
v=\dot x,
$$
with the path-history data in
$$
\mathcal{I}_{\mathcal{R}}
$$
held fixed by the certificate.

The affine partner calculation gives the model row
$$
v\frac{dv}{dx}
=
-\frac{g}{4x^2}\left(1+\frac{v}{c_f}\right),
$$
with exact implicit quadrature
$$
c_f v-c_f^2\ln|c_f+v|
=
\frac{g}{4x}+C_{\mathcal{R}}.
$$
More generally, if the certified branch chart yields a separable Lienard row
$$
\frac{v}{Q_{\mathcal{R}}(v)}\,dv
=
P_{\mathcal{R}}(x)\,dx,
$$
the quadrature invariant is
$$
\int^v \frac{\zeta}{Q_{\mathcal{R}}(\zeta)}\,d\zeta
-
\int^x P_{\mathcal{R}}(\xi)\,d\xi
=
C_{\mathcal{R}}.
$$
This is the preferred closed-form object for branch charts with velocity-dependent causal Jacobians.

A conservative potential is allowed only as a special certified reduction. The required condition is
$$
F_{\mathcal{R}}(x,v;\mathcal{I}_{\mathcal{R}})
=
-\partial_x U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})
$$
with no residual
$$
v
$$
dependence after the active image data are fixed. If that identity is proved, the arc may use the energy equation
$$
\frac{1}{2}\dot x^2+U_{\mathcal{R}}(x;\mathcal{I}_{\mathcal{R}})=E_{\mathcal{R}}.
$$
Absent that proof, the chart must use the Lienard phase invariant, direct interval quadrature, or collocation residuals for the dual-mollified absolute-time law.

Thus the ansatz search reduces to two questions:

1. Can the active image distances
   $$
   r_p(x),
   \qquad
   r_{s,m}(x)
   $$
   be expressed and certified on each fixed branch chart?
2. Do the separator impulse laws and returned-history residuals close after one full cycle?

### Minimal Four-Arc Breather Skeleton

A first closed-form skeleton should use four arcs:

1. **Inbound sub-field arc**
   $$
   x=x_\ast,
   \qquad
   \dot x=-u_\ast,
   \qquad
   0<u_\ast<c_f.
   $$
   This arc falls toward the origin under partner attraction and controlled self-image terms.
2. **Origin-crossing layer**
   The signed coordinate changes branch. The dual core scale
   $$
   \epsilon_c
   $$
   regularizes the near-origin amplitude, and the shell width
   $$
   \eta
   $$
   regularizes the causal-shell selection.
3. **Outbound super-field or near-field-speed arc**
   The right branch moves outward. If
   $$
   \dot x>c_f,
   $$
   the sorting map
   $$
   z=x-c_f t
   $$
   reverses monotonicity and the active image list must be updated.
4. **Apocenter sub-field recapture arc**
   The branch enters
   $$
   0\le \dot x<c_f
   $$
   before turning. On this arc the partner term should dominate the outward self-image terms, producing the final turn and return to
   $$
   x=x_\ast,
   \qquad
   \dot x<0.
   $$

#### Velocity-class itinerary ledger

The four arc names above are a compressed return graph, not yet a complete velocity-class itinerary. Define
$$
\mathfrak{v}(t)\in
\{\mathsf{S}_{\mathrm{sub}},\mathsf{S}_{\mathrm{sep}},\mathsf{S}_{\mathrm{sup}}\}
$$
by
$$
\mathsf{S}_{\mathrm{sub}}:\ |\dot x|<c_f,
\qquad
\mathsf{S}_{\mathrm{sep}}:\ |\dot x|=c_f,
\qquad
\mathsf{S}_{\mathrm{sup}}:\ |\dot x|>c_f.
$$
A full origin-crossing breather may pass through more separator events than the compressed four-arc naming suggests. The current self-image table below assumes the simple compressed itinerary in which the apocenter recapture remains sub-field after the outer separator. Before using that table as a certificate input, the ansatz packet must specify the actual itinerary.

Two admissible itinerary templates are:
$$
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}},
$$
the doubled four-arc itinerary, and
$$
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}},
$$
a glancing apocenter itinerary in which the path touches the separator without entering another super-field arc. These templates have different self-image tables. The certificate generator should therefore key every branch table by the chosen itinerary
$$
\mathcal{K}
$$
and its ordered interval list
$$
I_1(\mathcal{K}),\ldots,I_m(\mathcal{K}).
$$

For the first certificate attempt, use the doubled four-arc itinerary. It is the generic transverse choice: every field-speed separator is treated as a simple fold event, while the glancing itinerary is reserved as a fallback if the generic branch enumeration fails or the corridor arithmetic forces a degenerate outer turn.

The periodicity condition is not merely
$$
x(T)=x(0).
$$
It is the returned-history condition
$$
P_\eta(\phi)=\phi.
$$
For the closed-form ansatz, the finite approximation is to require equality on the sampled certificate mesh:
$$
P_\eta(\phi)(\theta_j)=\phi(\theta_j),
\qquad
\partial_\theta P_\eta(\phi)(\theta_j)=\dot\phi(\theta_j),
\qquad
0\le j\le N.
$$

### Itinerary-Keyed Self-Image Enumeration

The decisive algebraic test is not the partner root. It is the same-path self-root equation
$$
|x(t)-x(s)|=c_f(t-s),
\qquad
s<t,
$$
across the four-arc skeleton.

For the compressed four-arc itinerary, let the candidate cycle be partitioned into four time intervals:
$$
I_1=\text{inbound sub-field},
\qquad
I_2=\text{origin-crossing layer},
$$
$$
I_3=\text{outbound super-field or near-field-speed},
\qquad
I_4=\text{apocenter sub-field recapture}.
$$
For any richer itinerary
$$
\mathcal{K},
$$
replace this list by
$$
I_1(\mathcal{K}),\ldots,I_m(\mathcal{K})
$$
and fill the same table over all ordered interval pairs. The sixteen-row table below is therefore not the universal branch table; it is the compressed four-arc case.

For each ordered pair
$$
(\alpha,\beta)\in\{1,2,3,4\}^2,
$$
with
$$
t\in I_\alpha,
\qquad
s\in I_\beta,
\qquad
s<t,
$$
solve the two signed defects
$$
g^{\pm}_{\alpha\beta}(t,s)
\equiv
\pm\bigl(x_\alpha(t)-x_\beta(s)\bigr)-c_f(t-s)
=0,
$$
subject to the sign consistency condition
$$
\pm\bigl(x_\alpha(t)-x_\beta(s)\bigr)>0.
$$
On an affine pair of arcs,
$$
x_\alpha(t)=a_\alpha+v_\alpha t,
\qquad
x_\beta(s)=a_\beta+v_\beta s,
$$
write the orientation sign as
$$
\chi\in\{-1,+1\}.
$$
The signed self-image defect is
$$
g_{\alpha\beta}^{\chi}(t,s)
=
\chi\bigl(x_\alpha(t)-x_\beta(s)\bigr)-c_f(t-s).
$$
If the source-side denominator has a certified floor
$$
\left|c_f-\chi v_\beta\right|\ge \nu_{\alpha\beta}c_f>0,
$$
then the affine root is explicit:
$$
s_{\alpha\beta}^{\chi}(t)
=
\frac{(c_f-\chi v_\alpha)t-\chi(a_\alpha-a_\beta)}
{c_f-\chi v_\beta}.
$$
The source Jacobian on that row is
$$
J_{\alpha\beta}^{\chi}
=
1-\frac{\chi v_\beta}{c_f}
=
\frac{c_f-\chi v_\beta}{c_f}.
$$
Thus every affine self-image row reduces to interval validation of the following predicates:
$$
t\in I_\alpha,
\qquad
s_{\alpha\beta}^{\chi}(t)\in I_\beta,
\qquad
s_{\alpha\beta}^{\chi}(t)<t,
$$
$$
0<t-s_{\alpha\beta}^{\chi}(t)\le h,
\qquad
\chi\bigl(x_\alpha(t)-x_\beta(s_{\alpha\beta}^{\chi}(t))\bigr)>0,
\qquad
\left|J_{\alpha\beta}^{\chi}\right|\ge \nu_{\alpha\beta}.
$$
If the denominator loses its floor, the row is not a simple affine branch; it is a separator or fold row and must be certified by the dual-mollified fold normal form rather than by the branch-sum formula.

#### Null-coordinate causal pre-ledger

Before running interval root validation, reduce the search by a 1D Minkowski diagnostic. Use null coordinates
$$
u(t)=c_f t-x(t),
\qquad
w(t)=c_f t+x(t).
$$
The self-image equation
$$
|x(t)-x(s)|=c_f(t-s),
\qquad
s<t,
$$
splits into two exact ledgers:
$$
x(t)>x(s)
\quad\Longleftrightarrow\quad
u(t)=u(s),
$$
and
$$
x(t)<x(s)
\quad\Longleftrightarrow\quad
w(t)=w(s).
$$
Geometrically, this is just the intersection of the path with the past-directed causal cone from
$$
(x(t),c_f t).
$$
Computationally, it means that each ordered arc pair
$$
(I_\alpha,I_\beta)
$$
should be preclassified by interval ranges of
$$
u(I_\alpha),
\quad
u(I_\beta),
\quad
w(I_\alpha),
\quad
w(I_\beta).
$$
If the relevant null-coordinate ranges are disjoint, that block of the self-image table is empty before any root solve. If the ranges overlap on monotone subarcs, the root count is the number of interval-certified level crossings, and the sign of
$$
\hat r_s
$$
is already known from whether the
$$
u
$$
or
$$
w
$$
ledger is active.

This also fixes the Jacobian sign test in a coordinate-free way:
$$
J_u=\frac{d u/ds}{c_f}=1-\frac{\dot x(s)}{c_f},
\qquad
J_w=\frac{d w/ds}{c_f}=1+\frac{\dot x(s)}{c_f}.
$$
The interval validator should therefore start from a causal pre-ledger with three outcomes for each block:

1. null-coordinate ranges disjoint, so the block is certified empty;
2. ranges overlap with monotone source and receiver subarcs, so the root count and sign are bounded before solving;
3. a separator or turning interval is present, so the block must be split or sent to the fold-layer certificate.

> **Target Theorem (Null-Coordinate Causal Pre-Ledger).**
> Fix a proposed velocity-class itinerary
> $$
> \mathcal{K}
> $$
> with ordered arc partition
> $$
> I_1(\mathcal{K}),\ldots,I_m(\mathcal{K})
> $$
> and a compact certificate tube around a candidate history. Suppose the interval enclosures for
> $$
> u=c_f t-x,
> \qquad
> w=c_f t+x
> $$
> split every ordered receiver-source block
> $$
> (I_\alpha,I_\beta)
> $$
> into finitely many subblocks, each of which is either range-disjoint, monotone with a positive derivative floor, or contained in a certified separator/fold layer. Then the self-image equation
> $$
> |x(t)-x(s)|=c_f(t-s),
> \qquad
> s<t,
> $$
> admits a finite causal pre-ledger
> $$
> \mathcal{L}_{\mathcal{K}}
> $$
> assigning each subblock one of three certified statuses:
> empty, simple-root, or fold-layer. Empty subblocks contain no self-image roots. Simple-root subblocks carry interval enclosures for the root count, root sign, source Jacobian floor, memory-depth range, and contribution sign. Fold-layer subblocks are excluded from branch-sum reduction until the dual-mollified fold certificate supplies a parity-preserving incoming-to-outgoing transition.
>
> The finite partition must also consume the parent-complement strips left after accepted simple-root and fold-layer subblocks have been removed. A parent-complement strip
> $$
> B
> $$
> is accepted only if it has strict null-coordinate range separation, endpoint-excluded singleton contact under the declared boundary convention, exact certified fold-layer coverage, or another already accepted same-packet complement predicate. Positive-width null-coordinate overlap, a residual equality core, or an uncertified endpoint-scale gap rejects the candidate before branch-chart certification.
>
> Completing this theorem target is the first seed-chart gate. If
> $$
> \mathcal{L}_{\mathcal{K}}
> $$
> cannot be made finite with strict empty-block gaps, monotone-block floors, and fold-layer bounds, the chosen itinerary or candidate history fails before quadrature, collocation residuals, or coupled-corridor arithmetic become relevant.

Proof route. Range-disjoint blocks are empty by direct interval separation of the relevant null coordinate. On monotone subblocks, the one-dimensional inverse function theorem and interval endpoint tests give finite level crossings, root enclosures, and the corresponding
$$
J_u
\quad
\text{or}
\quad
J_w
$$
floor. Separator and turning blocks are not forced into simple-root charts; they are routed to the fold normal form and must preserve
$$
\Delta N\in 2\mathbb{Z},
\qquad
\Delta D=0
$$
before the pre-ledger can feed the active branch chart.

For every root branch, record
$$
\hat r_s=\operatorname{sgn}(x_\alpha(t)-x_\beta(s)),
\qquad
J_s
=
1-\frac{\dot x_\beta(s)\hat r_s}{c_f},
$$
the interval of existence, and the contribution sign in the reduced equation. Also record the signed degree contribution
$$
D_{\alpha\beta}
=
\sum_{g_{\alpha\beta}^{\pm}(t,s)=0}
\operatorname{sgn} J_s,
$$
with the sum taken over certified root branches on that interval pair. On a simple-root chart with a positive Jacobian floor, this degree equals the unsigned root count. Near separators it is the invariant that survives the fold.

##### Separator fold rows and the excluded diagonal

The first local repair to the affine self-image table is to keep the diagonal exclusion and the fold layer in the same calculation. Let
$$
y\in\{u,w\}
$$
be the active null coordinate near a separator source time
$$
s_\Sigma,
$$
and assume a nondegenerate local maximum
$$
y'(s_\Sigma)=0,
\qquad
y''(s_\Sigma)=-\alpha,
\qquad
\alpha>0.
$$
For a receiver level
$$
y(t)=y(s_\Sigma)-\lambda,
\qquad
\lambda>0,
$$
the source-side fold equation has the normal form
$$
y(s)-y(t)
=
\lambda-\frac{\alpha}{2}(s-s_\Sigma)^2
+O(|s-s_\Sigma|^3).
$$
Hence the two local source branches are
$$
s_\pm(t)
=
s_\Sigma\pm\sqrt{\frac{2\lambda}{\alpha}}
+O(\lambda).
$$
Their null-coordinate Jacobians are
$$
J_y(s_\pm)
=
\frac{y'(s_\pm)}{c_f}
=
\mp\frac{\sqrt{2\alpha\lambda}}{c_f}
+O(\lambda),
$$
so the two branches carry opposite signed degree and the fold preserves
$$
\Delta D=0.
$$
The memory-depth tests are
$$
0<t-s_\Sigma+\sqrt{\frac{2\lambda}{\alpha}}+O(\lambda)\le h
$$
for
$$
s_-,
$$
and
$$
0<t-s_\Sigma-\sqrt{\frac{2\lambda}{\alpha}}+O(\lambda)\le h
$$
for
$$
s_+.
$$
When the receiver is still on the same outgoing source arc, the
$$
s_+
$$
branch may coincide with the excluded diagonal
$$
s=t
$$
to leading order. That branch is not an accepted simple-root contribution, but it is still part of the separator fold layer. It becomes a nontrivial branch only after the receiver leaves the outgoing source arc and the memory-depth inequality becomes strict.

Applied to the simplified doubled four-arc affine check, this repairs the apparent odd branch birth at the first and third separators. At
$$
\Sigma_1,
$$
the active fold is the
$$
w
$$
ledger. The pre-fold branch has positive degree and matches the nontrivial
$$
w
$$
roots that continue through the adjacent source copies; the post-fold branch has negative degree and is initially diagonal-carried before becoming the second nontrivial
$$
w
$$
root on the later receiver block. At
$$
\Sigma_3,
$$
the same calculation holds in the
$$
u
$$
ledger. Thus a one-root affine row immediately after a separator is not by itself a parity violation. It is a separator fold row whose missing opposite-degree partner is carried by the excluded diagonal until it emerges into a later ordered block.

This calculation gives a concrete obstruction to using a piecewise-affine table as a complete certificate: the affine row can identify the visible simple-root branch, but it cannot certify the separator unless the fold-layer chart records the hidden diagonal-carried partner, its opposite Jacobian sign, and its memory-depth exit into a nontrivial source interval.

The enumeration deliverable is the following table, filled with exact formulas or interval-validated enclosures:

| Receiver arc $I_\alpha$ | Source arc $I_\beta$ | Root count $N$ | Signed degree $D$ | Root formula or enclosure | $\hat r_s$ | $J_s$ floor | Contribution sign | Separator jumps | Certificate status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $I_1$ | $I_1$ | target | target | target | target | target | target | target | open |
| $I_1$ | $I_2$ | target | target | target | target | target | target | target | open |
| $I_1$ | $I_3$ | target | target | target | target | target | target | target | open |
| $I_1$ | $I_4$ | target | target | target | target | target | target | target | open |
| $I_2$ | $I_1$ | target | target | target | target | target | target | target | open |
| $I_2$ | $I_2$ | target | target | target | target | target | target | target | open |
| $I_2$ | $I_3$ | target | target | target | target | target | target | target | open |
| $I_2$ | $I_4$ | target | target | target | target | target | target | target | open |
| $I_3$ | $I_1$ | target | target | target | target | target | target | target | open |
| $I_3$ | $I_2$ | target | target | target | target | target | target | target | open |
| $I_3$ | $I_3$ | target | target | target | target | target | target | target | open |
| $I_3$ | $I_4$ | target | target | target | target | target | target | target | open |
| $I_4$ | $I_1$ | target | target | target | target | target | target | target | open |
| $I_4$ | $I_2$ | target | target | target | target | target | target | target | open |
| $I_4$ | $I_3$ | target | target | target | target | target | target | target | open |
| $I_4$ | $I_4$ | target | target | target | target | target | target | target | open |

The parity check is imported from Proposition 3 in [master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md): generic folds create or annihilate one root pair, so
$$
\Delta N\in 2\mathbb{Z},
\qquad
\Delta D=0.
$$
On a closed cycle the branch ledger must return to itself, hence
$$
\sum_{\Sigma}\Delta N=0,
\qquad
\sum_{\Sigma}\Delta D=0,
$$
with every local unsigned jump even. This is a discrete consistency test on the ansatz. A candidate branch list that fails it should be rejected before any quadrature or collocation residual is computed.

#### Causal-Root Ledger and Action Bookkeeping

The enumeration table is also the bridge to the discrete-step language in [energy.md](../../../../markdown/aaa/dynamics/energy.md). Let
$$
N_{\alpha\beta}
$$
denote the unsigned self-root count in an itinerary-keyed row, and let
$$
M_{\alpha\beta}
$$
denote the analogous partner-root channel count supplied by the partner branch table. The pair
$$
(N_{\alpha\beta},M_{\alpha\beta})
$$
is the local causal-root ledger for that arc pair.

On a fixed simple-root chart with fixed
$$
(N_{\alpha\beta},M_{\alpha\beta},D_{\alpha\beta}),
$$
the motion is still continuous and any energy or phase quadrature is ordinary continuous bookkeeping. No separate energy atom is inserted. A discrete action step enters only when a separator or fold changes the admissible integer ledger. In the raw self-root table, a generic fold changes the unsigned root count by an even jump,
$$
\Delta N\in 2\mathbb{Z},
$$
while preserving
$$
\Delta D=0.
$$
When that root pair is grouped as one newly active channel for action-angle bookkeeping, the same event is recorded as one channel update. This is the sense in which an $h$-like transaction can correspond to
$$
N\to N+1
\qquad\text{or}\qquad
M\to M+1
$$
in the grouped causal-root ledger, without treating energy itself as discontinuous at the substrate level.

Thus any claimed $h$-like or $2h$-like energy step must be backed by three certificate facts: the branch-list update across the separator, the parity law for the underlying simple roots, and returned-history closure of the full cycle. This is the precise route by which continuous delayed geometry can produce discrete effective action bookkeeping.

If this table closes to a finite branch list with strict separation, memory-depth, and Jacobian floors, the ansatz can feed the finite certificate audit. If the self images do not close algebraically into a finite list, the next certificate generator should be a piecewise fractionally augmented Chebyshev or cubic
$$
C^1
$$
collocation history
$$
\phi_{\mathrm{cyc}}
$$
with interval validation of the finite active branches and the returned-history residuals. The accepted output is strict residual slack, not a compact symbolic formula.

### Separator Matching Laws

At every separator time
$$
t_\Sigma
$$
where
$$
|\dot x(t_\Sigma)|=c_f,
$$
the matching law must come from the dual-mollified fold calculation rather than from an assumed conservative energy jump. Choose a fold layer
$$
[t_\Sigma-\Delta,t_\Sigma+\Delta]
$$
on which the simple-root branch-sum chart is replaced by the dual-mollified integral law. The separator impulse is
$$
\Delta v_\Sigma
=
\int_{t_\Sigma-\Delta}^{t_\Sigma+\Delta}
a^{\mathrm{fold}}_{\eta,\epsilon_c}(t)\,dt.
$$

The ansatz must impose four matching conditions:

1. **position continuity**
   $$
   x(t_\Sigma^-)=x(t_\Sigma^+);
   $$
2. **controlled velocity increment across the fold layer**
   $$
   \dot x(t_\Sigma+\Delta)-\dot x(t_\Sigma-\Delta)=\Delta v_\Sigma,
   $$
3. **branch-list update**
   $$
   \mathcal{I}_{\mathcal{R}^-}
   \longrightarrow
   \mathcal{I}_{\mathcal{R}^+};
   $$
4. **certificate budget update**
   $$
   |\Delta v_\Sigma|
   \le
   I^{\mathrm{fold}}_{\eta,\epsilon_c},
   $$
   where
   $$
   I^{\mathrm{fold}}_{\eta,\epsilon_c}
   $$
   is the finite caustic-transit impulse ceiling imported from the proof scaffold.

The normal-form section above makes this ceiling an auditable number. For each separator, the ansatz packet must report the local fold coefficients
$$
a,
\qquad
b,
$$
the transversality constant
$$
C_\Sigma,
$$
the shell and core parameters
$$
(\eta,\epsilon_c),
$$
and either the bound
$$
I^{\mathrm{fold}}_{\eta,\epsilon_c}
\le
C_\Sigma\eta^{1/2}A_{\Sigma,\eta,\epsilon_c}
$$
or a sharper interval quadrature bound over the certified fold layer. The matching law is usable only after this finite impulse estimate has strict slack against the adjacent arc budgets.

This formulation keeps the separator tied to the same estimates used in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md). Energy constants on the adjacent arcs may still be useful bookkeeping devices, but they are not the primitive matching data at
$$
|\dot x|=c_f.
$$

### Fold-Adapted Fractional Basis

Pure polynomial splines are not the preferred certificate basis near a field-speed separator. The fold normal form produces square-root source-time scaling in the simple-root reduction. In the bare fold model this gives a local hierarchy of the form
$$
\Delta v(\tau)\sim |\tau|^{1/2},
\qquad
\Delta x(\tau)\sim |\tau|^{3/2},
\qquad
\tau=t-t_\Sigma.
$$
The dual mollifiers make the actual certificate function smooth at fixed
$$
(\eta,\epsilon_c),
$$
but the unsoftened fold asymptotic remains the right shape for reducing residuals and avoiding artificial derivative ringing.

Near every certified separator, use a fractionally augmented local basis
$$
\phi_{\mathrm{local}}(\tau)
=
a_0+a_1\tau+a_{3/2}|\tau|^{3/2}
+a_2\tau^2+a_{5/2}|\tau|^{5/2}+\cdots,
$$
optionally multiplied by a compact blending function that hands off to the ordinary polynomial or Chebyshev basis outside the fold layer. The coefficients
$$
a_{3/2},
\qquad
a_{5/2},
\ldots
$$
are not aesthetic parameters; they encode the known separator singularity budget. The interval report should record which separator layers use the fractional basis, the layer radii, and the residual improvement against the velocity sample budget
$$
R_j^v+L_j^v r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4}.
$$

Away from separators, ordinary Chebyshev, cubic, or other validated bases remain acceptable. The required standard is not polynomial purity; it is strict interval slack in the returned-history residuals and the branch-chart margins.

The parent-complement obstruction gives the fresh collocation packet a concrete construction test, not merely another rejection condition. Let
$$
C(\mathbf a)=0
$$
denote the structural constraints of a candidate packet: section anchoring, symmetry, separator equations, $C^1$ matching, fold nondegeneracy, origin placement, and neutral-coordinate fixing. For each unresolved parent complement
$$
C_m=R_m\times S_m,
$$
choose a signed null-coordinate gap
$$
\delta_m(\mathbf a)
$$
that is positive exactly when the receiver and source ranges are strictly separated. A useful collocation basis must admit a tangent direction
$$
DC(\mathbf a_0)\xi=0,
\qquad
D\delta_m(\mathbf a_0)\xi>0
$$
for all unresolved complements at the provisional packet
$$
\mathbf a_0.
$$
Then a nearby structural candidate opens those gaps to first order, while already strict margins persist for sufficiently small deformation. This is the mathematical reason the next packet must change the null-coordinate geometry itself; refining the rejected cosine mesh cannot remove fixed-history equality collars.

### What Would Count as a Successful Closed-Form Candidate

A closed-form candidate is successful only as a certificate generator. It is not a separate proof route.

A candidate ansatz packet must produce:

1. a history
   $$
   \phi_{\mathrm{cyc}}\in C^1([-h,0]);
   $$
2. a period
   $$
   T>0;
   $$
3. a finite active branch list
   $$
   \mathcal{B}_{\mathrm{act}}
   $$
   on every arc, together with inactive branch complements;
4. an itinerary ledger
   $$
   \mathcal{K}
   $$
   and an itinerary-keyed self-image table with root counts, signed degrees, grouped channel counts, and separator parity jumps;
5. a symmetry chart, either apocenter-even in
   $$
   q
   $$
   or origin-crossing-odd in
   $$
   x,
   $$
   together with the paired branch-label rule;
6. a neutral-coordinate audit identifying every continuous freedom that leaves the same physical certificate unchanged. At minimum this includes the removed time-shift freedom, any declared reflection or relabeling symmetry, and any ansatz parameter whose first variation is tangent to the candidate branch rather than transverse to it. In finite form, if
   $$
   \alpha^a
   $$
   are ansatz coordinates and
   $$
   Z_a(\theta)\equiv \frac{\partial \phi_{\mathrm{cyc}}(\theta;\alpha)}{\partial \alpha^a},
   $$
   then the certificate must classify each
   $$
   Z_a
   $$
   as section-fixed, symmetry-neutral, or genuinely deforming before monodromy or residual rows are interpreted;
7. a null-coordinate causal pre-ledger in
   $$
   u=c_f t-x,
   \qquad
   w=c_f t+x,
   $$
   marking empty, candidate nonempty, and fold-split self-image blocks before interval root solving;
8. a certificate mesh
   $$
   \{\theta_j\}_{j=0}^{N}
   \subset[-h,0];
   $$
9. algebraic, Lienard phase quadrature, fractionally augmented Chebyshev or cubic
   $$
   C^1,
   $$
   or other interval-validated formulas for each arc;
10. separator impulse laws at every
   $$
   |\dot x|=c_f
   $$
   event, including the fold normal-form constants and finite impulse bounds;
11. a bifurcation-parameter sweep over
   $$
   (\eta,\epsilon_c,V_{\max})
   $$
   or a justified lower-dimensional slice, identifying the region where the itinerary is admissible, the required roots exist, inactive-root gaps are positive, and fold impulses are finite;
12. returned-history residuals
   $$
   R_j^x,
   \qquad
   R_j^v
   $$
   small enough to feed the finite certificate audit in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md).

The last item is essential. A visually plausible orbit is not enough. The ansatz must produce the certificate data:
$$
\nu_{\mathrm{seed}},
\quad
\gamma_{\mathrm{gap}},
\quad
\gamma_h,
\quad
\gamma_{\mathrm{env}},
$$
the factorized corridor coefficients,
and the returned-sample residuals or boundary budgets.

#### Seed-chart pre-ledger acceptance rule

The first machine-checkable gate is the null-coordinate pre-ledger, not the returned residual. For every ordered receiver-source block
$$
(I_\alpha,I_\beta),
$$
define the range gaps
$$
\Delta^u_{\alpha\beta}
=
\operatorname{dist}\!\big(u(I_\alpha),u(I_\beta)\big),
\qquad
\Delta^w_{\alpha\beta}
=
\operatorname{dist}\!\big(w(I_\alpha),w(I_\beta)\big).
$$
The row is empty when the relevant gap is strictly positive. It is a simple-root row only when the corresponding source-side derivative floor is positive:
$$
\inf_{s\in I_\beta}
\left|1-\frac{\dot x(s)}{c_f}\right|>0
\qquad
\text{for the }u\text{ ledger},
$$
or
$$
\inf_{s\in I_\beta}
\left|1+\frac{\dot x(s)}{c_f}\right|>0
\qquad
\text{for the }w\text{ ledger}.
$$
Rows that satisfy neither test must be split or routed to a fold-layer certificate. A candidate
$$
\phi_{\mathrm{cyc}}
$$
does not advance to branch-chart certification while any ordered block remains unresolved.

The same acceptance rule applies to parent complements. After accepted simple-root and fold-layer subrows are removed from a parent block, every leftover parent-complement strip must be accepted by strict null-coordinate range separation, endpoint-excluded singleton contact under the declared boundary convention, exact fold-layer coverage, or another already accepted same-packet complement predicate. Any positive-width overlap, residual equality core, or uncertified endpoint-scale gap rejects the packet before branch-chart work.

At a separator row, a single visible simple root adjacent to the fold is not enough to pass the pre-ledger. The fold-layer certificate must also account for any opposite-degree branch that is temporarily carried by the excluded diagonal
$$
s=t
$$
and prove either its continued diagonal exclusion or its later strict memory-depth entry as a nontrivial source branch.

This rule makes the pre-ledger a genuine falsification gate. A failed row rejects the candidate history, the chosen split, or the itinerary before corridor arithmetic, monodromy, or returned-sample preservation is attempted. A passed pre-ledger still does not prove the breather; it only permits construction of the active branch chart with inactive complements, Jacobian floors, memory-depth ranges, and contribution signs on the same sampled domain.

### First Working Guess

Closed-by-quadrature is only one possible certificate generator. A two-parameter family is generally too small unless the cycle symmetry is built into the parametrization: the compressed skeleton has arc-junction conditions, separator impulse conditions, branch-list updates, and a returned-history residual.

The first analytic guess should therefore be at least a three-parameter family:
$$
\phi_{\mathrm{cyc}}(\theta;u_\ast,X_\ast,C_{>}),
$$
where
$$
X_\ast=x_\ast,
\qquad
0<u_\ast<c_f,
$$
and
$$
C_{>}
$$
is the phase-curve or shape parameter for the super-field arc. It should not be interpreted as a conservative energy unless the fixed branch chart has separately passed the potential-reduction test. In a collocation version,
$$
C_{>}
$$
is replaced by the analogous independent shape coefficient for the inner super-field segment.

On a fixed affine partner chart, the default quadrature arc is generated by the Lienard phase invariant
$$
c_f v-c_f^2\ln|c_f+v|
=
\frac{g}{4x}+C_{\mathcal{R}},
\qquad
v=\dot x.
$$
When self-image terms are included, this invariant is replaced by the corresponding certified phase quadrature or by interval collocation of the dual-mollified absolute-time law. A potential curve of the form
$$
\frac{1}{2}\dot x^2+U_{\mathcal{R}}(x)=E_{\mathcal{R}}
$$
is admissible only on a fixed branch chart where the delayed force has already been shown to be an exact
$$
-\partial_x U_{\mathcal{R}}
$$
derivative along that chart.

The more certificate-friendly parallel guess is a piecewise fractionally augmented Chebyshev or cubic
$$
C^1
$$
history with unknown coefficients
$$
\phi_{\mathrm{cyc}}(\theta;\mathbf{a}),
$$
chosen by collocation against the dual-mollified absolute-time law. In that version, the active branch list and returned residuals are interval-validated directly rather than inferred from symbolic quadrature.

The first reduction should impose cycle-reversal symmetry rather than leave periodicity to unrestricted shooting. One convenient phase choice places the apocenter at
$$
\theta=0
$$
and imposes the radial condition
$$
q(-\theta)=q(\theta),
\qquad
\dot q(0)=0.
$$
Equivalently, a signed-coordinate chart centered on an origin crossing may impose the odd sheet condition
$$
x(-\theta)=-x(\theta).
$$
The certificate must state which symmetry chart is used and how the branch labels pair under the symmetry. When the paired branch ledger and regularization preserve this cycle-reversal symmetry, the net-work integral cancels by parity:
$$
\oint F_{\mathrm{net}}\,dx=0.
$$
If the causal-delay branch data do not pair in this way, the failure appears as a returned-history residual rather than as an adjustable energy defect. This is why the symmetry constraint belongs in the ansatz, not as a post-hoc interpretation of a numerically closed orbit.

The parameters
$$
u_\ast,
\qquad
X_\ast,
\qquad
C_{>}
$$
are then chosen so that the returned section state satisfies
$$
x(T)=x_\ast,
\qquad
\dot x(T)=-u_\ast,
$$
the outer and inner separator impulses match the adjacent arcs, and the sampled history residuals are minimized. In the intended symmetric case,
$$
C_{>}
$$
is determined by separator matching from the apocenter side while
$$
u_\ast
$$
is determined by the outer separator and returned section condition.

In the strict closed-form version, the residuals vanish:
$$
R_{j,\pm}^x=0,
\qquad
R_{j,\pm}^v=0.
$$
In a certificate version, they only need to satisfy
$$
R_{j,\pm}^{x}+L_j^x r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4},
\qquad
R_{j,\pm}^{v}+L_j^v r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4}.
$$

### Immediate Derivation Tasks

1. Use the action-generated sub-field test case as the first analytic baseline: compare the held-source energy segment, the Lambert-$W$ exterior partner branch, and the finite-width self-collar before accepting any field-speed separator as dynamically produced.
2. Complete the signed partner branch table for affine and fixed-chart arcs, including the core-mollified force coefficient and validity margins.
3. Compute the separator normal-form constants and fold-layer impulse bounds for every proposed
   $$
   |\dot x|=c_f
   $$
   event.
4. Use the doubled four-arc itinerary as the first admissible velocity-class itinerary
   $$
   \mathcal{K}
   $$
   and key the arc partition to that itinerary rather than assuming the compressed four-arc graph by default.
5. Choose the symmetry chart: apocenter-even in
   $$
   q
   $$
   or origin-crossing-odd in
   $$
   x,
   $$
   and record the paired branch-label rule.
6. Build and discharge the theorem target `Null-Coordinate Causal Pre-Ledger` in
   $$
   u=c_f t-x,
   \qquad
   w=c_f t+x,
   $$
   producing the finite ledger
   $$
   \mathcal{L}_{\mathcal{K}}
   $$
   with certified empty blocks, simple-root blocks, and separator/fold blocks.
6. Use
   $$
   \mathcal{L}_{\mathcal{K}}
   $$
   to fill the itinerary-keyed self-image enumeration table for
   $$
   |x(t)-x(s)|=c_f(t-s)
   $$
   on every ordered arc pair
   $$
   (I_\alpha,I_\beta).
   $$
7. Add the parity ledger
   $$
   \Delta N\in 2\mathbb{Z},
   \qquad
   \Delta D=0
   $$
   at every generic fold and verify that the closed-cycle sums vanish.
8. Record the grouped causal-root ledger
   $$
   (N,M)
   $$
   used for action bookkeeping, distinguishing it from the raw simple-root counts whenever fold pairs are grouped into one active channel.
9. If the pre-ledger or self-image table fails to close with strict finite margins, reject the current itinerary/candidate packet before attempting quadrature or collocation residuals. A fixed candidate whose parent-complement ranges retain positive-width overlap is not rescued by mesh refinement alone.
10. If the current candidate fails at that gate, instantiate a fresh fold-adapted piecewise collocation candidate, with the same-packet null-coordinate pre-ledger as its first acceptance row.
11. If the self-image table closes, convert it into
   $$
   \mathcal{B}_{\mathrm{act}},
   $$
   inactive branch complements, Jacobian floors, separation margins, and memory-depth bounds.
12. If the self-image table closes topologically but does not close algebraically, build a piecewise fractionally augmented Chebyshev or cubic
   $$
   C^1
   $$
   collocation history
   $$
   \phi_{\mathrm{cyc}}
   $$
   and certify the finite active branches numerically by interval validation.
13. Sweep
   $$
   (\eta,\epsilon_c,V_{\max})
   $$
   or a justified lower-dimensional slice to locate the itinerary-admissible parameter region before attempting the full corridor certificate.
14. Build the first certificate packet
   $$
   \mathfrak{C}_{\mathrm{ans}}
   $$
   and compute its returned section residuals.
15. If the residuals have strict slack, compute the finite certificate data and test the five audit rows in [collinear-breather.md](../../../../markdown/aaa/proof-programs/collinear-breather.md).

### Provisional Assessment

The ansatz is plausible because the partner force on a locally affine branch already collapses to a velocity-weighted inverse-square law with an exact implicit phase invariant. On a fixed branch chart, that is the sort of structure that can generate a natural
$$
1/r
$$
phase-space curve; a conservative potential curve is only a special certified reduction.

The hard part is the same-side self-image term. If the self images collapse to a finite branch list across the field-speed separator, a closed-form or closed-by-quadrature certificate packet is credible. If they do not close algebraically, the next route is still productive: use a spline or collocation
$$
\phi_{\mathrm{cyc}}
$$
and certify the finite active branches numerically.

The first doubled-itinerary affine check has a sharper conclusion: the apparent odd simple-root births at the first and third separators are separator fold rows with one opposite-degree branch carried by the excluded diagonal, not completed branch-chart rows. The first fixed candidate also shows that parent-complement equality cores can remain after useful subrow and fold diagnostics are extracted. The next concrete calculation is therefore not another branch chart on that fixed candidate, but a fresh fold-adapted collocation packet whose null-coordinate pre-ledger consumes every ordered row before any branch-chart, residual, or corridor work begins. The accepted output is the finite audit packet, not an elegant formula.

## Planar Bridge Closure

### Purpose

This chapter isolates the first higher-dimensional closure problem that can move the dynamics stack forward in a decisive way. The exact delayed law is already stated in [Master Equation of Motion](../../../../markdown/aaa/dynamics/master-equation.md), and the branch-topology machinery is already formalized in [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md). What is still missing is a theorem-backed bridge showing that a genuinely planar delayed system admits a controlled section class, local branch regularity, bounded caustic transit, a genuine radial turnaround, and a return map that closes on a controlled envelope.

The planar bridge is the first regime where the proof architecture must leave the line while still retaining enough symmetry to remain mathematically tractable. If this bridge closes, it becomes the substrate basis for planar lock, terminal aligned modes, and the horizon-facing chirality questions developed in [Horizon Chirality and Planar Spin](../../../../markdown/aaa/spacetime/horizon-chirality.md). If it fails, the failure should identify the exact geometric obstruction rather than leaving the whole closure program underdetermined.

### Position in the Dynamics Stack

The present chapter sits between four existing layers:

1. the exact delayed equations in [Master Equation of Motion](../../../../markdown/aaa/dynamics/master-equation.md),
2. the topological branch formalism in [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md),
3. the reduced return-map success in [1D Collinear Breather](../../../../markdown/aaa/proof-programs/collinear-breather.md),
4. the higher-dimensional program statement in [Master-Equation Breather Program](../../../../markdown/aaa/proof-programs/master-equation-breather.md).

The role of this chapter is narrower than the full breather program. It does not attempt immediate many-body closure. It focuses on the first planar binary regime in which line-order arguments fail, tangential escape becomes real, and branch topology must be controlled in tandem with radial recapture rather than in a separate later chapter.

### Reduced Planar Bridge Regime

Work in the reflection-symmetric planar two-body subclass
$$
\mathbf{x}_1(t)=-\mathbf{r}(t),
\qquad
\mathbf{x}_2(t)=\mathbf{r}(t),
\qquad
\mathbf{r}(t)\in \Pi\cong\mathbb{R}^2,
\qquad
q_1=-\epsilon,
\qquad
q_2=+\epsilon.
$$
Write
$$
\rho(t)\equiv \|\mathbf{r}(t)\|,
\qquad
\hat{\mathbf e}_r(t)\equiv \frac{\mathbf r(t)}{\rho(t)},
\qquad
\hat{\mathbf e}_\theta(t)\equiv R_{\pi/2}\hat{\mathbf e}_r(t),
$$
and decompose
$$
\dot{\mathbf r}(t)=u_r(t)\hat{\mathbf e}_r(t)+u_\theta(t)\hat{\mathbf e}_\theta(t).
$$

This is the smallest regime that still contains all the new burdens that matter:

- branch sorting is no longer inherited from a line order,
- recapture must control both radial and tangential escape,
- rotational symmetry must be reduced without destroying a convex return domain,
- and self-hit geometry must remain tame across a full excursion.

### Rotational Gauge and Return Section

The natural section should remove rigid planar rotation locally and fix only one genuine return constraint. The reduced gauge choice is
$$
\mathbf r(0)=\rho_\ast \mathbf e_1,
\qquad
\mathbf e_2\cdot \dot{\mathbf r}(0)>0,
$$
so that the section-defining equality is
$$
\rho(0)=\rho_\ast.
$$

This choice serves three purposes:

- it removes time-shift and rigid-rotation redundancy cleanly enough for a return map,
- it keeps the section codimension one in the reduced history space,
- and it avoids building the proof on a non-affine section whose geometry is hard to close under convexity arguments.

The first local target is stricter than mere section definition: histories in the seed packet should satisfy a quantitative transversality condition
$$
\dot{\rho}(0)\le -u_r<0,
$$
so that the first return time is not born tangent to the section. Without such a margin, the gauge-reset map for the returned history need not depend continuously on the return event.

### Local Cone Control and Branch Regularity

The first branch theorem should be local, not global. The correct opening package is a directional-cone result showing that the post-section planar velocity remains inside a strict admissible angular sector for a controlled time window. This is the planar replacement for 1D line ordering.

The target statement is of the following form:

> On an admissible planar seed packet, the delayed chords and instantaneous velocities remain inside a finite directional atlas on a short post-section interval, with quantitative angular separation from the Jacobian-null directions.

The right conceptual bridge to [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md) is the causal locus picture. In the regular regime, branch labels remain locally constant and can change only when
$$
F(t,t')=0,
\qquad
\nabla F(t,t')=0.
$$
So the opening burden is not yet a whole-cycle branch census. It is to prove enough local transversality that the planar delayed geometry stays away from the singular directions long enough to support a finite branch atlas on an initial excursion slab.

This local cone control is the first point at which the planar program can either gain traction or expose a real obstruction.

### Delay-Adapted Angle Control

The Jacobian
$$
J=1-\frac{\mathbf v\cdot \hat{\mathbf r}}{c_f}
$$
depends on the angle between the instantaneous velocity and the delayed chord. Planar closure therefore needs a delay-adapted moving frame that tracks this angle directly rather than only through coarse Cartesian bounds.

The working geometric data are:

- the radial/tangential decomposition relative to $(\hat{\mathbf e}_r,\hat{\mathbf e}_\theta)$,
- the angular offset between $\mathbf v(t)$ and each active delayed chord,
- and a finite sector atlas controlling how those offsets evolve.

The immediate theorem target is a finite-time cone-transversality estimate implying
$$
J\ge \nu>0
$$
on a controlled interval before the first fold tube is entered.

### Bounded Caustic Transit

The planar bridge should not assume that the full excursion avoids every Jacobian-null event. The hinge at which self-hit branches are born is part of the mechanism and must be crossed in a controlled way.

The right target is therefore a bounded fold-transit theorem:

> When an admissible history enters a sufficiently small tubular neighborhood of a planar fold where $F=0$ and $\nabla F=0$, the dual-mollified delayed impulse remains finite and the outgoing history stays inside an explicitly controlled post-fold sector.

This is the first place where the topological criterion from [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md) must be combined with quantitative delayed dynamics rather than cited abstractly.

### Radial Turnaround Versus Centrifugal Leakage

A planar breather is fundamentally a radial turnaround problem. The main escape channel is not an abstract vector norm; it is the centrifugal barrier generated by tangential motion. The correct recapture target is therefore a strict radial majorization of the form
$$
\ddot{\rho}
=
a_r^{\mathrm{partner}}
+a_r^{\mathrm{self}}
+\rho\dot{\vartheta}^2
\le
-\mathfrak M_{\mathrm{in}}<0
$$
on the inbound leg, with sign conventions chosen consistently with the delayed force decomposition.

The proof burden splits into two parts:

- partner attraction and delayed memory must produce enough inward radial impulse,
- tangential forcing must remain bounded strongly enough that the centrifugal term does not outrun radial braking before the turn.

This makes tangential control subordinate but essential. Tangential dynamics do not supply a separate closure theorem; they must be bounded tightly enough to prevent centrifugal leakage from destroying the radial return.

#### Radial leakage-budget target

The external breather comparison adds one useful discipline: a formal oscillatory
ansatz is not enough when a nonintegrable system can leak energy or drift out of
the putative bound state. In the planar bridge, the corresponding failure
channel is tangential leakage. The first radial-turnaround theorem should
therefore be written as an integrated budget, not only as a pointwise slogan.

Nonpersistence and degenerate-breather comparisons make this burden stricter. A
planar bridge is not allowed to inherit stability from a line or from an
integrable breather family. The theorem must show that tangential leakage,
gauge-reset discontinuity, and separator or fold transit remain bounded after
the symmetry-breaking perturbation is present. If the required cancellation
exists only in a comparison equation, the planar bridge fails rather than being
rescued by analogy.

Rigidity comparisons sharpen this into a transport criterion. A collinear fixed
point is not planar evidence unless the planar packet proves its own branch
chart, continuous gauge reset, bounded fold/separator transit, and radial
leakage budget with strict margins. If those rows close only because the line
removes tangential escape or because an external integrable equation supplies
cancellations, the correct conclusion is non-transport rather than inherited
stability.

Let
$$
I_{\mathrm{turn}}=[t_a,t_b]
$$
be the first candidate outward-to-inward turnaround window in the reduced
planar history, with
$$
\dot\rho(t_a)>0.
$$
Write the net radial acceleration from the delayed master equation as
$$
a_r(t)=\mathbf a(t)\cdot\hat{\mathbf e}_r(t),
$$
so that
$$
\ddot\rho(t)=a_r(t)+\frac{u_\theta^2(t)}{\rho(t)}.
$$
Define the inward delayed budget and tangential leakage budget by
$$
B_{\mathrm{in}}
\equiv
\int_{t_a}^{t_b}[-a_r(t)]_+\,dt,
\qquad
B_\theta
\equiv
\int_{t_a}^{t_b}\frac{u_\theta^2(t)}{\rho(t)}\,dt.
$$
Let
$$
E_{\mathrm{fold}},
\qquad
E_{\mathrm{branch}},
\qquad
E_{\mathrm{gauge}}
$$
denote certified upper bounds for unresolved fold-layer impulse, delayed-branch
classification error, and section/gauge-reset error on the same controlled
window. The first useful planar recapture certificate is the strict inequality
$$
B_{\mathrm{in}}
-
B_\theta
-
E_{\mathrm{fold}}
-
E_{\mathrm{branch}}
-
E_{\mathrm{gauge}}
\ge
\dot\rho(t_a)+\gamma_{\mathrm{turn}},
\qquad
\gamma_{\mathrm{turn}}>0.
$$
This implies
$$
\dot\rho(t_b)\le -\gamma_{\mathrm{turn}}
$$
under the certified error budget. If the inequality cannot be made strict on
any admissible seed packet, the planar bridge fails for a precise reason:
centrifugal leakage and uncertified branch/fold uncertainty outrun radial
recapture before the return map can close.

This budget also fixes what the later gauge-continuity row must provide. The
return event must satisfy a transverse crossing margin
$$
|\dot\rho(T_{\mathrm{ret}})|\ge\nu_{\mathrm{ret}}>0,
$$
and the compensating rotation angle must have a bounded sensitivity on the same
history box. Otherwise the gauge-reset map can lose continuity even if the
radial budget itself turns the orbit around.

### Tame-Envelope and Gauge Closure

The eventual return theorem needs a closed domain on which a fixed-point or continuation argument can act. The desired envelope should control at least:

- section radius and admissible radial excursion,
- tangential speed and accumulated angle,
- minimum branch separation,
- distance from Jacobian-null caustics,
- and history norms strong enough to pass compactness and continuity steps.

The closure target is:

> The one-cycle return map sends a convex tame envelope of reduced planar histories into itself.

The gauge-reset operator must be included in that statement. After one excursion, the returned history must be rotated back into the section gauge. That step is continuous only if the return event is quantitatively transverse; otherwise the return time and the compensating rotation angle need not vary continuously with the incoming history.

The planar bridge should therefore treat the phase, rotation, and section-time variables as collective coordinates rather than as ordinary stability directions. If
$$
\alpha=(t_0,\psi,\rho_\ast,\ldots)
$$
records the finite chart data of a candidate reduced cycle, then the tangent rows
$$
Z_a(\theta)=\partial_{\alpha^a}\mathbf r_{\mathrm{cyc}}(\theta;\alpha)
$$
must be classified before the return spectrum is interpreted. The rotation and time rows are removed by gauge and section choices; any remaining geometric row must either close by a holonomy residual or enter the transverse stability certificate. This finite zero-mode ledger is the clean way to state what the planar proof means by "the same cycle" after one excursion.

This is the exact higher-dimensional replacement for the collinear tame-class closure. If it succeeds, the abstract fixed-point capstone from [Master-Equation Breather Program](../../../../markdown/aaa/proof-programs/master-equation-breather.md) becomes actionable rather than aspirational.

### Failure Alternatives

This chapter is useful even if the bridge does not close. There are only a few meaningful failure modes:

1. no seed packet with quantitative section transversality can be maintained;
2. local cone control fails before the first useful excursion slab is complete;
3. fold transit produces unbounded delayed impulse or uncontrolled branch proliferation;
4. centrifugal leakage outruns radial recapture before turnaround;
5. the reduced return map loses continuity under gauge reset.

Each failure would be informative. It would tell us whether the theory needs:

- a more restrictive planar regime,
- a different section choice,
- a different regularity class,
- or a revision of the stabilization claims made in the binary and tri-binary chapters.

### Immediate Theorem Program

The next sequence should be short and disciplined.

1. Define the reduced planar history space, seed packet, and quantitative section transversality.
2. Prove local sectorized cone control and short-time branch regularity on the first excursion slab.
3. Prove a bounded caustic-transit theorem for the first planar fold tube.
4. Prove the radial leakage-budget inequality in which inward delayed forcing beats centrifugal leakage, fold uncertainty, branch uncertainty, and gauge-reset error with a strict
   $$
   \gamma_{\mathrm{turn}}>0.
   $$
5. Assemble these ingredients into a tame-envelope return theorem with continuous gauge reset.

That order matters. Without a transverse seed packet, the return map is not well-defined. Without local cone control, the branch atlas is not stable enough to transport. Without bounded fold transit, the self-hit mechanism is not mathematically usable. Without a radial-turnaround inequality, no planar breather can exist.

### Why This Is the Best Next Closure Target

This chapter is the top bottleneck because it is upstream of several attractive but softer narratives.

- It is upstream of the terminal aligned-mode story in [Mapping the Planck Scale to the Tri-Binary Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md).
- It is upstream of the planar-lock and branch-selection story in [Horizon Chirality and Planar Spin](../../../../markdown/aaa/spacetime/horizon-chirality.md).
- It is upstream of any reliable effective reduction in [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md) and [Gauge Symmetries](../../../../markdown/aaa/interactions/gauge-symmetries.md).

If planar bridge closure fails, those higher-level chapters must become more conditional. If it succeeds, they gain a much firmer substrate basis.

### Interfaces to Other Chapters

- [Master Equation of Motion](../../../../markdown/aaa/dynamics/master-equation.md): exact delayed law, root equations, and Jacobian structure.
- [Causal Action Functional](../../../../markdown/aaa/dynamics/causal-action-functional.md): branch labels, coarea reduction, and the Jacobian-null bifurcation criterion.
- [1D Collinear Breather](../../../../markdown/aaa/proof-programs/collinear-breather.md): reduced return-map architecture and tame-envelope philosophy.
- [Master-Equation Breather Program](../../../../markdown/aaa/proof-programs/master-equation-breather.md): global roadmap that this chapter now instantiates in the first planar regime.
- [Tri-Binary Dynamics](../../../../markdown/aaa/dynamics/tri-binary-dynamics.md): higher-dimensional geometric target that eventually inherits the planar bridge machinery.
- [Horizon Chirality and Planar Spin](../../../../markdown/aaa/spacetime/horizon-chirality.md): downstream interpretation of planar branch selection once the planar bridge is mathematically under control.
