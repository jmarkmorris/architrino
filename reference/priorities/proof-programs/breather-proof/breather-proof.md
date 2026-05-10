# Execute the Frozen Breather Proof Program

## Workstream Metadata

- Kind: `proof-subprogram`
- Rank: `1.1`
- Value: `10`
- Cost: `4`
- ROI: `2.50`
- Status: `active-closure`

## Task Queue

1. `master_equation_law` — Record the exact dual-mollified absolute-time evolution law in the master-equation stack. Status: `done`. Depends on: none.
2. `velocity_itinerary_verification` — Produce `certificate/itinerary.json` and `certificate/itinerary_parity_report.md` proving the proposed velocity-class itinerary satisfies the fold-parity invariants. Status: `done`. Depends on: `master_equation_law`.
3. `seed_chart_packet` — Produce `certificate/phi_cyc.json`, `certificate/causal_ledger.json`, `certificate/branch_chart.json`, `certificate/mesh.json`, and the seed-chart interval report. Status: `next`. Depends on: `velocity_itinerary_verification`.
4. `coupled_corridor_certificate` — Produce `certificate/corridor_nonemptiness_report.md`, `certificate/parameters.json`, and the coupled-corridor interval report for one strict parameter tuple. Status: `pending`. Depends on: `seed_chart_packet`.
5. `monodromy_diagnostic` — Produce the section-anchored monodromy spectrum and route returned-sample preservation to sensitivities or boundary trapping. Status: `pending`. Depends on: `seed_chart_packet`, `coupled_corridor_certificate`.
6. `returned_sample_certificate` — Produce returned-sample residuals or boundary-trapping budgets on the certified mesh. Status: `pending`. Depends on: `seed_chart_packet`, `coupled_corridor_certificate`, `monodromy_diagnostic`.
7. `topology_certificate` — Verify return transversality, origin-layer continuity, certified fold-event atlas, and certified branch-chart well-posedness on the same domain. Status: `pending`. Depends on: `returned_sample_certificate`.
8. `schauder_closeout` — Promote the conditional Schauder theorem to an existence theorem after all certificate rows pass. Status: `pending`. Depends on: `topology_certificate`.

## Scope

Treat [collinear-breather.md](../../../../content/markdown/aaa/proof-programs/collinear-breather.md) as the proof core and [master-equation-breather.md](../../../../content/markdown/aaa/proof-programs/master-equation-breather.md) as the theorem-program atlas. The architecture is complete, but the proof is certificate-pending. This workstream now tracks the active closure package needed to turn the conditional fixed-point theorem into an existence theorem.

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
- The planar three-body bridge in [master-equation-breather.md](../../../../content/markdown/aaa/proof-programs/master-equation-breather.md) now carries a full theorem-program ladder through unreduced well-posedness, gauge selection, no-accumulation, bounded caustic transit, finite active delay hypergraph, cluster-valued ancestry and deep-past exclusion, multi-observable recapture, explicit convex-core construction, boundary trapping, invariant-envelope closure, and the final Schauder capstone.
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
- Build the active closure package under `reference/priorities/proof-programs/breather-proof/certificate/`.
- The accepted proof artifact is a pass/fail finite audit on one candidate
$$
\phi_{\mathrm{cyc}},
$$
not a new roadmap.
- Treat [tri-binary-causal-closure](../../tri-binary-causal-closure/tri-binary-causal-closure.md) as a separate active-development synthesis workstream, not as a replacement for the finite certificate packet. Before deployment, unresolved synthesis items must be closed, kept as explicit roadmap targets, routed into the relevant priority workstream, or cut.

## Immediate Cross-Document Action Plan

1. The exact dual-mollified absolute-time equation now belongs in [master-equation.md](../../../../content/markdown/aaa/dynamics/master-equation.md) as the canonical evolution law for certification. Branch sums are local simple-root reductions of that law.
2. Verify the proposed velocity-class itinerary before generating a candidate cycle. For the four-arc skeleton or any replacement itinerary, check the fold-parity constraints
   $$
   \Delta N\in 2\mathbb{Z},
   \qquad
   \Delta D=0,
   $$
   from Proposition 3 of [master-equation.md](../../../../content/markdown/aaa/dynamics/master-equation.md).
3. Generate one candidate collinear cycle
   $$
   \phi_{\mathrm{cyc}}
   $$
   by ansatz, collocation, or simulation.
4. Enumerate active and inactive path-history roots on a finite mesh around that candidate.
5. Verify the five audit rows below on the same certified domain.
6. Promote the conditional Schauder theorem in [collinear-breather.md](../../../../content/markdown/aaa/proof-programs/collinear-breather.md) only after the finite audit passes.

The vulnerable assumption is that a finite active branch chart with positive Jacobian floors and positive inactive-root gaps exists around one candidate cycle. The direct test is root enumeration plus interval certification for
$$
\phi_{\mathrm{cyc}}.
$$

## Current Closure Assessment

The remaining collinear-breather work is now kept in two places:

- the manuscript-level theorem ledger in [collinear-breather.md](../../../../content/markdown/aaa/proof-programs/collinear-breather.md), under `Remaining blockers before Schauder`;
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

The first itinerary gate has a coarse parity pass for the doubled four-arc generic itinerary. This pass is necessary rather than sufficient: it verifies the separator-level fold arithmetic, but it does not yet certify active self-image roots, inactive-root gaps, Jacobian floors, or returned residuals. If the branch enumeration forces a different itinerary, this gate must be rerun.

