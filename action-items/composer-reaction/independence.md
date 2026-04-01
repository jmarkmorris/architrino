# Composer / Reaction Independence

## Direction

Composer and Reaction should be separate app runtimes in one repo.

Allowed sharing:
- repo/build/deploy tooling
- versioned schemas and fixtures
- truly generic infrastructure with no app semantics

Not allowed:
- live cross-app runtime logic
- app-specific stores or overlay state
- direct runtime imports across the app boundary
- any cross-app coupling except explicit JSON contracts

Boundary:
- main webapp = launcher/discovery surface
- Composer = standalone app runtime
- Reaction = standalone app runtime
- cross-app exchange = versioned JSON only

## Current Status

Done:
- `composer.html` and `reaction.html` exist as separate entrypoints;
- the main webapp launches those entrypoints from the scene network;
- `reaction_designer` no longer runs as a Composer overlay mode;
- boundary schemas, fixtures, and a boundary-check script are in place;
- Reaction now owns its standalone app shell, template catalog, export seam, and much of its solver composition under `src/apps/reaction/`;
- Reaction solve-state, solve-layout, solve-projection, and solve-proposal now live under Reaction-owned module names, with legacy runtime paths reduced to compatibility exports where needed;
- Composer now owns standalone app-mode policy, app composition, editor-store facade layers, page-shell DOM lookup, default draft/id scaffolding, assembly-list normalization helpers, pure authoring helpers, assembly authoring logic, timing/overlay integration helpers, and draft/library/preview workspace logic under `src/apps/composer/`.

Left:
- Reaction still has legacy `ComposerReaction...` naming and compatibility layers that should be retired;
- Composer still depends too much on `app.js` as a shared composition root;
- the Reaction export -> Composer import workflow is still provisional rather than production-hardened;
- and some transitional compatibility code remains in place on both sides.

## Remaining Work

1. finish the remaining Reaction rename/move pass and retire `ComposerReaction...` compatibility layers.
2. keep shrinking Composer-only runtime behavior out of `app.js`.
3. harden the real `reaction-flow/v1` export/import path against current app behavior.
4. remove transitional compatibility scaffolding so the contract is the only intentional connection.

## Enforcement

Keep:
- forbidden cross-import checks;
- contract fixture validation;
- Reaction export tests;
- Composer import tests;
- and smoke tests proving each app boots independently.

## Audit

- review that reaction doesn't mention composer in file names or code where it doesn't make sense and vice versa
- review modularity
- review wrappers
- review scaffolding
- look for dead code
- look for spaghetti code due to how we got here

## Post-Independence Disposition

1. add an `Exit` button to the standalone Reaction app, matching Composer;
2. fix product-side `Neutron` and `Proton` title tiles on the Reaction page so they include the `Pro` prefix consistently.
3. flatten the Composer canvas framing so the canvas uses the full available area and does not pick up redundant nested frames around the timeline/canvas surface.

## Non-Goal

This does not require two repos. One repo is fine. The goal is independent app runtimes with a versioned contract boundary.

## Related Action Items

- [composer](./composer.md)
- [reaction](./reaction.md)
- [composer-reaction](./composer-reaction.md)
- [pdg-solver](./pdg-solver.md)
- [swe](./swe.md)
