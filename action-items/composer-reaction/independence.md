# Composer / Reaction Independence

## Direction

Composer and Reaction should be separate applications in the same repo.

They may share:

- repo location;
- build and deploy tooling;
- versioned schemas and fixtures;
- and truly generic infrastructure with no app semantics.

They may not share:

- live app runtime logic;
- app-specific stores or overlay state;
- direct runtime imports across the app boundary;
- or any cross-app coupling except explicit JSON contracts.

The intended boundary is:

- main webapp = launcher/discovery surface;
- Composer = separate app runtime;
- Reaction = separate app runtime;
- cross-app exchange = versioned JSON only.

## Current Status

The separation is real, but not complete.

Already done:

- `composer.html` and `reaction.html` exist as separate entrypoints;
- the main webapp launches those entrypoints from the scene network;
- `reaction_designer` no longer runs as a Composer overlay mode;
- boundary schemas, fixtures, and a boundary-check script are in place;
- Reaction now owns its standalone app shell, template catalog, export seam, and much of its solver composition under `src/apps/reaction/`;
- Composer now owns standalone app-mode policy, app composition, and editor-store facade layers under `src/apps/composer/`.

Still remaining:

- Reaction still has legacy `ComposerReaction...` naming and compatibility layers that should be retired;
- the larger solve proposal layer is still legacy-named and has not yet been moved under a real Reaction-owned name;
- Composer still depends too much on `app.js` as a shared composition root;
- the Reaction export -> Composer import workflow is still provisional rather than production-hardened;
- and some transitional compatibility code remains in place on both sides.

## Remaining Work

### 1. Finish Reaction Ownership

Remaining target:

- move the remaining clearly Reaction-owned runtime modules out of legacy `ComposerReaction...` identity;
- eliminate wrapper/scaffold layers once the underlying module has a real Reaction-owned home;
- leave old names only as temporary compatibility re-exports while callers are migrated;
- refresh the provisional `ReactionFlowDocument` shape against current solver behavior.

### 2. Finish Composer Ownership

Remaining target:

- keep moving Composer-specific runtime behavior out of `app.js`;
- give Composer a cleaner standalone composition root with less dependence on the old shared shell;
- remove transitional mixed naming where Composer still carries Reaction-era naming or assumptions.

### 3. Harden The Contract

Remaining target:

- finalize `reaction-flow/v1` around current solver semantics;
- add the Composer import adapter for that contract;
- add import/export golden tests;
- confirm Composer can consume the handoff without executing Reaction runtime code.

### 4. Remove Transitional Coupling

Remaining target:

- remove obsolete shared scene-mode and overlay assumptions;
- remove remaining compatibility scaffolding once callers have been migrated;
- leave the contract boundary as the only intentional connection.

## Near-Term Order

From the current repo state, the best remaining order is:

1. finish the larger Reaction-owned rename/move pass, starting with the remaining solve/proposal layer;
2. keep shrinking Composer runtime ownership inside `app.js`;
3. then harden the JSON handoff against current real app behavior;
4. then delete transitional compatibility code.

## Enforcement

This boundary should stay mechanically enforced.

Keep:

- forbidden cross-import checks;
- contract fixture validation;
- Reaction export tests;
- Composer import tests;
- and smoke tests proving each app boots independently.

## Post-Independence Disposition

After the separation work is complete, revisit these smaller UX fixes:

1. add an `Exit` button to the standalone Reaction app, matching Composer;
2. fix product-side `Neutron` and `Proton` title tiles on the Reaction page so they include the `Pro` prefix consistently.

## Non-Goal

This does not require two repos.

One repo is fine. The goal is independent app runtimes with a versioned contract boundary.

## Related Action Items

- [composer](./composer.md)
- [reaction](./reaction.md)
- [composer-reaction](./composer-reaction.md)
- [pdg-solver](./pdg-solver.md)
- [swe](./swe.md)
