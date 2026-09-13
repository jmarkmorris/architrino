# CRW-005 — Spacetime Models and the Noether Sea review

## Scope and disposition

Full bounded review and repair of [Spacetime Models and the Noether Sea](../../../../content/markdown/aaa/philosophy-history/theory-bridges/spacetime-models-and-noether-sea.md), all 375 baseline lines. The live board path was confirmed by scoped `rg`; scoped `git --no-optional-locks status` showed no chapter edits before this worker began. Only this chapter and receipt are owned. The coordinator independently read the complete baseline and supplied an independent mathematical audit.

Baseline SHA-256: `0a6a43423c826f07a7bf79d7fd885552afa887fff068d1d6727a4c16303cf2cd`.

Reviewed chapter SHA-256: `70bb0793bc277431db8e12dbe31b27a2ec1e333f5f0711a7aefe3f0410396057`.

The chapter remains a selective comparison document, not a constitutive derivation or an instruction to recover every speculative framework. No native superfluid, metric dynamics, or gravitational closure is claimed.

## Findings and repairs

| ID | Severity | Finding and disposition |
| --- | --- | --- |
| SM-01 | Medium | Newton's point-source potential was called inverse-square; corrected to inverse radius with inverse-square gradient. Minkowski geometry now explicitly flat. |
| SM-02 | Medium | A boundary-response residual was described as equivalence without a declared input class, calibrated channel norm, or dimensional floor. Defined these and limited the result to the tested response class. |
| SM-03 | High | One coherent object was enough to license superfluid language; condensate amplitude and ideal-gas condensate fraction were conflated with superfluid response density. Separated the objects and restricted the ideal-gas temperature law to its homogeneous three-dimensional thermodynamic regime. |
| SM-04 | High | A minimum over an unspecified wave number and one mode was used to infer no drag. Replaced it with a nonzero-momentum infimum, explained branches and directions, and separated energetic single-excitation exclusion from other dissipative mechanisms and transparency. |
| SM-05 | Medium | Historical Sinha gap and critical-speed estimates lacked source-assumption boundaries. Authenticated the original paper visually and retained the rest-energy identification and Compton estimate as assumptions, including its lower-energy collective-mode caveat. |
| SM-06 | Medium | Source natural units and temperature collided with native time and mass vocabulary. Declared source units and variable roles, renamed comparison temperature, distinguished source condensate amplitude from speed, and scoped the finite-temperature stability ansatz and vortex estimate. |
| SM-07 | High | The acceleration range comparison used only the exponential suppression of a Yukawa potential. Differentiated the potential and added the missing one-plus-radius-over-range factor in both residual terms. |
| SM-08 | Medium | Acceleration residuals lacked magnitude/sign conventions, positive dimensional floors, independent benchmark calibration, and source/window domains. Added these and distinguished point-source exterior response from arbitrary extended-source response. |
| SM-09 | Medium | A schematic Lagrangian handoff was required as though every native delayed interaction admitted that local form. Scoped it to a candidate effective-action representation needing independent justification. |
| SM-10 | High | ADM reconstruction omitted positive lapse and nondegenerate ruler data and could be read as fixing a metric, connection, and gravity from signal behavior alone. Added signature/determinant proof, conformal-cone limits, independent clock/ruler scale, and separate connection/dynamics obligations. |
| SM-11 | Medium | Optional speculative comparisons were framed as universal closure burdens. Clarified that the table lists conditional obligations only for selected comparisons and validated observer constraints. |

Four high-severity and seven medium-severity issues were repaired. These are claim-boundary and mathematical corrections, not empirical judgments about the viability of a Noether sea model.

## Primary-source verification

