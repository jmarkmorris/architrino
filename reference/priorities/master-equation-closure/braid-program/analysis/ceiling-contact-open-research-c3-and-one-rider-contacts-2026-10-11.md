# Release C3, and contacts in which only one member rides the ceiling (ceiling-contact open research, problem 4)

**The equation in this record is the field-speed ceiling variant, not the Master Equation.** It is an authorized research variation with the canonical equation retained as baseline; the frozen specification is the [existing definition](../../equation-variants/field-speed-ceiling/definition.md#12-the-ordinary-causal-root-ledger), Sections 1.2 to 1.4, with $K=c_f=c_a=1$, ordinary partner rows at their original weight, zero self acceleration and the inclusive response applied after summation. Nothing here adopts it, and nothing here selects a contact rule, event map, smoothing, softening or continuation. Where the specification stops determining the motion, the run stops and this record says so.

This record closes obligation 4 of the [contact study](ceiling-contact-two-hour-2026-10-06.md#10-validation-files-remaining-obligations-and-review-status) under the [launch brief](ceiling-contact-open-research-launch-brief.md): the study's analysis repeated for release C3, and for contacts in which only one member rides the ceiling. Lengths are in sizes of the configuration concerned unless stated; times in periods $P$ of its balance.

## 1. Results

**C3 reaches the same spiral as C1 (measured).** Release C3, a four-member mirror balance, ends in the [census](released-balances-under-field-speed-ceiling-2026-10-06.md) with members 0 (positive) and 3 (negative) a thousandth of the size apart. Continued below that threshold with the unchanged blind-reference integrator at three settings, the pair follows the closed-form spiral of the study's Section 7 as far as the runs go, $10^{-5}$ sizes: closing rate $0.980180$, delay ratio $1.290023$, transmitter factor $0.883232$ against the spiral's $0.980194$, $1.290061$, $0.883193$, with the differences falling in proportion to the separation; the separation and both delayed ranges decrease at every stored node; both members' pointing errors stay below $2.07\tau$ at reception and $2.16\tau$ at emission; the two third members' rows total $0.636$ and are read from stored history emitted before $0.541\,P$. Every entry hypothesis of the study's Theorem B holds at C3's frozen final node and at the end of the continuation, with the same constants (Section 3). C3 is therefore a second instance of the spiral ending, with a different balance, a different pair and two third members instead of one: the constants of the ending do not depend on the configuration.

**Only one member at the ceiling: what replaces Lemma 2 is a forced arrival at the ceiling (derived), and it is what happens (measured).** Lemma 2 of the study traps the pointing error of a member *at* the ceiling. A member below the ceiling receives the full row $1/(\tau^2(1-b))$ toward its partner's image, unprojected, and Section 4 proves that it cannot remain below the ceiling while the delayed range to its partner shrinks past an explicit scale: its velocity component toward the image would have to exceed its speed. So a one-rider contact must, before coincidence, either become a two-rider contact or stop at a degenerate root. Twelve of the sixty census contacts have one rider; ten of them have no axial velocity and can be run in the blind-reference integrator. In nine of those ten the free member is pulled to the ceiling between $9.6\times10^{-4}$ and $2.7\times10^{-4}$ sizes, below the census threshold, and the pair then converts into the two-rider spiral: transmitter factors that had fallen to between $4\times10^{-4}$ and $5\times10^{-8}$ on the free member's row recover to $0.88$, the delay ratios go to $1.29$, the closing rate to $0.98$ and the pointing errors to zero, down to $10^{-5}$ sizes. The tenth run (the planar six-member balance, first kick) stopped at both settings with the integrator's step collapsed while the free member's row had transmitter factor $3$ to $5\times10^{-8}$, at $1$ to $2\times10^{-3}$ sizes, before the free member reached the ceiling; whether that is a degenerate root, at which the specification stops, or a narrow positive minimum that this integrator could not pass, is not resolved by it. In all ten, from a hundredth of the size inward and until the free member arrives, the rider is aimed within $0.42^\circ$ of the free member's image.

**How a one-rider contact looks before it converts (measured).** The free member is slow, $0.11$ to $0.94$ at the threshold, and the rider runs at it nearly head-on: from a hundredth of the size inward the rider's velocity points within $0.03^\circ$ to $0.41^\circ$ of the free member's image, so the row the free member receives has its transmitter factor $1-\mathbf n\cdot\mathbf V_{\text{rider}}$ near zero and its delayed range many times the separation ($\tau/r$ from $28$ to $412$ over the ten runs: the arriving wake was emitted far back along the rider's nearly straight run). That row is enormous and pulls the free member to the ceiling within a fraction of the separation; once both ride, the geometry is no longer head-on, the transmitter factors recover, and the approach becomes the oblique spiral. The head-on geometry is the degenerate edge of the study's Section 5, and the one-rider contacts pass close to it: the smallest transmitter factor on the free member's row before conversion was $4\times10^{-4}$ in the two mildest cases, $1.6\times10^{-6}$ in one, and between $3\times10^{-8}$ and $1.2\times10^{-7}$ in the other six converted runs.

## 2. Release C3

**Case.** The third entry of `blind-ceiling.json` (frozen), identical to balance 2 of `results2/0060.json` of session 20261006: members 0 and 1 positive at radius $0.812835$ and heights $\pm0.617022$, members 2 and 3 negative in the mid-plane at radii $0.511856$ and $0.965500$, angular rate $0.871323$, period $7.211083$, size $0.965500$, speeds $(0.7082,0.7082,0.4460,0.8413)$. Member 3 reaches the ceiling at $0.45835\,P$ and member 0 at $0.71309\,P$; members 1 and 2 never do (largest speeds $0.7709$ and $0.8477$). Contact pair 0 and 3 at $0.72510\,P$ in the blind reproduction.

**Continuation below the threshold (new driver `ccor_run.py` around the frozen `ceiling_sim.py`; control first).** The exact ceiling circular pair for one period passed at every setting used (position deviation $4.9\times10^{-11}R$ at base, forward part $4.50946078$, inward part times $R$ equal to one to $3\times10^{-16}$, transmitter factor $1.67361203$). Then C3 with `contact=1e-5`:

| Setting | Nodes | Ends at ($P$) | Closing rate at $10^{-5}$ sizes | $\tau_0/r$, $\tau_3/r$ | $1-b_0$, $1-b_3$ | $\sin\psi/\tau$ at $10^{-5}$ | $r$ decreasing at every node |
| --- | --- | --- | --- | --- | --- | --- | --- |
| base | 28,930 | $0.7252360323$ | $0.980179$ | $1.290023$, $1.290023$ | $0.883232$, $0.883233$ | $1.669$, $1.669$ | yes |
| fine | 31,118 | $0.7252360318$ | $0.980176$ | $1.290023$, $1.290023$ | $0.883232$, $0.883233$ | $1.817$, $1.817$ | yes |
| finer | 35,252 | $0.7252360319$ | $0.980174$ | $1.290023$, $1.290023$ | $0.883232$, $0.883233$ | $1.922$, $1.922$ | yes |

Ladder of the base run (the others agree to five digits at every level):

| $r$ (sizes) | $-\dot r$ | $\tau_0/r$ | $1-b_0$ | $\sin\psi_0/\tau_0$ | third members' rows |
| --- | --- | --- | --- | --- | --- |
| $10^{-1}$ | $0.5273$ | $8.11$ | $0.165$ | $1.40$ | $0.584$ |
| $3.2\times10^{-2}$ | $0.8881$ | $1.699$ | $0.582$ | $2.00$ | $0.634$ |
| $10^{-2}$ | $0.95876$ | $1.30193$ | $0.87526$ | $2.037$ | $0.630$ |
| $10^{-3}$ | $0.97821$ | $1.28674$ | $0.88679$ | $1.989$ | $0.636$ |
| $10^{-4}$ | $0.97999$ | $1.28968$ | $0.88359$ | $1.973$ | $0.636$ |
| $10^{-5}$ | $0.98018$ | $1.29002$ | $0.88323$ | $1.669$ | $0.636$ |
| spiral | $0.980194$ | $1.290061$ | $0.883193$ | $1.98631$ | |

At $10^{-1}$ sizes member 0 has just reached the ceiling and the two arms are very unequal ($\tau/r$ of $8.1$ and $0.69$); by $10^{-2}$ sizes they are within $7\%$ and by $10^{-4}$ within $2\times10^{-5}$. The pointing error at the smallest levels scatters between $1.67$ and $1.92$ for the same reason as in C1: the explicit integrator is stability-limited there and bounds the lock without resolving it. The lock is resolved by the [implicit integrator](ceiling-contact-open-research-implicit-lock-integrator-2026-10-11.md) for C1; it was not run on C3.

**Entry hypotheses of Theorem B (new checker `ccor_entry.py`, generalizing the study's `ccth_entry.py` to any case and to several third members; Lemma 1's crude bound summed over third members).** At the frozen final node of the finest blind-reference trajectory ($r=9.9997\times10^{-4}$ sizes, $t_1=0.7251007\,P$): both members at speed one with forward parts $7.3\times10^{5}$; pair transmitter factors $0.88680$ and $0.88814$; delayed ranges $1.2423\times10^{-3}$ and $1.2411\times10^{-3}$ against $\bar\tau_M=2.30\times10^{-3}$ (crude $M=102.7$ from distances $1.258$ and $1.336$ and largest speeds $0.771$ and $0.848$ of members 1 and 2; measured third-member row $0.636$); pointing errors $1.9915\tau$ and $1.9918\tau$ at $t_1$, at most $2.064\tau$ on the look-back; delay ratio at most $1.2867$ on the theorem's look-back $[S',t_1]$ (and $1.648$ on the wider scan from $0.03$ sizes, which is still below the $1.95$ the theorem admits); $3\sqrt5\Lambda^2r_0=0.056$ at $\Lambda=1.95$; time bound $0.085$ against the causal window $0.315$; third-member emissions at $0.522$ to $0.540\,P$. All sixteen checks pass; they pass again at the end of the base continuation ($r=10^{-5}$ sizes) with delay ratio at most $1.29002$ on the look-back. Receipts `ccor-entry-C3-frozen-finest.json`, `ccor-entry-C3-base-c1e-05.json`.

**Two third members.** The direction to member 1 stands $76.5^\circ$ above the pair's plane of motion and that to member 2 $36.4^\circ$ (at $10^{-3}$ sizes; both nearly constant from $0.1$ sizes inward), so the pair's future rows on them would keep transmitter factors of at least $1-\cos76.5^\circ=0.77$ and $1-\cos36.4^\circ=0.19$; the rows actually received by members 1 and 2 from the pair during the approach have factors $0.634$ to $0.890$ and $1.313$ to $1.453$. The [in-plane record](ceiling-contact-open-research-in-plane-degenerate-roots-2026-10-11.md) treats what these margins mean.

## 3. Contacts with one rider

**Census.** Of the sixty contacts of the corrected census (three to ten members), forty-eight have both members at the ceiling and twelve have one. The smallest transmitter factor on any row in a run, $D_{\min}$, separates the two kinds: median $0.065$ over the two-rider contacts and $4\times10^{-5}$ over the one-rider contacts; the four smallest one-rider values, $0.9$ to $1.9\times10^{-8}$, are the four runs of planar balances, and the next is $1.6\times10^{-6}$ (measured from `census-cap-v2.json`). Two of the twelve are screw balances with axial velocity, which the blind-reference integrator does not accept (`screw m=2 P+ P+ P-` and `screw m=2 A+ P+ P+ P-`); they were not run. The other ten were rebuilt exactly as the census built them (balance from its results file, kick from `numpy.random.default_rng(seed)` scaled to $10^{-4}$) and run with the new driver `ccor_onemember.py` around the frozen `ceiling_sim.py`, in three enforced steps: the circular-pair control; a reproduction of the census ending at the census threshold ($10^{-3}$ of the largest radius), which had to give the same ending, pair and time to $10^{-3}\,P$; and the continuation with threshold $10^{-5}$ sizes. All ten reproductions passed (times within $1.3\times10^{-4}\,P$ of the census).

| Balance, kick | $N$ | Pair (rider, free) | Free member's speed at the census threshold | Free member reaches the ceiling at (sizes) | Smallest transmitter factor on the free member's row, and when ($P$) | Ending of the continuation |
| --- | --- | --- | --- | --- | --- | --- |
| planar m=1 P+P+P+P+P−P−, seed 1 | 6 | 1, 4 | $0.65$ | not reached | $4.7\times10^{-8}$ at $1.07909$ (base), $3.2\times10^{-8}$ at $1.07897$ (fine) | step collapsed at $1.0\times10^{-3}$ (base) and $2.0\times10^{-3}$ sizes (fine) |
| planar m=1 P+P+P+P+P−P−, seed 2 | 6 | 1, 4 | $0.94$ | $9.6\times10^{-4}$ | $4.7\times10^{-8}$ at $1.00797$ | two-rider spiral to $10^{-5}$ sizes |
| mirror m=2 M+M−P+, seed 1 | 10 | 2, 6 | $0.61$ | $3.3\times10^{-4}$ | $1.6\times10^{-6}$ at $1.03763$ | spiral |
| mirror m=2 M+M−P+, seed 2 | 10 | 3, 7 | $0.49$ | $5.3\times10^{-4}$ | $4.2\times10^{-4}$ at $1.03861$ | spiral |
| mirror m=4 P+P−AM+, seed 2 | 10 | 7, 0 | $0.60$ | $4.5\times10^{-4}$ | $4.3\times10^{-4}$ at $0.79125$ | spiral |
| planar m=3 P+P+P−A0+, seed 1 | 10 | 2, 6 | $0.18$ | $3.6\times10^{-4}$ | $7.1\times10^{-8}$ at $0.91898$ | spiral |
| planar m=3 P+P+P−A0+, seed 2 | 10 | 2, 6 | $0.44$ | $3.4\times10^{-4}$ | $3.0\times10^{-8}$ at $0.81508$ | spiral |
| mirror m=2 M+P+P−P−, seed 1 | 10 | 4, 8 | $0.34$ | $3.1\times10^{-4}$ | $1.2\times10^{-7}$ at $0.87640$ | spiral |
| mirror m=2 M+P+P−P−, seed 2 | 10 | 4, 8 | $0.32$ | $2.7\times10^{-4}$ | $8.5\times10^{-8}$ at $0.78845$ | spiral |

In every converted case the ladder below the arrival shows the two-rider signature: at $10^{-5}$ sizes the transmitter factors are $0.875$ to $0.891$, the delay ratios $1.286$ to $1.292$, the closing rates $0.976$ to $0.981$ and the pointing errors below $0.02^\circ$, with the other members' rows between $0.1$ and $2.4$ against pair rows above $10^{8}$. The free member's speed falls before it rises in several cases (to $0.11$ in the ten-member mirror case with the fourfold symmetry): the row first turns it around, then pulls it in. The time from the census threshold to the arrival at the ceiling is $4\times10^{-5}$ to $2\times10^{-4}\,P$.

**The stalled case.** For the planar six-member balance with the first kick, the frozen integrator's step fell below $10^{-13}\,P$ at both settings while the free member's row had transmitter factor $3$ to $5\times10^{-8}$ and the free member was at speed $0.65$ (base) and $0.11$ (fine) with the separation still $1$ to $2\times10^{-3}$ sizes. The second kick of the same balance passed a minimum of the same depth ($4.7\times10^{-8}$) and converted. The census reported $D_{\min}=9.7\times10^{-9}$ for the first kick and already noted that such spikes are sampled differently by different settings. The frozen integrator cannot say whether the factor reaches zero. A degenerate root is where the specification stops; a positive minimum of $10^{-8}$ is a row of size $10^{8}/\tau^2$ delivered over an emission interval the integrator cannot resolve. Resolving this needs a root solve and step control in emission time near the minimum, which no frozen instrument has; it is listed as remaining.

## 4. What replaces Lemma 2 for a member below the ceiling

**Lemma (forced arrival; derived).** Let member $j$ be below the ceiling, with speed $v_j\le1$, and receive from its partner $i$ an ordinary row $\mathbf e_j/(\tau_j^2(1-b_j))$ toward the partner's image, plus other rows of total size at most $M$. Write $a_j=\mathbf e_j\cdot\mathbf V_j$ for its velocity component toward the image. Then

$$
\frac{da_j}{dT}\ \ge\ \frac1{\tau_j^2(1-b_j)}-M-\frac{v_j}{\tau_j}\Bigl(\frac{2}{1-b_j}+1\Bigr)
$$

*Proof.* $da_j/dT=\mathbf e_j\cdot\dot{\mathbf V}_j+\mathbf V_j\cdot\dot{\mathbf e}_j$. The first term is the full row along $\mathbf e_j$ plus at least $-M$ (no projection below the ceiling). For the second, $\dot{\mathbf e}_j$ is the part of $(\mathbf V_i(S_j)\dot S_j-\mathbf V_j)/\tau_j$ perpendicular to $\mathbf e_j$, with $\dot S_j=(1+a_j)/(1-b_j)\le2/(1-b_j)$ and $\lVert\mathbf V_i\rVert\le1$, so $\lVert\dot{\mathbf e}_j\rVert\le(2/(1-b_j)+1)/\tau_j$ and $\lvert\mathbf V_j\cdot\dot{\mathbf e}_j\rvert\le v_j\lVert\dot{\mathbf e}_j\rVert$. $\square$

**Corollary (derived).** Since $1-b_j\le2$ and $a_j\le v_j\le1$, on any interval of length $\tau_j(T_0)/4$ starting at $T_0$ on which the row stays ordinary and the member stays below the ceiling, $\tau_j$ stays within $[\tau_j(T_0)/2,3\tau_j(T_0)/2]$ (speeds at most one), so $a_j$ increases by at least $\frac{\tau_j(T_0)}4\bigl[\frac{1}{2(1.5\tau_j(T_0))^2}-M-\frac{3}{0.5\tau_j(T_0)}\bigr]=\frac1{18\tau_j(T_0)}-\frac{M\tau_j(T_0)}4-\frac32$. This exceeds $2$, the largest possible increase of a component of a vector in the unit ball, once $\tau_j(T_0)<\tau_c$ where $\tau_c$ solves $1/(18\tau_c)-M\tau_c/4=7/2$; for $M\le10$, $\tau_c>0.0155$. Hence a member below the ceiling whose delayed range to an ordinary partner row falls below $\tau_c$ reaches the ceiling, or its row degenerates, or the delayed range stops falling, within a time $\tau_c/4$. The approach to coincidence passes through every scale, so no one-rider contact can reach coincidence as a one-rider contact: it converts or it stops. The constant is crude: in the ten runs the conversion happened at delayed ranges of $3\times10^{-4}$ to $10^{-3}$ sizes, that is $4\times10^{-4}$ to $10^{-2}$ in absolute units, inside $\tau_c$ for every case.

Once both ride, Lemmas 2 to 5 and Theorems A and B of the study apply as written, with Lemma 1 summed over third members; the entry into their hypotheses is then a measured question, answered for C3 above and visible in the ladders of the converted one-rider runs. What the lemma does not give: which of the two outcomes, conversion or degeneracy, a given contact takes. The head-on geometry that makes the free member's row large is the same geometry that drives its transmitter factor toward zero; the ten runs show both outcomes are reached.

## 4a. Continuation, 2026-10-20: the stalled one-rider contact resolved

On 2026-10-20 the operator asked for the stalled case of Section 3 to be resolved with a root solve and step control in emission time. That case is the planar six-member balance with kick seed 1.

**Result (measured, with a derived reparametrization).** The free member's row from the rider does not degenerate. Along the integrator's own emission-time variable, its transmitter factor passes a sampled minimum of $9.69\times10^{-10}$ at $1.078969\,P$. That is positive, so the root stays ordinary and the frozen specification continues to determine the motion. The row is large but finite: the free member's speed rises from $0.10$ to $0.28$ across that passage. Root solves at accepted nodes give a larger node minimum, $1.84\times10^{-8}$, because near a nearly degenerate root the causal function is almost flat in emission time and the solved emission time is poorly determined. The emission-time value is the one the integration uses. Two further close passages of the same row follow, at $1.079052$ to $1.079116\,P$ and at $1.079139$ to $1.079172\,P$. During the second, whose sampled minimum is about $10^{-8}$ and across which the free member's speed rises from $0.34$ to one, it reaches the ceiling at $1.079102\,P$, and from then on both members of the pair ride it. So this contact also converts, like the other nine. That conversion is not consistent with a degenerate root, which would have stopped the specification. Section 3's explanation of the stall, that the frozen integrator could not resolve a positive minimum near $10^{-8}$, is therefore confirmed.

**After conversion (measured).** The run reached its one-hour wall limit at $1.079176\,P$, with the pair $3.39\times10^{-4}$ sizes apart and the separation falling at every node since conversion. At that node the pair is not yet on the spiral. The free member's row still has transmitter factor $0.024$ and delayed range $6.9$ times the separation, the rider's row has $0.40$ and $1.31$, and the closing rate is $0.48$. In the other converted runs these quantities reached the spiral's values inside $10^{-4}$ sizes. Whether this one does was not followed.

**Instrument.** The new instrument, `ccor_spike.py`, integrates the frozen specification in reception time and switches, while any row's transmitter factor is below a threshold ($10^{-2}$ here), to that row's emission time as the independent variable. The reparametrization is exact, not a change of equation. With $g=D_t/D_r$, the system is $dT/dS=g$, $dX/dS=gV$, $dV/dS=gA^{\mathrm{eff}}$. The near-degenerate row's own term enters as $\sigma\mathbf n/(\tau^2D_r)$, which is bounded, and $D_t$ and $D_r$ are computed without cancellation as $\tfrac12\lvert\mathbf n-\mathbf V\rvert^2+\tfrac12(1-\lvert\mathbf V\rvert^2)$. It uses fourth-order Runge–Kutta with step doubling at tolerance $10^{-12}$, controls the error in reception time as well as in positions and velocities, lands on the ceiling by step bisection, and rebases time on entering emission-time stepping. Where the source was at the ceiling at both stored nodes bracketing an emission time, the interpolated source velocity is renormalized to unit speed. The specification makes a riding member's speed exactly one, and the interpolant's speed error, of order $10^{-9}$, would otherwise dominate a transmitter factor of that size. This is a choice of interpolation.

**Known cases, run in order before the target.**
- *K1:* exact circular pair for one period; deviation $1.0\times10^{-9}R$.
- *K2:* a prescribed unit-speed circular source and a free receiver at rest, set so the smallest transmitter factor is $10^{-3}$ and $10^{-4}$. The receiver's velocity after the spike agrees between pure reception-time stepping and the mixed scheme to $1.5\times10^{-9}$ and $7\times10^{-11}$.
- *K3:* the same at $10^{-6}$, $10^{-8}$ and $10^{-10}$. The velocity change converges as the minimum falls, with successive differences $1.1\times10^{-2}$, $4.4\times10^{-3}$, $4.4\times10^{-4}$, $4.4\times10^{-5}$. That is the square-root law expected of a bounded integrand in emission time. The causal identity's residual stayed at $3.4\times10^{-12}$.

**What failed first, recorded.**
- *Tolerance 1e-10:* K2 failed because each scheme alone still moved by up to $3.4\times10^{-7}$; the known cases and the target were set to $10^{-12}$.
- *Uncontrolled reception time:* the first form left the reception time out of the error control; the receipt's causal residual exposed that, and it was added.
- *First target attempt:* it stopped on a negative computed transmitter factor near $4\times10^{-9}$. The cause was the interpolated speed of the riding source exceeding one, which the renormalization above removed. That attempt's log is kept as `ccor-spike-target-attempt1-negative-Dt.log`.

**Limits.**
- *Sampled minimum:* the minima are values at the integrator's steps. The true minimum along the row lies between them and is not bounded below by this run. A positive minimum is inferred from two things. The motion is slightly out of plane: the rider's velocity has a vertical component of $1.7\times10^{-4}$, giving out-of-plane angles of order $10^{-4}$ and a floor of order $\beta^2/2\sim10^{-9}$ to $10^{-8}$. And the run continues. It is not proved.
- *Causal residual:* at accepted nodes in the target the residual reached $2.3\times10^{-8}$ relative, against $3.4\times10^{-12}$ in the known cases. The likely cause, inferred, is the renormalized velocity being slightly inconsistent with the cubic interpolant of the restart history's positions. It corresponds to an error of about $1.6\times10^{-8}$ in reception time on a delayed range near $0.7$.
- *Restart:* the restart reads the frozen blind-reference integrator's base trajectory up to $1.0785303\,P$, so the history before the spike is that integrator's.
- *Run size:* 3,407 accepted and 3,354 rejected steps, 1,992 of them in emission time.

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| The stalled contact's row stays ordinary through its minimum, sampled at about $10^{-9}$ in emission time, and the pair converts at $1.079102\,P$ | Measured; one new instrument of this model family after its known cases; minimum sampled | An emission-time integration that resolves the minimum and finds zero, or a different integrator in which the free member does not reach the ceiling; `ccor-spike-target.json` |
| The emission-time reparametrization is exact while $D_t>0$ | Derived | An algebra error in the identity $dT/dS=D_t/D_r$ |

Files: `ccor_spike.py`, receipts `ccor-spike-k1.json`, `ccor-spike-k2k3.json`, `ccor-spike-target.json`, `ccor-spike-target-ladder.json`, trajectory `ccor-spike-target-traj.npz`, logs. The target ran from 21:18:03 to 22:18:04 UTC on 2026-10-20, ending at its wall limit (times from the log). Review status: self-review only.

## 5. Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| C3 follows the spiral to $10^{-5}$ sizes with the same constants and strictly decreasing separation; its entry hypotheses hold | Measured; frozen blind-reference integrator at three settings, study's diagnostic unchanged, new checker | An integrator of the same specification outside this model family giving a non-monotone separation or constants drifting from the table; `ccor-C3-*.json`, `ccor-entry-C3-*.json` |
| The forced-arrival lemma and corollary | Derived | An ordinary one-rider history that stays below the ceiling with the delayed range falling through $\tau_c$ for longer than $\tau_c/4$ |
| Nine of ten runnable one-rider contacts convert to the two-rider spiral below the census threshold; the tenth stalls near a transmitter factor of $10^{-8}$ | Measured; one frozen integrator, one setting (two for the stalled case) | A run of the same specification by another integrator in which a converted case degenerates before conversion, or in which the stalled case converts or demonstrably degenerates; `ccor-onemember-*.json` |
| One-rider contacts pass close to the degenerate edge | Measured on ten runs and on the census $D_{\min}$ statistics (largest one-rider value $0.016$, on a screw balance that was not rerun) | A one-rider census contact with $D_{\min}$ above $0.1$ |
| The two screw cases with axial velocity | Not run | — |

## 6. Validation, files and review status

Commands, from `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, under the shared venv `../.venv/bin/python` relative to the repository root (numpy only):

```
python ccor_run.py C3 0,3 base 1e-5 900 0.71
python ccor_run.py C3 0,3 fine 1e-5 900 0.71
python ccor_run.py C3 0,3 finer 1e-5 900 0.71
python ccor_entry.py <frozen>/independent/C3-finest-traj.npz C3 0,3 C3-frozen-finest 0.71
python ccor_entry.py ccor-C3-base-c1e-05-traj.npz C3 0,3 C3-base-c1e-05 0.71
python ccor_onemember.py <balance file> <index> <seed> base 1e-5 1500 <tag>
```

The C3 runs took $21$ to $35$ seconds each; the one-rider runs $5$ to $25$ seconds each (two runs per case). Every run ended by its threshold or by the integrator's own stopping rule; none by wall time. Files: the three drivers, trajectories `ccor-C3-*-traj.npz` and `ccor-onemember-*-traj.npz`, receipts and logs. The frozen integrator and case files were imported unchanged (hashes recorded in each receipt). Review status: self-review only.
