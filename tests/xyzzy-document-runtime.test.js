import test from "node:test";
import assert from "node:assert/strict";

import {
  buildXyzzyDocumentValidation,
  buildXyzzyLinkEndpointPairKey,
  createDefaultXyzzyDocument,
  getXyzzyRoutingColumnBetweenObjects,
} from "../src/apps/xyzzy/XyzzyDocumentRuntime.js";

test("default xyzzy document satisfies the fixed strip rules", () => {
  const validation = buildXyzzyDocumentValidation(createDefaultXyzzyDocument());

  assert.equal(validation.valid, true);
  assert.deepEqual(validation.diagnostics, []);
});

test("xyzzy validation rejects occupied-tile overlap rather than origin-only checks", () => {
  const documentValue = createDefaultXyzzyDocument();
  documentValue.assemblies[2].y = 3;

  const validation = buildXyzzyDocumentValidation(documentValue);

  assert.equal(validation.valid, false);
  assert.ok(
    validation.diagnostics.some((diagnostic) => diagnostic.includes("occupied tile cell")),
    validation.diagnostics.join("\n")
  );
});

test("xyzzy validation rejects assembly role placement mismatches", () => {
  const documentValue = createDefaultXyzzyDocument();
  documentValue.assemblies[0].x = 9;

  const validation = buildXyzzyDocumentValidation(documentValue);

  assert.equal(validation.valid, false);
  assert.ok(
    validation.diagnostics.some((diagnostic) => diagnostic.includes("must remain inside columns 2-5")),
    validation.diagnostics.join("\n")
  );
});

test("xyzzy validation rejects non-neighbor links and duplicate endpoint pairs", () => {
  const documentValue = createDefaultXyzzyDocument();
  documentValue.links.push({
    id: "link_reactant_to_product",
    endpointA: "assembly_reactant_neutron",
    endpointB: "assembly_product_proton",
  });
  documentValue.links.push({
    id: "link_neutron_to_dissociate_duplicate",
    endpointA: "operator_dissociate",
    endpointB: "assembly_reactant_neutron",
  });

  const validation = buildXyzzyDocumentValidation(documentValue);

  assert.equal(validation.valid, false);
  assert.ok(
    validation.diagnostics.some((diagnostic) => diagnostic.includes("neighboring object bands")),
    validation.diagnostics.join("\n")
  );
  assert.ok(
    validation.diagnostics.some((diagnostic) => diagnostic.includes("duplicate undirected link")),
    validation.diagnostics.join("\n")
  );
});

test("xyzzy routing columns stay fixed by neighboring band pair", () => {
  const documentValue = createDefaultXyzzyDocument();
  const validation = buildXyzzyDocumentValidation(documentValue);
  const freeArchitrinos = validation.objectLookup.get("assembly_intermediate_free_architrinos");
  const associate = validation.objectLookup.get("operator_associate");

  assert.equal(getXyzzyRoutingColumnBetweenObjects(freeArchitrinos, associate), 13);
  assert.equal(
    buildXyzzyLinkEndpointPairKey("operator_associate", "assembly_intermediate_free_architrinos"),
    buildXyzzyLinkEndpointPairKey("assembly_intermediate_free_architrinos", "operator_associate")
  );
});
