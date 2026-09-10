# Independent adjudication of the population admissibility proposal

## Disposition and the finite-perturbation distinction

The [proposal](population-admissibility-proposal.md) is **accepted as a sufficient mathematical construction on its stated relative history domain**: the integrable distant-past envelope, summable persistent deviations, and fixed eight-source stationary reference give finite accelerations, a bounded relative derivative, and the asserted uniform tails. The power threshold is strictly $p>1$ for the broad independent-history envelope family. The existing pulse controls reject $0\leq p\leq1$, including continuity in the endpoint topology. These are conditional mathematical results; the proposed domain and topology are not adopted as physical assumptions.

The operator's distinction is essential: **these extra assumptions are not needed merely to evaluate a stationary lattice with a fixed finite set of modified complete histories.** That control already has the convergent stationary reference plus finitely many canonical source corrections. On a fixed finite support, the proposed norm and the original uniform norm are equivalent, so the accepted growing-shell discontinuity sequence does not establish discontinuity for two fixed modified particles. Its number of independently prescribed sources grows without bound. The infinite signed-divergent witness independently prescribes pulses at infinitely many different old emission times. Neither witness proves that a coupled EOM evolution initiated by two changed particles produces those histories.

For the existing stationary control, Section 2 also proves that the selected complete-block acceleration is zero at every anchor. The proof establishes equality with symmetric finite cubes by an explicit decaying boundary estimate; it does not assume equality of arbitrary groupings. Zero stationary acceleration is compatible with divergent sums of individual-source norms.

No mutually evolving population, positive common lifespan, preservation of the entire regular chart, or singular event follows. The proposal's finite-continuation estimate preserves a past-asymptotic condition only. Compatibility of prescribed acceleration and jerk at the release cut remains a separate condition. The strongest immediate consequence for the intended finite-perturbation control is to retain it as an available regular summation problem, without inferring its future failure from the larger history-space counterexamples.

The subject and seven mathematical references were frozen before reconstruction. The references are the [population class](population-history-class.md), its [adjudication](population-independent-adjudication.md), the [summation subject](population-delayed-summation.md), the [derivative subject](population-history-derivative.md), their [summation](population-summation-independent-adjudication.md) and [derivative](population-derivative-independent-adjudication.md) adjudications, and the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md). None is edited. The coordinator owns shared tracking and integration.

## 1. Domain, topology, and canonical inputs

Set $c_f=1$ and the reception cut to zero. Labels are $j\in\mathbb Z^3$, anchors are $\mathbf z_j=\ell j$, and polarity signs are $\sigma_j=(-1)^{j_1+j_2+j_3}$. Write $G=\kappa q_0^2>0$ and $\mathbf u_j(s)=\mathbf X_j(s)-\mathbf z_j$ for the complete past $s\leq0$. The original class supplies the common displacement bound $B=4\ell$, the smaller environmental bound $\ell/16$, uniform derivatives through order three, positive-range simple-root tubes, transmitter floors, and complete ordinary and normalized self complements. Its conservative channel count is $M_{\mathrm{root}}=2050$. The zero-delay diagonal remains unresolved and is never inserted as an acceleration row.

For $p>1$, define $a_p(s)=(1+|s|/\ell)^{-p}$. The added admission hypothesis is

$$
\sum_{m=0}^3\ell^{m-1}\|\mathbf u_j^{(m)}(s)\|
\leq A a_p(s)+b_j,
\qquad
A\geq0,quad b_j\geq0,quad A+\sum_jb_j\leq M
$$

The budget $M$ is fixed for a relative local estimate. The proposed domain is the union over finite budgets. The envelope constrains admitted histories; it does not multiply the acceleration by a decay factor or remove old roots. The $b_j$ are summability allowances, not charge, density, probability, or account weights.

For a history difference $\mathbf h$, let $N_p(\mathbf h)$ be the infimum of $A_h+\sum_jc_j$ over nonnegative envelopes satisfying

$$
\frac{\|\mathbf h_j(s)\|}{\ell}+\|\dot{\mathbf h}_j(s)\|
\leq A_h a_p(s)+c_j
$$

Adding feasible envelopes proves the triangle inequality, and rescaling proves homogeneity. Each separate uniform supremum of position or velocity is bounded by any feasible budget, so

$$
\|\mathbf h\|_{\mathcal H}\leq2N_p(\mathbf h)
$$

Here $\|\cdot\|_{\mathcal H}$ is the original sum of the two uniform suprema. This proves definiteness and imports the frozen relative root-persistence estimates for sufficiently small $N_p$. Infima need not be attained: for nonzero $\varepsilon=N_p(\mathbf h)$, a feasible budget below $2\varepsilon$ suffices. Zero norm means zero history difference.

