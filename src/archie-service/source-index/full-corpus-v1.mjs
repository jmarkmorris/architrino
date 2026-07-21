import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  SOURCE_INDEX_BUILD_INPUT_SCHEMA,
  buildSourceIndexSnapshot,
  hashCanonical,
} from "./snapshot-v1.mjs";

export const FULL_CORPUS_SNAPSHOT_PATH =
  "content/generated/source-index/local-full-corpus-snapshot.v1.json";
export const FULL_CORPUS_VISIBILITY_POLICY_VERSION = "archie-source-visibility/v1";

const MARKDOWN_INDEX_PATH = "content/markdown/markdown_index.json";
const SCENES_INDEX_PATH = "content/scenes/scenes_index.json";
const READING_COPY_DIRECTORY = "content/generated/markdown/textbook/reading-copies";
const TEXTBOOK_TOC_PATH = "content/graph/textbook_toc.json";
const ARCHIE_PREFIX = "content/markdown/aaa/archie/";

const APP_GUIDE_PATHS = new Set([
  `${ARCHIE_PREFIX}about-the-webapp.md`,
  `${ARCHIE_PREFIX}download-textbook-pdf.md`,
  `${ARCHIE_PREFIX}github-presence-and-community.md`,
  `${ARCHIE_PREFIX}ideal-braid-guide.md`,
  `${ARCHIE_PREFIX}navigation-and-controls.md`,
  `${ARCHIE_PREFIX}photon-guide.md`,
  `${ARCHIE_PREFIX}support-architrino-research.md`,
  `${ARCHIE_PREFIX}ui-guidelines.md`,
]);

const PRIMARY_ARCHIE_REFERENCE_PATHS = new Set([
  `${ARCHIE_PREFIX}academic-style-guide.md`,
  `${ARCHIE_PREFIX}comparative-glossary.md`,
  `${ARCHIE_PREFIX}mathematics-style-guide.md`,
  `${ARCHIE_PREFIX}mathematics-terminology.md`,
  `${ARCHIE_PREFIX}software-architecture-and-maintenance.md`,
  `${ARCHIE_PREFIX}system-card.md`,
  `${ARCHIE_PREFIX}terminology-usage.md`,
]);

