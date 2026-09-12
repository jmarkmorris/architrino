# CRW-005: Condensed Matter bounded review and repair

## Disposition and scope

Priority 47, reviewed on 2026-09-12. The [Condensed Matter chapter](../../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md) received direct, claim-preserving repairs for CM-01 through CM-15: 15 finding groups, comprising 8 high and 7 medium severity groups. Severity describes the consequence of the chapter's wording or mathematical inference, not an observed failure of nature or of the EOM solver. Each group below has a demonstrated textual or conditional-mathematical issue; grouping related repairs does not imply one distinct defect per group.

The complete baseline (865 lines) and complete final chapter (871 lines) were read using numbered and unnumbered `sed` ranges. This is a bounded assurance review by the repairing agent, with separately checkable algebra, counterexamples, and external effective-theory references. It is not a second independent human or agent review. Agreement with the chapter parser establishes structural consistency only; the proofs below, not parser parity, supply the mathematical evidence.

The operator authorized edits only to the chapter and this newly created report. Startup `test -e` found the report absent, and scoped `git --no-optional-locks status --short` showed no pre-existing changes to either allowed path. All task-authored file writes were `apply_patch` calls to those two paths. No shared status, priorities, work queue, work log, generated output, fixture, or other source was edited. No staging, commit, push, publication, regeneration, or linked-worktree operation was performed. This report is the handoff to the coordinating owner; it does not update that owner's completion state.

## Hash and concurrency record

The supplied baseline was verified with `shasum -a 256 content/markdown/aaa/nuclear-atomic/condensed-matter.md` before the initial chapter edit. The same measurement was repeated before each subsequent chapter patch, checking the preceding task-owned state. The original baseline cannot remain the current-file hash after an authorized edit; its immutable comparison copy was verified separately with `git show 66e0e47de3797be86855acf6318aaab6c503031c:content/markdown/aaa/nuclear-atomic/condensed-matter.md | shasum -a 256`. That command reproduced the supplied baseline hash. Each report patch also rechecked the chapter hash. No intervening unexpected chapter hash was observed at these gates; this is a sequence of observations, not a filesystem lock.

| State measured by shasum | Chapter SHA-256 | Change |
| --- | --- | --- |
| Baseline | `f8feb353e8c9655c9de0603f54439e32467d014d1b495884f9ab31b97d30e8a2` | Full pre-edit chapter; also reproduced from the commit above |
| First repair batch | `f006bbaeeacb16f068150dfcc882cd8f98061e9cb29858f269a0d55e88f782a4` | Bounded repairs and effective-comparison references |
| Link repair | `c8feccc5be8c0cb11ecb7b78fd41ff18da8996e1a67bee7877ccbdfdba08edfa` | Corrected the newly introduced photon link to its live theory owner |
| Sentence repair | `badaf5c91b2a1c3ea204c94d25fb294f5ee1d8b39121feb5d9b522b2a540d71a` | Completed the support-cell definition sentence |
| Final chapter | `80b7ef0c631746c7fa4df313fdfab34019994fa48476ad40f51e1e307b0d8523` | Made the harmonic-matrix implication sufficient, and exact Hall quantization explicitly zero-temperature |

Baseline line references below mean the immutable baseline, obtained with `git show 66e0e47de3797be86855acf6318aaab6c503031c:content/markdown/aaa/nuclear-atomic/condensed-matter.md | nl -ba`. Final line references mean `nl -ba content/markdown/aaa/nuclear-atomic/condensed-matter.md` at the final hash. A different hash or altered referenced passage invalidates these line-bound receipts and requires reinspection.

A later scoped `git --no-optional-locks status --short` snapshot showed the chapter staged (`M `) and the report staged with newer unstaged edits (`AM`). No staging command was run by this task; the identity of the actor changing the index was not established. `git show :content/markdown/aaa/nuclear-atomic/condensed-matter.md | shasum -a 256` matched the final chapter hash, while the staged report hash was `6cf88766dc5fc6cf61f349d74a9d3525fd05cda32ab38771898ad3f9c31e9dae` and its working-file hash before recording this note was `fe5be891df263cdd3520a8e6456d2f1a9f0ea086d2eb3677eeab1005dba0e89c`. That snapshot demonstrates that the index did not yet contain this completed report. The index was left untouched. A subsequent scoped `git diff HEAD --check -- content/markdown/aaa/nuclear-atomic/condensed-matter.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-condensed-matter-review-2026-09-12.md` passed with exit 0, covering staged plus unstaged changes. The coordinating owner must inspect the current working report, not assume the earlier staged snapshot contains these final receipts.

## Sources and live owners inspected

The review used the architrino-review skill's bounded corpus-review route because the task explicitly requested review and repair. The operator's two-path direct-repair authority overrides the review owner's normal consult-first procedure; it does not authorize shared integration or promotion of physical claims.

