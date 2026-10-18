// Compares default outputs of a candidate build with the frozen O0 baseline.
// A file passes if its bytes are equal, or if it is one JSON document whose
// only differences lie at the named build-identity paths below, each holding
// a 64-digit lowercase hexadecimal string in both files. Removing a path
// that is absent, or that holds anything else, is itself a difference.
// Known cases run first; exit status 2 if one fails. c_f = 1.
//
// Usage: node compare-default-outputs.mjs <baseline dir> <candidate dir>
//   Each directory holds outputs/ (or default-outputs/) and wire-outputs/.
import fs from "node:fs";
import path from "node:path";

// Named in the O0 baseline receipt: build identity, the model digest and
// the checkpoint digest. "binding" and the checkpoint's own "digest" are
// hashes over the resolved model and the checkpoint data respectively; the
// receipt did not name binding, so it is listed separately and reported.
const NAMED = [
  "/build/sourceDigest", "/build/buildDigest", "/build/configurationDigest",
  "/resolvedModel/build/sourceDigest", "/resolvedModel/build/buildDigest",
  "/resolvedModel/build/configurationDigest", "/modelDigest",
  "/checkpoint/digest", "/checkpoint/data/digest", "/digest",
  "/checkpoint/data/resolvedModel/build/sourceDigest",
  "/checkpoint/data/resolvedModel/build/buildDigest",
  "/checkpoint/data/resolvedModel/build/configurationDigest",
];
const UNNAMED_IN_RECEIPT = ["/binding", "/checkpoint/data/binding"];
const HEX = /^[0-9a-f]{64}$/;

function get(value, pointer) {
  let node = value;
  for (const key of pointer.split("/").slice(1)) {
    if (node === null || typeof node !== "object" || !(key in node)) {
      return undefined;
    }
    node = node[key];
  }
  return node;
}

function remove(value, pointer) {
  const keys = pointer.split("/").slice(1);
  const last = keys.pop();
  let node = value;
  for (const key of keys) node = node[key];
  delete node[last];
}

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    return `{${Object.keys(value).sort().map(
        (k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

// Returns {status, removed, reason}.
export function compare(baseText, candText) {
  if (baseText === candText) return {status: "identical", removed: []};
  let a, b;
  try {
    a = JSON.parse(baseText);
    b = JSON.parse(candText);
  } catch {
    return {status: "different", removed: [], reason: "bytes differ, not JSON"};
  }
  const removed = [];
  for (const pointer of [...NAMED, ...UNNAMED_IN_RECEIPT]) {
    const x = get(a, pointer), y = get(b, pointer);
    if (x === undefined && y === undefined) continue;
    if (typeof x !== "string" || typeof y !== "string" || !HEX.test(x) ||
        !HEX.test(y)) {
      return {status: "different", removed,
              reason: `${pointer} is not a digest in both files`};
    }
    if (x !== y) removed.push(pointer);
    remove(a, pointer);
    remove(b, pointer);
  }
  if (canonical(a) !== canonical(b)) {
    return {status: "different", removed, reason: "differs outside named paths"};
  }
  return {status: "equal-after-projection", removed};
}

function files(root) {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else out.push(path.relative(root, full));
    }
  };
  walk(root);
  return out.sort();
}

function known(baseline) {
  const sample = fs.readFileSync(
      path.join(baseline, "wire-outputs/evolve-three-path.stdout"), "utf8");
  const doc = JSON.parse(sample);
  const results = [];
  const check = (name, passed) => {
    results.push(passed);
    console.log(`${passed ? "PASS" : "FAIL"}  known: ${name}`);
  };
  check("a file against itself is identical",
        compare(sample, sample).status === "identical");
  const digestOnly = structuredClone(doc);
  digestOnly.resolvedModel.build.sourceDigest = "0".repeat(64);
  digestOnly.modelDigest = "1".repeat(64);
  const r1 = compare(sample, JSON.stringify(digestOnly));
  check("a change at named digest paths only is equal after projection",
        r1.status === "equal-after-projection" && r1.removed.length === 2);
  const science = structuredClone(doc);
  const text = JSON.stringify(science);
  const mutated = text.replace(/"(-?\d+\.\d{6,})"/, (m, d) =>
      `"${d.slice(0, -1)}${d.endsWith("1") ? "2" : "1"}"`);
  check("a changed numerical token is a difference",
        mutated !== text && compare(sample, mutated).status === "different");
  const legacy = structuredClone(doc);
  legacy.resolvedModel.legacyModelFingerprint = "f".repeat(64);
  check("a changed legacy model fingerprint is a difference",
        compare(sample, JSON.stringify(legacy)).status === "different");
  const hidden = structuredClone(doc);
  hidden.modelDigest = {nested: "value"};
  check("a named path that holds anything but a digest is a difference",
        compare(sample, JSON.stringify(hidden)).status === "different");
  return results.every(Boolean);
}

function main() {
  const [baseline, candidate] = process.argv.slice(2);
  if (!baseline || !candidate) {
    console.error("usage: compare-default-outputs.mjs <baseline> <candidate>");
    process.exit(64);
  }
  if (!known(baseline)) {
    console.log("KNOWN CASE FAILED; no target evaluated.");
    process.exit(2);
  }
  const pairs = [["outputs", fs.existsSync(path.join(candidate, "outputs"))
                     ? "outputs" : "default-outputs"],
                 ["wire-outputs", "wire-outputs"]];
  const summary = {identical: 0, projected: [], different: [], missing: []};
  for (const [from, to] of pairs) {
    const baseRoot = path.join(baseline, from);
    const candRoot = path.join(candidate, to);
    const candFiles = new Set(files(candRoot));
    for (const name of files(baseRoot)) {
      if (!candFiles.has(name)) {
        summary.missing.push(`${from}/${name}`);
        continue;
      }
      candFiles.delete(name);
      const r = compare(fs.readFileSync(path.join(baseRoot, name), "utf8"),
                        fs.readFileSync(path.join(candRoot, name), "utf8"));
      if (r.status === "identical") summary.identical += 1;
      else if (r.status === "equal-after-projection") {
        summary.projected.push({file: `${from}/${name}`, removed: r.removed});
      } else summary.different.push({file: `${from}/${name}`, ...r});
    }
    for (const extra of candFiles) summary.missing.push(`extra ${to}/${extra}`);
  }
  const unnamed = summary.projected.filter((p) =>
      p.removed.some((x) => UNNAMED_IN_RECEIPT.includes(x)));
  console.log(JSON.stringify({...summary,
    unnamedInReceipt: unnamed.map((p) => p.file)}, null, 1));
  const ok = summary.different.length === 0 && summary.missing.length === 0;
  console.log(`${ok ? "PASS" : "FAIL"}  ${summary.identical} identical,` +
      ` ${summary.projected.length} equal after projection,` +
      ` ${summary.different.length} different, ${summary.missing.length}` +
      ` missing or extra; ${unnamed.length} needed a path the receipt did` +
      " not name");
  process.exit(ok ? 0 : 1);
}

main();
