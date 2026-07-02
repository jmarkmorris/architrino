#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const planPath = "tests/archie-service/fixtures/security/secret-boundary-plan.v1.json";
const failures = [];
const scannedFiles = [];

const secretPatterns = [
  {
    classId: "provider_model_key",
    label: "provider model key",
    pattern: /\b(?:sk-proj|sk|ak|pk)-[A-Za-z0-9_-]{16,}\b/g,
  },
  {
    classId: "provider_model_key",
    label: "Google-style API key",
    pattern: /\bAIza[0-9A-Za-z_-]{20,}\b/g,
  },
  {
    classId: "github_token",
    label: "GitHub token",
    pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{16,}\b|\bgithub_pat_[A-Za-z0-9_]{16,}\b/g,
  },
  {
    classId: "payment_secret",
    label: "payment secret",
    pattern: /\b(?:sk|rk)_(?:live|test)_[0-9A-Za-z]{12,}\b/g,
  },
  {
    classId: "database_secret",
    label: "database connection secret",
    pattern: /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^:\s/]+:[^@\s/]+@/g,
  },
  {
    classId: "signing_secret",
    label: "private signing key",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |)?PRIVATE KEY-----/g,
  },
  {
    classId: "monitoring_secret",
    label: "monitoring write token",
    pattern: /\b(?:SENTRY_AUTH_TOKEN|sntrys_[A-Za-z0-9_-]{16,}|sentry_org_auth_token_[A-Za-z0-9_-]{12,})\b/g,
  },
  {
    classId: "provider_payload_secret",
    label: "raw provider payload",
    pattern: /"(?:rawProviderPayload|providerPayload|providerResponse|rawModelResponse)"\s*:/g,
  },
  {
    classId: "private_prompt_expansion",
    label: "private prompt expansion",
    pattern: /"privatePromptIncluded"\s*:\s*true\b|"(?:privatePrompt|rawPrompt|promptText)"\s*:\s*"[^"]+"/g,
  },
];

const browserSecretNamePattern =
  /\b(?:OPENAI|ANTHROPIC|MODEL|SPEECH|IMAGE|GITHUB|STRIPE|PAYMENT|DATABASE|SENTRY|MONITORING)[A-Z0-9_]*(?:API_KEY|SECRET|TOKEN)\b/g;
const archieSecretNamePattern = /\bARCHIE_[A-Z0-9_]*(?:SECRET|API_KEY|TOKEN)[A-Z0-9_]*\b/g;

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/check-secret-boundary.mjs --check");
}

const plan = readJson(planPath);
validatePlanShape(plan);

for (const target of plan.scanTargets ?? []) {
  validateTarget(target, plan);
}

if (failures.length > 0) {
  console.error(`Archie secret-boundary check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie secret-boundary check passed: ${scannedFiles.length} file(s), ${plan.scanTargets.length} target(s), forbidden secret classes absent`
);

function validatePlanShape(plan) {
  if (plan.schema !== "archie-secret-boundary-plan/v1") {
    failures.push("secret-boundary plan has unexpected schema");
  }
  if (plan.requiresNoWrite !== true) {
    failures.push("secret-boundary plan must be no-write");
  }
  if (plan.requiresNoBrowserModelKeys !== true) {
    failures.push("secret-boundary plan must reject browser model keys");
  }
  if (plan.requiresNoProviderPayloadSecrets !== true) {
    failures.push("secret-boundary plan must reject provider payload secrets");
  }
  if (plan.requiresNoPrivatePromptExpansion !== true) {
    failures.push("secret-boundary plan must reject private prompt expansion");
  }
  if (plan.allowedSecretReferenceSuffix !== "_SECRET_REF") {
    failures.push("secret-boundary plan must allow only _SECRET_REF placeholders");
  }
}

function validateTarget(target, plan) {
  const absoluteTargetPath = path.join(rootDir, target.path);
  if (!fs.existsSync(absoluteTargetPath)) {
    if (target.required) {
      failures.push(`${target.targetId}: required scan target missing: ${target.path}`);
    }
    return;
  }

  const files = listFiles(absoluteTargetPath, new Set(target.fileExtensions));
  if (target.required && files.length === 0) {
    failures.push(`${target.targetId}: required scan target has no matching files`);
    return;
  }

  for (const filePath of files) {
    const relativePath = path.relative(rootDir, filePath);
    const raw = fs.readFileSync(filePath, "utf8");
    scannedFiles.push(relativePath);
    scanForbiddenClasses(relativePath, raw, plan);
    scanArchieSecretReferenceNames(relativePath, raw, plan);
    if (target.targetClass === "browser_client" || target.targetClass === "static_output_candidate") {
      scanBrowserVisibleSecretNames(relativePath, raw);
      scanBrowserSecretReferences(relativePath, raw);
    }
  }
}

function scanForbiddenClasses(relativePath, raw, plan) {
  const forbidden = new Set(plan.forbiddenSecretClasses ?? []);
  for (const entry of secretPatterns) {
    if (!forbidden.has(entry.classId)) {
      continue;
    }
    entry.pattern.lastIndex = 0;
    const match = entry.pattern.exec(raw);
    if (match) {
      failures.push(`${relativePath}: contains forbidden ${entry.label}`);
    }
  }
}

function scanArchieSecretReferenceNames(relativePath, raw, plan) {
  archieSecretNamePattern.lastIndex = 0;
  for (const match of raw.matchAll(archieSecretNamePattern)) {
    const name = match[0];
    if (name.includes("SECRET") && !name.endsWith(plan.allowedSecretReferenceSuffix)) {
      failures.push(`${relativePath}: ARCHIE secret config ${name} must end with ${plan.allowedSecretReferenceSuffix}`);
    }
    if (name.includes("API_KEY")) {
      failures.push(`${relativePath}: API key config names are not allowed in Archie service scan targets: ${name}`);
    }
  }
}

function scanBrowserVisibleSecretNames(relativePath, raw) {
  browserSecretNamePattern.lastIndex = 0;
  const match = browserSecretNamePattern.exec(raw);
  if (match) {
    failures.push(`${relativePath}: browser/static candidate exposes secret-like config name ${match[0]}`);
  }
}

function scanBrowserSecretReferences(relativePath, raw) {
  if (raw.includes("_SECRET_REF")) {
    failures.push(`${relativePath}: browser/static candidate must not expose server secret references`);
  }
}

function listFiles(entryPath, allowedExtensions) {
  const stat = fs.statSync(entryPath);
  if (stat.isFile()) {
    return allowedExtensions.has(path.extname(entryPath)) ? [entryPath] : [];
  }
  if (!stat.isDirectory()) {
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(entryPath, { withFileTypes: true })) {
    const fullPath = path.join(entryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath, allowedExtensions));
    } else if (entry.isFile() && allowedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
