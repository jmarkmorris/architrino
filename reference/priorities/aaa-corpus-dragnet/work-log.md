# Corpus Dragnet Work Log

This file records dated pass receipts, scan boundaries, tool versions when material, and handoffs. Keep candidate findings in [recommendations.md](recommendations.md), not here.

## Log Entries

### 2026-09-01 — CD-2026-001 owner triage resolved

- Accepted the first-pass terminology finding under the user-authorized queue-resolution campaign and applied the two bounded wording corrections in the owning App Solver and Master-Equation Closure supporting packets.
- Replaced the disallowed delayed-interaction term with `finite-memory functional differential equation` in the local-continuation statement and with `delayed` / `future-directed` in the worldline-variation statement.
- Preserved the equations, proof scope, derived claim grades, and falsifiers. No new task, scientific adjudication, generated write, or reader-facing corpus edit was needed.

### 2026-09-01 — CD-002 first cross-corpus correlation pass

CD-002 ran one bounded, read-only correlation pass and retained [CD-2026-001](recommendations.md#cd-2026-001--disallowed-delayed-interaction-term-remains-in-two-active-technical-packets). The pass did not edit any inspected corpus, priority-owner, implementation, or generated file. It closed the only executable Dragnet item; the finding remains untriaged and creates no task or claim change.

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

- Generated and derived surfaces: `content/generated/`, `content/graph/`, `reference/op/agent-startup-orientation.generated.md`, `reference/priorities/source-mining/legacy-architrino-wordpress-library-posts.md`, and `reference/priorities/source-mining/legacy-architrino-wordpress-mining-queue.txt`.
- Historical or parked surfaces: `content/archive/`, `reference/priorities/dormant-deferred/`, `reference/research-office/research-history/`, `reference/priorities/app-solver/archive/`, `reference/priorities/master-equation-closure/history/`, `reference/priorities/source-mining/archive-analysis/`, and `reference/design/banners/history/`.
- Dragnet control and output files: `reference/priorities/aaa-corpus-dragnet/`; these define and record the pass rather than supply correlation candidates.
- Implementation and validation surfaces: `apps/`, `scripts/`, `src/`, `tests/`, root web shells, and `.github/`. A pass may open an exact file from these paths only as secondary evidence for a candidate already found in the primary roots, and must label it `implementation evidence`, not a corpus owner.
- Local, dependency, and binary surfaces: `.git/`, `.local-data/`, `.tmp/`, `tmp/`, `node_modules/`, `vendor/`, `attractor-ensemble-out/`, `content/assets/`, and other binary or media files.

#### Finding threshold and pass receipt

The execution-ready finding schema is in [recommendations.md](recommendations.md). `High` confidence requires a directly observable, path-specific relationship plus a confirmed source-role classification. `Medium` confidence requires path-specific evidence and an explicit uncertainty about ownership, consequence, or destination. Low-confidence similarity, thematic resemblance without a concrete relationship, and unsupported model inference are omitted.

Every pass receipt must record the snapshot, resolved roots, exclusions, scan families and commands, candidates examined, retained finding identifiers, and the confidence threshold used. A zero-result pass must say `no qualifying findings within the declared boundary`; it must not claim that the corpus has no duplication, drift, routing gaps, or organization debt.