These observations verify the proposal's distinction between domain, topology, and summation. A stronger topology cannot make a divergent series finite on a history still in the domain. Removing the infinite divergent witness alone leaves the original finite-shell continuity obstruction in the old topology. The proposal both excludes some histories and changes which admitted sequences converge, while retaining one specified stationary summation reference.

**Claim grade: derived for the norm and logical distinctions; guessed for physical selection of the additional envelope.** Falsifier: a nonzero difference with zero proposed norm, or a feasible envelope violating the displayed comparison. No completeness or open-domain theorem for a $C^3$ subset of a $C^1$ space is inferred.

## 2. Stationary cancellation and its summation scope

Let $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$. The fixed blocks are $P_n=\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$. Their alternating signs make the stationary sum a mixed third finite difference of $\mathbf K$. Three applications of the fundamental theorem of calculus give a cube integral of its mixed third derivative. More generally, for the $k$th receiver derivative and a block at large distance $R$,

$$
\left\|D^k_{\mathbf x}\sum_{j\in P_n}G\sigma_i\sigma_j\mathbf K(\mathbf x-\mathbf z_j)\right\|
\leq C_kG\ell^3R^{-5-k},
\qquad k=0,1,2
$$

The kernel is homogeneous of degree $-2$; its $(k+3)$rd derivative is homogeneous of degree $-5-k$ and bounded on the unit sphere. Bounded receiver displacements only enlarge the common far cutoff. A dyadic shell contains at most $C(R/\ell)^3$ blocks, so the three tails are respectively $O(GR^{-2})$, $O(GR^{-3})$, and $O(GR^{-4})$. With dimensionless history increments the derivative estimates acquire the corresponding powers of $\ell$. This proves uniform convergence of the stationary reference and its first two receiver derivatives away from the finitely excluded anchors.

At a stationary receiver anchor, exact cancellation can be established for this block reference without assuming arbitrary rearrangement invariance. Fix receiver label $i$. On the symmetric finite cube

$$
Q_N^i=\{j:|j_k-i_k|\leq2N\text{ for }k=1,2,3\}
$$

omit $j=i$. Pair $j$ with $2i-j$. Their polarity signs agree and their kernel vectors are opposite, so the finite cube sum is exactly zero. The original block partition need not be preserved by this reflection, which is why a boundary argument is required.

In each coordinate interval of $Q_N^i$, there are $4N$ integers covered by complete original even-starting pairs and one remaining endpoint. The Cartesian product of the paired portions is a union $B_N^i$ of complete original blocks. Its complement splits into three faces, three edges, and one corner according to which coordinates are the unpaired endpoint. On a face, group the other two coordinates into their original pairs; the signed kernel sum is a second mixed finite difference. Each face patch is $O(G\ell^2/(N\ell)^4)$ and there are $O(N^2)$ patches. Each edge pair is a first finite difference of size $O(G\ell/(N\ell)^3)$, with $O(N)$ pairs. The one corner is $O(G/(N\ell)^2)$. Every differentiation segment stays on a boundary coordinate at distance $2N\ell$ from the receiver, so no singular point enters these estimates. Therefore

$$
\left\|\sum_{j\in Q_N^i\setminus B_N^i}
G\sigma_i\sigma_j\mathbf K(\mathbf z_i-\mathbf z_j)\right\|
\leq\frac{CG}{\ell^2N^2}\longrightarrow0
$$

The complete-block sets $B_N^i$ exhaust the original partition. Absolute convergence of those block sums and the exact zero cube sums imply

$$
\mathcal A_i(\mathbf X_j(s)=\mathbf z_j)=\mathbf0
$$

There are no positive-delay self roots in this stationary control. The conclusion establishes zero stationary acceleration for the specified complete-block prescription at every label, and hence compatibility of the constant histories with that regular update. It does not establish a stability spectrum, unique population continuation, or a physically canonical grouping. The stationary sum of individual-source norms still diverges by its accepted positive shell lower bound. The boundary proof concerns these particular cubes and blocks only.

**Claim grade: derived.** Falsifier: a failure of the block finite-difference identity, the reflection pairing, or the decaying face/edge/corner bound. Absolute-source divergence is not a falsifier of the signed result; an arbitrary alternative grouping is outside this equality theorem.

## 3. Reconstructing the sufficient acceleration estimate

For receiver $i$ and source $j$, write $d=\|\mathbf z_i-\mathbf z_j\|$. At every root, the complete-history displacement bound gives $|r-d|\leq2B$. For $d\geq4B+2\ell$, every possible source emission in the entire root window has magnitude at least a fixed fraction of $d$. The additional jet bounds there are therefore bounded by

