# EPR–Bell manuscript independent fidelity review

## Verdict and reviewed freeze

Qualified acceptance: no required fidelity repair was found by fresh complete reading of the seven original lane bodies, the 393-line manuscript and the 130-line coverage record, followed by source-to-manuscript and manuscript-to-source comparison. This accepts the manuscript as an assumption-scoped explanatory synthesis. It does not accept a positive Bell mechanism, construct an assembly measure or detector kernel, verify a primary theorem or experiment, reactivate the dormant lane, or authorize promotion or publication.

The reviewed [manuscript](../manuscript.md) SHA-256 is `e5a1b4f2b35637f0318b103c4ea715551fad77a8cc8f184a60feebb8d62b5b54`; the reviewed [coverage record](manuscript-source-coverage.md) SHA-256 is `6d7e8b3e521e1fe266aa4c07f475fcc692ba18c62285ec307e311193e6c00955`. Native `shasum -a 256` matched both announced freezes, and `shasum -a 256 -c .tmp/priority-manuscript/epr-bell/baseline.sha256` passed all seven originals before report creation. Any changed candidate digest reopens the corresponding review scope.

The reviewer had exclusive authority over this report and `.tmp/priority-manuscript/epr-bell-review/`. No original, candidate, coverage, code, scientific record, queue, Braid extraction or Amplituhedron report was edited. The coordinator received the actionable no-repair finding before this report was frozen.

## Fresh reading provenance

Native `wc -lc` measured the original seven files at 1,122 lines and 103,779 bytes. Every body below was freshly read using numbered, untruncated output. An earlier combined output was clipped and earned no reading credit; the complete subsequent ranges below replace it. Writer reading receipts were read as claims in the coverage record, not borrowed as this reviewer's source coverage.

| Original | Lines / bytes | Fresh untruncated ranges |
| --- | ---: | --- |
| [Priorities](../priorities.md) | 78 / 7,332 | 1–78 |
| [Work queue](../work-queue.md) | 97 / 12,200 | 1–97 |
| [Work log](../work-log.md) | 59 / 9,116 | 1–59 |
| [Brainstorming](../brainstorming.md) | 214 / 12,569 | 1–110; 111–214 |
| [2022 Bell-foundations packet](../tim-maudlin-bell-foundations-2022-video-source-mining.md) | 219 / 23,472 | 1–110; 111–219 |
| [2026 EPR lecture packet](../tim-maudlin-epr-bell-video-source-mining.md) | 239 / 19,107 | 1–120; 121–239 |
| [SEP packet](../stanford-encyclopedia-bell-theorem-source-mining.md) | 216 / 19,983 | 1–110; 111–216 |

The manuscript was then read in ranges 1–105, 106–215, 216–320 and 321–393. Coverage was read in ranges 1–70 and 71–130. Full original reading preceded candidate reading.

## Source-to-manuscript audit

