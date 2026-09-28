# Independent assessment of the first event on the staggered lattice branch

**Status: independently accepted first transverse unit-speed event.** The exact axial ancient branch with $a=2^{-40}$ first reaches unit speed in $(1191/128,1193/128]$, before any turn or contact. The exact characteristic root $\lambda$, $g=16$, $c_f=1$, infinite alternating cubic population and original stationary block sum are retained. Sections 13–14 give the final event and its consequences for unchanged-law continuation; Sections 1–12 retain the independent derivation and review that support it.

The initial mathematical arguments below were derived before reading new trajectory or continuation subjects. All [incoming-history construction](smooth-two-particle-incoming-reachability.md), [domain](smooth-two-particle-incoming-reachability-domain.md) and [independent assessment](smooth-two-particle-incoming-reachability-independent-adjudication.md) inputs remain frozen. A finite numerical curve is a comparison object until its residual, tail, root coverage and actual-solution error are bounded independently.

## 1. Exact branch and a finite-endpoint continuation domain

The positive-polarity receiver has position $i+q(t)e_3$ and the negative-polarity receiver has position $i-q(t)e_3$. Put $p=q'$. The accepted complete past satisfies $q,p,q''>0$ and

$$
|q^{(k)}(t)-\lambda^k a e^{\lambda t}|
\le(2\lambda)^k K a^2e^{2\lambda t},
\qquad K=150000,\quad k\le2,\quad t\le0.
\tag{1}
$$

Follow the unchanged equation while $p>0$, $p<1$ and $q<1/2$. Before the first turn or first speed-one event, the entire earlier path remains positive and increasing, so $0<q(s)\le q(t)<1/2$ for $s<t$. The complete subunit past gives exactly one cross root and no positive-delay own root. A root cannot become nonsimple while its sampled source speed remains below one.

On any compact receiver interval on which $q\le B<1/2$, every cross delay is at least $1-2B$. The newly needed source values therefore lie strictly in an earlier prefix. A sufficiently short next interval is an ordinary receiver equation with those known sources. Its infinite sum consists of the unchanged regular stationary field, finitely many rows that sample the finite evolved prefix, and an absolutely convergent exponentially old tail. The same decomposition applies to its receiver derivative. Local existence and uniqueness consequently continue the symmetric solution while these strict bounds and the bounded source jets persist. This is a direct method-of-steps argument for the present infinite ancient tail; it does not import the earlier finite-disturbance theorem.

## 2. Only one geometric pair can approach zero range

Use the even receiver at anchor zero. An odd source at $e_3$ is its approaching vertical partner. Write $s=t-\delta(t)$ for that source's emission. As long as $q<1/2$, its causal equation is exactly

$$
\delta(t)=1-q(t)-q(t-\delta(t)).
\tag{2}
$$

Its source velocity is $-p(s)e_3$, its received direction is $-e_3$, and the unlike-polarity contribution to the receiver's upward acceleration is

$$
A_{\rm pair}(t)=\frac{g}{\delta(t)^2[1-p(s)]}>0.
\tag{3}
$$

Every other distinct-label channel has range at least one in this stopped regime. For a source with nonzero horizontal offset, the horizontal range alone is at least one. For a purely vertical odd source other than $e_3$, its signed integer offset has magnitude at least three on the approaching side or at least one on the receding side; subtracting $q(t)+q(s)<1$ preserves the asserted floor. Purely vertical even sources have offset magnitude at least two and position correction $q(t)-q(s)\in[0,1/2)$, again leaving range above one. Thus there is exactly one possible small-range partner per receiver, with the mirrored statement for the other sublattice.

This census is geometric and covers the infinite lattice. In particular, all nonpartner emissions satisfy $s\le t-1$.

## 3. A finite contact cannot precede the first turn or unit-speed event

Differentiate (2) at a regular reception:

$$
\delta'(t)=-\frac{p(t)+p(s)}{1-p(s)}<0.
$$

