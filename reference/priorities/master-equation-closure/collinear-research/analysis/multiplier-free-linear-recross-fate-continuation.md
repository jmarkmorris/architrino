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

The numerical result refutes the proposed immediate outer-turn witness for the larger trace at the second upward birth. It does not establish eventual turning, perpetual inward motion, event accumulation, or a unique fate for the selected law. The concrete next numerical boundary is the second downward birth with four inherited negative self roots. A complete independent root census or receiver-time integral disagreeing with the recorded ledger or velocities would overturn these numerical findings. A global conclusion additionally needs control over future branch choices and all future source-clock events.

The receipts and centered trajectory arrays are retained under `.local-data/collinear-research/linear-recross-fate/`, with the original input identity and explicit witness selection. The new subject and this analysis are the only durable authored targets of this numerical assignment; older subjects and independent oracles remain unchanged.

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

The receiver/startup refinement gives third upward time 16.16908621247332 and centered minimum $-8.2416769110037\times10^{-8}$ at $h=8192$, tolerance $10^{-11}$, and initial downward source cutoff $3\times10^{-10}$. Its second younger fold excess speed is 0.000157440257866. The incoming $h=4096$ counterpart gives time 16.169086215153303 and centered minimum $-8.2416781088910\times10^{-8}$, with second younger fold excess speed 0.000157440266047. The second downward startup cutoff remains $10^{-12}$; its separate cutoff refinement is not part of this matrix. Exact-history and infinite-event conclusions remain outside these measurements.

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
