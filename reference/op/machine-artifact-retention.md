# Machine Artifact Retention

Tracked machine records must remain reviewable, reproducible, and proportionate to their current consumer.

The repository retains authored sources, protocols, compact evidence receipts, and independently necessary fixtures. A runtime consumer alone does not justify tracking an expanded generated payload: build easily regenerated data during setup and deployment. Bulk search rows, raw ledgers, superseded result versions, benchmark output, and other analytical payloads belong under the ignored `.local-data/` hierarchy or in durable artifact storage. A compact evidence receipt must bind an untracked research artifact by SHA-256 and record its byte and line counts, reproduction command, claim boundary, and relevant source or protocol identity. Pure runtime build outputs need their canonical source and generator, not a newly versioned receipt for every rebuild.

Plainly: Git should retain the information needed to understand, test, and reproduce a result. It should not retain every verbose intermediate row merely because JSON was the producer's easiest output format.

## Runtime Build Contract

[`generated-runtime-assets.json`](../../scripts/config/generated-runtime-assets.json) declares the generated Borg record family, the equation-mapping corpus registry, and the full-corpus source index. The output paths remain stable for app consumers but are Git-ignored and forbidden in the index, including forced additions. Every Borg record comes from the existing generator's canonical target list; this is not a per-example cleanup.

Run `node scripts/prepare-runtime-assets.mjs --write` to create or refresh only those runtime outputs, and `node scripts/prepare-runtime-assets.mjs --check` to verify them without writing. Local server startup, `npm test`, the PR gate, and Content Integrity prepare them automatically. Direct `node --test` invocations on a fresh clone require preparation first. The full-corpus MCP launcher prepares its index before freezing the startup snapshot; the request loop remains read-only. The equation generator's artifact-only `--build` mode rejects missing canonical links rather than modifying Markdown; its explicit source-repair `--write` mode remains separately authorized.

Pages uses [`pages.yml`](../../.github/workflows/pages.yml) and [`build-static-site.mjs`](../../scripts/build-static-site.mjs) to publish a generated deployment directory. Set the repository's Pages publishing source to GitHub Actions before merging this migration. Do not merge file removal into the old direct-from-branch deployment. Keep the existing domain and deployed site; changing the publishing source does not authorize a branch publication from this task.

Plainly: a fresh clone builds what it needs before tests or serving. Git keeps the recipe; the local server and website receive the cooked output. Only the declared ignored runtime outputs are automatically rebuilt, not tracked textbook documents, iOS packages, or children's-book exports.

## Enforced Thresholds

[`validate-machine-artifact-retention.mjs`](../../scripts/validate-machine-artifact-retention.mjs) checks JSON, JSONL, NDJSON, CSV, and TSV in both the staged index and the working tree, including nonignored new files. A record requires an entry in [`machine-artifact-retention-registry.v1.json`](machine-artifact-retention-registry.v1.json) when either condition holds:

- at least `100000` physical lines; or
- at least `10485760` bytes.

Machine records under a `reference/priorities/**/evidence/` directory use the tighter threshold of `25000` physical lines or `1048576` bytes because those files are analytical evidence rather than runtime payloads.

The same `100000`-line or `10485760`-byte limit applies to an entire machine-file collection. Asset and generated collections are grouped by family, evidence by priority lane, and other files by directory; nested asset/evidence folders do not bypass the family budget. Existing authored element scenes and the separately scoped iOS development snapshot have explicit bounded collection allowances, not unlimited exemptions. The iOS package remains on demand and is not rebuilt by this workflow.

Across the branch, `100000` added machine-file lines or `10485760` bytes of positive file-size growth also fails. Comparison uses the merge base with `origin/main` (or an explicit `--base`); a missing base fails closed. Deletions do not offset additions. The index is read directly, so shrinking an unstaged file cannot hide a large staged payload. A passing file-level check alone is not evidence that aggregate storage is controlled.

Each retained entry names its owner, current consumers, reason, and why a compact alternative is insufficient; generated entries also name their regeneration command. Changes to budgets or exceptions require an explicit storage decision, not an automatic limit increase to make a branch pass.

Plainly: an oversized machine record needs a named job in the current repository. Evidence ledgers face an earlier review because they are usually reproducible analysis output rather than data that an application must ship. Historical interest or possible future use is not enough.

## Version and evidence handling

- Superseded full outputs should leave the tracked tip once a compact correction history records their identities and consequences.
- A current raw result may remain tracked when an independent certificate or current runtime directly consumes its detailed rows and no smaller representation preserves that obligation.
- Tests should consume the smallest fixture that exercises their contract. A test that reads only summary values does not justify retaining unrelated raw ledgers.
- A producer that records runtime, timestamps, host paths, or other volatile metadata must not claim byte-identical regeneration. Its receipt should identify the stable comparison fields.
- Moving a raw record out of Git must not silently upgrade or weaken its scientific authority. Preserve its original claim boundary and falsifier.

- Ignored local storage is not a durable backup. Irreplaceable or expensive-to-reproduce evidence needs a verified archive and retrieval recipe before its last durable copy is removed.
- Removing a payload from the tracked tip prevents future generated churn; it does not purge earlier Git objects or reclaim all historical GitHub storage. History rewriting is a separate, explicitly authorized operation and is not part of runtime preparation.

Plainly: storage form and evidence grade are separate. Compacting a diagnostic neither validates nor invalidates its scientific conclusion.