$$
E_{ij}=2^pA(1+d/\ell)^{-p}+b_j
$$

The same estimate with another fixed constant holds on a slightly enlarged window. It applies before a root is selected; this is necessary for uniqueness and for comparing shifted roots.

Choose the common far cutoff $R_*$ using the budget $M$ so that the temporal term is at most $1/4$. The source set $E=\{j:b_j\geq1/4\}$ has at most $4M$ members. For a source outside that set and the geometric core, speed is below $1/2$ throughout the possible root window. Its delay residual has slope at least $1/2$, has opposite endpoint signs, and has no root outside the complete window. It has exactly one positive cross root. No global sub-field speed restriction has been added; the exceptional sources retain their complete finite root lists and both transmitter-factor signs.

For the nonexceptional root put $\mathbf y=\mathbf X_i(0)-\mathbf z_j$ and $\mathbf R=\mathbf y-\mathbf u_j(s)$. Both endpoints and the connecting spatial segment have range at least $d/2$. Since $\|D\mathbf K\|\leq2/r^3$, $D_t\geq1/2$, and $|D_t^{-1}-1|\leq2\|\mathbf V_j(s)\|$, direct subtraction gives

$$
\left\|\mathbf F_{ij}(X)-G\sigma_i\sigma_j\mathbf K(\mathbf y)\right\|
\leq G\left(\frac{32\|\mathbf u_j(s)\|}{d^3}
+\frac{8\|\mathbf V_j(s)\|}{d^2}\right)
\leq\frac{40GE_{ij}}{d^2}
$$

The factor 32 comes from the kernel derivative at range $d/2$ and the reciprocal-transmitter bound. The factor 8 bounds the reciprocal-transmitter correction times the stationary kernel. For an exceptional source, each actual row is bounded by $16G/d^2$ and there are at most 2050; the stationary comparison has norm at most $4G/d^2$. Because $b_j\geq1/4$, this crude bound is absorbed by $CG E_{ij}/d^2$ with a larger constant. The bound holds uniformly for every far source.

Cubic lattice counting in dyadic shells yields, for $R\geq R_*$,

$$
\sum_{d\geq R}\frac{(1+d/\ell)^{-p}}{d^2}
\leq\frac{C_p}{\ell^2}(R/\ell)^{1-p},
\qquad
\sum_{d\geq R}\frac{b_j}{d^2}
\leq R^{-2}\sum_jb_j
$$

The first sum is controlled by a geometric series of ratio $2^{1-p}<1$. The second uses no location-dependent arrangement of the persistent deviations. Adding the stationary block tail gives the proposal's uniform acceleration bound

$$
\sup_i\|\text{complete-block tail beyond }R\|
\leq\frac{CG}{\ell^2}
\left[M(R/\ell)^{1-p}+(1+M)(R/\ell)^{-2}\right]
$$

The finite core is a union of whole blocks, contains the receiver label and every potentially singular stationary comparison, and has uniformly bounded size. It uses actual complete source rows, including positive-delay self rows. Hence no fictitious stationary self term is evaluated. The update is the actual finite core plus the convergent stationary far reference plus the absolutely convergent individual-source difference series. Expanding each complete block proves equality with canonical complete-block partial sums. Changing the finite whole-block core only rearranges a finite identity.

**Verdict: accept. Claim grade: derived under the additional envelope and original regular chart.** Falsifier: an admitted root outside the complete distance window, a violation of the displayed row comparison, or a nonvanishing tail despite the positive-series bounds. Arbitrary individual-source ordering remains excluded; another stationary partition requires its own equality proof.

## 4. Relative derivative and summable remainder

### Differentiation at the actual source time

At one root let $\mathbf n=\mathbf R/r$, $D=1-\mathbf n\cdot\mathbf V_j(s)$, $\mathbf q=\mathbf h_i(0)-\mathbf h_j(s)$, and $\mathbf P=\mathbf I-\mathbf n\otimes\mathbf n$. Differentiating the causal constraint $r+s=0$ gives

$$
\delta s=-\frac{\mathbf n\cdot\mathbf q}{D},
\qquad
\delta\mathbf R=\mathbf q-\mathbf V_j(s)\delta s,
\qquad
\delta r=-\delta s,
\qquad
\delta\mathbf n=\frac{\mathbf P\delta\mathbf R}{r}
$$

The variation of the original source velocity at the shifted root is $\dot{\mathbf h}_j(s)+\mathbf A_j^{\mathrm{hist}}(s)\delta s$. Thus

