# Braid Program — Work Log

Append-only. Dated entries, newest last. One entry per completed unit of work: what ran, what it showed (graded), where the evidence landed, what it unblocks. No entry rewrites; corrections are new dated entries.

## 2026-07-15 — Program opened

- Directory created as a fresh start superseding the eight legacy `braid-*` workstreams (operator decision, 2026-07-15). No content moved; all documents authored new.
- Drafted: charter (README.md), live state (priorities.md), method.md, configuration-chart.md skeleton, this log, brainstorming.md, and the campaigns/evidence/mining subdirectory rules. All marked DRAFT pending operator ratification.
- Ground rules of record: no reliance on legacy proofs or calculations (insights and ideas mined as unproven leads only); no legacy terminology outside mining citations; screening rules out, evolution rules in; every number carries instrument + grade + evidence pointer.
- Legacy directories remain frozen in place; archiving is planned after the running instrument cross-verification campaign completes.

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
  do-not-run order lifted. (2026-07-16 later that day: the viewer consumes EOM record files only.)

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

## 2026-07-16 — EOM path-provenance audit failed closed before Campaign 1

- Completed the requested source sweep across `src/eom`, `scripts/eom`, the
  shared history display adapter, `src/prescribed-path-analysis`, and the Python
  oracle. Detailed classified inventory and reproduction commands landed in
  [evidence/2026-07-16-eom-path-provenance-audit.md](evidence/2026-07-16-eom-path-provenance-audit.md).
- Verdict **FAIL (derived)** on one booking-path defect: the interim Borg replay
  converter fits cubic-Hermite segments between sampled endpoints, labels the
  result `evolved-record`, and puts those constructed cubics in the schema field
  defined as authoritative retained history. The EOM solver's own accepted
  segment publication path passed the static trace; prescribed-path analysis
  remained firewalled; the independent Python oracle consumed no production
  shortcut for its coupled reference evolution; producer-asserted canonical
  flags were not consumed.
- Part 2 did not open. No Campaign 1 spec or run was started, so no fate,
  residual, parity, or rung-2 claim was booked. Queue items 3-4 now carry the
  path-provenance blocker. Fix target: stream exact EOM-published segments into
  native assembly-view records; alternatively bar reconstructed records from
  campaign booking with operator sign-off and provide another compliant record
  path.
- Focused validation measured green: assembly-view/prescribed-path/Borg runtime
  suites 21/21; oracle Phase 4 suite 12/12; oracle reference-kernel suite 6/6;
  `git diff --check`. These checks do not overturn the provenance defect because
  the converter tests establish replay interpolation, not EOM segment origin.

## 2026-07-16 — Path-provenance repair passed; Campaign 1 specified under execution hold

- Operator selected the preferred F1 disposition: implement exact native
  segment emission and bar the sampled converter from evolved-record booking.
  The [repair audit](evidence/2026-07-16-eom-path-provenance-repair-audit.md)
  now records **PASS for path provenance (derived, with measured serialization
  checks)**. This supersedes the earlier audit's live verdict without rewriting
  that write-once evidence file.
- The checkpoint-chunked harness now writes `assembly-view-record.json`
  atomically from checkpoint-retained histories after every accepted chunk and
  at run close. It copies exact decimal segment time, coefficient, and error
  tokens; records the retained-history fingerprint; and separates declared
  prehistory count from evolved-extension count. A serialization-only checkpoint
  dumper was added for exact comparison. No `src/eom` evolution semantics were
  changed by this repair.
- Correction to the earlier instrument-gate entry: replay conversion does **not**
  inherit booking authority. The converter now hard-codes
  `claimGrade: chart-hypothesis` and `evidenceStatus: display-only`; its source
  evidence label is non-authoritative metadata. The instrument gate is ratified
  with this bar and the exact-native schema fields.
- Measured smoke validation used a rebuilt EOM solver newer than the last
  `src/eom` source change. A two-path opposite-polarity straight-prehistory run
  completed one accepted step with release root clearance certified. Each
  record worldline contained one declared prehistory segment and two evolved
  half-step segments; every path id, fingerprint, time, coefficient, and error
  token compared exactly equal to the checkpoint. The shared adapter ingested
  the record. Focused JavaScript suites passed 21/21.
