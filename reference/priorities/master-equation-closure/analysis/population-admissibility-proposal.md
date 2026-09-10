# Population admissibility after the two accepted obstructions

## Result and disposition

A single summation choice cannot repair the reviewed population problem. The accepted signed-divergent history must be excluded or assigned a different update, and the accepted finite-modification sequence must cease to converge to the stationary history or cease to be admissible. Merely putting a stronger norm on the same set does not give the divergent history a finite acceleration.

This analysis supplies one explicit sufficient proposal that preserves the canonical acceleration row and the response to arbitrary finite source modifications. Outside a summable family of persistent source deviations, require position, velocity, acceleration of the input, and jerk to approach the stationary lattice in the distant past with an integrable envelope. Use the corresponding stronger position/velocity topology and the existing stationary eight-source summation reference. For the power envelope $(1+|s|/\ell)^{-p}$, the threshold is $p>1$. The existing polarity-correlated pulse control proves that $p\le1$ fails, including logarithmic accumulation at the endpoint. This threshold is sharp within the stated envelope family; there is no claim that this proposal is the smallest among all possible population theories.

Under the displayed assumptions, the proposed update is finite for every label and has a bounded relative history derivative, with uniform acceleration and derivative tails. The construction allows independent motion of infinitely many labels at recent times and arbitrary changes to finitely many complete source histories. It does not require environmental histories to remain prescribed after release. Its distant-past condition survives any finite smooth continuation with uniform derivative bounds. These statements establish compatibility of the tail condition with future evolution; they do not prove preservation of the entire regular history class or existence of a mutually evolving population.

The substantive choice is an asymptotically stationary lattice background, up to an absolutely summable population of persistent deviations, together with a stronger topology and a fixed stationary summation reference. None is adopted here. The [population class](population-history-class.md), [class adjudication](population-independent-adjudication.md), [summation subject](population-delayed-summation.md), [derivative subject](population-history-derivative.md), and their [summation](population-summation-independent-adjudication.md) and [derivative](population-derivative-independent-adjudication.md) adjudications remain fixed references. Shared strategy, queue, brainstorming, work log, and synthesis remain with the coordinator.

Claim grade: guessed for selection of this population assumption; derived for the sufficient estimates and limitations proved below, pending independent adjudication of this new analysis. No EOM invariant class, all-time solution, contact result, probability distribution, account, or boundary law follows.

## Three different changes

A topology specifies which perturbations count as small. A domain restriction specifies which histories receive an update. A summation prescription specifies how the infinite source list receives a value. These are different mathematical decisions even when one formula is used to describe two of them.

| Change | What it can address | What it cannot establish by itself |
| --- | --- | --- |
| Strengthen the history topology while retaining every history | The accepted finite-shell sequence need no longer approach stationary input. | The accepted signed-divergent history still has no finite limit under the existing complete-block prescription. |
| Restrict histories to those with finite complete-block sums, retaining the old norm | Removes undefined values from that domain. | The accepted finite-shell sequence lies entirely in this restricted domain and still proves discontinuity. |
| Change grouping while retaining the old domain and norm | May change which signed series converge. | Any rule preserving canonical finite source increments still inherits the accepted continuity obstruction. The signed-divergent example also defeats any common exhaustion with a convergent stationary baseline. |
| Restrict the domain and strengthen the topology as specified below | Gives a finite-valued, differentiable update with explicit tails and finite-modification consistency. | Does not establish that nature, an all-time EOM solution, or a future regular invariant class satisfies the added assumptions. |

The fourth row is a proposal, not a reinterpretation of the frozen class. In particular, a history with infinite value of the proposed norm is excluded from the proposed domain; it has not acquired a finite acceleration by being declared infinitely far away.

The finite-modification condition used here keeps the receiver history fixed. If two inputs differ only on a finite set $E$ of other source labels, their acceleration difference must be the finite sum of the changed complete canonical source contributions. Changing the receiver position generally changes infinitely many source rows and has a separate derivative. The accepted continuity adjudication already proves that no finite-modification-consistent continuous map can retain the old norm on all its admitted finite-shell witnesses. No new counterexample is needed for this necessity statement.

Claim grade: derived. Falsifier: a continuous map in the old norm satisfying the finite-increment identity on the accepted shell sequence, or a finite complete-block limit for the accepted signed-divergent history, would contradict the respective frozen lower bound.

## Fixed geometry and the proposed envelope

Use $c_f=1$ and release time zero. Keep labels $j\in\mathbb Z^3$, anchors $\mathbf z_j=\ell j$, charges $q_j=q_0\sigma_j$ with $\sigma_j=(-1)^{j_1+j_2+j_3}$, and $G=\kappa q_0^2>0$. The length $\ell=L/100$ is the frozen comparison scale. Write $\mathbf u_j(s)=\mathbf X_j(s)-\mathbf z_j$ for the displacement on the entire past $s\le0$.

