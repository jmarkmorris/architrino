# crw-005 action model comparison review — independent evidence report, 2026-09-11

## crw-005 action model comparison review — scope, source identity, and disposition

This began as a review-only assessment of [Action Model Comparison](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md). The findings were subsequently authorized for a bounded repair pass. The repair does not change campaign status, certify dynamics, edit shared trackers, or modify generated artifacts.

Claim grade: measured. The complete assigned chapter was read with `nl -ba` over lines 1–425. At initial inspection, `shasum -a 256` returned `4bbca4d645699662dde2500466f659bc80d4984180d33e49da68ec663763bb38`, and `wc -l` returned 425 newline-terminated lines. Scoped `git --no-optional-locks status --short -- <chapter> <report>` returned no entries before writing; a subsequent `test ! -e <report>` confirmed that the report did not exist. Falsifier: different bytes or a different line count at review consumption invalidate the snapshot-specific references and require reassessment.

The review used the [architrino-review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), the [corpus reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), and the CRW-005 independent-assurance row in [work-queue.md](../work-queue.md). The task's explicit single-chapter assignment and single-report write boundary govern over the default directory cadence and tracker-capture rules. The academic guide is currently edition 1.1; the conversion ledger records edition 1.0. The current guide governs this assessment, while the historical edition remains part of the conversion provenance.

Consistency checks used the five Archie style/terminology guides and About Architrino, the opening ontology and coordinate passages of the seven foundation anchors named by the review procedure, the Master Equation's canonical branch sum and local scalar theorem, and Energy's local potential and conservation boundaries. These dependency reads are not reviews of additional chapters. The geometry/dynamics role packet supplied a reasoning lens only. No other reviewer's report or mathematical verdict was used as an oracle.

The disposition inventory is six demonstrated mathematical or implementation defects (D1–D6), three open obligations or unsupported generalizations (O1–O3), and three editorial/source issues (E1–E3). High priority means the passage can give a wrong comparison result or numerical interpretation; medium means the assumptions, domain, or teaching contract need repair; low denotes presentation. Each disposition below remains proposed.

## crw-005 action model comparison review — demonstrated defects

### crw-005 action model comparison review — D1: the proposed cross-method residual cannot establish field agreement

**Reference and severity:** high; “Event-driven Radial-Transport + Per-Hit EOM,” “Operator diagnostics,” lines 256–284, especially the definition of $E_{\mathrm{op}}$ at lines 276–280; equation ID `corpus-equation-a73f55aca07554f3`.

**Claim grade: derived.** For any continuously differentiable vector field on the stated regular domains, the divergence theorem and Stokes' theorem make both residual numerators zero when the derivatives and integrals are evaluated exactly. Applying these identities to the difference of two fields does not test whether that difference is zero. The residuals can usefully test differentiation and quadrature consistency, but their maximum cannot serve as an agreement error.

For a concrete counterexample, use $c_f=1$, the unit cube $V=[0,1]^3$, a square surface $S$ in that cube, and two reconstructed diagnostic fields $\mathbf Y^{\mathrm{PDE}}=(1,0,0)$ and $R(\mathbf Y^{\mathrm{root}})=\mathbf0$. Their difference has norm one everywhere. Its outward flux cancels between opposite cube faces, its divergence and curl vanish, and its circulation around the square is zero. Consequently $R_G=R_S=E_{\mathrm{op}}=0$ for positive denominator floors, despite the nonzero discrepancy. More generally, even a smooth difference supported strictly inside the common domain satisfies both identities, so matching boundary data does not repair the diagnostic's null space.

**Smallest repair or disposition:** retain $R_G$ and $R_S$ as operator-consistency checks. Compare the actual mapped fields separately with a declared norm, for example $\|\mathbf Y^{\mathrm{PDE}}-R(\mathbf Y^{\mathrm{root}})\|_{L^2(V)}$, with a stated normalization and acceptance tolerance. Preserve the existing warning that parity is not independent evidence for the canonical law.

