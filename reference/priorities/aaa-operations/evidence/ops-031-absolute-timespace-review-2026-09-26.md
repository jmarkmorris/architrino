# OPS-031 — Absolute Timespace review — 2026-09-26

## Scope and disposition

Report-only whole-chapter review of [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), the due priority-1 chapter assigned by the operations coordinator. All 932 source lines were read in bounded chunks, with the final section reread after a combined output truncated. Start and end SHA-256, measured with `shasum -a 256`, are identical: `6dfc68496c19792463d3093f1f160ebd519496e4149190bcded0c971c3d7c603`. No corpus, historical, or shared control record was edited. CRW-005 remains closed; this receipt is new periodic coverage, not reopening that campaign.

**Disposition: reviewed with no new actionable correction.** Two historical accepted repairs and an explicit historical no-change assessment survive independent mathematical rechecking. One possible precision preference in the root-count explanation is retained below without creating repair work. No demonstrated introduced regression was found in these samples; this is not a corpus-wide correctness claim.

The live AGENTS, generated router, review skill and corpus-reviewer owner govern this review, together with the periodic-document-review procedure. Relevant checks use the chapter's declared substrate/observer distinction and the Master Equation's root-degree conditions. Historical context comes from the preserved F3 discussion and integration in [CRW work queue](../../aaa-corpus-rewrite/work-queue.md), particularly F3-1 through F3-7 and the complete-reading assessment. The actual `git diff b97703d98^ b97703d98 -- content/markdown/aaa/foundations/absolute-timespace.md` was inspected for sampled before/after claims; the commit message is not used as evidence of content or authorship.

## Whole-source assessment

- Lines 1–190: product manifold, simultaneity slices, future-directed histories, full-history state and additional flat product connection remain distinct. A graph alone does not provide the causal arrow; strict temporal support does. The spatial metric is on the spatial subbundle, so compatibility does not accidentally assert a unique four-dimensional metric connection.
- Lines 192–393: rotating-coordinate acceleration, distance/duration and spatial arclength, and observer-level assembly response retain their domains. The quadrupole is explicitly normalized and limited to a statistic. For the six signed coordinate axes, its second moment is isotropic while the fourth moment in one coordinate is 1/3; a uniform sphere gives 1/5. Thus the present warning that zero quadrupole does not prove full physical isotropy is necessary and correct. Channel gains and omitted information remain unclosed, as the source states.
- Lines 395–713: a passive boost gives the displayed delayed-displacement term `+U(T_r-T_t)` by substitution into both events. This is not boost invariance of a fixed-speed wake law. Differentiating the root condition gives the displayed receiver/transmitter playback ratio. Root-conditioning margins, actual zeros, and boundary exits remain separated. Direct support is an expanding sphere; the interior is a passage-by-time set and is not asserted to bound every history-mediated influence. Lorentz/Poincare recovery is explicitly a target, with normalized branch radii and declared observer maps.
- Lines 715–862: the coordinate and regularity discussion, event-level exhaustion, and centered shell theorem retain their hypotheses. Bounded packing and the weighted covariance bound give `E||S_n||^2 <= C n^-4 |I_n| = O(n^-2)`. The source separately requires conditional zero shell means, making partial sums an L2-bounded martingale. Square-summable variances alone are not being asserted sufficient. Full means, incomplete shells, different exhaustions, and physical realization of the statistical hypotheses remain separate obligations.
- Lines 867–932: expanding the shifted spatial square gives `g00=-A^2+B_ij u^i u^j/c0^2`, `g0i=-B_ij u^j/c0`, and `gij=B_ij`. The invertible coframe change `dx^i -> dx^i-u^i dt` reduces the form to one negative temporal square and a positive spatial form when A is positive and B positive definite. This verifies signature and factors algebraically, not constitutive recovery.

These are derived checks of stated mathematics and claim boundaries, not a retained assembly solution, proof of physical isotropy, or experimental recovery.

## Accepted repair rechecks

### F3-3 — rest-shape normalization survives

Historical pre-repair equation used raw `R_parallel/R_perp = 1/gamma + O(epsilon)`. The inspected actual diff replaces it with the ratio of each radius to its rest value and fixes the branch comparison inputs. Current lines 665–685 retain that repair and the velocity-domain qualification.

