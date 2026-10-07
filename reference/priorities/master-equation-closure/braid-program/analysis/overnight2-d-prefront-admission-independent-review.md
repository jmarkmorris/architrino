# Independent review of the validated prefront prefix

## Disposition and scope

**Derived disposition:** the frozen [prefront application](overnight2-d-prefront-admission.py), its [proof note](overnight2-d-prefront-admission.md), the independently examined interval components and the completed receipt support actual trajectory membership on the short interval from zero through the exact encoded endpoint `2.0000000000000004`. The preparation remains literal balance 1, seed 1, its original encoded kick, all eight signed members and complete prescribed rigid negative histories, with $K=c_f=c_a=1$ and the selected inclusive ceiling projection after the complete acceleration sum. The argument below makes explicit the noncircular identification of the negative-source root. No mathematical or implementation defect was found that invalidates this retained application.

**Measured enclosure:** inspection of `prefront-admission-t2.json`, followed by complete inventory, identity and independently derived rational scalar checks, gives uniform bounds on this positive-time prefix

$$
\max_i|X_i-Q_i|\le5.3529368743391635\times10^{-11},\qquad
\max_i|\dot X_i-\dot Q_i|\le1.0705873748678324\times10^{-11}.
$$

These are certified upper bounds for the declared reference, not measured true errors. Every admitted causal source box is negative; the largest upper endpoint is $-2.352089873869782$. The application covers 20 reception cells, all eight members in every cell and all seven ordered partner channels per member. It establishes neither membership through time 67 nor tail admission, escape or all-time separation. The later source-front and positive-history error terms remain outside this proof.

This review uses the live Ramon E. Moore role and Specialist charter as an analytical lens. Its assigned write scope is this companion alone; the parent owns disposition in the [research account](overnight2-d-followup-and-research-2026-10-07.md). The frozen proof note's statement that no target had run is explicitly its status at creation; the receipt reviewed here was read after the parent reported completed exit zero.

## 1. Exact comparison and independent reference-domain audit

The mathematical reference is determined by the stored binary64 initial position $x^0$, exact cumulative sums of encoded increments $\Delta x_k$, the shared encoded velocity nodes, the encoded times and the factored correction coefficients. Absolute cached position arrays do not define later nodes. On a cell of exact duration $h=T_{k+1}-T_k$, put $q=(t-T_k)/h$. Its local displacement is

$$
H_k(q)+g(q)R_k(q),\qquad g(q)=q^2(1-q)^2,\qquad R_k(q)=\sum_{\ell=0}^3 C_{k\ell}q^\ell,
$$

where $H_k$ is the cubic Hermite displacement from zero to $\Delta x_k$ with the two prescribed physical-time velocities. Add the exact cumulative initial offset. Because $g$ and $g'$ vanish at both endpoints, adjacent cells have the same exact position and velocity. Acceleration can have ordinary jumps; the subsequent estimates require only cellwise derivatives and almost-everywhere error dynamics.

The current `overnight2-d-dense-region.py` was examined directly for this review. Its `exact_nodes` accumulates each coordinate with `Fraction.from_float`, compares each proposed binary64 endpoint with the exact rational sum and moves the appropriate endpoint by one adjacent float when necessary. Thus sub-ULP increments remain in the mathematical path even when absent from its floating cache. Its input checks cover finite increasing times starting at zero, all required array shapes, finite coefficients and increments, and equality of the initial position and velocity with the original stored preparation. This is an independent examination of the relevant domain code, not acceptance based on its receipt hash alone.

For coefficient norm bounds $R_0=\sum_\ell\|C_\ell\|_1$, $R_1=\sum_\ell\ell\|C_\ell\|_1$ and $R_2=\sum_\ell\ell(\ell-1)\|C_\ell\|_1$, the elementary inequalities $|g|\le1/16$, $|g'|\le1/2$, $|g''|\le2$ give

$$
\beta=R_0/16,\qquad
\eta=(R_0/2+R_1/16)/h,\qquad
A_c=(2R_0+R_1+R_2/16)/h^2.
$$

These bound correction position, velocity and acceleration respectively, and are exactly the outward formulas used. The cubic Hermite acceleration is affine; its Euclidean norm is bounded by the maximum of its endpoint norms. If that bound is $A_H$, the velocity radius about its midpoint is at most $r_v=A_Hh/2$, and a position radius is $r_x=(|V_H(t_m)|+r_v)h/2$. Adding $\eta$, $\beta$ and $A_c$ gives valid whole-cell speed, position-ball and acceleration bounds. The lower separation formula $|x_{m,i}-x_{m,j}|-r_i-r_j$ remains conservative when midpoint coordinates are themselves intervals. The code checks every cell and all 28 unordered pairs.

