# Maxwell-shaped coupled-history evolution

This source owns the comparison instrument and retained-history measurements for the selected ten-hour Sections 7–8 investigation. It is a research instrument, not an EOM solver or a canonical law. The primary synthesis and shared-document integration belong to the coordinating writer. This source does not overwrite earlier Maxwell controls.

## Equation and complete-root domain

The selected equations are E and E+M in [Sections 7–8](../../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response), with $K=c_f=1$, two opposite-polarity members, and planar mirror paths $\mathbf X_+=\mathbf q$, $\mathbf X_-=-\mathbf q$. Every ordinary positive-delay partner root is included. For complete speeds below $b<1$, the causal gap is strictly increasing in emission time with derivative $D\ge1-b$ wherever the range is nonzero. The complete bounded circular tail makes the gap negative at sufficiently old emission times, while separated reception gives a positive gap at reception. Consequently there is exactly one partner root. The complete speed inequality excludes every positive-delay self chord. This is a derived root census on the uniform-speed domain, rather than a deleted self channel.

The delayed source acceleration is evaluated as the second derivative of the retained source path, including the supplied past. E and E+M therefore define a neutral delayed equation. Positive delay permits local method-of-steps evolution without requiring the delayed acceleration coefficient to be less than one. Large gain can spoil numerical conditioning; it does not by itself end mathematical local existence.

The unrestricted, inclusive-domain ceiling and strict-domain ceiling labels coincide on the monitored uniformly subfield interval. No clamp, projection, braking multiplier, soft core, root deletion, impulse, added self response or equality continuation is selected. A numerical guard stop is reported as loss of that monitored domain; it is not automatically contact or equality.

## Frozen method before target use