**Falsifier:** evaluate the constant-field cube example analytically. A nonzero exact numerator under the chapter's formulas would overturn this counterexample; a nonzero numerical residual alone would instead expose discretization or quadrature error. The mathematical background is the [MIT 18.022 discussion of divergence and curl](https://math.mit.edu/~djk/18_022/chapter10/section04.html); the counterexample is derived here, independently of any repository diagnostic implementation.

### crw-005 action model comparison review — D2: the single-impulse field loses its delta distribution

**Reference and severity:** medium; “Special simple case — stationary transmitter,” lines 179–189, especially line 184, against the integral at lines 132–137, equation ID `corpus-equation-6e6292bf1f2b171a`.

**Claim grade: derived.** Substituting the declared impulse $q(T_t)=Q\delta(T_t-T_{t,0})$ into that integral gives, for fixed $r>0$,

$$
\phi(r,T)=\frac{Q}{4\pi r}\delta\!\left(T-T_{t,0}-\frac{r}{c_f}\right)
$$

Here $Q$ is the time-integrated source strength and the remaining delta locates its arrival. The chapter instead writes $\phi=Q/(4\pi r)$. That coefficient is the impulse's integrated strength at the probe, not the instantaneous field. A finite-valued function supported at one instant has zero integral; a delta with nonzero coefficient does not.

**Smallest repair or disposition:** restore the arrival delta in the equation, or explicitly label $Q/(4\pi r)$ as the coefficient of the delta/time-integrated probe response. Keep this comparison pulse distinct from primitive continuous emission.

**Falsifier:** pair both expressions with a smooth test function $\psi(T)$ that equals one at arrival. The correct response integrates to $Q/(4\pi r)$; the proposed finite function restricted to a single instant integrates to zero. A different result from the displayed convolution would refute the derivation. The distributional Green-function interpretation is independently supported by Laurent Demanet, *18.325 — Waves and Imaging*, Fall 2012, §1.2.3, equations (1.15)–(1.17), [printed pages 28–30](https://math.mit.edu/icg/resources/teaching/18.325-fall2012/notes325-nov25.pdf).

### crw-005 action model comparison review — D3: the moving-source wave-potential gradient is not the canonical acceleration

**Reference and severity:** high; “Relation to Methods 1 and 2,” line 252; “Energetics and work,” line 327; “Recommendation,” line 397; moving-source scalar at lines 158–165, equation ID `corpus-equation-e747c94dfd869141`.

**Claim grade: derived.** The wave scalar already contains $W^{\mathrm{acc}}$ before differentiation. The canonical local scalar instead acquires that weight through differentiation of its moving causal root. They are different scalars. The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), lines 1555–1616, derives $\nabla_{\mathbf X_r}r_b=c_f\mathbf n_b/D_b$ and the regular-branch representative $\Phi_b=C_b\operatorname{sgn}(D_b)/r_b$, where $C_b$ is the signed coupling. Its negative gradient is precisely $C_bW_b^{\mathrm{acc}}\mathbf n_b/r_b^2$.

An axial prescribed-history example isolates the mismatch without any singular root. Set $c_f=1$, transmitter $\mathbf X_t(s)=(us,0,0)$ with $u=1/2$, reception time $T=0$, and probe $\mathbf X=(x,0,0)$ with $x>0$. Here $u$ is this prescribed transmitter's speed, not an assembly group speed. The unique root and its geometric factors are

$$
s=-\frac{x}{1-u},\qquad r=\frac{x}{1-u},\qquad D_t=1-u,\qquad W^{\mathrm{acc}}=\frac{1}{1-u}
$$

Choose unit positive canonical coupling and normalize the wave comparison by the stationary calibration $q_0/(4\pi)=1$. Then the chapter's wave scalar and the canonical acceleration are

$$
\phi_{\mathrm{wave}}=\frac{1}{r(1-u)}=\frac1x,
\qquad
-\partial_x\phi_{\mathrm{wave}}=\frac1{x^2},
\qquad
A_{\mathrm{canonical},x}=\frac{W^{\mathrm{acc}}}{r^2}=\frac{1-u}{x^2}
$$