- [Campaign 1](campaigns/campaign-1-subfield-binary.md) is now specified before
  runs: 27 strictly sub-field release configurations; three exact cubic,
  endpoint-matched prehistories per configuration; a three-level step/history/
  root/chunking refinement envelope; full-trajectory residual and root gates;
  one independent-oracle window per production run; symmetry-reduced collapse
  and fate gates; record booking; and a named falsifier. The $\theta=0$ rows feed
  the collinear queue item.
- No campaign physics run or fate classification was booked. The instrument
  gate forbids upgrading an instrument in the same change that first exercises
  it, so production waits for a separate ratification change and an independently
  checked implementation of the Campaign 1 binary workload.

## 2026-07-16 — Exact record emission ratified; Campaign 1 workload constructed

- Crossed the instrument gate's separate-change boundary for exact native
  `assembly-view-record.v0` emission. The prior repair had implemented and first
  exercised the emitter; this change independently inspected the checkpoint and
  record projections and accepted G3 emission duty. Before and after workload
  integration, both path ids, both retained-history fingerprints, and every
  segment time, coefficient, and error token matched exactly.
- Reconfirmed build freshness before the instrument check. The completed EOM
  build (`2026-07-16 13:39:20 -0400`) was newer than the last `src/eom` change
  (`2026-07-16 13:33:56 -0400`), and both audit harnesses were compiled later
  with warnings enabled and no diagnostics. No `src/eom` semantics changed.