- Startup and execution: [AGENTS.md](../../../../AGENTS.md) in full; [generated startup router](../../../op/agent-startup-orientation.generated.md); [review skill](../../../../.agents/skills/architrino-review/SKILL.md) and its [maintained owner](../../../op/skills/skill-architrino-review.md); [skills policy](../../../op/skills/README.md); [corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md); [coordination owner](../../../op/codex-multiprompt.md); [execution procedure](../../../op/codex-goal-seeking-prompt-template.md); [theory orientation](../../../op/theory-orientation.md); [operator explanation standard](../../../op/operator-explanation-standard.md).
- Live assignment context: [review status](../corpus-review-status.md), [work queue](../work-queue.md), and [priorities](../priorities.md), specifically the CRW-005/priority-47 context. Historical queue text was not treated as permission to alter shared ownership.
- Task-relevant canon: [academic style](../../../../content/markdown/aaa/archie/academic-style-guide.md), [mathematics style](../../../../content/markdown/aaa/archie/mathematics-style-guide.md), [mathematics terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [terminology usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [comparative glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md), and the source-selection/AI-review sections of [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md). The glossary inspection was selective: primitive/effective mass, inertia, medium, and connection terminology.
- Primitive layer: relevant opening definitions in [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), and [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), plus the energy/accounting boundaries in [Energy](../../../../content/markdown/aaa/dynamics/energy.md).
- Nearby assembly and medium owners: [Particle Masses](../../../../content/markdown/aaa/assemblies/particle-masses.md), especially its opening response-center, exposure, reference-energy, and small-group-velocity assumptions; [Noether Sea](../../../../content/markdown/aaa/spacetime/noether-sea.md), opening population and response definitions; [Pro/Anti Coupling](../../../../content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md), channel distinctions; [Molecular Exclusion](../../../../content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md), opening hypothesis and excluded-volume levels; [Molecular Geometry](../../../../content/markdown/aaa/nuclear-atomic/molecular-geometry.md), opening provisional geometry; [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), channel thresholds and element-dependent sea-response section; [Braid Envelope Geometry](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md), dynamic exclusion and packing; [Electroweak Bosons](../../../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md), photon hypothesis. Nearby-owner inspection was task-relevant, not a complete downstream review. A photon app guide was inspected during link resolution but was not used as evidence of a physical photon branch.
- Structural instruments: [equation corpus generator](../../../../scripts/build-equation-mapping-corpus.mjs), particularly parsing, source-context records, and check/write branches; [equation corpus tests](../../../../tests/equation-mapping-corpus.test.js); [strict content validator](../../../../scripts/validate-content.mjs); and the vendored KaTeX loader. The generator binds formula text, source locations/context, symbols, and semantic viewer identities into a generated registry; stable viewer links do not imply a fresh registry.

External readings were restricted to effective comparisons and source verification, not imported primitive laws:

- David Tong, *Solid State Physics* (2017), [Electron Dynamics in Solids, §§3.1–3.2](https://davidtong.org/pdfs/teaching/solid-state-physics/solidstate3.pdf): independent-band filling and transport assumptions. [Phonons, §§4.1–4.2](https://davidtong.org/pdfs/teaching/solid-state-physics/solidstate4.pdf): equilibrium harmonic expansion, mode accounting, and the long-wavelength elastic comparison. These support CM-05/CM-06 at effective grade, not a native material solution.
- David Tong, *Lectures on the Quantum Hall Effect* (2016), [arXiv:1606.06687](https://arxiv.org/abs/1606.06687), especially [chapter 2, §§2.2–2.3, printed pp. 60–65](https://davidtong.org/pdfs/teaching/quantum-hall-effect/qhe2.pdf): fixed occupied bands, local Berry connection, curvature, Chern sign convention, and filled-band Hall response. The existing minus sign in the chapter's Chern formula was retained; the missing domain and patch assumptions were repaired.
- Nai-Chang Yeh, [Conventional Superconductivity, Summer 2007, pp. 9–10, equations III.35–III.39](https://yehgroup.caltech.edu/wp-content/uploads/2016/06/NTU2007_Part_III_1.pdf): fluxoid includes magnetic flux and a current term. MIT 6.763, [Lecture 17: Flux Flow and Flux Pinning, 2005](https://www.ocw.mit.edu/courses/6-763-applied-superconductivity-fall-2005/be0d5901756b873df017d2b34c94d29c_lecture17.pdf): driven dissipative vortex response and pinning. These constrain CM-09, without treating paired charge as a proof of exchange statistics.
- The NASA-hosted [Cores, Planets and the Mission to Psyche](https://astrobiology.nasa.gov/news/cores-planets-and-the-mission-to-psyche/) was inspected as background context for the conventional planetary narrative. It is secondary context, not the independent technical proof for any repair. No quantitative Earth-core composition, transport coefficient, or nucleosynthesis calculation was undertaken.

## Findings and smallest repairs

All baseline/final textual observations are measured by the numbered reads and scoped diff described above. “Derived” below applies only to the stated algebra or conditional theorem. “Inference” identifies a consequence of those facts. “Proposal” identifies unestablished physical interpretation, equivalent to guessed physical status rather than measured response.

### CM-01 — Medium — Notation and layer identification

Baseline: 3, 32, 203–216, 279–289, 341–385, 463–470, 644–675, 824–829. Final: 3, 32, 203–216, 279–289, 341–385, 463–470, 646–677, 826–831.

The opening used unstyled theory abbreviation and undefined primitive/medium terms; center-of-mass wording did not identify the response-center construction. Bare relaxation time, elastic coefficients, and temperature reused canonical time/scale or chemical-potential symbols. The baseline did acknowledge an effective material chart; the repair makes that distinction local in its equations rather than strengthening the earlier physical claim.

Smallest repair: define primitive entities, sea population, response center, and effective chart; use $t_{\mathrm{eff}}$, $\mathbf x_{\mathrm{eff}}$, $\tau_{\mathrm{rel}}$, $\mu_{\mathrm{el}}$, $\lambda_{\mathrm{el}}$, and $T_{\mathrm{temp}}$. All nine altered displays pass the explicit notation-only comparison in Appendix A; no display identity or coefficient was replaced. Grade: measured notation repair; physical center and chart recovery remain proposals. Falsifier: a final expression that fails Appendix A's declared renaming map, or a live canon definition contradicting the stated local meaning.

### CM-02 — High — A named residual is not a proved threshold or a chemical-stability theorem

Baseline: 32–50, 65, 863–865. Final: 32–50, 65, 865–867.

The argument list supplied neither a norm nor a constitutive law, but the regime table and ending asserted threshold consequences; below-threshold drag was said to imply loss of chemical stability. Translational loss and internal binding are distinct accounts. A general level set also need not be a regular surface.

Smallest repair: retain the residual and threshold equations, state their proposed status, require regularity only where justified, separate unforced transport from driven/material exchange, and limit the falsifier to the transport map. Grade: derived distinction between a definition and its consequences; threshold behavior is a proposal. Falsifier: test histories with equal declared diagnostic arguments but different transport outcomes, or measure below-threshold loss in the stipulated unforced regime; either defeats this reduced map, not automatically the primitive law or chemical binding.

### CM-03 — Medium — Quadratic differentiation requires held-fixed coefficients

Baseline: 54–65, 97–115, 189. Final: the same lines.

The displayed momentum derivative omitted the domain under which the prefactor and response tensor are independent of velocity. Positive energy interpretation was also not stated separately from an arbitrary symmetric quadratic form.

Smallest repair: state a real tensor, Euclidean frame, fixed coefficients, and positive quadratic-energy condition while retaining all displayed algebra. Grade: derived conditional differentiation; the response tensor, internal energy, exposure calibration, and physical inertia remain proposals under Particle Masses. Falsifier: the one-dimensional variable-coefficient witness in the next section gives derivative 16 rather than 8; any new derivation allowing coefficient variation must include the omitted product terms.

### CM-04 — High — Euclidean transverse acceleration is not generally energy-workless

Baseline: 123, 160–176, 189. Final: the same lines.

The baseline called an antisymmetric acceleration response strictly workless despite admitting an anisotropic kinetic metric. Orthogonality to velocity preserves Euclidean speed; it need not preserve that quadratic energy. A closed velocity curve also need not return the medium state.

Smallest repair: keep the antisymmetric formulas and require contraction against the actual energy metric; distinguish full-state reversibility, coherent stored excitation, and dissipation. Grade: derived counterexample and conditional repair; full-cycle exchange is unresolved physics. Falsifier: Appendix B reproduces zero Euclidean contraction but unit energy contraction. For an asserted reversible physical branch, a closed full-state cycle with independently defined unreturned energy refutes the assertion.

### CM-05 — High — Periodicity and a nonempty level set do not establish metallic transport

Baseline: 216, 247, 262, 277–289. Final: the same lines.

The text inferred metallic response from a nonempty energy level set, tied material band curvature too directly to assembly inertia, and made perfect periodicity a sufficient no-relaxation rule. It also blurred the band-basis Berry connection with the electromagnetic connection and specified double-occupancy blocking without a charge-gap criterion.

Smallest repair: state the effective spectral problem, band regularity/filling, charge-gap obligation, connection distinction, and admitted collision channels. Retain the Bloch, curvature, gap, and Drude equations, with notation repairs only. Grade: conditional effective comparison and derived insufficiency examples; no native electron/material branch is established. Falsifier: an isolated band-edge level set with no regular conducting surface, or current relaxation in an admitted interacting periodic model, defeats the old sufficiency claim; lack of a derived spectral map leaves the Architrino recovery open.

### CM-06 — Medium — Diffraction, harmonic dynamics, and heat need distinct domains

Baseline: 293, 327–405. Final: the same lines.

The selection rule omitted the infinite-periodic kinematic limit; the mode equation did not declare mass normalization or full multi-site indices. The energy increment lacked the fixed-frequency assumption, and coherent excitation was too closely identified with no phonons or heating.

Smallest repair: state finite/basis/scattering qualifications, equilibrium before harmonic expansion, the conservative Hermitian nonnegative comparison, elastic positivity, and fixed-frequency mode accounting. Distinguish coherent phonon energy from thermalized heat. Grade: derived algebra under an assumed effective action and standard comparison assumptions; not a stability verdict for an unevolved configuration. Falsifier: the two-site off-Bragg witness below defeats the unrestricted selection rule; changing frequencies with unchanged occupations defeats the incomplete energy-increment formula.

### CM-07 — High — Assembly gaps do not by themselves preserve material defect labels

Baseline: 416, 437–457. Final: the same lines.

The baseline gap rule did not supply the continuous order-parameter map, fixed target, or exclusion of defect crossings needed for homotopy invariance. It assigned label changes and edge-mode events a universal transport threshold.

Smallest repair: retain both displayed implications as explicitly conditional proposed diagnostics; define the homotopy domain and distinguish boundary transport from bulk gap closure. Grade: derived homotopy conditions; the link between material topology and an assembly Floquet gap remains a proposal. Falsifier: a defect crossing the measurement loop changes its winding while no premise specifies a bulk gap closing; the moving-defect construction below exhibits exactly that missing premise.

### CM-08 — High — Hall signs, occupied-bundle domain, and gap acceptance

Baseline: 461–535. Final: 461–537.

The Hall comparison lacked tensor-orientation and sheet/bulk conventions. The scalar Berry formula did not explain local patches or multiple occupied bands, and the gap term in the residual vanishes at zero gap. A gapped material alone is not the stated occupied-band theorem.

Smallest repair: declare tensor inversion, occupied-subspace and zero-temperature comparison assumptions, curvature sum/trace and local patches, and a separate positive gap margin. Retain the Chern sign, Hall factors, and existing score equation. Grade: derived matrix inversion and zero-gap witness, plus conditional effective topological comparison. Falsifier: Appendix B checks the inverse tensor; setting the gap to zero still makes its penalty zero, so any acceptance based only on a small score is inadequate. A nonzero Chern number computed from a single globally smooth periodic eigenvector on the torus would contradict Stokes' theorem and expose a chart or calculation error.

### CM-09 — Medium — Paired charge and vortex motion are not universal loss criteria

Baseline: 541–553. Final: 543–555.

The baseline made crossing a defect or vortex-motion threshold necessarily resistive and treated the factor $2e$ as testing exchange statistics without a separate statistics construction. Flux alone was not distinguished from fluxoid.

Smallest repair: retain $h/(2e)$, state its paired effective-branch and contour conditions, and require the dissipative component of vortex response to be identified. Grade: sourced effective comparison; neither pairing mechanism nor exchange statistics is derived from the flux quantum. Falsifier: a contour with a nonzero circulating-current contribution distinguishes flux from quantized fluxoid; a proposed loss verdict must be checked against nonzero longitudinal dissipative work, not motion alone.

### CM-10 — High — Illumination is driven exchange, and excitation is not automatically heat

Baseline: 577–620. Final: 579–622.

The baseline prohibited a continuous drag term from the incoming photon account and implied a universal metallic/black-surface partition. It also equated logged excitation with dissipation without defining disjoint energy channels or an event window.

Smallest repair: identify the photon as a candidate of its live owner, distinguish driven radiation momentum exchange from unforced no-drag, and make the balance a same-window, common-reference, non-overlapping accounting target. Retain the complete energy equation and nuclear-inventory guardrail. Grade: effective comparison and accounting inference; physical carrier existence and conservation remain unresolved. Falsifier: a driven event with momentum transfer, an excitation counted in two increments, or delayed emission omitted from an enclosing event window defeats the respective old claim or account.

### CM-11 — Medium — Iron continuity needs total flux and a dimensioned constitutive coefficient

Baseline: 640–656. Final: 642–658.

A segregation-only interpretation of the continuity flux omits advection when present. The gradient formula left its coefficient's dimensions unspecified and was described as the reason for sinking. Proton/neutron bookkeeping could be read as separate count conservation, which is not the weak-reaction comparison.

Smallest repair: define total number flux, explicitly restrict the gradient ansatz to isothermal diffusion-only use, identify $D_{\mathrm{Fe}}$ as number-flux mobility, and distinguish inventory tracking from separate proton/neutron conservation. Grade: derived dimensions and conditional continuity, not a planetary segregation derivation. Falsifier: units of ordinary diffusivity do not turn an energy-per-length gradient into number flux; nonzero advection outside the ansatz or a weak conversion of a neutron to a proton defeats the unrestricted reading.

### CM-12 — High — Phase preference requires common inventory and the right derivative

Baseline: 658–690, 824–839. Final: 660–692, 826–841.

Subtracting unspecified iron and silicate chemical potentials need not compare the same transferred species. A negative partial density derivative does not imply negative relative free energy, a derivative along a changing planetary profile, or conductivity.

Smallest repair: identify the silicate term as the iron transfer potential in a specified host, declare held-fixed pressure/temperature/composition, distinguish partial from total derivatives, and require a balanced/common-reference free-energy comparison without double-counted sea effects. Preserve the displayed difference and sign condition. Grade: derived thermodynamic-bookkeeping and chain-rule conditions at effective level; physical phase existence and coefficients remain proposals. Falsifier: the positive-value/negative-slope and opposite-total-derivative witnesses below refute the old implications; inconsistent inventory units invalidate a phase comparison before its numerical sign matters.

### CM-13 — Medium — Packing arithmetic is conditional but already derivable

Baseline: 694–762. Final: 696–764.

The derivative needs a positive differentiable ceiling and fixed penalty coefficients. Convexity alone neither makes a penalty nondecreasing nor fixes the sign of its density derivative. The baseline treated completion of the physical antecedents as if it were necessary to derive the already elementary sufficient implication.

Smallest repair: make the differentiability, monotonicity, held-fixed coefficient, units, and uniform error bound explicit; distinguish the proven subtraction inequality from guessed constitutive functions and the dynamic-to-hard-envelope mapping. No displayed packing derivative or inequality was altered. Grade: derived arithmetic; all physical antecedents remain unresolved. Falsifier: a variable coefficient generates an omitted product term, or an unbounded branch error defeats the sign guarantee; Appendix B tests both the negative marginal example and the strict inequality boundary.

### CM-14 — High — A constructed support cell does not bound every admissible packing

Baseline: 775–820. Final: 777–822.

The baseline concluded an upper bound on maximum packing density from a defined support-cell volume without proving a minimum-volume theorem. Centered symmetry, independent edge directions, simultaneous non-overlap, and the packing class also needed explicit treatment.

Smallest repair: retain the support, spacing, determinant, and inequality displays but make the upper bound conditional on an independent cell-volume lower bound for fixed count in a declared class. State that a constructed admissible packing instead gives a lower bound on the maximum, and equality requires optimality. Grade: derived order-of-bound logic; no physical envelope, packing optimum, or Fe/silicate sign is established. Falsifier: the two admissible oblate packings below have densities $1/4$ and $1/(2\sqrt2)>1/4$, disproving the unconditional upper bound from the first cell in any class containing both.

### CM-15 — Medium — Residual sums need nonnegative dimensionless terms

Baseline: 557–573, 843–859. Final: 559–575, 845–861.

The superconducting and iron sums did not specify compatible units, positive tolerances, or nonnegative mismatch norms. Small signed sums can hide large opposing errors and cannot replace branch-domain assumptions.

Smallest repair: give both scores a common finite/nonnegative/dimensionless convention and preserve separate source, stability, and domain requirements. Leave the displayed sums intact. Grade: derived typing/cancellation condition; thresholds and measurement instruments remain proposals. Falsifier: $1+(-1)=0$ despite two nonzero mismatches, or any mixed-unit addends, defeats an unqualified acceptance score.

## Independent mathematical witnesses and their limits

Every new numerical illustration and numerical tolerance in this report uses normalized wake-speed units $c_f=1$. The following are dimensionless mathematical or explicitly effective comparison examples, not prescribed or evolved Architrino branches. Appendix B evaluates the arithmetic against the separately stated closed forms here; it does not establish a constitutive law by sweeping its own coefficients.

1. Quadratic derivative and energy metric (CM-03/CM-04). For a variable scalar coefficient $B(v)=v^2$, the candidate quadratic expression is $K(v)=v^4/2$, so $K'(v)=2v^3$, not $B(v)v=v^3$. At $v=2$ these are 16 and 8. For $\mathbf v=(1,1)$, $G=\left(\begin{smallmatrix}0&1\\-1&0\end{smallmatrix}\right)$, and $M=\operatorname{diag}(2,1)$, one has $\mathbf a=G\mathbf v=(1,-1)$, $\mathbf v^T\mathbf a=0$, and $\mathbf v^TM\mathbf a=1$. With stationary prefactor one, the latter is the derivative of $\mathbf v^TM\mathbf v/2$. Separately, along $\mathbf v(s)=(\cos s,\sin s)$ the integrand $\mathbf v^TG\,d\mathbf v/ds=1$, hence its closed velocity-cycle integral is $2\pi$; returning velocity alone does not return a full energy account.
2. Effective band and scattering domains (CM-05/CM-06). The periodic dispersion $E(\mathbf k)=\sum_i(1-\cos k_i)$ at $\mu=0$ has an isolated level point modulo periods, not a regular Fermi surface with occupied states on both sides. A two-site equal-amplitude elastic sum is $1+e^{iqa}$; at $qa=\pi/2$ its squared modulus is 2, despite not being a reciprocal-lattice transfer. This does not contradict the infinite-periodic Bragg distribution. A harmonic oscillator in a coherent state has mean occupation $|\alpha|^2$ and a phase-sensitive mean displacement; nonzero occupation is therefore not by itself a thermal-state criterion. These are effective-model examples only.
3. Topology domain (CM-07). In the complex plane, $Q_a(z)=(z-a)/|z-a|$ on the unit circle has winding one for $a=0$ and zero for real $a=2$. As $a$ moves between these values, the defect crosses the circle at $a=1$, where the map is undefined. This is not a continuous homotopy on the whole tracked circle. No assembly gap has been specified by this construction, so it supplies no implication about that gap. This is a domain counterexample, not a physical vortex evolution.
4. Hall score and tensor (CM-08). For $\rho=\left(\begin{smallmatrix}1&2\\-2&1\end{smallmatrix}\right)$, its inverse is $\frac15\left(\begin{smallmatrix}1&-2\\2&1\end{smallmatrix}\right)$ and $\sigma_{xy}=-2/5$. Matrix multiplication independently checks the signs. The score's gap penalty is exactly zero at zero gap. For globally defined periodic $A$, the integral of $dA$ over a boundaryless torus vanishes; nontrivial curvature topology therefore needs local patches or an equivalent bundle description.
5. Fluxoid and transport dimensions (CM-09/CM-11). The sourced fluxoid relation has magnetic flux plus a contour-current term equal to an integer times the paired flux quantum. Omitting a nonzero second term changes that statement. For number flux with units number per area per time and potential gradient with units energy per length, dimensional division gives mobility units number per length per time per energy. A diffusivity has different units. These checks import no force law at primitive level.
6. Phase comparison and packing derivative (CM-12/CM-13). The function $1-n$ is positive at $n=1/2$ although its derivative is negative. For a potential $-n+2P$, the held-fixed-$P$ derivative is $-1$; on the profile $P=n$, the total derivative is $+1$. With $n_{\max}(n)=n^2$ for positive $n$, $z=1/n$ and $z'=-1/n^2$. For $\Psi(z)=z^2/2$ and fixed coefficient one, the penalty derivative is $-1/n^3$, giving $-1/8$ at $n=2$. If the coefficient itself is $n$, the product derivative at that point is $-1/8$ whereas omitting its derivative gives $-1/4$.
7. Sufficient sign theorem (CM-13). Write $\Delta G=G_{\mathrm{Fe}}-G_{\mathrm{sil}}$, and similarly define $\Delta\mathcal P$ and $\Delta\mathcal D$. The chapter's decomposition gives $\partial_n\Delta\mu=-\Delta G+\Delta\mathcal P+\Delta\mathcal D+(b_{\mathrm{Fe}}-b_{\mathrm{sil}})$. Since each error has magnitude at most $B_{\mathrm{coeff}}/2$, their difference is at most $B_{\mathrm{coeff}}$. The strict displayed inequality therefore proves negativity on every point where those premises hold. With gaps 4, 1, 1 and error bound 1, the upper bound is $-1$; replacing the first gap by 3 gives zero and shows why strictness matters. These are arithmetic fixtures, not estimates of iron coefficients.
8. Oblate packing counterexample (CM-14). Use one centered hard ellipsoid of semiaxes $(1,1,1/2)$ per primitive cell, zero clearances, cell factor one, and reference density one. Orthogonal edge spacings $(2,2,1)$ give an admissible cell of volume 4 and density $1/4$. Independently, unit spheres admit lattice generators $(0,\sqrt2,\sqrt2)$, $(\sqrt2,0,\sqrt2)$, $(\sqrt2,\sqrt2,0)$ with determinant $4\sqrt2$. For any nonzero integer combination, its squared length is $2[(m_2+m_3)^2+(m_1+m_3)^2+(m_1+m_2)^2]\ge4$: the integer sum cannot be one, because the three pair sums have even total, and zero implies all $m_i=0$. Thus the spheres do not overlap. The invertible linear compression $(x,y,z)\mapsto(x,y,z/2)$ preserves non-overlap and gives the same oblate ellipsoids with cell volume $2\sqrt2$ and achievable density $1/(2\sqrt2)$. The second density exceeds the first. This refutes a universal upper bound derived from the first supported cell; it does not prove either packing optimal, nor convert dynamic wake exclusion into hard ellipsoids.

## Validation record

The check order is part of the evidence. Before the first chapter syntax target run, the in-memory checker passed a hand-authored control with four math expressions, two display delimiters, one dollar-display registry record, excluded inline/fenced code, valid and invalid KaTeX, an unmatched delimiter, a valid/missing path, a missing anchor, and a known heading slug. The repository's independent display-census control also passed via `node --test --test-name-pattern='independent display census excludes code' tests/equation-mapping-corpus.test.js` (1 test passed). Only then was the chapter target inspected by that instrument. The expanded final control adds moved-prefix viewer identity, explicit notation renaming, and known good/bad report whitespace and EOF examples before the final target run.

During iteration, the local-link checker caught a nonexistent photon path introduced by this review, which was corrected to the live electroweak-boson owner. An early viewer comparison compared byte-offset-bearing objects and failed after prose length changed; this was a checker defect, not evidence of a lost viewer link. The comparison now uses full link text/identity, and a known moved-prefix control passes before the target. No finding or retained count is based on that rejected offset comparison. The first report check and strict validator caught two source-list path typos introduced in this report (time and void); both were corrected to the inspected absolute-time and euclidean-void owners. That strict snapshot reported 2 errors, 0 warnings, 30 notes, and 1690 repository Markdown files. Those two errors belonged to this task, not concurrent work.

Appendix B was run in control-only mode first and printed `CONTROL PASS: dot=11, identity matvec, determinant 1/24/-1, exact-fraction tolerance; c_f=1.` Only after that recorded pass was target mode run. Target mode repeated the controls and passed eight numerical witness groups: gyroscopic contractions, variable quadratic coefficient, packing derivative, sufficient inequality, oblate packing determinant/density, Hall inversion/gap penalty, phase derivatives, and residual cancellation/off-Bragg intensity. The exact expected results are stated independently above; no reference implementation or oracle was edited alongside its subject.

| Command or instrument | Measured result and boundary |
| --- | --- |
| `shasum -a 256` on the chapter, with baseline `git show` comparison | Hash chain above; final chapter `80b7ef0c631746c7fa4df313fdfab34019994fa48476ad40f51e1e307b0d8523` |
| Complete final reread with `sed -n '1,230p'`, `'231,460p'`, `'461,675p'`, `'676,871p'` | Complete final source reread after the last chapter patch; this is not a rendered-page visual QA claim |
| Appendix A, baseline | 175 KaTeX expressions; 54 displays; 69 local-link occurrences, including 58 anchor occurrences; no external links |
| Appendix A, final chapter | 209 KaTeX expressions; 54 displays; 75 local-link occurrences, including 58 anchor occurrences; 3 external links. All local paths/anchors pass within the supported Markdown syntax; external sources were inspected through browsing, not certified by the filesystem checker |
| Appendix A, display preservation | All 54 viewer link texts/identities preserved; 45 displays byte-identical; 9 displays differ only by the declared notation map. This preserves displayed algebra, not the physical truth of its interpretation |
| Appendix B | Eight witness groups passed; arithmetic evidence only |
| Scoped `git diff --check -- content/markdown/aaa/nuclear-atomic/condensed-matter.md reference/priorities/aaa-corpus-rewrite/evidence/crw-005-condensed-matter-review-2026-09-12.md` | Passed, exit 0. The separate `git diff --no-index --check -- /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-condensed-matter-review-2026-09-12.md` returned exit 1 with no whitespace diagnostics; Appendix A independently passed the report's whitespace/EOF checks when it was untracked. After concurrent staging appeared, the scoped `git diff HEAD --check` also passed, covering the full two-path change |
| `node scripts/validate-content.mjs --check --strict` | Pre-report observation passed, exit 0: 391 scene configurations, 199 Markdown corpus files, 1687 repository Markdown files, 0 errors, 0 warnings, 30 notes. Post-report observation after repairing this report's source links passed, exit 0: 391 scene configurations, 199 corpus Markdown files, 1690 repository Markdown files, 0 errors, 0 warnings, 30 notes |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Baseline passed. After chapter edits, exit 1 solely reported stale `content/generated/equation-mapping/corpus-equations.json`; 199 files, 4685 displays, 23 promoted records, 30436 symbol definitions. A later final check returned exit 0 and `summary: 0 error(s)` with the same census. No regeneration was run by this task; the intervening shared-state change is not attributed to a particular actor |
| Report KaTeX, links, whitespace, finding count, and reread | Appendix A passed: 80 math expressions, 38 local-link occurrences, 7 external links, no trailing whitespace, and one terminal newline. `rg -c '^### CM-'` returned 15, and severity-filtered `rg -c` returned 8 high and 7 medium. Full report reread in source chunks, including both embedded scripts, completed |

The strict validator's pre-report notes included one ignored periodic-table JSON, approved comic-image audit information, stable scene ID coverage, and 115 scenes without incoming links (25 examples plus 90 summarized). These are out-of-scope repository diagnostics, not chapter findings or proof that this task caused them. A successful broad check is a point-in-time observation in a shared checkout, not an attribution audit or a claim of overall repository health.

Generated-registry drift observed during repair is expected from edited formula notation, source context, and positions, as shown by the generator's source-record and comparison code. The global observations do not isolate other chapters' contributions. This task changed no generated file. While the check was stale, the exact deferred command was `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check`, only under separate regeneration authority. The write mode can also add missing source viewer links across the corpus, so it was not run within this two-path assignment. A later final check passed without a task-owned write; scoped `git --no-optional-locks status --short` then returned no entries for the generated registry or generator script. This is a measured shared-state change, not authorization or attribution of someone else's regeneration. The latest check no longer reports registry drift, so no additional regeneration is requested by this receipt. Viewer-identity preservation alone never established freshness; the separate final generator check did.

The notation-only display changes start at baseline/final lines 203/203, 281/281, 343/343, 358/358, 378/378, 463/463, 644/646, 660/662, and 824/826. Appendix A emits each corresponding semantic ID. The mathematical inequalities and the Chern, flux, phonon-energy, continuity, and response formulas retain their original algebra.

## Explicit closure limits and handoff

The documented textual repairs have the bounded validation receipts recorded above. They preserve the chapter as an exploratory recovery study, not a derived condensed-matter theory. The following obligations remain unresolved:

- Existence, formation, persistence, equilibrium, and certified stability of the required assemblies/material branches; no EOM solver acceptance, solver execution, or physical branch existence is established.
- Derivation of the response-center and effective chart maps, internal energy reference, medium constitutive tensors, and independently defined full-cycle exchange; no energy-conservation or no-drag theorem is established.
- Construction and independent calibration of residual norms, thresholds, branch domains, event windows, and channel-resolved transport predictions.
- Recovery of effective spectral problems, occupation/statistics, charge/current response, pairing, phonons, topology, and photon transitions from delayed path-history dynamics.
- A justified mapping from dynamic exclusion to hard-envelope geometry, admissible packing class, independent optimality/bounds, same-inventory phase potentials, and the physical Fe/silicate sufficient-inequality antecedents.
- Downstream-owner review and shared status integration remain outside this task; generated-registry maintenance was also left to its authorized owner. The report does not certify downstream corpus closure, theory closure, empirical fit, or a ready publication candidate.

Recommended coordination handoff: inspect CM-04 and CM-14's independent witnesses first because they change what the old formulas can legitimately establish; then use this report's exact hash and final checks to decide the shared review disposition. This recommendation grants no authority to edit the shared queue or publish.

## Appendix A — Reproducible syntax, link, and equation checks

Run from the repository root. With `CRW_PHASE` unset, this script runs only controls. Set `CRW_PHASE=target` as shown to repeat those controls before baseline, chapter, and report checks. The supported syntax is the inline Markdown links and math delimiters used in these two files, with fenced/inline code excluded. It is not a general Markdown parser, browser-rendering test, remote-link monitor, or proof checker. The registry parser is an existing structural instrument; its agreement with the generated registry is not independent mathematical evidence.

```sh
CRW_PHASE=target node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {parseCorpusDisplayEquations} from './scripts/build-equation-mapping-corpus.mjs';
import {loadVendoredCommonJsBundle} from './scripts/load-vendored-commonjs-bundle.mjs';
const chapter='content/markdown/aaa/nuclear-atomic/condensed-matter.md';
const report='reference/priorities/aaa-corpus-rewrite/evidence/crw-005-condensed-matter-review-2026-09-12.md';
const katex=loadVendoredCommonJsBundle(path.resolve('apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets/katex/katex.min.js'));
function prose(s){return s.replace(/(^|\n)[ \t]*(\x60{3,}|~{3,})[^\n]*\n[\s\S]*?\n[ \t]*\2[ \t]*(?=\n|$)/gu,'$1').replace(/(\x60+)[^\n]*?\1/gu,'');}
const mathRe=/\$\$([\s\S]*?)\$\$|(?<![\\$])\$([^$\n]+?)(?<!\\)\$(?!\$)|\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/gu;
function math(s){const p=prose(s);const out=[...p.matchAll(mathRe)].map(m=>({tex:m[1]??m[2]??m[3]??m[4],display:m[1]!==undefined||m[4]!==undefined}));assert.ok(!p.replace(mathRe,'').match(/(?<!\\)\$/u),'unmatched dollar');return out;}
function links(s){return [...prose(s).matchAll(/(?<!!)\[[^\]\n]*\]\(([^)\s]+)\)/gu)].map(m=>m[1]);}
function slug(s){return s.toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').replace(/\s/g,'-');}
function checkLinks(s,p){let local=0,anchors=0,external=0;const registry=JSON.parse(fs.readFileSync('content/generated/equation-mapping/corpus-equations.json','utf8')).records;const ids=new Set(registry.map(r=>r.semanticId));for(const href of links(s)){if(/^https?:/.test(href)){external++;continue;}const [file,hash]=href.split('#');const resolved=file?path.resolve(path.dirname(p),decodeURIComponent(file)):path.resolve(p);assert.ok(fs.existsSync(resolved),href);local++;if(hash){if(resolved.endsWith('/equation-mapping.html')){assert.ok(ids.has(hash),href);anchors++;}else if(resolved.endsWith('.md')){const text=fs.readFileSync(resolved,'utf8');const headings=[...prose(text).matchAll(/^#{1,6}\s+(.+)$/gm)].map(m=>slug(m[1]));assert.ok(headings.includes(decodeURIComponent(hash))||text.includes('id="'+hash+'"'),href);anchors++;}}}return {local,anchors,external};}
function notation(s){return s.replaceAll('x_{\\mathrm{eff}}^j','x_j').replaceAll('x_{\\mathrm{eff}}^i','x_i').replaceAll('\\mathbf x_{\\mathrm{eff}}','\\mathbf x').replaceAll('x_{\\mathrm{eff}}','x').replaceAll('t_{\\mathrm{eff}}','t').replaceAll('T_{\\mathrm{temp}}','T').replaceAll('\\tau_{\\mathrm{rel}}','\\tau').replaceAll('\\mu_{\\mathrm{el}}','\\mu').replaceAll('\\lambda_{\\mathrm{el}}','\\lambda');}
function control(){
 assert.ok(!/[ \t]+$/m.test('ok\n'));assert.ok(/[ \t]+$/m.test('bad \n'));
 const eof=x=>x.endsWith('\n')&&!x.endsWith('\n\n');assert.ok(eof('ok\n'));assert.ok(!eof('bad'));assert.ok(!eof('bad\n\n'));
 assert.equal(notation('x_{\\mathrm{eff}}^j t_{\\mathrm{eff}} T_{\\mathrm{temp}} \\tau_{\\mathrm{rel}} \\mu_{\\mathrm{el}} \\lambda_{\\mathrm{el}}'),'x_j t T \\tau \\mu \\lambda');
 assert.equal(notation('2+3'),'2+3');
 const s='# Control\n\n$x=1$ and \\(y=2\\).\n\n$$\na=b\n$$\n\n[View →](../../../../equation-mapping.html#control)\n\n\\[c=d\\]\n\n\x60$ignored$ [bad](absent)\x60\n\x60\x60\x60tex\n$$ignored$$\n[bad](absent)\n\x60\x60\x60\n~~~text\n$ignored$\n~~~\n[ok](AGENTS.md)';
 const m=math(s);assert.equal(m.length,4);assert.equal(m.filter(x=>x.display).length,2);
 assert.equal(parseCorpusDisplayEquations(chapter,s).length,1);
 assert.deepEqual(parseCorpusDisplayEquations(chapter,s).map(d=>d.existingLink.text),parseCorpusDisplayEquations(chapter,'Added prose\n\n'+s).map(d=>d.existingLink.text));
 assert.deepEqual(links(s),['../../../../equation-mapping.html#control','AGENTS.md']);
 assert.equal(slug('Dynamic Exclusion Envelope'),'dynamic-exclusion-envelope');
 for(const x of m)katex.renderToString(x.tex,{throwOnError:true,displayMode:x.display});
 assert.throws(()=>katex.renderToString('\\notAValidCrwCommand',{throwOnError:true}));
 assert.throws(()=>math('$unclosed'));
 assert.equal(checkLinks('[good](AGENTS.md)','control.md').local,1);
 assert.throws(()=>checkLinks('[bad](crw-005-known-absent-control-file.md)','control.md'));
 assert.throws(()=>checkLinks('[bad](AGENTS.md#crw-005-known-absent-anchor)','control.md'));
 console.log('CONTROL PASS: 4 math expressions (2 display), 1 registry-parser dollar display, code excluded, valid/invalid KaTeX, unclosed dollar, valid/missing path and anchor, heading slug, moved-prefix link identity, declared-notation map, report whitespace/EOF controls.');
}
control();
if(process.env.CRW_PHASE==='target'){
 const base=execFileSync('git',['show','66e0e47de3797be86855acf6318aaab6c503031c:'+chapter],{encoding:'utf8'});const current=fs.readFileSync(chapter,'utf8');
 for(const [name,s] of [['baseline',base],['final',current]]){
  const m=math(s);for(const x of m)katex.renderToString(x.tex,{throwOnError:true,displayMode:x.display});
  const d=parseCorpusDisplayEquations(chapter,s);assert.ok(d.every(x=>x.existingLink),'display missing viewer link');
  console.log(name,JSON.stringify({expressions:m.length,displays:d.length,links:checkLinks(s,chapter)}));
 }
 const old=parseCorpusDisplayEquations(chapter,base),now=parseCorpusDisplayEquations(chapter,current);
 assert.deepEqual(old.map(d=>d.existingLink.text),now.map(d=>d.existingLink.text),'viewer links changed');
 assert.ok(old.every((d,i)=>notation(d.tex)===notation(now[i].tex)),'change beyond declared notation map');
 console.log('NOTATION CONTROL AND DISPLAY PARITY PASS: only declared variable renamings across 54 displays.');
 const changes=old.map((d,i)=>({id:d.existingLink.semanticId,baseline:d.startLine,final:now[i].startLine,same:d.tex===now[i].tex})).filter(x=>!x.same);
 console.log('DISPLAY CHANGES',JSON.stringify(changes));console.log('DISPLAY UNCHANGED',old.length-changes.length);
 if(fs.existsSync(report)){const s=fs.readFileSync(report,'utf8');const m=math(s);for(const x of m)katex.renderToString(x.tex,{throwOnError:true,displayMode:x.display});assert.ok(!/[ \t]+$/m.test(s),'report trailing whitespace');assert.ok(s.endsWith('\n')&&!s.endsWith('\n\n'),'report EOF');console.log('REPORT',JSON.stringify({expressions:m.length,links:checkLinks(s,report),whitespace:'pass'}));}
}
NODE
```

## Appendix B — Reproducible arithmetic controls and witnesses

Run the control-only command first by omitting the environment assignment, record its pass, then run the target command below. The control precedes all target witness evaluation even in target mode. Numeric agreement is with the closed-form arithmetic stated above, not a physical oracle.

```sh
CRW_PHASE=target node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
const c_f=1;
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const mv=(a,v)=>a.map(r=>dot(r,v));
const det=a=>a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1])-a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0])+a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-12,JSON.stringify({a,b}));
const I=[[1,0,0],[0,1,0],[0,0,1]];
assert.equal(dot([1,2],[3,4]),11);
assert.deepEqual(mv(I,[2,3,4]),[2,3,4]);
assert.equal(det(I),1);
assert.equal(det([[2,0,0],[0,3,0],[0,0,4]]),24);
assert.equal(det([[0,1,0],[1,0,0],[0,0,1]]),-1);
near(1/4,0.25);
console.log('CONTROL PASS: dot=11, identity matvec, determinant 1/24/-1, exact-fraction tolerance; c_f=1.');
if(process.env.CRW_PHASE==='target'){
 const out={};
 const v=[1,1], G=[[0,1],[-1,0]], M=[[2,0],[0,1]], a=mv(G,v);
 assert.equal(dot(v,a),0);assert.equal(dot(v,mv(M,a)),1);
 out.gyroscopic={speedContraction:dot(v,a),energyContraction:dot(v,mv(M,a))};
 const speed=2, exactDerivative=2*speed**3, omittedDerivative=speed**3;
 assert.equal(exactDerivative,16);assert.equal(omittedDerivative,8);
 out.variableQuadratic={exactDerivative,omittedDerivative};
 const n=2, ceiling=n*n, ceilingPrime=2*n, z=n/ceiling;
 const zPrime=(ceiling-n*ceilingPrime)/ceiling**2;
 const penaltyPrime=z*zPrime;const displayed=z/ceiling*(1-n*ceilingPrime/ceiling);
 assert.equal(zPrime,-1/4);assert.equal(penaltyPrime,-1/8);assert.equal(displayed,penaltyPrime);
 const coefficientVariable=0.5*z*z+n*z*zPrime;
 assert.equal(coefficientVariable,-1/8);assert.equal(n*penaltyPrime,-1/4);
 out.packingDerivative={zPrime,penaltyPrime,coefficientVariable,omittingCoefficientPrime:n*penaltyPrime};
 const dG=4,dP=1,dD=1,B=1;
 const upper=-dG+dP+dD+B;
 assert.equal(upper,-1);assert.equal(-3+dP+dD+B,0);
 out.sufficientInequality={strictUpper:upper,equalityBoundary:0};
 const r=Math.SQRT2, sphereCell=[[0,r,r],[r,0,r],[r,r,0]];
 const oblateCell=sphereCell.map(row=>[row[0],row[1],row[2]/2]);
 near(det(sphereCell),4*r);near(det(oblateCell),2*r);
 const orthogonalDensity=1/4, achievableDensity=1/det(oblateCell);
 assert.ok(achievableDensity>orthogonalDensity);
 out.oblatePacking={orthogonalVolume:4,alternativeVolume:det(oblateCell),orthogonalDensity,achievableDensity};
 const h=1,l=2,den=h*h+l*l;
 const rho=[[h,l],[-l,h]], sigma=[[h/den,-l/den],[l/den,h/den]];
 for(let j=0;j<2;j++){const col=[sigma[0][j],sigma[1][j]];mv(rho,col).forEach((x,i)=>near(x,i===j?1:0));}
 assert.equal(sigma[0][1],-0.4);
 out.hall={sigmaXY:sigma[0][1],zeroGapPenalty:Math.max(0,-0)};
 const slope=-1,value=1-0.5,profileDerivative=-1+2;
 assert.ok(value>0);assert.equal(slope,-1);assert.equal(profileDerivative,1);
 out.phase={negativeSlope:slope,positiveValue:value,partialDerivative:-1,totalProfileDerivative:profileDerivative};
 const amplitudeSquared=(1+Math.cos(Math.PI/2))**2+Math.sin(Math.PI/2)**2;
 near(amplitudeSquared,2);assert.equal(1+(-1),0);
 out.residualAndDiffraction={signedCancellation:0,twoSiteOffBraggIntensity:amplitudeSquared};
 console.log('WITNESSES PASS '+JSON.stringify(out));
 console.log('WITNESS GROUPS '+Object.keys(out).length);
}
NODE
```