$$
\delta D=-\mathbf V_j\cdot\delta\mathbf n
-\mathbf n\cdot\big(\dot{\mathbf h}_j+\mathbf A_j^{\mathrm{hist}}\delta s\big),
\qquad
\delta\mathbf a
=\frac{G\sigma_i\sigma_j}{r^2|D|}
\left[\delta\mathbf n-\mathbf n\left(\frac{2\delta r}{r}+\frac{\delta D}{D}\right)\right]
$$

The signed factor in $\delta(1/|D|)=-\delta D/(|D|D)$ verifies both transmitter signs. This independently reproduces proposal equation (12). The sampled source acceleration is indispensable; velocity decay alone would not justify the following receiver-sensitivity estimate.

### The stationary subtraction

Let $\varepsilon=N_p(\mathbf h)$ and choose a perturbation envelope of budget at most $2\varepsilon$. In the far window put $H_{ij}=C_p A_h(1+d/\ell)^{-p}+c_j$. Uniform root persistence gives $|\delta s|\leq C\ell\varepsilon$. On a nonexceptional source,

$$
\delta\mathbf R
=\mathbf h_i(0)+O\big(\ell H_{ij}+\ell\varepsilon E_{ij}\big),
\qquad
\delta D=O\big(H_{ij}+\varepsilon E_{ij}\big)
$$

Rewrite the row as $G\sigma_i\sigma_j\mathbf K(\mathbf R)/D$. The derivative term $D\mathbf K(\mathbf y)[\mathbf h_i(0)]$ is exactly the derivative of the stationary comparison. The difference of kernel derivatives is $O(\ell E_{ij}d^{-4})$; the reciprocal-transmitter correction is $O(E_{ij})$. After subtraction, every remaining term is bounded by

$$
\left\|D\left[\mathbf F_{ij}-G\sigma_i\sigma_j\mathbf K(\mathbf y)\right][\mathbf h]\right\|
\leq\frac{CG}{d^2}\big(\varepsilon E_{ij}+H_{ij}\big)
$$

Exceptional sources use the finite-row derivative bound, positive range and transmitter floors, and the finite root count. Their receiver-dependent term is $C G\varepsilon/d^2$, which is absorbed into $C G\varepsilon b_j/d^2$ because $b_j\geq1/4$. Direct source variations are bounded by $CGH_{ij}/d^2$. A union of the exceptional sets for two nearby histories remains finite with cardinality controlled by their common budget. This avoids assuming the exceptional set is invariant under perturbation.

Sum the difference-derivative bounds as in Section 3, then add the independently convergent complete-block stationary receiver derivative. The resulting operator tail, into uniformly bounded acceleration sequences and using the $N_p$ norm, is

$$
\sup_i\|D\mathcal A_i\text{ tail beyond }R\|
\leq\frac{CG}{\ell^2}
\left[(R/\ell)^{1-p}+(R/\ell)^{-2}+(R/\ell)^{-3}\right]
$$

The last term is the stationary derivative tail after a receiver displacement of size $\ell$ is included. The constant depends on the fixed budget and the original regularity constants. An ungrouped sum of stationary receiver derivatives would not supply this estimate.

### A bound on the actual nonlinear error

A relative derivative requires more than convergence of formal derivatives. For differences of two histories of budget at most $M$, let $A_3+\sum_jb_j^{(3)}\leq2M$ bound the dimensionless third derivative of $\mathbf h$. Compare $\dot{\mathbf h}_j$ with its backward difference quotient over $t=\ell\sqrt\varepsilon$. The whole past is available and the envelope decreases toward earlier times, so

$$
\ell\|\ddot{\mathbf h}_j(s)\|
\leq
\left(\frac{2A_h}{\sqrt\varepsilon}+\frac{A_3\sqrt\varepsilon}{2}\right)a_p(s)
+\frac{2c_j}{\sqrt\varepsilon}
+\frac{b_j^{(3)}\sqrt\varepsilon}{2}
$$

This proves proposal equation (15) directly. Denote its far-window envelope by $J_{ij}$. Its temporal coefficient and sum of persistent coefficients are $O_M(\sqrt\varepsilon)$, while the corresponding budget for $H_{ij}$ is $O(\varepsilon)$. For the nonlinear remainder, let $\overline E_{ij}$ be the sum of the two histories' far jet envelopes, with budget at most $2M$. It bounds source jets along their interpolation as well as at both endpoints. Root shifts of size $C\ell\varepsilon$ change temporal envelope bounds only by a uniform factor.

The root-equation Taylor expansion gives $\Delta s-\delta s=O(\ell\varepsilon^2)$. The change in the perturbation's sampled velocity is at most $C\varepsilon J_{ij}$ in dimensionless units; the original source-velocity Taylor error is at most $C\varepsilon^2E_{ij}$. Products of first variations give $C\varepsilon H_{ij}$ or $C\varepsilon^2E_{ij}$. For the far row after stationary subtraction these estimates yield the useful explicit remainder bound

