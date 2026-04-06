import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function isTypeMatch(value, expectedType) {
  if (expectedType === "array") {
    return Array.isArray(value);
  }
  if (expectedType === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  if (expectedType === "integer") {
    return Number.isInteger(value);
  }
  if (expectedType === "number") {
    return typeof value === "number" && Number.isFinite(value);
  }
  return typeof value === expectedType;
}

function validateAgainstSchema(value, schema, path = "$", errors = []) {
  if (!schema || typeof schema !== "object") {
    return errors;
  }

  if (Object.prototype.hasOwnProperty.call(schema, "const") && value !== schema.const) {
    errors.push(`${path}: expected constant ${JSON.stringify(schema.const)}`);
    return errors;
  }

  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push(`${path}: expected one of ${schema.enum.map((item) => JSON.stringify(item)).join(", ")}`);
  }

  if (schema.type) {
    const allowedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matchesType = allowedTypes.some((candidateType) => isTypeMatch(value, candidateType));
    if (!matchesType) {
      errors.push(`${path}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }

  if (typeof schema.minLength === "number" && typeof value === "string" && value.length < schema.minLength) {
    errors.push(`${path}: expected string length >= ${schema.minLength}`);
  }

  if (typeof schema.minimum === "number" && typeof value === "number" && value < schema.minimum) {
    errors.push(`${path}: expected number >= ${schema.minimum}`);
  }

  if (schema.type === "object" || (Array.isArray(schema.type) && schema.type.includes("object"))) {
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${path}: missing required property ${key}`);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(properties, key)) {
          errors.push(`${path}: unexpected property ${key}`);
        }
      }
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      validateAgainstSchema(value[key], childSchema, `${path}.${key}`, errors);
    }
  }

  if (schema.type === "array" || (Array.isArray(schema.type) && schema.type.includes("array"))) {
    const itemSchema = schema.items;
    if (itemSchema) {
      value.forEach((item, index) => {
        validateAgainstSchema(item, itemSchema, `${path}[${index}]`, errors);
      });
    }
  }

  return errors;
}

