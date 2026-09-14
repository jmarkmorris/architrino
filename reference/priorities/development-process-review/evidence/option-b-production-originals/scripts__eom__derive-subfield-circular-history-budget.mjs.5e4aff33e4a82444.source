import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CIRCULAR_ERROR_CONTRACT, circularConstructionBudget } from "../../src/prescribed-path-analysis/CircularHistoryConformance.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const REFERENCE = ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/subfield-circular-root-reference-20260827-v1.json";
const REFERENCE_SHA = "c5c7ae5e44e37c7a03ac916f2c406a657e9b90067c27a596302a2731a9ae066f";
const PRIMITIVE = "scripts/eom/derive-subfield-circular-root-reference.mjs";
const PRIMITIVE_SHA = "45f27a7aea84b110aa3cfa0583fb869782c2189af6b003aba4ab2215b40ac003";
const sha = (data) => createHash("sha256").update(data).digest("hex");

try {
  if (process.argv.length !== 4 || process.argv[2] !== "--out") throw new Error("Usage: node scripts/eom/derive-subfield-circular-history-budget.mjs --out <new-path>");
  const output = process.argv[3];
  if (existsSync(output)) throw new Error("output already exists; use a new report path");
  const referenceBytes = readFileSync(path.join(ROOT, REFERENCE));
  if (sha(referenceBytes) !== REFERENCE_SHA || sha(readFileSync(path.join(ROOT, PRIMITIVE))) !== PRIMITIVE_SHA) throw new Error("frozen reference drift");
  const reference = JSON.parse(referenceBytes);
  if (!reference.accepted || reference.results.length !== 16 || reference.results.some((row) => !row.passed)) throw new Error("incomplete root-reference census");
  const instrumentPaths = ["scripts/eom/derive-subfield-circular-history-budget.mjs", "src/prescribed-path-analysis/CircularHistoryConformance.mjs", PRIMITIVE];
  const instrumentBindings = instrumentPaths.map((relative) => ({ path: relative, sha256: sha(readFileSync(path.join(ROOT, relative))) }));
  const results = [];
  for (const row of reference.results) {
    const bytes = readFileSync(path.join(ROOT, row.sourcePath));
    if (sha(bytes) !== row.sourceSha256) throw new Error(`source drift: ${row.id}`);
    const source = JSON.parse(bytes.toString(), (_key, value, context) => typeof value === "number" ? context.source : value);
    const byId = new Map(source.worldlines.map((member) => [member.constituentId, member]));
    const members = source.relationships.sourceOrder.map((id) => byId.get(id));
    if (members.length !== row.memberCount || members.some((member) => !member)) throw new Error("source order mismatch");
    const bounds = members.map((member) => ({ constituentId: member.constituentId, worldlineId: member.id,
      ...circularConstructionBudget(member.operator, row.vUpper) }));
    results.push({ id: row.id, sourcePath: row.sourcePath, sourceSha256: row.sourceSha256,
      accepted: bounds.every((value) => value.accepted), members: bounds });
  }
  for (const binding of [{ path: REFERENCE, sha256: REFERENCE_SHA }, ...instrumentBindings,
    ...results.map((row) => ({ path: row.sourcePath, sha256: row.sourceSha256 }))]) {
    if (sha(readFileSync(path.join(ROOT, binding.path))) !== binding.sha256) throw new Error("midrun binding drift");
  }
  const result = { schema: "braid-program/subfield-circular-history-construction-budget.v1", accepted: results.every((row) => row.accepted),
    authority: "conditional-construction-budget-only", actualCarrierValidated: false, h3EvidenceEligible: false,
    normalizedFieldSpeed: "1", contract: CIRCULAR_ERROR_CONTRACT, referencePath: REFERENCE, referenceSha256: REFERENCE_SHA,
    instrumentBindings, results };
  writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  console.log(JSON.stringify({ accepted: result.accepted, candidates: results.length,
    members: results.reduce((total, row) => total + row.members.length, 0), actualCarrierValidated: false }));
  if (!result.accepted) process.exitCode = 1;
} catch (error) { console.error(error.message); process.exitCode = 1; }