Retain every original displacement, separation, regularity, complete-root, and complement requirement. In particular the common displacement bound is $B=4\ell$, the environmental bound is $\ell/16$, the root half-width is $w=\ell/256$, the transmitter floor is $1/4$, and there are at most $M_{\rm root}=2050$ positive-delay roots per channel. The exact zero-delay diagonal remains unresolved and receives no row. The uniform speed bound $4$ is retained; no global sub-field speed premise is introduced.

Choose one exponent $p>1$ and define

$$
a_p(s)=(1+|s|/\ell)^{-p},\qquad s\le0.
$$

The proposed additional admission condition is the existence of a nonnegative number $A$ and nonnegative label weights $b_j$ such that

$$
\sum_j b_j<\infty,\qquad
\sum_{m=0}^{3}\ell^{m-1}\|\mathbf u_j^{(m)}(s)\|
\le A a_p(s)+b_j
\quad\text{for every }j\text{ and }s\le0.
\tag{1}
$$

Here $\mathbf u^{(0)}=\mathbf u$, $\mathbf u^{(1)}$ is velocity, $\mathbf u^{(2)}$ is acceleration of the prescribed input, and $\mathbf u^{(3)}$ is jerk. The powers of $\ell$ make the four terms dimensionless in wake-speed units. Bounds and differentiability statements below concern a relative set with $A+\sum_j b_j\le M$ for a fixed finite budget $M$. The union over finite $M$ is the proposed domain; the constants of a local theorem depend on a common budget for the histories being compared.

The term $A a_p$ permits independent deviations across the entire lattice but makes their distant-past magnitude decay. The sequence $b_j$ permits persistent deviations, even arbitrarily far in the past, provided their total amplitude over labels is finite. It is a deterministic summability condition, not a charge weight, population density, probability, physical partition, or new acceleration factor. No actual row is multiplied by $a_p$ or $b_j$. Their only role is admission and estimates.

The persistent term is necessary if the proposal is to retain arbitrary finite source modifications. A purely temporal decay requirement would exclude, for example, one source with a bounded oscillatory complete past. Adding that source to the finite support of $b$ admits it whenever it obeys the original class requirements. Infinitely many persistent deviations of order one remain excluded. This is a substantive asymptotic restriction, not a deduction from the master equation.

For history differences $\mathbf h$, propose the position/velocity norm

$$
\|\mathbf h\|_{p,1}
=\inf\left\{A_h+\sum_j c_j:
\frac{\|\mathbf h_j(s)\|}{\ell}+\|\dot{\mathbf h}_j(s)\|
\le A_h a_p(s)+c_j\ \text{for all }j,s\le0,
\quad A_h,c_j\ge0\right\}.
\tag{2}
$$

The infimum is over envelopes, not over a physically distinguished decomposition of the histories. Addition of two admissible envelopes proves the triangle inequality; scaling proves homogeneity. Moreover

$$
\|\mathbf h\|_{\mathcal H}\le2\|\mathbf h\|_{p,1},
\tag{3}
$$

because each of the two separate suprema defining the old norm is at most any candidate envelope budget. This also proves definiteness. Thus smallness in (2) implies the old relative root-persistence estimates. Higher derivatives enter the admission condition (1), not the perturbation norm (2). The derivative theorem is relative to histories with a common bound (1); it does not assert an open set of $C^3$ histories in a $C^1$ norm or invoke a Banach-space existence theorem without proving its hypotheses.

## The stationary reference and the actual update

For a receiver at position $\mathbf x$ and a source sampled at $s=-r<0$, let $\mathbf n$ point from the emission position toward $\mathbf x$. The [canonical regular row](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) and complete source contribution are

$$
\mathbf a_{ijb}=G\sigma_i\sigma_j
\frac{\mathbf n_{ijb}}{r_{ijb}^2|D_{ijb}|},\qquad
D_{ijb}=1-\mathbf n_{ijb}\cdot\mathbf V_j(s_{ijb}),\qquad
\mathbf F_{ij}(X)=\sum_b\mathbf a_{ijb}.
\tag{4}
$$

Every positive root is included. Receiver playback is not an acceleration multiplier. Define the stationary comparison kernel $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$ and retain the diagnostic blocks $P_n=\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$.

Choose a finite core $C_i$ that is a union of whole blocks and contains every label whose anchor is within a fixed sufficiently large radius $R_*$ of $\mathbf z_i$. The radius is common to all receivers and is chosen below; the number of core labels is uniformly bounded by the lattice cube count. All labels in any block meeting that ball are included. In particular $i\in C_i$. For $\|\mathbf x-\mathbf z_i\|\le B$, define the stationary far reference

$$
\mathbf S_i(\mathbf x)
=\sum_{n:P_n\cap C_i=\varnothing}
G\sigma_i\sum_{j\in P_n}\sigma_j\mathbf K(\mathbf x-\mathbf z_j).
\tag{5}
$$

