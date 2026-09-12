# Independent adjudication of rigid-cell delayed cancellation

## Disposition and independence

The [rigid-cell obstruction](coincide-or-not.md#rigid-cell-moment-cancellation-and-its-delayed-obstruction) is accepted at its stated prescribed-history scope. An independent reviewer reconstructed the equal-time moment identities, distance separation, common pulse, complete release-time root census, exact signed correction, lattice count, divergence, unbounded derivative and finite-shell discontinuity. No error requiring a change to the negative proof was found. The mathematical claims accepted below have grade **derived**, conditional on the displayed hypotheses; source-preservation checks have grade **measured**.

The positive conditional result has valid acceleration and tangent-derivative tail estimates. Its infinite-functional differentiability conclusion retains the source's explicit uniform-remainder hypothesis, interpreted after summation or justified through a suitable parameter chart. An unweighted first-order remainder for each cell alone is insufficient. This clarifies that hypothesis; it is not a demonstrated defect in the conditional theorem.

The reviewer did not author the subject proof, received a fresh-context assignment, and returned a read-only analytical reconstruction. The coordinator captured that reconstruction here. The evidence is the derivation below, not the reviewer count, role identity, a numerical comparison or the subject's reported validation. The subject and existing mathematical references were frozen throughout the review.

| Claim reviewed | Disposition | Boundary |
| --- | --- | --- |
| Equal-time signed moments through degree two | Accepted | Every cell and supplied past time under common translation |
| Density and local finiteness | Accepted | Infinite displacement-bounded population; finite restrictions have no global lower-density claim |
| Distance separation, cutoff, common pulse and uniform class bounds | Accepted | Every selected cell, with $0<\nu\le1/1024$ |
| Complete cross/self root census and margins | Accepted | Every ordered channel at release |
| Exact signed subtraction and weighted zeroth moment | Accepted | Receiver zero, with its complete unique roots |
| Cone-ball count and signed lower bound | Accepted | All sufficiently large shell radii |
| Divergence under complete-cell exhaustions and finite coarsenings | Accepted | Exhaustions eventually retain every complete cell |
| Other partitions | Conditional | Identical exhaustive finite source sets for the comparison and an actually convergent stationary baseline |
| Unbounded derivative and discontinuity respecting canonical finite increments | Accepted | Growing finite cell supports in the original uniform position/velocity norm |
| Actual-root expansions and delayed-moment acceleration/derivative tails | Conditional | Bounded offsets and source jets, uniform root chart, actual weighted moments and permitted tangent variations |
| Differentiability of the infinite functional | Conditional | Uniform summed remainder, summably weighted remainder, or equivalent controlled parameter-chart argument |
| EOM generation, dense contact, exclusion, incidence or physical-class adoption | Not established | None follows from this prescribed-input obstruction |

## 1. Canonical input and exact moments

Use the [complete-history class](population-history-class.md), normalized wake speed $c_f=1$, $G=\kappa q_0^2>0$, anchors $\mathbf z_j=\ell j$, polarities $\sigma_j=(-1)^{j_1+j_2+j_3}$, and complete blocks

$$
P_n=\{2n+\epsilon:\epsilon\in\{0,1\}^3\}.
$$

The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) assigns the received row

$$
\mathbf a_{ijb}=G\sigma_i\sigma_j
\frac{\hat{\mathbf r}_{ijb}}{r_{ijb}^2|D_{ijb}|},\qquad
D_{ijb}=1-\hat{\mathbf r}_{ijb}\cdot\mathbf V_j(s_{ijb}).
$$

Only the transmitter Jacobian weights the acceleration. Receiver playback does not enter this calculation. All past paths are prescribed on $(-\infty,0]$ and are not asserted to solve the past EOM. The two target labels and their cell remain stationary in the witness. Differences are measured in the unchanged complete-past norm

$$
\|h\|_{\mathcal H}
=\sup_{j,s\le0}\|h_j(s)\|/\ell
+\sup_{j,s\le0}\|\dot h_j(s)\|.
$$

The admitted $C^3$ histories carry the relative topology inherited from this norm; smallness does not suppress old emission times.

