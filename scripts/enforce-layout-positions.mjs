import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SCENES_DIR = path.join(ROOT, "content/scenes");
const MODE = process.argv.includes("--write") ? "write" : "check";

function walkJsonFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkJsonFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith(".json")) {
      files.push(fullPath);
    }
  }
  return files;
}

function toRelative(absolutePath) {
  return path.relative(ROOT, absolutePath).replace(/\\/g, "/");
}

function isSceneConfig(data) {
  return (
    data &&
    typeof data === "object" &&
    data.scene &&
    typeof data.scene === "object" &&
    Array.isArray(data.objects)
  );
}

function shouldStripPosition(layoutMode, objectData) {
  if (layoutMode !== "ring" && layoutMode !== "grid") {
    return false;
  }
  if (!objectData || typeof objectData !== "object") {
    return false;
  }
  if (objectData.fixedPosition === true) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(objectData, "position");
}

const jsonFiles = walkJsonFiles(SCENES_DIR);
let changedFiles = 0;
let strippedPositions = 0;
let inspectedScenes = 0;
let parseErrors = 0;
const detailRows = [];

for (const filePath of jsonFiles) {
  const raw = fs.readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    parseErrors += 1;
    detailRows.push(`${toRelative(filePath)}: parse error (${error.message})`);
    continue;
  }

  if (!isSceneConfig(data)) {
    continue;
  }

  inspectedScenes += 1;
  const layoutMode = String(data.scene.layoutMode || "").toLowerCase();
  if (layoutMode !== "ring" && layoutMode !== "grid") {
    continue;
  }

  let localStrips = 0;
  for (const objectData of data.objects) {
    if (shouldStripPosition(layoutMode, objectData)) {
      delete objectData.position;
      localStrips += 1;
    }
  }

  if (!localStrips) {
    continue;
  }

  strippedPositions += localStrips;
  detailRows.push(`${toRelative(filePath)}: removed ${localStrips} redundant position field(s)`);

  const nextRaw = `${JSON.stringify(data, null, 2)}\n`;
  if (MODE === "write" && nextRaw !== raw) {
    fs.writeFileSync(filePath, nextRaw);
    changedFiles += 1;
  } else if (MODE === "check") {
    changedFiles += 1;
  }
}

console.log(`enforce-layout-positions mode: ${MODE}`);
console.log(`- Scene files inspected: ${inspectedScenes}`);
console.log(`- Files with violations: ${changedFiles}`);
console.log(`- Redundant positions: ${strippedPositions}`);
if (parseErrors > 0) {
  console.log(`- Parse errors: ${parseErrors}`);
}
if (detailRows.length) {
  console.log("");
  detailRows.forEach((row) => console.log(row));
}

if (parseErrors > 0 || (MODE === "check" && changedFiles > 0)) {
  process.exitCode = 1;
}
