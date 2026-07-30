import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  LATTICE_LAB_DEFAULT_SITE_ID,
  LATTICE_LAB_DISPLAY_RADIUS,
  countLatticePolarities,
  createClippedNeighborSegment,
  createReferencePolarityState,
  createSelectedSiteLedger,
  createSimpleCubicCheckerboardCase,
  createSimpleCubicPolarityRepeatCellSites,
  isReferenceLatticeConfiguration,
  swapOppositeLatticePolarities,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  SIMPLE_CUBIC_STATIONARY_CONTRACT,
  createStationarySimpleCubicAccelerationRow,
  createStationarySimpleCubicExhaustionLedger,
} from "../src/apps/lattice-lab/SimpleCubicStationaryLedger.js";
import { LATTICE_LAB_NAMED_VIEWS } from "../src/apps/lattice-lab/LatticeLabRuntime.js";
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

test("independent structural verifier accepts the contract and rejects tampering", () => {
  const report = verifySimpleCubicStationaryLedger();
  assert.equal(report.status, "Verified");
  assert.equal(report.ledgersChecked, 48);
  assert.equal(report.negativeControlsPassed, true);
  assert.deepEqual(report.issues, []);
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

test("A-then-B swap accepts only opposite polarities and preserves exact spherical-crop neutrality", () => {
  const caseRecord = createSimpleCubicCheckerboardCase();
  const reference = createReferencePolarityState(caseRecord);
  const modified = swapOppositeLatticePolarities(
    caseRecord,
    reference,
    "site-3-3-3",
    "site-3-3-4",
  );

  assert.deepEqual(countLatticePolarities(modified), {
    electrino: 68,
    positrino: 68,
  });
  assert.equal(isReferenceLatticeConfiguration(caseRecord, modified), false);
  assert.equal(modified["site-3-3-3"], reference["site-3-3-4"]);
  assert.equal(modified["site-3-3-4"], reference["site-3-3-3"]);
  const modifiedLedger = createSelectedSiteLedger(
    caseRecord,
    modified,
    LATTICE_LAB_DEFAULT_SITE_ID,
  );
  assert.equal(modifiedLedger.receiverPolarity, "positrino");
  assert.equal(modifiedLedger.equalPolarityAntipodalPairs, 8);
  assert.equal(modifiedLedger.cancellingAccelerationPairs, 8);
  assert.equal(modifiedLedger.displayedCancellationPattern, false);
  assert.deepEqual(modifiedLedger.normalizedAccelerationResidual, [0, 0, 2]);
  assert.equal(modifiedLedger.certificateApplies, false);
  assert.equal(modifiedLedger.certifiedExactZero, false);
  assert.throws(
    () => swapOppositeLatticePolarities(
      caseRecord,
      reference,
      "site-3-3-3",
      "site-3-4-4",
    ),
    /opposite polarity/u,
  );
});

test("the miniature uses the minimal neutral checkerboard polarity repeat cell", () => {
  const repeatSites = createSimpleCubicPolarityRepeatCellSites();
  assert.equal(repeatSites.length, 8);
  assert.deepEqual(
    repeatSites.reduce(
      (counts, site) => ({
        ...counts,
        [site.polarity]: counts[site.polarity] + 1,
      }),
      { electrino: 0, positrino: 0 },
    ),
    { electrino: 4, positrino: 4 },
  );
});

test("nearest-neighbor geometry segments terminate at both sphere surfaces", () => {
  assert.deepEqual(
    createClippedNeighborSegment([0, 0, 0], [1, 0, 0], 0.2),
    {
      start: [0.2, 0, 0],
      end: [0.8, 0, 0],
    },
  );
});

test("Lattice Lab exposes the requested named static views and no Play view", () => {
  assert.deepEqual(Object.keys(LATTICE_LAB_NAMED_VIEWS), [
    "reset",
    "cell",
    "plane",
    "shell",
    "selected",
    "front",
    "side",
    "top",
  ]);
  assert.equal(Object.hasOwn(LATTICE_LAB_NAMED_VIEWS, "play"), false);
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
  assert.match(html, /Dotted sphere: visual display crop only/u);
  assert.match(html, /id="lattice-lab-miniature-canvas"/u);
  assert.match(html, /id="lattice-lab-ledger-unavailable"/u);
  assert.match(html, /id="lattice-lab-ledger-shells"/u);
  assert.match(html, /Acceleration Cancellation Ledger/u);
});

test("Lattice Lab rendering keeps solid spheres fixed on screen and clips depth-tested geometry", () => {
  const runtime = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  const css = readRepoFile("src/apps/lattice-lab/lattice-lab.css");
  assert.match(runtime, /new THREE\.SphereGeometry\(1, 24, 16\)/u);
  assert.match(runtime, /new THREE\.MeshStandardMaterial/u);
  assert.match(runtime, /MARKER_RADIUS_PX \* \(2 \* cameraViewHalfHeight \/ viewportHeight\)/u);
  assert.match(runtime, /createClippedNeighborSegment/u);
  assert.match(runtime, /depthTest: true/u);
  assert.match(runtime, /miniatureRoot\.quaternion\.copy\(rootGroup\.quaternion\)/u);
  assert.doesNotMatch(runtime, /selectionHalo/u);
  assert.match(runtime, /emissiveIntensity: 0\.62/u);
  assert.match(runtime, /guideGroup\.add\(createDottedDisplayEnvelope\(LATTICE_LAB_DISPLAY_RADIUS\)\)/u);
  assert.match(css, /#lattice-lab-miniature-canvas[\s\S]*pointer-events: none;/u);
  assert.match(css, /#lattice-lab-miniature-canvas \{[\s\S]*width: 156px;[\s\S]*height: 156px;/u);
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
