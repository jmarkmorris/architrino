# OPS-031 — Detecting the Absolute Frame review — 2026-09-29

## Scope and outcome

Complete report-only review of [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md). The full source was read in contiguous ranges 1–195 and 196–390; `wc -l` measures 373 lines. Start and end `shasum -a 256` return `438cca92df7117cc00e1bd7decebb00ac4dc50af27b331024805a631b391c21b`. No chapter, shared control, historical evidence or generated output was edited.

**No new actionable defect found.** Two accepted F5 repairs and explicit historical no-change claims survive independent algebra and source-history comparison. Open physical recovery and finite-instrument obligations remain open; this is completed reading coverage, not a proof of preferred-frame observability or operational hiding. CRW-005 remains closed.

The review uses the live AGENTS, generated startup router, Corpus Reviewer and periodic-review owners, and the review skill's report-only workflow. The preserved [F5 assessment and accepted integrations](../../aaa-corpus-rewrite/work-queue.md#f5-1--separate-exact-center-recovery-from-finite-inverse-conditioning) establish the historical dispositions. `git diff 27f5f3781^ 27f5f3781 -- content/markdown/aaa/foundations/detecting-the-absolute-frame.md` was inspected for actual before/after content; no attribution is inferred from its commit message. Contextual dependencies include the Master Equation self-hit condition and Observer Framework's apparatus, calibration and nuisance record. These contextual reads are not completed whole-chapter reviews of those owners.

## Accepted repair samples

### F5-1: exact sphere recovery, conditioning and unknown radius

Historical source called the positive aperture threshold necessary for admissibility and presented the direction matrix as the inverse acceptance test. The inspected diff replaces those claims with instrument-dependent sufficient criteria, local known-radius sensitivity, independent global uniqueness and a joint fit when radius is uncertain. Current lines 97–183 retain these distinctions.

Independent derivation: subtracting `||Y_alpha-z||²=R²` and `||Y_0-z||²=R²` cancels both radius and quadratic center terms, yielding `2(Y_alpha-Y_0)·z=||Y_alpha||²-||Y_0||²`. Affinely independent differences make this system invertible. Their Gram determinant is the square of their determinant, so positivity proves rank; rescaling all coordinates by a multiplies it by a^6, confirming that its numerical size without a scale is not an error bound.

For radial residuals, differentiation gives `delta r_k=-n_k·delta z-delta R`. With positive normalized weights, a known radius leaves `G=sum w_k n_k n_k^T`. Minimizing the quadratic over a free radius sets `delta R=-nbar·delta z`, leaving `C=G-nbar nbar^T`. These are exact first-order identities, not empirical recovery.

The source's ambiguity example independently checks: with `c_f=1`, `a²=2/3`, `b²=1/3`, points `(±a,0,0),(0,±a,0)` are unit distance from each center `(0,0,±b)`. Symmetry cancels cross terms and gives `G=diag(a²/2,a²/2,b²)=I/3`. Subtracting the mean-normal outer product removes the axial term, so `C=diag(1/3,1/3,0)`. Local fixed-radius rank therefore does not select one global center, while free radius introduces a continuous axial freedom. Finite samples also have zero spherical area despite potentially determining a unique sphere.

Correctness survives; meaning is preserved as a conditional reconstruction method; usefulness improves through explicit unknowns and uncertainty. Falsifier: an algebraic failure in the residual elimination, or a present sentence again asserting that positive G proves global uniqueness or that nonzero footprint area is universally necessary. Neither occurs. No new error model or finite-aperture instrument has been established by this recheck.

### F5-2: straight accelerated motion and geometric self-hits

The historical diff replaces “Accelerated motion means a curved center history” with an emission-time-parametrized center curve whose derivative may change speed or direction. Current lines 55–65 preserve that correction; lines 213–239 retain the separation between spatial curvature and the causal-root condition.

Independent normalized-unit witness: `X(T)=((T+T²)/2,0,0)` has velocity `(1/2+T,0,0)` and acceleration `(1,0,0)`. On [0,1] its spatial image is straight with zero curvature and positive speed. At reception T=1, emission s=0, displacement and delay both equal one. In a neighborhood of s=0 with s<1, the root residual is `F(1,s)=s(1-s)/2`, with derivative 1/2 at zero. This is a positive-delay simple self-root without curved geometry. It is a prescribed history, not a demonstrated solution of the complete Master Equation; the source preserves that distinction in its physical claims.

The valid necessity statement follows from absolute continuity: chord length is at most the integral of speed. A strictly sub-wake-speed history cannot achieve chord/delay equal to c_f. Constant straight speed above c_f also fails equality for every positive delay, whereas constant speed exactly c_f gives degenerate riding rather than an isolated simple root. Thus nonzero velocity, curvature, and a super-wake-speed segment cannot replace the actual root test.