The core keeps every possible stationary comparison singularity out of (5). No fictitious stationary self row is inserted at a displaced receiver. The proposed acceleration is

$$
\mathcal A_i(X)
=\sum_{j\in C_i}\mathbf F_{ij}(X)
+\mathbf S_i(\mathbf X_i(0))
+\sum_{j\notin C_i}\left[
\mathbf F_{ij}(X)-G\sigma_i\sigma_j
\mathbf K(\mathbf X_i(0)-\mathbf z_j)\right].
\tag{6}
$$

The core is the actual complete finite ledger, including any positive-delay self roots. The last series is proved absolutely convergent below. Formula (6) therefore equals the limit of actual canonical sums over complete original blocks. It is not a subtraction of infinity: (5) has its own convergent complete-block definition, and the difference series is absolutely convergent. Enlarging or shrinking the finite whole-block core changes only finitely many terms and leaves (6) unchanged.

The existing threefold finite-difference proof applies also at a displaced receiver: for a distant block of center-to-receiver distance $R$, its stationary value is bounded by $C G\ell^3 R^{-5}$. Its first and second receiver derivatives are bounded by $C G\ell^3 R^{-6}$ and $C G\ell^3 R^{-7}$. To obtain these inequalities, apply three coordinate differences to $D^k\mathbf K$, use the integral over a cube of volume $\ell^3$, and use homogeneity $D^{k+3}\mathbf K=O(R^{-5-k})$. Each derivative is continuous on the unit sphere, giving a finite constant. The fixed displacement allowance changes only the common far cutoff and constants. Cubic counting then gives absolute convergence of (5) and its first two derivatives, uniformly in receivers and allowed positions.

The proposed ordering scope is consequently precise: arbitrary permutations of the original complete blocks are allowed, as are arbitrary permutations of the absolutely convergent difference terms. Arbitrary ordering of the original individual-source rows is still excluded by the stationary norm divergence. Another reference partition gives the same answer only if its stationary reference is independently proved equal; the difference term introduces no additional ambiguity. No equality between arbitrary stationary partitions is asserted.

## Why the admitted far rows are summable

Put $d=d_{ij}=\|\mathbf z_i-\mathbf z_j\|$. The unchanged bounded complete histories place every causal root in $[d-2B,d+2B]$ when $d>2B$. For $d\ge4B+2\ell$, every root has $r\ge d/2$, and every source evaluation in this entire window obeys

$$
\sum_{m=0}^{3}\ell^{m-1}\|\mathbf u_j^{(m)}(s)\|
\le E_{ij}:=2^p A(1+d/\ell)^{-p}+b_j.
\tag{7}
$$

The inequality uses the whole root window, not just the listed roots; this matters for uniqueness and shifted emission times. Slightly enlarging the window by a fixed fraction of $\ell$ changes only the constant $2^p$ to another constant depending on $p$. This enlarged version is used in relative Taylor estimates.

Choose $R_*$ large enough that the temporal part of (7) is at most $1/4$ for $d\ge R_*$. The label set

$$
E=\{j:b_j\ge1/4\}
\quad\text{satisfies}\quad |E|\le4\sum_j b_j\le4M.
\tag{8}
$$

Outside these finitely many exceptional labels and the geometric core, source speed is below $1/2$ throughout the possible root window. The causal residual has derivative at least $1/2$ there. Its signs at the window ends, together with the global exclusion outside the window, give exactly one cross root. This conclusion uses only slow distant emissions, not a global source-speed ceiling. Exceptional labels retain all their roots under the frozen multiplicity and transmitter bounds.

For a nonexceptional far source, put $\mathbf y=\mathbf X_i(0)-\mathbf z_j$ and $\mathbf R=\mathbf y-\mathbf u_j(s)$. Along their connecting segment the range is at least $d/2$. Since $\|D\mathbf K\|\le2/r^3$ and $D\ge1/2$,

$$
\left\|\mathbf F_{ij}(X)-G\sigma_i\sigma_j\mathbf K(\mathbf y)\right\|
\le G\left(\frac{32\|\mathbf u_j(s)\|}{d^3}
+\frac{8\|\mathbf V_j(s)\|}{d^2}\right)
\le\frac{40G E_{ij}}{d^2},\qquad d\ge\ell.
\tag{9}
$$

The first term compares the spatial kernels, and the second uses $|D^{-1}-1|\le2\|\mathbf V_j\|$. This is a comparison at the exact source-specific root. No equality of simultaneous spatial moments is assumed. For exceptional labels, the crude bound from at most $M_{\rm root}$ actual rows, $|D|\ge1/4$, and $r\ge d/2$ is $G(16M_{\rm root}+4)d^{-2}$. Since their $b_j\ge1/4$, this too is bounded by $C G E_{ij}d^{-2}$. Thus a single bound of the last form in (9), with a larger fixed constant, holds for every far source.

