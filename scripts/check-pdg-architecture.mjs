import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { getStandaloneAppPathForScene } from "../src/apps/navigator/StandaloneAppLaunchRuntime.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readRepoFile(relativePath) {
  return fs.readFileSync(path.resolve(repoRoot, relativePath), "utf8");
}

function repoFileExists(relativePath) {
  return fs.existsSync(path.resolve(repoRoot, relativePath));
}

function getLineNumber(source, searchValue) {
  const offset = source.indexOf(searchValue);
  if (offset < 0) {
    return null;
  }
  return source.slice(0, offset).split("\n").length;
}

export function auditPdgArchitecture() {
  const issues = [];

  const archivedStandaloneEntrypoints = [
    ["pdgedit", "./pdgedit.html"],
    ["pdgview", "./pdgview.html"],
  ];
  archivedStandaloneEntrypoints.forEach(([sceneId, expectedPath]) => {
    const actualPath = getStandaloneAppPathForScene(sceneId);
    if (actualPath !== null) {
      issues.push(
        `Main webapp launcher still exposes archived PDG route '${sceneId}' as '${actualPath}'.`
      );
    }
    if (!repoFileExists(expectedPath.slice(2))) {
      issues.push(`Expected archived standalone entrypoint '${expectedPath}' does not exist.`);
    }
  });

  if (getStandaloneAppPathForScene("pdgsolve") !== null) {
    issues.push("Standalone launcher unexpectedly exposes 'pdgsolve'; pdgsolve intentionally has no UI.");
  }

  const forbiddenPaths = [
    "pdgsolve.html",
    "src/apps/pdgsolve/main.js",
    "src/apps/pdgsolve/PdgsolvePdgeditPublicationRuntime.js",
  ];
  forbiddenPaths.forEach((relativePath) => {
    if (repoFileExists(relativePath)) {
      issues.push(`Unexpected pdgsolve UI path exists: '${relativePath}'.`);
    }
  });

  const docsToAudit = [
    "reference/priorities/pdg/pdg.md",
    "reference/priorities/pdg/pdgapps.md",
  ];
  const forbiddenDocSnippets = [
    {
      text: "`pdgsolve.html`",
      message: "Docs still describe a pdgsolve standalone HTML entrypoint.",
    },
    {
      text: "`src/apps/pdgsolve/main.js`",
      message: "Docs still describe a pdgsolve standalone app runtime.",
    },
    {
      text: "`src/apps/pdgsolve/PdgsolvePdgeditPublicationRuntime.js`",
      message: "Docs still describe a nonexistent pdgsolve publication runtime file.",
    },
    {
      text: "routes `pdgview`, `pdgsolve`, and `pdgedit` into dedicated standalone HTML entrypoints",
      message: "Docs still claim the launcher routes pdgsolve as a standalone app.",
    },
    {
      text: "standalone launch routing now exists for `pdgview`, `pdgsolve`, and `pdgedit`",
      message: "Docs still claim pdgsolve participates in standalone launch routing.",
    },
    {
      text: "`pdgview.html`, `pdgsolve.html`, and `pdgedit.html` as active standalone app entrypoints",
      message: "Docs still claim pdgsolve has a standalone HTML entrypoint.",
    },
    {
      text: "active standalone app entrypoints in the main web surface",
      message: "Docs still describe archived PDG entrypoints as part of the main web surface.",
    },
    {
      text: "standalone launch routing now exists for `pdgview` and `pdgedit`",
      message: "Docs still claim the main launcher routes archived PDG apps.",
    },
    {
      text: "yes: pdgsolve is the solve-and-review surface.",
      message: "Docs still describe pdgsolve as a visual surface.",
    },
    {
      text: "1. Open pdgsolve.",
      message: "Docs still instruct operators to launch pdgsolve as a UI.",
    },
  ];
  docsToAudit.forEach((relativePath) => {
    const source = readRepoFile(relativePath);
    forbiddenDocSnippets.forEach(({ text, message }) => {
      if (source.includes(text)) {
        const line = getLineNumber(source, text);
        issues.push(`${relativePath}:${line ?? 1} ${message}`);
      }
    });
  });

  return issues;
}

function main() {
  const issues = auditPdgArchitecture();
  if (issues.length) {
    console.error("PDG architecture check failed:");
    issues.forEach((issue) => {
      console.error(`- ${issue}`);
    });
    process.exit(1);
  }

  console.log("PDG architecture check passed.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
