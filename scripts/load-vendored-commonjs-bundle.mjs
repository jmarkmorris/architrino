import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";

export function loadVendoredCommonJsBundle(bundlePath) {
  const absolutePath = path.resolve(bundlePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  const moduleRecord = { exports: {} };
  const localRequire = createRequire(absolutePath);
  const wrapper = vm.runInThisContext(
    `(function (module, exports, require, __filename, __dirname) {\n${source}\n})`,
    { filename: absolutePath },
  );

  wrapper.call(
    moduleRecord.exports,
    moduleRecord,
    moduleRecord.exports,
    localRequire,
    absolutePath,
    path.dirname(absolutePath),
  );
  return moduleRecord.exports;
}
