# OPS-031 — Absolute Time Defense review, 2026-09-26

## Scope and disposition

The full [Absolute Time Defense](../../../../content/markdown/aaa/foundations/absolute-time-defense.md) chapter was reviewed report-only for the due early-chapter cycle. No actionable new defect was demonstrated. The two historical repairs selected for explicit survival checks, F4-1 and F4-4, survive; the prior no-change affine metric handoff also survives. No substantive source repair is proposed. Existing physical clock, universality, memory, and response-map obligations remain open; this disposition does not establish the theory's recovery of relativity.

Measured source identity: `shasum -a 256` before review returned `35742a23faf464df67f3d7cfcc9c2f11f4fa6481aa92ed2070ef8aa382b0d2d3`; `wc -l` returned 810. The source was read across 1–275, 276–570, and 571–810, with repeated focused reads of the phase, metric and historical-repair passages. Scoped `git --no-optional-locks status --short -- <chapter> <receipt>` returned no entries before this receipt was written. Historical source identity and navigation-only differences are preserved rather than rewritten.

This pass follows live AGENTS.md, the startup router, architrino-review skill and its owner, corpus-reviewer, and periodic-document-review. The continuing review lineage is unchanged; there is no model-adoption experiment or model-superiority claim. Mathematical independence below comes from explicit derivations and separately inspected source evidence, not another model's agreement. Only this receipt is written. Parent coordination owns coverage dates and shared records; CRW-005 remains closed.

## Whole-chapter coverage

| Lines | Inspected content and disposition |
| --- | --- |
| 1–43 | Absolute parameter, product foliation and observer simultaneity; postulate and empirical recovery are separated. |
| 44–118 | Complete history state, deterministic chart scope, phase extraction and medium-relative velocity; explicit effective-time convention retained. |
| 119–163 | Circle-map lift, physical turn count, return duration, mean frequency and phase-coherence distinction; F4-4 survives. |
| 164–232 | Periodic versus invariant-circle certificate, margin/slack, memory representation and medium record; the proposed symplectic account remains open rather than equivalent to clock validity. |
| 233–343 | Universality, connected transport, reference/holonomy assumptions, spectral separation and composition; no common-origin-to-universality shortcut remains. |
| 344–424 | Clock/metric consistency, quadrupole definition, conditional response and higher moments; F4-1 survives and F4-2's physical-sufficiency boundary remains explicit. |
| 425–514 | Free fall versus clock composition, empirical ceilings, weak-field signs and speed conventions; source attribution checked below. |
| 515–575 | Two-way speed, reciprocal harmonics and historical PPN vector; no current-best-bound claim is inferred. |
| 576–707 | Metric positivity, single-cone conditions, affine equivalence, reduced forward chart and inverse identifiability; prior no-change algebra survives. |
| 708–810 | Metric components, null speed, shared-record projections and falsifiability boundary; no substrate law is inferred from the effective metric ansatz. |

Dependency reads are bounded checks, not coverage of additional chapters. [Proper Time and Time Dilation](../../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), lines 1–38, now explicitly supplies the native/effective chain rule; [Emergent Metric](../../../../content/markdown/aaa/spacetime/emergent-metric.md), lines 120–170, supplies the same quadratic handoff; [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), lines 1–40, retains the distinction between the affine substrate parameter and physical clocks. Academic/math guide rules and previously read terminology controls govern this review; no controlled canon was edited.

## Historical accepted corrections: preserved transition and independent rechecks

The [existing campaign queue](../../aaa-corpus-rewrite/work-queue.md) records the F4-1 through F4-4 acceptances and before/after hashes. Actual source changes were independently inspected through `git diff b97703d9^ b97703d9 -- <chapter>`, rather than inferred from a commit title. The parent source hashes to `ecc01d492409e390ac8c31669754c17b91dcb6e41e6fe9c1ebdf9fe37c641a6b`; the child commit `b97703d989319aca877bb418cdc8b18b2fe104ec` hashes to the current `35742a23...` value, by `git show <revision>:<path> | shasum -a 256`. These immutable versions preserve the before/after sources. The intermediate accepted F4-4 receipt's hash differs by its subsequently added equation-viewer navigation link, as separately documented in the historical queue; this review uses the inspectable final commit directly and does not claim to recreate that intermediate file.

### F4-1 — clock denominator, survives

