# Build Pages Runtime Data from Source

Decision date: 2026-08-31. The operator approved proving Actions publication before untracking the old publisher's generated inputs.

## Decision

Git retains the sources and generators for Borg playback records, the equation registry, and the full-corpus source index. Local setup, tests, and GitHub Actions rebuild these ignored outputs at their existing URLs. The [retention policy](../op/machine-artifact-retention.md) owns the ongoing build, storage, and recovery contract. PowerPoint originals, iOS development sources, design sources, and unused artwork stay in Git but are excluded from Pages under that policy.

## Accepted first deployment

[PR #243](https://github.com/jmarkmorris/architrino/pull/243) retained all 46 generated runtime files while introducing the guarded build path. After its merge and the operator's website check, Pages was switched to Actions with the existing domain and enforced HTTPS preserved. The repository deployment variable was then enabled and a fresh run dispatched on `main`.

- Accepted commit: `82a14f8e07de302ac2f70802d10250f8fc023ef9`.
- [Actions run 33394709268](https://github.com/jmarkmorris/architrino/actions/runs/33394709268): build and deployment succeeded.
- Measured by artifact enumeration: 4,010 published files totaling 415,243,159 bytes. Artifact ID `9758990509`; GitHub artifact digest `sha256:0108093bebef612837702d7d1472802f79a5dbcc699b1df7590b4d4e10a1e322`.
- Measured by HTTPS GET and SHA-256 comparison with that run's extracted artifact: all 121 checked paths matched, comprising 46 runtime outputs, 48 images, 23 shared KaTeX files, three app entrypoints, and the filtered image catalog. Both Hyde SVGs matched. Four representative excluded URLs returned HTTP 404.
- Browser checks loaded the homepage and Hyde artwork/tooltip, advanced Borg's SC-03 prescribed-record playback, and loaded Equation Mapping's 4,646 equations across 154 chapters with a rendered Hyde result. Captured error logs were empty. This was prescribed playback, not an EOM solver run.

Plainly: the public website received the generated files and selected artwork that GitHub built, and the tested apps loaded their data. This is deployment and packaging evidence, not scientific validation or exhaustive app testing. A failed response, changed byte hash, or failed data-loading interaction would overturn the corresponding delivery check.

## Storage removal and remaining acceptance

At the second migration's preparation, the exact 46 generated inputs occupied 116,362,716 bytes and 2,641,827 physical lines. Removing them from the Git index preserves local ignored copies and all reproduction inputs. The temporary retention allowance and its permissive validator path are retired; regression tests reject tracking for every runtime family and reject revival of the obsolete allowance.

Plainly: the large deletion is a one-time removal of expanded build output from new commits. It prevents future generated churn; it does not erase old Git objects or remove the built files from the published website.

The second PR must pass source-only reconstruction and the exact-state local and remote PR gates. Its merge remains the operator's decision. After that merge, acceptance still requires a successful Actions deployment of the merged commit and repeat verification of the runtime URLs and app data loading. The first deployment's proof does not claim this later deployment has already happened.
