# Machine Artifact Retention

Tracked machine records must remain reviewable, reproducible, and proportionate to their current consumer.

The repository retains authored sources, protocols, compact evidence receipts, and independently necessary fixtures. A runtime consumer alone does not justify tracking an expanded generated payload: build easily regenerated data during setup and deployment. Bulk search rows, raw ledgers, superseded result versions, benchmark output, and other analytical payloads belong under the ignored `.local-data/` hierarchy or in durable artifact storage. A compact evidence receipt must bind an untracked research artifact by SHA-256 and record its byte and line counts, reproduction command, claim boundary, and relevant source or protocol identity. Pure runtime build outputs need their canonical source and generator, not a newly versioned receipt for every rebuild.

Plainly: Git should retain the information needed to understand, test, and reproduce a result. It should not retain every verbose intermediate row merely because JSON was the producer's easiest output format.

## Runtime Build Contract

[`generated-runtime-assets.json`](../../scripts/config/generated-runtime-assets.json) declares the generated Borg record family, the equation-mapping corpus registry, and the full-corpus source index. Output paths remain stable for app consumers. New tracking is forbidden, including forced additions, except for the explicitly retained set in the operator-approved Pages proof phase below. Every Borg record comes from the existing generator's canonical target list; this is not a per-example cleanup.

Run `node scripts/prepare-runtime-assets.mjs --write` to create or refresh only those runtime outputs, and `node scripts/prepare-runtime-assets.mjs --check` to verify them without writing. Local server startup, `npm test`, the PR gate, and Content Integrity prepare them automatically. Direct `node --test` invocations on a fresh clone require preparation first. The full-corpus MCP launcher prepares its index before freezing the startup snapshot; the request loop remains read-only. The equation generator's artifact-only `--build` mode rejects missing canonical links rather than modifying Markdown; its explicit source-repair `--write` mode remains separately authorized.

Pages uses [`pages.yml`](../../.github/workflows/pages.yml) and [`build-static-site.mjs`](../../scripts/build-static-site.mjs) to publish a generated deployment directory. Follow the staged cutover below: the first PR must keep branch publishing functional, and the second must wait for successful live Actions acceptance. Preserve the existing custom-domain and HTTPS settings.

Plainly: a fresh clone builds what it needs before tests or serving. Git keeps the recipe; the local server and website receive the cooked output. Only the declared ignored runtime outputs are automatically rebuilt, not tracked textbook documents, iOS packages, or children's-book exports.

## Two-stage Pages cutover

The operator approved proving the new publishing path before removing the old path's required files. The `runtimeTransition` entry in the retention registry names the 46 temporarily retained runtime paths and caps their combined size below 2,700,000 lines and 120,000,000 bytes. During `prove-pages-build`, the validator requires every retained path in both the index and working tree, rejects additional runtime paths, and still enforces the ordinary branch-growth budget. This is a bounded transition, not an ongoing exception for generated data.

1. Prepare the first PR with the workflow, build/setup tools, tests, and all retained files. Refresh required tracked generated drift during final PR preparation. Require the exact-state local gate and both remote checks: Content Integrity and the Pages build. PR builds must not deploy. The Pages build includes a source-only reconstruction test that excludes every retained runtime file.
2. The operator merges the first PR. Verify its merged identity and `main` checks before changing publishing settings. Change only the Pages build type to GitHub Actions, preserving the domain and HTTPS settings, then dispatch or rerun the workflow on that exact `main` state. Do not publish a working branch.
3. Require a successful deployment run tied to the expected `main` commit. Verify HTTPS responses and byte hashes for all 46 deployed runtime paths against that commit's build output. Open the homepage, Borg, and Equation Mapping and exercise their data-loading behavior; a passing homepage alone is insufficient. Record the run URL, deployed commit, verification counts, and app checks in the second PR's evidence. Hash agreement checks packaging fidelity, not scientific correctness.
4. Only after live acceptance, prepare a second PR that removes `runtimeTransition` and untracks its generated files, retaining their sources and generators. Re-run the source-only build and normal PR gates. After that merge, verify another successful Actions deployment and the same live paths.

If the first Actions deployment fails, leave the file-removal step blocked. While the retained files remain on `main`, the publishing source can be returned to the verified `main` root branch source and its legacy deployment checked. After the second PR removes those files, switching the setting alone is not a valid rollback: the known-good publisher inputs must first be restored through an explicitly approved repair PR. Never rewrite repository history as part of this transition.

The static builder rejects a deployment payload above 1,000,000,000 bytes before copying publication files, matching the [documented Pages site-size limit](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). A successful reconstruction test alone is not deployment acceptance. If the complete repository payload exceeds this budget, determine and approve the public deployment scope before publishing; do not silently drop existing public downloads or remove web-used assets from an otherwise development-only tree.

The operator approved these deployment-only exclusions: PowerPoint presentation, template, and slide-show originals by extension; `reference/design/` production material; `apps/ios/` development files except `apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/`; and unused images in `content/assets/images/`. All excluded files remain tracked and unchanged in the repository. PDF exports and web-referenced artwork remain published. The shared KaTeX JavaScript, CSS, fonts, and license retain their existing web URLs and bytes. These exclusions take effect only after the Actions publishing workflow is deployed; they do not alter the existing branch publisher. The source-only integration test verifies the exclusions, repository-original preservation, actual image links, and shared KaTeX preservation in the build output.

[`pages-image-assets.mjs`](../../scripts/pages-image-assets.mjs) selects image-library files from the root web shells, application code and styles, scenes, reader Markdown, generated reading copies, and their supported dependencies. Linked priority Markdown follows the reader's supported namespace. Catalog entries, `usedBy` annotations, tests, code examples, and unlinked production documents are not proof of website use. Direct download and attribution links count as use, not only embedded images. SVG dependencies are followed. Literal runtime directory prefixes and template prefixes conservatively retain matching images; dynamically selected images must have literal paths or a complete image-library prefix in a web consumer. Arbitrarily assembled paths cannot be inferred by this static scan. Missing image references and undeclared runtime image-catalog consumers fail the build. Future catalog-driven image galleries require an explicit selection policy before deployment.

The deployment copy of `images.json` contains only entries for included images, preserving each retained entry's provenance and attribution without editing the full repository catalog. Image bytes are never transformed by the Pages builder. New literal references automatically include their images on the next build; removing the last website reference omits the image from Pages without deleting it from Git. Run `node --test tests/pages-image-assets.test.js tests/runtime-asset-build.test.js tests/runtime-asset-fresh-checkout.test.js` to verify the selection and complete source-only build.

Plainly: prove the replacement while the old publisher still has everything it needs. Keep the temporary files until the real website—not just the local build—passes verification.

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
