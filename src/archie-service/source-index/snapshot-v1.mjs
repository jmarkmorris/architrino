import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export const SOURCE_INDEX_SNAPSHOT_SCHEMA = "archie-source-index-snapshot/v1";
export const SOURCE_INDEX_BUILD_INPUT_SCHEMA = "archie-source-index-build-input/v1";
export const SOURCE_INDEX_NORMALIZATION = "canonical-json-v1";
export const SOURCE_INDEX_HASH_ALGORITHM = "sha256";

const SOURCE_CLASSES = [
  "published_corpus",
  "generated_reading_copy",
  "scene_route",
  "app_guide",
  "archie_reference",
  "priority_material",
  "external_prior_physics",
];

const SOURCE_CLASS_RULES = {
  published_corpus: {
    authorities: ["primary"],
    visibilities: ["public"],
    claimLabels: ["published corpus", "derivation target"],
  },
  generated_reading_copy: {
    authorities: ["routing_only"],
    visibilities: ["public"],
    claimLabels: ["unsupported"],
    requiresPublishedParent: true,
  },
  scene_route: {
    authorities: ["routing_only"],
    visibilities: ["public"],
    claimLabels: ["unsupported"],
    requiresPublishedParent: true,
  },
  app_guide: {
    authorities: ["diagnostic"],
    visibilities: ["public"],
    claimLabels: ["app diagnostic"],
  },
  archie_reference: {
    authorities: ["primary", "diagnostic"],
    visibilities: ["public"],
    claimLabels: ["AAA-native stance", "published corpus", "unsupported"],
  },
  priority_material: {
    authorities: ["priority_only", "excluded"],
    visibilities: ["development_status", "operator_developer", "excluded"],
    claimLabels: ["priority-only", "unsupported"],
  },
  external_prior_physics: {
    authorities: ["comparison_only", "excluded"],
    visibilities: ["external_curated", "excluded"],
    claimLabels: ["external comparison", "unsupported"],
  },
};

const EDGE_TYPES = new Set([
  "routes_to",
  "mirrors",
  "related",
  "prerequisite",
  "contains",
  "depends_on",
]);

