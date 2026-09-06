# Corpus Dragnet Work Log

This file records dated pass receipts, scan boundaries, tool versions when material, and handoffs. Keep candidate findings in [recommendations.md](analysis/recommendations.md), not here.

## Log Entries

### 2026-09-03 — CD-2026-003 owner triage resolved

- The operator approved the complete reader-facing terminology correction recorded in CD-2026-003.
- Corrected all 23 in-scope singular `lane` instances across 11 canonical files. Corpus-organization passages now identify sections or domain chapters directly, and the five reaction-provenance passages now identify the observer-level prediction source directly.
- Deliberately retained `radius lanes` in the Photon Guide because it denotes groups of application search values rather than a corpus section, workstream, or prediction source.
- Preserved every scientific claim, claim grade, equation, TeX expression, link, document placement, and owner assignment.
- Validation passed: the authored reader-facing exact-match search returned only the deliberate `radius lanes` exclusion, `git diff --check` passed, strict content validation passed with zero errors and zero warnings, the generated scene-graph check passed with zero errors and zero warnings, and priority-ranking validation passed.

### 2026-09-03 — CD-2026-002 owner triage resolved

- The operator approved the complete acceleration-first terminology correction recorded in CD-2026-002.
- Corrected all nine active `force row` / `force rows` instances: five under Mapping Equations, two under active Master-Equation Closure, one in the App Solver work log, and one in the Mapping Benchmarks Casimir packet.
- Used `per-hit acceleration contribution`, `acceleration contribution`, or `acceleration row(s)` for master-equation consumers and `plate-response rows` for the effective Casimir benchmark.
- Deliberately retained the three occurrences in the two revoked Master-Equation Closure history files. Their active tracker already isolates them from current acceleration, action, and promotion authority.
- Preserved every equation, claim grade, evidence boundary, historical status, and owner assignment.
- Validation passed: the active exact-match search returned no result, the historical exact-match search returned the three deliberately retained instances, `git diff --check` passed, strict content validation passed with zero errors and zero warnings, and priority-ranking validation passed.

### 2026-09-03 — DRG-001 deprecated-term residue pass

