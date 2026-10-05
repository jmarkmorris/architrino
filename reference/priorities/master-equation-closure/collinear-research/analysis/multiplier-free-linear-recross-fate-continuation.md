# Continuation after the small-family downward recross

## Scenario and question

This analysis continues the terminal-parameter small-family member $c_0=-0.03$ from the [upward-branch comparison](multiplier-free-linear-upward-branch-comparison.md). The selected multiplier-free delayed linear equation retains all positive-delay partner and self sources, their absolute transmitter Jacobians, and $c_f=1$. No receiver factor, cap, softening, impulse, root suppression, or arbitrary continuation selector is added. The question is what follows its downward $v=-1$ recross, including the earlier self-source minimum, and whether a subsequent event determines its fate.

Write $P(T)=T+x(T)$ and let $T_u$ denote the original upward birth, with $P_u=P(T_u)$. The small receiver excursion requires a centered clock $\delta=P-P_u$: subtracting the stored global position from time loses significant digits. The numerical subject reconstructs $\delta$ from the incoming source coordinate $q$ through the existing source polynomial and interpolates this centered quantity against receiver time, with derivative $1+v$. This interpolation is numerical evidence, not an exact enclosure of the released history.

## Derived charts

At the downward birth $T_d$, the left acceleration is $-B_d<0$. The newly available negative self source supplies the unique positive inward trace $b_d$ satisfying

$$
b_d=B_d+\frac{k}{B_d}+\frac{k}{\sqrt{B_db_d}}.
$$

For $q_d=T_d-S$ on the preceding ascending receiver clock, let $p_d(q_d)=1+v(T_d-q_d)>0$ and $u=-(1+v)>0$ on the new descending branch. The receiver equations are

$$
\frac{dT}{dq_d}=\frac{p_d}{u},\qquad \frac{du}{dq_d}=-\frac{p_d A}{u}.
$$

All three negative self sources are retained. Two approach the earlier minimum $P_u$ from opposite source sides. To approach their annihilation without evaluating their singular denominators at the fold, use $r=\sqrt{\delta}$. Then

$$
\frac{dT}{dr}=-\frac{2r}{u},\qquad \frac{du}{dr}=\frac{2rA}{u}.
$$

The pair acceleration has an integrable $1/r$ singularity. Its limiting numerator follows from the incoming curvature $B_L$ and the selected small outgoing trace $b_u$:

$$
-rA_{\rm pair}\longrightarrow k(T-T_u)\left(\frac1{\sqrt{2B_L}}+\frac1{\sqrt{2b_u}}\right).
$$

After the pair annihilates, the root ledger becomes one partner and one negative self source. Their acceleration is the unchanged older-source row $H(T,P)$. The regular descending equations are $\dot\delta=-u$, $\dot u=-H$. A new upward birth is a new continuation problem and cannot inherit the previous terminal parameter without a separate mathematical construction.

## Validation and current status

The new subject is `scripts/collinear-research/linear-recross-fate-continuation.py`. It imports the existing upward chart as source infrastructure; agreement with that chart is not independent root validation. Before any target run, its trace equation gave residual $1.11\times10^{-16}$ and its square-root-clock integrator reproduced an exact constant-acceleration solution with maximum endpoint error $6.35\times10^{-14}$. The receipt is retained under `.local-data/collinear-research/linear-recross-fate/known.json`. Finite target continuation and the declared source/startup refinement matrix are complete. No eventual-fate claim is made from these controls.

## Measured continuation and repeated source exposure

The centered subject run at incoming resolution $h=8192$, receiver tolerance $10^{-11}$, and downward source cutoff $q_d=3\times10^{-10}$ gives:

| Event | $T$ | $v$ | Centered clock $P-P_u$ |
| --- | ---: | ---: | ---: |
| Original sample-B downward birth | 16.16863799277284 | $-1$ | $3.9675876660613\times10^{-10}$ |
| Earlier self minimum pair annihilation | 16.16864146916219 | $-1.001108488742227$ | $0$ |
| New upward self birth | 16.16878722957892 | $-1$ | $-8.0787131707080\times10^{-8}$ |