$$
\|\mathscr R_{ij}\|
\leq\frac{CG}{d^2}
\left(\varepsilon J_{ij}+\varepsilon H_{ij}+\varepsilon^2\overline E_{ij}\right)
$$

The pure receiver Taylor term of the stationary kernel is removed before this estimate; its grouped sum has a bounded second derivative by Section 2. To verify that a receiver-only remainder has the required source decay, hold the source history fixed and differentiate the difference row twice with respect to receiver position. The root-shift derivatives involve source velocity and acceleration, and the second derivative of its reciprocal-transmitter factor additionally involves source jerk. Every term left after subtracting the stationary kernel contains a source displacement or one of these three source derivatives. The admitted envelope bounds all of them. At zero source displacement and zero derivatives the difference row vanishes identically as a function of receiver position. This justifies the $\varepsilon^2\overline E_{ij}$ term rather than an unsummable receiver-only $\varepsilon^2/d^2$ remainder.

On exceptional sources use the frozen finite-row $O(\varepsilon^{3/2})$ remainder with its $d^{-2}$ far factor; their number is uniformly finite. The core is also uniformly finite. Summing the displayed bound with the dyadic estimates gives

$$
\sup_i\|\mathcal A_i(X+h)-\mathcal A_i(X)-D\mathcal A_i(X)[h]\|
\leq C\frac{G}{\ell^2}\varepsilon^{3/2}
=o(\varepsilon)
$$

The linear derivative expression is defined on finite-$N_p$ $C^1$ directions, but the remainder claim is relative to admissible $C^3$ histories with common budgets and the relaxed regular margins. The interpolation step does not make arbitrary small $C^1$ perturbations satisfy the higher-derivative admission conditions. No fold crossing or ambient open-set existence theorem is supplied.

**Verdict: accept at the stated relative scope. Claim grade: derived.** Falsifiers are a wrong sign in the causal-root derivative, loss of the stationary receiver subtraction, failure of the one-sided interpolation inequality, or an admitted sequence whose remainder divided by $N_p$ fails to vanish. Markup and finite-row numerical agreement cannot establish the infinite estimate in place of these bounds.

## 5. The strict power threshold and existing negative controls

Use the frozen cone, source-dependent pulse times, and $C^3$ profile $\psi(t)=t(1-t^2)^4$ on $|t|<1$, zero outside. Its coefficient-sum derivative bounds are $16,80,384,1728$. At each selected source's own emission time $s=-d_j$, the pulse displacement is zero and its velocity is polarity-correlated and radial. Replace only its amplitude by

$$
\nu_j=\nu(1+d_j/\ell)^{-p},
\qquad 0<\nu\leq1/1024
$$

For $p\geq0$, the amplitudes do not exceed the frozen admission bound. On each support, $||s|-d_j|\leq\ell$, so the time envelope and the anchor-distance envelope differ by a finite factor depending only on $p$. The profile bounds therefore establish the proposed jet envelope with $b_j=0$. The frozen global residual monotonicity, positive cross range, complete complements, and absence of positive self roots remain valid at every label. This reuses the accepted control; no new history geometry is introduced.

At receiver zero, the roots remain exactly $-d_j$ and direct canonical subtraction gives

$$
\Delta\mathbf F_j
=\frac{G\nu_j\mathbf n_j}{d_j^2(1-\nu_j\sigma_j)},
\qquad
\mathbf e\cdot\Delta\mathbf F_j
\geq\frac{G\nu_j}{2(1+\nu)d_j^2}>0
$$

The fixed cone has $\mathbf n_j\cdot\mathbf e\geq1/2$. On the existing complete-block box $Q_m$, there are $4m^3$ labels with $m\ell\leq d_j\leq\sqrt6m\ell$. Multiplication of these three bounds gives

$$
\sum_{j\in Q_m}\mathbf e\cdot\Delta\mathbf F_j
\geq\frac{G\nu}{3(1+\nu)\ell^2}
m(1+\sqrt6m)^{-p}
$$

For $0\leq p<1$, this lower bound grows without limit. At $p=1$, it is bounded below by a positive constant for $m\geq16$. The boxes with $m=2^k$ are disjoint, so their contributions accumulate without bound at the endpoint. The stationary complete-block baseline is absolutely summable and cannot cancel the positive correction. For $p>1$, Section 3 proves convergence for the whole admitted family. This establishes the sharp threshold for these power envelopes. If nondecaying or growing envelopes with $p<0$ are contemplated, the original constant-amplitude witness already belongs to that looser class and rejects it; no amplitude exceeding the frozen bound is needed.

