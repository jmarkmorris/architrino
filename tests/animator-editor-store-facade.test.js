import test from "node:test";
import assert from "node:assert/strict";

import { createAnimatorEditorStore } from "../src/runtime/AnimatorStoreRuntime.js";
import { createAnimatorEditorStoreFacade } from "../src/apps/animator/AnimatorEditorStoreFacadeRuntime.js";

test("animator editor store facade exposes the animator-specific store operations", () => {
  const editorStore = createAnimatorEditorStore({
    pathState: {
      points: [],
      interpolate: "spline",
      closed: false,
      ownerAssemblyId: null,
    },
  });
  const facade = createAnimatorEditorStoreFacade(editorStore);

  facade.setAnimatorAssemblyDraftsState([{ id: "assembly_a" }]);
  facade.setAnimatorSelectedAssemblyIdState("assembly_a");
  facade.setAnimatorSelectedPointIndexState(2);
  facade.setAnimatorTransferListRawStateValue("a->b");
  facade.mutateAnimatorPathStateState((pathState) => {
    pathState.closed = true;
  });

  assert.deepEqual(facade.getAnimatorAssemblyDraftsState(), [{ id: "assembly_a" }]);
  assert.equal(facade.getAnimatorSelectedAssemblyIdState(), "assembly_a");
  assert.equal(facade.getAnimatorSelectedPointIndexState(), 2);
  assert.equal(facade.getAnimatorTransferListRawStateValue(), "a->b");
  assert.equal(editorStore.getPathState().closed, true);
});
