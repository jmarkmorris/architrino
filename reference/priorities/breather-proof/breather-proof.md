# Execute the Frozen Breather Proof Program

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `10`
- Cost: `4`
- ROI: `2.50`
- Status: `active`

## Task Queue

1. `seed_margin_persistence` — Formalize the delayed seed-margin persistence lemma. Status: `next`. Depends on: none.
2. `branch_regularity_chain` — Polish the no-accumulation and simple-branch persistence lemmas. Status: `pending`. Depends on: `seed_margin_persistence`.
3. `type_ii_caustic_transit` — Formalize the sharpened Type II caustic-transit integral estimate. Status: `pending`. Depends on: `branch_regularity_chain`.

## Scope

Treat [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md) as a frozen reference scaffold and [master-equation-breather.md](../../../content/markdown/aaa/dynamics/master-equation-breather.md) as the frozen proof-program blueprint. The active job is proof execution inside the existing theorem DAG, not architectural redesign.

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
- Start with seed-side and early branch-regularity lemmas because they feed the rest of the DAG.

## Proof-Writing Order

1. Turn the delayed seed-margin persistence lemma into a clean formal proof, including:
  - the explicit implicit-function argument for unique simple seed-side branches;
  - the retardation estimate;
  - the `\varepsilon_A` neighborhood correction;
  - the Jacobian perturbation estimate;
  - and the projected-force perturbation bounds for
$$
\Lambda^{\mathrm{mb}}_1
\qquad
\text{and}
\qquad
\Lambda^{\mathrm{mb}}_2.
$$
2. Formalize the no-accumulation and simple-branch persistence chain into polished lemmas with explicit dependence on
$$
\gamma_{\mathrm{fold}},
\qquad
\nu^{\mathrm{mb}}_J,
\qquad
\chi_{\mathrm{fold}},
\qquad
\Delta\tau_{\mathrm{evt}}.
$$
3. If time remains, convert the sharpened Type II caustic-transit estimate into a formal integral proof using the exact cancellation
$$
dt=\frac{|\partial_s g|}{|\partial_t g|}\,du
$$
and the explicit ceiling
$$
\mathfrak{F}^{\mathrm{mb}}_{m,\mathrm{II}}
\le
\frac{
2C_m^{\mathrm{proj}}\kappa\epsilon^2U^{\mathrm{mb}}_{\mathrm{tube}}
}{
\chi_{\mathrm{fold}}\bigl(d_{\min}^2+\epsilon_c^2\bigr)
}.
$$
4. Preserve the theorem-program structure exactly as written. The active work is proof execution, not another architecture pass.

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [simulations](../simulations/simulations.md)
- [chapter-authoring](../chapter-authoring/chapter-authoring.md)

## Related AAA Notes

- [collinear-breather](../../../content/markdown/aaa/dynamics/collinear-breather.md)
- [master-equation-breather](../../../content/markdown/aaa/dynamics/master-equation-breather.md)
- [planar-bridge-closure](../../../content/markdown/aaa/dynamics/planar-bridge-closure.md)
- [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md)
