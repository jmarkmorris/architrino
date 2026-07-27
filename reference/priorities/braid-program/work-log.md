# Braid Program — Work Log

Append-only. Dated entries, newest last. One entry per completed unit of work: what ran, what it showed (graded), where the evidence landed, what it unblocks. No entry rewrites; corrections are new dated entries. Live executable tasks and their local order remain in [work-queue.md](work-queue.md).

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
  (segments authoritative, samples display-only, and the claim-grade enum requires verification before advancement).
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

## 2026-07-16 — EOM path-provenance audit was not advanced before Campaign 1

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

## 2026-07-21 — Extreme cap-tilt inspection parameter variant

- Added the source-defined `illustrative-extreme-cap-tilt-spindle-variant-v0` parameter variant with cap angles $70^\circ$, $80^\circ$, and $85^\circ$. Radii, common angular frequency, phases, polarity assignment, frame, and record window remain those of the original illustrative member. The variant is `chart-hypothesis` / `display-only` prescribed geometry for inspection, not a retained branch or parameter-selection result. Claim grade: declared input. Falsifier: the source or emitted provenance differs from those values or upgrades the claim.
- The new member keeps the common coaxial plane normal and changes only the canon-defined cap-tilt coordinate. All angles remain below the static $90^\circ$ boundary, so every layer retains nonzero transverse radius and carrier speed. Claim grade: derived analytical identity and measured generator regression. Falsifier: any emitted layer is static or any binary carries an independently tilted plane normal.

## 2026-07-22 — Borg A/B/C prescribed-record cohort

- Replaced the geometry-owning legacy emitter with one family-neutral `prescribed-braid-spec.v1` generator and retained the former generator module only as a thin machine-compatibility adapter. Added exact prescribed display records for A1, A1.1, A1.2, A1.3, A1.4, A2, C1, and C2; migrated all four prior B1 records to canonical visible labels without changing their endpoint identities or paths. Claim grade: declared coordinates plus derived generator identities. Falsifier: the all-candidate generator check or family-constraint suite fails.
- The records are `chart-hypothesis` / `display-only`. They invoke no EOM solver and establish no retention, stability, energy, binding, particle mapping, or physical realization. Claim grade: derived from the generator call graph and record provenance. Falsifier: a generated record carries stronger provenance or the generator imports an EOM evolution path.
- Borg navigation now contains exactly twelve candidates grouped by Family A, Family B, and Family C. Each record carries one prescribed return period, one requested trail cycle, explicit taxonomy coordinates, and source-carried axes; coincident axes are deduplicated geometrically. Claim grade: measured implementation regression. Falsifier: catalog, record, scene, animation, or terminology tests fail.

## 2026-07-22 — A1 prescribed-display candidate signed off

- The operator approved catalog ordinal 1, `family-a-a1-general-v1` — `A1 — coincident endpoint orbits`, with mutually orthogonal yz, xz, and xy orbit planes at $\lambda_A=0$, zero axial half-separation, neutral-purple prescribed trails, and four-times display-only cubic-Hermite replay sampling. Accepted specification SHA-256: `b77b377843119a54e4c354c2a6cb8de846a83717772a1cedcfbc76a1ee0abd1d`; accepted Borg-record SHA-256: `9833c0ba7faebd6bfcc68f3b9bcbed6697f8454501f2b5f5469b079f7e22c2b9`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 2, A1.1, is now in review.

## 2026-07-22 — Family-A catalog representatives fixed at the near-rest endpoint

- The operator selected $\lambda_A=0$ for every Family-A Borg candidate. Ordinals 2–11 were mechanically updated and regenerated with binary axes along $x$, $y$, and $z$ and corresponding yz, xz, and xy orbit planes; candidate ids, labels, radii, axial/transverse decompositions, frequencies, phases, circulation senses, polarities, group centers, and translations were preserved. A1.1 remains in review and ordinals 3–11 remain pending. The superseded specification, Borg-record, and exact prescribed-source hashes are recorded in `borg-candidate-signoff.md`; no repository JSON analytical packet or database artifact references them. Claim grade: operator-selected prescribed display coordinates plus measured generator and geometry regression. No EOM solver or analytical campaign ran, and no retention, stability, energy, binding, or physical realization follows.

## 2026-07-22 — A1.1 prescribed-display candidate signed off

- The operator approved catalog ordinal 2, `family-a-a1-1-equal-frequency-v1` — `A1.1 — equal frequency`, after checking its radius, common frequency, and mutually orthogonal yz, xz, and xy orbit planes. Accepted specification SHA-256: `2bcc3858413003248fc5b91ee8160aac77418fa8d4617be7242dadfda6038489`; accepted Borg-record SHA-256: `d1b1a1232f19d508bab3bbda049ffdf7aa05d979929f52cd1d870d38d6d6ea49`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 3, A1.2, is now in review.

## 2026-07-22 — Borg orthographic camera restored