export function enumerateFullCorpusBuildInput({ rootDir }) {
  const markdownIndex = readJson(rootDir, MARKDOWN_INDEX_PATH);
  requireCondition(Array.isArray(markdownIndex.files), "markdown index requires files");
  const markdownPaths = sortedUnique(markdownIndex.files);
  requireCondition(
    markdownPaths.length === markdownIndex.files.length,
    "markdown index contains duplicate paths"
  );

  const sourceRecords = [];
  const graphEdges = [];
  const metadataRecords = [];
  const authoredByPath = new Map();
  const publishedByTitle = new Map();

  for (const sourcePath of markdownPaths) {
    requireCanonicalMarkdownPath(sourcePath);
    const text = readText(rootDir, sourcePath);
    const title = firstHeading(text, sourcePath);
    const classification = classifyAuthoredSource(sourcePath);
    const documentSourceId = authoredSourceId(sourcePath, classification.sourceClass);
    const documentRecord = sourceRecord({
      sourceId: documentSourceId,
      title,
      route: sourcePath,
      sourcePath,
      sectionAnchor: null,
      ...classification,
    });
    sourceRecords.push(documentRecord);
    authoredByPath.set(sourcePath, documentRecord);
    if (classification.sourceClass === "published_corpus") {
      requireCondition(!publishedByTitle.has(title), `duplicate published title: ${title}`);
      publishedByTitle.set(title, documentRecord);
    }

    const sections = levelTwoSections(text, sourcePath);
    const prefix = sections.length === 0 ? text : text.slice(0, sections[0].start);
    metadataRecords.push(...extractMetadata({ rootDir, sourceId: documentSourceId, sourcePath, text: prefix }));

    for (const section of sections) {
      const sectionSourceId = `${documentSourceId}.section.${section.anchor}`;
      sourceRecords.push(
        sourceRecord({
          sourceId: sectionSourceId,
          title: `${title}: ${section.title}`,
          route: `${sourcePath}#${section.anchor}`,
          sourcePath,
          sectionAnchor: section.anchor,
          ...classification,
          canonicalParent: documentSourceId,
        })
      );
      graphEdges.push({
        edgeId: `edge.contains.${documentSourceId}.${section.anchor}`,
        edgeType: "contains",
        from: documentSourceId,
        to: sectionSourceId,
        evidenceSourceId: documentSourceId,
      });
      metadataRecords.push(
        ...extractMetadata({
          rootDir,
          sourceId: sectionSourceId,
          sourcePath,
          text: section.text,
        })
      );
    }
  }

  enumerateReadingCopies({
    rootDir,
    sourceRecords,
    graphEdges,
    publishedByTitle,
  });
  enumerateSceneRoutes({
    rootDir,
    sourceRecords,
    graphEdges,
    authoredByPath,
  });

  sourceRecords.sort(by("sourceId"));
  graphEdges.sort(by("edgeId"));
  metadataRecords.sort(by("metadataId"));
  requireUniqueValues(sourceRecords, "sourceId", "source id");
  requireUniqueValues(sourceRecords, "route", "source route");
  requireUniqueValues(graphEdges, "edgeId", "edge id");
  requireUniqueValues(metadataRecords, "metadataId", "metadata id");

  const baseInput = {
    schema: SOURCE_INDEX_BUILD_INPUT_SCHEMA,
    snapshotId: "pending-local-source-state",
    repositoryRef: "local-source-state:pending",
    generatedArtifactRefs: {
      markdownIndex: MARKDOWN_INDEX_PATH,
      readingCopies: `${READING_COPY_DIRECTORY}/`,
      scenesIndex: SCENES_INDEX_PATH,
      textbookToc: TEXTBOOK_TOC_PATH,
    },
    sourceRecords,
    graphEdges,
    metadataRecords,
    visibilityPolicyVersion: FULL_CORPUS_VISIBILITY_POLICY_VERSION,
    freshnessState: "fresh",
    rollbackParent: null,
  };
  const sourceStateSha256 = sourceStateFingerprint({ rootDir, input: baseInput });
  return {
    ...baseInput,
    snapshotId: `source_snapshot_full_corpus_v1_${sourceStateSha256.slice(0, 20)}`,
    repositoryRef: `local-source-state:${sourceStateSha256}`,
  };
}

export function buildFullCorpusSnapshot({ rootDir }) {
  const input = enumerateFullCorpusBuildInput({ rootDir });
  return { input, snapshot: buildSourceIndexSnapshot({ rootDir, input }) };
}

function enumerateReadingCopies({ rootDir, sourceRecords, graphEdges, publishedByTitle }) {
  const directory = path.join(rootDir, READING_COPY_DIRECTORY);
  const files = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => `${READING_COPY_DIRECTORY}/${entry.name}`)
    .sort();

  for (const sourcePath of files) {
    // The aggregate textbook repeats chapter material already represented by the
    // chapter reading copies and does not provide a distinct topic route.
    if (sourcePath === `${READING_COPY_DIRECTORY}/architrino-textbook.md`) continue;
    const text = readText(rootDir, sourcePath);
    for (const section of levelTwoSections(text, sourcePath)) {
      const parent = publishedByTitle.get(section.title);
      if (!parent) continue;
      const sourceId = `source.generated-reading-copy.${pathToken(sourcePath)}.${section.anchor}`;
      sourceRecords.push(
        sourceRecord({
          sourceId,
          title: `Generated Reading Copy: ${section.title}`,
          route: `document-sphere:${parent.route}`,
          sourcePath,
          sectionAnchor: section.anchor,
          sourceClass: "generated_reading_copy",
          authorityStatus: "routing_only",
          visibility: "public",
          canonicalParent: parent.sourceId,
          claimLabelFloor: "unsupported",
        })
      );
      graphEdges.push({
        edgeId: `edge.mirrors.${sourceId}`,
        edgeType: "mirrors",
        from: sourceId,
        to: parent.sourceId,
        evidenceSourceId: sourceId,
      });
    }
  }
}

