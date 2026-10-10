# Primary hexagon feedback: scalar domain and first preparation arrival

## Checkpoint and scope

**Derived checkpoint, pending independent review.** The primary prepared hexagon has the exact delayed scalar system below. A separate comparison proves that its actual solution reaches its first moving-preparation arrival, then continues for a further dimensionless interval $1/100$ with complete ordinary roots. This is progress toward post-release feedback, not its completion: no reached $S=0$ event or $S>0$ interval is asserted in this checkpoint.

The selected cell is $K=1$, $R=10$, numerical $c_f=1$, $g=K/R=1/10$, and $\beta=1/4$. Use $\tau=T/R$ and $s=S/R$. The complete phase preparation is $p(s)=0$ for $s\le-1/4$ and $p(s)=\beta s(1+4s)^3$ for $-1/4\le s\le0$. After release let the unknown actual common phase be $\Phi(\tau)$, with $u=\Phi'$, $\Phi(0)=0$ and $u(0)=1/4$. All six persistent labels have angles $\Phi+i\pi/3$ and polarities $(-1)^i$. Normal support is the only selected addition to the canonical Master Equation. The prehistory is prepared input, not an all-time solution.

The retained dispatch `b34624c5-ec66-45b1-a309-a568b9a09957` was received with exit zero, `payloadVerified=true`, a complete 5,370-byte assignment and separately reported `transportVerified=false`. All six listed source hashes matched before this file was authored, including the plan hash `83fb5745b2b04505621e32186aaac372a75cdc9bf3e195eb72f5c6a725c744a8` and canonical Master Equation hash `a3fa7047b1347c8743d385a12e38c9994dc1d25dcf63037a53a727670db95267`. Exploration stops October 10 at 22:52:29 UTC; hard closeout is October 11 at 00:52:29 UTC. Prior subjects remain frozen. No other worker's new feedback findings were read.

## Exact delayed scalar reduction

Let $P(s)$ denote the complete phase, equal to $p(s)$ before release and the already generated $\Phi(s)$ thereafter. At receiver time $\tau$, partner $k=1,\ldots,5$ has emission $s_k<\tau$, angular offset and distance

$$
\Delta_k=\frac{k\pi}{3}+P(s_k)-\Phi(\tau),\qquad
d_k=\sqrt{2-2\cos\Delta_k},\qquad \tau-s_k=d_k.
$$

The dimensionless transmitter and receiver derivatives are

$$
D_{t,k}=1+P'(s_k)\frac{\sin\Delta_k}{d_k},\qquad
D_{r,k}=1+u(\tau)\frac{\sin\Delta_k}{d_k},\qquad
s_k'=\frac{D_{r,k}}{D_{t,k}}.
$$

On an ordinary root chart the exact scalar tangent and radial accelerations are

$$
F(\tau)=-\sum_{k=1}^5\frac{(-1)^k\sin\Delta_k}{d_k^3|D_{t,k}|},\qquad
N(\tau)=\sum_{k=1}^5\frac{(-1)^k}{2d_k|D_{t,k}|}.
$$

Then

$$
\Phi''=gF,\qquad \ell:=R\lambda=-u^2-gN,\qquad \lambda=\ell/10.
$$

The radial numerator uses $\mathbf n\cdot\widehat{\mathbf r}=d/2$ on the unit sphere; the tangent numerator is $-\sin\Delta/d$. The transmitter weight is retained, and no receiver denominator is inserted. These formulas do not assume equal emission times for different labels. Their polarities and all five individual roots are retained.

The formulas shown are for a sub-wake domain where the proof below excludes positive-delay self roots. Outside that domain, this five-root reduction cannot be assumed complete. On a chart with $0<\Delta_k<2\pi$, putting $x_k=\Delta_k/2$ gives the equivalent factors $d_k=2\sin x_k$ and $D_{t,k}=1+P'(s_k)\cos x_k$. The sine/cosine formulas above avoid assigning an artificial half-angle branch outside that chart.

Equatorial reflection preserves the plane, and rotation by $\pi/3$ with label permutation/global polarity reversal preserves the complete prepared histories and every polarity product. Local uniqueness therefore preserves the common phase and equal signed speed. This is actual symmetry reduction, not prescribed future uniform rotation. Simultaneous distinct-member distances remain at least one in units of $R$.

## Complete-root continuation criterion

Suppose the complete history through the current event has $|P'|\le M<1$. For a fixed reception event, the delay residual $r-|\mathbf x_i(\tau)-\mathbf x_j(\tau-r)|$ increases with lower Lipschitz slope $1-M$. Each partner has precisely one root in $(0,2]$, and a self chord is shorter than its positive delay, excluding all positive-delay self roots. Present separation at least one and source path length at most $Mr$ give