Independent reference: let a comparison ellipsoid have rest radii a and b, with a,b positive. The stipulated observer contraction changes them to a/gamma and b. The raw aspect ratio is a/(b gamma), while the normalized ratio is `(a/gamma)/a` divided by `b/b`, exactly 1/gamma. With a=2, b=1 and c_f=1, the old test would falsely reject an exact comparison shape; the corrected test accepts it. This is comparison geometry, not an imported primitive dynamical law.

Correctness: survives. Meaning: arbitrary rest shape is preserved instead of silently requiring spherical branches. Usefulness: the test measures deformation rather than rest geometry. Falsifier: a current definition or equation reverting to unnormalized radii, or a branch comparison that changes the held-fixed reference inputs without disclosing it. Neither occurs in the inspected passage.

### F3-2 — full boost action versus scalar observation survives

The actual diff replaces an undefined deformation generator acting alike on shape and clock readings with a representation on four observer event coordinates and separate extraction maps. Current lines 687–701 retain that domain.

Independent algebra: for collinear boosts, a two-dimensional event-coordinate matrix with entries cosh(phi), sinh(phi) composes by rapidity addition. The scalar contraction factor sech(phi) does not: choosing cosh(phi)=2 gives sech(phi)=1/2 but sech(2phi)=1/7 rather than 1/4. Thus a correct event action can have nonmultiplicative reduced readings. The repair preserves common physical provenance while removing a false scalar composition requirement.

Correctness, preserved meaning, and explanatory usefulness all survive within the explicit observer-comparison domain. Falsifier: evidence that the current text again demands scalar factors themselves form the event-coordinate representation, or uses that representation as a primitive substrate law. No such demand was found in the full chapter.

## Previous no-change recheck

The historical complete-reading assessment explicitly retains the rotating-frame formula and treats spelling out its angular-velocity convention as optional. Current lines 192–223 still use `X=R X'`. Define the skew matrix W by `R^T dot R=W`, with `W y=Omega cross y` in rotating axes. Differentiation gives `dot X=R(dot X'+W X')` and `ddot X=R(ddot X'+2W dot X'+(dot W+W^2)X')`. These are exactly the displayed Coriolis, Euler and centripetal signs. Moving those terms to the rotating-frame equation changes their signs, matching the prose.

No-change disposition survives. Explicitly naming rotating components of Omega could help, but a missing convention gloss is not a demonstrated sign error. The result would be overturned if R were instead defined as the inverse rotation, or Omega explicitly assigned incompatible inertial components in this formula. Neither occurs in the target. This independent differentiation rechecks the claim rather than treating the historical review as proof.

## Investigated precision preference — no referral

At line 639, a signed-count jump is said to signal boundary/chart loss, pair-set change, or a degeneracy outside the generic fold class. An interior higher degeneracy alone does not force a degree jump: on a fixed interval with unchanged endpoint signs, the oriented simple-root sum is one half of the difference of those signs. For `F(u;lambda)=u^3-lambda u`, a single positive root becomes three roots with signs positive, negative, positive, retaining degree one. The live [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#delay-map-theorem-pack-formalized) already gives that example and distinguishes root-count transitions from degree.

The target supplies a coarse necessary disjunction, not a claim that every nongeneric event changes degree, and restricts its signed-root formula to finite simple inventories. No concrete contradictory application was found. Clarifying that higher interior degeneracy alone is insufficient, and that comparing regular sides still requires the degree hypotheses, would be optional explanation. It is not a new correction request, physical result, or regression attribution. Revisit only if an owner actually uses this sentence to license a degree jump while a continuous fixed-boundary scalar homotopy remains valid.

## External benchmark and limits

The January 2026 [Data Tables for Lorentz and CPT Violation](https://arxiv.org/pdf/0801.0287), Table D10, printed page 38, was retrieved during this review. Its proton-sector rows include H-maser bounds at `2 x 10^-27 GeV` and an Hg/Cs comparison at `10^-27 GeV`. These support the chapter's qualified order-of-magnitude comparison. They do not directly bound its dimensionless response diagnostic; the chapter correctly requires a physical channel projection. This check used the authors' published compilation, not reanalysis of primary laboratory measurements.

Reviewer: delegated Codex agent in the existing model lineage; no new-model adoption or comparative superiority is claimed. Mathematical derivations above are explicit independent arguments, not agent agreement or a new numerical oracle. No solver, empirical fit, KaTeX/rendering audit, comprehensive link audit, or global well-posedness proof was performed. No review-time or resource measurement was collected. The owning operations coordinator retains due-date/cursor updates and can count this whole-source reading toward the monthly cycle; the open constitutive and physical recovery obligations retain their existing owners and grades.