export function buildSourceIndexSnapshot({ rootDir, input }) {
  validateBuildInput({ rootDir, input });

  const orderedInputRecords = [...input.sourceRecords].sort((left, right) =>
    left.sourceId.localeCompare(right.sourceId)
  );
  const sourceInputs = [];
  const searchRecords = [];
  const contentRecords = [];

  for (const record of orderedInputRecords) {
    const fileBuffer = readFileBuffer(rootDir, record.sourcePath);
    const fileText = fileBuffer.toString("utf8");
    const selection = selectSourceText(fileText, record.sectionAnchor, record.sourcePath);
    const sourceContentSha256 = sha256(fileBuffer);
    const selectionSha256 = sha256(selection);

    sourceInputs.push({
      sourceId: record.sourceId,
      sourcePath: record.sourcePath,
      sectionAnchor: record.sectionAnchor,
      sourceContentSha256,
      selectionSha256,
    });

    contentRecords.push({
      sourceId: record.sourceId,
      contentType: sourceContentType(record.sourcePath),
      content: selection,
      selectionSha256,
    });

    searchRecords.push({
      sourceId: record.sourceId,
      title: record.title,
      route: record.route,
      sectionAnchor: record.sectionAnchor,
      sourceClass: record.sourceClass,
      authorityStatus: record.authorityStatus,
      visibility: record.visibility,
      canonicalParent: record.canonicalParent,
      claimLabelFloor: record.claimLabelFloor,
      aliases: sortedUnique(record.aliases),
      keywords: sortedUnique(record.keywords),
      sourceContentSha256,
      selectionSha256,
      searchText: buildSearchText(record, selection),
      publicEligible:
        record.visibility === "public" &&
        !["excluded", "unsupported"].includes(record.authorityStatus),
    });
  }

  const sourceInputById = new Map(sourceInputs.map((entry) => [entry.sourceId, entry]));
  const inputRecordById = new Map(orderedInputRecords.map((entry) => [entry.sourceId, entry]));
  const graphNodes = searchRecords.map((record) => ({
    sourceId: record.sourceId,
    title: record.title,
    route: record.route,
    sourceClass: record.sourceClass,
    authorityStatus: record.authorityStatus,
    visibility: record.visibility,
    canonicalParent: record.canonicalParent,
  }));
  const graphEdges = [...input.graphEdges]
    .sort((left, right) => left.edgeId.localeCompare(right.edgeId))
    .map((edge) => ({ ...edge }));
  const metadataRecords = [...input.metadataRecords]
    .sort((left, right) => left.metadataId.localeCompare(right.metadataId))
    .map((record) =>
      buildMetadataRecord({
        rootDir,
        record,
        sourceInput: sourceInputById.get(record.sourceId),
        inputRecord: inputRecordById.get(record.sourceId),
      })
    );

  const views = {
    content: withViewHash({
      schema: "archie-source-content-view/v1",
      records: contentRecords,
    }),
    search: withViewHash({
      schema: "archie-source-search-view/v1",
      records: searchRecords,
    }),
    graph: withViewHash({
      schema: "archie-source-graph-view/v1",
      nodes: graphNodes,
      edges: graphEdges,
    }),
    metadata: withViewHash({
      schema: "archie-source-metadata-view/v1",
      records: metadataRecords,
    }),
  };

  const generatedArtifactDigests = Object.fromEntries(
    Object.entries(input.generatedArtifactRefs)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, artifactPath]) => [key, digestPath(rootDir, artifactPath)])
  );

  const snapshotWithoutHash = {
    schema: SOURCE_INDEX_SNAPSHOT_SCHEMA,
    snapshotId: input.snapshotId,
    repositoryRef: input.repositoryRef,
    schemaVersions: {
      snapshot: SOURCE_INDEX_SNAPSHOT_SCHEMA,
      content: views.content.schema,
      search: views.search.schema,
      graph: views.graph.schema,
      metadata: views.metadata.schema,
    },
    hashAlgorithm: SOURCE_INDEX_HASH_ALGORITHM,
    normalization: SOURCE_INDEX_NORMALIZATION,
    generatedArtifactRefs: orderedObject(input.generatedArtifactRefs),
    generatedArtifactDigests,
    sourceRecordCountByClass: countSourceClasses(orderedInputRecords),
    visibilityPolicyVersion: input.visibilityPolicyVersion,
    freshnessState: input.freshnessState,
    rollbackParent: input.rollbackParent,
    sourceInputs,
    views,
  };
  const snapshot = {
    ...snapshotWithoutHash,
    snapshotSha256: hashCanonical(snapshotWithoutHash),
  };

  validateSourceIndexSnapshot({ rootDir, snapshot });
  return snapshot;
}

