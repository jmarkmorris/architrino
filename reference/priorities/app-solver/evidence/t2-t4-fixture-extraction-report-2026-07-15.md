# T2–T4 Fixture Extraction Report — 2026-07-15

**Role:** fixture extractor (blind-authorship firewall; sole role permitted to open `scripts/braid-ideal/**`).
**Deliverable:** [t2-t4-fixture-data-2026-07-15.json](t2-t4-fixture-data-2026-07-15.json) — constants-and-definitions packet for the Tiers 2–4 T1 cross-verification.

## Attestation

From `scripts/braid-ideal/**` I copied **configuration constants and conventions only**: numeric literals (grids, sample counts, regulators, tolerances, gate thresholds, geometry exports, anchor constants), charge/polarity assignments, phase/ordering/sense/sign conventions, and unit conventions. **No root-finding, force-evaluation, integration, averaging-implementation, or acceptance logic was copied, paraphrased, or described** in the packet. Where a needed item exists only as runtime computation or algorithm structure, the packet carries an explicit `NOT_EXTRACTABLE_AS_CONSTANT` or `UNRESOLVED` entry with a file reference instead of a description. Every owning definition in the packet is quoted **verbatim from spec/evidence markdown** (never from code), each with file path + section citation. Every decimal token was copied exactly as written in its source (string form), never reformatted or recomputed. No git command was run; no legacy braid workstream script was executed; no existing file was modified.

## Files read

Owning markdown (definitions and recorded values):

- Retired priority-document paths are intentionally omitted; this historical extraction report is non-authorizing.

- `content/markdown/aaa/noether-braid/spindle-braid.md` (read-only; fixed-point section)
- `content/markdown/aaa/dynamics/master-equation.md` (per-hit law, W^rec, conventions; located via search — the path is `dynamics/`, not `foundations/`)
- `content/markdown/aaa/foundations/architrino.md` (ε = |e|/6 convention)
- `reference/priorities/app-solver/claims-triage-ledger-2026-07-12.md` and `evidence/t1-cross-verification-2026-07-15.md` (grep-level cross-checks of recorded tokens only)

Code, constants-only (firewalled):

- `scripts/braid-ideal/moving-phase-matched-stacked-rings-fixture.mjs` + runner `moving-phase-matched-stacked-rings-braid.mjs`
- `scripts/braid-ideal/planar-assembled-free-particle-fixture.mjs` + runner `planar-assembled-free-particle.mjs`
- `scripts/braid-ideal/contra-rotating-pro-anti-pair-fixture.mjs` + runner `contra-rotating-pro-anti-pair-instrument.mjs`
- `scripts/braid-ideal/contra-rotating-pro-anti-cross-coupling-fixture.mjs` + runner `contra-rotating-pro-anti-cross-coupling.mjs`
- `scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs` (SELF_EQUILIBRATED_V5 export; honestNetSelfTorque/braidNetZTorque declared parameter constants; railPinnedEquilibrium λ/frozen-κ constant conventions)
- `scripts/braid-ideal/spindle-braid-screw-drift-evaluator.mjs` (booking-gauge constants: cf=1, RM=1, layer/site/polarity conventions, CHAMPION literal)
- `scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs` (declared anchors/gates: kappaCertificate 0.4615, ReqOverKappa 3.494, railPumpM 0.227, pumpDeclared 0.2274, stratum grid, tolerances)

## What was copied as constants (summary)

