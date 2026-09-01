import test from "node:test";
import assert from "node:assert/strict";
import { realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { commandTokens, compileInput, fileBinding, makeDependencies, parsePrepareSubfieldCircularArgs,
  referenceSnapshot, requireSameBindings, resolvedInvocation, sourceSnapshot } from "../scripts/eom/prepare-subfield-circular-root.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("sub-field circular build preparation accepts only a fresh scoped directory argument", () => {
  assert.throws(() => parsePrepareSubfieldCircularArgs([]), /Usage/u);
  assert.throws(() => parsePrepareSubfieldCircularArgs(["--out", ".tmp/subfieldCircular-build"]));
  assert.throws(() => parsePrepareSubfieldCircularArgs(["--out", ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/../escape"]));
  assert.throws(() => parsePrepareSubfieldCircularArgs(["--out", "x", "--run", "yes"]), /Usage/u);
  assert.equal(parsePrepareSubfieldCircularArgs(["--out", ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/control"]),
    path.join(root, ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/control"));
});

test("observed source inventory binds full solver tree and reviewed adapter/CMake/supervisor", () => {
  const records = sourceSnapshot();
  assert.equal(new Set(records.map((record) => record.path)).size, records.length);
  for (const filename of ["src/eom/src/ExactPairBatch.cpp", "src/eom/src/History.cpp", "src/eom/src/Interval.cpp",
    "src/eom/include/architrino/eom/ExactPairBatch.hpp", "src/eom/include/architrino/eom/History.hpp",
    "src/eom/CMakeLists.txt", "src/eom/native/eom_subfield_circular_root_cli.cpp", "scripts/eom/prepare-f5-enclosed-root.mjs"]) {
    assert.ok(records.some((record) => record.path === filename));
  }
  assert.ok(records.every((record) => record.bytes > 0 && /^[a-f0-9]{64}$/u.test(record.sha256)));
});

test("reference inventory binds seven frozen references and sixteen exact candidate sources", () => {
  const records = referenceSnapshot();
  assert.equal(records.length, 23);
  assert.equal(records.filter((record) => record.id.startsWith("candidate-source:")).length, 16);
  assert.equal(new Set(records.map((record) => record.path)).size, 23);
});

test("snapshot equality rejects hashes, paths, byte counts, missing files and added files", () => {
  const record = { path: "x", realPath: "/x", sha256: "a".repeat(64), bytes: 7 };
  assert.doesNotThrow(() => requireSameBindings([record], [structuredClone(record)], "control"));
  for (const change of [{ path: "y" }, { realPath: "/y" }, { sha256: "b".repeat(64) }, { bytes: 8 }]) {
    assert.throws(() => requireSameBindings([record], [{ ...record, ...change }], "control"), /changed/u);
  }
  assert.throws(() => requireSameBindings([record], [], "control"), /changed/u);
  assert.throws(() => requireSameBindings([record], [record, record], "control"), /changed/u);
});

test("compile command tokenizer preserves quoted paths without invoking shell syntax", () => {
  assert.deepEqual(commandTokens('/compiler --driver-mode=g++ -I"/path with space" \'literal value\' a\\ b'),
    ["/compiler", "--driver-mode=g++", "-I/path with space", "literal value", "a b"]);
  for (const command of ["/compiler; echo x", "/compiler $(x)", "/compiler | x", '/compiler "unfinished']) {
    assert.throws(() => commandTokens(command));
  }
});

test("compiler dependency parser retains system headers, continuation and escaped spaces", () => {
  assert.deepEqual(makeDependencies("object: /source.cpp \\\n /SDK/with\\ space/header.h /source.cpp /cash$$/h\n", "/build"),
  ["/SDK/with space/header.h", "/cash$/h", "/source.cpp"]);
  assert.throws(() => makeDependencies("no target", "/build"));
  assert.throws(() => makeDependencies("object:", "/build"));
});

test("compile plan rejects altered flags and separates only input/output from fixed compiler arguments", () => {
  const compiler = realpathSync(process.execPath);
  const entry = { directory: "/build", file: "/source.cpp",
    arguments: [compiler, "--driver-mode=g++", "-ffp-contract=off", "-O3", "-o", "source.o", "-c", "/source.cpp"] };
  assert.deepEqual(compileInput(entry, compiler), { directory: "/build", source: "/source.cpp", output: "/build/source.o",
    args: ["--driver-mode=g++", "-ffp-contract=off", "-O3"] });
  assert.throws(() => compileInput({ ...entry, arguments: [...entry.arguments, "-ffast-math"] }, compiler));
  assert.throws(() => compileInput({ ...entry, arguments: entry.arguments.filter((value) => value !== "-ffp-contract=off") }, compiler));
});

test("multicall invocation preserves alias while its identity hashes the underlying executable", () => {
  const alias = process.execPath;
  assert.equal(resolvedInvocation(alias), alias);
  assert.equal(resolvedInvocation(alias, true), realpathSync(alias));
  assert.equal(fileBinding(alias).realPath, realpathSync(alias));
  assert.throws(() => resolvedInvocation("relative-tool"), /absolute/u);
  if (process.platform === "darwin") {
    const ranlib = "/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/ranlib";
    assert.equal(resolvedInvocation(ranlib), ranlib);
    assert.match(fileBinding(ranlib).realPath, /\/libtool$/u);
  }
});