function enumerateSceneRoutes({ rootDir, sourceRecords, graphEdges, authoredByPath }) {
  const index = readJson(rootDir, SCENES_INDEX_PATH);
  requireCondition(Array.isArray(index.scenes), "scenes index requires scenes");
  const seenSceneIds = new Set();
  const seenScenePaths = new Set();
  for (const entry of [...index.scenes].sort(by("path"))) {
    requireCondition(typeof entry.id === "string" && entry.id.length > 0, "scene entry requires id");
    requireCondition(typeof entry.path === "string" && entry.path.length > 0, `${entry.id}: scene entry requires path`);
    requireCondition(!seenSceneIds.has(entry.id), `duplicate scene id: ${entry.id}`);
    requireCondition(!seenScenePaths.has(entry.path), `duplicate scene path: ${entry.path}`);
    seenSceneIds.add(entry.id);
    seenScenePaths.add(entry.path);
    const scene = readJson(rootDir, entry.path);
    const markdownPath = scene.scene?.source?.type === "markdown" ? scene.scene.source.path : null;
    if (!markdownPath) continue;
    const parent = authoredByPath.get(markdownPath);
    if (!parent || parent.sourceClass !== "published_corpus") continue;
    const sourceId = `source.scene-route.${pathToken(entry.path)}`;
    sourceRecords.push(
      sourceRecord({
        sourceId,
        title: `Scene Route: ${entry.name}`,
        route: `scene:${entry.id}`,
        sourcePath: entry.path,
        sectionAnchor: null,
        sourceClass: "scene_route",
        authorityStatus: "routing_only",
        visibility: "public",
        canonicalParent: parent.sourceId,
        claimLabelFloor: "unsupported",
      })
    );
    graphEdges.push({
      edgeId: `edge.routes-to.${sourceId}`,
      edgeType: "routes_to",
      from: sourceId,
      to: parent.sourceId,
      evidenceSourceId: sourceId,
    });
  }
}

function classifyAuthoredSource(sourcePath) {
  if (APP_GUIDE_PATHS.has(sourcePath)) {
    return {
      sourceClass: "app_guide",
      authorityStatus: "diagnostic",
      visibility: "public",
      canonicalParent: null,
      claimLabelFloor: "app diagnostic",
    };
  }
  if (sourcePath.startsWith(ARCHIE_PREFIX)) {
    const primary = PRIMARY_ARCHIE_REFERENCE_PATHS.has(sourcePath);
    return {
      sourceClass: "archie_reference",
      authorityStatus: primary ? "primary" : "diagnostic",
      visibility: "public",
      canonicalParent: null,
      claimLabelFloor: primary ? "AAA-native stance" : "unsupported",
    };
  }
  return {
    sourceClass: "published_corpus",
    authorityStatus: "primary",
    visibility: "public",
    canonicalParent: null,
    claimLabelFloor: "published corpus",
  };
}

function sourceRecord(record) {
  return { ...record, aliases: [], keywords: [] };
}

function authoredSourceId(sourcePath, sourceClass) {
  const prefix = {
    published_corpus: "source.published-corpus",
    app_guide: "source.app-guide",
    archie_reference: "source.archie-reference",
  }[sourceClass];
  return `${prefix}.${pathToken(sourcePath)}`;
}

