import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  INDEPENDENT_ABC_NOTATION_EXCLUSIONS,
  RETIRED_BRAID_NAME_TOKENS,
  scanLorentzGeometryPublicDisplayTerminology,
  scanLorentzGeometryPublicDisplayText,
  scanBorgPrescribedTaxonomyTerminology,
  scanBorgReaderFacingValue,
  scanBraidTaxonomyTerminology,
  scanTextForBraidTaxonomyTerminology,
} from "../scripts/check-braid-taxonomy-terminology.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/check-braid-taxonomy-terminology.mjs", import.meta.url),
);

test("braid taxonomy scanner detects each retired terminology class", () => {
  const source = [
    "The nested shell braid contains an inner binary and an outer precessing binary.",
    "The spindle family uses inner/middle/outer shielding.",
    "Its I:M:O order is HML, with shielding code IMO and $R_{inner}$ and $f_O$ fixed.",
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
      "legacy-shielding-role-code",
      "legacy-named-braid-family",
      "positional-binary-role",
      "positional-coordinate-symbol",
      "positional-radius-triplet",
      "retired-axis-polarity",
      "retired-dressing-name",
    ].sort(),
  );
});

test("braid taxonomy scanner strictly rejects member and family labels and the retired public app name", () => {
  const source = [
    "The A1 candidate is compared with B1, C1, C4, and Family-A geometry.",
    "The Ideal Noether Braid app displays a prescribed path.",
  ].join("\n");
  const reportFindings = scanTextForBraidTaxonomyTerminology(source, "synthetic.md");
  const reportRuleIds = new Set(reportFindings.map((finding) => finding.ruleId));

  assert.deepEqual(
    [...reportRuleIds].sort(),
    [
      "ideal-braid-name",
      "taxonomy-family-identifier",
      "taxonomy-member-identifier",
    ].sort(),
  );
  const strictFindings = scanTextForBraidTaxonomyTerminology(source, "synthetic.md", {
    includeAuditOnly: false,
  });
  assert.equal(strictFindings.length, 6);
  assert.deepEqual(new Set(strictFindings.map((finding) => finding.ruleId)), reportRuleIds);
});

test("braid taxonomy scanner recognizes complete legacy dot-zero identifiers", () => {
  const findings = scanTextForBraidTaxonomyTerminology("A1.0 A2.0 A3.0 A1.1 A3.4", "synthetic.md")
    .filter((finding) => finding.ruleId === "taxonomy-member-identifier");
  assert.deepEqual(findings.map((finding) => finding.match), ["A1.0", "A2.0", "A3.0", "A1.1", "A3.4"]);
});

test("braid taxonomy scanner rejects retired app names even in dated prose", () => {
  const relativePath = "content/markdown/aaa/archie/research-notebook.md";
  const datedFindings = scanTextForBraidTaxonomyTerminology(
    "## 2026-06-10: Ideal Noether Braid Lorentz Geometry App",
    relativePath,
    { includeAuditOnly: false },
  );
  assert.equal(datedFindings.length, 1);
  assert.equal(datedFindings[0].ruleId, "ideal-braid-name");

  const findings = scanTextForBraidTaxonomyTerminology(
    "The Ideal Noether Braid app is the current public name.",
    relativePath,
    { includeAuditOnly: false },
  );
  assert.equal(findings.length, 1);
  assert.equal(findings[0].ruleId, "ideal-braid-name");
});

test("Lorentz-geometry public-display scanner rejects opaque prose labels without inspecting established machine entrypoints", () => {
  const source = [
    "<h1>Ideal Noether Braid</h1>",
    '<p>A1 Lorentz Geometry</p>',
    '<label>Family-A</label>',
    'const appId = "ideal-braid";',
    'const sceneId = "ideal_braid";',
    'const selector = "#ideal-braid-title";',
  ].join("\n");
  const findings = scanLorentzGeometryPublicDisplayText(source, "synthetic-app.html");
  assert.equal(findings.length, 3);
  assert.ok(findings.every((finding) => finding.ruleId === "lorentz-geometry-public-display"));
});

test("Lorentz-geometry public display surfaces use the facts-first name", () => {
  const result = scanLorentzGeometryPublicDisplayTerminology();
  assert.equal(result.files.length, 11);
  assert.deepEqual(result.findings, []);
});