The complete comparison negative past is the rigid path translated by a constant vector, so its speed bound is $r_j|\omega|$. Joining it continuously to the positive reference establishes a Lipschitz bound even though the birth velocity jumps. The bound is needed only on the complete past up to each reception time, not on an unspecified future continuation. The inspected domain receipt covers all 737 encoded cells through 67 and gives $L=0.724250801106246<1$ and a simultaneous separation lower bound $d=3.5263854838817754$. Its memberwise acceleration bounds enter the reviewed residual bridge. The floating-cache position discrepancy bound, `1.5210055437364654e-14`, does not replace exact-node reconstruction. The domain receipt's larger illustrative tube is not promoted to actual membership by this application.

The arithmetic contract remains the previously examined outward binary64 interval operations with gradual underflow, finite valid input and ordinary Python execution. The domain source uses assertion guards; its ordinary execution and audited finite shapes matter. This review does not certify arbitrary invocations under optimization or changed input files.

## 2. Negative sources without a circular assumption

Write $b_j$ for the exact literal rigid birth position and $d_j=x_j^0-b_j$. The exact prescribed past $X_j^-$ and comparison past satisfy $Q_j^-=X_j^-+d_j$. The [initialization review](overnight2-d-initialization-independent-review.md) supplies bounds $|d_j|\le E_x^j$ and post-kick velocity discrepancies $E_v^j$ for the same original nodes and kick. The positive reference begins at those stored nodes, while the exact release begins at $b_j$ with the original exact post-kick velocity. No initialization or preparation change is introduced.

Let $e_i^x=X_i-Q_i$, $e_i^v=\dot X_i-\dot Q_i$, and

$$
Y_i=\sqrt{\alpha^2|e_i^x|^2+|e_i^v|^2},\qquad \alpha=1/5,\qquad \varepsilon=10^{-9}.
$$

On the first-exit trial $Y_i\le\varepsilon$, the receiver position error is at most $\varepsilon/\alpha$. For the auxiliary source construction use $p_{ij}=e_i^x+d_j$, so $|p_{ij}|\le P_j=\varepsilon/\alpha+E_x^j$ and the source velocity perturbation is zero. This construction is legitimate before assuming anything about the actual source time: it refers to a known translated comparison path. The reviewed root theorem gives the unique positive auxiliary root, with full translation homotopy covered by the same ball. The candidate squared-gap bound and $P_j/(1-L)$ displacement term enclose that root for every reception time in the cell. The implementation checks the entire resulting source-time enclosure is strictly negative.

Consequently this constructed root uses only the analytic negative comparison branch. At its source time,

$$
Q_i(t)+p_{ij}-Q_j^-(s)=X_i(t)-X_j^-(s),
$$

so it is already a root for the prescribed actual past. This proves existence of the appropriate actual root without assuming its source time was negative.

To identify it with the complete actual root set, on any local solution satisfying the trial the negative speed is at most $L$ and the positive speed is at most $L+\varepsilon<1$. The actual path is position-continuous at zero; hence the complete path up to reception is globally Lipschitz with constant less than one, even across the kick. For fixed receiver position, $F(\tau)=\tau-|X_i(t)-X_j(t-\tau)|$ is strictly increasing: for $\tau_2>\tau_1$, its increase is at least $(1-L-\varepsilon)(\tau_2-\tau_1)$. Current partner separation is positive, for example by $d-2\varepsilon/\alpha>0$. Thus $F(0)<0$, $F(\tau)\to+\infty$ and the positive root is unique. The already constructed negative-source root is that root; no hidden positive-history root can contribute. For self interaction the same subunit Lipschitz estimate rules out any positive delay, independently of the selected zero-self convention.

The note's root-region and continuation paragraphs are compatible with this reasoning, but the ordering above is the essential justification. Reading “before the first source-zero reception” as an unproved assumption would be insufficient. This companion supplies the explicit construction and identification needed to avoid that interpretation.

## 3. Signed variation, scalar comparison and continuation

The full homotopy $\theta p_{ij}$ lies in the admitted position ball. Its sources stay negative, so the source velocity error is exactly zero and the negative position error is the constant $-d_j$. The signed derivative matrices $B_{ij}$ are enclosed throughout that homotopy, including the root displacement, geometric normal, reference velocity and acceleration. Global denominator floors may be intersected with their direct interval bounds because they hold for the actual vectors in the ball; unrelated corners of the enclosing Cartesian box need not satisfy the physical identities. The current variation source includes both acceleration traces at an ordinary positive source knot and explicit representation/end guards. Here every source enclosure is strictly negative, so its analytic rigid formulas alone are used and no source-zero jump is crossed.

