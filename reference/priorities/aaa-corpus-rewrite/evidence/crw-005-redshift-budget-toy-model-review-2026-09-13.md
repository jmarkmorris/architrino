# CRW-005 Redshift-Budget Toy Model Review — 2026-09-13

## Scope and disposition

Completed bounded full-document review and repair of [Redshift-Budget Toy Model](../../../../content/markdown/aaa/validation/simulations/redshift-budget-toy-model.md). Only this chapter and receipt were written. Runtime, mock, neighboring corpus, shared records, generated artifacts and Git/index remain unmodified by this assignment. Editorial completion does not resolve the runtime’s canonical launch and cadence-routing discrepancies.

Baseline clean by `git --no-optional-locks status --short -- <chapter>`. Baseline SHA-256: `c43bfd6fcda72c248e4e580209044b53889b10fa84618f59de9279229eaf89d7`. Final SHA-256: `cf998a7b4a91a2284b0749957b8857f4c6679a02a91c0380222afe6575868113`.

Inspected runtime `scripts/cosmology/redshift-budget-toy-model.mjs`: `040a3af89df163f9293d54d6538b5138cbac4d5d5baa460dc4feb41b41b5ff68`. Inspected mock `scripts/cosmology/redshift-budget-mock.json`: `6a250709d64d6d4fd9552825ef4127a55b031e79371fc5240031a2a5bfd7481e`.

## Authority and independent references

Applied live review/integrator requirements under AGENTS, router and previously read mathematical/editorial canon. Read the entire chapter, runtime and mock. [Expansion Mechanism](../../../../content/markdown/aaa/cosmology/expansion-mechanism.md), lines 385–462, owns absolute-record launch and the separate moving-endpoint product; lines 1423–1446 distinguish bolometric flux/reciprocity; lines 1609 onward define timed path segmentation. [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), lines 850–984, defines inverse-length path derivatives, source-balanced time rates, cadence projection, coefficient units and exact gradient degeneracy. The recently reviewed Dark Energy transport/calibration restrictions were retained.