Correctness survives; meaning retains complete tagged kinematics while avoiding an unsupported curvature requirement; the explanation now distinguishes geometry from dynamical realization. Falsifier: the displayed witness fails direct differentiation/root substitution, or the current chapter restores curvature as a necessary condition. Neither occurs. No stability or binding inference is licensed by this example.

## Explicit prior no-change rechecks

The preserved F5 subsection “What survives and a useful next derivation” explicitly accepts the full-sphere uniqueness lemma and diameter identity. Both remain valid in current lines 73–121, 187–223 and 297–313.

For uniqueness, if the same positive-radius sphere had two different centers z and z', subtracting their squared-distance equations would require every sphere point to lie in a single affine plane with normal z-z'. A nondegenerate three-dimensional sphere cannot be contained in that plane; therefore the centers coincide. Tagged support equality then gives equality of the center curves on the declared emission window, and absolute continuity supplies equal velocities almost everywhere. Identity and polarity come from retained tags, not from geometric spheres alone. The chapter makes no injectivity claim for omitted history or a label-erased observer readout.

For the diameter, a nonempty center set has diameter zero exactly when all its points coincide. An affine curve `Z(T)=Z0+V T` on a bounded interval has diameter `||V||` times that interval's duration. For a variable-speed or curved history this scalar gives only span, not the full time derivative. Fixed spatial translations and rotations preserve the distances; arbitrary time-dependent changes of frame are not part of this invariant statement. The chapter assumes the fixed substrate spatial identification rather than deriving it from the scalar diameter.

The no-change disposition survives independently of the historical reviewer. Its falsifiers are a missing tag/window restriction, a degenerate support used as a full sphere, or an extension of the uniform-motion diameter formula to arbitrary trajectories. None was found in the complete reading.

## Whole-chapter coverage and remaining limits

- Lines 1–71 establish complete-state access, transmitter tags, propagation independence and interval rest. Non-identifiability from one unrestricted summed value is kept distinct from inversion using richer observer data.
- Lines 73–183 develop exact support uniqueness, finite sample rank, finite-footprint policy and local uncertainty. These were checked by the algebra above.
- Lines 185–249 treat the center curve, self-root geometry and conditional assembly-response burden. The opening statement that the diagnostic can work refers to the expressly assumed complete tagged record; it does not certify an embedded measuring device.
- Lines 251–293 distinguish seven substrate symmetry generators from conditional conserved charges and operational Lorentz recovery. Three translations, three rotations and one time translation give seven; disconnected reflections do not add continuous generators. The material-sound analogy explicitly stops before identifying the void with a material medium.
- Lines 295–373 retain scoped injectivity, philosophical comparison and the calibrated observer-hiding target. The metric/readout and admissible matched preparations are fixed before comparisons. If a scalar readout is rescaled by alpha, its diameter scales by |alpha|, so the tolerance must transform consistently. Identical binary-output distributions can produce unequal individual outcomes; consequently deterministic outcome diameter does not prove distributional equality. The current F5-3 repair preserves both distinctions and leaves recovery unproved. This additional check does not replace the two detailed accepted repair samples above.

The historical next-step suggestion for temporal sampling/error bounds remains a useful conditional extension, not a missing requirement to add here or a new research obligation. Likewise the source's qualitative discussion of Newton/Leibniz/Mach is a comparison context rather than a technical premise in the reconstruction proof.

## External source check

The primary publisher page for [Nagel et al., Direct terrestrial test of Lorentz symmetry in electrodynamics to 10^-18](https://www.nature.com/articles/ncomms9174) was retrieved during this review. Its abstract and Analysis give the quoted orientation-dependent relative-frequency result `(9.2 ± 10.7) x 10^-19` at 95% confidence. Its Discussion states that the measured beat-frequency effect combines photon and propagating-material contributions. This supports the chapter's apparatus-dependent observer benchmark, not a direct measurement of primitive wake speed or a universal numerical tolerance. No claim that this is the newest bound, and no experimental reanalysis, is made.

Reviewer is the delegated Codex agent in the existing lineage; no new-model adoption or comparative superiority is claimed. Independent support consists of the explicit linear algebra, calculus and set-distance proofs plus the scoped primary-source check, not agreement between agents. No solver, new checker, rendered math audit, complete dependency review or comprehensive link validation was run. Scoped whitespace checking is structural only. Review cost was not measured. Parent operations retains the coverage cursor, dates and any scientific follow-ups; this no-change receipt adds no repair queue item.
