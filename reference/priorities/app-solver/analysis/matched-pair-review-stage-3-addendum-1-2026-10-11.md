# Independent Review: Canonical Aliasing Control and Validated Far-Step Theorem

## Disposition

Accept S3-1–S3-3 as corrected in [addendum 1](matched-pair-stage-3-addendum-1.md), SHA-256 `c17b9b6843dc2aca69d868669bcf175574cf9f1df34595bc1728010d11551b06`. Accept the control at Tier A and Tier B, with the independent causality proof and rational bracket below. Tier C remains unestablished. Accept the validated far-step theorem at conditional mathematical grade for the declared complete retained-past domain. Actual carrier implementation and qualification remain open; Stage 3 production edits are not released.

The [author's receipt](../evidence/matched-pair-stage-3-aliasing-control-receipt-2026-10-11.md) binds the driver, subject library and retained runs. Independent source inspection confirms the driver calls the actual canonical snapshot/evolution entry points, pins its step, leaves grouping disabled, supplies exact zero-radius piecewise cubic pasts and uses $c_f=1$. Amplitude `0.2` produces the declared exact tokens; the top-value conversion at six decimal places yields `10.2` for this input. This is a bounded input observation, not validation of that conversion for arbitrary amplitudes.

## Change of variable and receiver perturbation

**Derived independently:** at a fixed receiver, $t=S+z_s(S)$ and $dt/dS=1+z_s'(S)=D>0$. The canonical weight is $-\kappa/(z_s^2D)$, so its reception-time integral becomes $-\kappa\int z_s^{-2}\,dS$. Integer source periods map to integer reception periods because $z_s$ repeats and the period endpoints have $p=0$. For the position integral over two periods, summing the weights at reception phases $t(u)$ and $1+t(u)$ gives $3-2t(u)$, with $t(u)=u+A p(u)$. Thus both of the author's integral expressions are correct.

At fixed reception time, differentiating the root equation gives $S_\zeta=1/D$, $r_\zeta=-1/D$ and $D_\zeta=z_s''/D$. Therefore

$$
\partial_\zeta(r^{-2}D^{-1})=\frac{2}{r^3D^2}-\frac{z_s''}{r^2D^3}.
$$

On the stated domain $r\ge10$, $D\ge2/5$, $|z_s''|\le24/5$, so $L=61/80=0.7625$ bounds the spatial derivative of the unscaled kernel. The acceleration is negative, hence the true receiver position is nonpositive. From $|a|\le\kappa/[100(2/5)]$ one obtains $|\zeta(t)|\le\kappa t^2/[200(2/5)]$. Integrating $\kappa L|\zeta(t)|$ once and against $(h-t)$ gives exactly the claimed velocity and position correction bounds. The source's second derivative jumps at some joins, but its velocity is globally Lipschitz; the derivative bound holds on each piece and integrates across the finite joins. No undefined derivative at a sharp root is introduced: the source velocity itself is continuous.

## Independent numerical bracket

The separately authored [midpoint instrument](../evidence/matched-pair-review-stage3-midpoint-bracket.mjs) imports neither production arithmetic nor the author's bracket. It first checks a closed-form affine-distance integral, the static integral, a linear weighted integral, exact signed binary conversion and an escaping interval. Target evaluation uses exact rational midpoint sums with a **global derivative remainder**, rather than the author's monotone left/right sums. For $N$ equal cells, $|\int f-Q_N f|\le\sup|f'|/(4N)$. Here $|p'|\le3$, so the reciprocal-distance integrand has derivative bounded by $6A/R^3$. The weighted integrand has derivative bounded by $2(1+3A)/R^2+3(6A/R^3)$. Each rational cell value is directed to thirty decimal places before summation; the derivative remainder is added exactly. All disjointness decisions compare exact rational quantities against the binary64 endpoints, not printed decimal approximations.

**Measured by this independent instrument on the retained run bytes:** for the accepted step of two, the velocity true bracket lies in approximately $[-1.9634725,-1.9582719]\times10^{-5}$, separated from the published interval by at least $3.6573\times10^{-7}$, over 1589 published half-widths. The position true bracket lies in approximately $[-1.7688110,-1.7645310]\times10^{-5}$, separated by at least $2.3120\times10^{-6}$, over 10050 half-widths. The accepted step of four also escapes in velocity by over 315 half-widths. These deliberately coarser independent brackets establish the claimed exclusion; they do not claim independent recomputation of the author's tighter ratios 1592 and 10081. The twenty exact static/node/quarter-period Tier A reference comparisons also pass. The quarter-period accelerations are exactly $-1/163216$ and $-1/40804$.

Raw independent stdout and JSON receipts are retained under `.local-data/eom-matched-pair/2026-10-11/reviewer-targets/stage3-independent-midpoint*`. The first instrument version established the Tier B separation; the supplementary version additionally checks Tier A. Their separate receipts and stdout are retained. Source and receipts are frozen before the next subject implementation. Local retention is not backup.

## Tier B causality: a closed bootstrap

The author's phrase “acceleration of order $\kappa/R^2$” is insufficient by itself to exclude new emissions. The following independent argument supplies the needed explicit bound.

Both charges are positive and start at rest, receiver at zero and source at ten. While all cross roots are emitted before zero and speeds remain below one, the receiver acceleration is negative and the source acceleration positive. The source reads the receiver's static prescribed past, so $0\le a_s\le\kappa/100$. The receiver reads the oscillating prescribed source, whose distance is at least ten and whose factor is at least $2/5$, so $-\kappa/40\le a_r\le0$. Integrating gives, for $0\le t\le4$,

$$
0\le v_s(t)\le4\times10^{-5},\quad
10\le z_s(t)\le10+8\times10^{-5},\quad
-10^{-4}\le v_r(t)\le0,\quad
-2\times10^{-4}\le z_r(t)\le0.
$$

These inequalities retain strict sub-wake speeds and cross distances at least ten, greater than the entire step length four. Therefore no emission in $[0,t]$ can reach the opposite receiver, so the premise persists. The retained lower endpoint at $-20$ has strict negative residual for both cross pairs and their roots remain strictly inside the prescribed past; complete monotonicity follows from the past speed bound $0.6$ and the much smaller future speeds. The joined past/future paths are continuously differentiable and remain sub-wake-speed, hence have no self-root for $S<t$. Local existence and uniqueness follows from the simple-root, positive-distance, Lipschitz-velocity canonical field. The strict bootstrap margins prevent any root/chart/speed failure before time four. This closes the causality argument without using the solver-generated source future as truth. The receiver's true path in the coupled initial-history problem is precisely the path bracketed by the prescribed-past receiver equation.

Thus Tier B is a real accepted canonical solver step compared with a derived true-state bracket, although its initial oscillating past was not generated by the law. This demonstrates a limitation of treating estimator radii as true-solution certificates; it does not contradict the solver's declared `executable_architecture_evidence` grade or establish how common such aliasing is.

## Validated far-step theorem

H0–H5 address the previously missing hypotheses. H3's present/absent lower signs have the correct earliest/latest reception times. H2 excludes post-start cross emissions; H1 excludes self-emissions on actual joined paths. A root may pass a past segment join because the true path is continuously differentiable there. The monotonicity proof can use the speed Lipschitz inequality at any zero-distance point where the residual's classical derivative is unavailable; such a point is not a causal root at positive delay.

The distance lower bound in Lemma 2 is valid. Write $d=T-S$. At a root $r\ge d$ and $r>h-v^+d$; minimizing their maximum gives $r>h/(1+v^+)$. Together with $D\ge1-v^+$ and Lipschitz true past velocity, this gives a regular field continuous in time and locally Lipschitz in receiver position, uniformly on the compact boxes. For existence, use the **double-integral position map** and its accompanying velocity integral, not an arbitrary map $x\mapsto x_0+\int v$ on unrestricted box-valued curves. H4/H5 make this map a self-map; bounded continuous fields give its compactness and the fixed-point existence argument, while the Lipschitz field gives uniqueness. The constructed solutions remain in the boxes, making the isolation/no-self-root claims valid for those solutions. Uniqueness against any other local continuation uses the same regular chart in a neighborhood and continuation of the coincident solutions, rather than assuming another solution is already contained.

Integrating the uniformly enclosed acceleration gives the stated tubes, including inherited position **and velocity** uncertainty. Their compatible position/derivative inclusion re-establishes H0 for the next step. This is an accepted conditional mathematical route on the declared complete retained emission domain; it does not certify missing earlier history or prove the prior ordinary carrier. None of the H3/H4/H5 uniform-time checks or the new publication are currently implemented.

The author's 22:52:33Z [refinement supplement](../evidence/matched-pair-stage-3-aliasing-control-refinement-2026-10-11.md) was read before dispatch. Its fine-step compatibility and non-aliasing behavior are diagnostic evidence, not an independent enclosure proof. Its first wrong-duration comparison remains excluded, and its status grade does not replace the analytical and separately authored midpoint bounds above. The updated Barnes-Hut manuscript status correctly remains snapshot-only and keeps Tier C open by a read of that status paragraph. The manuscript's opening paragraph still says nothing in Part III is implemented; reconcile that sentence with the now implemented bounded snapshot radius, while leaving the general hierarchy unimplemented. This is a narrow author-owned status correction, not a broader manuscript review.

## Next released work

The operator selected error-carrying/generated-history inclusion in Stage 2 and accepted-state propagation in Stage 3. The newly identified missing carrier is a predecessor to implement within that work; mathematical difficulty does not itself require a new operator selection. Release **new-file/scratch-only preparation of a bounded validated far-step carrier**, starting from exact prescribed past, with complete H0 provenance, H1–H5 receipts, inherited state propagation and a whole-step publication comparison against its nominal cubic and derivative. Establish the actual inclusion bridge before any grouped consumer admits that carrier. Preserve production evolution refusal and frozen scientific references. This release does not authorize Stage 3 production edits or claim the selected stages complete.

Use the already frozen canonical control as an adversarial reference and a separately proved nonzero static-past receiver bracket as a known qualification case. Require at least one small step satisfying actual declared budgets, a two-step inheritance control, and failed hypothesis/budget cases that decline without a certified continuation. Do not create a new production solver or alter the law, response, exact fallback, checkpoint/transport owners, or source charts. Return the bounded carrier prototype/theorem and frozen qualification packet for independent review within the existing six-hour deadlines. If an actual qualifying carrier cannot be produced, retain the exact blocking condition rather than claiming the mathematics implemented it.

Falsifiers: wrong root-variable derivative; quadrature derivative/remainder invalid on a cell or join; a post-zero emission reaching the receiver under the explicit bootstrap; an exact-rational bracket overlapping the published target interval; or an H0–H5 continuation leaving the claimed tube. The named source, analytical formulas, frozen run inputs and independent receipts expose each check.
