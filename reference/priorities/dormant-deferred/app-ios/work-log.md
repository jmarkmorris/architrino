# App iOS Work Log

This file is the chronological work log for the `app-ios` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use `priorities.md` for strategy, status, blockers, and promotion routing, and use `work-queue.md` for accepted executable tasks and their local order. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-09-02 — Priority owner archived

- Moved the complete `app-ios` priority packet under `dormant-deferred` at operator direction. Existing reader and packaging capabilities remain available, but the six preserved queue rows are not executable until explicit reactivation.
- This archive action does not establish physical-device QA, a signed archive, App Review acceptance, or publication.

### 2026-08-27 — On-demand packaging and release deferral

- Operator report: the reader has been tested some on the operator's devices and basically works. This is preliminary firsthand feedback, not a complete physical-device QA receipt or App Store readiness claim.
- Operator decision: preserve the iOS app and textbook packaging process/software without producing a new package for every PR; App Store release is deferred until theory closure.
- Implementation: remove iOS package freshness from the routine Content Integrity gate and stop the routine frequency-triplet notation audit from treating a saved iOS snapshot as current corpus. Keep the exporter and its strict check available for explicitly requested iOS package/build work.
- Policy: preserve the on-demand recipe in the app README and defer IOS-001 through IOS-003 until theory closure and an explicit operator release decision. Existing generated packages, app code, and web textbook generation are unchanged by this decision.
- Verification boundary: workflow and routing tests can establish the changed gate behavior, not device quality or release readiness. No new iOS package, archive, or submission is produced by this workflow change.
- Validation: the focused PR procedure, pre-push policy, exact-state receipt, and iOS link-routing suites passed 19/19 tests, including a stale-snapshot/current-authored-content negative control. Strict content validation and the live frequency-triplet audit passed; `git diff --check` was clean. The generated startup router is stale after its policy inputs changed; regenerate it with `node scripts/build-agent-startup-orientation.mjs --write` at the next authorized regeneration or final-PR checkpoint, then rerun its `--check`.
