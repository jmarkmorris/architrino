# CRW-005 Relativistic Scalar Fields and Klein-Gordon review — 2026-09-13

## Scope and disposition

Full 337-line baseline and complete resulting diff reviewed for [Relativistic Scalar Fields and the Klein-Gordon Equation](../../../../content/markdown/aaa/philosophy-history/theory-bridges/klein-gordon-scalar-fields.md). This chapter and receipt are the only assignment writes. No runtime, fixture, neighboring chapter, shared record, generated artifact or Git/index write occurred. The preceding Bell supplied-context clarification was a separately requested completion before this assignment began.

The live AGENTS/router and review skill, reviewer/integrator/closure-verifier owners and relevant theory/style canon govern the bounded review. Standard scalar/QFT/GR results below are explicitly effective comparisons, not substrate premises. No numerical primitive wake speed other than normalized c_f=1 is introduced; the numerical probes are abstract scalar comparison algebra.

Baseline SHA-256: `2b9d097e97542616e20a5571e8dcf57efcd099c05079a0fd266d92c887ef71e9`.

Final chapter SHA-256: `d4133f8c8c9b7e6fba932c232d3d8f17bf420f1e4e8b22d910d7648f1215e467`.

Disposition: bounded mathematical and claim-scope repairs completed. Scalar constitutive recovery, equilibrium, energy/action calibration, and quantum occupation remain unproved targets. This receipt does not claim a derived Klein-Gordon sector or physical scalar interface.

## Findings and repairs

| ID | Severity | Finding and disposition |
| --- | --- | --- |
| KG-01 | Medium | A one-component density was too readily identified with a Lorentz scalar. Scalar Field Meaning and Source Terms now require the transformation law, invariant/source measure, effective chart, and source units; regularization alone establishes none of these. A density per coordinate volume changes under volume-chart transformations even though it has one component. |
| KG-02 | High | The self-adjoint neutral-field expansion was presented for every scalar field; coordinate increments were confused with occupation increments. Mode Dictionary limits the preserved expansion to real neutral fields, identifies independent antiparticle creation for a complex field, and distinguishes discrete oscillator energy from the continuous coordinate spectrum. Operator/dictionary recovery remains proposed. |
| KG-03 | Medium | Normal-mode and curved-background particle language omitted stable positive-frequency, boundary and state conditions. The chapter now requires a self-adjoint retained spatial operator and positive-frequency modes, separates zero/unstable modes, and declares curved-background mode/vacuum choice. A general time-dependent background need not supply a unique positive-frequency split. |
| KG-04 | High | The curved action contains an additional potential while its displayed equation omitted the derivative. The free display is preserved and explicitly limited to constant additional potential; the interacting equation including minus V' is stated. Double-counting the separately written quadratic term is excluded. Field/action normalization, fixed boundary data and source sign are stated. |
| KG-05 | Medium | Einstein's equation omitted c^-4 despite explicit c elsewhere and physical stress-energy interpretation. The sole display correction restores 8piG/c^4, specifies physical energy-density units and the displayed zero-cosmological-constant convention, and preserves its viewer identifier. |
| KG-06 | High | Spatial free energy alone was claimed to give a second-time-derivative equation. Variational Scalar Closure Benchmark now supplies an explicit conditional positive kinetic action, K/chi speed ratio and V''/chi gap ratio. A retained equilibrium, self-adjoint domain, and controlled suppression of delayed memory/damping/higher derivatives are independent requirements. An extremum of a guessed functional is not proof of substrate equilibrium. |
| KG-07 | High | Two locally stable vacua were enough for a claimed static finite-energy interface; piecewise baseline subtraction obscured unequal vacuum energies. The first integral proves equal vacuum values necessary under vanishing endpoint gradients. The preserved cost display now subtracts that common value. Existence, finite cost and stability remain additional conditions. |
| KG-08 | Medium | Frequency gap, stiffness and mass were too directly identified and time charts reused without calibration. Flat and absolute-slice sections now distinguish their clock/ruler maps, give coefficient units and stable domains, and require independent action/energy and mass-response calibration. Zero modes need classification and possible higher-order analysis rather than automatic symmetry attribution. |
| KG-09 | Medium | Cosmological shift-symmetry/coupling and target language was too broad. The chapter states canonical positive-potential dominance and small kinetic-density assumptions for w near -1, marks the constant field-shift symbol, limits symmetry protection, requires spacetime variation and normalized coupling for bulk polarization rotation, and keeps these speculative cosmological models optional. Full admitted histories replace an instantaneous-only universe-state inventory. |

Four high and five medium findings. No score or scientific promotion was made.

## Independent reasoning and source evidence

### Variational and dimensional checks

For the mostly-plus action density minus one-half of the derivative contraction minus one-half M-squared phi-squared minus V(phi), integration by parts with fixed boundary data yields box(phi)-M-squared phi-V'(phi)=0. Choosing an additional quartic V= lambda phi^4/4 gives a missing lambda phi^3 term unless the free restriction is made. This direct variation independently supports KG-04 and does not depend on any runtime or corpus equation replay.

With a proposed local kinetic density chi times phi-dot-squared/2, variation yields chi phi-double-dot = K Laplacian(phi)-V'(phi). About an actual constant equilibrium, the dispersion is omega-squared=(K k-squared+V'')/chi. The same spatial functional also admits gradient-flow dynamics, phi-dot=-mobility times its functional derivative, which is first order and relaxational. Thus spatial free energy does not select the Klein-Gordon time law. Positive chi and the retained fluctuation spectrum are required for the stable conservative comparison.

