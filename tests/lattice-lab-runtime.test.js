import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  LATTICE_LAB_DEFAULT_SITE_ID,
  LATTICE_LAB_CASE_IDS,
  LATTICE_LAB_DISPLAY_RADIUS,
  countLatticePolarities,
  createClippedNeighborSegment,
  createLatticeLabCaseGallery,
  createRepeatCellNearestNeighborNetwork,
  createReferencePolarityState,
  createSelectedSiteLedger,
  createSimpleCubicCheckerboardCase,
  createSimpleCubicPolarityRepeatCellSites,
  isReferenceLatticeConfiguration,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  SIMPLE_CUBIC_STATIONARY_CONTRACT,
  createStationarySimpleCubicAccelerationRow,
  createStationarySimpleCubicExhaustionLedger,
} from "../src/apps/lattice-lab/SimpleCubicStationaryLedger.js";
import {
  LATTICE_LAB_UI_FEATURES,
  createNearestNeighborEdges,
  selectShortestTransformedRelationships,
} from "../src/apps/lattice-lab/LatticeLabRuntime.js";
import { createPanelCollapseIconSvg } from "../src/runtime/PanelCollapseIcons.js";
import {
  verifySimpleCubicStationaryLedger,
} from "../scripts/verify-lattice-lab-simple-cubic-checkerboard.mjs";
import {
  getStandaloneAppPathForScene,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("simple-cubic checkerboard fills the spherical crop with an exactly neutral population", () => {
  const caseRecord = createSimpleCubicCheckerboardCase();
  const polarities = createReferencePolarityState(caseRecord);

  assert.equal(caseRecord.sites.length, 136);
  assert.deepEqual(countLatticePolarities(polarities), {
    electrino: 68,
    positrino: 68,
  });
  assert.equal(
    caseRecord.sites.every(
      (site) => Math.hypot(...site.position) <= LATTICE_LAB_DISPLAY_RADIUS,
    ),
    true,
  );
  assert.equal(isReferenceLatticeConfiguration(caseRecord, polarities), true);
  assert.equal(
    caseRecord.evidenceStatus,
    "derived stationary-release cancellation under the declared exhaustion",
  );
  assert.match(caseRecord.boundaryTreatment, /finite spherical display crop/u);
  assert.match(caseRecord.boundaryTreatment, /continuation is not shown/u);
  assert.match(
    caseRecord.calculationBoundaryTreatment,
    /receiver-centered inversion-symmetric exhaustion/u,
  );
});

test("stationary checkerboard contract instantiates canonical partner rows", () => {
  const nearest = createStationarySimpleCubicAccelerationRow({
    receiverGrid: [3, 3, 3],
    transmitterGrid: [3, 3, 4],
  });
  const nextLocal = createStationarySimpleCubicAccelerationRow({
    receiverGrid: [3, 3, 3],
    transmitterGrid: [4, 4, 3],
  });

  assert.equal(SIMPLE_CUBIC_STATIONARY_CONTRACT.normalizedWakeSpeed, 1);
  assert.equal(nearest.receiverPolarity, "electrino");
  assert.equal(nearest.transmitterPolarity, "positrino");
  assert.equal(nearest.polaritySign, -1);
  assert.equal(nearest.transmitterFactor, 1);
  assert.equal(nearest.accelerationWeight, 1);
  assert.deepEqual(nearest.accelerationNumerator, [0, 0, 1]);
  assert.equal(nextLocal.transmitterPolarity, "electrino");
  assert.equal(nextLocal.polaritySign, 1);
  assert.deepEqual(nextLocal.accelerationNumerator, [-1, -1, 0]);
  assert.deepEqual(
    nextLocal.normalizedAcceleration,
    [-1 / (2 * Math.sqrt(2)), -1 / (2 * Math.sqrt(2)), 0],
  );
});

test("stationary checkerboard exhaustions cancel exactly by inversion pairs", () => {
  for (const receiverGrid of [[0, 0, 0], [1, 0, 0]]) {
    for (const shape of ["cube", "sphere"]) {
      const ledger = createStationarySimpleCubicExhaustionLedger({
        receiverGrid,
        cutoff: 4,
        shape,
      });
      assert.equal(ledger.allRowsPaired, true);
      assert.equal(ledger.exactZero, true);
      assert.equal(
        ledger.pairs.every(
          (pair) =>
            pair.sameSeparation &&
            pair.samePolaritySign &&
            pair.cancelsExactly,
        ),
        true,
      );
    }
  }
});

test("one-axis compression preserves exact checkerboard inversion-pair cancellation", () => {
  for (const [compressionAxis, compressionFactor] of [
    ["x", 0.75],
    ["y", 0.2],
    ["z", 0.000001],
  ]) {
    const row = createStationarySimpleCubicAccelerationRow({
      receiverGrid: [3, 3, 3],
      transmitterGrid: [4, 4, 3],
      compressionAxis,
      compressionFactor,
    });
    const axisIndex = ["x", "y", "z"].indexOf(compressionAxis);
    assert.deepEqual(
      row.physicalOffsetInD,
      [1, 1, 0].map((value, index) =>
        index === axisIndex ? value * compressionFactor : value
      ),
    );
    const ledger = createStationarySimpleCubicExhaustionLedger({
      receiverGrid: [1, 0, 0],
      cutoff: 3,
      shape: "sphere",
      compressionAxis,
      compressionFactor,
    });
    assert.equal(ledger.allRowsPaired, true);
    assert.equal(ledger.exactZero, true);
  }
  assert.throws(
    () => createStationarySimpleCubicExhaustionLedger({
      compressionFactor: 0,
    }),
    /0 < lambda <= 1/u,
  );
  assert.throws(
    () => createStationarySimpleCubicExhaustionLedger({
      compressionFactor: 1.01,
    }),
    /0 < lambda <= 1/u,
  );
});

test("independent structural verifier accepts the contract and rejects tampering", () => {
  const report = verifySimpleCubicStationaryLedger();
  assert.equal(report.status, "Verified");
  assert.equal(report.transformsChecked, 4);
  assert.equal(report.ledgersChecked, 192);
  assert.equal(report.rowsChecked, 105600);
  assert.equal(report.negativeControlsPassed, true);
  assert.deepEqual(report.issues, []);
});

test("compressed checkerboard shell totals remain zero with transformed distances", () => {
  const caseRecord = createSimpleCubicCheckerboardCase();
  const ledger = createSelectedSiteLedger(
    caseRecord,
    createReferencePolarityState(caseRecord),
    caseRecord.defaultSiteId,
    {
      compressionAxis: "x",
      compressionFactor: 0.5,
    },
  );
  assert.equal(ledger.shells[0].distance, "0.5d / 1d");
  assert.equal(ledger.shells[1].distance, "1.118d / 1.414d");
  assert.deepEqual(ledger.shells[0].normalizedAccelerationResidual, [0, 0, 0]);
  assert.deepEqual(ledger.shells[1].normalizedAccelerationResidual, [0, 0, 0]);
  assert.equal(ledger.certificateApplies, true);
  assert.equal(ledger.cancellingAccelerationPairs, 9);
});

test("selected electrino exposes two local shells as nine cancelling antipodal pairs", () => {
  const caseRecord = createSimpleCubicCheckerboardCase();
  const polarities = createReferencePolarityState(caseRecord);
  const ledger = createSelectedSiteLedger(
    caseRecord,
    polarities,
    LATTICE_LAB_DEFAULT_SITE_ID,
  );

  assert.equal(ledger.receiverPolarity, "electrino");
  assert.equal(ledger.rows.length, 18);
  assert.equal(ledger.shells.length, 2);
  assert.deepEqual(
    ledger.shells.map((shell) => ({
      id: shell.id,
      distance: shell.distance,
      expectedCount: shell.expectedCount,
      visibleCount: shell.visibleCount,
        equalPolarityAntipodalPairs: shell.equalPolarityAntipodalPairs,
        geometryResidual: shell.geometryResidual,
        normalizedAccelerationResidual: shell.normalizedAccelerationResidual,
      })),
    [
      {
        id: "nearest",
        distance: "d",
        expectedCount: 6,
        visibleCount: 6,
        equalPolarityAntipodalPairs: 3,
        geometryResidual: [0, 0, 0],
        normalizedAccelerationResidual: [0, 0, 0],
      },
      {
        id: "next-local",
        distance: "√2d",
        expectedCount: 12,
        visibleCount: 12,
        equalPolarityAntipodalPairs: 6,
        geometryResidual: [0, 0, 0],
        normalizedAccelerationResidual: [0, 0, 0],
      },
    ],
  );
  assert.equal(
    ledger.shells[0].pairs.flatMap((pair) => pair.positions).every(
      (position) => position.polarity === "positrino",
    ),
    true,
  );
  assert.equal(
    ledger.shells[1].pairs.flatMap((pair) => pair.positions).every(
      (position) => position.polarity === "electrino",
    ),
    true,
  );
  assert.equal(
    ledger.rows.every((row) => row.availability === "displayed-neighbor"),
    true,
  );
  assert.deepEqual(ledger.geometryResidual, [0, 0, 0]);
  assert.equal(ledger.equalPolarityAntipodalPairs, 9);
  assert.equal(ledger.expectedAntipodalPairs, 9);
  assert.equal(ledger.cancellingAccelerationPairs, 9);
  assert.equal(ledger.displayedCancellationPattern, true);
  assert.deepEqual(ledger.normalizedAccelerationResidual, [0, 0, 0]);
  assert.equal(ledger.accelerationRowsAvailable, true);
  assert.equal(ledger.certificateApplies, true);
  assert.equal(ledger.certifiedExactZero, true);
  assert.match(
    ledger.accelerationNote,
    /derived exact zero at every site/u,
  );
});

test("reference certificate resolves continuation rows beyond the visual crop", () => {
  const caseRecord = createSimpleCubicCheckerboardCase();
  const polarities = createReferencePolarityState(caseRecord);
  const boundaryLedger = caseRecord.sites
    .map((site) => createSelectedSiteLedger(caseRecord, polarities, site.id))
    .find((ledger) => ledger.rows.some(
      (row) => row.availability === "ideal-continuation-not-displayed",
    ));

  assert.ok(boundaryLedger);
  assert.equal(boundaryLedger.rows.length, 18);
  assert.equal(boundaryLedger.accelerationRowsAvailable, true);
  assert.equal(boundaryLedger.cancellingAccelerationPairs, 9);
  assert.deepEqual(boundaryLedger.normalizedAccelerationResidual, [0, 0, 0]);
  assert.equal(boundaryLedger.certificateApplies, true);
  assert.equal(boundaryLedger.certifiedExactZero, true);
});

test("the miniature uses the minimal neutral two-site checkerboard translation cell", () => {
  const repeatSites = createSimpleCubicPolarityRepeatCellSites();
  assert.equal(repeatSites.length, 2);
  assert.deepEqual(
    repeatSites.reduce(
      (counts, site) => ({
        ...counts,
        [site.polarity]: counts[site.polarity] + 1,
      }),
      { electrino: 0, positrino: 0 },
    ),
    { electrino: 1, positrino: 1 },
  );
});

test("every miniature resolves the complete nearest-neighbor periodic network", () => {
  createLatticeLabCaseGallery().forEach((caseRecord) => {
    const network = createRepeatCellNearestNeighborNetwork(caseRecord);
    assert.equal(
      network.relationshipCount,
      caseRecord.repeatCell.sites.length * caseRecord.coordinationNumber,
      caseRecord.id,
    );
    assert.equal(
      network.relationshipCount,
      network.expectedRelationshipCount,
      caseRecord.id,
    );
    assert.ok(network.edges.length > 0, caseRecord.id);
    assert.equal(
      network.displaySites.length,
      caseRecord.repeatCell.sites.length + network.continuationSites.length,
      caseRecord.id,
    );
    assert.ok(network.continuationSites.length > 0, caseRecord.id);
    assert.equal(
      network.relationships.some(
        (relationship) => relationship.periodicContinuation,
      ),
      true,
      caseRecord.id,
    );
    assert.equal(
      Object.hasOwn(network, "connectingRelationships"),
      false,
      `${caseRecord.id} has no graph-connecting additions`,
    );
    network.relationships.forEach((relationship, index) => {
      assert.ok(
        Math.abs(
          Math.hypot(...relationship.toPosition.map(
            (value, coordinate) =>
              value - relationship.fromPosition[coordinate],
          )) - caseRecord.nearestNeighborDistanceValue,
        ) < 1e-7,
        `${caseRecord.id} nearest-neighbor edge ${index}`,
      );
    });
  });
});

test("checkerboard periodic network rejects diagonal graph bridges", () => {
  const checkerboard = createSimpleCubicCheckerboardCase();
  const network = createRepeatCellNearestNeighborNetwork(checkerboard);
  assert.equal(network.relationships.length, 12);
  assert.equal(network.edges.length, 15);
  assert.equal(
    network.edges.filter(
      (edge) => edge.startContinuation && edge.endContinuation,
    ).length,
    4,
  );
  assert.equal(
    network.relationships.every((relationship) =>
      Math.abs(
        Math.hypot(...relationship.toPosition.map(
          (value, index) => value - relationship.fromPosition[index],
        )) - 1,
      ) < 1e-7
    ),
    true,
  );
  assert.equal(
    network.edges.some((edge) =>
      Math.abs(
        Math.hypot(...edge.end.map(
          (value, index) => value - edge.start[index],
        )) - Math.SQRT2,
      ) < 1e-7
    ),
    false,
  );
  const uncompressed = selectShortestTransformedRelationships(
    network.relationships,
  );
  assert.equal(uncompressed.selected.length, 12);
  assert.equal(uncompressed.excluded.length, 0);
  assert.equal(uncompressed.nearestDistance, 1);
  const compressed = selectShortestTransformedRelationships(
    network.relationships,
    { compressionAxis: "x", compressionFactor: 0.4 },
  );
  assert.equal(compressed.selected.length, 4);
  assert.equal(compressed.excluded.length, 8);
  assert.ok(Math.abs(compressed.nearestDistance - 0.4) < 1e-12);
  assert.equal(
    compressed.excluded.every((row) =>
      Math.abs(row.transformedDistance - 1) < 1e-12
    ),
    true,
  );
});

test("main and repeat-cell displays contain all and only nearest-neighbor links", () => {
  const positionKey = (position) =>
    position.map((value) => Number(value.toFixed(9))).join(",");
  createLatticeLabCaseGallery().forEach((caseRecord) => {
    const mainExpected = new Set();
    caseRecord.sites.forEach((site, siteIndex) => {
      caseRecord.sites.slice(siteIndex + 1).forEach((neighbor) => {
        const distance = Math.hypot(...neighbor.position.map(
          (value, index) => value - site.position[index],
        ));
        if (
          Math.abs(distance - caseRecord.nearestNeighborDistanceValue) < 1e-7
        ) {
          mainExpected.add([site.id, neighbor.id].sort().join("|"));
        }
      });
    });
    const mainActual = createNearestNeighborEdges(caseRecord);
    assert.deepEqual(
      new Set(mainActual.map((edge) =>
        [edge.fromSiteId, edge.toSiteId].sort().join("|")
      )),
      mainExpected,
      `${caseRecord.id} main nearest-neighbor graph`,
    );

    const network = createRepeatCellNearestNeighborNetwork(caseRecord);
    const repeatExpected = new Set();
    caseRecord.repeatCell.sites.forEach((fromSite) => {
      caseRecord.repeatCell.sites.forEach((toSite) => {
        for (let ia = -1; ia <= 1; ia += 1) {
          for (let ib = -1; ib <= 1; ib += 1) {
            for (let ic = -1; ic <= 1; ic += 1) {
              const translation = caseRecord.repeatCell.vectors.reduce(
                (sum, vector, vectorIndex) => sum.map(
                  (value, coordinate) =>
                    value + vector[coordinate] * [ia, ib, ic][vectorIndex],
                ),
                [0, 0, 0],
              );
              const end = toSite.position.map(
                (value, coordinate) => value + translation[coordinate],
              );
              const distance = Math.hypot(...end.map(
                (value, coordinate) => value - fromSite.position[coordinate],
              ));
              if (
                Math.abs(distance - caseRecord.nearestNeighborDistanceValue) <
                  1e-7
              ) {
                repeatExpected.add(
                  `${fromSite.id}|${toSite.id}|${ia},${ib},${ic}`,
                );
              }
            }
          }
        }
      });
    });
    assert.deepEqual(
      new Set(network.relationships.map((relationship) =>
        `${relationship.fromSiteId}|${relationship.toSiteId}|` +
        relationship.translation.join(",")
      )),
      repeatExpected,
      `${caseRecord.id} repeat-cell nearest-neighbor graph`,
    );
    const displayedExpected = new Set();
    network.displaySites.forEach((site, siteIndex) => {
      network.displaySites.slice(siteIndex + 1).forEach((neighbor) => {
        const distance = Math.hypot(...neighbor.position.map(
          (value, coordinate) => value - site.position[coordinate],
        ));
        if (
          Math.abs(distance - caseRecord.nearestNeighborDistanceValue) < 1e-7
        ) {
          displayedExpected.add(
            [positionKey(site.position), positionKey(neighbor.position)]
              .sort()
              .join("|"),
          );
        }
      });
    });
    assert.deepEqual(
      new Set(network.edges.map((edge) =>
        [positionKey(edge.start), positionKey(edge.end)].sort().join("|")
      )),
      displayedExpected,
      `${caseRecord.id} complete displayed nearest-neighbor graph`,
    );
    network.edges.forEach((edge) => {
      assert.ok(
        Math.abs(
          Math.hypot(...edge.end.map(
            (value, coordinate) => value - edge.start[coordinate],
          )) - caseRecord.nearestNeighborDistanceValue,
        ) < 1e-7,
        `${caseRecord.id} displayed repeat edge ` +
          `${positionKey(edge.start)} to ${positionKey(edge.end)}`,
      );
    });
  });
});

test("every named repeat object translates to tile the complete geometry and polarity pattern", () => {
  createLatticeLabCaseGallery().forEach((caseRecord) => {
    assert.equal(caseRecord.repeatCell.kind, "cell");
    assert.equal(caseRecord.repeatCell.minimal, true);
    assert.equal(
      caseRecord.repeatCell.ownership,
      "half-open-fundamental-domain",
    );
    assert.equal(caseRecord.repeatCell.sites.length, 2);
    assert.match(caseRecord.repeatCell.label, /^minimal 2-site/u);
    caseRecord.repeatCell.sites.forEach((site) => {
      assert.equal(site.fractionalPosition.length, 3, caseRecord.id);
      assert.equal(
        site.fractionalPosition.every(
          (coordinate) => coordinate >= 0 && coordinate < 1,
        ),
        true,
        `${caseRecord.id} half-open ownership`,
      );
    });
    const centralSites = caseRecord.idealSites.filter(
      (site) => Math.hypot(...site.position) < 2,
    );
    assert.ok(centralSites.length > 0, caseRecord.id);
    caseRecord.repeatCell.vectors.forEach((translation) => {
      centralSites.forEach((site) => {
        const translatedPosition = site.position.map(
          (value, index) => value + translation[index],
        );
        const translatedSite = caseRecord.idealSites.find((candidate) =>
          candidate.position.every(
            (value, index) =>
              Math.abs(value - translatedPosition[index]) < 1e-7,
          )
        );
        assert.ok(translatedSite, `${caseRecord.id} translated site`);
        assert.equal(
          translatedSite.polarity,
          site.polarity,
          `${caseRecord.id} translated polarity`,
        );
      });
    });
  });
  const hcp = createLatticeLabCaseGallery()[3];
  assert.notEqual(hcp.repeatCell.vectors[1][0], 0);
  const [a, b, c] = hcp.repeatCell.vectors;
  const determinant =
    a[0] * (b[1] * c[2] - b[2] * c[1]) -
    a[1] * (b[0] * c[2] - b[2] * c[0]) +
    a[2] * (b[0] * c[1] - b[1] * c[0]);
  assert.ok(Math.abs(determinant) > 1e-7);
});

test("curated gallery follows the guided order and every spherical crop and repeat cell is neutral", () => {
  const gallery = createLatticeLabCaseGallery();
  assert.deepEqual(gallery.map((caseRecord) => caseRecord.id), [
    "simple-cubic-checkerboard-v1",
    "bcc-two-sublattice-v1",
    "fcc-alternating-planes-v1",
    "hcp-abab-layers-v1",
    "simple-cubic-alternating-planes-v1",
    "diamond-cubic-two-sublattice-v1",
  ]);
  assert.deepEqual(gallery.map((caseRecord) => caseRecord.id), LATTICE_LAB_CASE_IDS);

  gallery.forEach((caseRecord) => {
    const displayCounts = countLatticePolarities(
      createReferencePolarityState(caseRecord),
    );
    assert.equal(
      displayCounts.electrino,
      displayCounts.positrino,
      `${caseRecord.id} display crop`,
    );
    const repeatCounts = caseRecord.repeatCell.sites.reduce(
      (counts, site) => ({
        ...counts,
        [site.polarity]: counts[site.polarity] + 1,
      }),
      { electrino: 0, positrino: 0 },
    );
    assert.equal(
      repeatCounts.electrino,
      repeatCounts.positrino,
      `${caseRecord.id} repeat cell`,
    );
    assert.equal(
      caseRecord.sites.every(
        (site) => Math.hypot(...site.position) <= caseRecord.displayRadius + 1e-9,
      ),
      true,
      `${caseRecord.id} spherical crop`,
    );
  });
});

test("gallery neighbor shells are derived from the declared lattice coordinates", () => {
  const expected = {
    "simple-cubic-checkerboard-v1": [
      [6, 1, [0, 6]],
      [12, Math.SQRT2, [12, 0]],
    ],
    "bcc-two-sublattice-v1": [
      [8, 1, [0, 8]],
      [6, 2 / Math.sqrt(3), [6, 0]],
    ],
    "fcc-alternating-planes-v1": [
      [12, 1, [4, 8]],
      [6, Math.SQRT2, [6, 0]],
    ],
    "hcp-abab-layers-v1": [
      [12, 1, [6, 6]],
      [6, Math.SQRT2, [0, 6]],
    ],
    "simple-cubic-alternating-planes-v1": [
      [6, 1, [4, 2]],
      [12, Math.SQRT2, [4, 8]],
    ],
    "diamond-cubic-two-sublattice-v1": [
      [4, 1, [0, 4]],
      [12, 4 / Math.sqrt(6), [12, 0]],
    ],
  };

  createLatticeLabCaseGallery().forEach((caseRecord) => {
    const ledger = createSelectedSiteLedger(
      caseRecord,
      createReferencePolarityState(caseRecord),
      caseRecord.defaultSiteId,
    );
    assert.deepEqual(
      ledger.shells.map((shell) => shell.resolvedCount),
      expected[caseRecord.id].map(([count]) => count),
      caseRecord.id,
    );
    ledger.shells.forEach((shell, shellIndex) => {
      assert.equal(shell.rows.length, expected[caseRecord.id][shellIndex][0]);
      assert.deepEqual(
        shell.rows.reduce(
          (counts, row) => {
            counts[row.polarity === "electrino" ? 0 : 1] += 1;
            return counts;
          },
          [0, 0],
        ),
        expected[caseRecord.id][shellIndex][2],
        `${caseRecord.id} ${shell.id} polarities`,
      );
      shell.rows.forEach((row) => {
        assert.ok(
          Math.abs(
            Math.hypot(...row.offset) -
              expected[caseRecord.id][shellIndex][1]
          ) < 1e-7,
          `${caseRecord.id} ${shell.id}`,
        );
      });
    });
  });
});

test("only the checkerboard case exposes an acceleration certificate", () => {
  createLatticeLabCaseGallery().forEach((caseRecord, caseIndex) => {
    const ledger = createSelectedSiteLedger(
      caseRecord,
      createReferencePolarityState(caseRecord),
      caseRecord.defaultSiteId,
    );
    assert.equal(ledger.certificateApplies, caseIndex === 0, caseRecord.id);
    assert.equal(ledger.accelerationRowsAvailable, caseIndex === 0, caseRecord.id);
    if (caseIndex > 0) {
      assert.match(caseRecord.evidenceStatus, /static geometry\/reference case/u);
      assert.match(caseRecord.accelerationStatus, /unavailable/u);
    }
  });
});

test("nearest-neighbor geometry segments terminate at both sphere surfaces", () => {
  assert.deepEqual(
    createClippedNeighborSegment([0, 0, 0], [1, 0, 0], 0.2),
    {
      start: [0.2, 0, 0],
      end: [0.8, 0, 0],
    },
  );
  assert.deepEqual(
    createClippedNeighborSegment([0, 0, 0], [1, 0, 0], 0.2, 0.1),
    {
      start: [0.2, 0, 0],
      end: [0.9, 0, 0],
    },
  );
});

test("Lattice Lab page keeps the shared standalone navigation strip without Borg diagnostics", () => {
  const html = readRepoFile("lattice-lab.html");
  assert.match(
    html,
    /id="scene-hud-tools"[\s\S]*id="textbook-toc-button"[\s\S]*id="nav-up"[\s\S]*id="nav-forward"[\s\S]*id="home-button"[\s\S]*id="scene-search-toggle"/u,
  );
  assert.match(html, /src\/apps\/navigator\/standalone-app-navigation\.css/u);
  assert.equal(html.includes("diagnostics-toggle"), false);
  assert.equal(/\bPlay\b/u.test(html), false);
  assert.equal(html.includes("data-lattice-view"), false);
  assert.equal(html.includes("lattice-lab-view-controls"), false);
  assert.equal(html.includes("lattice-lab-display-crop-note"), false);
  assert.match(html, /id="lattice-lab-miniature-canvas"/u);
  assert.match(
    html,
    /id="lattice-lab-miniature-canvas"[\s\S]*tabindex="0"[\s\S]*aria-label="Interactive repeat-cell view"/u,
  );
  assert.match(html, /How This Pattern Repeats/u);
  assert.match(html, /id="lattice-lab-repeat-highlight"[\s\S]*type="checkbox"/u);
  assert.equal(html.includes("lattice-lab-miniature-legend"), false);
  assert.equal(html.includes("Synchronized orientation"), false);
  assert.match(html, /id="lattice-lab-case-select"/u);
  assert.match(html, /Site ledger is being redesigned\./u);
  assert.equal(html.includes("Selected-Site Ledger"), false);
  assert.equal(html.includes("lattice-lab-ledger-result"), false);
  assert.equal(html.includes("lattice-lab-ledger-shells"), false);
  assert.equal(html.includes("Scope and calculation basis"), false);
  assert.equal(html.includes("lattice-lab-configuration-state"), false);
  assert.match(
    html,
    /Each curated geometry has equal numbers of electrinos and positrinos\./u,
  );
  assert.match(html, />Spherical crop</u);
  assert.equal(html.includes("lattice-lab-selected-site"), false);
  assert.equal(html.includes("Display-only core"), false);
  assert.equal(html.includes("lattice-lab-swap-button"), false);
  assert.equal(html.includes("Two-site polarity swap"), false);
  assert.equal(html.includes("lattice-lab-compression-axis"), false);
  assert.match(
    html,
    /id="lattice-lab-compression-factor"[\s\S]*type="range"[\s\S]*aria-label="Uniaxial compression"/u,
  );
  assert.ok(
    html.indexOf("lattice-lab-case-selector-card") <
      html.indexOf("lattice-lab-seeing-card"),
  );
  assert.match(html, /id="lattice-lab-primer-toggle"[\s\S]*hidden/u);
  assert.equal(LATTICE_LAB_UI_FEATURES.primerCollapse, false);
  const runtime = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  assert.match(
    runtime,
    /Every site has six nearest neighbors of the opposite polarity\./u,
  );
  assert.match(runtime, /siteSelectionExplicit = true/u);
});

test("Lattice Lab rendering keeps solid spheres fixed on screen and clips depth-tested geometry", () => {
  const runtime = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  const css = readRepoFile("src/apps/lattice-lab/lattice-lab.css");
  assert.match(runtime, /new THREE\.SphereGeometry\(1, 24, 16\)/u);
  assert.match(runtime, /new THREE\.MeshStandardMaterial/u);
  assert.match(runtime, /MARKER_RADIUS_PX \* \(2 \* cameraViewHalfHeight \/ viewportHeight\)/u);
  assert.match(runtime, /listen\(dom\.canvas, "pointerdown", handlePointerDown\)/u);
  assert.match(runtime, /listen\(dom\.canvas, "wheel", handleWheel/u);
  assert.doesNotMatch(runtime, /applyNamedView|LATTICE_LAB_NAMED_VIEWS|data-lattice-view/u);
  assert.doesNotMatch(css, /lattice-lab-view-controls|lattice-lab-display-crop-note/u);
  assert.match(runtime, /createClippedNeighborSegment/u);
  assert.match(runtime, /depthTest: true/u);
  assert.match(runtime, /miniatureRoot\.quaternion\.copy\(rootGroup\.quaternion\)/u);
  assert.match(runtime, /createRepeatCellNearestNeighborNetwork\(caseRecord\)/u);
  assert.match(runtime, /function rebuildRepeatCellHighlight\(\)/u);
  assert.match(runtime, /repeatHighlightGroup/u);
  assert.doesNotMatch(runtime, /repeat-cell-highlight-frame/u);
  assert.match(runtime, /repeat-cell-highlight-neighbor/u);
  assert.match(runtime, /lineGroup\.visible = !repeatCellHighlighted/u);
  assert.match(runtime, /repeatHighlightIncidenceCount/u);
  assert.doesNotMatch(runtime, /selectionHalo/u);
  assert.match(runtime, /emissiveIntensity: 0\.62/u);
  assert.match(runtime, /guideGroup\.add\(createDottedDisplayEnvelope\(caseRecord\.displayRadius\)\)/u);
  assert.match(runtime, /miniatureRoot\.quaternion\.copy\(rootGroup\.quaternion\)/u);
  assert.match(
    css,
    /#lattice-lab-miniature-canvas[\s\S]*cursor: grab;[\s\S]*pointer-events: auto;[\s\S]*touch-action: none;/u,
  );
  assert.match(
    css,
    /#lattice-lab-miniature-canvas \{[\s\S]*width: var\(--miniature-size\);[\s\S]*height: auto;[\s\S]*aspect-ratio: 1;/u,
  );
  assert.match(
    css,
    /--miniature-size: min\(100%, max\(190px, calc\(100dvh - 610px\)\)\)/u,
  );
  assert.match(
    css,
    /\.lattice-lab-panel-content \{[\s\S]*height: calc\(100dvh - 68px\);[\s\S]*overflow-y: auto;/u,
  );
  assert.match(
    css,
    /#lattice-lab-app \{[\s\S]*--rail-width: 413\.4px;/u,
  );
  assert.match(
    css,
    /#lattice-lab-app\[data-panel-collapsed="true"\] \{[\s\S]*--rail-width: 58px;/u,
  );
  assert.match(
    css,
    /@media \(max-width: 980px\) \{[\s\S]*#lattice-lab-app \{[\s\S]*--rail-width: 286px;/u,
  );
  assert.doesNotMatch(
    css,
    /\.lattice-lab-primer\[open\] \{/u,
  );
  assert.match(
    css,
    /\.lattice-lab-inspector-stack \{[\s\S]*top: 58px;[\s\S]*bottom: 16px;[\s\S]*grid-template-rows: auto auto;[\s\S]*width: min\(420px, calc\(100% - 32px\)\);[\s\S]*overflow-y: auto;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-ledger \{[\s\S]*overflow: visible;/u,
  );
  assert.doesNotMatch(css, /\.lattice-lab-ledger \{[\s\S]*max-height: 450px;/u);
  assert.match(
    css,
    /@media \(max-width: 720px\) \{[\s\S]*\.lattice-lab-inspector-stack \{[\s\S]*top: 204px;[\s\S]*bottom: 10px;[\s\S]*max-height: none;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-case-selector select \{[\s\S]*appearance: none;[\s\S]*height: 36px;[\s\S]*font-size: 11px;[\s\S]*font-weight: 720;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-ledger-placeholder \{[\s\S]*font-size: 12px;/u,
  );
  assert.doesNotMatch(css, /lattice-lab-ledger-pair|lattice-lab-shell-status/u);
  assert.match(css, /background-image: url\("data:image\/svg\+xml/u);
  assert.match(runtime, /function updateUsableCanvasCenter\(\)/u);
  assert.match(
    runtime,
    /layoutWorldOffsetX[\s\S]*inspectorRect\.left - canvasRect\.left - 12/u,
  );
  assert.match(runtime, /handleMiniaturePointerDown/u);
  assert.match(
    runtime,
    /listen\(dom\.miniatureCanvas, "wheel", handleWheel/u,
  );
  assert.doesNotMatch(runtime, /LineDashedMaterial/u);
  assert.match(runtime, /wireframe = true/u);
  assert.match(
    runtime,
    /Copy this colored tile by translation to continue the pattern\./u,
  );
  assert.match(runtime, /function applyCompressionControls\(\)/u);
  assert.match(
    runtime,
    /createStationarySimpleCubicExhaustionLedger\([\s\S]*\.exactZero/u,
  );
  assert.match(runtime, /net acceleration contribution is zero at every site/u);
  assert.doesNotMatch(runtime, /swapOppositeLatticePolarities/u);
  assert.match(runtime, /transformDisplayPosition\(startSite\.position\)/u);
  assert.match(css, /\.lattice-lab-miniature-card \{[\s\S]*box-shadow: none;/u);
});

test("shared panel collapse icon preserves the established open and closed treatment", () => {
  const equationRuntime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  assert.match(createPanelCollapseIconSvg(false), /width="3\.8"[\s\S]*fill="currentColor"/u);
  assert.doesNotMatch(createPanelCollapseIconSvg(true), /width="3\.8"/u);
  assert.match(equationRuntime, /createPanelCollapseIconSvg\(this\.indexCollapsed\)/u);
});

test("Lattice Lab is the fourteenth Applications entry and the authored ring is catalog-alphabetical", () => {
  const applications = JSON.parse(
    readRepoFile("content/scenes/archie/applications.json"),
  );
  const expectedOrder = [
    "animator",
    "atom",
    "borg",
    "braid_search",
    "causal_delay_feedback",
    "equation_mapping",
    "greek_letter_match",
    "hyde_periodic_table",
    "lattice_lab",
    "ideal_braid",
    "molecule",
    "periodic_table",
    "photon",
    "standard_model",
  ];

  assert.equal(applications.scene.layout.type, "rings");
  assert.equal(applications.scene.layout.order, "objects");
  assert.equal(applications.scene.children.length, 14);
  assert.equal(applications.objects.length, 14);
  assert.deepEqual(
    applications.scene.children.map((entry) => entry.nodeId),
    expectedOrder,
  );
  assert.deepEqual(
    applications.objects.map((entry) => entry.id),
    expectedOrder,
  );
  assert.equal(
    applications.objects.find((entry) => entry.id === "greek_letter_match")?.labelTitle,
    "It's Greek to Me!",
  );
});

test("Applications scene route resolves Lattice Lab to its standalone page", () => {
  assert.equal(getStandaloneAppPathForScene("lattice-lab"), "lattice-lab.html");
  assert.equal(
    getStandaloneAppPathForScene("content/scenes/archie/lattice_lab.json"),
    "lattice-lab.html",
  );
  assert.equal(
    resolveStandaloneAppHrefForScene(
      "content/scenes/archie/lattice_lab.json",
      "http://127.0.0.1:5173/index.html#scene=content%2Fscenes%2Farchie%2Flattice_lab.json",
    ),
    "http://127.0.0.1:5173/lattice-lab.html",
  );
});
