# Delayed population summation on the reviewed history class

## Result and scope

The reviewed complete-history class does not admit a finite acceleration sum under the diagnostic eight-source partition for every nonstationary input. An admissible family arbitrarily close to the stationary history in the unchanged uniform position/velocity norm makes one component of the complete-block sum diverge to positive infinity under every ordering of those blocks. The obstruction is an actual signed lower bound, not a divergent upper estimate. It occurs with exactly one simple root per cross channel and no positive-delay self roots, with uniform slack in every root margin.

The mechanism is the transmitter factor. Independent source histories can pass through their anchor positions at their different causal emission times with velocities correlated with polarity. Their delayed positions then reproduce the stationary geometry exactly, but their acceleration weights differ. The resulting correction has a nonnegative projection for every source and a positive inverse-square contribution for a three-dimensional set of sources. Eight-source spatial cancellation cannot remove that correction.

This addresses current effort 1 in the [work contract](../work-queue.md#effort-contracts), using the unchanged [population class](population-history-class.md) and [independent adjudication](population-independent-adjudication.md). The result is a derived obstruction on prescribed complete pasts, pending independent adjudication of this new proof. It is neither an EOM trajectory nor an exclusion of dense EOM solutions, distinct-label contact, or same-transmitter birth. The class, norm, and absence of moment constraints are retained. No physical partition or alternative summation prescription is selected.

## Fixed definitions

Set $c_f=1$ and the reception cut to zero. Labels are $j\in\mathbb Z^3$, anchors are $\mathbf z_j=\ell j$, and charges are $q_j=q_0\sigma_j$, where $\sigma_j=(-1)^{j_1+j_2+j_3}$, $q_0>0$, and $\ell=L/100>0$. The coupling is $\kappa>0$. Receiver $i$ samples a source at a positive-delay root $s_{ijb}<0$ satisfying

$$
r_{ijb}=\|\mathbf X_i(0)-\mathbf X_j(s_{ijb})\|=-s_{ijb},\qquad
D_{ijb}=1-\hat{\mathbf r}_{ijb}\cdot\mathbf V_j(s_{ijb}).
$$

The unit vector $\hat{\mathbf r}_{ijb}$ points from the emission site toward the receiver. The regular acceleration contribution is

$$
\mathbf a_{ijb}=\kappa q_0^2\sigma_i\sigma_j
\frac{\hat{\mathbf r}_{ijb}}{r_{ijb}^2|D_{ijb}|}.
$$

This is the [canonical transmitter-side row](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation). Signed playback does not multiply it. A complete source contribution sums all its positive-delay roots. The exact zero-delay diagonal remains excluded and unresolved.

The reviewed class permits arbitrary independent label histories on the full past. Environmental displacements are bounded by $\ell/16$, target displacements by $4\ell$, and the speed, second time derivative, and third time derivative by $4$, $256/\ell$, and $65536/\ell^2$. Release separation is at least $\ell/8$. Its root tubes have half-width $w=\ell/256$, positive range at least $w$, transmitter magnitude at least $1/4$, and complement gap $\gamma=w/4$. Self channels additionally require $|f_{ii}(\tau)|\ge\tau/4$ for $0<\tau\le2w$ and no positive root tube in that sector. Here $f_{ij}(\tau)=\tau-\|\mathbf X_i(0)-\mathbf X_j(-\tau)\|$.

The unchanged distance between histories is

$$
\|\mathbf h\|_{\mathcal H}
=\sup_{j,s\le0}\frac{\|\mathbf h_j(s)\|}{\ell}
+\sup_{j,s\le0}\|\dot{\mathbf h}_j(s)\|.
$$

There is no decay weight for old emissions and no moment constraint. The diagnostic block indexed by $n\in\mathbb Z^3$ contains the eight labels $2n+\epsilon$, $\epsilon\in\{0,1\}^3$, and has center $\mathbf c_n=\ell(2n+(1/2,1/2,1/2))$.

## What an actual delayed block expansion requires

For a distant environmental block, put $\mathbf y=\mathbf X_i(0)-\mathbf c_n$, $R=\|\mathbf y\|$, and $a'=\sqrt3\ell/2+\ell/16$. Each actual emission displacement $\boldsymbol\xi_{jb}=\mathbf X_j(s_{ijb})-\mathbf c_n$ has norm at most $a'$. Let $\alpha_{jb}=\sigma_j/|D_{ijb}|$ and $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$. A Taylor expansion of the spatial kernel at the actual causal emissions gives

$$
\frac{\mathbf B_{in}}{\kappa q_0^2\sigma_i}
=\mu_0\mathbf K(\mathbf y)
-D\mathbf K(\mathbf y)[\boldsymbol\mu_1]
+\frac12\sum_{j,b}\alpha_{jb}D^2\mathbf K(\mathbf y)[\boldsymbol\xi_{jb},\boldsymbol\xi_{jb}]
+\mathbf E_n,
$$

where $\mu_0=\sum_{j,b}\alpha_{jb}$ and $\boldsymbol\mu_1=\sum_{j,b}\alpha_{jb}\boldsymbol\xi_{jb}$. The second moment is the tensor $\boldsymbol\mu_2=\sum_{j,b}\alpha_{jb}\boldsymbol\xi_{jb}\otimes\boldsymbol\xi_{jb}$; the third displayed term contracts $D^2\mathbf K$ with that tensor. All sums run through the complete root census of all eight sources.

There are at most $M=2050$ roots per source, and $|D|\ge1/4$. With $C_3=\sup_{\|\mathbf y\|=1}\|D^3\mathbf K(\mathbf y)\|_{\rm op}\le204$, the independent stationary adjudication's kernel derivative estimate gives the rigorous remainder

$$
\|\mathbf E_n\|\le
\frac{32M C_3(a')^3}{6(R-a')^5},\qquad R>a'.
$$

The kernel terms have orders $R^{-2}$, $R^{-3}$, and $R^{-4}$ before their respective moments are controlled. The last term has a summable $R^{-5}$ bound at cubic block density. Thus the remainder is not the missing ingredient: the actual delayed, transmitter-weighted moments are. The class does not impose cancellation or decay of these moments.

Equal-time signed position moments are different objects. They do not contain $|D|^{-1}$, do not sample the source-specific emission times, and do not sum possible multiple roots. Even an equal-time cancellation identity cannot be substituted in this expansion without proving the corresponding delayed weighted identity. In the obstruction below, emission positions themselves equal the stationary vertices, and the failure still occurs through the weights. Therefore the failure does not require an uncontrolled approximation of the causal times or ranges.

Claim grade: derived. Falsifier: a violation of the displayed Taylor remainder with the declared complete census and bounds, or an identity implied by the unchanged class that forces the displayed weighted moments to cancel for the family below. An imposed equal-time moment constraint would change the input assumptions and would not refute this statement.

## A source-dependent timing of the existing bump control

The existing nonstationary control uses small independent smooth displacements of prescribed pasts. A single common compact time support leaves sufficiently distant emissions stationary, so it cannot test a far-population delayed obstruction. The specific gap requires allowing the already-admitted source-dependent old emission times. The following family keeps the same lattice geometry and small-bump mechanism, shifting one compact pulse per selected source. It supplies no prescribed future and introduces no new population class.

Let $\mathbf e=(1,0,0)$, fix receiver $i=0$ stationary, and write $d_j=\|\mathbf z_j\|$ and $\mathbf n_j=-\mathbf z_j/d_j$ for $j\ne0$. Select the cone of labels

$$
\mathcal C=\{j\ne0:d_j\ge10\ell,\ \mathbf n_j\cdot\mathbf e\ge1/2\}.
$$

Define one dimensionless pulse, extended by zero outside its support, by

$$
\psi(t)=
\begin{cases}
t(1-t^2)^4,&|t|<1,\\
0,&|t|\ge1.
\end{cases}
$$

At either endpoint the polynomial vanishes to order four, so the extension is $C^3$. It satisfies $\psi(0)=0$, $\psi'(0)=1$. The polynomial expansion $t-4t^3+6t^5-4t^7+t^9$ and termwise absolute bounds on $[-1,1]$ give

$$
\|\psi\|_\infty\le16,\quad
\|\psi'\|_\infty\le80,\quad
\|\psi''\|_\infty\le384,\quad
\|\psi'''\|_\infty\le1728.
$$

For any $0<\nu\le1/1024$, prescribe the full past by

$$
\mathbf X_j(s)=
\begin{cases}
\mathbf z_j+\nu\ell\sigma_j\mathbf n_j\psi((s+d_j)/\ell),&j\in\mathcal C,\\
\mathbf z_j,&j\notin\mathcal C,
\end{cases}
\qquad s\le0.
$$

Both targets are outside $\mathcal C$ and are stationary. Every selected pulse has support inside $(-\infty,-9\ell]$, and all labels are at their anchors at release. The pulses extend to arbitrarily old times over the population, exactly as permitted by the complete-past norm. Uniformly,

$$
\|\mathbf X_j-\mathbf z_j\|_\infty\le16\nu\ell\le\ell/64,
\qquad \|\mathbf V_j\|_\infty\le80\nu\le5/64,
$$

$$
\|\mathbf X_j^{(2)}\|_\infty\le384\nu/\ell<256/\ell,
\qquad
\|\mathbf X_j^{(3)}\|_\infty\le1728\nu/\ell^2<65536/\ell^2.
$$

These bounds meet the reviewed displacement and regularity constraints with uniform slack, and the distance to the stationary history is at most $96\nu$. No class-wide sub-field speed assumption has been introduced: this counterexample lies in a slow subset of the existing class.

### Admission for every ordered channel

Admission is needed for all receivers, not only the receiver used to prove divergence. Since every receiver is at its anchor at zero and every source displacement is at most $\ell/64$, every cross-channel range at every past delay obeys

$$
r_{ij}(\tau)\ge\|\mathbf z_i-\mathbf z_j\|-\ell/64\ge63\ell/64>w.
$$

Put $v=80\nu\le5/64$. The source Lipschitz bound gives, for all $\tau_2>\tau_1\ge0$,

$$
f_{ij}(\tau_2)-f_{ij}(\tau_1)
\ge(1-v)(\tau_2-\tau_1).
$$

Since $f_{ij}(0)=-d_{ij}<0$ and $f_{ij}(\tau)\to+\infty$, every cross channel has exactly one root. Its delay is at least $63\ell/64>w$, so its centered width-$w$ tube is inside positive delay. On the entire tube $D_t\ge1-v\ge59/64>1/4$, and the range bound above holds. Outside the tube, monotonicity gives $|f_{ij}|\ge(1-v)w>\gamma$. This proves the all-earlier complement too, without a finite history cutoff. Release separation is at least $\ell$.

For every self channel the same pathwise speed bound gives $r_{ii}(\tau)\le v\tau$, hence $f_{ii}(\tau)\ge(1-v)\tau>0$. There are no positive-delay self roots. The normalized near-diagonal margin is at least $59/64>1/4$; for $\tau\ge2w$ the ordinary complement exceeds $\gamma$. The unresolved exact diagonal has not been evaluated. These estimates establish the complete regular chart, including root count, tube separation, range, and both kinds of complement margin. The reviewed density and delayed-count implications then apply to this admitted family without modification.

Claim grade: derived. Falsifier: a channel of this explicitly defined family with an additional root, a failed stated margin, or a violated class bound at an allowed $\nu$. The inequalities above permit checking all channels analytically; a finite sample alone is not their acceptance instrument. An EOM residual of these input pasts does not refute admissibility, because the reviewed class does not require past EOM compatibility.

## Exact causal rows and the common-sign correction

At receiver zero, a selected source satisfies $\mathbf X_j(-d_j)=\mathbf z_j$ and $\mathbf V_j(-d_j)=\nu\sigma_j\mathbf n_j$. Therefore $\tau=d_j$ is an exact root. The uniqueness just proved makes it the complete root census. Direction and range are exactly $\mathbf n_j$ and $d_j$, while $D_t=1-\nu\sigma_j>0$. Unselected sources retain their stationary roots. Writing $\mathbf F_j^0$ for the stationary source contribution, the exact row and its difference are

$$
\mathbf F_j=\frac{\kappa q_0^2\sigma_j\mathbf n_j}{d_j^2(1-\nu\sigma_j)},
\qquad
\mathbf F_j^0=\frac{\kappa q_0^2\sigma_j\mathbf n_j}{d_j^2},
\qquad j\in\mathcal C,
$$

$$
\Delta\mathbf F_j=\mathbf F_j-\mathbf F_j^0
=\frac{\kappa q_0^2\nu\mathbf n_j}{d_j^2(1-\nu\sigma_j)}.
$$

For $j\notin\mathcal C$ the difference is zero. Thus every label has $\mathbf e\cdot\Delta\mathbf F_j\ge0$, and selected labels obey

$$
\mathbf e\cdot\Delta\mathbf F_j
\ge\frac{\kappa q_0^2\nu}{2(1+\nu)d_j^2}.
$$

Polarity has disappeared from the numerator of the correction. This is an exact rational identity; no truncation in $\nu$ is used. For a complete block lying inside $\mathcal C$, its zeroth delayed weighted moment is already

$$
\mu_0=\frac4{1-\nu}-\frac4{1+\nu}
=\frac{8\nu}{1-\nu^2}>0.
$$

That block still has the stationary signed spatial moments at its sampled emission positions, because all eight positions are their anchors. The weighted moment does not vanish. This identifies the missing cancellation directly rather than assuming equal-time moments survive different emission times.

Claim grade: derived. Falsifier: failure of the exact root evaluation, rational subtraction, or common-sign inequality for an allowed source. A change in receiver playback cannot alter this conclusion because playback is absent from the acceleration row.

## A quantitative lower bound using complete blocks

A rectangular set of labels supplies both a count and a block-respecting far shell. For an even integer $m\ge16$, define

$$
Q_m=\{j:-2m\le j_1<-m,\ -m\le j_2<m,\ -m\le j_3<m\}.
$$

All endpoints are even integers. Consequently $Q_m$ is exactly a union of complete eight-source blocks, with $4m^3$ labels. Every label in it satisfies $m\ell\le d_j\le\sqrt6m\ell$ and $\mathbf n_j\cdot\mathbf e\ge1/\sqrt3>1/2$, so it belongs to $\mathcal C$. The exact positive correction bound gives

$$
\sum_{j\in Q_m}\mathbf e\cdot\Delta\mathbf F_j
\ge4m^3\frac{\kappa q_0^2\nu}{12(1+\nu)m^2\ell^2}
=\frac{\kappa q_0^2\nu}{3(1+\nu)\ell^2}\,m.
$$

The frozen independent reference proves the stationary complete-block tail

$$
\sum_{\|\mathbf c_n\|\ge R}\|\mathbf B_n^0\|
\le128\pi\kappa q_0^2 C_3R^{-2},\qquad R\ge2\sqrt3\ell.
$$

Every block in $Q_m$ has center distance at least $m\ell$. Therefore the actual signed projected sum on these complete blocks satisfies

$$
\mathbf e\cdot\sum_{n:\,\{2n+\epsilon\}_\epsilon\subset Q_m}\mathbf B_n
\ge
\frac{\kappa q_0^2\nu}{3(1+\nu)\ell^2}\,m
-\frac{128\pi\kappa q_0^2 C_3}{m^2\ell^2}.
$$

For every fixed $\nu>0$, this lower bound tends to positive infinity. The boxes lie between radii proportional to $m\ell$, so arbitrarily distant complete-block increments fail the Cauchy condition. Choosing $m=2^k\ge16$ also gives disjoint boxes by their first-coordinate intervals. This supplies a quantitative actual obstruction to a vanishing acceleration tail.

There is a stronger ordering conclusion. For every block write $\mathbf B_n=\mathbf B_n^0+\Delta\mathbf B_n$. The scalar corrections $\mathbf e\cdot\Delta\mathbf B_n$ are nonnegative and have infinite total by the box bound. The stationary block series is absolutely convergent. In every enumeration of all complete blocks its stationary part therefore tends to one finite value, whereas its nonnegative correction tends to positive infinity. The same conclusion holds for any exhausting family of finite unions of these blocks that eventually contains each block. Nestedness is unnecessary: any prescribed positive threshold is exceeded once the exhaustion contains a finite set whose nonnegative correction exceeds that threshold, while the stationary part is uniformly bounded by its absolute sum.

Claim grade: derived. Falsifier: an error in the exact block-aligned box count, cone inclusion, stationary reference bound, or a finite common-block limit compatible with the nonnegative divergent correction. A merely divergent norm majorant would not establish this conclusion; the displayed signed projection lower bound does.

## Ordering and partition scope

| Question | Conclusion on the unchanged class | Boundary of the conclusion |
| --- | --- | --- |
| Arbitrary individual-source ordering | Already rejected at the stationary member by the frozen independent absolute-shell proof. | This does not say every chosen individual-source order diverges. |
| Complete eight-source block ordering | Rejected for the nonstationary family above under every permutation and every complete-block exhaustion. | This is a failure of this diagnostic partition on the full class, despite its stationary success. |
| Finite coarsenings of the same blocks | Also rejected. Nonnegative corrections and the absolutely convergent stationary block sum survive any grouping into finite unions of original blocks. | No block splitting is included. |
| Another finite-source partition with a convergent stationary baseline under a stated exhaustion | The same perturbed family diverges in its $\mathbf e$ component under that exhaustion. For every finite source set the exact difference is the same sum of nonnegative corrections, and exhaustive inclusion makes it unbounded. | The stationary baseline must actually converge; this argument does not presume its convergence for arbitrary new partitions. |
| Arbitrary splitting, repartitioning, or history-dependent enumeration without that baseline hypothesis | No universal verdict is derived here. | Using a divergent stationary baseline to offset the correction would require a separately justified summation prescription and equality proof; none is selected by this class. |

For comparison, the existing common-time compact bump control does retain stationary far rows at receiver zero: once $d_j>2\ell$ for its support in $(-2\ell,-\ell)$, the exact root at $-d_j$ is outside the bump, and global slow-source monotonicity makes it unique. It changes at most finitely many source rows. Its complete-block tail consequently remains stationary after a finite radius. This narrow positive case cannot supply a uniform theorem over independent old-time shifts.

The constructed histories approach the stationary member with $\|\mathbf X-\mathbf z\|_{\mathcal H}\le96\nu\to0$. Hence no relative neighborhood of that member in the unchanged class can support the diagnostic block sum as a finite-valued functional on every input. This conclusion is about the value of the sum before differentiability is considered. It supplies a dependency obstruction to a neighborhood theorem for this functional; it does not replace the derivative worker's independently scoped operator-norm analysis or edit that worker's file.

## Proposed coordinator integration

“Current effort 1 derives an admissible nonstationary obstruction on the independently reviewed population class and unchanged complete-past position/velocity norm. Source-dependent shifts of the existing small-bump mechanism preserve every class constraint and give exactly one simple root per cross channel, with uniform slack and no positive-delay self roots. At receiver zero, causal emission positions equal the stationary anchors but polarity-correlated source velocities produce a nonnegative correction whose complete-block shell projection grows at least linearly in radius. The eight-source sum diverges to positive infinity in one component under every complete-block ordering; finite coarsenings also fail. The obstruction occurs arbitrarily close to stationary input. General alternative partitions remain conditional on their actual stationary baseline; no physical prescription is selected. This closes the effort at derived-obstruction scope pending independent review, and leaves coupled population evolution blocked on a revised, explicitly adjudicated summation/domain proposal. It establishes no dense EOM trajectory, contact exclusion, self-birth exclusion, or account closure.”

Recommended integration retains the stationary positive theorem and adds this nonstationary negative theorem next to it. A new moment-constrained class would need coordinated adjudication of the actual delayed weighted moments and its perturbation topology; equal-time spatial moments alone do not address the demonstrated mechanism. No such amendment is made here. All shared queue, priority, brainstorming, work-log, and synthesis edits remain with the coordinator.

## Frozen evidence and validation

The source and independent reference were hashed before the new derivation and copied into `.tmp/population-delayed-summation/`. The canonical row was frozen before the detailed calculation. Their SHA-256 identities are:

| Read-only input | SHA-256 |
| --- | --- |
| `population-history-class.md` | `dbe3b4f14a7253747863a4d3979aaf3b43d24b6eb1843b3264d11e2640184c2e` |
| `population-independent-adjudication.md` | `3a816dd737b6517e8e4e0839314604bbb144c2dcd718a3ebb753b1250fb131d9` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |

`shasum -a 256` on the frozen copies recorded those identities. The independently authored stationary proof is used unchanged only for its stationary block tail and kernel constant. New analytical evidence is the displayed pulse bounds, complete-channel monotonicity proof, exact causal-row subtraction, and block-aligned box count. No agreement with an in-session numerical implementation is offered as independent acceptance of this new theorem. No external standard-physics result is imported as a substrate premise.

Only this analysis and its assigned scratch directory are writable in this effort. No Python, EOM run, generated write, Git index mutation, publication, downstream dispatch, or derivative-file edit is part of the work. Syntax checks below establish markup and source identity, not mathematical independence or EOM acceptance.

Before target use, the adapted scratch syntax checker ran `node .tmp/population-delayed-summation/check.mjs known` and passed its independently specified two-formula, one-file-link case, fenced-dollar exclusion, invalid-macro rejection, and trailing-whitespace rejection. The checker was copied from the existing review scratch checker with only its target path changed. This known-case pass precedes the target run; the checker evaluates KaTeX syntax, file-target existence, delimiter balance, and trailing whitespace, not the mathematical theorem.

Final measured validation: `node .tmp/population-delayed-summation/check.mjs target` passed 127 KaTeX expressions, four relative file targets, balanced dollar delimiters, and absence of trailing whitespace. File checks do not resolve anchors or inspect browser layout. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/population-delayed-summation.md` emitted no whitespace diagnostic and returned 1 for the new-file difference. Final `shasum -a 256` on all three live inputs returned the frozen identities in the table. These scopes establish markup validity and input byte stability only. Mathematical self-review checked the polynomial bounds, signs of the exact causal-row subtraction, admission for all ordered channels, and alignment of the counted boxes with complete blocks; independent review of the new obstruction remains a coordinator decision.