For a common translation $\mathbf X_{2n+\epsilon}(s)=2\ell n+\ell\epsilon+\mathbf u_n(s)$, each spatial monomial of total degree at most two is a polynomial in the three binary coordinates of total degree at most two. Every constituent monomial omits at least one coordinate; summation over that coordinate gives $1-1=0$. Thus, for every supplied time,

$$
\sum_{j\in P_n}\sigma_j\mathbf X_j(s)^\alpha=0,\qquad |\alpha|\le2.
$$

Time derivatives of the identity vanish wherever those derivatives exist. This is stronger than cancellation only at release or at selected emissions.

For density, attach a disjoint volume-$\ell^3$ cube to each anchor. Even with the inherited larger target displacement ceiling $B=4\ell$, every cube point is within $D=5\ell$ of its label's actual position. For $R\ge40\ell$, the shell count lies between

$$
\frac{4\pi}{3\ell^3}[(2R-D)^3-(R+D)^3]
\quad\text{and}\quad
\frac{4\pi}{3\ell^3}[(2R+D)^3-(R-D)^3].
$$

At $D/R=1/8$, the dimensionless differences are $2646/512>3$ and $4570/512<12$. The claimed bounds $4\pi\ell^{-3}R^3$ and $16\pi\ell^{-3}R^3$ follow, as does local finiteness. With $\ell=L/100$, the density coefficient at scale $L$ is $4\pi10^6$. This is a deterministic count, not a measured density of nature. A nonzero signed degree-two cell polynomial or a displacement-admissible shell violating these volume inequalities falsifies the corresponding claim.

## 2. Separated emission times and the common pulse

Put $\mathbf e=(1,2,4)/\sqrt{21}$, $\vartheta=1/(16\sqrt{63})$, $\mathbf c_n=\ell(2n+(1/2,1/2,1/2))$, and $\mathbf m=-\mathbf c_n/\|\mathbf c_n\|$. Selected cells satisfy $\|\mathbf c_n\|\ge100\ell$ and $\|\mathbf m-\mathbf e\|\le\vartheta$. A nonzero vertex difference $v\in\{-1,0,1\}^3$ has $v_1+2v_2+4v_3\ne0$, since its largest nonzero weighted coordinate exceeds the sum of the smaller weights. Hence

$$
|\mathbf e\cdot v|\ge1/\sqrt{21},\qquad
|\mathbf m\cdot v|\ge15/(16\sqrt{21}).
$$

Writing the centered vertex offsets as $\mathbf a_j=\ell(\epsilon-\tfrac12(1,1,1))$, the norm Hessian bounds the difference of the two distance-linearization remainders by

$$
\frac{3\ell^2}{4(\|\mathbf c_n\|-\sqrt3\ell/2)}<\ell/132.
$$

Therefore the actual anchor distances $d_j=\|\mathbf z_j\|$ obey

$$
|d_j-d_k|\ge\ell\left(\frac{15}{16\sqrt{21}}-\frac1{132}\right)
>\frac{\ell}{2\sqrt{21}}.
$$

The direction estimate

$$
\|\mathbf n_j-\mathbf m\|\le\frac{\sqrt3}{100-\sqrt3/2},\qquad
\mathbf n_j=-\mathbf z_j/d_j,
$$

together with the cone width gives $t_j=\mathbf n_j\cdot\mathbf e>1/2$. Also $d_j\ge(100-\sqrt3/2)\ell>10\ell$. Thus the explicit cutoff suffices and no target lies in a selected cell.

Let $b=\ell/(16\sqrt{21})$ and extend $\psi(t)=t(1-t^2)^4$ on $|t|<1$ by zero. Fourth-order endpoint zeros give a $C^3$ extension. Expanding as $t-4t^3+6t^5-4t^7+t^9$ and summing absolute coefficients gives bounds $16,80,384,1728$ for the value and first three derivatives. At zero, $\psi(0)=0$ and $\psi'(0)=1$.

On selected cells the common displacement is given below; every unselected cell remains stationary:

$$
\mathbf u_n(s)=\nu b\mathbf e\sum_{j\in P_n}\sigma_j\psi((s+d_j)/b),
\qquad 0<\nu\le1/1024.
$$

The centers are at least $8b$ apart and each support has radius $b$, so at most one pulse contributes at a time. All supports precede release. Direct simplification at the maximum amplitude yields