$$
\frac1{1+M}\le r_k\le2,\qquad
1-M\le D_{t,k},D_{r,k}\le1+M.
$$

In particular emission times increase and $|D_t|=D_t$ throughout this domain. Bounds on the kernel are

$$
|F|\le\frac{5(1+M)^2}{1-M},\qquad
|N|\le\frac{5(1+M)}{2(1-M)}.
$$

A compact strict speed margin, complete known history, and locally Lipschitz source position/velocity provide an ordinary method-of-steps continuation: step length below the positive minimum delay uses only previously generated source values, implicit roots remain unique, and the constrained equation is locally Lipschitz. The preparation is $C^1$ through release and piecewise smoother; an acceleration mismatch at release does not insert an impulse into a kernel reading only position and velocity. At source joins, one uses the appropriate one-sided regularity and retains the same unique root.

Loss of these sufficient bounds is an unresolved enclosure or chart boundary, not a physical failure. A speed crossing cannot license discarding roots. This criterion identifies what the later feedback proof must preserve.

## Reaching the first preparation arrival analytically

Before the first source crosses $s=-1/4$, the old-source field is

$$
f(\Phi)=-\frac14\sum_{k=1}^5\frac{(-1)^k\cos(a_k-\Phi/2)}{\sin^2(a_k-\Phi/2)},\qquad a_k=k\pi/6.
$$

We establish $0<f(\Phi)<(33/4)\Phi$ on $0<\Phi\le1/4$. Define $H(x)=\cos x/\sin^2x$ and $J(x)=-H'(x)=2\csc^3x-\csc x$. Its second derivative is

$$
J''(x)=24\csc^5x-20\csc^3x+\csc x>0
$$

because its positive-denominator numerator is $24-20\sin^2x+\sin^4x\ge5$. The five shifted half-angles are equally spaced. Strict midpoint convexity, applied to $J_1,J_2,J_3$ and $J_3,J_4,J_5$, gives

$$
f'(\Phi)=\frac18(J_1-J_2+J_3-J_4+J_5)>0.
$$

Since $f(0)=0$, this proves positivity without extrapolating a local Taylor approximation.

For the upper bound put $h=\Phi/2\le1/8$. Pair reflected sites to obtain

$$
4f=H(\pi/6-h)-H(\pi/6+h)
-H(\pi/3-h)+H(\pi/3+h)+\frac{\sin h}{\cos^2h}.
$$

The middle pair is negative. On the nearest-pair interval, $\sin x\ge\sin(\pi/6-1/8)\ge99/256$ using $\cos(1/8)\ge127/128$ and $\sqrt3/2<7/8$. The function $2/s^3-1/s$ decreases for $0<s\le1$, and direct rational substitution at $s=99/256$ gives $J<32$. Thus the nearest-pair difference is at most $32\Phi$. Also $\sin h/\cos^2h\le h(128/127)^2<(33/32)h$. Consequently $f<(8+33/256)\Phi<(33/4)\Phi$.

Construct the old-source scalar solution provisionally up to the first of $\Phi=1/4$, $\tau=3/4$ or its first arriving preparation. It has positive increasing $u$. The Volterra form and the preceding bound give, for the phase maximum $m$ through such a time,

$$
m\le\frac\tau4+\frac{33}{40}\frac{\tau^2}{2}m,
\qquad m\le\frac{240}{983}<\frac14\quad(\tau\le3/4).
$$

The auxiliary first integral, used only while sources are stationary, gives $u^2<1/16+(33/40)\Phi^2\le73/640<(7/20)^2$. The phase and speed cannot hit their provisional upper edges. Distances stay positive, and the ordinary equation cannot break down earlier within this compact domain.

The leading nearest opposite-polarity partner $k=1$ is uniquely closest to the old source positions for $0<\Phi<1/4$. Its distance is $d_1=2\sin(\pi/6-\Phi/2)<1$. The preparation margin $b=d_1-\tau-1/4$ starts positive and decreases strictly since $|d_1'|\le u<7/20$. If no arrival occurred by $\tau=3/4$, one would have $b<0$, a contradiction. Thus the actual first preparation event $\tau_B$ is reached, with

$$
\frac{67}{128}\le\tau_B<\frac34,\qquad
0<\Phi_B<\frac14,\qquad \frac14<u_B<\frac7{20}.
$$

The lower time bound follows from $d_1\ge99/128$ and $\tau_B=d_1-1/4$. All partner roots before this event remain stationary-source roots by construction. The complete prehistory speed is at most $1/4$, the new speed is below $7/20$, and the global root theorem closes the construction as actual motion. The directed arriving labels are $(i,i+1\bmod6)$, six symmetry-related events, one source per receiver. Unlike the meridional preparation, there is no two-source tie at a single receiver.

