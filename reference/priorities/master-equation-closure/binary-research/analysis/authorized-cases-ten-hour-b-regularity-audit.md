# Skeptical audit of the original-history value and coordinate remainder

**Finding: no regularity gap found in the audited bridge; no accepted conclusion needs withdrawal on this ground.** The original $C^{5,1}$ history supports the accepted order-seventeen acceleration-value comparison and its finite normal-coordinate value remainder. This is a derived audit conclusion about the named bridge, not a new terminal-speed computation or an independent reconstruction of every downstream phase estimate.

The [independent reconstruction](authorized-cases-ten-hour-b-regularity-audit-reconstruction.md), SHA-256 `edf4499cb7becc0f81d0e7c7776f032fd756c3d478f00036c1d3cb0e716a86df`, was frozen before reading the [value adjudication](authorized-cases-ten-hour-reference-b-value-adjudication.md) or [normal-remainder adjudication](authorized-cases-ten-hour-reference-b-normal-remainder-adjudication.md). It includes exact smooth and piecewise-$C^{5,1}$ controls. The latter has a unit jump in its sixth derivative and a sampled source beyond that seam, while its clock, position/velocity comparison and explicit acceleration contribution remain well defined. These controls were proved before assessing the target argument. No numerical control, trajectory or Python process was run.

## What carries the regularity burden

