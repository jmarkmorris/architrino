import test from "node:test";
import assert from "node:assert/strict";

import {
  PDGSOLVE_APP_MODE,
  STANDALONE_PDGSOLVE_NAVIGATOR_HREF,
  getPdgsolveAppMode,
  isStandalonePdgsolveAppMode,
  navigateStandalonePdgsolveHome,
} from "../src/apps/pdgsolve/PdgsolveAppModeRuntime.js";

test("pdgsolve app mode resolves from the standalone window flag", () => {
  assert.equal(
    getPdgsolveAppMode({ __ARCHITRINO_APP_MODE__: "pdgsolve" }),
    PDGSOLVE_APP_MODE
  );
  assert.equal(isStandalonePdgsolveAppMode("pdgsolve"), true);
  assert.equal(isStandalonePdgsolveAppMode("pdgedit"), false);
});

test("pdgsolve standalone home navigation uses the standalone navigator href", () => {
  let assignedHref = "";
  const locationLike = {
    assign(value) {
      assignedHref = value;
    },
  };

  const navigated = navigateStandalonePdgsolveHome(locationLike);

  assert.equal(navigated, true);
  assert.equal(assignedHref, STANDALONE_PDGSOLVE_NAVIGATOR_HREF);
});
