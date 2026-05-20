# Fresh Fold-Collocation Solver Surface

## Scope

This packet records the executable surface for the approved successor target after `seed-doubled-four-arc-cosine-template-v0` was rejected at the parent-complement gate.

It is priority-only. It does not instantiate a new candidate, does not edit `phi_cyc.json`, `mesh.json`, `causal_ledger.json`, `fold_layer_atlas.json`, or `branch_chart.json`, and does not authorize branch-chart construction.

## Finding

No runnable breather-specific solver or null-coordinate pre-ledger generator is currently present in `scripts/`.

The available surface is contractual and diagnostic:

- `seed_chart_packet.md` defines the schema and pass/fail route.
- `next_candidate_solver_target.md` defines the fresh fold-adapted collocation target.
- `phi_cyc.json`, `mesh.json`, and `causal_ledger.json` belong to the rejected cosine packet `seed-doubled-four-arc-cosine-template-v0`.
- `fixed_cosine_refinement_rescue_test.md` rejects mesh-only rescue of that same cosine packet.

The next proof advance therefore requires either a new solver implementation or a manually instantiated same-packet artifact set. It cannot be obtained by relabeling the rejected cosine artifacts.

## Minimum Lawful Successor Packet

A lawful next attempt must freeze one new packet identity
$$
\mathfrak{I}_{\mathrm{next}}
=
\left(
\mathcal{K},
T_{\mathrm{cyc}},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta
\right)
$$
across all generated artifacts before any branch-chart work.

The minimum artifact set is:

| Artifact | Required content |
| --- | --- |
| successor `phi_cyc.json` | Fresh packet id, fold-adapted collocation basis, section, symmetry, parameters, residual targets, and construction notes. |
| successor `mesh.json` | Separator-refined mesh and ordered subblocks keyed to the same packet id. |
| successor `causal_ledger.json` | Null-coordinate pre-ledger generated from the same candidate using $u(t)=c_f t-x(t)$ and $w(t)=c_f t+x(t)$. |
| successor `causal_preledger_interval_report.md` | Pass/fail report proving or rejecting every row as `empty`, `simple_root`, or `fold_layer`. |

The successor packet must not reuse the rejected packet id. It may reuse fixed comparison parameters such as `c_f=1.0`, `eta=0.02`, `epsilon_c=0.05`, `g=1.0`, and `h=6.28318530718`, but only under the new packet identity.

## First Implementation Contract

The first generator should accept a declared candidate configuration with:

- itinerary id and separator ordering;
- section data $x(0)=x_\ast$, $\dot x(0)=-v_\ast$, $0<v_\ast<c_f$;
- half-period antisymmetry constraints;
- separator locations $\sigma_i$ and widths $\rho_i$;
- regular-arc collocation coefficients;
- local fold-coordinate coefficients for the null coordinate whose derivative vanishes at each $\Sigma_i$;
- separator-refined mesh policy and endpoint convention.

It should emit only candidate and pre-ledger artifacts until the null-coordinate pre-ledger passes.

The first pass should report the residual
$$
\mathcal R_{\mathrm{next}}
=
\left(
G_{\mathrm{sec}},
G_{\mathrm{sym}},
G_{\mathrm{per}},
G_{\mathrm{sep}},
G_{\mathrm{match}},
G_{\mathrm{orig}},
\{E_j\},
\{I_{\Sigma_i,k}\},
\{R_j^x,R_j^v\},
H_{\mathrm{pc}}
\right),
$$
where $H_{\mathrm{pc}}$ is a search steering term, not an acceptance theorem.

The parent-complement steering term should penalize any leftover fold-adjacent parent complement with:

- zero outward-rounded null-coordinate gap;
- positive-width null-coordinate overlap;
- residual equality core after accepted simple-root windows are removed;
- uncertified endpoint-scale gap.

## Pre-Ledger Stop Condition

Stop before branch-chart construction unless every pre-ledger row satisfies
$$
\text{row}
\in
\{\text{empty},\text{simple_root},\text{fold_layer}\},
\qquad
\text{with no `split_required` rows}.
$$

Required strict margins include
$$
\gamma_{\mathrm{empty}}>0,
\quad
\nu_{\mathrm{simple}}>0,
\quad
\gamma_{\mathrm{cov}}>0,
\quad
\gamma_{\tau}>0,
\quad
\gamma_h>0,
\quad
\gamma_{\mathrm{sign}}>0,
\quad
\gamma_{\mathrm{inact}}>0.
$$

For every separator, the same packet must provide
$$
\alpha_{\Sigma}>0,
\qquad
\nu_{\mathrm{exit},\Sigma}>0,
\qquad
I^{\mathrm{fold}}_{\eta,\epsilon_c,\Sigma}<\infty,
\qquad
\Delta N_\Sigma\in2\mathbb{Z},
\qquad
\Delta D_\Sigma=0.
$$

Every parent-complement strip left after accepted simple-root and fold-layer subblocks are removed must satisfy at least one accepted alternative:

1. strict outward-rounded null-coordinate range separation;
2. endpoint-excluded singleton contact under the declared boundary convention;
3. exact same-packet fold-layer coverage;
4. same-packet regular-boundary theorem fields: inclusion, domination, ownership, and non-core strict gap.

If any fold-adjacent parent complement retains a positive-width overlap, residual equality core, or uncertified endpoint-scale gap, the successor packet is rejected before branch-chart certification.

## Capture Decision

Priority-only. This packet is an implementation contract and solver-surface audit. It should not be promoted into `content/markdown/aaa`.

The corpus-safe mathematical principle is captured separately in `aaa_corpus_recommendation_handoff.md`: the null-coordinate pre-ledger is a genuine candidate-falsification gate, and branch-chart construction is unauthorized until all ordered rows are consumed as `empty`, `simple_root`, or `fold_layer`.