$$
\begin{aligned}
\|\mathbf u_n\|_\infty&\le\ell/(1024\sqrt{21})<\ell/64,\\
\|\dot{\mathbf u}_n\|_\infty&\le5/64,\\
\|\ddot{\mathbf u}_n\|_\infty&\le6\sqrt{21}/\ell<256/\ell,\\
\|\mathbf u_n^{(3)}\|_\infty&\le9072/\ell^2<65536/\ell^2.
\end{aligned}
$$

At the selected emissions, $\mathbf u_n(-d_j)=0$ and $\dot{\mathbf u}_n(-d_j)=\nu\sigma_j\mathbf e$. These are different sampled velocities of one shared translation, with no internal cell deformation. In the original history norm the distance to stationary input is at most $C_h\nu$, where $C_h=80+1/\sqrt{21}$. A failed distance gap, overlapping supports, or violation of a displayed class bound falsifies admission at this stage.

## 3. Complete release-time roots

The root argument applies to every receiver, not only the receiver used to choose the pulses. All receivers are at their anchors at release. For every cross channel and every delay,

$$
r_{ij}(\tau)\ge d_{ij}-\ell/64\ge63\ell/64.
$$

Let $v=80\nu\le5/64$. The source Lipschitz bound gives

$$
f_{ij}(\tau_2)-f_{ij}(\tau_1)\ge(1-v)(\tau_2-\tau_1),
\qquad f_{ij}(\tau)=\tau-r_{ij}(\tau).
$$

The residual starts negative and tends to positive infinity. It has exactly one positive root, and $D_{ij}\ge59/64$ throughout its root tube. The delay is at least $63\ell/64$, so the half-width $w=\ell/256$ tube is entirely positive. On its complement, $|f_{ij}|\ge(59/64)w>w/4$.

For a self channel, the same Lipschitz inequality gives $r_{ii}(\tau)\le v\tau$, hence $f_{ii}(\tau)\ge(59/64)\tau$. All positive-delay self channels are empty. Both the near-diagonal normalized margin and the ordinary complement for $\tau\ge2w$ hold. No value is assigned to the exact diagonal.

Bounded displacement confines every cross root to its finite anchor-distance window. This proves all-earlier completeness without a population-wide finite-memory cutoff. An extra positive root or a failed tube or self-complement inequality in this family would falsify the census. No fold, birth or multiplicity failure causes the summation obstruction.

## 4. Exact positive correction and divergent population sum

For receiver zero, $\mathbf X_j(-d_j)=\mathbf z_j$ makes $s_j=-d_j$ an exact root; uniqueness makes it the complete contribution. Since $\sigma_0=1$,

$$
\begin{aligned}
\mathbf F_j^\nu&=\frac{G\sigma_j\mathbf n_j}{d_j^2(1-\nu\sigma_jt_j)},\\
\Delta\mathbf F_j&=\frac{G\nu t_j\mathbf n_j}{d_j^2(1-\nu\sigma_jt_j)},\\
\mathbf e\cdot\Delta\mathbf F_j
&=\frac{G\nu t_j^2}{d_j^2(1-\nu\sigma_jt_j)}
\ge\frac{G\nu}{4(1+\nu)d_j^2}>0.
\end{aligned}
$$

Unselected corrections vanish. The identity

$$
\frac{\sigma_j}{1-\nu\sigma_jt_j}
=\sigma_j+\frac{\nu t_j}{1-\nu\sigma_jt_j}
$$

also proves the actual delayed weighted zeroth moment satisfies $\mu_0\ge4\nu/(1+\nu)$ in every selected cell. Even the actual emission positions retain the stationary geometry, while the transmitter weights remove its cancellation. The sign is established before taking any limit.

Set $\beta=\vartheta/8$. For sufficiently large $R$, all centers in $B(-3R\mathbf e/2,\beta R)$ satisfy the cone and cutoff, and their vertices have $d_j\in[R,2R]$. The directional normalization error is at most $2\beta/(3/2-\beta)<\vartheta$. The center lattice has cube volume $8\ell^3$ and covering radius $\sqrt3\ell$. Once $\sqrt3\ell\le\beta R/2$, the inner ball of radius $\beta R/2$ is covered by cubes with centers in the larger ball. There are therefore at least