export function validateSourceIndexSnapshot({ rootDir, snapshot }) {
  requireCondition(snapshot?.schema === SOURCE_INDEX_SNAPSHOT_SCHEMA, "snapshot has unexpected schema");
  requireCondition(snapshot.hashAlgorithm === SOURCE_INDEX_HASH_ALGORITHM, "snapshot must use sha256");
  requireCondition(
    snapshot.normalization === SOURCE_INDEX_NORMALIZATION,
    `snapshot must use ${SOURCE_INDEX_NORMALIZATION}`
  );
  requireCondition(
    canonicalJson(snapshot.schemaVersions) ===
      canonicalJson({
        snapshot: SOURCE_INDEX_SNAPSHOT_SCHEMA,
        content: "archie-source-content-view/v1",
        search: "archie-source-search-view/v1",
        graph: "archie-source-graph-view/v1",
        metadata: "archie-source-metadata-view/v1",
      }),
    "snapshot schema versions are incompatible"
  );
  requireSha256(snapshot.snapshotSha256, "snapshotSha256");

  const snapshotWithoutHash = { ...snapshot };
  delete snapshotWithoutHash.snapshotSha256;

  requireCondition(
    canonicalJson(Object.keys(snapshot.generatedArtifactRefs ?? {}).sort()) ===
      canonicalJson(Object.keys(snapshot.generatedArtifactDigests ?? {}).sort()),
    "generated artifact refs and digests must have identical keys"
  );
  for (const [key, artifactPath] of Object.entries(snapshot.generatedArtifactRefs ?? {})) {
    const expected = snapshot.generatedArtifactDigests?.[key];
    requireSha256(expected, `generatedArtifactDigests.${key}`);
    requireCondition(
      digestPath(rootDir, artifactPath) === expected,
      `generated artifact digest mismatch for ${key}`
    );
  }

  const sourceInputs = snapshot.sourceInputs ?? [];
  requireUnique(sourceInputs, "sourceId", "source input");
  requireSorted(sourceInputs, "sourceId", "source inputs");
  const sourceInputById = new Map(sourceInputs.map((entry) => [entry.sourceId, entry]));
  for (const entry of sourceInputs) {
    const fileBuffer = readFileBuffer(rootDir, entry.sourcePath);
    const fileText = fileBuffer.toString("utf8");
    const selection = selectSourceText(fileText, entry.sectionAnchor, entry.sourcePath);
    requireCondition(
      sha256(fileBuffer) === entry.sourceContentSha256,
      `source input content hash mismatch for ${entry.sourceId}`
    );
    requireCondition(
      sha256(selection) === entry.selectionSha256,
      `source input selection hash mismatch for ${entry.sourceId}`
    );
  }

  validateViewHash(snapshot.views?.content, "content");
  validateViewHash(snapshot.views?.search, "search");
  validateViewHash(snapshot.views?.graph, "graph");
  validateViewHash(snapshot.views?.metadata, "metadata");

  const searchRecords = snapshot.views.search.records ?? [];
  requireUnique(searchRecords, "sourceId", "search record");
  requireSorted(searchRecords, "sourceId", "search records");
  requireCondition(
    searchRecords.length === sourceInputs.length,
    "search record count must equal source input count"
  );
  const searchRecordById = new Map(searchRecords.map((entry) => [entry.sourceId, entry]));

  const contentRecords = snapshot.views.content.records ?? [];
  requireUnique(contentRecords, "sourceId", "content record");
  requireSorted(contentRecords, "sourceId", "content records");
  requireCondition(
    contentRecords.length === sourceInputs.length,
    "content record count must equal source input count"
  );
  for (const record of contentRecords) {
    const sourceInput = sourceInputById.get(record.sourceId);
    requireCondition(Boolean(sourceInput), `content record ${record.sourceId} lacks source input provenance`);
    requireCondition(
      sha256(record.content) === record.selectionSha256,
      `content record hash mismatch for ${record.sourceId}`
    );
    requireCondition(
      sourceInput.selectionSha256 === record.selectionSha256,
      `content record selection hash mismatch for ${record.sourceId}`
    );
    requireCondition(
      ["markdown", "json", "text"].includes(record.contentType),
      `content record ${record.sourceId} has unsupported contentType`
    );
  }

  for (const record of searchRecords) {
    validateSourceAuthority(record, searchRecordById);
    const sourceInput = sourceInputById.get(record.sourceId);
    requireCondition(Boolean(sourceInput), `search record ${record.sourceId} lacks source input provenance`);
    requireCondition(
      sourceInput.sourceContentSha256 === record.sourceContentSha256,
      `search record source hash mismatch for ${record.sourceId}`
    );
    requireCondition(
      sourceInput.selectionSha256 === record.selectionSha256,
      `search record selection hash mismatch for ${record.sourceId}`
    );
    const expectedPublicEligibility =
      record.visibility === "public" &&
      !["excluded", "unsupported"].includes(record.authorityStatus);
    requireCondition(
      record.publicEligible === expectedPublicEligibility,
      `public eligibility mismatch for ${record.sourceId}`
    );
  }

  const expectedCounts = countSourceClasses(searchRecords);
  requireCondition(
    canonicalJson(expectedCounts) === canonicalJson(snapshot.sourceRecordCountByClass),
    "source record count by class mismatch"
  );

  const graph = snapshot.views.graph;
  requireUnique(graph.nodes ?? [], "sourceId", "graph node");
  requireUnique(graph.edges ?? [], "edgeId", "graph edge");
  requireSorted(graph.nodes ?? [], "sourceId", "graph nodes");
  requireSorted(graph.edges ?? [], "edgeId", "graph edges");
  for (const node of graph.nodes ?? []) {
    requireCondition(searchRecordById.has(node.sourceId), `graph node ${node.sourceId} lacks search record`);
  }
  for (const edge of graph.edges ?? []) {
    requireCondition(EDGE_TYPES.has(edge.edgeType), `graph edge ${edge.edgeId} has unknown type`);
    requireCondition(searchRecordById.has(edge.from), `graph edge ${edge.edgeId} has missing from node`);
    requireCondition(searchRecordById.has(edge.to), `graph edge ${edge.edgeId} has missing to node`);
    requireCondition(
      searchRecordById.has(edge.evidenceSourceId),
      `graph edge ${edge.edgeId} lacks evidence source`
    );
  }

  const metadataRecords = snapshot.views.metadata.records ?? [];
  requireUnique(metadataRecords, "metadataId", "metadata record");
  requireSorted(metadataRecords, "metadataId", "metadata records");
  for (const record of metadataRecords) {
    const sourceInput = sourceInputById.get(record.sourceId);
    requireCondition(Boolean(sourceInput), `metadata record ${record.metadataId} lacks source provenance`);
    requireCondition(
      record.sourceSelectionSha256 === sourceInput.selectionSha256,
      `metadata source hash mismatch for ${record.metadataId}`
    );
    if (record.kind === "equation") {
      requireCondition(sha256(record.tex) === record.texSha256, `equation hash mismatch for ${record.metadataId}`);
    } else if (record.kind === "figure") {
      requireCondition(
        digestPath(rootDir, record.assetPath) === record.assetSha256,
        `figure asset hash mismatch for ${record.metadataId}`
      );
    } else {
      throw new Error(`metadata record ${record.metadataId} has unsupported kind ${record.kind}`);
    }
  }

  requireCondition(
    hashCanonical(snapshotWithoutHash) === snapshot.snapshotSha256,
    "snapshot hash mismatch"
  );

  return true;
}

