# Operations Priorities

## Workstream Metadata

- Kind: `priority-operations`
- Rank: `unranked active owner`
- Value: `0.00`
- Cost: `0.0`
- ROI: `0.00`
- Status: `active-no-executable-object`
- Claim level: `operations-priority`
- Scope: deployment discipline, service limits, release readiness, cost visibility, reliability, and webapp growth operations.

## Purpose

This workstream tracks operational discipline for the project as the public webapp surface, static assets, generated artifacts, simulations, and user base grow. It is not a theory lane and not a solver-design lane. It records the infrastructure, deployment, quality, and support work needed to keep published apps reliable, inspectable, and affordable.

## Current Decisions

1. GitHub Pages is treated as static hosting unless a future service backend is explicitly introduced.
2. Browser runtime compute, browser heap, GPU memory, and browser storage must be measured separately from GitHub Pages transfer and GitHub Actions usage.
3. Public/review output quality for visual apps targets 4K UHD, 3840 by 2160, while solver authority remains separate from display resolution.
4. Deployment decisions should be evidence-bound: site size, bundle size, static transfer, monthly bandwidth estimate, build/deploy behavior, artifact retention, browser performance, and cost model must be measured before changing hosting strategy.
5. Operational work should protect product quality without creating a second solver path or bypassing EOM solver ownership.

## Operator Response and Discussion Capture

The [operator explanation standard](../../op/operator-explanation-standard.md) owns response mechanics, and the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) defines writing style. The operator has accepted flexible answer-first responses, explanation proportional to the question, live organized capture of substantive discussion in the owning `priorities.md`, and a final numbered list of possible next actions with a recommendation for each. Fuller explanations, accepted executable tasks, and chronology retain the existing sibling-document split. Academic prose remains the standard so prepared material can be promoted into the corpus at its supported claim level.

The revised standard is ready for operator review. The separate completion report and mandatory closure-goal footer are removed from the authored guidance. Related clarification questions may be bundled; decisions needed now are distinguished from optional or deferred follow-ups. The remaining review is whether the revised document and its short examples express the intended workflow; it does not reopen the accepted writing-style decision. Strict content validation and priority-ranking validation passed. Startup projection checks report drift in `reference/op/agent-startup-orientation.generated.md` and the generated floor of `CLAUDE.md`; the authored generators are updated, and regeneration is deferred until explicit authorization under the repository generation policy. The required commands are `node scripts/build-agent-startup-orientation.mjs --write` and `node scripts/build-claude-bootstrap-floor.mjs --write`, each followed by its corresponding `--check`.

## Office Document Standards Review

The operator authorized sequential review and safe updates to every document in Research Office and Learning Office on 2026-09-04. The [per-document review ledger](office-document-standards-review.md) records the complete measured inventory, individual dispositions, and preservation boundaries. The baseline includes 135 Research Office and 157 Learning Office Markdown documents; 166 other files are inventoried for preservation. Review begins with governing roles and procedures, then subordinate prompts and remaining documents. Historical evidence, append-only records, artwork, manuscripts, production prompts, and appearance baselines retain their applicable protections. The current task is in progress; pending documents carry no conformance claim.

## Work Queue

The locally ranked operational tasks, measurement requirements, and completion boundaries live in [work-queue.md](work-queue.md).

## Deployment Budget Baseline

OPS-001 is closed by the measured [deployment-budget.v1](deployment-budget.v1.json), its executable checker, and Borg's live manifest consumption. The fresh 4K first-screen profile measured 2,513,867 encoded shell bytes, 42,712 encoded static-asset bytes, 12,138,288 browser-heap bytes, a 26,429,760-byte canvas-surface lower bound, and zero origin-storage bytes. A fresh empty-directory Pages build measured 453,526,774 bytes, down 27,971,992 bytes from the 2026-09-01 OPS-006 reconstruction. Two non-expired Pages artifacts totaled 414,359,287 stored bytes, which is 14,359,287 bytes above the conservative 400,000,000-byte overlap threshold while the account allowance is unknown; the contract therefore reports a warning without blocking the existing guarded deployment path. The 1,000-visit bandwidth scenario is inferred from the measured initial-load bytes, not observed traffic. EOM solver throughput remains explicitly unmeasured and separately owned by `app-solver`; it does not enter the deployment verdict.

