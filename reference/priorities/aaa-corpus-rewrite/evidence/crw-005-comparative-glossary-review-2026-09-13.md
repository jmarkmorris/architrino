# CRW-005 Comparative Glossary Review — 2026-09-13

## Scope and disposition

Full 182-line review of [Comparative Glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), initially report-only because this is controlled canon. The coordinator explicitly approved the six factual corrections and their specified mapping, notation, and simulation-scope propagation before source edits. Established terms and editorial policy are preserved; this is accepted-content reconciliation, not a terminology-policy revision. Only this source and this receipt are owned by this reviewer.

Baseline SHA-256: `e2bf223eb6a854bf5f2ad6d14c6b5ddbbfbdddabc108130895a73a03d857cde2`.

Reviewed source SHA-256: `37bc5d3b91870f98d80e0e60775af4a173e19984c8c7872d541ab91b62e26e44`.

## Findings and dispositions

- **CG-01 — High, repaired:** AdS Interior incorrectly promoted a certified self-hit into confinement/AdS geometry. The replacement retains the named analogy at heuristic grade and separates root admission from geometric or dynamical recovery.
- **CG-02 — High, repaired:** The final speed table equated instantaneous speed with root identity and absence, and equality with symmetry breaking/planarity. It now scopes its circular comparison, requires actual admitted roots, and preserves interval-history conditions. Binary numbering, regime terms, and heuristic AdS/black-hole comparisons remain.
- **CG-03 — High, repaired:** Pro/anti orientation interchanged polar and angular-momentum axial frames despite their different parity transformations. The polar-frame interpretation now states the mathematical distinction and retains polarity conjugation, ordered indices, degeneracy boundary, and separation from matter/antimatter labels.
- **CG-04 — Medium, repaired:** Holonomy and curvature were conflated and non-Abelian holonomy presented without its covariance qualification. The matrix transforms by basepoint conjugation; trace/conjugacy class are invariant. Local curvature does not determine all global holonomy.
- **CG-05 — Medium, repaired:** Deterministic multistability was treated as nonstandard and native attractor existence as established. Standard deterministic systems can have multiple attractors; the assembly/apparatus realization remains a conditional recovery with complete history and well-posed interval requirements.
- **CG-06 — Medium, repaired:** Measurement interaction implied automatic irreversible outcome formation. The replacement distinguishes candidate durable records and effective irreversibility from an arbitrary interaction.
- **CG-07 — Medium, repaired:** Gauge connection recovery and absence of extra channels were stronger than the gauge owners. Connection recovery is a target and additional channels are constrained by tested null limits, not categorically absent at all scales.
- **CG-08 — Medium, repaired:** Clock-rate redshift, effective scale factor, hybrid response, density effects, refractive gravity, SMBH recycling and Timescape translation overstated achieved constitutive recovery. Compact qualifications now match the cosmology owner; no alternative ontology or new mechanism is introduced.
- **CG-09 — Medium, repaired:** Braid symmetry-breaking and Planck comparison rows implied an established terminal-alignment branch. They retain the proposed target and independent indexed speed burden.
- **CG-10 — Medium, repaired:** Complete ontic universe state was equated with actual simulation ground truth. A finite simulation now explicitly supplies only its declared constituent/history domain.
- **CG-11 — Low, repaired:** Substrate wake, density, delay-factor, and absolute-time notation now uses absolute time and Euclidean coordinates consistently. The effective scale-factor chart is labeled separately. The unchanged GR proper-time formula declares comparison units with effective light speed set to one, without identifying primitive wake speed with that channel.
- **CG-12 — Low, repaired:** A list could imply positive phases as well as positive radii/frequencies. Positivity is now attached only to radii/frequencies; phases retain their independent assignment.

## Owner and primary-source checks

The accepted [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), especially Interval-speed lemma and self-hit conditions, independently requires causal intersections, retained branch floors and history. Its interval-speed argument and persistent-memory clarification directly conflict with instantaneous-only classification. Existing binary, MCB, signed root-playback and unsigned transmitter-weight entries were preserved at their strongest accepted scope.