- The operator restored Borg's orthographic appearance after confirming that prescribed circular orbit planes are defined as orthogonal to their source-carried binary axes. The shared Borg runtime now uses orthographic projection across prescribed replay, optional Display evolution, and the random workspace; envelope fitting accounts for viewport aspect, and mouse-wheel zoom changes frustum scale without perspective depth scaling. A wide/tall-viewport arithmetic test and live A1.2 rotation/zoom inspection passed. This is a rendering-only correction: no taxonomy, source specification, generated record, hash, analytical packet, or database artifact changed or became invalid. A1.2 remains the sole in-review candidate.

## 2026-07-22 — A1.2 prescribed-display candidate signed off

- The operator approved catalog ordinal 3, `family-a-a1-2-equal-frequency-equal-radius-v1` — `A1.2 — equal frequency, equal radius`, as part of explicit Family-A visual approval after checking radius, frequency, orthogonal planes, and the restored orthographic presentation. Accepted specification SHA-256: `339046385b2182c13f229d121ee57e12bf4c514cd77a6d29cb7cefb5e32535e6`; accepted Borg-record SHA-256: `96edf543f3a5858336262e63433649a3b4c51e3cb4e37645c48e16682aa2670b`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 4, A1.3, is now in review; the operator's broader Family-A statement is retained as advance visual approval but does not replace candidate-specific contract and hash acceptance.

## 2026-07-22 — A1.3 prescribed-display candidate signed off

- The operator approved catalog ordinal 4, `family-a-a1-3-4-2-1-frequency-v1` — `A1.3 — 4:2:1 frequency`, through the explicit Family-A approval after its candidate-specific contract and checks were presented. Accepted specification SHA-256: `72a82ea3171c89113f9f2bde85ae66c9342113d2fde2191244a132b303076f18`; accepted Borg-record SHA-256: `c203a86773a736facee5c4112b5910c845ca66c81ad06cff6e95b1102441fda1`. The indexed binaries complete four, two, and one revolutions over the four-unit prescribed return; the approval is display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 5, A1.4, is now in review.

## 2026-07-22 — A1.4 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 5, `family-a-a1-4-3-2-1-frequency-v1` — `A1.4 — 3:2:1 frequency`, after its candidate-specific contract, full-cycle visual inspection, hashes, and checks were presented. Accepted specification SHA-256: `0d8f0c451b530bcf3c7c549761e0b75f9bdca7fcd529aeab31cc2a42511844b0`; accepted Borg-record SHA-256: `f4b15fead133b517f4cf7587e2a248f2fcb375238e10e77823c3c842ec3aafda`. The indexed binaries complete three, two, and one revolutions over the four-unit prescribed return; the approval is display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 6, A2, is now in review; the operator's A2 approval is retained as advance visual approval pending its candidate-specific contract and hash acceptance.

## 2026-07-22 — A2 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 6, `family-a-a2-fully-symmetric-v1` — `A2 — fully symmetric`, after its candidate-specific contract, full-cycle visual inspection, hashes, and checks were presented. Accepted specification SHA-256: `1f67ac9a06e0b4158ccdd4004c40b070a064287a3ba65d4bed36371666cc7948`; accepted Borg-record SHA-256: `856c9cb74570443bdca7ad9c6fde36421d4353bf301cf1c35bf026fe54b93681`. The reviewed representative has equal binary radius, axial half-separation, transverse orbit radius, and frequency; phases separated by $120^\circ$; one circulation sense; and phase-compensated cyclic equivalence of the complete paths. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 7, A3, is now in review.

## 2026-07-22 — A3 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 7, `family-a-a3-general-v1` — `A3 — general`, after its candidate-specific contract, full-cycle visual inspection, hashes, and checks were presented. Accepted specification SHA-256: `35c752f54d996fdf01058de1d02727b2158ec95401bfda57153deb3a9a530026`; accepted Borg-record SHA-256: `88c207b9d1f16c46d630bef18dee7ad9d50f41fc554a0255d090e35e6957e5a3`. The reviewed representative preserves origin-centered binary midpoints while positive axial half-separations separate the endpoint-orbit centers along three orthogonal binary axes; each binary satisfies $R_a^2=h_a^2+\rho_a^2$. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 8, A3.1, is now in review.

## 2026-07-22 — A3.1 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 8, `family-a-a3-1-equal-frequency-v1` — `A3.1 — equal frequency`, after its candidate-specific contract, full-cycle visual inspection, hashes, and checks were presented. Accepted specification SHA-256: `66def8ef3762d160c8758a95303723478f52f4cc59f42f780bda43bbddc9e475`; accepted Borg-record SHA-256: `a1e587e0b86dac91c7dde3844db1b25a1f218acaf8fbaeffb56f83a56c57ddff`. The reviewed representative preserves the A3 midpoint and axial/transverse relations while constraining all three binary frequencies to $f=0.25$. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 9, A3.2, is now in review; the operator's explicit A3.2 approval is retained pending its candidate-specific contract and accepted hashes.