export function hashCanonical(value) {
  return sha256(canonicalJson(value));
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

function validateBuildInput({ rootDir, input }) {
  requireCondition(input?.schema === SOURCE_INDEX_BUILD_INPUT_SCHEMA, "build input has unexpected schema");
  requireCondition(Boolean(input.snapshotId), "build input requires snapshotId");
  requireCondition(Boolean(input.repositoryRef), "build input requires repositoryRef");
  requireCondition(Boolean(input.visibilityPolicyVersion), "build input requires visibilityPolicyVersion");
  requireCondition(Array.isArray(input.sourceRecords) && input.sourceRecords.length > 0, "build input requires source records");
  requireCondition(Array.isArray(input.graphEdges), "build input requires graphEdges");
  requireCondition(Array.isArray(input.metadataRecords), "build input requires metadataRecords");

  requireUnique(input.sourceRecords, "sourceId", "source record");
  const recordById = new Map(input.sourceRecords.map((entry) => [entry.sourceId, entry]));
  for (const record of input.sourceRecords) {
    requireCondition(SOURCE_CLASSES.includes(record.sourceClass), `${record.sourceId} has unknown sourceClass`);
    validateSourceAuthority(record, recordById);
    requireSafeRelativePath(record.sourcePath, `${record.sourceId}.sourcePath`);
    requireCondition(fs.existsSync(path.join(rootDir, record.sourcePath)), `source path missing for ${record.sourceId}`);
    requireCondition(Array.isArray(record.aliases), `${record.sourceId} requires aliases`);
    requireCondition(Array.isArray(record.keywords), `${record.sourceId} requires keywords`);
    const sourceText = fs.readFileSync(path.join(rootDir, record.sourcePath), "utf8");
    selectSourceText(sourceText, record.sectionAnchor, record.sourcePath);
  }

  requireUnique(input.graphEdges, "edgeId", "graph edge input");
  for (const edge of input.graphEdges) {
    requireCondition(EDGE_TYPES.has(edge.edgeType), `graph edge ${edge.edgeId} has unknown type`);
    requireCondition(recordById.has(edge.from), `graph edge ${edge.edgeId} has missing from source`);
    requireCondition(recordById.has(edge.to), `graph edge ${edge.edgeId} has missing to source`);
    requireCondition(recordById.has(edge.evidenceSourceId), `graph edge ${edge.edgeId} lacks evidence source`);
  }

  requireUnique(input.metadataRecords, "metadataId", "metadata input");
  for (const record of input.metadataRecords) {
    requireCondition(recordById.has(record.sourceId), `metadata ${record.metadataId} has missing source`);
    requireCondition(["equation", "figure"].includes(record.kind), `metadata ${record.metadataId} has unsupported kind`);
    if (record.kind === "equation") {
      requireCondition(Boolean(record.tex), `equation ${record.metadataId} requires tex`);
    } else {
      requireSafeRelativePath(record.assetPath, `${record.metadataId}.assetPath`);
      requireCondition(fs.existsSync(path.join(rootDir, record.assetPath)), `figure asset missing for ${record.metadataId}`);
    }
  }

  for (const [key, artifactPath] of Object.entries(input.generatedArtifactRefs ?? {})) {
    requireSafeRelativePath(artifactPath, `generatedArtifactRefs.${key}`);
    requireCondition(fs.existsSync(path.join(rootDir, artifactPath)), `generated artifact ref ${key} is missing`);
  }
}

function validateSourceAuthority(record, recordById) {
  const rules = SOURCE_CLASS_RULES[record.sourceClass];
  requireCondition(Boolean(rules), `${record.sourceId} has unknown source class ${record.sourceClass}`);
  requireCondition(
    rules.authorities.includes(record.authorityStatus),
    `${record.sourceId}: ${record.sourceClass} requires authorityStatus ${rules.authorities.join(" or ")}`
  );
  requireCondition(
    rules.visibilities.includes(record.visibility),
    `${record.sourceId}: ${record.sourceClass} cannot use visibility ${record.visibility}`
  );
  requireCondition(
    rules.claimLabels.includes(record.claimLabelFloor),
    `${record.sourceId}: ${record.sourceClass} cannot use claimLabelFloor ${record.claimLabelFloor}`
  );
  if (rules.requiresPublishedParent) {
    requireCondition(Boolean(record.canonicalParent), `${record.sourceId} requires a canonical parent`);
    const parent = recordById.get(record.canonicalParent);
    requireCondition(Boolean(parent), `${record.sourceId} canonical parent is missing`);
    requireCondition(
      parent.sourceClass === "published_corpus",
      `${record.sourceId} canonical parent must be published_corpus`
    );
  } else if (record.canonicalParent !== null) {
    requireCondition(recordById.has(record.canonicalParent), `${record.sourceId} canonical parent is missing`);
  }
}

function buildMetadataRecord({ rootDir, record, sourceInput, inputRecord }) {
  const sourceText = fs.readFileSync(path.join(rootDir, inputRecord.sourcePath), "utf8");
  const selection = selectSourceText(sourceText, inputRecord.sectionAnchor, inputRecord.sourcePath);
  if (record.kind === "equation") {
    requireCondition(
      selection.includes(record.tex),
      `equation ${record.metadataId} is not present in source selection`
    );
    return {
      metadataId: record.metadataId,
      kind: "equation",
      sourceId: record.sourceId,
      route: inputRecord.route,
      sourceSelectionSha256: sourceInput.selectionSha256,
      tex: record.tex,
      texSha256: sha256(record.tex),
    };
  }

  const referencedAssets = markdownImageTargets(selection, inputRecord.sourcePath);
  requireCondition(
    referencedAssets.has(record.assetPath),
    `figure ${record.metadataId} asset is not referenced by its source selection`
  );
  return {
    metadataId: record.metadataId,
    kind: "figure",
    sourceId: record.sourceId,
    route: inputRecord.route,
    sourceSelectionSha256: sourceInput.selectionSha256,
    assetPath: record.assetPath,
    assetSha256: digestPath(rootDir, record.assetPath),
    altText: record.altText,
  };
}

function markdownImageTargets(markdown, sourcePath) {
  const targets = new Set();
  for (const match of markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, "");
    if (/^[a-z]+:/i.test(rawTarget) || rawTarget.startsWith("#")) continue;
    const withoutFragment = rawTarget.split("#", 1)[0];
    targets.add(path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), withoutFragment)));
  }
  return targets;
}