Plainly: Borg now shows one measured hosting-and-browser budget, the recent storage reduction is reflected, and the only present warning is short-lived overlap between two Pages artifacts. The contract does not turn web-delivery measurements into a solver-speed claim.

## GitHub Pages Limits Baseline

OPS-002 is closed by the dated [GitHub Pages and Actions limits record](github-pages-and-actions-limits-2026-09-01.md). The accepted live deployment is 415,238,878 bytes and the 2026-09-01 active-checkout reconstruction is 481,493,486 bytes, both below the builder's 1,000,000,000-byte ceiling. The source repository remains above the Pages-specific 1 GB recommendation, and representative per-visit transfer remains unmeasured.

## Static Asset Inventory Baseline

OPS-006 is closed by the dated [static asset inventory](static-asset-inventory-2026-09-01.md). Its concurrent active-checkout reconstruction measured 481,498,766 public bytes, including 179,521,026 bytes of declared build-generated runtime data, while existing rules kept 958,248,972 tracked bytes Git-only. A disjoint 78,593,285-byte public candidate set now awaits explicit deployment-scope decisions; no asset was removed. The browser-performance baseline below now owns representative cold and warm route transfer, while OPS-007 owns Actions artifact retention rather than local or Pages storage.

## GitHub Actions Artifact Baseline

OPS-007 is closed by the [GitHub Actions artifact policy](github-actions-artifact-policy.md). Every current upload has an explicit class, retention, and pre-upload size ceiling: the sole producer is the one-day Pages deployment handoff guarded by the existing 1,000,000,000-byte static-builder limit. Future diagnostics, captures, benchmarks, and review bundles have bounded class rules; raw scientific output and sensitive material are prohibited by default. Aggregate overlap must be checked separately from per-artifact retention.

## Domain, DNS, And Certificate Baseline

OPS-010 is closed by the dated [domain, DNS, and certificate inventory](domain-dns-and-certificate-inventory-2026-09-01.md). The canonical public origin is `https://www.architrino.com`; the apex, HTTP variants, and GitHub project domain converge on it with path preservation. The served GitHub Pages certificate covers both hostnames and passed trust and 60-day validity checks. Account-level domain verification remains operator-checkable because the recommended public TXT proof is absent; DNSSEC, CAA, HSTS, and mail-security decisions route to OPS-011, while source-level apex-link cleanup requires a separately accepted task.

## Hosting Alternatives Baseline

OPS-005 is closed by the dated [hosting alternatives survey](hosting-alternatives-survey-2026-09-01.md). The active-checkout payload remains a comfortable fit for GitHub Pages at 482,203,515 bytes, while two required generated JSON assets prevent an unchanged Cloudflare Pages deployment and three files enter Netlify's documented large-file risk class. Vercel Hobby cannot accept the payload and is outside the professional-use boundary; Vercel Pro fits but adds a paid platform without solving a measured current constraint. GitHub Pages remains the host until a recorded size, transfer, deployment-reliability, large-object, service, or total-cost trigger is reached.

## Observability And Analytics Baseline

OPS-008 is closed by the accepted [observability and analytics policy](observability-and-analytics-policy.md) and its [versioned contract](observability-policy.v1.json). Client analytics are disabled with zero raw and aggregate retention; Website Statistics remains an unconnected zero-data public static operations utility under Archie Operations, outside the product-application catalogue and public scene search. Its route has no access control, and the browser opt-out is an additional veto rather than consent. Automated negative controls scan authored app sources for common hidden-send paths and keep PubChem limited to a disclosed molecule-form submission; shared molecule links load locally without contacting the external service.

## Published Borg Record Identity