## 2026-07-22 — A3.2 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 9, `family-a-a3-2-equal-frequency-equal-radius-v1` — `A3.2 — equal frequency, equal radius`; the sign-off became effective after its candidate-specific contract, full-cycle visual inspection, hashes, and checks passed. Accepted specification SHA-256: `8353e5ecc031c37ee6404d6b77749a880479fb30f59f1affca729e1dfe97eb19`; accepted Borg-record SHA-256: `971623c5395e6fb8d6595b62b3c7008f7f64a46768b0da486841ad389349e07c`. The reviewed representative has equal radii, one common frequency, phases separated by $120^\circ$, and independently selected positive axial/transverse decompositions. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 10, A3.3, is now in review.

## 2026-07-22 — A3.3 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 10, `family-a-a3-3-4-2-1-frequency-v1` — `A3.3 — 4:2:1 frequency`; the sign-off became effective after its candidate-specific contract, full-cycle visual inspection, hashes, and checks passed. Accepted specification SHA-256: `79763a84ed8f36d1324a87916301ab4382ddf0f22198c1e4bc0cf8aa63ae10cc`; accepted Borg-record SHA-256: `f351432df1eb0f47c6ff51198258472533db5db7b716363ac7be867ce02b7b44`. The indexed binaries complete four, two, and one revolutions over the four-unit prescribed return while retaining independent A3 radii and axial/transverse decompositions. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 11, A3.4, is now in review.

## 2026-07-22 — A3.4 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 11, `family-a-a3-4-3-2-1-frequency-v1` — `A3.4 — 3:2:1 frequency`; the sign-off became effective after its candidate-specific contract, full-cycle visual inspection, hashes, and checks passed. Accepted specification SHA-256: `1a780cdc4d01e1baa41b3123451d2ff5c8c749ae9b96da892100abe53493005e`; accepted Borg-record SHA-256: `4b60ec135a1154cd5286eb1da8faeb700a7494943379f041a49225b774274a11`. The indexed binaries complete three, two, and one revolutions over the four-unit prescribed return while retaining independent A3 radii and axial/transverse decompositions. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 12, the first B-family entry, is now in review with an operator-directed decimal-member numbering correction pending.

## 2026-07-22 — B1.1 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 12, `illustrative-spindle-chart-hypothesis-v0` — `B1.1 — interior reference`, and confirmed the B1.1–B1.4 numbering. After synchronized canon, source, generated-record, catalog, test, registry, and ledger updates, the candidate-specific numerical and full-cycle Borg checks passed. Accepted specification SHA-256: `69b33b21543e2a563e1d52692205c2db60931b5f09e67697ac729cbd00efe580`; accepted Borg-record SHA-256: `0bacb3db869a22085cdf93d2c90fcc80a2caa09dbb629b26facb3eff259a1032`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 13, B1.2, is now in review.

## 2026-07-22 — B1.2 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 13, `illustrative-extreme-cap-tilt-spindle-variant-v0` — `B1.2 — high-axial interior`. Candidate-specific numerical and full-cycle Borg inspection confirmed $h_a>\rho_a>0$ for every binary and the inherited B1 relations. Accepted specification SHA-256: `b7231ae1c44c1c243c9d30126cd1dffd69c58025417a2622f2d326440a8ec218`; accepted Borg-record SHA-256: `eb954a49330796f70d74130e8ce5ea1049a4f5d48378c89957a1031696845efd`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 14, B1.3, is now in review.

## 2026-07-22 — B1.3 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 14, `illustrative-planar-tri-binary-spindle-boundary-v0` — `B1.3 — all-equatorial boundary`. Candidate-specific numerical and full-cycle Borg inspection confirmed $h_a=0$ and $\rho_a=R_a$ for all three binaries and the inherited B1 relations. Accepted specification SHA-256: `62125f068325461f74c773627704a1431f3056fd3a7c5f1e276d1b9212be6389`; accepted Borg-record SHA-256: `294b0f2126dc991ca8c91a6dd8d1c7f4c16b1084e2ae0465165d0120b361a27e`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 15, B1.4, is now in review.

## 2026-07-22 — B1.4 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 15, `illustrative-full-cap-axial-spindle-boundary-v0` — `B1.4 — all-axial boundary`. Candidate-specific numerical and full-cycle Borg inspection confirmed $\rho_a=0$, $h_a=R_a$, fixed endpoint positions, and zero carrier speed for all three binaries. Accepted specification SHA-256: `16c5b5380b0d6c5c4bd16705f7ef675df44bd37da5e947a24ab0881ea22df54a`; accepted Borg-record SHA-256: `ad331a7033c37401dcfe2319fbddc755e4fc7da0b829e8700e43f2441acef104`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 16, C1, is now in review.

## 2026-07-22 — C1 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 16, `family-c-c1-co-rotating-b1-pair-v1` — `C1 — co-rotating B1 pair`. Candidate-specific numerical and full-cycle Borg inspection confirmed two complete B1 components at $x=\pm0.55$, common z-axis orientation, common circulation $+1$, and a $60^\circ$ relative phase. Accepted specification SHA-256: `7d56269891e3de9579e725b2f46379d3e153eff58dd796265447485e5f701881`; accepted Borg-record SHA-256: `28a19108c3c51ace89143b500515504b1a06faccaa8de24ab26f0eb936acffc0`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization. Catalog ordinal 17, C2, is now in review.

