import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  evaluateOrthogonalPlaneWeavePhase,
} from "../src/prescribed-path-analysis/OrthogonalPlaneWeaveBalance.mjs";


const RECEIPT = JSON.parse(await readFile(new URL(
  "../reference/priorities/braid-program/evidence/2026-08-29-orthogonal-plane-weave-fold-limiting-exclusion.v1.json",
  import.meta.url,
), "utf8"));

const OPTIONS = Object.freeze({
  rootTolerance: 1e-13,
  rootFloor: 1e-12,
  rootTransversalityFloor: 1e-10,
  maximumSubdivisionDepth: 45,
  initialCrossPairPartitions: 256,
});

function a1Plus(result) {
  return result.receivers.find((receiver) => receiver.receiverId === "a1+");
}

function projection(receiver, component) {
  return receiver.masterAccelerationProjections[component];
}

test("frozen six-worldline subject independently confirms both sides of every closed fold box", () => {
  for (const row of RECEIPT.foldBoxes) {
    const betaBelow = Number(row.betaBox[0]);
    const betaAbove = Number(row.betaBox[1]);
    const below = evaluateOrthogonalPlaneWeavePhase({
      beta: betaBelow,
      phase: 0,
      options: OPTIONS,
    });
    const above = evaluateOrthogonalPlaneWeavePhase({
      beta: betaAbove,
      phase: 0,
      options: OPTIONS,
    });
    assert.equal(below.rootComplete, true, `${row.kind}:${row.lobeIndex} below completeness`);
    assert.equal(above.rootComplete, true, `${row.kind}:${row.lobeIndex} above completeness`);
    assert.equal(below.regular, true, `${row.kind}:${row.lobeIndex} below regularity`);
    assert.equal(above.regular, true, `${row.kind}:${row.lobeIndex} above regularity`);

    const receiverBelow = a1Plus(below);
    const receiverAbove = a1Plus(above);
    const interval = row.otherRowsOverWholeBox.componentInterval;
    const belowProjection = projection(receiverBelow, row.relevantComponent);
    assert.ok(
      belowProjection >= Number(interval.lower) && belowProjection <= Number(interval.upper),
      `${row.kind}:${row.lobeIndex} below projection ${belowProjection} outside frozen-oracle interval`,
    );

    const aboveProjection = projection(receiverAbove, row.relevantComponent);
    const margin = Number(row.rootSideDominance.signedDominanceMargin);
    if (row.targetContributionSign === "positive") {
      assert.ok(aboveProjection >= margin, `${row.kind}:${row.lobeIndex} positive dominance`);
    } else {
      assert.ok(aboveProjection <= -margin, `${row.kind}:${row.lobeIndex} negative dominance`);
    }
    const expectedBirth = row.rootSideDominance.bornRootCount;
    assert.equal(
      receiverAbove.rootCount - receiverBelow.rootCount,
      expectedBirth,
      `${row.kind}:${row.lobeIndex} root birth count`,
    );
  }
});

test("beta_f=1 canonical self-root exclusion leaves a nonzero tangent residual", () => {
  const exact = evaluateOrthogonalPlaneWeavePhase({ beta: 1, phase: 0, options: OPTIONS });
  assert.equal(exact.rootComplete, true);
  assert.equal(exact.regular, true);
  const receiver = a1Plus(exact);
  assert.equal(receiver.rootCount, 5);
  const boundary = RECEIPT.foldBoxes.find(
    (row) => row.kind === "self" && row.lobeIndex === 0,
  );
  const interval = boundary.exactFold.remainingComponent;
  const tangent = receiver.masterAccelerationProjections.tangent;
  assert.ok(tangent >= Number(interval.lower) && tangent <= Number(interval.upper));
  assert.ok(tangent > 0);
});
