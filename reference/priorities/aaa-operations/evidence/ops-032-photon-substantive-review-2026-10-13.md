# OPS-032 — Photon substantive asset review, October 13, 2026

This is the rotating older workstream in the first monthly priority-assets review. The complete current app manuscript, three contracts and substrate-mapping analysis were reviewed against their declared diagnostic scope, then decisive admission and bookkeeping claims were traced into selected implementation and fixture bodies. Two related implementation findings remain proposed: uncertified status defaults to admission, and a null factor is mislabeled as a singular measurement. No substantive source or shared control was edited. Prior OPS-028 app-photon completion is reused; this bounded later pass does not recertify that whole directory or activate deferred scientific work.

## Scope, identities and instruments

The complete 232-line [app manuscript](../../app-photon/manuscript.md), [app tracker](../../app-photon/priorities.md), [queue](../../app-photon/work-queue.md), [brainstorming](../../app-photon/brainstorming.md), [log](../../app-photon/work-log.md), all three `contracts/*.md`, 135-line `analysis/substrate-mapping-refinement.md`, and 84-line July code-review receipt were read with native `cat`/`sed`. Initially clipped combined output was not credited; the manuscript was recovered in separate ranges 1–90, 90–200 and 200–232. Source-coverage material was inspected for the original numeric repair, source obligations, historical-review disposition and final qualification, rather than independently repeating its entire reverse audit. The fidelity review's scope, algebra and exact repair closure were inspected as historical evidence.

Implementation scope is **selected bodies**, not full-module review: `PhotonFormulaRuntime.js` lines 634–647, 1094–1315, 2080–2135 and 2610–2735; `PrescribedPathAnalysis.mjs` lines 795–965; `PrescribedOrbitCausalRoots.mjs` causal-factor producer lines 62–89 and same-transmitter dispatch lines 653–710. Fixture scope is `tests/photon-runtime.test.js` admission case lines 875–925 and root-age case lines 725–785, plus `tests/prescribed-absolute-history-facade.test.js` lines 1–180. These tests were read, not executed as a suite. The complete 119-line compact historical sweep JSON was read; its raw case payload was not read, regenerated or certified. The current Photon research prescribed-geometry analysis was read in full to verify the app/research boundary and primitive-speed comparison.

The source identities below were recorded with native `shasum -a 256`; byte copies are retained under `.tmp/ops-032-photon-oct13/snapshot/` and `sources.sha256`. All nineteen hashes matched again by `shasum -a 256 -c` after the bounded reproduction. The reproduction uses only the public app diagnostic function with a declared stub adapter, never a new history sweep or EOM evolution. No browser/app execution, performance measurement, general solver acceptance, external literature verification, generator write or Git mutation occurred. Reviewer: Codex delegated OPS-032 Photon worker; exact model build/settings were not exposed. No materially different model was adopted or model-superiority claim made; no model-evaluation exemption or completed calibration is inferred.

## Proposed findings

### OPS032-PHO13-01 — Medium: missing certification defaults to a regular self-hit

The PHO-004 contract's admitted condition requires an above-floor transmitter factor **and causal-factor status zero**, while missing or otherwise uncertified evidence fails closed. The app classifier at `src/apps/photon/PhotonFormulaRuntime.js:1094–1103` converts the status with `Number()` and substitutes zero whenever it is absent or nonfinite. A null status also becomes zero by coercion. The above-floor branch consequently becomes `admitted_regular_root` at lines 1147–1151 without an explicit successful certification record.

This is a demonstrated **adapter-boundary robustness defect**, measured by `node .tmp/ops-032-photon-oct13/check-admission.mjs`. The scratch checker first ran independently stipulated controls: factor 1/status 0 must admit twelve declared roots, and factor 1/status 25 must reject all twelve as `transversality_not_certified`. Both passed and printed the known-case pass before any defect case ran. Then the same public `computePhotonSelfHitDiagnosticsWithPrescribedPathAnalysis` path with the declared `solveMovingCircularSameTransmitterRoots` adapter, `skipSpanSelfHitDiagnostics: true`, and factor 1/jacobian 1 admitted all twelve rows when status was omitted, null or NaN. Exact inputs and assertion order are retained in the script; output is `check-admission.out`. JSON serialization writes NaN as null, so the script, not that output field alone, records the distinct nonfinite input.

The normal built-in `PrescribedOrbitCausalRoots.mjs` producer supplies an explicit status through `causalFactorFields`; this review does **not** establish that its ordinary geometry produces malformed rows. The adapter is an accepted public diagnostic route also exercised by the maintained fixtures. Classification affects the self-hit regular counts and their consumers; this reproduction does not establish observer-field admission bypass, physical retention, current browser behavior or scientific phase locking. The generalized facade separately rejects a nonfinite status before its root admission and does not share the app's missing-status default.

