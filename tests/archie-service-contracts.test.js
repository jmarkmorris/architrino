import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

test("Archie service schema-only contracts validate fixture expectations", () => {
  const result = spawnSync("node", ["scripts/archie-service/validate-contracts.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie service contract validation passed/);
});

test("Archie service source-index dry-run validates current route evidence", () => {
  const result = spawnSync("node", ["scripts/archie-service/build-source-index.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie source-index check passed/);
});

test("Archie service negative validators fail closed without side effects", () => {
  const result = spawnSync("node", ["scripts/archie-service/validate-negative-validators.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie negative-validator check passed/);
});

test("Archie service endpoint response contracts stay fixture-backed", () => {
  const result = spawnSync("node", ["scripts/archie-service/validate-endpoint-responses.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie endpoint-response check passed/);
});

test("Archie fixture service stub selects fixture-backed responses", () => {
  const result = spawnSync("node", ["scripts/archie-service/check-fixture-service-stub.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie fixture service stub check passed/);
});

test("Archie render contracts consume fixture-backed responses", () => {
  const result = spawnSync("node", ["scripts/archie-service/validate-render-contracts.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie render-contract check passed/);
});

test("Archie service secret boundary rejects browser-visible secrets", () => {
  const result = spawnSync("node", ["scripts/archie-service/check-secret-boundary.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie secret-boundary check passed/);
});

test("Archie staging smoke stays local and fixture-backed", () => {
  const result = spawnSync("node", ["scripts/archie-service/run-staging-smoke.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie staging-smoke check passed/);
});

test("Archie rollback smoke preserves fixture compatibility", () => {
  const result = spawnSync("node", ["scripts/archie-service/check-rollback.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie rollback check passed/);
});