At $x=1$, the two accelerations are $1$ and $1/2$. A single stationary calibration cannot remove this speed-dependent ratio. The canonical scalar $1/r=(1-u)/x$ gives the correct $1/2$ gradient. These are evaluations on prescribed source histories, not a claim that the histories solve a many-body dynamical system.

**Smallest repair or disposition:** narrow the gradient-equivalence language to the steady stationary interior case. Present the canonical local scalar from the live Master Equation and keep the wave scalar explicitly separate. A future comparison map can use root-resolved information, but merely matching the moving Jacobian once is not an already-defined map from the summed wave scalar to canonical acceleration.

**Falsifier:** recompute the root, $r$, $D_t$, and the spatial derivative at $(T,x)=(0,1)$. Equality of the two accelerations under the same stationary normalization would refute the example. A specifically defined alternative observable map may resolve a proposed comparison, but does not make the two displayed scalars identical.

### crw-005 action model comparison review — D4: the switched-on stationary comparison omits its wavefront derivative

**Reference and severity:** high; “Cross-Method Guidance,” worked example at lines 295–299 and “Operational Summary,” line 309.

**Claim grade: derived.** With $a=T-T_0-r/c_f$ and the chapter's switched-on wave potential, distributional differentiation gives

$$
-\partial_r\left(\frac{q_0H(a)}{4\pi r}\right)
=\frac{q_0}{4\pi}\left(\frac{H(a)}{r^2}+\frac{\delta(a)}{c_fr}\right)
$$

The first term is the steady inverse-square contribution behind the front. The second is a distribution on the arrival front caused by differentiating $H(a)$. The truncated canonical emission-history integral instead gives an inverse-square contribution gated by $H(a)$; it does not add the wave-gradient delta. Thus the stated gradient connection and coincidence are valid away from the switch front under a fixed normalization, not over the complete switched-on history as written. Smoothing the switch produces a nonzero transition-profile term rather than removing the difference.

**Smallest repair or disposition:** restrict the shared baseline to $T-T_0-r/c_f>0$ with a positive front margin, or use an eternal steady source. If onset remains part of the comparison, display and separately disposition the front term under an explicit observable map. A finite retained-history boundary is a comparison condition, not physical creation or an off state of an architrino.

**Falsifier:** differentiate the chapter's switched profile against a test function supported near $T=T_0+r/c_f$. Absence of the $q_0\delta(a)/(4\pi c_fr)$ term under that differentiation would overturn this finding.

### crw-005 action model comparison review — D5: the temporal smoothing instruction targets the wrong delta

**Reference and severity:** high; “Recommendation,” “Numerical cautions,” line 405, compared with the propagator at line 120 and transport measure at line 209.

**Claim grade: derived.** The propagating selector is $\delta(T-T_t-r/c_f)$, or equivalently a distance selector proportional to $\delta(r-c_f(T-T_t))$. The instructed $\delta(T-T_t)$ selects zero delay and contains no travel distance. Replacing that expression with a narrow profile centered at zero is not a finite-width version of the arrival constraint.

For $c_f=1$, an impulse emitted at $T_t=0$ and observed at $r=2$ arrives at $T=2$. A narrow profile of $T-T_t$ peaks at $T=0$; a profile of $T-T_t-r$ peaks at $T=2$.

**Smallest repair or disposition:** specify a normalized profile of $T-T_t-r/c_f$, or of the canonical distance constraint. State whether the width is in time or distance, and carry the Jacobian between them. If the intent is source-pulse smoothing, apply the profile to the source emission history first, then propagate it; call that a different operation. Preserve strict positive-delay support where required by the declared regulator.

**Falsifier:** substitute $r=2$, $T_t=0$, $c_f=1$ into the proposed profile and locate its maximum. An arrival-centered maximum at $T=2$ without an additional propagation operation would contradict this finding.

### crw-005 action model comparison review — D6: ordinary continuous-emission roots are not isolated velocity impulses

**Reference and severity:** medium; “Event-driven Radial-Transport + Per-Hit EOM,” lines 204, 243, 248, 254, and 286; “Pros and cons,” line 386.