Dimensional check: K/chi has length-squared/time-squared units; V''/chi has inverse-time-squared units. With physical energy density T, G times T has length-squared/time-to-the-fourth units, so division by c-to-the-fourth gives inverse-length-squared, matching curvature. No choice of field normalization removes that factor from Einstein's equation while retaining the stated physical stress units.

Multiplying K phi''=V'(phi) by phi' makes the derivative of K(phi')^2/2-V vanish. At two constant endpoints with decaying derivative, this forces equal V. Subtracting different constants in the cost cannot change this dynamical first integral. For the known double-well V=(phi^2-1)^2/4 and K=1, phi=tanh(x/sqrt(2)) solves the equation and has zero first-integral constant with degenerate vacua. This supplies an independent positive reference; tilted nondegenerate vacua fail the endpoint equality, regardless of piecewise energy subtraction.

The standard oscillator position operator acts by multiplication on square-integrable functions on the real line and has continuous spectrum; the oscillator Hamiltonian has a discrete ladder. Equal occupation steps therefore do not require discrete coordinate values. For a free complex scalar, two real components give two independent oscillator species. Combining them into a non-self-adjoint field requires separate particle and antiparticle operators.

### Primary and author-owned sources

- [David Tong, Classical Field Theory](https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S1.html), inspected HTML lines 48–105, Eqs. (1.7)–(1.19): action variation, quadratic kinetic term, arbitrary potential derivative, and a contrasting first-order field equation. Tong uses the opposite metric signature; the receipt's variation explicitly translates the signs to this chapter's mostly-plus convention.
- [David Tong, Free Fields](https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S2.html), oscillator/free-field sections and inspected lines 322–356, Eqs. (2.142)–(2.150): two operator species for a complex field, non-Hermiticity, and particle/antiparticle occupation. This is author-owned effective comparison instruction, not evidence of a substrate realization.
- [Sean Carroll, Quintessence and the Rest of the World](https://arxiv.org/abs/astro-ph/9806099), abstract lines 16–17: light-scalar long-range/time-varying-coupling concerns, approximate symmetry and surviving pseudoscalar electromagnetic coupling. A constant coefficient multiplying F dual-F is a bulk total derivative in the ordinary source-free local comparison; rotation requires the relevant coefficient variation and boundary/path conditions. This mathematical qualification does not assert observed cosmic birefringence.

## Live owner checks

- [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md), inspected lines 165–185: the homogeneous constitutive equilibrium is an open predicate; clock/ruler/signal matching is an effective recovery condition. A scalar speed alone is insufficient for metric recovery.
- [Noether sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), constitutive passages including lines 434–459: fitted equation defects do not control omitted histories; an independent memory remainder and shared constitutive map are required.
- [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md), inspected lines 300–340 and relevant scalar normalization passages: a gap/rest-energy equality requires a common independently justified energy reference and response map; it is not automatic. The chart's dimensionless normalization and accepted branch cannot be supplied by a frequency label.
- The existing Master Equation compatible-history and acceleration-first constraints remain the underlying authority. No action principle or scalar field is inserted as a substrate axiom; the new action is expressly conditional effective comparison. Recently repaired Theory Mapping and Quantum Operator Mapping supply the same mapping-versus-recovery boundary.

No named runtime or fixture in this chapter claims to implement this scalar bridge. No new solver run was represented as evidence; the independent checks here are algebraic comparisons and authored-content validation.

## Verification and preservation

Known-case-first instrument order was explicit: math extraction returned two spans from one inline and one display while skipping code; the Marked link extractor skipped fenced syntax; invalid KaTeX threw. Only then did the instrument read baseline/current chapter, strictly render all 116 current TeX spans (97 baseline), compare displays, headings and links, and resolve local paths.

Measured preservation: 25 displays, 24 byte-identical. The only changed display restores c^-4 under `corpus-equation-7f9a29c430d6ae13`. All original headings and all original links/viewer identities remain. There are 31 current links, of which 30 are local and resolve to existing target files. Path checks do not certify every fragment or remote URL.

Known-case-first independent numerical checks: the quartic kink center returned zero equation defect before checking five points x=-3,-1,0,1,3, each with equation and first-integral defects below 1e-15. The dispersion probe first returned zero for a gapless zero-wave-number mode, then returned 3 for K=1, chi=2, V''=2, k=2. These evaluate separately derived analytic formulas, not a candidate dynamics implementation or a same-source fixture.

`node scripts/validate-content.mjs --check --strict` passed before receipt creation with 199 corpus Markdown files, 1766 repository Markdown files, zero errors and zero warnings; existing informational scene-link notes remain. `git diff --check HEAD -- content/markdown/aaa/philosophy-history/theory-bridges/klein-gordon-scalar-fields.md` passed. The receipt receives a final two-file direct whitespace/path/hash check after creation. No generation or publication was performed.

## Remaining obligations and limits

1. Establish an admissible balanced branch and derive the scalar projection, its transformation law, kinetic coefficients, and delayed-memory approximation with domain/error control.
2. Derive the action/energy/occupation and observer clock/ruler maps before interpreting a gap as physical mass or a ladder as particles.
3. For any proposed interface, demonstrate equal-vacuum static existence, finite cost, retained fluctuation spectrum and nonlinear/delayed stability. A known quartic comparison kink supplies no substrate interface.
4. Select cosmological, nonminimal-curvature or pseudoscalar comparisons only when the claimed physical role requires them; their existence as models does not enlarge mandatory theory targets automatically.

These obligations remain scientific work. Coordinator integration is a separate shared-record step; this bounded review supplies no whole-corpus or physical closure verdict.
