# Observability And Analytics Policy

## Purpose And Claim Boundary

This policy closes OPS-008 by defining the accepted telemetry, consent, retention, and sensitive-work boundaries for public applications and deployment operations. Its machine-checkable state is [`observability-policy.v1.json`](observability-policy.v1.json). The policy governs application-controlled collection; it does not claim that hosting, network, browser, operating-system, or external-data providers retain no request metadata under their own terms.

Plainly: Architrino currently sends no client analytics. Build logs and operator-run measurements remain available for reliability work, but they must not be repurposed into user tracking.

## Accepted Current State

| Area | Accepted state | Consequence |
| --- | --- | --- |
| Client analytics | `disabled_no_collector` | No page-view, engagement, error, device, identity, or content event may be sent by an Architrino application. |
| Consent | Explicit opt-in before the first event | An absent preference, unchecked opt-out, unavailable storage, or hypothetical future collector does not authorize sending. |
| Raw analytics retention | 0 days | No raw client analytics event is collected or retained. |
| Aggregate analytics retention | 0 days | The Website Statistics page remains an unconnected zero-data display, not a live traffic report. |
| Cross-site tracking | Prohibited | No cross-site identifier or advertising profile may be created. |
| Device fingerprinting | Prohibited | Raw user-agent, font, canvas, screen, hardware, or similar attributes may not be combined to recognize a browser. |
| Sale or advertising use | Prohibited | Operational evidence cannot be sold, shared for advertising, or used to target a person. |
| Explicit browser opt-out | Preserved as an additional veto | The existing `architrino.analyticsOptOut` value can forbid a future accepted collector, but clearing it does not grant consent. |

The zero-day retention decisions are literal current policy, not placeholders interpreted as unlimited retention. A future collector must change the accepted contract and name nonzero raw and aggregate retention periods before its first event can be sent.

Plainly: there is no implied consent. Today the sending path is disabled in code, the collector list is empty, and the retention clock has nothing to retain.

## Verified Application Audit

The negative-control test audited 219 authored app-source files: 23 HTML, 171 JavaScript, 18 JavaScript modules, and 7 Swift files. Generated iOS textbook copies and bundled ReaderAssets were excluded because their canonical sources or vendored packages are checked elsewhere.

| Audit target | Result | Claim grade |
| --- | --- | --- |
| Known analytics collector domains | None found | Measured by [`operations-observability-policy.test.js`](../../../tests/operations-observability-policy.test.js); the finite pattern list is not proof against an unlisted endpoint. |
| `sendBeacon`, cookie access, `XMLHttpRequest`, `WebSocket`, and `EventSource` | None found | Measured source scan over the named authored files. |
| Remote executable, stylesheet, image, or iframe tags | None found | Measured HTML source scan. |
| Website Statistics live source | Not connected | Measured from [`website-stats.json`](../../../content/analytics/website-stats.json): mode is `unconnected`, totals are zero, and every series is empty. |
| Website analytics send decision | Defaults to false | Measured unit tests cover absent preference, explicit opt-out, unavailable storage, and hypothetical collector/consent flags while policy mode remains disabled. |
| iOS reader | No application analytics | Source-bound to the current iOS reader contract and included in the known-collector scan; App Store or provider behavior remains separately verifiable. |

Plainly: these controls establish the current authored-code state and make common hidden collection paths fail tests. They do not prove that an unknown future technique is impossible, so code review and browser network inspection remain required for any collector proposal.

## Sensitive-Work Boundary

The following data must never enter application analytics or public diagnostic artifacts: URL query strings and fragments; search text; molecule names or formulas; equations, documents, scene contents, and editor state; clipboard data; local file names or contents; local-storage and session-storage values; private prompts, private media, credentials, tokens, account identifiers, full IP addresses, and raw user-agent strings.

Local application state is not analytics merely because it is stored in the browser. Equation Mapping documents, app settings, launch payloads, and similar state remain local product data and must not be read by an analytics path. Public-repository Actions artifacts inherit the stricter privacy exclusions in the [GitHub Actions artifact policy](github-actions-artifact-policy.md).