[Measurement Problem and Collapse](../../../../content/markdown/aaa/philosophy-history/theory-bridges/measurement-problem-and-collapse.md) distinguishes candidate apparatus threshold resolution, durable record formation, preparation measures and effective irreversibility. [Gauge Structure Emergence](../../../../content/markdown/aaa/assemblies/gauge-structure-emergence.md) defines effective connection/holonomy and basepoint conjugation. [Gauge Symmetries](../../../../content/markdown/aaa/assemblies/gauge-symmetries.md) separates flat-connection global holonomy and tested null limits. [Cosmology Ontology](../../../../content/markdown/aaa/cosmology/cosmology-ontology.md), opening and chronology reconstruction, explicitly grades the clock, transport, gravity and recycling mechanisms as recovery routes wherever derivation is absent. The spin bridge was inspected for its discrete-symmetry mapping; the polar/axial correction is independently derived below rather than inferred solely from naming.

David Tong's primary-authored [Gauge Theory, chapter 2](https://davidtong.org/pdfs/teaching/gauge-theory/gauge2.pdf), §2.1.3, equations 2.14–2.15, was retrieved and checked on the review date. Endpoint gauge changes conjugate closed-loop transport; taking the trace gives the Wilson-loop invariant. These are effective mathematical comparison facts, not substrate premises. No new reader-facing bibliography is needed for this definition table.

## Independent checks

The scratch instrument `.tmp/crw-005-comparative-glossary/math.cjs` ran known cases before its relevant target checks: identity determinant and basis-vector cross product; unit wake-separation root and stationary nonroot; identity matrix multiplication and an involution. All passed before the corresponding witnesses.

1. **History versus instantaneous speed:** with normalized wake speed one, uniform straight position `X(T)=2T` has separation `2Δ`, so no positive delay satisfies separation `Δ`. The prescribed history `X(T)=T²` at reception zero and emission minus one has separation/delay one, current speed zero, transmitter speed two, signed transmitter factor minus one, receiver factor one, and finite unit acceleration weight. These are kinematic counterexamples to an instantaneous classification, not solutions of the Master Equation or retained physical branches.
2. **Interval bound:** absolute continuity and the triangle inequality give endpoint distance at most the integral of speed. A strict sub-field-speed bound over the entire retained interval excludes a positive-delay self-root. This directly supports the corrected necessary condition, not an existence or stability claim.
3. **Parity:** inversion changes the determinant of a three-vector polar basis from plus one to minus one. Reversing both factors in each cross product leaves every axial vector unchanged. Thus the determinant of three angular-momentum axial vectors is parity-even.
4. **Holonomy:** conjugating a diagonal matrix with entries one and minus one by the basis-swap matrix changes the matrix but preserves its zero trace. The separately verified matrix multiplication supplies a concrete covariance witness. For the local/global distinction, a flat Abelian connection proportional to the angular differential on a punctured plane has zero local curvature but nontrivial loop phase for a noninteger normalized coefficient.
5. **Multistability:** the smooth comparison flow `xdot=x−x³` has equilibria minus one, zero and one; derivative values minus two, one and minus two establish two locally stable fixed points and an unstable separator. This verifies that deterministic multistability is ordinary mathematical behavior, without importing this equation into architrino dynamics.

## Preservation, validation and limits

`git --no-optional-locks status --short -- content/markdown/aaa/archie/comparative-glossary.md` returned no source changes before this review. The known-case-first scratch check parsed and rendered all 188 final inline expressions through strict KaTeX; there are zero displays and zero Markdown links. All original table-row labels are retained and the entire Term to Avoid / Phase Out policy block is byte-identical to baseline, checked by direct Node comparison after a known two-label input. The source remains 182 lines. Scoped `git diff --check HEAD -- content/markdown/aaa/archie/comparative-glossary.md` passed.

The checks establish this bounded document's mathematical syntax, selected independent distinctions and preservation. They do not establish browser behavior, corpus-wide closure, complete gauge/cosmology recovery, or physical branch existence. No generator, runtime, publication, shared tracking, or neighbor source was edited.

- **CG-O1:** Physical self-hit branches still require admitted history, floors, acceleration closure and stability; the kinematic witnesses do not supply them.
- **CG-O2:** Gauge, clock, gravity, Planck/alignment and cosmological maps retain their technical owners' unresolved constitutive and observational obligations.
- **CG-O3:** Coordinator adjudication and joined validation remain the separate integration step. A failed same-source syntax check, changed policy block, contrary parity transformation, or documented retained derivation contradicting these grades would reopen the corresponding finding.