function selectSourceText(text, sectionAnchor, sourcePath) {
  if (sectionAnchor === null) return text;
  const lines = text.split(/\r?\n/);
  let start = -1;
  let level = null;
  for (let index = 0; index < lines.length; index += 1) {
    const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(lines[index]);
    if (!heading || slugifyHeading(heading[2]) !== sectionAnchor) continue;
    start = index;
    level = heading[1].length;
    break;
  }
  requireCondition(start >= 0, `section ${sectionAnchor} missing from ${sourcePath}`);
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const heading = /^(#{1,6})\s+/.exec(lines[index]);
    if (heading && heading[1].length <= level) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n").trimEnd() + "\n";
}

function buildSearchText(record, selection) {
  const stripped = selection
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 480);
  return [record.title, ...record.aliases, ...record.keywords, stripped]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function sourceContentType(sourcePath) {
  if (sourcePath.endsWith(".md")) return "markdown";
  if (sourcePath.endsWith(".json")) return "json";
  return "text";
}

function countSourceClasses(records) {
  const counts = Object.fromEntries(SOURCE_CLASSES.map((sourceClass) => [sourceClass, 0]));
  for (const record of records) counts[record.sourceClass] += 1;
  return counts;
}

function withViewHash(viewWithoutHash) {
  return { ...viewWithoutHash, sha256: hashCanonical(viewWithoutHash) };
}

function validateViewHash(view, label) {
  requireCondition(Boolean(view), `snapshot lacks ${label} view`);
  requireCondition(
    view.schema === `archie-source-${label}-view/v1`,
    `${label} view has incompatible schema`
  );
  requireSha256(view.sha256, `${label} view sha256`);
  const withoutHash = { ...view };
  delete withoutHash.sha256;
  requireCondition(hashCanonical(withoutHash) === view.sha256, `${label} view hash mismatch`);
}

function digestPath(rootDir, relativePath) {
  requireSafeRelativePath(relativePath, "digest path");
  const absolutePath = path.join(rootDir, relativePath);
  requireCondition(fs.existsSync(absolutePath), `digest path missing: ${relativePath}`);
  const stat = fs.statSync(absolutePath);
  if (stat.isFile()) return sha256(fs.readFileSync(absolutePath));
  requireCondition(stat.isDirectory(), `digest path is neither file nor directory: ${relativePath}`);
  const files = listFiles(absolutePath).map((filePath) => ({
    path: path.relative(absolutePath, filePath).split(path.sep).join("/"),
    sha256: sha256(fs.readFileSync(filePath)),
  }));
  return hashCanonical(files);
}

function listFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(fullPath));
    else if (entry.isFile()) files.push(fullPath);
    else if (entry.isSymbolicLink()) throw new Error(`digest directory contains unsupported symlink: ${fullPath}`);
  }
  return files;
}

