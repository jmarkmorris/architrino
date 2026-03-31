Here is another project.  I need to untangle composer and reaction into fully separate apps with apis.

Yes.

The key point is that the “reaction app” is not implemented as a separate app stack. It is a `reaction_designer` scene that turns on reaction-solver mode inside the same composer overlay and app shell.

Evidence:
- The shared overlay root is [`index.html:191`](../../index.html#L191) and the reaction controls/solver live inside that same overlay at [`index.html:225`](../../index.html#L225) and [`index.html:273`](../../index.html#L273).
- `app.js` explicitly treats `composer`, `reaction_designer`, and composer preview as one overlay-scene family at [`app.js:8132`](../../app.js#L8132) and [`app.js:8141`](../../app.js#L8141).
- When the current scene is `reaction_designer`, the app just activates the reaction solver runtime at [`app.js:10533`](../../app.js#L10533) and [`app.js:10592`](../../app.js#L10592).
- The “back to Composer” action is just a scene jump from reaction mode back to the composer scene at [`app.js:10782`](../../app.js#L10782).
- The `reaction_designer` scene itself is basically a thin route with no authored objects at [`content/scenes/archie/reaction_designer.json:3`](../../content/scenes/archie/reaction_designer.json#L3).

They also share lower-level code:
- Same overlay/control runtime: [`src/runtime/ComposerUiRuntime.js:54`](../../src/runtime/ComposerUiRuntime.js#L54) and [`src/runtime/ComposerControlsUiRuntime.js:77`](../../src/runtime/ComposerControlsUiRuntime.js#L77).
- Same template catalog: composer uses `composerAssemblyTemplateMenuRows` for its assembly menu at [`app.js:3709`](../../app.js#L3709), and reaction uses that same catalog for solver pickers at [`app.js:10545`](../../app.js#L10545) from [`src/runtime/ComposerCatalogRuntime.js:5`](../../src/runtime/ComposerCatalogRuntime.js#L5).
- Same structure/domain model: composer’s canonical assembly bridge uses [`src/runtime/ComposerAssemblyStructureBridgeRuntime.js:214`](../../src/runtime/ComposerAssemblyStructureBridgeRuntime.js#L214), while reaction code imports the same structure primitives from [`src/domain/structure/StructureSchema.js:1`](../../src/domain/structure/StructureSchema.js#L1) via [`src/runtime/ComposerReactionSolverUiRuntime.js:67`](../../src/runtime/ComposerReactionSolverUiRuntime.js#L67) and [`src/runtime/ComposerReactionStructureBridgeRuntime.js:1`](../../src/runtime/ComposerReactionStructureBridgeRuntime.js#L1).

So the short answer is: yes, heavily. The reaction app is mostly a specialized mode layered onto the composer app’s shell, with its own `ComposerReaction*` runtimes for reaction-specific behavior.