The original downward trace is $b_d=8.15988303656$. Tightening receiver tolerance from $10^{-9}$ to $10^{-11}$ while reducing the cutoff from $10^{-9}$ to $3\times10^{-10}$ changes the fold inward excess speed by approximately $5\times10^{-14}$ and the next centered minimum by approximately $7\times10^{-18}$. Incoming resolution $h=4096$ gives fold time 16.16864147182063 and excess speed 0.001108488850221; its next upward birth is at 16.168787232244615 with centered minimum $-8.0787143594323\times10^{-8}$. These refinements measure numerical consistency for the retained incoming histories. They do not constitute an exact release-history enclosure or independent causal-root validation.

At the new upward birth the two surviving older rows have positive acceleration $H=7.60493594372$. Thus the original recrossing sample reaches another continuation boundary. A later branch is additional data: the original terminal parameter supplies no selector there. The subject also constructs a clearly labeled larger-trace witness at this new birth, without promoting that choice to the delayed law.

That witness re-admits the original minimum source pair at $T=16.16893371773163$, while $v=-0.998897011552701$. The self count increases from two to four. In the narrow interval between the original minimum $P_u$ and original recross maximum $P_d$, all four negative self roots remain active. Their negative acceleration causes another downward recross before the receiver reaches $P_d$:

$$
T_{d,2}=16.16893410527653,\qquad P(T_{d,2})-P_u=1.3616086593403\times10^{-10}.
$$

Its measured left acceleration is $-1470.36536537$. The original maximum remains above this receiver clock by $2.6059790067210\times10^{-10}$. Consequently, the larger-trace witness does not provide an outer-turn witness. Its next downward birth adds a fifth negative self root; further continuation must retain this new source and the previously re-admitted sources.

The minimum re-admission uses $P-P_u=r^2$ and the same finite product $rA$ stated above. At a source-clock maximum approached from below, use $P_d-P=r^2$. The corresponding pair coefficient is $k(T-T_d)[1/\sqrt{2B_d}+1/\sqrt{2b_d}]$. These coordinate changes regularize integrable source-fold contributions; they do not remove roots, alter their weights, or impose a physical continuation selector. At a downward receiver recross, using $w=1+v$ as the independent coordinate yields $dT/dw=1/A$ and $dP/dw=w/A$, avoiding numerical inverse-clock failure as $w\to0$.

## Evidence boundary and falsifiers

The numerical result refutes the proposed immediate outer-turn witness for the larger trace at the second upward birth. It does not establish eventual turning, perpetual inward motion, event accumulation, or a unique fate for the selected law. The complete finite witness reaches the third upward birth after its second downward birth and both subsequent pair annihilations; that renewed upward birth is the current continuation boundary. A complete independent root census or receiver-time integral disagreeing with the recorded ledger or velocities would overturn these numerical findings. A global conclusion additionally needs control over future branch choices and all future source-clock events.

The receipts and centered trajectory arrays are retained under `.local-data/collinear-research/linear-recross-fate/`, with the original input identity and explicit witness selection. The numerical subject, this analysis, and the upstream upward-branch serialization interface are the authored targets of this assignment; independent oracles remain unchanged.

## Continuing the second recross

The larger-trace witness was continued through its second downward birth with all five negative self sources. It returns through the original minimum at $T=16.168934492781634$, $v=-1.001103185401370$, where two sources annihilate. The remaining two younger self sources then approach the second upward minimum, centered at $\delta_2=-8.0787131710585\times10^{-8}$. With $r=\sqrt{\delta-\delta_2}$, their integrable coefficient is

$$
-rA_{\rm pair}\longrightarrow k(T-T_{u,2})\left(\frac1{\sqrt{2H_2}}+\frac1{\sqrt{2b_{u,2}}}\right),
$$

where $H_2$ is the incoming positive acceleration at that minimum and $b_{u,2}$ is the expressly selected larger trace. This second pair annihilates at $T=16.169065510821188$ with $v=-1.000157440258529$. The final old partner and self rows again restore $v=-1$ at a third upward birth:

$$
T_{u,3}=16.16908621247333,\qquad \delta_3=-8.2416769127284\times10^{-8},\qquad H_3=7.60521216442.
$$

