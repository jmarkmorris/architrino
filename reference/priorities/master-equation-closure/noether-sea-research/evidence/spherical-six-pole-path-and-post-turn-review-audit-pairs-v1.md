# Six-pole audit archive and retrieval

The seven path-continuation/post-turn audit and consistency pairs are retained losslessly in this archive. The fourteen expanded originals were replaced by operator direction on October 31, 2026, after byte-for-byte restoration checks; retrieval was verified again after removal. This changes storage and access, not the scientific claims, assumptions or historical corrections.

Download or inspect the [bundle](spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.json.gz) and [manifest](spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.manifest.json). Both are required for retrieval. The archive contains 2,896,907 bytes and its manifest 5,435 bytes, versus 20,839,994 bytes in the fourteen expanded originals, by byte counts in the verified manifest and filesystem reads. Their SHA-256 identities are respectively `a335f6e817d768f05c0e2a9c63ec577e3a28a9f5b0c872ceaae96ea82bc3108f` and `b6e68196b2d055eca24b2116b9b8b53f15f2c17be163524ec14c5790bb3177f5`.

## Retrieve the exact original files

From the repository root, use the [retrieval tool](../../../../../scripts/retention/audit-pair-bundle.mjs). The destination must be a new directory; restoration creates the original repository-relative paths below it. It does not overwrite the checkout.

```bash
node scripts/retention/audit-pair-bundle.mjs verify --bundle reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.json.gz --manifest reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.manifest.json
node scripts/retention/audit-pair-bundle.mjs restore --bundle reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.json.gz --manifest reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.manifest.json --out .tmp/ops-033-audit-pairs-retrieved
```

Verification and restoration check all fourteen original sizes, physical line counts and hashes. Restoring needs no original payloads, numerical dependencies or rerun of the experiment. The source-scoped preparation command also accepts `--source-root .tmp/ops-033-audit-pairs-retrieved` to rebuild from retrieved originals. The [preparation and adoption account](../../../aaa-operations/evidence/ops-033-audit-pair-consolidation-2026-10-31.md) records the original controls, measured sizes, native comparisons, destination readback and exact removal scope.

## Historical names and identities

Every name below originally belonged to this evidence directory. These are archive members rather than expanded files. Frozen manifests and logs retain the original names and hashes; compare them with the restored files when checking historical evidence.

| Original member | Bytes | SHA-256 |
| --- | ---: | --- |
| `spherical-six-pole-path-continuation-claude-review-audit10-G1-P1.json` | 399303 | `2a2a16dd969490f6e92962d2893069c9c6b67b8d3c41a3bc35ed717c38ffad6f` |
| `spherical-six-pole-path-continuation-claude-review-audit10-G1-P1.json.consistency.json` | 451649 | `6d9c296cb49d549cbacf252e2afe67ff0d424a5366cce1d6cbd6fe7688d687ef` |
| `spherical-six-pole-path-continuation-claude-review-audit10-G2-P2.json` | 597576 | `99e5b87329c171760bc5d9d3d65cf255528caa2bbf0240fa2c4137f1f132e733` |
| `spherical-six-pole-path-continuation-claude-review-audit10-G2-P2.json.consistency.json` | 649922 | `14c8e3aa33123fbe82ec4b479c527c334f1cec3b7268b3d9d0df7ac0dea5395c` |
| `spherical-six-pole-path-continuation-claude-review-audit10-G3-P3.json` | 352289 | `8b6e4dd04196847817f2e135e6e1e4dcda9cafb35d4475a9e4195f52178fd6e8` |
| `spherical-six-pole-path-continuation-claude-review-audit10-G3-P3.json.consistency.json` | 404635 | `a178c320bdf2804257c7887e8a72c3395c4eaee766a8874c596c1fd168889d6d` |
| `spherical-six-pole-post-turn-claude-review-audit10-GP2-R1R2R3.json` | 3837140 | `47f11448c741c8345314c00137555e93308e5dced77c20fba61569acf2ae9229` |
| `spherical-six-pole-post-turn-claude-review-audit10-GP2-R1R2R3.json.consistency.json` | 3880015 | `2f6d0ef363594d4ecab30a9fc6ae42edaa1f790b1f3790fc34d45f64b99162f3` |
| `spherical-six-pole-post-turn-claude-review-audit10-GP3-R4R5R6.json` | 3061925 | `89f6e7a04809c577446a1e78ee817da513eb068d85f1b0d0266dca29d8cfe5d3` |
| `spherical-six-pole-post-turn-claude-review-audit10-GP3-R4R5R6.json.consistency.json` | 3114266 | `06ed4ff617f36d89de1e84b1ac331fe449c676b1e0d1d4dd79cbcb659528cfd2` |
| `spherical-six-pole-post-turn-claude-review-audit10-GP6-P4P5.json` | 1507808 | `319cd95b45984b868bc82498e486c8e6150da3e3a4a9e0ca499a66ddbb211be7` |
| `spherical-six-pole-post-turn-claude-review-audit10-GP6-P4P5.json.consistency.json` | 1560149 | `d6208a1ea0073d4a88d88a4b77d837914f0516dae91aa97a2845c44281c014ea` |
| `spherical-six-pole-post-turn-claude-review-audit10-GP7-P6.json` | 485488 | `94b5eba3f03264ec6ad0e8ed17eda060a1f40afd827f0e4b1f6a17500682077c` |
| `spherical-six-pole-post-turn-claude-review-audit10-GP7-P6.json.consistency.json` | 537829 | `8071dd1ff4cc3336819cff522415c794d1322b4d8288b6161db19b015256dec0` |

## Historical report links

The seven reports that linked directly to these JSON outputs now link here from their familiar paths. Before those navigation-only edits, their original bytes were copied and verified under `spherical-six-pole-audit-link-originals/`. The [report identity index](spherical-six-pole-path-and-post-turn-review-audit-pairs-v1.reports.json) binds each original path, retained original bytes/hash and navigable-copy hash. The [source-location map](../../../../../src/documentation/research-source-locations.json) resolves scientific source reads to those preserved original reports and historical asset links to this guide. The content link validator and reference reader share that navigation mapping. Consequently the pinned Surface source hashes retain their original referents; source-data identity is not replaced by this guide's identity.

Frozen report copies, command logs and preservation manifests are historical records. They retain their original text and source-relative links. Their navigation is resolved using the recorded source origin and this archive-member mapping. For plain filesystem or GitHub views, the reports at their familiar analysis paths contain updated working links; preserved originals are provenance copies, not a second edited account.

The archive's payload must remain alongside its manifest for continuing retrieval. There is no expiry. Retaining it in the repository owner does not establish a Git commit, remote publication or separate backup. Earlier Git objects are not removed by this consolidation.
