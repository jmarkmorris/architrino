import test from "node:test";
import assert from "node:assert/strict";

import { buildComposerReactionSolveState } from "../src/runtime/ComposerReactionSolveStateRuntime.js";

test("solve state separates reactants, products, operators, and center assemblies without treating center bosons as unsupported", () => {
  const participants = [
    { id: "reactant_1", side: "reactant", hierarchy: [{ id: "r_root" }] },
    { id: "product_1", side: "product", hierarchy: [{ id: "p_root" }] },
    { id: "operator_1", side: "operator", hierarchy: [{ id: "o_root" }] },
    {
      id: "center_1",
      side: "reactant",
      surfaceColumn: "center-assembly",
      hierarchy: [{ id: "c_root" }],
    },
  ];

  const solveState = buildComposerReactionSolveState({
    participants,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    isCenterAssemblyParticipant: (participant) => participant?.surfaceColumn === "center-assembly",
    isOperatorParticipant: (participant) => participant?.side === "operator",
  });

  assert.equal(solveState.reactants.length, 1);
  assert.equal(solveState.products.length, 1);
  assert.equal(solveState.operators.length, 1);
  assert.equal(solveState.centerAssemblies.length, 1);
  assert.equal(solveState.reactants[0].rootNodeKey, "reactant_1:r_root");
  assert.equal(solveState.products[0].rootNodeKey, "product_1:p_root");
  assert.equal(solveState.hasUnsupportedParticipants, false);
  assert.equal(solveState.hasReactants, true);
  assert.equal(solveState.centerAssemblies[0]?.isCenterAssembly, true);
});

test("solve state allows existing operators when no center bosons are present", () => {
  const participants = [
    { id: "reactant_1", side: "reactant", hierarchy: [{ id: "r_root" }] },
    { id: "product_1", side: "product", hierarchy: [{ id: "p_root" }] },
    { id: "operator_1", side: "operator", hierarchy: [{ id: "o_root" }] },
  ];

  const solveState = buildComposerReactionSolveState({
    participants,
    buildNodeKey: (participantId, nodeId) => `${participantId}:${nodeId}`,
    isCenterAssemblyParticipant: (participant) => participant?.surfaceColumn === "center-assembly",
    isOperatorParticipant: (participant) => participant?.side === "operator",
  });

  assert.equal(solveState.reactants.length, 1);
  assert.equal(solveState.products.length, 1);
  assert.equal(solveState.operators.length, 1);
  assert.equal(solveState.centerAssemblies.length, 0);
  assert.equal(solveState.hasUnsupportedParticipants, false);
});
