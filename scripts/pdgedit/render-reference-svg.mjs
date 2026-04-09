#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import {
  getAllPdgeditReviewGroups,
  loadPdgeditReviewGroupCatalogFromFile,
  loadPdgeditTileCatalogFromFile,
  renderPdgeditGroupReferenceSvg,
  renderPdgeditTileReferenceSvg,
} from "./ReferenceSvgRuntime.mjs";

const repoRootPath = fileURLToPath(new URL("../../", import.meta.url));

function formatUsage() {
  return [
    "Usage: node scripts/pdgedit/render-reference-svg.mjs [options]",
    "",
    "Batch options:",
    "  --spec-json path           Tile catalog JSON.",
    "  --group-spec-json path     Review-group catalog JSON.",
    "  --output-dir path          Directory for generated SVG files.",
    "  --output-prefix text       Tile filename prefix. Default: pdgedit-tile-",
    "  --group-output-prefix text Group filename prefix. Default: pdgedit-group-",
    "",
    "Single render options:",
    "  --tile-key key             Render one tile.",
    "  --group-key key            Render one group.",
    "  --output path              Output file for a single tile or group.",
    "  --stdout                   Write a single tile or group SVG to stdout.",
    "",
    "Shared options:",
    "  --top-count text           Substitute text for N placeholders. Default: N",
    "  --bottom-count text        Substitute text for M placeholders. Default: M",
    "  --help                     Show this help text.",
  ].join("\n");
}

function requireValue(argv, index, flagName) {
  const value = argv[index + 1];
  if (value == null || String(value).startsWith("--")) {
    throw new Error(`${flagName} requires a value.`);
  }
  return { value: String(value), nextIndex: index + 1 };
}

function parseArgs(argv) {
  const parsed = {
    specJsonPath: path.join(repoRootPath, "src", "apps", "pdgedit", "pdgedit-tiles.json"),
    groupSpecJsonPath: path.join(repoRootPath, "src", "apps", "pdgedit", "pdgedit-review-groups.json"),
    outputDirPath: path.join(repoRootPath, "scripts", "glyphs"),
    outputPrefix: "pdgedit-tile-",
    groupOutputPrefix: "pdgedit-group-",
    tileKey: "",
    groupKey: "",
    outputPath: "",
    writeStdout: false,
    topCount: "N",
    bottomCount: "M",
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = String(argv[index]);
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }
    if (arg === "--spec-json") {
      const { value, nextIndex } = requireValue(argv, index, "--spec-json");
      parsed.specJsonPath = path.resolve(repoRootPath, value);
      index = nextIndex;
      continue;
    }
    if (arg === "--group-spec-json") {
      const { value, nextIndex } = requireValue(argv, index, "--group-spec-json");
      parsed.groupSpecJsonPath = path.resolve(repoRootPath, value);
      index = nextIndex;
      continue;
    }
    if (arg === "--output-dir") {
      const { value, nextIndex } = requireValue(argv, index, "--output-dir");
      parsed.outputDirPath = path.resolve(repoRootPath, value);
      index = nextIndex;
      continue;
    }
    if (arg === "--output-prefix") {
      const { value, nextIndex } = requireValue(argv, index, "--output-prefix");
      parsed.outputPrefix = value;
      index = nextIndex;
      continue;
    }
    if (arg === "--group-output-prefix") {
      const { value, nextIndex } = requireValue(argv, index, "--group-output-prefix");
      parsed.groupOutputPrefix = value;
      index = nextIndex;
      continue;
    }
    if (arg === "--tile-key") {
      const { value, nextIndex } = requireValue(argv, index, "--tile-key");
      parsed.tileKey = value;
      index = nextIndex;
      continue;
    }
    if (arg === "--group-key") {
      const { value, nextIndex } = requireValue(argv, index, "--group-key");
      parsed.groupKey = value;
      index = nextIndex;
      continue;
    }
    if (arg === "--output") {
      const { value, nextIndex } = requireValue(argv, index, "--output");
      parsed.outputPath = path.resolve(repoRootPath, value);
      index = nextIndex;
      continue;
    }
    if (arg === "--stdout") {
      parsed.writeStdout = true;
      continue;
    }
    if (arg === "--top-count") {
      const { value, nextIndex } = requireValue(argv, index, "--top-count");
      parsed.topCount = value;
      index = nextIndex;
      continue;
    }
    if (arg === "--bottom-count") {
      const { value, nextIndex } = requireValue(argv, index, "--bottom-count");
      parsed.bottomCount = value;
      index = nextIndex;
      continue;
    }
    throw new Error(`Unknown option: ${arg}`);
  }

  if (parsed.tileKey && parsed.groupKey) {
    throw new Error("Use either --tile-key or --group-key, not both.");
  }
  if (parsed.writeStdout && !parsed.tileKey && !parsed.groupKey) {
    throw new Error("--stdout is only supported with --tile-key or --group-key.");
  }
  return parsed;
}

function writeOutputFile(outputPath, contents) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, contents, "utf8");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(formatUsage());
    return;
  }

  const catalog = loadPdgeditTileCatalogFromFile(options.specJsonPath);
  const groupCatalog = loadPdgeditReviewGroupCatalogFromFile(options.groupSpecJsonPath);
  const tileByKey = new Map(catalog.tiles.map((tile) => [tile.key, tile]));
  const groupByKey = new Map(getAllPdgeditReviewGroups(groupCatalog).map((group) => [group.key, group]));
  const sampleCounts = {
    topCount: options.topCount,
    bottomCount: options.bottomCount,
  };

  if (options.tileKey || options.groupKey) {
    let outputPath = options.outputPath;
    let svgText = "";
    if (options.tileKey) {
      const tile = tileByKey.get(options.tileKey);
      if (!tile) {
        throw new Error(`Unknown pdgedit tile key: ${options.tileKey}`);
      }
      svgText = renderPdgeditTileReferenceSvg(tile, catalog, { sampleCounts });
      outputPath ||= path.join(options.outputDirPath, `${options.outputPrefix}${tile.key}.svg`);
    } else {
      const group = groupByKey.get(options.groupKey);
      if (!group) {
        throw new Error(`Unknown pdgedit review group key: ${options.groupKey}`);
      }
      svgText = renderPdgeditGroupReferenceSvg(group, tileByKey, catalog, { sampleCounts });
      outputPath ||= path.join(options.outputDirPath, `${options.groupOutputPrefix}${group.key}.svg`);
    }
    if (options.writeStdout) {
      process.stdout.write(svgText);
      return;
    }
    writeOutputFile(outputPath, svgText);
    console.log(outputPath);
    return;
  }

  fs.mkdirSync(options.outputDirPath, { recursive: true });
  const writtenPaths = [];
  catalog.tiles.forEach((tile) => {
    const outputPath = path.join(options.outputDirPath, `${options.outputPrefix}${tile.key}.svg`);
    writeOutputFile(outputPath, renderPdgeditTileReferenceSvg(tile, catalog, { sampleCounts }));
    writtenPaths.push(outputPath);
  });
  getAllPdgeditReviewGroups(groupCatalog).forEach((group) => {
    const outputPath = path.join(options.outputDirPath, `${options.groupOutputPrefix}${group.key}.svg`);
    writeOutputFile(outputPath, renderPdgeditGroupReferenceSvg(group, tileByKey, catalog, { sampleCounts }));
    writtenPaths.push(outputPath);
  });
  writtenPaths.forEach((writtenPath) => {
    console.log(writtenPath);
  });
}

try {
  main();
} catch (error) {
  console.error(String(error?.message || error));
  process.exitCode = 1;
}