There are at most $C(R/\ell)^3$ anchors in a dyadic shell $R\le d<2R$, uniformly in receiver label. Consequently

$$
\sum_{d\ge R}\frac{(1+d/\ell)^{-p}}{d^2}
\le \frac{C_p}{\ell^2}(R/\ell)^{1-p},
\qquad
\sum_{d\ge R}\frac{b_j}{d^2}
\le\frac{1}{R^2}\sum_j b_j,
\tag{10}
$$

for $R\ge R_*$. The first inequality sums the geometric series with ratio $2^{1-p}<1$; the second does not require any spatial distribution of the persistent deviations. Combining (5), (9), and (10) proves a uniform tail for actual complete-block sums,

$$
\sup_i\|\text{acceleration tail beyond }R\|
\le\frac{CG}{\ell^2}
\left[M(R/\ell)^{1-p}+(1+M)(R/\ell)^{-2}\right].
\tag{11}
$$

Here a block-radius cutoff may be shifted by its fixed diameter without changing the estimate. The finite core has a uniform number of rows, each with the original positive-range and transmitter floors. Formula (6) therefore defines a bounded sequence of finite accelerations for all labels at release, not merely for the two distinguished targets.

Claim grade: derived under (1) and the original regular chart. Falsifiers: a root outside the complete distance window, failure of the exact comparison (9), or an admitted envelope violating the lattice and positive-series bounds (10). A numerically small cutoff sum is not a substitute for these infinite-tail estimates.

## The full derivative in the stronger topology

The derivative must include the source acceleration sampled through the moving emission time. At an actual root define $\mathbf q=\mathbf h_i(0)-\mathbf h_j(s)$, $\mathbf P=\mathbf I-\mathbf n\otimes\mathbf n$, and $\mathbf A_j^{\rm hist}=\ddot{\mathbf X}_j(s)$. The frozen finite-root chain rule is

$$
\delta s=-\frac{\mathbf n\cdot\mathbf q}{D},\qquad
\delta\mathbf R=\mathbf q-\mathbf V_j\delta s,\qquad
\delta r=-\delta s,\qquad
\delta\mathbf n=\frac{\mathbf P\delta\mathbf R}{r},
$$

$$
\delta D=-\mathbf V_j\cdot\delta\mathbf n
-\mathbf n\cdot\left(\dot{\mathbf h}_j(s)
+\mathbf A_j^{\rm hist}\delta s\right),
\qquad
\delta\mathbf a
=\frac{G\sigma_i\sigma_j}{r^2|D|}
\left[\delta\mathbf n-\mathbf n
\left(\frac{2\delta r}{r}+\frac{\delta D}{D}\right)\right].
\tag{12}
$$

The bold $\mathbf q$ is a displacement variation, distinct from a scalar charge. The source acceleration in (12) is why velocity decay alone is an incomplete receiver-sensitivity hypothesis. Condition (1) controls it at the same old emissions. Both signs of $D$ are retained in exceptional channels.

Let $\varepsilon=\|\mathbf h\|_{p,1}$. Choose an envelope in (2) with $A_h+\sum c_j\le2\varepsilon$, and put $H_{ij}=C_p A_h(1+d/\ell)^{-p}+c_j$. The complete root-persistence theorem applies when $2\varepsilon$ is below its old-norm threshold, by (3). Throughout a matched relative neighborhood, root shifts have size at most $C\ell\varepsilon$ and no root is created in the complete ordinary or normalized self complements.

For a nonexceptional far source, subtract the derivative of its stationary comparison row at the same receiver position. Equation (12) then gives

$$
\left\|D\left[\mathbf F_{ij}-G\sigma_i\sigma_j\mathbf K(\mathbf X_i(0)-\mathbf z_j)\right][\mathbf h]\right\|
\le\frac{CG}{d^2}\left(\varepsilon E_{ij}+H_{ij}\right).
\tag{13}
$$

The cancellation in this estimate is essential. In detail, $\delta\mathbf R=\mathbf h_i(0)+O(\ell H_{ij}+\ell\varepsilon E_{ij})$, while $\delta D=O(H_{ij}+\varepsilon E_{ij})$. The difference $D\mathbf K(\mathbf R)-D\mathbf K(\mathbf y)$ is $O(\ell E_{ij}d^{-4})$ by the spatial second derivative. The surviving term $D\mathbf K(\mathbf y)[\mathbf h_i(0)]$ is exactly the stationary comparison derivative that was subtracted. All remaining terms have the bound (13), using $d\ge\ell$ and a common envelope budget. Summing an ungrouped stationary receiver derivative would miss this cancellation and would not prove the asserted operator bound.

