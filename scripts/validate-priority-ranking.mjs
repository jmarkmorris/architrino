#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const RANKING_PATH = path.join(
  ROOT_DIR,
  "reference/priorities/aaa-work-threads/priorities.md"
);

function fail(message) {
  console.error(`[priority-ranking] ${message}`);
  process.exitCode = 1;
}

function roundHalfUp(value, digits) {
  const scale = 10 ** digits;
  return Math.floor(value * scale + 0.5 + 1e-9) / scale;
}

function parseNumber(value, label, rank) {
  const parsed = Number(value.replaceAll("`", ""));
  if (!Number.isFinite(parsed)) {
    fail(`rank ${rank} has invalid ${label}: ${value}`);
  }
  return parsed;
}

function sameNumber(actual, expected, digits) {
  return actual.toFixed(digits) === expected.toFixed(digits);
}

if (!fs.existsSync(RANKING_PATH)) {
  fail(`missing ranking file: ${path.relative(ROOT_DIR, RANKING_PATH)}`);
  process.exit(1);
}

const source = fs.readFileSync(RANKING_PATH, "utf8");
const lines = source.split(/\r?\n/);
const headerIndex = lines.findIndex((line) =>
  line.startsWith(
    "| Rank | Kind | Slug or packet | Bucket #1 next unresolved evidence object |"
  )
);

if (headerIndex < 0) {
  fail("canonical table must expose a `Bucket #1 next unresolved evidence object` column");
  process.exit(1);
}

const rowLines = [];
for (let index = headerIndex + 2; index < lines.length; index += 1) {
  const line = lines[index];
  if (!line.startsWith("|")) break;
  rowLines.push({ line, lineNumber: index + 1 });
}

if (rowLines.length === 0) {
  fail("canonical table has no ranked rows");
  process.exit(1);
}

const rows = rowLines.map(({ line, lineNumber }) => {
  const cells = line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
  if (cells.length !== 18) {
    fail(`line ${lineNumber} has ${cells.length} cells; expected 18`);
  }

  const rank = parseNumber(cells[0] ?? "", "Rank", lineNumber);
  const row = {
    lineNumber,
    rank,
    kind: cells[1] ?? "",
    slug: cells[2] ?? "",
    nextObject: cells[3] ?? "",
    base: parseNumber(cells[4] ?? "", "Base", rank),
    cascade: parseNumber(cells[5] ?? "", "Cascade", rank),
    minDelta: parseNumber(cells[6] ?? "", "MinDelta", rank),
    pressure: parseNumber(cells[7] ?? "", "Pressure", rank),
    engine: parseNumber(cells[8] ?? "", "Engine", rank),
    eureka: parseNumber(cells[9] ?? "", "Eureka", rank),
    eweight: parseNumber(cells[10] ?? "", "EWeight", rank),
    value: parseNumber(cells[11] ?? "", "Value", rank),
    exec: parseNumber(cells[12] ?? "", "Exec", rank),
    intuition: parseNumber(cells[13] ?? "", "Intuition", rank),
    deps: parseNumber(cells[14] ?? "", "Deps", rank),
    valid: parseNumber(cells[15] ?? "", "Valid", rank),
    cost: parseNumber(cells[16] ?? "", "Cost", rank),
    roi: parseNumber(cells[17] ?? "", "ROI", rank),
  };

  if (!row.nextObject || /^(none|n\/a|tbd)$/i.test(row.nextObject.replaceAll("`", ""))) {
    fail(`rank ${rank} lacks a concrete next unresolved evidence object`);
  }
  return row;
});

for (let index = 0; index < rows.length; index += 1) {
  const row = rows[index];
  const expectedRank = index + 1;
  if (row.rank !== expectedRank) {
    fail(`line ${row.lineNumber} has rank ${row.rank}; expected ${expectedRank}`);
  }

  const expectedPressure = roundHalfUp(1 + Math.max(0, -row.minDelta) / 100, 2);
  const expectedEWeight = roundHalfUp(0.5 + 0.1 * row.eureka, 2);
  const expectedValue = roundHalfUp(
    row.base * row.cascade * expectedPressure * row.engine * expectedEWeight,
    2
  );
  const expectedCost = roundHalfUp(
    0.25 * row.exec + 0.35 * row.intuition + 0.2 * row.deps + 0.2 * row.valid,
    1
  );
  const expectedRoi = roundHalfUp(expectedValue / expectedCost, 2);

  if (!sameNumber(row.pressure, expectedPressure, 2)) {
    fail(`rank ${row.rank} Pressure ${row.pressure} != ${expectedPressure.toFixed(2)}`);
  }
  if (!sameNumber(row.eweight, expectedEWeight, 2)) {
    fail(`rank ${row.rank} EWeight ${row.eweight} != ${expectedEWeight.toFixed(2)}`);
  }
  if (!sameNumber(row.value, expectedValue, 2)) {
    fail(`rank ${row.rank} Value ${row.value} != ${expectedValue.toFixed(2)}`);
  }
  if (!sameNumber(row.cost, expectedCost, 1)) {
    fail(`rank ${row.rank} Cost ${row.cost} != ${expectedCost.toFixed(1)}`);
  }
  if (!sameNumber(row.roi, expectedRoi, 2)) {
    fail(`rank ${row.rank} ROI ${row.roi} != ${expectedRoi.toFixed(2)}`);
  }
}