DRG-001 completed the accepted read-only terminology-residue pass and retained [CD-2026-002](analysis/recommendations.md#cd-2026-002--acceleration-first-terminology-is-unresolved-in-active-per-hit-rows) and [CD-2026-003](analysis/recommendations.md#cd-2026-003--undefined-organizational-lane-metaphor-appears-in-reader-facing-prose). The pass edited no inspected corpus, priority-owner, or historical file. It routed every retained occurrence to an existing owner or to deliberate retention and closed the only executable Corpus Dragnet item; the recommendations remain untriaged and authorize no downstream edit.

#### Snapshot and scope

- **HEAD:** `4e57122c4a035d133e9a9c53b504e060f7192ff3`.
- **Working set:** none of the 20 string-match source files was modified at the pass snapshot. The already-modified Corpus Dragnet queue was the accepted task input; this pass changed only the Dragnet queue, recommendations ledger, and work log.
- **Acceleration-first boundary:** exact case-insensitive `force row` / `force rows` search across Markdown in `reference/` and `content/markdown/aaa/`, excluding this Dragnet lane's control and output files. Generic `force law` and other force language were outside the accepted residue because assembly- and observer-level force language can be valid.
- **Reader-facing boundary:** exact singular/plural `lane` search across Markdown in `content/markdown/aaa/`, excluding generated and archived surfaces, followed by local semantic inspection of every match.
- **Source roles:** active priority packets were treated as internal supporting documents under their directory owners, Master-Equation Closure `history/` files as revoked historical records, and `content/markdown/aaa/` files as canonical published sources for their reader-facing prose.

#### Results and dispositions

- **Acceleration-first inventory:** 12 exact instances across eight files. Nine instances occur in six active files: five in Mapping Equations, two in active Master-Equation Closure, one in App Solver, and one in Mapping Benchmarks. Three instances occur in two revoked Master-Equation Closure history files. The queued figures of six live and two historical were file totals; CD-2026-002 records the string-instance counts and routes all 12.
- **Reader-facing inventory:** 24 exact `lane` / `lanes` instances across 12 published files. Twenty-three singular instances across 11 files use an undefined organizational or source-provenance metaphor and are retained in CD-2026-003. The plural `radius lanes` occurrence in the Photon Guide denotes configuration-search values, not the accepted terminology class, and was deliberately excluded.
- **Owner routing:** Mapping Equations, Master-Equation Closure, App Solver, and Mapping Benchmarks receive the active acceleration-first triage routes; revoked Master-Equation Closure history remains unedited. Corpus Rewrite receives the reader-facing editorial route, with the 11 canonical source files retained as the source owners.
- **Confidence threshold:** both retained findings meet the ledger's `high` path-specific evidence threshold for inventory and source-role classification. Replacement eligibility remains owner-triaged where effective force bookkeeping, dated log chronology, or sentence-specific ordinary wording could justify retention.
- **Claim boundary and falsifiers:** the searches establish only the presence, count, and local context of the strings. They do not establish a scientific error. CD-2026-002 is overturned occurrence by occurrence by an explicit effective assembly classification; CD-2026-003 is overturned document by document by a necessary, consistently defined reader-facing meaning that ordinary organizational or provenance language cannot carry.

No mathematical object was attempted because DRG-001 is a terminology-routing audit with report-only authority. Its durable output is the two recommendation records and this pass receipt.

#### Validation

- `git diff --check` passed.
- `node scripts/validate-priority-ranking.mjs` passed: 25 active owners had queues, with 14 ranked rows aligned to their local winners and tracker metadata.
- `node scripts/check-content-integrity.mjs` passed the runtime-asset preparation, Borg byte-identity, strict content-index and reference, reader-facing publication-boundary, generated scene-graph, webapp release-profile, browser-budget, deployment-budget, owned-compute launch-policy, and secure-tunnel checks. It then failed the unrelated owned-compute stop-hook test because the fixture process did not reach started state within ten seconds.
- `node --test tests/owned-compute-stop-hook.test.js` reproduced the same pre-existing validation failure: four tests passed and `Stop hook continues the turn while its owner has live compute` failed at the fixture-start timeout. DRG-001 changes no owned-compute code or test surface, so this failure does not invalidate the terminology inventory; it prevents a claim that the full content-integrity suite passed.

### 2026-09-01 — CD-2026-001 owner triage resolved

- Accepted the first-pass terminology finding under the user-authorized queue-resolution campaign and applied the two bounded wording corrections in the owning App Solver and Master-Equation Closure supporting packets.
- Replaced the disallowed delayed-interaction term with `finite-memory functional differential equation` in the local-continuation statement and with `delayed` / `future-directed` in the worldline-variation statement.
- Preserved the equations, proof scope, derived claim grades, and falsifiers. No new task, scientific adjudication, generated write, or reader-facing corpus edit was needed.

### 2026-09-01 — CD-002 first cross-corpus correlation pass

CD-002 ran one bounded, read-only correlation pass and retained [CD-2026-001](analysis/recommendations.md#cd-2026-001--disallowed-delayed-interaction-term-remains-in-two-active-technical-packets). The pass did not edit any inspected corpus, priority-owner, implementation, or generated file. It closed the only executable Dragnet item; the finding remains untriaged and creates no task or claim change.

#### Snapshot and resolved scope

- **HEAD:** `897fe1aa79be7ae1e77144d52ef396d209645323`.
- **Working set:** no modified tracked path fell inside the resolved scan set. One untracked Braid Program script existed and was outside this non-Braid/non-Borg pass.
- **Tracked files scanned:** 1,038 total: 201 under `content/markdown/aaa/`, 5 under `reference/architectural-decisions/`, 41 under `reference/design/`, 319 under `reference/learning-office/`, 22 under `reference/op/`, 393 under included `reference/priorities/` paths, and 57 under `reference/research-office/`.
- **Resolved active priority-owner set:** 30 immediate owner directories had `priorities.md`. This pass excluded `app-borg` and `braid-program` at operator direction and excluded `aaa-corpus-dragnet` as its own control/output lane, leaving 27 active owner directories eligible within the priority root.
- **Standing exclusions applied:** every generated, derived, historical, parked, Dragnet-control, implementation, validation, local, dependency, binary, and media exclusion declared by CD-001. The pass additionally excluded `reference/priorities/app-borg/` and `reference/priorities/braid-program/`; implementation evidence from those lanes was not opened.

#### Scan families and commands

- **Canonical terminology:** exact `rg` searches for the disallowed theory abbreviation, the disallowed delayed-interaction term family, superseded EOM solver labels, absolute local paths, and links from reader-facing corpus prose into priorities. Mathematical powers such as $a^3$, $A\lambda^3$, and $\mathcal O(\alpha^3)$ were separated from the prohibited theory abbreviation.
- **Exact duplication:** normalized Markdown paragraphs of at least 240 characters were grouped across tracked scan files. Thirty-four groups were examined. Repeated role instructions and work-log boilerplate were templates; repeated equations were local self-containment or owner-to-consumer propagation; the One Nature, Many Theories overlap was explicitly declared promotion provenance. None met the retained-finding threshold.
- **Relative-link reachability:** relative Markdown targets were resolved against their source paths. Three apparent missing targets were parser false positives caused by TeX bracket-parenthesis sequences; strict content validation independently checked the canonical Markdown links.
- **Stale owner routing:** exact searches for the former `app-eom` path found only frozen evidence bindings and SHA-256 inventories whose literal historical paths must remain unchanged.
- **Canonical URL cross-check:** the apex-versus-`www` inconsistency was already measured and routed by the completed OPS-010 inventory, so the pass did not duplicate it as a new recommendation.

#### Candidate dispositions and threshold

- **Retained:** two substantive uses of the disallowed delayed-interaction term in active App Solver and Master-Equation Closure supporting packets. Exact canon conflict, source roles, local claim grades, bounded replacements, uncertainty, and owner routes are recorded in CD-2026-001.
- **Rejected:** portable MCP configuration examples containing the current checkout path, immutable evidence paths, source-acquisition provenance paths, intentional equation repetition, declared promotion provenance, role/work-log templates, mathematical powers unrelated to the theory abbreviation, and TeX constructs misread as links.
- **Confidence threshold:** retained findings required the CD-001 `high` or `medium` standard. CD-2026-001 is `high`; no medium-confidence candidate survived the uncertainty and consequence checks.

Validation after recording the pass is captured with the completion edit. No scientific claim, proof status, owner disposition, or corpus authority changed.

### 2026-07-30 — Lane created

The operator authorized a model-neutral, read-only corpus-correlation lane. No scan has run and no corpus recommendation has been accepted.

### 2026-07-31 — Luna scout methods and Dragnet bridge documented

Five companion prompts were created for reusable read-only scouting: the Claim-Boundary Scout, Repository Hygiene Scout, Validation-Coverage Scout, TODO and Blocker Scout, and Source and Corpus Evidence Scout. They are scouting methods, not recommendation entries or accepted Corpus Dragnet findings.

The dedicated Luna Corpus Dragnet Pass prompt now supplies the bounded bridge from selected scout evidence to this lane. This documentation update ran no scan, wrote no recommendation, and advanced no queue item, status, acceptance, or disposition.

### 2026-09-01 — CD-001 baseline established

CD-001 established the input and evidence contract below. This was boundary and schema work only: no correlation scan ran, no finding was created, no inspected corpus material changed, and no scientific or organizational conclusion was accepted.

#### First-pass roots

- **Snapshot rule:** scan tracked regular files as they exist in the current checkout. The pass receipt must record the `HEAD` commit, every modified tracked path inside the resolved scan set, and the date of the pass. Untracked and ignored files are outside the baseline.
- **Published canonical root:** `content/markdown/aaa/`.
- **Internal roots:** `reference/architectural-decisions/`, `reference/design/`, `reference/learning-office/`, `reference/op/`, `reference/priorities/`, and `reference/research-office/`.
- **Active priority-owner rule:** an active priority owner is an immediate child of `reference/priorities/` that contains `priorities.md`, excluding `reference/priorities/dormant-deferred/`; this is the same owner-set rule enforced by `scripts/validate-priority-ranking.mjs`. The pass receipt must record the resolved owner directories rather than assume that the set stayed unchanged.

#### Source-role distinctions

- `content/markdown/aaa/` files are canonical published sources for their reader-facing claims.
- An active priority owner's `priorities.md` and `work-queue.md` are owner documents for that lane's strategy and task state. Supporting packets carry only the authority they declare; priority material is not automatically authority for a scientific claim.
- Current architectural decisions and operational procedures are owner documents only for the decisions or procedures they explicitly govern. Other current `reference/` material is internal supporting material unless it declares and can substantiate a narrower authority.
- Generated derivatives and the historical surfaces excluded below may corroborate provenance only when a retained candidate explicitly requires them. Any historical record that remains inside an included root must be labeled `historical record`; it does not become a source-of-truth owner.

#### First-pass exclusions

- Generated and derived surfaces: `content/generated/`, `content/graph/`, `reference/op/agent-startup-orientation.generated.md`, `reference/priorities/source-mining/analysis/legacy-architrino-wordpress-library-posts.md`, and `reference/priorities/source-mining/archive-analysis/legacy-architrino-wordpress-mining-queue.txt`.
- Historical or parked surfaces: `content/archive/`, `reference/priorities/dormant-deferred/`, `reference/research-office/research-history/`, `reference/priorities/app-solver/archive/`, `reference/priorities/master-equation-closure/history/`, `reference/priorities/source-mining/archive-analysis/`, and `reference/design/banners/history/`.
- Dragnet control and output files: `reference/priorities/aaa-corpus-dragnet/`; these define and record the pass rather than supply correlation candidates.
- Implementation and validation surfaces: `apps/`, `scripts/`, `src/`, `tests/`, root web shells, and `.github/`. A pass may open an exact file from these paths only as secondary evidence for a candidate already found in the primary roots, and must label it `implementation evidence`, not a corpus owner.
- Local, dependency, and binary surfaces: `.git/`, `.local-data/`, `.tmp/`, `tmp/`, `node_modules/`, `vendor/`, `attractor-ensemble-out/`, `content/assets/`, and other binary or media files.

#### Finding threshold and pass receipt

The execution-ready finding schema is in [recommendations.md](analysis/recommendations.md). `High` confidence requires a directly observable, path-specific relationship plus a confirmed source-role classification. `Medium` confidence requires path-specific evidence and an explicit uncertainty about ownership, consequence, or destination. Low-confidence similarity, thematic resemblance without a concrete relationship, and unsupported model inference are omitted.

Every pass receipt must record the snapshot, resolved roots, exclusions, scan families and commands, candidates examined, retained finding identifiers, and the confidence threshold used. A zero-result pass must say `no qualifying findings within the declared boundary`; it must not claim that the corpus has no duplication, drift, routing gaps, or organization debt.
