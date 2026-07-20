#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const CANON_ROOT = "content/markdown/aaa";
const AUTHORITATIVE_CODE = [
  "src/eom/src/CertifiedAcceleration.cpp",
  "src/eom/src/MultiprecisionAcceleration.cpp",
  "src/eom/src/CoupledEvolution.cpp",
  "scripts/eom/oracle/certified_acceleration.py",
  "scripts/eom/oracle/reference_kernel.py",
  "scripts/eom/oracle/phase4_acceptance.py",
];
const LIVE_SURFACES = [
  "src/prescribed-path-analysis/PrescribedOrbitCausalRoots.mjs",
  "src/prescribed-path-analysis/PrescribedPathAnalysis.mjs",
  "src/apps/animator/display/AnimatorDelayedHitRecords.mjs",
  "src/apps/photon/PhotonFormulaRuntime.js",
  "src/contracts/solver-app-bridge/v2/schema.json",
];

const findings = [];

if (process.argv.includes("--self-test")) {
  const sample =
    "transmitter-side acceleration weight $W^{\\mathrm{acc}}=\\lvert D_r/D_t\\rvert$";
  if (!staleCanonPatterns().some((pattern) => pattern.test(sample))) {
    throw new Error("transmitter-factor checker self-test missed the old acceleration ratio");
  }
  console.log("[transmitter-factor-clean-slate] self-test passed");
  process.exit(0);
}

scanCanon(path.join(ROOT_DIR, CANON_ROOT));
scanAuthoritativeCode();
scanLiveSurfaces();
requireImplementationMarkers();

if (findings.length > 0) {
  console.error("[transmitter-factor-clean-slate] failed");
  for (const finding of findings) {
    console.error(`${finding.file}:${finding.line}: ${finding.message}`);
  }
  process.exit(1);
}

console.log("[transmitter-factor-clean-slate] passed");

function staleCanonPatterns() {
  return [
    /receiver-weighted acceleration factor/gi,
    /receiver-weighted acceleration-factor/gi,
    /receiver-weighted law/gi,
    /receiver-weighted Master Equation/gi,
    /Source-Density Acceleration/gi,
    /W[^\n]{0,120}=\s*\\lvert\s*D_[^/\n]+\/D_[^\\\n]+\\rvert/g,
    /W[^\n]{0,160}=\s*\|D_[^/\n]+\/D_[^|\n]+\|/g,
    /receiver(?:-side)? (?:velocity|motion|speed)[^\n.]{0,120}(?:branch strength|per-hit strength|hit strength)/gi,
    /receiver-side (?:weighted|bunching|modulation) of delayed causal flux/gi,
    /receiver-side factor makes the acceleration depend/gi,
    /receiver-side factor over the floored transmitter-side factor/gi,
    /same-root factor [^\n.]{0,40}D_\{r[^\n.]{0,80}in magnitude/gi,
  ];
}

function scanLiveSurfaces() {
  const forbidden = [
    /branchWeight/g,
    /receiverNormal/g,
    /sourceNormal/g,
    /receiver_strength/g,
    /source_normal/g,
  ];
  for (const relative of LIVE_SURFACES) {
    const absolute = path.join(ROOT_DIR, relative);
    const text = fs.readFileSync(absolute, "utf8");
    for (const pattern of forbidden) {
      pattern.lastIndex = 0;
      let match = pattern.exec(text);
      while (match) {
        addFinding(
          absolute,
          text,
          match.index,
          "legacy receiver-weighted field remains on a current app or contract surface",
        );
        match = pattern.exec(text);
      }
    }
  }
}

function scanCanon(entryPath) {
  const stat = fs.statSync(entryPath);
  if (stat.isDirectory()) {
    for (const child of fs.readdirSync(entryPath)) {
      scanCanon(path.join(entryPath, child));
    }
    return;
  }
  if (!entryPath.endsWith(".md")) return;
  const text = fs.readFileSync(entryPath, "utf8");
  for (const pattern of staleCanonPatterns()) {
    pattern.lastIndex = 0;
    let match = pattern.exec(text);
    while (match) {
      addFinding(
        entryPath,
        text,
        match.index,
        "old receiver-playback acceleration law remains in canonical prose",
      );
      match = pattern.exec(text);
    }
  }
}

function scanAuthoritativeCode() {
  const forbidden = [
    {
      pattern: /signed_scale\s*\*\s*receiver_strength/g,
      message: "sharp acceleration still consumes receiver_strength",
    },
    {
      pattern: /receiver_strength\s*\*\s*mollifier/g,
      message: "finite-width acceleration still consumes receiver_strength",
    },
    {
      pattern: /abs\(receiver_factor\s*\/\s*transmitter_factor\)[^\n]{0,180}acceleration/gs,
      message: "reference acceleration still consumes receiver playback magnitude",
    },
  ];
  for (const relative of AUTHORITATIVE_CODE) {
    const absolute = path.join(ROOT_DIR, relative);
    const text = fs.readFileSync(absolute, "utf8");
    for (const { pattern, message } of forbidden) {
      pattern.lastIndex = 0;
      let match = pattern.exec(text);
      while (match) {
        addFinding(absolute, text, match.index, message);
        match = pattern.exec(text);
      }
    }
  }
}

function requireImplementationMarkers() {
  const required = [
    [
      "src/eom/src/CertifiedAcceleration.cpp",
      "field_speed / interval_absolute(transmitter_factor)",
    ],
    [
      "scripts/eom/oracle/certified_acceleration.py",
      "field_speed / transmitter_factor.absolute()",
    ],
    [
      "scripts/eom/oracle/reference_kernel.py",
      "_mp(field_speed) / abs(transmitter_factor)",
    ],
    [
      "src/eom/src/CoupledEvolution.cpp",
      "coincident_same_transmitter_birth_uncertified",
    ],
    [
      "src/prescribed-path-analysis/PrescribedPathAnalysis.mjs",
      "signalSpeed / Math.abs(transmitterFactor)",
    ],
    [
      "src/apps/animator/display/AnimatorDelayedHitRecords.mjs",
      "emission.fieldSpeed / Math.abs(transmitterFactor)",
    ],
    [
      "src/apps/photon/PhotonFormulaRuntime.js",
      "signalSpeed / Math.abs(transmitterFactor)",
    ],
  ];
  for (const [relative, marker] of required) {
    const absolute = path.join(ROOT_DIR, relative);
    const text = fs.readFileSync(absolute, "utf8");
    if (!text.includes(marker)) {
      findings.push({
        file: relative,
        line: 1,
        message: `required transmitter-side marker is absent: ${marker}`,
      });
    }
  }
}

function addFinding(absolute, text, index, message) {
  findings.push({
    file: path.relative(ROOT_DIR, absolute),
    line: 1 + text.slice(0, index).split("\n").length - 1,
    message,
  });
}
