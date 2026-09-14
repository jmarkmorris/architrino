import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { materializeSourceReplay } from "../../scripts/dev/materialize-source-replay.mjs";

import {productionTestAdmission} from '../support/option-b-production-hosts.mjs';
export function createF5SourceReplay() {
  const rootDir = fileURLToPath(new URL("../..", import.meta.url));
  const scratch = path.join(rootDir, ".tmp");
  mkdirSync(scratch, { recursive: true });
  const parent = mkdtempSync(path.join(scratch, "f5-source-replay-"));
  const manifest = JSON.parse(readFileSync(path.join(rootDir,
    "reference/priorities/braid-program/evidence/source-replay/f5-source-replay.v1.json"), "utf8"));
  try {
    const admitted=productionTestAdmission();
    const inputRoot=path.join(parent,'inputs');mkdirSync(inputRoot);
    for(const row of manifest.files){
      const original=admitted.originalSourceBindingIfPresent(row.source,row.sha256);
      const data=readFileSync(original?original.path:path.join(rootDir,row.source));
      admitted.check();
      const filename=path.join(inputRoot,row.source);mkdirSync(path.dirname(filename),{recursive:true});writeFileSync(filename,data,{flag:'wx'});
    }
    admitted.check();
    const replay = materializeSourceReplay({ rootDir:inputRoot, manifest, outputDir: path.join(parent, "root") });
    admitted.check();
    mkdirSync(path.join(replay.rootDir, ".tmp"));
    return { ...replay, close: () => {try{admitted.check();}finally{rmSync(parent, { recursive: true, force: true });}} };
  } catch (error) {
    rmSync(parent, { recursive: true, force: true });
    throw error;
  }
}
