import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { normalizePdgeditTemplateCatalog } from "../src/apps/pdgedit/PdgeditTemplateCatalogRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("pdgedit template catalog derives one explicit assembly template per v1 assembly type", () => {
  const templateCatalog = normalizePdgeditTemplateCatalog(
    readJson("content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json")
  );

  assert.equal(templateCatalog.assemblyTemplates.length, 47);
  assert.equal(templateCatalog.operatorTemplates.length, 3);
  assert.deepEqual(
    templateCatalog.assemblyTemplateByType.get("unbound-architrinos-assembly"),
    {
      id: "unbound-architrinos-assembly",
      type: "unbound-architrinos-assembly",
      title: "Unbound Architrinos",
      displayTitle: "Unbound Architrinos",
      tiles: ["unbound", "unbound-electrinos", "unbound-positrinos", "architrinos"],
    }
  );
  assert.deepEqual(
    templateCatalog.assemblyTemplateByType.get("pro-up-quark-assembly")?.tiles,
    ["pro-up-quark", "binary-full-br-rr", "binary-full-br-br", "binary-full-br-rr"]
  );
  assert.equal(
    templateCatalog.assemblyTemplateByType.get("neutral-b-meson-b-assembly")?.displayTitle,
    "Neutral B Meson (b anti-d)"
  );
});