Combining this identity with (3), and using $0<p(t),p(s)<1$, gives the exact lower estimate

$$
A_{\rm pair}(t)
=\frac{g}{p(t)+p(s)}\left(\frac1\delta\right)'
\ge\frac g2\left(\frac1\delta\right)'.
\tag{4}
$$

Suppose, for contradiction, that a finite endpoint $T$ is approached with $q(t)\to1/2$ while $0<p(t)\le1$. Equation (2) and strict incoming subunit chords force $\delta(t)\to0$. Indeed, a positive limiting delay $\delta_*$ would imply

$$
q(T)-q(T-\delta_*)=\delta_*,
$$

contradicting the integral of the strictly subunit velocity over that positive-length interval.

The remaining acceleration is bounded in a left neighborhood of this prospective endpoint. All nonpartner emissions are at least one unit earlier, so their source speeds and accelerations have uniform bounds on a fixed earlier prefix, with a strict transmitter margin. Farther labels sample the same exponentially decaying ancient tail. The stationary field remains regular for receiver displacement near $1/2<1$; removing the one finite stationary partner row does not change that fact. Consequently write

$$
q''(t)=A_{\rm pair}(t)+R(t),\qquad |R(t)|\le C_T
$$

near $T$. Integrating (4) from a fixed $t_0<T$ yields

$$
p(t)\ge p(t_0)+\frac g2
\left[\frac1{\delta(t)}-\frac1{\delta(t_0)}\right]
-C_T(t-t_0).
\tag{5}
$$

The right side diverges as $t\uparrow T$, contradicting $p(t)\le1$. Thus a finite zero-range contact cannot occur before the first turn or unit-speed arrival, including as a simultaneous contact with a finite unit-speed trace. This does not prove that either speed one or a turn occurs in finite time; indefinite regular motion or an asymptotic limit remains a separate possibility until excluded.

The exclusion uses the attractive partner's exact received weight and delay variation. It does not assume an energy formula, a mass, or a positive sign for the complete nonpartner acceleration.

## 4. Tail and first-event proof requirements

For a comparison through a finite horizon $H$ in a uniform displacement ball $B<1/2$, every omitted label outside a cube of radius $N$ has emission

$$
s\le H-(N+1)+2B.
$$

If this upper bound is negative, all omitted corrections can use the accepted ancient bounds (1). A complete error estimate must retain both their leading exponential terms and the nonlinear $K a^2e^{2\lambda s}$ allowance. The stationary part retains its original block prescription. Treating the entire omitted population as exactly stationary would change the problem.

An actual first-speed certificate can use a stopped comparison: prove $p>0$ throughout, prove $p<1$ through a lower bracket, and show that a continuation remaining subunit through an upper bracket would have $p>1$ there. The last inequality is a contradiction argument, not an assertion that the unchanged law actually evolves to a superunit endpoint. Positive acceleration on the possible event band then certifies transversality. Every label reaches the event simultaneously in this exact symmetry family.

An actual turn certificate instead needs a continuous sign change of $p$ with unit speed excluded beforehand. A failed radius or error estimate alone establishes neither event. The contact barrier in §3 eliminates one finite competitor but does not supply the required signed acceleration or velocity enclosures.

## 5. Certified characteristic-root reference

The independently accepted positive root is now enclosed by

$$
2.795230690086810814283894
<\lambda<
2.795230690086810814283901.
\tag{6}
$$

The reference evaluates $f(x)=x-(16/3)S(x)$ with 192-bit integer interval arithmetic on the cube $\|d\|_\infty\le24$. Labels are grouped only by the exact integer $|d|^2$, with their exact multiplicities. Integer square roots enclose $\sqrt{|d|^2}$. Exponentials use power-of-two range reduction, the odd/even degree-31/32 alternating Taylor bounds for $e^{-u}$ on $0\le u\le1/8$, and outward integer squaring. Every arithmetic rounding is an explicit floor or ceiling.