function extractMetadata({ rootDir, sourceId, sourcePath, text }) {
  const records = [];
  let equationIndex = 0;
  for (const match of text.matchAll(/\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]/g)) {
    equationIndex += 1;
    records.push({
      metadataId: `metadata.${sourceId}.equation.${String(equationIndex).padStart(4, "0")}`,
      kind: "equation",
      sourceId,
      tex: match[0],
    });
  }

  let figureIndex = 0;
  for (const match of text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const rawTarget = match[2].trim().replace(/^<|>$/g, "");
    if (/^[a-z]+:/i.test(rawTarget) || rawTarget.startsWith("#")) continue;
    const withoutFragment = rawTarget.split("#", 1)[0];
    const assetPath = path.posix.normalize(
      path.posix.join(path.posix.dirname(sourcePath), withoutFragment)
    );
    requireCondition(
      fs.existsSync(path.join(rootDir, assetPath)),
      `${sourcePath}: figure asset is missing: ${assetPath}`
    );
    figureIndex += 1;
    records.push({
      metadataId: `metadata.${sourceId}.figure.${String(figureIndex).padStart(4, "0")}`,
      kind: "figure",
      sourceId,
      assetPath,
      altText: match[1],
    });
  }
  return records;
}

function levelTwoSections(text, sourcePath) {
  const matches = [...text.matchAll(/^##\s+(.+?)\s*$/gm)];
  const anchors = new Set();
  return matches.map((match, index) => {
    const title = match[1];
    const anchor = slugifyHeading(title);
    requireCondition(anchor.length > 0, `${sourcePath}: H2 heading has an empty anchor`);
    requireCondition(!anchors.has(anchor), `${sourcePath}: duplicate H2 anchor ${anchor}`);
    anchors.add(anchor);
    const start = match.index;
    const end = matches[index + 1]?.index ?? text.length;
    return { title, anchor, start, end, text: text.slice(start, end).trimEnd() + "\n" };
  });
}

function firstHeading(text, sourcePath) {
  const match = /^#\s+(.+?)\s*$/m.exec(text);
  requireCondition(Boolean(match), `${sourcePath}: missing H1 title`);
  return match[1];
}

function sourceStateFingerprint({ rootDir, input }) {
  const paths = sortedUnique([
    ...input.sourceRecords.map((record) => record.sourcePath),
    ...Object.values(input.generatedArtifactRefs),
  ]);
  const fileManifest = [];
  for (const relativePath of paths) {
    const absolutePath = path.join(rootDir, relativePath);
    const stat = fs.statSync(absolutePath);
    if (stat.isFile()) {
      fileManifest.push({ path: relativePath, sha256: digest(fs.readFileSync(absolutePath)) });
      continue;
    }
    requireCondition(stat.isDirectory(), `${relativePath}: source state path is unsupported`);
    for (const filePath of listFiles(absolutePath)) {
      fileManifest.push({
        path: path.relative(rootDir, filePath).split(path.sep).join("/"),
        sha256: digest(fs.readFileSync(filePath)),
      });
    }
  }
  fileManifest.sort(by("path"));
  return hashCanonical({
    schema: "archie-full-corpus-source-state/v1",
    sourceRecords: input.sourceRecords,
    graphEdges: input.graphEdges,
    metadataRecords: input.metadataRecords,
    generatedArtifactRefs: input.generatedArtifactRefs,
    fileManifest,
  });
}

function listFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(absolutePath));
    else if (entry.isFile()) files.push(absolutePath);
    else throw new Error(`source state directory contains unsupported entry: ${absolutePath}`);
  }
  return files;
}

function readJson(rootDir, relativePath) {
  return JSON.parse(readText(rootDir, relativePath));
}

function readText(rootDir, relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  requireCondition(fs.existsSync(absolutePath), `source path missing: ${relativePath}`);
  return fs.readFileSync(absolutePath, "utf8");
}

function requireCanonicalMarkdownPath(sourcePath) {
  requireCondition(
    sourcePath.startsWith("content/markdown/aaa/") && sourcePath.endsWith(".md"),
    `markdown index path is outside canonical corpus: ${sourcePath}`
  );
}

function pathToken(relativePath) {
  return relativePath
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");
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

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function requireUniqueValues(records, key, label) {
  const seen = new Set();
  for (const record of records) {
    requireCondition(typeof record[key] === "string" && record[key].length > 0, `${label} is missing`);
    requireCondition(!seen.has(record[key]), `duplicate ${label}: ${record[key]}`);
    seen.add(record[key]);
  }
}

function by(key) {
  return (left, right) => left[key].localeCompare(right[key]);
}

function digest(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}