- [Sinha, Sivaram, and Sudarshan, Aether as a Superfluid State of Particle-Antiparticle Pairs](https://web2.ph.utexas.edu/~gsudama/pub/1976_001.pdf), printed pages 66–68, equations (4)–(7): visually inspected the author-hosted scan using Poppler-rendered page images because browser extraction had no text. The spectrum, postulated gap/rest-energy identification, and Compton-momentum critical-speed estimate are present. The following page explicitly admits lower-energy collective excitations. No claim that the estimate minimizes a complete spectrum is supported.
- [Berezhiani and Khoury, Theory of Dark Matter Superfluidity](https://arxiv.org/abs/1507.01019), version 2: checked source equations (23)–(32), (67)–(68), the perturbative discussion following (78), (80), (117), and (119) through primary PDF text. The phase action, pressure/density conversion, sound speed, particular finite-temperature stability condition, coherence estimate, and vortex scaling are source-model statements. They are not native premises or evidence that the Noether sea is superfluid.
- [Berezhiani and Khoury, Emergent Long-Range Interactions in Bose-Einstein Condensates](https://arxiv.org/abs/1812.09332), equations (7)–(13), (17)–(19): the weak response is proportional to exponential-over-radius, its range is controlled by condensate parameters, and the derivative source handoff and deformation/screening regimes are explicit. The correction to acceleration follows by differentiating that source potential, not by changing the cited theory.

No secondary search snippet was used as authority. Source links were added at the actual technical comparisons. No historical numerical values were relabeled, and no speculative source became a mandatory native recovery target.

## Independent mathematics and falsifiers

For a potential minus C times exponential-over-radius, the product rule gives positive radial derivative C times exponential times the sum of inverse radius squared and inverse range-times-radius. Its inward acceleration magnitude is therefore the unscreened inverse-square magnitude times the exponential times one plus radius over range. The original exponential-only expression is half the corrected value at radius equal to range. This difference is not a normalization convention because it varies with radius.

The scratch instrument `.tmp/crw-005-spacetime-models-review/check.mjs` first verifies its centered derivative on the known quadratic case at coordinate 3, returning 6, before evaluating the target. At C equal to one and radius and range equal to two, the independently differenced potential gives 0.18393972059244088, while the closed derivative gives 0.18393972058572117. The previous expression gives 0.09196986029286058. Primitive wake speed is one in all new numerical bookkeeping; these are prescribed effective comparison quantities, not an EOM solver result.

The same already-checked derivative independently computes number density from the source pressure function. At source mass and Lambda equal to one and chemical potential equal to two, conversion through density reproduces the source's cubic equation of state. This verifies a source algebra identity only.

The ideal Bose occupation integral scales as temperature to the three-halves power by rescaling momentum by the square root of temperature. That determines condensed number fraction in the declared ideal-gas regime, not a superfluid response fraction. In particular, the ideal quadratic excitation dispersion has energy/momentum tending to zero at small nonzero momentum, so condensate occupancy alone does not establish a nonzero Landau threshold.

For positive lapse and an invertible real spatial coframe, changing basis to the lapse-weighted time form and shifted spatial coframe proves one negative and three positive metric directions. Its determinant in time-and-length coordinates is minus lapse squared times the observer speed squared times the spatial determinant. Multiplying a metric by a positive function leaves its null cone unchanged, which independently demonstrates why the cone does not fix scale. No Einstein dynamics follows from either identity.

These claims are falsifiable by direct differentiation, the stated occupation-integral rescaling, or a counterexample to the invertible-coframe argument. A native excitation spectrum, dissipation calculation, or shared clock/ruler constitutive map would be needed to discharge the respective physical obligations.

## Live owner alignment and validation

The current [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md) supplies the positive-lapse, invertible-coframe, units, and connection boundaries used here. Its live scope was checked directly; this chapter does not modify that owner or infer a constitutive law from a residual.

By `node .tmp/crw-005-spacetime-models-review/check.mjs`, following known-case math extraction, fenced-code exclusion, link extraction, and valid/invalid strict-KaTeX tests, all 163 final TeX spans render. All ten display positions and their ordered viewer identities remain; seven display bodies are unchanged. The three justified changes are the Landau infimum, the Yukawa acceleration factor, and the temperature symbol in the optional coherent-state tuple. All original headings remain, and all 16 local link target paths exist. Three external links point to the primary sources read above. Local path checks do not certify every fragment anchor.

Scoped `git diff --check` reports no whitespace errors in the chapter. No whole-repository validation, evolved medium computation, generator write, publication operation, or neighboring/shared source edit was performed. The coordinator may run a combined content check after integration. Scratch source PDFs and check scripts are disposable; the useful findings and exact checks are retained here.

## Remaining obligations

- SM-O1: Derive any adopted native coherent variable, complete relevant excitation spectrum, coupling, and actual dissipation threshold; a source analogy is insufficient.
- SM-O2: Derive a native collective source response and range with controlled finite-source, deformation, and stability conditions, then compare independently calibrated outputs.
- SM-O3: Recover one channel-consistent metric with clock/ruler scale and a justified connection, and separately establish the dynamical gravitational recovery.

Coordinator adjudication and shared record integration remain separate from this bounded chapter repair.
