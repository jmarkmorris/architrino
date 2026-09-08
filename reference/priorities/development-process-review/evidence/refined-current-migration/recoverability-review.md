# Refined acceleration transport recoverability

The current refined acceleration transport remains blocked by authentication of its original admitted execution inputs. This is a narrower, reproducible result than saying that the scientific evidence is missing. The candidate-producing numerical function `project_cell`, its range reference, and the separately authored `compare_candidate` path remain unchanged. No partial replacement transport was added.

## Availability measured against the actual contract

`check-original-input-availability.mjs` reads the entrypoint's `FIXED`, `REFINED`, and `PRIOR_OPERATIONS` inventories, authenticates both original admission files by their declared SHA-256 digests, and inventories their source bindings and stage stdout/stderr bindings. It normalizes paths before counting path-plus-hash identities. Known SHA-256, exact bytes, substituted bytes, and wrong-size controls pass before the target scan. The resulting [availability record](original-input-availability.json) reports 235 distinct obligations, of which 34 no longer match their live paths. Retained archives supply 31 of those 34. An initial exploratory count of 247 did not normalize relative/absolute aliases; 235 is the corrected canonical count.

Archive search is explicitly bounded to files beneath `.local-data` and `reference/priorities` with a `.source` suffix or the basename `ps`, `git`, or `memory_pressure`, and at most 64 MiB. It does not establish absence elsewhere on the host, in system backups, or in external archives. The remaining three originals were not found in that search:

| Original input | Required SHA-256 | Required bytes |
| --- | --- | ---: |
| `/usr/bin/memory_pressure` | `a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56` | 135248 |
| `/usr/bin/git` | `179301dcb41ea78accc3fa0048a7e6f6710d891945a751a34addd622020c1818` | 118928 |
| `/bin/ps` | `472992c470606d28f577590decfecd7f4a20f832fd92c671bebc6d44790b5d02` | 170816 |

The one missing repository control, `tests/f6c-emission-refinement-pilot.test.js`, was recovered from commit `0fb575921783188ce528a45c671090e9ecc00464`. Its new data-only `.source` copy has exactly the admitted digest `b7b91ae569b20a1a53e7c37a63de3edc65e844019ee5a8bae03bc84d2d9dd277` and 31,325 bytes; [recovery provenance](unit-control-recovery.json) records the source. It was not executed.

The two original theorem archives are already present and hash to `f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68` and `6abbbbacc1671052bdd881790094dbd71ebb03d54904ac1f937edae1f3c9f936` by `shasum -a 256`. The current refined declaration itself matches the refined wrapper's `a9d871a35e6e9f00e96ba07182798cb87f546eabe0664e7f170b67c820bb43fc` pin by the same command. The older archived refined declaration has a different, preserved identity; it is not interchangeable with that current named binding.

## Why fresh execution bindings do not close this gap

The preserved refined verifier's `authenticate_refinement` requires the full 202-source admitted refinement map, checks every original source through its `read_binding` callback, and validates original stage output logs. The producer's `authenticate_refined` independently enforces the corresponding obligation. Thus these three system executables are required as original evidence bytes even if a future run correctly binds today's system executables for new process observation. Updating new-run operational hashes cannot establish the old byte identities. Passing current process tests cannot establish them either.

The preserved verifier also compares original manifest ancestry with the caller-supplied ancestry map. The [recorded ancestry comparison](recorded-ancestry-differences.json), authenticated against the pinned original manifest and preceded by known equal/changed metadata controls, identifies five differences between the current wrapper's expected documentary generations and the original manifest: prior closure owner, acceleration reference proof, member predeclaration, root theorem, and reconstruction theorem. Their original archives are available. A future transport must route these original logical identities consistently through the original evidence chain and retain the current named execution inputs separately. It must not make a mixed-generation source map appear to be the original admitted map.

## Supported next step and falsifier

Recover the three exact original system binaries into explicitly bound data-only archives, then implement and test the current transport against the complete original source census. Finding files with all three required SHA-256 digests and sizes overturns the present availability blocker. If recovery is impossible, a separately reviewed change to historical evidence-admission obligations is required; this review neither proposes that missing bytes be silently waived nor authorizes rewriting original records. Source availability does not itself accept the scientific result or authorize a full numerical campaign.

## Wider local recovery follow-through

After rollover the operator requested continued original-binary recovery. The named-candidate [comparison instrument](check-host-binary-candidates.mjs) first passed exact digest, substituted-byte and wrong-size controls, then compared the three installed utilities and the Git executables bundled with Command Line Tools and Xcode. None matches any required original identity; [the comparison](host-binary-candidates.json) records their exact current sizes and hashes. Candidates were read as data, never executed. The two developer Git executables are different objects from the much smaller `/usr/bin/git` system launcher, so their availability does not satisfy that binding.

Read-only backup inspection with `tmutil destinationinfo` reports no configured destination; `tmutil listlocalsnapshots /` lists no Time Machine snapshots. `tmutil listbackups` reports no machine directory and an operation-not-permitted error, so that command does not prove absence of every possible backup. `diskutil apfs listSnapshots /` lists one snapshot; `diskutil info /` identifies that same snapshot as the currently mounted root. It therefore supplies the current bytes already rejected by the comparison, not an older generation. `ls /Volumes` lists only Macintosh HD. No historical snapshot was mounted or modified.

The exact-name `find` search under `/System/Volumes/Update`, `/Library/Updates`, `/Library/Developer/CommandLineTools` and `/Applications/Xcode.app` found the two developer Git executables and their shell-completion text. The update Controller, Hardware and `.TemporaryItems` directories denied access, and the search exited one. Thus the search establishes no matching accessible executable candidate in those locations, not exhaustive absence from protected update storage. Spotlight's exact-name query returned no candidates and is not relied on as an exhaustive filesystem search. The accessible update `mnt1` directory is empty by `ls`; `lastOTA` lists update logs rather than a retained binary tree.

The original-byte blocker remains. A backup, installer image or another host may supply the required objects, but no such source was available in this bounded local inspection. Recovery requires matching both the table's digest and byte size before the files enter data-only evidence storage. Recompiling public source, substituting a current executable, or changing the expected digest would establish a different object and cannot close original-input authentication.

## Disposition in the approved items 1–8 continuation

The renewed continuation supplies no additional backup, installer or host location. The retained search and access limits above therefore remain the evidence for item 2; repeating the same searches would not broaden that evidence. Item 3 remains blocked by the actual original-source authentication contract, and no partial refined transport or weakened historical verifier is substituted. The next actionable input is an accessible candidate source for the three table entries. If exact originals remain unavailable, the alternative is a separate reviewed admission-contract decision that explicitly distinguishes unavailable historical authentication from any new current result. This is an unresolved prerequisite, not a completed refined implementation.
