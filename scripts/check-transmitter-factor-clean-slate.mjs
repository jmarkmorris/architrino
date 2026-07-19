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

const findings = [];

if (process.argv.includes("--self-test")) {
  const sample =
    "transmitter-side acceleration weight $W^{\\mathrm{acc}}=\\lvert D_r/D_t\\rvert$";
  if (!staleCanonPatterns().some((pattern) => pattern.test(sample))) {
    throw new Error("transmitter-side checker self-test missed the old acceleration ratio");
  }
  console.log("[transmitter-side-clean-slate] self-test passed");
  process.exit(0);
}

scanCanon(path.join(ROOT_DIR, CANON_ROOT));
scanAuthoritativeCode();
requireImplementationMarkers();

if (findings.length > 0) {
  console.error("[transmitter-side-clean-slate] failed");
  for (const finding of findings) {
    console.error(`${finding.file}:${finding.line}: ${finding.message}`);
  }
  process.exit(1);
}

console.log("[transmitter-side-clean-slate] passed");

function staleCanonPatterns() {
  return [
    /receiver-weighted acceleration factor/gi,
    /receiver-weighted acceleration-factor/gi,
    /receiver-weighted law/gi,
    /W[^\n]{0,120}=\s*\\lvert\s*D_[^/\n]+\/D_[^\\\n]+\\rvert/g,
    /W[^\n]{0,160}=\s*\|D_[^/\n]+\/D_[^|\n]+\|/g,
  ];
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
