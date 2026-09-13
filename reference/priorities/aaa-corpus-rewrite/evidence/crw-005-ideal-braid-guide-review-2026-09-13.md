# CRW-005 Ideal Braid Guide review — 2026-09-13

## Scope and disposition

Reviewed the full 245-line baseline and final source of [Ideal Braid Guide](../../../../content/markdown/aaa/archie/ideal-braid-guide.md), its scoped diff, and the implementation passages listed below. Seven bounded findings repaired in the guide. No runtime, fixture, generated, shared-record, artwork, or Git writes. This is an explanatory-document disposition, not a retained dynamical branch or scientific closure.

Baseline SHA-256: `5339925238c577ba392c7b26cf0a4f03f2c426346d2ddacd661e508f41c20a8d`.

Final source SHA-256: `8986984b2e4b682091e3d998bceb6d5ea5b7e1fc8ea71ea140343780ca6a8792`.

The scoped status was empty before editing. Source inspection and SHA-256 refer to this checkout snapshot; concurrent neighboring work is not attributed to this review.

## Findings and independent evidence

- **IB-01 — medium, repaired: energy-frame terminology.** The existing label E_CM is preserved as a display identifier, but gamma times rest energy is moving-frame total energy. Center-of-mass-frame energy is rest energy. Independently, for normalized rest mass and wake speed equal to one, beta zero gives energy one, while beta 0.6 gives gamma 1.25 and moving energy 1.25; the rest value remains one. The guide no longer calls the latter center-of-mass energy. The unchanged implementation computes precisely these numbers in `src/apps/ideal-braid/IdealBraidRuntime.js:178–210`; `ideal-braid.html:1010–1040` labels total energy E_CM. A later app-label cleanup belongs to the runtime/UI owner, not this review.
- **IB-02 — medium, repaired: domain and channel.** Aspect ratio determines the magnitude of the velocity fraction, not its sign; the guide now states the nonnegative slider domain. At beta one the longitudinal axis vanishes and gamma diverges, so no finite invertible Lorentz chart exists there. Runtime lines 178–210 and the maximum at line 62 implement that formal endpoint. The primitive wake-speed comparison does not establish an effective photon or clock speed. [Lorentz Kinematics](../../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), lines 53–55, expressly separates those channel maps.
- **IB-03 — medium, repaired: scale normalization.** The ellipsoid volume is four pi over three times the product of its semiaxes. Thus the relative volume with an additional scale is the cube of lambda(v)/lambda(0), divided by gamma. Defining positive lambda with lambda(0)=1 preserves the valid displayed formula and removes its missing baseline assumption. No new scale-channel implementation is claimed.
- **IB-04 — medium, repaired: time and heuristic.** The two intervals now refer to the same cycle events in the declared constant-velocity Lorentz comparison, not an automatic identification with absolute time T. The causal-budget explanation is a prescribed-family heuristic. [Return-Cycle Lorentz Quantization](../../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md), lines 33 and 482, separates the channel convention and ansatz algebra from evolved dynamics. The app assigns its time ratio directly to gamma; that is visualization evidence only.
- **IB-05 — medium, repaired: units of the energy ratio.** Rest mass divided by energy has dimensions of inverse speed squared. Multiplication by squared wake speed produces the dimensionless rest-energy fraction xi. Numerical equality under the stated normalized units is retained; dimensional equality without that normalization is not asserted.
- **IB-06 — low, repaired: transport control name.** The actual runtime at lines 1491–1504 uses Pause/Play. The guide previously said Pause/Resume. Keyboard handlers at lines 1879–1910 support all listed keys and the larger Shift rotation step.
- **IB-07 — medium, repaired: binary speed normalization.** Runtime lines 224–241 and 1430–1455 compute raw circular path speeds, select binary index one as the reference, and divide by that reference. The guide now describes a changing display unit, with normalized wake speed one, rather than suggesting that resizing changes the primitive physical speed. The circular path formula remains exact for the prescribed uncontracted circular parameterization; it is not a measured speed along an evolved EOM trajectory.

## Supported unchanged statements

The orbital-limit claim is supported by the actual geometry code. Runtime lines 257–297 rotate each rest normal toward the common unit vector and apply the linear map whose eigenvalues are one, one, and xi; lines 1593–1602 apply that map to the displayed contents. At xi zero, all rotated planes are perpendicular to the common vector. The map is the identity on those planes, so concentric circular orbits remain circles in the limiting plane. This is an exact property of the prescribed display, not proof of dynamical alignment.

The Cycle slider advances model time by elapsed animation time multiplied by its speed factor (`IdealBraidRuntime.js:1778`); it does not change the directly assigned gamma and xi. Surface analysis remains explicitly display-only. No browser interaction, screenshot, solver acceptance, or performance result is claimed.

## Verification

Known cases ran before target evaluation. The independent algebra used the rest factor and unit-sphere volume, then checked the exported runtime functions at beta zero and 0.6 in normalized wake-speed units. Results: gamma 1 and 1.25, xi 1 and 0.8, total energies 1 and 1.25, contraction determinants 1 and 0.8. At beta one, gamma is infinite and the longitudinal radius is zero. Separate vector checks verified all three limiting normals and unit lengths of both transformed in-plane basis vectors. These comparisons use elementary closed forms independent of the runtime; no oracle or subject code changed.

The custom TeX, display, and Markdown-link extractors first passed small known inputs, including a fenced link excluded from extraction. They then measured 58 strict KaTeX expressions, 16 displayed equations, 20 links, and 9 headings in the final guide. All 16 display strings, all ordered links (including viewer identities), and all headings equal HEAD exactly. Every local link path exists. This establishes path preservation, not regenerated equation-viewer freshness.

`node scripts/validate-content.mjs --check --strict` passed with zero errors and zero warnings (199 corpus Markdown files and 1808 repository Markdown files in that run). `git diff --check HEAD -- content/markdown/aaa/archie/ideal-braid-guide.md` passed. Direct final two-file whitespace and local-link checks include this new receipt; no generator write was run.

## Remaining obligations and limits

The UI owner may replace the ambiguous E_CM label through a separately scoped runtime change. The guide deliberately preserves its current identifier and arithmetic. A retained branch must still establish the geometry, time, ruler, effective-channel, and energy maps; agreement among assigned display formulas cannot do so. The current inspection did not run a dynamical simulation or certify the complete application. No editorial or branding policy change is proposed.
