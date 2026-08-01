import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  countLatticePolarities,
  createLatticeLabCaseGallery,
  createRandomFiniteFiftyFiftyCase,
  createReferencePolarityState,
  createSelectedSiteLedger,
} from "../src/apps/lattice-lab/LatticeLabCase.js";
import {
  LATTICE_LAB_RANDOM_FINITE_CASE_ID,
  createLatticeLabRandomFiniteAssignment,
  nextLatticeLabRandomFiniteSeed,
} from "../src/apps/lattice-lab/LatticeLabRandomFinite.js";
import {
  LATTICE_LAB_LEDGER_SCOPE,
  createLatticeLabLedgerViewModel,
} from "../src/apps/lattice-lab/LatticeLabLedgerPresentation.js";
import {
  createSelectedSiteCircleDescriptor,
} from "../src/apps/lattice-lab/LatticeLabRuntime.js";

test("random finite case is the final gallery item after Diamond Cubic", () => {
  const gallery = createLatticeLabCaseGallery();
  assert.deepEqual(gallery.map(({ title }) => title), [
    "Simple Cubic",
    "Body-Centered Cubic",
    "Face-Centered Cubic",
    "Hexagonal Close-Packed",
    "Simple Cubic Alternating Planes",
    "Diamond Cubic",
    "Simple Cubic Random 50/50",
  ]);
  assert.deepEqual(gallery.slice(-2).map((record) => record.id), [
    "diamond-cubic-two-sublattice-v1",
    LATTICE_LAB_RANDOM_FINITE_CASE_ID,
  ]);
  assert.equal(gallery.at(-1).title, "Simple Cubic Random 50/50");
  assert.equal("primerTitle" in gallery.at(-1), false);
  assert.equal(gallery.at(-1).repeatCell, null);
  assert.equal(gallery.at(-1).unpolarizedLatticePattern.sites.length, 8);
  assert.equal(
    gallery.at(-1).unpolarizedLatticePattern.relationshipSegments.length,
    12,
  );
});

test("seeded score ranking is reproducible and pins independently reviewable vectors", () => {
  const baseSites = createRandomFiniteFiftyFiftyCase(0).sites;
  const expectedFingerprints = new Map([
    [0, "3fbfb8e9"],
    [1, "4294b573"],
    [20260801, "c2d6ef0b"],
    [20260802, "21490819"],
  ]);
  expectedFingerprints.forEach((fingerprint, seed) => {
    const first = createLatticeLabRandomFiniteAssignment(baseSites, seed);
    const second = createLatticeLabRandomFiniteAssignment(
      [...baseSites].reverse(),
      seed,
    );
    assert.equal(first.assignmentFingerprint, fingerprint);
    assert.deepEqual(first.polarityBySiteId, second.polarityBySiteId);
    assert.equal(first.positrinoCount, 44);
    assert.equal(first.electrinoCount, 44);
  });
});

test("recalculation advances to a provably distinct exact-50/50 assignment", () => {
  const current = createRandomFiniteFiftyFiftyCase();
  const nextSeed = nextLatticeLabRandomFiniteSeed(
    current.sites,
    current.randomization.seed,
  );
  const next = createRandomFiniteFiftyFiftyCase(nextSeed);
  assert.notEqual(next.randomization.seed, current.randomization.seed);
  assert.notEqual(
    next.randomization.assignmentFingerprint,
    current.randomization.assignmentFingerprint,
  );
  assert.deepEqual(countLatticePolarities(createReferencePolarityState(next)), {
    electrino: 44,
    positrino: 44,
  });
});