Verified primary authored comparison [Hogg, Distance Measures in Cosmology, section 7, equations 19–20](https://ned.ipac.caltech.edu/level5/Hogg/Hogg7.html), lines 2–15, for bolometric luminosity distance and redshift/area conventions. Thermal spectral redistribution is supported by the separately verified primary [Dolgov et al. calculation](https://arxiv.org/abs/astro-ph/0010412), abstract lines 15–16; it is not modeled as a universal single-line shift. Standard relativity, photon energy and reciprocity enter only as effective recovery comparisons. No empirical redshift data were analyzed.

## Findings and dispositions

| ID | Severity | Evidence, repair and boundary |
| --- | --- | --- |
| RB-01 | High | Runtime algebra was treated as verification of physical factorization. Declared positive calibrated factors, quadrature scope and independent endpoint/path calibration; exact log reconstruction does not identify physical contributions. |
| RB-02 | High | Legacy square-root launch disagrees with the live owner’s absolute-record factor. Preserved the display and mock numbers explicitly as legacy runtime provenance; added canonical D_v=(c0-v_R,k)/(c0-v_E,k) and the endpoint-product recovery target. Moving cadence plus a square-root launch can double-count time dilation. Implementation repair is external scope. |
| RB-03 | Medium | Ordinary velocity subtraction was used inside an exact-looking relativistic factor. Restricted its agreement with canonical launch to first speed order and identified the composed collinear relative velocity for the square-root comparison. General transverse kinematics requires the observer/photon contraction. |
| RB-04 | High | Flux/time-dilation targets lacked transparency, number conservation, clock and area calibration assumptions. Added those conditions and separated packet cadence from carrier frequency. Thermal SZ generally requires a spectral transfer operator. |
| RB-05 | High | Continuity inputs mixed path derivatives and material time rates without coefficient units or cadence projection. Declared inverse-length terms, time/length response coefficients, stress coefficient units, positive support and floor, general source/remainder projection obligations. The toy scalar is a reduced supplied record, not the full kinetic owner. |
| RB-06 | High | Scalar alpha, named, continuity and dark-energy terms can double-count one contribution; endpoint/path gradient rows are not separately identifiable. Added nonoverlap requirement, named-key overwrite behavior and exact gradient endpoint degeneracy. Fixed shape coefficient is conditional on the homogeneous Lorentz remainder assumptions. |
| RB-07 | High | Distinct cadence continuity/dark-energy inputs can be ignored by an early fallback. Documented the precise branch and that an empty cadence named-term object changes routing. Also noted frequency scalar alpha may be omitted when computed cadence transport exists. Zero residual is not independent cadence recovery. |
| RB-08 | High | Proposed exchange field is entirely unread. Marked it as proposed, including absent shift integration and energy audit, preserving the already labeled four unimplemented output diagnostics. |
| RB-09 | Medium | Beam, chromaticity and distance defaults can fabricate agreement or distort slope. Documented missing beams returning zero variance, missing comparison returning null, repeated last beam entries, full-coefficient beam interpretation, explicit distance overriding segment sum and average-slope versus local derivative. |
| RB-10 | Medium | Failure table inferred causes from residual magnitude. Replaced loss/fitted-source/calibration-cause assertions with violations of declared consistency and separate diagnostic obligations. No runtime threshold gate exists; supplied coefficient products and copied defaults remain mock arithmetic. |

Seven High and three Medium findings. All editorial dispositions supported; no valid display body or legacy fixture number changed.

## Independent mathematical and runtime checks

A logarithm helper first passed log(e)=1, then checked additive log composition for two frequency ratios 1.1. A Doppler comparison helper first passed zero speed giving unity; the independent velocity-composition example with dimensionless endpoint velocities beta_E=0.5 and beta_R=0.6 gives relative beta 1/7, exact square-root factor approximately 0.8660254037844387, versus 0.9045340337332909 from ordinary difference 0.1. These are observer-level arithmetic examples with normalized primitive wake speed c_f=1; they do not set the channel calibration by derivation.

The stronger canonical separation is symbolic: for fixed emitter and receiver beta b, a recovered moving cadence Gamma_R=1/sqrt(1-b²) gives Gamma_R(1-b)=sqrt((1-b)/(1+b)). Replacing the absolute launch 1-b by the legacy square root gives 1/(1+b), unequal for nonzero b. This exact identity independently proves the double-counting issue. For constant path row, the fundamental theorem of calculus makes its gradient integral the endpoint difference; adding the same shared coefficient shift to endpoint and path rows cancels in total redshift. Extra samples cannot resolve that kernel.

Default runtime replay returned six rows. Propagation Y and slope values were: laboratory 0/0; endpoint-launch 0/0; galaxy 0.02812/70.25136599133333; continuity 0.027999999999999997/69.95157353333333; dark energy 0.027882958177220436/69.65917140216762; strong-source 0.0020099999999999996/75.32285507249998. Slopes retain legacy km/s/Mpc reporting. For example, the galaxy Y is independently 40 times (0.000230+0.000235+0.000238). This is arithmetic replay, not physical validation.

After that baseline, an in-memory one-segment probe used frequency continuity C_N=1 and cadence C_N=2 with p_nu=1 and segment length one. Without cadence named terms it logged both channels as one and time-dilation residual zero. Adding `transport_terms_cadence:{}` yielded cadence two and residual one. Adding `frequency_exchange_events_by_line` left propagation unchanged. The probe used separate normalized observer-unit constants and created no files. Parent independently reproduced the same routing problem with R_coh=0.1/0.2 after a zero-budget known baseline.

## Validation and preservation

The known-case-first Markdown extractor passed two-math/fenced-false-positive, one-link and invalid-KaTeX rejection controls before target reading. Strict KaTeX rendered 114 TeX spans. All 15 display bodies, viewer identities, 16 link occurrences and headings are byte-identical to baseline. Every local file target exists. The legacy launch display is retained with explicit provenance/domain qualification. No browser or anchor-semantic check was run.

- `git diff --check HEAD -- <chapter>` passed.
- `node scripts/validate-content.mjs --check --strict` passed with 0 errors/warnings: 199 corpus Markdown and 1749 repository Markdown at the run before this receipt.
- `node scripts/check-braid-taxonomy-terminology.mjs` passed across 359 files.
- `node scripts/build-equation-mapping-corpus.mjs --check` exited one with stale `content/generated/equation-mapping/corpus-equations.json`: 199 Markdown, 4685 displays, 23 promoted equations, 30478 symbol definitions. No generated write occurred. Deferred command: `node scripts/build-equation-mapping-corpus.mjs --write`, under explicit regeneration/publication authority. No exclusive attribution of shared drift is made.

Final two-file syntax/whitespace and final chapter hash were checked after the coordinator’s failure-cause and conditional-shape clarifications. Scoped checks do not establish repository health or theory closure.

## Remaining obligations

- RB-O1 — Runtime owner: align launch extraction with canonical absolute-record D_v and separate moving-endpoint cadence without altering historical fixture evidence; fix cadence routing, implement or reject exchange fields explicitly, validate distance/beam correspondence, and distinguish skipped/defaulted channels from measured agreement. Add independent controls for those obligations.
- RB-O2 — Noether Sea/clock owner: independently derive common coefficient rows, cadence-weighted source projection, unit conversion and error budgets; remove endpoint/path degeneracy by independent clock calibration and preserve nonoverlapping transport channels.
- RB-O3 — Observer/photon owner: derive energy exchange, packet cadence, transparent propagation and distance reciprocity before promoting a cosmological redshift replacement. Image variance needs angular/ray information. Propagate corrected runtime limitations to neighboring summaries where needed; none were edited here.

No blocker remains to bounded editorial integration. Coordinator owns shared-record disposition; worker stops after this chapter and receipt.
