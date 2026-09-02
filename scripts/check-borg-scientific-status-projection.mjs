import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";

import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import { validateBorgScientificStatusProjection } from "../src/apps/borg/BorgScientificStatus.mjs";

const projectionPath = new URL("../reference/priorities/braid-program/braid-candidate-adjudication-projection.v1.json", import.meta.url);
const projection = validateBorgScientificStatusProjection(JSON.parse(await readFile(projectionPath)));
const ownerBytes = await readFile(new URL(`../${projection.source}`, import.meta.url));
const ownerText = ownerBytes.toString("utf8");
const ownerSha256 = createHash("sha256").update(ownerBytes).digest("hex");
if (ownerSha256 !== projection.sourceSha256) throw new Error(`Projection source digest is stale: expected ${projection.sourceSha256}, current ${ownerSha256}.`);

const catalog = new Set(BORG_ASSEMBLY_RECORD_CATALOG.entries.map((entry) => `${entry.assemblyId}:${entry.modelRevisionSha256}`));
for (const relation of projection.relations) {
  if (relation.kind === "adjudication" && !ownerText.includes(relation.sourceRow)) {
    throw new Error(`Projection relation ${relation.relationId} is missing from the current owner.`);
  }
  const exactTargets = relation.match.kind === "exact-configuration-set" ? relation.match.configurations
    : ["exact-configuration", "context-target"].includes(relation.match.kind) ? [relation.match] : [];
  for (const link of relation.evidenceLinks) await stat(new URL(`../${link.url.split("#")[0]}`, import.meta.url));
}

const activeAdjudications = projection.relations.filter((relation) => relation.kind === "adjudication" && relation.lifecycle === "active");
const h4Passes = activeAdjudications.filter((relation) => relation.requirements.H4 === "P[M]");
const h5Passes = activeAdjudications.filter((relation) => relation.requirements.H5.startsWith("P["));
if (h4Passes.length !== 3 || h5Passes.length !== 0) throw new Error(`Unexpected owner census: H4 P[M]=${h4Passes.length}, H5 pass=${h5Passes.length}.`);
const activeExactAdjudications = activeAdjudications.filter((relation) => relation.scope === "exact-configuration");
const currentExactBindings = activeExactAdjudications.filter((relation) =>
  catalog.has(`${relation.match.assemblyId}:${relation.match.modelRevisionSha256}`));
const offCatalogExactBindings = activeExactAdjudications.length - currentExactBindings.length;
if (currentExactBindings.length !== 24 || offCatalogExactBindings !== 1) {
  throw new Error(`Expected 24 current exact Borg adjudication bindings and one exact evidence row preserved off-catalog; found ${currentExactBindings.length} and ${offCatalogExactBindings}.`);
}

console.log(`Borg scientific-status projection OK: ${activeAdjudications.length} adjudication rows, ${h4Passes.length} H4 P[M], ${h5Passes.length} H5 passes; ${currentExactBindings.length} current exact bindings and ${offCatalogExactBindings} preserved off-catalog exact row.`);
