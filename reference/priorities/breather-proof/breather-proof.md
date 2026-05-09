# Execute the Frozen Breather Proof Program

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `10`
- Cost: `4`
- ROI: `2.50`
- Status: `active-closure`

## Task Queue

1. `seed_chart_packet` — Produce `certificate/phi_cyc.json`, `certificate/branch_chart.json`, `certificate/mesh.json`, and the seed-chart interval report. Status: `next`. Depends on: none.
2. `coupled_corridor_certificate` — Produce `certificate/parameters.json` and the coupled-corridor interval report for one strict parameter tuple. Status: `pending`. Depends on: `seed_chart_packet`.
3. `returned_sample_certificate` — Produce returned-sample residuals or boundary-trapping budgets on the certified mesh. Status: `pending`. Depends on: `seed_chart_packet`, `coupled_corridor_certificate`.
4. `topology_certificate` — Verify return transversality and certified branch-chart well-posedness on the same domain. Status: `pending`. Depends on: `returned_sample_certificate`.
5. `schauder_closeout` — Promote the conditional Schauder theorem to an existence theorem after all certificate rows pass. Status: `pending`. Depends on: `topology_certificate`.

## Scope

Treat [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md) as the proof core and [master-equation-breather.md](../../../content/markdown/aaa/dynamics/master-equation-breather.md) as the theorem-program atlas. The architecture is complete, but the proof is certificate-pending. This workstream now tracks the active closure package needed to turn the conditional fixed-point theorem into an existence theorem.

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
- Repeated review-and-repair cycles have frozen the bridge architecture. There are no known structural gaps left in the theorem program, so the next phase is executable certificate production.

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

- Treat the theorem architecture as frozen unless a proof-breaking defect is discovered.
- Do not add fresh theorem layers before the finite certificate packet has been attempted.
- Build the active closure package under `reference/priorities/breather-proof/certificate/`.
- The accepted proof artifact is a pass/fail finite audit on one candidate
$$
\phi_{\mathrm{cyc}},
$$
not a new roadmap.

## Current Closure Assessment

The remaining collinear-breather work is now kept in two places:

- the manuscript-level theorem ledger in [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md), under `Remaining blockers before Schauder`;
- this priority handoff, which records why those blockers are still open and what data must be produced next.

The current scaffold is no longer blocked by abstract Schauder theory. It is blocked by the missing finite certificate data for one candidate certified cycle
$$
\phi_{\mathrm{cyc}}.
$$
It is not blocked by the absence of an elementary closed-form orbit. The dual-mollified absolute-time integral law is sufficient as the evolution law; branch-sum formulas are simple-root reductions used on certified charts. What is still absent is an instantiated
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

   **Executable artifacts.**
   - `certificate/phi_cyc.json`: candidate center history, period
     $$
     T_{\mathrm{cyc}},
     $$
     normalization, and interpolation or basis data.
   - `certificate/branch_chart.json`: active branch list, inactive complements, signed sheet labels, origin-crossing layer labels, memory-depth ranges, and Jacobian formulas.
   - `certificate/mesh.json`: sampled certificate mesh
     $$
     \{\theta_j\}_{j=0}^{N}
     $$
     with sample tolerances.
   - `certificate/seed_chart_interval_report.md`: interval proof of
     $$
     \nu_{\mathrm{seed}}>0,
     \qquad
     \gamma_{\mathrm{gap}}>0,
     \qquad
     \gamma_h>0,
     \qquad
     \gamma_{\mathrm{env}}>0,
     $$
     plus
     $$
     L_J,
     \qquad
     L_F,
     \qquad
     L_h,
     \qquad
     L_{\mathrm{env}}.
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

   **Executable artifacts.**
   - `certificate/parameters.json`: one proposed strict tuple
     $$
     p_0=(\eta,\epsilon_c,X_{\max},U_{\max},A_{\max},T_{\max},h,
     V_{\mathrm{ent}}^{\mathrm{out}},
     a_{\mathrm{ent}}^{\mathrm{out}},
     T_{\mathrm{ent}}^{\mathrm{out}},
     \overline A_{s,\mathrm{ent}}^{\mathrm{out}},g)
     $$
     with interval bounds for all dependent coefficients.
   - `certificate/coupled_corridor_interval_report.md`: pass/fail interval ledger for the inner margin, apocenter-entry margin, outer margin, entry-time budget, and envelope domination inequalities.
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

   **Executable artifacts.**
   - `certificate/returned_samples.json`: returned sample values, velocity samples, and residuals against
     $$
     \phi_{\mathrm{cyc}}.
     $$
   - `certificate/returned_sample_interval_report.md`: either residual-plus-sensitivity verification or direct boundary-trapping budgets
     $$
     E_{j,\pm}^{x},
     \qquad
     E_{j,\pm}^{v}
     $$
     with strict slack at every mesh index.
4. **Topology row.**
   Verify
   $$
   u_{\mathrm{ret}}^{\mathrm{cert}}>0
   $$
   and local Lipschitz dependence of the dual-mollified vector field on the certified branch chart. This supplies continuity and precompactness on
   $$
   \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
   $$

   **Executable artifacts.**
   - `certificate/topology_interval_report.md`: verification of
     $$
     u_{\mathrm{ret}}^{\mathrm{cert}}>0
     $$
     and certified branch-chart well-posedness on the stored history and one-cycle continuation.
   - `certificate/pass_fail_ledger.md`: one table summarizing all four rows, artifact hashes or versions, pass/fail status, and the exact obstruction if any row fails.

Only after all four rows are verified on the same certified domain does the conditional Schauder theorem in [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md) become an actual existence theorem. Until then, the project has a precise fixed-point proof architecture, not a completed breather proof and not a closed-form solution.

## Proof-Writing Order

1. Produce the seed-chart packet.
2. Produce one strict coupled-corridor parameter certificate.
3. Produce returned-sample preservation, preferring boundary trapping if residual sensitivities are too large.
4. Produce the topology certificate.
5. Only after all four rows pass, update [collinear-breather.md](../../../content/markdown/aaa/dynamics/collinear-breather.md) from conditional theorem to completed dual-mollified existence theorem.

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [simulations](../deferred/simulations.md)
- [chapter-authoring](../../op/chapter-authoring.md)

## Related AAA Notes

- [collinear-breather](../../../content/markdown/aaa/dynamics/collinear-breather.md)
- [master-equation-breather](../../../content/markdown/aaa/dynamics/master-equation-breather.md)
- [planar-bridge-closure](../../../content/markdown/aaa/dynamics/planar-bridge-closure.md)
- [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md)