These are measured values at receiver tolerance $10^{-9}$; the refined counterparts are recorded below. The nested event sequence is therefore not a numerical outer turn, and a third upward boundary requires its own admissible continuation family. A finite sequence of shrinking loops does not establish infinite event accumulation or perpetual trapping.

The later folded chart stores $\delta-\delta_2$ by its declared source coordinate, and its initial endpoint $\delta=0$ is imposed algebraically. Directly subtracting nearly equal clock values at that endpoint can produce a positive rounding residual and spuriously re-admit the just-annihilated original pair. Enforcing the chart domain $\delta\le0$ corrects that numerical representation; it is not a response cap or root exclusion within the physical ledger.

The receiver/startup refinement gives third upward time 16.16908621247332 and centered minimum $-8.2416769110037\times10^{-8}$ at $h=8192$, tolerance $10^{-11}$, and initial downward source cutoff $3\times10^{-10}$. Its second younger fold excess speed is 0.000157440257866. The incoming $h=4096$ counterpart gives time 16.169086215153303 and centered minimum $-8.2416781088910\times10^{-8}$, with second younger fold excess speed 0.000157440266047. The original matrix holds the second downward startup cutoff at $10^{-12}$; its separate refinement is recorded in the reconciliation section below. Exact-history and infinite-event conclusions remain outside these measurements.

Final first-loop output uses 4001 evenly spaced log-source samples across the downward-birth chart, 4001 source-square-root samples across the minimum-fold chart, and 1001 receiver-time samples across the smooth older-row segment. These are dense evaluations of the same accepted numerical trajectory, not reruns chosen to reproduce an audit. Scoped `py_compile`, `git diff --check`, and the known-controlled link and KaTeX checks pass for the new subject and this report. Independent receiver-time validation is coordinated separately and must retain its positive-cutoff and interpolation limits.

The complete finite witness ledger is:

| Boundary or interval | Partner roots | Negative self roots |
| --- | ---: | ---: |
| Immediately before original sample-B downward birth | 1 | 2 |
| Immediately after original sample-B downward birth | 1 | 3 |
| After original minimum annihilation | 1 | 1 |
| Larger-trace departure from second upward birth | 1 | 2 |
| Original minimum pair re-admitted | 1 | 4 |
| Immediately after second downward birth | 1 | 5 |
| Original minimum pair annihilated again | 1 | 3 |
| Younger minimum pair annihilated | 1 | 1 |
| Third upward birth, before a new branch is selected | 1 | 1 |

The numerical assignment stops at that third upward boundary. All finite profiles, input byte copies, source identities, and the final subject/report snapshot are retained in the `final-h8192` collection within the declared ignored evidence namespace. Further cycles are not used as a substitute for the separate global mathematical classification.

## Independent second-startup refinement and serialization

The second downward startup is separately parameterized by `--q2start`. At fixed incoming resolution $h=8192$, receiver tolerance $10^{-11}$, and first downward cutoff $3\times10^{-10}$, the new direct-source-coordinate runs compare $q_{d,2}=10^{-11},10^{-12},3\times10^{-13}$. Their preserved evidence belongs to the separate `reconciliation-r1` collection, leaving the earlier `final-h8192` collection unchanged.

The startup acceleration is evaluated with the already known source coordinate. For a newest negative self source at $S=T_d-q_d$, its row is exactly $-k(T-T_d+q_d)/p_d(q_d)$. Computing $q_d\mapsto\delta\mapsto S$ first adds an unnecessary inverse-clock conditioning error near the maximum, where the source slope tends to zero. An exact parabolic known case with $B_d=0.0376332747157$, peak clock $3.967587666\times10^{-10}$, and $q_d=10^{-9}$ measures a relative roundtrip source-coordinate error $4.12\times10^{-7}$ in double precision. The direct-coordinate row avoids this roundtrip. The known case was recorded before the revised target runs.

This representation correction changes the first fold excess speed from 0.001108488742227198 to 0.001108488742224282, only $2.92\times10^{-15}$. Consequently, it does not explain an earlier independent pre-fold integral residual of order $10^{-8}$ by itself. Attribution of that residual remains unresolved until the independent integral instrument compares the dense, segmented raw-velocity profiles and its receiver/source clock reconstruction. The known conditioning loss is real, but it must not be promoted into an unsupported causal explanation for the audit discrepancy.

