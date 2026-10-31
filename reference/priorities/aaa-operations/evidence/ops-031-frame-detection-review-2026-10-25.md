# OPS-031 — Detecting the Absolute Frame review, October 25, 2026

## Scope and disposition

The due second early-cycle reservation completes a report-only whole-chapter review of [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), launch sequence 7. No new actionable correction is demonstrated. Native `wc -l` measures 373 source lines, and `shasum -a 256` measures `438cca92df7117cc00e1bd7decebb00ac4dc50af27b331024805a631b391c21b`, identical to the source identity in the [September 29 first-cycle receipt](ops-031-detecting-absolute-frame-review-2026-09-29.md). Native `cmp` confirms equality with the frozen copy at `.tmp/ops-031-oct25/detect/detecting-the-absolute-frame.md` after review.

The reviewer read lines 1–195 and 196–373 and recovered the clipped final portion with a separate 295–373 read. Startup follows live AGENTS.md, the generated router, review skill owner, corpus-reviewer and periodic-review procedure. Two actual accepted corrections and an actual prior no-change claim survive the explicit independent checks below. This receipt adds one whole-chapter disposition, not completion of the monthly population. Operations owns coverage, scheduling and shared records; CRW-005 remains closed. No chapter, shared control, historical reference or numerical instrument is edited.

## Whole-chapter coverage

| Lines | Inspected content and disposition |
| --- | --- |
| 1–68 | The preferred rest structure is declared through transmitter-independent wake propagation. Complete tagged geometry is distinguished from a summed observer readout and from operational hiding across measurements. The rest criterion concerns an interval rather than every instantaneous zero of velocity. |
| 70–123 | Full positive-radius sphere uniqueness and finite four-point reconstruction. The Gram determinant tests exact affine rank; its dimensional magnitude alone is not a measurement-error bound. |
| 125–183 | Continuous aperture versus finite samples, fixed-radius versus fitted-radius local sensitivity, global ambiguity and required unknown/error declarations. The two-center construction and Schur elimination are correct at their stated local scope. |
| 185–245 | Diameter, emission-time-parametrized motion, self-hit chord equality and separation of prescribed geometry from assembly response. Straight spatial geometry does not preclude acceleration or a geometric self-root. |
| 247–293 | Coordinate meaning, seven continuous substrate generators, conditional action-derived charges and operational comparison. The sound analogy explicitly excludes a material void and does not answer interferometer null results. |
| 295–337 | Tagged emission injectivity on the declared window, philosophical comparison and a rest diagnostic rather than an operational detector. Tags supply identity and polarity; support geometry alone does not. |
| 339–373 | Controlled deterministic matched-history diameter, calibrated output metric/tolerance and the separate statistical-distribution problem. The physical hiding bound remains a recovery target. |

Nearby dependency checks are limited rather than additional whole-chapter coverage. [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md), lines 1–85, uses the same complete-state origin and distinguishes a mathematical coordinate construction from apparatus access. [Observer Framework](../../../../content/markdown/aaa/spacetime/observer-framework.md), lines 61–77, retains apparatus response, modulation, calibration covariance, nuisance family and boundary-wake data as part of the compared record. Native hashes measured for these dependencies are respectively `9342d9e386149864b886125fc21b05393cfcfb3533b8ca25d6381ed5ae6bbdab` and `64eb792c613260c5b2a77e1f834e9da4366bb9cf0dcfe4056a8ebf670bd58c4a`. No new physical response or current empirical bound is inferred from these reads.

## Accepted-repair survival checks

