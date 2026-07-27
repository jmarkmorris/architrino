# Archie Work Queue

This is the canonical execution ledger for accepted Archie product and service work. Core theory closure remains an external dependency, not an Archie implementation task.

## Ranked Next Objects

1. `platform_architecture_packet` — [ARCH-001](#arch-001--platform-architecture-packet). Status: `In progress`.
2. `answer_artifact_manifest_regression_fixture` — [ARCH-002](#arch-002--answer-artifact-manifest-regression-fixture). Status: `Queued`.
3. `source_authority_boundary` — [ARCH-003](#arch-003--source-authority-boundary). Status: `Deferred / blocked`.
4. `service_scaffolding_and_fixtures` — [ARCH-004](#arch-004--service-scaffolding-and-fixtures). Status: `In progress`.
5. `privacy_security_cost_boundary` — [ARCH-005](#arch-005--privacy-security-and-cost-boundary). Status: `Deferred / blocked`.
6. `validation_and_qa` — [ARCH-006](#arch-006--validation-and-qa). Status: `Deferred / blocked`.
7. `aaa_native_explainer` — Status: `Deferred / blocked`.
8. `ask_aaa` — Status: `Deferred / blocked`.
9. `prior_physics_compare` — Status: `Deferred / blocked`.
10. `site_navigator` — Status: `Deferred / blocked`.
11. `claim_level_explainer` — Status: `Deferred / blocked`.
12. `app_helper` — Status: `Deferred / blocked`.

## In progress

### ARCH-001 — Platform architecture packet

- **Status:** In progress
- **Priority object:** `platform_architecture_packet`
- **Request / acceptance:** Fix the future service deployment route and responsibility boundary using the existing deployment decision and architecture packets.
- **Evidence / blocker:** Public static hosting cannot own secrets, model calls, private user data, or durable service operations.
- **Completion:** One deployment route assigns every secret, request, source, provider, log, budget, and rollback responsibility.

### ARCH-004 — Service scaffolding and fixtures

- **Status:** In progress
- **Priority object:** `service_scaffolding_and_fixtures`
- **Request / acceptance:** Define schema-first contracts, fixture families, environment classes, CI gates, staging smoke tests, and rollback evidence before providers or launch.
- **Evidence / blocker:** Depends on ARCH-001.
- **Completion:** The schema and fixture packet can gate a later implementation without inventing another authority path.

## Queued

### ARCH-002 — Answer-artifact manifest regression fixture

- **Status:** Queued
- **Priority object:** `answer_artifact_manifest_regression_fixture`
- **Request / acceptance:** Turn the answer manifest and communication standard into one executable source, claim, media, token, privacy, action, and issue-mining fixture.
- **Evidence / blocker:** Depends on ARCH-001.
- **Completion:** All fields validate together with deliberate authority and privacy negative controls.

## Deferred / blocked

### ARCH-003 — Source-authority boundary

- **Status:** Deferred / blocked
- **Priority object:** `source_authority_boundary`
- **Request / acceptance:** Convert source classes into a deployed-service allowlist.
- **Evidence / blocker:** Depends on the service-platform boundary.
- **Completion:** Public, operator, priority-only, curated-external, and excluded sources are enforced and tested.

### ARCH-005 — Privacy, security, and cost boundary

- **Status:** Deferred / blocked
- **Priority object:** `privacy_security_cost_boundary`
- **Request / acceptance:** Define data movement, providers, rate limits, logging, retention, abuse controls, costs, and failure behavior.
- **Evidence / blocker:** Depends on ARCH-004.
- **Completion:** Launch cannot bypass any declared boundary and negative controls pass.

### ARCH-006 — Validation and QA

- **Status:** Deferred / blocked
- **Priority object:** `validation_and_qa`
- **Request / acceptance:** Define and execute source, answer, privacy, multimodal, deployment, and rollback acceptance.
- **Evidence / blocker:** Depends on ARCH-005.
- **Completion:** The launch checklist passes on the selected architecture.

### ARCH-007 through ARCH-012 — Candidate response modes

- **Status:** Deferred / blocked
- **Priority objects:** `aaa_native_explainer`, `ask_aaa`, `prior_physics_compare`, `site_navigator`, `claim_level_explainer`, and `app_helper`
- **Request / acceptance:** Investigate these as modes of one Archie service: native-frame explanation, published-corpus Q&A, inherited-physics comparison, site navigation, claim-level explanation, and app guidance.
- **Evidence / blocker:** Depends on ARCH-001 through ARCH-006 and stable source-authority contracts; no mode may elevate priority or diagnostic material.
- **Completion:** Each retained mode has one service contract, source allowlist, response fixture, and explicit claim boundary, or is withdrawn.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
