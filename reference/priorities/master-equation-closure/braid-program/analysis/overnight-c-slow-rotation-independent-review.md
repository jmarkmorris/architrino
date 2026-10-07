# Independent review of the slow-rotation exclusion

## Verdict and scope

Claim grade: derived. The frozen [slow-rotation exclusion](overnight-c-slow-rotation-exclusion.md) is valid for the stated complete circular histories under the authorized logarithmic equation. The independent reconstruction below verifies the entire positive-delay root census, the stationary comparison identity, the moving-source correction, all directed multiplicities, and the strict rational contradiction. No correction to the theorem is required. This is a mathematical review within C's assignment, not theory acceptance, an exact-reference admission, or a stability result.

The mechanism is that the stationary logarithmic comparison has scalar contraction exactly $-3$, independent of the phases and radii. The permitted source motion changes that contraction by less than the amount required for slow circular acceleration. The proof covers every point in the stated parameter region; no numerical search, small-angle expansion, or collocation result supplies a premise.

The falsifier is an error in the inequalities or exact arithmetic below, a mismatch with the selected equation, or an exact full-vector solution satisfying all declared assumptions. A candidate outside the region, or under a modified response, does not falsify this bounded theorem.

## Equation, histories, and independent provenance

The [live logarithmic definition](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) supplies the equation. The [authorization index](../../equation-variants/README.md) and [coordinator's C assignment](overnight-braid-research-plan-2026-10-06.md#c-logarithmic-planar-three-binary-geometry) supply its research selection. This review uses $K_{\log}=c_f=1$, unit polarities, the unchanged absolute transmitter weight, every ordinary positive-delay root, and no receiver factor, speed ceiling, contact prescription, or source truncation.

Label members by $i=(a,s)$, where $a\in\{1,2,3\}$ labels the fixed neutral pair and $s\in\{-1,+1\}$ is its polarity. With arbitrary phases $\phi_a$, declare the paths for all real times by

$$
\mathbf X_{a,s}(t)=s r_a\big(\cos(\omega t+\phi_a),\sin(\omega t+\phi_a)\big),
\qquad q_{a,s}=s.
$$

The six members lie on three coplanar concentric circles and form three fixed antipodal neutral pairs. The parameter region is $r_1=1$, $6/5\le r_2\le7/5$, $8/5\le r_3\le9/5$, and $|\omega|\le9/1000$. A common shift of the phases fixes overall orientation without restricting relative phases. Under simultaneous length/time scaling by a positive factor, velocities and the fixed logarithmic coupling remain unchanged; hence $r_1=1$ is a scale gauge. The ungauged angular condition is $|\omega|r_1/c_f\le9/1000$.

At reception time zero, write $\mathbf x_i=\mathbf X_i(0)$. For a positive delay $\tau$, set $\mathbf z_{ij}(\tau)=\mathbf x_i-\mathbf X_j(-\tau)$ and $\mathbf n_{ij}=\mathbf z_{ij}/|\mathbf z_{ij}|$. The equation evaluates

$$
\mathbf A_i=\sum_j\sum_{\tau>0:\,|\mathbf z_{ij}(\tau)|=\tau}
q_iq_j\frac{\mathbf z_{ij}(\tau)}{|\mathbf z_{ij}(\tau)|^2|D_{ij}(\tau)|},
\qquad D_{ij}=1-\mathbf n_{ij}\cdot\dot{\mathbf X}_j(-\tau).
$$

The equation is acceleration-first. The scalar contraction used below is simply $\sum_i\mathbf x_i\cdot\mathbf A_i$; no mass, conserved energy, Newtonian virial theorem, or imported force law is assumed.

The subject document was read to identify its claim, then every proof obligation was reconstructed directly from this equation and elementary Euclidean identities. The companion [exact arithmetic instrument](../evidence/overnight-c-review-exact.mjs) was written independently and imports no subject search, interval code, saved numerical output, or production implementation. Its arithmetic and explicit finite-position check supplement the analytical proof; they do not establish continuous root coverage by sampling. The primary C report and all subject files remained read-only to this reviewer.

## Complete root census and ordinary-domain margins

Claim grade: derived. For each source let $v_j=|\omega|r_j$. All complete histories have $v_j\le v_*=81/5000<1$. For any two delays $\tau_2>\tau_1\ge0$, the source chord has length at most $v_j(\tau_2-\tau_1)$. Therefore the causal residual $h_{ij}(\tau)=|\mathbf z_{ij}(\tau)|-\tau$ obeys

$$
h_{ij}(\tau_2)-h_{ij}(\tau_1)
\le -(1-v_j)(\tau_2-\tau_1).
$$

This strict decrease uses the Lipschitz inequality for distance and holds even where distance itself is not differentiable. It supplies uniqueness over the entire delay half-line, not only a finite search window.

For distinct members, present separation $d_{ij}=|\mathbf x_i-\mathbf x_j|$ is positive: within one pair it is $2r_a\ge2$, and between pairs it is at least $|r_b-r_a|\ge1/5$. Thus $h_{ij}(0)=d_{ij}>0$. Bounded circular positions give $|\mathbf z_{ij}(\tau)|\le r_i+r_j$, so $h_{ij}(\tau)<0$ whenever $\tau>r_i+r_j$. Continuity and strict decrease prove exactly one positive partner root. At that root, the source-speed chord bound also gives

$$
\frac{d_{ij}}{1+v_j}\le\tau_{ij}\le\frac{d_{ij}}{1-v_j},
\qquad
\tau_{ij}\le r_i+r_j,
\qquad
D_{ij}\ge1-v_j\ge\frac{4919}{5000}>0.
$$

Consequently each positive root has positive range, and the derivative $h'_{ij}=\mathbf n_{ij}\cdot\dot{\mathbf X}_j(-\tau)-1=-D_{ij}$ exists and is nonzero there. The root is ordinary. The derivative sign follows because differentiating $-\mathbf X_j(-\tau)$ gives $+\dot{\mathbf X}_j(-\tau)$.

For $i=j$, $h_{ii}(0)=0$ and the same strict-decrease bound makes $h_{ii}(\tau)<0$ for every $\tau>0$. The zero-delay endpoint is excluded by the equation and supplies no self contribution. Thus there are $6\times5=30$ partner roots and no positive-delay self roots. Rotation carries this proof to every reception time; there is no finite-history seam or omitted old root.

Known analytical controls precede target arithmetic: for a stationary distinct source and receiver at distance $d>0$, $h(\tau)=d-\tau$ has exactly the root $\tau=d$ with $D=1$; for a stationary self history, $h(\tau)=-\tau$ has no positive root. These are direct cases of the root proof. A second partner root, positive self root, or source-clock value below the stated floor under these exact histories would falsify this census.

## Stationary contraction and delayed error

Claim grade: derived. Define $F(\mathbf u)=\mathbf u/|\mathbf u|^2$ for nonzero Euclidean vectors and the stationary comparison $\mathbf A_i^0=\sum_{j\ne i}q_iq_jF(\mathbf x_i-\mathbf x_j)$. This is a comparison evaluated at the present geometry, not an additional law for the moving histories. For an unordered pair, its two directed contributions to $V_0=\sum_i\mathbf x_i\cdot\mathbf A_i^0$ combine to

$$
q_iq_j\left[\mathbf x_i\cdot F(\mathbf x_i-\mathbf x_j)+\mathbf x_j\cdot F(\mathbf x_j-\mathbf x_i)\right]
=q_iq_j.
$$

There are three positive and three negative polarities. The six same-polarity unordered pairs contribute $+6$, while the nine opposite-polarity pairs contribute $-9$. Thus $V_0=-3$. Equivalently, $V_0=((\sum_iq_i)^2-\sum_iq_i^2)/2=-3$. This is independent of every radius and phase as long as present separations are nonzero.

For one directed root, write $\mathbf y=\mathbf x_i-\mathbf x_j$ and $\mathbf z=\mathbf z_{ij}(\tau)$. Causality and the source chord bound yield $|\mathbf z|=\tau$ and $|\mathbf z-\mathbf y|\le v_j\tau$. Direct expansion gives an exact identity:

$$
|F(\mathbf z)-F(\mathbf y)|^2
=\frac{|\mathbf y|^2+|\mathbf z|^2-2\mathbf y\cdot\mathbf z}{|\mathbf z|^2|\mathbf y|^2}
=\frac{|\mathbf z-\mathbf y|^2}{|\mathbf z|^2|\mathbf y|^2}.
$$

Both denominators are positive by the root census. Taking square roots gives $|F(\mathbf z)-F(\mathbf y)|\le v_j/d_{ij}$. Since $D_{ij}>0$, the absolute transmitter denominator equals $D_{ij}$, and the exact decomposition

$$
\frac{F(\mathbf z)}{D_{ij}}-F(\mathbf y)
=\frac{F(\mathbf z)-F(\mathbf y)}{D_{ij}}
+\left(\frac1{D_{ij}}-1\right)F(\mathbf y)
$$

separates the source-position change from the source-weight change. The bounds $|D_{ij}-1|\le v_j$, $D_{ij}\ge1-v_j$, and $|F(\mathbf y)|=1/d_{ij}$ therefore imply

$$
\left|\frac{F(\mathbf z)}{D_{ij}}-F(\mathbf y)\right|
\le\frac{2v_j}{(1-v_j)d_{ij}}.
$$

Multiplication by the unit polarity product does not change the norm. Taking scalar products with $\mathbf x_i$ and summing all directed roots proves

$$
|V+3|\le E,
\qquad
V=\sum_i\mathbf x_i\cdot\mathbf A_i,
\qquad
E=\sum_{i\ne j}\frac{2|\omega|r_ir_j}{(1-|\omega|r_j)d_{ij}}.
$$

The two appearances of $v_j$ control distinct changes; omitting either would understate the error. A violation of the displayed Euclidean identity or of this exact source-weight decomposition would falsify the correction estimate.

## Directed multiplicities and rational bounds

Claim grade: derived. Each binary has two ordered intrapair rows, giving six in total. Every unordered pair of binaries has two choices of receiver endpoint, two choices of transmitter endpoint, and two directions, giving eight rows. Three such binary pairs therefore supply twenty-four rows. The total is thirty, with no self contribution.

Replacing every $1-|\omega|r_j$ by the smaller common lower bound $1-(9/5)|\omega|$ can only enlarge the positive error estimate. Within binary $a$, using $d=2r_a$, its two rows sum to at most $2|\omega|r_a/[1-(9/5)|\omega|]$. Between binaries $a<b$, using $d\ge r_b-r_a$, the eight rows sum to at most $16|\omega|r_ar_b/[(1-(9/5)|\omega|)(r_b-r_a)]$.

For $0<a<b$, the ratio $ab/(b-a)$ has derivatives $b^2/(b-a)^2>0$ in $a$ and $-a^2/(b-a)^2<0$ in $b$. Evaluating its maximum at the proper radius endpoints gives

| Quantity | Upper bound | Endpoint attaining the ratio bound |
| --- | --- | --- |
| $r_1r_2/(r_2-r_1)$ | $6$ | $(r_1,r_2)=(1,6/5)$ |
| $r_1r_3/(r_3-r_1)$ | $8/3$ | $(r_1,r_3)=(1,8/5)$ |
| $r_2r_3/(r_3-r_2)$ | $56/5$ | $(r_2,r_3)=(7/5,8/5)$ |

These maxima need not occur at the same configuration: summing separate upper bounds is valid and merely conservative. Since $\sum_ar_a\le21/5$, they give

$$
E\le\frac{|\omega|}{1-(9/5)|\omega|}
\left[\frac{42}{5}+16\left(6+\frac83+\frac{56}{5}\right)\right]
=\frac{4894|\omega|}{15(1-(9/5)|\omega|)}.
$$

Exact circular kinematics requires $\mathbf A_i=-\omega^2\mathbf x_i$. Its scalar contraction is $V=-\omega^2 I$, where the squared-radius sum is $I=2\sum_ar_a^2\le62/5$. Thus any exact solution must satisfy $3\le E+\omega^2I$. For $u=|\omega|$ the functions $u/(1-(9/5)u)$ and $u^2$ are nondecreasing on the selected interval. At $u=9/1000$ their combined bound is

$$
E+\omega^2I\le\frac{14682}{4919}+\frac{2511}{2500000}
=3-\frac{175148391}{12297500000}<3.
$$

The positive margin contradicts the necessary scalar identity at every point of the full closed parameter region, including zero angular rate and either rotation orientation. Because a full-vector solution must satisfy this scalar identity, no missing tangential equation can repair the contradiction.

## Validation receipts and limits

Claim grade: measured. The independently authored Node instrument ran its known controls before any target invocation, as recorded in [controls](../evidence/overnight-c-review-controls.json). Exact fraction operations returned $5/6$, $-3/2$, $-1/2$, and $2/3$ on their declared elementary cases. Perpendicular vectors $(1,0)$ and $(0,2)$ returned squared inversion distance $5/4$ on both separately formed expressions. A stationary antipodal neutral binary returned two directed rows and contraction $-1$. These control expectations were specified in the source before running it.

Only after this control receipt existed was the target mode run. It requires a passed controls receipt whose instrument SHA-256 matches its own bytes. The [target receipt](../evidence/overnight-c-review-target.json) records six intrapair rows, eight rows for each binary pair, direct stationary evaluation of thirty rows at the separated collinear present positions $\pm1,\pm6/5,\pm8/5$ with total $-3$, and every exact rational constant in the proof. This finite-position evaluation is an implementation control; the pairwise algebra supplies the all-phase identity. The instrument uses integer rational arithmetic and no floating-point search. It does not certify transcendental root locations or evaluate the subject implementation.

The exact commands, run from the repository root, were:

```bash
node reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-exact.mjs controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-controls.json
node reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-exact.mjs target reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-target.json
```

Both exited zero. The instrument hash is `4c4d9b629939b37ddc238819ec187b38987d1be4e9109197832204f2211ce6e1`. The subject SHA-256 measured by `shasum -a 256` is `474642e44b3d51f6a288bac7558f535f68126b6b63cf30db938ce3a7bcbfa25c`, matching the review assignment. The defining logarithmic manuscript hash measured by the same command is `3c3d3e51c22de645f1c74f604ff4f9bd4e92d866244aa738c0115b3d873fe389`. These hashes record source identity, not mathematical correctness.

Scoped editorial verification used `node --check` on the new instrument, which exited zero, and `test -f` on all seven relative file-link targets in this companion, which exited zero. `git diff --no-index --check /dev/null` on this new Markdown companion emitted no whitespace diagnostics and returned 1 because the file differs from the empty source; this is recorded as a no-diagnostics result, not a zero-exit result. A final `shasum -a 256` remeasurement retained the assigned subject hash. `git --no-optional-locks status --short` restricted to the four new review paths listed exactly those four as untracked. No claim about the rest of the shared checkout follows from that scoped status.

The complete reviewed exclusion is derived; the automated receipts corroborate only its finite arithmetic and enumeration. A failed receipt or mismatch on rerun would require rechecking that corroboration. The mathematical proof remains inspectable without the instrument.

This review makes no claim about larger angular rates, other radius ratios, unequal angular rates, noncircular paths, superfield histories, nonlinear evolution, stability, or physical acceptance. It does not adjudicate C's search coverage or the correctness of C's interval implementation. No remaining mathematical blocker was found for this frozen theorem. Integration into shared owners remains the coordinator's responsibility.

Files created by this review are this companion, `evidence/overnight-c-review-exact.mjs`, `evidence/overnight-c-review-controls.json`, and `evidence/overnight-c-review-target.json`, all under the Braid Program owner. No Python or long-running process was used. The review ends with this bounded verdict; further research and any status promotion remain with the parent.
