# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `agent_guidance_surface_consolidation` — [OPS-014](#ops-014--agent-guidance-surface-consolidation). Status: `Queued`.
2. `plainly_convention_document_migration` — [OPS-015](#ops-015--plainly-convention-document-migration). Status: `Blocked`, on corpus-wide standards readiness.
3. `reference_equation_mapping_surface` — [OPS-016](#ops-016--reference-equation-mapping-surface). Status: `Queued`.
4. `local_repository_document_surface` — [OPS-017](#ops-017--local-repository-document-surface). Status: `Awaiting verification`.

## Queued task records

### OPS-014 — Agent guidance surface consolidation

- **Status:** Queued
- **Priority object:** `agent_guidance_surface_consolidation`
- **Request / acceptance:** Inventory every surface on which agent guidance can be placed for both Claude and Codex, identify duplication and conflict across them, and adopt a maintenance approach that keeps them consistent without repeated manual synchronization. Acceptance requires the inventory below to be verified against current client documentation, every conflict resolved by a named precedence rule, and at least one drift class converted from manual upkeep to an executable check.
- **Origin:** Operator observation, 2026-09-03, that explanation density varies between responses without a stated reason. Root cause identified during that session: two live authorities give opposite length instructions, and neither states which wins.

Plainly: guidance about how agents should write and behave is currently scattered across the repository and across two different client applications, some of it duplicated and at least one pair of rules in direct contradiction. This item is about finding all of it, deciding what governs, and making the copies keep themselves in step.

#### Identified conflict

The [operator explanation standard](../../op/operator-explanation-standard.md) states that total response length is not a constraint and that completeness of inline explanation outranks brevity. A client-level brevity setting active in the same sessions instructs the opposite: be as concise as possible and limit explanation. **Resolved.** The standard's Length and precedence section now names that setting and declares that the standard outranks it for work in this checkout, on the grounds that client-side settings are invisible to other agents in the same checkout and carry no repository authority.

A second, subtler defect: one density setting was applied to output registers with genuinely different needs — adjudication packet, explainer of an already-settled result, correction, and short status or closeout. **Resolved.** The standard now carries a four-register table, each register with its own density rule, and states that choosing the register is part of writing the response.

Both defects are now closed in the standard itself. What remains open in this item is the surface inventory and the generated `CLAUDE.md` floor, not the explanation rules.

#### Inventory A — Claude surfaces outside the repository

| Surface | Where it is set | Scope | Current content |
| --- | --- | --- | --- |
| Instructions for Claude | Initials, lower left → Settings → Instructions for Claude | Account-wide, every conversation | Architrino project block: layer discipline, no-mass/no-force, causal-delay terms, claim grading, $c_f=1$, no git, `Plainly:`, `Closure goal:`, question format |
| Response style | Style selector in the chat composer; built-in Normal, Concise, Explanatory, Formal, plus custom styles | Per conversation or as a default | `Concise` — the source of the brevity instruction in the conflict above |
| Cowork Global instructions | Settings → Cowork → Global instructions | Every Cowork session | Cleared by the operator on 2026-09-03; previously the pointer `see AGENTS.md` |
| Project instructions | The project itself | Chats inside that project only | Repo description and webapp/Pages context |
| User skills | Settings → Skills | On demand or by trigger | Not currently used for Architrino style |
| Session memory | Written by the agent, persists across conversations | Cowork sessions | Session index plus per-fact files; behavioral guidance appears here incidentally rather than by design |
| Organization instructions | Admin settings, Team and Enterprise plans only | Every member of the organization | Not applicable to this account as far as this session can establish |

Claim grade: `measured` by direct reading of the settings surfaces named in the [Claude personalization documentation](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features), except the organization row, which is `inferred` from plan type and must be confirmed by the operator.

#### Inventory B — Codex surfaces

| Surface | Location | Scope | Status in this repo |
| --- | --- | --- | --- |
| Global agent instructions | Codex home directory, outside this checkout | Every Codex session for this user | Present or absent unverified by this session |
| Repository root `AGENTS.md` | [`AGENTS.md`](../../../AGENTS.md) | Whole checkout | Present, 154 lines, the governing authority |
| Nested `AGENTS.md` | Any subdirectory | Nearest ancestor wins for files under it | None present; the repository deliberately keeps a single root policy |
| Client configuration | Codex home directory | Model, approval mode, sandboxing | Outside repository control |
| Repository hooks | [`.codex/hooks.json`](../../../.codex/hooks.json) | Codex lifecycle events in this checkout | Present |
| Saved prompts | Codex home directory | Reusable prompt library | Unverified |

Claim grade: `inferred` for every row marked unverified. Confirming this table against current Codex documentation and the operator's actual home-directory contents is an explicit deliverable of this item, not a precondition for opening it.

Plainly: Claude and Codex each read guidance from several places, and only some of those places are files in this repository. Anything set inside a client application is invisible to every other agent working in the same checkout, which is how two agents on the same task end up following different rules.

#### Inventory C — In-repository surfaces

| Surface | Path | Role |
| --- | --- | --- |
| Governing policy | [`AGENTS.md`](../../../AGENTS.md) | Sole authored authority; 154 lines |
| Session bootstrap | [`CLAUDE.md`](../../../CLAUDE.md) | Routes to `AGENTS.md`; carries the Claude-only write-permission rule and a hand-maintained mirror of the policy floor |
| Generated router | [`agent-startup-orientation.generated.md`](../../op/agent-startup-orientation.generated.md) | Workflow cards, standing rules, prompt index; regenerated and `--check` gated, with source fingerprints |
| Explanation standard | [`operator-explanation-standard.md`](../../op/operator-explanation-standard.md) | Sole authority for operator-facing output; audience, plain-by-default explanation, repetition, structure, expected tools, analogy, registers, length precedence, `Open items:`, response mechanics, self-check |
| Operator feedback backlog | [`README-op.md`](../../op/README-op.md) | One-line workflow behaviors under Method, Efficiency, Clarity, Multi-Agent Use, Technical Closure |
| Procedure index | [`README.md`](../../op/README.md) | Index for the rest of `reference/op/` |
| Prompt template | [`codex-goal-seeking-prompt-template.md`](../../op/codex-goal-seeking-prompt-template.md) | Communication and reporting procedure |
| Corpus style authorities | `content/markdown/aaa/archie/`: `academic-style-guide.md`, `mathematics-style-guide.md`, `mathematics-terminology.md`, `terminology-usage.md`, `comparative-glossary.md` | Reader-facing corpus prose and notation |
| End-user language | `content/markdown/aaa/archie/`: `ui-guidelines.md`, `navigation-and-controls.md` | App-facing wording |
| Role prompts | `reference/research-office/cto/prompts/` — 14 prompts plus `README.md` | Per-role behavior for research, review, convergence, promotion, adjudication |
| Repository skills | `.agents/skills/` — `aaa-corpus-advancement`, `corpus-review-workflow`, `math-preview`, `research-exploration` | Discovery routers into the live procedures; three carry an `agents/openai.yaml` |

There is exactly one authored `AGENTS.md` and exactly one `CLAUDE.md` in the repository, both at the root. Other copies found under `.tmp/` belong to unrelated vendored checkouts and are not project policy.

Claim grade: `measured` by filesystem enumeration on 2026-09-03. Falsified by a second authored `AGENTS.md` or `CLAUDE.md` outside `.tmp/`.

Plainly: inside the repository the policy story is already tidy — one governing file, one bootstrap file, and a set of specialised guides beneath them. The mess is at the seams: the bootstrap file hand-copies part of the governing file, and the client applications hold rules that the repository cannot see.

#### Recommended approach

1. **Make the mirror generated rather than hand-maintained.** The floor section of `CLAUDE.md` restates `AGENTS.md` by hand and can drift silently. The repository already solves this exact problem for the startup router with a generator, a `--check` gate, and source fingerprints. Applying the same pattern converts a recurring manual synchronization chore into a failing check. This is the single largest reduction in maintainer burden available here.
2. **Keep client-side settings free of behavior.** Anything behavioral placed in Instructions for Claude, a response style, or Global instructions is invisible to Codex and to every other agent in the checkout. Client settings should carry at most a pointer. The operator's clearing of Global instructions on 2026-09-03 is consistent with this and should be extended to the remaining behavioral content once the repository can carry it.
3. **Name the output registers.** Extend `operator-explanation-standard.md` with a register table — adjudication, explainer, erratum, status — each with its own cadence and length rule, replacing the current single setting.
4. **State precedence explicitly.** `operator-explanation-standard.md` should declare that it governs response length and explanation density for work in this repository and outranks any client-level brevity or verbosity setting, naming that setting so the conflict is discoverable rather than latent.
5. **Calibrate by blind comparison rather than assertion.** Fix a set of source passages, render each under two candidate register profiles, present them unlabelled, and record the operator's choice and stated reason. Labelled comparison biases the choice toward the profile the operator believes they ought to prefer.
6. **Keep one inventory with verification dates.** Inventories A, B, and C above become a single maintained document with an owner and a last-verified date per row, so a future session checks one place rather than rediscovering the surface list.

Plainly: stop copying policy by hand and let a generator do it; keep behavior rules in the repository where every agent can see them; give short updates and long proofs different rules instead of one; write down which rule wins when two disagree; pick the settings by blind test rather than by argument; and keep one list of where everything lives.

- **Progress, 2026-09-03:** Recommendations 3 and 4 are complete. [`operator-explanation-standard.md`](../../op/operator-explanation-standard.md) was rewritten to replace the AP-STEM audience model with an expert-in-theory, non-specialist-in-imported-framework model; to retire the inline `Plainly:` tag in favor of plain-by-default interleaved explanation; to require mechanism as well as significance; to state that repetition of definitions is a feature because omission costs comprehension while redundancy costs a scan; to add structure and expected-tool rules; to add the four-register table; and to declare precedence over client-level brevity settings by name. Recommendation 2 is partly complete: the operator cleared Cowork Global instructions on 2026-09-03, and the account-level `Concise` response style is now explicitly overridden by the standard rather than silently conflicting with it. Duplicated style guidance was reduced to pointers in `AGENTS.md`, `CLAUDE.md`, `codex-goal-seeking-prompt-template.md`, `adjudication.md`, and the `start-research.md` report template.
- **Calibration rounds, 2026-09-03.** Recommendation 5 was run as two labelled rounds rather than the blind protocol it specifies, because the operator was refining the standard rather than being tested against it and needed to comment on the varied dimension directly. Round 1 held one technical unit fixed — the $D_{t,ij}$ against $D_{r,ij}$ asymmetry in `dynamics/master-equation.md` — and varied analogy-carried against map-abstraction-carried explanation. Both were rejected: the extended analogy lost the reader partway, and the abstraction-carried version was judged less explanatory. Round 2 varied continuous prose against a verdict-first case split over the same unit. Continuous prose won, described as readable straight through. Three preferences were stated and are now written into the standard: define terms more, accepting redundancy from section to section; carry mechanism in configuration and symbol rather than in analogy; and deliver visualization, logic, definitions, and words before the equation. Claim grade: `measured` by direct operator response, on one technical unit across two rounds. Falsified by a third round on different source material reversing any of the three preferences. The result is not blind and is not evidence about which profile the operator would choose without knowing the axis.
- **Evidence / blocker:** Inventory C is established by direct reading. Inventory A is established for every row except organization instructions. Inventory B is largely unverified and is the first remaining blocker. Recommendation 1 is not started: no generator exists for the `CLAUDE.md` floor, so that mirror is still hand-maintained and can drift. Recommendation 6 is not started: Inventories A, B, and C live only in this queue row and carry no per-row verification dates.
- **Completion:** The surface inventory is verified for both clients and carries per-row verification dates; the length-and-density conflict is resolved by a stated precedence rule in `operator-explanation-standard.md`; the output registers are named with distinct density rules; the `CLAUDE.md` floor is generated and `--check` gated against `AGENTS.md`; and at least one calibration round has been run with its outcome recorded, with any round that was not blind labelled as such.

### OPS-015 — Plainly convention document migration

- **Status:** Blocked, on corpus-wide standards readiness
- **Priority object:** `plainly_convention_document_migration`
- **Blocked by:** Operator decision that the explanation standards are ready to apply across all corpus markdown. That gate is later and higher than OPS-014 finalization: OPS-014 settles where guidance lives, while this waits until the operator judges the standards themselves settled enough to rewrite a published book against. Converting documents to a convention still being tuned would mean converting them twice. The operator opens this gate; an agent may not infer it from OPS-014 closing.
- **Sweep instrument:** [Corpus dragnet](../aaa-corpus-dragnet/priorities.md) owns the read-only correlation pass that inventories occurrences and their contexts. Dragnet workers are read-only outside their own lane by charter, so they supply findings and never perform the conversion. Execution belongs to this item.
- **Request / acceptance:** Decide, tier by tier, which existing documents should be converted from the retired inline `Plainly:` tag to the plain-by-default interleaved explanation the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) now requires, and execute only the tiers that earn it. The measured occurrence count is not the work item; reader visibility is.

The [operator explanation standard](../../op/operator-explanation-standard.md) already states that documents written under the retired convention keep their form and that conversion happens opportunistically during substantial revision. This item exists because that default is right for the working record and wrong for two specific surfaces, which are identified below.

#### Tier 1 reassigned, 2026-09-03

The operator decided on a corpus-wide rewrite of all 199 `content/markdown/aaa` documents against the merged explanation standard, whether or not they carry the retired tag. That campaign now has a lane: [corpus explanation rewrite](../aaa-corpus-rewrite/priorities.md), with the pilot complete and accepted.

**Tier 1 is reassigned there** and is no longer this item's work. Removing the tag from 23 corpus files is a subset of rewriting all 199 against the same standard, and running it separately would touch those files twice. This item retains Tiers 2 and 3, the operator-facing surfaces, and its own gate is unchanged.

#### Measured scope, 2026-09-03

| Area | Files | Occurrences | Character |
| --- | ---: | ---: | --- |
| `content/markdown/aaa` | 23 | 223 | Reader-facing textbook prose |
| `apps/ios/.../GeneratedTextbookPackage` | 8 | ~311 | Generated from the corpus; not authored |
| `apps/ios/ArchitrinoReader/README.md` | 1 | small | Authored |
| `reference/research-office` | 22 | 473 | Live prompts and review packets |
| `reference/op` | 5 | 12 | Live procedure files |
| `.agents/skills` | 1 | 2 | Live skill router |
| `reference/priorities` | 353 | 4,193 | Working record and analysis packets |
| `reference/architectural-decisions` | 2 | 4 | Decision record |
| `src`, `tests` | 7 | 26 | Fixtures and strings |

Counts come from a direct `Plainly:` scan excluding `.tmp`, `.git`, and `node_modules`. Roughly 1,064 markdown files in the checkout contain the tag somewhere. That headline number is misleading and is the reason this item is tiered rather than run as a single pass.

Claim grade: `measured` by filesystem scan on 2026-09-03. Falsified by a repeat scan returning materially different counts, which would mean the tag is still being written into new documents and the standard is not being followed.

Repeat scan, 2026-09-03, markdown only, excluding `.tmp` and `.local-data`: `content/markdown/aaa` holds 225 occurrences across 25 files, against the 223 across 23 files recorded above. The drift is two files and two occurrences on the same day, which is small but not zero and is the signal the falsifier above was written to catch; a third scan showing further growth would mean the tag is still being authored. The `apps/ios` figure is not comparable — this scan counted markdown only and returned 163 occurrences across 9 files, while the row above counts the package's HTML as well.

#### Finding: the tag leaked into reader-facing prose

`Plainly:` is an operator-communication convention. Neither of the two authorities that actually govern reader-facing text asks for it: the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) prescribes explanatory prose, a compact map, and an equation followed by plain-language symbol meanings, and never names the tag; the [UI guidelines](../../../content/markdown/aaa/archie/ui-guidelines.md) do not mention it at all.

So the 223 corpus occurrences are an operator convention that migrated into the textbook without its own style authority ever authorizing it, and the generated iOS reading copies carry it onward to readers. The concentration is narrow: 140 of the 223 sit in the four `noether-braid` documents and 38 more in `dynamics/master-equation.md`, so six files hold most of it.

This is the part of the migration with an actual reader on the other end, and it is the part with an independent justification that does not depend on the operator standard at all.

#### Tiers

**Tier 1 — reader-facing corpus.** `content/markdown/aaa`, 23 files. Convert to the academic style guide's own pattern rather than to the operator standard's, because the corpus is outside the operator standard's scope. The generated iOS reading copies need no separate work; they are derived and will carry the change at the next authorized export, which is on demand and not part of routine work.

**Tier 2 — live procedure and prompt files.** `reference/op` (12 occurrences, 5 files), `reference/research-office/cto/prompts` (7 occurrences, 2 files), and `.agents/skills` (2 occurrences, 1 file): **21 occurrences across 8 files in total.** Small in volume but disproportionate in effect, because these are the files a new session reads during startup routing. A retained `Plainly:` in a startup-path file is a worked example of the retired pattern shown to the next agent before it has read the standard, so the convention reinstates itself. Volume is irrelevant here; position is the whole argument, and 21 occurrences is a single short pass.

The 464 occurrences under `research-office/research-history` are review packets — dated historical records that no session reads at startup — and belong in Tier 3, not here.

**Tier 3 — working record.** `reference/priorities`, `reference/architectural-decisions`, `src`, `tests`, and the research-history packets. Do not convert. The standard's opportunistic rule already covers these: a document under substantial revision for other reasons may be converted as part of that revision. A dedicated pass here would be a four-thousand-line mechanical diff with no reader benefit and real review cost.

#### Gate on Tier 1

Tier 1 changes reader-facing corpus prose, so it is a canon question, not a cleanup. AGENTS.md requires that Archie canon be treated as a controlled reference and that a proposed style-policy change be discussed with its downstream effects before broad corpus updates. Tier 1 therefore needs an explicit operator decision on whether the academic style guide should say anything about the tag — endorse it, forbid it, or stay silent — before any corpus file is touched. Silence in the guide is what allowed the leak, so leaving it silent is a choice with consequences and should be made deliberately.

#### Discharged blocker: search-index dependency, checked 2026-09-03

`apps/ios/ArchitrinoReader/GeneratedTextbookPackage/textbook_bundle_search_index.json` contains the literal string `Plainly:`, which raised the question of whether the search machinery keys on it. It does not. The file is `{schema_version, total_entries, entries}`, and a full walk of the structure found the string **62 times, every occurrence inside `entries[N].text`, and zero occurrences as a key**. It is indexed prose, not structure.

The index is also a generated artifact derived from the corpus, and the iOS package is an on-demand development snapshot rather than a routine output, so it carries whatever the corpus says at the next authorized export. No separate conversion work is needed for it.

Claim grade: `measured` by a recursive walk of the parsed JSON, distinguishing key positions from string values. Falsifier: any consumer that reads the literal `Plainly:` as a delimiter, section marker, or lookup key rather than as displayed text.

- **Evidence / blocker:** The occurrence census is complete, the two governing style authorities have been checked and do not prescribe the tag, and the search-index dependency is discharged above. Two blockers remain: the operator's corpus-wide readiness decision, and an operator canon decision on Tier 1 — though Tier 1 is now expected to execute inside the corpus rewrite campaign rather than here.
- **Completion:** Tier 2 is converted and the startup-path files no longer demonstrate the retired pattern; Tier 1 is either converted under an explicit canon decision or explicitly declined with that decision recorded; Tier 3 is confirmed as opportunistic-only; and a repeat scan shows no new `Plainly:` occurrences in documents authored after the standard was adopted.

### OPS-016 — Reference equation-mapping surface

- **Status:** Queued
- **Priority object:** `reference_equation_mapping_surface`
- **Request / acceptance:** Give operator-facing documents under `reference/` the same symbol-definition viewer the corpus already has, so a document carrying display equations can be read with every symbol resolvable on demand rather than only from the prose around it. Acceptance requires a second registry that builds and validates alongside the corpus registry, without modifying any source file and without creating links from `content/markdown/aaa` into `reference/`.
- **Origin:** Operator request, 2026-09-03, during calibration of the [operator explanation standard](../../op/operator-explanation-standard.md): the corpus has a view-equation mode showing every symbol's definition, and operator-facing documents do not.

#### Operator decision, 2026-09-03

The builder leaves reference source files untouched. The viewer resolves symbols on its own. Corpus behavior is unchanged: `[View →]` chips continue to be injected into `content/markdown/aaa`. The reason for the split is that policy and procedure files under `reference/` are read as plain markdown in a terminal at least as often as in a browser, and injected chips are noise there.

#### Current implementation, read 2026-09-03

[`scripts/build-equation-mapping-corpus.mjs`](../../../scripts/build-equation-mapping-corpus.mjs) is 763 lines. It scans one root, `CORPUS_ROOT = "content/markdown/aaa"` at line 14, extracts every symbol from each TeX block, searches surrounding lines for a definition using a cue pattern, and falls back to a shared dictionary of standard symbols. It emits `content/generated/equation-mapping/corpus-equations.json` under schema `equation-mapping-corpus-registry.v1`, declared in [`scripts/config/generated-runtime-assets.json`](../../../scripts/config/generated-runtime-assets.json) as id `equation-corpus` and therefore a reproducible ignored output. The viewer page is `equation-mapping.html`. At line 708 the builder writes back into source markdown, which is how the chips are injected. [`scripts/check-content-integrity.mjs`](../../../scripts/check-content-integrity.mjs) line 65 runs it with `--check`, and [`scripts/validate-equation-mapping-links.mjs`](../../../scripts/validate-equation-mapping-links.mjs), 74 lines, verifies registered links resolve.

#### Work items

1. Parameterize the scan root into a set of roots, each with its own registry path, viewer route, and write policy. Not a one-line change: the root constant is also used at line 515 to derive a document's area from the path segment following it.
2. Add a second registry output for `reference/`, with its own `generated-runtime-assets.json` entry so it builds and stays untracked.
3. Supply a navigation fallback. Reference documents have no entry in `content/graph/scene_graph.json` or `content/graph/textbook_toc.json`, which the builder joins against for back-links.
4. Honor the read-only decision above: the reference pass must not invoke the line-708 write path.
5. Keep the two registries separate rather than merged. A merged surface would place reference targets inside corpus pages and can manufacture the `content/markdown/aaa` → `reference/priorities` links AGENTS.md forbids.
6. Teach the integrity gate and the link validator about the second surface.

- **Evidence / blocker:** The implementation facts above are `measured` by direct reading of the named files and line numbers. Not established: whether the viewer can resolve symbols for a document that carries no injected chips, which is what work item 4 depends on and has not been checked in `src/apps/equation-mapping/`. No blocker beyond that.
- **Completion:** A reference registry builds, validates, and is `--check` gated; reference documents render with resolvable symbols; no reference source file is modified by the build; and no link from `content/markdown/aaa` into `reference/` is created.

## In progress

No rows.

## Awaiting verification

### OPS-017 — Local repository document surface

- **Status:** Awaiting verification
- **Priority object:** `local_repository_document_surface`
- **Request / acceptance:** Give the operator a browsable local view of the repository's markdown using the existing webapp conventions, so navigating internal documents does not require an editor preview. The surface must be structurally incapable of reaching a Pages deployment, must not add tracked build output, and must reuse the shared application chrome rather than inventing navigation.
- **Origin:** Operator request, 2026-09-03, during the explanation-standard work: reading `reference/` documents through editor previews was the friction, and the webapp's own grid navigation was the wanted shape.

The surface indexes two roots — `reference/` and `content/markdown/aaa/` — three directory levels below each, presented under a synthetic repository node. Measured on build: 1,138 documents across 123 directories, 2,922,026 words. Home offers Reference and Corpus; below that the tree mirrors the filesystem.

#### Delivered

| Component | Path |
| --- | --- |
| Manifest generator, `--write` and `--check`, `--depth N` | `scripts/build-reference-surface.mjs` |
| Application runtime | `src/apps/reference/ReferenceSurfaceRuntime.js` |
| Page | `reference.html` |
| Generated manifest, ignored | `content/generated/reference/reference-surface.v1.json` |
| Deployment exclusion | `scripts/build-static-site.mjs`, `INTERNAL_DEVELOPER_HARNESS_PATHS` |
| Ignore rule | `.gitignore` |
| Runtime-asset registration, so `npm run dev` builds it | `scripts/config/generated-runtime-assets.json` |
| Probe-gated entry control | `index.html` |

Documents render with markdown-it, KaTeX, and mermaid. Internal `.md` links are rewritten to stay in the surface when the target is indexed and marked as leaving it when not. Navigation uses `createStandaloneAppNavigationRuntime` in `#scene-hud-tools`, the same shared top-right chrome as every other standalone application, constructed inside a try/catch so a chrome failure degrades to a working viewer rather than a blank page.

The entry control on `index.html` is a probe rather than a hidden link: it issues a `HEAD` request for the manifest and reveals itself only on success. The manifest does not exist in a deployment, so the control never appears there and no dead link ships. Obscurity is not the mechanism; absence is.

The grid is fixed at six columns by operator decision, with no narrow-window breakpoints, because the surface is used only on a large desktop monitor.

Claim grade: `measured`. The deployment exclusion was verified by calling `isPagesDeploymentExcluded` directly on the three paths and confirming each returns excluded while `index.html` and `photon.html` do not. The manifest counts are the generator's own output. The runtime was exercised against a stub DOM covering home, directory, breadcrumb, and absent-chrome paths. Falsifier: a Pages build whose output contains `reference.html`, the runtime directory, or the generated manifest.

#### Not done

- No lane owns whether the surface should index roots beyond `reference/` and `content/markdown/aaa/`.
- The generator's `--check` is not part of the content-integrity gate, so a stale manifest is never reported. It is a local aid and staleness only means the tree is out of date, but the omission is deliberate rather than overlooked.
- The filename `reference.html` is historical and now narrower than what the surface indexes. Retained deliberately: renaming touches the exclusion list, the ignore rule, the `index.html` probe, and the generator output path, for no benefit the operator sees. The visible titles say `Repository Documents`.
- No test covers the runtime. The stub-DOM exercise was a development check, not a committed test.

- **Evidence / blocker:** Nothing blocks use; the surface works. Verification is outstanding only in the sense that it has not yet been used across enough sessions to know whether the depth limit, the two roots, and the six-column grid are right.
- **Completion:** The surface survives repeated operator use without a change request, or its outstanding questions above are answered and closed.

## Verified

No rows.
