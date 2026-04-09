import test from "node:test";
import assert from "node:assert/strict";

import {
  PDGEDIT_APP_MODE,
  STANDALONE_PDGEDIT_NAVIGATOR_HREF,
  getPdgeditAppMode,
  isStandalonePdgeditAppMode,
  navigateStandalonePdgeditHome,
} from "../src/apps/pdgedit/PdgeditAppModeRuntime.js";

test("pdgedit app mode resolves from the standalone window flag", () => {
  assert.equal(
    getPdgeditAppMode({ __ARCHITRINO_APP_MODE__: "pdgedit" }),
    PDGEDIT_APP_MODE
  );
  assert.equal(isStandalonePdgeditAppMode("pdgedit"), true);
  assert.equal(isStandalonePdgeditAppMode("pdgview"), false);
});

test("pdgedit standalone home navigation uses the standalone navigator href", () => {
  let assignedHref = "";
  const locationLike = {
    assign(value) {
      assignedHref = value;
    },
  };

  const navigated = navigateStandalonePdgeditHome(locationLike);

  assert.equal(navigated, true);
  assert.equal(assignedHref, STANDALONE_PDGEDIT_NAVIGATOR_HREF);
});

