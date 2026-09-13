# CRW-005 Pilot-Wave Character Review — 2026-09-13

Scope: full review and bounded repair of [Pilot-Wave Character](../../../../content/markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md). The coordinator owns integration and shared records. No neighboring corpus, runtime, generated, or Git-index files were edited.

The chapter was clean by scoped `git --no-optional-locks status --short -- <chapter>` before editing. SHA-256 by `shasum -a 256`: baseline `0fdee89c4a9316f7ef952d1293ecc6abed7d450f7fd43d228a03d80ba1c85c95`; reviewed chapter `c00dfd39db5cc403f3d30d978ea1bc7372b04f1750a549b459a791654a8e5b85`. Attribution to a particular earlier editor was not investigated and is not claimed.

## Findings and dispositions

All findings below were accepted and repaired in the chapter. Severity identifies the consequence of the prior claim, not the status of the underlying research program.

| ID | Severity | Finding and repair |
| --- | --- | --- |
| PW-01 | High | Scalar Bohm guidance was presented without magnetic, spin, or nodal restrictions. Declared its scalar zero-vector-potential domain, the gauge-covariant phase velocity, and spinor current requirement. |
| PW-02 | Medium | Quantum potential was said not to depend on local amplitude and to couple all states nonlocally. Defined curvature-to-amplitude dependence and separated product from entangled states. |
| PW-03 | High | Equilibrium was confused with general statistical derivation and later with invariant density. Distinguished justified preparation, transported measure, equivariance, stationarity, and apparatus dynamics. |
| PW-04 | High | Record filtering could silently remove probability and endpoint/current tests lacked their common event-space and initial-data assumptions. Added matching conditioning, normalization, positive tolerances, initial agreement, boundary flux, and projection motion. |
| PW-05 | Medium | Two material ontologies were attributed to all dBB interpretations. Scoped that objection to the field reading and retained the nomological alternative already acknowledged by the chapter. |
| PW-06 | High | Master-equation prose said source Jacobians only certify roots, described primitive forces, and omitted admitted-root conditions. Restored acceleration-first language, the actual transmitter multiplier, admitted roots, and convergence/truncation boundary. |
| PW-07 | High | Periodic motion, prior super-wake speed and curvature, and memory were treated as sufficient for stable modes, self-hits, or irreversible microdynamics. Replaced sufficiency claims with root certification, complete-history return, stability, and record persistence requirements. |
| PW-08 | High | Acceleration was treated as already yielding Bohm velocity, intensity as basin probability, and additive hits as linear wave evolution. Separated these three recovery requirements and the evolving root geometry. |
| PW-09 | High | Phase locking was called equally rigorous and derived quantization. Restored proposed status, nontrivial phase charts, and the restricted semiclassical meaning of the unshifted integer action rule. |
| PW-10 | Medium | Interface and radial spectral conditions omitted constant mass, delta strength, conjugation, the infinity endpoint, and maximal-domain qualification. Added these conditions and repaired the complex radial boundary display. |
| PW-11 | Medium | Hydrogen degeneracy lacked spinless Coulomb scope; finite return residuals appeared sufficient for discrete stable spectra. Scoped the comparison and distinguished necessary residuals from spectral/stability proofs. |
| PW-12 | Medium | Partial-wave and resonance formulas were applied beyond elastic short-range single-channel domains and ignored background interference. Declared positive wave numbers, truncation, independent quantities, analytic continuation, and the negligible-background Breit–Wigner approximation. |
| PW-13 | Medium | Lippmann–Schwinger was framed as weak-only, and short-distance structure as affecting only large transfer. Distinguished the exact identity from its Born expansion and the low-transfer moments from spatial resolution. |
| PW-14 | Medium | The two-dimensional delta energy formula omitted its reduced units; fixing one binding energy was presented as general cutoff control. Defined reduced positive energy, sharp wave-number regulator, and the limited renormalization condition. |
| PW-15 | High | Shared creation provenance was presented as sufficient nonlocality. Propagated the live Ontology selection: coupled apparatus response beyond the effective photon cone, measurement independence and no-signalling retained, and the finite-speed multipartite obstruction open. |
| PW-16 | High | Emission was said to deplete an architrino kinetic budget. Replaced this with the live Energy distinction between history emission, receiver acceleration, and a separately derived action/boundary energy account. |
| PW-17 | Medium | Unsupported universal population and Lorentz-precision numbers and lack of dBB environmental sensitivity were asserted. Removed the ungrounded current claims, required observable-specific bounds, and acknowledged ordinary environmental decoherence. |
| PW-18 | High | Closing Born equation integrated separately indexed wavefunctions over substrate phase space without a projection or common state. Replaced it by transported record events compared with one normalized effective state on corresponding configuration regions. |