Smallest justified repair proposal: require presence and finite numeric evidence for the certification status before recognizing success, and reject absent/null/nonfinite status as `transversality_not_certified`; preserve explicitly successful and failed statuses and the contract's singular/floor precedence. Add a bounded assertion for this distinction to the existing admission fixture only under an accepted implementation scope. Route to the **app-photon software owner**, not PHO-009 physical research. The finding is overturned if the preserved inputs produce rejection on these exact source bytes, or an authoritative accepted contract explicitly permits implicit certification on this adapter route. No such permissive condition appears in the inspected PHO-004 acceptance table.

### OPS032-PHO13-02 — Low: a null factor is recorded as a measured singular root

The same classifier tests `Number(root.transmitterFactor)` before the fallback Jacobian. Explicit null therefore becomes factor zero instead of absent evidence. The known-case-first reproduction supplied `transmitterFactor: null`, `jacobian: 1`, status 0 and observed twelve rejected `singular_root` rows, each reporting `transmitterFactor: 0` and signed margin -0.0001. Rejection is safe, but its reason and recorded factor manufacture a singular measurement from a missing value. This is a reason-map/provenance discrepancy against PHO-004's missing-factor `transversality_not_certified` condition, not an admission bypass.

Smallest proposal: distinguish absent/null factor evidence before coercion, make any Jacobian fallback explicit under the existing producer contract, and preserve the distinction between uncertified data and measured zero. Resolve this alongside the preceding classifier repair rather than start a separate campaign. The finding is overturned by a contract establishing that explicit null is an intentional measured zero or by the exact preserved input reporting an uncertified/missing factor instead. Attribution to a particular editor or repair is unresolved: this pass did not inspect the causal source-history transition.

## Valid no-change dispositions and previous checks

The manuscript consistently separates prescribed paths, finite retained sums, display/root admission, sampled algebra, fits, and physical acceptance. Its stationary reference is the longitudinal vector `(1/4,0,0)`, not a nonzero transverse photon. Its coefficient closure is linear only under shared samples/projection, and amplitudes do not add before phase cancellation. Paper derivation from the retained formulas gives these conclusions without treating parity of the implementation with itself as a scientific oracle. No manuscript correction is proposed. A passage promoting any of those diagnostics to retained dynamics, or an algebraic counterexample under the stated shared projection, overturns this disposition.

Two accepted-repair rechecks and one earlier no-change check were performed at claim scope:

1. **September PHO-005 transmitter weighting repair survives in the explanatory assets:** differentiating `R-c_sig(t-tau)` gives emission-time derivative `D_t` and receiver derivative `-D_r`, hence signed playback `D_r/D_t`; a source-time delta collapse supplies the distinct positive weight `c_sig/|D_t|`. The live tracker, refinement analysis and manuscript retain that distinction. This is a paper check of those formulas, not a fresh physical-field certificate or full code audit. A restored playback multiplier in their acceleration expression would overturn it.
2. **September manuscript provenance typography repair survives:** native `rg` finds `3,860,250 bytes` in source-coverage line 28, and the independently read compact receipt has `rawArtifact.byteCount: 3860250`. The recorded historical before-text `3,860, 250` and repair-only disposition remain in the fidelity record; numeric agreement and preserved meaning survive. This does not establish that the raw payload presently exists or hashes to that recorded value.
3. **Earlier PHO-003 no-change root-age interpretation survives:** the contract and manuscript preserve ages through one cycle as fresh, above one through two as aging, and above two as stale; bounded scan misses remain distinct. The live `createPhotonDeltaXDiagnostic` body emits its declared authority, offsets and thresholds, and the maintained fixture explicitly expects ages 0.8/1.5/2.5. This is contract/fixture inspection, not a new boundary-test run or continuous completeness proof. A threshold, label or mode-authority disagreement in these inspected assets would overturn it.

The local-speed task PHO-002 remains dependency-blocked even though its queue lifecycle is `In progress`; no independent Noether sea constitutive input was found in the inspected app scope. PHO-007/008 retain their conditional/deferred architecture scope. PHO-009 has one scientific execution owner under Master-Equation Closure and is still conditional on a retained free branch/environment inputs. These are existing scientific obligations, not newly discovered corrections or permission to resume research. The current Photon research analysis explicitly identifies signal-speed settings unequal to primitive wake speed as diagnostic scenarios; historical sweep counts remain historical and not all unmodified-Master-Equation evidence.

## Handoff and remaining cursor

