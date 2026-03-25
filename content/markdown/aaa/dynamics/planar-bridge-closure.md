# Planar Bridge Closure

## Purpose

This chapter isolates the first higher-dimensional closure problem that can move the dynamics stack forward in a decisive way. The exact delayed law is already stated in [Master Equation of Motion](./master-equation.md), and the branch-topology machinery is already formalized in [Causal Action Functional](./causal-action-functional.md). What is still missing is a theorem-backed bridge showing that a genuinely planar delayed system admits a finite tame branch family, quantitative recapture margins, and a return map that closes on a controlled envelope.

The planar bridge is the first regime where the proof architecture must leave the line while still retaining enough symmetry to remain mathematically tractable. If this bridge closes, it becomes the substrate basis for planar lock, terminal aligned modes, and the horizon-facing chirality questions developed in [Horizon Chirality and Planar Spin](./horizon-chirality.md). If it fails, the failure should identify the exact geometric obstruction rather than leaving the whole closure program underdetermined.

## Position in the Dynamics Stack

The present chapter sits between four existing layers:

1. the exact delayed equations in [Master Equation of Motion](./master-equation.md),
2. the topological branch formalism in [Causal Action Functional](./causal-action-functional.md),
3. the reduced return-map success in [1D Collinear Breather](./collinear-breather.md),
4. the higher-dimensional program statement in [Master-Equation Breather Program](./master-equation-breather.md).

The role of this chapter is narrower than the full breather program. It does not attempt immediate many-body closure. It focuses on the first planar binary regime in which line-order arguments fail, tangential escape becomes real, and branch topology must be controlled over an entire excursion rather than only at isolated times.

## Reduced Planar Bridge Regime

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

## Rotational Gauge and Return Section

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

The main technical burden is then to prove that histories starting in a tame neighborhood of the section return to a controlled neighborhood of the same section after one excursion, without branch explosion or loss of transversality.

## Branch-Topology Control

The first theorem package should promote the isolated-time root information from [Master Equation of Motion](./master-equation.md) into an excursion-scale branch theorem.

The target statement is of the following form:

> On a tame planar history class, the active causal roots over one excursion decompose into a finite family of smooth branch sheets with no accumulation, no uncontrolled birth/death events away from explicitly identified critical sets, and quantitative separation from the Jacobian-null set.

The right conceptual bridge to [Causal Action Functional](./causal-action-functional.md) is the causal locus picture. In the regular regime, branch labels remain locally constant and can change only when
$$
F(t,t')=0,
\qquad
\nabla F(t,t')=0.
$$
So the real planar burden is not inventing new topology; it is showing that the planar delayed geometry admits a finite tame branch family over a whole cycle before any Jacobian-null caustic is encountered.

This is the first closure point likely to produce either a genuine theorem or a decisive obstruction.

## Vector Recapture Margins

The 1D recapture inequalities are scalar. The planar bridge needs a coercive vector replacement. A workable target is a recapture functional
$$
\mathfrak M_{\mathrm{vec}}
=
\alpha_r\,\mathfrak M_r
\alpha_\theta\,\mathfrak M_\theta
-\mathfrak E_{\mathrm{escape}},
$$
with positive weights chosen so that
$$
\mathfrak M_{\mathrm{vec}}>0
$$
dominates every escape channel permitted by the reduced planar dynamics.

The content of such a theorem would be:

- radial outward drift is beaten by delayed inward recovery,
- tangential leakage is beaten by phase-restoring delayed geometry,
- the combined estimate is stable under the admissible branch family,
- and the resulting bound is strong enough to feed a one-cycle return estimate.

Until this vector margin exists, any claim about stable planar closure remains a geometric hope rather than a theorem program.

## Tame-Envelope Closure

The eventual return theorem needs a closed domain on which a fixed-point or continuation argument can act. The desired envelope should control at least:

- section radius and admissible radial excursion,
- tangential speed and accumulated angle,
- minimum branch separation,
- distance from Jacobian-null caustics,
- and history norms strong enough to pass compactness and continuity steps.

The closure target is:

> The one-cycle return map sends a convex tame envelope of reduced planar histories into itself.

This is the exact higher-dimensional replacement for the collinear tame-class closure. If it succeeds, the abstract fixed-point capstone from [Master-Equation Breather Program](./master-equation-breather.md) becomes actionable rather than aspirational.

## Failure Alternatives

This chapter is useful even if the bridge does not close. There are only a few meaningful failure modes:

1. branch accumulation destroys finite excursion-scale branch control;
2. the Jacobian-null set is encountered generically rather than only at controlled critical loci;
3. no coercive vector recapture margin can dominate tangential escape;
4. the natural reduced section fails to produce a convex self-map domain.

Each failure would be informative. It would tell us whether the theory needs:

- a more restrictive planar regime,
- a different section choice,
- a different regularity class,
- or a revision of the stabilization claims made in the binary and tri-binary chapters.

## Immediate Theorem Program

The next sequence should be short and disciplined.

1. Define the reduced planar history space and admissible section class precisely.
2. Prove local sectorized branch regularity and no-accumulation on a one-excursion time slab.
3. Derive a quantitative lower bound separating admissible histories from the Jacobian-null set.
4. Formulate and prove a first vector recapture inequality.
5. Assemble these ingredients into a one-cycle envelope map.

That order matters. Without branch regularity, recapture is not even well-posed. Without Jacobian separation, branch labels are not stable enough to transport. Without a vector recapture inequality, the return map has no reason to close.

## Why This Is the Best Next Closure Target

This chapter is the top bottleneck because it is upstream of several attractive but softer narratives.

- It is upstream of the terminal aligned-mode story in [Mapping the Planck Scale to the Tri-Binary Geometry](./mapping-Planck-scale.md).
- It is upstream of the planar-lock and branch-selection story in [Horizon Chirality and Planar Spin](./horizon-chirality.md).
- It is upstream of any reliable effective reduction in [Effective Lagrangian](./effective-lagrangian.md) and [Gauge Symmetries](./gauge-symmetries.md).

If planar bridge closure fails, those higher-level chapters must become more conditional. If it succeeds, they gain a much firmer substrate basis.

## Interfaces to Other Chapters

- [Master Equation of Motion](./master-equation.md): exact delayed law, root equations, and Jacobian structure.
- [Causal Action Functional](./causal-action-functional.md): branch labels, coarea reduction, and the Jacobian-null bifurcation criterion.
- [1D Collinear Breather](./collinear-breather.md): reduced return-map architecture and tame-envelope philosophy.
- [Master-Equation Breather Program](./master-equation-breather.md): global roadmap that this chapter now instantiates in the first planar regime.
- [Tri-Binary Dynamics](./tri-binary-dynamics.md): higher-dimensional geometric target that eventually inherits the planar bridge machinery.
- [Horizon Chirality and Planar Spin](./horizon-chirality.md): downstream interpretation of planar branch selection once the planar bridge is mathematically under control.
