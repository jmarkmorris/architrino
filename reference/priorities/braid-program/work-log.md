# Braid Program — Work Log

Append-only. Dated entries, newest last. One entry per completed unit of work: what ran, what it showed (graded), where the evidence landed, what it unblocks. No entry rewrites; corrections are new dated entries.

## 2026-07-15 — Program opened

- Directory created as a fresh start superseding the eight legacy `braid-*` workstreams (operator decision, 2026-07-15). No content moved; all documents authored new.
- Drafted: charter (README.md), live state (priorities.md), method.md, configuration-chart.md skeleton, this log, brainstorming.md, and the campaigns/evidence/mining subdirectory rules. All marked DRAFT pending operator ratification.
- Ground rules of record: no reliance on legacy proofs or calculations (insights and ideas mined as unproven leads only); no legacy terminology outside mining citations; screening rules out, evolution rules in; every number carries instrument + grade + evidence pointer.
- Legacy directories remain frozen in place; archiving is planned after the running instrument cross-verification campaign (app-solver) completes.

## 2026-07-15 — First mining pass over the archive completed

- Three parallel read-only miners covered the consolidated legacy brainstorming
  stream, the idea-bearing memos, and the seven other archived lanes' idea
  files. Results staged in `mining/` as four themed files plus an overview,
  ~47 raw candidates curated to 47 items across: medium-and-conservation (15),
  mechanisms-and-dynamics (9), assembly-and-mass-map (13), method-lessons (10).
  Every item carries grade **idea (unproven lead)**, an inert plain-string
  source citation, a confirm/kill test, and a recommended disposition confined
  to braid-program (brainstorming entry / configuration-chart obligation /
  method.md addition / campaign objective / hold-in-mining).
- Boundary rule sharpened by operator mid-pass and applied throughout: an item
  qualifies only if it stands with all legacy measurements stripped — if
  removing the measurement removes the content, it stays in the archive.
  Excluded on this rule: the cylindrical-radius closure pattern (operator's
  example), numeric matches to Standard Model constants, the support sum rule
  and fractions, stability-verdict rankings, and legacy dissociation
  phenomenology. The same rule removed a legacy-pattern line from
  configuration-chart.md's open questions.
- Curator's short list is in `mining/2026-07-15-overview.md`; the standout is
  the fully specified, never-run wake conservation-and-transport program,
  which is instrument-independent by construction.
- Operator disposition review scheduled next session; nothing promoted yet.

## 2026-07-16 — Assembly viewer captured; Borg hazards cleared

- Operator ratified the 3D assembly viewer. Requirements sketch landed at
  `campaigns/assembly-viewer-requirements.md`: viewer-not-instrument rule
  (display-only, provenance banner, claim-grade label), `assembly-view-record.v0`
  schema sketch (worldlines over the delay window + binaries/ansatz/events
  metadata), display modes (animated core with trail depth = delay horizon,
  chart pose, co-rotating/screw frame, strobe, envelope, collapse-protocol
  comparison, figure export), overlays, and the Borg re-base (keep surface,
  replace data spine). Queue item 3 (instrument gate) now includes adopting the
  record schema so rung-1 runs emit viewable records from day one.
- Borg prerequisites cleared same day: app-borg lane scope re-pointed to the
  EOM engine with a reading rule over its six older packets; the fixture
  generator's provenance-label defect was confirmed already repaired and the
  do-not-run order lifted. (2026-07-16 later that day: the retired pre-EOM
  evaluator, its bridge, its fixtures, and all references were purged from the
  repo — see `reference/priorities/operations/pre-eom-evaluator-removal.md`;
  the viewer consumes EOM record files only.)

## 2026-07-16 — Instrument gate authored; assembly-view-record.v0 adopted end to end

- Queue item "author the instrument gate" executed: [campaigns/instrument-gate.md](campaigns/instrument-gate.md)
  drafted (pending operator ratification with the charter set). Contents:
  accepted capabilities G1–G5 with evidence pointers (EOM Stage E engine at
  `executable_architecture_evidence`; fresh-authored residual reduction;
  checkpoint-chunked harness with chunking booked in the refinement envelope;
  release root-clearance; per-campaign independent-oracle parity duty against
  `eom_independent_oracle/v0`); barred list (any non-EOM engine, field-speed
  fold windows pending the root-completeness extension, prescribed-orbit-as-
  evolution, toy laws, sampled-only state, canonical claims pre-acceptance-gate);
  the per-campaign booking checklist; and §4 finalizing `assembly-view-record.v0`
  (segments authoritative, samples display-only, claim-grade enum fail-closed).
- Schema adopted in code the same day (measured — suites named below green):
  the shared display adapter `src/apps/shared/EomHistoryDataset.mjs` ingests
  `assembly-view-record.v0` alongside `eom_evolution_contract/v0`, so Borg
  (`borg.html?eomRecord=<url>`), causal-delay-feedback, and the animator worker
  replay records with no further app changes; a converter
  (`scripts/eom/convert-borg-trajectory-to-assembly-view-record.mjs`) rebuilds
  retained segments from the harness's existing `borg-fixture-trajectory.v1`
  replay files under the declared `piecewise-cubic-hermite/v0` rule, stamping
  conversion provenance and inheriting (never upgrading) source evidence
  status. Contract tests: `tests/assembly-view-record.test.js` 6/6, adapter
  consumers 51/51 (Hermite round-trip reproduces inertial closed form to
  1e-12 — measured). Native record emission from the harness is deferred until
  the EOM optimization lane is quiet; the converter bridges rung-1 from day one.

## 2026-07-16 — Operator ratified the segments-authoritative schema decision

- In-session operator agreement (2026-07-16): `assembly-view-record.v0`
  worldlines carry retained segments as the authoritative state; sampled rows
  are display-only. The gate as a whole remains DRAFT pending ratification of
  the charter set.