The later witness audit export adds `w`, the raw numerical variable $1+v$, to avoid reconstructing a small clock slope by subtracting nearly equal numbers from stored $v$. Each source/logarithmic/square-root chart has 4001 dense samples, and the recross completion and smooth final segment each have 1001. The export also labels each segment and retains both endpoints at joins. The ordinary stored velocity remains available as `v`. This denser serialization evaluates the same trajectory and does not alter the accepted internal source history or tune it to the independent audit.

| Second downward source cutoff | Third upward $T$ | Third upward $P-P_u$ |
| --- | ---: | ---: |
| $10^{-11}$ | 16.16908621247332 | $-8.241676910961594\times10^{-8}$ |
| $10^{-12}$ | 16.16908621247332 | $-8.241676910962985\times10^{-8}$ |
| $3\times10^{-13}$ | 16.16908621247332 | $-8.241676910962214\times10^{-8}$ |

The terminal centered clock varies by approximately $1.4\times10^{-20}$ across this separately controlled startup matrix. This supports cutoff insensitivity for the finite retained-history witness; it is not an exact error bound or a release-history certificate. Completing an exact certificate still requires an independently controlled incoming-history enclosure, root/Jacobian interval bounds through each event, and a validated propagation estimate covering the declared continuation class.

## Initial upward history sampling

The upstream subject `scripts/collinear-research/linear-upward-branch-continuation.py` exports raw `wout` and centered `tauout` alongside its existing velocity and global time fields. Its accepted boundary-value, source-time evolution, and receiver-velocity recross charts are evaluated at 4001 and 16001 points per chart. These evaluations change serialization density only; the equations, solver tolerances, source history, and terminal parameter remain the same. The dense parabolic known control gives maximum raw-velocity error $7.77\times10^{-16}$ before target generation.

Both density runs retain the original downward event $T=16.16863799277284$, source coordinate $q=1.021618262682547\times10^{-5}$, evolution evaluation count 1511, and boundary-value mesh count 1120. Their separate receipts and profiles live in `linear-upward-branch-continuation/reconciliation-r1`. The downstream continuation consumes raw centered time and raw clock slope when present, preserving the earlier profile reader for provenance-bound inputs that lack those fields. The resulting source-interpolation comparison is separate from the second-startup cutoff matrix.

| Initial upward dense samples per chart | First fold inward excess speed | Third upward $P-P_u$ |
| --- | ---: | ---: |
| 4001 | 0.001108488742285277 | $-8.241676912368765\times10^{-8}$ |
| 16001 | 0.001108488742299647 | $-8.241676912583879\times10^{-8}$ |

This source-profile sampling comparison holds both startup cutoffs and receiver tolerance fixed. The fold excess speed differs by $1.44\times10^{-14}$ and the terminal centered clock by $2.15\times10^{-18}$. These are measured interpolation sensitivities of the numerical subject. Independent integration of the raw velocity against the sampled centered time is a separate instrument and is not replaced by these endpoint comparisons.

## Finer source sampling and a distinct collocation refinement

The accepted upstream trajectory is also serialized with 64001 samples per chart. A separate `--profile-samples` parameter selects 4001 or 16001 samples for each of the first downward logarithmic, source-fold, and smooth older-row charts. Varying this export parameter leaves the accepted trajectory and its event values unchanged, so an independent clock audit can identify an interpolation defect without conflating it with solver refinement. The 64001-source run gives first fold excess speed 0.001108488742303102 and third upward centered minimum $-8.241676912621963\times10^{-8}$.

The source diagnostic compares the derivative of the Hermite centered-clock interpolant with a PCHIP interpolant of the recorded raw velocity at source-cell midpoints. An exact parabolic control returns disagreement $8.54\times10^{-19}$ before target use. On the 64001-sample history, the measured maximum disagreement is $8.078\times10^{-13}$ at centered source time 0.002059561227892. This is a comparison of interpolants of one numerical trajectory, not an independent reference establishing which interpolant is correct.