function comparePriority(left, right) {
  return (
    right.roi - left.roi ||
    right.value - left.value ||
    right.eureka - left.eureka ||
    left.intuition - right.intuition ||
    left.cost - right.cost ||
    right.cascade - left.cascade
  );
}

const expectedOrder = [...rows].sort(comparePriority);
for (let index = 0; index < rows.length; index += 1) {
  if (rows[index] !== expectedOrder[index]) {
    fail(
      `rank ${index + 1} is stale: ${expectedOrder[index].slug} outranks ${rows[index].slug}`
    );
    break;
  }
}

for (const row of rows) {
  const trackerMatch = row.slug.match(/\]\(\.\.\/([^/]+)\/priorities\.md\)/);
  if (!trackerMatch) continue;
  const trackerPath = path.join(ROOT_DIR, "reference/priorities", trackerMatch[1], "priorities.md");
  if (!fs.existsSync(trackerPath)) {
    fail(`rank ${row.rank} points to missing tracker ${path.relative(ROOT_DIR, trackerPath)}`);
    continue;
  }
  const tracker = fs.readFileSync(trackerPath, "utf8");
  const nextObjectId = row.nextObject.match(/`([^`]+)`/)?.[1];
  if (!nextObjectId) {
    fail(`rank ${row.rank} tracker-backed row lacks an inline local object id`);
  } else {
    const trackerLines = tracker.split(/\r?\n/);
    const queueHeadings = [
      "## Ranked Next Objects",
      "## Immediate Priority Queue",
      "## Open Work Queue",
      "## Current Queue",
      "## Priority Queue",
      "## Task Queue",
      "## Queue",
    ];
    let queueIndex = -1;
    for (const heading of queueHeadings) {
      queueIndex = trackerLines.findIndex((line) => line === heading);
      if (queueIndex >= 0) break;
    }
    if (queueIndex < 0) {
      fail(`${path.relative(ROOT_DIR, trackerPath)} lacks a ranked or recognized live queue`);
    } else {
      const nextHeadingOffset = trackerLines
        .slice(queueIndex + 1)
        .findIndex((line) => line.startsWith("## "));
      const queueEnd =
        nextHeadingOffset < 0 ? trackerLines.length : queueIndex + 1 + nextHeadingOffset;
      const localWinnerLine = trackerLines
        .slice(queueIndex + 1, queueEnd)
        .find((line) => /^1\.\s+`[^`]+`/.test(line));
      const localWinnerId = localWinnerLine?.match(/^1\.\s+`([^`]+)`/)?.[1];
      if (!localWinnerId) {
        fail(`${path.relative(ROOT_DIR, trackerPath)} lacks a machine-checkable local rank 1`);
      } else if (localWinnerId !== nextObjectId) {
        fail(
          `${path.relative(ROOT_DIR, trackerPath)} local rank 1 ${localWinnerId} != unified object ${nextObjectId}`
        );
      }
    }
  }
  const expectedMetadata = [
    ["Rank", String(row.rank)],
    ["Value", row.value.toFixed(2)],
    ["Cost", row.cost.toFixed(1)],
    ["ROI", row.roi.toFixed(2)],
  ];
  for (const [label, expected] of expectedMetadata) {
    const match = tracker.match(new RegExp(`^- ${label}: ` + "`([^`]+)`$", "m"));
    if (!match) {
      fail(`${path.relative(ROOT_DIR, trackerPath)} lacks ${label} metadata`);
    } else if (match[1] !== expected) {
      fail(
        `${path.relative(ROOT_DIR, trackerPath)} ${label} ${match[1]} != table ${expected}`
      );
    }
  }
}

if (!process.exitCode) {
  console.log(
    `[priority-ranking] passed: ${rows.length} rows, local bucket winners aligned, scores recomputed, global ranks sorted, tracker metadata synchronized`
  );
}
