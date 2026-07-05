# Planar Bridge Closure

## Purpose

This chapter isolates the first higher-dimensional closure problem that can move the dynamics stack forward in a decisive way. The exact delayed law is already stated in [Master Equation](../dynamics/master-equation.md), and the branch-topology machinery is already formalized in [Causal Action Functional](../dynamics/causal-action-functional.md). What is still missing is a theorem-backed bridge showing that a genuinely planar delayed system admits a controlled section class, local branch regularity, bounded caustic transit, a genuine radial turnaround, and a return map that closes on a controlled envelope.

The planar bridge is the first regime where the proof architecture must leave the line while still retaining enough symmetry to remain mathematically tractable. If this bridge closes, it becomes the substrate basis for planar lock, terminal aligned modes, and the horizon-facing chirality questions developed in [Horizon Chirality and Planar Spin](../spacetime/horizon-chirality.md). If it fails, the failure should identify the exact geometric obstruction rather than leaving the whole closure program underdetermined.

The simple reason this page matters is that one-dimensional success would not yet prove assembly physics. A line removes angular escape by construction. The plane reintroduces tangential motion, rotation, folds, and caustic crossing while keeping enough symmetry for a theorem attempt. This makes the planar bridge the first serious test of whether delayed causal dynamics can recapture an assembly rather than merely trap a line model.

The recovery target is not "find a nice planar orbit." It is stronger: define a return section, control the delayed branch atlas, pass through necessary fold regions without blowing up the impulse, and show that radial recapture defeats tangential leakage on a declared envelope.

## Position in the Dynamics Stack

This chapter sits between four existing layers:

1. the exact delayed equations in [Master Equation](../dynamics/master-equation.md),
2. the topological branch formalism in [Causal Action Functional](../dynamics/causal-action-functional.md),
3. the reduced return-map architecture in [Collinear Breather](./collinear-breather.md),
4. the higher-dimensional program statement in [Master-Equation Breather Program](./master-equation-breather.md).

The role of this chapter is narrower than the full breather program. It does not attempt immediate many-body closure. It focuses on the first planar binary regime in which line-order arguments fail, tangential escape becomes real, and branch topology must be controlled in tandem with radial recapture rather than in a separate later chapter.

## Reduced Planar Bridge Regime

Work in the reflection-symmetric planar two-body subclass
$$
\mathbf X_1(T)=-\mathbf r(T),
\qquad
\mathbf X_2(T)=\mathbf r(T),
\qquad
\mathbf r(T)\in \Pi\cong\mathbb{R}^2,
\qquad
q_1=-\epsilon,
\qquad
q_2=+\epsilon
$$
Write
$$
\rho(T)\equiv \|\mathbf r(T)\|,
\qquad
\hat{\mathbf e}_r(T)\equiv \frac{\mathbf r(T)}{\rho(T)},
\qquad
\hat{\mathbf e}_\theta(T)\equiv R_{\pi/2}\hat{\mathbf e}_r(T)
$$
and decompose
$$
\frac{d\mathbf r}{dT}(T)=u_r(T)\hat{\mathbf e}_r(T)+u_\theta(T)\hat{\mathbf e}_\theta(T)
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
\mathbf e_2\cdot \frac{d\mathbf r}{dT}(0)>0
$$
so that the section-defining equality is
$$
\rho(0)=\rho_\ast
$$

This choice serves three purposes:

- it removes time-shift and rigid-rotation redundancy cleanly enough for a return map,
- it keeps the section codimension one in the reduced history space,
- and it avoids building the proof on a non-affine section whose geometry is hard to close under convexity arguments.

The first local target is stricter than mere section definition: histories in the seed packet should satisfy a quantitative transversality condition
$$
\frac{d\rho}{dT}(0)\le -u_r<0
$$
so that the first return time is not born tangent to the section. Without such a margin, the gauge-reset map for the returned history need not depend continuously on the return event.

## Local Cone Control and Branch Regularity

The first branch theorem should be local, not global. The correct opening package is a directional-cone result showing that the post-section planar velocity remains inside a strict admissible angular sector for a controlled time window. This is the planar replacement for 1D line ordering.

The target statement is of the following form:

