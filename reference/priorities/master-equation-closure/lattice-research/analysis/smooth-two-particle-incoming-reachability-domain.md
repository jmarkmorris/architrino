# A complete ancient-history domain for the alternating lattice

## Result and scope

The alternating unit cubic lattice admits a useful exact symmetry reduction in which every label moves and the complete histories approach the stationary lattice exponentially as time tends to minus infinity. Opposite polarities have opposite displacements. The delayed corrections are absolutely summable even though infinitely many histories are nonconstant. This supplies a restricted complete-history domain for a genuinely coupled evolution argument; the earlier finite-disturbance continuation theorem does not establish it.

**Claim grade: derived and [independently accepted](smooth-two-particle-incoming-reachability-independent-adjudication.md).** The results proved here are complete subunit root enumeration, convergence of the infinite functional, exact staggered symmetry, its growing linear mode, weighted nonlinear remainder estimates and an optional analytic-functional construction. They support a nonlinear ancient-solution argument. They do not prove that such a solution later reaches wake speed, remains below a collision margin until then, or crosses transversely. The earlier supplied-pulse event time and numerical certificate concern another history and do not transfer.

Throughout, $g=16$, $c_f=1$, the polarity is $\sigma_i=(-1)^{i_1+i_2+i_3}$, and the original eight-source block prescription is retained. A growing mode is derived about the already verified stationary equilibrium. No common moving frame, Galilean invariance or equilibrium of a uniformly drifting lattice is assumed.

## 1. An exact two-sublattice history family

Let $q:(-\infty,T]\to\mathbb R^3$ and set

$$
X_i(t)=i+\sigma_iq(t),\qquad i\in\mathbb Z^3.
\tag{1}
$$

For now assume $q\in C^2$, $|q|\le\rho<1/2$, $|q'|\le\nu<1$, and, for some $\beta>0$ and constants $M_k$,

$$
|q^{(k)}(t)|\le M_k e^{\beta(t-T)},\qquad k=0,1,2.
\tag{2}
$$

The word ancient means that the path is supplied on the entire interval $(-\infty,T]$. It does not mean that it solves the equation; that is a separate condition below. Unlike a compactly started pulse, (2) allows a nonzero displacement at every finite past time.

For an even-polarity receiver, put $d=i-j\ne0$, $r_d=|d|$, and $\sigma_d=(-1)^{d_1+d_2+d_3}$. The unique candidate source emission is $s=t-\tau_d$, where

$$
R_d=d+q(t)-\sigma_dq(t-\tau_d),\qquad
\tau_d=|R_d|,\qquad
n_d=R_d/\tau_d,
\tag{3}
$$

and

$$
D_d=1-\sigma_dn_d\cdot q'(t-\tau_d).
\tag{4}
$$

The positive-delay residual $\tau-|R_d|$ increases with slope at least $1-\nu$. It is negative at zero because distinct labels stay at least $1-2\rho$ apart; it tends to positive infinity as $\tau\to\infty$ because the source displacement is bounded. Thus each distinct-label channel has exactly one root, with

$$
|\tau_d-r_d|\le2\rho,\qquad D_d\ge1-\nu>0.
\tag{5}
$$

Every own chord has length at most $\nu\tau<\tau$. Hence there are no positive-delay self roots anywhere in this subunit complete history. No finite memory cutoff or unenumerated own term is used.

Define $K(x)=x/|x|^3$ on real nonzero vectors. The even receiver functional is

$$
\mathcal F[q](t)
=g\sum_{d\ne0}^{\rm blocks}\sigma_d\frac{K(R_d)}{D_d}.
\tag{6}
$$

Section 2 proves that this sum exists with precisely the original prescription. The equation for the history family will be $q''=\mathcal F[q]$, not a prescribed outgoing trajectory.

## 2. Why an infinite disturbed population is summable here

Retain the stationary receiver field

$$
S(a)=\sum_{d\ne0}^{\rm blocks}\sigma_dK(d+a).
\tag{7}
$$

