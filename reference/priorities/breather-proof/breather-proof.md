# Execute the Frozen Breather Proof Program

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `10`
- Cost: `4`
- ROI: `2.50`
- Status: `completed`

## Task Queue

No open `breather-proof` task remains in this priority file.

## Scope

Treat [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md) as a frozen reference scaffold and [master-equation-breather.md](../../../content/markdown/aaa/dynamics/master-equation-breather.md) as the frozen proof-program blueprint. This local proof-execution queue is now complete; the remaining work belongs to the closure and coupled-regime priorities.

## Current State

- The 1D scaffold is architecturally frozen through collapse-to-crossing, caustic transit, post-crossing recapture, outer-turn closure, seed-history nonvacuity, invariant-envelope synthesis, and the Schauder capstone.
- The main packaging defects have already been surfaced honestly:
  - the convex tame-envelope step is now marked as a genuine target rather than smuggled in;
  - the admissible parameter regime is treated as a coupled solvability target rather than a false decoupling argument;
  - and the section anchoring now explicitly quotients time-translation symmetry.
- The notation and domain hierarchy have been cleaned so the raw section, convex macro-envelope, and closed convex tame envelope are no longer silently conflated.
- The bridge chapter already records the portable return-map / tame-envelope / Schauder architecture, the completed reduced-planar binary bridge, and the completed first unreduced-planar binary bridge.
- The reduced-planar bridge now runs end-to-end through section and gauge fixing, directional sorting, deep-past relocation, cone transversality, bounded caustic transit, vector recapture, tame-envelope closure, Schauder, and precise failure alternatives.
- The unreduced-planar binary bridge now runs end-to-end through gauge-fixed sectioning, finite active branch-graph control, deep-past provenance or exclusion, multi-channel recapture, tame-envelope closure, Schauder, and precise closure-stage obstruction alternatives.
- The planar three-body bridge in [master-equation-breather.md](../../../content/markdown/aaa/dynamics/master-equation-breather.md) now carries a full theorem-program ladder through unreduced well-posedness, gauge selection, no-accumulation, bounded caustic transit, finite active delay hypergraph, cluster-valued ancestry and deep-past exclusion, multi-observable recapture, explicit convex-core construction, boundary trapping, invariant-envelope closure, and the final Schauder capstone.
- The planar three-body bridge also already includes:
  - an explicit symmetric seed packet;
  - a delayed seed-margin persistence lemma;
  - a seed-centered realization of the convex tame core;
  - an explicit principal-channel parameter corridor;
  - and a sharpened caustic-transit package with exact fold-time cancellation and uniform fold ceilings.
- The ancestry package reduces deep-past memory to a finite-state backward-search problem with trapped-cycle exclusion via monotone source-time drift, so the deep-past contribution is now one fixed arithmetic ceiling
$$
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}.
$$
- The recapture package now depends only on fixed fold ceilings
$$
F^{\mathrm{mb}}_m
$$
and the fixed deep-past ceiling
$$
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}},
$$
rather than qualitative smallness language.
- Repeated review-and-repair cycles have frozen the bridge architecture. There are no known structural gaps left in the theorem program, so the next phase should be literal proof writing.

## Pivots To Preserve

- Integrate the inbound hinge caustic as a bounded caustic-transit impulse rather than excluding it as a pathology.
- Preserve the outer-turn sorting map
$$
z(t)=x(t)-c_f t,
$$
which forces explicit descent and exclusion inequalities on the apocenter window.
- Preserve the deep-past relocation mechanism: outward self-roots on the apocenter window are forced back onto the pre-crossing inbound leg, where they become unique and automatically transversal.
- Keep the affine seed history because it removes section-side vacuity by giving an explicit nonempty tame neighborhood.
- Keep the fixed-point route anchored to the closed convex tame envelope
$$
\mathcal{K}_{x_\ast,\eta},
$$
rather than to a mismatched tame-subclass / macro-envelope pair.

## Active Handoff

- Read the seed-side through Schauder packages in [master-equation-breather.md](../../../content/markdown/aaa/dynamics/master-equation-breather.md) treating the architecture as frozen.
- Do not add fresh theorem layers unless a real proof-breaking defect is discovered.
- The seed-side, branch-regularity, Type II caustic-transit, and apocenter-entry proof-writing tasks have now been executed in [master-equation-breather.md](../../../content/markdown/aaa/dynamics/master-equation-breather.md) and [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md).

## Current Closure Assessment

The remaining collinear-breather work is now kept in two places:

- the manuscript-level theorem ledger in [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md), under `Remaining blockers before Schauder`;
- this priority handoff, which records why those blockers are still open and what data must be produced next.

The current scaffold is no longer blocked by abstract Schauder theory. It is blocked by the missing finite certificate data for one candidate certified cycle
$$
\phi_{\mathrm{cyc}}.
$$
There is not yet an instantiated
$$
\phi_{\mathrm{cyc}},
$$
sample mesh, coefficient table, numerical certificate, or symbolic certificate in the repository. Therefore the proof cannot honestly be marked complete without constructing or computing that candidate and verifying its finite audit rows.

The finite audit rows are:

1. **Seed-chart row.**
   Produce
   $$
   \phi_{\mathrm{cyc}},
   $$
   an active branch list, inactive branch complements, and envelope constants. Verify
   $$
   \nu_{\mathrm{seed}}>0,
   \qquad
   \gamma_{\mathrm{gap}}>0,
   \qquad
   \gamma_h>0,
   \qquad
   \gamma_{\mathrm{env}}>0,
   $$
   plus finite sensitivity constants
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
   and the finite sampled certificate defining
   $$
   \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
   $$
2. **Coupled-corridor row.**
   Verify the factorized coefficient inequalities
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
   above the displayed corridor threshold in the manuscript.
3. **Returned-sample row.**
   On the chosen mesh, verify either the residual-plus-sensitivity inequalities
   $$
   R_{j,\pm}^{x}+L_j^x r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4},
   \qquad
   R_{j,\pm}^{v}+L_j^v r_{\mathrm{cert}}<\frac{r_{\mathrm{cert}}}{4},
   $$
   or direct boundary-trapping budgets
   $$
   E_{j,\pm}^{x},
   \qquad
   E_{j,\pm}^{v}
   $$
   with strict sample slack.
4. **Topology row.**
   Verify
   $$
   u_{\mathrm{ret}}^{\mathrm{cert}}>0
   $$
   and local Lipschitz dependence of the dual-mollified vector field on the certified branch chart. This supplies continuity and precompactness on
   $$
   \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
   $$

Only after all four rows are verified on the same certified domain does the conditional Schauder theorem in [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md) become an actual existence theorem. Until then, the project has a precise fixed-point proof architecture, not a completed breather proof and not a closed-form solution.

## Proof-Writing Order

1. Preserve the theorem-program structure exactly as written. The remaining work belongs to the closure and coupled-regime priorities rather than this local breather-proof queue.

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [simulations](../deferred/simulations.md)
- [chapter-authoring](../../op/chapter-authoring.md)

## Related AAA Notes

- [collinear-breather](../../../content/markdown/aaa/dynamics/collinear-breather.md)
- [master-equation-breather](../../../content/markdown/aaa/dynamics/master-equation-breather.md)
- [planar-bridge-closure](../../../content/markdown/aaa/dynamics/planar-bridge-closure.md)
- [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md)
