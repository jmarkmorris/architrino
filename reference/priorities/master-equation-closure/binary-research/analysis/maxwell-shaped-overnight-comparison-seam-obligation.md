# Comparison-history jerk seams and continuous defect

## Frozen mathematical question

This note concerns the interpolation used to check the selected E and E+M equations. It changes neither equation nor physical complete preparation. The [retained point-defect diagnosis](maxwell-shaped-overnight-neutral-majorant-feasibility.md#preparation-seam-refinement-and-point-defect-diagnosis) already shows nonzero defects of a fixed exact Hermite comparison near a sampled preparation seam. Refining a defect checker's receiving cells cannot reduce a valid upper bound below a point defect that the comparison itself has. Whether that particular comparison defect comes from a receiving polynomial spanning an emitted-history jerk seam is a separate attribution question, not established by proximity to the seam.

Before checking target metadata, freeze the following elementary interpolation example and the attribution obligations. The example is mathematical, with no imported physical acceleration law. It is not evidence of a lower bound on the actual selected binary's trajectory error.

## An exact interpolation control

Let $h>0$ and let $q(t)=t_+^3/6$, where $t_+=\max(t,0)$. This path is $C^{2,1}$, its acceleration is $q''(t)=t_+$, and its jerk has a unit jump at zero. Set $x=t/h$. The unique polynomial of degree at most five matching position, velocity and acceleration at both ends of $[-h,h]$ is

$$
Q(t)=h^3\left(-\frac1{96}+\frac{x^2}{16}+\frac{x^3}{12}+\frac{x^4}{32}\right).
$$

The three left endpoint jets vanish. At the right endpoint they are $h^3/6,h^2/2,h$, exactly the jets of $q$. Six independent endpoint conditions determine a quintic uniquely; the displayed quartic satisfies them. Differentiation gives

$$
Q''(t)=h\left(\frac18+\frac{x}{2}+\frac{3x^2}{8}\right),\qquad Q''(0)-q''(0)=\frac h8.
$$

**Derived interpolation fact:** even exact endpoint jets do not make this single comparison polynomial's acceleration exact near the interior jerk seam. Its maximum acceleration discrepancy is at least $h/8$. Subdividing a checker while leaving $Q$ fixed cannot remove that discrepancy. This is a statement about this particular polynomial and this particular known function, not a general lower bound for every interpolation scheme or an actual binary solution.

If instead the history knots include the seam, the two degree-three pieces $q=0$ and $q=t^3/6$ already match each interval's endpoint jets and are reproduced exactly by separate Hermite interpolants. For this known function, seam alignment removes the acceleration discrepancy identically. It leaves the underlying $C^{2,1}$ path unchanged. A failed endpoint identity or a nonzero acceleration discrepancy on either split piece falsifies this control.

## What a target attribution would require

For each retained E or full point residual, first identify its exact containing receiving Hermite interval. Independently bracket the comparison's reception time whose partner emission is the relevant source seam, using complete root uniqueness and the fixed source history. Then determine whether that reception time is inside the receiving interval rather than already a knot. Keep the response derivative's complete source-jerk term and root-clock multiplier; a zero coefficient could suppress the corresponding transmitted jump. A nonzero point residual near a seam alone does not prove this mechanism, and the strongest global defect cell may sample a later generated seam instead.

Only after that attribution, a separately frozen comparison on the same physical preparation could add receiving knots at those root-clock seam crossings, retain exact $C^2$ joins and recertify the whole continuous defect. It would need new immutable input bindings and the existing independent assessment, followed by the original-history error recurrence. The old comparison, sources and failed or admitted prefixes remain evidence. No reduced tube width, better runtime or successful original event bridge is asserted before that experiment. A seam-aligned comparison that fails to improve the independently checked defect or relevant checkpoint/source bounds would overturn its proposed usefulness for this case.

Merely splitting the existing receiving polynomial and assigning its own position/velocity/acceleration to the added knot reproduces that same polynomial on both sides, by Hermite uniqueness. It cannot improve the existing defect. The known example's successful split uses the actual piecewise function's seam jets. A numerical successor would therefore require fresh seam-aligned integration or independently justified replacement jets, under the same physical complete preparation; relabeling the retained polynomial's subdivisions is insufficient. No such successor is launched here.

The independent reference reconstructed the six endpoint conditions before reading this note, obtaining $Q/h^3=(x+1)^3(3x-1)/96$. It separately verified the center acceleration $h/8$ and exact split-piece reproduction, then assessed the attribution obligations. These agree with the displayed polynomial without treating agreement as an actual-history error estimate. **Status:** elementary control independently assessed; target attribution and any successor comparison pending. No target evolution or defect instrument is run by this note.

## Independently checked attribution on the retained comparisons

The [coupled-history worker's source](maxwell-shaped-overnight-neutral-majorant-feasibility.md#comparison-only-receiving-seam-attribution) separately freezes and checks the comparison's arrival gap, source-clock derivative and projected response-jerk jump. After the hinge, split-piece, stationary arrival, transverse and longitudinal-null controls, its targets identify receiving piece 1,546 for E and 1,535 for full. Each contains the reception whose partner emission crosses zero: approximately $5.3711709217154$ and $5.3312519198848$. The clock derivatives are positive, and the projected response-jerk jump norms are approximately $0.00740797439711$ and $0.00455251261207$.

The independent generic source-jerk argument predates the disclosed values. A separate target adapter, with its later authorship explicitly recorded, uses Gaussian endpoint systems, unseeded gap bisection and the frozen potential response after known controls. It accepts both containing-piece and nonzero-jump results. **Derived structural comparison attribution:** a smooth receiving polynomial's jerk cannot reproduce the selected response derivative's interior jump, so its equation residual has that derivative discontinuity. This does not attribute the entire earlier point residual, quantify an actual path error or prove an integration convergence floor. No fresh seam-aligned coupled comparison is launched by this result. A zero projected jump, wrong containing polynomial or failed arrival signs would falsify this case-specific mechanism.
