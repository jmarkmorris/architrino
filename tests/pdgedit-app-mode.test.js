import test from "node:test";
import assert from "node:assert/strict";

import {
  PDGEDIT_APP_MODE,
  getPdgeditAppMode,
  isStandalonePdgeditAppMode,
} from "../src/apps/pdgedit/PdgeditAppModeRuntime.js";

test("pdgedit app mode resolves from the standalone window flag", () => {
  assert.equal(
    getPdgeditAppMode({ __ARCHITRINO_APP_MODE__: "pdgedit" }),
    PDGEDIT_APP_MODE
  );
  assert.equal(isStandalonePdgeditAppMode("pdgedit"), true);
  assert.equal(isStandalonePdgeditAppMode("animator"), false);
});
