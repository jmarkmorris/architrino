import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  LATTICE_LAB_DEFAULT_SITE_ID,
  LATTICE_LAB_CASE_IDS,
  LATTICE_LAB_DISPLAY_RADIUS,
  LATTICE_LAB_RANDOM_FINITE_DISPLAY_RADIUS,
  countLatticePolarities,
  createClippedNeighborSegment,
  createLatticeLabCaseGallery,
  createRepeatCellNearestNeighborNetwork,
  createReferencePolarityState,
  createSelectedSiteLedger,
  createSimpleCubicCheckerboardCase,
  createSimpleCubicPolarityRepeatCellSites,
  isReferenceLatticeConfiguration,
  selectShortestTransformedRepeatCellEdges,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  SIMPLE_CUBIC_STATIONARY_CONTRACT,
  createStationarySimpleCubicAccelerationRow,
  createStationarySimpleCubicExhaustionLedger,
} from "../src/apps/lattice-lab/SimpleCubicStationaryLedger.js";
import {
  LATTICE_LAB_SELECTION_CIRCLE_STROKE_PX,
  applyTrackballDragQuaternion,
  createDefaultOrientationQuaternion,
  createEndpointHighlightGroupPairIds,
  createEndpointVisualAggregation,
  createMainDisplayVisibility,
  createUniaxialDeformedPosition,
  defaultViewHalfHeightForDisplayRadius,
  xAxisScaleFromDeformationBeta,
  createNearestNeighborEdges,
  createRepeatCellDisplayGraph,
  createTripodAxisLayout,
  projectTrackballPoint,
} from "../src/apps/lattice-lab/LatticeLabRuntime.js";
import { createPanelCollapseIconSvg } from "../src/runtime/PanelCollapseIcons.js";
import {
  verifySimpleCubicStationaryLedger,
} from "../scripts/verify-lattice-lab-simple-cubic-checkerboard.mjs";
import {
  verifyLatticeLabDisplayCrop,
} from "../scripts/verify-lattice-lab-display-crop.mjs";
import {
  getStandaloneAppPathForScene,
  resolveStandaloneAppHrefForScene,
} from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("every gallery crop uses 2.75d while apparent diameter stays fixed", () => {
  assert.equal(LATTICE_LAB_DISPLAY_RADIUS, 2.75);
  assert.equal(LATTICE_LAB_RANDOM_FINITE_DISPLAY_RADIUS, 2.75);
  const verification = verifyLatticeLabDisplayCrop();
  assert.equal(verification.ok, true);
  assert.deepEqual(
    verification.cases.map((caseRecord) => [
      caseRecord.id,
      caseRecord.beforeIncludedSites.length,
      caseRecord.afterIncludedSites.length,
      caseRecord.beforeRelationships.length,
      caseRecord.afterRelationships.length,
    ]),
    [
      ["simple-cubic-checkerboard-v1", 56, 88, 120, 192],
      ["bcc-two-sublattice-v1", 90, 108, 251, 311],
      ["fcc-alternating-planes-v1", 98, 118, 411, 515],
      ["hcp-abab-layers-v1", 96, 116, 407, 509],
      ["simple-cubic-alternating-planes-v1", 56, 88, 120, 192],
      ["diamond-cubic-two-sublattice-v1", 38, 56, 55, 79],
      ["simple-cubic-random-finite-fifty-fifty-v1", 56, 88, 120, 192],
    ],
  );
  const baselineRatio = 3.25 / 4.4;
  verification.cases.forEach((caseRecord) => {
    assert.ok(
      Math.abs(caseRecord.apparentDiameterRatio - baselineRatio) < 1e-12,
      caseRecord.id,
    );
  });
  assert.equal(defaultViewHalfHeightForDisplayRadius(3.25), 4.4);
  assert.equal(
    defaultViewHalfHeightForDisplayRadius(2.75),
    4.4 * (2.75 / 3.25),
  );
});

test("main display hides only the authorized Simple Cubic cap members", () => {
  const gallery = createLatticeLabCaseGallery();
  const simpleCubicIds = new Set([
    "simple-cubic-checkerboard-v1",
    "simple-cubic-alternating-planes-v1",
    "simple-cubic-random-finite-fifty-fifty-v1",
  ]);
  const simpleCubicHiddenIds = [
    "site-1-3-3", "site-1-3-4", "site-1-4-3", "site-1-4-4",
    "site-3-1-3", "site-3-1-4", "site-3-3-1", "site-3-3-6",
    "site-3-4-1", "site-3-4-6", "site-3-6-3", "site-3-6-4",
    "site-4-1-3", "site-4-1-4", "site-4-3-1", "site-4-3-6",
    "site-4-4-1", "site-4-4-6", "site-4-6-3", "site-4-6-4",
    "site-6-3-3", "site-6-3-4", "site-6-4-3", "site-6-4-4",
  ].sort();
  gallery.forEach((caseRecord) => {
    const visibility = createMainDisplayVisibility(caseRecord);
    const canonicalEdges = createNearestNeighborEdges(caseRecord);
    if (simpleCubicIds.has(caseRecord.id)) {
      assert.equal(caseRecord.sites.length, 88, caseRecord.id);
      assert.equal(canonicalEdges.length, 192, caseRecord.id);
      assert.deepEqual(
        visibility.hiddenCapSiteIds,
        simpleCubicHiddenIds,
        caseRecord.id,
      );
      assert.equal(visibility.visibleSites.length, 64, caseRecord.id);
      assert.equal(visibility.hiddenSites.length, 24, caseRecord.id);
      assert.equal(visibility.visibleEdges.length, 144, caseRecord.id);
      assert.equal(visibility.hiddenEdges.length, 48, caseRecord.id);
      assert.equal(visibility.visibleSites.every((site) =>
        site.position.every((coordinate) => Math.abs(coordinate) <= 1.5)
      ), true, caseRecord.id);
    } else {
      assert.equal(visibility.visibleSites.length, caseRecord.sites.length);
      assert.equal(visibility.visibleEdges.length, canonicalEdges.length);
      assert.equal(visibility.hiddenSites.length, 0);
      assert.equal(visibility.hiddenEdges.length, 0);
      assert.deepEqual(visibility.hiddenCapSiteIds, [], caseRecord.id);
      if (caseRecord.id === "bcc-two-sublattice-v1") {
        assert.equal(visibility.visibleSites.length, 108);
        assert.equal(visibility.visibleEdges.length, 311);
      }
    }
    const visibleIds = new Set(visibility.visibleSites.map(({ id }) => id));
    assert.equal(visibility.visibleEdges.every((edge) =>
      visibleIds.has(edge.fromSiteId) && visibleIds.has(edge.toSiteId)
    ), true, caseRecord.id);
  });

  const random = gallery.find(
    ({ id }) => id === "simple-cubic-random-finite-fifty-fifty-v1",
  );
  const randomLedger = createSelectedSiteLedger(
    random,
    createReferencePolarityState(random),
    random.defaultSiteId,
  );
  assert.equal(randomLedger.rows.length, 87);
  assert.equal(randomLedger.rows.every(
    ({ availability }) => availability === "finite-configuration-neighbor",
  ), true);
  assert.match(randomLedger.coverage, /87 of 87 other sites in the full canonical finite configuration included/u);
});

test("shared boundary treatment uses lowercase 2.75d with no stale prior radius", () => {
  const html = readFileSync("lattice-lab.html", "utf8");
  const boundaryRow = html.match(
    /<dt>Boundary treatment<\/dt>[\s\S]*?<dd>([\s\S]*?)<\/dd>/u,
  );

  assert.ok(boundaryRow, "Shared Boundary treatment row is missing.");
  assert.match(
    boundaryRow[1],
    /spherical radius of 2\.75d\./u,
  );
  assert.doesNotMatch(
    boundaryRow[1],
    /two and three-quarters times d|2\.5|3\.25|2\.75D|times D/u,
  );
});

test("alternating planes moves only its default selection and repeat representative one +Z step", () => {
  const caseRecord = createLatticeLabCaseGallery().find(
    ({ id }) => id === "simple-cubic-alternating-planes-v1",
  );
  const selectedSite = caseRecord.sites.find(
    ({ id }) => id === caseRecord.defaultSiteId,
  );
  const ledger = createSelectedSiteLedger(
    caseRecord,
    createReferencePolarityState(caseRecord),
    caseRecord.defaultSiteId,
  );
  const runtime = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");

  assert.equal(caseRecord.defaultSiteId, "site-3-3-4");
  assert.deepEqual(selectedSite.position, [-0.5, -0.5, 0.5]);
  assert.deepEqual(caseRecord.mainRepeatRepresentativeOffset, [0, 0, 1]);
  assert.equal(ledger.receiverId, caseRecord.defaultSiteId);
  assert.equal(caseRecord.displayRadius, 2.75);
  assert.match(runtime, /repeatHighlightOwnedSiteIds/u);
  assert.match(
    runtime,
    /site\.position\[index\] - presentationOffset\[index\]/u,
  );
});