The [subject instrument](../evidence/maxwell-shaped-overnight-history-instrument.mjs) integrates $(\mathbf q,\mathbf q')$ by classical fourth-order Runge–Kutta on steps shorter than the source delay. Every stage must sample completed past only. After the step, its endpoint acceleration is evaluated from the same delayed equation. Between endpoints the retained position is a quintic Hermite polynomial matching position, velocity and acceleration at both ends. Its first and second derivatives supply delayed velocity and acceleration, so the history representation does not independently interpolate mutually inconsistent jets.

The degree-four velocity polynomial is converted to Bernstein control vectors. Its norm throughout the entire segment is bounded above by the largest control-vector norm, by convexity. A retained segment whose bound reaches one is refused. Root isolation uses the derived monotonic gap and bisection across the complete past, with default width tolerance $2\times10^{-13}\max(1,\text{bracket age})$. This width is a measured binary64 root enclosure width, not a directed-rounding certificate. A root-width error bound is distinct from accumulated trajectory error.

For a smooth regular chart, quintic Hermite position error has order six, velocity error order five and acceleration error order four. Classical fourth-order Runge–Kutta is consequently a consistent candidate scheme there. This statement assumes sufficient bounded derivatives and positive range, delay and transmitter-denominator floors; it is not a proved global convergence estimate for the neutral equation. A merely $C^{2,1}$ compatible preparation can have derivative seams and reduce the observed order. History refinement, root refinement and a separate independently authored reference remain required before interpreting a target trajectory.

### History regularity and the consistency limit

The compatible preparations are $C^{2,1}$, rather than globally six times differentiable. Here $C^{2,1}$ means that acceleration is locally Lipschitz. If an exact path has acceleration-Lipschitz constant $L$ on a segment of length $h$, expand it to second order at the left endpoint. The residual right-end position, velocity and acceleration satisfy $\|d\|\le Lh^3/6$, $\|e\|\le Lh^3/2$ after multiplying the velocity residual by $h$, and $\|f\|\le Lh^3$ after multiplying the acceleration residual by $h^2$. The three quintic correction coefficients are $10d-4e+f/2$, $-15d+7e-f$ and $6d-3e+f/2$, bounded respectively by $(25/6)Lh^3$, $7Lh^3$ and $3Lh^3$. Taking two derivatives and comparing with the true acceleration gives the conservative exact-jet interpolation estimate

$$
\|\mathbf A_{\mathrm{Hermite}}-\mathbf A_{\mathrm{exact}}\|_\infty\le170Lh.
$$

This bound is derived for exact endpoint jets. It explains why a first-order history-acceleration bound, rather than fourth order, is the safe regularity expectation through preparation seams. It does not bound errors in numerical endpoint jets or prove convergence of the full scheme. An endpoint compatibility seam can generate later changes of derivatives when it is sampled again; smooth-window order measurements cannot remove that limitation.

On a common regular chart, a source-position error $\varepsilon_X$ and reception-position error $\varepsilon_x$ shift the unique root by at most $(\varepsilon_X+\varepsilon_x)/(1-b)$. An acceleration-Lipschitz source adds at most its Lipschitz constant times that shift to the directly interpolated acceleration error. The response then has finite local Lipschitz constants while $R$ and $D$ have positive floors. Method-of-steps bounds can propagate those errors through finitely many delay blocks. Actual numerical certification still requires those constants, interpolation defects and arithmetic errors to be enclosed on the retained trajectory; matching outputs do not provide them.

Binary64 arithmetic places a separate limit on refinement: an endpoint-position subtraction error of size $\epsilon_{\mathrm{mach}}\|\mathbf q\|$ becomes an acceleration interpolation error of approximate scale $\epsilon_{\mathrm{mach}}\|\mathbf q\|/h^2$. Thus arbitrarily reducing $h$ at fixed arithmetic precision is not a convergence argument for position-derived delayed acceleration. The retained exploratory tiny-step failures demonstrate this limit directly.

The recorded diagnostics are separation, radius, radial and tangential velocity, angle and angular rate, radial and tangential acceleration, partner and self-root census, root residual and width, delay and range, transmitter denominator, delayed source acceleration, complete interpolant speed bound, endpoint equation defect, and the identical-history scalar $\mathbf u\cdot\mathbf M$. The last quantity tests the exact ablation identity and does not compare future speeds after two separately coupled paths diverge.

## Known controls, recorded before target use

The instrument passed its exact quintic interpolation-jet control, stationary-source E/M control and affine-source present-position closed form on its first control-only run. Measured errors were respectively $4.885\times10^{-15}$, below $10^{-11}$ including root location, and $5.927\times10^{-15}$ in affine E, by `node .../maxwell-shaped-overnight-history-instrument.mjs --controls-only`. These tests precede target use. A failed rerun falsifies the recorded algebra verification.

The [analytical first-window control](../evidence/maxwell-shaped-overnight-known-controls.mjs) has complete held mirror tails and a short compatible endpoint acceleration patch. Through $T=1/2$, all source roots lie in the held tail. Setting $y=q+1$ gives $y''=-1/y^2$, $y(0)=2$, $y'(0)=0$. Multiplication by $y'$ and elementary integration yield

$$
(y')^2=2\left(\frac1y-\frac12\right),\qquad
T=2\left[\arccos\sqrt{\frac y2}+\sqrt{\frac y2\left(1-\frac y2\right)}\right].
$$

This is a mathematical consequence of the selected stationary-source acceleration; no standard physical conservation law is imported. The control tests time integration and root placement against an analytical solution before the source-acceleration feedback becomes active. It cannot independently validate that later feedback.

A complete transverse sinusoidal source supplies an accelerated known response. Its root at $S=-2$ has $\mathbf X=\mathbf V=0$, $\mathbf A=(0,0.03)$ and receiver $\mathbf x=(2,0)$, so the exact transverse coefficient gives $\mathbf E=(0.25,-0.015)$. For receiver $\mathbf u=(0.2,0.3)$, $\mathbf M=(-0.0045,0.003)$. The known-control run measured E error $1.705\times10^{-15}$ and verified the receiver map and transverse acceleration identity before coupled target use. The complete source speed is bounded by $0.075$.

For the analytical first-window integration, the position errors at $h=0.025,0.0125,0.00625$ are $1.0352\times10^{-11}$, $6.6380\times10^{-13}$ and $4.1744\times10^{-14}$. The approximately sixteenfold reduction is a measured fourth-order check on this smooth source window. It does not promise that order through neutral delayed feedback or preparation seams.

## Exploratory numerical guards and conditioning

The first $\beta=0.3$ exploratory continuations approach speed one at positive separation. At $h/r=0.0025$, the E run ends near $T=59.52643$, $r=0.17157135$; E+M ends near $T=38.35850$, $r=0.25105495$. These terminal observations are stage-speed or retained-interpolant numerical guards, not certified equality events. Their source denominator and positive delays remain nonzero. The output records preserve those exact stop reasons.

Repeated step halving to about $10^{-10}$ produces large interior acceleration defects from binary64 cancellation in a quintic built from nearly identical endpoint positions. A separate final-horizon rounding remainder of only a few $10^{-12}$ has the same defect. Those explorations are retained as conditioning evidence and cannot supply a global trajectory error bound. The subject runner therefore uses an explicitly declared monitored speed threshold $0.999$ and ignores a trailing horizon remainder below $\max(10^{-10},10^{-8}h_{\mathrm{nominal}})$. Neither changes the equation. A selected threshold stop means only first exit from that monitored margin. Its exact boundary statement still requires independent event analysis.

Quarter-, half- and three-quarter-segment defects compare the actual retained polynomial acceleration with the selected delayed response. In contrast, knot acceleration defects are construction identities because endpoint accelerations are assigned by the same response. The two diagnostics have separate evidentiary authority.

Angular evolution is retained by adding every step's signed planar angle increment. A segment position floor $\|\mathbf q_{\mathrm{left}}\|-h v_{\mathrm{segment}}>0$ and the bound $h v_{\mathrm{segment}}/r_{\mathrm{floor}}<\pi$ exclude a hidden full turn within a step. Wrapped endpoint angles alone are not used to count rotations.

## Target preparation and current disposition

The original numerical family is frozen in the [compatible-launch module](../evidence/maxwell-shaped-overnight-preparation.mjs) and [equation/domain derivation](maxwell-shaped-overnight-equation-domain.md#3-compatible-near-circular-release-with-explicit-bounds): $\beta\in\{0.1,0.2,0.3\}$, $r=1/(4\beta^2)$, $K=c_f=1$, complete circular old tail and short endpoint patch. The patch makes each selected law compatible without claiming that its old circular tail solves that law.

A second family is separately frozen before target use in the [radial-balance module](../evidence/maxwell-shaped-overnight-radial-balance-preparation.mjs). It uses the same speed labels, coupling, polarities, member count, complete-past formula and regularity bounds, but sets $r=-C_r(\beta)/\beta^2$, where $C_r$ is the selected law's unit-radius prescribed-circle radial acceleration. This balances the circle's radial component exactly by the derived $1/r^2$ response scaling; its tangential residual remains nonzero. Each law has a different radius, old tail and endpoint patch. This preparation removes the original family's radial mismatch at release and supplies a cleaner finite secular comparison. It is a complete distinct case, not a repaired interpretation of the first family.

✓ Done: complete specifications for the original family and the separate radial-balance family are frozen and implemented. Each E and E+M future starts from its own compatible complete endpoint patch. Identical-history input ablations preserve all source values, including acceleration, and do not identify these separate coupled futures.

✓ Done: the independently authored [reference](maxwell-shaped-overnight-independent-reference.md) was frozen and passed stationary, affine, accelerated-source, genuinely neutral delayed-acceleration and analytical first-window controls before it received the subject target outputs. Its separate integrated-velocity DOP853 history method agrees with the subject at the bounded interval below. Earlier position-derived dense reference failures are retained by that reference's owner.

✓ Done for the bounded original full case: the [independently assessed original incoming-event certificate](maxwell-shaped-overnight-independent-reference.md#original-full-binary-certified-incoming-unit-event-and-classical-obstruction) combines the admitted strict-v8 prefix through thirty-eight with the separately frozen direction-frame receiving criterion. It proves a first transverse unit-speed endpoint at positive separation in $38<T_*<38.39357291665996$ and the named obstruction to unchanged all-root classical C2 outgoing crossing. Its whole-prefix positive work and source-history/root obligations are checked independently; it introduces no auxiliary release. Earlier failed sufficient bounds remain preserved. This is controlled finite contraction followed by a formulation obstruction for this complete case, not capture, persistent binding or a weak-continuation verdict.

◐ Partial for the separately coupled E ablation: the [independently assessed continuous enclosures](maxwell-shaped-overnight-neutral-majorant-feasibility.md) establish original analytical $\beta=0.3$ E and E+M solutions through twenty, and two full enclosures through exact thirty-eight. The coordinator's later E v6 enclosure has an independently admitted completed prefix through exact $7580766169638155/140737488355328$, approximately $53.86458$, with its failed requested horizon $59.5$ retained as a completed-source-support proof limitation; an independently checked restriction covers exactly fifty. Its strict signed-clock v8 successor stops later on an interval denominator enclosure limitation, with partial target assessment pending. The physical-frame v9 attempt of the same original E launch and immutable comparison closes at 10:48:34 UTC with 16462 completed cells through exact $1995735772371699/35184372088832$, approximately $56.72222$. The independent worker admits all completed cells, analytic recurrences, whole-source acceleration inventory and strict-trial witnesses. Its next failed scalar-majorant positivity condition is a proof-method limitation; it is not the physical transmitter denominator or a unit-speed event. The fixed-source event window remains uncovered. No actual E endpoint or later fate is inferred from the separately proved full result or any numerical speed-margin exit.

The [independent actual-window reference](maxwell-shaped-overnight-independent-reference.md#sharper-actual-observables-and-whole-contraction-window) checks all 5186 exact clipped cells on $[20,38]$ for the original full launch. It encloses radial velocity in $[-0.43803668,-0.04973456]$, radius above $0.44592261$ and tangential velocity above $0.29714563$. At thirty-eight the actual radius lies in $[0.44592262,0.45091363]$, speed in $[0.73990303,0.75142630]$, radial velocity in $[-0.43368670,-0.40910961]$ and tangential velocity in $[0.60192790,0.62866311]$. Continuous unwrapped phase lies in $[7.27615,7.29154]$, with one completed revolution; delayed source-acceleration norm lies in $[0.43867973,0.50059174]$. **Derived, independently assessed finite contraction:** this actual full solution contracts throughout twenty to thirty-eight, with positive angular advance and the retained ordinary-root/positive-denominator/separation margins. A missing cell, a radial-velocity enclosure meeting zero, changed original complete history or invalid underlying tube falsifies the claim. Neither finite contraction nor a completed revolution establishes capture, stable binding or a terminal obstruction.

The input acceleration norm alone does not establish a realized delayed-source-acceleration contribution because its map has a null direction. The separately known-first [independent realized-source projection](maxwell-shaped-overnight-independent-reference.md#realized-delayed-source-acceleration-contribution-separately-checked-diagnostic) also encloses that actual response norm at thirty-eight in $[0.5136610790,0.6110060040]$, excluding zero. Its Euclidean support bound, mirrored source jets, complete closed-bin inventory and response projection are assessed independently from the input-norm diagnostic. This is a bounded endpoint fact rather than a proof of its future dominance or an error floor.

The later independently assessed direction-frame v2 certificate has its first strict reverse-triangle witness at exact receiving face $T_w=337713438829866759/8796093022208000$. Through all 793 preceding accepted cells it encloses actual work $2\mathbf u\cdot\mathbf E>0.104372382255558$, present separation above $0.42679$, partner range above $0.66053$ and transmitter denominator above $0.80967$. Every source face lies strictly within the admitted completed prefix, and the whole position/velocity cylinders improve strictly. The no-earlier-unit hypothesis would therefore imply speed above one at $T_w$, a contradiction. Incoming work gives $\mathbf u(T_*)\cdot\mathbf A(T_*)>0.05218619$ at the first event. The earlier strictly subfield complete history excludes positive-delay self chords through that endpoint. The separately assessed self-birth theorem then excludes unchanged all-root classical C2 outgoing crossing because its newborn positive-coupling self contribution diverges while ordinary partner contributions remain bounded. **Derived, independently checked bounded fate:** this exact original full launch has an initial outward phase, certified later contraction and a transverse formulation boundary at positive separation. This theorem does not adopt the superunit receiving test as an outgoing trajectory, select a weak continuation or transfer to any other launch or to E. The explicit falsifiers are a changed complete preparation or ancestor, missed source bin/root, invalid response/frame identity, failed strict cylinder/recurrence or nonpositive first-witness work or speed gap; the linked independent receipt inventory makes each check concrete.

The [independently checked incoming polar and speed-guard corollaries](maxwell-shaped-overnight-equation-domain.md#67-exact-incoming-margins-and-polar-continuation-to-the-unknown-endpoint) sharpen the same actual full event to $38.33583333332<T_*<38.39357291666$. The separately authored Gaussian norm-ball instrument gives whole incoming radial velocity below $-0.4084767$, tangent velocity above $0.5064573$ and phase rate above $1.3340152$. Consequently strict contraction continues from twenty through the first unit endpoint, rather than ending at thirty-eight. Integrating only to the unknown incoming endpoint gives an additional phase advance in $[0.55680925,0.81704390]$ and a radius decrease greater than $0.17030813$ after thirty-eight. Continuity and the exact planar unit identity then give safe event bounds $0.21356<r(T_*)<0.280614$, $7.83295<\theta(T_*)<8.10859$, $0.5<v_T(T_*)<0.8$ and $-0.867<v_R(T_*)<-0.6$. These are conservative actual incoming bounds, not a continued numerical orbit. The exact speed-guard and first-witness fractions, complete accepted cell partition, bilinear Euclidean-error bound and inherited planarity/unit endpoint are explicit falsifiers of the corresponding corollary.

For the separately coupled original E case, the [independently assessed exact restriction of its admitted v9 prefix](maxwell-shaped-overnight-independent-reference.md#same-history-physical-frame-prefix-refinements) checks all 10081 clipped closed cells on $[20,55]$ using the unchanged Gaussian history and bilinear Euclidean norm-ball reference. Safe whole-window radial velocity is in $(-0.13344,-0.01514)$, tangent velocity in $(0.26100,0.43691)$ and radius in $(1.03309,2.86258)$. Phase advance from twenty to fifty-five lies in $(6.3836,6.4813)$, exceeding a full turn. **Derived, independently assessed finite E contraction:** the original E solution contracts continuously throughout this window, preserving its positive angular motion and ordinary-root domain. Its terminal fate remains unresolved, and neither this window nor the full law's event supplies it. The adapter's known exact clipping, signed polar, insufficient-coverage and wrong-case controls precede extraction; changed ancestry, a missing closed cell, a false inherited norm error or a nonnegative radial upper bound falsifies the corresponding corollary.

## Identical-complete-history ablation and fixed controls

The [subject runner](../evidence/maxwell-shaped-overnight-evolve.mjs) retains the following signed launch accelerations on each frozen original preparation. Positive radial points outward; positive tangent follows the receiver velocity. At launch the root samples the unchanged old circle, so both compatible preparations have the same sampled jets despite their different recent endpoint patches. Each row below evaluates canonical, G, E and E+M using the same complete source history and reception state. The canonical and amplitude-gradient columns are prescribed-input controls under their fixed laws, not coupled-fate claims or transfers of their existing proof domains.

| Initial speed | Radius | Canonical radial, tangent | G radial, tangent | E radial, tangent | E+M radial, tangent |
| --- | ---: | --- | --- | --- | --- |
| $0.1$ | $25$ | $(-3.98034344\times10^{-4},+3.97377825\times10^{-5})$ | $(-4.01898256\times10^{-4},+5.15701723\times10^{-7})$ | $(-3.94170431\times10^{-4},-1.03758719\times10^{-6})$ | $(-3.98189414\times10^{-4},-1.03758719\times10^{-6})$ |
| $0.2$ | $6.25$ | $(-6.28032517\times10^{-3},+1.24802487\times10^{-3})$ | $(-6.50420047\times10^{-3},+5.99356849\times10^{-5})$ | $(-6.05644987\times10^{-3},-1.22739791\times10^{-4})$ | $(-6.31661789\times10^{-3},-1.22739791\times10^{-4})$ |
| $0.3$ | $25/9$ | $(-3.11381128\times10^{-2},+9.21312382\times10^{-3})$ | $(-3.33265557\times10^{-2},+8.83027094\times10^{-4})$ | $(-2.89496699\times10^{-2},-1.86081128\times10^{-3})$ | $(-3.19490599\times10^{-2},-1.86081128\times10^{-3})$ |

The instantaneous difference is radial at these launch events, and $\mathbf u\cdot\mathbf M=0$ to the recorded roundoff. E supplies the change of tangent relative to canonical and G; M supplies additional turning. Neither sign is used as a fate proof.

## Checked finite interval and separated refinements

For the original $\beta=0.3$ cases through $T=35$, the nominal subject step $h/r=0.00125$ gives the following measurements by the subject runner. The actual all-past preparation and retained polynomial speed bounds are included; the D and delayed-acceleration entries are sampled diagnostics, not directed whole-interval bounds.

| Equation | Final radius | Final radial, tangential velocity | Unwrapped angle | Complete interpolant speed bound | Minimum sampled D | Maximum sampled delayed acceleration norm |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| E | $2.19610346034$ | $(-0.07042869585,0.31259310935)$ | $3.55652018170$ | $0.475$ | $1.02040235175$ | $0.03642124982$ |
| E+M | $1.09343019812$ | $(-0.14516137553,0.46795841920)$ | $5.23319284339$ | $0.48995602563$ | $1.02035267019$ | $0.13315599296$ |

The corresponding minimum sampled delays are $4.49224459348$ and $2.28581790955$. All roots counted are the single partner root, with zero positive-delay self roots by the complete speed theorem. Quarter-, half- and three-quarter-segment maximum equation defects are $9.92336\times10^{-7}$ and $7.88168\times10^{-7}$. These measured defects do not enclose unsampled maxima.

The separate integrated-velocity DOP853 reference at maximum step $0.05$ gives radius differences $3.62\times10^{-8}$ for E and $3.25\times10^{-8}$ for E+M against this subject, and speed differences $3.73\times10^{-9}$ and $7.17\times10^{-9}$. Its maximum sampled defects are approximately $5.80\times10^{-7}$ and $5.06\times10^{-7}$, with acceleration seam discrepancies near $6.4\times10^{-16}$. This is measured cross-method agreement over the same complete cases, not continuous error certification.

The nominal joint timestep/history refinements are $h/r=0.005,0.0025,0.00125$. The C2 preparation seams prevent claiming fourth-order target convergence from these rows; E's final discrepancies are not monotone. To separate history resolution from reception integration, the [history-grid module](../evidence/maxwell-shaped-overnight-history-resolution.mjs) coalesces groups of two or four fine steps into quintic source-history segments while the receiver still integrates at $h/r=0.00125$. It passed an exact-quintic fine/coarse-grid known control with maximum jet error $5.56\times10^{-15}$ before target use. At $T=35$, source strides one, two and four alter radius by at most $1.35\times10^{-9}$ for E and $2.90\times10^{-9}$ for E+M. These are measured history-resolution checks; both history grids are still approximations.

Keeping both grids fixed and changing root tolerance from $2\times10^{-13}$ to $2\times10^{-14}$ changes the final radius by $1.67\times10^{-11}$ for E and $2.54\times10^{-11}$ for E+M. The tighter runs' maximum root residuals are below $7.8\times10^{-14}$. Floating-point root widths and residuals remain distinct from directed-rounding root certificates.

## Selected monitored speed-margin exits

The added margin-event instrument first passes the exact known case $\mathbf X=(t^2/2,0)$ on $[1,2]$, for which $d\|\mathbf V\|^2/dt=2t$ has Bernstein enclosure $[2,4]$. On each accepted target it checks that prior source/interpolant segments cannot cross the selected margin unnoticed and uses a positive Bernstein speed-squared derivative bound to localize the final threshold crossing. The first exploratory auxiliary event record lacked this recorded known-case-first order and is retained without acceptance; only the subsequent `checked-event999` rows carry that check.

The original $\beta=0.3$ family has the following interpolated threshold events, measured by the subject runner. This is first exit from the selected speed margin $0.999$, not speed equality.

| Equation | $h/r$ | Threshold time | Radius at threshold |
| --- | ---: | ---: | ---: |
| E | $0.005$ | $59.52586118510$ | $0.17189009540$ |
| E | $0.0025$ | $59.52587348549$ | $0.17189009253$ |
| E | $0.00125$ | $59.52586486446$ | $0.17189009464$ |
| E+M | $0.005$ | $38.35783587186$ | $0.25155990237$ |
| E+M | $0.0025$ | $38.35784029612$ | $0.25155990312$ |
| E+M | $0.00125$ | $38.35784057848$ | $0.25155990302$ |

The E threshold-time spread is approximately $1.23\times10^{-5}$ and is not monotone; the full-row spread is approximately $4.71\times10^{-6}$. The interpolated time widths are much narrower than these trajectory differences, so they cannot serve as total event error bars. Positive separation, delay and sampled D survive these threshold events. The original $\beta=0.1,0.2$ family and the separate radial-balance family also reach the selected margin, with retained full history and phase-return measurements; independent finite-interval and event coverage is explicitly narrower than the full family.

## Feasibility and limits of a continuous enclosure

The [chart instrument](../evidence/maxwell-shaped-overnight-chart-diagnostics.mjs) evaluates the exact planar norm of the delayed-acceleration coefficient. Writing $P=I-\mathbf n\mathbf n^{\mathsf T}$ and $\mathbf v_\perp=P\mathbf v$ gives

$$
B_E=-\frac{DP+\mathbf v_\perp\mathbf n^{\mathsf T}}{RD^3},\qquad
\|B_E\|=\frac{\sqrt{D^2+\|\mathbf v_\perp\|^2}}{RD^3}.
$$

For the planar target the range of $B_E$ is one-dimensional. The receiver map multiplies that image norm by $\sqrt{D_r^2+\|\mathbf u_\perp\|^2}$, with $D_r=1-\mathbf n\cdot\mathbf u$. At $\mathbf n=(1,0)$, source velocity zero, $R=2$ and $\mathbf u=(0.2,0.3)$, the matrix maps a source acceleration to $(0,-a_y/2)$ under E and $(-0.3a_y/2,-0.8a_y/2)$ under E+M. The instrument passed these independent matrix-norm values $0.5$ and $0.4272001873$ before targets.

On every tenth integration knot through $T=35$, maximum sampled gains are $0.22224371$ for E and $0.61561396$ for E+M. Bernstein bounds over every future polynomial segment give jerk-norm bounds $0.00732667$ and $0.11635406$, with conservative supplied-past bounds $0.05648124$ and $0.02937672$. These values make a chart-specific continuous enclosure plausible. They do not certify it. A bound using only the generic floor $D\ge1-b$ is too loose and does not keep the neutral gain below one; stronger direction/root boxes are needed. Even a gain below one would still require receiver/source sensitivity bounds and a closed trajectory tube, not only a small defect or a local coefficient.

### Conditional final-window event inequality

An exact incoming history can make the final approach an ordinary equation with fixed source data. Let its reception state at $T_0$ be $(\mathbf x_0,\mathbf u_0)$ with $\|\mathbf u_0\|<1$, and its unique source root be $S_0<T_0$. Choose a time length $h>0$, a reception cylinder with $\|\mathbf x-\mathbf x_0\|\le h$ and $\|\mathbf u\|\le1$, and an enclosed source window with transmitter floor $d_t>0$. Root perturbation obeys

$$
|S-S_0|\le\kappa h,\qquad \kappa=\frac2{d_t}.
$$

This follows from the implicit-root time/position bound $|\Delta S|\le(|\Delta T|+\|\Delta\mathbf x\|)/d_t$. Require $S_0+\kappa h<T_0$, so every source value remains in the fixed incoming past; require positive range, and $\|\mathbf x_0\|-h>0$ to keep mirror separation positive. On that cylinder enclose the acceleration by a finite bound $A$ and establish

$$
2\mathbf u\cdot F(T,\mathbf x,\mathbf u)\ge m>0,
\qquad
h>\frac{1-\|\mathbf u_0\|^2}{m}.
$$

If no speed-equality event occurred by $T_0+h$, integration of the first inequality would give $\|\mathbf u(T_0+h)\|^2>1$, a contradiction. Thus a first equality event occurs within the window at positive separation, while only fixed earlier source values are sampled. The bounded ordinary input and local uniqueness hypotheses provide extension to that first boundary, not through it. At the boundary the strictly positive speed derivative would also prevent an inclusive-domain-only continuation that keeps speed at most one and still obeys the same acceleration. This is a derived conditional event criterion. It assumes an exact incoming state/history cylinder and enclosed inequalities; no retained numerical record has yet supplied those premises rigorously.

A closed tube from the original launch is necessary to apply this event criterion to an original case. Treating a numerical incoming endpoint as exact proves a different preparation's event. The full original launch subsequently meets this requirement through the independently assessed prefix and direction-frame first-witness certificate in the current disposition; E remains unclosed in its event source window. Failed range, source-window, D or speed-derivative bounds falsify the corresponding premise. The next decisive E theorem is to close that remaining original-history support and its final-window inequalities independently.

## Radial-balance family measured comparison

The separately frozen radial-balance preparations have the following measured first exits from the $0.999$ speed margin by the subject runner. Each row has positive separation, one ordinary partner root and zero positive-delay self roots by the retained complete-past speed bound. The table lists both timestep/history refinements; it does not enclose the exact trajectory. Independent comparison of these second-family futures remains narrower than the original $\beta=0.3$ validation.

| Initial speed | Equation | Radius of supplied circle | Threshold time, $h/r=0.005$ | Threshold time, $h/r=0.0025$ | Radius at fine threshold | Fine radial, tangential velocity | Fine unwrapped angle |
| --- | --- | ---: | ---: | ---: | ---: | --- | ---: |
| $0.1$ | E | $24.63565196444$ | $16579.49847998$ | $16579.49847391$ | $0.19074298094$ | $(-0.51413558436,0.85654281906)$ | $145.30958700100$ |
| $0.1$ | E+M | $24.88683837439$ | $16091.41416562$ | $16091.41416420$ | $0.25828250334$ | $(-0.75379295019,0.65558919167)$ | $133.94405647246$ |
| $0.2$ | E | $5.91450182777$ | $314.10233216378$ | $314.10233276780$ | $0.18948782315$ | $(-0.52299263361,0.85116373583)$ | $25.39761136324$ |
| $0.2$ | E+M | $6.16857215851$ | $286.39546346924$ | $286.39546382724$ | $0.25816793971$ | $(-0.75269589821,0.65684844890)$ | $20.15847771574$ |
| $0.3$ | E | $2.48196758253$ | $37.70143978372$ | $37.70144039774$ | $0.19290418808$ | $(-0.48020172911,0.87601786475)$ | $10.56063631739$ |
| $0.3$ | E+M | $2.73911693176$ | $36.01168236918$ | $36.01167816250$ | $0.25196916960$ | $(-0.76221118162,0.64578255986)$ | $7.68794586732$ |

Every recorded radial velocity at integration knots is inward in this family, whereas the original leading-radius $\beta=0.1$ E preparation initially expands to sampled radius $25.41285$ from $25$. That measured difference confirms why radial matching is a distinct preparation. It does not certify continuous monotonic contraction between knots. Finite phase-return rates differ from the formal small-parameter cubic-radius rate; the equation/domain source confines that derived rate to its separately regular and compatible slow family with controlled errors.

The independent integrated-history reference additionally localizes the original $\beta=0.3$ threshold at $59.52586595092$ with radius $0.17189009432$ for E and $38.35784036907$ with radius $0.25155990297$ for E+M at maximum step $0.0125$. Its exact-rational Bernstein certificate bounds the literal retained curve's threshold time within $10^{-9}$, with source-freeze support and prior-segment speed bounds. This is independent corroboration of the original measured margin exits. A retained-curve certificate is still distinct from a continuous error enclosure around the exact original delayed solution.

The [separate auxiliary late-history release](maxwell-shaped-overnight-auxiliary-late-release.md) independently certifies an actual incoming first speed-one endpoint at positive separation for a new exact compatible complete preparation under each law. The separately assessed transverse self-birth result excludes classical C2 all-root outgoing continuation for that auxiliary case. Those auxiliary results do not close an original launch's event bridge. The original full bounded fate in the current disposition has its own continuous-prefix and incoming-event evidence; the original E event remains unresolved.
