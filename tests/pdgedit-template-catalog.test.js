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
  const deprecatedPhotonAssemblyType = ["photon", "assembly"].join("-");

  assert.equal(templateCatalog.assemblyTemplates.length, 35);
  assert.equal(templateCatalog.operatorTemplates.length, 3);
  assert.equal(templateCatalog.assemblyTemplateByType.has(deprecatedPhotonAssemblyType), false);
  assert.equal(templateCatalog.assemblyTemplateByType.has("photon-composite"), false);
  assert.equal(templateCatalog.assemblyTemplateByType.has("pro-proton-composite"), false);
  assert.equal(templateCatalog.assemblyTemplateByType.has("pro-noether-core-assembly"), true);
  assert.equal(templateCatalog.assemblyTemplateByType.has("anti-noether-core-assembly"), true);
  assert.equal(templateCatalog.assemblyTemplateByType.has("pro-bi-binary-assembly"), true);
  assert.equal(templateCatalog.assemblyTemplateByType.has("anti-bi-binary-assembly"), true);
  assert.equal(templateCatalog.assemblyTemplateByType.has("pro-uni-binary-assembly"), true);
  assert.equal(templateCatalog.assemblyTemplateByType.has("anti-uni-binary-assembly"), true);
  assert.equal(templateCatalog.assemblyTemplateByType.has("noether-sea-assembly"), true);
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
    templateCatalog.assemblyTemplateByType.get("unbound-architrino-residue-e4-p8-assembly"),
    {
      id: "unbound-architrino-residue-e4-p8-assembly",
      type: "unbound-architrino-residue-e4-p8-assembly",
      title: "Unbound Architrinos 4E/8P",
      displayTitle: "Unbound Architrinos 4E/8P",
      tiles: ["unbound", "residue-electrinos-4", "residue-positrinos-8", "architrinos"],
    }
  );
  assert.deepEqual(
    templateCatalog.assemblyTemplateByType.get("pro-up-quark-assembly")?.tiles,
    ["pro-up-quark", "binary-full-br-rr", "binary-full-br-br", "binary-full-br-rr"]
  );
  assert.equal(
    templateCatalog.assemblyTemplateByType.get("anti-bottom-quark-assembly")?.displayTitle,
    "Anti Bottom Quark"
  );
  assert.deepEqual(templateCatalog.assemblyTemplateByType.get("noether-sea-assembly"), {
    id: "noether-sea-assembly",
    type: "noether-sea-assembly",
    title: "Noether Sea",
    displayTitle: "Noether Sea",
    tiles: ["noether", "pro-noether-core-glyph", "anti-noether-core-glyph", "sea"],
  });
});