The omitted characteristic sum is bounded by

$$
0\le\sum_{\|d\|_\infty>N}\frac{e^{-x|d|}}{|d|^2}
\le\frac{26e^{-x(N+1)}}{1-e^{-x}},\qquad N=24.
\tag{7}
$$

This follows from the exact cube-shell count $24k^2+2$ and $|d|\ge k$. At the left endpoint of (6), its upper bound is below $1.241\times10^{-29}$. The complete characteristic enclosure is negative at the left endpoint and positive at the right. Strict monotonicity of $f$, already proved in the frozen incoming-history assessment, makes (6) a certified root enclosure rather than a finite-lattice eigenvalue.

The reference first passed exact known controls: perfect and irrational integer square roots, $e^0=1$, exponential enclosures containing independently calculated Fraction Taylor bounds at $1/2,1,4,10$, and the cube-one census $6,12,8$. Only then was the characteristic target evaluated. A floating bisection supplied a trial neighborhood; it played no role in acceptance of the endpoint signs. The target covered 117,648 labels grouped into 1,056 squared radii and completed in 1.672 seconds as measured by its monotonic clock.

The frozen source is `.tmp/mec-008-staggered-first-event/independent/lambda-reference.py`, SHA-256 `2b1865184adf3fdf78249a20b46c090f7d67d4c157b35796c4538d87ef3301d5`. Its known and target receipts are retained separately. This reference must remain unchanged when later comparison subjects consume (6).

## 6. Evidence boundary

The independent reference for §§2–3 is the exact axial root equation and its reciprocal-delay derivative, with a complete nonpartner range census and the fixed-prefix exponential-tail argument. A missing range-below-one nonpartner, a sign error in (3), a failure of the identity (4), or an unbounded remainder under the stated stopped hypotheses would defeat the contact exclusion. Losing a strict hypothesis does not by itself prove a physical event.

The subsequent sections record subject review and the final event disposition. The initial contact and characteristic arguments alone do not certify a numerical trajectory: the fixed characteristic reference supplies only the growth exponent used to define the incoming branch.

## 7. Independent review of the scalar derivative and infinite tails

The [continuation subject](staggered-lattice-first-event.md), read after retaining the initial derivation, has the same contact exclusion and the correct regular continuation domain. Its error comparison retains the exact delayed linear operator instead of taking absolute values before the zero-history shell cancellation. This is necessary because the initial seed grows through many exponential time scales.

Here is an independent derivation of the scalar receiver sensitivity used in that comparison. For the vector row $K=n/(r^2D)$, let $P=I-nn^{\mathsf T}$, $v$ and $a$ be the source velocity and acceleration, and $D=1-n\cdot v$. Implicit differentiation of the source root gives $ds=-n\cdot dx/D$, followed by

$$
D_xK=\frac{P}{r^3D}
+\frac{Pv n^{\mathsf T}+nv^{\mathsf T}P-2nn^{\mathsf T}}{r^3D^2}
+\frac{|Pv|^2nn^{\mathsf T}}{r^3D^3}
-\frac{(n\cdot a)nn^{\mathsf T}}{r^2D^3}.
\tag{8}
$$

For an axial source put $v=\sigma v_s e_3$, $a=\sigma a_s e_3$, and write $n_3$ for the vertical direction cosine. The scalar projection of (8) simplifies to

$$
J_{33}=\frac{1-3n_3^2+2\sigma v_s n_3^3-r\sigma a_s n_3^3}{r^3(1-\sigma v_s n_3)^3}.
\tag{9}
$$