test("certified ledger check outline matches the selected-site circle stroke", () => {
  assert.equal(LATTICE_LAB_SELECTION_CIRCLE_STROKE_PX, 2);
  const css = readRepoFile("src/apps/lattice-lab/lattice-lab.css");
  assert.match(
    css,
    /\[data-outcome="zero"\] \.lattice-lab-ledger-icon \{\s*border-width: 2px;/u,
  );
  assert.match(
    css,
    /\[data-outcome="nonzero"\] \.lattice-lab-ledger-icon \{\s*border-width: 2px;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-ledger-icon \{[\s\S]*?width: 23px;[\s\S]*?height: 23px;[\s\S]*?border: 1px solid/u,
  );
  assert.match(
    css,
    /\[data-outcome="nonzero"\] \.lattice-lab-ledger-icon \{\s*border-color:/u,
  );
});

test("Ledger residual readout uses the surrounding proportional typography", () => {
  const css = readRepoFile("src/apps/lattice-lab/lattice-lab.css");
  const residualRule = css.match(
    /\.lattice-lab-ledger-residual \{([\s\S]*?)\n\}/u,
  )?.[1] ?? "";
  assert.match(residualRule, /font-family: inherit;/u);
  assert.match(residualRule, /font-variant-numeric: normal;/u);
  assert.match(residualRule, /font-weight: 400;/u);
  assert.doesNotMatch(residualRule, /monospace|SFMono|Menlo|Consolas/u);
});

test("Ledger neighbor-group lines match the left-panel normal text size", () => {
  const css = readRepoFile("src/apps/lattice-lab/lattice-lab.css");
  const shellRule = css.match(
    /\.lattice-lab-ledger-shell \{([\s\S]*?)\n\}/u,
  )?.[1] ?? "";
  const factValueRule = css.match(
    /\.lattice-lab-facts dd \{([\s\S]*?)\n\}/u,
  )?.[1] ?? "";
  assert.match(shellRule, /font-size: 11px;/u);
  assert.match(factValueRule, /font-size: 11px;/u);
});

test("collapsed Show calculation matches the left-panel normal text size", () => {
  const css = readRepoFile("src/apps/lattice-lab/lattice-lab.css");
  const summaryRule = css.match(
    /\.lattice-lab-ledger-calculation summary \{([\s\S]*?)\n\}/u,
  )?.[1] ?? "";
  const scopeRule = css.match(
    /\.lattice-lab-ledger-calculation-scope \{([\s\S]*?)\n\}/u,
  )?.[1] ?? "";
  const rowRule = [...css.matchAll(
    /\.lattice-lab-ledger-calculation-row \{([\s\S]*?)\n\}/gu,
  )].map((match) => match[1]).find((rule) => /font-size:/u.test(rule)) ?? "";
  assert.match(summaryRule, /font-size: 11px;/u);
  assert.match(scopeRule, /font-size: 9px;/u);
  assert.match(rowRule, /font-size: 8px;/u);
});

test("uniaxial deformation changes only semantic X monotonically at every beta", () => {
  const position = [4, -3, 2];
  const samples = [0, 0.01, 0.25, 0.5, 0.75, 0.99, 1].map((beta) => {
    const factor = xAxisScaleFromDeformationBeta(beta);
    return {
      beta,
      factor,
      position: createUniaxialDeformedPosition(position, {
        axis: "x",
        factor,
      }),
    };
  });
  assert.deepEqual(samples[0].position, position);
  assert.deepEqual(samples.at(-1).position, [0.04, -3, 2]);
  samples.forEach(({ factor, position: deformed }) => {
    assert.equal(deformed[0], position[0] * factor);
    assert.equal(deformed[1], position[1]);
    assert.equal(deformed[2], position[2]);
  });
  samples.slice(1).forEach((sample, index) => {
    assert.ok(sample.factor < samples[index].factor);
    assert.ok(Math.abs(sample.position[0]) < Math.abs(samples[index].position[0]));
  });

  const source = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  assert.match(source, /referenceDisplayScale/u);
  assert.match(source, /referenceRepeatRadius/u);
  assert.doesNotMatch(
    source,
    /miniatureRoot\.scale\.setScalar\(1\.95 \/ repeatRadius\)/u,
  );
});

test("maximum deformation aggregates coincident columns and partitions lines", () => {
  const sites = [
    { id: "a", position: [0, 0, 0] },
    { id: "b", position: [0.01, 0, 0] },
    { id: "c", position: [0, 1, 0] },
    { id: "d", position: [0.01, 1, 0] },
  ];
  const edges = [
    { id: "ab", fromSiteId: "a", toSiteId: "b" },
    { id: "cd", fromSiteId: "c", toSiteId: "d" },
    { id: "ac", fromSiteId: "a", toSiteId: "c" },
    { id: "bd", fromSiteId: "b", toSiteId: "d" },
  ];
  const aggregation = createEndpointVisualAggregation(sites, edges, 0.02);
  assert.deepEqual(
    aggregation.collapsedGroups.map(({ memberIds }) => memberIds),
    [["a", "b"], ["c", "d"]],
  );
  assert.deepEqual(aggregation.internalEdgeIds, ["ab", "cd"]);
  assert.deepEqual(aggregation.externalEdges.map(({ id }) => id), ["ac"]);
  assert.deepEqual(aggregation.redundantExternalEdgeIds, ["bd"]);
  assert.deepEqual(aggregation.collapsedGroups[0].position, [0.005, 0, 0]);

  const source = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  assert.match(source, /const endpointActive = deformationBeta === 1/u);
  assert.match(source, /endpoint-aggregate-site-group/u);
  assert.match(source, /ENDPOINT_AGGREGATE_COLOR/u);
  assert.match(source, /mainEndpointAggregation\.groups\.forEach/u);
  assert.match(source, /\[\.\.\.siteMeshes\.keys\(\)\]\.map/u);
  assert.doesNotMatch(
    source,
    /mainEndpointAggregation = createEndpointVisualAggregation\(\s*caseRecord\.sites/u,
  );
  assert.match(source, /miniatureEndpointAggregation\.groups\.forEach/u);
  assert.match(source, /mesh\.visible = !endpointActive/u);
  assert.match(source, /selectionCircleColor = "purple"/u);
  assert.match(
    source,
    /purple endpoint ["'` +\n]*aggregate marked by a purple outer selection circle/u,
  );
  assert.match(source, /endpointDisplayTreatment = endpointActive/u);
  assert.match(source, /endpointRepeatHighlightVisible/u);
  assert.match(source, /endpointRepeatHighlightCanonicalEdgeCount/u);
  assert.match(source, /endpointRepeatHighlightEdgeIdentities/u);
  assert.doesNotMatch(source, /repeat-cell-endpoint-aggregate-highlight/u);
  assert.doesNotMatch(source, /repeat-cell-endpoint-edge-bundle/u);
});

test("every deformation status uses the concise beta endpoint wording", () => {
  const source = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  const compressionPresentation = source.match(
    /function updateCompressionPresentation\(message = ""\) \{([\s\S]*?)\n  function applyCompressionControls/u,
  )?.[1] ?? "";
  assert.match(source, /β = 1 is the maximum deformation\./u);
  assert.doesNotMatch(
    source,
    /maximum supported non-?degenerate deformation|supported nondegenerate/u,
  );
  assert.doesNotMatch(
    compressionPresentation,
    /Net acceleration is zero at every architrino\./u,
  );
  assert.doesNotMatch(
    compressionPresentation,
    /ledger recalculates every|included contribution for this displayed finite configuration/u,
  );
  assert.doesNotMatch(
    source,
    /declared repeating-pattern symmetry certificate covers every|inequivalent receiver class at this setting/u,
  );
  assert.match(
    source,
    /caseRecord\.id === "hcp-abab-layers-v1"[\s\S]*complete periodic acceleration result is therefore ["' +\n]*not established at this setting\./u,
  );
});

test("Simple Cubic overview copy is not retained after the card removal", () => {
  const source = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  const checkerboard = createSimpleCubicCheckerboardCase();
  assert.equal(
    checkerboard.polarityRule,
    "alternating polarity at every nearest-neighbor step",
  );
  assert.equal(checkerboard.title, "Simple Cubic");
  assert.equal("primerTitle" in checkerboard, false);
  assert.equal("primerParagraphs" in checkerboard, false);
  assert.doesNotMatch(
    source,
    /What You Are Seeing|whatSeeing|seeingTitle|learnerOverview|Every architrino has six near neighbors of the opposite polarity\.|Every architrino has twelve far neighbors of the same polarity\./u,
  );
});

test("every case uses near, far, and total neighbor facts without Calculation scope", () => {
  const source = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  assert.match(
    source,
    /dom\.caseGeometry\.textContent =\s*\n\s*`\$\{caseRecord\.geometryLabel\}; \$\{caseRecord\.polarityRule\}`;/u,
  );
  const presentation = source.match(
    /function updateCaseRecordPresentation\(\) \{([\s\S]*?)\n  function updateConfigurationPresentation/u,
  )?.[1] ?? "";
  assert.doesNotMatch(
    presentation,
    /caseGeometry\.textContent[\s\S]{0,400}(?:β|deformation|scale|static X)/u,
  );
  assert.doesNotMatch(presentation, /caseScope|calculationBoundaryTreatment/u);
  const html = readRepoFile("lattice-lab.html");
  assert.match(html, /id="lattice-lab-case-facts"/u);
  assert.doesNotMatch(
    html,
    /lattice-lab-case-scope|<dt>Calculation scope<\/dt>|Displayed local total/u,
  );
  assert.match(
    html,
    /<dt>Near neighbors<\/dt>\s*<dd id="lattice-lab-case-nearest"><\/dd>[\s\S]*<dt>Far neighbors<\/dt>\s*<dd id="lattice-lab-case-next"><\/dd>[\s\S]*<dt>Total neighbors<\/dt>\s*<dd id="lattice-lab-case-local-total"><\/dd>/u,
  );
  assert.doesNotMatch(
    html,
    /<dt>(?:Nearest shell|Next local shell|Local total|Local total neighbors)<\/dt>/u,
  );
  assert.match(
    source,
    /String\(\s*caseRecord\.nearestShell\.count \+ caseRecord\.nextLocalShell\.count/u,
  );
  const gallery = createLatticeLabCaseGallery();
  gallery.forEach((caseRecord) => {
    assert.equal(
      caseRecord.nearestShell.count + caseRecord.nextLocalShell.count,
      caseRecord.shells.reduce((total, shell) => total + shell.expectedCount, 0),
      caseRecord.id,
    );
  });
  assert.match(html, /id="lattice-lab-ledger-calculation-scope"/u);
});

test("checkerboard case facts expose bare near, far, and total neighbor values", () => {
  const source = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  assert.match(source, /"6 at distance d"/u);
  assert.match(source, /"12 at distance √2d"/u);
  assert.doesNotMatch(source, /"(?:6|12) neighbors at distance/u);
  const checkerboard = createSimpleCubicCheckerboardCase();
  assert.equal(checkerboard.nearestShell.count, 6);
  assert.equal(checkerboard.nextLocalShell.count, 12);
  assert.equal(
    checkerboard.nearestShell.count + checkerboard.nextLocalShell.count,
    18,
  );
});

test("gallery cases expose canonical unpolarized conventional cells", () => {
  const gallery = createLatticeLabCaseGallery();
  const expected = new Map([
    ["simple-cubic-checkerboard-v1", [8, 12, 0, "conventional-parallelepiped"]],
    ["bcc-two-sublattice-v1", [9, 12, 8, "conventional-parallelepiped"]],
    ["fcc-alternating-planes-v1", [14, 12, 36, "conventional-parallelepiped"]],
    ["hcp-abab-layers-v1", [17, 18, 45, "conventional-hexagonal-prism"]],
    ["simple-cubic-alternating-planes-v1", [8, 12, 0, "conventional-parallelepiped"]],
    ["diamond-cubic-two-sublattice-v1", [18, 12, 16, "conventional-parallelepiped"]],
    ["simple-cubic-random-finite-fifty-fifty-v1", [8, 12, 12, "conventional-parallelepiped"]],
  ]);
  gallery.forEach((caseRecord) => {
    const pattern = caseRecord.unpolarizedLatticePattern;
    assert.ok(pattern, caseRecord.id);
    assert.deepEqual(
      [
        pattern.sites.length,
        pattern.frameSegments.length,
        pattern.relationshipSegments.length,
        pattern.kind,
      ],
      expected.get(caseRecord.id),
      caseRecord.id,
    );
    pattern.sites.forEach((site) => {
      assert.equal("polarity" in site, false, `${caseRecord.id}:${site.id}`);
      assert.equal(site.position.length, 3);
      assert.ok(site.position.every(Number.isFinite));
    });
    pattern.frameSegments.forEach((segment) => {
      assert.equal(segment.start.length, 3);
      assert.equal(segment.end.length, 3);
    });
    const siteById = new Map(pattern.sites.map((site) => [site.id, site]));
    const relationshipPairIds = new Set();
    pattern.relationshipSegments.forEach((segment) => {
      assert.ok(siteById.has(segment.fromSiteId), segment.id);
      assert.ok(siteById.has(segment.toSiteId), segment.id);
      assert.notEqual(segment.fromSiteId, segment.toSiteId, segment.id);
      const pairId = [segment.fromSiteId, segment.toSiteId].sort().join("|");
      assert.equal(relationshipPairIds.has(pairId), false, pairId);
      relationshipPairIds.add(pairId);
      const distance = Math.hypot(...segment.end.map(
        (value, axis) => value - segment.start[axis],
      ));
      assert.ok(Math.abs(distance - 1) < 1e-7, `${segment.id}:${distance}`);
      assert.ok(Math.abs(segment.canonicalDistance - 1) < 1e-7, segment.id);
    });
  });
  const patternFor = (caseId) => gallery.find(({ id }) => id === caseId)
    .unpolarizedLatticePattern;
  const near = (left, right) => Math.abs(left - right) < 1e-9;
  assert.equal(
    patternFor("simple-cubic-checkerboard-v1").sites.every(({ position }) =>
      position.every((value) => near(Math.abs(value), 0.5))
    ),
    true,
  );
  assert.equal(
    patternFor("bcc-two-sublattice-v1").sites.filter(({ position }) =>
      position.every((value) => near(value, 0))
    ).length,
    1,
  );
  assert.equal(
    patternFor("fcc-alternating-planes-v1").sites.filter(({ position }) =>
      position.filter((value) => near(value, 0)).length === 2
    ).length,
    6,
  );
  const hcpPattern = patternFor("hcp-abab-layers-v1");
  const hcpC = Math.sqrt(8 / 3);
  assert.deepEqual(
    [-hcpC / 2, 0, hcpC / 2].map((z) =>
      hcpPattern.sites.filter(({ position }) => near(position[2], z)).length
    ),
    [7, 3, 7],
  );
  const diamondA = 4 / Math.sqrt(3);
  assert.equal(
    patternFor("diamond-cubic-two-sublattice-v1").sites.filter(
      ({ position }) => position.every((value) =>
        near(Math.abs(value), diamondA / 4)
      ),
    ).length,
    4,
  );
});

test("unpolarized in-cell nearest-neighbor networks have exact honest degrees", () => {
  const gallery = createLatticeLabCaseGallery();
  const expected = new Map([
    ["bcc-two-sublattice-v1", { count: 8, degrees: { 1: 8, 8: 1 }, overlaps: 0 }],
    ["fcc-alternating-planes-v1", { count: 36, degrees: { 3: 8, 8: 6 }, overlaps: 0 }],
    ["hcp-abab-layers-v1", { count: 45, degrees: { 4: 12, 8: 3, 9: 2 }, overlaps: 12 }],
    ["diamond-cubic-two-sublattice-v1", { count: 16, degrees: { 0: 4, 1: 4, 2: 6, 4: 4 }, overlaps: 0 }],
    ["simple-cubic-random-finite-fifty-fifty-v1", { count: 12, degrees: { 3: 8 }, overlaps: 12 }],
  ]);
  expected.forEach(({ count, degrees, overlaps }, caseId) => {
    const pattern = gallery.find(({ id }) => id === caseId)
      .unpolarizedLatticePattern;
    const degreeBySiteId = new Map(pattern.sites.map(({ id }) => [id, 0]));
    pattern.relationshipSegments.forEach(({ fromSiteId, toSiteId }) => {
      degreeBySiteId.set(fromSiteId, degreeBySiteId.get(fromSiteId) + 1);
      degreeBySiteId.set(toSiteId, degreeBySiteId.get(toSiteId) + 1);
    });
    const histogram = Object.fromEntries(
      [...degreeBySiteId.values()].reduce((entries, degree) => {
        entries.set(degree, (entries.get(degree) ?? 0) + 1);
        return entries;
      }, new Map()),
    );
    assert.equal(pattern.relationshipSegments.length, count, caseId);
    assert.deepEqual(histogram, degrees, caseId);
    assert.equal(pattern.relationshipFrameOverlapCount, overlaps, caseId);
    assert.equal(pattern.relationshipCoverage, "represented-endpoints-only");
  });
});

test("overview and Primer removal leaves no card-only content hooks", () => {
  const gallery = createLatticeLabCaseGallery();
  gallery.forEach((caseRecord) => {
    assert.equal("primerTitle" in caseRecord, false, caseRecord.id);
    assert.equal("primerParagraphs" in caseRecord, false, caseRecord.id);
    assert.equal("teachingNote" in caseRecord, false, caseRecord.id);
    assert.equal("learnerOverview" in caseRecord, false, caseRecord.id);
  });
  const runtime = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  const html = readRepoFile("lattice-lab.html");
  const css = readRepoFile("src/apps/lattice-lab/lattice-lab.css");
  assert.doesNotMatch(html, /What You Are Seeing|lattice-lab-seeing|lattice-lab-what-seeing/u);
  assert.doesNotMatch(runtime, /seeingTitle|whatSeeing|learnerOverview/u);
  assert.doesNotMatch(css, /lattice-lab-seeing/u);
});

test("endpoint highlight grouping suppresses aggregate bundles, not internal links", () => {
  const sites = [
    { id: "left-a", position: [0, 0, 0] },
    { id: "left-b", position: [0.01, 0, 0] },
    { id: "right-a", position: [1, 0, 0] },
    { id: "right-b", position: [1.01, 0, 0] },
  ];
  const aggregation = createEndpointVisualAggregation(
    sites,
    [
      { id: "left-a|right-a", fromSiteId: "left-a", toSiteId: "right-a" },
      { id: "left-b|right-b", fromSiteId: "left-b", toSiteId: "right-b" },
      { id: "left-a|left-b", fromSiteId: "left-a", toSiteId: "left-b" },
    ],
    0.1,
  );

  assert.deepEqual(
    createEndpointHighlightGroupPairIds(aggregation, [
      { fromSiteId: "left-b", toSiteId: "right-b" },
    ]),
    ["endpoint-group-0-left-a+left-b|endpoint-group-1-right-a+right-b"],
  );
  assert.deepEqual(
    createEndpointHighlightGroupPairIds(aggregation, [
      { fromSiteId: "left-a", toSiteId: "left-b" },
    ]),
    [],
  );

  const source = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  assert.match(
    source,
    /selectedEndpointGroupPairIds\.has\(endpointGroupPairId\)/u,
  );
  assert.match(source, /endpointOrdinaryHighlightOverlapCount/u);
});

test("simple-cubic checkerboard fills the spherical crop with an exactly neutral population", () => {
  const caseRecord = createSimpleCubicCheckerboardCase();
  const polarities = createReferencePolarityState(caseRecord);

  assert.equal(caseRecord.sites.length, 88);
  assert.deepEqual(countLatticePolarities(polarities), {
    electrino: 44,
    positrino: 44,
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
  assert.equal("boundaryTreatment" in caseRecord, false);
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

test("deformation beta maps 0 to undeformed and 1 to maximum supported scale", () => {
  assert.equal(xAxisScaleFromDeformationBeta(0), 1);
  assert.equal(xAxisScaleFromDeformationBeta(1), 0.01);
  assert.equal(xAxisScaleFromDeformationBeta(0.5), 0.505);
  assert.throws(
    () => xAxisScaleFromDeformationBeta(-0.01),
    /0 <= beta <= 1/u,
  );
  assert.throws(
    () => xAxisScaleFromDeformationBeta(1.01),
    /0 <= beta <= 1/u,
  );
});

test("trackball drag permits full 3D rotation and tilts the projected Y axis", () => {
  const rect = { left: 0, top: 0, width: 400, height: 400 };
  const center = projectTrackballPoint(200, 200, rect);
  const first = projectTrackballPoint(300, 245, rect);
  const second = projectTrackballPoint(245, 105, rect);
  assert.deepEqual(center.map((value) => Math.abs(value)), [0, 0, 1]);
  const firstQuaternion = applyTrackballDragQuaternion(
    [0, 0, 0, 1],
    center,
    first,
  );
  const fullQuaternion = applyTrackballDragQuaternion(
    firstQuaternion,
    first,
    second,
  );
  const magnitude = Math.hypot(...fullQuaternion);
  assert.ok(Math.abs(magnitude - 1) < 1e-12);
  assert.ok(Math.abs(fullQuaternion[2]) > 0.05, "trackball must permit roll");

  const [qx, qy, qz, qw] = fullQuaternion;
  const yAxis = [
    2 * (qx * qy - qw * qz),
    1 - 2 * (qx * qx + qz * qz),
    2 * (qy * qz + qw * qx),
  ];
  assert.ok(Math.abs(yAxis[0]) > 0.05, "projected Y axis must be able to tilt");
});

test("default display orientation is Z-up without remapping model axes", () => {
  const [qx, qy, qz, qw] = createDefaultOrientationQuaternion();
  const projectedZ = [
    2 * (qx * qz + qw * qy),
    2 * (qy * qz - qw * qx),
    1 - 2 * (qx * qx + qy * qy),
  ];
  assert.ok(Math.abs(projectedZ[0]) < 1e-12);
  assert.ok(projectedZ[1] > 0.2);
  assert.ok(Math.abs(projectedZ[2]) > 0.2);
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
  createLatticeLabCaseGallery()
    .filter((caseRecord) => caseRecord.repeatCell)
    .forEach((caseRecord) => {
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
  const fcc = createLatticeLabCaseGallery().find(
    ({ id }) => id === "fcc-alternating-planes-v1",
  );
  const fccNetwork = createRepeatCellNearestNeighborNetwork(fcc);
  assert.equal(fcc.repeatCell.sites.length, 2);
  assert.equal(fccNetwork.continuationSites.length, 18);
  assert.equal(
    fcc.repeatCell.contextPresentation,
    "owned-cell-with-continuation",
  );
});
});

test("checkerboard periodic network rejects diagonal graph bridges", () => {
  const checkerboard = createSimpleCubicCheckerboardCase();
  const network = createRepeatCellNearestNeighborNetwork(checkerboard);
  const expectedUncompressedEdgeIdentities = [
    "-0.5,0,0|0.5,0,0",
    "-0.5,0,0|-1.5,0,0",
    "-0.5,-1,0|-0.5,0,0",
    "-0.5,0,0|-0.5,0,1",
    "-0.5,0,-1|-0.5,0,0",
    "-0.5,0,0|-0.5,1,0",
    "0.5,-1,0|0.5,0,0",
    "0.5,0,0|0.5,0,1",
    "0.5,0,-1|0.5,0,0",
    "0.5,0,0|0.5,1,0",
    "0.5,0,0|1.5,0,0",
    "-0.5,-1,0|0.5,-1,0",
    "-0.5,0,1|0.5,0,1",
    "-0.5,0,-1|0.5,0,-1",
    "-0.5,1,0|0.5,1,0",
  ];
  const expectedCompressedEdgeIdentities = [
    "-0.5,0,0|0.5,0,0",
    "-0.5,0,0|-1.5,0,0",
    "0.5,0,0|1.5,0,0",
    "-0.5,-1,0|0.5,-1,0",
    "-0.5,0,1|0.5,0,1",
    "-0.5,0,-1|0.5,0,-1",
    "-0.5,1,0|0.5,1,0",
  ];
  assert.equal(network.relationships.length, 12);
  assert.equal(network.edges.length, 15);
  assert.deepEqual(
    network.edges.map((edge) => edge.id),
    expectedUncompressedEdgeIdentities,
  );
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
  const uncompressed = selectShortestTransformedRepeatCellEdges(
    network.edges,
  );
  assert.equal(uncompressed.selected.length, 15);
  assert.equal(uncompressed.excluded.length, 0);
  assert.equal(uncompressed.nearestDistance, 1);
  assert.deepEqual(
    uncompressed.selected.map(({ edge }) => edge.id),
    expectedUncompressedEdgeIdentities,
  );
  const compressed = selectShortestTransformedRepeatCellEdges(
    network.edges,
    { compressionAxis: "x", compressionFactor: 0.4 },
  );
  assert.equal(compressed.selected.length, 7);
  assert.equal(compressed.excluded.length, 8);
  assert.ok(Math.abs(compressed.nearestDistance - 0.4) < 1e-12);
  assert.deepEqual(
    compressed.selected.map(({ edge }) => edge.id),
    expectedCompressedEdgeIdentities,
  );
  assert.equal(
    compressed.excluded.every((row) =>
      Math.abs(row.transformedDistance - 1) < 1e-12
    ),
    true,
  );
});

test("checkerboard miniature and central highlight consume one canonical edge identity set", () => {
  const checkerboard = createSimpleCubicCheckerboardCase();
  let referenceIdentities = null;
  [1, 0.505, 0.01].forEach((compressionFactor) => {
    const graph = createRepeatCellDisplayGraph(checkerboard, {
      compressionAxis: "x",
      compressionFactor,
    });
    assert.equal(graph.edgeIdentities.length, 15);
    assert.equal(graph.excludedEdges.length, 0);
    assert.equal(
      new Set(graph.edgeIdentities).size,
      graph.edgeIdentities.length,
    );
    assert.deepEqual(
      graph.edgeIdentities,
      graph.edges.map(({ edge }) => edge.id),
    );
    referenceIdentities ??= graph.edgeIdentities;
    assert.deepEqual(graph.edgeIdentities, referenceIdentities);
  });
  const runtime = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  assert.match(
    runtime,
    /rebuildMiniatureNetwork\(repeatCellDisplayGraph\);[\s\S]*rebuildRepeatCellHighlight\(repeatCellDisplayGraph\);/u,
  );
  assert.match(
    runtime,
    /displayEdgeIdentities[\s\S]*displayGraph\.edgeIdentities\.join\(";"\)/u,
  );
  assert.match(
    runtime,
    /repeatHighlightCanonicalEdgeIdentities[\s\S]*displayGraph\.edgeIdentities\.join\(";"\)/u,
  );
  assert.match(runtime, /const visibleEdgeRows = edgeRows\.filter/u);
  assert.match(runtime, /const croppedEdgeRows = edgeRows\.filter/u);
  assert.match(
    runtime,
    /repeatHighlightEdgeIdentities[\s\S]*visibleEdgeRows\.map/u,
  );
  assert.match(runtime, /repeatHighlightCroppedEdgeIdentities/u);
  assert.doesNotMatch(
    runtime,
    /central highlight is missing a displayed periodic-image endpoint/u,
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

    if (!caseRecord.repeatCell) {
      return;
    }

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
  createLatticeLabCaseGallery()
    .filter((caseRecord) => caseRecord.repeatCell)
    .forEach((caseRecord) => {
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
    "simple-cubic-random-finite-fifty-fifty-v1",
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
    if (caseRecord.repeatCell) {
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
    } else {
      assert.equal(caseRecord.calculationScope, "finite-nonperiodic");
    }
    assert.equal(
      caseRecord.sites.every(
        (site) => Math.hypot(...site.position) <= caseRecord.displayRadius + 1e-9,
      ),
      true,
      `${caseRecord.id} spherical crop`,
    );
    assert.equal("boundaryTreatment" in caseRecord, false, caseRecord.id);
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
      [6, 1, [2, 4]],
      [12, Math.SQRT2, [8, 4]],
    ],
    "diamond-cubic-two-sublattice-v1": [
      [4, 1, [0, 4]],
      [12, 4 / Math.sqrt(6), [12, 0]],
    ],
  };

  createLatticeLabCaseGallery()
    .filter((caseRecord) => expected[caseRecord.id])
    .forEach((caseRecord) => {
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

test("deterministic gallery cases use periodic certificates while Random remains finite", () => {
  createLatticeLabCaseGallery().forEach((caseRecord) => {
    const randomFinite = caseRecord.calculationScope === "finite-nonperiodic";
    const ledger = createSelectedSiteLedger(
      caseRecord,
      createReferencePolarityState(caseRecord),
      caseRecord.defaultSiteId,
    );
    assert.equal(ledger.certificateApplies, !randomFinite, caseRecord.id);
    assert.equal(
      ledger.accelerationRowsAvailable,
      true,
      caseRecord.id,
    );
    if (randomFinite) {
      assert.equal(ledger.rows.length, caseRecord.sites.length - 1);
      assert.equal(ledger.certificateApplies, false);
    } else {
      assert.doesNotMatch(
        `${caseRecord.evidenceStatus} ${caseRecord.accelerationStatus} ` +
          `${caseRecord.calculationBoundaryTreatment}`,
        /displayed sites|finite spherical|finite-displayed/u,
        caseRecord.id,
      );
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

test("XYZ key uses centered symmetric unit axes with labels beyond positive endpoints", () => {
  for (const [axis, projectedVector] of [
    ["x", [1, 0]],
    ["y", [0, 1]],
    ["z", [-Math.SQRT1_2, Math.SQRT1_2]],
    ["z", [0, 0]],
  ]) {
    const layout = createTripodAxisLayout(axis, projectedVector);
    assert.deepEqual(
      [
        (layout.negativeEndpoint.x + layout.positiveEndpoint.x) / 2,
        (layout.negativeEndpoint.y + layout.positiveEndpoint.y) / 2,
      ],
      [72, 66],
      axis,
    );
    const positiveArm = [
      layout.positiveEndpoint.x - 72,
      layout.positiveEndpoint.y - 66,
    ];
    const negativeArm = [
      layout.negativeEndpoint.x - 72,
      layout.negativeEndpoint.y - 66,
    ];
    negativeArm.forEach((value, index) => {
      assert.ok(Math.abs(value + positiveArm[index]) < 1e-10, axis);
    });
    const labelOffset = [
      layout.labelPosition.x - layout.positiveEndpoint.x,
      layout.labelPosition.y - layout.positiveEndpoint.y,
    ];
    assert.ok(Math.abs(Math.hypot(...labelOffset) - 10) < 1e-10, axis);
    if (Math.hypot(...positiveArm) > 1e-7) {
      assert.ok(
        labelOffset[0] * positiveArm[0] +
          labelOffset[1] * positiveArm[1] > 0,
        axis,
      );
    }
  }
  assert.throws(
    () => createTripodAxisLayout("q", [1, 0]),
    /must be x, y, or z/u,
  );
});

test("Lattice Lab page keeps the shared standalone navigation strip without Borg diagnostics", () => {
  const html = readRepoFile("lattice-lab.html");
  const css = readRepoFile("src/apps/lattice-lab/lattice-lab.css");
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
    /id="lattice-lab-tripod"[\s\S]*viewBox="0 0 144 132"/u,
  );
  assert.match(
    html,
    /id="lattice-lab-miniature-canvas"[\s\S]*tabindex="0"[\s\S]*aria-label="Interactive repeat-cell view"/u,
  );
  assert.match(html, /Polarized Repeat Pattern/u);
  assert.equal(html.match(/Polarized Repeat Pattern/gu)?.length, 1);
  assert.match(
    html,
    /class="lattice-lab-miniature-card" aria-labelledby="lattice-lab-miniature-title"[\s\S]*<span id="lattice-lab-miniature-title">Polarized Repeat Pattern<\/span>/u,
  );
  assert.match(html, /Unpolarized Repeat Pattern/u);
  assert.equal(html.match(/Unpolarized Repeat Pattern/gu)?.length, 1);
  assert.doesNotMatch(
    html,
    /Unpolarized Lattice Pattern|How This Pattern Repeats/u,
  );
  assert.ok(
    html.indexOf('id="lattice-lab-unpolarized-card"') <
      html.indexOf('id="lattice-lab-miniature-card"'),
  );
  assert.match(
    html,
    /id="lattice-lab-unpolarized-card"[\s\S]*class="lattice-lab-miniature-card lattice-lab-unpolarized-card"[\s\S]*aria-labelledby="lattice-lab-unpolarized-title"[\s\S]*id="lattice-lab-unpolarized-canvas"[\s\S]*role="img"/u,
  );
  assert.match(
    html,
    /id="lattice-lab-unpolarized-canvas"[\s\S]*role="img"[\s\S]*tabindex="0"/u,
  );
  assert.doesNotMatch(html, /Polarity Repeat Cell|lattice-lab-miniature-kind/u);
  assert.match(html, /id="lattice-lab-repeat-highlight"[\s\S]*type="checkbox"/u);
  assert.match(
    html,
    /<div class="lattice-lab-miniature-viewport">[\s\S]*id="lattice-lab-miniature-canvas"[\s\S]*<label class="lattice-lab-repeat-highlight-control">\s*<input id="lattice-lab-repeat-highlight" type="checkbox">[\s\S]*<\/div>\s*<\/section>/u,
  );
  assert.doesNotMatch(
    html,
    /Copy this colored tile by translation to continue the pattern\.|lattice-lab-miniature-state/u,
  );
  assert.doesNotMatch(
    html,
    /Translation rule|lattice-lab-repeat-rule|lattice-lab-repeat-vector-[abc]|fixed-distance nearest-neighbor edges/u,
  );
  assert.equal(html.includes("lattice-lab-miniature-legend"), false);
  assert.equal(html.includes("Synchronized orientation"), false);
  assert.match(html, /id="lattice-lab-case-select"/u);
  assert.equal(
    html.match(/Exploring static architrino lattices\./gu)?.length,
    1,
  );
  assert.match(
    css,
    /\.lattice-lab-title p \{[\s\S]*font-size: 11px;[\s\S]*white-space: nowrap;/u,
  );
  assert.doesNotMatch(html, /Site ledger is being redesigned\./u);
  assert.equal(html.includes("Selected-Site Ledger"), false);
  assert.match(html, /id="lattice-lab-ledger-result"/u);
  assert.match(html, /id="lattice-lab-ledger-shells"/u);
  assert.match(
    html,
    /class="lattice-lab-ledger"[\s\S]*aria-labelledby="lattice-lab-ledger-title"[\s\S]*<span id="lattice-lab-ledger-title">Ledger<\/span>/u,
  );
  assert.equal(html.match(/>Ledger</gu)?.length, 1);
  assert.equal(html.match(/id="lattice-lab-ledger"/gu)?.length, 1);
  assert.ok(
    html.indexOf("lattice-lab-shared-conventions") <
      html.indexOf('id="lattice-lab-ledger"'),
  );
  assert.ok(
    html.indexOf('id="lattice-lab-ledger"') <
      html.indexOf('<main class="lattice-lab-stage">'),
  );
  assert.doesNotMatch(html, /lattice-lab-ledger-statement/u);
  assert.doesNotMatch(html, /Site Ledger/u);
  assert.doesNotMatch(html, /<h2 id="lattice-lab-ledger-title">/u);
  assert.match(
    html,
    /id="lattice-lab-ledger-calculation"[\s\S]*<summary>Show calculation<\/summary>/u,
  );
  assert.match(html, /Normalized contribution/u);
  assert.match(html, /Running local sum/u);
  assert.equal(html.includes("Scope and calculation basis"), false);
  assert.equal(html.includes("lattice-lab-configuration-state"), false);
  const activeCaseRecord = html.slice(
    html.indexOf('id="lattice-lab-case-title"'),
    html.indexOf("lattice-lab-compression-card"),
  );
  assert.doesNotMatch(activeCaseRecord, /Equal-count gallery|Display shape/u);
  assert.doesNotMatch(activeCaseRecord, /Boundary treatment/u);
  assert.doesNotMatch(activeCaseRecord, /lattice-lab-case-boundary/u);
  assert.doesNotMatch(activeCaseRecord, /light-purple lines show/u);
  assert.ok(
    html.indexOf("lattice-lab-compression-card") <
      html.indexOf("lattice-lab-shared-conventions"),
  );
  assert.equal(html.match(/id="lattice-lab-compression-card"/gu)?.length, 1);
  assert.doesNotMatch(html, /Lattice Primer|lattice-lab-primer/u);
  assert.doesNotMatch(
    html,
    /lattice-lab-case-scope|<dt>Calculation scope<\/dt>|Displayed local total/u,
  );
  assert.equal(html.match(/<dt>Total neighbors<\/dt>/gu)?.length, 1);
  assert.match(
    html,
    /id="lattice-lab-shared-conventions"[\s\S]*aria-labelledby="lattice-lab-shared-conventions-title"[\s\S]*id="lattice-lab-shared-conventions-title"\s*class="lattice-lab-card-kicker"\s*>Shared Display Conventions<\/h2>/u,
  );
  const sharedConventionsCard = html.slice(
    html.indexOf('id="lattice-lab-shared-conventions"'),
    html.indexOf("</section>", html.indexOf('id="lattice-lab-shared-conventions"')),
  );
  assert.equal(sharedConventionsCard.match(/Shared Display Conventions/gu)?.length, 1);
  assert.equal(sharedConventionsCard.match(/lattice-lab-card-kicker/gu)?.length, 1);
  assert.equal(html.match(/<dt>Boundary treatment<\/dt>/gu)?.length, 1);
  assert.match(
    sharedConventionsCard,
    /The main display includes site centers within a spherical radius of 2\.75d\./u,
  );
  assert.doesNotMatch(html, /two and three-quarters times d/u);
  assert.doesNotMatch(sharedConventionsCard, /Current curated gallery/u);
  assert.match(
    html,
    /Every configuration in this curated gallery has equal numbers of electrinos and positrinos\./u,
  );
  assert.doesNotMatch(html, /Every configuration currently shown/u);
  assert.match(
    html,
    /population fact; equal counts do not establish that acceleration contributions balance or cancel\./u,
  );
  assert.match(
    html,
    /The sphere is a viewing crop of the shown configuration, not a physical boundary\./u,
  );
  assert.doesNotMatch(html, /calculation-exhaustion rule/u);
  assert.match(
    html,
    /Thicker lines show near-neighbor relationships; thinner lines show far-neighbor relationships\./u,
  );
  assert.doesNotMatch(
    html,
    /Light-purple lines show nearest-neighbor geometry|not bonds, wakes, or acceleration vectors/u,
  );
  assert.equal(html.includes("lattice-lab-selected-site"), false);
  assert.equal(html.includes("Display-only core"), false);
  assert.equal(html.includes("lattice-lab-swap-button"), false);
  assert.equal(html.includes("Two-site polarity swap"), false);
  assert.equal(html.includes("lattice-lab-compression-axis"), false);
  assert.match(
    html,
    /id="lattice-lab-deformation-beta"[\s\S]*type="range"[\s\S]*min="0"[\s\S]*max="1"[\s\S]*value="0"[\s\S]*aria-label="Uniaxial deformation beta, 0 undeformed and 1 maximum"/u,
  );
  assert.doesNotMatch(html, /id="lattice-lab-compression-factor"|id="lattice-lab-compression-amount"/u);
  assert.match(html, /β = 0\.00/u);
  assert.match(
    html,
    /<h2 id="lattice-lab-case-title" class="lattice-lab-card-kicker"><\/h2>/u,
  );
  assert.doesNotMatch(
    html,
    /What You Are Seeing|What You’re Seeing|lattice-lab-seeing|lattice-lab-what-seeing/u,
  );
  assert.doesNotMatch(html, /Active case record/u);
  assert.match(
    html,
    /id="lattice-lab-compression-title"\s*class="lattice-lab-card-kicker"\s*>Uniaxial Deformation<\/h2>/u,
  );
  assert.ok(
    html.indexOf("lattice-lab-case-selector-card") <
      html.indexOf("lattice-lab-case-title"),
  );
  const runtime = readRepoFile("src/apps/lattice-lab/LatticeLabRuntime.js");
  assert.doesNotMatch(runtime, /primer|Primer/u);
  assert.doesNotMatch(css, /lattice-lab-primer/u);
  assert.match(runtime, /siteSelectionExplicit = true/u);
  assert.match(runtime, /createLatticeLabLedgerViewModel/u);
  assert.match(runtime, /renderLatticeLabLedgerViewModel/u);
});

test("Lattice Lab rendering keeps solid spheres fixed on screen and clips depth-tested geometry", () => {
  const html = readRepoFile("lattice-lab.html");
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
  assert.match(runtime, /createTripodAxisLayout\(axis, \[vector\.x, vector\.y\]\)/u);
  assert.match(runtime, /applyTrackballDragQuaternion/u);
  assert.doesNotMatch(runtime, /rootGroup\.rotation\.x = clamp/u);
  assert.match(
    runtime,
    /rootGroup\.quaternion\.set\(\.\.\.createDefaultOrientationQuaternion\(\)\)/u,
  );
  assert.match(css, /\.lattice-lab-ledger-outcome \{[\s\S]*font-size: 14px;/u);
  assert.match(
    css,
    /\.lattice-lab-ledger-result\[hidden\] \{\s*display: none;/u,
  );
  assert.doesNotMatch(css, /lattice-lab-seeing/u);
  assert.match(
    html,
    /id="lattice-lab-polarity-legend"[\s\S]*role="img"[\s\S]*aria-label="Polarity legend: red sphere, Positrino; blue sphere, Electrino"/u,
  );
  assert.match(html, /data-polarity="positrino"[\s\S]*Positrino/u);
  assert.match(html, /data-polarity="electrino"[\s\S]*Electrino/u);
  assert.ok(html.indexOf("data-polarity=\"positrino\"") <
    html.indexOf("data-polarity=\"electrino\""));
  assert.match(html, /data-material-reference="main-canvas-mesh-standard"/u);
  assert.match(
    html,
    /id="lattice-lab-positrino-swatch"[\s\S]*data-polarity="positrino"[\s\S]*width="16"[\s\S]*height="16"/u,
  );
  assert.match(
    html,
    /id="lattice-lab-electrino-swatch"[\s\S]*data-polarity="electrino"[\s\S]*width="16"[\s\S]*height="16"/u,
  );
  assert.match(css, /\.lattice-lab-polarity-swatch \{[\s\S]*width: 16px;[\s\S]*height: 16px;/u);
  assert.doesNotMatch(css, /lattice-lab-polarity-swatch[\s\S]{0,500}radial-gradient/u);
  assert.match(runtime, /createLegendSwatchRenderer\(dom\.positrinoSwatch, redMaterial\)/u);
  assert.match(runtime, /createLegendSwatchRenderer\(dom\.electrinoSwatch, blueMaterial\)/u);
  assert.match(runtime, /createSceneLights\(swatchScene\)/u);
  assert.match(runtime, /main-canvas-shared-sphere-material-and-lights/u);
  assert.match(runtime, /canvas\.dataset\.highlightDirection = "above-right"/u);
  assert.match(
    runtime,
    /updatePolarityLegendPlacement\(Boolean\(repeatCellDisplayGraph\)\)/u,
  );
  assert.match(
    runtime,
    /dom\.miniatureCard\.append\(dom\.polarityLegend\)[\s\S]*dataset\.placement = "polarized-repeat-pattern"/u,
  );
  assert.match(
    runtime,
    /dom\.miniatureCard\.dataset\.polarityLegendInside = "true"/u,
  );
  assert.match(
    runtime,
    /dom\.inspectorStack\.parentElement\.insertBefore\([\s\S]*dom\.polarityLegend,[\s\S]*dom\.inspectorStack,[\s\S]*dataset\.placement = "main-canvas"/u,
  );
  assert.match(
    css,
    /\.lattice-lab-miniature-card > \.lattice-lab-polarity-legend \{[\s\S]*right: 10px;[\s\S]*bottom: 10px;/u,
  );
  assert.match(
    css,
    /#lattice-lab-miniature-card\[data-polarity-legend-inside="true"\][\s\S]*\.lattice-lab-miniature-viewport \{[\s\S]*justify-self: start;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-miniature-card > div:first-child > span,/u,
  );
  assert.match(runtime, /markerDiameterPx = String\(2 \* MARKER_RADIUS_PX\)/u);
  assert.match(
    runtime,
    /rendererSiteDiameterPx =\s*\n\s*2 \* markerWorldRadius \* viewportHeight \/ \(2 \* cameraViewHalfHeight\)/u,
  );
  assert.match(runtime, /canvasRect\.right - inspectorRect\.left \+ 12/u);
  assert.match(runtime, /createRepeatCellNearestNeighborNetwork\(caseRecord\)/u);
  assert.match(
    runtime,
    /function rebuildRepeatCellHighlight\(displayGraph\)/u,
  );
  assert.match(runtime, /repeatHighlightGroup/u);
  assert.doesNotMatch(runtime, /repeat-cell-highlight-frame/u);
  assert.match(runtime, /repeat-cell-highlight-neighbor/u);
  assert.match(runtime, /const REPEAT_CELL_HIGHLIGHT_COLOR = 0xb79cff;/u);
  assert.match(runtime, /const REPEAT_CELL_HIGHLIGHT_RADIUS = 0\.0176;/u);
  assert.match(
    runtime,
    /new THREE\.CylinderGeometry\(\s*REPEAT_CELL_HIGHLIGHT_RADIUS,\s*REPEAT_CELL_HIGHLIGHT_RADIUS,/u,
  );
  assert.doesNotMatch(runtime, /new THREE\.CylinderGeometry\(0\.022, 0\.022, 1, 10\)/u);
  assert.doesNotMatch(runtime, /lineGroup\.visible/u);
  assert.match(
    runtime,
    /repeatCellHighlighted &&[\s\S]*selectedMainEdgeIdentities\.has\(mainEdgeIdentity\)[\s\S]*selectedEndpointGroupPairIds\.has\(endpointGroupPairId\)[\s\S]*line\.visible = false;[\s\S]*suppressedMainEdgeIdentities\.push\(mainEdgeIdentity\)/u,
  );
  assert.match(runtime, /suppressedNearestEdgeIdentities/u);
  assert.match(runtime, /endpointOrdinaryHighlightOverlapCount/u);
  assert.match(runtime, /repeatHighlightMainEdgeIdentities/u);
  assert.match(
    runtime,
    /object\.visible =\s*repeatCellHighlighted && object\.userData\.segmentFits !== false/u,
  );
  assert.match(runtime, /repeatHighlightEdgeCount/u);
  assert.match(
    runtime,
    /MARKER_RADIUS_PX \*[\s\S]*miniatureCamera\.top \/ miniatureViewportHeight/u,
  );
  assert.match(
    runtime,
    /if \(distance <= startRadius \+ endRadius\) \{[\s\S]*line\.visible = true;[\s\S]*line\.material = miniatureOverlapLineMaterial;[\s\S]*overlapMiniatureEdgeIdentities\.push/u,
  );
  assert.match(runtime, /overlapConnectorIdentities/u);
  assert.doesNotMatch(
    runtime,
    /SECONDARY_CONTEXT_MARKER_SCALE|continuationRedMaterial|continuationBlueMaterial|miniatureContextLineMaterial/u,
  );
  assert.match(runtime, /repeat-cell-owned-boundary/u);
  assert.match(runtime, /contextHierarchy = "uniform-ordinary-style"/u);
  assert.match(runtime, /baseMarkerMaterialReference/u);
  assert.match(runtime, /ownedMarkerDiameterPx/u);
  assert.match(runtime, /contextMarkerDiameterPx/u);
  assert.match(
    runtime,
    /const miniatureNeighborLineMaterial = new THREE\.LineBasicMaterial\(\{[\s\S]*color: GEOMETRY_LINE_COLOR,[\s\S]*opacity: GEOMETRY_LINE_OPACITY,[\s\S]*linewidth: GEOMETRY_LINE_WIDTH/u,
  );
  assert.match(
    runtime,
    /const neighborLineMaterial = new THREE\.LineBasicMaterial\(\{[\s\S]*color: GEOMETRY_LINE_COLOR,[\s\S]*opacity: GEOMETRY_LINE_OPACITY,[\s\S]*linewidth: GEOMETRY_LINE_WIDTH/u,
  );
  assert.match(
    runtime,
    /object\.isLine &&[\s\S]*Array\.isArray\(object\.userData\.startPosition\)[\s\S]*Array\.isArray\(object\.userData\.endPosition\)/u,
  );
  assert.match(runtime, /selected-calculation-target-circle/u);
  assert.match(runtime, /new THREE\.Sprite/u);
  assert.doesNotMatch(
    runtime,
    /selectionHalo|selectedRedMaterial|selectedBlueMaterial|emissiveIntensity: 0\.62|shadowBlur|AdditiveBlending/u,
  );
  assert.doesNotMatch(
    runtime,
    /createDottedDisplayEnvelope|createZPolarDisplayEnvelopePoint|display-envelope-visual-only|displayEnvelope/u,
  );
  assert.match(
    runtime,
    /const displayCropDiameterPx =[^;]+caseRecord\.displayRadius[\s\S]*dataset\.displayCropDiameterPx/u,
  );
  assert.match(runtime, /miniatureRoot\.quaternion\.copy\(rootGroup\.quaternion\)/u);
  assert.match(
    css,
    /#lattice-lab-miniature-canvas[\s\S]*cursor: grab;[\s\S]*pointer-events: auto;[\s\S]*touch-action: none;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-miniature-viewport \{[\s\S]*position: relative;[\s\S]*width: var\(--miniature-size\);[\s\S]*aspect-ratio: 1;/u,
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
    /\.lattice-lab-tripod \{[\s\S]*left: 16px;[\s\S]*bottom: 18px;[\s\S]*width: 144px;[\s\S]*height: 132px;[\s\S]*pointer-events: auto;[\s\S]*touch-action: none;/u,
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
    /\.lattice-lab-ledger \{[\s\S]*display: flex;[\s\S]*width: 100%;[\s\S]*height: 360px;[\s\S]*min-height: 320px;[\s\S]*flex-direction: column;[\s\S]*overflow: hidden;/u,
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
  assert.doesNotMatch(css, /lattice-lab-ledger-placeholder/u);
  assert.match(css, /\.lattice-lab-ledger-outcome \{[\s\S]*font-size: 14px;/u);
  assert.match(css, /\.lattice-lab-ledger-shells \{[\s\S]*display: grid;/u);
  assert.match(css, /\.lattice-lab-ledger-calculation summary/u);
  assert.match(
    css,
    /\.lattice-lab-ledger-calculation\[open\] \{[\s\S]*display: flex;[\s\S]*overflow: hidden;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-ledger-calculation\[open\] \.lattice-lab-ledger-calculation-body \{[\s\S]*overflow-y: auto;[\s\S]*overscroll-behavior-y: auto;/u,
  );
  assert.match(
    runtime,
    /dom\.ledger\.dataset\.randomConfiguration = randomization \? "true" : "false"/u,
  );
  assert.match(
    css,
    /\.lattice-lab-ledger-heading \{[\s\S]*position: relative;[\s\S]*z-index: 3;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-ledger\[data-random-configuration="true"\][\s\S]*\.lattice-lab-ledger-calculation\[open\] \{[\s\S]*inset: 40px 11px 11px;/u,
  );
  assert.match(
    html,
    /id="lattice-lab-ledger-calculation-body"[\s\S]*role="region"[\s\S]*aria-label="Calculation details"[\s\S]*tabindex="0"/u,
  );
  assert.match(
    runtime,
    /function resetLedgerDisclosure\(\) \{\s*dom\.ledgerCalculation\.open = false;\s*dom\.ledgerCalculationBody\.scrollTop = 0;\s*ledgerDisclosureScrollResetPending = true;\s*\}/u,
  );
  assert.match(
    runtime,
    /function selectCase\(caseId\) \{[\s\S]*if \(!nextCase \|\| nextCase === caseRecord\) \{[\s\S]*resetLedgerDisclosure\(\);[\s\S]*caseRecord = nextCase;/u,
  );
  assert.match(
    runtime,
    /function resetCase\(\) \{\s*resetLedgerDisclosure\(\);/u,
  );
  assert.match(
    runtime,
    /listen\(dom\.ledgerCalculationSummary, "keydown", \(event\) => \{[\s\S]*event\.key !== "Enter" && event\.key !== " "[\s\S]*event\.preventDefault\(\);[\s\S]*dom\.ledgerCalculation\.open = !dom\.ledgerCalculation\.open;/u,
  );
  assert.match(
    runtime,
    /listen\(dom\.ledgerCalculation, "toggle", \(\) => \{[\s\S]*ledgerDisclosureScrollResetPending[\s\S]*dom\.ledgerCalculationBody\.scrollTop = 0;[\s\S]*ledgerDisclosureScrollResetPending = false;/u,
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
  assert.doesNotMatch(runtime, /wireframe = true/u);
  assert.doesNotMatch(
    runtime,
    /miniatureState|lattice-lab-miniature-state|miniatureKind|lattice-lab-miniature-kind|dom\.population|lattice-lab-population/u,
  );
  assert.match(runtime, /function applyCompressionControls\(\)/u);
  assert.match(
    runtime,
    /createStationarySimpleCubicExhaustionLedger\([\s\S]*\.exactZero/u,
  );
  assert.match(runtime, /validatePeriodicSymmetryCertificate/u);
  assert.doesNotMatch(runtime, /swapOppositeLatticePolarities/u);
  assert.match(runtime, /transformDisplayPosition\(startSite\.position\)/u);
  assert.match(css, /\.lattice-lab-miniature-card \{[\s\S]*box-shadow: none;/u);
  assert.match(
    css,
    /#lattice-lab-unpolarized-canvas,[\s\S]*#lattice-lab-miniature-canvas \{[\s\S]*width: 100%;[\s\S]*height: 100%;[\s\S]*border: 0;[\s\S]*border-radius: 8px;/u,
  );
  assert.match(runtime, /unpolarizedRoot\.quaternion\.copy\(rootGroup\.quaternion\)/u);
  assert.match(runtime, /blockOrientationKeyInteraction/u);
  assert.match(
    runtime,
    /\["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel"\][\s\S]*dom\.tripod[\s\S]*blockOrientationKeyInteraction/u,
  );
  assert.doesNotMatch(runtime, /beginRotationDrag\(event, dom\.tripod/u);
  assert.match(runtime, /handleUnpolarizedPointerDown/u);
  assert.match(runtime, /handleUnpolarizedPointerUp/u);
  assert.match(
    runtime,
    /dragSource === "unpolarized"[\s\S]*dom\.unpolarizedCanvas/u,
  );
  assert.match(
    runtime,
    /listen\([\s\S]*dom\.unpolarizedCanvas,[\s\S]*"pointerdown",[\s\S]*handleUnpolarizedPointerDown/u,
  );
  assert.match(
    css,
    /#lattice-lab-unpolarized-canvas \{[\s\S]*cursor: grab;[\s\S]*pointer-events: auto;[\s\S]*touch-action: none;/u,
  );
  assert.match(runtime, /unpolarized-conventional-site/u);
  assert.match(runtime, /unpolarized-conventional-cell-frame/u);
  assert.match(runtime, /unpolarized-nearest-neighbor-relationship/u);
  assert.match(
    runtime,
    /dom\.unpolarizedCanvas\.tabIndex = pattern \? 0 : -1;/u,
  );
  assert.match(runtime, /dataset\.relationshipCount = String/u);
  assert.match(runtime, /dataset\.relationshipFrameOverlapCount = String/u);
  assert.match(runtime, /dataset\.suppressedFrameUnderstrokeCount = String/u);
  assert.match(
    runtime,
    /relationshipPairKeys\.has\(unpolarizedPairKey\(segment\.start, segment\.end\)\)/u,
  );
  assert.match(runtime, /dataset\.polarityMarkerCount = "0"/u);
  assert.match(runtime, /dataset\.selectionRingCount = "0"/u);
  assert.match(runtime, /dataset\.repeatOverlayCount = "0"/u);
  assert.match(
    css,
    /\.lattice-lab-shared-conventions h2\.lattice-lab-card-kicker \{[\s\S]*color: #bdaeff;[\s\S]*font-size: 10px;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-card h2\.lattice-lab-card-kicker \{[\s\S]*color: #bdaeff;[\s\S]*font-size: 10px;/u,
  );
  assert.match(
    css,
    /\.lattice-lab-repeat-highlight-control \{[\s\S]*position: absolute;[\s\S]*left: 8px;[\s\S]*bottom: 8px;/u,
  );
  assert.doesNotMatch(
    css,
    /lattice-lab-repeat-rule|lattice-lab-repeat-vectors|lattice-lab-repeat-highlight-state/u,
  );
  assert.match(
    css,
    /\.lattice-lab-miniature-card\[hidden\] \{\s*display: none;/u,
  );
});

test("shared panel collapse icon preserves the established open and closed treatment", () => {
  const equationRuntime = readRepoFile("src/apps/equation-mapping/EquationMappingRuntime.js");
  assert.match(createPanelCollapseIconSvg(false), /width="3\.8"[\s\S]*fill="currentColor"/u);
  assert.doesNotMatch(createPanelCollapseIconSvg(true), /width="3\.8"/u);
  assert.match(equationRuntime, /createPanelCollapseIconSvg\(this\.indexCollapsed\)/u);
});

test("Applications groups fifteen apps and keeps Explore Models catalog-alphabetical", () => {
  const applications = JSON.parse(
    readRepoFile("content/scenes/archie/applications.json"),
  );
  const exploreModels = JSON.parse(
    readRepoFile("content/scenes/archie/applications_explore_models.json"),
  );
  const expectedCategories = [
    "learn_reference",
    "explore_models",
    "analyze_evidence",
    "build_simulate",
  ];
  const expectedExploreOrder = [
    "lattice_lab",
    "ideal_braid",
    "molecule",
    "photon",
    "topo",
  ];

  assert.equal(applications.scene.layout.type, "rings");
  assert.equal(applications.scene.layout.order, "objects");
  assert.equal(applications.scene.children.length, 4);
  assert.equal(applications.objects.length, 4);
  assert.deepEqual(
    applications.scene.children.map((entry) => entry.nodeId),
    expectedCategories,
  );
  assert.deepEqual(
    applications.objects.map((entry) => entry.id),
    expectedCategories,
  );
  assert.deepEqual(
    exploreModels.scene.children.map((entry) => entry.nodeId),
    expectedExploreOrder,
  );
  assert.deepEqual(
    exploreModels.objects.map((entry) => entry.id),
    expectedExploreOrder,
  );
  assert.equal(
    exploreModels.objects.find((entry) => entry.id === "lattice_lab")?.labelTitle,
    "Lattice Lab",
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