There are 18 findings: 10 high and 8 medium. The source repairs preserve the comparison thesis without claiming the quantum recovery program has closed.

## Independent mathematical checks

Claim grade: derived. These calculations use explicitly labeled effective quantum comparison premises, not imported substrate laws. They can be overturned by a counterexample satisfying the stated premises or an error in the algebra below.

- **Guidance and quantum potential.** For scalar nonzero amplitude, writing a wavefunction as amplitude times phase gives the phase-gradient velocity. Minimal coupling replaces the gradient momentum by gradient momentum minus charge times vector potential; the latter is invariant under the corresponding simultaneous gauge transformation. The amplitude second-derivative term divided by amplitude is unchanged under constant nonzero normalization. A product amplitude separates the many-particle quantum potential into single-particle terms; entanglement is not automatic for every state.
- **Equivariance is not stationarity.** Translation dynamics on the real line transports a point preparation at zero to a point at elapsed time. This is a valid normalized pushforward and is not invariant. On a circle, two distinct normalized stationary densities with zero current satisfy the same continuity equation; without initial density agreement the current residual does not select one density. These counterexamples delimit the chapter's residual claims independently of its text.
- **Delta jump.** Integrate the stationary constant-mass Schrödinger equation across a shrinking interval containing a potential equal to minus a positive strength times a Dirac delta. The bounded energy term vanishes in the limit, leaving the derivative jump equal to minus twice mass times strength divided by squared Planck constant, times the continuous wavefunction at zero. Finite ordinary jumps lack this singular term, so the derivative remains continuous.
- **Radial boundary form.** Integration by parts in the radial inner product with measure radius squared times radius differential yields the surface term radius squared times conjugate test function times derivative of the state minus derivative of the conjugate test function times the state. The original unconjugated form was not the complex Hilbert-space boundary form. Endpoint vanishing proves symmetry, while equality with the adjoint domain is the remaining self-adjointness condition.
- **Phase circulation.** Integrating the gradient of a globally single-valued differentiable phase action around a closed loop gives zero by the fundamental theorem for line integrals. Nonzero phase circulation requires nontrivial charts or excluded singular structure. The displayed integer rule therefore cannot be a universal consequence of writing momentum as a gradient.
- **Resonance background.** At the quoted resonance center the resonant factor is minus one. With background phase zero the total partial-wave scattering matrix is minus one and the elastic cross-section reaches its unitary maximum. With background phase equal to half pi the extra factor is also minus one, the total matrix is one, and that partial cross-section is zero. Thus the unqualified Lorentzian peak was false even though the quoted scattering-matrix factor is valid.
- **Small-transfer sensitivity.** The first Born Fourier transform at zero wave-number transfer equals the integral of the potential. A narrow nonzero potential changes that integral, so short-distance structure does not enter only at inverse-width transfer. Large transfer resolves structure; low-transfer moments also contain it.
- **Two-dimensional contact integral.** For reduced positive binding energy, the sharp radial wave-number integral gives one equal to dimensionless coupling divided by twice pi, times the logarithm of one plus cutoff squared divided by twice reduced binding energy. Solving this identity yields both existing cutoff formulas. Restoring physical energy multiplies the reduced energy by squared Planck constant divided by mass. The running-coupling identity alone does not independently validate a scattering prediction.
- **Basin weights.** Separately normalizing each nonempty outcome branch gives each branch unit norm. Integrating each branch over its own full support then gives one for every outcome, rather than a normalized outcome distribution. One global normalized effective state and matching outcome regions avoid that error.