**Claim grade: derived.** The chapter's preferred time-continuous source supplies an active emission root at every reception time on a regular branch. A delta in the emission-time integral is not automatically a delta in reception time. For a stationary transmitter and fixed probe a distance $R>0$ away, the canonical integral reduces to

$$
\int_{-\infty}^{T}\frac{c_f}{R^2}\delta\!\left(R-c_f(T-s)\right)\,ds=\frac1{R^2}
$$

The result is a continuous acceleration contribution. Its integral over a reception window of duration $\Delta T$ is $\Delta T/R^2$, and tends to zero as that window shrinks. This is a fixed-probe diagnostic of the acceleration functional, not an asserted force-balanced stationary two-body solution. It contradicts interpreting each ordinary root as an independently weighted velocity jump. The current [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), “Mollified Causal-Wake Regularization,” lines 2444–2460, explicitly makes this distinction.

**Smallest repair or disposition:** describe regular branch contributions as continuously integrated accelerations. Reserve impulses for a declared pulse-train numerical approximation with quadrature weights, or singular events with proved integrated limits. A solver may still track root events; this does not turn every root evaluation into a physical impulse.

**Falsifier:** evaluate the integral above with $c_f=1$ and any $R>0$, or integrate its result across shrinking reception windows. A finite nonzero jump surviving $\Delta T\to0$ on this regular stationary chart would refute the counterexample.

## crw-005 action model comparison review — open obligations and unsupported generalizations

### crw-005 action model comparison review — O1: neutrality does not supply initial or boundary data

**Reference and severity:** medium; “Setup and Assumptions,” line 23; “Fundamental formula,” lines 101–106; free-space formula, lines 113–137.

**Claim grade: derived for underdetermination; inferred for the missing declaration.** A zero total polarity inventory constrains the source, not the field's boundary trace or homogeneous solution. If $\phi$ solves the displayed PDE for a neutral source, then $\phi+h$ also solves it whenever $h$ solves the homogeneous wave equation. With $c_f=1$, $h(\mathbf X,T)=\sin(X^1-T)$ is an explicit nonconstant example. Neutrality is unchanged, but the field and its gradient differ. The outgoing convolution selects a particular solution; it needs a no-incoming-field/initial-data convention.

**Smallest repair or disposition:** retain neutrality as a source-population hypothesis. State the comparison's domain, initial field and time derivative, and outgoing or finite-domain boundary condition separately. No empirical rejection of neutrality is implied.

**Falsifier:** demonstrate that the declared neutrality condition forbids adding the displayed homogeneous solution without invoking an additional initial or boundary condition. Alternatively, identify explicit data in the assigned chapter that already fixes this freedom.

### crw-005 action model comparison review — O2: mollification does not complete the energy or singular-continuation argument

**Reference and severity:** medium; “Operator diagnostics,” lines 256–286; “Energetics and work,” lines 325–333; “Pros and cons,” line 388.

**Claim grade: inferred from the chapter's unspecified energy channel and the live Energy boundary.** The chapter responsibly says an impulsive limit needs a separate weak-convergence result and that well-posedness requires history and root controls. Preserve those qualifications. However, $\Phi_\eta$ and the claimed work–energy residual are not defined locally, and “via mollified potentials” is not yet a global field-energy account. If a branch scalar $U(\mathbf X,T)$ exists, its chain rule is

$$
\frac{dU}{dT}=\partial_TU+\nabla U\cdot\mathbf V
$$

Even after a quadratic bookkeeping conversion is declared and the gradient matches the acceleration, cancellation of the spatial term leaves $\partial_TU$. The source-history exchange and boundary account must balance that term; smoothing alone does not do so. [Energy](../../../../content/markdown/aaa/dynamics/energy.md), lines 212–224 and 1236–1250, separates the established regular local scalar from the open global conservation construction. Likewise, smoothing the causal constraint alone does not prove control at a simultaneous separation-floor failure.

**Smallest repair or disposition:** identify the exact local scalar/regulator being compared, the kinetic proxy, the explicit-time/history term, and the boundary account. Phrase residual evaluation as a proposed test unless a named run is cited. Keep global conservation and singular continuation open; do not create a new proof program or claim that the local scalar theorem is still wholly unproved.