The [existing campaign queue](../../aaa-corpus-rewrite/work-queue.md#foundations-document-7--detecting-the-absolute-frame-review-2026-09-09) preserves F5-1 through F5-3 and their accepted September 9 integrations, including before/after claims and source identities. The present claim-level checks use that actual record, not a reconstructed hypothetical repair. Independent mathematical support is the explicit algebra and counterexamples below, not reviewer agreement.

**F5-1 survives, current lines 98–183.** Before, an aperture floor and a positive direction matrix were treated as a universal inverse acceptance criterion. After, exact uniqueness, local conditioning, fitted radius and separated-center selection are distinguished. Subtracting squared-distance equations gives $2(\mathbf Y_\alpha-\mathbf Y_0)\cdot\mathbf z=\|\mathbf Y_\alpha\|^2-\|\mathbf Y_0\|^2$. Affine independence gives the unique center; the Gram determinant is the squared determinant of those differences. Scaling all lengths by a factor scales it by that factor to the sixth power, so its unnormalized numerical size alone cannot bound error.

Differentiating the radial residual gives $\delta r_k=-\hat{\mathbf n}_k\cdot\delta\mathbf z-\delta R$. With positive normalized weights, fixed radius produces $G=\sum w_k\hat{\mathbf n}_k\hat{\mathbf n}_k^T$. Minimization over free radius sets $\delta R=-\bar{\mathbf n}\cdot\delta\mathbf z$ and leaves $C=G-\bar{\mathbf n}\bar{\mathbf n}^T$. The chapter's normalized-unit example uses $c_f=1$, $a^2=2/3$ and $b^2=1/3$: four coplanar samples are unit distance from both axial centers. Their equal weights give $G=I/3$ at either center but $C=\operatorname{diag}(1/3,1/3,0)$. Local fixed-radius rank does not select a global center. Finite samples also have zero solid-angle area while four affinely independent samples can identify a sphere exactly.

Correctness survives these exact calculations. Meaning is preserved as conditional geometric reconstruction, and explanatory usefulness survives because the text names its actual unknowns and error requirements. Falsifier: an algebraic failure under the stated definitions, or a current claim that positive local $G$ alone establishes global uniqueness or that positive continuous aperture is necessary for every finite exact reconstruction. None occurs. This review supplies neither an apparatus noise model nor an EOM realization.

**F5-3 survives, current lines 339–373.** Before, the observer diameter did not specify a calibrated output space, admissible comparison family or deterministic versus statistical interpretation. After, one apparatus protocol, matched preparation/environment rule, erasure map, readout map, output metric and tolerance are fixed before evaluation. A scalar output rescaling by $\alpha$ changes Euclidean diameter by $|\alpha|$; transforming the metric/tolerance consistently preserves the physical comparison. This elementary transformation is the independent reference for the units qualification.

Identical binary-output laws at two velocities can yield one outcome zero and the other one. That sampled outcome diameter is nonzero although the laws are identical. Conversely, two different laws can yield matching individual outcomes. Thus a deterministic-output diameter does not by itself test statistical law invariance. The target now expressly requires the appropriate ensemble, distance and confidence analysis for the statistical problem. These are abstract measurement-model examples, not asserted architrino histories or preferred-frame signals.

Correctness survives the output-type and calibration distinction. Meaning preserves a quantitative physical recovery target; explanatory usefulness improves through the stated controlled family and testable falsifier. A current comparison of unrelated preparations, a post hoc tolerance change, or individual outcomes treated as distributional equality would reopen the repair. No such use is established. The absence of a bound's derivation remains different from a demonstrated above-bound prediction.

## Actual prior no-change disposition

The historical F5 subsection “What survives and a useful next derivation” and the September 29 receipt explicitly leave the full-sphere uniqueness and diameter identities unchanged. Both survive here.

If a positive-radius full sphere had distinct centers, subtracting their squared-distance equations would place every sphere point in one affine plane with normal equal to the center difference. A three-dimensional nondegenerate sphere is not contained in a plane, so its center is unique. Equal tagged supports then recover equal center curves on the declared emission window; absolute continuity yields equal velocities almost everywhere. Tags carry identity and polarity. This reasoning does not recover omitted history or decompose an unrestricted summed observer signal.

A nonempty center set has diameter zero exactly when all its points coincide. For an affine curve $\mathbf Z(T)=\mathbf Z_0+\mathbf V T$ over a bounded interval, its diameter is $\|\mathbf V\|$ times the interval duration. Fixed spatial translation and orthogonal rotation preserve those distances. The chapter does not extend this scalar formula to arbitrary accelerated histories or derive the fixed substrate identification from the scalar itself.

Correctness, the complete-state meaning and explanatory usefulness survive. Falsifier: use of a degenerate support as a full sphere, missing identity/window tags, or a velocity reconstruction from the diameter alone for arbitrary motion. None appears in this whole-chapter reading. This no-change sample supplies no general observer-hiding theorem.

## Remaining boundaries and rejected concerns

Absolute continuity bounds a causal chord by the integral of speed; a strictly sub-wake-speed history cannot meet the same-transmitter equality. Uniform straight speed above $c_f$ also fails that equality at every positive delay, while exactly $c_f$ produces riding rather than an isolated ordinary root. The chapter already keeps these geometric statements separate from binding and inertia. Curvature and recurrence do not replace the causal-root equation.

Three translations, three rotations and one time translation count seven continuous substrate generators. Discrete reflections add no continuous generator. Exact charges remain conditional on a symmetry-preserving delayed action and its residual closure. Galilean and Lorentz groups occur as explicitly marked comparison structures, not imported substrate premises.

The unchanged Nagel benchmark remains a dated observer-level apparatus result. The September 29 receipt records its primary-source check and its channel limits. This review reuses that attribution for unchanged source bytes; it does not claim a fresh external-source audit, newest bound or raw-data reanalysis. A changed quoted value or experimental scope, or an application of it as a primitive wake-speed measurement, would reopen the attribution. No new source claim is made here.

Finite-instrument error bounds, temporal sampling guarantees, actual retained assembly construction and calibrated common-channel hiding remain open at their stated scopes. These existing obligations are not new editorial findings and do not authorize new research or source edits. No causal attribution to a previous editor is made.

## Validation and handoff

The unchanged `.tmp/ops-031-effective-proposal-oct12/validate.mjs` passes known math/code/blockquote/fenced-link and valid/invalid TeX controls before the target run. It accepts 109 math spans, 15 displayed equations, 15 equation-viewer links and 34 local-file occurrences. Its scope is strict TeX syntax and local file existence, not fragment destinations, browser appearance, scientific correctness or a complete causal-root inventory. Exact algebra above is the independent mathematical reference.

Final native `cmp` and `shasum -a 256` confirm the inspected source remains identical to its frozen copy and initial digest. This reviewer is the delegated Codex agent in the continuing lineage; no materially different model is adopted and no comparative superiority is claimed. Review duration and operator burden are unmeasured. Only this receipt and scratch files are written. No source/control repair, scientific run, generated write, publication, dormant activation or CRW-005 reopening occurs. Parent operations retains the separate coverage and due-date records. No new owner action is requested at this inspected state.