test("initial random circle and ledger share one deterministic calculation target", () => {
  const caseRecord = createRandomFiniteFiftyFiftyCase();
  const state = createReferencePolarityState(caseRecord);
  const ledger = createSelectedSiteLedger(
    caseRecord,
    state,
    caseRecord.defaultSiteId,
  );
  const circle = createSelectedSiteCircleDescriptor({
    caseRecord,
    polarityBySiteId: state,
    selectedSiteId: caseRecord.defaultSiteId,
  });
  const selectedSite = caseRecord.sites.find(
    (site) => site.id === caseRecord.defaultSiteId,
  );
  assert.equal(circle.siteId, ledger.receiverId);
  assert.equal(circle.polarity, ledger.receiverPolarity);
  assert.deepEqual(circle.position, selectedSite.position);
  assert.equal(
    circle.color,
    circle.polarity === "positrino" ? 0xff0000 : 0x0000ff,
  );
  assert.match(circle.accessibleLabel, new RegExp(circle.colorName, "u"));
  assert.ok(circle.innerRadiusPx > 8);
  assert.ok(circle.outerRadiusPx > circle.innerRadiusPx);
});

test("recalculation preserves circle and ledger receiver synchronization", () => {
  const current = createRandomFiniteFiftyFiftyCase();
  const selectedSiteId = current.defaultSiteId;
  const nextSeed = nextLatticeLabRandomFiniteSeed(
    current.sites,
    current.randomization.seed,
  );
  const next = createRandomFiniteFiftyFiftyCase(nextSeed);
  const nextState = createReferencePolarityState(next);
  const nextLedger = createSelectedSiteLedger(
    next,
    nextState,
    selectedSiteId,
  );
  const nextCircle = createSelectedSiteCircleDescriptor({
    caseRecord: next,
    polarityBySiteId: nextState,
    selectedSiteId,
    deformationAxis: "x",
    deformationFactor: 0.4,
  });
  const site = next.sites.find((candidate) => candidate.id === selectedSiteId);
  assert.equal(nextCircle.siteId, selectedSiteId);
  assert.equal(nextCircle.siteId, nextLedger.receiverId);
  assert.equal(nextCircle.polarity, nextLedger.receiverPolarity);
  assert.deepEqual(nextCircle.position, [
    site.position[0] * 0.4,
    site.position[1],
    site.position[2],
  ]);
});

test("every gallery case uses one polarity circle for its exact ledger receiver", () => {
  createLatticeLabCaseGallery().forEach((caseRecord) => {
    const state = createReferencePolarityState(caseRecord);
    const ledger = createSelectedSiteLedger(
      caseRecord,
      state,
      caseRecord.defaultSiteId,
    );
    const circle = createSelectedSiteCircleDescriptor({
      caseRecord,
      polarityBySiteId: state,
      selectedSiteId: caseRecord.defaultSiteId,
    });
    assert.equal(circle.siteId, ledger.receiverId, caseRecord.id);
    assert.equal(circle.polarity, ledger.receiverPolarity, caseRecord.id);
    assert.equal(
      circle.color,
      circle.polarity === "positrino" ? 0xff0000 : 0x0000ff,
      caseRecord.id,
    );
  });
});

test("finite random ledger includes every other canonical finite site and no continuation", () => {
  const caseRecord = createRandomFiniteFiftyFiftyCase();
  const state = createReferencePolarityState(caseRecord);
  const ledger = createSelectedSiteLedger(
    caseRecord,
    state,
    caseRecord.defaultSiteId,
  );
  assert.equal(ledger.rows.length, 87);
  assert.equal(ledger.rows.every((row) =>
    row.availability === "finite-configuration-neighbor" &&
    row.includedInCalculation === true
  ), true);
  const independentResidual = ledger.rows.reduce(
    (sum, row) => sum.map((value, axis) =>
      value + row.accelerationRow.normalizedAcceleration[axis]
    ),
    [0, 0, 0],
  );
  assert.deepEqual(ledger.normalizedAccelerationResidual, independentResidual);

  const viewModel = createLatticeLabLedgerViewModel({
    caseRecord,
    ledger,
    finiteNonperiodic: true,
  });
  assert.equal(viewModel.scope, LATTICE_LAB_LEDGER_SCOPE.FINITE_NONPERIODIC);
  assert.equal(
    viewModel.receiverLabel,
    `Calculation target · Selected ${ledger.receiverPolarity}`,
  );
  assert.equal(viewModel.calculationRows.length, 87);
  assert.equal(viewModel.calculationRows[0].rowLabel, "Contribution 1");
  assert.equal(viewModel.calculationRows.at(-1).rowLabel, "Contribution 87");
  assert.deepEqual(
    viewModel.calculationRows.map((row) => row.rowLabel),
    Array.from({ length: 87 }, (_, index) => `Contribution ${index + 1}`),
  );
  assert.equal(
    viewModel.calculationRows.every((row) => row.showPolarityInLabel === false),
    true,
  );
  assert.doesNotMatch(
    viewModel.calculationRows.map((row) => row.rowLabel).join(" "),
    /remaining|finite crop|\bcontribution\b/u,
  );
  assert.equal("statement" in viewModel, false);
  assert.equal(viewModel.shellScopeNote, null);
  assert.match(viewModel.calculationScopeDetail, /every other Architrino/u);
  assert.doesNotMatch(
    `${viewModel.outcomeLabel} ${viewModel.shellScopeNote}`,
    /every architrino|repeating pattern|stability|conservation|energy/u,
  );
});

