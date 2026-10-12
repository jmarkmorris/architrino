# Preliminary independent review of the library conversion

Review time: 2026-10-12T01:05Z. Reviewer: Codex. Subject: the retained `stage3c-tree` conversion of the independently accepted [C++ version 2 candidate](matched-pair-review-stage-3-cpp-candidate-v2-2026-10-12.md). This is preparation for the live gate, not a live qualification or Stage 3 release.

Measured source comparison: `git diff --no-index -- .tmp/eom-matched-pair/stage3b-tree/src/eom .tmp/eom-matched-pair/stage3c-tree/src/eom` shows the producer moved from the fixture header into `ValidatedFarStep.cpp` and a public declaration header, with namespace/type/function renaming and linkage changes. Direct `diff -u` against the retained version 2 producer shows the arithmetic, root-window logic, whole-step slack, publication and append checks unchanged by inspection of every hunk. The sealed evidence constructor remains private; its sole producer friend is now `architrino::eom::ValidatedFarStepProducer`. The snapshot consumer implementation and both pass-through implementation files are unchanged in this two-tree diff; request/header comments are revised. CMake adds the producer to the existing library and a manual fixture executable. The fixture adds an explicit evolution-policy refusal control. No recurring test enrollment is added by this CMake diff.

Measured preliminary numerical evidence: the previously run narrow directory adapter of the frozen reviewer checker passes known analytical controls before inspecting the library conversion outputs, then verifies 23 published steps, 144 axis checks, exact whole-step minima and publication content chains, independent two-path truth containment and both three-path grouped snapshot routes. Its retained stdout is `.local-data/eom-matched-pair/2026-10-11/reviewer-targets/stage3-library-gate-preliminary-check.stdout`. This checks retained outputs; no new live execution is claimed here. The adapter changes the target directory only and leaves the frozen scientific reference unchanged.

Source identities measured by `shasum -a 256` at review time:

| Subject | SHA-256 |
| --- | --- |
| `stage3c-tree/src/eom/include/architrino/eom/ValidatedFarStep.hpp` | `e0c5388d48ce7c71af60985b793a34cd8c5dfa9c052dcfdc594a1084eb8bde6d` |
| `stage3c-tree/src/eom/include/architrino/eom/ValidatedEvidence.hpp` | `1ff9fea4e7280b2eb375307c879d9be15f4ccfa8d2f78308cb4128c0e0f6b533` |
| `stage3c-tree/src/eom/src/ValidatedFarStep.cpp` | `b42edf481857a819641f120892f5626130e8f051d58b72b6d38d40a6308b42b8` |
| `stage3c-tree/src/eom/native/eom_validated_far_step_fixture_cli.cpp` | `a9c681cfb37bbdff6e3a051ad1e82eff56bca3fce2aaff257a959d0f544a1844` |
| `stage3c-tree/src/eom/CMakeLists.txt` | `e92ca3a7d123f4a454a5c6e6602978e12bb467794f29bdd1f4c1592f7ecd837d` |
| Reviewer directory adapter | `0deaabec944c220afe3e8488cee5965e525869a0c1adc087dea79151ce2dee46` |
| Preliminary checker stdout | `a99de2b1673e103f75bf63f91f4b13ca84f360e2ee3295e3b8bfaf370867fac7` |

The tree paths above are beneath `.tmp/eom-matched-pair/`; the adapter is `.tmp/eom-009-integration/reviewer-library-gate-adapter.py`. These ignored files are local evidence, not a backup.

Open obligations: Claude's actual live application/checkpoint and rebuild/source/output binding remain awaited. The live gate must establish default-disabled compatibility, evidence refusals, exact debit under both scheduling routes and continued evolution refusal before any successor runtime release. Stage 3 accepted-state propagation, atomicity/cancellation, worker replay and persistence/policy identity are not established by this conversion or its output parity. The falsifier for the preliminary source conclusion is a changed substantive hunk or a source identity mismatch; the numerical conclusion is overturned by a failure of the unchanged exact reference on the bound outputs. Reobserve bytes before acting on a later live packet.

Delivery state: the single checkpoint inquiry at `## Codex — 2026-10-12T00:53:29.221Z` remains prepared/undelivered. A fresh computer-use observation at this wake reports the Mac locked before composer interaction. No duplicate inquiry or substitute route was used. The exact coordinator lease filter returned no active owned jobs. The original new-work cutoff 01:42:02Z and hard closeout 02:02:02Z remain in force.
