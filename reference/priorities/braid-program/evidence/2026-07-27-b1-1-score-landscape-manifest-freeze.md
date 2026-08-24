# B1.1 Score-Landscape Manifest Freeze

Status: BP-009 completed at score-free instrument-freeze grade and awaiting operator review. No analytical row, causal root, center pilot, multi-frequency slice, random or broad screen, or solver campaign was run.

Claim grade: **derived implementation evidence** for manifest construction, identity binding, and contract validation; **measured execution evidence** only for the dry-run receipt creation and focused test results. This packet supplies no prescribed-path score and no independent numerical or physical acceptance.

## Frozen packet

The pure builder emitted exactly 377 unique materialized B1.1 rows in the declared order:

| Stratum | Rows |
| --- | ---: |
| Center | 1 |
| Axial | 48 |
| Pairwise interaction | 264 |
| Held-out Latin hypercube | 64 |
| **Total** | **377** |

The manifest is [`b1-1-score-landscape-manifest.v1.json`](../campaigns/b1-1-score-landscape-manifest.v1.json). Its byte SHA-256 is `a1e6ca5d021dab22e1aef978463f87c4057295aa619217948b7e048349f58882`; its canonical-object SHA-256 is `be99ef97036fc8376b61c0c14804782a21204d404f8a8a90d770d375b14224b6`. All 377 row ids and sampled-spec hashes are unique. The 64 held-out rows retain 1,536 full SHA-256 permutation and jitter counter tokens before their first unsigned 64 bits are converted to binary64 coordinates.

Plainly: every proposed point and every held-out random-looking coordinate is fixed before a score exists. A later runner cannot invent a replacement point after observing a result.

The center row reproduces the sealed identities:

- sealed case SHA-256: `a0a485c9104204e92d8b1ad0af995f26f9264a481b99c36dd7e88d28f8e3388c`;
- sampled-spec SHA-256: `c62c3e8ba3a393c7c090e79e7bd4b3869a8cbc1fcd007c3530cdafc0f45abe67`;
- exact-source SHA-256: `2fe5abc99c837a627c1817c4c27e39b71ecdae2264ea572d276e3d8e1b42f52a`; and
- canonical B1.1 source-byte SHA-256: `69b33b21543e2a563e1d52692205c2db60931b5f09e67697ac729cbd00efe580`.

The center reconstruction used the original score-free taxonomy sampler, seed, and ordinal. It did not read or recompute the old score.

## Protocol, runner, and audit bindings

The frozen [`complete-cycle protocol`](../campaigns/b1-1-score-landscape-complete-cycle-protocol.v1.json) has byte SHA-256 `dbb58ffeb7e1c85214f2f7abffea85ba94b93c13ccfa3158060f0f61271611d7` and canonical-object SHA-256 `3c5641cd9cd88f47e8cdbdb0b7697df002d6bb9e6418ac0d390541f09a27b30d`. It fixes $c_f=1$, 24-by-12-by-24 primary resolution, 48-by-16-by-32 refined resolution, the complete root policy, event tolerances, surface reductions, spectral reductions, and fail-closed gates.

The runner [`run-b1-1-score-landscape.mjs`](../../../../scripts/eom/run-b1-1-score-landscape.mjs) accepts only the frozen manifest and protocol hashes. Its current command set is limited to `dry-run` and `check`; analytical execution is deliberately absent. It binds 377 create-exclusive row paths under `.local-data/braid-analysis/b1-1-score-landscape-20260727-v1`. The ordered path set SHA-256 is `cbf51992369ff5092c4526eb8328b93fc87d98983f65bb8647438d1d7786bf84`.

The separately authored dense-root instrument [`audit-b1-1-score-landscape-dense-roots.mjs`](../../../../scripts/eom/audit-b1-1-score-landscape-dense-roots.mjs) imports no causal-root evaluator. It predeclares an independent geometric root-residual maximum of `1e-12`, exact inventory requirements, and fail-closed dispositions. BP-009 invoked only its `describe-contract` command; no root packet was audited.

Plainly: this packet freezes what a later authorized analytical tool must consume and how it must fail. It does not contain an analytical tool invocation or a result.

The dry-run receipt is [`2026-07-27-b1-1-score-landscape-manifest-freeze.v1.json`](2026-07-27-b1-1-score-landscape-manifest-freeze.v1.json), with byte SHA-256 `1bfcefacd32ba7879e4fbc088330c4a50d33d27c79cf36dd773127c1e519a804`. It records exact SHA-256 identities for the builder, runner, independent audit, source generator, sampler, protocol validator, and exact-source validator.

## Fail-closed rules

Only `applicable-threshold-crossing` and `applicable-threshold-noncrossing` may carry scores. These dispositions remain null-score:

- `inapplicable-member-score` for incomplete moving-receiver acceleration inventory;
- `unknown-numerical` for root, convergence, separation, resource, or certification failure; and
- `invalid-manifest-row` for any identity or specification mismatch.

Null-score rows do not count as candidate failures. The refined maximum pointwise residual ceiling remains `6`, the primary/refined change ceiling remains `0.05`, and the dense independent root-residual ceiling remains `1e-12`.

Plainly: an unavailable or uncertified result stays unknown or inapplicable. Nothing in BP-009 weakens a gate or turns missing capability into negative candidate evidence.

## Validation

The focused commands passed:

```bash
node --test tests/b1-1-score-landscape-freeze.test.js
node scripts/eom/build-b1-1-score-landscape-manifest.mjs check
node scripts/eom/run-b1-1-score-landscape.mjs check
node scripts/eom/audit-b1-1-score-landscape-dense-roots.mjs describe-contract
git diff --check
```

The test result was 6/6 passed. The builder check reconstructed byte-identical manifest and protocol files. The runner check reconstructed the write-once receipt without creating any campaign output path.

## Operator decision boundary

BP-009 is complete and the packet is frozen for operator review. The center-only capability pilot remains a separate analytical authorization. The remaining 376-row local landscape, rational multi-frequency slice, random or broad candidate screen, threshold relaxation, and solver campaign remain unauthorized.

Closure goal: review the frozen identities and fail-closed contract before any separate decision about a center-only capability pilot.
