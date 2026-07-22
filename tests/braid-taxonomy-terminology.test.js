import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  RETIRED_BRAID_NAME_TOKENS,
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

test("braid taxonomy scanner does not confuse ordinary boundary or observable notation with braid coordinates", () => {
  const source = [
    "The model may require an outer boundary condition.",
    "The apparent horizon is the outer boundary of the trapped region.",
    "Use the context-indexed apparatus record $r_{O,C}=R_{O,C}(\Gamma)$.",
  ].join("\n");

  assert.deepEqual(scanTextForBraidTaxonomyTerminology(source, "synthetic.md"), []);
});

test("braid taxonomy scanner audits every older braid-name token requested by the taxonomy migration", () => {
  assert.deepEqual(RETIRED_BRAID_NAME_TOKENS, [
    "spindle",
    "drum",
    "shell",
    "nested",
    "cap",
    "uniaxial",
    "triaxial",
  ]);

  const source = RETIRED_BRAID_NAME_TOKENS.map(
    (token) => `Review the standalone term ${token} in this sentence.`,
  ).join("\n");
  const findings = scanTextForBraidTaxonomyTerminology(source, "synthetic.md");

  assert.deepEqual(
    findings.map((finding) => finding.match.toLowerCase()),
    RETIRED_BRAID_NAME_TOKENS,
  );
  assert.ok(findings.every((finding) => finding.ruleId === "legacy-braid-name-token"));
});

test("strict gating catches contextual old braid names without rejecting unrelated standalone words", () => {
  const contextual = [
    "The spindle candidate is selected.",
    "The drum family is selected.",
    "The shell member is selected.",
    "The nested variant is selected.",
  ].join("\n");
  const contextualFindings = scanTextForBraidTaxonomyTerminology(
    contextual,
    "synthetic.md",
    { includeAuditOnly: false },
  );
  assert.equal(contextualFindings.length, 4);
  assert.ok(
    contextualFindings.every(
      (finding) => finding.ruleId === "legacy-named-braid-family",
    ),
  );

  const unrelated = [
    "Use a nested probe grid.",
    "Evaluate the mass shell.",
    "Sum over each causal shell.",
    "The set intersection is $K_X\\cap K_Y$.",
  ].join("\n");
  assert.deepEqual(
    scanTextForBraidTaxonomyTerminology(unrelated, "synthetic.md", {
      includeAuditOnly: false,
    }),
    [],
  );

  const reportFindings = scanTextForBraidTaxonomyTerminology(
    "The set intersection is $K_X\\cap K_Y$.",
    "synthetic.md",
  );
  assert.deepEqual(reportFindings, []);
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
    includeAuditOnly: true,
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