**Falsifier:** supply within the cited scope a complete same-record energy identity including the explicit-time/history and boundary terms, and a defined regulator limit with the singular loci controlled. Such evidence would resolve the identified obligation; a small residual of an undefined account would not.

### crw-005 action model comparison review — O3: inverse-square weighting does not itself establish near-source dominance

**Reference and severity:** medium; “Pros and cons,” Method 3, line 385.

**Claim grade: derived for the insufficiency; inferred for the required disposition.** A declared cutoff or summation prescription defines a sum but does not bound its tail relative to nearby contributions. The magnitude ratio of two aligned, equal-polarity-product contributions is

$$
\frac{A_{\mathrm{far}}}{A_{\mathrm{near}}}
=\frac{W_{\mathrm{far}}^{\mathrm{acc}}}{W_{\mathrm{near}}^{\mathrm{acc}}}
\left(\frac{r_{\mathrm{near}}}{r_{\mathrm{far}}}\right)^2
$$

At $c_f=1$, take $r_{\mathrm{near}}=1$, $D_{t,\mathrm{near}}=1$, $r_{\mathrm{far}}=10$, and $D_{t,\mathrm{far}}=10^{-3}$. The respective weights are 1 and 1000, so the far contribution is ten times larger. These factors are realized at one reception event by sub-wake-speed affine transmitter histories with axial velocities 0 and 0.999 and appropriately chosen emission positions; all selected roots are simple and a positive common Jacobian floor can be declared. A finite domain containing both roots already supplies a cutoff. This is a counterexample to the stated implication, not evidence that distant roots dominate an evolved population.

**Smallest repair or disposition:** say that inverse-square geometry favors shorter chords with all other factors fixed. Actual dominance additionally needs a bound on root weights, population/multiplicity, cancellations, and omitted-tail error for the chosen histories.

**Falsifier:** show that the proposed affine roots cannot realize these distances and denominators under the causal condition, or supply an explicit chapter assumption that rules them out and quantitatively bounds the distant sum below the near sum.

## crw-005 action model comparison review — editorial and source issues

### crw-005 action model comparison review — E1: load-bearing symbols and strength conventions need local definitions

**Reference and severity:** medium; opening line 3; setup lines 19–23; source units at line 60; transport strength at lines 207–221; per-hit equation at lines 233–243; diagnostics at lines 258–279; observation notation at line 348.

**Claim grade: measured for the occurrences by the full numbered chapter read; inferred for the explanatory defect.** The opening uses $D_t$ before naming it; the per-hit equation does not locally define $\kappa$, $q_j$, $q_{o'}$, or $\sigma_{q_jq_{o'}}$. The single-impulse strength is $Q$ in Method 2 and $q$ in Method 3, while $q(T_t)$ denotes a time density. The symbols $\varepsilon_G$, $\varepsilon_S$, the map $R$, and $A(T_k),L(T_k)$ also lack the local definitions needed to use their formulas. The dimensional relation $[q]=[\phi]\,\mathrm{length}$ follows from the displayed PDE and point source; describing $q$ as “amplitude per unit time” is consistent only after defining the integrated amplitude $Q$ with $[Q]=[q]\,\mathrm{time}$. This is an unresolved units convention, not a demonstrated missing power of $c_f$ in the PDE.