- Implemented `campaign1-subfield-binary-v1` in the checkpoint-chunked harness:
  the declared $d\times s\times\theta$ grid, exact opposite-polarity release
  states, `P0-inertial`, `P1-lateral`, and `P2-longitudinal`, and the fixed
  R0/R1/R2 step/history/root/chunk rows. The cubic histories are declared inputs
  on $[-20,0]`; their decimal rebases carry explicit `1e-11` position and
  velocity enclosures. The production run manifest now names the binary
  coordinate and refinement.
- Added a construction-only harness mode that instantiates all workload rows and
  exits before root search or evolution. Its measured inventory was 27 release
  configurations, 81 configuration/prehistory coordinates, 243 refinement rows,
  486 paths, 226,800 retained segments, and 2,430 analytic probes.
- Added a separately authored JavaScript checker. It reconstructed the grid,
  release state, cubic $q$ and $q'$, endpoint groups, old-history displacement,
  and refinement envelope from the campaign spec. All checks passed; maximum
  probed position/velocity interval widths were approximately $2.0031\times
  10^{-11}$ and $2.0001\times10^{-11}$. This agreement is graded measured
  implementation parity because both implementations landed in one change; the
  closed-form endpoint identities are recorded separately as a derived theorem.
- Booked the durable [ratification and workload evidence](evidence/2026-07-16-checkpoint-record-emitter-ratification-and-campaign-1-workload-validation.md),
  updated the forward-only instrument gate and campaign specification, and moved
  queue item 3 to ready-for-production state.
- No Campaign 1 master-equation evolution, fate classification, residual/root
  ledger, oracle parity window, collapse result, or canonical claim was run or
  booked. Production remains a separate change starting with a fresh build
  identity check.

## 2026-07-16 — Assembly viewer ownership moved to the Borg app lane

- Moved the requirements sketch to
  `reference/priorities/app-borg/assembly-viewer-requirements.md`, where Borg
  design, requirements, and build handoffs are owned. The Braid Program retains
  the adopted `assembly-view-record.v0` schema, emitter acceptance, and per-run
  booking duty in `campaigns/instrument-gate.md`.
- The ownership move changes no campaign schema or evidence grade. Instrument
  gate §4 now links to the Borg-owned requirements packet; prior dated log
  entries retain their historical path text.

## 2026-07-16 — Undirected ensemble campaign ownership consolidated

- Braid Program is the sole scientific owner for the undirected ensemble
  campaign: declared seed coordinates, persistence criterion, fate
  classification, collapse adjudication, and promotion routing.
- EOM owns the reusable checkpointed harness, campaign-driver behavior,
  deterministic replay, convergence/provenance capability, and cost instrument.
  The former `eom-attractor-search` directory remains a focused evidence index.
- This consolidation changes no harness measurement, campaign criterion, or
  booked physical fate.

## 2026-07-20 — Illustrative spindle chart display pipeline

- Added the focused `spindle-braid-chart-spec.v0` source with the operator-approved illustrative dimensionless member: zero drift; common angular frequency $\pi/2$; radii $0.22$, $0.32$, $0.44$; cap angles $20^\circ$, $40^\circ$, $65^\circ$; phases $0^\circ$, $120^\circ$, $240^\circ$; and polarity-assignment signs $+1,-1,+1$. These values are explicitly refinable chart choices, not physically selected parameters. Claim grade: declared input. Falsifier: the source JSON differs from any listed value.
- Added a deterministic `prescribed-geometry` emitter and checked-in `assembly-view-record.v0`. Analytical tests verify finite right-handed frame input, stable labeled order, antipodality, constant radii and cap heights, common angular frequency, carrier speeds, boundary cases, Hermite endpoint agreement, and conservative interpolation bounds. Claim grade: derived analytical identities plus measured implementation checks. Falsifier: `node --test tests/spindle-chart-record.test.js` or the generator `--check` fails.
- The record is `chart-hypothesis` / `display-only`; its six paths are prescribed display histories and no EOM solver, causal-root calculation, acceleration row, residual, stability test, or branch-selection test ran. The spindle family remains a candidate family and no retained branch or booked physical result follows. Claim grade: derived from the emitter call graph and provenance gate. Falsifier: the generator imports or invokes an EOM path, or the shared adapter accepts this engine id with an evolved or stronger evidence label.
- Added the positive integer `displayTrailPeriods` to the source specification and prescribed-geometry provenance; the illustrative record declares one complete period. Changing this source value to two later would request two displayed revolutions without changing engine semantics, provided the sealed record covers both periods. Claim grade: declared input plus derived display arithmetic. Falsifier: the generator accepts a non-positive/non-integer value or the shared adapter omits it from validated provenance.
- The declared $20^\circ$, $40^\circ$, and $65^\circ$ values are cap angles locating each antipodal pair above and below the common equatorial plane; they are not orbit-plane tilt angles. All three prescribed orbit planes deliberately share the source frame normal. Claim grade: derived from the chart equations and record plane normals. Falsifier: any emitted binary carries a different plane normal or the analytical cap-angle construction rotates an orbit plane.
- Operator decision: preserve the current coaxial spindle record and add any tilted-plane geometry as a separately named source-defined variant. No tilted record is emitted until its three plane orientations are specified; inventing those orientations in the viewer would violate the source-defined geometry boundary. Claim grade: operator-selected design constraint. Falsifier: the coaxial record's normals change or Borg derives tilted planes from display controls.

## 2026-07-21 — Spindle boundary records and taxonomy limits

- Generalized the spindle chart emitter to a source/output target registry and `--all` generation/check route. Added taxonomy metadata that distinguishes family members, boundary members, and parameter variants without changing `assembly-view-record.v0` or EOM solver semantics. Claim grade: derived implementation and measured by deterministic generation tests. Falsifier: `node scripts/eom/generate-spindle-chart-record.mjs --all --check` or `node --test tests/spindle-chart-record.test.js` fails.
- Added planar tri-binary and full-cap axial-pair spindle boundary specifications and sealed records. Both inherit the illustrative member's declared numerical chart and change only the canon-defined boundary coordinate: all cap angles are respectively $0$ and $\pi/2$. They remain `chart-hypothesis` / `display-only` prescribed geometry and are not retained branches or new braid families. Claim grade: derived from the spindle boundary definitions and measured by analytical identity tests. Falsifier: source provenance classifies either as a family, or the boundary identities fail.
- Did not emit symmetric shell, nested shell, `3:2:1`, `4:2:1`, or volumetric three-plane records. The current corpus names those families or variants but does not completely specify their numerical charts: shell/support radii; exact paths or three-plane normals; absolute frequency scale and `I:M:O` role mapping for ratio variants; phases/circulation; polarity membership; and record interval remain incomplete in one or more cases. Claim grade: derived source audit. Falsifier: a canonical configuration source is found that fixes every required input for a named record.