The actual defect is $R=Z''-F^{[16]}(Z,Z')$. It is an acceleration value on the supplied or generated history. Two integrations from equal current position and velocity give source-position discrepancy $O(\lambda^2\sup|R|)$ and velocity discrepancy $O(\lambda\sup|R|)$. The strict comparison clock gives a further root displacement $O(\lambda^3\sup|R|)$. To compare acceleration at the two roots, the proof first compares actual and comparison acceleration at a common time, then moves only the smooth comparison acceleration. Its jerk is a derivative of the analytic finite comparison field. It is not a seventh actual derivative, nor a derivative of the actual defect.

The exact normalized row has independent source variables $(q,\lambda b,\lambda^2 A_d)$. Its finite-dimensional Lipschitz bound therefore returns an $O(\lambda^2\sup|R|)$ defect contribution, including the delayed source acceleration. This is the small coefficient used to attenuate the original polynomial-history discrepancy. It does not erase derivative seams or prove extra actual regularity.

The order-seventeen consistency remainder is a different object: the analytic comparison flow evaluated by the exact delayed row, minus its finite autonomous field. Its complex analyticity and high formal jets belong entirely to that finite comparison construction. The actual path enters only after this consistency result has been obtained. Confusing these two objects would invalidate the argument; the reviewed subject and reference keep them separate.

Likewise, if the finite exact coordinate map is $x=\Phi(z)$, the actual first-order equation transforms as

$$
z'=D\Phi(z)^{-1}V(\Phi(z))+D\Phi(z)^{-1}e.
$$

The actual value error $e$ is multiplied by the inverse Jacobian. It is not inserted into the finite Lie-series coefficient construction and is not differentiated. This distinction survives the logarithmic parameter coordinate because each ordinary parameter generator retains its parameter factor. The map's parameter multiplier stays near one, so its logarithm and inverse are regular on the required domain.

## Premise coverage and attempted failure modes

| Required premise | Audit disposition |
| --- | --- |
| Original compatible history and complete roots | The fixed case retains its cutoff, polynomial, labels and seams. This bridge takes the previously admitted actual-history chart, complete speed/root census and acceleration bounds as premises; it does not obtain them from the normal form. |
| Finite analytic consistency through degree sixteen | The eight triangular substitutions, fourteen state derivatives per iteration, state-width losses and parameter-disk losses support the displayed analytic bounds. Only comparison jets enter. The separate autonomous acceptance verifies every emitted rational coefficient through sixteen. |
| Source-clock and acceleration transport | Independently reconstructed from the explicit row and checked by both exact controls. The comparison jerk, strict root margin and entire common source window are retained. |
| Interpolating tuple domain | The actual and comparison positions are close on the tiny window before the improved defect estimate is assumed: the admitted actual acceleration and bounded comparison field already bound $S$ finitely. Thus the connecting separation stays away from zero, and scaled source velocity/acceleration remain inside their row box. The desired order-seventeen bound is not used circularly to admit the interpolation. |
| Original boundary defect | Retained as $M_-$ on the whole supplied recent interval. The initial self-supremum is absorbed with coefficient below one; it is not silently discarded. Eight later windows yield the ninth attenuation factor on that original input. |
| Weighted-window coverage | The initial interval covers the first backward window. Increasing left endpoints prevent later return to an uncontrolled interval. The compact version uses admitted $H\ge3/4$; the radius version uses its explicit lower-radius and speed chart. The powers $H^{21}$ and $r^{21/2}$ follow from freezing and restoring the acceleration scale. |
| Exact finite coordinate map and norm | The separate full normal-form acceptance verifies all fifteen generator-flow maps, the full three-component conjugacy, the parameter-multiplier derivative and exact radius-four norms. Its finite audit discharges the conditions left open in the earlier remainder theorem. |
| Auxiliary analytic-flow buffer | The tiny parameter disk and generator norms keep all fifteen flows and their inverse Jacobians in the declared buffer. Cauchy's order-seventeen tail concerns the transformed comparison field only. |
| Actual parabolic domain | The radius-weighted extension remains restricted to the actual parabolic chart. The corrected zero-branch consumer closes that domain on its hypothetical zero-speed branch; it does not continue physical evolution through a transverse zero of the radius coordinate. |

The two original subject digests match their frozen adjudications by `shasum -a 256`: value subject `86f7a62fa138851f4b7a2e1ee878904875d2d33cb518d0391d9611fe06f5f585`, normal-remainder subject `ea10f72de52cbe9a9837c9223a1f4cd52da4a54887a2fe3847b6079faf1d7140`. The reviewed value adjudication has digest `bed84208eedcccb6137acdeb904e7a45c8c650d9e8c6c833b6904a79feaa84bf`; the normal-remainder adjudication has digest `d66e6b33855a34a0077f91ea529c29d66d8f463a6fc9e7b1e82fa469d745fdff`.

The [radius/angle adjudication](authorized-cases-ten-hour-reference-b-phase-adjudication.md) independently confirms the enlarged velocity buffer and every homogeneity power. In particular, the angular defects contain $w^{15/2}$ and $w^{17/2}$ with bounded $u$ factors, rather than a negative power of $w$ hidden by a compact-circle argument. The [corrected physical consumer](authorized-cases-ten-hour-reference-b-zero-branch-adjudication.md) and [terminal acceptance](authorized-cases-ten-hour-reference-b-terminal-acceptance.md) explicitly preserve the hypothetical-zero-branch restriction. The earlier withdrawn transverse-chart claim is not needed by the accepted terminal conclusion.

## Finite evidence binding without rerunning a target

The [autonomous acceptance](authorized-cases-ten-hour-reference-b-autonomous-acceptance.md) binds the unique finite field to the separately derived triangular coefficient rule. The [normal-form acceptance](authorized-cases-ten-hour-reference-b-normal-acceptance.md), digest `4c333a9657421df8b09d9ff52c646f54a387aea1237ada2c8f18467178459775`, binds every generator and finite forward-map coefficient. Static inspection of its separately authored audit confirms exact rational norm checks, reconstruction of all fifteen flow maps, and a full three-component conjugacy residual with the parameter multiplier derivative retained. This audit did not execute that instrument again.

The four retained local evidence files were rehashed with standard `shasum -a 256`; each matches its accepted identity:

| Local evidence beneath `binary-research/authorized-cases-ten-hour` | SHA-256 |
| --- | --- |
| `coordinator-b-autonomous/coefficients-v1.json` | `a3f32f07d942924a7d1d0d6bf6e14302247f23c7d5a69474e5e8cd040ac52e1c` |
| `reference/b-autonomous-audit-target-v1.json` | `a584f05ffe10ee31f493da56f2c2d44a44b0ee4670c4aa104bfe55f4ebaee657` |
| `coordinator-b-normal-form/normal-form-v1.json` | `a607884e8b14a96cb11033efedcd2ec00b5e18e802c5c6508600283f552f9782` |
| `reference/b-normal-audit-target-v2.json` | `fe8413cc57d81f954568beff14efdc44736336a7fe4b800144dea211e0a53d1c` |

These are local provenance records beneath the ignored `.local-data/master-equation-closure/` owner. The tracked acceptance notes link their reproducing instruments. Rehashing proves identity, not the correctness of the mathematical output. The exact audit receipt reports a pass for all fifteen flow maps, complete conjugacy through sixteen, reality/zero-mean conditions, resonance and rational coefficient norms. Those previously accepted independent checks supply the finite premises; this regularity audit separately checks their role in the actual-history argument.

## Disposition and falsifiers

The finite value bridge and finite coordinate remainder survive this skeptical audit at their stated chart scope. No missing higher actual derivative, deleted original-history defect, unaccounted delayed-acceleration transport or differentiated seam remainder was found. Consequently this audit supplies no reason to withdraw the accepted fixed-member positive terminal-speed conclusion. It does not separately reprove the final scalar phase exclusion, initial complex-coordinate enclosure, complete signed-section argument or numerical terminal-speed lower bound.

The conclusion would change if a required source window leaves the admitted actual chart, the comparison jerk or inverse coordinate Jacobian is not bounded as stated, a finite coefficient/flow identity fails, the row interpolation crosses a singular denominator, or a downstream step differentiates the actual error rather than using its value. Those falsifiers point to the precise owners above; matching finite outputs alone could not repair such a failure.

The only new durable files are this audit and its frozen reconstruction. Existing subject/reference files and shared owners were read only. Scoped documentation validation uses the existing known-first binary document checker for TeX syntax, trailing whitespace and local link destinations; it is not scientific acceptance. No new target, physical assumption, preparation, Python invocation, detached process, Git operation or repository generator rewrite occurred.
