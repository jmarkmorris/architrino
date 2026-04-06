import test from "node:test";
import assert from "node:assert/strict";

import { evaluateReactionConnectionPolicy } from "../src/apps/reaction/ReactionConnectionPolicyRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";

function createParticipant(templateId, options = {}) {
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${options.id ?? templateId}_structure`,
    label: options.label ?? templateId,
    polarity: options.polarity ?? "",
  });
  return {
    id: options.id ?? templateId,
    side: options.side ?? "reactant",
    templateId,
    label: options.label ?? templateId,
    polarity: options.polarity ?? "",
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    structure: structure.root,
    surfaceRowIndex: options.surfaceRowIndex ?? 0,
    ...(options.extraFields ?? {}),
  };
}

test("lane-1 single-row reactant roots cannot map directly to lane-5 products", () => {
  const reactantElectron = createParticipant("electron", {
    id: "reactant_electron",
    side: "reactant",
    polarity: "pro",
    label: "Pro Electron",
  });
  const productElectron = createParticipant("electron", {
    id: "product_electron",
    side: "product",
    polarity: "pro",
    label: "Pro Electron",
  });

  const evaluation = evaluateReactionConnectionPolicy({
    sourceParticipant: reactantElectron,
    sourceNodeId: reactantElectron.hierarchy[0]?.id,
    sourceRole: "reactant",
    targetParticipant: productElectron,
    targetNodeId: productElectron.hierarchy[0]?.id,
    targetRole: "product",
  });

  assert.equal(evaluation.allowed, false);
  assert.match(evaluation.reason, /exactly one lane at a time/i);
});

test("lane-1 single-row reactant roots can map into a lane-2 operator input", () => {
  const reactantElectron = createParticipant("electron", {
    id: "reactant_electron",
    side: "reactant",
    polarity: "pro",
    label: "Pro Electron",
  });
  const dissociateOperator = {
    id: "dissociate_1",
    side: "operator",
    templateId: "dissociate",
    label: "Dissociate",
    operatorLaneIndex: 0,
    hierarchy: [{ id: "dissociate_root", label: "Dissociate", renderMode: "operator-tile" }],
  };

  const evaluation = evaluateReactionConnectionPolicy({
    sourceParticipant: reactantElectron,
    sourceNodeId: reactantElectron.hierarchy[0]?.id,
    sourceRole: "reactant",
    targetParticipant: dissociateOperator,
    targetNodeId: "dissociate_root",
    targetRole: "operator-input",
  });

  assert.equal(evaluation.allowed, true);
});

test("lane-1 composite child mappings cannot bypass intermediate lanes", () => {
  const reactantNeutron = createParticipant("neutron", {
    id: "reactant_neutron",
    side: "reactant",
    label: "Neutron",
  });
  const productDownQuark = createParticipant("down_quark", {
    id: "product_down_quark",
    side: "product",
    polarity: "pro",
    label: "Pro Down Quark",
  });
  const neutronDownQuarkNodeId = String(
    reactantNeutron.hierarchy[0]?.children?.find((childNode) => childNode?.templateId === "down_quark")?.id ?? ""
  ).trim();

  assert.ok(neutronDownQuarkNodeId);

  const evaluation = evaluateReactionConnectionPolicy({
    sourceParticipant: reactantNeutron,
    sourceNodeId: neutronDownQuarkNodeId,
    sourceRole: "reactant",
    targetParticipant: productDownQuark,
    targetNodeId: productDownQuark.hierarchy[0]?.id,
    targetRole: "product",
  });

  assert.equal(evaluation.allowed, false);
  assert.match(evaluation.reason, /exactly one lane at a time/i);
});

test("lane-3 center outputs can route only from the right-side terminal into lane-4 operator inputs", () => {
  const centerAssembly = createParticipant("noether_core", {
    id: "center_core",
    side: "reactant",
    extraFields: {
      surfaceColumn: "center-assembly",
    },
  });
  const dissociateOperator = {
    id: "dissociate_2",
    side: "operator",
    templateId: "dissociate",
    label: "Dissociate",
    operatorLaneIndex: 1,
    hierarchy: [{ id: "dissociate_root", label: "Dissociate", renderMode: "operator-tile" }],
  };

  const evaluation = evaluateReactionConnectionPolicy({
    sourceParticipant: centerAssembly,
    sourceNodeId: centerAssembly.hierarchy[0]?.id,
    sourceRole: "center",
    sourceAnchorInstanceIndex: 1,
    targetParticipant: dissociateOperator,
    targetNodeId: "dissociate_root",
    targetRole: "operator-input",
    targetAnchorInstanceIndex: 0,
  });

  assert.equal(evaluation.allowed, true);
});

test("lane-3 center inputs cannot act as source terminals", () => {
  const centerAssembly = createParticipant("noether_core", {
    id: "center_core",
    side: "reactant",
    extraFields: {
      surfaceColumn: "center-assembly",
    },
  });
  const dissociateOperator = {
    id: "dissociate_2",
    side: "operator",
    templateId: "dissociate",
    label: "Dissociate",
    operatorLaneIndex: 1,
    hierarchy: [{ id: "dissociate_root", label: "Dissociate", renderMode: "operator-tile" }],
  };

  const evaluation = evaluateReactionConnectionPolicy({
    sourceParticipant: centerAssembly,
    sourceNodeId: centerAssembly.hierarchy[0]?.id,
    sourceRole: "center",
    sourceAnchorInstanceIndex: 0,
    targetParticipant: dissociateOperator,
    targetNodeId: "dissociate_root",
    targetRole: "operator-input",
    targetAnchorInstanceIndex: 0,
  });

  assert.equal(evaluation.allowed, false);
  assert.match(evaluation.reason, /right-side connector/i);
});
