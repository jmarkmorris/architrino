# Master Equation Terminology Migration Disposition

## Status

- Date: 2026-07-19
- Scope: current AAA source prose, controlled Archie terminology, current technical orientation, reader-facing Equation Mapping text, explanatory EOM solver text, safe comments, and test descriptions
- Change class: terminology-only; no Master Equation numerator, polarity rule, inverse-square kernel, causal-root set, absolute-value convention, same-transmitter admission rule, or EOM solver computation changed
- Promotion classification: **promote now** for the terminology policy; **priority-only** for the source-density acceleration proposal

The pre-edit working tree was clean. During this batch,
`master-equation-import-audit-walkthrough-2026-07-18.md` acquired a separate
concurrent edit. That file was preserved and is excluded from this migration's
changed-file and validation claims.

## Approved mapping

| Previous term | Current term | Meaning | Compatibility treatment |
| --- | --- | --- | --- |
| $T_{\mathrm{em}}$ or an unambiguous emission variable | $T_t$ | transmitter emission time of the arriving wake | old serialized records and generated copies remain literal |
| reception $T$ when an event role is being distinguished | $T_r$ | receiver reception time at which acceleration is evaluated | bare $T$ remains valid for generic absolute time |
| local implicit-function variable $S(T_r)$ | preserve $S$ and identify $S(T_r)=T_t$ | function-valued placeholder used to differentiate a moving emission root | not a third physical time coordinate and not a stale emission symbol |
| source role in an arriving causal hit | transmitter | architrino at its past emission event | `source*` machine fields remain unchanged; unrelated uses of source remain unchanged |
| unexplained `row` | causal hit, acceleration contribution, root record, ledger entry, table entry, or mapping | the actual object named by the local context | literal schema fields, established ledger-row references, and historical quotations remain unchanged |
| $D_s$ | $D_t$ | transmitter-side wake-spacing and emission-time Jacobian factor | `source_normal`, `sourceNormal*`, and current schema fields remain unchanged |
| $D_T$ | $D_r$ | receiver-side wake-crossing and root-playback factor | `receiver_normal` and `receiverNormal*` fields remain unchanged |
| $W^{\mathrm{rec}}=|D_T/D_s|$ | $W^{\mathrm{acc}}=|D_r/D_t|$ | receiver-weighted acceleration factor in the current canonical EOM | old `receiver_strength` meanings remain frozen by schema version |
| signed branch orientation $D_T/D_s$ | $dT_t/dT_r=D_r/D_t$ | exact root-playback derivative | existing `branch_orientation` and app compatibility fields retain their wire names |

The separation used by the current terminology is

$$
\mathbf r_t=\mathbf X_r(T_r)-\mathbf X_t(T_t).
$$

The transmitter's position at $T_r$ is not part of an arriving causal hit.

## Reproducible inventory

The pre-edit source inventory used fixed-string `rg` searches for the six previous forms across `content/markdown/aaa`, `reference`, `src`, `content/scenes`, `tests`, and `scripts`, followed by a meaning review of each file. In current AAA sources it found 1,053 $T_{\mathrm{em}}$ occurrences, 96 $D_s$ occurrences, 81 $D_T$ occurrences, 336 `receiver-normal` occurrences, 135 `source-normal` occurrences, and 85 direct $W^{\mathrm{rec}}$ occurrences. A separate code/UI inventory found 148 lines requiring either reader-language migration or compatibility disposition.

The final boundary-aware search is:

```bash
rg -n -P '(?<![A-Za-z0-9_])D_s(?![A-Za-z0-9_])|(?<![A-Za-z0-9_])D_T(?![A-Za-z0-9_])|T_\{\\mathrm\{em\}\}|W\^\{\\mathrm\{rec\}\}|receiver-normal|source-normal' \
  content/markdown/aaa reference/archie content/scenes \
  src/apps/equation-mapping/EquationMappingData.js src/eom/README.md
```

Result: no matches. `node scripts/check-master-equation-terminology-migration.mjs` enforces the same current-reader boundary and also requires the new definitions to remain present.

### Follow-up scan

A second meaning-aware scan found three current-surface gaps beyond the original six-token audit: role-specific reception $T$ beside $T_t$ in the canonical Master Equation chapter, causal-hit uses of `source`, and bare `acceleration row` or similar unexplained `row` language. The follow-up batch:

- made $T_r$ explicit throughout the canonical causal-hit definitions, root-transport lemma, regularized law, causal-root map, self-hit conditions, and energy-facing restatements;
- retained $S$ in the simple-root transport lemma and stated its use explicitly as the local root function with $S(T_r)=T_t$;
- migrated causal-role prose and Photon UI labels from source to transmitter while leaving source-named wire fields intact; and
- replaced unexplained acceleration-row language with the actual acceleration contribution or record, while preserving established requirement-table and ledger-row uses.

The focused audit now also rejects bare `acceleration row`, causal-hit `same-source`, reception $T$ beside $T_t$ in `master-equation.md`, and stale source-role labels in the Photon UI. The `same-source` phrase in `spacetime/black-holes.md` remains allowed because it denotes one astrophysical evidence packet, not transmitter identity.

