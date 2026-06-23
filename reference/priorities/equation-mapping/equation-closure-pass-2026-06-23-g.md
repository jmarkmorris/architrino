# Equation Closure Pass 2026-06-23 G

## Workstream Metadata

- Kind: `priority`
- Status: `complete`
- Mode: `team-agent continuation with executable reducer integration`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Score column updated: none
- Claim level: score-neutral retained identity acceptance check

## Purpose

This pass turned the `same_branch_chart_identity` blocker for `EQ-02` through `EQ-04` into a fail-closed executable acceptance extractor. The target row is not a new score gate; it is the same retained identity row already required by the translating-binary carrier:

$$
\texttt{same\_branch\_chart\_identity}:
S_{\mathrm{eq}}
\longrightarrow
\left(
\mathcal C_{02\text{-}04}^{\mathrm{bin}},
\Theta_{02\text{-}04}^{\mathrm{bin}},
\mathcal R_{02\text{-}04}^{\mathrm{bin}},
\mathcal R_{01-05}^{\mathfrak B}(W)
\right)
$$

only when the retained branch chart binds the same raw labels, inventory, role map, path history, causal roots, wake tails, energy/action, momentum/angular momentum, phase rows, plane-orientation rows, response-center/group-velocity rows, Noether sea record, and binary-to-binary phase identity.

The executable artifact is [check-same-branch-chart-identity.mjs](../../../scripts/equation-mapping/check-same-branch-chart-identity.mjs). It consumes either `frequencyTripletSearch.equalFrequencyEnergyRadiusAudit` from the tri-binary solver report or a direct retained-domain packet for $S_{\mathrm{eq}}$, and separates current proxy row-set alignment from retained acceptance.

## Executable Result

Command:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs --input /tmp/tri-binary-equation-bearing-check-e.json --summary --pretty
```

Summary:

| Field | Result |
| --- | --- |
| Output schema | `aaa-equation-map-same-branch-chart-identity-check/v1` |
| Source audit path | `frequencyTripletSearch.equalFrequencyEnergyRadiusAudit` |
| Target row | `same_branch_chart_identity` |
| Retained row set | `S_eq` |
| Status | `blocked_current_proxy_only` |
| Score decision | `no_score_increase` |
| Retained branch claim | `false` |
| Current proxy evidence | 7/7 sources populated |
| Structural witness | 15/15 current witnesses populated |
| Retained identity requirements | 0/14 accepted |

The fail-closed mode is also verified:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs --input /tmp/tri-binary-equation-bearing-check-e.json --require-accepted --out /tmp/same-branch-required.json
```

exits nonzero while the retained identity requirements remain unaccepted.

## Direct Retained-Domain Attempt

The same extractor now also consumes [same-branch-retained-domain-attempt.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json), a score-neutral attempt skeleton for the retained event or positive-width domain demanded by $\operatorname{RowId}_{S_{\mathrm{eq}}}(\mathfrak D_R)$. This is not a mock acceptance row; every row is marked `attempt`, so it only fixes the packet shape.

Command:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs --input scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json --summary --pretty
```

Summary:

| Field | Result |
| --- | --- |
| Input kind | `retained_domain_packet` |
| Status | `blocked_missing_retained_event_or_domain` |
| Score decision | `no_score_increase` |
| Retained row set | `S_eq` |
| Support kind | `positive_width_domain` |
| Retained identity requirements | 0/14 accepted |
| Retained requirement statuses | all 14 requirements report `attempt` |
| Domain witnesses | `split_witness_zero`, `retune_witness_zero`, and `overlap_preimage_identity` missing as accepted witnesses |
| Domain witness statuses | `split_witness_zero=attempt`, `retune_witness_zero=attempt`, `overlap_preimage_identity=attempt` |

The fail-closed retained-domain mode is also verified:

```sh
node scripts/equation-mapping/check-same-branch-chart-identity.mjs --input scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json --require-accepted --out /tmp/same-branch-retained-domain-attempt-required.json
```

exits nonzero because attempt rows do not count as retained acceptance. The first named blocker is the support row itself: the positive-width domain is present as a packet shape, but it is not an accepted retained event or accepted positive-width retained domain. The summary now also exposes `retainedRequirementStatuses` and `domainWitnessStatuses`, so future packets can be audited row-by-row without collapsing `attempt`, `missing`, and `accepted` states.

## Missing Retained Inputs

The extractor currently reports these missing retained inputs:

- raw labeled rows preserved on retained history;
- six-body polarity-neutral inventory preserved;
- role map or quotient-sector policy declared;
- shared retained event or positive-width domain;
- path-history rows bound to $S_{\mathrm{eq}}$;
- causal-root ledger rows bound to $S_{\mathrm{eq}}$;
- wake-tail rows bound to $S_{\mathrm{eq}}$;
- energy/action rows bound to $S_{\mathrm{eq}}$;
- momentum and angular-momentum rows bound to $S_{\mathrm{eq}}$;
- phase rows bound to $S_{\mathrm{eq}}$;
- retained plane-orientation rows bound to $S_{\mathrm{eq}}$;
- response-center and group-velocity rows bound to $S_{\mathrm{eq}}$;
- Noether sea record bound to $S_{\mathrm{eq}}$;
- binary-to-binary phase row-set identity.

These are the concrete row-population obligations before `same_branch_chart_identity` can be counted inside the `EQ-02` through `EQ-04` common carrier.

## Score Decision

No `6/23 b` score changes are justified.

- `EQ-02` remains `4`: current proxy evidence supports a common-clock search path, but the retained clock row and same-branch identity are absent.
- `EQ-03` remains `4`: the envelope relation is still a reduced-chart proxy until the same retained row set binds the deformation rows.
- `EQ-04` remains `4`: energy, momentum, rest-mass, mass-shell, exposure, and Noether sea response rows are not yet accepted on $S_{\mathrm{eq}}$.
- No `Promoted?` cells should be marked `ready` or `complete` from this pass.

## Next Reducer Target

The smallest score-moving follow-up is no longer another identity summary. It is to replace the attempt rows in [same-branch-retained-domain-attempt.v1.json](../../../scripts/equation-mapping/same-branch-retained-domain-attempt.v1.json) with accepted retained rows from the first retained event or retained positive-width domain for $S_{\mathrm{eq}}$ that binds at least:

$$
\left(
\texttt{path\_history\_rows},
\texttt{causal\_root\_ledger},
\texttt{wake\_tail\_rows},
\texttt{energy\_action\_rows},
\texttt{momentum\_and\_angular\_momentum\_rows},
\texttt{phase\_rows},
\texttt{Noether\_sea\_record}
\right)
$$

with a declared raw-label/role-map policy. Once that event or domain exists, the extractor can distinguish a retained same-branch identity from current proxy row-set alignment.

## Promotion Decision

Priority-only. This pass adds a useful success marker and guardrail under the existing `EQ-02` through `EQ-04` proof route, but it does not create a reader-facing result. Promotion remains blocked until the retained branch chart supplies the common carrier and same-record residuals without hidden retune.