Its executable artifacts are:

- `certificate/itinerary.json`: velocity-class itinerary, arc labels, separator events, proposed fold events, and expected root-count jumps.
- `certificate/itinerary_parity_report.md`: algebraic check that every separator event satisfies the even-jump law and signed-degree conservation, and that the closed-cycle branch ledger returns to itself.

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
     normalization, symmetry chart, and interpolation or basis data.
   - `certificate/causal_ledger.json`: null-coordinate pre-ledger for the self-image equation, with certified empty blocks, candidate nonempty blocks, monotone subarc splits, and separator/fold rows.
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
   First prove that the corridor is algebraically nonempty before searching for a strict tuple
   $$
   p_0.
   $$
   This means deriving a nonempty window for the coupled
   $$
   (\eta,\epsilon_c,g)
   $$
   constraints, including the competing lower and upper core-scale bounds from the corridor nonemptiness criterion in [collinear-breather.md](../../../../content/markdown/aaa/proof-programs/collinear-breather.md). After that, verify the factorized coefficient inequalities
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
   - `certificate/corridor_nonemptiness_report.md`: one-page algebraic proof that the coupled corridor has admissible
     $$
     (\eta,\epsilon_c,g)
     $$
     solutions, or a pass/fail obstruction if the core-scale window is empty.
   - `certificate/parameters.json`: one proposed strict tuple
     $$
     p_0=(\eta,\epsilon_c,X_{\max},U_{\max},A_{\max},T_{\max},h,
     V_{\mathrm{ent}}^{\mathrm{out}},
     a_{\mathrm{ent}}^{\mathrm{out}},
     T_{\mathrm{ent}}^{\mathrm{out}},
     \overline A_{s,\mathrm{ent}}^{\mathrm{out}},g)
     $$
     with interval bounds for all dependent coefficients.
   - `certificate/coupled_corridor_interval_report.md`: pass/fail interval ledger for the corridor nonemptiness gate, inner margin, apocenter-entry margin, outer margin, entry-time budget, and envelope domination inequalities.
3. **Monodromy diagnostic row.**
   Compute or interval-bound the section-anchored linearized return map
   $$
   D P_\eta(\phi_{\mathrm{cyc}})
   $$
   on the sample mesh, with the time-translation direction removed by section anchoring. If an unstable direction is certified, returned-sample preservation must use boundary trapping rather than residual-plus-sensitivity control.

   **Executable artifacts.**
   - `certificate/monodromy.json`: discretized monodromy matrix or interval enclosure, eigenvalue or spectral-radius enclosure, and the diagnostic margin
     $$
     \delta_{\mathrm{mon}}.
     $$
   - `certificate/monodromy_report.md`: eigenvalue spectrum, spectral-radius enclosure, and pass/fail route decision for whether the returned-sample row may use sensitivities or must use boundary trapping.
4. **Returned-sample row.**
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
5. **Topology row.**
   Verify
   $$
   u_{\mathrm{ret}}^{\mathrm{cert}}>0
   $$
   origin-layer continuity, the certified fold-event atlas, and local Lipschitz dependence of the dual-mollified vector field on the certified branch charts. This supplies continuity and precompactness on
   $$
   \mathcal{K}_{x_\ast,\eta}^{\mathrm{cert}}.
   $$

   **Executable artifacts.**
   - `certificate/topology_interval_report.md`: verification of
     $$
     u_{\mathrm{ret}}^{\mathrm{cert}}>0
     $$
     origin-layer continuity, certified fold-event transitions, and certified branch-chart well-posedness on the stored history and one-cycle continuation.
   - `certificate/pass_fail_ledger.md`: one table summarizing all five rows, artifact hashes or versions, pass/fail status, and the exact obstruction if any row fails.

Only after all five rows are verified on the same certified domain does the conditional Schauder theorem in [collinear-breather.md](../../../../content/markdown/aaa/proof-programs/collinear-breather.md) become an actual existence theorem. Until then, the project has a precise fixed-point proof architecture, not a completed breather proof and not a closed-form solution.

## Proof-Writing Order

1. Produce the velocity-class itinerary and parity report.
2. Produce the seed-chart packet.
3. Prove corridor nonemptiness, then produce one strict coupled-corridor parameter certificate.
4. Produce the monodromy diagnostic and choose the returned-sample proof route.
5. Produce returned-sample preservation, preferring boundary trapping if residual sensitivities are too large.
6. Produce the topology certificate.
7. Only after the itinerary gate and all five audit rows pass, update [collinear-breather.md](../../../../content/markdown/aaa/proof-programs/collinear-breather.md) from conditional theorem to completed dual-mollified existence theorem.

## Related Priorities

- [master-equation-closure](../../master-equation-closure/master-equation-closure.md)
- [simulations](../../deferred/simulations.md)
- [chapter-authoring](../../../op/chapter-authoring.md)

## Related AAA Notes

- [collinear-breather](../../../../content/markdown/aaa/proof-programs/collinear-breather.md)
- [master-equation-breather](../../../../content/markdown/aaa/proof-programs/master-equation-breather.md)
- [planar-bridge-closure](../../../../content/markdown/aaa/proof-programs/planar-bridge-closure.md)
- [master-equation](../../../../content/markdown/aaa/dynamics/master-equation.md)
