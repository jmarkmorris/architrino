import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { BORG_DATASET_MANIFEST_V1 } from "../src/apps/borg/BorgAppManifest.js";
import { createBorgAssemblyViewSession } from "../src/apps/borg/BorgAssemblyViewSession.js";
import { createBorgBraidRecordNavigation } from "../src/apps/borg/BorgBootstrap.js";
import {
  BORG_BRAID_RECORD_CATALOG,
  createBorgBraidRecordCatalog,
} from "../src/apps/borg/BorgBraidRecordCatalog.js";
import {
  createBorgEomShadowRunConfig,
  createBorgEomShadowRunner,
} from "../src/apps/borg/BorgEomShadowRunner.js";
import {
  BORG_PRESCRIBED_DISPLAY_PROFILE_V1,
  createBorgPrescribedDisplayBranch,
} from "../src/apps/borg/BorgPrescribedDisplayBranch.js";

const record = JSON.parse(readFileSync(new URL(
  "../content/assets/borg/records/illustrative-spindle-chart-hypothesis.assembly-view-record.v0.json",
  import.meta.url,
)));

function createBranch(overrides = {}) {
  const entry = createBorgAssemblyViewSession([record]).selected;
  return createBorgPrescribedDisplayBranch({
    entry,
    cutTime: 2,
    eomClient: { async evolveRetainedHistories() {} },
    manifest: BORG_DATASET_MANIFEST_V1,
    runDuration: 60,
    runId: "prescribed-display-test-run",
    ...overrides,
  });
}

test("prescribed Display profile is explicit, fixed-grade, and non-promotable", () => {
  assert.deepEqual(BORG_PRESCRIBED_DISPLAY_PROFILE_V1, {
    schema: "borg-prescribed-display-profile.v1",
    id: "borg-prescribed-display-v1",
    label: "Borg prescribed Display profile v1",
    runGrade: "display",
    certifiedBudgetId: "research-certified-v1",
    fieldSpeed: 1,
    coupling: "0.0005",
    sampleInterval: 0.01,
    chunkDuration: 0.3,
    historyPolicy: "exact-source-segment-prefix-through-selected-cut",
    promotionEligible: false,
  });
});

test("Borg workbench loads any catalog entry in place", async () => {
  const catalog = createBorgBraidRecordCatalog([
    { id: "first", label: "First", recordUrl: "first.json", familyId: "A", familyLabel: "Family A" },
    { id: "second", label: "Second", recordUrl: "second.json", familyId: "B", familyLabel: "Family B" },
  ]);
  const fetched = [];
  const navigation = createBorgBraidRecordNavigation({
    catalog,
    fetchLike: async (url) => {
      fetched.push(url);
      return { ok: true, async json() { return { source: url }; } };
    },
  });
  assert.deepEqual(await navigation.load("second"), { source: "second.json" });
  assert.deepEqual(fetched, ["second.json"]);
  await assert.rejects(navigation.load("missing"), /has no record missing/u);
});

test("prescribed Display branch carries exact source segments through the selected cut", () => {
  const branch = createBranch();
  assert.equal(branch.sourceRecordId, record.sourceId);
  assert.equal(branch.selectedCutTime, 2);
  assert.equal(branch.retainedHistories.length, 6);
  assert.equal(branch.retainedHistories[0].segments.length, 40);
  assert.equal(branch.retainedHistories[0].coverageStart, "0");
  assert.equal(branch.retainedHistories[0].coverageEnd, "2");
  assert.deepEqual(
    branch.retainedHistories[0].segments[0].coefficients,
    record.worldlines[0].segments[0].coefficients.map((axis) => axis.map(String)),
  );
  assert.deepEqual(
    branch.pathMap.map((row) => row.pathKey),
    [1001, 1002, 1003, 1004, 1005, 1006],
  );
  assert.equal(branch.displayRows.length, 201 * 6);
  assert.equal(branch.displayRows.at(-1).time, 2);
});

test("prescribed Display branch starts the EOM runner at the exact selected cut", () => {
  const branch = createBranch();
  const runner = createBorgEomShadowRunner(
    BORG_DATASET_MANIFEST_V1,
    branch.runnerOptions,
  );
  assert.equal(runner.runGrade, "display");
  assert.equal(runner.config.startTime, 2);
  assert.equal(runner.config.targetDuration, 62);
  assert.equal(runner.config.pathCount, 6);
  assert.equal(runner.config.coupling, "0.0005");
  assert.equal(runner.config.simulationOuterRadius, 0.5);
  assert.deepEqual(runner.config.simulationCenter, { x: 0, y: 0, z: 0 });
  runner.dispose();
});

test("every catalog record prepares a Display branch with its record-owned envelope", () => {
  BORG_BRAID_RECORD_CATALOG.entries.forEach((catalogEntry) => {
    const catalogRecord = JSON.parse(readFileSync(new URL(
      `../${catalogEntry.recordUrl}`,
      import.meta.url,
    )));
    const entry = createBorgAssemblyViewSession([catalogRecord]).selected;
    const prescribed = entry.dataset.provenance.prescribedGeometry;
    const cutTime = prescribed.prescribedReturnPeriod != null &&
      Number.isFinite(Number(prescribed.prescribedReturnPeriod))
      ? entry.dataset.window.start + Number(prescribed.prescribedReturnPeriod)
      : entry.dataset.window.end;
    const branch = createBorgPrescribedDisplayBranch({
      entry,
      cutTime,
      eomClient: { async evolveRetainedHistories() {} },
      manifest: BORG_DATASET_MANIFEST_V1,
      runDuration: 60,
      runId: `prescribed-display-catalog-test:${catalogEntry.id}`,
    });

    assert.deepEqual(branch.simulationEnvelope, {
      center: prescribed.responseCenter,
      radius: prescribed.sphericalEnvelopeRadius,
    });
    assert.deepEqual(branch.runnerOptions.simulationCenter, prescribed.responseCenter);
    assert.equal(
      branch.runnerOptions.simulationOuterRadius,
      prescribed.sphericalEnvelopeRadius,
    );
    const runConfig = createBorgEomShadowRunConfig(
      BORG_DATASET_MANIFEST_V1,
      branch.runnerOptions,
    );
    assert.deepEqual(runConfig.simulationCenter, prescribed.responseCenter);
    assert.equal(runConfig.simulationOuterRadius, prescribed.sphericalEnvelopeRadius);
  });
});

test("prescribed Display branch refuses to invent a cut inside a source segment", () => {
  assert.throws(
    () => createBranch({ cutTime: 2.03 }),
    /not a common exact segment boundary/u,
  );
});

test("prescribed Display branch never accepts Claim grade through a profile override", () => {
  assert.throws(
    () => createBranch({
      profile: {
        ...BORG_PRESCRIBED_DISPLAY_PROFILE_V1,
        runGrade: "certified",
      },
    }),
    /fixed to non-promotable Display grade/u,
  );
});
