# Live Library Port Receipt: Validated Far-Step Producer, Evidence and Snapshot Seam — 2026-10-12

This receipt records the application and live qualification of the library port described in the [version 2 candidate record](../analysis/matched-pair-stage-3-cpp-candidate-v2.md) and prepared as recorded in the [closeout receipt](matched-pair-closeout-receipt-2026-10-12.md). It is increment 0 of the [Stage 3 design](../analysis/matched-pair-stage-3-evolution-design.md). The default policy remains disabled, the evolution entry points still refuse every grouped policy, and nothing is persisted or transported. Every instance uses $c_f=1$.

## How it was applied

The operator directed the application in the implementation writer's session. The receiving host refused the writer's shell writes to `src/eom` three times with the reason "Modify Shared Resources"; the operator then ran the prepared guarded script, `.local-data/eom-matched-pair/2026-10-12/live-gate/apply-library-port.sh`, by hand. One of the four new files, `ValidatedEvidence.hpp`, had been created earlier by the writer through the file-writing tool and was byte-identical to the prepared unit.

**Measured before application, 18:00:28Z to 18:14:05Z:** the six live preimages equal the Stage 2 live inventory by `shasum -a 256 -c`; `patch --dry-run` of each per-file piece is clean; no tracked file under `reference`, `content/generated`, `scripts` or `src` contains the SHA-256 of any preimage; `scripts/check-transmitter-factor-clean-slate.mjs`, which names two of the files, passes.

**Measured after application, 18:21:18Z:** `diff -rq src/eom .tmp/eom-matched-pair/stage3c-tree/src/eom` reports no difference, and `shasum -a 256 -c` of the ten ported files against the reviewed scratch tree inventory reports all ten unchanged. `git status --short src/eom` shows six modified files, `CMakeLists.txt`, `MatchedPairEnclosure.hpp`, `MatchedPairEnclosure.cpp`, `CoupledEvolution.hpp`, `CoupledEvolution.cpp`, `CertifiedAcceleration.cpp`, and four new files, `ValidatedEvidence.hpp`, `ValidatedFarStep.hpp`, `ValidatedFarStep.cpp` and `native/eom_validated_far_step_fixture_cli.cpp`. The transmitter-factor check passes again. The six pre-change files and their hash list are retained under `.local-data/eom-matched-pair/2026-10-12/live-gate/pre-change-live/`.

## Identities

| Item | Identity |
| --- | --- |
| Live `src/eom` after the port | 87-file inventory `live-library-port-source-inventory.sha256` under `.local-data/eom-matched-pair/2026-10-12/live-gate/` |
| `ValidatedEvidence.hpp` | `1ff9fea4e7280b2eb375307c879d9be15f4ccfa8d2f78308cb4128c0e0f6b533` |
| `ValidatedFarStep.hpp` | `e0c5388d48ce7c71af60985b793a34cd8c5dfa9c052dcfdc594a1084eb8bde6d` |
| `ValidatedFarStep.cpp` | `b42edf481857a819641f120892f5626130e8f051d58b72b6d38d40a6308b42b8` |
| `eom_validated_far_step_fixture_cli.cpp` | `a9c681cfb37bbdff6e3a051ad1e82eff56bca3fce2aaff257a959d0f544a1844` |
| `MatchedPairEnclosure.hpp`, `.cpp` | `491ce77b85c924f4ffe722941f07c438c1b777db693e63fad2f3ba3a2fb8076d`, `0301cd8729dbd608413084973742672e4457fab6cda4da2c704e5611aee618df` |
| `CoupledEvolution.hpp`, `.cpp` | `6ce68f49a2b573a6fc3bed96322ae6e0620097faaed5b2ca0f0e0ad889042338`, `66be0408d0173d3d650028c3c568914087a221f46618ccd1d8d906fef9854e19` |
| `CertifiedAcceleration.cpp`, `CMakeLists.txt` | `13ded36d989008397422e7e645b8479681dffd75abc56edf19beec875c4327c8`, `e92ca3a7d123f4a454a5c6e6602978e12bb467794f29bdd1f4c1592f7ecd837d` |
| Live build library and fixture, `.tmp/eom-matched-pair/build-live-gate/` | `124616a44aea9d21ae474194bb24d699e8061438569034ab4d7e268e1d8567c1`, `982076e94ba7caf0fb7cd04e18405772837488cd9a4f65ce29d0e4eac670fdf1` |
| [matched_pair_stage_3_live_gate_check.py](matched_pair_stage_3_live_gate_check.py) | `f4198d70d1bd58fcaead06f02571de2f2d3e86325372f22232052e46986e17a5` |
| [matched_pair_stage_3_live_three_path_check.py](matched_pair_stage_3_live_three_path_check.py) | `accf41834d816d256e61244fd2060758de96973b1e04dd940a33a03a85f089e2` |
| Reviewer's frozen reference `matched-pair-review-stage3-three-path-brackets.json`, read unchanged | `68ef391c2fe13e4777b50f5f2a1b26925b1d257bf39b39571226e13a8cedf229` |

