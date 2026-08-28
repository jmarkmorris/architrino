# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `deployment_budget_contract` — Status: `Queued`.
2. `github_pages_limits_research` — Status: `Queued`.
3. `webapp_release_gate` — Status: `Queued`.
4. `browser_performance_budget` — Status: `Queued`.
5. `hosting_alternatives_survey` — Status: `Queued`.
6. `static_asset_inventory` — Status: `Queued`.
7. `github_actions_artifact_policy` — Status: `Queued`.
8. `observability_and_analytics_policy` — Status: `Queued`.
9. `incident_and_rollback_runbook` — Status: `Queued`.
10. `domain_dns_and_certificate_inventory` — Status: `Queued`.
11. `dependency_and_security_review` — Status: `Queued`.
12. `support_feedback_loop` — Status: `Queued`.

## Queued task records

- **OPS-001 — `deployment_budget_contract`.** Define `deployment-budget.v1` for bundle, transfer, browser heap/GPU/storage, Actions artifacts, generated output, and separately reported EOM throughput; apply it first to Borg. **Completion:** one measured contract is consumed by Borg without merging hosting and solver budgets.
- **OPS-002 — `github_pages_limits_research`.** Verify current Pages and Actions limits from official sources. **Completion:** a dated source-bound limits record exists.
- **OPS-003 — `webapp_release_gate`.** Define content, graph, size, visual, browser, accessibility, preview, and rollback checks. **Completion:** one public app passes the gate end to end.
- **OPS-004 — `browser_performance_budget`.** Establish measured launch, interaction, 4K frame-rate, heap, GPU, and storage budgets. **Completion:** representative profiles establish thresholds and failure behavior.
- **OPS-005 — `hosting_alternatives_survey`.** Compare static and service-backed alternatives only after OPS-002. **Completion:** a measured decision table states cost/complexity trigger conditions.
- **OPS-006 — `static_asset_inventory`.** Measure shipped and candidate JSON, scenes, captures, fonts, WASM, images, and review artifacts. **Completion:** compressed/uncompressed inventory distinguishes public from non-shipping artifacts.
- **OPS-007 — `github_actions_artifact_policy`.** Define retention and size policy for captures, benchmarks, review bundles, and failure logs. **Completion:** workflows have explicit retention/size limits.
- **OPS-008 — `observability_and_analytics_policy`.** Decide telemetry, consent, retention, and sensitive-work boundaries. **Completion:** accepted policy and negative controls exist.
- **OPS-009 — `incident_and_rollback_runbook`.** Define response to broken, stale, slow, or over-budget deployments. **Completion:** one dry run proves rollback and communication steps.
- **OPS-010 — `domain_dns_and_certificate_inventory`.** Record route, DNS, certificate, redirect, and canonical-URL ownership. **Completion:** every public route has an owner and check.
- **OPS-011 — `dependency_and_security_review`.** Define dependency, supply-chain, CSP, and third-party-script policy. **Completion:** current public dependencies have dispositions.
- **OPS-012 — `support_feedback_loop`.** Define privacy-safe reproducible user feedback intake. **Completion:** one intake path captures device/browser/manifests without exposing private workflow.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

No rows.