The exact mean-value error equation has receiver coefficient $B_i=\sum_{j\ne i}\overline B_{ij}$ and an inhomogeneous term consisting of the comparison residual and $\sum_j\overline B_{ij}d_j$. The bar denotes a homotopy integral, still enclosed by the interval matrix. Summing the signed interval matrices before taking a norm preserves valid cancellation. In weighted coordinates $(\alpha e_i^x,e_i^v)$ the receiver matrix is

$$
A_i=\begin{pmatrix}0&\alpha I\\B_i/\alpha&0\end{pmatrix}.
$$

Its Euclidean logarithmic norm is exactly $\tfrac12\|\alpha I+B_i^\top/\alpha\|_2$. The reviewed spectral routine's upper endpoint therefore supplies $m_i$, and

$$
f_i=r_i+\sum_{j\ne i}\|B_{ij}\|_2E_x^j,\qquad
D^+Y_i\le m_iY_i+f_i.
$$

Here $r_i$ is the independent whole-cell acceleration residual bound against the original reference history. There is no position residual because the exact derivative of the declared comparison position defines its reference velocity. Norm inequalities at zero error can be justified by regularization or the upper right derivative. Ordinary reference acceleration knots require the inequality almost everywhere, which is sufficient for the integrated comparison.

Initialize with the outward triangle bound $E_i(0)=\alpha E_x^i+E_v^i$. For a cell of width $h$, the scalar comparison is

$$
E_i(t+h)\le e^{m_ih}E_i(t)+h\phi(m_ih)f_i,\qquad
\phi(x)=(e^x-1)/x,\quad\phi(0)=1.
$$

The scalar instrument uses nonnegative rational-series tail bounds and returns an upper value only. With nonnegative $m_i,f_i,E_i$, its comparison curve is nondecreasing. Every recorded endpoint is strictly below the lower endpoint of the interval enclosing the exact trial value. Therefore the first-contact argument excludes exit anywhere inside each cell, not just at its endpoints. Simultaneous updates cover all eight members; the final maximum bounds the whole admitted prefix.

For existence, first construct the local finite-dimensional receiver ODE using the prescribed analytic negative histories and the auxiliary roots just described. Strict range and factor margins make its field smooth near the admitted tube. Its local solution is a solution of the full selected equation by the complete-root argument. The ceiling projection is inactive since $L+\varepsilon<1$. The strict error barriers, negative-source margin, bounded acceleration, positive separation and factor margins keep this solution in a compact ordinary region, so it continues through the stated endpoint. This argument proves short-prefix existence, uniqueness and membership; it does not assume a globally admitted delayed evolution.

## 4. Independent checks and completed-receipt audit

The shared-venv control commands for `overnight2-d-prefront-admission.py controls` and `overnight2-d-dense-region.py` without `--target` completed with exit zero. These exercise the static signed matrix, exact logarithmic norm, both lower-knot acceleration traces, matrix norm, scalar-series and weighted-initialization cases. No scientific target or target replay was run by this reviewer.

Separately derived controls passed for a linear Hermite path on $[0,2]$ with velocity $1/2$, the conservative midpoint separation bound for a displacement of ten, a constant correction coefficient with $h=2$ giving bounds $1/16,1/4,1/2$, and three cumulative increments $2^{-24},2^{-24},-2^{-24}$ added to $2^{30}$. The cumulative-node check compares with exact rational values, including increments invisible in a nearest-rounded absolute cache. One first version of the separation control incorrectly demanded that the output lower-bound interval contain the ideal lower bound nine. The radius is already replaced by a certified upper value, so that expectation was wrong. The corrected independent test checks conservatism and obtains `8.999999999999968 <= 9`; this was a review-harness mistake, not an instrument defect. All remaining stated controls ran and passed after that correction.

The identity/inventory auditor was controlled first against the known SHA-256 of `abc`, a known hash match and mismatch, and valid/duplicate small inventories. It then verified all 27 admission dependencies, 17 residual dependencies, seven domain dependencies and five initialization dependencies. For the initializer's earlier receipt it used the preserved pre-execution-guard source, whose hash matches the original receipt, rather than pretending the later guard addition produced that receipt. Direct retained-input checks and the domain's initialization equality bind the original kick and nodes to this refined comparison.

The completed residual receipt contains exactly 160 distinct `(cell, receiver)` rows for cells 0 through 19 and members 0 through 7, with the exact encoded reception intervals. The admission receipt has exactly 20 corresponding cells, eight members per cell and each of the seven ordered partners once per member: 1,120 channels. Residual channel coverage has the same complete census. Every source upper endpoint is negative. The smallest recorded delay lower endpoint is `4.352089873869783`; the largest recorded receiver growth bound is `0.16474247984114984`. Neither number alone is an error-propagation result.

