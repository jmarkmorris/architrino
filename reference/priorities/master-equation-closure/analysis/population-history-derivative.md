# Full-history sensitivity and the population obstruction

## Result and acceptance scope

The reviewed complete-past class supports a full derivative of each regular acceleration contribution and of every finite retained sum. The derivative includes the change of emission time and the resulting change in sampled source velocity through the source's prescribed acceleration. Uniformly small relative history perturbations preserve a complete root census with relaxed common margins. Neither result supplies a bounded derivative of the infinite population update in the reviewed uniform position/velocity norm.

There is an explicit obstruction at the existing stationary lattice. Perturbations supported on finitely many distant source histories can keep their emission positions and causal roots unchanged while changing their emission velocities. Their acceleration variations have a common positive projection. The operator norms of finite distant sums grow at least linearly with distance. More strongly, a sequence of admissible finite-support history perturbations tends to zero in the reviewed norm while its acceleration increments stay bounded away from zero. Therefore even a continuous extension of the stationary complete-block sum, agreeing with the canonical effect of finite source modifications, is impossible on this class in this topology.

This is current [effort 2](../work-queue.md#effort-contracts). It consumes the unchanged [population class](population-history-class.md) and [independent adjudication](population-independent-adjudication.md). The finite-root derivative and obstruction below have claim grade `derived`; they are submitted for independent mathematical adjudication, not represented as already independently accepted. The numerical checks in the evidence record concern finite regular cases only. No class amendment, physical partition, coupled EOM future, coordinate-contact conclusion, or self-birth theorem is supplied.

## Fixed domain and meaning of the norm

Set wake speed $c_f=1$ and reception time to zero. Labels are $a\in\mathbb Z^3$, anchors are $\mathbf z_a=\ell a$ with $\ell=L/100>0$, and charges are fixed at $q_a=q_0(-1)^{a_1+a_2+a_3}$, where $q_0>0$. Coupling is $\kappa>0$. Labels $0,e_1$ are the targets. Complete pasts $\mathbf X_a(s)$, $s\le0$, have environmental displacement at most $b=\ell/16$ and target displacement at most $B=4\ell$. All histories are $C^3$, with bounds $V_*=4$, $A_*=256/\ell$, and $J_*=65536/\ell^2$ on their first, second, and third time derivatives. Release separation is at least $d_*=\ell/8$ for distinct labels. The acceleration $\mathbf A_a^{\rm hist}=\ddot{\mathbf X}_a$ in these assumptions is a derivative of prescribed input, not an assertion that the past solves the EOM.

For two admitted histories, write their difference as $\mathbf h=\widetilde{\mathbf X}-\mathbf X$ and set

$$
p=\sup_{a,s\le0}\frac{\|\mathbf h_a(s)\|}{\ell},\qquad
v_h=\sup_{a,s\le0}\|\dot{\mathbf h}_a(s)\|,\qquad
\varepsilon=\|\mathbf h\|_{\mathcal H}=p+v_h.
$$

The ambient space consists of bounded $C^1$ displacement differences, with uniformly bounded continuous first derivatives. The reviewed class is a constrained relative subset of this space. A derivative on that relative subset means a bounded linear first-order expression whose remainder divided by $\|\mathbf h\|_{\mathcal H}$ tends to zero along admissible differences. It does not assert that arbitrary ambient perturbations preserve the $C^3$ constraints. An operator norm is the supremum of output magnitude over input directions of norm at most one. Testing admissible one-parameter directions is enough to disprove a proposed bounded derivative.

For receiver $i$ and source $j$, positive delay $\tau=-s$ has residual

$$
f_{ij}(\tau)=\tau-\|\mathbf X_i(0)-\mathbf X_j(-\tau)\|.
$$

Every positive root has a disjoint centered tube of half-width $w=\ell/256$, entirely in positive delay. Throughout the tube, range is at least $w$ and the signed transmitter factor has magnitude at least $\delta=1/4$. Ordinary complements have residual magnitude at least $\gamma=w/4$. For self channels the near-diagonal sector $0<\tau\le\tau_0=2w$ instead has $|f_{ii}(\tau)|\ge\eta\tau$, with $\eta=1/4$, and no root tube meets that sector. The exact zero-delay diagonal has no assigned acceleration. The class implies at most $M=2050$ positive roots per channel; these are all complete-past roots, not a finite-memory selection.

No polarity-moment, symmetry, or interlabel constraint is added to the perturbations. In particular the old times sampled by remote sources receive the same norm weight as recent times.

## Full derivative on one simple root

Fix a named positive-delay root at emission time $s$. A history variation moves both its source position and its selected emission time. Define the unperturbed displacement, range, direction, source velocity, source acceleration, and transmitter factor by

$$
\mathbf R=\mathbf X_i(0)-\mathbf X_j(s),\quad
r=\|\mathbf R\|=-s,\quad
\mathbf n=\mathbf R/r,\quad
\mathbf V=\dot{\mathbf X}_j(s),\quad
\mathbf A=\ddot{\mathbf X}_j(s),\quad
D=1-\mathbf n\cdot\mathbf V.
$$

The canonical regular row is $\mathbf a=C\mathbf n/(r^2|D|)$, with fixed signed coefficient $C=\kappa q_iq_j$. Let $\mathbf q=\mathbf h_i(0)-\mathbf h_j(s)$ denote the direct position variation at the old time, and let $\mathbf P=\mathbf I-\mathbf n\otimes\mathbf n$ be the orthogonal projection perpendicular to the emission direction. The symbol $\mathbf q$ is a displacement variation; the scalar $q_j$ remains the fixed source charge.

Differentiate the range-plus-emission-time constraint $\|\mathbf X_i(0)-\mathbf X_j(s)\|+s=0$. Its signed derivative in $s$ is $D$. The complete first variations are

$$
\begin{aligned}
\sigma:=\delta s&=-\frac{\mathbf n\cdot\mathbf q}{D},\\
\mathbf U:=\delta\mathbf R&=\mathbf q-\mathbf V\sigma,\\
\delta r&=\mathbf n\cdot\mathbf U=-\sigma,\\
\delta\mathbf n&=\frac{\mathbf P\mathbf U}{r},\\
\delta\mathbf V^{\rm effective}&=\dot{\mathbf h}_j(s)+\mathbf A\sigma,\\
\delta D&=-\mathbf V\cdot\delta\mathbf n
-\mathbf n\cdot\big(\dot{\mathbf h}_j(s)+\mathbf A\sigma\big).
\end{aligned}
$$

The equality $\delta r=-\sigma$ also follows by differentiating $r=-s$ at fixed reception. The term $\mathbf A\sigma$ samples the original source velocity at its shifted emission time. It cannot be omitted merely because the original acceleration row contains velocity rather than source acceleration. There is no direct receiver-velocity term at fixed reception time. For a positive-delay self root, $\mathbf h_i(0)$ and $\mathbf h_i(s)$ belong to the same varied function; the formulas retain both evaluations.

On this tube the sign of $D$ is fixed, so $\delta|D|/|D|=\delta D/D$. Differentiating all three factors gives

$$
\boxed{
\mathcal L_{ijb}[\mathbf h]
=\delta\mathbf a
=\frac{C}{r^2|D|}
\left[
\delta\mathbf n-\mathbf n\left(\frac{2\delta r}{r}+\frac{\delta D}{D}\right)
\right].
}
$$

This expression includes direction, inverse-square dilution, and the absolute transmitter weight, as well as every history evaluation that changes them. It reduces to the [MEC-006 receiver tensor](receiver-wake-gradient-closure.md#complete-one-root-receiver-gradient) when the source history is held fixed. That reduction checks a finite regular restriction; MEC-006 alone establishes neither the relative history remainder nor infinite-sum differentiability. Receiver playback $D_r/D$ is a different derivative and does not multiply this acceleration.

### A uniform row bound and the relative remainder

Write $K=1+V_*/\delta=17$. The first-variation formulas imply

$$
|\sigma|\le\frac{2\ell p}{\delta},\qquad
\|\mathbf U\|\le2\ell pK,\qquad
|\delta D|\le\frac{2\ell pV_*K}{r}+v_h+\frac{2\ell pA_*}{\delta}.
$$

The derivative of $\mathbf R/\|\mathbf R\|^3$ has operator norm $2/r^3$: its eigenvalues are $-2/r^3$ radially and $1/r^3$ transversely. Applying that exact bound and then differentiating $1/|D|$ yields

$$
\|\mathcal L_{ijb}[\mathbf h]\|
\le |C|\left[
\frac{2\ell pK(2/\delta+V_*/\delta^2)}{r^3}
+\frac{v_h/\delta^2+2\ell pA_*/\delta^3}{r^2}
\right]
=\kappa q_0^2\left[
\frac{2448\ell p}{r^3}
+\frac{16v_h+32768p}{r^2}
\right].
$$

This is a finite-row bound with constants common to the class. It is not a summable population majorant. The inverse-square terms include the direct source-velocity variation and moving-time source acceleration. The obstruction below proves actual failure of a tail estimate, independently of this upper bound.

The regularity assumptions justify first order in the relative norm. For an admissible difference, $\|\mathbf h^{(3)}\|_\infty\le2J_*$. A backward difference quotient for $\dot{\mathbf h}$ over any interval of length $t>0$ in the complete past gives

$$
\|\ddot{\mathbf h}\|_\infty\le\frac{2v_h}{t}+J_*t,
\qquad
\|\ddot{\mathbf h}\|_\infty\le2\sqrt{2J_*v_h}.
$$

The second inequality follows by choosing $t=\sqrt{2v_h/J_*}$; the zero case follows by continuity. The availability of the entire earlier past makes the backward interval legal even at release. Root persistence, proved next, gives $|\Delta s|=O(\varepsilon)$ uniformly. Taylor expansion of the causal residual then gives $\Delta s=\sigma+O(\varepsilon^2)$: source position has uniformly bounded acceleration, the direct perturbation is Lipschitz with constant $v_h$, and the range stays above a common positive floor. Expanding the sampled velocity adds the remainders

$$
\|\dot{\mathbf h}_j(s+\Delta s)-\dot{\mathbf h}_j(s)\|
\le2\sqrt{2J_*v_h}\,|\Delta s|,
\qquad
\|\mathbf V_j(s+\Delta s)-\mathbf V_j(s)-\mathbf A\Delta s\|
\le\tfrac12J_*|\Delta s|^2.
$$

They are $O(\varepsilon^{3/2})$ and $O(\varepsilon^2)$ respectively. Smooth range, direction, and inverse-transmitter factors on the relaxed chart preserve an $O(\varepsilon^{3/2})$ row remainder, with constants depending only on the declared floors and derivative bounds. Thus the boxed linear expression is a relative first-order derivative for each matched row, uniformly over rows in the coarse positive-range bound. Every finite root sum may be differentiated term by term; summing infinitely many such remainders is not licensed.

Claim grade: derived. Falsifiers: a regular admissible finite-root variation contradicting the boxed chain rule or a sequence of admissible differences with a row remainder not $o(\|\mathbf h\|_{\mathcal H})$ despite the displayed uniform bounds. The numerical moving-source control in the evidence record tests the first falsifier at bounded scope.

## Uniform complete root persistence and its boundary

At the same delay, changing the two positions gives $|\widetilde f-f|\le2\ell p$. On an old tube the range remains at least $w/2$ if $2\ell p<w/2$. The unit-vector comparison $\|\widetilde{\mathbf n}-\mathbf n\|\le2\|\widetilde{\mathbf R}-\mathbf R\|/\|\mathbf R\|$ gives

$$
\|\widetilde{\mathbf n}-\mathbf n\|\le4\ell p/w,
\qquad
|\widetilde D-D|\le16\ell p/w+v_h.
$$

The sufficient conditions

$$
2\ell p<w/2,\quad
16\ell p/w+v_h<\delta/2,\quad
2\ell p<\gamma/2,\quad
v_h<\eta/2,\quad
2\ell p/\delta<w/4
$$

hold, for example, whenever $\varepsilon<1/65536$. Old tube endpoints have opposite residual signs with magnitude at least $\delta w$; the residual perturbation is smaller than that endpoint margin. Each old tube therefore retains exactly one root, since its transmitter factor retains its sign and magnitude at least $\delta/2$. At the new root the old residual has magnitude at most $2\ell p$, so the old slope floor bounds the root shift by $2\ell p/\delta<w/4$. All old ordinary complements keep residual magnitude at least $\gamma/2$, excluding every additional root there, including at arbitrarily old delays.

The self near-diagonal sector needs its own estimate. Because the same history is evaluated twice, $\|\mathbf h_i(0)-\mathbf h_i(-\tau)\|\le\tau v_h$. Consequently

$$
|\widetilde f_{ii}(\tau)|\ge(\eta-v_h)\tau\ge\eta\tau/2
\qquad(0<\tau\le\tau_0).
$$

Recenter each new root tube with half-width $w/2$. The shifted tube lies inside its old tube. Outside the new tube but inside the old one, the perturbed slope floor yields residual magnitude at least $\delta w/4$. A common relaxed chart therefore has range floor $w/2$, transmitter floor $\delta/2$, ordinary complement gap $\min(\gamma/2,\delta w/4)$, and normalized self margin $\eta/2$. Its root multiplicity is exactly the old channel multiplicity, at most $M$. Shrinking the tubes also preserves their separation from the self sector: each new tube boundary moves inward by more than its possible root-center shift.

These are uniform estimates across receivers, labels, and their complete-past roots at release. They do not retain every exact original class constant for arbitrary perturbations. Such a claim needs uniform slack in the displacement, derivative, separation, original-width tube, transmitter, complement, and tube-spacing inequalities. Pointwise strict inequalities indexed by infinitely many sources need not have a positive common slack. The $C^3$ class is also not open in the ambient $C^1$ norm. The local result is therefore explicitly relative, with relaxed margins.

Folds where $D=0$, positive-length root intervals, root births at the excluded diagonal, and unbounded multiplicity are outside this chart. They cannot arise within the stated matched relative neighborhood because the tubes and complete complements exclude them. This does not define their acceleration or continuation when a future history leaves the chart. In particular, no positive-time preservation theorem is inferred from these estimates at release.

Claim grade: derived. Falsifier: an admissible perturbation satisfying all five smallness conditions that loses a named tube root, creates a complement root, or violates a stated relaxed floor. Failure of an exact saturated original inequality does not falsify the relaxed theorem.

## Admissible distant perturbations defeat the operator tail

The existing stationary control is $\mathbf X_a^0(s)=\mathbf z_a$. Take receiver $i=0$, let $\mathbf e=(1,0,0)$, and consider the finite spherical lattice shell

$$
S_R=\{j\in\mathbb Z^3:R\le d_j<2R\},\qquad
d_j=\|\mathbf z_j\|,\quad
\mathbf n_j=-\mathbf z_j/d_j,\quad
\chi_j=(-1)^{j_1+j_2+j_3},
\qquad R\ge40\ell.
$$

The shell excludes both targets. Its stationary roots are exactly $s_j=-d_j$. The proof needs the independent bumps already permitted by the reviewed class, placed at these different old emission times. A common-time bump would eventually miss every distant emission and would not test the required operator tail. To make that translation and the derivative values explicit, use the compact $C^3$ profile

$$
\psi(t)=
\begin{cases}
t(1-t^2)^4,& |t|<1,\\
0,& |t|\ge1.
\end{cases}
\qquad \psi(0)=0,\quad\psi'(0)=1.
$$

Its first three derivatives join continuously to zero at each endpoint because of the fourth-order zero. Polynomial differentiation gives the conservative bounds $\|\psi\|_\infty\le1$, $\|\psi'\|_\infty\le80$, $\|\psi''\|_\infty\le384$, and $\|\psi'''\|_\infty\le1728$. For the last three bounds one may sum the absolute coefficients of the corresponding differentiated polynomial on $[-1,1]$. Define one direction, depending on the shell, by

$$
\mathbf h_j^{R}(s)=
\begin{cases}
\ell\chi_j(\mathbf n_j\cdot\mathbf e)\mathbf n_j
\psi\big((s+d_j)/\ell\big),&j\in S_R,\\
\mathbf0,&j\notin S_R.
\end{cases}
$$

Then $\|\mathbf h^R\|_{\mathcal H}\le81$, uniformly in $R$. At the sampled emission time its position variation vanishes and its velocity variation is $\chi_j(\mathbf n_j\cdot\mathbf e)\mathbf n_j$. All release positions and velocities remain stationary because the support is earlier than zero. These are histories of the same labels with unchanged charges, not new sources or an altered population partition.

### Admission with uniform slack

For every shell and $|\theta|\le1/1024$, set $\mathbf X^{R,\theta}=\mathbf X^0+\theta\mathbf h^R$. Displacement is at most $\ell|\theta|<\ell/16$, speed at most $80|\theta|<1/4$, acceleration of input at most $384|\theta|/\ell<256/\ell$, and jerk at most $1728|\theta|/\ell^2<65536/\ell^2$. The targets stay stationary; distinct-label release separation is exactly its lattice value, at least $\ell$.

For every receiver label at release and every distinct source, range at any sampled past time is at least $\ell-\ell|\theta|>w$. The source speed bound makes $f(\tau_2)-f(\tau_1)\ge(3/4)(\tau_2-\tau_1)$ for $\tau_2>\tau_1$, by the reverse triangle inequality. Thus there is exactly one cross root, its delay exceeds $\ell-\ell|\theta|>w$, the entire width-$w$ tube is regular, and its outside complement has gap at least $3w/4>\gamma$. Every self residual satisfies $f_{ii}(\tau)\ge3\tau/4$ and has no positive root; the ordinary self complement has gap at least $3\tau_0/4>\gamma$. This verifies all channels, including unperturbed receivers exposed to modified sources. The displacement-derived density bounds follow without any moment assumption.

The perturbations therefore belong to the exact reviewed class with common slack; no relaxed admission or stronger topology is being used to create the obstruction. They prescribe only the past. The speed below $1/4$ is a property of these witnesses, not a restriction on the full class.

### A growing lower bound, not a divergent upper majorant

At the stationary base, $D=1$, $\mathbf V=\mathbf A=\mathbf0$, and the selected variations obey $\mathbf q=0$, so $\sigma=\mathbf U=0$. The full derivative reduces exactly to the transmitter-velocity term

$$
\mathcal L_{0j}[\mathbf h^R]
=\kappa q_0^2\frac{\mathbf n_j(\mathbf n_j\cdot\mathbf e)}{d_j^2}
\qquad(j\in S_R).
$$

Alternating polarity has canceled against the chosen perturbation sign. Each projection on $\mathbf e$ is nonnegative. Coordinate permutation symmetry of the spherical lattice shell and $\sum_{k=1}^3 n_{j,k}^2=1$ give an exact finite identity,

$$
\sum_{j\in S_R}\frac{(\mathbf n_j\cdot\mathbf e)^2}{d_j^2}
=\frac13\sum_{j\in S_R}\frac1{d_j^2}
\ge\frac{\pi}{3}\ell^{-3}R.
$$

The last step uses the reviewed stationary shell count $|S_R|\ge4\pi\ell^{-3}R^3$ and $d_j<2R$. Hence

$$
\left\|\sum_{j\in S_R}\mathcal L_{0j}\right\|_{\mathcal H\to\mathbb R^3}
\ge\frac{\pi\kappa q_0^2}{243}\ell^{-3}R.
$$

This is a lower bound for actual finite derivative operators, obtained from admissible tangent directions of uniformly bounded norm. It diverges as the shell recedes. Operator-norm convergence would require the norms of these distant finite tails to tend to zero.

The same test works with complete blocks of the reviewed eight-source partition. Let $\mathcal C_R$ be the finite set of blocks containing at least one label in $S_R$. Their centers have distance between $R-a$ and $2R+a$, where $a=\sqrt3\ell/2$. On the direction $\mathbf h^R$, every extra label in those blocks has zero derivative at receiver zero. The derivative of their complete-block sum is therefore exactly the displayed shell derivative. Complete blocks lying between inner radius $R-2a$ and outer radius $2R+2a$ also include all of $\mathcal C_R$ and add only zero variations. Thus radial complete-block partial derivatives fail the operator-norm Cauchy criterion as well. No splitting of a block is necessary for this conclusion.

Claim grade: derived. Falsifier: failure of the exact stationary derivative projection, the shell symmetry identity, or admission of the displayed directions. A small signed sum for unperturbed blocks does not test this derivative assertion, since the perturbations do not preserve their cancellation moments.

## Stronger obstruction: failure of continuity under finite changes

Every member $\mathbf X^{R,\theta}$ modifies finitely many source histories, so at receiver zero its complete-block sum exists: outside finitely many blocks it is identical to the convergent stationary block series. Its acceleration increment is therefore an ordinary finite sum, independent of any subsequent permutation of those complete blocks.

For a perturbed source $j\in S_R$, the position at $s_j=-d_j$ is unchanged exactly, not merely to first order. Monotonicity makes this the unique root. Its direction and range remain $\mathbf n_j,d_j$, but its transmitter factor is

$$
D_j^{R,\theta}=1-\theta\chi_j(\mathbf n_j\cdot\mathbf e)>0.
$$

Write $\mathcal A_0$ for the complete-block acceleration on the stationary control and these finite modifications. Exact subtraction, without a Taylor remainder, gives

$$
\mathbf e\cdot\big[\mathcal A_0(\mathbf X^{R,\theta})-\mathcal A_0(\mathbf X^0)\big]
=\kappa q_0^2\theta
\sum_{j\in S_R}
\frac{(\mathbf n_j\cdot\mathbf e)^2}
{d_j^2\big[1-\theta\chi_j(\mathbf n_j\cdot\mathbf e)\big]}
\ge\frac{\pi\kappa q_0^2\theta}{3(1+\theta)}\ell^{-3}R
\quad(0<\theta\le1/1024).
$$

Now take $R_m=2^m\ell$ for integers $m\ge10$ and $\theta_m=\ell/R_m=2^{-m}$. All these histories are admitted, while

$$
\|\mathbf X^{R_m,\theta_m}-\mathbf X^0\|_{\mathcal H}
\le81\ell/R_m\longrightarrow0,
\qquad
\mathbf e\cdot\big[\mathcal A_0(\mathbf X^{R_m,\theta_m})-\mathcal A_0(\mathbf X^0)\big]
\ge\frac{\pi\kappa q_0^2}{6\ell^2}>0.
$$

This proves discontinuity at the stationary member even on a subset where every complete-block sum exists. It also proves failure of a locally Lipschitz estimate and of a bounded relative derivative for any extension agreeing with those sums. More generally, the contradiction applies to any chosen stationary summation value whose response to a finite source modification equals the finite sum of the canonical row changes. A rule that changes untouched contributions in response to a finite modification would need an additional prescription; this analysis has not supplied one.

The earlier stationary absolute-source obstruction and this result answer different questions. The former rules out arbitrary individual-source ordering. Here even one fixed, convergent stationary grouping has no continuous extension to all the independent history perturbations already admitted. The argument neither proves that every single nonstationary complete-block series diverges nor rules out a separately amended population class.

Claim grade: derived. Falsifier: an error in the exact unchanged-root row subtraction, or failure of any member of the displayed sequence to satisfy the admission conditions. A continuous extension agreeing with all these finite increments would contradict the positive lower bound directly.

## Proposed integration and remaining decision

Proposed coordinator text: “Current effort 2 derives the full finite-root history sensitivity, including sampled source acceleration times moving emission time, and quantitative uniform relaxed root/complement persistence. It returns an admissible obstruction to the population derivative in the reviewed independent-source uniform position/velocity norm: stationary emission-centered velocity perturbations produce finite complete-block derivative tails growing at least linearly with cutoff radius. An exact finite-modification sequence tends to zero in that norm while its acceleration change stays bounded away from zero, excluding even a continuous finite-modification-consistent extension at the stationary member. Exact class constraints hold with common slack for these witnesses. No coupled population EOM or contact/self-birth consequence is accepted.”

The compatible sum-and-derivative premise for the coupled-evolution effort cannot be supplied on this unchanged domain in this norm. The sum worker's separate ordering result remains its own obligation; this obstruction does not depend on editing or assuming that worker's conclusion. A proposed repair must explicitly change an assumption: restrict the allowed histories and their tangent directions with justified delayed cancellation constraints, change the norm to control accumulated distant variations, or supply a different update/summation prescription that explains finite modifications. These are amendment options, not adopted conditions, and no sufficiency theorem is claimed for any of them. Equal-time stationary moments alone do not control the velocity perturbations used here.

Independent adjudication should first check all-channel admission, the exact finite increment, and the shell symmetry lower bound. No population simulation or new prescribed geometry is needed to test that proof. Root births, folds, unbounded multiplicity, coupled future preservation, and distinct-label contact remain with their existing owners.

## Frozen inputs and validation record

The following files were copied to `.tmp/population-history-derivative/frozen/` and hashed before authoring the derivation or running a candidate check. Their live files and frozen copies remain read-only inputs. The stationary reference, the independently adjudicated count, and the separately authored regular evaluator are kept distinct from the new derivative calculation.

| Input | SHA-256 |
| --- | --- |
| `population-history-class.md` | `dbe3b4f14a7253747863a4d3979aaf3b43d24b6eb1843b3264d11e2640184c2e` |
| `population-independent-adjudication.md` | `3a816dd737b6517e8e4e0839314604bbb144c2dcd718a3ebb753b1250fb131d9` |
| `receiver-wake-gradient-closure.md` | `b570f79f1c276a8ff3652c5d1d31885e213ff6128759886db411faccfb071339` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |
| `scripts/equation-mapping/verify-receiver-wake-gradient.mjs` | `f62d06f094be9f85cf9b8018e20fce8332d07285f0d66548aa0f3193c4a2bd9d` |

The scratch check `node .tmp/population-history-derivative/verify.mjs known` was run first. It imports the frozen, separately authored evaluator through an export-access adapter; the evaluator's canonical row and bracketed root routines are unchanged and do not import the candidate derivative. Its static source at zero and receiver at range two returned the radial derivative $-0.25000000125022237$, against the exact inverse-square reference $-1/4$, within $1.3\times10^{-9}$. That known-case pass was recorded before the target run.

Then `node .tmp/population-history-derivative/verify.mjs target` checked the existing circular source geometry with simultaneous direct receiver and source-history variations. It uses radius $0.7$, angular speed $0.4$, the existing root $s=-1.1$, and direction $(0.4,-0.3,\sqrt{0.75})$, with $c_f=1$. Direct perturbations are receiver vector $(0.2,-0.3,0.1)$ and source history $(0.1\sin s,0.07\cos s,0.03\sin 2s)$. Centered differences of newly solved canonical rows at steps $10^{-3}$, $3\times10^{-4}$, $10^{-4}$, and $3\times10^{-5}$ had vector errors $9.02\times10^{-8}$, $8.12\times10^{-9}$, $9.01\times10^{-10}$, and $8.00\times10^{-11}$ against the complete derivative. Omitting sampled source acceleration changed the derivative by $0.01346$, so this term is materially exercised. The same unchanged evaluator checked an emission-centered pulse at range two and amplitude $0.001$: it retained root $-2$ to $10^{-13}$ and returned the exact acceleration $-1/[4(1-0.001)]$ to $10^{-13}$.

Claim grade: measured by the named scratch adapter and frozen evaluator on those finite regular controls. These measurements check transcription and implementation of local formulas; the circular control is not an infinite population member, and the checks do not independently adjudicate the infinite theorem. Its evidence is the explicit analytical admission and lower-bound proof above. A failed rerun within the stated tolerances would overturn the numerical validation claim.

Only this analysis and its assigned scratch directory are authored by this effort. Shared queue, priorities, brainstorming, work log, synthesis, and sibling worker outputs are not edited. No Python, generated write, Git index/publication operation, EOM evolution run, or downstream dispatch is used.

Before target syntax inspection, `node .tmp/population-history-derivative/check.mjs known` passed the known two-formula/one-file-link case, ignored fenced dollar text, and rejected an invalid macro and trailing whitespace. This checker is a task-local adaptation of the earlier adjudication's syntax checker; it supplies no mathematical acceptance.

Final measured checks: `node .tmp/population-history-derivative/check.mjs target` passed 188 KaTeX expressions, four relative file targets, balanced dollar delimiters, and absence of trailing whitespace in this document. The link check covers file existence, not anchor resolution or browser layout. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/population-history-derivative.md` emitted no whitespace diagnostic and returned 1 for the new-file difference. `node scripts/validate-content.mjs --check --strict` passed its repository content audit with zero errors, zero warnings, and 30 notes. Final `shasum -a 256` on all five live inputs returned the frozen digests displayed above. These checks establish syntax, the validator's scoped content rules, and input byte identity, not independent acceptance of the population proof.
