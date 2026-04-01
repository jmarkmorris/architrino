import test from "node:test";
import assert from "node:assert/strict";

import { createComposerEditorStore } from "../src/runtime/ComposerStoreRuntime.js";
import { createComposerEditorStoreFacade } from "../src/apps/composer/ComposerEditorStoreFacadeRuntime.js";

test("composer editor store facade exposes the composer-specific store operations", () => {
  const editorStore = createComposerEditorStore({
    pathState: {
      points: [],
      interpolate: "spline",
      closed: false,
      ownerAssemblyId: null,
    },
  });
  const facade = createComposerEditorStoreFacade(editorStore);

  facade.setComposerAssemblyDraftsState([{ id: "assembly_a" }]);
  facade.setComposerSelectedAssemblyIdState("assembly_a");
  facade.setComposerSelectedPointIndexState(2);
  facade.setComposerTransferListRawStateValue("a->b");
  facade.mutateComposerPathStateState((pathState) => {
    pathState.closed = true;
  });

  assert.deepEqual(facade.getComposerAssemblyDraftsState(), [{ id: "assembly_a" }]);
  assert.equal(facade.getComposerSelectedAssemblyIdState(), "assembly_a");
  assert.equal(facade.getComposerSelectedPointIndexState(), 2);
  assert.equal(facade.getComposerTransferListRawStateValue(), "a->b");
  assert.equal(editorStore.getPathState().closed, true);
});
