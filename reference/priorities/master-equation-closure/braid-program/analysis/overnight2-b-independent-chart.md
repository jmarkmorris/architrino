# Independent full-period finite-height causal-chart review

## Scope and known-first record

This review independently reconstructs the geometric chart in [the second-allocation report](overnight2-b-followup-and-research-2026-10-07.md#first-full-period-chart-a-finite-height-family-below-wake-speed). The unchanged canonical law has $K=c_f=1$ and includes every positive ordinary partner and self root. A prescribed path is being checked for complete ordinary causal geometry, not for acceleration balance, stability or actual evolution. The Ramon E. Moore role supplies an analytical lens only. The parent researcher owns integration into the main report; shared owners remain outside this review's write scope.

The independent [rational instrument](overnight2-b-independent-chart.py) imports only Python standard-library modules and no subject or prior research instrument. Its constants are reconstructed from the path derivatives below. Before any target evaluation, its known stage passed static-path bounds, the exact speed squared $9/25$ of a radius-one circle with angular rate $3/5$, the $3/5,4/5,1$ squared-norm identity, and the stationary scalar gap $2-d$, whose unique positive root is two and whose derivative is minus one. The command used the executable shared Python 3.13.2 venv with all three numerical-thread environment variables set to one; it exited zero at 2026-10-07 03:31:45 UTC. The known receipt is `.local-data/master-equation-closure/overnight2-b/independent-chart/known.json`. The known-stage instrument SHA-256 is `cd4851f5804cf5ffdb9034beff11cc01e3f39fab7a151567789ba84c643f7244`. This pass is recorded before target use.

## Verdict and precise domain

Claim grade: independently reconstructed derivation, with its rational arithmetic checked exactly. The full stated coefficient box has exactly five positive ordinary partner roots per receiver and no positive self roots at every reception time. Its speed is strictly below $0.801$, its transmitter divisor is strictly above $0.199$, and every partner delay divided by $R$ lies strictly between $0.488$ and $2.789$. No phase grid, finite history cutoff, common-code parity or optimizer output enters this conclusion.

For each $R>0$, let $\tau=t/R$, $\phi=\kappa\tau$, and prescribe the six paths for every real time by

$$
X_j(t)=R\big(\rho(\phi)\cos\theta_j(t),\rho(\phi)\sin\theta_j(t),(-1)^j\zeta(\phi)\big),\qquad
\theta_j(t)=\beta\tau+j\pi/3+p(\phi),\quad j=0,\ldots,5.
$$

The radius, angular modulation and height functions are

$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad
p=c\cos2\phi+d\sin2\phi,\qquad
\zeta=H\cos\phi+e\cos3\phi+f\sin3\phi.
$$

Every coefficient varies independently inside the closed exact-rational box

$$
|a|,|b|\le3/50,\quad |c|,|d|\le1/10,\quad |e|,|f|\le1/25,
\qquad H\in[1/4,3/4],\quad\beta\in[3/20,1/2],\quad\kappa\in[2/25,7/20].
$$

The scale $R$ has no upper or lower positive bound. The parameter $\kappa$ here is the waveform frequency parameter and is not the canonical coupling, which remains one. Alternating polarities affect the acceleration sum, but the causal-root geometry proved here follows only from the paths and wake speed one.

## Independent global proof

The argument uses the following elementary fact. If a complete source path has speed bounded by a constant $v<1$, its distance from a fixed receiver event can change by at most $v$ times the change in source time. Subtracting the increasing positive delay therefore produces a strictly decreasing causal gap. This remains true even where the separation vector vanishes, so differentiability of the distance away from roots need not be assumed.

Differentiate the paths in the orthonormal radial, azimuthal and vertical frame at the same instant. A prime denotes differentiation with respect to $\phi$. The velocity components are

$$
V_j=\big(\kappa\rho',\;\rho(\beta+\kappa p'),\;(-1)^j\kappa\zeta'\big).
$$

The factor $R$ cancels because $d\tau/dt=1/R$. The elementary triangle bounds give

$$
22/25\le\rho\le28/25,\qquad
|\rho'|\le6/25,\qquad |p'|\le2/5,\qquad
|\zeta|\le83/100,\qquad |\zeta'|\le99/100.
$$

Consequently the three velocity magnitudes are bounded respectively by $21/250$, $448/625$ and $693/2000$. Orthogonality, not a componentwise sum, gives

$$
|V_j|^2\le\left(\frac{21}{250}\right)^2+
\left(\frac{448}{625}\right)^2+
\left(\frac{693}{2000}\right)^2
=\frac{64092049}{100000000}
<\left(\frac{801}{1000}\right)^2.
$$

The exact squared slack is $68051/100000000>0$. Thus every path is globally Lipschitz with the valid constant $v=801/1000<1$, and its actual speed is strictly smaller than that constant. This is an estimate on prescribed paths, not an added speed constraint or response rule.

Fix receiver $i$, reception time $t$, and source $j\ne i$. Set

$$
Q_{ij}(t,d)=X_i(t)-X_j(t-d),\qquad
g_{ij}(t,d)=|Q_{ij}(t,d)|-d,\qquad d\ge0.
$$

A causal root is a positive zero of $g_{ij}$. At equal times the planar hexagon chord has length $2R\rho|\sin((i-j)\pi/6)|\ge R\rho$, while vertical separation can only increase the full norm. Hence $g_{ij}(t,0)\ge22R/25>0$. For $d_2>d_1$, the triangle inequality and the complete-history speed bound give

$$
g_{ij}(t,d_2)-g_{ij}(t,d_1)
\le-(1-v)(d_2-d_1).
$$

Every path remains in the origin-centered ball with squared radius at most $R^2[(28/25)^2+(83/100)^2]=19433R^2/10000$. Therefore the gap is negative when $d>2R\sqrt{19433/10000}$. Continuity gives at least one positive root; the strict monotonic inequality gives at most one. This covers the entire positive-delay axis, including the recent and ancient complements, for every partner and every reception time.

At its positive root the separation norm is $d>0$. The distance is smooth there, and the exact canonical transmitter divisor is

$$
D_{ij}=1-\widehat Q_{ij}\cdot V_j(t-d),\qquad
\partial_d g_{ij}=-D_{ij}.
$$

The [canonical equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) defines this source-side divisor. The speed inequality proves $D_{ij}\ge1-|V_j|>199/1000$. Each root is consequently ordinary and simple. The implicit function theorem gives a smooth root as time and parameters vary locally; uniqueness joins these local descriptions into a global branch for each ordered partner channel. No unresolved source interval remains in this analytic census.

For the root's lower bound, write $s=|X_i(t)-X_j(t)|$. Source displacement over delay $d$ is at most $vd$, so $s\le d+vd$. As $s\ge22R/25$, the strict rational comparison

$$
\frac{61}{125}\left(1+\frac{801}{1000}\right)
<\frac{22}{25}
$$

gives $d/R>61/125=0.488$. Its positive comparison slack is $139/125000$. For the upper bound, the enclosing ball gives $d/R\le2\sqrt{19433/10000}$, and

$$
\left(\frac{2789}{1000}\right)^2-4\frac{19433}{10000}
=\frac{5321}{1000000}>0
$$

proves $d/R<2.789$. Both bounds are uniform in all parameters and all time.

For the self channel, the same complete-path estimate gives $|X_i(t)-X_i(t-d)|\le vd<d$ for every $d>0$. Thus no positive self root exists. The coincident zero-delay origin is outside the positive-delay sum. This is a proved absence of positive roots, not a decision to remove self interaction.

## Period, spatiality and relation to prior exclusions

The deformation period is $P=2\pi R/\kappa$. Under $t\mapsto t+P$, every path rotates through the same angle $2\pi\beta/\kappa$. Distances and source dot products are invariant under that common rotation. Uniqueness therefore implies $d_{ij}(t+P)=d_{ij}(t)$, so this is a full-period chart even when the complete positions are only relatively periodic. If $\beta/\kappa$ is rational, an integer number of deformation cycles returns the positions themselves. The chart proof does not require that rationality.

Height is genuinely nonzero and sign-changing: $\zeta(0)=H+e\ge21/100$ and $\zeta(\pi)=-H-e\le-21/100$. At either phase the even and odd members occupy two distinct horizontal planes; each plane contains a noncollinear triangle because $\rho>0$. The six points are therefore noncoplanar at those phases. At intervening height zeros they are planar, as the sign change requires. The claimed finite height is relative to scale, at least $0.21R$ at the selected phases, not a scale-independent positive absolute height.

The configuration is nonrigid. If $\rho$ varies, the same-parity pair distances $\sqrt3R\rho$ vary. If $\rho$ is constant, the height magnitude changes because $|\zeta(0)|\ge0.21$ whereas $|\zeta(\pi/2)|=|f|\le0.04$; an opposite-parity pair distance then varies. This does not identify component binaries or establish a solution branch.

Disjointness from the old neighborhoods is conditional on their preserved complete-root certificates: the [independently certified T02/T04 neighborhoods](overnight-b-independent-anisotropic.md#independent-acceptance) contain one positive self root per receiver, whereas this entire family has zero. A history cannot belong to both domains. This argument avoids relying on an unverified comparison between scale-dependent height bounds. The [earlier nine-parameter box](overnight-b-canonical-spatial-2026-10-06.md) has $\beta=2.3997325538255883\pm2^{-20}$, whose entire interval exceeds the present upper bound $1/2$. The coefficient boxes are disjoint. No claim of a disconnected exact solution branch follows: no exact balance is proved here.

## Receipts, falsifiers and handoff

The target rational stage exited zero at 2026-10-07 03:32:01 UTC, after the known pass was recorded. Its internal elapsed time by `time.perf_counter()` was approximately 0.000245 seconds; the known stage recorded approximately 0.000350 seconds. Both commands were synchronous and returned terminal exit codes; this reviewer launched no detached process. The results are proof arithmetic, with the continuous root theorem supplied above, rather than numerical root sampling.

| Item | SHA-256 by `shasum -a 256` |
| --- | --- |
| Frozen subject `overnight2-b-subwake-search.py`, inspected for identity only | `1a8ad5fdc642072e25c0aa618ac408430cb15af31e87112a3aee77fa0bfd4505` |
| Independent instrument | `cd4851f5804cf5ffdb9034beff11cc01e3f39fab7a151567789ba84c643f7244` |
| Independent `known.json` | `7d6e37d389dc3a03681cad7c6bd0e98dcac6709320000ef0ca537c06c1e296cb` |
| Independent `target.json` | `661aa2b312c855b93690cc8d82f002e49b1cf034c30aa1f29bdedad084553a3a` |

The independent receipts are retained under `.local-data/master-equation-closure/overnight2-b/independent-chart/`. Native `wc -lc` measured 13 lines and 351 bytes for `known.json`, and 39 lines and 1,316 bytes for `target.json`; native `shasum -a 256` verified both payloads at handoff. The self-contained proof and reproducer are in this analysis directory. The instrument uses exclusive creation of receipt files to prevent overwrites. No prior evidence was changed, relocated or deleted. Local ignored storage is accepted retention under the [preservation owner](../../../../op/machine-artifact-retention.md#preservation-from-creation-through-closeout), not a claimed remote backup. A repeat regeneration has not been run; the first-run times above do not establish historical-byte recovery, and timestamps/runtime would differ in a replay. Preserve both original receipts. A reproduction must choose new output filenames. From the repository root the two-stage reproduction is:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-b-independent-chart.py --stage known --output .local-data/master-equation-closure/overnight2-b/independent-chart/replay-known.json
# Inspect and record the known pass before the next command.
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-b-independent-chart.py --stage target --output .local-data/master-equation-closure/overnight2-b/independent-chart/replay-target.json
```

An in-box path with speed at least $0.801$, a partner root outside the strict delay bounds, a partner channel with a count other than one, a positive self root, or a root with $D\le0.199$ would falsify the corresponding theorem. Recheck the derivatives, exact inequalities and unsquared-gap argument above against any proposed counterexample. Changing the parameter box, using an incomplete past, changing the wake speed, or losing the path's declared regularity removes the theorem's premises. The arithmetic instrument alone does not check that another evaluator actually implements these paths or preserves all source channels.

The remaining scientific obligation is full canonical vector acceleration balance on this proved chart, followed by independent certification of any proposed exact solution or continuous exclusion. No balance, stability, actual evolution, persistence or global nonexistence conclusion is licensed by this review. The parent owns incorporation of this verdict into the current second-allocation account. This bounded independent review stops after its two owned files and receipts are validated; the parent's twelve-hour investigation continues.

Scoped validation: the shared-venv Python built-in `compile` accepted the independent instrument's source without producing a bytecode artifact; native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for each of this review's two new files. A final subject hash read matched its original frozen identity. The canonical-equation link's file target was checked by `test -f`; its section title was read directly in the canonical source. This review added no regular tests and performed no generator or Git mutation. The reviewer-owned changes are exactly this Markdown companion and `overnight2-b-independent-chart.py`, with the two retained local receipts above. There is no mathematical blocker for the chart verdict; parent integration and the ongoing balance investigation are the remaining obligations.
