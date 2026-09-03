# Operations Work Queue

This is the canonical execution ledger for repo-wide deployment, hosting, cost, reliability, release, and public-app operations.

## Ranked Next Objects

1. `agent_guidance_surface_consolidation` — [OPS-014](#ops-014--agent-guidance-surface-consolidation). Status: `Queued`.
2. `plainly_convention_document_migration` — [OPS-015](#ops-015--plainly-convention-document-migration). Status: `Blocked`, on OPS-014 finalization.

## Queued task records

### OPS-014 — Agent guidance surface consolidation

- **Status:** Queued
- **Priority object:** `agent_guidance_surface_consolidation`
- **Request / acceptance:** Inventory every surface on which agent guidance can be placed for both Claude and Codex, identify duplication and conflict across them, and adopt a maintenance approach that keeps them consistent without repeated manual synchronization. Acceptance requires the inventory below to be verified against current client documentation, every conflict resolved by a named precedence rule, and at least one drift class converted from manual upkeep to an executable check.
- **Origin:** Operator observation, 2026-09-03, that explanation density varies between responses without a stated reason. Root cause identified during that session: two live authorities give opposite length instructions, and neither states which wins.

Plainly: guidance about how agents should write and behave is currently scattered across the repository and across two different client applications, some of it duplicated and at least one pair of rules in direct contradiction. This item is about finding all of it, deciding what governs, and making the copies keep themselves in step.

#### Identified conflict

The [operator explanation standard](../../op/operator-explanation-standard.md) Cadence Rule states that total response length is explicitly not a constraint and that completeness of inline explanation outranks brevity. A client-level brevity setting active in the same sessions instructs the opposite: be as concise as possible and limit explanation. Neither document references the other, and no precedence rule exists, so each response resolves the conflict arbitrarily.

A second, subtler defect: the explanation standard has one setting but is applied to at least four distinct output registers with genuinely different needs — adjudication packet, explainer of an already-settled result, correction or erratum, and short status or closeout. Register-appropriate output is currently produced by accident rather than by rule.

Plainly: one rule says be thorough at any length, another says be brief, and nothing says which to obey. On top of that, a proof document and a two-line status update are being held to the same standard, when they obviously need different ones.

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
| Explanation standard | [`operator-explanation-standard.md`](../../op/operator-explanation-standard.md) | Detailed authority for plain-language output; audience, unit, content, cadence, recap, self-check |
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
- **Evidence / blocker:** Inventory C is established by direct reading. Inventory A is established for every row except organization instructions. Inventory B is largely unverified and is the first remaining blocker. Recommendation 1 is not started: no generator exists for the `CLAUDE.md` floor, so that mirror is still hand-maintained and can drift. Recommendation 5 is not started: the A/B protocol has no source passages selected and no results ledger. Recommendation 6 is not started: Inventories A, B, and C live only in this queue row and carry no per-row verification dates.
- **Completion:** The surface inventory is verified for both clients and carries per-row verification dates; the length-and-density conflict is resolved by a stated precedence rule in `operator-explanation-standard.md`; the output registers are named with distinct cadence rules; the `CLAUDE.md` floor is generated and `--check` gated against `AGENTS.md`; and at least one blind A/B round has been run with its outcome recorded.

### OPS-015 — Plainly convention document migration

- **Status:** Blocked, on OPS-014 finalization
- **Priority object:** `plainly_convention_document_migration`
- **Blocked by:** [OPS-014](#ops-014--agent-guidance-surface-consolidation). Do not begin conversion until the operator has used the new standard across several sessions and confirmed it is settled. Converting documents to a convention that is still being tuned would mean converting them twice.
- **Request / acceptance:** Decide, tier by tier, which existing documents should be converted from the retired inline `Plainly:` tag to the plain-by-default interleaved explanation the [operator explanation standard](../../op/operator-explanation-standard.md) now requires, and execute only the tiers that earn it. The measured occurrence count is not the work item; reader visibility is.

The standard already states that documents written under the retired convention keep their form and that conversion happens opportunistically during substantial revision. This item exists because that default is right for the working record and wrong for two specific surfaces, which are identified below.

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

- **Evidence / blocker:** The occurrence census is complete and the two governing style authorities have been checked and do not prescribe the tag. Blocking items are OPS-014 finalization, an operator canon decision on Tier 1, and confirmation that no exporter or search index depends on the literal string `Plainly:` — `textbook_bundle_search_index.json` contains it, and whether that is incidental content or a structural key has not been established.
- **Completion:** Tier 2 is converted and the startup-path files no longer demonstrate the retired pattern; Tier 1 is either converted under an explicit canon decision or explicitly declined with that decision recorded; Tier 3 is confirmed as opportunistic-only; and a repeat scan shows no new `Plainly:` occurrences in documents authored after the standard was adopted.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

No rows.