> On an admissible planar seed packet, the delayed chords and instantaneous velocities remain inside a finite directional atlas on a short post-section interval, with quantitative angular separation from the Jacobian-null directions.

The right conceptual bridge to [Causal Action Functional](../dynamics/causal-action-functional.md) is the causal locus picture. In the regular regime, branch labels remain locally constant and can change only when
$$
F(T,T_{\mathrm{em}})=0,
\qquad
\nabla F(T,T_{\mathrm{em}})=0
$$
So the opening burden is not yet a whole-cycle branch census. It is to prove enough local transversality that the planar delayed geometry stays away from the singular directions long enough to support a finite branch atlas on an initial excursion slab.

This local cone control is the first point at which the planar program can either gain traction or expose a real obstruction.

## Delay-Adapted Angle Control

The Jacobian
$$
J=1-\frac{\mathbf V\cdot \hat{\mathbf r}}{c_f}
$$
depends on the angle between the instantaneous velocity and the delayed chord. Planar closure therefore needs a delay-adapted moving frame that tracks this angle directly rather than only through coarse Cartesian bounds.

The working geometric data are:

- the radial/tangential decomposition relative to $(\hat{\mathbf e}_r,\hat{\mathbf e}_\theta)$,
- the angular offset between $\mathbf V(T)$ and each active delayed chord,
- and a finite sector atlas controlling how those offsets evolve.

The immediate theorem target is a finite-time cone-transversality estimate implying
$$
J\ge \nu>0
$$
on a controlled interval before the first fold tube is entered.

## Bounded Caustic Transit

The planar bridge should not assume that the full excursion avoids every Jacobian-null event. The hinge at which self-hit branches are born is part of the mechanism and must be crossed in a controlled way.

The right target is therefore a bounded fold-transit theorem:

> When an admissible history enters a sufficiently small tubular neighborhood of a planar fold where $F=0$ and $\nabla F=0$, the dual-mollified delayed impulse remains finite and the outgoing history stays inside an explicitly controlled post-fold sector.

This is the first place where the topological criterion from [Causal Action Functional](../dynamics/causal-action-functional.md) must be combined with quantitative delayed dynamics rather than cited abstractly.

## Radial Turnaround Versus Centrifugal Leakage

A planar breather is fundamentally a radial turnaround problem. The main escape channel is not an abstract vector norm; it is the centrifugal barrier generated by tangential motion. The correct recapture target is therefore a strict radial majorization of the form
$$
\frac{d^2\rho}{dT^2}
=
a_r^{\mathrm{partner}}
+a_r^{\mathrm{self}}
+\rho\left(\frac{d\vartheta}{dT}\right)^2
\le
-\mathfrak M_{\mathrm{in}}<0
$$
on the inbound leg, with sign conventions chosen consistently with the delayed force decomposition.

The proof burden splits into two parts:

- partner attraction and delayed memory must produce enough inward radial impulse,
- tangential forcing must remain bounded strongly enough that the centrifugal term does not outrun radial braking before the turn.

This makes tangential control subordinate but essential. Tangential dynamics do not supply a separate closure theorem; they must be bounded tightly enough to prevent centrifugal leakage from destroying the radial return.

### Radial leakage-budget target

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
I_{\mathrm{turn}}=[T_a,T_b]
$$
be the first candidate outward-to-inward turnaround window in the reduced
planar history, with
$$
\frac{d\rho}{dT}(T_a)>0
$$
Write the net radial acceleration from the delayed master equation as
$$
a_r(T)=\mathbf A(T)\cdot\hat{\mathbf e}_r(T)
$$
so that
$$
\frac{d^2\rho}{dT^2}(T)=a_r(T)+\frac{u_\theta^2(T)}{\rho(T)}
$$
Define the inward delayed budget and tangential leakage budget by
$$
B_{\mathrm{in}}
\equiv
\int_{T_a}^{T_b}[-a_r(T)]_+\,dT,
\qquad
B_\theta
\equiv
\int_{T_a}^{T_b}\frac{u_\theta^2(T)}{\rho(T)}\,dT
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
\frac{d\rho}{dT}(T_a)+\gamma_{\mathrm{turn}},
\qquad
\gamma_{\mathrm{turn}}>0
$$
This implies
$$
\frac{d\rho}{dT}(T_b)\le -\gamma_{\mathrm{turn}}
$$
under the certified error budget. If the inequality cannot be made strict on
any admissible seed packet, the planar bridge fails for a precise reason:
centrifugal leakage and uncertified branch/fold uncertainty outrun radial
recapture before the return map can close.