At an exceptional label the frozen finite-row estimate, the multiplicity bound, and $b_j\ge1/4$ absorb the unmatched stationary derivative into $C\varepsilon b_j/d^2$; direct source variations contribute $C H_{ij}/d^2$. Thus (13), with a larger constant, holds there too. The same dyadic and summable-label estimates as (10) prove operator-norm tail convergence, uniformly in receiver,

$$
\sup_i\|D\mathcal A_i\text{ tail beyond }R\|_{(p,1)\to\mathbb R^3}
\le\frac{CG}{\ell^2}
\left[(R/\ell)^{1-p}+(R/\ell)^{-2}+(R/\ell)^{-3}\right].
\tag{14}
$$

The constant depends on the common budget $M$ and original regularity bounds. The last power is the stationary complete-block receiver derivative. This is an operator bound on independent allowed source perturbations; no cell-moment-preserving tangent space has been substituted.

### A summable relative remainder

Termwise derivatives alone do not establish differentiability. The higher derivative envelope supplies the required uniform remainder. For two histories of budget at most $M$, there are $A_3,b_j^{(3)}$ with $A_3+\sum b_j^{(3)}\le2M$ and $\ell^2\|\mathbf h_j^{(3)}(s)\|\le A_3a_p(s)+b_j^{(3)}$. A backward difference quotient for $\dot{\mathbf h}$ of width $t=\ell\sqrt\varepsilon$, for $0<\varepsilon<1$, gives

$$
\ell\|\ddot{\mathbf h}_j(s)\|
\le
\left(\frac{2A_h}{\sqrt\varepsilon}+\frac{A_3\sqrt\varepsilon}{2}\right)a_p(s)
+\frac{2c_j}{\sqrt\varepsilon}
+\frac{b_j^{(3)}\sqrt\varepsilon}{2}.
\tag{15}
$$

All earlier intervals are available. Since $a_p$ decreases toward the past, every value on $[s-t,s]$ is bounded by the envelope at $s$. The temporal coefficient and the sum of the persistent coefficients in (15) are $O_M(\sqrt\varepsilon)$. Shifting to a source time within $C\ell\varepsilon$ of $s$ changes the temporal envelope by only a common factor for small $\varepsilon$.

The root-equation expansion gives $\Delta s=\delta s+O(\ell\varepsilon^2)$, with the frozen positive-range floors. The extra sampled-velocity error is bounded by $\sup\|\ddot{\mathbf h}_j\||\Delta s|$; (15) gives it an envelope of budget $O_M(\varepsilon^{3/2})$. The original source-velocity Taylor error is at most one half of the source jerk bound times $|\Delta s|^2$, and hence has envelope $O_M(\varepsilon^2)$. Direct products of perturbations have the same or smaller bounds because the old uniform norm is $O(\varepsilon)$.

For the far difference row, the remaining smooth spatial and reciprocal-transmitter factors preserve these envelopes with the factor $CG/d^2$. Pure receiver Taylor terms of the stationary kernel are removed with the stationary comparison; its whole-block sum has its own bounded second receiver derivative. One can see the necessary decay without presuming a cancellation: on the nonexceptional single-root chart the difference row vanishes identically as a function of receiver position when the source displacement and velocity vanish. Its receiver derivatives therefore contain at least one source deviation or source derivative, all controlled by (7). The finitely many exceptional labels instead use the frozen row remainder, with their count bounded by (8). Applying (10) to the resulting envelope proves

$$
\sup_i\|\mathcal A_i(X+h)-\mathcal A_i(X)-D\mathcal A_i(X)[h]\|
\le C\frac{G}{\ell^2}\varepsilon^{3/2}
=o(\varepsilon).
\tag{16}
$$

The core also has only uniformly finitely many regular rows and obeys the same relative bound by the frozen theorem. This proves a bounded relative derivative into the space of uniformly bounded acceleration sequences, with derivative obtained by the convergent series (12)–(14). The argument concerns matched roots on the relative domain with fixed budgets and relaxed common margins. It asserts neither differentiability across a fold nor preservation of exact saturated original constants.

Claim grade: derived under the declared envelope and regular-chart hypotheses. Falsifiers: violation of the moving-time formula (12), the stationary subtraction in (13), interpolation estimate (15), or an admitted difference sequence with remainder not $o(\|h\|_{p,1})$. The mathematical proof is the evidence; markup checks below cannot independently accept it.

## Tests against the accepted controls

### Stationary and common-time histories

The stationary lattice has $A=b_j=0$ in (1). Formula (6) becomes exactly the accepted complete-block sum. Its individual-source norm series still diverges, so this proposal does not recover arbitrary individual-source ordering. No assertion that the chosen stationary sum makes the lattice an EOM equilibrium is needed here.

