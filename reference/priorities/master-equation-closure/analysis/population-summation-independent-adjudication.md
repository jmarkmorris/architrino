# Independent adjudication of delayed population summation

## Decisions and scope

The obstruction in [Delayed population summation on the reviewed history class](population-delayed-summation.md) is accepted at its stated prescribed-history scope. Arbitrarily small admissible perturbations of the stationary past make the acceleration at receiver zero diverge in one component under every ordering of the diagnostic eight-source blocks. The decisive calculation is an exact change in the transmitter weight: the emission positions stay at their stationary anchors, while polarity-correlated source velocities give a correction with the same positive projection for both polarities. A signed lower bound on complete blocks proves divergence; failure of an absolute upper estimate is not being used as evidence.

The [history class](population-history-class.md), its uniform complete-past position/velocity norm, and its [existing adjudication](population-independent-adjudication.md) are fixed inputs. The arguments below independently reconstruct the relevant control, root census, kernel estimate, and ordering proof. The derivative candidate and derivative review conclusions are not used. This is current effort 1 in the [campaign contract](../work-queue.md#effort-contracts); the coordinator retains integration and shared-tracker ownership.

| Claim | Decision | Precise scope |
| --- | --- | --- |
| Admission of the specified source-dependent pulse family | Accept | Every allowed positive amplitude; all labels, all past times, and every ordered channel at reception zero satisfy the unchanged class with uniform slack. |
| Exact unequal-time emissions and polarity-correlated transmitter weights | Accept | At receiver zero, each cross source has exactly one root; each selected source is at its anchor at its own emission time. |
| Signed shell divergence | Accept | A complete-block set of radius proportional to its integer scale has a projected lower bound growing linearly in that scale for every fixed positive amplitude. |
| Divergence under every complete-block ordering | Accept | Every permutation and every finite-set exhaustion that eventually contains each original block; also every finite coarsening of those blocks. |
| A finite diagnostic block functional on the full class, or on a relative neighborhood of the stationary member | Reject | The admitted divergent histories occur in every such neighborhood, already at receiver zero. This accepts the subject's negative theorem. |
| Failure for another finite-source partition | Accept conditionally | The same finite source sets must exhaust all labels and have a convergent stationary baseline. The perturbed projected sums then tend to positive infinity. |
| Divergence for every arbitrary repartitioning or history-dependent enumeration | Unresolved | The baseline condition cannot be omitted. The subject does not claim this stronger result. |
| Divergence at every receiver for this one family | Unresolved | Admission is proved for every receiver; the signed divergence proof fixes receiver zero. That suffices to refute an all-receiver functional on the class. |
| Infinite-sum derivatives, dense coupled EOM existence or nonexistence, contact, self birth, or conserved accounts | Unresolved | This result concerns a prescribed initial acceleration sum. It supplies none of those separate conclusions. |

The accepted mathematical implications have claim grade `derived` from the displayed premises and proofs. No mathematical correction to the subject's scoped obstruction is required. Acceptance does not identify the proposed population class or the diagnostic partition as physical ontology.

## Fixed inputs and statement of the obstruction

Set the wake speed to $c_f=1$ and the reception cut to zero. Fix $\ell=L/100>0$, $q_0>0$, and $\kappa>0$. Labels are $j\in\mathbb Z^3$, with anchors $\mathbf z_j=\ell j$, signs $\sigma_j=(-1)^{j_1+j_2+j_3}$, and charges $q_j=q_0\sigma_j$. Labels $0$ and $e_1=(1,0,0)$ are the targets. Write $G=\kappa q_0^2>0$ for the common coefficient.

Every history $\mathbf X_j(s)$ is defined for all $s\le0$. Environmental displacements are at most $\ell/16$ and target displacements at most $4\ell$. Histories are $C^3$, with uniform bounds $4$, $256/\ell$, and $65536/\ell^2$ on their first, second, and third time derivatives. Distinct labels have release separation at least $\ell/8$. The distance from the stationary history $\mathbf z$ is

$$
\|\mathbf X-\mathbf z\|_{\mathcal H}
=\sup_{j,s\le0}\frac{\|\mathbf X_j(s)-\mathbf z_j\|}{\ell}
+\sup_{j,s\le0}\|\dot{\mathbf X}_j(s)\|.
$$

This is the unchanged relative history topology: old emission times have no decay weight, and different label histories need not obey shared moment or symmetry constraints.

For receiver $i$ and source $j$, define the positive delay $\tau=-s$, the range $r_{ij}(\tau)=\|\mathbf X_i(0)-\mathbf X_j(-\tau)\|$, and the residual $f_{ij}(\tau)=\tau-r_{ij}(\tau)$. A causal root is a positive zero of this residual. At positive range, let $\hat{\mathbf r}$ point from the emission site to the receiver. The [canonical regular acceleration row](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) is

$$
D_t=1-\hat{\mathbf r}\cdot\mathbf V_j(-\tau),\qquad
\mathbf a_{ij}=G\sigma_i\sigma_j\frac{\hat{\mathbf r}}{r_{ij}^2|D_t|}.
$$

The complete contribution of a source includes every positive-delay root. Receiver playback is not an additional acceleration multiplier. The exact zero-delay diagonal has no assigned numerical row.

The class requires disjoint closed tubes of half-width $w=\ell/256$ centered on all positive roots, with $r\ge w$ and $|D_t|\ge1/4$ throughout each tube. Cross-channel complements have $|f|\ge\gamma=w/4$. Self channels have no root tube meeting $[0,2w]$, satisfy $|f_{ii}(\tau)|\ge\tau/4$ for $0<\tau\le2w$, and have the ordinary gap $\gamma$ on the remaining complement. These constraints give the fixed conservative root bound $M=2050$ per channel; the witness below has only one root per cross channel and none per self channel.

Let $P_n=\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$ denote a diagnostic block, with center $\mathbf c_n=\ell(2n+(1/2,1/2,1/2))$. The statement proved here has the following order of quantifiers: for every fixed $0<\nu\le1/1024$, the specified history $\mathbf X^{\nu}$ belongs to the unchanged class; for every exhaustion of all complete blocks, the projected acceleration sums at receiver $i=0$ tend to positive infinity. Moreover $\|\mathbf X^{\nu}-\mathbf z\|_{\mathcal H}\le96\nu$. The divergence assertion is at one fixed reception event, not a uniform statement over future times or every receiver.

## Reconstructing the admitted pulse history

Use the subject's existing compact pulse and source-dependent timing, without changing the geometry. Fix $\mathbf e=(1,0,0)$. For $j\ne0$, put $d_j=\|\mathbf z_j\|$ and $\mathbf n_j=-\mathbf z_j/d_j$. Select

$$
\mathcal C=\{j\ne0:d_j\ge10\ell,\ \mathbf n_j\cdot\mathbf e\ge1/2\}.
$$

These sources lie in a cone pointing toward negative first coordinate. Both targets lie outside the cone. Define $\psi(t)=t(1-t^2)^4$ on $|t|<1$, with zero extension on $|t|\ge1$. Its order-four endpoint zeros make that extension $C^3$. At the center, $\psi(0)=0$ and $\psi'(0)=1$. Expanding the polynomial gives

$$
\psi(t)=t-4t^3+6t^5-4t^7+t^9.
$$

For $|t|\le1$, the sums of absolute coefficients after zero, one, two, and three differentiations are respectively $16$, $80$, $384$, and $1728$. Outside this interval the functions vanish, and endpoint derivatives through order three agree with zero. Thus these four numbers bound the corresponding global suprema. For $0<\nu\le1/1024$, the history is exactly

$$
\mathbf X_j^{\nu}(s)=
\begin{cases}
\mathbf z_j+\nu\ell\sigma_j\mathbf n_j\psi((s+d_j)/\ell),&j\in\mathcal C,\\
\mathbf z_j,&j\notin\mathcal C,
\end{cases}
\qquad s\le0.
$$

Each pulse lies in $[-d_j-\ell,-d_j+\ell]\subset(-\infty,-9\ell]$. All labels, including the receiver and the other target, are at their anchors at release. The pulse amplitudes and their derivatives satisfy

$$
\|\mathbf X_j^{\nu}-\mathbf z_j\|_\infty\le16\nu\ell\le\ell/64,
\qquad
\|\mathbf V_j^{\nu}\|_\infty\le80\nu\le5/64,
$$

$$
\|(\mathbf X_j^{\nu})^{(2)}\|_\infty\le384\nu/\ell\le3/(8\ell),
\qquad
\|(\mathbf X_j^{\nu})^{(3)}\|_\infty\le1728\nu/\ell^2\le27/(16\ell^2).
$$

The last two quantities are derivatives of prescribed histories; no EOM compatibility is assumed. Every bound is strictly within the corresponding class bound, uniformly over labels and the complete past. The norm bound $96\nu$ follows by adding the first two suprema in their prescribed units. Source-dependent translations preserve these bounds even though the population has no common earliest pulse time.

### Complete census and slack for every ordered channel

Put $v=80\nu\le5/64$. Every source is globally Lipschitz in time with constant $v$. For any receiver $i$, its release position is $\mathbf z_i$. If $i\ne j$, then at every past delay

$$
r_{ij}(\tau)\ge\|\mathbf z_i-\mathbf z_j\|-\ell/64\ge63\ell/64.
$$

The range difference between two delays has absolute value at most $v$ times their difference. Consequently, for $\tau_2>\tau_1\ge0$,

$$
f_{ij}(\tau_2)-f_{ij}(\tau_1)
\ge(1-v)(\tau_2-\tau_1).
$$

At zero, $f_{ij}(0)=-\|\mathbf z_i-\mathbf z_j\|<0$. Bounded displacement gives $f_{ij}(\tau)\ge\tau-\|\mathbf z_i-\mathbf z_j\|-\ell/64$, which tends to positive infinity. Existence and strict monotonicity therefore give exactly one cross root $\tau_{ij}$. Its delay is at least $63\ell/64>w$, so its centered tube is inside positive delay. The range remains at least $63\ell/64$ on the entire tube, and

$$
D_t\ge1-v\ge59/64>1/4.
$$

For a delay outside that tube, applying the same monotonicity estimate between the delay and $\tau_{ij}$ gives $|f_{ij}(\tau)|\ge(1-v)w\ge59w/64>\gamma$. This estimate covers the whole unbounded earlier complement. Tube disjointness is automatic because there is only one root in each cross channel.

For a self channel, the source and receiver are two times on the same path, so $r_{ii}(\tau)\le v\tau$. Therefore

$$
f_{ii}(\tau)\ge(1-v)\tau\ge59\tau/64>0\qquad(\tau>0).
$$

There is no positive-delay self root. The normalized self margin exceeds $1/4$; on $\tau\ge2w$ the ordinary gap is at least $59w/32>\gamma$. The excluded diagonal is never evaluated. At release, distinct labels are separated by at least $\ell$, which is strictly above $\ell/8$.

This proves membership at the original constants, with uniform slack. It checks admission for every receiver and source, including the selected sources when they act as receivers at zero. The class's spatial and delayed-count conclusions then apply: the positions satisfy its displacement bounds, and the complete regular channel census has been established. No slow-speed restriction has been added to the class; this particular witness lies in its slow subset.

Claim grade: derived. Falsifier: an allowed $\nu$ and ordered channel violating the displayed global Lipschitz residual inequality, cross-range bound, endpoint signs, or self-chord bound would invalidate admission. A hidden additional root would contradict those same global inequalities, not merely a finite numerical search. An EOM residual of the prescribed past would not test an admission assumption.

## Exact unequal-time source rows

For receiver zero and every selected source, evaluation at the source's own time $s=-d_j$ gives

$$
\mathbf X_j^{\nu}(-d_j)=\mathbf z_j,
\qquad
\mathbf V_j^{\nu}(-d_j)=\nu\sigma_j\mathbf n_j.
$$

The range is exactly $d_j$, so $\tau=d_j$ is a causal root. The all-channel proof makes it the only one. Thus $\hat{\mathbf r}=\mathbf n_j$ and $D_t=1-\nu\sigma_j>0$ exactly. Different source distances generally give different causal times. No common-time cancellation or approximate root location has entered this calculation.

Since $\sigma_0=1$, let $\mathbf F_j^{\nu}$ and $\mathbf F_j^0$ denote the complete perturbed and stationary source contributions at receiver zero. For $j\in\mathcal C$,

$$
\mathbf F_j^{\nu}=\frac{G\sigma_j\mathbf n_j}{d_j^2(1-\nu\sigma_j)},
\qquad
\mathbf F_j^0=\frac{G\sigma_j\mathbf n_j}{d_j^2}.
$$

Subtracting these finite, complete source rows and using $\sigma_j^2=1$ yields

$$
\Delta\mathbf F_j
=\frac{G\nu\mathbf n_j}{d_j^2(1-\nu\sigma_j)},
\qquad
\mathbf e\cdot\Delta\mathbf F_j
\ge\frac{G\nu}{2(1+\nu)d_j^2}>0.
$$

For unselected sources the difference is zero. The self channel has no positive row in either history. Hence the projected correction is nonnegative for every label. This exact identity, valid for the whole amplitude interval, is stronger than a first-order expansion. A positive source gains positive projected acceleration; a negative source becomes less negative in that projection. Both changes have the same sign.

For a complete block inside $\mathcal C$, four labels have each polarity. Its weighted zeroth moment is therefore

$$
\sum_{j\in P_n}\frac{\sigma_j}{D_{t,j}}
=\frac4{1-\nu}-\frac4{1+\nu}
=\frac{8\nu}{1-\nu^2}>0.
$$

All sampled emission positions are still the stationary vertices. Their unweighted signed spatial moments vanish through degree two, but their transmitter-weighted moments need not. This distinguishes exact spatial geometry from the weights that the acceleration law actually sums.

Claim grade: derived. Falsifier: a failure of the exact $s=-d_j$ evaluation, the canonical transmitter weight, or the displayed rational subtraction for either polarity would overturn the common-sign result. Receiver playback cannot supply a cancellation because it is absent from the canonical acceleration row.

## Independent control of the stationary baseline

The signed lower bound needs a bound on the actual stationary blocks, not just a claim that stationary cancellation is possible. Here is a reconstruction from the spatial kernel $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$. Let $a=\sqrt3\ell/2$ be the corner-to-center distance and $R_n=\|\mathbf c_n\|$ for receiver zero. The alternating sum over the eight corners is a repeated first finite difference in the three coordinate directions. Applying the fundamental theorem of calculus once in each direction writes it, up to sign, as an integral of the mixed third derivative of $\mathbf K$ over a parameter cube of volume $\ell^3$. Along this integration cube, the kernel argument stays at least $R_n-a$ from zero.

Define $C_3=\sup_{\|\mathbf y\|=1}\|D^3\mathbf K(\mathbf y)\|_{\rm op}$, where the norm is the supremum on triples of unit vectors. Homogeneity gives $\|D^3\mathbf K(\mathbf y)\|_{\rm op}\le C_3\|\mathbf y\|^{-5}$. To check the explicit constant, put $g(\mathbf y)=\|\mathbf y\|^{-3}$. Direct differentiation gives

$$
D^2g[\mathbf u,\mathbf v]
=-3(\mathbf u\cdot\mathbf v)\|\mathbf y\|^{-5}
+15(\mathbf y\cdot\mathbf u)(\mathbf y\cdot\mathbf v)\|\mathbf y\|^{-7}.
$$

For unit arguments this is bounded by $18\|\mathbf y\|^{-5}$. Its derivative consists of three terms with coefficient $15$ and one with coefficient $-105$, giving $\|D^3g\|_{\rm op}\le150\|\mathbf y\|^{-6}$. The product rule for $\mathbf K=\mathbf y g$ thus gives $C_3\le150+3(18)=204$. Consequently the stationary block contribution obeys

$$
\|\mathbf B_n^0\|
\le\frac{GC_3\ell^3}{(R_n-a)^5}
\le32GC_3\ell^3R_n^{-5}\qquad(R_n\ge2a).
$$

For $S\ge2\sqrt3\ell$, the block centers in $[S,2S)$ have disjoint cubes of side $2\ell$, all inside the ball of radius $2S+\sqrt3\ell\le5S/2$. Dividing that ball's volume by $8\ell^3$ bounds their count by $(125\pi/48)S^3\ell^{-3}<3\pi S^3\ell^{-3}$. The norm sum on that shell is at most $96\pi GC_3S^{-2}$. Summing the geometric series over $S=2^kR$ therefore gives

$$
\sum_{R_n\ge R}\|\mathbf B_n^0\|
\le128\pi GC_3R^{-2},\qquad R\ge2\sqrt3\ell.
$$

Near blocks are finite after omission of the exact receiver diagonal, since all other stationary ranges are at least $\ell$. Thus $S_0=\sum_n\|\mathbf B_n^0\|<\infty$. This proves the bound used below independently of the subject's reported validation or conclusions.

The same reasoning confirms the subject's warning about a general delayed Taylor expansion. For a distant environmental block, let $\mathbf y=\mathbf X_i(0)-\mathbf c_n$, $R=\|\mathbf y\|$, $\boldsymbol\xi_{jb}=\mathbf X_j(s_{ijb})-\mathbf c_n$, and $\alpha_{jb}=\sigma_j/|D_{t,jb}|$. Then $\|\boldsymbol\xi_{jb}\|\le a'=a+\ell/16$. Taylor expansion of $\mathbf K(\mathbf y-\boldsymbol\xi)$ gives the zeroth, first, and second weighted moments, followed by a remainder bounded by

$$
\|\mathbf E_n\|\le\frac{32MC_3(a')^3}{6(R-a')^5}\qquad(R>a').
$$

The coefficient follows from at most $8M$ complete root rows, each with $|\alpha|\le4$, and the third-order Taylor remainder $C_3\|\boldsymbol\xi\|^3/[6(R-a')^5]$. The remainder is for the block divided by $G\sigma_i$, as in the subject. The preceding moment terms scale as $R^{-2}$, $R^{-3}$, and $R^{-4}$ before their actual weighted moments are bounded. The class imposes no cancellation of the leading weighted moment, which the exact pulse calculation makes nonzero. In three spatial dimensions a uniformly bounded second moment already has a summable $R^{-4}$ contribution; this does not repair an uncontrolled $R^{-2}$ contribution. No inference of divergence is made from the Taylor upper bounds alone.

Claim grade: derived. Falsifier: a failure of the threefold finite-difference identity, the derivative bounds, or the disjoint-cube count would overturn the corresponding stationary estimate. A violation of the delayed remainder bound with the declared complete census would overturn the expansion claim. Neither an equal-time moment identity nor a finite numerical stationary sum replaces these checks.

## Signed complete-block shell lower bound

For an even integer $m\ge16$, retain exactly the subject's label box

$$
Q_m=\{j:-2m\le j_1<-m,\ -m\le j_2<m,\ -m\le j_3<m\}.
$$

Each coordinate interval starts and ends on an even integer. The labels therefore comprise complete pairs in each coordinate and exactly $m^3/2$ complete eight-source blocks, containing $4m^3$ sources. For every label in the box,

$$
m\ell\le d_j\le\sqrt6m\ell,
\qquad
\mathbf n_j\cdot\mathbf e
=\frac{|j_1|}{\sqrt{j_1^2+j_2^2+j_3^2}}
\ge\frac1{\sqrt3}>\frac12.
$$

The lower cone estimate follows from $|j_1|\ge m$ and $|j_2|,|j_3|\le m$. Since $m\ge16$, every selected box source lies in $\mathcal C$. Applying the exact source lower bound and the upper range bound to all $4m^3$ sources gives

$$
\sum_{j\in Q_m}\mathbf e\cdot\Delta\mathbf F_j
\ge\frac{G\nu}{3(1+\nu)\ell^2}\,m.
$$

All block centers in the box have distance at least $m\ell$. The stationary tail bound therefore bounds the magnitude of their total stationary contribution by $128\pi GC_3/(m^2\ell^2)$. Writing $\mathbf B_n^{\nu}=\sum_{j\in P_n}\mathbf F_j^{\nu}$, the actual signed projected increment satisfies

$$
\mathbf e\cdot\sum_{n:P_n\subset Q_m}\mathbf B_n^{\nu}
\ge\frac{G}{\ell^2}
\left[\frac{\nu m}{3(1+\nu)}-\frac{128\pi C_3}{m^2}\right].
$$

For each fixed positive $\nu$ this tends to positive infinity. For example, once $m^3\ge768\pi C_3(1+\nu)/\nu$, the right side is at least $G\nu m/[6(1+\nu)\ell^2]$. This explicit threshold shows why the amplitude must be fixed before taking the tail limit; there is no amplitude-independent positive linear coefficient as $\nu\to0$.

The boxes move to arbitrarily large radii, and choosing $m=2^k\ge16$ makes their first-coordinate intervals disjoint. The displayed lower bound therefore gives arbitrarily distant complete-block increments of unbounded positive projection. In particular, the tails fail the Cauchy criterion even at this one receiver. This is a lower bound on the signed sum itself after the stationary contribution has been controlled.

Claim grade: derived. Falsifier: a defect in block alignment, the exact $4m^3$ source count, cone inclusion, range bounds, or stationary subtraction would invalidate this quantitative shell argument. A divergent norm majorant alone would not prove the displayed assertion; the exact common-sign source correction supplies its sign.

## Exhaustion, partition, and neighborhood quantifiers

For every original block define $d_n=\mathbf e\cdot(\mathbf B_n^{\nu}-\mathbf B_n^0)$. The exact source calculation gives $d_n\ge0$, including blocks that meet the cone boundary only partially. The box bound proves $\sum_n d_n=+\infty$. Here this positive sum means the supremum of sums over finite sets of blocks; the disjoint boxes also provide a direct increasing sequence witnessing it.

For any finite block set $E$,

$$
\mathbf e\cdot\sum_{n\in E}\mathbf B_n^{\nu}
=\mathbf e\cdot\sum_{n\in E}\mathbf B_n^0+\sum_{n\in E}d_n
\ge-S_0+\sum_{n\in E}d_n.
$$

Given any threshold $H$, select a finite block set $E_*$ with $\sum_{n\in E_*}d_n>H+S_0$. Every finite set containing $E_*$ then has projected sum greater than $H$. This proves divergence of the net of all finite complete-block sums. In particular it proves divergence for every permutation and for any sequence of finite sets in which each block is eventually always present. Nestedness is unnecessary. Merely having union equal to all blocks, while repeatedly dropping earlier blocks, is a weaker property and is not the exhaustion hypothesis.

Any partition into finite unions of original blocks has the same property. Its stationary grouped series is absolutely convergent because its total norm sum is at most $S_0$, and its projected corrections are nonnegative with infinite total. There is no requirement of a common bound on the number of original blocks in each finite group.

For a different finite-source partition, let $A_k$ be its finite source sets along one stated exhaustion, and compare stationary and perturbed sums on exactly those same $A_k$. The identity

$$
\mathbf e\cdot\sum_{j\in A_k}\mathbf F_j^{\nu}
=\mathbf e\cdot\sum_{j\in A_k}\mathbf F_j^0
+\sum_{j\in A_k}\mathbf e\cdot\Delta\mathbf F_j
$$

holds before any infinite limit. If the stationary baseline converges and the sets eventually retain every source, the last term tends to positive infinity by the nonnegative source corrections, so the perturbed projection also tends to positive infinity. This accepts the subject's conditional alternative-partition claim. If stationary and perturbed histories select different enumerations, convergence on the stationary history's own enumeration does not establish the necessary baseline on the perturbed history's sets. Arbitrary splitting, cancellation by a divergent baseline, and unrestricted history-dependent ordering remain outside the proof.

The stationary member itself still has an absolutely convergent block sum. Its individual-source norm series diverges: a shell $[R,2R)$ contains at least $4\pi\ell^{-3}R^3$ sources for $R\ge40\ell$, and each stationary source norm is at least $G/(4R^2)$. Hence the shell norm sum is at least $\pi G\ell^{-3}R$. The scalar-coordinate rearrangement argument then excludes a finite common value under every individual-source permutation. This is distinct from the new result, which makes every original-block ordering fail at the nonstationary witness.

The previously admitted common-time bump supported in $(-2\ell,-\ell)$ provides a useful surviving control. At receiver zero every source with $d_j>2\ell$ has its stationary root $-d_j$ outside that support. The control's global speed bound makes that root unique. Only finitely many rows differ, and its sufficiently distant complete-block tail remains stationary. Source-dependent shifts in the reviewed class remove this common time cutoff. A finite temporal window would likewise omit all sufficiently distant selected pulses and would not test the complete-past obstruction.

Finally, for every relative neighborhood radius $\varepsilon>0$, choose $0<\nu<\min(1/1024,\varepsilon/96)$. The admitted history $\mathbf X^{\nu}$ lies inside that neighborhood and has the divergent block sum just proved. Thus no relative neighborhood of the stationary member can give this diagnostic sum a finite value on every input. This is a failure of the functional's domain before differentiability is considered. A sequence of finite-source modifications has a different scope: its members can each have finite sums, and derivative or continuity assertions about that sequence belong to the separate adjudication.

Claim grade: derived for the stated exhaustion, conditional partition, and neighborhood assertions. Falsifier: a finite-valued complete-block exhaustion satisfying eventual inclusion despite $d_n\ge0$, infinite positive total, and $S_0<\infty$ would overturn the ordering result. A proposed counterexample using a different partition must also satisfy convergence of its stationary baseline on the identical finite source sets. Changing the history norm, adding moment restrictions, or requiring past EOM compatibility would change the problem rather than refute these statements.

## Proposed integration and downstream consequences

Recommended coordinator integration text:

> Independent effort 1 accepts the delayed-summation obstruction on the frozen prescribed-history population class and unchanged complete-past position/velocity norm. The specified source-dependent pulses satisfy every class condition with uniform slack for all ordered channels at release. At receiver zero, all selected emission positions equal their stationary anchors, but polarity-correlated source velocities produce a nonnegative projected correction with a divergent inverse-square source sum. The actual complete-block shell projection has a linear lower bound in radius after subtraction of an inverse-square stationary tail. Every ordering and exhaustion of the diagnostic eight-source blocks diverges, and finite coarsenings also fail. These divergent inputs occur arbitrarily close to the stationary member. Alternative finite-source partitions fail under the explicit hypothesis of a convergent stationary baseline on the same exhaustion; unrestricted repartitioning is unresolved. The stationary block theorem remains valid. This is a prescribed-input obstruction, with no conclusion of nonexistence of all dense EOM populations.

The immediate consequence for effort 4 is precise: a coupled EOM theorem that defines its initial acceleration for every history in this class, or every history in a relative neighborhood of the stationary member, cannot use this diagnostic block sum. It already fails to assign a finite acceleration to receiver zero at release. This settles that proposed route negatively; it does not show that every member fails or that a compatible dense EOM population cannot exist.

Effort 2 retains its independent derivative and discontinuity obligations. The undefined-value obstruction prevents differentiability of this block functional on a full relative neighborhood, but supplies no substitute for a derivative formula, operator-norm tail bound, or finite-modification continuity theorem. Efforts 5–8 cannot infer admissible coupled exhaustion, trajectory error, contact, or genericity from these prescribed histories. The literal same-transmitter reachability obligation also remains unchanged: this witness has no positive-delay self roots at release and no EOM-evolved future.

The strongest next mathematical target is conditional on a coordinator-selected summation or domain proposal: prove that the proposed finite-valued functional survives this exact witness if the witness remains admitted, or state and justify the additional hypothesis that excludes it. Any weighted-moment proposal must control actual source-specific emissions, transmitter weights, complete roots, and the associated perturbation topology. Equal-time spatial cancellations do not meet that requirement. A restriction changing this class or norm requires its own adjudication; none is made here. No new ontology, partition, account map, continuation law, or downstream dispatch follows from this review.

## Frozen evidence and validation

The subject, class, and population adjudication were frozen by `shasum -a 256` before reading the mathematical subject. The canonical equation file was added to the frozen set before its detailed row read. The following identities are recorded in `.tmp/population-summation-adjudication/input-digests.sha256`, with complete copies in that same scratch directory.

| Input | SHA-256 |
| --- | --- |
| `population-delayed-summation.md` | `dfc6f6d8d34f5554fe8cdc5684131df0162148fe8c70c6378905aa540a645a64` |
| `population-history-class.md` | `dbe3b4f14a7253747863a4d3979aaf3b43d24b6eb1843b3264d11e2640184c2e` |
| `population-independent-adjudication.md` | `3a816dd737b6517e8e4e0839314604bbb144c2dcd718a3ebb753b1250fb131d9` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |

The independent mathematical evidence is the explicit reconstruction in this document: coefficient bounds, global residual monotonicity, self-chord exclusion, exact causal-row subtraction, threefold finite differences, disjoint-cube counting, and finite-set positive-sum arguments. The existing control is reused exactly. Neither a subject test pass nor the derivative review's conclusions is used as a mathematical reference. No external standard-physics premise enters the derivation.

Validation concerns this exclusive output and frozen input identity. It cannot certify an EOM trajectory, an infinite-population continuation, or the mathematical proof by markup alone. The coordinator owns queue, priority, work-log, brainstorming, and synthesis edits; those are outside this output's write scope.

Before its first target run, the scratch syntax checker passed `node .tmp/population-summation-adjudication/check.mjs known`: the prescribed two-formula, one-file-link case returned those exact counts, ignored a fenced unmatched dollar, and rejected an invalid macro and trailing whitespace. This checker is a scratch copy of the existing summation syntax checker with only its target path changed. The existing instrument remains unchanged; this copy checks notation and local file targets, not the proof.

Final measured validation: `node .tmp/population-summation-adjudication/check.mjs target` passed 200 KaTeX expressions, five relative file targets, balanced dollar delimiters, and absence of trailing whitespace. It checks file existence, not link anchors or browser layout. Source rereading also corrected two missing TeX command backslashes that syntax rendering alone could not identify as semantic transcription errors. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/population-summation-independent-adjudication.md` returned 1 for the new-file difference and emitted no whitespace diagnostic. `shasum -a 256 -c .tmp/population-summation-adjudication/input-digests.sha256` returned `OK` for all four live inputs; separate hashes of the four scratch copies matched the same identities. These instruments establish syntax and byte stability at their stated scope. No Python, EOM run, generated write, Git index write, publication, or downstream dispatch was performed.