## 2026-07-22 — C2 prescribed-display candidate and catalog review signed off

- The operator explicitly approved catalog ordinal 17, `family-c-c2-counter-rotating-b1-pair-v1` — `C2 — counter-rotating B1 pair`. Candidate-specific numerical and full-cycle Borg inspection confirmed two complete B1 components at $x=\pm0.55$, common z-axis orientation, circulation senses $+1$ and $-1$, and a $60^\circ$ relative phase. Accepted specification SHA-256: `3f94207fc2b4ba3defc5d41acf81d163521fd0fcdc3f0448d1257031a75daf00`; accepted Borg-record SHA-256: `2c8b4330aa21952062bfb9b5bcb0c01e94d6ac7ceba69b268b41568227d09baa`. All 17 live Borg catalog entries now carry explicit operator sign-off. The approvals cover prescribed display geometry only and establish no EOM-solver retention, stability, energy, binding, or physical realization.

## 2026-07-22 — C1.1 and C2.1 candidate-definition review opened

- Added C1.1 and C2.1 as constrained Family-C variants composed of two B1.3 all-equatorial components. C1.1 retains same circulation; C2.1 retains opposite circulation. Canon, source specifications, the prescribed-record generator, Borg catalog routing, generated records, tests, the sign-off ledger, and the all-candidate analytical registry were synchronized. Numerical checks and Borg inspection of C1.1 at $T=0,1,2,3,4$ passed; C2.1 remains uninspected. The completed 17-candidate review remains closed at its accepted hashes. Ordinal 18, C1.1, is in review; ordinal 19, C2.1, remains pending. Claim grade: declared prescribed display coordinates only. No EOM solver or analytical campaign was run.

## 2026-07-22 — C1.1 and C2.1 coaxial correction

- The operator rejected the initial C1.1/C2.1 geometry because centers at $x=\pm0.55$ with z-directed component axes created two parallel axes rather than one common axis. The source specifications and generated records now place the centers at $(0,0,-0.55)$ and $(0,0,0.55)$, preserving center-to-center separation $d_C=1.10$ along the common z axis. Canon and generator tests now require coaxial B1.3 components, and the analysis methodology names $d_C$ as a required Monte Carlo coordinate with campaign-declared bounds and sampling measure. The rejected noncoaxial hashes are preserved in the sign-off ledger. C1.1 remains in review and C2.1 remains pending. No EOM solver or analytical campaign was run.
- Post-correction C1.1 inspection passed at the initial phase, multiple intermediate phases, and the prescribed return. Independent coordinate checks at $T=0,1,2,3,4$ confirmed a common z axis, axial center displacement $(0,0,1.10)$, zero transverse axis offset, antipodal endpoints, declared radii, zero axial half-separations, and return errors below $8\times10^{-16}$. C1.1 remains `in-review` until explicit operator sign-off; C2.1 remains `pending` and uninspected.

## 2026-07-22 — B-family binary-train analytical lane opened

- Captured the operator's 2021-01-02 twelve-trace drawing as an idea-grade source for an ordered common-axis orbital train and central radius envelope. The drawing does not declare polarity, phase, circulation, frequency, counterpart pairing, or the placement of additional architrino worldlines. Opened the lane now titled [Common-Axis Braid-Train Analytics](common-axis-braid-train-analytics.md) for exact six-, twelve-, and eighteen-worldline prescribed charts.
- Final Family-B assignment remains discussion-scoped because canonical B1 and Family C are unchanged.

## 2026-07-22 — generalized Family-B bounded prescribed-path pilot completed

- Implemented exact 6-, 12-, and 18-worldline source generation, separate binary and adjacent-payload maps, common-axis spacings, complete-cycle axial/radial/tangential residuals, spacing sensitivity, raw-ledger retention, independent acceptance, SQLite import, database generation, and deterministic export. The implementation invokes no path evolution or EOM-solver module.
- Measured twelve rows under the fixed pilot protocol: six references plus one seeded neighborhood row around each. Independent acceptance retained zero accepted rows and twelve diagnostic-only rejections. The database integrity check returned `ok`; manifest hash `1a8b5c951fe843530eebf16c3ef4432adeee5b5d106b059e582f68beaa7073df`; database-generation hash `eeddf19f84b29b78a84b21a775e3a907ea1f4f011f8855ff3d1aa46913183216`; two deterministic exports reproduced inventory hash `b84c8d6cda6395ea24f7244dc33decf81306f5d980066c7f514f9b0a5681bbcc`.
- The single central-envelope reference and its seeded neighbor reproduce the residual reduction under time refinement but retain nonzero residuals and fail exterior/sensitivity gates. Every dual row fails residual refinement. The exact matched six-payload comparison improves exterior cancellation but worsens axial, radial, and tangential residual RMS. Changing only the binary map leaves the source paths unchanged and therefore produces identical acceleration rows.
- No pilot row was added to the accepted braid candidate inventory. The pilot used $c_f=4$ and is now historical diagnostic evidence under the workspace-wide $c_f=1$ normalization rule. Twelve rows do not close or negatively rank the generalized train configuration space.