The existing independent bump histories supported in $(-2\ell,-\ell)$ satisfy (1) with $b=0$ and finite $A$, since $a_p(s)\ge3^{-p}$ on their support. Infinitely many label vectors may be nonzero and chosen independently. Thus the domain does not reduce to a finite population or require only finitely many moving sources. The previously proved complete root census and slack of that control remain its admission evidence.

### The signed-divergent history is excluded, not regularized

At the exact emissions of the accepted cone pulse history, $\|\mathbf V_j(-d_j)\|=\nu>0$ on infinitely many cone labels. Condition (1) would require $\nu\le A(1+d_j/\ell)^{-p}+b_j$. For all sufficiently distant selected labels the first term is below $\nu/2$, so $b_j\ge\nu/2$ on infinitely many labels. This contradicts $\sum b_j<\infty$. The accepted history is therefore outside the proposed domain for every $\nu>0$. Its divergent canonical sum remains divergent.

### The exponent threshold is sharp in this proposal family

Retain the exact cone, source-dependent emission times, and pulse profile $\psi(t)=t(1-t^2)^4$ from the accepted summation proof, but use amplitudes

$$
\nu_j=\nu(1+d_j/\ell)^{-p},\qquad 0<\nu\le1/1024.
\tag{17}
$$

This is an analytical test using the existing control, not a new numerical population sweep. All previous admission inequalities hold because $\nu_j\le\nu$. On a pulse support $|s+d_j|\le\ell$, the envelope $a_p(s)$ and $(1+d_j/\ell)^{-p}$ differ by a bounded factor depending only on $p$. The four polynomial derivative bounds therefore give (1) with $b=0$ and finite $A$ for every fixed $p\ge0$.

The roots remain exactly $s_j=-d_j$ and the exact source correction remains

$$
\Delta\mathbf F_j
=\frac{G\nu_j\mathbf n_j}{d_j^2(1-\nu_j\sigma_j)},
\qquad
\mathbf e\cdot\Delta\mathbf F_j
\ge\frac{G\nu_j}{2(1+\nu)d_j^2}>0.
\tag{18}
$$

On the accepted complete-block boxes $Q_m$, there are $4m^3$ labels, all with $m\ell\le d_j\le\sqrt6m\ell$ and $\mathbf n_j\cdot\mathbf e\ge1/2$. Thus

$$
\sum_{j\in Q_m}\mathbf e\cdot\Delta\mathbf F_j
\ge\frac{G\nu}{3(1+\nu)\ell^2}
\,m(1+\sqrt6m)^{-p}.
\tag{19}
$$

For $p<1$ this grows with $m$. For $p=1$ it is bounded below by a positive constant on all $m\ge16$; summing the disjoint boxes $m=2^k$ diverges. The stationary block baseline has finite absolute sum, so neither case has a finite complete-block acceleration. For $p>1$, (10) proves convergence. Therefore decay merely tending to zero is insufficient, and the strict threshold $p>1$ is necessary and sufficient for these independent power-envelope controls. More generally, this mechanism tests summability of $\sum_k 2^k a(-2^k\ell)$; for monotone comparable envelopes it is the integrability of the velocity envelope over past age.

Even deleting the infinite divergent history does not rescue the endpoint topology $p=1$. Use only $K$ of the same disjoint boxes and replace $\nu$ in (17) by $\nu_0/K$, with fixed $0<\nu_0\le1/1024$. Each history then changes finitely many sources and has norm (2), evaluated at $p=1$, at most $192\nu_0/K$: the accepted position/velocity profile bounds sum to $96$, and the time-envelope comparison on the support costs at most a factor two. Since $m/(1+\sqrt6m)\ge1/3$ for $m\ge16$, (19) gives a positive acceleration increment of at least $G\nu_0/[9(1+\nu_0)\ell^2]$, independent of $K$. Thus the increments stay nonzero as that endpoint norm tends to zero. Differentiating the same finite increments at zero also gives unbounded derivative norms as the number of boxes grows. This explicitly tests both accepted obstruction mechanisms at the critical exponent without a new prescribed geometry or an exchange of infinite limits.

### Arbitrary finite source modifications retain their canonical increments

Let two admitted histories with the same receiver history differ on a finite set $E$ of other labels. Any such complete $C^3$ modification obeying the original uniform bounds can be included by increasing $b_j$ on $E$ by its finite complete-past jet bound. This covers persistent changes and shifts to arbitrarily old times, with no common temporal cutoff. The envelope budget may increase; it is not required to stay inside a preselected budget ball.

Every complete block outside a finite set has identical canonical rows in the two inputs. Absolute block convergence from (6) therefore gives exactly

$$
\mathcal A_i(Y)-\mathcal A_i(X)
=\sum_{j\in E}[\mathbf F_{ij}(Y)-\mathbf F_{ij}(X)].
\tag{20}
$$

Thus the repair has not reassigned the untouched population to cancel a local change. This conclusion would be false as a statement about changing the receiver itself; that variation is already included separately in (12)–(16).

