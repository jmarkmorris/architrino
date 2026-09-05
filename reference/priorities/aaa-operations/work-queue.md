# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `agent_guidance_surface_consolidation` — [OPS-014](#ops-014--agent-guidance-surface-consolidation). Status: `Queued`.
2. `reference_equation_mapping_surface` — [OPS-016](#ops-016--reference-equation-mapping-surface). Status: `Queued`.

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

| Surface | Where it is set | Scope | Current content | Last verified |
| --- | --- | --- | --- | --- |
| Instructions for Claude | Initials, lower left → Settings → Instructions for Claude | Account-wide, every conversation | Architrino project block: layer discipline, no-mass/no-force, causal-delay terms, claim grading, $c_f=1$, no git, `Plainly:`, `Closure goal:`, question format | 2026-09-03 |
| Response style | Style selector in the chat composer; built-in Normal, Concise, Explanatory, Formal, plus custom styles | Per conversation or as a default | `Concise` — the source of the brevity instruction in the conflict above | 2026-09-03 |
| Cowork Global instructions | Settings → Cowork → Global instructions | Every Cowork session | Cleared by the operator on 2026-09-03; previously the pointer `see AGENTS.md` | 2026-09-03 |
| Project instructions | The project itself | Chats inside that project only | Repo description and webapp/Pages context | 2026-09-03 |
| User skills | Settings → Skills | On demand or by trigger | Not currently used for Architrino style | 2026-09-03 |
| Session memory | Written by the agent, persists across conversations | Cowork sessions | Session index plus per-fact files; behavioral guidance appears here incidentally rather than by design | 2026-09-03 |
| Organization instructions | Admin settings, Team and Enterprise plans only | Every member of the organization | Not applicable to this account as far as this session can establish | Unverified |

Claim grade: `measured` by direct reading of the settings surfaces named in the [Claude personalization documentation](https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features), except the organization row, which is `inferred` from plan type and must be confirmed by the operator.

#### Inventory B — Codex surfaces

| Surface | Location | Scope | Status in this repo | Last verified |
| --- | --- | --- | --- | --- |
| Global agent instructions | Codex home directory, outside this checkout | Every Codex session for this user | Present or absent unverified by this session | Unverified |
| Repository root `AGENTS.md` | [`AGENTS.md`](../../../AGENTS.md) | Whole checkout | Present and governing | 2026-09-03 |
| Nested `AGENTS.md` | Any subdirectory | Nearest ancestor wins for files under it | None present; the repository deliberately keeps a single root policy | 2026-09-03 |
| Client configuration | Codex home directory | Model, approval mode, sandboxing | Outside repository control | Unverified |
| Repository hooks | [`.codex/hooks.json`](../../../.codex/hooks.json) | Codex lifecycle events in this checkout | Present | 2026-09-03 |
| Saved prompts | Codex home directory | Reusable prompt library | Unverified | Unverified |

Claim grade: `inferred` for every row marked unverified. Confirming this table against current Codex documentation and the operator's actual home-directory contents is an explicit deliverable of this item, not a precondition for opening it.

Plainly: Claude and Codex each read guidance from several places, and only some of those places are files in this repository. Anything set inside a client application is invisible to every other agent working in the same checkout, which is how two agents on the same task end up following different rules.

#### Inventory C — In-repository surfaces

| Surface | Path | Role | Last verified |
| --- | --- | --- | --- |
| Governing policy | [`AGENTS.md`](../../../AGENTS.md) | Sole authored authority | 2026-09-03 |
| Session bootstrap | [`CLAUDE.md`](../../../CLAUDE.md) | Routes to `AGENTS.md`; carries the Claude-only write-permission rule and a generated, fingerprint-gated projection of the pre-read policy floor | 2026-09-03 |
| Generated router | [`agent-startup-orientation.generated.md`](../../op/agent-startup-orientation.generated.md) | Workflow cards, standing rules, prompt index; regenerated and `--check` gated, with source fingerprints | 2026-09-03 |
| Explanation standard | [`operator-explanation-standard.md`](../../op/operator-explanation-standard.md) | Sole authority for operator-facing output; audience, plain-by-default explanation, repetition, structure, expected tools, analogy, registers, length precedence, `Open items:`, response mechanics, self-check | 2026-09-03 |
| Operator feedback backlog | [`README-op.md`](../../op/README-op.md) | One-line workflow behaviors under Method, Efficiency, Clarity, Multi-Agent Use, Technical Closure | 2026-09-03 |
| Procedure index | [`brainstorming.md`](../../op/brainstorming.md) | Index for the rest of `reference/op/` | 2026-09-03 |
| Prompt template | [`codex-goal-seeking-prompt-template.md`](../../op/codex-goal-seeking-prompt-template.md) | Communication and reporting procedure | 2026-09-03 |
| Corpus style authorities | `content/markdown/aaa/archie/`: `academic-style-guide.md`, `mathematics-style-guide.md`, `mathematics-terminology.md`, `terminology-usage.md`, `comparative-glossary.md` | Reader-facing corpus prose and notation | 2026-09-03 |
| End-user language | `content/markdown/aaa/archie/`: `ui-guidelines.md`, `navigation-and-controls.md` | App-facing wording | 2026-09-03 |
| Role prompts | `reference/research-office/cto/prompts/` — 14 prompts plus `README.md` | Per-role behavior for research, review, convergence, promotion, adjudication | 2026-09-03 |
| Repository skills | `.agents/skills/` — `aaa-corpus-advancement`, `corpus-review-workflow`, `math-preview`, `research-exploration` | Discovery routers into the live procedures; three carry an `agents/openai.yaml` | 2026-09-03 |

There is exactly one authored `AGENTS.md` and exactly one `CLAUDE.md` in the repository, both at the root. Other copies found under `.tmp/` belong to unrelated vendored checkouts and are not project policy.

Claim grade: `measured` by filesystem enumeration on 2026-09-03. Falsified by a second authored `AGENTS.md` or `CLAUDE.md` outside `.tmp/`.

Plainly: inside the repository the policy story is now one governing file, one bootstrap file with a generated safety projection, and a set of specialised guides beneath them. The remaining seam is outside the repository, where client applications can hold rules that other agents cannot see.

The current response and capture decisions are maintained in [the operations tracker](priorities.md#operator-response-and-discussion-capture). The dated inventory and calibration records below preserve their historical findings; the live operator standard owns current length precedence and response mechanics.

#### Recommended approach

1. **Make the mirror generated rather than hand-maintained.** The floor section of `CLAUDE.md` restates `AGENTS.md` by hand and can drift silently. The repository already solves this exact problem for the startup router with a generator, a `--check` gate, and source fingerprints. Applying the same pattern converts a recurring manual synchronization chore into a failing check. This is the single largest reduction in maintainer burden available here.
2. **Keep client-side settings free of behavior.** Anything behavioral placed in Instructions for Claude, a response style, or Global instructions is invisible to Codex and to every other agent in the checkout. Client settings should carry at most a pointer. The operator's clearing of Global instructions on 2026-09-03 is consistent with this and should be extended to the remaining behavioral content once the repository can carry it.
3. **Name the output registers.** Extend `operator-explanation-standard.md` with a register table — adjudication, explainer, erratum, status — each with its own cadence and length rule, replacing the current single setting.
4. **State precedence explicitly.** `operator-explanation-standard.md` should declare that it governs response length and explanation density for work in this repository and outranks any client-level brevity or verbosity setting, naming that setting so the conflict is discoverable rather than latent.
5. **Calibrate by blind comparison rather than assertion.** Fix a set of source passages, render each under two candidate register profiles, present them unlabelled, and record the operator's choice and stated reason. Labelled comparison biases the choice toward the profile the operator believes they ought to prefer.
6. **Keep one inventory with verification dates.** Inventories A, B, and C above become a single maintained document with an owner and a last-verified date per row, so a future session checks one place rather than rediscovering the surface list.

Plainly: stop copying policy by hand and let a generator do it; keep behavior rules in the repository where every agent can see them; give short updates and long proofs different rules instead of one; write down which rule wins when two disagree; pick the settings by blind test rather than by argument; and keep one list of where everything lives.

- **Progress, 2026-09-03:** Recommendations 1, 3, and 4 are complete, and recommendation 6 has its durable per-row verification-date structure. [`operator-explanation-standard.md`](../../op/operator-explanation-standard.md) was rewritten to replace the AP-STEM audience model with an expert-in-theory, non-specialist-in-imported-framework model; to retire the inline `Plainly:` tag in favor of plain-by-default interleaved explanation; to require mechanism as well as significance; to treat repetition as a cost worth paying only when it buys clarity; to add structure and expected-tool rules; to add the four-register table; and to declare precedence over client-level brevity settings by name. The `CLAUDE.md` pre-read floor is now generated by `scripts/build-claude-bootstrap-floor.mjs`, fingerprinted against `AGENTS.md`, the explanation standard, and the academic style guide, and checked by the full content-integrity runner. Its authored bootstrap route now carries the same readable-checkout and unavailable-checkout branches as `AGENTS.md`. Recommendation 2 is partly complete: the operator cleared Cowork Global instructions on 2026-09-03, and the account-level `Concise` response style is now explicitly overridden by the standard rather than silently conflicting with it. Duplicated style guidance was reduced to pointers in `AGENTS.md`, `CLAUDE.md`, `codex-goal-seeking-prompt-template.md`, `adjudication.md`, and the `start-research.md` report template.
- **Calibration rounds, 2026-09-03.** Recommendation 5 was run as two labelled rounds rather than the blind protocol it specifies, because the operator was refining the standard rather than being tested against it and needed to comment on the varied dimension directly. Round 1 held one technical unit fixed — the $D_{t,ij}$ against $D_{r,ij}$ asymmetry in `dynamics/master-equation.md` — and varied analogy-carried against map-abstraction-carried explanation. Both were rejected: the extended analogy lost the reader partway, and the abstraction-carried version was judged less explanatory. Round 2 varied continuous prose against a verdict-first case split over the same unit. Continuous prose won, described as readable straight through. Three preferences were stated and are now written into the standard: define terms more, accepting redundancy from section to section; carry mechanism in configuration and symbol rather than in analogy; and deliver visualization, logic, definitions, and words before the equation. Claim grade: `measured` by direct operator response, on one technical unit across two rounds. Falsified by a third round on different source material reversing any of the three preferences. The result is not blind and is not evidence about which profile the operator would choose without knowing the axis.
- **Evidence / blocker:** Inventory C and the repository-visible rows of Inventory B were verified directly on 2026-09-03. Inventory A retains its earlier direct-reading dates, with organization instructions unverified. The remaining completion blocker is the Codex client and home-directory portion of Inventory B; its rows are now explicitly marked `Unverified` rather than inheriting a date from nearby measurements. The generator check detects a changed source fingerprint or an edited projection, but regeneration still requires review of whether the compact floor accurately reflects the changed authorities; the fingerprint is a drift alarm, not a semantic proof.
- **Completion:** The surface inventory is verified for both clients and carries per-row verification dates; the length-and-density conflict is resolved by a stated precedence rule in `operator-explanation-standard.md`; the output registers are named with distinct density rules; the `CLAUDE.md` floor is generated and `--check` gated against `AGENTS.md`; and at least one calibration round has been run with its outcome recorded, with any round that was not blind labelled as such.

### OPS-015 — Moved to the corpus rewrite lane

- **Status:** Moved, 2026-09-03
- **Priority object:** `plainly_convention_document_migration`, retired here and reformulated as `retired_tag_retirement`
- **Now owned by:** [CRW-004 — Retired plain-language tag retirement](../aaa-corpus-rewrite/work-queue.md#crw-004--retired-plain-language-tag-retirement)

This item held the migration away from the retired inline `Plainly:` tag while that looked like a standalone cleanup with its own operator gate. It stopped being one. Edition 1.0 of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) forbids the tag, and done criterion 12 of the corpus rewrite lane states that rule in executable form, so the bulk of the removal is now a by-product of conversions that lane is already running rather than work anyone schedules separately.

Both of this item's blockers are discharged, and the record of that lives in CRW-004 rather than being restated here: the operator opened the corpus-wide rewrite, which was the readiness gate, and edition 1.0 settled the canon question of whether the reader-facing style authority should say anything about the tag.

The measured census, the finding that the tag leaked into reader-facing prose without any reader-facing authority ever prescribing it, the tiering by reader visibility, and the discharged search-index dependency all moved with the item. Nothing was dropped in the move. The residual pass over the startup-path files in `reference/op`, `reference/research-office/cto/prompts`, and `.agents/skills` went there too, even though those are operations surfaces rather than corpus, because splitting one retirement across two queues would leave neither queue able to say when it is finished.

### OPS-016 — Reference equation-mapping surface

- **Status:** Queued
- **Priority object:** `reference_equation_mapping_surface`
- **Request / acceptance:** Give operator-facing documents under `reference/` the same symbol-definition viewer the corpus already has, so a document carrying display equations can be read with every symbol resolvable on demand rather than only from the prose around it. Acceptance requires a second registry that builds and validates alongside the corpus registry, with any source changes governed by a declared write mode and explicit target set, and without creating links from `content/markdown/aaa` into `reference/`.
- **Origin:** Operator request, 2026-09-03, during calibration of the [operator explanation standard](../../op/operator-explanation-standard.md): the corpus has a view-equation mode showing every symbol's definition, and operator-facing documents do not.

#### Source-write policy, 2026-09-03

The reference builder follows the write authority of the executing queue item. An authorized item may update explicitly scoped reference sources; other runs remain check-only. Corpus behavior is unchanged: `[View →]` chips continue to be injected into `content/markdown/aaa`. Policy and procedure files under `reference/` are read as plain markdown in a terminal at least as often as in a browser, so any injected reference-surface markers must be explicitly accepted and validated rather than added as an incidental generator side effect.

#### Current implementation, read 2026-09-03

[`scripts/build-equation-mapping-corpus.mjs`](../../../scripts/build-equation-mapping-corpus.mjs) is 763 lines. It scans one root, `CORPUS_ROOT = "content/markdown/aaa"` at line 14, extracts every symbol from each TeX block, searches surrounding lines for a definition using a cue pattern, and falls back to a shared dictionary of standard symbols. It emits `content/generated/equation-mapping/corpus-equations.json` under schema `equation-mapping-corpus-registry.v1`, declared in [`scripts/config/generated-runtime-assets.json`](../../../scripts/config/generated-runtime-assets.json) as id `equation-corpus` and therefore a reproducible ignored output. The viewer page is `equation-mapping.html`. At line 708 the builder writes back into source markdown, which is how the chips are injected. [`scripts/check-content-integrity.mjs`](../../../scripts/check-content-integrity.mjs) line 65 runs it with `--check`, and [`scripts/validate-equation-mapping-links.mjs`](../../../scripts/validate-equation-mapping-links.mjs), 74 lines, verifies registered links resolve.

#### Work items

1. Parameterize the scan root into a set of roots, each with its own registry path, viewer route, and write policy. Not a one-line change: the root constant is also used at line 515 to derive a document's area from the path segment following it.
2. Add a second registry output for `reference/`, with its own `generated-runtime-assets.json` entry so it builds and stays untracked.
3. Supply a navigation fallback. Reference documents have no entry in `content/graph/scene_graph.json` or `content/graph/textbook_toc.json`, which the builder joins against for back-links.
4. Parameterize the line-708 write path by target policy so an authorized reference action can update only its explicitly scoped sources while ordinary reference builds remain check-only.
5. Keep the two registries separate rather than merged. A merged surface would place reference targets inside corpus pages and can manufacture the `content/markdown/aaa` → `reference/priorities` links AGENTS.md forbids.
6. Teach the integrity gate and the link validator about the second surface.

- **Evidence / blocker:** The implementation facts above are `measured` by direct reading of the named files and line numbers. Not established: whether the viewer can resolve symbols for a document that carries no injected chips, or whether the line-708 write path can be constrained to an explicit reference target set; work item 4 must establish both modes in `src/apps/equation-mapping/`. No blocker beyond that.
- **Completion:** A reference registry builds, validates, and is `--check` gated; reference documents render with resolvable symbols; any reference-source update requires declared write mode, an explicit target set, and validation; and no link from `content/markdown/aaa` into `reference/` is created.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

No rows.