- **§96:** full fixture literal block (ω=0.8, c_f=1, grids, cycleSamples=3 for the recorded row, derivative/rate sample counts, delayWindow 8, scanSubdivisions 192, soft 0.02, all gate tolerances); site/phase/z/drift conventions (antipodal ± binary per ring, long-branch π offset, mean-centered stack, +z drift); selected-row geometry and all recorded tokens from the spec (κ⋆=4.52636941, R vector, ‖R‖₂=0.07759147, ε_bind=0.04922985 / 0.0492298548241, τ_z=+13.37621958).
- **§99:** full fixture literal block (baseRings with hard-coded phases 1.345498903589793/0/2.191779057179586, all pairFactors, gates incl. 0.03 bind, samplingLadder [3,6,12,24], coarseCycleSamples=1, anchor R=0.75/d=1.4); the deterministic pairIndex→factor stride convention; braid-construction conventions (ordinal polarity assignment, senses, pocket geometry, whole-braid relative phase); electron column-payload constants (base z [0.08, 0.2, 0.34], scale 0.8, six −ε sites, charge = units/6 in e); required-acceleration/fit-membership convention (all dynamic sites, all components; sea proxy excluded); recorded tokens (0.9922225625 at 24 samples, 0.09446654050233466, 0.9916649426542679, 6.3558550×10⁻⁵, 0.9999927135, 0.9999997624, ladder rows, 0.9999005117).
- **§82:** SELF_EQUILIBRATED_V5 export verbatim constants (qI 0.55, qO 0.75, α's −27.15/16.24/64.5°, θ's −16.2/339.5°, ReqOverKappa 3.494); booking-gauge construction constants (RM=1, θ_M=2π/3, 2 antipodal sites/layer, polarity=sgn, rail-pin ω convention with §94's decimal tokens 0.9600986791/1.041559604); averaging/regulator constants (Nt=24 reference, NtList/softList, dmax 2.5, rootTol 1e-8, scanN 700, jacobianFloor 1e-3); torque sign convention; tokens +0.424, +0.4229, +0.4240300292341333 (spec) vs 0.42403002923413363 (fixture literal — the two differ in trailing digits; both recorded exactly).
- **§60/§58 rail pump:** declared constants railPumpM 0.227 and pumpDeclared 0.2274 (confirmation-run literals); units convention (per-site tangential force row at fitted κ* vs §61 torque units; constants in the relation: 2 sites, lever ρ_M = cos α_M, R_M=1); κ-gauge and Row-8 stratum/threshold literals; tokens 0.227/0.2274/0.22736/+0.423.
- **§92/§93:** both fixtures verbatim (targets 0.42403002923413363 / 0.19885688497216406 / 2.41245971901678, ansatz blocks, locking scan, separation/phase grids, cycleSamples 4, derivative steps 0.025/0.02, Newton steps 0.015, delayWindow 7, scanSubdivisions 384, collisionFloor 0.05); V5-copy confirmation and pair sign conventions (pro at −Δz/2 with sense +1, anti at +Δz/2 with phase offset and sitewise conjugation); all §93 recorded tokens (Δz=1.419842173795055, Δφ=3.8435815410366416, ±1.27754×10⁻⁴, −5.42047×10⁻⁴, −3.64×10⁻¹⁶, 0.3288, saddle/pencil rows, 5.304228260638436 control token).
- **Tier 4:** §58 corrections + Results 2/3, §60 gauge-invariant sentence, spindle-braid.md derived-size sentence (all verbatim); frozen-κ/λ constant conventions; anchors 0.4615, 3.494, radialSpectrum [−0.63, −2.0, −6.27], tauI/tauO 0.0006/0.0004, closure 0.425, maxEquilibriumResidual 5e-5; tokens 3.4937, 0.28623, 0.4615, 0.2349, 3.49.
- **Global:** per-hit law + W^rec + σ_ij + κ-absorption verbatim from `dynamics/master-equation.md`; ε and |e|=6ε verbatim from `foundations/architrino.md`; c_f=1 convention quotes; shared 0.03/0.02 gates.

## UNRESOLVED / NOT_EXTRACTABLE_AS_CONSTANT register

1. **UNRESOLVED-1** — §99 best-coarse photon row identity (pairIndex, hence occupancy/scales/phase/pocket/pattern/ordering/sea/drift): a runtime search selection recorded nowhere in markdown or fixture literals. The packet carries the deterministic stride mapping so every candidate configuration is reconstructable; under it, occupancy (3,2,3) occurs exactly for photon pairIndex 5–9.
2. **UNRESOLVED-2** — §99 electron rest-row pairIndex (0–3): same reason; the spec pins the payload (scale-0.8 static column) and the recorded values; all four candidate pair configurations are enumerated in the packet.
3. **UNRESOLVED-3** — whether the §99 photon sampling-ladder configuration is at rest (u=0): the ladder replays the best-coarse row at its own drift, which the spec does not state.
4. **NOT_EXTRACTABLE_AS_CONSTANT-1** — decimal value of the fitted κ* used for the §82 +0.424 booking and §92/§93 scaling (runtime least-squares fit; no literal; markdown gauge-orbit anchors 0.4615/0.2349/κ_eq=0.28623 recorded).
5. **NOT_EXTRACTABLE_AS_CONSTANT-2** — a single stored conversion constant between the +0.227 force-units pump booking and the +0.423 torque-units booking (separate instruments; the participating constants — 2 sites/layer, lever ρ_M = cos α_M = 0.9600986791, R_M = 1 — are recorded).
6. **NOT_EXTRACTABLE_AS_CONSTANT-3** — the radial-equilibrium-residual evaluation beyond its declared gate constant (5e-5) and recorded value (~4×10⁻⁶).

## Discrepancy flags (recorded, not adjudicated)

- The §92 spec text books the single-braid pump as **+0.4240300292341333** (16 significant digits) while the §92 fixture literal `singlePumpTarget` is **0.42403002923413363** (17 digits, differing tail). Both tokens are stored exactly with their citations.
- The §96 spec's gate sentence literally reads `$kappa_\star>0$` and `$epsilon_{\rm bind}\le 0.03$` (missing backslashes in the source); quoted verbatim with a transcription note.
- The master-equation chapter lives at `content/markdown/aaa/dynamics/master-equation.md` (the task brief guessed `foundations/`).

## Addendum — 2026-07-15b supplementary extraction (§99 row-identity blockers)

**Deliverable:** top-level key `supplementary_extraction_2026_07_15b` appended to [t2-t4-fixture-data-2026-07-15.json](t2-t4-fixture-data-2026-07-15.json). No existing key was altered.

**Files read for this pass (constants-only, firewalled):**

- `scripts/braid-ideal/planar-assembled-free-particle.mjs` (runner)
- `scripts/braid-ideal/planar-assembled-free-particle-fixture.mjs` (fixture)
- `scripts/braid-ideal/moving-phase-matched-stacked-rings-braid.mjs` + `moving-phase-matched-stacked-rings-fixture.mjs` (§96 cross-check)
- `tests/braid-ideal-planar-assembled-free-particle.test.js` (constant tokens only)

**What was copied:**

1. **Proxy-sea construction (target 1)** — fully constant-expressible; no `NOT_EXTRACTABLE` marker needed. Sea-on rows are selected by pairIndex parity (stride-1 pick over the two-row sea table: odd pairIndex = sea on). The enabled setting materializes as exactly three sites `sea:0..2` on one equatorial circle: center `[0,0,0]`, radius = spacing `2.2`, phases `π/12 + 2πk/3`, rotating at ω = cadence `0.7` (positive sense), co-drifting with the assembly, always untilted (no tilt argument passed). Polarities `(+1,−1,+1)`, `chargeUnits = 0`, `strength = density 0.12`, `dynamic = false`. Scope conventions: sources only — they force every dynamic site (scaled by strength product) but never receive, and are excluded from the κ⋆ fit, residuals, pump booking, and charge ledger. Site-list ordering: pro, anti, payload, sea.
2. **Soft-regulator placement (target 2)** — declared convention in both §99 and §96 bookings: per-hit weight `= (strengths ×) polarity_rec·polarity_src · (D_T·D_s)/(D_s² + soft²) / r²` along the delayed source-point→receiver-point unit vector, with `D_T = receiverNormalNumerator`, `D_s = sourceNormalDenominator`, `soft = 0.02`. Regulator on the signed D_s branch factor only; r² unregularized; roots with r ≤ `1e-8` skipped (hard floor); `collisionFloor 0.04` is a separate gate, not part of the weight.
3. **Recorded-row identity anchors (target 3)** — owner test holds **no** best-row pairIndex/drift/κ⋆/ε_bind literals (its only identity-adjacent constants: continuation drift lists, coverage counts 60/320, tilt-replay `cycleSamples === 12`, decision string). Runner/fixture constants: default `drift: 0` config literal (always overridden), `samplingLadder [3,6,12,24]`, tilt replay at `samplingLadder.at(-2) = 12`, coarse rows at `coarseCycleSamples = 1`, objective penalty constants 100/100. Replay-drift convention resolved: no drift parameter or rest-reset flag exists anywhere on the replay path, so the ladder and tilt replays run **at the best row's own coarse-search drift** (parent UNRESOLVED-3 resolved at convention level; the drift value itself remains runtime-only). Spec-recorded identity tokens copied exactly (photon best κ⋆ `0.09446654050233466`, ε_bind `0.9916649426542679`, full ladder table; electron best = scale-0.8 static column at `u/c_f = 0.25`, ε_bind `0.9999997624`; electron rest κ⋆ `6.3558550×10⁻⁵`, ε_bind `0.9999927135`; planarity tokens). Best-row **pairIndex** (photon and electron) and the **photon best drift** remain `NOT_EXTRACTABLE_AS_CONSTANT` (runtime argmin; no literal in runner, fixture, test, or spec).
4. **§96 self-root scope (cross-check)** — partner-wake-only by enumeration scope: the booking's receiver/source loop skips the diagonal (`if (i === j) continue`); no flag constant exists. §99 uses the same convention (`if (src.id === recId) continue`). Contrast constant recorded: the canonical-photon search books helical self-hits; §96/§99 do not.

**Attestation:** same firewall as the parent extraction. Only configuration constants and geometry/ordering/sign/scope conventions were copied; the root-finding, force-evaluation, integration/averaging, and search/acceptance implementations were not copied, paraphrased, or described beyond their declared constant conventions. Decimal tokens copied exactly as written. No git command run; no script executed; JSON validity of the amended packet verified by parse only.