| Source sections and exact lines | Manuscript destination | Independent disposition |
| --- | --- | --- |
| Brainstorming 11–76; priorities 15–17, 68–70; queue 18–24; 2026 packet 58–92, 118–144; 2022 packet 51–95 | §§1.2–1.3, 2.1–2.4 | Trial tuples, four counts, CHSH, factorization, common preparation measure, passive-record negative, one-particle versus two-wing predecision, and conservation versus response are retained. The negative remains conditional on local response, MI and valid trials. No metaphysical realism, free-will or deterministic premise is added. |
| Brainstorming 78–108; 2026 packet 94–116, 146–188; SEP 44–82, 122–136, 156–164 | §§2.2, 4.1–4.3 | PI and OI are distinguished and jointly imply factorization; MI changes the averaging measure and need not change factorization at fixed state. Deterministic completeness forces OI. No-signaling and control/access remain separate. The supported-event limit on information diagnostics is explicit. |
| Brainstorming 110–136; SEP 84–96; queue 68–73; work log 21–25, 35–39 | §§3.1–3.3 | Full angular joint law, local marginals and common-record recovery are preserved. The log's symmetry/anticorrelation shorthand is correctly qualified by an explicit counterexample. Spin and the source's selected polarization convention remain distinct. Neither one CHSH quadruple nor matched-axis anticorrelation is promoted to full recovery. |
| Brainstorming 138–170; 2022 packet 97–135; SEP 98–120; queue 26–45 | §§4.3, 5.1–5.3 | All route alternatives and ontology costs remain visible. Detector inclusion, local apparatus variables, trial mapping and independently testable signatures survive the synthesis. The Holt–Pipkin/Clauser account is explicitly attributed and possible, not a freshly established cause of modern violations. |
| Brainstorming 172–196; priorities 71–73; queue 33–38, 61–66; SEP 112–136 | §§6.1–6.3 | Preferred frame, setting availability, outcome closure, directional reach, actual fallback, speed-identification burden and Bancal premise limits are preserved. Added latency and setting-specific mixture equations expose assumptions rather than assert a channel. Photon dispersion remains a separate constitutive obligation. |
| Brainstorming 198–204; SEP 138–154; 2022 packet 117–135; queue 54–59 | §§7.1–7.2 | A physical joint law, support, native measure and independent discriminator remain unconstructed. Determinism or chaos alone does not prove the relevant statistical relation. Finite positive window normalization is only conditional bookkeeping. Stellar/quasar controls are not claimed to eliminate every measurement-dependent model. |
| 2026 packet 13–54, 190–239; 2022 packet 13–49, 137–219; SEP 13–42, 166–216 | §§1.2, 5.3, 8.1–8.3; coverage source dispositions | Source authority, historical provenance, retained insights, discarded rhetoric, PBR preparation independence, measurement triad, Bohmian comparison, geometry/time boundaries and deferred branches are retained at their source scope. Detailed timestamps, capture paths, bibliography and gate-routing tables remain discoverable supporting originals. They need not be reproduced as reader prose. |
| Priorities 13–49, 64–78; queue all eight objects and cross-lane table 75–85; work log 7–59 | §§1.1, 3.3, 4.3, 8.3; coverage 99–112 | No route decision or scientific acceptance is invented. Later August 7 dormancy governs earlier discussion-scoped history. Detector/source/correlation ownership remains external. Queue IDs and lifecycle history remain in coverage/originals rather than being turned into scientific manuscript results. |

The coverage record accounts for all seven original bodies and all eight blocked objects. Its retained-support classifications are consistent with the actual originals; no material scientific obligation was found silently dropped. In particular, numerical experiment results described as having existed in an earlier audit are absent from the seven current originals. The manuscript appropriately retains categories and historical descriptions without reconstructing unseen values. The current corpus contradiction is reported as historical debt, not independently established current corpus state.

## Manuscript-to-source audit and elementary checks

The following are direct mathematical consistency checks by the reviewer, not scientific executions, primary-source verification, or the writer's parser/render results.

1. **CHSH and stochastic extension, manuscript 37–122.** Each deterministic bracket has one zero and one magnitude-two term. For real local expectations in `[-1,1]`, the identity `|u+v|+|u-v|=2 max(|u|,|v|)` proves the displayed stochastic bound. A common normalized measure is explicitly required. The local-seed dilation is qualified to preserve stipulated MI; it does not license arbitrary enlargement by setting-determining history. Manuscript 78 directly handles that enlargement risk. The nonzero empirical denominator and finite-sample statistical-null distinction correctly sharpen the original exposition.

2. **Singlet table and conventions, manuscript 128–166.** For `d = x̂·ŷ` in `[-1,1]`, the four weights `(1-ab d)/4` are nonnegative and sum to one; summing either outcome gives `1/2`, while the product sum gives `-d`. For the displayed coplanar axes, the dot products are three `1/√2` and one `-1/√2`, so the chosen CHSH signs give `-2√2`. The text calls this one target check, not a proof of the universal Tsirelson bound. SEP 94 supplies the selected positive doubled-angle polarization convention; state and outcome-label changes are expressly allowed.