Collocation tolerance is a separate numerical control. Tightening the initial small-family BVP tolerance from $10^{-9}$ to $10^{-11}$ with all physical data unchanged exhausts the original 5000-node limit after 42.5 seconds. Increasing the node limit to 20000 is a numerical resolution test; its result must be recorded separately from profile density. No failed solve supplies a tighter branch certificate. Cancellation of the older-row terms in the normalized small-trace chart is a candidate precision limitation, but a mesh-limit failure alone does not establish that attribution.

## Centered evaluation of the same older rows

The two older source rows are evaluated from fixed cubic source clocks. Let $C(s)$ be one such clock, with $C(s)=L$, positive derivative $D=C'(s)$, and row sign $\sigma=+1$ for the partner or $\sigma=-1$ for the negative self source. Its acceleration is $\sigma k(T-s)/D$. The older-row sum has the affine receiver-time form $R(T,L)=\alpha(L)T+\beta(L)$.

A centered arithmetic path computes the fixed-cell source inverses at $L=P_u$ with 80-digit arithmetic. It then evaluates the local row sum without adding tiny reception-time and clock increments to their global baselines:

$$
R(T_u+\tau,P_u+\delta)=H_0+\alpha_0\tau+(R_{L,0}+\alpha_{L,0}\tau)\delta+\frac12(R_{LL,0}+\alpha_{LL,0}\tau)\delta^2+\mathcal R_3.
$$

Here $H_0$ is the older-row acceleration at the original upward birth; each subscript-zero derivative is evaluated at that same baseline. The remaining term $\mathcal R_3$ is the Taylor remainder. Differentiating each simple source row gives

