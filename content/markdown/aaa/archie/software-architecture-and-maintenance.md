# Software Architecture and Maintenance

This note defines contributor-facing guidance for keeping the Architrino webapp codebase coherent as it grows. Its purpose is to prevent experimental paths, hardcoded stopgaps, duplicated logic, and abandoned prototypes from quietly hardening into the long-term architecture.

Architecture is how the codebase remembers what owns what. When ownership is clear, a change can improve one layer without leaving another layer full of old paths, hidden assumptions, or duplicate behavior.

Read this as maintenance governance for the software side of the project: first the governing claim, then the major failure modes, then the rules used to keep the codebase from drifting into legacy cruft.

## Purpose

This note explains how the project should treat software architecture, cleanup, superseded implementations, and temporary development paths. It is not a speculative engineering memo. It is the common contributor guidance for how to add, revise, and retire implementation paths without letting old experiments accumulate into structural debt.

This guide should be read alongside [about-the-webapp.md](about-the-webapp.md).

## Core Claim

The codebase should have one canonical implementation path per responsibility whenever practical.

The main maintenance risk is not only broken code. It is architectural ambiguity: two or more paths partly doing the same job, prototype logic lingering after the experiment is over, or hardcoded assumptions remaining in place after the design has moved elsewhere.

The practical rule is:

- preserve working behavior,
- but do not preserve every historical implementation branch merely because it once existed.

When a new path clearly supersedes an old one, remove the old path in the same change. If the operator/developer explicitly requests a temporary transition, record the removal condition where maintainers will see it.

## Main Failure Modes

The project should actively guard against the following:

- prototype-only code that never graduates into a maintained subsystem,
- duplicated logic where two modules now answer the same question,
- hardcoded values or path assumptions that should have become authored or data-driven,
- fallback branches retained after the migration they were meant to protect has ended,
- old scene or runtime paths left behind after a different architecture becomes canonical,
- comments, TODOs, or compatibility shims that describe a direction the project no longer intends to follow,
- and local patches added for one task that silently bypass the deeper ownership boundaries of the app.

These are not merely cosmetic problems. They make later contributions harder to reason about, increase the chance of contradictory edits, and weaken confidence about which layer actually owns a given behavior.

## Ownership Boundaries

The software architecture remains coherent only if ownership is explicit.

The current high-level split is:

- markdown owns long-form textbook and reference content,
- scene JSON owns reader-facing hierarchy, routing targets, scene typing, and explicit navigation structure,
- generated manifests own lookup, indexing, and graph-level acceleration,
- runtime code owns behavior, orchestration, and rendering,
- and directories own storage convenience only.

Software maintenance should reinforce these boundaries rather than blur them.

Examples:

- do not make filesystem layout silently define scene hierarchy,
- do not let generated files become hand-maintained sources of truth,
- do not put long-term content rules into ad hoc runtime conditionals,
- and do not let temporary runtime workarounds quietly replace authored scene or document structure.

## Canonical Path Over Coexistence

Parallel implementations should be treated as a smell unless they are deliberately temporary and explicitly named as such.

When revising a feature, contributors should answer three questions:

1. What is the canonical path after this change?
2. What older path, if any, is now superseded?
3. Can the superseded path be removed immediately?

If the answer to the third question is no, the residual coexistence should be intentional, short-lived, and called out explicitly in the change discussion or note.

The codebase should not drift into a state where a newer path exists but the older path remains indefinitely only because deleting it felt inconvenient.

## Prototypes and Temporary Paths

Prototype work is allowed. Unnamed residue is not.

A prototype or experimental branch is acceptable when:

- the experiment is genuinely needed to discover the right architecture,
- its scope is narrow and legible,
- and its exit condition is reasonably clear.

A prototype becomes a maintenance problem when:

- it remains in place after a canonical replacement exists,
- it is no longer exercised but is still feared too much to remove,
- or its assumptions are copied into newer code until the prototype and the production path can no longer be distinguished.

The cleanup rule is simple:

- either promote the experiment into the maintained architecture,
- or remove it once the project decides against that direction.

## Hardcoded Values and Authored Structure

Hardcoding is not always wrong. It is wrong when it captures a choice that belongs to a more stable authored or architectural layer.

Keep hardcoded values only when they are truly intrinsic to the runtime implementation. Move them outward when they are really:

- scene-specific authored choices,
- document-specific presentation choices,
- reusable configuration,
- or one-off experimental assumptions that should not silently become global law.

The key distinction is whether the value is implementation-local or policy-like. If it is policy-like, it should not remain buried in an arbitrary runtime branch.

## Supersession, Migration, and Removal

Not every migration can be completed in one edit. But every migration should still have a declared end state.

Good migration behavior:

- add the new path,
- switch the active callers,
- remove or quarantine the old path,
- and make the temporary overlap explicit.

Bad migration behavior:

- add a second implementation,
- leave both implementations live,
- and never settle which one is authoritative.

When immediate removal is unsafe, the residual legacy path should be minimized and described as temporary compatibility work, not treated as a permanent layer of the architecture.

