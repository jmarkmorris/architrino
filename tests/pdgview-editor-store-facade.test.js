import test from "node:test";
import assert from "node:assert/strict";

import { createPdgviewEditorStore } from "../src/runtime/PdgviewStoreRuntime.js";
import { createPdgviewEditorStoreFacade } from "../src/apps/animator/PdgviewEditorStoreFacadeRuntime.js";

test("pdgview editor store facade exposes the pdgview-specific store operations", () => {
  const editorStore = createPdgviewEditorStore({
    pathState: {
      points: [],
      interpolate: "spline",
      closed: false,
      ownerAssemblyId: null,
    },
  });
  const facade = createPdgviewEditorStoreFacade(editorStore);

  facade.setPdgviewAssemblyDraftsState([{ id: "assembly_a" }]);
  facade.setPdgviewSelectedAssemblyIdState("assembly_a");
  facade.setPdgviewSelectedPointIndexState(2);
  facade.setPdgviewTransferListRawStateValue("a->b");
  facade.mutatePdgviewPathStateState((pathState) => {
    pathState.closed = true;
  });

  assert.deepEqual(facade.getPdgviewAssemblyDraftsState(), [{ id: "assembly_a" }]);
  assert.equal(facade.getPdgviewSelectedAssemblyIdState(), "assembly_a");
  assert.equal(facade.getPdgviewSelectedPointIndexState(), 2);
  assert.equal(facade.getPdgviewTransferListRawStateValue(), "a->b");
  assert.equal(editorStore.getPathState().closed, true);
});
