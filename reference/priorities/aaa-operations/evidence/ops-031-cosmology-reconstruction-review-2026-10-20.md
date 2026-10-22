# OPS-031 — Cosmology Reconstruction review, October 20, 2026

## Scope and disposition

Report-only review of all 437 lines of [Cosmology Reconstruction](../../../../content/markdown/aaa/cosmology/cosmology-reconstruction.md), including all 18 displayed equations and the numerical comparison table, is complete by full source reading without clipped target output. No actionable correction or optional replacement is proposed. This is a bounded no-change disposition, not certification of a physical cosmological model. CRW-005 remains closed; its historical scientific obligations remain open.

Native `shasum -a 256` measures the inspected chapter as `4cdc71fa008ae2d3b295cc6aa177a502abc54f59b99f6cba33fed439b71f30a0`, equal to the final identity in the [September 12 repair receipt](../../aaa-corpus-rewrite/evidence/crw-005-cosmology-reconstruction-review-2026-09-12.md). The source is frozen in `.tmp/ops-031-oct20/reconstruction/cosmology-reconstruction.md`; final native `cmp` against that copy verifies unchanged target bytes. Different bytes or incomplete whole-source reading would invalidate this coverage claim.

Preparation followed live AGENTS, startup router, review skill and live owner, corpus-reviewer, periodic-document-review and theory orientation. Task-relevant source policy, style, notation and level rules were inspected. Foundation observer-access, clock-map and fixed-void passages, the Master Equation wake/acceleration account, and Expansion Mechanism's clock/transport decomposition supplied context; no additional whole-chapter coverage is claimed for these reads. Native SHA-256 measures the inspected Expansion Mechanism dependency as `08e09f9d940c47c4f3af41f524f0dd8eb6d9f8759350e80490fd87bf1a2dcfc0`.

## Whole-source decisions and independent checks