function readFileBuffer(rootDir, relativePath) {
  requireSafeRelativePath(relativePath, "source path");
  const absolutePath = path.join(rootDir, relativePath);
  requireCondition(fs.existsSync(absolutePath), `source path missing: ${relativePath}`);
  requireCondition(fs.statSync(absolutePath).isFile(), `source path is not a file: ${relativePath}`);
  return fs.readFileSync(absolutePath);
}

function requireSafeRelativePath(relativePath, label) {
  requireCondition(typeof relativePath === "string" && relativePath.length > 0, `${label} is required`);
  requireCondition(!path.isAbsolute(relativePath), `${label} must be relative`);
  requireCondition(!relativePath.split(/[\\/]/).includes(".."), `${label} must not traverse upward`);
}

function requireUnique(records, key, label) {
  const seen = new Set();
  for (const record of records) {
    requireCondition(Boolean(record?.[key]), `${label} requires ${key}`);
    requireCondition(!seen.has(record[key]), `duplicate ${label} ${record[key]}`);
    seen.add(record[key]);
  }
}

function requireSorted(records, key, label) {
  const values = records.map((record) => record[key]);
  const sorted = [...values].sort((left, right) => left.localeCompare(right));
  requireCondition(canonicalJson(values) === canonicalJson(sorted), `${label} are not canonically sorted`);
}

function requireSha256(value, label) {
  requireCondition(typeof value === "string" && /^[a-f0-9]{64}$/.test(value), `${label} must be sha256`);
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object" && !Buffer.isBuffer(value)) {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])])
    );
  }
  return value;
}

function orderedObject(value) {
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)));
}

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function slugifyHeading(value) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