This budget also fixes what the later gauge-continuity row must provide. The
return event must satisfy a transverse crossing margin
$$
\left|\frac{d\rho}{dT}(T_{\mathrm{ret}})\right|\ge\nu_{\mathrm{ret}}>0
$$
and the compensating rotation angle must have a bounded sensitivity on the same
history box. Otherwise the gauge-reset map can lose continuity even if the
radial budget itself turns the orbit around.

## Tame-Envelope and Gauge Closure

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
\alpha=(T_0,\psi,\rho_\ast,\ldots)
$$
records the finite chart data of a candidate reduced cycle, then the tangent rows
$$
Z_a(\theta)=\partial_{\alpha^a}\mathbf r_{\mathrm{cyc}}(\theta;\alpha)
$$
must be classified before the return spectrum is interpreted. The rotation and time rows are removed by gauge and section choices; any remaining geometric row must either close by a holonomy residual or enter the transverse stability certificate. This finite zero-mode ledger is the clean way to state what the planar proof means by "the same cycle" after one excursion.

This is the exact higher-dimensional replacement for the collinear tame-class closure. If it succeeds, the abstract fixed-point capstone from [Master-Equation Breather Program](./master-equation-breather.md) becomes actionable rather than aspirational.

## Failure Alternatives

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
- or a revision of the stabilization claims made in the binary and nested shell braid chapters.

## Immediate Theorem Program

The next sequence should be short and disciplined.

1. Define the reduced planar history space, seed packet, and quantitative section transversality.
2. Prove local sectorized cone control and short-time branch regularity on the first excursion slab.
3. Prove a bounded caustic-transit theorem for the first planar fold tube.
4. Prove the radial leakage-budget inequality in which inward delayed forcing beats centrifugal leakage, fold uncertainty, branch uncertainty, and gauge-reset error with a strict
   $$
   \gamma_{\mathrm{turn}}>0
   $$
5. Assemble these ingredients into a tame-envelope return theorem with continuous gauge reset.

That order matters. Without a transverse seed packet, the return map is not well-defined. Without local cone control, the branch atlas is not stable enough to transport. Without bounded fold transit, the self-hit mechanism is not mathematically usable. Without a radial-turnaround inequality, no planar breather can exist.

## Why This Is the Best Queued Planar Target

After the collinear certificate either passes or produces a precise obstruction that planar geometry is meant to resolve, this chapter is the top higher-dimensional bottleneck because it is upstream of several attractive but softer narratives.

- It is upstream of the terminal aligned-mode story in [Mapping the Planck Scale to the Nested Shell Braid Geometry](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).
- It is upstream of the planar-lock and branch-selection story in [Horizon Chirality and Planar Spin](../spacetime/horizon-chirality.md).
- It is upstream of any reliable effective reduction in [Effective Lagrangian](../dynamics/effective-lagrangian.md) and [Gauge Symmetries](../assemblies/gauge-symmetries.md).

If planar bridge closure fails, those higher-level chapters must become more conditional. If it succeeds, they gain a much firmer substrate basis.

## Interfaces to Other Chapters

- [Master Equation](../dynamics/master-equation.md): exact delayed law, root equations, and Jacobian structure.
- [Causal Action Functional](../dynamics/causal-action-functional.md): branch labels, coarea reduction, and the Jacobian-null bifurcation criterion.
- [Collinear Breather](./collinear-breather.md): reduced return-map architecture and tame-envelope philosophy.
- [Master-Equation Breather Program](./master-equation-breather.md): global roadmap that this chapter instantiates in the first planar regime.
- [Nested Shell Braid Dynamics](../noether-braid/nested-shell-braid-dynamics.md): higher-dimensional geometric target that eventually inherits the planar bridge machinery.
- [Horizon Chirality and Planar Spin](../spacetime/horizon-chirality.md): downstream interpretation of planar branch selection once the planar bridge is mathematically under control.