The [accepted stationary argument](smooth-two-particle-pulse-continuation.md#2-the-stationary-reference-has-a-cubic-displacement-bound) proves equality with centered cube limits, signed-coordinate symmetry, oddness and $S(0)=DS(0)=D^2S(0)=0$. Its block estimate is uniform for $|a|<1$. Define the actual source correction before summing:

$$
E_d[q](t)=\frac{K(R_d)}{D_d}-K(d+q(t)),
\qquad
\mathcal F[q]=gS(q(t))+g\sum_{d\ne0}\sigma_dE_d[q].
\tag{8}
$$

The second sum is absolute. Indeed, $|DK(x)|\le2|x|^{-3}$, every segment between $d+q(t)$ and $R_d$ stays at distance at least $r_d-2\rho$, and $|D_d^{-1}-1|\le|q'(s)|/(1-\nu)$. Therefore

$$
|E_d[q](t)|
\le\frac1{1-\nu}
\left[
\frac{2|q(s)|}{(r_d-2\rho)^3}
+\frac{|q'(s)|}{(r_d-\rho)^2}
\right],\qquad s=t-\tau_d.
\tag{9}
$$

By (2) and (5), $|q^{(k)}(s)|\le M_k e^{\beta(t-T)}e^{-\beta(r_d-2\rho)}$. The integer sup-norm shell $|d|_\infty=m$ has $24m^2+2$ labels, and $r_d-2\rho\ge(1-2\rho)m$. Consequently the shell majorant in (9) is a constant times $e^{\beta(t-T)}e^{-\beta m}(1+m^{-1})$, whose sum is finite. The convergence is uniform on the complete past and locally uniform in the displayed history bounds.

This decomposition proves that the full original block sum exists: each full block equals its stationary block plus its actual corrections, and the latter can be summed absolutely. It does not assert absolute convergence of the stationary individual rows, nor replace the infinite lattice by a finite bare lattice. The exponential factor comes from increasingly old emissions at distant sites, not from a spatial truncation or a new interaction kernel.

Differentiating in reception time uses

$$
\frac{ds}{dt}=\frac{1-n_d\cdot q'(t)}{D_d},\qquad
\left|\frac{ds}{dt}\right|\le\frac{1+\nu}{1-\nu}.
\tag{10}
$$

The differentiated correction has the same summable exponential factor, with $q''(s)$ added to the source jets. Thus the acceleration functional is continuously differentiable in time for a $C^2$ history satisfying (2). This is the regularity needed to bootstrap a $C^2$ solution to $C^3$; higher time regularity requires the corresponding source jets rather than being presumed.

## 3. The symmetry reduction is exact

An odd receiver sees the functional $\mathcal F[-q]$. Inverting $d\mapsto-d$ leaves $\sigma_d$ unchanged, reverses each geometric direction, and keeps each range, source-weight denominator and delay unchanged. The stationary part has the required inversion symmetry by the proved cube/block equality, and the source corrections may be inverted because they converge absolutely. Hence

$$
\mathcal F[-q]=-\mathcal F[q].
\tag{11}
$$

Every label therefore has acceleration $\sigma_i\mathcal F[q]$. If $q''=\mathcal F[q]$, all equations for (1) hold simultaneously. This is an invariant symmetry family of the full regular equation; environmental histories have not been held fixed.

For every signed coordinate permutation $O$, the same reasoning gives $\mathcal F[Oq]=O\mathcal F[q]$. In particular, $q(t)=x(t)e_1$ is an exact scalar reduction: coordinate reflections fixing $e_1$ force the other acceleration components to vanish. Cubic symmetry does not imply that every arbitrarily oriented vector history remains on its initial line.

## 4. A growing ancient linear mode

Linearize about $q=0$, where the stationary equilibrium has already been established. Put $n=d/r_d$ and

$$
J_d=\frac{I-3nn^{\mathsf T}}{r_d^3}.
$$

The first variation of one signed row is

$$
\sigma_dJ_dq(t)-J_dq(t-r_d)
+\frac{nn^{\mathsf T}}{r_d^2}q'(t-r_d).
\tag{12}
$$

The receiver term sums to $DS(0)q(t)=0$. On every complete Euclidean lattice shell, cubic symmetry gives $\sum nn^{\mathsf T}=(N/3)I$, so the delayed $J_d$ terms vanish. Those delayed sums are absolutely convergent for exponentially decreasing pasts, which justifies the shell regrouping. Thus

$$
Lq(t):=D\mathcal F(0)q(t)
=\frac g3\sum_{d\ne0}\frac{q'(t-r_d)}{r_d^2}.
\tag{13}
$$

For $q(t)=a e^{\lambda t}$, with a nonzero constant vector $a$ and $\lambda>0$, the linearized equation is exactly

$$
\lambda=\frac g3\sum_{d\ne0}\frac{e^{-\lambda r_d}}{r_d^2}.
\tag{14}
$$

The series and its derivative converge uniformly on compact positive $\lambda$ intervals. The right side is strictly decreasing, tends to zero as $\lambda\to\infty$, and is at least $2g e^{-\lambda}$ from the six nearest neighbors. It therefore exceeds $\lambda$ for all sufficiently small positive $\lambda$. The left side is strictly increasing. Equation (14) has exactly one positive real solution.

This is a genuine growing linear mode whose entire past tends to equilibrium. It is not a compactly started perturbation and is not yet a nonlinear trajectory reaching speed one. On the analytic coefficient $z^m=e^{m\lambda t}$, the linear residual denominator is

$$
D_m=m^2\lambda^2-\frac g3m\lambda
\sum_{d\ne0}\frac{e^{-m\lambda r_d}}{r_d^2}
\ge m(m-1)\lambda^2>0\qquad(m\ge2).
\tag{15}
$$

Thus higher positive integer multiples of this rate are not resonances. This is a useful inverse bound for a nonlinear ancient-solution construction, not proof that the ensuing growth remains small or reaches a later event.

## 5. Weighted real-history bounds for a nonlinear construction

Translate the prospective small cut to $T=0$. Define

$$
\|q\|_{2,\beta}
=\max_{0\le k\le2}\sup_{t\le0}e^{-\beta t}|q^{(k)}(t)|,
\qquad
\|f\|_{0,\beta}=\sup_{t\le0}e^{-\beta t}|f(t)|.
\tag{16}
$$

For $q$ in a sufficiently small ball of this space, the complete roots and sums above define $\mathcal F$ on a neighborhood of $q$, rather than only on one fitted curve. A direction $h\in C^2_\gamma$ changes the source emission by

$$
\delta s_d=-\frac{n_d\cdot[h(t)-\sigma_dh(s_d)]}{D_d},
\qquad
|\delta s_d|\le C\|h\|_{2,\gamma}e^{\gamma t}.
\tag{17}
$$

The effective source variations are $\sigma_d[h(s_d)+q'(s_d)\delta s_d]$ and $\sigma_d[h'(s_d)+q''(s_d)\delta s_d]$. In particular, the first derivative of the acceleration functional needs $q''$, not a third source derivative. The fixed source time differs from $t-r_d$ by at most $2\|q\|_{2,\beta}e^{\beta t}$.

Subtract the derivative at zero. Every generated term in $D\mathcal F(q)h-Lh$ then contains either an old source jet of $q$ times a current or old variation of $h$, or an old jet of $h$ times a displacement or velocity factor of $q$. At least one factor carries an exponential delay weight. Spatial kernel differentiation adds at most inverse powers of $r_d$; root and transmitter denominators have fixed positive floors. The preceding formulas and the mean-value estimates for $K$ therefore give

$$
|D\mathcal F(q)h-Lh|(t)
\le C_{\beta,\gamma}\|q\|_{2,\beta}\|h\|_{2,\gamma}
e^{(\beta+\gamma)t},
\tag{18}
$$

with a finite constant controlled by sums of $e^{-\min(\beta,\gamma)r_d}(r_d^{-2}+r_d^{-3}+r_d^{-4})$. The stationary receiver part obeys the stronger bound $|DS(q)h|\le C|q|^2|h|$. The decay and root bounds are uniform along the line segment between two histories in the small ball, so integration of (18) in the history parameter is justified.

Writing $N(q)=\mathcal F(q)-Lq$, this gives

$$
\|N(q)\|_{0,2\beta}\le C\|q\|_{2,\beta}^2.
\tag{19}
$$

For $q_j=a e^{\beta t}+w_j$ with $\|q_j\|_{2,\beta}\le\varepsilon$ and $w_j\in C^2_{2\beta}$,

$$
\|N(q_1)-N(q_2)\|_{0,2\beta}
\le C\varepsilon\|w_1-w_2\|_{2,2\beta}.
\tag{20}
$$

In fact (18) gives decay $e^{3\beta t}$ for this difference, which is bounded by $e^{2\beta t}$ on $t\le0$. Equations (19)–(20) provide the small nonlinear and Lipschitz factors needed by the separate weighted fixed-point construction. Oddness alone is not used to assert a cubic estimate in this $C^2$ topology: higher differentiability of state-dependent evaluation would need additional source regularity.

## 6. Optional analytic domain without a smooth-to-analytic inference

An independent way to control the nonlinear functional is to assume an analytic parameterization explicitly. Put $z=e^{\lambda t}$ and let

$$
q(z)=\sum_{m\ge1}q_m z^m,\qquad
\|q\|_{\mathcal A_R^1}=\sum_{m\ge1}(1+m)|q_m|R^m.
\tag{21}
$$

The scalar version including constants is a Banach algebra because $1+m+n\le(1+m)(1+n)$. Vector norms use Euclidean coefficient norms. This is an analytic-history assumption, not a conclusion drawn from a merely smooth path.

Take $\delta\le\min(1/64,1/(16\lambda))$ and $\|q\|_{\mathcal A_R^1}\le\delta$. For every $d\ne0$, write $\tau_d=r_d+\xi_d$ and solve in $\|\xi_d\|_{\mathcal A_R^1}\le8\delta$:

$$
\begin{aligned}
w_d&=z\exp[-\lambda(r_d+\xi_d)],\\
h_d&=q(z)-\sigma_dq(w_d),\\
\xi_d&=r_d\left[\sqrt{1+2d\cdot h_d/r_d^2+h_d\cdot h_d/r_d^2}-1\right].
\end{aligned}
\tag{22}
$$

The complex square root is the branch equal to one at zero; the dot product here is bilinear, not a complex-conjugate product. In this proof $K$ is extended by that same square-root branch. For real histories the extension is the original positive range.

The composition estimate follows term by term in the Banach algebra:

$$
\|q(w_d)\|_{\mathcal A_R^1}
\le\sum_{m\ge1}(1+m)|q_m|R^m
e^{-\lambda m(r_d-8\delta)}
\le\delta e^{-\lambda(r_d-8\delta)}.
\tag{23}
$$

Thus $\|h_d\|\le2\delta$. The norm of the radicand perturbation is at most $4\delta/r_d+4\delta^2/r_d^2<1$. The absolute square-root series bounds the last line of (22) by $4\delta+4\delta^2/r_d<5\delta$, strictly inside the chosen ball.

Differentiating that map in $\xi_d$ gives the decisive bound

$$
\left\|\partial_{\xi_d}q(w_d)\right\|
\le\lambda\delta\sup_{m\ge1}m e^{-\lambda m(r_d-8\delta)}
\le\frac{\delta}{e(r_d-8\delta)}.
\tag{24}
$$

The complex range gradient has norm at most $(r_d+2\delta)/(r_d-8\delta)<2$. Consequently the contraction factor is less than $2\delta/[e(1-8\delta)]<1/16$, uniformly in every lattice label. This constructs the delay as a normal analytic function of $q$ and $z$ by uniform iteration. No finite set of source delays is singled out.

The complex extension of the canonical transmitter factor is

$$
D_d=1-\sigma_d\lambda n_d\cdot w_dq_z(w_d).
\tag{25}
$$

Equations (24)–(25) put $D_d$ in the disk $|D_d-1|<1/16$, so its reciprocal is analytic. On real histories it is positive; the analytic continuation is $1/D_d$, consistent with the physical $1/|D_d|$ there. An absolute-value operation is not declared holomorphic.

Subtracting the stationary receiver row as in (8) leaves an analytic correction with a bound

$$
\|E_d[q]\|_{\mathcal A_R^1}
\le C_\lambda\delta e^{-\lambda r_d}(r_d^{-3}+r_d^{-2}).
\tag{26}
$$

For example, the source-velocity factor is bounded using $\sup_{m\ge1}m x^m\le x/(1-x)^2$ with $x=e^{-\lambda(r_d-8\delta)}$; this yields a finite $C_\lambda$ uniform in $d$. The stationary eight-source blocks converge normally on the explicit small complex ball $\|q\|\le1/64$, by their third finite-difference estimate and nonzero complex range branches there. The real receiver ball $|q|<1$ is not a claimed complex ball: a bilinear complex squared range can vanish sooner. Composition of the small-ball block field with the Banach algebra also converges normally. Therefore $\mathcal F:\mathcal A_R^1\to\mathcal A_R^1$ is analytic on a sufficiently small ball. This statement is stronger than pointwise holomorphy on each individual source row.

The odd functional identity (11) then removes quadratic terms in this analytic topology, giving $\|\mathcal F(q)-Lq\|\le C\|q\|^3$ and a derivative remainder bounded by $C\|q\|^2$ on a smaller ball. Together with (15), this supplies an alternative local coefficient-contraction route: the inverse on coefficients $m\ge2$ is bounded by $1/(2\lambda^2)$, and gains two coefficient powers. The real weighted construction need not import this analytic assumption; the two approaches have different regularity hypotheses and should retain those boundaries.

## 7. Relation to the original complete-history class

The [population class](population-history-class.md) permits bounded nonconstant histories at infinitely many labels, but its original unweighted position/velocity topology alone does not ensure convergence of the acceleration. The family above is a restricted sufficient domain inside its small-amplitude region, with extra temporal decay and staggered symmetry. It is not an open neighborhood for arbitrary independently perturbed histories in that broader topology.

A sufficiently small $C^3$ member satisfies the original class quantitatively. If $|q|\le1/16$ and $|q'|\le1/4$, distinct-label separation is at least $7/8$, every cross channel has one root with $D\ge3/4$, and each actual root has the original half-width tube $w=1/256$. Across that tube the range stays greater than $7/8-w/4>w$. Outside it the residual has magnitude at least $3w/4>w/4$. The self residual is at least $3\tau/4$, which supplies both the normalized self margin and the ordinary complement margin beyond $2w$. The density estimates follow from the same displacement-bound cube count. The target displacement envelope is automatically satisfied.

For a nonlinear $C^2$ solution with the weighted estimates, differentiation of the absolutely convergent field using (10) yields $q'''$ with exponential decay. One must perform this bootstrap before claiming the original $C^3$ class. Moving the chosen terminal cut far enough into the ancient tail then makes displacement, speed, acceleration and jerk uniformly smaller than the unchanged ceilings $1/16$, $4$, $256$ and $65536$, respectively. This is a new history-domain verification. It is not an invocation or extension of the earlier finite-disturbance continuation lemma.

## 8. Conditional transfer if this new branch reaches wake speed

Suppose a self-consistent staggered solution is later shown to have a first time $t_*$ with $|q'(t_*)|=1$, finite incoming acceleration trace and

$$
q'(t_*)\cdot q''(t_*^-)>0,
\qquad
\sup_{t\le t_*}|q(t)|\le\rho<1/2.
\tag{27}
$$

All labels then reach unit speed simultaneously because their velocities are $\sigma_iq'$. This fact alone does not obstruct the local event argument. On any proposed uniform post-event position neighborhood with radius $B<1/2$, every distinct-label causal range is at least $1-2B$. At sufficiently early post-event receptions, all cross emissions remain a fixed positive time before $t_*$. Those bounded pre-event source intervals have a strict speed margin; arbitrarily old emissions retain the exponential tail. Equations (8)–(10), applied to that fixed prefix, give a bounded continuous complete cross contribution despite the infinitely many nonconstant labels.

The incoming bounded remote past also excludes arbitrarily old self roots near the event: their delays grow without bound while their chord lengths remain bounded. The strict incoming subunit chord inequality excludes the remaining roots away from zero delay. Exact stationarity at a finite remote time is unnecessary for these two facts.

For any chosen identity, the incoming unit vector is $e_i=\sigma_iq'(t_*)$ and its cross trace satisfies $e_i\cdot R_i(t_*)=q'(t_*)\cdot q''(t_*^-)>0$. The [direct event-measure obstruction](smooth-two-particle-event-measure-independent-adjudication.md) therefore transfers conditionally, with its uniform population neighborhood and positive-incidence hypotheses retained. It excludes the same finite bounded-variation direct-measure continuation if (27) is first established. No previous event time, finite-core source census or supplied-pulse numerical certificate is being reused to establish (27).

## 9. Evidence, remaining obligation and falsifiers

The mathematical controls are the complete subunit residual estimate, the stationary cube/block equality, the exact shell tensor identity, the positive characteristic series, the Banach-algebra composition estimate and the explicit small complex root contraction. No physical simulation, new regulator or altered summation prescription was used.

The nonlinear ancient-branch construction is assessed separately from this supporting domain audit. The remaining event question requires following such a branch with complete source histories until a transverse unit-speed event or an earlier genuine obstruction is proved. The growing linear mode by itself cannot decide that future. The domain results would be falsified by a source correction violating (9), an omitted subunit causal root, a failure of original-block symmetry after the stated decomposition, a nonzero shell sum of $I-3nn^{\mathsf T}$, or a failure of the explicit analytic contraction or weighted first-variation estimates. Abandoning exponential past decay or allowing arbitrary independent remote histories leaves this domain rather than falsifying it.

Input hashes, exact input and source snapshots, and presentation-check evidence are retained under `.local-data/master-equation-closure/incoming-reachability/domain/`. Prior sources and accepted certificates are preserved. Independent mathematical review accepted the weighted real estimates, original-block convergence, root and regularity verification, small-complex-ball analytic construction and conditional event transfer at their stated scopes. No later wake-speed event is established by that acceptance.