## Generated and Derived Files

Generated files should remain generated.

Contributors should not treat generated manifests as the primary place to make conceptual changes. Conceptual changes belong in the authored sources that produce them. After that, generated outputs should be refreshed and checked for drift.

This discipline matters because the project already depends on generated indices and graph manifests. If a contributor starts editing generated outputs directly, the architecture becomes harder to audit and the next regeneration will either erase the manual edit or create confusion about which layer is authoritative.

## Composition Roots and Local Modules

Large top-level runtime files should remain composition roots and wiring layers as much as practical. They should not become the indefinite resting place for every new feature.

When adding a new feature, prefer:

- a focused module for the new behavior,
- thin integration at the composition root,
- and deletion of the superseded local patch when the extracted module takes over.

This keeps growth additive in capability without being additive in sprawl.

## Document and Scene Economy

The same maintenance discipline should apply to markdown documents and scenes, not only to runtime code.

The project should prefer a canonical reductionist network:

- one concept should not be explained in several partially overlapping documents unless those documents genuinely serve different roles,
- one branch of scene structure should not fork into multiple near-duplicate navigation paths unless the distinction is real and reader-facing,
- and one durable explanation should not be copied into several locations merely because it was convenient during drafting.

This does not mean that every concept must be compressed aggressively. It means that duplication should need a reason.

Good growth behavior:

- merge notes when they are really one conceptual object,
- split notes only when the resulting objects are cleaner than the combined one,
- and prefer cross-reference over repeated exposition when two documents need the same idea.

Bad growth behavior:

- keeping near-duplicate prose because different drafts once existed,
- leaving two scene paths that now organize the same conceptual branch,
- or preserving multiple partial explanations of the same mechanism when one canonical treatment would be clearer.

The maintenance question is therefore not only "is this file or scene valid?" It is also "should this still be a separate object at all?"

When a contributor or agent notices that concepts, prose, or scene structure are beginning to overlap in a way that invites consolidation, the default behavior should be to raise the suggestion explicitly. Where ideas beg to be combined, de-duplicated, or reduced into a cleaner canonical network, the contributor should say so rather than silently preserving the sprawl.

## Forward-Only Documentation

Most project documents should describe the current source of truth and the intended next path, not the path by which the document arrived there. A document becomes harder to maintain when it preserves abandoned names, old counts, superseded plans, or implementation migration notes that no current reader needs.

Default behavior:

- write the canonical current state directly;
- remove process-history sentences once they no longer guide action;
- keep transition notes only when they name active residual work or an explicitly requested temporary transition;
- use `reference/priorities/`, `reference/architectural-decisions/`, GitHub issues, GitHub pull requests, and git history for backlog, rationale, and historical trace;
- keep user-facing and reader-facing documents free of internal drafting history unless the document is explicitly historical.

Acceptable reasons to keep history inside a document:

- the document is an architectural decision record, release note, priority ledger, audit trail, generated-output inventory, or historical comparison;
- the earlier state is evidence for the current claim;
- the operator/developer explicitly requested a temporary transition and a maintainer needs to know its removal condition.

Unacceptable reasons:

- the author remembers the earlier draft;
- the sentence explains that the current design was "redesigned";
- the document keeps an obsolete count, name, or plan to show progress;
- a generated artifact has not yet caught up with the canonical source.

## Review Questions for Contributors

Before considering a software change complete, ask:

1. Did this change create a second path for a responsibility that used to have one?
2. If so, did the operator/developer explicitly request the temporary coexistence?
3. Is there older code that is now superseded and safe to remove?
4. Did any hardcoded choice get introduced that should really be authored or configurable?
5. Did the change preserve the ownership boundary between content, scene structure, generated manifests, and runtime behavior?
6. Did any comment, TODO, or compatibility branch become stale because of this change?
7. Did the change increase conceptual sprawl in scenes or markdown where a cleaner combined object would be better?
8. Did the change leave process-history prose in a guide, reader-facing page, or reference note where current-state prose would be cleaner?

If the answer reveals residual debt, either clean it up in the same change or call it out explicitly as remaining work.

## AI-Assisted Contributions

AI-assisted implementation is expected to be part of the project workflow. That makes this maintenance discipline more important, not less.

AI (Assembled Intelligence) tools are often strong at local completion but weaker by default at collapsing redundant paths after a design changes. Without explicit guidance, an assistant may preserve uncertainty by adding another branch rather than consolidating the architecture.

For that reason, AI-assisted contributions should be held to the same rule:

- do not confuse non-destructive editing with indefinite preservation of obsolete code.

Preserve user data, preserve unrelated work, and preserve active behavior. But do not preserve superseded implementation paths by default once the project is confident about the canonical one.

## Maintenance Standard

The codebase should aim to be:

- explicit in ownership,
- narrow in canonical paths,
- willing to delete superseded code,
- cautious about hardcoded policy,
- and resistant to prototype residue becoming permanent structure.

That standard is not separate from architecture. It is how architecture remains real over time.