The live build is CMake Release with two workers, `DEVELOPER_DIR=/Library/Developer/CommandLineTools` and the `MacOSX26.5.sdk` system root, in its own build directory, with no compiler warning. Build and fixture run each executed under the owned-compute supervisor with exit status 0 and closed process groups; the fixture run finished at 2026-10-12T18:23:17Z after 67.0 seconds. Checkers ran under `/Users/markmorris/vibe/.venv/bin/python`, version 3.13.2. Raw outputs are under `.local-data/eom-matched-pair/2026-10-12/live-gate/live-outputs/`.

## Results

| Check | Result |
| --- | --- |
| Gate checker on live outputs, known cases first | 95 of 95 rows, exit status 0 |
| Publication and extent | Every published segment's exact slack polynomials are nonnegative over the whole step; every end token is the exact sum of start and step; the reviewer's late-time case ends at `10000000000.0002987` |
| Evidence ancestry and scalars at the producer | Missing, stale and foreign evidence, an altered ancestor with intact joins, a transferred segment, changed coupling, changed charge and a renamed path each decline; five append refusals; nothing published in any |
| Frozen two-path truth | 512 steps on the aliasing control certified; end tubes contain the frozen bracket; velocity tube disjoint from the aliased interval |
| Frozen three-path truth, reviewer's reference | 14 of 14 rows: at $t=1/128$, $1/64$ and $1/32$ the reviewer's exact position and velocity brackets for all three paths lie inside the live tubes. The four-step run is a scratch copy of the live fixture with one count changed from 2 to 4, linked against the live library; the changed line is recorded by `diff` and the source is retained as `three_path_four_steps.cpp` |
| Grouped snapshot on validated tubes, both scheduling routes | One group certified with evidence bound; exact relationships 7 to 6 and enclosed 2 to 3 of 9; receiver width equals the one emitted width; totals identical on the two routes; the reviewer's exact acceleration bracket at $t=1/32$ inside the grouped and the disabled totals |
| Exact fallback | No evidence, stale evidence, foreign evidence, altered member radius, changed coupling, changed charge: no group, exact evaluation; the exact-only policy declines tubes and reproduces the disabled totals |
| Evolution | The evolution entry point refuses the validated-tube policy with `unsupported_execution_policy` |
| Existing routes | Six existing fixture outputs, native, acceleration, evolution, matched-pair module, piecewise and evolution guard, are byte-identical to the retained live Stage 2 outputs |
| Against the reviewed scratch build | The four fixture output files are byte-identical to the scratch library port's |

## What this establishes and what it does not

**Claim grade: measured**, by the live build and the instruments above on the listed cases. The live solver now contains the producer as a library unit, the sealed evidence type and the snapshot seam, and on these cases they behave exactly as the reviewed scratch port did, with every existing fixture output unchanged.

It does not establish Stage 3. Evolution cannot use any of this; there is no accepted-step integration, no worker qualification and no persistence. The evidence is sealed only within one process. The producer is first order and was exercised on two and three paths. Byte-identity with the scratch build is agreement of one source compiled twice. The independent elements are the reviewer's frozen brackets and the reviewer's own probes of the candidate. Falsifiers: any of the ten live files differing from the reviewed scratch tree; a gate or three-path row failing on a rebuild from the inventoried sources; or a changed existing fixture output.