Before, the clock ansatz was $A\sqrt{1-q}$, where $q=B_{ij}w^iw^j/c_0^2$. The unchanged metric required $\sqrt{A^2-q}$. After, lines 348–376 use $A\sqrt{1-q/A^2}$ and explicitly require $A>0$ and $q<A^2$.

Independent reference is division of the unchanged quadratic metric by $dt_{\mathrm{eff}}^2$, followed by factoring $A^2$ from its positive square root. It yields

$$
\left(\frac{d\tau}{dt_{\mathrm{eff}}}\right)^2=A^2-q,
\qquad
\sqrt{A^2-q}=A\sqrt{1-q/A^2}.
$$

At $c_f=1$, choosing $c_0=1$ solely as the effective comparison calibration, $A=1/2$, $B=I$, and $w=(1/4,0,0)$ gives $\sqrt3/4$ in both repaired expressions. The old expression gives $\sqrt{15}/8$. These are exact arithmetic identities for an assumed effective handoff, not clock simulations and not identification of physical $c_f$ with $c_0$.

Correctness: the mismatch is removed. Preserved meaning: the metric, residual bracket and recovery-target status remain. Explanatory usefulness: the new paragraph states the timelike domain and shows why the denominator is required. Falsifier: a different algebraic result from the unchanged metric with the same definitions, or an explicit different normalization of $B$ invalidating this comparison. No introduced regression found.

### F4-4 — phase advance per return versus frequency, survives

Before, the circle-map rotation number supplied average phase advance modulo one, without a physical lift/return-time frequency account. After, lines 125–159 explicitly retain full turns and define mean cycles per elapsed effective time.

Independent counterexample to the old inference: lifts $F(x)=x+1/4$ and $F_1(x)=x+5/4$ induce the same circle map but different turn counts. With the first lift, constant return durations one and two give frequencies $1/4$ and $1/8$ cycles per time unit despite the same map. The new expression distinguishes both cases. More generally, writing the numerator as $n a_n$ and the denominator as $n b_n$, convergence $a_n\to a$ and $b_n\to b>0$ gives frequency $a/b$ by the quotient limit theorem. This is the exact sufficiency condition now stated; independence of starting phase and instantaneous phase coherence remain separate requirements.

Correctness: missing physical time/turn information is restored. Preserved meaning: the original rotation number and periodic-clock distinction remain. Explanatory usefulness: doubling durations is an explicit reader-checkable test. Falsifier: identical full physical lift and return-duration data yielding different limits under the stated hypotheses, or a derivation of unique physical frequency from the same circle map without those data. No introduced regression found. These mathematical return maps are not claimed to be certified architrino histories.

## Explicit previous no-change disposition: affine metric handoff

The historical queue's “Complete-reading assessment and source support” explicitly checked the constant affine transformation and metric export without requesting a correction. Current lines 611–659 retain that conditional lemma. Rechecking it independently, take constant $A>0$, positive-definite $B=L^TL$, and constant flow $u$. Then $dt'=A\,dt$ and $dy=L(dx-u\,dt)/c_0$ give

$$
dt'^2-dy^Tdy=A^2dt^2-\frac{1}{c_0^2}(dx-u\,dt)^TB(dx-u\,dt).
$$

This exactly reproduces the declared handoff. Expanding $ds^2=-c_0^2d\tau^2$ in $x^0=c_0t$ gives $g_{00}=-A^2+u^TBu/c_0^2$, $g_{0i}=-(Bu)_i/c_0$, and $g_{ij}=B_{ij}$ as printed. Setting the quadratic form to zero for $dx/dt=u+c\hat k$ yields $c=c_0A/\sqrt{\hat k^TB\hat k}$, matching the photon row.

No-change verdict: correct conditional algebra with useful limits. This result assumes constant universal response; it neither derives universality nor removes the substrate frame or arbitrary gradients. Falsifier: a nonzero leftover term after this substitution with constant coefficients and the same coordinate definitions. This is an independent calculation of the claimed identity, not acceptance by comparison to another chapter alone.

## Other no-change checks and rejected concerns

