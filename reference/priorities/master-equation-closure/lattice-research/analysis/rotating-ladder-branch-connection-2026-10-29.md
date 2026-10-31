# Connecting the rotating ladder's turning curve to its twisted branch

**Status: certificate and separate exact-arithmetic assembly audit complete, October 29, 2026; new peer review pending.** The missing connection passes at the conditional scope below. Two previously separate stretches of balanced motions belong to one connected family. This concerns possible steady motions, not a ladder evolving through them. The [visual guide](rotating-ladder-visual-guide.md) explains the object without requiring the proof notation, and the [standalone animation](rotating-ladder-motions.html) is retained in the repository.

## Result

The ladder has radius $R$ and axial spacing $d$ between neighbouring pairs. Write $\delta=d/R$ for spacing in radius units, $\varepsilon=\omega R$ for rotation speed, $u$ for signed axial speed, and $\alpha$ for the angle between corresponding members of neighbouring pairs; $\omega$ is angular speed. Wake speed and the interaction coefficient are normalized to $c_f=K=1$. A $C^1$ curve is a family whose parameters and first derivatives vary continuously.

**Derived, conditional on the unchanged reviewed balance/tail kernel and its stated interval dependencies.** At $R=1000$, $c_f=K=1$, there is a $C^1$ curve of exact infinite-ladder balances $y(\delta)=(\varepsilon,u,\alpha)$ for every $\delta\in[2.8700,2.981]$, unique within the certified local boxes. It contains both reviewed $0.878\pi$ balances and the previously certified turning region. At $\alpha=0.8801\pi$ it meets the reviewed twist-parametrized branch. Thus the turning region and that branch are parts of one connected family. Uniqueness is local to the certified tubes, not a census of every balance at those parameters.

The new calculation supplies 57 principal pieces over $[2.924,2.981]$, all 56 internal common-point joins, one join to the old curve, and a fixed-twist contact. The [old-curve audit](../evidence/rotating-ladder-branch-connection-2026-10-29/result-old-curve-audit.json) checks 218 old pieces and 217 old gap patches; the [bridge audit](../evidence/rotating-ladder-branch-connection-2026-10-29/result-bridge-audit.json) checks the new cover, all joins and the contact using exact rational comparisons. Maximum principal-piece weighted contraction bounds are below $0.140302$ for the old curve and $0.271406$ for the new bridge. Every checked matrix bound is below one, and all declared separation and sub-wake-speed predicates pass.

The contact's spacing enclosure, rounded outward for this display, is

$$
\delta\in[2.97999298270,\ 2.97999528722].
$$

It lies wholly in new piece 55, whose requested spacing interval is $[2.979,2.980]$. Its $(\varepsilon,u,\alpha)$ solution enclosure lies strictly inside that piece's unknown box. The contact's entire $(\delta,\varepsilon,u)$ box lies strictly inside the first reviewed twist-branch box at $\alpha=0.8801\pi$. These containments identify the same exact balance in both parametrizations.

The equation, infinite population and complete histories have not changed. The new producer and separately authored receipt audit are both Codex work; they are not a fresh independent peer review. The earlier kernel review supplies the mathematical input, and the proof below supplies the connection argument. The full route to either untwisted endpoint, the quadratic nature of the turning point, finite-population persistence and freely evolved travel through this family remain unproved.

## The question

The [October 20 account](rotating-ladder-claude-2026-10-20-pi-account.md) establishes two relevant families at $R=1000$: a curve near the minimum of twist, parametrized by spacing, and a twisted rotating-and-translating branch parametrized by twist. Their connection was numerical. The first new target is a continuous certified bridge from the upper-spacing end of the turning curve near $\delta=2.9245$ to the reviewed twist branch near $\delta=2.98$. The late [joins addendum](rotating-ladder-claude-2026-10-20-twisted-fold-certificate-joins.md), which extends the turning curve to $[2.8700,2.9245]$, must first pass independent assembly checks.