$$
A_L=\sigma k\left[-\frac1{D^2}-\frac{(T-s)C''}{D^3}\right],\qquad
A_{LL}=\sigma k\left[\frac{3C''}{D^4}-\frac{(T-s)C'''}{D^4}+\frac{3(T-s)(C'')^2}{D^5}\right].
$$

The normalized BVP uses relative deviations from its trace fixed point. Subtracting the analytically zero fixed-point row before dividing by its small velocity scale avoids subtracting two nearly equal global acceleration expressions. This is an arithmetic rearrangement of the selected equation, not a receiver modification or a new continuation rule. The incoming curvature $B_L$ remains separate from the older-row value $H_0$.

An exact linear-clock control gives older-row error $2.78\times10^{-17}$ before the centered target runs. The centered fixed-point control returns zero. A subsequent additional cubic-clock control checks the high-precision inverse against the closed inverse of $s+s^3=L$ and verifies the nonzero second derivative, with error $1.58\times10^{-81}$. The target comparison evaluates the quadratic expansion against full 80-digit cubic inverses at reception gaps 0, 0.0021, and 0.01 and clock increments $0,\pm3.801449625687\times10^{-10}$. Its sampled Taylor remainder is $4.05\times10^{-27}$. This measured comparison is not an interval bound on the remainder or a certificate for the exact released history.

| Older-row arithmetic | BVP tolerance | Node limit | Outcome |
| --- | ---: | ---: | --- |
| Global double expressions | $10^{-11}$ | 5000 | Mesh limit exceeded; 42.526 seconds |
| Global double expressions | $10^{-11}$ | 20000 | Mesh limit exceeded; 139.938 seconds |
| Centered fixed-cell expressions | $10^{-11}$ | 5000 | Passed with 4411 nodes; maximum normalized residual $9.9863\times10^{-12}$ |
| Centered fixed-cell expressions | $10^{-12}$ | 5000 | Mesh limit exceeded; 0.777 seconds |
| Centered fixed-cell expressions | $10^{-12}$ | 20000 | Passed with 9193 nodes; maximum normalized residual $9.99995\times10^{-13}$ |

The centered baseline is $H_0=7.6028901565357145$, compared with 7.60289015653571 from the global double row sum; $B_L=7.602902579068553$ is unchanged. Both successful centered runs retain the same original downward-event time and source coordinate at displayed precision. Their downstream first-loop fold excess speed is 0.001108488742303953, and the third upward centered minimum is approximately $-8.2416769126364\times10^{-8}$. The improvement establishes that the earlier BVP mesh-limit obstruction was removable by the declared arithmetic change. It does not, by itself, explain or eliminate the independent pre-fold integral residual.

The largest source-interpolation slope disagreement remains near centered source time 0.00205956, after the BVP terminal point near 0.00201000, inside the subsequent receiver evolution chart. The evolution retains scalar absolute tolerance $10^{-13}$ while its small clock slope is of order $10^{-7}$. This observation identifies a separate numerical refinement target; it does not attribute the entire audit residual to that tolerance without a controlled comparison.

## Separate upstream evolution tolerance comparison

The upstream receiver evolution tolerance is tightened from $10^{-11}$ to $10^{-13}$, with scalar absolute tolerance correspondingly reduced from $10^{-13}$ to $10^{-15}$. The fixed incoming history, terminal parameter $-0.03$, cutoff $q_0=10^{-5}$, logarithmic span 12, centered older-row arithmetic, BVP tolerance $10^{-12}$, and 64001 source samples per chart are held fixed. Downstream tolerance remains $10^{-11}$, with first startup $3\times10^{-10}$, second startup $10^{-12}$, and 16001 first-loop samples per chart. The exact linear and cubic inverse controls, fixed-point control, parabolic dense-velocity control, and original known event controls pass before the tighter-flow target. The downstream known controls likewise pass before consuming that target.

| Upstream evolution tolerance | Evolution evaluations | Original downward time | First-fold inward excess speed | Third upward centered minimum |
| --- | ---: | ---: | ---: | ---: |
| $10^{-11}$ | 1511 | 16.16863799277284 | 0.001108488742303952 | $-8.241676912636397\times10^{-8}$ |
| $10^{-13}$ | 4238 | 16.168637992772716 | 0.001108488742227363 | $-8.241676911509376\times10^{-8}$ |

Both runs have the same 9193-node BVP solution and maximum normalized collocation residual $9.99995\times10^{-13}$. The tighter upstream solve completes in 25.089 seconds. Its downstream ledger retains the same event sequence through the third upward birth: original-minimum re-admission, second downward birth, original-minimum annihilation, and younger-minimum annihilation. The larger trace after the second upward birth remains an explicit witness; this comparison supplies no physical branch selection or global fate.

The measured maximum Hermite-clock derivative versus PCHIP raw-slope discrepancy decreases from $8.07776\times10^{-13}$ to $3.44393\times10^{-13}$. Its location moves from centered source time 0.00205956 in the evolution chart to 0.00200981 near the BVP endpoint. The first-fold excess speed changes by $-7.66\times10^{-14}$ and the third minimum changes by $1.13\times10^{-17}$. These are sensitivities measured by the two numerical subject receipts, not independent error bounds. An independent segmented integral audit can falsify an inferred accuracy improvement if its residual fails to decrease; interpolation agreement alone cannot establish that improvement. The 64001-source/profile16001 independent audit of the preceding baseline, using `scripts/collinear-research/linear-recross-fate-conditioned-integral.py` and recorded in the [conditioned recross audit](multiplier-free-linear-conditioned-recross-audit.md), measured a first-fold clock residual of $-3.4669\times10^{-12}$ and older-fold window residuals $7.0395\times10^{-12}$ and $4.0545\times10^{-12}$, establishing that source sampling removed much of the earlier plateau while leaving a finite residual to assess.

The tighter raw upward profile, first-loop raw velocity profile, later witness raw velocity profile, receipts, retained input bytes, and generating subject snapshots are frozen separately under `.local-data/collinear-research/linear-recross-fate/reconciliation-r1/frozen-upstream-flow`. Earlier density and collocation freezes remain preserved. These numerical refinements concern the declared finite cubic history; an exact release certificate still requires the independent history, root/Jacobian, event, and propagation enclosures stated above.

The completed tighter-flow audit by `linear-recross-fate-conditioned-integral.py`, recorded in the [conditioned recross audit](multiplier-free-linear-conditioned-recross-audit.md), gives maximum raw-velocity clock mismatch $1.29450\times10^{-19}$, first pre-fold acceleration-integral residual $+1.21183\times10^{-11}$, and maximum later-window residual $4.40608\times10^{-12}$. The first residual changes sign and increases in magnitude relative to the preceding $-3.4669\times10^{-12}$ baseline. Thus tightening upstream evolution does not establish monotone integral convergence or certified accuracy. A discrepancy of order $10^{-11}$ remains in this sampled audit; the smaller clock mismatch and preserved event sequence do not remove it.