The endpoint continuity claim is also valid. Keep only $K$ disjoint boxes and replace $\nu$ by $\nu_0/K$. The support still modifies finitely many source labels. The position/velocity coefficient bounds sum to 96, and comparison of the two $p=1$ envelopes costs at most a factor two. Hence $N_1(h)\leq192\nu_0/K$. Since $m/(1+\sqrt6m)\geq1/3$ for $m\geq16$, the sum of the $K$ positive lower bounds is at least

$$
\frac{G\nu_0}{9(1+\nu_0)\ell^2}>0
$$

Thus endpoint continuity fails even after the infinite divergent history is removed, provided all these growing finite supports remain available. The number of modified labels is not fixed. Taking the amplitude derivative on each fixed finite set gives the corresponding unbounded derivative norm; no exchange of infinite limits is required.

The original unweighted infinite cone history is excluded from the $p>1$ proposal. At its old selected emissions the source speed is a fixed $\nu>0$. A feasible envelope would eventually require $b_j\geq\nu/2$ on infinitely many labels, contradicting summability. Its canonical divergence has not been regularized.

The original finite-shell discontinuity sequence is retained but loses smallness. Write $r=R/\ell=2^m$ and $\theta_R=r^{-1}$. The subject's rectangular subset has $r^3/64$ labels, range between $5R/4$ and $\sqrt{19/8}R$, and radial velocity perturbation at least $\theta_R/2$. Every envelope has either $A_h\geq\theta_Rr^p/4$, or $c_j\geq\theta_R/4$ on that subset. Therefore

$$
N_p(\theta_Rh^R)
\geq\frac1{256}\theta_R\min(r^p,r^3)
=\frac1{256}r^{\min(p,3)-1}\longrightarrow\infty
$$

This verifies the proposal's topology claim without denying the old-norm convergence or the old exact finite increments.

**Verdict: accept. Claim grade: derived for the stated independent-history family.** Falsifier: an error in the exact root or rational source correction, the box count, the disjoint-box lower bound, or the norm lower bound. A trajectory arising from finitely perturbed coupled dynamics is not shown to realize these independently prescribed histories.

## 6. What the intended finite-perturbation control already permits

### Finite changes and the old norm

Let $E$ be a fixed finite set of labels, possibly the two target labels. Suppose the complete histories equal the stationary lattice outside $E$, and all histories satisfy the original regular class. Each changed history has a finite dimensionless complete-past jet bound, by the original uniform $C^3$ assumptions. Taking $A=0$ and assigning those bounds to $b_j$ on $E$ proves admission to every proposed $p>1$ family. No distant-past decay of the changed histories is required.

For differences supported on $E$, put $c_j=\sup_{s\leq0}(\|h_j(s)\|/\ell+\|\dot h_j(s)\|)$ and $A_h=0$. Then

$$
\frac12\|h\|_{\mathcal H}
\leq N_p(h)
\leq |E|\,\|h\|_{\mathcal H}
$$

Thus the two topologies are equivalent on this fixed support. The constants depend on the number of labels; there is no uniform equivalence over arbitrary growing finite supports. This is exactly why the accepted shell sequence can obstruct the larger space without obstructing the fixed two-label perturbation space.

If the receiver history is unchanged between two inputs that differ only on a finite set of other source labels, every other complete source row is unchanged. The convergent stationary block background and the finite difference therefore give

$$
\mathcal A_i(Y)-\mathcal A_i(X)
=\sum_{j\in E}\big[\mathbf F_{ij}(Y)-\mathbf F_{ij}(X)\big]
$$

This is proposal equation (20). Enlarging the summable persistent budget on $E$ accommodates any such modification obeying the original regularity and root assumptions. One must not demand that an arbitrarily large modification remain in one fixed budget ball.

Changing the receiver position also changes infinitely many stationary rows. It is still controlled: choose a finite core containing all possibly singular stationary anchors, evaluate its actual rows, and use the smooth grouped stationary far reference at the changed receiver position. Outside the finitely changed sources the source histories are exactly stationary, so the difference tail vanishes there. The stationary block derivative and finitely many complete row derivatives give a bounded relative derivative in the old norm on this fixed-support family, with constants depending on $|E|$ and the regular margins. The finite increment identity above should not be used to omit the changed receiver's stationary-background derivative.

The $p>1$ requirement is therefore a sufficient uniform condition for a much larger family of independently varying old histories. It is **not necessary for summation or relative sensitivity of the fixed finite-perturbation control**, whose membership in every such envelope family is automatic. This distinction changes neither the accepted obstruction nor the proposal; it locates which quantifiers matter for the operator's intended control.

