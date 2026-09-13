# CRW-005 — Special Relativity and Deformable Noether Braids review

## Scope and disposition

Full review and bounded repair of [Special Relativity and Deformable Noether Braids](../../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md), all 617 baseline source lines. Only the chapter and this receipt are owned by this review. The coordinator independently read the full baseline and supplied a second mathematical audit; shared record integration is separate.

The chapter remains an effective recovery mapping. Exact prescribed return-leg identities survive; they do not establish an evolved stable braid, material constitutive response, quantization, or a complete observer map. No scientific closure is claimed.

Baseline SHA-256: `752a24ebdd311d39b77e77a30621432580f853ed0d3d597a4e16daea549ca65a`.

Reviewed chapter SHA-256: `2b9c7bf6b5ce5aae992f2b20182fa94940d5306661a0b40dc7c9a9e56b489918`.

## Findings and repairs

| ID | Severity | Finding and disposition |
| --- | --- | --- |
| SR-01 | High | Finite wake speed was treated as sufficient to deform and stabilize material. Regraded as a dynamical recovery target requiring a balanced evolved translating family. |
| SR-02 | High | Weak homogeneous export was asserted to approach primitive wake speed. Removed mandatory equality: measured channel speed and primitive speed need a derived conversion, consistent with the provisional faster-wake route. |
| SR-03 | High | Native phase frequency was equated to observer proper-time rate without the coordinate-time Jacobian. Added the chain rule, positive reference frequency, unwrapped phase, and explicit clock/ruler calibration. |
| SR-04 | High | A transverse straight-signal speed identity was applied as a generic braid law. Scoped it to uniformly translating endpoints, fixed transverse separation, constant isotropic signal speed, and sub-channel-speed translation. |
| SR-05 | High | Equal return periods and two axis intercepts were treated as a derived material spheroid. Marked period matching as imposed in the comparison model and the quadratic surface as a separately controlled envelope fit. |
| SR-06 | High | The free transverse scale was omitted from the clock claim. Direct substitution gives period ratio equal to lambda times gamma. Shape agreement therefore needs independent scale/calibration control to recover clocks and rest-ruler contraction. |
| SR-07 | High | A discrete root-class label was used to imply quantized response/action. Preserved the named program while distinguishing discrete labels from continuous parameters and the independent one-quantum action assumption. |
| SR-08 | High | Instantaneous field-speed threshold was treated as a tangent root, and a comparison clock failure as a universal matter limit. Required an admitted root with vanishing transmitter Jacobian, full admitted-history speed conditions, finite extent, and actual branch dynamics. |
| SR-09 | Medium | Canonical action-energy integrals were used without a recovered energy chart or fixed other parameters. Added the canonical recovery condition and explicit parameter-work limitation; retained the display. |
| SR-10 | High | Scalar mass shell was called equivalent to velocity-parametrized energy/momentum; the isotropic response also missed relativistic gamma. Added positive-energy massive-branch velocity mapping and scoped the tensor to small velocity, distinguishing momentum coefficients from differential response. |
| SR-11 | Medium | Rapidity and interval prose conflated a chosen inertial frame pair with all endpoint velocities. Scoped the hyperbola to a one-space/one-time diagram and required consistent maps for the same frame pair. |
| SR-12 | High | Leg asymmetry was described as a Lorentz boost/offset without the length and clock conversions. Added the exact assumptions and distinguished same-absolute-time clock offset from absolute-time separation of moving-frame-simultaneous events. |
| SR-13 | Medium | Raw shielding, exposed mass response, and failure of the bridge's domain were overinterpreted. Aligned exposure with the live mass owner and distinguished absence of a prediction from a computed violation of special relativity. |

Ten high-severity and three medium-severity findings are repaired at their defensible claim level. These severities concern incorrect implications in exposition, not an empirical verdict on the theory.

## Independent mathematical checks

The independent reference is elementary Euclidean signal geometry and algebra, not a replay of an EOM solver or a parameterized stand-in for the medium. The scratch instrument `.tmp/crw-005-sr-review/check.mjs` first passes the analytically known rest-clock case, then evaluates the moving comparison model. New numerical instantiations use primitive wake speed equal to one; the signal speed also equals one only in this explicitly prescribed comparison model, not as a physical identification.

At speed 0.6, gamma is 1.25. With unit rest radius and unit transverse scale, both return periods are 2.5 and their ratio to the rest period is 1.25. Doubling the transverse scale doubles both periods to 5 and changes the period ratio to 2.5 while leaving the shape gamma at 1.25. This counterexample independently disproves the implication from equal return timing to clock dilation without scale control.

For unit rest separation, the half-difference of leg times divided by gamma is 0.6. In the conventional Lorentz comparison map, the clock difference at the same absolute time is minus 0.6, while the absolute-time separation of events simultaneous in the moving frame is 0.75. These are distinct observables.

The scalar mass shell admits a velocity parametrization only with an additional relation between momentum and velocity. Differentiating the effective target momentum directly gives the anisotropic differential response recorded in the repaired chapter; the small-velocity isotropic coefficient alone does not recover that law. The canonical energy-integral limitation follows directly from the total differential when other parameters vary.

Falsifiers are concrete: a different direct substitution into the declared return equations would overturn the scale calculation; a proved observer calibration or a stable evolved branch could discharge the corresponding open obligation. A discrete root label alone cannot do either.

## Live owner alignment and evidence boundaries

Read the current proper-time owner for the phase/Jacobian distinction, the mass owner for probe-facing exposure and small-group-velocity response, and the geometry owner's envelope-fit and prescribed-path limitations. Checked the Master Equation Proposition 5 source: its exact transverse per-hit projection is explicitly scoped to a uniformly translating fixed point cloud, with general-orientation limitations. The chapter preserves that scope and its relative-periodic moving-assembly acceptance link. Neighboring return-cycle prose is a mutable mapping document, not independent evidence that its proposed quantization has been derived.

All mathematical changes use explicit algebra and live repository primitives or label effective special-relativistic equations as comparison targets. No new external empirical, historical, or numerical claims were introduced. No external-source selection decision was needed.

## Validation

By `node .tmp/crw-005-sr-review/check.mjs`, after known-case tests for math extraction, fenced-code exclusions, Markdown links, and valid/invalid strict KaTeX, all 179 final math spans render under strict KaTeX. All 44 baseline display bodies and all 44 ordered viewer identities are preserved exactly. All original headings survive; all 61 local link target paths exist. Link checks establish path existence, not the semantic validity of every fragment anchor.

By scoped `git diff --check`, the chapter has no whitespace errors. This is document validation, not a repository-wide test, scientific solver run, or certification of translating assemblies. No generated artifacts, shared review records, neighboring chapters, Git index, or publication state were changed by this reviewer. No historical numerical evidence was relabeled or regenerated.

## Remaining obligations

- SR-O1: Derive and validate a balanced stable translating braid family and its actual return history; prescribed straight legs are insufficient.
- SR-O2: Derive the scale, phase-frequency, observer time/ruler conversion, and common effective channel speed together, including the relation to primitive wake speed.
- SR-O3: Derive canonical action/energy and probe-facing dressed momentum, then recover the full positive-energy mass shell and velocity dependence.
- SR-O4: Establish any discrete action or admissible-state selection independently of ledger labels, and compute preferred-frame residuals rather than infer them from scope limits.

Shared integration, generated fingerprint refresh when authorized, and downstream chapter propagation belong to the coordinator. This receipt closes only the bounded source review and repair.
