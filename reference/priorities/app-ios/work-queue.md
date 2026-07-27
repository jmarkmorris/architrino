# iOS Work Queue

This is the canonical execution ledger for remaining iPhone and iPad release work. Implemented reader history remains in [priorities.md](priorities.md) and [work-log.md](work-log.md).

## Rules

1. Keep live release and post-v1 tasks here; completed prototype inventory is not a live task.
2. Require current package validation and physical-device evidence where specified.
3. Re-check current Apple policy before any external submission or pricing action.

## Ranked Next Objects

1. `first_release_device_qa_and_archive` — [IOS-001](#ios-001--first-release-device-qa-and-archive). Status: `Queued`.
2. `app_store_distribution_pricing_plan` — [IOS-002](#ios-002--app-store-distribution-and-pricing-plan). Status: `Queued`.
3. `app_review_and_unlisted_distribution` — [IOS-003](#ios-003--app-review-and-unlisted-distribution). Status: `Queued`.
4. `molecule_visualization` — [IOS-004](#ios-004--molecule-visualization). Status: `Deferred / blocked`.
5. `download_update_path` — [IOS-005](#ios-005--download-update-path). Status: `Deferred / blocked`.
6. `sync_and_export` — [IOS-006](#ios-006--sync-and-export). Status: `Deferred / blocked`.

## Queued

### IOS-001 — First-release device QA and archive

- **Status:** Queued
- **Priority object:** `first_release_device_qa_and_archive`
- **Request / acceptance:** Refresh the canonical package, pass strict package validation, verify version/date on physical hardware, complete iPhone and iPad TestFlight smoke tests, capture release screenshots, and produce the signed archive.
- **Evidence / blocker:** Requires physical iPhone and iPad access plus current package output.
- **Completion:** Package checks pass, device evidence and screenshots are captured, and a signed App Store archive packet exists.

### IOS-002 — App Store distribution and pricing plan

- **Status:** Queued
- **Priority object:** `app_store_distribution_pricing_plan`
- **Request / acceptance:** Reconfirm unlisted-distribution requirements and finalize price, agreements, tax, banking, commission-program posture, promotion policy, and promo-code use from current Apple sources.
- **Evidence / blocker:** Must be refreshed immediately before submission because policy can change.
- **Completion:** One recorded release plan is accepted and all required commercial-account prerequisites are satisfied.

### IOS-003 — App Review and unlisted distribution

- **Status:** Queued
- **Priority object:** `app_review_and_unlisted_distribution`
- **Request / acceptance:** Upload the accepted archive, pass App Review, request unlisted distribution, and publish the approved direct install route.
- **Evidence / blocker:** Depends on IOS-001 and IOS-002; this is an external publication action.
- **Completion:** Apple approves the release and the direct unlisted install link is verified.

## Deferred / blocked

### IOS-004 — Molecule visualization

- **Status:** Deferred / blocked
- **Priority object:** `molecule_visualization`
- **Request / acceptance:** Add canonical textbook deep links, select one embed-or-native implementation path, and add the minimal Visualizations list-detail flow.
- **Evidence / blocker:** Explicitly post-v1; depends on first-release completion.
- **Completion:** One canonical implementation path passes device QA without duplicating runtime or state.

### IOS-005 — Download update path

- **Status:** Deferred / blocked
- **Priority object:** `download_update_path`
- **Request / acceptance:** Define and implement remote content updates only after the app-bundle contract is stable.
- **Evidence / blocker:** Post-release scope.
- **Completion:** Versioning, integrity, rollback, and failure behavior are accepted.

### IOS-006 — Sync and export

- **Status:** Deferred / blocked
- **Priority object:** `sync_and_export`
- **Request / acceptance:** Add optional cross-device sync and sharing only after local reader parity is stable.
- **Evidence / blocker:** Post-release scope with privacy and data-ownership decisions.
- **Completion:** The accepted sync/export contract and focused device tests pass.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