$$
\frac{(4\pi/3)(\beta R/2)^3}{8\ell^3}
=\frac{\pi\beta^3}{48}(R/\ell)^3
$$

selected cells. Combining eight vertices per cell with $d_j\le2R$ yields

$$
\sum\mathbf e\cdot\Delta\mathbf B_n
\ge C_*\frac{G\nu R}{\ell^3},\qquad
C_*=\frac{\pi\beta^3}{96(1+1/1024)}>0.
$$

The stationary baseline is independently summable. Its alternating eight-vertex sum is a third mixed finite difference of $K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$. Three integrations of the corresponding mixed derivative give

$$
\|\mathbf B_n^0\|\le G\ell^3 C_3(R_n-\sqrt3\ell/2)^{-5},
$$

where a finite $C_3$ follows from smoothness on the unit sphere and homogeneity. Cubic shell counts give the absolute stationary tail $O(GR^{-2})$ at fixed $\ell$. Near cells contain only finitely many nonsingular rows after exclusion of the exact diagonal.

The convergent stationary baseline plus corrections with nonnegative projection and infinite total therefore diverges in that projection under every exhaustive complete-cell ordering. Finite coarsening preserves both properties, without requiring a uniform bound on the number of cells per group. More generally, any finite-set exhaustion eventually retaining every cell eventually contains a fixed finite positive correction exceeding any chosen threshold. An alternative partition is covered only if the same exhaustive finite source sets are used in both sides of the comparison and its stationary baseline actually converges.

This proves failure of a finite-valued update on every relative neighborhood of stationary input containing these histories. A wrong rational subtraction, failed ball/cube lower count or nonconvergent stationary baseline under the claimed prescription would falsify the relevant proof step. A finite numerical sum cannot decide these quantified tail claims.

## 5. Finite-shell derivative and continuity obstruction

For each fixed $R$, modify only the finitely many selected cells in the counted ball. The receiver stays unchanged, so the acceleration increment is exactly the finite canonical row correction. Differentiating at zero amplitude uses no infinite exchange:

$$
\left.\frac{d\mathbf F_j^\nu}{d\nu}\right|_{\nu=0}
=\frac{Gt_j\mathbf n_j}{d_j^2}.
$$

The history direction has norm at most $C_h$, independently of $R$, while its projected derivative sum is at least $C_*GR/\ell^3$. A bounded derivative agreeing with every finite canonical modification would consequently satisfy

$$
\|D\mathcal A_0\|\ge C_*GR/(C_h\ell^3)
$$

for arbitrarily large $R$, a contradiction.

For continuity take $\nu_R=\nu_0\ell/R$, with $0<\nu_0\le1/1024$. Then

$$
\|h_R\|_{\mathcal H}\le C_h\nu_0\ell/R\longrightarrow0,
\qquad
\mathbf e\cdot[\mathcal A_0(X+h_R)-\mathcal A_0(X)]
\ge C_*G\nu_0/\ell^2>0.
$$

Each member has a convergent stationary background plus finitely many changed rows, and preserves the exact equal-time cell moments. No continuous extension can respect all these finite increments. The growing support is essential: this is not discontinuity on two fixed labels, one fixed cell or another fixed finite support. A continuous extension preserving the displayed finite increments would falsify the conclusion; abandoning those increments changes the problem.

## 6. Conditional actual delayed moments and their derivatives

Fix a receiver event $(\mathbf x,T)$ and a distant cell's anchor center $\mathbf c$. Set $\mathbf y=\mathbf x-\mathbf c=R\mathbf n$ and $\boldsymbol\xi_b=\mathbf X_j(s_b)-\mathbf c$, retaining every admitted root $b$ and its source label $j$. The center stays fixed under history variation, so $\delta\mathbf y=h_i(T)$. At any one actual root, suppress the index and write $P=I-\mathbf n\mathbf n^{\mathsf T}$ and $\boldsymbol\xi=u\mathbf n+\mathbf v$, where $\mathbf v=P\boldsymbol\xi$ and $\|\boldsymbol\xi\|\le a$. Expanding $r=\sqrt{(R-u)^2+\|\mathbf v\|^2}$ for $R\ge2a$ reconstructs

