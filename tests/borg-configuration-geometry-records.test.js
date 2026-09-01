import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { createEomHistoryDataset } from "../src/apps/shared/EomHistoryDataset.mjs";
import { describeBorgOrbitTrails } from "../src/apps/borg/BorgOrbitTrails.mjs";
import { validatePrescribedAssemblySpec } from "../src/prescribed-geometry/PrescribedAssemblySpec.mjs";

const exactStudyEntries = BORG_ASSEMBLY_RECORD_CATALOG.entries.filter((entry) =>
  /\/(?:alternating-circular-ring-|co-spherical-two-planar-braid-|rotating-(?:tetrahedron|octahedron|cube|icosahedron|dodecahedron)-vertex-set|equal-radius-planar-three-binary-balance-beta-2p974307176117293)/.test(entry.recordUrl));
const raw = (entry) => JSON.parse(readFileSync(entry.recordUrl));
const source = (entry) => JSON.parse(readFileSync(raw(entry).provenance.generatingSpec));
const distance = (a, b) => Math.hypot(...a.map((value, index) => value - b[index]));
const positions = (dataset, time) => dataset.worldlines.map((worldline) => {
  const { x, y, z } = dataset.evaluateWorldline(worldline.id, time).position;
  return [x, y, z];
});
const near = (actual, expected, tolerance = 1e-5) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} vs ${expected}`);

test("the nineteen exact geometry studies have neutral inventory and validated sources", () => {
  assert.equal(exactStudyEntries.length, 19);
  for (const entry of exactStudyEntries) {
    const record = raw(entry);
    const spec = source(entry);
    validatePrescribedAssemblySpec(spec);
    assert.equal(record.assemblyId, entry.assemblyId);
    assert.equal(record.modelRevisionSha256, entry.modelRevisionSha256);
    assert.equal(spec.constituents.reduce((sum, constituent) => sum + constituent.polarity, 0), 0);
    assert.equal(spec.constraints.speedGuard.normalizedFieldSpeed, 1);
  }
});

test("alternating circular rings follow their complete declared circles", () => {
  const rings = exactStudyEntries.filter((entry) => entry.recordUrl.includes("alternating-circular-ring-") || entry.recordUrl.includes("beta-2p974307176117293"));
  assert.equal(rings.length, 12);
  for (const entry of rings) {
    const spec = source(entry);
    const dataset = createEomHistoryDataset(raw(entry));
    const { membersPerPolarity: n, radius, angularRate } = spec.geometry.circularPathBalance;
    const period = spec.history.returnPeriod;
    const initial = positions(dataset, 0);
    for (const time of [0, period * 0.237, period]) {
      positions(dataset, time).forEach((position, index) => {
        near(position[2], 0);
        near(Math.hypot(...position), radius, 1e-5 * radius);
        const [x, y] = initial[index];
        const cosine = Math.cos(angularRate * time);
        const sine = Math.sin(angularRate * time);
        near(distance(position, [cosine * x - sine * y, sine * x + cosine * y, 0]), 0, 1e-5 * radius);
      });
    }
    assert.equal(dataset.worldlines.length, 2 * n);
    [...describeBorgOrbitTrails(dataset).values()].forEach((trail) => near(trail.duration, period / (2 * n), 1e-10));
  }
});

test("co-spherical two-planar-braid records preserve radius and circulation relation", () => {
  const entries = exactStudyEntries.filter((entry) => entry.recordUrl.includes("co-spherical-two-planar-braid-"));
  assert.equal(entries.length, 2);
  for (const entry of entries) {
    const spec = source(entry);
    const dataset = createEomHistoryDataset(raw(entry));
    assert.equal(spec.relationships.componentBraids.length, 2);
    for (const time of [0, 0.937, 2.37, 4]) {
      positions(dataset, time).forEach((position) => near(Math.hypot(...position), 0.5));
    }
    const groups = spec.relationships.componentBraids.map((group) =>
      spec.worldlines.filter((worldline) => group.members.includes(worldline.constituentId)));
    const rates = groups.map((group) => group.map((worldline) => worldline.operator.angularVelocity));
    assert.ok(rates[0].every((rate) => rate === Math.PI / 2));
    const sign = entry.recordUrl.includes("counter-rotating") ? -1 : 1;
    assert.ok(rates[1].every((rate) => rate === sign * Math.PI / 2));
  }
});

test("rotating regular vertex sets preserve independently known edge graphs", () => {
  const graphs = new Map([
    ["tetrahedron", [4, 6, 3]], ["octahedron", [6, 12, 4]], ["cube", [8, 12, 3]],
    ["icosahedron", [12, 30, 5]], ["dodecahedron", [20, 30, 3]],
  ]);
  for (const entry of exactStudyEntries.filter((row) => row.recordUrl.includes("vertex-set"))) {
    const name = [...graphs.keys()].find((key) => entry.recordUrl.includes(key));
    const [count, edgeCount, degree] = graphs.get(name);
    const dataset = createEomHistoryDataset(raw(entry));
    const initial = positions(dataset, 0);
    const pairs = [];
    for (let left = 0; left < count; left += 1) for (let right = left + 1; right < count; right += 1) pairs.push([left, right, distance(initial[left], initial[right])]);
    const edge = Math.min(...pairs.map((pair) => pair[2]));
    const adjacency = pairs.filter((pair) => Math.abs(pair[2] - edge) < 1e-12);
    assert.equal(adjacency.length, edgeCount);
    for (let index = 0; index < count; index += 1) assert.equal(adjacency.filter((pair) => pair[0] === index || pair[1] === index).length, degree);
  }
});
