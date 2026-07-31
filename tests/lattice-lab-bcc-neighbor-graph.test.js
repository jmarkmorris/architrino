import assert from "node:assert/strict";
import test from "node:test";

import {
  createLatticeLabCaseGallery,
  createRepeatCellNearestNeighborNetwork,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  createRepeatCellDisplayGraph,
} from "../src/apps/lattice-lab/LatticeLabRuntime.js";

const EPSILON = 1e-7;
const BCC_CASE_ID = "bcc-two-sublattice-v1";

function positionKey(position) {
  return position.map((value) => Number(value.toFixed(9))).join(",");
}

function edgeKey(start, end) {
  return [positionKey(start), positionKey(end)].sort().join("|");
}

function distance(start, end) {
  return Math.hypot(...end.map((value, index) => value - start[index]));
}

function createBccAudit() {
  const caseRecord = createLatticeLabCaseGallery().find(
    ({ id }) => id === BCC_CASE_ID,
  );
  assert.ok(caseRecord);
  return {
    caseRecord,
    network: createRepeatCellNearestNeighborNetwork(caseRecord),
  };
}

test("BCC owned sites each enumerate the exact eight opposite-polarity nearest incidences", () => {
  const { caseRecord, network } = createBccAudit();
  const expectedRelationshipIdentities = [
    ...[-1, 0].flatMap((ix) =>
      [-1, 0].flatMap((iy) =>
        [-1, 0].map((iz) => `repeat-0>repeat-1@${ix},${iy},${iz}`)
      )
    ),
    ...[0, 1].flatMap((ix) =>
      [0, 1].flatMap((iy) =>
        [0, 1].map((iz) => `repeat-1>repeat-0@${ix},${iy},${iz}`)
      )
    ),
  ];
  const actualRelationshipIdentities = network.relationships.map(
    ({ fromSiteId, toSiteId, translation }) =>
      `${fromSiteId}>${toSiteId}@${translation.join(",")}`,
  );

  assert.deepEqual(
    actualRelationshipIdentities,
    expectedRelationshipIdentities,
  );
  assert.equal(network.relationships.length, 16);
  caseRecord.repeatCell.sites.forEach((ownedSite) => {
    assert.equal(
      network.relationships.filter(
        ({ fromSiteId }) => fromSiteId === ownedSite.id,
      ).length,
      8,
    );
  });
  network.relationships.forEach((relationship) => {
    assert.ok(
      Math.abs(distance(
        relationship.fromPosition,
        relationship.toPosition,
      ) - 1) < EPSILON,
    );
    assert.notEqual(
      caseRecord.repeatCell.sites.find(
        ({ id }) => id === relationship.fromSiteId,
      ).polarity,
      relationship.toPolarity,
    );
  });
});

test("BCC full context graph enumerates every displayed-site pair at d", () => {
  const { caseRecord, network } = createBccAudit();
  const independentlyEnumerated = [];
  network.displaySites.forEach((site, siteIndex) => {
    network.displaySites.slice(siteIndex + 1).forEach((neighbor) => {
      if (Math.abs(distance(site.position, neighbor.position) - 1) < EPSILON) {
        independentlyEnumerated.push(edgeKey(site.position, neighbor.position));
      }
    });
  });
  independentlyEnumerated.sort();

  const canonical = network.edges.map(({ id }) => id).sort();

  assert.equal(canonical.length, 27);
  assert.deepEqual(canonical, independentlyEnumerated);
  assert.equal(
    caseRecord.repeatCell.contextPresentation,
    "continuation-markers",
  );
});

test("BCC top and bottom square perimeters are longer same-sublattice next-shell pairs", () => {
  const { network } = createBccAudit();
  const cornerCoordinate = 1 / Math.sqrt(3);
  const nextShellDistance = 2 / Math.sqrt(3);
  const redCornersAroundOwnedBlue = network.displaySites.filter(
    ({ position, polarity }) =>
      polarity === "positrino" &&
      position.every(
        (value) => Math.abs(Math.abs(value) - cornerCoordinate) < EPSILON,
      ),
  );
  assert.equal(redCornersAroundOwnedBlue.length, 8);

  const squarePerimeters = new Map([
    ["top", []],
    ["bottom", []],
  ]);
  redCornersAroundOwnedBlue.forEach((site, siteIndex) => {
    redCornersAroundOwnedBlue
      .slice(siteIndex + 1)
      .forEach((neighbor) => {
        if (
          Math.abs(site.position[2] - neighbor.position[2]) < EPSILON &&
          Math.abs(distance(site.position, neighbor.position) -
            nextShellDistance) < EPSILON
        ) {
          const layer = site.position[2] > 0 ? "top" : "bottom";
          squarePerimeters.get(layer).push(
            edgeKey(site.position, neighbor.position),
          );
        }
      });
  });

  assert.equal(squarePerimeters.get("top").length, 4);
  assert.equal(squarePerimeters.get("bottom").length, 4);
  const nearestEdgeIdentities = new Set(network.edges.map(({ id }) => id));
  [...squarePerimeters.values()].flat().forEach((identity) => {
    assert.equal(nearestEdgeIdentities.has(identity), false);
  });
});

test("BCC default tile has no visible context sites at lambda 1 or extreme compression", () => {
  const { caseRecord, network } = createBccAudit();
  const expectedOwnedIncidentIdentities = network.edges
    .filter((edge) => !edge.startContinuation || !edge.endContinuation)
    .map(({ id }) => id)
    .sort();
  assert.equal(expectedOwnedIncidentIdentities.length, 15);

  for (const compressionFactor of [1, 0.01]) {
    const displayGraph = createRepeatCellDisplayGraph(caseRecord, {
      compressionAxis: "x",
      compressionFactor,
    });
    assert.deepEqual(
      [...displayGraph.edgeIdentities].sort(),
      expectedOwnedIncidentIdentities,
      `lambda=${compressionFactor}`,
    );
    assert.equal(displayGraph.edgeIdentities.length, 15);
    assert.equal(displayGraph.excludedEdges.length, 0);
    assert.equal(
      displayGraph.edges.every(
        ({ edge }) => !edge.startContinuation || !edge.endContinuation,
      ),
      true,
    );
    const expectedDistance = Math.sqrt(
      (compressionFactor ** 2 + 2) / 3,
    );
    assert.ok(
      Math.abs(displayGraph.nearestDistance - expectedDistance) < 1e-12,
    );
  }

  const continuationEndpoints = new Set();
  createRepeatCellDisplayGraph(caseRecord).edges.forEach(({ edge }) => {
    if (edge.startContinuation) {
      continuationEndpoints.add(positionKey(edge.start));
    }
    if (edge.endContinuation) {
      continuationEndpoints.add(positionKey(edge.end));
    }
  });
  assert.equal(continuationEndpoints.size, 14);
});

test("main highlight clipping uses the ordinary edge-length guard before drawing", async () => {
  const runtimeSource = new URL(
    "../src/apps/lattice-lab/LatticeLabRuntime.js",
    import.meta.url,
  );
  const source = await import("node:fs/promises").then(({ readFile }) =>
    readFile(runtimeSource, "utf8")
  );
  assert.match(
    source,
    /if \(distance <= 2 \* markerWorldRadius\) \{[\s\S]*highlight\.userData\.segmentFits = false;[\s\S]*highlight\.visible = false;/u,
  );
  assert.match(
    source,
    /clippedHighlightEdgeIdentities\.push\([\s\S]*highlight\.userData\.edgeIdentity/u,
  );
  assert.match(
    source,
    /visibleContextSiteCount[\s\S]*continuationMarkerCount/u,
  );
});