Throughout, $\delta=d/R$, $\varepsilon=\omega R$, axial speed is $u$, and twist is $\alpha$ in radians. The law is unchanged, $c_f=K=1$, $R=1000$, all past histories and every rung of the infinite population are retained. Numerical heads are completed by the previously reviewed infinite-tail bounds. The unknowns are $y=(\varepsilon,u,\alpha)$ and spacing is the continuation parameter.

## Proof target and reference

The proposed certificate covers spacing intervals by parametric Krawczyk images for the exact balance residual $F(y,\delta)=0$. Each strict image is to lie inside its unknown box, with a uniform nonsingular unknown Jacobian. A point or small interval certificate inside both neighbouring boxes identifies the same solution at a shared spacing; local implicit uniqueness then glues their $C^1$ solutions. A final fixed-twist certificate at $\alpha=0.8801\pi$, lying in both the new spacing tube and the reviewed twist-branch tube, closes the bridge.

All image, parameter-coverage and join tests now pass. The mathematical reference is the fixed-point and implicit-function gluing argument below, consistent with the [packet-11 review](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), together with the independently reviewed frozen row, causal-root and tail kernel. The new target driver and a separate exact-domain assembler check implementations of that rule; their agreement alone is not a new derivation of the law.

## Why the certificate proves a connection

A balance is a motion whose required acceleration agrees with the acceleration contributed by every other member's delayed history. The three components of $F$ are the differences between those accelerations in the local radial, tangential and axial directions, with the normalization of the reviewed main certificate. A zero of $F$ is therefore an exact steady motion of the entire infinite ladder. The history and infinite sum are part of that definition; no finite crop replaces them.

For a spacing interval $\Delta$, choose an unknown box $Y$, its centre $\hat y$, and a constant nonsingular preconditioner $C$ approximating the inverse of the unknown Jacobian $F_y$. For each fixed $\delta$, define $T_\delta(y)=y-CF(y,\delta)$. The frozen interval evaluator encloses $F_y$ and $F_\delta$ over the complete box, including the infinite tails. Integration of $CF_\delta$ from $c$ to $\delta$ and the mean-value enclosure in $y$ give

$$
T_\delta(Y)\subseteq\hat y-CF(\hat y,c)-(CF_\delta)(\Delta-c)+(I-CJ_y)(Y-\hat y)=\mathcal K.
$$

Forming $CF_\delta$ before multiplying by the parameter displacement preserves cancellation while remaining rigorous: the constant matrix $C$ can be moved inside the integral. It does not assume the same mean-value point for different residual components.

If $\mathcal K\subset\operatorname{int}Y$, the map sends the closed box into itself. If also the weighted row norm of $I-CJ_y$ is less than one, it is a contraction in that weighted maximum norm. Hence it has one fixed point in $Y$ for every spacing in $\Delta$. The norm bound also makes every unknown Jacobian in the enclosure invertible, by the convergent Neumann series for $CF_y=I-(I-CF_y)$. The implicit-function theorem then gives a locally $C^1$ balance as spacing varies. Boundary spacings have one-sided restrictions of these local solutions. The sub-wake-speed and positive-separation bounds in the frozen evaluator ensure the residual and its first derivatives have the regularity used here.

Two neighbouring boxes alone do not establish a connection. A joining certificate has a spacing in both parameter intervals and an unknown box strictly inside both unknown boxes. Its solution must equal each neighbour's solution at that spacing, by uniqueness. The local implicit-function theorem then identifies the curves near the join. Repeating this argument along a connected interval cover yields one $C^1$ curve. When old binary spacing intervals leave tiny gaps, a certified parameter patch spanning the gap supplies the missing interval; a point outside both intervals would not suffice.

Finally, a fixed-twist certificate gives one balance in coordinates $(\delta,\varepsilon,u)$. Its unknown box lies inside the reviewed twist-branch box. Its solution enclosure, reordered as $(\varepsilon,u,\alpha)$, lies inside a new spacing box, and its entire spacing enclosure lies in that piece's parameter interval. Uniqueness in both parametrizations identifies the same balance on both curves. The resulting connected family includes both previously separate certified portions. This is a statement about a family of possible steady motions; it supplies no time evolution from one to another.