## 2026-07-23 — Family-B train dimension-extension correction

- Derived the fixed-pairing decomposition $\xi_{a,\pm}=b_a\pm h_a$. Canonical B1 is the common-midpoint locus $b_1=b_2=b_3$; after absorbing the common midpoint into the braid center, the nearest six-orbital train generalization adds two intrinsic relative-midpoint dimensions. A fixed-component twelve-core train carries the same extension componentwise, while payload worldlines change the inventory rather than merely extending coordinates.
- Corrected the pilot disposition from a negative Family-B result to a historical twelve-row protocol result. A current search must use $c_f=1$, co-translating exterior probes for intrinsic cancellation, explicit translation controls, and adequate space-filling coverage before any bounded-domain negative conclusion.

## 2026-07-22 — C1.1 prescribed-display candidate signed off

- The operator explicitly approved catalog ordinal 18, `family-c-c1-1-co-rotating-b1-3-pair-v1` — `C1.1 — co-rotating B1.3 pair`. The accepted corrected representative contains two coaxial all-equatorial B1.3 components with axial center separation $d_C=1.10$, zero transverse axis offset, common circulation $+1$, and relative phase $\pi/3$. Accepted specification SHA-256: `769e810ed65d6e4c29318cfa11722ec4efef2d314667d20162e5339bf77714c6`; accepted Borg-record SHA-256: `e7455be8c8a11737071af60a445fb21a99818ebe52db9668242657762f26952e`. The approval is prescribed display geometry only and establishes no EOM-solver retention, stability, energy, binding, or physical realization.

## 2026-07-22 — C2.1 prescribed-display candidate and 19-entry catalog review signed off

- The operator explicitly approved catalog ordinal 19, `family-c-c2-1-counter-rotating-b1-3-pair-v1` — `C2.1 — counter-rotating B1.3 pair`. Post-correction numerical checks and full-cycle Borg inspection confirmed two coaxial all-equatorial B1.3 components with axial center separation $d_C=1.10$, zero transverse axis offset, circulation senses $+1$ and $-1$, and relative phase $\pi/3$. Accepted specification SHA-256: `874742737883c0c51db4a24dbb198f576aadf570535046f2b2be1fe10b7fe328`; accepted Borg-record SHA-256: `e25cac06ab3b030798f53eb55cbce71352fd8fa787c97e88490db20c10d7c8db`. All 19 live Borg catalog entries now carry explicit operator sign-off. The approvals cover prescribed display geometry only and establish no EOM-solver retention, stability, energy, binding, or physical realization. No EOM solver or analytical campaign was run.

## 2026-07-23 — Family C generalized and sequentially renumbered

- The operator selected the general coaxial taxonomy option and the defining-inventory term `architrino worldlines`. Family C now contains every prescribed twelve-architrino geometry whose twelve defining worldlines share one axis, whether or not the record decomposes into two B1 components.
- C1 is the general co-rotating member and C2 is the general counter-rotating member. The previously signed-off two-B1 representatives are constrained loci renumbered C3 and C4. The previously signed-off all-equatorial C1.1 and C2.1 representatives are constrained loci renumbered C5 and C6.
- Six additional worldlines, when declared, form an Accessory Configuration outside the twelve defining Family-C worldlines. Adding or removing that configuration changes the source identity but not the C member identifier.
- The canonical coordinate chart, taxonomy, controlled terminology, source specifications, prescribed-record generator inputs, catalog labels, analytical campaign sources, and scoped tests were updated. Stable legacy filenames and `specId` compatibility identifiers were retained where renaming would break record identity; their taxonomy fields and visible labels now carry C3 through C6.
- This is prescribed-path geometry and source-contract work only. No EOM solver was invoked, no path was evolved, and no stability, retention, binding, photon-identity, energy-closure, quantization, or physical-realization claim was made.

## 2026-07-23 — C1 and C2 Borg records completed

- Added the missing canonical C1 and C2 prescribed-display representatives to the generator, Borg catalog, and all-candidate registry. Each representative contains twelve strictly ordered coaxial architrino worldlines with six explicit neutral-binary counterpart pairs, equal axial spacing, and a central transverse-radius envelope. C1 uses one common circulation sense; C2 uses opposite senses on two declared index subsets. The subsets are storage groupings and do not satisfy the three-common-midpoint constraint of B1 components.
- Regenerated the 21-record prescribed-display catalog, including synchronized C3 through C6 taxonomy metadata. C1 through C6 remain pending candidate-specific display inspection in the sign-off ledger. The prior 19-candidate analytical database is historical and incomplete for the live catalog; no analytical campaign or EOM solver was run.

## 2026-07-23 — B1.4 retired to deprecated axial-limit control