This older-workstream monthly selection is complete at the scope above. The other two monthly selections and overall monthly closeout belong to the coordinator; next substantive three-workstream review is **November 13, 2026**. Weekly control review remains **October 18**. Its unchanged app-photon rotation can reuse this pass's exact tracker/queue identities and recorded control scope if those inputs remain unchanged; reuse does not claim a new full-directory review. Joint coverage/cadence evaluation remains December 12. CRW-005 remains closed.

Owner follow-up: retain the two proposed classifier findings in the existing app-photon execution owner, obtain bounded implementation disposition, then separately verify known certified/uncertified, absent/null/nonfinite and singular/floor cases. No substantive repair is accepted by this review alone. Remaining uninspected scope includes full current app orchestration, search/import/UI lifecycle, nonselected numerical code bodies, raw historical sweep rows, current browser behavior and production EOM histories. July defects outside the explicitly checked claim scope are neither reopened nor declared resolved. Review duration and operator burden were not measured; no prevalence, model-superiority, cost or whole-directory correctness claim follows.

## Exact reviewed source hashes

```text
54ae6edb05574bde51b15d2b37c376b58d0fd551e443b958f9b5e35282bdd1a3  reference/priorities/app-photon/manuscript.md
9a1b348b3e4f3e0bd17e27b782bd081fc0720beb1fdb5bca6db1aaf1bda30f69  reference/priorities/app-photon/priorities.md
d66497954c2761887721b6f1a189469920ad8d7b76bb76f8a284c75ae2713570  reference/priorities/app-photon/work-queue.md
a7a82c3da357ed68da2e8ac8ef50f37b4725a290e7d84d94b838b8f2ab9e14ed  reference/priorities/app-photon/brainstorming.md
210dd6e387825435752da8f374751f6b65f6403ade82e66569291f171e0daf76  reference/priorities/app-photon/work-log.md
6728b1a4f2d9676e0562d0f8cb668afb4caad76253416c2315c541d9bf325b09  reference/priorities/app-photon/contracts/absolute-source-history-self-hit-admission.md
a575c810f0f10b021c51ee77a906431b618e52e260ad9dbb2bdf0674538156a9  reference/priorities/app-photon/contracts/moving-apparatus-delta-x-mapping.md
b34831e0c898d10604ffb686ecc2c08b9a0243ef17ec1c780769fb7ef83cc982  reference/priorities/app-photon/contracts/reusable-absolute-history-facade.md
7d832995cbe1a025a775e06ca76748077ac6de8b55f0c4ffb5ae34bfb167acd2  reference/priorities/app-photon/analysis/manuscript-fidelity-review.md
0d99c09824ca9119599a94658eb07869ccf4b57389ed1208c3f34d3634da8e3d  reference/priorities/app-photon/analysis/manuscript-source-coverage.md
92b360a16861b005bafc2b2756319603c76682df22cb61c321e2c25b86c2c7d5  reference/priorities/app-photon/analysis/substrate-mapping-refinement.md
f22a37293e13024f7489ec10fddd68437b7c7fdfb137ee80c0d38020ed81f392  reference/priorities/app-photon/evidence/photon-code-review-2026-07-24.md
26faaf0836eeaf0885c56748cc4db4c78b254eebd0d7aa381c2909665afe8d04  src/apps/photon/PhotonFormulaRuntime.js
a4731234188d64c555b75dba02b14af8af75f2fafe266ef53371b9fe735ad076  src/prescribed-path-analysis/PrescribedPathAnalysis.mjs
cbf381e623b58cbd151a418c2a45d545f03f0bfe6d46d5a3ac8b4b0dcb765510  src/prescribed-path-analysis/PrescribedOrbitCausalRoots.mjs
f00862d509bb783891c761d197faee458673f42d8685253846072f9b6524fd7f  tests/photon-runtime.test.js
a36dc65479f6d008b88e5c04d22206b8b47aff45822c5a112119b4f7d71c78f9  tests/prescribed-absolute-history-facade.test.js
49b6cc244cbe93059d28144cf8da33815324c92c3566185bd8c6048a1db8cb70  reference/priorities/master-equation-closure/photon-research/analysis/prescribed-moving-pair-and-self-hit-geometry.md
0d6e65b5b59f2eaba5359ee9408b3bb595b74d3887502ad4dfa9564ef3ee7f12  reference/priorities/master-equation-closure/photon-research/evidence/helical-self-hit-phase-lock-sweep.receipt.v1.json

```

## Subsequent disposition — October 14, 2026

The operator approved the bounded repair proposed here. Implementation and separate verification are complete in the [combined closure](ops-031-032-approved-repairs-2026-10-14.md). The original observations and source identities above remain historical evidence.
