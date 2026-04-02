# Cruft and Sprawl Reduction

## Workstream Metadata

- Kind: `maintenance`
- Rank: `—`
- Value: `—`
- Cost: `—`
- ROI: `—`
- Status: `active`

## Task Queue

1. `collapse_reaction_designer_path` — Decide whether Reaction Designer is a real standalone scene or a Composer mode, then remove the duplicate path. Status: `next`. Depends on: none.
2. `centralize_scene_capabilities` — Replace scattered scene-id and path checks with one canonical scene capability or trait layer. Status: `pending`. Depends on: `collapse_reaction_designer_path`.
3. `thin_app_js_switchboard` — Continue extracting feature-specific routing and scene behavior out of `app.js` so it remains a composition root rather than a semantic switchboard. Status: `pending`. Depends on: `centralize_scene_capabilities`.
4. `consolidate_composer_reaction_docs` — Reduce Composer and Reaction design-note overlap so one document owns the canonical architecture and the others become scoped supplements or short pointers. Status: `pending`. Depends on: none.
5. `remove_runtime_markup_drift` — Audit places where authored markup is immediately superseded by runtime behavior and either make the markup canonical or reduce it to a neutral placeholder. Status: `pending`. Depends on: `thin_app_js_switchboard`.

## Scope

This workstream tracks high-priority cases where the repo shows duplicate implementation paths, ad hoc hardcoded semantics, oversized coordinator files, or overlapping design documents. The goal is not cosmetic tidying. The goal is to preserve a canonical reductionist network in code, scenes, and Markdown so new work does not accumulate another layer of legacy structure.

## Current Findings

- `Reaction Designer` currently has two conceptual homes: an authored Archie scene and a Composer-owned special mode. That ambiguity should collapse into one canonical model.
- Scene semantics such as periodic overlays, atom behavior, standard-model behavior, and exclusion rules are still inferred through scattered scene-id and path checks instead of a single declared capability layer.
- `app.js` still carries too much high-level feature-routing responsibility, which makes it easier for new special cases to accrete there.
- Composer and Reaction architecture notes are spread across multiple `action-items` documents that overlap in scope and canonicality.
- Some authored UI text is not actually source-of-truth because runtime code replaces it immediately.

## Review Questions

- Is there one clearly canonical path for each feature, scene type, and authored data flow?
- Are we keeping an older implementation path alive only because deleting it feels inconvenient?
- Should a scene behavior be declared in metadata instead of inferred from scene ids or filesystem paths?
- Does a Markdown note really need to exist as its own document, or should it be merged into a stronger canonical reference?
- Is a supposedly temporary bridge, fallback, or placeholder now functioning as legacy architecture?

## Related Action Items

- [composer-reaction](../composer-reaction/observer.md)
- [composer](../composer-reaction/composer.md)
- [reaction](../composer-reaction/reaction.md)
- [viewports](../viewports/viewports.md)
- [codex](../codex/codex.md)

## Related AAA Notes

- [software-architecture-and-maintenance](../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [about-the-webapp](../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../content/markdown/aaa/archie/scene-taxonomy.md)
