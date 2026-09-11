# Operations Work Queue

This is the current execution ledger for deployment, hosting, cost, reliability, release and public-app operations. Completed one-time work moves to [work-log.md](work-log.md); recurring work remains here as a live item with its next due date, while each completed pass is recorded in the work log. Current policies and baselines live in [manuscript.md](manuscript.md). Historical queue snapshots are retained only in the work log.

## Ranked Next Objects

1. `release_gate_profile_coverage` — [OPS-020](#ops-020--release-gate-profile-coverage). Status: Queued.
2. `agent_guidance_surface_consolidation` — [OPS-014](#ops-014--agent-guidance-surface-consolidation). Status: Queued.
3. `reference_equation_mapping_surface` — [OPS-016](#ops-016--reference-equation-mapping-surface). Status: Queued.
4. `archie_mcp_tool_contract_fixture_drift` — [OPS-023](#ops-023--archie-mcp-tool-contract-fixture-drift). Status: Queued.
5. `post_campaign_binding_corruption_sweep` — [OPS-024](#ops-024--post-campaign-binding-corruption-sweep). Status: In progress; broader acceptance remains open.
6. `periodic_project_skill_maintenance` — [OPS-027](#ops-027--periodic-project-skill-maintenance). Status: Recurring; next pass due 2026-11-10.

## In progress

### OPS-024 — Post-campaign binding corruption sweep

- **Priority object:** `post_campaign_binding_corruption_sweep`
- **Request:** Complete the remaining binding and recovery audit after the campaign repairs, using the live recovery queue and semantic closeout record as owners for their scoped obligations.
- **Current boundary:** Finite operational repairs are complete, but the full sweep, same-candidate acceptance, calibration prerequisites and deferred scientific continuation remain open or separately owned.
- **Acceptance:** Every in-scope binding has a measured disposition, unresolved inputs have named owners, and no operational closeout is presented as scientific acceptance.
- **Owner:** operations with Development Process Review and the affected technical owners.

## Queued

### OPS-020 — Release gate profile coverage

- **Priority object:** `release_gate_profile_coverage`
- **Request:** Decide which standalone pages require an accepted release profile and record a reason for every page without one.
- **Acceptance:** Per-page verdicts, selected profiles with captured receipts, and no blanket rule unsupported by the page population.
- **Owner:** operations.

### OPS-014 — Agent guidance surface consolidation

- **Priority object:** `agent_guidance_surface_consolidation`
- **Request:** Inventory Claude and Codex guidance surfaces, resolve conflicts with named precedence, and convert at least one drift class from manual synchronization to an executable check.
- **Acceptance:** Verified inventory, resolved conflicts, explicit precedence and one maintained drift check.
- **Owner:** operations with the live guidance owners.

### OPS-016 — Reference equation-mapping surface

- **Priority object:** `reference_equation_mapping_surface`
- **Request:** Provide operator-facing `reference/` documents with the symbol-definition equation viewer through a separately built and validated registry.
- **Acceptance:** Source-write policy, explicit target set, registry build and validation, and no links from `content/markdown/aaa` into `reference/`.
- **Owner:** operations and the equation-mapping owner.

### OPS-023 — Archie MCP tool-contract fixture drift

- **Priority object:** `archie_mcp_tool_contract_fixture_drift`
- **Request:** Restore agreement between Archie fixture responses and `mcp-tool-contract/v1` semantics without weakening the contract to match the fixtures.
- **Acceptance:** `tests/archie-service-contracts.test.js` passes 14 of 14 with the disagreement explained.
- **Owner:** Archie service owner.

## Awaiting verification

No rows.

## Recurring

### OPS-027 — Periodic project skill maintenance

- **Priority object:** `periodic_project_skill_maintenance`
- **Request:** Review the maintained project skills and their discovery pointers for policy drift, stale references and unsupported duplication.
- **Cadence:** Keep this item live with the next due date; complete an earlier pass when a referenced owner changes materially.
- **Next pass due:** 2026-11-10.
- **Acceptance:** Each maintained skill has a disposition recorded in the work log, with corrections applied only to its live owner and no competing policy source introduced.
- **Owner:** operations with the repository skills-policy owner.

## Closed work

Completed task detail is not retained in this queue. Search [work-log.md](work-log.md) by task identifier for the closure record.