### The accepted discontinuity sequence is retained but is no longer small

Retain the accepted shell histories $h=\theta_R h^R$, with $\theta_R=\ell/R$ and $R=2^m\ell$. Their old norm tends to zero and their finite acceleration increments stay nonzero. Each history is still admitted by the finite-modification argument. Write $r=R/\ell=2^m$. The label box $-3r/2\le j_1<-5r/4$, $0\le j_2,j_3<r/4$ has exactly $r^3/64$ labels for $m\ge2$. Their anchor distances lie between $5R/4$ and $\sqrt{19/8}R<2R$, and $|\mathbf n_j\cdot\mathbf e|\ge1/2$. At each selected root the velocity perturbation has magnitude at least $\theta_R/2$.

Every envelope in (2) therefore has $c_j\ge(\theta_R/2-A_h r^{-p})_+$ on these $r^3/64$ labels. If $A_h\ge\theta_R r^p/4$, its temporal budget already has that size. Otherwise its persistent budget is at least $\theta_R r^3/256$. Hence

$$
\|\theta_R h^R\|_{p,1}
\ge c_p\theta_R\min(r^p,r^3)
=c_p r^{\min(p,3)-1}\longrightarrow\infty
\qquad(p>1).
\tag{21}
$$

The original continuity counterexample is not denied. Its hypotheses about convergence in the old norm remain true, while convergence in (2) fails. A stronger topology retaining only the finite-modification sequence would still leave the signed-divergent infinite history untreated; its separate exclusion under (1) is required.

Claim grade: derived. Falsifiers: a finite envelope for the original constant-amplitude cone history, failure of the exact source correction (18), a finite value at $p=1$ despite the disjoint positive box increments, or a bounded proposed norm for the sequence in (21). These are exact analytical acceptance tests on existing controls, not empirical population estimates.

## Complete histories and mutually evolving environments

Every input still supplies the full past $(-\infty,0]$. A distant source still contributes at its true old emission; no wake, root, or source is dropped because of its age. The proposal constrains the magnitudes of deviations at old times, while (6) retains the infinite stationary part. It is therefore different from a finite-memory computation or a requirement that every source become exactly stationary before one common date.

The asymptotic condition alone is compatible with appending a future for every label. Suppose the histories are continued to $T\in[0,h]$ with uniformly bounded dimensionless derivatives through order three, with total bound $K_h$ on the new segment. Measured relative to reception cut $T$, the age envelope is $a_{p,T}(s)=(1+(T-s)/\ell)^{-p}$. For $s\le0$,

$$
a_p(s)\le(1+T/\ell)^p a_{p,T}(s).
\tag{22}
$$

For $0\le s\le T$, $a_{p,T}(s)\ge(1+T/\ell)^{-p}$. Thus the appended histories satisfy an envelope of the form (1) with the same persistent sequence and temporal budget at most $(A+K_h)(1+T/\ell)^p$. This argument permits independent new motion at every label; no environmental path is held fixed. It also shows that a finite translation of the time cut does not choose a unique absolute start date for the condition.

Equation (22) is preservation of a past-asymptotic property under a bounded continuation, not an EOM preservation theorem. The uniform acceleration and history estimates (11), (14), and (16) remove the two accepted release-time functional obstructions. A mutually evolving future must still satisfy all equations $\ddot{\mathbf X}_i=\mathcal A_i$ and preserve the original displacement, release/continuation separation requirements, complete roots, transmitter and complement margins, and uniform source regularity on a common interval. The target envelopes remain overlapping, and no future contact exclusion has been introduced by definition.

There is also an exact cut-compatibility issue. The original histories are prescribed inputs, not assumed to have solved the EOM. A globally $C^3$ extension through zero must satisfy

$$
\ddot{\mathbf X}_i(0^-)=\mathcal A_i(X)
\tag{23}
$$

and the corresponding third-derivative compatibility with the time derivative of that same update. These equalities are not implied by (1). Starting an EOM future without them generally gives a derivative mismatch at the cut and leaves the original globally $C^3$ history class. One must either prove compatibility for the chosen initial data or explicitly propose a different regularity domain; this analysis adopts neither shortcut.

Nothing here proves that a nonstationary, all-time mutually evolving population approaches the declared lattice background in the distant past. Such an existence result is a separate physical and mathematical test of this assumption. Conversely, an asymptotically stationary past is not an exactly stationary past on a finite interval, so finite-time uniqueness cannot by itself rule out every such all-time solution. The proposal leaves that question open rather than importing a prescribed future or an equilibrium claim.

Claim grade: derived for (22) and the necessary compatibility (23); unresolved for nonstationary all-time existence and invariance of the entire admissible EOM class. Falsifier of the limited compatibility claim: a uniformly smooth appended segment violating the explicit envelope estimate. Loss of a root margin or failure of (23) would instead fail the additional evolution requirements and would not refute the tail theorem.