### Semantic blind-spot closure

A third meaning-aware scan tested the role distinction beyond the canonical Master Equation chapter. It found explicit reception events still written with generic $T$, transmitter events still called source events in foundation and simulation explanations, and structural branches still called rows. The closure batch:

- made $T_r$ explicit in the architrino definition, absolute-time and absolute-timespace causal-root constructions, Euclidean-void provenance tuple, emergence and self-hit conditions, Noether-braid kernel statement, and action-energy simulation recipes;
- reserved bare $T$ for genuinely generic absolute-time coordinates, trajectories, windows, and observer-level discussions where no transmitter-receiver event pair is being distinguished;
- migrated high-confidence causal roles such as past transmitter positions, apparatus transmitters, transmitter worldlines, and transmitter-side path history while preserving historical electrodynamics, generic equation sources, document sources, radiation-source classes, and machine fields;
- replaced unexplained structural `row` labels with `branch`, and replaced local action or acceleration `row` labels with `entry` or `contribution`; and
- strengthened the audit across all current AAA and Archie surfaces for role-specific reception $T$, past-source-position language, source-architrino language, source/receiver role pairs, and a targeted family of unexplained row phrases.

The expanded audit deliberately excludes the historical Jefimenko comparison in `philosophy-history/treasure-physics-overlooked.md`, the phase-out quotation in `archie/comparative-glossary.md`, and the generated children's-book manifest. Those locations preserve historical, mapping, or generated text rather than current causal-role terminology. The audit now also requires the comparative-glossary entries for $S(T_r)$, $T_r$, $dT_t/dT_r$, and ledger-row usage, so deletion of the explanations fails closed.

## Changed surfaces

- Controlled canon: `mathematics-terminology.md`, `terminology-usage.md`, `mathematics-style-guide.md`, and `comparative-glossary.md`.
- Current AAA source corpus: the original 77-document migration plus the semantic blind-spot closure across foundations, dynamics, Noether braid, spacetime, philosophy/history, validation, and action-energy simulation notes.
- Current technical and agent orientation: the Master Equation technical brief and active entourage role prompts.
- Reader-facing application data: the Equation Mapping per-hit and full Master Equation screens, callouts, anchors, search text, and tests.
- Explanatory implementation text: EOM solver README, comments and diagnostic messages, prescribed-path messages, oracle comments, and test names. Machine identifiers remain intact.
- Enforcement: `check-master-equation-terminology-migration.mjs` was added to Content Integrity; the existing old-law compatibility validator keeps its acceptance semantics.

## Preserved-occurrence allowlist

Every remaining relevant previous-form occurrence belongs to one of these explicit locations:

| Location | Disposition | Reason |
| --- | --- | --- |
| `content/generated/**` | generated drift | generated reading copies are not manually edited; regenerate only in an authorized write flow |
| `apps/ios/ArchitrinoReader/GeneratedTextbookPackage/**` | generated drift | generated iOS textbook package is not manually edited |
| `reference/priorities/app-eom/evidence/**` | frozen evidence | hashes, provenance, measured old-law records, and historical terminology must remain literal |
| `reference/priorities/**` outside this report | priority/history/contract record | proposals, decision ledgers, work logs, old-law analyses, migration controls, and closure packets retain the notation under which their claims were made; they are not current reader canon |
| this disposition report and the migration prompt | mapping quotation | previous terms are required to state the migration and allowlist |
| `scripts/check-receiver-normal-clean-slate.mjs` | compatibility validator | filename, diagnostics, and acceptance rule identify the receiver-weighted law it checks |
| `.githooks/pre-commit`, `AGENTS.md`, `reference/op/codex-pr-branch.md`, `scripts/check-content-integrity.mjs` | literal compatibility command | references to `check-receiver-normal-clean-slate.mjs` must remain executable |
| `scripts/config/foundational-impact-contracts.json` | compatibility contract | current foundational-impact literals remain machine-readable contract data |
| `tests/equation-mapping-runtime.test.js` and `scripts/check-master-equation-terminology-migration.mjs` | negative-control literals | previous terms are test inputs that prove current surfaces reject them |
| `src/**`, `scripts/eom/**`, and `tests/**` camelCase/snake_case field families listed below | machine compatibility | wire keys, status codes, schema fields, CLI fields, and fixture keys retain their current spelling |
| `stats/pdgfeed.list.pdg_reactions.md` | unrelated use | token is external PDG-feed content, not Master Equation notation |

Generated artifacts are the only reader copies that still display the previous terminology. Their drift is deliberate under the instruction not to run generator write modes in this edit batch.

## Machine contracts deliberately unchanged