The assembly checker uses exact rational arithmetic for binary centres and radii and enlarges incoming printed intervals by one last displayed digit, while shrinking receiving intervals by that amount. It therefore does not turn nearest-rounded display endpoints into exact outward endpoints. Contraction diagnostics stored as binary64 are enlarged by one binary64 step before exact weighted summation. An independent rational enclosure of $\pi$ is obtained from the alternating series in $\pi=16\arctan(1/5)-4\arctan(1/239)$; the identity follows by the tangent addition formula and the first-quadrant angle. Its series remainder, rather than a floating-point value of $\pi$, is used for the contact comparisons.

## Initial checkpoint

The [input manifest](../evidence/rotating-ladder-branch-connection-2026-10-29/input-manifest.json) freezes 15 source and evidence files before target execution, including the unchanged interval evaluator and the reviewer's outward-norm solver. Fresh scalar, exact coupled-linear-system and known $0.9\pi$ controls pass before the new target pilots.

The first pilot tried spacing intervals of width $0.002$ near $\delta=2.925,2.950,2.980$. All three failed strict containment in the twist component, while the other components passed. Wider boxes lose too much cancellation; this failure is not evidence that the branch ends. The failed receipts and the executed driver version are retained. The refined pilot passed all three centres at width $0.001$, admitting a 57-piece cover of $[2.924,2.981]$ with explicit outward parameter overlap.

The separate rational assembly audit passes all 218 old principal pieces and all 217 selected patches, covers the literal decimal interval $[2.8700,2.9245]$, and places both reviewed $0.878\pi$ balances on that one curve. Its maximum principal-piece contraction upper bound is below $0.140302$. The first audit attempt incorrectly counted 109 explicitly unrun entries from the earlier patch attempt as selected certificates; it stopped before claiming success. After adding a known-case selection control and selecting only successful patches, the exact unique-pair inventory and all containment checks pass. The source receipts are unchanged.

All 57 new principal pieces and all 57 joins, including the join to the old curve, pass. The first contact attempt at $\alpha=0.8801\pi$ also certifies an exact balance inside the reviewed twist box. However, its spacing image $[2.9799813447,2.9800069245]$ crosses the shared spacing boundary $2.98$, so it cannot identify a root inside either individual new piece. The producer correctly stops rather than claiming a connection. A separate resumed contact run uses head cutoff $N=12000$ instead of $4000$ and tighter unknown radii; it passes and identifies the root inside piece 55. The original contact receipt and exact executed producer version are preserved. Both attempts use the same frozen tail formulas and equation.

## Evidence and lifecycle

Canonical code, compact audit results and reproduction commands are under [the evidence owner](../evidence/rotating-ladder-branch-connection-2026-10-29/README.md). The [evidence receipt](../evidence/rotating-ladder-branch-connection-2026-10-29/evidence-receipt.json) binds all retained payloads, executed source versions and run identities. Raw controls, failed and passing pilots, full piece images, joins and both contacts remain under `.local-data/master-equation-closure/rotating-ladder/branch-connection-2026-10-29/`; this is local retention, not verified remote backup. All Python uses the shared venv; every long run uses the owned-computation supervisor with a hard deadline and observable heartbeat. The full producer ran for 679.744 seconds and stopped at the placement assertion, with all cover and join work intact; the refined contact run completed in 15.687 seconds. Supervisor wall time includes controls and setup and does not measure resource cost. The manuscript has concurrent edits and is outside this study's edit scope.

## Scope limits and falsifiers

This target connects two existing portions of a family of balanced configurations. It is not a free evolution between them, a stability claim, a nondegenerate-fold theorem, or a certificate of the entire route to the translating endpoint. A failure of a sufficient interval test is inconclusive about physical existence. A missing parameter interval, absent common solution, violated tail bound or failed strict image invalidates the claimed bridge. App compatibility and the illustrative geometry do not supply mathematical evidence.