OPS-013 is closed by the dated [production byte-identity audit](pages-borg-record-byte-identity-audit-2026-09-02.md). GitHub Actions run `33685894947` establishes only that the 145-of-145 verifier passed on Ubuntu for the portable emitter before an unrelated generated-orientation failure stopped that branch job. PR [#246](https://github.com/jmarkmorris/architrino/pull/246) then merged the same emitter state, post-merge `main` Pages run [`33690784657`](https://github.com/jmarkmorris/architrino/actions/runs/33690784657) completed validation, runtime reconstruction, Borg identity verification, artifact upload, and deployment successfully at commit `00710092e165486f072c9dfe6cd8af4e8e99d343`, and Content Integrity run [`33690784705`](https://github.com/jmarkmorris/architrino/actions/runs/33690784705) passed at the same commit. The independent public HTTPS audit measured 145 matching registry/record SHA-256 identities out of 145, and the first, middle, and last registry selections each loaded through Borg's exact-record path with no browser-console error. The fail-closed loader and portable serialization contract remain intact.

Plainly: every public Borg record now matches the exact byte identity promised by the deployed registry, and representative records open through the same strict hash-checking path readers use.

## Dependency And Public-Security Baseline

OPS-011 is closed by the dated [dependency and public-security review](dependency-and-public-security-review-2026-09-01.md) and its [versioned policy](public-security-policy.v1.json). Mermaid was advanced from vulnerable 11.16.0 to patched 11.16.1, the post-change lockfile audit returned zero known vulnerabilities, all external GitHub Actions are pinned to full commit identifiers, weekly npm and Actions review is configured, and the only automatic remote executable—the Liberapay widget—was replaced by an ordinary user-selected link. Current vendored assets are hash-bound with explicit update dispositions. CSP, HSTS, Pages domain verification, DNSSEC, CAA, SPF, DKIM, and DMARC each have a live observation and a safe owner action or defer condition; no account, DNS, mail, certificate, hosting, or production response was changed.

## Public Feedback Intake Baseline

OPS-012 is closed by the [privacy-safe public feedback intake](privacy-safe-feedback-intake.md) and its [versioned policy](feedback-intake-policy.v1.json). The public feedback page generates a visible `architrino.public-feedback-manifest.v1` record containing a sanitized pathname, coarse browser/device fields, and availability and counts for the public scene, markdown, and graph manifests. It omits raw user agent, queries, fragments, cookies, browser storage, clipboard reads, local files, WebGL renderer, and account identifiers; it contacts GitHub only after the reader selects the public issue link. Focused policy tests, an isolated clean-checkout Pages build, and desktop and phone-width browser checks passed.

## Webapp Release Gate Baseline

OPS-003 is closed by the accepted [webapp release-gate contract](webapp-release-gate.v1.json), its executable checker, and the source-bound [public-feedback receipt](feedback-webapp-release-gate-2026-09-01.json). The first consumer closes all seven required categories: content, graph, size, visual, browser, accessibility, and preview. Its four-file load-time closure is 18,211 uncompressed bytes against a 32,768-byte ceiling. Browser checks at 1440 by 900 and 390 by 844 pixels found no horizontal overflow, unnamed controls, or duplicate identifiers; the smallest measured control height was 42 CSS pixels. An isolated 4,288-file static build included the route and all four resources. This is a passing pre-release gate, not evidence of production deployment.

## Browser Performance Baseline

OPS-004 is closed by the accepted [browser-performance budget](browser-performance-budget.v1.json), its executable checker, and the source-bound [dated evidence](browser-performance-baseline-2026-09-01.json). The feedback interaction profile measured 826,546 cold-transfer bytes, 808,335 warm-transfer bytes, a 32.8-millisecond refresh-to-next-paint response, 10,116,844 bytes of post-frame JavaScript heap, and zero origin-storage use.

After the Mermaid 11.17.2 vendor update, the Photon visual profile measured 4,568,660 cold-transfer bytes and 11,400 warm-transfer bytes; at 3840 by 2160 CSS pixels, 360 consecutive frames sustained 59.88 median frames per second with a 17.2-millisecond 95th-percentile interval and no interval above 33.34 milliseconds. Its measured post-frame heap was 21,872,226 bytes and its three canvas backing stores established a 28,888,248-byte GPU-surface lower bound.

Separately, the shared browser GPU process peaked at 190,218,240 resident bytes, 34,635,776 bytes above its sampled baseline, and both measured origins reported zero storage use.

The checker fails on stale app or instrument identity and on launch, transfer, interaction, frame, heap, storage, canvas-surface, or shared-GPU-process budget regression. The canvas result is a lower bound and the process result is shared; neither is exact per-page physical GPU allocation or a production-user measurement.