Indeed, the terms carrying $1-n_3^2$ combine using $D+\sigma v_sn_3=1$. Equation (9) is algebraically equal to the subject's equation (14), including the source-acceleration sign. The source-velocity sensitivity is $B_{33}=n_3^2/(r^2D^2)$. Subtraction of the zero-history row consequently gives exactly the subject's equation (16). In particular, both differences between the displaced source root and $t-|d|$ must be retained and bounded on the complete interval between those earlier times. This comparison is an acceleration-error inequality followed by two integrations; no assertion about a norm's classical second derivative is needed.

The receiver-derivative tail constants also have a direct independent bound. Write $H(R)=D_R(R/|R|^3)$. Along a source-displacement segment with range at least $r_*$, $\|DH\|\le24/r_*^4$. For $|v|\le1/2$ and $D\ge1/2$, factor the velocity part of $J-H(R)$ as

$$
H(R)\left[(D^{-1}-1)I+\frac{vn^{\mathsf T}}{D^2}\right]
+\frac{nv^{\mathsf T}P}{r^3D^2}\left(I+\frac{vn^{\mathsf T}}D\right).
$$

Since $\|H\|\le2/r^3$, its norm is at most $20|v|/r^3$: the coefficient is bounded by $2(2+4)+4(1+1)=20$. The remaining acceleration part is at most $8|a|/r^2$. Therefore the subject's pointwise bound

