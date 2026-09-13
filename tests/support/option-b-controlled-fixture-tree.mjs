// Copy only the selected fixture-loading closure for isolated consumer tests.
import fs from 'node:fs';
import path from 'node:path';
import { controlledFixturePaths } from '../../scripts/equation-mapping/controlled-fixture-records.mjs';
export function copyControlledFixtureTree(root, target) {
  for (const name of controlledFixturePaths(root)) {
    fs.mkdirSync(path.dirname(path.join(target, name)), { recursive: true });
    fs.copyFileSync(path.join(root, name), path.join(target, name));
  }
}