All checks above are analytic and do not require numerical instantiations of the wake speed. No Python or simulation was run.

## Live authorities and external verification

Read the full target and applicable repository startup/review instructions. Focused live owner reads included [Ontology, Bell nonlocality placement](../../../../content/markdown/aaa/foundations/ontology.md#bell-nonlocality-placement), the canonical acceleration multiplier in the [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), and the emission/fuel and surface-depletion distinctions in [Energy](../../../../content/markdown/aaa/dynamics/energy.md). Neighboring concurrent drafts were not used as independent references.

Opened Dürr, Goldstein, and Zanghì, [Quantum Equilibrium and the Origin of Absolute Uncertainty](https://bohmian-mechanics.net/files/qe.pdf), *Journal of Statistical Physics* 67 (1992), including abstract and the equivariance/conditional-statistics discussion around PDF pages 34–36. This supports the distinction between equilibrium typicality, its transport, and measurement statistics. It does not derive the causal-wake measure.

Opened Bancal and collaborators, [arXiv:1110.3795](https://arxiv.org/abs/1110.3795), abstract and publication metadata, confirming the finite-speed hidden-influence/no-signalling obstruction. Detailed applicability to the selected substrate response remains the live Ontology proof obligation; this review does not claim a new proof or evasion of the multipartite theorem.

## Validation and preservation

Known-case-first scratch instrument `.tmp/crw-005-pilot/check.cjs` first returned exactly one inline expression and one display expression from a synthetic sample, excluding a fenced example; simple-variable strict KaTeX also passed. Only then was it run on the chapter. It reports 202 strict KaTeX expressions: 30 displays and 172 inline expressions. Displays 14 and 30 are the two justified repairs; the other 28 are byte-identical to the captured clean baseline. Every original viewer target remains unchanged.

The link extractor first returned two known literal targets from a synthetic example. Applied to the chapter, it reports 42 links, including 40 local paths that exist by filesystem resolution; all baseline links are preserved. This does not validate all remote pages or every neighboring heading fragment.

`git diff --check HEAD -- content/markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md` passed. `node scripts/validate-content.mjs --check --strict` passed with 391 scene files, 199 corpus Markdown files, 1757 repository Markdown files, zero errors, zero warnings, and 30 notes, before this receipt. These are content checks, not mathematical or repository-wide health certification. The final small consistency edit retained the same strict-math/link counts; the coordinator owns the joined content rerun.

Generated equation-mapping fingerprints may drift after authored-source edits. No generator write was run; the authorized regeneration/publication procedure owns `node scripts/build-equation-mapping-corpus.mjs --write` and its corresponding check.

## Open obligations

- **PW-O1 — Effective guidance and statistics.** Derive a controlled history closure, effective wave/current, justified preparation measure, and event projection; establish normalization, equivariance, and record statistics together. The repaired comparison equations do not provide that construction.
- **PW-O2 — Spectra and scattering.** Construct stable modes with the required domain, phase corrections, degeneracies, scattering amplitudes, and regulator control using independently extracted evidence. Return residuals and one fixed binding energy do not prove these results.
- **PW-O3 — Bell and observer recovery.** Supply the consistent multipartite coupled apparatus law, no-signalling marginals, finite-speed-obstruction response, and observable-specific Lorentz/clock bounds. Shared provenance and delayed interaction alone do not settle them.