$$
|J-H_0|\le\frac{24|q(s)|}{r_*^4}
+\frac{20|q'(s)|}{r_*^3}
+\frac{8|q''(s)|}{r_*^2}
\tag{10}
$$

is valid under its stated tail hypotheses. Multiplication by the shell census $26m^2$, using $r_*\ge c_Nm$, and summing the two ancient exponential terms gives exactly coefficients $624,520,208$ in its equation (19). The acceleration tail follows independently from the static displacement bound $2|q(s)|/r_*^3$ and the transmitter bound $|q'(s)|/[r_*^2(1-w_{\rm tail})]$. No finite-population premise enters either estimate.

## 8. Arithmetic subject assessment

The new `interval_rows.py` subject evaluates factored changed rows, receiver derivatives, zero-history derivative differences and source-root shifts with outward binary64 intervals. Direct algebra agrees with (8): the changed row includes its polarity exactly once, and the radius differences are factored through source or receiver displacement with the correct signs. This avoids losing the small initial signal by subtracting nearly equal stationary rows.

The independently authored `row-reference.py` first passed exact static-Hessian, collinear uniform-motion and transverse controls. It then checked 36 exact rational moving-source configurations, including nonaxial Pythagorean ranges, against every returned subject factor. All exact values lay inside their subject intervals. A separate 600-term Fraction-series enclosure of the exponential at $-128,-64,64,128$ also lay inside the subject's exponential intervals. These are implementation checks against independent exact formulas, not an event certificate. The recorded subject hash is `14c68104c37570c3dc5520793f05a2d5aff63d09401d3898253049bf7d959822`; the frozen independent source hash is `d6beec51b09c0159a426ff995f19d2c850f56e6bb72f499cc53b962e9f5774f6`.

The interval caller must enclose every nonbinary rational input rather than treating its rounded conversion as exact, and must keep all divisors and roots in their declared regular domains. Target input coverage, full continuous residuals and propagated actual errors remain separate obligations. A failed scalar identity, a nonenclosing arithmetic conversion or a missing old-source error would defeat the corresponding certificate even if numerical trajectories agreed.

## 9. Continuous residual review and remaining event dependency

The archive subject reconstructs each quintic from the exact binary endpoint position, velocity and acceleration. Its outward polynomial enclosure establishes increasing position and velocity, so endpoint evaluation suffices for their interval hulls; separate interval tables retain acceleration and jerk ranges over every intersected cell. The frozen numerical convenience coefficients do not define the comparison polynomial.

The continuous residual subject evaluates the defect at a cell midpoint and bounds its change using the entire cell's derivative. Its signed linear cancellation and the two source-root shift signs agree with (8)–(9). The unchanged stationary polynomial coefficients, their finite-cube coefficient tails, the infinite high-degree stationary remainder and the exponentially old changing-source tail remain separate terms. This review accepts those formulas under their stated intervals, rather than identifying a finite correction cube with the physical population.

Two details require explicit treatment before a resulting event certificate is accepted. First, the comparison is only $C^1$ across time zero: its right acceleration is the stored endpoint value and its left acceleration is $\lambda_c^2a$. If a source-root bridge crosses zero, integrating the piecewise jerk misses this acceleration jump. Let

$$
J_0=|\bar q''(0+)-\bar q''(0-)|.
$$

The finite-cube derivative bound must then gain at most $g(26N)J_0$, because the omitted bridge term has coefficient $B_*\le|d|^{-2}$ and each sup-norm shell contributes at most $26$. Thus adding $g(26N)J_0\Delta t/2$ to each midpoint-transfer residual is a valid uniform repair. An exact rational enclosure of the one-sided jump and a separately retained correction receipt can supply this term without recomputing the finite rows.

Second, initial source intervals formed by plain floating endpoint subtraction need either explicit outward rounding or a certified displacement slack that exceeds that arithmetic error. Their subsequent Picard intersections are outward interval operations, but a later intersection cannot repair a root omitted by its starting interval. The current comparison is well inside its proposed displacement ball; that slack must nevertheless be recorded as a mathematical input. Both findings concern the proof enclosure, not evidence of a physical failure of the law.

The separate completion instrument now supplies both corrections without altering the raw calculation. It encloses the exact acceleration jump, adds the shell allowance above to every residual cell, and verifies the stronger comparison bound $q<31/128$. That bound leaves a delay-box margin greater than $1/64$, whereas the initial endpoint subtractions have error below $2^{-45}$. The corrected continuous residual is independently accepted for its stated comparison.

A separate known-first literal-label census confirms all 24,388 nonzero labels in the cube of radius fourteen and all 3,073 grouped rows. Each of its 346 squared-radius shells has exactly zero static-Hessian numerator and vertical second moment equal to one third of the trace. This establishes the finite-sum cancellation used in the derivative, including its exact multiplicities. The same audit checks all 597 corrected cells consecutively from zero to $1193/128$, verifies every rational jump addition, and authenticates their input hashes. The completed residual SHA-256 is `61c38be3db15f28b2adbab29b467e4ee3a29092967a2d3d3afc69f58b594e6a7`; the independent census reference is `308472f1b825b52b4d8df41396512029c4c349ad944dbd8fb8307f461dabb201`.

The continuous residual alone supplies no first-event verdict. Sections 10–13 complete the incoming-history discrepancy and delayed error propagation, including strictly positive velocity before the event and positive acceleration on its possible event band.

## 10. Independent review of the delayed error propagation

The scalar comparison subject uses the same full path interpolation as (8), with the receiver on a trial-position interval enlarged by an unknown error radius. Each source query uses the already certified earlier error table. The table retains cumulative position, velocity and acceleration maxima; the source-time assertion prevents a current step from reading its own unproved error. The finite-cube linear term uses complete cubic shell symmetry, while the nonlinear remainder keeps both shifted-root error terms in the subject's equation (16).

For a cell with receiver coefficient bounded by $L\ge0$ and all remaining acceleration errors bounded by $Q\ge0$, the comparison solves the scalar majorant equation $P''=LP+Q$ from the preceding nonnegative majorants. Positive power series for the hyperbolic kernels, with a geometric upper bound on their tails, give outward upper endpoints for $P$ and $P'$. A cell is accepted only if its new position bound is strictly smaller than the radius used to compute $L$ and $Q$. This is the usual first-exit argument for the twice-integrated vector error inequality. Positivity makes the endpoint majorants valid throughout that cell. It does not treat the scalar norm of the actual error as twice differentiable.

The incoming table must also enclose the discrepancy between the stored binary64 exponent $\lambda_c$ and the exact root. On the finite source interval $-64\le s\le0$, the parameter derivative gives

$$
\left|\partial_\gamma\left[\gamma^k a e^{\gamma s}\right]\right|
\le a\left(k\gamma^{k-1}+64\gamma^k\right)e^{\gamma s},
\qquad k=0,1,2,
\tag{11}
$$

with the first term taken as zero for $k=0$. The parameter interval used on the right must contain both $\lambda$ and $\lambda_c$. Adding (11) times $|\lambda-\lambda_c|$ to the nonlinear ancient allowance in (1), and retaining the time-zero comparison acceleration jump, encloses the complete incoming discrepancy. More remote labels use the separate infinite-tail estimate, not this finite interval assumption.

This review accepts the comparison formulas and their noncircular structure. The target review in Sections 12–13 checks the corrected residual, full contiguous cell coverage, each strict radius closure and actual event inequalities. A run with a modeled residual remains diagnostic regardless of how small its propagated errors appear.

## 11. Conditional applicability of the causal-root obstruction

The present complete past has infinitely many moving labels, so the earlier two-target experiment's finite affected census cannot be transferred. Nevertheless, the local obstruction lemmas can apply through their mathematical hypotheses. Suppose the new certificate establishes a first unit-speed time $t_*$, a displacement $q(t_*)<B<1/2$, and $q''(t_*)>0$. Every label then has $|\mathbf V_i(t_*)|=1$ and $\mathbf V_i(t_*)\cdot\mathbf A_i(t_*)=q''(t_*)>0$ by exact two-sublattice symmetry.

In a sufficiently short reception neighborhood, retain a uniform position ball with radius below $1/2$. Every distinct-label causal range has a fixed positive floor, so its source emission lies a fixed positive time before $t_*$. The exact earlier staggered history has a uniform speed margin on that prefix: a compact recent interval is strictly subunit, and the remote past decays exponentially. The changed-source tail and its receiver derivatives converge uniformly; the original stationary block field remains regular. Thus the total cross contribution is bounded and continuous through the prospective event even though infinitely many sources are moving.

Those facts supply the bounded cross remainder needed by the local self-root birth and weaker-continuation lemmas. Their conclusions follow by checking these new hypotheses, as completed in Section 14. They do not follow merely from the old pulse result, and no old numerical event bracket or population count is inherited.

## 12. Exact reconstruction of the first comparison pass

The new independent `majorant-reference.py` first passed an exact constant-acceleration case and a closed-form exponential case enclosed by a separate rational series. Its target then reconstructed all 597 positive majorant updates from exact Fractions, using a different Taylor recurrence and a geometric remainder. It authenticated the corrected residual, checked the incoming error against the exact characteristic interval and nonlinear ancient allowance, verified every strictly earlier source lookup and receiver-radius closure, and checked all position, velocity and acceleration error intervals against the archived node jets and continuous residual ranges.

**Accepted limited result.** Every update of the first comparison pass is valid. At time nine, the reusable cumulative error bounds are

$$
P_9<0.000898155914,\qquad
V_9<0.003812432911,\qquad
A_9<0.020319234921.
\tag{12}
$$

The original-law branch remains subunit throughout the consecutive prefix ending at $595/64$. The last auxiliary endpoint's lower velocity bound, however, is only about $0.99684$. Thus the pass does not force a first unit-speed event. This is an insufficiency of that estimate, not an actual turn, a global speed bound or evidence that the branch fails to reach wake speed.

The accepted error prefix through nine can be reused verbatim when refining only the later reception cells on the same immutable comparison curve. Such reuse must import only the cumulative acceleration bound available through nine, preserve the source histories and corrected earlier residuals, and recompute the suffix comparison from those endpoint bounds. No physical trajectory is redefined by this refinement.

The first comparison receipt SHA-256 is `5e59dda3ae98a2012eb567a0baefef62f7ca1a7fa8b03a3b7ec09387e29ed9d0`. The frozen independent majorant reference is `fcd76af20495d0c7d3d710fa3c00fe08c7f141136b3024745485f3aad22616eb`. The target receipt records `forced_crossing: false` explicitly.

## 13. Accepted first event on the exact unforced branch

The refined residual retains all 576 accepted cells through time nine and replaces the final segment by 82 cells of width $1/256$. The known-first independent suffix audit verifies exact coverage, unchanged prefix values, complete dependency hashes and every rational junction allowance. The refined residual SHA-256 is `fc190da5e2f9326b2ebc866c5aebce4e6a7d09ac20aef3b0f737fc3e5a21a9f4`.

The unchanged independent Fraction majorant reference then replays the complete refined comparison. All 658 receiver tubes close. The exact incoming errors, cumulative source bounds, strictly earlier source times, integrated majorant updates and candidate-node enclosures pass independently. This yields the first unit-speed time

$$
\boxed{\frac{1191}{128}<t_*\le\frac{1193}{128}}
\qquad\text{or}\qquad
9.3046875<t_*\le9.3203125.
\tag{13}
$$

The actual branch is subunit throughout the consecutive prefix ending at $1191/128$. Its velocity remains strictly positive through every possible event cell. Conversely, continuation of the auxiliary cross equation to the upper endpoint has the rigorous lower velocity bound

$$
q'_{\rm aux}(1193/128)
\ge\frac{73581979477047543}{72057594037927936}>1.0211550976>1.
\tag{14}
$$

The continuous auxiliary solution must therefore first reach one in (13). Before that first crossing, its complete history is subunit and contains no positive self root, so it is precisely the original-law solution. The bound does not assert a superunit full-law endpoint.

On every cell where this first crossing can occur,

$$
q''(t)\ge\frac{3361447112542015}{562949953421312}>5.9711295686.
\tag{15}
$$

Thus the event is transverse, meaning the speed reaches one with a strictly positive incoming rate of increase. Exact sublattice symmetry gives $|\mathbf V_i(t_*)|=1$ and $\mathbf V_i(t_*)\cdot\mathbf A_i(t_*)=q''(t_*)>0$ for every label simultaneously. No earlier turn occurs. The contact barrier and the strict receiver tube exclude earlier contact or loss of a regular cross root.

The event displacement and useful geometric margins are

$$
0.22072347008<q(t_*)<0.24555414858,
\qquad
\inf_{i\ne j}|\mathbf X_i(t)-\mathbf X_j(t)|>0.50889170284
\quad(0\le t\le t_*).
\tag{16}
$$

The upper position bound is checked from every continuous receiver cell; the lower event bound follows from the certified position at the lower event-bracket endpoint and positive actual velocity thereafter. For every retained cross-source chart the range exceeds $0.72948870528$, its transmitter denominator exceeds $0.92878733555$, and its source speed is below $0.06968279450$. Omitted rows have still larger ranges and the explicitly bounded ancient speeds. All used emissions are earlier than $8.59082380$, strictly before the guaranteed subunit prefix ends. These bounds exclude a hidden source-root obstruction as the cause of the event.

**Final event verdict: accepted, derived with independently enclosed computation.** The final comparison receipt is `actual-refined.json`, SHA-256 `1ef34ca861269c205b7f9e4d767d27c90e26df071fc8e30df5428e91a4ac05ca`. The independent target receipt `majorant-actual-refined-target.json` records the exact rational signs and the same bracket. The eigenvalue, incoming branch, source census, residual, tail and propagation references are distinct parts of the proof. Refinement agreement of numerical trajectories is not used as acceptance evidence.

The chosen amplitude $a=2^{-40}$ fixes the time origin of this exact ancient branch. The construction has no finite onset, external preparing pulse or reset. Its first-event time is stated for that phase convention; a time translation of the same ancient solution shifts the numerical clock. The result establishes this coherent infinite-population trajectory, not the behavior of every possible disturbance.

## 14. Consequence for unchanged-law continuation

The new event admits the local arguments of the already accepted [smooth root-birth obstruction](smooth-two-particle-next-event-root-birth.md), [continuous-velocity obstruction](smooth-two-particle-weaker-continuation.md) and [direct history-measure obstruction](smooth-two-particle-event-measure.md). This application needs a new infinite-population remainder argument and an explicit replacement for their remote-stationarity premise, because the present preparation moves infinitely many labels and is never exactly stationary.

Take a putative outgoing continuation whose positions remain in the uniform anchor neighborhood

$$
|\mathbf X_i(t)-i|\le\frac13
\quad\text{for every label and all sufficiently near outgoing times}.
\tag{17}
$$

The certified incoming population already lies strictly inside this neighborhood. Distinct labels then have causal range at least $1/3$. For receptions $t<t_*+1/6$, every cross-source emission satisfies $s<t_*-1/6$. This is an entirely fixed, smooth incoming prefix. Its source velocities have a uniform margin below one: the recent compact interval is strictly subunit and the remote ancient history tends exponentially to rest. The original stationary field is regular in the receiver ball, while the changed-source corrections and their derivatives have the same summable ancient tail. Consequently the full cross acceleration is bounded and continuous near the event, without any finite-support assumption on the population or a future velocity bound.

Remote stationarity enters the earlier local proofs only to exclude self roots emitted arbitrarily far in the past. Here boundedness proves that exclusion directly. Every incoming displacement is less than $0.24556$, so an outgoing receiver in (17) has distance from any earlier point on its own path below $1/3+0.24556<2/3$. A self delay greater than $2/3$ cannot equal that range. On the remaining compact old-source set bounded away from the event, the strict incoming chord inequality has a uniform negative margin; continuity preserves it at nearby receptions. Thus every possible emerging self root localizes to the event just as in the earlier proofs. No stationary interval is needed for this replacement argument.

At $t_*$ the own-root fiber is empty, since every positive-length incoming chord is strictly slower than wake speed. The incoming acceleration is finite and has positive projection on the unit velocity by (15). Together with the bounded cross remainder and the preceding root-localization argument, these are the local premises used by the referenced proofs. Their remaining reciprocal-delay and positive-measure arguments give the following scoped conclusions for the same unchanged law and complete past:

- A $C^3$ outgoing continuation is impossible.
- Continuous velocity with locally absolutely continuous velocity on every compact punctured outgoing interval cannot satisfy the literal acceleration equation almost everywhere. Unbounded or discontinuous acceleration alone does not evade this result. The everywhere twice-differentiable, pointwise-law corollary is excluded as well.
- No outgoing bounded-variation velocity can satisfy the direct positive-history measure balance when its strict positive-delay incidence measure has finite scalar mass over compact reception windows, is carried by the actual causal incidence set, and agrees with the canonical density on smooth-old-source charts pulled back along a Lipschitz receiver. The root-free event fiber supplies no impulse atom; the resulting continuous velocity trace leads to infinite positive self-contribution near the event, contradicting local finiteness.

These statements use the uniform position neighborhood (17). They do not assert that every coordinatewise continuation automatically remains in such a uniform neighborhood, or that every distributional or regulator-dependent prescription is the same direct history measure. Changing histories inside a singular limiting process, adding an event rule, or choosing a generalized acceleration distribution remains a different question. No such replacement law is adopted here.

Thus the earlier dependence on an externally supplied preparing pulse has been removed for this example: an exact unforced complete past reaches a finite, transverse causal event that has no continuation in the stated ordinary or direct locally finite measure classes. This is a finite-time continuation failure for a specific self-consistent family. It is not a proof of generic failure for every populated universe, spontaneous motion from an exactly stationary finite-time state, or irreversible growth under every conceivable extension rule.