test("reaction flow exporter builds a schema-valid manual-authoring document", () => {
  const schema = readJson("src/contracts/reaction-flow/v1/schema.json");
  const reactionFlow = buildReactionFlowDocument({
    reactionId: "manual_beta_decay",
    title: "Manual Beta Decay",
    sourceDocumentIds: ["reaction_manual_beta_decay"],
    suggestedSceneId: "manual_beta_decay_scene",
    snapshot: {
      participants: [
        {
          id: "reactant_electron",
          side: "reactant",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
        {
          id: "center_electron",
          side: "reactant",
          surfaceColumn: "center-assembly",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
        {
          id: "product_electron",
          side: "product",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
        {
          id: "op_pass_left",
          side: "operator",
          templateId: "pass_thru",
          label: "Pass Thru",
          operatorLaneIndex: 0,
          operatorSlotIndex: 0,
          surfaceRowIndex: 0,
        },
        {
          id: "op_pass_right",
          side: "operator",
          templateId: "pass_thru",
          label: "Pass Thru",
          operatorLaneIndex: 1,
          operatorSlotIndex: 0,
          surfaceRowIndex: 0,
        },
      ],
      mappings: [
        {
          id: "map_reactant_to_left",
          sourceKey: "reactant_electron::electron_root",
          targetKey: "op_pass_left::pass_thru_root",
          sourceRole: "reactant",
          targetRole: "operator-input",
          targetAnchorInstanceIndex: 0,
        },
        {
          id: "map_left_to_center",
          sourceKey: "op_pass_left::pass_thru_root",
          targetKey: "center_electron::electron_root",
          sourceRole: "operator-output",
          targetRole: "center",
          sourceAnchorInstanceIndex: 0,
          targetAnchorInstanceIndex: 0,
        },
        {
          id: "map_center_to_right",
          sourceKey: "center_electron::electron_root",
          targetKey: "op_pass_right::pass_thru_root",
          sourceRole: "center",
          targetRole: "operator-input",
          sourceAnchorInstanceIndex: 1,
          targetAnchorInstanceIndex: 0,
        },
        {
          id: "map_right_to_product",
          sourceKey: "op_pass_right::pass_thru_root",
          targetKey: "product_electron::electron_root",
          sourceRole: "operator-output",
          targetRole: "product",
          sourceAnchorInstanceIndex: 0,
        },
      ],
    },
  });

  const errors = validateAgainstSchema(reactionFlow, schema);

  assert.deepEqual(errors, []);
  assert.equal(reactionFlow.schema, "reaction-flow/v1");
  assert.deepEqual(reactionFlow.review, { status: "draft" });
  assert.equal(reactionFlow.operators.length, 2);
  assert.deepEqual(reactionFlow.operators[0].inputs, [
    { participantId: "reactant_electron", anchorId: "electron_root", role: "reactant" },
  ]);
  assert.deepEqual(reactionFlow.operators[0].outputs, [
    {
      participantId: "center_electron",
      anchorId: "electron_root",
      role: "center",
      anchorInstanceIndex: 0,
    },
  ]);
  assert.deepEqual(reactionFlow.operators[0].layout, {
    lane: 2,
    row: 0,
    slot: 0,
  });
  assert.equal(reactionFlow.participants[1].side, "intermediate");
  assert.equal(reactionFlow.participants[1].layout.column, "center");
  assert.equal(reactionFlow.participants[1].layout.lane, 3);
  assert.deepEqual(reactionFlow.mappings[0].from, {
    participantId: "reactant_electron",
    anchorId: "electron_root",
    role: "reactant",
  });
  assert.deepEqual(reactionFlow.mappings[0].to, {
    participantId: "op_pass_left",
    anchorId: "pass_thru_root",
    role: "operator-input",
    anchorInstanceIndex: 0,
  });
  assert.equal(reactionFlow.mappings[0].viaOperatorId, "op_pass_left");
  assert.equal(reactionFlow.mappings[3].viaOperatorId, "op_pass_right");
});

test("reaction flow exporter can mark an accepted handoff review state", () => {
  const document = buildReactionFlowDocument({
    reactionId: "manual_beta_decay",
    review: {
      status: "accepted",
      acceptedAt: "2026-04-03T09:00:00.000Z",
    },
    snapshot: {
      participants: [
        {
          id: "reactant_electron",
          side: "reactant",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
        {
          id: "center_electron",
          side: "reactant",
          surfaceColumn: "center-assembly",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
        {
          id: "op_pass_left",
          side: "operator",
          templateId: "pass_thru",
          label: "Pass Thru",
          operatorLaneIndex: 0,
          operatorSlotIndex: 0,
          surfaceRowIndex: 0,
        },
        {
          id: "op_pass_right",
          side: "operator",
          templateId: "pass_thru",
          label: "Pass Thru",
          operatorLaneIndex: 1,
          operatorSlotIndex: 0,
          surfaceRowIndex: 0,
        },
        {
          id: "product_electron",
          side: "product",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
      ],
      mappings: [
        {
          id: "map_left",
          sourceKey: "reactant_electron::electron_root",
          targetKey: "op_pass_left::pass_thru_root",
          sourceRole: "reactant",
          targetRole: "operator-input",
          targetAnchorInstanceIndex: 0,
        },
        {
          id: "map_center_in",
          sourceKey: "op_pass_left::pass_thru_root",
          targetKey: "center_electron::electron_root",
          sourceRole: "operator-output",
          targetRole: "center",
          sourceAnchorInstanceIndex: 0,
          targetAnchorInstanceIndex: 0,
        },
        {
          id: "map_center_out",
          sourceKey: "center_electron::electron_root",
          targetKey: "op_pass_right::pass_thru_root",
          sourceRole: "center",
          targetRole: "operator-input",
          sourceAnchorInstanceIndex: 1,
          targetAnchorInstanceIndex: 0,
        },
        {
          id: "map_right",
          sourceKey: "op_pass_right::pass_thru_root",
          targetKey: "product_electron::electron_root",
          sourceRole: "operator-output",
          targetRole: "product",
          sourceAnchorInstanceIndex: 0,
        },
      ],
    },
  });

  assert.deepEqual(document.review, {
    status: "accepted",
    acceptedAt: "2026-04-03T09:00:00.000Z",
  });
});

test("reaction flow exporter rejects snapshots with open required connectors", () => {
  assert.throws(
    () =>
      buildReactionFlowDocument({
        reactionId: "open_connector_export",
        snapshot: {
          participants: [
            {
              id: "reactant_electron",
              side: "reactant",
              templateId: "electron",
              label: "Pro Electron",
              surfaceRowIndex: 0,
            },
            {
              id: "product_electron",
              side: "product",
              templateId: "electron",
              label: "Pro Electron",
              surfaceRowIndex: 0,
            },
          ],
          mappings: [],
        },
      }),
    /all visible required connectors to be connected/i
  );
});

test("reaction flow exporter can serialize incomplete snapshots when explicitly allowed", () => {
  const document = buildReactionFlowDocument({
    reactionId: "open_connector_export",
    allowIncompleteSnapshot: true,
    snapshot: {
      participants: [
        {
          id: "reactant_electron",
          side: "reactant",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
        {
          id: "product_electron",
          side: "product",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
      ],
      mappings: [],
    },
  });

  assert.equal(document.schema, "reaction-flow/v1");
  assert.deepEqual(document.review, { status: "draft" });
  assert.equal(document.participants.length, 2);
  assert.equal(document.mappings.length, 0);
});

test("reaction flow exporter rejects unsupported sink-side-only connector mappings", () => {
  assert.throws(
    () =>
      buildReactionFlowDocument({
        reactionId: "invalid_sink_mapping",
        snapshot: {
          participants: [
            {
              id: "reactant_muon",
              side: "reactant",
              templateId: "electron",
              label: "Pro Muon",
              surfaceRowIndex: 0,
            },
            {
              id: "reactant_noether_pair",
              side: "reactant",
              templateId: "noether_pair",
              label: "Noether Pair",
              surfaceRowIndex: 1,
            },
          ],
          mappings: [
            {
              id: "map_invalid_sink_target",
              sourceKey: "reactant_muon::electron_root",
              targetKey: "reactant_noether_pair::noether_pair_root",
              sourceRole: "reactant",
              targetRole: "reactant",
            },
          ],
        },
      }),
    /adjacent lane progress|skips lanes|cannot use input endpoint/i
  );
});