test("random action uses a custom accessible title-row asset without user-facing seed copy", () => {
  const html = readFileSync(new URL("../lattice-lab.html", import.meta.url), "utf8");
  const runtime = readFileSync(
    new URL("../src/apps/lattice-lab/LatticeLabRuntime.js", import.meta.url),
    "utf8",
  );
  assert.match(
    html,
    /id="lattice-lab-random-recalculate"[\s\S]*aria-label="Recalculate random configuration"[\s\S]*<svg[\s\S]*<path/u,
  );
  assert.match(html, /id="lattice-lab-random-recalculate"[\s\S]*hidden/u);
  assert.doesNotMatch(
    html,
    /Random provenance|lattice-lab-case-random-provenance/u,
  );
  assert.match(runtime, /nextLatticeLabRandomFiniteSeed/u);
  assert.match(runtime, /dataset\.randomAssignmentFingerprint/u);
  assert.match(runtime, /dom\.randomRecalculate\.hidden = !randomization/u);
  assert.match(runtime, /listen\(dom\.randomRecalculate, "click", recalculateRandomConfiguration\)/u);
  const randomCase = createRandomFiniteFiftyFiftyCase();
  assert.equal("primerTitle" in randomCase, false);
  assert.equal("primerParagraphs" in randomCase, false);
});

test("Simple Cubic case identity remains explicit after overview removal", () => {
  const checkerboard = createLatticeLabCaseGallery()[0];
  assert.equal(checkerboard.title, "Simple Cubic");
  assert.equal("primerTitle" in checkerboard, false);
  assert.equal("primerParagraphs" in checkerboard, false);
  assert.equal("learnerOverview" in checkerboard, false);
  const html = readFileSync(
    new URL("../lattice-lab.html", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(html, /What You Are Seeing|lattice-lab-seeing/u);
});

test("gallery explanations use polarity language while color keys remain explicit", () => {
  const gallery = createLatticeLabCaseGallery();
  const galleryCopy = JSON.stringify(gallery);
  assert.doesNotMatch(galleryCopy, /\b(?:red|blue)\b|same-color|opposite-color/u);

  const bcc = gallery.find((record) => record.id === "bcc-two-sublattice-v1");
  assert.equal(
    bcc.title,
    "Body-Centered Cubic",
  );
  assert.equal(
    bcc.polarityRule,
    "corner and body-center positions carry opposite polarities",
  );
  assert.doesNotMatch(
    [bcc.title, bcc.polarityRule].join(" "),
    /two-sublattice|sublattices?/u,
  );
  assert.doesNotMatch(
    [bcc.title, bcc.polarityRule].join(" "),
    /CsCl|Cesium chloride|material identity|This is site counting, not mass density\./u,
  );

  const html = readFileSync(
    new URL("../lattice-lab.html", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    html.match(/<meta\s+name="description"[\s\S]*?>/u)?.[0] ?? "",
    /\b(?:red|blue)\b/u,
  );
  assert.match(
    html,
    /aria-label="Polarity legend: red sphere, Positrino; blue sphere, Electrino"/u,
  );
});