| Inspected passage | Disposition, reason and independent reference | Observation that would overturn it |
| --- | --- | --- |
| Lines 3–58: observation, source model and effective-layer introduction | Retain. The chapter distinguishes measured light from inferred parameters, identifies source and instrument modeling, and applies its implementation criticism to the underlying explanatory layer. It does not infer statistical circularity merely from common parameter dependence. A joint likelihood may contain dependent source and distance parameters; independently recalibrating with the same fitted distance while discarding the dependence is the actual double-counting concern. | A concrete passage treating fitted luminosity as independently measured, or promoting framework-dependent parameters into direct observations. |
| Lines 60–156: redshift and standard distances | Retain. The wavelength/frequency equality is restricted to equal phase-speed calibration, cosmological redshift is separated from local shifts, and component powers, curvature, radiation and neutrino limitations are explicit. The standard formulas are labeled observer-level comparisons. Fresh inspection of Hogg's [Distance measures in cosmology](https://arxiv.org/html/astro-ph/9905116v4), sections 3–7 and 10, supports these conventions and their band/bolometric restrictions. | A stated distance law used beyond its flat/transparent domain, unequal endpoint phase speeds used in the unconditional ratio, or a discrepancy with those comparison conventions. |
| Lines 158–239: transfer factorization and slope | Retain. The positive inverse-cadence factors give the stated signs. Adding a dimensionless quantity to the emission log factor and subtracting it from the path factor leaves the observed log shift unchanged, so the residual identity cannot identify the physical terms. Direct differentiation of the displayed comoving-distance integral gives the stated factor relating a spatial log-redshift slope to a temporal expansion rate. | A sign error under substitution, a claim that one observed line determines all factors, or an identification of the spatial slope with the temporal rate without the additional map. |
| Lines 241–284: homogeneous reduction and age | Retain. Differences of one logarithmic scale history compose additively; arbitrary smooth transfers need not. Differentiating the comparison scale relation gives the displayed negative redshift derivative. The effective interval and absolute-time interval remain separated by a positive clock map and an initial-boundary assumption. | A nonadditive transfer represented by a common scale function without additional structure, or a spatial coefficient inserted into the age integral and treated as a derived absolute interval. |
| Lines 286–374: luminosity and worked comparison | Retain. Independent photon-counting algebra gives the separate energy and arrival-interval factors in the luminosity distance. The table assumes both, along with isotropic Euclidean spreading, and explicitly withholds their dynamical recovery. A fresh controlled adaptive quadrature reproduces all twelve printed distance and percentage rows. The model-to-model difference is not promoted into a data-likelihood rejection. | Incorrect printed rounding under the stated parameters, a missing energy/arrival/beam assumption, or an assertion that the numerical curves alone reject the proposal observationally. |
| Lines 376–437: dark sector, tests and inverse arrow | Retain. Constitutive identities remain proposed; the same history must address source, transport, clocks, growth and lensing. Matching effective variables does not prove existence, stability or uniqueness of the underlying history. Fresh inspection of the [Planck paper abstract](https://arxiv.org/abs/1807.06209) confirms the rounded base-model values used for the comparison and their conditional inference context. | A physical identification promoted beyond its declared constitutive evidence, or a claim of unique native history from the listed effective variables. |

The primary-source checks above concern recognized observer-level comparison conventions. They supply no substrate law and no observational acceptance of a fixed-void model. Hogg supplies the redshift, distance, band and elapsed-time conventions; Planck supplies parameter provenance only. Neither independently validates the chapter's proposed transport implementation. No catalogs, chains, likelihoods or full source-paper corpus were audited.

## Previous accepted repairs and prior no-change recheck

Two actual accepted September 12 repairs survive at claim scope, checked against the preserved baseline/final account and separate elementary arguments rather than reviewer agreement.

**CR-07, spatial versus temporal rate, current lines 227–239.** The old derivative coordinate was undefined and its coefficient was read as Hubble-like without the conversion. The repaired text defines the outward sightline coordinate and states that the spatial log-redshift slope is not yet the temporal rate. Independently, the chain rule gives

$$
c_0\frac{d\ln(1+z)}{d\chi}=\frac{H(z)}{1+z}.
$$

At cosmological redshift one, a constant comparison rate of one produces one-half for this slope, not one. Correctness survives; the original diagnostic meaning is preserved; explanatory usefulness survives through the explicit coordinate and conversion. A contrary derivative of the declared distance integral or renewed unconditional equality would reopen this repair.

**CR-10, two transfer factors, current lines 294–308 and 326–336.** The former benchmark omitted the conditions supplying its luminosity prefactor. The repaired text states the beam assumptions and keeps energy and timing ratios separate. Counting received photon energy per receiving interval and area independently gives

$$
F=\frac{L}{4\pi r_{\mathrm{los}}^2g_Eg_t},\qquad d_L=r_{\mathrm{los}}\sqrt{g_Eg_t}.
$$

At redshift one, energy and interval ratios both equal to two give twice the geometric distance; energy redshift alone gives its square-root-of-two multiple. Correctness, preserved conditional meaning and explanatory usefulness survive. A derived channel with different timing or beam transport would change the benchmark's physical applicability, rather than refute this stated conditional account.

**Prior no-change, Radiation catch-up scaffold.** The [October 6 Radiation review](ops-031-radiation-review-2026-10-06.md#independent-local-checks-and-retained-no-change-decisions) explicitly retained its lines 27–49; the [October 13 recheck](ops-031-bremsstrahlung-synchrotron-review-2026-10-13.md#previous-repair-and-no-change-rechecks) retained the same claim. The live [Radiation passage](../../../../content/markdown/aaa/reactions/radiation.md#radiation-as-the-cost-of-an-unprepared-path), lines 27–49, was rechecked in this supporting-class pass. Relative speed gives the catch-up duration, and factoring the difference of squares gives

$$
\frac{1}{1-\beta_f}=(1+\beta_f)\gamma_f^2.
$$

Squaring the duration produces the fourth-power displacement factor; a further hypothetical quadratic displacement-to-power map would instead produce an eighth-power factor. The chapter explicitly withholds that power derivation and limits the small-turn expansion. The prior no-change survives in correctness, meaning and explanatory usefulness. Arithmetic failure, or a live claim that the missing power/clock map is derived, would overturn it. Native SHA-256 of the current Radiation source is `1b74b1ba87fdc99f43a72a7c022430fc9ed2ec48bf1c0bb1457ff1a058b785a5`, equal to the preserved October 6 identity. This claim-level check adds no Radiation whole-chapter coverage credit.

## Instruments, limits and handoff

A fresh scratch adaptive-Simpson instrument first passed independently known polynomial, exponential and inverse-hyperbolic-sine integrals, with the control pass printed before any table target was evaluated. It then evaluated the specified standard distance integral in log-redshift and the explicit benchmark and matched all twelve rounded distance pairs and one-decimal percentages. This independently authored instrument differs from the historical fixed-subdivision comparison, but its controls and agreement are finite numerical checks, not a certified global error bound or physical acceptance. The preserved scratch script is `.tmp/ops-031-oct20/reconstruction/check-comparison.mjs`, with outputs in `numerical-check.json`. All new numerical wake-speed conventions use $c_f=1$; the observer-unit distance conversion does not identify photon and wake speeds.

The existing `.tmp/ops-031-effective-proposal-oct12/validate.mjs` printed its known math/code/blockquote/fenced-link and valid/invalid-TeX controls before reading the target, then passed 219 math spans, 18 displays, 18 viewer links and 31 local-file occurrences. This verifies supported TeX syntax and local target existence only; it does not certify fragments, layout, external endpoints or physics. The receipt is checked with the same controls before handoff.

The continuing Codex model lineage is used; no materially different model was adopted, and no new model-comparison evaluation or superiority claim is made. Exact runtime build/settings and operator review burden were not measured. No scientific evolution, substantive edit, generated write or publication was performed. The existing CR-O1–CR-O5 obligations remain with their scientific owners; no duplicate repair task is warranted from this no-change pass. Parent coordination owns inventory, coverage totals, remaining cursor and next due dates. Only this receipt and task scratch were written by this worker.
