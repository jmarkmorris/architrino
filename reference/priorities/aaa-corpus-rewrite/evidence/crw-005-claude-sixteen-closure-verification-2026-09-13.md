# CRW-005: supplementary verification of sixteen Claude-reviewed chapters

## Subsequent acceptance

The operator accepted the proposed bounded repair pass with `do 1` after receiving this report. The findings and reviewed hashes below remain the pre-repair verification record. The accepted repairs are now implemented and independently verified in [Final sixteen-chapter integration](#final-sixteen-chapter-integration). The original review-stage findings and completion statement below are retained as historical evidence.

## Scope and method

The operator requested a separate verification of each of sixteen chapters and its September 13 repair receipt. This report records review findings, not accepted or implemented corrections. The original receipts and historical campaign completion remain historical records; this supplementary review supplies additional evidence about their completion claims. No corpus chapter, original receipt, shared campaign record, runtime implementation, or generated artifact was edited by this verification.

Three reviewers worked in parallel, with separate sequential assignments for each document because the agent tool rejected an additional worker with `agent thread limit reached`. These reviewers did not author the Claude repairs. They read each complete chapter and receipt, checked the numbered repairs, inspected relevant live owners and sources, and tested reasoning against separate algebraic arguments and counterexamples. A different reviewer is not itself an independent mathematical reference. The coordinator inspected the principal disputed passages and adjudicated the findings below. Correctly recorded open scientific derivations are not counted as failed editorial repairs.

Current-source SHA-256 checks matched all sixteen original receipts. The coordinator's hash instrument passed the known SHA-256 `abc` case before inspecting targets. Reviewers independently repeated source hashes. This verifies the reviewed bytes, not their correctness. Source changes after these hashes require a scoped recheck.

Fresh coordinator validation: `node scripts/validate-content.mjs --check --strict` passed with 391 scenes, 199 corpus Markdown files, 1827 repository Markdown files, zero errors, zero warnings and 30 notes. `node scripts/validate-equation-mapping-links.mjs` passed for its 23 registered links; it is not an exhaustive viewer-link check. `git diff --check HEAD -- content/markdown/aaa/validation reference/priorities/aaa-corpus-rewrite` passed before report creation. These structural checks do not detect the mathematical counterexamples below. No solver run, rendered-site audit, publication or regeneration was performed.

## Per-document verification

Line references below address the recorded source hashes. `Partial` means the cited original repair is incomplete; additional findings can concern passages outside those original IDs. Recommendations remain review proposals.

### 1. Reaction-Cosmology Provenance Ledger

[Chapter](../../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md); [original receipt](crw-005-reaction-cosmology-provenance-ledger-review-2026-09-13.md). SHA-256: `7736b7574777a648e2b924cc9621bf3c8d45eb67807e49da7aa3e3716f64b2db`.

Verdict: further corrections needed. RCL-01, 03, 05, 06, 08, 09 and 10 resolved; RCL-02, 04 and 07 partial.

- Medium, line 182: opposite signs of neutrino and antineutrino matter potentials do not imply opposite changes in their transition probabilities. In the two-flavor, constant-density, maximal-mixing comparison, both splitting and mixing amplitude depend on the square of the matter parameter, so sign reversal gives identical probabilities. State the opposite potential signs and possible matter-induced asymmetry. The reviewer inspected the [PDG neutrino review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-neutrino-mixing.pdf), equations 14.58–14.61.
- Medium, line 310: the two reduced path accounts do not explicitly include the target internal energy required by the full exchange residual. Equivalence requires the reduced-account sum to equal target, medium, recoil and remnant changes, with disjoint definitions. A target excitation changes the full residual while leaving the stated reduced accounts unchanged. Supply the mapping or restrict the reduced budget to the case where the omitted account vanishes.
- Low, line 121: compare center-of-momentum energy with twice electron rest energy; the present wording compares invariant mass with energy. Define the energy-squared convention for the invariant locally.

The corrected same-clock thermalization, dimensionless tolerance, baryon/photon epoch and energy-sign arguments hold. Kernel derivation and physical provenance closure remain open at their original scopes.

### 2. Constraint Ledger

[Chapter](../../../../content/markdown/aaa/validation/constraint-ledger.md); [receipt](crw-005-constraint-ledger-review-2026-09-13.md). SHA-256: `77194af05a92f030ca96fa79ac29ebfb7f396a8e53e5ed76ac496fa386ad0721`.

Verdict: further corrections needed. CL-03, 13 and 16 partial; the other thirteen original IDs resolved.

- High, line 20: the standalone ruler-residual rejection contradicts the same sentence's combined-observable qualification. For a cavity, frequency is proportional to two-way signal speed divided by length; equal fractional variations cancel. Apply the bound to the calibrated observable combination, not independently to ruler deformation.
- Medium, lines 15 and 20: a clock bound of one part in ten to the sixteenth does not imply a bound of one part in ten to the seventeenth. Keep clock and resonator instruments, domains and tolerances separate. The original receipt already leaves clock-source calibration open.
- Medium, line 64: declaring any accumulated dispersion a failure contradicts line 60's tolerance-based gate. A nonzero predicted delay matching the observed-minus-source delay has zero residual. Reject disagreement outside the declared tolerance or failure of an explicitly required nondispersive branch.
- Medium, lines 9 and 60–142: the new vocabulary grades every `Constraint` as measured although several entries are proposed acceptance requirements. Preserve the distinction in the row definitions.
- Medium, line 154: a covariance need not be invertible. The two-by-two matrix with every entry equal to one is singular. Carry the positive-definite readout-space or supported-subspace qualification already present in Massive-Superposition Gravity line 64.

The full weak-field delay factor, asymmetric gravitational-wave interval, dimensional formulas and cited clock-height scales were checked at effective comparison grade. Baseline inspection establishes that the standalone ruler rejection and numerical clock inference predate these repairs; this report does not attribute all defects to Claude.

### 3. Failure Criteria

[Chapter](../../../../content/markdown/aaa/validation/failure-criteria.md); [receipt](crw-005-failure-criteria-review-2026-09-13.md). SHA-256: `5ea66f96d8103717c080f4c033740d933a55736db6289668f8c1a67a40fdcb2d`.

Verdict: further corrections needed. FC-01, 02, 07, 09, 10 and 11 resolved; FC-03, 04, 05 and 08 partial. FC-06's set argument holds under the ordinary finite nonnegative tolerance assumption, which should be explicit.

- High, lines 116 and 175–217: the logarithmic upper-bound residual accepts nonnegative scalar observables, but consumers include vectors, signed quantities and lower mass exclusions. Directly dividing mass by a lower exclusion bound reverses acceptance. Define calibrated scalar statistics/componentwise comparisons, and map search exclusions to their actual acceptance region.
- High, lines 186–202: equal group speeds do not exclude phase birefringence. Dispersion relations consisting of a common linear frequency term plus opposite constant wavenumber offsets have equal group speeds but accumulate a nonzero relative phase. Label the present diagnostic differential group delay and require the separately mapped phase/polarization comparison where claimed.
- Medium, line 331: nonzero ledger entries are not balance failures. Entries 10, -6 and -4 balance exactly. Require defined provenance and small required balance residuals, rather than zero individual entries.
- Medium, lines 337 and 346: use the actual observable's calibrated domain and tolerance instead of extending the resonator threshold to every experiment or atomic transition.
- Medium, line 345: unconditional rejection of dissipative drag exceeds the bounded orbital and ideal-periodic-branch requirements in Constraint Ledger. Line 340 already distinguishes missing conserving response; the specific remaining problem is the broader unconditional line 345.
- Minor precision: state finite nonnegative sector tolerances and call an unspecified-base logarithm a logarithmic excess rather than a number of decimal orders of magnitude.

Separate set-inclusion, nonnegative-sum and rate/lifetime arguments support the resolved items. The reviewer independently checked the two PDG proton-decay limits and rendered 277 mathematical spans under strict KaTeX. Uninstantiated sector sets and physical records remain open scientific work.

### 4. No-Go Theorems

[Chapter](../../../../content/markdown/aaa/validation/no-go-theorems.md); [receipt](crw-005-no-go-theorems-review-2026-09-13.md). SHA-256: `151936037ffbb99cfcd636a037f3cb35daf8a0906aab135e7ecd243561118529`.

Verdict: further corrections needed. NGT-03 and 09 partial; the other seven IDs resolved.

- High, line 60: arbitrary charge-conjugate partial reaction-rate differences are not zero-centered CPT tests. CP-violating partial-rate differences can coexist with CPT conservation. Use a specified CPT observable, such as a particle/antiparticle total-width comparison, or route the partial-channel asymmetry to its CP prediction. The reviewer inspected the [PDG CP-violation review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-cp-violation.pdf).
- High, line 147: negative perturbation energy does not identify a kinetic ghost. A quadratic Hamiltonian with positive kinetic term and negative quadratic potential has negative energy directions and a tachyonic instability, without a negative kinetic norm. Specify the reference configuration, normalized perturbation domain and energy screen; distinguish the kinetic ghost test.
- Medium, line 45: the applicability classifier omits combinations of `absent` and `replaced` assumptions. A missing assumption with a protected benchmark does not fit either declared non-direct branch. Cover all nonaccepted statuses, then distinguish protected replacement obligations from irrelevant comparisons.

The Bell, GHZ, Hardy, parity, preparation-independence and Leggett-Garg arguments hold at their declared scopes. The reviewer inspected the original Weinberg–Witten theorem statements and the named Bancal and PBR source records. Baseline comparison confirms that the new CPT definition and ghost interpretation make these particular problems explicit; this is not a blanket author attribution.

### 5. Known Tensions

[Chapter](../../../../content/markdown/aaa/validation/known-tensions.md); [receipt](crw-005-known-tensions-review-2026-09-13.md). SHA-256: `00d480533a6ee61239ef245b92ef2fa614c5257834b8827d1278f5eb8faf0a55`.

Verdict: further corrections needed. KT-05 partial; the other nine original IDs resolved, with one additional claim-status finding.

- High, line 35: saying Quarks closes structure exceeds that owner's explicit candidate inventory/representation scope. Quarks supplies no retained branch, stability or response calculation. State which catalog arithmetic is complete and preserve physical structure as open. The assertion also appears in the pre-repair baseline.
- Medium, line 96: the measurement-time symbol denotes first trigger in Measurement Ontology, not interchangeable trigger, coherence-loss and completed-record durations. Use a separately named comparison lifetime, or preserve the owner's fixed trigger meaning.

The entropy-conjugacy units, baryon-conservation caveat, shared-state requirement and proton-decay attribution hold. The effective quantum-gravity coefficient is source-specific comparison material, not a substrate premise. Full source verification of the proposed atom-count example was not completed; no defect is inferred from that retrieval limit.

### 6. Massive-Superposition Gravity

[Chapter](../../../../content/markdown/aaa/validation/massive-superposition-gravity.md); [receipt](crw-005-massive-superposition-gravity-review-2026-09-13.md). SHA-256: `7326080e6864e76b0de010bb0bcb7d2d391d391173c363c8de381c99b48db431`.

Verdict: further corrections needed. MSG-02, 03, 05, 06 and 09 resolved; MSG-01, 04, 07, 08 and 10 partial.

- High, lines 264–278: a leading-order tidal estimate is presented as an exact upper bound. For radial point sources separated symmetrically by a finite distance, the exact difference has denominator equal to the square of distance squared minus one quarter separation squared; it is strictly larger than the displayed linearized estimate. Use an approximation with controlled error or a bound based on minimum source distance. Inverting an upper bound gives a necessary reachability scale, not a sufficient detection threshold.
- Medium, line 233: the covariance sum includes calibration noise but its cross-covariance qualification omits that component. Two perfectly correlated unit-variance contributions have total variance four, not two. Include all cross terms or declare the independence/absorption convention.
- Medium, lines 28 and 225: distinguish a driven/reduced threshold from crossing an invariant autonomous basin boundary, as Measurement Ontology already does.
- Medium, lines 237–246: the status rows overlap and the text still says one of four despite the added indeterminate case. The mediated-entangling predicate also permits zero predicted and observed concurrence. Define precedence or nonexclusive flags and require a positive calibrated entanglement witness for an entanglement label.
- Medium, lines 197, 242 and 345–367: a generic witness is not automatically a numerical concurrence lower bound; a one-sided lower-bound test alone does not reproduce measured correlations. Keep information-to-visibility calibration explicit wherever the distinguishability threshold is used to reject an interference-preserving run.
- Medium, lines 96–115: the response integral beginning at the run origin needs an initial-response/prehistory condition, or a statement that earlier branch-dependent response cancels or is included in the initial state.

The rounded numerical scale and ideal pure-state concurrence identity were independently reproduced; strict KaTeX passed for 149 spans. This does not establish the missing constitutive, noise or entanglement mechanism.

### 7. Architrino Simulation Tests

[Chapter](../../../../content/markdown/aaa/validation/simulations/architrino.md); [receipt](crw-005-architrino-simulation-tests-review-2026-09-13.md). SHA-256: `0e32ed45c0a2f04ca41786b454305ec98a31d674b1e513912429292f46e3cfe7`.

Verdict: further corrections needed. SIM-02 and 04 partial; SIM-01, 03, 05 and 06 resolved.

- Medium, line 19: conservation evidence requires the action/update agreement and small correction terms specified by the linked Action-Increment Protocol, in addition to evolving the Master Equation. A small balance after subtracting a large mismatch is only a diagnostic. Carry those owner conditions into the claim about conserved totals.
- Medium, line 14: arrival-profile center and width depend on the chosen kernel and any emission-boundary truncation. A shifted approximate identity converges to the same sharp surface while having a finite-width center offset. Specify the centered-kernel convention and boundary regime, or test its actual bias. The stationary-control formulas in surrounding bullets should be explicitly confined to that control; the introductory paragraph already supports that reading.

Stationary arrival, strict zero-self-root and sub-field-speed ordering arguments hold. The chapter remains a specification; no implementing solver test was certified. The README now resolves the prior title-alignment obligation.

### 8. Convergence Tests

[Chapter](../../../../content/markdown/aaa/validation/simulations/convergence-tests.md); [receipt](crw-005-convergence-tests-review-2026-09-13.md). SHA-256: `d3002bdf2e499ea3779ee4dbc6d05f60add85e66077cf1b26371d376e4197f76`.

Verdict: further corrections needed. CT-03, 05, 06 and 07 partial; the other nine IDs resolved.

- High, line 15: continuously persisting simple roots are not discrete events with a finite count per time unless an event or emission-measure convention is supplied. Counting one root at every sampled reception doubles the apparent rate when the time step halves. Define the intended event measure or a time-averaged root multiplicity with its proper units.
- Medium, line 42: a shared bin width larger than timing error does not alone prevent false divergence. Two near-identical single samples on opposite sides of a bin boundary yield maximal binned Jensen–Shannon divergence. Use an uncertainty-aware rule, controlled smoothing or a bin-origin sensitivity check. The allowed smoothing alternative may be adequate with an actual error control; not every implementation is invalid.
- Medium, line 57: setting wake speed to one does not make position dimensionless. Declare length/time scales or dimensioned component weights before combining position and velocity in the norm.
- Medium, line 73: regulator width divided by wake speed is a nominal time scale, not the general reception traversal width. The latter involves the receiver-side derivative, as line 171 correctly states. Distinguish these scales and handle vanishing derivatives separately.
- Minor, line 146: a leverage bound at one half permits equality; it excludes more than half, not half or more.

The independent-reference boundary, joint refinement, positive-order derivation and full-rank leverage argument hold under their stated assumptions. An actual regulator/history-limit proof remains separate.

### 9. Simulation Perspective

[Chapter](../../../../content/markdown/aaa/validation/simulations/perspective.md); [receipt](crw-005-simulation-perspective-review-2026-09-13.md). SHA-256: `4ab3f3897598926af19c9b8c5538973e364197bc7d4a52f645e5b9996e1e151a`.

Verdict: further corrections needed. SP-06, 12 and 15 partial; the other twelve IDs resolved.

- High, line 118: the circular branch must supply the centripetal acceleration pointwise, not merely a mean inward/outward balance and vanishing tangential drive. State the radial residual against the required centripetal term before interpreting a radial fixed point as a physical circular scale.
- Medium, lines 63 and 194: inverse-square dilution alone does not establish local dominance. Shell population can offset geometric dilution and distant near-fold weights can dominate. Require the declared population, cancellation and transversality controls.
- Medium, line 192: curvature alone does not permit multiple roots for an everywhere sub-field-speed transmitter history; the emission-time root function is strictly monotone in that case. Multiple roots also need not share one acceleration axis.
- Medium, line 184: a stationary surrogate with fixed polarity/coupling has its distance fixed by acceleration magnitude, and its emission time follows from that distance. Distinguish that surrogate from nonidentifiability of the actual moving transmitter. The linked Master Equation repeats the loose statement, so any accepted correction needs coordinated propagation.
- Medium, lines 201–204 and 240: order effects require specified preparation, interventions and readout. Orthogonal polarizers are nonparallel yet have zero products in both orders. Operational disturbance alone is not a quantum-contextuality theorem.
- Medium, line 234: removing an interference cross term leaves the sum of the individual spatial envelopes; it need not flatten intensity.
- Minor, line 18: shell normalization is a Gauss-like comparison, not the full Gauss constraint for arbitrary delayed fields.

The explicit-time energy correction and equal-radius on-axis cancellation/acceleration arguments hold at their conditional scopes. Strict KaTeX passed for 170 spans. No physical stable branch or scale selection was established.

### 10. Simulation README

[Chapter](../../../../content/markdown/aaa/validation/simulations/README.md); [receipt](crw-005-simulation-readme-review-2026-09-13.md). SHA-256: `b0c966201b99ce22cd73e46fea0fd4d2196b5fd2a83e8770e1321702e0d68494`.

Verdict: further corrections needed. SRM-04 partial; the other four IDs resolved.

- High, line 3: refinement rungs of the same implementation are not an independent correctness reference. A common wrong kernel can persist across every rung. Separate refinement evidence from comparison with an independently derived reference, consistently with Convergence Tests.
- Medium, lines 3 and 12–16: not every indexed simulation is a Master Equation integration. The directory includes prescribed branch searches, bookkeeping replays and arithmetic fixtures. Distinguish those from direct dynamical simulations and from unimplemented protocol requirements.

The sixteen index labels match live chapter titles, and the Action Model sibling anchor resolves to its derivation index. The previously recorded Architrino Simulation Tests title discrepancy is resolved.

### 11. Simulation Run Protocols

[Chapter](../../../../content/markdown/aaa/validation/simulations/run-protocols.md); [receipt](crw-005-run-protocols-review-2026-09-13.md). SHA-256: `45272360345ede2e6d0f261e678204da376fddad9fbba44a6e96503a1a7d5888`.

Verdict: further corrections needed. RP-04, 07 and 12 partial; the other eleven IDs resolved, with an additional acceptance-vector omission.

- High, lines 93 and 112–128: dividing required convergence order by observed order allows negative observed orders to pass the maximum-at-one test. Required order 0.8 divided by observed order -1 is -0.8. Require a finite positive applicable order before forming the ratio; explicitly handle zero, undefined and inapplicable cases.
- High, lines 260–309: angular-momentum residual is required for spin/recoil claims but omitted from the normalized gravitational-wave acceptance vector. Arbitrarily bad angular-momentum balance can pass all included components. Add its conditional diagnostic or an explicit equivalent conjunction.
- High, line 279: luminosity distance divided by photon speed is not generally travel time. It is a flux-distance convention. Specify a controlled static/low-redshift approximation or derive the appropriate transport-time normalization and source-clock conversion. The reviewer used the distinct distance and lookback-time definitions in [Hogg's cosmological-distance review](https://arxiv.org/abs/astro-ph/9905116) as an effective comparison reference.
- Medium, line 58: the regularity space applies to the full position/velocity history, while the explanation describes only position regularity. Specify componentwise spaces and pointwise/event evaluation policy, consistent with the EOM contract's continuous evaluable histories; generalized histories need their own conditional protocol.

The repaired completeness ratios, joint refinement and provenance qualifications hold. No packet implementation or runtime acceptance was established.

### 12. A0 Branch Certificate Protocol

[Chapter](../../../../content/markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md); [receipt](crw-005-a0-branch-certificate-protocol-review-2026-09-13.md). SHA-256: `f96a809a93cf0b3245e06048c8e52802af0c88539ef56614f445a15d953925d5`.

Verdict: further corrections needed. ABC-01, 03 and 14 partial; the other eleven IDs resolved.

- Medium, line 118: isotropy of a second-moment tensor is weaker than isotropy of a distribution. Equal weights on the six positive/negative coordinate-axis points yield an isotropic second moment but a different fourth moment from a uniform sphere. Name the measured moment, and separate rest-shape anisotropy from deformation caused by a probe or motion.
- Medium, line 212: one global translation removes only a common member offset. Opposite constant member corrections preserve the centroid while changing their separation. Zero mean for every member is a physical restriction on the correction class, not merely center-gauge removal.
- Medium, lines 172 and 176: the returned history is required to contain no prescribed data, then described as including its initially prescribed segment. Separate the fully evolved return check from initial-history compatibility.
- Medium, line 65: odd active-root changes need not arise only at the retained-memory boundary. Coincident endpoints, exclusion thresholds and non-generic events need their own attribution. Ordinary fold parity does not establish which boundary caused an odd change.

The period ratios, member-dependent corrections, overdetermination and restricted-class no-go qualifications otherwise hold. Strict KaTeX passed for 236 spans. A physical returned branch and its full history-space stability remain separate obligations.

### 13. Synthetic Observables

[Chapter](../../../../content/markdown/aaa/validation/simulations/synthetic-observables.md); [receipt](crw-005-synthetic-observables-review-2026-09-13.md). SHA-256: `ca30bc73aeea650efbf186895ccd792f65ac873ffb0baad9aef8bf6f0750da30`.

Verdict: further corrections needed. SO-02, 07, 09, 10 and 13 partial; the other nine IDs resolved, with an additional exchange-account omission.

- High, lines 206–213: the raw second moment at finite lag includes squared drift. In a constant-drift diffusion comparison, its quotient equals diffusion plus squared drift times half the lag. Center increments where justified and bound the general finite-lag bias. A zero-drift control cannot detect this problem.
- Medium, line 62: numerical proximity to zero is not exact coincidence. A certified short positive delay can fall inside the tolerance and be excluded despite being legal. Separate certified positive, exact excluded and unresolved near-coincident cases.
- Medium, lines 86–92: the Stokes display dots a vector with a scalar coordinate differential. Use a vector line element or properly indexed components consistently; explanatory prose does not repair the typed expression.
- Medium, lines 230–242: the ram-balance expression is a head/contact speed. A bow shock at constant stand-off distance travels at the same speed as that head; shock jumps do not provide a universal head/front multiplier. State the cold, nonrelativistic ram-pressure comparison scope and track the surfaces separately.
- Medium, line 282: rejection from a failed conditional reduced-model or jet comparison must follow actual output dependencies. It need not invalidate an independently checked direct root trajectory or unrelated output.
- Medium, lines 113–130: the exchange budget omits target internal energy while defining medium only as intervening medium. Add the separate account or an explicit disjoint combined definition, with same-clock/frame conditions. This propagates the same accounting correction already accepted in RCL-01.

The channel-parity distinction, Gauss/radial identities, clock-chain rule and head ram-balance algebra hold at their stated comparison scopes. Missing constitutive and stochastic closure remains open scientific work.

### 14. A0 Tier 0 Result Interpretation

[Chapter](../../../../content/markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md); [receipt](crw-005-a0-tier0-result-interpretation-review-2026-09-13.md). SHA-256: `decccf1d32623f9229c62f44398bde4958dcbe30772c1f5152fb8811da0a4660`.

Verdict: further correction needed. ATI-01, 02, 03, 05, 06, 07 and 08 resolved; ATI-04 partial. ATI-09 requires disposition reconciliation rather than the proposed blanket renaming.

- High, line 58: the circular self-root onset is a degenerate grazing endpoint, not a generic interior fold. The delay equation's expansion at unit speed has a vanishing second derivative as well as first derivative, and zero separation. Binary Dynamics lines 197 and 201 explicitly distinguish this endpoint. Preserve the correct square-root asymptotic but require the endpoint's own treatment; a vanishing transmitter factor alone does not justify an interior-fold theorem.
- Receipt reconciliation: the owner now uses the correct period ratios, satisfying that part of ATI-09. Different role-qualified symbols are not automatically collisions merely because their base glyphs resemble each other. The coordinator does not endorse blanket renaming without an actual ambiguous identity. Preserve schema and mathematical roles.

The near-zero exclusion is explicitly a truncated diagnostic chart, not proof of physical absence; that candid policy need not be reopened. Actual returned-history, finite-search and uncomputed-versus-zero qualifications hold. The review does not establish a physical attractor or full monodromy calculation.

### 15. Bell-Family Record-Measure Harness

[Chapter](../../../../content/markdown/aaa/validation/simulations/bell-family-record-measure.md); [receipt](crw-005-bell-family-record-measure-review-2026-09-13.md). SHA-256: `6c604496d89b4eb145b9add6a38806a7d72e46f4de35cc35d96f2f2e730c9532`.

Verdict: further corrections needed. BFR-02 and 03 partial; the other six IDs resolved.

- High, lines 139–155: single-wing no-signaling checks do not establish full multipartite no-signaling. In a three-wing example, let the first and third outcomes be independent fair bits and the second equal the first XOR the third wing's setting. Every single-wing marginal is fair, but the first two wings' joint parity reveals the third setting. Require every relevant proper-subset marginal and adequate context coverage, or state the instrument's narrower scope.
- Medium, lines 171–191: runtime provenance and product-screening checks can cover only supplied contexts. A zero result does not establish whole-table coverage, and independence of a coarse provenance label does not establish independence of the full hidden state. The factor-two comparison holds only for the same variable and context family. Require coverage before the stronger inference.
- Medium, lines 49–52: parity screening applies to a proposed local deterministic representation; it is not a universal probability-consistency test for the selected nonfactorizable route. The runtime also handles threshold-interval and incomplete records. State the tested class and checked coverage, and distinguish a failed local representation from an invalid general joint distribution.
- Minor, line 137: the Hardy margin is itself an inequality test; distinguish it from the CHSH correlator average rather than saying there is no inequality average.

The reviewer inspected the actual harness implementation and ran all three documented harness routes. The built-in examples and candidate routes reproduced their arithmetic expectations; these runs establish scaffold behavior, not physical recovery or exhaustive input validation. Strict KaTeX passed for 142 spans. The generic no-signaling counterexample and local-assignment bounds were independently constructed.

### 16. Coincident-Midpoint Orthogonal-Axis Action-Increment Protocol

[Chapter](../../../../content/markdown/aaa/validation/simulations/coincident-midpoint-orthogonal-axis-action-increment-protocol.md); [receipt](crw-005-coincident-midpoint-orthogonal-axis-action-increment-protocol-review-2026-09-13.md). SHA-256: `cc41ac7013aa1af4f9fef5a6d9decfa4bd533c95fa4545bf4b38606d25503640`.

Verdict: further corrections needed. CMP-06, 11 and 12 partial; the other nine IDs resolved.

- High, line 62: even net self-root count does not certify only generic fold pairs. Two boundary exits also give an even change; one retained-memory exit gives an odd change without a coincidence birth. Require event-level certificates and declared boundary exclusions rather than inferring event type from endpoint parity.
- Medium, line 140: a decreasing sample minimum need not imply zero infimum. The increments one plus reciprocal positive integer have minima decreasing to one. Distinguish an unresolved lower bound, approach to a positive limit and arbitrarily small increments. A finite set also has an infimum equal to its minimum; it does not establish the full-class infimum.
- Medium, line 121: mechanical angular momentum is defined about a moving constituent centroid, while the referenced total balance is about a fixed origin. Transform both mechanical and wake charges consistently. The moving-reference derivative contains centroid velocity crossed with total momentum; its wake part need not vanish. It is not automatically an endpoint-leakage term. Keep fixed-origin total conservation and centroid projection separate, or derive the complete transport correction.
- Minor, line 78: centroid velocity is a sufficient cancellation choice; other velocities parallel to the summed velocity also cancel. Avoid claiming uniqueness without the additional condition.

The six-member product-rule cancellation, specific-action dimensions, independent calibration requirement and balance-before-spectrum conditions hold. The missing physical endpoint branch, action charges and observer calibration remain their original scientific obligations.

## Coordinator conclusion

All sixteen requested independent document assignments are complete. Each chapter has at least one concrete remaining correction before this supplementary verification can accept it without qualification. Most numbered repairs are sound; the review does not recommend discarding Claude's work or repeating the original style conversion. The findings concern precise mathematical implications, instrument coverage, account definitions and propagation between owners.

The next proposed work is a bounded repair pass against the findings in this report, preserving each original receipt and adding the corrected source hash and a counterexample/reference check for each accepted repair. Scientific derivations and runtime implementation remain outside that editorial pass unless separately authorized. Where a finding concerns an actual runtime limitation, reader-facing claims should accurately state that limitation; this review does not authorize silently changing the runtime.

An independent reviewer checked that the coordinator's Constraint Ledger, Known Tensions, Convergence Tests, Run Protocols and Tier 0 Interpretation summaries faithfully preserve its evidence and limitations. The coordinator also inspected the principal disputed source passages in the other chapters. No vote or reviewer agreement is counted as scientific proof.

## Completion status

Complete: sixteen source/receipt reviews, with per-ID dispositions and proposed corrections above. Only this supplementary report was created. Corpus corrections have not been applied, and the original shared campaign records have not been rewritten to imply they were.

After report assembly, `node scripts/validate-content.mjs --check --strict` passed with 391 scenes, 199 corpus Markdown files, 1829 repository Markdown files, zero errors, zero warnings and 30 notes. `git diff --no-index --check /dev/null` on this new report emitted no whitespace diagnostics (its exit 1 denotes the new-file difference); `rg` enumerated exactly the sixteen numbered chapter sections. Scoped `git --no-optional-locks status --short` over the validation corpus and campaign directory showed only this new report, establishing no outstanding chapter or shared-record edits in that scope at the check.

## Subsequent repair integration

### Master Equation stationary-surrogate propagation

The coordinator repaired the three paragraphs under [Rest-Frame Recast](../../../../content/markdown/aaa/dynamics/master-equation.md#rest-frame-recast-useful-inference-device), the direct owner dependency named in the Perspective finding. The pre-edit source SHA-256 was `5fb10f08ab8b9af12f315878c949df05b07573703a133cd84ca70c0252a36ecc`; the post-edit hash measured by `shasum -a 256` is `7e3c419f560374a9ecd24ffebebb3ac1e0ad64b619040c447569fdedc2d3d672`. The correction matches one finite nonzero per-hit acceleration with fixed coupling and polarities, derives the unique stationary-surrogate separation and emission time, and distinguishes that surrogate from the actual moving source's unknown distance. It makes no whole-history, potential or singular-hit equivalence claim. No acceleration kernel, display equation or viewer identity changed.

The independent algebraic reference is the canonical inverse-square per-hit law with stationary weight one. Before target validation, a known square-root case passed; the normalized example with coupling-polarity product one, actual radius four and actual weight four gives acceleration one quarter, surrogate radius two, and a matching stationary acceleration one quarter. Arbitrarily choosing radius three fails that equality. A separately known-case-tested inline extractor and valid/invalid strict-KaTeX control checked the changed subsection. Scoped `git diff --check` passed. This is a bounded propagated correction, not a new full Master Equation review.

Before editing, targeted `rg` searches established consumers in `content/graph/`, generated textbook reading copies, `scripts/config/foundational-impact-contracts.json`, and earlier review receipts. The workers separately inventory the sixteen target chapters' binders. Original evidence and generated consumers remain unchanged; byte drift caused by these authorized source edits belongs to explicit regeneration or the publication procedure.

### Final sixteen-chapter integration

All sixteen accepted chapter repairs are implemented and independently cross-reviewed at the source hashes below. Three workers edited disjoint chapter sets; cross-review rotated to a different worker: the CL-group reviewer checked RCL/NGT/SIM/SRM/SO/CMP, the FC-group reviewer checked CL/KT/CT/RP/ATI, and the RCL-group reviewer checked FC/MSG/SP/ABC/BFR. Each scoped verdict was pass. References are the separate algebraic identities, counterexamples and actual runtime contracts recorded in the original findings and new receipts; reviewer agreement alone is not mathematical evidence.

The final consistency checks propagated full proper-subset no-signaling scope to the NGT and BFR introductions, clarified BFR's CHSH wording, and aligned CL's gravity passage with MSG and Measurement Ontology. The last CL read-only check compared lines 154–158 with MSG lines 343–354 and Measurement Ontology lines 1274–1282: the same unconditioned ensemble/window, independently calibrated visibility relation, driven/reduced threshold and persistence/autonomy qualifications agree. The final CL hash was rechecked after editing stopped. The FC-group reviewer also independently accepted the coordinator's Master Equation surrogate derivation at the hash above.

| Chapter | Final SHA-256 | Implementation receipt and cross-review |
| --- | --- | --- |
| [reaction-cosmology-provenance-ledger.md](../../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) | `9a23e670850873347637bd43de227c04f0e8234fda7aa80004a2d38db8b981f3` | [Receipt](crw-005-sixteen-repair-rcl-ngt-sim-srm-so-cmp-2026-09-13.md); CL-group reviewer: pass |
| [constraint-ledger.md](../../../../content/markdown/aaa/validation/constraint-ledger.md) | `c7bf881b19a04ab0ea4cd870bc0ab668e6f3d8b0ff59234b2330fa8253af876a` | [Receipt](crw-005-sixteen-repair-cl-kt-ct-rp-ati-2026-09-13.md); FC-group reviewer: pass |
| [failure-criteria.md](../../../../content/markdown/aaa/validation/failure-criteria.md) | `6ffd0dfc7e70ee7da8da05340d3184a7d45e14aa4cfb194235b3dc8220195d80` | [Receipt](crw-005-sixteen-repair-fc-msg-sp-abc-bfr-2026-09-13.md); RCL-group reviewer: pass |
| [no-go-theorems.md](../../../../content/markdown/aaa/validation/no-go-theorems.md) | `cb85278b5e552ed067cafa5da1748290002becfc81d434c3d380670aa26ec3c3` | [Receipt](crw-005-sixteen-repair-rcl-ngt-sim-srm-so-cmp-2026-09-13.md); CL-group reviewer: pass |
| [known-tensions.md](../../../../content/markdown/aaa/validation/known-tensions.md) | `6557662f556269bd64a11c3ce6ddf082f28a1ba38299415645f66ac5ec686079` | [Receipt](crw-005-sixteen-repair-cl-kt-ct-rp-ati-2026-09-13.md); FC-group reviewer: pass |
| [massive-superposition-gravity.md](../../../../content/markdown/aaa/validation/massive-superposition-gravity.md) | `929194af0dcb3c51652cab4649f6711372fd0b9a7c09f1c34fcd425ad141fcb2` | [Receipt](crw-005-sixteen-repair-fc-msg-sp-abc-bfr-2026-09-13.md); RCL-group reviewer: pass |
| [architrino.md](../../../../content/markdown/aaa/validation/simulations/architrino.md) | `3a919b2d2cb5fe3abe4da23b408e7d1ff4bf58d5ae5d42f779cb1c81c37ff5bc` | [Receipt](crw-005-sixteen-repair-rcl-ngt-sim-srm-so-cmp-2026-09-13.md); CL-group reviewer: pass |
| [convergence-tests.md](../../../../content/markdown/aaa/validation/simulations/convergence-tests.md) | `6ec531b20aa7356d7ecbceefe78a2767d40d197d457c40367102361fe48f3b86` | [Receipt](crw-005-sixteen-repair-cl-kt-ct-rp-ati-2026-09-13.md); FC-group reviewer: pass |
| [perspective.md](../../../../content/markdown/aaa/validation/simulations/perspective.md) | `e9d31a410198099a8e25b5717e94a7f02b8718d51cff302bd24db16a469b2170` | [Receipt](crw-005-sixteen-repair-fc-msg-sp-abc-bfr-2026-09-13.md); RCL-group reviewer: pass |
| [README.md](../../../../content/markdown/aaa/validation/simulations/README.md) | `11f331676cdf87367733e4fbec20fcc341997cd177b48767a8a9eb7502945bd2` | [Receipt](crw-005-sixteen-repair-rcl-ngt-sim-srm-so-cmp-2026-09-13.md); CL-group reviewer: pass |
| [run-protocols.md](../../../../content/markdown/aaa/validation/simulations/run-protocols.md) | `a4656e686fcadef1a083ac3b578aff49fe30a66e3da411062a7920a955ed7c4a` | [Receipt](crw-005-sixteen-repair-cl-kt-ct-rp-ati-2026-09-13.md); FC-group reviewer: pass |
| [a0-branch-certificate-protocol.md](../../../../content/markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md) | `5e143e5fbd7d31d7f88fa3f41d5a36318cf8036af9e243b5e966d3d29e9cc214` | [Receipt](crw-005-sixteen-repair-fc-msg-sp-abc-bfr-2026-09-13.md); RCL-group reviewer: pass |
| [synthetic-observables.md](../../../../content/markdown/aaa/validation/simulations/synthetic-observables.md) | `cf6fab485804aa355a3a48d1c7e7fcd4c8b0dd690f9ca5b8cae5cfe9e39f5456` | [Receipt](crw-005-sixteen-repair-rcl-ngt-sim-srm-so-cmp-2026-09-13.md); CL-group reviewer: pass |
| [a0-tier0-result-interpretation.md](../../../../content/markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md) | `b707bdd34a4cffe04df34ec7f454d7d76c779564503710d924c46ce599aaf28e` | [Receipt](crw-005-sixteen-repair-cl-kt-ct-rp-ati-2026-09-13.md); FC-group reviewer: pass |
| [bell-family-record-measure.md](../../../../content/markdown/aaa/validation/simulations/bell-family-record-measure.md) | `55a146579d63abd25c8acb6577ef0d27034ce9a8340ced0b58653272bb48c2a0` | [Receipt](crw-005-sixteen-repair-fc-msg-sp-abc-bfr-2026-09-13.md); RCL-group reviewer: pass |
| [coincident-midpoint-orthogonal-axis-action-increment-protocol.md](../../../../content/markdown/aaa/validation/simulations/coincident-midpoint-orthogonal-axis-action-increment-protocol.md) | `e3202f611d6ade4ca9251f0a09a9a1ca58dea2839b0274d10dce7f4cee53eeb5` | [Receipt](crw-005-sixteen-repair-rcl-ngt-sim-srm-so-cmp-2026-09-13.md); CL-group reviewer: pass |

Final receipt-to-source checks used Node SHA-256 after the known abc digest control; all sixteen live source hashes occur in their corresponding new receipts. A known-case-first row parser and transformation checked the restored board: 199 unique completed paths, zero active or unopened rows, with exact set equality to a recursive enumeration of the 199 live corpus Markdown files. The sixteen historical rows were restored in their original order with supplementary receipt links, preserving the other 183 rows.

Strict KaTeX worker checks passed for 832 spans in the six-chapter group, 738 in the CL group after final propagation, and 1005 in the FC group; the coordinator additionally checked the ten inline expressions in the changed Master Equation subsection. Viewer identities were retained; the eight intentionally corrected display bodies are identified in the receipts. Joined `node scripts/validate-content.mjs --check --strict` passed over 1833 repository Markdown files, 199 corpus Markdown files and 391 scenes, with zero errors, zero warnings and 30 informational notes. `node scripts/validate-equation-mapping-links.mjs` passed for its 23 registered links; that registry check is not an exhaustive viewer audit.

`node scripts/build-equation-mapping-corpus.mjs --check` reports the expected source-edit drift in `content/generated/equation-mapping/corpus-equations.json`. No generated artifact was edited. The deferred authorized-regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`; publication or explicit regeneration owns that step.

After shared-record integration, the joined strict content check again returned the same 1833/199/391 counts and zero errors or warnings. Scoped `git diff --check HEAD` passed for the validation corpus, Master Equation and campaign directory. `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for each of the four new evidence files.

This completes the accepted authored-document repairs, including the necessary seventeenth source dependency. It does not establish theory closure, implement described runtime protocols, or certify refreshed public rendering. A changed source hash, a failed scoped check or an independent counterexample invalidating a repaired implication would reopen the affected disposition.