## A nonzero interval reading moving preparation

At $\tau_B$, every delay is at least $99/128$, every emission is at or before $-1/4$, and $u_B<7/20$. Bootstrap over $0\le\tau-\tau_B\le1/100$ with $|u|<1/2$, delays above $7/10$ and emissions below zero. Pre-release source speeds are at most $1/4$, so

$$
D_t\ge3/4,\qquad \frac25<s_k'<2.
$$

Emissions advance by less than $1/50$, remaining below $-23/100$. Delays decrease by less than $1/100$, remaining above $99/128-1/100>7/10$. The dimensionless canonical field magnitude is at most $5/[(7/10)^2(3/4)]=2000/147$, giving $|u'|\le200/147$. Hence speed changes by less than $2/147$, and

$$
u<\frac7{20}+\frac2{147}<\frac38<\frac12.
$$

The lower speed bound also remains positive. These strict bounds close the bootstrap. Source functions are known throughout because every $s_k<0$, so ordinary local uniqueness and bounded continuation give the entire stated interval. The full history is sub-wake, the five continued partner roots are complete, and no positive-delay self roots appear.

The leading root satisfies $s_1>-1/4$ immediately after the boundary because $s_1'>2/5$. The next nearest old source is the trailing nearest partner. Its distance gap is $2\sqrt3\sin(\Phi_B/2)>\Phi_B>67/512$, using $\Phi_B>\tau_B/4$ and $\sin x>2x/3$ for $0<x\le1/8$. This exceeds the possible emission advance $1/50$; the remaining old-source distances are larger still. Therefore exactly one partner root per receiver reads moving negative-time preparation on this interval, while the other four remain stationary. All six receivers retain equal speeds by full-history symmetry.

The signed support is retained exactly by $\ell=-u^2-gN$. A rigorous but non-sharp bound on the moving-preparation interval follows from $|N|<5/[2(7/10)(3/4)]=100/21$ and $|u|<1/2$:

$$
-\frac{61}{84}<\ell<\frac{10}{21},\qquad
-\frac{61}{840}<\lambda<\frac1{21}.
$$

Its sign on that whole interval is not decided by this bound. Before the boundary, the old-source identity $N'=-f/2$ gives the exact support $\ell=(1/10)C_0-1/16-(3/20)\int_0^\Phi f(a)\,da$, with $C_0=5/4-1/\sqrt3$, and bounds from $0<f<(33/4)\Phi$. This first integral is withdrawn as a governing premise once the first moving preparation arrives.

## Post-release feedback target and remaining dependency

At a root reaching $s=0$, the emission position is its release position. On a continued positive-phase chart $0<\Phi<\pi/3$, the leading source is the earliest possible class, and the event equation is

$$
\tau_F=2\sin\left(\frac\pi6-\frac{\Phi(\tau_F)}2\right).
$$

This is an event condition, not reached-event evidence. The current theorem ends at $\tau_B+1/100$ and keeps all emissions strictly negative. To reach $\tau_F$ and then obtain $s>0$, one must continue the exact delayed kernel above through the remaining preparation arrivals, preserving a strict history-speed bound and source/label margins, then use generated release segments for positive emissions. The coarse global kernel estimate alone is not yet a useful bound up to that event. That is the next analytical dependency; no physical obstruction or failure to reach feedback has been proved.

## Current EOM capability and provenance

Measured capability check: the inspected `NativeCoupledEvolutionRequest` in [CoupledEvolution.hpp](../../../../../src/eom/include/architrino/eom/CoupledEvolution.hpp), `snapshot_totals` and its candidate-segment construction calls in [CoupledEvolution.cpp](../../../../../src/eom/src/CoupledEvolution.cpp), and the [live evolution contract](../../../app-solver/contracts/evolution-contract-v1.md) supply canonical acceleration to retained segment construction without an exposed normal-support input in those inspected paths. The contract excludes a future constraint/guidance curve from the request. Thus this assigned normal-constrained evolution has no supported route in those inspected interfaces. This scoped capability limitation is not a physical conclusion, and no competing numerical solver is introduced.

No scientific instrument, numerical target, job, lease, source edit, production edit or regeneration was used. All calculations here are analytic. The frozen six-cell theorem supplied the initial local admission; the extended field/domain proof above is new and awaits independent adjudication. Falsifiers include a wrong transmitter factor or polarity projection, an incorrect convexity/upper-bound inequality, a missed root despite the complete-history speed bound, or failure of the stated history margin. This new dynamics-prefix file is the sole authored artifact. The coordinator receives this checkpoint for review while the next continuation estimate is developed; no campaign completion is asserted.
