# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `deployment_budget_contract` — Status: `Queued`.
2. `webapp_release_gate` — Status: `Queued`.
3. `browser_performance_budget` — Status: `Queued`.
4. `hosting_alternatives_survey` — Status: `Queued`.
5. `observability_and_analytics_policy` — Status: `Queued`.
6. `incident_and_rollback_runbook` — Status: `Queued`.
7. `dependency_and_security_review` — Status: `Queued`.
8. `support_feedback_loop` — Status: `Queued`.

## Queued task records

- **OPS-001 — `deployment_budget_contract`.** Define `deployment-budget.v1` for bundle, transfer, browser heap/GPU/storage, Actions artifacts, generated output, and separately reported EOM throughput; apply it first to Borg. **Completion:** one measured contract is consumed by Borg without merging hosting and solver budgets.
- **OPS-003 — `webapp_release_gate`.** Define content, graph, size, visual, browser, accessibility, preview, and rollback checks. **Completion:** one public app passes the gate end to end.
- **OPS-004 — `browser_performance_budget`.** Establish measured launch, interaction, 4K frame-rate, heap, GPU, and storage budgets. **Completion:** representative profiles establish thresholds and failure behavior.
- **OPS-005 — `hosting_alternatives_survey`.** Compare static and service-backed alternatives only after OPS-002. **Completion:** a measured decision table states cost/complexity trigger conditions.
- **OPS-008 — `observability_and_analytics_policy`.** Decide telemetry, consent, retention, and sensitive-work boundaries. **Completion:** accepted policy and negative controls exist.
- **OPS-009 — `incident_and_rollback_runbook`.** Define response to broken, stale, slow, or over-budget deployments. **Completion:** one dry run proves rollback and communication steps.
- **OPS-011 — `dependency_and_security_review`.** Define dependency, supply-chain, CSP, third-party-script, and public-domain hardening policy, including dispositions for DNSSEC, CAA, HSTS, Pages domain verification, and mail-security boundaries identified by OPS-010. **Completion:** current public dependencies and domain-security controls have explicit dispositions.
- **OPS-012 — `support_feedback_loop`.** Define privacy-safe reproducible user feedback intake. **Completion:** one intake path captures device/browser/manifests without exposing private workflow.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

No rows.
