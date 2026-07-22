import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  scanBraidTaxonomyTerminology,
  scanTextForBraidTaxonomyTerminology,
} from "../scripts/check-braid-taxonomy-terminology.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/check-braid-taxonomy-terminology.mjs", import.meta.url),
);

test("braid taxonomy scanner detects each retired terminology class", () => {
  const source = [
    "The nested shell braid contains an inner binary and an outer binary.",
    "The spindle family uses inner/middle/outer shielding.",
    "Its I:M:O order is HML, with $R_{inner}$ and $f_O$ fixed.",
    "The inner self-hit branch turns around a middle hinge.",
    "This binary is axis-polarized by the Thomson Dressing Mechanism.",
  ].join("\n");

  const findings = scanTextForBraidTaxonomyTerminology(source, "synthetic.md");
  const ruleIds = new Set(findings.map((finding) => finding.ruleId));

  assert.deepEqual(
    [...ruleIds].sort(),
    [
      "fixed-derived-role",
      "hml-triplet",
      "imo-coordinate-symbol",
      "imo-triplet",
      "legacy-named-braid-family",
      "positional-binary-role",
      "positional-coordinate-symbol",
      "positional-radius-triplet",
      "retired-axis-polarity",
      "retired-dressing-name",
    ].sort(),
  );
});

test("braid taxonomy scanner ignores implementation identifiers and link destinations", () => {
  const source = [
    "Use A1 with persistent binary indices and independently assigned radii.",
    "The runtime identifier is `nested-shell-braid`.",
    "See [A1 dynamics](../noether-braid/braid-a1-dynamics.md).",
    "[legacy-target]: ../nested-shell-braid/fixture.md",
    "```text",
    "spindle braid; inner binary; I:M:O",
    "```",
  ].join("\n");

  assert.deepEqual(scanTextForBraidTaxonomyTerminology(source, "synthetic.md"), []);
});

test("migrated braid taxonomy ownership scope has no terminology stragglers", () => {
  const result = scanBraidTaxonomyTerminology({ scope: "migrated" });
  assert.ok(result.files.length > 0);
  assert.deepEqual(result.findings, []);
});

test("whole-corpus report remains available without making existing migration debt the regression baseline", () => {
  const result = scanBraidTaxonomyTerminology({
    scope: "corpus",
    checkRequiredDefinitions: false,
  });
  assert.ok(result.files.length > 0);
  assert.ok(Array.isArray(result.findings));
  assert.ok(
    result.findings.every((finding) =>
      finding.relativePath.startsWith("content/markdown/aaa/"),
    ),
  );
});

test("braid taxonomy terminology command passes its default migrated-scope gate", () => {
  const output = execFileSync(process.execPath, [SCRIPT_PATH], {
    encoding: "utf8",
  });
  assert.match(output, /no terminology stragglers found/);
});