- The global product-coordinate projection has $dT(\partial_T)=1$, hence no zero of $dT$; exactness gives closedness. The text correctly treats the underlying global coordinate as a postulate rather than proving it from closedness.
- The framing statistic is trace-free because normalized unit directions give $h_{ij}Q^{ij}=\langle1\rangle-1=0$. Equal Cartesian-axis weights give $Q=0$ but fourth moment $1/3$ along an axis, whereas a uniform sphere gives $1/5$. Current text explicitly refuses to infer complete isotropy or physical response sufficiency from this statistic. This is distribution-level algebra, not a counterexample using certified assemblies.
- The memory passage no longer infers clock drift from non-symplectic reduced dynamics. As a mathematical comparison, $\dot\theta=\Omega$ and $\dot r=-k(r-r_0)$ have constant phase rate and contracting area. Current F4-3 language accommodates that distinction while retaining physical exchange obligations.
- Clock-rate ratios in this chapter are explicitly per effective time. The nearby owner uses native-time rates and supplies $J=dt_{\mathrm{eff}}/dT$; the conversion is $\Omega_{\mathrm{eff}}=\Omega_T/J$, with matching reference calibration. The shared symbols cannot be identified without conversion, but the present chapter does not say to do that. No automatic cross-chapter numerical equality is certified.
- The weak-field square-root expansion gives $1+\Phi_N/c_0^2-w^2/(2c_0^2)$; substituting $\Phi_N=-U_N$ gives the printed negative potential-depth correction. This is an observer recovery target, not an imported primitive force law.
- The lower singular-value bound at lines 685–702 is on a declared complement to coarse-graining fibers. It controls inverse reconstruction of retained directions, not recovery of discarded microstates and not a bound on the largest forward derivative. Replacing the broad word “sensitivity” with “inverse sensitivity on that reduced chart” remains an optional clarification already noted historically; no new substantive finding or compulsory edit is raised.

Falsifiers for these no-change dispositions are respectively a failure of the displayed differential, trace, explicit comparison flow, chain-rule conversion or series expansion, or a downstream use of the singular-value floor as an upper forward-derivative bound. No such use was established in this chapter.

## Source attribution checks and limits

The [Nagel author abstract](https://arxiv.org/abs/1412.6954) was inspected this pass and supports $(9.2\pm10.7)\times10^{-19}$ at 95% confidence for the orientation-dependent oscillator-frequency comparison. The [MICROSCOPE author abstract](https://arxiv.org/abs/2209.15487) supports the titanium/platinum result $[-1.5\pm2.3\,\mathrm{(stat)}\pm1.5\,\mathrm{(syst)}]\times10^{-15}$ and identifies differential electrostatic accelerometry; it is not a clock-composition measurement. No raw data were reanalysed.

The published [Will 2014 review](https://s3.cern.ch/inspire-prod-files-0/0c108cd9f65d955d209cb441fc3da582), Table 4, printed page 46, was inspected through its PDF text. Its entries match the chapter's five historical values: $2.3\times10^{-5}$, $8\times10^{-5}$, $4\times10^{-5}$, $2\times10^{-9}$, and $4\times10^{-20}$. The table identifies different measurements, including pulsars. The direct DOI request failed and the PDF screenshot request timed out; successful text inspection supports attribution but is not a visual audit. No claim that this vector is current or universally applicable is made; the chapter itself requires current coefficient-specific selection for a present application. The [Data Tables author record](https://arxiv.org/abs/0801.0287) was opened as the named catalogue, without selecting a modern coefficient or making a tightest-bound claim.

Source checking establishes attribution and scope only. It supplies no absolute-time derivation, medium coefficient, clock-universality theorem or physical validation. The falsifier is a materially different value or experimental scope in those named primary records, not a newer bound on a different coefficient.

## Completion and remaining limits

Dependency hashes by `shasum -a 256`: Proper Time and Time Dilation `fca269ee45aac0451e167856af96d02358d3bc8fdc981ade8f41bd075066025f`; Emergent Metric `47441fb210ec54d13e64888c9aa85f0d7257cc8c3d68da97d8992b687ab659b0`. These record the scoped dependency passages, not whole-file certification.

The final source hash remains `35742a23faf464df67f3d7cfcc9c2f11f4fa6481aa92ed2070ef8aa382b0d2d3`. No corpus source was changed, and no publication, regeneration, solver execution, new parser/checker, structural validator or rendered-layout check was performed. Review time and operator burden were not measured. This pass completes one whole-chapter review, two accepted-repair survival samples, and one explicit prior no-change sample. It does not complete the monthly population or establish a corpus error rate. The parent owns the remaining cursor and due dates; no new owner action is requested for this chapter at the inspected snapshot.