Operational logs can contain repository paths, commit identifiers, timings, and failure messages. They may be used to diagnose builds and deployments, but public artifacts must exclude credentials, private paths, user content, and local private-work material. Hosting-provider request metadata is outside the repository's collector contract and must not be represented as application analytics that this policy controls.

Plainly: a useful performance number is allowed; the user's work that produced it is not. For example, a locally measured launch duration may be recorded, but the open document, search, formula, query string, or private file may not accompany it.

## External Data Services Are Not Analytics

The Molecule app uses PubChem PUG REST for an explicit data lookup. This is allowed only when the user presses Add after the page states that an unlisted molecular formula will be sent to PubChem. The optional molecule name is not transmitted to PubChem. A shared-link load does not activate PubChem and instead constructs the formula locally.

This exception permits one disclosed functional request; it does not permit telemetry identifiers, background requests, automatic shared-link lookup, reuse of the response as an analytics event, or extension to another origin. PubChem controls its own service-side request handling, so the UI disclosure and future privacy review must be revisited if the transmitted fields or provider change.

Plainly: asking PubChem for a molecule after pressing Add is a product action, not a visit-tracking event. Opening a shared molecule link no longer makes that third-party request automatically.

## Allowed Operational Observability

The following evidence remains allowed because it measures the system rather than a person:

- GitHub Actions build and deployment logs;
- GitHub Pages service status, response headers, certificates, and route checks;
- operator-run local browser performance profiles;
- source-bound aggregate payload, artifact, and deployment measurements;
- privacy-redacted error classes produced by an accepted test or release gate.

Each retained record must state its instrument, scope, retention owner, and falsifier. Local profiles remain ignored local output unless another accepted task explicitly authorizes a bounded artifact. Provider/account dashboards may be inspected for aggregate capacity or incident evidence, but their data must not be copied into the repository if it contains user-level identifiers or sensitive request details.

## Future Collector Gate

No analytics provider or client event path may be added until all of the following are accepted together:

1. A narrow purpose and minimal event schema that exclude every prohibited field.
2. A named provider, data-processing review, data location, deletion behavior, and cost boundary.
3. Visible, specific opt-in before the first event; a prechecked control or opt-out-only flow fails the gate.
4. Working consent revocation and deletion behavior.
5. Explicit raw and aggregate retention periods; the current zero-day values remain authoritative until changed.
6. Source scans plus browser-network tests proving no event before consent, no event after revocation, and no sensitive-field transmission.
7. OPS-011 security disposition for CSP, third-party scripts, and the provider origin.
8. Operator approval of the provider and public disclosure.

The Website Statistics opt-out remains defense in depth, not a substitute for this gate. Changing `WEBSITE_ANALYTICS_POLICY_MODE` from `disabled` is therefore an implementation-visible policy change that must update the contract, tests, disclosure, and retention decision in the same accepted work.

## Negative Controls And Reproduction

- Run `node --test tests/operations-observability-policy.test.js tests/website-analytics-opt-out.test.js`. Any known collector, hidden-send primitive, remote executable/media tag, connected Website Statistics source, permissive default, undisclosed PubChem activation, or automatic shared-link lookup fails.
- Search browser network traffic for requests outside the site origin. Any unexplained origin overturns the current source-scan result and must be blocked or added through the external-service or future-collector gate.
- Inspect `content/analytics/website-stats.json`. Any nonzero or connected state must name its source, collection authority, consent state, and retention before publication.
- Inspect the iOS privacy metadata before release. Any networked collection overturns the current no-analytics statement and requires the same collector gate.
- Re-run the source scan after adding a browser API, third-party script, external service, or app entry point; the current 219-file count is a dated snapshot.

Closure goal: preserve useful system-level evidence while keeping user behavior, identity, content, and private work outside every analytics and public-diagnostic path.