## Concrete decision and proposed integration

The proposal presents one linked mathematical choice for operator discussion: retain the canonical row and canonical finite-source increments, use the existing eight-source stationary reference, and admit complete histories satisfying (1) in topology (2), for a fixed $p>1$. The number $p=2$ is a simple concrete option, with an acceleration and derivative correction tail bounded by a constant times $R^{-1}$ at fixed $\ell$; the strict threshold and dependence on $M$ remain visible. There is no physical derivation selecting that exponent or the stationary phase. The persistent summable deviations preserve arbitrary finite source modifications without making a sparse finite population stand in for the dense lattice.

Independent acceptance can be concrete without a population sweep: reconstruct the complete-window comparison (9), the stationary derivative subtraction (13), the relative remainder (15)–(16), the critical $p=1$ box obstruction (19), and the finite-modification and topology tests (20)–(21). These checks assess a mathematical proposal. Adoption requires the operator's separate judgment that the asymptotic population restriction is an appropriate problem for the theory. After adoption and independent acceptance, the next evolution result must address the actual cut-compatible mutually coupled histories, not merely the preservation identity (22).

Proposed coordinator integration: “A bounded admissibility proposal supplies finite acceleration and a bounded relative history derivative by requiring integrable distant-past decay toward the stationary lattice, with an absolutely summable allowance for persistent source deviations. It retains the canonical row, every complete root, and canonical finite-source increments. The existing constant-amplitude signed-divergent control is excluded explicitly; the existing finite-shell discontinuity sequence remains admitted but is not small in the proposed stronger topology. The exact control shows that power decay needs $p>1$, while the new estimates provide uniform tails at that threshold. The stationary reference still fixes the allowed complete-block ordering; arbitrary individual-source ordering remains impossible. The asymptotic condition can accompany bounded motion of all labels after release, but no nonstationary all-time EOM solution, cut compatibility, or invariant regular class is proved. The additional history assumption and topology remain proposed, with operator adoption and independent mathematical adjudication outstanding.”

## Evidence and validation record

This is an analysis-only development artifact. Mathematical evidence consists of the exact canonical row, frozen independently adjudicated controls, and the derivations displayed here. No standard-physics equation is used as a substrate premise. No numerical population sweep, EOM run, Python, new boundary or account prescription, reference modification, generated write, Git index/publication operation, or downstream task is part of this effort.

The seven read-only inputs were copied into `.tmp/population-admissibility-proposal/frozen/`; `shasum -a 256` recorded their identities before drafting the proposal. Existing reference bytes are not edited to agree with the new result.

| Input | SHA-256 |
| --- | --- |
| `population-history-class.md` | `dbe3b4f14a7253747863a4d3979aaf3b43d24b6eb1843b3264d11e2640184c2e` |
| `population-independent-adjudication.md` | `3a816dd737b6517e8e4e0839314604bbb144c2dcd718a3ebb753b1250fb131d9` |
| `population-delayed-summation.md` | `dfc6f6d8d34f5554fe8cdc5684131df0162148fe8c70c6378905aa540a645a64` |
| `population-history-derivative.md` | `dfa023617ed8ecdc939ad619a475636ac7f1867ad50f2d8592233772af352163` |
| `population-summation-independent-adjudication.md` | `ae61a7a2f976c597792d88944a57da33b936b6564a9b357e51c813830ea7b32a` |
| `population-derivative-independent-adjudication.md` | `cba03da38b1d74080acbb4394adff5c47bea1069e296a0748fd3c616a3d69f2e` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |

Before any target run, `node .tmp/population-admissibility-proposal/check.mjs known` passed the prescribed two-formula, one-file-link control, ignored a fenced unmatched dollar, and rejected both an invalid macro and trailing whitespace. The task-local checker is a copy of the existing derivative-review syntax checker with only its target path changed; the original checker is unchanged. It evaluates markup and local file targets, not the mathematical proposal.

Measured validation: `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings, and 30 notes. `shasum -a 256 -c .tmp/population-admissibility-proposal/input-digests.sha256` returned `OK` for all seven live references. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/population-admissibility-proposal.md` returned 1 for the new-file difference and emitted no whitespace diagnostic. These instruments cannot independently accept the new mathematical theorem. Analytical self-review checked the distinct domain/topology/summation changes, exceptional-source count, exact root-window estimates, stationary receiver-derivative subtraction, persistent-deviation allowance, critical exponent control, shell-norm lower bound, and cut-compatibility limitation.

Final focused syntax check: `node .tmp/population-admissibility-proposal/check.mjs target` passed 237 KaTeX expressions, seven relative file targets, balanced dollar delimiters, and absence of trailing whitespace. File-target checking does not resolve anchors or inspect browser layout. No mathematical acceptance status is inferred from this rendering check.
