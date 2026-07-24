# App Ideas Work Log

This file is the chronological work log for the `app-ideas` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use the main priority tracker in this directory for the compact current queue, blockers, promotion routing, and next action. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-07-23 - Braid Search Applications Exposure

- Added the read-only Braid Search compact-campaign dashboard to the canonical Applications scene and standalone launch mapping. The public shell retains its diagnostic-only boundary and does not bundle the ignored 693-row local campaign export; users load the compatible JSON when the deployment host does not provide the default local path.

### 2026-07-23 - Learner-Value Portfolio Audit And Execution Packets

- Reconciled the portfolio against the live production Applications manifest, `StandaloneAppLaunchRuntime.js`, public routes, standalone entry points, and the active app priority folders. The complete deployed set is twelve Applications-scene entries plus the Navigator and the two public off-manifest standalone routes, Assembly Configuration Explorer and Website Stats; every checked public URL returned HTTP 200.
- Recounted every nonzero backlog against the numbered capability bank: Causal Delay Feedback `5`, Borg `4`, Standard Model `2`, Interaction Ledger Lab `2`, Emergence and Measurement Lab `4`, Lorentz Recovery Lab `2`, and Noether Sea Response Lab `3`. The status blocks remain correctly ordered as deployed, started, not started, and deferred.
- Kept Gell-Mann Pattern Atlas active because its learner journey now explicitly moves from classification, to pattern completion, to a classification-versus-open-mechanism contrast. A decorative diagram without that sequence is not an active app concept.
- Classified Causal Delay Feedback Story and Prediction and Borg Prescribed Translation and Causal-History Tubes as `promote now`; retained Standard Model and Interaction Ledger Lab as `priority-only`; retained the three recovery- or constitutive-dependent labs as `defer with blocker`.
- Added separate execution packets for the Causal Delay Feedback learner progression and Borg prescribed translation. The packets do not implement either app and do not change their trackers, schemas, evaluators, records, or claim authority.

### 2026-07-02 - Public Applications Scene Launch Resume

- Resumed the paused public Applications scene work after the priority-directory partition cleanup. Current branch `codex/galatea` already exposes [Assembly Configuration Explorer](../../../assembly-explorer.html), [Causal Delay Feedback](../../../causal-delay-feedback.html), [Animator](../../../animator.html), and [Borg](../../../borg.html) through [applications.json](../../../content/scenes/archie/applications.json) wrapper-scene entries and [StandaloneAppLaunchRuntime.js](../../../src/apps/navigator/StandaloneAppLaunchRuntime.js) standalone launch mappings; [Equation Mapping](../../../equation-mapping.html) is also present in the same public app-launch path.
- The focused regression home is [standalone-app-launch.test.js](../../../tests/standalone-app-launch.test.js), which records the work-in-progress app scene mappings, Applications-scene home route, and unknown-scene fail-closed cases.
- Live static check on 2026-07-02 confirmed `https://architrino.com/content/scenes/archie/applications.json` contains those entries, and the `www.architrino.com` standalone HTML paths for the listed apps return HTTP 200.
- No tracker queue change came from this resume note. The next action is in-browser runtime QA and refinement for the public Applications surface rather than priority reshuffling.