3. **Isotropic negative control, manuscript 150–164.** The disagreement region of two hemispheric sign tests consists of two spherical lunes with total area `4θ` on the unit sphere, hence probability `θ/π`. Bob's reversed sign gives `-1+2θ/π`. This has isotropy, unbiased marginals and equal-axis anticorrelation while differing from `-cos θ` away from special angles. It is a valid elementary counterexample to work-log 39's insufficient inference. Its explicitly comparison-level status avoids importing it as assembly dynamics or silently rewriting historical source bytes.

4. **Conditional structure, manuscript 189–247.** OI times the two PI identities produces the factorized law on the declared support. At a complete deterministic state the joint and marginal laws are point masses, so OI follows even if the response depends on the remote setting. MI is a distinct relation involving the preparation measure. The manuscript avoids the SEP packet 80 shorthand suggesting that MI failure itself is a way to violate conditional factorization. The information equations quantify a specified supported joint law; zero conditional information gives almost-sure independence there, not an unrestricted statement about untested settings or a causal theorem.

5. **Selection and reach, manuscript 253–321.** Both detector selection and reach partition require supported conditional laws. The setting-specific mixture is the law of total probability. Linearity gives the displayed weighted CHSH sum; common `r` permits its scalar reduction. Even a valid local fallback need not saturate two, and conditioning can remove the premises that would justify its bound. For a local marginal of the mixture, the remote-setting variation can be `(r_xy-r_xy′)(p₁(a|x)-p₀(a|x))`; this confirms the manuscript's warning that setting-dependent weights can introduce signaling despite individually no-signaling component laws. The timing inequality is a necessary reach condition under its declared path/latency model, not sufficient evidence of coordination.

6. **Pushforward and finite measure, manuscript 170–183, 351–365.** Indicator integration gives a joint table only after maps, preparation/window measure and selection are supplied. Local notation is expressly generalized for live coordination. If the measurable window has finite positive native measure, its normalized restriction has total mass one. Neither formula constructs a physical support, invariant/native measure, analyzer response or Bell-violating mechanism. Coverage 35 and 57 correctly identify the pushforward as new schematic exposition rather than the unseen historical formula.

7. **Bancal and adjacent external results, manuscript 325–329, 373–391.** These sections match the local source descriptions and retain their premise and authority limits. The manuscript expressly does not reproduce or verify Bancal's primary inequality. PBR is scoped by preparation independence and retained predictions; source-time experimental summaries, effective quantum structure and interpretive views are not presented as new substrate derivations. Fidelity is accepted at this local-source level only.

The explanatory additions above are supported by elementary reasoning or are openly schematic. No unsupported positive physical result was found in the reverse audit. The main possible overclaims identified in the assignment are already corrected or bounded in this freeze; no author repair request is outstanding.

## Validation independence and explicit limits

The writer reports known-case-first math/link helpers, 68 manuscript expressions, four manuscript and eight coverage local links, full KaTeX rendering, whitespace checks and one complete seven-expression §3.1 real-browser screenshot. These are writer/coordinator receipts read in coverage 114–130. This reviewer did not rerun those instruments, inspect their code, open their HTML or screenshot, repeat browser inspection, or claim independent syntax/render/link validation. Their passes do not establish mathematical or physical truth.

This review freshly read exactly the seven local originals and two author bodies. It did not open external videos, captions, metadata, temporary SEP HTML, EPR/Bohr/Bell/CHSH/PBR/Bancal papers, experimental papers, the former detailed numerical audit, current corpus destinations, Quantum Closure owners, shared mapping context, source histories, detector kernels, code or raw scientific payloads. Original labels saying “inspected” or “derived from primary source” remain historical provenance of earlier mining passes. Their current accessibility, byte identity and external scientific accuracy were not checked. No fresh literature search or scientific run was performed.

Source-to-synthesis fidelity, direct elementary consistency and original-byte preservation are the conclusions this review can support. A contrary source passage, a flaw in one of the elementary checks, a candidate hash change, or a failed baseline check would overturn the corresponding acceptance. Positive physical recovery remains open under the original scientific owners and their declared evidence requirements.