### Finite continuation does not create arbitrary old pulses

The initial past is fixed when an EOM future is sought. Appending a finite future cannot alter its older emissions. Suppose the histories outside $E$ were stationary for all $s\leq0$, and suppose a continuation to $0\leq T\leq h$ has a finite uniform displacement bound $B_h$ and the regular root conditions needed to evaluate the update. Every root obeys $r\geq d_{ij}-2B_h$. Thus

$$
d_{ij}>h+2B_h
\quad\Longrightarrow\quad
s=T-r<0
$$

For a source outside $E$ at such a distance, all sampled emissions belong to its unchanged stationary past. Its row is exactly the stationary row at the receiver's present position. The geometric core has uniformly finite size at each bounded $h$, and the remaining persistent corrections come from the fixed finite set $E$. This observation permits environmental motion at every label on the newly appended interval; it does not freeze those paths after release.

Consequently the old independent-pulse witnesses do not establish that two initially changed histories destroy finite-time summation. Actual environmental responses may extend to infinitely many labels, especially when the two changed pasts have existed for arbitrarily long times. Their values are then constrained by the coupled equations and their fixed pasts, rather than freely chosen to realize the reviewed cone or shell witnesses. Proving an EOM future and the necessary uniform displacement, root, separation, and regularity bounds remains essential. This conditional argument establishes no automatic preservation of finite spatial support, and selects no alternative history class.

**Claim grade: derived for finite-support equivalence, finite-increment consistency, and the old-emission implication.** Falsifier: a regular finite modification whose untouched far source rows differ at a fixed receiver, or a root with $d_{ij}>h+2B_h$ and $s\geq0$ despite the complete displacement bound. Loss of the assumed continuation bounds blocks the conditional conclusion; it does not demonstrate production of the independently prescribed negative controls.

## 7. Finite continuation, cut compatibility, and invariant-class limits

For the full proposed envelope, define age relative to a later reception cut by $a_{p,T}(s)=(1+(T-s)/\ell)^{-p}$. At an old time $s\leq0$,

$$
1+(T-s)/\ell
\leq(1+T/\ell)(1+|s|/\ell),
\qquad
a_p(s)\leq(1+T/\ell)^p a_{p,T}(s)
$$

On $0\leq s\leq T$, the later-cut envelope is at least $(1+T/\ell)^{-p}$. A newly appended segment with uniform dimensionless jet bound $K_h$ therefore satisfies the same kind of admission envelope with the unchanged persistent sequence and temporal coefficient no larger than $(A+K_h)(1+T/\ell)^p$. This independently proves proposal equation (22). It permits independent bounded new motion at every label, but assumes the continuation rather than constructing it.

The full original regular class is more restrictive than that envelope. A continuation must also retain or explicitly replace the environmental and target displacement conditions, appropriate separation conditions, complete root census, root/transmitter/complement margins, and uniform source smoothness. Exact saturated margins need slack for a neighborhood argument. An admitted release history need not satisfy the EOM on its prescribed past, so a globally $C^3$ EOM extension requires

$$
\ddot{\mathbf X}_i(0^-)=\mathcal A_i(X)
$$

and the corresponding third-derivative match whenever the time derivative of the update is defined. The envelope implies neither match. A derivative jump at zero leaves the declared globally $C^3$ class unless a different regularity domain is separately specified. The stationary control has zero acceleration under Section 2's prescription, but arbitrary finite changes need not satisfy these cut conditions.

**Verdict: accept finite-continuation envelope compatibility and necessary cut compatibility; leave coupled existence and invariant-class preservation unresolved. Claim grade: derived for the displayed implications.** Falsifier of the envelope result: a uniformly bounded appended segment violating the explicit age comparison. A root-margin failure or a cut mismatch concerns the additional evolution requirements and does not refute that age estimate.

## 8. Adjudicated scope and coordinator integration