The scalar receipt was checked independently without calling the scalar-step implementation. Interpret every recorded binary64 value and reception endpoint as an exact rational; use exact $\alpha=1/5$ and trial $10^{-9}$. Check each recorded forcing exceeds the exact rational sum of its residual upper bound and recorded channel-norm bounds times the initial position bounds. Compute separate 60-term rational series and geometric tails for $\exp(x)$ and $\phi(x)$, with $x=mh<1$ and the zero case controlled at $(1,1)$. At each of all 160 member-cell steps, the recorded endpoint exceeds this independently formed upper comparison and is strictly below the trial. Use the recorded endpoint as the next incoming bound. All steps passed. The recorded final velocity maximum and its outward division by $\alpha$ agree with the published position bound. This validates aggregation and scalar propagation independently; it does not substitute for the matrix and residual mathematical audits.

## 5. Identities, preservation and falsifiers

The following SHA-256 identities were read directly and checked against receipt dependencies where applicable:

| Artifact | SHA-256 |
| --- | --- |
| Prefront application | `833697a756b21fe829ab95577a3fc185edb61a5d7e70a8ebeeeee474cb27eb8a` |
| Prefront mathematical note | `c9fc041edcee9d5e12c133658c5d33c986bd204dcb6daa232edc7d77aae6968c` |
| Completed prefront receipt | `7bdd0ce30f23269cbb16db82b19d2ffef09dd748d88862b12215ba55af307d51` |
| Complete residual receipt | `f4604abda65be5391c9e3ab298f6ee5b930e35ddb95bb030586cbf2db3c66837` |
| Exact-increment domain instrument | `4b366ac045bb8198c0bbeb41bc52faed9b664833a6e6926541065acd77f60fd6` |
| Domain receipt | `7eef27ac17b5c4f1afc3eb9dd5533b60a947bc37dc801c14b744498acf945562` |
| Repaired variation instrument | `a1d59de294381bec198247039ce7a67781d0cbf31832a378b7c10e95cdbea5f1` |
| Residual instrument | `9b8baa6135d12145275a5b64fb8f803623ce04d802e65f5ae68f6b24d7a54554` |
| Scalar step | `65a39e2dc851a1af5c2d8459bdd1fcd7a2fdffda3572bd3bee797b896cd62943` |
| Interval matrix norm | `c026c2689ee0b222f00cbfeb7beb56f42f3423a39b13dae82588cb8def978775` |
| Refined comparison NPZ | `6ba8e300c6d6b3addfd4485460b1393aece72651b1835a5e66935189b8222755` |
| Refined comparison metadata | `85ca50ba7434fb42cce62e603017016a64b441cf138d5fb252bed60ec2444bc2` |
| Initialization receipt | `45b66ce0e346edd48449ed98308f033607508ad6d99d27d434d19aad225cc7d3` |
| Preserved initializer source | `971ffef31463214b3c2d846378f6f3c348c91ccdf4af212a95e6893a1fab15cf` |
| Original seed-one NPZ | `99c0555f4eb52236bcb0a3c615fb96a32a4d3a1bc488bd89081d411c62619b84` |
| Original seed-one metadata | `274e0fc6f36fce114848fa9b511ee213bc00ac355f23da253a4e830621488502` |
| Literal preparation | `d937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d` |

Runtime receipts and arrays remain in their existing ignored `.local-data/master-equation-closure/overnight2-d/` owners; they are local evidence, not claimed available from a fresh clone. All subjects, dependencies, earlier reviews and outputs remained read-only. Only this new review companion was authored, and no compute lease, scientific target, recursive review team, sidebar message or Git publication was created.

The result is falsified by an exact represented reference value outside its whole-cell bounds, a residual failing to enclose the exact declared reference equation, a missing member/channel/cell, an actual homotopy root outside its negative enclosure, an invalid interval or spectral upper bound, or a failed exact scalar inequality. A changed preparation, kick, reference or bound-producing dependency invalidates the stated receipt binding. A future source box reaching zero requires a new argument; extending these twenty cells without delayed-error and jump terms would not be licensed by this certificate. Parent integration of this bounded result is still separate from this review's completed mathematical and implementation assessment.

Closing validation rechecked the application, mathematical note, exact-increment domain code, repaired variation code, residual code and completed admission receipt against their above identities; all were unchanged. All four distinct relative-link destinations exist by explicit filesystem checks. Scoped `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this new companion; its difference exit status is expected for a new file.
