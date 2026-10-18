# Ordinary Integration Stage O0: Frozen Baseline Receipt — 2026-10-14

This receipt freezes the outputs of the current EOM solver, unchanged, before any ordinary-integration source edit, as the [scope](../contracts/matched-pair-ordinary-integration-scope.md) requires. It is the baseline half of the O0 packet; the design half is the [O0 design](../analysis/matched-pair-ordinary-stage-0-design.md). Nothing in `src/eom` was edited. Every instance uses $c_f=1$.

## Subject

**Measured at 10:06Z:** `HEAD` is `2a24acaca073d21a80b838654d159543f8220c8e`. The 93-file inventory of live `src/eom`, `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/live-source-inventory.sha256`, has no line that differs from the accepted increment 4 inventory, by `diff` of the two sorted lists. `git --no-optional-locks status --short -- src/eom` is empty.

## Build

A separate build directory, `.tmp/eom-ordinary-integration-2026-10-14/build-baseline/`, CMake Release, two build workers, Command Line Tools toolchain, under the owned-compute supervisor: started 10:06:50Z, exit status 0, finished 10:09:25Z after 154 s, no compiler warning.

| Item | SHA-256 |
| --- | --- |
| Library | `7172f7bba66c22e6eb742cdb04ac2c4b8b04a8cdbfc7705fa737283492984d57` |
| `eom_borg_shadow_cli`, the ordinary CLI and server | `49ed4b5fe3e87a42bca31290a1a8c21f2fe2bf9dba0dc637aebee85660cef332` |
| `eom_equation_inspect_cli` | `31846227e3563c4fdf25e831f7e3bcdc7777b45a391c52d7811f260585043485` |
| Embedded build identity reported by `capabilities` | source `1324a322db9b440a…`, configuration `94ac0adc58c19606…`, build `480db00bf248da16…` |
| Build and run script, wire envelope writer, wire runner | `a85c1915f97988f4…`, `49ca713a1b9c6b22…`, `593f33dafbeb4b68…` |

## Frozen outputs

94 files, bound by `baseline-output-identities.sha256` (SHA-256 `5cb1b5003d3b4706…`) in the baseline directory above.

- **Ordinary and Surface fixtures:** `eom_native_fixture_cli all`, the acceleration and evolution fixtures, the matched-pair fixture's three commands, the provider transport fixture, the Surface fixture, the equation provider fixture, `eom_equation_inspect_cli capabilities` and the Borg protocol version.
- **Validated fixtures:** all thirteen commands of the validated evolution fixture with one worker, including the record files, and the four far-step fixture commands.
- **Wire, through `eom_borg_shadow_cli eom-v2` with a checkpoint file:** capabilities; inspect and evolve for the canonical and Surface requests of the existing v2 qualification fixture; inspect and evolve for a static three-path canonical request; and three rejections: an unknown `numerics.integrationMethod` key is refused `unknown_request_field`, `model.method` set to a validated value is refused `unsupported_model_combination`, and a request schema `eom_evolution_request/v3` is refused `unsupported_request_schema`. All ten invocations exited 0 and wrote their response; the three evolve runs wrote checkpoints.

**Check of the baseline build against accepted evidence:** the thirteen validated evolution outputs, the four far-step outputs, the four record files and the six ordinary fixture outputs are byte-identical to the accepted increment 4 live outputs, by `cmp`. The Surface, provider transport and equation provider fixtures print their own known-case lines first and complete.

## Expected differences after any source edit

The build embeds a digest of the source tree. Any edit under `src/eom` therefore changes, in the default outputs, these fields and nothing else that this receipt can foresee:

- `build.sourceDigest`, `build.buildDigest` and `build.configurationDigest` wherever a resolved model or the capabilities appear: in `capabilities`, in every `resolvedModel`, and in `checkpoint.data.resolvedModel`;
- `modelDigest`, which hashes the resolved model;
- `checkpoint.digest`, which hashes the checkpoint data.

The O0 design adds one more expected difference: `executionMethods` in the capabilities document. Every other field, including every coefficient, radius, time token, counter, ledger, `legacyModelFingerprint` and the v7 bytes inside v8, must be byte-identical. A comparison instrument for later gates will project out exactly the fields named here, with a known case first, and report anything else as a difference.

## What this establishes

**Measured:** the outputs of the current solver on these inputs, with their identities, and that the baseline build reproduces the accepted increment 4 outputs. It does not establish that any output is right; that rests on the instruments that accepted them.
