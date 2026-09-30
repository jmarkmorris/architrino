import fs from "node:fs";
import path from "node:path";

export const WORKSTREAM_MANIFEST = "workstreams.json";
const SCHEMA = "architrino/research-workstreams.v1";
const ROOT_EXCLUSIONS = new Set(["dormant-deferred", "app-simulation"]);

// A parent declares research children explicitly so analysis, evidence and
// historical support directories never become execution owners by accident.
export function readWorkstreamChildren(directory) {
  const manifest = path.join(directory, WORKSTREAM_MANIFEST);
  if (!fs.existsSync(manifest)) return [];
  const data = JSON.parse(fs.readFileSync(manifest, "utf8"));
  if (data.schema !== SCHEMA || !Array.isArray(data.children)) {
    throw new TypeError(`Invalid research workstream manifest: ${manifest}`);
  }
  const names = new Set();
  for (const child of data.children) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(child.directory) ||
        !["current", "dormant"].includes(child.lifecycle) ||
        names.has(child.directory)) {
      throw new TypeError(`Invalid or duplicate research child in ${manifest}`);
    }
    names.add(child.directory);
    const childDirectory = path.join(directory, child.directory);
    if (!fs.existsSync(childDirectory) || !fs.lstatSync(childDirectory).isDirectory()) {
      throw new TypeError(`Missing research child directory: ${childDirectory}`);
    }
  }
  return data.children;
}

export function discoverPriorityWorkstreams(prioritiesDirectory) {
  const owners = [];
  function visit(relativeDirectory, lifecycle) {
    const directory = path.join(prioritiesDirectory, relativeDirectory);
    if (!fs.existsSync(path.join(directory, "priorities.md"))) {
      throw new TypeError(`Research owner lacks priorities.md: ${directory}`);
    }
    owners.push({ directory: relativeDirectory, lifecycle });
    for (const child of readWorkstreamChildren(directory)) {
      visit(`${relativeDirectory}/${child.directory}`,
        lifecycle === "dormant" ? "dormant" : child.lifecycle);
    }
  }
  for (const entry of fs.readdirSync(prioritiesDirectory, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith(".") &&
        !ROOT_EXCLUSIONS.has(entry.name) &&
        fs.existsSync(path.join(prioritiesDirectory, entry.name, "priorities.md"))) {
      visit(entry.name, "current");
    }
  }
  return owners.sort((left, right) => left.directory.localeCompare(right.directory));
}
