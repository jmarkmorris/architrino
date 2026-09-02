# Corpus Dragnet Work Log

This file records dated pass receipts, scan boundaries, tool versions when material, and handoffs. Keep candidate findings in [recommendations.md](recommendations.md), not here.

## Log Entries

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