- `source_normal`, `sourceNormal*`, `source_normal_sign`, `source_normal_floor`, and literal $D_s$ fields in current records
- `receiver_normal`, `receiverNormalNumerator`, `receiverNormalFactor`, `unsignedReceiverNormalFactor`, `receiverNormalCrossingFactor`, `receiverNormalSpeed`, interval fields, and literal $D_T$ fields
- `receiver_strength` and `branch_orientation`
- `sourcePathId`, `source_history_ids`, `source_charge`, and receiver equivalents
- `sourceCount`, `maxSourceSpeedRatio`, `unresolvedSourceCount`, `sourceHistoryKind`, and other source-named Photon and prescribed-path data fields
- literal `same-source` schema values, root-kind values, branch-policy values, and compatibility identifiers
- `receiver_normal_branch_rows_missing` and `receiver_normal_branch_rows_invalid`
- `prescribed_path_absolute_history_receiver_normal_root_branch_sum`
- `receiverNormalOwner`
- `check-receiver-normal-clean-slate.mjs` and the foundational-impact validator literals

These fields require a new schema version or an explicitly authorized compatibility transition before renaming. Their values were not redefined.

## Ambiguous and deferred occurrences

No ambiguous occurrence remains on the current-reader surfaces enforced by the new audit. Occurrences in priority analyses were intentionally deferred as a class because changing a symbol there can change whether a statement describes the receiver-weighted law, the source-density proposal, a diagnostic-only Jacobian, or frozen old-law evidence. The owning workstream must migrate such a packet only when it also updates the packet's equation-version and evidence disposition.

## Validation record

| Command | Result |
| --- | --- |
| `node scripts/check-master-equation-terminology-migration.mjs` | passed |
| `node scripts/check-receiver-normal-clean-slate.mjs` | passed; compatibility semantics unchanged |
| `node --test tests/equation-mapping-runtime.test.js tests/prescribed-orbit-causal-roots.test.js tests/animator-delayed-hit-runtime.test.js tests/photon-runtime.test.js` | passed, 120 tests |
| `git diff --check` | passed |
| `node scripts/validate-content.mjs --check --strict` | blocked by pre-existing scene-index drift for `content/scenes/archie/greek_letter_match.json`; no content error |
| `node scripts/build-scene-graph.mjs --check --strict` | generated drift reported for scene graph, textbook TOC, and generated TOC Markdown; one missing-scene-index warning |
| `node scripts/build-textbook-md-pdf.mjs --check` | expected generated reading-copy drift in all 12 reading copies |
| `node scripts/export-ios-textbook-package.mjs --check --strict` | expected iOS package manifest and controlled-reference hash drift |

### Follow-up validation record

| Command | Measured result |
| --- | --- |
| `node scripts/check-master-equation-terminology-migration.mjs` | passed with the expanded reception-time, transmitter-role, row-language, and Photon UI checks |
| `node --test tests/photon-runtime.test.js tests/prescribed-orbit-causal-roots.test.js tests/animator-delayed-hit-runtime.test.js tests/animator-receiver-path-descriptors.test.js tests/ideal-braid-runtime.test.js` | passed, 75 tests |
| `git diff --check` | passed |
| `node scripts/validate-content.mjs --check --strict` | 0 errors and 3 warnings; existing `content/scenes/scenes_index.json` drift remains |
| `node scripts/check-content-integrity.mjs` | blocked by that existing scene-index drift; the content audit itself reported 0 errors |
| `node scripts/check-receiver-normal-clean-slate.mjs` | blocked by the concurrent priority file `analysis-receiver-factor-change-specific-promotion-audit.md:57`; this follow-up did not edit that file |

### Semantic blind-spot validation record

| Command | Measured result |
| --- | --- |
| `node scripts/check-master-equation-terminology-migration.mjs` | passed after expanding the audit to all current AAA and Archie reader surfaces for the newly identified semantic patterns |
| `node --test tests/photon-runtime.test.js tests/prescribed-orbit-causal-roots.test.js tests/animator-delayed-hit-runtime.test.js tests/animator-receiver-path-descriptors.test.js tests/ideal-braid-runtime.test.js` | passed, 75 tests |
| `git diff --check` | passed |
| `node scripts/validate-content.mjs --check --strict` | 0 errors and 3 warnings; existing `content/scenes/scenes_index.json` drift remains |
| `node scripts/build-scene-graph.mjs --check --strict` | 0 errors and 1 warning; generated scene graph, textbook TOC JSON, and generated TOC Markdown drift remain |
| `node scripts/build-textbook-md-pdf.mjs --check` | 0 errors and 0 warnings; expected drift remains in all 12 generated reading copies |
| `node scripts/export-ios-textbook-package.mjs --check --strict` | expected controlled-reference manifest and bundle hash drift for the four edited Archie references |

No generator write command was run. The authorized repair commands, when regeneration is separately requested, are:

```bash
node scripts/validate-content.mjs --write --strict
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-textbook-md-pdf.mjs --write
node scripts/export-ios-textbook-package.mjs --write --strict
```

## Physics boundary

This migration changes names and explanations only. The current canonical equation and EOM solver still use receiver-weighted acceleration $W^{\mathrm{acc}}=|D_r/D_t|$. The source-density acceleration proposal remains priority-only and received no promotion, implementation, score movement, or new evidence from this edit.
