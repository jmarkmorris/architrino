# CRW-005 Mathematical Terminology Review — 2026-09-13

## Scope and disposition

Full 151-line review of [Mathematical Terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), with controlled-canon authority limited to factual/mathematical corrections against accepted content. Established symbol families, naming rules, all table rows and existing links remain. The changes clarify definitions and domains; no new terminology policy is introduced. Only the source and this receipt are reviewer-owned.

Baseline SHA-256: `f59f1ec26799f09137b3955a7671cb0bc317c02e27b78daa30857011051a1155`.

Final reviewed source SHA-256: `c11973d85706ac6644bdc3c42f56b679b827bd647802188333c1b228d8e83234`.

## Findings and dispositions

- **MT-01 — High, repaired:** Worldlines and mollified dynamics were called ordinary ODEs without their history state. The product-manifold, velocity, mollifier, EOM and hit entries now retain delayed history dependence and distinguish regular sharp acceleration from actual impulse atoms.
- **MT-02 — High, repaired:** Surface mollification was said to guarantee smooth trajectories, gradients, finite energy and a weak limit. Surface and core control, history regularity, summability and limit existence remain separate requirements. A regulator is a procedure, not proof of convergence.
- **MT-03 — High, repaired:** A local implicit-function theorem was promoted to existence/global uniqueness of causal roots. The existing-simple-root local theorem is now separated from interval-wide monotonicity and existence conditions.
- **MT-04 — Medium, repaired:** The point value of the Heaviside function was treated as a distributional removal rule. The causal-root endpoint prescription is explicit; changing a locally integrable function at one point does not change its distribution, and endpoint delta products require their own convention.
- **MT-05 — High, repaired:** Potential bookkeeping and a conversion scale were presented as sufficient for a conservative acceleration mapping and kinetic/potential balance. Conservative recovery, explicit time dependence, work and exchange channels now determine the scope. Normalized emission does not prove global conserved charges.
- **MT-06 — Medium, repaired:** Pro/anti orientation conflated polar and angular-momentum axial frames. The polarity-handedness sign additionally failed at a nonzero dipole perpendicular to spin. It now uses the existing polarity-dipole term, a nonzero scalar product, and the stated transformation rules; ordinary momentum helicity is a different quantity.
- **MT-07 — Medium, repaired:** Complete universe state was equated with a finite simulation's actual ground truth. Simulation coverage is limited to its declared constituent/history domain.
- **MT-08 — High, repaired:** Mandatory dressed-speed convergence to primitive wake speed and a primitive/effective speed-difference bound were inferred from homogeneous conditions and Lorentz leakage. Constitutive recovery and observer-channel calibration now remain separate, consistent with the selected ontology route.
- **MT-09 — Medium, repaired:** Shape closure, metric recovery, stiffness response and terminal alignment were promoted beyond their retained scope. They remain targets or conditional mappings, with stiffness linearization requiring a real equilibrium or relative equilibrium.
- **MT-10 — Medium, repaired:** Spherical-coordinate index operations and gradient components were stated as Cartesian operations. The inverse metric and metric-raised gradient are explicit; curl identities retain their differentiability/distribution domains.
- **MT-11 — Medium, repaired:** The Euclidean group omitted reflections. Full Euclidean isometries and the proper-rotation subgroup are distinguished, without asserting that every assembly or environment is invariant under either.
- **MT-12 — Medium, repaired:** Inverse-square behavior was categorically nonintegrable and removable by excluding a point. Volume versus radial/time measures now expose the correct distinction; a measure-zero deletion does not control a neighboring divergence.
- **MT-13 — Medium, repaired:** A stationary surrogate seemed to retain the original moving transmitter's Jacobian weight. With equal polarity and coupling its own weight is one, so equal single-hit amplitude requires adjusted separation. The equivalence is local, not a full-history equivalence.
- **MT-14 — Medium, repaired:** Basin measures implicitly supplied probabilities without a justified preparation measure; finite-window outcomes and asymptotic attraction were also blurred. Their distinct domains and probability/conditioning requirements are now explicit.
- **MT-15 — Medium, repaired:** Superposition implied general near-source dominance and distant phase cancellation. Counts, correlations, geometry, weights and retained history are required to establish either aggregate claim.
- **MT-16 — Low, repaired:** Dimensional wake speed was equated with a pure number. Reference scales now give dimensionless speed one; epochs and normalization durations remain distinct.
- **MT-17 — Low, repaired:** Lorentz-factor, logarithm and normalized-density domains were incomplete. The real sub-channel-speed domain, positive dimensionless log argument and positive reference density of the same type are explicit. Number and effective mass density require declared units.
- **MT-18 — Low, repaired:** The fixed-distance delta identity could be misapplied along moving histories. Its fixed-separation scope is explicit; the derivative of the full moving causal constraint gives the transmitter factor. A raw absolute-value pair in a table cell was converted to equivalent TeX delimiters to avoid splitting Markdown columns. Electric-bookkeeping normalization no longer purports to derive conservation.

## Technical-owner checks