**Smallest repair or disposition:** define $\kappa>0$ as coupling, $q_j,q_{o'}=\pm\epsilon$ as intrinsic polarities, and $\sigma_{q_jq_{o'}}=\operatorname{sign}(q_jq_{o'})$ beside the per-hit law. Distinguish pulse strength from continuous source density and intrinsic polarity. Name positive residual denominator floors with the units of their respective integrals, define the reconstruction map, and explain the hit-history observables. Link to the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) where its law is first used. Replace the opening's “unless stated otherwise” with the unconditional rule $c_f=1$ for numerical instantiations; symbolic dependence may remain explicit.

**Falsifier:** locate local definitions resolving these meanings and units before or at their first load-bearing use in the reviewed bytes, or provide an explicit dimensional convention that the report overlooked. No actual non-unit numerical $c_f$ was found in the assigned chapter by the numbered read.

### crw-005 action model comparison review — E2: performance and stability recommendations lack a declared measurement scope

**Reference and severity:** medium; Method 1 summary, line 81; “Numerical stability and well-posedness,” lines 331–332; “Pros and cons,” lines 368, 376, 379, and 386; “Implementation Summary,” line 411.

**Claim grade: inferred.** The earlier cost discussion correctly requires a declared domain, resolution, and measured wall time, and line 338 repeats the profiling requirement. Later phrases such as “computationally heavy,” “efficient,” “costly,” “numerically lightweight,” and “easiest” lose those conditions. Likewise, a discretized wave equation is not automatically stable: for the stated centered cubic-grid stencil, a Fourier mode satisfies

$$
\sin^2(\omega\Delta T/2)
=\left(\frac{c_f\Delta T}{\Delta X}\right)^2
\sum_{a=1}^{3}\sin^2(k_a\Delta X/2)
$$

Here $k_a$ are the three spatial wave-number components and $\omega$ is the discrete temporal frequency. A real-frequency stability condition for this particular uniform-grid stencil is $c_f\Delta T/\Delta X\le1/\sqrt3$; other stencils require their own bound. This follows by inserting a discrete Fourier mode, not by assuming a physical dispersion law. Root evaluation is similarly conditioned by $|D_t|$: at fixed geometry a root-equation perturbation produces a first-order root displacement proportional to $1/|D_t|$.

**Smallest repair or disposition:** label method-cost statements as workload-dependent expectations, or cite an actual matched-accuracy benchmark with domain, history depth, root count, implementation, wall time, and memory. Carry the declared-stencil and positive-floor conditions into stability summaries. No new benchmark campaign is required for this review; cautious, conditional prose is sufficient.

**Falsifier:** identify a benchmark or numerical contract in the assigned chapter supporting the unrestricted rankings, or demonstrate stability of the specified centered stencil above its worst-mode bound. A measured ranking on one workload resolves only that workload.

### crw-005 action model comparison review — E3: time-origin wording and repeated summaries obscure the method contract

**Reference and severity:** low overall, with a concrete medium-priority notation correction; line 323 in “Causal root structure”; repeated method advice at lines 290–309, 350–358, 394–412; malformed “Pros” hierarchy at lines 362–366.

**Claim grade: derived for the zero-delay correction; measured for the repeated sections and list indentation by `nl -ba`; inferred for editorial priority.** Line 323 says exclusion of $r=0$ “beyond $T_t=0$.” From $r=c_f(T_r-T_t)$ and $c_f>0$, $r=0$ means $T_r=T_t$, independently of the chosen time origin. An emission epoch of zero is not a delay of zero. For example, $T_t=0$, $T_r=2$, $c_f=1$ gives $r=2$, a positive-delay hit. The multiple summary blocks repeat roles without resolving the comparison map, and the first Method 1 pro is at the same indentation as the “Pros” parent while the following entries are nested.

**Smallest repair or disposition:** replace the time condition with zero delay $T_r-T_t=0$; consolidate repeated recommendations into one method-selection summary; make the three Method 1 pro entries siblings. Preserve mathematical expressions and all existing equation links in any future authorized edit.

**Falsifier:** a valid causal root with $r=0$ and $T_r>T_t$ at positive $c_f$ would refute the time correction. For the editorial part, a rendered hierarchy or substantive distinction between the repeated blocks that supplies otherwise missing instruction would support retaining it.

## crw-005 action model comparison review — bounded repair receipt

The authorized repair pass applied the smallest safe chapter changes for D1–D6 and E1–E3. D1 now separates operator-consistency residuals from a direct normalized field-discrepancy norm. D2 restores the arrival-time delta for a single impulse. D3 narrows moving-source gradient language and keeps Jacobian transport separate from canonical emission strength. D4 limits the stationary switched-on comparison to the regular interior and identifies the front derivative as separate. D5 smooths the arrival selector rather than the zero-delay emission selector. D6 distinguishes continuous regular causal-root acceleration from true impulses. E1 defines the load-bearing coupling, polarity, transmitter denominator, residual floors, and normalized-unit rule locally; E2 qualifies workload and stencil-dependent performance language; E3 corrects the zero-delay wording and the malformed Method 1 list hierarchy.

O1–O3 remain open: neutrality does not supply initial or boundary data; mollification does not complete global energy or singular-continuation proofs; and inverse-square weighting does not establish near-source dominance without bounds on weights, multiplicity, cancellation, and omitted tails. No new acceptance claim is made for these obligations.

Focused validation after the repair returned no `git diff --check` errors for the chapter or report. The repair did not regenerate equation mappings. Falsifier: a rerun of the chapter-specific mathematical checks that finds a remaining D1–D6 or E1–E3 statement inconsistent with the repaired bytes requires reopening the corresponding disposition.

## crw-005 action model comparison review — preservation checks and concerns not sustained

Claim grade: measured. The conversion ledger's line 141 identifies this chapter's edition-1.0 conversion. `git diff c973402b9^ c973402b9 -- <chapter>` was inspected, rather than relying on the commit message. Its parent is `38ffb12969d6b64d959610b3be1c59925ab8dec9`; the conversion commit is `c973402b96d50e45b9bdac0da2bd680e6c26116f`. The parent version has SHA-256 `31d7c4529d4a20eca3ab38fedf82f4195b7978fb95725d2c7eb682e598c9dcce` and 418 lines by `git show ... | shasum -a 256` and `git show ... | wc -l`. `git diff c973402b9 -- <chapter>` returned no differences at inspection. The displayed diff retains the mathematical passages implicated above; this review does not attribute those defects to the editorial conversion.

An in-memory Node extractor was tested first on a known display block and two known Markdown links. Only after those tests passed did it read the historical and current chapter. It found 16 display blocks in each version, equal character for character inside the display delimiters, and retained all 31 historical link targets; the current chapter has 32 link occurrences, including its added wake link. This is a bounded preservation measurement, not semantic certification of every sentence. Falsifier: a missed display, altered display body, or missing baseline link in those exact versions would invalidate the corresponding extractor result.

The following concerns were checked and are not raised as defects:

- **Wave-equation normalization:** the factor $c_f^2S$ at lines 38 and 96 is consistent with the chosen Green kernel. Demanet's unit-right-hand-side kernel converts to $\delta(T-r/c_f)/(4\pi c_f^2r)$; multiplying the source by $c_f^2$ produces the chapter's convention. No normalization repair is proposed.
- **Moving-root Jacobian:** at fixed probe, $g'(T_t)=-1+\mathbf n\cdot\mathbf V_t/c_f$, so the absolute denominator in lines 156–175 is correct on simple roots. It equals $|D_t|/c_f$. The error in D3 concerns the subsequent gradient identification, not this delta-collapse identity.
- **Canonical acceleration:** lines 233–243 retain $W^{\mathrm{acc}}=c_f/|D_t|$ once and do not multiply by receiver playback $D_r/D_t$. Line 389's wording should be clarified under E1 so that recording both $D_t$ and $W^{\mathrm{acc}}$ is not read as multiplying two independent factors. No extra multiplier is proposed.
- **Transport normalization:** for a positive delay, integrating the line-209 density over space cancels $4\pi r^2$ against spherical volume measure and gives the impulse strength $q$. The continuity equation is consistent in the weak sense with injection at the fixed emission site; that conserved amplitude does not itself establish energy conservation.
- **Theory boundary:** the scalar wave equation is explicitly a comparison surrogate, and the chapter excludes particle-identification outcomes at line 414. Its use is not, by itself, an illicit import of a standard physical law into the primitive dynamics. The comparison failures above must be repaired without replacing the canonical acceleration law.
- **Local scalar availability:** current canon does derive a scalar representative on connected regular moving-root charts. Rejecting all moving-source scalar potentials would conflict with that live theorem. Global, boundary-crossing, and regulator-specific extensions remain separate.

Claim grade: derived for the normalization, Jacobian, transport, and scalar distinctions from the equations cited; measured for the wording boundaries by the complete target read. Falsifier: an algebraic failure in the displayed normalization/derivative identities, a missing hypothesis in the cited local scalar theorem, or different target text at the recorded hash requires revising the corresponding conclusion.

## crw-005 action model comparison review — validation receipt and limits

The independent mathematical references are the explicit counterexamples and derivations in this report. External sources were inspected only for the mathematical comparison kernel and vector-calculus identities: the two MIT references linked in D1 and D2. No standard-physics conservation law, mass law, magnetic response, or observer metric was imported as a substrate premise. No external empirical result or solver-performance measurement is claimed.

Claim grade: measured. An in-memory centered-derivative instrument first returned the known derivative of $x^2$ at $x=2$ within $10^{-9}$. It then checked D3 at $c_f=1$, obtaining $(T_t,r,D_t,W^{\mathrm{acc}})=(-2,2,0.5,2)$ and canonical acceleration $0.5$. At derivative steps $10^{-3}$, $10^{-4}$, and $10^{-5}$, the wave-gradient values were respectively `1.0000010000009718`, `1.0000000099996686`, and `1.0000000001009202`; the canonical-scalar gradients were respectively `0.5000005000004859`, `0.5000000049998343`, and `0.5000000000504601`. The algebraic reference values are 1 and 0.5. These finite differences corroborate the worked example; they are not an independent EOM evolution test. Falsifier: rerunning the stated centered derivative on $1/x$ and $0.5/x$ at $x=1$ yields a regulator-stable equality of the two gradients.

`node scripts/validate-equation-mapping-links.mjs` passed for its 23 registered equation links. Inspection of that validator and its registry shows that this is the curated-link check, not validation of all 16 display links in the assigned chapter and not a mathematical review. No generator write was run.

Claim grade: measured. A report-specific in-memory Node validation passed all 19 heading-prefix checks and all 12 finding-field checks. It checked every finding for its reference/severity, claim grade, repair/disposition, and falsifier fields. All 151 extracted TeX expressions, including eight displays, compiled with the repository-bundled KaTeX 0.16.11 using `throwOnError: true`; this is syntax compilation, not a visual layout review. All nine local report-link occurrences resolved to existing files, and both external reference links were opened and inspected. The parser first passed known inline/display, code-exclusion, and unmatched-delimiter controls; KaTeX first accepted a known valid expression and rejected an incomplete fraction. The report contained no trailing whitespace by the same scan.

Claim grade: measured. The chapter-specific check resolved all 32 link occurrences to existing local destinations. All 16 display links had immediate placement, resolved to the recorded chapter in `content/generated/equation-mapping/corpus-equations.json`, and matched that registry's TeX using the exported `parseCorpusDisplayEquations` function from `scripts/build-equation-mapping-corpus.mjs`. Two preliminary comparisons reported only 12 raw-text formula matches because four multiline list equations carry source-container indentation that the registry strips. Inspection of those four strings and of the generator's `stripContainerPrefix` call resolved the discrepancy; the canonical parser first passed a known indented two-line equation and then matched all 16 target formulas. This was a comparison-normalization issue, not demonstrated generated drift. No files were changed to make the comparison pass.

Claim grade: measured. The final chapter validation again returned SHA-256 `4bbca4d645699662dde2500466f659bc80d4984180d33e49da68ec663763bb38` and 425 lines. `git diff --check -- <chapter> <report>` returned no errors; because the new report is untracked, its whitespace and structure were checked directly as described above. Falsifier for these validation claims: rerunning the named checks on the recorded bytes finds an unresolved local target, a missing finding field, an invalid TeX expression, a mismatched registry formula after canonical parsing, or a changed chapter hash. The only file written by this review's tool calls is the assigned evidence report; no tracker or generated file was written.

Residual limits: no solver was run, no self-consistent trajectory was certified, no global energy identity was proved, and no cost ranking was measured. The review remains limited to the assigned source snapshot and the dependency passages named above. Structural validation cannot establish mathematical correctness; the derivations carry that burden.
