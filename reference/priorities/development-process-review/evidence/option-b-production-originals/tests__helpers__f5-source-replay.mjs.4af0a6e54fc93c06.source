import { mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { materializeSourceReplay } from "../../scripts/dev/materialize-source-replay.mjs";

export function createF5SourceReplay() {
  const rootDir = fileURLToPath(new URL("../..", import.meta.url));
  const scratch = path.join(rootDir, ".tmp");
  mkdirSync(scratch, { recursive: true });
  const parent = mkdtempSync(path.join(scratch, "f5-source-replay-"));
  const manifest = JSON.parse(readFileSync(path.join(rootDir,
    "reference/priorities/braid-program/evidence/source-replay/f5-source-replay.v1.json"), "utf8"));
  try {
    const replay = materializeSourceReplay({ rootDir, manifest, outputDir: path.join(parent, "root") });
    mkdirSync(path.join(replay.rootDir, ".tmp"));
    return { ...replay, close: () => rmSync(parent, { recursive: true, force: true }) };
  } catch (error) {
    rmSync(parent, { recursive: true, force: true });
    throw error;
  }
}