The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) was checked at its regular-root continuity discussion, dual surface/core regulator, finite-memory regularity conditions, endpoint exclusion, energy-diagnostic boundary and stationary-surrogate section. In particular its simple-root paragraph at line 2444 says the sharp delta collapses to a continuous reception-time contribution under the stated floors. Its surface/core distinction at line 793 defeats a claim that a surface Gaussian alone regularizes coincidence.

The [PPN owner](../../../../content/markdown/aaa/spacetime/ppn-parameters.md) explicitly restricts the clock/potential map and equilibrium-dependent weak-field expansion. [Ontology](../../../../content/markdown/aaa/foundations/ontology.md) retains the selected primitive/effective causal-channel distinction. The accepted [Comparative Glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md) distinguishes effective recovery, admitted histories and finite simulation coverage. [Terminology Usage](../../../../content/markdown/aaa/archie/terminology-usage.md), line 173 in the reviewed snapshot, explicitly identifies the handedness vector as the polarity dipole. No standard dynamical law is imported into substrate reasoning by these corrections.

## Independent mathematical checks

The instrument `.tmp/crw-005-mathematics-terminology/math.cjs` passed its known arithmetic/square-root inputs before the numerical witnesses and its known two-row table input before source preservation checks. The arguments below are independent of edited prose; the script evaluates the stated concrete cases rather than comparing two implementations of the glossary.

1. With normalized wake speed one, a stationary transmitter at distance two has causal equation `2−Δ=0`. There is no root in retained delays between zero and one, despite strict sub-field-speed motion; extending the retained interval admits the unique delay two. Local root continuation does not supply existence on every retained interval.
2. Histories `φ₁(t)=1` and `φ₂(t)=1+t` share their value at zero but differ at minus one. The comparison delay equation `xdot(t)=x(t−1)` therefore has different derivatives at the common instantaneous state. Replacing singular kernels by smooth kernels does not establish finite-dimensional instantaneous-state sufficiency.
3. At radius two and polar angle pi/2, the spherical metric is diagonal with entries one, four, four; its inverse is one, one-quarter, one-quarter, not the identity. Their products were checked directly.
4. The three-dimensional integral of inverse-square radius over a unit ball is `4π`, because the volume element contributes radius squared. The radial integral from positive cutoff to one is `1/cutoff−1` and diverges as the cutoff vanishes. The underlying antiderivatives establish the distinction; sampled cutoffs are only checks.
5. For one hit at separation three with positive weight four, the stationary surrogate at separation one-and-a-half has weight one and the same acceleration factor four-ninths. All wake-speed numerical examples use primitive speed one.
6. In a declared effective comparison, potential `U(t)=t` has zero spatial force and constant kinetic energy, yet the derivative of total kinetic-plus-potential energy is one. The general chain rule gives the missing explicit-time term; the example is not a substrate law.
7. A nonzero polarity dipole along the first axis and spin along the second axis have zero scalar product, so they cannot produce a two-valued handedness sign. The polar/axial determinant calculation already independently retained in the Comparative Glossary receipt establishes the separate orientation distinction.
8. The Heaviside distribution acts by integrating a test function over a half-line; its value at the single endpoint contributes zero to that integral. Endpoint delta evaluation is a different operation requiring a prescribed product. Similarly, integrating a normalized Gaussian over only one half of its symmetric full-line support gives one-half, so domain restriction cannot silently retain normalization.
9. A fixed-distance delta substitution has derivative minus primitive wake speed. Along a moving transmitter path, differentiating the distance contributes the transmitter velocity projected along the line of action; hence the full derivative is the signed transmitter factor. This preserves the existing unsigned acceleration weight and signed root-playback distinction.

## Validation and preservation

Initial `git --no-optional-locks status --short -- content/markdown/aaa/archie/mathematics-terminology.md` returned no source changes. Known-case-first `.tmp/crw-005-mathematics-terminology/check.cjs` passed strict KaTeX for all 443 final inline expressions, with zero displays. It preserved both existing links and verified their local target files. The independent table count retained all 128 table rows and all 151 source lines. Scoped `git diff --check HEAD -- content/markdown/aaa/archie/mathematics-terminology.md` passed. No broad validator, browser run, generator, runtime edit, shared-record edit or Git publication was performed.

## Open obligations

- **MT-O1:** Master Equation line 2398 still calls its position equation an ODE even though the right side depends on delayed history; its line 2444 already supplies the corrected simple-root continuity distinction. This exact neighboring propagation issue is routed to the coordinator, not edited here.
- **MT-O2:** The associated Terminology Usage orientation and nonzero-scalar-product domains require the next assigned bounded review. Established terms are preserved; their mathematical realization and physical retention are not supplied by this glossary.
- **MT-O3:** Constitutive, conservative-energy, Born, stable-braid and regulator-limit claims remain with their technical owners. A counterexample to the stated local derivations, a failed same-source check, or a retained independent derivation establishing a stronger domain would reopen the corresponding finding.
- **MT-O4:** Coordinator full-diff adjudication and joined validation remain the integration step. Scoped mathematical syntax and illustrative counterexamples are not theory or repository closure.