test("strict A/B/C gating preserves explicit independently owned notation contexts", () => {
  assert.deepEqual(
    INDEPENDENT_ABC_NOTATION_EXCLUSIONS.map((exclusion) => exclusion.id),
    [
      "constitutive-ledger-row",
      "perspective-argument-label",
      "c1-continuity-notation",
      "chemistry-atom-key",
    ],
  );
  assert.deepEqual(
    scanTextForBraidTaxonomyTerminology(
      "| C1 | $\\rho_0$ | Constitutive closure target |",
      "content/markdown/aaa/validation/parameter-ledger.md",
      { includeAuditOnly: false },
    ),
    [],
  );
  assert.deepEqual(
    scanTextForBraidTaxonomyTerminology(
      "- A1 A single-hit receiver record contains the acceleration.",
      "content/markdown/aaa/validation/simulations/perspective.md",
      { includeAuditOnly: false },
    ),
    [],
  );
  assert.deepEqual(
    scanTextForBraidTaxonomyTerminology(
      "The interpolant has C1 continuity, and the chemistry atom key C1 labels carbon.",
      "synthetic.md",
      { includeAuditOnly: false },
    ),
    [],
  );
  const braidFinding = scanTextForBraidTaxonomyTerminology(
    "The C1 braid candidate remains selected.",
    "synthetic.md",
    { includeAuditOnly: false },
  );
  assert.equal(braidFinding.length, 1);
  assert.equal(braidFinding[0].ruleId, "taxonomy-member-identifier");
  const mixedContextFinding = scanTextForBraidTaxonomyTerminology(
    "C1 continuity is required, but the A1 braid candidate label is retired.",
    "synthetic.md",
    { includeAuditOnly: false },
  );
  assert.equal(mixedContextFinding.length, 1);
  assert.equal(mixedContextFinding[0].match, "A1");
  assert.deepEqual(
    scanTextForBraidTaxonomyTerminology(
      "This taxonomy records which channel family a reaction uses.",
      "synthetic.md",
      { includeAuditOnly: false },
    ),
    [],
  );
});

test("braid taxonomy scanner catches comma-separated H/M/L positional notation", () => {
  const findings = scanTextForBraidTaxonomyTerminology(
    "The legacy order is ($H,M,L$).",
    "synthetic.md",
    { includeAuditOnly: false },
  );

  assert.equal(findings.length, 1);
  assert.equal(findings[0].ruleId, "hml-triplet");
  assert.equal(findings[0].match, "H,M,L");
});

test("braid taxonomy scanner audits broader positional support phrases", () => {
  const findings = scanTextForBraidTaxonomyTerminology(
    "The outer support tier screens an inner layer.",
    "synthetic.md",
  );

  assert.equal(
    findings.filter((finding) => finding.ruleId === "positional-support-role-audit").length,
    2,
  );
  assert.deepEqual(
    scanTextForBraidTaxonomyTerminology(
      "The outer support tier screens an inner layer.",
      "synthetic.md",
      { includeAuditOnly: false },
    ),
    [],
  );
});

test("braid taxonomy scanner ignores implementation identifiers and link destinations", () => {
  const source = [
    "Use the coincident-midpoint three-axis circular geometry with persistent binary indices and independently assigned radii.",
    "The runtime identifier is `nested-shell-braid`.",
    "See [zero-axial-offset three-binary dynamics](../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md).",
    "[legacy-target]: ../nested-shell-braid/fixture.md",
    "```text",
    "spindle braid; inner binary; I:M:O",
    "```",
  ].join("\n");

  assert.deepEqual(
    scanTextForBraidTaxonomyTerminology(source, "synthetic.md", {
      includeAuditOnly: false,
    }),
    [],
  );
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

test("Borg reader-facing fields reject retired candidate labels in every controlled surface class", () => {
  for (const field of [
    "catalog label",
    "source title",
    "UI string",
    "provenance description",
    "illustrative coordinate description",
  ]) {
    const findings = scanBorgReaderFacingValue(
      "Extreme cap-tilt spindle candidate",
      "synthetic-borg-surface",
      field,
    );
    assert.ok(findings.length >= 2);
    assert.ok(findings.every((finding) =>
      finding.ruleId === "retired-borg-candidate-label" && finding.excerpt.startsWith(field)));
  }
});

test("Borg prescribed taxonomy scan ignores machine identity fields but gates visible metadata", () => {
  const result = scanBorgPrescribedTaxonomyTerminology();
  assert.ok(result.files.some((relativePath) =>
    relativePath.endsWith("axial-transverse-three-binary-interior.v3.json")));
  assert.deepEqual(result.findings, []);
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