$$
\begin{aligned}
r&=R-u+\|\mathbf v\|^2/(2R)+O(a^3R^{-2}),\\
\hat{\mathbf r}&=\mathbf n-\mathbf v/R
-(u\mathbf v+\tfrac12\|\mathbf v\|^2\mathbf n)/R^2+O(a^3R^{-3}),\\
s&=T-R+u-\|\mathbf v\|^2/(2R)+O(a^3R^{-2}),\\
D&=1-\mathbf n\cdot\mathbf V(s)+\mathbf v\cdot\mathbf V(s)/R+O(a^2V_*R^{-2}).
\end{aligned}
$$

These expansions neither locate nor count roots. They use actual sampled velocities and allow an emission-time offset of order cell diameter even at large distance.

With $w_b=\sigma_j/|D_b|$, define $\mu_0=\sum_bw_b$, $\boldsymbol\mu_1=\sum_bw_b\boldsymbol\xi_b$ and $\boldsymbol\mu_2=\sum_bw_b\boldsymbol\xi_b\otimes\boldsymbol\xi_b$. Taylor expansion gives

$$
\frac{\mathbf B_{ic}}{G\sigma_i}
=\mu_0K(\mathbf y)-DK(\mathbf y)[\boldsymbol\mu_1]
+\tfrac12D^2K(\mathbf y):\boldsymbol\mu_2+E_c.
$$

If the cell has at most $M_c$ roots and $|D_b|\ge\delta$, then

$$
\|E_c\|\le\frac{M_cC_3a^3}{6\delta(R-a)^5}.
$$

Exact cancellation of $\mu_0,\boldsymbol\mu_1$ with bounded $\boldsymbol\mu_2$ gives $O(R^{-4})$ cell acceleration. Also cancelling $\boldsymbol\mu_2$ gives $O(R^{-5})$. Uniform approximate bounds $|\mu_0|=O(R^{-2})$ and $\|\boldsymbol\mu_1\|=O(R^{-1})$ suffice for $O(R^{-4})$.

Differentiating the causal equation gives

$$
\delta s_b=-\frac{\hat{\mathbf r}_b\cdot[h_i(T)-h_j(s_b)]}{D_b},\qquad
\delta\boldsymbol\xi_b=h_j(s_b)+\mathbf V_j(s_b)\delta s_b,
$$

$$
\delta D_b=-\delta\hat{\mathbf r}_b\cdot\mathbf V_j(s_b)
-\hat{\mathbf r}_b\cdot[\dot h_j(s_b)+\mathbf A_j^{\rm hist}(s_b)\delta s_b],
\qquad
\delta(|D_b|^{-1})=-\frac{\delta D_b}{|D_b|D_b}.
$$

The sampled source-acceleration term is indispensable. Positive range, bounded source jets and nonzero transmitter floors bound these variations for unit history directions. Differentiating the integral Taylor remainder preserves $O(R^{-5})$: weight variations multiply an $O(R^{-5})$ term, offset variations give $O(a^2R^{-5})$, and spatial-argument variations introduce $D^4K=O(R^{-6})$.

If the first two weighted moments vanish throughout the permitted differentiable family, their tangent derivatives vanish. Bounded second moments and their tangent derivatives then give $D\mathbf B_{ic}=O(R^{-4})$. Approximate moment conditions need matching operator-norm derivative estimates. Cancellation at just one history leaves possible $\delta\mu_0K$ terms of order $R^{-2}$. Uniform cubic cell counts turn the uniform $R^{-4}$ acceleration and derivative bounds into $O(R^{-1})$ tails. On a positive reception interval the family must supply the full histories up to each reception and its uniform chart; supplied initial pasts alone do not do this.

## 7. What uniform remainder means here

For finite complete-cell sums $S_N$, one sufficient formulation of the source's explicit remainder hypothesis is

$$
\sup_N\sup_{X,T}
\|S_N(X+h,T)-S_N(X,T)-DS_N(X,T)[h]\|
\le\varepsilon\,\omega(\varepsilon),
\quad\varepsilon=\|h\|_{\mathcal H},\quad\omega(\varepsilon)\to0,
$$