| Statement | Disposition |
| --- | --- |
| The proposed envelope with $p>1$ supplies finite complete-block acceleration, uniformly over receivers | Accept under the original regular chart and a common finite envelope budget. |
| The stationary receiver derivative is properly subtracted and the relative remainder is summable | Accept with the reconstruction in Section 4; this is a relative $C^3$-constrained theorem, not an ambient open-set existence result. |
| $p>1$ is sharp for the broad independent power-envelope family | Accept; the existing weighted cone and finite-box endpoint controls prove the negative side. |
| The infinite divergent history is repaired while kept in the domain | Reject; it is explicitly excluded, and its old divergence remains valid. |
| Canonical finite source modifications retain their exact increments | Accept when the receiver is unchanged; its separate stationary-background derivative must be included when it changes. |
| The stricter envelope is necessary to evaluate two fixed modified source histories in the stationary lattice | Reject; the finite-perturbation control already has the stationary reference plus finite corrections, and the two norms are equivalent on fixed finite support. |
| Stationary cancellation removes the accepted independent infinite-history counterexamples | Reject; the exact transmitter-weight corrections have positive projection despite stationary cancellation. |
| Those counterexamples prove that actual two-particle EOM evolution produces their independently prescribed old pulses | Reject as an inference; no such dynamical reachability or production result was supplied. |
| The past envelope survives a finite uniformly smooth appended segment | Accept as a conditional age estimate, with the explicit cut-compatibility limitation. |
| The proposed domain is an EOM invariant class or determines a positive common lifespan | Unresolved; neither follows from release-time summation and relative differentiability. |

Proposed coordinator integration: “Independent adjudication accepts the population-admissibility proposal's $p>1$ summation, relative derivative, uniform tails, critical-exponent controls, canonical finite-modification consistency, and bounded-continuation envelope estimate at their explicit mathematical scope. The added domain, norm, and stationary reference remain unadopted. Stationary cancellation can be proved for the selected block prescription by symmetric cubes and a decaying boundary-fragment estimate. A fixed finite perturbation, including two changed complete histories, already has a convergent stationary background plus finite canonical corrections; the original and proposed norms are equivalent on that fixed support. The accepted shell discontinuity uses growing finite supports, and the infinite cone obstruction independently prescribes infinitely many old histories. Neither establishes that a coupled future generated by two changed particles produces those witnesses. Finite-time old-emission geometry supplies a conditional finite-core reduction for that intended control. EOM existence, cut compatibility, regular-chart preservation, and singular behavior remain separate obligations.”

Recommendation: use the finite-perturbation distinction in the coordinator's synthesis before deciding whether the broader envelope should become the working population domain. The broad proposal has a sufficient theorem, but the intended two-particle control should not be declared blocked by a counterexample requiring independently adjustable histories at infinitely many old emissions. This review does not authorize evolution or adopt a class; it resolves the mathematical scope needed for that decision.

## 9. Evidence and validation record

The eight inputs were frozen at 2026-09-10T00:18:25.768Z. The subject digest is `cec03029e31d5dd18d7eacb3dd35537285c4e206e47c90662d1c88183c3596ed`; the seven reference digests agree with the subject's printed reference manifest. Full paths, hashes, and frozen copies are retained under `.tmp/population-admissibility-review/`. The freezing instrument first passed the standard SHA-256 `abc` control before reading the target inputs.

The independent mathematical evidence is the reconstructed mixed finite difference, symmetric-cube boundary estimate, exact regular row subtraction, dyadic summability, signed root differentiation, weighted interpolation and remainder bounds, exact pulse corrections, finite-support norm comparison, and causal old-emission estimate. No newly prescribed history, population sweep, or EOM run is used. The subject's own syntax checks are provenance only, not acceptance evidence.

Only this adjudication and the assigned scratch directory are writable outputs of this review. No reference, subject, account proposal, shared tracker, or reference mathematical instrument was edited. No Python, generated write, Git index/publication action, worktree, class adoption, or downstream task was used.

Before target validation, `node .tmp/population-admissibility-review/check.mjs known` passed the known two-formula/one-file-link case, ignored a fenced unmatched dollar, and rejected an invalid macro, trailing whitespace, and an unexpected control character. It also verified the standard SHA-256 control. The receipt is `known-check.txt` in that directory. The syntax logic follows the existing derivative adjudication's checker, which remains unchanged; the new copy adds explicit input-digest and control-character checks.

**Claim grade: measured.** `node .tmp/population-admissibility-review/check.mjs target` accepted every mathematical expression under KaTeX 0.16.47, checked the eight local file targets and balanced dollar delimiters, and found no trailing whitespace or unexpected control characters in this adjudication. It also verified all eight live input digests and their frozen copies against the review manifest. The receipt is `validation.txt`. File-target checks do not resolve anchors or verify browser layout. These checks establish syntax and scoped byte identity, not the population theorem.

**Claim grade: measured.** `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings, and 30 notes, recorded in `content-validation.txt`. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/population-admissibility-independent-adjudication.md` emitted no whitespace diagnostic and returned 1 for the new-file difference; the direct whitespace assertion in the syntax checker independently covers the output. Falsifiers for these measured statements are a failed corresponding rerun, an invalid expression or file target, or a mismatched frozen input digest. The explicit mathematical reconstructions carry the adjudication.