- Retired `B1.4` from the active taxonomy, Borg catalog, all-candidate analytical registry, future compact-sweep cohorts, and comparative rankings. The active B1 eligibility condition is $\sum_a\rho_a^2>0$, equivalently nonzero total squared transverse internal speed at the declared common frequency.
- Preserved the exact all-axial B1 boundary equations and left the `illustrative-full-cap-axial-spindle-boundary-v0` specification, generated Borg record, stable identifiers, historical campaign files, receipts, hashes, and SQLite rows unchanged. Historical dashboard rows remain inspectable as a deprecated control but are not part of active comparisons.
- This is taxonomy and analysis-cohort governance. It invokes no EOM solver and establishes no retention, stability, binding, energy closure, or physical realization.

## 2026-07-24 — Family-C causal-delay angular-mode diagnostic completed

- The active $c_f=1$ prescribed cohort showed $\ell=1$ dominance in $615$ of $641$ evaluated draws, with $17$ $\ell=2$ and $9$ $\ell=3$ exceptions. Higher quadrature preserved all $26$ exception classifications and all $33$ C4 classifications. A leading master-equation expansion tied the Family-C $\ell=2/\ell=1$ power ratio to the trace-free signed position-acceleration moment with the predicted angular coefficient $2/5$; the measured Family-C fit factor was $0.4413$ with Spearman correlation $0.9929$. The derivation target, hashes, falsifiers, and claim boundary are recorded in [brainstorming Entry 9](brainstorming.md#entry-9--causal-delay-second-moment-controls-the-leading-family-c-angular-correction-2026-07-24-prescribed-path-campaign). No path evolution or EOM solver was invoked, and no binding, stability, energy, retention, particle-identity, or physical-realization claim follows.

## 2026-07-24 — Causal-delay angular bound and independent audit completed

- Proved separate finite-radius and first causal-delay remainder bounds, recovered the exact $2/5$ angular coefficient from sphere moments, and ran an independent $197$-case, $1{,}361{,}664$-sample Family-C audit. Every sampled inequality passed; independently computed $\ell=2/\ell=1$ ratios matched the primary study within $2.06\times10^{-12}$. The active speed range makes the conservative uniform remainder too large to certify individual ratios, so the relationship remains measured prescribed-path structure. No eligible EOM-evolved Family-C branch exists; the survival test cannot run without violating the evolution-first campaign and evidence gates. See [the proof and evidence packet](evidence/2026-07-24-causal-delay-angular-bound.md).

## 2026-07-24 — Evolved Family-C same-row consumer construction validated

- Added a fail-closed EOM-record consumer that evaluates $\mathbf U$, $\mathbf S$, the exact far pattern, and finite enclosing-sphere degree powers from the same authoritative piecewise-cubic time row. It retains raw causal-root ledgers, runs primary/refined quadrature, requires direct neutral twelve-worldline evolved records in the strict sub-field domain, and pools only a Cartesian-complete cohort with at least three prehistories and two refinements plus hash-bound collapse, clearance, refinement, and oracle artifacts.
- A separately derived constant-velocity far-pattern case fixes the degree-$1$ and degree-$2$ powers analytically; the consumer matched them within relative errors $10^{-11}$ and $10^{-9}$. Focused assembly-record and evolved-consumer validation passed $14/14$. This validates construction only: the instrument is not accepted for campaign use in the same change, no qualified Family-C input exists, and no evolved relationship or physics result is booked. See [the consumer validation packet](evidence/2026-07-24-evolved-family-c-us-consumer-validation.md).

## 2026-07-24 — A1.3/C5 V1 calibration campaign closed as insufficient

- Closed the receipt-bound V1 artifact without changing its sealed protocol, gates, denominators, stop rules, or output bytes. The `693`-draw population retained all `674` evaluated rows and `19` null-score rows across `45` distinct campaign files. Among `673` jointly evaluated compact-versus-full-protocol rows, `673` were both-reject and zero were full passes, leaving both conditional confusion denominators undefined. Claim grade: measured diagnostic result plus a sufficiency conclusion derived from the predeclared rules.
- Completed all `66` A1.3/C5 resolution-ladder rows: `5` invalidated, `33` root-resolution unresolved, and `28` surface-resolution unresolved. The result does not authorize a gate change and establishes no stability, retention, binding, energy closure, particle identity, catalog acceptance, or physical realization.
- Promoted the next burden, not the result, to the live queue: separately predeclare and independently adjudicate all `172` retained queue rows with complete raw evidence and a purge-aware rebuild manifest. A compact-screen V2 remains conditional and must use a new, predeclared population with full-pass support rather than modifying V1 after observing its all-reject population. Identity hashes, measurements, falsifiers, and the handoff contract are recorded in the [V1 closeout](evidence/2026-07-24-a1-3-c5-resolution-calibration-v1-closeout.md).

## 2026-07-24 — Braid Program charter and N-ladder ratified

- The operator ratified the Braid Program charter, evolution-first N-ladder, and method. The separately ratified instrument gate remains unchanged. This closes the governance dependency and authorizes Campaign 1 production under its frozen workload; it books no dynamical or physics result.

## 2026-07-24 — Two-architrino breathing diagnostic completed

- Rebuilt the EOM solver and ran source-identified Campaign 1 slices at $d=1$, $s=0.25$. Head-on R0/R1/R2 traces remained strictly inward and halted fail-closed on root completeness at progressively smaller separations; no head-on reversal was certified.
- The transverse R1 trace completed one inward-to-outward reversal between $t=1.7175$ and $t=1.7200$, with sampled minimum separation $0.77577103$, and remained outward through a completed $t=1.9$ run. Consecutive EOM solver rebuilds reproduced the same bracket and minimum while certification changes were arriving in the live checkout.
- Booked the result as diagnostic only. It is half of a possible breath, not repeated breathing or retained binding: the trace lacks a second reversal, R2 transverse confirmation, three-prehistory collapse, a post-$H$ claim window, residual ledgers, and independent-oracle parity, and the live EOM source continued changing after each tested build. See [the diagnostic packet](evidence/2026-07-24-campaign-1-two-architrino-breathing-diagnostic.md).

## 2026-07-24 — Current-solver Breather return-map diagnostic completed

- Rebuilt the current EOM solver, passed all five compiled fixtures and all 75 independent Python oracle tests, and revalidated all 243 Campaign 1 construction rows without invoking evolution in the construction check.
- The transverse $d=1$, $s=0.25$ R1/R2 rows agree on one minimum near $t=1.719$ and $r=0.775771$, but no later maximum occurs through the R2 checkpoint at $t=2.4$. R2 ends with $r=0.946307$ and $\dot r=+0.500683$; its sampled midpoint remains fixed. With only one minimum, period, amplitude, and return-map drift are undefined.
- R0 and R1 halt on `root_completeness_not_certified`; all three R0 endpoint-matched prehistories halt at $t=1.55$ while moving inward. The $s=0.50$ sensitivity row separates from release and halts at $t=1.025$ without recapture. No accepted energy account exists for this run.
- A fresh read-only reducer and three independent synthetic tests now enforce the minimum-maximum-minimum diagnostic return definition. The run also exposed that resumed harness manifests reset cumulative chunk and wall-time counters, so G3/G4 remain unaccepted and no campaign fate is booked. See [the current-solver return-map packet](evidence/2026-07-24-current-solver-two-architrino-breather-return-map.md).

## 2026-07-24 — Stationary-rest Breather diagnostic completed

- Replaced the moving transverse setup as the Breather baseline with the
  operator-requested release: opposite polarities at
  $\mathbf X_\pm(0)=(\pm0.5,0,0)$, both velocities exactly zero, and an exactly
  stationary retained prehistory on $[-20,0]$ with $c_f=1$.
- The EOM solver and independent Python oracle agree on the certified inward
  release acceleration:
  $A_{r,\mathrm{rel}}(0)\in[-0.572457220610732,-0.572457220610621]$.
  R0/R1/R2 remain exactly centered and collinear but halt on cross-root
  `numeric_precision_limit_exhausted` before crossing. R2 retains motion through
  $T=1.54625$, at $r=0.152080$ and individual speed $0.870314c_f$.
- No crossing, rebound, outer turn, recapture, or minimum-maximum-minimum
  excursion is certified; the return-map trend is unresolved. R0 histories
  with stationary horizons $H=10$, $20$, and $40$ produce byte-identical frame
  and release-acceleration streams.
- G3 remains unaccepted and no campaign fate, energy account, retention,
  stability, binding, or physical-realization claim is booked. See the
  [predeclared protocol](campaigns/stationary-binary-breather-diagnostic.md) and
  [diagnostic packet](evidence/2026-07-24-stationary-rest-two-architrino-breather-diagnostic.md).

## 2026-07-26 — Attractor-search packet distributed

- Moved the undirected ensemble rationale, seed and campaign design,
  observables, persistence criteria, and promotion rules into
  [undirected-ensemble-search.md](undirected-ensemble-search.md).
- EOM now retains the reusable profiler and checkpoint-chunked harness state in
  its [attractor-search instrument packet](../app-solver/campaigns/attractor-search-instrument.md)
  and [work log](../app-solver/campaigns/attractor-search-work-log.md).
- Deleted the redundant `eom-attractor-search` directory. No gate, evidence
  status, campaign rank, or physical claim changed.

## 2026-07-27 — Sealed B1/Family-C diagnostic landed in the live record

- Transported the byte-identical write-once packet for the 2026-07-25
  prescribed-path campaign: 576 draws produced zero qualified handoffs or
  descents, with three rows retained as fail-closed unresolved. The packet
  preserves the protocol, receipt, hashes, dispositions, and diagnostic-only
  boundary; it makes no stability, retention, binding, or physical-realization
  claim. See the [diagnostic evidence](evidence/2026-07-25-bc-monte-carlo-basin-diagnostic.md).
- Current B/C handoff: diagnose the retained score landscape under
  [BP-008](work-queue.md#bp-008--bc-score-landscape-diagnosis). Do not relax
  the handoff thresholds or rerun the Monte Carlo campaign.

## 2026-07-27 — Stationary-rest joint root frontier certified

- Added a validation-only compiled fixture that evolves the exact stationary
  R0 seed to $T=1.2399999999999993$, retains the accepted endpoint-corrector
  joint histories in-process, and replays only the exact step to
  $T=1.2449999999999992$.
- Both cross-pair roots certified complete at the unchanged $10^{-5}$
  root-time tolerance in one 128-bit directed-MPFR attempt. The fixture changes
  no Campaign 1, checkpoint, solver, tolerance, G3/G4, or fate-booking path.
- All 6 compiled fixtures and all 23 separately authored Python
  root-certification tests passed. See the
  [bounded certification packet](evidence/2026-07-27-stationary-rest-joint-frontier-certification.md).

## 2026-07-27 — Corrected G3/G4 instrument gates reaccepted

- A prior implementation-only commit repaired cumulative resume accounting,
  bound the checkpoint to its manifest and request, retained certified
  release-root status across resume, and restored public checkpoint segment
  dumping. This later evidence-only change independently inspected the
  committed instrument without modifying it.
- Fresh release and sanitizer builds each passed all 6 compiled fixtures.
  Interrupted and uninterrupted two-chunk runs produced byte-identical final
  checkpoints, frame streams, evolved records, and replay records. Cumulative
  chunk, accepted-step, rejected-step, frame, resume-count, and wall-time
  accounting advanced correctly; exact checkpoint-to-record tokens matched;
  both manifests recorded `releaseRootClearance: certified_complete`; and a
  mismatched run identity failed closed.
- G3 and G4 are accepted for bounded campaign execution. The result establishes
  instrument determinism, accounting, serialization identity, and
  release-ledger propagation only. It does not satisfy G5, close the
  close-approach root blocker, or book a fate. See the
  [G3/G4 reacceptance packet](../app-solver/evidence/attractor-resume-g3-g4-reacceptance-2026-07-27.md).

## 2026-07-27 — Stationary joint frontier extended; next gate failed closed

- A validation-fixture implementation commit converted the one-step stationary
  joint-history replay into a consecutive atomic-step certificate and a pinned
  next-step probe. A later evidence-only pass rebuilt and inspected the
  committed fixture without changing its tolerances or solver path.
- Both cross roots certify through `1.3649999999999967`: 25 accepted steps of
  width `0.005` from the retained-history start, including 24 new steps beyond
  the prior endpoint. At the new endpoint each row has one 128-bit root and a
  certified root-free complement.
- The next step to `1.3699999999999966` rejects atomically. Both rows exhaust
  the unchanged 512-bit ceiling with
  `interior_root_not_surrounded/joint_root_history_missing`. All 6 compiled
  fixtures and all 23 independent Python root-contract tests passed.
- This is an unresolved capability row, not candidate failure. The required
  root gate did not pass, so Campaign 1 evolution and fate classification did
  not start. See the
  [frontier-extension packet](evidence/2026-07-27-stationary-rest-joint-frontier-extension.md).
## 2026-07-27 — B/C retained landscape diagnosed; new searches remain frozen

- Closed BP-008 at documentary diagnostic grade without rerunning or changing
  the sealed 576-case campaign. The retained landscape contains 159 applicable
  member scores, 414 inapplicable rows, and three fail-closed unknown rows.
  B1.1 sample 5 is the isolated lowest retained row at peak
  `59.29861867019956`, still `9.883103111699926` times the unchanged handoff
  ceiling. See the
  [retained diagnosis](evidence/2026-07-27-bc-score-landscape-diagnosis.md).
- Coordinator review found that the 377-row local-landscape prose design lacks
  a frozen machine manifest, exact protocol hash, write-once runner, and
  separately bound dense-root audit. BP-009 now owns a score-free manifest and
  instrument freeze; the first later analytical action is a separately
  reviewed center-only capability pilot.
- Declared a downstream 27-row
  [rational multi-frequency slice](b1-1-rational-multifrequency-chart-slice-predeclaration.md)
  with exact harmonic tuples, least-return periods, fastest-orbit time
  resolution, root-completeness gates, null-score dispositions, and a 12-row
  held-out audit. It remains blocked until the local geometry anchor is
  dense-admitted and its own machine manifest is frozen. No EOM solver, path
  evolution, analytical search, threshold relaxation, or physical claim was
  made.

## 2026-07-27 — BP-009 score-free manifest and instrument freeze completed

- Reconstructed sealed B1.1 sample 5 from the canonical source with the
  original score-free sampler, seed, and ordinal. Its sampled-spec and
  exact-source SHA-256 identities match the retained declaration without
  reading or recomputing its score.
- Froze exactly 377 unique materialized rows: one center, 48 axial, 264
  pairwise, and 64 independently seeded held-out Latin-hypercube rows. The
  held-out rows retain all 1,536 full pre-conversion SHA-256 counter tokens.
- Bound the $c_f=1$ complete-cycle protocol, 377 create-exclusive output paths,
  unchanged handoff thresholds, root-completeness gates, null-score
  dispositions, implementation hashes, and separately authored dense-root
  residual contract. Focused validation passed 6/6.
- The write-once receipt records zero causal-root evaluations, zero scores, and
  no campaign output paths created. BP-009 now awaits operator verification;
  the center-only pilot and every search remain separately unauthorized. See
  the [freeze packet](evidence/2026-07-27-b1-1-score-landscape-manifest-freeze.md).