on the declared admissible family and compact time interval. Alternatively, outside a uniformly controlled finite core, the bound

$$
\|\mathscr R_c(X,h,T)\|
\le\varepsilon\,\omega(\varepsilon)R_c^{-4}
$$

is summable by cubic counting. A suitable locally convex parameter chart with uniform derivative-tail convergence can also establish the summed conclusion by integration along parameter segments. In that setting the remainder need not be a separate independent hypothesis.

An unweighted uniform per-cell $o(\varepsilon)$ is insufficient on its own. For example, choose smooth $0\le\phi\le1$ equal to one on $[0,1]$ and zero on $[2,\infty)$, and let $b_n(t)=t^2\phi(n|t|)$ for $n\ge1$. Every $b_n'(0)=0$ and $\sup_n|b_n(t)|\le t^2=o(|t|)$, yet the Riemann-sum limit

$$
|t|\sum_{n\ge1}\phi(n|t|)\longrightarrow\int_0^\infty\phi(x)\,dx>0
$$

makes $\sum_nb_n(t)$ asymptotic to a positive multiple of $|t|$. The example does not have uniform neighborhood derivative-tail convergence and therefore does not contradict the stronger parameter-chart theorem. It explains the required summed interpretation of the source's hypothesis. No EOM family preserving the weighted moments, tangent constraints and uniformity is constructed here.

An incorrect actual-root expansion or missing moving-emission term would invalidate the corresponding derivation. A family failing the uniform moment or tangent bounds is outside the conditional theorem's scope; a nonvanishing tail despite all stated hypotheses would falsify the theorem itself. Failure of an unstated summation property is not evidence that an unweighted remainder suffices.

## 8. Perturbation scope and remaining frontier

An isolated finite input has finitely many source rows. A stationary infinite lattice has infinitely many rows but balances under the accepted block prescription: reflection cancels finite symmetric cubes, and the controlled unmatched boundary contribution tends to zero. The rigid-cell witness is a different input, with coordinated translations at indefinitely old source-dependent times. It is not asserted to satisfy the past EOM, and its divergent release acceleration does not supply a forward EOM solution.

The [restricted-envelope adjudication](population-admissibility-independent-adjudication.md#6-what-the-intended-finite-perturbation-control-already-permits) distinguishes fixed finite modifications from independently prescribed growing supports. An environmental response generated by the EOM from fixed initial histories cannot be identified with the freely prescribed old pulses. During a bounded appended interval, sufficiently distant receptions can still sample unchanged stationary pasts. The [accepted finite-support pulse evolution](smooth-two-particle-pulse-independent-adjudication.md) retains its domain and interval.

The infinite fixed-amplitude witness lies outside the $p>1$ past-age envelope plus summable persistent allowances. At arbitrarily old selected emissions its speed is $\nu$, while the temporal envelope tends to zero; a persistent allowance at least $\nu/2$ is eventually needed on infinitely many labels, contradicting summability. Finite-shell members separately remain legitimate finite modifications.

Neither result establishes a physical history class or partition, an all-time EOM realization of the witness, a common population lifespan, dense contact, contact exclusion, generic incidence, a probability measure or formal MEC-008 closure. A continuation theorem for the already admitted finite-support response and a proof of an invariant domain for a broader population remain distinct next mathematical questions.

## 9. Preservation and validation record

The reviewer ran sha256sum -c .tmp/mec-008-rigid-review/frozen-inputs.sha256 before and after reconstruction; all five entries returned OK. The coordinator independently used shasum -a 256 -c on the same manifest. These are measured byte-preservation checks over the analytical owner, population class, delayed-summation subject, restricted-envelope adjudication and canonical Master Equation. The reviewed analytical-owner digest is a6f5dd58ebdaf1fb4aea43959b0bf077d17c399a73e1798650ec09494bb40e18. A mismatching manifest entry overturns its preservation claim.

The reviewer edited no file and used no simulation, Python, Git mutation, regeneration or additional reviewer. The coordinator's separate document checks establish syntax and link-target existence only; they do not supply mathematical acceptance. The original proof remains unchanged, including its historical pending-review wording; this adjudication and the current strategy and queue carry its reviewed disposition.
